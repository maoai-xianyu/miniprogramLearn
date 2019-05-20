// pages/weibolist/weibolist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        weibos: []

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var curPages = getCurrentPages();
        console.log(curPages)
    },

    onJumpSendClick: function() {
        wx.navigateTo({ url: '/pages/weibo/weibo' });
    }
})