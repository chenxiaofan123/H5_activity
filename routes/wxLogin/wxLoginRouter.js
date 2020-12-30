/**
 * Created by ckid_hjqb on 2017/6/16.
 */

let router = require('koa-router')();
//const body = require('koa-better-body')
let wxController = require('../../apps/wxLogin/wxLoginController')
router.get('/wxLogin', wxController.wxLogin);
router.get('/wxLoginOpen', wxController.wxLoginOpen);
//router.get('/enterOpenid', body(), wxController.enterOpenid)

router.get('/enterOpenid',  wxController.enterOpenid)

module.exports = router.routes();