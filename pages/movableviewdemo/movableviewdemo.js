// pages/movableviewdemo/movableviewdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    moveBoxClick: function(event) {
        var y = 100;
        var x = 50;
        this.setData({
            x: x,
            y: y
        })
    },

    moveEvent: function(event) {
        console.log("拖动");
        console.log(event);
    },
    bindscale: function(event) {
        console.log("缩放");
        console.log(event);
    },
    moveHEvent: function(event) {
        console.log("横向移动");
        console.log(event);
    }
})