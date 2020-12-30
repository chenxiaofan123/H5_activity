/**
 * Created by ckid_hjqb on 2017/3/15.
 */


/**
 * 标的信息封装
 * @param depositInfo
 * @constructor
 */
function DepositView(depositData) {
    var depositInfo = depositData.data;
    this.depositInfo = depositInfo;
    /*用户详情是否被load完毕*/
    this.loadAllFlag = false;
    this.alreadyBuyUserDetail = depositInfo.alreadyBuyUserDetail;
    this.depositName = depositInfo.depositName;
    /*applyStatus = 1 活动未开始
    applyStatus = 2 活动已经开始
    applyStatus = 3 活动开始，但是卖光
    applyStatus = 4 申购结束*/
    this.applyStatus = this.getApplyStatus(depositData.serverTime);
    this.BuyUserCount = depositInfo.alreadyBuyUser;
    var depositHtml = depositInfo.depositHtml;
    if(JSON.stringify(depositHtml) !== '{}'){
        this.depositHead = depositHtml.depositHead;
        this.depositBrief = depositHtml.depositBrief;
        this.depositDetail = depositHtml.depositDetail;
    }
    //投资期限
    this.depositTime = depositInfo.depositTime;

    //售出百分比
    this.percent = depositInfo.percent;

    //最大最小购买金额
    this.moneyMin = this.getFormatMoney('moneyMin');
    this.moneyMax = this.getFormatDate('moneyMin');

    //标的描述
    this.depositDescription = depositInfo.depositDescription;

    //挂单金止盈额
    this.breakevenBalance = this.getFormatMoney("breakevenBalance");
}

/**
 * 日期预处理，  jscore的Date构造函数无法处理用-分割的日期字符串
 * @param _date 日期字符串
 * @returns {Date}
 */
DepositView.prototype.dateDeal = function (_date) {
    return new Date(_date.replace(/-/g, '/'))
}


/**
 * 分页获取已购用户的数据 如果数据已经取完，则将loadAllFlag设置为0
 * @param start
 * @param size
 */
DepositView.prototype.getBuyUserList = function (start, size) {

    if (this.loadAllFlag === true) return this.loadAllFlag;

    var BuyUserCount = this.alreadyBuyUserDetail.length;
    if (start + size >= BuyUserCount) {
        this.loadAllFlag = true;
    }
    return this.alreadyBuyUserDetail.slice(start, start + size);
}



/**
 * 获取申购状态
 * @return 申购状态 1、未开始 2、申购进行中 3、告罄 4、购买结束
 */
DepositView.prototype.getApplyStatus = function (serverTime) {
    //未校验数据，后期调试的时候请校验
    var applyEndTime = this.dateDeal(this.depositInfo.applyEndTime);
    var applyStartTime = this.dateDeal(this.depositInfo.applyStartTime);
    //标的状态 0表示下标   1表示正常
    var depositStatus = this.depositInfo.status;
    var salePercent = this.depositInfo.percent;

    //判断标的状态

    //活动结束
    if (depositStatus === 0) return 4;

    //申购未开始
    if (serverTime < applyStartTime) {
        return 1;
    }

    //申购进行时
    if (serverTime >= applyStartTime && serverTime < applyEndTime) {
        if ((salePercent || 0) < 100) {
            //申购正常
            return 2;
        }
        //售罄
        return 3;
    }
    return 4;

}


/**
 * 获取当前的利率
 * @desc 如果利率回填，则返回利率，如果没有回填，则直接返回-1
 * @return -1 || rate
 */
DepositView.prototype.getRate = function () {
    var rate = this.depositInfo.rate || -1;
    if (rate > -1) {
        return rate / 100 + '%';
    }
    return rate;
}

/**
 * 获取猜金价利率
 * @return 如果利率回填，则返回利率，如果未回填，则返回利率范围字符串
 */
DepositView.prototype.getGuessPrice = function () {
    var rate = this.getRate();
    var minRate = this.depositInfo.minRate || 0;
    var maxRate = this.depositInfo.maxRate || 0;
    if (rate !== -1) {
        return rate;
    }
    return minRate / 100 + '%' + '~' + maxRate / 100 + '%';
}


/**
 * title 写入
 * @desc 如果标的信息里有title，则将标的信息写入title
 */

DepositView.prototype.writeDocTitle = function () {
    // 需要提前引入jquery
    var $body = $('body');
    document.title = this.depositInfo.depositName;
    // hack在微信等webview中无法修改document.title的情况
    var $iframe = $('<iframe src="/favicon.ico" style="display: none;"></iframe>');
    $iframe.on('load', function () {
        setTimeout(function () {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);
}


/**
 * 获取日期（格式化）
 * @param dateName 需要获取日期的name
 * @param format 日期格式
 * @return 格式化后的日期 如果没有提供格式化，则默认格式化为yyyy年MM月dd日
 */
DepositView.prototype.getFormatDate = function (dateName, format) {
    var date = this.depositInfo[dateName];
    if (!date) return -1;

    //日期预处理+ 格式化
    try {
        date = this.dateDeal(date);
    } catch (e) {
        return -1;
    }
    
    var formatStr = format||'yyyy年MM月dd日';
    return date.format(formatStr);
}

/**
 * 获取命名金额
 * @param moneyName 参数名
 * @param base 基（万元）
 */
DepositView.prototype.getFormatMoney = function(moneyName, base){
    var moneyData = this.depositInfo[moneyName];
    if(!moneyData) return -1;
    if(base) return (moneyData/base).toFixed(2);
    return (moneyData/100).toFixed(2)
}

/**
 * 获取起始金价
 * @return  如果起始金价被确定，则直接取起始金价
 */
DepositView.prototype.getStartPrice = function () {
    return this.getFormatMoney('startPrice');
};

/**
 * 获取结束金价
 * @return 如果结束金价已经确定，则直接返回
 */
DepositView.prototype.getEndPrice = function () {
    return this.getFormatMoney('endPrice');
};

/**
 * 获取挂单金的利率
 * @return {*}
 */
DepositView.prototype.getRateStr = function(){
    return this.depositInfo.rateStr;
}