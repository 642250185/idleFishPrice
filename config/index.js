const path = require('path');

const config = {
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

        category_path: '/api/categories',
        isbnDataPath: path.join(__dirname, '..', 'data/isbn.json'),
        partIsbnDataPath: path.join(__dirname, '..', 'data/partIsbn.json'),
        exportPath: path.join(__dirname, '..', 'download'),
    },
    appKey: "12574478",
    cookie: "cookie2=1098fd7b45a65d334cffa3fe548d26b7; _m_h5_tk=eeafdc018c27e1113784670ea03e1749_1536037213438; _m_h5_tk_enc=268459a564a5b8e04bd015ec9493574c; sg=523",
    category: {
        phone: 1,
        tablet: 2
    },
    /**
     * 返回或设置当前环镜
     */
    env: function () {
        global.$config = this;

        return global.$config;
    }
};

module.exports = config.env();