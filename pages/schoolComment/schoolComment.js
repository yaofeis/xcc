const {http, api, tips} = require('../../utils/util.js');
Page({
  data: {
    info: {
      name: "",
      id: ""
    },
    remark: ""
  },
  // 返回
  back() {
    wx.navigateBack();
  },
  // 发布问题
  submit() {
    let _this = this;
    let remark = _this.data.remark;
    if (remark === "") return tips("请输入补充内容");
    http({
      url: api.addSchoolComment,
      data: {
        userId: wx.getStorageSync('userId'),
        schoolId: _this.data.info.id,
        commentContent: remark
      },
      success(res) {
        if (res.code === "0") {
          tips("提交成功", "success");
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/schoolDetail/schoolDetail?id=' + _this.data.info.id
            });
          }, 2000);
        } else {
          tips(res.message);
        }
      }
    });
  },
  // 输入框发生变化
  inputChange(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  onLoad(option){
    this.setData({
      info: option
    })
  }
});
