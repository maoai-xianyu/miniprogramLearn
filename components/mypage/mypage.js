// components/mypage/mypage.js
Component({
    // 显示多个 slot
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

        // 自定义事件
        onBodyTapEvent: function(event) {
            console.log("组件内自定义事件");
            console.log(event);
            var index = event.target.dataset.index;
            var detail = {
                "index": index
            };
            var options = {};
            this.triggerEvent("onBodyEvent", detail, options);
        }
    },

    lifetimes: {
        created: function() {
            console.log("======>created");
        },
        attached: function() {
            console.log("======>attached");
        },
        detached: function() {
            console.log("======>detached");
        }
    },

    pageLifetimes: {
        show: function() {
            console.log("======>show");
        },

        hide: function() {
            console.log("======>hide");
        },

        onload: function() {
            console.log("不触发======>onload");
        },
        resize: function() {
            console.log("======>resize");
        }
    }

})