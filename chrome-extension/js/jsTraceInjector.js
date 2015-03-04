define([],
  function () {
    return function () {
      window.visorAgent.traceJsOn = function () {

        if (!window.visorAgent.functionPool) {
          window.visorAgent.functionPool = {};
        }

        for (var func in document) {
          if (typeof(document[func]) === 'function') {
            window.visorAgent.functionPool[func] = document[func];
            (function () {
              var functionName = func;  //closure in the func reference
              document[functionName] = function () {
                var args = [].splice.call(arguments, 0);

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

                return window.visorAgent.functionPool[functionName].apply(document, args);
              }
            })();
          }
        }
      };

      window.visorAgent.traceJsOff = function () {
        if (!window.visorAgent.functionPool) {
          return;
        }

        for (var func in window.document) {
          if (typeof(window.document[func]) === 'function') {
            window.document[func] = window.visorAgent.functionPool[func];
          }
        }
      };
    };
  });
