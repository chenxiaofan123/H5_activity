//黄金商城 详情页查询接口 mock
// /server/goldMall/productDetail

 var cb=function(param){
 	 
 	return {
	"data": {
		'count|1-200': 1 ,
		'explainImgs|3':[ // 说明图列表
        "@image(750x750)"
		],
		'detailImgs|3':[ // 详情图列表
        "@image(750x750)"
		],
		'productName':'@ctitle(7)',
		'priceMax|200000-5000000':5000,
		'priceMin|200000-5000000':5000,
		'productCode': '@string(7,10)', 
		'standardImg':'@image(222x222)', //商品规格款式图
		'standardList|6':[ //规格列表
		  {
		  	'price|1000-60000':1000,
		  	'standardCode':'@string(5,6)',
		  	'standardName':'@ctitle(7)', //规格名称
		  	'stockCount|0-4':0, //库存
		  	'weight|1000-5000':2000 //金重
		  }
		],
		'status|1-3':1 //状态 1有货，2待补货，3无货
	},
	"serverTime": 1472009471271,
	"code": "0000",
	"msg": "操作成功"
}
 }
module.exports = cb;