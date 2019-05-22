// pages/scrollviewluckymoneydemo/scrollviewluckymoneydemo.js
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
        // 获取系统信息
        var systemInfo = wx.getSystemInfoSync();

        console.log(systemInfo);
        // windowHeight 可使用的窗口的高度 单位 px 不包含 tabBar 和 导航栏
        var windowHeight = systemInfo.windowHeight;
        var windowWidth = systemInfo.windowWidth;
        console.log("windowHeight = " + windowHeight + "  windowWidth =" + windowWidth);

        var width = windowWidth;
        var height = 100;
        var radius = (height / 2) + (Math.pow(width, 2) / 8 / height);
        console.log("radius = " + radius);
        // 用于移动圆
        var left = -(radius - width / 2);
        this.setData({
            windowHeight: windowHeight,
            windowWidth: windowWidth,
            radius: radius,
            left: left
        })
    },

    scrollEvent: function(event) {
        console.log(event);
        var scrollTop = event.detail.scrollTop;
        if (scrollTop > 0 && scrollTop <= 100) {
            var height = 100 - scrollTop;
            var width = this.data.windowWidth;
            var radius = height / 2 + width * width / 8 / height;
            var left = -(radius - width / 2);
            this.setData({
                radius: radius,
                left: left
            })
        }
    }
})