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
          <td><button type='button' value='" + groupId +"' class='joinButton btn btn-primary'>Join Group</button></td>\
          </tr>"
        );

        tableDiv.append(tableContent);
        // let newDiv = $("<div class='group'><div class='groupName'>" + groupName + "</div>\
        //   <div id='' class='groupTime'>"+ groupDay + " " + groupSlot + "</div>\
        //   <div id='' class='groupCourse'>"+ groupCourse + "</div>\
        //   <button type='button' class='joinButton btn btn-primary'>Join Group</button>\
        //   </div>");
        $("#content").append(tableDiv);

        $("td button[value='" + groupId + "']").click(function (e) { 
          e.preventDefault();
          console.log(this.value);
          joinGroup(this.value);
        });
      });
    });
}

function joinGroup( group_id) {
  firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users/").doc(user.uid).collection("groups").add({
          groupId: group_id
      })
          .then(function (snap) {
              console.log("Document written with ID: " + snap.id);
          });
  });
}

function showGroups() {
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