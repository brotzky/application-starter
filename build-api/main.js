require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssmbly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./bin/api.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/api.js":
/*!********************!*\
  !*** ./api/api.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _expressSession = __webpack_require__(/*! express-session */ \"express-session\");\n\nvar _expressSession2 = _interopRequireDefault(_expressSession);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nvar _cookieParser2 = _interopRequireDefault(_cookieParser);\n\nvar _middleware = __webpack_require__(/*! ./middleware */ \"./api/middleware/index.js\");\n\nvar _apolloServerExpress = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\n\nvar _graphqlTools = __webpack_require__(/*! graphql-tools */ \"graphql-tools\");\n\nvar _graphql = __webpack_require__(/*! ./graphql */ \"./api/graphql/index.js\");\n\nvar _graphql2 = _interopRequireDefault(_graphql);\n\nvar _routes = __webpack_require__(/*! ./routes */ \"./api/routes/index.js\");\n\nvar _routes2 = _interopRequireDefault(_routes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar compression = __webpack_require__(/*! compression */ \"compression\");\n\n// Creating our express server\nvar app = (0, _express2.default)();\napp.set('trust proxy', 1);\n\n// Send all responses as gzip\napp.use(compression());\n\napp.use((0, _morgan2.default)('dev'));\napp.use((0, _expressSession2.default)({\n  secret: 'secret',\n  resave: false,\n  saveUninitialized: false,\n  secure: true,\n  cookie: { secure: true, maxAge: 60000 }\n}));\n\n// Parsing\napp.use((0, _cookieParser2.default)());\napp.use(_bodyParser2.default.urlencoded({ extended: true }));\napp.use(_bodyParser2.default.json());\n\n// GraphQL\napp.use('/api', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: _graphql2.default }));\napp.get('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/api' })); // if you want GraphiQL enabled\n\n// Tooling\napp.use((0, _middleware.notFound)());\napp.use((0, _middleware.logger)(app));\napp.use((0, _middleware.errorHandler)());\n\napp.listen(process.env.APIPORT, _middleware.startup);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvYXBpLmpzPzMyOTkiXSwibmFtZXMiOlsiY29tcHJlc3Npb24iLCJyZXF1aXJlIiwiYXBwIiwic2V0IiwidXNlIiwic2VjcmV0IiwicmVzYXZlIiwic2F2ZVVuaW5pdGlhbGl6ZWQiLCJzZWN1cmUiLCJjb29raWUiLCJtYXhBZ2UiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwic2NoZW1hIiwiZ2V0IiwiZW5kcG9pbnRVUkwiLCJsaXN0ZW4iLCJwcm9jZXNzIiwiZW52IiwiQVBJUE9SVCJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBZEEsSUFBTUEsY0FBYyxtQkFBQUMsQ0FBUSxnQ0FBUixDQUFwQjs7QUFnQkE7QUFDQSxJQUFNQyxNQUFNLHdCQUFaO0FBQ0FBLElBQUlDLEdBQUosQ0FBUSxhQUFSLEVBQXVCLENBQXZCOztBQUVBO0FBQ0FELElBQUlFLEdBQUosQ0FBUUosYUFBUjs7QUFFQUUsSUFBSUUsR0FBSixDQUFRLHNCQUFPLEtBQVAsQ0FBUjtBQUNBRixJQUFJRSxHQUFKLENBQ0UsOEJBQVE7QUFDTkMsVUFBUSxRQURGO0FBRU5DLFVBQVEsS0FGRjtBQUdOQyxxQkFBbUIsS0FIYjtBQUlOQyxVQUFRLElBSkY7QUFLTkMsVUFBUSxFQUFFRCxRQUFRLElBQVYsRUFBZ0JFLFFBQVEsS0FBeEI7QUFMRixDQUFSLENBREY7O0FBVUE7QUFDQVIsSUFBSUUsR0FBSixDQUFRLDZCQUFSO0FBQ0FGLElBQUlFLEdBQUosQ0FBUSxxQkFBV08sVUFBWCxDQUFzQixFQUFFQyxVQUFVLElBQVosRUFBdEIsQ0FBUjtBQUNBVixJQUFJRSxHQUFKLENBQVEscUJBQVdTLElBQVgsRUFBUjs7QUFFQTtBQUNBWCxJQUFJRSxHQUFKLENBQVEsTUFBUixFQUFnQixxQkFBV1MsSUFBWCxFQUFoQixFQUFtQyx5Q0FBZSxFQUFFQyx5QkFBRixFQUFmLENBQW5DO0FBQ0FaLElBQUlhLEdBQUosQ0FBUSxXQUFSLEVBQXFCLDBDQUFnQixFQUFFQyxhQUFhLE1BQWYsRUFBaEIsQ0FBckIsRSxDQUFnRTs7QUFFaEU7QUFDQWQsSUFBSUUsR0FBSixDQUFRLDJCQUFSO0FBQ0FGLElBQUlFLEdBQUosQ0FBUSx3QkFBT0YsR0FBUCxDQUFSO0FBQ0FBLElBQUlFLEdBQUosQ0FBUSwrQkFBUjs7QUFFQUYsSUFBSWUsTUFBSixDQUFXQyxRQUFRQyxHQUFSLENBQVlDLE9BQXZCIiwiZmlsZSI6Ii4vYXBpL2FwaS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNvbXByZXNzaW9uID0gcmVxdWlyZSgnY29tcHJlc3Npb24nKTtcblxuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgc2Vzc2lvbiBmcm9tICdleHByZXNzLXNlc3Npb24nO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcblxuaW1wb3J0IHsgbG9nZ2VyLCBub3RGb3VuZCwgZXJyb3JIYW5kbGVyLCBzdGFydHVwIH0gZnJvbSAnLi9taWRkbGV3YXJlJztcblxuaW1wb3J0IHsgZ3JhcGhxbEV4cHJlc3MsIGdyYXBoaXFsRXhwcmVzcyB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgeyBtYWtlRXhlY3V0YWJsZVNjaGVtYSB9IGZyb20gJ2dyYXBocWwtdG9vbHMnO1xuXG5pbXBvcnQgc2NoZW1hIGZyb20gJy4vZ3JhcGhxbCc7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuLy8gQ3JlYXRpbmcgb3VyIGV4cHJlc3Mgc2VydmVyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5hcHAuc2V0KCd0cnVzdCBwcm94eScsIDEpO1xuXG4vLyBTZW5kIGFsbCByZXNwb25zZXMgYXMgZ3ppcFxuYXBwLnVzZShjb21wcmVzc2lvbigpKTtcblxuYXBwLnVzZShtb3JnYW4oJ2RldicpKTtcbmFwcC51c2UoXG4gIHNlc3Npb24oe1xuICAgIHNlY3JldDogJ3NlY3JldCcsXG4gICAgcmVzYXZlOiBmYWxzZSxcbiAgICBzYXZlVW5pbml0aWFsaXplZDogZmFsc2UsXG4gICAgc2VjdXJlOiB0cnVlLFxuICAgIGNvb2tpZTogeyBzZWN1cmU6IHRydWUsIG1heEFnZTogNjAwMDAgfSxcbiAgfSksXG4pO1xuXG4vLyBQYXJzaW5nXG5hcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbi8vIEdyYXBoUUxcbmFwcC51c2UoJy9hcGknLCBib2R5UGFyc2VyLmpzb24oKSwgZ3JhcGhxbEV4cHJlc3MoeyBzY2hlbWEgfSkpO1xuYXBwLmdldCgnL2dyYXBoaXFsJywgZ3JhcGhpcWxFeHByZXNzKHsgZW5kcG9pbnRVUkw6ICcvYXBpJyB9KSk7IC8vIGlmIHlvdSB3YW50IEdyYXBoaVFMIGVuYWJsZWRcblxuLy8gVG9vbGluZ1xuYXBwLnVzZShub3RGb3VuZCgpKTtcbmFwcC51c2UobG9nZ2VyKGFwcCkpO1xuYXBwLnVzZShlcnJvckhhbmRsZXIoKSk7XG5cbmFwcC5saXN0ZW4ocHJvY2Vzcy5lbnYuQVBJUE9SVCwgc3RhcnR1cCk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./api/api.js\n");

/***/ }),

/***/ "./api/graphql/index.js":
/*!******************************!*\
  !*** ./api/graphql/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _graphqlTools = __webpack_require__(/*! graphql-tools */ \"graphql-tools\");\n\nvar _mergeGraphqlSchemas = __webpack_require__(/*! merge-graphql-schemas */ \"merge-graphql-schemas\");\n\nvar _resolvers = __webpack_require__(/*! ./resolvers */ \"./api/graphql/resolvers/index.js\");\n\nvar _resolvers2 = _interopRequireDefault(_resolvers);\n\nvar _query = __webpack_require__(/*! ./types/query.gql */ \"./api/graphql/types/query.gql\");\n\nvar _query2 = _interopRequireDefault(_query);\n\nvar _user = __webpack_require__(/*! ./types/user.gql */ \"./api/graphql/types/user.gql\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)([_user2.default, _query2.default]);\n\nvar schema = (0, _graphqlTools.makeExecutableSchema)({\n  typeDefs: typeDefs,\n  resolvers: _resolvers2.default\n});\n\nexports.default = schema;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvZ3JhcGhxbC9pbmRleC5qcz9jN2VkIl0sIm5hbWVzIjpbInR5cGVEZWZzIiwic2NoZW1hIiwicmVzb2x2ZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVcscUNBQVcsaUNBQVgsQ0FBakI7O0FBRUEsSUFBTUMsU0FBUyx3Q0FBcUI7QUFDbENELG9CQURrQztBQUVsQ0U7QUFGa0MsQ0FBckIsQ0FBZjs7a0JBS2VELE0iLCJmaWxlIjoiLi9hcGkvZ3JhcGhxbC9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1ha2VFeGVjdXRhYmxlU2NoZW1hIH0gZnJvbSAnZ3JhcGhxbC10b29scyc7XG5pbXBvcnQgeyBtZXJnZVR5cGVzIH0gZnJvbSAnbWVyZ2UtZ3JhcGhxbC1zY2hlbWFzJztcblxuaW1wb3J0IHJlc29sdmVycyBmcm9tICcuL3Jlc29sdmVycyc7XG5cbmltcG9ydCBxdWVyeSBmcm9tICcuL3R5cGVzL3F1ZXJ5LmdxbCc7XG5pbXBvcnQgdXNlclNjaGVtYSBmcm9tICcuL3R5cGVzL3VzZXIuZ3FsJztcblxuY29uc3QgdHlwZURlZnMgPSBtZXJnZVR5cGVzKFt1c2VyU2NoZW1hLCBxdWVyeV0pO1xuXG5jb25zdCBzY2hlbWEgPSBtYWtlRXhlY3V0YWJsZVNjaGVtYSh7XG4gIHR5cGVEZWZzLFxuICByZXNvbHZlcnMsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgc2NoZW1hO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./api/graphql/index.js\n");

/***/ }),

/***/ "./api/graphql/resolvers/index.js":
/*!****************************************!*\
  !*** ./api/graphql/resolvers/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _user = __webpack_require__(/*! ./user */ \"./api/graphql/resolvers/user.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = {\n  Query: {\n    users: _user2.default.users\n  }\n  // Mutation: {\n  // login: user.login\n  // }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvZ3JhcGhxbC9yZXNvbHZlcnMvaW5kZXguanM/MjMwZSJdLCJuYW1lcyI6WyJRdWVyeSIsInVzZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O2tCQUVlO0FBQ2JBLFNBQU87QUFDTEMsV0FBTyxlQUFLQTtBQURQO0FBR1A7QUFDQTtBQUNBO0FBTmEsQyIsImZpbGUiOiIuL2FwaS9ncmFwaHFsL3Jlc29sdmVycy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyIGZyb20gJy4vdXNlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgUXVlcnk6IHtcbiAgICB1c2VyczogdXNlci51c2VycyxcbiAgfSxcbiAgLy8gTXV0YXRpb246IHtcbiAgLy8gbG9naW46IHVzZXIubG9naW5cbiAgLy8gfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api/graphql/resolvers/index.js\n");

/***/ }),

/***/ "./api/graphql/resolvers/user.js":
/*!***************************************!*\
  !*** ./api/graphql/resolvers/user.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ \"babel-runtime/regenerator\");\n\nvar _regenerator2 = _interopRequireDefault(_regenerator);\n\nvar _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ \"babel-runtime/helpers/asyncToGenerator\");\n\nvar _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = {\n  users: function users(root, args, ctx) {\n    var _this = this;\n\n    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {\n      return _regenerator2.default.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, _this);\n    }))();\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvZ3JhcGhxbC9yZXNvbHZlcnMvdXNlci5qcz81ODcwIl0sIm5hbWVzIjpbInVzZXJzIiwicm9vdCIsImFyZ3MiLCJjdHgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBQWU7QUFDUEEsT0FETyxpQkFDREMsSUFEQyxFQUNLQyxJQURMLEVBQ1dDLEdBRFgsRUFDZ0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUU7QUFEbEIsQyIsImZpbGUiOiIuL2FwaS9ncmFwaHFsL3Jlc29sdmVycy91c2VyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBhc3luYyB1c2Vycyhyb290LCBhcmdzLCBjdHgpIHt9LFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api/graphql/resolvers/user.js\n");

/***/ }),

/***/ "./api/graphql/types/query.gql":
/*!*************************************!*\
  !*** ./api/graphql/types/query.gql ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    var doc = {\"kind\":\"Document\",\"definitions\":[{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Query\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"users\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Subscription\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"addUser\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}}},\"directives\":[]}]},{\"kind\":\"SchemaDefinition\",\"directives\":[],\"operationTypes\":[{\"kind\":\"OperationTypeDefinition\",\"operation\":\"query\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Query\"}}},{\"kind\":\"OperationTypeDefinition\",\"operation\":\"subscription\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Subscription\"}}}]}],\"loc\":{\"start\":0,\"end\":170}};\n    doc.loc.source = {\"body\":\"type Query {\\n  users: [User]\\n}\\n\\n# type Mutation {}\\n\\ntype Subscription {\\n  addUser: User!\\n}\\n\\nschema {\\n  query: Query\\n  # mutation: Mutation\\n  subscription: Subscription\\n}\\n\",\"name\":\"GraphQL request\",\"locationOffset\":{\"line\":1,\"column\":1}};\n  \n\n    var names = {};\n    function unique(defs) {\n      return defs.filter(\n        function(def) {\n          if (def.kind !== 'FragmentDefinition') return true;\n          var name = def.name.value\n          if (names[name]) {\n            return false;\n          } else {\n            names[name] = true;\n            return true;\n          }\n        }\n      )\n    }\n  \n\n      module.exports = doc;\n    \n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvZ3JhcGhxbC90eXBlcy9xdWVyeS5ncWw/ZDFlNCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsZUFBZSxrQ0FBa0Msc0NBQXNDLDhCQUE4Qiw0Q0FBNEMsaUNBQWlDLDhCQUE4Qix3QkFBd0IsMEJBQTBCLDJCQUEyQiwrQkFBK0IsaUJBQWlCLEVBQUUsRUFBRSxzQ0FBc0MscUNBQXFDLDRDQUE0QyxpQ0FBaUMsZ0NBQWdDLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLCtCQUErQixpQkFBaUIsRUFBRSxFQUFFLDZEQUE2RCw2REFBNkQsMkJBQTJCLGdDQUFnQyxFQUFFLG9FQUFvRSwyQkFBMkIsdUNBQXVDLEVBQUUsU0FBUztBQUNyK0Isc0JBQXNCLG9CQUFvQixvQkFBb0Isc0JBQXNCLHVCQUF1QixxQkFBcUIsWUFBWSx5RUFBeUUsK0NBQStDOzs7QUFHcFE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBIiwiZmlsZSI6Ii4vYXBpL2dyYXBocWwvdHlwZXMvcXVlcnkuZ3FsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgdmFyIGRvYyA9IHtcImtpbmRcIjpcIkRvY3VtZW50XCIsXCJkZWZpbml0aW9uc1wiOlt7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJRdWVyeVwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXNlcnNcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJVc2VyXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3Vic2NyaXB0aW9uXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJhZGRVc2VyXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiVXNlclwifX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIlNjaGVtYURlZmluaXRpb25cIixcImRpcmVjdGl2ZXNcIjpbXSxcIm9wZXJhdGlvblR5cGVzXCI6W3tcImtpbmRcIjpcIk9wZXJhdGlvblR5cGVEZWZpbml0aW9uXCIsXCJvcGVyYXRpb25cIjpcInF1ZXJ5XCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlF1ZXJ5XCJ9fX0se1wia2luZFwiOlwiT3BlcmF0aW9uVHlwZURlZmluaXRpb25cIixcIm9wZXJhdGlvblwiOlwic3Vic2NyaXB0aW9uXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN1YnNjcmlwdGlvblwifX19XX1dLFwibG9jXCI6e1wic3RhcnRcIjowLFwiZW5kXCI6MTcwfX07XG4gICAgZG9jLmxvYy5zb3VyY2UgPSB7XCJib2R5XCI6XCJ0eXBlIFF1ZXJ5IHtcXG4gIHVzZXJzOiBbVXNlcl1cXG59XFxuXFxuIyB0eXBlIE11dGF0aW9uIHt9XFxuXFxudHlwZSBTdWJzY3JpcHRpb24ge1xcbiAgYWRkVXNlcjogVXNlciFcXG59XFxuXFxuc2NoZW1hIHtcXG4gIHF1ZXJ5OiBRdWVyeVxcbiAgIyBtdXRhdGlvbjogTXV0YXRpb25cXG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uXFxufVxcblwiLFwibmFtZVwiOlwiR3JhcGhRTCByZXF1ZXN0XCIsXCJsb2NhdGlvbk9mZnNldFwiOntcImxpbmVcIjoxLFwiY29sdW1uXCI6MX19O1xuICBcblxuICAgIHZhciBuYW1lcyA9IHt9O1xuICAgIGZ1bmN0aW9uIHVuaXF1ZShkZWZzKSB7XG4gICAgICByZXR1cm4gZGVmcy5maWx0ZXIoXG4gICAgICAgIGZ1bmN0aW9uKGRlZikge1xuICAgICAgICAgIGlmIChkZWYua2luZCAhPT0gJ0ZyYWdtZW50RGVmaW5pdGlvbicpIHJldHVybiB0cnVlO1xuICAgICAgICAgIHZhciBuYW1lID0gZGVmLm5hbWUudmFsdWVcbiAgICAgICAgICBpZiAobmFtZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICBcblxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBkb2M7XG4gICAgXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./api/graphql/types/query.gql\n");

/***/ }),

/***/ "./api/graphql/types/user.gql":
/*!************************************!*\
  !*** ./api/graphql/types/user.gql ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    var doc = {\"kind\":\"Document\",\"definitions\":[{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"sub\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"nickname\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"picture\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"updated_at\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}]}],\"loc\":{\"start\":0,\"end\":102}};\n    doc.loc.source = {\"body\":\"type User {\\n  sub: ID!\\n  nickname: String!\\n  name: String!\\n  picture: String!\\n  updated_at: String!\\n}\\n\",\"name\":\"GraphQL request\",\"locationOffset\":{\"line\":1,\"column\":1}};\n  \n\n    var names = {};\n    function unique(defs) {\n      return defs.filter(\n        function(def) {\n          if (def.kind !== 'FragmentDefinition') return true;\n          var name = def.name.value\n          if (names[name]) {\n            return false;\n          } else {\n            names[name] = true;\n            return true;\n          }\n        }\n      )\n    }\n  \n\n      module.exports = doc;\n    \n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvZ3JhcGhxbC90eXBlcy91c2VyLmdxbD8yYzJkIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxlQUFlLGtDQUFrQyxzQ0FBc0MsNkJBQTZCLDRDQUE0QyxpQ0FBaUMsNEJBQTRCLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLDZCQUE2QixpQkFBaUIsRUFBRSxpQ0FBaUMsaUNBQWlDLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLGlDQUFpQyxpQkFBaUIsRUFBRSxpQ0FBaUMsNkJBQTZCLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLGlDQUFpQyxpQkFBaUIsRUFBRSxpQ0FBaUMsZ0NBQWdDLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLGlDQUFpQyxpQkFBaUIsRUFBRSxpQ0FBaUMsbUNBQW1DLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLGlDQUFpQyxpQkFBaUIsRUFBRSxTQUFTO0FBQzNuQyxzQkFBc0IsbUJBQW1CLGdHQUFnRywrQ0FBK0M7OztBQUd4TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EiLCJmaWxlIjoiLi9hcGkvZ3JhcGhxbC90eXBlcy91c2VyLmdxbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIHZhciBkb2MgPSB7XCJraW5kXCI6XCJEb2N1bWVudFwiLFwiZGVmaW5pdGlvbnNcIjpbe1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiVXNlclwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwic3ViXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSURcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIm5pY2tuYW1lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJuYW1lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJwaWN0dXJlXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ1cGRhdGVkX2F0XCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX1dLFwibG9jXCI6e1wic3RhcnRcIjowLFwiZW5kXCI6MTAyfX07XG4gICAgZG9jLmxvYy5zb3VyY2UgPSB7XCJib2R5XCI6XCJ0eXBlIFVzZXIge1xcbiAgc3ViOiBJRCFcXG4gIG5pY2tuYW1lOiBTdHJpbmchXFxuICBuYW1lOiBTdHJpbmchXFxuICBwaWN0dXJlOiBTdHJpbmchXFxuICB1cGRhdGVkX2F0OiBTdHJpbmchXFxufVxcblwiLFwibmFtZVwiOlwiR3JhcGhRTCByZXF1ZXN0XCIsXCJsb2NhdGlvbk9mZnNldFwiOntcImxpbmVcIjoxLFwiY29sdW1uXCI6MX19O1xuICBcblxuICAgIHZhciBuYW1lcyA9IHt9O1xuICAgIGZ1bmN0aW9uIHVuaXF1ZShkZWZzKSB7XG4gICAgICByZXR1cm4gZGVmcy5maWx0ZXIoXG4gICAgICAgIGZ1bmN0aW9uKGRlZikge1xuICAgICAgICAgIGlmIChkZWYua2luZCAhPT0gJ0ZyYWdtZW50RGVmaW5pdGlvbicpIHJldHVybiB0cnVlO1xuICAgICAgICAgIHZhciBuYW1lID0gZGVmLm5hbWUudmFsdWVcbiAgICAgICAgICBpZiAobmFtZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICBcblxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBkb2M7XG4gICAgXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./api/graphql/types/user.gql\n");

/***/ }),

/***/ "./api/middleware/errorHandler.js":
/*!****************************************!*\
  !*** ./api/middleware/errorHandler.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = errorHandler;\nfunction errorHandler() {\n  return function (error, req, res, next) {\n    // Required to stay consistent with core backend\n    var appError = {\n      data: null,\n      errorMessage: null,\n      errors: []\n    };\n\n    error.code = !isNaN(parseInt(error.code, 10)) ? parseInt(error.code, 10) : 500;\n    var formatter = {};\n\n    // Don't show stack trace if it is a 404 error\n    if (error.code === 404) {\n      error.stack = null;\n    }\n\n    formatter['application/json'] = function () {\n      delete error.type;\n\n      if (false) {}\n\n      appError.code = error.code;\n      appError.errors = [error.message];\n\n      res.set('Content-Type', 'application/json');\n      res.json(appError);\n    };\n\n    res.status(error.code);\n\n    var contentType = req.headers['content-type'] || '';\n    var accepts = req.headers.accept || '';\n\n    formatter['application/json'](error, req, res, next);\n  };\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvbWlkZGxld2FyZS9lcnJvckhhbmRsZXIuanM/YmViZSJdLCJuYW1lcyI6WyJlcnJvckhhbmRsZXIiLCJlcnJvciIsInJlcSIsInJlcyIsIm5leHQiLCJhcHBFcnJvciIsImRhdGEiLCJlcnJvck1lc3NhZ2UiLCJlcnJvcnMiLCJjb2RlIiwiaXNOYU4iLCJwYXJzZUludCIsImZvcm1hdHRlciIsInN0YWNrIiwidHlwZSIsIm1lc3NhZ2UiLCJzZXQiLCJqc29uIiwic3RhdHVzIiwiY29udGVudFR5cGUiLCJoZWFkZXJzIiwiYWNjZXB0cyIsImFjY2VwdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQXdCQSxZO0FBQVQsU0FBU0EsWUFBVCxHQUF3QjtBQUNyQyxTQUFPLFVBQVNDLEtBQVQsRUFBZ0JDLEdBQWhCLEVBQXFCQyxHQUFyQixFQUEwQkMsSUFBMUIsRUFBZ0M7QUFDckM7QUFDQSxRQUFNQyxXQUFXO0FBQ2ZDLFlBQU0sSUFEUztBQUVmQyxvQkFBYyxJQUZDO0FBR2ZDLGNBQVE7QUFITyxLQUFqQjs7QUFNQVAsVUFBTVEsSUFBTixHQUFhLENBQUNDLE1BQU1DLFNBQVNWLE1BQU1RLElBQWYsRUFBcUIsRUFBckIsQ0FBTixDQUFELEdBQ1RFLFNBQVNWLE1BQU1RLElBQWYsRUFBcUIsRUFBckIsQ0FEUyxHQUVULEdBRko7QUFHQSxRQUFNRyxZQUFZLEVBQWxCOztBQUVBO0FBQ0EsUUFBSVgsTUFBTVEsSUFBTixLQUFlLEdBQW5CLEVBQXdCO0FBQ3RCUixZQUFNWSxLQUFOLEdBQWMsSUFBZDtBQUNEOztBQUVERCxjQUFVLGtCQUFWLElBQWdDLFlBQVc7QUFDekMsYUFBT1gsTUFBTWEsSUFBYjs7QUFFQSxVQUFJLEtBQUosRUFBMkMsRUFFMUM7O0FBRURULGVBQVNJLElBQVQsR0FBZ0JSLE1BQU1RLElBQXRCO0FBQ0FKLGVBQVNHLE1BQVQsR0FBa0IsQ0FBQ1AsTUFBTWMsT0FBUCxDQUFsQjs7QUFFQVosVUFBSWEsR0FBSixDQUFRLGNBQVIsRUFBd0Isa0JBQXhCO0FBQ0FiLFVBQUljLElBQUosQ0FBU1osUUFBVDtBQUNELEtBWkQ7O0FBY0FGLFFBQUllLE1BQUosQ0FBV2pCLE1BQU1RLElBQWpCOztBQUVBLFFBQU1VLGNBQWNqQixJQUFJa0IsT0FBSixDQUFZLGNBQVosS0FBK0IsRUFBbkQ7QUFDQSxRQUFNQyxVQUFVbkIsSUFBSWtCLE9BQUosQ0FBWUUsTUFBWixJQUFzQixFQUF0Qzs7QUFFQVYsY0FBVSxrQkFBVixFQUE4QlgsS0FBOUIsRUFBcUNDLEdBQXJDLEVBQTBDQyxHQUExQyxFQUErQ0MsSUFBL0M7QUFDRCxHQXRDRDtBQXVDRCIsImZpbGUiOiIuL2FwaS9taWRkbGV3YXJlL2Vycm9ySGFuZGxlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVycm9yLCByZXEsIHJlcywgbmV4dCkge1xuICAgIC8vIFJlcXVpcmVkIHRvIHN0YXkgY29uc2lzdGVudCB3aXRoIGNvcmUgYmFja2VuZFxuICAgIGNvbnN0IGFwcEVycm9yID0ge1xuICAgICAgZGF0YTogbnVsbCxcbiAgICAgIGVycm9yTWVzc2FnZTogbnVsbCxcbiAgICAgIGVycm9yczogW10sXG4gICAgfTtcblxuICAgIGVycm9yLmNvZGUgPSAhaXNOYU4ocGFyc2VJbnQoZXJyb3IuY29kZSwgMTApKVxuICAgICAgPyBwYXJzZUludChlcnJvci5jb2RlLCAxMClcbiAgICAgIDogNTAwO1xuICAgIGNvbnN0IGZvcm1hdHRlciA9IHt9O1xuXG4gICAgLy8gRG9uJ3Qgc2hvdyBzdGFjayB0cmFjZSBpZiBpdCBpcyBhIDQwNCBlcnJvclxuICAgIGlmIChlcnJvci5jb2RlID09PSA0MDQpIHtcbiAgICAgIGVycm9yLnN0YWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICBmb3JtYXR0ZXJbJ2FwcGxpY2F0aW9uL2pzb24nXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIGVycm9yLnR5cGU7XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlbGV0ZSBlcnJvci5zdGFjaztcbiAgICAgIH1cblxuICAgICAgYXBwRXJyb3IuY29kZSA9IGVycm9yLmNvZGU7XG4gICAgICBhcHBFcnJvci5lcnJvcnMgPSBbZXJyb3IubWVzc2FnZV07XG5cbiAgICAgIHJlcy5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICByZXMuanNvbihhcHBFcnJvcik7XG4gICAgfTtcblxuICAgIHJlcy5zdGF0dXMoZXJyb3IuY29kZSk7XG5cbiAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlcS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSB8fCAnJztcbiAgICBjb25zdCBhY2NlcHRzID0gcmVxLmhlYWRlcnMuYWNjZXB0IHx8ICcnO1xuXG4gICAgZm9ybWF0dGVyWydhcHBsaWNhdGlvbi9qc29uJ10oZXJyb3IsIHJlcSwgcmVzLCBuZXh0KTtcbiAgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api/middleware/errorHandler.js\n");

/***/ }),

/***/ "./api/middleware/index.js":
/*!*********************************!*\
  !*** ./api/middleware/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.startup = exports.notFound = exports.logger = exports.errorHandler = undefined;\n\nvar _errorHandler2 = __webpack_require__(/*! ./errorHandler */ \"./api/middleware/errorHandler.js\");\n\nvar _errorHandler3 = _interopRequireDefault(_errorHandler2);\n\nvar _logger2 = __webpack_require__(/*! ./logger */ \"./api/middleware/logger.js\");\n\nvar _logger3 = _interopRequireDefault(_logger2);\n\nvar _notFound2 = __webpack_require__(/*! ./notFound */ \"./api/middleware/notFound.js\");\n\nvar _notFound3 = _interopRequireDefault(_notFound2);\n\nvar _startup2 = __webpack_require__(/*! ./startup */ \"./api/middleware/startup.js\");\n\nvar _startup3 = _interopRequireDefault(_startup2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.errorHandler = _errorHandler3.default;\nexports.logger = _logger3.default;\nexports.notFound = _notFound3.default;\nexports.startup = _startup3.default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvbWlkZGxld2FyZS9pbmRleC5qcz9jMjY0Il0sIm5hbWVzIjpbImVycm9ySGFuZGxlciIsImxvZ2dlciIsIm5vdEZvdW5kIiwic3RhcnR1cCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUFPQSxZO1FBQ0FDLE07UUFDQUMsUTtRQUNBQyxPIiwiZmlsZSI6Ii4vYXBpL21pZGRsZXdhcmUvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZXJyb3JIYW5kbGVyIGZyb20gJy4vZXJyb3JIYW5kbGVyJztcbmV4cG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuZXhwb3J0IG5vdEZvdW5kIGZyb20gJy4vbm90Rm91bmQnO1xuZXhwb3J0IHN0YXJ0dXAgZnJvbSAnLi9zdGFydHVwJztcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api/middleware/index.js\n");

/***/ }),

/***/ "./api/middleware/logger.js":
/*!**********************************!*\
  !*** ./api/middleware/logger.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = logger;\n\nvar _prettyError = __webpack_require__(/*! pretty-error */ \"pretty-error\");\n\nvar _prettyError2 = _interopRequireDefault(_prettyError);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar pretty = new _prettyError2.default();\n\nfunction logger(app) {\n  // Add a logger to our app object for convenience\n  app.logger = pretty;\n\n  return function (error, req, res, next) {\n    if (error && error.code !== 404) {\n      console.error('API ERROR:', pretty.render(error));\n    }\n\n    next(error);\n  };\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvbWlkZGxld2FyZS9sb2dnZXIuanM/NjA2YyJdLCJuYW1lcyI6WyJsb2dnZXIiLCJwcmV0dHkiLCJhcHAiLCJlcnJvciIsInJlcSIsInJlcyIsIm5leHQiLCJjb2RlIiwiY29uc29sZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBSXdCQSxNOztBQUp4Qjs7Ozs7O0FBRUEsSUFBTUMsU0FBUywyQkFBZjs7QUFFZSxTQUFTRCxNQUFULENBQWdCRSxHQUFoQixFQUFxQjtBQUNsQztBQUNBQSxNQUFJRixNQUFKLEdBQWFDLE1BQWI7O0FBRUEsU0FBTyxVQUFDRSxLQUFELEVBQVFDLEdBQVIsRUFBYUMsR0FBYixFQUFrQkMsSUFBbEIsRUFBMkI7QUFDaEMsUUFBSUgsU0FBU0EsTUFBTUksSUFBTixLQUFlLEdBQTVCLEVBQWlDO0FBQy9CQyxjQUFRTCxLQUFSLENBQWMsWUFBZCxFQUE0QkYsT0FBT1EsTUFBUCxDQUFjTixLQUFkLENBQTVCO0FBQ0Q7O0FBRURHLFNBQUtILEtBQUw7QUFDRCxHQU5EO0FBT0QiLCJmaWxlIjoiLi9hcGkvbWlkZGxld2FyZS9sb2dnZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJldHR5RXJyb3IgZnJvbSAncHJldHR5LWVycm9yJztcblxuY29uc3QgcHJldHR5ID0gbmV3IFByZXR0eUVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZ2dlcihhcHApIHtcbiAgLy8gQWRkIGEgbG9nZ2VyIHRvIG91ciBhcHAgb2JqZWN0IGZvciBjb252ZW5pZW5jZVxuICBhcHAubG9nZ2VyID0gcHJldHR5O1xuXG4gIHJldHVybiAoZXJyb3IsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgIT09IDQwNCkge1xuICAgICAgY29uc29sZS5lcnJvcignQVBJIEVSUk9SOicsIHByZXR0eS5yZW5kZXIoZXJyb3IpKTtcbiAgICB9XG5cbiAgICBuZXh0KGVycm9yKTtcbiAgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api/middleware/logger.js\n");

/***/ }),

/***/ "./api/middleware/notFound.js":
/*!************************************!*\
  !*** ./api/middleware/notFound.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = notFound;\nfunction notFound() {\n  return function (req, res, next) {\n    next(new Error('Page not found'));\n  };\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvbWlkZGxld2FyZS9ub3RGb3VuZC5qcz9iMDAxIl0sIm5hbWVzIjpbIm5vdEZvdW5kIiwicmVxIiwicmVzIiwibmV4dCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBd0JBLFE7QUFBVCxTQUFTQSxRQUFULEdBQW9CO0FBQ2pDLFNBQU8sVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVgsRUFBb0I7QUFDekJBLFNBQUssSUFBSUMsS0FBSixDQUFVLGdCQUFWLENBQUw7QUFDRCxHQUZEO0FBR0QiLCJmaWxlIjoiLi9hcGkvbWlkZGxld2FyZS9ub3RGb3VuZC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdEZvdW5kKCkge1xuICByZXR1cm4gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgbmV4dChuZXcgRXJyb3IoJ1BhZ2Ugbm90IGZvdW5kJykpO1xuICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./api/middleware/notFound.js\n");

/***/ }),

/***/ "./api/middleware/startup.js":
/*!***********************************!*\
  !*** ./api/middleware/startup.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = startup;\nfunction startup() {\n  console.log(\"\\u2551  \\uD83D\\uDCBB   ==>  API running in \" + \"development\" + \" mode on http://localhost:\" + process.env.APIPORT);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvbWlkZGxld2FyZS9zdGFydHVwLmpzPzYyNWYiXSwibmFtZXMiOlsic3RhcnR1cCIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwiZW52IiwiQVBJUE9SVCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQXdCQSxPO0FBQVQsU0FBU0EsT0FBVCxHQUFtQjtBQUNoQ0MsVUFBUUMsR0FBUixpREFFSSxhQUZKLGtDQUcrQkMsUUFBUUMsR0FBUixDQUFZQyxPQUgzQztBQUtEIiwiZmlsZSI6Ii4vYXBpL21pZGRsZXdhcmUvc3RhcnR1cC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXJ0dXAoKSB7XG4gIGNvbnNvbGUubG9nKFxuICAgIGDilZEgIPCfkrsgICA9PT4gIEFQSSBydW5uaW5nIGluICR7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOVlxuICAgIH0gbW9kZSBvbiBodHRwOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuQVBJUE9SVH1gLFxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./api/middleware/startup.js\n");

/***/ }),

/***/ "./api/routes/index.js":
/*!*****************************!*\
  !*** ./api/routes/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\n// import UserRoutes from '../modules/users/Users.routes';\n\nvar router = new _express.Router();\n\n// router.use();\n\nexports.default = router;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvcm91dGVzL2luZGV4LmpzP2E2M2YiXSwibmFtZXMiOlsicm91dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFFQSxJQUFNQSxTQUFTLHFCQUFmOztBQUVBOztrQkFFZUEsTSIsImZpbGUiOiIuL2FwaS9yb3V0ZXMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcbi8vIGltcG9ydCBVc2VyUm91dGVzIGZyb20gJy4uL21vZHVsZXMvdXNlcnMvVXNlcnMucm91dGVzJztcblxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpO1xuXG4vLyByb3V0ZXIudXNlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api/routes/index.js\n");

/***/ }),

/***/ "./bin/api.js":
/*!********************!*\
  !*** ./bin/api.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ../api/api */ \"./api/api.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9iaW4vYXBpLmpzPzI5ZTciXSwibmFtZXMiOlsicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQkFBQUEsQ0FBUSxnQ0FBUiIsImZpbGUiOiIuL2Jpbi9hcGkuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9hcGkvYXBpJyk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./bin/api.js\n");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-express\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIj8yMmYzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImFwb2xsby1zZXJ2ZXItZXhwcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///apollo-server-express\n");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/*!*********************************************************!*\
  !*** external "babel-runtime/helpers/asyncToGenerator" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/helpers/asyncToGenerator\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiP2E2N2EiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///babel-runtime/helpers/asyncToGenerator\n");

/***/ }),

/***/ "babel-runtime/regenerator":
/*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/regenerator\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCI/MDljYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///babel-runtime/regenerator\n");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiPzgxODgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYm9keS1wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///body-parser\n");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiP2Y3OTEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiY29tcHJlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///compression\n");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCI/MjFkYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJjb29raWUtcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///cookie-parser\n");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCI/MjJmZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJleHByZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///express\n");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXNlc3Npb25cIj82MzRjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImV4cHJlc3Mtc2Vzc2lvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///express-session\n");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-tools\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncmFwaHFsLXRvb2xzXCI/MjRjYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJncmFwaHFsLXRvb2xzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC10b29sc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///graphql-tools\n");

/***/ }),

/***/ "merge-graphql-schemas":
/*!****************************************!*\
  !*** external "merge-graphql-schemas" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"merge-graphql-schemas\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZXJnZS1ncmFwaHFsLXNjaGVtYXNcIj80MDk4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im1lcmdlLWdyYXBocWwtc2NoZW1hcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1lcmdlLWdyYXBocWwtc2NoZW1hc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///merge-graphql-schemas\n");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIj8zMjA2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im1vcmdhbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///morgan\n");

/***/ }),

/***/ "pretty-error":
/*!*******************************!*\
  !*** external "pretty-error" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pretty-error\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwcmV0dHktZXJyb3JcIj84MWE3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InByZXR0eS1lcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByZXR0eS1lcnJvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///pretty-error\n");

/***/ })

/******/ });