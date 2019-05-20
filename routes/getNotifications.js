
let UserDB = require('../models/user');
var isLogged=require('../libs/isLogged');
var getUserId=require('../libs/getUserId');

exports.get=async function(ctx, next) {

    if(await isLogged(ctx)) {
        var userid= await getUserId(ctx);
        var user = await UserDB.findOne({_id: userid});

        if(user==null){
            ctx.body={notifications:null};
        }
        else {

            ctx.body={notifications:user.notifications};

        }

    }
    else {
        ctx.body={notifications:null};
    }


};