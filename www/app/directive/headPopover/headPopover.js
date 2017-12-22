"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description: headPopover自定义指令
 * @author yongyong
 */
_app2.default.directive("headPopover", ["$state", function ($state) {
    return {
        restrict: "EA",
        templateUrl: "app/directive/headPopover/headPopover.html",
        scope: {},
        controller: function controller($scope) {
            $scope.goInspectors = function () {
                $state.go("mine");
            };
        }
    };
}]);