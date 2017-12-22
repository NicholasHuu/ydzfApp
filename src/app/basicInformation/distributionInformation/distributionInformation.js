import appMoudle from "../../main/app"

appMoudle.controller("distributionInformationCtrl", ["$scope","initData", function($scope,initData) {
	
	$scope.$watch('$viewContentLoaded', function() {
        $scope.storeData=initData.result[0];
	});

}]);