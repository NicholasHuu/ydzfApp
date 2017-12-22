import appMoudle from "../main/app"

/**
 * @describe: 市场检查控制器
 * @author: yangyong
 */
appMoudle.controller("marketInspectCtrl", ["$scope", "$state","$stateParams","$rootScope","appService",function($scope, $state,$stateParams,$rootScope,appService) {
    let nowTime = $rootScope.examDate?$rootScope.examDate.split("-"):appService.dateFtt("yyyy-MM-dd",new Date()).split("-");
    //左侧导航项数组
    const navigationMenu = [{
        menuName: "计划内",
        uiState: "marketInspect.insideThePlan"
    }, {
        menuName: "计划外",
        uiState: "marketInspect.outsideThePlan"
    }, {
        menuName: "附近",
        uiState: "marketInspect.nearby"
    }];
    $scope.navigationMenu=navigationMenu;

    //导航项复制数组,用于动态修改导航项个数
    let copyNavigationMenu = [...navigationMenu];

    /**
     * @description: 导航项点击路由跳转函数
     */
    $rootScope.menuCode="0";
    $rootScope.examDate;
    $scope.navigationClick = function () {
        //导航项配置了路由状态，则跳转
        if (jQuery(event.target).attr("data-menuState")){
            jQuery(event.target).css("background-color", "white");
            jQuery(event.target).siblings().css("background-color", "#FFF5EE");
            switch(jQuery(event.target).attr("data-menuState")){
                    case "marketInspect.insideThePlan":$rootScope.menuCode="0";break;
                    case "marketInspect.outsideThePlan":$rootScope.menuCode="1";break;
            };
            $state.go(jQuery(event.target).attr("data-menuState"),{
                params: JSON.stringify({
                    menuCode:$rootScope.menuCode,
                    examDate:$rootScope.examDate,
                })
            });  
        }
    }

    /**
     * @description: 页面加载完毕，进行相关操作
     */
    $scope.$watch('$viewContentLoaded', function() {
        if(new Date().getTime()- new Date(nowTime[0],parseInt(nowTime[1])-1,nowTime[2]).getTime() >1000*60*60*24){
            jQuery("#yesterdayBtn").attr("disabled",true);
            jQuery("#yesterdayBtn").css("color","#D3CBC4");
        }else if(new Date(nowTime[0],parseInt(nowTime[1])-1,nowTime[2]).getTime()-new Date().getTime() > 1000*60*60){
            jQuery("#tomorrowBtn").attr("disabled",true);
            jQuery("#tomorrowBtn").css("color","#D3CBC4");
        }
        //页面底部时间控件日期初始化
        $rootScope.examDate=appService.dateFtt("yyyy-MM-dd",new Date(nowTime[0],parseInt(nowTime[1])-1,nowTime[2]));
        $scope.storeData2=$rootScope.examDate;
        //页面默认子路由跳转至计划内
        $state.go("marketInspect.insideThePlan",{
            params: JSON.stringify({
                menuCode:"0",
                examDate:$rootScope.examDate
            })
        });
    });

    /**
     * @describe:前一天点击事件
     */
    let commonDate = new Date(nowTime[0],parseInt(nowTime[1])-1,nowTime[2]);;//公共日期，当前选择的日期
    $scope.yesterdayClick=function(){
        let changeTime=new Date(commonDate.getFullYear(),commonDate.getMonth(),commonDate.getDate()-1)//昨天
        let changeTime1 = new Date(commonDate.getFullYear(),commonDate.getMonth(),commonDate.getDate()-3);//今天是周一，昨天就是上周五
        let dayTime=commonDate.getDay();//星期
        //如果是周一,就跳转到上周五
        if(dayTime==1){
            $rootScope.examDate=appService.dateFtt("yyyy-MM-dd",changeTime1);
            commonDate=changeTime1
        }else {
            $rootScope.examDate=appService.dateFtt("yyyy-MM-dd",changeTime);
            commonDate=changeTime
        }

        //如果时间和当天相同
        if(Object.is(new Date().getDate(),commonDate.getDate())){
            //如果时间和当天相同，时间控件左右两个日期选择按钮都可点击
            jQuery(event.target).parent().find("button").attr("disabled",false);
            jQuery(event.target).parent().find("button").css("color","white");
            //如果时间和当天相同，计划内/外/附近，三个导航按钮全部显示
            $scope.navigationMenu=copyNavigationMenu;
        }else{
            //如果是昨天，时间控件左侧日期选择按钮禁用
            jQuery(event.target).attr("disabled",true)
            jQuery(event.target).css("color","#D3CBC4");
            //如果是昨天，则只显示计划内/外两个导航按钮
            copyNavigationMenu.splice(2,1);
            $scope.navigationMenu=copyNavigationMenu;
            copyNavigationMenu = [...navigationMenu];
        }
        //更新显示日期
        $scope.storeData2=$rootScope.examDate;
        $state.go("marketInspect.insideThePlan",{
            params: JSON.stringify({
                    menuCode:$rootScope.menuCode,
                    examDate:$rootScope.examDate,
                })
        });
    };

    /**
     * @description: 点击后一天时间选择按钮
     */
    $scope.tomorrowClick=function(){
        let changeTime=new Date(commonDate.getFullYear(),commonDate.getMonth(),commonDate.getDate()+1)//明天
        let changeTime1 = new Date(commonDate.getFullYear(),commonDate.getMonth(),commonDate.getDate()+3);//如果今天是周五,明天就是下周一
        let dayTime=commonDate.getDay();
        //如果今天是周五,后天就是下周一
        if(dayTime==5){
            $rootScope.examDate=appService.dateFtt("yyyy-MM-dd",changeTime1);
            commonDate = changeTime1;
        }else{
            $rootScope.examDate=appService.dateFtt("yyyy-MM-dd",changeTime);
            commonDate = changeTime;
        }

        //时间和当天相同
        if(Object.is(new Date().getDate(),commonDate.getDate())){
            //如果时间和当天相同，时间控件左右两个日期选择按钮都可点击
            jQuery(event.target).parent().find("button").css("color","white");
            jQuery(event.target).parent().find("button").attr("disabled",false);
            //如果时间和当天相同，计划内/外/附近，三个导航按钮全部显示
            $scope.navigationMenu=copyNavigationMenu;
        }else{
            //如果是后天，时间控件右侧日期选择按钮禁用
            jQuery(event.target).attr("disabled",true)
            jQuery(event.target).css("color","#D3CBC4");
            //如果是后天，则只显示计划内导航按钮
            copyNavigationMenu.splice(1,2);
            $scope.navigationMenu=copyNavigationMenu;
            copyNavigationMenu = [...navigationMenu];
        }

        $scope.storeData2=$rootScope.examDate;
        $state.go("marketInspect.insideThePlan",{
            params: JSON.stringify({
                    menuCode:$rootScope.menuCode,
                    examDate:$rootScope.examDate,
                })
        });
    };

    /**
     * @description: 扫码进店点击事件
     */
    $scope.scanCode=function () {
        appService.callNative({"cmd":"cmd_scan","params":{"data":"测试"}},backData =>{
            //通过扫描到的许可证查询相关信息，作为路由参数进行传递
            appService.requireForWMF(wmf,{
                "menuCode":'2',
                "examDate": $rootScope.examDate,
                "regielicenceno":JSON.parse(backData).params.data
            },'RegieProExaminfoAdapter','getExamInfoList',data =>{
                let paramsVal={
                    regielicenceNo:JSON.parse(backData).params.data,
                    me06_id:data.result.list.ME06_ID?data.result.list.ME06_ID:'',
                    me11_id:data.result.list.ME11_ID?data.result.list.ME11_ID:'',
                    examdate:$rootScope.examDate,
                    examtypecode:data.result.exam[0].EXAMTYPE,
                    examtypeName:data.result.exam[0].EXAMTYPENAME
                };
                //跳转至基础信息查询
                $state.go("basicInformation",{params:JSON.stringify(paramsVal)});
            });
            //将扫描到的许可证作为全局属性值保存，用于在市场检查情况页面判断是否需要签到提醒
            $rootScope.scanRegielicenceno=JSON.parse(backData).params.data;




            //判断路由参数中的许可证是否签到过
            /*let p = new Promise((resolve, reject) =>{
                appService.requireForWMF(wmf, {
                    "regielicenceno":JSON.parse(backData).params.data
                }, "RegieProExaminfoAdapter", "getSignInfo", data => {
                    if(data.result.signInfo.length ==1){
                        //签到成功后返回的me20Id，用于签退
                        $rootScope.signVal=data.result.signInfo[0].me20Id;
                        reject();//已经签到
                    }else{
                        resolve()//未签到
                    }
                });
            });

            p.then(() =>{

            }).catch(e =>{
                appService.errorPopup("有未离店商户,请先离店","温馨提示",() =>{});
            })*/
        });
    }
}]);