"use strict";

var _app = require("../main/app");

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