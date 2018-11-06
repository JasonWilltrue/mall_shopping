/*
 * @Author: Jerrychan
 * @Date: 2018-11-04 01:08:07
 * @LastEditors: Jerrychan
 * @LastEditTime: 2018-11-05 16:43:12
 * @Description: 首页   逻辑
 */

'use strict';
require('./index.css');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');
// var _cart   = require('service/cart-service.js');
// 导航
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        // this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // 登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
       console.log('加载用户信息');
       
       let res = {answer: "一二三",
       createTime: 1541402870000,
       email: "148373644@qq.com",
       id: 8608,
       password: "",
       phone: "13012345678",
       question: "一二三",
       role: 0,
       updateTime: 1541402870000,
       username: "testv1"
       }
       $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);



        // _user.checkLogin(function(res){
        //     console.log(res);
              
            
        // }, function(errMsg){
        //     console.log(errMsg);
						
        // });
    },
    
    // 加载购物车数量
    // loadCartCount : function(){
    //     _cart.getCartCount(function(res){
    //         $('.nav .cart-count').text(res || 0);
    //     }, function(errMsg){
    //         $('.nav .cart-count').text(0);
    //     });
    // }
};

module.exports = nav.init();