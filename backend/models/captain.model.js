const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'A name must have more or equal than 3 characters'],
        },
        lastname: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    vehicle: {
        color: {
            type: String,
            required: [true, 'A vehicle must have a color']
        },
        plate: {
            type: String,
            required: [true, 'A vehicle must have a plate number']
        },
        capacity: {
            type: Number,
            required: [true, 'A vehicle must have a capacity'],
            min: [1, 'A vehicle must have a capacity of at least 1 person']
        },
        vehicleType: {
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: [true, 'A vehicle must have a type']
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    }
});

captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET , {expiresIn: '24h'});    
}

captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}


const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;
