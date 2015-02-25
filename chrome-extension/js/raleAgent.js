define([
  "jQueryInjector",
  "libDetectInjector"
], function (jQueryInjector, libDetectInjector) {
  function RaleAgent() {
    if (!(this instanceof RaleAgent)) {
      throw new TypeError("RaleAgent constructor cannot be called as a function.");
    }
  }

  //public static
  RaleAgent.install = function () {
    //Install global agent in web page
    RaleAgent.runInPage(function () {
      window.raleAgent = {};
    });
    RaleAgent.runInPage(jQueryInjector);
    RaleAgent.runInPage(libDetectInjector);
  };

  RaleAgent.runInPage = function (fn, callback) {
    var args = Array.prototype.slice.call(arguments, 2);
    var evalCode = "(" + fn.toString() + ").apply(this, " + JSON.stringify(args) + ");";
    chrome.devtools.inspectedWindow.eval(evalCode, {}, callback);
  };

  RaleAgent.prototype = {
    constructor: RaleAgent
    //instance methods
  };

  return RaleAgent;
});