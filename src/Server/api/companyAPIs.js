//Uncomment After navya creates the schema
//const Companies = require("../schemas/CompaniesSchema")
const mongoose = require("../utils/mongoDB")

module.exports.createCompany = async (req, res) => {
    try {
        const company = new Companies(req.body)
        await company.save()
        res.send(company)
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}