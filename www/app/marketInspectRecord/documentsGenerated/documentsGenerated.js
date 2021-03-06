"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _app = require("../../main/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description 文书合成控制器
 * @author :yangyong
 */
_app2.default.controller("documentsGeneratedCtrl", ["$scope", "$state", "$stateParams", "initData", "appService", "$ionicPopup", "$rootScope", "$ionicModal", function ($scope, $state, $stateParams, initData, appService, $ionicPopup, $rootScope, $ionicModal) {
    var isMainTrangress = true; //标记是否是主要案件性质
    var carryMetail = [{ isChoice: false, choiceText: '身份证' }, { isChoice: false, choiceText: '营业执照' }, { isChoice: false, choiceText: '许可证副本' }, { isChoice: false, choiceText: '委托书及受托人身份证' }, { isChoice: false, choiceText: '' }]; //携带材料数组和其保存参数初始化
    var carryMetailVal = '';
    var processMethodAry = []; //处理方法数组
    $scope.mainTrangress = '请选择'; //主要案件性质
    $scope.subTrangress = '请选择'; //次要案件性质
    $scope.carryMetailText = '携带材料种类'; //携带的材料
    $scope.processMethodText = '请选择办法'; //处理方法
    var ask_address = void 0,
        dept_address = void 0,
        storage_address = void 0,
        contacter = void 0,
        contactphone = void 0;
    //生成文书参数
    var createDocumentPramas = {};
    var customeId = void 0;
    $scope.cardPhoto;
    $scope.cardidPhotoId;
    $scope.positivePhotoId;
    $scope.sidePhotoId;

    /**
     * @describe:页面加载完初始化wmf对象,并进行相关初始化操作
     */
    $scope.$watch('$viewContentLoaded', function () {
        console.log(initData.result);
        me11Id: $rootScope.me11Id;
        $scope.itpList = initData.result.itpList;
        $scope.itcList = initData.result.itcList;
        $scope.examInfoList = initData.result.examInfoList[0];
        $scope.suspectByReg = initData.result.suspectByReg[0];
        $scope.getDeptInfo = initData.result.getDeptInfo;
        $scope.transgressList = initData.result.transgressList;
        $scope.typeList = initData.result.typeList;
        $scope.typeList.unshift({ "CODE": "100", "NAME": "请选择车辆类型" });
        $scope.carType = "100";
        customeId = initData.result.suspectByReg[0].CUSTOMER_ID;
        //案发时间
        $scope.caseTime = appService.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(), true);
        //询问时间
        $scope.inquiryTime = "请选择时间";

        var ASK_ADDRESS = []; //询问地址
        var CONTACTER = []; //联系人
        var CONTACTPHONE = []; //联系电话
        var DEPT_ADDRESS = []; //本局地址
        var STORAGE_ADDRESS = []; //物品保存地址
        //遍历把参数写到数组中
        angular.forEach($scope.getDeptInfo, function (item, index) {
            ASK_ADDRESS.push($scope.getDeptInfo[index].ASK_ADDRESS);
            CONTACTER.push($scope.getDeptInfo[index].CONTACTER);
            CONTACTPHONE.push($scope.getDeptInfo[index].CONTACTPHONE);
            DEPT_ADDRESS.push($scope.getDeptInfo[index].DEPT_ADDRESS);
            STORAGE_ADDRESS.push($scope.getDeptInfo[index].STORAGE_ADDRESS);
        });
        contacter = CONTACTER;
        ask_address = ASK_ADDRESS;
        contactphone = CONTACTPHONE;
        dept_address = DEPT_ADDRESS;
        storage_address = STORAGE_ADDRESS;
        //初始化选择框
        $scope.liName = "请选择联系人"; //联系人
        $scope.liPhone = "请选择联系电话"; //联系电话
        $scope.liAsk = "请选择地点"; //询问地点
        $scope.liDept = "请选择地址"; //本局地址
        $scope.liStorage = "请选择地点"; //物品保存地址
        $scope.iSelect = "请选择"; //主要案件性质
        $scope.concatSex = '请选择性别';
    });

    /**
     * @description: 案发时间控件相关属性设置
     * @type {Date}
     */
    var now = new Date();
    $scope.mydatetime = now;
    $scope.settings = {
        headerText: "案发时间选择",
        theme: 'material',
        lang: 'zh',
        display: 'center',
        min: new Date(now.getFullYear() - 1, 0, 1),
        max: new Date(now.getFullYear(), 11, 31),
        maxWidth: 80,
        minWidth: 50,
        rows: 3,
        monthText: '',
        buttons: [{
            text: '完成',
            cssClass: 'choicedTime',
            handler: function handler(event, inst) {
                $scope.caseTime = appService.dateFtt("yyyy-MM-dd hh:mm:ss", inst.getVal());
                $scope.$apply();
                inst.cancel();
            }
        }]
    };

    /**
     * @description: 询问时间控件相关属性设置
     * @type {Date}
     */
    $scope.settings1 = {
        headerText: "询问时间选择",
        theme: 'material',
        lang: 'zh',
        display: 'center',
        min: now,
        max: new Date(now.getFullYear() + 1, 11, 31),
        maxWidth: 80,
        minWidth: 50,
        rows: 3,
        steps: {
            minute: 60,
            zeroBased: true
        },
        monthText: '',
        buttons: [{
            text: '完成',
            cssClass: 'choicedTime',
            handler: function handler(event, inst) {
                $scope.inquiryTime = appService.dateFtt("yyyy-MM-dd hh", inst.getVal());
                $scope.$apply();
                inst.cancel();
            }
        }]
    };

    /**
     * @description 相关车辆弹出框
     * @param itpId 用于区别新增相关车辆和删除、更新车辆人员操作
     */
    $scope.showPopup = function (itcId) {
        // 查询相关车辆
        if (itcId) {
            appService.requireForWMF(wmf, {
                itcId: itcId
            }, 'RegieProExaminfoAdapter', 'getCa13ById', function (data) {
                console.log(data);
                $scope.addlicense = data.result.itcIdList[0].LICENSE;
                $scope.carType = data.result.itcIdList[0].CARTYPECODE;
                $scope.positivePhotoId = data.result.itcIdList[0].POSITIVE_PHOTO;
                $scope.sidePhotoId = data.result.itcIdList[0].SIDE_PHOTO;
            });
        }

        var myPopup = $ionicPopup.show({
            templateUrl: 'app/marketInspectRecord/documentsGenerated/popup.html',
            title: "<div class='popupHead'>" + (itcId ? '修改相关车辆' : '添加相关车辆') + "</div>",
            cssClass: 'alert-popup',
            scope: $scope,
            buttons: [{
                text: itcId ? "删除" : '取消',
                type: 'button-assertive',
                onTap: function onTap() {
                    if (itcId) {
                        appService.requireForWMF(wmf, {
                            itcId: itcId
                        }, 'RegieProExaminfoAdapter', 'delCa13ById', function (data) {
                            console.log('删除相关车辆成功');
                            console.log(data);
                        });
                    }
                }
            }, {
                text: itcId ? "完成" : '添加',
                type: 'button-positive',
                onTap: function onTap(e) {
                    if (itcId) {
                        appService.requireForWMF(wmf, {
                            license: $scope.addlicense,
                            cartypecode: $scope.carType,
                            positivePhotoId: $scope.positivePhotoId,
                            sidePhotoId: $scope.sidePhotoId,
                            itcId: itcId
                        }, 'RegieProExaminfoAdapter', 'updateCa13ById', function (data) {
                            console.log('更新相关车辆成功');
                            console.log(data);
                        });
                    } else {
                        appService.requireForWMF(wmf, {
                            me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id,
                            license: $scope.addlicense,
                            carType: $scope.carType,
                            positivePhotoId: $scope.positivePhotoId,
                            sidePhotoId: $scope.sidePhotoId
                        }, 'RegieProExaminfoAdapter', 'saveCa13ById', function (data) {
                            console.log('添加相关车辆成功');
                            console.log(data);
                        });
                    }
                }
            }]
        });
    };

    /**
     * @description 相关人员弹出框
     * @param itpId:用于区别新增相关人员和删除、更新相关人员操作
     */
    $scope.showUserPopup = function (itpId) {
        if (itpId) {
            appService.requireForWMF(wmf, {
                itpId: itpId
            }, 'RegieProExaminfoAdapter', 'getCa12ById', function (data) {
                $scope.addName = data.result.itpList[0].NAME;
                $scope.addCardid = data.result.itpList[0].CARDID;
                $scope.addIptPhone = data.result.itpList[0].ITP_PHONE;
                $scope.addItpRemark = data.result.itpList[0].ITP_REMARK;
            });
        }
        var myPopup = $ionicPopup.show({
            templateUrl: 'app/marketInspectRecord/documentsGenerated/user-popup.html',
            title: "<div class='popupHead'>\n                  " + (itpId ? '修改相关人员资料' : '添加相关人员资料') + "\n                </div>",
            cssClass: 'alert-popup',
            scope: $scope,
            buttons: [{
                text: itpId ? "删除" : '取消',
                type: 'button-assertive',
                onTap: function onTap(e) {
                    if (itpId) {
                        appService.requireForWMF(wmf, {
                            itpId: itpId
                        }, 'RegieProExaminfoAdapter', 'delCa12ById', function (data) {
                            console.log('删除相关人员保存成功');
                            console.log(data);
                        });
                    }
                }
            }, {
                text: itpId ? "完成" : '添加',
                type: 'button-positive',
                onTap: function onTap(e) {
                    if (itpId) {
                        appService.requireForWMF(wmf, {
                            itpName: $scope.addName,
                            cardid: $scope.addCardid,
                            iptPhone: $scope.addIptPhone,
                            itpRemark: $scope.addItpRemark,
                            cardidPhotoId: $scope.cardidPhotoId,
                            itpId: itpId
                        }, 'RegieProExaminfoAdapter', 'updateCa12ById', function (data) {
                            console.log('更新相关人员保存成功');
                            console.log(data);
                        });
                    } else {
                        appService.requireForWMF(wmf, {
                            me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id,
                            name: $scope.addName,
                            cardid: $scope.addCardid,
                            iptPhone: $scope.addIptPhone,
                            itpRemark: $scope.addItpRemark,
                            cardidPhotoId: $scope.cardidPhotoId
                        }, 'RegieProExaminfoAdapter', 'saveCa12ById', function (data) {
                            console.log('添加相关人员保存成功');
                            console.log(data);
                        });
                    }
                }
            }]
        });
    };

    /**
     * @description: 拍照
     */
    $scope.talkPhoto = function (flag) {
        var ele = event.target;
        wmf.imageTaker(function (stringImage) {
            ele.src = stringImage;
            switch (flag) {
                case "cardPhoto":
                    $scope.cardPhoto = stringImage;break;
                case "cardidPhotoId":
                    $scope.cardidPhotoId = stringImage;break;
                case "positivePhotoId":
                    $scope.positivePhotoId = stringImage;break;
                case "sidePhotoId":
                    $scope.sidePhotoId = stringImage;break;
            }
        });
    };

    //物品处理办法
    $scope.showArticlesPopup = function () {
        //恢复初始化
        $scope.processMethodText = '';
        processMethodAry = [];

        var alertPopup = $ionicPopup.alert({
            templateUrl: 'app/marketInspectRecord/documentsGenerated/articles-popup.html',
            title: "<div class='popupHead'>物品处理办法</div>",
            cssClass: 'articles-popup',
            scope: $scope,
            buttons: [{
                text: '完成',
                type: 'button-positive',
                onTap: function onTap(e) {
                    //拼接处理方法保存时需要的参数
                    createDocumentPramas.dealway = processMethodAry.toString();
                    //拼接处理方法回显得文本
                    processMethodAry.find(function (val, index, ary) {
                        switch (val) {
                            case '01':
                                $scope.processMethodText = $scope.processMethodText + '将物品送鉴定和检验,';break;
                            case '02':
                                $scope.processMethodText = $scope.processMethodText + '移送有关部门处理,';break;
                            case '03':
                                $scope.processMethodText = $scope.processMethodText + '采取证据保全措施,';break;
                            case '04':
                                $scope.processMethodText = $scope.processMethodText + '依法不予行政处罚,接触保全措施,';break;
                        }
                    });
                    $scope.processMethodText = $scope.processMethodText.slice(0, $scope.processMethodText.length - 1);
                }
            }]
        });
    };

    //当事人需要携带证件资料弹出框
    $scope.showDocumentsData = function () {
        //恢复初始化
        $scope.carryMetailText = '';
        carryMetail = [{ isChoice: false, choiceText: '身份证' }, { isChoice: false, choiceText: '营业执照' }, { isChoice: false, choiceText: '许可证副本' }, { isChoice: false, choiceText: '委托书及受托人身份证' }, { isChoice: false, choiceText: '' }];
        var alertPopup = $ionicPopup.alert({
            templateUrl: 'app/marketInspectRecord/documentsGenerated/documentsData-popup.html',
            title: "<div class='popupHead'>当事人需要携带证件资料</div>",
            cssClass: 'articles-popup',
            scope: $scope,
            buttons: [{
                text: '完成',
                type: 'button-positive',
                onTap: function onTap(e) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = carryMetail.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _step$value = _slicedToArray(_step.value, 2),
                                index = _step$value[0],
                                elem = _step$value[1];

                            //拼接需要传递的需要携带材料参数
                            if (index < carryMetail.length - 1) {
                                carryMetailVal = carryMetailVal + ("0" + (index + 1) + ":" + elem.isChoice + ",");
                            } else {
                                carryMetailVal = carryMetailVal + ("0" + (index + 1) + ":" + elem.isChoice);
                            }
                            //拼接显示需要携带材料的文本
                            if (elem.isChoice) {
                                $scope.carryMetailText = $scope.carryMetailText + elem.choiceText + ",";
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    $scope.carryMetailText = $scope.carryMetailText.slice(0, $scope.carryMetailText.length - 1);

                    createDocumentPramas.bringdatum = carryMetailVal;
                    createDocumentPramas.othercontent = $scope.othercontent ? "," + $scope.othercontent : "";
                    $scope.carryMetailText = $scope.carryMetailText + createDocumentPramas.othercontent;
                }
            }]
        });
    };

    /**
    * @description :携带材料列表项点击事件
    */
    $scope.bgClick = function () {
        if (jQuery(event.target).hasClass('elect')) {
            jQuery(event.target).removeClass('elect');
            carryMetail.find(function (value, index, ary) {
                if (index == parseInt(jQuery(event.target).attr("data-metailId")) - 1) {
                    ary[index].isChoice = false;
                }
            });
        } else {
            jQuery(event.target).addClass('elect');
            carryMetail.find(function (value, index, ary) {
                if (index == parseInt(jQuery(event.target).attr("data-metailId")) - 1) {
                    ary[index].isChoice = true;
                }
            });
        }
    };
    /**
    * @description: 处理方法列表点击事件
    */
    $scope.processMethod = function () {
        if (jQuery(event.target).hasClass('elect')) {
            jQuery(event.target).removeClass('elect');
            processMethodAry.find(function (value, index, ary) {
                if ("0" + (index + 1) == jQuery(event.target).attr("data-processMethod")) {
                    ary.split(index, 1);
                }
            });
        } else {
            jQuery(event.target).addClass('elect');
            processMethodAry.push(jQuery(event.target).attr("data-processMethod"));
        }
    };
    /**
    * @description: 模态框单选点击事件
    */
    $scope.signClick = function () {
        if (jQuery(event.target).hasClass('elect')) {
            jQuery(event.target).removeClass('elect');
        } else {
            jQuery(event.target).addClass('elect');
            jQuery(event.target).siblings().removeClass('elect');
            $scope.modelAddress1 = jQuery(event.target).html();
        }
    };

    //联系人
    $scope.showContactPerson = function (index) {
        if (index == 0) {
            //index=0表示打开请选择联系人 1表示打开联系电话
            $scope.g = contacter;
        } else {
            $scope.g = contactphone;
        }
        var alertPopup = $ionicPopup.alert({
            templateUrl: 'app/marketInspectRecord/documentsGenerated/contactPerson-popup.html',
            title: "<div class='popupHead'>" + (index == 0 ? "请选择联系人" : "请选择联系电话") + "</div>",
            cssClass: 'articles-popup',
            scope: $scope,
            buttons: [{
                text: '完成',
                type: 'button-positive',
                onTap: function onTap(e) {
                    (function (chooseItemVal) {
                        if (index == 0) {
                            $scope.liName = chooseItemVal;
                        } else {
                            $scope.liPhone = chooseItemVal;
                        }
                    })($scope.modelAddress1);
                }
            }]
        });
    };

    //请选择或添加地址
    $scope.showAddress = function (index) {
        $scope.hidenText = true; //是否隐藏修改文本框
        var title = "请选择地址或者手动输入地址";
        if (index == 0) {
            $scope.modelAddress = ask_address;
        } else if (index == 1) {
            $scope.modelAddress = dept_address;
        } else if (index == 2) {
            $scope.modelAddress = storage_address;
        } else {
            title = '请选择地址性别';
            $scope.hidenText = false;
            $scope.modelAddress = ["男", "女"];
        };
        var alertPopup = $ionicPopup.alert({
            templateUrl: 'app/marketInspectRecord/documentsGenerated/address-popup.html',
            title: "<div class='popupHead'>" + title + "</div>",
            cssClass: 'articles-popup',
            scope: $scope,
            buttons: [{
                text: '完成',
                type: 'button-positive',
                onTap: function onTap(e) {
                    //点击完成，将文本框赋值给对应的变量
                    (function (chooseItemVal) {
                        switch (index) {
                            case 0:
                                $scope.liAsk = chooseItemVal;break;
                            case 1:
                                $scope.liDept = chooseItemVal;break;
                            case 2:
                                $scope.liStorage = chooseItemVal;break;
                            case 3:
                                $scope.concatSex = chooseItemVal;break;
                        }
                    })($scope.modelAddress1);
                    //点击完成后，清空文本框中的输入值
                    $scope.modelAddress1 = "";
                }
            }]
        });
    };

    //主要案件性质
    $ionicModal.fromTemplateUrl('app/marketInspectRecord/documentsGenerated/mainTheCase.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    //选中每个案件性质点击事件
    $scope.boxClick = function () {
        var clickEle = event.target;
        //判断是否点击的是li里面的div，是则选择器父节点li
        if (clickEle.tagName == "DIV") {
            if (isMainTrangress) {
                $scope.mainTrangress = jQuery(clickEle).parent().attr("data-transgressName");
                createDocumentPramas.transgressId = jQuery(clickEle).parent().attr("data-transgressId");
            } else {
                $scope.subTrangress = jQuery(clickEle).parent().attr("data-transgressName");
                createDocumentPramas.subTransgressId = jQuery(clickEle).parent().attr("data-transgressId");
            }
        } else {
            if (isMainTrangress) {
                $scope.mainTrangress = jQuery(clickEle).attr("data-transgressName");
                createDocumentPramas.transgressId = jQuery(clickEle).parent().attr("data-transgressId");
            } else {
                $scope.subTrangress = jQuery(clickEle).attr("data-transgressName");
                createDocumentPramas.subTransgressId = jQuery(clickEle).parent().attr("data-transgressId");
            }
        }
        $scope.modal.hide();
    };
    //案件性质分类标签点击事件
    $scope.tabsClick = function () {
        var paramsVal = {
            transgresscode: jQuery(event.target).attr("data-typeCode")
        };
        if (jQuery(event.target).hasClass('tab')) {
            jQuery(event.target).removeClass('tab');
        } else {
            jQuery(event.target).addClass('tab');
            jQuery(event.target).siblings().removeClass('tab');
            appService.requireForWMF(wmf, paramsVal, 'RegieProExaminfoAdapter', 'getTransgressByType', function (data) {
                console.log(data);
                $scope.transgressByTypeList = data.result.transgressByTypeList;
            });
        }
    };

    //案件性质选择模态框点击事件
    $scope.openModal = function (flag) {
        isMainTrangress = flag;
        $scope.modal.show();
        appService.requireForWMF(wmf, {
            me11Id: $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id
        }, 'RegieProExaminfoAdapter', 'getTransgressType', function (data) {

            $scope.transgressTypeList = data.result.transgressTypeList;
            //初始化时请求案件性质列表
            appService.requireForWMF(wmf, {
                transgresscode: '00'
            }, 'RegieProExaminfoAdapter', 'getTransgressByType', function (data) {
                console.log(data);
                $scope.transgressByTypeList = data.result.transgressByTypeList;
            });
        });
    };

    //文书生成点击事件
    $scope.savaDocument = function () {
        createDocumentPramas.me11Id = $rootScope.me11Id ? $rootScope.me11Id : JSON.parse($stateParams.params).me11_id;
        createDocumentPramas.happenTime = $scope.caseTime; //案发时间
        createDocumentPramas.happenAddress = $scope.caseAddress; //案发地点
        createDocumentPramas.age = $scope.age; //年龄
        createDocumentPramas.storeaddress = $scope.liStorage; //物品保存地址
        createDocumentPramas.remark = $scope.remark; //特别注意事项
        createDocumentPramas.customerplace = $scope.liDept; //本局地址
        createDocumentPramas.asktime = $scope.inquiryTime; //询问时间
        createDocumentPramas.askAddress = $scope.liAsk; //询问地点
        createDocumentPramas.linkmanname = $scope.liName; //联系人
        createDocumentPramas.linkphone = $scope.liPhone; //联系电话
        createDocumentPramas.cardPhoto = $scope.cardPhoto;
        createDocumentPramas.proveUpRemark = $scope.proveUpRemark;
        createDocumentPramas.customerId = customeId;
        createDocumentPramas.suspectObjName = $scope.suspectByReg.SUSPECTOBJNAME;
        createDocumentPramas.phone = $scope.suspectByReg.PHONE;
        createDocumentPramas.contactaddress = $scope.suspectByReg.CONTACTADDRESS;
        createDocumentPramas.sexname = $scope.concatSex;
        createDocumentPramas.cardid = $scope.suspectByReg.CARDID;
        appService.requireForWMF(wmf, createDocumentPramas, 'RegieProExaminfoAdapter', 'saveCaseInfo', function (data) {
            console.log(data);
            $scope.$emit("nextNavtigation", "marketInspectRecord.documentPreview");
        });
    };
}]);