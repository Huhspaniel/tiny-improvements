const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kudosSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        requried: true
    }
});

const Kudos = mongoose.model('Kudo', kudosSchema);

module.exports = Kudos;