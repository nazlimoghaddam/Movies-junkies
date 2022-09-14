var express = require('express');
var router = express.Router();
var Users = require('../model/users');

//creating new users
router.post('/api/users', function (req, res, next) {
    var user = new Users(req.body);
    user.save(function (err, user) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
});
//Get all users 
router.get('/api/users', function (req, res, next) {
    Users.find(function (err, user) {
        if (err) { return next(err); }
        res.json({ "users": user });
    });
});
//Get user by ID
router.get('/api/users/:_id', function (req, res, next) {
    var id = req.params._id;
    Users.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "user not found" });
        }
        res.json(user);
    });
});
//Delete by ID
router.delete('/api/users/:_id', function (req, res, next) {
    var id = req.params._id;
    Users.findOneAndDelete({ _id: id }, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "user not found" });
        }
        res.json(users);
    });
});
//Delete all
router.delete('/api/users/', function (req, res, next) {
    Users.remove({}, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "user not found" });
        }
        res.json(user);
    });
});


module.exports = router;