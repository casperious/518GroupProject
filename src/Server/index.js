//const {createUser, getUser} = require('./api/companyAPIs')
//const {createCompany, getCompany} = require('./api/companyAPIs.js')

const mongoose = require('mongoose');
const MayorSchema = require('./Schema/MayorSchema.jsx');
const Cityofficials = require('./Schema/CityofficialsSchema.jsx');

const express = require("express");
const cors = require('cors');

const app = express();
const PORT = 9000;
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get("/", (req, res) => {
    res.status(200).send("API is live !");
  });
// Add Api calls here
//app.post('/createCompany', createCompany);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
