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
        this.trackLogs();
        this.trackHits();
      },

      trackHits: function () {
        if (!this.hitsHandle) {
          this.hitsHandle = window.__tracer.trackHits();
        }
        this.getNodeHitCounts(); //Reset the deltas counter
      },

      trackLogs: function () {
        if (!this.logHandle) {
          var nodeList = this.getTracerNodes();
          var ids = window.unravelAgent._(nodeList).pluck("id");
          this.logHandle = window.__tracer.trackLogs({ids: ids});
        }
        this.getNodeInvocations();  //Reset the deltas counter
      },

      getNodeHitCounts: function () {
        return window.__tracer.hitCountDeltas(this.hitsHandle);
      },

      getNodeInvocations: function () {
        return window.__tracer.logDelta(this.logHandle);
      }
    };

    window.unravelAgent.fondueBridge = new FondueBridge();
  };
});