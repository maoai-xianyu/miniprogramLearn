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
    }

})