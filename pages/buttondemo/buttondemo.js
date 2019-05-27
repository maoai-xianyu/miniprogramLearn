// pages/buttondemo/buttondemo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        newses: [],
        sources: [
            '习近平向中国国际大数据产业博览会致贺信',
            '下周四见 这场中美主播的现场辩论拭目以待',
            '多个组织停华为会员 这波打击影响究竟如何',
            '特朗普访日第一晚不约安倍 急吼吼见这些人',
            '40位老干部揭秘 因腐败被判死的国家领导人等大案',
            '这份任前公示 近半干部的前任都出事了',
            '蔡英文喊话“再给我4年” 台网友的回复亮了',
            '台湾又被标注为“中国台湾省” 蔡英文当局气炸',
            '这家国企的俄语介绍简单粗暴 这几个字彰显霸气',
            '巴西总统称“日本啥都小” 日媒痛批',
            '国产航母昨日出海海试 或未来两月内交付入列(图)',
            '温州医生被公职人员殴打 当地宣传部：不值得报道',
            '庞青年南阳投资隐情:圈地千亩 政府出40亿帮卖车?',
            '9天死10人珠峰现拥堵 登山客魂断雪堆前留下视频',
            '男子账户多出50万吓得报警 警察：就是你的',
            '女子不堪家暴砍丈夫51刀 犯故意杀人罪被判三年半',
            '女子收到快递以为是惊喜 刚打开大叫：疼到心脏了',
            '特朗普坚称遭“未遂政变” 外媒：恶性循环新阶段',
            '190天3次现场办公 南阳书记为何钟爱青年汽车项目？',
            '[中美女主播约辩前 中外男学者也互怼一番 中美女主播有啥背景]',
            '[任正非：华为根本不会“死” 美国以为还是架炮吓唬一国的时代]',
            '[央视快评：坚守初心 为国奉献 老英雄张富清感人故事诠释初心]',
            '[安倍讨好特朗普太拼 却难掩尴尬 相扑馆迎特朗普做极罕见改变]',
            '肯塔基州女性堕胎后蒙面出行'
        ],
        haveMoreLoading: true

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        setTimeout(() => {
            var sources = that.data.sources;
            var newses = [];
            for (let index = 0; index < 10; index++) {
                var news = sources[index];
                newses.push(news);
            }
            console.log("定时加载，一直在走");
            that.setData({
                newses: newses
            })

        }, 1000)

    },

    // 页面滚动底部触发的方法
    onReachBottom: function() {
        console.log("到底部了");
        var that = this;
        setTimeout(() => {
            var newses = that.data.newses;
            var newsesLength = newses.length;
            var sources = that.data.sources;
            var sourcesLength = sources.length;
            if (newsesLength === sourcesLength) {
                that.setData({
                    haveMoreLoading: false
                })
                return;
            }
            var start = newsesLength;
            var end = Math.min(start + 9, sourcesLength - 1);
            for (var index = start; index <= end; index++) {
                var news = sources[index];
                newses.push(news);
            }
            that.setData({
                newses: newses
            })
        }, 1000);

    }
})