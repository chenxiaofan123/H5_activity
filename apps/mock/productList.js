//黄金商城 列表查询接口 mock
// /server/goldMall/productList

// 黄金商城第一期 列表页 获取 图片
module.exports = function(param) {

	var start = param.start;
	var size = param.size;
	var result = {};
	switch(start) {
		case "0":
			result = result = {
				"data": {
					'count|1-200': 1,
					'productList|6': [{
						'isRepairStock|1': true, //是否可补充库存
						'priceMin|200000-5000000': 50000, // 最低价格
						'productCode': '@string(7,10)', // 商品编码
						'productName': '@ctitle(7)', //商品名称
						'product_img': '@image(222x222)', // 商品图片
						'stockCount|0-20': 0 //库存数量
					}]
				},
				"serverTime": 1472009471271,
				"code": "0000",
				"msg": "操作成功"
			};
			break;
			case "6":
				result = {
					"data": {
						'count|1-200': 1,
						'productList|9': [{
							'isRepairStock|1': true, //是否可补充库存
							'priceMin|200000-5000000': 50000, // 最低价格
							'productCode': '@string(7,10)', // 商品编码
							'productName': '@ctitle(7)', //商品名称
							'product_img': '@image(222x222)', // 商品图片
							'stockCount|0-20': 0 //库存数量
						}]
					},
					"serverTime": 1472009471271,
					"code": "0000",
					"msg": "操作成功"
				};
			break;
		case "15":
			result = {
				"data": {
					'count|1-200': 1,
					'productList|8': [{
						'isRepairStock|1': true, //是否可补充库存
						'priceMin|200000-5000000': 50000, // 最低价格
						'productCode': '@string(7,10)', // 商品编码
						'productName': '@ctitle(7)', //商品名称
						'product_img': '@image(222x222)', // 商品图片
						'stockCount|0-20': 0 //库存数量
					}]
				},
				"serverTime": 1472009471271,
				"code": "0000",
				"msg": "操作成功"
			};
			break;
		default:
			result = {
				"data": {
					'count|1-200': 1,
					'productList': []
				},
				"serverTime": 1472009471271,
				"code": "0000",
				"msg": "操作成功"
			};
			break;
	}
	
	return result;
}