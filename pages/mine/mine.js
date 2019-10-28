const app = getApp();
const {http, api, tips} = require('../../utils/util.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      this.modifyUser(app.globalData.userInfo.nickName);
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        this.modifyUser(res.userInfo.nickName);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          this.modifyUser(res.userInfo.nickName);
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 更改用户信息
  modifyUser(nickName){
    if(!wx.getStorageSync('nickName')){
      http({
        url: api.modifyUser,
        data: {
          userId: wx.getStorageSync('userId'),
          nickName: nickName
        },
        success(res) {
          if (res.code === "0") {
            wx.setStorageSync('nickName', nickName);
          } else {
            tips(res.message);
          }
        }
      });
    }
  }
});
