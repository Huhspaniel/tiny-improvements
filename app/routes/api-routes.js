const models = require('../models')
const { User, Kudo } = models;

module.exports = function (app) {
    app.route('/api/users')
        .get((req, res) => {
            User.find({})
                .then(data => res.json(data))
                .catch(err => res.json(err));
        })
        .post((req, res) => {
            User.create(req.body)
                .then(data => res.json(data))
                .catch(err => res.json(err));
        });
    app.route('/api/users/:id')
        .get((req, res) => {
            User.findById(req.params.id)
                .then(user => res.json(user))
                .catch(err => res.json(err));
        })
        .put((req, res) => {
            User.findByIdAndUpdate(req.params.id, req.body, { new: true })
                .then(user => res.json(user))
                .catch(err => res.json(err));
        })
        .delete((req, res) => {
            User.findByIdAndDelete(req.params.id)
                .then(data => res.json(data))
                .catch(err => res.json(err));
        });
    app.route('/api/kudos')
        .get((req, res) => {
            Kudo.find({}).populate('to').populate('from')
                .then(data => res.json(data))
                .catch(err => res.json(err))
        })
        .post((req, res) => {
            Kudo.create(req.body)
                .then(Kudo => (
                    User.findByIdAndUpdate(Kudo.from, { $inc: { KudoSent: 1 } })
                        .then(() => User.findByIdAndUpdate(Kudo.to, { $inc: { KudoReceived: 1 } }))
                        .then(() => Kudo.findById(Kudo._id)
                            .populate('to').populate('from')
                        )
                ))
                .then(Kudo => res.json(Kudo))
                .catch(err => res.json(err));
        })
}