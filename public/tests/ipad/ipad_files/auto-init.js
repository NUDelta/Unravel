(function() {
    var d = require("ac-analytics");
    var c = require("ac-base")
        .onDOMReady;
    new d.observer.Page();
    c(function() {
        new d.observer.Click();
        new d.observer.Link();
        new d.observer.Section()
    })
}());