
var frontEndScript = {

    showHoleInfo: function () {
        $("#viewHoles").on("click", function () {
            var courseId = $(".courseSelect").val();
            console.log(courseId);
            var course = {
                idCourse: courseId
            }
            $.post("/user_round", course).then(function (results) {
                
                var holeData = results.Holes;

                //empty hole data
                $("#holeNumber").empty();
                var holeNumberList = $("<ul>");

                //empty par data
                $("#par").empty();
                var parValueList = $("<ul>");

                //empty distance data
                $("#distance").empty();
                var distanceValueList = $("<ul>");

                //empty tosses inputs
                $("#tosses").empty();
                var tossesInputList = $("<ul>");


                holeData.forEach(function (hole) {
                    //hole number append
                    var holeNumber = $("<li>")
                        .attr("id", "list-item");
                    holeNumber.text(hole.hole_number);
                    holeNumberList.append(holeNumber);

                    //par info append
                    var parValue = $("<li>")
                        .attr("id", "list-item");
                    parValue.text(hole.par);
                    parValueList.append(parValue);

                    //distance info append
                    var distanceValue = $("<li>")
                        .attr("id", "list-item");
                    distanceValue.text(hole.distance);
                    distanceValueList.append(distanceValue);

                    //tosses info append
                    var scoreInputListItem = $("<li>")
                        .attr("id", "list-tosses-item");
                    var newScoreInput = $("<input>")
                        .attr("type", "number")
                        .attr("class", "form-control")
                        .attr("id", "hole-" + hole.hole_number)
                        .attr("style", "width: 75px; margin-left:33px; ");
                    // var submitScoreButton = $("<button>")
                    //                         .addClass("btn btn-success btn-sm")
                    //                         .attr("data-id", hole.hole_number)
                    //                         .attr("id", "submitScore")
                    //                         .html('<i class="fa fa-check" style="font-size:12px"></i>');
                    scoreInputListItem.append(newScoreInput)
                                    //   .append(submitScoreButton);
                    tossesInputList.append(scoreInputListItem);

                });
                //append everything to page
                $("#holeNumber").append(holeNumberList);             
                $("#par").append(parValueList);
                //distance value append           
                $("#distance").append(distanceValueList);
                $("#tosses").append(tossesInputList);

                //create end game button
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
                holeData.forEach(function (hole) {
                    totalPar += hole.par;
                    totalDistance += hole.distance;
                });
                $("#totalPar").text(totalPar);
                $("#totalDistance").text(totalDistance);
                
                
                //when the end button is clicked
                $("#endRound").on("click", function () {

                    var userTosses = 0;
                    holeData.forEach(function (hole) {
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
                    $.post("api/userRounds", userRoundData).then(function () {
                    });
                });

            });
        });
    }
}

$(document).ready(frontEndScript.showHoleInfo);

