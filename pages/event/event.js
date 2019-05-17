// pages/event/event.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        articles: [{
                'id': 1,
                'title': '钢铁是怎样炼成的'
            },
            {
                'id': 2,
                'title': '平凡的世界'
            }
        ]

    },

    /**
     * view 被點擊的
     */
    onViewClick: function(event) {
        console.log('hello');
    },

    /**
     * 文章被点击事件
     */
    onActivleClick: function(event) {
        console.log(event);
        var dataset = event.currentTarget.dataset;
        console.log(dataset);
        var id = dataset.id;
        wx.navigateTo({ url: '/pages/weibo/weibo?id=' + id });
    },

    /**
     * 点击广告
     */
    onAdvertiseClick: function(event) {
        console.log("广告点击了");
    },

    /**
     * 外面的视图点击
     */
    onOutterViewClick: function(event) {
        console.log("外面的视图被点击了");
    },

    /**
     * 里面的视图点击
     */
    onInnerViewClick: function(event) {
        console.log("里面的视图被点击了");
    }

})