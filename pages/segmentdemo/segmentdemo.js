// pages/segmentdemo/segmentdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: ['最新', '关注', '同城']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    onChangedItemSegment: function(event) {
        console.log("出发点击事件，获取数据");
        console.log(event);
        var index = event.detail.index;
        console.log(index);
    }
})