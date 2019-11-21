// Function that creates a new document in the users collection
function createUser() {

  firebase.auth().onAuthStateChanged(function (user) {

    // if the current user logged in user
    // is authenticated, then grab "uid" "displayName" and "email"
    // use "set()" with merge (if document did not exist it will be created)
    if (user) {
      console.log("Signed in");
      db.collection("users").doc(user.uid).set({
        "name": user.displayName,
        "email": user.email,
      }, { merge: true });
      
    } else {
      console.log("Not signed in");
    }
  });
}