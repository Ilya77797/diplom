
let UserDB = require('../models/user');
var isLogged=require('../libs/isLogged');
var getUserId=require('../libs/getUserId');
var checkEmail=require('../libs/checkEmail');
exports.post=async function(ctx, next) {

    if(await isLogged(ctx)) {
        var newData=ctx.request.body;

            var userid= await getUserId(ctx);
            var user = await UserDB.findOne({_id: userid});

            if(user==null){
                ctx.body={ans: 'user error'};
            }
            else {
                if(newData.email!=user.email&&await checkEmail(newData.email)){
                    ctx.body={ans: 'email_exists'};
                }
                else{

                    user.email=newData.email;
                    user.name=newData.fname;
                    user.surName=newData.sname;
                    user.description=newData.aboute;
                    //user.competence=newData.competence;

                    try {
                        await user.save();
                        ctx.body={ans: 'yes'};
                    }
                    catch(e){
                        ctx.body={ans: 'error'};
                    }

                }

            }



    }
    else {
        ctx.body={ans: 'user error'};
    }


};