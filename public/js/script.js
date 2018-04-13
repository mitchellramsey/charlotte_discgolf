
var frontEndScript = {

    showHoleInfo: function () {
        $("#viewHoles").on("click", function() {
            var courseId = $(".courseSelect").val();
            console.log(courseId);
            var course = {
                idCourse: courseId
            }
            $.post("/user_round", course).then(function(results) {
                console.log(results);
                var holeData = results.Holes;
                //hole number append
                $("#holeNumber").empty();
                var holeNumberList = $("<ul>");
                holeData.forEach(function(hole) {
                    var holeNumber = $("<li>")
                                     .attr("id", "list-item");
                    holeNumber.text(hole.hole_number);
                    holeNumberList.append(holeNumber);                    
                });
                $("#holeNumber").append(holeNumberList);
                
 
                //par number append
                $("#par").empty();
                var parValueList = $("<ul>");
                holeData.forEach(function(hole) {
                    var parValue = $("<li>")
                                   .attr("id", "list-item");
                    parValue.text(hole.par);
                    parValueList.append(parValue);                    
                });
                $("#par").append(parValueList);
 
                //distance value append
                $("#distance").empty();
                var distanceValueList = $("<ul>");
                holeData.forEach(function(hole) {
                    var distanceValue = $("<li>")
                                         .attr("id", "list-item");
                    distanceValue.text(hole.distance);
                    distanceValueList.append(distanceValue);                    
                });
                $("#distance").append(distanceValueList);
 
                //score input fields
                $("#tosses").empty();
                var tossesInputList = $("<ul>");
                holeData.forEach(function(hole) {
                    var scoreInputListItem = $("<li>")
                                             .attr("id", "list-tosses-item");
                    var newScoreInput = $("<input>")
                                        .attr("type", "number")
                                        .attr("class", "form-control")
                                        .attr("id", "hole-" + hole.hole_number)
                                        .attr("style", "width: 75px; margin-left: 33px");
                     scoreInputListItem.append(newScoreInput);
                     tossesInputList.append(scoreInputListItem);
                });
                $("#tosses").append(tossesInputList);
 
                //create end game button
                //<button class="btn btn-success" type="submit" id="endRound" style:"text-align:center">End Game</button>
                var endGameBtn = $("<button>")
                                 .addClass("btn btn-success")
                                 .attr("type", "submit")
                                 .attr("id", "endRound")
                                 .attr("style", "text-align:center")
                                 .text("End Game");
                $("#tosses").append(endGameBtn);
 
                //post total par and total distance
                
                var totalPar = 0;
                var totalDistance = 0;
                holeData.forEach(function(hole) {
                    totalPar += hole.par;
                    totalDistance += hole.distance;
                });
                $("#totalPar").text(totalPar);
                $("#totalDistance").text(totalDistance);
 
                $("#endRound").on("click", function() {
                   
                     var userTosses = 0;
                     holeData.forEach(function(hole) {
                         userTosses += parseInt($("#hole-" + hole.hole_number).val());
                     });
                     var userId = $("#user").attr("data-id");
                     var score = userTosses - totalPar;
                     var userRoundData = {
                         dbUserId: userId,
                         dbCourseId: courseId,
                         dbTosses: userTosses,
                         dbScore: score
                     };
                     $.post("api/userRounds", userRoundData).then(function() {
                     });
                });
            
            });
        });
    },
    // Google Maps
    getRoute: function () {
        // Geolocate
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // When clicking on a Google Maps image..
                $(".destination").on("click", function() {
                    // Accessing the address from the data-attribute
                    var address = $(this).data("address");

                        // Dynamically creating a URL
                        var googleURL = "https://www.google.com/maps/dir/?api=1&origin=" + pos.lat + "," + pos.lng + "&destination=" + address;

                        var a = $("<a>").attr("href", googleURL);

                        $(".destination").wrap(a);
                        // When clicking the map - Display the directions in the cross platform URL - Opens either Google Maps App on phone
                        // Or opens it in the web browser - creating step by step GPS based driving directions
                        // See googles documentation on Maps URL for types of platform support
                        window.location.href = googleURL;  
                });
            });
        } else {
            // Browser doesn't support Geolocation
        }
    }
}

$(document).ready(frontEndScript.showHoleInfo);
$(document).ready(frontEndScript.getRoute);
