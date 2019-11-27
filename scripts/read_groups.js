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
      let i = 0;
      let j = 100;
      let h = 10000;
      snap.forEach(function (doc) {
        let groupName = doc.data().name;
        let groupDay = doc.data().day;
        let groupSlot = doc.data().slot;
        let groupCourse = doc.data().course;
        let newDiv = $("<div class='group'><span id='" + i + "' class='groupName'></span>\
          <span id='"+ j + "' class='groupTime'></span><span id='" + h + "' class='groupCourse'></span></div>");
        $("#content").append(newDiv);
        $("'#" + i + "'").append(groupName);
        $("'#" + j + "'").append(groupDay);
        $("'#" + j + "'").append(groupSlot);
        $("'#" + h + "'").append(groupCourse);
        i++;
        j++;
        h++;
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