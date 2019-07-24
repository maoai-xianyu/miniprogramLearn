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
        //this.letDemo();
        this.constDemo();
    },

    constDemo: function() {
        // const是用来定义常量的，常量是一旦定义好了以后，就不能够再修改了。
        //const PI = 3.1415926;
        //PI = 3; // "PI" is read-only

        // const只是用来限制指向的内存地址不能改变，但是如果这个内存地址上的数据改变了，是可以的
        const aList = [1, 2, 3];
        aList.push(4);
        console.log(aList);
    },

    letDemo: function() {
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