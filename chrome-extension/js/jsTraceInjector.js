define([],
  function () {
    return function () {
      window.visorAgent.traceJsOn = function () {

        if (!window.visorAgent.functionPool) {
          window.visorAgent.functionPool = {};
        }

        for (var func in document) {
          if (typeof(document[func]) === 'function') {
            window.visorAgent[func] = document[func];
            (function () {
              var functionName = func;
              document[functionName] = function () {
                var args = [].splice.call(arguments, 0);

                var error = new Error();
                window.dispatchEvent(new CustomEvent("JSTrace", {"detail": error.stack}));

                return window.visorAgent[functionName].apply(document, args);

              }
            })();
          }
        }
        console.log("Javascript tracing enabled.")
      }

      window.visorAgent.traceJsOff = function () {
        if (!window.visorAgent.functionPool) {
          return;
        }

        for (var func in window.document) {
          if (typeof(window.document[func]) === 'function') {
            window.document[func] = window.visorAgent.functionPool[func];
          }
        }

        console.log("Javascript tracing disabled.")
      };
    };
  });
