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

const mtopjsonpweexcb1 = (data) => {
    return data;
};

const supplierId = "24633099";
const callback = 'mtopjsonpweexcb1';

const getData = (pid) => {
    return new Promise(function (resolve, reject) {
        // const data = "{\"spuId\":\""+pid+"\",\"sceneType\":\"3C\",\"channel\":\"idle\",\"channelData\":\"{\\\"sceneType\\\":\\\"3C\\\",\\\"channel\\\":\\\"undefined\\\",\\\"spuId\\\":\\\"10283\\\"}\",\"supplierId\":\""+supplierId+"\"}";
        const data = "{\"spuId\":\""+pid+"\",\"sceneType\":\"3C\",\"channel\":\"tmall-service\",\"channelData\":\"{\\\"sceneType\\\":\\\"3C\\\",\\\"xianyuRouter\\\":\\\"true\\\",\\\"channel\\\":\\\"tmall-service\\\",\\\"serviceCode\\\":\\\"old_for_new_phone\\\",\\\"subChannel\\\":\\\"xianyu\\\",\\\"spuId\\\":\\\""+pid+"\\\",\\\"popCount\\\":\\\"0\\\"}\"}";
        const signInfo = getSign(data);
        const {sign, l ,a} = signInfo;
        let url = `${domain}${detailsOpen}?jsv=${jsv}&appKey=${a}&t=${l}&sign=${sign}&api=${detailsApi}&v=${v}&dataType=${dataType}&jsonpIncPrefix=${jsonpIncPrefix}&ttid=${ttid}&LoginRequest=true&H5Request=true&type=${type}&callback=${callback}&data=${urlencode(data)}`;
        const options = {
            method  :'GET',
            url     : url,
            headers : {
                cookie: config.cookie
            }
        };
        request(options, function (error, response, body) {
            if (error) reject(error);
            let result = eval(mtopjsonpweexcb1(body));
            result = JSON.stringify(result);
            resolve(result);
        });
    });
};

const getDetails = async (pid, bool) => {
    try {
        const result = await getData(pid);
        const {data, ret} = JSON.parse(result);
        if(_.isEmpty(data)){
            console.warn('警告: %j', ret);
            return;
        }
        let {prodName, questions, quoteId, quoteType, sceneType, spuId, supplierId} = data;
        console.info(`prodName: ${prodName}, quoteId: ${quoteId}, quoteType: ${quoteType}, sceneType: ${sceneType}, spuId: ${spuId}, supplierId: ${supplierId}, size: ${questions.length}`);
        let spu = {
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
        if(bool){
            console.info(`${pid} 检测......`);
            const spuItem = await $spu.findOne({pid: pid});
            console.info('spuItem: ', spuItem);
            if(_.isEmpty(spuItem)){
                console.warn(`不存在该机型,另行保存`);
                await new $spu(spu).save();
            } else {
                console.info(`更新该机型......`);
                spuItem.spuId = spuId;
                spuItem.quoteId = quoteId;
                spuItem.prodName = prodName;
                spuItem.questions = questions;
                await spuItem.save();
            }
        } else {
            await new $spu(spu).save();
        }
    } catch (e) {
        console.error('err: ', e);
        return e;
    }
};

const getAllPrdouctDetails = async () => {
    try {
        let index = 0;
        const spus = JSON.parse(fs.readFileSync(spuDataPath));
        console.info(`机型总数:${spus.length}`);
        for(let spu of spus){
            ++index;
            console.info(`spuId: ${spu.spuId}, spuName: ${spu.name}`);
            await getDetails(spu.spuId, false);
            // if(index === 6){
            //     break;
            // }
            // break;
        }
        return;
    } catch (e) {
        console.error(e);
        return e;
    }
};

// 检测
const detection = async () => {
    try {
        const spuIds = [10206];
        for(let pid of spuIds){
            await getDetails(pid, true);
            break;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
};

getAllPrdouctDetails();
exports.getAllPrdouctDetails = getAllPrdouctDetails;