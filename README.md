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