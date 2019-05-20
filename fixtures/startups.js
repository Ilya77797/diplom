
const mongoose=require('../libs/mongoose');
const Startup=require('../models/startup');


async function doit() {
    var arr=await Startup.findOne({masterId:"5cd42b3a39678b0dd108c896"});
    arr.membersIds=["5cd93a905d08561e4dfefc88","5cd9377d5d08561e4dfefc83"];
    // arr.membersIds.push('5cd93a905d08561e4dfefc88');
    // arr.membersIds.push('5cd9377d5d08561e4dfefc83');

    await arr.save();
    var e=0;
}

doit();