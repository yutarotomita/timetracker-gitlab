/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!***********************************!*\
  !*** ./src/function/nullCheck.ts ***!
  \***********************************/
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

/******/ })()
;
//# sourceMappingURL=nullCheck.ts.bundle.js.map