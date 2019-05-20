
let UserDB = require('../models/user');
const StartupDb=require('../models/startup');
var isLogged=require('../libs/isLogged');
var getUserId=require('../libs/getUserId');

exports.get=async function(ctx, next) {

    if(await isLogged(ctx)) {
        var userid= await getUserId(ctx);
        var user = await UserDB.findOne({_id: userid});
        if(user.myStartupId=='no'){
            this.throw(409, "no startup");
            return 0;
        }
        var Startup= await StartupDb.findOne({_id: user.myStartupId});
        var members=await UserDB.find({_id:{ $in : Startup.membersIds }});
        var t=0;



    }
    else {
        ctx.body={isAuth:false};//noUser
    }


};