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
        this.trackHits();
      },

      trackHits: function () {
        if (!this.hitsHandle) {
          this.hitsHandle = window.__tracer.trackHits();
        }
        window.__tracer.hitCountDeltas(this.hitsHandle); //Reset the deltas counter
      },

      getHitsAndInvokes: function(){
        var tracerNodes = this.getTracerNodes();
        var nodeHits = window.__tracer.hitCountDeltas(this.hitsHandle);

        var ids = window.unravelAgent._(nodeHits).keys();

        var nodeLogs = window.unravelAgent._(ids).reduce(function(memo, id){
          var handle = window.__tracer.trackLogs({ ids: [id]});
          memo[id] = window.__tracer.logDelta(handle, 50);
          return memo;
        }, {});

        return {
          nodeHits: nodeHits,
          nodeLogs: nodeLogs
        };
      }
    };

    window.unravelAgent.fondueBridge = new FondueBridge();
  };
});