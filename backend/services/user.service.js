const userModel = require('../models/user.model');

module.exports.createUser = async ({firstname , lastname , email , password}) => {
    if(!firstname || !email || !password){
        res.status(400).json({message: 'Please provide all required fields'});
    }

    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
}