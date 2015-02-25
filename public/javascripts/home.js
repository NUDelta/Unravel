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

/*
var functionPool = {}; // create a variable to hold the original versions of the functions

for (var func in window) // scan all items in window scope
{
  if (typeof(window[func]) === 'function') // if item is a function
  {
    functionPool[func] = window[func]; // store the original to our global pool
    (function () { // create an closure to maintain function name
      var functionName = func;
      window[functionName] = function () { // overwrite the function with our own version
        var args = [].splice.call(arguments, 0); // convert arguments to array
        // do the logging before callling the method
        console.log('logging: ' + functionName + '(' + args.join(',') + ')');
        // call the original method but in the window scope, and return the results
        return functionPool[functionName].apply(window, args);
        // additional logging could take place here if we stored the return value ..
      }
    })();
  }
}

for (var func in document) // scan all items in window scope
{
  if (typeof(document[func]) === 'function') // if item is a function
  {
    functionPool[func] = document[func]; // store the original to our global pool
    (function () { // create an closure to maintain function name
      var functionName = func;
      document[functionName] = function () { // overwrite the function with our own version
        var args = [].splice.call(arguments, 0); // convert arguments to array
        // do the logging before callling the method
        console.log('logging: ' + functionName + '(' + args.join(',') + ')');
        var error = new Error();
        console.log(error.stack);
        console.log("");
        // call the original method but in the window scope, and return the results
        return functionPool[functionName].apply(document, args);
        // additional logging could take place here if we stored the return value ..
      }
    })();
  }
}
  */