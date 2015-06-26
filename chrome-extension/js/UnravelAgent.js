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

  UnravelAgent.reloadInjecting = function () {
    var agentFn = function () {
      window.unravelAgent = {};
    };

    var eventsFn = function () {
      window.unravelAgent.selectElement = function (el) {
        window.dispatchEvent(new CustomEvent("ElementSelected", {"detail": unravelAgent.$(el).getPath()}));
      };

      window.unravelAgent.$(window.document).ready(function () {
        window.dispatchEvent(new CustomEvent("InjectionDone", {"detail": ""}));
      });
    };

    var f1 = "(" + agentFn.toString() + ").apply(this, []); ";
    var f2 = "(" + jQueryInjector.toString() + ").apply(this, []); ";
    var f3 = "(" + underscoreInjector.toString() + ").apply(this, []); ";
    var f4 = "(" + libDetectInjector.toString() + ").apply(this, []); ";
    var f5 = "(" + jsTraceInjector.toString() + ").apply(this, []); ";
    var f6 = "(" + observerInjector.toString() + ").apply(this, []); ";
    var f7 = "(" + whittleInjector.toString() + ").apply(this, []); ";
    var f8 = "(" + eventsFn.toString() + ").apply(this, []); ";

    chrome.devtools.inspectedWindow.reload({
      ignoreCache: true,
      injectedScript: f1 + f2 + f3 + f4 + f5 + f6 + f7 + f8
    });
  };

  //public static
  UnravelAgent.checkActive = function (callback) {
    UnravelAgent.runInPage(function () {
      return !!window.unravelAgent;
    }, callback);
  };

  UnravelAgent.runInPage = function (fn, callback) {
    var args = Array.prototype.slice.call(arguments, 2);
    var evalCode = "(" + fn.toString() + ").apply(this, " + JSON.stringify(args) + ");";
    chrome.devtools.inspectedWindow.eval(evalCode, {}, callback);
  };

  UnravelAgent.prototype = {
    //instance methods
    constructor: UnravelAgent,

    isInjecting: false
  };

  return UnravelAgent;
});