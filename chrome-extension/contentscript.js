/*
 This script is added to the actual web page. Debug is available.
 */


// Receives messages from the inspected page and redirects them to the background,
// building up the first step towards the communication between the backbone agent and the panel.
window.addEventListener("message", function (event) {
  // We only accept messages from ourselves
  if (event.source != window) return;

  var message = event.data;
  chrome.extension.sendMessage(message);
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
    data: el && el.outerHTML ? el.outerHTML : ""
  });
}

var observer;
function startObserving() {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  if (observer && observer.disconnect) {
    console.log("Deleting old observer");
    observer.disconnect();
  }

  console.log("Created new observer for DOM");
  observer = new MutationObserver(function (mutations, observer) {
    var serializedMutations = _(mutations).map(function (mutation) {
      return {
        addedNodes: mutation.addedNodes ? _(mutation.addedNodes).map(function (node) {
          return node.outerHTML;
        }) : null,
        removedNodes: mutation.removedNodes ? _(mutation.removedNodes).map(function (node) {
          return node.outerHTML;
        }) : null,
        previousSibling: mutation.previousSibling ? mutation.previousSibling.outerHTML : null,
        nextSibling: mutation.nextSibling ? mutation.nextSibling.outerHTML : null,
        target: mutation.target ? mutation.target.outerHTML : null,
        attributeName: mutation.attributeName,
        attributeNamespace: mutation.attributeNamespace,
        oldValue: mutation.oldValue,
        type: mutation.type
      };
    });

    chrome.extension.sendMessage({
      target: "page",
      name: "mutation",
      data: serializedMutations
    });

    //console.log(JSON.stringify(serializedMutations));
    //console.log("Δ DOM: ", serializedMutations);
  });

  observer.observe(document, {
    subtree: true,
    attributes: true,
    childList: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });

}

function stopObserving() {
  observer.disconnect();
}

startObserving();