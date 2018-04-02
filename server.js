// Requiring Express
var express = require("express");
// Requiring Body-parser
var bodyParser = require("body-parser");

// Setting the port number
var PORT = process.env.PORT || 8080;

// Requiring the models folder for syncing
var db = require("./models");

// Intializing Express
var app = express();

// Serving up the public folder to give static content
app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/JSON
app.use(bodyParser.json());

// Set Handlebars
var exphbs = require("express-handlebars");
// Setting the engine and layout for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
require("./routes/html-routes")(app);
require("./routes/course-api-routes.js")(app);
require("./routes/hole-api-routes.js")(app);
require("./routes/userInfo-api-routes.js")(app);
require("./routes/userRound-api-routes.js")(app);

db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});