$(document).ready(function () {
    // events
    var menuAnimationSlideIn = {
      "left": "0px",
      "easing": "swing"
    };
    var menuAnimationSlideOut = {
      "left": "-100%",
      "easing": "swing"
    };
    var spaceAnimationSlideIn = {
      "left": "200px",
      "easing": "swing"
    };
    var spaceAnimationSlideOut = {
      "left": "-100%",
      "easing": "swing"
    };
    $("#ico1").click(function (event) {
        console.log("burgerer-clicked");
      // $("#popupMenuBg").animate(menuAnimationSlideIn, 300);
      $("#popupMenu").animate(menuAnimationSlideIn, 300);
      $("#closeMenu").animate(spaceAnimationSlideIn, 300);
    });

    $("#closeMenu").click(function (event) {
      // $("#popupMenuBg").animate(menuAnimationSlideOut, 500);
      $("#popupMenu").animate(menuAnimationSlideOut, 500);
      $("#closeMenu").animate(spaceAnimationSlideOut, 500);
    });
    var i;
    for (i = 0; i < 3; i++) {
      var item = $("<div class='burger-item'>suma</div>");
      $("#popupMenu").add(item);
    }

    $('#popupMenu').css({
      "position": "absolute",
      "top": "0",
      "left": "-100%",
      "height": "100%",
      "width": "200px",
      "background-color":"#464866"
    })

    $("#closeMenu").css({
      //"background-color":"green",
      "left": "-100%",
      "top": "0",
      "width": "auto",
      "height": "100%",
      "position": "absolute"
    })
  });