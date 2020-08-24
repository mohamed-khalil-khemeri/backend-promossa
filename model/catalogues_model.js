const mongoose = require("mongoose");




const cataloguesSchema = new mongoose.Schema({
    name: String,
    magasin: { name: String, logo: String, _id: String },
    period: { start: Date, end: Date },
    promoList: [{
        article: {
            name: String,
            dosage: String,
            parent_id: String,
            logo: String,
            quantity: String,
            _id: String
        },
        promo: {
            typexxx: String,
            pourcentage: String
        },
        pricing: {
            ancientprice: String,
            newprice: String
        }
    }],
    logo: String
}, { strict: false })


module.exports = mongoose.model("catalogues", cataloguesSchema);