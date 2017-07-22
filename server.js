var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var reservations = [];
var waitlist = [];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/clear", function(req, res) {
	reservations = [];
	waitlist = [];
});

app.get("/api/tables", function(req, res) {
  var chosen = req.params.reservations;

  if (chosen) {

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});


app.get("/api/waitlist", function(req, res) {
  var chosen = req.params.waitlist;

  if (chosen) {

    for (var i = 0; i < waitlist.length; i++) {
      if (chosen === waitlist[i].routeName) {
        return res.json(waitlist[i]);
      }
    }
    return res.json(false);
  }
  return res.json(waitlist);
});

app.post("/api/new", function(req, res) {
	var newreservation = req.body;
  	newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

	console.log(newreservation);

	if (reservations.length < 5) {
		reservations.push(newreservation);
	}
	else {
		waitlist.push(newreservation);
	}

	//res.json(newreservation);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});