const log = require("bunyan").createLogger({
  name: "app"
});
var parse = require("co-busboy");
let hessionUtil = require("../utils//hessian/hessianUtil");
let xss = require("xss");

/**
 * 查询客户列表信息
 * @param
 * @returns {
 *
 * }
 */

function* getCustomerInfoList() {
  let param = {
    sessionId: "1fefcf357c6c41afa52ee533fd57cc6b",
    loginName: "shenyan",
    customerNo: "",
    customerName: "",
    customerType: null,
    start: 0,
    size: 10,
    searchType:"SELF_MANAGER",
    sortColumn:"UPDATE_TIME" ,
    sortDir: "DESC"
  };
//   var loginName = 'shenyan';
//   var sessionId = '5e2c5f0632654ddc9244f1b176c7b8e9';
//   let result = "";
//   let start = this.request.body.start || 0;
//   let size = this.request.body.size||10;
//   let customerName = this.request.body.customerName || null;
//   let searchType = this.request.body.searchType || {  "SELF_MANAGER" };
//   let sortColumn = this.request.body.sortColumn || { name: "UPDATE_TIME" };
//   let sortDir = this.request.body.sortDir ||  { name: "DESC" };
//   let customerType = parseInt(this.request.body.customerType) || null;
  // if (!loginName) {
  //     this.body = {
  //         code: '00000003',
  //         msg: '测试接口,请重新登录！'
  //     }
  //     return;
  // }

  result = yield this.hessianCustomer.getCustomerInfoList(param);
  var self = this;
  if (result.message === "SUCCESS") {
    this.body = {
      code: "0000",
      data: result.data,
      data2: self.session
    };
  } else {
    this.body = {
      code: result.message,
      msg: result.chineseMessage,
      data2: self.session
    };
  }
}


module.exports = {
  getCustomerInfoList,
};
