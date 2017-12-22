"use strict";

var _app = require("../main/app");

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