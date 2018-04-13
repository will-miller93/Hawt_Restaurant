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
// Format:
// [{
// 		name: 'JohnQ',
// 		size: 4,
// 		phone: '678-777-2000'
// 		email: 'john@example.com'
// 	}]
var resArr = [];
var waitingList = [];
// Routes
// ============================================================

// routes for getting and posting table data 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});


// get to be able to get the reservations data
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// GET reservation form
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// post to be able to view the reservations
app.post("/api/tables", function (req, res) {
    var newReservation = req.body;
    // name, number, email, size    newReservation.routeName = newReservation.name
	console.log(newReservation);

});

// routes for diplaying HTML Data


// server listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

