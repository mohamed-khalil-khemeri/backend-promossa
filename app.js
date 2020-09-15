
//dot env 
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const config = require("config");


const cors = require('cors');


//middlewares
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers","x-auth-token", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

if (!config.get("mysecretjwtkey")) {
    console.error("jwt secret key not defined !");
    process.exit(1);
};
//app.use(cors());
app.use(cors({
    exposedHeaders: ['x-auth-token'],
}));
app.use([bodyParser.urlencoded({ extended: true }), bodyParser.json()]);

app.use("/public_img", express.static("public_img"))

//mongo atlas connection
mongoose.connect("mongodb+srv://FirstClusterUser:1234567887654321@firstcluster.s6ozl.mongodb.net/promossa?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("connected to mongo atlas db ..."))
    .catch(err => console.error("unable to connect to mongo db ", err));

//routes and their middlewares
const users_route = require("./route/users_route");
app.use("/users", users_route);

const products_route = require("./route/products_route");
//app.use("/products", products_route);






// upload feature
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public_img')
    },
    filename: function (req, file, cb) {
        let a = file.originalname.split(".")[0] + "_" + Date.now();
        let b = file.originalname.split(".")[1];
        let c = a + "." + b;
        cb(null, c  /*file.originalname*/)
    }
})
function fileFilter(req, file, cb) {

    var filetypes = /jpeg|jpg|png|webp/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);

}

let upload = multer({ storage: storage, fileFilter: fileFilter })
app.use("/*", upload.single("logo"))
app.use("/products", products_route);
// end upload feature

//routes and their middlewares : magasins
const magasins_route = require("./route/magasins_route");
app.use("/magasins", magasins_route);

//routes and their middlewares : categories
const categories_route = require("./route/categories_route");
app.use("/categories", categories_route);

//routes and their middlewares : categories
const articles_route = require("./route/articles_route");
app.use("/articles", articles_route);

//routes and their middlewares : categories
const catalogues_route = require("./route/catalogues_route");
app.use("/catalogues", catalogues_route);

app.listen(3002);
// module.exports = app;



