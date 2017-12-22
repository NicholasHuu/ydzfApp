"use strict";

var _app = require("../../main/app");

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