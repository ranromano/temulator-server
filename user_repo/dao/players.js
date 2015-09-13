var User = require('../model/user');

module.exports.getFriends = function (username, cb) {
    User.findOne({ username: username }).populate('friends').exec(function(err, doc) {
       cb(err, doc.friends);
    });
};

module.exports.addToFriends = function (username, friend, cb) {
    User.findOne({ username: friend }, '_id', function(err, friend) {
        if (!err) {
            User.findOne({ username: username }, function (err, player) {
                if (!err) {
                    player.friends.push(friend.id);
                    player.save(function (err) {
                        return cb(err);
                    });
                }
            });
        }
        return cb(err);
    });
};

module.exports.rankPlayer = function (username, rank, cb) {
    User.findOne({username : username}, function(err, player) {
        player.rank = rank;
        player.save(function(err) {
            return cb(err);
        });
    });
};
