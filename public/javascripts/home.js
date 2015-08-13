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
  var currentMoment = moment().format('MMMM Do YYYY, h:mm:ss a');
  $effect2.append("<p>" + currentMoment + "</p>");
});

$("#test3").click(function () {
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

var $effect3 = $("#effect3");

var fourthFunction = function (triggerData) {
  $effect3.show("fast");
  window.setTimeout(eighthFunction, 1000);
};

var thirdFunction = function () {
  $("#effect1").off();
  $("#effect1").on("foo-bar", fourthFunction);
  sixthFunction();
};

var seventhFunction = function () {
  $("#effect1").trigger("foo-bar", "some-trigger-data");
};

var sixthFunction = function () {
  var eightFunction = $.proxy(seventhFunction, this);
  window.setTimeout(eightFunction, 1000);
};

var eighthFunction = function () {
  $effect3.hide("fast");
};