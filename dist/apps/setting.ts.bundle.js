/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domain/localStorageWindow.ts":
/*!******************************************!*\
  !*** ./src/domain/localStorageWindow.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorageWindow": () => (/* binding */ LocalStorageWindow)
/* harmony export */ });
/* harmony import */ var _function_nullCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../function/nullCheck */ "./src/function/nullCheck.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/**
 *  ブラウザ用モック
 */
var LocalStorageWindow = /** @class */ (function () {
    function LocalStorageWindow() {
    }
    LocalStorageWindow.prototype.setObject = function (key, obj, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage.setItem(key, JSON.stringify(obj));
                if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_0__.isDefined)(callback)) {
                    callback();
                }
                return [2 /*return*/];
            });
        });
    };
    LocalStorageWindow.prototype.getObject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var rslt;
            return __generator(this, function (_a) {
                rslt = localStorage.getItem(key);
                if (rslt != null) {
                    return [2 /*return*/, JSON.parse(rslt)];
                }
                return [2 /*return*/, undefined];
            });
        });
    };
    LocalStorageWindow.prototype.deleteObject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage.removeItem(key);
                return [2 /*return*/];
            });
        });
    };
    return LocalStorageWindow;
}());



/***/ }),

/***/ "./src/function/nullCheck.ts":
/*!***********************************!*\
  !*** ./src/function/nullCheck.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDefined": () => (/* binding */ isDefined),
/* harmony export */   "isNotNull": () => (/* binding */ isNotNull),
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined)
/* harmony export */ });
/**
 * 空を表すときはundefinedを一律使用してください。
 * Nullは使用禁止。
 */
/**
 * 変数が定義済みかどうか
 * @param obj
 * @returns
 */
function isDefined(obj) {
    if (obj == null) {
        new Error('Invalid Type Error: expected Undefined but Null. 空を表すときはundefinedを一律使用してください。');
    }
    return obj !== void 0;
}
/**
 * 変数が未定義かどうか
 * @param obj
 * @returns
 */
function isUndefined(obj) {
    return !isDefined(obj);
}
/**
 * Nullチェック
 * 空を表すときはundefinedを一律使用してください。
 * @param obj
 * @returns
 */
function isNotNull(obj) {
    return obj != null;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/apps/setting.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domain_localStorageWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/localStorageWindow */ "./src/domain/localStorageWindow.ts");
/* harmony import */ var _function_nullCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../function/nullCheck */ "./src/function/nullCheck.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// import { LocalStorageChrome } from "../domain/localStorageChrome"


var localStorageClient = new _domain_localStorageWindow__WEBPACK_IMPORTED_MODULE_0__.LocalStorageWindow(); //LocalStorageChrome()
// storageKeyで共通化したい
var KEY_SELECT_ISSUE_ID = 'select_issue_id', KEY_START_DATE = 'start_date', KEY_WORKINGTIMES = 'workingtimes', KEY_PRIVATE_TOKEN = 'private_token', KEY_GITLAB_DOMAIN = 'gitlab_domain', KEY_GITLAB_PROJECT_ID = 'gitlab_project_id';
document.addEventListener("DOMContentLoaded", function () {
    initialize();
    addEventListener();
});
function initialize() {
    return __awaiter(this, void 0, void 0, function () {
        var gitLabDomain, privateToken, keyGitLabProjectId, forms, elemGitLabDomain, elemPrivateToken, elemProjectId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, localStorageClient.getObject(KEY_GITLAB_DOMAIN)];
                case 1:
                    gitLabDomain = _a.sent();
                    return [4 /*yield*/, localStorageClient.getObject(KEY_PRIVATE_TOKEN)];
                case 2:
                    privateToken = _a.sent();
                    return [4 /*yield*/, localStorageClient.getObject(KEY_GITLAB_PROJECT_ID)];
                case 3:
                    keyGitLabProjectId = _a.sent();
                    forms = document.forms[0], elemGitLabDomain = forms.gitLabDomain, elemPrivateToken = forms.privateToken, elemProjectId = forms.projectId;
                    if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_1__.isDefined)(gitLabDomain))
                        elemGitLabDomain.setAttribute("value", gitLabDomain);
                    if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_1__.isDefined)(privateToken))
                        elemPrivateToken.setAttribute("value", privateToken);
                    if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_1__.isDefined)(keyGitLabProjectId))
                        elemProjectId.setAttribute("value", keyGitLabProjectId);
                    return [2 /*return*/];
            }
        });
    });
}
function addEventListener() {
    var elemSubmitButton = document.querySelector('.submit-button');
    elemSubmitButton.addEventListener('click', function () {
        var forms = document.forms[0], gitLabDomain = forms.gitLabDomain.value, privateToken = forms.privateToken.value, projectId = forms.projectId.value;
        // const gitLabApi = new GitLabApi(new GitLabProjectAccessTokens(privateToken, gitLabDomain, projectId))
        // gitLabApi.getLoginUser()
        var isAccess = true;
        if (isAccess) {
            localStorageClient.setObject(KEY_GITLAB_DOMAIN, forms.gitLabDomain.value);
            localStorageClient.setObject(KEY_PRIVATE_TOKEN, forms.privateToken.value);
            localStorageClient.setObject(KEY_GITLAB_PROJECT_ID, forms.projectId.value);
            window.location.href = './popup.html';
        }
    });
}

})();

/******/ })()
;
//# sourceMappingURL=setting.ts.bundle.js.map