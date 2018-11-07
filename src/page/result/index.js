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


$(function () {
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber = _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href',$orderNumber.attr('href') + orderNumber);
    }
    //显示对应的提示元素
    $element.show();
});