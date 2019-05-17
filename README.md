# miniprogramLearn

## 学习小程序

> 每天学习一点，逐渐进步

记录：
> 目前学习到wxml数据绑定，列表渲染。16节完成，准备17节

## 17节 wx:key 需要一个唯一的标识，保持状态

wx:key 的值以两种形式提供

1. 字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
2. 保留关键字 *this 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字，如：
当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

## 18节模板
```
message.wxml

<template name="message">
  <view class="message-group">
    <text class="content">{{content}}</text>
    <text class="friend">{{friend}}</text>
    <text class="time">{{time}}</text>
  </view>
</template>

qq.wxml
<import src="../../../templates/message/message.wxml"/>

<template is = "message" data="{{content:'我们一起来写手哥歌曲吧！',friend:'周杰伦',time:'2018/06/07'}}"></template>

message.wxss

.message-group{
  height: 40px;
  line-height: 40px;
  padding: 10px;
  border-bottom: 1px solid #e4e4e4;
}

.message-group .content{
  float: left;
}

.message-group .friend{
   float: right;
   font-size: 12px;
   color: burlywood;
}

qq.wxss
@import "../../../templates/message/message.wxss";

```

## 19节 模板数据的代替  item ...item

```

<import src="../../../templates/message/message.wxml" />

<!-- item   ...item 模板的key 和 js的数据对应，可以用...item 获取数据-->
<!-- <template is="message" wx:for="{{messages}}" data="{{content:item.content,friend:item.friend}}"></template> -->
<template is="message" wx:for="{{messages}}" data="{{...item}}"></template>


Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [
      {
        content: '今天我们一起去唱歌啊',
        friend: '周结论'
      },
      {
        content: '今天我们一起去打篮球',
        friend: '蔡徐坤'
      }
    ]
  }
})

```

## 20节 include 简单粗暴

相当一把代码直接加进去，但是有些代码是不能加的。<template/> 和 <wxs/> 不能被加载进去。公共代码

## 21节 事件的绑定

```
event.wxml

<view bind:tap="onViewClick">请点击我</view>

event.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * view 被點擊的
     */
    onViewClick: function(event) {
        console.log('hello');
    },

})
```

## 22节 参数传递

* 参数传递,页面添加 data- 参数

```
event.wxml  data-id 用户参数传递，绑定参数 id   data-title 传递标题  data- 是固定配置

<view wx:for="{{articles}}" class="article-group" bind:tap="onActivleClick" data-id="{{item.id}}">
    {{item.title}}
</view>

```
* js获取参数逻辑

```
event.js  获取参数

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
     * 文章被点击事件
     */
    onActivleClick: function(event) {
        console.log(event);
        // currentTarget 在控制台上可以看到，存放参数
        var dataset = event.currentTarget.dataset;
        console.log(dataset);
        var id = dataset.id;
        // 页面跳转， /pages/weibo/weibo 注意前面的斜杆
        wx.navigateTo({ url: '/pages/weibo/weibo?id=' + id });
    }

})

```

* 页面接收

```
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
        console.log(options);
        // 获取id
        var id = options.id;
        console.log('id = ' + id);
    }
})
```

## 23节 事件的冒泡

* 事件冒泡

点击 onInnerViewClick 事件触发  onOutterViewClick 也同时会响应。

1. bind 事件绑定不会阻止冒泡事件向上冒泡
2. catch 事件绑定可以阻止冒泡事件向上冒泡

```
<view>bind冒泡事件开始</view>
<view class="outterview" bind:tap="onOutterViewClick">
    <view class="innerview" bind:tap="onInnerViewClick"></view>
</view>
<view>bind冒泡事件结尾</view>


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
```

* 处理事件冒泡 catch

```

<view wx:for="{{articles}}" class="article-group" bind:tap="onActivleClick" data-id="{{item.id}}" data-title="{{item.title}}">
    <view>{{item.title}}</view>
    <view class="advertise" catch:tap="onAdvertiseClick">我是广告,catch事件，阻止事件冒泡</view>
</view>



Page({
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
})
```

## 24 小程序事件 event 对象

event 对象

1. type 事件类型 string
2. timeStamp 事件生成时的时间戳 integer
3. target 触发事件的组件的一些属性值集合 object  事件发生的view
4. currentTarget 当前组件的一些属性值集合 object  当前view

## 25 WXSS布局

* wxml

```

<view class="news-group">
    <view class="info-group">
        <view class="title">外卖行业首先会员通，餐饮新零售升级</view>
        <view class="more-group">
            <text class="author">张楠楠</text>
            <text class="time">10月24日</text>
        </view>
    </view>
    <view class="thumbnail-group">
        <image class="thumbnail" src="https://static-image.xfz.cn/1557999871_326.jpg-website.news.list" />
    </view>
</view>
```

* wxss

```

.news-group {
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
    padding: 15px 10px;
    box-sizing: border-box;
}

.news-group .info-group {
    float: left;
    width: 235px;
}

.info-group .title {
    font-size: 18px;
    font-style: italic;
    font-weight: bolder;
    color: red;
}

.info-group .more-group {
    width: 100%;
    height: 40px;
    line-height: 40px;
}

.more-group .author {
    float: left;
}

.more-group .time {
    float: right;
    font-size: 12px;
    font-style: italic;
}

.news-group .thumbnail-group {
    height: 70px;
    width: 100px;
    float: right;
}

.thumbnail-group .thumbnail {
    width: 100%;
    height: 100%;
}

```

## 26 rpx尺寸单位  除了边框之外的尺寸用px 一般都用 rpx

* rpx尺寸单位
可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在iPhone6上，屏幕宽度为375px，共有750个物理像素，
则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

```
.news-group {
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
    padding: 30rpx 20rpx;
    box-sizing: border-box;
}

.news-group .info-group {
    float: left;
    width: 470rpx;
}

.info-group .title {
    font-size: 18px;
    font-style: italic;
    font-weight: bolder;
    color: red;
}

.info-group .more-group {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
}

.more-group .author {
    float: left;
}

.more-group .time {
    float: right;
    font-size: 12px;
    font-style: italic;
}

.news-group .thumbnail-group {
    height: 140rpx;
    width: 200rpx;
    float: right;
}

.thumbnail-group .thumbnail {
    width: 100%;
    height: 100%;
}
```