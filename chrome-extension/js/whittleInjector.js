define([],
  function () {
    return function () {
      window.unravelAgent.getLocation = function () {
        return {
          origin: window.location.origin,
          path: window.location.pathname,
          href: window.location.href
        };
      };

      window.unravelAgent.metaScripts = function () {
        var metaScripts = [];
        var scripts = unravelAgent.$("script");

        unravelAgent._(scripts).each(function (scriptEl, h) {
          var path = "";
          var url = "";

          var $scriptEl = unravelAgent.$(scriptEl);
          if (scriptEl.src) {
            $scriptEl.attr("src", scriptEl.src);
            url = scriptEl.src;
          } else {
            try{
              path = scriptEl.innerHTML.split("__tracer.add(\"")[1].split("\"")[0];
            } catch (err){
              return;
            }
          }

          metaScripts.push({
            path: path || url.split(window.location.origin)[1],
            url: url,
            inline: !scriptEl.src,
            domPath: $scriptEl.getPath(),
            order: h
          });
        });


        return metaScripts;
      };

      window.unravelAgent.gatherCSS = function () {
        var css = "";
        if (document.styleSheets && document.styleSheets.length) {
          for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i] && document.styleSheets[i].cssRules) {
              var cssRules = document.styleSheets[i].cssRules;

              for (var j = 0; j < cssRules.length; j++) {

                var mediaRuleText = "";

                try {
                  var keepRule = false;
                  var selectorText = cssRules[j].selectorText;
                  var selectors = selectorText.split(",");
                  keepRule = !!_(selectors).find(function (selector) {
                    var checkText = selector.indexOf(':') > -1 ? selector.substr(0, selector.indexOf(':')) : selector;
                    return !!unravelAgent.$(checkText).length;
                  });

                } catch (err) {
                  if (cssRules[j] instanceof CSSMediaRule) {  //CSSKeyframesRule
                    var subRulesToRemove = [];

                    var mediaRule = cssRules[j];
                    var innerCSSRules = mediaRule.cssRules;
                    for (var k = 0; k < innerCSSRules.length; k++) {
                      var innerMediaRule = innerCSSRules[k];
                      var innerSelectorText = innerMediaRule.selectorText;

                      try {
                        var innerSelectors = innerSelectorText.split(",");
                        var innerExists = !!_(innerSelectors).find(function (selector) {
                          var checkText = selector.indexOf(':') > -1 ? selector.substr(0, selector.indexOf(':')) : selector;
                          return !!unravelAgent.$(checkText).length;
                        });
                        if (!innerExists) {
                          subRulesToRemove.push(innerMediaRule.cssText);
                        }
                      } catch (err) {
                      }
                    }
                    keepRule = false;

                    if (innerCSSRules.length === subRulesToRemove.length) {
                      mediaRuleText = "";
                    } else {
                      mediaRuleText = cssRules[j].cssText;
                      for (var l = 0; l < subRulesToRemove.length; l++) {
                        mediaRuleText = mediaRuleText.replace(subRulesToRemove[l], "");
                      }
                    }
                  } else if (cssRules[j] instanceof CSSFontFaceRule) {
                    //if (cssRules[j].cssText.length > 1000) {
                    keepRule = false;
                    //} else {
                    //  keepRule = true;
                    //}
                  } else if (cssRules[j] instanceof CSSKeyframesRule) {
                    keepRule = false;
                  } else {
                    console.log("Blindly passing rule type:", typeof cssRules[j]);
                    keepRule = true;
                  }
                }

                if (keepRule) {
                  css += cssRules[j].cssText + "\n";
                } else if (mediaRuleText) {
                  css += mediaRuleText;
                }
              }
            }
          }
        }

        return css;
      };

      window.unravelAgent.whittle = function (safePaths) {
        var trashEls = [];
        var allDescendants = function (parentEl) {
          for (var i = 0; i < parentEl.childNodes.length; i++) {
            var el = parentEl.childNodes[i];

            try {
              if (el.nodeType === 8) {//comment node
                trashEls.push(el);
              } else if (el.nodeType !== 3) {
                if (el.src) {
                  unravelAgent.$(el).attr("src", el.src);
                }

                var path = unravelAgent.$(el).getPath();
                if (safePaths.indexOf(path) < 0 && path.indexOf("head") < 0) {
                  trashEls.push(el);
                } else if (el.tagName === "SCRIPT" || el.tagName === "LINK" || el.tagName === "STYLE") {
                  trashEls.push(el);
                }
              }
            } catch (er) {
              console.warn("Skipping whittle on node type", el.nodeType);
            }

            allDescendants(el);
          }
        };

        allDescendants(document.getElementsByTagName("html")[0]);

        unravelAgent._(trashEls).each(function (el) {
          el.remove();
        });

        return unravelAgent.$("html")[0].outerHTML;
      };
    };
  })
;
