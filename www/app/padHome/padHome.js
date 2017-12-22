"use strict";

var _app = require("../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.controller("padHomeCtrl", ["$scope", "$state", function ($scope, $state) {
  var d = new Date();
  $scope.storeData1 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}]);