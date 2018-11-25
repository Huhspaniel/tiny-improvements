const models = require('../models')
const { User, Kudos } = models;

module.exports = function (app) {
    app.route('/api/users')
        .get((req, res) => {
            User.find({})
                .then(data => res.json(data))
                .catch(err => res.json(err));
        });
    app.route('/api/kudos')
        .get((req, res) => {
            Kudos.find({})
                .then(data => res.json(data))
                .catch(err => res.json(err))
        })
        .post((req, res) => {
            Kudos.create(req.body)
                .then(data => res.json(data))
                .catch(err => res.json(err));
        })
}