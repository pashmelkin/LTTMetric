"use strict";
exports.__esModule = true;
exports.app = void 0;
var express_1 = require("express");
var bodyParser = require("body-parser");
var app = express_1["default"]();
exports.app = app;
app.use(bodyParser.json({
    limit: '50mb',
    verify: function (req, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.get('/', function (req, res) { return res.send('Hello World!'); });
