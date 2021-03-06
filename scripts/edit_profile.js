$(document).ready(function () {

    $('#day').text("Monday");
    $('#currentDay').text("Monday");

    progressBar()

    for (let i = 1; i < 5; i++) {
        $("#list" + i).click(function () {
            if ($("#check" + i).prop("checked") == true) {
                $("#list" + i).css("background-color", "#ddf");
            } else {
                $("#list" + i).css("background-color", "#fff");
            }
        })
    }
});



// Global Variables
var progress = 1;

function progressBar() {

    $('#nextProfDat').click(function () {
        console.log("Clicked");


        switch (progress) {
            case 1:
                setTime("monday");
                break;
            case 2:
                setTime("tuesday");
                break;
            case 3:
                setTime("wednesday");
                break;
            case 4:
                setTime("thursday");
                break;
            case 5:
                setTime("friday");
                break;
            case 6:
                location.href = "./index.html";
                break;
        }
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

function unCheck() {
    for (let i = 1; i < 5; i++) {
        // let chkbx = $("#check" + i);
        document.getElementById("check" + i).checked = false;
        $("#list" + i).css("background-color", "#fff");
    }
}

function setTime(dayval) {
    firebase.auth().onAuthStateChanged(function (user) {
        var datab = db.collection("users").doc(user.uid).collection("freeslot");
        for (let i = 1; i < 5; i++) {
            if ($("#check" + i).prop("checked") == true) {
                console.log("sched added");
                datab.doc(dayval + i).set({
                    day: dayval,
                    slot: "" + i
                })
            } else {
                datab.doc(dayval + i).delete()
                console.log("" + dayval + i + ": deleted")
            }

        }

        unCheck();
    });

}

function deleteSchedule() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("freeslot").get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    deleteSched(doc.id)
                })
            })

    })
}

function deleteSched(schedId) {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("freeslot").doc(schedId).delete()
            .then(function () {
                console.log("data deleted");
            })
    })
}

