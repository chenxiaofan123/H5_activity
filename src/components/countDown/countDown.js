/**
 * Created by 谭瞎 on 2018/3/15.
 */

function Countdown() {
	// 设置默认参数
	this.settings = {
		id: "canvas", // ID，canvas一定要有ID属性
		size: 60, // 绘制圆形的最大尺寸，宽=高
		borderWidth:27, // 边框宽度
		borderColor: "#021FA3", // 边框颜色
		outerColor: "#fff", // 最外层底圆颜色
		scheduleColor: "#fff", // 进度条动画颜色
		fontColor: "#fff", // 字体颜色
		ringColor: "#FE4343 ", // 进度条环形颜色
		innerColor: "#021FA3", // 最内圆底色
		fontSize:20,
		time:null,
		alltime:null,
		startTime: ""
	}
	this.changeText=null;
	this.timer = null;
	this.schedule = 0;
	this.isStoped = false;
	this.isStoped_init = false;
	this._startAng = -90;
	this._stopAng = -90;
	this._endAng = 0;

	this.param = null;

	this.stop = {
		end: -90
	};
}
var date;
Countdown.prototype.init = function(opt) {
	this.param =  opt;
	this.obj = document.getElementById(this.settings.id);
	this.ctx = this.obj.getContext("2d");
	// 解决不同手机canvans绘制模糊问题
	var getPixelRatio = function (context) {
		var backingStore = context.backingStorePixelRatio ||
			context.webkitBackingStorePixelRatio ||
			context.mozBackingStorePixelRatio ||
			context.msBackingStorePixelRatio ||
			context.oBackingStorePixelRatio ||
			context.backingStorePixelRatio || 1;
		return (window.devicePixelRatio || 1) / backingStore;
	};
	//开始绘制像素比
	var ratio = getPixelRatio(this.ctx);
    // this.obj.style.width = this.obj.width + 'px';
    // this.obj.style.height = this.obj.height + 'px';
    // this.obj.width = this.obj.width * ratio;
	// this.obj.height = this.obj.height * ratio;
	//画布得宽高和样式
	this.obj.style.width =  '60px';
    this.obj.style.height =  '60px';
    this.obj.width = 60 * ratio;
	this.obj.height = 60 * ratio;

	// 放大倍数
	this.ctx.scale(ratio, ratio);
	extend(this.settings, opt);

	//this.startTime = +new Date();
	
	date = this.startTime || +new Date();
	this.startTime = +new Date();
	this.isInited = false;
	this.countdown(opt.fun);
};

// 绘制底色
Countdown.prototype.drawBackground = function() {
	this.drawCircle(0, 360, 0, this.settings.outerColor);
};
// 绘制进度条动画背景
Countdown.prototype.drawProcess = function() {
	this.drawCircle(0, 360, 4, this.settings.ringColor);
};

// 绘制倒计时
Countdown.prototype.drawInner = function() {
	this.drawCircle(0, 360, 23, this.settings.innerColor);
	this.strokeBorder(this.settings.borderWidth);
};

// 绘制进度条动画
Countdown.prototype.drawAnimate = function(schedule) {
	// 旋转的角度
	let deg = Math.PI / 180;
	let v = schedule * (360-this.stop.end-90);
	this.ved = v;
	if (this.isStoped) {
		this.ctx.beginPath();
		this.ctx.moveTo(this.settings.size / 2, this.settings.size / 2);
		this.ctx.arc(this.settings.size / 2, this.settings.size / 2, this.settings.size / 2 - 3, (-90) * deg, this.stop.end *deg,false);
		this.ctx.fillStyle = this.settings.scheduleColor;
		this.ctx.fill();
		this.ctx.closePath();

		if (!this.isStoped_init) {
			this._startAng = this.stop.end;
			this._endAng = this._startAng + v;
		} else {
			this.isStoped_init = true;
		} 
	} else {
		this._endAng = this._startAng + v;
	}
	//console.log(this.isStoped+'是否正确')
	this._stopAng = this._endAng;

	this.ctx.beginPath();
	this.ctx.moveTo(this.settings.size / 2, this.settings.size / 2);
	this.ctx.arc(this.settings.size / 2, this.settings.size / 2, this.settings.size / 2 - 3, this._startAng * deg, this._endAng *deg,false);
	this.ctx.fillStyle = this.settings.scheduleColor;
	this.ctx.fill();
	this.ctx.closePath();

};
// 绘制边框
Countdown.prototype.strokeBorder = function(borderWidth) {
	this.ctx.lineWidth = borderWidth;
	this.ctx.strokeStyle = this.settings.borderColor;
	this.ctx.stroke();
};
// 绘制文字
Countdown.prototype.strokeText = function(text,fun) {
	this.changeText = text;
	fun(this.changeText);
	this.ctx.textAlign = "center";
	this.ctx.textBaseline = "middle";
	this.ctx.font = this.settings.fontSize + "px" + " PingFangSC-Semibold";
	this.ctx.fillStyle = this.settings.fontColor;
	this.ctx.fillText(text, this.settings.size / 2, this.settings.size / 2);
};

// 绘制圆
Countdown.prototype.drawCircle = function(startAng, endAng, border, fillColor) {
	let deg = Math.PI / 180;
	this.ctx.beginPath();
	this.ctx.arc(this.settings.size / 2, this.settings.size / 2, this.settings.size / 2 - border, startAng * deg, endAng *
		deg, false);
	this.ctx.fillStyle = fillColor;
	this.ctx.fill();
	this.ctx.closePath();
};
// 进度条动画
Countdown.prototype.countdown = function(fun) {
	var that = this;
	that.isStoped = true; //初始化动画开始位置 (false)
	this.stop.end = -90+360-that.settings.time*360/(that.settings.alltime);//
	this.timer = setInterval(() => {
		let allMs = that.settings.time * 1000; // 如30*1000=30 000ms
		that.pauseTime = +new Date();
		// 步长=（当前的时间-过去的时间）/总秒数 
		let schedule = (that.pauseTime - that.startTime) / allMs;
		that.schedule = schedule;
		this.drawAll(schedule, fun);
		if (that.pauseTime - that.startTime >= allMs) {
			// 重绘
			this.drawBackground();
			this.drawProcess();
			this.drawAnimate(schedule);
			this.drawInner();
			this.strokeText(0,fun);
			clearInterval(this.timer);
		}
	}, 100);
};
// 暂停
Countdown.prototype.pauseCountDown = function(fun) {
	this.isStoped = true;
	this.stop.end = this._stopAng;
	fun(this.changeText);
	clearInterval(this.timer);
}
// 开始
Countdown.prototype.startCountDown = function() {
	this.startTime = +new Date();
	this.settings.time = parseInt(this.settings.time * (1 - this.schedule)) + 1;
	this.countdown(this.param.fun);
}

// 绘制所有
Countdown.prototype.drawAll = function(schedule,fun) {
	schedule = schedule >= 1 ? 1 : schedule;
	let text = parseInt(this.settings.time * (1 - schedule)) + 1;
	// 清除画布
	this.ctx.clearRect(0, 0, this.settings.size, this.settings.size);
	this.drawBackground();
	this.drawProcess();
	this.drawAnimate(schedule);
	this.drawInner();
	this.strokeText(text,fun);
};

// 对象拷贝
function extend(obj1, obj2) {
	for (let attr in obj2) {
		obj1[attr] = obj2[attr];
	}
}

export {Countdown}
