const request = require('superagent');
const urlencode = require('urlencode');

/*let data = {"parentNavPath":"catId4:126862528","deep":2,"bizCode":"3C"};
data = JSON.stringify(data);
console.info(urlencode(data));
console.info(Math.ceil(Math.random() * 100));*/

(async () => {
    let result = await request.get('https://market.m.taobao.com/app/idleFish-F2e/IdleFish4Weex/Recycle/RecycleParamsSet?spm=a211k7.212166.1128110.1&wh_weex=true&catInfo=%5B%7B%22title%22%3A%22%E6%89%8B%E6%9C%BA%22%2C%22p%22%3A%22catId4%3A126862528%22%2C%22deep%22%3A2%7D%2C%7B%22title%22%3A%22%E5%B9%B3%E6%9D%BF%E7%94%B5%E8%84%91%22%2C%22p%22%3A%22catId4%3A126860614%22%2C%22deep%22%3A2%7D%2C%7B%22title%22%3A%22%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91%22%2C%22p%22%3A%22catId4%3A126854525%22%2C%22deep%22%3A2%7D%2C%7B%22title%22%3A%22%E7%9B%B8%E6%9C%BA%22%2C%22p%22%3A%22catId1%3A126866998%22%2C%22deep%22%3A2%7D%2C%7B%22title%22%3A%223C%E6%95%B0%E7%A0%81%E9%85%8D%E4%BB%B6%22%2C%22p%22%3A%22catId1%3A126866937%22%2C%22deep%22%3A2%7D%5D&sceneType=3C&supplierId=24633099&channel=undefined&spuId=5&spuid=5');
    console.info('result: %j', result);
    // result = JSON.parse(result.text);
    // console.error('result: %j', result);
})();







