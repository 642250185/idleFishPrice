const fs = require('fs');
const path = require('path');
let cookie;
(async() => {
    cookie = fs.readFileSync('F:/filePath/cookie.txt', 'utf8');
    console.info('cookie: ', cookie);
})();
const config = {

    mongodb: {
        host: '10.0.10.187',
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
    cookie: "cookie2=1b828230e8af55b39cd2c8af087fa0a5; _m_h5_tk=3f6ab9d43d7e1f99f729104b49b20785_1538224199536; _m_h5_tk_enc=4353062147466f8d24a07a4fe6c7f5a8; sg=523",
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;

        return global.$config;
    }
};

module.exports = config.env();