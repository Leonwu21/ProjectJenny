// Function that reads from the document in the users collection

function showName() {

  firebase.auth().onAuthStateChanged(function (user) {
    // if the current user logged in 
    // user is authenticated, then grab the "uid" to access the
    // current user's document in fire base to display the user name
    // in index.html
    if (user != null) {
      var foreEditProf = false;
      var collect = db.collection("users/").doc(user.uid).collection('freeslot');
      collect.get().then(function (snap) {
        if(snap.empty){
          console.log("didn't work you null")
          location.href = "./edit_profile.html";
        }
        })

      db.collection("users/").doc(user.uid).onSnapshot(function (d) {
        if (d.get('name') != null) {
          document.getElementById('userName').innerHTML = d.data()["name"].charAt(0).toUpperCase() + d.data()["name"].substring(1);
        } else {
          console.log("didn't work")

        }
      })
    } else {
      console.log("Open new Window");
      loginReq();
    }

  })
}

function loginReq() {
  location.href = "./login.html"
}
function setUpAccount() {

}