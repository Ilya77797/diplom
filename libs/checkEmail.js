
let UserDB = require('../models/user');

module.exports=async function checkEmail(email) {
    var t = await UserDB.find({"email":email});
    if(t.length>0)
        return true;

    return false;

}