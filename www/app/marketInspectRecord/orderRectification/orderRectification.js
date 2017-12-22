"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.controller("orderRectificationCtrl", ["$ionicHistory", "$scope", "$state", "initData", "$rootScope", "appService", "$stateParams", function ($ionicHistory, $scope, $state, initData, $rootScope, appService, $stateParams) {
				//保存责令整改的参数
				var keepSaveData = {};
				var me19Id = void 0; //用于打印
				$scope.$watch('$viewContentLoaded', function () {
								console.log(initData.result.list[0]);
								$scope.orderRectification = initData.result.list[0];
								me19Id = initData.result.list[0].ME19_ID;

								var _iteratorNormalCompletion = true;
								var _didIteratorError = false;
								var _iteratorError = undefined;

								try {
												for (var _iterator = Object.keys($scope.orderRectification)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
																var i = _step.value;

																if (/^ME_RESLUT\d+$/.test(i)) {
																				$scope.orderRectification[i] = Object.is($scope.orderRectification[i], "1") ? true : false;
																}
												}
								} catch (err) {
												_didIteratorError = true;
												_iteratorError = err;
								} finally {
												try {
																if (!_iteratorNormalCompletion && _iterator.return) {
																				_iterator.return();
																}
												} finally {
																if (_didIteratorError) {
																				throw _iteratorError;
																}
												}
								}

								;

								//初始化遮罩是否打开
								if (initData.result.list.length != 0) {
												var markObj = appService.initNavigteMark(initData.result.list[0]);
												if (markObj.both) {
																$scope.$emit("zlzgAryChange", 1);
																$scope.$emit("xxdjbcAryChange", 1);
												} else if (markObj.licenceZlzg || markObj.cigaretteZlzg) {
																$scope.$emit("zlzgAryChange", 1);
												} else if (markObj.xxdj) {
																$scope.$emit("xxdjbcAryChange", 1);
												}
								}
								/*$scope.b = orderRectification.ME_RESLUT01;
        $scope.a = orderRectification.ME_RESLUT03;*/
				});

				$scope.preview = '预览';
				$scope.keep = '保存';
				$scope.count = 0;
				// 点击切换文书函数
				$scope.focusIndex0 = true;
				$scope.focusIndex1 = false;
				$scope.focus = function () {
								$scope.focusIndex0 = !$scope.focusIndex0;
								$scope.focusIndex1 = !$scope.focusIndex1;
								$scope.count++;
								if ($scope.count % 2 == 0) {
												$scope.preview = '预览';
												$scope.keep = '保存';
								} else {
												$scope.preview = '编辑';
												$scope.keep = '打印';
												previewBook();
								}
				};

				//保存责令整改
				$scope.keepSave = function () {
								keepSaveData = {
												customername: $scope.orderRectification.CUSTOMERNAME,
												customerplace: $scope.orderRectification.CUSTOMERPLACE,
												meReslut01: $scope.orderRectification.ME_RESLUT01,
												meReslut03: $scope.orderRectification.ME_RESLUT03,
												meReslut04: $scope.orderRectification.ME_RESLUT04,
												meReslut07: $scope.orderRectification.ME_RESLUT07,
												meReslut08: $scope.orderRectification.ME_RESLUT08,
												meReslut09: $scope.orderRectification.ME_RESLUT09,
												meReslut10: $scope.orderRectification.ME_RESLUT10,
												regielicenceno: $scope.orderRectification.REGIELICENCENO,
												examdate: $scope.orderRectification.EXAMDATE
								};
								keepSaveData.meReslut18 = $scope.orderRectification.ME_RESLUT18; //许可证有效期过期
								keepSaveData.meReslut19 = $scope.orderRectification.ME_RESLUT19; //违反...请带好
								keepSaveData.meReslut20 = $scope.orderRectification.ME_RESLUT20; //违反《烟草专卖法》
								keepSaveData.meReslut21 = $scope.orderRectification.ME_RESLUT21; //中队留存
								keepSaveData.meReslut22 = $scope.orderRectification.ME_RESLUT22; //交办证窗口
								keepSaveData.me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;
								var _iteratorNormalCompletion2 = true;
								var _didIteratorError2 = false;
								var _iteratorError2 = undefined;

								try {
												for (var _iterator2 = Object.keys(keepSaveData)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
																var i = _step2.value;

																if (/^meReslut\d+$/.test(i)) {
																				keepSaveData[i] = Object.is(keepSaveData[i], true) ? "1" : "0";
																};
												}
								} catch (err) {
												_didIteratorError2 = true;
												_iteratorError2 = err;
								} finally {
												try {
																if (!_iteratorNormalCompletion2 && _iterator2.return) {
																				_iterator2.return();
																}
												} finally {
																if (_didIteratorError2) {
																				throw _iteratorError2;
																}
												}
								}

								;
								if (jQuery(event.target).html() == '打印') {
												wmf.callNativeDelegateFunc(JSON.stringify({
																"cmd": "cmd_printnotice",
																"params": JSON.stringify({
																				"id": me19Id,
																				"type": "04",
																				"params": "{}"
																})
												}), function (backData) {
																console.log("打印调用成功");
																console.log(backData);
												});
								} else {
												appService.requireForWMF(wmf, keepSaveData, "RegieProExaminfoAdapter", "saveRectifyList", function (data) {
																console.log(data);
																//物品登记未开放则提示需要签退
																if ($rootScope.xxdjbcAry.length == 0) {
																				appService.confirmPopup("保存成功,是否签退", "签退询问通知").then(function (res) {
																								if (res) {
																												$state.go("marketInspect");
																												//等路由跳转结束再更新$ionicHistory
																												setTimeout(function () {
																																//将首页作为市场情况的backView
																																$ionicHistory.viewHistory().backView = $rootScope.homeView;
																												}, 1000);
																								}
																				});
																} else {
																				$scope.$emit("nextNavtigation", "marketInspectRecord.goodsInformationRegistration");
																				$state.go("marketInspectRecord.goodsInformationRegistration", {
																								params: $stateParams.params
																				});
																}
												});
								}
				};
				// 预览整改通知书方法
				var previewBookParms = {
								"me11Id": $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
				};
				var previewBook = function previewBook() {
								appService.requireForWMF(wmf, previewBookParms, "RegieProExaminfoAdapter", "getRectifyList", function (data) {
												console.log(data);
												$scope.previewDate = data.result.list[0];
												$scope.Hdate = data.result.list[0].EXAMDATE;
												$scope.Hdate_ch = data.result.list[0].EXAMDATE_CH;
								});
				};
}]);