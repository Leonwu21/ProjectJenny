function getFreeSlot() {
  firebase.auth.onAuthStateChanged(function(user) {
    if (user) {
      db.collection("users").doc(user.uid).collection("freeslot").get()
      .then(function(snap) {
        snap.forEach(function(doc) {
          var day = doc.data().day;
          var slot = doc.data().slot;

          console.log("day: " + day + " slot: " + slot);
        });
      });
    }
  });
}