import appMoudle from "../../main/app"

/**
 * @descirbe:计划内控制器
 * @author:yangyong
 */
appMoudle.controller("insideThePlanCtrl",["$scope","$state","initData","$stateParams","$rootScope",
    function ($scope,$state,initData,$stateParams,$rootScope) {
    /**
     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
     */
    $scope.$watch('$viewContentLoaded', function() {
      console.log(initData.result.searchInPlan);
        $scope.storeData=initData.result.searchInPlan;
    });
    /**
     * @describe:页面列表项点击事件
     */
   $scope.insideplanClick=function () {
       //获取licenceId值，用于基础信息查询
       let paramsVal={
           regielicenceNo:jQuery(event.currentTarget).attr("data-regielicenceno"),
           me05_id:jQuery(event.currentTarget).attr("data-me05_id"),
           me06_id:jQuery(event.currentTarget).attr("data-me06_id"),
           me11_id:jQuery(event.currentTarget).attr("data-me11ID"),
           examtypecode:jQuery(event.currentTarget).attr("data-examtypecode"),
           examtypeName:jQuery(event.currentTarget).attr("data-examtypeName"),
           examdate:$rootScope.examDate,
           menucode:$rootScope.menuCode,
       };
       $rootScope.scanRegielicenceno = null;
       $state.go("basicInformation",{params:JSON.stringify(paramsVal)});
   };
}]);