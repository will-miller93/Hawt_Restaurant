// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Arrays for the data: 
var resArr = [];
var waitingList = [];
// Routes
// ============================================================

// routes for getting and posting table data 
app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

// get to be able to get the information from the created reservation
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reservationForm.html"));
});

// get to be able to get the reservations data
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "reservationView.html"));
});

// post to be able to view the reservations
app.post("/viewreservations", function (req, res) {
    var newReservation = req.body;
    // name, number, email, unique ID
    newReservation.routeName = newReservation.name

});

// routes for diplaying HTML Data


// server listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

