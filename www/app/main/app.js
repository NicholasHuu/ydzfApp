'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 定义应用模块并导出
 */
exports.default = angular.module('main', ['ionic', 'mobiscroll-datetime']).config(["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    /*路由配置*/
    $stateProvider
    /*首页*/
    .state('home', {
        url: "/home",
        templateUrl: "app/home/home.html",
        controller: 'homeCtrl',
        resolve: {
            requireService: "appService",
            initData: function initData(appService) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "examDate": appService.dateFtt("yyyy-MM-dd", new Date()),
                        "userName": wmf.UserID
                    }, "RegieAppExaminfoAdapter", "getExamCount", function () {});
                });
            }
        }
    })
    /*我的*/
    .state('mine', {
        url: "/mine",
        templateUrl: "app/mine/mine.html",
        controller: 'mineCtrl',
        resolve: {
            requireService: "appService",
            initData: function initData(appService) {
                return appService.wmfPromise.then(function () {
                    return [{
                        user: "宋振宇",
                        gangwei: "案件督导岗（分局）",
                        checked: false
                    }, {
                        user: "宋振宇",
                        gangwei: "案件督导岗（分局）",
                        checked: false
                    }, {
                        user: "宋振宇",
                        gangwei: "案件督导岗（分局）",
                        checked: false
                    }];
                });
            }
        }
    })
    /*市场检查*/
    .state('marketInspect', {
        url: "/marketInspect",
        templateUrl: "app/marketInspect/marketInspect.html",
        controller: 'marketInspectCtrl'
    })
    /*市场检查-计划外*/
    .state('marketInspect.outsideThePlan', {
        url: "/outsideThePlan/:params",
        templateUrl: "app/marketInspect/outsideThePlan/outsideThePlan.html",
        controller: 'outsideThePlanCtrl',
        resolve: {
            requireService: "appService",
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "menuCode": JSON.parse($stateParams.params).menuCode,
                        "examDate": JSON.parse($stateParams.params).examDate
                    }, "RegieProExaminfoAdapter", "getExamInfoList", function () {});
                });
            }
        }
    })
    /*市场检查-计划内*/
    .state('marketInspect.insideThePlan', {
        url: "/insideThePlan/:params",
        templateUrl: "app/marketInspect/insideThePlan/insideThePlan.html",
        controller: 'insideThePlanCtrl',
        resolve: {
            requireService: "appService",
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "menuCode": JSON.parse($stateParams.params).menuCode,
                        "examDate": JSON.parse($stateParams.params).examDate
                    }, "RegieProExaminfoAdapter", "getExamInfoList", function () {});
                });
            }
        }
    })
    /*市场检查-附近*/
    .state('marketInspect.nearby', {
        url: "/nearby",
        templateUrl: "app/marketInspect/nearby/nearby.html",
        controller: 'nearbyCtrl',
        resolve: {
            requireService: "appService",
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "menuCode": "3",
                        "jd": "121.453826",
                        "wd": "31.277986",
                        "range": 300,
                        "examdate": "2017-12-09"
                    }, "RegieProExaminfoAdapter", "getExamInfoList", function () {});
                });
            }
        }
    })
    // 基础档案查询
    .state('basicInformation', {
        url: "/basicInformation/:params",
        templateUrl: "app/basicInformation/basicInformation.html",
        controller: 'basicInformationCtrl'
    })
    /*基础档案查询-基础信息*/
    .state('basicInformation.essentialInformation', {
        url: "/essentialInformation/:params",
        templateUrl: "app/basicInformation/essentialInformation/essentialInformation.html",
        controller: 'essentialInformationCtrl',
        resolve: {
            requireService: "appService",
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieAppExaminfoAdapter", "getBasicLicenceData", function () {});
                });
            }
        }
    })
    /*基础档案查询-经营信息*/
    .state('basicInformation.businessInformation', {
        url: "/businessInformation/:params",
        templateUrl: "app/basicInformation/businessInformation/businessInformation.html",
        controller: 'businessInformationCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieAppExaminfoAdapter", "getBusinessLicenceData", function () {});
                });
            }
        }
    })
    /*基础档案查询-管理信息*/
    .state('basicInformation.managementInformation', {
        url: "/managementInformation/:params",
        templateUrl: "app/basicInformation/managementInformation/managementInformation.html",
        controller: 'managementInformationCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieAppExaminfoAdapter", "getManagerLicenceData", function () {});
                });
            }
        }
    })
    /*基础档案查询-配送信息*/
    .state('basicInformation.distributionInformation', {
        url: "/distributionInformation",
        templateUrl: "app/basicInformation/distributionInformation/distributionInformation.html",
        controller: 'distributionInformationCtrl',
        resolve: {
            requireService: "appService",
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regiellicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieAppExaminfoAdapter", "getDeliveryLicenceData", function () {});
                });
            }
        }
    })
    // 基础档案查询-变更信息
    .state('basicInformation.changeInformation', {
        url: "/changeInformation/:params",
        templateUrl: "app/basicInformation/changeInformation/changeInformation.html",
        controller: 'changeInformationCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieAppExaminfoAdapter", "getOperationHistory", function () {});
                });
            }
        }
    })
    // 基础档案查询-违法记录
    .state('basicInformation.illegalRecord', {
        url: "/illegalRecord/:params",
        templateUrl: "app/basicInformation/illegalRecord/illegalRecord.html",
        controller: 'illegalRecordCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieAppExaminfoAdapter", "getIllegalRecord", function () {});
                });
            }
        }
    })
    // 基础档案查询-市场检查记录
    .state('basicInformation.marketInspectionRecord', {
        url: "/marketInspectionRecord/:params",
        templateUrl: "app/basicInformation/marketInspectionRecord/marketInspectionRecord.html",
        controller: 'marketInspectionRecordCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieAppExaminfoAdapter", "getExamRecord", function () {});
                });
            }
        }
    })
    // 基础档案查询-违规记录
    .state('basicInformation.violationRecord', {
        url: "/violationRecord/:params",
        templateUrl: "app/basicInformation/violationRecord/violationRecord.html",
        controller: 'violationRecordCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regiellicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieAppExaminfoAdapter", "getBreakRullRecord", function () {});
                });
            }
        }
    })
    // 基础档案查询-投诉举报记录
    .state('basicInformation.complaintReport', {
        url: "/complaintReport/:params",
        templateUrl: "app/basicInformation/complaintReport/complaintReport.html",
        controller: 'complaintReportCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieAppExaminfoAdapter", "getComplaintRecord", function () {});
                });
            }
        }
    })
    // 基础档案查询-形象信息
    .state('basicInformation.imageInformatio', {
        url: "/imageInformatio/:params",
        templateUrl: "app/basicInformation/imageInformatio/imageInformatio.html",
        controller: 'imageInformatioCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo
                    }, "RegieProExaminfoAdapter", "getImageInfo", function () {});
                });
            }
        }
    })
    // 基础档案查询
    .state('marketInspectRecord', {
        url: "/marketInspectRecord/:params",
        templateUrl: "app/marketInspectRecord/marketInspectRecord.html",
        controller: 'marketInspectRecordCtrl'
    })
    //检查情况记录-基础信息记录
    .state('marketInspectRecord.basicInfoRegistration', {
        url: "/basicInfoRegistration/:params",
        templateUrl: "app/marketInspectRecord/basicInfoRegistration/basicInfoRegistration.html",
        controller: 'basicInfoRegistrationCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo,
                        "examdate": JSON.parse($stateParams.params).examdate,
                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
                    }, "RegieProExaminfoAdapter", "getBasicExamInfo", function () {});
                });
            }
        }
    })
    // 基础档案查询-许可证使用情况
    .state('marketInspectRecord.licence', {
        url: "/licence/:params",
        templateUrl: "app/marketInspectRecord/licence/licence.html",
        controller: 'licenceCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
                    }, "RegieProExaminfoAdapter", "checkExamInfo", function () {});
                });
            }
        }
    })
    // 基础档案查询-卷烟经营情况
    .state('marketInspectRecord.cigaretteManagement', {
        url: "/cigaretteManagement/:params",
        templateUrl: "app/marketInspectRecord/cigaretteManagement/cigaretteManagement.html",
        controller: 'cigaretteManagementCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
                    }, "RegieProExaminfoAdapter", "checkExamInfo", function () {});
                });
            }
        }
    })
    // 基础档案查询-责令整改
    .state('marketInspectRecord.orderRectification', {
        url: "/orderRectification/:params",
        templateUrl: "app/marketInspectRecord/orderRectification/orderRectification.html",
        controller: 'orderRectificationCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
                    }, "RegieProExaminfoAdapter", "getRectifyList", function () {});
                });
            }
        }
    })
    // 基础档案查询-物品信息登记
    .state('marketInspectRecord.goodsInformationRegistration', {
        url: "/orderRectification",
        templateUrl: "app/marketInspectRecord/goodsInformationRegistration/goodsInformationRegistration.html",
        controller: 'goodsInformationRegistrationCtrl'
    })
    // 基础档案查询-文书生成
    .state('marketInspectRecord.documentsGenerated', {
        url: "/documentsGenerated/:params",
        templateUrl: "app/marketInspectRecord/documentsGenerated/documentsGenerated.html",
        controller: 'documentsGeneratedCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "regielicenceno": JSON.parse($stateParams.params).regielicenceNo,
                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
                    }, "RegieProExaminfoAdapter", "getCaseWriteInfoList", function () {});
                });
            }
        }
    })
    /*文书预览*/
    .state('marketInspectRecord.documentPreview', {
        url: "/documentPreview/:params",
        templateUrl: "app/marketInspectRecord/documentPreview/documentPreview.html",
        controller: 'documentPreviewCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {
                        "me11Id": appService.getMellId() ? appService.getMellId() : JSON.parse($stateParams.params).me11_id
                    }, "RegieProExaminfoAdapter", "getPreKeepNoticeByEventId", function () {});
                });
            }
        }
    })
    /*pad的首页*/
    .state('padHome', {
        url: "/padHome",
        templateUrl: "app/padHome/padHome.html",
        controller: 'padHomeCtrl'
    })
    /*pad的物品登记页面*/
    .state('registrationItems', {
        url: "/registrationItems/:params",
        templateUrl: "app/registrationItems/registrationItems.html",
        controller: 'registrationItemsCtrl',
        resolve: {
            requireService: 'appService',
            initData: function initData(appService, $stateParams) {
                return appService.wmfPromise.then(function () {
                    return appService.requireForWMF(wmf, {}, "RegieProExaminfoAdapter", "getUnLogoutByMe01Id", function () {});
                });
            }
        }
    });
    $urlRouterProvider.otherwise("/home");
    //根据pad的不同类型，加载不同的主页
    /*if(JSON.parse($rootScope.user_model).pad_type = '01'){
        $urlRouterProvider.otherwise("/mine");
    }else{
        $urlRouterProvider.otherwise("/padHome");
    }*/
}]);