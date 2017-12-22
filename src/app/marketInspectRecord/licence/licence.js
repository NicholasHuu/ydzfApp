import appMoudle from "../../main/app"

/**
 * @description: 许可证登记控制器
 * @author: huran
 */
appMoudle.controller("licenceCtrl", ["$scope", "$state", "$stateParams", "initData", "$rootScope", "appService", "$ionicPopup", function($scope, $state, $stateParams, initData, $rootScope, appService, $ionicPopup) {
    //页面有无更改，有更改则需保存后才能导航标志
    $rootScope.marketRecordHasChange=false;
    //页面保存数据参数 发送给后台
    let postParams = {};
    //导航遮罩关闭标志对象
    let markObj ={
        both:false,
        licenceZlzg:false,
        cigaretteZlzg:false,
        xxdj:false
    };

    /**
     * @description: 条件开关处于正常条件下，清空其子条件状态
     * @param clickEle: 鼠标点击元素
     * @param handle: 开关下对应的子条件在保存对象中的属性值
     * @param inputAry: 开关下对应的输入框数组
     */
    let clearSubCondition = (clickEle,handle,inputAry) =>{
        jQuery(clickEle).parent().parent().find("span").removeClass("chooseSpan");
        if(handle){
            postParams[handle]='4'
        }
        //清空所输入文本框中的输入
        inputAry.map((item) =>{
            $scope.pageData[item] = '';
        });
        //第二个li特殊处理
        if('meReslut02Handle'==handle){
            jQuery(event.target).parent().parent().find("p").removeClass("chooseSpan");
        }
    };

    //初始化条件数组
    let zlzgAry = []

    /**
	 * @description: 点击条件开关时，根据条件开关的开闭状态，设置保存参数条件开关对应的状态值
	 * @param value: 开关状态条件值
     * @param resultIdx: 开关序号
     * @param handle: 开关下对应的子条件在保存对象中的属性值
     * @param inputAry: 开关下对应的输入框数组
     */
    $scope.checkChange=(value,resultIdx,handle,inputAry) =>{
    	//是否弹出提示保存弹框标志
        $rootScope.marketRecordHasChange=true;
        //根据开关的开闭，设置保存参数条件开关对应的状态值
        if(resultIdx == "meReslut01" || resultIdx == "meReslut03" || resultIdx == "meReslut04"){
            if(value){
                postParams[resultIdx] = '0'
                clearSubCondition(event.target,handle,inputAry);
            }else{
                postParams[resultIdx] = '1'
            }
        }else if((resultIdx == "meReslut05" || resultIdx == "meReslut06")){
            if(value){
                postParams[resultIdx] = '1'
            }else{
                postParams[resultIdx] = '0'
                clearSubCondition(event.target,handle,inputAry);
            }
        }else{//第二个条件开关特殊处理
            if(value){
                let chooseP = jQuery(event.target).parent().parent().find("p.chooseSpan");
                postParams[resultIdx] = chooseP.length == 0? '1':jQuery(event.target).parent().parent().find("p.chooseSpan").attr("data-meresult02");
            }else{
                postParams[resultIdx] = '0'
                clearSubCondition(event.target,handle,inputAry);
            }
        }
	};

	/**
	 * 得到初始化数据 并写入页面中
	 */
	$scope.$watch('$viewContentLoaded', function() {
		// 初始化页面,把后台的数据写到页面上
		if(initData.result.list.length != 0){
            $scope.pageData = initData.result.list[0];
		}else {
            $scope.pageData = appService.initLicenceAndCigaretteData;
		}

		//保留ME_RESLUT02,特殊处理页面许可证使用异常情况前三个选项
		(function (val) {
            $scope.meReslut02Val =val
        })($scope.pageData.ME_RESLUT02)

        // 将条件开关标志“0”，“1”转化为true,false
        appService.conditionFlagChange($scope.pageData,property =>{
            let propertyIndx =property.substr(property.length-2,2);
            if(parseInt(propertyIndx)<=4){
                postParams["meReslut"+propertyIndx] = $scope.pageData[property];
                postParams["meReslut"+propertyIndx+"Handle"] = $scope.pageData["ME_RESLUT"+propertyIndx+"_HANDLE"];
            }else if(parseInt(propertyIndx)<=6){
                postParams["meReslut"+propertyIndx] = $scope.pageData[property];
            }
        });

		//初始化责令整改条件数组
        setTimeout(() =>{
            $rootScope.zlzgAry = appService.initzlzgAry($rootScope.zlzgAry);
        },1000)

        //初始化遮罩是否打开
        if(initData.result.list.length != 0) {
            markObj = appService.initNavigteMark(initData.result.list[0]);
            console.log(markObj)
            if(markObj.both || (markObj.licenceZlzg && markObj.xxdj)){
                $scope.$emit("zlzgAryChange", 1);
                $scope.$emit("xxdjbcAryChange", 1);
            }else if(markObj.licenceZlzg || markObj.cigaretteZlzg){
                $scope.$emit("zlzgAryChange", 1);
            }else if(markObj.xxdj){
                $scope.$emit("xxdjbcAryChange", 1);
            }
        }
	});

	/**
	 * @description: 生成条件选择数组，用于控制左边导航栏后三个导航项是否遮罩
	 * @param ele: 点击的元素
	 * @param ary:条件数组
	 */
	let conditionAryCreate = (ele, ary) => {
		//如果条件项已经被选中，则取消选中，反之选中
		if (jQuery(ele).hasClass("chooseSpan")) {
			//选中项变不选中，并将该选择项从条件数组删除
			jQuery(ele).removeClass("chooseSpan");
			ary.find((value, index, arr) => {
				if (Object.is(value, ele)) {
					arr.splice(index, 1);
				}
			})
		} else {
			//操作同上相反
			jQuery(ele).addClass("chooseSpan");
			ary.push(ele);
		}
	};

    $scope.meReslut02Click = function() {
        //是否弹出提示保存弹框标志
        $rootScope.marketRecordHasChange=true;
        if(jQuery(event.target).attr("data-meresult02")){
            jQuery(event.currentTarget).find("p[data-meresult02]").removeClass("chooseSpan");
            jQuery(event.target).addClass('chooseSpan');
            postParams.meReslut02 = jQuery(event.target).attr("data-meresult02");
        }
    };

    /**
	 * @description: 条件项点击事件
	 */
	$scope.chooseCondition = () => {
        //是否弹出提示保存弹框标志
        $rootScope.marketRecordHasChange=true;
		let conditionnName = jQuery(event.target).html();
		let conditionEle = event.target.tagName;

		//点击'要求经营户整改'控制左侧'责令整改'导航项是否遮罩
		if (Object.is(conditionnName, "要求经营户整改")) {
			conditionAryCreate(event.target, $rootScope.zlzgAry);
			if(!markObj.both || !markObj.cigaretteZlzg){
                $scope.$emit("zlzgAryChange", $rootScope.zlzgAry.length)
            }
		} else {
			//点击其他条件项不执行任何操作
			if (Object.is(conditionEle, "SPAN")) {
				jQuery(event.target).hasClass("chooseSpan") ? jQuery(event.target).removeClass("chooseSpan") : jQuery(event.target).addClass("chooseSpan");
			}
			return;
		}
	};

	// 点击保存，向后台发送数据方法
	$scope.postData = function() {
		postParams.me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;
        postParams.meReslut01Handle = appService.initHandleVal('meReslut01Handle');
        postParams.meReslut02Handle = appService.initHandleVal('meReslut02Handle');
        postParams.meReslut03Handle = appService.initHandleVal('meReslut03Handle');
        postParams.meReslut04Handle = appService.initHandleVal('meReslut04Handle');
        postParams.meReslut05Cardno = $scope.pageData.ME_RESLUT05_CARDNO;
        postParams.meReslut05City = '';
        postParams.meReslut03Actaddress = $scope.pageData.ME_RESLUT03_ACTADDRESS;
        postParams.meReslut04Actlicence = $scope.pageData.ME_RESLUT04_ACTLICENCE;
        postParams.meReslut05Name = $scope.pageData.ME_RESLUT05_NAME;
        postParams.meReslut05Phone = $scope.pageData.ME_RESLUT05_PHONE;
        postParams.meReslut05Province = $scope.pageData.ME_RESLUT05_PROVINCE;
        postParams.meReslut06Detail = $scope.pageData.ME_RESLUT06_DETAIL;

		//保存之前判断是否存在必填项没有填写，如果有则不提交
        $scope.ME_RESLUT02IsOk = postParams.meReslut02 != '1';
		$scope.ME_RESLUT03IsOk = !$scope.pageData.ME_RESLUT03 || ($scope.pageData.ME_RESLUT03 && Boolean($scope.pageData.ME_RESLUT03_ACTADDRESS));
		$scope.ME_RESLUT04IsOk = !$scope.pageData.ME_RESLUT04 || ($scope.pageData.ME_RESLUT04 && Boolean($scope.pageData.ME_RESLUT04_ACTLICENCE));
		$scope.ME_RESLUT05IsOk = !$scope.pageData.ME_RESLUT05 || ($scope.pageData.ME_RESLUT05 && Boolean($scope.pageData.ME_RESLUT05_NAME));
		$scope.ME_RESLUT06IsOk = !$scope.pageData.ME_RESLUT06 || ($scope.pageData.ME_RESLUT06 && Boolean($scope.pageData.ME_RESLUT06_DETAIL));

		if($scope.ME_RESLUT03IsOk && $scope.ME_RESLUT04IsOk && $scope.ME_RESLUT05IsOk && $scope.ME_RESLUT06IsOk && $scope.ME_RESLUT02IsOk){
			// 向后台发送数据
			if(!postParams.me11Id){
                $rootScope.marketRecordHasChange=false;
                appService.errorPopup("未登记,请点击基础信息登记进行登记","温馨提示",()=>{});
                return;
			}
            console.log('=========================================================================')
			console.log(postParams)
            appService.requireForWMF(wmf, postParams, "RegieProExaminfoAdapter", "saveExamInfo02", (data) => {
                $rootScope.marketRecordHasChange=false;
                $scope.$emit("nextNavtigation", "marketInspectRecord.cigaretteManagement");
                $state.go("marketInspectRecord.cigaretteManagement", {
                    params: $stateParams.params
                });
            })
		}else{
            appService.errorPopup("有必填项未填,请检查并填写","温馨提示",()=>{})
		}
	};
}]);