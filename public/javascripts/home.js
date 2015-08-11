$("#test1").click(function () {
  secondFunction("bim", "Bazz");
});

var secondFunction = function (a, b) {
  (function () {
    var foo = function () {
      thirdFunction(b);
    };
    foo();
  })();
};

var thirdFunction = function () {
  var c = arguments[0];
  var $effect1 = $("#effect1");
  if ($effect1.is(":visible")) {
    $effect1.hide();
  } else {
    $effect1.show();
  }
  console.log(c);
};

$("#test2").click(function () {
  var $effect2 = $("#effect2");
  var currentMoment = moment().format('MMMM Do YYYY, h:mm:ss a');
  $effect2.append("<p>" + currentMoment + "</p>");
});
