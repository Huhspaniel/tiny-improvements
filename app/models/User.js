const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    kudosSent: [{
        type: Schema.Types.ObjectId,
        ref: 'Kudos'
    }],
    kudosReceived: [{
        type: Schema.Types.ObjectId,
        ref: 'Kudos'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;