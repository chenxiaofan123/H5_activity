
const router = require('koa-router')();
const price = require('../../apps/info/price.js');

router.get( '/info/price', price.query);
router.get('/info/getServerTime', function*(){
    this.body = {
        serverTime: new Date().getTime(),
        code:'0000'
    }
})

router.post('/info/marketPrice', price.marketPrice);
module.exports = router.middleware();