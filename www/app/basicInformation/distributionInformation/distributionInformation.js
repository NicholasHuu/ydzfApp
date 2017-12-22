"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.controller("distributionInformationCtrl", ["$scope", "initData", function ($scope, initData) {

	$scope.$watch('$viewContentLoaded', function () {
		$scope.storeData = initData.result[0];
	});
}]);