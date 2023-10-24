//const {createUser, getUser} = require('./api/companyAPIs')
//const {createCompany, getCompany} = require('./api/companyAPIs.js')

const express = require('express');
const cors = require('cors');
const app = express();


const mongoose = require('mongoose');
const MayorSchema = require('./Schema/MayorSchema.jsx');
const Cityofficials = require('./Schema/CityofficialsSchema.jsx');


const PORT = 9000;
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

// Add Api calls here
//app.post('/createCompany', createCompany);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
const mongostring = "mongodb+srv://delegateAdmin:test12345@delegatecluster.rcuipff.mongodb.net/";
mongoose.connect(mongostring);
const database = mongoose.connection;


database.on('error', (error) => console.log(error));
database.once('connected', () => console.log("Databse connected"));

app.listen(9000, () => {
    console.log(`Server started at ${9000}`); 
})
