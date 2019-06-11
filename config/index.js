const fs = require('fs');
const path = require('path');

const config = {

    mongodb: {
        // host: '10.0.10.230',
        // port: 27017,
        // host: '10.0.10.63',
        // port: 27017,
        host: '139.199.59.214',
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

    cookie: "t=131b5ade8e6117a2e4bb9fd72c099d82; cna=2DY0FVqAAHoCAbfp0xZeG7md; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKKw%2FL7qe51jfSGSrrwxvBTA%3D; _w_app_lg=23; tracknick=taobao642250185; lgc=taobao642250185; miid=1306643972157687963; munb=1046413522; ntm=0; _m_h5_tk=f4d9707363fad492c4d32bda8bcf2fb8_1560169496139; _m_h5_tk_enc=4cc9ce87dcd1445f24a23437b419547e; l=bBLG1z0RvCAYVEi0BOCN5ZZPhzb9RIRAguWbaRm6i_5ZV6T6uM_OleJBEF96Vj5R_aLB4KzBhYe9-etl2; cookie2=1be3822a2d70c4f2f4382a252c053f9c; _tb_token_=f53d536eb7457; v=0; ockeqeudmj=r7ZzkkI%3D; unb=1046413522; sg=523; _l_g_=Ug%3D%3D; skt=4017b296ccfbabb8; uc1=cookie21=UtASsssme%2BBq&cookie15=WqG3DMC9VAQiUQ%3D%3D&cookie14=UoTaGOn2Ag0PJw%3D%3D; cookie1=V3oSAessD8DQaU11Z8kRgU%2BbzUP3vVHut4knOvmCG%2B4%3D; csg=6e5d5a58; uc3=vt3=F8dBy3jddGPMuyXcmcE%3D&id2=UoH7LXdJAJEA2w%3D%3D&nk2=F5fTsrsze6Ghvz8w7D1i&lg2=VFC%2FuZ9ayeYq2g%3D%3D; _cc_=UtASsssmfA%3D%3D; dnk=taobao642250185; _nk_=taobao642250185; cookie17=UoH7LXdJAJEA2w%3D%3D; isg=BNfX-NX7R9BWsMMc8-Fe_E4kZksrHKGYRlPBUikE8qYNWPaaMezMzgFmvL5jsIP2",
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;
        return global.$config;
    }
};

module.exports = config.env();