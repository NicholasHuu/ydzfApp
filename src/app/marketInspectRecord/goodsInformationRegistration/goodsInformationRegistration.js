import appMoudle from "../../main/app"

appMoudle.controller("goodsInformationRegistrationCtrl", ["$scope", "$state", "$stateParams", "$ionicLoading", "appService", "$ionicPopup", "$rootScope", function($scope, $state, $stateParams, $ionicLoading, appService, $ionicPopup, $rootScope) {
	// 扫封箱码按钮是否显示标志
	$scope.scanFresh = true;
    //汇总标签页面合计初始化
    $scope.sumNum = 0;
    $scope.sumCash = 0;
    // 点击选择“卷烟性质”为真品或者假品
    $scope.fakeProducts = '真品';
    let fakeProductsId = '01';
	//经营户箱合计与价格合计
	$scope.regCount = 0 ;$scope.regPrice = 0;
    //本箱合计与价格合计
    $scope.boxCount = 0 ;$scope.boxPrice = 0;
    //judge 判断是真品或者假品 来决定单价是否可操作
    $scope.judge = false;
    //默认条码，规格,性质，总价四个输入框可以编辑
    $scope.dis = false;
    //扫码后点击保存按钮时，向后台发送的参数对象
    let postGoods = {};
    //弹出框选中对象
    let choosedObj = null;
    //物品信息数组
    $scope.bThree_cont = [];

    /**
	 * @description: 登记tab点击函数
     */
	$scope.Htab0 = function() {
		$scope.scanFresh = true;
		jQuery('.checkIn').css('display', 'block');
		jQuery('.Htotal').css('display', 'none');
		jQuery('.Htab0').css('background-color', '#2EA9E5');
		jQuery('.Htab1').css('background-color', '#D4CBC6');
		$scope.Ca54List = null;
		$scope.GoodsList = null;
		$scope.GoodsSumList = null;
	};

    /**
     * @description: 汇总tab点击函数
     */
	$scope.Htab1 = function() {
		$scope.scanFresh = false;
		// 防止多次点击后出现累加，所以在请求到数据之前先清空
		$scope.Ca54List = null;
		$scope.GoodsList = null;
		$scope.SumList = null;
		// 初始化时删除的自定义属性为零售户的0
		$scope.dealTitle = 0;
		let totalParms = {
			me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
		};
		jQuery('.checkIn').css('display', 'none');
		jQuery('.Htotal').css('display', 'block');
		jQuery('.Htab0').css('background-color', '#D4CBC6');
		jQuery('.Htab1').css('background-color', '#2EA9E5');
		jQuery("#Lshou").css('background-color', '#2EA9E5');
		//点击汇总初始化页面
		appService.requireForWMF(wmf, totalParms, "RegieProExaminfoAdapter", "getCa54ListByEventId", (data) => {
			$scope.Ca54List = data.result.ca54List;//封箱号tab标签列表
			$scope.GoodsList = data.result.goodsList;//详细物品信息列表
			$scope.SumList = data.result.goodsSumList;//汇总信息列表
			// 计算合计数据
            if(data.result.countCus.length != 0){
                $scope.sumNum = data.result.countCus[0].REG_COUNT;
                $scope.sumCash = data.result.countCus[0].REG_PRICE
            }
		})
	};

    /**
	 * @description: 点击切换零售户,箱子tab切换函数
     * @param index:箱子序号,0:零售户,1,2,3箱子序号
     */
	$scope.focus = function(index) {
		$scope.SumList = null;
		$scope.GoodsList = null;
		// 当index=0，则是点击零售户 否则是点击箱子
		// dealTitle 自定义属性 用来判断删除的是零售户还是箱子中的物品
		if (index == 0) {
			jQuery(event.target).css('background-color', '#2EA9E5');
			jQuery("#Manybox").find('span').css('background-color', '#D4CBC6');
			// 点击零售户时删除的自定义属性为零售户的 0
			$scope.dealTitle = 0;
			let Retaile = {
				me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
			};
			appService.requireForWMF(wmf, Retaile, "RegieProExaminfoAdapter", "getSumByEventId", (data) => {
				console.log(data);
				$scope.SumList = data.result.goodsSumList;
				$scope.GoodsList = data.result.goodsList;
				// 计算底部的合计数据
                if(data.result.countCus.length != 0){
                    $scope.sumNum = data.result.countCus[0].REG_COUNT;
                    $scope.sumCash = data.result.countCus[0].REG_PRICE
                }
			});
		} else {
			// 点击箱子时删除的自定义属性为零售户的 1
			$scope.dealTitle = 1;
			let boxParms = jQuery(event.target).attr('data-ca54id');
			jQuery(event.target).css('background-color', '#2EA9E5');
			jQuery(event.target).siblings('span').css('background-color', '#D4CBC6');
			jQuery("#Lshou").css('background-color', '#D4CBC6');
			// 删除箱子中的物品时需要箱子的ca54id; delC54id
			$scope.delC54id = boxParms;
			let boxGetParms = {
				ca54Id: boxParms
			};
			appService.requireForWMF(wmf, boxGetParms, "RegieProExaminfoAdapter", "getBoxSum", (data) => {
				console.log("箱子", data);
				$scope.SumList = data.result.boxSumList;
				$scope.GoodsList = data.result.boxGoodsList;
				// 计算底部的合计数据
                if(data.result.countBoxSum.length != 0){
                    $scope.sumNum = data.result.countBoxSum[0].BOX_COUNT;
                    $scope.sumCash = data.result.countBoxSum[0].BOX_PRICE
                }
			});
		}
	};

    /**
	 * @description: 零售户明细删除
     */
	$scope.delInfo = function() {
		$scope.SumList = null;
		$scope.GoodsList = null;
		let Ca55Id = jQuery(event.target).attr('data-ca55Id');
		let Ca54Id = jQuery(event.target).attr('data-ca54Id');
		// 得到删除的时候元素的自定义属性 data - DealTitle
		let Dealtitle = jQuery(event.target).attr('data-DealTitle');
		// Dealtitle=0删除的是零售户里的记录，否则就是箱子里的
		let delParms = {
			me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id,
		};
		if (Dealtitle == 0) {
			delParms.ca55Id = Ca55Id;
			appService.requireForWMF(wmf, delParms, "RegieProExaminfoAdapter", "delSumByEventId", (data) => {
				console.log(delParms);
				$scope.SumList = data.result.goodsSumList;
				$scope.GoodsList = data.result.goodsList;
				// 计算底部的合计数据
                if(data.result.countCus.length != 0){
                    $scope.sumNum = data.result.countCus[0].REG_COUNT;
                    $scope.sumCash = data.result.countCus[0].REG_PRICE
                }
			})
		} else {
			delParms.ca54Id = Ca54Id;
			delParms.ca55Id = Ca55Id;
			appService.requireForWMF(wmf, delParms, "RegieProExaminfoAdapter", "delBoxSum", (data) => {
				console.log(data);
				console.log(delParms);
				$scope.SumList = data.result.boxSumList;
				$scope.GoodsList = data.result.boxGoodsList;
				// 计算底部的合计数据
                if(data.result.countBoxSum.length != 0){
                    $scope.sumNum = data.result.countBoxSum[0].BOX_COUNT;
                    $scope.sumCash = data.result.countBoxSum[0].BOX_PRICE
                }
			})
		}
	};

	/**
	 * @description: 扫描封箱编号点击事件
	 */
	$scope.scsnGoods = function() {
        appService.callNative({"cmd":"cmd_scan","params":{"data":"测试"}},backData =>{
            if (JSON.parse(backData).params.data == "") {
                appService.errorPopup("扫码失败，请重试", "温馨提示")
            } else {
                let scanGoodsInfo = {
                    boxSq: JSON.parse(backData).params.data,
                    me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
                };
                //获得封箱编号后发送请求，获取ca54Id,dealgoodsId用于面下的数据请求
                appService.requireForWMF(wmf, scanGoodsInfo, "RegieProExaminfoAdapter", "registerBox", (data) => {
                    //有封箱码查询得到的ca54Id,dealgoodsId用于后续的物品登记保存
					if(data.result.countBox.length != 0){
						$scope.boxCount = data.result.countBox[0].BOX_COUNT;
                        $scope.boxPrice = data.result.countBox[0].BOX_PRICE
					}

                    if(data.result.countCus.length != 0){
                        $scope.regCount = data.result.countCus[0].REG_COUNT;
                        $scope.regPrice = data.result.countCus[0].REG_PRICE
                    }

                	postGoods.ca54Id = data.result.ca54Id;
                    postGoods.dealgoodsId = data.result.dealgoodsId;

                    $scope.sealBoxNumber = data.result.serialno;//箱子序号
                    $scope.sealBoxCode = JSON.parse(backData).params.data;//封箱码

                    $scope.judge = true;
                    $scope.dis = true;
                })
            }
		});
	};

    /**
	 * @description: 搜索结果若是多条，则出现弹框形供选择
     */
	let showPopup_search = function() {
		$scope.data = {}
			// 自定义弹窗
		var myPopup = $ionicPopup.show({
			templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popupRecord.html',
			title: '选择一条记录',
			scope: $scope,
			buttons: [{
				text: '完成',
				type: 'button-positive',
				onTap: function(e) {
					$scope.base_goods_barcode = choosedObj.attr("data-barcode");
					$scope.base_goods_name = choosedObj.attr("data-name");
					$scope.goodstypename = choosedObj.attr("data-styleName")
					$scope.base_goods_price = choosedObj.attr("data-price");
					$scope.base_goods_type = choosedObj.attr("data-type");
				}
			}]
		});
	};

	//条形码搜索参数
	let Postgoodsbarcode = {};
	/**
	 * @description: 根据条形码搜索
	 */
	$scope.searchGoods = function() {
		Postgoodsbarcode.goodsbarcode = $scope.searchGoodsbarcode;

		appService.requireForWMF(wmf, Postgoodsbarcode, "RegieProExaminfoAdapter", "getBaseGoodsList", (data) => {
			// 如果查询返回的列表长度大于1，则出现弹框，让客户选择一条数据,否则直接写入数据到页面
			if (data.result.baseGoodslist.length > 1) {
				$scope.moreSearchRecord = data.result.baseGoodslist;
				showPopup_search();
			} else {
				// 判断后台返回是否有数据，没有对应的物品 则新增
				if (data.result.baseGoodslist.length < 1) {
                    appService.confirmPopup("温馨提示","否","是","物品搜索无结果,是否新增",() =>{
                    	$scope.judge = false;
						let addSaveRegis = {};
                        if($scope.sealBoxCode){
                            addSaveRegis.baseGoodsBarcode = $scope.base_goods_barcode;
                            addSaveRegis.baseGoodsName=$scope.base_goods_name;
                            addSaveRegis.baseGoodsType=Object.is($scope.goodstypename, '卷烟') ? '01' : '03';
                            addSaveRegis.baseGoodsPrice=$scope.base_goods_price;
                            addSaveRegis.goodscount=$scope.handNum;
                            addSaveRegis.goodskind=fakeProductsId;
                            addSaveRegis.ca54Id = postGoods.ca54Id;
                            addSaveRegis.me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;
                            appService.requireForWMF(wmf,addSaveRegis, "RegieProExaminfoAdapter", "saveBaseGood", (data) => {
                                console.log(data);
                                //登记物品列表
                                $scope.bThree_cont = data.result.ca55GoodsList;
                                //合计
                                if(data.result.countBox.length != 0){
                                    $scope.boxCount = data.result.countBox[0].BOX_COUNT;
                                    $scope.boxPrice = data.result.countBox[0].BOX_PRICE;
                                }
                                if(data.result.countCus.length != 0){
                                    $scope.regCount = data.result.countCus[0].REG_COUNT;
                                    $scope.regPrice = data.result.countCus[0].REG_PRICE;
                                }
                                // 登记成功后把上次搜索出来的内容全部清空,相关输入框写权限放开
                                $scope.dis = false;
                                $scope.judge = false;
                                $scope.searchGoodsbarcode = '';
                                $scope.base_goods_barcode = '';
                                $scope.base_goods_name = '';
                                $scope.base_goods_price = '';
                                $scope.handNum = '';
                                $scope.goodstypename = '';
                            })
                        }else{
                            appService.errorPopup("请先扫描封箱编码", "温馨提示");
                        }
					},()=>{});
				} else {
					// 判断后台返回的真假烟的判定结果结束
					$scope.searchResult = data.result.baseGoodslist[0];
					$scope.base_goods_barcode = $scope.searchResult.BASE_GOODS_BARCODE;
					$scope.base_goods_name = $scope.searchResult.BASE_GOODS_NAME;
					$scope.goodstypename = $scope.searchResult.GOODSTYPENAME;
					$scope.base_goods_price = $scope.searchResult.BASE_GOODS_PRICE;
					$scope.base_goods_type = $scope.searchResult.BASE_GOODS_TYPE;
					$scope.handNum = $scope.searchResult.GOODSCOUNT;
					postGoods.baseGoodsId = $scope.searchResult.BASE_GOODS_ID;
					//查询到数据，则禁用条码，规格,性质，总价四个输入框
					$scope.dis = true;
				}
			}
		})
	};

	/**
	 * @description 扫码/保存按钮点击事件
	 */
	$scope.keepGoods = function() {
		if (!$scope.base_goods_barcode) {
			if(!$scope.sealBoxCode){
				appService.errorPopup("封箱码未扫描,请扫描","温馨提示",()=>{});
				return;
			}
            appService.callNative({"cmd":"cmd_scan","params":{"data":"测试"}},(backData) =>{
                if (Object.is(JSON.parse(backData).params.data, '') || JSON.parse(backData).params.data.length != 13) {
                    appService.errorPopup("扫码失败，请重试", "温馨提示")
                } else {
                    $scope.searchGoodsbarcode = JSON.parse(backData).params.data;
                    //等待条码显示到搜索框后进行搜索操作
                    setTimeout(() => {
                        $scope.searchGoods();
                    }, 100)
                }
			});
		} else {
			// 点击保存,需要发送后台的数据的拼接postGoods
			postGoods.baseGoodsBarcode = $scope.base_goods_barcode;
			postGoods.baseGoodsName = $scope.base_goods_name;
			postGoods.baseGoodsPrice = $scope.base_goods_price;
			postGoods.goodscount = $scope.handNum;
			postGoods.goodskind = fakeProductsId;
            postGoods.me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;
			console.log('保存发送后台的数据', postGoods);
			appService.requireForWMF(wmf, postGoods, "RegieProExaminfoAdapter", "registerGoods", (data) => {
				if (data.result.message == '登记成功') {
					$scope.bThree_cont = data.result.ca55GoodsList;
                    if(data.result.countBox.length != 0){
                        $scope.boxCount = data.result.countBox[0].BOX_COUNT;
                        $scope.boxPrice = data.result.countBox[0].BOX_PRICE
                    }

                    if(data.result.countCus.length != 0){
                        $scope.regCount = data.result.countCus[0].REG_COUNT;
                        $scope.regPrice = data.result.countCus[0].REG_PRICE
                    }
					$scope.dis = false;
					$scope.judge = false;
					// 登记成功后把上次搜索出来的内容全部清空
					$scope.searchGoodsbarcode = '';
					$scope.base_goods_barcode = '';
					$scope.base_goods_name = '';
					$scope.base_goods_price = '';
					$scope.handNum = '';
					$scope.goodstypename = '';
				} else {
					console.log('登记失败');
				}
			})
		}
	};

    /**
	 * @description: 卷烟性质选择弹框
     */
	$scope.showPopup_0 = function() {
		// 向后台查询真假品列表数据，渲染进弹框中
		appService.requireForWMF(wmf, {}, "RegieProExaminfoAdapter", "goodsKindtype", (data) => {
			$scope.geTypeList = data.result.typeList;
			// $scope.data = {}
			// 自定义弹窗
			var myPopup = $ionicPopup.show({
				templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popup_0.html',
				title: '选择卷烟性质',
				scope: $scope,
				buttons: [{
					text: '完成',
					type: 'button-positive',
					onTap: function(e) {
						$scope.fakeProducts = choosedObj.html();
						fakeProductsId = choosedObj.attr('data-code');
						// 判断后台返回的真假烟的判定结果开始
						$scope.judge = Object.is(fakeProductsId, '01') ? true : false;
					}
				}]
			});
		})
	};

    /**
	 * @description: 卷烟类型选择弹框
	 */
	$scope.showPopup_1 = function() {
		// 自定义弹窗
		var myPopup = $ionicPopup.show({
			templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popup_1.html',
			title: '选择卷烟类型',
			scope: $scope,
			buttons: [{
				text: '完成',
				type: 'button-positive',
				onTap: function(e) {
					$scope.goodstypename = choosedObj.html();
					// 卷烟类型参数传送到后台 postGoods.goodstype
					postGoods.goodstype = Object.is(choosedObj.html(), '卷烟') ? '01' : '03';
					console.log(choosedObj.html());
					console.log(postGoods.goodstype);
					console.log($scope.goodstypename);
				}
			}]
		});
	};

	// 选择卷烟性质中的一条，写入页面中
	$scope.choiceType = function() {
		jQuery(event.target).css('background', 'yellow');
		jQuery(event.target).siblings().css('background', 'white');
		choosedObj = jQuery(event.target)
	};

	/**
	 * @description: 登记Tab-删除记录点击事件
	 */
	$scope.deleteRecord = () => {
			appService.requireForWMF(wmf, {
			ca55Id: jQuery(event.target).attr("data-ca55Id"),
			ca54Id: postGoods.ca54Id,
			me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
		}, "RegieProExaminfoAdapter", "delCa55Goods", (data) => {
			console.log(data);
			//获取物品信息列表,并进行合计计算
			$scope.bThree_cont = data.result.ca55GoodsList;
			if(data.result.countBox.length != 0){
				$scope.boxCount = data.result.countBox[0].BOX_COUNT;
				$scope.boxPrice = data.result.countBox[0].BOX_PRICE
			}

			if(data.result.countCus.length != 0){
				$scope.regCount = data.result.countCus[0].REG_COUNT;
				$scope.regPrice = data.result.countCus[0].REG_PRICE
			}
		});
	};

	/**
	 * @description: 保存按钮点击事件
	 */
	$scope.saveGoodsInfo = () => {
		$scope.$emit("nextNavtigation", "marketInspectRecord.documentsGenerated");
		$state.go("marketInspectRecord.documentsGenerated", {
			params: $stateParams.params
		});
	};
}]);