// pages/progressdemo/progressdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        precent: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        var that = this;
        var timer = setInterval(function() {
            var precent = that.data.precent;
            if (precent >= 100) {
                clearInterval(timer);
            } else {
                that.setData({
                    precent: precent + 10
                })
            }

        }, 100);

    }
})