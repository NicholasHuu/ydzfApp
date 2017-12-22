import appMoudle from '../main/app';

appMoudle.controller("padHomeCtrl",["$ionicPopup","appService","$rootScope","$ionicNavBarDelegate","$scope","$state",
	function($ionicPopup,appService,$rootScope,$ionicNavBarDelegate,$scope,$state){
	var d=new Date();
    $scope.storeData1=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()

    /**
     * @description: 自定义nav-bar返回按钮行为
     */
    $rootScope.navBarClick = () =>{
        event.preventDefault();
        if($rootScope.signVal){
            $ionicPopup.confirm({
                template: `<i class="icon ion-alert-circled errorAlert"></i>
                            <div class="errorAlertCont">完成编辑,是否需要签退</div>`,
                cssClass: 'sign-popup',
                cancelText: '取消',
                cancelType: 'button-assertive',
                okText: '确定',
                okType: 'button-positive',
            }).then(res => {
                if(res){
                    appService.requireForWMF(wmf, {
                        "me20_id":$rootScope.signVal
                    }, "RegieProExaminfoAdapter", "mobSignOut", (data) => {
                        console.log("签退成功");
                        $rootScope.signVal = null;
                        $ionicNavBarDelegate.back();
                    });
                }else{
                    $ionicNavBarDelegate.back();
                }
            })
        }else{
            $ionicNavBarDelegate.back();
        }
    };
}]);