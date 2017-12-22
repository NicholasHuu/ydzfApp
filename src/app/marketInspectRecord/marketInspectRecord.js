import appMoudle from "../main/app"

/**
 * @description: 市场检查情况控制器
 * @author yangyong
 */
appMoudle.controller("marketInspectRecordCtrl", ["$ionicLoading","$scope", "$state", "$ionicHistory", "$ionicPopup", "$stateParams", "$rootScope","appService",
    function($ionicLoading,$scope, $state, $ionicHistory, $ionicPopup, $stateParams,$rootScope,appService) {
    //左侧导航项初始化
    $scope.navigationMenu = [{
        menuName: "基础信息登记",
        uiState: "marketInspectRecord.basicInfoRegistration"
    }, {
        menuName: "许可证使用情况",
        uiState: "marketInspectRecord.licence"
    }, {
        menuName: "卷烟经营情况",
        uiState: "marketInspectRecord.cigaretteManagement"
    }, {
        menuName: "责令整改",
        uiState: "marketInspectRecord.orderRectification",
        hasZH: true
    }, {
        menuName: "物品信息登记",
        uiState: "marketInspectRecord.goodsInformationRegistration",
        hasZH: true
    }, {
        menuName: "文书生成",
        uiState: "marketInspectRecord.documentsGenerated",
        hasZH: true
    }];

    /**
     * @description: 导航项点击事件
     */
    $scope.navigationClick = function() {
        if($rootScope.marketRecordHasChange){
            appService.errorPopup("有信息未保存,请保存",'温馨提示')
            return;
        }
        if (jQuery(event.target).hasClass("nav-zh") || jQuery(event.target).hasClass("navigationContrain")) {
            return;
        }
        jQuery(event.target).css("background-color", "white");
        jQuery(event.target).siblings().css("background-color", "#FFF5EE");
        $state.go(jQuery(event.target).attr("data-menuState"), {
            params: $stateParams.params
        });
    };

    /**
     * @description: 页面加载成功后初始化操作
     */
    $scope.$watch('$viewContentLoaded', function() {
        if(!$rootScope.scanRegielicenceno){
            $ionicPopup.confirm({
                template: `<div style="width: 50px;height: 50px;margin: 0 auto;border: 1px solid #CCCCCC">
                                <img ng-src="img/sign" alt="" style="width: 50px;height: 50px;">
                            </div>
                            <div>请先扫码后方可继续登记</div>`,
                cssClass: 'sign-popup',
                cancelText: '无法扫码',
                cancelType: 'button-assertive',
                okText: '扫码继续',
                okType: 'button-positive',
            }).then(res =>{
                //扫码继续点击事件
                if(res){
                    //扫码签到
                    appService.callNative({"cmd":"cmd_scan","params":{"data":"测试"}},backData =>{
                        appService.signIn({
                            "me11Id":JSON.parse($stateParams.params).me11_id?JSON.parse($stateParams.params).me11_id:null,
                            "examDate": $rootScope.examDate,
                            "regielicenceno":JSON.parse(backData).params.data,
                            "signType":'01'
                        },data =>{
                            //页面默认路由跳转
                            $state.go("marketInspectRecord.basicInfoRegistration", {
                                params: $stateParams.params
                            });
                        });
                    });
                }else{
                    //无法扫码签到
                    appService.signIn({
                        "me11Id":JSON.parse($stateParams.params).me11_id?JSON.parse($stateParams.params).me11_id:null,
                        "examDate": $rootScope.examDate,
                        "regielicenceno":JSON.parse($stateParams.params).regielicenceNo,
                        "signType":'02'
                    },data =>{
                        //页面默认路由跳转
                        $state.go("marketInspectRecord.basicInfoRegistration", {
                            params: $stateParams.params
                        });
                    });
                }
            })
        }
    });

    /**
     * @description: 签退
     */
    $scope.mobSignOut = () =>{
        appService.signOut().then(() =>{
            $ionicHistory.back();
        }).catch(e =>{});
    };

    /**
     * @description: 责令整改导航标志是否具有遮罩监听
     */
    $scope.$on("zlzgAryChange", (event, data) => {
        $scope.navigationMenu[3].hasZH = data == 0?true:false;
    });

    /**
     * @description: 物品信息登记与文书生成是否有遮罩监听
     */
    $scope.$on("xxdjbcAryChange", (event, data) => {
        $scope.navigationMenu[4].hasZH = data == 0?true:false;
        $scope.navigationMenu[5].hasZH = data == 0?true:false;
    });

    /**
     * @description: 导航标签被点选样式修改监听
     */
    $scope.$on("nextNavtigation",(event,data) => {
        if(Object.is(data,'marketInspectRecord.licence')){
            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(2)").css("background-color", "white");
        }else if(Object.is(data,'marketInspectRecord.cigaretteManagement')){
            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(3)").css("background-color", "white");
        }else if(Object.is(data,'marketInspectRecord.orderRectification')){
            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(4)").css("background-color", "white");
        }else if(Object.is(data,'marketInspectRecord.goodsInformationRegistration')){
            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(5)").css("background-color", "white");
        }else if(Object.is(data,'marketInspectRecord.documentsGenerated')){
            jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
            jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(6)").css("background-color", "white");
        }else if(Object.is(data,'marketInspectRecord.documentPreview')){
            $state.go("marketInspectRecord.documentPreview", {
                params: $stateParams.params
            });
            //避免重复生成文书预览导航标签
            if($scope.navigationMenu.length <7){
                $scope.navigationMenu.push({
                    menuName: "文书预览",
                    uiState: "marketInspectRecord.documentPreview",
                    hasZH: false
                });
            }
            //等待文书预览标签生成后，添加被点选样式
            setTimeout(() =>{
                jQuery(jQuery(".navigationContrain")[0]).children().css("background-color", "#FFF5EE");
                jQuery(jQuery(".navigationContrain")[0]).find(">div:nth-child(7)").css("background-color", "white");
            },500)
        }
    })
}]);