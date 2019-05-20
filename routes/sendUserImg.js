
let UserDB = require('../models/user');
var isLogged=require('../libs/isLogged');
var getUserId=require('../libs/getUserId');

exports.post=async function(ctx, next) {

    if(await isLogged(ctx)) {
        var userid= await getUserId(ctx);
        var user = await UserDB.findOne({_id: userid});

        if(user==null){
            ctx.body={awd: 'user error'};
        }
        else {

            user.photo=changeDir(ctx.request.files.userImg.path);
            try {
                user.save();
                ctx.body={awd: 'uploaded'};
            }
            catch (e){

            }


        }

    }
    else {
        ctx.body={awd: 'user error'};
    }


};

function changeDir(dir) {
    return dir.replace('public/','');
}