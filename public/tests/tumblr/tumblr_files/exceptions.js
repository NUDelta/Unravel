/*! scripts/tumblr/utils/exceptions.js */
(function (q, H) {
  var f = q.document;
  var y = q.encodeURIComponent;
  var w = q.navigator;
  var h = q.parseInt;
  var n = q.performance;
  var A = q.window;
  var z = q.Date;
  var i = q.Error;
  var m = q.Math;
  var E = q.XMLHttpRequest;
  var G = [];
  var o = [];
  var a = {};
  var c = false;

  function L(O, N, P, M) {
    O.addEventListener ? O.addEventListener(N, P, !!M) : O.attachEvent && O.attachEvent("on" + N, P, !!M)
  }

  function g(N, M) {
    return (typeof N === "string") && (N.length > M) ? [N.slice(0, M / 2), "...", N.length - M, "...", N.slice(-M / 2)].join("") : N
  }

  function B(Q, O) {
    var R = [];
    for (var P in Q) {
      if (!Q.hasOwnProperty(P)) {
        continue
      }
      var N = O ? (O + "[" + P + "]") : P, M = Q[P];
      R.push(typeof M === "object" ? B(M, N) : y(N) + "=" + y(M))
    }
    return R.join("&")
  }

  var t = (function (M) {
    return (M && M.keys) || function (Q) {
        var N = [];
        var P = M.prototype.hasOwnProperty;
        for (var O in Q) {
          P.call(Q, O) && N.push(O)
        }
        return N
      }
  })(q.Object);
  var d = function (N, Q, O) {
    if (typeof Q !== "function") {
      return
    }
    var M = (N && N.length) >>> 0;
    for (var P = 0; P < M; P++) {
      Q.call(O, N[P], P, N)
    }
  };
  var K = (function (M) {
    return (M && M.stringify && function (O) {
        try {
          return M.stringify(O)
        } catch (N) {
          j(N);
          return '"FAILED_JSON_STRINGIFY"'
        }
      }) || function () {
        return '"NO_JSON_STRINGIFY"'
      }
  })(q.JSON);
  var r = (function (M) {
    return (M && M.Flags) || (function () {
        j(new i("Missing Tumblr.Flags in exceptions.js"));
        var N = {enable_js_errors_log: true, enable_js_ephemeral_log: true};

        function O(P, Q) {
          return (typeof P === "function") ? P.call(this, Q) : P
        }

        return function (Q) {
          var P = !!(N[Q]);
          return function R(T, U) {
            var S = O.call(this, (P ? T : U), P);
            return (S !== void 0) ? S : R
          }
        }
      })()
  })(q.Tumblr);

  function j(N, M) {
    if (typeof M === "number" && m.random() > M) {
      return
    }
    if (N instanceof i) {
      N.url || (N.url = "//www.tumblr.com/");
      l(N.message, N.url, N.ln, N.col, N)
    } else {
      G.push(K(N))
    }
  }

  var D = /https?:\/\//;
  var F = /https?:\/\/[^/]*tumblr[^/]*/;

  function l(Q, N, P, M, O) {
    try {
      N = g(N, 300) || "";
      if (D.test(N) && !F.test(N)) {
        return
      }
      O = K(g(O && O.stack, 1000) || "");
      if (D.test(O) && !F.test(O)) {
        return
      }
      o.push({
        path: (f.location || {}).pathname || "NO_LOCATION_OR_PATHNAME",
        msg: g(Q, 200) || "",
        url: N,
        ln: h(P, 10) || -1,
        col: h(M, 10) || -1,
        err: O,
        group: r("js_errors_a")("A", r("js_errors_b")("B", "*"))
      })
    } catch (O) {
    }
  }

  function b() {
    return ((f.head || {}).innerHTML || "").indexOf("#missinge_button") !== -1
  }

  var u = j.debugDump = function () {
    var M = [];
    d(f.getElementsByTagName("script"), function (N) {
      M.push(N.src)
    });
    return {
      timestamp: +new z(),
      path: (f.location || {}).href || "NO_HREF",
      lang: (w || {}).userLanguage || (w || {}).language || "NO_LANG",
      referrer: f.referrer || "NO_REFERRER",
      ua: (w || {}).userAgent || "NO_UA",
      timing: (n || {}).timing || "NO_TIMING",
      scripts: M,
      globals: t(q),
      cookie: f.cookie,
      ephemeral: G,
      errors: o,
      document: (f.documentElement || {}).innerHTML || "NO_DOCUMENT"
    }
  };

  function p(M) {
    var N = u();
    N.name = M;
    return K(N)
  }

  function v(P) {
    var M = P.length, N, O;
    while (M > 0) {
      O = m.floor(m.random() * M);
      M--;
      N = P[M];
      P[M] = P[O];
      P[O] = N
    }
    return P
  }

  function e(R) {
    if (!n || !n.getEntriesByType) {
      return R
    }
    var N = n.getEntriesByType("resource");
    var S = {};
    d(N, function (U) {
      var T = (U.name.match(/\/\/([^/]+)/) || "")[1];
      if (T.indexOf(".tumblr.") === -1) {
        return
      }
      if (!S[U.initiatorType]) {
        S[U.initiatorType] = []
      }
      var V = T.split(".")[0];
      S[U.initiatorType].push({name: U.name.split(T)[1], duration: U.duration, bucket: V})
    });
    a.entries || (a.entries = []);
    var M = [{type: "img", num: 10}, {type: "link", num: 2}, {type: "script", num: 2}, {type: "css", num: 2}];
    for (var Q = 0; Q < M.length; ++Q) {
      var P = M[Q];
      var O = S[P.type];
      if (!O) {
        continue
      }
      if (P.num < O.length) {
        v(O)
      }
      while (P.num && O.length) {
        a.entries.push(O.pop());
        --P.num
      }
    }
    if (t(a)) {
      ((R || (R = {})).perf = a);
      a.timing = n.timing;
      a.memory = n.memory;
      a.navigation = n.navigation
    }
    return R
  }

  function J() {
    try {
      if (!c) {
        o.length = 0;
        j(new i("PAGE_DID_NOT_LOAD"))
      }
      var M;
      !b() && r("enable_js_errors_log")(function () {
        o.length && ((M || (M = {})).errors = o)
      });
      r("js_performance_logging")(function () {
        try {
          M = e(M)
        } catch (Q) {
        }
      });
      r("enable_js_ephemeral_log")(function () {
        G.length && ((M || (M = {})).ephemeral = G)
      });
      r("js_debugger_1")(function () {
        (M || (M = {})).ephemeral = [p("js_debugger_1")]
      });
      r("js_debugger_2")(function () {
        (M || (M = {})).ephemeral = [p("js_debugger_2")]
      });
      if (!M) {
        return
      }
      var O = JSON.stringify({
        form_key: (f.getElementById("tumblr_form_key") || f.body).getAttribute("content"),
        log: M
      });
      var P = new E();
      P.open("POST", "/svc/log/capture/exceptions", false);
      P.setRequestHeader("Content-type", "text/plain");
      P.onreadystatechange = function () {
        if (P.readyState !== 4) {
          return
        }
        o.length = G.length = 0
      };
      P.send(O)
    } catch (N) {
      if (!q.jQuery) {
        return
      }
      (M || (M = {})).errors || (M.errors = o);
      q.jQuery.ajax({
        async: false,
        dataType: "json",
        contentType: "text/plain",
        type: "POST",
        data: {form_key: q.jQuery("#tumblr_form_key").attr("content"), log: M},
        url: "/svc/log/capture/exceptions",
        with_form_key: true
      });
      j(N)
    }
  }

  (function I() {
    L(A, "beforeunload", J);
    A.onerror = l
  })();
  (H.Utils || (H.Utils = {})).exceptions = j;
  function k() {
    a.page_info = {};
    a.page_info.path = f.location.pathname || "n/a"
  }

  function x() {
    var M = new z().getTime();
    var N = M - n.timing.navigationStart;
    a.page_load_time = N
  }

  function s() {
    if (!n || !n.timing) {
      return
    }
    try {
      k();
      x()
    } catch (M) {
    }
  }

  function C() {
    c = true;
    s()
  }

  L(A, "load", C)
})(this, this.Tumblr || (this.Tumblr = {}));