"use strict";

var _app = require("../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @describe: 时间格式化
 */
_app2.default.filter("formatDate", function () {
    return function (str) {
        var monthAndDay = str.split(",")[0];
        var month = monthAndDay.split(" ")[0];
        var monthVal;
        switch (month) {
            case "Jan":
                monthVal = 1;break;
            case "Feb":
                monthVal = 2;break;
            case "Mar":
                monthVal = 3;break;
            case "Apr":
                monthVal = 4;break;
            case "May":
                monthVal = 5;break;
            case "Jun":
                monthVal = 6;break;
            case "Jul":
                monthVal = 7;break;
            case "Aug":
                monthVal = 8;break;
            case "Sep":
                monthVal = 9;break;
            case "Oct":
                monthVal = 10;break;
            case "Nov":
                monthVal = 11;break;
            case "Dec":
                monthVal = 12;break;
        }
        return str.split(",")[1].split(" ")[1] + "-" + monthVal + "-" + monthAndDay.split(" ")[1];
    };
})
/**
 * @describe: 举报违法记录页面长字符串处理
 */
.filter("marketInspectionRecordLongStr", function () {
    return function (str) {
        if (str.length < 12) {
            return str;
        } else {
            return str.substring(0, 12) + "<br/>" + str.substring(12);
        }
    };
}).filter("complaintReportLongStr", function () {
    return function (str) {
        if (str.length < 8) {
            return str;
        } else {
            return str.substring(0, 8) + "<br/>" + str.substring(8, 18);
        }
    };
})
/**
 * @describe: 基础档案查询页面中一人多控01是02否
 */
.filter("onManConStr", function () {
    return function (str) {
        switch (str) {
            case "01":
                str = "是";break;
            case "02":
                str = "否";break;
        }
        return str;
    };
});