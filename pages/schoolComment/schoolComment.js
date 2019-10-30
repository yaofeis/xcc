const {
  http,
  api,
  tips
} = require('../../utils/util.js');
Page({
  data: {
    info: {
      name: "",
      id: "",
      type: "" // school-->学校  question-->问答
    },
    remark: ""
  },
  // 返回
  back() {
    wx.navigateBack();
  },
  // 提交表单
  submit() {
    let _this = this;
    let remark = _this.data.remark;
    if (remark === "") return tips("请输入补充内容");
    if (_this.data.info.type === "school") {
      _this.school(remark);
    } else {
      _this.question(remark);
    }
  },
  // 学校评论提交
  school(remark) {
    let _this = this;
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
  // 问答评论提交
  question(remark) {
    let _this = this;
    http({
      url: api.addAnswer,
      data: {
        userId: wx.getStorageSync('userId'),
        questionId: _this.data.info.id,
        ansContent: remark
      },
      success(res) {
        if (res.code === "0") {
          tips("提交成功", "success");
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/questionDetail/questionDetail?id=' + _this.data.info.id
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
  onLoad(option) {
    this.setData({
      info: option
    })
  }
});