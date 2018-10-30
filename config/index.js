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
        ttid        : '2018%40weex_h5_0.12.12',
        type        : 'originaljsonp',
        useCallback    : 'mtopjsonpweexcb2',
        brandDataPath: path.join(__dirname, '..', 'data/brand.json'),
        spuDataPath: path.join(__dirname, '..', 'data/spu.json'),
        exportPath: path.join(__dirname, '..', 'download'),
    },
    appKey: "12574478",
    // cookie: `"${cookie}"`,
    cookie: "t=f76b9009279d7c380aa8cae916767a9d; cna=l/CDE86y82ECAbfp0xYJsnEo; munb=1046413522; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKKw%2FL7qe51jfSGSrrwxvBTA%3D; _w_app_lg=23; tracknick=taobao642250185; lgc=taobao642250185; _m_h5_tk=a459fdec7fbefab7687abb6fb7258ad3_1540894622952; _m_h5_tk_enc=88fede013f27c8d6aaa78c89a669d1f8; cookie2=14d9db5f7703623890c2d6e06909c944; _tb_token_=f6e50568e3e18; unb=1046413522; sg=523; _l_g_=Ug%3D%3D; cookie1=V3oSAessD8DQaU11Z8kRgU%2BbzUP3vVHut4knOvmCG%2B4%3D; dnk=taobao642250185; _nk_=taobao642250185; cookie17=UoH7LXdJAJEA2w%3D%3D; ntm=0; ockeqeudmj=u5R1ESg%3D; uc3=vt3=F8dByRjP3lfd%2FJBg%2BDo%3D&id2=UoH7LXdJAJEA2w%3D%3D&nk2=F5fTsrsze6Ghvz8w7D1i&lg2=U%2BGCWk%2F75gdr5Q%3D%3D; uc1=cookie21=UIHiLt3xTIkz&cookie15=U%2BGCWk%2F75gdr5Q%3D%3D&cookie14=UoTYNk%2BoJmDkxQ%3D%3D; skt=c2af5092bd411ea4; _cc_=UIHiLt3xSw%3D%3D; csg=4e59eba8; isg=BJSUSbR3s5-69ydDihkdqKvXZdIM7bJsTe56Ey51Jp-iGTJjX_1DZj-YHVck4fAv",
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;
        return global.$config;
    }
};

module.exports = config.env();