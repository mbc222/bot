'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint-disable-line import/no-unresolved

var WebSocket = function () {
  function WebSocket(url) {
    var _this = this;

    _classCallCheck(this, WebSocket);

    this.delay = 10;
    this.url = url;
    this.bufferedResponses = [];
    // providing ws interface
    this.readyState = 0;
    this.onopen = null;
    this.onclose = null;
    this.onerror = null;
    this.onmessage = null;
    // open automatically on creation
    setTimeout(function () {
      _this.readyState = 1;
      _this.onopen();
    }, this.delay * 10);
  }

  _createClass(WebSocket, [{
    key: 'getResponse',
    value: function getResponse(reqData, onmessage) {
      if ('forget_all' in reqData || 'subscribe' in reqData && reqData.subscribe === 0) {
        this.handleForget(reqData, onmessage);
      } else {
        var database = this.findDataInBuffer(reqData);
        database = !this.isEmpty(database) ? database : _database2.default;
        this.parseDb(database, reqData, onmessage);
      }
    }
  }, {
    key: 'parseDb',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(database, reqData, onmessage) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, callName, callResTypes, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, callResTypeName, respData;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = Object.keys(database)[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 40;
                  break;
                }

                callName = _step.value;

                if (!(callName in reqData || callName === 'history' && 'ticks_history' in reqData)) {
                  _context.next = 37;
                  break;
                }

                callResTypes = database[callName];
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 12;
                _iterator2 = Object.keys(callResTypes)[Symbol.iterator]();

              case 14:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context.next = 23;
                  break;
                }

                callResTypeName = _step2.value;
                respData = this.findKeyInObj(callResTypes[callResTypeName], reqData);

                if (!respData) {
                  _context.next = 20;
                  break;
                }

                _context.next = 20;
                return this.passMessageOn(reqData, respData, onmessage);

              case 20:
                _iteratorNormalCompletion2 = true;
                _context.next = 14;
                break;

              case 23:
                _context.next = 29;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context['catch'](12);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t0;

              case 29:
                _context.prev = 29;
                _context.prev = 30;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 32:
                _context.prev = 32;

                if (!_didIteratorError2) {
                  _context.next = 35;
                  break;
                }

                throw _iteratorError2;

              case 35:
                return _context.finish(32);

              case 36:
                return _context.finish(29);

              case 37:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 40:
                _context.next = 46;
                break;

              case 42:
                _context.prev = 42;
                _context.t1 = _context['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 46:
                _context.prev = 46;
                _context.prev = 47;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 49:
                _context.prev = 49;

                if (!_didIteratorError) {
                  _context.next = 52;
                  break;
                }

                throw _iteratorError;

              case 52:
                return _context.finish(49);

              case 53:
                return _context.finish(46);

              case 54:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
      }));

      function parseDb(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return parseDb;
    }()
  }, {
    key: 'passMessageOn',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(reqData, respData, onmessage) {
        var history, firstTick, i, newTick, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, rd;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.isEmpty(respData.next)) {
                  console.log(reqData);
                  console.log(respData.next);
                  this.bufferedResponses.push(respData.next);
                }

                if (!reqData.subscribe) {
                  _context2.next = 47;
                  break;
                }

                if (!('ticks_history' in reqData)) {
                  _context2.next = 19;
                  break;
                }

                history = respData.data[0];
                firstTick = respData.data[1];
                _context2.next = 7;
                return this.delayedOnMessage(reqData, history, onmessage);

              case 7:
                i = 0;

              case 8:
                if (!(i < 60)) {
                  _context2.next = 17;
                  break;
                }

                newTick = _extends({}, firstTick);

                newTick.tick.epoch = '' + (+firstTick.tick.epoch + i * 2);
                newTick.tick.quote = '' + (+firstTick.tick.quote + i * 0.1);
                _context2.next = 14;
                return this.delayedOnMessage(reqData, newTick, onmessage);

              case 14:
                i++;
                _context2.next = 8;
                break;

              case 17:
                _context2.next = 45;
                break;

              case 19:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context2.prev = 22;
                _iterator3 = respData.data[Symbol.iterator]();

              case 24:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context2.next = 31;
                  break;
                }

                rd = _step3.value;
                _context2.next = 28;
                return this.delayedOnMessage(reqData, rd, onmessage);

              case 28:
                _iteratorNormalCompletion3 = true;
                _context2.next = 24;
                break;

              case 31:
                _context2.next = 37;
                break;

              case 33:
                _context2.prev = 33;
                _context2.t0 = _context2['catch'](22);
                _didIteratorError3 = true;
                _iteratorError3 = _context2.t0;

              case 37:
                _context2.prev = 37;
                _context2.prev = 38;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 40:
                _context2.prev = 40;

                if (!_didIteratorError3) {
                  _context2.next = 43;
                  break;
                }

                throw _iteratorError3;

              case 43:
                return _context2.finish(40);

              case 44:
                return _context2.finish(37);

              case 45:
                _context2.next = 49;
                break;

              case 47:
                _context2.next = 49;
                return this.delayedOnMessage(reqData, respData.data, onmessage);

              case 49:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[22, 33, 37, 45], [38,, 40, 44]]);
      }));

      function passMessageOn(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return passMessageOn;
    }()
  }, {
    key: 'delayedOnMessage',
    value: function delayedOnMessage(reqData, respData, onmessage) {
      var _this2 = this;

      return new Promise(function (r) {
        setTimeout(function () {
          respData.echo_req.req_id = respData.req_id = reqData.req_id;
          onmessage(JSON.stringify(respData));
          r();
        }, _this2.delay);
      });
    }
  }, {
    key: 'handleForget',
    value: function handleForget(reqData, onmessage) {
      setTimeout(function () {
        onmessage(JSON.stringify({
          echo_req: {
            req_id: reqData.req_id,
            forget_all: 'ticks'
          },
          req_id: reqData.req_id,
          forget_all: [],
          msg_type: 'forget_all'
        }));
      }, this.delay);
    }
  }, {
    key: 'findDataInBuffer',
    value: function findDataInBuffer(reqData) {
      var result = null;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.bufferedResponses[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var database = _step4.value;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = Object.keys(database)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var callName = _step5.value;

              if (callName === 'history' && 'ticks_history' in reqData || callName in reqData) {
                var callResTypes = database[callName];
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                  for (var _iterator6 = Object.keys(callResTypes)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var callResTypeName = _step6.value;

                    var respData = this.findKeyInObj(callResTypes[callResTypeName], reqData);
                    if (respData) {
                      result = database;
                    }
                  }
                } catch (err) {
                  _didIteratorError6 = true;
                  _iteratorError6 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                      _iterator6.return();
                    }
                  } finally {
                    if (_didIteratorError6) {
                      throw _iteratorError6;
                    }
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
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

      return result;
    }
  }, {
    key: 'removeReqId',
    value: function removeReqId(_data) {
      var data = _extends({}, _data);
      delete data.req_id;
      if (data.echo_req) {
        delete data.echo_req.req_id;
      }
      return data;
    }
  }, {
    key: 'findKeyInObj',
    value: function findKeyInObj(obj1, obj2) {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = Object.keys(obj1)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var key = _step7.value;

          if (_underscore2.default.isEqual(this.removeReqId(JSON.parse(key)), this.removeReqId(obj2))) {
            return obj1[key];
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return null;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(obj) {
      return !obj || obj instanceof Array && !obj.length || !Object.keys(obj).length;
    }
  }, {
    key: 'send',
    value: function send(rawData) {
      var _this3 = this;

      if (this.readyState === 0) {
        return;
      }
      var reqData = JSON.parse(rawData);
      this.getResponse(reqData, function (receivedData) {
        _this3.onmessage({
          data: receivedData
        });
      });
    }
  }, {
    key: 'close',
    value: function close() {
      this.readyState = 0;
    }
  }]);

  return WebSocket;
}();

exports.default = WebSocket;