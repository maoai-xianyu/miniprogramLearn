// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [
      '三国演义',
      '水浒传',
      '三国演义',
      '三国演义',
      '三国演义'
    ],
    lines: [{
        'id': 1,
        'name': 'switch1'
      },
      {
        'id': 2,
        'name': 'switch2'
      },
      {
        'id': 3,
        'name': 'switch3'
      },
      {
        'id': 4,
        'name': 'switch4'
      }
    ],
    lineNums:[
      1,2,3,4,5
    ]
  },

  tapEvent: function(event) {
    var lines = this.data.lines;
    lines.splice(0, 0, {
      'id': 5,
      'name': 'switch5'
    });
    // this.data.lines = lines // 这样只会在js中赋值，不会更新页面
    this.setData({
      lines:lines
    })
  },

  tapEventNum: function (event) {
    var lines = this.data.lineNums;
    lines.splice(0, 0, 6);
    // this.data.lines = lines // 这样只会在js中赋值，不会更新页面
    this.setData({
      lineNums: lines
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})