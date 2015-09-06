define([], function () {
  return function () {
    var FondueBridge = function () {
      this.hitsHandle = null;
      this.logHandle = null;
    };

    FondueBridge.prototype = {
      constructor: FondueBridge,

      getTracerNodes: function () {
        var nodesHandle = window.__tracer.trackNodes();
        return window.__tracer.newNodes(nodesHandle)
      },

      startTracking: function () {
        window.__tracer.resetTrace();
        this.hitsHandle = null;
        this.logHandle = null;
        this.trackHits();
        this.trackLogs();
      },

      trackHits: function () {
        if (!this.hitsHandle) {
          this.hitsHandle = window.__tracer.trackHits();
        }
        window.__tracer.hitCountDeltas(this.hitsHandle); //Reset the deltas counter
      },

      getHitsAndInvokes: function () {
        try {
          var nodeHits = window.__tracer.hitCountDeltas(this.hitsHandle);
          var invokes = this.getNodeInvocations();
          var nodeLogs = window.unravelAgent._(invokes).reduce(function (memo, invoke) {
            if (memo[invoke.nodeId]) {
              memo[invoke.nodeId].push(invoke);
            } else {
              memo[invoke.nodeId] = [invoke];
            }
            return memo;
          }, {});

          return JSON.stringify({
            nodeHits: nodeHits,
            nodeLogs: nodeLogs
          });
        } catch (e) {
          debugger;
        }
      },

      trackLogs: function () {
        if (!this.logHandle) {
          var nodeList = this.getTracerNodes();
          var ids = window.unravelAgent._(nodeList).pluck("id");
          this.logHandle = window.__tracer.trackLogs({ids: ids});
        }
      },

      getNodeInvocations: function () {
        try {
          var _tracerNodes = unravelAgent._(this.getTracerNodes());

          var invocations = window.__tracer.logDelta(this.logHandle, 500);
          unravelAgent._(invocations).each(function (invocation) {
            invocation.callStack = unravelAgent._(__tracer.backtrace({
              invocationId: invocation.invocationId,
              range: [0, 10]
            })).reverse();

            unravelAgent._(invocation.callStack).each(function (call) {
              var node = _tracerNodes.find(function (node) {
                return node.id === call.nodeId;
              });

              call.nodeName = node && node.name ? node.name : "";
            });
          });

          return invocations;
        } catch (err) {
          debugger;
        }
      }
    };

    window.unravelAgent.fondueBridge = new FondueBridge();
  };
});