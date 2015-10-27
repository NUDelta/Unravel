define([],
  function () {
    return function () {
      var originalAddEventListener = EventTarget.prototype.addEventListener;
      (function () {
        var unravelDelete = null; //Leave here for detection

        EventTarget.prototype.addEventListener = function () {
          var unravelDelete = null; //Leave here for detection

          var args = [].splice.call(arguments, 0);
          var eventHandlerFn = args[1];

          args[1] = function () {
            var unravelDelete = null; //Leave here for detection

            var wrapperArgs = [].splice.call(arguments, 0);
            eventHandlerFn.apply(this, wrapperArgs);

            var path = window.unravelAgent.$(this).getPath();

            if (path) {
              window.dispatchEvent(new CustomEvent("eventTrace", {
                "detail": {
                  path: window.unravelAgent.$(this).getPath()
                }
              }));
            }
          };

          return originalAddEventListener.apply(this, args);
        }
      })();

      window.unravelAgent.traceJsOn = function () {
        window.unravelAgent.storedCalls = {};

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

                  var stackTrace = error.stack.replace(/(?:\r\n|\r|\n)/g, '|||');
                  if (stackTrace.indexOf("getPath") < 0) {
                    var traceObj = {
                      "detail": {
                        stack: error.stack.replace(/(?:\r\n|\r|\n)/g, '|||'),
                        functionName: functionName,
                        args: strArgs
                      }
                    };
                    window.dispatchEvent(new CustomEvent("JSTrace", traceObj));
                  }
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

      window.unravelAgent.beautifyJS = function () {
        var keepKeys = [
          "applicationCache",
          "caches",
          "closed",
          "Components",
          "console",
          "content",
          "controllers",
          "crypto",
          "defaultStatus",
          "devicePixelRatio",
          "dialogArguments",
          "directories",
          "document",
          "frameElement",
          "frames",
          "fullScreen",
          "globalStorage",
          "history",
          "innerHeight",
          "innerWidth",
          "length",
          "location",
          "locationbar",
          "localStorage",
          "menubar",
          "messageManager",
          "mozAnimationStartTime",
          "mozInnerScreenX",
          "mozInnerScreenY",
          "mozPaintCount",
          "name",
          "navigator",
          "opener",
          "outerHeight",
          "outerWidth",
          "pageXOffset",
          "pageYOffset",
          "sessionStorage",
          "parent",
          "performance",
          "personalbar",
          "pkcs11",
          "returnValue",
          "screen",
          "screenX",
          "screenY",
          "scrollbars",
          "scrollMaxX",
          "scrollMaxY",
          "scrollX",
          "scrollY",
          "self",
          "sessionStorage",
          "sidebar",
          "status",
          "statusbar",
          "toolbar",
          "top",
          "window",
          "external",
          "console",
          "chrome",
          "unravelAgent"
        ];

        var http = new XMLHttpRequest();
        http.open("POST", "https://localhost:9001/htmlUrl/" + encodeURIComponent(window.location.href) + "/basePath/" + encodeURIComponent(window.location.origin + window.location.pathname), true);

        http.onreadystatechange = function () {
          if (http.readyState == 4 && http.status == 200) {
            try {
              window.unravelAgent.response = http.responseText;

              var deleteKeys = [];

              for (var key in window) {
                if (window.hasOwnProperty(key)) {
                  if (!window.unravelAgent._(keepKeys).contains(key)) {
                    deleteKeys.push(key);
                  }
                }
              }

              window.dispatchEvent(new CustomEvent("REWRITE", {detail: "foo"}));
              //console.log("Deleting", JSON.stringify(deleteKeys));

              var wontDeleteKeys = [];
              window.unravelAgent._(deleteKeys).each(function (key) {
                var wasDeleted = delete window[key];
                if (!wasDeleted) {
                  wontDeleteKeys.push(key);
                }
              });

              window.unravelAgent._(wontDeleteKeys).each(function (key) {
                window[key] = undefined;
                delete window[key];
                if (window[key]) {
                  console.log("Secondary delete didn't work:", key);
                }
              });

              if (window.localStorage && window.localStorage.clear) {
                window.localStorage.clear();
              }

              document.open('text/html');
              document.write("<html><head></head><body></body></html>");
              document.close();

              document.open('text/html');
              document.write(http.responseText);
              document.close();
            } catch (err) {
              //debugger;
            }
          }
        };

        http.setRequestHeader('Content-Type', 'application/json');
        http.send(JSON.stringify({
          originalHTML: window.unravelAgent.$("html")[0].outerHTML
        }));
        //
        //window.unravelAgent.$.ajax("https://localhost:9001/htmlUrl/" + encodeURIComponent(window.location.href) + "/basePath/" + encodeURIComponent(window.location.origin + window.location.pathname), {
        //  data: JSON.stringify({
        //    originalHTML: window.unravelAgent.$("html")[0].outerHTML
        //  }),
        //  contentType: 'application/json',
        //  type: 'POST'
        //});
      };

    };
  });
