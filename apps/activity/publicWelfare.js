let testData={test:false};
const log = require('bunyan').createLogger({name: 'app'});
const common = require('../utils/common.js');
let _ =require('lodash');

/**
 * @name 
 *公益活动
 *
 */ 
//公益标进展情况
function *getPublicBenefitInfo(){ 
    let url = "/activity/query/getPublicBenefitInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
    }),null)
}

function *getMyParticipationInfo(){ 
    let telephone = this.request.body.telephone;
    let sessionId =  this.request.body.sessionId;
    // console.log(sessionId)
    let url = "/activity/query/getMyParticipationInfo";
    this.body = yield this.commonQuery.post(url, Object.assign({}, testData, {
        telephone
    }),sessionId)
}


module.exports = {
    getPublicBenefitInfo,
    getMyParticipationInfo
}