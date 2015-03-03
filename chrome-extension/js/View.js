define([
  "backbone",
  "underscore",
  "jquery",
  "datatables",
  "handlebars",
  "VisorAgent",
  "text!templates/view.html"
], function (Backbone, _, $, datatables, Handlebars, VisorAgent, viewTemplate) {
  return Backbone.View.extend({
    template: Handlebars.compile(viewTemplate),

    events: {
      "click #start": "start",
      "click #stop": "stop",
      "click #clear": "clearTable",
      "click #reduce": "reduceTable",
      "click #detect": "detect",
      "click #trace": "trace",
      "click .inspectElement": "inspectElement"
    },

    currentPath: "",

    elementMap: {},

    dataTable: null,

    pathsRows: [],

    initialize: function (options) {
      console.log("Delta View initialized.");
      this.start();
    },

    render: function () {
      this.$el.html(this.template());
      this.dataTable = this.$("table").DataTable();
      if (mockData) {
        this.handleMutations(mockData);
      }
    },

    start: function () {
      var callback = function (currentPath) {
        console.log("Started observing", (currentPath || "non"));
      };

      VisorAgent.runInPage(function () {
        return visorAgent.startObserving();
      }, callback, this.currentPath);
    },

    stop: function () {
      VisorAgent.runInPage(function () {
        return visorAgent.stopObserving();
      }, callback, this.currentPath);

      visorAgent.traceJsOff();
    },

    clearTable: function () {
      this.dataTable.row().remove().draw(false);
      this.pathsRows = [];

      this.$("#libResults").hide();
      this.$("#libResults ul").empty();
      visorAgent.traceJsOff();
    },

    trace: function () {
      console.log("activating trace");
      VisorAgent.runInPage(function () {
        visorAgent.traceJsOn();
      });
    },

    handleJSTrace: function (data) {
      var c = data.split("|||    at ");
      var d = c.slice(1);

      console.log(JSON.stringify(d));
    },

    elementSelected: function (cssPath) {
      if (this.currentPath != cssPath) {
        this.currentPath = cssPath;
      }
      this.$("#tagTitle").text("Currently selected element: " + cssPath);
    },

    parseSelector: function (htmlString) {
      var $el = $(htmlString);

      if (!$el.prop || !$el.prop("tagName")) {
        return "";
      }

      var tagName = $el.prop("tagName").toLowerCase();
      var idName = $el.attr("id") || "";
      if (idName.length > 0) {
        idName = "#" + idName;
      }
      var nameAttr = $el.attr("name") || "";
      if (nameAttr.length > 0) {
        nameAttr = '[name="' + nameAttr + '"]';
      }

      var className;
      try {
        className = "." + $el.attr("class").split(" ").join(".");
      } catch (err) {
        className = "";
      }

      return tagName + idName + className + nameAttr;
    },

    handleMutations: function (mutations) {
      _(mutations).map(function (mutation) {
        mutation.selector = this.parseSelector(mutation.target);
        var path = (mutation.path || "");

        if (this.pathsRows[path]) {
          var data = this.pathsRows[path].data();
          data[0] = data[0] + 1;
          this.pathsRows[path].data(data);
        } else {
          var dt = this.dataTable.row.add([
            1,
            "<a href='javascript:' title='Inspect Element' class='inspectElement' data-path='" + mutation.path + "'>" + mutation.path + " <i class='glyphicon glyphicon-search'></i></a>",
            mutation.selector || '',
            mutation.attributeName || '',
            mutation.oldValue || '',
            mutation.type || ''
          ]);
          this.pathsRows[path] = dt.row(dt.index());
        }
      }, this);
      this.dataTable.draw()
    },

    inspectElement: function (e) {
      var path = $(e.target).attr("data-path");
      console.log('here');
      var doInspect = function (path) {
        if (!path) {
          console.error("No path provided when trying to inspect.");
          return;
        } else {
          console.log("Inspecting path", path, visorAgent.$(path)[0])
        }
        inspect(visorAgent.$(path)[0]);
      };

      VisorAgent.runInPage(doInspect, null, path);
    },

    inspectSource: function () {
      var url, lineNumber, callback;

      callback = function () {
      };
      chrome.devtools.panels.openResource(url, lineNumber, callback);
    },

    detect: function () {
      var callback = function (arr, exception) {
        this.$("#libResults").show();

        var $resultList = this.$("#libResults ul");
        $resultList.empty();

        if (arr.length < 1) {
          $resultList.append("<li>None Detected.</li>")
        } else {
          _(arr).each(function (o) {
            $resultList.append("<li>" + o.lib + ": " + o.value + "</li>")
          }, this);
        }
      };

      VisorAgent.runInPage(function () {
        return visorAgent.libDetect();
      }, callback);
    }
  });
});
