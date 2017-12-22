"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.directive("finishRender", ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function link(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished'); //事件通知
                    var fun = scope.$eval(attr.finishRender);
                    if (fun && typeof fun == 'function') {
                        fun(); //回调函数
                    }
                });
            }
        }
    };
}]);