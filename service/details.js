require('../schema');
const _ = require('lodash');
const fs = require('fs-extra');
const request = require('request');
const config = require('../config');
const mongoose = require('mongoose');
const urlencode = require('urlencode');
const sleep = require('js-sleep/js-sleep');
const {getSign} = require('../util/signature');

const {domain, detailsOpen, jsv, detailsApi, v, ecode, dataType, jsonpIncPrefix, ttid, type, spuDataPath} = config.xy;

const mtopjsonpweexcb = (data) => {
    return data;
};

const callback = 'mtopjsonpweexcb';

const getData = (pid) => {
    return new Promise(function (resolve, reject) {
        const data = "{\"spuId\":\""+pid+"\",\"sceneType\":\"3C\",\"channel\":\"idle\",\"channelData\":\"{\\\"sceneType\\\":\\\"3C\\\",\\\"channel\\\":\\\"undefined\\\",\\\"spuId\\\":\\\""+pid+"\\\"}\"}";
        const signInfo = getSign(data);
        const {sign, l ,a} = signInfo;
        let url = `${domain}${detailsOpen}?jsv=${jsv}&appKey=${a}&t=${l}&sign=${sign}&api=${detailsApi}&v=${v}&ecode=${ecode}&dataType=${dataType}&jsonpIncPrefix=${jsonpIncPrefix}&ttid=${ttid}&type=${type}&callback=${callback}&data=${urlencode(data)}`;
        const options = {
            method  :'GET',
            url     : url,
            headers : {
                cookie: config.cookie
            }
        };
        request(options, function (error, response, body) {
            if (error) reject(error);
            let result = eval(mtopjsonpweexcb(body));
            result = JSON.stringify(result);
            resolve(result);
        });
    });
};

const getDetails = async (pid) => {
    try {
        // await sleep(1000 * 2);
        const result = await getData(pid);
        const {data, ret} = JSON.parse(result);
        if(_.isEmpty(data)){
            console.warn('警告: %j', ret);
            return;
        }
        const {prodName, questions, quoteId, quoteType, sceneType, spuId, supplierId} = data;
        console.info(`prodName: ${prodName}, quoteId: ${quoteId}, quoteType: ${quoteType}, sceneType: ${sceneType}, spuId: ${spuId}, supplierId: ${supplierId}, size: ${questions.length}`);
        const spu = {
            _id         : new mongoose.Types.ObjectId,
            pid         : pid,
            spuId       : spuId,
            supplierId  : supplierId,
            prodName    : prodName,
            quoteId     : quoteId,
            quoteType   : quoteType,
            sceneType   : sceneType,
            questions   : questions
        };
        await new $spu(spu).save();
    } catch (e) {
        console.error('err: ', e);
        return e;
    }
};

const getAllPrdouctDetails = async () => {
    try {
        const spus = JSON.parse(fs.readFileSync(spuDataPath));
        console.info(`机型总数:${spus.length}`);
        for(let spu of spus){
            console.info(`spuId: ${spu.spuId}, spuName: ${spu.name}`);
            await getDetails(spu.spuId);
            // break;
        }
        return;
    } catch (e) {
        console.error(e);
        return e;
    }
};

const getDetection = async () => {
    try {
        const spuIds = [1286925,1286925,1286707,1286707,1286709,1286709,1286709,1287318,1287318,1287318,1286738,1286738];
        for(let pid of spuIds){
            await getDetails(pid);
            break;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
};


getAllPrdouctDetails();
exports.getAllPrdouctDetails = getAllPrdouctDetails;