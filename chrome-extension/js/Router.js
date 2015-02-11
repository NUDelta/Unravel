define(["backbone", "View"],
  function (Backbone, HomeView) {

    var Router = Backbone.Router.extend({

      initialize: function () {
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

        this.on("detectLibs", function (responses) {
          this.homeView.handleLibsDetected(responses);
        }, this);
      }
    });
    return Router;
  });
