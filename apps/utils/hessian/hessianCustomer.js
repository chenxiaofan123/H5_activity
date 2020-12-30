var java = require('js-to-java');
let Proxy = require('../../lib/hessian-proxy/').Proxy;

const log = require('bunyan').createLogger({
    name: 'app'
});


class Hession {
    constructor(ctx) {

        this.loanApi = global.GLOBAL_HESSIAN;

        this.ctx = ctx;
         //客户基本信息查询
        this.customerInfoproxy = new Proxy(this.loanApi + 'customerInfoQueryFacade', '', '', this.customerInfoproxy);
    }
    *
    getCustomerInfoList(data1) {
        //客户列表
        var sessionId = data1.sessionId || '';
        var loginName = data1.loginName || '';
        var customerNo = data1.customerNo || '';
        var customerName = data1.customerName || '';
        var start = data1.start || 0;
        var size = data1.size || 10;
        var searchType = data1.searchType || ''; // 查询方式
        var sortColumn = data1.sortColumn || ''; //排序字段
        var sortDir = data1.sortDir || ''; //排序方式
        var customerType = data1.customerType || null; //类型判断

        var that = this;
        var param = {
            sessionId,
            loginName,
            customerNo,
            customerName,
            customerType,
            start,
            size,
            searchType:{name:searchType},
            sortColumn:{name:sortColumn},
            sortDir:{name:sortDir}
        };

        let result = yield new Promise(function (resolve, reject) {
            that.customerInfoproxy.invoke("getCustomerInfoList", [param], function (err, reply) {
                if (err) {
                    reject(err);
                    log.info({
                        req: param,
                        error: err
                    })
                    return;
                }
                log.info({
                    req: param,
                    res: reply
                })
                resolve(reply);
            });
        })

        return result;
    }
   
}
module.exports = function () {
    return function* (next) {
        let _ctx = this;
        //this注入post对象
        this.hessianCustomer = new Hession(_ctx);
        yield next;
    }
}