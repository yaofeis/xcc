const {http, api, tips} = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    total: 0,
    isBottom: false,
    question: []
  },

  // 获取问题列表
  init(first) {
    let _this = this;
    if (!first && _this.data.pageNum > Math.ceil(_this.data.total / 10)) {
      _this.setData({
        isBottom: true
      });
      return false;
    }
    // 获取问答列表
    http({
      url: api.getMyQuestion,
      data: {
        pageNum: _this.data.pageNum,
        pageSize: 10,
        userId: wx.getStorageSync('userId')
      },
      success(res) {
        if (res.code === "0") {
          res.result.map(item => {
            if (item.questionDescrib.length > 50) {
              item.questionDescrib = item.questionDescrib.substring(0, 50) + "...";
            }
          });
          let list = _this.data.question.concat(res.result);
          _this.setData({
            question: list,
            total: res.total
          });
        } else {
          tips(res.message);
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init(true);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.init(false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
