import appMoudle from "../../main/app"

appMoudle.controller("nearbyCtrl", ["$scope", "$state", "initData", function($scope, $state, initData) {
	$scope.$watch('$viewContentLoaded', function() {
		/*
		result
		nearRegList
		exam
		CUSTOMERNAME
		CUSTOMERPLACE
		DISTANCE
		ME11_ID
		ME20_ID
		REGIELICENCENO
		*/
		console.log(initData.result.nearRegList);
		$scope.storeData = initData.result.nearRegList;
	});
	$scope.planListClick = function() {
		$state.go("basicInformation")
	}
}]);