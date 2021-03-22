const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    score_date: {
        type: Date,
        required: true
    }
})

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;