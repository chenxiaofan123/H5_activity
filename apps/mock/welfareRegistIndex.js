
const Mock=require('mockjs');
module.exports={
    'code':'0000',
    'success':true,
    'data':{
    	couponList: 
    	[
    	{
    		endTime:'2017/10/11',
    		indexNo:0,
    		startTime:'2017/10/9',
    		status:0 //0发放中 1去使用 2已经使用 3已经过期
    	},
    	{
    		endTime:'2017/10/11',
    		indexNo:1,
    		startTime:'2017/10/9',
    		status:0 //0发放中 1去使用 2已经使用 3已经过期
    	},
    	{
    		endTime:'2017/10/11',
    		indexNo:2,
    		startTime:'2017/10/9',
    		status:0 //0发放中 1去使用 2已经使用 3已经过期
    	}
    	],
        endTime:'2017/12/31 00:00:00',
        startTime:'2017/11/27 00:00:00',
        newUserGoldBuyStatus:2 //0可以购买 1已经购买 2无法购买
    },
    serverTime:new Date().getTime()
}