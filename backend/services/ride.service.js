const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');


async function getFare(origin, destination) {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required')
    }

    const distanceTime = await mapsService.getDistanceTime(origin, destination);
    const baseFare = {
        car: 50,
        auto: 30,
        moto: 20
    };

    const perKmRate = {
        car: 10,
        auto: 5,
        moto: 3
    };

    const perMinuteRate = {
        car: 2,
        auto: 1,
        moto: 0.5
    };

    const distance = parseFloat(distanceTime.distance);
    const duration = parseFloat(distanceTime.duration);

    const distanceInKm = distance / 1000;
    const durationInMinutes = duration / 60;

    const fare = {
        car: baseFare.car + (perKmRate.car * distanceInKm) + (perMinuteRate.car * durationInMinutes),
        auto: baseFare.auto + (perKmRate.auto * distanceInKm) + (perMinuteRate.auto * durationInMinutes),
        moto: baseFare.moto + (perKmRate.moto * distanceInKm) + (perMinuteRate.moto * durationInMinutes)
    };
    return fare;

}


module.exports.getFare = getFare;

async function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({ userId, pickup, destination, vehicleType }) => {
    if (!userId || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination and vehicle type are required')
    }

    try {
        const fare = await getFare(pickup, destination);
        const distanceTime = await mapsService.getDistanceTime(pickup, destination);
        const distance = parseFloat(distanceTime.distance);
        const duration = parseFloat(distanceTime.duration);

        const distanceInKm = distance / 1000;
        const durationInMinutes = duration / 60;

        const ride = rideModel.create({
            user: userId,
            pickup,
            destination,
            distance: (distanceInKm).toFixed(2),
            otp: await getOtp(6),
            fare: (fare[vehicleType]).toFixed(2),
        });

        return ride;
    } catch (error) {
        throw error;
    }

}


module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}