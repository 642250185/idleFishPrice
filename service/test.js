const fs = require('fs');
const request = require('superagent');
const urlencode = require('urlencode');

const test = async () => {
    try {
        let result = fs.readFileSync('F:/filePath/cookie.txt', 'utf8');
        console.info('result: ', typeof result, result);
    } catch (e) {
        console.error(e);
    }
};


test();