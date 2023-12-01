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
const Company = require('./Schema/CompanySignup.js');
const Contract = require('./Schema/ContractSchema.jsx');
const ContractRequest = require('./Schema/ContractRequest.js');
const Mayor = require('./Schema/MayorSchema.jsx');
const Alert = require('./Schema/Alerts.js')





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
        await Law.findOne({ _id: law_id }).then(async (law) => {
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
    catch (err) {
        console.log(err)
    }
}

// Add Api calls here

app.patch("/companyUnassignContract", async (req, res) => {
    console.log("companyUnassignContract: ")
    console.log(`companyUnassignContract: contract_id ${req.body.contract_id}`)
    console.log(`companyUnassignContract: company_id ${req.body.company_id}`)
    const query = {
        _id: req.body.contract_id,
    }
    const updateDoc = {
        $set: {
            companyID: null,
            status: "Pending",
        }
    }
    try {
        await Contract.updateOne(query, updateDoc).then(async (result) => {
            console.log(result)
            await ContractRequest.deleteOne({ companyId: req.body.company_id, contractId: req.body.contract_id }).then(async (result2) => {
                console.log(result)
                res.status(200).send(result2)
            })
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.delete("/deleteContractRequest", async (req, res) => {
    console.log("deleteContractRequest: ")
    console.log(`deleteContractRequest: company_id ${req.query.company_id}`)
    console.log(`deleteContractRequest: contract_id ${req.query.contract_id}`)
    try {
        await ContractRequest.deleteOne({ companyId: req.query.company_id, contractId: req.query.contract_id }).then(async (result) => {
            console.log(result)
            res.status(200).send(result)
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.patch("/sponsorCandidate", async (req, res) => {
    console.log("sponsorCandidate: ")
    console.log(`sponsorCandidate: company_id ${req.body.company_id}`)
    console.log(`sponsorCandidate: candidate_id ${req.body.candidate_id}`)

    try {
        // Get the candidate
        await Candidate.findOne({ _id: req.body.candidate_id }).then(async (candidate) => {
            var sponsors = candidate.sponsors
            var canSponsor = true
            for (const sponsorID of sponsors) {
                if (sponsorID == req.body.company_id) {
                    canSponsor = false;
                    break;
                }
            }
            if (canSponsor) {
                const query = {
                    _id: req.body.candidate_id,
                }
                sponsors.push(req.body.company_id)
                const updateDoc = {
                    $set: {
                        sponsors: sponsors,
                    }
                }
                await Candidate.updateOne(query, updateDoc).then(async (result) => {
                    console.log(result)
                    res.status(200).send(result)
                })
            }
            else {
                res.status(210).send("Company already sponsored this candidate!")
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})


app.get("/getDepartmentByUserID", async (req, res) => {
    console.log("getDepartmentByUserID:")
    console.log(`getDepartmentByUserID: user_id: ${req.query.user_id}`)
    try {
        //Get the city official
        await Cityofficials.findOne({ userId: req.query.user_id }).then(async (official) => {
            console.log(official)
            if (official !== null) {
                //Get their department
                await Department.findOne({ cityOfficialID: official._id }).then(async (dept) => {
                    if (dept != null) {
                        res.status(200).send(dept)
                    }
                    else {
                        res.status(500).send("City Official is not assigned a Department")
                    }
                })
            }
            else {
                res.status(500).send("User is not a city official")
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get("/getComplaints", async (req, res) => {
    console.log("getComplaints:")
    console.log(`getComplaints: user_id: ${req.query.user_id}`)
    try {
        //Get the city official
        await Cityofficials.findOne({ userId: req.query.user_id }).then(async (official) => {
            console.log(official)
            //Get their department
            await Department.findOne({ cityOfficialID: official._id }).then(async (dept) => {
                await Complaint.find({ departmentId: dept._id }).then(async (complaints) => {
                    var responses = []
                    for (const response of complaints) {
                        await User.findOne({ _id: response.userId }, { firstName: 1, lastName: 1 }).then(async (citizen) => {
                            responses.push({
                                _id: response._id,
                                user: `${citizen.firstName} ${citizen.lastName}`,
                                complaint: response.complaint,
                            })
                        })
                    }
                    res.status(200).send(responses)
                })
            })
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get("/getFeedback", async (req, res) => {
    console.log("getFeedback:")
    console.log(`getFeedback: user_id: ${req.query.user_id}`)
    try {
        //Get the city official
        await Cityofficials.findOne({ userId: req.query.user_id }).then(async (official) => {
            console.log(official)
            //Get their department
            await Department.findOne({ cityOfficialID: official._id }).then(async (dept) => {
                await Feedback.find({ departmentId: dept._id }).then(async (feedback) => {
                    var responses = []
                    for (const response of feedback) {
                        await User.findOne({ _id: response.userId }, { firstName: 1, lastName: 1 }).then(async (citizen) => {
                            responses.push({
                                _id: response._id,
                                user: `${citizen.firstName} ${citizen.lastName}`,
                                feedback: response.feedback,
                            })
                        })
                    }
                    res.status(200).send(responses)
                })
            })
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.post("/promoteMayor", async (req, res) => {
    console.log("promoteMayor:")
    try {
        //Check if the current MayorVote has expired
        await MayorVotes.find().then(async (mayorVote) => {
            // mayor vote is an array of 1
            const today = new Date()
            //The vote has expired
            if (today > mayorVote[0].endDate) {
                // People actually registered as candidates
                if (mayorVote[0].candidateID.length > 0) {
                    //Determine the winner in Mayor vote
                    var newMayorCandidateID = ''
                    var highestVote = -1
                    for (const candidateVote of mayorVote[0].yesCount) {
                        if (candidateVote.votes > highestVote) {
                            newMayorCandidateID = candidateVote.candidateId
                            highestVote = candidateVote.votes
                        }
                    }
                    //Delete the Mayor Vote
                    await MayorVotes.deleteMany().then(async (result) => {
                        // Get the candidate object that won
                        await Candidate.findOne({ _id: newMayorCandidateID }).then(async (candidate) => {
                            //Get the information we need for mayor
                            const newMayorSponsors = candidate.sponsors
                            const newMayorUserID = candidate.userID
                            const newMayorBudget = 10000000
                            const newMayorEndDate = moment(today).add(1, 'year').toDate()
                            //Get the current Mayor's userID so we can update their privledges
                            await Mayor.find().then(async (mayors) => {
                                var currentMayor = {}
                                var lastDate = ''
                                for (const mayor of mayors) {
                                    if (lastDate === '') {
                                        lastDate = mayor.endDate
                                        currentMayor = mayor
                                    }
                                    if (mayor.endDate > lastDate) {
                                        lastDate = mayor.endDate
                                        currentMayor = mayor
                                    }
                                }
                                const previousMayorUserID = currentMayor.userId
                                //Create the new mayor
                                const newMayor = new Mayor({
                                    dateAppointed: today,
                                    endDate: newMayorEndDate,
                                    budget: newMayorBudget,
                                    userId: newMayorUserID,
                                    sponsors: newMayorSponsors,
                                })
                                await newMayor.save()
                                //Delete the candidates
                                await Candidate.deleteMany().then(async (deleted) => {
                                    //Create a blank mayor vote
                                    const newMayorVote = new MayorVotes({
                                        userID: [],
                                        candidateID: [],
                                        yesCount: [],
                                        startDate: today,
                                        endDate: newMayorEndDate,
                                    })

                                    await newMayorVote.save()

                                    //Update User privledges for both currentMayor and previousMayor
                                    const previousMayorQuery = {
                                        _id: previousMayorUserID,
                                    }
                                    const previousMayorUpdateDoc = {
                                        $set: {
                                            isCityOfficial: "No",
                                            isMayor: "No",
                                            isEmployee: "No",
                                        }
                                    }
                                    const newMayorQuery = {
                                        _id: newMayorUserID,
                                    }
                                    const newMayorUpdateDoc = {
                                        $set: {
                                            isCityOfficial: "No",
                                            isMayor: "Yes",
                                            isEmployee: "No",
                                        }
                                    }
                                    await User.updateOne(previousMayorQuery, previousMayorUpdateDoc).then(async (updateLog) => {
                                        console.log(updateLog)
                                        await User.updateOne(newMayorQuery, newMayorUpdateDoc).then(async (updateLog2) => {
                                            console.log(updateLog2)
                                            res.status(200).send("New Mayor Has Been Elected!")
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
                else {
                    //Nobody elected to run for mayor so just reelect the same mayor
                    //Update the end Date of the MayorVote
                    const newMayorEndDate = moment(today).add(60, 'm').toDate()
                    //Build the mayor vote query
                    const mayorVoteQuery = {
                        _id: mayorVote[0]._id,
                    }
                    const mayorVoteUpdateDoc = {
                        $set: {
                            endDate: newMayorEndDate,
                        }
                    }

                    await MayorVotes.updateOne(mayorVoteQuery, mayorVoteUpdateDoc).then(async (update) => {
                        console.log(update);
                        //Get the current Mayor's userID so we can update their privledges
                        await Mayor.find().then(async (mayors) => {
                            var currentMayor = {}
                            var lastDate = ''
                            for (const mayor of mayors) {
                                if (lastDate === '') {
                                    lastDate = mayor.endDate
                                    currentMayor = mayor
                                }
                                if (mayor.endDate > lastDate) {
                                    lastDate = mayor.endDate
                                    currentMayor = mayor
                                }
                            }
                            //Build the mayor query
                            const mayorQuery = {
                                _id: currentMayor._id,
                            }
                            const mayorUpdateDoc = {
                                $set: {
                                    endDate: newMayorEndDate,
                                }
                            }

                            await Mayor.updateOne(mayorQuery, mayorUpdateDoc).then(async (mayorUpdate) => {
                                await Candidate.deleteMany().then(async (test) => {
                                    console.log(mayorUpdate)
                                    res.status(200).send("Original Mayor Reelected for another term")
                                })
                            })
                        })
                    })

                }
            }
            else {
                res.status(200).send("Mayor's term has not expired yet")
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
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
        $set: {
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
        $set: {
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
                            //Adding mayor details to the lawlist
                            await Mayor.findOne({ _id: law.passedBy }).then(async (mayor) => {
                                await User.findOne({ _id: mayor.userId }).then(async (user) => {
                                    console.log(user)
                                    //Add the law and its associated Voting History to lawList
                                    lawList.push({
                                        _id: law._id,
                                        passedBy: `${user.firstName} ${user.lastName}`,
                                        title: law.title,
                                        description: law.description,
                                        state: law.state,
                                        department: dept[0],
                                        vote_history: voteHistory[0],
                                    })

                                })
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
            var pollClose = moment(currentDate).add(1, "day").toDate()
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
            for (const law of laws) {
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

app.get('/getLawsForMayor', async (req, res) => {
    try {
        let newDate = new Date();
        const currentMayor = [];
        //console.log(newDate);
        const mayors = await Mayor.find();
        //console.log(mayors);
        for (const mayor of mayors) {
            if (newDate < mayor.endDate && newDate > mayor.dateAppointed) {
                //console.log("within range");
                currentMayor.push(mayor);

                break;
            }
        }
        const laws = await Law.find({ passedBy: currentMayor[0]._id });
        res.send(laws);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get('/getMayorSponsors', async (req, res) => {
    try {
        let newDate = new Date();
        const currentMayor = [];
        //console.log(newDate);
        const mayors = await Mayor.find();
        const sponsors = [];
        //console.log(mayors);
        for (const mayor of mayors) {
            if (newDate < mayor.endDate && newDate > mayor.dateAppointed) {
                //console.log("within range");
                currentMayor.push(mayor);
                for (const sponsor of mayor.sponsors) {
                    //console.log("sponsor is ", sponsor);
                    const company = await Company.find({ _id: sponsor });
                    sponsors.push(company[0]);
                }
                break;
            }
        }
        //console.log(sponsors);
        res.send(sponsors);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get('/getMayorDetails', async (req, res) => {
    try {
        let newDate = new Date();
        const currentMayor = [];
        //console.log(newDate);
        const mayors = await Mayor.find();
        //console.log(mayors);
        for (const mayor of mayors) {
            if (newDate <= mayor.endDate && newDate >= mayor.dateAppointed) {
                //console.log("within range");
                currentMayor.push(mayor);
                break;
            }
        }
        const userDetails = await User.find({ _id: currentMayor[0].userId });
        //console.log(userDetails)
        const obj = new Object({
            user_id: userDetails[0]._id,
            mayor_id: currentMayor[0]._id,
            dateAppointed: currentMayor[0].dateAppointed,
            endDate: currentMayor[0].endDate,
            budget: currentMayor[0].budget,
            sponsors: currentMayor[0].sponsors,
            firstName: userDetails[0].firstName,
            lastName: userDetails[0].lastName,
            email: userDetails[0].emailId
        })
        //console.log(obj);
        res.send(obj);
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error);
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
            var sponsors = []
            for (const companyID of candidate.sponsors) {
                await Company.findOne({ _id: companyID }).then((company) => {
                    sponsors.push(company)
                })
            }
            const candDetails = new Object({
                _id: candidate._id,
                policies: candidate.policies,
                sponsors: sponsors,
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
        try {
            const filter = { _id: req.body.user_id };
            const updateDoc = {
                $set: { isCityOfficial: "No", isMayor: "No", isEmployee: "Yes" }
            };
            const options = { upsert: true };
            await User.updateOne(filter, updateDoc, options);
        }
        catch (error) {
            console.log("Error in updating userid");
        }
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

app.post('/createCompany', async (req, res) => {
    const company = new Company(req.body);
    console.log(company)
    try {
        await company.save();
        console.log("company signed up")
        res.send(company);
    }
    catch (error) {
        res.status(500).send(error);
    }
}
)

app.post("/logincompany", async (req, res) => {
    //console.log(" username and password to look for are ", req.query.username, req.query.password);
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    try {
        const user = await Company.findOne({ email, password });
        console.log(user);
        if (user)
            res.send(user);
        else
            res.status(500).send(error);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.post("/createContract", async (req, res) => {
    const contract = new Contract(req.body)
    console.log(contract)
    try {
        await contract.save();
        console.log("company signed up")
        res.send(contract);
    }
    catch (error) {
        res.status(500).send(error);
    }

}
)
app.put('/updateDepartmentBudget/:departmentId', async (req, res) => {
    const departmentId = req.params.departmentId;
    const { budget } = req.body;

    try {
        // Find the department by ID and update the budget
        const updatedDepartment = await Department.findByIdAndUpdate(departmentId, { budget }, { new: true });

        // Respond with the updated department
        console.log(updatedDepartment);
        res.send(updatedDepartment)

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/getContracts", async (req, res) => {
    try {

        const departmentID = req.query.departmentID;
        const contracts = await Contract.find({ departmentID: departmentID });
        console.log(contracts)
        res.send(contracts);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get("/getContractRequests", async (req, res) => {
    try {
        const reqs = await ContractRequest.find()

        res.send(reqs)

    }
    catch (error) {
        res.status(500).send(error);
    }
})
app.get("/getContractsAll", async (req, res) => {
    try {


        const contracts = await Contract.find();
        //console.log(contracts)
        res.send(contracts);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post("/contractRequest", async (req, res) => {
    const contractreq = new ContractRequest(req.body)
    console.log(contractreq)
    try {
        await contractreq.save();

        res.send(contractreq);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get("/getcompanies", async (req, res) => {
    try {
        const companies = await Company.find();
        res.send(companies);
    }
    catch (error) {
        res.status(500).send(error);
    }
}
)

app.patch('/assignCompany/:contract_id', async (req, res) => {
    console.log("in assign company route");
    const contractId = req.params.contract_id; // Correct parameter name
    const { companyID, status } = req.body; // Destructure the correct fields
    console.log("contractId:", contractId);
    console.log("company_id:", companyID);
    console.log("status:", status);
    try {
        const updatedcontract = await Contract.findByIdAndUpdate(
            contractId,
            { companyID, status }, // Use the correct field names
            { new: true }
        );
        console.log(updatedcontract);
        if (!updatedcontract) {
            return res.status(404).json({ error: 'contract not found' });
        }

        res.json(updatedcontract);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/getdepIdbyCO/:userId', async (req, res) => {
    const user = req.params.userId
    console.log(user)

    try {
        const CO = await Cityofficials.find();
        const depId = CO.find((c) => String(c.userId) === user);

        if (depId) {
            console.log(CO, depId);
            res.send(depId); // Send the found depId
        } else {
            console.log("DepId not found");
            res.status(404).send("DepId not found");
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.post('/AddAnnouncement', async (req, res) => {
    console.log(req.body)
    const alert = new Alert(req.body)
    const { userId, departmentId, Announcement } = req.body;

    try {
        // Create a new Alert instance
        const newAlert = new Alert({
            userId: userId,
            departmentId: departmentId,
            Announcement: Announcement,
        });
        const savedAlert = await newAlert.save();

        res.send(savedAlert);
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get("/getAlerts", async (req, res) => {
    const alerts = await Alert.find()
    res.send(alerts)
})
const mongostring = "mongodb+srv://delegateAdmin:test12345@delegatecluster.rcuipff.mongodb.net/";
mongoose.connect(mongostring);
const database = mongoose.connection;


database.on('error', (error) => console.log(error));
database.once('connected', () => console.log("Database connected"));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
