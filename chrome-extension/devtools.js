// Script executed every time the devtools are opened.
var name = "Δ DOM";

chrome.devtools.panels.elements.createSidebarPane(name,
  function (sidebar) {
    sidebar.setPage("panel.html");
    sidebar.setHeight("500px");
  });

chrome.devtools.panels.create(name, "img/panel.png", "panel.html");

chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
  chrome.devtools.inspectedWindow.eval("selectedElement($0)", {useContentScriptContext: true});
});