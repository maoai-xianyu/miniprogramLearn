// pages/inputdemo/inputdemo.js
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

        var systemInfo = wx.getSystemInfoSync();
        console.log(systemInfo);
    },
    onInputEvent: function(event) {
        console.log("====onInputEvent======");
        console.log(event);
    },
    onFocusEvent: function(event) {
        console.log("====onFocusEvent======");
        console.log(event);
    }
})