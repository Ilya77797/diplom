
var check=require('../libs/checkEmail');

exports.post=async function(ctx, next) {
    var email=ctx.request.body.email;
    ctx.body={ans:await check(email) }

};