import appMoudle from "../../main/app"
/**
 * @descirbe:市场检查记录
 * @author:huran
 */
appMoudle.controller("marketInspectionRecordCtrl", ["$scope","initData","$stateParams", function($scope,initData,$stateParams) {
	/**
	 * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	 */
	$scope.$watch('$viewContentLoaded', function() {
        $scope.data = initData.result;
	});
}]);