// pages/apirequestdemo/apirequestdemo.js
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

        wx.request({
            url: 'http://apis.juhe.cn/simpleWeather/query', //开发者服务器接口地址",
            data: {
                city: "北京",
                key: "5a1f6cd28f22f0125b24a7837c463fbd"
            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log(res);
                console.log(res.data.result.realtime);
            },
            fail: () => {
                console.log("请求失败");
            },
            complete: () => {
                console.log("请求完成!!");
            }
        });

    }
})