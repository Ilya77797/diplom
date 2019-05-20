var session=require('../models/session');
exports.get = async function(ctx, next) {
  ctx.logout();
  var ses=ctx.sessionId;
  try{
      await session.remove({sid:`koa:sess:${ses}`});
      console.log(`--- ${new Date(Date.now()+10800000).toISOString().replace(/T/, ' ').replace(/\..+/, '')}--- session  removed: Sid${ses} `);

      ctx.session = null; // destroy session (!!!)
      ctx.sessionId=null;
      ctx.ses=null;

      ctx.body={out:'yes'};
  }
  catch(e){
      ctx.body={out:'no'};
  }

};

//1. uri -logout, удалять куки на клиенте