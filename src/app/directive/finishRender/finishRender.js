import appMoudle from "../../main/app"

appMoudle.directive("finishRender",['$timeout', '$parse', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished'); //事件通知
                    var fun = scope.$eval(attr.finishRender);
                    if(fun && typeof(fun)=='function'){
                        fun();  //回调函数
                    }
                });
            }
        }
    }
}]);