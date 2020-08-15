const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");


// mongoose.connect("mongodb+srv://FirstClusterUser:1234567887654321@firstcluster.s6ozl.mongodb.net/lital?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("connected to mongo atlas db ..."))
//     .catch(err => console.error("unable to connect to mongo db ", err));

const usersSchema = new mongoose.Schema({
    userName: String,
    userMail: String,
    passWord: String,
    firstName: String,
    lastName: String,
    userPhone: String,
    userPost: String,
})
usersSchema.methods.token_gen = function () {

    const token = jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName,
            userName : this.userName,
            userPost: this.userPost
        },
        config.get("mysecretjwtkey"));
        return token;
        
}
//Devbooks --> collection : table
module.exports = mongoose.model("users", usersSchema);