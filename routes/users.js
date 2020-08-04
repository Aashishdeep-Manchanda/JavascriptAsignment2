'use strict';
var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
/* GET users listing. */
/* GET users listing. */
router.get('/', function (req, res) {
    try {
        userModel.find({}, function (err, foundUsers) {
            console.log(err);
            console.log(foundUsers);
            
            res.render('users', { articles: foundUsers, user: req.user });
        });
    }
    catch (err) {
        console.log(err);
    }
});




module.exports = router;