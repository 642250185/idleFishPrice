const {getBrands} = require('./service/brand');
const {crawlerProducts} = require('./service/prdouct');
const {getAllPrdouctDetails} = require('./service/details');
const {exportData} = require('./service/export');

const start = async() => {
    try {
        console.info(`开始`);

        console.info('开始采集品牌数据......');
        await getBrands();
        console.info('品牌数据采集完成......');

        console.info('开始采集机型数据......');
        await crawlerProducts();
        console.info('机型数据采集完成......');

        console.info('开始采集机型详情数据......');
        await getAllPrdouctDetails();
        console.info('机型详情数据采集完成......');

        console.info('开始采集机型详情数据......');
        await exportData();
        console.info('机型详情数据采集完成......');

        console.info('结束');
    } catch (e) {
        console.error(e);
        return e;
    }
};


start();