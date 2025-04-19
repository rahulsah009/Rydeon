const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blackListTokenModel = require("../models/blackListToken.model");


module.exports.registerCaptain = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const {fullname, email, password, vehicle} = req.body;

        const captainExists = await captainModel.findOne({email})
        if(captainExists){
            return res.status(400).json({message:'Captain already exists'});
        }
         
        const hashPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        })

        let token =  captain.generateAuthToken();
        return res.status(200).json({ token , captain });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error registering captain'});
    }
}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let captain = await captainModel.findOne({ email: req.body.email }).select('+password');
        if (!captain) {
            return res.status(400).send('Invalid email or password');
        }
        let validPassword = await captain.comparePassword(req.body.password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password');
        }
        let token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(200).send({ token , captain });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in captain');
    }
}

module.exports.getCaptainProfile = async (req, res) => {
    try {
        return res.status(200).json(req.captain);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error getting captain profile');
    }
}

module.exports.logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1] 
        res.clearCookie('token');
        await blackListTokenModel.create({ token });
        res.status(200).send('Logged out successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging out captain');
    }
}
