const monggose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const schema = new monggose.Schema({
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true,
        lowercase : true,
        validate : [isEmail,'Please enter a vaid email']
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
        minLength : [4,'Minimum password length required is 4']
    }
},{ timestamps : true });

schema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = new monggose.model("user",schema);
module.exports = User;