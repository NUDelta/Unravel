define([],
  function () {
    return function () {
      window.unravelAgent.fondueAgent = function () {
        var functions = {};
        var nodesHandle = tracer.trackNodes();
        tracer.newNodes(nodesHandle).forEach(function (n) {
          if (n.type === 'function') {
            functions[n.name] = n;
          }
        });

        var fooNode = functions['foo'];
        console.log('foo started at', fooNode.start, 'and ended at', fooNode.end);

        // call tracer.newNodes() periodically if you expect new code to be required over time
        // check how many times trace points have been hit
        var hitsHandle = tracer.trackHits();
        var hits1 = tracer.hitCountDeltas(hitsHandle);
        console.log('foo was called ' + (hits1[fooNode.id] || 0) + ' time');

        // call repeatedly to track hit counts over time
        var hits2 = tracer.hitCountDeltas(hitsHandle);
        console.log('foo was called ' + (hits2[fooNode.id] || 0) + ' times (since last check)');

        var logHandle = tracer.trackLogs({ids: [fooNode.id]});
        var invocations = tracer.logDelta(logHandle);
        console.log('foo returned:', invocations[0].returnValue);
        console.log('foo accepted arguments:', invocations[0].arguments);
      };
    };
  });
