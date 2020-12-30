
const router = require('koa-router')();
const anActivityAnswer = require('../../apps/activity/anActivityAnswer');

router.prefix('/childrenAnswer');


//请求下一题
router.post('/nextQuestion', anActivityAnswer.nextQuestion);
//活动主页面-活动中
router.post('/mainPage', anActivityAnswer.mainPage);
//活动主页面-活动结束
router.post('/actFinishPage', anActivityAnswer.actFinishPage);
//英雄榜
router.post('/heroList', anActivityAnswer.heroList);
//开始答题
router.post('/startTest', anActivityAnswer.startTest);
//领取机会
router.post('/getChange', anActivityAnswer.getChange);
//领取机会
router.post('/myReward', anActivityAnswer.myReward);
router.post('/checkAnswer', anActivityAnswer.checkAnswer);
//请求下一题
router.post('/submitPaper', anActivityAnswer.submitPaper);
//查询活动状态
router.post('/queryActStatus', anActivityAnswer.queryActStatus);
//七夕答题-获取测试记录
router.post('/getQixiAnswerRecord',anActivityAnswer.getQixiAnswerRecord);
//七夕答题-获取测试结果
router.post('/getQixiAnswerResult',anActivityAnswer.getQixiAnswerResult);
module.exports = router.routes();