
// const bodyParser = require('koa-bodyparser');
const bodyParser = require('koa-body')
module.exports = bodyParser({
    formidable:{uploadDir: './public/photo',
        keepExtensions: true},    //This is where the files would come
    multipart: true,
    urlencoded: true
});
