define([
  "backbone",
  "underscore",
  "jquery",
  "datatables",
  "handlebars",
  "text!templates/view.html"
], function (Backbone, _, $, datatables, Handlebars, viewTemplate) {
  return Backbone.View.extend({
    template: Handlebars.compile(viewTemplate),

    events: {
      "click #start": "start",
      "click #stop": "stop",
      "click #clear": "clearTable",
      "click #reduce": "reduceTable",
      "click #detect": "detect",
      "click .inspectElement": "inspectElement"
    },

    currentPath: "",

    elementMap: {},

    dataTable: null,

    allMutations: [],

    initialize: function (options) {
      console.log("Delta View initialized.");
    },

    render: function () {
      this.$el.html(this.template());
      this.dataTable = this.$("table").DataTable();
      if (mockData) {
        this.handleMutations(mockData);
      }
    },

    start: function () {
      chrome.devtools.inspectedWindow.eval("startObserving('" + this.currentPath + "')", {useContentScriptContext: true});
    },

    stop: function () {
      chrome.devtools.inspectedWindow.eval("stopObserving()", {useContentScriptContext: true});
    },

    clearTable: function () {
      this.dataTable.row().remove().draw(false);
      this.allMutations = [];

      this.$("#libResults").hide();
      this.$("#libResults ul").empty();
    },

    reduceTable: function () {
      var reduceObj = {};
      _(this.allMutations).each(function (mutation) {
        var id = (mutation.path || 'none');
        //(mutation.attributeName || '2')
        //(mutation.oldValue || '3');
        //(mutation.type || '4');
        if (reduceObj[id]) {
          reduceObj[id].count += 1
        } else {
          reduceObj[id] = {
            count: 1,
            mutation: mutation
          }
        }
      });

      this.clearTable();

      var entries = _(reduceObj).values();
      _(entries).each(function (entry) {
        this.dataTable.row.add([
          "<a href='javascript:' class='inspectElement' data-path='" + entry.mutation.path + "'>" + "(" + this.pad(entry.count, 5) + ") " + entry.mutation.path + "</a>",
          entry.mutation.selector,
          entry.mutation.attributeName || '',
          entry.mutation.oldValue || '',
          entry.mutation.type || ''
          //mutation.previousSibling
          //mutation.nextSibling
        ]);
      }, this);
      this.dataTable.draw()
    },

    elementSelected: function (cssPath) {
      if (this.currentPath != cssPath) {
        this.currentPath = cssPath;
      }
      this.$("#tagTitle").text("Selected Element: " + cssPath);

      //this.dataTable.column().search(this.currentSelector).draw();
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

    storeMutation: function (mutation) {
      this.allMutations.push(mutation)
    },

    handleMutations: function (mutations) {
      _(mutations).map(function (mutation) {
        mutation.selector = this.parseSelector(mutation.target);
        this.storeMutation(mutation);
        this.dataTable.row.add([
            "<a href='javascript:' title='Inspect Element' class='inspectElement' data-path='" + mutation.path + "'>" + mutation.path + " <i class='glyphicon glyphicon-search'></i></a>",
            mutation.selector || '',
            mutation.attributeName || '',
            mutation.oldValue || '',
            mutation.type || ''
            //mutation.target
            //mutation.previousSibling
            //mutation.nextSibling
          ]
        );
      }, this);
      this.dataTable.draw()
    },

    handleLibsDetected: function (responses) {
      var arr = JSON.parse(responses);
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
    },

    detect: function () {
      chrome.devtools.inspectedWindow.eval("detectLibs()", {useContentScriptContext: true});
    },

    pad: function (num, size) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    },

    inspectElement: function (e) {
      var path = $(e.target).attr("data-path");
      var doInspect = function (path) {
        inspect($(path)[0]);
      };

      var evalCode = "(" + doInspect.toString() + ").apply(this, ['" + path + "']);";

      chrome.devtools.inspectedWindow.eval(evalCode, {});
    }
  });
});
