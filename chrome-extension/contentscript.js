/*
 This script is added to the actual web page. Debug is available.
 */

jQuery.fn.getPath = function () {
  if (this.length != 1) throw 'Requires one element.';
  var path, node = this;
  while (node.length) {
    var realNode = node[0], name = realNode.localName;
    if (!name) break;
    name = name.toLowerCase();
    var parent = node.parent();
    var siblings = parent.children(name);
    if (siblings.length > 1) {
      name += ':eq(' + siblings.index(realNode) + ')';
    }
    path = name + (path ? '>' + path : '');
    node = parent;
  }
  return path;
};


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
    data: $(el).getPath()
  });
}

var observer;
function startObserving(cssPath) {
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
        path: $(mutation.target).getPath(),
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

  var $el = $(cssPath), observable = document;
  if ($el.length > 0) {
    observable = $el[0];
  }

  observer.observe(observable, {
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

//Grab the value that the injected script produced
function detectLibs() {
  chrome.extension.sendMessage({
    target: "page",
    name: "detectLibs",
    data: $("#_lib_detect").text()
  });
}

var detectLibsInjected = function () {
  var testCases = [
    {
      lib: "jQuery",
      testFn: function () {
        return (typeof jQuery === 'function') ? jQuery.fn.jquery : undefined;
      }
    },
    {
      lib: "Meteor",
      testFn: function () {
        return (typeof Meteor === 'object') ? Meteor.release : undefined;
      }
    },
    {
      lib: "Angular",
      testFn: function () {
        return (typeof angular === 'object') ? angular.version.full : undefined;
      }
    },
    {
      lib: "Dojo",
      testFn: function () {
        return (typeof dojo === 'object') ? dojo.version.major + "." + dojo.version.minor + "." + dojo.version.patch : undefined;
      }
    },
    {
      lib: "Backbone",
      testFn: function () {
        return (typeof Backbone === 'object') ? Backbone.VERSION : undefined;
      }
    },
    {
      lib: "Underscore",
      testFn: function () {
        return (typeof _ === 'function') && _.pluck ? _.VERSION : undefined;
      }
    },
    {
      lib: "Require",
      testFn: function () {
        return (typeof require === 'function') ? require.version : undefined;
      }
    },
    {
      lib: "Google Analytics",
      testFn: function () {
        return (typeof ga === 'function') && ga.K && ga.N ? "Present, no version info" : undefined;
      }
    },
    {
      lib: "D3 Charts",
      testFn: function () {
        return (typeof d3 === 'object') ? d3.version : undefined;
      }
    },
    {
      lib: "ImpressJS",
      testFn: function () {
        return (typeof impress === 'function') && impress().next() ? "Present, but no version info" : undefined;
      }
    },
    {
      lib: "MomentJS",
      testFn: function () {
        return (typeof moment === 'function') ? moment.version : undefined;
      }
    },
    {
      lib: "ThreeJS",
      testFn: function () {
        return (typeof THREE === 'object') ? THREE.REVISION : undefined;
      }
    },
    {
      lib: "Mustache",
      testFn: function () {
        return (typeof Mustache === 'object') ? Mustache.version : undefined;
      }
    }
  ];

  var responses = [];
  for (var i = 0; i < testCases.length; i++) {
    var testCase = testCases[i];
    var evalReturnValue = testCase.testFn();
    if (evalReturnValue) {
      responses.push({
        lib: testCase.lib,
        value: evalReturnValue
      });
    }
  }

  var newDiv = document.createElement('div');
  newDiv.style.display = 'none';
  newDiv.id = "_lib_detect";
  newDiv.innerText = JSON.stringify(responses);
  document.body.appendChild(newDiv);
};

//Once page is loaded, inject the function as a string script
$(document).ready(function () {
  var injectedCode = '' + detectLibsInjected;
  var script = document.createElement('script');
  script.appendChild(document.createTextNode('(' + injectedCode + ')();'));
  (document.body || document.head || document.documentElement).appendChild(script);
});
