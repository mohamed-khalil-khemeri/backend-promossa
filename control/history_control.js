const History_model = require("../model/history_model");


module.exports = {

    get_all: async (req, res, next) => {
        History_model
            .find()
            .sort({ date: -1 })
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

    },

    get_one_by_id: async (req, res, next) => {
        History_model
            .findById({
                _id: req.params.id
            })
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

    },

    post_one: async (req, res, next) => {
        new History_model({

            date: req.body.date,
            operation: req.body.operation,
            name: req.body.name,
            modele: req.body.modele,
            username: req.body.username
        })
            .save()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))



    },

    put_one_by_id: async (req, res, next) => {
        History_model.update(
            {
                _id: req.params.id
            },
            {
                $set:
                {
                    date: req.body.date,
                    operation: req.body.operation,
                    name: req.body.name,
                    modele: req.body.modele,
                    username: req.body.username
                }
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    },

    delete_one_by_id: async (req, res, next) => {
        History_model.findOneAndRemove(
            {
                _id: req.params.id
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    }
}