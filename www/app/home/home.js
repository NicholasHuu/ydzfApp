"use strict";

var _app = require("../main/app");

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