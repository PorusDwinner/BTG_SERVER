const User = require('../models/userModal');
const DP = require('../models/DPModal');
const { NResposne } = require('../responses/response');

module.exports.handleGetDp = async(req, res, params) => {
    try{
        const { userId } = params;
        const user = User.findOne({ _id : userId});

        if(!user){
            return res.status(401).json( new NResposne(
                0,
                "No user found",
                "",
                []
            ))
        };

        const dpLink = await DP.findOne({ userId });
        if(!dpLink){
            return res.status(401).json( new NResposne(
                0,
                "dp not found",
                "",
                []
            ))
        };

        return res.status(201).json(new NResposne(
            1,
            "success",
            "",
            dpLink
        ));
    }
    catch (err) {
        console.log("Error in get profile => ",err);
        return res.status(500).json(new NResposne(
            0,
            "Internal server error",
            "",
            []
        ));
    };
};
