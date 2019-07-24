// pages/es6demo/es6demo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        // 类型提升
        // console.log(b);
        // var b = "test";

        // 等价于
        // var b;
        // console.log(b);
        // b = "test";

        // var a = 10;
        // function hello() {
        //     // 类型提升
        //     console.log(a);
        //     var a = 20;
        // }
        // hello();

        // let 关键字 小程序对 es6   ecmascript 6 的语法不是很支持  es6 转 es5
        // 1. 不会出现变量提升的情况。
        console.log(a); // undefine
        let a = 10;
        // 注意：小程序中不能真正解析ES6语法，他只是借助了第三方工具将ES6语法转成ES5语法运行的，在底层也是用var来代替let的，所以依然会发生变量提升。
        // 2. 只在当前代码块内有效。
        // for (var index = 0; index < 3; index++) {
        //     console.log(index);
        // }
        // console.log(index); // log 3

        for (let index = 0; index < 3; index++) {
            console.log(index);
        }
        //console.log(index); // 报错，因为没有定义index


    }
})