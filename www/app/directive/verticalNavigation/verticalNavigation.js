"use strict";

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description: 垂直导航指令控制器
 * @author: yangyong
 */
_app2.default.directive("verticalNavigation", function () {
    return {
        restrict: "EA",
        templateUrl: "app/directive/verticalNavigation/verticalNavigation.html",
        replace: true,
        transclude: true,
        scope: {
            menuAry: '=',
            menuClick: '&'
        },
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                post: function post(scope, iElement) {
                    //当没有transclude模板是，页面底部按钮容器影藏
                    if (Object.is(iElement.find("div.ngCludeContrain")[0].innerHTML, '')) {
                        tElement.find("div.footerBtnContrain").css("display", "none");
                    }
                }
            };
        }
    };
});