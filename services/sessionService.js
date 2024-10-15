const User = require('../models/userModal');
const Session = require('../models/sessionModal');
const { NResposne } = require('../responses/response');

module.exports.handlePost = async (req, res, params) => {
    try {
        const { userId, mentorId, date, fee } = params;
        if (!userId || !mentorId || !date) {
            return res.status(401).json(new NResposne(
                0,
                "Missing userid/mentorid/date",
                "",
                []
            ))
        };

        const user = await User.findOne({ _id: userId });
        const mentor = await User.findOne({ _id: mentorId });

        if (!user || !mentor) {
            return res.status(401).json(new NResposne(
                0,
                "user or mentor not found",
                "",
                []
            ))
        };

        const session = await Session.findOne({ userId, mentorId, schedultDateTime : date });
        if(session){
            return res.status(401).json(new NResposne(
                0,
                `Session already registered for ${date}`,
                "",
                []
            ))
        };

        const userName = user.email;
        const mentorName = mentor.email;
        const result = await Session.create({ userId, mentorId, date, userName, mentorName, fee });

        if (!result) {
            return res.status(401).json(new NResposne(
                0,
                "Failed to book session, Please try again or check your internet connection",
                "",
                []
            ))
        };

        return res.status(401).json(new NResposne(
            1,
            "Session booked",
            "",
            result
        ));
    }
    catch (err) {
        console.log("Error in book session => ", err);
        return res.status(500).json(new NResposne(
            0,
            "Internal server error",
            "",
            []
        ))
    };
};

module.exports.handleUpdate = async (req, res, params) => {
    try {
        const { sessionId, date } = params;
        if (!sessionId || !date) {
            return res.status(401).json(new NResposne(
                0,
                "sessionId/date missing",
                "",
                []
            ))
        };

        const session = await Session.findOne({ _id: sessionId });
        if (!session) {
            return res.status(401).json(new NResposne(
                0,
                "No such session found",
                "",
                []
            ))
        };

        session.schedultDateTime = date;
        const result = await session.save();
        console.log("session update result => ", result);

        return res.status(201).json(new NResposne(
            1,
            "Session updateed",
            "",
            []
        ));
    }
    catch (err) {
        console.log("Error in updating session => ", err);
        return res.status(500).json(new NResposne(
            0,
            "Internal server error",
            "",
            []
        ));
    };
};

module.exports.handleDelete = async (req, res, params) => {
    try {
        const { sessionId, date } = params;
        if (!sessionId || !date) {
            return res.status(401).json(new NResposne(
                0,
                "sessionId/date missing",
                "",
                []
            ))
        };

        const session = await Session.findOne({ _id: sessionId });
        if (!session) {
            return res.status(401).json(new NResposne(
                0,
                "No such session found",
                "",
                []
            ))
        };

        const result = await Session.deleteOne({ _id: sessionId, schedultDateTime: date });
        if (result.deleteCount == 0) {
            return res.status(401).json(new NResposne(
                0,
                "Failed to cancel session, please try again or check your internet connection",
                "",
                []
            ))
        };

        return res.status(201).json(new NResposne(
            0,
            "Session deleted",
            "",
            []
        ))
    }
    catch (err) {
        console.log("Error in delete session => ",err);
        return req.status(500).json(new NResposne(
            0,
            "Internal server error",
            "",
            []
        ))
    };
};

module.exports.handleApprove = async(req, res, params) => {
    try{
        const { sessionId } = params;
        const session = await Session.findOne({ _id : sessionId });

        if(!session){
            return res.status(401).json(new NResposne(
                0,
                "No such session found",
                "",
                []
            ))
        };

        session.status = true;
        const result = await session.save();

        console.log("approve session result => ", result);
        return res.status(201).json(new NResposne(
            0,
            "Session approved",
            "",
            []
        ))
    }
    catch (err) {
        console.log("Error in approve session => ",err);
        return req.status(500).json(new NResposne(
            0,
            "Internal server error",
            "",
            []
        ))
    };
};