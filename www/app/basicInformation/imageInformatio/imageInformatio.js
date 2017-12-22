"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @describe:形象信息
 * @author:yangyong
 */
_app2.default.controller("imageInformatioCtrl", ["$scope", "initData", function ($scope, initData) {

    $scope.$watch('$viewContentLoaded', function () {
        console.log(initData.result.placephoto);
        $scope.a = initData.result.placephoto;
    });
}]);