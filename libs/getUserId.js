
var session=require('../models/session');
const mongoose=require('../libs/mongoose');
const User=require('../models/user');

async function getUserId(ctx) {
    console.log('ctx', ctx);
    console.log('ctxSes', ctx.sessionId);
    var cook=ctx.cookies.get('sid');

    var sesObj= await session.find({sid:`koa:sess:${cook}`});

    if(sesObj==undefined||sesObj.length==0)
        return null

    return sesObj[0].user; //UserId
}

module.exports=getUserId;