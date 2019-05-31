// pages/componentsdemo/componentsdemo.js
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

    onMypageTapEvent: function(event) {
        // console.log("事件调用");
        // console.log(event);
    },

    onBodyClickEvent: function(event) {
        console.log("自定义事件");
        console.log(event);
        var index = event.detail.index;
        console.log(index);
    }
})