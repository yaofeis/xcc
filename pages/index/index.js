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
    school: []
  },
  onLoad: function() {
    let _this = this;
    // 获取用户信息
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
              });
            }
          })
        }
      }
    });

    // 获取轮播图
    http({
      url: api.getBannerList,
      data: {
        pageNum: 1,
        pageSize: 5,
        status: 1
      },
      success(res) {
        if (res.code === "0") {
          _this.setData({
            background: res.result
          });
        } else {
          tips(res.message);
        }
      }
    });
    // 获取新闻列表
    http({
      url: api.getNewsList,
      data: {
        pageNum: 1,
        pageSize: 2
      },
      success(res) {
        if (res.code === "0") {
          _this.setData({
            news: res.result
          });
        } else {
          tips(res.message);
        }
      }
    });
    // 获取问答列表
    http({
      url: api.getQuestionList,
      data: {
        pageNum: 1,
        pageSize: 2
      },
      success(res) {
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
    });
    // 获取学校列表
    http({
      url: api.getSchoolList,
      data: {
        pageNum: 1,
        pageSize: 2
      },
      success(res) {
        if (res.code === "0") {
          _this.setData({
            school: res.result
          });
        } else {
          tips(res.message);
        }
      }
    });
  }
});