define([],
  function () {
    return function () {
      var testCases = [
        {
          lib: "jQuery",
          testFn: function () {
            return (typeof jQuery === 'function') ? jQuery.fn.jquery : undefined;
          }
        },
        {
          lib: "Meteor",
          testFn: function () {
            return (typeof Meteor === 'object') ? Meteor.release : undefined;
          }
        },
        {
          lib: "Angular",
          testFn: function () {
            return (typeof angular === 'object') ? angular.version.full : undefined;
          }
        },
        {
          lib: "Dojo",
          testFn: function () {
            return (typeof dojo === 'object') ? dojo.version.major + "." + dojo.version.minor + "." + dojo.version.patch : undefined;
          }
        },
        {
          lib: "Backbone",
          testFn: function () {
            return (typeof Backbone === 'object') ? Backbone.VERSION : undefined;
          }
        },
        {
          lib: "Underscore",
          testFn: function () {
            return (typeof _ === 'function') && _.pluck ? _.VERSION : undefined;
          }
        },
        {
          lib: "Require",
          testFn: function () {
            return (typeof require === 'function') ? require.version : undefined;
          }
        },
        {
          lib: "Google Analytics",
          testFn: function () {
            return (typeof ga === 'function') && ga.K && ga.N ? "Present, no version info" : undefined;
          }
        },
        {
          lib: "D3 Charts",
          testFn: function () {
            return (typeof d3 === 'object') ? d3.version : undefined;
          }
        },
        {
          lib: "ImpressJS",
          testFn: function () {
            return (typeof impress === 'function') && impress().next() ? "Present, but no version info" : undefined;
          }
        },
        {
          lib: "MomentJS",
          testFn: function () {
            return (typeof moment === 'function') ? moment.version : undefined;
          }
        },
        {
          lib: "ThreeJS",
          testFn: function () {
            return (typeof THREE === 'object') ? THREE.REVISION : undefined;
          }
        },
        {
          lib: "Mustache",
          testFn: function () {
            return (typeof Mustache === 'object') ? Mustache.version : undefined;
          }
        }
      ];

      var responses = [];
      for (var i = 0; i < testCases.length; i++) {
        var testCase = testCases[i];
        var evalReturnValue = testCase.testFn();
        if (evalReturnValue) {
          responses.push({
            lib: testCase.lib,
            value: evalReturnValue
          });
        }
      }

      return responses;
    };
  });
