//require("babel-polyfill");
const apollo = require('./node-apollo/index');
function* getProcessInfo() {
   const apollo_config = {
          configServerUrl: global.GLOBAL_APOLLO,
          appId: 'comProcess',
          clusterName: 'default',
          namespaceName: 'application',
      };
      var jsonstr = yield apollo.remoteConfigServiceFromCache(apollo_config);
  //  var jsonstr = { data_process: '[{"date":"2014-05-30","abstract":"北京盈衍网络科技有限公司成立","href":""},{"date":"2014-12-30","abstract":"黄金钱包App上线，首月用户超过2万人","href":""},{"date":"2015-07-30","abstract":"与全球最大信用评估公司FICO合作，共同搭建珠宝黄金中小企业的信用评级模型","href":""},{"date":"2015-10-30","abstract":"加入中国黄金协会，并成为第三届理事会常务理事单位","href":"https://emwap.eastmoney.com/info/detail/20150929552432339"},{"date":"2016-07-30","abstract":"上线黄金零售门店小额黄金出借业务，按照网贷合规精神，单店平均不超过3公斤","href":""},{"date":"2016-09-30","abstract":"上线自主研发的风控审核及管理系统GRAMS，对借入黄金的黄金零售门店的经营风险进行全方位的建模和分级","href":""},{"date":"2016-12-30","abstract":"黄金钱包原安心计划等业务纳入金融办网贷专项业务小组指导范围，先从底层标的进行合规化准备","href":""},{"date":"2017-04-30","abstract":"上线大数据反欺诈系统，外接50多家数据源，以多行业、多维度数据和先进的智能风控模型为基础，帮助识别垃圾注册、银行卡盗刷、异常提现等风险","href":""},{"date":"2017-09-30","abstract":"签署恒丰银行存管，按网贷信息中介管理办法开始全面的后台改造升级","href":""},{"date":"2017-12-30","abstract":"发起并成立中国黄金市场创新联席会，倡导行业自律","href":"https://share.jingjiribao.cn/detail/newsDetailShare.html?docid=129528&user_id=469b0ad0d3864f25aa9dcbc178299464&source"},{"date":"2018-01-30","abstract":"黄金钱包荣获胡润新金融百强榜“科技创新奖”","href":"https://xw.qq.com/stock/20180122015528/STO2018012201552800"},{"date":"2018-05-28","abstract":"原安心计划、月月升息计划等产品进行主体分离，并升级为智选系列，正式上线恒丰银行存管，用户资金与平台隔离，网贷单独管理，实现全面合规，有效保障用户账户安全","href":""},{"date":"2018-05-30","abstract":"实缴注册资本由1235.1万增加到3377.96万元，股东实缴资本金更逾2亿元，达到互联网黄金监管要求","href":""},{"date":"2018-06-30","abstract":"黄金钱包入选由中关村互联网金融研究院评选的“2018中国金融科技竞争力100强榜”","href":"http://biz.ifeng.com/a/20180630/45044622_0.shtml"},{"date":"2018-07-05","abstract":"黄金钱包与平安银行正式签署互联网黄金业务战略合作协议","href":"https://share.jingjiribao.cn/detail/newsDetailShare.html?docid=133745&user_id=d0ce2c1a14d645ff97f57d7965ee9e81&source=wechat_friend"},{"date":"2018-07-12","abstract":"黄金钱包与平安银行在深圳合作举办发布会，正式发布黄金产业链战略","href":""},{"date":"2018-07-13","abstract":"黄金钱包与平安银行启动系统对接，打造新一代黄金产品","href":""},{"date":"2018-08-20","abstract":"在平安银行网点测试黄金交割等操作流程","href":""},{"date":"2018-11-15","abstract":"黄金钱包上线代销平安银行黄金产品","href":""}]' };
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
    var nowDate = getNowFormatDate();
    var data_process = JSON.parse(jsonstr.data_process);
    var _d = [];//未来事件
    var _dd = [];//现在事件
    for (let i = 0; i < data_process.length; i++) {
        var evals = data_process[i];
        if (evals.date >= nowDate) {
            _d.push(evals);
        } else {
            _dd.push(evals);
        }
    }
    _d = _d.sort(function (a, b) {
        var bb = parseInt(b.date.replace("-", '').replace("-", ''));
        var aa = parseInt(a.date.replace("-", '').replace("-", ''));
        return bb - aa;
    })
    _dd = _dd.sort(function (a, b) {
        var bb = parseInt(b.date.replace("-", '').replace("-", ''));
        var aa = parseInt(a.date.replace("-", '').replace("-", ''));
        return bb - aa;
    })
    function groupBy(array, f) {

        const groups = {};
        array.forEach(function (o) {
            const group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    }
    const sorted_d = groupBy(_d, function (item) {
        return [item.date.substring(0, 7)];
    });
    const sorted_dd = groupBy(_dd, function (item) {
        return [item.date.substring(0, 7)];
    });
    var body = {
        code: "0000",
        data: {
            future: sorted_d,
            now: sorted_dd
        }
    }
    this.body = body;
}

function* liveMain() {
    const apollo_config = {
        configServerUrl: global.GLOBAL_APOLLO,
        appId: 'headerLive',
        clusterName: 'default',
        namespaceName: 'application',
    };
    try {
        var jsonstr = yield apollo.remoteConfigServiceFromCache(apollo_config);
        var data_historyCheckList = JSON.parse(jsonstr.historyCheckList);
        var data_hotQA = JSON.parse(jsonstr.hotQA);
        var data_liveMain = JSON.parse(jsonstr.liveMain);
        var body = {
            code: "0000",
            data: {
                "liveMain": data_liveMain,
                "hotQA": data_hotQA,
                "historyCheckList": data_historyCheckList
            }
        }
    } catch (e) {
        var body = {
            code: "0000",
            msg: "配置错误，请检查配置"
        }
    }

    this.body = body;
}
function* sourceDetail() {
    const apollo_config = {
        configServerUrl: global.GLOBAL_APOLLO,
        appId: 'sourceDetail',
        clusterName: 'default',
        namespaceName: 'application',
    };
    try {

        var jsonstr = yield apollo.remoteConfigServiceFromCache(apollo_config);
        var data_sourceIntro = jsonstr.sourceIntro;
        var data_sourceObj = JSON.parse(jsonstr.sourceObj);
        var body = {
            code: "0000",
            data: {
                "sourceIntro": data_sourceIntro,
                "sourceObj": data_sourceObj
            }
        }

    } catch (e) {
        var body = {
            code: "0000",
            msg: "配置错误，请检查apollo配置"
        }
    }
    this.body = body;
}
function* walletCollege() {
    const apollo_config = {
        configServerUrl: global.GLOBAL_APOLLO,
        appId: 'walletCollege',
        clusterName: 'default',
        namespaceName: 'application',
    };
    try {
        var jsonstr = yield apollo.remoteConfigServiceFromCache(apollo_config);
        var data_bannerList = JSON.parse(jsonstr.bannerList);
        var data_walletDynamic = JSON.parse(jsonstr.walletDynamic);
        var data_xjLession = JSON.parse(jsonstr.xjLession);
        var body = {
            code: "0000",
            data: {
                "bannerList": data_bannerList,
                "walletDynamic": data_walletDynamic,
                "xjLession": data_xjLession
            }
        }
    } catch (e) {
        var body = {
            code: "0000",
            msg: "配置错误，请检查配置"
        }
    }

    this.body = body;
}
// 公益标详情页
function* getPublicDetail() {
    const apollo_config = {
        configServerUrl: global.GLOBAL_APOLLO,
        appId: 'publicWelfare',
        clusterName: 'default',
        namespaceName: 'application',
    };
    try {
        var jsonstr = yield apollo.remoteConfigServiceFromCache(apollo_config);
        console.log(jsonstr.data)
        var data_dataText = JSON.parse(jsonstr.data);
        var body = {
            code: "0000",
            data: {
                data_dataText: data_dataText,
            }
        }
    } catch (e) {
        console.log(e)
        var body = {
            code: "0000",
            msg: "配置错误，请检查配置"
        }
    }

    this.body = body;
}
// 六一答题-直播时间
function* getLiveBroadcastTime() {
    const apollo_config = {
        configServerUrl: global.GLOBAL_APOLLO,
        appId: 'liveBroadcastTime',
        clusterName: 'default',
        namespaceName: 'application',
    };
    try {
        var jsonstr = yield apollo.remoteConfigServiceFromCache(apollo_config);
        var body = {
            code: "0000",
            data: jsonstr
        }
    } catch (e) {
        console.log(e)
        var body = {
            code: "0000",
            msg: "配置错误，请检查配置"
        }
    }

    this.body = body;
}
// 活动规则
function* getActivityRules() {
    const apollo_config = {
        configServerUrl: global.GLOBAL_APOLLO,
        appId: 'h5GbankerAppRules',
        clusterName: 'default',
        namespaceName: 'application',
    };
    try {
        var jsonstr = yield apollo.remoteConfigServiceFromCache(apollo_config);
        jsonstr.shuffleActivity = JSON.parse(jsonstr.shuffleActivity);
        var body = {
            code: "0000",
            data: jsonstr
        }
    } catch (e) {
        console.log(e)
        var body = {
            code: "0000",
            msg: "配置错误，请检查配置"
        }
    }

    this.body = body;
}
module.exports = {
    getProcessInfo,
    liveMain,
    sourceDetail,
    walletCollege,
    getPublicDetail,
    getLiveBroadcastTime,
    getActivityRules
}