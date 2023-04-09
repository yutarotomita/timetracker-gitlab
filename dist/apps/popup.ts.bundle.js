/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domain/boostrap5.ts":
/*!*********************************!*\
  !*** ./src/domain/boostrap5.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bootstrap5": () => (/* binding */ Bootstrap5)
/* harmony export */ });
var Bootstrap5 = /** @class */ (function () {
    function Bootstrap5() {
    }
    Bootstrap5.CLASS_BG_PRIMARY = function () {
        return 'bg-primary';
    };
    Bootstrap5.CLASS_BG_SECOUNDARY = function () {
        return 'bg-secondary';
    };
    Bootstrap5.CLASS_BG_INFO = function () {
        return 'bg-info';
    };
    Bootstrap5.CLASS_BG_SUCCESS = function () {
        return 'bg-success';
    };
    Bootstrap5.CLASS_BG_WARNING = function () {
        return 'bg-warning';
    };
    Bootstrap5.CLASS_BG_DANGER = function () {
        return 'bg-danger';
    };
    Bootstrap5.CLASS_BG_LIGHT = function () {
        return 'bg-light';
    };
    Bootstrap5.CLASS_BG_DARK = function () {
        return 'bg-dark';
    };
    return Bootstrap5;
}());



/***/ }),

/***/ "./src/domain/common/template.ts":
/*!***************************************!*\
  !*** ./src/domain/common/template.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Template": () => (/* binding */ Template)
/* harmony export */ });
/**
 * htmlのTemplate要素を扱うためのクラス
 */
var Template = /** @class */ (function () {
    function Template() {
    }
    /**
     * templateから指定した要素で包まれたdom要素を生成する
     *
     * @param {string} templateIdName
     * @param {string} wrappedDomName
     * @param {string} innerClassName
     * @returns templateから生成したdom要素
     */
    Template.createWrappedDom = function (templateIdName, wrappedDomName, innerClassName) {
        var template = document.getElementById(templateIdName.getString()); //FIXME: Nullチェック
        var node = (function (temp) {
            var element = document.createElement(wrappedDomName);
            element.innerHTML = temp.innerHTML;
            return element;
        });
        return node(template).querySelector(innerClassName.getSelector());
    };
    return Template;
}());



/***/ }),

/***/ "./src/domain/common/time.ts":
/*!***********************************!*\
  !*** ./src/domain/common/time.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Time": () => (/* binding */ Time)
/* harmony export */ });
// 時間を任意のフォーマットに変換するクラス
var Time = /** @class */ (function () {
    function Time() {
    }
    // 人間が読みやすい表記に変換する ex.1h20m, 3s
    Time.humanFomatFromMiliseconds = function (ms) {
        var totalSeconds = Time.milisecondsToSeconds(ms);
        var hour = Math.floor(totalSeconds / (60 * 60));
        var minitue = Math.floor((totalSeconds - hour * 60 * 60) / 60);
        var seconds = totalSeconds - hour * 60 * 60 - minitue * 60;
        var timeForHuman = "";
        if (hour > 0) {
            timeForHuman = timeForHuman + hour + "h";
        }
        if (minitue > 0) {
            timeForHuman = timeForHuman + minitue + "m";
        }
        if (hour == 0 && minitue == 0) {
            timeForHuman = seconds + "s";
        }
        return timeForHuman;
    };
    // デジタルクロック表記（00:00）に変換する
    Time.secondsToclock = function (ms) {
        var totalSeconds = Time.milisecondsToSeconds(ms);
        var hour = Math.floor(totalSeconds / (60 * 60));
        var minitue = Math.floor((totalSeconds - hour * 60 * 60) / 60);
        return hour + ":" + ('00' + minitue).slice(-2); // 分は2桁でゼロ埋め
    };
    // 秒を時間に変換する
    Time.secondsToHour = function (seconds) {
        return Time.roundOffTwoDecimalPlaces(seconds / (60 * 60), 3);
    };
    // 秒を分に変換する
    Time.secondsToMinute = function (seconds) {
        return Time.roundOffTwoDecimalPlaces(seconds / 60, 1);
    };
    // ミリ秒を秒に変換する
    Time.milisecondsToSeconds = function (ms) {
        return Math.round(ms / 1000);
    };
    // 分をミリ秒に変換する
    Time.minuteToMiliSeconds = function (minutes) {
        return minutes * 1000 * 60;
    };
    // 小数点第〇位を四捨五入する
    Time.roundOffTwoDecimalPlaces = function (seconds, decimalPlace) {
        return Math.round(seconds * (Math.pow(10, (decimalPlace - 1)))) / (Math.pow(10, (decimalPlace - 1)));
    };
    return Time;
}());



/***/ }),

/***/ "./src/domain/element/elementClass.ts":
/*!********************************************!*\
  !*** ./src/domain/element/elementClass.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ElementClass": () => (/* binding */ ElementClass)
/* harmony export */ });
/**
 * htmlのclass属性を表すオブジェクト
 */
var ElementClass = /** @class */ (function () {
    function ElementClass(id) {
        this.className = id;
    }
    ElementClass.prototype.getSelector = function () {
        return '.' + this.className;
    };
    ElementClass.prototype.getString = function () {
        return this.className;
    };
    return ElementClass;
}());



/***/ }),

/***/ "./src/domain/element/elementId.ts":
/*!*****************************************!*\
  !*** ./src/domain/element/elementId.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ElementId": () => (/* binding */ ElementId)
/* harmony export */ });
/**
 * htmlのid属性を表すオブジェクト
 */
var ElementId = /** @class */ (function () {
    function ElementId(id) {
        this.id = id;
    }
    ElementId.prototype.getSelector = function () {
        return '#' + this.id;
    };
    ElementId.prototype.getString = function () {
        return this.id;
    };
    return ElementId;
}());



/***/ }),

/***/ "./src/domain/gitlab/gitLabApi.ts":
/*!****************************************!*\
  !*** ./src/domain/gitlab/gitLabApi.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitLabApi": () => (/* binding */ GitLabApi)
/* harmony export */ });
/* harmony import */ var _common_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/time */ "./src/domain/common/time.ts");
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

var GitLabApi = /** @class */ (function () {
    function GitLabApi(gitLabProjectAccessTokens) {
        this.domain = gitLabProjectAccessTokens.getGitLabDomain();
        this.privateToken = gitLabProjectAccessTokens.getPrivateToken();
        this.projectId = gitLabProjectAccessTokens.getProjectId();
    }
    GitLabApi.prototype.getProjectId = function () {
        return this.projectId;
    };
    // ログインユーザー情報取得
    GitLabApi.prototype.getLoginUser = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.createBaseUrl();
                        url.pathname = url.pathname + '/user/';
                        return [4 /*yield*/, this.getAjax(url, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GET /projects/:id/milestones
     * @param {*} callback
     */
    // async getAjaxMilestone(callback: Function){
    // 	let url = this.createBaseUrl()
    // 	url.pathname = url.pathname + '/projects/' + this.getProjectId() + '/milestones'
    // 	await this.getAjax(url, callback)
    // }
    /**
     * GET /projects/:id/issues
     * @param {*} callback
     * @param {*} milestone
     */
    GitLabApi.prototype.getAjaxIssue = function (callback, perPage, page) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.createBaseUrl();
                        url.pathname = url.pathname + '/projects/' + this.getProjectId() + '/issues';
                        url.search = '?per_page=' + perPage + '&page=' + page;
                        return [4 /*yield*/, this.getAjax(url, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param {*} url
     * @param {*} callback
     */
    GitLabApi.prototype.getAjax = function (url, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('GET AjaxStart: ' + url);
                        return [4 /*yield*/, fetch(url.toString(), {
                                method: 'GET',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'PRIVATE-TOKEN': this.privateToken
                                },
                            })
                                .then(function (response) {
                                if (!response.ok) {
                                    throw new Error('下記のリクエストに失敗しているので、メッセージをご確認ください');
                                }
                                return response.json();
                            })
                                .then(function (rslt) {
                                callback(rslt);
                            })
                                .catch(function (error) {
                                console.error(error);
                            })];
                    case 1:
                        _a.sent();
                        console.log('GET AjaxEnd: ' + url);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * POST /projects/:id/issues/:issue_iid/add_spent_time
     * @param {*} callback
     * @param {*} issueIid
     * @param {*} spentTime ミリ秒
     */
    GitLabApi.prototype.postAjaxSpentIssue = function (callback, issueIid, spentTime) {
        var url = this.createBaseUrl();
        url.pathname = url.pathname + '/projects/' + this.getProjectId() + '/issues/' + issueIid + '/add_spent_time';
        url.search = '?duration=' + _common_time__WEBPACK_IMPORTED_MODULE_0__.Time.milisecondsToSeconds(spentTime) + 's';
        this.postAjax(url, callback);
    };
    /**
     *
     * @param {*} url
     * @param {*} callback
     */
    GitLabApi.prototype.postAjax = function (url, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('POST AjaxStart: ' + url);
                        return [4 /*yield*/, fetch(url.toString(), {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'PRIVATE-TOKEN': this.privateToken
                                },
                            })
                                .then(function (response) {
                                if (!response.ok) {
                                    throw new Error('下記のリクエストに失敗しているので、メッセージをご確認ください');
                                }
                                return response.json();
                            })
                                .then(function (rslt) {
                                callback(rslt);
                            })
                                .catch(function (error) {
                                console.error(error);
                            })];
                    case 1:
                        _a.sent();
                        console.log('POST AjaxEnd: ' + url);
                        return [2 /*return*/];
                }
            });
        });
    };
    GitLabApi.prototype.createBaseUrl = function () {
        return new URL('https://' + this.getDomain() + '/api/v4');
    };
    GitLabApi.prototype.getDomain = function () {
        return this.domain;
    };
    return GitLabApi;
}());



/***/ }),

/***/ "./src/domain/gitlab/gitLabIssue.ts":
/*!******************************************!*\
  !*** ./src/domain/gitlab/gitLabIssue.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitLabIssue": () => (/* binding */ GitLabIssue)
/* harmony export */ });
/* harmony import */ var _gitLabUser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gitLabUser */ "./src/domain/gitlab/gitLabUser.ts");
/* harmony import */ var _function_nullCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../function/nullCheck */ "./src/function/nullCheck.ts");


// Issue単体のクラス
var GitLabIssue = /** @class */ (function () {
    function GitLabIssue(issue) {
        this.id = issue.iid;
        this.assignee = issue.assignee ? new _gitLabUser__WEBPACK_IMPORTED_MODULE_0__.GitLabUser(issue.assignee) : undefined;
        this.title = issue.title;
        this.timeEstimate = issue.time_stats.time_estimate;
        this.timeSpend = issue.time_stats.total_time_spent;
        // this.good = issue.upvotes
        // this.bad = issue.downvotes
        this.labels = issue.labels;
        this.state = issue.state;
        this.url = issue.url; //web_url
    }
    // 単一のプロジェクトのスコープ内で一意の内部ID。spendなどGitLab上のissueを更新するときにはこっちが必要
    GitLabIssue.prototype.getId = function () {
        return this.id;
    };
    GitLabIssue.prototype.getAssignee = function () {
        return this.assignee;
    };
    GitLabIssue.prototype.isAssign = function () {
        return (0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_1__.isDefined)(this.assignee) ? true : false;
    };
    GitLabIssue.prototype.getTitle = function () {
        return this.title;
    };
    GitLabIssue.prototype.getTimeEstimate = function () {
        return this.timeEstimate ? this.timeEstimate : 0;
    };
    GitLabIssue.prototype.getTimeSpend = function () {
        return this.timeSpend ? this.timeSpend : 0;
    };
    // getGood(){
    // 	return this.good
    // }
    // getBad(){
    // 	return this.bad
    // }
    GitLabIssue.prototype.getLabels = function () {
        return this.labels;
    };
    GitLabIssue.prototype.getUrl = function () {
        return this.url;
    };
    /**
     * 付箋が閉じているとき: "closed"
     * 付箋が開いているとき: "opened"
     */
    GitLabIssue.prototype.isActive = function () {
        return this.state == "opened" ? true : false;
    };
    return GitLabIssue;
}());



/***/ }),

/***/ "./src/domain/gitlab/gitLabProjcetAccessTokens.ts":
/*!********************************************************!*\
  !*** ./src/domain/gitlab/gitLabProjcetAccessTokens.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitLabProjectAccessTokens": () => (/* binding */ GitLabProjectAccessTokens)
/* harmony export */ });
var GitLabProjectAccessTokens = /** @class */ (function () {
    function GitLabProjectAccessTokens(privateToken, gitlabDomain, projectId) {
        this.privateToken = privateToken;
        this.gitlabDomain = gitlabDomain;
        this.projectId = projectId;
    }
    GitLabProjectAccessTokens.prototype.setPrivateToken = function (privateToken) {
        this.privateToken = privateToken;
    };
    GitLabProjectAccessTokens.prototype.setGitLabDomain = function (gitlabDomain) {
        this.gitlabDomain = gitlabDomain;
    };
    GitLabProjectAccessTokens.prototype.setProjectId = function (projectId) {
        this.projectId = projectId;
    };
    GitLabProjectAccessTokens.prototype.getPrivateToken = function () {
        return this.privateToken;
    };
    GitLabProjectAccessTokens.prototype.getGitLabDomain = function () {
        return this.gitlabDomain;
    };
    GitLabProjectAccessTokens.prototype.getProjectId = function () {
        return this.projectId;
    };
    return GitLabProjectAccessTokens;
}());



/***/ }),

/***/ "./src/domain/gitlab/gitLabUser.ts":
/*!*****************************************!*\
  !*** ./src/domain/gitlab/gitLabUser.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitLabUser": () => (/* binding */ GitLabUser)
/* harmony export */ });
// ユーザー1名を表すクラス
var GitLabUser = /** @class */ (function () {
    function GitLabUser(user) {
        this.id = user.id;
        this.userName = user.username;
        this.label = user.name;
        this.imgPath = user.avatar_url;
        this.profilePath = user.web_url;
    }
    GitLabUser.prototype.getId = function () {
        return this.id;
    };
    GitLabUser.prototype.getUserName = function () {
        return this.userName;
    };
    GitLabUser.prototype.getLabel = function () {
        return this.label;
    };
    GitLabUser.prototype.getImgPath = function () {
        return this.imgPath;
    };
    GitLabUser.prototype.getProfilePath = function () {
        return this.profilePath;
    };
    return GitLabUser;
}());



/***/ }),

/***/ "./src/domain/html/spendButton.ts":
/*!****************************************!*\
  !*** ./src/domain/html/spendButton.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpendButton": () => (/* binding */ SpendButton)
/* harmony export */ });
/**
 * ボタン「Spend」のクラス
 */
var SpendButton = /** @class */ (function () {
    function SpendButton(domId) {
        this.dom = document.querySelector(domId.getSelector()); //FIXME: Nullチェック
    }
    SpendButton.prototype.addListenerClickAfter = function (action) {
        this.dom.addEventListener('click', function () {
            action();
        });
    };
    return SpendButton;
}());



/***/ }),

/***/ "./src/domain/html/totalElapsedTime.ts":
/*!*********************************************!*\
  !*** ./src/domain/html/totalElapsedTime.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TotalElapsedTime": () => (/* binding */ TotalElapsedTime)
/* harmony export */ });
/* harmony import */ var _common_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/time */ "./src/domain/common/time.ts");

/**
 * 合計消費時間を表す要素のクラス
 */
var TotalElapsedTime = /** @class */ (function () {
    function TotalElapsedTime(className) {
        this.dom = document.querySelector(className.getSelector()); //FIXME: Nullチェック
        this.totalElapsedTime = 0; //s
    }
    /**
     * 合計消費時間をDOM要素へ反映する
     */
    TotalElapsedTime.prototype.set = function (milisec) {
        this.totalElapsedTime = milisec;
        this.dom.innerHTML = String(_common_time__WEBPACK_IMPORTED_MODULE_0__.Time.secondsToclock(this.totalElapsedTime));
    };
    return TotalElapsedTime;
}());



/***/ }),

/***/ "./src/domain/issueDto.ts":
/*!********************************!*\
  !*** ./src/domain/issueDto.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IssueDto": () => (/* binding */ IssueDto)
/* harmony export */ });
/* harmony import */ var _function_nullCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../function/nullCheck */ "./src/function/nullCheck.ts");

/**
 * issueをローカルストレージで保存、復元するためのDto
 * jsのlocalstorageはオブジェクトのfunctionをシリアライズできないため用意した
 */
var IssueDto = /** @class */ (function () {
    function IssueDto(issue) {
        this.id = issue.id;
        this.assignee = issue.assignee ? new GitLabUserDto(issue.id, issue.assignee.userName, issue.assignee.label, issue.assignee.imgPath, issue.assignee.profilePath) : undefined;
        this.title = issue.title;
        this.timeEstimate = issue.timeEstimate;
        this.timeSpend = issue.timeSpend;
        this.labels = issue.labels;
        this.state = issue.state;
        this.url = issue.url;
    }
    IssueDto.prototype.getId = function () {
        return this.id;
    };
    IssueDto.prototype.getAssignee = function () {
        return this.assignee;
    };
    IssueDto.prototype.isAssign = function () {
        return (0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_0__.isDefined)(this.assignee) ? true : false;
    };
    IssueDto.prototype.getTitle = function () {
        return this.title;
    };
    IssueDto.prototype.getTimeEstimate = function () {
        return this.timeEstimate ? this.timeEstimate : 0;
    };
    IssueDto.prototype.getTimeSpend = function () {
        return this.timeSpend ? this.timeSpend : 0;
    };
    IssueDto.prototype.getLabels = function () {
        return this.labels;
    };
    IssueDto.prototype.getUrl = function () {
        return this.url;
    };
    /**
     * 付箋が閉じているとき: "closed"
     * 付箋が開いているとき: "opened"
     */
    IssueDto.prototype.isActive = function () {
        return this.state == "opened" ? true : false;
    };
    return IssueDto;
}());

var GitLabUserDto = /** @class */ (function () {
    function GitLabUserDto(id, userName, label, imgPath, profilePath) {
        this.id = id;
        this.userName = userName;
        this.label = label;
        this.imgPath = imgPath;
        this.profilePath = profilePath;
    }
    GitLabUserDto.prototype.getId = function () {
        return this.id;
    };
    GitLabUserDto.prototype.getUserName = function () {
        return this.userName;
    };
    GitLabUserDto.prototype.getLabel = function () {
        return this.label;
    };
    GitLabUserDto.prototype.getImgPath = function () {
        return this.imgPath;
    };
    GitLabUserDto.prototype.getProfilePath = function () {
        return this.profilePath;
    };
    return GitLabUserDto;
}());


/***/ }),

/***/ "./src/domain/issueList.ts":
/*!*********************************!*\
  !*** ./src/domain/issueList.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IssueList": () => (/* binding */ IssueList)
/* harmony export */ });
/* harmony import */ var _function_nullCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../function/nullCheck */ "./src/function/nullCheck.ts");

/**
 * 付箋リストのクラス
 */
var IssueList = /** @class */ (function () {
    function IssueList() {
        this.issueList = [];
    }
    /**
     * issueの配列をセット
     * @param {Array[Issue]} issues
     */
    IssueList.prototype.set = function (issues) {
        this.issueList = issues;
    };
    IssueList.prototype.add = function (issue) {
        this.issueList.push(issue);
    };
    IssueList.prototype.getById = function (id) {
        return this.issueList.find(function (issue) { return issue.getId() == id; });
    };
    /**
     * Issueの配列を返却する
     * @returns Array[Issue]
     */
    IssueList.prototype.getIssueList = function () {
        return this.issueList;
    };
    /**
     * issue.idを重複なしの配列形式で返却する
     */
    IssueList.prototype.getAllIds = function () {
        var ids = this.issueList.map(function (issue) { return issue.id; });
        return Array.from(new Set(ids));
    };
    // リストに含まれるユーザーを配列形式で返却する
    IssueList.prototype.getUserList = function () {
        var assigneeInIssueList = [];
        this.issueList.forEach(function (issue) {
            if (issue.isAssign()) {
                assigneeInIssueList.push(issue.getAssignee());
            }
        });
        return assigneeInIssueList;
    };
    /**
     * 任意条件でリストを絞り込むメソッド
     * @param {IssueParam} issueParam
     */
    IssueList.prototype.filter = function (issueParam) {
        var filteredIssueList = this.issueList;
        if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_0__.isDefined)(issueParam.getUserId())) {
            filteredIssueList = filteredIssueList.filter(function (issue) { return issue.isAssign() && (issue.getAssignee().getId() == issueParam.getUserId()); });
        }
        // labelが複数指定されている場合はand検索
        if (issueParam.getLabels().length > 0) {
            issueParam.getLabels().forEach(function (label) {
                filteredIssueList = filteredIssueList.filter(function (issue) {
                    return issue.getLabels().includes(label);
                });
            });
        }
        if (issueParam.isActive() != null) {
            filteredIssueList = filteredIssueList.filter(function (issue) { return issue.isActive() == issueParam.isActive(); });
        }
        var newIssueList = new IssueList();
        newIssueList.set(filteredIssueList);
        return newIssueList;
    };
    // 総Issue数を返却する
    IssueList.prototype.getCountAll = function () {
        return this.issueList.length;
    };
    // 総見積もり時間[秒]を返却する
    IssueList.prototype.getTotalEstimateTime = function () {
        var totalEstimate = 0;
        this.issueList.forEach(function (issue) {
            totalEstimate = totalEstimate + issue.getTimeEstimate();
        });
        return totalEstimate;
    };
    // 総消費時間[秒]を返却する
    IssueList.prototype.getTotalSpentTime = function () {
        var totalSpend = 0;
        this.issueList.forEach(function (issue) {
            totalSpend = totalSpend + issue.getTimeSpend();
        });
        return totalSpend;
    };
    return IssueList;
}());



/***/ }),

/***/ "./src/domain/issueParam.ts":
/*!**********************************!*\
  !*** ./src/domain/issueParam.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IssueParam": () => (/* binding */ IssueParam)
/* harmony export */ });
/**
 * Issue検索・抽出用のパラメータ
 */
var IssueParam = /** @class */ (function () {
    function IssueParam() {
        this.userId = undefined;
        this.labels = [];
        this.activeFlg = undefined;
    }
    IssueParam.prototype.setUserId = function (id) {
        this.userId = id;
    };
    IssueParam.prototype.getUserId = function () {
        return this.userId;
    };
    IssueParam.prototype.setLabel = function (label) {
        this.labels.push(label);
    };
    IssueParam.prototype.getLabels = function () {
        return this.labels;
    };
    IssueParam.prototype.setActive = function (flg) {
        this.activeFlg = flg ? true : false;
    };
    IssueParam.prototype.isActive = function () {
        return this.activeFlg;
    };
    return IssueParam;
}());



/***/ }),

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

/***/ "./src/domain/stickyNote.ts":
/*!**********************************!*\
  !*** ./src/domain/stickyNote.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StickyNote": () => (/* binding */ StickyNote)
/* harmony export */ });
/* harmony import */ var _domain_common_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/common/template */ "./src/domain/common/template.ts");
/* harmony import */ var _common_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/time */ "./src/domain/common/time.ts");
/* harmony import */ var _function_nullCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../function/nullCheck */ "./src/function/nullCheck.ts");
/* harmony import */ var _boostrap5__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boostrap5 */ "./src/domain/boostrap5.ts");
/* harmony import */ var _element_elementClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./element/elementClass */ "./src/domain/element/elementClass.ts");
/* harmony import */ var _element_elementId__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./element/elementId */ "./src/domain/element/elementId.ts");






/**
 * リスト内の一つの付箋に相当するクラス
 * 付箋のDOM要素とIssueオブジェクトの整合性を保つ
 */
var StickyNote = /** @class */ (function () {
    function StickyNote(issue) {
        // テンプレートからひな形となるDOMを生成
        this.dom = _domain_common_template__WEBPACK_IMPORTED_MODULE_0__.Template.createWrappedDom(new _element_elementId__WEBPACK_IMPORTED_MODULE_5__.ElementId('issue-list-item-template'), 'div', new _element_elementClass__WEBPACK_IMPORTED_MODULE_4__.ElementClass('list-group-item'));
        // 付箋のidはissueのidを利用する
        this.id = issue.getId();
        this.issue = issue;
        this.available = false;
        // 工数カウント用
        this.startDate = undefined;
        this.elapsedTime = 0; //ms
        this.set(issue);
    }
    // 初期化
    StickyNote.prototype.set = function (issue) {
        this.id = issue.getId();
        this.issue = issue;
        // Issueクラスの情報をDOM要素へ反映
        var titleDom = this.dom.querySelector(StickyNote.SELECTOR_TITLE()); //Nullチェック
        titleDom.innerHTML = issue.getTitle();
        var spendTimeDom = this.dom.querySelector(StickyNote.SELECTOR_SPEND_TIME()); //Nullチェック
        spendTimeDom.innerHTML = String(_common_time__WEBPACK_IMPORTED_MODULE_1__.Time.secondsToHour(issue.getTimeSpend()));
        var profileAvatarDom = this.dom.querySelector(StickyNote.SELECTOR_PROJILE_AVATAR()); // Nullチェック
        if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_2__.isDefined)(issue.getAssignee())) {
            profileAvatarDom.src = issue.getAssignee().getImgPath();
        }
        // 実績に応じてプログレスバーの見た目を更新する
        this.setProgressBar();
        // ラベルに応じてバッチの見た目を変える
        var badgeDom = this.dom.querySelector(StickyNote.SELECTOR_BADGE()); // Nullチェック
        if (!issue.isActive()) {
            badgeDom.innerHTML = 'closed';
            badgeDom.classList.add(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_DARK());
        }
        else {
            badgeDom.innerHTML = issue.getLabels()[0]; //FIXME: 複数ラベルに対応したい
            if (issue.getLabels()[0] == 'Doing') {
                badgeDom.classList.add(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_SUCCESS());
            }
            else if (issue.getLabels()[0] == 'Waiting') {
                badgeDom.classList.add(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_SECOUNDARY());
            }
            else if (issue.getLabels()[0] === '個人ToDo') {
                badgeDom.classList.add(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_WARNING());
            }
            else if (issue.getLabels()[0] == 'レビュー待ち') {
                badgeDom.classList.add(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_DANGER());
            }
        }
    };
    // 選択状態にする
    StickyNote.prototype.select = function (startDate) {
        if (!this.available) {
            this.available = true;
            this.dom.classList.add(StickyNote.CLASS_AVAILABLE());
            // カウントアップを始める
            this.startDate = startDate;
        }
    };
    // 非選択状態にする
    StickyNote.prototype.unselect = function () {
        // 経過時間を反映
        if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_2__.isDefined)(this.startDate)) {
            if (this.available) {
                this.available = false;
                this.dom.classList.remove(StickyNote.CLASS_AVAILABLE());
                this.setElapsedTime(Date.now() - this.startDate);
            }
        }
        else {
            new Error("StartDateが未定義です");
        }
    };
    // クリック時のイベントハンドラ登録
    StickyNote.prototype.addListenerClickAfter = function (action) {
        this.dom.addEventListener('click', function (index) {
            action(index);
        });
    };
    // 選択状態かを返却
    StickyNote.prototype.isAvailable = function () {
        return this.available;
    };
    StickyNote.prototype.getDom = function () {
        return this.dom;
    };
    StickyNote.prototype.getId = function () {
        return this.id;
    };
    StickyNote.prototype.setId = function (id) {
        this.id = id;
    };
    StickyNote.prototype.getName = function () {
        return this.issue.getTitle();
    };
    StickyNote.prototype.getStartDate = function () {
        return this.startDate;
    };
    StickyNote.prototype.setStartDate = function (date) {
        this.startDate = date;
    };
    StickyNote.prototype.getElapsedTime = function () {
        return this.elapsedTime;
    };
    // 経過時間をクラス内部の変数に保持し、見た目に反映する
    StickyNote.prototype.setElapsedTime = function (time) {
        this.elapsedTime = this.elapsedTime + time;
        var elapsedTimeDom = this.dom.querySelector(StickyNote.SELECTOR_ELAPSED_TIME()); // Nullチェック
        elapsedTimeDom.innerHTML = _common_time__WEBPACK_IMPORTED_MODULE_1__.Time.humanFomatFromMiliseconds(this.elapsedTime);
        this.setProgressBar();
    };
    // プログレスバー1,2の見た目を更新する
    StickyNote.prototype.setProgressBar = function () {
        var estimatedTime = this.issue.getTimeEstimate(), spendTime = this.issue.getTimeSpend(), addTime = _common_time__WEBPACK_IMPORTED_MODULE_1__.Time.milisecondsToSeconds(this.elapsedTime);
        var progressBarDom1 = this.dom.querySelector(StickyNote.SELECTOR_PROGRESS_BAR1()) // Nullチェック
        , progressBarDom2 = this.dom.querySelector(StickyNote.SELECTOR_PROGRESS_BAR2()); // Nullチェック
        var progressPer1, progressPer2;
        if (estimatedTime > 0) {
            progressPer1 = Math.floor((spendTime / estimatedTime) * 100);
            progressPer2 = Math.floor((addTime / estimatedTime) * 100);
        }
        else if (spendTime + addTime > 0) {
            progressPer1 = Math.floor(spendTime / (spendTime + addTime)) * 100;
            progressPer2 = Math.floor(addTime / (spendTime + addTime)) * 100;
        }
        else {
            progressPer1 = 0;
            progressPer2 = 0;
        }
        // 1割以下だと追加時間が見えない。最低1割を確保する
        if (addTime > 0 && progressPer2 < 10) {
            progressPer2 = 10;
        }
        if (spendTime > 0 && progressPer1 < 10) {
            progressPer1 = 10;
        }
        progressBarDom1.setAttribute("style", "width: " + String(progressPer1) + '%' + ";");
        progressBarDom2.setAttribute("style", "width: " + String(progressPer2) + '%' + ";");
        progressBarDom1.classList.remove(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_DANGER(), _boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_WARNING());
        progressBarDom2.classList.remove(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_DANGER(), _boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_WARNING());
        if (progressPer1 + progressPer2 > 200) {
            progressBarDom1.classList.add(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_DANGER());
            progressBarDom2.classList.add(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_DANGER());
        }
        else if (progressPer1 + progressPer2 > 100) {
            progressBarDom1.classList.add(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_WARNING());
            progressBarDom2.classList.add(_boostrap5__WEBPACK_IMPORTED_MODULE_3__.Bootstrap5.CLASS_BG_WARNING());
        }
    };
    StickyNote.SELECTOR_TITLE = function () {
        return ".stickyNote-title";
    };
    StickyNote.SELECTOR_SPEND_TIME = function () {
        return ".stickyNote-spendTime";
    };
    StickyNote.SELECTOR_ELAPSED_TIME = function () {
        return ".stickyNote-elapsedTime";
    };
    StickyNote.SELECTOR_EST_TIME = function () {
        return ".stickyNote-estTime";
    };
    StickyNote.SELECTOR_PROJILE_AVATAR = function () {
        return '.stickyNote-profile-avatar';
    };
    StickyNote.SELECTOR_PROGRESS_BAR1 = function () {
        return '.stickyNote-progress-bar-1';
    };
    StickyNote.SELECTOR_PROGRESS_BAR2 = function () {
        return '.stickyNote-progress-bar-2';
    };
    StickyNote.SELECTOR_BADGE = function () {
        return '.stickyNote-badge';
    };
    // 活性状態を表すクラス
    StickyNote.CLASS_AVAILABLE = function () {
        // Bootstrapのコンテクストクラスを利用している
        // https://getbootstrap.jp/docs/5.0/components/list-group/#contextual-classes
        return "list-group-item-primary";
    };
    return StickyNote;
}());



/***/ }),

/***/ "./src/domain/stickyNoteList.ts":
/*!**************************************!*\
  !*** ./src/domain/stickyNoteList.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StickyNoteList": () => (/* binding */ StickyNoteList)
/* harmony export */ });
/* harmony import */ var _stickyNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stickyNote */ "./src/domain/stickyNote.ts");
/* harmony import */ var _function_nullCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../function/nullCheck */ "./src/function/nullCheck.ts");


// 表示されているリストのオブジェクト
var StickyNoteList = /** @class */ (function () {
    function StickyNoteList(domId) {
        this.dom = document.getElementById(domId.getString());
        this.selectedId = undefined; //選択中の付箋ID
        this.selectedIndex = undefined; //選択中の付箋index
        this.stickyNotes = [];
        this.eventAfterClick = function () { };
    }
    /**
     * 付箋リストからDOM要素を追加
     * @param {IssueList} issueList
     */
    StickyNoteList.prototype.set = function (issueList) {
        var _this = this;
        this.selectedId = undefined;
        this.selectedIndex = undefined;
        this.issueList = issueList;
        this.stickyNotes = []; // FIXME: 現状setするとStickyNoteを再生成しているため内部的にも保持されない。どっかで保持して再利用したい
        this.dom.innerHTML = ''; // FIXME: innerHTMLで子要素を削除するのは非推奨。whileで回すかjquery.remove()を使う
        issueList.getIssueList().forEach(function (issue) {
            _this.add(issue);
        });
    };
    /**
     * WorkingTimeListの実績をStickyNoteの実績に反映する
     * @param {*} workingTimes
     */
    StickyNoteList.prototype.update = function (workingTimes) {
        var _this = this;
        // 合計したWorkingTimeでStickyNoteに反映
        workingTimes.forEach(function (workingTime) {
            var targetIndex = _this.getIndexById(workingTime.getTaskId());
            if (targetIndex != -1) {
                _this.stickyNotes[targetIndex].setStartDate(workingTime.getStartDate());
                _this.stickyNotes[targetIndex].setElapsedTime(workingTime.getElapsedTime());
            }
        });
    };
    /**
     * リストに新しく付箋を追加
     * @param {Issue} issue
     * @returns index
     */
    StickyNoteList.prototype.add = function (issue, isPrepend) {
        var _this = this;
        if (isPrepend === void 0) { isPrepend = false; }
        var index = this.stickyNotes.length;
        // 各付箋の要素を生成
        var stickyNote = new _stickyNote__WEBPACK_IMPORTED_MODULE_0__.StickyNote(issue);
        // クリック時のイベントハンドラを設定
        stickyNote.addListenerClickAfter(function () {
            _this.selectByIndex(index);
            _this.eventAfterClick(stickyNote);
        });
        this.stickyNotes.push(stickyNote);
        if (isPrepend) {
            this.dom.prepend(stickyNote.getDom());
        }
        else {
            this.dom.append(stickyNote.getDom());
        }
        return index;
    };
    /**
     * 任意のindexの付箋を選択状態にする
     * @param {Number} index
     * @param {Number} startDate? <opt> 開始時刻。デフォルトは現在時刻
     */
    StickyNoteList.prototype.selectByIndex = function (index, startDate) {
        if (index != this.selectedIndex) {
            this.unselectAll();
            this.selectedIndex = index;
            this.selectedId = this.stickyNotes[index].getId();
            // 開始時間が指定されていれば、その時刻から選択した状態に
            startDate = (0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_1__.isDefined)(startDate) ? startDate : Date.now();
            this.stickyNotes[index].select(startDate);
        }
        else {
            this.unselectAll();
        }
    };
    StickyNoteList.prototype.getAll = function () {
        return this.stickyNotes;
    };
    /**
     * 任意のidからindexを検索する
     * @param {*} id
     * @returns idに対応するIssueのindex、なければ-1
     */
    StickyNoteList.prototype.getIndexById = function (id) {
        return this.stickyNotes.findIndex(function (stickyNote) { return stickyNote.getId() == id; });
    };
    /**
     * 任意のidが存在するか
     */
    StickyNoteList.prototype.existById = function (id) {
        return this.getIndexById(id) != -1;
    };
    /**
     * 任意のidからStickeyNoteを検索する
     * @param {Number} id
     * @returns idに対応するStickyNote
     */
    StickyNoteList.prototype.getById = function (id) {
        return this.stickyNotes[this.getIndexById(id)];
    };
    /**
     * 選択中の付箋idを返却する
     * @returns {Number} id
     */
    StickyNoteList.prototype.getSelectedId = function () {
        return this.selectedId;
    };
    /**
     * 全ての付箋を非選択状態にする
     */
    StickyNoteList.prototype.unselectAll = function () {
        this.selectedId = undefined;
        this.selectedIndex = undefined;
        this.stickyNotes.forEach(function (stickyNote) {
            stickyNote.unselect();
        });
    };
    /**
     * 工数など全て初期化する
     */
    StickyNoteList.prototype.clearAll = function () {
        if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_1__.isDefined)(this.issueList)) {
            this.set(this.issueList);
        }
    };
    /**
     * クリック時のイベントハンドラを設定する
     */
    StickyNoteList.prototype.addListenerClickAfter = function (action) {
        this.eventAfterClick = action;
    };
    return StickyNoteList;
}());



/***/ }),

/***/ "./src/domain/workingTime.ts":
/*!***********************************!*\
  !*** ./src/domain/workingTime.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkingTime": () => (/* binding */ WorkingTime)
/* harmony export */ });
/**
 * 作業実績を示すドメインクラス
 * 実績の最小単位で、作業中のタスクを切り替える・完了すると、このクラスが1つ出来るはず
 */
var WorkingTime = /** @class */ (function () {
    function WorkingTime(startDate, elapsedTime, taskId, taskName) {
        this.workingTimeId = taskId + "_" + startDate;
        this.startDate = startDate;
        this.elapsedTime = elapsedTime; //s
        this.taskId = taskId;
        this.taskName = taskName;
    }
    WorkingTime.prototype.getWorkingTimeId = function () {
        return this.workingTimeId;
    };
    WorkingTime.prototype.getStartDate = function () {
        return this.startDate;
    };
    WorkingTime.prototype.setStartDate = function (date) {
        this.startDate = date;
    };
    WorkingTime.prototype.setElapsedTime = function (seconds) {
        this.elapsedTime = seconds;
    };
    WorkingTime.prototype.getElapsedTime = function () {
        return this.elapsedTime;
    };
    WorkingTime.prototype.getTime = function () {
        return this.elapsedTime;
    };
    WorkingTime.prototype.getTaskId = function () {
        return this.taskId;
    };
    WorkingTime.prototype.setTaskName = function (taskName) {
        this.taskName = taskName;
    };
    WorkingTime.prototype.getTaskName = function () {
        return this.taskName;
    };
    return WorkingTime;
}());



/***/ }),

/***/ "./src/domain/workingTimeList.ts":
/*!***************************************!*\
  !*** ./src/domain/workingTimeList.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkingTimeList": () => (/* binding */ WorkingTimeList)
/* harmony export */ });
/**
 * 作業実績のサービスクラス
 * 作業時間の合計単位は一日になるはず
 */
var WorkingTimeList = /** @class */ (function () {
    function WorkingTimeList() {
        this.workingTimes = [];
        this.elapsedTime = 0; //s
    }
    WorkingTimeList.prototype.add = function (workingTime) {
        this.workingTimes.push(workingTime);
        this.elapsedTime = this.elapsedTime + workingTime.getTime();
    };
    WorkingTimeList.prototype.remove = function (workingTimeId) {
        var targetIndex = this.workingTimes.findIndex(function (workingTime) { return workingTime.getWorkingTimeId() == workingTimeId; });
        return this.workingTimes.splice(targetIndex, 1);
    };
    WorkingTimeList.prototype.clear = function () {
        this.workingTimes = [];
        this.elapsedTime = 0; //s
    };
    WorkingTimeList.prototype.getAll = function () {
        return this.workingTimes;
    };
    WorkingTimeList.prototype.getListGroupById = function () {
        var workingTimesByTask = [];
        this.workingTimes.forEach(function (workingTime) {
            var sameTaskIndex = workingTimesByTask.findIndex(function (workingTimeByTask) {
                workingTimeByTask.getTaskId() == workingTime.getTaskId();
            });
            // 既に実績があるタスクは
            if (sameTaskIndex != -1) {
                // 時間を追加する
                var totalTime = workingTimesByTask[sameTaskIndex].getElapsedTime() + workingTime.getElapsedTime();
                workingTimesByTask[sameTaskIndex].setElapsedTime(totalTime);
                // より最新のStartDateであればそちらを採用する
                if (workingTimesByTask[sameTaskIndex].getStartDate() > workingTime.getStartDate()) {
                    workingTimesByTask[sameTaskIndex].setStartDate(workingTime.getStartDate());
                }
            }
            // 実績がない場合は保存
            else {
                workingTimesByTask.push(workingTime);
            }
        });
        return workingTimesByTask;
    };
    WorkingTimeList.prototype.getElapsedTime = function () {
        return this.elapsedTime;
    };
    return WorkingTimeList;
}());



/***/ }),

/***/ "./src/domain/workingTimeSticky.ts":
/*!*****************************************!*\
  !*** ./src/domain/workingTimeSticky.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkingTimeSticky": () => (/* binding */ WorkingTimeSticky)
/* harmony export */ });
/* harmony import */ var _common_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/template */ "./src/domain/common/template.ts");
/* harmony import */ var _element_elementClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element/elementClass */ "./src/domain/element/elementClass.ts");
/* harmony import */ var _element_elementId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./element/elementId */ "./src/domain/element/elementId.ts");
/* harmony import */ var _common_time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/time */ "./src/domain/common/time.ts");




/**
 * 工数リスト内の一つの付箋に相当するクラス
 * 付箋のDOM要素とWorkingTimeオブジェクトの整合性を保つ
 */
var WorkingTimeSticky = /** @class */ (function () {
    function WorkingTimeSticky(workingTime, index) {
        this.selected = false;
        this.eventAfterChange = function () { };
        // テンプレートからひな形となるDOMを生成
        this.dom = _common_template__WEBPACK_IMPORTED_MODULE_0__.Template.createWrappedDom(new _element_elementId__WEBPACK_IMPORTED_MODULE_2__.ElementId('workingTime-list-item-template'), 'div', new _element_elementClass__WEBPACK_IMPORTED_MODULE_1__.ElementClass('list-item'));
        // 付箋のidはworkingTimeのidを利用する
        this.workingTime = workingTime;
        this.id = workingTime.getWorkingTimeId();
        this.index = index;
        this.set(workingTime);
    }
    /**
     * 付箋が選択状態か
     * @returns
     */
    WorkingTimeSticky.prototype.isSelected = function () {
        return this.selected;
    };
    /**
     * 選択状態を切り替える
     * @returns 切替後の選択状態
     */
    WorkingTimeSticky.prototype.switchSelect = function () {
        var elemTitle = this.dom.querySelector(WorkingTimeSticky.SELECTOR_TITLE());
        var elemEditArea = this.dom.querySelector(WorkingTimeSticky.SELECTOR_BODY());
        if (this.selected) {
            elemTitle.classList.add('text-truncate');
            elemEditArea.classList.add(WorkingTimeSticky.CLASSNAME_HIDE());
        }
        else {
            elemTitle.classList.remove('text-truncate');
            elemEditArea.classList.remove(WorkingTimeSticky.CLASSNAME_HIDE());
        }
        this.selected = !this.selected;
        return this.selected;
    };
    /**
     * 初期化
     * @param workingTime
     */
    WorkingTimeSticky.prototype.set = function (workingTime) {
        var _this = this;
        this.workingTime = workingTime;
        this.id = workingTime.getWorkingTimeId();
        // WorkingTimeクラスの情報をDOM要素へ反映
        // 初期表示設定
        var titleDom = this.dom.querySelector(WorkingTimeSticky.SELECTOR_TITLE()); //Nullチェック
        titleDom.innerHTML = workingTime.getTaskName();
        var spendTimeDom = this.dom.querySelector(WorkingTimeSticky.SELECTOR_SPEND_TIME()); //Nullチェック
        spendTimeDom.innerHTML = String(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.secondsToclock(workingTime.getElapsedTime()));
        var elapsedTimeDom = this.dom.querySelector(WorkingTimeSticky.SELECTOR_ELAPSEDTIME()) //Nullチェック
        , elapsedTimeValue = workingTime.getElapsedTime();
        elapsedTimeDom.setAttribute('value', String(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.secondsToMinute(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.milisecondsToSeconds(elapsedTimeValue))));
        // elapsedTimeが変更された時のイベント登録
        elapsedTimeDom.addEventListener('change', function () {
            spendTimeDom.innerHTML = String(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.secondsToclock(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.minuteToMiliSeconds(Number(elapsedTimeDom.value))));
            _this.workingTime.setElapsedTime(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.minuteToMiliSeconds(Number(elapsedTimeDom.value)));
            _this.eventAfterChange();
        });
        // addボタンがクリックされたときのイベント登録
        var addDoms = this.dom.querySelectorAll(WorkingTimeSticky.SELECTOR_ADD()); //Nullチェック
        addDoms.forEach(function (addDom) {
            addDom.addEventListener('click', function () {
                var dataMinutes = addDom.dataset.minitue;
                var elappsedTime = Number(elapsedTimeDom.value) + Number(dataMinutes);
                elapsedTimeDom.value = String(elappsedTime);
                _this.workingTime.setElapsedTime(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.minuteToMiliSeconds(elappsedTime));
                spendTimeDom.innerHTML = String(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.secondsToclock(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.minuteToMiliSeconds(elappsedTime)));
                _this.eventAfterChange();
            });
        });
        // subボタンがクリックされたときのイベント登録
        var subDoms = this.dom.querySelectorAll(WorkingTimeSticky.SELECTOR_SUB()); //Nullチェック
        subDoms.forEach(function (subDom) {
            subDom.addEventListener('click', function () {
                var dataMinutes = subDom.dataset.minitue;
                var elappsedTime = Number(elapsedTimeDom.value) - Number(dataMinutes) < 0 ? 0 : Number(elapsedTimeDom.value) - Number(dataMinutes);
                elapsedTimeDom.value = String(elappsedTime);
                _this.workingTime.setElapsedTime(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.minuteToMiliSeconds(elappsedTime));
                spendTimeDom.innerHTML = String(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.secondsToclock(_common_time__WEBPACK_IMPORTED_MODULE_3__.Time.minuteToMiliSeconds(elappsedTime)));
                _this.eventAfterChange();
            });
        });
        var headerDom = this.dom.querySelector(WorkingTimeSticky.SELECTOR_HEADER()); //Nullチェック
        headerDom.addEventListener('click', function () {
            _this.switchSelect();
        });
    };
    /**
     * DOM要素を初期化する
     */
    WorkingTimeSticky.prototype.clear = function () {
        this.dom.remove();
        this.workingTime = undefined;
        this.id = '';
        this.index = 0;
    };
    /**
     * 値が変更されたときの振る舞いをセット
     */
    WorkingTimeSticky.prototype.addEventListenerAfterChange = function (func) {
        this.eventAfterChange = func;
    };
    /**
     * 閉じるボタンを押下したときの振る舞い
     * @param clickAfterFunc
     */
    WorkingTimeSticky.prototype.addListenerCloseButtonClickAfter = function (clickAfterFunc) {
        var _this = this;
        var elemCloseButton = this.dom.querySelector(WorkingTimeSticky.SELECTOR_DELETE_BUTTON());
        elemCloseButton.addEventListener('click', function () {
            clickAfterFunc(_this.index);
            _this.clear();
        });
    };
    WorkingTimeSticky.prototype.getWorkingTime = function () {
        return this.workingTime;
    };
    WorkingTimeSticky.prototype.getDom = function () {
        return this.dom;
    };
    WorkingTimeSticky.prototype.getId = function () {
        return this.id;
    };
    WorkingTimeSticky.prototype.setIndex = function (index) {
        this.index = index;
    };
    WorkingTimeSticky.prototype.getIndex = function () {
        return this.index;
    };
    WorkingTimeSticky.SELECTOR_HEADER = function () {
        return ".workingTime-header";
    };
    WorkingTimeSticky.SELECTOR_TITLE = function () {
        return ".workingTime-title";
    };
    WorkingTimeSticky.SELECTOR_SPEND_TIME = function () {
        return ".workingTime-spendTime";
    };
    WorkingTimeSticky.SELECTOR_BODY = function () {
        return ".workingTime-body";
    };
    WorkingTimeSticky.SELECTOR_ADD = function () {
        return ".workingTime-add";
    };
    WorkingTimeSticky.SELECTOR_SUB = function () {
        return ".workingTime-sub";
    };
    WorkingTimeSticky.SELECTOR_ELAPSEDTIME = function () {
        return ".workingTime-elapsedTime";
    };
    WorkingTimeSticky.SELECTOR_DELETE_BUTTON = function () {
        return ".workingTime-deleteButton";
    };
    WorkingTimeSticky.CLASSNAME_HIDE = function () {
        return "hide";
    };
    WorkingTimeSticky.CLASSNAME_READONLY = function () {
        return "readonly";
    };
    return WorkingTimeSticky;
}());



/***/ }),

/***/ "./src/domain/workingTimeStickyList.ts":
/*!*********************************************!*\
  !*** ./src/domain/workingTimeStickyList.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkingTimeStickyList": () => (/* binding */ WorkingTimeStickyList)
/* harmony export */ });
/* harmony import */ var _workingTimeSticky__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./workingTimeSticky */ "./src/domain/workingTimeSticky.ts");
/* harmony import */ var _workingTimeList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workingTimeList */ "./src/domain/workingTimeList.ts");
/* harmony import */ var _function_nullCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../function/nullCheck */ "./src/function/nullCheck.ts");



var WorkingTimeStickyList = /** @class */ (function () {
    function WorkingTimeStickyList(domId) {
        this.eventAfterChange = function () { };
        this.dom = document.getElementById(domId.getString());
        this.workingTimeStickies = [];
    }
    /**
     * 作業実績リストからDOM要素を追加
     * @param {WorkingTimeList} WorkingTimeList
     */
    WorkingTimeStickyList.prototype.set = function (workingTimeList) {
        var _this = this;
        this.workingTimeStickies = [];
        this.dom.innerHTML = ''; // FIXME: innerHTMLで子要素を削除するのは非推奨。whileで回すかjquery.remove()を使う
        workingTimeList.getAll().forEach(function (workingTime) {
            _this.add(workingTime);
        });
    };
    /**
     *
     * @param workingTime
     */
    WorkingTimeStickyList.prototype.add = function (workingTime, isPrepend) {
        var _this = this;
        if (isPrepend === void 0) { isPrepend = false; }
        var index = this.workingTimeStickies.length;
        // 各付箋の要素を生成
        var workingTimeSticky = new _workingTimeSticky__WEBPACK_IMPORTED_MODULE_0__.WorkingTimeSticky(workingTime, index);
        this.workingTimeStickies.push(workingTimeSticky);
        if (isPrepend) {
            this.dom.prepend(workingTimeSticky.getDom());
        }
        else {
            this.dom.append(workingTimeSticky.getDom());
        }
        // クローズボタンクリック時のイベントハンドラを設定
        var selfId = workingTimeSticky.getId();
        workingTimeSticky.addListenerCloseButtonClickAfter(function () {
            _this.delete(selfId);
            _this.eventAfterChange();
        });
        workingTimeSticky.addEventListenerAfterChange(function () {
            _this.eventAfterChange();
        });
        return index;
    };
    /**
     * Deleteボタンクリック時のイベントハンドラを設定する
     * @param action(WorkingTimeList)  除外済みのWorkingTimeListを引数としたFunction
     */
    WorkingTimeStickyList.prototype.addListenerChangeAfter = function (action) {
        this.eventAfterChange = action;
    };
    /**
     * WorkingTimeSticky（実績の付箋）IDからindexを取得する
     * @param id
     * @returns IDに合致するindex。それ以外の場合は -1 を返します。
     */
    WorkingTimeStickyList.prototype.getIndex = function (id) {
        return this.workingTimeStickies.findIndex(function (workingTimeSticky) { return id == workingTimeSticky.getId(); });
    };
    /**
     * 実績の付箋を削除する
     * @param index インデックス番号
     * @returns
     */
    WorkingTimeStickyList.prototype.delete = function (id) {
        var index = this.getIndex(id);
        if (index == -1) {
            throw ("WorkingTimeStickyDelete:Invalid Index Error");
        }
        else {
            // 該当する付箋を取り除く
            var deleteWorkingTimeStickiy = this.workingTimeStickies.splice(index, 1)[0];
            if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(deleteWorkingTimeStickiy)) {
                throw ("WorkingTimeStickyDelete:Invalid Index Error");
            }
            else {
                this.updateAllIndex();
            }
        }
    };
    /**
     * 全てのWorkingTimeStickyのインデックスを採番し直す。イベントリスナーなどで使うインデックスの整合性を取る
     */
    WorkingTimeStickyList.prototype.updateAllIndex = function () {
        this.workingTimeStickies.forEach(function (workingTimeSticky, index) {
            workingTimeSticky.setIndex(index);
        });
    };
    /**
     * WorkingTimeListを取得する。
     */
    WorkingTimeStickyList.prototype.getWorkingTimeList = function () {
        var workingTimeList = new _workingTimeList__WEBPACK_IMPORTED_MODULE_1__.WorkingTimeList();
        this.workingTimeStickies.forEach(function (workingTimeStickiey) {
            if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_2__.isDefined)(workingTimeStickiey.getWorkingTime())) {
                workingTimeList.add(workingTimeStickiey.getWorkingTime());
            }
        });
        return workingTimeList;
    };
    return WorkingTimeStickyList;
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
/*!***************************!*\
  !*** ./src/apps/popup.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domain_html_totalElapsedTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/html/totalElapsedTime */ "./src/domain/html/totalElapsedTime.ts");
/* harmony import */ var _domain_html_spendButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/html/spendButton */ "./src/domain/html/spendButton.ts");
/* harmony import */ var _domain_element_elementId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/element/elementId */ "./src/domain/element/elementId.ts");
/* harmony import */ var _domain_element_elementClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domain/element/elementClass */ "./src/domain/element/elementClass.ts");
/* harmony import */ var _domain_gitlab_gitLabProjcetAccessTokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../domain/gitlab/gitLabProjcetAccessTokens */ "./src/domain/gitlab/gitLabProjcetAccessTokens.ts");
/* harmony import */ var _domain_gitlab_gitLabApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../domain/gitlab/gitLabApi */ "./src/domain/gitlab/gitLabApi.ts");
/* harmony import */ var _domain_gitlab_gitLabUser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../domain/gitlab/gitLabUser */ "./src/domain/gitlab/gitLabUser.ts");
/* harmony import */ var _domain_gitlab_gitLabIssue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../domain/gitlab/gitLabIssue */ "./src/domain/gitlab/gitLabIssue.ts");
/* harmony import */ var _domain_issueList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../domain/issueList */ "./src/domain/issueList.ts");
/* harmony import */ var _domain_issueParam__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../domain/issueParam */ "./src/domain/issueParam.ts");
/* harmony import */ var _domain_localStorageWindow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../domain/localStorageWindow */ "./src/domain/localStorageWindow.ts");
/* harmony import */ var _domain_workingTime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../domain/workingTime */ "./src/domain/workingTime.ts");
/* harmony import */ var _domain_workingTimeList__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../domain/workingTimeList */ "./src/domain/workingTimeList.ts");
/* harmony import */ var _domain_stickyNoteList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../domain/stickyNoteList */ "./src/domain/stickyNoteList.ts");
/* harmony import */ var _function_nullCheck__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../function/nullCheck */ "./src/function/nullCheck.ts");
/* harmony import */ var _domain_workingTimeStickyList__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../domain/workingTimeStickyList */ "./src/domain/workingTimeStickyList.ts");
/* harmony import */ var _domain_issueDto__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../domain/issueDto */ "./src/domain/issueDto.ts");
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







// プライベートトークン
var PRIVATE_TOKEN;
var GITLAB_DOMAIN;
var PROJECT_ID;
// ローカル保存用のKey
var KEY_SELECT_ISSUE_ID = 'select_issue_id', KEY_START_DATE = 'start_date', KEY_WORKINGTIMES = 'workingtimes', KEY_ISSUE_LIST = 'issue_list', KEY_PRIVATE_TOKEN = 'private_token', KEY_GITLAB_DOMAIN = 'gitlab_domain', KEY_GITLAB_PROJECT_ID = 'gitlab_project_id', KEY_IS_OUTPUT_JSON_WHEN_SPENT = 'is_output_json_when_spent';
/**------------------------------------- NICE TO HAVE ----------------------------------- //
 *
 * Vue.jsにしたいよね
 * 閉じて開いたら選択している付箋はelapsedとtoday更新されていてほしい
 * 付箋並び替えたい（人順とか）
 * プロフ写真ローカルに保存したい。取得できなくなってたら取り直すとかもしたい
 * ディレクトリ構造を考えて配置したい
 * ローカルストレージの付箋情報は最新化しておきたい
 * getIssueAjaxをprefetchしたい（=callbackではなくPromiseで制御すれば実現できる）
 * json実績のバックアップを取りたい
 *
 */
// --------------------------------------- 状態一覧 --------------------------------------- //
var loginUser;
var selectIssueId;
var startDate;
// 仕事をした実績たち
var workingTimeList;
// 内部的に持ってるイシューリスト
var issueList;
// spent時にJSON出力するか
var isOutputJsonWhenSpent = true;
// ------------------------------------ 画面項目一覧 ------------------------------------ //
// Spendボタン
var spendButton;
// 合計消費時間を示すdiv要素
var totalElapsedTime;
// 付箋一覧
var stickyNoteList;
// 実績一覧
var workingTimeStickyList;
// ------------------------------- 外部接続用クライアント ----------------------------------//
var localStorageClient;
var gitLabApiClient;
// ------------------------------------- 処理内容 ---------------------------------------- //
localStorageClient = new _domain_localStorageWindow__WEBPACK_IMPORTED_MODULE_10__.LocalStorageWindow(); //LocalStorageChrome()
var logined = loginCheck();
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function () {
        var fetch_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logined];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    fetch_1 = preFetchAjax();
                    return [4 /*yield*/, initialize()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fetch_1
                        // gitlabに新しい付箋をfetchして追加
                    ];
                case 3:
                    _a.sent();
                    // gitlabに新しい付箋をfetchして追加
                    gitLabApiClient.getAjaxIssue(function (rslt) {
                        var tempIssues = [];
                        rslt.forEach(function (issue) {
                            tempIssues.push(new _domain_gitlab_gitLabIssue__WEBPACK_IMPORTED_MODULE_7__.GitLabIssue(issue));
                        });
                        var tempIssueList = new _domain_issueList__WEBPACK_IMPORTED_MODULE_8__.IssueList();
                        tempIssueList.set(tempIssues);
                        var filterParam = new _domain_issueParam__WEBPACK_IMPORTED_MODULE_9__.IssueParam();
                        if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_14__.isDefined)(loginUser) && (0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_14__.isDefined)(loginUser.getId())) {
                            filterParam.setUserId(loginUser.getId());
                        }
                        filterParam.setActive(true);
                        filterParam.setLabel('Doing');
                        var issueIds = issueList.getAllIds();
                        tempIssueList.filter(filterParam).getIssueList().forEach(function (issue) {
                            // ローカルストレージにある付箋の場合
                            if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_14__.isDefined)(issueIds.find(function (id) { return id == issue.id; }))) {
                                // FIXME: 付箋情報の更新
                            }
                            else {
                                // ローカルストレージにない、新しい付箋の場合
                                issueList.add(issue);
                                stickyNoteList.add(issue, true);
                            }
                        });
                        localStorageClient.setObject(KEY_ISSUE_LIST, issueList.getIssueList());
                    }, 100, 1);
                    return [3 /*break*/, 5];
                case 4:
                    window.location.href = './setting.html';
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
});
// ------------------------------------- 以下ファンクション ---------------------------------------- //
/**
 * ログインチェックを行う
 */
function loginCheck() {
    return __awaiter(this, void 0, void 0, function () {
        var privateToken, gitLabDomain, gitLabProjectId, isLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, localStorageClient.getObject(KEY_PRIVATE_TOKEN)];
                case 1:
                    privateToken = _a.sent();
                    return [4 /*yield*/, localStorageClient.getObject(KEY_GITLAB_DOMAIN)];
                case 2:
                    gitLabDomain = _a.sent();
                    return [4 /*yield*/, localStorageClient.getObject(KEY_GITLAB_PROJECT_ID)];
                case 3:
                    gitLabProjectId = _a.sent();
                    isLogin = (0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_14__.isDefined)(privateToken) && (0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_14__.isDefined)(gitLabDomain) && (0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_14__.isDefined)(gitLabProjectId);
                    return [4 /*yield*/, localStorageClient.getObject(KEY_IS_OUTPUT_JSON_WHEN_SPENT)];
                case 4:
                    // 設定フラグ
                    isOutputJsonWhenSpent = (_a.sent()) == true;
                    if (isLogin) {
                        PRIVATE_TOKEN = privateToken;
                        GITLAB_DOMAIN = gitLabDomain;
                        PROJECT_ID = gitLabProjectId;
                        gitLabApiClient = new _domain_gitlab_gitLabApi__WEBPACK_IMPORTED_MODULE_5__.GitLabApi(new _domain_gitlab_gitLabProjcetAccessTokens__WEBPACK_IMPORTED_MODULE_4__.GitLabProjectAccessTokens(PRIVATE_TOKEN, GITLAB_DOMAIN, PROJECT_ID));
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Ajaxでデータを取得する処理
 * 待機時間取得軽減の為、Ajaxは先に飛ばす
 */
function preFetchAjax() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // ログインユーザーを取得
                return [4 /*yield*/, gitLabApiClient.getLoginUser(function (rslt) {
                        // 画面アイコンに適用
                        loginUser = new _domain_gitlab_gitLabUser__WEBPACK_IMPORTED_MODULE_6__.GitLabUser(rslt);
                        var avatarElement = document.querySelector('.profile-avatar'); // Nullチェック
                        avatarElement.setAttribute('src', loginUser.getImgPath());
                    })];
                case 1:
                    // ログインユーザーを取得
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 初期表示
 */
function initialize() {
    return __awaiter(this, void 0, void 0, function () {
        var savedIssueList, gitLabIssue_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 画面操作用にオブジェクト生成
                    spendButton = new _domain_html_spendButton__WEBPACK_IMPORTED_MODULE_1__.SpendButton(new _domain_element_elementId__WEBPACK_IMPORTED_MODULE_2__.ElementId('spend-button'));
                    totalElapsedTime = new _domain_html_totalElapsedTime__WEBPACK_IMPORTED_MODULE_0__.TotalElapsedTime(new _domain_element_elementClass__WEBPACK_IMPORTED_MODULE_3__.ElementClass('total-elapsedTime'));
                    stickyNoteList = new _domain_stickyNoteList__WEBPACK_IMPORTED_MODULE_13__.StickyNoteList(new _domain_element_elementId__WEBPACK_IMPORTED_MODULE_2__.ElementId('issue-list'));
                    workingTimeList = new _domain_workingTimeList__WEBPACK_IMPORTED_MODULE_12__.WorkingTimeList();
                    workingTimeStickyList = new _domain_workingTimeStickyList__WEBPACK_IMPORTED_MODULE_15__.WorkingTimeStickyList(new _domain_element_elementId__WEBPACK_IMPORTED_MODULE_2__.ElementId('workingTime-sticky-list'));
                    issueList = new _domain_issueList__WEBPACK_IMPORTED_MODULE_8__.IssueList();
                    return [4 /*yield*/, localStorageClient.getObject(KEY_ISSUE_LIST)];
                case 1:
                    savedIssueList = _a.sent();
                    if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_14__.isDefined)(savedIssueList) && savedIssueList.length > 0) {
                        gitLabIssue_1 = [];
                        savedIssueList.forEach(function (iissue) {
                            gitLabIssue_1.push(new _domain_issueDto__WEBPACK_IMPORTED_MODULE_16__.IssueDto(iissue));
                        });
                        issueList.set(gitLabIssue_1);
                        stickyNoteList.set(issueList);
                    }
                    setEventListener();
                    revertToBeforeState();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 以前の操作履歴を復元
 */
function revertToBeforeState() {
    return __awaiter(this, void 0, void 0, function () {
        var workingTimes, selectIssueIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, localStorageClient.getObject(KEY_SELECT_ISSUE_ID)];
                case 1:
                    selectIssueId = _a.sent();
                    return [4 /*yield*/, localStorageClient.getObject(KEY_START_DATE)];
                case 2:
                    startDate = _a.sent();
                    return [4 /*yield*/, localStorageClient.getObject(KEY_WORKINGTIMES)];
                case 3:
                    workingTimes = _a.sent();
                    if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_14__.isDefined)(workingTimes) && workingTimes.length > 0) {
                        workingTimes.forEach(function (workingTimeObj) {
                            // 内部的な実績に反映
                            var workingTime = new _domain_workingTime__WEBPACK_IMPORTED_MODULE_11__.WorkingTime(workingTimeObj.startDate, workingTimeObj.elapsedTime, workingTimeObj.taskId, workingTimeObj.taskName);
                            workingTimeList.add(workingTime);
                        });
                        // 見た目に反映
                        stickyNoteList.update(workingTimeList.getListGroupById());
                        totalElapsedTime.set(workingTimeList.getElapsedTime());
                        workingTimeStickyList.set(workingTimeList);
                    }
                    selectIssueIndex = stickyNoteList.getIndexById(selectIssueId);
                    // 選択してるイシューがリストにあれば
                    if (selectIssueIndex != -1) {
                        // 選択する
                        if (startDate) {
                            stickyNoteList.selectByIndex(selectIssueIndex, startDate);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * イベントリスナーの設定
 */
function setEventListener() {
    // Spendボタン押下時のイベントハンドラを設定
    spendButton.addListenerClickAfter(function () {
        // スペントする？
        var spentOk = confirm('実績がクリアされます。\r\nGitLabに実績を送信してよろしいですか？\r\n Are you want to spend on GitLab?');
        if (spentOk) {
            workingTimeList.getAll().forEach(function (workingTime) {
                gitLabApiClient.postAjaxSpentIssue(function () { }, workingTime.getTaskId(), workingTime.getTime());
            });
            stickyNoteList.clearAll();
            workingTimeList.clear();
            totalElapsedTime.set(0);
            localStorageClient.setObject(KEY_WORKINGTIMES, {});
            localStorageClient.setObject(KEY_ISSUE_LIST, {});
        }
    });
    // 付箋選択時のイベントハンドラを設定
    stickyNoteList.addListenerClickAfter(function (stickyNote) {
        var endDate = Date.now();
        // 選択された付箋が選択状態であれば
        if (stickyNote.isAvailable()) {
            // 前に選択されていたタスクの実績を記録する
            if ((0,_function_nullCheck__WEBPACK_IMPORTED_MODULE_14__.isDefined)(selectIssueId)) {
                var beforeStickyNote = stickyNoteList.getById(selectIssueId);
                var workingTime = new _domain_workingTime__WEBPACK_IMPORTED_MODULE_11__.WorkingTime(beforeStickyNote.getStartDate(), endDate - beforeStickyNote.getStartDate(), beforeStickyNote.getId(), beforeStickyNote.getName());
                workingTimeList.add(workingTime);
            }
            // 選択された付箋IDを状態変数に保持
            selectIssueId = stickyNote.getId();
            startDate = Date.now();
            // 初期表示用にローカルストレージにも保存
            localStorageClient.setObject(KEY_SELECT_ISSUE_ID, selectIssueId);
            localStorageClient.setObject(KEY_START_DATE, startDate);
        }
        else {
            // 選択を外されたタスクの実績を記録する
            var workingTime = new _domain_workingTime__WEBPACK_IMPORTED_MODULE_11__.WorkingTime(stickyNote.getStartDate(), endDate - stickyNote.getStartDate(), stickyNote.getId(), stickyNote.getName());
            workingTimeList.add(workingTime);
            // 状態変数を初期化
            selectIssueId = undefined;
            startDate = undefined;
            // ローカルストレージも初期化
            localStorageClient.deleteObject(KEY_SELECT_ISSUE_ID);
            localStorageClient.deleteObject(KEY_START_DATE);
        }
        workingTimeStickyList.set(workingTimeList);
        totalElapsedTime.set(workingTimeList.getElapsedTime());
        var saveWorkingTimes = workingTimeList.getAll();
        localStorageClient.setObject(KEY_WORKINGTIMES, saveWorkingTimes);
    });
    // 付箋リスト変更時のイベントハンドラを設定
    workingTimeStickyList.addListenerChangeAfter(function () {
        workingTimeList = workingTimeStickyList.getWorkingTimeList();
        totalElapsedTime.set(workingTimeList.getElapsedTime());
        localStorageClient.setObject(KEY_WORKINGTIMES, workingTimeList.getAll());
    });
    // Export JSON
    document.querySelector('.export-json').addEventListener('click', function () {
        var jsonText = JSON.stringify(workingTimeList.getAll());
        navigator.clipboard.writeText(jsonText).then(function () { return alert('クリップボードにコピーしました。'); }).catch(function (e) { return alert('コピー時にエラー！ ' + e.message); });
    });
}

})();

/******/ })()
;
//# sourceMappingURL=popup.ts.bundle.js.map