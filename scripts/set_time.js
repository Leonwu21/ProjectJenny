/**
 * Set the free slot of the current user to the database.
 */
function setTime() {

  var userDay = document.getElementById("day").value;
  var userSlot = document.getElementById("time").value;

  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid).collection("freeslot").add({
      day: userDay,
      slot: userSlot
    });
  });
}
