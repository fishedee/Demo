(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons"],{

/***/ "./node_modules/_css-loader@0.28.11@css-loader/index.js!./src/index.css":
/*!*********************************************************************!*\
  !*** ./node_modules/_css-loader@0.28.11@css-loader!./src/index.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js */ \"./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"*{\\n\\tmargin:0px;\\n\\tpadding: 0px;\\n}\\n\\ndiv{\\n\\tcolor:blue;\\n}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/index.css?./node_modules/_css-loader@0.28.11@css-loader");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/_react@16.4.0@react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _isomorphicFetch = __webpack_require__(/*! isomorphic-fetch */ \"./node_modules/_isomorphic-fetch@2.2.1@isomorphic-fetch/fetch-npm-browserify.js\");\n\nvar _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_React$PureComponent) {\n\t_inherits(App, _React$PureComponent);\n\n\tfunction App() {\n\t\tvar _ref;\n\n\t\tvar _temp, _this, _ret;\n\n\t\t_classCallCheck(this, App);\n\n\t\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\t\targs[_key] = arguments[_key];\n\t\t}\n\n\t\treturn _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {\n\t\t\tdata: \"\"\n\t\t}, _temp), _possibleConstructorReturn(_this, _ret);\n\t}\n\n\t_createClass(App, [{\n\t\tkey: 'getSomething',\n\t\tvalue: function () {\n\t\t\tvar _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n\t\t\t\tvar data, txt;\n\t\t\t\treturn regeneratorRuntime.wrap(function _callee$(_context) {\n\t\t\t\t\twhile (1) {\n\t\t\t\t\t\tswitch (_context.prev = _context.next) {\n\t\t\t\t\t\t\tcase 0:\n\t\t\t\t\t\t\t\t_context.next = 2;\n\t\t\t\t\t\t\t\treturn (0, _isomorphicFetch2.default)('/s?wd=react');\n\n\t\t\t\t\t\t\tcase 2:\n\t\t\t\t\t\t\t\tdata = _context.sent;\n\t\t\t\t\t\t\t\t_context.next = 5;\n\t\t\t\t\t\t\t\treturn data.text();\n\n\t\t\t\t\t\t\tcase 5:\n\t\t\t\t\t\t\t\ttxt = _context.sent;\n\n\t\t\t\t\t\t\t\tthis.setState({ data: txt });\n\n\t\t\t\t\t\t\tcase 7:\n\t\t\t\t\t\t\tcase 'end':\n\t\t\t\t\t\t\t\treturn _context.stop();\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}, _callee, this);\n\t\t\t}));\n\n\t\t\tfunction getSomething() {\n\t\t\t\treturn _ref2.apply(this, arguments);\n\t\t\t}\n\n\t\t\treturn getSomething;\n\t\t}()\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar html = { __html: this.state.data };\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\tnull,\n\t\t\t\t\t'Hello World'\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'button',\n\t\t\t\t\t{ onClick: this.getSomething.bind(this) },\n\t\t\t\t\t'\\u70B9\\u6211\\u83B7\\u53D6\\u6570\\u636E'\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement('div', { dangerouslySetInnerHTML: html }),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\tnull,\n\t\t\t\t\t'Bundle By Webpack'\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn App;\n}(_react2.default.PureComponent);\n\nexports.default = App;\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../node_modules/_css-loader@0.28.11@css-loader!./index.css */ \"./node_modules/_css-loader@0.28.11@css-loader/index.js!./src/index.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js */ \"./node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/index.css?");

/***/ })

}]);