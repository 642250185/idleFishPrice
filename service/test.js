const fs = require('fs');
const request = require('superagent');
const urlencode = require('urlencode');

const test = async () => {
    try {
        // let result = fs.readFileSync('F:/filePath/cookie.txt', 'utf8');
        // console.info('result: ', typeof result, result);


        let qid = '142323359';
        let data = "{\"quoteId\":\""+qid+"\"}";

        let data2 = {'quoteId':'142323359'};


        console.info(urlencode(data));

        console.info(urlencode(JSON.stringify(data2)));

    } catch (e) {
        console.error(e);
    }
};


test();