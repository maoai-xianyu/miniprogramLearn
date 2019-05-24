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
  onLoad: function (options) {

    var systemInfo = wx.getSystemInfoSync();
    var windowWidth = systemInfo.windowWidth;

    this.setData({
      windowWidth: windowWidth
    })
  }
})