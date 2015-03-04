// Script executed every time the devtools are opened.
var name = "Visor";

chrome.devtools.panels.elements.createSidebarPane(name,
  function (sidebar) {
    sidebar.setPage("panel.html");
    sidebar.setHeight("1000px");
  }
);

//chrome.devtools.panels.create(name, "img/visor128.png", "panel.html");

chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
  chrome.devtools.inspectedWindow.eval("window.visorAgent.selectElement($0)");
});