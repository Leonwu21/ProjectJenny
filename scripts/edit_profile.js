$(document).ready(function () {

    $('#day').text("Monday");
    $('#currentDay').text("Monday");

    progressBar()
});


// Global Variables
var progress = 1;

function progressBar() {
    $('#nextProfDat').click(function () {
        console.log("Clicked");
        ++progress;
        $('#prof-progress div').css("width", 20 * progress + "%");

        switch (progress) {
            case 1:
                $('#day').text("Monday");
                $('#currentDay').text("Monday");
                break;
            case 2:
                $('#day').text("Tuesday");
                $('#currentDay').text("Tuesday");
                break;
            case 3:
                $('#day').text("Wednesday");
                $('#currentDay').text("Wednesday");
                break;
            case 4:
                $('#day').text("Thursday");
                $('#currentDay').text("Thursday");
                break;
            case 5:
                $('#day').text("Friday");
                $('#currentDay').text("Friday");
                break;
            case 6:
                location.href = "./index.html";
                break;
        }

    });
}

function setTime(dayval, slotval) {

    var userDay = document.getElementById("day").value;
    var userSlot = document.getElementById("time").value;

    firebase.auth().onAuthStateChanged(function (user) {
        var db = db.collection("users").doc(user.uid).collection("freeslot");
    });
}

