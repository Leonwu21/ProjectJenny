

$(document).ready(function () {
    $('button').click(function (param) {
        console.log("clicked");
        var btn = this;
        var id;
        var name;
        db.collection("groups").doc(btn.value())
            .get().then(function (snap) {
                id = snap.id;
                name = snap.name;
                console.log("button id" +  btn.value());
            });
        joinGroup(name,id);
    });
});