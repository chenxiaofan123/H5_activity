/**
 * Created by wanglin on 2017/7/24.
 */
import {query} from '../../../utils/util';

let queryInstance = new query('apollo');

//分享编码
export const shareCode = 'headerLiveShareCode'
export const walletCollegeShareCode = 'walletCollegeShareCode'

//
export const liveMain = () => {
    return queryInstance.get("/liveMain");
}
export const walletCollege = () => {
    return queryInstance.get("/walletCollege");
}
//公益标详情
export const getPublicDetail = () => {
    return queryInstance.get("/getPublicDetail");
}
// export const getProcessInfo = () => {
//     return queryInstance.get("/getProcessInfo");
// }
//四周年--老友聚配置信息
export const fourthFriends = (data)=>{
    return queryInstance.get("/fourthFriends",data);
}
//六一答题-直播时间
export const getLiveBroadcastTime = (data)=>{
    return queryInstance.get("/getLiveBroadcastTime",data);
}

//活动规则（2019 7月翻牌活动）
export const getActivityRules = (data)=>{
    return queryInstance.get("/getActivityRules",data);
}
