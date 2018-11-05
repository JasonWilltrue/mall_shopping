/*
 * @Author: Jerrychan
 * @Date: 2018-11-05 14:41:01
 * @LastEditors: Jerrychan
 * @LastEditTime: 2018-11-05 15:37:48
 * @Description: 这里填写页面信息
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');   //个人中心模板



// page 逻辑部分
var page = {
  init: function(){
      this.onLoad();
  },
  onLoad : function(){
      // 初始化左侧菜单
      navSide.init({
          name: 'user-center'
      });
      // 加载用户信息
      this.loadUserInfo();
  },
  // 加载用户信息   //初始化一些显示信息
  loadUserInfo : function(){
      var userHtml = '';
      _user.getUserInfo(function(res){
          console.log('加载用户信息');
          userHtml = _mm.renderHtml(templateIndex, res);  //插入模板与数据
          $('.panel-body').html(userHtml);
      }, function(errMsg){
          _mm.errorTips(errMsg);
      });
  }
};

$(function(){
  page.init();
});