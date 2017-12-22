import appMoudle from "../main/app"

/**
 * @describe:应用自定义服务
 * @author：yangyong
 */
appMoudle.service("appService", ["$ionicLoading", "$rootScope", "$ionicPopup","$ionicNavBarDelegate",
    function($ionicLoading, $rootScope, $ionicPopup,$ionicNavBarDelegate) {
    let errorMessage; //错误消息提示文本
    let jd = '0';
    let wd = '0';
    /**
     * @describe:请求数据封装
     * @param wmfObj:wmf对象
     * @param paramsObj:请求参数
     * @returns {string}：封装后的数据
     */
    this.public_queryParams = (wmfObj, paramsObj) => {
        let params = `{
                        params:${JSON.stringify(paramsObj)},
                        date:${new Date().getTime()},
                        emp_id:${wmfObj.UserID},
                        emp_name:${wmfObj.UserName},
                        mobile_version:${wmfObj.SystemVersion},
                        app_code:${wmfObj.AppCode},
                        dev_id:${wmfObj.DeviceCode},
                        user_model:${JSON.stringify($rootScope.user_model)}//'{"user_id":"23316","staffer_id":"B50DEFF7336D62FDE04400306EF58742","user_name":"17177","real_name":"毛沈寅","department_id":"14","department_name":"徐汇区局","password":"52c69e3a57331081823331c4e69d3f2e","division":"1","dept_sub_id":"","dept_sub_name":"","me01_id":"4e764d01157f4d90b6ead77fdc13dc81"}'
                    }`;
        //${JSON.stringify($rootScope.user_model)}
        return params;
    };
    /**
     * @describe 数据请求
     * @param wmf 桥对象
     * @param params 请求参数
     * @param adapterName apapter名称
     * @param funName 请求方法名称
     * @param callBack 回调函数
     */
    this.requireForWMF = (wmf, params, adapterName, funName, callBack) => {
        //请求数据封装
        let paramsVal = this.public_queryParams(wmf, params);
        let requireData = null;
        //遮罩
        $ionicLoading.show({
            template: `<i class="icon ion-loading-c"></i>&nbsp;<span>加载中，请稍候</span>`
        });
        //数据请求
        let p = new Promise((resolve, reject) => {
            try{
                wmf.getResponseDataByWklAdapter(adapterName, funName, [paramsVal], (result) => {
                    let returnObj = eval("(" + result + ")");
                    if (returnObj.resp.code = "200") {
                        requireData = returnObj;
                        callBack(returnObj);
                        resolve();
                    } else {
                        errorMessage = '数据返回有误';
                        reject();
                    }
                });
            }catch(e){
                errorMessage = '请求异常';
                reject();
            }
        });
        return p.then(() => {
            $ionicLoading.hide();
            return requireData
        }).catch(() => {
            $ionicLoading.hide();
            this.errorPopup(errorMessage);
        });
    };

    /**
     * @description: 错误提示框
     * @param errorMessage :错误消息
     */
    this.errorPopup = (errorMessage, headTitle,callBack) => {
        $ionicPopup.alert({
            title: `<div class="errorAlertHead">${headTitle? headTitle:"错误提示"}</div>`,
            template: `<i class="icon ion-alert-circled errorAlert"></i>
                            <div class="errorAlertCont">${errorMessage}!</div>`
        }).then(() =>{ callBack?callBack():'';});
    }

    /**
     * @description: 成功提示框
     * @param errorMessage :成功消息
     */
    this.successPopup = (errorMessage, headTitle) => {
        $ionicPopup.alert({
            title: `<div class="errorAlertHead">${headTitle? headTitle:"温馨提示"}</div>`,
            template: `<i class="icon ion-checkmark-circled errorAlert" style="color:green"></i>
                            <div class="errorAlertCont" style="color:green">${errorMessage}!</div>`
        });
    };

    /**
     * @description: 询问弹出框
     * @param headTitle:标题
     * @param cancleBtnName:取消按钮名称
     * @param okBtnName:确认按钮名称
     * @param confirmTitle:询问内容
     * @param confirmTrue:确认返回函数
     * @param confirmFalse:取消返回函数
     */
    this.confirmPopup = (headTitle,cancleBtnName,okBtnName,confirmTitle,confirmTrue,confirmFalse) =>{
        $ionicPopup.confirm({
            title: `<div class="errorAlertHead">${headTitle? headTitle:"温馨提示"}</div>`,
            template: `<i class="icon ion-alert-circled errorAlert"></i>
                        <div class="errorAlertCont">${confirmTitle}</div>`,
            cssClass: 'sign-popup',
            cancelText: cancleBtnName,
            cancelType: 'button-assertive',
            okText: okBtnName,
            okType: 'button-positive',
        }).then(res => {
            if(res){
                confirmTrue();
            }else{
                confirmFalse();
            }
        })
    };

    //初始化桥对象wmf
    this.wmfPromise = new Promise((resolve, reject) => {
        if ( wmf.ready != undefined) {
            console.log("全局wmf对象初始化完毕");
            wmf.ready(() => {
                //获取usermodel
                wmf.callNativeDelegateFunc(JSON.stringify({
                    "cmd": "cmd_getusermodel",
                    "params": {"data": "测试"}
                }), function(backData) {
                    console.log("cmd_getusermodel原生调用成功");
                    let userModelData = JSON.parse(backData).params;
                    $rootScope.user_model = userModelData.user_model;

                    /*console.log(userModelData);
                    alert(userModelData.pad_type)
                    if(userModelData == '01' ){
                        $rootScope.isShowBigPad = true;
                    }else{
                        $rootScope.isShowBigPad = false;
                    }*/
                });
                //获取经纬度
                wmf.callNativeDelegateFunc(JSON.stringify({
                    "cmd": "cmd_location",
                    "params": {"data": "测试"}
                }), function(backData) {
                    console.log("定位原生调用成功");
                    jd = JSON.parse(backData).params.longitude;
                    wd = JSON.parse(backData).params.latitude
                });

                resolve();
            });
        } else {
            console.log("已经包含wmf，直接使用");
            resolve();
        }
    });

    /**
     * @description；获取全局me11Id，供路由预加载使用
     * @returns {*}me11Id
     */
    this.getMellId = () => {
        return $rootScope.me11Id
    };

    /**
     * @description: 返回经纬度
     * @returns {{jd: string, wd: string}}
     */
    this.getjwd = () => {
        return {jd,wd}
    };

    /**
     * @describe 多方法数据请求
     * @param wmf 桥对象
     * @param paramsAry 请求参数数组
     * @param adapterNameAry apapter名称数组
     * @param funNameAry 请求方法名称数组
     * @param callBack 回调函数
     */
    this.requireForWmfMore = (wmf, paramsAry, adapterNameAry, funNameAry, callBackAry) => {
        //遮罩
        $ionicLoading.show({
            template: `<i class="icon ion-loading-c"></i>&nbsp;<span>加载中，请稍候</span>`
        });
        //数据请求
        let p = new Promise((resolve, reject) => {
            let promiseAry = [];
            paramsAry.forEach((item, index) => {
                //请求数据封装
                let paramsVal = this.public_queryParams(wmf, item);
                promiseAry.push(this.wmfRequire(item, adapterNameAry[index], funNameAry[index], callBackAry[index]));
                Promise.all(promiseAry).then(() => {
                    resolve();
                }).catch((rejectPromise) => {
                    console.log(rejectPromise, "失败的请求方法");
                    reject();
                })
            });
        });
        return p.then(() => {
            $ionicLoading.hide();
        }).catch(() =>{
            $ionicLoading.hide();
        });
    };

    /**
     * @description: 多方法数据请求，单个请求函数
     * @param params 请求参数
     * @param adapterName  adapterName名称
     * @param funName 请求方法
     * @param requireAry 请求数组
     * @param callBack 回调函数
     * @param dataObj 数据返回对象
     */
    this.wmfRequire = (params, adapterName, funName, callBack) => {
        let paramsVal = this.public_queryParams(wmf, params);
        return new Promise((resolve, reject) => {
            wmf.getResponseDataByWklAdapter(adapterName, funName, [paramsVal], (result) => {
                let returnObj = eval("(" + result + ")");
                if (returnObj.resp.code == "200") {
                    callBack(returnObj);
                    resolve()
                } else {
                    console.log("返回数据有误");
                    reject();
                }
            });
        });
    }

    /**
     * @description: 日期格式化
     * @param fmt 日期格式
     * @param date 时间
     * @param flag 秒是否置0
     * @returns {*} 返回格式化后的日期
     */
    this.dateFtt = (fmt, date, flag) => {
        var o = {
            "M+" : date.getMonth() + 1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : flag ? date.getSeconds() : 0,                 //秒
            "q+" : Math.floor((date.getMonth() + 3) / 3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * @description: 初始化条件数组，决定是否打开遮罩
     * @param zlzgAry 责令整改条件数组
     * @param xxdjbcAry 文书生成条件数组
     * @param callBack 回调
     */
    this.initConditionAry = (zlzgAry, xxdjbcAry, callBack) => {
        let conditionSpan = jQuery("ul").find("span");
        conditionSpan.map((index ,val, ary) => {
            if (jQuery(val).hasClass('chooseSpan')) {
                if (Object.is(jQuery(val).html(), "要求经营户整改")) {
                    zlzgAry.push(val);
                } else if (Object.is(jQuery(val).html(), "先行登记保存")) {
                    xxdjbcAry.push(val);
                }
            }
        });
        callBack ? callBack() : '';
    }

    /**
     * @description: 调用原生方法
     * @param params:请求参数
     * @param callBack:回调函数
     */
    this.callNative = (params,callBack) =>{
        //遮罩
        $ionicLoading.show({
            template: `<i class="icon ion-loading-c"></i>&nbsp;<span>扫码处理中,请稍候</span>`
        });
        let paramsVal = JSON.stringify(params);
        try{
            wmf.callNativeDelegateFunc(paramsVal,function (backData) {
                $ionicLoading.hide();
                console.log("原生调用成功");
                if(JSON.parse(backData).params.data==""){
                    this.errorPopup("扫码失败,请重试","温馨提示")
                }else{
                    callBack(backData);
                }
            });
        }catch (e){
            $ionicLoading.hide();
        }
    };

    /**
     * @description: 初始化遮罩是否放开
     * @param obj : 条件选择对象
     */
    this.initNavigteMark = (obj) =>{
        let markObj={};
        if(obj.ME_RESLUT07_HANDLE == '3' || obj.ME_RESLUT08_HANDLE == '3' || obj.ME_RESLUT09_HANDLE == '3' || obj.ME_RESLUT10_HANDLE == '3'){
            //如果卷烟经营情况两个条件都选择了，则三个遮罩全部放开
            markObj.both = true;markObj.licenceZlzg = true;markObj.cigaretteZlzg = true;markObj.xxdj =true;
        }else{
            markObj.both = false;markObj.licenceZlzg = false;markObj.cigaretteZlzg = false;markObj.xxdj =false;

            //如果卷烟经营情况第二条件被选择，则放开物品信息登记遮罩
            if(obj.ME_RESLUT07_HANDLE == '2' || obj.ME_RESLUT08_HANDLE == '2' || obj.ME_RESLUT09_HANDLE == '2'
                || obj.ME_RESLUT10_HANDLE == '2'){
                markObj.xxdj =true;
            }

            if(obj.ME_RESLUT01_HANDLE == '1' || obj.ME_RESLUT02_HANDLE == '1' || obj.ME_RESLUT03_HANDLE == '1' ||
                obj.ME_RESLUT04_HANDLE == '1'){
                markObj.licenceZlzg =true;
            }

            if(obj.ME_RESLUT07_HANDLE == '1' || obj.ME_RESLUT08_HANDLE == '1' || obj.ME_RESLUT09_HANDLE == '1'
                || obj.ME_RESLUT10_HANDLE == '1'){
                markObj.cigaretteZlzg =true;
            }
        }
        return markObj
    };

    /**
     * @description: 初始化对应责令整改被选中的dom元素
     * @param zlzgAry:c
     */
    this.initzlzgAry = (zlzgAry) =>{
        Array.from(document.querySelectorAll("span[data-zlzx]")).map((val ,index) =>{
            jQuery(val).hasClass("chooseSpan")?zlzgAry.push(val):''
        });
        return zlzgAry
    };
    /**
     * @description: 初始化对应物品信息登记和文书生成被选中的dom元素
     * @param xxdjAry: 初始化对应责令整改被选中的dom元素
     */
    this.initxxdjAry = (xxdjAry) =>{
        Array.from(document.querySelectorAll("span[data-xxdj]")).map((val ,index) =>{
            jQuery(val).hasClass("chooseSpan")?xxdjAry.push(val):''
        });
        return xxdjAry
    };

    /**
     * @description: 许可证经营情况和卷烟经营情况页面数据对象
     * @type {{ME_RESLUT01: string, ME_RESLUT01_HANDLE: string, ME_RESLUT02: string, ME_RESLUT02_HANDLE: string, ME_RESLUT03: string, ME_RESLUT03_HANDLE: string, ME_RESLUT03_ACTADDRESS: string, ME_RESLUT04: string, ME_RESLUT04_HANDLE: string, ME_RESLUT04_ACTLICENCE: string, ME_RESLUT05: string, ME_RESLUT05_CARDNO: string, ME_RESLUT05_CITY: string, ME_RESLUT05_NAME: string, ME_RESLUT05_PHONE: string, ME_RESLUT05_PROVINCE: string, ME_RESLUT06: string, ME_RESLUT06_DETAIL: string, ME_RESLUT07: string, ME_RESLUT07_HANDLE: string, ME_RESLUT08: string, ME_RESLUT08_HANDLE: string, ME_RESLUT09: string, ME_RESLUT09_HANDLE: string, ME_RESLUT10: string, ME_RESLUT10_HANDLE: string, ME_RESLUT11: string, ME_RESLUT12: string, ME_RESLUT13: string, ME_RESLUT14: string, ME_RESLUT15: string, ME_RESLUT16: string, ME_RESLUT16_DETAIL: string, ME_RESLUT17: string}}
     */
    this.initLicenceAndCigaretteData = {
        ME_RESLUT01:'1',
        ME_RESLUT01_HANDLE:'4',
        ME_RESLUT02:'0',
        ME_RESLUT02_HANDLE:'4',
        ME_RESLUT03:'1',
        ME_RESLUT03_HANDLE:'4',
        ME_RESLUT03_ACTADDRESS:'',
        ME_RESLUT04:'1',
        ME_RESLUT04_HANDLE:'4',
        ME_RESLUT04_ACTLICENCE:'',
        ME_RESLUT05:'0',
        ME_RESLUT05_CARDNO:'',
        ME_RESLUT05_CITY:'',
        ME_RESLUT05_NAME:'',
        ME_RESLUT05_PHONE:'',
        ME_RESLUT05_PROVINCE:'',
        ME_RESLUT06:'0',
        ME_RESLUT06_DETAIL:'',
        ME_RESLUT07:'0',
        ME_RESLUT07_HANDLE:'4',
        ME_RESLUT08:'0',
        ME_RESLUT08_HANDLE:'4',
        ME_RESLUT09: '0',
        ME_RESLUT09_HANDLE: '4',
        ME_RESLUT10: '0',
        ME_RESLUT10_HANDLE:'4',
        ME_RESLUT11:'0',
        ME_RESLUT12:'0',
        ME_RESLUT13:'0',
        ME_RESLUT14:'0',
        ME_RESLUT15:'0',
        ME_RESLUT16:'0',
        ME_RESLUT16_DETAIL:'',
        ME_RESLUT17:'1'
    }

    /**
     * @description 许可证经营情况和卷烟经营情况页面条件开关标志位转换
     * @param obj :许可证经营情况和卷烟经营情况页面数据对象
     */
    this.conditionFlagChange = (obj,callBack) =>{
        // 将条件开关标志“0”，“1”转化为true,false
        for (let i of Object.keys(obj)) {
            //筛选出条件开关
            if(/^ME_RESLUT\d+$/.test(i)){
                callBack(i);
                //1,3,4,17当开关标志为“1”,转化为false,为0 转化为true
                if(i == 'ME_RESLUT01' || i == 'ME_RESLUT03' || i == 'ME_RESLUT04' || i == 'ME_RESLUT17'){
                    obj[i] = Object.is(obj[i], "0") ? true : false;
                }else{
                    obj[i] = Object.is(obj[i], "0") ? false : true;
                }
            }
        }
    };

    /**
     * 生成许可证使用情况与卷烟经营情况页面子条件保存值
     * @param id
     * @returns {*}
     */
    this.initHandleVal = (id) =>{
        let subCondition = jQuery("#"+id).find("span.chooseSpan");
        /**
         *根据子条件选中情况，设置handle保存参数
         * 如果有两个选中，则设置3,都没选中设置4,选中1个,设置1或2
         */
        if(subCondition.length == 2){
            return '3'
        }else if(subCondition.length == 0){
            return '4'
        }else if(subCondition.length == 1){
            //如果选中第一个，设置1，选中第二个子条件设置2
            return subCondition.html() == '要求经营户整改'? "1" : "2";
        }
        return '4'
    };

    /**
     * @description: 是否签退
     * @type {Promise}
     */
    this.signOut =(resolve,reject) =>{
        if($rootScope.signVal){
            this.confirmPopup("温馨提示","未完成","已完成","请确认检查登记已完成",() =>{
                this.requireForWMF(wmf, {
                    "me20_id":$rootScope.signVal,
                }, "RegieProExaminfoAdapter", "mobSignOut", (data) => {
                    console.log("签退成功");
                    resolve();
                });
            },() =>{reject()});
        }else{
            resolve();
        }
    };

    /**
     * @description: 签到
     * @param params
     */
    this.signIn =(params,callBack) =>{
        this.requireForWMF(wmf, params, "RegieProExaminfoAdapter", "mobSignIn", (data) => {
            //签到成功后返回的me20Id，用于签退
            if(data.result.hasOwnProperty("me20Id")){
                $rootScope.signVal=data.result.me20Id;
                callBack?callBack(data):''
            }else{
                let message = data.result.message.substring(0,12);
                this.confirmPopup("温馨提示","否","是",message+"未离店,是否离店",() =>{
                    this.requireForWMF(wmf, {
                        "regielicenceno":message
                    }, "RegieProExaminfoAdapter", "getSignInfo", data => {
                        this.requireForWMF(wmf, {
                            "me20_id":data.result.signInfo[0].ME20_ID,
                        }, "RegieProExaminfoAdapter", "mobSignOut", data => {
                            console.log("签退成功");
                            this.signIn(params);
                        });
                    });
                },() =>{
                    $ionicNavBarDelegate.back()
                });
            }
        });
    };
}]);