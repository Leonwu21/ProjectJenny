// Functions to read the groups that the user are currently in
function getGroups() {
  // var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users/").doc(user.uid).onSnapshot(function (d) {
            console.log("Current groups: ", d.data()["groups"]);
        });
      })
    } else {
      console.log("Not signed in");
    }
  });
}