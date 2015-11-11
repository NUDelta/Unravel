/*! scripts/tumblr/utils/exceptions.js */
(function (s, J) {
  var f = s.document;
  var A = s.encodeURIComponent;
  var y = s.navigator;
  var i = s.parseInt;
  var p = s.performance;
  var C = s.window;
  var B = s.Date;
  var j = s.Error;
  var o = s.Math;
  var G = s.XMLHttpRequest;
  var I = [];
  var q = [];
  var a = {};
  var c = false;

  function N(Q, P, R, O) {
    Q.addEventListener ? Q.addEventListener(P, R, !!O) : Q.attachEvent && Q.attachEvent("on" + P, R, !!O)
  }

  function h(O) {
    var P = decodeURIComponent(f.cookie).match(new RegExp(O + "=([^;]+)"));
    return (P && P.length > 1) ? P[1] : null
  }

  function g(P, O) {
    return (typeof P === "string") && (P.length > O) ? [P.slice(0, O / 2), "...", P.length - O, "...", P.slice(-O / 2)].join("") : P
  }

  function D(S, Q) {
    var T = [];
    for (var R in S) {
      if (!S.hasOwnProperty(R)) {
        continue
      }
      var P = Q ? (Q + "[" + R + "]") : R, O = S[R];
      T.push(typeof O === "object" ? D(O, P) : A(P) + "=" + A(O))
    }
    return T.join("&")
  }

  function n(O) {
    for (var P in O) {
      if (O.hasOwnProperty(P)) {
        return false
      }
    }
    return true
  }

  var v = (function (O) {
    return (O && O.keys) || function (S) {
        var P = [];
        var R = O.prototype.hasOwnProperty;
        for (var Q in S) {
          R.call(S, Q) && P.push(Q)
        }
        return P
      }
  })(s.Object);
  var d = function (P, S, Q) {
    if (typeof S !== "function") {
      return
    }
    var O = (P && P.length) >>> 0;
    for (var R = 0; R < O; R++) {
      S.call(Q, P[R], R, P)
    }
  };
  var M = (function (O) {
    return (O && O.stringify && function (Q) {
        try {
          return O.stringify(Q)
        } catch (P) {
          l(P);
          return '"FAILED_JSON_STRINGIFY"'
        }
      }) || function () {
        return '"NO_JSON_STRINGIFY"'
      }
  })(s.JSON);
  var t = (function (O) {
    return (O && O.Flags) || (function () {
        l(new j("Missing Tumblr.Flags in exceptions.js"));
        var P = {enable_js_errors_log: true, enable_js_ephemeral_log: true};

        function Q(R, S) {
          return (typeof R === "function") ? R.call(this, S) : R
        }

        return function (S) {
          var R = !!(P[S]);
          return function T(V, W) {
            var U = Q.call(this, (R ? V : W), R);
            return (U !== void 0) ? U : T
          }
        }
      })()
  })(s.Tumblr);

  function l(P, O) {
    if (typeof O === "number" && o.random() > O) {
      return
    }
    if (P instanceof j) {
      P.url || (P.url = "//www.tumblr.com/");
      m(P.message, P.url, P.ln, P.col, P)
    } else {
      I.push(M(P))
    }
  }

  var F = /https?:\/\//;
  var H = /https?:\/\/[^/]*tumblr[^/]*/;

  function m(S, P, R, O, Q) {
    try {
      P = g(P, 300) || "";
      if (F.test(P) && !H.test(P)) {
        return
      }
      Q = M(g(Q && Q.stack, 1000) || "");
      if (F.test(Q) && !H.test(Q)) {
        return
      }
      q.push({
        path: (f.location || {}).pathname || "NO_LOCATION_OR_PATHNAME",
        msg: g(S, 200) || "",
        url: P,
        ln: i(R, 10) || -1,
        col: i(O, 10) || -1,
        err: Q,
        group: t("js_errors_a")("A", t("js_errors_b")("B", "*")),
        logged_in: h("logged_in") ? true : false
      });
      C.___err = true
    } catch (Q) {
    }
  }

  function b() {
    return ((f.head || {}).innerHTML || "").indexOf("#missinge_button") !== -1
  }

  var w = l.debugDump = function () {
    var O = [];
    d(f.getElementsByTagName("script"), function (P) {
      O.push(P.src)
    });
    return {
      timestamp: +new B(),
      path: (f.location || {}).href || "NO_HREF",
      lang: (y || {}).userLanguage || (y || {}).language || "NO_LANG",
      referrer: f.referrer || "NO_REFERRER",
      ua: (y || {}).userAgent || "NO_UA",
      timing: (p || {}).timing || "NO_TIMING",
      scripts: O,
      globals: v(s),
      cookie: f.cookie,
      ephemeral: I,
      errors: q,
      document: (f.documentElement || {}).innerHTML || "NO_DOCUMENT"
    }
  };

  function r(O) {
    var P = w();
    P.name = O;
    return M(P)
  }

  function x(R) {
    var O = R.length, P, Q;
    while (O > 0) {
      Q = o.floor(o.random() * O);
      O--;
      P = R[O];
      R[O] = R[Q];
      R[Q] = P
    }
    return R
  }

  function e(T) {
    if (!p || !p.getEntriesByType) {
      return T
    }
    var P = p.getEntriesByType("resource");
    var U = {};
    d(P, function (W) {
      var V = (W.name.match(/\/\/([^/]+)/) || "")[1];
      if (V.indexOf(".tumblr.") === -1) {
        return
      }
      if (!U[W.initiatorType]) {
        U[W.initiatorType] = []
      }
      var X = V.split(".")[0];
      U[W.initiatorType].push({name: W.name.split(V)[1], duration: W.duration, bucket: X})
    });
    a.entries || (a.entries = []);
    var O = [{type: "img", num: 10}, {type: "link", num: 2}, {type: "script", num: 2}, {type: "css", num: 2}];
    for (var S = 0; S < O.length; ++S) {
      var R = O[S];
      var Q = U[R.type];
      if (!Q) {
        continue
      }
      if (R.num < Q.length) {
        x(Q)
      }
      while (R.num && Q.length) {
        a.entries.push(Q.pop());
        --R.num
      }
    }
    if (v(a)) {
      ((T || (T = {})).perf = a);
      a.timing = p.timing;
      a.memory = p.memory;
      a.navigation = p.navigation
    }
    return T
  }

  function L() {
    try {
      if (!c) {
        q.length = 0;
        l(new j("PAGE_DID_NOT_LOAD"))
      }
      var O;
      !b() && t("enable_js_errors_log")(function () {
        q.length && ((O || (O = {})).errors = q)
      });
      t("js_performance_logging")(function () {
        try {
          O = e(O)
        } catch (S) {
        }
      });
      t("enable_js_ephemeral_log")(function () {
        I.length && ((O || (O = {})).ephemeral = I)
      });
      t("js_debugger_1")(function () {
        (O || (O = {})).ephemeral = [r("js_debugger_1")]
      });
      t("js_debugger_2")(function () {
        (O || (O = {})).ephemeral = [r("js_debugger_2")]
      });
      if (!O) {
        return
      }
      var Q = JSON.stringify({
        form_key: (f.getElementById("tumblr_form_key") || f.body).getAttribute("content"),
        gpop: (f.getElementById("tumblr_gpop") || f.body).getAttribute("content"),
        log: O
      });
      var R = new G();
      R.open("POST", "/svc/log/capture/exceptions", false);
      R.setRequestHeader("Content-type", "text/plain");
      R.onreadystatechange = function () {
        if (R.readyState !== 4) {
          return
        }
        q.length = I.length = 0
      };
      R.send(Q)
    } catch (P) {
      if (!s.jQuery) {
        return
      }
      (O || (O = {})).errors || (O.errors = q);
      s.jQuery.ajax({
        async: false,
        dataType: "json",
        contentType: "text/plain",
        type: "POST",
        data: {form_key: s.jQuery("#tumblr_form_key").attr("content"), log: O},
        url: "/svc/log/capture/exceptions",
        with_form_key: true
      });
      l(P)
    }
  }

  (function K() {
    N(C, "beforeunload", L);
    C.onerror = m
  })();
  (J.Utils || (J.Utils = {})).exceptions = l;
  function k() {
    a.page_info = {};
    a.page_info.path = f.location.pathname || "n/a"
  }

  function z() {
    var O = new B().getTime();
    var P = O - p.timing.navigationStart;
    a.page_load_time = P
  }

  function u() {
    if (!p || !p.timing) {
      return
    }
    try {
      k();
      z()
    } catch (O) {
    }
  }

  function E() {
    c = true;
    u()
  }

  N(C, "load", E)
})(this, this.Tumblr || (this.Tumblr = {}));