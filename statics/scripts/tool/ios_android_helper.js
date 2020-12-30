//ios
function clientIsReady(temp) {
  session.getSetUserInfo();
}
var session ={  
  //获取telephone和sessionId
  _telephone:"",
  _sessionId:"",  
  getSetUserInfo:function(){
      var that = session;
      that.getUserInfo(session.storeInfor);//存储telephone和sessionId
  },
  //判断手机系统
  getPlatform:function() {
    var userAgent = navigator.userAgent.toLowerCase();
    if(userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)){
      return userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)[1];
    }
    return '';
  },
  send:function(data){
      that=session;  
      if(that.getPlatform() == 'android') {
      android_new.send(data);
      } 
      else {
        ios.send(data);
      }
  }, 
  /*获取sessionId和telephone*/
  getUserInfo:function(callback){
      that=session;  
      GB.utils.send({
          'methodName' : 'userInfo',
          'data' : {},
          'responseCallback' : function (responseData) {
              var _sessionId='',_telephone='';
              var _responseData = JSON.parse(responseData);
              if(_responseData['sessionID']){
                  _sessionId = _responseData['sessionID'];
              }
              if(_responseData['telephone']){
                  _telephone = _responseData['telephone'];
              } 
              //存到 session变量中。
              that._telephone = _telephone;
              that._sessionId = _sessionId;  
              callback(_telephone,_sessionId);
          }
      });
  },
  /*存储sessionId和telephone*/
  storeInfor:function(_tele,_sessionId){
      GB.post(basePath + '/user/setstore',{telephone:_tele,sessionId:_sessionId}).done(function(_data){
         _telephone = _tele; 
         console.log("telephonehone +写入成功")
      }).fail(function(_data){
          // 返回错误信息 msg
          console.log(_data);
      });
  } 
}

//android
var isHandle = true;
   function initJsBridge(callback) {
     if (window.android_new) {
        callback(android_new)
     } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                    callback(android_new)
            },
           false 
        );
     }
}
initJsBridge(function(android_new) {
    android_new.init(); 
    //获取分享参数
    android_new.registerHandler("getShareParams", function(data, responseCallback) {
         responseCallback(params);
    });
    android_new.registerHandler("clientIsReady", function(data, responseCallback) {
       if(isHandle){ 
          session.getSetUserInfo();
          isHandle = false;
       }
   });
}); 

