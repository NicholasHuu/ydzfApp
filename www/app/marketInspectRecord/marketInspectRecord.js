"use strict";

var _app = require("../main/app");

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