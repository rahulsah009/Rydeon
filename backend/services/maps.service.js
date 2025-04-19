const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to geocode address');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

const geocodeAddress = async (address, apiKey) => {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const geocodingResponse = await axios.get(geocodingUrl);
        if (geocodingResponse.data.status === 'OK' && geocodingResponse.data.results.length > 0) {
            const location = geocodingResponse.data.results[0].geometry.location;
            return { ltd: location.lat, lng: location.lng };
        } else {
            console.error('Geocoding failed:', geocodingResponse.data.status, geocodingResponse.data.error_message);
            throw new Error(`Geocoding failed for address: ${address}`);
        }
    } catch (error) {
        console.error('Geocoding API request failed:', error);
        throw new Error(`Geocoding API request failed for address: ${address}`);
    }
};


module.exports.getDistanceTime = async (originAddress, destinationAddress, travelMode = 'DRIVE') => {
    const apiKey = process.env.GOOGLE_MAPS_API;

    // Geocode the addresses
    const origin = await geocodeAddress(originAddress, apiKey);
    const destination = await geocodeAddress(destinationAddress, apiKey);

    //Check for errors after geocoding.
    if (!origin || !destination) {
        throw new Error("Geocoding failed for one or both addresses");
    }

    const baseUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';

    try {
        const response = await axios.post(baseUrl, {
            origin: {
                location: {
                    latLng: {
                        latitude: origin.ltd,
                        longitude: origin.lng,
                    },
                },
            },
            destination: {
                location: {
                    latLng: {
                        latitude: destination.ltd,
                        longitude: destination.lng,
                    },
                },
            },
            travelMode: travelMode.toUpperCase(), // Ensure consistent capitalization
            routingPreference: 'TRAFFIC_AWARE', //Optional, but recommended for driving
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters',
            },
        });

        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            return {
                distance: route.distanceMeters,
                duration: route.duration.replace('s', ''),
            };
        } else {
            const errorDetails = response.data.error || "No routes found";
            throw new Error(`Route calculation failed: ${errorDetails}`);
        }
    } catch (error) {
        console.error('Error fetching route:', error.response ? error.response.data : error);
        if (error.response && error.response.status === 403) {
            throw new Error('Invalid API Key or insufficient permissions.');
        }
        throw new Error('Failed to calculate distance and time.');
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input) {
        throw new Error('Input is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch autocomplete suggestions');
        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        throw error;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd , lng , radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    })
    return captains;
}
