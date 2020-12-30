import { query } from '../../../utils/util';

let queryInstance = new query('/childrenAnswer');

//活动code
export const actCode = 'answer0604'
//export const actCode = 'hyzy0527'
//分享code
export const shareCode = 'answerShare20190528'
//请求下一题
export const nextQuestion = (data) => {
    return queryInstance.post('/nextQuestion', data);
}
//请求答案
export const checkAnswer = (data) => {
    return queryInstance.post('/checkAnswer', data);
}

//请求答案
export const submitPaperLast = (data) => {
    return queryInstance.post('/submitPaper', data);
}
//活动主页面
export const mainPage = (data) => {
    return queryInstance.post('/mainPage', data);
}
//英雄榜
export const heroList = (data) => {
    return queryInstance.post('/heroList', data);
}
//开始答题
export const startTest = (data) => {
    return queryInstance.post('/startTest', data);
}
//领取机会
export const getChange = (data) => {
    return queryInstance.post('/getChange', data);
}
//我的奖励
export const myReward = (data) => {
    return queryInstance.post('/myReward', data);
}
//查询活动状态
export const queryActStatus = (data) => {
    return queryInstance.post('/queryActStatus', data);
}
//活动结束-直播页面
export const actFinishPage = (data) => {
    return queryInstance.post('/actFinishPage', data);
}
//七夕答题-获取测试结果
export const getQixiAnswerResult = (data) => {
    return queryInstance.post('/getQixiAnswerResult', data);
}
//七夕答题-获取测试记录
export const getQixiAnswerRecord = (data) => {
    return queryInstance.post('/getQixiAnswerRecord', data);
}
