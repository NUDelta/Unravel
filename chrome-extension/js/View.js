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

    pathEvents: [],

    lastRecordingJS: "",

    activeCSS: "",

    activeHTML: "",

    arrHitLines: [],

    whittled: false,

    initialize: function () {
      this.parseFondue = _.bind(this.parseFondue, this);
      this.fiddle = _.bind(this.fiddle, this);
      this.whittle = _.bind(this.whittle, this);
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

    whittle: function (e, callback) {
      this.whittled = true;

      var whittleCallback = function (o) {
        this.activeHTML = o.activeHTML;
        this.activeCSS = o.activeCSS;

        if (callback) {
          callback();
        }
      };

      UnravelAgent.runInPage(function (safePaths) {
        var activeCSS = unravelAgent.gatherCSS(safePaths);
        var activeHTML = unravelAgent.whittle(safePaths); //important to run _after_ css

        return {
          activeCSS: activeCSS,
          activeHTML: activeHTML
        };
      }, _.bind(whittleCallback, this), this.domPathsToKeep);
    },

    corsGet: function (url, callback) {
      var http = new XMLHttpRequest();
      http.open("GET", url, true);

      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          callback(http);
        }
      };

      http.send();
    },

    //TODO - what about inline scripts on the page
    //What an async mess!
    fiddle: function () {
      if (!this.whittled) {
        this.whittle(null, this.fiddle);
        return;
      }

      var jsBinCallback = _.bind(function (response) {
        var binUrl = response.url;
        var tabUrl = "http://localhost:8080/" + binUrl + "/edit?html,css,js,output";
        console.log(tabUrl);
        window.open(tabUrl);
        this.activeHTML = "";
        this.activeCSS = "";
        this.reloadInjecting();
      }, this);

      var postToBin = _.bind(function () {
        $.ajax({
          url: "http://localhost:8080/api/save",
          data: {
            html: this.activeHTML,
            css: this.activeCSS,
            javascript: "",
            fondue: {
              traces: this.arrHitLines,
              scripts: fileArr
            }
          },
          datatype: "json",
          method: "post"
        }).done(jsBinCallback);
      }, this);

      var fileArr = _.chain(this.arrHitLines).pluck("path").unique().map(function (path) {
        return {
          path: path,
          url: "http://localhost:9000" + path + "?theseus=no",
          js: ""
        };
      }).value();

      var tries = 0;
      _(fileArr).each(function (fileObj) {
        this.corsGet(fileObj.url, _.bind(function (http) {
          var fileObj = _(fileArr).find(function (file) {
            return file.url === http.responseURL;
          });
          fileObj.js = http.responseText;

          tries++;
          if (tries == fileArr.length) {
            postToBin();
          }
        }, this));
      }, this);
    },

    __fiddle: function () {
      $.ajax({
        url: "http://localhost:8080/api/save",
        data: {
          html: this.activeHTML,
          css: this.activeCSS,
          javascript: "",
          fondue: foo
        },
        datatype: "json",
        method: "post"
      }).done(_.bind(function (response) {
        var binUrl = response.url;
        var tabUrl = "http://localhost:8080/" + binUrl + "/edit?html,css,js,output";
        console.log(tabUrl);
        window.open(tabUrl);
        this.reloadInjecting();
      }, this));
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
        unravelAgent.startObserving(path);
        unravelAgent.traceJsOn();
        unravelAgent.fondueBridge.startTracking();
      }, callback, path);

      var that = this;
      var fondueCallback = function (functionMap) {
        that.fondueFnMap = functionMap;
      };

      UnravelAgent.runInPage(function () {
        return unravelAgent.fondueBridge.getFunctionMap();
      }, fondueCallback);
    },

    stop: function () {
      UnravelAgent.runInPage(function () {
        unravelAgent.stopObserving();
        unravelAgent.traceJsOff();
      }, function () {
        this.$("#record .active").hide();
        this.$("#record .inactive").show();
      });

      UnravelAgent.runInPage(function () {
        var tracerNodes = unravelAgent.fondueBridge.getTracerNodes();
        var hitsAndInvokes = unravelAgent.fondueBridge.getHitsAndInvokes();

        return {
          tracerNodes: tracerNodes,
          nodeHits: hitsAndInvokes.nodeHits,
          nodeLogs: hitsAndInvokes.nodeLogs
        };
      }, this.parseFondue);
    },

    reset: function () {
      this.domDataTable.row().remove().draw(false);
      this.jsDataTable.row().remove().draw(false);
      this.pathsDomRows = [];
      this.pathsJSRows = [];
      this.activeHTML = "";
      this.activeCSS = "";
      this.lastRecordingJS = "";
      this.stop();
    },

    parseFondue: function (o) {
      if (!o) {
        console.warn("Fondue not active. JS Capturing disabled.");
        return;
      }

      var nodeHits = o.nodeHits;
      var nodeLogs = o.nodeLogs;
      var tracerNodes = o.tracerNodes;

      //Ugh what a bad-performance mess!
      var nodeLogIds = _(nodeLogs).keys();
      _(nodeLogIds).each(function (id) {
        _(nodeLogs[id]).each(function (log) {
          if (!log.parents || log.parents.length < 1) {
            return;
          }

          var parentInvocationId = log.parents[0].invocationId;

          if (!parentInvocationId) {
            return;
          }

          var parentNodeId = _(nodeLogIds).find(function (innerId) {
            return _(nodeLogs[innerId]).find(function (innerLog) {
              if (innerLog.invocationId = parentInvocationId) {
                return true;
              }
            });
          });

          if (parentNodeId) {
            log.parentNode = _(tracerNodes).find(function (node) {
              return node.id === parentNodeId;
            });
          }
        });
      });

      this.arrHitLines = _(tracerNodes).reduce(function (memo, node) {
        var idArr = node.id.split("-");

        if (nodeHits[node.id] > 0 && idArr.length > 5) {
          var hit = {
            path: node.path,
            type: node.type,
            startLine: node.start.line,
            startColumn: node.start.column,
            endLine: node.end.line,
            endColumn: node.end.column,
            hits: nodeHits[node.id],
            invokes: nodeLogs[node.id]
          };

          memo.push(hit);
        }

        return memo;
      }, []);
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
      this.pathEvents.push(data);
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
      UnravelAgent.reloadInjecting();
    }
  });
});