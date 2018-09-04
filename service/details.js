const _ = require('lodash');
const request = require('request');
const config = require('../config');
const urlencode = require('urlencode');
const {getSign} = require('../util/signature');

const {domain, detailsOpen, jsv, detailsApi, v, ecode, dataType, jsonpIncPrefix, ttid, type} = config.xy;

// =========== Data =========== //
const detailsData = "{\"spuId\":\"10283\",\"sceneType\":\"3C\",\"channel\":\"idle\",\"channelData\":\"{\\\"sceneType\\\":\\\"3C\\\",\\\"channel\\\":\\\"undefined\\\",\\\"spuId\\\":\\\"10283\\\"}\",\"supplierId\":\"24633099\"}";

const mtopjsonpweexcb1 = (data) =>
{
    return data;
};

const getData = (args) => {
    return new Promise(function (resolve, reject) {
        const signInfo = getSign(args);
        const {sign, l ,a} = signInfo;
        const callback = 'mtopjsonpweexcb1';
        let url = `${domain}${detailsOpen}?jsv=${jsv}&appKey=${a}&t=${l}&sign=${sign}&api=${detailsApi}&v=${v}&ecode=${ecode}&dataType=${dataType}&jsonpIncPrefix=${jsonpIncPrefix}&ttid=${ttid}&type=${type}&callback=${callback}&data=${urlencode(args)}`;
        console.info('url: ', url);
        const options = {method :'GET',url : url, headers: {cookie: config.cookie}};
        request(options, function (error, response, body) {
            if (error) reject(error);
            let result = eval(mtopjsonpweexcb1(body));
            result = JSON.stringify(result);
            resolve(result);
        });
    });
};

const getPrdouct = async () => {
    try {
        const result = await getData(detailsData);
        const {data, ret} = JSON.parse(result);
        if(_.isEmpty(data)){
            console.warn('警告: %j', ret);
            return;
        }
        const {prodName, questions, quoteId, quoteType, sceneType, spuId, supplierId} = data;
        console.info(`prodName: ${prodName}, quoteId: ${quoteId}, quoteType: ${quoteType}, sceneType: ${sceneType}, spuId: ${spuId}, supplierId: ${supplierId}, size: ${questions.length}, questions: %j`, questions);
    } catch (e) {
        console.error(e);
        return e;
    }
};


getPrdouct();