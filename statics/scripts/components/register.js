/**
 * autor:tianyuyan
 * date: 2016/12/02.
 * @param 添加 注册组件 
 */ 

var TELEPHONELEN = 11;
var AUTHSENDINTERVAL = 60;
var SMSCODETYPE = '1';
var TELECODETYPE ='2';
var TELEVALIDDARRAY = [1,3,4,5,7,8,9];
var landingPageObj = {
    channelCode: "default", 
    checkedProtocal:true, 
    init: function () { 
        //绑定Ul
        this.bindUI();
    }, 
    bindUI:function () {
        //点击注册
        var that = this; 
        // 阅读协议
        $('.check-protocol').on('click', function () {
            window.location = "http://static.huangjinqianbao.com/static/html/app/protocol/userProtocol.html";
        }); 
        // check protocal 
        $('.check-box').on('click', function () {
            that.checkedProtocal ? $(this).addClass('un-checked') :$(this).removeClass('un-checked');
            $(this).children('.check-line').toggle();
            that.checkedProtocal = !that.checkedProtocal;
        });   
        //手机号输入
        $("#telephone").bind("keyup",function(){
            var reg = /\D/g;
            if(reg.test(this.value)==true){
                this.value = this.value.replace(/\D/g,"");
            }
            if(this.value.length>11){
                this.value = this.value.substring(0,11);
            }
        }); 
        //发送sms验证码
        $('#send-button').on('click', that.sendSmsCodeEvent); 
        //发送语音验证码
        $('.send-phone-code').on('click', that.sendYuYinCodeEvent); 
        // 点击完成注册
        $('.complete-reg-button').on('click', function () {
            var inputValidCheckResult = that.processCheck();
            if(inputValidCheckResult.telephoneResult != 'success'){
                that.showAlert(inputValidCheckResult.telephoneResult);
                return;
            }
            if(inputValidCheckResult.authCode  != 'success'){
                that.showAlert(inputValidCheckResult.authCode);
                return;
            }
            if(inputValidCheckResult.protocolAgreed  != 'success'){
                that.showAlert(inputValidCheckResult.protocolAgreed);
                return;
            }
            //验证没有问题
            that.completeReg();
        }); 
        //禁止点击弹层
        $('.x-mask').on('click touchmove', function () {
            return false;
        }); 
        //关闭弹窗
        $('.close').on('click', function () {
            $('.x-mask').hide();
        }); 
    }, 
    pageFooterFix:function () {
        $('.page-footer').css('position', 'relative');
        $('.company-centi').css('padding-bottom', '1rem');
    }, 
    //定义获取数据方法
    getPhoneNum: function () {
        return $('#telephone').val();
    },
    getAuthCode: function () {
        return $('#auth-code').val();
    },
    sendAuthCode: function (authCodeType) {
        var that = this;
        var telephone = that.getPhoneNum();
        var sendRequest = $.ajax({
            type: "POST",
            url: basePath + "/regist/getCode",
            dataType: 'json',
            data: {
                "telephone":telephone,
                "authCodeType": authCodeType
            }
        });
        sendRequest.done(function (_data) {
            if(_data.success){
                //验证码发送成功
                //根据验证码类型进行不同的处理
                authCodeType == SMSCODETYPE ? that.smsCodeRender(): that.yuYinCodeRender();
            } else {
                //重新綁定事件
                if(authCodeType == SMSCODETYPE){
                    $('#send-button').bind('click', that.sendSmsCodeEvent);
                } else{
                    $('.send-phone-code').bind('click', that.sendYuYinCodeEvent);
                }
                //处理异常的请求结果
                if(_data.msg){
                    that.showAlert(_data.msg);
                }  else {
                    that.showAlert('系统错误！')
                }
            } 
        })
    },
    //sendCode事件
    sendSmsCodeEvent: function () {
        $('#send-button').unbind('click');
        var that = landingPageObj;
        var checkResult = that.processCheck();
        if(checkResult.telephoneResult  == 'success'){
            //手机号检查通过
            that.sendAuthCode(SMSCODETYPE); 
        } else {
            //手机号检查未通过
            that.showAlert(checkResult.telephoneResult);
            $('#send-button').bind('click', that.sendSmsCodeEvent);
        } 
    },
    sendYuYinCodeEvent:function () {
        $('.send-phone-code').unbind('click');
        var that = landingPageObj;
        var checkResult = that.processCheck();
        if(checkResult.telephoneResult == 'success'){
            //手机号检查通过
            that.sendAuthCode(TELECODETYPE); 
        } else {
            //手机号检查未通过
            that.showAlert(checkResult.telephoneResult);
            $('.send-phone-code').bind('click', that.sendYuYinCodeEvent);
        }
    },
    smsCodeRender:function () {
        var that = this;
        var smsTimeLeft = AUTHSENDINTERVAL;
        var realtimeContent = '';
        var sendButton = $('#send-button');
        var tempStr = function (str) {
            return '已发送（' + str + '）';
        };
        var rendButton = function (str) {
            sendButton.html(str)
        }
        var recoverButton = function () {
            sendButton.removeClass('send');
            rendButton('重新发送');
        }
        //切换button样式
        sendButton.addClass('send'); 
        //展示倒计时
        rendButton('已发送（60）');
        var smsTimeInterval = setInterval(function () {
            if(--smsTimeLeft < 0) {
                clearTimeout(smsTimeInterval);
                recoverButton();
                //重新绑定事件
                sendButton.on('click', that.sendSmsCodeEvent);
            } else {
                rendButton(tempStr(smsTimeLeft)) ;
            } 
        }, 1000);
    },
    //语音验证码页面渲染
    yuYinCodeRender: function () {
        var that = this;
        var codeKeepTime = AUTHSENDINTERVAL;
        var sendButton = $('.send-phone-code');
        var rendContent = function (str) {
            sendButton.html('语音验证码 （' + str +'秒）');
        }
        var yuYinInterval = setInterval(function () {
            if(--codeKeepTime <0){
                clearTimeout(yuYinInterval);
                sendButton.html("使用语音验证码");
                sendButton.on('click', that.sendYuYinCodeEvent);
            } else {
                rendContent(codeKeepTime);
            } 
        }, 1000) 
    },
    processCheck:function () {
        var that = this;
        var checkResult = {};
        var telephone = that.getPhoneNum();
        //check 手机号
        if(telephone.length == 0) {
            checkResult.telephoneResult = '手机号未输入';
            
        } else if(!that.checkTelephone(telephone)){
            checkResult.telephoneResult = '请输入正确的手机号';
        } else {
            checkResult.telephoneResult = "success";
        }
        //check验证码
        if($('#auth-code').length == 0){
            checkResult.authCode = '请输入验证码'
        } else {
            checkResult.authCode = "success";
        } 
        //check 协议
        that.checkedProtocal ? checkResult.protocolAgreed = "success": checkResult.protocolAgreed = '您必须先同意黄金钱包服务协议';
        return checkResult;

    },
    checkTelephone:function (telephoneStr) {
        if(telephoneStr.length < TELEPHONELEN || telephoneStr.indexOf('1')!= 0) return false;
        for (var i = 0; i < TELEVALIDDARRAY.length; i++){
            if(parseInt(TELEVALIDDARRAY[i]) == parseInt(telephoneStr[1])) return true;
        }
        return false; 
    },
    showAlert: function (alertStr) {
        var timeCount = setTimeout(function () {
            $('.alert-words').html(alertStr);
            $('.x-mask').show();
            clearTimeout(timeCount);
        }, 500); 
    },
    completeReg:function () {
        var that = this;
        var telephone = $.trim(that.getPhoneNum());
        var authCode = $.trim(that.getAuthCode());
        var request = GB.utils.GetRequest();
        var userInviteCode = request['userCode'] ? that.replaceUrl(request['userCode']): null;
        var regRequest = $.ajax({ 
                type: "POST",
                url: basePath + "/regist/userRegisterByValid",
                dataType: 'json',
                data: {
                    "telephone": telephone,
                    "authCode": authCode,
                    "userInviteCode":userInviteCode,
                    "channel":that.channelCode
                }
        });
        regRequest.done(function (_data) {
            if(_data.success){
                
                //页面跳转
                var pre1 ='https://dev.huangjinqianbao.com/GBankerWebWap/'
                if(GB.utils.getUrl('g-banker')!=""){
                    pre1 ='https://www.g-banker.com/wap/'
                }
                var wapBasePath = pre1 + "/download?channelCode=" +that.channelCode;
                location.href=wapBasePath;
            } else if(_data.msg){
                that.showAlert(_data.msg);
                $('#auth-code').val('');
            } else {
                that.showAlert('系统错误');
            }
        }) 
    },
    replaceUrl:function(_name){
        var name = _name;
        name = name.replace(/[<,>]/g,"");
        return name;
    }
};
 (function ($) {
    $.extend({
        register: function (options) {
            options = $.extend({
                obj: null,  //jq对象，要在那个html标签上显示 
                color: "red",//文字颜色
                callback: function () {} //回调函数
            }, options);  
            //绑定 
            landingPageObj.init(); 
        }
    });
})(jQuery);
