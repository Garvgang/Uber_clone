const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser=require('cookie-parser');
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes =require('./routes/maps.routes');
const rideRoutes =require('./routes/ride.routes');

connectToDb();

app.use(cors({
    origin:["http://localhost:5173",
    'https://uber-clone-nu-vert.vercel.app'],
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/users", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;