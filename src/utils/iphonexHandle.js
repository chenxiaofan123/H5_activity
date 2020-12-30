var isIphoneX = window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && testUA('iPhone')
// 处理lib-flexible放大viewport的情况
var scale = window.innerWidth / window.screen.width

if (isIphoneX) {
    check()
    window.onscroll = throttle(check, 200)
}
function check() {
    // 100为经验值
    // alert(window.screen.height - window.innerHeight / scale)
    if (window.screen.height - window.innerHeight / scale < 100) {
        document.body.classList.add('fix-iphonex-bottom')
    } else {
        document.body.classList.remove('fix-iphonex-bottom')
    }
}
function testUA (str) {
    return navigator.userAgent.indexOf(str) > -1
  }
  function throttle (func, wait) {
    var ctx, args, rtn, timeoutID; // caching
    var last = 0;

    return function throttled () {
      ctx = this;
      args = arguments;
      var delta = new Date() - last;
      if (!timeoutID)
        if (delta >= wait) call();
        else timeoutID = setTimeout(call, wait - delta);
      return rtn;
    };

    function call () {
      timeoutID = 0;
      last = +new Date();
      rtn = func.apply(ctx, args);
      ctx = null;
      args = null;
    }
  }