const models = require('../models')
const { User, Kudos } = models;

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
            Kudos.find({}).populate('to').populate('from')
                .then(data => res.json(data))
                .catch(err => res.json(err))
        })
        .post((req, res) => {
            Kudos.create(req.body)
                .then(kudos => (
                    User.findByIdAndUpdate(kudos.from, { $inc: { kudosSent: 1 } })
                        .then(() => User.findByIdAndUpdate(kudos.to, { $inc: { kudosReceived: 1 } }))
                        .then(() => Kudos.findById(kudos._id)
                            .populate('to').populate('from')
                        )
                ))
                .then(kudos => res.json(kudos))
                .catch(err => res.json(err));
        })
}