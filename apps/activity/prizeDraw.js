
let testData={test:false};
const log = require('bunyan').createLogger({name: 'app'});
const common = require('../utils/common.js');
let _ =require('lodash');

/**
 * @name getUserPrizeListInfo
 * 用户抽奖记录
 * @param actCode 活动编码  telephone 手机号码
 */
function *getUserPrizeListInfo(){
    let activityCode = this.request.body.activityCode;
    let sessionId = common.getSessionId(this);
    let telephone = common.getTelephone(this);
    let url = "/prizeDraw/user/getUserPrizeListInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        activityCode,telephone
    }), sessionId)
}
/*
* 用户新年活动首页信息
* */
function *getUserDrawPrizeInfo(){
    let activityCode = this.request.body.activityCode;
    let sessionId = common.getSessionId(this);
    let telephone = common.getTelephone(this);
    let url = "/prizeDraw/user/getUserDrawPrizeInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        activityCode,telephone
    }), sessionId)
}
/**
 * @name secKillCoupon
 *  用户领取每日翻盘机会
 * @param activityCode 活动编码
 */

function *drawChance() {
    let activityCode = this.request.body.activityCode;
    let sessionId = common.getSessionId(this);
    let telephone = common.getTelephone(this);
    let url = "/prizeDraw/user/drawChance";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        activityCode,telephone
    }),sessionId);
}
/**
 * @name getWinningList
 * 查询中奖信息列表
 * @param  activityCode 活动编码 isBigWinning 是否只查询大奖
 */

function *getWinningList() {
    let activityCode = this.request.body.activityCode;
    let prizeType = this.request.body.prizeType;
    let size = this.request.body.size;
    let url = "prizeDraw/info/getWinningList";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        activityCode,prizeType,size
    }));
}
/**
 * @name luckDraw
 * 用户抽奖
 * @param activityCode 活动编码  telephone 手机号码 seqNo 抽奖序列
 */
function *luckDraw(){
    let activityCode = this.request.body.activityCode;
    let seqNo = this.request.body.seqNo;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "prizeDraw/user/luckDraw";
    let result = yield this.commonQuery.post(url, Object.assign({}, testData, {
        activityCode,seqNo,telephone
    }), sessionId);
    let resData = null;
    console.log(result)
    console.log(111111111111)
    if(result.data.winningResult==1){//抽中之后去查询礼品详情
        let urlDetail = "prizeDraw/user/getUserDrawPrizeDetailInfo";
        let winningId = result.data.winningId
        let resDetail = yield this.commonQuery.post(urlDetail, Object.assign({}, testData, {
            activityCode,telephone,winningId
        }),sessionId)
        console.log(resDetail)
    console.log(22222222222222)
        result.data = Object.assign(result.data, resDetail.data);
    }
    console.log(result)
    console.log(3333333333)
    this.body = result
}
/**
 * @name getUserDrawPrizeDetailInfo
 * 用户奖品详细信息
 * @param activityCode 活动编码  telephone 手机号码 winningId 获奖ID
 */
function *getUserDrawPrizeDetailInfo(){
    let activityCode = this.request.body.activityCode;
    let telephone = this.request.body.telephone;
    let winningId = this.request.body.winningId;
    let sessionId = this.request.body.sessionId;
    let url = "prizeDraw/user/getUserDrawPrizeDetailInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        activityCode,telephone,winningId
    }),sessionId)
}
/**
 * @name getNewUserPrizeInfo
 * 用户信息查询
 * @param activityCode 活动编码  telephone 手机号码 seqNo 抽奖序列
 */
function *getNewUserPrizeInfo(){
    let activityCode = this.request.body.activityCode;
    let seqNo = this.request.body.seqNo;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "prizeDraw/user/getNewUserPrizeInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        activityCode,seqNo,telephone
    }), sessionId)
}
/**
 * @name getActInfo
 * 活动信息查询
 * @param activityCode 活动编码  telephone 手机号码 seqNo 抽奖序列
 */
function *getActInfo(){
    let activityCode = this.request.body.activityCode;
    let url = "prizeDraw/info/getActInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        activityCode
    }))
}


module.exports = {
    getUserPrizeListInfo,
    getUserDrawPrizeInfo,
    drawChance,
    getWinningList,
    luckDraw,
    getNewUserPrizeInfo,
    getActInfo,
    getUserDrawPrizeDetailInfo

}
