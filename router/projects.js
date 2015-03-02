var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('projects/index', {
        title: 'Projects'
    })
});

module.exports = router;
