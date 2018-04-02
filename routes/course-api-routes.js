var db = require("../models");

//Course Data

db.Course.create({
    name: "Robert L. Smith Park",
    address: "1604 Little Rock Rd, Charlotte, NC 28214",
    holes: 18,
    rating: 4.14
    //There has been 57 reviews
},
{
    name: "Nevin Park DGC",
    address: "6000 Statesville Rd, Charlotte, NC 28269",
    holes: 18,
    rating: 4.28
    //There has been 55 reviews
},
{
    name: "Hornets Next Park",
    address: "6301 Beatties Ford Rd, Charlotte, NC 28216",
    holes: 18,
    rating: 4.25
    //There has been 10 reviews
});

module.exports = function(app) {

};