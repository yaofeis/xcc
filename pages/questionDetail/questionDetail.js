const {http, api, tips} = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    http({
      url: api.getQuestionDetail,
      data: {
        questionId: options.id
      },
      success(res) {
        if (res.code === "0") {
          _this.setData({
            question: res.result
          });
        } else {
          tips(res.message);
        }
      }
    });
    http({
      url: api.getAnswerList,
      data: {
        pageNum: 1,
        pageSize: 20,
        questionId:  options.id
      },
      success(res) {
        if (res.code === "0") {
          _this.setData({
            question: res.result
          });
        } else {
          tips(res.message);
        }
      }
    });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
