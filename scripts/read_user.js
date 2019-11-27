// Function that reads from the document in the users collection

function showName() {

  firebase.auth().onAuthStateChanged(function (user) {
    // if the current user logged in 
    // user is authenticated, then grab the "uid" to access the
    // current user's document in fire base to display the user name
    // in index.html
    db.collection("users/").doc(user.uid).onSnapshot(function (d) {
      if (d.get('name') != null) {
        document.getElementById('userName').innerHTML = d.data()["name"];
      } else {
        console.log("didn't work")
        loginReq();
      }
    })
  })
}

function loginReq() {
  $('#menu').attr('style', 'visibility: none;');
}
