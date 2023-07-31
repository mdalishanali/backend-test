"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get dependencies
var express = require("express");
var path = require("path");
var http = require("http");
var busboy = require("connect-busboy");
var busboyBodyParser = require("busboy-body-parser");
var compression = require("compression");
var cors = require("cors");
// Get our API routes
var api_1 = require("./routes/api");
// import config
var config_1 = require("./config");
try {
    var app = express();
    app.use(cors());
    app.use(busboy());
    app.use(busboyBodyParser());
    // Parsers for POST data
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // for gzipping
    app.use(compression());
    // Point static path to dist
    app.use(express.static(path.join(__dirname, '../../dist')));
    app.get("/", function (req, res) {
        res.send("<h1>Hello world</h1>");
    });
    // Set our api routes
    app.use('/api', api_1.api);
    app.use('/raman', function (req, res) {
        res.send('HI');
    });
    // Catch all other routes and return the index file
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
    /**
     * Get port from environment and store in Express.
     */
    var port_1 = config_1.config.PORT || '8000';
    app.set('port', port_1);
    /**
     * Create HTTP server.
     */
    var server = http.createServer(app);
    server.listen(port_1, function () { return console.info("API running on localhost:" + port_1); });
    module.exports = app;
}
catch (error) {
    process.exit(1);
}
//# sourceMappingURL=index.js.map