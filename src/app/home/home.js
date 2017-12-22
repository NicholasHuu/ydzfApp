import appMoudle from '../main/app';

/**
 * @describe: 首页控制器
 * @author: yangyong
 */
appMoudle.controller("homeCtrl",["appService","$ionicNavBarDelegate","$scope","initData","$ionicHistory", "$rootScope",
    function(appService,$ionicNavBarDelegate,$scope,initData,$ionicHistory,$rootScope){
    //初始化责令整改和物品登记是否遮罩标记数组
    $rootScope.zlzgAry = [];
    $rootScope.xxdjbcAry = [];

    /**
     * @description: 自定义nav-bar返回按钮行为
     */
    $rootScope.navBarClick = () =>{
        event.preventDefault();
        //有编辑未保存，返回时候需要询问是否保存
        if($rootScope.marketRecordHasChange){
            this.confirmPopup("温馨提示","否","是","检查未保存,是否返回",()=>{
                $rootScope.marketRecordHasChange=false;
                //离店签退提示
                new Promise((resolve,reject) =>{
                    appService.signOut(resolve,reject)
                }).then(() =>{$ionicNavBarDelegate.back()}).catch(e=>{});
            },() =>{});
        }else{
            new Promise((resolve,reject) =>{
                appService.signOut(resolve,reject)
            }).then(() =>{$ionicNavBarDelegate.back()}).catch(e=>{});
        }
    };

    /**
     * @describe: 页面加载完进行相关初始化操作
     */
    $scope.$watch('$viewContentLoaded', () => {
        //页面数据初始化
        console.log(initData.result);
        $scope.storeData=initData.result[0];
        var d=new Date();
        $scope.storeData1=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
        //获取当前的view,用于签退时设置返回view,为首页
        $rootScope.homeView = $ionicHistory.currentView()
    });

    /**
     * @describe 首页右侧按钮菜单显示与影藏
     */
    $scope.moreButtonShow=false;
    $scope.moreButton=() => {
        $scope.moreButtonShow=$scope.moreButtonShow?false:true;
    };
    //页面滚动隐藏首页右侧按钮菜单
    $scope.scrollHidePopver=() => {
        $scope.moreButtonShow=false;
        $scope.$apply();
    };

}]);
