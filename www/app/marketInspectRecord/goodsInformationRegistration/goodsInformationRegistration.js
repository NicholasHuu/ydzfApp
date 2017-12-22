"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.controller("goodsInformationRegistrationCtrl", ["$scope", "$state", "$stateParams", "$ionicLoading", "appService", "$ionicPopup", "$rootScope", function ($scope, $state, $stateParams, $ionicLoading, appService, $ionicPopup, $rootScope) {
	// 扫封箱码按钮是否显示标志
	$scope.scanFresh = true;
	/*HsumNum 用来统计页面底部 合计
 HsumCash 用来统计页面底部 总价*/
	$scope.HsumNum = 0;
	$scope.HsumCash = 0;
	// 点击选择“卷烟性质”为真品或者假品
	$scope.fakeProducts = '真品';
	var fakeProductsId = '01';
	//汇总页面文本框是否可以点击标志

	/**
 * @description: 登记tab点击函数
  */
	$scope.Htab0 = function () {
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
	$scope.Htab1 = function () {
		$scope.scanFresh = false;
		// 防止多次点击后出现累加，所以在请求到数据之前先清空
		$scope.Ca54List = null;
		$scope.GoodsList = null;
		$scope.SumList = null;
		// 防止一直累加，每次初始化把合计清零HsumNum,HsumCash
		$scope.HsumNum = 0;
		$scope.HsumCash = 0;
		// 初始化时删除的自定义属性为零售户的0
		$scope.dealTitle = 0;
		var totalParms = {
			me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
		};
		jQuery('.checkIn').css('display', 'none');
		jQuery('.Htotal').css('display', 'block');
		jQuery('.Htab0').css('background-color', '#D4CBC6');
		jQuery('.Htab1').css('background-color', '#2EA9E5');
		jQuery("#Lshou").css('background-color', '#2EA9E5');
		//点击汇总初始化页面
		appService.requireForWMF(wmf, totalParms, "RegieProExaminfoAdapter", "getCa54ListByEventId", function (data) {
			$scope.Ca54List = data.result.ca54List; //封箱号tab标签列表
			$scope.GoodsList = data.result.goodsList; //详细物品信息列表
			$scope.SumList = data.result.goodsSumList; //汇总信息列表
			// 计算底部的合计数据
			for (var i = 0; i <= data.result.goodsSumList.length - 1; i++) {
				$scope.HsumNum += data.result.goodsSumList[i].GOODSCOUNT;
				$scope.HsumCash += data.result.goodsSumList[i].TOTALPRICE;
			};
		});
	};

	/**
 * @description: 点击切换零售户,箱子tab切换函数
  * @param index:箱子序号,0:零售户,1,2,3箱子序号
  */
	$scope.focus = function (index) {
		$scope.SumList = null;
		$scope.GoodsList = null;
		// 防止一直累加，每次初始化把合计清零HsumNum,HsumCash
		$scope.HsumNum = 0;
		$scope.HsumCash = 0;
		// 当index=0，则是点击零售户 否则是点击箱子
		// dealTitle 自定义属性 用来判断删除的是零售户还是箱子中的物品
		if (index == 0) {
			jQuery(event.target).css('background-color', '#2EA9E5');
			jQuery("#Manybox").find('span').css('background-color', '#D4CBC6');
			// 点击零售户时删除的自定义属性为零售户的 0
			$scope.dealTitle = 0;
			var Retaile = {
				me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
			};
			appService.requireForWMF(wmf, Retaile, "RegieProExaminfoAdapter", "getSumByEventId", function (data) {
				console.log(data);
				$scope.SumList = data.result.goodsSumList;
				$scope.GoodsList = data.result.goodsList;
				// 计算底部的合计数据
				for (var i = 0; i <= data.result.goodsSumList.length - 1; i++) {
					$scope.HsumNum += data.result.goodsSumList[i].GOODSCOUNT;
					$scope.HsumCash += data.result.goodsSumList[i].TOTALPRICE;
				};
			});
		} else {
			// 点击箱子时删除的自定义属性为零售户的 1
			$scope.dealTitle = 1;
			var boxParms = jQuery(event.target).attr('data-ca54id');
			jQuery(event.target).css('background-color', '#2EA9E5');
			jQuery(event.target).siblings('span').css('background-color', '#D4CBC6');
			jQuery("#Lshou").css('background-color', '#D4CBC6');
			// 删除箱子中的物品时需要箱子的ca54id; delC54id
			$scope.delC54id = boxParms;
			var boxGetParms = {
				ca54Id: boxParms
			};
			appService.requireForWMF(wmf, boxGetParms, "RegieProExaminfoAdapter", "getBoxSum", function (data) {
				console.log("箱子", data);
				$scope.SumList = data.result.boxSumList;
				$scope.GoodsList = data.result.boxGoodsList;
				// 计算底部的合计数据
				for (var i = 0; i <= data.result.boxSumList.length - 1; i++) {
					$scope.HsumNum += data.result.boxSumList[i].GOODSCOUNT;
					$scope.HsumCash += data.result.boxSumList[i].TOTALPRICE;
				};
			});
		}
	};

	/**
 * @description: 零售户明细删除
  */
	$scope.delInfo = function () {
		$scope.SumList = null;
		$scope.GoodsList = null;
		$scope.HsumNum = 0;
		$scope.HsumCash = 0;
		var Ca55Id = jQuery(event.target).attr('data-ca55Id');
		var Ca54Id = jQuery(event.target).attr('data-ca54Id');
		// 得到删除的时候元素的自定义属性 data - DealTitle
		var Dealtitle = jQuery(event.target).attr('data-DealTitle');
		// Dealtitle=0删除的是零售户里的记录，否则就是箱子里的
		var delParms = {
			me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
		};
		if (Dealtitle == 0) {
			delParms.ca55Id = Ca55Id;
			appService.requireForWMF(wmf, delParms, "RegieProExaminfoAdapter", "delSumByEventId", function (data) {
				console.log(delParms);
				$scope.SumList = data.result.goodsSumList;
				$scope.GoodsList = data.result.goodsList;
				// 计算底部的合计数据
				for (var i = 0; i <= data.result.goodsSumList.length - 1; i++) {
					$scope.HsumNum += data.result.goodsSumList[i].GOODSCOUNT;
					$scope.HsumCash += data.result.goodsSumList[i].TOTALPRICE;
				};
			});
		} else {
			delParms.ca54Id = Ca54Id;
			delParms.ca55Id = Ca55Id;
			appService.requireForWMF(wmf, delParms, "RegieProExaminfoAdapter", "delBoxSum", function (data) {
				console.log(data);
				console.log(delParms);
				$scope.SumList = data.result.boxSumList;
				$scope.GoodsList = data.result.boxGoodsList;
				// 计算底部的合计数据
				for (var i = 0; i <= data.result.boxSumList.length - 1; i++) {
					$scope.HsumNum += data.result.boxSumList[i].GOODSCOUNT;
					$scope.HsumCash += data.result.boxSumList[i].TOTALPRICE;
				};
			});
		}
	};

	//judge 判断是真品或者假品 来决定单价是否可操作
	$scope.judge = true;
	//默认条码，规格,性质，总价四个输入框可以编辑
	$scope.dis = true;
	//扫码后点击保存按钮时，向后台发送的参数对象
	var postGoods = {};
	//弹出框选中对象
	var choosedObj = null;
	//物品信息数组
	$scope.bThree_cont = [];

	/**
  * @description: 扫描封箱编号点击事件
  */
	$scope.scsnGoods = function () {
		appService.callNative({ "cmd": "cmd_scan", "params": { "data": "测试" } }, function (backData) {
			if (JSON.parse(backData).params.data == "") {
				appService.errorPopup("扫码失败，请重试", "温馨提示");
			} else {
				var scanGoodsInfo = {
					boxSq: JSON.parse(backData).params.data,
					me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
				};
				//获得封箱编号后发送请求，获取ca54Id,dealgoodsId用于面下的数据请求
				appService.requireForWMF(wmf, scanGoodsInfo, "RegieProExaminfoAdapter", "registerBox", function (data) {
					//有封箱码查询得到的ca54Id,dealgoodsId用于后续的物品登记保存
					postGoods.ca54Id = data.result.ca54Id;
					postGoods.dealgoodsId = data.result.dealgoodsId;

					$scope.sealBoxNumber = data.result.serialno; //箱子序号
					$scope.sealBoxCode = JSON.parse(backData).params.data; //封箱码
				});
			}
		});
	};

	/**
 * @description: 搜索结果若是多条，则出现弹框形供选择
  */
	var showPopup_search = function showPopup_search() {
		$scope.data = {};
		// 自定义弹窗
		var myPopup = $ionicPopup.show({
			templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popupRecord.html',
			title: '选择一条记录',
			scope: $scope,
			buttons: [{
				text: '完成',
				type: 'button-positive',
				onTap: function onTap(e) {
					$scope.base_goods_barcode = choosedObj.attr("data-barcode");
					$scope.base_goods_name = choosedObj.attr("data-name");
					$scope.goodstypename = choosedObj.attr("data-styleName");
					$scope.base_goods_price = choosedObj.attr("data-price");
					$scope.base_goods_type = choosedObj.attr("data-type");
				}
			}]
		});
	};

	//条形码搜索参数
	var Postgoodsbarcode = {};
	/**
  * @description: 根据条形码搜索
  */
	$scope.searchGoods = function () {
		Postgoodsbarcode.goodsbarcode = $scope.searchGoodsbarcode;

		appService.requireForWMF(wmf, Postgoodsbarcode, "RegieProExaminfoAdapter", "getBaseGoodsList", function (data) {
			// 如果查询返回的列表长度大于1，则出现弹框，让客户选择一条数据,否则直接写入数据到页面
			if (data.result.baseGoodslist.length > 1) {
				$scope.moreSearchRecord = data.result.baseGoodslist;
				showPopup_search();
			} else {
				// 判断后台返回是否有数据，没有对应的物品 则新增
				if (data.result.baseGoodslist.length < 1) {
					appService.confirmPopup("物品搜索无结果,是否新增", "温馨提示", function () {
						$scope.judge = false;
					}, function () {});
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
		});
	};

	/**
  * @description 扫码/保存按钮点击事件
  */
	$scope.keepGoods = function () {
		if (!$scope.base_goods_barcode) {
			if (!$scope.sealBoxCode) {
				appService.errorPopup("封箱码未扫描,请扫描", "温馨提示", function () {});
				return;
			}
			appService.callNative({ "cmd": "cmd_scan", "params": { "data": "测试" } }, function (backData) {
				if (Object.is(JSON.parse(backData).params.data, '') || JSON.parse(backData).params.data.length != 13) {
					appService.errorPopup("扫码失败，请重试", "温馨提示");
				} else {
					$scope.searchGoodsbarcode = JSON.parse(backData).params.data;
					//等待条码显示到搜索框后进行搜索操作
					setTimeout(function () {
						$scope.searchGoods();
					}, 100);
				}
			});
		} else {
			// 点击保存,需要发送后台的数据的拼接postGoods
			postGoods.baseGoodsBarcode = $scope.base_goods_barcode;
			postGoods.baseGoodsName = $scope.base_goods_name;
			postGoods.goodsprice = $scope.base_goods_price;
			postGoods.goodscount = $scope.handNum;
			postGoods.goodskind = fakeProductsId;
			console.log('保存发送后台的数据', postGoods);
			appService.requireForWMF(wmf, postGoods, "RegieProExaminfoAdapter", "registerGoods", function (data) {
				if (data.result.message == '登记成功') {
					$scope.bThree_cont = data.result.ca55GoodsList;
					$scope.HsumNum = 0;
					$scope.HsumCash = 0;
					for (var i = 0; i <= $scope.bThree_cont.length - 1; i++) {
						$scope.HsumNum += $scope.bThree_cont[i].GOODSCOUNT;
						$scope.HsumCash += $scope.bThree_cont[i].TOTAL_PRICE;
					}
					/*$scope.dis = false;
     $scope.judge = false;*/
					// 登记成功后把上次搜索出来的内容全部清空
					$scope.searchGoodsbarcode = '';
					$scope.base_goods_barcode = '';
					$scope.base_goods_name = '';
					$scope.fakeProducts = '真品';
					$scope.base_goods_price = '';
					$scope.handNum = '';
					$scope.goodstypename = '';
				} else {
					console.log('登记失败');
				}
			});
		}
	};

	/**
 * @description: 卷烟性质选择弹框
  */
	$scope.showPopup_0 = function () {
		// 向后台查询真假品列表数据，渲染进弹框中
		appService.requireForWMF(wmf, {}, "RegieProExaminfoAdapter", "goodsKindtype", function (data) {
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
					onTap: function onTap(e) {
						$scope.fakeProducts = choosedObj.html();
						fakeProductsId = choosedObj.attr('data-code');
						// 判断后台返回的真假烟的判定结果开始
						$scope.judge = Object.is(fakeProductsId, '01') ? true : false;
						console.log($scope.judge);
					}
				}]
			});
		});
	};
	/**
 * @description: 物品搜索无结果，弹出新增物品询问提示框
  */
	/*	let showPopup_2 = function() {
 		// 自定义弹窗
 		var myPopup = $ionicPopup.show({
 			templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popup_2.html',
 			title: '没有对应物品信息',
 			scope: $scope,
 			buttons: [{
 				text: '取消',
 				type: 'button-default',
 				onTap: function(e) {
 					return
 				}
 			}, {
 				text: '新增',
 				type: 'button-positive',
 				onTap: function(e) {
                     $scope.dis = false;
                     $scope.judge = false;
 					/!*jQuery('#choiceType').on('click', showPopup_1);*!/
 					return
 				}
 			}]
 		});
 	};*/

	/**
 * @description: 卷烟类型选择弹框
 */
	$scope.showPopup_1 = function () {
		// 自定义弹窗
		var myPopup = $ionicPopup.show({
			templateUrl: 'app/marketInspectRecord/goodsInformationRegistration/popup_1.html',
			title: '选择卷烟类型',
			scope: $scope,
			buttons: [{
				text: '完成',
				type: 'button-positive',
				onTap: function onTap(e) {
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
	$scope.choiceType = function () {
		jQuery(event.target).css('background', 'yellow');
		jQuery(event.target).siblings().css('background', 'white');
		choosedObj = jQuery(event.target);
	};

	/**
  * @description: 登记Tab-删除记录点击事件
  */
	$scope.deleteRecord = function () {
		appService.requireForWMF(wmf, {
			ca55Id: jQuery(event.target).attr("data-ca55Id"),
			ca54Id: postGoods.ca54Id
		}, "RegieProExaminfoAdapter", "delCa55Goods", function (data) {
			console.log(data);
			//获取物品信息列表,并进行合计计算
			$scope.bThree_cont = data.result.ca55GoodsList;
			$scope.HsumNum = 0;
			$scope.HsumCash = 0;
			$scope.bThree_cont.map(function (item, index) {
				$scope.HsumNum += item.GOODSCOUNT;
				$scope.HsumCash += item.TOTAL_PRICE;
			});
		});
	};
	/**
  * @description: 保存按钮点击事件
  */
	$scope.saveGoodsInfo = function () {
		$scope.$emit("nextNavtigation", "marketInspectRecord.documentsGenerated");
		$state.go("marketInspectRecord.documentsGenerated", {
			params: $stateParams.params
		});
	};
}]);