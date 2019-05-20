
var Startup=require('../models/startup');
const passport = require('koa-passport');
const mongoose=require('../libs/mongoose');
let UserDB = require('../models/user');
var isLogged=require('../libs/isLogged');
var getUserId=require('../libs/getUserId');
exports.get=async function(ctx, next) {

    if(await isLogged(ctx)){
        var userid= await getUserId(ctx);
        var user = await UserDB.findOne({_id: userid});
        if(user==null){
            ctx.body={code:404};//noUser
        }
        else if(user.myStartupId=="no"){
            ctx.body={role: "no"};

        }
        else
        {
            var startupInfo= await Startup.findOne({_id:user.myStartupId });
            var response={
                role:"member",
                startup:{
                    title:startupInfo.theme,
                    description:startupInfo.description,
                    peopleNeeded:startupInfo.peopleNeeded,
                    contacts:startupInfo.contacts,
                    messages:startupInfo.messages,
                    members:startupInfo.membersIds
                }
            }
            if(startupInfo.masterId==userid){
                response.role="master";
                Object.assign(response.startup, {startup_requests:startupInfo.startup_requests });
            }


            ctx.body=response;
        }

    }
    else {

        ctx.body = {code:403}//NoLogin
    }

};


