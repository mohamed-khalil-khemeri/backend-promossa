const User_model = require("../model/users_model");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

// const jwt = require("jsonwebtoken");
// const config = require("config");




module.exports = {

    get_all: async (req, res, next) => {
        User_model
            .find()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

    },

    get_one_by_id: async (req, res, next) => {
        User_model
            .findById({
                _id: req.params.id
            })
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

    },

    post_one: async (req, res, next) => {

        const hashed_password = await bcrypt.hash(req.body.password, 10);
        new User_model({
            name: req.body.name,
            email: req.body.email,
            emailVerified: false,
            password: hashed_password,
            phone: req.body.phone,
            birthday: req.body.birthday,
            adress: req.body.adress,
            genre: req.body.genre,
            role: req.body.role
        })
            .save(function (err, result) {


                if (err) res.send(err);
                else {
                    console.log(result);
                    // node mailer 
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        secure: false,//true
                        port: 25,//465
                        auth: {
                            user: 'koumakou007@gmail.com',
                            pass: 'koumakoukoumakou'
                        }
                    });

                    var mailOptions = {
                        from: 'Promossa<promossa@gmail.com>',
                        to: req.body.email,
                        subject: 'Confirm your Email',
                        html: `
                        <h1>Dear ${req.body.name}</h1>
                        <p>You have successfully registered with Promossa.com</p>
                        <p>to confirm your email address:</p>
                        <p>Please, press the link below or copy the following link in the address bar of your browser </p>
                        <a href =${"http://localhost:3000/confirmEmail/" + result._id} target="_blank">${"http://localhost:3000/confirmEmail/" + result._id} </a>
                        `
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    // end nodemailer
                    res.send({ "code": 200, "message": "Record inserted successfully" });
                }

            })
            .then(x => { console.log("res : ", x); res.send({ "code": 200, "message": "Record inserted successfully" }); })
            .catch(r => res.send(r.message))



    },

    log_one: async (req, res, next) => {

        let logger = await User_model.findOne({ email: req.body.email });
        if (!logger) return res.status(400).send("Email not found");

        if (logger.emailVerified == false) { return res.status(400).send("Email not verified after registration, go to your inbox to verify"); }

        const pass = await bcrypt.compare(req.body.password, logger.password);
        if (!pass) return res.status(400).send("Password did not match");

        const token = logger.token_gen()

        res.header("x-auth-token", token).send("marhba bik ! ")
        // res.header("x-auth-token", token).send(logger)

        // res.send("logger penetrated successfully, token :", token)

    },

    put_one_by_id: async (req, res, next) => {
        User_model.update(
            {
                _id: req.params.id
            },
            {
                $set:
                {
                    userName: req.body.userName,
                    userMail: req.body.userMail,
                    passWord: req.body.passWord,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userPhone: req.body.userPhone,
                    userPost: req.body.userPost
                }
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    },

    confirmEmail_by_id: async (req, res, next) => {
        User_model.update(
            {
                _id: req.params.id
            },
            {
                $set:
                {
                    emailVerified: true
                }
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    },

    delete_one_by_id: async (req, res, next) => {
        User_model.findOneAndRemove(
            {
                _id: req.params.id
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    },
    mail_carted: async (req, res, next) => {

        // console.log("req : ",req.body);
        // node mailer 
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,//true
            port: 25,//465
            auth: {
                user: 'koumakou007@gmail.com',
                pass: 'koumakoukoumakou'
            }
        });

        var mailOptions = {
            from: 'Promossa<promossa@gmail.com>',
            to: req.body.userInfo.email,
            subject: 'votre liste est prête',
            html:
                `
            <h1>Dear ${req.body.userInfo.name}</h1>
            <p>marhba bik fi Promossa.com</p>
            <p>Ci contre est votre liste :</p>
            ${req.body.magasins.map((x) =>
                    `<h4  style="width: fit-content;background-color: gold;border : 1px solid">Magasin : ${x}</h4>
                                <table style="border : 1px solid">
                                <tr>
                                    <th  style="border : 1px solid">Nom</th>
                                    <th  style="border : 1px solid">Fin Promo</th>
                                    <th style="border : 1px solid">Prix unitaire</th>
                                </tr>${req.body.carted.map((e) =>
                        e.magasin.name == x ? (
                            `<tr key=${e._id}>
                                            <td  style="border : 1px solid">${e.article.name}</td>
                                            <td  style="border : 1px solid">${e.period.fin}</td>
                                            <td  style="border : 1px solid">
                                                ${e.pricing.newprice.replace(/(\d)(?=(\d{3})+$)/g,"$1 ")}
                                            </td>
                               </tr>`
                        ) : null)}</table >`)}<p> a bientot</p >`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // end nodemailer

    },
    passReset1: async (req, res, next) => {


        let logger = await User_model.findOne({ email: req.params.email });
        if (!logger) return res.status(400).send("Email not found");

        if (logger.emailVerified == false) {
            const Email_will_be_verified =  async (req, res, next) => {
                User_model.update(
                    {
                        _id: logger._id
                    },
                    {
                        $set:
                        {
                            emailVerified: true
                        }
                    })
                    .exec()
                    // .then(x => res.send(x))
                    // .catch(r => res.send(r.message))
        
        
            };
            Email_will_be_verified();
         }


        const token = logger.token_gen()

       


        // node mailer 
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,//true
            port: 25,//465
            auth: {
                user: 'koumakou007@gmail.com',
                pass: 'koumakoukoumakou'
            }
        });

        var mailOptions = {
            from: 'Promossa<promossa@gmail.com>',
            to: req.params.email,
            subject: 'recover your password',
            html:
                `
            <h1>Dear ${logger.email}</h1>
            <p>marhba bik fi Promossa.com</p>
            <p>cliquer sur ce lien pour changer votre mot de passe :</p>
            <a href =${"http://localhost:3000/passreset2/" + token + "/" + logger._id} target="_blank">${"http://localhost:3000/passreset2/" + token + "/" + logger._id} </a>
            
               
            <p> a bientot</p >
    `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // end nodemailer



    },

    passReset2: async (req, res, next) => {
        console.log("111");
        const hashed_password2 = await bcrypt.hash(req.body.password, 10);
        console.log("222");

        User_model.update(
            {
                _id: req.params._id
            },
            {
                $set:
                {
                    password: hashed_password2
                }
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

            console.log("new hashed password : ",hashed_password2);
    }
}