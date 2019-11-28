/**
 * Function to update members in a group.
 * @param {string} groupId of the group
 */
function joinGroup(groupId) {
  console.log(groupId);
  firebase.auth().authOnStateChanged(function(user) {
    db.collection("groups").doc(groupId).set({
      "members": firebase.firestore.FieldValue.arrayUnion(user.uid)
    }, {merge: true});
  });
}