import { query } from '../../../utils/util';

let queryInstance = new query('activity');

// 活动编码
export const actCode = 'HighInterest518ActCode';

//活动首页
export const ActivityHome = (data) => {
    return queryInstance.post('/ActivityHome', data);
}

//添加提醒记录
export const addRemind = (data) => {
    return queryInstance.post('/addRemind', data);
}

//取消提醒记录
export const cancelRemind = (data) => {
    return queryInstance.post('/cancelRemind', data);
}

//查询抢购记录
export const queryPanicBuyRecord = (data) => {
    return queryInstance.post('/queryPanicBuyRecord', data);
}
