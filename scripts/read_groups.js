// Functions to read the groups that the user are currently in
function getGroups() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase.auth().onAuthStateChanged(function (user) {
        // Using onSnapShot() to get groups id that the users are in
        // console the group out
        db.collection("users/").doc(user.uid).onSnapshot(function (d) {
          console.log("Current groups: ", d.data()["groups"]);
        });
      })
    } else {
      console.log("Not signed in");
    }
  });
}

function findGroups(day, slot) {
  db.collection("groups")
    .where("day", "==", day).where("slot", "==", slot)
    .get().then(function (snap) {
      snap.forEach(function (doc) {
        console.log(doc.data());
      });
    });
}

function showGroups() {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid).collection("freeslot").get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          var dayfree = doc.data().day;
          var slotfree = doc.data().slot;
          findGroups(dayfree, slotfree);
        });
      });
  });


}