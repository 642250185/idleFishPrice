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
    cookie: "cna=l/CDE86y82ECAbfp0xYJsnEo; t=f86ef1a531af22a4485991b49e852325; munb=1046413522; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKKw%2FL7qe51jfSGSrrwxvBTA%3D; _w_app_lg=23; tracknick=taobao642250185; lgc=taobao642250185; _m_h5_tk=611e1005b13f52958e9b14b290401cd7_1542012029682; _m_h5_tk_enc=bec834884c62c4e3f5cb96a20477ac84; cookie2=1a6b43f2965213cc1f654c02a085a8a2; v=0; _tb_token_=fe875a108319e; unb=1046413522; sg=523; _l_g_=Ug%3D%3D; cookie1=V3oSAessD8DQaU11Z8kRgU%2BbzUP3vVHut4knOvmCG%2B4%3D; csg=2937b80b; dnk=taobao642250185; _nk_=taobao642250185; cookie17=UoH7LXdJAJEA2w%3D%3D; ntm=0; ockeqeudmj=tygRcHY%3D; skt=c1012147b137a1c2; uc1=cookie21=WqG3DMC9FxUx&cookie15=URm48syIIVrSKA%3D%3D&cookie14=UoTYNO8RzHAmHg%3D%3D; uc3=vt3=F8dByR%2FPtXZuWhjwTwY%3D&id2=UoH7LXdJAJEA2w%3D%3D&nk2=F5fTsrsze6Ghvz8w7D1i&lg2=Vq8l%2BKCLz3%2F65A%3D%3D; _cc_=UtASsssmfA%3D%3D; isg=Avv7j7lgJOvkNRh-iZQKDfiiit9vUAXpvpvlDu241_oRTBsudSCfohmKFtb9",
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;
        return global.$config;
    }
};

module.exports = config.env();