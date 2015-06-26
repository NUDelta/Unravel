define([],
  function () {
    return function () {
      var originalAddEventListener = EventTarget.prototype.addEventListener;
      (function () {
        EventTarget.prototype.addEventListener = function () {
          var args = [].splice.call(arguments, 0);

          var eventHandlerFn = args[1];

          args[1] = function () {
            var wrapperArgs = [].splice.call(arguments, 0);

            var path = window.unravelAgent.$(this).getPath();

            if (path) {
              window.dispatchEvent(new CustomEvent("eventTrace", {
                "detail": {
                  path: window.unravelAgent.$(this).getPath(),
                  type: JSON.stringify(args[0]),
                  event: JSON.stringify(wrapperArgs[0])
                }
              }));
            }

            eventHandlerFn.apply(this, wrapperArgs);
          };

          return originalAddEventListener.apply(this, args);
        }
      })();

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
