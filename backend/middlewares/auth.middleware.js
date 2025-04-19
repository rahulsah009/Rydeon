const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blackListTokenModel = require('../models/blackListToken.model');
const captainModel = require("../models/captain.model");


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: '1Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: '2Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded._id });

        if (!user) {
            return res.status(401).json({ message: '3Unauthorized'});
        }

        req.user = user;
        return next();
    } catch (e) {
        res.status(401).send({ message: '4Unauthenticate',e });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: '2Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: '3Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findOne({ _id: decoded._id });

        if (!captain) {
            return res.status(401).json({ message: '4Unauthorized'});
        }

        req.captain = captain;
        return next();
    } catch (e) {
        res.status(401).send({ message: '5Unauthenticate' });
    }
}