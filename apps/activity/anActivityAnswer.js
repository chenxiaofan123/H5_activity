
let testData = { test: false };
const log = require('bunyan').createLogger({ name: 'app' });
const common = require('../utils/common.js');
let _ = require('lodash');

/**
 * @name 下一题
 * 
 * @param 
 */
function* nextQuestion() {
    let actCode = this.request.body.actCode;
    let paperCode =this.request.body.paperCode;
    let questionNo =this.request.body.questionId;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "childrenAnswer/nextQuestion";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, paperCode,questionNo,telephone	
    }), sessionId);
}
//请求答案
function* checkAnswer() {
    let actCode = this.request.body.actCode;
    let isTimeOut = this.request.body.isTimeOut;
    let paperCode = this.request.body.paperCode;
    let questionNo =this.request.body.questionId;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let userSelect =this.request.body.userSelect;
    let url = "childrenAnswer/checkAnswer";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, isTimeOut, paperCode,questionNo,telephone,userSelect
    }), sessionId)
}
//提交试卷
function* submitPaper() {
    let actCode = this.request.body.actCode;
    let paperCode = this.request.body.paperCode;
    let sessionId =this.request.body.sessionId;
    let telephone =this.request.body.telephone;
    let url = "childrenAnswer/submitPaper";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode,paperCode,telephone
    }), sessionId)
}


/**
 * 活动主页面
 */
function* mainPage() {
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "childrenAnswer/mainPage";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, telephone
    }), sessionId);
}
/**
 * 英雄榜
 */
function* heroList() {
    let actCode = this.request.body.actCode;
    let size = this.request.body.size;
    let specialRank = this.request.body.specialRank;
    let url = "childrenAnswer/heroList";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode,size,specialRank
    }));
}
/**
 * 开始答题
 */
function* startTest() {
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "childrenAnswer/startTest";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, telephone
    }),sessionId);
}
/**
 * 领取机会
 */
function* getChange() {
    let actCode = this.request.body.actCode;
    let receiveCount = this.request.body.receiveCount;
    let receiveType = this.request.body.receiveType;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "childrenAnswer/getChange";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode, receiveCount , receiveType , telephone
    }),sessionId);
}
/**
 * 我的奖励
 */
function* myReward() {
    let actCode = this.request.body.actCode;
    let size = this.request.body.size;
    let start = this.request.body.start;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "childrenAnswer/myReward";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode , size , start , telephone
    }),sessionId);
}
/**
 * 查询活动状态
 */
function* queryActStatus() {
    let actCode = this.request.body.actCode;
    let url = "childrenAnswer/queryActStatus";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode
    }));
}
/**
 * 活动主页面-活动结束
 */
function* actFinishPage() {
    let actCode = this.request.body.actCode;
    let telephone = common.getTelephone(this);
    let sessionId = common.getSessionId(this);
    let url = "childrenAnswer/actFinishPage";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        actCode,telephone
    }),sessionId);
}
/**
 * 七夕答题-获取测试记录
 */
function*getQixiAnswerRecord(){
    let requestNo = this.request.body.requestNo;
    let url = "activity/qixi/getQixiAnswerRecord";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        requestNo
    }));
}
 /**
 * 七夕答题-获取测试结果
 */
function*getQixiAnswerResult(){
    let fourthQuestion = this.request.body.fourthQuestion;
    let sex = this.request.body.sex;
    let thirdQuestion = this.request.body.thirdQuestion;
    let url = "activity/qixi/getQixiAnswerResult";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        fourthQuestion,
        sex,
        thirdQuestion
    }));
}
module.exports = {
    nextQuestion,
    checkAnswer,
    submitPaper,
    mainPage,
    heroList,
    startTest,
    getChange,
    myReward,
    queryActStatus,
    actFinishPage,
    getQixiAnswerRecord,
    getQixiAnswerResult
}
