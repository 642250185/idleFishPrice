const _ = require('lodash');
const _path = require('path');
const fs = require('fs-extra');
const request = require('request');
const config = require('../config');
const urlencode = require('urlencode');
const sleep = require('js-sleep/js-sleep');
const {getSign} = require('../util/signature');

const {domain, baseOpen, jsv, baseApi, v, ecode, dataType, jsonpIncPrefix, ttid, type, brandDataPath, spuDataPath} = config.xy;

const mtopjsonpweexcb = (data) =>
{
    return data;
};

const callback = 'mtopjsonpweexcb';

const getData = (bid, pageNumber) => {
    return new Promise(function (resolve, reject) {
        const prdouctData = "{\"parentNavPath\":\"catId4:126862528;keyProp1Id:"+bid+"\",\"hotLabel\":false,\"deep\":1,\"pageNumber\":"+pageNumber+",\"bizCode\":\"3C\"}";
        const signInfo = getSign(prdouctData);
        const {sign, l ,a} = signInfo;
        let url = `${domain}${baseOpen}?jsv=${jsv}&appKey=${a}&t=${l}&sign=${sign}&api=${baseApi}&v=${v}&ecode=${ecode}&dataType=${dataType}&jsonpIncPrefix=${jsonpIncPrefix}&ttid=${ttid}&type=${type}&callback=${callback}&data=${urlencode(prdouctData)}`;
        const options = {method :'GET',url : url, headers: {cookie: config.cookie}};
        request(options, function (error, response, body) {
            if (error) reject(error);
            let result = eval(mtopjsonpweexcb(body));
            result = JSON.stringify(result);
            resolve(result);
        });
    });
};

const getPrdouct = async (bid, pageNumber, plist) => {
    try {
        await sleep(1000 * 2);
        if(!pageNumber){
            pageNumber = 1;
            plist = [];
        }
        const result = await getData(bid, pageNumber);
        const {data, ret} = JSON.parse(result);
        if(_.isEmpty(data)){
            console.warn('警告: %j', ret);
            return;
        }
        const {items, nextPage, serverTime, totalCount} = data;
        console.info(`ret: ${ret}, nextPage: ${nextPage}, serverTime: ${serverTime}, totalCount: ${totalCount}`);
        if(totalCount === 0){
            console.info('重复调用......');
            pageNumber++;
            return await getPrdouct(bid, pageNumber, plist);
        }
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
                    spuId               : brand.spuId,
                    subNextPage         : brand.subNextPage,
                    type                : brand.type
                });
            }
        }
        console.info('size: %d, brandList: %j',brandList.length, brandList);

        plist = plist.concat(brandList);
        if(nextPage){
            pageNumber++;
            return await getPrdouct(bid, pageNumber, plist);
        } else {
            return plist;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
};

const getAllPrdouct = async () => {
    try {
        const brands = JSON.parse(fs.readFileSync(brandDataPath));
        console.info(`品牌总数:${brands.length}`);
        let final = [];
        for(let brand of brands){
            console.info(`品牌ID: ${brand.id}、品牌名称: ${brand.name}`);
            const result = await getPrdouct(brand.id);
            final = final.concat(result);
            // break;
        }
        return final;
    } catch (e) {
        console.error(e);
        return [];
    }
};

const crawlerProducts = async () =>
{
    try {
        const spus = await getAllPrdouct();
        console.info(`机型总量: ${spus.length}`);
        await fs.ensureDir(_path.join(spuDataPath, '..'));
        fs.writeFileSync(spuDataPath, JSON.stringify(spus, null, 4));
        return spus;
    } catch (e) {
        console.error(e);
        return [];
    }
};


crawlerProducts();