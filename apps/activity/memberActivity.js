
let testData={test:false};
const log = require('bunyan').createLogger({name: 'app'});
const common = require('../utils/common.js');
let _ =require('lodash');

/**
 * @name memberGradeInfo
 *查询会员等级
 *
 */
function *memberGradeInfo(){
    let query = this.request.body;
    let telephone = query.telephone;
    let sessionId = query.sessionId;
    let url = "/member/info";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        telephone
    }),sessionId)
}
/**
 * @name memberTargetInfo
 *会员专享安心智选
 *
 */
function *memberTargetInfo(){
    let url = "/member/target/info";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData))
}

module.exports = {
    memberGradeInfo,
    memberTargetInfo
}
