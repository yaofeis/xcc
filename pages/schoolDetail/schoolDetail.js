const {
  http,
  api,
  tips
} = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    comment: [],
    total: 0,
    pageNum: 1,
    isBottom: false
  },

  // 获取学校相关信息
  getSchoolDetail(schoolId) {
    let _this = this;
    http({
      url: api.getSchoolDetail,
      data: {
        schoolId: schoolId
      },
      success(res) {
        if (res.code === "0") {
          let date = new Date(res.result.updatedDate);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          res.result.date = `${year}/${month}/${day}`;
          _this.setData({
            info: res.result
          });
        } else {
          tips(res.message);
        }
      }
    });
  },

  // 获取学校的评论
  getComment(schoolId, first) {
    let _this = this;
    if (!first && _this.data.pageNum > Math.ceil(_this.data.total / 20)) {
      _this.setData({
        isBottom: true
      });
      return false;
    }
    http({
      url: api.getSchoolCommentList,
      data: {
        pageNum: _this.data.pageNum,
        pageSize: "20",
        schoolId: schoolId,
        userId: wx.getStorageSync('userId')
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

  // 点赞和取消点赞
  praise(e) {
    let _this = this;
    let id = e.target.dataset.id;
    http({
      url: api.commentPraise,
      data: {
        commentId: id,
        userId: wx.getStorageSync('userId'),
      },
      success(res) {
        if (res.code === "0") {
          _this.data.comment.map(item => {
            if (item.commentId === id) {
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
  onLoad: function(options) {
    this.getSchoolDetail(options.id);
    this.getComment(options.id, true);
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
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.getComment(this.data.info.schoolId, false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})