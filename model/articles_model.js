const mongoose = require("mongoose");




const articlesSchema = new mongoose.Schema({
    name: String,
    dosage: String,
    parent_id : String,
    logo: String,
    quantity : String
})


module.exports = mongoose.model("articles", articlesSchema);