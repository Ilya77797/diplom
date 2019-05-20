//var session=require('../libs/mongoose');
var session=require('../models/session');
const mongoose=require('../libs/mongoose');
const User=require('../models/user');

async function getUser(ctx) {
    console.log('ctx', ctx);
    console.log('ctxSes', ctx.sessionId);
    var cook=ctx.cookies.get('sid');

    /*var ses=ctx.sessionId;*/
   // var sesObj= await session.models.Session.find({sid:`koa:sess:${cook}`});

     var sesObj= await session.find({sid:`koa:sess:${cook}`});

    if(sesObj==undefined||sesObj.length==0)
        return null
    var userId=sesObj[0].user;
    if(userId==undefined)
        return null
    var c=userId
    var user= await User.find({"_id":userId});
    var UserN={
        email:user[0].email,
        name:user[0].name,
        surName:user[0].surName,
        description:user[0].description,
        photo:user[0].photo,
        notifications:user[0].notifications,
        myStartupId:user[0].myStartupId,
        contacts:user[0].contacts
    };
    return UserN;
}

module.exports=getUser;