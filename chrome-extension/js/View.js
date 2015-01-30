define([
  "backbone",
  "underscore",
  "jquery",
  "handlebars",
  "text!templates/view.html",
  "text!templates/table-row.html"
], function (Backbone, _, $, Handlebars, viewTemplate, rowTemplate) {
  return Backbone.View.extend({
    template: Handlebars.compile(viewTemplate),
    rowTemplate: Handlebars.compile(rowTemplate),

    events: {
      "click #clear": "clearTable"
    },

    currentSelector: "",

    elementMap: {},

    initialize: function (options) {
      console.log("Delta View initialized.")
    },

    render: function () {
      this.$el.html(this.template());
      $(function () {
        $("table").resizableColumns({});
      });
    },

    clearTable: function () {
      this.$("#mutationWrapper").empty();
    },

    elementSelected: function (htmlString) {
      var newSelector = this.parseSelector(htmlString);

      if (this.currentSelector != newSelector) {
        this.currentSelector = newSelector;
        this.$("#changeList").empty();
      }

      this.$("#tagTitle").text(" | Selected Element: " + this.currentSelector);
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
      //todo here
    },

    handleMutations: function (mutations) {
      var that = this;
      var displayableMutations = _(mutations).map(function (mutation) {
        mutation.selector = that.parseSelector(mutation.target);
        this.storeMutation(mutation);
        return mutation;
      }, this);

      this.$("#mutationWrapper").append(this.rowTemplate({
        mutations: displayableMutations
      }));
    }
  });
});
