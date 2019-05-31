// components/segment/segment.js
Component({

    // 要添加多个slot
    options: {
        multipleSlots: true
    },

    /**
     * 组件的属性列表
     */
    properties: {
        items: {
            type: Array,
            value: []
        },
        defaultIndex: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {

        onItemTapEvent: function(event) {
            console.log("组件自定义点击");
            console.log(event);
            var index = event.target.dataset.index;
            this.setData({
                currentIndex: index
            });
            var detail = {
                "index": index
            }
            var options = {};
            this.triggerEvent("itemChanged", detail, options);
        }

    },

    lifetimes: {
        created: function() {
            console.log("===created执行");
        },
        // 初始化后，可以获取数据
        attached: function() {
            var that = this;
            this.setData({
                currentIndex: that.properties.defaultIndex
            })

        }
    }
})