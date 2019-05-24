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

> folder  zhifubao

```
.wxml
<view class="zfbcontainer">
    <view class="blue-group">
 <view class="top-group">
            <view class="search_group">
                <input class="search_input" placeholder-class="placeholder-input" placeholder="蚂蚁花呗"/>
            </view>
            <view class="more-group">
                <image src="images/01.png" />
                <image src="images/02.png" />
            </view>
        </view>
           </view>
</view>
```

```
.wxss

.blue-group {
    background: #1e82d2;
    padding: 20rpx;
}

.blue-group .top-group {
    height: 58rpx;
    width: 100%;
    display: flex;
}

.top-group .search_group {
    flex: 1;
    display: flex;
}

.top-group .search_group .search_input {
    flex: 1;
    background: #1a71b7;
    border-radius: 8rpx;
    padding: 0 10rpx;
    font-size: 24rpx;
    color: white;
}

.top-group .search_group .placeholder-input {
    color: white;
}

.blue-group .more-group {
    flex-basis: 180rpx;
    display: flex;
    justify-content: space-evenly;
}

.more-group image {
    width: 50rpx;
    height: 50rpx;
}
```

## 38 支付宝案例 menu

> folder  zhifubao

```
<view class="zfbcontainer">
    <view class="blue-group">
<view class="main-menu-group">
            <view class="main-menu">
                <image src="images/1.png" />
                <text>扫一扫</text>
            </view>
             <view class="main-menu">
                <image src="images/2.png" />
                <text>付钱</text>
            </view>
             <view class="main-menu">
                <image src="images/3.png" />
                <text>收钱</text>
            </view>
             <view class="main-menu">
                <image src="images/4.png" />
                <text>卡包</text>
            </view>
        </view>
           </view>
</view>
```

```
.blue-group .main-menu-group {
    margin-top: 30rpx;
    display: flex;
    justify-content: space-around;
}

.main-menu-group .main-menu {
    width: 100rpx;
    height: 120rpx;
    text-align: center;
    margin-bottom: 20rpx;
}

.main-menu-group .main-menu image {
    width: 70rpx;
    height: 70rpx;
}

.main-menu-group .main-menu text {
    font-size: 32rpx;
    color: white;
}
```

## 39 支付宝案例 类别

> folder  zhifubao

```
<view class="white-group">
        <view class="menu-group">
            <image src="images/5.png" />
            <text>转账</text>
        </view>
         <view class="menu-group">
            <image src="images/6.png" />
            <text>信用卡还款</text>
        </view>
         <view class="menu-group">
            <image src="images/7.png" />
            <text>充值中心</text>
        </view>
         <view class="menu-group">
            <image src="images/8.png" />
            <text>余额宝</text>
        </view>
         <view class="menu-group">
            <image src="images/9.png" />
            <text>淘票票电影</text>
        </view>
         <view class="menu-group">
            <image src="images/10.png" />
            <text>滴滴出行</text>
        </view>
         <view class="menu-group">
            <image src="images/11.png" />
            <text>生活缴费</text>
        </view>
         <view class="menu-group">
            <image src="images/12.png" />
            <text>芝麻信用</text>
        </view>
         <view class="menu-group">
            <image src="images/13.png" />
            <text>火车票机票</text>
        </view>
         <view class="menu-group">
            <image src="images/14.png" />
            <text>蚂蚁借呗</text>
        </view>
         <view class="menu-group">
            <image src="images/15.png" />
            <text>高德打车</text>
        </view>
        <view class="menu-group">
            <image src="images/16.png" />
            <text>更多</text>
        </view>
    </view>
```

```
.white-group .menu-group {
    width: 180rpx;
    height: 100rpx;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
}

.white-group .menu-group image {
    width: 54rpx;
    height: 50rpx;
}

.white-group .menu-group text {
    font-size: 32rpx;
}
```

## 40 APP生命周期函数

> folder  index -> index.js

App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。

* onLaunch(Object object))

1. 小程序被加载完毕的时候调用。这个方法一般用来做一些初始化的事情。
2. 参数
    1. path | String | 打开小程序的路
    2. query | Object | 打开小程序的query 
    3. scene | Number | 打开小程序的场景值
    4. referrerInfo | Object | 当场景为由从另一个小程序或公众号或App打开时，返回此字段
    5. shareTicket | String | shareTicket，详见 获取更多转发信息
    6. referrerInfo.appId | String | 来源小程序或公众号或App的 appId
    7. referrerInfo.extraData | Object | 来源小程序传过来的数据

```
App({
    onLaunch: function(options) {
            console.log("==========onLaunch");
            console.log(options);
    }
})

```

* onShow(Object object)

1. 小程序启动，或从后台进入前台显示时调用。eg:一些实时动态更改的数据，用户每次进来都要从服务器更新，那么我们就可以在这个里面做

```
App({
    onLaunch: function(options) {
            console.log("==========onLaunch");
            console.log(options);
    },
    onShow: function(options) {
        console.log("=========onShow");
        console.log(options)
    }
})
```
* onHide()

1. 小程序被切换到后台（包括微信自身被切换到后台或者小程序暂时被切换到后台时）eg: 可以在这个方法中做一些数据的保存。

```
App({
    onLaunch: function(options) {
            console.log("==========onLaunch");
            console.log(options);
    },
    onHide: function() {
        console.log("=========onHide");
        console.log(username);
    }
})
```
* onError(String error)

1. 小程序发生脚本错误，或者 api 调用失败时触发。在小程序发生错误的时候，会把错误信息发送到这个函数中，所以可以在这个函数中做一些错误收集。
2. 参数  error

```

App({
    onLaunch: function(options) {
            console.log("==========onLaunch");
            console.log(options);
    },
    onError: function(msg) {
        console.log("=========onError");
        console.log(msg);
    }
})
```

* onPageNotFound()

小程序要打开的页面不存在时触发

```

App({
    onLaunch: function(options) {
            console.log("==========onLaunch");
            console.log(options);
    },
    onPageNotFound: function(res) {
        wx.redirectTo({
            url: 'pages/logs/logs',
        })
    }
})
```

* getApp()：
获取当前的app对象。一般在其他的page页面中调用。有以下两个注意点：

1. 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
2. 通过 getApp() 获取实例之后，不要私自调用生命周期函数。


## 41 Page 设置数据 Page对象

> folder  index -> index.wxml index.js

* Page对象作用：
Page(Object)函数用来注册一个页面。接受一个 Object 类型参数，其指定页面的初始数据、生命周期回调、事件处理函数等。

* 数据渲染：
需要放在模板中进行渲染的数据，需要放在Page对象的data属性中
```
Page({
  data: {
    person: {
      username: "知了课堂",
      age: 18
    }
  }
})

<view>
{{person.name}}
</view>
```

> 如果以后想要修改data中的值，应该使用setData方法。setData函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）

1. 直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
2. 放到data中的值，只能使用可以JSON序列化的：字符串，数字，布尔值，对象，数组。否则将不会渲染。
3. 其中key可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 array[2].message，a.b.c.d，并且不需要在 this.data中预先定义。

```

wxml
<view>{{ person.username }} {{ person.age+10 }} {{ books[3] }} </view>

<view>{{hello}}</view>
<view>{{hello()}}</view>

js

function hello() {
    return "你好";
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
        username:"学习盒子鱼，我爱工作"
        person: {
            'username': '盒子鱼',
            'age': 18
        },
        hello: hello(),
        books: [
            '三国演义',
            '水浒传',
            '西游记'
        ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        console.log("=====onLoad()");
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
  }
})
```

## 42 Page 生命周期

> folder  index -> index.js

* onload(Object query)
页面加载时触发。一个页面只会调用一次，可以在 onLoad的参数中获取打开当前页面路径中的参数。一般建议在这个函数中做一些页面的数据初始化工作。

* onShow()
页面显示/切入前台时触发。比如新推入了一个新的页面，那么原来的页面就处于后台，这时候如果把新页面又移除掉，那么下面的页面就会调用onShow方法。

* onReady()
页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互了。对界面内容进行设置的 API 如wx.setNavigationBarTitleText，比较合适在这个里面执行。

* onHide()
页面隐藏/切入后台时触发。如navigateTo或底部tab切换到其他页面，小程序切入后台等。

* onUnload()
页面卸载时触发。如redirectTo或navigateBack到其他页面时

```

<button bind:tap="onGoToEventPageClick">跳转支付宝页面，测试onUnload()方法</button>

Page({
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("=====>onLoad()");
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
```

## 43 页面之前参数的传递 

> folder  weibolist 微博列表  weibo 发微博

* 页面路由

开发者可以使用 getCurrentPages 函数获取当前页面栈。

1. 初始化
2. 打开新页面 wx.navigateTo 
3. 页面重定向 wx.redirectTo 
4. 页面返回 wx.navigateBack 
5. Tab 切换 wx.switchTab 
6. 重加载 wx.reLaunch 



```
weibolist.xml

<view>这是我的微博</view>
<view wx:for="{{weibos}}" wx:for-index="idx">
    {{idx}}/{{item}}
</view>
<button class="btn" type="primary" bindtap="onJumpSendClick">
    发微博
</button>

weibolist.js

Page({

    /**
     * 页面的初始数据
     */
    data: {

        weibos: []

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var curPages = getCurrentPages();
        console.log(curPages)
    },

    onJumpSendClick: function() {
        wx.navigateTo({ url: '/pages/weibo/weibo' });
    }
})


weibo.wxml
<view>
    <form bindsubmit="submitEvent">
        <textarea placeholder="请输入内容..." name="content"></textarea>
        <button form-type="submit">提交</button>
    </form>
</view>

weibo.js
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
        var curPages = getCurrentPages();
        console.log(curPages)
    },

    submitEvent: function(event) {
        console.log(event);
        var content = event.detail.value.content;
        var curPages = getCurrentPages();
        // 获取上一个页面
        var page = curPages[0];
        var weibos = page.data.weibos;
        // 添加数据
        weibos.push(content);
        page.setData({
            weibos: weibos
        });
        wx.navigateBack({});
    }

})

```

## 44 WXS

> folder  wxsdemo

在传统的网页开发中，HTML中是可以写JavaScript代码的，而在小程序中，是不允许在WXML文件中写JavaScript的，但是有些时候，我们需要在wxml中实现一些逻辑的处理。

wxs可以理解为javascript的一个阉割版本。使用wxs的好处如下：

在iOS上，在wxs中代码执行效率是在js中执行的2-20倍。
可以把更多的逻辑在wxml文件中完成。

* wxs代码可以写在wxml文件中。也可以单独放在.wxs后缀的文件中。如果是写在wxml文件中，则必须要放在wxs标签中。

* 每一个 .wxs 文件和 <wxs> 标签都是一个单独的模块。

* 每个模块都有自己独立的作用域。即在一个模块里面定义的变量与函数，默认为私有的，对其他模块不可见。

* 一个模块要想对外暴露其内部的私有变量与函数，只能通过 module.exports 实现。

```
wsxdemo.wxml

<!-- wsx -->
<wxs module="m">
    var getWeekDay = function(day){
        var weekday = "";
        switch (day) {
            case 1:
                weekday = "星期一";
                break;
            case 2:
                weekday = "星期二";
                break;
            case 3:
                weekday = "星期三";
                break;
            case 4:
                weekday = "星期四";
                break;
            case 5:
                weekday = "星期5五";
                break;
            case 6:
                weekday = "星期六";
                break;
            case 7:
                weekday = "星期日";
                break;
            default:
                weekday = "时间错误有问题";
                break;
        }
        return weekday;
    }
    module.exports.getWeekDay = getWeekDay
</wxs>
<view>wxs获取{{m.getWeekDay(day)}}</view>
```

## 45 外部引用wxs

> folder  wxsdemo

* wxs代码可以写在wxml文件中。也可以单独放在.wxs后缀的文件中。如果是写在wxml文件中，则必须要放在wxs标签中，如果是单独放在.wxs后缀文件中，就不需要放在wxs标签中了。
* 并且必须要给wxs一个module属性，用来标记这个wxs的名称。
* 以后想使用的时候，就直接在wxml代码中使用wxs来引用wxs文件
```
<!-- 外部引用 -->
<wxs src="wxsdemo.wxs" module="m"/>
<view>wxs获取{{m.getWeekDay(day)}}</view>

wsxdemo.wxs

var getWeekDay = function (day) {
    var weekday = "";
    switch (day) {
        case 1:
            weekday = "星期一";
            break;
        case 2:
            weekday = "星期二";
            break;
        case 3:
            weekday = "星期三";
            break;
        case 4:
            weekday = "星期四";
            break;
        case 5:
            weekday = "星期5五";
            break;
        case 6:
            weekday = "星期六";
            break;
        case 7:
            weekday = "星期日";
            break;
        default:
            weekday = "时间错误有问题";
            break;
    }
    return weekday;
}
// 导出外部
module.exports.getWeekDay = getWeekDay
```

## 46 require函数 

> folder  wxsdemo

* 如果在一个wxs文件中，想引用另外一个wxs文件，那么可以使用require函数引用

```
tools.wxs

var weekdays= [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日"
]
module.exports.weekdays = weekdays

```

在另外一个wxs文件中就可以进行引用了。示例代码如下：
```
wsxdemo.wxs

var tools = require("tools.wxs");
var getWeekDay = function (day) {
    var weekdays = tools.weekdays;
    if (day < 1 || day > 7) {
        return "时间错误有问题";
    } else {
        return weekdays[day - 1];
    }
}
// 导出外部
module.exports.getWeekDay = getWeekDay
```

## 47 WXS变量

> folder  wxsdemo

* var username 只能在当前文件中使用

```

tools.wxs
var weekdays = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日"
]
var username = "盒子鱼";
module.exports.weekdays = weekdays;

wxsdemo.wxs
var tools = require("tools.wxs");
console.log(username);
// expection

```

* username 可以在全局文件中使用

```
tools.wxs
var weekdays = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日"
]
username = "盒子鱼";
module.exports.weekdays = weekdays;

wxsdemo.wxs
var tools = require("tools.wxs");
console.log(username);

```

* username 作用域

```
wxsdemo.wxs

console.log(username);
// undefine
var username = "盒子鱼";

相当于

var username;
console.log(username);
var username = "盒子鱼";
```

## 48 WXS注释

> folder  wxsdemo

```
// hello();

/* hello(); */

```

## 49 WXS 运算符 50 WXS 时间格式化案例

> folder  wxsdemo

* 注意时间对象..

```

wxsdemo.js

Page({
    /**
     * 页面的初始数据
     */
    data: {
        day: 4
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 时间案例
        var timeDate = new Date(2019, 0, 21, 10, 0, 0);
        console.log("获取时间 " + timeDate.getTime());
        this.setData({
            timeDate: timeDate.getTime(),
        });
    }
})

wxsdemo.wxml

<!-- 外部引用 -->
<wxs src="tools.wxs" module="tools"/>
<view>{{tools.timeFormat(timeDate)}}</view>
<view>{{timeDate}}</view>

tools:wxs

var weekdays = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日"
]

var timeFormat = function(time) {
    console.log("wxs 获取前端页面的时间" + time);
    var date = getDate(time);
    console.log("页面时间为" + date);
    var date_seconds = date.getTime() / 1000;
    var now = getDate();
    var now_seconds = now.getTime() / 1000;
    var timestamp = now_seconds - date_seconds;
    var timeStr = "";
    if (timestamp < 60) {
        timeStr = "刚刚";
    } else if (timestamp >= 60 && timestamp < 60 * 60) {
        var minutes = parseInt(timestamp / 60);
        timeStr = minutes + "分钟前";
    } else if (timestamp >= 60 * 60 && timestamp < 60 * 60 * 24) {
        var hours = parseInt(timestamp / 60 / 60);
        timeStr = hours + "小时前";
    } else if (timestamp >= 60 * 60 * 24 && timestamp < 60 * 60 * 24 * 30) {
        var days = parseInt(timestamp / 60 / 60 / 24);
        timeStr = days + "天前";
    } else {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        var hour = date.getHours();
        var minute = date.getMinutes();
        timeStr = year + "/" + (month+1) + "/" + day + "/" + hour + ":" + minute;
    }
    return timeStr;
}
module.exports = {
    timeFormat: timeFormat,
    weekdays: weekdays
};

```

## view 组件

> folder  viewdemo

* hover-stay-time  手指松开后点击态保留时间，单位毫秒
* hover-start-time 按住后多久出现点击态，单位毫秒
* hover-class  指定按下去的样式类。当 hover-class="none" 时，没有点击态效果
* hover-stop-propagation="{{true}}" 指定是否阻止本节点的祖先节点出现点击态  boolean

```
viewdemo.xml

<view class="outer" hover-stay-time="0" hover-start-time="0" hover-class="outer-hover">
    <view class="inner" hover-class="inner-hover" hover-stop-propagation="{{true}}"></view>
</view>

viewdemo.wxss

.outer {
    width: 400rpx;
    height: 400rpx;
    background: red;
}

.outer-hover {
    background: blue;
}

.inner {
    width: 200rpx;
    height: 200rpx;
    background: green;
}

.inner-hover {
    background: gray;
}
```

## 51 scroll-view

> folder scrollViewDemo

有时候我们的一些视图在手机指定的宽度和高度不够存放。那么可以放在scroll-view中。

scroll-view:
1. 给scroll-view添加scroll-x="true"属性。
2. 给scroll-view添加white-space:nowrap;样式。
3. 给scroll-view中的子元素设置为display:inline-block;

```

scrollViewDemo.wxml

<scroll-view class="scroll-view" scroll-x="{{true}}">
    <view class="scroll-item bg_red"></view>
    <view class="scroll-item bg_yellow"></view>
    <view class="scroll-item bg_grey"></view>
    <view class="scroll-item bg_blue"></view>
</scroll-view>



scrollViewDemo.wxss

.scroll-view {
    width: 100%;
    height: 400rpx;
    background: green;
    white-space: nowrap;
}

.scroll-view .scroll-item {
    width: 200rpx;
    height: 200rpx;
    display: inline-block;
}

.bg_red {
    background-color: red;
}

.bg_yellow {
    background-color: yellow;
}

.bg_grey {
    background-color: grey;
}

.bg_blue {
    background-color: blue;
}
```

## 53 scroll-view 设置竖向滚动

> folder scrollViewDemo

1. 给scroll-view添加scroll-y="true"属性。
2. 给scroll-view设置高度。


```

scrollViewDemo.wxml

<scroll-view class="scroll-view-y" scroll-y="{{true}}">
    <view class="scroll-item-y bg_red"></view>
    <view class="scroll-item-y bg_yellow"></view>
    <view class="scroll-item-y bg_grey"></view>
    <view class="scroll-item-y bg_blue"></view>
</scroll-view>


scrollViewDemo.wxss

.scroll-view-y {
    width: 100%;
    height: 200rpx;
    background: grey;
    margin-top: 100rpx;
}

.scroll-view-y .scroll-item-y {
    width: 100%;
    height: 200rpx;
}
```

## 54 scroll-view 滚动事件

> folder scrollViewDemo


* upper-threshold  和 bindscrolltoupper 对应
* lower-threshold  和 bindscrolltolower 对应
* bindscroll 滚动事件

```
scrollViewDemo.wxml

<scroll-view class="scroll-view-y" scroll-y="{{true}}" scroll-with-animation="{{true}}" scroll-into-view="grey" bindscroll="scroolEvent" enable-back-to-top="{{true}}" bindscrolltoupper="toUpTopEvent" upper-threshold="100">
    <view class="scroll-item-y bg_red"></view>
    <view class="scroll-item-y bg_yellow"></view>
    <view id="grey" class="scroll-item-y bg_grey"></view>
    <view class="scroll-item-y bg_blue"></view>
</scroll-view>

scrollViewDemo.js

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
    toUpTopEvent: function(event) {
        console.log("距离顶部的距离，触发");
        console.log(event);
    },
    scroolEvent: function(event) {
        console.log("滚动的时候，触发");
        console.log(event);
    }
})

```

## 55 56 微信红包动画案例

> folder scrollviewluckymoneydemo

感觉适配还是有些问题...需要再次研究

```
scrollviewluckymoneydemo.wxml

<scroll-view scroll-y="{{true}}" class="scroll-group" style="height:{{windowHeight*2}}rpx;" bindscroll="scrollEvent">
    <view class="circle-outer">
        <view class="circle-inner">
            <view class="circle" style="width:{{radius*2*2}}rpx;height:{{radius*2*2}}rpx;left:{{left*2}}rpx;"></view>
        </view>
        <view class="user-group">
            <image class="avatar-img" src="../../images/maoai_xianyu.png" />
            <view class="user-name">codingtk</view>
        </view>
    </view>
    <view class="placeholder"></view>
</scroll-view>

scrollviewluckymoneydemo.wxss

.scroll-group {
    width: 100%;
    height: 200rpx;
    background: grey;
}

.scroll-group .circle-outer {
    width: 100%;
    height: 300rpx;
    background: #e4e4e4;
    position: relative;
}

.circle-outer .circle-inner {
    width: 100%;
    height: 200rpx;
    /* 圆以 circle-inner 为参照点 */
    position: relative;
    background: blue;
}

.circle-inner .circle {
    /*  圆 */
    border-radius: 50%;
    background: #dd4b39;
    /* 控制圆的位置 */
    position: absolute;
    bottom: 0;
}

.circle-outer .user-group {
    /* 以哪个盒子为参照点，需要给对应的盒子设置 position  .circle-outer{position: relative;} */
    position: absolute;
    width: 200rpx;
    font-size: 28rpx;
    left: 50%;
    right: 50%;
    margin-left: -100rpx;
    bottom: 20rpx;
    text-align: center;
}

.user-group .avatar-img {
    width: 100rpx;
    height: 100rpx;
    border: 2rpx solid #e8be34;
}

.placeholder {
    height: 2000rpx;
}


scrollviewluckymoneydemo.js

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
        // 获取系统信息
        var systemInfo = wx.getSystemInfoSync();

        console.log(systemInfo);
        // windowHeight 可使用的窗口的高度 单位 px 不包含 tabBar 和 导航栏
        var windowHeight = systemInfo.windowHeight;
        var windowWidth = systemInfo.windowWidth;
        console.log("windowHeight = " + windowHeight + "  windowWidth =" + windowWidth);

        var width = windowWidth;
        var height = 100;
        var radius = (height / 2) + (width * width / 8 / height);
        console.log("radius = " + radius);
        // 用于移动圆
        var left = -(radius - width / 2);
        this.setData({
            windowHeight: windowHeight,
            windowWidth: windowWidth,
            radius: radius,
            left: left
        })
    },

    scrollEvent: function(event) {
        console.log(event);
        var scrollTop = event.detail.scrollTop;
        if (scrollTop > 0 && scrollTop <= 100) {
            var height = 100 - scrollTop;
            var width = this.data.windowWidth;
            var radius = height / 2 + width * width / 8 / height;
            var left = -(radius - width / 2);
            this.setData({
                radius: radius,
                left: left
            })
        }
    }
})
```

## 57 swiper组件

> folder swiperdemo

在app里面，轮播图（banner）是非常常见的，因此小程序专门针对这个出了一个组件就是swiper。

```

swiperdemo.wxml

<swiper class="swiper-group" style="width:{{windowWidth*2}}rpx;height:{{windowHeight*2}}rpx;" indicator-dots="{{true}}" autoplay="{{true}}" interval="{{5000}}" duration="{{500}}" indicator-active-color="#ff0000" indicator-color="#ffffff">
    <block wx:for="{{imgUrls}}" wx:key="*this">
        <swiper-item>
            <image class="swiper-image" src="{{item}}" />
        </swiper-item>
    </block>
</swiper>

swiperdemo.wxss

.swiper-group {}

.swiper-group .swiper-image {
    width: 100%;
    height: 100%;
}

swiperdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        imgUrls: [
            "https://static-image.xfz.cn/1539770831_872.jpg",
            "https://static-image.xfz.cn/1541147489_121.jpeg"
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var systemInfo = wx.getSystemInfoSync();
        console.log(systemInfo);
        var windowHeight = systemInfo.windowHeight;
        var windowWidth = systemInfo.windowWidth;
        this.setData({
            windowHeight: windowHeight / 4,
            windowWidth: windowWidth
        })
    }
})
```

## 58 swiper组件-常用属性

> folder swiperdemo

* indicator-dots 是否显示面板指示点
* indicator-color 指示点颜色
* indicator-active-color 当前选中的指示点颜色
* circular  循环
* interval 自动切换时间间隔
* duration  滑动动画时长
* current 当前所在滑块的 index
* autoplay 是否自动切换
* previous-margin 前边距，可用于露出前一项的一小部分
* next-margin 后边距，可用于露出后一项的一小部分
* bindchange current 改变时会触发 change 事件，event.detail = {current, source}
* bindanimationfinish 动画结束时会触发 animationfinish 事件，event.detail 同上
* bindtransition swiper-item 的位置发生改变时会触发 transition 事件，event.detail = {dx: dx, dy: dy}

```

swiperdemo.wxml
<swiper class="swiper-group" bindtransition="transitionEvnet" current="2" bindanimationfinish="animationFinishEvnet" bindchange="changeEvnet" previous-margin="10px" next-margin="10px" circular="{{true}}" style="width:{{windowWidth*2}}rpx;height:{{windowHeight*2}}rpx;" indicator-dots="{{true}}" autoplay="{{true}}" interval="{{3000}}" duration="{{500}}" indicator-active-color="#ff0000" indicator-color="#ffffff">
    <block wx:for="{{imgUrls}}" wx:key="*this">
        <swiper-item>
            <image class="swiper-image" src="{{item}}" />
        </swiper-item>
    </block>
</swiper>


swiperdemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        imgUrls: [
            "https://static-image.xfz.cn/1539770831_872.jpg",
            "https://static-image.xfz.cn/1541147489_121.jpeg",
            "http://motor.lifan.com/d/file/banner/2017-03-17/c0f168a1bab0a233074c37efc128c911.jpg",
            "http://motor.lifan.com/d/file/banner/2019-04-16/291e57a24ce2afe9be49cdd4abb27c59.jpg"
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var systemInfo = wx.getSystemInfoSync();
        console.log(systemInfo);
        var windowHeight = systemInfo.windowHeight;
        var windowWidth = systemInfo.windowWidth;
        this.setData({
            windowHeight: windowHeight / 4,
            windowWidth: windowWidth
        })
    },
    changeEvnet: function(event) {
        console.log("current 改变时会触发 change 事件");
        console.log(event);
    },
    animationFinishEvnet: function(event) {
        console.log("动画结束时会触发 animationfinish 事件");
        console.log(event);
    },
    transitionEvnet: function(event) {
        console.log("swiper-item 的位置发生改变时会触发 transition 事件");
        console.log(event);
    }
})
```

## 59 60 61 movable-view组件

> folder movableviewdemo

正常情况下，一个组件设置了后，如果不通过js或者css动画，那么是很难实现移动的。如果我们有些组件设置完成后想要能够移动。那么我们就可以借助movable-view组件来实现。

movable-view组件，正如他的名字一样，是可以移动的容器，但是这个容器必须要放在movable-area中才能移动。因此实际上是这两个组件配合使用才能实现移动的效果的

* direction  movable-view的移动方向，属性值有all、vertical、horizontal、none
* inertia movable-view是否带有惯性
* out-of-bounds 超过可移动区域后，movable-view是否还可以移动  和 wxss 中的 overflow: hidden; 可以控制
* damping 阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快
* friction 摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值
* scale  是否支持双指缩放，默认缩放手势生效区域是在movable-view内
* bindchange 拖动过程中触发的事件，event.detail = {x, y, source}
* bindscale 缩放过程中触发的事件，event.detail = {x, y, scale}，x和y字段在2.1.0之后支持
* htouchmove 新 初次手指触摸后移动为横向的移动时触发，如果catch此事件，则意味着touchmove事件也被catch
* vtouchmove 新 初次手指触摸后移动为纵向的移动时触发，如果catch此事件，则意味着touchmove事件也被catch

```
xml

<movable-area class="area-group">
    <movable-view  catch:htouchmove="moveHEvent" bindscale="scaleEvent" bindchange="moveEvent" class="view-group"scale="{{true}}"  friction="20" damping="20" direction="all" inertia="{{true}}" out-of-bounds="{{true}}" y="{{y}}rpx" x="{{x}}rpx">
        移动
    </movable-view>
</movable-area>

<button class="btn" type="primary" bindtap="moveBoxClick">
    点击移动
</button>

wxss

.area-group {
    width: 100%;
    height: 800rpx;
    background: blue;
    /* 移动盒子超出边框，隐藏 */
    overflow: hidden;
}

.area-group .view-group {
    width: 200rpx;
    height: 200rpx;
    background: red;
}

js

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    moveBoxClick: function(event) {
        var y = 100;
        var x = 50;
        this.setData({
            x: x,
            y: y
        })
    },

    moveEvent: function(event) {
        console.log("拖动");
        console.log(event);
    },
    bindscale: function(event) {
        console.log("缩放");
        console.log(event);
    },
    moveHEvent: function(event) {
        console.log("横向移动");
        console.log(event);
    }
})


```

## 62 63 movable-view组件 左滑删除案例

> folder movablechatdemo

```
movablechatdemo.wxml

<view class="listview-group">
    <view class="itemview-group">
        <movable-area class="chatarea-group" style="width:{{(windowWidth-100)*2}}rpx;">
            <movable-view class="chat-group" x="{{x}}" bindchange="onChangeEvent" bind:touchend="onTouchEndEvent" bind:touchstart="onTouchStartEvent" direction="horizontal" style="width:{{windowWidth*2}}rpx;">周杰伦</movable-view>
        </movable-area>
        <view class="delete-group">删除</view>
    </view>
</view>

movablechatdemo.wxss
.listview-group {
    width: 100%;
    height: 1000rpx;
    background: #ccc;
}

.listview-group .itemview-group {
    width: 100%;
    height: 200rpx;
    background: pink;
    display: flex;
    justify-content: flex-start;
}

.itemview-group .chatarea-group {
    height: 100%;
    background: burlywood;
    display: inline-block;
}

.chatarea-group .chat-group {
    height: 100%;
    background: skyblue;
}

.itemview-group .delete-group {
    width: 200rpx;
    height: 100%;
    background: red;
    line-height: 200rpx;
    text-align: center;
}

movablechatdemo.js

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

        var systemInfo = wx.getSystemInfoSync();
        var windowWidth = systemInfo.windowWidth;

        this.setData({
            windowWidth: windowWidth
        })
    },

    onTouchStartEvent: function(event) {
        console.log("=======onTouchStartEvent");
        console.log(event);

        var startPageX = event.touches[0].pageX;
        this.setData({
            startPageX: startPageX
        })
    },

    onTouchEndEvent: function(event) {
        console.log("=======onTouchEndEvent");
        console.log(event);

        var endPageX = event.changedTouches[0].pageX;
        var startPageX = this.data.startPageX;
        var changeX = this.data.changeX;
        // 如果起始点大于结束点，说明是往左滑动
        if (startPageX > endPageX) {
            if (changeX < -20) {
                this.setData({
                    x: -100
                })
            } else {
                this.setData({
                    x: 0
                })
            }
        } else {
            //说明是往右滑动
            if (changeX > -80) {
                this.setData({
                    x: 0
                })
            } else {
                this.setData({
                    x: -100
                })
            }
        }

        this.setData({
            endPageX: endPageX
        })
    },

    onChangeEvent: function(event) {
        console.log("=======onChangeEvent");
        console.log(event);
        var changeX = event.detail.x;
        this.setData({
            changeX: changeX
        })
    }
})
```

## 64 icon组件

> folder icondemo

### icon

1. type 必填项 icon的类型，有效值：success, success_no_circle, info, warn, waiting, cancel, download, search, clear
2. size 23默认 icon的大小
3. color icon的颜色

```
icondemo.wxml

<icon type="clear" size="23" />
<view class="container">
    <icon type="success" size="100" />
    <view class="text-group">操作成功</view>
    <button class="success-btn" type="primary" style="width:{{screenWidth*2}}rpx">完成</button>

     <icon type="waiting" size="100" />
    <view class="text-group">倒计时....{{seconds}}</view>
    <button class="cancel-btn" type="default" style="width:{{screenWidth*2}}rpx">取消</button>
</view>


icondemo.wxss

.text-group {
    margin-top: 20rpx;
}

.success-btn {
    width: 100%;
    margin-top: 40rpx;
    margin-bottom: 40rpx;
}

.cancel-btn {
    width: 100%;
    margin-top: 40rpx;
}

icondemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        seconds: 5
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var system = wx.getSystemInfoSync();
        console.log(system);
        var screenWidth = system.screenWidth;
        var that = this;
        setInterval(() => {
            var seconds = that.data.seconds;
            if (seconds >= 1) {
                that.setData({
                    seconds: seconds - 1
                })
            }
        }, 1000);

        this.setData({
            screenWidth: screenWidth - 40
        })

    }
})
```