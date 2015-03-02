define([],
  function () {
    return function () {
      window.raleAgent.traceJsOn = function () {

        if (!window.raleAgent.functionPool) {
          window.raleAgent.functionPool = {};
        }

        for (var func in document) {
          if (typeof(document[func]) === 'function') {
            window.raleAgent[func] = document[func];
            (function () {
              var functionName = func;
              document[functionName] = function () {
                var args = [].splice.call(arguments, 0);

                var error = new Error();
                window.dispatchEvent(new CustomEvent("JSTrace", {"detail": error.stack}));

                return window.raleAgent[functionName].apply(document, args);

              }
            })();
          }
        }
        console.log("Javascript tracing enabled.")
      }

      window.raleAgent.traceJsOff = function () {
        if (!window.raleAgent.functionPool) {
          return;
        }

        for (var func in window.document) {
          if (typeof(window.document[func]) === 'function') {
            window.document[func] = window.raleAgent.functionPool[func];
          }
        }

        console.log("Javascript tracing disabled.")
      };
    };
  });
