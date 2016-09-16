var router = require('express').Router();
var path = require('path');
var multer = require('multer');
var images = multer({
    dest: 'images/'
});

var User = require('../models/user');

router.get('/register', function(request, response) {
    response.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.post('/', images.single('file'), function(request, response) {
    // console.log(request.file);
    User.create({
        username: request.body.username,
        password: request.body.password,
        about: request.body.about,
        profilePic: request.file.filename
    }, function(err, user) {
        if (err) {
            console.log(err);
            response.sendStatus(500);
        } else {

            response.send(user);
        }
    });
});


module.exports = router;
