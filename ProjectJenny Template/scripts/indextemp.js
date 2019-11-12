$(document).ready(function() {
  var currentSelection = 0;



  $("#select1").click(function() {
    currentSelection = 0;
    selectItem(currentSelection);
  });

  $("#select2").click(function() {
    currentSelection = 1;
    selectItem(currentSelection);
  });

  $(".test").click(function() {
    var newgrp = $("<div><span>Group Name</span>Join<a href='javascript:void(0);' class='remove'>remove</a> </div>");
    $("#homecont2").prepend(newgrp);
  })

  $(document).on("click", "a.remove", function() {
    $(this).parent().remove();
  });

});

function selectItem(num) {
  if (num == 0) {
    $("#select1").css({
      "background-color": "#646686"
    });
    $("#select2").css({
      "background-color": "#464866"
    });
    $("#homecont1").css("display", "block");
    $("#homecont2").css("display", "none");
  } else {
    $("#select2").css({
      "background-color": "#646686"
    });
    $("#select1").css({
      "background-color": "#464866"
    });
    $("#homecont1").css("display", "none");
    $("#homecont2").css("display", "block");
  }
}