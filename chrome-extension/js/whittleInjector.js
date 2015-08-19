define([],
  function () {
    return function () {
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
        console.log(safePaths);

        var trashEls = [];
        Node = Node || {COMMENT_NODE: 8};

        unravelAgent.$('*').each(function (i, el) {
          var path = unravelAgent.$(el).getPath();

          //Remove all non-head related elements
          if (safePaths.indexOf(path) < 0 && path.indexOf("head") < 0) {
            trashEls.push(el);
            return;
          }

          //Remove all scripts and styles
          if (el.tagName === "SCRIPT" || el.tagName === "LINK" || el.tagName === "STYLE") {
            trashEls.push(el);
            return;
          }

          //Remove all comments
          var children = el.childNodes;
          for (var i = 0, len = children.length; i < len; i++) {
            if (children[i].nodeType == Node.COMMENT_NODE) {
              trashEls.push(children[i]);
            }
          }
        });

        trashEls.forEach(function (el, index, array) {
          unravelAgent.$(el).remove();
        });

        unravelAgent.$('*').each(function (i, el) {
          if (el.src) {
            unravelAgent.$(el).attr("src", el.src);
          }
        });

        return unravelAgent.$("html")[0].outerHTML;
      };
    };
  });
