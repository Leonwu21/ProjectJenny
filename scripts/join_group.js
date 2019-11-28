

$(document).ready(function () {
  $('button').click(function (param) {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log("clicked");
      // var btn = this;
      // var id;
      // var name;
      db.collection("groups").doc(btn.value()).collection("members")
      .add({
        memberId: user.uid
      });
    });

  });
});
