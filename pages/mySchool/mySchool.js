const { http, api, tips } = require('../../utils/util.js');
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
    http({
      url: api.getFocusSchoolList,
      data: {
        pageNum: 1,
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