var router = require('koa-router')();
var customerRouter = require('../../apps/controller/customerController')

// 客户列表信息
router.post('/customer/getCustomerInfoList', customerRouter.getCustomerInfoList);

module.exports = router.routes();



