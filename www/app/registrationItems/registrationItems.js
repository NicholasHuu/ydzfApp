"use strict";

var _app = require("../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.controller("registrationItemsCtrl", ["$scope", "$state", "$stateParams", "initData", "$rootScope", "appService", "$ionicPopup", function ($scope, $state, $stateParams, initData, $rootScope, appService, $ionicPopup) {
	//扫码后点击保存按钮时，向后台发送的参数对象
	var postGoods = {};
	$scope.$watch('$viewContentLoaded', function () {
		console.log(initData);
		$scope.me11Id = initData.result.unLogout[0].ME11_ID;
		$scope.inputValue;
		$scope.inputValue1;
		//judge 判断是真品或者假品 来决定单价是否可操作
		$scope.judge = true;
		//默认条码，规格,性质，总价四个输入框可以编辑
		$scope.dis = true;
	});

	var choosedObj = null;
	// 点击选择“卷烟性质”为真品或者假品
	$scope.goodkind = '真品';
	var goodkindId = '01';
	/**
  * @param value: checkbox的值
  */
	//扫封箱码
	$scope.inputChange = function (value) {
		appService.requireForWMF(wmf, {
			me11Id: initData.result.unLogout[0].ME11_ID,
			boxSq: value
		}, "RegieProExaminfoAdapter", "registerBox", function (data) {
			console.log(data);
			$scope.ca54Id = data.result.ca54Id;
			$scope.dealgoodsId = data.result.dealgoodsId;
			$scope.sealBoxNumber = data.result.serialno;
		});
	};
	// 卷烟性质弹框showPopup_0函数
	$scope.showPopup_0 = function () {
		// 向后台查询真假品列表数据，渲染进弹框中
		appService.requireForWMF(wmf, {}, "RegieProExaminfoAdapter", "goodsKindtype", function (data) {
			$scope.geTypeList = data.result.typeList;
			// $scope.data = {}
			// 自定义弹窗
			var myPopup = $ionicPopup.show({
				templateUrl: 'app/registrationItems/popup_0.html',
				title: '<div class="popupHead">选择卷烟性质</div>',
				scope: $scope,
				buttons: [{
					text: '完成',
					type: 'button-positive',
					onTap: function onTap(e) {
						$scope.goodkind = choosedObj.html();
						goodkindId = choosedObj.attr('data-code');
						// 判断后台返回的真假烟的判定结果开始
						$scope.judge = Object.is(goodkindId, '01') ? true : false;
					}
				}]
			});
		});
	};
	// 选择卷烟性质中的一条，写入页面中
	$scope.choiceType = function () {
		jQuery(event.target).css('background', 'yellow');
		jQuery(event.target).siblings().css('background', 'white');
		choosedObj = jQuery(event.target);
	};

	//扫条形码
	$scope.inputChange1 = function (value) {
		if (value.length == 13) {
			appService.requireForWMF(wmf, {
				goodsbarcode: value
			}, "RegieProExaminfoAdapter", "getBaseGoodsList", function (data) {
				console.log(data);
				$scope.sweepData = data.result.baseGoodslist[0];
				$scope.dis = true;
				postGoods = {
					baseGoodsBarcode: $scope.sweepData.BASE_GOODS_BARCODE,
					baseGoodsName: $scope.sweepData.BASE_GOODS_NAME,
					goodstypename: $scope.sweepData.GOODSTYPENAME,
					goodsprice: $scope.sweepData.BASE_GOODS_PRICE,
					baseGoodsId: $scope.sweepData.BASE_GOODS_ID,
					goodscount: $scope.sweepData.GOODSCOUNT
				};
				$scope.saveGoods();
				$scope.inputValue1 = '';
			});
		}
	};
	//扫条形码直接保存数据
	$scope.saveGoods = function () {
		postGoods.ca54Id = $scope.ca54Id;
		postGoods.dealgoodsId = $scope.dealgoodsId;
		postGoods.goodskind = goodkindId;
		appService.requireForWMF(wmf, postGoods, "RegieProExaminfoAdapter", "registerGoods", function (data) {
			if (data.result.message == '登记成功') {
				console.log(data);
				$scope.HsumNum = 0;
				$scope.HsumCash = 0;
				/*for (let i = 0; i <= $scope.bThree_cont.length - 1; i++) {
    	$scope.HsumNum += $scope.bThree_cont[i].GOODSCOUNT;
    	$scope.HsumCash += $scope.bThree_cont[i].TOTAL_PRICE;
    }*/
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
		});
	};
	//点击条码和包码按钮
	$scope.addRegisItem = function () {
		jQuery(event.target).addClass('addRegis2');
		jQuery(event.target).siblings().removeClass('addRegis2');
	};
	//点击保存
	$scope.savaRegis = function () {
		appService.requireForWMF(wmf, postGoods, "RegieProExaminfoAdapter", "updateCa55", function (data) {
			console.log(data);
		});
	};
	//点击清空数据弹出框
	$scope.showConfirm = function () {
		$scope.sweepData.BASE_GOODS_BARCODE = "";
		$scope.sweepData.BASE_GOODS_NAME = "";
		$scope.sweepData.GOODSTYPENAME = "";
		$scope.goodkind = "";
		$scope.sweepData.BASE_GOODS_PRICE = "";
		var confirmPopup = $ionicPopup.confirm({
			template: '<div>已清空，是否新增</div>',
			cssClass: 'goodskind-popup',
			scope: $scope,
			buttons: [{
				text: '取消',
				type: 'button-assertive'
				/*onTap: function(e) {
    	}*/
			}, {
				text: '新增',
				type: 'button-positive',
				onTap: function onTap(e) {
					jQuery(".registrationItems").find("ul.addRegis0").css("display", "none");
					jQuery(".registrationItems").find("ul.addRegis").css("display", "block");
				}
			}]

		});
		/*confirmPopup.then(function(res) {
      if(res) {
          console.log('You are sure');
      } else {
          console.log('You are not sure');
      }
  });*/
	};
	//点击新增页面的放弃按钮
	$scope.clearClick = function () {
		jQuery(".registrationItems").find("ul.addRegis").css("display", "none");
		jQuery(".registrationItems").find("ul.addRegis0").css("display", "block");
	};
}]);