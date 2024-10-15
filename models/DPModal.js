const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId : {
        type : String,
        required : [true, 'User id is required']
    },
    dp : {
        type : String,
        required : [true, 'dp link is required']
    },
    createdAt : {
        type : Date,
        required : [true, 'crated at is required'],
        default : new Date()
    }
});

const DP = new mongoose.model("dp", schema);
module.exports = DP;