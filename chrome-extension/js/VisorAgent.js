define([
  "jQueryInjector",
  "underscoreInjector",
  "libDetectInjector",
  "observerInjector",
  "jsTraceInjector"
], function (jQueryInjector, underscoreInjector, libDetectInjector, observerInjector, jsTraceInjector) {
  function VisorAgent() {
    if (!(this instanceof VisorAgent)) {
      throw new TypeError("VisorAgent constructor cannot be called as a function.");
    }
  }

  //public static
  VisorAgent.install = function () {
    //Install global agent in web page
    VisorAgent.runInPage(function () {
      window.visorAgent = {
        keepAlive: function () {
          window.setInterval(function () {
            window.dispatchEvent(new CustomEvent("VisorKeepAlive", {"detail": 1}));
          }, 250);
        },
        selectElement: function (el) {
          window.dispatchEvent(new CustomEvent("ElementSelected", {"detail": visorAgent.$(el).getPath()}));
        }
      };
    });
    VisorAgent.runInPage(jQueryInjector);
    VisorAgent.runInPage(underscoreInjector);
    VisorAgent.runInPage(libDetectInjector);
    VisorAgent.runInPage(jsTraceInjector);
    VisorAgent.runInPage(observerInjector);
  };

  VisorAgent.runInPage = function (fn, callback) {
    var args = Array.prototype.slice.call(arguments, 2);
    var evalCode = "(" + fn.toString() + ").apply(this, " + JSON.stringify(args) + ");";
    chrome.devtools.inspectedWindow.eval(evalCode, {}, callback);
  };

  VisorAgent.prototype = {
    //instance methods
    constructor: VisorAgent,

    keptAlive: false,
    strikeCount: 0,

    keepAlive: function (fn, callback) {
      VisorAgent.runInPage(function () {
        window.visorAgent.keepAlive();
      });

      var that = this;
      window.setInterval(function () {
        if (that.keptAlive) {
          that.keptAlive = false;
        } else {
          that.strikeCount += 1;
          if (that.strikeCount == 2) {
            console.log("Visor extension reloaded.");
            if (window.visorMocks !== true) {
              window.location.reload();
            }
          }
        }
      }, 1000);
    },

    receiveKeepAlive: function () {
      this.keptAlive = true;
    }
  };

  return VisorAgent;
});