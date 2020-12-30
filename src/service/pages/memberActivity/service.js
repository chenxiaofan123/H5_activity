import {query} from '../../../utils/util';

let queryInstance = new query('member');

//查询会员等级
export const memberGradeInfo = (data) => {
    return queryInstance.post('/memberGradeInfo', data);
}
//会员专享安心智选
export const memberTargetInfo = (data) => {
    return queryInstance.post('/memberTargetInfo', data);
}
