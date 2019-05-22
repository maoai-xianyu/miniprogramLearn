// pages/swiperdemo/swiperdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        imgUrls: [
            "https://static-image.xfz.cn/1539770831_872.jpg",
            "https://static-image.xfz.cn/1541147489_121.jpeg"
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
    }
})