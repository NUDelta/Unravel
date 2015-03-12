if (YAHOO === void 0 || !YAHOO)var YAHOO = {};
YAHOO.i13n = YAHOO.i13n || {}, YAHOO.i13n.EventTypes = function () {
  function e(e, t, n) {
    this.yqlid = e, this.eventName = t, this.spaceidPrefix = n
  }

  var t = "richview", n = "contentmodification";
  e.prototype = {
    getYQLID: function () {
      return this.yqlid
    }, getEventName: function () {
      return this.eventName
    }
  };
  var r = {
    pageview: new e("pv", "pageview", ""),
    simple: new e("lv", "event", "P"),
    linkview: new e("lv", "linkview", "P"),
    richview: new e(t, t, "R"),
    contentmodification: new e(t, n, "R"),
    dwell: new e("lv", "dwell", "D")
  };
  return {
    getEventByName: function (e) {
      return r[e]
    }
  }
}(), YAHOO.i13n.Rapid = function (e) {
  function t() {
  }

  function n(e) {
    this.map = {}, this.count = 0, e && this.absorb(e)
  }

  function r() {
    this.map = {}, this.count = 0
  }

  function o(e, t) {
    if (!e)return null;
    null === t && (t = !1);
    var n = new r, o = V.getAttribute(e, V.data_action_outcome);
    o && n.set("outcm", o);
    var i = V.getAttribute(e, "data-ylk");
    if (null === i || 0 === i.length)return n;
    for (var a = i.split(V.ylk_pair_delim), c = 0, u = a.length; u > c; c++) {
      var s = a[c].split(V.ylk_kv_delim);
      if (2 === s.length) {
        var l = s[0], d = s[1];
        null !== l && "" !== l && null !== d && 8 >= l.length && 300 >= d.length && ("_p" !== l || t) && n.set(l, d)
      }
    }
    return n
  }

  function a(e, t, n) {
    return t > e ? t : e > n ? n : e
  }

  function c(t) {
    j.set("A_sid", YAHOO.i13n.A_SID || V.rand()), j.set("_w", V.rmProto(window.location.href).substring(0, V.MAX_VALUE_LENGTH)), t ? j.absorb(t) : e.keys && j.absorb(e.keys)
  }

  function u(e) {
    var t = YAHOO.i13n, n = YAHOO.i13n.TEST_ID || e.test_id, r = document.location + "";
    c(e.keys), n && (n = V.norm("" + n));
    var o = 300, i = 700, u = {
      version: "3.18.1",
      keys: j,
      getReferrer: function () {
        return V.norm(V.clref(e.referrer || document.referrer))
      },
      spaceid: V.norm(YAHOO.i13n.SPACEID || e.spaceid),
      yrid: V.norm(e.yrid || ""),
      oo: e.oo ? "1" : "0",
      nol: e.nol ? "1" : "0",
      yql_enabled: e.yql_enabled !== !1,
      ywa: e.ywa || null,
      ywa_dpid: null,
      ywa_cf_override: t.YWA_CF_MAP || {},
      ywa_action_map: t.YWA_ACTION_MAP || {},
      ywa_outcome_map: t.YWA_OUTCOME_MAP || {},
      fing: 1 == e.use_fing,
      USE_RAPID: e.use_rapid !== !1,
      linktrack_attribut: e.lt_attr || "text",
      tracked_mods: e.tracked_mods || [],
      lt_attr: e.lt_attr || "text",
      client_only: e.client_only,
      text_link_len: e.text_link_len || -1,
      test_id: n,
      yql_host: e.yql_host || "geo.query.yahoo.com",
      yql_path: e.yql_path || "/v1/public/yql",
      compr_timeout: e.compr_timeout || i,
      compr_on: e.compr_on !== !1,
      compr_type: e.compr_type || "deflate",
      webworker_file: e.webworker_file || "rapidworker-1.1.js",
      nofollow_classname: e.nofollow_class || "rapidnofollow",
      no_click_listen: e.rapid_noclick_resp || "rapid-noclick-resp",
      nonanchor_track_class: e.nonanchor_track_class || "rapid-nonanchor-lt",
      anc_pos_attr: "data-rapid_p",
      deb: e.debug === !0,
      ldbg: r.indexOf("yhldebug=1") > 0,
      addmod_timeout: e.addmodules_timeout || 300,
      ult_token_capture: "boolean" == typeof e.ult_token_capture ? e.ult_token_capture : !1,
      track_type: e.track_type || "data-tracktype",
      dwell_on: e.dwell_on !== !1,
      async_all_clicks: e.async_all_clicks === !0,
      click_postmsg: e.click_postmsg || {},
      apv: e.apv !== !1,
      apv_time: e.apv_time || 1e3,
      apv_px: e.apv_px || 500,
      ex: e.ex === !0,
      persist_asid: e.persist_asid === !0,
      gen_bcookie: e.gen_bcookie === !0,
      skip_attr: e.skip_attr || "data-rapid-skip",
      parse_dom: e.parse_dom === !0,
      pageview_on_init: e.pageview_on_init !== !1
    };
    u.ywa_action_map[YAHOO.i13n.EventTypes.getEventByName("richview").getEventName()] = 100, !u.ywa || u.ywa.project_id && 0 != u.ywa.project_id && V.isNumeric(u.ywa.project_id) || (f("Invalid YWA project id: null or not numeric."), u.ywa = null);
    var s = 1 * u.compr_timeout;
    u.compr_timeout = V.isNum(s) ? a(s, o, i) : i;
    var l = 1 * e.click_timeout, d = 500;
    return u.click_timeout = V.isNum(l) ? l : d, u
  }

  function s() {
    j.set("A_sid", V.rand())
  }

  function l() {
    return "Rapid-" + q.version + "(" + (new Date).getTime() + "):"
  }

  function d(e) {
    console.warn("RAPID WARNING: " + e)
  }

  function f(e) {
    console.error("RAPID ERROR: " + e)
  }

  function p(e) {
    q.ldbg && console.log(l() + e)
  }

  function m() {
    var e = document.cookie;
    if (this.cookieMap = {}, /[^=]+=[^=;]?(?:; [^=]+=[^=]?)?/.test(e))for (var t = e.split(/;\s/g), n = null, r = null, o = null, i = 0, a = t.length; a > i; i++) {
      if (o = t[i].match(/([^=]+)=/i), o instanceof Array)try {
        n = V.dec(o[1]), r = V.dec(t[i].substring(o[1].length + 1))
      } catch (c) {
        f(c)
      } else n = V.dec(t[i]), r = n;
      ("B" === n || "BX" === n || "TT" === n || q.ywa && n === "fpc" + q.ywa.project_id || "fpc" === n || "ywandp" === n || 0 === n.indexOf("ywadp") || "D" === n) && (this.cookieMap[n] = r)
    }
  }

  function v() {
    if (q.ult_token_capture && YAHOO.i13n.__handled_ult_tokens__ !== !0) {
      YAHOO.i13n.__handled_ult_tokens__ = !0;
      var e = window.document.location + "";
      if (e.match(/;_yl[a-z]{1}=/))q.ldbg && p("Found ULT Token on URL."), W.sendGeoT(e); else {
        var t = new m, n = t.getCookieByName("D");
        n && (V.clearCookie("D", "/", ".yahoo.com"), W.sendGeoT(n))
      }
    }
  }

  function h() {
    return Math.floor((new Date).valueOf() / 1e3)
  }

  function _(e, t, n) {
    var r = new Date, o = "";
    r.setTime(r.getTime() + 1e3 * n), o = "; expires=" + r.toGMTString();
    var i = e + "=" + t + o + "; path=/";
    document.cookie = i
  }

  function g() {
    return "" + Math.floor(4294967295 * Math.random())
  }

  function y(e) {
    var t, n = [];
    for (t in e)e[t] && n.push(t + ":" + e[t]);
    return encodeURIComponent(n.join(";"))
  }

  function w(e, t) {
    e = e || "";
    var n = decodeURIComponent(e).split(";"), r = {};
    for (i = 0, excl = n.length; excl > i; i++) {
      var o = n[i].split(":");
      r[o[0]] = o[1]
    }
    return t ? r[t] : r
  }

  function b() {
    function e(e) {
      var t = "cf";
      return t += 10 > e && "0" !== ("" + e).charAt(0) ? "0" + e : e
    }

    function t() {
      void 0 !== window.ITTs && V.isArr(window.ITTs) && 0 !== window.ITTs.length || (window.ITTs = [{}]), window.ITTs[0].setFPCookies || (window.ITTs[0].setFPCookies = function () {
        var e = "fpc", t = new m, n = w(t.getCookieByName(e));
        n[q.ywa.project_id] = window.ITTs[0].FPCV, _(e, y(n), 31536e3);
        var r = t.getCookieByName(e + q.ywa.project_id);
        r && V.clearCookie(e + q.ywa.project_id)
      })
    }

    function r(e, t, n, r) {
      q.ldbg && p(e);
      var o = new Image, i = null;
      o.onload = o.onabort = o.onerror = function () {
        t && n ? t[n] = 1 : r && (clearTimeout(i), r.call(null))
      }, o.src = e, r && (i = setTimeout(function () {
        r.call(null)
      }, q.click_timeout)), setTimeout(function () {
        o = null
      }, 1e5)
    }

    function o(e, t) {
      for (var n in e)if (V.hasOwn(e, n)) {
        var r = q.ywa_cf_override[n];
        r && (t[r] = e[n])
      }
    }

    function i(n, r, i, a, c, u, s) {
      function l(e, t) {
        var n = t ? "%3B" : ";";
        return e + (i ? n + e : "")
      }

      var d = new m, p = d.getYWAFPC();
      d.getYWADPID(), a = a || {}, "c" !== n && t();
      var v = [V.curProto(), q.ywa.host || "a.analytics.yahoo.com", "/fpc.pl?"], _ = q.ywa.project_id, g = q.ywa.document_group, y = {};
      q.test_id && (y["14"] = q.test_id);
      var w = ["_cb=" + V.rand(), ".ys=" + q.spaceid, "a=" + _, "b=" + V.enc(q.ywa.document_name || document.title), "d=" + V.enc(new Date), "f=" + V.enc(window.location.href), "j=" + V.sr("x"), "k=" + V.cold(), "t=" + h(), "l=true"];
      if (s)for (var b in s)V.hasOwn(s, b) && w.push(b + "=" + V.enc(s[b]));
      if (g && "" !== g && w.push("c=" + V.enc(g)), q.ywa_dpid && w.push("dpid=" + q.ywa_dpid), "c" === n) {
        a.x = 12;
        var k = "12";
        i && (k = V.enc(k + ";" + i)), w.splice(0, 0, "x=" + k)
      } else"e" === n && w.push("x=" + r + (i ? ";" + i : ""));
      p && w.push("fpc=" + V.enc(p));
      var A = q.ywa.member_id;
      A && w.push("m=" + A), "" !== q.getReferrer() && w.push("e=" + V.enc(q.getReferrer()));
      var E = {};
      V.aug(E, C().getAll()), V.aug(E, u), o(E, y), V.hasOwn(E, "A_apv") && (y["15"] = E.A_apv), "e" === n && c && o(c, y);
      var T = q.ywa.cf;
      V.aug(y, T, function (e) {
        return !V.isResCF(e)
      });
      for (var O in y)V.hasOwn(y, O) && w.push(e(O) + "=" + l(V.enc(y[O]), 1));
      if (("e" === n || "c" === n) && w.push("ca=1"), "p" !== n && w.push("resp=img"), "c" === n)for (var I in a)if (V.hasOwn(a, I) && "x" !== I) {
        var x = a[I];
        try {
          x = V.enc(l(x))
        } catch (D) {
          f(D)
        }
        w.push(e(I) + "=" + x)
      }
      return v.join("") + w.join("&")
    }

    function a() {
      return "rapid_if_" + V.rand()
    }

    function c(e) {
      var t = "display:none;";
      !V.isIE || 6 !== V.ieV && 7 !== V.ieV && 8 !== V.ieV ? V.sa(e, "style", t) : e.style.setAttribute("cssText", t, 0)
    }

    function u(e) {
      var t = null;
      if (V.isIE && 8 >= V.ieV) {
        var n = "";
        V.isSecure() && 6 == V.ieV && (n = 'src="https://geo.yahoo.com/b.html"'), t = document.createElement("<iframe " + n + ' name="' + e + '"></iframe>')
      } else t = document.createElement("iframe");
      return t.name = e, t
    }

    function s() {
      setTimeout(function () {
        var e = u("");
        V.addEvent(e, "load", function () {
          V.rmBodyEl(e)
        }), V.appBodyEl(e)
      }, 1)
    }

    function l(e, t) {
      var n = null, r = V.make("form"), o = V.make("input"), i = a(), l = a(), d = "application/x-www-form-urlencoded;charset=UTF-8";
      n = u(i), c(n), c(r), r.id = l, r.method = "POST", r.action = v(t), r.target = i, V.isIE && 7 >= V.ieV ? r.setAttribute("enctype", d) : (r.setAttribute("enctype", d), r.setAttribute("encoding", d)), o.name = "q", o.value = e, V.isIE && V.ieV >= 10 && (o.type = "submit"), r.appendChild(o);
      var f = "load", m = function () {
        var e = "";
        if (q.ldbg && (!V.isIE || V.ieV >= 9)) {
          var t = n.contentDocument || n.contentWindow.document;
          e = t.body.innerHTML
        }
        V.rmEvent(n, f, m), setTimeout(function () {
          V.rmBodyEl(n), V.rmBodyEl(r)
        }, 0), q.ldbg && p("iframe resp: " + e), V.isIE && 7 >= V.ieV && s()
      };
      V.addEvent(n, f, m), V.appBodyEl(n), V.appBodyEl(r), r.submit()
    }

    function v(e) {
      var t = q.deb, n = V.rand(), r = [V.curProto(), q.yql_host, q.yql_path, "?yhlVer=2&yhlClient=rapid&yhlS=", q.spaceid, t === !0 ? "&yhlEnv=staging" : "", t === !0 || q.ldbg ? "&debug=true&diagnostics=true" : "", V.isIE && V.ieV ? "&yhlUA=ie" + V.ieV : "", V.isIE && 8 == V.ieV ? "&format=json" : "", "&yhlCT=2", "&yhlBTMS=", (new Date).valueOf(), "&yhlClientVer=", q.version, "&yhlRnd=", n, "&yhlCompressed=", e || 0, q.gen_bcookie ? "&yhlBcookie=1" : ""].join("");
      return q.ldbg && p(r), r
    }

    function g(e, t) {
      var n = V.getXHR(), r = v(t);
      n.open("POST", r, !0), n.withCredentials = !0, n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), q.ldbg && (n.onreadystatechange = function () {
        4 === n.readyState && p(n.status + ":xhr response: " + n.responseText)
      }), n.send(e)
    }

    function b(e, t, n) {
      var r = {};
      return V.isObj(e) ? (V.aug(r, e, n), r) : r
    }

    function k(e, t) {
      var n = {m: V.norm(e.moduleName), l: []};
      e.moduleYLK && (n.ylk = e.moduleYLK.getAll());
      for (var r = e.links, o = function (e) {
        var n = "_p" === e;
        return t && n ? !0 : "sec" !== e && !n
      }, i = 0, a = r.length; a > i; i++)n.l.push(b(r[i], t, o));
      return n
    }

    function A(e, t) {
      var n = [], r = null;
      for (var o in e)if (V.hasOwn(e, o) && (r = e[o])) {
        var i = k(r, t);
        i.l.length > 0 ? n.push(i) : q.ldbg && p('Not capturing 0 links mod: "' + r.moduleName + '"')
      }
      return n
    }

    function E(e, t) {
      return e ? "pv" : t && t.event ? t.event.type.getYQLID() : "lv"
    }

    function T(e, t, n, r, o) {
      return [{t: E(t, o), s: q.spaceid, pp: C(t, r).getAll(), _ts: h(), lv: A(e, n)}]
    }

    function C(e, t) {
      var r = n.makeFromPP(q.keys);
      return r.absorb(t), e && r.set("A_", 1), r
    }

    function O(e, t, n) {
      var r = "select * from x where a = '" + e + "'";
      return (t ? "q=" : "") + (n ? V.enc(r) : r)
    }

    function I(e) {
      var t = {bp: H(), r: e.call(0), yrid: q.yrid, optout: q.oo, nol: q.nol};
      return V.toJSON(t)
    }

    function x(e, t, n) {
      var r = {};
      n.event && V.aug(r, n.event.data), n.pp && V.aug(r, n.pp);
      var o = I(function () {
        return T([e], t, !0, r, n)
      });
      M(o, t)
    }

    function D(e, t, n, r) {
      var o = I(function () {
        return T(e, t, !1, n, r)
      });
      M(o)
    }

    function P(e) {
      return e.identifier
    }

    function M(e) {
      function t(e, t) {
        0 === t && (e = e.replace(/'/g, "\\'")), r && p("body: " + e), V.hasCORS() ? (o = O(e, !0, !0), g(o, t)) : (o = O(e, 0, 0), l(o, t))
      }

      function n() {
        c || (c = !0, t(e, 0), r && p("sent in failSend"))
      }

      var r = q.ldbg, o = "", i = U[q.compr_type];
      if (q.compr_on && V.hasWorkers() && i > 1 && e.length > 2048) {
        r && p("Looking for worker:" + q.webworker_file + ", compr timeout:" + q.compr_timeout);
        var a = new Worker(q.webworker_file), c = !1, u = null, s = 0;
        a.onerror = function (e) {
          clearTimeout(u), n(), d(e.message), a.terminate()
        }, a.onmessage = function (n) {
          clearTimeout(u);
          var o = V.tms();
          c || (c = !0, t(n.data, i)), r && p("Ratio (" + n.data.length + "/" + e.length + "): " + (100 * n.data.length / e.length).toFixed(2) + "% -> C_T: " + (o - s) + " ms (" + o + "-" + s + ")"), a.terminate()
        }, r && p("posting to worker: " + e), s = V.tms(), a.postMessage({
          type: i,
          json: e
        }), u = setTimeout(function () {
          n(), a.terminate()
        }, q.compr_timeout)
      } else t(e, 0)
    }

    function L(e, t, n) {
      return V.curProto() + j + "/" + e + ["?s=" + (n ? n : q.spaceid), "t=" + V.rand() + "," + Math.random(), "_I=" + q.yrid, "_AO=" + q.oo, "_NOL=" + q.nol, "_R=" + V.enc(q.getReferrer()), ("c" === e ? "_K=" : "_P=") + N(t)].join("&")
    }

    function N(e) {
      var t = new n(H(!1));
      return t.absorb(q.keys.getAll()), t.set("_ts", h()), e && (e instanceof n ? t.absorb(e.getAll()) : f("Internal error in buildGeoPP: not PP type")), q.version + "%05" + t.ser()
    }

    function S(e) {
      var t = [L("c") + "&_C=" + V.ser(e.data)];
      return t.join("&")
    }

    function R(e, t) {
      var n = e[t];
      return n && V.isNum(n) && n >= 0 ? n : null
    }

    function Y(e) {
      var t = V.getAttribute(e, V.DATA_ACTION), n = V.getAttribute(e, V.data_action_outcome);
      return null !== t ? R(q.ywa_action_map, t) : null !== n ? R(q.ywa_outcome_map, n) : null
    }

    var j = YAHOO.i13n.beacon_server || "geo.yahoo.com", H = function (e) {
      var t = {_pl: 1, A_v: q.version}, n = q.getReferrer();
      return n && e !== !1 && (t._R = n.substring(0, V.MAX_VALUE_LENGTH)), q.test_id && (t.test = q.test_id), q.ex && (t._ex = 1), t._bt || (t._bt = "rapid"), t
    }, W = function () {
      var e = null, t = [], n = 0, r = q.addmod_timeout;
      return function (o, i, a, c) {
        clearTimeout(e);
        var u = +new Date - n;
        if (t = V.uniqConcat(t, o, P), u > r)n = +new Date, D(t, i, a, c), t = []; else {
          var s = r - u;
          e = setTimeout(function () {
            q.ldbg && p("queueing send in addMods"), D(t, i, a, c), t = []
          }, s)
        }
      }
    }();
    return {
      sendGeoT: function (e) {
        var t = [V.curProto(), j, "/t?", e].join("");
        r(t)
      }, sendGeoPV: function () {
        r(L("b"))
      }, sendRapidNoDelay: function (e, t, o, i, a) {
        if (!q.yql_enabled || a) {
          var c = null;
          o && (c = new n(o)), r(L(t ? "b" : "p", c))
        } else D(e, t, o, i)
      }, sendRapid: function (e, t, n, r) {
        W(e, t, n, r)
      }, sendRefreshedContent: x, sendYWAEvent: function (e) {
        var t = null, n = null, o = e.name;
        q.ywa_action_map && o && (t = R(q.ywa_action_map, o)), null !== t && (q.ywa_outcome_map && e.outcome && (n = R(q.ywa_outcome_map, e.outcome)), r(i("e", t, n, null, e.data)))
      }, sendULTEvent: function (e, t) {
        var o = {};
        e && e.data && (o = e.data);
        var i = L("p", new n(o), t || 0);
        e.type && (i += "&_V=" + e.type.spaceidPrefix), r(i)
      }, sendDwell: function (e) {
        this.sendULTEvent(e, e.data.s)
      }, sendEvents: function (e) {
        q.USE_RAPID && this.sendULTEvent(e), q.ywa && this.sendYWAEvent(e)
      }, sendClick: function (e) {
        var t = null, n = "", a = "", c = null, u = !1, s = null;
        if (q.USE_RAPID && (n = S(e)), q.ywa) {
          var l = e.data, d = e.targetElement, f = {18: l.sec, 19: l.slk, 20: l._p};
          c = d ? Y(d) : R(q.ywa_outcome_map, e.outcome), q.ywa_cf_override && o(l, f), a = i("c", 0, c, f)
        }
        if (q.async_all_clicks || !e.synch)return n && r(n), a && r(a), void 0;
        if (V.prevDef(e.event), t = function () {
            if (!u) {
              u = !0;
              var t = e.targetElement.href;
              if (q.click_postmsg.origin) {
                var n = q.click_postmsg.window || top, r = q.click_postmsg.payload || {};
                r.href = t, n.postMessage(V.toJSON(r), q.click_postmsg.origin)
              } else e.hasTargetTop ? top.document.location = t : document.location = t
            }
          }, q.USE_RAPID)if (q.ywa) {
          var p = new Image, m = new Image, v = 0;
          p.onload = p.onerror = p.onabort = m.onload = m.onerror = m.onabort = function () {
            2 === ++v && (clearTimeout(s), t())
          }, p.src = n, m.src = a, s = setTimeout(t, q.click_timeout), setTimeout(function () {
            p = null, m = null
          }, 1e5)
        } else r(n, 0, 0, t); else q.ywa && r(a, 0, 0, t)
      }, sendYWAPV: function (e) {
        function t() {
          r[0].removeChild(a)
        }

        var n = i("p", 0, 0, 0, 0, e), r = document.getElementsByTagName("head"), o = "true";
        if (0 !== r.length) {
          var a = V.make("script", {defer: o, async: o, type: "text/javascript", src: n});
          V.isIE ? a.onreadystatechange = function () {
            var e = this.readyState;
            ("loaded" === e || "complete" === e) && (a.onload = a.onreadystatechange = null, t())
          } : V.isWebkit ? a.addEventListener("load", t) : a.onload = t, r[0].appendChild(a)
        }
      }, sendInternalSearch: function (e, t) {
        e = e || "", V.isNum(t) || (t = 0);
        var n = {isk: e, isr: t}, o = i("e", "INTERNAL_SEARCH", null, null, null, null, n);
        r(o)
      }, sendYWAECommerce: function (e, t) {
        var n = {}, o = {PRODUCT_VIEW: 1, ADD_TO_CART: 1, CANCELLED_SALE: 1, PENDING_SALE: 1, SALE: 1}, a = {
          amount: "xa",
          orderId: "oc",
          tax: "xt",
          shipping: "xs",
          discount: "xd",
          sku: "p",
          units: "q",
          amounts: "r"
        };
        if (!(e in o))return f("invalid YWA ecommerce action: " + e), void 0;
        for (var c in t)if (V.hasOwn(t, c) && c in a) {
          var u = a[c];
          n[u] = t[c]
        }
        "SALE" === e && (e = 1);
        var s = i("e", e, null, null, null, null, n);
        r(s)
      }
    }
  }

  function k(e, t, n, r, i, a) {
    var c = "", u = null, s = {sec: t, _p: n};
    return a ? (s.slk = i || "section", u = o(r)) : (r.setAttribute(q.anc_pos_attr, n), c = V.getLT(r, e), c && "" !== c ? u = o(r) : c = "_ELINK_", s.slk = c), null !== u && V.aug(s, u.getAll()), s
  }

  function A() {
    var e = {};
    return {
      addModule: function (t, n) {
        e[V.norm(t)] = n
      }, addModules: function (e) {
        var t = V.isArr(e), n = [];
        t || V.isStr(e) && (e = Array(e), t = !0);
        for (var r in e)if (V.hasOwn(e, r)) {
          var o = t ? e[r] : r, i = V.trim(e[r]);
          if (this.exists(o))f('addModules() called with prev processed id:"' + o + '"'); else {
            var a = L(i, o);
            a && (this.addModule(o, a), n.push(a))
          }
        }
        return n
      }, getModules: function () {
        return e
      }, refreshModule: function (t, n, r, o) {
        var i = e[V.norm(t)];
        i ? i.refreshModule(t, n, r, o) : f("refreshModule called on unknown section: " + i)
      }, removeModule: function (t) {
        var n = e[V.norm(t)];
        n && (n.removeHandlers(), delete e[t])
      }, destroy: function () {
        for (var t in e)V.hasOwn(e, t) && this.removeModule(t);
        e = {}
      }, exists: function (t) {
        return e[V.norm(t)]
      }
    }
  }

  function E(e, t) {
    return V.hasClass(e, "rapid_track_href") ? "href" : V.hasClass(e, "rapid_track_text") ? "text" : V.hasClass(e, "rapid_track_title") ? "title" : V.hasClass(e, "rapid_track_id") ? "id" : t
  }

  function T(e) {
    return "input" === e.nodeName.toLowerCase() && "submit" === V.getAttribute(e, "type")
  }

  function C(e, t) {
    var n = x(e, t);
    F = n, n && W.sendClick(n)
  }

  function O(e, t, n) {
    var r = V.getAttribute;
    return t.target && "_blank" === t.target.toLowerCase() || 2 === e.which || 4 === e.button || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey || "on" === r(t, "data-nofollow") || r(t, "href") && "javascript:" === r(t, "href").substr(0, 11).toLowerCase() || V.hasClass(t, q.nofollow_classname) || V.hasClass(n, q.nofollow_classname)
  }

  function I(e, t, n, r) {
    n = n || {};
    var o = null;
    return e ? (o = YAHOO.i13n.EventTypes.getEventByName(e), n._E = o.getEventName(), t = n._E) : n._E = t || "_", r && (n.outcm = r), {
      type: o,
      name: t,
      data: n,
      outcome: r
    }
  }

  function x(e, t) {
    e = e || event;
    for (var n = V.getTarget(e), r = "button", i = "input", a = "", c = !1, u = null; n && (a = n.nodeName.toLowerCase()) && "a" !== a && a !== r && !T(n) && !V.hasClass(n, q.nonanchor_track_class);)n = n.parentNode;
    if (!n || V.hasClass(n, q.no_click_listen))return 0;
    if (V.hasClass(n, q.nonanchor_track_class)) {
      u = {pos: 0, sec: t.moduleName, slk: "_"};
      var s = o(n, 1);
      s && V.aug(u, s.getAll())
    } else {
      var l = V.getAttribute(n, q.anc_pos_attr);
      if (u = t.getLinkAtPos(l), !u)return 0;
      a === i || a === r || O(e, n, t.moduleElement) || (c = !0)
    }
    if (!u.tar) {
      var d = V.getAttribute(n, "href");
      d && (u.tar = V.extDomain(d)), d && u.tar || (u.tar = V.extDomain(window.document.location + ""))
    }
    u.tar_uri || (u.tar_uri = n.pathname ? n.pathname.substring(0, V.MAX_VALUE_LENGTH) : "");
    var f = t.moduleYLK;
    if (f) {
      var p = f.getAll();
      V.aug(u, p, function (e) {
        return !(e in u)
      })
    }
    return u.A_xy = V.xy(e), u.A_sr = V.sr(), {
      data: u,
      event: e,
      moduleElement: t.moduleElement,
      targetElement: n,
      synch: c,
      hasTargetTop: n && n.target && "_top" === n.target.toLowerCase()
    }
  }

  function D(e, t, n, r, o) {
    var i = {};
    return V.aug(i, r), i.sec = e, i.slk = t, i._p = n, {
      data: i,
      outcome: o,
      event: null,
      moduleElement: null,
      targetElement: null,
      synch: !1,
      hasTargetTop: !1
    }
  }

  function P(e, t, n) {
    t || (t = document);
    for (var r = e.split(","), o = [], i = 0, a = r.length; a > i; i++)for (var c = t.getElementsByTagName(r[i]), u = 0, s = c.length; s > u; u++) {
      var l = c[u];
      (!n || n.call(0, l)) && o.push(l)
    }
    var d = o[0];
    return d ? (d.sourceIndex ? o.sort(function (e, t) {
      return e.sourceIndex - t.sourceIndex
    }) : d.compareDocumentPosition && o.sort(function (e, t) {
      return 3 - (6 & e.compareDocumentPosition(t))
    }), o) : []
  }

  function M(e, t, n, r) {
    t || (t = document);
    var o = e.split(",");
    n = n || [];
    var i = t.childNodes;
    if ("true" !== V.getAttribute(t, q.skip_attr))for (var a = 0, c = i.length; c > a; a++) {
      var u = i[a];
      V.isTagOfInterest(u, o) && (!r || r.call(0, u)) && n.push(u), "true" !== V.getAttribute(u, q.skip_attr) ? M(e, u, n, r) : "true" === V.getAttribute(u, q.skip_attr) && n.push(u)
    }
    var s = n[0];
    return s ? (s.sourceIndex ? n.sort(function (e, t) {
      return e.sourceIndex - t.sourceIndex
    }) : s.compareDocumentPosition && n.sort(function (e, t) {
      return 3 - (6 & e.compareDocumentPosition(t))
    }), n) : []
  }

  function L(e, t) {
    function n(t, n) {
      var i = [];
      n = n || 1;
      for (var u = 0, l = t.length; l > u; u++)if ("div" === t[u].tagName.toLowerCase()) {
        var d = t[u], f = o(d), p = k(s, e, 1, d, f.map.slk || a.map.slk, !0);
        c.push(p), i.push(p)
      } else {
        var p = k(s, e, n++, t[u]);
        c.push(p), i.push(p)
      }
      if ("true" === V.getAttribute(r, q.skip_attr)) {
        var p = k(s, e, 1, d, a.map.slk, !0);
        c.push(p), i.push(p)
      }
      return i
    }

    var r = document.getElementById(t), i = "a,button,input";
    if (!r)return d("Specified module not in DOM: " + t), null;
    var a = o(r), c = [], u = q.parse_dom ? M(i, r) : P(i, r), s = E(r, q.lt_attr), l = u.length, f = V.getAttribute(r, q.track_type);
    n(u);
    var m = {
      moduleYLK: a,
      links: c,
      moduleName: e,
      trackType: f,
      moduleElement: r,
      refreshModule: function (e, t, r, o) {
        function a(e) {
          return !V.getAttribute(e, q.anc_pos_attr)
        }

        var c = q.parse_dom ? M(i, document.getElementById(e), null, a) : P(i, document.getElementById(e), a);
        if (t === !0 || c.length > 0) {
          var u = n(c, l + 1);
          if (l += c.length, q.USE_RAPID || o.event) {
            var s = {};
            V.aug(s, this), s.links = u, (t === !0 || r) && W.sendRefreshedContent(s, t, o)
          }
        } else V.ldbg && p("refreshModule(" + e + ") - no new links.");
        t === !0 && (q.ywa && W.sendYWAPV(o.pp), q.apv && B && B.reInit())
      },
      removeHandlers: function () {
        V.rmEvent(r, "click", v)
      },
      getLinkAtPos: function (e) {
        return e > c.length ? null : c[e - 1]
      },
      identifier: t
    }, v = function (e) {
      C(e, m)
    };
    return V.addEvent(r, "click", v), m
  }

  function N(e, t, r) {
    if (q.ldbg && p("beaconPageview called, pp=" + V.fData(e)), t && !q.persist_asid && s(), q.USE_RAPID && W.sendRapidNoDelay([], !0, e, null, r), q.ywa) {
      var o = n.makeFromPP(q.keys);
      o.absorb(e), W.sendYWAPV(o.getAll())
    }
    q.apv && null != B && B.reInit()
  }

  function S() {
    var e = null, t = function () {
      var e = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      return e
    }, n = lastApvTime = (new Date).getTime(), r = t(), o = -1, i = function () {
      var e = t(), n = -1 === o ? e - r : e - o, i = n > 0 ? 0 : 1;
      if (Math.abs(n) > q.apv_px) {
        var a = {A_apv: 1, A_apx: e, A_asd: i};
        N(a, !1, !0), o = e, lastApvTime = (new Date).getTime()
      }
    };
    V.addEvent(window, "scroll", function () {
      null != e && clearTimeout(e);
      var o = (new Date).getTime();
      q.apv_time > o - n && (r = t(), lastApvTime = o), e = setTimeout(function () {
        i()
      }, q.apv_time)
    }, !1), this.reInit = function () {
      r = t(), o = -1, n = lastApvTime = (new Date).getTime()
    }
  }

  function R() {
    v(), q.ldbg && p("tracked_mods: " + V.fData(q.tracked_mods));
    var e = H.addModules(q.tracked_mods);
    q.USE_RAPID && q.pageview_on_init && W.sendRapidNoDelay(e, 1 == q.client_only), q.ywa && q.pageview_on_init && W.sendYWAPV(), q.apv && V.executeOnLoad(function () {
      B = new S
    })
  }

  function Y(e) {
    var t = navigator.userAgent, n = Object.prototype, r = t.match(/MSIE\s[^;]*/) || t.match(/Trident\/[^;]*/) ? 1 : 0, o = /KHTML/.test(t) ? 1 : 0, i = null !== t.match(/(iPhone|iPad|iPod)/gi), a = (t.indexOf("android") > -1, i && null !== t.match(/AppleWebKit/)), c = RegExp(/\ufeff|\uffef|[\u0000-\u001f]/g), u = RegExp(/[\u007f-\u00a0]|\s{2,}/g), s = "http://", l = "https://", p = "class", m = " ", v = 300, h = -1, _ = "https:" === window.location.protocol;
    return r && (h = navigator.appVersion.match(/MSIE/) ? parseFloat(navigator.appVersion.split("MSIE")[1]) : parseFloat(navigator.appVersion.split("; rv:")[1])), {
      ca: "%01",
      cb: "%02",
      cc: "%03",
      cd: "%04",
      ce: "%05",
      cf: "%06",
      cg: "%07",
      ch: "%08",
      ylk_kv_delim: e.ylk_kv_delim || ":",
      ylk_pair_delim: e.ylk_pair_delim || ";",
      DATA_ACTION: "data-action",
      data_action_outcome: "data-action-outcome",
      isIE: r,
      isIOSSafari: a,
      isWebkit: o,
      ieV: h,
      MAX_VALUE_LENGTH: v,
      hasOwn: function (e, t) {
        return n.hasOwnProperty.call(e, t)
      },
      enc: encodeURIComponent,
      dec: decodeURIComponent,
      curProto: function () {
        return _ ? l : s
      },
      isSecure: function () {
        return _
      },
      strip: function (e) {
        for (var t = {"/": "P", ";": "1", "?": "P", "&": "1", "#": "P"}, n = {
          url: e,
          clean: "",
          cookie: "",
          keys: []
        }, r = 0; -1 !== e.indexOf("_yl", r);) {
          var o = e.indexOf("_yl", r);
          if (o > r && (n.clean += e.slice(r, o - 1)), r = o + 3, t[e.charAt(o - 1)] && "=" === e.charAt(o + 4)) {
            n.ult = 1;
            var i = "_yl" + e.charAt(o + 3), a = "";
            for (o += 5; e.length > o && !t[e.charAt(o)]; o++)a += e.charAt(o);
            n.keys.push(i), n[i] = a, "_ylv" !== i && (n.cookie += "&" + i + "=" + a), t[e.charAt(o)] && "P" === t[e.charAt(o)] && (n.clean += e.charAt(o)), r = o + 1
          } else n.clean += e.slice(o - 1, r)
        }
        return n.ult && (n.cookie = n.cookie.substr(1), n.clean += e.substr(r), "0" === n._ylv), n
      },
      prevDef: function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
      },
      appBodyEl: function (e) {
        document.body.appendChild(e)
      },
      rmBodyEl: function (e) {
        document.body.removeChild(e)
      },
      sa: function (e, t, n) {
        e.setAttribute(t, n)
      },
      make: function (e, t) {
        var n = document.createElement(e);
        if (t && this.isObj(t))for (var r in t)this.sa(n, r, t[r]);
        return n
      },
      getXHR: function () {
        function e() {
          for (var e = !1, n = t.length, r = 0; n > r; r++) {
            try {
              e = t[r]()
            } catch (o) {
              continue
            }
            break
          }
          return e
        }

        var t = [function () {
          return new XMLHttpRequest
        }, function () {
          return new ActiveXObject("Msxml2.XMLHTTP")
        }, function () {
          return new ActiveXObject("Msxml3.XMLHTTP")
        }, function () {
          return new ActiveXObject("Microsoft.XMLHTTP")
        }];
        return e()
      },
      hasLS: function () {
        try {
          return "localStorage"in window && null !== window.localStorage
        } catch (e) {
          return !1
        }
      },
      hasCORS: function () {
        return r && 10 > h ? !1 : "withCredentials"in new XMLHttpRequest ? !0 : "undefined" != typeof XDomainRequest ? !0 : !1
      },
      hasWorkers: function () {
        return !!window.Worker
      },
      clearCookie: function (e, t, n) {
        t = t ? t : "/", n = n ? n : "", document.cookie = e + "= ; path=" + t + "; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + n + ";"
      },
      uniqConcat: function (e, t, n) {
        function r(e) {
          for (var t = 0, r = e.length; r > t; t++) {
            var a = e[t];
            if (a) {
              var c = n(a);
              i[c] || (i[c] = 1, o.push(a))
            }
          }
        }

        var o = [], i = {};
        return r(e), r(t), o
      },
      trim: function (e) {
        return e ? e.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : e
      },
      extDomain: function (e) {
        var t = e.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return t && t[1]
      },
      getAttribute: function (e, t) {
        var n = "";
        return document.documentElement.hasAttribute || t !== p || (t = "className"), e && e.getAttribute && (n = e.getAttribute(t, 2)), n
      },
      isDate: function (e) {
        return "[object Date]" === n.toString.call(e)
      },
      isArr: function (e) {
        return "[object Array]" === n.toString.apply(e)
      },
      isStr: function (e) {
        return "string" == typeof e
      },
      isNum: function (e) {
        return "number" == typeof e && isFinite(e)
      },
      isNumeric: function (e) {
        return e - 0 == e && (e + "").replace(/^\s+|\s+$/g, "").length > 0
      },
      isObj: function (e) {
        return e && "object" == typeof e
      },
      rTN: function (e) {
        try {
          if (e && 3 === e.nodeType)return e.parentNode
        } catch (t) {
          f(t)
        }
        return e
      },
      getTarget: function (e) {
        var t = e.target || e.srcElement;
        return this.rTN(t)
      },
      addEvent: function (e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
      },
      rmEvent: function (e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
      },
      aug: function (e, t, n) {
        if (t)for (var r in t)if (this.hasOwn(t, r)) {
          if (n && !n.call(null, r))continue;
          e[r] = t[r]
        }
      },
      rmProto: function (e) {
        return e ? e.substr(0, 7) === s ? e.substr(7, e.length) : e.substr(0, 8) === l ? e.substr(8, e.length) : e : ""
      },
      norm: function (e) {
        return null === e ? "" : (e = "" + e, this.trim(e.replace(u, " ").replace(c, "")))
      },
      _hasClass: function (e, t) {
        var n, r = !1;
        return e && t && (n = this.getAttribute(e, p) || "", r = t.exec ? t.test(n) : t && (m + n + m).indexOf(m + t + m) > -1), r
      },
      hasClass: function (e, t) {
        if (this.isArr(t)) {
          for (var n = 0, r = t.length; r > n; n++)if (this._hasClass(e, t[n]))return !0;
          return !1
        }
        return this.isStr(t) ? this._hasClass(e, t) : !1
      },
      quote: function (e) {
        var t = /["\\\x00-\x1f\x7f-\x9f]/g, n = {
          "\b": "\\b",
          "	": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\"
        }, r = '"', o = '"';
        if (e.match(t)) {
          var i = e.replace(t, function (e) {
            var t = n[e];
            return "string" == typeof t ? t : (t = e.charCodeAt(), "\\u00" + Math.floor(t / 16).toString(16) + (e % 16).toString(16))
          });
          return r + i + r
        }
        return o + e + o
      }, /* @license
       Copyright 2013 jQuery Foundation and other contributors

       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights
       to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       copies of the Software, and to permit persons to whom the Software is
       furnished to do so, subject to the following conditions:

       The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.

       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */
      sfy: function (e) {
        if (!e && "" !== e)return {};
        var t, n = typeof e;
        if ("undefined" === n)return "undefined";
        if ("number" === n || "boolean" === n)return "" + e;
        if ("string" === n)return this.quote(e);
        if ("function" == typeof e.toJSON)return this.sfy(e.toJSON());
        if (this.isDate(e)) {
          var r = e.getUTCMonth() + 1, o = e.getUTCDate(), i = e.getUTCFullYear(), a = e.getUTCHours(), c = e.getUTCMinutes(), u = e.getUTCSeconds(), s = e.getUTCMilliseconds();
          return 10 > r && (r = "0" + r), 10 > o && (o = "0" + o), 10 > a && (a = "0" + a), 10 > c && (c = "0" + c), 10 > u && (u = "0" + u), 100 > s && (s = "0" + s), 10 > s && (s = "0" + s), '"' + i + "-" + r + "-" + o + "T" + a + ":" + c + ":" + u + "." + s + 'Z"'
        }
        if (t = [], this.isArr(e)) {
          for (var l = 0, d = e.length; d > l; l++)t.push(this.sfy(e[l]));
          return "[" + t.join(",") + "]"
        }
        if ("object" === n) {
          for (var f in e)if (this.hasOwn(e, f)) {
            var p = typeof f, m = null;
            if ("string" === p)m = this.quote(f); else {
              if ("number" !== p)continue;
              m = '"' + f + '"'
            }
            if (p = typeof e[f], "function" !== p && "undefined" !== p) {
              var v = "";
              v = null === e[f] ? '""' : 0 === e[f] ? 0 : this.sfy(e[f]), t.push(m + ":" + v)
            }
          }
          return "{" + t.join(",") + "}"
        }
      },
      toJSON: function () {
        var e = null;
        return function (t) {
          return e || (e = "object" == typeof JSON && JSON.stringify && 6 !== h && 7 !== h && 8 !== h ? JSON.stringify : this.sfy), e.call(this, t)
        }
      }(),
      executeOnLoad: function (e) {
        var t = !1, n = function (n) {
          (document.addEventListener || n && "load" === n.type || "complete" === document.readyState) && (t = !0, r(), e.call(this))
        }, r = function () {
          document.addEventListener ? (document.removeEventListener("DOMContentLoaded", n, !1), window.removeEventListener("load", n, !1)) : (document.detachEvent("onreadystatechange", n), window.detachEvent("onload", n))
        };
        if ("complete" === document.readyState)setTimeout(n); else if (document.addEventListener)document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1); else {
          document.attachEvent("onreadystatechange", n), window.attachEvent("onload", n);
          var o = !1;
          try {
            o = null == window.frameElement && document.documentElement
          } catch (i) {
          }
          o && o.doScroll && function a() {
            if (!t) {
              try {
                o.doScroll("left")
              } catch (n) {
                return setTimeout(a, 50)
              }
              r(), e.call(this)
            }
          }()
        }
      },
      getLinkContent: function (e) {
        for (var t, n = 0, r = ""; (t = e.childNodes[n]) && t; n++)1 === t.nodeType && ("img" === t.nodeName.toLowerCase() && (r += (this.getAttribute(t, "alt") || "") + " "), r += this.getLinkContent(t));
        return r
      },
      fData: function (e) {
        return this.isStr(e) ? e : this.toJSON(e)
      },
      getLT: function (e, t) {
        if (!e)return "_";
        var n = "";
        return t = t.toLowerCase(), n = "input" === e.nodeName.toLowerCase() ? this.getAttribute(e, "value") : "text" === t ? o ? e.textContent : e.innerText ? e.innerText : e.textContent : "href" === t ? this.rmProto(this.getAttribute(e, "href")) : this.getAttribute(e, t) || "", n = this.norm(n), "" === n && (n = this.norm(this.getLinkContent(e)), n || (n = this.norm(this.rmProto(this.getAttribute(e, "href"))))), "" === n ? "_" : n
      },
      clref: function (e) {
        if (0 !== e.indexOf(s) && 0 !== e.indexOf(l))return "";
        var t = this.strip(e);
        return t.clean || t.url
      },
      cold: function () {
        return screen ? screen.colorDepth || screen.pixelDepth : "unknown"
      },
      sr: function (e) {
        return screen ? screen.width + (e ? e : ",") + screen.height : ""
      },
      xy: function (e) {
        function t() {
          var e = document.documentElement, t = document.body;
          return e && (e.scrollTop || e.scrollLeft) ? [e.scrollTop, e.scrollLeft] : t ? [t.scrollTop, t.scrollLeft] : [0, 0]
        }

        var n = null, o = e.pageX, i = e.pageY;
        return r && (n = t()), o || 0 === o || (o = e.clientX || 0, r && (o += n[1])), i || 0 === i || (i = e.clientY || 0, r && (i += n[0])), o + "," + i
      },
      hasCC: function (e) {
        for (var t = 0, n = e.length; n > t; t++) {
          var r = e.charCodeAt(t);
          if (32 > r || "=" === r)return !0
        }
        return !1
      },
      isValidPair: function (e, t) {
        return e.length > 8 || t.length > v ? (d("Invalid key/value pair (" + e + "=" + t + ") Size must be < 8/300 respectively."), !1) : !0
      },
      ser: function (e, t) {
        if (!e)return "";
        void 0 === typeof t && (t = !0);
        var n = [], r = "";
        for (var o in e)if (this.hasOwn(e, o)) {
          var i = o, a = e[o];
          if (null === i || null === a)continue;
          if (i += "", a += "", !this.isValidPair(i, a))continue;
          if (!this.hasCC(i) && !this.hasCC(a)) {
            r = "", a = this.trim(a), "" !== a && " " !== a || !t || (a = "_");
            try {
              r = this.enc(i + "" + a)
            } catch (c) {
              r = "_ERR_ENCODE_", f(c)
            }
            n.push(r)
          }
        }
        return n.join(this.cd)
      },
      rand: function () {
        for (var e = 0, t = "", n = ""; 16 > e++;) {
          var r = Math.floor(62 * Math.random());
          n = 10 > r ? r : String.fromCharCode(36 > r ? r + 55 : r + 61), t += n
        }
        return t
      },
      tms: function () {
        return +new Date
      },
      cookEn: function () {
        var e = navigator.cookieEnabled ? 1 : 0, t = "rapidtc";
        return void 0 !== navigator.cookieEnabled || e || (document.cookie = t + "=1", e = -1 != document.cookie.indexOf("testcookie") ? !0 : !1, document.cookie = t + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"), e
      },
      isResCF: function (e) {
        var t = {14: 1, 15: 1, 18: 1, 19: 1, 20: 1};
        return t[e]
      },
      isTagOfInterest: function (e, t) {
        for (var n = 0, r = t.length; r > n; n++)if (e.tagName && e.tagName.toLowerCase() == t[n].toLowerCase())return !0;
        return !1
      }
    }
  }

  ("undefined" == typeof console || console.log === void 0) && (console = {
    log: function () {
    }
  }), console.error === void 0 && (console.error = console.log), console.warn === void 0 && (console.warn = console.log), t.prototype = {
    ser: function () {
      return V.ser(this.map)
    }, set: function (e, t) {
      var n = t ? V.norm(t) : t;
      (void 0 === n || null === n) && (n = ""), null !== n && V.isStr(n) && (n = n.replace(/\\/g, "\\\\")), V.isValidPair(e, n) && (this.map[V.norm(e)] = n, this.count++)
    }, get: function (e) {
      return this.map[e]
    }, getAll: function () {
      return this.map
    }, absorb: function (e) {
      if (e && V.isObj(e))for (var t in e)V.hasOwn(e, t) && this.set(t, e[t])
    }, getSize: function () {
      return this.count
    }
  }, n.prototype = new t, n.prototype.constructor = t, r.prototype = new t, r.prototype.constructor = t, n.makeFromPP = function (e) {
    var t = new n;
    return e && t.absorb(e.getAll()), t
  };
  var j = new n, V = Y(e), H = new A, U = {none: 0, gzip: 1, lzw: 2, deflate: 3};
  m.prototype = {
    getYWAFPC: function () {
      if (!q.ywa)return null;
      var e = this.cookieMap["fpc" + q.ywa.project_id], t = this.cookieMap.fpc, n = w(t), r = null;
      if (t && (r = n[q.ywa.project_id]), e && (V.clearCookie("fpc" + q.ywa.project_id), !r)) {
        n[q.ywa.project_id] = e;
        var o = y(n);
        _("fpc", o, 31536e4), r = e
      }
      return r ? r : null
    }, getCookieByName: function (e) {
      return this.cookieMap[e]
    }, getYWADPID: function () {
      if (q.ywa) {
        var e, t = "ywandp", n = "ywadp" + q.ywa.project_id, r = w(this.cookieMap[t]), o = r[q.ywa.project_id];
        if (void 0 === o || null === o || "" === o) {
          e = this.cookieMap[n], r[q.ywa.project_id] = e ? e : g(), o = r[q.ywa.project_id];
          var i = y(r);
          _(t, i, 31536e4), this.cookieMap[t] = i
        }
        q.ywa_dpid = o
      }
    }
  };
  var q = u(e), W = b(), B = null, F = null;
  return R(), {
    init: function () {
    }, beaconEvent: function (e, t, n) {
      q.ldbg && p('beaconEvent: event="' + e + '" data=' + V.fData(t) + " outcome=" + n);
      var r = I(0, e, t, n);
      W.sendEvents(r)
    }, beaconRichView: function (e, t) {
      q.ldbg && p("beaconRichView: outcome=" + t);
      var n = I("richview", "", e, t);
      W.sendEvents(n)
    }, beaconClick: function (e, t, n, r, o) {
      !r && o && (r = {}), o && (r.outcm = o), W.sendClick(D(e, t, n, r, o))
    }, addModules: function (e, t, n) {
      q.ldbg && p("addModules() called: mods=" + V.fData(e) + " isPage: " + t), n = n || {};
      var r = {A_am: 1};
      n.pp && V.aug(r, n.pp);
      var o = !1;
      switch (t || (t = !1), t) {
        case 1:
        case"1":
        case!0:
          t = !0;
          break;
        case 2:
        case"2":
          o = !0, t = !1, n.event = I("contentmodification", "", {});
          break;
        case 0:
        case"0":
        case!1:
        default:
          t = !1
      }
      if (!q.yql_enabled)return t ? N(r, !1) : n.event && this.beaconRichView(r, n.event.outcome), void 0;
      n && n.event && t && (f("Cannot track event type and pageview at same time."), n.event = null);
      var i = H.addModules(e);
      (0 !== i.length || n.event) && ((q.USE_RAPID || n.event) && (t || n.event || n.pp ? (n.event && n.event.data && V.aug(r, n.event.data), W.sendRapidNoDelay(i, t, r, n)) : W.sendRapid(i, t, r, n)), t === !0 && (q.ywa && W.sendYWAPV(r), q.apv && B && B.reInit()))
    }, addModulesAsRichView: function (e, t) {
      var n = I("richview", "", {}, t), r = !0;
      this.addModules(e, !1, {event: n}), q.yql_enabled || (r = !1), q.ywa && r && W.sendYWAEvent(n)
    }, refreshModule: function (e, t, n, r) {
      q.ldbg && p("refreshModule called: mod=" + e + " isPV: " + t + " sendLinks: " + n + " options: " + V.fData(r));
      var o = !1;
      switch (r = r || {}, t || (t = !1), t) {
        case 1:
        case"1":
        case!0:
          t = !0;
          break;
        case 2:
        case"2":
          o = !0, t = !1, r.event = I("contentmodification", "", {});
          break;
        case 0:
        case"0":
        case!1:
        default:
          t = !1
      }
      if (!q.yql_enabled) {
        var i = r.pp || {};
        return t ? N(i, !1) : r.event && this.beaconRichView(i, r.event.outcome), void 0
      }
      var a = n === !1 ? !1 : !0;
      t && r && r.event && (r.event = null), H.refreshModule(e, t, a, r)
    }, refreshModuleAsRichView: function (e, t) {
      var n = I("richview", "", {}, t), r = !0;
      this.refreshModule(e, !1, !0, {event: n}), q.yql_enabled || (r = !1), q.ywa && r && W.sendYWAEvent(n)
    }, removeModule: function (e) {
      H.removeModule(e)
    }, isModuleTracked: function (e) {
      return q.ldbg && p("isTracked called: " + e), H && void 0 !== H.exists(e)
    }, destroy: function () {
      p("destroy called"), H.destroy()
    }, reInit: function (e) {
      return q.ldbg && p("reInit called with: " + V.fData(e)), e = e || {}, e.spaceid ? (j = new n, q = u(e), V = Y(e), void 0) : (f("Invalid spid in reInit config: " + V.fData(e)), void 0)
    }, beaconPageview: function (e) {
      N(e, !0)
    }, beaconECommerce: function (e, t) {
      q.ywa && W.sendYWAECommerce(e, t)
    }, beaconInternalSearch: function (e, t) {
      q.ywa && W.sendInternalSearch(e, t)
    }, getCurrentSID: function () {
      return j.get("A_sid")
    }, notifyHistoryPushStateCalled: function () {
      browserEventManager.historyStateChanged()
    }
  }
};