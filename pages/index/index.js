const {http, api, tips} = require('../../utils/util.js');
Page({
    data: {
        background: [],
        news: []
    },
    onLoad: function () {
        let _this = this;
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
    }
});
