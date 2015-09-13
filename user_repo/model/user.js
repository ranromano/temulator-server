var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    rank: Number,
    friends: [ { type: Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', User);
