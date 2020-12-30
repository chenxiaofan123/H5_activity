
let testData={test:false};
const log = require('bunyan').createLogger({name: 'app'});
const common = require('../utils/common.js');
let _ =require('lodash');

/**
 * @name getGiftPacksInfo
 *礼包详情页
 *
 */
function *getGiftPacksInfo(){
    let query = this.request.query;
    let telephone = query.telephone;
    let sessionId = query.sessionId;
    console.log(sessionId)
    let url = "/giftpacks/info/getGiftPacksInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        telephone
    }),sessionId)
}


module.exports = {
    getGiftPacksInfo,
}
