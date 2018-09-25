const fs = require('fs');
const path = require('path');
let cookie;
(async() => {
    cookie = fs.readFileSync('F:/filePath/cookie.txt', 'utf8');
    console.info('cookie: ', cookie);
})();
const config = {

    mongodb: {
        host: 'localhost',
        port: 27017,
        // host: '10.0.10.63',
        // port: 27017,
        // host: '139.199.59.214',
        // port: 8777,
        dbname: 'xygm'
    },
    //默认取七天前的数据
    defaultDay: 7,

    xy: {
        domain      : 'https://h5api.m.taobao.com',

        baseOpen    : '/h5/mtop.taobao.idle.recycle.nextspunav.get/1.0/',
        detailsOpen : '/h5/mtop.alibaba.idle.recycle.quote.template/1.0/',
        priceOpen   : '/h5/mtop.alibaba.idle.recycle.quote.get/1.0/',

        jsv         : '2.4.2',

        baseApi     : 'mtop.taobao.idle.recycle.nextSpuNav.get',
        detailsApi  : 'mtop.alibaba.idle.recycle.quote.template',
        priceApi    : 'mtop.alibaba.idle.recycle.quote.get',

        v           : '1.0',
        ecode       : 1,
        dataType    : 'originaljsonp',
        jsonpIncPrefix: 'weexcb',
        ttid        : '2018%40weex_h5_0.12.12',
        type        : 'originaljsonp',

        brandDataPath: path.join(__dirname, '..', 'data/brand.json'),
        spuDataPath: path.join(__dirname, '..', 'data/spu.json'),
        exportPath: path.join(__dirname, '..', 'download'),
    },
    appKey: "12574478",
    // cookie: `"${cookie}"`,
    cookie: "cookie2=1472ba72c6dfaa6cefebc07ff0f6ad9a; _m_h5_tk=cbc9686eb718d56da5f40ffcec39cf67_1537866925136; _m_h5_tk_enc=9fa759fe8e12f1a00711ff37be2a189e; sg=523",
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;

        return global.$config;
    }
};

module.exports = config.env();