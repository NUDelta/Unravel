define([],
  function () {
    return function () {
      window.unravelAgent.whittle = function (safePaths) {
        var trashEls = [];

        unravelAgent.$('*').each(function (i, el) {
          var path = unravelAgent.$(el).getPath();
          if (path.indexOf("head") > -1 || path.indexOf("script") > -1 || path.indexOf("style") > -1) {
            return
          }

          if (safePaths.indexOf(path) < 0) {
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
