/*
 * @Author: Jerrychan
 * @Date: 2018-11-03 00:13:46
 * @LastEditors: Jerrychan
 * @LastEditTime: 2018-11-03 00:13:51
 * @Description: 这里填写页面信息
 */
'use strict';
/**
 * 需要的request  请求
 */

var hogan = require('hogan');
const confirm = {
	serverHost: '',
};
let _mm = {
	request: function(params) {
		let _this = this;
		$.ajax({
			type: params.method || 'get',
			url: params.url,
			dataType: params.type || 'json',
			data: params.data || '',
			success: function(res) {
				//成功
				if (0 === res.status) {
					typeof params.success === 'function' && params.success(res.data, res.msg);
				} else if (10 === res.status) {
					//没有登录需要强制登录
					_this.doLogin();
				} else if (1 === res.status) {
					typeof params.error === 'function' && params.error(res.msg);
				}
			},
			error: function(err) {
				typeof params.error === 'function' && params.error(res.msg);
			},
		});
	},
	//get请求  后期请求地址改变容易维护
	getServerUrl: function(path) {
		return confirm.serverHost + path;
	},
	//获取url的参数
	getUrlParam: function(params) {
		// baidu.com/list/?keyword=xxx&page=1;
		//  1 截取  2 用& 分开
		let reg = new RegExp();
		let result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
// 渲染html模板
renderHtml : function(htmlTemplate, data){
	var template    = hogan.compile(htmlTemplate),
			result      = template.render(data);
	return result;
},
	// 成功提示
	successTips: function(msg) {
		alert(msg || '操作成功！');
	},
	// 错误提示
	errorTips: function(msg) {
		alert(msg || '哪里不对了~');
	},
	// 字段的验证，支持非空、手机、邮箱的判断
	validate: function(value, type) {
		var value = $.trim(value);
		// 非空验证
		if ('require' === type) {
			return !!value;
		}
		// 手机号验证
		if ('phone' === type) {
			return /^1\d{10}$/.test(value);
		}
		// 邮箱格式验证
		if ('email' === type) {
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	// 统一登录处理
	doLogin: function() {
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},

	doHome: function() {
		//强制登录逻辑
		window.location.href = './index.html';
	},
};

module.exports = _mm;
