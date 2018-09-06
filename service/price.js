const _ = require('lodash');
const request = require('request');
const config = require('../config');
const {getSign} = require('../util/signature');

const {domain, priceOpen, jsv, priceApi, v, dataType, jsonpIncPrefix, ttid, type} = config.xy;

const prdouctList = [
    {"spuId":"10283","quoteId":91184110,"questionnaire":[{"id":20037,"answers":[{"id":738}]},{"id":20002,"answers":[{"id":6}]},{"id":20001,"answers":[{"id":2}]},{"id":20004,"answers":[{"id":16}]},{"id":20012,"answers":[{"id":45}]},{"id":20005,"answers":[{"id":19}]},{"id":20006,"answers":[{"id":21}]},{"id":20035,"answers":[{"id":114}]},{"id":20013,"answers":[{"id":47}]},{"id":20003,"answers":[{"id":10}]},{"id":20011,"answers":[{"id":43}]},{"id":9999,"answers":[{"id":77},{"id":59}]}]},
    {"spuId":"10284","quoteId":91184114,"questionnaire":[{"id":20037,"answers":[{"id":139}]},{"id":20002,"answers":[{"id":6}]},{"id":20001,"answers":[{"id":3}]},{"id":20004,"answers":[{"id":16}]},{"id":20012,"answers":[{"id":45}]},{"id":20005,"answers":[{"id":18}]},{"id":20006,"answers":[{"id":21}]},{"id":20035,"answers":[{"id":114}]},{"id":20013,"answers":[{"id":47}]},{"id":20003,"answers":[{"id":10}]},{"id":20011,"answers":[{"id":43}]},{"id":9999,"answers":[{"id":77},{"id":59}]}]}
];

const callback = (data) => {
    return data;
};

const getData = (args) => {
    return new Promise(function (resolve, reject) {
        const signInfo = getSign(args);
        const {sign, l ,a} = signInfo;
        let url = `${domain}${priceOpen}`;
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

const getPrice = async (priceData) => {
    try {
        let result = await getData(JSON.stringify(priceData));
        const {data, ret} = JSON.parse(result);
        console.info(`ret: ${ret}, data: %j`, data);
        if(_.isEmpty(data)){
            return -1;
        } else {
            return data.price;
        }
    } catch (e) {
        console.error(e);
        return e;
    }
};


const getAllPrdouctPrice = async () => {
    try {
        for(let prdouct of prdouctList){
            const price = await getPrice(prdouct);
            console.info('price: ', price);
        }
    } catch (e) {
        console.error(e);
        return e;
    }
};


getAllPrdouctPrice();