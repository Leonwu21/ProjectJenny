
function progressBar(){
    $('#nextProfDat').click(function(){
        
    });
}
function setTime() {

    var userDay = document.getElementById("day").value;
    var userSlot = document.getElementById("time").value;

    firebase.auth().onAuthStateChanged(function (user) {
        var db = db.collection("users").doc(user.uid).collection("freeslot");
    });
}