// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var twilio = require('twilio');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

//Initiate Twilio
var accountSid = 'ACe04cad0b18b2fe13dd2a6c91abb821f9';
var authToken = "b0dba8b2dd3da1d5bacae0b5753975b1";
var twilioNum = '+16782632968';
var client = new twilio(accountSid,authToken);

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
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
	//console.log(newReservation);
	if (resArr.length<5) {
		resArr.push(newReservation);
		console.log('Reserved: '+newReservation.name+', Party of '+newReservation.size);
		res.send(true);
	} else {
		waitingList.push(newReservation);
		console.log('Waitlisted: '+newReservation.name+', Party of '+newReservation.size);
		res.send(false);
	}

});

app.get("/api/tables", function (req, res) {
	console.log('sending table data');
	res.send(resArr);
});

app.get("/api/waitlist", function (req, res) {
	console.log('sending waitlist data');
	res.send(waitingList);
});

app.post("/api/clear", function (req, res) {
    console.log("Clearing...");
    resArr = [];
    waitingList = [];
})

app.post('/api/tables/ready', function (req, res) {
	console.log('Notifying '+req.body.name+' that table is ready');
	client.messages.create({
		to: phoneformatte(req.body.phone),
		from: twilioNum,
		body: req.body.name+', Your table is ready!',
	}).then(function (message) {
		//console.log(message);
		res.send(true);
	});
});

// server listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

//helper function to convert assorted number formats to E.164 ITU-T standard
function phoneformatter(num) {
    num = num.split('');
    var filter = num.filter((char)=> char>='0' && char<='9')
    var e164 = '+1';
    for (i in filter) {
        e164+=filter[i];
    }
    return e164;
}
