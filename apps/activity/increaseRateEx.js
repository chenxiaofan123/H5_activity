
let testData = { test: false };
const log = require('bunyan').createLogger({ name: 'app' });
const common = require('../utils/common.js');
let _ = require('lodash');

/**
 * @name ActivityHome
 * 活动首页
 * @param actCode 活动编码  telephone 手机号码
 */
function* ActivityHome() {
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "activity/fourYearAct/highInterest/ActivityHome";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, telephone
    }), sessionId);
    // console.log(this.body)
}
/**
 * @name addRemind
 * 添加提醒记录
 * @param actCode 活动编码  telephone 手机号码  remindDate  提醒日期  
 */
function* addRemind() {
    let actCode = this.request.body.actCode;
    let remindDateArray = this.request.body.remindDateArray;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "activity/fourYearAct/highInterest/addRemind";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, remindDateArray, telephone
    }), sessionId)
}


/**
 * @name addRemind
 * 取消提醒记录
 * @param actCode 活动编码  telephone 手机号码  remindDate  提醒日期  
 */
function* cancelRemind() {
    let actCode = this.request.body.actCode;
    let remindDate = this.request.body.remindDate;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "activity/fourYearAct/highInterest/cancelRemind";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, remindDate, telephone
    }), sessionId)
}

/**
 * @name queryPanicBuyRecord
 * 查询抢购记录
 * @param actCode 活动编码  telephone 手机号码
 */
function* queryPanicBuyRecord() {
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "activity/fourYearAct/highInterest/queryPanicBuyRecord";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, telephone
    }), sessionId);
}

module.exports = {
    ActivityHome,
    addRemind,
    cancelRemind,
    queryPanicBuyRecord
}
