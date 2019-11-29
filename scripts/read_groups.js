/**
 * Get the current groups that the users are in.
 */
function getGroups() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase.auth().onAuthStateChanged(function (user) {
        // Using onSnapShot() to get groups id that the users are in
        // console the group out
        db.collection("users/").doc(user.uid).collection("groups").onSnapshot(function (d) {
          d.forEach(function(doc) {
            console.log(doc.data());
          });
        });
      })
    } else {
      console.log("Not signed in");
    }
  });
}

// function showMyGroups() {
//   firebase.auth().onAuthStateChanged(function (user) {
//     db.collection("groups/")
//       .get().then(function (snap) {
//         snap.forEach(function (doc) {
//           groupId = doc.id;
//           findMembers(groupId);
//         });
//       });
//   });
// }

// function findMembers(groupId) {
//   firebase.auth().onAuthStateChanged(function (user) {
//     db.collection("groups/").doc(groupId).collection("members/")
//       .get().then(function (snap) {
//         snap.forEach(function (doc) {
//           let userId = doc.data().groupId;
//           if (userId = user.uid) {
//             showGroups();
//           }
//         });
//       });
//   });
// }

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

        tableDiv.append(tableContent);
        $("#content").append(tableDiv);

        $("td button[value='" + groupId + "']").click(function (e) {
          e.preventDefault();
          console.log(this.value);
          joinGroup(this.value);
          alert("Group joined!");
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
        });
      });
  });
}



function joinGroup(group_id) {
  firebase.auth().onAuthStateChanged(function (user) {
    // Add current user to the group document
    db.collection("groups/").doc(group_id).collection("members").add({
      memberId: user.uid
    })
      .then(function (snap) {
        console.log("Document written with ID: " + snap.id);
        console.log(group_id + "User ID:" + user.uid);
      });
      
      // Add group to the the current user's document
      db.collection("users").doc(user.uid).collection("groups").add({
        groupId: group_id
      });
  });
}

