//const {createUser, getUser} = require('./api/companyAPIs')
//const {createCompany, getCompany} = require('./api/companyAPIs.js')
const schedule = require('node-schedule');
const moment = require('moment')

const mongoose = require('mongoose');
const MayorSchema = require('./Schema/MayorSchema.jsx');
const Cityofficials = require('./Schema/CityofficialsSchema.jsx');
const User = require('./Schema/UserSchema');
const Law = require('./Schema/LawSchema.js');
const MayorVotes = require('./Schema/MayorVotesSchema.jsx');

const express = require("express");
const cors = require('cors');
const Candidate = require('./Schema/CandidateSchema.jsx');
const Department = require('./Schema/DepartmentSchema.js');

const Employee = require('./Schema/Employee.js')
const Feedback = require('./Schema/FeedbackSchema.jsx');
const Complaint = require('./Schema/ComplaintSchema.jsx');
const LawVotes = require('./Schema/LawVotesSchema.jsx');


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

// Add Automated Jobs / Scheduled Jobs here
const updateLawState = async (law_id) => {
    try {
        await Law.findOne({ _id: law_id}).then(async (law) => {
            //Get the vote history for that law
            await LawVotes.findOne({ lawID: law_id }).then(async (voting_history) => {
                var newState = ""
                // Determine the outcome of the vote
                if (voting_history.yesCount > voting_history.noCount) {
                    newState = "Active"
                }
                else {
                    newState = "Rejected"
                }

                //Build query to update law
                const query = {
                    _id: law_id,
                }
                //Build parameters for the updated law
                const updateDoc = {
                    $set: {
                        state: newState,
                    }
                }
                
                //Update Law
                await Law.updateOne(query, updateDoc).then(async (result) => {
                    console.log(result);
                })
            })
        })
    }
    catch (err){
        console.log(err)
    }
}

// Add Api calls here

app.patch("/updateLawStatusForLawId", async (req, res) => {
    console.log(`updateLawStatusForLawId: law_id: ${req.body.law_id}`)
    
})

app.patch("/addYesVoteForLawVoteId", async (req, res) => {
    console.log(`addYesVoteForLawVoteId: user_id: ${req.body.user_id}`)
    console.log(`addYesVoteForLawVoteId: law_vote: ${req.body.law_vote}`)

    //Build the law vote query
    const query = {
        _id: req.body.law_vote._id,
    }

    //Build the updated data
    const newCount = req.body.law_vote.yesCount + 1
    const newUserList = req.body.law_vote.userID
    newUserList.push(req.body.user_id)
    const updateDoc = {
        $set : {
            yesCount: newCount,
            userID: newUserList
        }
    }

    try {
        await LawVotes.updateOne(query, updateDoc).then(async (result) => {
            console.log(result);
            res.status(200).send(result);
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.patch("/addNoVoteForLawVoteId", async (req, res) => {
    console.log(`addYesVoteForLawVoteId: user_id: ${req.body.user_id}`)
    console.log(`addYesVoteForLawVoteId: law_vote: ${req.body.law_vote}`)

    //Build the law vote query
    const query = {
        _id: req.body.law_vote._id,
    }

    //Build the updated data
    const newCount = req.body.law_vote.noCount + 1
    const newUserList = req.body.law_vote.userID
    newUserList.push(req.body.user_id)
    const updateDoc = {
        $set : {
            noCount: newCount,
            userID: newUserList
        }
    }

    try {
        await LawVotes.updateOne(query, updateDoc).then(async (result) => {
            console.log(result);
            res.status(200).send(result);
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get("/getAllLawsAndVoteHistory", (req, res) => {
    console.log(`getAllLawsAndVoteHistory: ...`)
    var lawList = []
    try {
        Law.find().then(async (laws) => {
            for (const law of laws) {
                // Only get laws that passed or are currently being voted on
                if (law.state === "Pending" || law.state === "Active") {
                    // Get the Department name and ID for the law
                    await Department.find({ _id: law.departmentId }, { name: 1 }).then(async (dept) => {

                        //Get the vote for that law - Only return the _id, userID array, yesCount, and noCount for the vote record
                        await LawVotes.find({ lawID: law._id }, { userID: 1, yesCount: 1, noCount: 1 }).then(async (voteHistory) => {
                            //Add the law and its associated Voting History to lawList
                            lawList.push({
                                _id: law._id,
                                title: law.title,
                                description: law.description,
                                state: law.state,
                                department: dept[0],
                                vote_history: voteHistory[0],
                            })
                        })
                    })
                }
            }

            console.log(lawList);
            res.status(200).send(lawList)
        })
    }
    catch (error) {
        console.log("getLawsForDepartmentId: Error")
        res.status(500).send(err);
    }
})

app.post("/createLawVote", (req, res) => {
    console.log(`createLawVote: userID: ${req.body.userID}`)
    console.log(`createLawVote: lawID: ${req.body.lawID}`)

    try {
        // Create a vote history object for this law
        Law.find({ _id: req.body.lawID }).then(async (law) => {
            if (law.length !== 0) {
                //console.log("!!!!!!!!!!!!!!!!")
                //console.log(law)
                const voteHistory = new LawVotes({
                    userID: [],
                    lawID: law[0]._id,
                    yesCount: 0,
                    noCount: 0,
                })
                voteHistory.save()
                console.log(`Vote history created: ${voteHistory}`)
                lawFound = true;
                // Send the law back to the client
                res.status(200).send(voteHistory)
            }
            else {
                res.status(500).send("Law not found in Database!")
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.post("/createLaw", async (req, res) => {
    console.log(`createLaw: passedBy: ${req.body.passedBy}`)
    console.log(`createLaw: Law Description: ${req.body.description}`)
    console.log(`createLaw: Law Title: ${req.body.title}`)
    console.log(`createLaw: state: ${req.body.state}`)
    console.log(`createLaw: departmentId: ${req.body.departmentId}`)
    //Check if Law with same title and department already exists
    await Law.exists({ title: req.body.title, departmentId: req.body.departmentId }).then(async (result) => {
        if (Object.is(result, null)) {
            const law = new Law(req.body);
            await law.save()
            console.log(`Law created! ${law}`)
            // Schedule update for Law State
            var currentDate = moment()
            var pollClose = moment(currentDate).add(1, "m").toDate()
            console.log(pollClose);
            //Schedule Job
            console.log("createLaw: Schduling Update Law State")
            const job = schedule.scheduleJob(pollClose, () => {
                console.log("createLaw: Updating Law State")
                updateLawState(law._id)
            });
            // Send response
            res.status(200).send(law)
        }
        else {
            console.log("Law in this department already exists")
            res.status(500).send("Law already exists")
        }
    })
})

app.get("/getLawsForDepartmentId", (req, res) => {
    console.log(`getLawsForDepartmentId: DepartmentId: ${req.query.departmentId}`)
    try {
        var lawList = []
        Law.find({ departmentId: req.query.departmentId }).then(async (laws) => {
            console.log(laws)
            // Attach the law votes for convience
            for(const law of laws) {
                // Only get laws that passed or are currently being voted on
                if (law.state === "Pending" || law.state === "Active") {
                    //Get the vote for that law - Only return the _id, userID array, yesCount, and noCount for the vote record
                    await LawVotes.find({ lawID: law._id }, { userID: 1, yesCount: 1, noCount: 1 }).then(async (voteHistory) => {
                        //Add the law and its associated Voting History to lawList
                        lawList.push({
                            _id: law._id,
                            title: law.title,
                            description: law.description,
                            state: law.state,
                            department: req.query.departmentId,
                            vote_history: voteHistory[0],
                        })
                    })
                }
            }
            console.log(lawList)
            res.send(lawList)
        })
    }
    catch (error) {
        console.log("getLawsForDepartmentId: Error")
        res.status(500).send(err);
    }
})

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
        const resp = [];
        const candidates = await Candidate.find();
        for (const candidate of candidates) {
            const user = await User.findById(candidate.userID);
            const candDetails = new Object({
                _id: candidate._id,
                policies: candidate.policies,
                sponsors: candidate.sponsors,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
            })
            //console.log(candDetails);
            resp.push(candDetails);
        }
        res.send(resp);
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

app.get('/getDepartmentById', async (req, res) => {
    //console.log("Fetching department ", req.query.department_id);
    try {
        const dept = await Department.findById({ _id: req.query.department_id });
        res.send(dept);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/deleteDepartment', async (req, res) => {
    console.log("deleting ", req.body.department_id);
    try {
        const cityOfficialFilter = { departmentID: req.body.department_id };
        const update = {
            $set: { departmentID: null }
        }
        const opt = { upsert: false };
        await Cityofficials.updateOne(cityOfficialFilter, update, opt);
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
    //console.log("Getting city officials");
    try {
        const officials = await Cityofficials.find();
        const ret = [];
        for (const official of officials) {
            //console.log(official);
            const user = await User.findById({ _id: official.userId });
            //console.log("user is", user);
            const officialUser = new Object({
                userId: official.userId,
                dateAppointed: official.dateAppointed,
                endDat: official.endDate,
                departmentID: official.departmentID,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
            })
            ret.push(officialUser);
        }
        //console.log(ret);
        res.send(ret);
    }
    catch (error) {
        res.status(500).send(error);
    }
})
app.get('/getUnassignedCityOfficials', async (req, res) => {
    //console.log("Getting city officials");
    try {
        const officials = await Cityofficials.find();
        const ret = [];
        for (const official of officials) {
            console.log(official);
            if (official.departmentID == null) {
                const user = await User.findById({ _id: official.userId });
                //console.log("user is", user);
                const officialUser = new Object({
                    _id: official._id,
                    userId: official.userId,
                    dateAppointed: official.dateAppointed,
                    endDat: official.endDate,
                    departmentID: official.departmentID,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailId: user.emailId,
                })
                ret.push(officialUser);
            }
        }
        //console.log(ret);
        res.send(ret);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get('/getCityOfficialByUserId', async (req, res) => {
    //console.log(`getCityOfficialByUserId: req ${req}`)
    const userId = req.query.user_id;
    // console.log(`getCityOfficialByUserId: userId ${userId}`)
    try {
        const officials = await Cityofficials.find({ userId: userId });
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
            //console.log(cityOfficial);
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
        const existsDepartment = await Department.findOne({ _id: department._id });
        if (existsDepartment) {
            console.log("Department exists");
            const cityOfficialFilter = { departmentID: department._id };
            const update = {
                $set: { departmentID: null }
            }
            const opt = { upsert: false };
            await Cityofficials.updateOne(cityOfficialFilter, update, opt);

            const newCityOfficialFilter = { _id: department.cityOfficialID };
            const newUpdate = {
                $set: { departmentID: department._id }
            }
            const newOpt = { upsert: false };
            await Cityofficials.updateOne(newCityOfficialFilter, newUpdate, newOpt);


            const filter = { _id: existsDepartment._id };
            const updateDoc = {
                $set: { name: department.name, cityOfficialID: department.cityOfficialID, createdBy: department.createdBy, budget: department.budget, rules: department.rules, employees: department.employees }
            };
            const options = { upsert: true };
            const ret = await Department.updateOne(filter, updateDoc, options);

            res.send(ret);
        }
        else {
            console.log(req.body.cityOfficialID);
            await department.save(req.body);
            const cityOfficialFilter = { _id: department.cityOfficialID };
            const update = {
                $set: { departmentID: department._id }
            }
            const opt = { upsert: true };
            await Cityofficials.updateOne(cityOfficialFilter, update, opt);
            //console.log(department);
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
            //console.log(mayor);
            res.send(mayor);
        }
    }
    catch (error) {
        console.log("Details are ", req.body);
        console.log("Error is", error)
        res.status(500).send(error);
    }
})

app.get('/getMayorVotes', async (req, res) => {
    try {
        const votes = await MayorVotes.find();
        //
        if (votes.length == 0) {
            //console.log("Creating votes array");
            const yesCount = [];
            const candidateIds = [];
            const cands = await Candidate.find();
            for (const cand of cands) {
                const count = new Object({
                    candidateId: cand._id,
                    votes: 0,
                })
                candidateIds.push(cand._id);
                yesCount.push(count);
            }
            const retval = new Object({
                userID: [],
                candidateID: candidateIds,
                yesCount: yesCount,
            });
            // console.log("Sending ", retval);
            res.send(retval);
        }
        else {
            //console.log("Votes are ", votes);
            res.send(votes);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
})
app.post('/postMayorVotes', async (req, res) => {
    const votes = new MayorVotes(req.body);
    console.log("Posting ", votes.yesCount);
    try {
        const filter = {};
        const updateDoc = {
            $set: { userID: votes.userID, candidateID: votes.candidateID, yesCount: votes.yesCount, }
        };
        const options = { upsert: true };
        await MayorVotes.updateOne(filter, updateDoc, options);
    }
    catch (error) {
        console.log("Error in updating userid");
    }
    console.log(votes);
    res.send(votes);
})

app.post('/createEmployee', async (req, res) => {
    try {
        const emp = new Employee(req.body);
        console.log(emp);
        await emp.save();
        res.send(emp);
    } catch (error) {

        res.status(500).send(error.message);
    }
})

app.get('/getEmployee', async (req, res) => {
    const emp = await Employee.find()
    res.json(emp);
})

app.post('/postFeedback', async (req, res) => {
    const feedback = new Feedback(req.body);
    try {
        feedback.save();
        console.log(`Feedback Posted! ${feedback}`)
        res.send(feedback);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/postComplaint', async (req, res) => {
    const complaint = new Complaint(req.body);
    try {
        complaint.save();
        console.log(`Complaint Posted! ${complaint}`)
        res.send(complaint);
    }
    catch (error) {
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
