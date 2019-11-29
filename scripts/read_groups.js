/**
 * Gets current groups' IDs that the users are in and display the groups' infos by
 * groups' IDs.
 */
function getGroups() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Using onSnapShot() to get groups' IDs that the users are in
      // console the group out
      db.collection("users/").doc(user.uid).onSnapshot(function (doc) {

        // console.log(doc.data());
        var groupId = doc.data().groups;
        console.log(groupId);

        // Get the group's infos with the group id
        groupId.forEach(function (gId) {
          db.collection("groups").doc(gId).onSnapshot(function (snap) {
            var groupName = snap.data().name;
            var groupDay = snap.data().day;
            var groupSlot = snap.data().slot;
            var timeSlot;
            switch (groupSlot) {
              case "1": timeSlot = "10AM - 12PM";
                break;
              case "2": timeSlot = "12PM - 2PM";
                break;
              case "3": timeSlot = "2PM - 4PM";
                break;
              case "4": timeSlot = "4PM - 6PM";
            }
            var groupCourse = snap.data().course;

            // console.log("Name: " + groupName);
            // console.log("Day: " + groupDay);
            // console.log("Slot: " + groupSlot);
            // console.log("Course: " + groupCourse);

            $(document).ready(function () {
              let box = $("<div id='box'></div>");
              let name = $("<span id='name' class='span'>" + groupName + "</span>");
              let time = $("<span id='time' class='span'>" + groupDay + ",&nbsp;" + timeSlot + "</span>");
              let course = $("<span id='course' class='span'>" + groupCourse + "</span>");

              $("#content").append(box);
              $(box).append(name);
              $(box).append(time);
              $(box).append(course);
              
            });

          });
        });
      });
    } else {
      console.log("Not signed in");
    }
  });
}

/**
 * Get the groups with the same day and slot of the current user and displays
 * those groups in .
 * @param {String} day 
 * @param {String} slot 
 */
function findGroups(day, slot) {
  db.collection("groups/")
    .where("day", "==", day).where("slot", "==", slot)
    .get().then(function (snap) {

      snap.forEach(function (doc) {
        let groupName = doc.data().name;
        let groupDay = doc.data()['day'];
        let groupSlot = doc.data()['slot'];
        let groupCourse = doc.data().course;

        let groupId = doc.id;

        console.log(groupId);
        // Join button added inside code
        let tableDiv = $('<table></table>');

        let tableContent = $(
          "<tr>\
          <td value='groupName'>" + groupName + "</td>\
          <td>" + groupDay + "</td'>\
          <td>" + groupSlot + "</td>\
          <td value='groupSlot'>" + groupCourse + "</td>\
          <td><button type='button' value='" + groupId + "' class='joinButton btn btn-primary'>Join Group</button></td>\
          </tr>"
        );

        let card = $("<div class='card'>\
              <div class='card-body'>\
                <h4 class='card-title font-3' id='name'>"+ groupName + "</h4>\
                <p class='card-text font-3' id='time'>" + groupDay.charAt(0).toUpperCase() + groupDay.substring(1) +"</p>\
                <p class='card-text font-3' id='course'>"+ groupCourse + "</p>\
                <button type='button' value='" + groupId + "' class='joinButton btn btn-primary'>Join Group</button>\
              </div>\
            </div>")

        // tableDiv.append(tableContent);
        $("#groups").append(card);

        $("button[value='" + groupId + "']").click(function (e) {
          e.preventDefault();
          console.log(this.value);
          joinGroup(this.value);

        });
      });
    });
}

/**
 * Get free slots of the current users.
 */
function getFreeTime() {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users/").doc(user.uid).collection("freeslot").get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          var dayfree = doc.data().day;
          var slotfree = doc.data().slot;
          findGroups(dayfree, slotfree);
        })
      });
  });
}



function joinGroup(group_id) {
  firebase.auth().onAuthStateChanged(function (user) {
    // Add current user to the group document
    db.collection("groups/").doc(group_id).update({
      members: firebase.firestore.FieldValue.arrayUnion(user.uid)
    })
    // .then(function (snap) {
    //   console.log("Document written with ID: " + snap.id);
    //   console.log(group_id + "User ID:" + user.uid);
    // });

    // Add group to the the current user's document
    db.collection("users").doc(user.uid).update({
      groups: firebase.firestore.FieldValue.arrayUnion(group_id)
    });


  });
}

