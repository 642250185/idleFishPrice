require('./schema');
const _ = require('lodash');
const fs = require('fs-extra');
const request = require('request');
const config = require('./config');
const urlencode = require('urlencode');
const xlsx = require('node-xlsx').default;
const sleep = require('js-sleep/js-sleep');
const {formatDate} = require('./util/dateUtil');
const {getSign} = require('./util/signature');
const obj = xlsx.parse('./file/price.xlsx');

const {domain, priceOpen, detailsOpen, jsv, priceApi, v, ecode, detailsApi, dataType, jsonpIncPrefix, ttid, type, exportPath, useCallback} = config.xy;

let pList = [], success = 0, failure = 0, failureList = [];
Object.keys(obj).forEach(function(key) {
    obj[key].data.forEach(function(item){
        pList.push({
            spuId           : item[0],
            singleStr       : item[2],
            multipleStr     : item[3]
        });
    });
});
pList.shift();

const mtopjsonpweexcb1 = (data) => {
    return data;
};

const supplierId = "24633099";
const callback2 = 'mtopjsonpweexcb1';

const getDetailData = (pid) => {
    return new Promise(function (resolve, reject) {
        // const data = "{\"spuId\":\""+pid+"\",\"sceneType\":\"3C\",\"channel\":\"idle\",\"channelData\":\"{\\\"sceneType\\\":\\\"3C\\\",\\\"channel\\\":\\\"undefined\\\",\\\"spuId\\\":\\\"10283\\\"}\",\"supplierId\":\""+supplierId+"\"}";
        const data = "{\"spuId\":\""+pid+"\",\"sceneType\":\"3C\",\"channel\":\"tmall-service\",\"channelData\":\"{\\\"sceneType\\\":\\\"3C\\\",\\\"xianyuRouter\\\":\\\"true\\\",\\\"channel\\\":\\\"tmall-service\\\",\\\"serviceCode\\\":\\\"old_for_new_phone\\\",\\\"subChannel\\\":\\\"xianyu\\\",\\\"spuId\\\":\\\""+pid+"\\\",\\\"popCount\\\":\\\"0\\\"}\"}";
        const signInfo = getSign(data);
        const {sign, l ,a} = signInfo;
        let url = `${domain}${detailsOpen}?jsv=${jsv}&appKey=${a}&t=${l}&sign=${sign}&api=${detailsApi}&v=${v}&dataType=${dataType}&jsonpIncPrefix=${jsonpIncPrefix}&ttid=${ttid}&LoginRequest=true&H5Request=true&type=${type}&callback=${callback2}&data=${urlencode(data)}`;
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

const getDetailInfo = async (pid) => {
    try {
        const result = await getDetailData(pid);
        const {data, ret} = JSON.parse(result);
        if(_.isEmpty(data)){
            console.warn('警告: %j', ret);
            return;
        }
        let {quoteId} = data;
        return quoteId;
    } catch (e) {
        console.error('err: ', e);
        return e;
    }
};

const getQuestionnaire = async (_pList) => {
    try {
        const enquiryData = [];
        console.time('time');
        for(let item of _pList){
            const questionnaire = [];
            const {spuId, singleStr, multipleStr} = item;
            if(_.isEmpty(singleStr)){
                continue;
            }
            // 获取单选项
            const singleArray = singleStr.split(";");
            for(let singleItem of singleArray){
                const singleValue = singleItem.split("#");
                questionnaire.push({
                    id: Number(singleValue[0]),
                    answers: [{id: Number(singleValue[1])}]
                });
            }
            if(!_.isEmpty(multipleStr)){
                // 获取多选项
                const multipleArray = multipleStr.split(";");
                const multipleValue = multipleArray[1].split("#");
                const answers = [];
                for(let multipleItem of multipleValue){
                    answers.push({id: Number(multipleItem)})
                }
                questionnaire.push({
                    id: Number(multipleArray[0]),
                    answers: answers
                });
            }
            const QID = await getDetailInfo(spuId);
            // 组装
            enquiryData.push({
                spuId           : spuId,
                quoteId         : QID,
                questionnaire   : questionnaire
            });
        }
        console.timeEnd('time');
        return enquiryData;
    } catch (e) {
        console.error(e);
        return [];
    }
};

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
                LoginRequest    : true,
                H5Request       : true,
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
            ++failure;
            failureList.push(priceData.spuId);
            return -1;
        } else {
            ++success;
            return data.price;
        }
    } catch (e) {
        ++failure;
        failureList.push(priceData.spuId);
        console.error(e);
        return e;
    }
};

const getAllPrdouctPrice = async () => {
    try {
        const prdouctPriceList = [];
        const prdouctList = await getQuestionnaire(pList);
        for(let prdouct of prdouctList){
            let price = await getPrice(prdouct);
            if(price != -1){
                price = (price / 100).toFixed(2);
            }
            const spu = await $spu.findOne({pid: prdouct.spuId});
            if(_.isEmpty(spu)){
                console.warn(`${prdouct.spuId} 该机型已下架。`);
                continue;
            }
            // console.info('spu: %j', spu);
            prdouctPriceList.push({
                pid         : spu.pid,
                spuId       : spu.spuId,
                prodName    : spu.prodName,
                price       : price,
                remark      : JSON.stringify(prdouct)
            });
        }
        return prdouctPriceList;
    } catch (e) {
        console.error(e);
        return e;
    }
};

const exportPriceInfo = async () => {
    try {
        const priceData = await getAllPrdouctPrice();
        console.info(`总共导出数据: ${priceData.length} 条, 成功: ${success} 条, 失败: ${failure} 条。失败列表(机型ID): %j`, failureList);
        const final = [];
        const header = ['pid', 'spuId', 'prodName', 'price', 'remark'];
        final.push(header);
        for(let item of priceData){
            let row = [];
            row.push(item.pid);
            row.push(item.spuId);
            row.push(item.prodName);
            row.push(item.price);
            row.push(item.remark);
            final.push(row);
        }
        const currentTime = formatDate(new Date(), 'YYYY-MM-DD-HH-mm-ss');
        const filename = `${exportPath}/闲鱼估吗机型价格信息#${currentTime}.xlsx`;
        fs.writeFileSync(filename, xlsx.build([
            {name: '闲鱼估吗机型价格数据', data: final},
        ]));
        console.log(`成功导出文件: ${filename}`);
    } catch (e) {
        console.error(e);
        return;
    }
};


exportPriceInfo();