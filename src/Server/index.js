//const {createUser, getUser} = require('./api/companyAPIs')
//const {createCompany, getCompany} = require('./api/companyAPIs.js')

const mongoose = require('mongoose');
const MayorSchema = require('./Schema/MayorSchema.jsx');
const Cityofficials = require('./Schema/CityofficialsSchema.jsx');
const User = require('./Schema/UserSchema');

const express = require("express");
const cors = require('cors');
const Candidate = require('./Schema/CandidateSchema.jsx');
const Department = require('./Schema/DepartmentSchema.js');

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

app.post('/registerCandidate', async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        const existsCandidate = await Candidate.findOne({ userID: candidate.userID });
        if (existsCandidate) {
            console.log("Candidate exists");
            res.status(510).send("Candidate exists");
        }
        else {
            await candidate.save(req.body);
            console.log(candidate);
            res.send(candidate);
        }
    }
    catch (error) {
        console.log("Details are ", req.body);
        console.log("Error is", error)
        res.status(500).send(error);
    }
})

app.get('/getCandidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.send(candidates);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get('/getUserById', async (req, res) => {
    const _id = req.query._id;
    try {
        const user = await User.findOne({ _id: _id });
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get("/getUser", async (req, res) => {
    //console.log(" username and password to look for are ", req.query.username, req.query.password);
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

app.get("/getUsers", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get('/getDepartments', async (req, res) => {
    try {
        const depts = await Department.find();
        res.send(depts);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/deleteDepartment', async (req, res) => {
    console.log("deleting ", req.body.department_id);
    try {
        const result = await Department.findByIdAndDelete({ _id: req.body.department_id });
        //console.log(result);
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.get('/getCityOfficials', async (req, res) => {
    try {
        const officials = await Cityofficials.find();
        res.send(officials);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post("/registerCityOfficial", async (req, res) => {
    try {
        const cityOfficial = new Cityofficials(req.body);
        const existsOfficial = await Cityofficials.findOne({ userId: cityOfficial.userId });
        if (existsOfficial) {
            console.log("City official exists");
            res.status(510).send("city official exists");
        }
        else {
            await cityOfficial.save(req.body);

            try {
                const filter = { _id: req.body.userId };
                const updateDoc = {
                    $set: { isCityOfficial: "Yes", isMayor: "No", isEmployee: "No" }
                };
                const options = { upsert: true };
                await User.updateOne(filter, updateDoc, options);
            }
            catch (error) {
                console.log("Error in updating userid");
            }
            console.log(cityOfficial);
            res.send(cityOfficial);
        }
    }
    catch (error) {
        console.log("Details are ", req.body);
        console.log("Error is", error)
        res.status(500).send(error);
    }
})

app.post("/registerDepartment", async (req, res) => {
    try {
        const department = new Department(req.body);
        const existsDepartment = await Candidate.findOne({ name: department.name });
        if (existsDepartment) {
            console.log("Department exists");
            res.status(510).send("Department exists");
        }
        else {
            await department.save(req.body);
            console.log(department);
            res.send(department);
        }
    }
    catch (error) {
        console.log("Details are ", req.body);
        console.log("Error is", error)
        res.status(500).send(error);
    }
})

app.post("/registerMayor", async (req, res) => {
    try {
        const mayor = new Mayor(req.body);
        const existsMayor = await Mayor.findOne({ userId: cityOfficial.userId });
        if (existsMayor) {
            console.log("Mayor exists");
            res.status(510).send("Mayor exists");
        }
        else {
            await mayor.save(req.body);

            try {
                const filter = { _id: req.body.userId };
                const updateDoc = {
                    $set: { isMayor: "Yes", isCityOfficial: "No", isEmployee: "No" }
                };
                const options = { upsert: true };
                await User.updateOne(filter, updateDoc, options);
            }
            catch (error) {
                console.log("Error in updating userid");
            }
            console.log(mayor);
            res.send(mayor);
        }
    }
    catch (error) {
        console.log("Details are ", req.body);
        console.log("Error is", error)
        res.status(500).send(error);
    }
})

const mongostring = "mongodb+srv://delegateAdmin:test12345@delegatecluster.rcuipff.mongodb.net/";
mongoose.connect(mongostring);
const database = mongoose.connection;


database.on('error', (error) => console.log(error));
database.once('connected', () => console.log("Database connected"));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
