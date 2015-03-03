// Script executed every time the devtools are opened.
var name = "Visor";

chrome.devtools.panels.elements.createSidebarPane(name,
  function (sidebar) {
    sidebar.setPage("panel.html");
    sidebar.setHeight("600px");
  });

chrome.devtools.panels.create(name, "img/visor128.png", "panel.html");

chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
  chrome.devtools.inspectedWindow.eval("selectedElement($0)", {useContentScriptContext: true});
});