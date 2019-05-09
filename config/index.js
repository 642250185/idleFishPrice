const fs = require('fs');
const path = require('path');
let cookie;
//(async() => {
//    cookie = fs.readFileSync('F:/filePath/cookie.txt', 'utf8');
//    console.info('cookie: ', cookie);
//})();
const config = {

    mongodb: {
        // host: '10.0.10.230',
        // port: 27017,
        // host: '10.0.10.63',
        // port: 27017,
        host: '127.0.0.1',
        port: 8777,
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
    cookie: "t=bb6860159f0d95c0a1074e8b90ef1cc0; cna=c6dKFYG/uGgCAbfp0xblPKVY; ntm=0; munb=1006183628; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BugEKlLP1Z2Xfi%2BKrhKwI4g%3D%3D; _w_app_lg=0; tracknick=%5Cu6DD8%5Cu76AE%5Cu732A26%5Cu53F7; lgc=%5Cu6DD8%5Cu76AE%5Cu732A26%5Cu53F7; _m_h5_tk=a3a537a94e0319448eb3b9f0453717df_1557397157305; _m_h5_tk_enc=d83a784ab4dff983e9f3fbb050776ca1; cookie2=7f28662d8b66390cb75824c3e0d365ce; v=0; _tb_token_=e9359be83b8e3; ockeqeudmj=g6n3nk0%3D; unb=1006183628; sg=%E5%8F%B788; _l_g_=Ug%3D%3D; skt=81e4241cee00aa39; uc1=cookie21=WqG3DMC9Fb5nXeCVNodw&cookie15=Vq8l%2BKCLz3%2F65A%3D%3D&cookie14=UoTZ48ZmtgSS5w%3D%3D; cookie1=AVYqrj%2Fp%2BsaNCndphJuHORW06ScoqCzgMwDWYNgPr3s%3D; csg=aa1b515b; uc3=vt3=F8dByEa%2BoAASrLaco%2Fw%3D&id2=UoH%2FYEUugPBkSA%3D%3D&nk2=r4H338X4z4KZfQ%3D%3D&lg2=U%2BGCWk%2F75gdr5Q%3D%3D; _cc_=VFC%2FuZ9ajQ%3D%3D; dnk=%5Cu6DD8%5Cu76AE%5Cu732A26%5Cu53F7; _nk_=%5Cu6DD8%5Cu76AE%5Cu732A26%5Cu53F7; cookie17=UoH%2FYEUugPBkSA%3D%3D; l=bBPYr1luvZWm7WsTBOCiSZZPh_7OSIRAguWbaRV6i_5QQ6T_aH_OlK0SOF96Vj5RsyLp4IFj7Ty9-etk9; isg=AgAA_xSISBDQ5zQEkwYMfYy10Y7Yie67Rc7W93qRzJuu9aAfIpm049bNfWfK",
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;
        return global.$config;
    }
};

module.exports = config.env();