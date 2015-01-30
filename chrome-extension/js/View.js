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
      "click #clear": "clearTable",
      "click #reduce": "reduceTable"
    },

    currentSelector: "",

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

    clearTable: function () {
      this.dataTable.row().remove().draw(false);
      this.allMutations = [];
    },

    reduceTable: function () {
      var reduceObj = {};
      _(this.allMutations).each(function (mutation) {
        var id = (mutation.selector || '1') +
          (mutation.attributeName || '2') +
          (mutation.oldValue || '3') +
          (mutation.type || '4');
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
            "(" + entry.count + ") " + entry.mutation.selector,
            entry.mutation.attributeName || '',
            entry.mutation.oldValue || '',
            entry.mutation.type || ''
            //mutation.previousSibling
            //mutation.nextSibling
          ]
        );
      }, this);
      this.dataTable.draw()
    },

    elementSelected: function (htmlString) {
      var newSelector = this.parseSelector(htmlString);

      if (this.currentSelector != newSelector) {
        this.currentSelector = newSelector;
        this.$("#changeList").empty();
      }

      //this.$("#tagTitle").text(" | Selected Element: " + this.currentSelector);

      this.dataTable.column().search(this.currentSelector).draw();
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
    }
  });
});
