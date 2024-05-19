const express = require('express'),
    router = express.Router();

module.exports = function (app) {
    // API routes with authentication validation
    app.use('/', [], require('./routes'));
    
    /* GET home page. */
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    /* Super access. */
    app.get('/management', [], function(req, res, next) {
        res.render('Master', { title: 'Express' });
    });
};

module.exports = router;