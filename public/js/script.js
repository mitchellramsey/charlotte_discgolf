
var frontEndScript = {

    showHoleInfo: function () {
        $("#viewHoles").on("click", function () {
            var courseId = $(".courseSelect").val();
            console.log(courseId);
            var course = {
                idCourse: courseId
            }
            $.post("/user_round", course).then(function (results) {
                console.log(results);
                var holeData = results.Holes;
                //hole number append
                $("#holeNumber").empty();
                var holeNumberList = $("<ul>");
                holeData.forEach(function (hole) {
                    var holeNumber = $("<li>");
                    holeNumber.text(hole.hole_number);
                    holeNumberList.append(holeNumber);
                });
                $("#holeNumber").append(holeNumberList);


                //par number append
                $("#par").empty();
                var parValueList = $("<ul>");
                holeData.forEach(function (hole) {
                    var parValue = $("<li>");
                    parValue.text(hole.par);
                    parValueList.append(parValue);
                });
                $("#par").append(parValueList);

                //distance value append
                $("#distance").empty();
                var distanceValueList = $("<ul>");
                holeData.forEach(function (hole) {
                    var distanceValue = $("<li>");
                    distanceValue.text(hole.distance);
                    distanceValueList.append(distanceValue);
                });
                $("#distance").append(distanceValueList);
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
frontEndScript.getRoute();
