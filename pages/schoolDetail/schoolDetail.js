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
    info: {},// 学校信息
    comment: [],// 评论列表
    total: 0,
    pageNum: 1,
    isBottom: false,// 评论列表是否到底
    imgInfo: {
      src: "",
      num: 0
    },// 图片数量和展示图片地址
    previewUrl: "",
    isPreview: false,
    course: {},// 课程表图片相关
    isAttention: true,// 是否关注学校
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

  // 获取学校图片
  getImage(id){
    let _this = this;
    http({
      url: api.getSchoolImageList,
      data: {
        pageNum: 1,
        pageSize: 1000,
        schoolId: id
      },
      success(res) {
        if (res.code === "0") {
          let info = {
            src: res.result[0].imageUrl,
            num: res.total
          };
          let mini = res.result.find(item=>item.imageType === 7);
          let small = res.result.find(item=>item.imageType === 8);
          let middle = res.result.find(item=>item.imageType === 9);
          let big = res.result.find(item=>item.imageType === 10);
          _this.setData({
            imgInfo: info,
            course: {
              mini,
              small,
              middle,
              big
            }
          })
        } else {
          tips(res.message);
        }
      }
    });
  },

  // 预览课程表图片
  preview(e){
    this.setData({
      isPreview: true,
      previewUrl: e.target.dataset.url
    });
  },

  // 取消预览课程表图片
  cancelPreview(){
    this.setData({
      isPreview: false,
      previewUrl: ""
    });
  },

  // 返回
  back(){
    wx.navigateBack();
  },

  // 判断是否关注该学校
  getMySchool(id){
    let _this = this;
    http({
      url: api.isFocusSchool,
      data: {
        userId: wx.getStorageSync('userId'),
        schoolId: id
      },
      success(res) {
        if (res.code === "0") {
          _this.setData({
            isAttention: res.result === 1
          })
        } else {
          tips(res.message);
        }
      }
    });
  },

  // 关注、取消关注
  attention(){
    let _this = this;
    http({
      url: api.focusSchool,
      data: {
        userId: wx.getStorageSync('userId'),
        schoolId: _this.data.info.schoolId
      },
      success(res) {
        if (res.code === "0") {
          tips("操作成功", "success");
          _this.setData({
            isAttention: !_this.data.isAttention
          })
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
    this.getImage(options.id);
    this.getMySchool(options.id);
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
