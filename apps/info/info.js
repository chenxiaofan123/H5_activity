
'use strict';

const koa = require("koa");
const common = require('../utils/common.js');
const fs = require('co-fs');
const error = require('../utils/error.js');
const app = module.exports = {};
let testdata={test:false};
const log = require('bunyan').createLogger({name: 'app'});
/**
 * 获取标的号
 * @param
 * url:   prizeDraw/info/getDepositList4PrizeDraw
 */
app.getDepositList4PrizeDraw = function *() {
    let planCode = this.request.body.planCode;
    let url = "server/info/getDepositList4PrizeDraw";
    this.body = yield  this.commonQuery.post(url, Object.assign({}, {planCode}, testdata));
};
app.getNewUserGoldInfo = function *(){
    let url = 'server/info/getNewUserGoldInfo';
    this.body = yield this.commonQuery.post(url, Object.assign({}, testdata));
}
app.findHomeInfo = function *(){
    let url = 'server/info/findHomeInfo';
    this.body = yield this.commonQuery.post(url, Object.assign({}, testdata));
}