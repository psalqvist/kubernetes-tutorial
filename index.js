var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.status(200).send({
        success: true,
    });
});

app.get('/hello', function (req, res) {
    res.send({
        success: true,
        response: 'hello world'
    });
});

app.listen(process.env.PORT || 3000);
module.exports = app;