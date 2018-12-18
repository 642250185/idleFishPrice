require('../schema');
const _ = require('lodash');
const fs = require('fs-extra');
const config = require('../config');
const xlsx = require('node-xlsx').default;

const {exportPath} = config.xy;

const getPrdoucts = async () => {
    try {
        const inventoryList = [];
        const spus = await $spu.find({});
        console.info('机型总数: %d', spus.length);
        if(spus.length === 0){
            console.warn('没有数据');
            return;
        }
        let count = 0;
        for(let spu of spus){
            const {pid, spuId, prodName, quoteId, questions} = spu;
            for(let item of questions){
                const {id, name, answers} = item;
                for(let answer of answers){
                    console.info(`count: ${++count}, pid: ${pid}, prodName: ${prodName}, quoteId: ${quoteId}, questionId: ${id}, questionName: ${name}, answerId: ${answer.id}, answerName: ${answer.name}`);
                    inventoryList.push({
                        pid         : pid,
                        spuId       : spuId,
                        prodName    : prodName,
                        quoteId     : quoteId,
                        questionId  : id,
                        questionName: name,
                        answerId    : answer.id,
                        answerName  : answer.name
                    });
                }
            }
        }
        return inventoryList;
    } catch (e) {
        console.error(e);
        return [];
    }
};


const exportData = async () => {
    try {
        const inventoryList = await getPrdoucts();
        console.info('size: %d', inventoryList.length);
        const final = [];
        const header = ['pid', 'spuId', 'prodName', 'quoteId', 'questionId', 'questionName', 'answerId', 'answerName'];
        final.push(header);
        for(let inventory of inventoryList){
            let row = [];
            row.push(inventory.pid);
            row.push(inventory.spuId);
            row.push(inventory.prodName);
            row.push(inventory.quoteId);
            row.push(inventory.questionId);
            row.push(inventory.questionName);
            row.push(inventory.answerId);
            row.push(inventory.answerName);
            final.push(row);
        }
        const random = Math.ceil(Math.random() * 100);
        const filename = `${exportPath}/闲鱼估吗机型信息-${random}.xlsx`;
        fs.writeFileSync(filename, xlsx.build([
            {name: '闲鱼估吗机型数据', data: final},
        ]));
        console.log(`成功导出文件: ${filename}`);
        return;
    } catch (e) {
        console.error(e);
        return;
    }
};

// exportData();
exports.exportData = exportData;