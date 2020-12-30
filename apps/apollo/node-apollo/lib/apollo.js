'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");
'use strict';
var urllib = require('urllib');
var assert = require('assert');
var fs = require('fs');
var helper = require('./helper');
var config = require('../config.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");
module.exports = {
    // Apollo开放平台接入方式
    remoteConfigService: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(config) {
            var options, res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            assert(config, 'param config is required');
                            assert(config.token, 'param token is required');
                            options = {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8',
                                    authorization: config.token
                                },
                                rejectUnauthorized: false,
                                contentType: 'json',
                                dataType: 'json'
                            };
                            _context.next = 5;
                            return urllib.request(helper.getAllConfigFromApolloUri(config), options);

                        case 5:
                            res = _context.sent;

                            assert(res.status === 200, 'apollo host unavailable, please contact your administrtor');
                            return _context.abrupt('return', helper.mergeConfig(res.data));

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function remoteConfigService(_x) {
            return _ref.apply(this, arguments);
        };
    }(),

    // 通过不带缓存的Http接口从Apollo读取配置
    remoteConfigServiceSkipCache: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(config) {
            var options, URIs, bundle, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, res;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            assert(config, 'param config is required');
                            options = {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                },
                                rejectUnauthorized: false,
                                contentType: 'json',
                                dataType: 'json'
                            };
                            URIs = helper.getConfigSkipCacheUri(config);
                            _context2.next = 5;
                            return Promise.all(URIs.map(function (uri) {
                                return urllib.request(uri, options);
                            }));

                        case 5:
                            bundle = _context2.sent;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 9;

                            for (_iterator = bundle[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                res = _step.value;

                                assert(res.status === 200, 'apollo host unavailable, please contact your administrtor');
                            }
                            _context2.next = 17;
                            break;

                        case 13:
                            _context2.prev = 13;
                            _context2.t0 = _context2['catch'](9);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 17:
                            _context2.prev = 17;
                            _context2.prev = 18;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 20:
                            _context2.prev = 20;

                            if (!_didIteratorError) {
                                _context2.next = 23;
                                break;
                            }

                            throw _iteratorError;

                        case 23:
                            return _context2.finish(20);

                        case 24:
                            return _context2.finish(17);

                        case 25:
                            return _context2.abrupt('return', helper.mergeConfigurations(bundle));

                        case 26:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[9, 13, 17, 25], [18,, 20, 24]]);
        }));

        return function remoteConfigServiceSkipCache(_x2) {
            return _ref2.apply(this, arguments);
        };
    }(),

    // 向后兼容
    remoteConfigServiceSikpCache: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(config) {
            var options, URIs, bundle, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, res;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            assert(config, 'param config is required');
                            options = {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                },
                                rejectUnauthorized: false,
                                contentType: 'json',
                                dataType: 'json'
                            };
                            URIs = helper.getConfigSkipCacheUri(config);
                            _context3.next = 5;
                            return Promise.all(URIs.map(function (uri) {
                                return urllib.request(uri, options);
                            }));

                        case 5:
                            bundle = _context3.sent;
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context3.prev = 9;

                            for (_iterator2 = bundle[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                res = _step2.value;

                                assert(res.status === 200, 'apollo host unavailable, please contact your administrtor');
                            }
                            _context3.next = 17;
                            break;

                        case 13:
                            _context3.prev = 13;
                            _context3.t0 = _context3['catch'](9);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context3.t0;

                        case 17:
                            _context3.prev = 17;
                            _context3.prev = 18;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 20:
                            _context3.prev = 20;

                            if (!_didIteratorError2) {
                                _context3.next = 23;
                                break;
                            }

                            throw _iteratorError2;

                        case 23:
                            return _context3.finish(20);

                        case 24:
                            return _context3.finish(17);

                        case 25:
                            return _context3.abrupt('return', helper.mergeConfigurations(bundle));

                        case 26:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined, [[9, 13, 17, 25], [18,, 20, 24]]);
        }));

        return function remoteConfigServiceSikpCache(_x3) {
            return _ref3.apply(this, arguments);
        };
    }(),

    //通过带缓存的Http接口从Apollo读取配置
    remoteConfigServiceFromCache: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(config) {
            var options, URIs, bundle, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, res;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            assert(config, 'param config is required');
                            options = {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                },
                                rejectUnauthorized: false,
                                contentType: 'json',
                                dataType: 'json'
                            };
                            URIs = helper.getConfigFromCacheUri(config);
                            _context4.next = 5;
                            return Promise.all(URIs.map(function (uri) {
                                return urllib.request(uri, options);
                            }));

                        case 5:
                            bundle = _context4.sent;
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            _context4.prev = 9;

                            for (_iterator3 = bundle[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                res = _step3.value;

                                assert(res.status === 200, 'apollo host unavailable, please contact your administrtor');
                            }
                            _context4.next = 17;
                            break;

                        case 13:
                            _context4.prev = 13;
                            _context4.t0 = _context4['catch'](9);
                            _didIteratorError3 = true;
                            _iteratorError3 = _context4.t0;

                        case 17:
                            _context4.prev = 17;
                            _context4.prev = 18;

                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }

                        case 20:
                            _context4.prev = 20;

                            if (!_didIteratorError3) {
                                _context4.next = 23;
                                break;
                            }

                            throw _iteratorError3;

                        case 23:
                            return _context4.finish(20);

                        case 24:
                            return _context4.finish(17);

                        case 25:
                            return _context4.abrupt('return', helper.mergeConfigurations(bundle));

                        case 26:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined, [[9, 13, 17, 25], [18,, 20, 24]]);
        }));

        return function remoteConfigServiceFromCache(_x4) {
            return _ref4.apply(this, arguments);
        };
    }(),

    // 生成default.env
    createEnvFile: function createEnvFile(envConfig) {
        if (fs.existsSync(config.ENV_FILE_PATH)) {
            fs.unlinkSync(config.ENV_FILE_PATH);
        }
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = Object.keys(envConfig)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var key = _step4.value;

                fs.appendFileSync(config.ENV_FILE_PATH, key + '=' + envConfig[key] + '\n');
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    },

    // 注入到process.env
    setEnv: function setEnv() {
        try {
            require('dotenv').config({ path: config.ENV_FILE_PATH });
        } catch (err) {
            assert(false, err);
        }
    }
};