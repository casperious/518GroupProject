const {createUser, getUser} = require('./api/userAPIs.js')
const {createCompany, getCompany} = require('./api/companyAPIs.js')

const express = require('express');
const cors = require('cors');
const app = express();

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