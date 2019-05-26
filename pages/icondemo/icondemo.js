// pages/icondemo/icondemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        seconds: 5
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var system = wx.getSystemInfoSync();
        console.log(system);
        var screenWidth = system.screenWidth;
        var that = this;
        var timer = setInterval(() => {
            var seconds = that.data.seconds;
            if (seconds >= 1) {
                that.setData({
                    seconds: seconds - 1
                })
            } else {
                clearInterval(timer);
            }
        }, 1000);

        this.setData({
            screenWidth: screenWidth - 40
        })

    }
})