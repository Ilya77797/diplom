var session=require('../libs/mongoose');
var Startup=require('../models/startup');
const passport = require('koa-passport');
const mongoose=require('../libs/mongoose');
let UserDB = require('../models/user');
var isLogged=require('../libs/isLogged');
var getUserId=require('../libs/getUserId');
exports.post=async function(ctx, next) {

    if(await isLogged(ctx)){
        var userid= await getUserId(ctx);
        var user = await UserDB.findOne({_id: userid});
        if(user==null){
            ctx.body={code:404};//noUser
        }
        else if(user.myStartupId!="no"){
            ctx.body={code:405};//Уже есть стартап
        }
        else
            {
            var startupInfo=ctx.request.body;
            var newStartup={
                masterId:user._id,
                theme:startupInfo.theme,
                description:startupInfo.description,
                shortDescr:startupInfo.shortDescr,
                peopleNeeded:startupInfo.peopleNeeded,
                contacts:startupInfo.contacts
            }
            var newStartapbd=new Startup(newStartup);
                user.myStartupId=newStartapbd._id;
            try{
                await newStartapbd.save();
                await user.save();
                console.log('new startup created');
            }
            catch(e){
                console.log(e);
            }
        }

    }
    else {

        ctx.body = {code:403}//NoLogin
    }

};

// ctx.body = ctx.render('main',{isLoged:false});
// else
// ctx.body = ctx.render('main',{isLoged:true, name:user.email});
