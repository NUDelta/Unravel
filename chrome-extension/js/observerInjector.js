define([],
  function () {
    return function () {
      window.raleAgent.startObserving = function (cssPath) {

        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        if (window.raleAgent.observer && window.raleAgent.observer.disconnect) {
          console.log("Deleting old observer");
          window.raleAgent.observer.disconnect();
        }

        console.log("Created new observer for DOM");
        window.raleAgent.observer = new MutationObserver(function (mutations, observer) {
          var serializedMutations = window.raleAgent._(mutations).map(function (mutation) {
            debugger;

            return {
              addedNodes: mutation.addedNodes ? window.raleAgent._(mutation.addedNodes).map(function (node) {
                return node.outerHTML;
              }) : null,
              removedNodes: mutation.removedNodes ? window.raleAgent._(mutation.removedNodes).map(function (node) {
                return node.outerHTML;
              }) : null,
              previousSibling: mutation.previousSibling ? mutation.previousSibling.outerHTML : null,
              nextSibling: mutation.nextSibling ? mutation.nextSibling.outerHTML : null,
              target: mutation.target ? mutation.target.outerHTML : null,
              path: raleAgent.$(mutation.target).getPath(),
              attributeName: mutation.attributeName,
              attributeNamespace: mutation.attributeNamespace,
              oldValue: mutation.oldValue,
              type: mutation.type
            };
          });

          console.log('heremu');
          //chrome.extension.sendMessage({
          //  target: "page",
          //  name: "mutation",
          //  data: serializedMutations
          //});

          window.dispatchEvent(new CustomEvent("DOMObserve", {"detail": serializedMutations}));


          //console.log(JSON.stringify(serializedMutations));
          //console.log("Δ DOM: ", serializedMutations);
        });

        var $el = raleAgent.$(cssPath || window.document);
        var observable = $el[0];

        window.raleAgent.observer.observe(observable, {
          subtree: true,
          attributes: true,
          childList: true,
          characterData: true,
          attributeOldValue: true,
          characterDataOldValue: true
        });
      };

      window.raleAgent.stopObserving = function () {
        if (window.raleAgent.observer) {
          window.raleAgent.observer.disconnect();
        }
      };
    };
  });
