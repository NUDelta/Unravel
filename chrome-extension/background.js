/*
 The background is shared between the browser panes. This fosters
 communication between the contentscript injected in the web page
 your extension panel's javascript.
 */

// Hash <panel tab id, panel commmunication port>
var panelPorts = {};

// Receive handshake requests from extension panels and store their ports
chrome.extension.onConnect.addListener(function (port) {
  if (port.name !== "devtoolspanel") return;

  port.onMessage.addListener(function (message) {
    if (message.name == "identification") {
      var tabId = message.data;

      //Assign the port to a tab identifier
      panelPorts[tabId] = port;
    }
  });
});

// Listen for messages from contentscript in the web page and send them over the port from above
chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
  if (sender.tab) {
    //Get the right port for the panel you want
    var port = panelPorts[sender.tab.id];
    if (port) {
      //Send the message to the panel
      port.postMessage(message);

      if (message.name && message.name === "REWRITE") {
        setTimeout(function () {
          chrome.tabs.executeScript(sender.tab.id, {file: "contentscript.js"});
        }, 1000)
      }
    }
  }
});

chrome.tabs.onUpdated.addListener(function (updatedTabId, changeInfo) {
  // the event is emitted a second time when the update is complete, but we only need the first one.
  if (changeInfo.status == 'loading') {
    var port = panelPorts[updatedTabId];
    if (port) {
      port.postMessage({
        target: 'page',
        name: 'TabUpdate',
        data: {
          urlChanged: changeInfo.url !== undefined
        }
      });
    }
  }
});