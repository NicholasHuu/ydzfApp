import appMoudle from "../../main/app"

appMoudle.controller("violationRecordCtrl", ["$scope", "initData", function($scope, initData) {
	/**
	 * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
	 */
	$scope.$watch('$viewContentLoaded', function() {
		$scope.data = initData.result;
	});
}]);