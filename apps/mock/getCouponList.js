/**
 * Created by ckid_hjqb on 2017/4/21.
 */
const Mock=require('mockjs');
module.exports={
    'code':"0000",
    'success':true,
    'data':{
        'couponSecKillList':[{
            "killNo|1-100":1,
            "maxNum|+1":[1000,500,300],
            "rate|+1": [1,2,3],
            "startTime": '2017-11-30 16:21:00',
            "endTime": '2017-11-30 23:59:59',
            "status": 0 //-1不可秒杀 (倒计时)  0 可以秒杀 1 已抢到  2  已抢光 
            },
            {
            "killNo|1-100":1,
            "maxNum|+1":[1000,500,300],
            "rate|+1": [1,2,3],
            "startTime": '2017-11-29 00:00:00',
            "endTime": '2017-11-29 23:59:59',
            "status": 0 //-1不可秒杀 (倒计时)  0 可以秒杀 1 已抢到  2  已抢光 
            },
            {
            "killNo|1-100":1,
            "maxNum|+1":[1000,500,300],
            "rate|+1": [1,2,3],
            "startTime": '2017-11-30 13:00:00',
            "endTime": '2017-11-30 23:59:59',
            "status": 0 //-1不可秒杀 (倒计时)  0 可以秒杀 1 已抢到  2  已抢光 
            },
            {
            "killNo|1-100":1,
            "maxNum|+1":[1000,500,300],
            "rate|+1": [1,2,3],
            "startTime": '2017-11-29 00:00:00',
            "endTime": '2017-11-29 23:59:59',
            "status": 2 //-1不可秒杀 (倒计时)  0 可以秒杀 1 已抢到  2  已抢光 
            }
        ],
        secKillResult:{
            firstSecKillResults:[{
                expireMsg:'1',
                status:2 
            }],
            secondSecKillResults:[{
                expireMsg:'1',
                status:3 
            }],
            thirdSecKillResults:[{
                expireMsg:'1',
                status:4 
            }],
            forthSecKillResults:[{
                expireMsg:'1',
                status:5 
            }]
        }
    },
    'serverTime':new Date().getTime()
}