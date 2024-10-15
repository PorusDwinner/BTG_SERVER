const Message = require('../models/messageModal');
const User = require('../models/userModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { NResponse } = require('../responses/response');
require('dotenv').config();
const jwtKey = process.env.JWT_SECRET;

module.exports.handleGetMessage = async (req, res, params) => {
    const { recieverId, isRead } = params;
    try {
        let msg;
        if (isRead) {
            msg = await Message.findOne({ recieverId: recieverId, isRead: true });
        } else {
            msg = await Message.findOne({ recieverId: recieverId });
        }
        if (!msg) {
            return new NResponse(
                0,
                "No message found",
                "",
                []
            )
        };
        //msg.message = decryptMessage(msg.message);
        return new NResponse(
            1,
            "Success",
            "",
            msg
        );
    }
    catch (err) {
        console.log("Error in get messages => ", err);
        return new NResponse(
            0,
            'Something went wrong, please check your internet connection or try again later',
            '',
            []
        );
    }
};

module.exports.handlePostMessage = async (req, res, params) => {
    const { senderId, recieverId, message } = params;
    try {
        const sender = await User.findOne({ _id: senderId });
        const reciever = await User.findOne({ _id: recieverId });
        if (!sender || !reciever) {
            return new NResponse(
                0,
                "Unable to find sender or reciever",
                "",
                []
            );
        };

        const senderName = sender.email;
        const recieverName = reciever.email;

        const msg = await Message.create({ senderId, recieverId, message, senderName, recieverName });
        if (msg == null) {
            return new NResponse(
                0,
                "Something went wrong",
                "",
                []
            );
        };

        return new NResponse(
            1,
            "Message sent succesfully",
            "",
            msg
        );
    }
    catch (err) {
        console.log("Error => ", err);
        return res.status(400).json(
            new NResposne(
                0,
                'Failed to register',
                'Something went wrong, please check your internet connection or try again later',
                err
            )
        );
    }
};

module.exports.handleMarkMessageRead = async (req, res, params) => {
    try {
        const { messageId, recieverId } = params;
        const msg = await Message.findOne({ _id: messageId, recieverId: recieverId });

        if (!msg) {
            return new NResponse(
                0,
                "No message found",
                "",
                []
            )
        };
        msg.isRead = true;
        const result = msg.save();
        console.log("message save result => ", result);

        return res.status.json(new NResponse(
            1,
            "Success",
            "",
            []
        ));
    }
    catch (err) {
        console.log("Error in mark msg read",err);
        return new NResponse(
            0,
            "Something went wrong, please check your internet connection or try again later",
            "",
            err
        );
    }
};

module.exports.handleDeleteMessage = async (req, res, params) => {
    try {
        const { messageId, recieverId } = params;
        const msg = await Message.findOne({ _id: messageId, recieverId: recieverId });

        if (!msg) {
            return new NResponse(
                0,
                "No message found",
                "",
                []
            )
        };

        const result = await Message.deleteOne({ _id: messageId, recieverId: recieverId });
        if (result.deletedCount === 0) {
            return new NResponse(
                0,
                "failed to delete message",
                "",
                []
            );
        };

        return new NResponse(
            1,
            "Deleted succesfully",
            "",
            []
        );
    }
    catch (err) {
        console.log("Error in deleting message", err);
        return new NResponse(
            0,
            "Something went wrong, please check your internet connection or try again later",
            "",
            err
        );
    }
};

// function decryptMessage(encryptedMessage) {
//     const [ivHex, encryptedText] = encryptedMessage.split(':');
//     const iv = Buffer.from(ivHex, 'hex');
//     const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
//     decrypted += decipher.final('utf-8');
//     return decrypted;
// };