
let testData={test:false};
const log = require('bunyan').createLogger({name: 'app'});
const common = require('../utils/common.js');
let _ =require('lodash');

/**
 * @name getCurrentMonthLastHundredList
 * 邀请20名列表
 * @param actCode 活动编码  telephone 手机号码
 */
function *getCurrentMonthLastHundredList(){
    let actCode = this.request.body.actCode;
    let sessionId = common.getSessionId(this);
    let url = "/activity/oldpullnew/getCurrentMonthLastHundredList";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode
    }), sessionId)
}
/*
* 四周年邀请升级20排名
* */
function *getLatestInviteList(){
    let actCode = this.request.body.actCode;
    let sessionId = common.getSessionId(this);
    let url = "/activity/oldpullnew/getLatestInviteList";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode
    }), sessionId)
}
/**
 * @name secKillCoupon
 *  获取活动信息
 * @param actCode 活动编码
 */

function *getFifaInfo() {
    let actCode = this.request.body.actCode;
    let url = "/activity/fifa/getFifaInfo";
    let result='';
    result = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode
    }));
    // 需要对数据进行处理
    //热门球队列表
    let sourcearr=result.data.teamArray.concat();
    let hotArray=[], allteamArray=[],teamOrderArray=[];
    hotArray=  sourcearr.filter(function(item){
        return item.isHot;
    })

    hotArray=hotArray.sort(function(a,b){
        return a.hotSort-b.hotSort;
    })

    let centerArr=_.chunk(sourcearr,4);
    centerArr.forEach(function(item){
        item=item.sort(function(a,b){
            return a.groupSort-b.groupSort;
        })
        allteamArray=allteamArray.concat(item);
    })
    teamOrderArray = sourcearr.sort(function(a,b){
        return b.teamNotes-a.teamNotes;
    })
    result.data.hotArray=hotArray;
    result.data.allteamArray=allteamArray;
    result.data.teamOrderArray=teamOrderArray;
    this.body=result;
}

/**
 * @name getUserInviteInfo
 * 邀请好友记录
 * @param actCode 活动编码  telephone 手机号码
 */
function *getUserInviteInfo(){
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "/activity/oldpullnew/getUserInviteInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, telephone
    }), sessionId)
}

/**
 * @name lotteryDraw
 * 抽奖
 * @param actCode 活动编码  telephone 手机号码
 */
function *lotteryDraw(){
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "/activity/oldpullnew/lotteryDraw";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, telephone
    }), sessionId);
}
/**
 * @name getUserBasicActInfo
 * 邀请收益
 * @param actCode 活动编码  telephone 手机号码
 */
function *getUserBasicActInfo(){
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "/activity/oldpullnew/getUserBasicActInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode,telephone
    }), sessionId);
}

/**
 * @name getUserRewardInfo
 * 邀请奖励详情
 * @param actCode 活动编码  telephone 手机号码
 */
function *getUserRewardInfo(){
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "/activity/oldpullnew/getUserRewardInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode,telephone
    }), sessionId);
}

/**
 * @name getPersonPKRewardRank
 * 人脉pk 个人奖励排名
 * @param actCode 活动编码  telephone 手机号码
 */
function *getPersonPKRewardRank(){
    let actTime = this.request.body.actTime;
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "/activity/oldpullnew/getPersonPKRewardRank";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actTime,telephone,actCode
    }), sessionId);
}

/*
* 四周年我的奖励排名
* */
function *getPersionInviteRank(){
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "/activity/oldpullnew/getPersionInviteRank";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        telephone,actCode
    }), sessionId);
}

/**
 * @name getCurrentMonthTopList
 * 当月前3名
 * @param actCode 活动编码  telephone 手机号码
 */
function *getCurrentMonthTopList(){
    let actCode = this.request.body.actCode;
    let sessionId = common.getSessionId(this);
    let url = "/activity/oldpullnew/getCurrentMonthTopList";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode
    }), sessionId);
}
/**
 * @name getCurrentMonthHundredTopList
 * 达人榜100名
 * @param actCode 活动编码  telephone 手机号码
 */
function *getCurrentMonthHundredTopList(){
    let actCode = this.request.body.actCode;
    let sessionId = common.getSessionId(this);
    let url = "activity/oldpullnew/getCurrentMonthHundredTopList";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode
    }), sessionId);
}
/*
* 四周年达人榜
* */
function *getCurrentHundredTopList(){
    let actCode = this.request.body.actCode;
    let num = this.request.body.num;
    let sessionId = common.getSessionId(this);
    let url = "activity/oldpullnew/getCurrentHundredTopList";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode,num
    }), sessionId);
}

/*
* 四周年获取暂列第一
* */
function *getFirstReward(){
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "activity/oldpullnew/getFirstReward";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode,telephone
    }),sessionId);
}

/*
*邀请活动-开启天降豪礼
* */
function *openFirstReward(){
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "activity/oldpullnew/openFirstReward";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode,telephone
    }),sessionId);
}


module.exports = {
    getCurrentMonthLastHundredList,
    getFifaInfo,
    getUserInviteInfo,
    lotteryDraw,
    getUserBasicActInfo,
    getUserRewardInfo,
    getPersonPKRewardRank,
    getCurrentMonthTopList,
    getCurrentMonthHundredTopList,
    getLatestInviteList,
    getCurrentHundredTopList,
    getPersionInviteRank,
    getFirstReward,
    openFirstReward
}
