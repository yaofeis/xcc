const {
  http,
  api,
  tips
} = require('../../utils/util.js');
Page({
  data: {
    background: [],
    news: [],
    question: [],
    school: [],
    successNum: 0
  },

  // go search web,this type is 'school'
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search?type=1',
    })
  },

  // 获取用户信息并修改(后台静默操作，不显示加载)
  modifyUser() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              let nickname = res.userInfo.nickName;
              http({
                url: api.modifyUser,
                data: {
                  userId: wx.getStorageSync('userId'),
                  nickName: nickname
                },
                success(res) {
                  if (res.code === "0") {
                    wx.setStorageSync('nickName', nickname);
                  } else {
                    tips(res.message);
                  }
                }
              }, false);
            }
          })
        }
      }
    });
  },

  // 获取轮播图
  getBanner() {
    let _this = this;
    http({
      url: api.getBannerList,
      data: {
        pageNum: 1,
        pageSize: 5,
        status: 1
      },
      success(res) {
        _this.hideLoad();
        if (res.code === "0") {
          _this.setData({
            background: res.result
          });
        } else {
          tips(res.message);
        }
      }
    }, false);
  },

  // 获取新闻列表
  getNews() {
    let _this = this;
    http({
      url: api.getNewsList,
      data: {
        pageNum: 1,
        pageSize: 2
      },
      success(res) {
        _this.hideLoad();
        if (res.code === "0") {
          _this.setData({
            news: res.result
          });
        } else {
          tips(res.message);
        }
      }
    }, false);
  },

  // 获取问答列表
  getQuestion() {
    let _this = this;
    http({
      url: api.getQuestionList,
      data: {
        pageNum: 1,
        pageSize: 2
      },
      success(res) {
        _this.hideLoad();
        if (res.code === "0") {
          res.result.map(item => {
            if (item.questionDescrib.length > 50) {
              item.questionDescrib = item.questionDescrib.substring(0, 50) + "...";
            }
          });
          _this.setData({
            question: res.result
          });
        } else {
          tips(res.message);
        }
      }
    }, false);
  },

  // 获取学校列表
  getSchool() {
    let _this = this;
    http({
      url: api.getSchoolList,
      data: {
        pageNum: 1,
        pageSize: 2
      },
      success(res) {
        _this.hideLoad();
        if (res.code === "0") {
          _this.setData({
            school: res.result
          });
        } else {
          tips(res.message);
        }
      }
    }, false);
  },

  // 显示加载中，当数据加载完毕取消显示
  hideLoad() {
    let _this = this;
    let num = _this.data.successNum + 1;
    _this.setData({
      successNum: num
    });
    if (num === 4) {
      wx.hideLoading();
    }
  },

  onLoad: function() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    _this.modifyUser();
    _this.getBanner();
    _this.getNews();
    _this.getQuestion();
    _this.getSchool();
  }
});