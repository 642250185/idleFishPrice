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
        dbname: 'xygm2'
    },
    //默认取七天前的数据
    defaultDay: 7,
    xy: {
        domain      : 'https://h5api.m.taobao.com',
        baseOpen    : '/h5/mtop.taobao.idle.recycle.nextspunav.get/1.0/',
        detailsOpen : '/h5/mtop.alibaba.idle.recycle.quote.template/1.0/',

        priceOpen   : '/h5/mtop.alibaba.idle.recycle.quote.get/1.0/',

        jsv         : '2.4.16',
        baseApi     : 'mtop.taobao.idle.recycle.nextSpuNav.get',
        detailsApi  : 'mtop.alibaba.idle.recycle.quote.template',
        priceApi    : 'mtop.alibaba.idle.recycle.quote.get',
        // priceApi    : 'mtop.alibaba.idle.recycle.estimate.detail',
        v           : '1.0',
        ecode       : 1,
        dataType    : 'originaljsonp',
        jsonpIncPrefix: 'weexcb',
        ttid        : '2018%40weex_h5_1.0.32',

        type        : 'originaljsonp',
        useCallback    : 'mtopjsonpweexcb2',
        brandDataPath: path.join(__dirname, '..', 'data/brand.json'),
        spuDataPath: path.join(__dirname, '..', 'data/spu.json'),
        exportPath: path.join(__dirname, '..', 'download'),
    },
    appKey: "12574478",
    // cookie: `"${cookie}"`,
    cookie: "t=2205c3dd3fe7baf9ca7e7727d0e34284; cna=l/CDE86y82ECAbfp0xYJsnEo; munb=1046413522; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKKw%2FL7qe51jfSGSrrwxvBTA%3D; _w_app_lg=23; tracknick=taobao642250185; lgc=taobao642250185; cookie2=17c32902c031bb25c6e09065d7c7393d; v=0; _tb_token_=eabebab07576b; dnk=taobao642250185; ntm=0; _m_h5_tk=47bb960af0fefe2af02ca41220fa3b9b_1542704510898; _m_h5_tk_enc=94e90c0edf3adb1c625c8ea462951a2c; unb=1046413522; sg=523; _l_g_=Ug%3D%3D; cookie1=V3oSAessD8DQaU11Z8kRgU%2BbzUP3vVHut4knOvmCG%2B4%3D; _nk_=taobao642250185; cookie17=UoH7LXdJAJEA2w%3D%3D; ockeqeudmj=niPEZ%2Fg%3D; skt=804d6390e914b07c; uc1=cookie21=VFC%2FuZ9ainBZ&cookie15=V32FPkk%2Fw0dUvg%3D%3D&cookie14=UoTYNOnTrlHGaA%3D%3D; csg=07833841; uc3=vt3=F8dByR6um3mIjH86uzw%3D&id2=UoH7LXdJAJEA2w%3D%3D&nk2=F5fTsrsze6Ghvz8w7D1i&lg2=W5iHLLyFOGW7aA%3D%3D; _cc_=U%2BGCWk%2F7og%3D%3D; isg=AoGB_hXPviM9FNIsB_ogn66kkM2Rrv8bqN2vvOPWfQjnyqGcK_4FcK_M3ARz",
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;
        return global.$config;
    }
};

module.exports = config.env();