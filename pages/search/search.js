const {
  tips
} = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "1",
    value: "",
    history: []
  },

  // 返回
  goBack() {
    wx.navigateBack();
  },

  // 输入框值发生变化时
  valueChange(e) {
    this.setData({
      value: e.detail.value
    });
  },

  // 搜索
  search() {
    let _this = this;
    let val = _this.data.value;
    let type = _this.data.type;
    if (type === "1") {
      // 将搜索存到缓存中当搜索历史用
      if (val !== "") {
        let schoolHistory = wx.getStorageSync("schoolHistory") || [];
        schoolHistory.unshift(val);
        if (schoolHistory.length > 10) {
          schoolHistory.splice(10, schoolHistory.length);
        }
        wx.setStorageSync("schoolHistory", schoolHistory);
      }
      // 去学校
      wx.navigateTo({
        url: '/pages/schoolList/schoolList?params=' + val,
      })
    } else {
      // 将搜索存到缓存中当搜索历史用
      if (val !== "") {
        let problemHistory = wx.getStorageSync("problemHistory") || [];
        problemHistory.unshift(val);
        if (problemHistory.length > 10) {
          problemHistory.splice(10, problemHistory.length);
        }
        wx.setStorageSync("problemHistory", problemHistory);
      }
      // 去问答
      wx.reLaunch({
        url: '/pages/problem/problem?params=' + val
      });
    }
  },

  // 清除搜索历史
  clearHistory() {
    let key = _this.data.type === "1" ? "schoolHistory" : "problemHistory";
    wx.removeStorageSync(key);
    this.setData({
      history: []
    });
  },

  // 点击历史搜索进行搜索
  historySearch(e) {
    let _this = this;
    let type = _this.data.type;
    let val = e.currentTarget.dataset.val;
    if (type === "1") {
      // 去学校
      wx.navigateTo({
        url: '/pages/schoolList/schoolList?params=' + val,
      })
    } else {
      // 去问答
      wx.reLaunch({
        url: '/pages/problem/problem?params=' + val
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   * @params:type 从哪儿跳转过来1学校、2问答
   */
  onLoad: function(options) {
    let history = options.type === "1" ? wx.getStorageSync("schoolHistory") : wx.getStorageSync("problemHistory");
    this.setData({
      type: options.type,
      history: history
    });
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