import appMoudle from "../../main/app"

/**
 * @descirbe:经营信息
 * @author:gaoqian
 */

appMoudle.controller("businessInformationCtrl",["$scope","initData",function ($scope,initData) {
	    /**
	     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	     */
	    $scope.$watch('$viewContentLoaded', function() {
            $scope.storeData=initData.result[0];
	    });
}]);