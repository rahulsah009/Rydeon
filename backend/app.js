const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const mapsRoutes = require('./routes/maps.routes');
const captainRoutes = require('./routes/captain.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('Hellow World')
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);

module.exports = app;