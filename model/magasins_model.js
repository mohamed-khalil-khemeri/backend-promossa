const mongoose = require("mongoose");


// mongoose.connect("mongodb+srv://FirstClusterUser:1234567887654321@firstcluster.s6ozl.mongodb.net/lital?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("connected to mongo atlas db ..."))
//     .catch(err => console.error("unable to connect to mongo db ", err));

const magasinsSchema = new mongoose.Schema({
    name: String,
    logo: String
})

//Devbooks --> collection : table
module.exports = mongoose.model("magasins", magasinsSchema);