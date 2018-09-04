const _ = require('lodash');
const request = require('request');
const config = require('../config');
const urlencode = require('urlencode');
const {getSign} = require('../util/signature');

const {domain, baseOpen, jsv, baseApi, v, ecode, dataType, jsonpIncPrefix, ttid, type} = config.xy;

// =========== Data =========== //
const brandData = "{\"parentNavPath\":\"catId4:126862528\",\"deep\":2,\"bizCode\":\"3C\"}";

const mtopjsonpweexcb1 = (data) =>
{
    return data;
};

const getData = (args) => {
    return new Promise(function (resolve, reject) {
        const signInfo = getSign(args);
        const {sign, l ,a} = signInfo;
        const callback = 'mtopjsonpweexcb1';
        let url = `${domain}${baseOpen}?jsv=${jsv}&appKey=${a}&t=${l}&sign=${sign}&api=${baseApi}&v=${v}&ecode=${ecode}&dataType=${dataType}&jsonpIncPrefix=${jsonpIncPrefix}&ttid=${ttid}&type=${type}&callback=${callback}&data=${urlencode(args)}`;
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

const getBrands = async () => {
    try {
        const result = await getData(brandData);
        const {data, ret} = JSON.parse(result);
        if(_.isEmpty(data)){
            console.warn('警告: %j', ret);
            return;
        }
        const {items, nextPage, serverTime, totalCount} = data;
        console.info(`ret: ${ret}, nextPage: ${nextPage}, serverTime: ${serverTime}, totalCount: ${totalCount}`);
        let brandList = [];
        for(let brand of items){
            if(!brand.hotLabel){
                brandList.push({
                    bannerFlag          : brand.bannerFlag,
                    hasNextLevel        : brand.hasNextLevel,
                    hasReturnNextLevel  : brand.hasReturnNextLevel,
                    hotLabel            : brand.hotLabel,
                    id                  : brand.id,
                    name                : brand.name,
                    subNextPage         : brand.subNextPage,
                    type                : brand.type
                });
            }
        }
        console.info('size: %d, brandList: %j',brandList.length, brandList);
    } catch (e) {
        console.error(e);
        return e;
    }
};


getBrands();