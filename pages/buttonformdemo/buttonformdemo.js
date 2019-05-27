// pages/buttonformdemo/buttonformdemo.js
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

    onSubmitEvent: function(event) {
        console.log(event);
        var value = event.detail.value;
        var username = value.usernmae;
        var password = value.password;
        if (username === 'tk' && password === '111111') {
            wx.navigateTo({ url: '/pages/buttondemo/buttondemo' });
        } else {
            console.log("用户名密码错误");
        }
    }
})