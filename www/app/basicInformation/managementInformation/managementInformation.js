"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @descirbe:管理信息
 * @author:gaoqian
 */

_app2.default.controller("managementInformationCtrl", ["$scope", "initData", function ($scope, initData) {
	/**
  * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
  */
	$scope.$watch('$viewContentLoaded', function () {
		console.log(initData.result);
		$scope.storeData = initData.result[0];
	});
}]);