var express = require('express');
var players = require('../user_repo/dao/players');
var router = express.Router();

module.exports = function(passport) {

    /**
     * User Registration.
     */
    router.post('/signup', passport.authenticate('signup'), function(req, res) {
        res.send();
    });

    /**
     * Gets users friend list
     */
    router.get('/users/:username/friends', function(req, res) {
        players.getFriends(req.params.username, function(err, friends) {
            if (err) next(err);
            else res.send(friends);
        })
    });

    /**
     * Add friend
     */
    router.post('/users/:username/friends', function(req, res) {
        players.addToFriends(req.params.username, req.body.friend, function(err) {
            if (err) next(err);
            else res.send();
        })
    });

    /**
     * Rank player
     */
    router.put('/users/:username/', function(req, res, next) {
        players.rankPlayer(req.params.username, req.body.rank, function(err) {
            if (err) next(err);
            else res.send();
        })
    });

    return router;
};