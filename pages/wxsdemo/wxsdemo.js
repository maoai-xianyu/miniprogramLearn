// pages/wxsdemo/wxsdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: 1

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var day = this.data.day;
        var weekday = "";
        switch (day) {
            case 1:
                weekday = "星期一";
                break;
            case 2:
                weekday = "星期二";
                break;
            case 3:
                weekday = "星期三";
                break;
            case 4:
                weekday = "星期四";
                break;
            case 5:
                weekday = "星期5五";
                break;
            case 6:
                weekday = "星期六";
                break;
            case 7:
                weekday = "星期日";
                break;
            default:
                weekday = "时间错误有问题";
                break;
        }
        this.setData({
            weekday: weekday
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})