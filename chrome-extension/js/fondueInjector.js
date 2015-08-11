define([],
  function () {
    return function () {
      window.unravelAgent.fondue = {
        tracks: [],

        hitsHandles: [],

        trackLogs: function () {
          debugger;
          var fnMap = window.unravelAgent.fondue.getFunctionMap();
          var vals = window.unravelAgent._(fnMap).values();
          var ids = window.unravelAgent._(vals).pluck("id");

          var logHandle = __tracer.trackLogs({ids: ids});
          var invocations = __tracer.logDelta(logHandle);

          return invocations;
        },

        trackHits: function () {
          window.unravelAgent.fondue.hitsHandles.push(__tracer.trackHits());
        },

        hitCountDeltas: function () {
          var lastHandle = window.unravelAgent._(window.unravelAgent.fondue.hitsHandles).first();
          return __tracer.hitCountDeltas(lastHandle);
        },

        getFunctionMap: function () {
          var functionMap = {};
          var nodesHandle = __tracer.trackNodes();
          __tracer.newNodes(nodesHandle).forEach(function (n) {
            if (n.type === 'function') {
              functionMap[n.name] = n;
            }
          });

          return functionMap;
        }
      };

      window.unravelAgent.fondueSample = function () {
        var functionMap = {};
        var nodesHandle = __tracer.trackNodes();
        __tracer.newNodes(nodesHandle).forEach(function (n) {
          if (n.type === 'function') {
            functionMap[n.name] = n;
          }
        });

        var newNodes = __tracer.newNodes();

        // call __tracer.newNodes() periodically if you expect new code to be required over time
        // check how many times trace points have been hit
        var hitsHandle = __tracer.trackHits();
        var hits1 = __tracer.hitCountDeltas(hitsHandle);
        console.log(fooNode.name + ' was called ' + (hits1[fooNode.id] || 0) + ' time');

        // call repeatedly to track hit counts over time
        var hits2 = __tracer.hitCountDeltas(hitsHandle);
        console.log(fooNode.name + ' was called ' + (hits2[fooNode.id] || 0) + ' times (since last check)');

        var logHandle = __tracer.trackLogs({ids: [fooNode.id]});
        var invocations = __tracer.logDelta(logHandle);
        console.log('foo returned:', invocations[0].returnValue);
        console.log('foo accepted arguments:', invocations[0].arguments);
      };
    };
  });
//
//var funcObj = {
//  "path": "/javascripts/lib/jquery-2.1.4.js",
//  "start": {
//    "line": 6644,
//    "column": 10
//  },
//  "end": {
//    "line": 6661,
//    "column": 2
//  },
//  "id": "/javascripts/lib/jquery-2.1.4.js-6644-10-6661-2",
//  "type": "function",
//  "childrenIds": [
//    "/javascripts/lib/jquery-2.1.4.js-6645-7-6645-33",
//    "/javascripts/lib/jquery-2.1.4.js-6645-36-6648-3",
//    "/javascripts/lib/jquery-2.1.4.js-6648-9-6650-3",
//    "/javascripts/lib/jquery-2.1.4.js-6659-3-6659-39"
//  ],
//  "parentId": "/javascripts/lib/jquery-2.1.4.js-6642-19-6670-2",
//  "name": "tweener",
//  "params": [
//    {
//      "name": "props",
//      "start": {"line": 6644, "column": 20},
//      "end": {"line": 6644, "column": 25}
//    },
//    {
//      "name": "callback",
//      "start": {
//        "line": 6644,
//        "column": 27
//      },
//      "end": {
//        "line": 6644,
//        "column": 35
//      }
//    }]
//};
//
//var hitsTracked = {
//  "/javascripts/lib/jquery-2.1.4.js-9105-0-9144-2": 1,
//  "/javascripts/lib/jquery-2.1.4.js-38-49-9210-1": 1,
//  "/javascripts/lib/jquery-2.1.4.js-15-1-9210-2": 1,
//  "/javascripts/lib/underscore-min.js-10-10-33-3": 4,
//  "/javascripts/lib/underscore-min.js-38-8-38-15": 4,
//  "/javascripts/lib/underscore-min.js-40-40-40-53": 134,
//  "/javascripts/lib/underscore-min.js-5-0-574-13": 1,
//  "/javascripts/lib/moment.js-96-29-96-81": 1,
//  "/javascripts/lib/moment.js-2740-20-2740-108": 1,
//  "/javascripts/lib/moment.js-2741-19-2741-49": 1,
//  "/javascripts/lib/moment.js-2968-25-2968-40": 7,
//  "/javascripts/lib/moment.js-2968-6-2968-41": 7,
//  "/javascripts/lib/moment.js-7-1-3054-1": 1,
//  "/javascripts/lib/moment.js-7-0-3054-13": 1,
//  "/javascripts/home.js-3-20-3-52": 1,
//  "/javascripts/home.js-14-2-14-55": 1,
//  "/javascripts/home.js-26-2-26-13": 1,
//  "/javascripts/home.js-26-2-30-4": 1,
//  "/javascripts/home.js-1-1-32-1": 1,
//  "/javascripts/home.js-1-0-32-4": 1
//};