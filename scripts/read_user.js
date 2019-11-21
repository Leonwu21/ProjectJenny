// Function that reads from the document in the users collection

function showName() {

  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users/").doc(user.uid)
      .onSnapshot(function (d) {
        if (d.get('name') != null) {
          document.getElementById('name').innerHTML = d.data()["name"];
        } else {
          console.log("didn't work")
        }
      })
  })
}
