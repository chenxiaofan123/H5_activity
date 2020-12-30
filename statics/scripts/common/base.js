
/**
 * Created by wangzhenpeng on 2016/3/17.
 */
/**
 *  设置全局变量
 *  正式与测试的不同
 *  根据protocol来设定是https还是http
 **/

/***设置公共方法***/
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}

	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
/**
 **重写toFixed,解决精度问题
 **/
Number.prototype.toFixed = function(s) {
	var changenum;
	if(this > 0) {
		changenum = (parseInt(this * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
	} else {
		changenum = (parseInt(this * Math.pow(10, s) - 0.5) / Math.pow(10, s)).toString();
	}
	var index = changenum.indexOf(".");
	if(index < 0 && s > 0) {
		changenum = changenum + ".";
		for(var i = 0; i < s; i++) {
			changenum = changenum + "0";
		}
	} else {
		index = changenum.length - index;
		for(var i = 0; i < (s - index) + 1; i++) {
			changenum = changenum + "0";
		}
	}
	return changenum;
}
/***
 * js 浮点数计算 精度问题解决
 * ***/
//加法
Number.prototype.add = function(arg) {
	var r1, r2, m;
	try { r1 = this.toString().split(".")[1].length } catch(e) { r1 = 0 }
	try { r2 = arg.toString().split(".")[1].length } catch(e) { r2 = 0 }
	m = Math.pow(10, Math.max(r1, r2))
	return(this * m + arg * m) / m
}
//减法
Number.prototype.sub = function(arg) {
	return this.add(-arg);
}
//乘法
Number.prototype.mul = function(arg) {
	var m = 0,
		s1 = this.toString(),
		s2 = arg.toString();
	try { m += s1.split(".")[1].length } catch(e) {}
	try { m += s2.split(".")[1].length } catch(e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//除法
Number.prototype.div = function(arg) {
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try { t1 = this.toString().split(".")[1].length } catch(e) {}
	try { t2 = arg.toString().split(".")[1].length } catch(e) {}
	r1 = Number(this.toString().replace(".", ""))
	r2 = Number(arg.toString().replace(".", ""))
	return(r1 / r2) * Math.pow(10, t2 - t1);
}
var GB = {};
GB.isLogin = true;
GB.utils = {
	temp: function(string, obj) {
		//模板替换
		return string.replace(/\$\w+\$/gi, function(matchs) {
			var returns = obj[matchs.replace(/\$/g, "")];
			return(returns + "") == "undefined" ? "" : returns;
		});
	},
	slideShowLoading: function() {
		$('.ajax_loading').show();
		setTimeout(function() {
			//请求成功,隐藏加载提示
			$('.ajax_loading').hide()
		}, 1000)
	},
	slideNoDataHtml: function($dom) {
		//没有更多数据
		$(".ajax_loading img").remove();
		//只加载一次 
		if($dom.find('.no-data').length == 0) {
			var _html = "<span class='no-data'> 没有更多数据了</span>";
			$dom.append(_html);
		}
	},
	slideNoData: function($html) {
		// 删除图片
		$(".ajax_loading img").remove();
		$(".ajax_loading .data_des").html("已全部加载完毕");

		$('.ajax_loading').show()
		setTimeout(function() {
			//请求成功,隐藏加载提示
			$('.ajax_loading').hide()
		}, 1500)
	},
	slideBottom: function(root, fn) {
		var $root = $(root);
		if(!$root[0]) {
			return;
		}
		$(window).on("scroll", function() {
			var windowheight = window.innerHeight;
			var documentheight = $(document).height();
			var scrolltop = $(window).scrollTop(); // 这里可以封装为一个方法 返回对象
			if(scrolltop >= documentheight - windowheight - 5) {
				// ajax 加载数据 根据是否有数据来进行展示
				if(fn) {
					fn();
				}
			}
		})
	},
	getUrl: function(argname) {
		var url = document.location.href;
		var arrStr = url.substring(url.indexOf("?") + 1).split("&");
		//return arrStr;
		for(var i = 0; i < arrStr.length; i++) {
			var loc = arrStr[i].indexOf(argname + "=");
			if(loc != -1) {
				return arrStr[i].replace(argname + "=", "").replace("?", "");
				break;
			}
		}
		return "";
	},
	GetRequest: function() {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = {};
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},
	clearNoNum: function(obj, num) {
		obj.value = obj.value.replace(/[^\d.]/g, ""); // 清除“数字”和“.”以外的字符
		obj.value = obj.value.replace(/^\./g, ""); // 验证第一个字符是数字而不是.
		obj.value = obj.value.replace(/\.{2,}/g, "."); // 只保留第一个. 清除多余的
		obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		// obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');// 只能输入两个小数
		obj.value = obj.value.replace(new RegExp("^(\\-)*(\\d+)\\.(\\d{0," + num + "}).*$", "gmi"), '$1$2.$3');
	},
	getWeixinlink: function() {
		var tmpTag = 'https:' == document.location.protocol ? "https:" : "http:";
		(function() {
			var hm = document.createElement("script");
			hm.src = tmpTag + "//res.wx.qq.com/open/js/jweixin-1.0.0.js";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
	},
	//判断手机系统
	getPlatform: function() {
		var userAgent = navigator.userAgent.toLowerCase();
		if(userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)) {
			return userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)[1];
		}
		return '';
	},
	initJsBridge: function(callback) {
		if(window.android_new) {
			callback(android_new)
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function() {
					callback(android_new)
				},
				false
			);
		}
	},

	//调用客户端方法(ios,android通用)
	send: function(data) {
		if(this.getPlatform() == 'android') {
			android_new.send(data);
		} else {
			ios.send(data);
		}
	},
	callCustomMethod: function(methodName, params, cb) {
		this.send({
			'methodName': methodName,
			'data': params,
			'responseCallback': function(responseData) {
				cb(responseData);
			}
		});
	},
	//打开推广(ios,android通用)
	startApp: function(methodName, params) {
		if(getPlatform() == 'android') {
			android_new.send({
				'methodName': methodName,
				'data': params,
				'responseCallback': function(responseData) {}
			});
		} else {
			ios.send({
				'methodName': methodName,
				'data': params,
				'responseCallback': function(responseData) {}
			});
		}
	},
	//拨打客服电话
	callServicePhone: function() {
		var params_phone = {
			'title': "拨打客服电话:4000-339-993",
			'message': "",
			'telephone': "4000339993",
		};
		GB.utils.callCustomMethod("callServicePhone", params_phone);
	},
	toast: function(msg) {
		var data = { 'msg': msg };
		this.send({
			'methodName': "showToast",
			'data': data,
			'responseCallback': function(responseData) {}
		});
	},
	htoast: function(msg, bottom, time, wrap) {
		var time = time || 1500;
		var wrap = wrap || "body";
		var bottom = bottom || 'default';
		var toast = document.createElement('div');
		toast.className = 'common-toast common-toast-show'
		if(bottom != 'default'&& typeof bottom=='number') {
			toast.style.bottom = bottom + "rem";
			toast.style.top='initial';
		} else if(bottom=='top'){
			toast.className = 'common-toast common-toast-top common-transform-top'
		} else {
			toast.className = 'common-toast common-toast-middle common-toast-show';
		}
		toast.innerHTML = msg
		//document.body.appendChild(toast)
		var container = document.querySelector(wrap);
		if(container) {
			container.appendChild(toast);
		} else {
			console.log('元素没有获取到');
			return;
		}
		toast.style.display = 'block'
		var timer = setTimeout(function() {
			toast.className += ' common-toast-hide'
			// if(bottom != 'default') {
			// 	toast.style.bottom = bottom + "rem";
			// } else {
			// 	toast.className = 'common-toast common-toast-middle common-toast-hide';
			// }
			clearTimeout(timer)
			var timer2 = setTimeout(function() {
				document.body.removeChild(toast)
				clearTimeout(timer2)
			}, 200)
		}, time)
	},
	htoasttop:function(msg,time){
		var time = time || 1500;
		var wrap = wrap || "body";
		var toast = document.createElement('div');
		toast.className = 'common-toast-top';
		toast.innerHTML = msg
		var container = document.querySelector(wrap);
		if(container) {
			container.appendChild(toast);
		} else {
			console.log('元素没有获取到');
			return;
		}
		setTimeout(function(){
			toast.className += ' common-transform-top';
		},10)		
		var timer = setTimeout(function() {
			toast.className += ' common-toast-hide'
			clearTimeout(timer)
			var timer2 = setTimeout(function() {
				document.body.removeChild(toast)
				clearTimeout(timer2)
			}, 200)
		}, time)
	},
	goOutSide: function(href) {
		//用第三方应用打开链接
		if(GB.utils.getPlatform() != 'android') {
			GB.utils.callCustomMethod('openSafariUrl', { "url": href });
			return false;
		} else {
			return true;
		}
	},
	template: function(templateid, wrapid, data, type) {

		var type = type || "html";
		//模板
		if(templateid.indexOf("#") <= -1) {
			templateid = "#" + templateid;
		}
		if(wrapid.indexOf("#") <= -1) {
			wrapid = "#" + wrapid;
		}
		var Template = Handlebars.compile($(templateid).html());
		var $wrap = $(wrapid);
		if(type == "html") {
			$wrap.html(Template(data));
		} else {
			$wrap.append(Template(data));
		}
	},
	isLogin: function() {
		var obj = false;
		GB.ajax({
			url: basePath + '/user/getstore',
			type: 'post',
			async: false
		}).done(function(_data) {
			var data = _data._data;
			if(data.telephone) {
				obj = data;
			}
		})
		return obj;
	},
	alert: function(msg) {
		if(GB.utils.getPlatform() == 'android') {
			GB.utils.callCustomMethod("showAlert", { 'msg': msg });
		} else {
			alert(msg);
		}
	},
	singleLogout: function(_data, fn) {
		//只执行一次 
		if(GB.isLogin) {
			if((GB[_data.code] == '0002') || (GB[_data.code] == '0003')) {
				GB.isLogin = false;
				fn();
			}
		}
	},
	singleAlert: function(_data, fn) {
		//只执行一次
		if(!GB[_data.code]) {
			GB[_data.code] = true;
			if(_data.code != '0021' && _data.code != '0091') {
				// 0021时 在ajax 单独处理
				if(fn) {
					fn();
				}
			}
		}
	},
	clickShare: function(code, param) {
		//页面内点击进行分享
		var param = param || {};
		param.code = code;
		var params_shared = {
			'type': "1", //分享类型 1：新闻类分享  2：截图分享
			'code': '', //活动code，分享统计标示
			'needLogin': '0', //0 不需要登录 1 需要登录
			'platform': '0', //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
			'pushShareMark': '', //是否需要统计用户分享
		};
		params_shared.$.extend({}, params_shared, param);
		if(!params_shared.code) {
			console.log("需要传入分享code");
			return;
		}
		GB.utils.callCustomMethod("share", params_shared);
	},
	wxShare: '',
	ModalHelper: (function(bodyCls) {
		var scrollTop;
		return {
			afterOpen: function() {
				scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				document.body.classList.add(bodyCls);
				document.body.style.top = -scrollTop + 'px';
			},
			beforeClose: function() {
				document.body.classList.remove(bodyCls);
				document.body.style.top = 0;
				$("body").scrollTop(scrollTop);
			}
		};
	})('modal-open-no-scroll'),
	countDown: function(startTime, endTime, fn, fnend, context) {
		//倒计时
		var obj = {
			day: 0,
			hour: 0,
			min: 0,
			sec: 0
		};
		var that = context || this;
		var flag = true;
		var DifferenceHour = -1;
		var DifferenceMinute = -1;
		var DifferenceSecond = -1;
		//endTime = endTime.replace(/-/g, '/');
		var Tday = new Date(endTime);
		var daysms = 24 * 60 * 60 * 1000;
		var hoursms = 60 * 60 * 1000;
		var Secondms = 60 * 1000;
		var microsecond = 1000;
		var time = new Date(startTime);

		function clock() {
			var hour = time.getHours();
			var minute = time.getMinutes();
			var second = time.getSeconds();
			var convertHour = DifferenceHour
			var convertMinute = DifferenceMinute
			var convertSecond = DifferenceSecond
			var Diffms = Tday.getTime() - time.getTime();
			if(Diffms > 0) {
				var Diffmsclone=Diffms;
				DifferenceHour = Math.floor(Diffmsclone / daysms)
				Diffmsclone -= DifferenceHour * daysms
				DifferenceMinute = Math.floor(Diffmsclone / hoursms)
				Diffmsclone -= DifferenceMinute * hoursms
				DifferenceSecond = Math.floor(Diffmsclone / Secondms)
				Diffmsclone -= DifferenceSecond * Secondms
				var dSecs = Math.floor(Diffmsclone / microsecond)
				if(DifferenceHour) {
					obj.day = DifferenceHour;
				} else {
					obj.day = "";
				}
				if(DifferenceMinute) {
					obj.hour = DifferenceMinute
				} else {
					obj.hour = "";
				}
				if(DifferenceSecond) {
					obj.min = DifferenceSecond;
				} else {
					obj.min = "";
				}
				if(dSecs) {
					obj.sec = dSecs;
				} else {
					obj.sec = "0";
				}
				if(fn) {
					// 倒计时时 执行函数					
					fn.call(that, obj);
				}
			} else {
				 //倒计时结束
               obj = "";
					if(fnend) {
						//倒计时结束回调
						fnend.call(that);
					}
			}
			time.setTime(time.getTime() + 1000);
			if(obj) {
				setTimeout(clock, 1000);
			}
		}
		clock();
	}
};

/***验证函数****/
GB.valid = {
	checkTelephone: function(telephone) {
		if(!telephone) {
			GB.utils.htoast('请输入手机号');
			return false
		}
		if(!/1[3457869]\d{9}/.test(telephone) || telephone.length != 11) {
			GB.utils.htoast('手机号格式不正确');
			return false
		}
		return true;
	}
}

GB.Ajax = {
	ajax: function(param) {
		var param = param || {};
		var defaults = {
			type: 'post',
			data: {},
			url: ''
		}
		defaults = $.extend({}, defaults, param);
		return $.ajax(defaults).then(function(_data) {
			if(_data.code === "0000") {
				return _data;
			} else {
				//console.log(_data); 
				if(_data.code === '0003') {
					//踢出  未登录 
					GB.post(basePath + '/user/setstore', { telephone: '', sessionId: '' }).done(function() {
						console.log("清除session");
					});
					//被踢 登录  
					GB.utils.callCustomMethod("kickout", { msg: _data.msg });
				} else if(_data.code === '0002') {
					//暂不处理0002
				} else if(_data.msg) {
					GB.utils.singleAlert(_data, function() {
						GB.utils.alert(_data.msg);
					})
				}
				return $.Deferred().reject(_data);
			}
		}, function(err) {
			console.log(err);

		})
	},
	//不做重复弹错误信息处理
	ajax2: function(param) {
		var param = param || {};
		var defaults = {
			type: 'post',
			data: {},
			url: ''
		}
		defaults = $.extend({}, defaults, param);
		return $.ajax(defaults).then(function(_data) {
			if(_data.code === "0000") {
				return _data;
			} else {
				//console.log(_data);
				if(_data.code === '0003' || _data.code === '0002') {
					//踢出 未登录
					GB.post(basePath + '/user/setstore', { telephone: '', sessionId: '' }).done(function() {
						console.log("清除session");
					})
				}
				if(_data.msg) {
					GB.utils.htoast(_data.msg);
				}
				return $.Deferred().reject(_data);
			}
		}, function(err) {
			console.log(err);

		})
	},
	post: function(url, data) {
		return GB.Ajax.ajax({ url: url, data: data, type: "post" });
	},
	get: function(url, data) {
		return GB.Ajax.ajax({ url: url, data: data, type: "get" });
	},
	post2: function(url, data) {
		return GB.Ajax.ajax2({ url: url, data: data, type: "post" });
	},
	get2: function(url, data) {
		return GB.Ajax.ajax2({ url: url, data: data, type: "get" });
	}
}

// 再次封装 方便调用
GB.post = function(url, data) {
	return GB.Ajax.post(url, data);
}
GB.get = function(url, data) {
	return GB.Ajax.get(url, data);
}
GB.ajax = function(param) {
	return GB.Ajax.ajax(param);
}
//不做重复弹错误信息处理
GB.ajax2 = function(param) {
	return GB.Ajax.ajax2(param);
}
GB.post2 = function(url, data) {
	return GB.Ajax.post2(url, data);
}
GB.get2 = function(url, data) {
	return GB.Ajax.get2(url, data);
}
/****弹窗组件*****/
/**功能组件 与ui相关*/
GB.Widget = function() {
	this.boudingBox = null; //属性：最外层容器
}
GB.Widget.prototype = {
	on: function(type, handler) {
		if(typeof this.handlers[type] == 'undefined') {
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
		return this;
	},
	fire: function(type, data) {
		if(this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for(var i = 0, len = handlers.length; i < len; i++) {
				handlers[i](data);
			}
		};
	},
	render: function(container) { //方法：渲染组件
		this.renderUI();
		this.handlers = {};
		this.syncUI(container);

		this.bindUI();

	},
	destroyInternal: function() {
		this.boudingBox.off();
		this.boudingBox.remove();
	},
	destroy: function() { //方法：销毁
		this.destructor();
		//解决弹窗 滚动穿透的问题 弹窗销毁后恢复原来的状态
		GB.utils.ModalHelper.beforeClose();
		this.boudingBox.off();
		this.boudingBox.remove();
	},
	renderUI: function() {}, //接口：添加dom节点
	bindUI: function() {}, //接口：监听事件
	syncUI: function(container) {}, //接口：初始化组件属性
	destructor: function() {} //接口：销毁前的处理函数 外部的东西
}
GB.utils.pop = function(options) {
	this.cfg = {
		width: 558,
		height: 245,
		title: '',
		content: "",
		type: 0,
		maskType:0,
		flag: '',
		loadingwidth: 50,
		loadingheight: 50,
		displeartime: 3000,
		handler4Displear: "",
		hasCloseBtn: true,
		hasMask: true,
		hasScroll: true,
		skinClassName: null,
		handler4CloseBtn: null,
		handler4CancleBtn: null,
		handler4SureBtn: null,
		eventHandler: null //事件句柄 content内容之间的事件绑定
	};
}
GB.utils.pop.prototype = $.extend({}, new GB.Widget(), {
	renderUI: function() {
		var html = '';
		switch(this.cfg.winType) {
			case 'landingalert':
				var title = this.cfg.title || '提示';
				var contenttext = this.cfg.content || "";
				var html1 = ' <div class="landingalert-wrap">' +
					'<div class="landingalert-title">' + title + '</div>' +
					'<div class="landingalert-tip-text">' + contenttext + '</div>' +
					'<button type="button" class="oppcloseBtn landingalert-close-btn">关闭</button>' +
					'</div>';
				this.cfg.content = html1;
				break;
			case 'downloadalert':
				var html2 = '<div class="downalert-wrap">' +
					'<p>您已经注册过了！</p>' +
					'<p>请立即下载</p>' +
					'<div class="downalertbutton download" id="J_downalert_down">立即下载黄金钱包APP</div>' +
					'<div class="downalert-close  oppcloseBtn" ></div>' +
					'</div>';
				this.cfg.content = html2;
				break;
			case 'landingalert2':
				var content = this.cfg.content || '';
				var buttontext = this.cfg.buttontext || "";
				var html2 = '<div class="downalert-wrap">' +
					content +
					'<div class="downalertbutton download" id="J_downalert_down">' + buttontext + '</div>' +
					'<div class="downalert-close  oppcloseBtn" ></div>' +
					'</div>';
				this.cfg.content = html2;
				break;
			case "alert":
				var title = this.cfg.title;
				html = '<div class="alert-title"><span class="dialogTitle">' + title + '</span><a class="dialogClose oppcloseBtn " title="关闭"></a></div>';
				var contenttext = this.cfg.content || "";
				this.cfg.content =
					'<div class="alert-Con">' +
					'<div class="windowText">' + contenttext + '</div>' +
					'</div>';
				break;
			case "showhtml":
				html = '';
				break;
			case "loading":
				html = "<div class='dialog_loading'><img style='width:" + this.cfg.loadingwidth / 75 + "rem;height:" + this.cfg.loadingheight / 75 + "rem;' src='" + basePath + "/statics/images/common/loadding.gif' /></div>";
				break;

			case "loadingWithOutMask":
			case "beforeLoading":
				html = "<div class='dialog_loading'><img style='width:" + this.cfg.loadingwidth / 75 + "rem;height:" + this.cfg.loadingheight / 75 + "rem;' src='" + basePath + "/statics/images/common/loadding.gif' /></div>";
				break;
			case "questiontip":
				// 问号提示弹窗
				var html = '<div class="pop-risk-waring">' + '    <div>' + '        <span class="source-title">' + this.cfg.title + '</span>' + '        <img src="' + basePath + '/statics/images/common/close.png" class="close oppcloseBtn">' + '    </div>' + '    <div class="content">' + '    ' + this.cfg.content + ' ' + '    </div>' + '</div>'
				this.cfg.content = html;
				break;
			default:
				html = '';
				break;
		}
		if(this.cfg.type == 'modal') {
			// 弹窗内有输入框 弹窗居于视窗的顶部
			this.boudingBox = $(
				'<div  id="' + this.cfg.flag + '" class="show_modal">' +
				'<div class="window_top">' + html + '</div>' +
				'<div class="show_modal_body">' + this.cfg.content + '</div>' +
				'</div>'
			)
		} else {
			this.boudingBox = $(
				'<div  id="' + this.cfg.flag + '" class="show_window">' +
				'<div class="window_top">' + html + '</div>' +
				'<div class="window_body">' + this.cfg.content + '</div>' +
				'</div>'
			)
		}
		/*处理模态*/
		if(this.cfg.hasMask) {
			var window_height = $(document).height();
			if(this.cfg.winType === "loadingWithOutMask") {
				this._mask = $('<div class="windowMask2"></div>');
			} else if(this.cfg.winType === "beforeLoading") {
				this._mask = $('<div class="windowMask3"></div>');
			} else {
				this._mask = $('<div class="windowMask"></div>');
			}

			this._mask.appendTo("body");
			var that = this;
			this._mask.on("click", function() {
				that.fire('close');
				that.destroy();
			})
			if(this.cfg.maskType!=0||this.cfg.winType === "loading" || this.cfg.winType === "loadingWithOutMask" || this.cfg.winType === "beforeLoading") {
				this._mask.css("z-index", 1000);
				this._mask.off("click");
			}

		}
	},
	bindUI: function() {
		var that = this;
		this.boudingBox.on("click", ".oppcloseBtn", function() {
			that.fire('close');
			that.destroy();
		});
		if(that.cfg.winType === "questiontip") {
			this.boudingBox.on("click", function() {
				that.destroy();
			})
		}
		if(this.boudingBox.find(".J_cancelBtn")[0]) {
			this.boudingBox.delegate(".J_cancelBtn", "click", function() {
				that.fire('cancel');
				that.destroy();
			})
		}
		if(this.boudingBox.find(".J_sureBtn")[0]) {
			this.boudingBox.delegate(".J_sureBtn", "click", function() {
				that.fire('sure');
				that.destroy();
			})
		}
		if(this.cfg.winType == 'downloadalert' || this.cfg.winType == 'landingalert2') {
			// 绑定下载事件
			$("#J_downalert_down").on("click", function() {
				if(openApp) {
					openApp();
				}
			})
		}
		if(this.cfg.handler4CloseBtn) {
			this.on('close', this.cfg.handler4CloseBtn);
		};
		if(this.cfg.handler4Displear) {
			this.on("displear", this.cfg.handler4Displear);
		}
		if(this.cfg.handler4CancleBtn) {
			this.on("cancel", this.cfg.handler4CancleBtn);
		}
		if(this.cfg.handler4SureBtn) {
			this.on("sure", this.cfg.handler4SureBtn);
		}

		if(this.cfg.eventHandler) {
			//如果弹窗内有其他的事件绑定 在此绑定
			this.cfg.eventHandler.call(this);
		}
	},
	syncUI: function(container) {
		$(container || document.body).append(this.boudingBox);
		GB.utils.ModalHelper.afterOpen(); //弹窗滚动穿透问题 在弹窗显示时,给body添加class
		if(this.cfg.skinClassName) {
			this.boudingBox.addClass(this.cfg.skinClassName);
		};
	},
	destructor: function() {
		this._mask && this._mask.remove();
	},
	loading: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "loading" });
		this.render(container);
		return this;
	},
	loadingWithOutMask: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "loadingWithOutMask" });
		this.render(container);
		return this;
	},
	beforeLoading: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "beforeLoading" });
		this.render(container);
		return this;
	},
	landingalert: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "landingalert" });
		this.render(container);
		return this;
	},
	landingalert2: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "landingalert2" });
		this.render(container);
		return this;
	},
	downloadalert: function(cfg, container) {
		//当手机号为已注册时,弹窗提示已注册的信息 并有下载的按钮
		$.extend(this.cfg, cfg, { winType: "downloadalert" });
		this.render(container);
		return this;
	},
	showhtml: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "showhtml" });
		this.render(container);
		return this;
	},
	questiontip: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "questiontip" });
		this.render(container);
		return this;
	}
});
GB.utils.loading = function(option, container) {
	var options = $.extend({}, option);
	var newpop = new GB.utils.pop().loading(options, container);
	return newpop;
}
GB.utils.loadingWithOutMask = function(option, container) {
	var options = $.extend({}, option);
	var newpop = new GB.utils.pop().loadingWithOutMask(options, container);
	return newpop;
}
GB.utils.beforeLoading = function(option, container) {
	var options = $.extend({}, option);
	var newpop = new GB.utils.pop().beforeLoading(options, container);
	return newpop;
}
GB.utils.landingalert = function(content, option, container) {
	if(!content) { return; }
	var options = $.extend({}, { content: content }, option);
	var newpop = new GB.utils.pop().landingalert(options, container);
	return newpop;
}
GB.utils.landingalert2 = function(content, option, container) {
	if(!content) { return; }
	var options = $.extend({}, { content: content }, option);
	var newpop = new GB.utils.pop().landingalert2(options, container);
	return newpop;
}
GB.utils.downloadalert = function(content, option, container) {
	var options = $.extend({}, { content: content }, option);
	var newpop = new GB.utils.pop().downloadalert(options, container);
	return newpop;
}
GB.utils.showhtml = function(option, container) {
	var options = $.extend({}, option);
	var newpop = new GB.utils.pop().showhtml(options, container);
	return newpop;
}

GB.utils.questiontip = function(title, content, option, container) {
	var options = $.extend({ title: title, content: content }, option);
	var newpop = new GB.utils.pop().questiontip(options, container);
	return newpop;
}


/******
 * 与app交互相关
 */

GB.utils=$.extend({},GB.utils,{
	clientInit:function(cb,context){
		var context=context||this;
		// 客户端初始化之后调用 依赖与 clientReady函数 排除右上角的分享调用 
		sessionProObj.getUserInfo(function(telephone,sessionId){
           if(cb){
			   cb.call(context,telephone,sessionId);
		   }
		})

	}
})