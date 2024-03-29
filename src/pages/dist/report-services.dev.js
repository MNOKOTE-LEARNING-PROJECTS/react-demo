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

var ReportsService =
/*#__PURE__*/
function () {
  function ReportsService() {// ApiService.setHeader();
    // ApiService.adminScope();

    _classCallCheck(this, ReportsService);
  }

  _createClass(ReportsService, [{
    key: "all",
    value: function all() {
      return _axios["default"].get("api/v1/books");
    }
  }, {
    key: "saveData",
    value: function saveData(payloads) {
      return _axios["default"].post("api/v1/books", payloads);
    }
  }]);

  return ReportsService;
}();

var _default = new ReportsService();

exports["default"] = _default;