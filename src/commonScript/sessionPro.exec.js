var sessionProObj = {

    storeSession: function (callback) {
        var that = this;
        clientReady.done(function () {
            that.getAndStoreUserInfo(callback);
        })
    },
    getUserInfo: function (cb) {
        clientReady
            .done(function () {
                GB
                    .utils
                    .send({
                        'methodName': 'userInfo',
                        'data': {},
                        'responseCallback': function (responseData) {
                            var _sessionId = '',
                                _telephone = '';
                            var _responseData = JSON.parse(responseData);
                            if (_responseData['sessionID']) {
                                _sessionId = _responseData['sessionID'];
                            }
                            if (_responseData['telephone']) {
                                _telephone = _responseData['telephone'];
                            }
                            if (cb) {
                                cb(_telephone, _sessionId);
                            }
                        }
                    });
            })

    },
    getAndStoreUserInfo: function (callback) {
        var that = this;
        that.getUserInfo(function (_telephone, _sessionId) {
            that.storeInfor(_telephone, _sessionId, callback)
        });
    },

    /*存储sessionId和telephone*/
    storeInfor: function (_tele, _sessionId, callback) {
        GB.post(basePath + '/user/setstore', {
                telephone: _tele,
                sessionId: _sessionId
            })
            .done(function (_data) {
                callback({telephone: _tele, sessionId: _sessionId});
            })
            .fail(function (_data) {
                // 返回错误信息 msg
                console.log(_data);
            });
    }
}