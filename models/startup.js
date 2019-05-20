const mongoose = require('mongoose');

const startupShema=new mongoose.Schema({
    theme:{
        type:String,
        unique:true
    },
    masterId:{
        type:String
    },
    shortDescr:{
        type:String
    },

    description:{
        type:String
    },

    photo:{
        type:String
    },

        messages:{
        type:Array
        },
        membersIds:{
            type:Array
        },
        peopleNeeded:{
        type:String
        },
        contacts:{
        type:String
        },
        startup_requests:{
        type:Array
        }


    },
    {}
);

module.exports = mongoose.model('Startup', startupShema);