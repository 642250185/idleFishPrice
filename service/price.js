const _ = require('lodash');
const request = require('request');
const config = require('../config');
const {getSign} = require('../util/signature');

const {domain, priceOpen, jsv, priceApi, v, ecode, dataType, jsonpIncPrefix, ttid, type} = config.xy;

const priceData = '{"spuId":"10283","quoteId":90428395,"questionnaire":[{"id":20037,"name":"型号","questionType":"SINGLECHOISE","required":true,"answers":[{"id":129,"name":"公开版/A1524","type":"TEXT","excludeIds":[]}]},{"id":20002,"name":"购买渠道","questionType":"SINGLECHOISE","required":true,"answers":[{"id":6,"name":"大陆国行","type":"TEXT","excludeIds":[]}]},{"id":20001,"name":"内存容量","questionType":"SINGLECHOISE","required":true,"answers":[{"id":2,"name":"16G","type":"TEXT","excludeIds":[]}]},{"id":20004,"name":"机身颜色","questionType":"SINGLECHOISE","required":true,"answers":[{"id":16,"name":"黑/灰色","type":"TEXT","excludeIds":[]}]},{"id":20012,"name":"剩余保修期","questionType":"SINGLECHOISE","required":true,"answers":[{"id":45,"name":"保修期剩余1个月以上","type":"TEXT","excludeIds":[]}]},{"id":20005,"name":"机身外壳","questionType":"SINGLECHOISE","required":true,"answers":[{"id":19,"name":"外壳完好无使用痕迹","type":"TEXT","excludeIds":[]}]},{"id":20006,"name":"屏幕外观","questionType":"SINGLECHOISE","required":true,"answers":[{"id":21,"name":"触屏完美无划痕","type":"TEXT","excludeIds":[]}]},{"id":20035,"name":"屏幕显示","questionType":"SINGLECHOISE","required":true,"answers":[{"id":114,"name":"显示正常","type":"TEXT","excludeIds":[]}]},{"id":20013,"name":"维修拆机史","questionType":"SINGLECHOISE","required":true,"answers":[{"id":47,"name":"无拆无修","type":"TEXT","excludeIds":[]}]},{"id":20003,"name":"开机情况","questionType":"SINGLECHOISE","required":true,"answers":[{"id":10,"name":"正常开机","type":"TEXT","excludeIds":[]}]},{"id":20011,"name":"iCloud账户","questionType":"SINGLECHOISE","required":true,"answers":[{"id":43,"name":"iCloud已注销","type":"TEXT","excludeIds":[]}]},{"id":9999,"name":"功能问题(可多选，如无功能问题可不选)","questionType":"MULTICHOICES","required":false,"answers":[{"id":77,"name":"有进水","type":"TEXT","excludeIds":[]}]}],"dataType":"originaljson"}';


const callback = (data) =>
{
    return data;
};

const getData = (args) => {
    return new Promise(function (resolve, reject) {
        const signInfo = getSign(args);
        const {sign, l ,a} = signInfo;
        let url = `${domain}${priceOpen}`;
        console.info('url: ', url);
        const options = {
            method  : 'POST',
            url     : url,
            qs : {
                jsv             : jsv,
                appKey          : a,
                t               : l,
                sign            : sign,
                api             : priceApi,
                v               : v,
                dataType        : dataType,
                jsonpIncPrefix  : jsonpIncPrefix,
                ttid            : ttid,
                type            : type
            },
            headers : {'Content-Type': 'application/x-www-form-urlencoded', cookie: config.cookie},
            form    : { data: args}
        };
        request(options, function (error, response, body) {
            if (error) reject(error);
            let result = eval(callback(body));
            result = JSON.stringify(result);
            resolve(result);
        });
    });
};


const getPrice = async () => {
    try {
        let result = await getData(priceData);
        console.info('result: ', result);
    } catch (e) {
        console.error(e);
        return e;
    }
};

getPrice();