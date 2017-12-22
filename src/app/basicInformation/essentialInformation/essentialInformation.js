import appMoudle from "../../main/app"

/**
 * @describe:基本信息控制器
 * @author:yangyong
 */
appMoudle.controller("essentialInformationCtrl",["$scope","$state","$stateParams","initData",
    function ($scope,$state,$stateParams,initData) {
    //页面数据请求参数
    let params = {
        "licencedataId":JSON.parse($stateParams.params).licenceId,
        "regielicenceno":JSON.parse($stateParams.params).regielicenceNo
    };
    /**
     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
     */
    $scope.$on('$viewContentLoaded', function(event) {
        console.log(initData.result);
        $scope.storeData=initData.result.basicList[0];
        $scope.storeData1=initData.result.lastData[0];
        $scope.storeData2=initData.result.oneManCon[0];
    });
}]);