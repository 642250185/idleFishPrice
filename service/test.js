const urlencode = require('urlencode');

let data = {"parentNavPath":"catId4:126862528","deep":2,"bizCode":"3C"};
data = JSON.stringify(data);

console.info(urlencode(data));

console.info(Math.ceil(Math.random() * 100));
