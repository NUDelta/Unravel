/*
 This script is added to the web, but in its own context.
 */

window.addEventListener("JSTrace", function (event) {
  var str = event.detail.replace(/(?:\r\n|\r|\n)/g, '|||');

  chrome.extension.sendMessage({
    target: "page",
    name: "JSTrace",
    data: str
  });
}, false);

window.addEventListener("DOMObserve", function (event) {
  var str = event.detail;

  chrome.extension.sendMessage({
    target: "page",
    name: "mutation",
    data: str
  });
}, false);

// Sends a message to the background when the DOM of the inspected page is ready
// (typically used by the panel to check if the backbone agent is on the page).
window.addEventListener('DOMContentLoaded', function () {
  chrome.extension.sendMessage({
    target: 'page',
    name: 'ready'
  });
}, false);


function selectedElement(el) {
  chrome.extension.sendMessage({
    target: "page",
    name: "elementSelected",
    data: $(el).getPath()
  });
}

var injectFn = function (functionAsString) {
  $(document).ready(function () {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode(functionAsString));
    (document.body || document.head || document.documentElement).appendChild(script);
  });
};