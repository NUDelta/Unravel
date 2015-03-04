define([],
  function () {
    return function () {
      window.visorAgent.startObserving = function (cssPath) {

        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        if (window.visorAgent.observer && window.visorAgent.observer.disconnect) {
          window.visorAgent.observer.disconnect();
        }

        window.visorAgent.observer = new MutationObserver(function (mutations, observer) {
          var serializedMutations = window.visorAgent._(mutations).map(function (mutation) {
            return {
              addedNodes: mutation.addedNodes ? window.visorAgent._(mutation.addedNodes).map(function (node) {
                return node.outerHTML;
              }) : null,
              removedNodes: mutation.removedNodes ? window.visorAgent._(mutation.removedNodes).map(function (node) {
                return node.outerHTML;
              }) : null,
              previousSibling: mutation.previousSibling ? mutation.previousSibling.outerHTML : null,
              nextSibling: mutation.nextSibling ? mutation.nextSibling.outerHTML : null,
              target: mutation.target ? mutation.target.outerHTML : null,
              path: window.visorAgent.$(mutation.target).getPath(),
              attributeName: mutation.attributeName,
              attributeNamespace: mutation.attributeNamespace,
              oldValue: mutation.oldValue,
              type: mutation.type
            };
          });

          window.dispatchEvent(new CustomEvent("DOMObserve", {"detail": serializedMutations}));
        });

        var $el = window.visorAgent.$(cssPath || window.document);
        var observable = $el[0];

        window.visorAgent.observer.observe(observable, {
          subtree: true,
          attributes: true,
          childList: true,
          characterData: true,
          attributeOldValue: true,
          characterDataOldValue: true
        });
      };

      window.visorAgent.stopObserving = function () {
        if (window.visorAgent.observer) {
          window.visorAgent.observer.disconnect();
        }
      };
    };
  });
