if (window.unravelMocks === true) {
  var head = document.getElementsByTagName("head")[0];
  var js = document.createElement("script");
  js.type = "text/javascript";
  js.src = "//localhost:35729/livereload.js";
  head.appendChild(js);

//Evaluated for mocks only, not in chrome plugin
  var chrome = {
    devtools: {
      inspectedWindow: {
        tabId: 13,
        eval: function () {
        }
      }
    },
    extension: {
      connect: function () {
        return {
          postMessage: function () {
          },
          onMessage: {
            addListener: function () {
            }
          }
        };
      },
      onConnect: {
        addListener: function () {
        }
      },
      onMessage: {
        addListener: function () {
        }
      },
      sendMessage: function () {
      }
    }
  };

  var mockData = [
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: none;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: block;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: none;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: block;",
      "type": "attributes"
    },
    {
      "addedNodes": [],
      "removedNodes": [],
      "previousSibling": null,
      "nextSibling": null,
      "path": "a>b>c>d",
      "target": "<p id=\"effect1\" style=\"display: block;\">Effect 1</p>",
      "attributeName": "style",
      "attributeNamespace": null,
      "oldValue": "display: none;",
      "type": "attributes"
    },
    {
      "addedNodes": ["<span> A </span>"],
      "removedNodes": [],
      "nextSibling": null,
      "path": "e>v>g",
      "target": "<p id=\"effect2\">Effect 2<span> A </span></p>",
      "attributeName": null,
      "attributeNamespace": null,
      "oldValue": null,
      "type": "childList"
    },
    {
      "addedNodes": ["<span> A </span>"],
      "removedNodes": [],
      "previousSibling": "<span> A </span>",
      "nextSibling": null,
      "path": "e>v>g",
      "target": "<p id=\"effect2\">Effect 2<span> A </span><span> A </span></p>",
      "attributeName": null,
      "attributeNamespace": null,
      "oldValue": null,
      "type": "childList"
    },
    {
      "addedNodes": ["<span> A </span>"],
      "removedNodes": [],
      "previousSibling": "<span> A </span>",
      "nextSibling": null,
      "path": "e>v>g",
      "target": "<p id=\"effect2\">Effect 2<span> A </span><span> A </span><span> A </span></p>",
      "attributeName": null,
      "attributeNamespace": null,
      "oldValue": null,
      "type": "childList"
    }];
}