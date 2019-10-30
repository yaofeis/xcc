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
    getBannerList: url + "banner/getBannerList.do?", // 获取轮播图
    getNewsList: url + "news/getNewsList.do?", // 获取新闻列表
    getNewsDetail: url + "news/getNewsById.do?", // 获取新闻详情
    getQuestionList: url + "question/getQuestionList.do?", // 获取问题列表
    getQuestionDetail: url + "question/getQuestionById.do?", // 获取问题详情
    getAnswerList: url + "answer/getAnswerList.do?", // 获取评论列表
    login: url + "user/therdPartLogin.do?", // 登录
    modifyUser: url + "user/modifyUser.do?", // 修改用户信息
    addQuestion: url + "question/addQuestion.do?", // 提问
    getMyQuestion: url + "focusQuestion/getFocusQuestionList.do?", // 获取我的问题列表
    getSchoolList: url + "school/getSchoolList.do?", // 获取学校列表
    getSchoolDetail: url + "school/getSchoolDetailById.do?", // 获取学校信息详情
    getSchoolCommentList: url + "schoolComment/getSchoolCommentList.do?", // 获取学校评论列表
    addSchoolComment: url + "schoolComment/addSchoolComment.do?", // 添加学校评论
    commentPraise: url + "schoolComment/commentPraise.do?", // 学校评论点赞、取消点赞
    addSubscribe: url + "subscribe/addSubscribe.do?", // 添加预约
    getSchoolImageList: url + "schoolImage/getSchoolImageList.do?", // 获取学校图片列表
    focusSchool: url + "focusSchool/focusSchool.do?", // 关注、取消关注学校
    getFocusSchoolList: url + "focusSchool/getFocusSchoolList.do?", // 获取我关注学校的列表
    isFocusSchool: url + "focusSchool/isFocusSchool.do?", // 判断用户是否关注该学校
};

module.exports = {
    http,
    api,
    tips
};
