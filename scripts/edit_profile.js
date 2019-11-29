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
                setTime("monday");
                break;
            case 2:
                $('#day').text("Tuesday");
                $('#currentDay').text("Tuesday");
                setTime("tuesday");
                break;
            case 3:
                $('#day').text("Wednesday");
                $('#currentDay').text("Wednesday");
                setTime("wednesday");
                break;
            case 4:
                $('#day').text("Thursday");
                $('#currentDay').text("Thursday");
                setTime("thursday");
                break;
            case 5:
                $('#day').text("Friday");
                $('#currentDay').text("Friday");
                setTime("friday");
                break;
            case 6:
                location.href = "./index.html";
                break;
        }
    });
}

function unCheck() {
    for (let i = 1; i < 5; i++) {
        // let chkbx = $("#check" + i);
        document.getElementById("check" + i).checked = false;
    }
}

function setTime(dayval) {
    firebase.auth().onAuthStateChanged(function (user) {
        var datab = db.collection("users").doc(user.uid).collection("freeslot");
        for (let i = 1; i < 5; i++) {
            if ($("#check" + i).prop("checked") == true) {
                console.log("It went in");
                datab.add({
                    day: dayval,
                    slot: "" + i
                }).then(function(){
                    unCheck();
                });
            }

        }
    });
    
}

