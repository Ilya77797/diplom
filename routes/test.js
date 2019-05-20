var session=require('../libs/mongoose');
const send = require('koa-send');
const passport = require('koa-passport');
const mongoose=require('../libs/mongoose');

var isLogged=require('../libs/isLogged');
var getUser=require('../libs/getUser');
let path="public/build/index.html";
exports.get=async function(ctx, next) {

    await send(ctx, path);

    // if(await isLogged(ctx)){
    //     var user= await getUser(ctx);
    //     if(user==null)
    //         ctx.body = ctx.render('main',{isLoged:false});
    //     else
    //         ctx.body = ctx.render('main',{isLoged:true, name:user.email});
    //
    // }
    // else {
    //
    //     ctx.body = ctx.render('main',{isLoged:false});
    // }

};
