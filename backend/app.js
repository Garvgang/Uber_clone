const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser=require('cookie-parser');
const connectToDb = require("./db/db");
const userRoute = require("./routes/user.route");
const captainRoute = require("./routes/captain.routes");

connectToDb();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRoute);
app.use("/captain", captainRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;