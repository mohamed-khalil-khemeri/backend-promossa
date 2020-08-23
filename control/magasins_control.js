const Magasins_model = require("../model/magasins_model");


module.exports = {

    get_all: async (req, res, next) => {
        Magasins_model
            .find()
            .sort({ _id: -1 })
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

    },

    get_one_by_id: async (req, res, next) => {
        Magasins_model
            .findById({
                _id: req.params.id
            })
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

    },

    post_one: async (req, res, next) => {

        new Magasins_model({
            name: req.body.name,
            logo: req.file.path,
        })
            .save()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))



    },

    put_one_by_id: async (req, res, next) => {
        Magasins_model.update(
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
        Magasins_model.findOneAndRemove(
            {
                _id: req.params.id
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    }
}