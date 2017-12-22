import angularModule from "../../main/app"

/**
 * @description: headPopover自定义指令
 * @author yongyong
 */
angularModule.directive("headPopover",["$state",function ($state) {
    return{
        restrict:"EA",
        templateUrl:"app/directive/headPopover/headPopover.html",
        scope:{},
        controller:function ($scope) {
            $scope.goInspectors=function () {
                $state.go("mine");
            }
        }
    }
}]);