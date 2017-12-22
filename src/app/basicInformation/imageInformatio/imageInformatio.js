import appMoudle from "../../main/app"

/**
 * @describe:形象信息
 * @author:yangyong
 */
appMoudle.controller("imageInformatioCtrl",["$scope","initData", function ($scope,initData) {

    $scope.$watch('$viewContentLoaded', function() {
        console.log(initData.result.placephoto)
        $scope.a=initData.result.placephoto;
    });
}]);