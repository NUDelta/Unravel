// Script loaded every time the devtools are started, the first time the panel is opened.

require.config({
  // paths configuration
  paths: {
    jquery: './lib/jquery-2.1.3.min',
    underscore: './lib/underscore-min',
    backbone: './lib/backbone',
    text: './lib/text',
    bootstrap: './lib/bootstrap.min',
    handlebars_original: './lib/handlebars',
    handlebars: './lib/handlebars-blocks',
    datatables: "lib/jquery.dataTables.min"
  },
  // non-amd library loaders
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      init: function () {
        // exports
        return this.Backbone.noConflict();
      }
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'handlebars_original': {
      deps: ['bootstrap'], // automatically require bootstrap when requiring an handlebars template
      exports: 'Handlebars'
    },
    'handlebars': { // handlebars with custom block helpers
      deps: ['handlebars_original'],
      exports: 'Handlebars'
    }
  }
});

require([
  "jquery",
  "backbone",
  "Router",
  "bootstrap"
], function ($, Backbone, DeltaRouter) {
  $(document).ready(function () {
    console.log = function () {
      var fn = function () {
        console.log.apply(console, Array.prototype.slice.call(arguments, 0));
      };
      var args = Array.prototype.slice.call(arguments, 0);
      var evalCode = "(" + fn.toString() + ").apply(this, " + JSON.stringify(args) + ");";
      chrome.devtools.inspectedWindow.eval(evalCode, {});
    };

    console.error = function () {
      var fn = function () {
        console.error.apply(console, Array.prototype.slice.call(arguments, 0));
      };
      var args = Array.prototype.slice.call(arguments, 0);
      var evalCode = "(" + fn.toString() + ").apply(this, " + JSON.stringify(args) + ");";
      chrome.devtools.inspectedWindow.eval(evalCode, {});
    };

    window.onerror = function (errorMsg, url, lineNumber) {
      console.error(errorMsg, url + ":" + lineNumber)
    };

    var router = new DeltaRouter();
    Backbone.history.start();

    var tabId = chrome.devtools.inspectedWindow.tabId;
    var panelPort = chrome.extension.connect({name: "devtoolspanel"});
    panelPort.postMessage({
      name: "identification",
      data: tabId
    });

    panelPort.onMessage.addListener(_.bind(function (message) {
      if (message && message.target == "page" && message.name == "elementSelected") {
        router.trigger("elementSelectChange", message.data);
      } else if (message && message.target == "page" && message.name == "mutation") {
        router.trigger("mutation", message.data);
      } else if (message && message.target == "page" && message.name == "detectLibs") {
        router.trigger("detectLibs", message.data);
      } else if (message && message.target == "page" && message.name == "JSTrace") {
        router.trigger("JSTrace", message.data);
      } else if (message && message.target == "page" && message.name == "VisorKeepAlive") {
        router.trigger("VisorKeepAlive", message.data);
      }
    }, this));
  });
});
