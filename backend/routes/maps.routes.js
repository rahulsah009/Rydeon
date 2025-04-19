const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller')
const {query} = require('express-validator')


router.get('/get-coordinates',
    query('address').isString().withMessage('Address must present'),
    authMiddleware.authUser, mapController.getCoordinates
)
router.get('/get-distance-time',
    authMiddleware.authUser,
    query('origin').isString().notEmpty().withMessage('Origin must be present'),
    query('destination').isString().notEmpty().withMessage('Destination must be present'),
    mapController.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().notEmpty().withMessage('Input must be present'),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)
    
module.exports = router