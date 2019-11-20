// Function that creates a new document in the users collection
function createUser() {
  
  // if the user logged in
  // user is authenticated, then grab "uid" "displayName" and "email"
  // use "set()" with merge (if document did not exist, it will be created)
  firebase.auth.onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid).set({
      "name": user.displayName,
      "email": user.email,
    }, { merge: true });
  });
}