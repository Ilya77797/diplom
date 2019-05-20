
const mongoose=require('../libs/mongoose');
const sha256=require('sha256');
var User=require('../models/user');
var session=require('../models/session');
exports.post=async function(ctx, next) {

    var userInfo=ctx.request.body;
    if(await doesUserExist(userInfo.email)){
        console.log('no');
        //ctx.throw(303,'user already exists');
        return;
    }
    userInfo.password=sha256(userInfo.password)
    var us1=new User(userInfo);
    ctx.state.user=us1;
    try{
        await us1.save();
        console.log('done');
    }
    catch(e){
        console.log(e);
    }

    var ses={
        sid:`koa:sess:${ctx.sessionId}`,
        blob:`{"cookie":{"httpOnly":true,"path":"/","overwrite":true,"signed":false,"maxAge":14400000}`,
        user:ctx.state.user._id.toString()
    };

    var curSes=new session(ses);
    try {
        await curSes.save();
        console.log(`--- ${new Date(Date.now()+10800000).toISOString().replace(/T/, ' ').replace(/\..+/, '')}--- session is saved: Sid${ses.sid} | sesUser${ses.user}`);
    }
    catch (e){
        console.log('error saving session');
    }


};

async function doesUserExist(email) {
    var user=await User.find({'email':email});
    if(user.length==0)
        return false
    else
        return true;
}

//test
var ctx={
    request:{
        body:{
            data:{
                email:'we',
                password:'sha1234'
            }
        }
    },
    sessionId:"session-1",
    state:{

    }

}
exports.post;

