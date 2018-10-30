const config = require('../config');

const s = (e) => {
    function t(e, t) {
        return e << t | e >>> 32 - t
    }
    function n(e, t) {
        var n, i, r, o, a;
        return r = 2147483648 & e,
            o = 2147483648 & t,
            n = 1073741824 & e,
            i = 1073741824 & t,
            a = (1073741823 & e) + (1073741823 & t),
            n & i ? 2147483648 ^ a ^ r ^ o : n | i ? 1073741824 & a ? 3221225472 ^ a ^ r ^ o : 1073741824 ^ a ^ r ^ o : a ^ r ^ o
    }
    function i(e, t, n) {
        return e & t | ~e & n
    }
    function r(e, t, n) {
        return e & n | t & ~n
    }
    function o(e, t, n) {
        return e ^ t ^ n
    }
    function a(e, t, n) {
        return t ^ (e | ~n)
    }
    function s(e, r, o, a, s, l, c) {
        return e = n(e, n(n(i(r, o, a), s), c)),
            n(t(e, l), r)
    }
    function l(e, i, o, a, s, l, c) {
        return e = n(e, n(n(r(i, o, a), s), c)),
            n(t(e, l), i)
    }
    function c(e, i, r, a, s, l, c) {
        return e = n(e, n(n(o(i, r, a), s), c)),
            n(t(e, l), i)
    }
    function u(e, i, r, o, s, l, c) {
        return e = n(e, n(n(a(i, r, o), s), c)),
            n(t(e, l), i)
    }
    function d(e) {
        var t, n, i = "", r = "";
        for (n = 0; 3 >= n; n++)
            t = e >>> 8 * n & 255,
                r = "0" + t.toString(16),
                i += r.substr(r.length - 2, 2);
        return i
    }
    var h, f, p, m, g, A, w, v, b, y = [];
    for (e = function(e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", n = 0; n < e.length; n++) {
            var i = e.charCodeAt(n);
            128 > i ? t += String.fromCharCode(i) : i > 127 && 2048 > i ? (t += String.fromCharCode(i >> 6 | 192),
                t += String.fromCharCode(63 & i | 128)) : (t += String.fromCharCode(i >> 12 | 224),
                t += String.fromCharCode(i >> 6 & 63 | 128),
                t += String.fromCharCode(63 & i | 128))
        }
        return t
    }(e),
             y = function(e) {
                 for (var t, n = e.length, i = n + 8, r = (i - i % 64) / 64, o = 16 * (r + 1), a = new Array(o - 1), s = 0, l = 0; n > l; )
                     t = (l - l % 4) / 4,
                         s = l % 4 * 8,
                         a[t] = a[t] | e.charCodeAt(l) << s,
                         l++;
                 return t = (l - l % 4) / 4,
                     s = l % 4 * 8,
                     a[t] = a[t] | 128 << s,
                     a[o - 2] = n << 3,
                     a[o - 1] = n >>> 29,
                     a
             }(e),
             A = 1732584193,
             w = 4023233417,
             v = 2562383102,
             b = 271733878,
             h = 0; h < y.length; h += 16)
        f = A,
            p = w,
            m = v,
            g = b,
            A = s(A, w, v, b, y[h + 0], 7, 3614090360),
            b = s(b, A, w, v, y[h + 1], 12, 3905402710),
            v = s(v, b, A, w, y[h + 2], 17, 606105819),
            w = s(w, v, b, A, y[h + 3], 22, 3250441966),
            A = s(A, w, v, b, y[h + 4], 7, 4118548399),
            b = s(b, A, w, v, y[h + 5], 12, 1200080426),
            v = s(v, b, A, w, y[h + 6], 17, 2821735955),
            w = s(w, v, b, A, y[h + 7], 22, 4249261313),
            A = s(A, w, v, b, y[h + 8], 7, 1770035416),
            b = s(b, A, w, v, y[h + 9], 12, 2336552879),
            v = s(v, b, A, w, y[h + 10], 17, 4294925233),
            w = s(w, v, b, A, y[h + 11], 22, 2304563134),
            A = s(A, w, v, b, y[h + 12], 7, 1804603682),
            b = s(b, A, w, v, y[h + 13], 12, 4254626195),
            v = s(v, b, A, w, y[h + 14], 17, 2792965006),
            w = s(w, v, b, A, y[h + 15], 22, 1236535329),
            A = l(A, w, v, b, y[h + 1], 5, 4129170786),
            b = l(b, A, w, v, y[h + 6], 9, 3225465664),
            v = l(v, b, A, w, y[h + 11], 14, 643717713),
            w = l(w, v, b, A, y[h + 0], 20, 3921069994),
            A = l(A, w, v, b, y[h + 5], 5, 3593408605),
            b = l(b, A, w, v, y[h + 10], 9, 38016083),
            v = l(v, b, A, w, y[h + 15], 14, 3634488961),
            w = l(w, v, b, A, y[h + 4], 20, 3889429448),
            A = l(A, w, v, b, y[h + 9], 5, 568446438),
            b = l(b, A, w, v, y[h + 14], 9, 3275163606),
            v = l(v, b, A, w, y[h + 3], 14, 4107603335),
            w = l(w, v, b, A, y[h + 8], 20, 1163531501),
            A = l(A, w, v, b, y[h + 13], 5, 2850285829),
            b = l(b, A, w, v, y[h + 2], 9, 4243563512),
            v = l(v, b, A, w, y[h + 7], 14, 1735328473),
            w = l(w, v, b, A, y[h + 12], 20, 2368359562),
            A = c(A, w, v, b, y[h + 5], 4, 4294588738),
            b = c(b, A, w, v, y[h + 8], 11, 2272392833),
            v = c(v, b, A, w, y[h + 11], 16, 1839030562),
            w = c(w, v, b, A, y[h + 14], 23, 4259657740),
            A = c(A, w, v, b, y[h + 1], 4, 2763975236),
            b = c(b, A, w, v, y[h + 4], 11, 1272893353),
            v = c(v, b, A, w, y[h + 7], 16, 4139469664),
            w = c(w, v, b, A, y[h + 10], 23, 3200236656),
            A = c(A, w, v, b, y[h + 13], 4, 681279174),
            b = c(b, A, w, v, y[h + 0], 11, 3936430074),
            v = c(v, b, A, w, y[h + 3], 16, 3572445317),
            w = c(w, v, b, A, y[h + 6], 23, 76029189),
            A = c(A, w, v, b, y[h + 9], 4, 3654602809),
            b = c(b, A, w, v, y[h + 12], 11, 3873151461),
            v = c(v, b, A, w, y[h + 15], 16, 530742520),
            w = c(w, v, b, A, y[h + 2], 23, 3299628645),
            A = u(A, w, v, b, y[h + 0], 6, 4096336452),
            b = u(b, A, w, v, y[h + 7], 10, 1126891415),
            v = u(v, b, A, w, y[h + 14], 15, 2878612391),
            w = u(w, v, b, A, y[h + 5], 21, 4237533241),
            A = u(A, w, v, b, y[h + 12], 6, 1700485571),
            b = u(b, A, w, v, y[h + 3], 10, 2399980690),
            v = u(v, b, A, w, y[h + 10], 15, 4293915773),
            w = u(w, v, b, A, y[h + 1], 21, 2240044497),
            A = u(A, w, v, b, y[h + 8], 6, 1873313359),
            b = u(b, A, w, v, y[h + 15], 10, 4264355552),
            v = u(v, b, A, w, y[h + 6], 15, 2734768916),
            w = u(w, v, b, A, y[h + 13], 21, 1309151649),
            A = u(A, w, v, b, y[h + 4], 6, 4149444226),
            b = u(b, A, w, v, y[h + 11], 10, 3174756917),
            v = u(v, b, A, w, y[h + 2], 15, 718787259),
            w = u(w, v, b, A, y[h + 9], 21, 3951481745),
            A = n(A, f),
            w = n(w, p),
            v = n(v, m),
            b = n(b, g);
    return (d(A) + d(w) + d(v) + d(b)).toLowerCase()
};

const getToken = () => {
    let result = "";
    try {
        const mh5tk = " _m_h5_tk";
        const cookieStr = config.cookie;
        const cookieArray = cookieStr.split(";");
        for(let item of cookieArray){
            const values = item.split("=");
            if(values[0] === mh5tk){
                result = values[1];
            }
        }
        return result.split("_")[0];
    } catch (e) {
        console.error(e);
        return result;
    }
};

const getSign = (data) => {
    try {
        const a = config.appKey;
        const token = getToken();
        const l = (new Date).getTime();
        const sign = s(token+"&"+l+"&"+a+"&"+`${data}`);
        console.info(`token: ${token}, sign: ${sign}, l: ${l}, a: ${a}`);
        return {sign, l , a}
    } catch (e) {
        console.error(e);
        return "";
    }
};

const data = '{"spuId":"10160","quoteId":142344266,"questionnaire":[{"id":20005,"name":"机身外壳","questionType":"SINGLECHOISE","required":true,"answers":[{"id":19,"name":"外壳完好无使用痕迹","type":"TEXT","excludeIds":[]}]},{"id":20006,"name":"屏幕外观","questionType":"SINGLECHOISE","required":true,"answers":[{"id":21,"name":"触屏完美无划痕","type":"TEXT","excludeIds":[]}]},{"id":20035,"name":"屏幕显示","questionType":"SINGLECHOISE","required":true,"answers":[{"id":114,"name":"显示正常","type":"TEXT","excludeIds":[]}]},{"id":20003,"name":"开机情况","questionType":"SINGLECHOISE","required":true,"answers":[{"id":10,"name":"正常开机","type":"TEXT","excludeIds":[]}]},{"id":9999,"name":"功能问题(可多选，如无功能问题可不选)","questionType":"MULTICHOICES","required":false,"answers":[{"id":77,"name":"有进水","type":"TEXT","excludeIds":[]}]}],"dataType":"originaljson"}';

// getSign(data);
exports.getSign = getSign;