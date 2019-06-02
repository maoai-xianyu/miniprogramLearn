// pages/jokerequestdemo/jokerequestdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showloading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        this.getJokes(1);
    },

    getJokes: function(page) {
        var that = this;
        var timestamp = null;
        if (page === 1) {
            timestamp = parseInt((new Date()).getTime() / 1000);
        } else {
            timestamp = that.data.timestamp;
        }

        wx.request({
            url: 'http://v.juhe.cn/joke/content/list.php', //开发者服务器接口地址",
            data: {
                sort: "desc",
                key: "7fa459ad3b865dedfb09dc07cb346564",
                page: page,
                pagesize: 10,
                time: timestamp

            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                var jokes = res.data.result.data;
                // 模拟测试数据加载
                // if (page == 3) {
                //     console.log("假设没有数据了");
                //     that.setData({
                //         showloading: false
                //     })
                //     return;
                // }
                if (!jokes) {
                    console.log("真的没有数据了");
                    that.setData({
                        showloading: false
                    })
                    return;
                }
                var oldJokes = that.data.jokes;
                var newJokes = [];
                if (!oldJokes || page === 1) {
                    newJokes = jokes
                } else {
                    // concat 数据拼接
                    newJokes = oldJokes.concat(jokes);
                }
                console.log(jokes);
                that.setData({
                    jokes: newJokes,
                    timestamp: timestamp,
                    page: page
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
        var that = this;
        this.getJokes(1);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

        var that = this;
        var page = this.data.page;
        setTimeout(() => {
            that.getJokes(page + 1);
        }, 2000)

    }
})