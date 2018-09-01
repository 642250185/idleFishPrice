const path = require('path');

const config = {
    xy: {
        domain: 'https://www.duozhuayu.com',
        category_path: '/api/categories',
        isbnDataPath: path.join(__dirname, '..', 'data/isbn.json'),
        partIsbnDataPath: path.join(__dirname, '..', 'data/partIsbn.json'),
        exportPath: path.join(__dirname, '..', 'download'),
    },
    cookie: "t=0d2ac9eec09e96c806825db32aa95c53; cna=l/CDE86y82ECAbfp0xYJsnEo; cookie2=10c0e6052577ca04ce8a8ddcf2a339a8; v=0; _tb_token_=e187bb3de6663; munb=1046413522; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BKKw%2FL7qe51jfSGSrrwxvBTA%3D; _w_app_lg=23; tracknick=taobao642250185; lgc=taobao642250185; dnk=taobao642250185; ntm=0; _m_h5_tk=a801a8161d4e29b444666698250b70da_1535795333199; _m_h5_tk_enc=53ba0484d90dd24b6927808b2859c164; unb=1046413522; sg=523; _l_g_=Ug%3D%3D; cookie1=V3oSAessD8DQaU11Z8kRgU%2BbzUP3vVHut4knOvmCG%2B4%3D; _nk_=taobao642250185; cookie17=UoH7LXdJAJEA2w%3D%3D; ockeqeudmj=pcK2ZM0%3D; skt=774e842b7577ed27; uc1=cookie21=URm48syIYn73&cookie15=VFC%2FuZ9ayeYq2g%3D%3D&cookie14=UoTfLioAO4sOeg%3D%3D; csg=cf8119ba; uc3=vt3=F8dBzrSO7ysZo4KoBc4%3D&id2=UoH7LXdJAJEA2w%3D%3D&nk2=F5fTsrsze6Ghvz8w7D1i&lg2=UtASsssmOIJ0bQ%3D%3D; _cc_=Vq8l%2BKCLiw%3D%3D; isg=BLW1YDRpAv6b3WZCoBCdQ-koxDFlMmP_hBl7kDfacSx7DtUA_4J5FMPPXNQ4ToH8",
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