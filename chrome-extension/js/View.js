define([
  "backbone",
  "underscore",
  "jquery",
  "datatables",
  "handlebars",
  "UnravelAgent",
  "text!templates/view.html"
], function (Backbone, _, $, datatables, Handlebars, UnravelAgent, viewTemplate) {
  return Backbone.View.extend({
    template: Handlebars.compile(viewTemplate),

    events: {
      "click #record": "record",
      "click #reset": "reset",
      "click #reduce": "reduceTable",
      "click .inspectElement": "inspectElement",
      "click .inspectSource": "inspectSource",
      "click #resultToggle": "toggleLibResultsPane",
      "click #detectJSAgain": "detectJSLibs",
      "click #filterSVG": "toggleFilterSVG",
      "click #constrain": "toggleConstrain",
      "click #whittle": "whittle",
      "click #reload": "reloadInjecting",
      "click #fiddle": "fiddle"
    },

    currentPath: "",

    elementMap: {},

    dataTable: null,

    pathsDomRows: [],

    pathsJSRows: [],

    filterSVG: true,

    eventTracePaths: [],

    constrainToPath: false,

    domPathsToKeep: [],

    initialize: function (options) {
      //this.render();
      //this.start();
    },

    render: function (unravelAgentActive) {
      this.$el.html(this.template());

      if (unravelAgentActive) {
        this.$(".active-mode").show();
        this.detectJSLibs();
      } else {
        this.$(".restart-mode").show();
        return;
      }

      this.domDataTable = this.$("table#domResults").DataTable({
        paging: false,
        searching: false,
        "order": [[0, "desc"]]
      });
      this.jsDataTable = this.$("table#jsResults").DataTable({
        paging: false,
        searching: false,
        "order": [[0, "desc"]]
      });
    },

    whittle: function () {
      UnravelAgent.runInPage(function (safePaths) {
        return unravelAgent.whittle(safePaths);
      }, null, this.domPathsToKeep);
    },

    fiddle: function () {
      var pageCallback = function (o) {
        var js = _(o.js).keys().join("\n");

        $.ajax({
          url: "http://localhost:3000/api/save",
          data: {
            html: o.html,
            css: o.css,
            javascript: js
          },
          datatype: "json",
          method: "post"
        }).done(function (response) {
          var binUrl = response.url;
          console.log("http://localhost:3000/" + binUrl + "/edit?html,css,js,output");
        });
      };

      UnravelAgent.runInPage(function (safePaths) {
        unravelAgent.whittle(safePaths);

        if (document.styleSheets && document.styleSheets.length) {
          var css = "";
          for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i] && document.styleSheets[i].cssRules) {
              var cssRules = document.styleSheets[i].cssRules;
              for (var j = 0; j < cssRules.length; j++) {
                var keepRule = false;
                var mediaRuleText = "";
                try {
                  var selectorText = cssRules[j].selectorText;
                  var selectors = selectorText.split(",");
                  keepRule = !!_(selectors).find(function (selector) {
                    var checkText = selector.indexOf(':') > -1 ? selector.substr(0, selector.indexOf(':')) : selector;
                    return !!unravelAgent.$(checkText).length;
                  });
                } catch (err) {
                  if (cssRules[j] instanceof CSSMediaRule) {
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
                  } else {
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

        return {
          html: unravelAgent.$("html").html(),
          css: css,
          js: window.unravelAgent.storedCalls
        };
      }, pageCallback, this.domPathsToKeep);
    },

    toggleFilterSVG: function () {
      if (this.$('#filterSVG').prop('checked')) {
        this.filterSVG = true;
      } else {
        this.filterSVG = false;
      }
    },

    toggleConstrain: function () {
      if (this.$('#constrain').prop('checked')) {
        this.constrainToPath = true;
      } else {
        this.constrainToPath = false;
      }

      this.stop();
      this.start();
    },

    record: function () {
      if (this.$("#record .active").is(":visible")) {
        this.stop();
      } else {
        this.start();
      }
    },

    start: function () {
      var callback = function () {
        this.$("#record .inactive").hide();
        this.$("#record .active").show();
      };

      var path = this.constrainToPath ? this.currentPath : "";

      UnravelAgent.runInPage(function (path) {
        return unravelAgent.startObserving(path);
      }, callback, path);

      UnravelAgent.runInPage(function () {
        unravelAgent.traceJsOn();
      });
    },

    stop: function () {
      var callback = function () {
        this.$("#record .active").hide();
        this.$("#record .inactive").show();
      };

      UnravelAgent.runInPage(function () {
        unravelAgent.stopObserving();
        unravelAgent.traceJsOff();
      }, callback);
    },

    reset: function () {
      this.domDataTable.row().remove().draw(false);
      this.jsDataTable.row().remove().draw(false);
      this.pathsDomRows = [];
      this.pathsJSRows = [];
      this.stop();
    },

    resetInspectedElement: function () {
      this.currentPath = "";
      this.$(".selectedWrap").hide();
    },

    elementSelected: function (cssPath) {
      if (this.currentPath != cssPath) {
        this.currentPath = cssPath;
      }
      this.$("#selectedElement").attr("data-path", cssPath);
      this.$("#selectedElement").html(cssPath + " <i class='glyphicon glyphicon-search'></i>");
      this.$(".selectedWrap").show();

      if (this.$("#record .active").is(":visible")) {
        this.stop();
        this.start();
      }
    },

    parseSelector: function (htmlString) {
      var $el = $(htmlString);

      if (!$el.prop || !$el.prop("tagName")) {
        return "";
      }

      var tagName = $el.prop("tagName").toLowerCase();
      var idName = $el.attr("id") || "";
      if (idName.length > 0) {
        idName = "#" + idName;
      }
      var nameAttr = $el.attr("name") || "";
      if (nameAttr.length > 0) {
        nameAttr = '[name="' + nameAttr + '"]';
      }

      var className;
      try {
        className = "." + $el.attr("class").split(" ").join(".");
      } catch (err) {
        className = "";
      }

      return tagName + idName + className + nameAttr;
    },

    handleMutations: function (mutations) {
      _(mutations).map(function (mutation) {
        mutation.selector = this.parseSelector(mutation.target);
        var path = (mutation.path || "");

        if (this.filterSVG && mutation.path.toLowerCase().indexOf("svg") > -1) {
          return;
        }

        var oldAttributeValue = mutation.attributeName ? "<span>" + (mutation.attributeName || '') + "=" + "'" + (mutation.oldValue || '') + "'</span></br>" : "";
        if (this.pathsDomRows[path]) {
          var data = this.pathsDomRows[path].data();
          data[0] = data[0] + 1;
          data[3] = "<div class='inlay'>" + $(data[3]).html() + oldAttributeValue + "</div>";
          this.pathsDomRows[path].data(data);
        } else {
          var trimmedPath = mutation.path;
          if (trimmedPath && trimmedPath.length > 45) {
            trimmedPath = trimmedPath.substring(0, 45) + "...";
          }

          var dt = this.domDataTable.row.add([
            1,
            "<a href='#' title='Inspect Element' class='inspectElement' data-path='" + mutation.path + "'>" + trimmedPath + " <i class='glyphicon glyphicon-search'></i></a>",
            mutation.selector,
            "<div class='inlay'>" + oldAttributeValue + "</div>"
          ]);
          this.pathsDomRows[path] = dt.row(dt.index());
          this.addToDomPaths(path);
        }
      }, this);
      this.domDataTable.draw()
    },

    addToDomPaths: function (path) {
      var tags = path.split(">");
      var paths = [];

      for (var i = 0; i < tags.length; i++) {
        var path = tags.slice(0, i + 1);
        path = path.join(">");
        paths.push(path);
      }

      this.domPathsToKeep = _.union(this.domPathsToKeep, paths);
    },

    handleEventTrace: function (data) {
      this.eventTracePaths = _.union(this.eventTracePaths, [data.path]);
      this.addToDomPaths(data.path);
    },

    handleJSTrace: function (traceEvent) {
      var callStack = this.parseError(traceEvent.stack);

      var formattedArgs = traceEvent.args.replace("[", "");
      formattedArgs = formattedArgs.replace("]", "");
      var domCall = "document." + traceEvent.functionName + "(" + formattedArgs + ")<br/>";
      var formattedTrace = "";
      callStack = _(callStack).reverse();
      _(callStack).each(function (frame) {
        var cleanedScriptName = frame.script.replace("http://54.175.112.172", "");
        var sourceUrl = "<a href='#' title='Inspect Element' class='inspectSource' data-path='" + frame.script + "|||" + frame.lineNumber + "'>" + (cleanedScriptName || 'none') + ":" + (frame.lineNumber || "none") + ":" + (frame.charNumber || "none") + "</a>";
        formattedTrace += sourceUrl + " (" + frame.functionName + ")<br/>";
      });

      //TODO - add different arguments here
      var path = formattedTrace;

      if (this.pathsJSRows[path]) {
        var data = this.pathsJSRows[path].data();
        data[0] = data[0] + 1;
        this.pathsJSRows[path].data(data);
      } else {
        var dt = this.jsDataTable.row.add([
          1,
          formattedTrace,
          domCall
        ]);
        this.pathsJSRows[path] = dt.row(dt.index());
      }
      this.jsDataTable.draw()
    },

    parseError: function (error) {
      var frames = error.split('|||').slice(1).map(function (line) {
        if (line.indexOf("yimg.com") > -1) {
          return "remove";
        }
        var tokens = line.replace(/^\s+/, '').split(/\s+/).slice(1);

        if (tokens[1] === "function)") {
          tokens[0] = tokens[0] + " " + tokens[1] + " " + tokens[2] + " " + tokens[3];
          tokens[1] = tokens[4];
          tokens = tokens.slice(0, 2);
        }

        var urlLike = "";
        try {
          urlLike = tokens.pop().replace(/[\(\)\s]/g, '');
        } catch (ignored) {
          return "remove";
        }
        var locationParts = urlLike.split(':');
        var lastNumber = locationParts.pop();
        var possibleNumber = locationParts[locationParts.length - 1];
        if (!isNaN(parseFloat(possibleNumber)) && isFinite(possibleNumber)) {
          var lineNumber = locationParts.pop();
          locationParts = [locationParts.join(':'), lineNumber, lastNumber];
        } else {
          locationParts = [locationParts.join(':'), lastNumber, undefined];
        }

        if (tokens[0]) {
          tokens[0] = tokens[0].replace("<anonymous>", "&lt;anonymous&gt;");
        }

        if (locationParts[0]) {
          locationParts[0] = locationParts[0].replace("<anonymous>", "&lt;anonymous&gt;");
        }

        var functionName = (!tokens[0] || tokens[0] === 'Anonymous') ? undefined : tokens[0];

        if (functionName && functionName.indexOf("unravelAgent") > -1) {
          return "remove";
        }

        return {
          functionName: functionName,
          script: locationParts[0],
          lineNumber: locationParts[1],
          charNumber: locationParts[2]
        };
      }, this);

      return _(frames).without("remove");
    },

    inspectElement: function (e) {
      var path = $(e.target).attr("data-path");
      var doInspect = function (path) {
        if (!path) {
          console.log("No path provided when trying to inspect.");
          return;
        } else {
          console.log("Inspect " + unravelAgent.$(path)[0])
        }
        inspect(unravelAgent.$(path)[0]);
      };

      UnravelAgent.runInPage(doInspect, null, path);
    },

    inspectSource: function (e) {
      var path = $(e.target).attr("data-path");
      var arr = path.split("|||");
      var url = arr[0], lineNumber = arr[1], callback;

      //console.log("Unravel: Click to inspect (" + url + ":" + lineNumber + ")");
      chrome.devtools.panels.openResource(url, parseInt(lineNumber), function () {
      });
    },

    detectJSLibs: function () {
      var callback = function (arr, exception) {
        var $resultList = this.$("#libResults ul");
        $resultList.empty();
        var $message = $("<li>Detecting...</li>");
        $resultList.append($message);

        window.setTimeout(function () {
          $message.remove();
          if (arr.length < 1) {
            $resultList.append("<li>None Detected.</li>")
          } else {
            _(arr).each(function (o) {
              $resultList.append("<li>" + o.lib + ": " + o.value + "</li>")
            });
          }
        }, 1000);
      };

      UnravelAgent.runInPage(function () {
        return unravelAgent.libDetect();
      }, callback);
    },

    reloadInjecting: function () {
      UnravelAgent.reloadInjecting(true);
      window.location.href = "";
    }
  });
});




