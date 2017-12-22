"use strict";

var _app = require("../../main/app");

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