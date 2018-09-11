require('../schema');
const _ = require('lodash');
const fs = require('fs-extra');
const request = require('request');
const config = require('../config');
const xlsx = require('node-xlsx').default;
const {changeIP} = require('../util/iputil');
const {getSign} = require('../util/signature');
const obj  = xlsx.parse('../file/tt.xlsx');

const {domain, priceOpen, jsv, priceApi, v, dataType, jsonpIncPrefix, ttid, type, exportPath} = config.xy;

const pList = [];
Object.keys(obj).forEach(function(key) {
    obj[key].data.forEach(function(item){
        pList.push({
            spuId           : item[0],
            quoteId         : item[1],
            singleStr       : item[2],
            multipleStr     : item[3]
        });
    });
});
pList.shift();

const getQuestionnaire = async (_pList) => {
    try {
        const enquiryData = [];
        console.time('time');
        for(let item of _pList){
            const questionnaire = [];
            const {spuId, quoteId, singleStr, multipleStr} = item;
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
            // 组装
            enquiryData.push({
                spuId           : spuId,
                quoteId         : quoteId,
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
        const prdouctPriceList = [];
        const prdouctList = await getQuestionnaire(pList);
        for(let prdouct of prdouctList){
            let price = await getPrice(prdouct);
            if(price != -1){
                price = (price / 100).toFixed(2);
            }
            const spu = await $spu.findOne({pid: prdouct.spuId});
            prdouctPriceList.push({
                pid         : spu.pid,
                spuId       : spu.spuId,
                prodName    : spu.prodName,
                quoteId     : spu.quoteId,
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
        console.info('size: %d', priceData.length);
        const final = [];
        const header = ['pid', 'spuId', 'prodName', 'quoteId', 'price', 'remark'];
        final.push(header);
        for(let item of priceData){
            let row = [];
            row.push(item.pid);
            row.push(item.spuId);
            row.push(item.prodName);
            row.push(item.quoteId);
            row.push(item.price);
            row.push(item.remark);
            final.push(row);
        }
        const random = Math.ceil(Math.random() * 100);
        const filename = `${exportPath}/闲鱼估吗机型价格信息-${random}.xlsx`;
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