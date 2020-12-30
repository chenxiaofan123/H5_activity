import {query} from '../../../utils/util';

let queryInstance = new query('prizeDraw');
//用户抽奖记录
export const getUserPrizeListInfo=(data)=>{
    return queryInstance.post('/getUserPrizeListInfo',data);
}
//用户新年活动首页信息
export const getUserDrawPrizeInfo=(data)=>{
    return queryInstance.post('/getUserDrawPrizeInfo',data);
}
//用户领取每日翻盘机会
export const drawChance=(data)=>{
    return queryInstance.post('/drawChance',data);
}
//查询中奖信息列表
export const getWinningList=(data)=>{
    return queryInstance.post('/getWinningList',data);
}
//用户抽奖
export const luckDraw=(data)=>{
    return queryInstance.post('/luckDraw',data);
}
//用户信息查询
export const getNewUserPrizeInfo=(data)=>{
    return queryInstance.post('/getNewUserPrizeInfo',data);
}
//活动信息查询
export const getActInfo=(data)=>{
    return queryInstance.post('/getActInfo',data);
}

//用户奖品详细信息
export const getUserDrawPrizeDetailInfo=(data)=>{
    return queryInstance.post('/getUserDrawPrizeDetailInfo',data);
}

