// pages/wxsdemo/wxsdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: 4
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

        // 时间案例
        var timeDate = new Date(2019, 0, 21, 10, 0, 0);
        console.log("获取时间 " + timeDate.getTime());
        this.setData({
            weekday: weekday,
            timeDate: timeDate.getTime(),
        });
    }
})