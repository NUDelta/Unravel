define([
  "jQueryInjector",
  "underscoreInjector",
  "libDetectInjector",
  "observerInjector",
  "jsTraceInjector",
  "whittleInjector"
], function (jQueryInjector, underscoreInjector, libDetectInjector, observerInjector, jsTraceInjector, whittleInjector) {
  function UnravelAgent() {
    if (!(this instanceof UnravelAgent)) {
      throw new TypeError("UnravelAgent constructor cannot be called as a function.");
    }
  }

  //public static
  UnravelAgent.install = function () {
    //Install global agent in web page
    UnravelAgent.runInPage(function () {
      window.unravelAgent = {};
    });
    UnravelAgent.runInPage(jQueryInjector);
    UnravelAgent.runInPage(underscoreInjector);
    UnravelAgent.runInPage(libDetectInjector);
    UnravelAgent.runInPage(jsTraceInjector);
    UnravelAgent.runInPage(observerInjector);
    UnravelAgent.runInPage(whittleInjector);
    UnravelAgent.runInPage(function () {
      window.unravelAgent.keepAlive = function () {
        if (window.unravelAgent.keepAliveInterval) {
          window.clearInterval(window.unravelAgent.keepAliveInterval);
        }

        window.unravelAgent.keepAliveInterval = window.setInterval(function () {
          window.dispatchEvent(new CustomEvent("UnravelKeepAlive", {"detail": 1}));
        }, 500);
      };

      window.unravelAgent.selectElement = function (el) {
        window.dispatchEvent(new CustomEvent("ElementSelected", {"detail": unravelAgent.$(el).getPath()}));
      };
    });


  };

  UnravelAgent.runInPage = function (fn, callback) {
    var args = Array.prototype.slice.call(arguments, 2);
    var evalCode = "(" + fn.toString() + ").apply(this, " + JSON.stringify(args) + ");";
    chrome.devtools.inspectedWindow.eval(evalCode, {}, callback);
  };

  UnravelAgent.prototype = {
    //instance methods
    constructor: UnravelAgent,

    keptAlive: false,
    strikeCount: 0,

    keepAlive: function (fn, callback) {
      UnravelAgent.runInPage(function () {
        window.unravelAgent.keepAlive();
      });

      var that = this;
      window.setInterval(function () {
        if (that.keptAlive) {
          that.keptAlive = false;
        } else {
          that.strikeCount += 1;
          if (that.strikeCount == 2) {
            console.warn("Unravel: Warning, page disconnected. Ignore this if a breakpoint is set. Otherwise close and reopen the dev tool window.");
            if (window.unravelMocks !== true) {
              //window.location.reload();
            }
          }
        }
      }, 1000);
    },

    receiveKeepAlive: function () {
      this.keptAlive = true;
    }
  };

  return UnravelAgent;
});