const { http, api, tips } = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: [],
    total: 0,
    pageNum: 1,
    isBottom: false,
    keyWords: ""
  },

  // 初始化
  init(first) {
    let _this = this;
    if (!first && _this.data.pageNum > Math.ceil(_this.data.total / 20)) {
      _this.setData({
        isBottom: true
      });
      return false;
    }
    // 获取新闻列表
    http({
      url: api.getSchoolList,
      data: {
        pageNum: _this.data.pageNum,
        pageSize: 20,
        keyWords: _this.data.keyWords
      },
      success(res) {
        if (res.code === "0") {
          let list = _this.data.school.concat(res.result);
          _this.setData({
            school: list,
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
    let _this = this;
    if (JSON.stringify(options) !== "{}" && options.params !== "") {
      _this.setData({
        keyWords: options.params
      });
    }
    _this.init(true);
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
