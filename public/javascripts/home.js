(function () {

  var testElement = document.getElementById("test1");

  var eventHandlerFn = function () {
    var $effect1 = $("#effect1");
    if ($effect1.is(":visible")) {
      $effect1.hide();
    } else {
      $effect1.show();
    }
  };

  testElement.addEventListener("click", eventHandlerFn);
//
//$("#test1").click(function () {
//  var $effect1 = $("#effect1");
//  if ($effect1.is(":visible")) {
//    $effect1.hide();
//  } else {
//    $effect1.show();
//  }
//});


  $("#test2").click(function () {
    var $effect2 = $("#effect2");
    var currentMoment = moment().format('MMMM Do YYYY, h:mm:ss a');
    $effect2.append("<p>" + currentMoment + "</p>");
  });

})();

/*

 $("#test3").click(function () {
 var a = new Error();
 console.log(a.stack);
 var b = a.stack.replace(/(?:\r\n|\r|\n)/g, '|||');

 console.log("");
 var c = b.split('|||').slice(1).map(function (line) {
 var tokens = line.replace(/^\s+/, '').split(/\s+/).slice(1);

 var urlLike = tokens.pop().replace(/[\(\)\s]/g, '');
 var locationParts = urlLike.split(':');
 var lastNumber = locationParts.pop();
 var possibleNumber = locationParts[locationParts.length - 1];
 if (!isNaN(parseFloat(possibleNumber)) && isFinite(possibleNumber)) {
 var lineNumber = locationParts.pop();
 locationParts = [locationParts.join(':'), lineNumber, lastNumber];
 } else {
 locationParts = [locationParts.join(':'), lastNumber, undefined];
 }

 var functionName = (!tokens[0] || tokens[0] === 'Anonymous') ? undefined : tokens[0];
 return {
 fn: functionName,
 script: locationParts[0],
 lineNumber: locationParts[1],
 charNumber: locationParts[2]
 }
 }, this);

 console.log(c);
 });

 function makeFunc() {
 var fn = document.getElementById;

 function displayName() {
 return fn;
 }

 return displayName;
 }

 var myFunc = makeFunc();
 myFunc();


 $("#test4").click(function () {
 var a = myFunc();
 var effect4 = a.call(document, "effect4");
 //console.log(effect4);

 var $effect1 = $("#effect4");
 //if ($effect1.is(":visible")) {
 //  $effect1.hide();
 //} else {
 //  $effect1.show();
 //}
 });

 function asdf() {
 var makeFunc = function () {
 var fn = document.getElementById;

 function displayName() {
 return fn;
 }

 return displayName;
 };

 var myFunc = makeFunc();
 var oldGetElementById = myFunc();

 document.getElementById = function () {
 return "foo"
 };

 console.log(oldGetElementById.call(document, "myDiv"));
 console.log(document.getElementById("myDiv"))
 }

 */