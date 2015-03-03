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
      window.visorAgent = {};
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
    constructor: VisorAgent
    //instance methods
  };

  return VisorAgent;
});