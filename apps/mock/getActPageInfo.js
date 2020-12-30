module.exports={
    'code':"0000",
    'success':true,
    'data':{
        actStatus:0, // 活动状态,
		investAmount:1000,// 投资额度
        nextInvestAmount:1000,//是否首购
        nextRewardAmount:222,
		recevieList:[{
			rewardAmount:1,
			telephone:13434324232
		},
		{
			rewardAmount:1,
			telephone:13434324232
		}],//碎片详情
        rewardAmount:12, //拥有碎片类型
        rewardConfigList:[
          {
            remainAmount:100, 
            rewardAmount:12,
            rewardId:1
          },
          {
            remainAmount:100, 
            rewardAmount:12,
            rewardId:1
          },
          {
            remainAmount:100, 
            rewardAmount:12,
            rewardId:1
          }
        ],
		rewardId:100, //红包剩余量
		rewardStatus:1,// 红包领取状态 0不可兑换 1可以兑换 2已经兑换
    },
    "msg":"操作成功"
}
