window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function drawAnimal(option) {
    var animalOption = option || {};
    this.startPos = animalOption.startPost || 0;
    this.endPos = null;
    this.easing = animalOption.easing || null;
    this.curPos = null;
    this.curDate = null;
    //动画的每一步修改操作
    this.step = null;
    //持续时间
    this.during = animalOption.duringtTime || 20;
    this.startTime = null;
    this.doneCb = null;
}

drawAnimal.prototype.setStartPos = function (pos) {
    this.startPos = pos;
}

drawAnimal.prototype.setEasing = function (easing) {
    this.easing = easing;
}

drawAnimal.prototype.setStep = function (step) {
    this.step = step;
}

drawAnimal.prototype.update = function () {
    this.getAnimTime();
    var curPos = this.easing(this.curDate, this.startPos, this.endPos, this.during);
    this.step(curPos);
}

/**
 * 启动动画
 */
drawAnimal.prototype.start = function () {
    var that = this;
    requestAnimFrame(function () {
            that.run();
        })
}

/**
 * 动态修改属性，执行动画
 */
drawAnimal.prototype.run = function () {
    var that = this;
    that.update();
    if (that.curDate < that.during) {
        //如果没有结束则递归的调用
        requestAnimFrame(function () {
            that.run();
        })
    }
    else {
        this.doneCb();
    }
}

/**
 * 动画运行到某个位置
 */

drawAnimal.prototype.animTo = function(pos){
    this.endPos = pos;
    this.curPos = this.startPos;
    this.startTime = new Date();
    this.start();
}

/**
 * 获取动画已经执行的时间
 */
drawAnimal.prototype.getAnimTime = function(){
    this.curDate = (new Date() - this.startTime) / 1000;
}

drawAnimal.prototype.done = function (cb) {
    this.doneCb  = cb;
};