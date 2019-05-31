// pages/jokerequestdemo/jokerequestdemo.js
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
        this.getJokes();
    },

    getJokes: function() {
        var that = this;
        var timestamp = parseInt((new Date()).getTime() / 1000);
        wx.request({
            url: 'http://v.juhe.cn/joke/content/list.php', //开发者服务器接口地址",
            data: {
                sort: "desc",
                key: "7fa459ad3b865dedfb09dc07cb346564",
                page: 1,
                pagesize: 10,
                time: timestamp

            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                var jokes = res.data.result.data;
                console.log(jokes);
                that.setData({
                    jokes: jokes
                })

            },
            fail: () => {
                console.log("====>请求失败");
            },
            complete: () => {
                console.log("====>请求完成");
            }
        });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        console.log("下拉刷新");
        this.getJokes();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    }
})