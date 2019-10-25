const http = (params, load = true) => {
    load && wx.showLoading({
        title: '加载中...',
        mask: true
    });
    wx.request({
        url: params.url, //仅为示例，并非真实的接口地址
        data: params.data,
        header: {
            'content-type': 'application/json' // 默认值
        },
        success(res) {
            load && wx.hideLoading();
            params.success(res.data);
        }
    })
};

const tips = (message, type = "none", time = 2000) => {
    wx.showToast({
        title: message,
        icon: type,
        mask: true,
        duration: time
    })
};

const url = "https://www.sqyj.tech/schoolhome-server/";
const api = {
    getBannerList: url + "banner/getBannerList.do?",// 获取轮播图
    getNewsList: url + "news/getNewsList.do?",// 获取新闻
    getNewsDetail: url + "news/getNewsById.do?",// 获取新闻详情
};

module.exports = {
    http, api, tips
};
