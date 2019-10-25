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
    selectSex: "",
    time: [{
        value: '星期二15:00-16:00',
        name: '1',
        checked: 'true'
      },
      {
        value: '星期三15:00-16:00',
        name: '2'
      },
      {
        value: '星期四15:00-16:00',
        name: '3'
      }
    ],
    selectTime: "1",
    timeLength: ['5分钟', '10分钟', '20分钟', '30分钟'],
    selectTimeLength: 0,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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