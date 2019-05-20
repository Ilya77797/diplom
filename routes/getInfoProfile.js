
let UserDB = require('../models/user');
var isLogged=require('../libs/isLogged');
var getUserId=require('../libs/getUserId');

exports.get=async function(ctx, next) {

    if(await isLogged(ctx)) {
        var userid= await getUserId(ctx);
        var user = await UserDB.findOne({_id: userid});

        if(user==null){
            ctx.body={isAuth:false};//noUser
        }
        else {
            var response= {
                isAuth:true,
                user_info: {
                    img_src: user.photo,
                    email: user.email,
                    fname: user.name,
                    sname: user.surName,
                    aboute: user.description
                }
            }
            ctx.body=response

        }

    }
    else {
        ctx.body={isAuth:false};//noUser
    }


};