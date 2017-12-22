"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @descirbe:市场检查记录
 * @author:huran
 */
_app2.default.controller("marketInspectionRecordCtrl", ["$scope", "initData", "$stateParams", function ($scope, initData, $stateParams) {
	/**
  * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
  */
	$scope.$watch('$viewContentLoaded', function () {
		$scope.data = initData.result;
	});
}]);