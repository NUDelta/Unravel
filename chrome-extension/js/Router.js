define([
  "backbone",
  "View",
  "RaleAgent"
], function (Backbone, HomeView, RaleAgent) {

  var Router = Backbone.Router.extend({

    initialize: function () {
      RaleAgent.install();
    },

    routes: {
      "": "start"
    },

    start: function () {
      this.homeView = new HomeView();
      this.homeView.render();
      document.body.appendChild(this.homeView.el);

      this.on("elementSelectChange", function (cssPath) {
        this.homeView.elementSelected(cssPath);
      }, this);

      this.on("mutation", function (mutations) {
        this.homeView.handleMutations(mutations);
      }, this);

      this.on("JSTrace", function (data) {
        this.homeView.handleJSTrace(data);
      }, this);
    }
  });
  return Router;
});
