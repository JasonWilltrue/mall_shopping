/*
 * @Author: Jerrychan
 * @Date: 2018-11-05 10:20:25
 * @LastEditors: Jerrychan
 * @LastEditTime: 2018-11-05 10:21:15
 * @Description: 搜索结果页面
 */


'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
    //根据订单下一步的逻辑  如果订单 继续购物 还是回到购物车
    if (true) {
      
    } else {
      
    }
})