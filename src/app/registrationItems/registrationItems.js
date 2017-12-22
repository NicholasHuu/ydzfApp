import appMoudle from '../main/app';

appMoudle.controller("registrationItemsCtrl",["$scope","$state","$stateParams","initData","$rootScope","appService","$ionicPopup",
	function($scope,$state,$stateParams,initData,$rootScope,appService,$ionicPopup){
	//扫码后点击保存按钮时，向后台发送的参数对象
	let postGoods = {};
	let goodId;
	let postGoods1={};
	//删除登记对象的数据发送的参数对象
	let runningWater1={};
	//点击新增中的保存按钮传递的参数
	let addSaveRegis1={};
	let inputValueLen = 0;
	let inputValue1Len =0;

	$scope.code = {inputValue1:'',inputValue:''}
	$scope.addRegis0 = true
	$scope.$watch('$viewContentLoaded', function() {
		console.log(initData);
		if(initData.result.unLogout.length !=0){
			$scope.me11Id=initData.result.unLogout[0].ME11_ID;
			$scope.customName=initData.result.unLogout[0].CUSTOMERNAME;
		}
		//judge 判断是真品或者假品 来决定单价是否可操作
		$scope.judge = true;
		//默认条码，规格,性质，总价四个输入框可以编辑
		$scope.dis = true;
		$scope.disNone=false;
	});
	
	let choosedObj = null;
	// 点击选择“卷烟性质”为真品或者假品
	$scope.goodkind = '真品';
	let goodkindId = '01';
	/**
	 * @param value: checkbox的值
	 */
	//扫封箱码
	$scope.inputChange=(value)=>{
		value =value.slice(inputValueLen);
		$scope.code.inputValue = value;
		try {
			appService.requireForWMF(wmf,{
				me11Id:initData.result.unLogout[0].ME11_ID,
				boxSq:value,
			}, "RegieProExaminfoAdapter", "registerBox", (data) => {
				console.log(data);
				$scope.ca54Id = data.result.ca54Id;
				$scope.dealgoodsId = data.result.dealgoodsId;
				$scope.sealBoxNumber = data.result.serialno;
				$scope.inputVal=data.result.ca55GoodsList;
				$scope.countbox=data.result.countBox[0];
				$scope.countcus=data.result.countCus[0];
			})
		} catch(e) {
			appService.errorPopup("封箱码扫描无结果",'温馨提示')
		}

		inputValueLen = value.length;
	};

	var myPopup = () =>{
		$ionicPopup.show({
			templateUrl: 'app/registrationItems/popup_0.html',
			title: '<div class="popupHead">选择卷烟性质</div>',
			scope: $scope,
			buttons: [{
				text: '完成',
				type: 'button-positive',
				onTap: function(e) {
					$scope.goodkind = choosedObj.html();
					goodkindId = choosedObj.attr('data-code');
					// 判断后台返回的真假烟的判定结果开始
					if($scope.sweepData){
						$scope.sweepData.BASE_GOODS_BARCODE="";
						$scope.sweepData.BASE_GOODS_NAME="";
						$scope.sweepData.GOODSTYPENAME="";
						$scope.sweepData.BASE_GOODS_PRICE="";
						$scope.sweepData.GOODSCOUNT="";	
					}
					$scope.code.inputValue1="";
					$scope.judge = Object.is(goodkindId, '01') ? true : false;
				}
			}]
		});
	}


	// 卷烟性质弹框showPopup_0函数
	$scope.showPopup_0 = function() {
		// 向后台查询真假品列表数据，渲染进弹框中
		appService.requireForWMF(wmf, {}, "RegieProExaminfoAdapter", "goodsKindtype", (data) => {
			$scope.geTypeList = data.result.typeList;
			// $scope.data = {}
			// 自定义弹窗
			myPopup();
		});
	};

	// 选择卷烟性质中的一条，写入页面中
	$scope.choiceType = function() {
		jQuery(event.target).css('background', 'yellow');
		jQuery(event.target).siblings().css('background', 'white');
		choosedObj = jQuery(event.target)
	};
	//扫条形码
	$scope.inputChange1=(value)=>{
		if($scope.code.inputValue.length!=0){
			value =value.slice(inputValue1Len);
			$scope.code.inputValue1 = value;
			if(value.length == 13){
				try{
				appService.requireForWMF(wmf, {
					goodsbarcode:value
				}, "RegieProExaminfoAdapter", "getBaseGoodsList", (data) => {
					console.log(data);
					if(data.result.baseGoodslist.length == 0){
						$scope.showConfirm();
					}else{
						$scope.sweepData=data.result.baseGoodslist[0];
						$scope.dis = true;
						postGoods={
							baseGoodsBarcode:$scope.sweepData.BASE_GOODS_BARCODE,
							baseGoodsName:$scope.sweepData.BASE_GOODS_NAME,
							goodstypename:$scope.sweepData.GOODSTYPENAME,
							goodsprice:$scope.sweepData.BASE_GOODS_PRICE,
							baseGoodsId:$scope.sweepData.BASE_GOODS_ID,
							goodscount:$scope.sweepData.GOODSCOUNT,
						};
						$scope.saveGoods();
					}	
				})
				}catch(e) {
					appService.errorPopup("封箱码扫描无结果",'温馨提示')
				}
			}
			
							
		}else{
			appService.errorPopup("请先扫描封箱编码", "温馨提示");
			$scope.code.inputValue1='';
		}
		inputValue1Len = value.length;
	}

	//点击搜索条形码
	$scope.searchGoodInfo =(value) =>{
		appService.requireForWMF(wmf, {
			goodsbarcode:value
		}, "RegieProExaminfoAdapter", "getBaseGoodsList", (data) => {
			console.log(data);
			if(data.result.baseGoodslist.length == 0){
				appService.confirmPopup("条码搜索无结果,是否新增",() =>{
					$scope.disNone=true;
					$scope.addRegis0 = false;
					$scope.addRegis = true;
					$scope.addRegis3 = false;
					$scope.code.inputValue1 ='';
				},()=>{});
			}else{
				$scope.sweepData=data.result.baseGoodslist[0];
				$scope.dis = true;
				postGoods={
					baseGoodsBarcode:$scope.sweepData.BASE_GOODS_BARCODE,
					baseGoodsName:$scope.sweepData.BASE_GOODS_NAME,
					goodstypename:$scope.sweepData.GOODSTYPENAME,
					goodsprice:$scope.sweepData.BASE_GOODS_PRICE,
					baseGoodsId:$scope.sweepData.BASE_GOODS_ID,
					goodscount:$scope.sweepData.GOODSCOUNT,
				};
				$scope.saveGoods();
				$scope.code.inputValue1 ='';
			}	
		})
	}


	//扫条形码直接保存数据
	$scope.saveGoods=function(){
		postGoods.ca54Id=$scope.ca54Id;
		postGoods.dealgoodsId=$scope.dealgoodsId;
		postGoods.goodskind=goodkindId;
		postGoods.me11Id=$scope.me11Id;
		appService.requireForWMF(wmf, postGoods, "RegieProExaminfoAdapter", "registerGoods", (data) => {
			if (data.result.message == '登记成功') {
				console.log(data);
				if(data.result.ca55GoodsList.length !=0){
					goodId=data.result.ca55GoodsList[0].CA55_ID;
					$scope.countbox=data.result.countBox[0];
					$scope.countcus=data.result.countCus[0];
				}
			
				$scope.dis = true;
				$scope.judge = true;
				// 登记成功后把上次搜索出来的内容全部清空
				$scope.base_goods_barcode = '';
				$scope.base_goods_name = '';
				$scope.goodkind = '真品';
				$scope.base_goods_price = '';
				$scope.handNum = '';
				$scope.goodstypename = '';
			} else {
				console.log('登记失败');
			}
		})
	}
	//点击条码和包码按钮
	$scope.addRegisItem=function(){
			jQuery(event.target).addClass('addRegis2');
			jQuery(event.target).siblings().removeClass('addRegis2');
	}
	//点击保存
	$scope.saveRegis=function(){
		$scope.disNone=false;
		postGoods1.ca55Id=goodId;
		postGoods1.ca54Id=$scope.ca54Id;
		postGoods1.goodscount=$scope.sweepData.GOODSCOUNT;
		postGoods1.goodsprice=$scope.sweepData.BASE_GOODS_PRICE;
		postGoods1.me11Id=$scope.me11Id;
		appService.requireForWMF(wmf, postGoods1, "RegieProExaminfoAdapter", "updateCa55", (data) => {
			console.log(data)
		})
	}
	//点击清空数据弹出框
	$scope.showConfirm = function() {
		if($scope.sweepData){
			$scope.sweepData.BASE_GOODS_BARCODE="";
			$scope.sweepData.BASE_GOODS_NAME="";
			$scope.sweepData.GOODSTYPENAME="";
			$scope.sweepData.BASE_GOODS_PRICE="";
			$scope.sweepData.GOODSCOUNT="";   
		}

		var confirmPopup = $ionicPopup.confirm({
	        template: '<div>已清空，是否新增</div>',
	        cssClass:'goodskind-popup',
	        scope:$scope,
	        buttons: [{
	        	text:'取消',
	        	type:'button-assertive',
	        },{
				text: '新增',
				type: 'button-positive',
				onTap: function(e) {
					$scope.disNone=true;
					$scope.addRegis0 = false;
					$scope.addRegis = true;
					$scope.addRegis3 = false;
				}
			}]   
	    });
	};
	//点击新增页面的放弃按钮
	$scope.clearClick = function(){
		$scope.disNone=false;
		$scope.addRegis0 = true;
		$scope.addRegis = false;
		$scope.addRegis3 = false;
	};
	//点击查看流水按钮
	$scope.checkWater=function(){
		var checkWaterName=jQuery(event.target).html();
		if(Object.is(checkWaterName,'查看流水')){
			$scope.disNone=true;
			$scope.addRegis0 = false;
			$scope.addRegis = false;
			$scope.addRegis3 = true;
			jQuery(event.target).text("继续登记");
			appService.requireForWMF(wmf,{
				me11Id:initData.result.unLogout[0].ME11_ID,
			}, "RegieProExaminfoAdapter", "getca55ListByStafferno", (data) => {
				console.log(data);
				if(data.result.ca55List.length != 0){
					$scope.runningWaterData=data.result.ca55List;
				}
				$scope.countbox=data.result.countBox[0];
				$scope.countcus=data.result.countCus[0];
				
			})
		}else{
			$scope.disNone=false;
			jQuery(event.target).text("查看流水");
			$scope.addRegis0 = true;
			$scope.addRegis3 = false;
			$scope.addRegis = false;
		}
	};
	//删除查看流水中的某条数据
	$scope.delectCheckWater=function(){
		runningWater1={
			ca54Id:jQuery(event.target).attr("data-ca54Id"),
			ca55Id:jQuery(event.target).attr("data-ca55Id"),
			me11Id:initData.result.unLogout[0].ME11_ID,
		};
		appService.requireForWMF(wmf,runningWater1, "RegieProExaminfoAdapter", "delCa55Goods", (data) => {
			console.log(data);
			$scope.runningWaterData=data.result.ca55GoodsList;
			$scope.countbox=data.result.countBox[0];
			$scope.countcus=data.result.countCus[0];
		})
	}

	$scope.initAddParams = {
		baseGoodsBarcode1:'',
		baseGoodsName1:'',
		baseGoodsType1:'',
		baseGoodsPrice1:'',
		goodcount1:''
	};
	//点击新增中的保存按钮
	$scope.saveRegis1=function(){
		if($scope.ca54Id){
			addSaveRegis1.baseGoodsBarcode = $scope.initAddParams.baseGoodsBarcode1;
			addSaveRegis1.baseGoodsName=$scope.initAddParams.baseGoodsName1;
			addSaveRegis1.baseGoodsType=$scope.initAddParams.baseGoodsType1;
			addSaveRegis1.baseGoodsPrice=$scope.initAddParams.baseGoodsPrice1;
			addSaveRegis1.goodscount=$scope.initAddParams.goodcount1;
			addSaveRegis1.goodskind=goodkindId;
			addSaveRegis1.ca54Id = $scope.ca54Id;
			addSaveRegis1.me11Id = $scope.me11Id;
			appService.requireForWMF(wmf,addSaveRegis1, "RegieProExaminfoAdapter", "saveBaseGood", (data) => {
				console.log(data);
				appService.successPopup("保存成功", "温馨提示");
			})
		}else{
			appService.errorPopup("请先扫描封箱编码", "温馨提示");
		}
		
	}
}]);