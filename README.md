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

## 27 @import 导入样式

```
@import "templates/news/news.wxss"
```

## 28  flex布局：

flex布局是继标准流布局、浮动布局、定位布局后的第四种布局方式。这种方式可以非常优雅的实现子元素居中或均匀分布，甚至可以随着窗口缩放自动适应。

```

<view class='outter'>
  <view class='inner'>1</view>
  <view class='inner'>2</view>
</view>

.outter {
    /* flex */
    display: flex;
    /* justify-content  位置均分 */
    justify-content: space-between;
    width: 600rpx;
    height: 400rpx;
    background: pink;
}

.outter .inner {
    background: gray;
    width: 200rpx;
    height: 200rpx;
    border: 10rpx solid #e4e4e4;
    /* 边框隐藏在盒子里面 */
    box-sizing: border-box;
}
```

## 29 flex盒子 基本概念：

1. 弹性容器：包含着弹性项目的父元素。通过设置 display 属性的值为 flex 或 inline-flex 来定义弹性容器。
2. 弹性项目(Flex item)：弹性容器的每个子元素都称为弹性项目。弹性容器直接包含的文本将被包覆成匿名弹性项目。也可以称为子容器。
3. 轴(Axis)：每个弹性框布局包含两个轴。弹性项目沿其依次排列的那根轴称为主轴(main axis)。垂直于主轴的那根轴称为侧轴(cross axis)。
4. 方向(Direction)：可以通过flex-direction来确定主轴和侧轴的方向。


## 30 设置在主轴上的排列方式：

* 默认情况下，主轴的方向是从左到右。在主轴方向上，可以通过justify-content属性来设置他们的排列方式。

1. flex-start：项目靠近父盒子的左侧。默认采用的就是这种排列方式
2. flex-end：项目靠近父盒子的右侧。
3. center：所有项目会挨在一起在父盒子的中间位置。
4. space-around：项目沿主轴均匀分布，位于首尾两端的子容器到父容器的距离是子容器间距的一半。
5. space-between：项目沿主轴均匀分布，位于首尾两端的子容器与父容器紧紧挨着。
6. space-evenly：项目在主轴上均匀分布，收尾两端的自容器到父容器的距离跟自容器间的间距是一样的。

```
.outter {
    display: flex;
    justify-content: space-evenly;
    width: 600rpx;
    height: 400rpx;
    background: pink;
}
```

## 31 设置在侧轴上的排列方式：

* 默认情况下，侧轴的方向是从上到下。在侧轴方向上，可以通过align-items属性来设置他们的排列方式。
1. flex-start：起始端对齐。默认就是这种对齐方式。
2. flex-end：末尾段对齐。
3. center：中间对齐。
4. stretch：如果项目没有设置高度。那么子容器沿交叉轴方向的尺寸拉伸至与父容器一致。比如我们将.inner的高度属性去掉，

```

.outter {
    display: flex;
    /* justify-content: space-evenly; */
    align-items: stretch;
    width: 600rpx;
    height: 400rpx;
    background: pink;
}

.outter .inner {
    background: gray;
    width: 180rpx;
    /* height: 100rpx; */
    border: 2rpx solid #e4e4e4;
    /* 边框隐藏在盒子里面 */
    box-sizing: border-box;
}

```
5. baseline：基线对齐，这里的 baseline 默认是指首行文字，所有子容器向基线对齐，交叉轴起点到元素基线距离最大的子容器将会与交叉轴起始端相切以确定基线

```

<view class='outter'>
  <view class='inner inner1'>
    <view>hello world</view>
  </view>
  <view class='inner inner2'>2</view>
  <view class='inner inner3'>3</view>
</view>


.outter {
    display: flex;
    /* justify-content: space-evenly; */
    align-items: baseline;
    width: 600rpx;
    height: 400rpx;
    background: pink;
}

.outter .inner {
    background: gray;
    width: 180rpx;
    /* height: 100rpx; */
    border: 2rpx solid #e4e4e4;
    /* 边框隐藏在盒子里面 */
    box-sizing: border-box;
}

.outter .inner1 view {
    margin-top: 20rpx;
}
```

## 32 更换主轴和侧轴方向

* 主轴默认的方向是从左到右，侧轴的方向默认是从上到下，当然也可以进行修改。可以通过flex-direction进行修改
1. row：默认属性。从左到右。
2. row-reverse：从右到左。
```
.outter {
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
    width: 600rpx;
    height: 400rpx;
    background: pink;
    flex-direction: row-reverse;
}
```
3. column：从上到下。
4. column-reverse：从下到上。
```
.outter {
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
    width: 600rpx;
    height: 400rpx;
    background: pink;
    flex-direction: column-reverse;
}
```

## 33 换行

* 默认情况下，元素个数如果超过一定数量，那么在一行当中就排列不下。此时flex默认的处理方式是压缩元素，使其能在一行中排列下来

> 可以通过flex-wrap来改变排列的方式。
1. nowrap：不换行。默认的。
2. wrap：换行。
3. wrap-reverse：换行，但是第一行会在下面。

```
.outter {
    display: flex;
    justify-content: start;
    align-items: flex-start;
    width: 600rpx;
    height: 400rpx;
    background: pink;
    /* 改变主轴方向 */
    /* flex-direction: column-reverse; */
    /* 控制换行 */
    flex-wrap: wrap;
}
```

## 34 align-content属性

* 在排列中，如果有多行，那么这个属性是设置多行之间的排列方式。可以通过align-content属性来确定排列的方式。

1. flex-start：从上往下排列
2. flex-end：末尾段对齐
3. center：中点对齐，
4. space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
5. space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
6. stretch：默认方式，如果没有给元素设置高度，那么会占满整个交叉轴

```
.outter {
    display: flex;
    justify-content: start;
    align-items: flex-start;
    width: 600rpx;
    height: 400rpx;
    background: pink;
    /* 改变主轴方向 */
    /* flex-direction: column-reverse; */
    /* 控制换行 */
    flex-wrap: wrap;
    /* 控制换行的排列方式 */
    align-content: space-between;
}
```

## 35 元素（子容器）的相关属性

* flex-basis：定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间。
```
 flex-basis: <length> | auto;
 默认值：auto，即项目本来的大小, 这时候 item 的宽高取决于 width 或 height 的值。
```
1. 当主轴为水平方向的时候，当设置了 flex-basis，项目的宽度设置值会失效，flex-basis 需要跟 flex-grow 和 flex-shrink 配合使用才能发挥效果。
2. 当 flex-basis 值为 0 时，是把该项目视为零尺寸的，故即使声明该尺寸为 140px，也并没有什么用。
3. 当 flex-basis 值为 auto 时，则跟根据尺寸的设定值(假如为 100px)，则这 100px 不会纳入剩余空间。

```
.outter .inner1 {
    flex-basis: 120rpx;
}
```

* flex-grow：设置元素是否需要扩大的比例。默认值为0，即如果存在剩余空间，也不放大

```
.outter .inner2 {
    flex-grow: 1;
}

.outter .inner3 {
    flex-grow: 1;
}
```

* flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

```
.outter .inner1 {
    /* flex-basis: 120rpx; */
    flex-shrink: 1;
}
```

## 36 flex属性：

flex属性是flex-grow flex-shrink flex-basis三个属性的简写。假设以上三个属性同样取默认值，则 flex的默认值是0 1 auto

1. auto：等价于1 1 auto。也就是允许增长，允许缩小，宽度为自动。
2. none：等价于0 0 auto。也就是不允许增长，不允许缩小，宽度为自动。
3. 非负数字：这个数字表示的是flex-grow的值，flex-shrink为1，表示允许缩小，flex-basis为0%。可以认为他就是把剩余的空间进行填充
```
.item {flex: 1;}
  .item {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0%;
  }
```
4. 0：对应的三个值分别为0 1 0%。
```
.item {flex: 0;}
.item {
   flex-grow: 0;
   flex-shrink: 1;
   flex-basis: 0%;
}
```
5. 长度或者百分比：则这个值视为flex-basis的值，而flex-grow为1，flex-shrink为1。
```
.item-1 {flex: 0%;}
.item-1 {
   flex-grow: 1;
   flex-shrink: 1;
   flex-basis: 0%;
}

.item-2 {flex: 24px;}
.item-2 {
   flex-grow: 1;
   flex-shrink: 1;
   flex-basis: 24px;
}
```
6. 两个非负数字：分别视为flex-grow和flex-shrink的值，flex-basis取0%
```
.item {flex: 2 3;}
.item {
   flex-grow: 2;
   flex-shrink: 3;
   flex-basis: 0%;
}
```

7. 一个非负数字和一个长度或百分比：则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取 1
```
.item {flex: 11 32px;}
.item {
   flex-grow: 11;
   flex-shrink: 1;
   flex-basis: 32px;
}
```

## 37 支付宝案例 头部