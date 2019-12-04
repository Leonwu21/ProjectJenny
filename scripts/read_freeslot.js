/**
 * Gets and displays the free slot of the current user in profile.html.
 */
function getFreeSlot() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection("users").doc(user.uid).collection("freeslot").get()
        .then(function (snap) {
          // for each free day + slot, appends it to "freeSlots" unordered list
          snap.forEach(function (doc) {
            var day = doc.data().day;
            var slot = doc.data().slot;
            var time = "";

            switch (slot) {
              case "1": time = "10AM - 12PM";
                break;
              case "2": time = "12PM - 2PM";
                break;
              case "3": time = "2PM - 4PM";
                break;
              case "4": time = "4PM - 6PM";
              break;
            }
            var li = document.createElement("li");
            li.innerHTML = "" +  day.charAt(0).toUpperCase() + day.substring(1) + ",&nbsp;" + time;
            document.getElementById("freeSlots").appendChild(li);
          });
        });
    }
  });
}