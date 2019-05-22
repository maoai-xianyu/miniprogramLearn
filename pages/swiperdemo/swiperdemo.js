// pages/swiperdemo/swiperdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        imgUrls: [
            "https://static-image.xfz.cn/1539770831_872.jpg",
            "https://static-image.xfz.cn/1541147489_121.jpeg",
            "http://motor.lifan.com/d/file/banner/2017-03-17/c0f168a1bab0a233074c37efc128c911.jpg",
            "http://motor.lifan.com/d/file/banner/2019-04-16/291e57a24ce2afe9be49cdd4abb27c59.jpg"
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var systemInfo = wx.getSystemInfoSync();
        console.log(systemInfo);
        var windowHeight = systemInfo.windowHeight;
        var windowWidth = systemInfo.windowWidth;
        this.setData({
            windowHeight: windowHeight / 4,
            windowWidth: windowWidth
        })
    },
    changeEvnet: function(event) {
        console.log("current 改变时会触发 change 事件");
        console.log(event);
    },
    animationFinishEvnet: function(event) {
        console.log("动画结束时会触发 animationfinish 事件");
        console.log(event);
    },
    transitionEvnet: function(event) {
        console.log("swiper-item 的位置发生改变时会触发 transition 事件");
        console.log(event);
    }
})