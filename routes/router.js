/**
 * Created by cr on 2016/8/18.
 */
'use strict'
const koa = require('koa');
const router = require('koa-router')();

module.exports ={};

//router.prefix('/test');
//引入模块
let price = require('./info/price'); //引入金价
let user = require('./user/user');
let userRegist = require('./user/registe');
let wxLogin = require('./wxLogin/wxLoginRouter');
let pageerr = require('./error/info');
let apollo = require('./apollo/apollo');
let inviteDraw = require('./activity/inviteDraw');
let prizeDraw = require('./activity/prizeDraw');
let publicWelfare = require('./activity/publicWelfare'); //公益标
let info = require('./info/info');
let noviceBag = require('./activity/noviceBag'); //新手大礼包
let yearEndInventory = require('./activity/yearEndInventory'); //新手大礼包
let customer = require('./hessianRouter/customerRouter') //hessian 路由
let increaseRateEx = require('./activity/increaseRateEx');
let anActivityAnswer = require('./activity/anActivityAnswer'); //六一答题
let memberActivity = require('./activity/memberActivity'); //会员活动

router.use(user); 
router.use(userRegist);
router.use(wxLogin);
router.use(pageerr);
router.use(apollo);
router.use(inviteDraw);
router.use(prizeDraw);
router.use(publicWelfare);
router.use(customer);
router.use(info);
router.use(noviceBag); //新手大礼包
router.use(price) //实时金价
router.use(yearEndInventory) //年终盘点
router.use(increaseRateEx);
router.use(anActivityAnswer);
router.use(memberActivity);
module.exports =router.middleware();



