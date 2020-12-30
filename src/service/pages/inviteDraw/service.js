import {query} from '../../../utils/util';

let queryInstance = new query('activity');

/****
 * 主邀请活动 server
 */

    // 活动编码
export const actCode = 'opn0002';
export const actCodeInvite = 'opn0003';
/* export const seqNo=1;
 export const prizeType=3;*/
export const shareCode = 'inviteDrawsharecode';
export const actTime = '201808';
export const fourYearShareCode = 'invitefriends';
export const prizeNameList = [12610, 10022, 19862, 18602, 15635, 16997, 16223, 16221, 15213, 17451, 15672, 14136, 11698, 13785, 12387, 12169, 18954, 12321, 18989, 12245, 18565, 18558, 19659, 15212, 14632, 18412, 13344, 12233, 15566, 18899];

//达人榜100名
export const getCurrentMonthHundredTopList = (data) => {
    return queryInstance.post('/getCurrentMonthHundredTopList', data);
}
//四周年达人榜
export const getCurrentHundredTopList = (data) => {
    return queryInstance.post('/getCurrentHundredTopList', data);
}

//当月前3名
export const getCurrentMonthTopList = (data) => {
    return queryInstance.post('/getCurrentMonthTopList', data);
}

//人脉pk 个人奖励排名
export const getPersonPKRewardRank = (data) => {
    return queryInstance.post('/getPersonPKRewardRank', data);
}
//四周年人脉pk 个人奖励排名
export const getPersionInviteRank = (data) => {
    return queryInstance.post('/getPersionInviteRank', data);
}
//邀请奖励详情
export const getUserRewardInfo = (data) => {
    return queryInstance.post('/getUserRewardInfo', data);
}

//邀请收益
export const getUserBasicActInfo = (data) => {
    return queryInstance.post('/getUserBasicActInfo', data);
}

//抽奖
export const lotteryDraw = (data) => {
    return queryInstance.post('/lotteryDraw', data);
}

//邀请好友记录
export const getUserInviteInfo = (data) => {
    return queryInstance.post('/getUserInviteInfo', data);
}

//邀请20名列表
export const getCurrentMonthLastHundredList = (data) => {
    return queryInstance.post('/getCurrentMonthLastHundredList', data);
}
//四周年邀请20名列表
export const getLatestInviteList = (data) => {
    return queryInstance.post('/getLatestInviteList', data);
}
//邀请活动-开启天降豪礼
export const openFirstReward = (data) => {
    return queryInstance.post('/openFirstReward', data);
}
//四周年暂列第一
export const getFirstReward = (data) => {
    return queryInstance.post('/getFirstReward', data);
}

