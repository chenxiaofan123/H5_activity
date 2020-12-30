/**微信支付的功能性函数****/

//签名算法中最重要的是将对象排序拼接成字符串。

function generateSign(obj) {
	let string = raw(obj) //将对象排序拼接为字符串
	return md5(string).toUpperCase()
}

function raw(args, lowerCase = false) {
	//拼接字符串的方法，这里比较重要，微信有个官方的实现方法。
	//但是有点点坑，复用性也不是太强，我稍微修改了一下。
	//这个方法可以用在发送的数据，也可以用在接收的数据上
	//要点① 字典排序
	//要点② 值为空的属性不参与签名
	//要点③ sign 参数不参与签名
	//要点④ 真的要认认真真看文档
	var keys = Object.keys(args);
	keys = keys.sort()
	var newArgs = {};
	keys.forEach(function(key) {
		if(key != 'sign' && args[key] && (('' + args[key]).length > 0)) {
			if(lowerCase) {
				newArgs[key.toLowerCase()] = args[key];
			} else {
				newArgs[key] = args[key];
			}
		}
	});
	var string = '';
	for(var k in newArgs) {
		string += '&' + k + '=' + newArgs[k];
	}
	string = string.substr(1);
	return string;
}

function md5(str) {
	//对字符串进行 md5 加密,返回签名
	let crypto = require('crypto')
	let decipher = crypto.createHash('md5');
	return decipher.update(str).digest('hex');
}

module.exports={
	generateSign
}
