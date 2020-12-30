import sa from 'sa-sdk-javascript'
const Log = function () {}
// 模块发送统计
Log._getEventName = function (target, attr) {
    var eventName = target.getAttribute('vkshop-event-name').replace(/(^\s*)|(\s*$)/g,'');
    if (eventName) {
        // 获取页面层级属性
        var arr = [eventName],
        list1 = [];
        getParents(target, 'vkshop-event-scope', list1)
        for (var i = 0, len = list1.length; i < len; i++) {
            var scope = list1[i].getAttribute('vkshop-event-scope').replace(/(^\s*)|(\s*$)/g,'')
            if (scope) {
                arr.push(scope);
            }
        }
        arr.reverse();
        return arr.join('-');
    } else {
        return '';
    }
};

let compileParam = function (param) {
    if (param == '' || param == null || param == undefined) return param;
    let arr = param.split("&");
    console.log(arr)
    let obj = {}
    arr.forEach( function (v, i) {
        let arr1 = v.split("=");
        obj[arr1[0]] = arr1[1];
    })
    return obj;
} 

// 事件统计发送到神策
Log.push = function (args) {
    if (args[1] == '') {
        sa.track(args[0])
    } else {
        try{
            let paramObj = compileParam(args[1])
            console.log(paramObj)
            sa.track(args[0], paramObj)
        }catch(e) {

        }
    }
};


/**
 * 生成1个统计事件监听函数，要么是focus、要么是click，更多的事件需要的时候再支持
 *
 * @param {String} _eventType 需要处理哪种类型的事件
 * @param {Boolean} isGaEnabled 透传的参数
 * @return Function
 */
var getEventHandler = function (_eventType) {
    return function (e) {
        // 拿到事件发生的节点
        var eventTarget = e.target,
            eventType = eventTarget.getAttribute('vkshop-event-type') || 'click', //操作方式
            eventParam = eventTarget.getAttribute('vkshop-event-param')|| '', //传送参数
            eventName = eventTarget.getAttribute('vkshop-event-name').replace(/(^\s*)|(\s*$)/g,''), //操作的按钮
            eventExpand = {};
        if (eventName && eventType === _eventType) { // 判断vkshop-event-name 是否为空，并且类型匹配
            // 获取页面层级属性
            console.log(eventName)
            var scopes = [eventName],
                list2 = []
            getParents(eventTarget, 'vkshop-event-scope', list2)
            for (var i = 0, len = list2.length; i < len; i++) {
                var scope = list2[i].getAttribute('vkshop-event-scope').replace(/(^\s*)|(\s*$)/g,'')
                if (scope) { // 判断vkshop-event-scope 是否为空
                    scopes.push(scope);
                }
            }
            scopes.reverse();
            // 最前面说明来源是h5
            Log.push(['h5_' + scopes.join('_'), eventParam]);
        }
    };
};
/**
 * 原生获取父元素
 * @param {*} el 
 * @param {*} attr 属性，符合条件的属性
 * @param {*} list 返回的父元素集合
 */
function getParents(el, attr, list) {
    var parent = el.parentNode
    if (parent.nodeName == 'BODY') {
      if (parent.hasAttribute(attr)) {
        return list.push(parent)
      } else {
        return list
      }
    } else {
      if (parent.hasAttribute(attr)) {
        list.push(parent)
      }
      getParents(parent, attr, list)
    }
  }

/**
 * 利用事件委托对所有需要自动发送统计事件的节点进行监听，只能初始化一次
 */
var isInitialized = false;
Log.init = function () {
    // if (isBrowser === false) { return; }
    // if (isInitialized) { return; }
    // isInitialized = true;
    // window.onload = function () {
        var ndBody = document.querySelector('body');
        var ndNoBubble = document.querySelectorAll('[vkshop-event-no-bubble]');

        // 处理可以冒泡的节点
        ndBody.addEventListener('click', function (e) {
            // 处理选择符
            if (e.target.hasAttribute('vkshop-event-name')) {
                getEventHandler('click')(e)
            }
        });

        // 处理无法冒泡到顶层的结点点击
        if (ndNoBubble && ndNoBubble.length > 0) {
            ndNoBubble.addEventListener('click', getEventHandler('click'));
        }
};

export default Log