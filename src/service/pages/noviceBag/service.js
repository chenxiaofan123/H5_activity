import {query} from '../../../utils/util';

let queryInstance = new query();

/****
 *  新手有礼
 */

//礼包详情页-
export const getGiftPacksInfo = (data) => {
    return queryInstance.get('giftpacks/info/getGiftPacksInfo', data);
}

