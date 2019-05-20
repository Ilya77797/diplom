const sha256=require('sha256');
const passport = require('koa-passport');
const compose = require('koa-compose');
//var session=require('../libs/mongoose');
var session=require('../models/session');
let User = require('../models/user');
const mongoose=require('../libs/mongoose');
exports.post = async (ctx, next) => {
    //await passport.authenticate('local');
    var a =await auth(ctx);
    if (ctx.state.user) {
        var ses={
            sid:`koa:sess:${ctx.sessionId}`,
            blob:`{"cookie":{"httpOnly":true,"path":"/","overwrite":true,"signed":false,"maxAge":14400000}`,
            user:ctx.state.user._id
        };
       // var curSes=new session.models.Session(ses);
        var curSes=new session(ses);
        try {
            await curSes.save();
            console.log(`--- ${new Date(Date.now()+10800000).toISOString().replace(/T/, ' ').replace(/\..+/, '')}--- session is saved: Sid${ses.sid} | sesUser${ses.user}`);
            //ctx.redirect('/');
            var response={
                code:21,
                userData:{
                    name:ctx.state.user.name,
                    surName:ctx.state.user.surName,
                    photo:ctx.state.user.photo,
                    description:ctx.state.user.description,
                    notifications:ctx.state.user.notifications,
                    myStartupId:1
                }
            }
            ctx.cookies.set('sid',ctx.sessionId);
            ctx.body = response;

        }
        catch (e){
            console.log('error saving session');
        }

    }
  };

async function auth(ctx) {
    let email=ctx.request.body.email;
    let password=ctx.request.body.password;
    var userArr=await User.find({'email':email});
    var user=userArr[0];
    console.log('usName: ', email);
        console.log('User: ',user);
        if (!user || !user.checkPassword(password)) {
            // don't say whether the user exists
            console.log('no user');
            return  0
        }
        else {
            ctx.state.user=user;

        }



}

async function getUserInfoByEmail(email) {
var user=await User.find({'email':email})[0];
return user;
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