function callbackObj(){
    this.callbackList = [];
    this.hasRun = false;
}

callbackObj.prototype.add = function(fn){
    this.callbackList.push(fn);
    if(this.hasRun){
        fn.call(null);
    }
}

callbackObj.prototype.done = function(){
    if(this.callbackList.length === 0 || this.hasRun) return
    this.hasRun = true;
    this.callbackList.forEach(function(fn){
        fn.call(null)
    })

}

callbackObj.prototype.reset = function(){
    this.hasRun = false;
}