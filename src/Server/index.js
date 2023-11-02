//const {createUser, getUser} = require('./api/companyAPIs')
//const {createCompany, getCompany} = require('./api/companyAPIs.js')

const mongoose = require('mongoose');
const MayorSchema = require('./Schema/MayorSchema.jsx');
const Cityofficials = require('./Schema/CityofficialsSchema.jsx');
const User = require('./Schema/UserSchema');

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
app.post("/createUser", (req, res) => {
    console.log(`createUser: First Name: ${req.body.firstName}`)
    console.log(`createUser: Last Name: ${req.body.lastName}`)
    console.log(`createUser: EmailId: ${req.body.emailId}`)
    console.log(`createUser: Username: ${req.body.username}`)
    console.log(`createUser: pword: ${req.body.password}`)
    try {
        //Check if username already exists in database
        User.exists({ username: req.body.username }).then(result => {
            if (Object.is(result, null)) {
                const user = new User(req.body);
                user.save()
                console.log(`User created! ${user}`)
                res.send(user)
            }
            else {
                console.log("Username already exists")
                res.status(500).send("Username already exists")
            }
        })
    }
    catch (err) {
        console.log("CreateUser: Error")
        res.status(500).send(err);
    }
});

app.get("/getUser", async (req, res) => {
    console.log(" username and password to look for are ", req.query.username, req.query.password);
    const username = req.query.username;
    const password = req.query.password;
    try {
        const user = await User.findOne({ username, password });
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//app.listen(PORT, () => {
//    console.log(`Server started at ${PORT}`);
//})
const mongostring = "mongodb+srv://delegateAdmin:test12345@delegatecluster.rcuipff.mongodb.net/";
mongoose.connect(mongostring);
const database = mongoose.connection;


database.on('error', (error) => console.log(error));
database.once('connected', () => console.log("Database connected"));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
