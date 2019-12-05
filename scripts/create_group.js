/**
 * Creates a group and adds it to the database.
 */
function createGroup() {
  // user's inputs from the web page
  var groupName = document.getElementById("name").value;
  var groupCourse = document.getElementById("course").value;
  var groupDay = document.getElementById("day").value;
  var groupSlot = document.getElementById("time").value;

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Add group to the groups collection
      db.collection("groups").add({
        name: groupName,
        course: groupCourse,
        day: groupDay,
        slot: groupSlot,
        members: [user.uid]
      })
      .then(function (docRef) {
        console.log("finished  adding  group");
        // Add group to the the current user's document
        db.collection("users").doc(user.uid).update({
          groups: firebase.firestore.FieldValue.arrayUnion(docRef.id)
        })
        .then(function(){
          console.log("finished  updating to users ");
          window.location.href  =  "mygroups.html";
        });
      });

    } else {
      console.log("Not login");
    }
  });

}