"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description: 文书预览控制器
 * @author: huran
 */
_app2.default.controller("documentPreviewCtrl", ["$scope", "$state", "$stateParams", "$rootScope", "appService", "initData", function ($scope, $state, $stateParams, $rootScope, appService, initData) {
	var _this = this;

	// 页面初始化请求的是现行保存登记书
	$scope.$watch('$viewContentLoaded', function () {
		$scope.KeepNotice_0 = initData.result.PkNoticeGoods;
		$scope.KeepNotice_1 = initData.result.PreKeepNotice;
		console.log(initData);
	});
	// hr开始
	var params = {
		"me11Id": $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
	};

	var requireParams = [{
		url: "RegieProExaminfoAdapter",
		method: "getPreKeepNoticeByEventId"
	}, {
		url: "RegieProExaminfoAdapter",
		method: "getAskNoticByEventId"
	}, {
		url: "RegieProExaminfoAdapter",
		method: "getProveUpByEventId"
	}, {
		url: "RegieProExaminfoAdapter",
		method: "getGoodDeal"
	}];
	// 点击切换文书函数
	$scope.focusIndex = 0;
	$scope.focus = function (index) {
		$scope.focusIndex = index;
		jQuery(event.target).css('background', '#EDB82A');
		jQuery(event.target).siblings().css('background-color', '#D4CBC6');
		// index == 3 当请求物品处理通知书的数据的时候，物品处理需要特殊处理
		appService.requireForWMF(wmf, params, requireParams[index].url, requireParams[index].method, function (data) {
			if (index == 0) {
				$scope.KeepNotice_0 = data.result.PkNoticeGoods;
				$scope.KeepNotice_1 = data.result.PreKeepNotice;
			} else {
				console.log('tt', data);
				$scope.Data = data.result.list[data.result.list.length - 1];
			}
			// 特殊处理物品处理通知书里的一些内容
			if (index == 3) {
				console.log('03', data);
				// 当DEALWAY的长度大于2的时候说明多余一种处理结果
				if ($scope.Data.DEALWAY) {
					if ($scope.Data.DEALWAY.length > 2) {
						var s = data.result.list[data.result.list.length - 1].DEALWAY;
						// let s = "01,02,04";
						var checkedS = s.split(',');
						for (var i = 0; i <= checkedS.length - 1; i++) {
							// console.log(jQuery("#Hcheck01").prop("checked"));
							jQuery("#Hcheck" + checkedS[i]).prop('checked', true);
						}
					}
				} else {
					console.log($scope.Data.DEALWAY);
				}
			};
			if (index == 1) {
				$scope.askAdvice = $scope.Data;
				$scope.askkTime = data.result.list[data.result.list.length - 1].ASK_TIME.split(" ");
				$scope.askBringdatum = data.result.list[data.result.list.length - 1].BRINGDATUM.split(",");
			}
		});
	};

	/**
  * @description: 文书打印
  */
	$scope.printDocument = function () {
		_this.printDoc = function (params) {
			wmf.callNativeDelegateFunc(JSON.stringify({
				"cmd": "cmd_printnotice",
				"params": JSON.stringify(params)
			}), function (backData) {
				console.log("打印调用成功");
				console.log(backData);
			});
		};
		var me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;

		switch ($scope.focusIndex) {
			case 0:
				_this.printDoc({
					"params": '{"me11Id":' + me11Id + '}',
					"type": "05",
					"id": ''
				});
				break;
			case 1:
				_this.printDoc({
					"params": '{"me11Id":' + me11Id + '}',
					"type": "02",
					"id": ''
				});
				break;
			case 2:
				_this.printDoc({
					"params": '{"me11Id":' + me11Id + '}',
					"type": "03",
					"id": ''
				});
				break;
			case 3:
				_this.printDoc({
					"params": '{"me11Id":' + me11Id + '}',
					"type": "01",
					"id": ''
				});
				break;
		}
	};
}]);