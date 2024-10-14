const mongoose = require('mongoose');
const { isEmail } = require('validator');

const schema = new mongoose.Schema({
    userId : {
        type : String,
        required : [true, 'user id is required'],
    },
    userName : {
        type : String,
        required : [true, 'user name id is required'],
    },
    userEmail : {
        type : String,
        required : [true, 'user email is required'],
        lowercase : true,
        validate : [isEmail,'Please enter a vaid email']
    },
    mentorId : {
        type : String,
        required : [true, 'mentor id is required'],
    },
    mentorName : {
        type : String,
        required : [true, 'mentor name is required'],
    },
    mentorEmail : {
        type : String,
        required : [true, 'mentor email is required'],
        lowercase : true,
        validate : [isEmail,'Please enter a vaid email']
    },
    scheduleDate : {
        type : String,
        required : [true, 'schedule date is required']
    },
    scheduleTime : {
        type : String,
        required : [true, 'schedule time is required']
    },
    createdAt : {
        type : Date,
        required : true,
        default : new Date()
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    }
});

const Session = new mongoose.model("session", schema);
module.exports = Session;