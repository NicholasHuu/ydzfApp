/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(2);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	module.exports = __webpack_require__(34);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @describe:应用自定义服务
	 * @author：yangyong
	 */
	_app2.default.service("appService", ["$ionicLoading", "$rootScope", "$ionicPopup", function ($ionicLoading, $rootScope, $ionicPopup) {
	    var _this = this;

	    var errorMessage = void 0; //错误消息提示文本
	    var jd = '0';
	    var wd = '0';
	    /**
	     * @describe:请求数据封装
	     * @param wmfObj:wmf对象
	     * @param paramsObj:请求参数
	     * @returns {string}：封装后的数据
	     */
	    this.public_queryParams = function (wmfObj, paramsObj) {
	        var params = "{\n                        params:" + JSON.stringify(paramsObj) + ",\n                        date:" + new Date().getTime() + ",\n                        emp_id:" + wmfObj.UserID + ",\n                        emp_name:" + wmfObj.UserName + ",\n                        mobile_version:" + wmfObj.SystemVersion + ",\n                        app_code:" + wmfObj.AppCode + ",\n                        dev_id:" + wmfObj.DeviceCode + ",\n                        user_model:'{\"user_id\":\"23316\",\"staffer_id\":\"B50DEFF7336D62FDE04400306EF58742\",\"user_name\":\"17177\",\"real_name\":\"\u6BDB\u6C88\u5BC5\",\"department_id\":\"14\",\"department_name\":\"\u5F90\u6C47\u533A\u5C40\",\"password\":\"52c69e3a57331081823331c4e69d3f2e\",\"division\":\"1\",\"dept_sub_id\":\"\",\"dept_sub_name\":\"\",\"me01_id\":\"4e764d01157f4d90b6ead77fdc13dc81\"}'\n                    }";
	        //${JSON.stringify($rootScope.user_model)}
	        return params;
	    };
	    /**
	     * @describe 数据请求
	     * @param wmf 桥对象
	     * @param params 请求参数
	     * @param adapterName apapter名称
	     * @param funName 请求方法名称
	     * @param callBack 回调函数
	     */
	    this.requireForWMF = function (wmf, params, adapterName, funName, callBack) {
	        //请求数据封装
	        var paramsVal = _this.public_queryParams(wmf, params);
	        var requireData = null;
	        //遮罩
	        $ionicLoading.show({
	            template: "<i class=\"icon ion-loading-c\"></i>&nbsp;<span>\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u5019</span>"
	        });
	        //数据请求
	        var p = new Promise(function (resolve, reject) {
	            try {
	                wmf.getResponseDataByWklAdapter(adapterName, funName, [paramsVal], function (result) {
	                    var returnObj = eval("(" + result + ")");
	                    if (returnObj.resp.code = "200") {
	                        requireData = returnObj;
	                        callBack(returnObj);
	                        resolve();
	                    } else {
	                        errorMessage = '数据返回有误';
	                        reject();
	                    }
	                });
	            } catch (e) {
	                errorMessage = '请求异常';
	                reject();
	            }
	        });
	        return p.then(function () {
	            $ionicLoading.hide();
	            return requireData;
	        }).catch(function () {
	            $ionicLoading.hide();
	            _this.errorPopup(errorMessage);
	        });
	    };

	    /**
	     * @description: 错误提示框
	     * @param errorMessage :错误消息
	     */
	    this.errorPopup = function (errorMessage, headTitle, callBack) {
	        $ionicPopup.alert({
	            title: "<div class=\"errorAlertHead\">" + (headTitle ? headTitle : "错误提示") + "</div>",
	            template: "<i class=\"icon ion-alert-circled errorAlert\"></i>\n                            <div class=\"errorAlertCont\">" + errorMessage + "!</div>"
	        }).then(function () {
	            callBack ? callBack() : '';
	        });
	    };

	    /**
	     * @description: 成功提示框
	     * @param errorMessage :成功消息
	     */
	    this.successPopup = function (errorMessage, headTitle) {
	        $ionicPopup.alert({
	            title: "<div class=\"errorAlertHead\">" + (headTitle ? headTitle : "温馨提示") + "</div>",
	            template: "<i class=\"icon ion-checkmark-circled errorAlert\" style=\"color:green\"></i>\n                            <div class=\"errorAlertCont\" style=\"color:green\">" + errorMessage + "!</div>"
	        });
	    };

	    /**
	     * @description: 询问弹出框
	     * @param confirmTitle:询问标题
	     * @param confirmTrue:确认返回函数
	     * @param confirmFalse:取消返回函数
	     */
	    this.confirmPopup = function (confirmTitle, confirmTrue, confirmFalse) {
	        $ionicPopup.confirm({
	            template: "<i class=\"icon ion-alert-circled errorAlert\"></i>\n                        <div class=\"errorAlertCont\">" + confirmTitle + "</div>",
	            cssClass: 'sign-popup',
	            cancelText: '取消',
	            cancelType: 'button-assertive',
	            okText: '确定',
	            okType: 'button-positive'
	        }).then(function (res) {
	            if (res) {
	                confirmTrue();
	            } else {
	                confirmFalse();
	            }
	        });
	    };

	    /**
	     * @description: 成功提示框
	     * @param errorMessage :成功消息
	         */
	    /*this.confirmPopup = (errorMessage, headTitle) => {
	        return $ionicPopup.confirm({
	            title: `<div class="errorAlertHead">${headTitle? headTitle:"温馨提示"}</div>`,
	            template: `<i class="icon ion-checkmark-circled errorAlert" style="color:green"></i>
	                            <div class="errorAlertCont" style="color:green">${errorMessage}!</div>`
	        });
	    }*/

	    //初始化桥对象wmf
	    this.wmfPromise = new Promise(function (resolve, reject) {
	        if (wmf.ready != undefined) {
	            console.log("全局wmf对象初始化完毕");
	            wmf.ready(function () {
	                //获取usermodel
	                wmf.callNativeDelegateFunc(JSON.stringify({
	                    "cmd": "cmd_getusermodel",
	                    "params": {
	                        "data": "测试！！！"
	                    }
	                }), function (backData) {
	                    console.log("cmd_getusermodel原生调用成功");
	                    var userModelData = JSON.parse(backData).params;
	                    $rootScope.user_model = userModelData.user_model;
	                });
	                //获取经纬度
	                wmf.callNativeDelegateFunc(JSON.stringify({
	                    "cmd": "cmd_location",
	                    "params": {
	                        "data": "测试！！！"
	                    }
	                }), function (backData) {
	                    console.log("定位原生调用成功");
	                    jd = JSON.parse(backData).params.longitude;
	                    wd = JSON.parse(backData).params.latitude;
	                });
	                resolve();
	            });
	        } else {
	            console.log("已经包含wmf，直接使用");
	            resolve();
	        }
	    });

	    /**
	     * @description；获取全局me11Id，供路由预加载使用
	     * @returns {*}me11Id
	     */
	    this.getMellId = function () {
	        return $rootScope.me11Id;
	    };

	    /**
	     * @description: 返回经纬度
	     * @returns {{jd: string, wd: string}}
	     */
	    this.getjwd = function () {
	        return { jd: jd, wd: wd };
	    };

	    /**
	     * @describe 多方法数据请求
	     * @param wmf 桥对象
	     * @param paramsAry 请求参数数组
	     * @param adapterNameAry apapter名称数组
	     * @param funNameAry 请求方法名称数组
	     * @param callBack 回调函数
	     */
	    this.requireForWmfMore = function (wmf, paramsAry, adapterNameAry, funNameAry, callBackAry) {
	        //遮罩
	        $ionicLoading.show({
	            template: "<i class=\"icon ion-loading-c\"></i>&nbsp;<span>\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u5019</span>"
	        });
	        //数据请求
	        var p = new Promise(function (resolve, reject) {
	            var promiseAry = [];
	            paramsAry.forEach(function (item, index) {
	                //请求数据封装
	                var paramsVal = _this.public_queryParams(wmf, item);
	                promiseAry.push(_this.wmfRequire(item, adapterNameAry[index], funNameAry[index], callBackAry[index]));
	                Promise.all(promiseAry).then(function () {
	                    resolve();
	                }).catch(function (rejectPromise) {
	                    console.log(rejectPromise, "失败的请求方法");
	                    reject();
	                });
	            });
	        });
	        return p.then(function () {
	            $ionicLoading.hide();
	        });
	    };

	    /**
	     * @description: 多方法数据请求，单个请求函数
	     * @param params 请求参数
	     * @param adapterName  adapterName名称
	     * @param funName 请求方法
	     * @param requireAry 请求数组
	     * @param callBack 回调函数
	     * @param dataObj 数据返回对象
	     */
	    this.wmfRequire = function (params, adapterName, funName, callBack) {
	        var paramsVal = _this.public_queryParams(wmf, params);
	        return new Promise(function (resolve, reject) {
	            wmf.getResponseDataByWklAdapter(adapterName, funName, [paramsVal], function (result) {
	                var returnObj = eval("(" + result + ")");
	                if (returnObj.resp.code == "200") {
	                    callBack(returnObj);
	                    resolve();
	                } else {
	                    console.log("返回数据有误");
	                    reject();
	                }
	            });
	        });
	    };

	    /**
	     * @description: 日期格式化
	     * @param fmt 日期格式
	     * @param date 时间
	     * @param flag 秒是否置0
	     * @returns {*} 返回格式化后的日期
	     */
	    this.dateFtt = function (fmt, date, flag) {
	        var o = {
	            "M+": date.getMonth() + 1, //月份
	            "d+": date.getDate(), //日
	            "h+": date.getHours(), //小时
	            "m+": date.getMinutes(), //分
	            "s+": flag ? date.getSeconds() : 0, //秒
	            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	            "S": date.getMilliseconds() //毫秒
	        };
	        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	        for (var k in o) {
	            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	        }return fmt;
	    };

	    /**
	     * @description: 初始化条件数组，决定是否打开遮罩
	     * @param zlzgAry 责令整改条件数组
	     * @param xxdjbcAry 文书生成条件数组
	     * @param callBack 回调
	     */
	    this.initConditionAry = function (zlzgAry, xxdjbcAry, callBack) {
	        var conditionSpan = jQuery("ul").find("span");
	        conditionSpan.map(function (index, val, ary) {
	            if (jQuery(val).hasClass('chooseSpan')) {
	                if (Object.is(jQuery(val).html(), "要求经营户整改")) {
	                    zlzgAry.push(val);
	                } else if (Object.is(jQuery(val).html(), "先行登记保存")) {
	                    xxdjbcAry.push(val);
	                }
	            }
	        });
	        callBack ? callBack() : '';
	    };

	    /**
	     * @description: 调用原生方法
	     * @param params:请求参数
	     * @param callBack:回调函数
	     */
	    this.callNative = function (params, callBack) {
	        //遮罩
	        $ionicLoading.show({
	            template: "<i class=\"icon ion-loading-c\"></i>&nbsp;<span>\u626B\u7801\u5904\u7406\u4E2D,\u8BF7\u7A0D\u5019</span>"
	        });
	        var paramsVal = JSON.stringify(params);
	        wmf.callNativeDelegateFunc(paramsVal, function (backData) {
	            $ionicLoading.hide();
	            console.log("原生调用成功");
	            if (JSON.parse(backData).params.data == "") {
	                this.errorPopup("扫码失败,请重试", "温馨提示");
	            } else {
	                callBack(backData);
	            }
	        });
	        $ionicLoading.hide();
	    };

	    /**
	     * @description: 初始化遮罩是否放开
	     * @param obj : 条件选择对象
	     */
	    this.initNavigteMark = function (obj) {
	        var markObj = {};
	        if (obj.ME_RESLUT07_HANDLE == '3' || obj.ME_RESLUT08_HANDLE == '3' || obj.ME_RESLUT09_HANDLE == '3' || obj.ME_RESLUT10_HANDLE == '3') {
	            //如果卷烟经营情况两个条件都选择了，则三个遮罩全部放开
	            markObj.both = true;markObj.licenceZlzg = false;markObj.cigaretteZlzg = true;markObj.xxdj = true;
	        } else if (obj.ME_RESLUT01_HANDLE == '1' || obj.ME_RESLUT02_HANDLE == '1' || obj.ME_RESLUT03_HANDLE == '1') {
	            //许可证使用情况第一条件被选择，则放开责令整改遮罩
	            markObj.both = false;markObj.licenceZlzg = true;markObj.cigaretteZlzg = false;markObj.xxdj = false;
	        } else if (obj.ME_RESLUT07_HANDLE == '1' || obj.ME_RESLUT08_HANDLE == '1' || obj.ME_RESLUT09_HANDLE == '1' || obj.ME_RESLUT10_HANDLE == '1') {
	            //如果卷烟经营情况第一条件被选择，则放开责令整改遮罩
	            markObj.both = false;markObj.licenceZlzg = false;markObj.cigaretteZlzg = true;markObj.xxdj = false;
	        } else {
	            markObj.both = false;markObj.licenceZlzg = false;markObj.cigaretteZlzg = false;markObj.xxdj = false;
	        }

	        //如果卷烟经营情况第二条件被选择，则放开物品信息登记遮罩
	        if (obj.ME_RESLUT07_HANDLE == '2' || obj.ME_RESLUT08_HANDLE == '2' || obj.ME_RESLUT09_HANDLE == '2' || obj.ME_RESLUT10_HANDLE == '2') {
	            markObj.xxdj = true;
	        }
	        return markObj;
	    };

	    /**
	     * @description: 初始化对应责令整改被选中的dom元素
	     * @param zlzgAry:c
	     */
	    this.initzlzgAry = function (zlzgAry) {
	        Array.from(document.querySelectorAll("span[data-zlzx]")).map(function (val, index) {
	            jQuery(val).hasClass("chooseSpan") ? zlzgAry.push(val) : '';
	        });
	        return zlzgAry;
	    };
	    /**
	     * @description: 初始化对应物品信息登记和文书生成被选中的dom元素
	     * @param xxdjAry: 初始化对应责令整改被选中的dom元素
	     */
	    this.initxxdjAry = function (xxdjAry) {
	        Array.from(document.querySelectorAll("span[data-xxdj]")).map(function (val, index) {
	            jQuery(val).hasClass("chooseSpan") ? xxdjAry.push(val) : '';
	        });
	        return xxdjAry;
	    };

	    /**
	     * @description: 许可证经营情况和卷烟经营情况页面数据对象
	     * @type {{ME_RESLUT01: string, ME_RESLUT01_HANDLE: string, ME_RESLUT02: string, ME_RESLUT02_HANDLE: string, ME_RESLUT03: string, ME_RESLUT03_HANDLE: string, ME_RESLUT03_ACTADDRESS: string, ME_RESLUT04: string, ME_RESLUT04_HANDLE: string, ME_RESLUT04_ACTLICENCE: string, ME_RESLUT05: string, ME_RESLUT05_CARDNO: string, ME_RESLUT05_CITY: string, ME_RESLUT05_NAME: string, ME_RESLUT05_PHONE: string, ME_RESLUT05_PROVINCE: string, ME_RESLUT06: string, ME_RESLUT06_DETAIL: string, ME_RESLUT07: string, ME_RESLUT07_HANDLE: string, ME_RESLUT08: string, ME_RESLUT08_HANDLE: string, ME_RESLUT09: string, ME_RESLUT09_HANDLE: string, ME_RESLUT10: string, ME_RESLUT10_HANDLE: string, ME_RESLUT11: string, ME_RESLUT12: string, ME_RESLUT13: string, ME_RESLUT14: string, ME_RESLUT15: string, ME_RESLUT16: string, ME_RESLUT16_DETAIL: string, ME_RESLUT17: string}}
	     */
	    this.initLicenceAndCigaretteData = {
	        ME_RESLUT01: '1',
	        ME_RESLUT01_HANDLE: '4',
	        ME_RESLUT02: '0',
	        ME_RESLUT02_HANDLE: '4',
	        ME_RESLUT03: '1',
	        ME_RESLUT03_HANDLE: '4',
	        ME_RESLUT03_ACTADDRESS: '',
	        ME_RESLUT04: '1',
	        ME_RESLUT04_HANDLE: '4',
	        ME_RESLUT04_ACTLICENCE: '',
	        ME_RESLUT05: '0',
	        ME_RESLUT05_CARDNO: '',
	        ME_RESLUT05_CITY: '',
	        ME_RESLUT05_NAME: '',
	        ME_RESLUT05_PHONE: '',
	        ME_RESLUT05_PROVINCE: '',
	        ME_RESLUT06: '0',
	        ME_RESLUT06_DETAIL: '',
	        ME_RESLUT07: '0',
	        ME_RESLUT07_HANDLE: '4',
	        ME_RESLUT08: '0',
	        ME_RESLUT08_HANDLE: '4',
	        ME_RESLUT09: '0',
	        ME_RESLUT09_HANDLE: '4',
	        ME_RESLUT10: '0',
	        ME_RESLUT10_HANDLE: '4',
	        ME_RESLUT11: '0',
	        ME_RESLUT12: '0',
	        ME_RESLUT13: '0',
	        ME_RESLUT14: '0',
	        ME_RESLUT15: '0',
	        ME_RESLUT16: '0',
	        ME_RESLUT16_DETAIL: '',
	        ME_RESLUT17: '1'

	        /**
	         * @description 许可证经营情况和卷烟经营情况页面条件开关标志位转换
	         * @param obj :许可证经营情况和卷烟经营情况页面数据对象
	         */
	    };this.conditionFlagChange = function (obj, callBack) {
	        // 将条件开关标志“0”，“1”转化为true,false
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var i = _step.value;

	                //筛选出条件开关
	                if (/^ME_RESLUT\d+$/.test(i)) {
	                    callBack(i);
	                    //1,3,4,17当开关标志为“1”,转化为false,为0 转化为true
	                    if (i == 'ME_RESLUT01' || i == 'ME_RESLUT03' || i == 'ME_RESLUT04' || i == 'ME_RESLUT17') {
	                        obj[i] = Object.is(obj[i], "0") ? true : false;
	                    } else {
	                        obj[i] = Object.is(obj[i], "0") ? false : true;
	                    }
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    };

	    /**
	     * 生成许可证使用情况与卷烟经营情况页面子条件保存值
	     * @param id
	     * @returns {*}
	     */
	    this.initHandleVal = function (id) {
	        var subCondition = jQuery("#" + id).find("span.chooseSpan");
	        /**
	         *根据子条件选中情况，设置handle保存参数
	         * 如果有两个选中，则设置3,都没选中设置4,选中1个,设置1或2
	         */
	        if (subCondition.length == 2) {
	            return '3';
	        } else if (subCondition.length == 0) {
	            return '4';
	        } else if (subCondition.length == 1) {
	            //如果选中第一个，设置1，选中第二个子条件设置2
	            return subCondition.html() == '要求经营户整改' ? "1" : "2";
	        }
	        return '4';
	    };
	}]);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 定义应用模块并导出
	 */
	exports.default = angular.module('main', ['ionic', 'mobiscroll-datetime']).config(["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	    $ionicConfigProvider.views.maxCache(0);
	    /*路由配置*/
	    $stateProvider
	    /*首页*/
	    .state('home', {
	        url: "/home",
	        templateUrl: "app/home/home.html",
	        controller: 'homeCtrl',
	        resolve: {
	            requireService: "appService",
	            initData: function initData(appService) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "examDate": appService.dateFtt("yyyy-MM-dd", new Date()),
	                        "userName": wmf.UserID
	                    }, "RegieAppExaminfoAdapter", "getExamCount", function () {});
	                });
	            }
	        }
	    })
	    /*我的*/
	    .state('mine', {
	        url: "/mine",
	        templateUrl: "app/mine/mine.html",
	        controller: 'mineCtrl',
	        resolve: {
	            requireService: "appService",
	            initData: function initData(appService) {
	                return appService.wmfPromise.then(function () {
	                    return [{
	                        user: "宋振宇",
	                        gangwei: "案件督导岗（分局）",
	                        checked: false
	                    }, {
	                        user: "宋振宇",
	                        gangwei: "案件督导岗（分局）",
	                        checked: false
	                    }, {
	                        user: "宋振宇",
	                        gangwei: "案件督导岗（分局）",
	                        checked: false
	                    }];
	                });
	            }
	        }
	    })
	    /*市场检查*/
	    .state('marketInspect', {
	        url: "/marketInspect",
	        templateUrl: "app/marketInspect/marketInspect.html",
	        controller: 'marketInspectCtrl'
	    })
	    /*市场检查-计划外*/
	    .state('marketInspect.outsideThePlan', {
	        url: "/outsideThePlan/:params",
	        templateUrl: "app/marketInspect/outsideThePlan/outsideThePlan.html",
	        controller: 'outsideThePlanCtrl',
	        resolve: {
	            requireService: "appService",
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "menuCode": JSON.parse($stateParams.params).menuCode,
	                        "examDate": JSON.parse($stateParams.params).examDate
	                    }, "RegieProExaminfoAdapter", "getExamInfoList", function () {});
	                });
	            }
	        }
	    })
	    /*市场检查-计划内*/
	    .state('marketInspect.insideThePlan', {
	        url: "/insideThePlan/:params",
	        templateUrl: "app/marketInspect/insideThePlan/insideThePlan.html",
	        controller: 'insideThePlanCtrl',
	        resolve: {
	            requireService: "appService",
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "menuCode": JSON.parse($stateParams.params).menuCode,
	                        "examDate": JSON.parse($stateParams.params).examDate
	                    }, "RegieProExaminfoAdapter", "getExamInfoList", function () {});
	                });
	            }
	        }
	    })
	    /*市场检查-附近*/
	    .state('marketInspect.nearby', {
	        url: "/nearby",
	        templateUrl: "app/marketInspect/nearby/nearby.html",
	        controller: 'nearbyCtrl',
	        resolve: {
	            requireService: "appService",
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "menuCode": "3",
	                        "jd": "121.453826",
	                        "wd": "31.277986",
	                        "range": 300,
	                        "examdate": "2017-12-09"
	                    }, "RegieProExaminfoAdapter", "getExamInfoList", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询
	    .state('basicInformation', {
	        url: "/basicInformation/:params",
	        templateUrl: "app/basicInformation/basicInformation.html",
	        controller: 'basicInformationCtrl'
	    })
	    /*基础档案查询-基础信息*/
	    .state('basicInformation.essentialInformation', {
	        url: "/essentialInformation/:params",
	        templateUrl: "app/basicInformation/essentialInformation/essentialInformation.html",
	        controller: 'essentialInformationCtrl',
	        resolve: {
	            requireService: "appService",
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieAppExaminfoAdapter", "getBasicLicenceData", function () {});
	                });
	            }
	        }
	    })
	    /*基础档案查询-经营信息*/
	    .state('basicInformation.businessInformation', {
	        url: "/businessInformation/:params",
	        templateUrl: "app/basicInformation/businessInformation/businessInformation.html",
	        controller: 'businessInformationCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieAppExaminfoAdapter", "getBusinessLicenceData", function () {});
	                });
	            }
	        }
	    })
	    /*基础档案查询-管理信息*/
	    .state('basicInformation.managementInformation', {
	        url: "/managementInformation/:params",
	        templateUrl: "app/basicInformation/managementInformation/managementInformation.html",
	        controller: 'managementInformationCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieAppExaminfoAdapter", "getManagerLicenceData", function () {});
	                });
	            }
	        }
	    })
	    /*基础档案查询-配送信息*/
	    .state('basicInformation.distributionInformation', {
	        url: "/distributionInformation",
	        templateUrl: "app/basicInformation/distributionInformation/distributionInformation.html",
	        controller: 'distributionInformationCtrl',
	        resolve: {
	            requireService: "appService",
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regiellicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieAppExaminfoAdapter", "getDeliveryLicenceData", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-变更信息
	    .state('basicInformation.changeInformation', {
	        url: "/changeInformation/:params",
	        templateUrl: "app/basicInformation/changeInformation/changeInformation.html",
	        controller: 'changeInformationCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieAppExaminfoAdapter", "getOperationHistory", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-违法记录
	    .state('basicInformation.illegalRecord', {
	        url: "/illegalRecord/:params",
	        templateUrl: "app/basicInformation/illegalRecord/illegalRecord.html",
	        controller: 'illegalRecordCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieAppExaminfoAdapter", "getIllegalRecord", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-市场检查记录
	    .state('basicInformation.marketInspectionRecord', {
	        url: "/marketInspectionRecord/:params",
	        templateUrl: "app/basicInformation/marketInspectionRecord/marketInspectionRecord.html",
	        controller: 'marketInspectionRecordCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieAppExaminfoAdapter", "getExamRecord", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-违规记录
	    .state('basicInformation.violationRecord', {
	        url: "/violationRecord/:params",
	        templateUrl: "app/basicInformation/violationRecord/violationRecord.html",
	        controller: 'violationRecordCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regiellicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieAppExaminfoAdapter", "getBreakRullRecord", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-投诉举报记录
	    .state('basicInformation.complaintReport', {
	        url: "/complaintReport/:params",
	        templateUrl: "app/basicInformation/complaintReport/complaintReport.html",
	        controller: 'complaintReportCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieAppExaminfoAdapter", "getComplaintRecord", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-形象信息
	    .state('basicInformation.imageInformatio', {
	        url: "/imageInformatio/:params",
	        templateUrl: "app/basicInformation/imageInformatio/imageInformatio.html",
	        controller: 'imageInformatioCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
	                    }, "RegieProExaminfoAdapter", "getImageInfo", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询
	    .state('marketInspectRecord', {
	        url: "/marketInspectRecord/:params",
	        templateUrl: "app/marketInspectRecord/marketInspectRecord.html",
	        controller: 'marketInspectRecordCtrl'
	    })
	    //检查情况记录-基础信息记录
	    .state('marketInspectRecord.basicInfoRegistration', {
	        url: "/basicInfoRegistration/:params",
	        templateUrl: "app/marketInspectRecord/basicInfoRegistration/basicInfoRegistration.html",
	        controller: 'basicInfoRegistrationCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo,
	                        "examdate": JSON.parse($stateParams.params).examdate,
	                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
	                    }, "RegieProExaminfoAdapter", "getBasicExamInfo", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-许可证使用情况
	    .state('marketInspectRecord.licence', {
	        url: "/licence/:params",
	        templateUrl: "app/marketInspectRecord/licence/licence.html",
	        controller: 'licenceCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
	                    }, "RegieProExaminfoAdapter", "checkExamInfo", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-卷烟经营情况
	    .state('marketInspectRecord.cigaretteManagement', {
	        url: "/cigaretteManagement/:params",
	        templateUrl: "app/marketInspectRecord/cigaretteManagement/cigaretteManagement.html",
	        controller: 'cigaretteManagementCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
	                    }, "RegieProExaminfoAdapter", "checkExamInfo", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-责令整改
	    .state('marketInspectRecord.orderRectification', {
	        url: "/orderRectification/:params",
	        templateUrl: "app/marketInspectRecord/orderRectification/orderRectification.html",
	        controller: 'orderRectificationCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
	                    }, "RegieProExaminfoAdapter", "getRectifyList", function () {});
	                });
	            }
	        }
	    })
	    // 基础档案查询-物品信息登记
	    .state('marketInspectRecord.goodsInformationRegistration', {
	        url: "/orderRectification",
	        templateUrl: "app/marketInspectRecord/goodsInformationRegistration/goodsInformationRegistration.html",
	        controller: 'goodsInformationRegistrationCtrl'
	    })
	    // 基础档案查询-文书生成
	    .state('marketInspectRecord.documentsGenerated', {
	        url: "/documentsGenerated/:params",
	        templateUrl: "app/marketInspectRecord/documentsGenerated/documentsGenerated.html",
	        controller: 'documentsGeneratedCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo,
	                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
	                    }, "RegieProExaminfoAdapter", "getCaseWriteInfoList", function () {});
	                });
	            }
	        }
	    })
	    /*文书预览*/
	    .state('marketInspectRecord.documentPreview', {
	        url: "/documentPreview/:params",
	        templateUrl: "app/marketInspectRecord/documentPreview/documentPreview.html",
	        controller: 'documentPreviewCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {
	                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
	                    }, "RegieProExaminfoAdapter", "getPreKeepNoticeByEventId", function () {});
	                });
	            }
	        }
	    })
	    /*pad的首页*/
	    .state('padHome', {
	        url: "/padHome",
	        templateUrl: "app/padHome/padHome.html",
	        controller: 'padHomeCtrl'
	    })
	    /*pad的物品登记页面*/
	    .state('registrationItems', {
	        url: "/registrationItems/:params",
	        templateUrl: "app/registrationItems/registrationItems.html",
	        controller: 'registrationItemsCtrl',
	        resolve: {
	            requireService: 'appService',
	            initData: function initData(appService, $stateParams) {
	                return appService.wmfPromise.then(function () {
	                    return appService.requireForWMF(wmf, {}, "RegieProExaminfoAdapter", "getUnLogoutByMe01Id", function () {});
	                });
	            }
	        }
	    });
	    $urlRouterProvider.otherwise("/home");
	    //根据pad的不同类型，加载不同的主页
	    /*if(JSON.parse($rootScope.user_model).pad_type = '01'){
	        $urlRouterProvider.otherwise("/mine");
	    }else{
	        $urlRouterProvider.otherwise("/padHome");
	    }*/
	}]);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @describe: 时间格式化
	 */
	_app2.default.filter("formatDate", function () {
	    return function (str) {
	        var monthAndDay = str.split(",")[0];
	        var month = monthAndDay.split(" ")[0];
	        var monthVal;
	        switch (month) {
	            case "Jan":
	                monthVal = 1;break;
	            case "Feb":
	                monthVal = 2;break;
	            case "Mar":
	                monthVal = 3;break;
	            case "Apr":
	                monthVal = 4;break;
	            case "May":
	                monthVal = 5;break;
	            case "Jun":
	                monthVal = 6;break;
	            case "Jul":
	                monthVal = 7;break;
	            case "Aug":
	                monthVal = 8;break;
	            case "Sep":
	                monthVal = 9;break;
	            case "Oct":
	                monthVal = 10;break;
	            case "Nov":
	                monthVal = 11;break;
	            case "Dec":
	                monthVal = 12;break;
	        }
	        return str.split(",")[1].split(" ")[1] + "-" + monthVal + "-" + monthAndDay.split(" ")[1];
	    };
	})
	/**
	 * @describe: 举报违法记录页面长字符串处理
	 */
	.filter("marketInspectionRecordLongStr", function () {
	    return function (str) {
	        if (str.length < 12) {
	            return str;
	        } else {
	            return str.substring(0, 12) + "<br/>" + str.substring(12);
	        }
	    };
	}).filter("complaintReportLongStr", function () {
	    return function (str) {
	        if (str.length < 8) {
	            return str;
	        } else {
	            return str.substring(0, 8) + "<br/>" + str.substring(8, 18);
	        }
	    };
	})
	/**
	 * @describe: 基础档案查询页面中一人多控01是02否
	 */
	.filter("onManConStr", function () {
	    return function (str) {
	        switch (str) {
	            case "01":
	                str = "是";break;
	            case "02":
	                str = "否";break;
	        }
	        return str;
	    };
	});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @describe:基础信息查询控制器
	 * @author:yangyong
	 */
	_app2.default.controller("basicInformationCtrl", ["$scope", "$state", "$stateParams", function ($scope, $state, $stateParams) {
	    //左侧导航栏项初始化数组
	    $scope.navigationMenu = [{
	        menuName: "基本信息",
	        uiState: "basicInformation.essentialInformation"
	    }, {
	        menuName: "经营信息",
	        uiState: "basicInformation.businessInformation"
	    }, {
	        menuName: "管理信息",
	        uiState: "basicInformation.managementInformation"
	    }, {
	        menuName: "配送信息",
	        uiState: "basicInformation.distributionInformation"
	    }, {
	        menuName: "变更信息",
	        uiState: "basicInformation.changeInformation"
	    }, {
	        menuName: "检查记录",
	        uiState: "basicInformation.marketInspectionRecord"
	    }, {
	        menuName: "违规记录",
	        uiState: "basicInformation.violationRecord"
	    }, {
	        menuName: "违法记录",
	        uiState: "basicInformation.illegalRecord"
	    }, {
	        menuName: "投诉举报",
	        uiState: "basicInformation.complaintReport"
	    }, {
	        menuName: "形象信息",
	        uiState: "basicInformation.imageInformatio"
	    }];
	    /**
	     * @describe:左侧导航项点击事件
	     */
	    $scope.navigationClick = function () {
	        if (jQuery(event.target).attr("data-menuState")) {
	            //被点击项样式修改
	            jQuery(event.target).css("background-color", "white");
	            jQuery(event.target).siblings().css("background-color", "#FFF5EE");
	            //路由跳转
	            $state.go(jQuery(event.target).attr("data-menuState"), {
	                params: $stateParams.params
	            });
	        }
	    };
	    /**
	     * @description: 页面加载完成，进行相关页面初始化操作
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        console.log("$viewContentLoaded///");
	        //页面子路由默认跳转至基本信息
	        $state.go("basicInformation.essentialInformation", {
	            params: $stateParams.params
	        });
	    });
	    /**
	     * @description: 跳转至市场检查情况页面
	     */
	    $scope.goMarketInspectRecord = function () {
	        $state.go("marketInspectRecord", {
	            params: $stateParams.params
	        });
	    };
	}]);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("documentPreviewCtrl", ["$scope", function ($scope) {}]);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @describe: 首页控制器
	 * @author: yangyong
	 */
	_app2.default.controller("homeCtrl", ["appService", "$ionicNavBarDelegate", "$scope", "initData", "$ionicHistory", "$rootScope", function (appService, $ionicNavBarDelegate, $scope, initData, $ionicHistory, $rootScope) {
	    //初始化责令整改和物品登记是否遮罩标记数组
	    $rootScope.zlzgAry = [];
	    $rootScope.xxdjbcAry = [];

	    /**
	     * @description: 签退询问弹出框
	     */
	    var signOutPoput = function signOutPoput() {
	        if ($rootScope.signVal) {
	            appService.confirmPopup("签到未签退,是否签退", function () {
	                appService.requireForWMF(wmf, {
	                    "me20_id": $rootScope.signVal
	                }, "RegieProExaminfoAdapter", "mobSignOut", function (data) {
	                    console.log("签退成功");
	                    $rootScope.signVal = null;
	                    $ionicNavBarDelegate.back();
	                });
	            }, function () {
	                $ionicNavBarDelegate.back();
	            });
	        } else {
	            $ionicNavBarDelegate.back();
	        }
	    };

	    /**
	     * @description: 自定义nav-bar返回按钮行为
	     */
	    $rootScope.navBarClick = function () {
	        event.preventDefault();
	        //有编辑为保存，返回时候需要询问是否保存
	        if ($rootScope.marketRecordHasChange) {
	            appService.confirmPopup("编辑未保存,是否返回", signOutPoput, function () {});
	        } else {
	            //有签到未签退,返回时候询问是否签退
	            if ($rootScope.signVal) {
	                signOutPoput();
	            } else {
	                $ionicNavBarDelegate.back();
	            }
	        }
	    };

	    /**
	     * @describe: 页面加载完进行相关初始化操作
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        //页面数据初始化
	        console.log(initData.result);
	        $scope.storeData = initData.result[0];
	        var d = new Date();
	        $scope.storeData1 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	        //获取当前的view,用于签退时设置返回view,为首页
	        $rootScope.homeView = $ionicHistory.currentView();
	    });

	    /**
	     * @describe 首页右侧按钮菜单显示与影藏
	     */
	    $scope.moreButtonShow = false;
	    $scope.moreButton = function () {
	        $scope.moreButtonShow = $scope.moreButtonShow ? false : true;
	    };
	    //页面滚动隐藏首页右侧按钮菜单
	    $scope.scrollHidePopver = function () {
	        $scope.moreButtonShow = false;
	        $scope.$apply();
	    };
	}]);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @describe: 市场检查控制器
	 * @author: yangyong
	 */
	_app2.default.controller("marketInspectCtrl", ["$scope", "$state", "$stateParams", "$rootScope", "appService", function ($scope, $state, $stateParams, $rootScope, appService) {
	    var nowTime = $rootScope.examDate ? $rootScope.examDate.split("-") : appService.dateFtt("yyyy-MM-dd", new Date()).split("-");
	    //左侧导航项数组
	    var navigationMenu = [{
	        menuName: "计划内",
	        uiState: "marketInspect.insideThePlan"
	    }, {
	        menuName: "计划外",
	        uiState: "marketInspect.outsideThePlan"
	    }, {
	        menuName: "附近",
	        uiState: "marketInspect.nearby"
	    }];
	    $scope.navigationMenu = navigationMenu;

	    //导航项复制数组,用于动态修改导航项个数
	    var copyNavigationMenu = [].concat(navigationMenu);

	    /**
	     * @description: 导航项点击路由跳转函数
	     */
	    $rootScope.menuCode = "0";
	    $rootScope.examDate;
	    $scope.navigationClick = function () {
	        //导航项配置了路由状态，则跳转
	        if (jQuery(event.target).attr("data-menuState")) {
	            jQuery(event.target).css("background-color", "white");
	            jQuery(event.target).siblings().css("background-color", "#FFF5EE");
	            switch (jQuery(event.target).attr("data-menuState")) {
	                case "marketInspect.insideThePlan":
	                    $rootScope.menuCode = "0";break;
	                case "marketInspect.outsideThePlan":
	                    $rootScope.menuCode = "1";break;
	            };
	            $state.go(jQuery(event.target).attr("data-menuState"), {
	                params: JSON.stringify({
	                    menuCode: $rootScope.menuCode,
	                    examDate: $rootScope.examDate
	                })
	            });
	        }
	    };

	    /**
	     * @description: 页面加载完毕，进行相关操作
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        if (new Date().getTime() - new Date(nowTime[0], parseInt(nowTime[1]) - 1, nowTime[2]).getTime() > 60 * 60 * 12) {
	            jQuery("#yesterdayBtn").attr("disabled", true);
	            jQuery("#yesterdayBtn").css("color", "#D3CBC4");
	        } else if (new Date(nowTime[0], parseInt(nowTime[1]) - 1, nowTime[2]).getTime() - new Date().getTime() > 60 * 60 * 12) {
	            jQuery("#tomorrowBtn").attr("disabled", true);
	            jQuery("#tomorrowBtn").css("color", "#D3CBC4");
	        }
	        //页面底部时间控件日期初始化
	        $rootScope.examDate = appService.dateFtt("yyyy-MM-dd", new Date(nowTime[0], parseInt(nowTime[1]) - 1, nowTime[2]));
	        $scope.storeData2 = $rootScope.examDate;
	        //页面默认子路由跳转至计划内
	        $state.go("marketInspect.insideThePlan", {
	            params: JSON.stringify({
	                menuCode: "0",
	                examDate: $rootScope.examDate
	            })
	        });
	    });

	    /**
	     * @describe:前一天点击事件
	     */
	    var commonDate = new Date(nowTime[0], parseInt(nowTime[1]) - 1, nowTime[2]);; //公共日期，当前选择的日期
	    $scope.yesterdayClick = function () {
	        var changeTime = new Date(commonDate.getFullYear(), commonDate.getMonth(), commonDate.getDate() - 1); //昨天
	        var changeTime1 = new Date(commonDate.getFullYear(), commonDate.getMonth(), commonDate.getDate() - 3); //今天是周一，昨天就是上周五
	        var dayTime = commonDate.getDay(); //星期
	        //如果是周一,就跳转到上周五
	        if (dayTime == 1) {
	            $rootScope.examDate = appService.dateFtt("yyyy-MM-dd", changeTime1);
	            commonDate = changeTime1;
	        } else {
	            $rootScope.examDate = appService.dateFtt("yyyy-MM-dd", changeTime);
	            commonDate = changeTime;
	        }

	        //如果时间和当天相同
	        if (Object.is(new Date().getDate(), commonDate.getDate())) {
	            //如果时间和当天相同，时间控件左右两个日期选择按钮都可点击
	            jQuery(event.target).parent().find("button").attr("disabled", false);
	            jQuery(event.target).parent().find("button").css("color", "white");
	            //如果时间和当天相同，计划内/外/附近，三个导航按钮全部显示
	            $scope.navigationMenu = copyNavigationMenu;
	        } else {
	            //如果是昨天，时间控件左侧日期选择按钮禁用
	            jQuery(event.target).attr("disabled", true);
	            jQuery(event.target).css("color", "#D3CBC4");
	            //如果是昨天，则只显示计划内/外两个导航按钮
	            copyNavigationMenu.splice(2, 1);
	            $scope.navigationMenu = copyNavigationMenu;
	            copyNavigationMenu = [].concat(navigationMenu);
	        }
	        //更新显示日期
	        $scope.storeData2 = $rootScope.examDate;
	        $state.go("marketInspect.insideThePlan", {
	            params: JSON.stringify({
	                menuCode: $rootScope.menuCode,
	                examDate: $rootScope.examDate
	            })
	        });
	    };

	    /**
	     * @description: 点击后一天时间选择按钮
	     */
	    $scope.tomorrowClick = function () {
	        var changeTime = new Date(commonDate.getFullYear(), commonDate.getMonth(), commonDate.getDate() + 1); //明天
	        var changeTime1 = new Date(commonDate.getFullYear(), commonDate.getMonth(), commonDate.getDate() + 3); //如果今天是周五,明天就是下周一
	        var dayTime = commonDate.getDay();
	        //如果今天是周五,后天就是下周一
	        if (dayTime == 5) {
	            $rootScope.examDate = appService.dateFtt("yyyy-MM-dd", changeTime1);
	            commonDate = changeTime1;
	        } else {
	            $rootScope.examDate = appService.dateFtt("yyyy-MM-dd", changeTime);
	            commonDate = changeTime;
	        }

	        //时间和当天相同
	        if (Object.is(new Date().getDate(), commonDate.getDate())) {
	            //如果时间和当天相同，时间控件左右两个日期选择按钮都可点击
	            jQuery(event.target).parent().find("button").css("color", "white");
	            jQuery(event.target).parent().find("button").attr("disabled", false);
	            //如果时间和当天相同，计划内/外/附近，三个导航按钮全部显示
	            $scope.navigationMenu = copyNavigationMenu;
	        } else {
	            //如果是后天，时间控件右侧日期选择按钮禁用
	            jQuery(event.target).attr("disabled", true);
	            jQuery(event.target).css("color", "#D3CBC4");
	            //如果是后天，则只显示计划内导航按钮
	            copyNavigationMenu.splice(1, 2);
	            $scope.navigationMenu = copyNavigationMenu;
	            copyNavigationMenu = [].concat(navigationMenu);
	        }

	        $scope.storeData2 = $rootScope.examDate;
	        $state.go("marketInspect.insideThePlan", {
	            params: JSON.stringify({
	                menuCode: $rootScope.menuCode,
	                examDate: $rootScope.examDate
	            })
	        });
	    };

	    /**
	     * @description: 扫码进店点击事件
	     */
	    $scope.scanCode = function () {
	        wmf.callNativeDelegateFunc(JSON.stringify({ "cmd": "cmd_scan", "params": { "data": "测试" } }), function (backData) {
	            console.log("原生调用成功");
	            if (JSON.parse(backData).params.data == "") {
	                appService.errorPopup("扫码失败，请重试", "温馨提示");
	            } else {
	                appService.requireForWmfMore(wmf, [{
	                    "menuCode": '2',
	                    "examDate": $rootScope.examDate,
	                    "regielicenceno": JSON.parse(backData).params.data
	                }, {
	                    "regielicenceno": JSON.parse(backData).params.data,
	                    "examedate": $rootScope.examDate,
	                    "me11Id": null
	                }], ["RegieProExaminfoAdapter", "RegieProExaminfoAdapter"], ["getExamInfoList", "mobSignIn"], [function (data) {
	                    var paramsVal = {
	                        regielicenceNo: JSON.parse(backData).params.data,
	                        me06_id: data.result.list.ME06_ID ? data.result.list.ME06_ID : '',
	                        me11_id: data.result.list.ME11_ID ? data.result.list.ME11_ID : '',
	                        examdate: $rootScope.examDate,
	                        examtypecode: data.result.exam[0].EXAMTYPE,
	                        examtypeName: data.result.exam[0].EXAMTYPENAME
	                    };
	                    $state.go("marketInspectRecord.basicInfoRegistration", { params: JSON.stringify(paramsVal) });
	                }, function (data) {
	                    //签到成功后返回的me20Id，用于签退
	                    $rootScope.signVal = data.result.me20Id;
	                    console.log("签到成功");
	                    console.log(data);
	                }]);
	                $rootScope.scanRegielicenceno = JSON.parse(backData).params.data;
	            }
	        });
	    };
	}]);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description: 市场检查情况控制器
	 * @author yangyong
	 */
	_app2.default.controller("marketInspectRecordCtrl", ["$ionicLoading", "$scope", "$state", "$ionicHistory", "$ionicPopup", "$stateParams", "$rootScope", "appService", function ($ionicLoading, $scope, $state, $ionicHistory, $ionicPopup, $stateParams, $rootScope, appService) {
	    //左侧导航项初始化
	    $scope.navigationMenu = [{
	        menuName: "基础信息登记",
	        uiState: "marketInspectRecord.basicInfoRegistration"
	    }, {
	        menuName: "许可证使用情况",
	        uiState: "marketInspectRecord.licence"
	    }, {
	        menuName: "卷烟经营情况",
	        uiState: "marketInspectRecord.cigaretteManagement"
	    }, {
	        menuName: "责令整改",
	        uiState: "marketInspectRecord.orderRectification",
	        hasZH: true
	    }, {
	        menuName: "物品信息登记",
	        uiState: "marketInspectRecord.goodsInformationRegistration",
	        hasZH: true
	    }, {
	        menuName: "文书生成",
	        uiState: "marketInspectRecord.documentsGenerated",
	        hasZH: true
	    }, {
	        menuName: "文书预览",
	        uiState: "marketInspectRecord.documentPreview",
	        hasZH: false
	    }];

	    /**
	     * @description: 导航项点击事件
	     */
	    $scope.navigationClick = function () {
	        if ($rootScope.marketRecordHasChange) {
	            appService.errorPopup("有信息未保存,请保存", '温馨提示');
	            return;
	        }
	        if (jQuery(event.target).hasClass("nav-zh") || jQuery(event.target).hasClass("navigationContrain")) {
	            return;
	        }
	        jQuery(event.target).css("background-color", "white");
	        jQuery(event.target).siblings().css("background-color", "#FFF5EE");
	        $state.go(jQuery(event.target).attr("data-menuState"), {
	            params: $stateParams.params
	        });
	    };

	    /**
	     * @description: 页面加载成功后初始化操作
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        //如果没扫码，则需要扫码进店
	        if (!Object.is($rootScope.scanRegielicenceno, JSON.parse($stateParams.params).regielicenceNo)) {
	            $ionicPopup.confirm({
	                template: "<div style=\"width: 50px;height: 50px;margin: 0 auto;border: 1px solid #CCCCCC\"></div>\n                  <div>\u8BF7\u5148\u626B\u7801\u7B7E\u5230\u540E\u65B9\u53EF\u7EE7\u7EED</div>",
	                cssClass: 'sign-popup',
	                cancelText: '取消',
	                cancelType: 'button-assertive',
	                okText: '扫码',
	                okType: 'button-positive'
	            }).then(function (res) {
	                if (res) {
	                    //遮罩
	                    $ionicLoading.show({
	                        template: "<i class=\"icon ion-loading-c\"></i>&nbsp;<span>\u626B\u7801\u5904\u7406\u4E2D,\u8BF7\u7A0D\u5019</span>"
	                    });
	                    appService.callNative({ "cmd": "cmd_scan", "params": { "data": "测试" } }, function (backData) {
	                        //检测该许可证是否已将签到，如果签到则先签退再签到
	                        var p = new Promise(function (resolve, reject) {
	                            appService.requireForWMF(wmf, {
	                                "regielicenceno": JSON.parse(backData).params.data
	                            }, "RegieProExaminfoAdapter", "getSignInfo", function (data) {
	                                if (data.result.signInfo.length == 1) {
	                                    appService.requireForWMF(wmf, {
	                                        "me20_id": data.result.signInfo[0].ME20_ID
	                                    }, "RegieProExaminfoAdapter", "mobSignOut", function (data) {
	                                        $rootScope.signVal = null;
	                                        resolve();
	                                    });
	                                } else {
	                                    resolve();
	                                }
	                            });
	                        });
	                        //签退成功后进行签到
	                        p.then(function () {
	                            appService.requireForWMF(wmf, {
	                                "me11Id": JSON.parse($stateParams.params).me11_id ? JSON.parse($stateParams.params).me11_id : null,
	                                "examDate": $rootScope.examDate,
	                                "regielicenceno": JSON.parse(backData).params.data
	                            }, "RegieProExaminfoAdapter", "mobSignIn", function (data) {
	                                //签到成功后返回的me20Id，用于签退
	                                $rootScope.signVal = data.result.me20Id;
	                                console.log("签到成功");
	                                $ionicLoading.hide();
	                                //页面默认路由跳转
	                                $state.go("marketInspectRecord.basicInfoRegistration", {
	                                    params: $stateParams.params
	                                });
	                            });
	                        });
	                    });
	                } else {
	                    $ionicLoading.hide();
	                    $ionicHistory.goBack();
	                }
	            });
	        }
	    });

	    /**
	     * @description: 签退
	     */
	    $scope.mobSignOut = function () {
	        if ($rootScope.marketRecordHasChange) {
	            appService.errorPopup("有修改未保存,请先保存", "温馨提示");
	        } else {
	            appService.requireForWMF(wmf, {
	                "me20_id": $rootScope.signVal
	            }, "RegieProExaminfoAdapter", "mobSignOut", function (data) {
	                console.log("签退成功");
	                $rootScope.signVal = null;
	            });
	        }
	    };

	    //监听子页面发送的“责令整改是否遮罩”广播.根据子页面操作动态添加或取消遮罩
	    $scope.$on("zlzgAryChange", function (event, data) {
	        $scope.navigationMenu[3].hasZH = data == 0 ? true : false;
	    });
	    $scope.$on("xxdjbcAryChange", function (event, data) {
	        $scope.navigationMenu[4].hasZH = data == 0 ? true : false;
	        $scope.navigationMenu[5].hasZH = data == 0 ? true : false;
	    });

	    $scope.$on("nextNavtigation", function (event, data) {
	        if (Object.is(data, 'marketInspectRecord.licence')) {
	            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
	            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(2)").css("background-color", "white");
	        } else if (Object.is(data, 'marketInspectRecord.cigaretteManagement')) {
	            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
	            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(3)").css("background-color", "white");
	        } else if (Object.is(data, 'marketInspectRecord.orderRectification')) {
	            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
	            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(4)").css("background-color", "white");
	        } else if (Object.is(data, 'marketInspectRecord.goodsInformationRegistration')) {
	            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
	            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(5)").css("background-color", "white");
	        } else if (Object.is(data, 'marketInspectRecord.documentsGenerated')) {
	            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
	            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(6)").css("background-color", "white");
	        } else if (Object.is(data, 'marketInspectRecord.documentPreview')) {
	            if ($scope.navigationMenu.length < 7) {
	                $scope.navigationMenu.push({
	                    menuName: "文书预览",
	                    uiState: "marketInspectRecord.documentPreview",
	                    hasZH: false
	                });
	            }
	            $state.go("marketInspectRecord.documentPreview", {
	                params: $stateParams.params
	            });
	            setTimeout(function () {
	                jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
	                jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(7)").css("background-color", "white");
	            }, 500);
	        }
	    });
	}]);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("registrationItemsCtrl", ["$scope", "$state", "$stateParams", "initData", "$rootScope", "appService", "$ionicPopup", function ($scope, $state, $stateParams, initData, $rootScope, appService, $ionicPopup) {
		//扫码后点击保存按钮时，向后台发送的参数对象
		var postGoods = {};
		$scope.$watch('$viewContentLoaded', function () {
			console.log(initData);
			$scope.me11Id = initData.result.unLogout[0].ME11_ID;
			$scope.inputValue;
			$scope.inputValue1;
			//judge 判断是真品或者假品 来决定单价是否可操作
			$scope.judge = true;
			//默认条码，规格,性质，总价四个输入框可以编辑
			$scope.dis = true;
		});

		var choosedObj = null;
		// 点击选择“卷烟性质”为真品或者假品
		$scope.goodkind = '真品';
		var goodkindId = '01';
		/**
	  * @param value: checkbox的值
	  */
		//扫封箱码
		$scope.inputChange = function (value) {
			appService.requireForWMF(wmf, {
				me11Id: initData.result.unLogout[0].ME11_ID,
				boxSq: value
			}, "RegieProExaminfoAdapter", "registerBox", function (data) {
				console.log(data);
				$scope.ca54Id = data.result.ca54Id;
				$scope.dealgoodsId = data.result.dealgoodsId;
				$scope.sealBoxNumber = data.result.serialno;
			});
		};
		// 卷烟性质弹框showPopup_0函数
		$scope.showPopup_0 = function () {
			// 向后台查询真假品列表数据，渲染进弹框中
			appService.requireForWMF(wmf, {}, "RegieProExaminfoAdapter", "goodsKindtype", function (data) {
				$scope.geTypeList = data.result.typeList;
				// $scope.data = {}
				// 自定义弹窗
				var myPopup = $ionicPopup.show({
					templateUrl: 'app/registrationItems/popup_0.html',
					title: '<div class="popupHead">选择卷烟性质</div>',
					scope: $scope,
					buttons: [{
						text: '完成',
						type: 'button-positive',
						onTap: function onTap(e) {
							$scope.goodkind = choosedObj.html();
							goodkindId = choosedObj.attr('data-code');
							// 判断后台返回的真假烟的判定结果开始
							$scope.judge = Object.is(goodkindId, '01') ? true : false;
						}
					}]
				});
			});
		};
		// 选择卷烟性质中的一条，写入页面中
		$scope.choiceType = function () {
			jQuery(event.target).css('background', 'yellow');
			jQuery(event.target).siblings().css('background', 'white');
			choosedObj = jQuery(event.target);
		};

		//扫条形码
		$scope.inputChange1 = function (value) {
			if (value.length == 13) {
				appService.requireForWMF(wmf, {
					goodsbarcode: value
				}, "RegieProExaminfoAdapter", "getBaseGoodsList", function (data) {
					console.log(data);
					$scope.sweepData = data.result.baseGoodslist[0];
					$scope.dis = true;
					postGoods = {
						baseGoodsBarcode: $scope.sweepData.BASE_GOODS_BARCODE,
						baseGoodsName: $scope.sweepData.BASE_GOODS_NAME,
						goodstypename: $scope.sweepData.GOODSTYPENAME,
						goodsprice: $scope.sweepData.BASE_GOODS_PRICE,
						baseGoodsId: $scope.sweepData.BASE_GOODS_ID,
						goodscount: $scope.sweepData.GOODSCOUNT
					};
					$scope.saveGoods();
					$scope.inputValue1 = '';
				});
			}
		};
		//扫条形码直接保存数据
		$scope.saveGoods = function () {
			postGoods.ca54Id = $scope.ca54Id;
			postGoods.dealgoodsId = $scope.dealgoodsId;
			postGoods.goodskind = goodkindId;
			appService.requireForWMF(wmf, postGoods, "RegieProExaminfoAdapter", "registerGoods", function (data) {
				if (data.result.message == '登记成功') {
					console.log(data);
					$scope.HsumNum = 0;
					$scope.HsumCash = 0;
					/*for (let i = 0; i <= $scope.bThree_cont.length - 1; i++) {
	    	$scope.HsumNum += $scope.bThree_cont[i].GOODSCOUNT;
	    	$scope.HsumCash += $scope.bThree_cont[i].TOTAL_PRICE;
	    }*/
					$scope.dis = true;
					$scope.judge = true;
					// 登记成功后把上次搜索出来的内容全部清空
					$scope.base_goods_barcode = '';
					$scope.base_goods_name = '';
					$scope.goodkind = '真品';
					$scope.base_goods_price = '';
					$scope.handNum = '';
					$scope.goodstypename = '';
				} else {
					console.log('登记失败');
				}
			});
		};
		//点击条码和包码按钮
		$scope.addRegisItem = function () {
			jQuery(event.target).addClass('addRegis2');
			jQuery(event.target).siblings().removeClass('addRegis2');
		};
		//点击保存
		$scope.savaRegis = function () {
			appService.requireForWMF(wmf, postGoods, "RegieProExaminfoAdapter", "updateCa55", function (data) {
				console.log(data);
			});
		};
		//点击清空数据弹出框
		$scope.showConfirm = function () {
			$scope.sweepData.BASE_GOODS_BARCODE = "";
			$scope.sweepData.BASE_GOODS_NAME = "";
			$scope.sweepData.GOODSTYPENAME = "";
			$scope.goodkind = "";
			$scope.sweepData.BASE_GOODS_PRICE = "";
			var confirmPopup = $ionicPopup.confirm({
				template: '<div>已清空，是否新增</div>',
				cssClass: 'goodskind-popup',
				scope: $scope,
				buttons: [{
					text: '取消',
					type: 'button-assertive'
					/*onTap: function(e) {
	    	}*/
				}, {
					text: '新增',
					type: 'button-positive',
					onTap: function onTap(e) {
						jQuery(".registrationItems").find("ul.addRegis0").css("display", "none");
						jQuery(".registrationItems").find("ul.addRegis").css("display", "block");
					}
				}]

			});
			/*confirmPopup.then(function(res) {
	      if(res) {
	          console.log('You are sure');
	      } else {
	          console.log('You are not sure');
	      }
	  });*/
		};
		//点击新增页面的放弃按钮
		$scope.clearClick = function () {
			jQuery(".registrationItems").find("ul.addRegis").css("display", "none");
			jQuery(".registrationItems").find("ul.addRegis0").css("display", "block");
		};
	}]);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("padHomeCtrl", ["$scope", "$state", function ($scope, $state) {
	  var d = new Date();
	  $scope.storeData1 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	}]);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @describe: 检查人员控制器
	 * @author: yangyong
	 */
	_app2.default.controller("mineCtrl", ["$scope", "$state", "initData", "$rootScope", "$ionicNavBarDelegate", "$ionicPopup", "appService", function ($scope, $state, initData, $rootScope, $ionicNavBarDelegate, $ionicPopup, appService) {
	    /**
	     * @description: 返回首页
	     */
	    $scope.homeButton = function () {
	        $state.go("home");
	    };

	    /**
	     * @description: 页面加载完毕,进行相关初始化操作
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        console.log(initData);
	        $scope.storeData = initData;
	    });
	    /**
	     * @description: 全选按钮点击事件
	     */
	    $scope.paramsAgainAll = function () {
	        $scope.storeData.map(function (item, index) {
	            if (item.checked == false) {
	                item.checked = true;
	                jQuery(event.target).text('取消');
	            } else {
	                item.checked = false;
	                jQuery(event.target).text('全选');
	            }
	        });
	    };
	    /**
	     * @description: 注销按钮点击事件
	     */
	    $scope.exitApp = function () {
	        wmf.callNativeDelegateFunc(JSON.stringify({ "cmd": "cmd_exit", "params": { "data": "测试" } }), function (backData) {
	            console.log("cmd_exit原生调用成功");
	        });
	    };
	}]);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @descirbe:经营信息
	 * @author:gaoqian
	 */

	_app2.default.controller("businessInformationCtrl", ["$scope", "initData", function ($scope, initData) {
		/**
	  * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	  */
		$scope.$watch('$viewContentLoaded', function () {
			$scope.storeData = initData.result[0];
		});
	}]);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description: 变更信息控制器
	 * @author: huran
	 */
	_app2.default.controller("changeInformationCtrl", ["$scope", "initData", function ($scope, initData) {
	  /**
	   * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	   */
	  $scope.$watch('$viewContentLoaded', function () {
	    $scope.storeData = initData.result;
	  });
	}]);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @descirbe:投诉举报记录
	 * @author:gaoqian
	 */

	_app2.default.controller("complaintReportCtrl", ["$scope", "initData", function ($scope, initData) {
		/**
	  * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	  */
		$scope.$watch('$viewContentLoaded', function () {
			console.log(initData.result);
			$scope.data = initData.result;
		});
	}]);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("distributionInformationCtrl", ["$scope", "initData", function ($scope, initData) {

		$scope.$watch('$viewContentLoaded', function () {
			$scope.storeData = initData.result[0];
		});
	}]);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @descirbe:违法记录
	 * @author:gaoqian
	 */

	_app2.default.controller("illegalRecordCtrl", ["$scope", "initData", function ($scope, initData) {
			/**
	   * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	   */
			$scope.$watch('$viewContentLoaded', function () {
					console.log(initData.result[0]);
					$scope.storeData = initData.result[0];
			});
	}]);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @describe:基本信息控制器
	 * @author:yangyong
	 */
	_app2.default.controller("essentialInformationCtrl", ["$scope", "$state", "$stateParams", "initData", function ($scope, $state, $stateParams, initData) {
	    //页面数据请求参数
	    var params = {
	        "licencedataId": JSON.parse($stateParams.params).licenceId,
	        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
	    };
	    /**
	     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	     */
	    $scope.$on('$viewContentLoaded', function (event) {
	        console.log(initData.result);
	        $scope.storeData = initData.result.basicList[0];
	        $scope.storeData1 = initData.result.lastData[0];
	        $scope.storeData2 = initData.result.oneManCon[0];
	    });
	}]);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @describe:形象信息
	 * @author:yangyong
	 */
	_app2.default.controller("imageInformatioCtrl", ["$scope", "initData", function ($scope, initData) {

	    $scope.$watch('$viewContentLoaded', function () {
	        console.log(initData.result.placephoto);
	        $scope.a = initData.result.placephoto;
	    });
	}]);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @descirbe:管理信息
	 * @author:gaoqian
	 */

	_app2.default.controller("managementInformationCtrl", ["$scope", "initData", function ($scope, initData) {
		/**
	  * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	  */
		$scope.$watch('$viewContentLoaded', function () {
			console.log(initData.result);
			$scope.storeData = initData.result[0];
		});
	}]);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @descirbe:市场检查记录
	 * @author:huran
	 */
	_app2.default.controller("marketInspectionRecordCtrl", ["$scope", "initData", "$stateParams", function ($scope, initData, $stateParams) {
		/**
	  * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	  */
		$scope.$watch('$viewContentLoaded', function () {
			$scope.data = initData.result;
		});
	}]);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("violationRecordCtrl", ["$scope", "initData", function ($scope, initData) {
		/**
	  * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	  */
		$scope.$watch('$viewContentLoaded', function () {
			$scope.data = initData.result;
		});
	}]);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.directive("finishRender", ['$timeout', '$parse', function ($timeout, $parse) {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attr) {
	            if (scope.$last === true) {
	                $timeout(function () {
	                    scope.$emit('ngRepeatFinished'); //事件通知
	                    var fun = scope.$eval(attr.finishRender);
	                    if (fun && typeof fun == 'function') {
	                        fun(); //回调函数
	                    }
	                });
	            }
	        }
	    };
	}]);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description: 垂直导航指令控制器
	 * @author: yangyong
	 */
	_app2.default.directive("verticalNavigation", function () {
	    return {
	        restrict: "EA",
	        templateUrl: "app/directive/verticalNavigation/verticalNavigation.html",
	        replace: true,
	        transclude: true,
	        scope: {
	            menuAry: '=',
	            menuClick: '&'
	        },
	        compile: function compile(tElement, tAttrs, transclude) {
	            return {
	                post: function post(scope, iElement) {
	                    //当没有transclude模板是，页面底部按钮容器影藏
	                    if (Object.is(iElement.find("div.ngCludeContrain")[0].innerHTML, '')) {
	                        tElement.find("div.footerBtnContrain").css("display", "none");
	                    }
	                }
	            };
	        }
	    };
	});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description: headPopover自定义指令
	 * @author yongyong
	 */
	_app2.default.directive("headPopover", ["$state", function ($state) {
	    return {
	        restrict: "EA",
	        templateUrl: "app/directive/headPopover/headPopover.html",
	        scope: {},
	        controller: function controller($scope) {
	            $scope.goInspectors = function () {
	                $state.go("mine");
	            };
	        }
	    };
	}]);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("nearbyCtrl", ["$scope", "$state", "initData", function ($scope, $state, initData) {
		$scope.$watch('$viewContentLoaded', function () {
			/*
	  result
	  nearRegList
	  exam
	  CUSTOMERNAME
	  CUSTOMERPLACE
	  DISTANCE
	  ME11_ID
	  ME20_ID
	  REGIELICENCENO
	  */
			console.log(initData.result.nearRegList);
			$scope.storeData = initData.result.nearRegList;
		});
		$scope.planListClick = function () {
			$state.go("basicInformation");
		};
	}]);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("outsideThePlanCtrl", ["$scope", "$state", "initData", "$stateParams", "$rootScope", function ($scope, $state, initData, $stateParams, $rootScope) {
	    //扫描按钮在页面渲染完成前处于隐藏
	    $scope.showCannerBtn = false;
	    /**
	     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        $scope.storeData = initData.result.searchOutPlan;
	    });
	    /**
	     * @describe:页面列表项点击事件
	     */
	    $scope.planListClick = function () {
	        //获取licenceId值，用于基础信息查询
	        var paramsVal = {
	            regielicenceNo: jQuery(event.currentTarget).attr("data-regielicenceno"),
	            me05_id: jQuery(event.currentTarget).attr("data-me05_id"),
	            me06_id: jQuery(event.currentTarget).attr("data-me06_id"),
	            examtypecode: jQuery(event.currentTarget).attr("data-examtypecode"),
	            examtypeName: jQuery(event.currentTarget).attr("data-examtypeName"),
	            me11_id: jQuery(event.currentTarget).attr("data-me11ID"),
	            examdate: $rootScope.examDate,
	            menucode: $rootScope.menuCode
	        };
	        $state.go("basicInformation", { params: JSON.stringify(paramsVal) });
	    };
	    /**
	     * @describe:ng-repeat渲染完毕后执行
	     */
	    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
	        //渲染完毕，扫描按钮显示,达到页面渲染统一,遮罩消失
	        $scope.showCannerBtn = true;
	        //保证扫描按钮在最下面
	        if (jQuery("#navigationRightContent")[0].scrollHeight - 45 > jQuery("#navigationRightContent")[0].clientHeight) {
	            $scope.hasScroll = true;
	        }
	    });
	}]);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("basicInfoRegistrationCtrl", ["$scope", "initData", "$ionicNavBarDelegate", "$stateParams", "appService", "$state", "$rootScope", function ($scope, initData, $ionicNavBarDelegate, $stateParams, appService, $state, $rootScope) {
	    //市场检查情况页面有无更改，有更改则需保存后才能导航
	    $rootScope.marketRecordHasChange = false;
	    var postExaminer = void 0;
	    // 路由参数
	    var beforePage = JSON.parse($stateParams.params);

	    /**
	     * @description: 备注有修改,在离开页面时候提示是否需要保存
	     */
	    $scope.textAreaChange = function () {
	        $rootScope.marketRecordHasChange = true;
	    };

	    /**
	     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        $scope.examtypeName = JSON.parse($stateParams.params).examtypeName; //检查形式
	        try {
	            if (initData.result.examiner.length != 0) {
	                postExaminer = initData.result.examiner[0].EXAMINER; // 检查人员信息
	            }
	            if (initData.result.regielicence.length != 0) {
	                //专卖许可证相关信息
	                $scope.dataRegielicence = initData.result.regielicence[0];
	                //备注
	                $scope.basicInfoRegistRemark = $scope.dataRegielicence.ME_REMARK;
	                //营业时间
	                $scope.businessTime = $scope.dataRegielicence.OPERATINGTIMEBEGIN + "--" + $scope.dataRegielicence.OPERATINGTIMEEND;
	            }
	            if (initData.result.peoples.length != 0) {
	                $scope.mobility = initData.result.peoples[0].POPULATIONMOBILITY; //消费人群流动性:
	            }
	            //初始化遮罩是否打开
	            if (initData.result.list.length != 0) {
	                var markObj = appService.initNavigteMark(initData.result.list[0]);
	                if (markObj.both) {
	                    $scope.$emit("zlzgAryChange", 1);
	                    $scope.$emit("xxdjbcAryChange", 1);
	                } else if (markObj.licenceZlzg || markObj.cigaretteZlzg) {
	                    $scope.$emit("zlzgAryChange", 1);
	                } else if (markObj.xxdj) {
	                    $scope.$emit("xxdjbcAryChange", 1);
	                }
	            }
	        } catch (e) {
	            console.log(e);
	            appService.errorPopup("页面数据异常", false, function () {
	                $ionicNavBarDelegate.back();
	            });
	        }
	    });

	    /**
	     * @description: 页面点击完成按钮事件
	     */
	    $scope.post_bacisRegis_parms = function () {
	        //请求参数
	        var postParms = {
	            customername: $scope.dataRegielicence.CUSTOMERNAME, // 经营户名称"customername"
	            customerplace: $scope.dataRegielicence.CUSTOMERPLACE, //经营地址"customerplace"
	            mastername: $scope.dataRegielicence.MASTERNAME, //经营者姓名"mastername"
	            sellsacreage: $scope.dataRegielicence.SELLSACREAGE, // 营业面积"sellsacreage"
	            operatingtimebegin: $scope.dataRegielicence.OPERATINGTIMEBEGIN, //营业开始时间"operatingtimebegin"
	            operatingtimeend: $scope.dataRegielicence.OPERATINGTIMEEND, //营业结束时间"operatingtimeend"
	            alliancebusiness: $scope.dataRegielicence.ALLIANCEBUSINESSNAME, //加盟情况code "alliancebusiness"
	            populationmobility: initData.result.peoples[0].POPULATIONMOBILITY, //消费人群流动性"populationmobility"
	            examiner: postExaminer //检查人员信息"examiner":
	        };
	        postParms.examdate = beforePage.examdate;
	        postParms.remark = $scope.basicInfoRegistRemark;
	        postParms.me06Id = beforePage.me06_id;
	        postParms.examtypecode = beforePage.examtypecode;
	        postParms.menuCode = beforePage.menucode;
	        postParms.regielicenceno = beforePage.regielicenceNo;

	        //保存数据
	        appService.requireForWMF(wmf, postParms, 'RegieProExaminfoAdapter', 'saveExamInfo01', function (data) {
	            //保存成功后，市场检查情况有修改标志变为false，可以进行导航切换与签退
	            $rootScope.marketRecordHasChange = false;
	            // 返回的data中包含data.result.me11Id
	            $rootScope.me11Id = data.result.me11Id;
	            //页面默认路由跳转,延时为了避免多次触发子路由$viewContentLoaded;
	            $scope.$emit("nextNavtigation", "marketInspectRecord.licence");
	            $state.go("marketInspectRecord.licence", {
	                params: $stateParams.params
	            });
	        });
	    };
	}]);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @descirbe:计划内控制器
	 * @author:yangyong
	 */
	_app2.default.controller("insideThePlanCtrl", ["$scope", "$state", "initData", "$stateParams", "$rootScope", function ($scope, $state, initData, $stateParams, $rootScope) {
	    /**
	     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        console.log(initData.result.searchInPlan);
	        $scope.storeData = initData.result.searchInPlan;
	    });
	    /**
	     * @describe:页面列表项点击事件
	     */
	    $scope.insideplanClick = function () {
	        //获取licenceId值，用于基础信息查询
	        var paramsVal = {
	            regielicenceNo: jQuery(event.currentTarget).attr("data-regielicenceno"),
	            me05_id: jQuery(event.currentTarget).attr("data-me05_id"),
	            me06_id: jQuery(event.currentTarget).attr("data-me06_id"),
	            me11_id: jQuery(event.currentTarget).attr("data-me11ID"),
	            examtypecode: jQuery(event.currentTarget).attr("data-examtypecode"),
	            examtypeName: jQuery(event.currentTarget).attr("data-examtypeName"),
	            examdate: $rootScope.examDate,
	            menucode: $rootScope.menuCode
	        };
	        $state.go("basicInformation", { params: JSON.stringify(paramsVal) });
	    };
	}]);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("cigaretteManagementCtrl", ["$scope", "$state", "$stateParams", "initData", "$rootScope", "appService", "$ionicHistory", function ($scope, $state, $stateParams, initData, $rootScope, appService, $ionicHistory) {
	    //市场检查情况页面有无更改，有更改则需保存后才能导航
	    $rootScope.marketRecordHasChange = false;
	    //导航遮罩关闭标志对象
	    var markObj = {
	        both: false,
	        licenceZlzg: false,
	        cigaretteZlzg: false,
	        xxdj: false
	    };
	    //页面数据保存对象
	    var cigaretteParams = {};

	    $scope.$watch('$viewContentLoaded', function () {
	        console.log(initData.result);
	        // 初始化页面数据
	        if (initData.result.list.length != 0) {
	            $scope.cigaretteParams = initData.result.list[0];
	        } else {
	            $scope.cigaretteParams = appService.initLicenceAndCigaretteData;
	        }

	        // 将条件开关标志“0”，“1”转化为true,false
	        appService.conditionFlagChange($scope.cigaretteParams, function (property) {
	            var propertyIndx = property.substr(property.length - 2, 2);
	            if (parseInt(propertyIndx) <= 10 && parseInt(propertyIndx) > 6) {
	                cigaretteParams["meReslut" + propertyIndx] = $scope.cigaretteParams[property];
	                cigaretteParams["meReslut" + propertyIndx + "Handle"] = $scope.cigaretteParams["ME_RESLUT" + propertyIndx + "_HANDLE"];
	            } else if (parseInt(propertyIndx) > 10) {
	                cigaretteParams["meReslut" + propertyIndx] = $scope.cigaretteParams[property];
	            }
	        });

	        //初始化责令整改和信息登记保存条件数组
	        setTimeout(function () {
	            $rootScope.zlzgAry = appService.initzlzgAry($rootScope.zlzgAry);
	            $rootScope.xxdjbcAry = appService.initxxdjAry($rootScope.xxdjbcAry);
	        }, 1000);

	        //初始化遮罩是否打开
	        if (initData.result.list.length != 0) {
	            markObj = appService.initNavigteMark(initData.result.list[0]);
	            if (markObj.both) {
	                $scope.$emit("zlzgAryChange", 1);
	                $scope.$emit("xxdjbcAryChange", 1);
	            } else if (markObj.licenceZlzg || markObj.cigaretteZlzg) {
	                $scope.$emit("zlzgAryChange", 1);
	            } else if (markObj.xxdj) {
	                $scope.$emit("xxdjbcAryChange", 1);
	            }
	        }
	    });

	    /**
	     * @description: checkbox关闭时，清空checkbox下所有的数据
	     * @param value: checkbox的值
	     * @param resultIdx: 开关序号
	     * @param handle: 传给后台的handle属性
	     * @param hasInpt: input值
	     */
	    $scope.checkChange = function (value, resultIdx, handle, inputVal) {
	        $rootScope.marketRecordHasChange = true;
	        //根据开关的开闭，设置保存参数条件开关对应的状态值
	        if (resultIdx == "meReslut17") {
	            cigaretteParams[resultIdx] = value ? '0' : '1';
	        } else {
	            cigaretteParams[resultIdx] = value ? '1' : '0';
	        }
	        //若存在子条件，在关闭条件开关后，子条件保存对象中对应字段设置为‘4’
	        if (handle) {
	            jQuery(event.target).parent().parent().find("span").removeClass("chooseSpan");
	            cigaretteParams[handle] = '4';
	        }
	        //若存在文本输入框，当关闭条件开关时，清空文本输入框
	        if (inputVal) inputVal = '';
	    };

	    /**
	     * @description: 生成条件选择数组，用于控制左边导航栏后三个导航项是否遮罩
	     * @param ele: 点击的元素
	     * @param ary:条件数组
	     */
	    var conditionAryCreate = function conditionAryCreate(ele, ary) {
	        //如果条件项已经被选中，则取消选中，反之选中
	        if (jQuery(ele).hasClass("chooseSpan")) {
	            //选中项变不选中，并将该选择项从条件数组删除
	            jQuery(ele).removeClass("chooseSpan");
	            ary.find(function (value, index, arr) {
	                if (Object.is(value, ele)) {
	                    arr.splice(index, 1);
	                }
	            });
	        } else {
	            //操作同上相反
	            jQuery(ele).addClass("chooseSpan");
	            ary.push(ele);
	        }
	    };

	    /**
	     * @description: 条件项点击事件
	     */
	    $scope.chooseCondition = function () {
	        var conditionnName = jQuery(event.target).html();
	        //点击'要求经营户整改'控制左侧'责令整改'导航项是否遮罩
	        if (Object.is(conditionnName, "要求经营户整改")) {
	            conditionAryCreate(event.target, $rootScope.zlzgAry);
	            if (!markObj.licenceZlzg) {
	                $scope.$emit("zlzgAryChange", $rootScope.zlzgAry.length);
	            }
	            $scope.$emit("zlzgAryChange", $rootScope.zlzgAry);
	        } else if (Object.is(conditionnName, "先行登记保存")) {
	            //点击'先行登记保存'控制左侧最后两个导航项是否遮罩
	            conditionAryCreate(event.target, $rootScope.xxdjbcAry);
	            $scope.$emit("xxdjbcAryChange", $rootScope.xxdjbcAry);
	        }
	    };

	    //点击保存卷烟经营情况
	    $scope.cigaretteClick = function () {
	        cigaretteParams.meReslut07Handle = appService.initHandleVal('meReslut07Handle');
	        cigaretteParams.meReslut08Handle = appService.initHandleVal('meReslut08Handle');
	        cigaretteParams.meReslut09Handle = appService.initHandleVal('meReslut09Handle');
	        cigaretteParams.meReslut10Handle = appService.initHandleVal('meReslut10Handle');
	        cigaretteParams.meReslut16Detail = $scope.cigaretteParams.ME_RESLUT16_DETAIL; //是否有其他违规情况中的情况
	        cigaretteParams.me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;

	        //只有具备me11Id,无必填项未填，则可以提交保存
	        if (!cigaretteParams.me11Id) {
	            $rootScope.marketRecordHasChange = false;
	            appService.errorPopup("未登记,请点击基础信息登记进行登记", "温馨提示", function () {});
	        } else {
	            if (!cigaretteParams.meReslut16Detail && $scope.cigaretteParams.ME_RESLUT16) {
	                appService.errorPopup("有必填项未填,请检查并填写", "温馨提示", function () {});
	            } else {
	                console.log("-----------------------------------------");
	                console.log(cigaretteParams);
	                appService.requireForWMF(wmf, cigaretteParams, "RegieProExaminfoAdapter", "saveExamInfo03", function (data) {
	                    $rootScope.marketRecordHasChange = false;
	                    //责令整改与物品登记都未开放
	                    if ($rootScope.zlzgAry.length == 0 && $rootScope.xxdjbcAry.length == 0) {
	                        appService.confirmPopup("保存成功,是否签退", "签退询问通知").then(function (res) {
	                            if (res) {
	                                $state.go("marketInspect");
	                                //等路由跳转结束再更新$ionicHistory
	                                setTimeout(function () {
	                                    //将首页作为市场情况的backView
	                                    $ionicHistory.viewHistory().backView = $rootScope.homeView;
	                                }, 1000);
	                            }
	                        });
	                    } else if ($rootScope.zlzgAry.length != 0 && $rootScope.xxdjbcAry.length == 0) {
	                        //责令整改开放与物品登记未开放
	                        $scope.$emit("nextNavtigation", "marketInspectRecord.orderRectification");
	                        $state.go("marketInspectRecord.orderRectification", {
	                            params: $stateParams.params
	                        });
	                    } else if ($rootScope.zlzgAry.length == 0 && $rootScope.xxdjbcAry.length != 0) {
	                        //责令整改未开放与物品开放
	                        $scope.$emit("nextNavtigation", "marketInspectRecord.goodsInformationRegistration");
	                        $state.go("marketInspectRecord.goodsInformationRegistration", {
	                            params: $stateParams.params
	                        });
	                    } else {
	                        $scope.$emit("nextNavtigation", "marketInspectRecord.orderRectification");
	                        $state.go("marketInspectRecord.orderRectification", {
	                            params: $stateParams.params
	                        });
	                    }
	                });
	            }
	        }
	    };
	}]);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description 文书合成控制器
	 * @author :yangyong
	 */
	_app2.default.controller("documentsGeneratedCtrl", ["$scope", "$state", "$stateParams", "initData", "appService", "$ionicPopup", "$rootScope", "$ionicModal", function ($scope, $state, $stateParams, initData, appService, $ionicPopup, $rootScope, $ionicModal) {
	    var isMainTrangress = true; //标记是否是主要案件性质
	    var carryMetail = [{ isChoice: false, choiceText: '身份证' }, { isChoice: false, choiceText: '营业执照' }, { isChoice: false, choiceText: '许可证副本' }, { isChoice: false, choiceText: '委托书及受托人身份证' }, { isChoice: false, choiceText: '' }]; //携带材料数组和其保存参数初始化
	    var carryMetailVal = '';
	    var processMethodAry = []; //处理方法数组
	    $scope.mainTrangress = '请选择'; //主要案件性质
	    $scope.subTrangress = '请选择'; //次要案件性质
	    $scope.carryMetailText = '携带材料种类'; //携带的材料
	    $scope.processMethodText = '请选择办法'; //处理方法
	    var ask_address = void 0,
	        dept_address = void 0,
	        storage_address = void 0,
	        contacter = void 0,
	        contactphone = void 0;
	    //生成文书参数
	    var createDocumentPramas = {};
	    var customeId = void 0;
	    $scope.cardPhoto;
	    $scope.cardidPhotoId;
	    $scope.positivePhotoId;
	    $scope.sidePhotoId;

	    /**
	     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        console.log(initData.result);
	        me11Id: $rootScope.me11Id;
	        $scope.itpList = initData.result.itpList;
	        $scope.itcList = initData.result.itcList;
	        $scope.examInfoList = initData.result.examInfoList[0];
	        $scope.suspectByReg = initData.result.suspectByReg[0];
	        $scope.getDeptInfo = initData.result.getDeptInfo;
	        $scope.transgressList = initData.result.transgressList;
	        $scope.typeList = initData.result.typeList;
	        $scope.typeList.unshift({ "CODE": "100", "NAME": "请选择车辆类型" });
	        $scope.carType = "100";
	        customeId = initData.result.suspectByReg[0].CUSTOMER_ID;
	        //案发时间
	        $scope.caseTime = appService.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(), true);
	        //询问时间
	        $scope.inquiryTime = "请选择时间";

	        var ASK_ADDRESS = []; //询问地址
	        var CONTACTER = []; //联系人
	        var CONTACTPHONE = []; //联系电话
	        var DEPT_ADDRESS = []; //本局地址
	        var STORAGE_ADDRESS = []; //物品保存地址
	        //遍历把参数写到数组中
	        angular.forEach($scope.getDeptInfo, function (item, index) {
	            ASK_ADDRESS.push($scope.getDeptInfo[index].ASK_ADDRESS);
	            CONTACTER.push($scope.getDeptInfo[index].CONTACTER);
	            CONTACTPHONE.push($scope.getDeptInfo[index].CONTACTPHONE);
	            DEPT_ADDRESS.push($scope.getDeptInfo[index].DEPT_ADDRESS);
	            STORAGE_ADDRESS.push($scope.getDeptInfo[index].STORAGE_ADDRESS);
	        });
	        contacter = CONTACTER;
	        ask_address = ASK_ADDRESS;
	        contactphone = CONTACTPHONE;
	        dept_address = DEPT_ADDRESS;
	        storage_address = STORAGE_ADDRESS;
	        //初始化选择框
	        $scope.liName = "请选择联系人"; //联系人
	        $scope.liPhone = "请选择联系电话"; //联系电话
	        $scope.liAsk = "请选择地点"; //询问地点
	        $scope.liDept = "请选择地址"; //本局地址
	        $scope.liStorage = "请选择地点"; //物品保存地址
	        $scope.iSelect = "请选择"; //主要案件性质
	        $scope.concatSex = '请选择性别';
	    });

	    /**
	     * @description: 案发时间控件相关属性设置
	     * @type {Date}
	     */
	    var now = new Date();
	    $scope.mydatetime = now;
	    $scope.settings = {
	        headerText: "案发时间选择",
	        theme: 'material',
	        lang: 'zh',
	        display: 'center',
	        min: new Date(now.getFullYear() - 1, 0, 1),
	        max: new Date(now.getFullYear(), 11, 31),
	        maxWidth: 80,
	        minWidth: 50,
	        rows: 3,
	        monthText: '',
	        buttons: [{
	            text: '完成',
	            cssClass: 'choicedTime',
	            handler: function handler(event, inst) {
	                $scope.caseTime = appService.dateFtt("yyyy-MM-dd hh:mm:ss", inst.getVal());
	                $scope.$apply();
	                inst.cancel();
	            }
	        }]
	    };

	    /**
	     * @description: 询问时间控件相关属性设置
	     * @type {Date}
	     */
	    $scope.settings1 = {
	        headerText: "询问时间选择",
	        theme: 'material',
	        lang: 'zh',
	        display: 'center',
	        min: now,
	        max: new Date(now.getFullYear() + 1, 11, 31),
	        maxWidth: 80,
	        minWidth: 50,
	        rows: 3,
	        steps: {
	            minute: 60,
	            zeroBased: true
	        },
	        monthText: '',
	        buttons: [{
	            text: '完成',
	            cssClass: 'choicedTime',
	            handler: function handler(event, inst) {
	                $scope.inquiryTime = appService.dateFtt("yyyy-MM-dd hh", inst.getVal());
	                $scope.$apply();
	                inst.cancel();
	            }
	        }]
	    };

	    /**
	     * @description 相关车辆弹出框
	     * @param itpId 用于区别新增相关车辆和删除、更新车辆人员操作
	     */
	    $scope.showPopup = function (itcId) {
	        // 查询相关车辆
	        if (itcId) {
	            appService.requireForWMF(wmf, {
	                itcId: itcId
	            }, 'RegieProExaminfoAdapter', 'getCa13ById', function (data) {
	                console.log(data);
	                $scope.addlicense = data.result.itcIdList[0].LICENSE;
	                $scope.carType = data.result.itcIdList[0].CARTYPECODE;
	                $scope.positivePhotoId = data.result.itcIdList[0].POSITIVE_PHOTO;
	                $scope.sidePhotoId = data.result.itcIdList[0].SIDE_PHOTO;
	            });
	        }

	        var myPopup = $ionicPopup.show({
	            templateUrl: 'app/marketInspectRecord/documentsGenerated/popup.html',
	            title: "<div class='popupHead'>" + (itcId ? '修改相关车辆' : '添加相关车辆') + "</div>",
	            cssClass: 'alert-popup',
	            scope: $scope,
	            buttons: [{
	                text: itcId ? "删除" : '取消',
	                type: 'button-assertive',
	                onTap: function onTap() {
	                    if (itcId) {
	                        appService.requireForWMF(wmf, {
	                            itcId: itcId
	                        }, 'RegieProExaminfoAdapter', 'delCa13ById', function (data) {
	                            console.log('删除相关车辆成功');
	                            console.log(data);
	                        });
	                    }
	                }
	            }, {
	                text: itcId ? "完成" : '添加',
	                type: 'button-positive',
	                onTap: function onTap(e) {
	                    if (itcId) {
	                        appService.requireForWMF(wmf, {
	                            license: $scope.addlicense,
	                            cartypecode: $scope.carType,
	                            positivePhotoId: $scope.positivePhotoId,
	                            sidePhotoId: $scope.sidePhotoId,
	                            itcId: itcId
	                        }, 'RegieProExaminfoAdapter', 'updateCa13ById', function (data) {
	                            console.log('更新相关车辆成功');
	                            console.log(data);
	                        });
	                    } else {
	                        appService.requireForWMF(wmf, {
	                            me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id,
	                            license: $scope.addlicense,
	                            carType: $scope.carType,
	                            positivePhotoId: $scope.positivePhotoId,
	                            sidePhotoId: $scope.sidePhotoId
	                        }, 'RegieProExaminfoAdapter', 'saveCa13ById', function (data) {
	                            console.log('添加相关车辆成功');
	                            console.log(data);
	                        });
	                    }
	                }
	            }]
	        });
	    };

	    /**
	     * @description 相关人员弹出框
	     * @param itpId:用于区别新增相关人员和删除、更新相关人员操作
	     */
	    $scope.showUserPopup = function (itpId) {
	        if (itpId) {
	            appService.requireForWMF(wmf, {
	                itpId: itpId
	            }, 'RegieProExaminfoAdapter', 'getCa12ById', function (data) {
	                $scope.addName = data.result.itpList[0].NAME;
	                $scope.addCardid = data.result.itpList[0].CARDID;
	                $scope.addIptPhone = data.result.itpList[0].ITP_PHONE;
	                $scope.addItpRemark = data.result.itpList[0].ITP_REMARK;
	            });
	        }
	        var myPopup = $ionicPopup.show({
	            templateUrl: 'app/marketInspectRecord/documentsGenerated/user-popup.html',
	            title: "<div class='popupHead'>\n                  " + (itpId ? '修改相关人员资料' : '添加相关人员资料') + "\n                </div>",
	            cssClass: 'alert-popup',
	            scope: $scope,
	            buttons: [{
	                text: itpId ? "删除" : '取消',
	                type: 'button-assertive',
	                onTap: function onTap(e) {
	                    if (itpId) {
	                        appService.requireForWMF(wmf, {
	                            itpId: itpId
	                        }, 'RegieProExaminfoAdapter', 'delCa12ById', function (data) {
	                            console.log('删除相关人员保存成功');
	                            console.log(data);
	                        });
	                    }
	                }
	            }, {
	                text: itpId ? "完成" : '添加',
	                type: 'button-positive',
	                onTap: function onTap(e) {
	                    if (itpId) {
	                        appService.requireForWMF(wmf, {
	                            itpName: $scope.addName,
	                            cardid: $scope.addCardid,
	                            iptPhone: $scope.addIptPhone,
	                            itpRemark: $scope.addItpRemark,
	                            cardidPhotoId: $scope.cardidPhotoId,
	                            itpId: itpId
	                        }, 'RegieProExaminfoAdapter', 'updateCa12ById', function (data) {
	                            console.log('更新相关人员保存成功');
	                            console.log(data);
	                        });
	                    } else {
	                        appService.requireForWMF(wmf, {
	                            me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id,
	                            name: $scope.addName,
	                            cardid: $scope.addCardid,
	                            iptPhone: $scope.addIptPhone,
	                            itpRemark: $scope.addItpRemark,
	                            cardidPhotoId: $scope.cardidPhotoId
	                        }, 'RegieProExaminfoAdapter', 'saveCa12ById', function (data) {
	                            console.log('添加相关人员保存成功');
	                            console.log(data);
	                        });
	                    }
	                }
	            }]
	        });
	    };

	    /**
	     * @description: 拍照
	     */
	    $scope.talkPhoto = function (flag) {
	        var ele = event.target;
	        wmf.imageTaker(function (stringImage) {
	            ele.src = stringImage;
	            switch (flag) {
	                case "cardPhoto":
	                    $scope.cardPhoto = stringImage;break;
	                case "cardidPhotoId":
	                    $scope.cardidPhotoId = stringImage;break;
	                case "positivePhotoId":
	                    $scope.positivePhotoId = stringImage;break;
	                case "sidePhotoId":
	                    $scope.sidePhotoId = stringImage;break;
	            }
	        });
	    };

	    //物品处理办法
	    $scope.showArticlesPopup = function () {
	        //恢复初始化
	        $scope.processMethodText = '';
	        processMethodAry = [];

	        var alertPopup = $ionicPopup.alert({
	            templateUrl: 'app/marketInspectRecord/documentsGenerated/articles-popup.html',
	            title: "<div class='popupHead'>物品处理办法</div>",
	            cssClass: 'articles-popup',
	            scope: $scope,
	            buttons: [{
	                text: '完成',
	                type: 'button-positive',
	                onTap: function onTap(e) {
	                    //拼接处理方法保存时需要的参数
	                    createDocumentPramas.dealway = processMethodAry.toString();
	                    //拼接处理方法回显得文本
	                    processMethodAry.find(function (val, index, ary) {
	                        switch (val) {
	                            case '01':
	                                $scope.processMethodText = $scope.processMethodText + '将物品送鉴定和检验,';break;
	                            case '02':
	                                $scope.processMethodText = $scope.processMethodText + '移送有关部门处理,';break;
	                            case '03':
	                                $scope.processMethodText = $scope.processMethodText + '采取证据保全措施,';break;
	                            case '04':
	                                $scope.processMethodText = $scope.processMethodText + '依法不予行政处罚,接触保全措施,';break;
	                        }
	                    });
	                    $scope.processMethodText = $scope.processMethodText.slice(0, $scope.processMethodText.length - 1);
	                }
	            }]
	        });
	    };

	    //当事人需要携带证件资料弹出框
	    $scope.showDocumentsData = function () {
	        //恢复初始化
	        $scope.carryMetailText = '';
	        carryMetail = [{ isChoice: false, choiceText: '身份证' }, { isChoice: false, choiceText: '营业执照' }, { isChoice: false, choiceText: '许可证副本' }, { isChoice: false, choiceText: '委托书及受托人身份证' }, { isChoice: false, choiceText: '' }];
	        var alertPopup = $ionicPopup.alert({
	            templateUrl: 'app/marketInspectRecord/documentsGenerated/documentsData-popup.html',
	            title: "<div class='popupHead'>当事人需要携带证件资料</div>",
	            cssClass: 'articles-popup',
	            scope: $scope,
	            buttons: [{
	                text: '完成',
	                type: 'button-positive',
	                onTap: function onTap(e) {
	                    var _iteratorNormalCompletion = true;
	                    var _didIteratorError = false;
	                    var _iteratorError = undefined;

	                    try {
	                        for (var _iterator = carryMetail.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                            var _step$value = _slicedToArray(_step.value, 2),
	                                index = _step$value[0],
	                                elem = _step$value[1];

	                            //拼接需要传递的需要携带材料参数
	                            if (index < carryMetail.length - 1) {
	                                carryMetailVal = carryMetailVal + ("0" + (index + 1) + ":" + elem.isChoice + ",");
	                            } else {
	                                carryMetailVal = carryMetailVal + ("0" + (index + 1) + ":" + elem.isChoice);
	                            }
	                            //拼接显示需要携带材料的文本
	                            if (elem.isChoice) {
	                                $scope.carryMetailText = $scope.carryMetailText + elem.choiceText + ",";
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError = true;
	                        _iteratorError = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion && _iterator.return) {
	                                _iterator.return();
	                            }
	                        } finally {
	                            if (_didIteratorError) {
	                                throw _iteratorError;
	                            }
	                        }
	                    }

	                    $scope.carryMetailText = $scope.carryMetailText.slice(0, $scope.carryMetailText.length - 1);

	                    createDocumentPramas.bringdatum = carryMetailVal;
	                    createDocumentPramas.othercontent = $scope.othercontent ? "," + $scope.othercontent : "";
	                    $scope.carryMetailText = $scope.carryMetailText + createDocumentPramas.othercontent;
	                }
	            }]
	        });
	    };

	    /**
	    * @description :携带材料列表项点击事件
	    */
	    $scope.bgClick = function () {
	        if (jQuery(event.target).hasClass('elect')) {
	            jQuery(event.target).removeClass('elect');
	            carryMetail.find(function (value, index, ary) {
	                if (index == parseInt(jQuery(event.target).attr("data-metailId")) - 1) {
	                    ary[index].isChoice = false;
	                }
	            });
	        } else {
	            jQuery(event.target).addClass('elect');
	            carryMetail.find(function (value, index, ary) {
	                if (index == parseInt(jQuery(event.target).attr("data-metailId")) - 1) {
	                    ary[index].isChoice = true;
	                }
	            });
	        }
	    };
	    /**
	    * @description: 处理方法列表点击事件
	    */
	    $scope.processMethod = function () {
	        if (jQuery(event.target).hasClass('elect')) {
	            jQuery(event.target).removeClass('elect');
	            processMethodAry.find(function (value, index, ary) {
	                if ("0" + (index + 1) == jQuery(event.target).attr("data-processMethod")) {
	                    ary.split(index, 1);
	                }
	            });
	        } else {
	            jQuery(event.target).addClass('elect');
	            processMethodAry.push(jQuery(event.target).attr("data-processMethod"));
	        }
	    };
	    /**
	    * @description: 模态框单选点击事件
	    */
	    $scope.signClick = function () {
	        if (jQuery(event.target).hasClass('elect')) {
	            jQuery(event.target).removeClass('elect');
	        } else {
	            jQuery(event.target).addClass('elect');
	            jQuery(event.target).siblings().removeClass('elect');
	            $scope.modelAddress1 = jQuery(event.target).html();
	        }
	    };

	    //联系人
	    $scope.showContactPerson = function (index) {
	        if (index == 0) {
	            //index=0表示打开请选择联系人 1表示打开联系电话
	            $scope.g = contacter;
	        } else {
	            $scope.g = contactphone;
	        }
	        var alertPopup = $ionicPopup.alert({
	            templateUrl: 'app/marketInspectRecord/documentsGenerated/contactPerson-popup.html',
	            title: "<div class='popupHead'>" + (index == 0 ? "请选择联系人" : "请选择联系电话") + "</div>",
	            cssClass: 'articles-popup',
	            scope: $scope,
	            buttons: [{
	                text: '完成',
	                type: 'button-positive',
	                onTap: function onTap(e) {
	                    (function (chooseItemVal) {
	                        if (index == 0) {
	                            $scope.liName = chooseItemVal;
	                        } else {
	                            $scope.liPhone = chooseItemVal;
	                        }
	                    })($scope.modelAddress1);
	                }
	            }]
	        });
	    };

	    //请选择或添加地址
	    $scope.showAddress = function (index) {
	        $scope.hidenText = true; //是否隐藏修改文本框
	        var title = "请选择地址或者手动输入地址";
	        if (index == 0) {
	            $scope.modelAddress = ask_address;
	        } else if (index == 1) {
	            $scope.modelAddress = dept_address;
	        } else if (index == 2) {
	            $scope.modelAddress = storage_address;
	        } else {
	            title = '请选择地址性别';
	            $scope.hidenText = false;
	            $scope.modelAddress = ["男", "女"];
	        };
	        var alertPopup = $ionicPopup.alert({
	            templateUrl: 'app/marketInspectRecord/documentsGenerated/address-popup.html',
	            title: "<div class='popupHead'>" + title + "</div>",
	            cssClass: 'articles-popup',
	            scope: $scope,
	            buttons: [{
	                text: '完成',
	                type: 'button-positive',
	                onTap: function onTap(e) {
	                    //点击完成，将文本框赋值给对应的变量
	                    (function (chooseItemVal) {
	                        switch (index) {
	                            case 0:
	                                $scope.liAsk = chooseItemVal;break;
	                            case 1:
	                                $scope.liDept = chooseItemVal;break;
	                            case 2:
	                                $scope.liStorage = chooseItemVal;break;
	                            case 3:
	                                $scope.concatSex = chooseItemVal;break;
	                        }
	                    })($scope.modelAddress1);
	                    //点击完成后，清空文本框中的输入值
	                    $scope.modelAddress1 = "";
	                }
	            }]
	        });
	    };

	    //主要案件性质
	    $ionicModal.fromTemplateUrl('app/marketInspectRecord/documentsGenerated/mainTheCase.html', {
	        scope: $scope
	    }).then(function (modal) {
	        $scope.modal = modal;
	    });

	    //选中每个案件性质点击事件
	    $scope.boxClick = function () {
	        var clickEle = event.target;
	        //判断是否点击的是li里面的div，是则选择器父节点li
	        if (clickEle.tagName == "DIV") {
	            if (isMainTrangress) {
	                $scope.mainTrangress = jQuery(clickEle).parent().attr("data-transgressName");
	                createDocumentPramas.transgressId = jQuery(clickEle).parent().attr("data-transgressId");
	            } else {
	                $scope.subTrangress = jQuery(clickEle).parent().attr("data-transgressName");
	                createDocumentPramas.subTransgressId = jQuery(clickEle).parent().attr("data-transgressId");
	            }
	        } else {
	            if (isMainTrangress) {
	                $scope.mainTrangress = jQuery(clickEle).attr("data-transgressName");
	                createDocumentPramas.transgressId = jQuery(clickEle).parent().attr("data-transgressId");
	            } else {
	                $scope.subTrangress = jQuery(clickEle).attr("data-transgressName");
	                createDocumentPramas.subTransgressId = jQuery(clickEle).parent().attr("data-transgressId");
	            }
	        }
	        $scope.modal.hide();
	    };
	    //案件性质分类标签点击事件
	    $scope.tabsClick = function () {
	        var paramsVal = {
	            transgresscode: jQuery(event.target).attr("data-typeCode")
	        };
	        if (jQuery(event.target).hasClass('tab')) {
	            jQuery(event.target).removeClass('tab');
	        } else {
	            jQuery(event.target).addClass('tab');
	            jQuery(event.target).siblings().removeClass('tab');
	            appService.requireForWMF(wmf, paramsVal, 'RegieProExaminfoAdapter', 'getTransgressByType', function (data) {
	                console.log(data);
	                $scope.transgressByTypeList = data.result.transgressByTypeList;
	            });
	        }
	    };

	    //案件性质选择模态框点击事件
	    $scope.openModal = function (flag) {
	        isMainTrangress = flag;
	        $scope.modal.show();
	        appService.requireForWMF(wmf, {
	            me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
	        }, 'RegieProExaminfoAdapter', 'getTransgressType', function (data) {

	            $scope.transgressTypeList = data.result.transgressTypeList;
	            //初始化时请求案件性质列表
	            appService.requireForWMF(wmf, {
	                transgresscode: '00'
	            }, 'RegieProExaminfoAdapter', 'getTransgressByType', function (data) {
	                console.log(data);
	                $scope.transgressByTypeList = data.result.transgressByTypeList;
	            });
	        });
	    };

	    //文书生成点击事件
	    $scope.savaDocument = function () {
	        createDocumentPramas.me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;
	        createDocumentPramas.happenTime = $scope.caseTime; //案发时间
	        createDocumentPramas.happenAddress = $scope.caseAddress; //案发地点
	        createDocumentPramas.age = $scope.age; //年龄
	        createDocumentPramas.storeaddress = $scope.liStorage; //物品保存地址
	        createDocumentPramas.remark = $scope.remark; //特别注意事项
	        createDocumentPramas.customerplace = $scope.liDept; //本局地址
	        createDocumentPramas.asktime = $scope.inquiryTime; //询问时间
	        createDocumentPramas.askAddress = $scope.liAsk; //询问地点
	        createDocumentPramas.linkmanname = $scope.liName; //联系人
	        createDocumentPramas.linkphone = $scope.liPhone; //联系电话
	        createDocumentPramas.cardPhoto = $scope.cardPhoto;
	        createDocumentPramas.proveUpRemark = $scope.proveUpRemark;
	        createDocumentPramas.customerId = customeId;
	        createDocumentPramas.suspectObjName = $scope.suspectByReg.SUSPECTOBJNAME;
	        createDocumentPramas.phone = $scope.suspectByReg.PHONE;
	        createDocumentPramas.contactaddress = $scope.suspectByReg.CONTACTADDRESS;
	        createDocumentPramas.sexname = $scope.concatSex;
	        createDocumentPramas.cardid = $scope.suspectByReg.CARDID;
	        appService.requireForWMF(wmf, createDocumentPramas, 'RegieProExaminfoAdapter', 'saveCaseInfo', function (data) {
	            console.log(data);
	            $scope.$emit("nextNavtigation", "marketInspectRecord.documentPreview");
	        });
	    };
	}]);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("goodsInformationRegistrationCtrl", ["$scope", "$state", "$stateParams", "$ionicLoading", "appService", "$ionicPopup", "$rootScope", function ($scope, $state, $stateParams, $ionicLoading, appService, $ionicPopup, $rootScope) {
		// 扫封箱码按钮是否显示标志
		$scope.scanFresh = true;
		/*HsumNum 用来统计页面底部 合计
	 HsumCash 用来统计页面底部 总价*/
		$scope.HsumNum = 0;
		$scope.HsumCash = 0;
		// 点击选择“卷烟性质”为真品或者假品
		$scope.fakeProducts = '真品';
		var fakeProductsId = '01';
		//汇总页面文本框是否可以点击标志

		/**
	 * @description: 登记tab点击函数
	  */
		$scope.Htab0 = function () {
			$scope.scanFresh = true;
			jQuery('.checkIn').css('display', 'block');
			jQuery('.Htotal').css('display', 'none');
			jQuery('.Htab0').css('background-color', '#2EA9E5');
			jQuery('.Htab1').css('background-color', '#D4CBC6');
			$scope.Ca54List = null;
			$scope.GoodsList = null;
			$scope.GoodsSumList = null;
		};

		/**
	  * @description: 汇总tab点击函数
	  */
		$scope.Htab1 = function () {
			$scope.scanFresh = false;
			// 防止多次点击后出现累加，所以在请求到数据之前先清空
			$scope.Ca54List = null;
			$scope.GoodsList = null;
			$scope.SumList = null;
			// 防止一直累加，每次初始化把合计清零HsumNum,HsumCash
			$scope.HsumNum = 0;
			$scope.HsumCash = 0;
			// 初始化时删除的自定义属性为零售户的0
			$scope.dealTitle = 0;
			var totalParms = {
				me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
			};
			jQuery('.checkIn').css('display', 'none');
			jQuery('.Htotal').css('display', 'block');
			jQuery('.Htab0').css('background-color', '#D4CBC6');
			jQuery('.Htab1').css('background-color', '#2EA9E5');
			jQuery("#Lshou").css('background-color', '#2EA9E5');
			//点击汇总初始化页面
			appService.requireForWMF(wmf, totalParms, "RegieProExaminfoAdapter", "getCa54ListByEventId", function (data) {
				$scope.Ca54List = data.result.ca54List; //封箱号tab标签列表
				$scope.GoodsList = data.result.goodsList; //详细物品信息列表
				$scope.SumList = data.result.goodsSumList; //汇总信息列表
				// 计算底部的合计数据
				for (var i = 0; i <= data.result.goodsSumList.length - 1; i++) {
					$scope.HsumNum += data.result.goodsSumList[i].GOODSCOUNT;
					$scope.HsumCash += data.result.goodsSumList[i].TOTALPRICE;
				};
			});
		};

		/**
	 * @description: 点击切换零售户,箱子tab切换函数
	  * @param index:箱子序号,0:零售户,1,2,3箱子序号
	  */
		$scope.focus = function (index) {
			$scope.SumList = null;
			$scope.GoodsList = null;
			// 防止一直累加，每次初始化把合计清零HsumNum,HsumCash
			$scope.HsumNum = 0;
			$scope.HsumCash = 0;
			// 当index=0，则是点击零售户 否则是点击箱子
			// dealTitle 自定义属性 用来判断删除的是零售户还是箱子中的物品
			if (index == 0) {
				jQuery(event.target).css('background-color', '#2EA9E5');
				jQuery("#Manybox").find('span').css('background-color', '#D4CBC6');
				// 点击零售户时删除的自定义属性为零售户的 0
				$scope.dealTitle = 0;
				var Retaile = {
					me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
				};
				appService.requireForWMF(wmf, Retaile, "RegieProExaminfoAdapter", "getSumByEventId", function (data) {
					console.log(data);
					$scope.SumList = data.result.goodsSumList;
					$scope.GoodsList = data.result.goodsList;
					// 计算底部的合计数据
					for (var i = 0; i <= data.result.goodsSumList.length - 1; i++) {
						$scope.HsumNum += data.result.goodsSumList[i].GOODSCOUNT;
						$scope.HsumCash += data.result.goodsSumList[i].TOTALPRICE;
					};
				});
			} else {
				// 点击箱子时删除的自定义属性为零售户的 1
				$scope.dealTitle = 1;
				var boxParms = jQuery(event.target).attr('data-ca54id');
				jQuery(event.target).css('background-color', '#2EA9E5');
				jQuery(event.target).siblings('span').css('background-color', '#D4CBC6');
				jQuery("#Lshou").css('background-color', '#D4CBC6');
				// 删除箱子中的物品时需要箱子的ca54id; delC54id
				$scope.delC54id = boxParms;
				var boxGetParms = {
					ca54Id: boxParms
				};
				appService.requireForWMF(wmf, boxGetParms, "RegieProExaminfoAdapter", "getBoxSum", function (data) {
					console.log("箱子", data);
					$scope.SumList = data.result.boxSumList;
					$scope.GoodsList = data.result.boxGoodsList;
					// 计算底部的合计数据
					for (var i = 0; i <= data.result.boxSumList.length - 1; i++) {
						$scope.HsumNum += data.result.boxSumList[i].GOODSCOUNT;
						$scope.HsumCash += data.result.boxSumList[i].TOTALPRICE;
					};
				});
			}
		};

		/**
	 * @description: 零售户明细删除
	  */
		$scope.delInfo = function () {
			$scope.SumList = null;
			$scope.GoodsList = null;
			$scope.HsumNum = 0;
			$scope.HsumCash = 0;
			var Ca55Id = jQuery(event.target).attr('data-ca55Id');
			var Ca54Id = jQuery(event.target).attr('data-ca54Id');
			// 得到删除的时候元素的自定义属性 data - DealTitle
			var Dealtitle = jQuery(event.target).attr('data-DealTitle');
			// Dealtitle=0删除的是零售户里的记录，否则就是箱子里的
			var delParms = {
				me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
			};
			if (Dealtitle == 0) {
				delParms.ca55Id = Ca55Id;
				appService.requireForWMF(wmf, delParms, "RegieProExaminfoAdapter", "delSumByEventId", function (data) {
					console.log(delParms);
					$scope.SumList = data.result.goodsSumList;
					$scope.GoodsList = data.result.goodsList;
					// 计算底部的合计数据
					for (var i = 0; i <= data.result.goodsSumList.length - 1; i++) {
						$scope.HsumNum += data.result.goodsSumList[i].GOODSCOUNT;
						$scope.HsumCash += data.result.goodsSumList[i].TOTALPRICE;
					};
				});
			} else {
				delParms.ca54Id = Ca54Id;
				delParms.ca55Id = Ca55Id;
				appService.requireForWMF(wmf, delParms, "RegieProExaminfoAdapter", "delBoxSum", function (data) {
					console.log(data);
					console.log(delParms);
					$scope.SumList = data.result.boxSumList;
					$scope.GoodsList = data.result.boxGoodsList;
					// 计算底部的合计数据
					for (var i = 0; i <= data.result.boxSumList.length - 1; i++) {
						$scope.HsumNum += data.result.boxSumList[i].GOODSCOUNT;
						$scope.HsumCash += data.result.boxSumList[i].TOTALPRICE;
					};
				});
			}
		};

		//judge 判断是真品或者假品 来决定单价是否可操作
		$scope.judge = true;
		//默认条码，规格,性质，总价四个输入框可以编辑
		$scope.dis = true;
		//扫码后点击保存按钮时，向后台发送的参数对象
		var postGoods = {};
		//弹出框选中对象
		var choosedObj = null;
		//物品信息数组
		$scope.bThree_cont = [];

		/**
	  * @description: 扫描封箱编号点击事件
	  */
		$scope.scsnGoods = function () {
			appService.callNative({ "cmd": "cmd_scan", "params": { "data": "测试" } }, function (backData) {
				if (JSON.parse(backData).params.data == "") {
					appService.errorPopup("扫码失败，请重试", "温馨提示");
				} else {
					var scanGoodsInfo = {
						boxSq: JSON.parse(backData).params.data,
						me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
					};
					//获得封箱编号后发送请求，获取ca54Id,dealgoodsId用于面下的数据请求
					appService.requireForWMF(wmf, scanGoodsInfo, "RegieProExaminfoAdapter", "registerBox", function (data) {
						//有封箱码查询得到的ca54Id,dealgoodsId用于后续的物品登记保存
						postGoods.ca54Id = data.result.ca54Id;
						postGoods.dealgoodsId = data.result.dealgoodsId;

						$scope.sealBoxNumber = data.result.serialno; //箱子序号
						$scope.sealBoxCode = JSON.parse(backData).params.data; //封箱码
					});
				}
			});
		};

		/**
	 * @description: 搜索结果若是多条，则出现弹框形供选择
	  */
		var showPopup_search = function showPopup_search() {
			$scope.data = {};
			// 自定义弹窗
			var myPopup = $ionicPopup.show({
				templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popupRecord.html',
				title: '选择一条记录',
				scope: $scope,
				buttons: [{
					text: '完成',
					type: 'button-positive',
					onTap: function onTap(e) {
						$scope.base_goods_barcode = choosedObj.attr("data-barcode");
						$scope.base_goods_name = choosedObj.attr("data-name");
						$scope.goodstypename = choosedObj.attr("data-styleName");
						$scope.base_goods_price = choosedObj.attr("data-price");
						$scope.base_goods_type = choosedObj.attr("data-type");
					}
				}]
			});
		};

		//条形码搜索参数
		var Postgoodsbarcode = {};
		/**
	  * @description: 根据条形码搜索
	  */
		$scope.searchGoods = function () {
			Postgoodsbarcode.goodsbarcode = $scope.searchGoodsbarcode;

			appService.requireForWMF(wmf, Postgoodsbarcode, "RegieProExaminfoAdapter", "getBaseGoodsList", function (data) {
				// 如果查询返回的列表长度大于1，则出现弹框，让客户选择一条数据,否则直接写入数据到页面
				if (data.result.baseGoodslist.length > 1) {
					$scope.moreSearchRecord = data.result.baseGoodslist;
					showPopup_search();
				} else {
					// 判断后台返回是否有数据，没有对应的物品 则新增
					if (data.result.baseGoodslist.length < 1) {
						appService.confirmPopup("物品搜索无结果,是否新增", "温馨提示", function () {
							$scope.judge = false;
						}, function () {});
					} else {
						// 判断后台返回的真假烟的判定结果结束
						$scope.searchResult = data.result.baseGoodslist[0];
						$scope.base_goods_barcode = $scope.searchResult.BASE_GOODS_BARCODE;
						$scope.base_goods_name = $scope.searchResult.BASE_GOODS_NAME;
						$scope.goodstypename = $scope.searchResult.GOODSTYPENAME;
						$scope.base_goods_price = $scope.searchResult.BASE_GOODS_PRICE;
						$scope.base_goods_type = $scope.searchResult.BASE_GOODS_TYPE;
						$scope.handNum = $scope.searchResult.GOODSCOUNT;
						postGoods.baseGoodsId = $scope.searchResult.BASE_GOODS_ID;
						//查询到数据，则禁用条码，规格,性质，总价四个输入框
						$scope.dis = true;
					}
				}
			});
		};

		/**
	  * @description 扫码/保存按钮点击事件
	  */
		$scope.keepGoods = function () {
			if (!$scope.base_goods_barcode) {
				if (!$scope.sealBoxCode) {
					appService.errorPopup("封箱码未扫描,请扫描", "温馨提示", function () {});
					return;
				}
				appService.callNative({ "cmd": "cmd_scan", "params": { "data": "测试" } }, function (backData) {
					if (Object.is(JSON.parse(backData).params.data, '') || JSON.parse(backData).params.data.length != 13) {
						appService.errorPopup("扫码失败，请重试", "温馨提示");
					} else {
						$scope.searchGoodsbarcode = JSON.parse(backData).params.data;
						//等待条码显示到搜索框后进行搜索操作
						setTimeout(function () {
							$scope.searchGoods();
						}, 100);
					}
				});
			} else {
				// 点击保存,需要发送后台的数据的拼接postGoods
				postGoods.baseGoodsBarcode = $scope.base_goods_barcode;
				postGoods.baseGoodsName = $scope.base_goods_name;
				postGoods.goodsprice = $scope.base_goods_price;
				postGoods.goodscount = $scope.handNum;
				postGoods.goodskind = fakeProductsId;
				console.log('保存发送后台的数据', postGoods);
				appService.requireForWMF(wmf, postGoods, "RegieProExaminfoAdapter", "registerGoods", function (data) {
					if (data.result.message == '登记成功') {
						$scope.bThree_cont = data.result.ca55GoodsList;
						$scope.HsumNum = 0;
						$scope.HsumCash = 0;
						for (var i = 0; i <= $scope.bThree_cont.length - 1; i++) {
							$scope.HsumNum += $scope.bThree_cont[i].GOODSCOUNT;
							$scope.HsumCash += $scope.bThree_cont[i].TOTAL_PRICE;
						}
						/*$scope.dis = false;
	     $scope.judge = false;*/
						// 登记成功后把上次搜索出来的内容全部清空
						$scope.searchGoodsbarcode = '';
						$scope.base_goods_barcode = '';
						$scope.base_goods_name = '';
						$scope.fakeProducts = '真品';
						$scope.base_goods_price = '';
						$scope.handNum = '';
						$scope.goodstypename = '';
					} else {
						console.log('登记失败');
					}
				});
			}
		};

		/**
	 * @description: 卷烟性质选择弹框
	  */
		$scope.showPopup_0 = function () {
			// 向后台查询真假品列表数据，渲染进弹框中
			appService.requireForWMF(wmf, {}, "RegieProExaminfoAdapter", "goodsKindtype", function (data) {
				$scope.geTypeList = data.result.typeList;
				// $scope.data = {}
				// 自定义弹窗
				var myPopup = $ionicPopup.show({
					templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popup_0.html',
					title: '选择卷烟性质',
					scope: $scope,
					buttons: [{
						text: '完成',
						type: 'button-positive',
						onTap: function onTap(e) {
							$scope.fakeProducts = choosedObj.html();
							fakeProductsId = choosedObj.attr('data-code');
							// 判断后台返回的真假烟的判定结果开始
							$scope.judge = Object.is(fakeProductsId, '01') ? true : false;
							console.log($scope.judge);
						}
					}]
				});
			});
		};
		/**
	 * @description: 物品搜索无结果，弹出新增物品询问提示框
	  */
		/*	let showPopup_2 = function() {
	 		// 自定义弹窗
	 		var myPopup = $ionicPopup.show({
	 			templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popup_2.html',
	 			title: '没有对应物品信息',
	 			scope: $scope,
	 			buttons: [{
	 				text: '取消',
	 				type: 'button-default',
	 				onTap: function(e) {
	 					return
	 				}
	 			}, {
	 				text: '新增',
	 				type: 'button-positive',
	 				onTap: function(e) {
	                     $scope.dis = false;
	                     $scope.judge = false;
	 					/!*jQuery('#choiceType').on('click', showPopup_1);*!/
	 					return
	 				}
	 			}]
	 		});
	 	};*/

		/**
	 * @description: 卷烟类型选择弹框
	 */
		$scope.showPopup_1 = function () {
			// 自定义弹窗
			var myPopup = $ionicPopup.show({
				templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popup_1.html',
				title: '选择卷烟类型',
				scope: $scope,
				buttons: [{
					text: '完成',
					type: 'button-positive',
					onTap: function onTap(e) {
						$scope.goodstypename = choosedObj.html();
						// 卷烟类型参数传送到后台 postGoods.goodstype
						postGoods.goodstype = Object.is(choosedObj.html(), '卷烟') ? '01' : '03';
						console.log(choosedObj.html());
						console.log(postGoods.goodstype);
						console.log($scope.goodstypename);
					}
				}]
			});
		};
		// 选择卷烟性质中的一条，写入页面中
		$scope.choiceType = function () {
			jQuery(event.target).css('background', 'yellow');
			jQuery(event.target).siblings().css('background', 'white');
			choosedObj = jQuery(event.target);
		};

		/**
	  * @description: 登记Tab-删除记录点击事件
	  */
		$scope.deleteRecord = function () {
			appService.requireForWMF(wmf, {
				ca55Id: jQuery(event.target).attr("data-ca55Id"),
				ca54Id: postGoods.ca54Id
			}, "RegieProExaminfoAdapter", "delCa55Goods", function (data) {
				console.log(data);
				//获取物品信息列表,并进行合计计算
				$scope.bThree_cont = data.result.ca55GoodsList;
				$scope.HsumNum = 0;
				$scope.HsumCash = 0;
				$scope.bThree_cont.map(function (item, index) {
					$scope.HsumNum += item.GOODSCOUNT;
					$scope.HsumCash += item.TOTAL_PRICE;
				});
			});
		};
		/**
	  * @description: 保存按钮点击事件
	  */
		$scope.saveGoodsInfo = function () {
			$scope.$emit("nextNavtigation", "marketInspectRecord.documentsGenerated");
			$state.go("marketInspectRecord.documentsGenerated", {
				params: $stateParams.params
			});
		};
	}]);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description: 文书预览控制器
	 * @author: huran
	 */
	_app2.default.controller("documentPreviewCtrl", ["$scope", "$state", "$stateParams", "$rootScope", "appService", "initData", function ($scope, $state, $stateParams, $rootScope, appService, initData) {
		var _this = this;

		// 页面初始化请求的是现行保存登记书
		$scope.$watch('$viewContentLoaded', function () {
			$scope.KeepNotice_0 = initData.result.PkNoticeGoods;
			$scope.KeepNotice_1 = initData.result.PreKeepNotice;
			console.log(initData);
		});
		// hr开始
		var params = {
			"me11Id": $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
		};

		var requireParams = [{
			url: "RegieProExaminfoAdapter",
			method: "getPreKeepNoticeByEventId"
		}, {
			url: "RegieProExaminfoAdapter",
			method: "getAskNoticByEventId"
		}, {
			url: "RegieProExaminfoAdapter",
			method: "getProveUpByEventId"
		}, {
			url: "RegieProExaminfoAdapter",
			method: "getGoodDeal"
		}];
		// 点击切换文书函数
		$scope.focusIndex = 0;
		$scope.focus = function (index) {
			$scope.focusIndex = index;
			jQuery(event.target).css('background', '#EDB82A');
			jQuery(event.target).siblings().css('background-color', '#D4CBC6');
			// index == 3 当请求物品处理通知书的数据的时候，物品处理需要特殊处理
			appService.requireForWMF(wmf, params, requireParams[index].url, requireParams[index].method, function (data) {
				if (index == 0) {
					$scope.KeepNotice_0 = data.result.PkNoticeGoods;
					$scope.KeepNotice_1 = data.result.PreKeepNotice;
				} else {
					console.log('tt', data);
					$scope.Data = data.result.list[data.result.list.length - 1];
				}
				// 特殊处理物品处理通知书里的一些内容
				if (index == 3) {
					console.log('03', data);
					// 当DEALWAY的长度大于2的时候说明多余一种处理结果
					if ($scope.Data.DEALWAY) {
						if ($scope.Data.DEALWAY.length > 2) {
							var s = data.result.list[data.result.list.length - 1].DEALWAY;
							// let s = "01,02,04";
							var checkedS = s.split(',');
							for (var i = 0; i <= checkedS.length - 1; i++) {
								// console.log(jQuery("#Hcheck01").prop("checked"));
								jQuery("#Hcheck" + checkedS[i]).prop('checked', true);
							}
						}
					} else {
						console.log($scope.Data.DEALWAY);
					}
				};
				if (index == 1) {
					$scope.askAdvice = $scope.Data;
					$scope.askkTime = data.result.list[data.result.list.length - 1].ASK_TIME.split(" ");
					$scope.askBringdatum = data.result.list[data.result.list.length - 1].BRINGDATUM.split(",");
				}
			});
		};

		/**
	  * @description: 文书打印
	  */
		$scope.printDocument = function () {
			_this.printDoc = function (params) {
				wmf.callNativeDelegateFunc(JSON.stringify({
					"cmd": "cmd_printnotice",
					"params": JSON.stringify(params)
				}), function (backData) {
					console.log("打印调用成功");
					console.log(backData);
				});
			};
			var me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;

			switch ($scope.focusIndex) {
				case 0:
					_this.printDoc({
						"params": '{"me11Id":' + me11Id + '}',
						"type": "05",
						"id": ''
					});
					break;
				case 1:
					_this.printDoc({
						"params": '{"me11Id":' + me11Id + '}',
						"type": "02",
						"id": ''
					});
					break;
				case 2:
					_this.printDoc({
						"params": '{"me11Id":' + me11Id + '}',
						"type": "03",
						"id": ''
					});
					break;
				case 3:
					_this.printDoc({
						"params": '{"me11Id":' + me11Id + '}',
						"type": "01",
						"id": ''
					});
					break;
			}
		};
	}]);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description: 许可证登记控制器
	 * @author: huran
	 */
	_app2.default.controller("licenceCtrl", ["$scope", "$state", "$stateParams", "initData", "$rootScope", "appService", "$ionicPopup", function ($scope, $state, $stateParams, initData, $rootScope, appService, $ionicPopup) {
	    //页面有无更改，有更改则需保存后才能导航标志
	    $rootScope.marketRecordHasChange = false;
	    //页面保存数据参数 发送给后台
	    var postParams = {};
	    //导航遮罩关闭标志对象
	    var markObj = {
	        both: false,
	        licenceZlzg: false,
	        cigaretteZlzg: false,
	        xxdj: false
	    };

	    /**
	     * @description: 条件开关处于正常条件下，清空其子条件状态
	     * @param clickEle: 鼠标点击元素
	     * @param handle: 开关下对应的子条件在保存对象中的属性值
	     * @param inputAry: 开关下对应的输入框数组
	     */
	    var clearSubCondition = function clearSubCondition(clickEle, handle, inputAry) {
	        jQuery(clickEle).parent().parent().find("span").removeClass("chooseSpan");
	        if (handle) {
	            postParams[handle] = '4';
	        }
	        //清空所输入文本框中的输入
	        inputAry.map(function (item) {
	            $scope.pageData[item] = '';
	        });
	        //第二个li特殊处理
	        if ('meReslut02Handle' == handle) {
	            jQuery(event.target).parent().parent().find("p").removeClass("chooseSpan");
	        }
	    };

	    //初始化条件数组
	    var zlzgAry = [];

	    /**
	    * @description: 点击条件开关时，根据条件开关的开闭状态，设置保存参数条件开关对应的状态值
	    * @param value: 开关状态条件值
	     * @param resultIdx: 开关序号
	     * @param handle: 开关下对应的子条件在保存对象中的属性值
	     * @param inputAry: 开关下对应的输入框数组
	     */
	    $scope.checkChange = function (value, resultIdx, handle, inputAry) {
	        //是否弹出提示保存弹框标志
	        $rootScope.marketRecordHasChange = true;
	        //根据开关的开闭，设置保存参数条件开关对应的状态值
	        if (resultIdx == "meReslut01" || resultIdx == "meReslut03" || resultIdx == "meReslut04") {
	            if (value) {
	                postParams[resultIdx] = '0';
	                clearSubCondition(event.target, handle, inputAry);
	            } else {
	                postParams[resultIdx] = '1';
	            }
	        } else if (resultIdx == "meReslut05" || resultIdx == "meReslut06") {
	            if (value) {
	                postParams[resultIdx] = '1';
	            } else {
	                postParams[resultIdx] = '0';
	                clearSubCondition(event.target, handle, inputAry);
	            }
	        } else {
	            //第二个条件开关特殊处理
	            if (value) {
	                var chooseP = jQuery(event.target).parent().parent().find("p.chooseSpan");
	                postParams[resultIdx] = chooseP.length == 0 ? '1' : jQuery(event.target).parent().parent().find("p.chooseSpan").attr("data-meresult02");
	            } else {
	                postParams[resultIdx] = '0';
	                clearSubCondition(event.target, handle, inputAry);
	            }
	        }
	    };

	    /**
	     * 得到初始化数据 并写入页面中
	     */
	    $scope.$watch('$viewContentLoaded', function () {
	        // 初始化页面,把后台的数据写到页面上
	        if (initData.result.list.length != 0) {
	            $scope.pageData = initData.result.list[0];
	        } else {
	            $scope.pageData = appService.initLicenceAndCigaretteData;
	        }

	        //保留ME_RESLUT02,特殊处理页面许可证使用异常情况前三个选项
	        (function (val) {
	            $scope.meReslut02Val = val;
	        })($scope.pageData.ME_RESLUT02);

	        // 将条件开关标志“0”，“1”转化为true,false
	        appService.conditionFlagChange($scope.pageData, function (property) {
	            var propertyIndx = property.substr(property.length - 2, 2);
	            if (parseInt(propertyIndx) <= 4) {
	                postParams["meReslut" + propertyIndx] = $scope.pageData[property];
	                postParams["meReslut" + propertyIndx + "Handle"] = $scope.pageData["ME_RESLUT" + propertyIndx + "_HANDLE"];
	            } else if (parseInt(propertyIndx) <= 6) {
	                postParams["meReslut" + propertyIndx] = $scope.pageData[property];
	            }
	        });

	        //初始化责令整改条件数组
	        setTimeout(function () {
	            $rootScope.zlzgAry = appService.initzlzgAry($rootScope.zlzgAry);
	        }, 1000);

	        //初始化遮罩是否打开
	        if (initData.result.list.length != 0) {
	            markObj = appService.initNavigteMark(initData.result.list[0]);
	            if (markObj.both) {
	                $scope.$emit("zlzgAryChange", 1);
	                $scope.$emit("xxdjbcAryChange", 1);
	            } else if (markObj.licenceZlzg || markObj.cigaretteZlzg) {
	                $scope.$emit("zlzgAryChange", 1);
	            } else if (markObj.xxdj) {
	                $scope.$emit("xxdjbcAryChange", 1);
	            }
	        }
	    });

	    /**
	     * @description: 生成条件选择数组，用于控制左边导航栏后三个导航项是否遮罩
	     * @param ele: 点击的元素
	     * @param ary:条件数组
	     */
	    var conditionAryCreate = function conditionAryCreate(ele, ary) {
	        //如果条件项已经被选中，则取消选中，反之选中
	        if (jQuery(ele).hasClass("chooseSpan")) {
	            //选中项变不选中，并将该选择项从条件数组删除
	            jQuery(ele).removeClass("chooseSpan");
	            ary.find(function (value, index, arr) {
	                if (Object.is(value, ele)) {
	                    arr.splice(index, 1);
	                }
	            });
	        } else {
	            //操作同上相反
	            jQuery(ele).addClass("chooseSpan");
	            ary.push(ele);
	        }
	    };

	    $scope.meReslut02Click = function () {
	        if (jQuery(event.target).attr("data-meresult02")) {
	            jQuery(event.currentTarget).find("p[data-meresult02]").removeClass("chooseSpan");
	            jQuery(event.target).addClass('chooseSpan');
	            postParams.meReslut02 = jQuery(event.target).attr("data-meresult02");
	        }
	    };

	    /**
	    * @description: 条件项点击事件
	    */
	    $scope.chooseCondition = function () {
	        var conditionnName = jQuery(event.target).html();
	        var conditionEle = event.target.tagName;

	        //点击'要求经营户整改'控制左侧'责令整改'导航项是否遮罩
	        if (Object.is(conditionnName, "要求经营户整改")) {
	            conditionAryCreate(event.target, $rootScope.zlzgAry);
	            if (!markObj.both || !markObj.cigaretteZlzg) {
	                $scope.$emit("zlzgAryChange", $rootScope.zlzgAry.length);
	            }
	        } else {
	            //点击其他条件项不执行任何操作
	            if (Object.is(conditionEle, "SPAN")) {
	                jQuery(event.target).hasClass("chooseSpan") ? jQuery(event.target).removeClass("chooseSpan") : jQuery(event.target).addClass("chooseSpan");
	            }
	            return;
	        }
	    };

	    // 点击保存，向后台发送数据方法
	    $scope.postData = function () {
	        postParams.me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;
	        postParams.meReslut01Handle = appService.initHandleVal('meReslut01Handle');
	        postParams.meReslut02Handle = appService.initHandleVal('meReslut02Handle');
	        postParams.meReslut03Handle = appService.initHandleVal('meReslut03Handle');
	        postParams.meReslut04Handle = appService.initHandleVal('meReslut04Handle');
	        postParams.meReslut05Cardno = $scope.pageData.ME_RESLUT05_CARDNO;
	        postParams.meReslut05City = '';
	        postParams.meReslut03Actaddress = $scope.pageData.ME_RESLUT03_ACTADDRESS;
	        postParams.meReslut04Actlicence = $scope.pageData.ME_RESLUT04_ACTLICENCE;
	        postParams.meReslut05Name = $scope.pageData.ME_RESLUT05_NAME;
	        postParams.meReslut05Phone = $scope.pageData.ME_RESLUT05_PHONE;
	        postParams.meReslut05Province = $scope.pageData.ME_RESLUT05_PROVINCE;
	        postParams.meReslut06Detail = $scope.pageData.ME_RESLUT06_DETAIL;

	        //保存之前判断是否存在必填项没有填写，如果有则不提交
	        $scope.ME_RESLUT03IsOk = !$scope.pageData.ME_RESLUT03 || $scope.pageData.ME_RESLUT03 && Boolean($scope.pageData.ME_RESLUT03_ACTADDRESS);
	        $scope.ME_RESLUT04IsOk = !$scope.pageData.ME_RESLUT04 || $scope.pageData.ME_RESLUT04 && Boolean($scope.pageData.ME_RESLUT04_ACTLICENCE);
	        $scope.ME_RESLUT05IsOk = !$scope.pageData.ME_RESLUT05 || $scope.pageData.ME_RESLUT05 && Boolean($scope.pageData.ME_RESLUT05_NAME);
	        $scope.ME_RESLUT06IsOk = !$scope.pageData.ME_RESLUT06 || $scope.pageData.ME_RESLUT06 && Boolean($scope.pageData.ME_RESLUT06_DETAIL);

	        if ($scope.ME_RESLUT03IsOk && $scope.ME_RESLUT04IsOk && $scope.ME_RESLUT05IsOk && $scope.ME_RESLUT06IsOk) {
	            // 向后台发送数据
	            if (!postParams.me11Id) {
	                $rootScope.marketRecordHasChange = false;
	                appService.errorPopup("未登记,请点击基础信息登记进行登记", "温馨提示", function () {});
	                return;
	            }
	            console.log('=========================================================================');
	            console.log(postParams);
	            appService.requireForWMF(wmf, postParams, "RegieProExaminfoAdapter", "saveExamInfo02", function (data) {
	                $rootScope.marketRecordHasChange = false;
	                $scope.$emit("nextNavtigation", "marketInspectRecord.cigaretteManagement");
	                $state.go("marketInspectRecord.cigaretteManagement", {
	                    params: $stateParams.params
	                });
	            });
	        } else {
	            appService.errorPopup("有必填项未填,请检查并填写", "温馨提示", function () {});
	        }
	    };
	}]);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.controller("orderRectificationCtrl", ["$ionicHistory", "$scope", "$state", "initData", "$rootScope", "appService", "$stateParams", function ($ionicHistory, $scope, $state, initData, $rootScope, appService, $stateParams) {
					//保存责令整改的参数
					var keepSaveData = {};
					var me19Id = void 0; //用于打印
					$scope.$watch('$viewContentLoaded', function () {
									console.log(initData.result.list[0]);
									$scope.orderRectification = initData.result.list[0];
									me19Id = initData.result.list[0].ME19_ID;

									var _iteratorNormalCompletion = true;
									var _didIteratorError = false;
									var _iteratorError = undefined;

									try {
													for (var _iterator = Object.keys($scope.orderRectification)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
																	var i = _step.value;

																	if (/^ME_RESLUT\d+$/.test(i)) {
																					$scope.orderRectification[i] = Object.is($scope.orderRectification[i], "1") ? true : false;
																	}
													}
									} catch (err) {
													_didIteratorError = true;
													_iteratorError = err;
									} finally {
													try {
																	if (!_iteratorNormalCompletion && _iterator.return) {
																					_iterator.return();
																	}
													} finally {
																	if (_didIteratorError) {
																					throw _iteratorError;
																	}
													}
									}

									;

									//初始化遮罩是否打开
									if (initData.result.list.length != 0) {
													var markObj = appService.initNavigteMark(initData.result.list[0]);
													if (markObj.both) {
																	$scope.$emit("zlzgAryChange", 1);
																	$scope.$emit("xxdjbcAryChange", 1);
													} else if (markObj.licenceZlzg || markObj.cigaretteZlzg) {
																	$scope.$emit("zlzgAryChange", 1);
													} else if (markObj.xxdj) {
																	$scope.$emit("xxdjbcAryChange", 1);
													}
									}
									/*$scope.b = orderRectification.ME_RESLUT01;
	        $scope.a = orderRectification.ME_RESLUT03;*/
					});

					$scope.preview = '预览';
					$scope.keep = '保存';
					$scope.count = 0;
					// 点击切换文书函数
					$scope.focusIndex0 = true;
					$scope.focusIndex1 = false;
					$scope.focus = function () {
									$scope.focusIndex0 = !$scope.focusIndex0;
									$scope.focusIndex1 = !$scope.focusIndex1;
									$scope.count++;
									if ($scope.count % 2 == 0) {
													$scope.preview = '预览';
													$scope.keep = '保存';
									} else {
													$scope.preview = '编辑';
													$scope.keep = '打印';
													previewBook();
									}
					};

					//保存责令整改
					$scope.keepSave = function () {
									keepSaveData = {
													customername: $scope.orderRectification.CUSTOMERNAME,
													customerplace: $scope.orderRectification.CUSTOMERPLACE,
													meReslut01: $scope.orderRectification.ME_RESLUT01,
													meReslut03: $scope.orderRectification.ME_RESLUT03,
													meReslut04: $scope.orderRectification.ME_RESLUT04,
													meReslut07: $scope.orderRectification.ME_RESLUT07,
													meReslut08: $scope.orderRectification.ME_RESLUT08,
													meReslut09: $scope.orderRectification.ME_RESLUT09,
													meReslut10: $scope.orderRectification.ME_RESLUT10,
													regielicenceno: $scope.orderRectification.REGIELICENCENO,
													examdate: $scope.orderRectification.EXAMDATE
									};
									keepSaveData.meReslut18 = $scope.orderRectification.ME_RESLUT18; //许可证有效期过期
									keepSaveData.meReslut19 = $scope.orderRectification.ME_RESLUT19; //违反...请带好
									keepSaveData.meReslut20 = $scope.orderRectification.ME_RESLUT20; //违反《烟草专卖法》
									keepSaveData.meReslut21 = $scope.orderRectification.ME_RESLUT21; //中队留存
									keepSaveData.meReslut22 = $scope.orderRectification.ME_RESLUT22; //交办证窗口
									keepSaveData.me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;
									var _iteratorNormalCompletion2 = true;
									var _didIteratorError2 = false;
									var _iteratorError2 = undefined;

									try {
													for (var _iterator2 = Object.keys(keepSaveData)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
																	var i = _step2.value;

																	if (/^meReslut\d+$/.test(i)) {
																					keepSaveData[i] = Object.is(keepSaveData[i], true) ? "1" : "0";
																	};
													}
									} catch (err) {
													_didIteratorError2 = true;
													_iteratorError2 = err;
									} finally {
													try {
																	if (!_iteratorNormalCompletion2 && _iterator2.return) {
																					_iterator2.return();
																	}
													} finally {
																	if (_didIteratorError2) {
																					throw _iteratorError2;
																	}
													}
									}

									;
									if (jQuery(event.target).html() == '打印') {
													wmf.callNativeDelegateFunc(JSON.stringify({
																	"cmd": "cmd_printnotice",
																	"params": JSON.stringify({
																					"id": me19Id,
																					"type": "04",
																					"params": "{}"
																	})
													}), function (backData) {
																	console.log("打印调用成功");
																	console.log(backData);
													});
									} else {
													appService.requireForWMF(wmf, keepSaveData, "RegieProExaminfoAdapter", "saveRectifyList", function (data) {
																	console.log(data);
																	//物品登记未开放则提示需要签退
																	if ($rootScope.xxdjbcAry.length == 0) {
																					appService.confirmPopup("保存成功,是否签退", "签退询问通知").then(function (res) {
																									if (res) {
																													$state.go("marketInspect");
																													//等路由跳转结束再更新$ionicHistory
																													setTimeout(function () {
																																	//将首页作为市场情况的backView
																																	$ionicHistory.viewHistory().backView = $rootScope.homeView;
																													}, 1000);
																									}
																					});
																	} else {
																					$scope.$emit("nextNavtigation", "marketInspectRecord.goodsInformationRegistration");
																					$state.go("marketInspectRecord.goodsInformationRegistration", {
																									params: $stateParams.params
																					});
																	}
													});
									}
					};
					// 预览整改通知书方法
					var previewBookParms = {
									"me11Id": $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
					};
					var previewBook = function previewBook() {
									appService.requireForWMF(wmf, previewBookParms, "RegieProExaminfoAdapter", "getRectifyList", function (data) {
													console.log(data);
													$scope.previewDate = data.result.list[0];
													$scope.Hdate = data.result.list[0].EXAMDATE;
													$scope.Hdate_ch = data.result.list[0].EXAMDATE_CH;
									});
					};
	}]);

/***/ })
/******/ ]);