// Function that reads from the document in the users collection

function showName() {

  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users/").doc(user.uid)
      .onSnapShot(function (d) {
        if (d.get('name') != null) {
          document.getElementById('name').innerHTML = d.data()["name"];
        }
      })
  })
}
