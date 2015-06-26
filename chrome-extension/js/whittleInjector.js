define([],
  function () {
    return function () {
      window.unravelAgent.whittle = function (safePaths) {
        var trashEls = [];

        unravelAgent.$('*').each(function (i, el) {
          if (safePaths.indexOf(unravelAgent.$(el).getPath()) < 0) {
            trashEls.push(el);
          }
        });

        trashEls.forEach(function (el, index, array) {
          unravelAgent.$(el).remove();
        });

        return "";
      };
    };
  });
