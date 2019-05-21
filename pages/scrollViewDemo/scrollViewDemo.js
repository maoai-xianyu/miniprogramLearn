// pages/scrollViewDemo/scrollViewDemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    toUpTopEvent: function(event) {
        console.log("距离顶部的距离，触发");
        console.log(event);
    },
    scroolEvent: function(event) {
        console.log("滚动的时候，触发");
        console.log(event);
    }
})