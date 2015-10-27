YUI.add("flickr-page-timing", function (a) {
  var f = null, i = 30 * 1000;
  var b = false;
  if (a.config.flickr.flags.enable_homerun_navtiming_flag) {
    page_timing = {}
  }
  function h(l) {
    if (!a.Lang.isObject(l)) {
      l = {}
    }
    f = l;
    if (typeof page_timing !== "undefined") {
      a.on("load", function () {
        if (!page_timing.window_load) {
          a.log("Warn: using Y.on(load) timing");
          page_timing.window_load = new Date().getTime()
        }
        var u = document.getElementsByTagName("img"), v = {}, t;
        for (var p = 0, w = u.length; p < w; p++) {
          t = u[p].getAttribute("data-defer-src");
          if (!t) {
            t = u[p].src
          }
          v[t] = 1
        }
        page_timing.dom_image_count = 0;
        for (var z in v) {
          if (v.hasOwnProperty(z)) {
            page_timing.dom_image_count++
          }
        }
        var A = document.getElementsByTagName("script");
        var q = 0;
        var y = 0;
        var o = [];
        for (var r = A.length; r--;) {
          if (A[r].getAttribute("src")) {
            q++;
            o.push(A[r].getAttribute("src"))
          } else {
            if (A[r].getAttribute("data-script-purpose") != "page_timing") {
              y++
            }
          }
        }
        page_timing.dom_script_external_count = q;
        page_timing.dom_script_inline_count = y;
        try {
          if (typeof page_timing.display_only === "undefined") {
            if (f.sample_rate) {
              if (Math.round(Math.random() * f.sample_rate) === 1) {
                j()
              }
            } else {
              j()
            }
          } else {
            a.one(window).on("load", function () {
              setTimeout(function () {
                d();
                window.beacon_page_timing_data = j
              }, 250)
            })
          }
        } catch (x) {
        }
      }, window);
      page_timing.is_owner = f.is_owner;
      page_timing.page_generation = null;
      try {
        var k = parseInt(document.getElementById("page-gen").innerHTML.match(/[0-9]+ms/i), 10);
        if (!isNaN(k)) {
          page_timing.page_generation = k
        }
      } catch (m) {
      }
      page_timing.is_logged_in = (a.config.flickr.user.nsid ? 1 : 0);
      page_timing.is_pro = a.config.flickr.user.ispro
    } else {
      a.log("Warning: page_timing not found")
    }
  }

  function d() {
    var n = g();
    var m = document.createElement("span");
    var k = null;
    var p = null;
    var l = ["[A/D] Time in head: " + (n.head_end - n.page_start), ", page parse: " + (n.page_end - n.page_start), ", DOM ready: " + (n.dom_ready ? n.dom_ready - n.page_start : "n/a"), ", load: " + (n.window_load - n.page_start)];
    if (typeof a.timingAverage !== "undefined") {
      k = a.timingAverage.get_this_page_time();
      p = a.timingAverage.get_average_time();
      if (k) {
        l[l.length] = ", RT: " + k
      }
      if (p) {
        l[l.length] = ", RT avg: " + p
      }
    }
    m.ondblclick = function () {
      this.style.display = "none"
    };
    m.style.cssText = "display:inline;position:fixed;bottom:0px;left:0px;background:#333;padding:2px 4px;font:normal 11px monospace,system,terminal,helvetica,arial;color:#fff";
    m.innerHTML = l.join("");
    document.body.appendChild(m);
    if (document.getElementById("footer-js-note")) {
      document.getElementById("footer-js-note").style.display = "none"
    }
  }

  function g() {
    var l, m;
    var q = {
      page_start: page_timing.page_start,
      head_end: page_timing.head_end,
      body_start: page_timing.body_start,
      page_end: page_timing.page_end,
      head_js_start: page_timing.head_js_start,
      head_js_end: page_timing.head_js_end,
      head_css_start: page_timing.head_css_start,
      head_css_end: page_timing.head_css_end,
      photo_start: page_timing.photo_start,
      photo_end: page_timing.photo_end,
      dom_ready: page_timing.dom_ready,
      window_load: page_timing.window_load,
      page_generation: page_timing.page_generation,
      image_count: page_timing.dom_image_count,
      dom_script_external_count: page_timing.dom_script_external_count,
      dom_script_inline_count: page_timing.dom_script_inline_count,
      is_logged_in: page_timing.is_logged_in,
      is_pro: page_timing.is_pro,
      is_owner: page_timing.is_owner,
      js_assets_start: page_timing.js_assets_start,
      js_assets_end: page_timing.js_assets_end,
      timing_pageid: (typeof f.page_id !== "undefined" ? f.page_id : "undefined"),
      js_done: page_timing.js_done,
      seed_fetch_start: page_timing.seed_fetch_start,
      seed_fetch_end: page_timing.seed_fetch_end,
      photos_above_fold: page_timing.photos_above_fold
    };
    if (page_timing.time_to_first_photo) {
      q.time_to_first_photo = page_timing.time_to_first_photo
    }
    if (a.UA.ie && !a.UA.mobile) {
      if (a.UA.ie === 9) {
        q.dom_ready_ie9 = page_timing.dom_ready;
        q.window_load_ie9 = page_timing.window_load;
        q.js_done_ie9 = page_timing.js_done
      } else {
        if (a.UA.ie === 8) {
          q.dom_ready_ie8 = page_timing.dom_ready;
          q.window_load_ie8 = page_timing.window_load;
          q.js_done_ie8 = page_timing.js_done
        } else {
          if (a.UA.ie === 7) {
            q.dom_ready_ie7 = page_timing.dom_ready;
            q.window_load_ie7 = page_timing.window_load;
            q.js_done_ie7 = page_timing.js_done
          } else {
            if (a.UA.ie === 6) {
              q.dom_ready_ie6 = page_timing.dom_ready;
              q.window_load_ie6 = page_timing.window_load;
              q.js_done_ie6 = page_timing.js_done
            }
          }
        }
      }
    } else {
      if (a.UA.chrome >= 5 && !a.UA.mobile) {
        q.js_done_chrome = page_timing.js_done
      } else {
        if (a.UA.webkit > 533 && !a.UA.ios && !a.UA.mobile) {
          q.js_done_safari = page_timing.js_done
        } else {
          if (a.UA.gecko >= 1.9 && !a.UA.mobile) {
            q.js_done_firefox = page_timing.js_done
          } else {
            if (a.UA.opera >= 10 && !a.UA.mobile) {
              q.js_done_opera = page_timing.js_done
            }
          }
        }
      }
    }
    if (a.config.flickr.photo && a.config.flickr.photo.id) {
      q.photo_id = a.config.flickr.photo.id
    }
    if (a.config.flickr.page_owner) {
      q.page_owner = a.config.flickr.page_owner
    }
    if (a.Lang.isObject(page_timing.buddyicon_starts) && a.Lang.isObject(page_timing.buddyicon_ends)) {
      var p = [], k = [];
      for (var n in page_timing.buddyicon_starts) {
        if (page_timing.buddyicon_starts.hasOwnProperty(n) && page_timing.buddyicon_ends.hasOwnProperty(n) && !n.match(/buddyicon\.[gif|jpg]/i)) {
          p.push(page_timing.buddyicon_starts[n]);
          k.push(page_timing.buddyicon_ends[n])
        }
      }
      if (p.length > 0) {
        q.buddyicon_starts = p.join(",");
        q.buddyicon_ends = k.join(",")
      }
    }
    if (window.performance && window.performance.timing) {
      q.performance_has_data = 1;
      q.performance_navigationStart = window.performance.timing.navigationStart;
      q.performance_connectEnd = window.performance.timing.connectEnd;
      q.performance_requestStart = window.performance.timing.requestStart;
      q.performance_responseStart = window.performance.timing.responseStart;
      q.performance_responseEnd = window.performance.timing.responseEnd;
      q.performance_domLoading = window.performance.timing.domLoading;
      q.performance_loadEventEnd = window.performance.timing.loadEventEnd;
      if (a.config.flickr.flags.enable_homerun_navtiming_flag) {
        var o = window.performance.timing, r = window.performance.navigation;
        q.navtiming = {
          red_cnt: r.redirectCount,
          nav_type: r.type,
          nav_st: o.navigationStart,
          red_st: o.redirectStart,
          red_end: o.redirectEnd,
          fet_st: o.fetchStart,
          dns_st: o.domainLookupStart,
          dns_end: o.domainLookupEnd,
          con_st: o.connectStart,
          con_end: o.connectEnd,
          req_st: o.requestStart,
          res_st: o.responseStart,
          res_end: o.responseEnd,
          domloading: o.domLoading,
          domint: o.domInteractive,
          domcontloaded_st: o.domContentLoadedEventStart,
          domcontloaded_end: o.domContentLoadedEventEnd,
          domcomp: o.domComplete,
          load_st: o.loadEventStart,
          load_end: o.loadEventEnd,
          unload_st: o.unloadEventStart,
          unload_end: o.unloadEventEnd
        }
      }
    }
    return q
  }

  function c(m) {
    var k = m.page_start;
    for (var l in m) {
      if (m.hasOwnProperty(l) && l !== "page_generation" && l !== "timing_pageid" && l !== "page_owner" && l !== "photo_id" && l !== "performance_has_data" && l.search(/_count/) === -1 && l.search(/is_/) === -1) {
        if (/^performance_/.test(l) && m[l] !== 0 && (m[l] - m.performance_navigationStart > i || m[l] - m.performance_navigationStart < 0)) {
          return false
        } else {
          if (!/^performance_/.test(l) && (m[l] - k > i || m[l] - k < 0)) {
            return false
          }
        }
      }
    }
    return true
  }

  function j() {
    a.log("Got timing report");
    b = true;
    var k = "/beacon_page_timings.gne";
    var q = g();
    if (c(q) && !a.config.flickr.flags.enable_homerun_navtiming_flag) {
      var t = [];
      for (var v in q) {
        if (q.hasOwnProperty(v)) {
          t[t.length] = (v + "=" + q[v])
        }
      }
      var n = k + "?" + t.join("&");
      a.io(n, {method: "GET", timeout: 10000})
    }
    if (a.config.flickr.flags.enable_homerun_navtiming_flag && q.performance_has_data) {
      a.log("Sending navigation timing report to homerun");
      var k = "http://bc.fp.yahoo.com/tick?", p = [], o = q.navtiming, r, m, l;

      function u(w) {
        w = " " + w + "=";
        var x, y;
        y = " " + document.cookie + ";";
        if ((x = y.indexOf(w)) >= 0) {
          x += w.length;
          y = y.substring(x, y.indexOf(";", x));
          return y
        }
        return ""
      }

      function s(w, z) {
        z = "&" + z + "=";
        var x, y;
        y = u(w);
        y = "&" + y + "&";
        if ((x = y.indexOf(z)) >= 0) {
          y = y.substring(x + z.length, y.indexOf("&", x + z.length));
          return y
        }
        return 100
      }

      if (a.config.flickr.flags.enable_photopage_perf) {
        a.log("Photopage perf enabled - sending to 5001 bucket");
        p.push("bkt=" + 5001)
      } else {
        p.push("bkt=" + 5000)
      }
      p.push("v=" + 0.2);
      p.push("h=" + a.config.flickr.host_ip);
      p.push("s=" + a.config.flickr.rapidconf.spaceid);
      p.push("p=" + (a.UA.iphone || a.UA.ipod || (a.UA.android && a.UA.mobile) ? "mobile" : "desktop"));
      p.push("ba=" + s("BA", "ba"));
      p.push("li=" + (a.config.flickr.user.nsid ? 1 : 0));
      p.push("u=" + encodeURIComponent(a.config.flickr.site_root));
      for (r in o) {
        if (o.hasOwnProperty(r)) {
          m = o[r];
          p.push(encodeURIComponent(r) + "=" + (m === null || m === undefined ? "" : encodeURIComponent(m)))
        }
      }
      k = k + p.join("&");
      l = new Image();
      l.src = k;
      document.body.appendChild(l)
    }
  }

  function e(k) {
  }

  h.beaconExtra = function (l, n) {
    if (typeof page_timing == "undefined") {
      return
    }
    if (n.getTime) {
      n = n.getTime()
    }
    if (page_timing[l]) {
      return
    }
    if (page_timing && page_timing.page_start) {
      if (b) {
        var k = "/beacon_page_timings.gne";
        var m = {
          timing_pageid: (typeof f.page_id !== "undefined" ? f.page_id : "undefined"),
          page_start: page_timing.page_start
        };
        m[l] = n;
        page_timing[l] = n;
        a.io(k, {data: m, method: "GET", timeout: 10000})
      } else {
        page_timing[l] = n
      }
    }
  };
  a.flickrPageTiming = h
}, "0.0.1", {requires: ["node", "event", "io"]});