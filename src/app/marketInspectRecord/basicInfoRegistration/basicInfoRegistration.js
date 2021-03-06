import appMoudle from "../../main/app"
appMoudle.controller("basicInfoRegistrationCtrl", ["$scope", "initData", "$ionicNavBarDelegate", "$stateParams", "appService", "$state", "$rootScope",
    function($scope, initData, $ionicNavBarDelegate, $stateParams, appService, $state, $rootScope) {
    //市场检查情况页面有无更改，有更改则需保存后才能导航
    $rootScope.marketRecordHasChange=false;
    let postExaminer;
    // 路由参数
    let beforePage = JSON.parse($stateParams.params);

    /**
     * @description: 备注有修改,在离开页面时候提示是否需要保存
     */
    $scope.textAreaChange = () =>{
        $rootScope.marketRecordHasChange=true;
    };

    /**
     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
     */
    $scope.$watch('$viewContentLoaded', function() {
        $scope.examtypeName=JSON.parse($stateParams.params).examtypeName;//检查形式
        try{
            if(initData.result.examiner.length !=0){
                postExaminer = initData.result.examiner[0].EXAMINER; // 检查人员信息
            }
            if(initData.result.regielicence.length != 0){//专卖许可证相关信息
                $scope.dataRegielicence = initData.result.regielicence[0];
                //备注
                $scope.basicInfoRegistRemark =$scope.dataRegielicence.ME_REMARK;
                //营业时间
                $scope.businessTime =`${$scope.dataRegielicence.OPERATINGTIMEBEGIN}--${$scope.dataRegielicence.OPERATINGTIMEEND}`;
            }
            if(initData.result.peoples.length != 0){
                $scope.mobility = initData.result.peoples[0].POPULATIONMOBILITY//消费人群流动性:
            }
            //初始化遮罩是否打开
            if(initData.result.list.length != 0) {
                let markObj = appService.initNavigteMark(initData.result.list[0]);
                if(markObj.both || (markObj.licenceZlzg && markObj.xxdj)){
                    $scope.$emit("zlzgAryChange", 1);
                    $scope.$emit("xxdjbcAryChange", 1);
                }else if(markObj.licenceZlzg || markObj.cigaretteZlzg){
                    $scope.$emit("zlzgAryChange", 1);
                }else if(markObj.xxdj){
                    $scope.$emit("xxdjbcAryChange", 1);
                }
            }
        }catch(e) {
            console.log(e)
            appService.errorPopup("页面数据异常",false,() =>{$ionicNavBarDelegate.back()});
        }
    });

    /**
     * @description: 页面点击完成按钮事件
     */
    $scope.post_bacisRegis_parms = function() {
        //请求参数
        let postParms = {
            customername: $scope.dataRegielicence.CUSTOMERNAME,// 经营户名称"customername"
            customerplace: $scope.dataRegielicence.CUSTOMERPLACE,//经营地址"customerplace"
            mastername: $scope.dataRegielicence.MASTERNAME,//经营者姓名"mastername"
            sellsacreage: $scope.dataRegielicence.SELLSACREAGE,// 营业面积"sellsacreage"
            operatingtimebegin: $scope.dataRegielicence.OPERATINGTIMEBEGIN,//营业开始时间"operatingtimebegin"
            operatingtimeend: $scope.dataRegielicence.OPERATINGTIMEEND,//营业结束时间"operatingtimeend"
            alliancebusiness: $scope.dataRegielicence.ALLIANCEBUSINESSNAME,//加盟情况code "alliancebusiness"
            populationmobility:initData.result.peoples[0].POPULATIONMOBILITY,//消费人群流动性"populationmobility"
            examiner: postExaminer//检查人员信息"examiner":
        }
        postParms.examdate = beforePage.examdate;
        postParms.remark = $scope.basicInfoRegistRemark;
        postParms.me06Id = beforePage.me06_id;
        postParms.examtypecode = beforePage.examtypecode;
        postParms.menuCode =beforePage.menucode;
        postParms.regielicenceno = beforePage.regielicenceNo;

        //如果是通过点击扫码进店按钮进行的检查，保存成功后，进行签到操作
        if(Object.is($rootScope.scanRegielicenceno,JSON.parse($stateParams.params).regielicenceNo)){
            appService.signIn({
                "me11Id":data.result.me11Id,
                "examDate": $rootScope.examDate,
                "regielicenceno":$rootScope.scanRegielicenceno,
                "signType":'01'
            },data =>{
                //保存数据请求
                appService.requireForWMF(wmf, postParms, 'RegieProExaminfoAdapter', 'saveExamInfo01', (data) => {
                    //保存成功后，市场检查情况有修改标志变为false，可以进行导航切换与签退
                    $rootScope.marketRecordHasChange=false;
                    // 用返回data中me11Id,更新全局变量me11Id
                    $rootScope.me11Id = data.result.me11Id;

                    //页面默认路由跳转,延时为了避免多次触发子路由$viewContentLoaded;
                    $scope.$emit("nextNavtigation", "marketInspectRecord.licence");
                    $state.go("marketInspectRecord.licence", {
                        params: $stateParams.params
                    });
                });
            });
        }else{
            //保存数据请求
            appService.requireForWMF(wmf, postParms, 'RegieProExaminfoAdapter', 'saveExamInfo01', (data) => {
                //保存成功后，市场检查情况有修改标志变为false，可以进行导航切换与签退
                $rootScope.marketRecordHasChange=false;
                // 用返回data中me11Id,更新全局变量me11Id
                $rootScope.me11Id = data.result.me11Id;

                //页面默认路由跳转,延时为了避免多次触发子路由$viewContentLoaded;
                $scope.$emit("nextNavtigation", "marketInspectRecord.licence");
                $state.go("marketInspectRecord.licence", {
                    params: $stateParams.params
                });
            });
        }
    };
}]);