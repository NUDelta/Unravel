define([
  "backbone",
  "View",
  "UnravelAgent"
], function (Backbone, HomeView, UnravelAgent) {

  var Router = Backbone.Router.extend({

    initialize: function () {
      UnravelAgent.install();
      this.unravelAgent = new UnravelAgent();
      this.unravelAgent.keepAlive();
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

      this.on("UnravelKeepAlive", function (data) {
        this.unravelAgent.receiveKeepAlive(data);
      }, this);
    }
  });
  return Router;
});
