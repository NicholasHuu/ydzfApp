"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.controller("nearbyCtrl", ["$scope", "$state", "initData", function ($scope, $state, initData) {
	$scope.$watch('$viewContentLoaded', function () {
		/*
  result
  nearRegList
  exam
  CUSTOMERNAME
  CUSTOMERPLACE
  DISTANCE
  ME11_ID
  ME20_ID
  REGIELICENCENO
  */
		console.log(initData.result.nearRegList);
		$scope.storeData = initData.result.nearRegList;
	});
	$scope.planListClick = function () {
		$state.go("basicInformation");
	};
}]);