/*! scripts/vendor/yahoo/rapid/rapid-3.31.js */
if (typeof YAHOO === "undefined" || !YAHOO) {
  YAHOO = {}
}
YAHOO.i13n = YAHOO.i13n || {};
YAHOO.i13n.EventTypes = (function () {
  var d = "richview";
  var c = "contentmodification";

  function b(g, e, f) {
    this.yqlid = g;
    this.eventName = e;
    this.spaceidPrefix = f
  }

  b.prototype = {
    getYQLID: function () {
      return this.yqlid
    }, getEventName: function () {
      return this.eventName
    }
  };
  var a = {
    pageview: new b("pv", "pageview", ""),
    simple: new b("lv", "event", "P"),
    linkview: new b("lv", "linkview", "P"),
    richview: new b(d, d, "R"),
    contentmodification: new b(d, c, "R"),
    dwell: new b("lv", "dwell", "D")
  };
  return {
    getEventByName: function (e) {
      return a[e]
    }
  }
})();
YAHOO.i13n.Rapid = function (E) {
  if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {
      log: function () {
      }
    }
  }
  if (typeof console.error === "undefined") {
    console.error = console.log
  }
  if (typeof console.warn === "undefined") {
    console.warn = console.log
  }
  function e() {
  }

  e.prototype = {
    ser: function () {
      return k.ser(this.map)
    }, set: function (ao, U) {
      var ap = (U ? k.norm(U) : U);
      if (ap === undefined || ap === null) {
        ap = ""
      }
      if (ap !== null && k.isStr(ap)) {
        ap = ap.replace(/\\/g, "\\\\")
      }
      if (!k.in_value_whitelist(ao) && ap.length > k.MAX_VALUE_LENGTH) {
        ap = ap.substring(0, k.MAX_VALUE_LENGTH)
      }
      if (k.isValidPair(ao, ap)) {
        this.map[k.norm(ao)] = ap;
        this.count++
      }
    }, get: function (U) {
      return this.map[U]
    }, getAll: function () {
      return this.map
    }, absorb: function (U) {
      if (!U || !k.isObj(U)) {
        return
      }
      for (var ao in U) {
        if (k.hasOwn(U, ao)) {
          this.set(ao, U[ao])
        }
      }
    }, absorb_filter: function (U, ap) {
      if (!U || !k.isObj(U)) {
        return
      }
      for (var ao in U) {
        if (ap && !ap.call(null, ao)) {
          continue
        }
        if (k.hasOwn(U, ao)) {
          this.set(ao, U[ao])
        }
      }
    }, getSize: function () {
      return this.count
    }
  };
  function Y(U) {
    this.map = {};
    this.count = 0;
    if (U) {
      this.absorb(U)
    }
  }

  function j() {
    this.map = {};
    this.count = 0
  }

  Y.prototype = new e();
  Y.prototype.constructor = e;
  j.prototype = new e();
  j.prototype.constructor = e;
  Y.makeFromPP = function (U) {
    var ao = new Y();
    if (U) {
      ao.absorb(U.getAll())
    }
    return ao
  };
  var J = new Y(), k = X(E), ah = new P(), H = {none: 0, gzip: 1, lzw: 2, deflate: 3};

  function w(U, ar) {
    if (!U) {
      return null
    }
    if (ar === null) {
      ar = false
    }
    var ap = new j();
    var av = k.getAttribute(U, k.data_action_outcome);
    if (av) {
      ap.set("outcm", av)
    }
    var at = k.getAttribute(U, "data-ylk");
    if (at === null || at.length === 0) {
      return ap
    }
    var au = at.split(k.ylk_pair_delim);
    for (var aw = 0, ax = au.length; aw < ax; aw++) {
      var aq = au[aw].split(k.ylk_kv_delim);
      if (aq.length !== 2) {
        continue
      }
      var ay = aq[0], ao = aq[1];
      if (ay === null || ay === "" || ao === null) {
        continue
      }
      if (ao.length > k.MAX_VALUE_LENGTH) {
        ao = ao.substring(0, k.MAX_VALUE_LENGTH)
      }
      if (ay.length <= 8 && ao.length <= k.MAX_VALUE_LENGTH) {
        if (ay !== "_p" || ar) {
          ap.set(ay, ao)
        }
      }
    }
    return ap
  }

  function Q(ap, U, ao) {
    if (ap < U) {
      return U
    }
    if (ap > ao) {
      return ao
    }
    return ap
  }

  function y(U, ao) {
    J.set("A_sid", YAHOO.i13n.A_SID || k.rand());
    J.set("_w", k.rmProto(ao).substring(0, k.MAX_VALUE_LENGTH));
    if (U) {
      J.absorb(U)
    } else {
      if (E.keys) {
        J.absorb(E.keys)
      }
    }
  }

  function B(aw) {
    var ap = YAHOO.i13n, ax = YAHOO.i13n.TEST_ID || aw.test_id, au = aw.location || document.location.href;
    y(aw.keys, au);
    if (ax) {
      ax = k.norm("" + ax)
    }
    var at = 300, ao = 700, U = 10000;
    var aq = aw.override || {};
    var ar = {
      override: aq,
      version: "3.31",
      keys: J,
      referrer: aw.referrer,
      getReferrer: function () {
        return k.norm(k.clref((typeof this.referrer !== "undefined") ? this.referrer : document.referrer))
      },
      spaceid: k.norm(aq.spaceid || YAHOO.i13n.SPACEID || aw.spaceid),
      yrid: k.norm(aw.yrid || ""),
      oo: (aw.oo ? "1" : "0"),
      nol: (aw.nol ? "1" : "0"),
      yql_enabled: (aw.yql_enabled !== false),
      ywa: ap.ywa ? h(aw.ywa, ap.ywa) : aw.ywa,
      ywa_dpid: null,
      ywa_cf_override: ap.YWA_CF_MAP || {},
      ywa_action_map: ap.YWA_ACTION_MAP || {},
      ywa_outcome_map: ap.YWA_OUTCOME_MAP || {},
      fing: aw.use_fing == 1,
      USE_RAPID: (aw.use_rapid !== false),
      linktrack_attribut: aw.lt_attr || "text",
      tracked_mods: aw.tracked_mods || [],
      tracked_mods_viewability: aw.tracked_mods_viewability || [],
      viewability: aw.viewability || false,
      viewability_time: aw.viewability_time || 300,
      viewability_px: aw.viewability_px || 50,
      lt_attr: aw.lt_attr || "text",
      client_only: aw.client_only,
      text_link_len: aw.text_link_len || -1,
      test_id: ax,
      yql_host: aw.yql_host || "geo.query.yahoo.com",
      yql_path: aw.yql_path || "/v1/public/yql",
      click_timeout: aw.click_timeout || U,
      compr_timeout: aw.compr_timeout || ao,
      compr_on: (aw.compr_on !== false),
      compr_type: aw.compr_type || "deflate",
      webworker_file: YAHOO.i13n.WEBWORKER_FILE || aw.webworker_file || "rapidworker-1.2.js",
      nofollow_classname: aw.nofollow_class || "rapidnofollow",
      no_click_listen: aw.rapid_noclick_resp || "rapid-noclick-resp",
      nonanchor_track_class: aw.nonanchor_track_class || "rapid-nonanchor-lt",
      anc_pos_attr: "data-rapid_p",
      anc_v9y_attr: "data-v9y",
      deb: (aw.debug === true),
      ldbg: (aw.ldbg > 0 ? true : au.indexOf("yhldebug=1") > 0),
      addmod_timeout: aw.addmodules_timeout || 300,
      ult_token_capture: (typeof aw.ult_token_capture === "boolean" ? aw.ult_token_capture : false),
      track_type: aw.track_type || "data-tracktype",
      dwell_on: (aw.dwell_on === true),
      async_all_clicks: (aw.async_all_clicks === true),
      click_postmsg: (aw.click_postmsg || {}),
      apv: (aw.apv !== false),
      apv_time: aw.apv_time || 500,
      apv_px: aw.apv_px || 500,
      apv_always_send: (aw.apv_always_send === true),
      ex: (aw.ex === true),
      persist_asid: (aw.persist_asid === true),
      track_right_click: (aw.track_right_click === true),
      gen_bcookie: (aw.gen_bcookie === true),
      skip_attr: aw.skip_attr || "data-rapid-skip",
      parse_dom: (aw.parse_dom === true),
      pageview_on_init: (aw.pageview_on_init !== false),
      perf_navigationtime: aw.perf_navigationtime || 0,
      perf_commontime: aw.perf_commontime || null,
      perf_usertime: aw.perf_usertime || null,
      perf_resourcetime: aw.perf_resourcetime || 0,
      sample: aw.sample || {},
      loc: au,
      fpc: (aw.fpc === true)
    };
    ar.ywa_action_map[YAHOO.i13n.EventTypes.getEventByName("richview").getEventName()] = 100;
    if (ar.ywa && (!ar.ywa.project_id || ar.ywa.project_id == 0 || !k.isNumeric(ar.ywa.project_id))) {
      q("Invalid YWA project id: null or not numeric.");
      ar.ywa = null
    }
    var av = ar.compr_timeout * 1;
    if (!k.isNum(av)) {
      ar.compr_timeout = ao
    } else {
      ar.compr_timeout = Q(av, at, ao)
    }
    if (ar.ldbg && ar.click_timeout != U) {
      ad("Click timeout set to " + ar.click_timeout + "ms (default 10000ms)")
    }
    if (aw.apv_callback && typeof(aw.apv_callback) == "function") {
      ar.apv_callback = aw.apv_callback
    } else {
      ar.apv_callback = null
    }
    return ar
  }

  function h(ap, ao) {
    var aq = {};
    if (ap && k.isObj(ap)) {
      for (var U in ap) {
        if (k.hasOwn(ap, U)) {
          aq[U] = ap[U]
        }
      }
    }
    if (ao && k.isObj(ao)) {
      for (var U in ao) {
        if (k.hasOwn(ao, U)) {
          aq[U] = ao[U]
        }
      }
    }
    return aq
  }

  function aj() {
    J.set("A_sid", k.rand())
  }

  function l() {
    return "Rapid-" + aa.version + "(" + (new Date().getTime()) + "):"
  }

  function ad(U) {
    console.warn("RAPID WARNING: " + U)
  }

  function q(U) {
    console.error("RAPID ERROR: " + U)
  }

  function m(U) {
    if (aa.ldbg) {
      console.log(l() + U)
    }
  }

  function T() {
    var ap = document.cookie;
    this.cookieMap = {};
    if (/[^=]+=[^=;]?(?:; [^=]+=[^=]?)?/.test(ap)) {
      var av = ap.split(/;\s/g), au = null, at = null, ao = null;
      for (var ar = 0, U = av.length; ar < U; ar++) {
        ao = av[ar].match(/([^=]+)=/i);
        if (ao instanceof Array) {
          try {
            au = k.dec(ao[1]);
            at = k.dec(av[ar].substring(ao[1].length + 1))
          } catch (aq) {
            q(aq)
          }
        } else {
          au = k.dec(av[ar]);
          at = au
        }
        if (au === "B" || au === "BX" || au === "TT" || (aa && aa.ywa && (au === ("fpc" + aa.ywa.project_id)) || (au === "fpc") || (au === "ywandp") || (au.indexOf("ywadp") === 0)) || au === "D" || au === "_ga" || au === "yx" || au === "rx" || au === "rxx") {
          this.cookieMap[au] = at
        }
      }
    }
    k.clearCookie("rx", "/", k.isIE ? document.domain : "")
  }

  T.prototype = {
    getYWAFPC: function () {
      if (!aa.ywa) {
        return null
      }
      var ao = this.cookieMap["fpc" + aa.ywa.project_id];
      var U = this.cookieMap.fpc;
      var aq = V(U);
      var ap = null;
      if (U) {
        ap = aq[aa.ywa.project_id]
      }
      if (ao) {
        k.clearCookie("fpc" + aa.ywa.project_id);
        if (!ap) {
          aq[aa.ywa.project_id] = ao;
          var ar = F(aq);
          am("fpc", ar, 315360000);
          ap = ao
        }
      }
      return (ap ? ap : null)
    }, getCookieByName: function (U) {
      return this.cookieMap[U]
    }, getYWADPID: function () {
      if (aa.ywa) {
        var ap = "ywandp", aq = "ywadp" + aa.ywa.project_id, ao = V(this.cookieMap[ap]), U;
        var at = ao[aa.ywa.project_id];
        if (at === undefined || at === null || at === "") {
          U = this.cookieMap[aq];
          if (U) {
            ao[aa.ywa.project_id] = U
          } else {
            ao[aa.ywa.project_id] = W()
          }
          at = ao[aa.ywa.project_id];
          var ar = F(ao);
          am(ap, ar, 315360000);
          this.cookieMap[ap] = ar
        }
        aa.ywa_dpid = at
      }
    }, getRxx: function () {
      var U = "rxx";
      var ao = this.cookieMap[U];
      if (aa.fpc && (ao === undefined || ao === null || ao === "")) {
        var aq = document.domain || "";
        aq = "." + aq.split(".").slice(-2).join(".");
        var ap = Date.UTC(2015, 7, 1);
        var ar = new Date().getTime() - ap;
        ao = parseInt(Math.random().toString().substring(2)).toString(36) + "." + ar.toString(36) + "&v=1";
        am(U, ao, 63072000, aq)
      }
      return ao
    }
  };
  function s() {
    if (!aa.ult_token_capture || YAHOO.i13n.__handled_ult_tokens__ === true) {
      return
    }
    YAHOO.i13n.__handled_ult_tokens__ = true;
    var ap = aa.loc;
    if (ap.match(/;_yl[a-z]{1}=/)) {
      if (aa.ldbg) {
        m("Found ULT Token on URL.")
      }
      ac.sendGeoT(ap)
    } else {
      var ao = new T(), U = ao.getCookieByName("D");
      if (U) {
        k.clearCookie("D", "/", ".yahoo.com");
        ac.sendGeoT(U)
      }
    }
  }

  var aa = B(E), ac = C(), n = null, f = null, t = null, G = null;
  var I = new T();
  var K = I.getRxx();
  if (K != null) {
    J.set("_rx", K)
  }
  var D = I.getCookieByName("_ga");
  if (D != null) {
    J.set("_ga", D)
  }
  var v = I.getCookieByName("yx");
  if (v != null) {
    J.set("_yx", v)
  }
  function al() {
    return Math.floor(new Date().valueOf() / 1000)
  }

  function am(ao, av, au, ar) {
    var at = new Date(), aq = "";
    at.setTime(at.getTime() + (au * 1000));
    aq = "; expires=" + at.toGMTString();
    var U = "";
    if (ar) {
      U = ";domain=" + ar
    }
    var ap = ao + "=" + av + aq + U + "; path=/";
    document.cookie = ap
  }

  function W() {
    return "" + Math.floor(Math.random() * 4294967295)
  }

  function F(ao) {
    var U, ap = [];
    for (U in ao) {
      if (U, ao[U]) {
        ap.push(U + ":" + ao[U])
      }
    }
    return encodeURIComponent(ap.join(";"))
  }

  function V(ar, U) {
    ar = ar || "";
    var ap = decodeURIComponent(ar).split(";"), aq = {};
    for (i = 0, excl = ap.length; i < excl; i++) {
      var ao = ap[i].split(":");
      aq[ao[0]] = ao[1]
    }
    if (U) {
      return aq[U]
    }
    return aq
  }

  function C() {
    var av = YAHOO.i13n.beacon_server || "geo.yahoo.com";

    function at(aV) {
      var aU = "cf";
      if (aV < 10 && ("" + aV).charAt(0) !== "0") {
        aU += "0" + aV
      } else {
        aU += aV
      }
      return aU
    }

    function aA() {
      if (typeof window.ITTs === "undefined" || !k.isArr(window.ITTs) || window.ITTs.length === 0) {
        window.ITTs = [{}]
      }
      if (window.ITTs[0].setFPCookies) {
        return
      }
      window.ITTs[0].setFPCookies = function () {
        var aU = "fpc", aX = new T();
        var aW = V(aX.getCookieByName(aU));
        aW[aa.ywa.project_id] = window.ITTs[0].FPCV;
        am(aU, F(aW), 31536000);
        var aV = aX.getCookieByName(aU + aa.ywa.project_id);
        if (aV) {
          k.clearCookie(aU + aa.ywa.project_id)
        }
      }
    }

    function U(aU, aW) {
      if (aa.ldbg) {
        m(aU)
      }
      var aV = new Image(), aX = null;
      aV.onload = aV.onabort = aV.onerror = function () {
        if (!!aW && (typeof(aW) === "function")) {
          clearTimeout(aX);
          aW.call(null)
        }
      };
      aV.src = aU;
      if (!!aW && (typeof(aW) === "function")) {
        aX = setTimeout(function () {
          aW.call(null)
        }, aa.click_timeout)
      }
      setTimeout(function () {
        aV = null
      }, 10000000)
    }

    function aQ(aX, aV) {
      for (var aU in aX) {
        if (!k.hasOwn(aX, aU)) {
          continue
        }
        var aW = aa.ywa_cf_override[aU];
        if (aW) {
          aV[aW] = aX[aU]
        }
      }
    }

    function aT(aZ, aU, aY, a8, a2, bd, a3) {
      function aW(bk, bj) {
        var bi = (bj ? "%3B" : ";");
        return bk + (aY ? (bi + bk) : "")
      }

      var a7 = new T(), a4 = a7.getYWAFPC();
      a7.getYWADPID();
      a8 = a8 || {};
      if (aZ !== "c") {
        aA()
      }
      var a5 = [k.curProto(), (aa.ywa.host || "a.analytics.yahoo.com"), "/fpc.pl?"], a1 = aa.ywa.project_id, bh = aa.ywa.document_group, aV = {};
      if (aa.test_id) {
        aV["14"] = aa.test_id
      }
      var bb = {};
      k.aug(bb, aG().getAll());
      k.aug(bb, bd);
      var a9 = ["_cb=" + k.rand(), ".ys=" + aa.spaceid, "a=" + a1, "b=" + k.enc(aa.ywa.document_name || document.title), "d=" + k.enc(new Date()), "f=" + k.enc(aa.loc), "j=" + k.sr("x"), "k=" + k.cold(), "t=" + al(), "l=true"];
      if (k.hasOwn(bb, "A_apv")) {
        a9.push("apv=" + k.enc(bb.A_apv))
      }
      if (a3) {
        for (var be in a3) {
          if (k.hasOwn(a3, be)) {
            a9.push(be + "=" + k.enc(a3[be]))
          }
        }
      }
      if (bh && bh !== "") {
        a9.push("c=" + k.enc(bh))
      }
      if (aa.ywa_dpid) {
        a9.push("dpid=" + aa.ywa_dpid)
      }
      if (aZ === "c") {
        a8.x = 12;
        var bg = "12";
        if (aY) {
          bg = k.enc(bg + ";" + aY)
        }
        a9.splice(0, 0, "x=" + bg)
      } else {
        if (aZ === "e") {
          a9.push("x=" + aU + (aY ? ";" + aY : ""))
        }
      }
      if (a4) {
        a9.push("fpc=" + k.enc(a4))
      }
      var aX = aa.ywa.member_id;
      if (aX) {
        a9.push("m=" + aX)
      }
      if (aa.getReferrer() !== "") {
        a9.push("e=" + k.enc(aa.getReferrer()))
      }
      aQ(bb, aV);
      if (aZ === "e" && a2) {
        aQ(a2, aV)
      }
      var a0 = aa.ywa.cf;
      k.aug(aV, a0, function (bi) {
        return !k.isResCF(bi)
      });
      for (var a6 in aV) {
        if (k.hasOwn(aV, a6)) {
          a9.push(at(a6) + "=" + aW(k.enc(aV[a6]), 1))
        }
      }
      if (aZ === "e" || aZ === "c") {
        a9.push("ca=1")
      }
      if (aZ !== "p") {
        a9.push("resp=img")
      }
      if (aZ === "c") {
        for (var bc in a8) {
          if (!k.hasOwn(a8, bc)) {
            continue
          }
          if (bc !== "x") {
            var ba = a8[bc];
            if (ba && ba.length > k.MAX_VALUE_LENGTH) {
              ba = ba.substring(0, k.MAX_VALUE_LENGTH)
            }
            try {
              ba = k.enc(aW(ba));
              ba = ba.replace(/'/g, "%27")
            } catch (bf) {
              q(bf)
            }
            a9.push(at(bc) + "=" + ba)
          }
        }
      }
      return a5.join("") + a9.join("&")
    }

    function az() {
      return "rapid_if_" + k.rand()
    }

    function aH(aV) {
      var aU = "display:none;";
      if (k.isIE && (k.ieV === 6 || k.ieV === 7 || k.ieV === 8)) {
        aV.style.setAttribute("cssText", aU, 0)
      } else {
        k.sa(aV, "style", aU)
      }
    }

    function aN(aU) {
      var aW = null;
      if (k.isIE && k.ieV <= 8) {
        var aV = "";
        if (k.isSecure() && k.ieV == 6) {
          aV = 'src="https://geo.yahoo.com/b.html"'
        }
        aW = document.createElement("<iframe " + aV + ' name="' + aU + '"></iframe>')
      } else {
        aW = document.createElement("iframe")
      }
      aW.name = aU;
      return aW
    }

    function ap() {
      setTimeout(function () {
        var aU = aN("");
        k.addEvent(aU, "load", function () {
          k.rmBodyEl(aU)
        });
        k.appBodyEl(aU)
      }, 1)
    }

    function aI(aY, a3) {
      var aW = null, aV = k.make("form"), a2 = k.make("input"), aX = az(), a1 = az(), aU = "application/x-www-form-urlencoded;charset=UTF-8";
      aW = aN(aX);
      aH(aW);
      aH(aV);
      aV.id = a1;
      aV.method = "POST";
      aV.action = aD(a3);
      aV.target = aX;
      if (k.isIE && k.ieV <= 7) {
        aV.setAttribute("enctype", aU)
      } else {
        aV.setAttribute("enctype", aU);
        aV.setAttribute("encoding", aU)
      }
      a2.name = "q";
      a2.value = aY;
      if (k.isIE && k.ieV >= 10) {
        a2.type = "submit"
      }
      aV.appendChild(a2);
      var a0 = "load", aZ = function () {
        var a4 = "";
        if (aa.ldbg && (!k.isIE || k.ieV >= 9)) {
          var a5 = aW.contentDocument || aW.contentWindow.document;
          a4 = a5.body.innerHTML
        }
        k.rmEvent(aW, a0, aZ);
        setTimeout(function () {
          k.rmBodyEl(aW);
          k.rmBodyEl(aV)
        }, 0);
        if (aa.ldbg) {
          m("iframe resp: " + a4)
        }
        if (k.isIE && k.ieV <= 7) {
          ap()
        }
      };
      k.addEvent(aW, a0, aZ);
      k.appBodyEl(aW);
      k.appBodyEl(aV);
      aV.submit()
    }

    function aD(aW) {
      var aU = aa.deb, aV = k.rand(), aX = [k.curProto(), aa.yql_host, aa.yql_path, "?yhlVer=2&yhlClient=rapid&yhlS=", aa.spaceid, ((aU === true) ? "&yhlEnv=staging" : ""), ((aU === true || aa.ldbg) ? "&debug=true&diagnostics=true" : ""), ((k.isIE && k.ieV) ? "&yhlUA=ie" + k.ieV : ""), ((k.isIE && k.ieV == 8) ? "&format=json" : ""), "&yhlCT=2", "&yhlBTMS=", (new Date()).valueOf(), "&yhlClientVer=", aa.version, "&yhlRnd=", aV, "&yhlCompressed=", aW || 0, (aa.gen_bcookie) ? "&yhlBcookie=1" : ""].join("");
      if (aa.ldbg) {
        m(aX)
      }
      return aX
    }

    function aR(aX, aV) {
      var aW = k.getXHR(), aU = aD(aV);
      aW.open("POST", aU, true);
      aW.withCredentials = true;
      aW.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      if (aa.ldbg) {
        aW.onreadystatechange = function () {
          if (aW.readyState === 4) {
            m(aW.status + ":xhr response: " + aW.responseText)
          }
        }
      }
      aW.send(aX)
    }

    var aE = function (aV) {
      var aX = {_pl: 1, A_v: aa.version};
      var aU = aa.getReferrer();
      if (aU && aV !== false) {
        aX._R = aU.substring(0, k.MAX_VALUE_LENGTH)
      }
      if (aa.test_id) {
        aX.test = aa.test_id
      }
      if (aa.ex) {
        aX._ex = 1
      }
      if (!aX._bt) {
        aX._bt = "rapid"
      }
      var aW = window.location.protocol || "";
      aW = aW.replace(/:$/, "");
      aX.A_pr = aW;
      aX.A_tzoff = new Date().getTimezoneOffset();
      aX.A_tzoff = aX.A_tzoff ? -1 * aX.A_tzoff / 60 : 0;
      if (aa.ywa && aa.ywa.project_id) {
        aX._ywa = aa.ywa.project_id
      }
      return aX
    };

    function aq(aV, aW, aU) {
      var aX = {};
      if (!k.isObj(aV)) {
        return aX
      }
      k.aug(aX, aV, aU);
      return aX
    }

    function aP(aX, a1, a2) {
      a2 = a2 || {};
      var aV = {m: k.norm(aX.moduleName), l: []};
      if (aX.moduleYLK) {
        aV.ylk = aX.moduleYLK.getAll()
      }
      var aW = (aV.ylk && aV.ylk.sec) ? aV.ylk.sec : "";
      var a0 = aX.links;
      var a0 = aX.links, aU = function (a3, a5) {
        var a4 = (a3 === "_p");
        if (a1 && a4) {
          return true
        }
        if (a3 == "sec" && a5 != aV.m && a5 != aW) {
          return true
        }
        return a3 !== "sec" && !a4
      };
      for (var aY = 0, aZ = a0.length; aY < aZ; aY++) {
        if (!a0[aY]) {
          continue
        }
        if (aa.viewability && !a0[aY].viewable) {
          if (aa.ldbg) {
            m("Skipping not viewable link: " + a0[aY].data.slk)
          }
          continue
        }
        aV.l.push(aq(a0[aY].data, a1, aU))
      }
      return aV
    }

    function aM(aW, aX, aU) {
      var a0 = [], aV = null;
      for (var aY in aW) {
        if (!k.hasOwn(aW, aY)) {
          continue
        }
        aV = aW[aY];
        if (!aV) {
          continue
        }
        var aZ = aP(aV, aX, aU);
        if (aZ.l.length > 0) {
          a0.push(aZ)
        } else {
          if (aa.ldbg) {
            m('Not capturing 0 links mod: "' + aV.moduleName + '"')
          }
        }
      }
      return a0
    }

    function ay(aV, aU) {
      if (aV) {
        return "pv"
      }
      if (aU && aU.event) {
        return aU.event.type.getYQLID()
      }
      return "lv"
    }

    function aK(aW, aY, aX, aV, aU) {
      return [{t: ay(aY, aU), s: aa.spaceid, pp: aG(aY, aV).getAll(), _ts: al(), lv: aM(aW, aX, aU)}]
    }

    function aG(aV, aU) {
      var aW = Y.makeFromPP(aa.keys);
      aW.absorb(aU);
      if (aV) {
        aW.set("A_", 1)
      }
      return aW
    }

    function aS(aW, aU, aV) {
      var aX = "select * from x where a = '" + aW + "'";
      return (aU ? "q=" : "") + (aV ? k.enc(aX) : aX)
    }

    function aB(aU) {
      var aV = {bp: aE(), r: aU.call(0), yrid: aa.yrid, optout: aa.oo, nol: aa.nol};
      return k.toJSON(aV)
    }

    function au(aX, aY, aV) {
      var aU = {};
      if (aV.event) {
        k.aug(aU, aV.event.data)
      }
      if (aV.pp) {
        k.aug(aU, aV.pp)
      }
      var aW = aB(function () {
        return aK([aX], aY, true, aU, aV)
      });
      aL(aW, aY)
    }

    function ax(aX, aY, aW, aU) {
      var aV = aB(function () {
        return aK(aX, aY, true, aW, aU)
      });
      aL(aV)
    }

    function aF(aU) {
      return aU.identifier
    }

    var aw = function () {
      var aX = null, aU = [], aW = 0, aV = aa.addmod_timeout;
      return function (a2, a3, a0, aZ) {
        clearTimeout(aX);
        var aY = +new Date() - aW;
        aU = k.uniqConcat(aU, a2, aF);
        if (aY > aV) {
          aW = +new Date();
          ax(aU, a3, a0, aZ);
          aU = []
        } else {
          var a1 = aV - aY;
          aX = setTimeout(function () {
            if (aa.ldbg) {
              m("queueing send in addMods")
            }
            ax(aU, a3, a0, aZ);
            aU = []
          }, a1)
        }
      }
    }();

    function aL(a3) {
      var a4 = aa.ldbg;

      function aU(a6, a5) {
        if (a5 === 0) {
          a6 = a6.replace(/'/g, "\\'")
        }
        if (a4) {
          m("body: " + a6)
        }
        if (k.hasCORS()) {
          aX = aS(a6, true, true);
          aR(aX, a5)
        } else {
          aX = aS(a6, 0, 0);
          aI(aX, a5)
        }
      }

      var aX = "", aW = H[aa.compr_type];
      if (aa.compr_on && k.hasWorkers() && aW > 1 && a3.length > (2 * 1024)) {
        if (a4) {
          m("Looking for worker:" + aa.webworker_file + ", compr timeout:" + aa.compr_timeout)
        }
        try {
          var a1 = new Worker(aa.webworker_file), a0 = false, aV = null, aZ = 0;

          function a2() {
            if (!a0) {
              a0 = true;
              aU(a3, 0);
              if (a4) {
                m("sent in failSend")
              }
            }
          }

          a1.onerror = function (a5) {
            clearTimeout(aV);
            a2();
            ad(a5.message);
            a1.terminate()
          };
          a1.onmessage = function (a5) {
            clearTimeout(aV);
            var a6 = k.tms();
            if (a5.data === "Decompress fail" || a5.data === "Compress fail" || a5.data.indexOf("error:") == 0) {
              if (a4) {
                m(a5.data)
              }
              a2()
            }
            if (!a0) {
              a0 = true;
              aU(a5.data, aW)
            }
            if (a4) {
              m("Ratio (" + a5.data.length + "/" + a3.length + "): " + (a5.data.length * 100 / a3.length).toFixed(2) + "% -> C_T: " + (a6 - aZ) + " ms (" + a6 + "-" + aZ + ")")
            }
            a1.terminate()
          };
          if (a4) {
            m("posting to worker: " + a3)
          }
          aZ = k.tms();
          a1.postMessage({type: aW, json: a3});
          aV = setTimeout(function () {
            a2();
            a1.terminate()
          }, aa.compr_timeout)
        } catch (aY) {
          if (a4) {
            m("compression worker exception " + aY)
          }
          aU(a3, 0)
        }
      } else {
        aU(a3, 0)
      }
    }

    function aJ(aV, aU, aW) {
      return k.curProto() + av + "/" + aV + ["?s=" + (aW ? aW : aa.spaceid), "t=" + k.rand() + "," + Math.random(), "_I=" + aa.yrid, "_AO=" + aa.oo, "_NOL=" + aa.nol, "_R=" + k.enc(aa.getReferrer()), (aV === "c" ? "_K=" : "_P=") + ar(aU)].join("&")
    }

    function ar(aU) {
      var aV = new Y(aE(false));
      aV.absorb(aa.keys.getAll());
      aV.set("_ts", al());
      if (aU) {
        if (!(aU instanceof Y)) {
          q("Internal error in buildGeoPP: not PP type")
        } else {
          aV.absorb(aU.getAll())
        }
      }
      return aa.version + "%05" + aV.ser()
    }

    function aC(aV) {
      var aU = [aJ("c") + "&_C=" + k.ser(aV.data)];
      return aU.join("&")
    }

    function ao(aW, aV) {
      var aU = aW[aV];
      if (aU && k.isNum(aU) && aU >= 0) {
        return aU
      }
      return null
    }

    function aO(aW) {
      var aU = k.getAttribute(aW, k.DATA_ACTION), aV = k.getAttribute(aW, k.data_action_outcome);
      if (aU !== null) {
        return ao(aa.ywa_action_map, aU)
      } else {
        if (aV !== null) {
          return ao(aa.ywa_outcome_map, aV)
        }
      }
      return null
    }

    return {
      sendGeoT: function (aV) {
        var aU = [k.curProto(), av, "/t?", aV].join("");
        U(aU)
      }, sendGeoPV: function () {
        U(aJ("b"))
      }, sendRapidNoDelay: function (aV, aZ, aW, aU, aY) {
        if (!aa.yql_enabled || aY) {
          var aX = null;
          if (aW) {
            aX = new Y(aW)
          }
          U(aJ(aZ ? "b" : "p", aX))
        } else {
          ax(aV, aZ, aW, aU)
        }
      }, sendRapid: function (aV, aX, aW, aU) {
        aw(aV, aX, aW, aU)
      }, sendRefreshedContent: au, sendYWAEvent: function (aX, aU) {
        var aV = null, aW = null, aY = aX.name;
        if (aa.ywa_action_map && aY) {
          aV = ao(aa.ywa_action_map, aY)
        }
        if (aV === null) {
          return
        }
        if (aa.ywa_outcome_map && aX.outcome) {
          aW = ao(aa.ywa_outcome_map, aX.outcome)
        }
        U(aT("e", aV, aW, null, aX.data), aU)
      }, sendULTEvent: function (aW, aX) {
        var aV = {};
        if (aW && aW.data) {
          aV = aW.data
        }
        var aU = aJ("p", new Y(aV), aX || 0);
        if (aW.type) {
          aU += "&_V=" + aW.type.spaceidPrefix
        }
        U(aU)
      }, sendEvents: function (aV, aU) {
        if (aa.USE_RAPID) {
          this.sendULTEvent(aV)
        }
        if (aa.ywa) {
          this.sendYWAEvent(aV, aU)
        }
      }, sendClick: function (a7, a6) {
        var a2 = null, aZ = "", a4 = "", a0 = null, aX = false, aW = null;
        if (aa.USE_RAPID) {
          aZ = aC(a7)
        }
        if (aa.ywa) {
          var aU = a7.data, a3 = a7.targetElement;
          var a5 = {18: aU.sec, 19: aU.slk, 20: aU._p};
          if ("A_cl" in aU) {
            a5["130"] = aU.A_cl
          }
          if ("A_lv" in aU) {
            a5["131"] = aU.A_lv
          }
          if (a3) {
            a0 = aO(a3)
          } else {
            a0 = ao(aa.ywa_outcome_map, a7.outcome)
          }
          if (aa.ywa_cf_override) {
            aQ(aU, a5)
          }
          a4 = aT("c", 0, a0, a5)
        }
        if (aa.async_all_clicks || !a7.synch) {
          if (aZ) {
            U(aZ, a6)
          }
          if (a4) {
            if (!aZ) {
              U(a4, a6)
            } else {
              U(a4)
            }
          }
          return
        }
        k.prevDef(a7.event);
        a2 = function () {
          if (aX) {
            return
          }
          aX = true;
          if (a6) {
            a6.call();
            return
          }
          var a8 = a7.targetElement.href;
          if (aa.click_postmsg.origin) {
            var a9 = aa.click_postmsg.window || top;
            var ba = aa.click_postmsg.payload || {};
            ba.href = a8;
            a9.postMessage(k.toJSON(ba), aa.click_postmsg.origin)
          } else {
            if (a7.hasTargetTop) {
              top.document.location = a8
            } else {
              document.location = a8
            }
          }
        };
        if (aa.USE_RAPID) {
          if (aa.ywa) {
            var aY = new Image(), aV = new Image(), a1 = 0;
            aY.onload = aY.onerror = aY.onabort = aV.onload = aV.onerror = aV.onabort = function () {
              if (++a1 === 2) {
                clearTimeout(aW);
                a2()
              }
            };
            aY.src = aZ;
            aV.src = a4;
            aW = setTimeout(a2, aa.click_timeout);
            setTimeout(function () {
              aY = null;
              aV = null
            }, 10000000)
          } else {
            U(aZ, a2)
          }
        } else {
          if (aa.ywa) {
            U(a4, a2)
          }
        }
      }, sendYWAPV: function (aU) {
        var aV = aT("p", 0, 0, 0, 0, aU), aW = document.getElementsByTagName("head"), aX = "true";
        if (aW.length === 0) {
          return
        }
        var aZ = k.make("script", {defer: aX, async: aX, type: "text/javascript", src: aV});

        function aY() {
          aW[0].removeChild(aZ)
        }

        if (k.isIE) {
          aZ.onreadystatechange = function () {
            var a0 = this.readyState;
            if ("loaded" === a0 || "complete" === a0) {
              aZ.onload = aZ.onreadystatechange = null;
              aY()
            }
          }
        } else {
          if (k.isWebkit) {
            aZ.addEventListener("load", aY)
          } else {
            aZ.onload = aY
          }
        }
        aW[0].appendChild(aZ)
      }, sendInternalSearch: function (aW, aV) {
        aW = aW || "";
        if (!k.isNum(aV)) {
          aV = 0
        }
        var aX = {isk: aW, isr: aV};
        var aU = aT("e", "INTERNAL_SEARCH", null, null, null, null, aX);
        U(aU)
      }, sendYWAECommerce: function (aY, aX) {
        var aW = {}, aZ = {
          PRODUCT_VIEW: 1,
          ADD_TO_CART: 1,
          CANCELLED_SALE: 1,
          PENDING_SALE: 1,
          SALE: 1
        }, a1 = {
          amount: "xa",
          orderId: "oc",
          tax: "xt",
          shipping: "xs",
          discount: "xd",
          sku: "p",
          units: "q",
          amounts: "r"
        };
        if (!(aY in aZ)) {
          q("invalid YWA ecommerce action: " + aY);
          return
        }
        for (var aV in aX) {
          if (k.hasOwn(aX, aV)) {
            if (aV in a1) {
              var a0 = a1[aV];
              aW[a0] = aX[aV]
            }
          }
        }
        if (aY === "SALE") {
          aY = 1
        }
        var aU = aT("e", aY, null, null, null, null, aW);
        U(aU)
      }
    }
  }

  function an(U) {
    return U !== "sec" && U !== "slk" && U !== "_p"
  }

  function a(aq, ax, au, ao, ay, av, ar) {
    var U = "", aw = null;
    var at = ar ? k.isAboveFold(ao) : true;
    var ap = {viewable: at, data: {sec: ax, _p: au}};
    if (ar) {
      k.aug(ap.data, {A_lv: 1})
    }
    if (!av) {
      ao.setAttribute(aa.anc_pos_attr, au);
      if (ar) {
        ao.setAttribute(aa.anc_v9y_attr, at ? "1" : "0")
      }
      U = k.getLT(ao, aq);
      if (U && U !== "") {
        aw = w(ao)
      } else {
        U = "_ELINK_"
      }
      ap.data.slk = ay ? ay : U
    } else {
      ap.data.slk = ay || "section";
      aw = w(ao)
    }
    if (aw !== null) {
      k.aug(ap.data, aw.getAll())
    }
    return ap
  }

  function P() {
    var U = {};
    return {
      addModule: function (ao, ap) {
        U[k.norm(ao)] = ap
      }, addModules: function (ap, av) {
        var au = k.isArr(ap), ar = [];
        if (!au) {
          if (k.isStr(ap)) {
            ap = new Array(ap);
            au = true
          }
        }
        for (var aq in ap) {
          if (!k.hasOwn(ap, aq)) {
            continue
          }
          var at = (au ? ap[aq] : aq), aw = k.trim(ap[aq]);
          if (!this.exists(at)) {
            var ao = M(aw, at, av);
            if (ao) {
              this.addModule(at, ao);
              ar.push(ao)
            }
          } else {
            q('addModules() called with prev processed id:"' + at + '"')
          }
        }
        return ar
      }, getModules: function () {
        return U
      }, getModulesWithViewability: function () {
        var aq = {};
        for (var ao in U) {
          var ap = U[ao];
          if (ap.useViewability) {
            aq[ao] = ap
          }
        }
        return aq
      }, reevaluateModuleViewability: function () {
        var ao = this.getModulesWithViewability();
        for (var aq in ao) {
          var ap = ao[aq];
          ap.reevaluateViewableLinks()
        }
      }, refreshModule: function (at, ar, aq, ap) {
        var ao = U[k.norm(at)];
        if (ao) {
          ao.refreshModule(at, ar, aq, ap)
        } else {
          q("refreshModule called on unknown section: " + ao)
        }
      }, removeModule: function (ap) {
        var ao = U[k.norm(ap)];
        if (ao) {
          ao.removeHandlers();
          delete U[ap]
        }
      }, destroy: function () {
        for (var ao in U) {
          if (k.hasOwn(U, ao)) {
            this.removeModule(ao)
          }
        }
        U = {}
      }, exists: function (ao) {
        return U[k.norm(ao)]
      }
    }
  }

  function ab(U, ao) {
    if (k.hasClass(U, "rapid_track_href")) {
      return "href"
    }
    if (k.hasClass(U, "rapid_track_text")) {
      return "text"
    }
    if (k.hasClass(U, "rapid_track_title")) {
      return "title"
    }
    if (k.hasClass(U, "rapid_track_id")) {
      return "id"
    }
    return ao
  }

  function p(U) {
    return (U.nodeName.toLowerCase() === "input") && (k.getAttribute(U, "type") === "submit")
  }

  function g(ap, ao) {
    var U = A(ap, ao);
    G = U;
    if (U) {
      if (t) {
        t.set_state("stop")
      }
      ac.sendClick(U)
    }
  }

  function d(aq, ap, U) {
    var ao = k.getAttribute;
    return ((ap.target && ap.target.toLowerCase() === "_blank") || aq.which === 2 || aq.button === 4 || aq.altKey || aq.ctrlKey || aq.shiftKey || aq.metaKey || (ao(ap, "data-nofollow") === "on") || (ao(ap, "href") && ao(ap, "href").substr(0, 11).toLowerCase() === "javascript:") || (k.hasClass(ap, aa.nofollow_classname)) || (k.hasClass(U, aa.nofollow_classname)))
  }

  function ai(ao, U, ar, aq) {
    ar = ar || {};
    var ap = null;
    if (ao) {
      ap = YAHOO.i13n.EventTypes.getEventByName(ao);
      ar._E = ap.getEventName();
      U = ar._E
    } else {
      ar._E = U || "_"
    }
    if (aq) {
      ar.outcm = aq
    }
    return {type: ap, name: U, data: ar, outcome: aq}
  }

  function A(au, aA) {
    au = au || event;
    var av = k.getTarget(au), ap = "button", at = "input", ar = "", U = false, aq = null;
    while (av && (ar = av.nodeName.toLowerCase()) && (ar !== "a" && ar !== ap && !p(av) && !k.hasClass(av, aa.nonanchor_track_class))) {
      av = av.parentNode
    }
    if (!av || k.hasClass(av, aa.no_click_listen)) {
      return 0
    }
    if (k.hasClass(av, aa.nonanchor_track_class)) {
      aq = {pos: 0, sec: aA.moduleName, slk: "_"};
      var ax = w(av, 1);
      if (ax) {
        k.aug(aq, ax.getAll())
      }
    } else {
      var aw = k.getAttribute(av, aa.anc_pos_attr);
      aq = aA.getLinkAtPos(aw);
      if (!aq) {
        return 0
      }
      aq = aq.data;
      if (ar !== at && ar !== ap && !d(au, av, aA.moduleElement)) {
        U = true
      }
    }
    if (!aq.tar) {
      var ao = k.getAttribute(av, "href");
      if (ao) {
        aq.tar = k.extDomain(ao)
      }
      if (!ao || !aq.tar) {
        aq.tar = k.extDomain(aa.loc)
      }
    }
    if (!aq.tar_uri) {
      if (av.pathname) {
        aq.tar_uri = av.pathname.substring(0, k.MAX_VALUE_LENGTH)
      } else {
        aq.tar_uri = ""
      }
    }
    var az = aA.moduleYLK;
    if (az) {
      var ay = az.getAll();
      k.aug(aq, ay, function (aB) {
        return !(aB in aq)
      })
    }
    aq.A_xy = k.xy(au);
    aq.A_sr = k.sr();
    if (au.type == "contextmenu") {
      aq.A_cl = 3;
      U = false
    }
    return {
      data: aq,
      event: au,
      moduleElement: aA.moduleElement,
      targetElement: av,
      synch: U,
      hasTargetTop: (av && av.target && av.target.toLowerCase() === "_top")
    }
  }

  function r(ao, U, at, ar, ap) {
    var aq = {};
    k.aug(aq, ar);
    aq.sec = ao;
    aq.slk = U;
    aq._p = at;
    return {
      data: aq,
      outcome: ap,
      event: null,
      moduleElement: null,
      targetElement: null,
      synch: false,
      hasTargetTop: false
    }
  }

  function ag(at, aq, U) {
    if (!aq) {
      aq = document
    }
    var av = at.split(","), ay = [];
    for (var ar = 0, ao = av.length; ar < ao; ar++) {
      var az = aq.getElementsByTagName(av[ar]);
      for (var ap = 0, ax = az.length; ap < ax; ap++) {
        var aw = az[ap];
        if (U && !U.call(0, aw)) {
          continue
        }
        ay.push(aw)
      }
    }
    var au = ay[0];
    if (!au) {
      return []
    }
    if (au.sourceIndex) {
      ay.sort(function (aB, aA) {
        return aB.sourceIndex - aA.sourceIndex
      })
    } else {
      if (au.compareDocumentPosition) {
        ay.sort(function (aB, aA) {
          return 3 - (aB.compareDocumentPosition(aA) & 6)
        })
      }
    }
    return ay
  }

  function z(at, aq, ax, U) {
    if (!aq) {
      aq = document
    }
    var av = at.split(",");
    ax = ax || [];
    var ao = aq.childNodes;
    if (k.getAttribute(aq, aa.skip_attr) !== "true") {
      for (var ar = 0, ap = ao.length; ar < ap; ar++) {
        var aw = ao[ar];
        if (k.isTagOfInterest(aw, av)) {
          if (!U || U.call(0, aw)) {
            ax.push(aw)
          }
        }
        if (k.getAttribute(aw, aa.skip_attr) !== "true") {
          z(at, aw, ax, U)
        } else {
          if (k.getAttribute(aw, aa.skip_attr) === "true") {
            ax.push(aw)
          }
        }
      }
    }
    var au = ax[0];
    if (!au) {
      return []
    }
    if (au.sourceIndex) {
      ax.sort(function (az, ay) {
        return az.sourceIndex - ay.sourceIndex
      })
    } else {
      if (au.compareDocumentPosition) {
        ax.sort(function (az, ay) {
          return 3 - (az.compareDocumentPosition(ay) & 6)
        })
      }
    }
    return ax
  }

  function M(ao, aw, aq) {
    var aC = document.getElementById(aw), av = "a,button,input";
    if (!aC) {
      ad("Specified module not in DOM: " + aw);
      return null
    }
    var aD = w(aC), az = [], au = aa.parse_dom ? z(av, aC) : ag(av, aC), ap = ab(aC, aa.lt_attr), aB = au.length, ar = k.getAttribute(aC, aa.track_type);

    function ax(aE, aK) {
      var aG = [];
      aK = aK || 1;
      for (var aJ = 0, aM = aE.length; aJ < aM; aJ++) {
        if (aE[aJ].tagName.toLowerCase() === "div") {
          var aL = aE[aJ];
          var aF = w(aL);
          var aI = a(ap, aD.map.sec || ao, 1, aL, aF.map.slk || aD.map.slk, true, aq);
          az[0] = aI;
          aG.push(aI)
        } else {
          var aH = aE[aJ];
          var aI = a(ap, aD.map.sec || ao, aK, aH, aD.map.slk, 0, aq);
          az[aK - 1] = aI;
          aG.push(aI);
          aK++
        }
      }
      if (k.getAttribute(aC, aa.skip_attr) === "true") {
        var aI = a(ap, aD.map.sec || ao, 1, aL, aD.map.slk, true, aq);
        az[0] = aI;
        aG.push(aI)
      }
      return aG
    }

    function at(aG) {
      var aK = [];
      for (var aH = 0, aI = aG.length; aH < aI; aH++) {
        var aF = aG[aH];
        var aJ = k.getAttribute(aF, aa.anc_pos_attr);
        var aE = a(ap, aD.map.sec || ao, aJ, aF, aD.map.slk, 0, true);
        aK.push(aE)
      }
      return aK
    }

    function U(aE) {
      return !k.getAttribute(aE, aa.anc_pos_attr)
    }

    ax(au);
    var aA = {
      useViewability: aq,
      moduleYLK: aD,
      links: az,
      moduleName: ao,
      trackType: ar,
      moduleElement: aC,
      refreshModule: function (aF, aE, aM, aN) {
        aN.isRefreshed = true;
        var aI = aa.parse_dom ? z(av, k.$(aF), null, U) : ag(av, k.$(aF), U);
        if (aE === true || (aI.length > 0)) {
          var aG = ax(aI, aB + 1);
          aB += aI.length;
          var aJ = aI.length;
          if (aq) {
            aJ = 0;
            for (var aH = 0, aK = aG.length; aH < aK; aH++) {
              if (aG[aH].viewable) {
                aJ++
              }
            }
          }
          if ((aE === true || aJ > 0) && (aa.USE_RAPID || aN.event)) {
            var aL = {};
            k.aug(aL, this);
            if (aM) {
              aL.links = aG
            } else {
              aL.links = []
            }
            if (aE === true || aM) {
              ac.sendRefreshedContent(aL, aE, aN)
            }
          }
        } else {
          if (k.ldbg) {
            m("refreshModule(" + aF + ") - no new links.")
          }
        }
        if (aE === true) {
          if (aa.ywa) {
            ac.sendYWAPV(aN.pp)
          }
          if (aa.apv && n) {
            n.reInit()
          }
        }
      },
      reevaluateViewableLinks: function () {
        var aG = az.length;
        var aH = ag("a", this.moduleElement, (function (aI) {
          return function (aK) {
            if (!k.getAttribute(aK, aa.anc_pos_attr)) {
              aI++;
              aK.setAttribute(aa.anc_pos_attr, aI);
              var aJ = a(ap, aD.map.sec || ao, aI, aK, aD.map.slk, 0, false);
              az[aI - 1] = aJ
            }
            var aL = k.getAttribute(aK, aa.anc_v9y_attr);
            if (aL !== "1" && k.isAboveFold(aK)) {
              aK.setAttribute(aa.anc_v9y_attr, "1");
              return true
            }
            return false
          }
        })(aG));
        if (aH.length === 0) {
          return
        }
        if (aa.USE_RAPID) {
          var aF = at(aH);
          var aE = {};
          k.aug(aE, this);
          aE.links = aF;
          ac.sendRefreshedContent(aE, false, {})
        }
      },
      removeHandlers: function () {
        k.rmEvent(aC, "click", ay);
        if (aa.track_right_click) {
          k.rmEvent(aC, "contextmenu", ay)
        }
      },
      getLinkAtPos: function (aE) {
        if (aE > az.length) {
          return null
        }
        return az[aE - 1]
      },
      identifier: aw
    };
    var ay = function (aE) {
      g(aE, aA)
    };
    k.addEvent(aC, "click", ay);
    if (aa.track_right_click) {
      k.addEvent(aC, "contextmenu", ay)
    }
    return aA
  }

  function af(U, aq, ap) {
    if (aa.ldbg) {
      m("beaconPageview called, pp=" + k.fData(U))
    }
    if (aq && !aa.persist_asid) {
      aj()
    }
    if (aa.USE_RAPID || (aa.apv_always_send && k.hasOwn(U, "A_apv"))) {
      ac.sendRapidNoDelay([], true, U, null, ap)
    }
    if (aa.ywa) {
      var ao = Y.makeFromPP(aa.keys);
      ao.absorb(U);
      ac.sendYWAPV(ao.getAll())
    }
    if (aa.apv && n != null) {
      n.reInit()
    }
  }

  function Z(aq, ar, ap, U) {
    if (aa.ldbg) {
      m('beaconEvent: event="' + aq + '" data=' + k.fData(ar) + " outcome=" + ap)
    }
    var ao = ai(0, aq, ar, ap);
    ac.sendEvents(ao, U)
  }

  var S = (function () {
    var U = {};
    return {
      subscribe: function (ap, ao) {
        var aq = U[ap];
        if (!aq) {
          aq = [];
          U[ap] = aq
        }
        aq.push(ao)
      }, unsubscribe: function (aq, ap) {
        var ar = U[aq];
        if (!ar) {
          return
        }
        for (var ao = 0; ao < ar.length; ao++) {
          if (ar[ao] === ap) {
            ar.splice(ao, 1);
            return
          }
        }
      }, fire: function (aq) {
        var ar = U[aq];
        if (!ar) {
          return
        }
        for (var ap = 0, ao = ar.length; ap < ao; ap++) {
          ar[ap].call(null)
        }
      }
    }
  })();
  var c = {
    FOCUS: "focus",
    BLUR: "blur",
    BEFOREUNLOAD: "beforeunload",
    PAGEHIDE: "pagehide",
    HISTORYSTATECHANGED: "historystatechanged",
    NAVIGATE: "navigate"
  };

  function x() {
    focusFun = function (U) {
      S.fire(c.FOCUS)
    }, blurFun = function (U) {
      S.fire(c.BLUR)
    }, unloadFun = function (U) {
      S.fire(c.BEFOREUNLOAD)
    };
    k.addEvent(window, c.FOCUS, focusFun);
    k.addEvent(window, c.BLUR, blurFun);
    if (k.isIOSSafari || k.isAndroid) {
      k.addEvent(window, c.PAGEHIDE, unloadFun)
    } else {
      k.addEvent(window, c.BEFOREUNLOAD, unloadFun)
    }
    this.historyStateChanged = function () {
      S.fire(c.HISTORYSTATECHANGED)
    }
  }

  function b() {
    var au = null, U = new Date().getTime(), ap = U, ar = k.getScrollY(), ao = -1, aq = function () {
      var ax = k.getScrollY(), aw = (ao === -1) ? (ax - ar) : (ax - ao), av = (aw > 0) ? 0 : 1;
      if (Math.abs(aw) > aa.viewability_px) {
        ah.reevaluateModuleViewability();
        ao = ax;
        ap = new Date().getTime()
      }
    };
    var at = function () {
      if (au != null) {
        clearTimeout(au)
      }
      var av = new Date().getTime();
      if ((av - U) < aa.viewability_time) {
        ar = k.getScrollY();
        ap = av
      }
      au = setTimeout(function () {
        aq()
      }, aa.viewability_time)
    };
    k.addEvent(window, "scroll", at);
    this.reInit = function () {
      ar = k.getScrollY();
      ao = -1;
      U = ap = new Date().getTime()
    };
    this.destroy = function () {
      k.rmEvent(window, "scroll", at)
    }
  }

  function R() {
    var at = null, U = lastApvTime = new Date().getTime(), ar = k.getScrollY(), ap = -1, aq = function () {
      var ax = k.getScrollY(), aw = (ap === -1) ? (ax - ar) : (ax - ap), av = (aw > 0) ? 0 : 1;
      if (Math.abs(aw) > aa.apv_px) {
        var au = {A_apv: 1, A_apx: ax, A_asd: av};
        af(au, false, true);
        ap = ax;
        lastApvTime = new Date().getTime();
        if (aa.apv_callback) {
          aa.apv_callback.call(this, {pixel_pos: ax, scroll_dir: av})
        }
      }
    };
    var ao = function () {
      if (at != null) {
        clearTimeout(at)
      }
      var au = new Date().getTime();
      if ((au - U) < aa.apv_time) {
        ar = k.getScrollY();
        lastApvTime = au
      }
      at = setTimeout(function () {
        aq()
      }, aa.apv_time)
    };
    k.addEvent(window, "scroll", ao);
    this.reInit = function () {
      ar = k.getScrollY();
      ap = -1;
      U = lastApvTime = new Date().getTime()
    };
    this.destroy = function () {
      k.rmEvent(window, "scroll", ao)
    }
  }

  function ak() {
    var ap = {
      focus: {state: "start", etrg: "show", etag: "dwell,start", jse: "window.focus"},
      pageshow: {state: "start", etrg: "show", etag: "dwell,start", jse: "window.pageshow"},
      "visibilitychange-visible": {state: "start", etrg: "show", etag: "dwell,start", jse: "document.visibilitychange"},
      blur: {state: "stop", etrg: "hide", etag: "dwell,stop", jse: "window.blur"},
      pagehide: {state: "stop", etrg: "hide", etag: "dwell,stop", jse: "window.pagehide"},
      "visibilitychange-hidden": {state: "stop", etrg: "hide", etag: "dwell,stop", jse: "document.visibilitychange"},
      beforeunload: {state: "stop", etrg: "close", etag: "dwell,stop", jse: "window.beforeunload"}
    };
    var at = "start";
    var ar, ao;
    if (typeof document.hidden !== "undefined") {
      ar = "hidden";
      ao = "visibilitychange"
    } else {
      if (typeof document.mozHidden !== "undefined") {
        ar = "mozHidden";
        ao = "mozvisibilitychange"
      } else {
        if (typeof document.msHidden !== "undefined") {
          ar = "msHidden";
          ao = "msvisibilitychange"
        } else {
          if (typeof document.webkitHidden !== "undefined") {
            ar = "webkitHidden";
            ao = "webkitvisibilitychange"
          }
        }
      }
    }
    var U = function (ax) {
      var au = "";
      var ay = ax.type;
      if (ax.type == ao) {
        if (document[ar]) {
          ay = "visibilitychange-hidden"
        } else {
          ay = "visibilitychange-visible"
        }
      }
      if (k.hasOwn(ap, ay)) {
        au = ap[ay]["state"]
      }
      if (au.length == 0) {
        return
      }
      if (at == au) {
        if (aa.ldbg) {
          console.log("dwell: -- state already " + at + " (event=" + ay + ")")
        }
        return
      }
      at = au;
      var aw = ap[ay];
      if (aa.ldbg) {
        console.log("dwell: change state to " + at + " (event=" + ay + ")")
      }
      var av = {etrg: aw.etrg, outcm: "window", usergenf: 1, etag: aw.etag, A_jse: aw.jse};
      Z("dwell", av, "")
    };
    for (var aq in ap) {
      if (ap.hasOwnProperty(aq)) {
        k.addEvent(window, aq, U)
      }
    }
    k.addEvent(window, ao, U);
    this.set_state = function (au) {
      at = au
    };
    this.destroy = function () {
      for (var au in ap) {
        if (ap.hasOwnProperty(au)) {
          k.rmEvent(window, au, U)
        }
      }
      k.rmEvent(window, ao, U)
    }
  }

  var L = 0;

  function N(ay) {
    var U = 10;
    if (!window.performance || !window.performance.timing) {
      return
    }
    var at = ay ? (ay.perf_navigationtime || 0) : (aa.perf_navigationtime || 0);
    var ar = ay ? (ay.perf_resourcetime || 0) : (aa.perf_resourcetime || 0);
    var ax = ay ? (ay.perf_commontime || null) : (aa.perf_commontime || null);
    var aw = ay ? (ay.perf_usertime || null) : (aa.perf_usertime || null);
    if (at < 1 && ar < 1 && !ax && !aw) {
      return
    }
    var az = k.hasOwn(aa.sample, "perf_navigationtime") ? aa.sample.perf_navigationtime : 100;
    var au = k.hasOwn(aa.sample, "perf_resourcetime") ? aa.sample.perf_resourcetime : 100;
    var aq = k.samplingSuccess(az);
    var ap = k.samplingSuccess(au);
    if (!aq && !ap) {
      return
    }
    if (window.performance.timing.loadEventStart === 0) {
      L += U;
      if (L > 200) {
        return
      }
      setTimeout(function () {
        N(ay)
      }, U);
      return
    }
    var ao = o(at, ar, ax, aw, aq, ap);
    var av = ai(0, "pageperf", ao, "");
    ac.sendEvents(av)
  }

  function o(at, aq, aB, aA, ar, ao) {
    var ap = {};
    var aC = window.performance.timing;
    if (ar && at > 0) {
      O(aC.responseStart, aC.connectEnd, ap, "A_pfb");
      O(aC.responseEnd, aC.responseStart, ap, "A_pbp");
      O(aC.responseEnd, aC.requestStart, ap, "A_psr");
      O(aC.loadEventStart, aC.navigationStart, ap, "A_pol");
      O(aC.domInteractive, aC.navigationStart, ap, "A_pdi")
    }
    if (ar && at > 1) {
      O(aC.redirectEnd, aC.redirectStart, ap, "A_prd");
      O(aC.domainLookupEnd, aC.domainLookupStart, ap, "A_pdl");
      O(aC.connectEnd, aC.secureConnectionStart, ap, "A_psh");
      O(aC.connectEnd, aC.connectStart, ap, "A_psc");
      O(aC.loadEventStart, aC.responseEnd, ap, "A_pfe")
    }
    if (ao && aq > 0) {
      if (typeof window.performance.getEntries != "undefined") {
        var ax = [];
        var aw = window.performance.getEntries();
        aw.sort(function (aF, aE) {
          return (aF.duration > aE.duration) ? -1 : ((aF.duration < aE.duration) ? 1 : 0)
        });
        var aD = aw.slice(0, 10);
        var U = aD.length;
        for (var av = 0; av < U; av++) {
          var az = {};
          var au = aD[av].name.replace(/\?.+$/, "");
          au = au.replace(/^.+\//, "");
          az.name = au;
          az.dur = Math.floor(aD[av].duration);
          az.st = Math.floor(aD[av].startTime);
          ax.push(az)
        }
        ap.A_res = k.sfy(ax)
      }
    }
    if (aB) {
      if (k.hasOwn(aB, "initialPageLoad")) {
        ap.A_cmi = k.sfy(aB.initialPageLoad)
      }
      if (k.hasOwn(aB, "afterPageLoad")) {
        ap.A_cma = k.sfy(aB.afterPageLoad)
      }
    }
    if (aA) {
      var ay = ["utm"];
      for (var av = 0; av < ay.length; av++) {
        if (k.hasOwn(aA, ay[av])) {
          ap.A_utm = k.sfy(aA[ay[av]])
        }
      }
    }
    ap.etrg = "backgroundPost";
    ap.outcm = "performance";
    ap.usergenf = 0;
    ap.etag = "performance";
    return ap
  }

  function O(ao, U, ar, aq) {
    if (!ao || !U) {
      return
    }
    var ap = ao - U;
    ar[aq] = ap
  }

  function ae() {
    s();
    if (aa.ldbg) {
      m("tracked_mods: " + k.fData(aa.tracked_mods))
    }
    var ao = ah.addModules(aa.tracked_mods, false);
    var U = ah.addModules(aa.tracked_mods_viewability, aa.viewability);
    if (aa.USE_RAPID && aa.pageview_on_init) {
      ac.sendRapidNoDelay(ao.concat(U), aa.client_only == 1)
    }
    if (aa.ywa && aa.pageview_on_init) {
      ac.sendYWAPV()
    }
    k.executeOnLoad(function () {
      f = new b();
      if (aa.apv) {
        n = new R()
      }
      if (aa.dwell_on) {
        t = new ak()
      }
      N()
    })
  }

  ae();
  var u = {utils: k};
  return {
    init: function () {
    }, beaconEvent: function (ap, aq, ao, U) {
      Z(ap, aq, ao, U)
    }, beaconClick: function (ao, U, at, ar, ap, aq) {
      if (aa.ldbg) {
        m("beaconClick: sec=" + ao + " slk=" + U + " callback=" + aq)
      }
      if (!ar && ap) {
        ar = {}
      }
      if (ap) {
        ar.outcm = ap
      }
      ac.sendClick(r(ao, U, at, ar, ap), aq)
    }, addModules: function (aq, au, ao) {
      if (aa.ldbg) {
        m("addModules() called: mods=" + k.fData(aq) + " isPage: " + au)
      }
      ao = ao || {};
      var U = {A_am: 1};
      if (ao.pp) {
        k.aug(U, ao.pp)
      }
      ao.useViewability = ao.useViewability || false;
      ao.clickonly = ao.clickonly || false;
      var ar = false, at = false;
      if (!au) {
        au = ao.useViewability ? 2 : false
      }
      switch (au) {
        case 1:
        case"1":
        case true:
          au = true;
          at = true;
          break;
        case 2:
        case"2":
          ar = true;
          au = false;
          ao.event = ai("contentmodification", "", {});
          break;
        case 0:
        case"0":
        case false:
        default:
          au = false;
          break
      }
      if (!aa.yql_enabled) {
        if (au) {
          af(U, at)
        } else {
          if (ao.event) {
            this.beaconRichView(U, ao.event.outcome)
          }
        }
        return
      }
      if (ao && ao.event && au) {
        q("Cannot track event type and pageview at same time.");
        ao.event = null
      }
      var ap = ah.addModules(aq, ao.useViewability);
      if (ap.length === 0 && !ao.event) {
        return
      }
      if (ao.clickonly) {
        ap = []
      }
      if (aa.USE_RAPID || ao.event) {
        if (au || ao.event || ao.pp) {
          if (at && !aa.persist_asid) {
            aj()
          }
          if (ao.event && ao.event.data) {
            k.aug(U, ao.event.data)
          }
          ac.sendRapidNoDelay(ap, au, U, ao)
        } else {
          if (ap.length > 0) {
            ac.sendRapid(ap, au, U, ao)
          }
        }
      }
      if (au === true) {
        if (aa.ywa) {
          ac.sendYWAPV(U)
        }
        if (aa.apv && n) {
          n.reInit()
        }
      }
    }, addModulesWithViewability: function (ao, ap, U) {
      U = U || {};
      U.useViewability = aa.viewability;
      this.addModules(ao, ap, U)
    }, refreshModule: function (ap, at, ao, U) {
      if (aa.ldbg) {
        m("refreshModule called: mod=" + ap + " isPV: " + at + " sendLinks: " + ao + " options: " + k.fData(U))
      }
      var au = false, av = false;
      U = U || {};
      if (!at) {
        at = false
      }
      switch (at) {
        case 1:
        case"1":
        case true:
          at = true;
          av = true;
          break;
        case 2:
        case"2":
          au = true;
          at = false;
          U.event = ai("contentmodification", "", {});
          break;
        case 0:
        case"0":
        case false:
        default:
          at = false;
          break
      }
      if (!aa.yql_enabled) {
        var ar = U.pp || {};
        if (at) {
          af(ar, av)
        } else {
          if (U.event) {
            this.beaconRichView(ar, U.event.outcome)
          }
        }
        return
      }
      var aq = (ao === false ? false : true);
      if (av && !aa.persist_asid) {
        aj()
      }
      if (at && U && U.event) {
        U.event = null
      }
      ah.refreshModule(ap, at, aq, U)
    }, removeModule: function (U) {
      ah.removeModule(U)
    }, isModuleTracked: function (U) {
      if (aa.ldbg) {
        m("isTracked called: " + U)
      }
      return (ah && (ah.exists(U) !== undefined))
    }, destroy: function () {
      m("destroy called");
      ah.destroy();
      if (n) {
        n.destroy();
        n = null
      }
      if (f) {
        f.destroy();
        f = null
      }
      if (t) {
        t.destroy();
        t = null
      }
    }, reInit: function (ap) {
      if (aa.ldbg) {
        m("reInit called with: " + k.fData(ap))
      }
      ap = ap || {};
      if (!ap.spaceid) {
        q("Invalid spid in reInit config: " + k.fData(ap));
        return
      }
      J = new Y();
      aa = B(ap);
      k = X(ap);
      var ao = new T();
      var aq = ao.getRxx();
      if (aq != null) {
        J.set("_rx", aq)
      }
      var ar = ao.getCookieByName("_ga");
      if (ar != null) {
        J.set("_ga", ar)
      }
      var U = ao.getCookieByName("yx");
      if (U != null) {
        J.set("_yx", U)
      }
    }, setRapidAttribute: function (ao) {
      if (ao.keys) {
        aa.keys.absorb(ao.keys)
      }
      if (ao.ywa) {
        if (k.isObj(ao.ywa)) {
          for (var U in ao.ywa) {
            if (k.hasOwn(ao.ywa, U)) {
              aa.ywa[U] = ao.ywa[U]
            }
          }
        }
      }
      if (ao.spaceid) {
        aa.spaceid = ao.spaceid
      }
      if (ao.referrer) {
        aa.referrer = ao.referrer.substring(0, k.MAX_VALUE_LENGTH)
      }
      if (ao.A_sid) {
        aa.keys.set("A_sid", ao.A_sid);
        aa.persist_asid = true
      }
      if (ao.location) {
        aa.loc = ao.location;
        aa.keys.set("_w", k.rmProto(ao.location).substring(0, k.MAX_VALUE_LENGTH))
      }
      if (k.hasOwn(ao, "apv")) {
        if (ao.apv) {
          if (!n) {
            n = new R()
          } else {
            n.reInit()
          }
        } else {
          if (n) {
            n.destroy();
            n = null
          }
        }
      }
    }, clearRapidAttribute: function (U) {
      for (var ao in U) {
        if (U[ao] === "keys") {
          var ap = aa.keys.get("_w");
          var aq = aa.keys.get("A_sid");
          aa.keys = new Y();
          aa.keys.set("_w", ap);
          aa.keys.set("A_sid", aq)
        } else {
          if (U[ao] === "referrer") {
            aa.referrer = ""
          } else {
            if (U[ao] === "A_sid") {
              aa.keys.set("A_sid", "");
              aa.persist_asid = true
            } else {
              if (U[ao] === "location") {
                aa.loc = "";
                aa.keys.set("_w", "")
              }
            }
          }
        }
      }
    }, beaconPageview: function (U) {
      af(U, true)
    }, beaconECommerce: function (ao, U) {
      if (aa.ywa) {
        ac.sendYWAECommerce(ao, U)
      }
    }, beaconInternalSearch: function (ao, U) {
      if (aa.ywa) {
        ac.sendInternalSearch(ao, U)
      }
    }, getCurrentSID: function () {
      return J.get("A_sid")
    }, notifyHistoryPushStateCalled: function () {
    }, beaconLinkViews: function (aB, U, aE, aD) {
      if (aa.ldbg) {
        m("beaconLinkViews() called")
      }
      aE = aE || {};
      var aw = {};
      if (aE.pp) {
        k.aug(aw, aE.pp)
      }
      var av = false;
      var aC = false;
      switch (U) {
        case 1:
        case"1":
        case true:
          aC = true;
          break;
        case 2:
        case"2":
          av = true;
          aC = false;
          aE.event = ai("contentmodification", "", {});
          break;
        case 0:
        case"0":
        case false:
        default:
          aC = false;
          break
      }
      if (!aa.yql_enabled) {
        if (aC) {
          af(aw, false)
        } else {
          if (aE.event) {
            this.beaconRichView(aw, aE.event.outcome)
          }
        }
        return
      }
      if (aE && aE.event && aC) {
        q("Cannot track event type and pageview at same time.");
        aE.event = null
      }
      if (aB.length === 0 && !aE.event) {
        return
      }
      var au = [];
      for (var at = 0; at < aB.length; at++) {
        var ao = aB[at];
        var aA = new j();
        aA.absorb_filter(ao, function (aF) {
          return (aF != "sec" && aF != "_links")
        });
        var ap = [];
        var az = 1;
        for (var ar = 0; ar < ao._links.length; ar++) {
          var ay = ao._links[ar];
          var aq = {viewable: true, data: {sec: ao.sec, _p: az++, A_lv: 2}};
          k.aug(aq.data, ay);
          ap.push(aq)
        }
        var ax = {moduleName: ao.sec, moduleYLK: aA, links: ap, identifier: ao.sec};
        au.push(ax)
      }
      if (aa.USE_RAPID || aE.event) {
        if (aC || aE.event || aE.pp) {
          if (aE.event && aE.event.data) {
            k.aug(aw, aE.event.data)
          }
        }
        ac.sendRapidNoDelay(au, aC, aw, aE)
      }
      if (aD) {
        aD.call()
      }
    }, beaconPerformanceData: function (U) {
      N(U)
    }, __test_only__: function () {
      return u
    }
  };
  function X(aB) {
    var aD = navigator.userAgent, aq = Object.prototype, aA = (aD.match(/MSIE\s[^;]*/) || aD.match(/Trident\/[^;]*/) ? 1 : 0), ay = ((/KHTML/).test(aD) ? 1 : 0), aw = (aD.match(/(iPhone|iPad|iPod)/ig) !== null), aH = (aD.indexOf("Android") > -1), at = (aw && (aD.match(/AppleWebKit/) !== null)), aF = (aD.match(/AppleWebKit/) !== null && aD.match(/Chrome/) === null), ar = new RegExp(/\ufeff|\uffef|[\u0000-\u001f]|[\ue000-\uf8ff]/g), aE = new RegExp(/[\u007f-\u00a0]|\s{2,}/g), ao = "http://", aG = "https://", U = "class", au = " ", av = -1, ax = 300, ap = new Array("A_res", "A_cmi", "A_cma", "A_utm"), az = -1, aC = (window.location.protocol === "https:");
    if (aA) {
      if (document.documentMode) {
        az = document.documentMode
      } else {
        az = 5;
        if (document.compatMode) {
          if (document.compatMode == "CSS1Compat") {
            az = 7
          }
        }
      }
    }
    return {
      $: function (aI) {
        return document.getElementById(aI)
      },
      ca: "%01",
      cb: "%02",
      cc: "%03",
      cd: "%04",
      ce: "%05",
      cf: "%06",
      cg: "%07",
      ch: "%08",
      ylk_kv_delim: aB.ylk_kv_delim || ":",
      ylk_pair_delim: aB.ylk_pair_delim || ";",
      DATA_ACTION: "data-action",
      data_action_outcome: "data-action-outcome",
      isIE: aA,
      isIOSSafari: at,
      isSafari: aF,
      isWebkit: ay,
      ieV: az,
      MAX_VALUE_LENGTH: aB.max_value_length || ax,
      value_len_whitelist: ap,
      hasOwn: function (aJ, aI) {
        return aq.hasOwnProperty.call(aJ, aI)
      },
      enc: encodeURIComponent,
      dec: decodeURIComponent,
      curProto: function () {
        return (aC ? aG : ao)
      },
      isSecure: function () {
        return aC
      },
      isScrollHorizontalVisible: function () {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth
      },
      getCompStyle: function (aI, aJ) {
        if (window.getComputedStyle !== undefined) {
          return window.getComputedStyle(aI, aJ)
        }
        this.el = aI;
        this.getPropertyValue = function (aL) {
          var aK = /(\-([a-z]){1})/g;
          if (aL == "float") {
            aL = "styleFloat"
          }
          if (aK.test(aL)) {
            aL = aL.replace(aK, function () {
              return arguments[2].toUpperCase()
            })
          }
          return aI.currentStyle[aL] ? aI.currentStyle[aL] : 0
        };
        return this
      },
      getBorder: function (aI, aJ) {
        if (!aI || !aJ) {
          return 0
        }
        var aK = parseInt(this.getCompStyle(aI, null).getPropertyValue(aJ), 10);
        if (isNaN(aK)) {
          aK = 0
        }
        return aK
      },
      getElementHeight: function (aI) {
        if (!aI) {
          return 0
        }
        var aJ = aI.offsetHeight || 0;
        if (!aJ) {
          return 0
        }
        return (aJ - this.getBorder(aI, "border-top-width") - this.getBorder(aI, "border-bottom-width"))
      },
      getPositionTop: function (aI) {
        var aJ = 0;
        while (aI) {
          aJ += aI.offsetTop;
          aI = aI.offsetParent
        }
        return aJ
      },
      getScrollbarWidthHeight: function () {
        var aJ = this.make("div");
        aJ.style.overflow = "scroll";
        aJ.style.visibility = "hidden";
        aJ.style.position = "absolute";
        aJ.style.width = "100px";
        aJ.style.height = "100px";
        document.body.appendChild(aJ);
        var aI = {width: aJ.offsetWidth - aJ.clientWidth, height: aJ.offsetHeight - aJ.clientHeight};
        this.rmBodyEl(aJ);
        return aI
      },
      isAboveFold: function (aK) {
        if (aA && (az <= 7)) {
          return true
        }
        var aI = k.getCompStyle(aK);
        if (aI.visibility == "hidden" || aI.display == "none") {
          return false
        }
        var aN = aK.getBoundingClientRect();
        var aM = this.getElementHeight(aK);
        var aO = aM * 0.5;
        if ((aN.top + aO) < 0) {
          return false
        }
        var aL = window.innerHeight || document.documentElement.clientHeight;
        if (this.isScrollHorizontalVisible()) {
          var aJ = this.getScrollbarWidthHeight();
          aL -= aJ.height
        }
        if ((aN.bottom - aO) <= aL) {
          return true
        }
      },
      strip: function (aJ) {
        var aN = {"/": "P", ";": "1", "?": "P", "&": "1", "#": "P"};
        var aM = {url: aJ, clean: "", cookie: "", keys: []};
        var aI = 0;
        while (aJ.indexOf("_yl", aI) !== -1) {
          var aO = aJ.indexOf("_yl", aI);
          if (aI < aO) {
            aM.clean += aJ.slice(aI, aO - 1)
          }
          aI = aO + 3;
          if (aN[aJ.charAt(aO - 1)] && aJ.charAt(aO + 4) === "=") {
            aM.ult = 1;
            var aK = "_yl" + aJ.charAt(aO + 3);
            var aL = "";
            for (aO = aO + 5; aO < aJ.length && !aN[aJ.charAt(aO)]; aO++) {
              aL += aJ.charAt(aO)
            }
            aM.keys.push(aK);
            aM[aK] = aL;
            if (aK !== "_ylv") {
              aM.cookie += "&" + aK + "=" + aL
            }
            if (aN[aJ.charAt(aO)] && aN[aJ.charAt(aO)] === "P") {
              aM.clean += aJ.charAt(aO)
            }
            aI = aO + 1
          } else {
            aM.clean += aJ.slice(aO - 1, aI)
          }
        }
        if (aM.ult) {
          aM.cookie = aM.cookie.substr(1);
          aM.clean += aJ.substr(aI);
          if (aM._ylv === "0") {
          }
        }
        return aM
      },
      prevDef: function (aI) {
        if (aI.preventDefault) {
          aI.preventDefault()
        } else {
          aI.returnValue = false
        }
      },
      appBodyEl: function (aI) {
        document.body.appendChild(aI)
      },
      rmBodyEl: function (aI) {
        document.body.removeChild(aI)
      },
      sa: function (aJ, aI, aK) {
        aJ.setAttribute(aI, aK)
      },
      getScrollY: function () {
        var aI = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        return aI
      },
      make: function (aK, aJ) {
        var aL = document.createElement(aK);
        if (aJ && this.isObj(aJ)) {
          for (var aI in aJ) {
            this.sa(aL, aI, aJ[aI])
          }
        }
        return aL
      },
      getXHR: function () {
        var aJ = [function () {
          return new XMLHttpRequest()
        }, function () {
          return new ActiveXObject("Msxml2.XMLHTTP")
        }, function () {
          return new ActiveXObject("Msxml3.XMLHTTP")
        }, function () {
          return new ActiveXObject("Microsoft.XMLHTTP")
        }];

        function aI() {
          var aM = false, aK = aJ.length;
          for (var aL = 0; aL < aK; aL++) {
            try {
              aM = aJ[aL]()
            } catch (aN) {
              continue
            }
            break
          }
          return aM
        }

        return aI()
      },
      hasLS: function () {
        try {
          return "localStorage" in window && window.localStorage !== null
        } catch (aI) {
          return false
        }
      },
      hasCORS: function () {
        if (aA && (az < 10)) {
          return false
        }
        if ("withCredentials" in (new XMLHttpRequest)) {
          return true
        } else {
          if (typeof XDomainRequest !== "undefined") {
            return true
          }
        }
        return false
      },
      hasWorkers: function () {
        return !!window.Worker
      },
      clearCookie: function (aI, aK, aJ) {
        aK = aK ? aK : "/";
        aJ = aJ ? aJ : "";
        document.cookie = aI + "= ; path=" + aK + "; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + aJ + ";"
      },
      uniqConcat: function (aK, aI, aL) {
        var aN = [], aM = {};

        function aJ(aP) {
          for (var aQ = 0, aO = aP.length; aQ < aO; aQ++) {
            var aR = aP[aQ];
            if (!aR) {
              continue
            }
            var aS = aL(aR);
            if (!aM[aS]) {
              aM[aS] = 1;
              aN.push(aR)
            }
          }
        }

        aJ(aK);
        aJ(aI);
        return aN
      },
      trim: function (aI) {
        if (!aI) {
          return aI
        }
        return aI.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
      },
      extDomain: function (aI) {
        var aJ = aI.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return (aJ && aJ[1])
      },
      getAttribute: function (aJ, aI) {
        var aK = "";
        if (!document.documentElement.hasAttribute && (aI === U)) {
          aI = "className"
        }
        if (aJ && aJ.getAttribute) {
          aK = aJ.getAttribute(aI, 2)
        }
        return aK
      },
      isDate: function (aI) {
        return aq.toString.call(aI) === "[object Date]"
      },
      isArr: function (aI) {
        return aq.toString.apply(aI) === "[object Array]"
      },
      isStr: function (aI) {
        return typeof aI === "string"
      },
      isNum: function (aI) {
        return typeof aI === "number" && isFinite(aI)
      },
      isNumeric: function (aI) {
        return (aI - 0) == aI && (aI + "").replace(/^\s+|\s+$/g, "").length > 0
      },
      isObj: function (aI) {
        return (aI && (typeof aI === "object"))
      },
      rTN: function (aJ) {
        try {
          if (aJ && 3 === aJ.nodeType) {
            return aJ.parentNode
          }
        } catch (aI) {
          q(aI)
        }
        return aJ
      },
      getTarget: function (aJ) {
        var aI = aJ.target || aJ.srcElement;
        return this.rTN(aI)
      },
      addEvent: function (aK, aI, aJ) {
        if (aK.addEventListener) {
          aK.addEventListener(aI, aJ, false)
        } else {
          if (aK.attachEvent) {
            aK.attachEvent("on" + aI, aJ)
          }
        }
      },
      rmEvent: function (aK, aI, aJ) {
        if (aK.removeEventListener) {
          aK.removeEventListener(aI, aJ, false)
        } else {
          if (aK.detachEvent) {
            aK.detachEvent("on" + aI, aJ)
          }
        }
      },
      aug: function (aK, aJ, aL) {
        if (!aJ) {
          return
        }
        for (var aI in aJ) {
          if (this.hasOwn(aJ, aI)) {
            if (aL && !aL.call(null, aI, aJ[aI])) {
              continue
            }
            aK[aI] = aJ[aI]
          }
        }
      },
      rmProto: function (aI) {
        if (!aI) {
          return ""
        }
        if (aI.substr(0, 7) === ao) {
          return aI.substr(7, aI.length)
        }
        if (aI.substr(0, 8) === aG) {
          return aI.substr(8, aI.length)
        }
        return aI
      },
      norm: function (aI) {
        if (aI === null) {
          return ""
        }
        aI = "" + aI;
        return this.trim(aI.replace(aE, " ").replace(ar, ""))
      },
      _hasClass: function (aJ, aI) {
        var aL = false, aK;
        if (aJ && aI) {
          aK = this.getAttribute(aJ, U) || "";
          if (aI.exec) {
            aL = aI.test(aK)
          } else {
            aL = aI && (au + aK + au).indexOf(au + aI + au) > -1
          }
        }
        return aL
      },
      hasClass: function (aL, aK) {
        if (this.isArr(aK)) {
          for (var aJ = 0, aI = aK.length; aJ < aI; aJ++) {
            if (this._hasClass(aL, aK[aJ])) {
              return true
            }
          }
          return false
        } else {
          if (this.isStr(aK)) {
            return this._hasClass(aL, aK)
          } else {
            return false
          }
        }
      },
      quote: function (aI) {
        var aJ = /["\\\x00-\x1f\x7f-\x9f]/g, aK = {
          "\b": "\\b",
          "\t": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\"
        }, aN = '"', aL = '"';
        if (aI.match(aJ)) {
          var aM = aI.replace(aJ, function (aP) {
            var aO = aK[aP];
            if (typeof aO === "string") {
              return aO
            }
            aO = aP.charCodeAt();
            return "\\u00" + Math.floor(aO / 16).toString(16) + (aP % 16).toString(16)
          });
          return aN + aM + aN
        }
        return aL + aI + aL
      },
      sfy: function (aJ) {
        if (!aJ && aJ !== "") {
          return {}
        }
        var aL, aQ = (typeof aJ);
        if (aQ === "undefined") {
          return "undefined"
        }
        if (aQ === "number" || aQ === "boolean") {
          return "" + aJ
        }
        if (aQ === "string") {
          return this.quote(aJ)
        }
        if (typeof aJ.toJSON === "function") {
          return this.sfy(aJ.toJSON())
        }
        if (this.isDate(aJ)) {
          var aP = aJ.getUTCMonth() + 1, aS = aJ.getUTCDate(), aR = aJ.getUTCFullYear(), aT = aJ.getUTCHours(), aK = aJ.getUTCMinutes(), aV = aJ.getUTCSeconds(), aN = aJ.getUTCMilliseconds();
          if (aP < 10) {
            aP = "0" + aP
          }
          if (aS < 10) {
            aS = "0" + aS
          }
          if (aT < 10) {
            aT = "0" + aT
          }
          if (aK < 10) {
            aK = "0" + aK
          }
          if (aV < 10) {
            aV = "0" + aV
          }
          if (aN < 100) {
            aN = "0" + aN
          }
          if (aN < 10) {
            aN = "0" + aN
          }
          return '"' + aR + "-" + aP + "-" + aS + "T" + aT + ":" + aK + ":" + aV + "." + aN + 'Z"'
        }
        aL = [];
        if (this.isArr(aJ)) {
          for (var aM = 0, aO = aJ.length; aM < aO; aM++) {
            aL.push(this.sfy(aJ[aM]))
          }
          return "[" + aL.join(",") + "]"
        }
        if (aQ === "object") {
          for (var aW in aJ) {
            if (this.hasOwn(aJ, aW)) {
              var aX = typeof aW, aI = null;
              if (aX === "string") {
                aI = this.quote(aW)
              } else {
                if (aX === "number") {
                  aI = '"' + aW + '"'
                } else {
                  continue
                }
              }
              aX = typeof aJ[aW];
              if (aX !== "function" && aX !== "undefined") {
                var aU = "";
                if (aJ[aW] === null) {
                  aU = '""'
                } else {
                  if (aJ[aW] === 0) {
                    aU = 0
                  } else {
                    aU = this.sfy(aJ[aW])
                  }
                }
                aL.push(aI + ":" + aU)
              }
            }
          }
          return "{" + aL.join(",") + "}"
        }
      },
      toJSON: (function () {
        var aI = null;
        return function (aJ) {
          if (!aI) {
            aI = ((typeof JSON === "object" && JSON.stringify && az !== 6 && az !== 7 && az !== 8) ? JSON.stringify : this.sfy)
          }
          return aI.call(this, aJ)
        }
      })(),
      executeOnLoad: (function (aO) {
        var aL = false, aK = function (aP) {
          if (document.addEventListener || (aP && aP.type === "load") || document.readyState === "complete") {
            aL = true;
            aJ();
            aO.call(this)
          }
        }, aJ = function () {
          if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", aK, false);
            window.removeEventListener("load", aK, false)
          } else {
            document.detachEvent("onreadystatechange", aK);
            window.detachEvent("onload", aK)
          }
        };
        if (document.readyState === "complete") {
          setTimeout(aK)
        } else {
          if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", aK, false);
            window.addEventListener("load", aK, false)
          } else {
            document.attachEvent("onreadystatechange", aK);
            window.attachEvent("onload", aK);
            var aN = false;
            try {
              aN = window.frameElement == null && document.documentElement
            } catch (aM) {
            }
            if (aN && aN.doScroll) {
              (function aI() {
                if (!aL) {
                  try {
                    aN.doScroll("left")
                  } catch (aP) {
                    return setTimeout(aI, 50)
                  }
                  aJ();
                  aO.call(this)
                }
              })()
            }
          }
        }
      }),
      getLinkContent: function (aI) {
        for (var aJ = 0, aK = "", aL; ((aL = aI.childNodes[aJ]) && aL); aJ++) {
          if (aL.nodeType === 1) {
            if (aL.nodeName.toLowerCase() === "img") {
              aK += (this.getAttribute(aL, "alt") || "") + " "
            }
            aK += this.getLinkContent(aL)
          }
        }
        return aK
      },
      fData: function (aI) {
        if (this.isStr(aI)) {
          return aI
        }
        return this.toJSON(aI)
      },
      getLT: function (aI, aJ) {
        if (!aI) {
          return "_"
        }
        var aK = "";
        aJ = aJ.toLowerCase();
        if (aI.nodeName.toLowerCase() === "input") {
          aK = this.getAttribute(aI, "value")
        } else {
          if (aJ === "text") {
            if (ay) {
              aK = aI.textContent
            } else {
              aK = (aI.innerText ? aI.innerText : aI.textContent)
            }
          } else {
            if (aJ === "href") {
              aK = this.rmProto(this.getAttribute(aI, "href"))
            } else {
              aK = this.getAttribute(aI, aJ) || ""
            }
          }
        }
        aK = this.norm(aK);
        if (aK === "") {
          aK = this.norm(this.getLinkContent(aI))
        }
        if (aK && aK.length > k.MAX_VALUE_LENGTH) {
          aK = aK.substring(0, k.MAX_VALUE_LENGTH)
        }
        return (aK === "" ? "_" : aK)
      },
      clref: function (aI) {
        if (aI.indexOf(ao) !== 0 && aI.indexOf(aG) !== 0) {
          return ""
        }
        var aJ = this.strip(aI);
        return aJ.clean || aJ.url
      },
      cold: function () {
        if (screen) {
          return screen.colorDepth || screen.pixelDepth
        }
        return "unknown"
      },
      sr: function (aI) {
        return (screen ? screen.width + (aI ? aI : ",") + screen.height : "")
      },
      xy: function (aL) {
        function aJ() {
          var aN = document.documentElement, aO = document.body;
          if (aN && (aN.scrollTop || aN.scrollLeft)) {
            return [aN.scrollTop, aN.scrollLeft]
          } else {
            if (aO) {
              return [aO.scrollTop, aO.scrollLeft]
            } else {
              return [0, 0]
            }
          }
        }

        var aK = null, aI = aL.pageX, aM = aL.pageY;
        if (aA) {
          aK = aJ()
        }
        if (!aI && 0 !== aI) {
          aI = aL.clientX || 0;
          if (aA) {
            aI += aK[1]
          }
        }
        if (!aM && 0 !== aM) {
          aM = aL.clientY || 0;
          if (aA) {
            aM += aK[0]
          }
        }
        return aI + "," + aM
      },
      hasCC: function (aK) {
        for (var aJ = 0, aI = aK.length; aJ < aI; aJ++) {
          var aL = aK.charCodeAt(aJ);
          if (aL < 32 || aL === "=") {
            return true
          }
        }
        return false
      },
      isValidPair: function (aJ, aI) {
        if (k.in_value_whitelist(aJ)) {
          return true
        }
        if (aJ.length > 8 || aI.length > k.MAX_VALUE_LENGTH) {
          ad("Invalid key/value pair (" + aJ + "=" + aI + ") Size must be < 8/300 respectively.");
          return false
        }
        return true
      },
      ser: function (aO, aK) {
        if (!aO) {
          return ""
        }
        if (typeof aK === undefined) {
          aK = true
        }
        var aP = [], aN = "";
        for (var aL in aO) {
          if (this.hasOwn(aO, aL)) {
            var aJ = aL, aI = aO[aL];
            if (aJ === null || aI === null) {
              continue
            }
            aJ = aJ + "";
            aI = aI + "";
            if (aI && !k.in_value_whitelist(aJ) && aI.length > k.MAX_VALUE_LENGTH) {
              aI = aI.substring(0, k.MAX_VALUE_LENGTH)
            }
            if (!this.isValidPair(aJ, aI)) {
              continue
            }
            if (!this.hasCC(aJ) && !this.hasCC(aI)) {
              aN = "";
              aI = this.trim(aI);
              if ((aI === "" || aI === " ") && aK) {
                aI = "_"
              }
              try {
                aN = this.enc(aJ + "\x03" + aI);
                aN = aN.replace(/'/g, "%27")
              } catch (aM) {
                aN = "_ERR_ENCODE_";
                q(aM)
              }
              aP.push(aN)
            }
          }
        }
        return aP.join(this.cd)
      },
      rand: function () {
        var aI = 0, aJ = "", aL = "";
        while (aI++ < 16) {
          var aK = Math.floor(Math.random() * 62);
          if (aK < 10) {
            aL = aK
          } else {
            aL = String.fromCharCode(aK < 36 ? aK + 55 : aK + 61)
          }
          aJ += aL
        }
        return aJ
      },
      tms: function () {
        return +new Date()
      },
      cookEn: function () {
        var aJ = (navigator.cookieEnabled) ? 1 : 0, aI = "rapidtc";
        if (typeof navigator.cookieEnabled == "undefined" && !aJ) {
          document.cookie = aI + "=1";
          aJ = (document.cookie.indexOf("testcookie") != -1) ? true : false;
          document.cookie = aI + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        }
        return aJ
      },
      isResCF: function (aJ) {
        var aI = {14: 1, 15: 1, 18: 1, 19: 1, 20: 1};
        return aI[aJ]
      },
      isTagOfInterest: function (aL, aI) {
        for (var aK = 0, aJ = aI.length; aK < aJ; aK++) {
          if (aL.tagName && aL.tagName.toLowerCase() == aI[aK].toLowerCase()) {
            return true
          }
        }
        return false
      },
      samplingSuccess: function (aI) {
        var aK = function (aN) {
          var aP = 33554467, aO = aP;
          for (var aM = 0, aL = aN.length; aM < aL; aM++) {
            aO += (aO << 1) + (aO << 4) + (aO << 7) + (aO << 8) + (aO << 24);
            aO ^= aN.charCodeAt(aM)
          }
          if (aO < 0) {
            aO &= 2147483647;
            aO += 2147483648
          }
          return aO
        }, aJ = function (aL) {
          var aO = 1000;
          aL *= 10;
          var aM = new T();
          var aN = "" + aM.getCookieByName("B");
          if (!aN) {
            return false
          }
          if (av < 0) {
            av = (aK(aN) % aO)
          }
          return (av < aL)
        };
        return aJ(aI)
      },
      in_value_whitelist: function (aI) {
        if (aA && az <= 8) {
          return false
        }
        return k.value_len_whitelist.indexOf(aI) !== -1
      }
    }
  }
};