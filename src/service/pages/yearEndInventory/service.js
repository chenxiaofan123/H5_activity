import {query} from '../../../utils/util';

let queryInstance = new query();

/****
 *  年终盘点
 */

export const yearEndShareCode = 'yearEndShareCode';
//年终盘点详情
export const getYearEndDetail = (data) => {
    return queryInstance.post('user/yearEnd/check', data);
}

