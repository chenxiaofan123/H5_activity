/**
 * Created by ckid_hjqb on 2017/4/21.
 */
const Mock=require('mockjs');
module.exports={
    'code':"0000",
    'success':true,
    'data':{
        actEndTime:'2017-12-06 23:59:59',
        actStartTime:'2017-12-06 00:00:00',
        infoList:[
        {
        	accumulateRate:0,
        	endTime:'2017-12-06 23:59:59',
        	rewardCode:111,
        	startTime:'2017-12-06 12:00:00',
        	status:2,       	
        },
         {
        	accumulateRate:0,
        	endTime:'2017-12-06 23:59:59',
        	rewardCode:111,
        	startTime:'2017-12-06 17:00:00',
        	status:-1,       	
        }
        ],
        isHasStore:1
    },
    'serverTime':new Date().getTime()
}