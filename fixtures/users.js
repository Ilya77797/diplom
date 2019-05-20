const mongoose=require('../libs/mongoose');
const sha256=require('sha256');
const User=require('../models/user');
var user={
  email:"new1",
  password:sha256('1234'),
    name:"q1",
    surName:"q2",
    photo:"---",
    description:"1111",
    notifications:[],
};
console.log('12');
async function doit1 () {
    var us1=new User(user);
    try{
        await us1.save();
    }
    catch(e){
        console.log(e);
    }
    console.log('done');
};

doit1();