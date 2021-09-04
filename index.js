'use strict'
var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
var multer  = require('multer')
var path = require('path')
var request = require('request');
var should = require('chai').should()
var expect = require('chai').expect
require('dotenv').config()


//Configuring the Express Middleware
var app = express();

var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'})

//Configure Morgan's Logging Formats
// app.use(morgan('common', {stream: accessLogStream}))    //UNCOMMENT TO ENABLE FILE LOGGING
app.use(morgan('common'));


//Set PORT to Dynamic Environments to run on any Server
var port = process.env.PORT || 3001;

//Configure Express to Recieve JSON and extended URLencoded formats
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const storageDir = path.join(__dirname, '', 'upload');
console.log("Path : " + storageDir);
const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, storageDir)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })

  var upload = multer({ storage: storageConfig })

app.use(cors({
    exposedHeaders : "*"
}));

app.use(bodyParser.json({
    limit: "50mb"
}))
//Set RESTful routes

app.get('/', function(req, res) {
  res.send("Server Online");
});
//Route for GET

app.post('/scan', upload.single('card'), function(req, res, next) {
  // console.log(req.file)
  // if(req.file.mimetype.should.equal('image/jpeg'))
  // console.log(req.body)
    // if(typeof req.file == "undefined" || typeof req.file["card"] == undefined || typeof req.card == undefined) {
    //     res.send({status: "error", message: "filename key as 'card' is required"});
    // } else if(expect(req.file.mimetype).to.be.oneOf(['image/jpeg','image/png'])){

        // uploadFile(reqM);
        console.log("EVENT : " + JSON.stringify(req.file));
        res.status(200).json({
            upload : true,
            success : true,
            files : "Uploaded successfully",
            error_status: null,
            status_code: 200
          })
    // }


});
//Route for file uploads

app.post('/relay', function(req, res, next) {
  // console.log(req.file)
  // if(req.file.mimetype.should.equal('image/jpeg'))
  // console.log(req.body)
    // if(typeof req.file == "undefined" || typeof req.file["card"] == undefined || typeof req.card == undefined) {
    //     res.send({status: "error", message: "filename key as 'card' is required"});
    // } else if(expect(req.file.mimetype).to.be.oneOf(['image/jpeg','image/png'])){

        // uploadFile(reqM);
        // console.log("EVENT : " + JSON.stringify(req.file));
        res.status(200).json({
            upload : true,
            data: req.body
          })
    // }


});

app.listen(port);
console.log("Server started successfully at PORT : " + port);
module.exports=app;
