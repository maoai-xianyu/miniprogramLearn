// pages/es6demo/es6demo.js
import { sayHello } from "util.js"
import { formatTime } from "../../utils/util.js"
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
        //this.constDemo();
        //this.functionDemo();
        //this.functionArrow();
        //this.promiseDemo();
        //this.classDemo();
        sayHello();
        let time = formatTime(new Date());
        console.log(time);
    },

    classDemo: function() {
        class Person {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }
            sayHello() {
                console.log("this  " + this + "name " + this.name + "  age  " + this.age);
            }
        }

        var person = new Person("盒子鱼", 13);
        person.sayHello();

        class Util {
            static formatDate(time) {
                console.log("时间是  " + time);
            }
        }

        Util.formatDate("2019-7-25");
    },

    promiseDemo: function() {
        let p = new Promise((resolve, reject) => {
            // 成功
            // setTimeout(() => {
            //         resolve([1, 2, 3, 4]);
            //     },
            //     1000);

            // 失败
            setTimeout(() => {
                reject("fail");
            }, 1000);
        });
        p.then(res => {
            console.log(res);
            console.log("请求成功了");
        }).catch(error => {
            console.log(error);
            console.log("请求失败了");
        });
    },

    functionArrow: function() {
        // 箭头函数
        function request(url, success) {
            console.log("functionArrow  url " + url);
            if (success) {
                success([1, 2, 3, 4]);
            }
        }

        function requestD(url, success) {
            console.log("functionArrow  url " + url);
            if (success) {
                success([1, 2, 3, 4], "abcd");
            }
        }

        // request("https://www.baidu.com", function(res) {
        //     console.log(res);
        // });
        // 箭头函数
        request("https://www.baidu.com", res => {
            console.log(res);
        });

        requestD("https://www.baidu.com", (res1, res2) => {
            console.log(res1 + "  res2 " + res2);
        });

        requestD("https://www.baidu.com", (res1, res2) => {
            console.log(res1 + "  res2 " + res2);
        });

        function requestE(url, success) {
            console.log("functionArrow  url " + url);
            if (success) {
                let suc = success([1, 2, 3, 4], "abcd");
                console.log(suc);
            }
        }

        requestE("https://www.baidu.com", (res1, res2) => true);

        // 没有参数
        function requestF(url, success) {
            console.log("functionArrow  url " + url);
            if (success) {
                let result = success();
            }
        }

        requestF("盒子鱼", () => {
            console.log("返回没有参数");
        });


    },

    functionDemo: function() {
        // 定义默认参数的时候，默认参数必须要在非默认参数的后面。
        function name(name, age = 18) {
            console.log("functionDemo -- begin");
            console.log("name " + name + "  age " + age);
            console.log("functionDemo -- end");
        }
        name("盒子鱼");
        name("盒子鱼", 20);

        function nameObject(name, { age = 18, gender = "男", height = 180 } = {}) {
            console.log("functionDemo -- begin");
            console.log("name " + name + "  age " + age + " gender " + gender + " height " + height);
            console.log("functionDemo -- end");
        }

        nameObject("盒子鱼", { age: 20 });
        nameObject("盒子鱼", {});

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