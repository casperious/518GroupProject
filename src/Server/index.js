const {createUser, getUser} = require('./api/userAPIs.js')
const {createCompany, getCompany} = require('./api/companyAPIs.js')

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

app.get("/", (req, res) => {
    res.status(200).send("API is live !");
  });

// Add Api calls here
app.post('/createUser', createUser);
app.post('/createCompany', createCompany);
app.get('./')

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
const mongostring = "mongodb+srv://delegateAdmin:test12345@delegatecluster.rcuipff.mongodb.net/";
mongoose.connect(mongostring);
const database = mongoose.connection;

const Mayor = MayorSchema;
database.on('error', (error) => console.log(error));

database.once('connected', () => console.log("Databse connected"));


app.get('/getUser', async (req, res) => {
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

app.get('/getUsers', async (req, res) => {
    console.log("fetching all users");
    try {
        const users = await User.find();
        console.log(users);
        res.send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/createUser', async (req, res) => {
    console.log("In post");
    try {
        const user = new User(req.body);
        await user.save(req.body);
        console.log(user);
        res.send(user);
    }
    catch (error) {
        console.log("Details are ", req.body);
        console.log("Error is", error)
        res.status(500).send(error);
    }
})

app.get('/getTeams', async (req, res) => {
    console.log("Fetching all teams");
    try {
        const teams = await TeamName.find();
        console.log(teams);
        res.send(teams);
    }
    catch (error) {
        res.status(500).send(error);
    }

})

app.get('/getProjects', async (req, res) => {
    console.log("Fetching all projects");
    try {
        const resp = [];
        const projects = await Project.find();
        for (const project of projects) {
            console.log("getting names for ", project.mgr_id);
            const manager = await User.findById(project.mgr_id);
            const prodOwner = await User.findById(project.prod_owner_id);
            const team = await TeamName.findById(project.team_id);
            //    const user
            const proj = new Object({
                proj_name: project.proj_name,
                proj_desc: project.proj_desc,
                prod_owner_id: prodOwner.firstName,
                mgr_id: manager.firstName,
                team_id: team.team_name,

            });
            console.log(proj);
            resp.push(proj);
        }
        //console.log(projects);
        //new proj =
        res.send(resp);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/createTeam', async (req, res) => {
    console.log("In post team");
    try {
        const team = new TeamName(req.body);
        await team.save(req.body);
        console.log(team);
        res.send(team);
    }
    catch (error) {
        console.log("Details are ", req.body);
        console.log("Error is ", error);
        res.status(500).send(error);
    }
})

app.post('/postProject', async (req, res) => {
    console.log("In post project");
    try {
        const project = new Project(req.body);
        await project.save(req.body);
        res.send(project);
    }
    catch (error) {
        res.status(500).send(error);
    }
})


app.listen(9000, () => {
    console.log(`Server started at ${9000}`);
})
