
let testData={test:false};
const log = require('bunyan').createLogger({name: 'app'});
const common = require('../utils/common.js');
let _ =require('lodash');

/**
 * @name getYearEndDetail
 *年终盘点活动详情
 *
 */
function *getYearEndDetail(){
    let telephone = this.request.body.telephone;
    let sessionId = this.request.body.sessionId;
    console.log(sessionId)
    let url = "user/yearEnd/check";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        telephone
    }),sessionId)
}


module.exports = {
    getYearEndDetail,
}
