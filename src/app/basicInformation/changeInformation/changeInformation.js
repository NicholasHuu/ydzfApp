import appMoudle from "../../main/app"

/**
 * @description: 变更信息控制器
 * @author: huran
 */
appMoudle.controller("changeInformationCtrl", ["$scope","initData",
 function($scope,initData) {
    /**
     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
     */
    $scope.$watch('$viewContentLoaded', function() {
        $scope.storeData=initData.result;
    });
}]);