const {http, api, tips} = require('../../utils/util.js');
Page({
    data: {
        pageNum: 1,
        total: 0,
        isBottom: false,
        question: []
    },

    // 获取问题列表
    init(first){
        let _this = this;
        if(!first && _this.data.pageNum > Math.ceil(_this.data.total / 10)){
            _this.setData({
                isBottom: true
            });
            return false;
        }
        // 获取问答列表
        http({
            url: api.getQuestionList,
            data: {
                pageNum: _this.data.pageNum,
                pageSize: 10
            },
            success(res) {
                if (res.code === "0") {
                    res.result.map(item => {
                        if (item.questionDescrib.length > 50) {
                            item.questionDescrib = item.questionDescrib.substring(0, 50) + "...";
                        }
                    });
                    let list = _this.data.question.concat(res.result);
                    _this.setData({
                        question: list,
                        total: res.total
                    });
                } else {
                    tips(res.message);
                }
            }
        });
    },

    onLoad: function () {
        this.init(true);
    },
    // 页面触底
    onReachBottom: function () {
        this.setData({
            pageNum: this.data.pageNum + 1
        });
        this.init(false);
    }
});
