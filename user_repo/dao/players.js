var User = require('../model/user');

module.exports.getFriends = function (username, cb) {
    User.findOne({ username: username }).populate('friends', 'rank username').exec(function(err, doc) {
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

module.exports.deleteFriend = function (username, friendName, cb) {
    User.findOne({ username : friendName }, '_id', function(err, friend) {
        if (!err) {
            User.update({ username: username }, { $pullAll : { friends : [friend.id] } }, function(err, raw) {
                return cb(err, raw);
            });
        }
        return (err, null);
    });
};

module.exports.getRank = function(username, cb) {
    User.findOne({ username : username }, 'rank', function(err, player) {
        return cb(err, player.rank);
    });
};

module.exports.rankPlayer = function (username, rank, cb) {
    User.findOne({ username : username }, function(err, player) {
        player.rank = rank;
        player.save(function(err) {
            return cb(err);
        });
    });
};
