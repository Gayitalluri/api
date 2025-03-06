const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv")
const userRoutes = require("./routes/UserRoutes")
const cors = require("cors")

const PORT = 3000;
const app = express();
const DB = require("./config/db")
dotenv.config();
DB();
app.use(cors())
app.use(express.json());
app.use(userRoutes)

app.listen(PORT, () => {
    console.log("server is running on port 3000");
})

