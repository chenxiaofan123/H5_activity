import {query} from '../../../utils/util';

let queryInstance = new query('activity');

/****
 *  公益活动
 */

export const publicWelfareShareCode = 'publicWelfareShareCode';

//查询公益标进展情况
export const getPublicBenefitInfo = (data) => {
    return queryInstance.post('/query/getPublicBenefitInfo', data);
}
//查询用户投资金额以及爱心数
export const getMyParticipationInfo = (data) => {
    return queryInstance.post('/query/getMyParticipationInfo', data);
}

