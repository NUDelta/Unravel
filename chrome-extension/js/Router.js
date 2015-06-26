define([
  "backbone",
  "View",
  "UnravelAgent"
], function (Backbone, HomeView, UnravelAgent) {

  return Backbone.Router.extend({
    initialize: function () {
    },

    routes: {
      "": "start"
    },

    start: function () {
      this.homeView = new HomeView();
      var router = this;

      UnravelAgent.checkActive(function (isActive) {
        router.unravelAgent = new UnravelAgent();
        router.homeView.render(isActive);
        document.body.appendChild(router.homeView.el);

        router.on("elementSelectChange", function (cssPath) {
          router.homeView.elementSelected(cssPath);
        }, router);

        router.on("mutation", function (mutations) {
          router.homeView.handleMutations(mutations);
        }, router);

        router.on("JSTrace", function (data) {
          router.homeView.handleJSTrace(data);
        }, router);

        router.on("InjectionDone", function (data) {
          router.unravelAgent.isInjecting = false;
        }, router);

        router.on("eventTrace", function (data) {
          router.homeView.handleEventTrace(data);
        }, router);

        router.on("TabUpdate", function (data) {
          if (router.unravelAgent.isInjecting) {
            return;
          }

          UnravelAgent.checkActive(function (isActive) {
            if (!isActive) {
              router.unravelAgent.isInjecting = true;  //injection scripts will pass a message back
              UnravelAgent.reloadInjecting();
              router.homeView.reset();
            }
          });
        }, router);
      });
    }
  });
});
