const {
  http,
  api,
  tips
} = require('../../utils/util.js');
Page({
  data: {
    pageNum: 1,
    total: 0,
    isBottom: false,
    question: [],
    text: "请输入问题"
  },

  // 跳转去搜索页
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search?type=2',
    })
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
      url: api.getQuestionList,
      data: {
        pageNum: _this.data.pageNum,
        pageSize: 10,
        questionTitle: _this.data.text === "请输入问题" ? "" : _this.data.text
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

  onLoad: function(options) {
    let _this = this;
    if (JSON.stringify(options) !== "{}" && options.params !== "") {
      _this.setData({
        text: options.params
      });
    }
    this.init(true);
  },
  // 页面触底
  onReachBottom: function() {
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.init(false);
  }
});