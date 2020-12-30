import {query} from '../../../utils/util';

let queryInstance = new query('info');
//邀请20名列表
export const getDepositList4PrizeDraw=(data)=>{
    return queryInstance.post('/getDepositList4PrizeDraw',data);
}
//获取新手金信息
export const getNewUserGoldInfo = ()=>{
    return queryInstance.post('/getNewUserGoldInfo',{});
}
export const findHomeInfo = ()=>{
    return queryInstance.post('/findHomeInfo',{});
}

