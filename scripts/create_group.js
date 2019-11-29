/**
 * Creates a group and adds it to the database.
 */
function createGroup() {
  // user's inputs from the web page
  var groupName = document.getElementById("name").value;
  var groupCourse = document.getElementById("course").value;
  var groupDay = document.getElementById("day").value;
  var groupSlot = document.getElementById("time").value;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("groups").add({
        name: groupName,
        course: groupCourse,
        day: groupDay,
        slot: groupSlot,
      });
    } else {
      console.log("Not login");
    }
  });
  
}