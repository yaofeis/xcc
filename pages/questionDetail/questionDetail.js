const {http, api, tips} = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {},
    comment: [],
    isBottom: false,// 评论列表是否到底
    pageNum: 1,
    total: 0,
    isAttention: false // 是否关注
  },

  // 问题访问
  visitThis(id){
    http({
      url: api.questionClick,
      data: {
        questionId: id
      },
      success(res) {
        if (res.code !== "0") {
          tips(res.message);
        }
      }
    });
  },

  // 获取问题详情
  getDetail(id){
    let _this = this;
    http({
      url: api.getQuestionDetail,
      data: {
        questionId: id
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

  // 获取回答列表
  getAnswer(id, first){
    let _this = this;
    if (!first && _this.data.pageNum > Math.ceil(_this.data.total / 10)) {
      _this.setData({
        isBottom: true
      });
      return false;
    }
    http({
      url: api.getAnswerList,
      data: {
        pageNum: _this.data.pageNum,
        pageSize: 10,
        questionId: id
      },
      success(res) {
        if (res.code === "0") {
          res.result.map((item) => {
            item.nickName = item.nickName || "匿名用户";
            let date = new Date(item.createdDate);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            month = month < 10 ? `0${month}` : month;
            day = day < 10 ? `0${day}` : day;
            hour = hour < 10 ? `0${hour}` : hour;
            minute = minute < 10 ? `0${minute}` : minute;
            item.date = `${month}月${day}日 ${hour}:${minute}`;
          });
          let list = _this.data.comment.concat(res.result);
          _this.setData({
            comment: list,
            total: res.total
          });
        } else {
          tips(res.message);
        }
      }
    });
  },

  // 添加关注
  addAttention(){
    let _this = this;
    http({
      url: api.addFocusQuestion,
      data: {
        userId: wx.getStorageSync('userId'),
        questionId: _this.data.question.questionId
      },
      success(res) {
        if (res.code === "0") {
          tips("关注成功", "success");
          _this.setData({
            isAttention: true
          });
        } else {
          tips(res.message);
        }
      }
    });
  },

  // 取消关注
  cancelAttention(){
    let _this = this;
    http({
      url: api.deleteFocusQuestion,
      data: {
        questionId: _this.data.question.questionId
      },
      success(res) {
        if (res.code === "0") {
          tips("取消成功", "success");
          _this.setData({
            isAttention: false
          });
        } else {
          tips(res.message);
        }
      }
    });
  },

  // 点赞和取消点赞
  praise(e) {
    let _this = this;
    let id = e.currentTarget.dataset.id;
    http({
      url: api.praiseAnswer,
      data: {
        answerId: id,
        userId: wx.getStorageSync('userId'),
      },
      success(res) {
        if (res.code === "0") {
          _this.data.comment.map(item => {
            if (item.answerId === id) {
              if (item.isPraise === 1) {
                item.countPraise--;
                item.isPraise = 0;
              } else {
                item.countPraise++;
                item.isPraise = 1;
              }
            }
          });
          _this.setData({
            comment: _this.data.comment
          });
          tips("操作成功!", "success");
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
    this.visitThis(options.id);
    this.getDetail(options.id);
    this.getAnswer(options.id, true);
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
    this.getAnswer(this.data.question.questionId, false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
