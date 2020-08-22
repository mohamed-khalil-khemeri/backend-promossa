const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");


// mongoose.connect("mongodb+srv://FirstClusterUser:1234567887654321@firstcluster.s6ozl.mongodb.net/lital?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("connected to mongo atlas db ..."))
//     .catch(err => console.error("unable to connect to mongo db ", err));

const usersSchema = new mongoose.Schema({
    name: String,
    email: {type : String, unique: true},
    emailVerified : Boolean,
    password: String,
    phone: String,
    birthday: String,
    adress: { street: String, gov: String, deleg: String },
    genre: String,
    role: String,
})
usersSchema.methods.token_gen = function () {

    const token = jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email : this.email,
            role : this.role
        },
        config.get("mysecretjwtkey"));
        return token;
        
}
//Devbooks --> collection : table
module.exports = mongoose.model("users", usersSchema);