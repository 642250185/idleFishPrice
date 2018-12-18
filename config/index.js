const fs = require('fs');
const path = require('path');
let cookie;
(async() => {
    cookie = fs.readFileSync('F:/filePath/cookie.txt', 'utf8');
    console.info('cookie: ', cookie);
})();
const config = {

    mongodb: {
        host: '10.0.10.230',
        port: 27017,
        // host: '10.0.10.63',
        // port: 27017,
        // host: '139.199.59.214',
        // port: 8777,
        dbname: 'xygm3'
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
    cookie: "t=2205c3dd3fe7baf9ca7e7727d0e34284; cna=l/CDE86y82ECAbfp0xYJsnEo; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKKw%2FL7qe51jfSGSrrwxvBTA%3D; _w_app_lg=23; tracknick=taobao642250185; lgc=taobao642250185; tg=0; hng=CN%7Czh-cn%7CCNY; munb=1046413522; _m_h5_tk=74e90fd48e83b5ec9790d65d378df876_1545110601507; _m_h5_tk_enc=6128e660f95510f2740c68da16debb09; cookie2=1f5205c3c5eb547922f05c472c924d15; v=0; _tb_token_=5b5635eb91d33; unb=1046413522; sg=523; _l_g_=Ug%3D%3D; cookie1=V3oSAessD8DQaU11Z8kRgU%2BbzUP3vVHut4knOvmCG%2B4%3D; dnk=taobao642250185; _nk_=taobao642250185; cookie17=UoH7LXdJAJEA2w%3D%3D; ntm=0; ockeqeudmj=oQ8l0CI%3D; skt=bb910f8573a68304; uc1=cookie21=V32FPkk%2FgPzW&cookie15=V32FPkk%2Fw0dUvg%3D%3D&cookie14=UoTYM8dWZ5xvQQ%3D%3D; csg=780f2dec; uc3=vt3=F8dByRzMW2VG2EnDay0%3D&id2=UoH7LXdJAJEA2w%3D%3D&nk2=F5fTsrsze6Ghvz8w7D1i&lg2=WqG3DMC9VAQiUQ%3D%3D; _cc_=VT5L2FSpdA%3D%3D; l=aBdv2Ko1yFP2AmoXkMazgSGnSVtxSMZzpcaX1MaLmTqkdOg3eMOctKnoVMzO0zcOJyLyow6CqUEw.; isg=Avf3m5-PZ9bLTOSKbajOUeT2hutLvMH4Em95mkmkE0Yt-Bc6UYxbbrXeqmJZ",
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;
        return global.$config;
    }
};

module.exports = config.env();