const {http, api, tips} = require('../../utils/util.js');
Page({
    data: {
        title: "",
        remark: ""
    },
    // 返回
    back() {
        wx.navigateBack();
    },
    // 发布问题
    submit() {
        let title = this.data.title;
        let remark = this.data.remark;
        if (title === "") return tips("请输入标题");
        if (remark === "") return tips("请输入补充内容");
        http({
            url: api.addQuestion,
            data: {
                userId: wx.getStorageSync('userId'),
                questionTitle: title,
                questionDescrib: remark
            },
            success(res) {
                if (res.code === "0") {
                    tips("提交成功", "success");
                    setTimeout(() => {
                        wx.switchTab({
                            url: '/pages/problem/problem'
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
        if (e.target.dataset.type === "title") {
            this.setData({
                title: e.detail.value
            })
        } else {
            this.setData({
                remark: e.detail.value
            })
        }
    }
});
