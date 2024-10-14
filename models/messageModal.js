const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    senderId : {
        type : String,
        required : [true, 'Unable to fetch sender_id or id missing in client call'],
        unique : true
    },
    recieverId : {
        type : String,
        required : [true, 'Unable to fetch reciever_id or id missingin client call'],
        unique : true
    },
    message : {
        type : String,
        required : [true, 'Message is missing, please try to add a message']
    },
    senderName : {
        type : String,
        required : [true, 'Unable to fetch sender name'],
    },
    recieverName : {
        type : String,
        required : [true, 'Unable to fetch reciever name'],
    },
    isRead : {
        type : Boolean,
        required : true,
        default : false
    }
});

schema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.message = await bcrypt.hash(this.message, salt);
    next();
});

const Message = new mongoose.model("message",schema);
module.exports = Message;