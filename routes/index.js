'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');
var employeeModel = require('../models/product');
var bcrypt = require('bcryptjs');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});



/*POST for login*/
//Try to login with passport
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/*Logout*/
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
});


// GET register page
router.get('/register', function (req, res) {
    res.render('register');
});

/*POST for register*/
router.post('/register', function (req, res) {
    //Insert user
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        var registerUser = {
            fullname: req.body.fullname,
            password: hash
        }
        //Check if user already exists
        userModel.find({ fullname: registerUser.fullname }, function (err, user) {
            if (err) console.log(err);
            if (user.length) console.log('Name already exists please login.');
            const newUser = new userModel(registerUser);
            newUser.save(function (err) {
                console.log('Inserting');
                if (err) console.log(err);
                req.login(newUser, function (err) {
                    console.log('Trying to login');
                    if (err) console.log(err);
                    return res.redirect('/');
                });
            });
        });
    })
});

// GET products page
router.get('/products', function (req, res) {

    productModel.find({}, function (err, docs) {

        if (!err) {

            res.render('products', { user: req.user, products: docs });
        }
        else {
            console.log(err);
            res.render('products', { user: req.user });
        }
    });
});

/* GET update page */
router.get('/update/:id', function (req, res) {
    productModel.findById(req.params.id, function (err, newProduct) {
        if (err) console.log(err);
        //Render update page with specific product
        res.render('update', { product: newProduct, user: req.user })
    })
});
/* POST update page */
router.post('/update', function (req, res) {
    console.log(req.body);
    //Find and update by id
    productModel.findByIdAndUpdate(fields.id, { req.body.id, { productname: req.body.pname, productprice: req.body.price, productimage: req.body.pimage }, function (err, model) {
        console.log(err);
        res.redirect('/product');
    });
});

/* POST delete page */
router.post('/delete/:id', function (req, res) {
    //Find and delete employee
    employeeModel.findByIdAndDelete(req.params.id, function (err, model) {
        res.redirect('/product');
    });
});



module.exports = router;
