const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { fullname, email, password } = req.body;

        const isUserAlready = await userModel.findOne({ email });

        if (isUserAlready) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ user, token });

    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Register failed' });
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password or email' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({ user, token });

    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Login failed' });
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Get user profile failed' });
    }
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');

        const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
        await blackListTokenModel.create({ token });
           
        res.status(200).json({ message: 'Loged out successfully' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Logout failed' });
    }
}