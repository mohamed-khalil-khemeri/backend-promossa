const mongoose = require("mongoose");




const categoriesSchema = new mongoose.Schema({
    name: String,
    dosage: String,
    parent_id : String,
    logo: String
})


module.exports = mongoose.model("categories", categoriesSchema);