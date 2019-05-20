// pages/weibo/weibo.js
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
        console.log(options);
        // 获取id
        var id = options.id;
        console.log('id = ' + id);
        var curPages = getCurrentPages();
        console.log(curPages)
    },

    submitEvent: function(event) {
        console.log(event);
        var content = event.detail.value.content;
        var curPages = getCurrentPages();
        // 获取上一个页面
        var page = curPages[0];
        var weibos = page.data.weibos;
        // 添加数据
        weibos.push(content);
        page.setData({
            weibos: weibos
        });
        wx.navigateBack({});
    }

})