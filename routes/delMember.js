
let UserDB = require('../models/user');
const StartupDb=require('../models/startup');
var isLogged=require('../libs/isLogged');
var getUserId=require('../libs/getUserId');

exports.post=async function(ctx, next) {

    if(await isLogged(ctx)) {
        var delId=ctx.request.body.id;
        var userid= await getUserId(ctx);
        var user = await UserDB.findOne({_id: userid});
        if(user.myStartupId=='no'){
            this.throw(409, "no startup");
            return 0;
        }
        var Startup= await StartupDb.findOne({_id: user.myStartupId});

        if(user.myStartupId!=Startup.masterId){
            this.throw(410, "no rights");
            return 0;
        }
        Startup.membersIds=Startup.membersIds.remove(delId);
        var userDel=await UserDB.findOne({_id:delId});
        userDel.myStartupId='no';

        try{
            Startup.save();
            userDel.save();
            console.log('user deleted');
            ctx.body={ans: true};
        }
        catch(e){
            ctx.body={ans:false,err:e};
        }



    }
    else {
        ctx.body={isAuth:false};//noUser
    }


};

Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
}