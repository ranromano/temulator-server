var express = require('express');
var isAuthenticated = require('../user_repo/passportUtils').isAuthenticated;
var router = express.Router();

module.exports = function(passport) {

    // TODO: for testing, remove when going live
    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });

    /**
     *  User Registration.
     */
    router.post('/signup', passport.authenticate('signup', {
        // TODO: refactor using redirects
        successRedirect: '/login',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    /**
     *  User login.
     */
    router.post('/login', passport.authenticate('login', {
        // TODO: refactor using redirects
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true
    }));

    /**
     * Rank player
     */
    // TODO: Rank player Endpoint

    // TODO: Add player Endpoint

    // TODO: Push notifications Endpoints

    return router;
};