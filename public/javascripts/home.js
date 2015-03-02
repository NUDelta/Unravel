$("#test1").click(function () {
  var $effect1 = $("#effect1");
  if ($effect1.is(":visible")) {
    $effect1.hide();
  } else {
    $effect1.show();
  }
});

$("#test2").click(function () {
  var $effect2 = $("#effect2");
  $effect2.append("<span> A </span>")
});
