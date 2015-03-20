define([],
  function () {
    return function () {
      window.unravelAgent.traceJsOn = function () {
        if (window.unravelAgent.traceJsActive) {
          window.unravelAgent.traceJsOff();
        }
        window.unravelAgent.traceJsActive = true;

        if (!window.unravelAgent.functionPool) {
          window.unravelAgent.functionPool = {};
        }

        for (var func in document) {
          if (typeof(document[func]) === 'function') {
            window.unravelAgent.functionPool[func] = document[func];
            (function () {
              var functionName = func;  //closure in the func reference
              document[functionName] = function () {
                var args = [].splice.call(arguments, 0);

                if (functionName.indexOf("createEvent") < 0) {
                  var error = new Error();
                  var strArgs;
                  try {
                    strArgs = JSON.stringify(args);
                  } catch (ignored) {
                  }

                  window.dispatchEvent(new CustomEvent("JSTrace", {
                    "detail": {
                      stack: error.stack.replace(/(?:\r\n|\r|\n)/g, '|||'),
                      functionName: functionName,
                      args: strArgs
                    }
                  }));
                }

                return window.unravelAgent.functionPool[functionName].apply(document, args);
              }
            })();
          }
        }
      };

      window.unravelAgent.traceJsOff = function () {
        if (!window.unravelAgent.functionPool) {
          return;
        }

        for (var func in window.document) {
          if (typeof(window.document[func]) === 'function') {
            window.document[func] = window.unravelAgent.functionPool[func];
          }
        }

        window.unravelAgent.traceJsActive = false;
      };
    };
  });
