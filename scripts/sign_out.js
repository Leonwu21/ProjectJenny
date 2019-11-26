function signout() {
  firebase.auth().onAuthStateChanged(function (user) {
    firebase.auth().signOut().then(function () {
      console.log("sign out");
    });
  });
}

$(document).ready(function () {
  $('#signOut').click(function (x) {
    signout();
  });
});