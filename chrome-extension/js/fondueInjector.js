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

        var fooNode = functions['tweener'];
        console.log('foo started at', fooNode.start, 'and ended at', fooNode.end);

        // call tracer.newNodes() periodically if you expect new code to be required over time
        // check how many times trace points have been hit
        var hitsHandle = tracer.trackHits();
        var hits1 = tracer.hitCountDeltas(hitsHandle);
        console.log(fooNode.name + ' was called ' + (hits1[fooNode.id] || 0) + ' time');

        // call repeatedly to track hit counts over time
        var hits2 = tracer.hitCountDeltas(hitsHandle);
        console.log(fooNode.name + ' was called ' + (hits2[fooNode.id] || 0) + ' times (since last check)');

        var logHandle = tracer.trackLogs({ids: [fooNode.id]});
        var invocations = tracer.logDelta(logHandle);
        console.log('foo returned:', invocations[0].returnValue);
        console.log('foo accepted arguments:', invocations[0].arguments);
      };
    };
  });

var funcObj = {
  "path": "/javascripts/lib/jquery-2.1.4.js",
  "start": {
    "line": 6644,
    "column": 10
  },
  "end": {
    "line": 6661,
    "column": 2
  },
  "id": "/javascripts/lib/jquery-2.1.4.js-6644-10-6661-2",
  "type": "function",
  "childrenIds": [
    "/javascripts/lib/jquery-2.1.4.js-6645-7-6645-33",
    "/javascripts/lib/jquery-2.1.4.js-6645-36-6648-3",
    "/javascripts/lib/jquery-2.1.4.js-6648-9-6650-3",
    "/javascripts/lib/jquery-2.1.4.js-6659-3-6659-39"
  ],
  "parentId": "/javascripts/lib/jquery-2.1.4.js-6642-19-6670-2",
  "name": "tweener",
  "params": [
    {
      "name": "props",
      "start": {"line": 6644, "column": 20},
      "end": {"line": 6644, "column": 25}
    },
    {
      "name": "callback",
      "start": {
        "line": 6644,
        "column": 27
      },
      "end": {
        "line": 6644,
        "column": 35
      }
    }]
};

var hitsTracked = {
  "/javascripts/lib/jquery-2.1.4.js-9105-0-9144-2": 1,
  "/javascripts/lib/jquery-2.1.4.js-38-49-9210-1": 1,
  "/javascripts/lib/jquery-2.1.4.js-15-1-9210-2": 1,
  "/javascripts/lib/underscore-min.js-10-10-33-3": 4,
  "/javascripts/lib/underscore-min.js-38-8-38-15": 4,
  "/javascripts/lib/underscore-min.js-40-40-40-53": 134,
  "/javascripts/lib/underscore-min.js-5-0-574-13": 1,
  "/javascripts/lib/moment.js-96-29-96-81": 1,
  "/javascripts/lib/moment.js-2740-20-2740-108": 1,
  "/javascripts/lib/moment.js-2741-19-2741-49": 1,
  "/javascripts/lib/moment.js-2968-25-2968-40": 7,
  "/javascripts/lib/moment.js-2968-6-2968-41": 7,
  "/javascripts/lib/moment.js-7-1-3054-1": 1,
  "/javascripts/lib/moment.js-7-0-3054-13": 1,
  "/javascripts/home.js-3-20-3-52": 1,
  "/javascripts/home.js-14-2-14-55": 1,
  "/javascripts/home.js-26-2-26-13": 1,
  "/javascripts/home.js-26-2-30-4": 1,
  "/javascripts/home.js-1-1-32-1": 1,
  "/javascripts/home.js-1-0-32-4": 1
};