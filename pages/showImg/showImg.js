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
    type: "all",
    schoolId: "",
    imgList: [],
    previewUrl: "",
    isPreview: false
  },

  // 获取图片
  getImage(){
    let _this = this;
    let data = {
      pageNum: 1,
      pageSize: 1000,
      schoolId: _this.data.schoolId
    };
    if(_this.data.type !== "all") data.imageType = _this.data.type;
    http({
      url: api.getSchoolImageList,
      data: data,
      success(res) {
        if (res.code === "0") {
          _this.setData({
            imgList: res.result
          });
        } else {
          tips(res.message);
          _this.setData({
            imgList: []
          });
        }
      }
    });
  },

  // 切换类型
  changeNav(e){
    this.setData({
      type: e.target.dataset.type
    });
    this.getImage();
  },

  // 预览图片
  preview(e){
    this.setData({
      isPreview: true,
      previewUrl: e.target.dataset.url
    });
  },

  // 取消预览
  cancelPreview(){
    this.setData({
      isPreview: false,
      previewUrl: ""
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type,
      schoolId: options.id
    });
    this.getImage();
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
