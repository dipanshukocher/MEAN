const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const Alarms = require('../models/alarms');
const Users = require('../models/users');
const checkAuth = require('../auth/check-auth');
const jwt = require('jsonwebtoken');

// get a list of setted alarms from mongodb
router.get('/alarms', checkAuth, function(req, res, next){
    // let user_obj = Users.find({'user_id':ObjectId(req.userData.userId)})
    // console.log(req.userData.userId);
    Alarms.find({user_id : ObjectId(req.userData.userId)}).then(function(alarms){
        // console.log(alarms);
        res.send(alarms);
    });
});

// get a alarms detail from mongodb
router.get('/alarm/:id', checkAuth, function(req, res, next){
    // console.log(req.params.id);
    Alarms.findById(req.params.id, (err, item) => {
        res.send(item)
    });
});

// set an alarms in mongodb
router.post('/alarms', checkAuth, function(req, res, next){
    let data = req.body;
    data['user_id'] = req.userData.userId;
    // console.log("sasas",req.body);
    Alarms.create(data).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

// update an alarm in db
router.put('/alarms', checkAuth, function(req, res, next){
    console.log(req.userData);
    Alarms.findByIdAndUpdate({_id: req.body._id}, req.body).then(function() {
        Alarms.findOne({_id: req.body._id}).then(function(item){
            res.send({Alarm: item}); 
        });
    });
});

// delete an alarm from db
router.delete('/alarms/:id', checkAuth, function(req, res, next){
    Alarms.findByIdAndRemove({_id: req.params.id}).then(function(alarm) {
        console.log(alarm + ' ID deleted');
        res.send({Alarm: alarm});   
    });
});


module.exports = router;