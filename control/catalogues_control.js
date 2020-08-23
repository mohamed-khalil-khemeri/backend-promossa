const Catalogues_model = require("../model/catalogues_model");


module.exports = {

    get_all: async (req, res, next) => {
        Catalogues_model
            .find()
            .sort({ _id: -1 })
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

    },

    get_one_by_id: async (req, res, next) => {
        Catalogues_model
            .findById({
                _id: req.params.id
            })
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

    },
    
    post_one: async (req, res, next) => {

        new Catalogues_model({
            name: req.body.name,
            magasin: req.body.magasin,
            period: req.body.period,
            promoList: req.body.promoList
        })
            .save()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))



    },

    post_promolist: async (req, res, next) => {
        console.log("promoList : ",req.body);
        console.log("_id : ", req.params.id);
        Catalogues_model.update(
            {
                _id: req.params.id
            },
            {
                $push:
                {
                    promoList: req.body,
                }
            })
            .exec()
            .then(x => {console.log("res : ,",x);res.send(x)})
            .catch(r => {console.log("err : ,",r.message);res.send(r.message)})


    },


    put_one_by_id: async (req, res, next) => {
        Catalogues_model.update(
            {
                _id: req.params.id
            },
            {
                $set:
                {
                    annee: req.body.annee,
                    saison: req.body.saison,
                    createur: req.body.createur,
                    gamme: req.body.gamme,
                    sex: req.body.sex,
                    modele: req.body.modele,
                    name: req.body.name,
                    mesure: req.body.mesure,
                    qte: req.body.qte,
                    photo: req.file.path,
                    commentaire: req.body.commentaire
                }
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    },

    delete_one_by_id: async (req, res, next) => {
        Catalogues_model.findOneAndRemove(
            {
                _id: req.params.id
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    }
}