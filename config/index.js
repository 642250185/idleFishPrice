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
    cookie: "cna=l/CDE86y82ECAbfp0xYJsnEo; t=f86ef1a531af22a4485991b49e852325; _m_h5_tk=5e631402d3a76030c8eb22494d50e687_1541766764410; _m_h5_tk_enc=4f3a3d0b3915aa345e7326b28e66875b; cookie2=181827bbc6f6652e1c565e03dd658c41; v=0; _tb_token_=e378787bb6e0b; ockeqeudmj=nB%2Fibpw%3D; munb=1046413522; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKKw%2FL7qe51jfSGSrrwxvBTA%3D; _w_app_lg=23; unb=1046413522; sg=523; _l_g_=Ug%3D%3D; skt=1644a2825cdbc892; uc1=cookie21=W5iHLLyFe3xm&cookie15=W5iHLLyFOGW7aA%3D%3D&cookie14=UoTYN4YwHZ2FGQ%3D%3D; cookie1=V3oSAessD8DQaU11Z8kRgU%2BbzUP3vVHut4knOvmCG%2B4%3D; csg=8bb69fcf; uc3=vt3=F8dByR%2FJyU7Av3N47%2Fs%3D&id2=UoH7LXdJAJEA2w%3D%3D&nk2=F5fTsrsze6Ghvz8w7D1i&lg2=W5iHLLyFOGW7aA%3D%3D; tracknick=taobao642250185; lgc=taobao642250185; _cc_=WqG3DMC9EA%3D%3D; dnk=taobao642250185; _nk_=taobao642250185; cookie17=UoH7LXdJAJEA2w%3D%3D; ntm=0; isg=AmpqwCC_xcBymEkBcO-LCoFJu9AG2-SOV6BU0fQjFr1IJwrh3Gs-RbBRx2nE",
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;
        return global.$config;
    }
};

module.exports = config.env();