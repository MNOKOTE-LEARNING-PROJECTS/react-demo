"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ReadersService =
/*#__PURE__*/
function () {
  function ReadersService() {// ApiService.setHeader();
    // ApiService.adminScope();

    _classCallCheck(this, ReadersService);
  }

  _createClass(ReadersService, [{
    key: "all",
    value: function all() {
      return _axios["default"].get("api/v1/readers");
    }
  }, {
    key: "saveData",
    value: function saveData(payloads) {
      return _axios["default"].post("api/v1/readers", payloads);
    }
  }]);

  return ReadersService;
}();

var _default = new ReadersService();

exports["default"] = _default;