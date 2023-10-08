const mongoose = require("mongoose");
const mongoString = "mongodb+srv://delegateAdmin:test12345@delegatecluster.rcuipff.mongodb.net/";
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => console.log(error));

database.once('connected', () => console.log("Database Connected"));

module.exports = mongoose;