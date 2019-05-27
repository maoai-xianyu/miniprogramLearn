// pages/checkboxdemo/checkboxdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        languages: [{
                'id': 1,
                'name': 'python'
            },
            {
                'id': 2,
                'name': 'java'
            },
            {
                'id': 3,
                'name': 'flutter'
            },
            {
                'id': 4,
                'name': 'dart'
            },
        ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    onChangeTestEvent: function(event) {
        console.log("demo---");
        console.log(event);
    },

    onChangeEvent: function(event) {
        console.log("测试阿里---");
        console.log(event);
    },
    onSubmitEvent: function(event) {
        console.log("表单提交");
        console.log(event);
    }
})