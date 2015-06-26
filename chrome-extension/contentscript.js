/*
 This script is added to the web, but in its own context.
 */

window.addEventListener("JSTrace", function (event) {
  chrome.extension.sendMessage({
    target: "page",
    name: "JSTrace",
    data: event.detail
  });
}, false);

window.addEventListener("UnravelKeepAlive", function (event) {
  chrome.extension.sendMessage({
    target: "page",
    name: "UnravelKeepAlive",
    data: event.detail
  });
}, false);

window.addEventListener("ElementSelected", function (event) {
  chrome.extension.sendMessage({
    target: "page",
    name: "elementSelected",
    data: event.detail
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

window.addEventListener("InjectionDone", function (event) {
  var str = event.detail;

  chrome.extension.sendMessage({
    target: "page",
    name: "InjectionDone",
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