//index.js
//获取应用实例
const app = getApp()

function hello() {
    return "你好";
}

Page({
    data: {
        motto: 'Hello World',
        username: '测试用户名称codingtk',
        person: {
            'username': '盒子鱼',
            'age': 18
        },
        books: [
            '三国演义',
            '水浒传',
            '西游记'
        ],
        weather: '阴天',
        userInfo: {},
        hasUserInfo: false,
        hello: hello(),
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    // 页面加载完成调用
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        console.log("=====>onLoad()");
        var person = this.data.person;
        person.username = "知了课堂";
        this.setData({
            person: person
        })

        // 使用路径的方式
        this.setData({
            "person.age": 50
        })

        this.setData({
            "books[3]": "金瓶梅"
        })

    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    onShow: function() {
        console.log("=====>onShow()");
    },
    onReady: function() {
        console.log("=====>onReady()");
    },
    onHide: function() {
        console.log("=====>onHide()");
    },
    onUnload: function() {
        console.log("=====>页面卸载");
    },
    onGoToEventPageClick: function(event) {
        console.log("跳转")
        wx.navigateTo({ url: '/pages/param/param' });
    }
})