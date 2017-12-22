import appMoudle from "../../main/app"

/**
 * @descirbe:违法记录
 * @author:gaoqian
 */

appMoudle.controller("illegalRecordCtrl", ["$scope", "initData",function($scope,initData) {
		    /**
		     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
		     */
		    $scope.$watch('$viewContentLoaded', function() {
		    	console.log(initData.result[0]);
                $scope.storeData=initData.result[0];
		    });
}]);