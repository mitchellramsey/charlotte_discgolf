$(document).on("ready", function () {
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
                var holeNumber = $("<li>");
                holeNumber.text(hole.hole_number);
                holeNumberList.append(holeNumber);                    
            });
            $("#holeNumber").append(holeNumberList);
            

            //par number append
            $("#par").empty();
            var parValueList = $("<ul>");
            holeData.forEach(function(hole) {
                var parValue = $("<li>");
                parValue.text(hole.par);
                parValueList.append(parValue);                    
            });
            $("#par").append(parValueList);

            //distance value append
            $("#distance").empty();
            var distanceValueList = $("<ul>");
            holeData.forEach(function(hole) {
                var distanceValue = $("<li>");
                distanceValue.text(hole.distance);
                distanceValueList.append(distanceValue);                    
            });
            $("#distance").append(distanceValueList);
        });
    })
});