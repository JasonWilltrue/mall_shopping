/*
 * @Author: Jerrychan
 * @Date: 2018-11-04 01:08:07
 * @LastEditors: Jerrychan
 * @LastEditTime: 2018-11-05 14:07:30
 * @Description:  登陆 注册 状态
 */

'use strict';
require('./index.css');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var nav = {
	init: function() {
		this.bindEvent();
		this.loadUserInfo();
		// this.loadCartCount();
		return this;
	},
	bindEvent: function() {
		//登陆
		$('.js-login').click(function() {
			_mm.doLogin();
		});
		//注册
		$('.js-register').click(function() {
			window.location.href = './user-register.html';
		});
		//退出
		$('.js-logout').click(function() {
			_user.logout(
				function(res) {
					window.location.reload();
				},
				function(errMsg) {
					_mm.errorTips(errMsg);
				}
			);
		});
	},
	//如果登陆 则加载用户信息
	// 加载用户信息
	loadUserInfo: function() {
		_user.checkLogin(
			function(res) {
				$('.user.not-login')
					.hide()
					.siblings('.user.login')
					.show()
					.find('.username')
					.text(res.username);
			},
			function(errMsg) {
				// do nothing
			}
		);
	},
	// 加载购物车数量
	//   loadCartCount : function(){
	//     _cart.getCartCount(function(res){
	//         $('.nav .cart-count').text(res || 0);
	//     }, function(errMsg){
	//         $('.nav .cart-count').text(0);
	//     });
	// }
};

module.exports = nav.init();
