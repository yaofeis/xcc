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
    grade: ['小班', '中班', '大班'],
    selectGrade: 0,
    sex: [{
        value: '男士',
        name: '1',
        checked: 'true'
      },
      {
        value: '女士',
        name: '2'
      }
    ],
    selectSex: "1",
    time: [],
    selectTime: "",
    timeLength: ['5分钟', '10分钟', '20分钟', '30分钟'],
    selectTimeLength: 0,
    info: {},
    name: "",
    phone: ""
  },
  // 年级选择器
  gradeChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 性别单选按钮
  sexChange(e) {
    this.setData({
      selectSex: e.detail.value
    })
  },
  // 时间单选框
  timeChange(e) {
    this.setData({
      selectTime: e.detail.value
    })
  },
  // 时长选择器
  timeLengthChange(e) {
    this.setData({
      selectTimeLength: e.detail.value
    })
  },
  // 输入框发生变化
  inputChange(e) {
    if (e.target.dataset.type === "phone") {
      this.setData({
        phone: e.detail.value
      })
    } else {
      this.setData({
        name: e.detail.value
      })
    }
  },
  // 提交
  submit() {
    let _this = this;
    if (_this.data.name === "") return tips("请输入姓名");
    if (_this.data.phone === "") return tips("请输入电话");
    http({
      url: api.addSubscribe,
      data: {
        userId: wx.getStorageSync('userId'),
        schoolId: _this.data.info.schoolId,
        userName: _this.data.name,
        mobile: _this.data.phone,
        childGrade: _this.data.grade[_this.data.selectGrade],
        userGender: _this.data.selectSex,
        subscribeDate: _this.data.selectTime,
        week: _this.data.selectTime,
        subscribeDuration: _this.data.timeLength[_this.data.selectTimeLength]
      },
      success(res) {
        if (res.code === "0") {
          tips("预约成功", "success");
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取学校基本信息
    let _this = this;
    http({
      url: api.getSchoolDetail,
      data: {
        schoolId: options.id
      },
      success(res) {
        if (res.code === "0") {
          let subscribeTime = res.result.subscribeTime.split(",");
          let time = [];
          subscribeTime.map((item, index) => {
            let obj = {};
            if (index === 0) {
              obj.checked = true;
            }
            obj.value = item;
            obj.name = item;
            time.push(obj);
          });
          _this.setData({
            info: res.result,
            time: time,
            selectTime: time[0].value
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