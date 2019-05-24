// pages/movablechatdemo/movablechatdemo.js
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
        var windowWidth = systemInfo.windowWidth;

        this.setData({
            windowWidth: windowWidth
        })
    },

    onTouchStartEvent: function(event) {
        console.log("=======onTouchStartEvent");
        console.log(event);

        var startPageX = event.touches[0].pageX;
        this.setData({
            startPageX: startPageX
        })
    },

    onTouchEndEvent: function(event) {
        console.log("=======onTouchEndEvent");
        console.log(event);

        var endPageX = event.changedTouches[0].pageX;
        var startPageX = this.data.startPageX;
        var changeX = this.data.changeX;
        // 如果起始点大于结束点，说明是往左滑动
        if (startPageX > endPageX) {
            if (changeX < -20) {
                this.setData({
                    x: -100
                })
            } else {
                this.setData({
                    x: 0
                })
            }
        } else {
            //说明是往右滑动
            if (changeX > -80) {
                this.setData({
                    x: 0
                })
            } else {
                this.setData({
                    x: -100
                })
            }
        }

        this.setData({
            endPageX: endPageX
        })
    },

    onChangeEvent: function(event) {
        console.log("=======onChangeEvent");
        console.log(event);
        var changeX = event.detail.x;
        this.setData({
            changeX: changeX
        })
    }
})