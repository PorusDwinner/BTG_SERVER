const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId : {
        type : String,
        required : [true,"User id is required"]
    },
    mentorId : {
        type : String,
        required : [true,"Mentor id is required"]
    },
    schedultDateTime : {
        type : Date,
        required : [true, "Date is required"],
        default : new Date(),
    },
    userName : {
        type : String,
        required : [true, "failed to fetch user name"]
    },
    mentorName : {
        type : String,
        required : [true, "failed to fetch mentor name"]
    },
    fee : {
        type : Number,
        required : [true, 'Session fee is required']
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    },
    userMessage : {
        type : String,
    },
    mentorMessage : {
        type : String,
    }
});

const Session = new mongoose.model("session",schema);
module.exports = Session;