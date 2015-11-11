/*! scripts/application.js */
var video_thumbnail_hover = false;
function load_typekit() {
  if (typeof Typekit != "undefined") {
    return
  }
  TypekitConfig = {kitId: "dzi2tiv"};
  (function () {
    var a = document.createElement("script");
    a.src = "//use.typekit.com/" + TypekitConfig.kitId + ".js";
    a.type = "text/javascript";
    a.async = "true";
    a.onload = a.onreadystatechange = function () {
      var c = this.readyState;
      if (c && c != "complete" && c != "loaded") {
        return
      }
      try {
        Typekit.load(TypekitConfig)
      } catch (d) {
      }
    };
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
  })()
}
function select_field(a) {
  if (a.createTextRange) {
    var b = a.createTextRange();
    b.moveStart("character", 0);
    b.moveEnd("character", a.value.length);
    b.select()
  } else {
    if (a.setSelectionRange) {
      a.setSelectionRange(0, a.value.length)
    }
  }
}
function get_cookie(d) {
  var b = document.cookie;
  var g, f = b.split(";");
  var e, a = f.length;
  for (e = 0; e < a; e += 1) {
    if ((g = f[e].replace(/^\s+|\s+$/g, "").split("="))[0] == d) {
      return {name: g[0], value: g[1]}
    }
  }
  return false
}
function set_cookie(a, f, h, c) {
  c = c || {};
  var b = new Date();
  var g = (typeof(c.path) !== "undefined") ? c.path : "/";
  var e = (typeof(c.is_secure) !== "undefined") ? true : false;
  var d = (typeof(c.domain) !== "undefined") ? c.domain : "";
  b.setDate(b.getDate() + h);
  document.cookie = a + "=" + escape(f) + ((h == null) ? "" : ";expires=" + b.toGMTString()) + ";path=" + g + ((e === false) ? "" : ";secure") + ((d === "") ? "" : ";domain=" + d)
}
function unset_cookie(a) {
  set_cookie(a, "", -1)
}
var trackable_follow = function (c, g, f, b, a, d, e) {
  b = b || function () {
    };
  a = a || function () {
    };
  d = d || function () {
    };
  e = e || function () {
    };
  Tumblr.follow({tumblelog: f}, {init: b, success: a, error: d, complete: e})
};
function toggle_video_embed(a) {
  var b = jQuery;
  if (!b("#watch_video_" + a).is(":visible")) {
    b("#video_embed_" + a).html(b("#video_code_" + a).val());
    b("#video_toggle_" + a).hide();
    b("#watch_video_" + a).show();
    Tumblr.Events.trigger("Capture:push", "embed_interaction", "click");
    if (typeof _gaq !== "undefined" && _gaq) {
      _gaq.push(["_trackEvent", "dashboard_video", "click", "normal"])
    }
  } else {
    b("#video_embed_" + a).html("");
    b("#video_toggle_" + a).show();
    b("#watch_video_" + a).hide();
    Tumblr.Events.trigger("Capture:push", "embed_interaction", "hide");
    if (typeof _gaq !== "undefined" && _gaq) {
      _gaq.push(["_trackEvent", "dashboard_video", "hide", "normal"])
    }
  }
};
/*! scripts/tumblr/utils/prefixer.js */
Tumblr.Utils || (Tumblr.Utils = {});
(function (e) {
  var d = (function () {
    var g = document.documentElement.style;
    var h = [];
    for (var i in g) {
      if (typeof g[i] === "string") {
        h.push(i)
      }
    }
    return h.join(" ")
  })();
  var b = function (g) {
    return new RegExp("\\b((webkit|moz|ms|o|)" + g.toLowerCase() + ")\\b", "i")
  };
  var a = {};

  function f(h) {
    if (a[h] === void 0) {
      if (b(h).test(d)) {
        var g = RegExp.$1;
        a[h] = {js: g, css: (g[0] + g.slice(1).replace(/[A-Z]/g, "-$&")).toLowerCase()}
      } else {
        a[h] = false
      }
    }
    return a[h]
  }

  f.style = function c(j, i, l) {
    var h, g;
    if (l) {
      h = {};
      h[i] = l
    } else {
      h = i
    }
    if (j.jquery) {
      j = j[0]
    }
    for (var k in h) {
      g = h[k];
      j.style[f(k).js] = g
    }
    return j
  };
  e.prefixer = f
})(Tumblr.Utils);
/*! scripts/polyfills/function.bind.polyfill.js */
if (!Function.prototype.bind) {
  Function.prototype.bind = function (a) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
    }
    var e = Array.prototype.slice.call(arguments, 1), d = this, b = function () {
    }, c = function () {
      return d.apply(this instanceof b && a ? this : a, e.concat(Array.prototype.slice.call(arguments)))
    };
    b.prototype = this.prototype;
    c.prototype = new b();
    return c
  }
}
;
/*! scripts/tumblelog/styler.js */
(function (a) {
  function c(f, k, l) {
    if (Array.prototype.indexOf) {
      return f.indexOf(k, l)
    }
    for (var h = (l || 0), g = f.length; h < g; h++) {
      if (f[h] === k) {
        return h
      }
    }
    return -1
  }

  function b(g, f) {
    var i = [];
    if (!g) {
      return i
    }
    for (var h in g) {
      if (g.hasOwnProperty(h)) {
        i.push(h)
      }
    }
    if (f && f.length) {
      return i.sort(function (k, j) {
        return c(f, k) - c(f, j)
      })
    }
    return i
  }

  function e() {
    var f = function () {
      return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
    };
    return (f() + f() + "-" + f() + "-" + f() + "-" + f() + "-" + f() + f() + f())
  }

  var d = function (f) {
    if (!(this instanceof d)) {
      return new d(f)
    }
    if (!f) {
      f = {}
    }
    if (typeof f === "string") {
      f = {id: f}
    }
    this.el = d.create_stylesheet(f.id || e());
    if (f.media_query) {
      this.set_media_query(f.media_query)
    }
    this.selectors = {};
    this.selectors_order = [];
    this.animations = {};
    if (f.styles) {
      this.import_styles(f.styles)
    }
    if (f.animations) {
      this.import_animations(f.animations)
    }
    this.attach();
    d.register(this);
    return this
  };
  d.prototype = {
    add_px: function (f) {
      if (typeof f === "string" && f.match(/\D/)) {
        return f
      }
      return f + "px"
    }, add_px_value: function (g, f) {
      switch (g) {
        case"top":
        case"right":
        case"bottom":
        case"left":
        case"width":
        case"height":
          return this.add_px(f);
        default:
          return f
      }
    }, import_styles: function (g) {
      for (var f in g) {
        this.set(f, g[f])
      }
    }, import_animations: function (g) {
      for (var f in g) {
        this.set_animation(f, g[f])
      }
    }, set_media_query: function (f) {
      this.el.media = f || ""
    }, set: function (f, i, h, j) {
      if (typeof this.selectors[f] === "undefined") {
        this.selectors[f] = {properties: {}, properties_order: []};
        this.selectors_order.push(f)
      }
      f = this.selectors[f];
      if (typeof i === "object") {
        var g = i;
        j = h;
        for (i in g) {
          if (typeof f.properties[i] === "undefined") {
            f.properties_order.push(i)
          }
          h = g[i];
          f.properties[i] = this.add_px_value(i, h)
        }
      } else {
        if (typeof f.properties[i] === "undefined") {
          f.properties_order.push(i)
        }
        f.properties[i] = this.add_px_value(i, h)
      }
      if (typeof j === "undefined") {
        j = true
      }
      if (j) {
        this.update()
      }
    }, get: function (f, g) {
      f = this.selectors[f];
      if (typeof f === "undefined") {
        return false
      }
      if (!g) {
        return f
      }
      g = f.properties[g];
      if (typeof g === "undefined") {
        return false
      }
      return g
    }, has: function (f, g) {
      f = this.selectors[f];
      if (typeof f === "undefined") {
        return false
      }
      if (!g) {
        return true
      }
      g = f[g];
      if (typeof g === "undefined") {
        return false
      }
      return (typeof g !== "undefined") && g !== ""
    }, set_selectors_order: function (f) {
      this.selectors_order = b(this.selectors, f);
      this.update();
      return true
    }, set_properties_order: function (f, g) {
      if (!f) {
        for (f in this.selectors) {
          if (!this.selectors.hasOwnProperty(f)) {
            continue
          }
          f = this.selectors[f];
          f.properties_order = b(f.properties, g || d.default_properties_order)
        }
        this.update();
        return true
      }
      f = this.get(f);
      if (!f) {
        return false
      }
      f.properties_order = b(f.properties, g || d.default_properties_order);
      this.update();
      return true
    }, set_animation: function (j, g, i, h, m) {
      if (typeof this.animations[j] === "undefined") {
        this.animations[j] = {}
      }
      if (typeof g === "object") {
        var k = g;
        for (g in k) {
          this.set_animation(j, g, k[g], false)
        }
        m = i;
        if (typeof m === "undefined") {
          m = true
        }
        if (m) {
          this.update()
        }
        return
      }
      var l = this.animations[j];
      if (typeof l[g] === "undefined") {
        l[g] = {}
      }
      g = l[g];
      if (typeof i === "object") {
        var f = i;
        m = h;
        for (i in f) {
          h = f[i];
          g[i] = this.add_px_value(i, h)
        }
      } else {
        g[i] = this.add_px_value(i, h)
      }
      if (typeof m === "undefined") {
        m = true
      }
      if (m) {
        this.update()
      }
    }, get_animation: function (h, f, g) {
      h = this.animations[h];
      if (typeof h === "undefined") {
        return false
      }
      if (!f) {
        return h
      }
      f = h[f];
      if (typeof f === "undefined") {
        return false
      }
      if (!g) {
        return f
      }
      g = f[g];
      if (typeof f === "undefined") {
        return false
      }
      return f
    }, attach: function () {
      var f = document.getElementsByTagName("head")[0];
      if (!f) {
        return false
      }
      this.update();
      f.appendChild(this.el);
      return true
    }, detach: function () {
      var f = document.getElementsByTagName("head")[0];
      if (!f) {
        return false
      }
      if (this.el.parentNode !== f) {
        return false
      }
      this.el.parentNode.removeChild(this.el);
      return true
    }, update: function () {
      var f = this.css_text();
      if (this.el.styleSheet) {
        this.el.styleSheet.cssText = "\n" + f
      } else {
        while (this.el.hasChildNodes()) {
          this.el.removeChild(this.el.lastChild)
        }
        this.el.appendChild(document.createTextNode("\n" + f))
      }
    }, selectors_to_text: function (j, g) {
      g || (g = b(j));
      var f;
      var k = "";
      for (var h = 0; h < g.length; h++) {
        f = g[h];
        if (!(j.hasOwnProperty(f) && j[f])) {
          continue
        }
        k += f + " {\n";
        k += this.properties_to_text(j[f].properties, j[f].properties_order);
        k += "}\n"
      }
      return k
    }, properties_to_text: function (h, f, k) {
      f || (f = b(h));
      var l = "";
      var j;
      for (var g = 0; g < f.length; g++) {
        j = f[g];
        if (!(h.hasOwnProperty(j) && h[j] !== "")) {
          continue
        }
        l += j + ": " + h[j] + ";\n"
      }
      return l
    }, animations_to_text: function (n, f) {
      f || (f = b(n));
      var k = d.browser_prefixes.slice();
      k.push("");
      var j;
      var h;
      var m = "";
      for (var g = 0; g < f.length; g++) {
        h = f[g];
        if (!(n.hasOwnProperty(h) && n[h])) {
          continue
        }
        for (var l = 0; l < k.length; l++) {
          j = k[l];
          m += "@" + (j ? "-" + j + "-" : "") + "keyframes " + h + " {\n";
          m += this.keyframes_to_text(n[h], j);
          m += "}\n"
        }
      }
      return m
    }, keyframes_to_text: function (l, j) {
      var f = b(l);
      var h;
      var k = "";
      for (var g = 0; g < f.length; g++) {
        h = f[g];
        if (!(l.hasOwnProperty(h) && l[h])) {
          continue
        }
        k += h + " {\n";
        k += this.properties_to_text(l[h], false, j);
        k += "}\n"
      }
      return k
    }, css_text: function () {
      var f = this.selectors_to_text(this.selectors, this.selectors_order).replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var g = this.animations_to_text(this.animations).replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return f + g
    }, toString: function () {
      return this.css_text()
    }
  };
  d.instances = [];
  d.browser_prefixes = ["webkit", "moz", "ms", "o"];
  d.default_properties_order = ["font", "font-family", "font-size", "font-style", "font-variant", "font-weight", "@font-face", "font-size-adjust", "font-stretch", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "border", "border-top", "border-top-color", "border-top-style", "border-top-width", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-bottom", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius", "background", "background-color", "background-position", "background-size", "background-repeat", "background-origin", "background-clip", "background-attachment", "background-image", "overflow", "overflow-x", "overflow-y", "transition", "transition-property", "transition-duration", "transition-timing-function", "transition-delay", "transform", "transform-origin", "transform-style"];
  d.create_stylesheet = function (g) {
    var f = document.createElement("style");
    f.type = "text/css";
    if (g) {
      f.id = g
    }
    return f
  };
  d.register = function (f) {
    this.instances.push(f)
  };
  a.Styler = d
})(this.Tumblr || (this.Tumblr = {}));
/*! scripts/tumblelog/follow_teaser.js */
("Tumblr" in window) || (window.Tumblr = {});
Tumblr.FollowTeaser = (function () {
  var h = false, o = false, n = false, a = false, l = {}, c = 310, p = 110, i = false, b = new Tumblr.Styler({
    id: "tumblr_teaser_follow_css",
    styles: {
      "#tumblr_teaser_follow": {
        display: "block",
        opacity: "1",
        visibility: "hidden",
        position: "fixed",
        bottom: "0",
        right: "0",
        width: "1px",
        height: "1px",
        "z-index": "2147483647"
      }, "#tumblr_teaser_follow.open": {visibility: "visible", width: c + "px", height: p + "px"}
    }
  });

  function q(w, t) {
    var x = [];
    for (var u in w) {
      var s = t ? t + "[" + u + "]" : u, r = w[u];
      x.push(typeof r == "object" ? q(r, s) : encodeURIComponent(s) + "=" + encodeURIComponent(r))
    }
    return x.join("&")
  }

  var g = 0;
  var e = 9000;
  var d = 200;
  var f = false;

  function j() {
    if (f) {
      return
    }
    var s = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
    if ((s > e || (Tumblr.FollowTeaser.current_page >= 2 && s > 500)) && Tumblr.FollowTeaser.can_show()) {
      Tumblr.FollowTeaser.scroll_listener(false);
      return
    }
    if (Tumblr.FollowTeaser.infer_infinite_scroll) {
      var r = document.body.clientHeight;
      if (r > g + 100) {
        Tumblr.FollowTeaser.current_page++;
        g = r
      }
    }
    f = true;
    setTimeout(function () {
      f = false
    }, d)
  }

  var m;

  function k() {
    if (f) {
      return
    }
    clearTimeout(m);
    m = setTimeout(j, 300);
    f = true;
    setTimeout(function () {
      f = false
    }, d)
  }

  return {
    infer_infinite_scroll: false, current_page: 1, can_show: function () {
      n = true;
      var r = this.open(c, p);
      if (h) {
        h.contentWindow.postMessage("follow_teaser;show", "*")
      }
      return r
    }, create_from_tumblr_controls: function (r) {
      if (!(o = document.getElementById("tumblr_controls"))) {
        return false
      }
      if (!(url_matches = o.src.match(/([^\?#]+\/)([^\/\?\#]\.html)?(\?_v=[^\&#]+)?([^#]*)(.*)?/i))) {
        return false
      }
      this.initialize({url: (r || (url_matches[1] + "follow.html")) + url_matches[4] + url_matches[5]})
    }, create_iframe: function (r) {
      var s = document.createElement("iframe");
      s.id = "tumblr_teaser_follow";
      s.width = 1;
      s.height = 1;
      s.frameBorder = 0;
      s.scrolling = "no";
      s.src = r;
      document.body.appendChild(s);
      return s
    }, scroll_listener: function (r) {
      if (r) {
        if (window.addEventListener) {
          window.addEventListener("scroll", k)
        } else {
          if (window.attachEvent) {
            window.attachEvent("onscroll", k)
          }
        }
      } else {
        if (window.removeEventListener) {
          window.removeEventListener("scroll", k)
        } else {
          if (window.detachEvent) {
            window.detachEvent("onscroll", k)
          }
        }
      }
    }, initialize: function (t) {
      if (!Tumblr.PostMessageListener) {
        return false
      }
      if (!t) {
        t = {}
      }
      g = document.body.clientHeight;
      e = Math.min(e, 3 * Tumblr.windowDimensions().height);
      var r = this;
      Tumblr.PostMessageListener.initialize(function (x, w) {
        r.post_message_event(x, w)
      });
      h = document.getElementById("tumblr_teaser_tagged");
      o = document.getElementById("tumblr_controls");
      if (!h) {
        var u = t.query || {};
        var s = t.url || "http://www.tumblr.com/assets/html/follow.html";
        var v = (s.indexOf("#") < 0 ? "#" : "&") + q(u);
        h = this.create_iframe(s + v)
      }
    }, post_message_event: function (s, r) {
      if (!s || s.length < 2 || s[0] !== "follow_iframe") {
        return false
      }
      switch (s[1]) {
        case"resize":
          if (s.length > 3) {
            c = s[2];
            p = s[3];
            b.set("#tumblr_teaser_follow.open", {width: c + "px", height: p + "px"})
          }
          a = true;
          this.open(c, p);
          break;
        case"dismiss":
          this.close();
          break
      }
      function t(u, v) {
        if (!(typeof u === "string" && u.match(/\d+%/))) {
          u = parseInt(u, 10) || 0
        }
        if (!(typeof v === "string" && v.match(/\d+%/))) {
          v = parseInt(v, 10) || 0
        }
        if (u) {
          tumblelog_iframe.width = u
        }
        if (v) {
          tumblelog_iframe.height = v
        }
      }
    }, open: function (s, r) {
      if (!h) {
        return false
      }
      if (!(n && a)) {
        return false
      }
      if (i) {
        return false
      }
      i = true;
      Tumblr.addClass(h, "open");
      o.style.display = "none";
      return true
    }, close: function () {
      if (!h) {
        return
      }
      if (!i) {
        return
      }
      i = false;
      n = false;
      Tumblr.removeClass(h, "open");
      o.style.display = "block"
    }, toggle: function () {
      if (!h) {
        return
      }
      if (i) {
        return this.close()
      } else {
        this.open()
      }
    }
  }
})();
/*! scripts/tumblelog/teaser.js */
("Tumblr" in window) || (window.Tumblr = {});
Tumblr.Teaser = (function () {
  var a = false, e = false, b = false, f = {hide: false, sneeze: false}, c = false, d = 360;
  return {
    is_enabled: function () {
      return !!e
    }, initialize: function (h) {
      e = document.getElementById("teaser_iframe");
      if (!e) {
        return false
      }
      a = e.parentNode;
      if (!h) {
        h = {}
      }
      if (h.slide_page) {
        c = h.slide_page
      }
      if (h.width) {
        d = h.width
      }
      this.prepare(false);
      var g = this;
      if ("addEventListener" in a) {
        a.addEventListener("mouseout", function (i) {
          if (!(i.relatedTarget || i.toElement)) {
            g.close()
          }
        })
      }
    }, prepare: function (i) {
      if (!e) {
        return
      }
      var g = 0.25;
      var j = 0.3;
      a.style.display = "block";
      a.style.opacity = "0";
      a.style.visibility = "hidden";
      a.style.position = "fixed";
      a.style.top = "0";
      a.style.right = "0";
      a.style.bottom = "0";
      a.style.width = "1px";
      a.style.height = "100%";
      a.style.zIndex = "2147483646";
      a.style.overflow = "hidden";
      try {
        a.style.backgroundColor = "rgba(0,0,0, 0.6)"
      } catch (h) {
      }
      a.style.webkitTransition = "width " + g + "s ease-in-out";
      a.style.MozTransition = "width " + g + "s ease-in-out";
      a.style.msTransition = "width " + g + "s ease-in-out";
      a.style.OTransition = "width " + g + "s ease-in-out";
      a.style.transition = "width " + g + "s ease-in-out";
      e.style.display = "block";
      e.style.opacity = "1";
      e.style.visibility = "visible";
      e.style.position = "absolute";
      e.style.top = "0";
      e.style.right = "0";
      e.style.minWidth = "100%";
      e.style.width = d + "px";
      e.style.height = "100%";
      if (c && document.body.parentNode) {
        document.body.parentNode.style.position = "relative";
        document.body.parentNode.style.webkitTransition = "right " + g + "s ease-in-out";
        document.body.parentNode.style.MozTransition = "right " + g + "s ease-in-out";
        document.body.parentNode.style.msTransition = "right " + g + "s ease-in-out";
        document.body.parentNode.style.OTransition = "right " + g + "s ease-in-out";
        document.body.parentNode.style.transition = "right " + g + "s ease-in-out";
        document.body.parentNode.style.right = "0"
      }
    }, refresh: function () {
      if (!e) {
        return
      }
      e.contentWindow.postMessage("teaser;refresh", "*")
    }, reset_timers: function () {
      clearTimeout(f.hide);
      f.hide = false;
      clearTimeout(f.sneeze);
      f.sneeze = false
    }, reset: function () {
      if (!e) {
        return
      }
      this.reset_timers();
      a.style.opacity = "0";
      this.refresh()
    }, open: function () {
      if (!e) {
        return
      }
      if (b) {
        return
      }
      b = true;
      a.style.opacity = "1";
      a.style.visibility = "visible";
      a.style.width = d + "px";
      if (c && document.body.parentNode) {
        document.body.parentNode.style.right = d + "px"
      }
      e.contentWindow.postMessage("teaser;show", "*");
      this.reset_timers();
      clearTimeout(f.sneeze);
      f.sneeze = setTimeout(function () {
        f.sneeze = false
      }, 100)
    }, close: function () {
      if (!e) {
        return
      }
      if (!b || f.sneeze) {
        return
      }
      b = false;
      a.style.opacity = "1";
      a.style.visibility = "visible";
      a.style.width = "1px";
      if (c && document.body.parentNode) {
        document.body.parentNode.style.right = "0"
      }
      e.contentWindow.postMessage("teaser;hide", "*");
      this.reset_timers();
      var g = this;
      f.hide = setTimeout(function () {
        g.reset()
      }, 300)
    }, toggle: function () {
      if (!e) {
        return
      }
      if (b) {
        return this.close()
      } else {
        this.open()
      }
    }
  }
})();
/*! scripts/tumblelog/legacy_tumblelog_video.js */
("Tumblr" in window) || (window.Tumblr = {});
Tumblr.flashVersion = function () {
  if (navigator.plugins && navigator.plugins.length > 0) {
    var a = navigator.mimeTypes;
    if (a && a["application/x-shockwave-flash"] && a["application/x-shockwave-flash"].enabledPlugin && a["application/x-shockwave-flash"].enabledPlugin.description) {
      return parseInt(a["application/x-shockwave-flash"].enabledPlugin.description.split(" ")[2].split(".")[0], 10)
    }
  } else {
    if (navigator.appVersion.indexOf("Mac") === -1 && window.execScript) {
      try {
        var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        var b = c.GetVariable("$version");
        return b.split(",")[0].split(" ")[1]
      } catch (d) {
      }
      return 0
    }
  }
};
Tumblr.replaceIfFlash = function (b, a, c) {
  if (Tumblr.flashVersion() >= b) {
    document.getElementById(a).innerHTML = c
  }
};
function flashVersion() {
  return Tumblr.flashVersion()
}
function replaceIfFlash(b, a, c) {
  Tumblr.replaceIfFlash(b, a, c)
};
/*! scripts/tumblelog/utilities.js */
("Tumblr" in window) || (window.Tumblr = {});
Tumblr.hasClass = function (b, a) {
  return new RegExp("(\\s|^)" + a + "(\\s|$)").test(b.className)
};
Tumblr.addClass = function (b, a) {
  if (!Tumblr.hasClass(b, a)) {
    b.className += " " + a
  }
};
Tumblr.removeClass = function (c, a) {
  if (Tumblr.hasClass(c, a)) {
    var b = new RegExp("(\\s|^)" + a + "(\\s|$)");
    c.className = c.className.replace(b, " ")
  }
};
Tumblr.toggleClass = function (b, a) {
  if (Tumblr.hasClass(b, a)) {
    Tumblr.removeClass(b, a)
  } else {
    Tumblr.addClass(b, a)
  }
};
/*! scripts/tumblelog/lightbox.js */
("Tumblr" in window) || (window.Tumblr = {});
Tumblr.windowDimensions = function () {
  if (window.innerWidth !== undefined) {
    return {width: window.innerWidth, height: window.innerHeight}
  } else {
    if (document.documentElement) {
      return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight}
    } else {
      return {width: document.body.clientWidth, height: document.body.clientHeight}
    }
  }
};
Tumblr.Lightbox = (function () {
  var g = false;
  var i = false;
  var o = false;
  var d = [];
  var j = false;
  var h = false;
  var p = false;
  var f = false;
  var c = {left: false, center: false, right: false};
  if (Tumblr.Events) {
    Tumblr.Events.on("lightbox-open-request", n)
  }
  function e() {
    if (window.innerWidth !== undefined) {
      return {width: window.innerWidth, height: window.innerHeight}
    } else {
      if (document.documentElement) {
        return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight}
      } else {
        return {width: document.body.clientWidth, height: document.body.clientHeight}
      }
    }
  }

  function n(s, v) {
    if (document.getElementById("tumblr_lightbox")) {
      return
    }
    if (!v) {
      v = 1
    }
    d = s;
    if (navigator && navigator.userAgent.indexOf("Firefox") != -1) {
      var z = document.createElement("input");
      z.setAttribute("id", "Tumblr_Lightbox_focus_input");
      z.setAttribute("type", "text");
      z.style.position = "fixed";
      z.style.top = 0;
      z.style.left = 0;
      document.body.appendChild(z);
      z.focus();
      document.body.removeChild(z)
    } else {
      window.focus()
    }
    if (!g) {
      if (window.onkeydown) {
        i = window.onkeydown
      }
      window.onkeydown = function (C) {
        if (document.getElementById("tumblr_lightbox")) {
          if (!C) {
            C = window.event
          }
          var B = C.charCode ? C.charCode : C.keyCode;
          if (!C.shiftKey && !C.ctrlKey && !C.altKey && !C.metaKey) {
            if (B == 37) {
              if (h > 1) {
                l(h - 1)
              }
            } else {
              if (B == 39) {
                if (h < d.length) {
                  l(h + 1)
                }
              } else {
                if (B == 27 || B == 32 || B == 74 || B == 75) {
                  m()
                }
              }
            }
          } else {
            if ((C.ctrlKey || C.metaKey) && B == 87) {
              m();
              return false
            }
          }
        }
        if (i) {
          i()
        }
      };
      if (window.onresize) {
        o = window.onresize
      }
      window.onresize = function () {
        if (document.getElementById("vignette")) {
          document.getElementById("vignette").style.display = "none";
          if (f) {
            clearTimeout(f)
          }
          f = setTimeout(function () {
            document.getElementById("vignette").style.display = "inline-block"
          }, 100)
        }
        k();
        if (o) {
          o()
        }
      };
      if (navigator && navigator.userAgent.search("iPad") != -1) {
        document.addEventListener("touchmove", function () {
          m()
        }, false)
      }
      g = true
    }
    document.body.style.overflow = "hidden";
    var q = document.createElement("div");
    q.setAttribute("id", "tumblr_lightbox");
    if (navigator && navigator.userAgent.search("iPad") != -1) {
      q.style.position = "absolute";
      q.style.top = document.body.scrollTop + "px";
      q.style.height = window.innerHeight + "px"
    } else {
      q.style.position = "fixed";
      q.style.top = "0px";
      q.style.bottom = "0px"
    }
    q.style.left = "0px";
    q.style.right = "0px";
    q.style.zIndex = 4294967294;
    q.style.overflow = "hidden";
    q.style.backgroundColor = (navigator && navigator.userAgent.indexOf("MSIE") != -1) ? "#222" : "rgba(17,17,17,0.92)";
    q.onclick = function () {
      if (j) {
        j = false
      } else {
        m()
      }
    };
    if (!(navigator && navigator.userAgent.search("iPad") != -1) && !(navigator && navigator.userAgent.search("MSIE") != -1)) {
      var y = document.createElement("img");
      y.setAttribute("id", "vignette");
      y.setAttribute("src", "//assets.tumblr.com/images/full_page_vignette.png");
      y.style.position = "absolute";
      y.style.width = "100%";
      y.style.height = "100%";
      y.style.left = "0px";
      y.style.top = "0px";
      q.appendChild(y);
      var x = document.createElement("div");
      x.style.position = "absolute";
      x.style.width = "100%";
      x.style.height = "100%";
      x.style.left = "0px";
      x.style.top = "0px";
      q.appendChild(x)
    }
    var t = document.createElement("div");
    t.style.position = "absolute";
    t.style.left = "50%";
    t.style.top = "50%";
    if (!document.getElementById("tumblr_form_key")) {
      t.style.width = "100%"
    }
    q.appendChild(t);
    var r = ["left", "center", "right"];
    while (stage_name = r.pop()) {
      var w = document.createElement("a");
      w.setAttribute("id", "tumblr_lightbox_" + stage_name + "_link");
      w.setAttribute("href", "#");
      if (d.length < 2) {
        w.style.cursor = "default"
      }
      t.appendChild(w);
      var u = document.createElement("img");
      u.setAttribute("id", "tumblr_lightbox_" + stage_name + "_image");
      u.setAttribute("src", "//assets.tumblr.com/images/x.gif");
      u.style.mozBorderRadius = "3px";
      u.style.webkitBorderRadius = "3px";
      u.style.borderRadius = "3px";
      if (navigator && navigator.userAgent.indexOf("Chrome") != -1) {
        u.style.moxBoxShadow = "0 4px 30px rgba(0,0,0,1)";
        u.style.webkitBoxShadow = "0 4px 30px rgba(0,0,0,1)";
        u.style.boxShadow = "0 4px 30px rgba(0,0,0,1)"
      }
      u.style.borderWidth = "0px";
      u.style.position = "absolute";
      if (stage_name == "center") {
        u.style.zIndex = 4294967295
      }
      w.appendChild(u)
    }
    var A = document.createElement("div");
    A.setAttribute("id", "tumblr_lightbox_caption");
    A.style.position = "absolute";
    A.style.textAlign = "center";
    A.style.font = "bold 17px 'HelveticaNeue','Helvetica','Arial',sans-serif";
    A.style.color = "#fff";
    A.style.paddingTop = "20px";
    A.style.textShadow = "0 4px 30px rgba(0,0,0,1)";
    A.style.display = "inline-block";
    A.style.textRendering = "optimizeLegibility";
    t.appendChild(A);
    document.body.appendChild(q);
    l(v);
    k()
  }

  function m() {
    document.body.style.overflow = "";
    document.getElementById("tumblr_lightbox").style.display = "none";
    document.body.removeChild(document.getElementById("tumblr_lightbox"));
    if (Tumblr && Tumblr.Events) {
      Tumblr.Events.trigger("tumblr_lightbox:form:hide")
    }
  }

  function l(r) {
    h = r;
    p = Math.round(Math.random() * 1000000000000);
    document.getElementById("tumblr_lightbox_left_link").onclick = function () {
      j = true;
      l(r - 1);
      return false
    };
    if (d.length == 1) {
      document.getElementById("tumblr_lightbox_center_link").onclick = function () {
        return false
      }
    } else {
      if (r < d.length) {
        document.getElementById("tumblr_lightbox_center_link").onclick = function () {
          j = true;
          l(r + 1);
          return false
        }
      } else {
        document.getElementById("tumblr_lightbox_center_link").onclick = function () {
          j = true;
          l(1);
          return false
        }
      }
    }
    document.getElementById("tumblr_lightbox_right_link").onclick = document.getElementById("tumblr_lightbox_center_link").onclick;
    c.left = false;
    c.center = false;
    c.right = false;
    b("center", r - 1);
    if (r > 1) {
      b("left", r - 2)
    }
    if (r < d.length) {
      b("right", r)
    }
    if (r + 1 < d.length) {
      var q = new Image();
      q.src = d[r + 1].low_res
    }
  }

  function b(r, t) {
    var q = new Image();
    var s = false;
    q.className = p;
    q.onload = function () {
      if (this.className == p) {
        this.className = "high-res";
        c[r] = this;
        k()
      }
    };
    q.src = d[t].high_res;
    if (!q.complete) {
      s = new Image();
      s.className = p;
      s.onload = function () {
        if (this.className == p && (!c[r] || c[r].className == "placeholder")) {
          this.className = "low-res";
          c[r] = this;
          k()
        }
      };
      s.src = d[t].low_res;
      if (d[t].width && d[t].height) {
        if (s) {
          s.style.maxWidth = d[t].width + "px";
          s.style.maxHeight = d[t].height + "px"
        }
        q.style.maxWidth = d[t].width + "px";
        q.style.maxHeight = d[t].height + "px"
      }
      if (!s.complete && (d[t].width && d[t].height)) {
        c[r] = new Image(d[t].width, d[t].height);
        c[r].style.maxWidth = d[t].width + "px";
        c[r].style.maxHeight = d[t].height + "px";
        c[r].src = "//assets.tumblr.com/images/x.gif";
        c[r].className = "placeholder"
      }
    }
  }

  function k() {
    var v = ["right", "left", "center"];
    while (stage_name = v.pop()) {
      var s = document.getElementById("tumblr_lightbox_" + stage_name + "_image");
      if (!s) {
        continue
      }
      var t = c[stage_name];
      if (!t) {
        s.style.display = "none";
        continue
      } else {
        s.style.display = "inline-block"
      }
      var r = t.style.maxWidth ? parseInt(t.style.maxWidth, 10) : t.width;
      var q = t.style.maxHeight ? parseInt(t.style.maxHeight, 10) : t.height;
      if (e().width / e().height < r / q) {
        var u = (d.length == 1) ? 0.85 : 0.75;
        if (e().width * u > r && (t.className == "high-res" || t.style.maxWidth)) {
          s.style.width = r + "px";
          s.style.height = q + "px"
        } else {
          s.style.height = (q * ((e().width * u) / r)) + "px";
          s.style.width = (e().width * u) + "px"
        }
      } else {
        if (e().height * 0.85 > q && (t.className == "high-res" || t.style.maxHeight)) {
          s.style.width = r + "px";
          s.style.height = q + "px"
        } else {
          s.style.width = (r * ((e().height * 0.85) / q)) + "px";
          s.style.height = (e().height * 0.85) + "px"
        }
      }
      if (stage_name == "center") {
        s.style.left = (0 - parseInt(s.style.width, 10) / 2) + "px";
        s.style.top = (0 - parseInt(s.style.height, 10) / 2) + "px"
      } else {
        if (stage_name == "right") {
          s.style.left = (e().width * 0.42) + "px";
          s.style.top = (0 - parseInt(s.style.height, 10) / 2) + "px"
        } else {
          s.style.left = (0 - parseInt(s.style.width, 10) - e().width * 0.42) + "px";
          s.style.top = (0 - parseInt(s.style.height, 10) / 2) + "px"
        }
      }
      s.src = t.src;
      s.style.backgroundColor = (t.className == "placeholder") ? ((navigator && navigator.userAgent.indexOf("MSIE") != -1) ? "#444" : "rgba(255,255,255,0.05)") : "transparent";
      if (stage_name == "center" && d[h - 1].caption) {
        document.getElementById("tumblr_lightbox_caption").innerHTML = d[h - 1].caption;
        document.getElementById("tumblr_lightbox_caption").style.width = (e().width * 0.7) + "px";
        document.getElementById("tumblr_lightbox_caption").style.top = (parseInt(s.style.height, 10) * 0.5) + "px";
        document.getElementById("tumblr_lightbox_caption").style.left = (0 - e().width * 0.35) + "px";
        document.getElementById("tumblr_lightbox_caption").style.display = "block"
      } else {
        if (stage_name == "center") {
          document.getElementById("tumblr_lightbox_caption").style.display = "none"
        }
      }
    }
  }

  function a() {
    return !!document.getElementById("tumblr_lightbox")
  }

  return {init: n, isOpen: a}
})();
/*! scripts/tumblelog/iframe_preloader.js */
Tumblr.IframePreloader = function (a) {
  for (var b in a) {
    if (typeof b == "object") {
      for (var c in b) {
        this.options[b][c] = b[c]
      }
    } else {
      this.options[b] = a[b]
    }
  }
  this.__create()
};
Tumblr.IframePreloader.prototype = {
  options: {
    iframe_src: "",
    iframe_before_onload: function () {
    },
    iframe_after_onload: function () {
    },
    iframe_class: "",
    iframe_styles: {
      zIndex: 8675309,
      position: "fixed",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      width: "100%",
      height: "100%",
      background: "transparent",
      border: "0px",
      overflow: "hidden"
    },
    preloader_class: "",
    preloader_innerHTML: '<div style="position:absolute; top:0; left:0; right:0; bottom:0; background:transparent center no-repeat url(\'/images/loading_big_fff_on_2e3133.gif?709\')"><img style="position:absolute; left:0; top:0; width:100%; height:100%; opacity:0.3;" src="//assets.tumblr.com/images/full_page_vignette.png?709"/></div>',
    preloader_styles: {
      zIndex: 8675310,
      position: "fixed",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: "rgba(17,17,17,0.92)"
    },
    close_class: "",
    close_innerHTML: "&times;",
    close_styles: {
      zIndex: 8675311,
      position: "fixed",
      top: "10px",
      right: "15px",
      cursor: "pointer",
      font: "bold 20px Helvetica, sans-serif"
    }
  }, iframe_loaded: false, __create: function () {
    this.id = Math.random().toString().split(".")[1];
    this.$container = document.createElement("div");
    this.$preloader = document.createElement("div");
    this.$preloader.id = "iframe_preloader-preloader-" + this.id;
    this.$preloader.className = this.options.preloader_class;
    for (var d in this.options.preloader_styles) {
      this.$preloader.style[d] = this.options.preloader_styles[d]
    }
    this.$preloader.innerHTML = this.options.preloader_innerHTML;
    this.$iframe = document.createElement("iframe");
    this.$iframe.id = "iframe_preloader-iframe-" + this.id;
    this.$iframe.className = this.options.iframe_class;
    for (var c in this.options.iframe_styles) {
      this.$iframe.style[c] = this.options.iframe_styles[c]
    }
    this.$iframe.src = this.options.iframe_src;
    this.$iframe.scrolling = "no";
    this.$iframe.frameborder = "0";
    this.$close = document.createElement("div");
    this.$close.id = "iframe_preloader-close-" + this.id;
    this.$close.className = this.options.close_class;
    for (var b in this.options.close_styles) {
      this.$close.style[b] = this.options.close_styles[b]
    }
    this.$close.innerHTML = this.options.close_innerHTML;
    var a = this;
    this.$close.onclick = function () {
      if (typeof pano_iframe_preloader != "undefined" && pano_iframe_preloader) {
        pano_iframe_preloader.remove()
      }
    };
    this.$iframe.onload = function () {
      a.options.iframe_before_onload();
      a.iframe_loaded = true;
      a.show();
      a.$close.style.display = "none";
      a.options.iframe_after_onload()
    };
    this.hide_iframe();
    this.lock_body();
    this.$container.appendChild(this.$preloader);
    this.$container.appendChild(this.$iframe);
    this.$container.appendChild(this.$close);
    document.body.appendChild(this.$container)
  }, hide: function () {
    this.hide_iframe();
    this.hide_preloader();
    this.unlock_body()
  }, show: function () {
    if (this.iframe_loaded) {
      this.show_iframe();
      this.hide_preloader()
    } else {
      this.hide_iframe();
      this.show_preloader()
    }
    this.lock_body()
  }, remove: function () {
    this.hide();
    document.body.removeChild(this.$container);
    delete this.$container;
    delete this.$preloader;
    delete this.$iframe
  }, lock_body: function () {
    document.body.style.overflow = "hidden"
  }, unlock_body: function () {
    document.body.style.overflow = ""
  }, show_preloader: function () {
    this.window.focus();
    this.$preloader.style.display = "block"
  }, hide_preloader: function () {
    this.$preloader.style.display = "none"
  }, show_iframe: function () {
    this.$iframe.contentWindow.focus();
    this.$iframe.style.opacity = 1
  }, hide_iframe: function () {
    this.$iframe.style.opacity = 0
  }
};
var pano_iframe_preloader = false;
Tumblr.PanoLightboxInit = function (b, a) {
  if ((!b && window.event && (window.event.metaKey || window.event.altKey)) || (b && (b.metaKey || b.altKey))) {
    return true
  }
  pano_iframe_preloader = new Tumblr.IframePreloader({iframe_src: a});
  return false
};
/*! scripts/tumblelog/reblog_post_iframe.js */
(function () {
  var b, h;
  if (!(Tumblr && Tumblr.PostMessageChannel)) {
    return
  }
  function c() {
    if (b) {
      return
    }
    b = new Tumblr.Styler({
      id: "tumblr_reblog_post_iframe_css",
      styles: {
        "#tumblr_reblog_post_iframe": {
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "1px",
          height: "1px",
          overflow: "hidden",
          background: "transparent",
          "z-index": "2147483647"
        },
        "body._t_reblog_iframe_opened": {overflow: "hidden"},
        "._t_reblog_iframe_opened #tumblr_reblog_post_iframe": {width: "100%", height: "100%"}
      }
    })
  }

  function g(j) {
    var i = j.origin + "/detached/reblog/";
    i.replace(/^http:\/\//, "https://");
    i += j.reblogId;
    i += "/";
    i += j.reblogKey;
    return i
  }

  function a(i) {
    if (h) {
      f()
    }
    if ("reblogId" in i) {
      i = g(i)
    }
    var j = document.createElement("iframe");
    j.id = "tumblr_reblog_post_iframe";
    j.frameBorder = "0";
    j.scrolling = "yes";
    j.width = "1";
    j.height = "1";
    j.src = i + "?t=" + new Date().getTime();
    h = j;
    c();
    document.body.appendChild(j)
  }

  function d() {
    if (h) {
      document.body.className += " _t_reblog_iframe_opened"
    } else {
      f()
    }
  }

  function f() {
    if (h) {
      document.body.removeChild(h);
      h = null
    }
    document.body.className = document.body.className.replace(/\_t_reblog_iframe_opened\b/, "")
  }

  Tumblr.ReblogPostIframe = {};
  var e = new Tumblr.PostMessageChannel({namespace: "reblog_iframe"});
  e.listen_to({reblog_post: a, reblog_post_frame_loaded: d, close_reblog_post_frame: f})
})();
/*! scripts/tumblelog/like_button.js */
("Tumblr" in window) || (window.Tumblr = {});
(function () {
  var a;
  if (window.JSON && window.JSON.stringify && window.JSON.parse) {
    a = window.JSON
  } else {
    if (_t) {
      a = _t.getCleanObject("JSON")
    }
  }
  Tumblr.LikeButtonUpdate = (function () {
    return {
      post_message_event: function (d, b) {
        if (d[0] === "tumblelog_like") {
          if (d[1] && document.getElementById("like_button_" + d[1])) {
            var c = document.getElementById("like_button_" + d[1]);
            if (d[2] === "liked") {
              Tumblr.addClass(c, "liked")
            } else {
              Tumblr.removeClass(c, "liked")
            }
          }
        }
      }
    }
  })();
  Tumblr.LikeButton = {
    loaded_iframes: {}, like_statuses: {}, get_status_by_page: function (d) {
      var b = document.getElementById("tumblr_controls");
      if (b) {
        var c = "get_like_states;" + a.stringify({page: d});
        b.contentWindow.postMessage(c, "*")
      }
    }, get_status_by_post_ids: function (c) {
      var b = document.getElementById("tumblr_controls");
      if (b) {
        var d = "get_like_states;" + a.stringify({ids: c});
        b.contentWindow.postMessage(d, "*")
      }
    }, post_message_event: function (e, c) {
      if (e[0] === "like_state_update") {
        var f = a.parse(e[1]);
        if (f.length) {
          for (var d = 0, b = f.length; d < b; d++) {
            Tumblr.LikeButton.queue_like_status(f[d]);
            Tumblr.LikeButton.update_like_state(f[d])
          }
        } else {
          Tumblr.LikeButton.queue_like_status(f);
          Tumblr.LikeButton.update_like_state(f)
        }
      }
    }, logged_in_iframe_loaded: function (o, l) {
      if (o[0] === "logged_in_iframe_loaded") {
        var h = "";
        var m = "";
        var n = window.location.pathname;
        var g = [];
        if (n.indexOf("page") !== -1 || n.indexOf("post") !== -1) {
          var f = n.split("/");
          for (var d = 0; d < f.length; d++) {
            if (f[d] === "page" && f[d++]) {
              h = f[d++];
              break
            }
            if (f[d] === "post" && f[d++]) {
              m = f[d++];
              g.push(m);
              break
            }
          }
        }
        if (h) {
          Tumblr.LikeButton.get_status_by_page(h)
        } else {
          var c = document.querySelectorAll(".like_button");
          for (var b = 0; b < c.length; b++) {
            var e = c[b];
            var k = e.attributes["data-post-id"];
            if (k && k.value != m) {
              g.push(k.value)
            }
          }
          if (g.length > 0) {
            Tumblr.LikeButton.get_status_by_post_ids(g)
          }
        }
      }
    }, like_iframe_loaded: function (c, b) {
      if (c[0] === "like_iframe_load") {
        var d = a.parse(c[1]);
        if (d.post_id) {
          Tumblr.LikeButton.loaded_iframes[d.post_id] = 1;
          Tumblr.LikeButton.check_like_status(d.post_id, true)
        }
      }
    }, check_like_status: function (c, b) {
      var e = Tumblr.LikeButton.like_statuses[c];
      if (e) {
        var d = {post_id: c, state: (e === "liked") ? true : false};
        Tumblr.LikeButton.update_like_state(d)
      }
    }, queue_like_status: function (b) {
      if (b.post_id) {
        Tumblr.LikeButton.like_statuses[b.post_id] = (b.state) ? "liked" : "unliked"
      }
    }, update_like_state: function (c) {
      if (c.post_id) {
        var b = document.getElementById("like_iframe_" + c.post_id);
        if (b) {
          b.contentWindow.postMessage("state_update;" + a.stringify(c), ((location.protocol === "https:") ? "https://secure.assets.tumblr.com" : "http://assets.tumblr.com"))
        }
      }
    }
  }
}).call(this);
/*! scripts/tumblelog/post_message_form_resize.js */
("Tumblr" in window) || (window.Tumblr = {});
Tumblr.TumblelogFormResize = (function () {
  return {
    post_message_event: function (d, b) {
      if (d[0] === "resize_tumblelog_form_iframe") {
        var e = d[1];
        var c = document.getElementById(e);
        var a = parseInt(d[2], 10);
        if (e) {
          c.height = a
        }
      }
    }
  }
})();
/*! scripts/tumblelog/post_message_photoset_resize.js */
Tumblr.PhotosetResize = (function () {
  return {
    post_message_event: function (c, b) {
      if (c[0] === "resize_photoset_iframe") {
        var d = c[1], a = parseInt(c[2], 10);
        document.getElementById("photoset_iframe_" + d).height = a
      }
    }
  }
})();
/*! scripts/tumblelog/feature_analytics.js */
("Tumblr" in window) || (window.Tumblr = {});
Tumblr.AnalyticsFeatureSupport = (function () {
  return {
    post_message_event: function (c, a) {
      if (c[0] === "openInMobileAppSuccess") {
        if (typeof(open_in_mobile_app) === "function") {
          if (c[1] && c[1].length) {
            var b = parseInt(c[1], 10);
            open_in_mobile_app(b)
          }
        }
      }
    }
  }
})();
/*! scripts/tumblelog/feature_iframe.js */
Tumblr.IframeFeatureSupport = (function () {
  var h;
  var e;
  var c;
  var d = new Tumblr.Styler({
    id: "tumblr_iframe_css",
    styles: {
      ".tumblr_controls": {
        position: "absolute",
        top: "0",
        right: "0",
        display: "block",
        opacity: "1",
        width: "1px",
        height: "1px",
        "z-index": "2147483647",
        visibility: "hidden",
        "pointer-events": "none"
      },
      ".tumblr_controls.visible": {visibility: "visible", "pointer-events": "all"},
      ".tumblr_controls.sticky": {position: "fixed"},
      ".tumblr_controls.transition": {
        "-webkit-transition": "top 0.1s ease",
        "-moz-transition": "top 0.1s ease",
        "-ms-transition": "top 0.1s ease",
        "-o-transition": "top 0.1s ease",
        transition: "top 0.1s ease"
      },
      "iframe#tumblr_controls.tumblr_controls.sticky.transition": {
        "-webkit-animation": "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        "-moz-animation": "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        "-ms-animation": "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        "-o-animation": "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        animation: "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        top: "0 !important"
      },
      ".tumblr_controls.sticky.transition": {
        "-webkit-animation": "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        "-moz-animation": "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        "-ms-animation": "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        "-o-animation": "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        animation: "tumblr_controls_fade_in 0.3s 0.2s linear 1 both",
        top: "0 !important"
      },
      ".tumblr_controls.flash_fix": {visibility: "hidden !important"},
      "body.mobile_bar": {
        "-webkit-transition": "padding-top 0.1s ease",
        "-moz-transition": "padding-top 0.1s ease",
        "-ms-transition": "padding-top 0.1s ease",
        "-o-transition": "padding-top 0.1s ease",
        transition: "padding-top 0.1s ease",
        "padding-top": "44px"
      }
    },
    animations: {tumblr_controls_fade_in: {"0%": {opacity: 0}, "100%": {opacity: 1}}}
  });

  function f() {
    var j, k, i = document.querySelector('meta[name="color:Tumblr Controls"]');
    if (i) {
      j = i.getAttribute("content")
    }
    if (!j) {
      j = "default"
    }
    h.contentWindow.postMessage("color_match;" + j, e)
  }

  function g(i, j) {
    var k;
    if (!(typeof i === "string" && i.match(/\d+%/))) {
      i = parseInt(i, 10) || 0
    }
    if (!(typeof j === "string" && j.match(/\d+%/))) {
      j = parseInt(j, 10) || 0
    }
    Tumblr.addClass(h, "visible");
    if (i) {
      h.width = i;
      k = (/%/.test(i)) ? "" : "px";
      d.set("#tumblr_controls", "width", i + k)
    }
    if (j) {
      h.height = j;
      k = (/%/.test(j)) ? "" : "px";
      d.set("#tumblr_controls", "height", j + k)
    }
  }

  var b = (function () {
    var l = [];
    var q = false;
    var i = 200;
    var k = false;

    function j() {
      if (window.addEventListener) {
        window.addEventListener("scroll", p)
      } else {
        if (window.attachEvent) {
          window.attachEvent("onscroll", p)
        }
      }
    }

    function n() {
      if (window.removeEventListener) {
        window.removeEventListener("scroll", p)
      } else {
        if (window.detachEvent) {
          window.detachEvent("onscroll", p)
        }
      }
    }

    function p(t) {
      if (q) {
        clearTimeout(k);
        return
      }
      var r = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
      var u = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
      for (var s = 0; s < l.length; s++) {
        l[s].call(this, t, r, u)
      }
      if (i && t) {
        q = true;
        setTimeout(function () {
          q = false;
          p()
        }, i)
      }
    }

    function m(r) {
      l.push(r);
      j()
    }

    function o(s) {
      for (var r = 0; r < l.length; r++) {
        if (l[r] === s) {
          l.splice(r--, 1)
        }
      }
      if (!l.length) {
        n()
      }
    }

    return {on: m, off: o, start: j, stop: n}
  })();
  var a = (function (i) {
    var l;
    var r = 0;
    var j = 0;
    var m = 0;

    function k() {
      if (window.removeEventListener) {
        window.removeEventListener("DOMContentLoaded", k, false)
      } else {
        if (window.detachEvent) {
          window.detachEvent("onload", k)
        }
      }
      setTimeout(function () {
        n()
      }, 200)
    }

    function n() {
      l = document.getElementById("tumblr_controls");
      if (!l) {
        return false
      }
      var s = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight;
      r = l.offsetTop;
      j = l.clientHeight;
      m = s - (r + j);
      if (r === 0 || m === 0) {
        o()
      } else {
        if (window.getComputedStyle(l).position !== "fixed") {
          Tumblr.addClass(l, "transition");
          b.on(q);
          q()
        }
      }
    }

    function q(u, t, s) {
      if (typeof t === "undefined") {
        t = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
      }
      if (typeof s === "undefined") {
        s = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0
      }
      if (t < r) {
        p()
      } else {
        if (t >= r + (j = l.clientHeight)) {
          o()
        }
      }
    }

    function o() {
      Tumblr.addClass(l, "sticky")
    }

    function p() {
      Tumblr.removeClass(l, "sticky")
    }

    if (window.addEventListener) {
      window.addEventListener("DOMContentLoaded", k, false)
    } else {
      if (window.attachEvent) {
        window.attachEvent("onload", k)
      }
    }
    return {stick: o, unstick: p, check: q}
  })(d);
  return {
    post_message_event: function (j, i) {
      c = document.getElementById("mobile_iframe");
      h = document.getElementById("tumblr_controls");
      e = j[j.length - 1];
      if (c) {
        if (j[0] === "show_mobile_banner") {
          if (j[1] === "1") {
            Tumblr.MobileBanner.showBanner();
            Tumblr.MobileBanner.mobile_origin = e
          } else {
            Tumblr.MobileBanner.showHeaderBanner()
          }
        }
      } else {
        if (h && e) {
          if (j[0] === "color_match") {
            f()
          }
          if (j[0] === "location_change") {
            Tumblr.addClass(h, "flash_fix");
            document.getElementById("tumblr_controls").onload = function () {
              Tumblr.removeClass(h, "flash_fix")
            }
          }
          if (j[0] === "request_keywords") {
            if (typeof tumblr_meta_keyboards != "undefined") {
              h.contentWindow.postMessage("keywords;" + tumblr_meta_keyboards, e)
            }
          }
          if (j[0] === "teaser_iframe") {
            if (j.length < 2 || !Tumblr.Teaser) {
              return false
            }
            switch (j[1]) {
              case"initialize":
                h.contentWindow.postMessage("teaser;enable", e);
                return Tumblr.Teaser.initialize({slide_page: (j.length > 2 && j[2] === "slide")});
              case"load":
                return Tumblr.Teaser.load_once();
              case"open":
                return Tumblr.Teaser.open();
              case"close":
                return Tumblr.Teaser.close();
              case"toggle":
                return Tumblr.Teaser.toggle();
              default:
                break
            }
          }
          if (j[0] === "tagged_teaser_iframe") {
            if (j.length < 2 || !Tumblr.TaggedTeaser) {
              return false
            }
            switch (j[1]) {
              case"show":
                Tumblr.TaggedTeaser.initialize({once: true, open: true});
                return;
              case"open":
                return Tumblr.TaggedTeaser.open(j.length > 2 ? j[2] : false);
              case"close":
                return Tumblr.TaggedTeaser.close();
              case"toggle":
                return Tumblr.TaggedTeaser.toggle();
              default:
                break
            }
          }
          if (j[0] === "resize_iframe") {
            g(j[1], j[2]);
            if (j.length > 2) {
              switch (j[3]) {
                case"body_class":
                  if (j.length > 3 && j[4]) {
                    Tumblr.addClass(document.body, j[4])
                  }
                  break;
                default:
                  break
              }
            }
          }
        }
      }
    }
  }
})();
/*! scripts/tumblelog/feature_video.js */
Tumblr.VideoFeatureSupport = (function () {
  var b = {setup_controls: {}};

  function f() {
    if (document.getElementById("tumblr_video_iframe_fullscreen")) {
      return true
    }
    var j = document.createElement("style");
    j.id = "tumblr_video_iframe_fullscreen";
    j.innerHTML = ".tumblr_video_iframe.fullwindow { top: 0; bottom: 0; right: 0; left: 0; position: fixed; z-index: 8675309; height: 100%; width: 100%; }";
    document.body.appendChild(j)
  }

  function e(j) {
    f();
    if (j) {
      b.iframe.className = "tumblr_video_iframe fullwindow"
    } else {
      b.iframe.className = "tumblr_video_iframe"
    }
  }

  function i(j) {
    var k = document.getElementById("tumblr_controls");
    if (!j) {
      if (b.parent_post) {
        b.parent_post.className = b.parent_post.className.replace(/\s+is_lightbox/g, "")
      }
      document.body.className = document.body.className.replace(/\s+is_lightbox/g, "");
      document.body.style.overflow = "visible";
      b.iframe.style.position = "static";
      b.iframe.style.height = "100%";
      b.iframe.style.width = "100%";
      b.iframe.style.zIndex = 0;
      if (k) {
        k.style.display = "block"
      }
      return
    }
    a();
    if (b.parent_post) {
      b.parent_post.className += " is_lightbox"
    }
    document.body.className += " is_lightbox";
    document.body.style.overflow = "hidden";
    b.iframe.style.position = "fixed";
    b.iframe.style.height = "100%";
    b.iframe.style.width = "100%";
    b.iframe.style.top = 0;
    b.iframe.style.right = 0;
    b.iframe.style.left = 0;
    b.iframe.style.bottom = 0;
    b.iframe.style.zIndex = 90210;
    if (k) {
      k.style.display = "none"
    }
  }

  function g(j) {
    if (!j) {
      if (b.parent_post) {
        b.parent_post.className = b.parent_post.className.replace(/\s+is_fullscreen/g, "")
      }
      document.body.className = document.body.className.replace(/\s+is_fullscreen/g, "");
      return
    }
    if (b.parent_post) {
      b.parent_post.className += " is_fullscreen"
    }
    document.body.className += " is_fullscreen"
  }

  function a() {
    if (b.setup_controls[b.id]) {
      return
    }
    var k = document.querySelector("#post_" + b.id + " .tumblr_lightbox_controls .close_button");
    if (k) {
      k.addEventListener("click", function (l) {
        b.iframe.contentWindow.postMessage("exit_lightbox", b.origin_url);
        return false
      })
    }
    var j = document.querySelector("#post_" + b.id + " .tumblr_lightbox_controls .like_button");
    if (j) {
      j.addEventListener("click", function (m) {
        var l = this;
        var n = {
          id: l.getAttribute("data-post-id"),
          key: l.getAttribute("data-reblog_key") || l.getAttribute("data-reblog-key")
        };
        if (Tumblr.hasClass(l, "already_like")) {
          Tumblr.unlike(n, {
            success: function () {
              Tumblr.removeClass(l, "already_like")
            }
          })
        } else {
          Tumblr.like(n, {
            success: function () {
              Tumblr.addClass(l, "already_like")
            }
          })
        }
        return false
      })
    }
    b.setup_controls[b.id] = true
  }

  function h() {
    if (typeof(get_cookie) === "function") {
      var j = get_cookie("supress_lightbox"), k = parseInt(j.value, 10) || 0;
      if (j && k > 3) {
        return "supress_lightbox"
      }
      if (!j) {
        return "enable_lightbox"
      }
    }
    return false
  }

  function d(k) {
    if (typeof(set_cookie) === "function") {
      var j = get_cookie("supress_lightbox"), l = parseInt(j.value, 10) || 0;
      if (k > 0 && k < 5) {
      }
      if (k === -1) {
        if (l > 1) {
        } else {
        }
      }
      c(h())
    }
  }

  function c(l) {
    if (!l) {
      return
    }
    var k = document.querySelectorAll(".tumblr_video_iframe.has_lightbox");
    for (var j = 0; j < k.length; j++) {
      k[j].contentWindow.postMessage(l, k[j].getAttribute("data-origin"))
    }
  }

  return {
    post_message_event: function (l, j) {
      var k = l[2];
      b.iframe = document.getElementById("tumblr_video_iframe_" + k);
      if (!b.iframe) {
        return
      }
      b.id = k;
      b.origin_url = b.iframe.getAttribute("data-origin");
      b.parent_post = document.getElementById("post_" + k);
      if (l[0] === "lightbox") {
        i((l[1] === "true") ? true : false)
      }
      if (l[0] === "full_window") {
        e((l[1] === "true") ? true : false)
      }
      if (l[0] === "full_screen") {
        g((l[1] === "true") ? true : false)
      }
    }
  }
})();
/*! scripts/tumblelog/feature_audio.js */
Tumblr.AudioFeatureSupport = (function () {
  return {
    post_message_event: function (d, a) {
      var c, b;
      if (d[0] === "audioPlayerReady") {
        c = document.getElementsByClassName("tumblr_audio_player");
        for (b = 0; b < c.length; b++) {
          if (c[b].className.indexOf(" tumblr_audio_player_" + d[1]) >= 0) {
            try {
              if (!c[b].style.webkitTransform) {
                c[b].style.webkitTransform = "translate3d(0px, 0px, 0px)"
              }
            } catch (f) {
            }
          }
        }
      } else {
        if (d[0] === "audioPlayerPlaying") {
          c = document.getElementsByClassName("tumblr_audio_player");
          for (b = 0; b < c.length; b++) {
            if (c[b].className.indexOf(" tumblr_audio_player_" + d[1]) < 0) {
              c[b].contentWindow.postMessage("pause", "*")
            }
          }
          c = document.getElementsByClassName("tumblr_video_iframe");
          for (b = 0; b < c.length; b++) {
            c[b].contentWindow.postMessage("pause", "*")
          }
        }
      }
    }
  }
})();
/*! scripts/tumblelog/mobile_fullscreen_iframe.js */
("Tumblr" in window) || (window.Tumblr = {});
Tumblr.mobileFullscreenIframe = {
  og_store: function () {
    this.og_body_position = document.body.style.position;
    this.og_body_overflow = document.body.style.overflow;
    this.og_html_bg = this.html_el.style.backgroundColor;
    this.win_height = window.innerHeight + "px"
  }, set_frame_height: function () {
    this.win_height = window.innerHeight + "px";
    this.win_width = window.innerWidth + "px";
    this.frame.style.height = this.win_height;
    this.frame.style.minWidth = this.win_width
  }, enable: function (a) {
    this.frame = document.getElementById(a);
    if (!this.frame) {
      return
    }
    this.html_el = document.getElementsByTagName("html")[0];
    this.og_store();
    this.orientation_height_change = this.set_frame_height.bind(this);
    window.addEventListener("orientationchange", this.orientation_height_change, false);
    window.addEventListener("resize", this.orientation_height_change, false);
    this.frame.className += " is_lightbox";
    document.body.className += " is_lightbox";
    document.body.style.position = "relative";
    document.body.style.left = "-99999px";
    document.body.style.overflow = "hidden";
    this.html_el.style.backgroundColor = "#000000";
    this.frame.style.cssText = "position:fixed; overflow:hidden; width: 100%; top:0; left:0; right:0; bottom:0; z-index: 90210;";
    this.frame.style.height = this.win_height;
    if (document.getElementById("tumblr_controls")) {
      document.getElementById("tumblr_controls").style.display = "none"
    }
  }, disable: function (a) {
    this.frame = this.frame || document.getElementById(a);
    if (!this.frame) {
      return
    }
    this.frame.className = this.frame.className.replace(/\s+is_lightbox/, "");
    document.body.className = document.body.className.replace(/\s+is_lightbox/, "");
    document.body.style.overflow = this.og_body_overflow;
    document.body.style.position = this.og_body_position;
    this.html_el.style.backgroundColor = this.og_html_bg;
    this.frame.style.cssText = "";
    if (document.getElementById("tumblr_controls")) {
      document.getElementById("tumblr_controls").style.display = "block"
    }
    window.removeEventListener("orientationchange", this.orientation_height_change, false);
    window.removeEventListener("resize", this.orientation_height_change, false)
  }
};
/*! scripts/tumblelog/post_message_listener.js */
("Tumblr" in window) || (window.Tumblr = {});
Tumblr.PostMessageListener = (function () {
  return {
    initialize: function (d) {
      d = d || function () {
        };
      var c = window.addEventListener ? "addEventListener" : "attachEvent";
      var b = window[c];
      var a = c == "attachEvent" ? "onmessage" : "message";
      b(a, function (g) {
        if (typeof g.data !== "string") {
          return
        }
        var f = g.data.split(";");
        d(f, g.origin)
      }, false)
    }
  }
})();
Tumblr.PostMessageListener.initialize(function (b, a) {
  Tumblr.VideoFeatureSupport.post_message_event(b, a);
  Tumblr.AudioFeatureSupport.post_message_event(b, a);
  Tumblr.IframeFeatureSupport.post_message_event(b, a);
  Tumblr.AnalyticsFeatureSupport.post_message_event(b, a);
  Tumblr.TumblelogFormResize.post_message_event(b, a);
  Tumblr.PhotosetResize.post_message_event(b, a);
  Tumblr.LikeButtonUpdate.post_message_event(b, a);
  Tumblr.LikeButton.logged_in_iframe_loaded(b, a);
  Tumblr.LikeButton.post_message_event(b, a);
  Tumblr.LikeButton.like_iframe_loaded(b, a)
});
/*! scripts/tumblelog.js */

/*! scripts/spin.js */
(function (i, k, a) {
  var e = ["webkit", "Moz", "ms", "O"];
  var p = {};
  var o;

  function g(q, t) {
    var r = k.createElement(q || "div");
    var s;
    for (s in t) {
      r[s] = t[s]
    }
    return r
  }

  function h(r) {
    for (var q = 1, s = arguments.length; q < s; q++) {
      r.appendChild(arguments[q])
    }
    return r
  }

  var j = function () {
    var q = g("style");
    h(k.getElementsByTagName("head")[0], q);
    return q.sheet || q.styleSheet
  }();

  function c(u, q, v, y) {
    var r = ["opacity", q, ~~(u * 100), v, y].join("-");
    var s = 0.01 + v / y * 100;
    var x = Math.max(1 - (1 - u) / q * (100 - s), u);
    var w = o.substring(0, o.indexOf("Animation")).toLowerCase();
    var t = w && "-" + w + "-" || "";
    if (!p[r]) {
      j.insertRule("@" + t + "keyframes " + r + "{0%{opacity:" + x + "}" + s + "%{opacity:" + u + "}" + (s + 0.01) + "%{opacity:1}" + (s + q) % 100 + "%{opacity:" + u + "}100%{opacity:" + x + "}}", 0);
      p[r] = 1
    }
    return r
  }

  function n(u, v) {
    var t = u.style;
    var q;
    var r;
    if (t[v] !== a) {
      return v
    }
    v = v.charAt(0).toUpperCase() + v.slice(1);
    for (r = 0; r < e.length; r++) {
      q = e[r] + v;
      if (t[q] !== a) {
        return q
      }
    }
  }

  function f(q, s) {
    for (var r in s) {
      q.style[n(q, r) || r] = s[r]
    }
    return q
  }

  function m(s) {
    for (var q = 1; q < arguments.length; q++) {
      var r = arguments[q];
      for (var t in r) {
        if (s[t] === a) {
          s[t] = r[t]
        }
      }
    }
    return s
  }

  function l(q) {
    var r = {x: q.offsetLeft, y: q.offsetTop};
    while ((q = q.offsetParent)) {
      r.x += q.offsetLeft;
      r.y += q.offsetTop
    }
    return r
  }

  var d = {
    lines: 12,
    length: 7,
    width: 5,
    radius: 10,
    color: "#000",
    speed: 1,
    trail: 100,
    opacity: 1 / 4,
    fps: 20,
    zIndex: 2000000000,
    className: "spinner",
    top: "auto",
    left: "auto"
  };
  var b = function b(q) {
    if (!this.spin) {
      return new b(q)
    }
    this.opts = m(q || {}, b.defaults, d)
  };
  b.defaults = {};
  b.prototype = {
    spin: function (x) {
      this.stop();
      var B = this;
      var q = B.opts;
      var r = B.el = f(g(0, {className: q.className}), {position: "relative", zIndex: q.zIndex});
      var A = q.radius + q.length + q.width;
      var C;
      var z;
      if (x) {
        x.insertBefore(r, x.firstChild || null);
        z = l(x);
        C = l(r);
        f(r, {
          left: (q.left == "auto" ? z.x - C.x + (x.offsetWidth >> 1) : q.left + A) + "px",
          top: (q.top == "auto" ? z.y - C.y + (x.offsetHeight >> 1) : q.top + A) + "px"
        })
      }
      r.setAttribute("aria-role", "progressbar");
      B.lines(r, B.opts);
      if (!o) {
        var u = 0;
        var s = q.fps;
        var w = s / q.speed;
        var v = (1 - q.opacity) / (w * q.trail / 100);
        var y = w / q.lines;
        !function t() {
          u++;
          for (var D = q.lines; D; D--) {
            var E = Math.max(1 - (u + D * y) % w * v, q.opacity);
            B.opacity(r, q.lines - D, E, q)
          }
          B.timeout = B.el && setTimeout(t, ~~(1000 / s))
        }()
      }
      return B
    }, stop: function () {
      var q = this.el;
      if (q) {
        clearTimeout(this.timeout);
        if (q.parentNode) {
          q.parentNode.removeChild(q)
        }
        this.el = a
      }
      return this
    }, lines: function (s, u) {
      var r = 0;
      var q;

      function t(v, w) {
        return f(g(), {
          position: "absolute",
          width: (u.length + u.width) + "px",
          height: u.width + "px",
          background: v,
          boxShadow: w,
          transformOrigin: "left",
          transform: "rotate(" + ~~(360 / u.lines * r) + "deg) translate(" + u.radius + "px,0)",
          borderRadius: (u.width >> 1) + "px"
        })
      }

      for (; r < u.lines; r++) {
        q = f(g(), {
          position: "absolute",
          top: 1 + ~(u.width / 2) + "px",
          transform: u.hwaccel ? "translate3d(0,0,0)" : "",
          opacity: u.opacity,
          animation: o && c(u.opacity, u.trail, r, u.lines) + " " + 1 / u.speed + "s linear infinite"
        });
        if (u.shadow) {
          h(q, f(t("#000", "0 0 4px #000"), {top: 2 + "px"}))
        }
        h(s, h(q, t(u.color, "0 0 1px rgba(0,0,0,.1)")))
      }
      return s
    }, opacity: function (r, q, s) {
      if (q < r.childNodes.length) {
        r.childNodes[q].style.opacity = s
      }
    }
  };
  !function () {
    var r = f(g("group"), {behavior: "url(#default#VML)"});
    var q;
    if (!n(r, "transform") && r.adj) {
      for (q = 4; q--;) {
        j.addRule(["group", "roundrect", "fill", "stroke"][q], "behavior:url(#default#VML)")
      }
      b.prototype.lines = function (v, u) {
        var t = u.length + u.width;
        var B = 2 * t;

        function A() {
          return f(g("group", {coordsize: B + " " + B, coordorigin: -t + " " + -t}), {width: B, height: B})
        }

        var w = -(u.width + u.length) * 2 + "px";
        var z = f(A(), {position: "absolute", top: w, left: w});
        var y;

        function x(C, s, D) {
          h(z, h(f(A(), {rotation: 360 / u.lines * C + "deg", left: ~~s}), h(f(g("roundrect", {arcsize: 1}), {
            width: t,
            height: u.width,
            left: u.radius,
            top: -u.width >> 1,
            filter: D
          }), g("fill", {color: u.color, opacity: u.opacity}), g("stroke", {opacity: 0}))))
        }

        if (u.shadow) {
          for (y = 1; y <= u.lines; y++) {
            x(y, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)")
          }
        }
        for (y = 1; y <= u.lines; y++) {
          x(y)
        }
        return h(v, z)
      };
      b.prototype.opacity = function (t, s, v, u) {
        var w = t.firstChild;
        u = u.shadow && u.lines || 0;
        if (w && s + u < w.childNodes.length) {
          w = w.childNodes[s + u];
          w = w && w.firstChild;
          w = w && w.firstChild;
          if (w) {
            w.opacity = v
          }
        }
      }
    } else {
      o = n(r, "animation")
    }
  }();
  i.Spinner = b
})(window, document);
/*! scripts/polyfills/placeholders.js */
(function (b, a) {
  var c = {
    init: function (l) {
      var h = b(document);
      var d = "placeholder" in document.createElement("input");
      var j = "placeholder" in document.createElement("textarea");
      l = b.extend({}, l);
      var k = (l.els) ? b(l.els) : b("input, textarea");
      var i = l.clear_on_submit;
      var e = l.force;

      function m(p) {
        var n = b(p.target);
        var o = n.get(0).nodeName.toLowerCase();
        if (!d || !j || e) {
          if (n.hasClass("placeholder")) {
            n.val("").removeClass("placeholder")
          }
          if (n.attr("data-type") == "password") {
            try {
              n.get(0).type = "password"
            } catch (q) {
            }
          }
        }
      }

      function f(n) {
        if (!d || !j || e) {
          g(n.target)
        }
      }

      function g(n) {
        $input = b(n);
        var o = $input.attr("placeholder");
        if (o && $input.val() === "") {
          $input.addClass("placeholder").val(o)
        }
        if ($input.attr("type") == "password" && ($input.val() === "" || $input.val() === o)) {
          try {
            $input.get(0).type = "text"
          } catch (p) {
          }
          $input.attr("data-type", "password")
        }
      }

      if (!d || !j || e) {
        h.on("focus", k.selector, m);
        h.on("blur", k.selector, f);
        _.each(k, function (o) {
          g(o);
          if (i) {
            var n = b(o);
            n.parents("form").on("submit", function () {
              if (n.val() === n.attr("placeholder")) {
                n.val("")
              }
            })
          }
        })
      }
    }
  };
  a.PlaceHolders = c
})(jQuery, this.Tumblr || (this.Tumblr = {}));
/*! scripts/application/glass.js */
(function (c, a) {
  var b = new (Backbone.View.extend({
    id: "glass_overlay",
    events: {click: "click"},
    locked: false,
    visible: false,
    initialize: function () {
    },
    render: function () {
      c(document.body).prepend(this.$el);
      this.rendered = true;
      Tumblr.Events.on("DOMEventor:escape", _.bind(this.keydown, this))
    },
    click: function () {
      if (this.locked) {
        return
      }
      this.hide()
    },
    keydown: function (d) {
      if (this.locked) {
        return
      }
      if (this.visible) {
        this.hide()
      }
    },
    show: function (e, d) {
      if (_.isObject(Tumblr.KeyCommands) && !Tumblr.KeyCommands.suspended) {
        Tumblr.KeyCommands.suspend();
        this.glass_suspended_keys = true
      }
      if (!this.rendered) {
        this.render()
      }
      d = d || "";
      this.on_close = e || function () {
        };
      this.visible = true;
      Tumblr.Events.trigger("Glass:show", this);
      this.$el.addClass("show");
      setTimeout(_.bind(function () {
        this.$el.addClass(d)
      }, this), 0)
    },
    hide: function () {
      this.visible = false;
      Tumblr.Events.trigger("Glass:hide", this);
      this.$el.removeClass("show");
      this.on_close();
      if (this.glass_suspended_keys) {
        if (_.isObject(Tumblr.KeyCommands)) {
          Tumblr.KeyCommands.resume()
        }
        this.glass_suspended_keys = false
      }
    },
    lock: function () {
      this.locked = true
    },
    unlock: function () {
      this.locked = false
    }
  }))();
  a.Glass = b
})(jQuery, Tumblr);
/*! scripts/application/cookie.js */
(function (b) {
  var a = {
    get: function (c) {
      return new RegExp(c + "=([^;]+)").test(unescape(document.cookie)) ? RegExp.$1 : null
    }, set: function (c, i, h, e) {
      e = e || {};
      var d = new Date();
      var j = e.path ? e.path : "/";
      var g = e.is_secure ? true : false;
      var f = e.domain ? e.domain : "";
      d.setTime(d.getTime() + (h * 1000));
      document.cookie = c + "=" + escape(i) + ((h == null) ? "" : ";expires=" + d.toGMTString()) + ";path=" + j + ((g === false) ? "" : ";secure") + ((f === "") ? "" : ";domain=" + f)
    }, unset: function (c) {
      a.set(c, "", -1)
    }
  };
  b.Cookie = a
})(Tumblr);
/*! scripts/application/document_width_cookie.js */
(function (c, d, b, a) {
  a.documentWidth = function (e) {
    if (!e) {
      e = c(document).width()
    }
    Tumblr.Cookie.set("documentWidth", e, 24 * 60 * 60)
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/device_pixel_ratio.js */
(function (c, d, b, a) {
  a.devicePixelRatio = function () {
    Tumblr.Cookie.set("devicePixelRatio", window.devicePixelRatio, 24 * 60 * 60)
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/spinjs_spinner_defaults.js */
(function (a) {
  a.spinners = {
    white: {
      lines: 16,
      length: 11,
      width: 4,
      radius: 17,
      color: "#ffffff",
      speed: 0.9,
      trail: 34,
      shadow: false,
      hwaccel: false,
      className: "tumblr_default_spinner spinner",
      zIndex: 2000000000,
      top: "50",
      left: "auto"
    }
  }
})(Tumblr);
/*! scripts/application/popover.js */
(function (d, b) {
  var a = Backbone.View.extend({
    events: {click: "click"}, initialize: function (e) {
      this.button = d(e.el || this.$el);
      this.popover = e.popover || this.$el.find(".popover");
      this.on_hide = e.on_hide || function () {
        };
      this.on_show = e.on_show || function () {
        };
      this.auto_show = e.auto_show || false;
      this.prevent_default_click = e.prevent_default_click || false;
      if (this.auto_show) {
        this.show()
      }
      a.register(this)
    }, click: function (f) {
      if (this.prevent_default_click) {
        f.preventDefault()
      }
      this.toggle()
    }, is_showing: false, show: function () {
      Tumblr.Glass.show(_.bind(function () {
        this.hide();
        this.on_hide()
      }, this));
      this.popover.show();
      this.on_show();
      this.is_showing = true
    }, hide: function () {
      if (!this.is_showing) {
        return
      }
      Tumblr.Glass.on_close = _.bind(function () {
        if (this.is_showing) {
          this.popover.hide();
          this.on_hide()
        }
      }, this);
      Tumblr.Glass.hide();
      this.is_showing = false
    }, toggle: function () {
      return this.is_showing ? this.hide() : this.show()
    }
  });
  a.instances = [];
  a.register = function (e) {
    this.instances.push(e)
  };
  a.hide_all = function () {
    for (var e = 0; e < this.instances.length; e++) {
      this.instances[e].hide()
    }
  };
  a.hide_all_after = function (e) {
    e = (e) ? e : 100;
    setTimeout(_.bind(function () {
      for (var f = 0; f < this.instances.length; f++) {
        this.instances[f].hide()
      }
    }, this), e)
  };
  var c = a.extend({
    initialize: function (e) {
      Tumblr.BasePopover.prototype.initialize.apply(this, arguments);
      this.skip_glass = e.skip_glass || false;
      this.skip_offset = e.skip_offset || false;
      this.direction = e.direction || "down";
      this.align = e.align || "left";
      this.glassless = e.glassless || false;
      if (this.glassless) {
        this.skip_glass = true;
        this.glassless_options = e.glassless_options || {};
        var f = {prevent_clicks: true, click_root: false};
        _.defaults(this.glassless_options, f);
        this.on("click:outside", this.__onClickOutside, this);
        this.on("click:inside", this.__onClickInside, this)
      }
      this.options = e || {};
      this.options.left = e.left || 0;
      this.options.right = e.right || 0;
      this.options.top = e.top || 0;
      this.options.bottom = e.bottom || 0
    }, click: function (f) {
      if (this.options.prevent_default_click) {
        f.preventDefault()
      }
      if (!this.options.disable_auto_show) {
        this.show()
      }
      return
    }, __bindOutsideClick: function () {
      this.__outsideClickFn = _.bind(this.__onOutsideClick, this);
      document.addEventListener("click", this.__outsideClickFn, true);
      this.listenToOnce(Tumblr.Events, "popover:hide", function () {
        document.removeEventListener("click", this.__outsideClickFn, true);
        this.__outsideClickFn = null
      })
    }, __onOutsideClick: function (i) {
      var g = this.glassless_options;
      var f = false;
      var h = function (e) {
        if (e.jquery) {
          e = e[0]
        }
        if (!(e && e.nodeType)) {
          return false
        }
        return e
      };
      var j = [".ui_dialog"];
      j.push(this.popover);
      if (g.click_root) {
        if (_.isArray(g.click_root)) {
          j.concat(g.click_root)
        } else {
          j.push(g.click_root)
        }
      }
      if (g.dynamic_ignore_selectors) {
        if (_.isArray(g.dynamic_ignore_selectors)) {
          _.each(g.dynamic_ignore_selectors, function (e) {
            j.push(d(e))
          })
        } else {
          j.push(d(g.dynamic_ignore_selectors))
        }
      }
      _.each(j, _.bind(function (e) {
        clean_el = h(e);
        if (!clean_el && _.isString(e)) {
          clean_el = d(e).get(0)
        }
        if (!clean_el) {
          return
        }
        if (i.target === clean_el || d.contains(clean_el, i.target)) {
          f = true
        }
      }, this));
      if (f) {
        this.trigger("click:inside")
      } else {
        if (this.glassless_options.prevent_clicks) {
          i.preventDefault();
          i.stopPropagation()
        }
        this.trigger("click:outside")
      }
    }, __onClickOutside: function () {
      if (!this.is_showing) {
        return
      }
      this.hide()
    }, __onClickInside: function () {
    }, show: function () {
      if (!this.skip_glass) {
        Tumblr.Glass.show(_.bind(function () {
          this.hide();
          this.on_hide()
        }, this))
      }
      if (!this.$el.is(this.popover.parent())) {
        var f = {top: 0, left: 0};
        var e = {};
        if (!this.skip_offset) {
          f = this.button.position()
        }
        if (this.direction !== "up") {
          e.top = (this.options.top + f.top) + "px"
        } else {
          e.bottom = (this.options.bottom - f.top - this.button.height()) + "px"
        }
        if (this.align !== "right") {
          e.left = (this.options.left + f.left) + "px"
        } else {
          e.right = (this.options.right - f.left - this.button.width()) + "px"
        }
        this.popover.css(e)
      }
      this.popover.show();
      this.on_show();
      this.is_showing = true;
      Tumblr.Events.trigger("popover:show", this);
      if (this.glassless && !this.__outsideClickFn) {
        this.__bindOutsideClick()
      }
    }, hide: function () {
      if (!this.is_showing) {
        return
      }
      if (!this.skip_glass) {
        Tumblr.Glass.on_close = _.bind(function () {
          if (this.is_showing) {
            this.popover.hide()
          }
        }, this);
        Tumblr.Glass.hide()
      } else {
        this.popover.hide()
      }
      this.on_hide();
      this.is_showing = false;
      Tumblr.Events.trigger("popover:hide")
    }, position: function () {
      this.popover.show();
      var i = d(window);
      var e = {top: i.scrollTop(), left: i.scrollLeft()};
      this.popover.removeClass("up nipple_on_bottom");
      e.right = e.left + i.width();
      e.bottom = e.top + i.height();
      var h = this.popover.offset();
      var g = this.popover.outerHeight();
      var f = i.height();
      h.right = h.left + this.popover.outerWidth();
      h.bottom = h.top + g;
      if (f > g && e.bottom < h.bottom) {
        this.popover.addClass("up nipple_on_bottom")
      }
    }
  });
  b.BasePopover = a;
  b.Popover = c
})(jQuery, Tumblr);
/*! scripts/application/popover_with_form.js */
(function (e, c, b) {
  var d = window.l10n_str;
  var a = Tumblr.Popover.extend({
    initialize: function (f) {
      this.options = f || {};
      this.$form = this.$("form");
      if (!this.$form.length) {
        return
      }
      this.$form.on("submit", c.bind(this.submit_form, this));
      Tumblr.Popover.prototype.initialize.apply(this, arguments)
    }, show: function () {
      Tumblr.Popover.prototype.show.call(this);
      Tumblr.Events.trigger("keycommands:suspend");
      if (!this.options.no_autofocus) {
        this.$("form :input").first().focus()
      }
    }, hide: function () {
      Tumblr.Popover.prototype.hide.call(this);
      Tumblr.Events.trigger("keycommands:resume")
    }, submit_form: function (f) {
      if (f) {
        f.preventDefault()
      }
      var g = this.$form.serializeArray();
      e.ajax({
        with_form_key: true,
        url: this.$form.attr("action"),
        type: this.$form.attr("method") || "post",
        data: g,
        success: c.bind(this.on_success, this) || function () {
        },
        error: c.bind(function () {
          if (c.isFunction(this.on_error)) {
            this.on_error()
          }
          Tumblr.Dialog.alert(d.ajax_error)
        }, this),
        complete: c.bind(function () {
          if (!this.options.wait) {
            this.hide()
          }
          if (c.isFunction(this.on_complete)) {
            this.on_complete()
          }
        }, this)
      });
      this.on_submit && this.on_submit();
      return false
    }
  });
  b.PopoverWithForm = a
})(jQuery, _, Tumblr);
/*! scripts/application/popover_with_scroll.js */
(function (c, d, b, a) {
  a.PopoverWithScroll = Tumblr.Popover.extend({
    is_scroll_disabled: false, initialize: function (e) {
      this.options = e || {};
      Tumblr.Popover.prototype.initialize.apply(this, arguments);
      this.$container = this.$el.find(".popover_inner");
      this.$scroll = this.$el.find(".popover_scroll");
      this.options.disable_infinite_scroll = e.disable_infinite_scroll || false;
      this.on_load_more = e.on_load_more || function () {
        };
      this.scrollbar = null;
      this.auto_center = b.isBoolean(this.options.auto_center) ? this.options.auto_center : true;
      if (!this.$scroll.length) {
        this.is_scroll_disabled = true
      }
    }, containing_frame: window, get_container_width: function () {
      if (this.containing_frame === window) {
        return Tumblr.Prima.DOMEventor.rect().windowWidth
      } else {
        return c(this.containing_frame).outerWidth(true)
      }
    }, show: function () {
      Tumblr.Popover.prototype.show.apply(this, arguments);
      if (this.auto_center) {
        this.position_vertical()
      } else {
        if (this.popover) {
          var e = this.get_container_width();
          if ((e - this.$el.offset().left - this.$el.outerWidth(true)) < this.popover.outerWidth(true)) {
            this.popover.addClass("nipple_on_right").removeClass("nipple_on_left")
          } else {
            this.popover.addClass("nipple_on_left").removeClass("nipple_on_right")
          }
        }
      }
      if (Tumblr.Prima.Scrollbar) {
        this.scrollbar = new Tumblr.Prima.Scrollbar(this.$scroll);
        this.scrollbar.on("infinitescroll", b.bind(this.load_more, this))
      }
      this.$scroll.attr("tabindex", "-1").focus()
    }, hide: function () {
      if (this.$container) {
        this.$container.css({top: "", height: ""})
      }
      if (this.$scroll) {
        this.$scroll.css("height", "")
      }
      if (this.scrollbar) {
        this.scrollbar.destroy();
        this.scrollbar = null
      }
      Tumblr.Popover.prototype.hide.apply(this, arguments)
    }, update: function () {
      if (this.scrollbar) {
        this.scrollbar.update()
      }
      this.position_vertical()
    }, load_more: function () {
      if (this.is_scroll_disabled || this.options.disable_infinite_scroll) {
        return
      }
      this.on_load_more()
    }, position_vertical: function () {
      if (!this.$container || !this.$scroll) {
        return
      }
      var i = Tumblr.Flags.bool("dashboard_refresh") ? 132 : 80;
      var f = 50 - (this.$container.outerHeight(true) * 0.5), g = c(window).height(), j, h, e;
      this.$container.css("top", f);
      if (this.$scroll.height() > g - i) {
        this.$scroll.css("height", g - i)
      }
      e = this.$container.outerHeight(true);
      j = this.$container.offset().top - c(window).scrollTop();
      h = parseInt(this.$container.css("top"), 10);
      if (j < 30) {
        h = h - (j - 30);
        this.$container.css("top", (h < 23) ? h : 23)
      } else {
        if (j + e > g - 30) {
          h = h - ((j + e) - g + 50);
          this.$container.css("top", (h > -(e - 80)) ? h : -(e - 68))
        }
      }
      if (this.scrollbar) {
        this.scrollbar.update()
      }
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/loader.js */
(function (c, b, a) {
  var d = {zIndex: 2000000000, color: "inherit", top: "50%", left: "50%", position: "absolute", className: "leviathan"};

  function e(f) {
    if (!this.start) {
      return new e(f)
    }
    this.created = false;
    this.opts = this.opts || {};
    b.extend(this.opts, e.defaults, d, f)
  }

  e.defaults = {};
  e.prototype = {
    start: function (f) {
      if (typeof f !== "object") {
        f = false
      }
      if (f && f instanceof jQuery) {
        f = f[0]
      }
      if (!this.created && !f) {
        return false
      }
      if (!f) {
        f = this.$target[0]
      }
      this.destroy();
      this.uid = this._uid();
      this.$target = c(f);
      this.$target.data("loader-uid", this.uid);
      this.el = this._html();
      this.$target.append(this.el);
      this.$loader = c("#loader_" + this.uid);
      this._init();
      return this
    }, stop: function () {
      if (typeof this.$loader !== "undefined") {
        this.$loader.hide();
        this.$loader.removeClass("animate")
      }
      return this
    }, destroy: function () {
      this.stop();
      if (typeof this.$loader !== "undefined") {
        this.$loader.remove()
      }
      if (typeof this.$target !== "undefined") {
        this.$target.removeData("loader-uid")
      }
      return this
    }, _init: function () {
      this.created = true;
      if (this.opts.color !== "auto") {
        c(".Knight-Rider-bar", this.$loader).css("background-color", this.opts.color)
      }
      this.$loader.css("position", this.opts.position);
      this.$loader.css("z-index", this.opts.zIndex);
      this.$loader.css("top", this.opts.top);
      this.$loader.css("left", this.opts.left);
      this.$loader.show()
    }, _uid: function () {
      return Math.floor(Math.random() * 10000000)
    }, _html: function () {
      return '<div id="loader_' + this.uid + '" class="Knight-Rider-loader centered animate ' + this.opts.className + '"><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div></div>'
    }
  };
  a.Loader = e
})(jQuery, _, Tumblr);
/*! scripts/peepr.js */
(function (d, c, f, a) {
  var e = {
    "click .ui_peepr_arrows .previous_arrow": "__previous_arrow_click",
    "click .ui_peepr_arrows .next_arrow": "__next_arrow_click",
    "click .refresh": "__refresh_click",
    'click .post a.post_avatar_link:not(".animating")': "__link_click",
    'click .post a.post_sub_avatar:not(".animating")': "__link_click",
    'click .post .post_info_link:not(".reblog_follow_button")': "__link_click",
    "click .post .asker .name": "__link_click",
    "click .post .avatar a": "__link_click",
    "click .tumblelog_popover .indash_header_wrapper .avatar": "__link_click",
    "click .tumblelog_popover .indash_header_wrapper .name a": "__link_click",
    "click .tumblelog_popover .indash_header_wrapper .header_image a": "__link_click",
    "click .tumblelog_popover .indash_header_wrapper .avatar a": "__link_click",
    "click .post_micro .post_glass a": "__link_click",
    "click .follower .avatar": "__link_click",
    "click .follower .name a": "__link_click",
    "click .crushes .crush": "__link_click",
    "click .notification .username": "__link_click",
    "click .notification .avatar_frame": "__link_click",
    "click .notification .preview_frame": "__link_click",
    "click .ui_tops .tops_fans .ui_jumbo_avatar": "__link_click",
    "click .ui_tops .tops_post a": "__link_click",
    'click #ui_activity_feed .ui_note a:not(".block, .note_follow")': "__link_click",
    "click .user_list .follow_list_item_blog": "__link_click",
    "click #popover_search .blog .result_link": "__link_click",
    "click .post_notes .popover a.tumblelog": "__link_click",
    "click .post_notes .popover a.source_tumblelog": "__link_click",
    "click .post_notes .popover a.avatar_frame": "__link_click",
    "click .post .tumblr_blog": "__link_click",
    "click .radar a.radar_avatar": "__link_click",
    "click .radar a.radar_superglass": "__link_click",
    "click .radar a.thumbnail_anchor": "__link_click",
    "click .dockable_video_embed  a.tumblelog_info": "__link_click",
    "click #dashboard_controls_open_blog #open_blog_link": "__link_click",
    "click .members_list .member_avatar": "__link_click",
    "click .members_list .member_name": "__link_click",
    "click .recommended-unit-container .avatar a": "__link_click",
    "click .recommended-unit-container .header_image a": "__link_click",
    "click [data-peepr]": "__data_click"
  };
  if (Tumblr.Flags.bool("allow_edit_appearance_in_popover")) {
    c.assign(e, {"click .tumblelog_popover .navigation button.customize_button": "__customize_button_click",})
  }
  var b = f.View.extend({
    el: "body", events: e, initialize: function (g) {
    }, __data_click: function (k) {
      k.preventDefault();
      var g = d(k.currentTarget);
      var j = d(k.target);
      if (g.hasClass("no_pop") || j.hasClass("no_pop")) {
        return
      }
      var i = g.data("peepr");
      var h = g.attr("href");
      var l = i && i.tumblelog;
      if (g.is("a") && !Tumblr.Prima.Url.isTumblelogUrl(h) && !Tumblr.Prima.Url.isTumblelogShortUrl(h)) {
        l = false
      }
      if (!(k.ctrlKey || k.metaKey) && l) {
        this.open_tumblelog(i.tumblelog, i.postId, i.searchTagTerm)
      } else {
        if (h && Tumblr.Prima.Url.hasAllowedProtocol(h)) {
          window.open(h)
        }
      }
    }, __link_click: function (i) {
      i.preventDefault();
      i.stopPropagation();
      if (Tumblr.Glass && Tumblr.Glass.visible) {
        Tumblr.Glass.hide()
      }
      var g = d(i.currentTarget);
      var h = g.attr("href") || "";
      if (!h && g.closest(".ui_avatar_link").length > 0) {
        h = g.closest(".ui_avatar_link").attr("href")
      }
      if (!(i.ctrlKey || i.metaKey) && Tumblr.Prima.Url.isTumblelogUrl(h)) {
        this.open_url(h)
      } else {
        if (!g.hasClass("no_pop") && Tumblr.Prima.Url.hasAllowedProtocol(h)) {
          window.open(h)
        }
      }
      return false
    }, __customize_button_click: function (h) {
      h.preventDefault();
      h.stopPropagation();
      var g = d(h.currentTarget);
      var j = g.data("settings-url") || "";
      var i = g.data("blog-url" || "");
      if (!(h.ctrlKey || h.metaKey) && Tumblr.Prima.Url.isTumblelogUrl(i)) {
        this.edit_appearance = true;
        this.open_url(i)
      } else {
        if (Tumblr.Prima.Url.hasAllowedProtocol(j)) {
          window.open(j)
        }
      }
      return false
    }, open_url: function (i) {
      var g = Tumblr.Prima.Url.parseTumblelogUrl(i);
      var j = g.tumblelog_name || false;
      var h = g.post_id || false;
      if (j && h) {
        this.current_tumblelog = j;
        this.current_post_id = h;
        this.open_page(j + "/" + h)
      } else {
        if (j) {
          this.current_tumblelog = j;
          this.open_page(j)
        } else {
          if (Tumblr.Prima.Url.hasAllowedProtocol(i)) {
            window.open(i)
          }
        }
      }
    }, open_tumblelog: function (k, i, g, j) {
      this.context = j || {};
      var h = (i) ? (k + "/" + i) : k;
      this.current_tumblelog = k;
      this.current_post_id = i;
      this.open_page(h, g)
    }, open_page: function (h, g) {
      if (!h) {
        return
      }
      Tumblr.Events.trigger("peepr-open-request", {
        url: h,
        tumblelog_name: this.current_tumblelog,
        post_id: this.current_post_id,
        editing_appearance: this.edit_appearance,
        searchTagTerm: g
      });
      this.edit_appearance = false;
      this.current_post_id = null;
      return
    }
  });
  a.Peepr = Tumblr.Flags.bool("indash_blogs") ? b : c.noop
})(jQuery, _, Backbone, Tumblr);
/*! scripts/application/popover_legal.js */
(function (c, d, b, a) {
  a.LegalPopover = d.View.extend({
    initialize: function () {
      if (!this.$el.length) {
        return
      }
      this.popover = new Tumblr.Popover({
        el: this.$el,
        glassless: true,
        glassless_options: {prevent_clicks: true},
        on_show: b.bind(function () {
          this.$el.addClass("show");
          this.$el.closest("#sidebar_footer_nav").addClass("show_popover");
          this.close_on_scroll()
        }, this),
        on_hide: b.bind(function () {
          this.$el.removeClass("show");
          this.$el.closest("#sidebar_footer_nav").removeClass("show_popover")
        }, this)
      });
      this.popover_button = this.$el.find(".popover_legal_link");
      this.popover_button.on("click", b.bind(function () {
        this.popover.show();
        return false
      }, this));
      this.update_position()
    }, update_position: function () {
      var e = Math.floor(this.popover.popover.outerWidth() / 2);
      this.popover.popover.css({marginLeft: -e + "px"})
    }, close_on_scroll: function () {
      c(window).on("scroll.legalpopover", b.bind(function () {
        this.popover.hide();
        c(window).off("scroll.legalpopover")
      }, this))
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/popover_search_base.js */
(function (c, d, b, a) {
  a.BaseSearchPopover = d.View.extend({
    el: "#user_tools", initialize: function (e) {
      this.options = e || {};
      this.popover_selector = this.options.popover_selector || "#popover_tracked_tags";
      this.$search_field = this.$("#search_field");
      this.$search_form = this.$("#search_form");
      this.$search_query = this.$("#search_query");
      this.$popover = this.$(this.popover_selector);
      this.$tracked_tags = this.$(this.popover_selector + " .tracked_tags");
      this.winRect = Tumblr.Prima.DOMEventor.rect();
      this.popover = new Tumblr.Popover({
        el: this.$search_query,
        glassless: true,
        glassless_options: {click_root: this.$search_field, prevent_clicks: true},
        popover: this.$popover,
        disable_auto_show: true,
        on_show: b.bind(function () {
          this.bind_key_nav();
          this.resize_view();
          this.init_scroll()
        }, this),
        on_hide: b.bind(function () {
          c("#unread_tag_notice").show();
          c("#search_query").addClass("with_unread");
          c(".ui_search").removeClass("active");
          this.$search_field.removeClass("active");
          this.unbind_key_nav();
          this.destroy_scroll()
        }, this)
      });
      this.cached_popover_height = this.popover.popover.height();
      this.$scrollable_container = this.$el.find(".popover_scroll");
      this.scrollbar = null;
      this.setup_autocomplete();
      this.keyevents = {bind_key_down: b.bind(this.keydown, this), bind_key_up: b.bind(this.keyup, this)};
      Tumblr.Events.on("DOMEventor:flatresize", b.debounce(this.resize_view, 300).bind(this));
      Tumblr.Events.on("SearchPopover:update", b.debounce(this.on_update, 300).bind(this))
    }, init_scroll: function () {
      if (!this.scrollbar) {
        this.scrollbar = new Tumblr.Prima.Scrollbar(this.$scrollable_container)
      }
    }, destroy_scroll: function () {
      if (this.scrollbar) {
        this.scrollbar.destroy();
        this.scrollbar = null
      }
    }, resize_view: function () {
      var e = {}, f = this.popover.popover;
      if ((this.cached_popover_height + f.position().top > this.winRect.windowHeight)) {
        if ((f.height() + f.position().top) > this.winRect.windowHeight - 200) {
          e = {"max-height": this.winRect.windowHeight - 200 + "px", "overflow-y": "auto"};
          this.$scrollable_container.css(e)
        }
      } else {
        e = {"max-height": "auto", overflow: "visible"};
        this.$scrollable_container.css(e)
      }
    }, on_update: function () {
      this.$scrollable_container.css({"max-height": "auto", overflow: "visible"});
      this.cached_popover_height = this.popover.popover.height();
      this.resize_view()
    }, setup_autocomplete: function () {
    }, focus_search_query: function () {
    }, mouseenter: function () {
      if (this.in_popover(this.in_focus())) {
        this.in_focus().blur()
      }
    }, has_children: function (e) {
      if (!e) {
        return false
      }
      return (e.children().length > 0) ? true : false
    }, click_popover: function (f) {
    }, bind_key_nav: function () {
      c(document).off("keydown", this.keyevents.bind_key_down);
      c(document).off("keyup", this.keyevents.bind_key_up);
      c(document).on("keydown", this.keyevents.bind_key_down);
      c(document).on("keyup", this.keyevents.bind_key_up)
    }, unbind_key_nav: function () {
      c(document).off("keyup", this.keyevents.bind_key_up);
      c(document).off("keydown", this.keyevents.bind_key_down)
    }, next: function () {
      this.$search_query.blur();
      this.currentIndex++;
      this.set_active("next")
    }, previous: function () {
      this.$search_query.blur();
      this.currentIndex--;
      this.set_active("previous")
    }, set_active: function (e) {
    }, in_focus: function () {
      return c(document.activeElement)
    }, contains: function (e) {
      return (this.in_popover(e) || this.$search_query.is(e)) ? true : false
    }, in_popover: function (e) {
      return this.$popover.has(e).length
    }, keyup: function (f) {
      if (f.keyCode === 9) {
        if (!this.contains(this.in_focus())) {
          this.popover.hide();
          this.unbind_key_nav();
          this.in_focus().blur()
        }
      }
    }, keydown: function (f) {
      switch (f.keyCode) {
        case 27:
          this.$search_query.blur();
          return;
        case 38:
          f.preventDefault();
          this.previous();
          break;
        case 40:
          f.preventDefault();
          this.next();
          break;
        default:
          break
      }
    }, submit: function () {
      if (c.trim(this.$search_query.val()) === "") {
        return false
      }
      return true
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/popover_reply.js */
(function (c, d, b, a) {
  a.ReplyPopover = Tumblr.PopoverWithForm.extend({
    template: "#post_reply_form",
    events: {"input textarea": "check_form_state", "keydown textarea": "on_keydown"},
    initialize: function (e) {
      this.options = e || {};
      var f = b.template(c(this.template).html());
      this.$el.html(f());
      this.submit_button = this.$("button");
      this.textarea = this.$("form textarea");
      this.check_form_state();
      this.is_empty = true;
      b.extend(this.options, {on_hide: this.on_hide, on_show: this.on_show});
      Tumblr.PopoverWithForm.prototype.initialize.apply(this, arguments)
    },
    on_keydown: function (f) {
      this.check_form_state();
      if (!this.is_empty && (f.ctrlKey || f.metaKey) && f.which === 13) {
        f.preventDefault();
        this.submit_form()
      }
    },
    check_form_state: function () {
      this.is_empty = (this.textarea[0].value.length === 0);
      this.submit_button.attr("disabled", this.is_empty)
    },
    on_show: function () {
      this.position()
    },
    on_hide: function () {
      this.$el.removeClass("active");
      this.trigger("close")
    },
    submit_form: function (f) {
      if (f) {
        f.preventDefault()
      }
      this.submit_button.attr("disabled", true);
      this.submit_button.html(this.submit_button.data("label-loading"));
      var e = this.model.reply(this.textarea.val());
      e.done(b.bind(this.on_success, this))
    },
    on_success: function () {
      this.model.set("replied_to", true);
      this.trigger("success");
      this.$el.find("button").attr("disabled", false);
      this.$el.find("textarea").val("");
      this.hide();
      this.submit_button.html(this.submit_button.data("label"))
    }
  });
  a.ReplyButtons = {
    init: function () {
      var e = {};
      c("#posts").on("click", ".reply_button", function (f) {
        if (f.target !== f.currentTarget) {
          return
        }
        f.stopPropagation();
        f.preventDefault();
        var g = f.currentTarget.id;
        if (!e[g]) {
          e[g] = new ReplyPopover({el: c(f.target)})
        }
        c(f.currentTarget).addClass("active");
        e[g].show()
      })
    }
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/popover_sharing_base.js */
(function (c, b, e, a) {
  var d = a.Popover.extend({
    events: {
      "click .share_email": "__email_trigger_click",
      "click .share_facebook": "__share_facebook_click",
      "click .share_twitter": "__share_twitter_click",
      "click .share_permalink": "__share_permalink_click",
      "click .cancel": "__cancel_click",
      "input .email_address": "__email_form_input",
      "input .twitter .share_message": "__share_twitter_input",
      "change .reply_to_input": "__reply_to_change",
      "keydown .share_form": "__submit_keydown",
      "submit .share_form": "__submit"
    }, __email_trigger_click: function (f) {
      f.preventDefault();
      this._toggle_email_form()
    }, __email_form_input: function () {
      var f = a.SharePopoverBase.validate_email(this.$email_address.val());
      this.$submit_button.attr("disabled", !f)
    }, __share_facebook_click: function (f) {
      f.preventDefault();
      this._share_facebook()
    }, __share_twitter_click: function (f) {
      f.preventDefault();
      this._share_twitter()
    }, __share_twitter_input: function (g) {
      g.preventDefault();
      var f = a.SharePopoverBase.validate_twitter(this.$share_message.val(), this.$character_count);
      this.$submit_button.attr("disabled", !f)
    }, __share_permalink_click: function () {
      this.reset_and_hide()
    }, __cancel_click: function (f) {
      f.preventDefault();
      this._cancel_or_close()
    }, __reply_to_change: function (g) {
      if (!a.Cookie) {
        return
      }
      var f = c(g.currentTarget).is(":checked");
      a.Cookie.set("share_popover_reply_to", f, 365 * 24 * 60 * 60)
    }, __submit: function () {
      this.submit_form();
      return false
    }, __submit_keydown: function (f) {
      if (f.keyCode === 13 && (f.ctrlKey || f.metaKey || f.altKey)) {
        f.preventDefault();
        f.stopPropagation();
        this.submit_form()
      }
    }, __submit_success: function () {
      this.$status.show();
      this._fadeout_popover()
    }, __submit_error: function () {
      this.$error_status.html(this.error_text);
      this.$submit_button.html(this.$submit_button.data("label"));
      this.$submit_button.attr("disabled", false);
      this.$error_status.addClass("active")
    }, _share_twitter: function () {
      if (this.twitter_username) {
        this.$service_cancel.show();
        this.$submit_button.html("Tweet");
        this.$share_form.data("type", "twitter");
        this.$share_label.text("@" + this.twitter_username);
        this.$share_message.val(" [URL]");
        this.$share_form.addClass("active");
        this.$share_options.removeClass("active");
        this.$share_message.get(0).setSelectionRange(0, 0);
        a.SharePopoverBase.validate_twitter(this.$share_message.val(), this.$character_count);
        this.$share_message.attr("placeholder", "");
        this.$submit_button.attr("disabled", false);
        this.$share_form.addClass("twitter");
        if (this.$share_form.hasClass("active") && this.placeholder_supported) {
          this.$share_message.focus();
          this.$share_message.get(0).setSelectionRange(0, 0)
        }
      } else {
        this._share_twitter_fallback()
      }
    }, _share_twitter_fallback: function () {
      window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(this.tiny_url || this.url), "twitter-share-dialog", "width=626,height=258");
      this.reset_and_hide()
    }, _share_facebook: function () {
      if (this.share_to_facebook) {
        c.ajax({
          url: "/svc/facebook_status",
          type: "post",
          data: {form_key: c("#tumblr_form_key").attr("content")},
          success: b.bind(this._share_facebook_success, this),
          error: b.bind(this._share_facebook_fallback, this)
        })
      } else {
        this._share_facebook_fallback()
      }
    }, _share_facebook_success: function (f) {
      if (f) {
        this.$service_cancel.show();
        this.$submit_button.html(this.$submit_button.data("label"));
        this.$share_form.data("type", "facebook");
        this.$share_label.text(f);
        this.$submit_button.attr("disabled", false);
        this.$share_form.addClass("facebook");
        this.$share_options.toggleClass("active");
        this.$share_form.toggleClass("active");
        if (this.$share_form.hasClass("active") && this.placeholder_supported) {
          this.$share_message.focus()
        }
      } else {
        this._share_facebook_fallback()
      }
    }, _share_facebook_fallback: function () {
      window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.url), "facebook-share-dialog", "width=626,height=436");
      this.reset_and_hide()
    }, _toggle_email_form: function () {
      this.$submit_button.html(this.$submit_button.data("label"));
      this.$share_form.data("type", "email");
      this.$share_options.toggleClass("active");
      this.$share_form.toggleClass("active");
      this.$reply_to.addClass("active");
      if (this.$share_form.hasClass("active") && this.is_placeholder_supported) {
        this.$email_address.focus()
      }
    }, _fadeout_popover: function () {
      setTimeout(b.bind(function () {
        this.popover.fadeOut(150, b.bind(this.reset_and_hide, this))
      }, this), 1250)
    }, _position_popover: function () {
      this.popover.css({right: "auto", left: (this.$button.length) ? this.$button.offset().left : ""});
      this.position()
    }, _cancel_or_close: function () {
      var f = this.$email_address.val() || "";
      if (this.$share_form.data("type") === "email" && f.length) {
        this.$email_address.val("");
        this.$submit_button.attr("disabled", true)
      } else {
        this.reset_form()
      }
    }, initialize: function (f) {
      this.options = b.extend({
        url: "",
        tiny_url: "",
        popover: null,
        button: null,
        on_hide: b.bind(this.reset_and_hide, this)
      }, f);
      this.url = this.options.url;
      this.tiny_url = this.options.tiny_url;
      this.is_placeholder_supported = a.SharePopoverBase.placeholder_support();
      this.$button = c(this.options.button);
      this.cache_selectors();
      if (a.Cookie && a.Cookie.get("share_popover_reply_to") === "true") {
        this.$reply_to_input.prop("checked", true)
      }
      Tumblr.Events.trigger("keycommands:suspend");
      a.Popover.prototype.initialize.call(this, this.options)
    }, cache_selectors: function () {
      this.$share_form = this.$(".share_form");
      this.$share_label = this.$(".share_label");
      this.$reply_to = this.$(".reply_to");
      this.$share_options = this.$(".share_options");
      this.$submit_button = this.$("button.email_submit");
      this.$email_address = this.$(".email_address");
      this.$share_message = this.$(".share_message");
      this.$character_count = this.$(".character_count");
      this.$service_cancel = this.$(".cancel.service");
      this.$status = this.$(".status");
      this.$error_status = this.$(".error_status");
      this.$status_message = this.$(".status_message");
      this.$reply_to_input = this.$(".reply_to_input");
      this.sent_text = this.$status.data("sent") || "";
      this.error_text = this.$status.data("error") || "";
      if (c(".share_twitter").length) {
        this.twitter_username = c(".share_twitter").data("twitter-username")
      }
    }, show: function () {
      this._position_popover();
      this.listenTo(Tumblr.Events, "DOMEventor:flatresize", this._position_popover);
      a.Popover.prototype.show.call(this)
    }, hide: function () {
      Tumblr.Events.trigger("keycommands:resume");
      this.stopListening(Tumblr.Events, "DOMEventor:flatresize");
      a.Popover.prototype.hide.call(this)
    }, reset_form: function () {
      this.$service_cancel.hide();
      this.$submit_button.html(this.$submit_button.data("label"));
      this.$submit_button.attr("disabled", true);
      this.$email_address.val("");
      this.$share_message.val("");
      this.$share_message.attr("placeholder", this.$share_message.attr("title"));
      this.$share_options.addClass("active");
      this.$share_form.removeClass("active");
      this.$share_form.removeClass("facebook");
      this.$share_form.removeClass("twitter");
      this.$status.hide();
      this.$status_message.html(this.sent_text);
      this.$reply_to.removeClass("active");
      this.$error_status.removeClass("active")
    }, reset_and_hide: function () {
      this.reset_form();
      this.$el.removeClass("active");
      this.popover.hide()
    }, submit_form: function () {
      this.$submit_button.attr("disabled", true);
      this.$submit_button.html(this.$submit_button.data("label-sending"))
    },
  }, {
    placeholder_support: function () {
      var f = document.createElement("input");
      return ("placeholder" in f)
    }, validate_email: function (g) {
      var f = /\S+@\S+\.\S+/;
      return f.test(g)
    }, validate_twitter: function (k, j) {
      var i = k.match(/\[URL\]/ig);
      var g = (i) ? (i.length * 24) : 0;
      var h = 140 - k.length - g;
      var f = (j && j.length) ? j : false;
      if (f) {
        f.html(h);
        if (h < 10) {
          f.css("color", "#d95e40")
        } else {
          if (h < 20) {
            f.css("color", "#444444")
          } else {
            f.css("color", "#bbbbbb")
          }
        }
      }
      if (h < 0 || h === 140) {
        return false
      }
      return true
    }
  });
  a.SharePopoverBase = d
})(jQuery, _, Backbone, Tumblr);
/*! scripts/application/popover_sharing.js */
(function (d, e, b, a) {
  var c = a.SharePopoverBase.extend({
    _fadeout_popover: function () {
      this.popover.addClass("flyaway");
      setTimeout(b.bind(function () {
        this.popover.removeClass("flyaway").hide();
        this.reset_and_hide()
      }, this), 1000)
    }, cache_selectors: function () {
      a.SharePopoverBase.prototype.cache_selectors.call(this);
      if (d(".share_twitter").length) {
        this.$twitter_username = d(".share_twitter").data("twitter-username")
      }
      if (d(".share_facebook").length) {
        this.$share_to_facebook = d(".share_facebook").data("has-facebook")
      }
      this.url = this.$share_options.data("post-url");
      this.tiny_url = this.$share_options.data("post-tiny-url")
    }, submit_form: function () {
      var f = "/svc/share/email";
      switch (this.$share_form.data("type")) {
        case"facebook":
          f = "/svc/share/facebook";
          break;
        case"twitter":
          f = "/svc/share/twitter";
          break
      }
      var g = this.$share_form.serializeArray();
      g.push({name: "form_key", value: d("#tumblr_form_key").attr("content")});
      d.ajax({
        url: f,
        type: "post",
        data: g,
        success: b.bind(this.__submit_success, this),
        error: b.bind(this.__submit_error, this)
      });
      a.SharePopoverBase.prototype.submit_form.call(this)
    }
  });
  a.ShareButtons = {
    init: function () {
      var f = {};
      d("#posts").on("click", ".share_social_button", function (i) {
        if (i.currentTarget !== i.target) {
          return
        }
        var g = d(i.currentTarget).closest(".post");
        var h = d(i.currentTarget);
        var k = d(i.currentTarget).attr("id");
        var j = (g.length) ? g.data("json") : {};
        if (Tumblr.Prima && Tumblr.Prima.SharePopover && Tumblr.Flags && Tumblr.Flags.bool("enable_prima_share_popover")) {
          f[k] = new Tumblr.Prima.SharePopover({popoverData: j.share_popover_data, pinnedTarget: h}).render()
        } else {
          if (!f[k]) {
            f[k] = new c({
              el: h,
              wait: true,
              directional: true,
              no_autofocus: true,
              disable_auto_show: true,
              glassless: true
            }).show();
            h.addClass("active")
          }
        }
      })
    }
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/css_webfonts.js */
(function (a) {
  a.webfonts = {
    "1785 GLC Baskerville": {
      display_name: "1785 Baskerville",
      family: "'1785 GLC Baskerville', serif",
      path: "1785glcbaskerville",
      _v: "1"
    },
    "Alternate Gothic": {
      display_name: "Alternate Gothic",
      family: "'Alternate Gothic', sans-serif",
      path: "alternategothic",
      _v: "3"
    },
    Arquitecta: {display_name: "Arquitecta", family: "'Arquitecta', sans-serif", path: "arquitecta", _v: "3"},
    Avalon: {display_name: "Avalon", family: "'Avalon', sans-serif", path: "avalon", _v: "1"},
    Baskerville: {display_name: "Baskerville", family: "Baskerville, 'Times New Roman', Times, serif"},
    "Bodoni Recut FS": {display_name: "Bodoni", family: "'Bodoni Recut FS', serif", path: "bodonirecutfs", _v: "3"},
    Bookmania: {display_name: "Bookmania", family: "'Bookmania', serif", path: "bookmania", _v: "1"},
    "Brutal Type": {display_name: "Brutal Type", family: "'Brutal Type', sans-serif", path: "brutaltype", _v: "1"},
    Calluna: {display_name: "Calluna", family: "'Calluna', serif", path: "calluna", _v: "3"},
    "Calluna Sans": {display_name: "Calluna Sans", family: "'Calluna Sans', sans-serif", path: "callunasans", _v: "3"},
    Capita: {display_name: "Capita", family: "'Capita', serif", path: "capita", _v: "1"},
    "Caslon FS": {display_name: "Caslon FS", family: "'Caslon FS', serif", path: "caslonfs", _v: "3"},
    "Clarendon Text Pro": {
      display_name: "Clarendon",
      family: "'Clarendon Text Pro', serif",
      path: "clarendontextpro",
      _v: "3"
    },
    "Clearface FS": {display_name: "Clearface", family: "'Clearface FS', serif", path: "clearface", _v: "4"},
    "Courier New": {display_name: "Courier New", family: "'Courier New', Courier, monospace"},
    Futura: {display_name: "Futura", family: "Futura, 'Century Gothic', AppleGothic, sans-serif"},
    "Garamond Classic FS": {
      display_name: "Garamond",
      family: "'Garamond Classic FS', serif",
      path: "garamondclassicfs",
      _v: "3"
    },
    Georgia: {
      display_name: "Georgia",
      family: "Georgia, Palatino, 'Palatino Linotype', Times, 'Times New Roman', serif"
    },
    Gibson: {display_name: "Gibson", family: "'Gibson', sans-serif", path: "gibson", _v: "3"},
    "Grumpy Black 48": {display_name: "Grumpy", family: "'Grumpy Black 48', serif", path: "grumpyblack48", _v: "3"},
    "Helvetica Neue": {display_name: "Helvetica", family: "'Helvetica Neue', Arial, Helvetica, sans-serif"},
    "Lorimer No 2": {display_name: "Lorimer No 2", family: "'Lorimer No 2', sans-serif", path: "lorimerno2", _v: "3"},
    "Lucida Sans": {
      display_name: "Lucida Sans",
      family: "'Lucida Sans', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif"
    },
    "News Gothic FS": {
      display_name: "News Gothic",
      family: "'News Gothic FS', sans-serif",
      path: "newsgothicfs",
      _v: "3"
    },
    "Pratt Pro": {display_name: "Pratt Pro", family: "'Pratt Pro', serif", path: "prattpro", _v: "1"},
    Quadrat: {display_name: "Quadrat", family: "'Quadrat', serif", path: "quadrat", _v: "1"},
    "Sofia Pro": {display_name: "Sofia Pro", family: "'Sofia Pro', sans-serif", path: "sofiapro", _v: "2"},
    Spade: {display_name: "Spade", family: "'Spade', serif", path: "spade", _v: "1"},
    "Square Serif": {display_name: "Square Serif", family: "'Square Serif', serif", path: "squareserif", _v: "4"},
    Streetscript: {display_name: "Streetscript", family: "'Streetscript', sans-serif", path: "streetscript", _v: "1"},
    "Typewriter FS": {display_name: "Typewriter", family: "'Typewriter FS', serif", path: "typewriterfs", _v: "1"},
    Verdana: {display_name: "Verdana", family: "Verdana, Geneva, Tahoma, sans-serif"},
    Ziclets: {display_name: "Ziclets", family: "'Ziclets', serif", path: "ziclets", _v: "1"}
  }
})(Tumblr);
/*! scripts/color_utilities.js */
(function (c, b, a) {
  var d = {
    rgb_to_hex: function (h, f, e) {
      return "#" + ((1 << 24) + (h << 16) + (f << 8) + e).toString(16).slice(1)
    }, hex_to_rgb: function (f) {
      f = new String(f).replace(/[^0-9a-f]/gi, "");
      if (f.length < 6) {
        f = f[0] + f[0] + f[1] + f[1] + f[2] + f[2]
      }
      var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);
      return e ? {r: parseInt(e[1], 16), g: parseInt(e[2], 16), b: parseInt(e[3], 16)} : null
    }, rgb_to_hsv: function (l, k, f) {
      var j = Math.min(Math.min(l, k), f);
      var e = Math.max(Math.max(l, k), f);
      var h = e - j;
      var i = {h: 6, s: e ? ((e - j) / e) : 0, v: (e / 255)};
      if (!h) {
        i.h = 0
      } else {
        if (e === l) {
          i.h += (k - f) / h
        } else {
          if (e === k) {
            i.h += 2 + (f - l) / h
          } else {
            i.h += 4 + (l - k) / h
          }
        }
      }
      i.h = (60 * i.h) % 360;
      return i
    }, hsv_to_rgb: function (j, q, p) {
      var e, k, n;
      if (!q) {
        e = k = n = p
      } else {
        e = k = n = 0;
        var i = ((j + 360) % 360) / 60;
        var l = p * q;
        var f = p - l;
        var o = l * (1 - Math.abs(i % 2 - 1));
        if (i < 1) {
          e = l;
          k = o
        } else {
          if (i < 2) {
            e = o;
            k = l
          } else {
            if (i < 3) {
              k = l;
              n = o
            } else {
              if (i < 4) {
                k = o;
                n = l
              } else {
                if (i < 5) {
                  n = l;
                  e = o
                } else {
                  n = o;
                  e = l
                }
              }
            }
          }
        }
        e += f;
        k += f;
        n += f
      }
      return {r: Math.round(255 * e), g: Math.round(255 * k), b: Math.round(255 * n)}
    }, hex_to_hsv: function (g) {
      g = new String(g).replace(/[^0-9a-f]/gi, "");
      if (g.length < 6) {
        g = g[0] + g[0] + g[1] + g[1] + g[2] + g[2]
      }
      var f = a.ColorUtilities.hex_to_rgb(g);
      var e = a.ColorUtilities.rgb_to_hsv.apply(a.ColorUtilities, b.toArray(f));
      return e
    }, hsv_to_hex: function (i, g, e) {
      var f = a.ColorUtilities.hsv_to_rgb(i, g, e);
      var j = a.ColorUtilities.rgb_to_hex.apply(a.ColorUtilities, b.toArray(f));
      return j
    }, hex_brightness: function (i, q) {
      i = String(i).replace(/[^0-9a-f]/gi, "");
      if (i.length < 6) {
        i = i[0] + i[0] + i[1] + i[1] + i[2] + i[2]
      }
      q = q || 0;
      var o = parseInt(i, 16), j = (q < 0) ? 0 : 255, f = (q < 0) ? -(q) : q, e = o >> 16, m = o >> 8 & 255, s = o & 255, n, k, h;
      n = Math.round((j - e) * f) + e;
      k = Math.round((j - m) * f) + m;
      h = Math.round((j - s) * f) + s;
      return "#" + (16777216 + n * 65536 + k * 256 + h).toString(16).slice(1)
    }, hsv_to_readable: function (e) {
      if (typeof e === "string") {
        e = a.ColorUtilities.hex_to_hsv(e)
      }
      return (e.s < 0.2 && e.v > 0.8) ? "#444" : "#FFF"
    }, compare_colors: function (k, i, o) {
      var g = {upper_bound: 0.8, lower_bound: 0.2, diff_bound: 0.1, hue_bound: 15};
      b.extend(g, o);
      var j = g.upper_bound;
      var n = g.lower_bound;
      var m = g.diff_bound;
      var e = g.hue_bound;
      var h = Math.abs(k.h - i.h);
      var f = Math.abs(k.s - i.s);
      var l = Math.abs(k.v - i.v);
      if (h <= m && f <= m && l <= m) {
        return true
      } else {
        if (f <= m && l <= m) {
          if (f >= j || f <= n && l >= j || l <= n && h <= e) {
            return true
          }
        }
      }
      return false
    }
  };
  a.ColorUtilities = d
})(jQuery, _, Tumblr);
/*! scripts/indash_blog/views/header/popover.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, b, e, a) {
  var c = e.View.extend({
    className: "indash_header_popover",
    defaults: {direction: "left", edit_field: null, template: false, template_data: {}, trigger: null, glassless: true},
    __close: function () {
      this.hide()
    },
    initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.template = this.options.template;
      this.template_data = this.options.template_data;
      this.checkbox_template = b.template(d("#tumblelog_header_checkbox_template").html());
      this.color_picker_template = b.template(d("#tumblelog_header_color_picker_template").html());
      this.is_showing = false;
      this.$popover = null;
      this.popover_view = null;
      a.Popover.register(this)
    },
    render: function () {
      var f = this.template(this.template_data);
      this.$popover = d(f).appendTo(this.$el).hide();
      this.popover_view = new Tumblr.Popover({
        el: this.options.trigger,
        popover: this.$popover,
        glassless: this.options.glassless,
        glassless_options: this.options.glassless_options,
        auto_show: false,
        direction: this.options.direction,
        skip_offset: true,
        on_show: b.bind(function () {
          if (!this.is_showing) {
            Tumblr.Events.trigger("indashblog:popover:show", this, this.options.edit_field);
            this.is_showing = true
          }
        }, this),
        on_hide: b.bind(function () {
          if (this.is_showing) {
            Tumblr.Events.trigger("indashblog:popover:hide", this, this.options.edit_field);
            this.is_showing = false
          }
        }, this)
      });
      return this
    },
    show: function () {
      this.popover_view.show()
    },
    hide: function () {
      if (!this.is_showing) {
        return
      }
      Tumblr.Events.trigger("indashblog:popover:hide", this, this.options.edit_field);
      this.is_showing = false;
      this.popover_view.hide()
    }
  });
  c.instances = [];
  c.register = function (f) {
    this.instances.push(f)
  };
  c.hide_all = function () {
    for (var g = 0, f = this.instances.length; g < f; g++) {
      this.instances[g].hide()
    }
  };
  a.Popover = c
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/info_popover.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, b, e, a) {
  var c = a.Popover.extend({
    template: b.template(d("#tumblelog_header_info_popover_template").html()),
    defaults: {show_flag_button: true},
    events: {
      "click .ask_menu_item": "__ask_menu_item_clicked",
      "click .fan_mail_menu_item": "__fan_mail_menu_item_clicked",
      "click .archive_menu_item": "__archive_menu_item_clicked",
      "click .block": "__block_click",
      "click .toggle_spam": "__toggle_spam_click",
      "click .toggle_nsfw": "__toggle_nsfw_click",
      "click .toggle_suspended": "__toggle_suspended_click",
      "click .panel_menu_item": "__panel_menu_item_clicked",
    },
    __panel_menu_item_clicked: function (f) {
      this.hide()
    },
    __ask_menu_item_clicked: function (f) {
      f.preventDefault();
      Tumblr.Events.trigger("indashblog:tumblelog:ask", {
        recipient: this.model.get("name"),
        anonymous_asks: this.model.get("anonymous_asks")
      });
      this.hide()
    },
    __fan_mail_menu_item_clicked: function (f) {
      f.preventDefault();
      Tumblr.Events.trigger("indashblog:tumblelog:fan_mail", {recipient: this.model.get("name")});
      this.hide()
    },
    __archive_menu_item_clicked: function () {
      this.hide()
    },
    __block_click: function (g) {
      g.preventDefault();
      var f = {blockedTumblelog: this.model.get("name")};
      Tumblr.Prima.Block.confirmBlock(f).then(b.bind(this.__onBlockConfirm, this));
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __onBlockConfirm: function () {
      var f = new Tumblr.Prima.Models.Tumblelog({name: this.model.get("name")});
      f.block().then(b.bind(this._afterBlock, this))
    },
    __toggle_spam_click: function (f) {
      f.preventDefault();
      var g = this.model.toggle_spam();
      g.success(b.bind(function (h) {
        this.model.set("spam", (h.spammer) ? true : false)
      }, this))
    },
    __toggle_nsfw_click: function (f) {
      f.preventDefault();
      var g = this.model.toggle_nsfw();
      g.success(b.bind(function (h) {
        this.model.set("nsfw", h.nsfw)
      }, this))
    },
    __toggle_suspended_click: function (f) {
      f.preventDefault();
      var g = this.model.toggle_suspended();
      g.success(b.bind(function (h) {
        this.model.set("suspended", h.suspended)
      }, this))
    },
    __model_change: function () {
      var f = this.model.toJSON();
      this.$(".toggle_spam").toggleClass("is_flagged", !!(f.spam));
      this.$(".toggle_nsfw").toggleClass("is_flagged", !!(f.nsfw));
      this.$(".toggle_suspended").toggleClass("is_flagged", !!(f.suspended))
    },
    _afterIgnore: function () {
      this.model.set("ignoring", true);
      this.model.set("following", false)
    },
    _afterBlock: function () {
      this.model.set("blocking", true);
      this.model.set("following", false)
    },
    _open_dialog: function (f, g) {
      g = g || b.noop;
      this.is_disabled = true;
      f.fail(b.bind(function () {
        this.is_disabled = this.is_menu_open
      }, this));
      f.done(b.bind(function () {
        this.is_disabled = this.is_menu_open;
        g()
      }, this))
    },
    initialize: function (f) {
      this.$trigger = f.trigger;
      this.targetPost = f.targetPost;
      if (!this.model) {
        return
      }
      var g = this.model.toJSON();
      b.defaults(g, f, this.defaults);
      this.$popover = d(this.template(g)).appendTo(this.$el).hide();
      this.tumblelog = new Tumblr.Prima.Models.Tumblelog({name: this.model.get("name")});
      this.listenTo(this.model, "change", this.__model_change);
      f = b.extend(f, {popover: this.$popover});
      Tumblr.Popover.prototype.initialize.call(this, f)
    },
    show: function () {
      this.position_popover();
      this.listenTo(Tumblr.Events, "DOMEventor:flatresize", this.position_popover);
      Tumblr.Popover.prototype.show.call(this)
    },
    hide: function () {
      this.stopListening(Tumblr.Events, "DOMEventor:flatresize");
      Tumblr.Popover.prototype.hide.call(this)
    },
    position_popover: function () {
      var f = this.$trigger.offset().left + "px";
      this.$popover.css({right: "auto", left: f})
    }
  });
  a.InfoPopover = c
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header_view_compact.js */
var TumblrData = TumblrData || {};
var Events = Tumblr.Events;
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
(function (c, b, e, a) {
  var d = e.View.extend({
    className: "indash_header_compact",
    defaults: {
      current_data: {},
      unfollow_data: {},
      follow_data: {},
      template_data: {},
      on_render: c.noop,
      hide_posts_on_unfollow: false,
      strip_description_line_breaks: false,
      include_info_popover: true
    },
    events: {
      "click .description a": "__description_link_click",
      "click .info_popover_button": "__info_popover_button_clicked",
      "click .follow": "__on_follow_click",
      "click .unfollow": "__on_follow_click",
      'click [data-post-action="remove"]': "__on_remove_click"
    },
    __on_follow_click: function (f) {
      f.preventDefault();
      f.stopPropagation();
      if (!Tumblr.Flags.bool("is_logged_in")) {
        window.open("/follow/" + this.model.get("name"), "_self");
        return
      }
      if (this.model.get("following")) {
        var g = Tumblr.TumblelogActions.confirm_unfollow({
          tumblelog: this.model.get("name"),
          avatar_url: this.model.get("avatar_url") || ""
        });
        this._open_dialog(g, b.bind(function () {
          this.model.save_following({following: false}, this.options.unfollow_data);
          if (this.hide_posts_on_unfollow) {
            this._hide_posts()
          }
        }, this))
      } else {
        this.model.save_following({following: true}, this.options.follow_data)
      }
    },
    __on_remove_click: function (f) {
      f.preventDefault();
      this.destroy()
    },
    __info_popover_button_clicked: function (f) {
      f.preventDefault();
      f.stopPropagation();
      this.info_popover.toggle()
    },
    __description_link_click: function (i) {
      i.preventDefault();
      var f = c(i.currentTarget).attr("href");
      try {
        if (Tumblr.Prima.Url && Tumblr.Prima.Url.hasAllowedProtocol(f)) {
          if (!Tumblr.Prima.Url.isAbsoluteUrl(f)) {
            var h = "http://" + this.model.get("name") + ".tumblr.com/";
            f = (f.charAt(0) === "/") ? f.substr(1) : f;
            f = h + f
          }
          window.open(f, "_blank")
        }
      } catch (g) {
      }
    },
    _render_follow_button: function () {
      if (this.model.get("following")) {
        this.$el.find(".follow").hide();
        this.$el.find(".unfollow").show()
      } else {
        this.$el.find(".unfollow").hide();
        this.$el.find(".follow").show()
      }
    },
    _hide_posts: function () {
      Tumblr.Posts.whereBy({tumblelog: this.model.get("name"), sponsored: false}).invoke("dismiss")
    },
    _open_dialog: function (f, g) {
      g = g || c.noop;
      this.is_disabled = true;
      f.fail(b.bind(function () {
        this.is_disabled = this.is_menu_open
      }, this));
      f.done(b.bind(function () {
        this.is_disabled = this.is_menu_open;
        g()
      }, this))
    },
    _render_inline_styles: function () {
      var j = this.model.get("global_theme_params");
      var g = !!(j.header_image_focused && j.header_stretch && j.show_header_image);
      var i = Tumblr.ColorUtilities.hex_to_hsv(j.background_color);
      var h = Tumblr.ColorUtilities.hex_to_hsv(j.link_color);
      var f = j.link_color;
      if (Tumblr.ColorUtilities.compare_colors(h, i)) {
        f = Tumblr.ColorUtilities.hsv_to_readable(i)
      }
      if (!g) {
        this.$(".navigation .nav_icon").css("color", f);
        this.$(".navigation .blog_name").css("color", f);
        this.$(".navigation .post_dismiss").css("color", f);
        this.$(".navigation .dismiss_icon").css("color", f);
        this.$(".navigation button").css({color: j.background_color, "background-color": f})
      }
      this.$(".description a").css("color", j.link_color);
      return this
    },
    _render_font_styles: function () {
      if (!Tumblr.webfonts) {
        return
      }
      var i = this.model.get("global_theme_params");
      if (b.has(Tumblr.webfonts, i.title_font)) {
        var h = b.result(Tumblr.webfonts, i.title_font);
        var f = "webfont_" + h.path;
        if (h.path && !c("head #" + f).length) {
          var g = this.assets_host + "/fonts/" + h.path + "/stylesheet.css";
          g += (b.has(h, "_v")) ? ("?v=" + h._v) : "";
          c("<link>", {id: f, rel: "stylesheet", type: "text/css", href: g}).appendTo(c("head"))
        }
      }
    },
    __log_recommendation_dismissal: function () {
      c.ajax({
        method: "POST",
        url: "/svc/search/log_dismissal",
        data: {tumblelog_name: this.model.get("name")},
        with_form_key: true
      })
    },
    initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.hide_posts_on_unfollow = this.options.hide_posts_on_unfollow;
      this.current_data = this.options.current_data;
      this.on_render = this.options.on_render;
      this.targetPost = this.options.targetPost;
      this.is_rendered = false;
      this.assets_host = Tumblr.assets_host || "";
      this.template = b.template(c("#tumblelog_header_template").html());
      this.$description = null;
      this.$description_inner = null;
      this.listenTo(this.model, "add:global_theme_params", this.render);
      this.listenTo(this.model, "change:global_theme_params", this.render);
      this.listenTo(this.model, "change:following", this._render_follow_button);
      if (!b.isEmpty(this.current_data)) {
        var g = b.extend({}, this.current_data, this.model.toJSON());
        this.model.set(g, {silent: true})
      }
    },
    render: function () {
      var g = this.model.toJSON();
      g.following || (g.following = false);
      if (this.is_rendered || !g.global_theme_params) {
        return this
      }
      var h = b.result(Tumblr.webfonts, g.global_theme_params.title_font);
      var f = Tumblr.ColorUtilities.hex_to_rgb(g.global_theme_params.title_color);
      this.$el.html(this.template(b.merge({}, g, {
        show_navigation: true,
        show_share_controls: false,
        show_user_controls: true,
        show_follow_button: true,
        show_dismiss_controls: false,
        title_font_family: (h) ? h.family : false,
        title_color_rgb: String(b.values(f).join(",")),
        is_verified: false
      }, this.options.template_data)));
      this.$description = this.$(".description");
      this.$description_inner = this.$(".description .description_inner");
      this._render_font_styles();
      this._render_inline_styles();
      if (Tumblr.Flags.bool("is_logged_in") && this.options.include_info_popover) {
        this.info_popover = new Tumblr.TumblelogPopover.PopticaInfoPopover({
          el: this.$el,
          auto_show: false,
          trigger: this.$el.find(".info_popover_button"),
          recipient: this.model.get("name"),
          asks: this.model.get("asks"),
          anonymous_asks: this.model.get("anonymous_asks"),
          url: this.model.get("url"),
          skip_glass: true,
          model: this.model,
          targetPost: this.targetPost || this.$el,
          show_flag_button: !Tumblr.IndashBlog.is_peepr
        })
      }
      this.is_rendered = true;
      this.on_render();
      if (this.$description.length) {
        b.delay(b.bind(this.truncate_description, this), 100);
        if (this.options.strip_description_line_breaks) {
          this.strip_description_line_breaks()
        }
      }
      return this
    },
    strip_description_line_breaks: function () {
      this.$description_inner.find("br").remove();
      var f = this.$description_inner.html();
      var g = f.replace(/[\n\r]/g, " ");
      this.$description_inner.html(g)
    },
    destroy: function () {
      this.$el.fadeOut(500, b.bind(function () {
        this.unbind();
        if (this.$el.parent().hasClass("post_container")) {
          this.$el.parent().remove()
        }
        this.__log_recommendation_dismissal();
        Events.trigger("DOMEventor:updateRect");
        Events.trigger("posts:destroyed", this.$el);
        this.remove()
      }, this))
    },
    truncate_description: function () {
      var i = this.$description_inner.get(0);
      if (i.scrollHeight <= i.clientHeight) {
        return
      }
      var h = this.model.get("global_theme_params");
      var f = h.background_color;
      var g = Tumblr.ColorUtilities.hex_to_rgb(f);
      this.$description.append(this.description_gradient_template({background_color: String(b.values(g).join(","))}))
    },
    description_gradient_template: b.template('            <div class="description_gradient" style="                background: -moz-linear-gradient(top,  rgba(<%= background_color %>,0) 0%, rgba(<%= background_color %>,0.75) 50%, rgba(<%= background_color %>,1) 100%);                background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(<%= background_color %>,0)), color-stop(50%,rgba(<%= background_color %>,0.75)), color-stop(100%,rgba(<%= background_color %>,1)));                background: -webkit-linear-gradient(top,  rgba(<%= background_color %>,0) 0%,rgba(<%= background_color %>,0.75) 50%,rgba(<%= background_color %>,1) 100%);                background: -o-linear-gradient(top,  rgba(<%= background_color %>,0) 0%,rgba(<%= background_color %>,0.75) 50%,rgba(<%= background_color %>,1) 100%);                background: -ms-linear-gradient(top,  rgba(<%= background_color %>,0) 0%,rgba(<%= background_color %>,0.75) 50%,rgba(<%= background_color %>,1) 100%);                background: linear-gradient(to bottom,  rgba(<%= background_color %>,0) 0%,rgba(<%= background_color %>,0.75) 50%,rgba(<%= background_color %>,1) 100%);            "></div>        ')
  });
  a.HeaderCompact = d
})(jQuery, _, Backbone, Tumblr.IndashBlog);
/*! scripts/indash_blog/indash_blog_header_compact.js */

/*! scripts/tumblelog_popover/views/tumblelog_popover.js */
(function (c, b, e, a) {
  var d = e.View.extend({
    popover_recommendations: a.Flags.bool("popover_recommendations"),
    el: "body",
    initialize: function (g) {
      if (a.Flags.bool("indash_blogs") === false) {
        return
      }
      this.options = g || {};
      this.popover_template = b.template(c.trim(this.options.template || c("#tumblelog_popover_template").html()));
      this.cache_timeout = this.options.cache_timeout || 3600000;
      this.mention_hostname = this.options.mention_hostname || "tmblr.co";
      this.hide_posts_on_unfollow = this.options.hide_posts_on_unfollow || false;
      this.$popover = null;
      this.popover = null;
      this.subviews = {};
      this.current_target = null;
      this.current_data = {};
      this.current_tumblelog = "";
      this.current_post = {};
      this.current_mouse_x = 0;
      this.model = {};
      this.hide_timeout = null;
      this.queued_event = null;
      this.hover_bounds = {};
      this.target_bounds = {};
      this.is_open = false;
      this.is_user_mention = false;
      this.is_mobile = !!("ontouchstart" in document.documentElement);
      this.is_poptica = true;
      this.is_menu_open = false;
      this.session_storage_key = (this.is_poptica) ? "optica_header" : "tumblelog_popover";
      this.listenTo(a.Events, "TumblelogPopover:follow", this.on_follow);
      this.listenTo(a.Events, "TumblelogPopover:follow_hover", this.on_follow_hover);
      this.listenTo(a.Events, "TumblelogPopover:unfollow", this.on_unfollow);
      this.listenTo(a.Events, "TumblelogPopover:inserted_posts", this.set_hover_bounds);
      this.listenTo(a.Events, "TumblelogPopover:track_engagement", this.track_engagement);
      this.listenTo(a.Events, "TumblelogPopover:toggle_navigation_menu", this.on_toggle_navigation_menu);
      this.listenTo(a.Events, "TumblelogPopover:navigation_menu_item_clicked", this.on_navigation_menu_item_clicked);
      this.listenTo(a.Events, "peepr:open", this.on_peepr_open);
      this.listenTo(a.Events, "peepr-open-request", this.hide);
      this.listenTo(a.Events, "Dashboard:hide_posts_on_unfollow", this.set_hide_posts_on_unfollow);
      a.Events.trigger("Dashboard:should_hide_posts_on_unfollow");
      var h = ['a.post_avatar_link:not(".animating")', 'a.post_sub_avatar:not(".animating")', "a.reblog-avatar", '.post_info_link:not(".reblog_follow_button")', ".asker .name", ".post .avatar a", '.post_content .post_content_inner a[href*=".tumblr.com"]:not(".tmblr-truncated-link")', '.post_content .post_content_inner a[href*="tmblr.co"]', ".follower .avatar", ".follower .name a", ".crushes .crush", ".notification .username", ".notification .avatar_frame", ".notification .preview_frame", ".ui_tops .tops_fans .ui_jumbo_avatar", ".ui_avatar a", ".user_list .follow_list_item_blog", ".post .tumblr_blog", "a.radar_avatar", "#dashboard_controls_open_blog #open_blog_link", ".members_list .member_avatar", ".members_list .member_name", ".posts_view_masonry a.tumblelog_info", ".js-hover-trigger-TumblelogPopover"];
      var f = c(h.join(","));
      if (this.is_mobile) {
        var j = f.find("a[data-tumblelog-popover]");
        j.addClass("no_pop");
        j.on("touchend", b.bind(this.on_touch_open, this))
      } else {
        this.$el.hoverIntent({selector: h.join(","), over: b.bind(this.on_mouseover, this), out: c.noop})
      }
      if (window.sessionStorage) {
        try {
          this.sync_storage()
        } catch (i) {
        }
      }
    },
    sync_storage: function () {
      if (!a.Utils || !a.Utils.popover) {
        return
      }
      a.Utils.popover.get_session_storage(this.session_storage_key, this.cache_timeout);
      c(window).on("beforeunload", b.bind(function () {
        a.Utils.popover.sync_session_storage(this.session_storage_key)
      }, this))
    },
    update_current_data: function () {
      this.current_data = this.model.toJSON()
    },
    show: function () {
      var h, i = true, f = c(this.current_target), g = (a.Utils.popover.cache) ? a.Utils.popover.cache[this.current_tumblelog] : null;
      if (g && g.data) {
        h = b.isObject(g.data) ? g.data : JSON.parse(g.data);
        if (b.size(h) > 1) {
          this.current_data = h
        }
      }
      this.$popover = c(this.popover_template({is_poptica: this.is_poptica || false, context_path: this.context_path}));
      this.$popover.appendTo(this.$el).hide();
      this.popover = new a.Popover({button: f, popover: this.$popover, skip_glass: true});
      if (!b.isEmpty(this.current_data)) {
        this.popover.show();
        i = false
      }
      this.targetPost = f.closest(".post");
      if (this.is_poptica) {
        this.subviews.poptica_header = new a.TumblelogPopover.PopticaHeader({
          model: this.model,
          popover: this.$popover,
          current_data: this.current_data,
          tumblelog: this.current_tumblelog,
          hide_posts_on_unfollow: this.hide_posts_on_unfollow,
          on_render: b.bind(this.position, this),
          targetPost: this.targetPost
        });
        this.$popover.find(".popover_inner").prepend(this.subviews.poptica_header.render().el);
        if (f.hasClass("post_avatar_link") || f.hasClass("post_sub_avatar")) {
          this.$popover.addClass("avatar_hover")
        }
      } else {
        this.subviews.tumblelog_info = new a.TumblelogPopover.Info({
          model: this.model,
          popover: this.$popover,
          tumblelog: this.current_tumblelog,
          post: this.current_post,
          current_data: this.current_data,
          on_close: b.bind(this.animate_out, this),
          hide_posts_on_unfollow: this.hide_posts_on_unfollow,
          is_user_mention: this.is_user_mention
        })
      }
      if (this.context_path) {
        this.$popover.find("[data-context-path]").each(b.partial(function (j) {
          var k = c(this);
          k.attr("data-context-path", j + "/" + k.attr("data-context-path"))
        }, this.context_path))
      }
      this.subviews.highlighted_posts = new a.TumblelogPopover.Posts({
        model: this.model,
        post: this.current_post,
        popover: this.$popover,
        parent: this.$popover.find(".popover_inner").first(),
        on_bottom: this.is_poptica
      });
      if (i === false && !b.isEmpty(this.current_data)) {
        this.popover.show()
      }
      this.position();
      this.animate_in();
      this.is_open = true;
      this.bind_events();
      this.log_impression(g);
      a.Events.trigger("TumblelogPopover:show", this.current_target)
    },
    hide: function () {
      if (this.$popover) {
        this.$popover.remove();
        this.$popover = null;
        a.Events.trigger("TumblelogPopover:hide", this.current_target)
      }
      if (c(".tumblelog_popover").length) {
        c(".tumblelog_popover").remove()
      }
      if (this.subviews.tumblelog_info) {
        this.subviews.tumblelog_info.close()
      }
      b.each(this.subviews, b.bind(function (g, h) {
        if (g) {
          g.remove()
        }
        this.subviews[h] = null
      }, this));
      this.current_data = {};
      this.current_tumblelog = "";
      this.current_post = {};
      this.is_open = false;
      this.is_user_mention = false;
      try {
        this.stopListening(this.model)
      } catch (f) {
      }
      if (this.queued_event) {
        this.on_mouseover(this.queued_event);
        this.queued_event = null
      }
    },
    animate_in: function () {
      if (this.hide_timeout) {
        clearTimeout(this.hide_timeout);
        this.hide_timeout = null
      }
      if (this.$popover) {
        this.$popover.removeClass("is_closed").addClass("is_open")
      }
    },
    animate_out: function () {
      if (this.hide_timeout) {
        clearTimeout(this.hide_timeout);
        this.hide_timeout = null
      }
      if (this.$popover) {
        this.$popover.removeClass("is_open").addClass("is_closed")
      }
      try {
        this.stopListening(this.model)
      } catch (f) {
      }
      this.unbind_events();
      this.hide_timeout = setTimeout(b.bind(this.hide, this), 300)
    },
    position: function () {
      if (!this.$popover || !this.current_target) {
        return
      }
      this.$popover.show();
      var l = c(window);
      var m = c(this.current_target);
      var g = this.$popover.height();
      var q = {};
      q.top = l.scrollTop();
      q.left = l.scrollLeft();
      q.bottom = q.top + l.height();
      q.right = q.left + l.width();
      var h = m.offset().top - g;
      var i = m.offset().top + m.height();
      var o = m.offset().left + (m.width() * 0.5);
      m.css("white-space", "nowrap");
      o = (m.offset().top > top) ? this.current_mouse_x : o;
      m.css("white-space", "");
      this.$popover.removeClass("down up left right nipple_on_top nipple_on_bottom");
      if (this.is_poptica) {
        this.$popover.addClass("down nipple_on_top");
        this.$popover.css({left: o, top: i})
      } else {
        this.$popover.addClass("up nipple_on_bottom");
        this.$popover.css({left: o, top: h})
      }
      var p = a.Utils.popover.get_bounds(this.$popover);
      var k = 20;
      var f = 365;
      this.target_bounds = a.Utils.popover.get_bounds(m);
      var n = (this.is_poptica) ? (p.top + f) : p.bottom;
      if (n > q.bottom - k) {
        this.$popover.css("top", h);
        this.$popover.removeClass("down nipple_on_top").addClass("up nipple_on_bottom");
        p = a.Utils.popover.get_bounds(this.$popover)
      }
      var r = (this.is_poptica) ? (p.bottom - f) : p.top;
      if (r < q.top + k) {
        this.$popover.css("top", i);
        this.$popover.removeClass("up nipple_on_bottom").addClass("down nipple_on_top");
        p = a.Utils.popover.get_bounds(this.$popover)
      }
      if (this.is_poptica && p.left < q.left + k) {
        this.$popover.css("left", q.left + k);
        this.$popover.removeClass("left").addClass("right");
        p = a.Utils.popover.get_bounds(this.$popover)
      }
      if (p.right > q.right - k) {
        if (this.is_poptica) {
          this.$popover.css("left", (q.right - k) - this.$popover.width())
        }
        this.$popover.removeClass("right").addClass("left");
        p = a.Utils.popover.get_bounds(this.$popover)
      }
      this.set_hover_bounds(p);
      var j = m.closest("[data-tumblelog-popover-zindex]");
      if (j.length > 0) {
        this.$popover.css("z-index", j.attr("data-tumblelog-popover-zindex"))
      }
    },
    set_hover_bounds: function (f) {
      f || (f = a.Utils.popover.get_bounds(this.$popover));
      this.hover_bounds.left = Math.min(f.left, this.target_bounds.left);
      this.hover_bounds.top = Math.min(f.top, this.target_bounds.top);
      this.hover_bounds.right = Math.max(f.right, this.target_bounds.right);
      this.hover_bounds.bottom = Math.max(f.bottom, this.target_bounds.bottom)
    },
    bind_events: function () {
      if (this.is_mobile) {
        c(document).on("touchstart.tumblelog_popover", b.bind(this.on_touch_close, this))
      } else {
        c(document).on("mousemove.tumblelog_popover", b.throttle(b.bind(this.on_mousemove, this), 50))
      }
    },
    unbind_events: function () {
      c(document).off(".tumblelog_popover")
    },
    set_hide_posts_on_unfollow: function () {
      this.hide_posts_on_unfollow = true
    },
    on_mouseover: function (m) {
      var f, n, k, j, h = c(m.currentTarget), g = h.attr("href"), l = !!(h.attr("data-tumblelog-popover")), r = (h.text().replace(/\s+/g, " ").length > 1), q = h.hasClass("post_avatar_link") || h.hasClass("reblog-avatar"), p = h.hasClass("post_sub_avatar");
      this.current_mouse_x = m.clientX;
      var i = h.closest(".post").data("post-id") || h.closest(".radar").data("post-id") || "";
      this.current_post = a.Posts.get(i) || {};
      if (!l && !r && !q && !p) {
        return
      }
      if (this.is_open) {
        if (this.current_target.href !== m.currentTarget.href) {
          this.queued_event = m;
          this.animate_out()
        }
        return
      }
      this.context_path = c(m.target).closest("[data-context-path]").data("context-path");
      if (l) {
        this.current_data = c.parseJSON(h.attr("data-tumblelog-popover"));
        this.current_tumblelog = this.current_data.name.toString()
      } else {
        if (h[0].hostname && h[0].hostname === this.mention_hostname && h[0].pathname.match(/^\/m/)) {
          f = (g.substr(-1) === "/") ? g.substr(0, g.length - 1) : g;
          n = f.split("/");
          this.is_user_mention = true;
          this.current_tumblelog = n[n.length - 1]
        } else {
          if (r || q || p) {
            f = g.replace(/.*?:\/\//g, "");
            n = f.split("/");
            if (n.length > 1 && n[1].length && n[1] !== "post") {
              return
            }
            k = g.match(/([^\/\.]+\/\/)([^\/\.]+)(\..*)/i);
            j = k && k[2];
            if (j) {
              this.current_tumblelog = j.toLowerCase()
            }
          }
        }
      }
      if (!b.isUndefined(this.current_tumblelog)) {
        this.current_target = m.currentTarget;
        var o = (this.is_user_mention) ? this.get_model_from_token() : this.get_model_from_name();
        o.then(b.bind(function (s) {
          this.model = s;
          this.listenTo(this.model, "change", this.update_current_data);
          this.show()
        }, this))
      }
    },
    get_model_from_token: function () {
      return a.Prima.Models.Tumblelog.modelFromToken(this.current_tumblelog)
    },
    get_model_from_name: function () {
      var f = c.Deferred();
      var g = new a.Prima.Models.Tumblelog({name: this.current_tumblelog});
      f.resolve(g);
      return f.promise()
    },
    on_mousemove: function (h) {
      if (this.is_menu_open || (this.subviews.tumblelog_info && this.subviews.tumblelog_info.is_disabled) || !this.hover_bounds || b.isEmpty(this.hover_bounds)) {
        return
      }
      var i = !(this.hover_bounds.left <= h.pageX && h.pageX <= this.hover_bounds.right), g = !(this.hover_bounds.top <= h.pageY && h.pageY <= this.hover_bounds.bottom);
      var f = c(h.target).hasClass("icon_close");
      if (i || g || f) {
        this.animate_out()
      }
    },
    on_touch_open: function (f) {
      f.preventDefault();
      f.stopPropagation();
      (this.is_open) ? this.animate_out() : this.on_mouseover(f)
    },
    on_touch_close: function (f) {
      this.on_mousemove(f.originalEvent)
    },
    log_impression: function (f) {
      a.Events.trigger("Capture:push", "tumblelog_popover", "impressions", {
        post_type: "highlighted",
        cached: (f) ? true : false
      })
    },
    on_follow: function () {
      this.show_recommendations()
    },
    on_follow_hover: function (g) {
      if (!g) {
        return
      }
      var f = !!(g.get("following"));
      if (this.popover_recommendations && !f) {
        this.setup_recommendations(g.get("name"))
      }
    },
    on_unfollow: function () {
      this.animate_out()
    },
    on_peepr_open: function () {
      b.delay(b.bind(this.hide, this), 50)
    },
    setup_recommendations: function (f) {
      if (!this.subviews.recommended_blogs) {
        this.subviews.recommended_blogs = new a.TumblelogPopover.Recommendations({
          popover: this.$popover,
          followed_blog: f,
          recommendations_needed: (this.is_poptica) ? 4 : 3,
          is_poptica: this.is_poptica
        })
      }
    },
    should_show_recommendations: function () {
      if ((b.isEmpty(this.current_post) || !this.current_post.get("sponsored")) && this.subviews.recommended_blogs && this.subviews.recommended_blogs.has_recommendations && !this.subviews.recommended_blogs.is_visible) {
        return true
      }
      return false
    },
    show_recommendations: function () {
      if (this.should_show_recommendations()) {
        this.subviews.recommended_blogs.render()
      }
    },
    on_navigation_menu_item_clicked: function () {
      this.animate_out()
    },
    on_toggle_navigation_menu: function (f) {
      this.is_menu_open = f || false;
      if (this.$popover && this.$popover.length) {
        this.$popover.toggleClass("nav_menu_open", this.is_menu_open)
      }
      if (!b.isEmpty(this.current_post)) {
        a.Events.trigger("TumblelogPopover:click:menu", {
          model: this.current_post,
          loggingData: this.loggingData({userAction: "popover_menu"})
        })
      }
    },
    track_engagement: function (f) {
      if (a.Utils && a.Utils.popover) {
        a.Utils.popover.track_premium_engagement(f, this.current_post)
      }
    }
  });
  a.Prima.Mixins.loggingData.applyTo(d.prototype);
  a.TumblelogPopover = d
})(jQuery, _, Backbone, Tumblr);
/*! scripts/tumblelog_popover/views/tumblelog_info.js */
(function (c, b, e, a) {
  var d = e.View.extend({
    className: "tumblelog_info",
    events: {
      "click .follow": "on_follow_click",
      "mouseenter .follow": "on_follow_hover",
      "click .unfollow": "on_follow_click",
      "click .tumblelog_menu_btn": "on_menu_click",
      "click .ask": "on_ask_click",
      "click .fan_mail": "on_fan_mail_click",
      "click .toggle_spam": "on_spam_click",
      "click .toggle_suspended": "on_suspended_click",
      "click .toggle_nsfw": "on_nsfw_click",
      "click a.avatar": "on_avatar_click",
      "click .name a": "on_blog_name_click",
      mouseenter: "on_mouseenter"
    },
    initialize: function (f) {
      this.options = f || {};
      this.template = b.template(this.options.template || c("#tumblelog_popover_info").html());
      this.$popover = this.options.popover || c();
      this.$parent = this.options.parent || this.$popover.find(".popover_inner");
      this.is_recommendation = this.options.is_recommendation === true;
      this.recommendation_data = this.options.recommendation_data || {};
      this.on_close = this.options.on_close || c.noop;
      this.on_menu_toggle = this.options.on_menu_toggle || c.noop;
      this.min_load_time = this.options.min_load_time || 500;
      this.current_data = this.options.current_data || {};
      this.hide_posts_on_unfollow = (this.options.hide_posts_on_unfollow !== false);
      this.is_user_mention = this.options.is_user_mention || false;
      this.post = this.options.post || {};
      this.is_mobile = b.has(document.documentElement, "ontouchstart");
      this.is_disabled = false;
      this.is_menu_open = false;
      this.xhr = null;
      this.model = this.options.model || new a.Prima.Models.Tumblelog({name: this.options.tumblelog});
      this.listenTo(this.model, "add", this.render);
      this.listenTo(this.model, "change", this.render);
      if (!b.isEmpty(this.current_data)) {
        var g = this.model.toJSON();
        b.extend(this.current_data, g);
        this.model.set(this.current_data, {silent: true})
      }
      this.update_cache();
      this.$el.addClass(this.model.get("name"));
      this.$parent.append(this.$el);
      this.render()
    },
    render: function () {
      var f = b.extend(this.model.toJSON(), {show_menu: !(this.is_recommendation)});
      this.$el.html(this.template(f));
      this.update_cache();
      return this
    },
    close: function () {
      this.on_close();
      if (this.xhr) {
        this.xhr.abort();
        this.xhr = null
      }
      c(document).off(".tumblelog_popover_menu");
      this.remove()
    },
    update_cache: function () {
      var f = this.model.toJSON(), g = this.model.get("name");
      a.Utils.popover.cache[g] = {timestamp: new Date().getTime(), data: JSON.stringify(f)}
    },
    open_dialog: function (f, g) {
      g = g || c.noop;
      this.is_disabled = true;
      f.fail(b.bind(function () {
        this.is_disabled = this.is_menu_open
      }, this));
      f.done(b.bind(function () {
        this.is_disabled = this.is_menu_open;
        g()
      }, this))
    },
    hide_posts: function () {
      a.Posts.whereBy({tumblelog: this.model.get("name"), sponsored: false}).invoke("dismiss");
      this.close()
    },
    show_menu: function () {
      this.is_menu_open = true;
      this.is_disabled = true;
      this.$popover.addClass("admin_menu_open")
    },
    hide_menu: function () {
      this.is_menu_open = false;
      this.is_disabled = false;
      this.$popover.removeClass("admin_menu_open")
    },
    on_follow_click: function (h) {
      h.preventDefault();
      h.stopPropagation();
      if (c(h.currentTarget).hasClass("unfollow")) {
        if (this.is_recommendation) {
          this.model.save_following({following: false}, {
            source: "UNFOLLOW_SOURCE_TUMBLELOG_POPOVER_RECOMMENDATIONS",
            from_popover: true,
            placement_id: ((this.post instanceof a.Prima.Models.Post) && this.post.get("placement_id")) || ""
          })
        } else {
          var i = a.TumblelogActions.confirm_unfollow({
            tumblelog: this.model.get("name"),
            avatar_url: this.model.get("avatar_url") || ""
          });
          this.open_dialog(i, b.bind(function () {
            this.model.save_following({following: false}, {
              source: "UNFOLLOW_SOURCE_TUMBLELOG_POPOVER",
              from_popover: true,
              placement_id: ((this.post instanceof a.Prima.Models.Post) && this.post.get("placement_id")) || ""
            });
            if (this.hide_posts_on_unfollow) {
              this.hide_posts()
            }
            a.Utils.popover.track_premium_engagement("popover_unfollow", this.post)
          }, this))
        }
      } else {
        var g = this.is_recommendation ? "FOLLOW_SOURCE_TUMBLELOG_POPOVER_RECOMMENDATIONS" : "FOLLOW_SOURCE_TUMBLELOG_POPOVER";
        var f;
        var j;
        if (this.post instanceof a.Prima.Models.Post) {
          j = this.post.get("placement_id");
          f = this.post.get("pt")
        }
        this.model.save_following({following: true}, {source: g, from_popover: true, placement_id: j, pt: f,});
        a.Utils.popover.track_premium_engagement("popover_follow", this.post);
        a.Events.trigger("TumblelogPopover:follow", this.model.get("name"))
      }
    },
    on_menu_click: function (f) {
      f.preventDefault();
      if (!this.is_menu_open) {
        this.show_menu();
        c(document).on("mouseup.tumblelog_popover_menu", b.bind(this.on_menu_mouseup, this))
      }
      a.Utils.popover.track_premium_engagement("popover_menu", this.post)
    },
    on_menu_mouseup: function (h) {
      var f = a.Utils.popover.get_bounds(this.$popover.find(".tumblelog_menu_popover"));
      var i = !(f.left <= h.pageX && h.pageX <= f.right), g = !(f.top <= h.pageY && h.pageY <= f.bottom);
      if (i || g) {
        c(document).off(".tumblelog_popover_menu");
        this.hide_menu()
      }
    },
    on_ask_click: function (h) {
      h.preventDefault();
      var f = c(h.currentTarget);
      var g = f.attr("data-tumblelog-name");
      var i = (f.data("anonymous-ask") === "1");
      a.Events.trigger("ask:form:open", {recipient: g, allow_anonymous: i});
      this.close()
    },
    on_fan_mail_click: function (g) {
      if (b.isObject(a.FanMail)) {
        var f = {href: a.FanMail.make_url_from_tumblelog(this.model.get("name"))};
        g.preventDefault();
        a.FanMail.show(f);
        this.close()
      }
    },
    on_spam_click: function (f) {
      f.preventDefault();
      var g = this.model.toggle_spam();
      g.success(b.bind(function (h) {
        this.model.set("spam", (h.spammer) ? true : false)
      }, this))
    },
    on_suspended_click: function (f) {
      f.preventDefault();
      var g = this.model.toggle_suspended();
      g.success(b.bind(function (h) {
        this.model.set("suspended", (h.suspended) ? true : false)
      }, this))
    },
    on_nsfw_click: function (f) {
      f.preventDefault();
      var g = this.model.toggle_nsfw();
      g.success(b.bind(function (h) {
        this.model.set("nsfw", h.nsfw)
      }, this))
    },
    on_avatar_click: function (f) {
      a.Utils.popover.capture_tumblelog_click(f);
      a.Utils.popover.track_premium_engagement("popover_avatar", this.post)
    },
    on_blog_name_click: function (f) {
      a.Utils.popover.capture_tumblelog_click(f);
      a.Utils.popover.track_premium_engagement("popover_blog", this.post)
    },
    on_mouseenter: function (f) {
      a.Events.trigger("TumblelogPopover:mouseenter_tumblelog_info", this.model)
    },
    on_follow_hover: function (f) {
      if (!this.is_recommendation) {
        a.Events.trigger("TumblelogPopover:follow_hover", this.model)
      }
    }
  });
  a.TumblelogPopover.Info = d
})(jQuery, _, Backbone, Tumblr);
/*! scripts/tumblelog_popover/views/recommendations.js */
(function (c, b, e, a) {
  var d = e.View.extend({
    className: "popover_inner recommended_blogs", initialize: function (f) {
      this.options = f || {};
      this.is_poptica = this.options.is_poptica || false;
      this.followed_blog = this.options.followed_blog || "";
      this.posts_insert_delay = this.options.posts_insert_delay || 50;
      this.posts_update_delay = this.options.posts_update_delay || 300;
      this.recommendations_needed = this.options.recommendations_needed || 3;
      this.$popover = this.options.popover || c();
      this.$popover_wrapper = this.$popover.find(".popover_content_wrapper");
      this.template = b.template(this.options.template || c("#recommended_blogs_template").html());
      this.posts_template = b.template(this.options.posts_template || c("#highlighted_posts_template").html());
      this.is_visible = false;
      this.showing_posts = false;
      this.has_recommendations = false;
      this.subviews = {blogs: [], posts: null};
      this.viewed = [];
      this.original_popover_height = 0;
      var g = e.Collection.extend({
        model: a.Prima.Models.Tumblelog,
        url: "/svc/related_blogs",
        parse: b.bind(function (h) {
          if (!b.isEmpty(h)) {
            this.has_recommendations = true
          }
          return h
        }, this)
      });
      this.blogs = new g();
      this.fetch_tumblelog_data()
    }, fetch_tumblelog_data: function () {
      this.blogs.fetch({
        data: {tumblelog: this.followed_blog, minimum: this.recommendations_needed},
        merge: true,
        with_form_key: true,
        remove: false,
      })
    }, render: function () {
      if (this.is_poptica) {
        this.original_popover_height = this.$popover.height();
        this.$popover.css("height", this.original_popover_height)
      }
      if (!this.is_visible) {
        this.$popover_wrapper.append(this.$el);
        this.is_visible = true
      }
      var g = {followed_blog: this.followed_blog};
      this.$popover.find(".recommended_blogs").html(this.template(g));
      var f = 1;
      this.blogs.forEach(function (i) {
        var h = new a.TumblelogPopover.Info({
          popover: this.$popover,
          parent: this.$el,
          current_data: i.toJSON(),
          model: i,
          recommendation_data: {rank: f, recommendation_ct: this.blogs.length, position: {}},
          is_recommendation: true,
        });
        h.recommendation_data.position = h.$el.offset();
        f += 1;
        this.subviews.blogs.push(h)
      }, this);
      this.$popover.addClass("showing_recommendations");
      this.after_render();
      return this
    }, log_impressions: function () {
      var f = function () {
        return window.location.pathname.split("/")[1]
      };
      var g = 1;
      b.forEach(this.subviews.blogs, function (i) {
        var k = i.model;
        var h = b.find(this.subviews.blogs, {model: k});
        if (b.isEmpty(h) || (b.indexOf(this.viewed, k) !== -1)) {
          return
        }
        this.viewed.push(k);
        var j = (a.getRealNow || b.now)();
        a.Events.trigger("Capture:push", "recommended_blog_impressions", "impressions", {
          tumblelog_name: k.get("name"),
          algorithm_id: "reblog_related",
          page: f(),
          ts: Math.floor(j / 1000),
          position: h.$el.offset(),
          format: "RECOMMEND_FORMAT_TUMBLELOG_POPOVER",
          rank: g
        });
        g += 1;
        this.viewed.push(k)
      }, this)
    }, insert_posts: function (f) {
      if (this.subviews.posts) {
        return
      }
      this.subviews.posts = new a.TumblelogPopover.Posts({
        popover: this.$popover,
        parent: this.$el,
        model: f,
        on_bottom: (this.is_poptica || this.$popover.hasClass("nipple_on_top"))
      });
      this.$popover.one("transitionend webkitTransitionEnd MSTransitionEnd", this._after_insert_posts);
      setTimeout(this._after_insert_posts, 600);
      var g = this;
      setTimeout(function () {
        g.$popover.addClass("slide_up")
      }, this.posts_insert_delay);
      this.listenTo(a.Events, "TumblelogPopover:mouseenter_tumblelog_info", this.update_posts);
      this.listenTo(a.Events, "TumblelogPopover:mouseenter_posts", this.cancel_update_posts)
    }, _after_insert_posts: function () {
      a.Events.trigger("TumblelogPopover:inserted_posts")
    }, update_posts: function (f) {
      if (!this.subviews.posts) {
        this.insert_posts(f)
      }
      this.cancel_update_posts();
      if (this.subviews.posts.model === f) {
        return
      }
      this.subviews.posts.$el.removeClass("blink");
      var g = this;
      this.queued_post_update = setTimeout(function () {
        g.subviews.posts.$el.addClass("blink");
        g.subviews.posts.update_posts(f)
      }, this.posts_update_delay)
    }, cancel_update_posts: function () {
      if (this.queued_post_update) {
        clearTimeout(this.queued_post_update)
      }
    }, after_render: function () {
      var g = c.Deferred();
      g.then(b.bind(this._after_animation, this));
      this.$popover.one("animationend webkitAnimationEnd MSAnimationEnd", g.resolve);
      setTimeout(g.resolve, 600);
      this.log_impressions();
      if (this.is_poptica) {
        this.$popover.css("height", "");
        this.$popover_wrapper.css("background-color", "#FFF");
        var h = {height: this.$popover.height() - this.original_popover_height};
        if (this.$popover.hasClass("up")) {
          var f = parseInt(this.$popover.css("margin-top"));
          h["margin-top"] = this.original_popover_height - h.height + f
        }
        this.$popover.css(h)
      }
    }, _after_animation: function () {
      this.$popover.find(".popover_inner:not(.recommended_blogs)").remove();
      this.$popover.removeClass("showing_recommendations");
      this.insert_posts(b.last(this.blogs.models))
    }
  });
  a.TumblelogPopover.Recommendations = d
})(jQuery, _, Backbone, Tumblr);
/*! scripts/tumblelog_popover/views/poptica_info_popover.js */
var TumblrData = TumblrData || {};
Tumblr.TumblelogPopover || (Tumblr.TumblelogPopover = {});
(function (d, c, f, b) {
  var a = Tumblr.Popover.extend({
    template: c.template(d("#tumblelog_header_info_popover_template").html()),
    defaults: {
      auto_show: false,
      skip_glass: false,
      template_data: {},
      trigger: d(),
      standalone: false,
      show_flag_button: true,
      show_user_controls: false
    },
    events: {
      "click .ask_menu_item": "__ask_menu_item_clicked",
      "click .fan_mail_menu_item": "__fan_mail_menu_item_clicked",
      "click .messaging_menu_item": "__messaging_menu_item_clicked",
      "click .archive_menu_item": "__archive_menu_item_clicked",
      "click .toggle_spam": "__toggle_spam_click",
      "click .toggle_suspended": "__toggle_suspended_click",
      "click .toggle_nsfw": "__toggle_nsfw_click",
      "click .likes": "__likes_menu_item_clicked",
      "click .block": "__block_click",
      "click .flag_menu_item": "__flag_click",
      "click .panel_menu_item": "__panel_menu_item_clicked"
    },
    __panel_menu_item_clicked: function (g) {
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __block_click: function (h) {
      h.preventDefault();
      var g = {blockedTumblelog: this.model.get("name")};
      Tumblr.Prima.Block.confirmBlock(g).then(c.bind(this.__onBlockConfirm, this));
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __onBlockConfirm: function () {
      var g = new Tumblr.Prima.Models.Tumblelog({name: this.model.get("name")});
      g.block().then(c.bind(this._afterBlock, this))
    },
    _afterBlock: function () {
      this.model.set("blocking", true);
      this._hide_posts();
      this.options.targetPost && this.options.targetPost.addClass("is_flagged");
      Tumblr.Prima.Events && Tumblr.Prima.Events.trigger("blocks:block_added", {loggingData: {from: "popover"}})
    },
    __flag_click: function (g) {
      g.preventDefault();
      Tumblr.Events.trigger("abuseform:open", {mode: "blogcard", tumblelog: this.model.get("name")});
      this.hide()
    },
    __ask_menu_item_clicked: function (g) {
      g.preventDefault();
      Tumblr.Events.trigger("ask:form:open", {
        recipient: this.model.get("name"),
        allow_anonymous: this.model.get("anonymous_asks")
      });
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __messaging_menu_item_clicked: function (g) {
      g.preventDefault(g);
      Tumblr.Prima.Events.trigger("messaging:conversation:open:tumblelogs", [this.model], "blog-card");
      this.hide()
    },
    __fan_mail_menu_item_clicked: function (g) {
      if (c.isObject(Tumblr.FanMail)) {
        g.preventDefault();
        Tumblr.FanMail.show(null, {href: Tumblr.FanMail.make_url_from_tumblelog(this.model.get("name"))});
        Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
        this.hide()
      }
    },
    __archive_menu_item_clicked: function (g) {
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __likes_menu_item_clicked: function (g) {
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __toggle_spam_click: function (g) {
      g.preventDefault();
      var h = this.model.toggle_spam();
      h.success(c.bind(function (i) {
        this.model.set("spam", (i.spammer) ? true : false)
      }, this));
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __toggle_suspended_click: function (g) {
      g.preventDefault();
      var h = this.model.toggle_suspended();
      h.success(c.bind(function (i) {
        this.model.set("suspended", (i.suspended) ? true : false)
      }, this));
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __toggle_nsfw_click: function (g) {
      g.preventDefault();
      var h = this.model.toggle_nsfw();
      h.success(c.bind(function (i) {
        this.model.set("nsfw", i.nsfw)
      }, this));
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __model_change: function () {
      var g = this.model.toJSON();
      this.$(".toggle_spam").toggleClass("is_flagged", !!(g.spam));
      this.$(".toggle_nsfw").toggleClass("is_flagged", !!(g.nsfw))
    },
    __document_click: function (i) {
      if (!Tumblr.Utils || !Tumblr.Utils.popover) {
        return
      }
      var g = Tumblr.Utils.popover.get_bounds(this.$popover);
      var j = !(g.left <= i.pageX && i.pageX <= g.right), h = !(g.top <= i.pageY && i.pageY <= g.bottom);
      if (j || h) {
        this.hide()
      }
    },
    _hide_posts: function () {
      Tumblr.Posts.whereBy({tumblelog: this.model.get("name"), sponsored: false}).invoke("dismiss")
    },
    _open_dialog: function (g, h) {
      h = h || d.noop;
      this.is_disabled = true;
      g.fail(c.bind(function () {
        this.is_disabled = this.is_menu_open
      }, this));
      g.done(c.bind(function () {
        this.is_disabled = this.is_menu_open;
        h()
      }, this))
    },
    initialize: function (g) {
      this.options = c.extend({}, this.defaults, g);
      this.$trigger = g.trigger;
      this.targetPost = this.options.targetPost;
      if (!this.model) {
        return
      }
      var h = this.model.toJSON();
      h.show_user_controls = this.options.show_user_controls;
      c.defaults(h, this.options);
      this.$doc = d(document);
      this.$popover = d(this.template(h)).appendTo(this.$el).hide();
      this.listenTo(this.model, "change", this.__model_change);
      Tumblr.Popover.prototype.initialize.call(this, c.extend(this.options, {popover: this.$popover}))
    },
    show: function () {
      Tumblr.Events.trigger("TumblelogPopover:toggle_navigation_menu", true);
      if (!this.options.standalone) {
        this.$doc.on("click.poptica_info_popover", c.bind(this.__document_click, this))
      }
      Tumblr.Popover.prototype.show.call(this)
    },
    hide: function () {
      Tumblr.Events.trigger("TumblelogPopover:toggle_navigation_menu", false);
      this.$doc.off(".poptica_info_popover");
      return Tumblr.Popover.prototype.hide.call(this)
    }
  });
  (function e() {
    var h;

    function g(l) {
      if (h) {
        h.hide()
      }
      var k = l.options || {};
      h = new a(k)
    }

    function i() {
      if (h) {
        h.show()
      }
    }

    function j() {
      if (h) {
        h.hide()
      }
    }

    Tumblr.Events.on("popticainfopopover:initialize", g);
    Tumblr.Events.on("popticainfopopover:show", i);
    Tumblr.Events.on("popticainfopopover:hide", j)
  }());
  b.PopticaInfoPopover = a
})(jQuery, _, Backbone, Tumblr.TumblelogPopover);
/*! scripts/tumblelog_popover/views/poptica_header.js */
var TumblrData = TumblrData || {};
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.TumblelogPopover || (Tumblr.TumblelogPopover = {});
(function (c, b, e, a) {
  var d = Tumblr.IndashBlog.HeaderCompact.extend({
    className: "poptica_header",
    defaults: {
      current_data: {},
      on_render: c.noop,
      popover: null,
      hide_posts_on_unfollow: false,
      is_recommendation: false,
      template_data: {popover: true},
      include_info_popover: true
    },
    events: function () {
      return b.extend({}, Tumblr.IndashBlog.HeaderCompact.prototype.events, {
        "click .avatar a": "__on_avatar_click",
        "click a.blog_name": "__on_blog_name_click",
        "mouseenter .follow": "__on_follow_hover",
        mouseenter: "__on_mouseenter"
      })
    },
    __on_follow_click: function (h) {
      h.preventDefault();
      h.stopPropagation();
      if (c(h.currentTarget).hasClass("unfollow")) {
        if (this.is_recommendation) {
          this.model.save_following({following: false}, {
            source: "UNFOLLOW_SOURCE_TUMBLELOG_POPOVER_RECOMMENDATIONS",
            from_popover: true,
            placement_id: ((this.post instanceof Tumblr.Prima.Models.Post) && this.post.get("placement_id")) || ""
          })
        } else {
          var j = Tumblr.TumblelogActions.confirm_unfollow({
            tumblelog: this.model.get("name"),
            avatar_url: this.model.get("avatar_url") || ""
          });
          this._open_dialog(j, b.bind(function () {
            this.model.save_following({following: false}, {
              source: "UNFOLLOW_SOURCE_TUMBLELOG_POPOVER",
              from_popover: true,
              placement_id: ((this.post instanceof Tumblr.Prima.Models.Post) && this.post.get("placement_id")) || ""
            });
            if (this.hide_posts_on_unfollow) {
              this._hide_posts()
            }
            Tumblr.Events.trigger("TumblelogPopover:track_engagement", "popover_unfollow")
          }, this));
          Tumblr.Events.trigger("TumblelogPopover:unfollow")
        }
      } else {
        var g = this.is_recommendation ? "FOLLOW_SOURCE_TUMBLELOG_POPOVER_RECOMMENDATIONS" : "FOLLOW_SOURCE_TUMBLELOG_POPOVER";
        var f = {
          source: g,
          from_popover: true,
          placement_id: ((this.post instanceof Tumblr.Prima.Models.Post) && this.post.get("placement_id")) || ""
        };
        var i = c(h.target).closest("[data-context-path]").data("context-path");
        if (i) {
          f.tlt = i
        }
        this.model.save_following({following: true}, f);
        Tumblr.Events.trigger("TumblelogPopover:track_engagement", "popover_follow");
        Tumblr.Events.trigger("TumblelogPopover:follow", this.model.get("name"))
      }
    },
    __info_popover_button_clicked: function (f) {
      Tumblr.IndashBlog.HeaderCompact.prototype.__info_popover_button_clicked.call(this, f);
      Tumblr.Events.trigger("TumblelogPopover:track_engagement", "popover_menu")
    },
    __on_avatar_click: function (f) {
      Tumblr.Utils.popover.capture_tumblelog_click(f);
      Tumblr.Events.trigger("TumblelogPopover:track_engagement", "popover_avatar");
      Tumblr.Events.trigger("TumblelogPopover:click:avatar", {
        model: this.current_post,
        loggingData: this.loggingData({userAction: "popover_avatar"})
      })
    },
    __on_blog_name_click: function (f) {
      Tumblr.Utils.popover.capture_tumblelog_click(f);
      Tumblr.Events.trigger("TumblelogPopover:track_engagement", "popover_blog");
      Tumblr.Events.trigger("TumblelogPopover:click:blog", {
        model: this.current_post,
        loggingData: this.loggingData({userAction: "popover_blog"})
      })
    },
    __on_mouseenter: function (f) {
      Tumblr.Events.trigger("TumblelogPopover:mouseenter_tumblelog_info", this.model)
    },
    __on_follow_hover: function (f) {
      if (!this.is_recommendation) {
        Tumblr.Events.trigger("TumblelogPopover:follow_hover", this.model)
      }
    },
    _update_cache: function () {
      if (Tumblr.Utils && Tumblr.Utils.popover) {
        Tumblr.Utils.popover.cache_tumblelog_data(this.model.get("name"), this.model.toJSON())
      }
    },
    initialize: function (f) {
      this.listenTo(this.model, "change", this._update_cache);
      Tumblr.IndashBlog.HeaderCompact.prototype.initialize.call(this, f);
      this.is_recommendation = this.options.is_recommendation
    }
  });
  Tumblr.Prima.Mixins.loggingData.applyTo(d.prototype);
  a.PopticaHeader = d
})(jQuery, _, Backbone, Tumblr.TumblelogPopover);
/*! scripts/tumblelog_popover/views/posts.js */
(function (d, c, e, b) {
  var a = e.View.extend({
    className: "recent_posts",
    events: {"click a": "on_post_click", mouseenter: "on_mouseenter"},
    initialize: function (f) {
      f || (f = {});
      this.template = c.template(d("#highlighted_posts_template").html());
      this.$popover = f.popover || d();
      this.$parent = f.parent || d();
      this.min_load_time = f.min_load_time || 500;
      this.model = f.model || {};
      this.dashboard_post = f.post || {};
      if (!this.model) {
        return
      }
      this.listenTo(this.model, "change:highlighted_posts", this.render);
      this.listenTo(this.model, "change:global_theme_params", this.render_inline_styles);
      this.render_loader();
      this.render_inline_styles();
      if (f.on_bottom) {
        this.$parent.append(this.$el)
      } else {
        this.$parent.prepend(this.$el)
      }
      this.posts = this.model.get("highlighted_posts");
      if (!c.isUndefined(this.posts)) {
        this.render(true)
      } else {
        this.fetch_posts()
      }
    },
    fetch_posts: function () {
      this.model.fetch_popover_data({is_tumblelog_popover: true})
    },
    update_posts: function (f) {
      this.model = f;
      this.posts = this.model.get("highlighted_posts");
      if (!c.isUndefined(this.posts)) {
        this.render(true)
      } else {
        this.fetch_posts()
      }
    },
    render_loader: function () {
      var g = this.model.toJSON();
      var f = (b.Flags) ? b.Flags.bool("poptica_tumblelog_popovers") : false;
      this.$el.html(this.template({loader_color: (f && g.global_theme_params) ? g.global_theme_params.title_color : "#D9D9D9"}))
    },
    render_inline_styles: function () {
      var f = this.model.get("global_theme_params");
      if (f) {
        this.$el.css("background-color", f.background_color)
      }
    },
    render: function (h) {
      var i = this.posts || this.model.get("highlighted_posts");
      if (!c.isArray(i)) {
        return
      }
      var g = i.join(""), f = 0;
      if (i.length < 2) {
        setTimeout(c.bind(function () {
          this.$popover.addClass("is_empty");
          this.$el.html("")
        }, this), this.min_load_time);
        return
      }
      this.$el.addClass("has_" + i.length + "_posts");
      if (h === true) {
        this.$el.addClass("is_cached").html(g);
        return
      }
      setTimeout(c.bind(function () {
        this.$el.addClass("is_loaded").html(g)
      }, this), this.min_load_time);
      return this
    },
    on_post_click: function (f) {
      b.Utils.popover.capture_tumblelog_click(f);
      b.Utils.popover.track_premium_engagement("popover_post", this.dashboard_post);
      b.Events.trigger("TumblelogPopover:click:posts", {
        model: this.current_post,
        loggingData: this.loggingData({userAction: "popover_posts"})
      })
    },
    on_mouseenter: function (f) {
      b.Events.trigger("TumblelogPopover:mouseenter_posts")
    }
  });
  b.Prima.Mixins.loggingData.applyTo(a.prototype);
  b.TumblelogPopover.Posts = a
})(jQuery, _, Backbone, Tumblr);
/*! scripts/tumblr/utils/popover.js */
Tumblr.Utils || (Tumblr.Utils = {});
(function (c, b) {
  var a = {
    cache: {}, cache_tumblelog_data: function (d, e) {
      if (!d || !_.isString(d) || !_.isObject(e)) {
        return
      }
      if (!e.customizable) {
        this.cache[d] = {timestamp: new Date().getTime(), data: JSON.stringify(e)}
      }
    }, get_session_storage: function (h, g) {
      if (!window.sessionStorage || !window.sessionStorage.length) {
        return
      }
      h = (h || "optica_header");
      g = (g || 3600000);
      var e = sessionStorage.getItem(h);
      if (e) {
        var f = JSON.parse(e);
        var d = new Date().getTime();
        for (key in f) {
          if (d - f[key].timestamp > g || !_.has(f[key], "data") || f[key].data.customizable) {
            delete f[key]
          }
        }
        this.cache = _.extend({}, this.cache, f);
        return f
      }
    }, sync_session_storage: function (i) {
      if (_.size(this.cache) < 1 || !window.sessionStorage) {
        return
      }
      i = (i || "optica_header");
      var h, e, g = _.size(this.cache), d = 50;
      if (g > d) {
        h = 0;
        for (e in this.cache) {
          if (this.cache[e]) {
            h++;
            if (h <= g - d) {
              delete this.cache[e]
            }
          }
        }
      }
      try {
        sessionStorage.setItem(i, JSON.stringify(this.cache))
      } catch (f) {
      }
    }, clear_session_storage: function (d) {
      if (!window.sessionStorage || !window.sessionStorage.length) {
        return
      }
      d = (d || "optica_header");
      if (sessionStorage.getItem(d)) {
        sessionStorage.removeItem(d)
      }
    }, get_bounds: function (e) {
      var d = c(e), f = {left: 0, right: 0, top: 0, bottom: 0};
      if (d.length) {
        f = d.offset();
        f.right = f.left + d.width();
        f.bottom = f.top + d.height()
      }
      return f
    }, capture_tumblelog_click: function (d) {
      if (Tumblr.CaptureTumblelogClick) {
        Tumblr.CaptureTumblelogClick.track_click(d)
      }
    }, track_premium_engagement: function (f, d) {
      if (d instanceof Tumblr.Prima.Models.Post) {
        if (Tumblr.CapturePremiumRadar && d === Tumblr.radar.postModel && (d.get("placement_id") || d.get("premium_tracked"))) {
          Tumblr.CapturePremiumRadar.force_track_radar_controls(f)
        } else {
          if (d.get("sponsored") || d.get("premium_tracked")) {
            var e = _.find(Tumblr.postsView.postViews, {model: d});
            if (!e) {
              return
            }
            e.capture_web_instream.force_track_sponsored_controls(f)
          }
        }
      }
    }
  };
  b.popover = a
})(jQuery, Tumblr.Utils);
/*! scripts/color_utilities.js */
(function (c, b, a) {
  var d = {
    rgb_to_hex: function (h, f, e) {
      return "#" + ((1 << 24) + (h << 16) + (f << 8) + e).toString(16).slice(1)
    }, hex_to_rgb: function (f) {
      f = new String(f).replace(/[^0-9a-f]/gi, "");
      if (f.length < 6) {
        f = f[0] + f[0] + f[1] + f[1] + f[2] + f[2]
      }
      var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);
      return e ? {r: parseInt(e[1], 16), g: parseInt(e[2], 16), b: parseInt(e[3], 16)} : null
    }, rgb_to_hsv: function (l, k, f) {
      var j = Math.min(Math.min(l, k), f);
      var e = Math.max(Math.max(l, k), f);
      var h = e - j;
      var i = {h: 6, s: e ? ((e - j) / e) : 0, v: (e / 255)};
      if (!h) {
        i.h = 0
      } else {
        if (e === l) {
          i.h += (k - f) / h
        } else {
          if (e === k) {
            i.h += 2 + (f - l) / h
          } else {
            i.h += 4 + (l - k) / h
          }
        }
      }
      i.h = (60 * i.h) % 360;
      return i
    }, hsv_to_rgb: function (j, q, p) {
      var e, k, n;
      if (!q) {
        e = k = n = p
      } else {
        e = k = n = 0;
        var i = ((j + 360) % 360) / 60;
        var l = p * q;
        var f = p - l;
        var o = l * (1 - Math.abs(i % 2 - 1));
        if (i < 1) {
          e = l;
          k = o
        } else {
          if (i < 2) {
            e = o;
            k = l
          } else {
            if (i < 3) {
              k = l;
              n = o
            } else {
              if (i < 4) {
                k = o;
                n = l
              } else {
                if (i < 5) {
                  n = l;
                  e = o
                } else {
                  n = o;
                  e = l
                }
              }
            }
          }
        }
        e += f;
        k += f;
        n += f
      }
      return {r: Math.round(255 * e), g: Math.round(255 * k), b: Math.round(255 * n)}
    }, hex_to_hsv: function (g) {
      g = new String(g).replace(/[^0-9a-f]/gi, "");
      if (g.length < 6) {
        g = g[0] + g[0] + g[1] + g[1] + g[2] + g[2]
      }
      var f = a.ColorUtilities.hex_to_rgb(g);
      var e = a.ColorUtilities.rgb_to_hsv.apply(a.ColorUtilities, b.toArray(f));
      return e
    }, hsv_to_hex: function (i, g, e) {
      var f = a.ColorUtilities.hsv_to_rgb(i, g, e);
      var j = a.ColorUtilities.rgb_to_hex.apply(a.ColorUtilities, b.toArray(f));
      return j
    }, hex_brightness: function (i, q) {
      i = String(i).replace(/[^0-9a-f]/gi, "");
      if (i.length < 6) {
        i = i[0] + i[0] + i[1] + i[1] + i[2] + i[2]
      }
      q = q || 0;
      var o = parseInt(i, 16), j = (q < 0) ? 0 : 255, f = (q < 0) ? -(q) : q, e = o >> 16, m = o >> 8 & 255, s = o & 255, n, k, h;
      n = Math.round((j - e) * f) + e;
      k = Math.round((j - m) * f) + m;
      h = Math.round((j - s) * f) + s;
      return "#" + (16777216 + n * 65536 + k * 256 + h).toString(16).slice(1)
    }, hsv_to_readable: function (e) {
      if (typeof e === "string") {
        e = a.ColorUtilities.hex_to_hsv(e)
      }
      return (e.s < 0.2 && e.v > 0.8) ? "#444" : "#FFF"
    }, compare_colors: function (k, i, o) {
      var g = {upper_bound: 0.8, lower_bound: 0.2, diff_bound: 0.1, hue_bound: 15};
      b.extend(g, o);
      var j = g.upper_bound;
      var n = g.lower_bound;
      var m = g.diff_bound;
      var e = g.hue_bound;
      var h = Math.abs(k.h - i.h);
      var f = Math.abs(k.s - i.s);
      var l = Math.abs(k.v - i.v);
      if (h <= m && f <= m && l <= m) {
        return true
      } else {
        if (f <= m && l <= m) {
          if (f >= j || f <= n && l >= j || l <= n && h <= e) {
            return true
          }
        }
      }
      return false
    }
  };
  a.ColorUtilities = d
})(jQuery, _, Tumblr);
/*! scripts/color_editor/views/_palette.js */
Tumblr.ColorEditor || (Tumblr.ColorEditor = {});
(function (c, b, e, a) {
  var d = e.View.extend({
    className: "color_palette",
    defaults: {colors: [], current_color: false, current_page: 0, on_change: c.noop},
    events: {
      "click .swatch": "__color_click",
      "click .pagination a.dot": "__pagination_click",
      "click .pagination a.next": "__pagination_next_click",
      "click .pagination a.previous": "__pagination_previous_click"
    },
    __color_click: function (g) {
      g.preventDefault();
      var f = c(g.currentTarget);
      if (f.hasClass("selected")) {
        return
      }
      this.$(".swatch.selected").removeClass("selected");
      f.addClass("selected");
      this.update_color(f.data("color"))
    },
    __pagination_click: function (g) {
      g.preventDefault();
      var f = c(g.currentTarget);
      if (f.hasClass("selected")) {
        return
      }
      this.current_page = f.data("page");
      this.render(true)
    },
    __pagination_next_click: function (f) {
      f.preventDefault();
      if (!c(f.currentTarget).hasClass("disabled") && this.current_page < this.page_count - 1) {
        this.current_page++;
        this.render(true)
      }
    },
    __pagination_previous_click: function (f) {
      f.preventDefault();
      if (!c(f.currentTarget).hasClass("disabled") && this.current_page > 0) {
        this.current_page--;
        this.render(true)
      }
    },
    initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.colors = this.options.colors;
      this.current_color = this.options.current_color;
      this.current_page = this.options.current_page;
      this.page_count = this.colors.length
    },
    render: function (f) {
      this.$el.html(this.template({
        colors: this.colors[this.current_page],
        current_color: this.current_color,
        page: this.current_page,
        page_color: this.colors[this.current_page][4],
        page_count: this.page_count
      }));
      this.$el.toggleClass("paginating", f || false);
      return this
    },
    update_color: function (f) {
      this.current_color = f;
      this.options.on_change(this.current_color)
    },
    template: b.template('            <%                var previous_arrow_class = "arrow previous icon_arrow_carrot_left";                previous_arrow_class += (page === 0) ? " disabled" : "";                var next_arrow_class = "arrow next icon_arrow_carrot_right";                next_arrow_class += (page === page_count - 1) ? " disabled" : "";            %>            <% _.each(colors, function(color) { %>                <a class="swatch<% if(color === current_color){ print(" selected") } %>" data-color="<%= color %>" style="background-color:<%= color %>"><span class="inner_border"></span></a>            <% }); %>            <% if(page_count > 1) { %>                <div class="pagination">                    <a class="<%= previous_arrow_class %>"></a>                    <% for(var i=0; i<page_count; i++) { %>                        <% if(i === page) { %>                            <a class="dot selected" data-page="<%= i %>" style="background-color:<%= page_color %>"></a>                        <% } else { %>                            <a class="dot" data-page="<%= i %>"></a>                        <% } %>                    <% } %>                    <a class="<%= next_arrow_class %>"></a>                </div>            <% } %>        ')
  });
  a.Palette = d
})(jQuery, _, Backbone, Tumblr.ColorEditor);
/*! scripts/color_editor/views/_picker.js */
Tumblr.ColorEditor || (Tumblr.ColorEditor = {});
(function (d, c, e, b) {
  var a = e.View.extend({
    className: "color_picker",
    defaults: {color: {r: 0, g: 0, b: 0}, debounce: 30, on_change: d.noop},
    events: {
      paste: "__paste",
      "mousedown .hue_selector": "__hue_mousedown",
      "mousedown .saturation_wrapper": "__saturation_mousedown",
      "focus .color_text": "__color_text_focus",
      "keyup .color_text": "__color_text_keyup"
    },
    __hue_mousedown: function (f) {
      this.hue_width = this.$hue.width();
      var g = (f.pageX - this.$hue.offset().left) / this.hue_width;
      this.hsv.h = Math.round(g * 360);
      this.update_hue();
      d("body").on("mousemove.pickerhue", c.bind(c.throttle(this.__hue_mousemove, this.options.debounce), this));
      d("body").on("mouseup.pickerhue", c.bind(this.__hue_mouseup, this))
    },
    __hue_mousemove: function (g) {
      var f = this.$hue.offset().left;
      g.preventDefault();
      g.stopPropagation();
      g.cancelBubble = true;
      g.returnValue = false;
      if (g.pageX < f || g.pageX > f + this.hue_width) {
        return
      }
      var h = (g.pageX - this.$hue.offset().left) / this.hue_width;
      this.hsv.h = Math.round(h * 360);
      this.update_hue();
      return false
    },
    __hue_mouseup: function (f) {
      f.preventDefault();
      f.stopPropagation();
      d("body").off(".pickerhue")
    },
    __saturation_mousedown: function (h) {
      var i = this.$saturation.offset();
      var g = h.pageX - i.left;
      var f = h.pageY - i.top;
      this.saturation_width = this.$saturation.width();
      this.saturation_height = this.$saturation.height();
      this.hsv.s = Math.max(0, Math.min(g / this.saturation_width, 1));
      this.hsv.v = Math.max(0, Math.min(1 - f / this.saturation_height, 1));
      this.update_saturation();
      this.$saturation_indicator.addClass("dragging");
      d("body").on("mousemove.pickersaturation", c.bind(c.throttle(this.__saturation_mousemove, this.options.debounce), this));
      d("body").on("mouseup.pickersaturation", c.bind(this.__saturation_mouseup, this))
    },
    __saturation_mousemove: function (h) {
      var i = this.$saturation.offset();
      var g = h.pageX - i.left;
      var f = h.pageY - i.top;
      h.preventDefault();
      h.stopPropagation();
      h.cancelBubble = true;
      h.returnValue = false;
      this.hsv.s = Math.max(0, Math.min(g / this.saturation_width, 1));
      this.hsv.v = Math.max(0, Math.min(1 - f / this.saturation_height, 1));
      this.update_saturation();
      return false
    },
    __saturation_mouseup: function () {
      this.$saturation_indicator.removeClass("dragging");
      d("body").off(".pickersaturation")
    },
    __color_text_keyup: function (g) {
      var f = d(g.currentTarget).val().replace(/[^0-9a-f]/gi, "");
      if (g.which === 13 && (f.length === 3 || f.length === 6)) {
        this.hsv = Tumblr.ColorUtilities.hex_to_hsv(f);
        this.update_hue();
        this.update_saturation(false)
      }
    },
    __paste: function (f) {
      f.preventDefault();
      f.stopPropagation();
      var h = false;
      if (window.clipboardData && window.clipboardData.getData) {
        h = window.clipboardData.getData("Text")
      } else {
        if (f.originalEvent.clipboardData && f.originalEvent.clipboardData.getData) {
          h = f.originalEvent.clipboardData.getData("text/plain")
        }
      }
      if (h) {
        h = String(h).replace(/[^0-9a-f]/gi, "");
        var g = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(h);
        if (g) {
          this.hsv = Tumblr.ColorUtilities.hex_to_hsv(h);
          this.update_hue();
          this.update_saturation(false)
        }
      }
      return false
    },
    initialize: function (f) {
      this.options = c.extend({}, this.defaults, f);
      this.current_color = (c.isObject(this.options.color)) ? this.options.color : Tumblr.ColorUtilities.hex_to_rgb(this.options.color);
      this.hsv = Tumblr.ColorUtilities.rgb_to_hsv.apply(this, c.toArray(this.current_color));
      this.current_hex = false;
      this.hue_width = 0;
      this.saturation_height = 0;
      this.saturation_width = 0;
      this.$hue = d();
      this.$hue_indicator = d();
      this.$saturation = d();
      this.$color = d();
      this.$color_text = d()
    },
    render: function () {
      this.$el.html(this.template({color: this.current_color, hue_position: this.hue_position}));
      this.$hue = this.$(".hue_selector");
      this.$hue_indicator = this.$(".hue_selector .indicator");
      this.$saturation = this.$(".saturation_wrapper");
      this.$saturation_indicator = this.$(".saturation_wrapper .indicator");
      this.$color = this.$(".color_value");
      this.$color_text = this.$(".color_value .color_text");
      this.update_hue();
      this.update_saturation(false);
      return this
    },
    update_hue: function () {
      var g = c.toArray(Tumblr.ColorUtilities.hsv_to_rgb(this.hsv.h, 1, 1));
      var f = "rgb(" + g.toString() + ")";
      this.$hue_indicator.css({"background-color": f, left: Math.round((this.hsv.h / 360) * 100) + "%"});
      this.$saturation.css("background-color", f);
      this.update_color_value()
    },
    update_saturation: function (f) {
      f = f || true;
      this.$saturation_indicator.css({
        left: Math.round(this.hsv.s * 100) + "%",
        top: Math.round(100 - (this.hsv.v * 100)) + "%"
      });
      if (f) {
        this.update_color_value()
      }
    },
    update_color_value: function () {
      var h = Tumblr.ColorUtilities.hsv_to_hex.apply(this, c.toArray(this.hsv));
      var g = this.hsv.s;
      var f = this.hsv.v;
      this.$saturation_indicator.css("background-color", h);
      this.$color.css("background-color", h);
      this.$color_text.css("color", (g < 0.2 && f > 0.8) ? "#444" : "#FFF").val(h);
      if (this.current_hex && h !== this.current_hex) {
        this.options.on_change(h)
      }
      this.current_hex = h
    },
    template: c.template('            <div class="hue_wrapper">                <div class="hue_selector">                    <div class="indicator"></div>                </div>                <div class="color_value">                    <input class="color_text" type="text" maxlength="7" />                </div>            </div>            <div class="saturation_wrapper">                <div class="saturation_inner">                    <div class="indicator"></div>                </div>            </div>        ')
  });
  b.Picker = a
})(jQuery, _, Backbone, Tumblr.ColorEditor);
/*! scripts/color_editor/views/color_editor_view.js */
Tumblr.ColorEditor || (Tumblr.ColorEditor = {});
(function (d, c, e, b) {
  var a = e.View.extend({
    className: "color_editor",
    colors: {
      red: ["#D95E40", "#FB4C16", "#FF4141", "#F0BFB6", "#FF7373"],
      yellow: ["#F2992E", "#FFD800", "#FFF231", "#DECBA4", "#E7EC6C"],
      green: ["#56BC8A", "#56BF4B", "#5ACDB3", "#9BCACA", "#BFE4A8"],
      blue: ["#529ECC", "#5AC9E1", "#5289DB", "#394ACB", "#6154C4"],
      purple: ["#A77DC2", "#B09BD5", "#D969C3", "#E1B7D2", "#FE3B80"],
      grayscale: ["#FFFFFF", "#F6F6F6", "#EEEEEE", "#CCCCCC", "#888888", "#666666", "#444444", "#222222", "#000000"]
    },
    defaults: {color: "#444444", debounce: 30, on_change: d.noop},
    events: {
      "click .palette_selector": "__palette_selector_click",
      "click .picker_selector": "__picker_selector_click"
    },
    __palette_selector_click: function (g) {
      g.preventDefault();
      var f = d(g.currentTarget);
      if (f.hasClass("selected")) {
        return
      }
      this.$(".color_selectors .selected").removeClass("selected");
      f.addClass("selected");
      if (f.hasClass("custom")) {
        this.render_custom_palette()
      } else {
        this.render_palette(f.data("color"))
      }
    },
    __picker_selector_click: function (g) {
      g.preventDefault();
      var f = d(g.currentTarget);
      if (f.hasClass("selected")) {
        return
      }
      this.$(".color_selectors .selected").removeClass("selected");
      f.addClass("selected");
      this.render_picker()
    },
    __custom_palette_change: function (f) {
      this.custom_palette = f;
      this.$custom_palette_selector.html(this.custom_palette_template({colors: f[0].slice(0, 3)}));
      this.$el.addClass("has_custom_palette");
      if (this.is_custom_palette_open) {
        this.render_custom_palette()
      }
    },
    __color_change: function (f) {
      if (c.isObject(f)) {
        this.current_color = Tumblr.ColorUtilities.rgb_to_hex(f.r, f.g, f.b)
      } else {
        this.current_color = f
      }
      this.$picker_selector.css("border-color", this.current_color);
      this.options.on_change(this.current_color)
    },
    initialize: function (f) {
      this.options = c.extend({}, this.defaults, f);
      this.current_color = this.options.color;
      this.current_color_palette = false;
      this.current_color_palette_page = 0;
      this.current_view = null;
      this.color_palette = null;
      this.custom_palette = null;
      this.is_custom_palette_open = false;
      this.$color_view = d();
      this.$custom_palette_selector = d();
      this.$picker_selector = d();
      if (Tumblr.Events && Tumblr.Flags.bool("indash_header_image_colors")) {
        this.listenTo(Tumblr.Events, "coloreditor:custompalette", this.__custom_palette_change)
      }
      this.generate_colors()
    },
    render: function () {
      this.$el.html(this.template({colors: this.colors}));
      this.$color_view = this.$(".color_view");
      this.$custom_palette_selector = this.$(".palette_selector.custom");
      this.$picker_selector = this.$(".picker_selector").css("border-color", this.current_color);
      this.$(".color_selectors .selected").removeClass("selected");
      if (this.current_color_palette) {
        this.$('.palette_selector[data-color="' + this.current_color_palette + '"]').addClass("selected");
        this.render_palette(this.current_color_palette, this.current_color_palette_page)
      } else {
        this.$(".picker_selector").addClass("selected");
        this.render_picker()
      }
      return this
    },
    render_palette: function (f, g) {
      this.remove_current_view();
      this.current_view = new b.Palette({
        colors: this.color_palette[f],
        current_color: this.current_color,
        current_page: g || 0,
        on_change: c.bind(this.__color_change, this)
      });
      this.$color_view.html(this.current_view.render().el)
    },
    render_custom_palette: function () {
      if (!this.custom_palette) {
        return
      }
      this.remove_current_view();
      this.current_view = new b.Palette({
        colors: this.custom_palette,
        current_color: this.current_color,
        current_page: 0,
        on_change: c.bind(this.__color_change, this)
      });
      this.$color_view.html(this.current_view.render().el);
      this.is_custom_palette_open = true
    },
    render_picker: function () {
      this.remove_current_view();
      this.current_view = new b.Picker({
        color: Tumblr.ColorUtilities.hex_to_rgb(this.current_color),
        debounce: this.options.debounce,
        on_change: c.bind(this.__color_change, this)
      });
      this.$color_view.html(this.current_view.render().el)
    },
    remove_current_view: function () {
      if (this.current_view) {
        this.current_view.remove();
        this.current_view = null
      }
      this.is_custom_palette_open = false
    },
    generate_colors: function () {
      var f = {};
      c.each(this.colors, function (k, j) {
        f[j] = [];
        if (j === "grayscale") {
          if (k.indexOf(this.current_color) > -1) {
            this.current_color_palette = j;
            this.current_color_palette_page = 0
          }
          f[j].push(k)
        } else {
          for (var h = 0, g = k.length; h < g; h++) {
            var m = this.get_color_variations(k[h]);
            if (m.indexOf(this.current_color) > -1) {
              this.current_color_palette = j;
              this.current_color_palette_page = h
            }
            f[j].push(m)
          }
        }
      }, this);
      this.color_palette = f
    },
    get_color_variations: function (g) {
      var f = [];
      var h = Tumblr.ColorUtilities.hex_to_hsv(g);
      var k = 0.2;
      for (var j = 4; j > 0; j--) {
        var l = k * j;
        f.push(Tumblr.ColorUtilities.hex_brightness(g, l))
      }
      f.push(g);
      for (var j = 1; j <= 4; j++) {
        var l = -(k * j);
        f.push(Tumblr.ColorUtilities.hex_brightness(g, l))
      }
      return f
    },
    template: c.template('            <div class="color_selectors">                <a class="palette_selector" data-color="red" style="background-color:<%= colors.red[0] %>" />                <a class="palette_selector" data-color="yellow" style="background-color:<%= colors.yellow[0] %>" />                <a class="palette_selector" data-color="green" style="background-color:<%= colors.green[0] %>" />                <a class="palette_selector" data-color="blue" style="background-color:<%= colors.blue[0] %>" />                <a class="palette_selector" data-color="purple" style="background-color:<%= colors.purple[0] %>" />                <a class="palette_selector grayscale" data-color="grayscale" style="background-color:#444" />                <a class="palette_selector custom" />                <a class="picker_selector" />            </div>            <div class="color_view"></div>        '),
    custom_palette_template: c.template('            <% _.each(colors, function(color) { %>                <span class="custom_color" style="background-color:<%- color %>"></span>            <% }) %>        ')
  });
  b.Editor = a
})(jQuery, _, Backbone, Tumblr.ColorEditor);
/*! scripts/color_editor/color_editor.js */

/*! scripts/tumblelog_popover/tumblelog_popover.js */

/*! scripts/application/ajax_request.js */
(function (e, g, h, c) {
  var b = window.l10n_str || {};
  var j = [{useraction: "follow", url: "/svc/follow"}, {
    useraction: "unfollow",
    url: "/svc/unfollow"
  }, {useraction: "like", url: "/svc/like"}, {useraction: "unlike", url: "/svc/unlike"}, {
    useraction: "reply",
    url: "/svc/reply"
  }, {useraction: "report", url: "/svc/report"}];
  var a = function (i, k) {
    return function (n, m) {
      if (!i) {
        return
      }
      n = n || {};
      m = m || {};
      if (m.init) {
        m.init()
      }
      var l = e.ajax({
        url: i,
        type: "POST",
        data: {form_key: e("#tumblr_form_key").attr("content"), data: n},
        with_form_key: true
      });
      l.success(function () {
        if (m.success) {
          m.success()
        }
        if (Tumblr.Events) {
          Tumblr.Events.trigger("useraction:xhr:success", k, n)
        }
      });
      l.error(function (o) {
        if (o && o.status === 403) {
          if (m.success) {
            m.success()
          }
          return
        }
        if (m.error) {
          m.error()
        } else {
          if (Tumblr.Dialog) {
            Tumblr.Dialog.alert(b.ajax_error)
          }
        }
        if (Tumblr.Events) {
          Tumblr.Events.trigger("useraction:xhr:error", k, n)
        }
      });
      l.complete(function () {
        if (m.complete) {
          m.complete()
        }
      });
      return l
    }
  };
  var f = j.length;
  for (var d = f - 1; d >= 0; d--) {
    c[j[d].useraction] = a(j[d].url, j[d].useraction)
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/tabs.js */
(function (c, b, d, a) {
  a.Tabs = d.View.extend({
    el: "#user_tools", events: {"click #logout_button": "logout",}, initialize: function () {
    }, logout: function (i) {
      i.preventDefault();
      var h = c(i.currentTarget);
      var g = h.data("confirm-message");
      var f = h.attr("href");
      if (b.isObject(Tumblr.Dialog)) {
        Tumblr.Dialog.confirm(g, b.bind(function () {
          window.location.href = f
        }));
        return false
      }
    }
  })
})(jQuery, _, Backbone, Tumblr);
/*! scripts/application/blog_menu.js */
(function (c, d, b, a) {
  a.BlogMenu = d.View.extend({
    el: "#dashboard_controls_open_blog",
    events: {
      "click #popover_button_blogs": "click_popover_button",
      "click #popover_blogs .popover_menu_item": "click_popover_blogs"
    },
    initialize: function () {
      if (c("#popover_blogs").length) {
        this.popover = new Tumblr.Popover({
          el: this.$("#popover_button_blogs"),
          popover: this.$("#popover_blogs"),
          disable_auto_show: true,
          glassless: true,
          on_hide: function () {
            c("#all_channel_count_notice").show()
          }
        });
        this.sortable = new Tumblr.SortableView({
          el: this.$("#popover_blogs"),
          items: ".item",
          callback: b.bind(this.save, this),
          scrollable: true
        })
      }
    },
    click_popover_button: function (e) {
      if (e.target.id === "open_blog_link") {
        return
      }
      e.stopPropagation();
      e.preventDefault();
      this.popover.show();
      c("#all_channel_count_notice").hide()
    },
    click_popover_blogs: function (g) {
      var f = this.$(g.currentTarget);
      var e = f.find("a").attr("href");
      if (Tumblr.Prima.Url.hasAllowedProtocol(e)) {
        if (g.metaKey || g.altKey) {
          window.open(e)
        } else {
          window.location = e
        }
      }
      this.popover.hide();
      g.stopPropagation();
      g.preventDefault()
    },
    save: function (f) {
      var e = b.map(f.sequence(), function (g) {
        return g.replace("menuitem-", "")
      });
      c.ajax({type: "POST", url: "/order", data: "channel_names=" + JSON.stringify(e)})
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/language_menu.js */
(function (d, e, b, c, a) {
  a.LanguageMenu = Tumblr.Popover.extend({
    events: {click: "toggle", "click .popover_menu_item a": "select_language"},
    initialize: function () {
      if (!this.$el.length) {
        return
      }
      Tumblr.Popover.prototype.initialize.apply(this, arguments);
      this.update_timezone();
      this.update_position();
      this.language_form = this.$el.find("#set_language");
      this.language_form_type = this.language_form.attr("method");
      this.language_form_url = this.language_form.attr("action")
    },
    show: function () {
      Tumblr.Popover.prototype.show.call(this);
      this.$el.closest("#sidebar_footer_nav").addClass("show_popover");
      this.update_position()
    },
    hide: function () {
      Tumblr.Popover.prototype.hide.call(this);
      this.$el.closest("#sidebar_footer_nav").removeClass("show_popover")
    },
    select_language: function (f) {
      var g = d(f.target);
      f.preventDefault();
      d("#language_selected").val(g.attr("data-lang"));
      d("#language_switcher .current").removeClass("current");
      if (this.spinner) {
        this.spinner.stop()
      } else {
        this.spinner = new c({
          top: "auto",
          left: "100%",
          width: 2,
          radius: 3,
          length: 2,
          color: "#444",
          className: "language_switcher_spinner"
        })
      }
      this.spinner.spin(g[0]);
      this.set_language()
    },
    set_language: function () {
      var f = b(this.language_form.serializeArray()).map(function (g) {
        return [g.name, g.value]
      }).zipObject().value();
      d.ajax({
        type: this.language_form_type, url: this.language_form_url, data: f, complete: function () {
          if (f.redirect_to) {
            window.location = f.redirect_to
          } else {
            window.location.reload()
          }
        }
      })
    },
    update_position: function () {
      var f = Math.floor(this.popover.outerWidth() / 2);
      this.popover.css({marginLeft: -f + "px"})
    },
    update_timezone: function () {
      var g = new Date();
      var i = new Date(g.getFullYear(), 0, 1, 0, 0, 0, 0);
      var h = new Date(i.toGMTString().replace(/(.*)(\s\S+)/, "$1"));
      var f = Math.round((i - h) / (1000 * 60 * 60));
      this.$el.removeClass("americas europe_africa asia_pacific");
      switch (f) {
        case -12:
        case -11:
        case -10:
        case -9:
        case -8:
        case -7:
        case -6:
        case -4:
        case -3:
        case -2:
        case -1:
          this.$el.addClass("americas");
          break;
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          this.$el.addClass("europe_africa");
          break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
          this.$el.addClass("asia_pacific");
          break;
        default:
          this.$el.addClass("americas");
          break
      }
      return f
    }
  })
})(jQuery, Backbone, _, Spinner, Tumblr);
/*! scripts/application/password_strength_meter.js */
(function (c, d, b, a) {
  a.PasswordStrengthMeter = d.View.extend({
    defaults: {
      password: "#signup_password",
      email: "#signup_email",
      tumblelog: "#signup_username"
    }, initialize: function (e) {
      this.options = e || {};
      this.options = b.extend(this.defaults, this.options);
      this.$password_meter = c("#password_strength_meter");
      this.$password = c(this.options.password);
      this.$email = c(this.options.email);
      this.$tumblelog = c(this.options.tumblelog);
      if (!this.$password.length) {
        return
      }
      this.class_name = "password_strength_meter";
      this.password_meter_markup = '<div class="password_strength_meter inactive" id="password_strength_meter"><strong class="l5"></strong><strong class="l4 l5"></strong><strong class="l3 l4 l5"></strong><strong class="l2 l3 l4 l5"></strong><strong class="l1 l2 l3 l4 l5"></strong></div>';
      this.render();
      this.test_password();
      this.$password.on("keydown keyup focus blur", b.throttle(b.bind(function (f) {
        if (this.last_checked !== this.get_password()) {
          this.test_password(f)
        }
      }, this), 250))
    }, render: function () {
      if (!this.$password_meter.length) {
        this.$password.after(this.password_meter_markup);
        this.$password_meter = c("#password_strength_meter")
      }
    }, set_inactive: function () {
      this.$password_meter.addClass("inactive")
    }, set_active: function () {
      this.$password_meter.removeClass("inactive")
    }, set_level: function (e) {
      this.set_active();
      switch (e) {
        case 1:
          this.$password_meter[0].className = this.class_name + " level_1";
          break;
        case 2:
          this.$password_meter[0].className = this.class_name + " level_2";
          break;
        case 3:
          this.$password_meter[0].className = this.class_name + " level_3";
          break;
        case 4:
          this.$password_meter[0].className = this.class_name + " level_4";
          break;
        case 5:
          this.$password_meter[0].className = this.class_name + " level_5";
          break;
        default:
          this.$password_meter[0].className = this.class_name;
          break
      }
    }, test_password: function (e) {
      this.last_checked = this.$password.val();
      if (!e || !this.$password.val().length) {
        this.set_inactive();
        return
      }
      this.get_password_strength()
    }, update: function () {
      this.test_password()
    }, get_email: function () {
      return this.$email.val()
    }, get_password: function () {
      return this.$password.val()
    }, get_username: function () {
      return this.$tumblelog.val()
    }, get_form_data: function () {
      var e = {};
      e.username = this.get_username();
      e.email = this.get_email();
      e.password = this.get_password();
      return e
    }, get_password_strength: function () {
      if (this.pw_xhr) {
        this.pw_xhr.abort()
      }
      this.pw_xhr = c.ajax({
        url: "/svc/account/validation",
        dataType: "json",
        type: "POST",
        data: this.get_form_data()
      });
      this.pw_xhr.done(b.bind(function (e) {
        var f = e.score || 0;
        this.set_level(f);
        this.block_registration_step = (e.reject_reason) ? e.reject_reason : false;
        delete this.pw_xhr
      }, this))
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/report_tumblelog.js */
(function (c, d, b, a) {
  a.ReportTumblelogView = d.View.extend({
    el: "#report_tumblelog_bar",
    events: {
      "click .spam": "report_spam",
      "click .harassment": "report_harassment",
      "click .dismiss": "dismiss",
      mouseenter: "delay_dismiss",
      mouseleave: "timeout_dismiss"
    },
    initialize: function () {
      Tumblr.Events.on("block_tumblelog", b.bind(this.block_tumblelog, this))
    },
    block_tumblelog: function (e) {
      if (e.can_report) {
        this.tumblelog = e.tumblelog;
        this.animate_in();
        this.timeout_dismiss()
      }
    },
    animate_in: function () {
      this.$el.find("#report_tumblelog_with_name").show();
      this.$el.find("#report_tumblelog_name").html(this.tumblelog);
      this.$el.fadeIn(300)
    },
    report_spam: function () {
      var e = this.tumblelog;
      Tumblr.report({tumblelog: e, reason: "1"}).done(function () {
        Tumblr.Events.trigger("report_tumblelog", {tumblelog: e, reason: "spam"})
      }).always(b.bind(function () {
        this.dismiss()
      }, this))
    },
    report_harassment: function () {
      var e = this.tumblelog;
      Tumblr.report({tumblelog: e, reason: "2"}).done(function () {
        Tumblr.Events.trigger("report_tumblelog", {tumblelog: e, reason: "harassment"})
      }).always(b.bind(function () {
        this.dismiss()
      }, this))
    },
    dismiss: function () {
      this.$el.fadeOut(300, b.bind(function () {
        this.$el.find("#report_tumblelog_name").html("");
        this.$el.find("#report_tumblelog_with_name").hide()
      }, this))
    },
    timeout_dismiss: function (e) {
      e = e || 3000;
      clearTimeout(this.dismissTimeout);
      this.dismissTimeout = setTimeout(b.bind(function () {
        this.dismiss()
      }, this), 3000)
    },
    delay_dismiss: function () {
      clearTimeout(this.dismissTimeout)
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/full_height_no_posts_found.js */
(function (c, d, b, a) {
  a.FullHeightNoPostsFound = d.View.extend({
    initialize: function () {
      this.$no_posts_found = c(".no_posts_found");
      this.$left_column = c("#left_column");
      this.$right_column = c("#right_column");
      if (this.$no_posts_found.length && this.$left_column.length && this.$right_column.length) {
        if (this.$right_column.css("min-height") !== "0px") {
          return
        }
        var f = this.$left_column.height(), e = this.$right_column.height(), h = 0, g = "+";
        if (f < e) {
          g = "+";
          h = e - f
        } else {
          if (f > e) {
            g = "-";
            h = f - e;
            if (h >= 50) {
              h = 0
            }
          }
        }
        this.center_padding(h, g)
      }
    }, center_padding: function (e, g) {
      if (e > 0 && (g === "+" || g === "-")) {
        var f = e / 2;
        this.$no_posts_found.css("padding-top", g + "=" + f).css("padding-bottom", g + "=" + f)
      }
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/blog_name_helper.js */
(function (c, d, b, a) {
  a.BlogNameHelper = {
    validate_tumblelog_name: function (e) {
      return !(/^-|-$|[^\-a-z0-9]|tumblr/i).test(e)
    }, has_starting_hyphen: function (e) {
      return (/^-/).test(e)
    }, has_ending_hyphen: function (e) {
      return (/-$/).test(e)
    }, clean_tumblelog_name: function (e) {
      return e.toLowerCase().replace(/[^\-a-z0-9]/g, "-").replace(/^-+|-+$/g, "").replace(/tumblr/gi, "")
    }
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/fan_mail.js */
(function (c, d, b, a) {
  a.FanMail = {
    show: function (k, i) {
      i = i || {};
      var h = b.has(i, "transparent_lightbox") ? i.transparent_lightbox : false;
      var g = b.has(i, "href") ? i.href : false;
      var e = b.has(i, "show_loader") ? i.show_loader : true;
      if (!g && k && k.href) {
        g = k.href
      }
      g += (g.indexOf("?") !== -1 ? "&" : "?") + "lightbox=true";
      if (h) {
        g += "&transparent_lightbox=true"
      }
      if (e) {
        var f = c('<div id="send_fan_mail_lightbox_loader"></div>');
        f.css({
          zIndex: 4294967294,
          position: "fixed",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          width: "100%",
          height: "100%",
          background: "transparent url('/images/fan_mail/grid_bg_lightbox.png?709') center"
        });
        f.html('<div style="position:absolute; top:0; left:0; right:0; bottom:0; background:transparent center no-repeat url(\'/images/loading_big_fff_on_2e3133.gif?709\')"><img style="position:absolute; left:0; top:0; width:100%; height:100%; opacity:0.3;" src="/images/full_page_vignette.png?709"/></div>');
        c("body").append(f)
      }
      var j = c('<iframe id="send_fan_mail_lightbox" scrolling="no" border="0" frameBorder="0"/>');
      j.attr("src", g);
      j.css({
        zIndex: 4294967294,
        display: "none",
        position: "fixed",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        width: "100%",
        height: "100%",
        background: "transparent",
        overflow: "hidden"
      });
      j.load(function () {
        c("#send_fan_mail_lightbox_loader").hide();
        c("#send_fan_mail_lightbox").show()
      });
      c("body").append(j)
    }, hide: function () {
      c("#send_fan_mail_lightbox").hide().remove();
      c("#send_fan_mail_lightbox_loader").hide().remove();
      Tumblr.Events.trigger("fan_mail:form:hide")
    }, sending: function () {
      c("#send_fan_mail_lightbox").hide().load(function () {
        c("#send_fan_mail_lightbox_loader").hide();
        c("#send_fan_mail_lightbox").show()
      });
      c("#send_fan_mail_lightbox_loader").show()
    }, make_url_from_tumblelog: function (e) {
      return "/send/" + e
    }
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/activity_sparkline.js */
(function (c, d, b, a) {
  a.ActivitySparkline = d.View.extend({
    el: "#dashboard_controls_open_blog .activity .count", initialize: function () {
      if (this.$el.length) {
        var e = this.$el.data("sparkline");
        if (b.isFunction(this.$el.sparkline)) {
          try {
            if (typeof(e) !== "object") {
              throw"sparkline is not an object"
            }
            if (b.max(e) === 0) {
              throw"sparkline has no interesting data"
            }
            this.$el.sparkline(e, {
              type: "line",
              lineColor: "#ffffff",
              fillColor: false,
              lineWidth: 4,
              chartRangeMin: 0,
              spotColor: false,
              minSpotColor: false,
              maxSpotColor: false,
              disableInteraction: true,
              width: "72px",
              height: "30px"
            });
            this.$el.find("canvas").css({height: "15px", width: "36px"});
            return
          } catch (f) {
          }
        }
      }
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/tumblelog_actions.js */
(function (d, e, b, a) {
  var c = window.l10n_str || {};
  a.TumblelogActions = {
    confirm: function (h) {
      var g = d.Deferred();
      h = h || {};
      if (!h.tumblelog) {
        return g.reject()
      }
      var f = h.avatar_url || "/images/anonymous_avatar_96.png";
      if (f && !f.match(/96\.png/)) {
        f = f.replace(/_(\d\d.?)\.png/, "_96.png")
      }
      var j = function () {
        g.resolve();
        d("body").removeClass("dialog_open")
      };
      var i = function () {
        g.reject();
        d("body").removeClass("dialog_open")
      };
      Tumblr.Dialog.confirm({
        text: h.confirm_text || "",
        text_ok: h.text_ok || Tumblr.Dialog.__("Ok"),
        text_cancel: Tumblr.Dialog.__("Nevermind"),
        callback_ok: j,
        callback_cancel: i,
        templates: {content: ['<div class="avatar_image" style="background-image: url(' + f + ');">', '<div class="avatar_frame"></div>', "</div>", '<span class="text"><%= text %></span>'].join("")}
      });
      return g.promise()
    }, confirm_ignore: function (i) {
      if (!i.tumblelog) {
        var h = d.Deferred();
        return h.reject()
      }
      var f = "";
      var g = i.tumblelog.match(/post\_id\:/) || i.tumblelog.match(/ip\:/);
      if (g) {
        f = c.confirm_block_this_person
      } else {
        f = c.confirm_block.replace("%1$s", "<strong>" + i.tumblelog + "</strong>")
      }
      if (!i.confirm_text) {
        i.confirm_text = f
      }
      i.text_ok = Tumblr.Dialog.__("Ignore");
      return this.confirm(i)
    }, confirm_unfollow: function (g) {
      if (!g.tumblelog) {
        var f = d.Deferred();
        return f.reject()
      }
      g.confirm_text = Tumblr.Dialog.__("Are you sure you want to unfollow %1$s?").replace("%1$s", "<strong>" + g.tumblelog + "</strong>");
      g.text_ok = Tumblr.Dialog.__("Unfollow");
      return this.confirm(g)
    }
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/notes_and_notifications/base_view.js */
(function (c, d, b, a) {
  a.NotesBaseView = d.View.extend({
    ignore: function (f) {
      f.preventDefault();
      c("body").addClass("dialog_open");
      var h = this.tumblelog;
      var g = Tumblr.TumblelogActions.confirm_ignore({
        tumblelog: h,
        avatar_url: c(f.delegateTarget).find(".avatar").attr("src")
      });
      g.done(function () {
        Tumblr.Events.trigger("block_tumblelog", {tumblelog: h, can_report: true})
      });
      return false
    }, block: function (g) {
      g.preventDefault();
      g.stopPropagation();
      c("body").addClass("dialog_open");
      var f = {blockedTumblelog: this.tumblelog};
      Tumblr.Prima.Block.confirmBlock(f).then(b.bind(this._blockConfirmed, this))
    }, _blockConfirmed: function () {
      var e = new Tumblr.Prima.Models.Tumblelog({name: this.tumblelog});
      e.block().then(b.bind(this._afterBlock, this))
    }, _afterBlock: function () {
      Tumblr.Prima.Events.trigger("block_tumblelog", {tumblelog: this.tumblelog, can_report: false});
      Tumblr.Prima.Events.trigger("blocks:block_added", {loggingData: {from: "note"}})
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/notes_and_notifications/notification_view.js */
(function (d, e, b, a) {
  var c = window.l10n_str || {};
  a.NotificationView = Tumblr.NotesBaseView.extend({
    events: {
      'click [data-action="ignore"]': "ignore",
      'click [data-action="block"]': "block",
      "mousedown .notification_inner": "before_notification_click",
      "mouseup .notification_inner": "after_notification_click",
      "click .notification_inner": "notification_click",
      "click .notification_follow_button": "notification_follow",
      "click .photo_reply_image": "notification_photo_reply_image",
      "mouseenter .notification .block": "notification_block_hover",
      "mouseleave .notification .block": "notification_block_hover",
      "mouseenter .control": "control_hover_in",
      "mouseleave .control": "control_hover_out"
    }, initialize: function () {
      this.tumblelog = this.$el.find("a.block").attr("data-tumblelog");
      Tumblr.Events.on("block_tumblelog", b.bind(this.tumblelog_block, this));
      if (this.$el.find("a.block").length) {
        this.$el.addClass("can_ignore")
      }
    }, tumblelog_block: function (f) {
      if (this.tumblelog === f.tumblelog) {
        this.$el.addClass("ignored").addClass("no_active").addClass("no_hover").removeClass("can_ignore");
        this.$el.find(".block").remove();
        this.$el.unbind()
      }
    }, update: function () {
      this.$el.find(".notification .notification_text").each(function (g, h) {
        var f = d(h);
        if (f.find("a").length > 1) {
          f.addClass("underline_links")
        }
      });
      this.$el.find(".notification a.block").each(function (g, h) {
        var f = d(h);
        f.closest(".notification").addClass("can_ignore")
      })
    }, before_notification_click: function (g) {
      var f = d(g.target);
      if (f.is(".photo_reply_image") || f.is(".photo_reply_image_container")) {
        this.$el.addClass("no_active")
      }
    }, after_notification_click: function (g) {
      var f = d(g.target);
      if (f.is(".photo_reply_image") || f.is(".photo_reply_image_container")) {
        this.$el.removeClass("no_active")
      }
    }, notification_click: function (h) {
      var f = d(h.target);
      if (!f.is("a") && !f.is(".photo_reply_image_container")) {
        h.stopPropagation();
        h.preventDefault();
        var g = this.$el.find(".notification_target").attr("href");
        if (!g && this.$el.find("a").length === 1) {
          g = this.$el.find("a").attr("href")
        }
        if (g) {
          window.open(g)
        }
      }
    }, notification_follow: function (g) {
      g.stopPropagation();
      g.preventDefault();
      var f = d(g.currentTarget);
      f.addClass("animated").addClass("poof");
      window.setTimeout(b.bind(function () {
        f.parent().remove();
        this.$el.removeClass("has_follow");
        f.addClass("final_state")
      }, this), 1000);
      Tumblr.follow({
        tumblelog: f.attr("data-tumblelog-name"),
        source: "FOLLOW_SOURCE_DASHBOARD_NOTIFICATION"
      }, {
        success: function () {
          var h = d('[href="' + f.attr("data-tumblelog-name") + '"]');
          h.hide()
        }, error: function () {
          Tumblr.Dialog.alert(c.ajax_error)
        }
      })
    }, notification_photo_reply_image: function (g) {
      var f = d(g.target);
      g.stopPropagation();
      g.preventDefault();
      Tumblr.Lightbox.init([{high_res: f.attr("src"), low_res: f.attr("src"), width: 500}])
    }, notification_block_hover: function () {
    }, control_hover_in: function () {
      this.$el.addClass("control_hover")
    }, control_hover_out: function () {
      this.$el.removeClass("control_hover")
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/notes_and_notifications/notifications_view.js */
(function (c, d, b, a) {
  a.Notifications = d.View.extend({
    el: "#posts",
    events: {"click .notification_dismiss": "notification_dismiss"},
    initialize: function () {
      if ("AfterAutoPaginationQueue" in window) {
        window.AfterAutoPaginationQueue.push(b.bind(this.updateViews, this))
      }
      this.updateViews();
      this.$el.find(".notification .notification_text").each(function (f, g) {
        var e = c(g);
        if (e.find("a").length > 1) {
          e.addClass("underline_links")
        }
      })
    },
    updateViews: function () {
      this.$el.find(".notification:not([data-view-exists])").each(function (f, g) {
        var e = c(g);
        if (!e.attr("data-view-exists")) {
          new Tumblr.NotificationView({el: g});
          e.attr("data-view-exists", true)
        }
      })
    },
    notification_dismiss: function (h) {
      h.stopPropagation();
      h.preventDefault();
      var f = c(h.target);
      var k = f.parents(".notification");
      var j = k.data("cookie");
      if (j) {
        j = j.split("|");
        var g = j[0] || "";
        var i = j[1] || "";
        var l = parseInt(j[2], 10) || null;
        if (g) {
          Tumblr.Cookie.set(g, i, l)
        }
      }
      var e = k.data("ajax");
      if (e) {
        c.get(e)
      }
      k.css("display", "none")
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/notes_and_notifications/note_view.js */
(function (c, d, b, a) {
  a.NoteView = Tumblr.NotesBaseView.extend({
    events: {
      'click [data-action="ignore"]': "ignore",
      'click [data-action="block"]': "block",
      mouseenter: "note_hover",
      mouseleave: "note_out",
      mousedown: "note_down",
      mouseup: "note_up"
    }, initialize: function () {
      this.tumblelog = this.$el.attr("data-tumblelog");
      Tumblr.Events.on("block_tumblelog", b.bind(this.tumblelog_block, this))
    }, note_down: function (g) {
      var f = c(g.target);
      if (!f.is("a") && !f.is("img")) {
        this.$el.addClass("active")
      }
    }, note_hover: function () {
      this.$el.addClass("hover")
    }, note_out: function () {
      this.$el.removeClass("hover").removeClass("active")
    }, note_up: function () {
      this.$el.removeClass("active")
    }, tumblelog_block: function (e) {
      if (this.tumblelog === e.tumblelog) {
        this.$el.addClass("ignored").addClass("no_active").addClass("no_hover").removeClass("can_ignore");
        this.$el.find(".block").remove();
        this.$el.unbind()
      }
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/notes_and_notifications/reblog_note_view.js */
(function (c, d, b, a) {
  a.ReblogNoteView = Tumblr.NoteView.extend({
    events: function () {
      return b.extend({}, Tumblr.NoteView.prototype.events, {
        "mouseenter .avatar_frame": "note_img_hover",
        "mouseleave .avatar_frame": "note_img_out",
        "mouseleave .block": "note_img_out"
      })
    }, note_img_hover: function () {
      this.$el.removeClass("hover")
    }, note_img_out: function () {
      this.$el.addClass("hover")
    },
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/notes_and_notifications.js */

/*! scripts/application/buttons_panos.js */
(function (c, d, b, a) {
  a.Panos = {
    init: function () {
      c("#posts").on("click", ".panorama", function (f) {
        if (f.shiftKey || f.ctrlKey || f.altKey || f.metaKey) {
          return
        }
        var e = c(f.target).closest(".panorama");
        if (e.hasClass("with_clickthru") && f.target.className !== "zoomer") {
          return
        }
        f.stopImmediatePropagation();
        f.preventDefault();
        e.panorama({lightbox: true})
      })
    }
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/custom_resize_anchor.js */
(function (d, e, c, b) {
  var a = function (g, f) {
    if (!(this instanceof a)) {
      return new a(g, f)
    }
    this.el = (typeof g === "string") ? d(g).get(0) : g;
    this.$el = d(g);
    this.options = f;
    if (this.$el.data("resizeAnchor")) {
      return this.$el.data("resizeAnchor")
    }
    this.$el.data("resizeAnchor", this);
    this.metadata = this.$el.data("plugin-options");
    this.config = d.extend({}, a.defaults, this.options, this.metadata);
    this.config.resize = this.$el.css("resize") || "both";
    if (this.config.create_container) {
      this.$container = d("<div/>").addClass(this.config.container_class).insertBefore(this.$el);
      this.$container.append(this.$el);
      this.$clearfix = d("<div/>").addClass(this.config.clearfix_class).insertAfter(this.$container)
    }
    this.$anchor = d("<span/>").attr({
      onclick: "return false;",
      tabindex: -1
    }).addClass(this.config.anchor_class).insertAfter(this.$el);
    this.anchor_visibility();
    this.resize_start = d.proxy(this._resize_start, this);
    this.resize_move = d.proxy(this._resize_move, this);
    this.resize_end = d.proxy(this._resize_end, this);
    this.$anchor.on("mousedown", this.resize_start);
    this.$parent = d(window);
    a.register(this);
    return this
  };
  a.prototype = {
    __event_position: function (g) {
      var f, h;
      f = g.pageX;
      h = g.pageY;
      return {x: f, y: h}
    }, _resize_start: function (f) {
      this.start_width = this.$el.outerWidth();
      this.start_height = this.$el.outerHeight();
      this.start_position = this.__event_position(f);
      this.$parent.on("mousemove", this.resize_move);
      this.$parent.on("mouseup", this.resize_end);
      f.preventDefault()
    }, _resize_move: function (f) {
      this.current_position = this.__event_position(f);
      switch (this.config.resize) {
        case"vertical":
          this.set_height(this.current_position.y - this.start_position.y + this.start_height);
          break;
        case"horizontal":
          this.set_width(this.current_position.x - this.start_position.x + this.start_width);
          break;
        case"both":
          this.set_size(this.current_position.x - this.start_position.x + this.start_width, this.current_position.y - this.start_position.y + this.start_height);
          break;
        case"none":
          break
      }
    }, _resize_end: function (f) {
      this.$parent.off("mousemove", this.resize_move);
      this.$parent.off("mouseup", this.resize_end)
    }, anchor_visibility: function () {
      if (this.config.resize === "none") {
        this.$anchor.hide()
      } else {
        this.$anchor.show()
      }
    }, set_width: function (f) {
      this.$el.css("width", Math.max(0, f))
    }, set_height: function (f) {
      this.$el.css("height", Math.max(0, f))
    }, set_size: function (g, f) {
      this.$el.css({width: Math.max(0, g), height: Math.max(0, f)})
    }, destroy: function () {
      this.$anchor.remove();
      if (this.config.create_container) {
        this.$el.insertBefore($container);
        this.$container.remove();
        this.$clearfix.remove()
      }
    }
  };
  a.instances = [];
  a.defaults = {
    container_class: "resize_textarea_container",
    clearfix_class: "resize_textarea_clearfix",
    anchor_class: "resize_textarea_anchor",
    create_container: true
  };
  a.register = function (f) {
    this.instances.push(f)
  };
  a.destroy_all = function () {
    for (var f = 0; f < this.instances.length; f++) {
      this.instances[f].destroy()
    }
  };
  d.fn.resizeanchor = function (f) {
    return this.each(function () {
      new a(this, f)
    })
  };
  b.ResizeAnchor = a
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/autoexpand_textarea.js */
(function (d, e, b, a) {
  var c = function (h, f) {
    if (!(this instanceof c)) {
      return new c(h, f)
    }
    this.el = (typeof h === "string") ? d(h).get(0) : h;
    this.$el = d(h);
    this.options = f;
    this.metadata = this.$el.data("plugin-options");
    this.config = d.extend({}, c.defaults, this.options, this.metadata);
    var g = parseInt(this.$el.css("lineHeight"), 10);
    this.minHeight = this.oldHeight = (this.config.minHeight) ? this.config.minHeight : this.$el.height();
    this.maxHeight = (this.config.maxHeight) ? this.config.maxHeight : false;
    this.padder = g;
    this.$el.css("min-height", this.minHeight);
    this.$el.each(d.proxy(function (i) {
      this.create_shadow(i)
    }, this));
    this.events = {__input: d.proxy(this.__input, this), __mouseup: d.proxy(this.__mouseup, this)};
    this.$el.on("input", this.events.__input);
    this.$el.on("mouseup", this.events.__mouseup);
    this.update(this.$el);
    c.register(this);
    return this
  };
  c.prototype = {
    __input: function (g) {
      var f = d(g.currentTarget);
      this.update(f)
    }, __mouseup: function (g) {
      var f = d(g.currentTarget);
      this.oldHeight = f.outerHeight();
      if (this.oldHeight >= this.maxHeight) {
        this.maxHeight = this.oldHeight
      }
    }, create_shadow: function (f) {
      this.$shadow = (d("." + this.config.shadowClass).length) ? d("." + this.config.shadowClass) : d("<div/>", {"class": this.config.shadowClass});
      this.$shadow.css({
        position: "absolute",
        top: -10000,
        left: -10000,
        width: this.$el.width(),
        fontSize: this.$el.css("fontSize"),
        fontFamily: this.$el.css("fontFamily"),
        fontWeight: this.$el.css("fontWeight"),
        lineHeight: this.$el.css("lineHeight")
      }).appendTo(document.body)
    }, replace_value: function (f) {
      return f.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\n$/, "<br/>&nbsp;").replace(/\n/g, "<br/>")
    }, update: function (f) {
      var h = this.replace_value(f.val());
      this.$shadow.css("width", this.$el.width());
      this.$shadow.html(h);
      var g = Math.max(this.$shadow.height() + this.padder, this.oldHeight);
      if ((this.maxHeight && (g < this.maxHeight)) || !this.maxHeight) {
        this.$el.css("height", g)
      } else {
        this.$el.css("height", this.maxHeight)
      }
    }, destroy: function () {
      this.$shadow.remove();
      this.$el.off("input", this.events.__input);
      this.$el.off("mouseup", this.events.__mouseup)
    }
  };
  c.instances = [];
  c.defaults = {shadowClass: "autoexpand_shadow", minHeight: false, maxHeight: 400};
  c.register = function (f) {
    this.instances.push(f)
  };
  c.destroy_all = function () {
    for (var f = 0; f < this.instances.length; f++) {
      this.instances[f].destroy()
    }
  };
  d.fn.autoexpand = function (f) {
    return this.each(function () {
      new c(this, f)
    })
  };
  a.AutoExpand = c
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/event_relay.js */
(function (c, e, b, a) {
  var d = function (g, f) {
    if (!(this instanceof d)) {
      return new d(g, f)
    }
    this.el = (typeof g === "string") ? c(g).get(0) : g;
    this.$el = c(g);
    this.options = f;
    this.metadata = this.$el.data("plugin-options");
    this.config = c.extend({}, d.defaults, this.options, this.metadata);
    if (this.config.event) {
      this.config.events = this.config.event
    }
    if (this.config.selector) {
      this.config.child_selector = this.config.selector
    }
    this.$relay_targets = c(this.$el.find(this.config.child_selector)).add(c(this.config.global_selector));
    this.$el.addClass(this.config.relay_class);
    this.$relay_targets.addClass(this.config.target_class);
    this.relay = c.proxy(this.__relay, this);
    this.events = {};
    c.each(this.config.events.split(","), c.proxy(function (h, j) {
      this.add_event(j)
    }, this));
    this.$el.data("eventRelayObject", this);
    d.register(this);
    return this
  };
  d.prototype = {
    __relay: function (f) {
      if (this.__is_relay_element(f)) {
        f.stopPropagation();
        this.$relay_targets.not(f.target).trigger(f)
      }
    }, __is_relay_element: function (f) {
      return this.$el.is(f.currentTarget)
    }, add_event: function (f) {
      this.events[f] = true;
      this.$el.on(f, this.relay)
    }, remove_event: function (f) {
      this.events[f] = false;
      this.$el.off(f, this.relay)
    }, destroy: function (f) {
      c.each(this.events, c.proxy(function (g) {
        this.remove_event(g)
      }, this));
      if (!f) {
        d.unregister(this)
      }
    }
  };
  d.defaults = {
    events: "click",
    child_selector: false,
    global_selector: false,
    relay_class: "click_relay",
    target_class: "click_relay_target"
  };
  d.instances = [];
  d.register = function (f) {
    this.instances.push(f)
  };
  d.unregister = function (f) {
    this.instances.splice(this.instances.indexOf(f), 1)
  };
  d.destroy_all = function () {
    for (var f = 0; f < this.instances.length; f++) {
      this.instances[f].destroy(true)
    }
    this.instances = []
  };
  c.fn.eventrelay = function (f) {
    return this.each(function () {
      new d(this, f)
    })
  };
  a.EventRelay = d
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/post_draggable_tags.js */
(function (c, d, b, a) {
  a.DraggableTags = d.View.extend({
    el: "#posts",
    events: {
      "mouseover .post_footer_links .tags": "mouseover",
      "mousedown .post_footer_links .tags.draggable": "mousedown",
      mousemove: "mousemove"
    },
    initialize: function () {
      c("body").on("mouseup", b.bind(this.mouseup, this))
    },
    mouseover: function (i) {
      var j = this.$(i.currentTarget);
      var h = j.parents(".post_footer_links");
      var g = h.width();
      var f = h.find(".source_url").width();
      this.max_width = g;
      if (f) {
        this.max_width = g - f + 8
      }
      if (j.width() > this.max_width) {
        j.addClass("draggable")
      }
      i.preventDefault();
      i.stopPropagation()
    },
    mousedown: function (f) {
      this.$dragging = this.$(f.currentTarget).addClass("dragging");
      this.mouse_down_left = f.offsetX || f.clientX - this.$(f.currentTarget).offset().left;
      f.preventDefault();
      f.stopPropagation()
    },
    mousemove: function (f) {
      if (this.$dragging) {
        this.$dragging.offset({left: f.pageX - this.mouse_down_left});
        f.preventDefault();
        f.stopPropagation()
      }
    },
    mouseup: function (h) {
      if (this.$dragging == null) {
        return
      }
      this.$dragging.removeClass("dragging");
      var g = parseInt(this.$dragging.css("left"), 10);
      var f = this.$dragging.width();
      if (g > 0 || g < this.max_width - f) {
        this.$dragging.animate({left: "0"})
      }
      this.$dragging = null;
      h.preventDefault();
      h.stopPropagation()
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/post_inline_image_toggle.js */
(function (c, d, b, a) {
  a.PostInlineImageToggle = d.View.extend({
    events: {
      "click .post_content img": "toggle",
      "click .post_content .external-image-wrapper": "show_all_external_images"
    }, defaults: {namespace: "external-inline-images"}, initialize: function (e) {
      this.options = b.defaults(e || {}, this.defaults)
    }, show_all_external_images: function (h) {
      var f = this.$(h.currentTarget).parents(".post_content");
      var g = f.find(".external-image-wrapper");
      b.forEach(g, this._show_external_image, this);
      this._logIt("post:show")
    }, _show_external_image: function (j) {
      var i = this.$(j);
      var e = i.data("src");
      var f = i.data("loading-text");
      var h = c("<img>");
      var g = c("<p>");
      g.append(h);
      i.html(f);
      h.load(function () {
        i.replaceWith(g)
      });
      h.attr("src", e)
    }, _logIt: function (f, e) {
      var e = e || {};
      Tumblr.Events.trigger(this.options.namespace + ":" + f, {loggingData: e})
    }, toggle: function (k) {
      if (Tumblr.Flags.bool("reblog_ui_refresh")) {
        return
      }
      var h = this.$(k.currentTarget).parents(".post_content");
      var g = h.find(".toggle_inline_image");
      g.toggleClass("inline_image");
      var i = h.find(".inline_external_image");
      b.each(i, b.bind(this.toggle_external, this));
      var j = h.find(".image_thumbnail");
      if (j.length) {
        this.toggle_thumbnail(j)
      }
      var f = h.find(".photo_info");
      if (f.length) {
        f.toggleClass("hidden")
      }
    }, toggle_thumbnail: function (e) {
      if (e.hasClass("enlarged")) {
        e.removeClass("enlarged");
        e.attr("width", e.data("thumbnail-width"));
        e.attr("height", e.data("thumbnail-height"))
      } else {
        e.addClass("enlarged");
        e.attr("width", e.data("width"));
        e.attr("height", e.data("height"))
      }
    }, toggle_external: function (g) {
      var h = this.$(g);
      var e = h.attr("external_src");
      if (h.hasClass("enlarged")) {
        h.attr("src", h.attr("original_src"));
        h.removeClass("enlarged loaded")
      } else {
        h.attr("original_src", h.attr("src"));
        h.addClass("enlarged");
        if (h.attr("loader")) {
          h.attr("src", h.attr("loader"))
        }
        var f = new Image();
        f.onload = function () {
          h.attr("src", e);
          h.addClass("loaded")
        };
        f.src = e
      }
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/post_video_embed_toggle.js */
(function (c, d, b, a) {
  a.PostVideoEmbedToggle = d.View.extend({
    events: {"click .video_preview": "show_video"}, show_video: function (l) {
      var n = c(l.currentTarget);
      var m = n.closest(".post");
      var f = m.find(".post_media");
      var g = f.find(".video_embed");
      var j = f.find(".video_preview");
      var h = f.find(".video");
      var i = m.find(".video_preview").data("permalink");
      var k = f.find(".video_embed_code").val();
      if (n.data("render-context") === "blank") {
        window.open(i, "_blank");
        return false
      }
      if (j.is(":visible")) {
        g.html(k);
        j.hide();
        h.show()
      }
      this.track_view(true);
      return false
    }, track_view: function (e) {
      Tumblr.Events.trigger("Capture:push", "embed_interaction", "click", e ? "static" : "normal");
      if (!b.isUndefined(window._gaq)) {
        window._gaq.push(["_trackEvent", "dashboard_video", "click", e ? "static" : "normal"])
      }
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/post_answer.js */
(function (d, e, b, a) {
  var c = window.l10n_str || {};
  a.AnswerPost = e.View.extend({
    el: "#posts",
    events: {"keyup .answer_form .answer_input": "keyup", "submit .answer_form": "submit"},
    keyup: function (f) {
      this.answer_input = d(f.currentTarget);
      this.answer_form = this.answer_input.closest(".answer_form");
      this.answer_length_label = this.answer_form.find(".answer_length");
      this.answer_input_value = this.answer_input.val();
      if (this.answer_input_value.length) {
        this.answer_length_label.html(141 - this.answer_input_value.length)
      } else {
        this.answer_length_label.html()
      }
    },
    submit: function (g) {
      g.preventDefault();
      g.stopPropagation();
      var f = d(g.currentTarget).attr("data-post-id");
      if (f) {
        this.answer(f)
      }
    },
    answer: function (f) {
      d("#answer_form_" + f + " [name=redirect_to]").remove();
      var h = "#answer_container_" + f;
      var g = d(h)[0];
      var m = g.children[0].className;
      var l = d("#answer_text_" + f)[0];
      var k = g.querySelector(".answer_avatar").outerHTML;
      var j = d("#answer_form_" + f).serialize();
      if (!l.value) {
        return
      }
      window.increment_note_count(f);
      d(g).addClass("updating");
      l.disabled = true;
      var i = d.ajax({url: "/answer", data: j, type: "post"});
      i.fail(function () {
        Tumblr.Dialog.alert(c.ajax_error)
      });
      i.done(function () {
        setTimeout(function () {
          g.innerHTML = '<div class="' + m + '">' + k + ' <span class="answer_body">' + l.value.replace("<", "&lt;") + "</span></div>";
          d(g).addClass("updated")
        }, 500)
      })
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/post_remove_tumblelog_posts.js */
(function (c, d, b, a) {
  a.remove_tumblelog_posts = function (f) {
    var e = c(".post_tumblelog_" + f);
    e.fadeOut(500, function () {
      e.remove()
    })
  }
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/post_exif_flip.js */
(function (c, d, b, a) {
  a.ExifFlipcards = d.View.extend({
    el: "#posts", events: {"click .photo_exif_flipper": "flip"}, flip: function (g) {
      g.preventDefault();
      g.stopPropagation();
      var f = c(g.currentTarget).parents(".flipcard");
      f.addClass("initialized");
      b.defer(function () {
        f.toggleClass("reveal_back")
      })
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/post_private_share.js */
(function (c, d, b, a) {
  a.SharePrivatePost = d.View.extend({
    el: "#posts", events: {"click .share_private": "toggle"}, toggle: function (h) {
      h.preventDefault();
      var f = c(h.currentTarget).parents("li").attr("data-post-id");
      var g = c("#share_" + f);
      g.toggle()
    }
  })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/postmessage_listener.js */
(function (c, d, b, a) {
  a.LoggingPostMessage = d.View.extend({
    initialize: function () {
      this._listen()
    }, handler_embed_focus: function (e) {
      if (!b.isObject(e)) {
        return
      }
      if (!e.service_name || !e.post_id) {
        return
      }
      Tumblr.Events.trigger("post:embed:focus", {
        embedData: e,
        loggingData: {postData: this.getPostData(e.post_id), service: e.service_name}
      })
    }, getPostData: function (e) {
      return this.postData || (this.postData = c("#post_" + e).data("json"))
    }, _listen: function () {
      var e = this._listen_handler;
      c(window).on("message.PmEvent", b.bind(e, this))
    }, _listen_handler: function (h) {
      var j = h.originalEvent;
      var k = false;
      if (b.isString(j.data)) {
        k = j.data
      }
      if (!k || (k.indexOf("PmEvent;") !== 0)) {
        return
      }
      var g = k.split(";");
      if ((g.length < 3) || !b.isFunction(this["handler_" + g[1]])) {
        return false
      }
      var f = k.substr(g[0].length + g[1].length + 2, k.length);
      var i = f;
      if (f.indexOf("{") === 0) {
        try {
          i = JSON.parse(f)
        } catch (j) {
          i = f
        }
      }
      this["handler_" + g[1]](i)
    }
  })
}(jQuery, Backbone, _, Tumblr));
/*! scripts/application/logging/ads/models/post.js */
Tumblr.Logging || (Tumblr.Logging = {});
(function (d, c, e, b) {
  var a = e.Model.extend({idAttribute: "serve-id", defaults: {pt_sent: {}}});
  b.PostModel = a
})(jQuery, _, Backbone, Tumblr.Logging);
/*! scripts/application/logging/ads/collections/posts.js */
Tumblr.Logging || (Tumblr.Logging = {});
(function (d, c, e, b) {
  var a = e.Collection.extend({
    model: b.PostModel, initialize: function (g, f) {
      f = f || {}
    }
  });
  b.PostsCollection = a
})(jQuery, _, Backbone, Tumblr.Logging);
/*! scripts/application/logging/ads/views/logging.js */
Tumblr.Logging || (Tumblr.Logging = {});
(function (c, h, i, b) {
  var d = Tumblr.Logging;
  var g = d.PostModel;
  var e = d.PostsCollection;
  var a = function (k, n, l, m) {
    var j = k.get(n);
    var o = i.cloneDeep(j);
    o[l] = m;
    k.set(n, o)
  };
  var f = function (j, l, k) {
    return j.get(l)[k]
  };
  b.Ads = h.View.extend({
    initialize: function () {
      this.dupedEvents = ["video_play", "video_auto_play", "video_stop", "video_auto_stop", "video_scrub_stop", "video_loop"];
      this.postsCollection = new e();
      this.listenTo(Tumblr.Events, "useraction:video:play", i.bind(this.onVideoPlay, this));
      this.listenTo(Tumblr.Events, "post:embed:stateChange", i.bind(this.prepVideoPlay, this));
      this.listenTo(Tumblr.Events, "useraction:audio:play", i.bind(this.onAudioPlay, this));
      this.listenTo(Tumblr.Events, "useraction:search_click:tag_click", i.bind(this.onSearchTagClick, this));
      this.listenTo(Tumblr.Events, "useraction:search_click:permalink", i.bind(this.onSearchPermalinkClick, this));
      this.listenTo(Tumblr.Events, "useraction:search_click:lightbox", i.bind(this.onSearchBlogClick, this));
      this.listenTo(Tumblr.Events, "useraction:search_click:caption", i.bind(this.onSearchCaptionClick, this));
      this.listenTo(Tumblr.Events, "useraction:search_click:media", i.bind(this.onSearchMediaClick, this));
      this.listenTo(Tumblr.Events, "useraction:search_click:share", i.bind(this.onSearchShareClick, this));
      this.listenTo(Tumblr.Events, "useraction:search_click:notes", i.bind(this.onSearchNotesClick, this));
      this.listenTo(Tumblr.Events, "useraction:search_click:remnant", i.bind(this.onRemnantClick, this));
      this.listenTo(Tumblr.Events, "useraction:explore_click:tag_click", i.bind(this.onSearchTagClick, this));
      this.listenTo(Tumblr.Events, "useraction:explore_click:permalink", i.bind(this.onSearchPermalinkClick, this));
      this.listenTo(Tumblr.Events, "useraction:explore_click:lightbox", i.bind(this.onSearchBlogClick, this));
      this.listenTo(Tumblr.Events, "useraction:explore_click:caption", i.bind(this.onSearchCaptionClick, this));
      this.listenTo(Tumblr.Events, "useraction:explore_click:media", i.bind(this.onSearchMediaClick, this));
      this.listenTo(Tumblr.Events, "useraction:explore_click:share", i.bind(this.onSearchShareClick, this));
      this.listenTo(Tumblr.Events, "useraction:explore_click:notes", i.bind(this.onSearchNotesClick, this));
      this.listenTo(Tumblr.Events, "useraction:explore_click:remnant", i.bind(this.onRemnantClick, this));
      this.listenTo(Tumblr.Events, "useraction:dashboard_click:remnant", i.bind(this.onRemnantClick, this));
      this.listenTo(Tumblr.Events, "useraction:dashboard_click:takeover_banner", i.bind(this.onBannerClick, this));
      this.listenTo(Tumblr.Events, "search:blog:click:posts_click", i.bind(this.onSearchBlogCardClick, this));
      this.listenTo(Tumblr.Events, "useraction:dismiss:pinned_post", i.bind(this.onPinnedPostDismissal, this));
      this.listenTo(Tumblr.Events, "useraction:click:peepr", i.bind(this.onRecommendedBlogUnitClick, this));
      this.listenTo(Tumblr.Events, "useraction:dismiss:recommended_tumblelog", i.bind(this.onRecommendedBlogUnitClick, this));
      this.listenTo(Tumblr.Events, "VideoPlayer:play", i.bind(this.onVideoPlayerPlay, this));
      this.listenTo(Tumblr.Events, "VideoPlayer:autoplay", i.bind(this.onVideoPlayerAutoPlay, this));
      this.listenTo(Tumblr.Events, "VideoPlayer:pause", i.bind(this.onVideoPlayerPause, this));
      this.listenTo(Tumblr.Events, "VideoPlayer:muted", i.bind(this.onVideoPlayerVolume, this));
      this.listenTo(Tumblr.Events, "VideoPlayer:fullscreen", i.bind(this.onVideoPlayerFullscreen, this));
      this.listenTo(Tumblr.Events, "VideoPlayer:looped", i.bind(this.onVideoPlayerLooped, this));
      this.listenTo(Tumblr.Events, "VideoPlayer:seek", i.bind(this.onVideoPlayerSeek, this));
      this.listenTo(Tumblr.Events, "VideoPlayer:restart", i.bind(this.onVideoPlayerRestart, this));
      this.listenTo(Tumblr.Events, "VideoPlayer:resolutionchange", i.bind(this.onVideoPlayerResolutionChange, this));
      this.listenTo(Tumblr.Events, "post:docked", i.bind(this.onVideoPlayerDocked, this));
      this.listenTo(Tumblr.Events, "post:undocked", i.bind(this.onVideoPlayerUndocked, this));
      this.listenTo(Tumblr.Events, "useraction:click:install_click", i.bind(this.onInstallClick, this));
      this.listenTo(Tumblr.Events, "VendorButton:buttonClick", i.bind(this.onVendorButtonClicked, this));
      this.listenTo(Tumblr.Events, "linkpost:click", i.bind(this.onLinkPostClicked, this));
      this.listenTo(Tumblr.Events, "useraction:click:read_more", i.bind(this.onPostReadMore, this));
      this.listenTo(Tumblr.Events, "ReblogTrail:click:reblogtrail_tumblelog_name", i.bind(this.onReblogTrailClickEvent, this));
      this.listenTo(Tumblr.Events, "ReblogTrail:click:reblogtrail_tumblelog_avatar", i.bind(this.onReblogTrailClickEvent, this));
      this.listenTo(Tumblr.Events, "ReblogTrail:click:reblogtrail_external_image", i.bind(this.onReblogTrailClickEvent, this));
      this.listenTo(Tumblr.Events, "ReblogTrail:click:reblogtrail_truncated_link", i.bind(this.onReblogTrailClickEvent, this))
    }, onReblogTrailClickEvent: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onVideoPlay: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onAudioPlay: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onSearchTagClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.userAction = "tags";
      this.doLog()
    }, onSearchBlogClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.userAction = "posts";
      this.doLog()
    }, onSearchPermalinkClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onSearchCaptionClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onSearchMediaClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.userAction = "photo";
      this.doLog()
    }, onSearchShareClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onSearchNotesClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onSearchBlogCardClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onRemnantClick: function (k) {
      var j = i.cloneDeep(k.loggingData);
      var l = j.userAction || "unknown";
      var m = j.pt || null;
      this.userAction = l;
      this.hasServeId = !!(m);
      this.model = (m) ? this.postsCollection.get(m) : null;
      if (!this.model) {
        this.model = new g({pt: m, "serve-id": m});
        this.postsCollection.push(this.model)
      }
      this.model.set("log-index", 1);
      this.doLog()
    }, onBannerClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.model.set("log-index", 1);
      this.doLog()
    }, onPinnedPostDismissal: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onRecommendedBlogUnitClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onVendorButtonClicked: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onLinkPostClicked: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onVideoPlayerPlay: function (j) {
      this.onVideoEvent("video_play", j)
    }, onVideoPlayerAutoPlay: function (j) {
      this.onVideoEvent("video_auto_play", j)
    }, onVideoPlayerPause: function (j) {
      this.onVideoEvent("video_stop", j)
    }, onVideoPlayerVolume: function (j) {
      this.onVideoEvent((j.loggingData.muted ? "video_mute" : "video_unmute"), j)
    }, onVideoPlayerFullscreen: function (j) {
      this.onVideoEvent((j.loggingData.fullscreen ? "video_fullscreen" : "video_fullscreen_dismiss"), j)
    }, onVideoPlayerLooped: function (j) {
      this.onVideoEvent("video_loop", j)
    }, onVideoPlayerSeek: function (j) {
      this.onVideoEvent("video_scrub_stop", j)
    }, onVideoPlayerDocked: function (j) {
      this.onVideoEvent((j.loggingData.autodocked ? "video_auto_dock" : "video_dock"), j)
    }, onVideoPlayerUndocked: function (j) {
      this.onVideoEvent("video_dock_dismiss", j)
    }, onVideoPlayerRestart: function (j) {
      this.onVideoEvent("video_restart", j)
    }, onVideoPlayerResolutionChange: function (j) {
      this.onVideoEvent("video_resolution_change", j)
    }, onVideoEvent: function (j, l) {
      var k = i.extend({userAction: j}, l.loggingData);
      this.preLogSetup(k);
      this.model.set({video_duration: k.duration, video_progress: k.position});
      if (j === "video_scrub_stop" || j === "video_restart") {
        this.model.set({video_scrub_start: k.start, video_scrub_end: k.end})
      }
      if (j === "video_resolution_change") {
        this.model.set({video_resolution: k.resolution})
      }
      this.doLog()
    }, onInstallClick: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, onPostReadMore: function (j) {
      this.preLogSetup(j.loggingData);
      this.doLog()
    }, prepVideoPlay: function (k) {
      var j = k.loggingData;
      if (j.service === "tumblr") {
        return
      }
      if (j.state === "focus" || j.state === "playing") {
        if (!j.postID) {
          return
        }
        var k = {loggingData: {postData: this.get$EmbedPost(j.embedID).data("json") || {}, userAction: "video"}};
        this.onVideoPlay(k)
      }
    }, get$EmbedPost: function (j) {
      return c("#" + j).closest(".post")
    }, preLogSetup: function (k) {
      var l = k.userAction || "unknown";
      var j = k.postData || k.modelData || k.post || {};
      this.userAction = l;
      this.hasServeId = !!(j["serve-id"]);
      if (this.hasServeId) {
        this.model = this.getPostModel(j)
      } else {
        this.model = this.getPostModel({})
      }
    }, getPostModel: function (j) {
      var l = j["serve-id"];
      var k = (l) ? this.postsCollection.get(l) : null;
      if (!k) {
        k = new g(j);
        this.postsCollection.push(k)
      }
      if (!k.get("pt") && j.pt) {
        k.set("pt", j.pt)
      }
      return k
    }, shouldLogPost: function () {
      return ((!!this.model.get("pt")) && this._should_log_to_yx() && (!f(this.model, "pt_sent", this.userAction)))
    }, prepPayload: function () {
      var j = {action: this.userAction, pt: this.model.get("pt")};
      if (this.userAction.lastIndexOf("video_", 0) === 0) {
        i.extend(j, {video_details: this.prepVideoPayload(this.userAction)})
      }
      return j
    }, prepVideoPayload: function (k) {
      var j = {};
      i.extend(j, {
        duration: this.model.get("video_duration"),
        progress: this.model.get("video_progress"),
        timestamp: new Date().getTime()
      });
      if (k === "video_scrub_stop" || k === "video_restart") {
        i.extend(j, {start: this.model.get("video_scrub_start"), end: this.model.get("video_scrub_end")})
      }
      if (k === "video_resolution_change") {
        i.extend(j, {resolution: this.model.get("video_resolution")})
      }
      return j
    }, doLog: function () {
      if (!this.model || !this.model.get("serve-id")) {
        return
      }
      try {
        var k = this.prepPayload();
        if (this.model.get("log-index") > 1 && !!(this.model.get("pt"))) {
          Tumblr.Events.trigger("LSLog:" + k.action, {
            loggingData: {
              pt: this.model.get("pt"),
              is_ad: this._should_log_to_yx()
            }
          })
        }
        if (!this.shouldLogPost()) {
          return
        }
        this.$xhr = c.ajax({
          url: "/svc/log/yx",
          type: "POST",
          data: k,
          with_form_key: true,
          async: false
        }).success(i.bind(function () {
          if (i.contains(this.dupedEvents, this.userAction)) {
            return
          }
          a(this.model, "pt_sent", this.userAction, true)
        }, this))
      } catch (j) {
        this.error.yxFailure(j)
      }
    }, _should_log_to_yx: function () {
      return (this.model.get("log-index") == 1 || this.model.get("log-index") == 3)
    }, doLogExternal: function (k, l) {
      if (k) {
        var j = this.get$postForExternalLog(k);
        if (j.length) {
          var m = {postData: j.data("json") || {}, userAction: l || "unknown"};
          this.preLogSetup(m);
          this.doLog()
        } else {
          this.error.noExternalPostFound(k)
        }
      } else {
        this.error.noExternalId(k, l)
      }
    }, get$postForExternalLog: function (j) {
      return c('[data-serve-id="' + j + '"]')
    }, error: {
      noExternalPostFound: function (j) {
        Tumblr.Utils.exceptions(new Error("Tumblr.Logging.Ads - could not find post with externalServeId: " + (j || 0)))
      }, noExternalId: function (k, j) {
        Tumblr.Utils.exceptions(new Error('Tumblr.Logging.Ads - doLogExternal failed with action "' + j + '" and serveId "' + k + '."'))
      }, yxFailure: function (j) {
        Tumblr.Utils.exceptions(new Error('Tumblr.Logging.Ads - yx xhr failure: "' + j))
      }
    }
  })
}(jQuery, Backbone, _, Tumblr.Logging));
/*! scripts/application/logging/ads/index.js */
(function (b, a) {
  b(function (c) {
    a.Logging.ads = new a.Logging.Ads()
  })
})(jQuery, Tumblr);
/*! scripts/application/legacy_post_like.js */
(function (d, e, g, c) {
  var a = window.l10n_str || {};

  function b(l, m, o) {
    var j = (o == null) ? d("#like_form_" + l) : d("#" + o), k;
    if (!j.length) {
      return
    }
    k = j.attr("action");
    if (typeof m === "undefined") {
      f(l)
    } else {
      m()
    }
    var n = d.ajax({url: k, data: j.serialize(), type: "post"});
    n.fail(function () {
      Tumblr.Dialog.alert(a.ajax_error)
    })
  }

  function f(m) {
    var n = d("#like_button_" + m);
    var k = d("#like_form_" + m);
    var j = n.hasClass("already_like");
    var l = k.attr("action");
    d("#post_" + m).addClass("force_redraw");
    d("#post_" + m)[0].offsetHeight;
    d("#post_" + m).removeClass("force_redraw");
    var o = n.attr("data-root-post-id") || false;
    if (j) {
      n.removeClass("already_like");
      k.attr("action", l.replace("/unlike", "/like"));
      i(m);
      if (o) {
        d(".like_root_" + o).removeClass("already_like")
      }
    } else {
      n.addClass("already_like");
      k.attr("action", l.replace("/like", "/unlike"));
      h(m);
      if (o) {
        d(".like_root_" + o).addClass("already_like")
      }
    }
  }

  function h(j) {
    if (!(d("#notes_outer_container_" + j)[0] && d("#show_notes_link_" + j)[0] && d("#note_link_more_" + j)[0] && d("#note_link_less_" + j)[0] && d("#note_link_current_" + j)[0])) {
      return false
    }
    d("#show_notes_link_" + j).show();
    if (d("#note_link_less_" + j).is(":visible")) {
      d("#note_link_less_" + j).hide();
      d("#note_link_current_" + j).show();
      d("#note_link_more_" + j).hide()
    } else {
      d("#note_link_less_" + j).hide();
      d("#note_link_current_" + j).hide();
      d("#note_link_more_" + j).show()
    }
  }

  function i(j) {
    if (!(d("#show_notes_link_" + j)[0] && d("#note_link_more_" + j)[0] && d("#note_link_less_" + j)[0] && d("#note_link_current_" + j)[0])) {
      return false
    }
    d("#show_notes_link_" + j).show();
    if (d("#note_link_more_" + j).is(":visible")) {
      d("#note_link_less_" + j).hide();
      d("#note_link_current_" + j).show();
      d("#note_link_more_" + j).hide()
    } else {
      d("#note_link_less_" + j).hide();
      d("#note_link_current_" + j).hide();
      d("#note_link_less_" + j).show()
    }
  }

  c.like_post = b;
  window.increment_note_count = h;
  window.decrement_note_count = i
})(jQuery, Backbone, _, Tumblr);
/*! scripts/application/yvp.js */
(function (b, a) {
  a.YVP = {
    init: function () {
      var c = b("#new_post_label_video[data-js-yvp-video]");
      if (c.length) {
        c.on("click", function (d) {
          d.stopPropagation();
          d.preventDefault();
          window.location = c.attr("href")
        })
      }
    }
  };
  a.YVP.Auth = {
    init: function () {
      b("#tripleplay_tos").click(function () {
        var c = b("#allow");
        if (c.attr("disabled")) {
          c.removeAttr("disabled")
        } else {
          c.attr("disabled", "disabled")
        }
      })
    }
  }
})(jQuery, Tumblr);
/*! scripts/jquery.application.js */
(function (b, a) {
  b(document).ready(function (c) {
    a.LinkButton.init();
    a.PhotoReply.init();
    a.Panos.init();
    a.ShareButtons.init();
    a.PlaceHolders.init();
    a.YVP.init();
    new a.Tabs();
    new a.PostVideoEmbedToggle({el: c("#posts")});
    new a.PostInlineImageToggle({el: c("#posts")});
    new a.LanguageMenu({el: "#language_switcher"});
    new a.LegalPopover({el: "#popover_legal"});
    new a.ReportTumblelogView();
    new a.FullHeightNoPostsFound();
    new a.Notifications();
    new a.DraggableTags();
    new a.ExifFlipcards();
    new a.AnswerPost();
    new a.SharePrivatePost();
    new a.Notes();
    new a.ActivitySparkline();
    new a.devicePixelRatio();
    new a.documentWidth();
    new a.LoggingPostMessage();
    new a.TumblelogPopover();
    new a.Peepr();
    new a.Popover({el: "#analytics_popover", glassless: true})
  })
})(jQuery, Tumblr);
/*! scripts/tumblr/auto_paginator.js */
(function (h, g, n, o) {
  var l = {
    DEFAULT_RETRIES: 3, start: function () {
      m = this.DEFAULT_RETRIES;
      Tumblr.Events.on("DOMEventor:flatscroll", j)
    }, stop: function () {
      window.loading_next_page = false;
      Tumblr.Events.off("DOMEventor:flatscroll", j)
    }, restart: function () {
      this.start();
      d()
    }, flushQueue: function () {
      e()
    }
  };
  o.extend(l, n.Events);
  var m = l.DEFAULT_RETRIES;
  var b = (new Tumblr.Prima.AdsPaginationHelper()).getNextAdPos() || 0;
  var f = h("#next_page_link").data("stream-cursor") || "";
  window.loading_next_page = false;
  function j(q) {
    if (!window.next_page) {
      if (h("#auto_pagination_loader").is(":visible")) {
        h("#auto_pagination_loader").hide()
      }
      l.stop();
      return
    }
    if (window.loading_next_page) {
      return
    }
    if ((q.documentHeight - q.windowScrollY) < q.windowHeight * 3) {
      d()
    }
  }

  function d() {
    window.loading_next_page = true;
    l.trigger("before", window.next_page);
    h("#auto_pagination_loader_loading").show();
    h("#auto_pagination_loader_failure").hide();
    i()
  }

  function a() {
    m--;
    var q = h.ajax({url: window.next_page, type: "get"});
    q.done(function (s) {
      c(s);
      var r = q.getResponseHeader("X-next-page");
      if (r) {
        window.next_page = r
      } else {
        window.next_page = s.match('id="next_page_link" href="') ? s.split('id="next_page_link" href="')[1].split('"')[0] : false;
        if (!window.next_page) {
          l.stop()
        }
      }
      h("#auto_pagination_loader_loading").hide()
    });
    q.fail(function () {
      if (m) {
        a()
      } else {
        k()
      }
    })
  }

  function c(s, t) {
    if (s.indexOf('<script type="text/javascript" language="javascript" src="//assets.tumblr.com/languages/errors.js') !== -1) {
      l.stop();
      return false
    }
    var r;
    if (s.indexOf("<!-- START POSTS -->") === -1) {
      r = s
    } else {
      r = s.split("<!-- START POSTS -->")[1].split("<!-- END POSTS -->")[0]
    }
    var q = h(h.trim(r)).not(":empty");
    h("#posts").append(q);
    Tumblr.Events.trigger("DOMEventor:updateRect");
    window.loading_next_page = false;
    f = t;
    setTimeout(function () {
      if (typeof window.after_auto_paginate === "function") {
        window.after_auto_paginate()
      }
      e();
      l.trigger("after", window.next_page)
    }, 0)
  }

  function k() {
    l.stop();
    h("#auto_pagination_loader_loading").hide();
    h("#auto_pagination_loader_failure").show()
  }

  var p = [];

  function e() {
    for (var q = p.length - 1; q >= 0; q--) {
      if (typeof(p[q]) === "function") {
        p[q]()
      }
    }
  }

  function i() {
    m--;
    var q = window.next_page;
    if (!q.match(/\/dashboard\/(page\/)?\d+/)) {
      return a()
    }
    q = q.replace("/dashboard", "/svc/dashboard");
    var r = h.ajax({url: q, type: "get", data: {nextAdPos: b, stream_cursor: f}});
    r.done(function (s) {
      window.next_page = s.meta.tumblr_old_next_page;
      c(s.response.DashboardPosts.body, s.response.DashboardPosts.nextCursor);
      if (s.response.RecommendedBlog) {
        Tumblr.Events.trigger("component:RecommendedBlog", s.response.RecommendedBlog)
      }
      if (s.response.RapidRecommendations) {
        Tumblr.Events.trigger("component:RapidRecommendations", s.response.RapidRecommendations)
      }
      if (s.response.RemnantAd) {
        Tumblr.Events.trigger("component:RemnantAd", s.response.RemnantAd)
      }
      if (s.response.YamPlusAd) {
        Tumblr.Events.trigger("component:YamPlusAd", s.response.YamPlusAd)
      }
      h("#auto_pagination_loader_loading").hide();
      b = s.response.nextAdPos;
      m = l.DEFAULT_RETRIES
    });
    r.fail(function () {
      if (m) {
        i()
      } else {
        k()
      }
    })
  }

  g.AutoPaginator = l;
  window.AfterAutoPaginationQueue = p
})(jQuery, Tumblr, Backbone, _);
/*! scripts/plexi.js */
(function (c, a) {
  var b = function (d) {
    if (!(this instanceof b)) {
      return new b(d)
    }
    this.token = d.token || "";
    if (d.instance) {
      this.instance = d.instance;
      this.$instance = c(d.instance)
    }
    this.hide_timeout = null;
    this.transition_class = null;
    this.$hide_timeout = null;
    b.register(this)
  };
  b.prototype = {
    create: function (e, f) {
      f = f || {};
      var d = c(e);
      this.$instance = c("<div/>", {"data-token": this.token, "class": "plexi"});
      this.instance = this.$instance.get(0);
      if (f.cssClass) {
        this.$instance.addClass(f.cssClass)
      }
      d.append(this.$instance)
    }, show: function (d) {
      d = d || {};
      this.transition_class = d.transition_class || false;
      if (!this.$instance.hasClass("instant")) {
        this.$instance.addClass("active")
      }
      setTimeout(c.proxy(function () {
        clearTimeout(this.$hide_timeout);
        if (this.transition_class) {
          this.$instance.addClass(this.transition_class)
        }
        this.$instance.addClass("show");
        if (!this.$instance.hasClass("instant")) {
          this.$instance.addClass("active")
        }
      }, this), 1)
    }, hide: function () {
      this.$instance.removeClass("show");
      this.$hide_timeout = setTimeout(c.proxy(function () {
        this.$instance.removeClass("show instant active fast");
        if (this.transition_class) {
          this.$instance.removeClass(this.transition_class)
        }
      }, this), 50)
    }, destroy: function () {
      b.instances.splice(_.indexOf(this), 1);
      return this
    }
  };
  b.instances = [];
  b.register = function (d) {
    this.instances.push(d)
  };
  b.findByToken = function (f) {
    var d;
    for (var e = 0; e < this.instances.length; e++) {
      if (this.instances[e].token == f) {
        d = this.instances[e]
      }
    }
    if (!d) {
      var h = c('.plexi[data-token="' + f + '"]');
      if (h.length) {
        var g = new Tumblr.Plexi({instance: h, token: f});
        this.instances.push(g);
        return g
      }
    }
    return d
  };
  a.Plexi = b
})(jQuery, Tumblr);
/*! scripts/sortable.js */
(function (d, c, e, b) {
  var a = e.View.extend({
    initialize: function (f) {
      this.options = f || {};
      f.items || (f.items = ".item");
      this.callback = f.callback || function () {
        };
      this.before = f.before || function () {
        };
      this.placeholder = null;
      this.on_dragenter = c.throttle(this.on_dragenter, 500);
      this.reloadItems()
    }, itemEvents: function (f) {
      f || (f = this.options.items);
      return c.reduce(["dragstart", "dragenter", "dragover", "drop", "dragend"], function (g, h) {
        g[h + " " + f] = "on_" + h;
        return g
      }, {}, this)
    }, on_dragstart: function (g) {
      g.originalEvent.dataTransfer.effectAllowed = "move";
      try {
        g.originalEvent.dataTransfer.setData("text/html", "foo")
      } catch (f) {
      }
      this.dragged = g.currentTarget;
      this.placeholder = d(this.dragged).clone().addClass("sortable-placeholder");
      if (!this.options.no_opacity) {
        this.placeholder.css("opacity", "0").find("*").css("opacity", "0")
      }
      this.placeholder = this.placeholder.get(0);
      this.$(this.dragged).addClass("sortable-dragging");
      this.before.call(this);
      this.trigger("dragstart", this);
      if (this.options.scrollable) {
        this.$el.on("dragover." + this.cid, c.throttle(function (l) {
          var j = 0.2;
          var i = window.innerHeight;
          var h = l.originalEvent.clientY / i;
          var k = this.getBoundingClientRect();
          if (h < j && k.top < 0) {
            window.scrollBy(0, -((j - h) * 200))
          } else {
            if (h > (1 - j)) {
              window.scrollBy(0, ((j + h - 1) * 200))
            }
          }
          l.preventDefault()
        }, 50));
        this.$(this.dragged).one("dragend", c.bind(function () {
          this.$el.off(["dragenter." + this.cid, "dragover." + this.cid].join(" "))
        }, this))
      }
    }, on_dragenter: function (i) {
      if (!this.dragged) {
        return
      }
      i.preventDefault();
      var h = i.currentTarget;
      if (h == this.placeholder) {
        return
      }
      this.$(this.dragged).hide();
      var f = this.$(h).index(this.options.items);
      var g = this.$(this.placeholder).index(this.options.items);
      if (g < f) {
        this.$(h).after(this.placeholder)
      } else {
        this.$(h).before(this.placeholder)
      }
      this.last_droppable = h
    }, on_dragover: function (f) {
      if (!this.dragged) {
        return
      }
      f.preventDefault()
    }, on_drop: function (f) {
      if (!this.dragged) {
        return
      }
      f.stopPropagation();
      this.$(this.dragged).insertAfter(this.placeholder);
      return false
    }, on_dragend: function (f) {
      this.$(this.dragged).removeClass("sortable-dragging").show();
      this.$(this.placeholder).detach();
      f.stopPropagation();
      this.callback(this);
      this.trigger("dragend", this);
      this.dragged = null;
      this.last_droppable = null
    }, sequence: function () {
      var f = this.$(this.options.items).toArray();
      return c.uniq(c.pluck(f, "id"))
    }, reloadItems: function () {
      this.items = this.$(this.options.items);
      this.items.attr("draggable", true);
      this.items.find("a").attr("draggable", false);
      this.items.find("img").attr("draggable", false);
      this.delegateEvents(this.itemEvents(this.options.items));
      return this
    }, disableItems: function () {
      this.items = this.$(this.options.items);
      this.items.attr("draggable", false);
      this.undelegateEvents();
      return this
    }, teardown: function () {
      this.undelegateEvents();
      if (this.options.scrollable) {
        this.$el.off(["dragenter." + this.cid, "dragover." + this.cid].join(" "))
      }
      this.items.add("a, img", this.items).removeAttr("draggable");
      this.options.items = this.items = null;
      this.options.callback = this.callback = null;
      this.options.before = this.before = null;
      this.on_dragenter = null;
      return this
    },
  });
  b.SortableView = a
})(window.jQuery, window._, window.Backbone, window.Tumblr);
/*! scripts/toaster.js */
(function (c, b) {
  var a = Backbone.View.extend({
    el: "#toaster",
    debug_mode: false,
    defaults: {
      max_toast: 5,
      toast_padding: 623,
      away_speed: 350,
      close_buttons: false,
      queue_heartbeat: 1000,
      pause_on_hover: true,
      only_when_footer_hidden: true,
      token: null,
      disabled: false
    },
    default_toast: {
      id: null,
      type: "text",
      on_create: false,
      on_destory: false,
      animation: true,
      message: " ",
      img1: {url: null, badge: " ", is_link: false, href: "#"},
      img2: {url: null, badge: " ", is_link: false, href: "#"},
      icon: {type: "regular", href: "#"},
      notification: {object: null, title: "", body: "", icon: false},
      is_link: false,
      href: "#",
      position_class: "toast_only",
      close: false,
      expires: 7023,
      in_queue: false
    },
    toast_count: 0,
    toasts: {},
    desk_notify_support: false,
    page_visible: true,
    transition_support: true,
    is_ipad: false,
    toast_ids: [],
    queue_ids: [],
    paused: false,
    t_paused: null,
    unpause_expires: 2000,
    t_queue_heartbeat: null,
    toast_padding_mult: 0,
    push_lock: false,
    time_until_lock: 50,
    t_push_lock: null,
    footer_overlaps: false,
    templates: {
      text: '<li id="toast_<%- id %>" class="toast toast_text <%- position_class %>"><span class="toast_border"><span class="toast_outer"><span class="toast_inner"><% if (is_link === true) { %><a class="anchor" href="<%- href %>" target="blank"></a><% } %><span class="txt"><%= message %></span></span></span><% if (close === true) { %><span class="close"></span><% } %></span></li>',
      image_text: '<li id="toast_<%- id %>" class="toast toast_image_text <%- position_class %>"><span class="toast_border"><span class="toast_outer"><span class="toast_inner"><% if (is_link === true) { %><a class="anchor" href="<%- href %>" target="blank"></a><% } %><span class="frame box_left <%- img1.badge %>"><% if (img1.is_link === true) { %><a href="<%- img1.href %>" target="_blank"><% } %><img src="<%- img1.url %>" width="28" height="28" /><% if (img1.is_link === true) { %></a><% } %></span><span class="txt"><%= message %></span></span></span><% if (close === true) { %><span class="close"></span><% } %></span></li>',
      image_text_image: '<li id="toast_<%- id %>" class="toast toast_image_text_image <%- position_class %>"><span class="toast_border"><span class="toast_outer"><span class="toast_inner"><% if (is_link === true) { %><a class="anchor" href="<%- href %>" target="blank"></a><% } %><span class="frame box_left <%- img1.badge %>"><% if (img1.is_link === true) { %><a href="<%- img1.href %>" target="_blank"><% } %><img src="<%- img1.url %>" width="28" height="28" /><% if (img1.is_link === true) { %></a><% } %></span><span class="txt"><%= message %></span><span class="frame box_right <%- img2.badge %>"><% if (img2.is_link === true) { %><a href="<%- img2.href %>" target="_blank"><% } %><img src="<%- img2.url %>" width="28" height="28" /><% if (img2.is_link === true) { %></a><% } %></span></span></span><% if (close === true) { %><span class="close"></span><% } %></span></li>',
      image_text_icon: '<li id="toast_<%- id %>" class="toast toast_image_text_icon <%- position_class %>"><span class="toast_border"><span class="toast_outer"><span class="toast_inner"><% if (is_link === true) { %><a class="anchor" href="<%- href %>" target="blank"></a><% } %><span class="frame box_left <%- img1.badge %>"><% if (img1.is_link === true) { %><a href="<%- img1.href %>" target="_blank"><% } %><img src="<%- img1.url %>" width="28" height="28" /><% if (img1.is_link === true) { %></a><% } %></span><span class="txt"><%= message %></span><a class="frame box_right icon <%= icon.type %>" href="<%- icon.href %>"><span class="inside icon <%= icon.type %>"></span></a></span></span><% if (close === true) { %><span class="close"></span><% } %></span></li>'
    },
    gutterManager: Tumblr.Prima && Tumblr.Prima.gutterMediaManager ? Tumblr.Prima.gutterMediaManager : null,
    events: {mouseover: "hover_in", mouseout: "hover_out"},
    initialize: function (d) {
      this.options = d || {};
      this.options = _.extend(this.defaults, this.options);
      this.debug_order = 0;
      if (this.options.only_when_footer_hidden) {
        this._sidebar_hide_helpers()
      }
      if (window.webkitNotifications || window.Notification) {
        this.desk_notify_support = true
      }
      var e = document.createElement("div").style;
      this.transition_support = "transition" in e || "WebkitTransition" in e || "MozTransition" in e || "msTransition" in e || "OTransition" in e;
      this.is_ipad = (navigator.userAgent.match(/iPad/i) === null) ? false : true;
      this._queue_heartbeat();
      this._add_visibility_helper();
      this.listenTo(Tumblr.Events, "toaster:suspend", this.disable);
      this.listenTo(Tumblr.Events, "toaster:resume", this.enable);
      this.listenTo(Tumblr.Events, "toaster:toast", this.add_toast);
      return this
    },
    debug: function (d) {
      this.debug_mode = d;
      console.log("Debug mode is now " + (d ? "on" : "off") + ".")
    },
    tumblrbot: function (e) {
      var d = {
        type: "image_text",
        message: "<strong>" + e + "</strong>",
        is_link: false,
        href: "#",
        img1: {url: "/images/toast_tumblrbot.png", is_link: true, href: "http://tumblrbot.tumblr.com/"}
      };
      this.add_toast(d)
    },
    disable: function () {
      this.options.disabled = true
    },
    enable: function () {
      this.options.disabled = false;
      this._queue_heartbeat()
    },
    can_display_toasts: function () {
      var d = c(window);
      if (this.options.disabled || d.innerHeight() < 400 || d.innerWidth() < 960) {
        return false
      }
      return this.page_visible
    },
    footer_will_overlap: function () {
      if (this.options.only_when_footer_hidden) {
        return this.footer_overlaps
      }
      return false
    },
    is_screen_full: function () {
      return (this.toast_ids.length >= this.options.max_toast)
    },
    is_screen_empty: function () {
      return (this.toast_ids.length === 0)
    },
    is_queue_empty: function () {
      return (this.queue_ids.length === 0)
    },
    _queue_heartbeat: function () {
      if (this.options.disabled) {
        return
      }
      clearTimeout(this.t_queue_heartbeat);
      var d = function () {
        if (this.is_queue_empty() || !this.is_screen_empty()) {
          this._queue_heartbeat()
        } else {
          this.push_lock = true;
          var g = this.queue_ids.length;
          this.toast_padding_mult = 0;
          for (var e = 0; e <= g; e++) {
            if ((e < this.options.max_toast) && (e < g)) {
              var f = this.queue_ids[0];
              this.queue_ids.splice(0, 1);
              this.toast_ids.push(f);
              this._delayed_add_toast_to_dom(f, (this.toast_padding_mult * this.options.toast_padding));
              this.toast_padding_mult++
            } else {
              break
            }
          }
          this._queue_heartbeat()
        }
      };
      this.t_queue_heartbeat = setTimeout(_.bind(d, this), this.options.queue_heartbeat)
    },
    _delayed_add_toast_to_dom: function (f, d) {
      var e = setTimeout(_.bind(function () {
        this._add_toast_to_dom(f)
      }, this), d)
    },
    _add_next_queue_item: function () {
      if (!this.is_queue_empty()) {
        var d = this.queue_ids[0];
        this.queue_ids.splice(0, 1);
        this.toast_ids.push(d);
        this._add_toast_to_dom(d);
        this._queue_heartbeat()
      }
    },
    add_toast: function (d) {
      var e = {};
      jQuery.extend(e, this.default_toast, d);
      this._toast(e)
    },
    _toast: function (e) {
      var f = this.toast_count++;
      var d = (this.push_lock || !this.is_queue_empty() || this.is_screen_full());
      if (d) {
        this.queue_ids.push(f)
      } else {
        if (this.toast_ids.length === 0) {
          this.toast_padding_mult = 0
        }
        this.toast_ids.push(f)
      }
      e = jQuery.extend(e, {id: f});
      var g = this._get_toast_template(e.type);
      $toast = c(g(e));
      this.toasts[f] = {id: f, $el: $toast, options: e, in_queue: d, t: null};
      if (!d) {
        setTimeout(_.bind(function () {
          this._add_toast_to_dom(f)
        }, this), (this.toast_padding_mult * this.options.toast_padding));
        this.toast_padding_mult++;
        clearTimeout(this.t_push_lock);
        this.t_push_lock = setTimeout(_.bind(function () {
          this.push_lock = true;
          this.toast_padding_mult = 0
        }, this), this.time_until_lock)
      }
      return f
    },
    _add_toast_to_dom: function (d) {
      if (this.footer_will_overlap() || !this.can_display_toasts() || typeof this.toasts[d] === "undefined") {
        this._nuke_toast(d);
        return
      }
      this.toasts[d].t = this._set_toast_timeout(d);
      this.$el.append(this.toasts[d].$el);
      if (this.transition_support) {
        setTimeout(_.bind(function () {
          this._update_position_helpers()
        }, this), 200)
      } else {
        this._update_position_helpers()
      }
      if (this.gutterManager) {
        this.gutterManager.putViewInGutter({}, {dimRadar: false})
      }
      c("#toast_" + d).addClass("animation");
      setTimeout(function () {
        c("#toast_" + d).addClass("slide_open")
      }, 50);
      this._measure_helpers(d);
      this._click_helpers(d)
    },
    _sidebar_hide_helpers: function () {
      var e = c("#right_column");
      if (e.length !== 1) {
        return
      }
      var f = e.outerWidth();
      var d = e.outerHeight();
      setInterval(_.bind(function () {
        var p = c(window).innerHeight();
        var n = window.pageYOffset;
        var m = n + p;
        var o = e.offset();
        var k = o.top;
        var h = o.top + d;
        if ((n + (p / 2.5)) < h) {
          this.footer_overlaps = true;
          for (var l = this.toast_ids.length - 1; l >= 0; l--) {
            this.pop_toast(this.toast_ids[l])
          }
          for (var g = this.queue_ids.length - 1; g >= 0; g--) {
            this._nuke_toast(this.queue_ids[g])
          }
          this._queue_heartbeat()
        } else {
          this.footer_overlaps = false
        }
      }, this), 800)
    },
    _measure_helpers: function (d) {
      $txt = c("#toast_" + d + " .txt");
      if ($txt.length > 0) {
        var e = $txt.height();
        if (e > 0 && e <= 20) {
          $txt.addClass("nowrap")
        }
      }
    },
    _click_helpers: function (d) {
      $anchor = c("#toast_" + d + " .anchor");
      if ($anchor.length > 0) {
        $anchor.on("mousedown", function () {
          c("#toast_" + d).addClass("toast_active")
        });
        $anchor.on("click, mouseup, mouseleave", function () {
          c("#toast_" + d).removeClass("toast_active")
        })
      }
    },
    reset_all_timeouts: function () {
      c.each(this_toast_ids, _.bind(function (e, d) {
        this._set_toast_timeout(d)
      }, this))
    },
    set_all_timeouts: function (d) {
      c.each(this.toast_ids, _.bind(function (f, e) {
        this.toasts[e].t = this._set_custom_toast_timeout(e, d)
      }, this))
    },
    hover_in: function () {
      if (this.is_ipad) {
        return
      }
      clearTimeout(this.t_paused);
      if (!this.paused) {
        this._clear_all_timeouts()
      }
      this.paused = true;
      this.$el.addClass("hover")
    },
    hover_out: function () {
      if (this.is_ipad) {
        return
      }
      this.t_paused = setTimeout(_.bind(function () {
        this.paused = false;
        this.$el.removeClass("hover");
        c.each(this.toast_ids, _.bind(function (f, e) {
          var d = this.unpause_expires + (f * this.options.toast_padding);
          this.toasts[e].t = this._set_custom_toast_timeout(e, d)
        }, this))
      }, this), 150)
    },
    pop_toast: function (e) {
      if (this.debug_mode || typeof this.toasts[e] === "undefined") {
        return
      }
      clearTimeout(this.toasts[e].t);
      var d = jQuery.inArray(e, this.toast_ids);
      this.toast_ids.splice(d, 1);
      delete this.toasts[e];
      this._freeze_toast(e);
      this._animate_away(e);
      this._update_position_helpers();
      if (this.can_display_toasts() && !this.footer_will_overlap() && (this.toast_ids.length == (this.options.max_toast - 1))) {
        this._add_next_queue_item()
      } else {
        this._queue_heartbeat()
      }
      clearTimeout(this.t_push_lock);
      if (this.is_screen_empty()) {
        this.push_lock = false;
        if (this.gutterManager) {
          this.gutterManager.removeGutteredView()
        }
      }
    },
    _nuke_all_toast: function () {
      c.each(this.toasts, _.bind(function (e, d) {
        this._nuke_toast(d.id)
      }, this));
      this._queue_heartbeat()
    },
    _nuke_toast: function (e) {
      var d = jQuery.inArray(e, this.toast_ids);
      if (d !== -1) {
        this.toast_ids.splice(d, 1)
      }
      var f = jQuery.inArray(e, this.queue_ids);
      if (f !== -1) {
        this.queue_ids.splice(f, 1)
      }
      if (d !== -1 || f !== -1) {
        clearTimeout(this.toasts[e].t);
        delete this.toasts[e];
        var g = c("#toast_" + e);
        if (g.length > 0) {
          g.remove()
        }
      }
      this._update_position_helpers();
      return
    },
    _clear_all_timeouts: function () {
      c.each(this.toast_ids, _.bind(function (e, d) {
        clearTimeout(this.toasts[d].t)
      }, this))
    },
    _animate_away: function (e) {
      var d = c("#toast_" + e);
      if (d.length === 0) {
        return
      }
      c("#toast_" + e).addClass("fade_out");
      setTimeout(function () {
        c("#toast_" + e).remove()
      }, (this.options.away_speed + 15))
    },
    _freeze_toast: function (d) {
      var l = c("#toast_" + d);
      if (l.length === 0) {
        return
      }
      var e = l.position();
      var j = c("#toaster").height();
      var h = l.outerHeight();
      var i = l.width();
      var k = l.height();
      var g = e.top;
      var f = e.left;
      l.css({position: "absolute", bottom: (j - h) + "px", left: f + "px", width: i, height: k})
    },
    _get_toast_template: function (d) {
      return _.template(this.templates[d])
    },
    _toast_expire: function (d) {
      this.pop_toast(d)
    },
    _add_visibility_helper: function () {
      var g, h, f = {
        hidden: "visibilitychange",
        mozHidden: "mozvisibilitychange",
        webkitHidden: "webkitvisibilitychange",
        msHidden: "msvisibilitychange",
        oHidden: "ovisibilitychange"
      };
      for (g in f) {
        if (f.hasOwnProperty(g) && g in document) {
          h = f[g];
          break
        }
      }
      if (h) {
        document.addEventListener(h, e)
      } else {
        if (c.browser.msie && (parseInt(c.browser.version, 10) <= 9)) {
          document.onfocusin = document.onfocusout = e
        } else {
          window.onfocus = window.onblur = e
        }
      }
      var d = this;

      function e(j) {
        var i = document.body;
        j = j || window.event;
        if (j.type == "focus" || j.type == "focusin") {
          d.page_visible = true
        } else {
          if (j.type == "blur" || j.type == "focusout") {
            d.page_visible = false
          } else {
            d.page_visible = this[g] ? false : true
          }
        }
      }
    },
    _set_toast_timeout: function (d) {
      if (typeof this.toasts[d] != "object") {
        return null
      }
      return this._set_custom_toast_timeout(d, this.toasts[d].options.expires)
    },
    _set_custom_toast_timeout: function (f, d) {
      if (typeof this.toasts[f] != "object") {
        return null
      }
      clearTimeout(this.toasts[f].t);
      var e = function () {
        this._toast_expire(f)
      };
      return setTimeout(_.bind(e, this), d)
    },
    _update_position_helpers: function () {
      var f = 0;
      var d = 0;
      for (var e = this.toast_ids.length - 1; e >= 0; e--) {
        if (c("#toast_" + this.toast_ids[e]).is(":visible")) {
          d++
        }
      }
      c.each(this.toast_ids, function (h, g) {
        $this_toast = c("#toast_" + g);
        if ($this_toast.length > 0) {
          $this_toast.removeClass("toast_only toast_top toast_bottom toast_middle");
          if (d == 1) {
            $this_toast.addClass("toast_only")
          } else {
            if (f === 0) {
              $this_toast.addClass("toast_top")
            } else {
              if (f === (d - 1)) {
                $this_toast.addClass("toast_bottom")
              } else {
                $this_toast.addClass("toast_middle")
              }
            }
          }
          f++
        }
      })
    }
  });
  b.Toaster = a
})(jQuery, Tumblr);
(function (c, a) {
  var b = Backbone.Model.extend({
    translations: {}, add_translations: function (d) {
      jQuery.extend(this.translations, d)
    }, unset_translations: function () {
      this.translations = {}
    }, __: function (d) {
      return this.translations[d] || d
    }, _helper_icon_target_type: function (d) {
      if (d.type == "ask" || d.type == "fanmail") {
        return d.type
      } else {
        return d.target_post_type
      }
    }, _helper_media_url: function (d) {
      return d.media_url
    }, _helper_from_tumblelog_link: function (d) {
      var e = d.from_tumblelog_name;
      if (d.from_tumblelog_name.length > 14) {
        e = d.from_tumblelog_name.substr(0, 14) + "..."
      }
      return '<a href="' + d.from_tumblelog_url + '" target="_blank">' + e + "</a>"
    }, _helper_other_user_badge: function (d) {
      var e = d.type;
      if (e === "answer") {
        e = "reply"
      }
      if (e === "photo_reply") {
        e = "reply"
      }
      return e
    }, _helper_blockquote: function (d) {
      return "<blockquote>" + _.escape(d) + "</blockquote>"
    }, _helper_is_empty: function (d) {
      return (d === "")
    }, _helper_has_reply: function (d) {
      if ((typeof d.quote_summary == "string") && !this._helper_is_empty(d.quote_summary)) {
        return true
      } else {
        return false
      }
    }, _helper_summary_txt: function (d) {
      if ((typeof d.summary == "string") && !this._helper_is_empty(d.summary)) {
        return ": <em>" + _.escape(d.summary) + "</em>"
      } else {
        return ""
      }
    }, _helper_post_noun: function (d) {
      return d.noun_type == "question" ? "post" : d.noun_type
    }, _base_other_user_action: function (d) {
      var g = {
        img1: {
          url: d.from_tumblelog_avatar,
          badge: this._helper_other_user_badge(d),
          is_link: true,
          href: d.from_tumblelog_url
        }
      };
      var f = {};
      if (d.type == "follower" || d.type == "user_mention") {
        f = {type: "image_text"}
      } else {
        if (d.type == "photo_reply") {
          f = {type: "image_text_image", img2: {url: d.photo_reply_url, is_link: true, href: d.target_post_url}}
        } else {
          if (d.target_post_type == "photo") {
            f = {
              type: "image_text_image",
              img2: {url: this._helper_media_url(d), is_link: true, href: d.target_post_url}
            }
          } else {
            f = {type: "image_text_icon", icon: {type: this._helper_icon_target_type(d), href: d.target_post_url}}
          }
        }
      }
      var e = {};
      jQuery.extend(e, g, f);
      return e
    }, notification_center_convert: function (f, d) {
      var e = {
        type: "image_text",
        message: "<strong>" + f + "</strong>",
        is_link: true,
        href: d.url,
        img1: {url: d.tumblelog.avatar, is_link: true, href: d.tumblelog.url}
      };
      return e
    }, like: function (d) {
      var e = this._base_other_user_action(d);
      var g = "%1$s liked your " + this._helper_post_noun(d);
      g = this.__(g).replace("%1$s", this._helper_from_tumblelog_link(d));
      var f = {message: g, is_link: true, href: d.target_post_url};
      jQuery.extend(f, e);
      return f
    }, reblog: function (d) {
      var e = this._base_other_user_action(d);
      var g = "%1$s reblogged your " + this._helper_post_noun(d);
      g += this._helper_has_reply(d) ? " and added:" : "";
      g = this.__(g).replace("%1$s", this._helper_from_tumblelog_link(d));
      if (this._helper_has_reply(d)) {
        g += this._helper_blockquote(d.quote_summary)
      }
      var f = {message: g, is_link: true, href: d.new_post_url};
      jQuery.extend(f, e);
      return f
    }, fanmail: function (d) {
      var e = this._base_other_user_action(d);
      var g = "%1$s sent you fanmail";
      g = this.__(g).replace("%1$s", this._helper_from_tumblelog_link(d));
      g += this._helper_summary_txt(d);
      var f = {message: g, is_link: true, href: d.target_post_url};
      jQuery.extend(f, e);
      return f
    }, ask: function (d) {
      var e = this._base_other_user_action(d);
      var g = "%1$s asked";
      g = this.__(g).replace("%1$s", this._helper_from_tumblelog_link(d));
      g += this._helper_summary_txt(d);
      var f = {message: g, is_link: true, href: d.target_post_url};
      jQuery.extend(f, e);
      return f
    }, ask_answer: function (d) {
      var e = this._base_other_user_action(d);
      var g = "%1$s answered your ask";
      g = this.__(g).replace("%1$s", this._helper_from_tumblelog_link(d));
      g += this._helper_summary_txt(d);
      if (d.answer_text) {
        g += this._helper_blockquote(d.answer_text)
      }
      var f = {message: g, is_link: true, href: d.target_post_url};
      jQuery.extend(f, e);
      return f
    }, answer: function (d) {
      var e = this._base_other_user_action(d);
      var g = "%1$s answered your question";
      g = this.__(g).replace("%1$s", this._helper_from_tumblelog_link(d));
      g += this._helper_summary_txt(d);
      if (d.answer_text) {
        g += this._helper_blockquote(d.answer_text)
      }
      var f = {message: g, is_link: true, href: d.target_post_url};
      jQuery.extend(f, e);
      return f
    }, reply: function (d) {
      var e = this._base_other_user_action(d);
      var g = "%1$s replied to your " + this._helper_post_noun(d);
      g = this.__(g).replace("%1$s", this._helper_from_tumblelog_link(d));
      g += this._helper_summary_txt(d) + this._helper_blockquote(d.reply_text);
      var f = {message: g, is_link: true, href: d.target_post_url};
      jQuery.extend(f, e);
      return f
    }, photo_reply: function (d) {
      var e = this._base_other_user_action(d);
      var g = "%1$s replied to your " + this._helper_post_noun(d);
      g = this.__(g).replace("%1$s", this._helper_from_tumblelog_link(d));
      g += this._helper_summary_txt(d);
      var f = {message: g, is_link: true, href: d.target_post_url};
      jQuery.extend(f, e);
      return f
    }, follower: function (d) {
      var e = this._base_other_user_action(d);
      var g = "%1$s started following %2$s";
      if (this.has("primary_tumblelog")) {
        if (this.get("primary_tumblelog") == d.target_tumblelog_name) {
          g = "%1$s started following you"
        }
      }
      g = this.__(g);
      g = g.replace("%1$s", this._helper_from_tumblelog_link(d));
      g = g.replace("%2$s", d.target_tumblelog_name);
      var f = {message: g, is_link: true, href: d.from_tumblelog_url};
      jQuery.extend(f, e);
      return f
    }, user_mention: function (d) {
      var f = this._base_other_user_action(d);
      var i = this._helper_post_noun(d);
      var e = i == "audio" ? "an" : "a";
      var h = "%1$s mentioned %2$s in " + e + " " + i;
      h = this.__(h);
      h = h.replace("%1$s", this._helper_from_tumblelog_link(d));
      h = h.replace("%2$s", d.target_tumblelog_name);
      var g = {message: h, is_link: true, href: d.new_post_url};
      jQuery.extend(g, f);
      return g
    }
  });
  a.ToastKit = new b()
})(jQuery, Tumblr);
(function (c, a) {
  var b = Backbone.Model.extend({
    enabled: true,
    debug_mode: false,
    poll_route: "/svc/poll",
    is_sleeping: false,
    total_sleep_heartbeats: 0,
    total_empty_heatbeats: 0,
    hash_history: {},
    use_hash_history: true,
    visibility_check: 2000,
    i_visibility_check: null,
    is_window_visible: true,
    defaults: {
      toast_mode: 0,
      primary_tumblelog: false,
      start_timestamp: false,
      check_posts: false,
      check_inbox: false,
      check_messaging: false,
      messaging_keys: [],
      current_speed: 1,
      initial_delay: 0,
      poll_speeds: {0: 10000, 1: 20000, 2: 30000, 3: 50000, 4: 60000, 5: 80000},
      sleep_speed: 300000,
      sleep_max: 18,
      slowdown_beats: 10,
      poll_padding: 30000
    },
    use_timestamps: true,
    last_timestamp: false,
    t_heartbeat: null,
    is_first_heartbeat: true,
    poll_lock: false,
    use_new_abacus: Tumblr.Flags.bool("use_new_abacus"),
    dark_new_abacus: Tumblr.Flags.bool("dark_new_abacus"),
    initialize: function (d) {
      this.options = this.attributes;
      Tumblr.ToastKit.set("primary_tumblelog", d.primary_tumblelog);
      if (typeof Tumblr.Cookie === "object") {
        var e = Tumblr.Cookie.get("last_toast");
        if (e) {
          e = parseInt(e, 10);
          if (e !== 0 && e > this.options.start_timestamp) {
            this.options.start_timestamp = e
          }
        }
      }
      if (this.options.start_timestamp) {
        this.update_timestamp(this.options.start_timestamp)
      }
      if (this.options.toast_mode === 0) {
        this.options.current_speed = 3
      }
      this._set_heartbeat();
      this.i_visibility_check = setInterval(_.bind(this._check_visibility, this), this.visibility_check)
    },
    kill_switch: function () {
      this.enabled = false;
      this.poll_lock = true;
      clearTimeout(this.t_heartbeat)
    },
    debug_endless: function () {
      this.use_timestamps = false;
      this.use_hash_history = false;
      this.options.current_speed = 0;
      this.heartbeat();
      return true
    },
    heartbeat: function () {
      clearTimeout(this.t_heartbeat);
      if (!this.enabled) {
        return false
      }
      if (this.total_empty_heatbeats >= this.options.slowdown_beats) {
        this.total_empty_heatbeats = 0;
        this.poll_slower()
      }
      if (this.is_sleeping) {
        this.total_sleep_heartbeats++;
        if (this.total_sleep_heartbeats <= this.options.sleep_max) {
          this.poll()
        } else {
        }
      } else {
        this.poll()
      }
      this._set_heartbeat();
      return
    },
    get_next_heartbeat: function () {
      return this.is_sleeping ? this.options.sleep_speed : this.options.poll_speeds[this.options.current_speed]
    },
    _check_visibility: function () {
      var d = Tumblr.Toaster.can_display_toasts();
      if (this.is_window_visible && !d) {
        this.sleep()
      }
      if (!this.is_window_visible && d) {
        this.wakeup()
      }
      this.is_window_visible = d
    },
    _set_heartbeat: function () {
      var d = this.is_sleeping ? this.options.sleep_speed : this.options.poll_speeds[this.options.current_speed];
      if (this.is_first_heartbeat) {
        this.is_first_heartbeat = false;
        d = this.is_sleeping ? this.options.sleep_speed : this.options.poll_speeds[this.options.initial_delay]
      }
      this.t_heartbeat = setTimeout(_.bind(function () {
        this.heartbeat()
      }, this), d)
    },
    poll_faster: function () {
      var d = this.options.current_speed;
      if ((d - 1) >= 0) {
        this.options.current_speed--
      }
    },
    poll_slower: function () {
      var d = this.options.current_speed;
      var e = _.size(this.options.poll_speeds);
      if ((d + 1) < e) {
        this.options.current_speed++
      }
    },
    sleep: function () {
      this.is_sleeping = true;
      this.total_sleep_heartbeats = 0
    },
    wakeup: function () {
      this.is_sleeping = false;
      this.total_sleep_heartbeats = 0;
      this._set_heartbeat()
    },
    poll: function () {
      if (this.poll_lock) {
        return
      }
      this.poll_lock = true;
      var h = {
        notifications_next: (this.get_next_heartbeat() + this.options.poll_padding),
        magick: Math.floor(Math.random() * 100001),
        abacus: (this.use_new_abacus || this.dark_new_abacus)
      };
      if (this.options.token !== null) {
        h.token = this.options.token
      }
      if (this.options.toast_mode !== 0) {
        var d = {notifications: true};
        jQuery.extend(h, d)
      }
      if (this.use_timestamps && this.last_timestamp && !this.debug_mode) {
        jQuery.extend(h, {from: this.last_timestamp})
      }
      if (this.options.check_posts) {
        var i = {unread: true};
        jQuery.extend(h, i)
      }
      if (this.options.check_inbox) {
        var e = {inbox: true};
        jQuery.extend(h, e)
      }
      if (this.options.check_messaging && _.isArray(this.options.messaging_keys) && !_.isEmpty(this.options.messaging_keys)) {
        var f = {unread_messages: true, mention_keys: this.options.messaging_keys.join(",")};
        jQuery.extend(h, f)
      }
      this.last_request_timestamp = new Date().getTime();
      var g = c.ajax({url: "/services/poll", type: "GET", data: h});
      g.done(_.bind(function (j) {
        this.poll_lock = false;
        if (this.options.toast_mode !== 0) {
          this.parse_notifications(j)
        }
        if (this.options.check_posts) {
          this.parse_unread(j)
        }
        if (this.options.check_inbox) {
          this.parse_inbox(j)
        }
        if (this.options.check_messaging) {
          this.parse_messaging(j)
        }
        if (typeof j.next_from !== "undefined") {
          this.update_timestamp(j.next_from)
        }
      }, this));
      g.fail(_.bind(function () {
        this.kill_switch()
      }, this))
    },
    update_timestamp: function (d) {
      d = parseInt(d, 10);
      if (this.last_timestamp === false || d > this.last_timestamp) {
        this.last_timestamp = d;
        if (typeof Tumblr.Cookie === "object") {
          Tumblr.Cookie.set("last_toast", d, 365 * 24 * 60 * 60)
        }
      }
    },
    parse_unread: function (f) {
      if (typeof f.unread !== "number" && typeof f.abacus !== "number") {
        return
      }
      var e;
      if (this.use_new_abacus) {
        e = f.abacus
      } else {
        e = f.unread
      }
      if (e) {
        var d = e;
        if (e >= 100) {
          this.options.check_posts = false;
          d = "99+"
        }
        if (e > 0) {
          document.title = "(" + d + ") " + (document.title.indexOf(")") != -1 ? document.title.split(")")[1] : document.title);
          c(".new_post_notice_container").each(_.bind(function (h, g) {
            var j = c(g);
            j.find(".tab_notice_value").text(d);
            j.addClass("tab-notice--active")
          }, this))
        }
      }
      return e
    },
    parse_inbox: function (f) {
      if (typeof f.inbox !== "number") {
        return
      }
      var e = f.inbox;
      if (e) {
        var d = e;
        if (e > 0) {
          c(".inbox_notice_container").each(_.bind(function (h, g) {
            var j = c(g);
            j.find(".tab_notice_value").text(d);
            j.addClass("tab-notice--active")
          }, this))
        } else {
          c(".inbox_notice_container").removeClass("tab-notice--active")
        }
      }
      return e
    },
    parse_notifications: function (e) {
      if (typeof e.notifications !== "object") {
        return
      }
      var d = e.notifications;
      if (d.length > 0) {
        c(d).each(_.bind(function (h, f) {
          var j = false;
          if (this.use_hash_history) {
            var k = f.hash;
            if (k in this.hash_history) {
              this.hash_history[k]++;
              j = true
            } else {
              this.hash_history[k] = 1
            }
          }
          if (!j && this.options.toast_mode !== 0) {
            var g = false;
            switch (f.type) {
              case"like":
                g = Tumblr.ToastKit.like(f);
                break;
              case"reblog":
                g = Tumblr.ToastKit.reblog(f);
                break;
              case"fanmail":
                g = Tumblr.ToastKit.fanmail(f);
                break;
              case"ask":
                g = Tumblr.ToastKit.ask(f);
                break;
              case"answer":
                g = Tumblr.ToastKit.answer(f);
                break;
              case"ask_answer":
                g = Tumblr.ToastKit.ask_answer(f);
                break;
              case"reply":
                g = Tumblr.ToastKit.reply(f);
                break;
              case"photo_reply":
                g = Tumblr.ToastKit.photo_reply(f);
                break;
              case"follower":
                g = Tumblr.ToastKit.follower(f);
                break;
              case"user_mention":
                g = Tumblr.ToastKit.user_mention(f);
                break
            }
            if (g) {
              Tumblr.Toaster.add_toast(g)
            }
          }
        }, this));
        this.poll_faster();
        this.total_empty_heatbeats = 0
      } else {
        this.total_empty_heatbeats++
      }
    },
    parse_messaging: function (d) {
      if (Tumblr.Events && _.has(d, "unread_messages")) {
        Tumblr.Events.trigger("toaster:updateMessagingUnreadCounts", d, this.last_request_timestamp)
      }
    }
  });
  a.Thoth = b
})(jQuery, Tumblr);
/*! scripts/photo_reply.js */
(function (a) {
  Tumblr.PhotoReply = Backbone.View.extend({
    options: {
      post_id: undefined,
      mb_limit: 10,
      status: "inactive",
      progress: 0,
      image: undefined
    }, initialize: function (b) {
      this.options = b || {};
      this.post_id = this.options.post_id || this.$el.data("postId");
      this.status = this.options.status || "inactive";
      this.progress = this.options.progress || 0;
      this.disabled = true;
      this.$post = this.$el.closest(".post");
      this.$container = this.$post.find(".photo_reply_container");
      this.$icon = this.$(".photo_reply_icon");
      this.$progress = this.$(".photo_reply_icon_progress");
      this.$image = this.$(".photo_reply_image");
      this.$icon.addClass("show_progress_bar");
      this.__proxy_functions();
      if (this.status !== "has_image") {
        this.enable_dropzone()
      }
      this.$el.data("tumblr_photoreply", this);
      this.constructor.register(this)
    }, __proxy_functions: function () {
      this._show_image = a.proxy(this.show_image, this);
      this._hide_image = a.proxy(this.hide_image, this);
      this._upload_file_add = a.proxy(this.upload_file_add, this);
      this._upload_submit = a.proxy(this.upload_submit, this);
      this._upload_progress = a.proxy(this.upload_progress, this);
      this._upload_end = a.proxy(this.upload_end, this);
      this._upload_cancel = a.proxy(this.upload_cancel, this);
      this._upload_stop = a.proxy(this.upload_stop, this);
      this._dragenter = a.proxy(this.dragenter, this);
      this._dragleave = a.proxy(this.dragleave, this);
      this._drop = a.proxy(this.drop, this)
    }, attach_image: function (c) {
      var b = {width: "", height: "", src: ""};
      if (typeof c === "string") {
        b.src = c
      } else {
        if (c.url) {
          b.src = c.url
        }
        if (c.height) {
          b.height = c.height
        }
        if (c.width) {
          b.width = c.width
        }
      }
      this.$container.addClass("fileupload");
      if (!(this.$image && this.$image.length)) {
        this.$image = a('<img src="" alt="" class="photo_reply_image"/>');
        this.$image.appendTo(this.$container).on("load", this._show_image)
      }
      this.$image.attr(b)
    }, show_image: function () {
      if (!(this.$image && this.$image.length)) {
        return false
      }
      this.$container.css("max-height", this.$image.get(0).naturalHeight).addClass("has_photo_reply")
    }, hide_image: function () {
      this.$container.removeClass("has_photo_reply").css("max-height", "")
    }, enable_dropzone: function () {
      this.disabled = false;
      this.$post.on({dragenter: this._dragenter, dragleave: this._dragleave, drop: this._drop});
      this.$post.find("*").on("dragenter dragover", this.cancel_event);
      this.$el.find('input[type="file"]').on("click", this._upload_cancel).attr("disabled", false);
      this.create_uploader({form: this.$el, dropzone: this.$post})
    }, disable_dropzone: function () {
      this.disabled = true;
      this.$post.off({dragenter: this.dragenter, dragleave: this.dragleave, drop: this.drop});
      this.$post.removeClass("photo_reply_hover");
      this.$post.find("*").off("dragenter dragover", this.cancel_event);
      this.$el.find('input[type="file"]').off("click", this._upload_cancel).attr("disabled", true)
    }, create_uploader: function (b) {
      this.destroy_uploader();
      this.$uploader = a(b.form).fileupload({
        dataType: "json",
        maxNumberOfFiles: 1,
        dropZone: b.dropzone,
        pasteZone: null,
        add: this._upload_file_add,
        submit: this._upload_submit,
        send: this._upload_start,
        progress: this._upload_progress,
        always: this._upload_end,
        stop: this._upload_stop
      })
    }, destroy_uploader: function () {
      if (this.$uploader && this.$uploader.data("fileupload")) {
        a(this.$uploader).fileupload("destroy")
      }
    }, dragenter: function (b) {
      this.$post.addClass("photo_reply_hover")
    }, dragleave: function (b) {
      if (this.event_in_bounds(b)) {
        return false
      }
      this.$post.removeClass("photo_reply_hover")
    }, drop: function (b) {
      this.$post.removeClass("photo_reply_hover")
    }, show_coddled_progress: function (b) {
      return this.show_progress(b, 20)
    }, show_progress: function (b, c) {
      if (c) {
        b = Math.max(c, Math.min(b, 100 - c))
      }
      this.$progress.css("width", b + "%");
      return b
    }, upload_submit: function (f, d) {
      if (this.disabled) {
        return false
      }
      if (this.status !== "inactive") {
        return false
      }
      var b = !!d.files.length;
      a.each(d.files, a.proxy(function (e, g) {
        if (g.size && g.size > this.options.mb_limit * 1048576) {
          b = false
        }
      }, this));
      if (!b) {
        var c = l10n_str.ajax_error;
        if (l10n_str.over_max_file_size_mb) {
          c = l10n_str.over_max_file_size_mb.replace("%1$s", this.options.mb_limit)
        }
        alert(c);
        return false
      }
    }, upload_file_add: function (c, b) {
      this.jqXHR = b.submit()
    }, upload_start: function (c, b) {
      this.status = "uploading";
      this.progress = 0;
      this.show_progress(this.progress)
    }, upload_progress: function (c, b) {
      this.progress = parseInt(b.loaded / b.total * 100, 10);
      this.show_coddled_progress(this.progress)
    }, upload_end: function (d, c) {
      var b;
      if (c.textStatus === "success") {
        b = c.result
      } else {
        b = a.parseJSON(c.jqXHR.responseText)
      }
      if (b && b.meta && b.meta.status && b.meta.status === 200) {
        if (b && b.response && b.response[0].url) {
          this.image = b.response[0];
          this.progress = 100;
          this.status = "has_image";
          this.disable_dropzone();
          this.attach_image(this.image)
        }
      } else {
        if (c && c.errorThrown === "abort") {
          this.progress = 0;
          this.status = "inactive"
        } else {
          this.progress = 0;
          this.status = "error";
          alert(b && b.response ? b.response : l10n_str.ajax_error)
        }
      }
      this.show_progress(this.progress)
    }, upload_cancel: function () {
      try {
        this.jqXHR.abort()
      } catch (b) {
      }
      this.progress = 0;
      this.show_progress(this.progress);
      this.enable_dropzone()
    }, upload_stop: function () {
      this.destroy_uploader()
    }, cancel_event: function (b) {
      b.preventDefault();
      b.stopPropagation();
      return false
    }, event_in_bounds: function (f) {
      var d = f.currentTarget.getBoundingClientRect();
      var c = f.originalEvent;
      var b, g;
      if (typeof c.clientX === "undefined") {
        b = c.pageX;
        g = c.pageY
      } else {
        b = c.clientX;
        g = c.clientY
      }
      return !(b > d.left + d.width - 1 || b < d.left || g > d.top + d.height - 1 || g < d.top)
    }
  }, {
    instances: [], register: function (b) {
      this.instances.push(b)
    }, unregister: function (b) {
      this.instances.splice(_.indexOf(this.instances, b), 1)
    }, clean_up: function (d) {
      if (!document.body) {
        return
      }
      var c, b;
      for (c = 0; c < this.instances.length; c++) {
        b = this.instances[c];
        if (!(b.$el.data("tumblr_photoreply") && b.$el.closest(document.body).length)) {
          b.remove();
          c--
        }
      }
    }, init: function () {
      if (!this._scan) {
        this._scan = a.proxy(this.scan, this)
      }
      if (_.indexOf(AfterAutoPaginationQueue, this._scan) < 0) {
        AfterAutoPaginationQueue.push(this._scan)
      }
      this.scan()
    }, scan: function (b) {
      b = a.extend({}, b);
      a(b.el || ".photo_reply_form").each(a.proxy(function (c, d) {
        if (!a(d).data("tumblr_photoreply")) {
          new Tumblr.PhotoReply({el: d})
        }
      }, this));
      return this
    }
  })
})(jQuery);
/*! scripts/link_button.js */
(function (e, d, f, c, b) {
  var a = f.View.extend({
    events: {click: "onLinkClick"}, initialize: function (g) {
      this.$el.data("tumblr_linkbutton", this);
      this.constructor.register(this)
    }, createLoggingData: function (h) {
      var k = this.$el.closest("[data-json]"), g = {}, i;
      if (k.length > 0) {
        try {
          g = JSON.parse(k.attr("data-json"))
        } catch (j) {
          if (c.Flags.bool("is_dev")) {
            console.error("Failed to parse post data for link button logging.", j)
          }
        }
      }
      i = d.pick(g, "root_id", "liked", "is_mine", "is_recommended", "tumblelog", "serve-id", "pt");
      d.extend(i, {post_id: g.id, post_url: (g.share_popover_data || {}).post_url});
      return {
        post: i,
        userAction: "click_thru",
        link_url: h,
        has_thumbnail: this.$el.hasClass("has-thumbnail"),
        has_author: this.$el.find(".author").length > 0,
        has_excerpt: this.$el.find(".excerpt").length > 0
      }
    }, logClick: function (g) {
      c.Events.trigger("linkpost:click", {loggingData: this.createLoggingData(g)})
    }, onLinkClick: function (g) {
      this.logClick(e(g.currentTarget).attr("href"))
    }
  }, {
    instances: [], register: function (g) {
      this.instances.push(g)
    }, unregister: function (g) {
      this.instances.splice(d.indexOf(this.instances, g), 1)
    }, init: function () {
      if (!this._scan) {
        this._scan = e.proxy(this.scan, this)
      }
      if (d.indexOf(AfterAutoPaginationQueue, this._scan) < 0) {
        AfterAutoPaginationQueue.push(this._scan)
      }
      this.scan()
    }, scan: function (g) {
      g = e.extend({}, g);
      e(g.el || ".link-button").each(e.proxy(function (h, j) {
        if (!e(j).data("tumblr_linkbutton")) {
          new c.LinkButton({el: j})
        }
      }, this));
      return this
    }
  });
  b.LinkButton = a
})(jQuery, _, Backbone, Tumblr, Tumblr);
/*! scripts/jquery.pano.js */
(function (c, b) {
  var a = function (d, e) {
    if (!(this instanceof a)) {
      return new a(d)
    }
    this.options = d;
    this.config = c.extend({}, a.defaults, this.options);
    this._ = c.extend({}, a.init, this.init);
    this.evt = c.extend({}, a.events);
    c.each(this.evt, c.proxy(function (f) {
      if (typeof this.config[f] === "function") {
        this.evt[f] = this.config[f]
      }
    }, this));
    this.clock = false;
    this.still = true;
    this.motion = false;
    this.paused = false;
    a.register(this);
    return this
  };
  a.prototype = {
    start_clock: function () {
      if (this.clock) {
        return false
      }
      this.clock = true;
      clearInterval(this.ticker);
      this.ticker = setInterval(c.proxy(this.tick, this), this.config.dt)
    }, stop_clock: function () {
      this.clock = false;
      clearInterval(this.ticker)
    }, tick: function (d) {
      if (!d) {
        d = this.config.dt
      }
      return this.paused ? false : this.__tick(d)
    }, __tick: function (f, e) {
      if (this.evt.pre_tick && !this.evt.pre_tick.apply(this, [this])) {
        return this
      }
      if (!f) {
        f = this.config.dt
      }
      if (!e) {
        this.set_properties({
          px0: this._.px,
          vx0: this._.vx,
          ax0: this._.ax,
          py0: this._.py,
          vy0: this._.vy,
          ay0: this._.ay,
          pz0: this._.pz,
          vz0: this._.vz,
          az0: this._.az,
          dt: f
        })
      }
      if (!f) {
        return this
      }
      this.still = true;
      this.motion = false;
      var d = f * f;
      if (this.config.x && (this._.vx || this._.ax)) {
        this._.px = this._.px + this._.vx * f + 0.5 * this._.ax * d;
        this._.vx = this.__almost_zero(this._.vx + this._.ax * f);
        if (this._.drag < 1) {
          this._.vx *= this._.drag
        }
        if (this._.vx) {
          this.still = false
        }
        if (this._.vx || this._.ax) {
          this.motion = true
        }
      }
      if (this.config.y && (this._.vy || this._.ay)) {
        this._.py = this._.py + this._.vy * f + 0.5 * this._.ay * d;
        this._.vy = this.__almost_zero(this._.vy + this._.ay * f);
        if (this._.drag < 1) {
          this._.vy *= this._.drag
        }
        if (this._.vy) {
          this.still = false
        }
        if (this._.vy || this._.ay) {
          this.motion = true
        }
      }
      if (this.config.z && (this._.vz || this._.az)) {
        this._.pz = this._.pz + this._.vz * f + 0.5 * this._.az * d;
        this._.vz = this.__almost_zero(this._.vz + this._.az * f);
        if (this._.drag < 1) {
          this._.vz *= this._.drag
        }
        if (this._.vz) {
          this.still = false
        }
        if (this._.vz || this._.az) {
          this.motion = true
        }
      }
      if (this.evt.post_tick) {
        this.evt.post_tick.apply(this, [this])
      }
      if (this.still && this.evt.when_still) {
        this.evt.when_still.apply(this, [this])
      }
      if (!this.motion && this.evt.no_motion) {
        this.evt.no_motion.apply(this, [this])
      }
      return this
    }, __split_tick: function (g, f, h) {
      if (typeof h !== "function") {
        return this.__tick(g, true)
      }
      var d = f * g;
      var e = g - d;
      if (e) {
        this.__tick(e)
      }
      h.apply(this, [this]);
      if (d) {
        this.__tick(d)
      }
      return this
    }, __almost_zero: function (d) {
      return Math.abs(d) < this.config.threshold ? 0 : d
    }, set_properties: function (d, e) {
      if (c.isPlainObject(d)) {
        c.extend(this._, d)
      } else {
        this._[d] = e
      }
      return this
    }, calculate_velocity: function (g, h, n) {
      if (g.length < 2) {
        return false
      }
      if (this.evt.slide_start) {
        this.evt.slide_start.apply(this, [this])
      }
      var l = 0, j = g.length - 1;
      var e = (new Date()).getTime() - h;
      for (var f = 0; f < g.length; f++) {
        if (g[f][0] < e) {
          l = f + 1
        }
      }
      if (l >= j) {
        return false
      }
      var m = g[l], k = g[j], d = k[0] - m[0];
      this.set_properties({vx0: this._.vx, vy0: this._.vy, vx: (m[1] - k[1]) / d, vy: (m[2] - k[2]) / d});
      if (n) {
        this.autostart_xy()
      }
      return this
    }, autostart_xy: function () {
      var d = (this.config.x && this._.vx) || (this.config.y && this._.vy);
      if (d) {
        this.start_clock()
      }
      return d
    }, autostop_xy: function () {
      var d = !(this._.vx && this.config.x) && !(this._.vy && this.config.y);
      if (d) {
        this.stop_clock()
      }
      return d
    }
  };
  a.instances = [];
  a.register = function (d) {
    this.instances.push(d)
  };
  a.unregister = function (d) {
    this.instances.splice(this.instances.indexOf(d), 1)
  };
  a.dt = 15;
  a.tick = function (e) {
    if (typeof e !== "number") {
      e = this.dt
    }
    for (var d = 0; d < this.instances.length; d++) {
      this.instances[d].tick(e)
    }
  };
  a.init = {
    px: 0,
    vx: 0,
    ax: 0,
    py: 0,
    vy: 0,
    ay: 0,
    pz: 0,
    vz: 0,
    az: 0,
    px0: 0,
    vx0: 0,
    ax0: 0,
    py0: 0,
    vy0: 0,
    ay0: 0,
    pz0: 0,
    vz0: 0,
    az0: 0,
    drag0: 0.9,
    drag: 0.9,
    dt: null
  };
  a.events = {pre_tick: false, post_tick: false, slide_start: false, when_still: false, no_motion: false};
  a.defaults = {x: true, y: false, z: false, threshold: 0.005, dt: a.dt};
  b.Physics = a
})(jQuery, this.Tumblr || (this.Tumblr = {}));
(function (c, b) {
  var a = function (e, d) {
    if (!(this instanceof a)) {
      return new a(e, d)
    }
    this.el = (typeof e === "string") ? c(e).get(0) : e;
    this.$el = c(e);
    this.options = d;
    this.metadata = this.$el.data("plugin-options");
    this.config = c.extend({}, a.defaults, this.options, this.metadata);
    this.$parent = c(this.config.parent);
    this.start = c.proxy(this.__start, this);
    this.end = c.proxy(this.__end, this);
    this.move = c.proxy(this.__move, this);
    this.click = c.proxy(this.__click, this);
    this.scroll = c.proxy(this.__scroll, this);
    this.__init();
    a.register(this);
    return this
  };
  a.prototype = {
    __init: function () {
      this.__reset_positions();
      if (this.autostart) {
        this.enable()
      }
      this.touch = ("ontouchstart" in window || "onmsgesturechange" in window) && navigator.msMaxTouchPoints > 1;
      if (this.touch) {
        c.extend(this.config, {start: "touchstart", end: "touchend", move: "touchmove"})
      }
      this.physics = this.config.physics ? new Tumblr.Physics(this.config.physics) : false
    }, enable: function () {
      this.enable_dragging();
      if (this.config.can_scroll) {
        this.enable_scrolling()
      }
    }, enable_dragging: function () {
      this.dragging = false;
      this.$el.on(this.config.start, this.start);
      this.$el.on(this.config.click, this.click)
    }, enable_scrolling: function () {
      this.scrolling = false;
      this.$el.on(this.config.scroll, this.scroll);
      clearTimeout(this.enable_scrolling_delay)
    }, disable: function () {
      this.disable_dragging();
      this.disable_scrolling()
    }, disable_dragging: function () {
      this.dragging = false;
      this.$el.off(this.config.start, this.start);
      this.$el.off(this.config.click, this.click);
      this.$parent.off(this.config.blur, this.end);
      this.$parent.off(this.config.end, this.end);
      this.$parent.off(this.config.move, this.move)
    }, disable_scrolling: function () {
      this.scrolling = false;
      this.$el.off(this.config.scroll, this.scroll);
      clearTimeout(this.enable_scrolling_delay)
    }, __start: function (d) {
      this.dragging = true;
      this.$parent.on(this.config.blur, this.end);
      this.$parent.on(this.config.end, this.end);
      this.$parent.on(this.config.move, this.move);
      this.__reset_positions();
      this.__event_position(d);
      this.start_position = this.end_position = this.positions[0];
      if (this.config.start_position) {
        this.config.start_position(this.start_position[1], this.start_position[2])
      }
      if (this.physics) {
        this.physics.set_properties({vx0: this.physics._.vx, vy0: this.physics._.vy, vx: 0, vy: 0}).stop_clock()
      }
      d.stopPropagation();
      return false
    }, __end: function (d) {
      this.dragging = false;
      this.$parent.off(this.config.blur, this.end);
      this.$parent.off(this.config.end, this.end);
      this.$parent.off(this.config.move, this.move);
      if (this.config.end_position) {
        this.config.end_position(this.end_position[1], this.end_position[2])
      }
      if (this.physics) {
        this.physics.calculate_velocity(this.positions, this.config.pos_time, true)
      }
    }, __click: function (d) {
      if (this.__any_movement()) {
        d.stopPropagation();
        return false
      }
      return true
    }, __move: function (f) {
      var d = this.__event_position(f);
      this.end_position = this.positions[this.positions.length - 1];
      if (this.config.update_position) {
        this.config.update_position(d.x - this.start_position[1], d.y - this.start_position[2], false)
      }
    }, __scroll: function (d) {
      if (this.physics && this.physics.clock) {
        d.preventDefault();
        this.physics.set_properties({
          vx0: this.physics._.vx,
          vy0: this.physics._.vy,
          vz0: 0,
          vx: 0,
          vy: 0,
          vz: 0
        }).stop_clock();
        this.physics.motion = false;
        if (this.physics.evt.no_motion) {
          this.physics.evt.no_motion.apply(this.physics, [this.physics])
        }
        return false
      }
      if (this.config.update_position) {
        this.config.update_position(this.$el.scrollLeft(), this.$el.scrollTop(), true)
      }
    }, __event_position: function (f, h) {
      var d, g;
      if (this.touch) {
        if (!f.originalEvent.targetTouches.length) {
          return false
        }
        d = f.originalEvent.targetTouches[0].pageX;
        g = f.originalEvent.targetTouches[0].pageY
      } else {
        d = f.pageX;
        g = f.pageY
      }
      if (h) {
        return {x: d, y: g}
      } else {
        return this.__record_position(d, g)
      }
    }, __any_movement: function () {
      if (this.positions < 2) {
        return false
      }
      var e = this.positions[0], d = this.positions[this.positions.length - 1];
      return d[0] !== e[0] || d[1] !== e[1]
    }, __reset_positions: function () {
      delete this.start_position;
      delete this.end_position;
      this.positions = [];
      this.scroll_x = this.$el.scrollLeft();
      this.scroll_y = this.$el.scrollTop()
    }, __record_position: function (d, f) {
      if (c.isPlainObject(d)) {
        f = d.y;
        d = d.x
      }
      var e = (new Date()).getTime();
      this.positions.push([e, d, f]);
      if (this.positions.length - 1 === this.config.pos_limit) {
        this.positions.shift()
      } else {
        if (this.positions.length > this.config.pos_limit) {
          this.positions.splice(-this.config.pos_limit, this.positions.length)
        }
      }
      this.positions.push([e, d, f]);
      return {x: d, y: f}
    }, sync_scroll: function (e) {
      if (!this.config.can_scroll) {
        return
      }
      this.disable_scrolling();
      var d = c(e);
      this.$el.scrollLeft(d.scrollLeft());
      this.$el.scrollTop(d.scrollTop());
      this.scroll_x = this.$el.scrollLeft();
      this.scroll_y = this.$el.scrollTop();
      if (this.physics) {
        this.physics.set_properties({px: this.scroll_x, py: this.scroll_Y})
      }
      clearTimeout(this.enable_scrolling_delay);
      this.enable_scrolling_delay = setTimeout(c.proxy(this.enable_scrolling, this), 200)
    }
  };
  a.instances = [];
  a.register = function (d) {
    this.instances.push(d)
  };
  a.unregister = function (d) {
    this.instances.splice(this.instances.indexOf(d), 1)
  };
  a.defaults = {
    pos_limit: 5,
    pos_time: 200,
    start: "mousedown",
    end: "mouseup",
    move: "mousemove",
    click: "click",
    scroll: "scroll",
    blur: "blur",
    parent: window,
    can_scroll: true,
    physics: false,
    start_position: false,
    end_position: false,
    update_position: false,
    autostart: true
  };
  b.DragRelay = a
})(jQuery, Tumblr);
(function (c, a) {
  var d = function (e) {
    this.options = e;
    this.__init(this.config);
    return this
  };
  d.prototype = {
    __init: function () {
      Tumblr.Glass.show(_.bind(function () {
        this.__destroy()
      }, this));
      this.click = c.proxy(this.__click, this);
      this.resize = c.proxy(this.__resize, this);
      this.keydown = c.proxy(this.__keydown, this);
      this.keyup = c.proxy(this.__keyup, this);
      this.keycancel = c.proxy(this.__keycancel, this);
      this.__create();
      if (this.options.pano) {
        this.__clone_pano(this.options.pano)
      }
      this.__open()
    }, __bind_events: function () {
      this.$lightbox.on("click", this.click);
      c(window).on("resize", this.resize);
      c(window).on("keydown", this.keydown)
    }, __unbind_events: function () {
      this.$lightbox.off("click", this.click);
      c(window).off("resize", this.resize);
      c(window).off("keydown", this.keydown);
      c(window).off("keyup", this.keyup);
      c(window).off("blur", this.keycancel)
    }, __create: function () {
      this.$lightbox = c("<div/>").attr("class", "pano_lightbox").appendTo(c("body"));
      this.$lightbox.css({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 4294967294,
        overflow: "hidden",
        backgroundColor: "rgba(15,15,15,0.95)"
      });
      c("<img/>").attr("id", "vignette").attr("src", "//assets.tumblr.com/images/full_page_vignette.png").css({
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%"
      }).appendTo(this.$lightbox);
      c("<div/>").css({
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%"
      }).appendTo(this.$lightbox)
    }, __destroy: function () {
      this.__unbind_events();
      this.$lightbox.css("display", "none").remove();
      this.pano.$parent.css("overflow", "");
      delete this.$lightbox;
      if (window.top != window.self) {
        if (typeof window.top.pano_iframe_preloader != "undefined" && window.top.pano_iframe_preloader) {
          window.top.pano_iframe_preloader.remove()
        }
      }
      b.unregister(this)
    }, __clone_pano: function (e) {
      this.$pano = c(e).clone(false).appendTo(this.$lightbox);
      this.pano = new b(this.$pano, {side_margins: 100});
      this.pano.lightbox = this
    }, __open: function () {
      this.__bind_events();
      this.pano.__center_vertically(c(window).height());
      this.pano.$parent.css("overflow", "hidden")
    }, __close: function () {
      Tumblr.Glass.hide()
    }, __click: function (f) {
      if (c(f.target).closest(".pano_dragger").length || c(f.target).closest(".pano_thumb").length) {
        return
      }
      this.__close()
    }, __resize: function (f) {
      this.pano.__enforce_max_height();
      this.pano.__center_vertically(c(window).height());
      this.pano.__draw_shades();
      c("#vignette").css("display", "none")
    }, __keydown: function (g) {
      if (!g) {
        return false
      }
      var f = g.charCode ? g.charCode : g.keyCode;
      if ((g.ctrlKey || g.metaKey) && f === 87) {
        this.__close();
        return false
      }
      if (!g.shiftKey && !g.ctrlKey && g.altKey && !g.metaKey) {
        return true
      }
      switch (f) {
        case 37:
          if (this.arrowed) {
            return false
          }
          this.arrowed = true;
          this.pano.physics.set_properties({
            drag0: this.pano.physics._.drag,
            drag: 1,
            vx0: this.pano.physics._.vx,
            vx: -0.9
          }).autostart_xy();
          c(window).on("blur", this.keycancel);
          c(window).on("keyup", this.keyup);
          return false;
        case 39:
          if (this.arrowed) {
            return false
          }
          this.arrowed = true;
          this.pano.physics.set_properties({
            drag0: this.pano.physics._.drag,
            drag: 1,
            vx0: this.pano.physics._.vx,
            vx: 0.9
          }).autostart_xy();
          c(window).on("blur", this.keycancel);
          c(window).on("keyup", this.keyup);
          return false;
        case 27:
        case 32:
        case 74:
        case 75:
          this.__close();
          return false
      }
    }, __keyup: function (g) {
      if (!g) {
        return false
      }
      var f = g.charCode ? g.charCode : g.keyCode;
      if (!g.shiftKey && !g.ctrlKey && g.altKey && !g.metaKey) {
        return true
      }
      switch (f) {
        case 37:
          this.arrowed = false;
          this.pano.physics.set_properties({drag: this.pano.physics._.drag0}).autostop_xy();
          c(window).off("blur", this.keycancel);
          c(window).off("keyup", this.keyup);
          return false;
        case 39:
          this.arrowed = false;
          this.pano.physics.set_properties({drag: this.pano.physics._.drag0}).autostop_xy();
          c(window).off("blur", this.keycancel);
          c(window).off("keyup", this.keyup);
          return false
      }
    }, __keycancel: function (f) {
      if (this.arrowed) {
        this.arrowed = false;
        this.pano.physics.set_properties({
          drag: this.pano.physics._.drag0,
          vx0: this.pano.physics._.vx,
          vx: 0
        }).autostop_xy()
      }
      c(window).off("blur", this.keycancel);
      c(window).off("keyup", this.keyup)
    }
  };
  var b = function (f, e) {
    if (!(this instanceof b)) {
      return new b(f, e)
    }
    this.el = (typeof f === "string") ? c(f).get(0) : f;
    this.$el = c(f);
    if (this.$el.data("panoObject")) {
      return this.$el.data("panoObject")
    }
    this.options = e;
    this.metadata = this.$el.data("plugin-options");
    this.config = c.extend({
      physics: {
        post_tick: c.proxy(function (g) {
          this.viewport_size();
          if (g._.px <= 0) {
            g.set_properties({px: 0, vx: 0.1 * Math.abs(g._.vx)});
            if (this.lightbox) {
              this.lightbox.keycancel()
            }
          } else {
            if (g._.px >= (this.display_width + (this.display_side_margins * 2)) - this.viewport_width) {
              g.set_properties({
                px: (this.display_width + (this.display_side_margins * 2)) - this.viewport_width,
                vx: -0.1 * Math.abs(g._.vx)
              });
              if (this.lightbox) {
                this.lightbox.keycancel()
              }
            }
          }
          this.set_position(g._.px, g._.py, true)
        }, this), slide_start: c.proxy(function (g) {
          this.relay.disable_scrolling();
          this.scrubber_relay.disable_scrolling()
        }, this), no_motion: c.proxy(function (g) {
          g.stop_clock();
          this.relay.enable_scrolling();
          this.scrubber_relay.enable_scrolling();
          this.relay.sync_scroll(this.$viewport)
        }, this)
      }, autostart: true
    }, this.options, this.metadata);
    this.__init(this.config);
    return this
  };
  b.prototype = {
    __init: function (e) {
      this.img_loaded = c.proxy(this.__img_loaded, this);
      this.img_ready = c.proxy(this.__img_ready, this);
      this.__create();
      c.extend(this.config, {
        start_position: c.proxy(this.set_start_position, this),
        end_position: c.proxy(this.set_end_position, this),
        update_position: c.proxy(this.set_position, this)
      });
      this.relay = new Tumblr.DragRelay(this.$dragger, this.config);
      this.physics = this.relay.physics;
      this.scrubber_relay = new Tumblr.DragRelay(this.$scrubber, c.extend({}, this.config, {
        can_scroll: false,
        physics: false,
        start_position: c.proxy(this.set_inverted_start_position, this),
        update_position: c.proxy(this.set_inverted_position, this)
      }));
      this.__load_pano_image();
      b.register(this)
    }, __create: function () {
      if (this.$el.is("a")) {
        this.$orig_a = this.$el;
        this.$orig_img = this.$el.children("img")
      } else {
        this.$orig_img = this.$el
      }
      this.src = this.$orig_img.data("panoSrc");
      this.href = this.$orig_img.data("panoHref");
      this.width = this.$orig_img.data("panoWidth");
      this.height = this.$orig_img.data("panoHeight");
      this.position_height = Math.min(80, this.$orig_img.data("thumbHeight"));
      this.position_width = this.$orig_img.data("thumbWidth") * (this.position_height / this.$orig_img.data("thumbHeight"));
      this.position_width = Math.min(500, this.position_width);
      this.$parent = c("body");
      this.$container = c("<div/>").attr("class", "pano_container loading");
      this.$view_container = c("<div/>").attr("class", "pano_view_container").appendTo(this.$container);
      this.$viewport = c("<div/>").attr("class", "pano_viewport").appendTo(this.$view_container);
      this.$img_container = c("<div/>").attr("class", "pano_img_container").css({
        width: this.width,
        height: this.height,
        padding: "0 " + this.options.side_margins + "px"
      }).appendTo(this.$viewport);
      this.$img = c("<img/>").attr({src: "//assets.tumblr.com/images/x.gif", "class": "pano_img"}).css({
        width: this.width,
        height: this.height
      }).appendTo(this.$img_container);
      this.$loader_img = c("<img/>").attr({
        "class": "pano_loader_img",
        src: this.$orig_img.attr("src")
      }).css({width: this.width, height: this.height}).appendTo(this.$img_container);
      this.$position = c("<div/>").attr("class", "pano_position").css({
        width: this.position_width,
        height: this.position_height
      }).appendTo(this.$container);
      this.$thumb = c("<img/>").attr("class", "pano_thumb").attr("src", this.$orig_img.attr("src")).appendTo(this.$position);
      this.$shade_left = c("<div/>").attr("class", "pano_shade left").appendTo(this.$position);
      this.$shade_right = c("<div/>").attr("class", "pano_shade right").appendTo(this.$position);
      this.$scrubber = c("<div/>").attr("class", "pano_scrubber grab").appendTo(this.$position);
      this.$dragger = c("<div/>").attr("class", "pano_dragger grab").css({height: this.height}).appendTo(this.$container);
      this.$scroller = c("<div/>").attr("class", "pano_scroller").css({
        width: this.width,
        height: this.height,
        borderLeft: this.options.side_margins + "px solid transparent",
        borderRight: this.options.side_margins + "px solid transparent"
      }).appendTo(this.$dragger);
      this.$el.css("display", "none").data("panoObject", this).after(this.$container);
      this.__set_img_dimensions(this.width, this.height, this.options.side_margins);
      this.__enforce_max_height();
      return this
    }, __destroy: function () {
      this.$img.off("load", this.img_ready);
      this.$container.remove();
      delete this.$container;
      delete this.$view_container;
      delete this.$viewport;
      delete this.$img;
      delete this.$loader_img;
      delete this.$position;
      delete this.$thumb;
      delete this.$pos_frame;
      delete this.$dragger;
      this.$el.css("display", "").data("panoObject", "")
    }, __load_pano_image: function (e) {
      if (!e) {
        e = this.src
      }
      this.img_poll = setInterval(this.img_ready, 1000);
      this.$img.on("load", this.img_loaded).attr("src", e);
      this.__img_init()
    }, __img_init: function () {
      this.relay.enable();
      this.scrubber_relay.enable();
      this.__scrubber_sizing();
      this.set_position(0, 0)
    }, __img_ready: function (e) {
      if (!e) {
        e = this.$img[0]
      }
      if (e && e.src && e.complete) {
        this.__img_loaded()
      }
    }, __img_loaded: function (f) {
      this.__scrubber_sizing();
      this.$container.removeClass("loading");
      clearInterval(this.img_poll)
    }, __scrubber_sizing: function () {
      this.viewport_size();
      var e = 100 * this.viewport_width / (this.$img.width() + (this.options.side_margins * 2));
      this.$scrubber.width(Math.min(e, 100) + "%");
      if (Math.min(e, 100) == 100) {
        this.$position.css("opacity", "0")
      } else {
        this.$position.css("opacity", "1")
      }
    }, __draw_shades: function () {
      if (this.relay.touch) {
        return
      }
      this.$shade_left.css("width", Math.max(0, this.scrubber_x));
      this.$shade_right.css("width", Math.max(0, this.position_width - this.scrubber_x - this.$scrubber.width()))
    }, __set_img_dimensions: function (g, e, f) {
      this.$img_container.css({width: g, height: e});
      this.$img.css({width: g, height: e});
      this.$loader_img.css({width: g, height: e});
      this.$dragger.css({height: e});
      this.$scroller.css({width: g, height: e});
      this.display_width = g;
      this.display_height = e;
      if (typeof f === "number") {
        this.$img_container.css({padding: "0 " + f + "px"});
        this.$scroller.css({borderLeft: f + "px solid transparent", borderRight: f + "px solid transparent"});
        this.display_side_margins = f
      }
    }, __enforce_max_height: function (f) {
      f = f || 200;
      var g = c(window).height() - this.$position.outerHeight(true);
      g -= 30;
      var e = Math.max(f, Math.min(this.height, g));
      var h = this.width * (e / this.height);
      this.__set_img_dimensions(h, e);
      this.$img_container.css("min-width", c(window).width() - 2 * this.display_side_margins);
      this.__scrubber_sizing()
    }, __center_vertically: function (e) {
      this.$container.css("top", (e / 2) - (this.$container.height() / 2))
    }, set_start_position: function (e, f) {
      this.$parent.addClass("grabbing");
      this.start_x = this.$viewport.scrollLeft();
      this.start_y = this.$viewport.scrollTop()
    }, set_inverted_start_position: function (e, f) {
      this.$parent.addClass("grabbing");
      this.start_x = this.$scrubber.position().left;
      this.start_y = this.$scrubber.position().top
    }, set_end_position: function (e, f) {
      this.$parent.removeClass("grabbing");
      this.relay.sync_scroll(this.$viewport)
    }, viewport_size: function () {
      this.viewport_width = this.$viewport.width();
      this.viewport_height = this.$viewport.height()
    }, set_position: function (f, g, e) {
      this.viewport_size();
      if (e) {
        this.position_x = f;
        this.position_y = g
      } else {
        this.position_x = this.start_x - f;
        this.position_y = this.start_y - g
      }
      this.$viewport.scrollLeft(this.position_x);
      this.position_x = this.$viewport.scrollLeft();
      this.scrubber_x = this.$scrubber.width() * this.position_x / this.viewport_width;
      this.$scrubber.css("left", parseInt(this.scrubber_x, 10) + "px");
      this.__draw_shades()
    }, set_inverted_position: function (f, g, e) {
      this.viewport_size();
      if (e) {
        this.scrubber_x = f
      } else {
        this.scrubber_x = this.start_x + f
      }
      this.scrubber_x = Math.max(0, Math.min(this.scrubber_x, (this.$position.width() - this.$scrubber.width())));
      this.position_x = this.$viewport.width() * this.scrubber_x / this.$scrubber.width();
      this.$scrubber.css("left", parseInt(this.scrubber_x, 10) + "px");
      this.__draw_shades();
      this.$viewport.scrollLeft(this.position_x)
    }
  };
  b.instances = [];
  b.register = function (e) {
    this.instances.push(e)
  };
  b.unregister = function (e) {
    this.instances.splice(this.instances.indexOf(e), 1)
  };
  c.fn.panorama = function (e) {
    e = e || {};
    var f = e.lightbox || false;
    return this.each(function () {
      if (f) {
        new d(c.extend({}, e, {pano: this}))
      } else {
        new b(this, e)
      }
    })
  };
  a.Panorama = b
})(jQuery, this.Tumblr || (this.Tumblr = {}));
/*! scripts/search/views/popover/search_popover.js */
(function (d, c, b) {
  var a = Tumblr.BaseSearchPopover.extend({
    events: {
      "focusout #search_query": "blur_search_query",
      "focusin #search_query": "focus_search_query",
      "click #popover_search .popover_menu_item": "click_popover",
      'click [data-search-popover-action="explore"]': "click_explore",
      "submit #search_form": "submit",
      "click .search_form_field": "click_search_field"
    }, getSearchPosition: function () {
      return "header_fullwidth"
    }, defaultLoggingdata: function () {
      var e = this.getSearchPosition();
      return {context: e}
    }, initialize: function (e) {
      this.options = e || {};
      this.options.popover_selector = "#popover_search";
      this.log_session = Tumblr.Flags.bool("log_search_box");
      this.onboarding_search = this.options.onboarding || false;
      this.onboarding_search_endpoint = this.options.onboarding_search_endpoint || false;
      Tumblr.BaseSearchPopover.prototype.initialize.apply(this, arguments);
      this.search_term = this.$search_query.val();
      this.capturing = (Tumblr.Capture) ? new Tumblr.Capture.SearchPopover() : null;
      this.listenTo(Tumblr.Events, "search:change:query", this.change_query, this);
      this.listenTo(Tumblr.Events, "search:submit", this.force_submit, this)
    }, click_popover: function (i) {
      var h = this.$(i.currentTarget);
      var g = h.find("a");
      var f = g.attr("href");
      if (i.metaKey || i.altKey) {
        i.stopPropagation();
        i.preventDefault();
        if (Tumblr.Prima.Url.hasAllowedProtocol(f)) {
          window.open(f)
        }
      }
      this.popover.hide();
      this.change_query(g.data("tag-result"));
      if (g.hasClass("search_typeahead")) {
        i.preventDefault();
        i.stopPropagation();
        this.force_submit();
        this.clicked_typeahead(g.data("tag-result"), g)
      }
    }, click_search_field: function (f) {
      f.preventDefault();
      if (!this.$search_query.is(":focus")) {
        this.$search_query.focus()
      }
    }, click_explore: function (f) {
      Tumblr.Events.trigger("explore-links:click", {loggingData: {source: "search-popover"}});
      this.log_search_box("explore_click")
    }, clicked_typeahead: function (h, i) {
      var e = i.closest(".popover_menu_item");
      var g = e.parent().children().index(e);
      var f = i.find(".result_title u").text();
      this.log_search_box("typeahead_click", {position: g, query: h, characters: f, context: "header"})
    }, log_search_box: function (e, f) {
      f = c.extend({}, this.defaultLoggingdata(), f);
      if (this.log_session) {
        Tumblr.Events.trigger("Capture:push", "search_box_usage", e, f)
      }
      if (c.contains(["focus", "form_submit", "explore_click", "typeahead_click"], e)) {
        Tumblr.Events.trigger("header_search:" + e, {loggingData: f})
      }
    }, setup_autocomplete: function () {
      if (this.onboarding_search) {
        this.auto_complete = new Tumblr.OnboardingAutoCompleteSearch({
          el: this.$search_query,
          endpoint: this.onboarding_search_endpoint,
          popover: this.popover
        })
      } else {
        this.auto_complete = new Tumblr.AutoCompleteSearch({
          el: this.$search_query,
          store: "/svc/search_popover",
          popover: this.popover,
          include: Tumblr.EXISTING_TAGS,
          base_blog_search_url: this.options.base_blog_search_url || null,
          blog_search_label: this.options.blog_search_label || 'More results for "%1$s"'
        })
      }
    }, focus_search_query: function () {
      this.$search_field.addClass("active");
      this.currentIndex = -1;
      if (this.$search_query.val() === this.$search_query.attr("placeholder")) {
        this.$search_query.val("")
      }
      this.auto_complete.lookup();
      if (!this.$search_query.val().length) {
        this.$("#unread_tag_notice").hide();
        this.$search_query.removeClass("with_unread")
      }
      Tumblr.Events.trigger("SearchPopover:focus");
      this.log_search_box("focus")
    }, blur_search_query: function (f) {
      Tumblr.Events.trigger("SearchPopover:blur");
      this.log_search_box("blur")
    }, set_active: function (g) {
      var e = d(this.popover_selector + " .popover_menu_item a").filter(":visible");
      var f = e.filter(":focus");
      if (f.length) {
        this.currentIndex = (g === "previous") ? e.index(f) - 1 : e.index(f) + 1
      }
      if (this.currentIndex >= 0 && this.currentIndex < e.length) {
        e.eq(this.currentIndex).focus()
      } else {
        if (this.currentIndex === -2 && g === "previous") {
          e.eq(e.length - 1).focus();
          this.currentIndex = e.length - 1
        } else {
          this.currentIndex = -1;
          this.$search_query.focus()
        }
      }
    }, change_query: function (e) {
      this.$search_query.val(e);
      return this
    }, force_submit: function () {
      this.$("#search_form").trigger("submit")
    }, submit: function () {
      if (d.trim(this.$search_query.val()) === "") {
        window.location = "/explore";
        return false
      }
      if (c.isFunction(this.auto_complete.abort)) {
        this.auto_complete.abort()
      }
      this.popover.hide();
      this.$search_query.blur();
      this.$search_field.removeClass("active");
      this.log_search_box("form_submit");
      Tumblr.Events.trigger("Capture:push", "search_page_usage", "submit", {query: this.$search_query.val()})
    }
  });
  b.SearchPopover = a
})(jQuery, _, Tumblr);
/*! scripts/search/views/popover/search_autocomplete.js */
(function (c, a) {
  var b = Backbone.View.extend({
    events: {keyup: "keyup"}, initialize: function (d) {
      this.options = d || {};
      this.endpoint = this.options.endpoint || "/svc/search_popover/";
      this.threshold = this.options.threshold || 1;
      this.cache_size = this.options.cache_size || 15;
      this.init_value = this.$el.val();
      this.base_blog_search_url = this.options.base_blog_search_url || "/search/blogs?q=";
      this.blog_search_label = this.options.blog_search_label || 'More blogs with "%1$s"';
      this.form_key = c("#tumblr_form_key").attr("content");
      this.cache = {};
      this.queries = [];
      this.popover = this.options.popover;
      this.search_loading_template = c("#search_loading_template").html();
      this.search_results_template = c("#search_results_template").html();
      this.search_results_item_blogs_template = c("#search_results_item_blogs").html();
      this.search_results_item_tags_template = c("#search_results_item_tags").html();
      this.$search_query = c("#search_query");
      this.$search_results_container = c("#search_results_container .scrollable_container");
      this.$tracked_tags = c(".tracked_tags.search_results_section");
      this.tracked_tags_markup = c("<div>").append(this.$tracked_tags.clone()).html()
    }, keyup: _.throttle(function (d) {
      this.lookup()
    }, 300), prepare_search_data: function () {
      this.queries.push(this.search_query);
      return {q: this.search_query_raw, form_key: this.form_key}
    }, get_results: function (d) {
      d = d || function () {
        };
      if (this.cache[this.search_query]) {
        this.results = this.cache[this.search_query];
        d.call(this);
        return
      }
      this.search_in_progress = true;
      this.results = {tags: [], blogs: []};
      this.store_xhr = c.ajax({url: this.endpoint, data: this.prepare_search_data(), dataType: "json", type: "GET"});
      this.store_xhr.done(_.bind(function (e) {
        this.results = e;
        this.add_to_cache(this.search_query, e)
      }, this));
      this.store_xhr.fail(_.bind(function (f, e) {
        if (e === "abort") {
          this.force_hide = true
        }
      }, this));
      this.store_xhr.always(_.bind(function (e) {
        this.search_in_progress = false;
        d.call(this)
      }, this))
    }, lookup: function () {
      var e = c.trim(this.$el.val());
      if (e[0] == "#") {
        e = e.substr(1)
      }
      var f = e.length;
      var d;
      if (f >= this.threshold && e.length) {
        this.search_query = _.escape(e);
        this.search_query_raw = e;
        this.force_hide = false;
        this.get_results(_.bind(function () {
          this.update();
          Tumblr.Events.trigger("SearchPopover:update")
        }, this))
      } else {
        this.reset_popover()
      }
      this.init = false;
      this.init_value = ""
    }, show_tracked_tags: function () {
      if (this.$tracked_tags.children().length > 0) {
        this.$tracked_tags.show()
      } else {
        this.popover.hide()
      }
    }, hide_tracked_tags: function () {
      this.$tracked_tags.hide()
    }, reset_popover: function () {
      if (this.$tracked_tags.children().length > 0) {
        this.$search_results_container.html(this.tracked_tags_markup);
        this.popover.show()
      } else {
        this.popover.hide()
      }
    }, add_to_cache: function (d, e) {
      this.cache[d] = e;
      if (_.size(this.cache) > this.cache_size) {
        delete this.cache[this.queries[0]];
        this.queries.shift()
      }
    }, should_add_query_to_tags: function (d) {
      var e = _.find(d, function (g) {
        var i = g.tag.toLowerCase(), j = this.search_query.toLowerCase(), h = this.search_query_raw.toLowerCase();
        return (i == j || i == h)
      }, this);
      if (!e) {
        var f = {tag: this.search_query, url: "/tagged/" + this.search_query, is_query: true};
        d.unshift(f)
      }
      return d
    }, inject_search_substring: function (d, f) {
      if (!this.search_query) {
        return
      }
      var e = new RegExp(this._escapeRegExp(this.search_query), "gi"), g = this.decorate_search_substring;
      if (!e) {
        return
      }
      _.each(d, function (j, h) {
        if (f == "tag" && !j.is_query) {
          d[h].escaped_tag = d[h].escaped_tag || _.escape(j.tag);
          d[h].hilite_tag = d[h].hilite_tag || j.escaped_tag.replace(e, g)
        }
        if (f == "blog") {
          d[h].hilite_name = d[h].hilite_name || j.name.replace(e, g);
          d[h].hilite_title = d[h].hilite_title || j.title.replace(e, g);
          d[h].hilite_url = d[h].hilite_url || j.url.replace(e, g)
        }
      });
      return d
    }, decorate_search_substring: function (d) {
      return "<u>" + d + "</u>"
    }, _escapeRegExp: function (d) {
      return d.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\~\`\!\@\#]/g, "\\$&")
    }, update: function () {
      if (!_.isObject(this.results)) {
        return
      }
      var f = _.isArray(this.results.tags) ? this.results.tags : [], j = _.isArray(this.results.blogs) ? this.results.blogs : [], h = "", e = false, d = false, g = _.template(this.search_results_template), i;
      f = this.should_add_query_to_tags(f);
      f = this.inject_search_substring(f, "tag");
      j = this.inject_search_substring(j, "blog");
      if (_.size(f)) {
        if (f.length > 5) {
          f = f.slice(0, 5)
        }
        i = {
          results: {
            type: "tag",
            items: f,
            query: this.search_query,
            item_template: this.search_results_item_tags_template,
            blog_search_url: this.base_blog_search_url,
            blog_search_label: this.blog_search_label
          }
        };
        h += g(i)
      }
      if (_.size(j)) {
        g = _.template(this.search_results_template);
        i = {
          results: {
            type: "blog",
            items: j,
            query: this.search_query,
            item_template: this.search_results_item_blogs_template,
            blog_search_url: this.base_blog_search_url,
            blog_search_label: this.blog_search_label
          }
        };
        h += g(i)
      }
      if (h.length && !this.force_hide) {
        this.$search_results_container.empty().prop("innerHTML", h);
        this.popover.show()
      } else {
        this.reset_popover()
      }
    }, abort: function () {
      if (this.store_xhr) {
        this.store_xhr.abort()
      }
    }
  });
  a.AutoCompleteSearch = b
})(jQuery, Tumblr);
/*! scripts/capture.js */
(function (c, b) {
  var a = {};
  a.Base = Backbone.View.extend({
    el: "body", svc_url: "/svc/log/capture", initialize: function () {
      this.form_key = c("#tumblr_form_key").attr("content");
      this.start_time = (b.getRealNow || _.now)();
      this.tracking_data = {};
      c(window).on("beforeunload.capture", _.bind(this.send_data, this))
    }, _get_delta: function () {
      var d = (b.getRealNow || _.now)();
      return d - this.start_time
    }, enable_listeners: function () {
      this.listenTo(Tumblr.Events, "Capture:set", this._set, this);
      this.listenTo(Tumblr.Events, "Capture:push", this._push, this)
    }, _set: function (e, d, f) {
      if (!(e in this.tracking_data)) {
        this.tracking_data[e] = {}
      }
      this.tracking_data[e][d] = f
    }, _push: function (e, d, f) {
      f = f || {};
      if (_.isObject(f)) {
        f.time = this._get_delta()
      }
      if (!(e in this.tracking_data)) {
        this.tracking_data[e] = {}
      }
      if (!(d in this.tracking_data[e]) || !_.isArray(this.tracking_data[e][d])) {
        this.tracking_data[e][d] = []
      }
      this.tracking_data[e][d].push(f)
    }, send_data: function () {
      if (!Tumblr.Flags.bool("enable_capture_js")) {
        return
      }
      if (this.sending_data) {
        return
      }
      if (_.size(this.tracking_data) < 1) {
        return
      }
      this.track_context();
      var d = c.ajax({
        url: this.svc_url,
        type: "POST",
        data: {log: this.tracking_data},
        with_form_key: true,
        async: false
      });
      this.tracking_data = {}
    }, unique_cookie: function () {
      var d = Tumblr.Cookie.get("capture") || this.form_key;
      if (d == this.form_key) {
        Tumblr.Cookie.set("capture", this.form_key)
      }
      return d
    }, track_context: function () {
      this.tracking_data.context = this.tracking_data.context || {};
      this.tracking_data.context.id = this.unique_cookie();
      this.tracking_data.context.language = (window.navigator.userLanguage || window.navigator.language).toLowerCase();
      this.tracking_data.context.path = document.location.pathname
    }
  });
  a.Generic = a.Base.extend({
    initialize: function () {
      a.Base.prototype.initialize.call(this);
      this.enable_listeners();
      Tumblr.Events.trigger("capture:init")
    }, _set_generic_data: function () {
      this.tracking_data._init = this.start_time;
      this.tracking_data._elapsed = this._get_delta()
    }, send_data: function () {
      if (_.size(this.tracking_data) < 1) {
        return
      }
      this._set_generic_data();
      a.Base.prototype.send_data.call(this)
    }
  });
  a.UserActions = a.Base.extend({
    el: "body", mb_sent: {}, premium_action_sent: {}, initialize: function () {
      a.Base.prototype.initialize.call(this);
      this.tracking_data.context = {}
    }, send_moneyball_beacon: function (d, e) {
      Tumblr.Logging.ads.doLogExternal(d.$el.data("serve-id"), e)
    }, get_post_id: function (f, g) {
      g = g || ".post";
      var e = 0, d = f.closest(g);
      if (d.length) {
        e = d.data("post-id")
      }
      return e
    }, track_signup_buttons: function (e) {
      var f = c(e.target), d = f.attr("id").replace("signup_button_", "");
      this.tracking_data.signup_button[d] = 1
    }, track_search: function (f) {
      var d = c(f.target);
      var e = d.serialize();
      this.tracking_data.search = e
    }, track_explore_tag: function (e) {
      var d = c(e.target);
      this.tracking_data.explore = d.text()
    }, track_spotlight_blog: function (f) {
      var d = c(f.target), e = d.find(".tumblelog_name").text();
      this.tracking_data.spotlight = e
    }, track_small_links: function (f) {
      var e = c(f.target), d = e.attr("href");
      if (d == "/explore") {
        this.tracking_data.explore_link = 1
      }
      if (d == "/spotlight") {
        this.tracking_data.spotlight_link = 1
      }
    }, track_post_tags: function (g) {
      var e = c(g.target), f = this.get_post_id(e), d = {post_id: e.text()};
      this.tracking_data.post_tags.push(d)
    }, track_post_info: function (f) {
      var g = c(f.target), d = this.get_post_id(g), e = g.text();
      this.tracking_data.post_info = {post_id: e}
    }, track_post_controls: function (g) {
      var f = c(g.target), d = this.get_post_id(f), e;
      if (f.hasClass("reblog_button")) {
        e = "reblog"
      }
      if (f.hasClass("like_button")) {
        e = "like"
      }
      if (f.hasClass("reblog_count") || f.closest(".reblog_count").length) {
        e = "notes"
      }
      this.tracking_data.post_controls[d] = this.tracking_data.post_controls[d] || [];
      this.tracking_data.post_controls[d][e] = 1
    }, track_post_content: function (h) {
      var f = c(h.target), d = f.closest(".post"), g = this.get_post_id(f), i = d.attr("data-type") || "unknown", e = f[0].outerHTML.replace(/[\n\r]/g, " ").replace(/\>\s+\/</g, "");
      this.tracking_data.post_content[g] = this.tracking_data.post_content[g] || {};
      this.tracking_data.post_content[g].post_type = i;
      this.tracking_data.post_content[g].clicks = this.tracking_data.post_content[g].clicks || [];
      this.tracking_data.post_content[g].clicks.push(e)
    }, track_j_k_keys: function (e) {
      var d = e.keyCode;
      if ((d == 74 || d == 75) && !c("body").hasClass("show_form")) {
        this.tracking_data.keycommands = 1
      }
    }, track_auto_pager: function (d) {
      this.page_number = this.page_number || 1;
      this.tracking_data.auto_pager = this.page_number;
      this.page_number++
    }, track_recommendations: function (h) {
      var f = c(h.target);
      var e = f.closest(".ht_post").data("id"), g = (f.hasClass("hello_tag")) ? "tag" : "thumbnail", d = f.attr("href");
      this.tracking_data.recommendations.push({post_id: e, type: g, url: d})
    }, track_related_tag: function (e) {
      var d = c(e.target), f = false;
      if (!d.hasClass(".tag")) {
        d = d.closest(".tag")
      }
      f = c.trim(d.text());
      if (f && f.length) {
        this.tracking_data.related_tags.push(f)
      }
    }, track_related_blog: function (f) {
      var d = c(f.target), e = false;
      if (!d.hasClass(".blog")) {
        d = d.closest(".blog")
      }
      e = d.data("tumblelog");
      if (e && e.length) {
        this.tracking_data.related_blogs.push(e)
      }
    }, track_tag_source: function () {
      if (c("body").hasClass("sassafras")) {
        this.tracking_data.tag_source = "sassafras"
      } else {
        this.tracking_data.tag_source = "default"
      }
    }
  });
  a.OnboardingDash = a.UserActions.extend({
    events: {
      "submit #search_form": "track_search",
      "click .signup_buttons .chrome": "track_signup_buttons",
      "click .tracked_tag .tag": "track_explore_tag",
      "click #tag_editors .blog": "track_spotlight_blog",
      "click .post .tag": "track_post_tags",
      "click .post_info a": "track_post_info",
      "click .post_controls a": "track_post_controls",
      "click .post_content > *": "track_post_content",
      "click #right_column .small_links a": "track_small_links",
      keydown: "track_j_k_keys"
    }, initialize: function () {
      a.UserActions.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture/logged_out_dashboard";
      this.tracking_data.signup_button = {};
      this.tracking_data.search = "";
      this.tracking_data.explore = "";
      this.tracking_data.explore_link = 0;
      this.tracking_data.spotlight = "";
      this.tracking_data.spotlight_link = 0;
      this.tracking_data.post_tags = [];
      this.tracking_data.post_info = {};
      this.tracking_data.post_controls = {};
      this.tracking_data.post_content = {};
      this.tracking_data.keycommands = 0;
      this.tracking_data.auto_pager = 0;
      this.track_auto_pager();
      if (window.AfterAutoPaginationQueue) {
        window.AfterAutoPaginationQueue.push(_.bind(this.track_auto_pager, this))
      }
      this.source_page = "onboarding_dash"
    }
  });
  a.OnboardingTags = a.OnboardingDash.extend({
    events: _.extend({"click #related_tags .tag": "track_related_tag"}, a.OnboardingDash.prototype.events),
    initialize: function () {
      a.OnboardingDash.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture/logged_out_tags";
      this.tracking_data.related_tags = [];
      this.track_tag_source();
      this.source_page = "onboarding_tags"
    }
  });
  a.HelloDash = a.UserActions.extend({
    el: "body",
    events: {
      "submit #search_form": "track_search",
      "click .signup_buttons .chrome": "track_signup_buttons",
      "click .ht_post .hello_tag": "track_post_tags",
      "click .ht_post .go": "track_go_lightbox",
      keydown: "track_j_k_keys"
    },
    track_post_tags: function (g) {
      var e = c(g.target), f = this.get_post_id(e, ".ht_post"), d = {};
      d[f] = e.text();
      this.tracking_data.post_tags.push(d)
    },
    track_go_lightbox: function (f) {
      var e = c(f.target);
      var d = this.get_post_id(e, ".ht_post");
      this.tracking_data.go_lightbox.push(d)
    },
    has_zoom_effect: function () {
      return (c('.ht_post[data-effect="grow"]').length || c(".ht_post").data("grow"))
    },
    track_post_zoom_effect: function () {
      if (this.has_zoom_effect) {
        this.tracking_data.has_zoom = 1
      }
    },
    initialize: function () {
      a.UserActions.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture/hello_dash";
      this.tracking_data.signup_button = {};
      this.tracking_data.search = "";
      this.tracking_data.post_tags = [];
      this.tracking_data.go_lightbox = [];
      this.tracking_data.has_zoom = 0;
      this.track_post_zoom_effect();
      this.source_page = "hello_dash"
    }
  });
  a.HelloLightbox = a.UserActions.extend({
    events: {
      "click .post .tag": "track_post_tags",
      "click .post_info a": "track_post_info",
      "click .post_controls a": "track_post_controls",
      "click .post_content > *": "track_post_content",
      "click .recommendations a": "track_recommendations",
      keydown: "track_j_k_keys"
    }, initialize: function () {
      a.UserActions.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture/hello_lightbox";
      this.tracking_data.post_tags = [];
      this.tracking_data.post_info = {};
      this.tracking_data.post_controls = {};
      this.tracking_data.post_content = {};
      this.tracking_data.keycommands = 0;
      this.tracking_data.auto_pager = 0;
      this.tracking_data.recommendations = [];
      this.track_auto_pager();
      if (window.AfterAutoPaginationQueue) {
        window.AfterAutoPaginationQueue.push(_.bind(this.track_auto_pager, this))
      }
      this.source_page = "hello_lightbox"
    }
  });
  a.Radar = a.UserActions.extend({
    el: "#tumblr_radar",
    events: {
      "click .radar_content a": "track_radar_content",
      "click .radar_controls a": "track_radar_controls",
      "click .radar_footer a": "track_radar_footer"
    },
    initialize: function () {
      a.UserActions.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture_radar";
      this.init_tracking_data()
    },
    init_tracking_data: function () {
      this.tracking_data.radar_id = {};
      this.tracking_data.radar_content = [];
      this.tracking_data.radar_controls = {};
      this.tracking_data.radar_footer = 0
    },
    send_data: function () {
      if (!this.tracking_data.radar_id.post_id) {
        return
      }
      a.UserActions.prototype.send_data.call(this);
      this.init_tracking_data()
    },
    track_radar_id: function () {
      if (this.tracking_data.radar_id.post_id) {
        return
      }
      this.tracking_data.radar_id = {tumblelog: this.$el.data("tumblelog-name"), post_id: this.$el.data("post-id")}
    },
    track_follow: function (e) {
      var d = e ? "follow" : "unfollow";
      this.tracking_data.radar_controls[d] = 1 + (this.tracking_data.radar_controls[d] || 0);
      this.track_radar_id();
      if (e) {
        a.UserActions.prototype.send_moneyball_beacon(this, d)
      }
    },
    track_like: function (d) {
      var e = d ? "like" : "unlike";
      this.tracking_data.radar_controls[e] = 1 + (this.tracking_data.radar_controls[e] || 0);
      this.track_radar_id();
      if (d) {
        a.UserActions.prototype.send_moneyball_beacon(this, e)
      }
    },
    track_reblog: function (e, d) {
      var f = "reblog";
      this.tracking_data.radar_controls[f] = 1 + (this.tracking_data.radar_controls[f] || 0);
      this.track_radar_id();
      a.UserActions.prototype.send_moneyball_beacon(this, f)
    },
    track_fast_reblog: function (e, d) {
      var f = "reblog";
      this.tracking_data.radar_controls[f] = 1 + (this.tracking_data.radar_controls[f] || 0);
      this.track_radar_id();
      a.UserActions.prototype.send_moneyball_beacon(this, f)
    },
    track_notes: function (e, d) {
      var f = "notes";
      this.tracking_data.radar_controls[f] = 1 + (this.tracking_data.radar_controls[f] || 0);
      this.track_radar_id();
      a.UserActions.prototype.send_moneyball_beacon(this, f)
    },
    track_radar_content: function (f) {
      var e = c(f.target);
      e = (e.is("a")) ? e : e.closest("a");
      var d = e.attr("href");
      this.tracking_data.radar_content.push({clicked: d});
      this.track_radar_id();
      a.UserActions.prototype.send_moneyball_beacon(this, "photo")
    },
    track_avatar: function (e, d) {
      var f = "avatar";
      this.tracking_data.radar_controls[f] = 1 + (this.tracking_data.radar_controls[f] || 0);
      this.track_radar_id();
      a.UserActions.prototype.send_moneyball_beacon(this, f)
    },
    track_radar_controls: function (g) {
      var f = c(g.target);
      f = (f.is("a")) ? f : f.closest("a");
      var h = false;
      if (f.hasClass("reblog") && !g.altKey) {
        h = "reblog"
      } else {
        if (f.hasClass("note_link_current")) {
          h = "notes"
        }
      }
      if (h === false) {
        return
      }
      if (h == "reblog") {
        var d = this;
        var e = function (i) {
          d.track_reblog(c(i.target), i);
          d.track_radar_id();
          c("body").off("click.capturejs")
        };
        c("body").on("click.capturejs", "#create_post > button, .post-composer_save [data-js-clickablesave]", e)
      } else {
        this["track_" + h](f, g);
        this.track_radar_id()
      }
    },
    track_radar_footer: function (d) {
      if (!c(d.currentTarget).hasClass("follow")) {
        this.tracking_data.radar_footer = 1;
        this.track_radar_id();
        a.UserActions.prototype.send_moneyball_beacon(this, "posts")
      }
    }
  });
  a.WebInStream = a.UserActions.extend({
    el: ".sponsored_post",
    events: {
      "click .post_controls .post_control": "track_sponsored_controls",
      "click .post_permalink": "track_sponsored_controls",
      "click .post_avatar a": "track_sponsored_controls",
      "click .post_info .post_info_fence": "track_sponsored_controls",
      "click .post_info .reblog_follow_button": "track_sponsored_controls",
      "click .sponsored_wrapper .post_header_follow": "track_blue_follow",
      "click .post_tags a.post_tag": "track_sponsored_controls",
      "click .post_media_photo": "track_photo",
      "click .photoset_photo": "track_photo",
      "click .post_body img": "track_photo",
      "click .post_notes_label": "track_sponsored_controls",
      "click .post_body a:not(.read_more)": "track_sponsored_controls",
      "click .link-button": "track_click_thru"
    },
    initialize: function () {
      if (this.initialized) {
        return
      }
      a.UserActions.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture_web_instream";
      this.init_tracking_data();
      this.control_names = {
        post_avatar_link: "avatar",
        post_tag: "tags",
        post_permalink: "permalink",
        reblog: "reblog",
        post_notes_label: "notes",
        share_email: "share",
        share_facebook: "share",
        share_twitter: "share",
        share_permalink: "share",
        post_media_photo: "photo",
        photoset_photo: "photo",
        post_media: "photo",
        post_body: "post_body"
      };
      this.initialized = true
    },
    init_tracking_data: function () {
      this.tracking_data.sponsored_id = {};
      this.tracking_data.sponsored_controls = {};
      this.tracking_data.sponsored_content = [];
      this.tracking_data.sponsored_tags = [];
      this.tracking_data.is_moneyball = (this.$el.data("mb-click-url")) ? 1 : 0
    },
    send_data: function () {
      if (!this.tracking_data.sponsored_id.post_id) {
        return
      }
      if (!this.$el.hasClass("sponsored_post")) {
        return
      }
      a.UserActions.prototype.send_data.call(this);
      this.init_tracking_data()
    },
    track_sponsored_id: function () {
      if (this.tracking_data.sponsored_id.post_id) {
        return
      }
      this.tracking_data.sponsored_id = {
        tumblelog: this.$el.data("tumblelog-name"),
        post_id: this.$el.data("post-id"),
        placement_id: this.$el.data("placement_id")
      }
    },
    track_follow: function (e) {
      var d = e ? "follow" : "unfollow";
      this.tracking_data.sponsored_controls[d] = 1 + (this.tracking_data.sponsored_controls[d] || 0);
      this.track_sponsored_id();
      if (e) {
        a.UserActions.prototype.send_moneyball_beacon(this, d)
      }
    },
    track_blue_follow: function () {
      var d = "follow";
      this.tracking_data.sponsored_controls[d] = 1 + (this.tracking_data.sponsored_controls[d] || 0);
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, d)
    },
    track_like: function (d) {
      var e = d ? "like" : "unlike";
      this.tracking_data.sponsored_controls[e] = 1 + (this.tracking_data.sponsored_controls[e] || 0);
      this.track_sponsored_id();
      if (d) {
        a.UserActions.prototype.send_moneyball_beacon(this, e)
      }
    },
    track_reblog: function (e, d) {
      var f = "reblog";
      this.tracking_data.sponsored_controls[f] = 1 + (this.tracking_data.sponsored_controls[f] || 0);
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, f)
    },
    track_fast_reblog: function () {
      var d = "reblog";
      this.tracking_data.sponsored_controls[d] = 1 + (this.tracking_data.sponsored_controls[d] || 0);
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, d)
    },
    track_notes: function () {
      var d = "notes";
      this.tracking_data.sponsored_controls[d] = 1 + (this.tracking_data.sponsored_controls[d] || 0);
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, d)
    },
    track_click_thru: function () {
      var d = "click_thru";
      this.tracking_data.sponsored_controls[d] = 1 + (this.tracking_data.sponsored_controls[d] || 0);
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, d)
    },
    track_share: function () {
      var d = "share";
      this.tracking_data.sponsored_controls[d] = 1 + (this.tracking_data.sponsored_controls[d] || 0);
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, d)
    },
    track_photo: function () {
      var d = "photo";
      this.tracking_data.sponsored_controls[d] = 1 + (this.tracking_data.sponsored_controls[d] || 0);
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, d)
    },
    track_caption: function () {
      var d = "caption";
      this.tracking_data.sponsored_controls[d] = 1 + (this.tracking_data.sponsored_controls[d] || 0);
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, d)
    },
    track_sponsored_content: function (e) {
      var d = c(e.target);
      d = (d.is("a")) ? d : d.closest("a");
      this.tracking_data.sponsored_content.push({clicked: d.attr("href")});
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, "sponsored_controls_click")
    },
    track_sponsored_controls: function (g) {
      var f = (c(g.target).className) ? c(g.target) : c(g.currentTarget);
      if (f.hasClass("share_social_button")) {
        if (g.target != g.currentTarget) {
          f = c(g.target).parent()
        }
      }
      var i = null;
      if (f.parent().hasClass("source_url")) {
        i = "source_url"
      } else {
        if (f.parent().hasClass("post_info") && !f.hasClass("reblog_follow_button") && !f.hasClass("post_header_follow")) {
          i = "posts"
        } else {
          if (f.parents(".post_body").length != 0) {
            i = "caption"
          } else {
            for (var h in this.control_names) {
              if (f.hasClass(h)) {
                i = this.control_names[h];
                break
              }
            }
          }
        }
      }
      if (!i) {
        return
      }
      if (i == "reblog") {
        var d = this;
        var e = function (j) {
          d.track_reblog(c(j.target), j);
          d.track_sponsored_id();
          c("body").off("click.capturejs")
        };
        c("body").on("click.capturejs", "#create_post > button, .post-composer_save [data-js-clickablesave]", e)
      } else {
        if (this["track_" + i] && this["track_" + i].call) {
          this["track_" + i](f, g);
          this.track_sponsored_id()
        } else {
          this.tracking_data.sponsored_controls[i] = 1 + (this.tracking_data.sponsored_controls[i] || 0);
          this.track_sponsored_id();
          a.UserActions.prototype.send_moneyball_beacon(this, i)
        }
      }
    },
    force_track_sponsored_controls: function (d) {
      this.tracking_data.sponsored_controls[d] = 1 + (this.tracking_data.sponsored_controls[d] || 0);
      this.track_sponsored_id();
      a.UserActions.prototype.send_moneyball_beacon(this, d)
    }
  });
  a.PremiumRadar = a.Radar.extend({
    el: "#tumblr_radar.premium", events: function () {
      return _.extend({}, a.Radar.prototype.events, {
        "mouseenter .radar_content a": "track_radar_hover",
        "mouseleave .radar_content a": "track_radar_hover"
      })
    }, initialize: function () {
      a.Radar.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture_premium_radar";
      this.tracking_data.is_moneyball = (this.$el.data("mb-click-url")) ? 1 : 0;
      _.bindAll(this, "track_radar_loaded");
      c(window).load(this.track_radar_loaded);
      this.track_radar_visibility();
      _.bindAll(this, "track_radar_visibility");
      c(window).scroll(this.track_radar_visibility)
    }, track_radar_id: function () {
      if (this.tracking_data.radar_id.post_id) {
        return
      }
      this.tracking_data.radar_id = {
        tumblelog: this.$el.data("tumblelog-name"),
        post_id: this.$el.data("post-id"),
        placement_id: this.$el.data("placement_id")
      }
    }, get_radar_args: function (d) {
      var f = [this.$el.data("tumblelog-name"), this.$el.data("post-id")];
      for (var e = 0; e < arguments.length; e++) {
        f.push(arguments[e])
      }
      return f
    }, track_follow: function (d) {
      a.Radar.prototype.track_follow.call(this, d)
    }, track_like: function (d) {
      a.Radar.prototype.track_like.call(this, d)
    }, track_reblog: function (e, d) {
      a.Radar.prototype.track_reblog.call(this, e, d)
    }, track_radar_content: function (d) {
      a.Radar.prototype.track_radar_content.call(this, d)
    }, track_radar_hover: function (d) {
    }, track_radar_loaded: function (d) {
    }, track_radar_visibility: function (d) {
    }, elInView: function (f) {
      var h = f.offsetTop;
      var g = f.offsetLeft;
      var e = f.offsetWidth;
      var d = f.offsetHeight;
      while (f.offsetParent) {
        f = f.offsetParent;
        h += f.offsetTop;
        g += f.offsetLeft
      }
      return (h < (window.pageYOffset + window.innerHeight) && g < (window.pageXOffset + window.innerWidth) && (h + d) > window.pageYOffset && (g + e) > window.pageXOffset)
    }, track_radar_footer: function (d) {
      a.Radar.prototype.track_radar_footer.call(this, d)
    }, track_radar_badge: function (d) {
      this.tracking_data.radar_badge = 1;
      this.track_radar_id()
    }, force_track_radar_controls: function (d) {
      this.tracking_data.radar_controls[d] = 1 + (this.tracking_data.radar_controls[d] || 0);
      this.track_radar_id();
      a.UserActions.prototype.send_moneyball_beacon(this, d)
    }
  });
  a.SearchPopover = a.UserActions.extend({
    el: ".l-header",
    events: {
      "mousedown .tracked_tags .result_link": "track_tracked_tag_click",
      "mousedown .tag .result_title": "track_tag_click",
      "mousedown .blog .result_link": "track_blog_click",
      "mousedown .blog .more_results_link": "track_blog_click",
      "keydown #popover_search": "keyup"
    },
    initialize: function () {
      a.UserActions.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture_search";
      this.$search_field = this.$el.find("#search_query");
      this.$search_popover = this.$el.find("#popover_search");
      this.tracking_data.query = 0;
      this.tracking_data.tag = 0;
      this.tracking_data.blog = 0;
      this.tracking_data.search_tag = 0;
      this.tracking_data.search_blog = 0;
      this.tracking_data.tracked_tag = 0
    },
    send_data: function () {
      if (this.tracking_data.tracked_tag === 0 && this.tracking_data.query === 0) {
        return
      }
      a.UserActions.prototype.send_data.call(this)
    },
    get_query_name: function () {
      return c.trim(this.$search_field.val())
    },
    get_tag_name: function (d) {
      return c.trim(d.text()).replace("#", "")
    },
    get_tumblelog_name: function (d) {
      return (d) ? d.attr("data-tumblelog-name") : ""
    },
    track_query: function (d) {
      this.tracking_data.query = ((this.get_query_name().length) ? 1 : 0)
    },
    track_tag: function (d) {
      if (d.closest(".result.is_query").length) {
        this.tracking_data.search_tag++
      } else {
        this.tracking_data.tag++
      }
      this.track_query()
    },
    track_blog: function (d) {
      if (d.hasClass("more_results_link")) {
        this.tracking_data.search_blog++
      } else {
        this.tracking_data.blog++
      }
      this.track_query()
    },
    track_tag_click: function (e) {
      var d = c(e.currentTarget);
      this.track_tag(d)
    },
    track_tracked_tag_click: function (e) {
      var d = c(e.currentTarget);
      this.track_tracked_tag(d)
    },
    track_tracked_tag: function (d) {
      this.tracking_data.tracked_tag++;
      this.track_query()
    },
    track_blog_click: function (e) {
      var d = c(e.currentTarget);
      this.track_blog(d)
    },
    track_submit: function (d) {
      this.track_query()
    },
    keyup: function (e) {
      if (e.keyCode == 13) {
        var d = c(document.activeElement);
        if (d.closest(".tag").length) {
          this.track_tag(d)
        }
        if (d.closest(".tracked_tags").length) {
          this.track_tracked_tag(d)
        }
        if (d.closest(".blog").length) {
          this.track_blog(d)
        }
      }
    }
  });
  a.CrushClick = a.UserActions.extend({
    el: "#crushes",
    events: {"mousedown .crush": "track_crush_click"},
    initialize: function () {
      a.UserActions.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture_crush";
      this.tracking_data.crush_clicks = []
    },
    track_crush_click: function (e) {
      var d = c(e.currentTarget);
      this.tracking_data.crush_clicks.push({
        click_time: Math.round(Date.now() / 1000),
        tumblelog_name: d.data("tumblelog-name"),
        position: d.attr("id").split("_")[1],
        love: d.data("love")
      })
    }
  });
  a.TumblelogClick = a.UserActions.extend({
    el: '[href^="http"][href*=".tumblr"]:not([href*="://tumblr"]):not([href*="://www.tumblr"]):not([href*=".media.tumblr"])',
    events: {mousedown: "track_click"},
    initialize: function () {
      a.UserActions.prototype.initialize.call(this);
      this.svc_url = "/svc/log/capture_tumblelog_click";
      this.tracking_data.page = c(location).attr("href");
      this.tracking_data.tumblelog_clickthrough = {}
    },
    track_click: function (f) {
      var d = c(f.currentTarget), e = c.trim(d.closest("[class]").prop("className"));
      this.tracking_data.tumblelog_clickthrough[e] = 1 + (this.tracking_data.tumblelog_clickthrough[e] || 0)
    }
  });
  b.Capture = a;
  c(function (d) {
    Tumblr.CaptureGeneric = new Tumblr.Capture.Generic();
    Tumblr.Flags("tumblelog_clickthrough")(function () {
      Tumblr.CaptureTumblelogClick = new Tumblr.Capture.TumblelogClick()
    }, false)
  })
})(jQuery, Tumblr);
/*! scripts/sponsored_posts.js */
(function (c, d, a) {
  var b = d.View.extend({
    initialize: function (e) {
      this.div = document.createElement("div");
      this.isScrollEnabled = false;
      this.transform = (this.check_support("transform") || this.check_support("webkitTransform") || this.check_support("MozTransform") || this.check_support("msTransform") || this.check_support("OTransform"));
      this.div = null;
      if (!this.transform) {
        return
      }
      this.rings = c();
      if (Tumblr.AutoPaginator) {
        Tumblr.AutoPaginator.on("after", c.proxy(this.on_autopaginator_after, this))
      }
      this.check_for_rings()
    }, check_support: function (e) {
      if (e in this.div.style) {
        return e
      }
      return false
    }, check_for_rings: function () {
      this.rings = this.rings.add(".sponsored_badge_icon .ring, .recommendation-reason-footer .icon_explore");
      if (!this.isScrollEnabled && this.rings.length > 0) {
        this.isScrollEnabled = true;
        Tumblr.Events.on("DOMEventor:flatscroll", this.on_window_scroll, this)
      }
    }, on_autopaginator_after: function () {
      this.check_for_rings()
    }, on_window_scroll: function (h) {
      var e = h.windowScrollTop;
      for (var g = 0, f = this.rings.length; g < f; g++) {
        this.rings[g].style[this.transform] = "rotate(" + e + "deg)"
      }
    }
  });
  c(function () {
    a.SponsoredPosts = new b()
  })
})(jQuery, Backbone, Tumblr);
/*! scripts/vendor/gif-js/gif.js */
(function (f) {
  function e(a, i) {
    if ({}.hasOwnProperty.call(e.cache, a)) {
      return e.cache[a]
    }
    var h = e.resolve(a);
    if (!h) {
      throw new Error("Failed to resolve module " + a)
    }
    var j = {id: a, require: e, filename: a, exports: {}, loaded: !1, parent: i, children: []};
    i && i.children.push(j);
    var g = a.slice(0, a.lastIndexOf("/") + 1);
    return e.cache[a] = j.exports, h.call(j.exports, j, j.exports, g, a), j.loaded = !0, e.cache[a] = j.exports
  }

  e.modules = {}, e.cache = {}, e.resolve = function (a) {
    return {}.hasOwnProperty.call(e.modules, a) ? e.modules[a] : void 0
  }, e.define = function (a, g) {
    e.modules[a] = g
  };
  var d = function (b) {
    return b = "/", {
      title: "browser",
      version: "v0.10.5",
      browser: !0,
      env: {},
      argv: [],
      nextTick: f.setImmediate || function (c) {
        setTimeout(c, 0)
      },
      cwd: function () {
        return b
      },
      chdir: function (a) {
        b = a
      }
    }
  }();
  e.define("/gif.coffee", function (t, a, l, m) {
    function s(g, c) {
      return {}.hasOwnProperty.call(g, c)
    }

    function o(i, g) {
      for (var h = 0, j = g.length; h < j; ++h) {
        if (h in g && g[h] === i) {
          return !0
        }
      }
      return !1
    }

    function n(g, c) {
      function h() {
        this.constructor = g
      }

      for (var i in c) {
        s(c, i) && (g[i] = c[i])
      }
      return h.prototype = c.prototype, g.prototype = new h, g.__super__ = c.prototype, g
    }

    var q, r, p;
    r = e("events", t).EventEmitter, q = e("/browser.coffee", t), p = function (h, c, i) {
      function g(j) {
        var b, k;
        this.running = !1, this.options = {}, this.frames = [], this.freeWorkers = [], this.activeWorkers = [], this.setOptions(j);
        for (b in c) {
          k = c[b], null != this.options[b] ? this.options[b] : this.options[b] = k
        }
      }

      return n(g, h), c = {
        workerScript: "gif.worker.js",
        workers: 2,
        repeat: 0,
        background: "#fff",
        quality: 10,
        width: null,
        height: null
      }, i = {delay: 500, copy: !1}, g.prototype.setOption = function (k, j) {
        return this.options[k] = j, null != this._canvas && (k === "width" || k === "height") ? this._canvas[k] = j : void 0
      }, g.prototype.setOptions = function (b) {
        return function (u) {
          var j, k;
          for (j in b) {
            if (!s(b, j)) {
              continue
            }
            k = b[j], u.push(this.setOption(j, k))
          }
          return u
        }.call(this, [])
      }, g.prototype.addFrame = function (j, v) {
        var k, u;
        null == v && (v = {}), k = {};
        for (u in i) {
          k[u] = v[u] || i[u]
        }
        if ("undefined" !== typeof CanvasRenderingContext2D && null != CanvasRenderingContext2D && j instanceof CanvasRenderingContext2D || "undefined" !== typeof WebGLRenderingContext && null != WebGLRenderingContext && j instanceof WebGLRenderingContext) {
          v.copy ? k.data = this.getContextData(j) : k.context = j
        } else {
          if (null != j.childNodes) {
            null != this.options.width || this.setOption("width", j.width), null != this.options.height || this.setOption("height", j.height), v.copy ? k.data = this.getImageData(j) : k.image = j
          } else {
            throw new Error("Invalid image")
          }
        }
        return this.frames.push(k), null != k.width && this.setOption("width", k.width), null != k.height ? this.setOption("height", k.height) : void 0
      }, g.prototype.render = function () {
        var u, k;
        if (this.running) {
          throw new Error("Already running")
        }
        this.running = !0, this.nextFrame = 0, this.finishedFrames = 0, this.imageParts = function (w) {
          var y;
          for (var x = 0, z = function () {
            var A, A;
            A = [];
            for (var B = 0; 0 <= this.frames.length ? B < this.frames.length : B > this.frames.length; 0 <= this.frames.length ? ++B : --B) {
              A.push(B)
            }
            return A
          }.apply(this, arguments).length; x < z; ++x) {
            y = function () {
              var A, A;
              A = [];
              for (var B = 0; 0 <= this.frames.length ? B < this.frames.length : B > this.frames.length; 0 <= this.frames.length ? ++B : --B) {
                A.push(B)
              }
              return A
            }.apply(this, arguments)[x], w.push(null)
          }
          return w
        }.call(this, []), k = this.spawnWorkers();
        for (var j = 0, v = function () {
          var x, x;
          x = [];
          for (var w = 0; 0 <= k ? w < k : w > k; 0 <= k ? ++w : --w) {
            x.push(w)
          }
          return x
        }.apply(this, arguments).length; j < v; ++j) {
          u = function () {
            var x, x;
            x = [];
            for (var w = 0; 0 <= k ? w < k : w > k; 0 <= k ? ++w : --w) {
              x.push(w)
            }
            return x
          }.apply(this, arguments)[j], this.renderNextFrame()
        }
        return this.emit("start"), this.emit("progress", 0)
      }, g.prototype.abort = function () {
        var b;
        while (!0) {
          if (b = this.activeWorkers.shift(), !(null != b)) {
            break
          }
          console.log("killing active worker"), b.terminate()
        }
        return this.running = !1, this.emit("abort")
      }, g.prototype.spawnWorkers = function () {
        var u, k, j;
        k = Math.min(this.options.workers, this.frames.length);
        for (var w = 0, v = function () {
          var y, y;
          y = [];
          for (var x = this.freeWorkers.length; this.freeWorkers.length <= k ? x < k : x > k; this.freeWorkers.length <= k ? ++x : --x) {
            y.push(x)
          }
          return y
        }.apply(this, arguments).length; w < v; ++w) {
          u = function () {
            var y, y;
            y = [];
            for (var x = this.freeWorkers.length; this.freeWorkers.length <= k ? x < k : x > k; this.freeWorkers.length <= k ? ++x : --x) {
              y.push(x)
            }
            return y
          }.apply(this, arguments)[w], (j = this, function (x) {
            var b, y;
            return console.log("spawning worker " + x), y = new Worker(j.options.workerScript), b = j, y.onmessage = function (z) {
              return b.activeWorkers.splice(b.activeWorkers.indexOf(y), 1), b.freeWorkers.push(y), b.frameFinished(z.data)
            }, j.freeWorkers.push(y)
          })()
        }
        return k
      }, g.prototype.frameFinished = function (b) {
        return console.log("frame " + b.index + " finished - " + this.activeWorkers.length + " active"), this.finishedFrames++, this.emit("progress", this.finishedFrames / this.frames.length), this.imageParts[b.index] = b, o(null, this.imageParts) ? this.renderNextFrame() : this.finishRendering()
      }, g.prototype.finishRendering = function () {
        var C, G, w, u, F, D, z;
        F = 0;
        for (var B = 0, x = this.imageParts.length; B < x; ++B) {
          G = this.imageParts[B], F += (G.data.length - 1) * G.pageSize + G.cursor
        }
        F += G.pageSize - G.cursor, console.log("rendering finished - filesize " + Math.round(F / 1000) + "kb"), C = new Uint8Array(F), D = 0;
        for (var A = 0, v = this.imageParts.length; A < v; ++A) {
          G = this.imageParts[A];
          for (var E = 0, y = G.data.length; E < y; ++E) {
            z = G.data[E], w = E, C.set(z, D), w === G.data.length - 1 ? D += G.cursor : D += G.pageSize
          }
        }
        return u = new Blob([C], {type: "image/gif"}), this.emit("finished", u, C)
      }, g.prototype.renderNextFrame = function () {
        var u, k, j;
        if (this.freeWorkers.length === 0) {
          throw new Error("No free workers")
        }
        return this.nextFrame >= this.frames.length ? void 0 : (u = this.frames[this.nextFrame++], j = this.freeWorkers.shift(), k = this.getTask(u), console.log("starting frame " + (k.index + 1) + " of " + this.frames.length), this.activeWorkers.push(j), j.postMessage(k))
      }, g.prototype.getContextData = function (b) {
        return b.getImageData(0, 0, this.options.width, this.options.height).data
      }, g.prototype.getImageData = function (j) {
        var k;
        return null != this._canvas || (this._canvas = document.createElement("canvas"), this._canvas.width = this.options.width, this._canvas.height = this.options.height), k = this._canvas.getContext("2d"), k.setFill = this.options.background, k.fillRect(0, 0, this.options.width, this.options.height), k.drawImage(j, 0, 0), this.getContextData(k)
      }, g.prototype.getTask = function (k) {
        var u, j;
        if (u = this.frames.indexOf(k), j = {
            index: u,
            last: u === this.frames.length - 1,
            delay: k.delay,
            width: this.options.width,
            height: this.options.height,
            quality: this.options.quality,
            repeat: this.options.repeat,
            canTransfer: q.name === "chrome"
          }, null != k.data) {
          j.data = k.data
        } else {
          if (null != k.context) {
            j.data = this.getContextData(k.context)
          } else {
            if (null != k.image) {
              j.data = this.getImageData(k.image)
            } else {
              throw new Error("Invalid frame")
            }
          }
        }
        return j
      }, g
    }(r), t.exports = p
  }), e.define("/browser.coffee", function (m, l, k, j) {
    var r, o, n, p, q;
    p = navigator.userAgent.toLowerCase(), n = navigator.platform.toLowerCase(), q = p.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, "unknown", 0], o = q[1] === "ie" && document.documentMode, r = {
      name: q[1] === "version" ? q[3] : q[1],
      version: o || parseFloat(q[1] === "opera" && q[4] ? q[4] : q[2]),
      platform: {name: p.match(/ip(?:ad|od|hone)/) ? "ios" : (p.match(/(?:webos|android)/) || n.match(/mac|win|linux/) || ["other"])[0]}
    }, r[r.name] = !0, r[r.name + parseInt(r.version, 10)] = !0, r.platform[r.platform.name] = !0, m.exports = r
  }), e.define("events", function (k, l, j, i) {
    d.EventEmitter || (d.EventEmitter = function () {
    });
    var b = l.EventEmitter = d.EventEmitter, n = typeof Array.isArray === "function" ? Array.isArray : function (c) {
      return Object.prototype.toString.call(c) === "[object Array]"
    }, m = 10;
    b.prototype.setMaxListeners = function (c) {
      this._events || (this._events = {}), this._events.maxListeners = c
    }, b.prototype.emit = function (p) {
      if (p === "error" && (!(this._events && this._events.error) || n(this._events.error) && !this._events.error.length)) {
        throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.")
      }
      if (!this._events) {
        return !1
      }
      var h = this._events[p];
      if (!h) {
        return !1
      }
      if (!(typeof h == "function")) {
        if (n(h)) {
          var c = Array.prototype.slice.call(arguments, 1), q = h.slice();
          for (var r = 0, o = q.length; r < o; r++) {
            q[r].apply(this, c)
          }
          return !0
        } else {
          return !1
        }
      }
      switch (arguments.length) {
        case 1:
          h.call(this);
          break;
        case 2:
          h.call(this, arguments[1]);
          break;
        case 3:
          h.call(this, arguments[1], arguments[2]);
          break;
        default:
          var c = Array.prototype.slice.call(arguments, 1);
          h.apply(this, c)
      }
      return !0
    }, b.prototype.addListener = function (g, c) {
      if ("function" !== typeof c) {
        throw new Error("addListener only takes instances of Function")
      }
      if (this._events || (this._events = {}), this.emit("newListener", g, c), !this._events[g]) {
        this._events[g] = c
      } else {
        if (n(this._events[g])) {
          if (!this._events[g].warned) {
            var h;
            this._events.maxListeners !== undefined ? h = this._events.maxListeners : h = m, h && h > 0 && this._events[g].length > h && (this._events[g].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[g].length), console.trace())
          }
          this._events[g].push(c)
        } else {
          this._events[g] = [this._events[g], c]
        }
      }
      return this
    }, b.prototype.on = b.prototype.addListener, b.prototype.once = function (g, p) {
      var h = this;
      return h.on(g, function o() {
        h.removeListener(g, o), p.apply(this, arguments)
      }), this
    }, b.prototype.removeListener = function (g, o) {
      if ("function" !== typeof o) {
        throw new Error("removeListener only takes instances of Function")
      }
      if (!(this._events && this._events[g])) {
        return this
      }
      var c = this._events[g];
      if (n(c)) {
        var h = c.indexOf(o);
        if (h < 0) {
          return this
        }
        c.splice(h, 1), c.length == 0 && delete this._events[g]
      } else {
        this._events[g] === o && delete this._events[g]
      }
      return this
    }, b.prototype.removeAllListeners = function (c) {
      return c && this._events && this._events[c] && (this._events[c] = null), this
    }, b.prototype.listeners = function (c) {
      return this._events || (this._events = {}), this._events[c] || (this._events[c] = []), n(this._events[c]) || (this._events[c] = [this._events[c]]), this._events[c]
    }
  }), f.GIF = e("/gif.coffee")
}.call(this, this));
/*! scripts/tumblr/binary_switch.js */
(function (c, b) {
  var a = Backbone.View.extend({
    el: ".binary_switcher",
    className: "binary_switch",
    defaults: {additionalClassNames: ""},
    initialize: function (d) {
      this.options = d || {};
      this.options = _.extend(this.defaults, this.options || {})
    },
    render: function () {
      _.each(this.$el.not("[data-binary-switch-init]"), _.bind(function (e) {
        var d = c(e);
        d.attr("data-binary-switch-init", true);
        d.wrap(c("<label>").addClass(this.className).addClass(this.options.additionalClassNames));
        d.after(c("<span>", {"class": this.className + "_button"}));
        d.after(c("<span>", {"class": this.className + "_track"}))
      }, this));
      return this
    }
  });
  b.BinarySwitch = a
})(jQuery, Tumblr);
/*! scripts/ghostlist.js */
(function (r, e, s) {
  function p(t) {
    return (t !== null && t !== undefined) ? (("length" in t) ? t : [t]) : []
  }

  function c(t) {
    if (t && typeof t.then === "function") {
      return t
    } else {
      if (typeof t === "function") {
        return function () {
          return c(t.apply(this, arguments))
        }
      } else {
        return e.Deferred()[t === false ? "reject" : "resolve"](t).promise()
      }
    }
  }

  function i(t, u) {
    return r.compact(r.map(p(u), function (v) {
      return n(t, v)
    }))
  }

  function n(t, v) {
    var u;
    return (u = v.parentNode) ? ((u !== t) ? n(t, u) : v) : false
  }

  var b = (function () {
    var w = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    function v(y) {
      return (y.nodeName === "IMG") ? [y] : r.toArray(y.getElementsByTagName("img"))
    }

    function u(y) {
      var z = y.src;
      if (z && z !== w) {
        y.src = w;
        return {img: y, src: z}
      }
    }

    function t(y) {
      return (y.img.src = y.src, y.img)
    }

    return function x(y) {
      var z = r.chain(p(y)).map(v).flatten().map(u).compact().value();
      return (z.length) ? r.partial(r.map, z, t) : r.noop
    }
  })();
  var g = (function () {
    var v = "about:blank";

    function w(y) {
      return (y.nodeName === "IFRAME") ? [y] : r.toArray(y.getElementsByTagName("iframe"))
    }

    function u(y) {
      var z = y.src;
      if (z && z !== v) {
        y.src = v;
        return {iframe: y, src: z}
      }
    }

    function t(y) {
      return (y.iframe.src = y.src, y.iframe)
    }

    return function x(y) {
      var z = r.chain(p(y)).map(w).flatten().map(u).compact().value();
      return (z.length) ? r.partial(r.map, z, t) : r.noop
    }
  })();
  var m = (function () {
    function v(x) {
      var w = r.toArray(x.querySelectorAll("[data-background-image]"));
      x.getAttribute("data-background-image") && w.push(x);
      return w
    }

    function u(x) {
      var w = x.getAttribute("data-background-image");
      if (w) {
        x.style.backgroundImage = "url(" + w + ")";
        x.removeAttribute("data-background-image");
        return x
      }
    }

    return function t(w) {
      return r.chain(p(w)).map(v).flatten().map(u).compact().value()
    }
  })();

  function a(w, u) {
    var v = u.options.onBeforeAttach;
    var t = u.options.onAfterAttach;
    return r.map(w, function (y) {
      var z = e.data(y);
      if (z.exclude) {
        return y
      }
      if (!z.reattach) {
        return y
      }
      v.call(u, y, z).then(function x() {
        z.reattach();
        z.reattach = null;
        t.call(u, y, z)
      })
    })
  }

  function o(v, t) {
    var u = t.options.onViewable;
    r.each(v, function (w) {
      var x = e.data(w);
      if (x.exclude) {
        return
      }
      if (x.promise && x.promise.state && x.promise.state() === "pending") {
        return w
      }
      u.call(t, w, x, m)
    })
  }

  function k(x, u) {
    var w = u.options.styles;
    var t = u.options.onBeforeDetach;
    var v = u.options.onAfterDetach;
    return r.chain(x).map(function (z) {
      var A = e.data(z);
      if (A.exclude) {
        return z
      }
      if (A.promise && A.promise.state && A.promise.state() === "pending") {
        return z
      }
      (A.promise = t.call(u, z, A)).then(function B(C) {
        A.reattach = f(z, w, (C === "hide"));
        A.promise = null;
        v.call(u, z, A)
      }, function y() {
        A.promise = null
      });
      return z
    }).tap(function () {
      x = null
    }).value()
  }

  function j(t, v) {
    try {
      t.removeChild(v)
    } catch (u) {
    }
  }

  function f(u, B, y) {
    var v = r.toArray(u.children);
    var x = (function () {
      var C = r.pick(u.style, r.keys(B));
      r.extend(u.style, B, {height: e(u).height() + "px", width: e(u).width() + "px"});
      return function () {
        r.extend(u.style, C, {height: "", width: ""})
      }
    })();
    var A = r.map(v, y ? function (D) {
      var C = D.style.display;
      D.style.display = "none";
      return function () {
        D.style.display = C;
        return D
      }
    } : function (C) {
      j(u, C);
      return function () {
        u.appendChild(C);
        return C
      }
    });
    var t = b(v);
    var w = function () {
      if (y) {
        return r.noop
      } else {
        return g(v)
      }
    };
    v = null;
    B = null;
    return function z() {
      t();
      w();
      x();
      r.each(A, function (C) {
        C()
      })
    }
  }

  function q(B, u, C, z) {
    var v = [];
    var x = false;
    var y = 0;
    var t;
    var A;
    var w = u.length;
    while (y < w) {
      t = u[y++];
      A = t.getBoundingClientRect();
      if (t.nodeType !== 1) {
        continue
      }
      if (!(A.bottom < C || A.top > z)) {
        if (!x) {
          x = (A.top > C)
        }
        v.push(t)
      } else {
        if (x) {
          break
        }
      }
    }
    return v
  }

  function h(B, u, C, y) {
    var v = [];
    var x = (B.windowScrollY / B.documentHeight);
    (x >= 0) || (x = 0);
    (x <= 1) || (x = 1);
    var z = Math.floor(u.length * x);
    var w;
    var t;
    var A;
    w = z;
    while ((w >= 0) && (t = u[w--]) && (A = t.getBoundingClientRect()) && (C < A.bottom)) {
      if (t.nodeType !== 1) {
        continue
      }
      if (A.top < y) {
        v.push(t)
      }
    }
    w = z + 1;
    while ((t = u[w++]) && (A = t.getBoundingClientRect()) && (A.top < y)) {
      if (t.nodeType !== 1) {
        continue
      }
      if (C < A.bottom) {
        v.push(t)
      }
    }
    return v
  }

  function d(y, A) {
    var B = -(A.windowHeight * y.options.PAGES_ABOVE);
    var x = A.windowHeight + (A.windowHeight * y.options.PAGES_BELOW);
    var t = y.container.children;
    var u;
    if (y.options.nonlinear) {
      u = q(A, t, B, x)
    } else {
      u = h(A, t, B, x)
    }
    var z = r.difference(y.attached, u);
    if (z.length) {
      k(z, y)
    }
    var w = r.intersection(u, y.detached);
    if (w.length) {
      a(w, y)
    }
    var v = r.difference(u, y.attached);
    if (v.length) {
      o(v, y)
    }
    y.detached = r.without.apply(null, [y.detached].concat(w)).concat(z);
    y.attached = u
  }

  function l(v) {
    var t = e(v.container).get(0);
    if (!t) {
      throw"GhostList: Bad container form."
    }
    var u = r.bind(d, null, this);
    var w = r.debounce(r.bind(d, null, this), 500);
    if (v.eventor) {
      v.eventor.on("DOMEventor:flatscroll", u);
      v.eventor.on("DOMEventor:flatresize", w)
    } else {
      throw"GhostList depends on DOMEventor"
    }
    this.container = t;
    this.attached = [];
    this.detached = [];
    this.options = {
      styles: v.styles || {},
      onBeforeDetach: c(v.onBeforeDetach || r.noop),
      onAfterDetach: v.onAfterDetach || r.noop,
      onBeforeAttach: c(v.onBeforeAttach || r.noop),
      onAfterAttach: v.onAfterAttach || r.noop,
      onViewable: v.onViewable || r.noop,
      PAGES_ABOVE: (v.pages && v.pages[0] !== undefined) ? v.pages[0] : 1,
      PAGES_BELOW: (v.pages && v.pages[1] !== undefined) ? v.pages[1] : 1,
      nonlinear: v.nonlinear,
      eventor: v.eventor,
      boundOnScroll: u,
      boundOnResize: w
    };
    if (r.isFunction(v.initialize)) {
      v.initialize.call(this)
    }
  }

  l.prototype = {
    exclude: function (t) {
      return r.map(i(this.container, t), function (u) {
        return (e.data(u, "exclude", true), u)
      })
    }, unexclude: function (t) {
      return r.map(i(this.container, t), function (u) {
        return (e.data(u, "exclude", false), u)
      })
    }, clean: function () {
    }, destroy: function () {
      a(this.detached, this);
      this.remove()
    }, remove: function () {
      if (this.options.boundOnScroll) {
        this.options.eventor.off("DOMEventor:flatscroll", this.options.boundOnScroll);
        this.options.boundOnScroll = null
      }
      if (this.options.boundOnResize) {
        this.options.eventor.off("DOMEventor:flatresize", this.options.boundOnResize);
        this.options.boundOnResize = null
      }
    }, relayout: function () {
    }
  };
  s.GhostList = l
})(_, jQuery, Tumblr);
/*! scripts/fast_dashboard.js */
(function (b, c, a) {
  Tumblr.Flags("fast_dashboard")(function () {
    var e = function () {
      return function (h) {
        var g = c(h);
        var f = g.children(".post").first();
        var i = f.data("tumblelog-name");
        if (i) {
          d[i] = true;
          g.data("tumblelog-name", i)
        }
        if (f.hasClass("is_audio")) {
          return "hide"
        }
        if (f.hasClass("is_video")) {
          return false
        }
        if (g.hasClass("remnant_ad")) {
          return "hide"
        }
        if (g.hasClass("yamplus-unit-container")) {
          return "hide"
        }
        return !f.hasClass("is_persistent")
      }
    };
    var d = {};
    Tumblr.Events.on("tumblelog:unfollow", function (f) {
      if (d[f.name]) {
        d[f.name] = false
      }
    });
    Tumblr.Events.on("tumblelog:follow", function (f) {
      d[f.name] = true
    });
    c(function () {
      a.fastDashboard = new Tumblr.GhostList({
        container: "#posts",
        pages: [1, 2],
        eventor: Tumblr.Events,
        styles: {backgroundColor: "#ffffff", borderRadius: "3px"},
        initialize: function () {
          this.exclude(this.container.querySelector("#new_post_buttons"));
          this.exclude(this.container.querySelector("#tumblr_radar.premium"));
          this.exclude(this.container.querySelector(".post.sponsored_post"));
          this.exclude(this.container.querySelector(".yamplus-unit-container"));
          this.exclude(this.container.querySelector(".post.pt"));
          this.exclude(this.container.querySelector(".takeover-container"))
        },
        onBeforeDetach: e(),
        onAfterDetach: function () {
        },
        onBeforeAttach: function (h, g, j) {
          var f = c(h);
          var i = f.data("tumblelog-name");
          if (i && !d[i]) {
            f.data("reattach", function () {
            });
            f.remove()
          }
        },
        onAfterAttach: function () {
        }
      })
    })
  })
})(_, jQuery, Tumblr);
/*! scripts/application/keycommands.js */
(function (b, a) {
  var c = Backbone.View.extend({
    el: "body",
    post_types: ["text", "photo", "quote", "link", "chat", "audio", "video"],
    suspended: false,
    suspended_exceptions: [],
    last_key_code: 0,
    mouseout_id: null,
    events: {
      keydown: "keydown",
      keyup: "keyup",
      "click .post_tab_switching .tab_post_type": "click_tab_switch",
      "mouseover .post_tab_switching .tab_post_type": "mouseover_tab_switch",
      "mouseout .post_tab_switching .tab_post_type": "mouseout_tab_switch",
    },
    click_tab_switch: function (d) {
      this.post_keys({toggle: "stop"})
    },
    mouseover_tab_switch: function (d) {
      window.clearTimeout(this.mouseout_id);
      this.post_keys({toggle: "start", pos: d.currentTarget.attributes["data-index"].value})
    },
    mouseout_tab_switch: function (d) {
      this.mouseout_id = window.setTimeout(_.bind(function () {
        this.post_keys({toggle: "clear"})
      }, this), 250)
    },
    initialize: function () {
      this.logged_in = (!b(document.body).hasClass("logged_out"));
      this.auto_paginate = Tumblr.auto_paginate || false;
      this.animate_scroll = (Tumblr.animate_scroll !== undefined) ? Tumblr.animate_scroll : false;
      this.scroll_speed = 100;
      var d = 15;
      var e = b(".l-header-container");
      if (e.length) {
        this.scroll_offset = e.position().top + e.height() + d
      } else {
        this.scroll_offset = d
      }
      this.pressed_keys = [];
      this.current_post = null;
      if (!Tumblr.enable_dashboard_key_commands) {
        this.suspend()
      }
      this.blog_switcher_detection();
      this.is_xbox = Tumblr.Flags.bool("is_xbox");
      if (this.is_xbox) {
        this.animate_scroll = false
      }
      if (Tumblr.Events) {
        this.listenTo(Tumblr.Events, "keycommands:suspend", this.suspend);
        this.listenTo(Tumblr.Events, "keycommands:resume", this.resume);
        this.listenTo(Tumblr.Events, "fastCompose:create", this.create_new)
      }
    },
    suspend: function (d) {
      this.suspended = true;
      this.suspended_exceptions = d || []
    },
    resume: function () {
      this.suspended = false;
      this.suspended_exceptions = []
    },
    left: function () {
      if (!this.auto_paginate && !b("#tumblr_lightbox").length) {
        var d = b("#previous_page_link").attr("href");
        if (d) {
          location.href = d
        }
      }
    },
    right: function () {
      if (!this.auto_paginate && !b("#tumblr_lightbox").length) {
        var d = b("#next_page_link").attr("href");
        if (d) {
          location.href = d
        }
      }
    },
    next: function (d) {
      if (d > (this.current_position + 2) && (d < this.go_to_position || !this.go_to_position)) {
        Tumblr.Popover.hide_all();
        this.go_to_position = d
      }
    },
    previous: function (d) {
      if (d < (this.current_position - 2) && d > this.go_to_position) {
        Tumblr.Popover.hide_all();
        this.go_to_position = d
      }
    },
    check_offset: function (d) {
      return (Math.abs(d - this.current_position) < 2)
    },
    update_post_positions: function () {
      var d = {};
      b("#posts [data-pageable]").each(function (f, g) {
        var e = b(g);
        var h = e.data("pageable") || _.uniqueId("pageable_");
        d[h] = e.offset().top
      });
      this.post_positions = d
    },
    get_parse_params: function (d) {
      var e = window.location.pathname.split("/");
      e.shift();
      if (e[0] === "tagged") {
        return "/new/" + d + "?post[tags]=" + e[1]
      } else {
        return "/new/" + d
      }
    },
    create_new: function (i) {
      var g = i.type;
      if (typeof Tumblr.PostForms === "object") {
        var d = b("#new_post_label_" + g);
        var f = d.length ? d.attr("href") : this.get_parse_params(g);
        var h = Tumblr.PostForms.endpoints_to_types[g];
        var j = Tumblr.PostForms.parse_url_params(f);
        j.detached = true;
        j.loggingData = i.loggingData;
        Tumblr.PostForms.create({type: h, attach_to: "body", detached: true, mode: "index"}, j)
      } else {
        document.location.href = "/new/" + g;
        this.suspend()
      }
    },
    like: function (e) {
      var d = b("#" + e);
      var f = d.find(".post_control.like");
      var g = d.data("post-id");
      if (f.length && g) {
        Tumblr.Events.trigger("post:like", g, "keyboard")
      }
    },
    notes: function (f) {
      var e = b("#" + f);
      var d = e.find(".post_notes_label");
      if (d.length < 1 || d.find(".note_link_current").text() === "") {
        return
      }
      var g = d.offset().top - 500, h;
      if (e.find(".post_notes .popover").length > 0 && g > e.offset().top) {
        b("html,body").animate({scrollTop: g}, 200, function () {
          if (!h) {
            d.trigger("click")
          }
          h = true
        })
      } else {
        d.trigger("click")
      }
    },
    reblog: function (e) {
      var d = b("#" + e);
      var f = d.find(".post_control.reblog");
      if (f.length) {
        f.trigger("click")
      }
    },
    follow: function (e) {
      var d = b("#" + e);
      var f = d.find(".post_header_button.follow");
      if (f.length) {
        f.trigger("click")
      }
    },
    dock: function (e) {
      var d = b("#" + e);
      var h = d.find(".dock_video_button.dock");
      if (h.length) {
        h.trigger("click")
      } else {
        var f = b(".docked");
        var g = f.find(".dock_video_button.undock");
        if (g.length) {
          g.trigger("click")
        }
      }
    },
    dismiss: function (f) {
      var d = b('[data-pageable="' + f + '"]');
      var e = d.find('[data-post-action="remove"]');
      if (e.length) {
        e.trigger("click")
      }
    },
    elevate: function () {
      var d = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      if (d >= 1500) {
        b("html, body").stop(true).animate({scrollTop: 0}, "slow")
      }
    },
    play: function (g, i) {
      var d = b("#" + g), h = d.data("type");
      if (h == "video") {
        var f = d.find("iframe.tumblr_video_iframe");
        var j = d.find(".retro_video_preview");
        if (f.length > 0) {
          f[0].contentWindow.postMessage("toggle", f.attr("data-origin"));
          f[0].contentWindow.focus()
        } else {
          if (j.length > 0) {
            b(".big_play_button", j).click();
            i.preventDefault()
          }
        }
      }
    },
    fast_reblog: function (f, g, e) {
      var h = b("#tumblr_form_key").attr("content"), d = b("#" + f), i = d.find(".post_control.reblog:not(.reblogged)");
      if (i.length && this.check_offset(g) && !i.data("reblogged")) {
        Tumblr.Events.trigger("post:fastreblog", b("#" + f).data("post-id"), e);
        i.data("reblogged", true)
      }
    },
    show_plexi: function () {
      if (Tumblr.Plexi.findByToken("body-plexi")) {
        this.body_plexi = Tumblr.Plexi.findByToken("body-plexi")
      }
      if (!this.body_plexi) {
        this.body_plexi = new Tumblr.Plexi({token: "body-plexi"});
        this.body_plexi.create(document.body, {insertAt: "top", cssClass: "color"})
      }
      this.body_plexi.show({transition_class: "fast"})
    },
    hide_plexi: function () {
      if (Tumblr.Plexi.findByToken("body-plexi")) {
        this.body_plexi = Tumblr.Plexi.findByToken("body-plexi")
      }
      if (this.body_plexi) {
        this.body_plexi.hide()
      }
    },
    post_keys: function (g) {
      g.toggle = g.toggle || null;
      g.shift = g.shift || null;
      g.pos = g.pos || null;
      if (this.tab_switching) {
        return
      }
      var e = b("#post_tab_switching");
      if (!e.length) {
        return
      }
      var f = e.find(".tab_post_type");
      if (g.toggle == "cancel") {
        if (!this.creating_new) {
          this.hide_plexi()
        }
        this.creating_new = false;
        e.removeClass("active");
        clearTimeout(this.show_timeout);
        clearTimeout(this.fade_timeout);
        this.cancel_timeout = setTimeout(function () {
          e.addClass("inactive undimmed")
        }, 50);
        this.post_keying = false;
        this.post_tab_index = undefined;
        return
      }
      if (g.toggle == "clear") {
        this.post_tab_index = undefined;
        f.removeClass("selected loading")
      }
      if (g.toggle == "stop") {
        var d = null;
        if (this.post_tab_index !== undefined) {
          d = this.post_types[this.post_tab_index]
        }
        this.post_tab_index = undefined;
        if (d) {
          this.creating_new = true;
          this.create_new({type: d})
        } else {
          this.hide_plexi()
        }
        this.post_keys({toggle: "cancel"});
        return
      }
      if (g.toggle == "init") {
        this.show_plexi();
        clearTimeout(this.cancel_timeout);
        clearTimeout(this.fade_timeout);
        setTimeout(_.bind(function () {
          f.removeClass("selected loading");
          e.removeClass("inactive");
          e.addClass("active");
          this.post_keys({toggle: "start"})
        }, this), 50);
        this.post_keying = true;
        return
      }
      if (g.toggle == "start") {
        clearTimeout(this.show_timeout);
        if (g.pos && (g.pos - 1 == this.post_tab_index)) {
          return
        }
        setTimeout(_.bind(function () {
          e.removeClass("undimmed");
          f.removeClass("selected loading");
          if (this.post_tab_index === undefined) {
            this.post_tab_index = g.pos ? g.pos - 1 : 0
          } else {
            this.post_tab_index = g.pos ? g.pos - 1 : (this.post_tab_index + ((g.shift) ? -1 : 1));
            if (this.post_tab_index >= 7) {
              this.post_tab_index = 0
            }
            if (this.post_tab_index < 0) {
              this.post_tab_index = 6
            }
          }
          e.addClass("active");
          this.tab_current_post_type = f.eq(this.post_tab_index);
          this.tab_current_post_type.addClass("selected")
        }, this), 1);
        return
      }
    },
    blog_switcher: function (h) {
      h.toggle = h.toggle || null;
      h.shift = h.shift || null;
      if (this.post_keying) {
        return
      }
      this.tab_switching = (h.toggle.length) ? true : false;
      var e = b("#tab_switching");
      if (!e.length) {
        return
      }
      var g = e.find(".tab_blog");
      g.removeClass("selected loading");
      if (h.toggle == "cancel") {
        this.tab_switching = false;
        this.tab_index = undefined;
        this.hide_plexi();
        e.removeClass("active");
        setTimeout(function () {
          e.addClass("inactive")
        }, 500);
        return
      }
      if (h.toggle == "stop") {
        this.tab_index = undefined;
        var d = this.tab_current_blog.find("a.blog_name").attr("href");
        if (!document.location.href.match(d)) {
          this.tab_current_blog.addClass("loading");
          var f = new Spinner(Tumblr.spinners.white).spin();
          this.tab_current_blog.append(f.el);
          document.location.href = d;
          this.suspend();
          b(window).on("keydown", function () {
            return false
          })
        } else {
          this.blog_switcher({toggle: "cancel"})
        }
        return
      }
      if (h.toggle == "start") {
        e.removeClass("inactive");
        this.show_plexi();
        setTimeout(_.bind(function () {
          if (this.tab_index === undefined) {
            this.tab_index = 1
          } else {
            this.tab_index = this.tab_index + ((h.shift) ? -1 : 1);
            if (this.tab_index >= g.length) {
              this.tab_index = 0
            }
            if (this.tab_index < 0) {
              this.tab_index = g.length - 1
            }
          }
          e.addClass("active");
          this.tab_current_blog = g.eq(this.tab_index);
          this.tab_current_blog.addClass("selected")
        }, this), 50);
        return
      }
    },
    blog_switcher_detection: function () {
      if (window.devicePixelRatio) {
        if (escape(navigator.javaEnabled.toString()) == "function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D") {
          b("html").addClass("tab_switcher_chrome")
        } else {
          if (escape(navigator.javaEnabled.toString()) != "function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D") {
            b("html").addClass("tab_switcher_safari")
          }
        }
      }
    },
    match_modifier_keys: function (h, d) {
      if (typeof d == "string") {
        d = [d]
      }
      var f = {
        shift: _.indexOf(d, "shift") > -1,
        ctrl: _.indexOf(d, "ctrl") > -1,
        alt: _.indexOf(d, "alt") > -1,
        meta: _.indexOf(d, "meta") > -1
      };
      var g = {shift: h.shiftKey, ctrl: h.ctrlKey, alt: h.altKey, meta: h.metaKey};
      return _.isEqual(f, g)
    },
    keydown: function (m) {
      var f = m.charCode ? m.charCode : m.keyCode;
      if (this.suspended && _.indexOf(this.suspended_exceptions, f) < 0) {
        return
      }
      if (this.animating) {
        return
      }
      var g = b(m ? m.target : window.event.srcElement);
      if (g.is("input:focus") || g.is("textarea:focus") || g.is(".result_link:focus") || g.is("[contenteditable=true]")) {
        return
      }
      this.update_post_positions();
      this.current_position = (window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop) + this.scroll_offset;
      this.go_to_position = 0;
      var o = (m.shiftKey || m.ctrlKey || m.altKey || m.metaKey), l;
      this.pressed_keys[f] = 1;
      if ((this.post_keying || this.tab_switching) && !(m.ctrlKey || m.altKey || m.metaKey)) {
        var k = [74, 75, 190, 76, 78, 82, 32, 38, 40, 33, 34, 35, 36];
        if (_.indexOf(k, f) >= 0) {
          return false
        }
      }
      if (f == 37) {
        this.left()
      } else {
        if (f == 39) {
          this.right()
        } else {
          if (!o) {
            for (l in this.post_positions) {
              var j = l, n = this.post_positions[l], d = b;
              if (f == 74) {
                this.next(n);
                Tumblr.Events.trigger("keycommands:jk")
              }
              if (f == 75) {
                this.previous(n);
                Tumblr.Events.trigger("keycommands:jk")
              }
              if (this.is_xbox && f == 40) {
                this.next(n);
                m.preventDefault()
              }
              if (this.is_xbox && f == 38) {
                this.previous(n);
                m.preventDefault()
              }
              if (f == 190) {
                this.elevate();
                m.preventDefault();
                return false
              }
              if (this.check_offset(n)) {
                this.current_post = b('[data-pageable="' + j + '"]');
                if (f == 76) {
                  this.like(j);
                  Tumblr.Events.trigger("keycommands:like")
                }
                if (f == 78) {
                  this.notes(j);
                  Tumblr.Events.trigger("keycommands:notes")
                }
                if (f == 82) {
                  this.reblog(j);
                  Tumblr.Events.trigger("keycommands:reblog")
                }
                if (f == 70) {
                  this.follow(j);
                  Tumblr.Events.trigger("keycommands:follow")
                }
                if (f == 68) {
                  this.dock(j);
                  Tumblr.Events.trigger("keycommands:dock")
                }
                if (f == 13 && !this.post_keying) {
                  if (Tumblr.Flags.bool("indash_blogs")) {
                    var h = this.current_post.find(".post_avatar_link, .blog_name");
                    h.first().trigger("click");
                    Tumblr.Events.trigger("keycommands:peepr")
                  }
                }
                if (f == 32) {
                  this.play(j, m);
                  if (this.current_post.length) {
                    if (this.current_post.attr("data-type") == "video" && this.current_post.attr("data-direct-video")) {
                      return false
                    }
                  }
                  return true
                }
                if (f == 88) {
                  this.dismiss(j);
                  Tumblr.Events.trigger("keycommands:dismiss")
                }
              }
            }
            if (f == 74 && !this.go_to_position) {
              this.go_to_position = b(document).height()
            }
            if (this.animate_scroll) {
              if (this.go_to_position && !this.animating) {
                this.animating = true;
                b("html,body").stop().animate({scrollTop: this.go_to_position - this.scroll_offset}, this.scroll_speed, _.bind(function () {
                  this.animating = false
                }, this))
              }
            } else {
              if (this.go_to_position) {
                window.scrollTo(0, this.go_to_position - this.scroll_offset)
              }
            }
          }
        }
      }
      if (navigator.platform == "MacIntel") {
        if (m.altKey && f == 9) {
          if (!this.tab_switching) {
            Tumblr.Events.trigger("keycommands:blog_switching")
          }
          this.blog_switcher({toggle: "start", shift: m.shiftKey});
          return false
        }
        if (m.altKey && f == 192) {
          this.blog_switcher({toggle: "start", shift: true});
          return false
        }
        if (m.altKey && f == 27 && this.tab_switching) {
          this.blog_switcher({toggle: "cancel"});
          return false
        }
        if (m.altKey && f == 37 && this.tab_switching) {
          this.blog_switcher({toggle: "start", shift: true});
          return false
        }
        if (m.altKey && f == 39 && this.tab_switching) {
          this.blog_switcher({toggle: "start"});
          return false
        }
        if (m.altKey && f == 82 && this.logged_in) {
          for (l in this.post_positions) {
            this.fast_reblog(l, this.post_positions[l])
          }
          Tumblr.Events.trigger("keycommands:fast_reblog");
          return false
        }
        if (m.altKey && f == 69 && this.logged_in) {
          for (l in this.post_positions) {
            this.fast_reblog(l, this.post_positions[l], true)
          }
          Tumblr.Events.trigger("keycommands:fast_reblog_queue");
          return false
        }
      }
      if (navigator.platform == "Win32") {
        if (this.pressed_keys[90] && this.pressed_keys[9]) {
          if (!this.tab_switching) {
            Tumblr.Events.trigger("keycommands:blog_switching")
          }
          this.blog_switcher({toggle: "start", shift: m.shiftKey});
          return false
        }
        if (this.pressed_keys[90] && this.pressed_keys[27] && this.tab_switching) {
          this.blog_switcher({toggle: "cancel"});
          return false
        }
        if (this.pressed_keys[90] && this.pressed_keys[192]) {
          this.blog_switcher({toggle: "start", shift: true});
          return false
        }
        if (this.pressed_keys[90] && this.pressed_keys[37] && this.tab_switching) {
          this.blog_switcher({toggle: "start", shift: true});
          return false
        }
        if (this.pressed_keys[90] && this.pressed_keys[39] && this.tab_switching) {
          this.blog_switcher({toggle: "start"});
          return false
        }
        if (m.shiftKey && f == 82 && this.logged_in) {
          for (l in this.post_positions) {
            this.fast_reblog(l, this.post_positions[l])
          }
          Tumblr.Events.trigger("keycommands:fast_reblog");
          return false
        }
        if (m.shiftKey && f == 69 && this.logged_in) {
          for (l in this.post_positions) {
            this.fast_reblog(l, this.post_positions[l], true)
          }
          Tumblr.Events.trigger("keycommands:fast_reblog_queue");
          return false
        }
      }
    },
    keyup: function (g) {
      var f = g.charCode ? g.charCode : g.keyCode, d = (g.shiftKey || g.ctrlKey || g.altKey || g.metaKey);
      this.pressed_keys[f] = 0;
      if (navigator.platform == "MacIntel") {
        if (!g.altKey && this.tab_switching) {
          this.blog_switcher({toggle: "stop"});
          return false
        }
      }
      if (navigator.platform == "Win32") {
        if (!this.pressed_keys[90] && this.tab_switching) {
          this.blog_switcher({toggle: "stop"});
          return false
        }
      }
    }
  });
  a.KeyCommandsConstructor = c
})(jQuery, Tumblr);
/*! scripts/color_utilities.js */
(function (c, b, a) {
  var d = {
    rgb_to_hex: function (h, f, e) {
      return "#" + ((1 << 24) + (h << 16) + (f << 8) + e).toString(16).slice(1)
    }, hex_to_rgb: function (f) {
      f = new String(f).replace(/[^0-9a-f]/gi, "");
      if (f.length < 6) {
        f = f[0] + f[0] + f[1] + f[1] + f[2] + f[2]
      }
      var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);
      return e ? {r: parseInt(e[1], 16), g: parseInt(e[2], 16), b: parseInt(e[3], 16)} : null
    }, rgb_to_hsv: function (l, k, f) {
      var j = Math.min(Math.min(l, k), f);
      var e = Math.max(Math.max(l, k), f);
      var h = e - j;
      var i = {h: 6, s: e ? ((e - j) / e) : 0, v: (e / 255)};
      if (!h) {
        i.h = 0
      } else {
        if (e === l) {
          i.h += (k - f) / h
        } else {
          if (e === k) {
            i.h += 2 + (f - l) / h
          } else {
            i.h += 4 + (l - k) / h
          }
        }
      }
      i.h = (60 * i.h) % 360;
      return i
    }, hsv_to_rgb: function (j, q, p) {
      var e, k, n;
      if (!q) {
        e = k = n = p
      } else {
        e = k = n = 0;
        var i = ((j + 360) % 360) / 60;
        var l = p * q;
        var f = p - l;
        var o = l * (1 - Math.abs(i % 2 - 1));
        if (i < 1) {
          e = l;
          k = o
        } else {
          if (i < 2) {
            e = o;
            k = l
          } else {
            if (i < 3) {
              k = l;
              n = o
            } else {
              if (i < 4) {
                k = o;
                n = l
              } else {
                if (i < 5) {
                  n = l;
                  e = o
                } else {
                  n = o;
                  e = l
                }
              }
            }
          }
        }
        e += f;
        k += f;
        n += f
      }
      return {r: Math.round(255 * e), g: Math.round(255 * k), b: Math.round(255 * n)}
    }, hex_to_hsv: function (g) {
      g = new String(g).replace(/[^0-9a-f]/gi, "");
      if (g.length < 6) {
        g = g[0] + g[0] + g[1] + g[1] + g[2] + g[2]
      }
      var f = a.ColorUtilities.hex_to_rgb(g);
      var e = a.ColorUtilities.rgb_to_hsv.apply(a.ColorUtilities, b.toArray(f));
      return e
    }, hsv_to_hex: function (i, g, e) {
      var f = a.ColorUtilities.hsv_to_rgb(i, g, e);
      var j = a.ColorUtilities.rgb_to_hex.apply(a.ColorUtilities, b.toArray(f));
      return j
    }, hex_brightness: function (i, q) {
      i = String(i).replace(/[^0-9a-f]/gi, "");
      if (i.length < 6) {
        i = i[0] + i[0] + i[1] + i[1] + i[2] + i[2]
      }
      q = q || 0;
      var o = parseInt(i, 16), j = (q < 0) ? 0 : 255, f = (q < 0) ? -(q) : q, e = o >> 16, m = o >> 8 & 255, s = o & 255, n, k, h;
      n = Math.round((j - e) * f) + e;
      k = Math.round((j - m) * f) + m;
      h = Math.round((j - s) * f) + s;
      return "#" + (16777216 + n * 65536 + k * 256 + h).toString(16).slice(1)
    }, hsv_to_readable: function (e) {
      if (typeof e === "string") {
        e = a.ColorUtilities.hex_to_hsv(e)
      }
      return (e.s < 0.2 && e.v > 0.8) ? "#444" : "#FFF"
    }, compare_colors: function (k, i, o) {
      var g = {upper_bound: 0.8, lower_bound: 0.2, diff_bound: 0.1, hue_bound: 15};
      b.extend(g, o);
      var j = g.upper_bound;
      var n = g.lower_bound;
      var m = g.diff_bound;
      var e = g.hue_bound;
      var h = Math.abs(k.h - i.h);
      var f = Math.abs(k.s - i.s);
      var l = Math.abs(k.v - i.v);
      if (h <= m && f <= m && l <= m) {
        return true
      } else {
        if (f <= m && l <= m) {
          if (f >= j || f <= n && l >= j || l <= n && h <= e) {
            return true
          }
        }
      }
      return false
    }
  };
  a.ColorUtilities = d
})(jQuery, _, Tumblr);
/*! scripts/color_editor/views/_palette.js */
Tumblr.ColorEditor || (Tumblr.ColorEditor = {});
(function (c, b, e, a) {
  var d = e.View.extend({
    className: "color_palette",
    defaults: {colors: [], current_color: false, current_page: 0, on_change: c.noop},
    events: {
      "click .swatch": "__color_click",
      "click .pagination a.dot": "__pagination_click",
      "click .pagination a.next": "__pagination_next_click",
      "click .pagination a.previous": "__pagination_previous_click"
    },
    __color_click: function (g) {
      g.preventDefault();
      var f = c(g.currentTarget);
      if (f.hasClass("selected")) {
        return
      }
      this.$(".swatch.selected").removeClass("selected");
      f.addClass("selected");
      this.update_color(f.data("color"))
    },
    __pagination_click: function (g) {
      g.preventDefault();
      var f = c(g.currentTarget);
      if (f.hasClass("selected")) {
        return
      }
      this.current_page = f.data("page");
      this.render(true)
    },
    __pagination_next_click: function (f) {
      f.preventDefault();
      if (!c(f.currentTarget).hasClass("disabled") && this.current_page < this.page_count - 1) {
        this.current_page++;
        this.render(true)
      }
    },
    __pagination_previous_click: function (f) {
      f.preventDefault();
      if (!c(f.currentTarget).hasClass("disabled") && this.current_page > 0) {
        this.current_page--;
        this.render(true)
      }
    },
    initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.colors = this.options.colors;
      this.current_color = this.options.current_color;
      this.current_page = this.options.current_page;
      this.page_count = this.colors.length
    },
    render: function (f) {
      this.$el.html(this.template({
        colors: this.colors[this.current_page],
        current_color: this.current_color,
        page: this.current_page,
        page_color: this.colors[this.current_page][4],
        page_count: this.page_count
      }));
      this.$el.toggleClass("paginating", f || false);
      return this
    },
    update_color: function (f) {
      this.current_color = f;
      this.options.on_change(this.current_color)
    },
    template: b.template('            <%                var previous_arrow_class = "arrow previous icon_arrow_carrot_left";                previous_arrow_class += (page === 0) ? " disabled" : "";                var next_arrow_class = "arrow next icon_arrow_carrot_right";                next_arrow_class += (page === page_count - 1) ? " disabled" : "";            %>            <% _.each(colors, function(color) { %>                <a class="swatch<% if(color === current_color){ print(" selected") } %>" data-color="<%= color %>" style="background-color:<%= color %>"><span class="inner_border"></span></a>            <% }); %>            <% if(page_count > 1) { %>                <div class="pagination">                    <a class="<%= previous_arrow_class %>"></a>                    <% for(var i=0; i<page_count; i++) { %>                        <% if(i === page) { %>                            <a class="dot selected" data-page="<%= i %>" style="background-color:<%= page_color %>"></a>                        <% } else { %>                            <a class="dot" data-page="<%= i %>"></a>                        <% } %>                    <% } %>                    <a class="<%= next_arrow_class %>"></a>                </div>            <% } %>        ')
  });
  a.Palette = d
})(jQuery, _, Backbone, Tumblr.ColorEditor);
/*! scripts/color_editor/views/_picker.js */
Tumblr.ColorEditor || (Tumblr.ColorEditor = {});
(function (d, c, e, b) {
  var a = e.View.extend({
    className: "color_picker",
    defaults: {color: {r: 0, g: 0, b: 0}, debounce: 30, on_change: d.noop},
    events: {
      paste: "__paste",
      "mousedown .hue_selector": "__hue_mousedown",
      "mousedown .saturation_wrapper": "__saturation_mousedown",
      "focus .color_text": "__color_text_focus",
      "keyup .color_text": "__color_text_keyup"
    },
    __hue_mousedown: function (f) {
      this.hue_width = this.$hue.width();
      var g = (f.pageX - this.$hue.offset().left) / this.hue_width;
      this.hsv.h = Math.round(g * 360);
      this.update_hue();
      d("body").on("mousemove.pickerhue", c.bind(c.throttle(this.__hue_mousemove, this.options.debounce), this));
      d("body").on("mouseup.pickerhue", c.bind(this.__hue_mouseup, this))
    },
    __hue_mousemove: function (g) {
      var f = this.$hue.offset().left;
      g.preventDefault();
      g.stopPropagation();
      g.cancelBubble = true;
      g.returnValue = false;
      if (g.pageX < f || g.pageX > f + this.hue_width) {
        return
      }
      var h = (g.pageX - this.$hue.offset().left) / this.hue_width;
      this.hsv.h = Math.round(h * 360);
      this.update_hue();
      return false
    },
    __hue_mouseup: function (f) {
      f.preventDefault();
      f.stopPropagation();
      d("body").off(".pickerhue")
    },
    __saturation_mousedown: function (h) {
      var i = this.$saturation.offset();
      var g = h.pageX - i.left;
      var f = h.pageY - i.top;
      this.saturation_width = this.$saturation.width();
      this.saturation_height = this.$saturation.height();
      this.hsv.s = Math.max(0, Math.min(g / this.saturation_width, 1));
      this.hsv.v = Math.max(0, Math.min(1 - f / this.saturation_height, 1));
      this.update_saturation();
      this.$saturation_indicator.addClass("dragging");
      d("body").on("mousemove.pickersaturation", c.bind(c.throttle(this.__saturation_mousemove, this.options.debounce), this));
      d("body").on("mouseup.pickersaturation", c.bind(this.__saturation_mouseup, this))
    },
    __saturation_mousemove: function (h) {
      var i = this.$saturation.offset();
      var g = h.pageX - i.left;
      var f = h.pageY - i.top;
      h.preventDefault();
      h.stopPropagation();
      h.cancelBubble = true;
      h.returnValue = false;
      this.hsv.s = Math.max(0, Math.min(g / this.saturation_width, 1));
      this.hsv.v = Math.max(0, Math.min(1 - f / this.saturation_height, 1));
      this.update_saturation();
      return false
    },
    __saturation_mouseup: function () {
      this.$saturation_indicator.removeClass("dragging");
      d("body").off(".pickersaturation")
    },
    __color_text_keyup: function (g) {
      var f = d(g.currentTarget).val().replace(/[^0-9a-f]/gi, "");
      if (g.which === 13 && (f.length === 3 || f.length === 6)) {
        this.hsv = Tumblr.ColorUtilities.hex_to_hsv(f);
        this.update_hue();
        this.update_saturation(false)
      }
    },
    __paste: function (f) {
      f.preventDefault();
      f.stopPropagation();
      var h = false;
      if (window.clipboardData && window.clipboardData.getData) {
        h = window.clipboardData.getData("Text")
      } else {
        if (f.originalEvent.clipboardData && f.originalEvent.clipboardData.getData) {
          h = f.originalEvent.clipboardData.getData("text/plain")
        }
      }
      if (h) {
        h = String(h).replace(/[^0-9a-f]/gi, "");
        var g = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(h);
        if (g) {
          this.hsv = Tumblr.ColorUtilities.hex_to_hsv(h);
          this.update_hue();
          this.update_saturation(false)
        }
      }
      return false
    },
    initialize: function (f) {
      this.options = c.extend({}, this.defaults, f);
      this.current_color = (c.isObject(this.options.color)) ? this.options.color : Tumblr.ColorUtilities.hex_to_rgb(this.options.color);
      this.hsv = Tumblr.ColorUtilities.rgb_to_hsv.apply(this, c.toArray(this.current_color));
      this.current_hex = false;
      this.hue_width = 0;
      this.saturation_height = 0;
      this.saturation_width = 0;
      this.$hue = d();
      this.$hue_indicator = d();
      this.$saturation = d();
      this.$color = d();
      this.$color_text = d()
    },
    render: function () {
      this.$el.html(this.template({color: this.current_color, hue_position: this.hue_position}));
      this.$hue = this.$(".hue_selector");
      this.$hue_indicator = this.$(".hue_selector .indicator");
      this.$saturation = this.$(".saturation_wrapper");
      this.$saturation_indicator = this.$(".saturation_wrapper .indicator");
      this.$color = this.$(".color_value");
      this.$color_text = this.$(".color_value .color_text");
      this.update_hue();
      this.update_saturation(false);
      return this
    },
    update_hue: function () {
      var g = c.toArray(Tumblr.ColorUtilities.hsv_to_rgb(this.hsv.h, 1, 1));
      var f = "rgb(" + g.toString() + ")";
      this.$hue_indicator.css({"background-color": f, left: Math.round((this.hsv.h / 360) * 100) + "%"});
      this.$saturation.css("background-color", f);
      this.update_color_value()
    },
    update_saturation: function (f) {
      f = f || true;
      this.$saturation_indicator.css({
        left: Math.round(this.hsv.s * 100) + "%",
        top: Math.round(100 - (this.hsv.v * 100)) + "%"
      });
      if (f) {
        this.update_color_value()
      }
    },
    update_color_value: function () {
      var h = Tumblr.ColorUtilities.hsv_to_hex.apply(this, c.toArray(this.hsv));
      var g = this.hsv.s;
      var f = this.hsv.v;
      this.$saturation_indicator.css("background-color", h);
      this.$color.css("background-color", h);
      this.$color_text.css("color", (g < 0.2 && f > 0.8) ? "#444" : "#FFF").val(h);
      if (this.current_hex && h !== this.current_hex) {
        this.options.on_change(h)
      }
      this.current_hex = h
    },
    template: c.template('            <div class="hue_wrapper">                <div class="hue_selector">                    <div class="indicator"></div>                </div>                <div class="color_value">                    <input class="color_text" type="text" maxlength="7" />                </div>            </div>            <div class="saturation_wrapper">                <div class="saturation_inner">                    <div class="indicator"></div>                </div>            </div>        ')
  });
  b.Picker = a
})(jQuery, _, Backbone, Tumblr.ColorEditor);
/*! scripts/color_editor/views/color_editor_view.js */
Tumblr.ColorEditor || (Tumblr.ColorEditor = {});
(function (d, c, e, b) {
  var a = e.View.extend({
    className: "color_editor",
    colors: {
      red: ["#D95E40", "#FB4C16", "#FF4141", "#F0BFB6", "#FF7373"],
      yellow: ["#F2992E", "#FFD800", "#FFF231", "#DECBA4", "#E7EC6C"],
      green: ["#56BC8A", "#56BF4B", "#5ACDB3", "#9BCACA", "#BFE4A8"],
      blue: ["#529ECC", "#5AC9E1", "#5289DB", "#394ACB", "#6154C4"],
      purple: ["#A77DC2", "#B09BD5", "#D969C3", "#E1B7D2", "#FE3B80"],
      grayscale: ["#FFFFFF", "#F6F6F6", "#EEEEEE", "#CCCCCC", "#888888", "#666666", "#444444", "#222222", "#000000"]
    },
    defaults: {color: "#444444", debounce: 30, on_change: d.noop},
    events: {
      "click .palette_selector": "__palette_selector_click",
      "click .picker_selector": "__picker_selector_click"
    },
    __palette_selector_click: function (g) {
      g.preventDefault();
      var f = d(g.currentTarget);
      if (f.hasClass("selected")) {
        return
      }
      this.$(".color_selectors .selected").removeClass("selected");
      f.addClass("selected");
      if (f.hasClass("custom")) {
        this.render_custom_palette()
      } else {
        this.render_palette(f.data("color"))
      }
    },
    __picker_selector_click: function (g) {
      g.preventDefault();
      var f = d(g.currentTarget);
      if (f.hasClass("selected")) {
        return
      }
      this.$(".color_selectors .selected").removeClass("selected");
      f.addClass("selected");
      this.render_picker()
    },
    __custom_palette_change: function (f) {
      this.custom_palette = f;
      this.$custom_palette_selector.html(this.custom_palette_template({colors: f[0].slice(0, 3)}));
      this.$el.addClass("has_custom_palette");
      if (this.is_custom_palette_open) {
        this.render_custom_palette()
      }
    },
    __color_change: function (f) {
      if (c.isObject(f)) {
        this.current_color = Tumblr.ColorUtilities.rgb_to_hex(f.r, f.g, f.b)
      } else {
        this.current_color = f
      }
      this.$picker_selector.css("border-color", this.current_color);
      this.options.on_change(this.current_color)
    },
    initialize: function (f) {
      this.options = c.extend({}, this.defaults, f);
      this.current_color = this.options.color;
      this.current_color_palette = false;
      this.current_color_palette_page = 0;
      this.current_view = null;
      this.color_palette = null;
      this.custom_palette = null;
      this.is_custom_palette_open = false;
      this.$color_view = d();
      this.$custom_palette_selector = d();
      this.$picker_selector = d();
      if (Tumblr.Events && Tumblr.Flags.bool("indash_header_image_colors")) {
        this.listenTo(Tumblr.Events, "coloreditor:custompalette", this.__custom_palette_change)
      }
      this.generate_colors()
    },
    render: function () {
      this.$el.html(this.template({colors: this.colors}));
      this.$color_view = this.$(".color_view");
      this.$custom_palette_selector = this.$(".palette_selector.custom");
      this.$picker_selector = this.$(".picker_selector").css("border-color", this.current_color);
      this.$(".color_selectors .selected").removeClass("selected");
      if (this.current_color_palette) {
        this.$('.palette_selector[data-color="' + this.current_color_palette + '"]').addClass("selected");
        this.render_palette(this.current_color_palette, this.current_color_palette_page)
      } else {
        this.$(".picker_selector").addClass("selected");
        this.render_picker()
      }
      return this
    },
    render_palette: function (f, g) {
      this.remove_current_view();
      this.current_view = new b.Palette({
        colors: this.color_palette[f],
        current_color: this.current_color,
        current_page: g || 0,
        on_change: c.bind(this.__color_change, this)
      });
      this.$color_view.html(this.current_view.render().el)
    },
    render_custom_palette: function () {
      if (!this.custom_palette) {
        return
      }
      this.remove_current_view();
      this.current_view = new b.Palette({
        colors: this.custom_palette,
        current_color: this.current_color,
        current_page: 0,
        on_change: c.bind(this.__color_change, this)
      });
      this.$color_view.html(this.current_view.render().el);
      this.is_custom_palette_open = true
    },
    render_picker: function () {
      this.remove_current_view();
      this.current_view = new b.Picker({
        color: Tumblr.ColorUtilities.hex_to_rgb(this.current_color),
        debounce: this.options.debounce,
        on_change: c.bind(this.__color_change, this)
      });
      this.$color_view.html(this.current_view.render().el)
    },
    remove_current_view: function () {
      if (this.current_view) {
        this.current_view.remove();
        this.current_view = null
      }
      this.is_custom_palette_open = false
    },
    generate_colors: function () {
      var f = {};
      c.each(this.colors, function (k, j) {
        f[j] = [];
        if (j === "grayscale") {
          if (k.indexOf(this.current_color) > -1) {
            this.current_color_palette = j;
            this.current_color_palette_page = 0
          }
          f[j].push(k)
        } else {
          for (var h = 0, g = k.length; h < g; h++) {
            var m = this.get_color_variations(k[h]);
            if (m.indexOf(this.current_color) > -1) {
              this.current_color_palette = j;
              this.current_color_palette_page = h
            }
            f[j].push(m)
          }
        }
      }, this);
      this.color_palette = f
    },
    get_color_variations: function (g) {
      var f = [];
      var h = Tumblr.ColorUtilities.hex_to_hsv(g);
      var k = 0.2;
      for (var j = 4; j > 0; j--) {
        var l = k * j;
        f.push(Tumblr.ColorUtilities.hex_brightness(g, l))
      }
      f.push(g);
      for (var j = 1; j <= 4; j++) {
        var l = -(k * j);
        f.push(Tumblr.ColorUtilities.hex_brightness(g, l))
      }
      return f
    },
    template: c.template('            <div class="color_selectors">                <a class="palette_selector" data-color="red" style="background-color:<%= colors.red[0] %>" />                <a class="palette_selector" data-color="yellow" style="background-color:<%= colors.yellow[0] %>" />                <a class="palette_selector" data-color="green" style="background-color:<%= colors.green[0] %>" />                <a class="palette_selector" data-color="blue" style="background-color:<%= colors.blue[0] %>" />                <a class="palette_selector" data-color="purple" style="background-color:<%= colors.purple[0] %>" />                <a class="palette_selector grayscale" data-color="grayscale" style="background-color:#444" />                <a class="palette_selector custom" />                <a class="picker_selector" />            </div>            <div class="color_view"></div>        '),
    custom_palette_template: c.template('            <% _.each(colors, function(color) { %>                <span class="custom_color" style="background-color:<%- color %>"></span>            <% }) %>        ')
  });
  b.Editor = a
})(jQuery, _, Backbone, Tumblr.ColorEditor);
/*! scripts/color_editor/color_editor.js */

/*! scripts/font_picker.js */
(function (d, b, e, a) {
  var c = e.View.extend({
    className: "font_picker",
    defaults: {
      fonts: {},
      current_font: "",
      current_font_weight: "normal",
      on_show: d.noop,
      on_hide: d.noop,
      on_change: d.noop
    },
    events: {
      "mouseover .font": "__font_mouseover",
      "click .font": "__font_click",
      "click .font_picker_glass": "__glass_click"
    },
    __font_mouseover: function (f) {
      var g = d(f.currentTarget)
    },
    __font_click: function (f) {
      this.$(".font.selected").removeClass("selected");
      var g = d(f.currentTarget).addClass("selected");
      this.current_font = g.attr("data-value");
      this.on_change(this.current_font);
      this.hide()
    },
    __glass_click: function (f) {
      f.preventDefault();
      this.hide()
    },
    initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.fonts = this.options.fonts;
      this.current_font = this.options.current_font;
      this.is_bold = (this.options.current_font_weight === "bold");
      this.on_show = this.options.on_show;
      this.on_hide = this.options.on_hide;
      this.on_change = this.options.on_change
    },
    render: function () {
      this.$el.html(this.template({fonts: this.fonts, current_font: this.current_font}));
      this.toggle_font_weight(this.is_bold);
      return this
    },
    show: function () {
      this.$el.show();
      this.on_show()
    },
    hide: function () {
      this.$el.hide();
      this.on_hide()
    },
    scroll_to_current_font: function (h) {
      var f = this.$(".font_options");
      var g = f.children(".selected").first();
      if (g.length) {
        f.scrollTop(h + f.scrollTop() + g.position().top + 0.5 * (g.outerHeight() - f.innerHeight()))
      }
    },
    toggle_font_weight: function (f) {
      this.is_bold = !!(f);
      this.$el.toggleClass("bold", this.is_bold)
    },
    template: b.template('            <ul class="font_options">                <% _.each(fonts, function(font, font_name) { %>                    <% if(font.hidden) return; %>                    <% if(font_name === current_font) { %>                        <li class="font selected" data-value="<%- font_name %>" style="font-family:<%- font.family %>;"><i class="icon icon_checkmark" /><%- font.display_name %></li>                    <% } else { %>                        <li class="font" data-value="<%- font_name %>" style="font-family:<%- font.family %>;"><i class="icon icon_checkmark" /><%- font.display_name %></li>                    <% } %>                <% }) %>            </ul>            <div class="font_picker_glass"></div>        ')
  });
  a.FontPicker = c
})(jQuery, _, Backbone, Tumblr);
/*! scripts/vendor/color-thief/color-thief.js */
/*!
 * Color Thief v2.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * License
 * -------
 * Creative Commons Attribution 2.5 License:
 * http://creativecommons.org/licenses/by/2.5/
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 */
var CanvasImage = function (a) {
  this.canvas = document.createElement("canvas");
  this.context = this.canvas.getContext("2d");
  document.body.appendChild(this.canvas);
  this.width = this.canvas.width = a.width;
  this.height = this.canvas.height = a.height;
  this.context.drawImage(a, 0, 0, this.width, this.height)
};
CanvasImage.prototype.clear = function () {
  this.context.clearRect(0, 0, this.width, this.height)
};
CanvasImage.prototype.update = function (a) {
  this.context.putImageData(a, 0, 0)
};
CanvasImage.prototype.getPixelCount = function () {
  return this.width * this.height
};
CanvasImage.prototype.getImageData = function () {
  return this.context.getImageData(0, 0, this.width, this.height)
};
CanvasImage.prototype.removeCanvas = function () {
  this.canvas.parentNode.removeChild(this.canvas)
};
var ColorThief = function () {
};
ColorThief.prototype.getColor = function (c, d) {
  var b = this.getPalette(c, 5, d);
  var a = b[0];
  return a
};
ColorThief.prototype.getPalette = function (m, t, u) {
  if (typeof t === "undefined") {
    t = 10
  }
  if (typeof u === "undefined") {
    u = 10
  }
  var l = new CanvasImage(m);
  var d = l.getImageData();
  var k = d.data;
  var e = l.getPixelCount();
  var f = [];
  for (var o = 0, n, c, p, q, s; o < e; o = o + u) {
    n = o * 4;
    c = k[n + 0];
    p = k[n + 1];
    q = k[n + 2];
    s = k[n + 3];
    if (s >= 125) {
      if (!(c > 250 && p > 250 && q > 250)) {
        f.push([c, p, q])
      }
    }
  }
  var j = MMCQ.quantize(f, t);
  var h = j.palette();
  l.removeCanvas();
  return h
};
/*!
 * quantize.js Copyright 2008 Nick Rabinowitz.
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
/*!
 * Block below copied from Protovis: http://mbostock.github.com/protovis/
 * Copyright 2010 Stanford Visualization Group
 * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
 */
if (!pv) {
  var pv = {
    map: function (c, a) {
      var b = {};
      return a ? c.map(function (f, e) {
        b.index = e;
        return a.call(b, f)
      }) : c.slice()
    }, naturalOrder: function (d, c) {
      return (d < c) ? -1 : ((d > c) ? 1 : 0)
    }, sum: function (c, a) {
      var b = {};
      return c.reduce(a ? function (f, g, e) {
        b.index = e;
        return f + a.call(b, g)
      } : function (e, f) {
        return e + f
      }, 0)
    }, max: function (b, a) {
      return Math.max.apply(null, a ? pv.map(b, a) : b)
    }
  }
}
var MMCQ = (function () {
  var e = 5, c = 8 - e, h = 1000, l = 0.75;

  function d(o, n, m) {
    return (o << (2 * e)) + (n << e) + m
  }

  function i(m) {
    var p = [], n = false;

    function o() {
      p.sort(m);
      n = true
    }

    return {
      push: function (q) {
        p.push(q);
        n = false
      }, peek: function (q) {
        if (!n) {
          o()
        }
        if (q === undefined) {
          q = p.length - 1
        }
        return p[q]
      }, pop: function () {
        if (!n) {
          o()
        }
        return p.pop()
      }, size: function () {
        return p.length
      }, map: function (q) {
        return p.map(q)
      }, debug: function () {
        if (!n) {
          o()
        }
        return p
      }
    }
  }

  function a(r, n, q, m, s, p, o) {
    var t = this;
    t.r1 = r;
    t.r2 = n;
    t.g1 = q;
    t.g2 = m;
    t.b1 = s;
    t.b2 = p;
    t.histo = o
  }

  a.prototype = {
    volume: function (n) {
      var m = this;
      if (!m._volume || n) {
        m._volume = ((m.r2 - m.r1 + 1) * (m.g2 - m.g1 + 1) * (m.b2 - m.b1 + 1))
      }
      return m._volume
    }, count: function (s) {
      var r = this, n = r.histo;
      if (!r._count_set || s) {
        var q = 0, p, o, m;
        for (p = r.r1; p <= r.r2; p++) {
          for (o = r.g1; o <= r.g2; o++) {
            for (m = r.b1; m <= r.b2; m++) {
              index = d(p, o, m);
              q += (n[index] || 0)
            }
          }
        }
        r._count = q;
        r._count_set = true
      }
      return r._count
    }, copy: function () {
      var m = this;
      return new a(m.r1, m.r2, m.g1, m.g2, m.b1, m.b2, m.histo)
    }, avg: function (n) {
      var t = this, r = t.histo;
      if (!t._avg || n) {
        var w = 0, q = 1 << (8 - e), v = 0, u = 0, y = 0, m, s, p, o, x;
        for (s = t.r1; s <= t.r2; s++) {
          for (p = t.g1; p <= t.g2; p++) {
            for (o = t.b1; o <= t.b2; o++) {
              x = d(s, p, o);
              m = r[x] || 0;
              w += m;
              v += (m * (s + 0.5) * q);
              u += (m * (p + 0.5) * q);
              y += (m * (o + 0.5) * q)
            }
          }
        }
        if (w) {
          t._avg = [~~(v / w), ~~(u / w), ~~(y / w)]
        } else {
          t._avg = [~~(q * (t.r1 + t.r2 + 1) / 2), ~~(q * (t.g1 + t.g2 + 1) / 2), ~~(q * (t.b1 + t.b2 + 1) / 2)]
        }
      }
      return t._avg
    }, contains: function (m) {
      var n = this, o = m[0] >> c;
      gval = m[1] >> c;
      bval = m[2] >> c;
      return (o >= n.r1 && o <= n.r2 && gval >= n.g1 && gval <= n.g2 && bval >= n.b1 && bval <= n.b2)
    }
  };
  function g() {
    this.vboxes = new i(function (n, m) {
      return pv.naturalOrder(n.vbox.count() * n.vbox.volume(), m.vbox.count() * m.vbox.volume())
    })
  }

  g.prototype = {
    push: function (m) {
      this.vboxes.push({vbox: m, color: m.avg()})
    }, palette: function () {
      return this.vboxes.map(function (m) {
        return m.color
      })
    }, size: function () {
      return this.vboxes.size()
    }, map: function (m) {
      var o = this.vboxes;
      for (var n = 0; n < o.size(); n++) {
        if (o.peek(n).vbox.contains(m)) {
          return o.peek(n).color
        }
      }
      return this.nearest(m)
    }, nearest: function (m) {
      var r = this.vboxes, p, o, q;
      for (var n = 0; n < r.size(); n++) {
        o = Math.sqrt(Math.pow(m[0] - r.peek(n).color[0], 2) + Math.pow(m[1] - r.peek(n).color[1], 2) + Math.pow(m[2] - r.peek(n).color[2], 2));
        if (o < p || p === undefined) {
          p = o;
          q = r.peek(n).color
        }
      }
      return q
    }, forcebw: function () {
      var p = this.vboxes;
      p.sort(function (r, q) {
        return pv.naturalOrder(pv.sum(r.color), pv.sum(q.color))
      });
      var n = p[0].color;
      if (n[0] < 5 && n[1] < 5 && n[2] < 5) {
        p[0].color = [0, 0, 0]
      }
      var m = p.length - 1, o = p[m].color;
      if (o[0] > 251 && o[1] > 251 && o[2] > 251) {
        p[m].color = [255, 255, 255]
      }
    }
  };
  function k(s) {
    var m = 1 << (3 * e), o = new Array(m), p, r, q, n;
    s.forEach(function (t) {
      r = t[0] >> c;
      q = t[1] >> c;
      n = t[2] >> c;
      p = d(r, q, n);
      o[p] = (o[p] || 0) + 1
    });
    return o
  }

  function j(n, p) {
    var t = 1000000, w = 0, r = 1000000, v = 0, u = 1000000, m = 0, q, o, s;
    n.forEach(function (x) {
      q = x[0] >> c;
      o = x[1] >> c;
      s = x[2] >> c;
      if (q < t) {
        t = q
      } else {
        if (q > w) {
          w = q
        }
      }
      if (o < r) {
        r = o
      } else {
        if (o > v) {
          v = o
        }
      }
      if (s < u) {
        u = s
      } else {
        if (s > m) {
          m = s
        }
      }
    });
    return new a(t, w, r, v, u, m, p)
  }

  function f(q, v) {
    if (!v.count()) {
      return
    }
    var n = v.r2 - v.r1 + 1, A = v.g2 - v.g1 + 1, w = v.b2 - v.b1 + 1, x = pv.max([n, A, w]);
    if (v.count() == 1) {
      return [v.copy()]
    }
    var z = 0, y = [], s = [], r, p, o, u, t;
    if (x == n) {
      for (r = v.r1; r <= v.r2; r++) {
        u = 0;
        for (p = v.g1; p <= v.g2; p++) {
          for (o = v.b1; o <= v.b2; o++) {
            t = d(r, p, o);
            u += (q[t] || 0)
          }
        }
        z += u;
        y[r] = z
      }
    } else {
      if (x == A) {
        for (r = v.g1; r <= v.g2; r++) {
          u = 0;
          for (p = v.r1; p <= v.r2; p++) {
            for (o = v.b1; o <= v.b2; o++) {
              t = d(p, r, o);
              u += (q[t] || 0)
            }
          }
          z += u;
          y[r] = z
        }
      } else {
        for (r = v.b1; r <= v.b2; r++) {
          u = 0;
          for (p = v.r1; p <= v.r2; p++) {
            for (o = v.g1; o <= v.g2; o++) {
              t = d(p, o, r);
              u += (q[t] || 0)
            }
          }
          z += u;
          y[r] = z
        }
      }
    }
    y.forEach(function (C, B) {
      s[B] = z - C
    });
    function m(D) {
      var I = D + "1", H = D + "2", C, J, F, E, B, G = 0;
      for (r = v[I]; r <= v[H]; r++) {
        if (y[r] > z / 2) {
          F = v.copy();
          E = v.copy();
          C = r - v[I];
          J = v[H] - r;
          if (C <= J) {
            B = Math.min(v[H] - 1, ~~(r + J / 2))
          } else {
            B = Math.max(v[I], ~~(r - 1 - C / 2))
          }
          while (!y[B]) {
            B++
          }
          G = s[B];
          while (!G && y[B - 1]) {
            G = s[--B]
          }
          F[H] = B;
          E[I] = F[H] + 1;
          return [F, E]
        }
      }
    }

    return x == n ? m("r") : x == A ? m("g") : m("b")
  }

  function b(o, s) {
    if (!o.length || s < 2 || s > 256) {
      return false
    }
    var p = k(o), q = 1 << (3 * e);
    var v = 0;
    p.forEach(function () {
      v++
    });
    if (v <= s) {
    }
    var r = j(o, p), m = new i(function (x, w) {
      return pv.naturalOrder(x.count(), w.count())
    });
    m.push(r);
    function t(w, C) {
      var y = 1, x = 0, z;
      while (x < h) {
        z = w.pop();
        if (!z.count()) {
          w.push(z);
          x++;
          continue
        }
        var D = f(p, z), B = D[0], A = D[1];
        if (!B) {
          return
        }
        w.push(B);
        if (A) {
          w.push(A);
          y++
        }
        if (y >= C) {
          return
        }
        if (x++ > h) {
          return
        }
      }
    }

    t(m, l * s);
    var u = new i(function (x, w) {
      return pv.naturalOrder(x.count() * x.volume(), w.count() * w.volume())
    });
    while (m.size()) {
      u.push(m.pop())
    }
    t(u, s - u.size());
    var n = new g();
    while (u.size()) {
      n.push(u.pop())
    }
    return n
  }

  return {quantize: b}
})();
/*! scripts/application/popover_sharing_base.js */
(function (c, b, e, a) {
  var d = a.Popover.extend({
    events: {
      "click .share_email": "__email_trigger_click",
      "click .share_facebook": "__share_facebook_click",
      "click .share_twitter": "__share_twitter_click",
      "click .share_permalink": "__share_permalink_click",
      "click .cancel": "__cancel_click",
      "input .email_address": "__email_form_input",
      "input .twitter .share_message": "__share_twitter_input",
      "change .reply_to_input": "__reply_to_change",
      "keydown .share_form": "__submit_keydown",
      "submit .share_form": "__submit"
    }, __email_trigger_click: function (f) {
      f.preventDefault();
      this._toggle_email_form()
    }, __email_form_input: function () {
      var f = a.SharePopoverBase.validate_email(this.$email_address.val());
      this.$submit_button.attr("disabled", !f)
    }, __share_facebook_click: function (f) {
      f.preventDefault();
      this._share_facebook()
    }, __share_twitter_click: function (f) {
      f.preventDefault();
      this._share_twitter()
    }, __share_twitter_input: function (g) {
      g.preventDefault();
      var f = a.SharePopoverBase.validate_twitter(this.$share_message.val(), this.$character_count);
      this.$submit_button.attr("disabled", !f)
    }, __share_permalink_click: function () {
      this.reset_and_hide()
    }, __cancel_click: function (f) {
      f.preventDefault();
      this._cancel_or_close()
    }, __reply_to_change: function (g) {
      if (!a.Cookie) {
        return
      }
      var f = c(g.currentTarget).is(":checked");
      a.Cookie.set("share_popover_reply_to", f, 365 * 24 * 60 * 60)
    }, __submit: function () {
      this.submit_form();
      return false
    }, __submit_keydown: function (f) {
      if (f.keyCode === 13 && (f.ctrlKey || f.metaKey || f.altKey)) {
        f.preventDefault();
        f.stopPropagation();
        this.submit_form()
      }
    }, __submit_success: function () {
      this.$status.show();
      this._fadeout_popover()
    }, __submit_error: function () {
      this.$error_status.html(this.error_text);
      this.$submit_button.html(this.$submit_button.data("label"));
      this.$submit_button.attr("disabled", false);
      this.$error_status.addClass("active")
    }, _share_twitter: function () {
      if (this.twitter_username) {
        this.$service_cancel.show();
        this.$submit_button.html("Tweet");
        this.$share_form.data("type", "twitter");
        this.$share_label.text("@" + this.twitter_username);
        this.$share_message.val(" [URL]");
        this.$share_form.addClass("active");
        this.$share_options.removeClass("active");
        this.$share_message.get(0).setSelectionRange(0, 0);
        a.SharePopoverBase.validate_twitter(this.$share_message.val(), this.$character_count);
        this.$share_message.attr("placeholder", "");
        this.$submit_button.attr("disabled", false);
        this.$share_form.addClass("twitter");
        if (this.$share_form.hasClass("active") && this.placeholder_supported) {
          this.$share_message.focus();
          this.$share_message.get(0).setSelectionRange(0, 0)
        }
      } else {
        this._share_twitter_fallback()
      }
    }, _share_twitter_fallback: function () {
      window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(this.tiny_url || this.url), "twitter-share-dialog", "width=626,height=258");
      this.reset_and_hide()
    }, _share_facebook: function () {
      if (this.share_to_facebook) {
        c.ajax({
          url: "/svc/facebook_status",
          type: "post",
          data: {form_key: c("#tumblr_form_key").attr("content")},
          success: b.bind(this._share_facebook_success, this),
          error: b.bind(this._share_facebook_fallback, this)
        })
      } else {
        this._share_facebook_fallback()
      }
    }, _share_facebook_success: function (f) {
      if (f) {
        this.$service_cancel.show();
        this.$submit_button.html(this.$submit_button.data("label"));
        this.$share_form.data("type", "facebook");
        this.$share_label.text(f);
        this.$submit_button.attr("disabled", false);
        this.$share_form.addClass("facebook");
        this.$share_options.toggleClass("active");
        this.$share_form.toggleClass("active");
        if (this.$share_form.hasClass("active") && this.placeholder_supported) {
          this.$share_message.focus()
        }
      } else {
        this._share_facebook_fallback()
      }
    }, _share_facebook_fallback: function () {
      window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.url), "facebook-share-dialog", "width=626,height=436");
      this.reset_and_hide()
    }, _toggle_email_form: function () {
      this.$submit_button.html(this.$submit_button.data("label"));
      this.$share_form.data("type", "email");
      this.$share_options.toggleClass("active");
      this.$share_form.toggleClass("active");
      this.$reply_to.addClass("active");
      if (this.$share_form.hasClass("active") && this.is_placeholder_supported) {
        this.$email_address.focus()
      }
    }, _fadeout_popover: function () {
      setTimeout(b.bind(function () {
        this.popover.fadeOut(150, b.bind(this.reset_and_hide, this))
      }, this), 1250)
    }, _position_popover: function () {
      this.popover.css({right: "auto", left: (this.$button.length) ? this.$button.offset().left : ""});
      this.position()
    }, _cancel_or_close: function () {
      var f = this.$email_address.val() || "";
      if (this.$share_form.data("type") === "email" && f.length) {
        this.$email_address.val("");
        this.$submit_button.attr("disabled", true)
      } else {
        this.reset_form()
      }
    }, initialize: function (f) {
      this.options = b.extend({
        url: "",
        tiny_url: "",
        popover: null,
        button: null,
        on_hide: b.bind(this.reset_and_hide, this)
      }, f);
      this.url = this.options.url;
      this.tiny_url = this.options.tiny_url;
      this.is_placeholder_supported = a.SharePopoverBase.placeholder_support();
      this.$button = c(this.options.button);
      this.cache_selectors();
      if (a.Cookie && a.Cookie.get("share_popover_reply_to") === "true") {
        this.$reply_to_input.prop("checked", true)
      }
      Tumblr.Events.trigger("keycommands:suspend");
      a.Popover.prototype.initialize.call(this, this.options)
    }, cache_selectors: function () {
      this.$share_form = this.$(".share_form");
      this.$share_label = this.$(".share_label");
      this.$reply_to = this.$(".reply_to");
      this.$share_options = this.$(".share_options");
      this.$submit_button = this.$("button.email_submit");
      this.$email_address = this.$(".email_address");
      this.$share_message = this.$(".share_message");
      this.$character_count = this.$(".character_count");
      this.$service_cancel = this.$(".cancel.service");
      this.$status = this.$(".status");
      this.$error_status = this.$(".error_status");
      this.$status_message = this.$(".status_message");
      this.$reply_to_input = this.$(".reply_to_input");
      this.sent_text = this.$status.data("sent") || "";
      this.error_text = this.$status.data("error") || "";
      if (c(".share_twitter").length) {
        this.twitter_username = c(".share_twitter").data("twitter-username")
      }
    }, show: function () {
      this._position_popover();
      this.listenTo(Tumblr.Events, "DOMEventor:flatresize", this._position_popover);
      a.Popover.prototype.show.call(this)
    }, hide: function () {
      Tumblr.Events.trigger("keycommands:resume");
      this.stopListening(Tumblr.Events, "DOMEventor:flatresize");
      a.Popover.prototype.hide.call(this)
    }, reset_form: function () {
      this.$service_cancel.hide();
      this.$submit_button.html(this.$submit_button.data("label"));
      this.$submit_button.attr("disabled", true);
      this.$email_address.val("");
      this.$share_message.val("");
      this.$share_message.attr("placeholder", this.$share_message.attr("title"));
      this.$share_options.addClass("active");
      this.$share_form.removeClass("active");
      this.$share_form.removeClass("facebook");
      this.$share_form.removeClass("twitter");
      this.$status.hide();
      this.$status_message.html(this.sent_text);
      this.$reply_to.removeClass("active");
      this.$error_status.removeClass("active")
    }, reset_and_hide: function () {
      this.reset_form();
      this.$el.removeClass("active");
      this.popover.hide()
    }, submit_form: function () {
      this.$submit_button.attr("disabled", true);
      this.$submit_button.html(this.$submit_button.data("label-sending"))
    },
  }, {
    placeholder_support: function () {
      var f = document.createElement("input");
      return ("placeholder" in f)
    }, validate_email: function (g) {
      var f = /\S+@\S+\.\S+/;
      return f.test(g)
    }, validate_twitter: function (k, j) {
      var i = k.match(/\[URL\]/ig);
      var g = (i) ? (i.length * 24) : 0;
      var h = 140 - k.length - g;
      var f = (j && j.length) ? j : false;
      if (f) {
        f.html(h);
        if (h < 10) {
          f.css("color", "#d95e40")
        } else {
          if (h < 20) {
            f.css("color", "#444444")
          } else {
            f.css("color", "#bbbbbb")
          }
        }
      }
      if (h < 0 || h === 140) {
        return false
      }
      return true
    }
  });
  a.SharePopoverBase = d
})(jQuery, _, Backbone, Tumblr);
/*! scripts/indash_blog/models/header_model.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
(function (d, b, e, a) {
  var c = e.Model.extend({
    url: "/svc/indash_blog/header", tumblelog_name_or_id: "", initialize: function (f, g) {
      g = g || {};
      if (g.tumblelog_name_or_id) {
        this.tumblelog_name_or_id = g.tumblelog_name_or_id
      }
      if (g.url) {
        this.url = g.url
      }
    }, get_theme_param: function (f) {
      var g = this.get("global_theme_params") || {};
      return g[f]
    }, set_theme_params: function (f) {
      var g = b.clone(this.get("global_theme_params"));
      this.set("global_theme_params", b.extend({}, g, f))
    }, fetch: function (f) {
      f = f || {};
      f.data = {tumblelog_name_or_id: f.tumblelog_name_or_id || this.tumblelog_name_or_id};
      e.Model.prototype.fetch.call(this, f)
    }, save: function (g, f) {
      var h = b.extend({}, this.defaults, g);
      h.global_theme_params = b.omit(h.global_theme_params, ["header_image_dimens", "header_image_focused"]);
      f = f || {};
      f.contentType = "application/json";
      f.data = JSON.stringify({tumblelog_name_or_id: this.tumblelog_name_or_id, tumblelog: h});
      f.with_form_key = true;
      return e.Model.prototype.save.call(this, g, f)
    }, parse: function (f, g) {
      return f.response
    }
  });
  a.HeaderModel = c
})(jQuery, _, Backbone, Tumblr.IndashBlog);
/*! scripts/indash_blog/views/header/dropzone.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, c, e, b) {
  var a = e.View.extend({
    defaults: {
      accepted_types: /^image\/(gif|jpe?g|png)$/,
      max_file_size: 10000000,
      upload_url: "/svc/post/upload_photo"
    },
    events: {
      "dragover .header_dropzone": "__dropzone_dragover",
      "dragleave .header_dropzone": "__dropzone_dragleave",
      "drop .header_dropzone": "__dropzone_drop"
    },
    __dropzone_dragover: function (f) {
      f.preventDefault();
      this.$el.addClass("drop")
    },
    __dropzone_dragleave: function (f) {
      f.preventDefault();
      this.$el.removeClass("drop")
    },
    __dropzone_drop: function (f) {
      f.preventDefault();
      this.$el.removeClass("drop")
    },
    __file_add: function (i, h) {
      if (!h.files || !h.files.length) {
        this.fail();
        return
      }
      var f = h.files[0];
      if (f.type && !this.options.accepted_types.test(f.type)) {
        var j = this.$input.attr("data-filetype-error") || null;
        var g = this.$input.attr("data-filetype-ok") || null;
        this.fail(j, g);
        return
      }
      if (f.size > this.options.max_file_size) {
        var j = this.$input.attr("data-filesize-error") || null;
        var g = this.$input.attr("data-filesize-ok") || null;
        this.fail(j, g)
      } else {
        if (this.file_reader) {
          this.file_data = h;
          this.load_preview(f)
        } else {
          this.file_data = null;
          this.xhr = this.file_data.submit()
        }
        Tumblr.Events.trigger("dropzone:add", this.$input)
      }
    },
    __file_send: function (g, f) {
      Tumblr.Events.trigger("dropzone:send", this.$input)
    },
    __file_done: function (i, h) {
      this.xhr = null;
      this.file_data = null;
      if (!h.result || !c.isArray(h.result.response) || !h.result.response.length) {
        this.fail();
        return
      }
      var f = h.result.response[0];
      if (c.has(f, "error")) {
        this.fail(f.error)
      } else {
        var g = h.result.response[0].url;
        Tumblr.Events.trigger("dropzone:done", this.$input, g)
      }
    },
    __file_fail: function (g, f) {
      this.xhr = null;
      this.fail()
    },
    __save: function () {
      if (this.file_data) {
        this.xhr = this.file_data.submit()
      }
    },
    __preview_loaded: function (g) {
      var f = g.target.result;
      this.preload_image(f, c.bind(function () {
        this.render_preview(f)
      }, this))
    },
    initialize: function (f) {
      this.options = c.extend({}, this.defaults, f);
      this.form_key = this.options.form_key || d("#tumblr_form_key").attr("content");
      this.xhr = null;
      this.file_data = null;
      this.file_reader = (window.FileReader) ? new FileReader() : null;
      this.preview_url = false;
      this.$dropzone = this.$(".header_dropzone");
      this.$input = this.$('input[type="file"]');
      this.listenTo(Tumblr.Events, "indashblog:customize:save", this.__save);
      if (this.$input.length) {
        this.initialize_dropzone()
      }
    },
    initialize_dropzone: function () {
      this.$input.fileupload({
        url: this.options.upload_url,
        formData: {form_key: this.form_key},
        maxFileSize: this.options.max_file_size,
        maxNumberOfFiles: 1,
        pasteZone: null,
        dropZone: this.$dropzone,
        fileInput: this.$input,
        replaceFileInput: false,
        previewMaxWidth: 500,
        previewMaxHeight: 800,
        add: c.bind(this.__file_add, this),
        done: c.bind(this.__file_done, this),
        send: c.bind(this.__file_send, this),
        fail: c.bind(this.__file_fail, this)
      })
    },
    cancel: function () {
      if (this.xhr) {
        try {
          this.xhr.abort()
        } catch (f) {
        }
      }
    },
    fail: function (f, g) {
      Tumblr.Events.trigger("dropzone:fail", this.$input, f, g)
    },
    remove: function () {
      this.cancel();
      return e.View.prototype.remove.call(this)
    },
    render_preview: function (f) {
      var g = this.$(".image_preview");
      if (g.length > 1) {
        g.filter(":lt(1)").remove()
      }
      this.preview_url = f;
      this.$el.append(this.preview_template({url: f}))
    },
    load_preview: function (f) {
      if (!f || !this.file_reader) {
        return
      }
      this.file_reader.onload = c.bind(this.__preview_loaded, this);
      this.file_reader.readAsDataURL(f)
    },
    preload_image: function (g, h) {
      var f = new Image();
      h = h || d.noop;
      f.onload = c.delay(function () {
        h()
      }, 500);
      f.src = g
    },
    preview_template: c.template('<div class="image_preview" style="background-image:url(<%= url %>)"></div>')
  });
  b.Dropzone = a
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/popover.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, b, e, a) {
  var c = e.View.extend({
    className: "indash_header_popover",
    defaults: {direction: "left", edit_field: null, template: false, template_data: {}, trigger: null, glassless: true},
    __close: function () {
      this.hide()
    },
    initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.template = this.options.template;
      this.template_data = this.options.template_data;
      this.checkbox_template = b.template(d("#tumblelog_header_checkbox_template").html());
      this.color_picker_template = b.template(d("#tumblelog_header_color_picker_template").html());
      this.is_showing = false;
      this.$popover = null;
      this.popover_view = null;
      a.Popover.register(this)
    },
    render: function () {
      var f = this.template(this.template_data);
      this.$popover = d(f).appendTo(this.$el).hide();
      this.popover_view = new Tumblr.Popover({
        el: this.options.trigger,
        popover: this.$popover,
        glassless: this.options.glassless,
        glassless_options: this.options.glassless_options,
        auto_show: false,
        direction: this.options.direction,
        skip_offset: true,
        on_show: b.bind(function () {
          if (!this.is_showing) {
            Tumblr.Events.trigger("indashblog:popover:show", this, this.options.edit_field);
            this.is_showing = true
          }
        }, this),
        on_hide: b.bind(function () {
          if (this.is_showing) {
            Tumblr.Events.trigger("indashblog:popover:hide", this, this.options.edit_field);
            this.is_showing = false
          }
        }, this)
      });
      return this
    },
    show: function () {
      this.popover_view.show()
    },
    hide: function () {
      if (!this.is_showing) {
        return
      }
      Tumblr.Events.trigger("indashblog:popover:hide", this, this.options.edit_field);
      this.is_showing = false;
      this.popover_view.hide()
    }
  });
  c.instances = [];
  c.register = function (f) {
    this.instances.push(f)
  };
  c.hide_all = function () {
    for (var g = 0, f = this.instances.length; g < f; g++) {
      this.instances[g].hide()
    }
  };
  a.Popover = c
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/info_popover.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, b, e, a) {
  var c = a.Popover.extend({
    template: b.template(d("#tumblelog_header_info_popover_template").html()),
    defaults: {show_flag_button: true},
    events: {
      "click .ask_menu_item": "__ask_menu_item_clicked",
      "click .fan_mail_menu_item": "__fan_mail_menu_item_clicked",
      "click .archive_menu_item": "__archive_menu_item_clicked",
      "click .block": "__block_click",
      "click .toggle_spam": "__toggle_spam_click",
      "click .toggle_nsfw": "__toggle_nsfw_click",
      "click .toggle_suspended": "__toggle_suspended_click",
      "click .panel_menu_item": "__panel_menu_item_clicked",
    },
    __panel_menu_item_clicked: function (f) {
      this.hide()
    },
    __ask_menu_item_clicked: function (f) {
      f.preventDefault();
      Tumblr.Events.trigger("indashblog:tumblelog:ask", {
        recipient: this.model.get("name"),
        anonymous_asks: this.model.get("anonymous_asks")
      });
      this.hide()
    },
    __fan_mail_menu_item_clicked: function (f) {
      f.preventDefault();
      Tumblr.Events.trigger("indashblog:tumblelog:fan_mail", {recipient: this.model.get("name")});
      this.hide()
    },
    __archive_menu_item_clicked: function () {
      this.hide()
    },
    __block_click: function (g) {
      g.preventDefault();
      var f = {blockedTumblelog: this.model.get("name")};
      Tumblr.Prima.Block.confirmBlock(f).then(b.bind(this.__onBlockConfirm, this));
      Tumblr.Events.trigger("TumblelogPopover:navigation_menu_item_clicked");
      this.hide()
    },
    __onBlockConfirm: function () {
      var f = new Tumblr.Prima.Models.Tumblelog({name: this.model.get("name")});
      f.block().then(b.bind(this._afterBlock, this))
    },
    __toggle_spam_click: function (f) {
      f.preventDefault();
      var g = this.model.toggle_spam();
      g.success(b.bind(function (h) {
        this.model.set("spam", (h.spammer) ? true : false)
      }, this))
    },
    __toggle_nsfw_click: function (f) {
      f.preventDefault();
      var g = this.model.toggle_nsfw();
      g.success(b.bind(function (h) {
        this.model.set("nsfw", h.nsfw)
      }, this))
    },
    __toggle_suspended_click: function (f) {
      f.preventDefault();
      var g = this.model.toggle_suspended();
      g.success(b.bind(function (h) {
        this.model.set("suspended", h.suspended)
      }, this))
    },
    __model_change: function () {
      var f = this.model.toJSON();
      this.$(".toggle_spam").toggleClass("is_flagged", !!(f.spam));
      this.$(".toggle_nsfw").toggleClass("is_flagged", !!(f.nsfw));
      this.$(".toggle_suspended").toggleClass("is_flagged", !!(f.suspended))
    },
    _afterIgnore: function () {
      this.model.set("ignoring", true);
      this.model.set("following", false)
    },
    _afterBlock: function () {
      this.model.set("blocking", true);
      this.model.set("following", false)
    },
    _open_dialog: function (f, g) {
      g = g || b.noop;
      this.is_disabled = true;
      f.fail(b.bind(function () {
        this.is_disabled = this.is_menu_open
      }, this));
      f.done(b.bind(function () {
        this.is_disabled = this.is_menu_open;
        g()
      }, this))
    },
    initialize: function (f) {
      this.$trigger = f.trigger;
      this.targetPost = f.targetPost;
      if (!this.model) {
        return
      }
      var g = this.model.toJSON();
      b.defaults(g, f, this.defaults);
      this.$popover = d(this.template(g)).appendTo(this.$el).hide();
      this.tumblelog = new Tumblr.Prima.Models.Tumblelog({name: this.model.get("name")});
      this.listenTo(this.model, "change", this.__model_change);
      f = b.extend(f, {popover: this.$popover});
      Tumblr.Popover.prototype.initialize.call(this, f)
    },
    show: function () {
      this.position_popover();
      this.listenTo(Tumblr.Events, "DOMEventor:flatresize", this.position_popover);
      Tumblr.Popover.prototype.show.call(this)
    },
    hide: function () {
      this.stopListening(Tumblr.Events, "DOMEventor:flatresize");
      Tumblr.Popover.prototype.hide.call(this)
    },
    position_popover: function () {
      var f = this.$trigger.offset().left + "px";
      this.$popover.css({right: "auto", left: f})
    }
  });
  a.InfoPopover = c
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/share_popover.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (e, b, f, a) {
  var d = f.Model.extend({
    url: "/svc/email_tumblelog", initialize: function (g, h) {
      h = h || {};
      if (h.url) {
        this.url = h.url
      }
    }, sync_form: function (h, g) {
      h.push({name: "form_key", value: e("#tumblr_form_key").attr("content")});
      h.push({name: "tumblelog_name", value: this.get("tumblelog_name_or_id")});
      var i = e.ajax({url: this.url, type: "post", data: h, with_form_key: true});
      i.done(g.done || e.noop);
      i.fail(g.fail || e.noop)
    }, validate_email: function (h) {
      var g = /\S+@\S+\.\S+/;
      return g.test(h)
    }
  });
  var c = Tumblr.SharePopoverBase.extend({
    events: function () {
      return b.defaults({"click .open_blog_button": "__trigger_click"}, Tumblr.SharePopoverBase.prototype.events)
    }, template: b.template(e("#tumblelog_header_share_popover_template").html()), __trigger_click: function (g) {
      if (!(g.ctrlKey || g.metaKey)) {
        g.preventDefault();
        g.stopPropagation();
        this.toggle()
      }
    }, initialize: function (g) {
      this.options = b.extend({
        button: this.$(".open_blog_button"),
        popover: e(this.template({})).appendTo(this.$el).hide(),
        url: "http://www.tumblr.com",
        glassless: true
      }, g);
      this.model = new d({tumblelog_name_or_id: this.options.tumblelog_name_or_id});
      Tumblr.SharePopoverBase.prototype.initialize.call(this, this.options)
    }, submit_form: function () {
      this.model.sync_form(this.$share_form.serializeArray(), {
        done: b.bind(this.__submit_success, this),
        fail: b.bind(this.__submit_error, this)
      });
      Tumblr.SharePopoverBase.prototype.submit_form.call(this)
    }, show: function () {
      Tumblr.Events.trigger("indashblog:keycommands:suspend");
      Tumblr.SharePopoverBase.prototype.show.call(this)
    }, hide: function () {
      Tumblr.Events.trigger("indashblog:keycommands:resume");
      Tumblr.SharePopoverBase.prototype.hide.call(this)
    }
  });
  a.SharePopover = c
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/editable_text.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, b, e, a) {
  var c = e.View.extend({
    defaults: {character_limit: 0, show_popover: true, spellcheck: false},
    events: {
      "keydown .editable_text": "__text_keydown",
      "input .editable_text": "__text_input",
      "blur .editable_text": "__text_blur",
      "paste .editable_text": "__text_paste"
    },
    __text_keydown: function (f) {
      if (f.which === 8 || f.metaKey || f.ctrlKey) {
        return
      }
      if (this.character_limit && this.character_count >= this.character_limit) {
        f.preventDefault();
        f.stopPropagation()
      }
    },
    __text_input: function () {
      this.update_character_count();
      this.$text.toggleClass("empty", !this.character_count)
    },
    __text_paste: function (f) {
      var g = f.originalEvent || f;
      if (g.clipboardData) {
        f.preventDefault();
        var h = document.createElement("div");
        h.innerHTML = g.clipboardData.getData("text/html");
        document.execCommand("insertHTML", false, (h.innerText || h.textContent))
      }
    },
    __text_blur: function () {
      this.render_underline()
    },
    initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.character_limit = this.options.character_limit;
      this.character_count = 0;
      this.$text = this.$(".editable_text");
      this.$underline = d();
      if (this.$text.length) {
        this.update_character_count();
        this.$text.attr({
          contenteditable: true,
          spellcheck: this.options.spellcheck
        }).toggleClass("empty", !this.character_count)
      }
    },
    render: function () {
      b.delay(b.bind(this.render_underline, this), 100);
      return this
    },
    render_underline: function () {
      if (this.$underline && this.$underline.length) {
        this.$underline.remove()
      }
      var f = this.$text.innerHeight();
      var h = parseInt(this.$text.css("line-height"));
      var g = this.underline_template({lines: Math.round(f / h), height: h, width: this.$text.width()});
      this.$underline = d(g).prependTo(this.$text)
    },
    update_character_count: function () {
      if (!this.$text.length) {
        return
      }
      if (this.$underline && this.$underline.length) {
        this.$underline.remove()
      }
      this.character_count = this.$text.text().length;
      this.render_underline()
    },
    underline_template: b.template('            <span class="underline">                <% for(var i=0; i<lines; i++) { %>                    <span class="line" style="height:<%= height %>px; width:<%= width %>px"></span>                <% } %>            </span>        ')
  });
  a.EditableText = c
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/customize.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, b, e, a) {
  var c = e.View.extend({
    className: "indash_header_customize",
    events: {
      "click .cancel_button": "__cancel_button_click",
      "click .save_button": "__save_button_click",
      "click #indash_header_overlay": "__popover_overlay_click",
      "click .header_image_glass": "__popover_overlay_click"
    },
    __cancel_button_click: function (f) {
      f.preventDefault();
      if (!this.is_saving) {
        this.model.set(this.reset_data);
        this.remove()
      }
    },
    __save_button_click: function (f) {
      f.preventDefault();
      this.is_saving = true;
      this.$save_button.addClass("loading");
      this.$save_button.find(".loader").addClass("animate");
      if (!this.current_dropzone_upload) {
        this.save()
      } else {
        Tumblr.Events.trigger("indashblog:customize:save")
      }
    },
    __dropzone_add: function () {
      this.current_dropzone_upload = true;
      this.enable_save_button()
    },
    __dropzone_fail: function (f, g, h) {
      this.current_dropzone_upload = false;
      if (g && Tumblr.Dialog) {
        this.$el.addClass("dialog_open");
        Tumblr.Dialog.alert({
          text: g,
          text_ok: h || this.$save_button.data("error-confirm"),
          callback_ok: b.bind(function () {
            this.$el.removeClass("dialog_open")
          }, this)
        })
      }
    },
    __dropzone_done: function (h, f) {
      var g = (h.length) ? h.attr("id") : "";
      switch (g) {
        case"tumblelog_avatar_url":
          this.model.set("avatar_url", f);
          break;
        case"tumblelog_header_image":
          this.model.set_theme_params({header_image: f});
          break
      }
      this.current_dropzone_upload = false;
      if (this.is_saving) {
        this.save()
      }
    },
    __popover_overlay_click: function (f) {
      f.preventDefault();
      this.$el.removeClass("popover_open editing_header");
      this.$(".editing_focus").removeClass("editing_focus");
      a.Popover.hide_all()
    },
    __popover_show: function (g, f) {
      this.$el.addClass("popover_open");
      if (f && f.length) {
        f.addClass("editing_focus");
        this.$el.toggleClass("editing_header", f.hasClass("header_image"))
      }
    },
    __popover_hide: function (g, f) {
      this.$el.removeClass("popover_open editing_header");
      if (f && f.length) {
        f.removeClass("editing_focus")
      }
    },
    __theme_params_change: function () {
      var g = this.model.get("global_theme_params");
      var h = b.result(this.all_fonts, g.title_font);
      var f = Tumblr.ColorUtilities.hex_to_rgb(g.title_color);
      this.$wrapper.css({"background-color": g.background_color, color: g.title_color});
      this.$avatar.css("color", g.background_color);
      this.$editable_text.css("border-color", g.link_color);
      this.$(".description").css("color", f);
      this.$dropzones.css("background-color", g.title_color);
      this.$title_text.css({"font-family": (h) ? h.family : "inherit", "font-weight": g.title_font_weight})
    },
    __error: function () {
      this.$el.addClass("dialog_open");
      Tumblr.Dialog.alert({
        text: this.$save_button.data("error"),
        text_ok: this.$save_button.data("error-confirm"),
        callback_ok: function () {
          window.location.reload()
        }
      })
    },
    initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.all_fonts = b.isFunction(this.model.getAvailableFonts) ? this.model.getAvailableFonts() : a.fonts;
      this.template = b.template(d("#tumblelog_header_customize_template").html());
      this.reset_data = {};
      this.is_saving = false;
      this.current_dropzone_upload = false;
      this.$save_button = d();
      this.$wrapper = d();
      this.$avatar = d();
      this.$title_text = d();
      this.$editable_text = d();
      this.$dropzones = d();
      this.listenToOnce(this.model, "error", this.__error);
      this.listenToOnce(this.model, "change", this.enable_save_button);
      this.listenTo(this.model, "sync", this.remove);
      this.listenTo(this.model, "change:global_theme_params", this.__theme_params_change);
      this.listenTo(Tumblr.Events, "dropzone:add", this.__dropzone_add);
      this.listenTo(Tumblr.Events, "dropzone:fail", this.__dropzone_fail);
      this.listenTo(Tumblr.Events, "dropzone:done", this.__dropzone_done);
      this.listenTo(Tumblr.Events, "indashblog:popover:show", this.__popover_show);
      this.listenTo(Tumblr.Events, "indashblog:popover:hide", this.__popover_hide);
      this.subviews = {}
    },
    render: function () {
      var g = this.model.toJSON();
      var h = b.result(this.all_fonts, g.global_theme_params.title_font);
      var f = Tumblr.ColorUtilities.hex_to_rgb(g.global_theme_params.title_color);
      this.reset_data = d.extend(true, {}, g);
      this.$el.html(this.template(b.merge({}, g, {
        title_font_family: (h) ? h.family : false,
        title_color_rgb: String(b.values(f).join(","))
      })));
      this.render_customize_views();
      this.$save_button = this.$(".save_button").attr("disabled", true);
      this.$wrapper = this.$(".indash_header_wrapper");
      this.$avatar = this.$(".avatar");
      this.$title_text = this.$(".title .editable_text");
      this.$editable_text = this.$(".editable_text");
      this.$dropzones = this.$(".header_dropzone");
      if (Tumblr.IndashBlog.keycommands) {
        Tumblr.IndashBlog.keycommands.suspend(true)
      }
      if (Tumblr.IndashBlog.is_peepr) {
        d("html, body").animate({scrollTop: 0}, 200)
      }
      return this
    },
    render_customize_views: function () {
      this.subviews.header_image_edit = new a.HeaderImage({
        el: this.$(".header_image"),
        model: this.model,
        form_key: this.form_key
      });
      this.subviews.avatar_edit = new a.Avatar({el: this.$(".avatar"), model: this.model, form_key: this.form_key});
      this.subviews.title_edit = new a.Title({el: this.$(".title"), model: this.model, all_fonts: this.all_fonts});
      this.subviews.description_edit = new a.Description({el: this.$(".description"), model: this.model});
      this.subviews.background_color_edit = new a.BackgroundColor({el: this.$(".background_color"), model: this.model});
      this.subviews.link_color_edit = new a.LinkColor({el: this.$(".link_color"), model: this.model})
    },
    enable_save_button: function () {
      this.$save_button.attr("disabled", false)
    },
    remove: function () {
      b.each(this.subviews, function (f) {
        f.remove()
      });
      if (Tumblr.IndashBlog.keycommands) {
        Tumblr.IndashBlog.keycommands.resume()
      }
      Tumblr.Popover.hide_all();
      this.trigger("remove", this);
      return e.View.prototype.remove.call(this, arguments)
    },
    save: function () {
      this.is_saving = false;
      if (b.isEqual(this.model.attributes, this.reset_data)) {
        this.remove()
      } else {
        this.model.save(this.model.attributes, {wait: true})
      }
    }
  });
  a.Customize = c
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/header_position.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (c, b, e, a) {
  var d = e.View.extend({
    el: ".header_image",
    defaults: {
      background_color: "#000",
      bounds: {},
      image: "",
      loader_color: "#FFF",
      max_aspect_ratio: 16 / 9,
      max_zoom: 3,
      show_cancel: true,
      zoom_increment: 0.2
    },
    events: {
      "click .cancel_header_position": "__cancel_click",
      "click .save_header_position": "__save_click",
      "mousedown .full_image": "__image_mousedown",
      "mousedown .zoom_control": "__zoom_mousedown",
      "click .zoom_in": "__zoom_in_click",
      "click .zoom_out": "__zoom_out_click"
    },
    __cancel_click: function (f) {
      f.preventDefault();
      this.remove()
    },
    __save_click: function (f) {
      f.preventDefault();
      var g = this.dimensions.width / this.image_position.width;
      this.bounds = {
        top: Math.floor(this.image_position.top * -g),
        right: Math.floor((this.min_width - this.image_position.left) * g),
        bottom: Math.floor((this.min_height - this.image_position.top) * g),
        left: Math.floor(this.image_position.left * -g)
      };
      this.trigger("save", this.bounds, this.image_position);
      this.remove()
    },
    __image_mousedown: function (f) {
      this.drag_position = {x: f.pageX, y: f.pageY};
      this.$body.on("mousemove.header_position", b.throttle(b.bind(this.__image_mousemove, this), 40));
      this.$body.on("mouseup.header_position", b.bind(this.__image_mouseup, this));
      this.$body.addClass("dragging_header_image")
    },
    __image_mousemove: function (f) {
      f.preventDefault();
      f.stopPropagation();
      this.image_position.left += f.pageX - this.drag_position.x;
      this.image_position.top += f.pageY - this.drag_position.y;
      this.drag_position.x = f.pageX;
      this.drag_position.y = f.pageY;
      this.position_image();
      return false
    },
    __image_mouseup: function () {
      this.$body.off(".header_position").removeClass("dragging_header_image");
      b.delay(b.bind(this.snap_image, this), 50)
    },
    __zoom_mousedown: function (f) {
      this.$body.on("mousemove.header_position", b.throttle(b.bind(this.__zoom_mousemove, this), 20));
      this.$body.on("mouseup.header_position", b.bind(this.__zoom_mouseup, this));
      this.$body.addClass("dragging_header_image")
    },
    __zoom_mousemove: function (h) {
      h.preventDefault();
      h.stopPropagation();
      var g = this.$zoom_track.width();
      var f = Math.round(h.pageX - this.$zoom_track.offset().left);
      if (f > 0 && f < g) {
        this.zoom = 1 + ((this.options.max_zoom - 1) * (f / g));
        this.zoom_image()
      }
      return false
    },
    __zoom_mouseup: function () {
      this.$body.off(".header_position").removeClass("dragging_header_image");
      b.delay(b.bind(this.snap_image, this), 50)
    },
    __zoom_in_click: function (g) {
      g.preventDefault();
      var f = this.zoom + this.options.zoom_increment;
      this.zoom = (f > this.options.max_zoom) ? this.options.max_zoom : f;
      this.zoom_image()
    },
    __zoom_out_click: function (g) {
      g.preventDefault();
      var f = this.zoom - this.options.zoom_increment;
      this.zoom = (f < 1) ? 1 : f;
      this.zoom_image()
    },
    __escape: function (f) {
      if (this.is_open && this.options.show_cancel) {
        this.remove()
      }
    },
    initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.image = this.options.image;
      this.bounds = this.options.bounds;
      this.dimensions = this.options.dimensions;
      this.template = b.template(c("#tumblelog_header_position_template").html());
      this.aspect_ratio = 1;
      this.zoom = 1;
      this.scale = 1;
      this.min_width = 0;
      this.min_height = 0;
      this.center_point = {};
      this.drag_position = {x: 0, y: 0};
      this.image_position = {left: 0, top: 0, height: 0, width: 0};
      this.is_open = false;
      this.$body = c("body");
      this.$container = c();
      this.$loader = c();
      this.$image = c();
      this.$zoom_track = c();
      this.$zoom_control = c();
      this.listenTo(Tumblr.Events, "DOMEventor:keydown:escape", this.__escape);
      this.render()
    },
    render: function () {
      this.$el.append(this.template({
        background_color: this.options.background_color,
        image: this.image,
        loader_color: this.options.loader_color,
        show_cancel: this.options.show_cancel
      }));
      this.$container = this.$(".indash_header_position_wrapper").addClass("loading");
      this.$loader = this.$container.find(".loader").addClass("animate");
      this.$image = this.$container.find(".full_image");
      this.$zoom_track = this.$container.find(".header_zoom");
      this.$zoom_control = this.$container.find(".zoom_control");
      this.$body.addClass("positioning_header");
      if (Tumblr.IndashBlog.keycommands) {
        Tumblr.IndashBlog.keycommands.suspend()
      }
      var f = this.$container.get(0).getBoundingClientRect();
      this.min_height = f.height;
      this.min_width = f.width;
      this.is_open = true;
      this.center_point = {x: this.min_width * 0.5, y: this.min_height * 0.5};
      this.preload_image(this.image, b.bind(function (g) {
        this.dimensions = {height: g.height, width: g.width};
        this.ready()
      }, this));
      return this
    },
    ready: function () {
      var i = !!(b.size(this.bounds));
      var g = (i) ? (this.bounds.right - this.bounds.left) : this.dimensions.width;
      var k = (i) ? (this.bounds.bottom - this.bounds.top) : this.dimensions.height;
      this.aspect_ratio = this.dimensions.width / this.dimensions.height;
      this.zoom = (this.aspect_ratio <= this.options.max_aspect_ratio) ? (this.dimensions.width / g) : (this.dimensions.height / k);
      this.scale = (this.aspect_ratio <= this.options.max_aspect_ratio) ? (this.min_width / this.dimensions.width) : (this.min_height / this.dimensions.height);
      var j = this.scale * this.zoom;
      var f = this.dimensions.height * j;
      var h = this.dimensions.width * j;
      this.image_position = {
        left: (i) ? (this.bounds.left * -j) : (this.center_point.x - (h * 0.5)),
        top: (i) ? (this.bounds.top * -j) : (this.center_point.y - (f * 0.5)),
        height: f,
        width: h
      };
      this.$container.removeClass("loading");
      this.$loader.remove();
      this.zoom_image()
    },
    remove: function () {
      if (Tumblr.IndashBlog.keycommands) {
        Tumblr.IndashBlog.keycommands.resume(true)
      }
      this.is_open = false;
      this.stopListening();
      this.$body.removeClass("positioning_header");
      this.$container.remove();
      this.trigger("remove", this)
    },
    preload_image: function (g, h) {
      var f = document.createElement("img");
      h = h || c.noop;
      c(f).on("load error", function () {
        c(f).off();
        h(f)
      });
      f.src = g
    },
    zoom_image: function () {
      var l = this.scale * this.zoom;
      var h = this.dimensions.width * l;
      var g = this.dimensions.height * l;
      var f = h - this.image_position.width;
      var k = g - this.image_position.height;
      var j = this.image_position.left - (f * ((Math.abs(this.image_position.left) + this.center_point.x) / this.image_position.width));
      var i = this.image_position.top - (k * ((Math.abs(this.image_position.top) + this.center_point.y) / this.image_position.height));
      this.image_position = {left: j, top: i, width: h, height: g};
      this.snap_image()
    },
    position_image: function () {
      var f = (this.zoom - 1) / (this.options.max_zoom - 1);
      this.$zoom_control.css("left", f * this.$zoom_track.width());
      this.$image.css(this.image_position)
    },
    snap_image: function () {
      if (this.image_position.left + this.image_position.width < this.min_width) {
        this.image_position.left = this.min_width - this.image_position.width
      }
      if (this.image_position.left > 0) {
        this.image_position.left = 0
      }
      if (this.image_position.top + this.image_position.height < this.min_height) {
        this.image_position.top = this.min_height - this.image_position.height
      }
      if (this.image_position.top > 0) {
        this.image_position.top = 0
      }
      this.position_image()
    }
  });
  a.HeaderImagePosition = d
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/customize_fields/avatar_edit.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, c, e, b) {
  var a = b.Dropzone.extend({
    events: function () {
      return c.defaults({
        "click .choose_photo": "__choose_photo_click",
        "click .avatar_shape": "__avatar_shape_click",
        "change #tumblelog_show_avatar": "__show_avatar_change"
      }, b.Dropzone.prototype.events)
    }, __choose_photo_click: function (f) {
      f.preventDefault();
      this.$input.trigger("click")
    }, __avatar_shape_click: function (i) {
      i.preventDefault();
      if (d(i.currentTarget).hasClass("selected")) {
        return
      }
      var h = this.$(".avatar_shape.selected");
      var f = d(i.currentTarget).addClass("selected");
      var g = f.data("value");
      if (h.length) {
        h.removeClass("selected")
      }
      this.$el.removeClass(this.model.get_theme_param("avatar_shape")).addClass(g);
      this.model.set_theme_params({avatar_shape: g})
    }, __show_avatar_change: function (g) {
      var f = d(g.currentTarget).is(":checked");
      this.model.set_theme_params({show_avatar: f});
      this.$el.toggleClass("disabled", !f)
    }, initialize: function (f) {
      b.Dropzone.prototype.initialize.call(this, f);
      this.popover = new b.Popover({
        direction: "left",
        edit_field: this.$el,
        template: c.template(d("#tumblelog_header_avatar_popover_template").html()),
        template_data: this.model.toJSON(),
        trigger: this.$(".edit_button"),
        glassless_options: {prevent_clicks: false, click_root: this.$el}
      });
      this.$avatar_shape = this.$("#tumblelog_avatar_shape");
      if (!this.model.get("global_theme_params").show_avatar) {
        this.$el.addClass("disabled")
      }
      this.$el.append(this.popover.render().el)
    }, remove: function () {
      this.cancel();
      this.popover.remove();
      return e.View.prototype.remove.call(this)
    }
  });
  b.Avatar = a
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/customize_fields/background_color_edit.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (c, b, e, a) {
  var d = e.View.extend({
    __color_editor_change: function (f) {
      this.$color_dot.css("background-color", f);
      this.model.set_theme_params({background_color: f})
    }, initialize: function (f) {
      this.options = b.extend({}, this.defaults, f);
      this.$color_dot = c();
      this.popover = new a.Popover({
        direction: "up",
        edit_field: this.$el,
        template: b.template(c("#tumblelog_header_color_popover_template").html()),
        trigger: this.$el,
        glassless_options: {prevent_clicks: false, click_root: this.$el}
      });
      this.color_editor = new Tumblr.ColorEditor.Editor({
        color: this.model.get_theme_param("background_color"),
        on_change: b.bind(this.__color_editor_change, this)
      });
      this.render()
    }, render: function () {
      this.$el.append(this.popover.render().el);
      this.$(".popover_inner").append(this.color_editor.render().el);
      this.$color_dot = this.$(".color_dot");
      return this
    }
  });
  a.BackgroundColor = d
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/customize_fields/description_edit.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (c, b, e, a) {
  var d = a.EditableText.extend({
    events: function () {
      return b.defaults({
        "focus .editable_text": "__text_focus",
        "change #tumblelog_show_description": "__show_description_change"
      }, a.EditableText.prototype.events)
    }, __text_focus: function () {
      this.popover.show()
    }, __text_blur: function (f) {
      var g = c(f.currentTarget).text();
      this.model.set("description", g);
      a.EditableText.prototype.__text_blur.call(this)
    }, __show_description_change: function (g) {
      var f = c(g.currentTarget).is(":checked");
      this.model.set_theme_params({show_description: f});
      this.$el.toggleClass("disabled", !f)
    }, initialize: function (f) {
      a.EditableText.prototype.initialize.call(this, f);
      this.popover = new a.Popover({
        direction: "up",
        edit_field: this.$el,
        trigger: false,
        template: b.template(c("#tumblelog_header_description_popover_template").html()),
        template_data: this.model.toJSON(),
        glassless_options: {prevent_clicks: false, click_root: this.$el}
      });
      if (!this.model.get("global_theme_params").show_description) {
        this.$el.addClass("disabled")
      }
      this.$el.append(this.popover.render().el);
      a.EditableText.prototype.render.call(this)
    }
  });
  a.Description = d
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/customize_fields/header_image_edit.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (c, b, e, a) {
  var d = a.Dropzone.extend({
    events: function () {
      return b.defaults({
        "click .choose_photo": "__choose_photo_click",
        "click .position_photo": "__position_photo_click",
        "change #tumblelog_stretch_header_image": "__stretch_header_image_change",
        "change #tumblelog_show_header_image": "__show_header_image_change"
      }, a.Dropzone.prototype.events)
    }, __choose_photo_click: function (f) {
      f.preventDefault();
      this.$input.click()
    }, __position_photo_click: function (f) {
      f.preventDefault();
      f.stopPropagation();
      this.popover.hide();
      this.render_header_position();
      return false
    }, __stretch_header_image_change: function (g) {
      var f = c(g.currentTarget).is(":checked");
      this.model.set_theme_params({header_stretch: f});
      this.$(".position_photo").toggleClass("disabled", !f)
    }, __show_header_image_change: function (g) {
      var f = c(g.currentTarget).is(":checked");
      this.model.set_theme_params({show_header_image: f});
      this.$el.toggleClass("disabled", !f)
    }, __position_header_save: function (h, f) {
      this.model.set_theme_params({header_bounds: h});
      var g = this.model.get("global_theme_params");
      this.$el.css({
        "background-image": "url(" + (this.preview_url || g.header_image) + ")",
        "background-position": f.left + "px " + f.top + "px",
        "background-size": f.width + "px " + f.height + "px"
      })
    }, __position_header_remove: function () {
      this.stopListening(this.position_header_view);
      this.position_header_view = null
    }, initialize: function (f) {
      a.Dropzone.prototype.initialize.call(this, f);
      this.position_photo_view = null;
      this.color_thief = null;
      this.popover = new a.Popover({
        direction: "right",
        edit_field: this.$el,
        template: b.template(c("#tumblelog_header_image_popover_template").html()),
        template_data: this.model.toJSON(),
        trigger: this.$(".edit_button"),
        glassless_options: {prevent_clicks: false}
      });
      this.position_header_view = null;
      this.$el.append(this.popover.render().el);
      this.setup()
    }, setup: function () {
      var f = this.model.get("global_theme_params");
      if (!f.show_header_image) {
        this.$el.addClass("disabled")
      }
      if (!f.header_stretch) {
        this.$(".position_photo").addClass("disabled")
      }
    }, render_header_position: function (g) {
      var f = this.model.get("global_theme_params");
      g = !!(g) || false;
      this.position_header_view = new a.HeaderImagePosition({
        el: this.$el,
        background_color: f.background_color,
        bounds: (this.preview_url) ? {} : f.header_bounds,
        image: this.preview_url || f.header_image,
        loader_color: f.title_color,
        show_cancel: !g,
      });
      this.listenToOnce(this.position_header_view, "remove", this.__position_header_remove);
      this.listenToOnce(this.position_header_view, "save", this.__position_header_save)
    }, render_preview: function (f) {
      this.preview_url = f;
      this.popover.hide();
      this.$el.css("background-image", "url(" + this.preview_url + ")");
      this.$("img").attr("src", this.preview_url);
      if (this.model.get_theme_param("header_stretch")) {
        this.render_header_position(true)
      }
      this.generate_color_palette(f)
    }, generate_color_palette: function (g) {
      if (!Tumblr.Flags.bool("indash_header_image_colors") || !ColorThief) {
        return
      }
      this.color_thief = this.color_thief || new ColorThief();
      var f = new Image();
      f.onload = b.bind(function () {
        var i = this.color_thief.getPalette(f, 10);
        if (i && Tumblr.Events && Tumblr.ColorUtilities) {
          var h = [];
          b.each(i, function (j) {
            var k = Tumblr.ColorUtilities.rgb_to_hex.apply(null, b.toArray(j));
            h.push(k)
          });
          Tumblr.Events.trigger("coloreditor:custompalette", [h])
        }
      }, this);
      f.src = g
    }, remove: function () {
      this.cancel();
      return e.View.prototype.remove.call(this)
    }
  });
  a.HeaderImage = d
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/customize_fields/link_color_edit.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, c, e, b) {
  var a = e.View.extend({
    __color_editor_change: function (f) {
      this.$color_dot.css("background-color", f);
      this.model.set_theme_params({link_color: f})
    }, initialize: function (f) {
      this.options = c.extend({}, this.defaults, f);
      this.$color_dot = d();
      this.popover = new b.Popover({
        direction: "up",
        glassless: true,
        glassless_options: {prevent_clicks: false},
        edit_field: this.$el,
        template: c.template(d("#tumblelog_header_color_popover_template").html()),
        trigger: this.$el
      });
      this.color_editor = new Tumblr.ColorEditor.Editor({
        color: this.model.get_theme_param("link_color"),
        on_change: c.bind(this.__color_editor_change, this)
      });
      this.render()
    }, render: function () {
      this.$el.append(this.popover.render().el);
      this.$(".popover_inner").append(this.color_editor.render().el);
      this.$color_dot = this.$(".color_dot");
      return this
    }
  });
  b.LinkColor = a
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header/customize_fields/title_edit.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, b, e, a) {
  var c = a.EditableText.extend({
    events: function () {
      return b.defaults({
        "focus .editable_text": "__text_focus",
        "change #tumblelog_show_title": "__show_title_change",
        "click .current_font": "__font_click",
        "click .font_weight": "__font_weight_click"
      }, a.EditableText.prototype.events)
    }, __text_focus: function () {
      this.popover.show()
    }, __text_blur: function () {
      var f = this.$text.text();
      this.model.set("title", f);
      a.EditableText.prototype.__text_blur.call(this)
    }, __show_title_change: function (g) {
      var f = d(g.currentTarget).is(":checked");
      this.model.set_theme_params({show_title: f});
      this.$el.toggleClass("disabled", !f)
    }, __color_editor_change: function (f) {
      this.model.set_theme_params({title_color: f})
    }, __font_click: function (f) {
      f.preventDefault();
      this.font_picker.show();
      this.font_picker.scroll_to_current_font(-38)
    }, __font_change: function (f) {
      var g = b.result(this.all_fonts, f);
      if (g) {
        this.$current_font.css("font-family", g.family);
        this.$current_font_label.text(g.display_name);
        this.model.set_theme_params({title_font: f})
      }
      this.render_underline()
    }, __font_weight_click: function (i) {
      var f = d(i.currentTarget);
      var g = !f.hasClass("on");
      var h = (g) ? "bold" : "normal";
      this.font_picker.toggle_font_weight(g);
      this.model.set_theme_params({title_font_weight: h});
      this.$current_font.css("font-weight", h);
      f.toggleClass("on", g)
    }, initialize: function (f) {
      a.EditableText.prototype.initialize.call(this, b.extend({character_limit: 50}, f));
      this.all_fonts = this.options.all_fonts;
      this.current_font = b.result(this.all_fonts, this.model.get_theme_param("title_font"));
      this.$current_font = d();
      this.$current_font_label = d();
      this.popover = new a.Popover({
        direction: "up",
        edit_field: this.$el,
        trigger: false,
        template: b.template(d("#tumblelog_header_title_popover_template").html()),
        template_data: b.merge(this.model.toJSON(), {current_font: this.current_font || false}),
        glassless_options: {prevent_clicks: false, click_root: this.$el}
      });
      this.color_editor = new Tumblr.ColorEditor.Editor({
        color: this.model.get_theme_param("title_color"),
        on_change: b.bind(this.__color_editor_change, this)
      });
      this.font_picker = new Tumblr.FontPicker({
        fonts: this.all_fonts,
        current_font: this.model.get_theme_param("title_font"),
        current_font_weight: this.model.get_theme_param("title_font_weight"),
        on_change: b.bind(this.__font_change, this)
      });
      if (!this.model.get("global_theme_params").show_title) {
        this.$el.addClass("disabled")
      }
      this.render()
    }, render: function () {
      this.$el.append(this.popover.render().el);
      this.$(".title_popover").append(this.color_editor.render().el);
      this.$(".font_dropdown").append(this.font_picker.render().el);
      this.$current_font = this.$(".current_font");
      this.$current_font_label = this.$current_font.find("span");
      a.EditableText.prototype.render.call(this);
      return this
    }
  });
  a.Title = c
})(jQuery, _, Backbone, Tumblr.IndashBlog.Header);
/*! scripts/indash_blog/views/header_view.js */
var TumblrData = TumblrData || {};
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
Tumblr.IndashBlog.Header || (Tumblr.IndashBlog.Header = {});
(function (d, b, e, a) {
  var c = e.View.extend({
    el: ".header",
    info_popover: null,
    defaults: {
      aspect_ratio: 9 / 16,
      show_navigation: true,
      show_share_controls: false,
      show_dismiss_controls: false,
      show_user_controls: false,
      show_follow_button: false,
      on_customize_open: d.noop,
      on_customize_close: d.noop
    },
    events: {
      "click .customize_button": "__customize_button_clicked",
      "click .follow": "__follow_button_clicked",
      "click .unfollow": "__unfollow_button_clicked",
      "click .open_blog_button": "__open_blog_button_clicked",
      "click .info_popover_button": "__info_popover_button_clicked",
      "click .show_description": "__toggle_description_click",
      "click .description a": "__description_link_click"
    },
    __info_popover_button_clicked: function (f) {
      f.preventDefault();
      f.stopPropagation();
      this.info_popover.show()
    },
    __open_blog_button_clicked: function (f) {
      f.preventDefault();
      this._open_blog()
    },
    __follow_button_clicked: function (f) {
      this.model.set("following", true)
    },
    __unfollow_button_clicked: function (f) {
      this.model.set("following", false)
    },
    __customize_button_clicked: function (f) {
      f.preventDefault();
      this.start_customizing()
    },
    __toggle_description_click: function (f) {
      f.preventDefault();
      this.$description.toggleClass("show_all");
      this.$description_inner.css("height", (this.$description.hasClass("show_all")) ? this.$description_inner.get(0).scrollHeight : "")
    },
    __description_link_click: function (i) {
      var f = d(i.currentTarget).attr("href");
      if (b.startsWith(f.toLowerCase(), "mailto:")) {
        return
      }
      i.preventDefault();
      try {
        if (Tumblr.Prima.Url && Tumblr.Prima.Url.hasAllowedProtocol(f)) {
          if (!Tumblr.Prima.Url.isAbsoluteUrl(f)) {
            var h = "http://" + this.model.get("name") + ".tumblr.com/";
            f = (f.charAt(0) === "/") ? f.substr(1) : f;
            f = h + f
          }
          window.open(f, "_blank")
        }
      } catch (g) {
      }
    },
    __theme_param_change: function () {
      var f = this.model.get("global_theme_params");
      this.$(".indash_header_wrapper").toggleClass("no_stretch_header", !f.header_stretch)
    },
    __window_scroll: function (f) {
      this.set_sticky_header(this._near_top(f.windowScrollTop));
      this.parallax_header(f.windowScrollTop)
    },
    _render_follow_button: function () {
      if (this.model.get("following")) {
        this.$el.find(".follow").hide();
        this.$el.find(".unfollow").show()
      } else {
        this.$el.find(".unfollow").hide();
        this.$el.find(".follow").show()
      }
    },
    _customize_remove: function () {
      this.stopListening(this.customize_view);
      this.customize_view = null;
      this.render();
      this.on_customize_close()
    },
    _open_blog: function () {
      window.open(this.model.get("url"), "_blank")
    },
    _near_top: function (f) {
      return !!(f >= this.header_image_height)
    },
    initialize: function (f) {
      this.options = b.extend({header_min_height: 50, parallax_inertia: 0.3, avatar_inertia: 0.4}, this.defaults, f);
      this.is_peepr = a.is_peepr || this.options.is_peepr;
      this.on_customize_open = this.options.on_customize_open;
      this.on_customize_close = this.options.on_customize_close;
      this.$show_description = d();
      this.$header_image = d();
      this.$navigation_bg = d();
      this.$blurred_header = d();
      this.template = b.template(d("#tumblelog_header_template").html());
      this.inline_styles_template = b.template(d("#tumblelog_header_inline_styles").html());
      this.customize_view = null;
      this.listenTo(this.model, "change:global_theme_params", this.__theme_param_change);
      this.listenTo(this.model, "change:following", this._render_follow_button);
      if (this.is_peepr) {
        this.listenTo(Tumblr.Events, "DOMEventor:flatscroll peepr-body-scroll", this.__window_scroll, this)
      }
    },
    render: function () {
      if (!this.model) {
        return
      }
      var k = this.model.toJSON();
      var m = b.isFunction(this.model.getAvailableFonts) ? this.model.getAvailableFonts() : TumblrData.fonts;
      var l = b.result(m, k.global_theme_params.title_font);
      var h = Tumblr.ColorUtilities.hex_to_rgb(k.global_theme_params.title_color);
      this.$el.html(this.template(b.merge({}, k, {
        show_navigation: this.options.show_navigation,
        show_share_controls: this.options.show_share_controls,
        show_dismiss_controls: this.options.show_dismiss_controls,
        show_user_controls: this.options.show_user_controls,
        show_follow_button: this.options.show_follow_button,
        has_peepr_header: false,
        title_font_family: (l) ? l.family : false,
        title_color_rgb: String(b.values(h).join(",")),
        is_verified: false
      })));
      var i = this.$el.width();
      this.$(".header_image_wrapper, .header_image").height(i * this.options.aspect_ratio);
      this.cache_selectors();
      if (this.$description_inner.length) {
        this.truncate_description()
      }
      this.render_inline_styles();
      var g = !!(k.global_theme_params.header_image_focused && k.global_theme_params.show_header_image);
      if (this.is_peepr && g && k.global_theme_params.header_stretch) {
        this.generate_short_header()
      }
      this.info_popover = new Tumblr.TumblelogPopover.PopticaInfoPopover({
        el: this.$el.find(".indash_header_wrapper"),
        auto_show: false,
        trigger: this.$el.find(".info_popover_button"),
        recipient: this.model.get("name"),
        url: this.model.get("url"),
        glassless: true,
        model: this.model,
        standalone: true,
        show_flag_button: true,
        show_user_controls: this.options.show_user_controls
      });
      var f = Tumblr.Prima.currentUser();
      var j = b.contains(f.channels.pluck("name"), this.model.get("name"));
      if (f.canMessage() && !j && this.model.get("can_receive_messages")) {
        this.messaging_popover = new Tumblr.Prima.MessagingPopover({model: this.model}).render();
        this.$(".indash_header_wrapper .open_blog_button").after(this.messaging_popover.$el)
      }
      this.parallax_header(0);
      this.share_popover = new a.Header.SharePopover({
        el: this.$el.find(".indash_header_wrapper"),
        auto_show: false,
        trigger: this.$el.find(".open_blog_button"),
        url: this.model.get("url"),
        tumblelog_name_or_id: this.model.tumblelog_name_or_id
      });
      if (Tumblr.Flags.bool("peepr_search_and_filter") && !Tumblr.Flags.bool("settings_tumblelog_header")) {
        this.searchView = new Tumblr.Prima.PeeprSearch({blog: this.model});
        this.$(".navigation_inner h3").after(this.searchView.render().$el)
      }
      if (this.$el.hasClass("loading")) {
        this.preload_images(this.$el, b.bind(function () {
          this.$el.removeClass("loading")
        }, this))
      }
      return this
    },
    render_inline_styles: function () {
      if (this.$("#indash_blog_styles").length) {
        this.$("#indash_blog_styles").remove()
      }
      var i = this.model.toJSON();
      var f = i.global_theme_params.link_color;
      var g = Tumblr.ColorUtilities.hex_to_hsv(i.global_theme_params.link_color);
      var h = Tumblr.ColorUtilities.hex_to_hsv(i.global_theme_params.background_color);
      if (Tumblr.ColorUtilities.compare_colors(g, h)) {
        f = Tumblr.ColorUtilities.hsv_to_readable(h)
      }
      this.$el.prepend(this.inline_styles_template(b.extend({
        link_font_color: Tumblr.ColorUtilities.hsv_to_readable(g),
        header_override_color: f
      }, i)));
      return this
    },
    remove: function () {
      this.stopListening();
      this.undelegateEvents();
      if (this.searchView) {
        this.searchView.remove()
      }
      if (this.info_popover) {
        this.info_popover.remove()
      }
    },
    generate_short_header: function () {
      var i = this.model.get_theme_param("header_image_focused");
      if (!i) {
        return
      }
      var f = document.createElement("img");
      var g = document.createElement("canvas");
      var h = g.getContext("2d");
      if (this.$navigation_bg.length) {
        this.$navigation_bg.addClass("has_image");
        g.className = "sticky_header_image";
        g.width = this.$header_image.width();
        g.height = this.$header_image.height();
        f.onload = b.bind(function () {
          var j = f.naturalWidth / f.naturalHeight;
          f.width = g.width;
          f.height = f.width / j;
          if (f.height < g.height) {
            f.height = g.height;
            f.width = f.height * j
          }
          h.drawImage(f, -(f.width - g.width) * 0.5, -(f.height - g.height) * 0.5, f.width, f.height);
          h.fillStyle = "rgba(0,0,0,0.4)";
          h.fillRect(0, 0, g.width, g.height);
          this.$blurred_header = d(g);
          this.$navigation_bg.html(this.$blurred_header)
        }, this);
        f.src = i
      }
    },
    truncate_description: function () {
      var f = this.$description_inner.get(0);
      if (f.scrollHeight <= f.clientHeight) {
        return
      }
      this.is_description_truncated = true;
      this.$description.addClass("truncated");
      this.render_description_gradient()
    },
    render_description_gradient: function () {
      var f = this.model.get_theme_param("background_color");
      var g = Tumblr.ColorUtilities.hex_to_rgb(f);
      if (this.$show_description.length) {
        this.$show_description.remove()
      }
      this.$show_description = d(this.show_description_template({
        background_color: String(b.values(g).join(",")),
        title_color: this.model.get_theme_param("title_color")
      })).appendTo(this.$description)
    },
    cache_selectors: function () {
      this.$win = d(window);
      this.$header_image = this.$(".header_image");
      this.$avatar = this.$(".avatar");
      this.$description = this.$(".description");
      this.$description_links = this.$(".description a");
      this.$description_inner = this.$(".description .description_inner");
      this.$navigation_bg = this.$(".navigation_bg");
      this.$sticky_items = this.$("[data-sticky-styles]");
      this.header_image_height = (this.$header_image.height() - this.options.header_min_height > this.options.header_min_height) ? this.$header_image.height() - this.options.header_min_height : this.options.header_min_height
    },
    parallax_header: function (k) {
      if (!this.is_peepr || this.customize_view || !this.$header_image.length) {
        return
      }
      var g = b.isUndefined(k) ? this.$win.scrollTop() : k;
      if (g > this.header_image_height) {
        return
      }
      var l = Math.round(g * this.options.parallax_inertia);
      this.$header_image.css({transform: "translate3d(0," + l + "px, 0)"});
      var i = g * this.options.avatar_inertia;
      var h = (100 - i) / 100;
      if (h < 0) {
        h = 0
      }
      this.$avatar.css({opacity: h});
      if (this.$navigation_bg.length && this.$blurred_header.length) {
        var f = this.$header_image.height() - g;
        var j = l - g;
        this.$navigation_bg.css({height: f, opacity: 1 - h});
        this.$blurred_header.css({transform: "translate3d(0," + j + "px, 0)"})
      }
    },
    set_sticky_header: function (f) {
      if (f) {
        this.$el.addClass("sticky_header");
        this.$navigation_bg.css({height: "", opacity: ""})
      } else {
        this.$el.removeClass("sticky_header")
      }
    },
    close_customize: function () {
      if (this.customize_view) {
        this.customize_view.remove()
      }
    },
    preload_images: function (k, n) {
      var m = d(k).find("img");
      var g = document.createElement("img");
      var h = 0;
      n = n || d.noop;
      if (!m.length) {
        n()
      }
      for (var j = 0, f = m.length; j < f; j++) {
        d(g).on("load error", function () {
          d(g).off();
          h++;
          if (h === f) {
            n()
          }
        });
        g.src = m[j].src
      }
    },
    start_customizing: function () {
      this.customize_view = new a.Header.Customize({model: this.model});
      this.listenTo(this.customize_view, "remove", this._customize_remove);
      this.$el.html(this.customize_view.render().el);
      var f = this.$el.width();
      this.$(".header_image").height(f * this.options.aspect_ratio);
      this.on_customize_open()
    },
    show_description_template: b.template('            <div class="show_description" style="                background: -moz-linear-gradient(top,  rgba(<%= background_color %>,0) 0%, rgba(<%= background_color %>,0.75) 50%, rgba(<%= background_color %>,1) 100%);                background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(<%= background_color %>,0)), color-stop(50%,rgba(<%= background_color %>,0.75)), color-stop(100%,rgba(<%= background_color %>,1)));                background: -webkit-linear-gradient(top,  rgba(<%= background_color %>,0) 0%,rgba(<%= background_color %>,0.75) 50%,rgba(<%= background_color %>,1) 100%);                background: -o-linear-gradient(top,  rgba(<%= background_color %>,0) 0%,rgba(<%= background_color %>,0.75) 50%,rgba(<%= background_color %>,1) 100%);                background: -ms-linear-gradient(top,  rgba(<%= background_color %>,0) 0%,rgba(<%= background_color %>,0.75) 50%,rgba(<%= background_color %>,1) 100%);                background: linear-gradient(to bottom,  rgba(<%= background_color %>,0) 0%,rgba(<%= background_color %>,0.75) 50%,rgba(<%= background_color %>,1) 100%);                color: <%= title_color %>;            ">                <i class="show_icon icon_arrow_carrot_down"></i>                <i class="hide_icon icon_arrow_carrot_up"></i>            </div>        ')
  });
  a.HeaderView = c;
  a.Header.fonts = TumblrData.fonts || {}
})(jQuery, _, Backbone, Tumblr.IndashBlog);
/*! scripts/indash_blog/indash_blog_header.js */

/*! scripts/indash_blog/views/post_view.js */
Tumblr.IndashBlog || (Tumblr.IndashBlog = {});
(function (d, b, e, a) {
  var c = e.View.extend({
    subviews: {},
    events: {
      "click .post_header .reblog_info": "__reblog_info_clicked",
      "click .post_header .source_info": "__source_info_clicked",
      "click .post_header .reblog_follow_button": "__reblog_follow_clicked",
      "click .post_controls .like": "__like_clicked",
      "click .post_controls .reblog": "__reblog_clicked",
      "click .post_controls .share": "__share_clicked",
      "click .post_controls .reply": "__reply_clicked",
      "click .post_controls .messaging": "__messaging_clicked",
      "click .post_notes": "__notes_clicked",
      "click .post_notes .follow": "__notes_follow",
      "click .post_notes .tumblelog": "__notes_tumblelog_clicked",
      "click .post_notes .avatar_frame": "__notes_tumblelog_clicked",
      "click .post_tag": "__post_tag_clicked",
      "mousedown .post_tag": "__post_tag_mousedown",
      "click .video_preview": "__video_preview_click",
      "click .photo_exif_flipper": "__exif_flip_click",
      "click a.photoset_photo": "__photoset_clicked",
      "click a.panorama": "__panorama_clicked",
      "click a.high_res_link.no_pop": "__no_pop_high_res_photo_clicked",
      "click .post_content a": "__post_content_link_clicked",
      "click .post_content img": "__post_content_img_clicked",
      "click .post_content .external-image-wrapper": "__post_content_external_img_clicked"
    },
    className: "post post_full",
    template: b.template(d("#indash_blog_post_template").html()),
    __reblog_follow_clicked: function (g) {
      g.preventDefault();
      Tumblr.follow({tumblelog: this.model.get("reblogged_from_name"), source: "FOLLOW_SOURCE_REBLOG"});
      var f = d(g.currentTarget);
      f.addClass("active animated poof");
      setTimeout(function () {
        f.addClass("final_state")
      }, 1000)
    },
    __source_info_clicked: function (f) {
      f.preventDefault();
      this._open_link_in_new_tab(d(f.currentTarget).attr("href"))
    },
    __reblog_info_clicked: function (f) {
      f.preventDefault();
      Tumblr.Events.trigger("indashblog:navigate", d(f.currentTarget).data("tumblelogName"))
    },
    __post_content_img_clicked: function () {
      var f = this.$(".inline_external_image");
      b.each(f, this.toggle_external_images, this)
    },
    __post_content_external_img_clicked: function () {
      var f = this.$(".external-image-wrapper");
      b.each(f, this.show_external_image, this)
    },
    __post_tag_mousedown: function (f) {
      if (Tumblr.Flags.bool("peepr_search_and_filter")) {
        f.stopPropagation();
        Tumblr.Events.trigger("peeprsearch:change:term", {term: d(f.currentTarget).data("tag")});
        return
      }
    },
    __post_tag_clicked: function (f) {
      f.preventDefault();
      if (!Tumblr.Flags.bool("peepr_search_and_filter")) {
        this._open_link_in_new_tab(d(f.currentTarget).attr("href"))
      }
    },
    __post_content_link_clicked: function (j) {
      j.preventDefault();
      var h = d(j.currentTarget).attr("href");
      var f = Tumblr.Prima.Url.parseTumblelogUrl(h);
      var i = f.tumblelog_name ? f.tumblelog_name : false;
      var g = f.post_id ? f.post_id : false;
      if (i) {
        Tumblr.Events.trigger("peepr-open-request", {tumblelog_name: i, post_id: g})
      } else {
        this._open_link_in_new_tab(h)
      }
    },
    __no_pop_high_res_photo_clicked: function (f) {
      f.preventDefault();
      f.stopImmediatePropagation();
      this._open_in_photo_lightbox({post: this.model})
    },
    __photoset_clicked: function (f) {
      f.preventDefault();
      f.stopImmediatePropagation();
      this._open_in_photo_lightbox({post: this.model, photoset_index: d(f.currentTarget).data("photosetIndex")})
    },
    __panorama_clicked: function (f) {
      f.preventDefault();
      f.stopImmediatePropagation();
      this._open_in_photo_lightbox({post: this.model})
    },
    __like_clicked: function () {
      this.clicked_flag = true;
      this.model.toggleLike();
      Tumblr.Events.trigger("peepr:like_update", this.model.get("tumblelog"), this.model.toJSON())
    },
    __reblog_clicked: function (f) {
      f.preventDefault();
      if (f.altKey) {
        if (!this.is_reblogged) {
          this.model.fastReblog()
        }
        return
      }
      Tumblr.Events.trigger("indashblog:post:reblog", this.model.toJSON())
    },
    __share_clicked: function (f) {
      this._render_share_popover()
    },
    __reply_clicked: function () {
      this._render_reply_popover()
    },
    __messaging_clicked: function (g) {
      var f = d(g.currentTarget);
      return new Tumblr.Prima.Messaging.SharePost({
        postId: f.attr("data-post-id"),
        blogUuid: f.attr("data-tumblelog-uuid"),
        pinnedTarget: f,
        popoverContainer: this.$el
      }).render()
    },
    __notes_clicked: function (f) {
      Tumblr.Events.trigger("useraction:click:post:notes", {event: f})
    },
    __notes_follow: function (i) {
      i.preventDefault();
      var g = d(i.currentTarget);
      var f = g.closest(".note");
      var j = f.data("tumblelog");
      f.addClass("is_following");
      var h = new Tumblr.Prima.Models.Tumblelog({name: j});
      h.follow()
    },
    __notes_tumblelog_clicked: function (f) {
      f.preventDefault();
      this._open_link_in_new_tab(d(f.currentTarget).attr("href"))
    },
    __video_preview_click: function (f) {
      f.preventDefault();
      this.show_video()
    },
    __exif_flip_click: function (g) {
      g.preventDefault();
      g.stopImmediatePropagation();
      var f = d(g.currentTarget).parents(".flipcard");
      f.addClass("initialized");
      b.defer(function () {
        f.toggleClass("reveal_back")
      })
    },
    _open_link_in_new_tab: function (f) {
      if (f && f.length) {
        window.open(f, "_blank")
      }
    },
    _open_in_photo_lightbox: function (f) {
      Tumblr.Events.trigger("indashblog:post:photo_lightbox", f)
    },
    _update_note_count: function (g) {
      var i = this.$el.find(".post_notes_label");
      var f = i.find(".note_link_current");
      var h;
      if (g) {
        h = f.data("more");
        if (f.data("more") !== f.text()) {
          f.data("less", f.text())
        }
        i.removeClass("no_notes")
      } else {
        h = f.data("less");
        if (h === "0 notes") {
          i.addClass("no_notes")
        }
      }
      f.text(h);
      f.attr("title", h)
    },
    _render_like: function () {
      var h = this.$el.find(".post_control.like");
      var i = (this.clicked_flag) ? h : this.$el;
      var j = this.model.get("liked");
      h.toggleClass("liked", j);
      var f = d('<div class="post_animated_heart post_poof"><span class="heart_left"></span><span class="heart_right"></span></div>').toggleClass("unliked", !j);
      if (!this.clicked_flag) {
        var g = d(window).height();
        if (this.$el.height() > g) {
          f.css("top", g * 0.5)
        }
        if (d(".post_animated_heart").length > 0) {
          var k = 0.2 + (Math.random() * 0.6);
          f.css("left", this.$el.width() * k)
        }
      }
      this._update_note_count(j);
      i.append(f);
      this.clicked_flag = false;
      setTimeout(function () {
        f.fadeOut(200, function () {
          f.remove()
        })
      }, 300)
    },
    _render_reblog_poof: function (g) {
      this.is_reblogged = true;
      var i = d('<div class="post_reblog_poof post_poof"></div>');
      if (g) {
        i.addClass("queue")
      }
      var h = d(window).height();
      if (this.$el.height() > h) {
        i.css("top", h * 0.5)
      }
      this.$el.append(i);
      setTimeout(b.bind(function f() {
        i.fadeOut(200, b.bind(function j() {
          i.remove();
          this._update_reblog_control(g)
        }, this))
      }, this), 300)
    },
    _update_reblog_control: function (f) {
      var g = this.$el.find(".post_control.reblog");
      g.addClass("reblogged");
      if (f) {
        g.addClass("queued")
      }
    },
    _render_reply_popover: function () {
      var g = new Tumblr.ReplyPopover({
        model: this.model,
        el: this.$el.find(".post_controls .reply_popover"),
        glassless: true
      });
      var f = this.$el.find(".post_control.reply");
      g.on("success", function () {
        f.addClass("replied")
      });
      g.on("close", function () {
        f.removeClass("active");
        Tumblr.Events.trigger("indashblog:keycommands:resume")
      });
      g.show();
      Tumblr.Events.trigger("indashblog:keycommands:suspend");
      f.addClass("active")
    },
    _render_share_popover: function () {
      new Tumblr.Prima.SharePopover({
        popoverData: this.model.get("share_popover_data"),
        pinnedTarget: this.$el.find(".post_controls .share"),
        popoverContainer: this.$el
      }).render()
    },
    _add_post_container_classes: function () {
      var f = "";
      f += "is_" + this.model.get("type");
      if (this.model.get("source_url")) {
        f += " has_source generic_source"
      }
      this.$el.addClass(f)
    },
    initialize: function (f) {
      this.options = f || {};
      this.clicked_flag = false;
      this.listenTo(this.model, "like:success", this._render_like);
      this.listenTo(this.model, "unlike:success", this._render_like);
      this.listenTo(this.model, "fastreblog:success", this._render_reblog_poof);
      this.listenTo(this.model, "reblog:success", this._update_reblog_control)
    },
    attributes: function () {
      return {
        "data-post-id": this.model.get("id"),
        "data-tumblelog-key": this.model.get("tumblelog_key"),
        "data-tumblelog-name": this.model.get("tumblelog")
      }
    },
    render: function () {
      this._add_post_container_classes();
      this.$el.html(this.template({model: this.model.toJSON()}));
      var f = this.$("video[data-crt-video]");
      if (f.length) {
        Tumblr.Events.trigger("CrtControl:newPlayer", f, {attributes: {autoplay: true}})
      }
      return this
    },
    make_tags_draggable: function () {
      var f = this.$(".post_tags");
      var g = f.find(".post_tags_inner");
      if (f.width() < g.width()) {
        f.addClass("draggable");
        new Tumblr.DraggableTags({el: f})
      }
    },
    show_video: function () {
      if (this.$(".video_preview").data("render-context") === "blank") {
        this._open_link_in_new_tab(this.model.get("post_url"));
        return false
      }
      var f = this.$(".video_embed_code").val();
      this.$(".video_embed").html(f);
      this.$(".post_chrome").addClass("playing")
    },
    toggle_external_images: function (h) {
      var i = this.$(h);
      var f = i.attr("external_src");
      if (i.hasClass("enlarged")) {
        i.attr("src", i.attr("original_src"));
        i.removeClass("enlarged")
      } else {
        i.attr("original_src", i.attr("src"));
        i.addClass("enlarged");
        if (i.attr("loader")) {
          i.attr("src", i.attr("loader"))
        }
        var g = new Image();
        g.onload = function () {
          i.attr("src", f)
        };
        g.src = f
      }
    },
    show_external_image: function (k) {
      var j = this.$(k);
      var f = j.data("src");
      var g = j.data("loading-text");
      var i = d("<img>");
      var h = d("<p>");
      h.append(i);
      j.html(g);
      i.load(function () {
        j.replaceWith(h)
      });
      i.attr("src", f)
    }
  });
  a.PostView = c
})(jQuery, _, Backbone, Tumblr.IndashBlog);
/*! scripts/search/views/blogs/indash_tumblelog_compact.js */
(function (b, a) {
  a.Search || (a.Search = {});
  var c = a.IndashBlog.HeaderCompact.extend({
    className: "indash_blog indash_tumblelog_compact",
    events: function () {
      return _.extend({}, a.IndashBlog.HeaderCompact.prototype.events, {
        "click .indash_header_wrapper .customize_button": "__on_customize_click",
        "click .indash_header_wrapper": "_on_blog_click"
      })
    },
    subviews: [],
    defaults: {
      follow_data: {source: "FOLLOW_SOURCE_SEARCH_RESULTS_BLOG_CAROUSEL"},
      unfollow_data: {source: "UNFOLLOW_SOURCE_SEARCH_RESULTS_BLOG_CAROUSEL"},
      hide_posts_on_unfollow: false,
      include_posts: false,
      template_data: {
        show_navigation: true,
        show_user_controls: a.Flags.bool("is_logged_in"),
        show_share_controls: false,
        show_follow_button: true,
        popover: false
      },
      strip_description_line_breaks: true,
      fade_in: true,
      include_info_popover: true
    },
    initialize: function (d) {
      this.options = _.defaults({}, d, this.defaults);
      this.options.follow_data.source = this.defaults.follow_data.source;
      this.options.unfollow_data.source = this.defaults.unfollow_data.source;
      this.options.on_render = _.bind(this._setup_posts, this);
      if (this.options.fade_in) {
        this.$el.addClass("hidden fade_in")
      }
      a.IndashBlog.HeaderCompact.prototype.initialize.call(this, this.options)
    },
    render: function () {
      setTimeout(_.bind(function () {
        this.$el.removeClass("hidden")
      }, this), 100);
      a.IndashBlog.HeaderCompact.prototype.render.call(this);
      return this
    },
    _on_blog_click: function (k) {
      if (b(k.target).closest(".indash_header_wrapper .navigation").length) {
        return
      }
      k.preventDefault();
      var i = "blog_carousel";
      var f = b(k.target).parents(".post").data("post-id");
      var h = this.model.get("name");
      var j = this.options.blog_position;
      var d = b(k.target).closest("[data-context-path]").data("context-path");
      if (f) {
        i += "_post"
      }
      var g = {is_blog: true, blog_name: h, initiator: i, blog_position: j, post_id: f, context_path: d};
      if (a.Search.SearchSessionLog) {
        a.Search.SearchSessionLog.trigger("lightbox", g)
      }
      if (a.SearchLightbox) {
        a.SearchLightbox.show(this.model, g)
      }
      a.Events.trigger("search:blog:click:posts_click", this.ads_generate_payload("posts"));
      a.Events.trigger("Capture:push", "search_page_usage", "lightbox", g)
    },
    ads_generate_payload: function (d) {
      return {loggingData: {postData: {"serve-id": this.model.get("pt"), pt: this.model.get("pt")}, userAction: d}}
    },
    show_posts: function () {
      if (this.$(".recent_posts")) {
        this.$el.addClass("show_posts")
      }
    },
    hide_posts: function () {
      this.$el.removeClass("show_posts")
    },
    _setup_posts: function () {
      this.subviews.highlighted_posts = new a.TumblelogPopover.Posts({
        model: this.model,
        on_bottom: true,
        parent: this.$el.find(".indash_header_wrapper")
      })
    },
    __on_customize_click: function (g) {
      var f = b(g.currentTarget);
      var d = f.data("url");
      if (d) {
        g.preventDefault();
        g.stopPropagation();
        window.open(d)
      }
    }
  });
  a.Search.indashTumblelogCompactView = c
})(jQuery, Tumblr);
/*! scripts/posts/collections/posts.js */
(function (b) {
  var a = Backbone.Collection.extend({
    model: Tumblr.Prima.Models.Post, initialize: function () {
      this.on("change:liked", this.updateLikeStatus, this);
      this.on("ignore:success", this.dismiss, this);
      this.on("unfollow:success", this.dismiss, this)
    }, updateLikeStatus: function (c, d) {
      var e = this.whereBy({liked: !d, root_id: c.get("root_id")});
      e.invoke("set", {liked: d});
      if (c.get("liked")) {
        e.invoke("trigger", "like:success")
      } else {
        e.invoke("trigger", "unlike:success")
      }
    }, dismiss: function (c) {
      this.whereBy({tumblelog: c.get("tumblelog"), sponsored: false}).invoke("dismiss")
    }, whereBy: function (c) {
      return new a(this.where(c))
    }
  });
  Tumblr.Posts = new a()
})(jQuery);
/*! scripts/posts/views/posts_view.js */
(function (c) {
  var a = Tumblr.Events;
  var b = Tumblr.Flags("is_logged_in");
  Tumblr.PostsView = Backbone.View.extend({
    el: "#posts", initialize: function () {
      this.collection = Tumblr.Posts;
      this.postViews = [];
      this.trendingExplorePosts = [];
      this.form_key = c("#tumblr_form_key").attr("content");
      this.createPosts();
      this.listenTo(Tumblr.AutoPaginator, "after", this.createPosts);
      this.listenTo(a, "posts:load", this.createPosts);
      this.listenTo(a, "post:like", this.likePostById);
      this.listenTo(a, "post:fastreblog", this.fastReblogById);
      this.listenTo(a, "post:embed:focus", this.embedFocus);
      this.listenTo(a, "post:form:success", this.postFormSubmit);
      this.listenTo(a, "post:view:create", this.createPostView)
    }, createPosts: function () {
      _.forEach(this.$el.find(".post[data-json]:not([data-view-exists])"), this.createPost, this);
      this.logExploreTrending()
    }, createPostView: function (f, g) {
      var e = this.createPostModelFromEl(f);
      var d = new Tumblr.PostView({el: f, model: e});
      if (_.isFunction(g)) {
        g(d, e)
      }
    }, createPostModelFromEl: function (d) {
      return new Tumblr.Prima.Models.Post(d.data("json"))
    }, createPost: function (h) {
      var d = c(h);
      var g = this.createPostModelFromEl(d);
      var e = b(function () {
        var i = (g.get("type") === "fan_mail") ? Tumblr.FanMailView : Tumblr.PostView;
        return new i({el: d, model: g})
      }, function () {
        return new Tumblr.PostViewLoggedOut({el: d, model: g})
      });
      this.collection.add(g);
      this.postViews.push(e);
      if (Tumblr.Prima && Tumblr.Prima.Events && (g.get("type") === "video")) {
        var f = d.find("video[data-crt-video]");
        if (f.length) {
          Tumblr.Prima.Events.trigger("CrtControl:newPlayer", f, {attributes: {autoplay: true}})
        }
      }
      d.attr("data-view-exists", true);
      Tumblr.Events.trigger("postsView:createPost", e);
      if (e.$(".explore-trending-badge").length) {
        this.trendingExplorePosts.push(g)
      }
      return e
    }, likePostById: function (e, d) {
      d = d || "mouse";
      this.collection.get(e).like(d)
    }, fastReblogById: function (e, d) {
      this.collection.get(e).fastReblog(d)
    }, embedFocus: function (e) {
      var d = this.collection.get(e.embedData.post_id);
      if (!_.isEmpty(d)) {
        d.embedFocus()
      }
    }, postFormSubmit: function (e) {
      var d;
      var f;
      if (e && e.reblog) {
        d = this.collection.get(e.reblog_id);
        if (!_.isEmpty(d)) {
          if (parseInt(e["post[state]"], 10) === 1) {
            return
          }
          if (e["post[state]"] === "on.2" || parseInt(e["post[state]"], 10) === 2) {
            f = true
          }
          d.updateReblogControl(f)
        }
      }
    }, logExploreTrending: function () {
      if (!this.trendingExplorePosts.length) {
        return
      }
      Tumblr.Events.trigger("explore-trending:badge-serve", {loggingData: {post_ids: _.pluck(this.trendingExplorePosts, "id")}});
      this.trendingExplorePosts = []
    }
  });
  c(function () {
    Tumblr.postsView = new Tumblr.PostsView()
  })
})(jQuery);
/*! scripts/posts/views/reply_popover.js */
(function (a) {
  Tumblr.ReplyPopover = Tumblr.PopoverWithForm.extend({
    template: "#post_reply_form",
    events: {"input textarea": "check_form_state", "keydown textarea": "on_keydown"},
    initialize: function (b) {
      this.options = b || {};
      var c = _.template(a(this.template).html());
      this.$el.html(c());
      this.submit_button = this.$("button");
      this.textarea = this.$("form textarea");
      this.check_form_state();
      this.is_empty = true;
      _.extend(this.options, {on_hide: this.on_hide, on_show: this.on_show});
      Tumblr.PopoverWithForm.prototype.initialize.apply(this, arguments)
    },
    on_keydown: function (b) {
      this.check_form_state();
      if (!this.is_empty && (b.ctrlKey || b.metaKey) && b.which === 13) {
        b.preventDefault();
        this.submit_form()
      }
    },
    check_form_state: function () {
      this.is_empty = (this.textarea[0].value.length === 0);
      this.submit_button.attr("disabled", this.is_empty)
    },
    on_show: function () {
      this.position()
    },
    on_hide: function () {
      this.trigger("close");
      this.$el.removeClass("active")
    },
    submit_form: function (c) {
      if (c) {
        c.preventDefault()
      }
      this.submit_button.attr("disabled", true);
      this.submit_button.html(this.submit_button.data("label-loading"));
      var b = this.model.reply(this.textarea.val());
      b.then(_.bind(this.on_success, this), _.bind(this.on_error, this))
    },
    on_success: function () {
      this.model.set("replied_to", true);
      this.trigger("success");
      this.$el.find("button").attr("disabled", false);
      this.$el.find("textarea").val("");
      this.hide();
      this.submit_button.html(this.submit_button.data("label"))
    },
    on_error: function (b) {
      if (b && b.status === 403) {
        this.on_success()
      }
    }
  })
})(jQuery);
/*! scripts/posts/views/sponsor_popover.js */
(function (a) {
  Tumblr.SponsorPopover = Tumblr.Popover.extend({
    events: {"click .post_control.add": "add",}, initialize: function (b) {
      this.options = b || {};
      _.extend(this.options, {on_show: this.on_show, disable_auto_show: true});
      Tumblr.Popover.prototype.initialize.apply(this, arguments)
    }, add: function (b) {
      this.hide();
      this.$el.removeClass("active");
      this.trigger("action:add", b);
      if (Tumblr.PostForms) {
        b.preventDefault()
      }
    }, on_show: function () {
      this.position()
    }
  })
})(jQuery);
/*! scripts/posts/views/creator_popover.js */
(function (a) {
  Tumblr.CreatorPopover = Tumblr.Popover.extend({
    events: {
      "click .post_control.delete": "delete",
      "click .post_control.edit": "edit",
      "click .post_control.edit_yvp": "edit",
      "click .post_control.queue": "queue"
    }, initialize: function (b) {
      this.options = b || {};
      _.extend(this.options, {on_show: this.on_show, disable_auto_show: true});
      Tumblr.Popover.prototype.initialize.apply(this, arguments)
    }, "delete": function () {
      this.hide();
      this.$el.removeClass("active")
    }, edit: function (b) {
      this.hide();
      this.$el.removeClass("active");
      if (a(b.currentTarget).is(".edit_yvp")) {
        this.trigger("action:edit_yvp", b)
      } else {
        this.trigger("action:edit", b)
      }
      if (Tumblr.PostForms) {
        b.preventDefault()
      }
    }, queue: function () {
      this.hide()
    }, on_show: function () {
      this.position()
    }
  })
})(jQuery);
/*! scripts/posts/views/promote_tag_view.js */
(function (b) {
  var a = window.l10n_str || {};
  Tumblr.PromoteTagView = Backbone.View.extend({
    events: {
      "click .promote_post a": "promote",
      "change select.promotable_tags": "promote_select"
    }, button_count: 5, initialize: function () {
      this.listenTo(this.model, "promote:success", this.update_tag_count);
      this.render()
    }, render: function () {
      this.$el.html(this.template())
    }, promote: function (e) {
      var c = b(e.currentTarget);
      var d = this.model.promote(c.data("tag"));
      c.addClass("loading");
      d.always(c.removeClass.bind(c, "loading"));
      if (Tumblr.Popover) {
        Tumblr.Popover.hide_all()
      }
    }, update_tag_count: function (c) {
      for (var d = 0; d < window.promotable_tags.length; d++) {
        if (window.promotable_tags[d].tag === c) {
          window.promotable_tags[d].promote_diff -= 1
        }
      }
      this.render()
    }, promote_select: function () {
      if (Tumblr.Popover) {
        Tumblr.Popover.hide_all()
      }
    }, show: function () {
      this.$el.show();
      this.$el.removeClass("hidden")
    }, hide: function () {
      this.$el.hide();
      this.$el.addClass("hidden")
    }, template: function () {
      var c = _.compact(this.$el.data("promotion-warnings").split(";;"));
      var d = "";
      d += "<ul>";
      d += '<li class="popover_sub_header promote_post_header">Promote</li>';
      if (window.promotable_tags.length > this.button_count) {
        d += '<div class="promote_select_wrapper">';
        d += '<select class="popover_menu_item promotable_tags">';
        d += '<option value="">' + a.promote_this_post_in + "</option>"
      }
      _.each(window.promotable_tags, function (e, g) {
        var f = (e.promote_diff < 0) ? "" : " (" + e.promote_diff + ")";
        if (e.promote_diff === 0) {
          c.push(a.promote_warning_none.replace("%1$s", e.title))
        }
        if (window.promotable_tags.length > this.button_count) {
          d += '<option value="' + e.tag + '">' + window.promotable_tags[g].title + f + "</option>"
        } else {
          d += '<li class="popover_menu_item promote_post">';
          d += '<a data-tag="' + e.tag + '" href="#">';
          d += window.promotable_tags[g].title + f;
          d += "</a>";
          d += "</li>"
        }
      }, this);
      if (window.promotable_tags.length > this.button_count) {
        d += "</select>";
        d += "</div>"
      }
      if (c.length) {
        d += '<div class="promote_pane_warnings">';
        _.each(c, function (e) {
          d += '<div class="warning">' + e + "</div>"
        });
        d += "</div>"
      }
      d += "</ul>";
      return d
    }
  })
})(jQuery);
/*! scripts/posts/views/admin_popover.js */
(function (a) {
  Tumblr.AdminPopover = Tumblr.Popover.extend({
    events: {
      "click .post_control.unpromote": "unpromote",
      "click .post_control.remove_source": "remove_source"
    }, initialize: function (b) {
      this.options = b || {};
      _.extend(this.options, {on_show: this.on_show, on_hide: this.on_hide, disable_auto_show: true, glassless: true});
      if (window.promotable_tags && window.promotable_tags.length) {
        this.promote_tag_view = new Tumblr.PromoteTagView({
          el: this.$(".promote_pane"),
          model: this.model,
          tags: window.promotable_tags
        });
        this.promote_tag_view.show()
      }
      this.listenTo(this.model, "remove_source:failure", this.error);
      Tumblr.Popover.prototype.initialize.apply(this, arguments)
    }, on_show: function () {
      this.position()
    }, remove_source: function () {
      this.hide();
      this.model.removeSource()
    }, on_hide: function () {
    }, error: function () {
      Tumblr.Dialog.alert("Error removing source from this post")
    }, promote: function (b) {
      b.preventDefault();
      if (!(this.promote_tag_view instanceof Tumblr.PromoteTagView)) {
        this.promote_tag_view = new Tumblr.PromoteTagView({
          el: this.$(".promote_pane"),
          model: this.model,
          tags: window.promotable_tags
        })
      }
      this.promote_tag_view.show()
    }, unpromote: function (d) {
      var b = a(d.currentTarget);
      var c = this.model.unpromote(b.data("tag"));
      b.addClass("loading");
      c.always(b.removeClass.bind(b, "loading"))
    },
  })
})(jQuery);
/*! scripts/posts/views/post_view.js */
(function (e) {
  var b = Tumblr.Events;
  var f = Tumblr.Lightbox;
  var d = Tumblr.Flags;
  var a = Tumblr.Cookie;
  var c = window.l10n_str || {};
  Tumblr.PostView = Backbone.View.extend({
    events: {
      "click .post_control.like:not(.liked)": "like",
      "click .post_control.liked": "unlike",
      "click .post_control.reblog": "reblog",
      "click .post_control.reply": "reply",
      "click .post_control.block": "ignore",
      "click .post_control.message-controls": "messageControls",
      "click .post_control.publish": "publish",
      "click .post_control.queue": "queue",
      "click .post_control.queue_submission": "queue_submission",
      "click .post_control.edit.submission": "edit",
      "click .post_control.delete": "delete",
      "click .post_control.delete_yvp": "delete_yvp",
      "click .post_control.approve": "approve",
      "click .post_control.post_control_menu.creator": "creator_popover",
      "click .post_control.post_control_menu.sponsor": "sponsor_popover",
      "click .post_control.post_control_menu.admin": "admin_popover",
      "click .post_control.messaging": "messaging_click",
      "click .post_control.deny": "deny",
      "click .note .follow": "note_follow",
      "click .photo_reply_image_container": "photo_reply_click",
      'click .reblog_follow_button:not(".onboard")': "handle_tiny_grey_plus_follow_button",
      "click [data-post-action]": "_click_post_action",
      "click .post_media": "media_click",
      "click .post_body .read_more": "read_more_click",
      "click .post_body a:not(.read_more)": "caption_click",
      "click .post_permalink": "permalink_click",
      "click .post_control.share_social_button": "share_click",
      'click .popover_menu_item a[data-share-type="email"]': "share_menu_email",
      'click .popover_menu_item a[data-share-type="twitter"]': "share_menu_twitter",
      'click .popover_menu_item a[data-share-type="facebook"]': "share_menu_facebook",
      'click .popover_menu_item a[data-share-type="permalink"]': "share_menu_permalink",
      "click .post_media_photo_anchor": "photo_lightbox",
      "click .post_control.ask_answer": "ask_answer",
      "click .post_avatar_link": "avatar_click",
      "click .post_source_link": "source_click",
      "click .post_tag": "tag_click",
      "click .recommendation-reason-link": "trending_badge_click",
      "click .note_link_current": "notes_click",
      "click .post_info_fence > .post_info_link": "blogname_click",
      "click .cpi_install_button": "install_click",
      "click .post_content a": "content_link_click"
    }, initialize: function () {
      this.controls = {};
      this.controls.like = this.$el.find(".post_control.like");
      this.controls.reblog = this.$el.find(".post_control.reblog");
      this.note_count = this.$el.find(".note_count");
      this.tagsDraggable();
      this.checkForVendor();
      if (this.model.get("is_reblog")) {
        this._bindReblogTrailEvents()
      }
      if (this.model.get("accepts-answers")) {
        this.setupAnswerForm()
      }
      this.like_heart_timeout = null;
      this.is_click_trigger = false;
      this.is_reblogged = false;
      this.stopListening();
      this.listenTo(this.model, "like:set", this.updateLikeStatus);
      this.listenTo(this.model, "unlike:set", this.updateLikeStatus);
      this.listenTo(this.model, "like:set", _.bind(this.updateNoteCount, this, true));
      this.listenTo(this.model, "unlike:set", _.bind(this.updateNoteCount, this, false));
      this.listenTo(Tumblr.Events, "tumblelog:unfollow", function (g) {
        if (!this.model.get("sponsored") && g.name === this.model.get("tumblelog")) {
          this.destroy()
        }
      });
      this.listenTo(this.model, "destroy:success", this.destroy);
      this.listenTo(this.model, "dismiss", this.destroy);
      this.listenTo(this.model, "publish:success", this.destroy);
      this.listenTo(this.model, "queue:success", this.destroy);
      this.listenTo(this.model, "unpromote:success", this.destroy);
      this.listenTo(this.model, "deny:success", this.destroy);
      this.listenTo(this.model, "approve:success", this.destroy);
      this.listenTo(this.model, "publish:failure", this.failure);
      this.listenTo(this.model, "promote:failure", this.alert);
      this.listenTo(this.model, "answer:success", this.answer);
      this.listenTo(this.model, "answer:forbidden", this.answer);
      this.listenTo(this.model, "fastreblog:success", this.updateReblog);
      this.listenTo(this.model, "fastreblog:ajax:success", this.notifyFastReblog);
      this.listenTo(this.model, "remove_source:success", this.hidePost);
      this.listenTo(this.model, "embed:focus", this.excludeFromGhostlist);
      this.listenTo(this.model, "reblog:success", this.updateReblogControl);
      this.listenTo(b, "TumblelogPopover:follow", this._on_tumblelog_popover_follow);
      this.listenTo(b, "peepr:like_update", this._on_external_like_update);
      this.listenTo(b, "fastreblog:success", this.onExternalFastReblog);
      this.modelForTinyGreyFollowButton = this.model.parentTumblelog || this.model.tumblelog;
      if (this.modelForTinyGreyFollowButton) {
        this.modelForTinyGreyFollowButton.on("change:following", this.updateParentTumblelogFollow, this)
      }
      if (Tumblr.Capture && (this.model.get("sponsored") || this.model.get("pt"))) {
        this.capture_web_instream = new Tumblr.Capture.WebInStream({el: this.$el})
      }
      this.current_link = true;
      this.less_link = false;
      this.more_link = false;
      _.result(this, "initialize_type_" + this.model.get("type"))
    }, _bindReblogTrailEvents: function () {
      this.$reblog_list = this.$el.find(".reblog-list");
      this.$reblog_list.on("click", ".reblog-tumblelog-name", _.bind(this._onReblogTrailEvent, this, "reblogtrail_tumblelog_name"));
      this.$reblog_list.on("click", ".reblog-avatar", _.bind(this._onReblogTrailEvent, this, "reblogtrail_tumblelog_avatar"));
      this.$reblog_list.on("click", ".external-image-wrapper", _.bind(this._onReblogTrailEvent, this, "reblogtrail_external_image"));
      this.$reblog_list.on("click", ".tmblr-truncated-link", _.bind(this._onReblogTrailEvent, this, "reblogtrail_truncated_link"))
    }, _onReblogTrailEvent: function (i, h) {
      var g = h.type;
      var j = "ReblogTrail:" + g + ":" + i;
      if (this.model.get("pt")) {
        b.trigger(j, {model: this.model, loggingData: this.loggingData({userAction: i})})
      }
    }, _click_post_action: function (k) {
      k.preventDefault();
      var g = e(k.currentTarget);
      var j = g.data();
      var i = j.postAction;
      var h = "_post_action_";
      var l = h + i;
      if (_.isFunction(this[l])) {
        this[l].call(this, j, g)
      }
    }, _post_action_remove: function () {
      this._handle_pinned_post_dismissal();
      this.destroy();
      if (this.model.get("is_recommended")) {
        var g = this.model.get("recommendation_reason");
        var h = g && g.icon === "search" ? "followed_search" : "recommended";
        this._log_recommendation_dismissal(h)
      }
    }, _post_action_follow: function (j, h) {
      var l = this.model.tumblelog;
      var i = j.postActionSource || false;
      var k = h.hasClass("worded-follow-button");
      var g = (k) ? h : this.$(".follow");
      l.save_following({following: true}, {source: i, pt: this.model.get("pt")}).fail(function () {
        Tumblr.Dialog.alert(c.ajax_error)
      });
      this.$el.addClass("is_followed");
      g.addClass((k) ? "" : "follow_poof")
    }, _on_tumblelog_popover_follow: function (g) {
      if (this.model.tumblelog && this.model.tumblelog.get("name") === g) {
        this.$el.addClass("is_followed popover_open");
        this.$el.find(".follow").addClass("follow_poof");
        this.listenToOnce(b, "TumblelogPopover:hide", function () {
          this.$el.removeClass("popover_open")
        })
      }
    }, _on_external_like_update: function (h, g) {
      if (this.model.get("root_id") === g.root_id) {
        this.controls.like.toggleClass("liked", g.liked);
        this.updateNoteCount(g.liked)
      }
    }, _hide_posts: function (g) {
      if (!g) {
        g = {tumblelog: this.model.get("tumblelog"), sponsored: false}
      }
      Tumblr.Posts.whereBy(g).invoke("dismiss")
    }, photo_lightbox: function (j) {
      if ((!j && window.event && (window.event.metaKey || window.event.altKey)) || (j && (j.metaKey || j.altKey))) {
        return true
      }
      var g = e(j.currentTarget), i = g.data("big-photo"), h = g.find(".image").attr("src");
      if (i && h) {
        j.preventDefault();
        f.init([{high_res: i, low_res: h}])
      }
    }, ask_answer: function (m) {
      m.preventDefault();
      var k = window.tinyMCE || false;
      var n = e(m.currentTarget);
      var o = n.closest(".post");
      var h = o.find(".post_ask_answer_form");
      var r = o.find(".post_ask_answer_field");
      var p = r.attr("id");
      h.show();
      o.find(".post_footer").hide();
      n.hide();
      r.focus();
      if (d.bool("prima_post_forms")) {
        var g = function () {
          Tumblr.KeyCommands.suspend()
        };
        var i = function () {
          Tumblr.KeyCommands.resume()
        };
        if (!this.richTextEditor) {
          var q = new Tumblr.Prima.PostForms.Post({type: "note", ask: o.find(".post_body").eq(0).html()});
          this.richTextEditor = new Tumblr.Prima.RichTextEditorView({
            placeholder: c.write_a_response || "Your answer here",
            ariaLabel: c.write_a_response || "Your answer here",
            className: "ask-answer-field",
            supportImageSearch: true,
            model: q,
            name: "answer",
            post: q
          });
          this.listenTo(q, "change:answer", function (s, t) {
            t = t.replace(/src=\"data:[^\"]*\">/gi, "");
            r.val(t)
          });
          this.listenTo(q, "change validate", function () {
            e("#ask_publish_button_" + o.attr("data-post-id")).prop("disabled", !q.isValid())
          });
          r.after(this.richTextEditor.render().$el).hide()
        }
        e(this.richTextEditor.editor.element).focus(g).blur(i);
        this.richTextEditor.focus()
      } else {
        if (k) {
          if (k.get(p)) {
            k.execInstanceCommand(p, "mceFocus")
          } else {
            Tumblr.Editor.render(p, {
              skin: "bluth",
              custom_css: "/assets/styles/custom_tinymce_bluth.css",
              layout: "bold,italic,strikethrough,link,unlink,numlist,bullist,pagebreak,image,image_upload,blockquote,code",
              plugins: "autoresize,safari,pagebreak,ajax_forms,image_upload,tumblr_popovers,mention,paste",
              resize: true,
              immediate: true,
              focus: true
            });
            var l = e("#regular_image_upload");
            var j = new Tumblr.PostForms.RegularModel();
            j.init_uploader(l);
            j.on("change:upload_complete", function (u) {
              var t = k.get(p);
              var v = u.response[0].url;
              var s = new Image();
              e(s).one("load", _.bind(function (w) {
                e(s).off();
                t.execCommand("mceInsertContent", false, '<img src="' + v + '" />');
                t.execCommand("mceInsertContent", false, "<p>");
                setTimeout(function () {
                  t.execCommand("mceAutoResize")
                }, 100)
              }, this)).one("error", function (w) {
                e(s).off()
              });
              s.src = v
            }, this);
            this.listenTo(Tumblr.Editor, "tinymce.image_upload.click", function () {
              l.trigger("click")
            })
          }
          k.onAddEditor.add(function (t, s) {
            s.onKeyDown.add(function (u, v) {
              if (v.keyCode === 18) {
                if (Tumblr.inbox && _.isFunction(Tumblr.inbox.show_all_queue_and_draft)) {
                  Tumblr.inbox.show_all_queue_and_draft()
                }
              }
            });
            s.onKeyUp.add(function (u, v) {
              if (v.keyCode === 18) {
                if (Tumblr.inbox && _.isFunction(Tumblr.inbox.hide_all_queue_and_draft)) {
                  Tumblr.inbox.hide_all_queue_and_draft()
                }
              }
            })
          })
        }
      }
    }, _log_recommendation_dismissal: function (g) {
      e.ajax({
        method: "POST",
        url: "/svc/search/log_dismissal",
        data: {tumblelog_name: this.model.get("tumblelog"), post_id: this.model.get("id"), type: g,},
        with_form_key: true
      })
    }, _handle_pinned_post_dismissal: function () {
      var i = this.$el;
      var h = !!(i.data("isPinned"));
      var g = 7 * 24 * 60 * 60;
      if (!h) {
        return
      } else {
        a.set("post_dismissed", this.model.get("id"), g);
        b.trigger("useraction:dismiss:pinned_post", {
          model: this.model,
          loggingData: this.loggingData({userAction: "post_dismissal"})
        })
      }
    }, edit: function (h) {
      var g = {
        type: this.model.get("type"),
        edit: true,
        channel_id: this.model.get("tumblelog"),
        post_id: this.model.get("id"),
        endpoint: this.model.get("type"),
        attach_to: this.$el,
        previous_content_selector: this.$(".post_wrapper"),
        adjust_offset: true
      };
      if (d.bool("prima_post_forms")) {
        h.preventDefault();
        b.trigger("postForms:edit", {postEl: g.attach_to, editId: g.post_id, channelId: g.channel_id})
      } else {
        if (Tumblr.PostForms) {
          Tumblr.PostForms.edit(g)
        }
      }
    }, edit_yvp: function (g) {
      g.preventDefault();
      location.href = "https://extra.tumblr.com/" + this.model.get("tumblelog") + "/video/" + this.model.get("id") + "/edit"
    }, "delete": function (h) {
      h.preventDefault();
      var g = e(h.currentTarget).data("confirm");
      Tumblr.Dialog.confirm(g, _.bind(this.model.destroy, this.model))
    }, delete_yvp: function (g) {
      g.preventDefault();
      location.href = "https://extra.tumblr.com/" + this.model.get("tumblelog") + "/video/" + this.model.get("id") + "/delete"
    }, deny: function (h) {
      h.preventDefault();
      var g = e(h.currentTarget).data("confirm");
      Tumblr.Dialog.confirm(g, _.bind(function () {
        this.destroy();
        this.model.deny()
      }, this))
    }, approve: function (h) {
      h.preventDefault();
      var g = e(h.currentTarget).data("confirm");
      Tumblr.Dialog.confirm(g, _.bind(this.model.approve, this.model, false))
    }, queue: function (h) {
      h.preventDefault();
      var g = e(h.currentTarget).data("confirm");
      Tumblr.Dialog.confirm(g, _.bind(this.model.queue, this.model))
    }, queue_submission: function (h) {
      h.preventDefault();
      var g = e(h.currentTarget).data("confirm");
      Tumblr.Dialog.confirm(g, _.bind(this.model.approve, this.model, true))
    }, sponsor_popover: function (g) {
      if (g.target !== g.currentTarget) {
        return
      }
      var h = e(g.currentTarget);
      if (!(this.sponsorPopover instanceof Tumblr.SponsorPopover)) {
        this.sponsorPopover = new Tumblr.SponsorPopover({
          model: this.model,
          el: e(g.target),
          glassless: true,
          on_hide: _.bind(function () {
            h.removeClass("active")
          }, this)
        });
        this.sponsorPopover.on("action:edit", _.bind(this.edit, this))
      }
      h.addClass("active");
      this.sponsorPopover.show()
    }, creator_popover: function (g) {
      if (g.target !== g.currentTarget) {
        return
      }
      var h = e(g.currentTarget);
      if (!(this.creatorPopover instanceof Tumblr.CreatorPopover)) {
        this.creatorPopover = new Tumblr.CreatorPopover({
          model: this.model,
          el: e(g.target),
          glassless: true,
          on_hide: _.bind(function () {
            h.removeClass("active")
          }, this)
        });
        this.creatorPopover.on("action:edit", _.bind(this.edit, this));
        this.creatorPopover.on("action:edit_yvp", _.bind(this.edit_yvp, this))
      }
      h.addClass("active");
      this.creatorPopover.show()
    }, admin_popover: function (g) {
      if (g.target !== g.currentTarget) {
        return
      }
      if (!(this.adminPopover instanceof Tumblr.AdminPopover)) {
        this.adminPopover = new Tumblr.AdminPopover({model: this.model, el: e(g.target)})
      }
      this.adminPopover.show()
    }, like: function (g) {
      g.preventDefault();
      this.is_click_trigger = true;
      this.model.like("mouse")
    }, unlike: function (g) {
      g.preventDefault();
      this.is_click_trigger = true;
      this.model.unlike()
    }, reply: function (g) {
      var h = e(g.currentTarget);
      if (!(this.replyPopover instanceof Tumblr.ReplyPopover)) {
        this.replyPopover = new Tumblr.ReplyPopover({model: this.model, el: h, glassless: true});
        this.replyPopover.on("success", function () {
          h.addClass("replied")
        });
        this.replyPopover.on("close", function () {
          h.removeClass("active")
        })
      }
      h.addClass("active");
      this.replyPopover.show()
    }, publish: function (h) {
      h.preventDefault();
      var g = e(h.currentTarget).data("confirm");
      Tumblr.Dialog.confirm(g, _.bind(this.model.publish, this.model))
    }, reblog: function (h) {
      var g = {};
      if (h.altKey && !this.model.reblogged) {
        h.preventDefault();
        this.is_click_trigger = true;
        return this.fastReblog(h)
      }
      if (this.is_reblogged) {
        return
      }
      g = {
        type: this.model.get("type"),
        channel_id: this.model.get("tumblelog"),
        reblog_id: this.model.get("id"),
        endpoint: this.model.get("type"),
        detached: true,
        reblog: true,
        animate_from: this.$el,
        reblog_key: this.model.get("reblog_key"),
        previous_content_selector: null,
        is_recommended: this.model.get("is_recommended"),
        reblog_source: this.model.get("reblog_source"),
        placement_id: this.model.get("placement_id"),
        pt: this.model.get("pt")
      };
      if (d.bool("prima_post_forms")) {
        h.preventDefault();
        b.trigger("postForms:reblog", {
          postEl: g.animate_from,
          pt: g.pt,
          reblogId: g.reblog_id,
          reblogKey: g.reblog_key,
          reblogSource: g.reblog_source
        })
      } else {
        if (Tumblr.PostForms) {
          h.preventDefault();
          Tumblr.PostForms.edit(g)
        }
      }
    }, fastReblog: function (g) {
      g.stopPropagation();
      g.preventDefault();
      if (!this.is_reblogged) {
        this.model.fastReblog()
      }
    }, notifyFastReblog: function (h) {
      if (typeof Tumblr.Toaster === "object" && typeof Tumblr.ToastKit === "object") {
        var g = Tumblr.ToastKit.notification_center_convert(h.message, {
          url: h.post_tumblelog.post_url,
          tumblelog: {name: h.post_tumblelog.name_or_id, url: h.post_tumblelog.url, avatar: h.post_tumblelog.avatar}
        });
        Tumblr.Toaster.add_toast(g)
      }
    }, note_follow: function (i) {
      i.preventDefault();
      i.stopPropagation();
      var h = e(i.currentTarget);
      var g = h.closest(".note");
      var j = g.data("tumblelog");
      g.addClass("is_following");
      Tumblr.follow({tumblelog: j, source: "FOLLOW_SOURCE_NOTES_POPOVER"}, {
        success: function () {
          Tumblr.Events.trigger("follow_tumblelog", {tumblelog: j})
        }
      })
    }, handle_tiny_grey_plus_follow_button: function () {
      if (!this.modelForTinyGreyFollowButton) {
        if (Tumblr.Flags.bool("is_dev")) {
          console.error("Follow Parent Tumblelog Failed -- No Parent Tumblelog Model")
        }
        return false
      }
      this.modelForTinyGreyFollowButton.save_following({following: true}, {
        source: this.getFollowReblogSource(),
        placement_id: this.model.get("placement_id"),
        pt: this.model.get("pt")
      }).done(_.bind(function () {
        if (this.capture_web_instream) {
          this.capture_web_instream.track_follow(true)
        }
      }, this)).fail(function () {
        Tumblr.Dialog.alert(c.ajax_error)
      });
      return false
    }, getFollowReblogSource: function () {
      var g = "FOLLOW_SOURCE_REBLOG";
      var h = document.body.id;
      if (this.model.get("is_docked")) {
        g = "FOLLOW_SOURCE_REBLOG_DOCKED_POST"
      } else {
        if (h === "dashboard_posts_likes") {
          g = "FOLLOW_SOURCE_REBLOG_LIKES"
        } else {
          if (h === "tagged_display") {
            g = "FOLLOW_SOURCE_REBLOG_TAGGED"
          } else {
            if (h === "pagebox_layout") {
              g = "FOLLOW_SOURCE_SEARCH_LIGHTBOX"
            } else {
              if (e("body").hasClass("tablet")) {
                g = "FOLLOW_SOURCE_REBLOG_TABLET"
              }
            }
          }
        }
      }
      return g
    }, messageControls: function (j) {
      j.preventDefault();
      var g = e(j.currentTarget);
      var h = {post: this, pinnedTarget: j.currentTarget, blockString: g.data("block-tumblelog")};
      var i = new Tumblr.Prima.MessageControlsPopover(h);
      i.render()
    }, ignore: function (j) {
      j.preventDefault();
      if (!Tumblr.TumblelogActions) {
        return
      }
      var h = "";
      if (_.has(this.model.get("tumblelog-data"), "avatar_url")) {
        h = this.model.get("tumblelog-data").avatar_url
      } else {
        if (this.$(".post_avatar_link").attr("data-avatar-url")) {
          h = this.$(".post_avatar_link").attr("data-avatar-url")
        }
      }
      var n = {tumblelog: this.model.get("tumblelog"), post_id: this.model.get("id")};
      var l = this.$(".post_control.block").data("block");
      if (l) {
        if (l.indexOf("name:") === -1) {
          n = {tumblelog: l}
        } else {
          var p = l.split(",");
          var k;
          for (var g = 0; g < p.length; g++) {
            k = p[g].indexOf("name:");
            if (k !== -1) {
              n.tumblelog = p[g].substring(5, p[g].length);
              break
            }
          }
        }
      }
      var m = this.$(".post_control.block").data("confirm");
      var o = Tumblr.TumblelogActions.confirm_ignore({confirm_text: m, tumblelog: n.tumblelog, avatar_url: h})
    }, block: function (i) {
      var g = e(i.currentTarget).data("block");
      if (!g.length) {
        return
      }
      var h;
      if (g.indexOf("name:") === -1) {
        h = {currentTumblelog: this.model.get("tumblelog"), blockedTumblelog: g};
        Tumblr.Prima.Block.confirmBlock(h).then(_.bind(this._blockConfirmed, this, h))
      } else {
        h = {currentTumblelog: this.model.get("tumblelog"), blockedPost: this.model.get("id")};
        Tumblr.Prima.Block.confirmBlock(h).then(_.bind(this._anonBlockConfirmed, this, h))
      }
    }, _blockConfirmed: function (g) {
      Tumblr.Prima.Block.block(g).then(_.bind(this._afterBlock, this, g))
    }, _anonBlockConfirmed: function (g) {
      Tumblr.Prima.Block.block(g).then(_.bind(this._afterBlock, this, g))
    }, _afterBlock: function (h) {
      this.model.set("ignoring", true);
      if (h.blockedTumblelog) {
        var g = e('[data-tumblelog-name="' + h.blockedTumblelog + '"]').closest(".post");
        g.filter('[data-tumblelog="' + h.currentTumblelog + '"]').parent().fadeOut("fast");
        Tumblr.Prima.Events.trigger("blocks:block_added", {loggingData: {from: "inbox"}})
      } else {
        if (h.blockedPost) {
          this.$el.fadeOut("fast");
          Tumblr.Prima.Events.trigger("blocks:ip_block_added", {loggingData: {from: "inbox"}})
        }
      }
    }, hidePost: function () {
      this.$el.fadeOut("fast")
    }, excludeFromGhostlist: function () {
      this.$el.addClass("is_persistent")
    }, updateParentTumblelogFollow: function (g, i) {
      var h = this.$('.reblog_follow_button:not(".onboard")');
      if (g._previousAttributes.following == null || g._previousAttributes.following === i) {
        return
      }
      if (i === false) {
        h.removeClass("active animated poof final_state")
      } else {
        h.addClass("active animated poof");
        setTimeout(function () {
          h.addClass("final_state")
        }, 1000);
        b.trigger("post:follow:success", g);
        b.trigger("useraction:follow_reblog:success", this.model)
      }
    }, updateReblog: function (g) {
      this.is_reblogged = true;
      var j = e('<div class="post_reblog_poof post_poof"></div>'), h = this.controls.reblog;
      if (g) {
        j.addClass("queue")
      }
      if (this.is_click_trigger) {
        h.append(j)
      } else {
        if (this.$el.height() > e(window).height()) {
          j.css("top", e(window).height() * 0.5)
        }
        this.$el.append(j)
      }
      this.is_click_trigger = false;
      setTimeout(_.bind(function i() {
        j.fadeOut(200, _.bind(function k() {
          j.remove();
          this.updateReblogControl(g)
        }, this))
      }, this), 300);
      if (this.capture_web_instream) {
        this.capture_web_instream.track_fast_reblog()
      }
      b.trigger("useraction:fast_reblog:success", this.model)
    }, updateReblogControl: function (g) {
      this.controls.reblog.addClass("reblogged");
      if (g) {
        this.controls.reblog.addClass("queued")
      }
    }, onExternalFastReblog: function (g) {
      if (this.model.get("id") === g.model.get("id").toString()) {
        this.updateReblogControl(false)
      }
    }, updateLikeStatus: function () {
      var h = this.model.get("liked");
      this.controls.like.toggleClass("liked", h);
      var g = e('<div class="post_animated_heart post_poof"><span class="heart_left"></span><span class="heart_right"></span></div>').toggleClass("unliked", !h);
      if (this.is_click_trigger) {
        this.controls.like.append(g)
      } else {
        if (this.$el.height() > e(window).height()) {
          g.css("top", e(window).height() * 0.5)
        }
        if (e(".post_animated_heart").length > 0) {
          var i = 0.2 + (Math.random() * 0.6);
          g.css("left", this.$el.width() * i)
        }
        this.$el.append(g)
      }
      this.is_click_trigger = false;
      setTimeout(function () {
        g.fadeOut(200, function () {
          g.remove()
        })
      }, 300);
      if (this.capture_web_instream) {
        this.capture_web_instream.track_like(h)
      }
    }, updateNoteCount: function (h) {
      var g = this.$(".note_link_current"), j;
      var i = g.first().text();
      if (h) {
        j = g.data("more");
        if (g.data("more") !== i) {
          g.data("less", i)
        }
        this.$el.removeClass("no_notes")
      } else {
        j = g.data("less");
        if (j !== i) {
          g.data("more", i)
        }
        if (!j.length) {
          this.$el.addClass("no_notes")
        }
      }
      g.text(j);
      g.attr("title", j)
    }, destroy: function () {
      this.$el.fadeOut(500, _.bind(function () {
        this.unbind();
        if (this.$el.parent().hasClass("post_container")) {
          this.$el.parent().remove()
        }
        b.trigger("DOMEventor:updateRect");
        this.remove();
        b.trigger("posts:destroyed", this.$el)
      }, this))
    }, failure: function (g) {
      if (g.response[0] !== "") {
        Tumblr.Dialog.alert(g.response[0])
      } else {
        Tumblr.Dialog.alert("Unknown error occurred")
      }
    }, alert: function (g) {
      Tumblr.Dialog(g)
    }, tagsDraggable: function () {
      var g = this.$(".post_tags");
      var h = g.find(".post_tags_inner");
      var i;
      if (g.width() < h.width()) {
        g.addClass("draggable");
        i = new Tumblr.DraggableTags({el: g})
      }
    }, checkForVendor: function () {
      var h = this.$(".vendor_button");
      if (h.length) {
        var g = new Tumblr.VendorButton({el: h, vendorData: h.data("vendor-json"), postModel: this.model})
      }
    }, setupAnswerForm: function () {
      var g = this.$(".post_answer");
      if (!(this.answer_form instanceof Tumblr.AnswerForm) && g.find(".post_answer_input").length) {
        this.answer_form = new Tumblr.AnswerForm({
          model: this.model,
          el: g,
          existing_note: this.$el.hasClass("existing_note")
        })
      }
    }, answer: function () {
      this.$el.addClass("existing_note")
    }, initialize_type_photo: function () {
    }, initialize_type_photoset: function () {
      this.initialize_type_photo()
    }, initialize_type_video: function () {
      setTimeout(_.bind(function () {
        var g = this.$(".dockable_video_embed[data-can-gutter]")[0];
        if (g) {
          this.dockable_video_embed = new Tumblr.PostView.DockableVideo({model: this.model, el: g})
        }
      }, this))
    }, photo_reply_click: function (g) {
      f.init([{
        high_res: e(g.currentTarget).find("img").attr("src"),
        low_res: e(g.currentTarget).find("img").attr("src"),
        width: 500
      }])
    }, media_click: function () {
      b.trigger("useraction:click:post_media", {
        model: this.model,
        loggingData: this.loggingData({userAction: "media_click"})
      })
    }, read_more_click: function () {
      b.trigger("useraction:click:read_more", {
        model: this.model,
        loggingData: this.loggingData({userAction: "read_more"})
      })
    }, caption_click: function () {
      b.trigger("useraction:click:post_caption", {
        model: this.model,
        loggingData: this.loggingData({userAction: "caption"})
      })
    }, permalink_click: function () {
      b.trigger("useraction:click:post_permalink", {
        model: this.model,
        loggingData: this.loggingData({userAction: "permalink"})
      })
    }, share_click: function () {
      b.trigger("useraction:click:post_share", {
        model: this.model,
        loggingData: this.loggingData({userAction: "share"})
      })
    }, messaging_click: function (h) {
      var g = e(h.currentTarget);
      b.trigger("useraction:click:messaging", {
        model: this.model,
        loggingData: this.loggingData({userAction: "messaging"})
      });
      return new Tumblr.Prima.Messaging.SharePost({
        postId: g.attr("data-post-id"),
        blogUuid: g.attr("data-tumblelog-uuid"),
        pinnedTarget: g
      }).render()
    }, share_menu_email: function () {
      b.trigger("useraction:click:share_menu:email", {
        model: this.model,
        loggingData: this.loggingData({userAction: "share_email"})
      })
    }, share_menu_twitter: function () {
      b.trigger("useraction:click:share_menu:twitter", {
        model: this.model,
        loggingData: this.loggingData({userAction: "share_twitter"})
      })
    }, share_menu_facebook: function () {
      b.trigger("useraction:click:share_menu:facebook", {
        model: this.model,
        loggingData: this.loggingData({userAction: "share_facebook"})
      })
    }, share_menu_permalink: function () {
      b.trigger("useraction:click:share_menu:permalink", {
        model: this.model,
        loggingData: this.loggingData({userAction: "share_permalink"})
      })
    }, avatar_click: function () {
      Tumblr.Events.trigger("useraction:click:avatar", {
        model: this.model,
        loggingData: this.loggingData({userAction: "avatar"})
      })
    }, source_click: function () {
      Tumblr.Events.trigger("useraction:click:source", {
        model: this.model,
        loggingData: this.loggingData({userAction: "source"})
      })
    }, tag_click: function () {
      Tumblr.Events.trigger("useraction:click:tag", {
        model: this.model,
        loggingData: this.loggingData({userAction: "tags"})
      })
    }, trending_badge_click: function (h) {
      var g = e(h.currentTarget).data("trending-id");
      if (!g) {
        return
      }
      Tumblr.Events.trigger("explore-trending:badge-click", {loggingData: {post_id: this.model.id, trending_id: g}})
    }, notes_click: function () {
      Tumblr.Events.trigger("useraction:click:notes", {
        model: this.model,
        loggingData: this.loggingData({userAction: "notes"})
      })
    }, blogname_click: function () {
      Tumblr.Events.trigger("useraction:click:posts", {
        model: this.model,
        loggingData: this.loggingData({userAction: "posts"})
      })
    }, install_click: function (h) {
      var g = e(h.target);
      Tumblr.Events.trigger("useraction:click:install_click", {
        model: this.model,
        loggingData: this.loggingData({userAction: "install_click", url: (g.attr("href") || "")})
      })
    }, content_link_click: function (i) {
      var g = i.currentTarget.href;
      var h = e(i.currentTarget);
      var j = Tumblr.Prima.Url;
      if (Tumblr.Flags.bool("indash_blogs") && !h.is(".sponsored_post, .read_more") && (j.isTumblelogUrl(g) || j.isTumblelogShortUrl(g))) {
        return
      }
      if (h.is(".no_pop, .photoset_photo, .photo_exif_flipper, .fan_mail_read_more, .follow")) {
        return
      }
      if (window.self !== top && h.is(".post_control.reblog, .post_control.edit")) {
        g = g.replace(/\?.*/, "")
      } else {
        if (h.closest(".no_pop, .post_controls, #new_post, .controls, .user_menu_list, form, .flash_notification, .more_notes_link").length > 0) {
          return
        }
        if (!g || g === "#") {
          return
        }
      }
      i.preventDefault();
      i.stopPropagation();
      if (Tumblr.Prima.Url.hasAllowedProtocol(g)) {
        window.open(g)
      }
    }
  });
  Tumblr.Prima.Mixins.loggingData.applyTo(Tumblr.PostView.prototype)
})(jQuery);
/*! scripts/posts/views/post_view_logged_out.js */
(function (c) {
  var b = Tumblr.PostView;
  var a = Tumblr.Events;
  Tumblr.PostViewLoggedOut = Tumblr.PostView.extend({
    events: {
      "click .post_control.like": "send_to_signup",
      "click .post_control.reblog": "send_to_signup"
    }, send_to_signup: function (e) {
      if (e) {
        var d = c(e.currentTarget).hasClass("reblog") ? "reblog" : "like";
        a.trigger("PostsView:send_to_signup", {event: e, type: d, model: this.model}, this);
        if (e.isPropagationStopped()) {
          return false
        }
        e.preventDefault();
        e.stopPropagation()
      }
      window.open("/register");
      return false
    }
  })
})(jQuery);
/*! scripts/posts/views/dockable_video_background_post.js */
(function (b) {
  var a = Tumblr.PostView.extend({
    events: _.defaults({
      mouseenter: "__onMouseEnter",
      mouseleave: "__onMouseLeave",
    }, Tumblr.PostView.prototype.events),
    header_template: _.template('<header class="post_header post_info"><a class="tumblelog_info post_info_link" href="<%= permalink %>"<% if (popover_data) {%>data-tumblelog-popover=\'<%- popover_data %>\'<% } %>title="<%= blog_name %>"><div class="tumblelog_avatar" style="background-image: url(\'<%= avatar_url %>\');"></div><div class="post_info_tumblelog"><%= blog_name %></div></a><% if(reblog_infos){ %><span class="reblog_source"><span class="reblog_icon" title="<%=  reblog_infos.name  %>"></span><a class="post_info_link" title="<%=  reblog_infos.name  %>" href="<%=  reblog_infos.url  %>"><%=  reblog_infos.name  %></a></span><% } %><a class="<% if (is_following) { %>final_state poof animated <% } %>follow_link post_info_link reblog_follow_button icon_follow_rounded_small no_pop"href="/follow/<%= blog_name %>" title="<%= __("Follow") %>"><i><%= __("Follow") %></i></a></header>'),
    initialize: function () {
    },
    keep_controls: [".reblog", ".like"],
    "$embed": function () {
      if (!this._$embed) {
        this._$embed = this.$(".embed_iframe, .crt-video")
      }
      return this._$embed
    },
    "$permalink": function () {
      if (!this._$permalink && this.$post) {
        this._$permalink = this.$post.closest(".post_full").find(".post_permalink")
      }
      return this._$permalink
    },
    render: function () {
      var c = this.$post = this.$el.closest(".post");
      var e = {};
      var d = c.find(".post_info_link:first");
      e.popover_data = (function () {
        var i = d.data("tumblelogPopover");
        if (i) {
          return JSON.stringify(i)
        } else {
          return false
        }
      })();
      var f = this.$post.attr("data-json");
      this.$el.attr("data-json", f);
      e.avatar_url = (function () {
        var j = c.find(".post_avatar_link");
        var i = j.css("background-image").match(/url\(['"]?(.+?)['"]?\)/);
        if (i) {
          return i[1]
        }
      })();
      e.blog_name = d.text();
      e.permalink = this.$post.find(".post_avatar_link").data("blog-url");
      e.is_following = this.model.tumblelog.get("following") || this.model.get("is_mine");
      e.reblog_infos = (this.model.parentTumblelog) ? this.model.parentTumblelog.toJSON() : false;
      this.$header = b(this.header_template(e));
      var h = this.$post.find(".sponsored_wrapper");
      if (h.length) {
        h = h.clone();
        b(".follow_button_wrapper", h).remove();
        this.$header.append(h);
        h.find(".popover_sponsored").remove()
      }
      this.post_classes = (function () {
        var i = c[0].className.split(/\s+/);
        _.pull(i, "post_full");
        i.push("post_brick");
        i.push("docked_post_underlay");
        return i
      })();
      this.$el.addClass(this.post_classes.join(" "));
      this.$el.attr("data-view-exists", "true");
      this.$footer = this.$post.find(".post_footer").clone();
      this.$footer.find(".post_notes .popover").removeClass("nipple_on_left").addClass("nipple_on_right");
      this.$footer.find(".post_control").each(_.bind(function (m, l) {
        var k = b(l), j;
        for (j = 0; j < this.keep_controls.length; j += 1) {
          if (k.is(this.keep_controls[j])) {
            return
          }
        }
        k.hide()
      }, this));
      this.$el.prepend(this.$header, this.$footer);
      Tumblr.PostView.prototype.initialize.call(this);
      this.disableToaster();
      this.reveal();
      var g = this._$embed.attr("id");
      this.trigger("afterRender", {embedID: g});
      Tumblr.Events.trigger("post:docked:afterRender", {embedID: g})
    },
    updateNoteCount: _.noop,
    reveal: function () {
      this.$el.velocity({height: "+=89px"}, {duration: 150});
      this.$embed().velocity({top: "+=44px"}, {duration: 150})
    },
    remove: function (c) {
      var d = _.bind(function d() {
        this.$el.removeClass(this.post_classes.join(" "));
        this.$footer.remove();
        this.$header.remove();
        this.$embed().css({top: ""});
        this.releaseDogear();
        this.enableToaster();
        if (c) {
          c()
        }
      }, this);
      this.$el.velocity({height: "-=89px"}, {duration: 150, complete: d});
      this.$embed().velocity({top: "-=44px"}, {duration: 150})
    },
    enableToaster: function () {
      try {
        Tumblr.Toaster.enable()
      } catch (c) {
        if (__DEV__) {
          console.warn("Toaster unavailable: ", c)
        }
      }
    },
    disableToaster: function () {
      try {
        Tumblr.Toaster._nuke_all_toast();
        Tumblr.Toaster.disable()
      } catch (c) {
        if (__DEV__) {
          console.warn("Toaster unavailable: ", c)
        }
      }
    },
    wrangleDogear: function () {
      if (this.$el.hasClass("docked") && this.$permalink()) {
        this.$permalink().css("display", "none")
      }
    },
    releaseDogear: function () {
      if (this.$permalink()) {
        this.$permalink().removeAttr("style")
      }
    },
    __onMouseEnter: function () {
      this.wrangleDogear()
    },
    __onMouseLeave: function () {
      this.releaseDogear()
    },
    reblog: function (c) {
      c.stopPropagation();
      Tumblr.PostView.prototype.reblog.apply(this, arguments)
    },
    like: function (c) {
      c.stopPropagation();
      Tumblr.PostView.prototype.like.apply(this, arguments)
    },
    unlike: function (c) {
      c.stopPropagation();
      Tumblr.PostView.prototype.unlike.apply(this, arguments)
    }
  });
  Tumblr.DockableVideoBackgroundPost = a
})(jQuery);
/*! scripts/posts/views/dockable_video.js */
(function (c) {
  var b = "autoplaying";
  var a = Backbone.View.extend({
    autoDockOnScroll: true,
    videoState: "",
    placeholder_template: _.template('<div class="dockable_video_placeholder"><div class="dockable_video_placeholder_content"><div class="arrow_icon icon_arrow_video"></div><%= __("Put it back") %></div></div>'),
    events: {"click .dock_video_button": "_dockVideoButton"},
    aspectRatio: null,
    initialWidth: null,
    isAnimating: false,
    initialize: function () {
      var d = {postData: this.model.toJSON(), service: this.$el.data("embed-service")};
      this.gutterViewOptions = {
        dockLoggingData: d,
        undockLoggingData: d,
        onUndock: this.removeFromGutter,
        onDock: this.moveToGutter
      };
      this.embedManager = Tumblr.Prima.embedHarness;
      this.gutterManager = Tumblr.Prima.gutterMediaManager;
      this.canResize = this.$el.is("[data-can-resize]");
      this.$doc = c(document);
      this.docIsFullscreen = false;
      this.dockablePost = new Tumblr.DockableVideoBackgroundPost({el: this.el, model: this.model});
      if (this.$embed().attr("id")) {
        this.setupHarness()
      }
      this.listenTo(Tumblr.Events, "peepr:open", this.pauseVideo);
      this.listenTo(Tumblr.Events, "posts:destroyed", this.onPostDestroyed);
      this.listenTo(Tumblr.Events, "Glass:show", this.onGlassShow);
      this.listenTo(Tumblr.Events, "Glass:hide", this.onGlassHide);
      this.listenTo(Tumblr.Events, "CrtPlayer:ready", this.onCrtReady);
      this.listenTo(this.dockablePost, "afterRender", this.onPostDock)
    },
    onCrtReady: function (d) {
      this.setupHarness()
    },
    onPostDock: function (d) {
      if (!this.harness) {
        return
      }
      var f = d.embedID;
      if (f === this.harness.getData().embedID) {
        this.harness.play()
      }
    },
    setupHarness: function () {
      if (this.harness) {
        return
      }
      this.$embed(true);
      var d = this.embedManager.getHarness(this.$embed().attr("id"));
      d.then(_.bind(function (e) {
        this.harness = e;
        this._setStateAndAutoDockOnScroll(this.harness.videoState);
        this.listenTo(this.harness, "exitViewport", this.onExitViewport);
        this.listenTo(this.harness, "stateChange", this.onStateChange);
        this._bindCrtPlayerEvents()
      }, this))
    },
    _bindCrtPlayerEvents: function () {
      if (this.harness._data.service === "tumblr" && this.harness.player) {
        var d = this.harness.player;
        this.listenTo(d.player, "pause", _.bind(function () {
          if (!d.get("autoplay")) {
            this.autoDockOnScroll = true
          }
        }, this));
        this.listenTo(d.player, "muteClicked", _.bind(function () {
          if (!d.get("autoplay")) {
            this.autoDockOnScroll = false
          }
        }, this));
        this.listenTo(d.player, "looped", _.bind(function () {
          if (!d.get("autoplay")) {
            this.autoDockOnScroll = false
          }
        }, this))
      }
    },
    onExitViewport: function () {
      if (this.autoDockOnScroll) {
        var e = (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
        if (!this.isInGutter() && this.videoState === "playing" && !e) {
          var d = _.clone(this.gutterViewOptions);
          d.animation = "slide";
          this.gutterManager.putViewInGutter(this, d)
        }
      } else {
        if (!this.isInGutter()) {
          this.pauseVideo()
        }
      }
    },
    onStateChange: function (d) {
      if (!this.harness) {
        return
      }
      this._setStateAndAutoDockOnScroll(d);
      if (!this.isInGutter() && this.videoState === "playing") {
        this.autoDockOnScroll = true
      }
    },
    "$post": function () {
      if (!this._$post) {
        this._$post = this.$el.closest(".post")
      }
      return this._$post
    },
    "$embed": function (d) {
      if (d === true || !this._$embed) {
        this._$embed = this.$(".embed_iframe, .crt-video")
      }
      return this._$embed
    },
    _dockVideoButton: function () {
      var d = _.clone(this.gutterViewOptions);
      if (this.isAnimating === false) {
        if (this.isInGutter()) {
          this.gutterManager.removeGutteredView();
          this.autoDockOnScroll = false
        } else {
          d.animation = "fall";
          this.gutterManager.putViewInGutter(this, d)
        }
      }
    },
    _setStateAndAutoDockOnScroll: function (d) {
      this.videoState = d;
      if (d === b) {
        this.autoDockOnScroll = false
      }
    },
    makePersistent: function () {
      this.$post().addClass("is_persistent");
      this.makePersistent = _.noop
    },
    onPostDestroyed: function (d) {
      if (d.hasClass("docked")) {
        this.gutterManager.removeGutteredView()
      }
    },
    onGlassShow: function (d) {
      if (this.isInGutter()) {
        this.$el.css("z-index", 2147483649)
      }
    },
    onGlassHide: function () {
      this.$el.css("z-index", "")
    },
    setReblogSource: function (d) {
      if (this.originalReblogSource === undefined) {
        this.originalReblogSource = this.model.get("reblog_source") || ""
      }
      if (d) {
        this.model.set("reblog_source", d)
      } else {
        this.model.set("reblog_source", this.originalReblogSource)
      }
    },
    moveToGutter: function (e) {
      var g = this.rect();
      this.makePersistent();
      var d = e.gutterPosition;
      d.height = this.embedDimensionsForWidth(d.width).height;
      this.fixElInOriginalPlace({animate: false});
      if (!this.$placeholder) {
        this.$placeholder = this.buildPlaceholder(g)
      }
      this.$el.before(this.$placeholder);
      this.isAnimating = true;
      if (this.canResize) {
        this.$embed().velocity(_.pick(d, "width", "height"));
        if (e.animation === "fall") {
          this.$el.velocity(d, {
            complete: _.bind(function () {
              this.dockablePost.render();
              this.isAnimating = false
            }, this)
          })
        } else {
          if (e.animation === "slide") {
            var f = d.bottom;
            d.bottom = -(d.height + d.bottom + 90);
            this.listenToOnce(this.dockablePost, "afterRender", function () {
              this.$el.velocity({bottom: f, opacity: 1,}, {
                duration: 400, easing: "ease", complete: _.bind(function () {
                  this.isAnimating = false
                }, this)
              })
            });
            this.$el.velocity({opacity: 0}, {duration: 10});
            this.$el.velocity(d, {
              duration: 10, complete: _.bind(function () {
                this.dockablePost.render()
              }, this)
            })
          }
        }
      } else {
        delete d.height;
        delete d.width
      }
      this.model.set("is_docked", true);
      this.$el.addClass("docked");
      this.setReblogSource("POST_CONTEXT_DOCKED_POST")
    },
    removeFromGutter: function () {
      var d = this.$placeholder.get(0).getBoundingClientRect();
      if ((-d.top > d.height) || (d.top > window.innerHeight)) {
        this.slideOutOfGutter()
      } else {
        this.translateOutOfGutter(true)
      }
    },
    originalEmbedLocation: function () {
      var e;
      if (this.$placeholder) {
        e = this.$placeholder[0].getBoundingClientRect()
      } else {
        e = this.rect()
      }
      var d = Tumblr.Prima.DOMEventor.rect();
      var f = e.left - (d.windowWidth / 2);
      return {
        left: "50%",
        width: e.width,
        height: this.embedDimensionsForWidth(e.width).height,
        bottom: d.windowHeight - e.bottom,
        translateX: f,
        translateY: 0
      }
    },
    translateOutOfGutter: function () {
      if (!this.isInGutter()) {
        return
      }
      this.returnToOriginalState(true)
    },
    returnToOriginalState: function (d) {
      if (d) {
        this.isAnimating = true
      }
      this.dockablePost.remove();
      this.fixElInOriginalPlace({
        animate: (d), complete: _.bind(function () {
          this.$placeholder.remove();
          this.$placeholder = null;
          this.$el.attr("style", "");
          this.$el.css(this.embedDimensionsForWidth(this.initialWidth));
          this.isAnimating = false
        }, this)
      });
      this.model.set("is_docked", false);
      this.$el.removeClass("docked");
      this.setReblogSource()
    },
    slideOutOfGutter: function () {
      if (!this.isInGutter()) {
        return
      }
      this.isAnimating = true;
      var d = this.$el.outerHeight() + parseInt(this.$el.css("bottom"), 10);
      this.$el.velocity({translateY: d, opacity: 0}, {
        duration: 400, easing: "ease", complete: _.bind(function () {
          this.returnToOriginalState(false)
        }, this)
      });
      this.pauseVideo()
    },
    fixElInOriginalPlace: function (e) {
      var d = this.originalEmbedLocation();
      if (!e.animate) {
        e.duration = 0;
        this.$el.css({"z-index": 79, position: "fixed"})
      }
      this.$el.velocity(d, e);
      this.$embed().velocity(_.pick(d, "width", "height"), _.pick(e, "duration"))
    },
    embedDimensionsForWidth: function (e) {
      if (!this.aspectRatio) {
        this.rect()
      }
      var d = e * this.aspectRatio;
      return {width: e, height: d}
    },
    rect: function () {
      var d = this.el.getBoundingClientRect();
      if (!this.aspectRatio) {
        this.aspectRatio = d.height / d.width
      }
      if (!this.initialWidth) {
        this.initialWidth = d.width
      }
      return d
    },
    pauseVideo: function () {
      if (this.harness) {
        this.harness.pause()
      } else {
        if (this.$embed().is("iframe")) {
          var d = this.$embed()[0];
          d.src = d.src
        } else {
          var e = this.$embed().find("video");
          if (e.length) {
            e[0].pause()
          }
        }
      }
    },
    buildPlaceholder: function (d) {
      d || (d = this.rect());
      this.$dockable_video_placeholder = c(this.placeholder_template());
      this.$dockable_video_placeholder.css({width: d.width, height: d.height});
      this.$dockable_video_placeholder.on("click", _.bind(function () {
        this.gutterManager.removeGutteredView();
        this.autoDockOnScroll = false
      }, this));
      return this.$dockable_video_placeholder
    },
    isInGutter: function () {
      return this.gutterManager.isViewInGutter(this)
    }
  });
  Tumblr.PostView.DockableVideo = a
})(jQuery);
/*! scripts/posts/views/fan_mail_view.js */
(function (a) {
  Tumblr.FanMailView = Tumblr.PostView.extend({
    events: {
      'click [data-action="ignore"]': "ignore",
      'click [data-action="message-controls"]': "messageControls",
      'click [data-action="read_more"]': "read_more",
      'click [data-action="deny"]': "deny",
      'click [data-action="reply"]': "reply"
    }, read_more: function (b) {
      b.preventDefault();
      this.$(".read_more").hide();
      this.$(".message_body_truncated").hide();
      this.$(".message_body").show()
    }, reply: function (b) {
      b.preventDefault();
      Tumblr.FanMail.show(b.target)
    }, deny: function (b) {
      Tumblr.PostView.prototype.deny.call(this, b)
    }
  })
})(jQuery);
/*! scripts/posts/views/notes_popover.js */
(function (a) {
  Tumblr.NotesPopover = Tumblr.PopoverWithScroll.extend({
    show_by_el: function (b) {
      this.$el = a(b);
      this.$container = this.$el.find(".notes_container");
      this.$scroll = this.$el.find(".popover_scroll");
      this.popover = this.$el.find(".popover");
      this.show()
    }
  })
})(jQuery);
/*! scripts/posts/views/notes.js */
(function (c) {
  var a = Tumblr.Events;
  var e = Tumblr.NotesPopover;
  var d = Tumblr.KeyCommands;
  var f = Tumblr.ReblogNoteView;
  var b = Tumblr.NoteView;
  Tumblr.Notes = Backbone.View.extend({
    el: "#posts",
    loading_notes: false,
    at_end: false,
    events: {"click .post_notes_label": "show_notes", "click .more_notes_link": "on_more_click", keydown: "on_keydown"},
    initialize: function () {
      var g = this;
      this.popover = new e({
        direction: "left",
        disable_auto_show: true,
        auto_center: false,
        glassless: true,
        glassless_options: {prevent_clicks: false, dynamic_ignore_selectors: ".ui_peepr_glass"},
        on_show: function () {
          g.on_notes_show(this.$el)
        },
        on_load_more: function () {
          if (!g.loading_notes && this.$el.find("a.more_notes_link").length > 0) {
            g.more_notes(this.$el.closest(".post"))
          }
        }
      });
      this.listenTo(Tumblr.Events, "useraction:click:notes:follow", function (h) {
        this.follow_tumblelog(h)
      });
      this.listenTo(Tumblr.Events, "useraction:click:post:notes", function (h) {
        if (!h && h.event) {
          return
        }
        this.show_notes(h.event)
      })
    },
    follow_tumblelog: function (g) {
      Tumblr.follow({tumblelog: g, source: "FOLLOW_SOURCE_NOTES_POPOVER"}, {
        success: function () {
          Tumblr.Events.trigger("follow_tumblelog", {tumblelog: g})
        }
      })
    },
    show_notes: function (g) {
      g.preventDefault();
      if (this.popover.is_showing) {
        return
      }
      this.popover.show_by_el(g.currentTarget);
      if (_.isObject(d)) {
        d.suspend([74, 75])
      }
    },
    create_note_views: function (g) {
      g.find(".note:not([data-view-exists])").each(function (j, k) {
        var h;
        if (c(k).hasClass("reblog") || c(k).hasClass("post_attribution")) {
          h = new f({el: k})
        } else {
          h = new b({el: k})
        }
        c(k).attr("data-view-exists", true)
      });
      this.popover.update()
    },
    updateControls: function (h, i) {
      var g = h.find(".more_notes_link");
      if (i) {
        h.show();
        g.attr("data-next", i).show()
      } else {
        this.at_end = true;
        this.popover.is_scroll_disabled = true;
        g.attr("data-notes-complete", true);
        h.hide()
      }
    },
    animate_in: function (g) {
      this.loading_notes = true;
      g.slideDown(300, _.bind(function () {
        this.loading_notes = false
      }, this))
    },
    on_more_click: function (g) {
      g.preventDefault();
      this.more_notes(c(g.currentTarget).closest(".post"))
    },
    on_keydown: function (h) {
      var g = h.charCode ? h.charCode : h.keyCode;
      if (g === 78 && this.popover.is_showing) {
        h.preventDefault();
        h.stopPropagation();
        this.popover.hide()
      }
    },
    on_notes_show: function (i) {
      var h = c(i), g = h.closest(".post");
      this.at_end = (h.find(".more_notes_link").data("notes-complete")) ? true : false;
      this.popover.is_scroll_disabled = this.at_end;
      if (!h.attr("data-notes-loaded")) {
        if (!h.attr("data-notes-loading")) {
          h.attr("data-notes-loading", true);
          this.load_notes(g, {}, _.bind(function (j) {
            if (!j) {
              this.popover.hide()
            }
            h.attr("data-notes-loading", "");
            h.attr("data-notes-loaded", true);
            this.popover.position_vertical()
          }, this))
        }
      } else {
        this.popover.position_vertical()
      }
    },
    more_notes: function (i) {
      var g = c(i);
      var h = g.find(".more_notes_link").hide();
      var j = g.find(".notes_loading").show();
      this.loading_notes = true;
      this.load_notes(g, {from_id: h.attr("data-next")}, _.bind(function () {
        j.hide();
        h.show();
        this.loading_notes = false
      }, this))
    },
    load_notes: function (g, j, m) {
      var i;
      var l;
      var n;
      if (g.data("json")) {
        var k = g.data("json");
        i = k["post-id"];
        l = k["tumblelog-key"];
        n = k["tumblelog-name"]
      } else {
        i = g.attr("data-post-id");
        l = g.attr("data-tumblelog-key");
        n = g.attr("data-tumblelog-name")
      }
      var h = "/dashboard/notes/" + i + "/" + l + "/" + n;
      if (j.from_id) {
        h += "?from_c=" + j.from_id
      }
      c.ajax(h).done(_.bind(function (t, u, r) {
        var q = g.find(".more_notes_link_container"), o = g.find(".notes"), p = g.find(".more_notes_link"), s = g.find(".notes_loading");
        p.show();
        s.hide();
        t = c.trim(t);
        this.updateControls(q, r.getResponseHeader("X-next-note"));
        o.append(c(t).children());
        this.create_note_views(o);
        a.trigger("DOMEventor:updateRect");
        m(t, u, r)
      }, this))
    }
  })
})(jQuery);
/*! scripts/posts/views/draggable_tags.js */
(function (a) {
  Tumblr.DraggableTags = Backbone.View.extend({
    initialize: function () {
      this.dragging = false;
      this.drag_x = false;
      this.drag_inner = this.$(".post_tags_inner");
      this.doc = a(document);
      this.transform = this.isTransformSupported();
      this.bindEvents()
    }, bindEvents: function () {
      this.$el.on("mousedown touchstart touchmove mouseleave mouseup touchend", ".post_tags_inner", _.bind(this.dragEvents, this));
      this.$el.on("click", ".post_tag", _.bind(this.handleLinks, this))
    }, getDimensions: function () {
      var c = this.$el.width();
      var b = this.drag_inner.width();
      return {post_width: c, tag_width: b, max_left: 0, max_right: ((c - b) - 10)}
    }, isTransformSupported: function () {
      var c = "transform WebkitTransform MozTransform OTransform msTransform".split(" ");
      for (var b = 0; b < c.length; b++) {
        if (document.createElement("div").style[c[b]] !== undefined) {
          return true
        }
      }
      return false
    }, dragEvents: function (b) {
      switch (b.type) {
        case"mousedown":
        case"touchstart":
          this.dragStart(b);
          break;
        case"mousemove":
        case"touchmove":
          if (this.pointer_down) {
            this.dragMove(b)
          }
          break;
        case"touchend":
        case"mouseup":
          this.dragEnd(b);
          break
      }
    }, bindDocEvents: function () {
      this.doc.on("mousemove.tagsDraggable", _.bind(this.dragEvents, this));
      this.doc.on("mouseup.tagsDraggable", _.bind(this.resetDrag, this));
      this.doc.on("mouseout", _.bind(this.checkMouseOut, this))
    }, unbindDocEvents: function () {
      this.doc.off("mousemove.tagsDraggable");
      this.doc.off("mouseup.tagsDraggable");
      this.doc.off("mouseout")
    }, dragStart: function (b) {
      b.preventDefault();
      if (!this.dragging && !this.pointer_down) {
        this.pointer_down = true;
        this.start_x = this.drag_inner.position().left;
        this.page_x = ("pageX" in b ? b.pageX : b.originalEvent.touches[0].pageX);
        this.bindDocEvents()
      }
    }, dragMove: function (c) {
      c.preventDefault();
      c.stopPropagation();
      this.drag_inner[0].classList.add("dragging");
      this.dragging = true;
      var b = ("clientX" in c ? c.clientX : c.originalEvent.touches[0].clientX) - this.page_x;
      this.drag_x = b + this.start_x;
      this.dragSet(this.drag_x)
    }, dragSet: function (b) {
      if (this.transform) {
        this.drag_inner.css("transform", "translate(" + b + "px, 0)")
      } else {
        this.drag_inner.css("left", b)
      }
    }, checkMouseOut: function (b) {
      var c = b.relatedTarget || b.toElement;
      if (!c || c.nodeName == "HTML") {
        this.dragEnd(b)
      }
    }, handleLinks: function (d) {
      d.preventDefault();
      if (this.dragging) {
        d.stopPropagation()
      } else {
        var b = a(d.currentTarget);
        var c = b.attr("href");
        if (Tumblr.Flags.bool("post_tag_links_to_search")) {
          return true
        }
        if (Tumblr.Prima.Url.hasAllowedProtocol(c)) {
          window.open(c, "_blank")
        }
      }
    }, resetDragPosition: function () {
      if (!this.d) {
        this.d = this.getDimensions()
      }
      if (this.drag_x > this.d.max_left) {
        this.dragSet(this.d.max_left)
      } else {
        if (this.drag_x < this.d.max_right) {
          this.dragSet(this.d.max_right)
        }
      }
    }, dragEnd: function (c) {
      c.preventDefault();
      c.stopPropagation();
      var b = _.bind(this.resetDrag, this);
      _.delay(b, 100)
    }, resetDrag: function () {
      if (this.dragging || this.pointer_down) {
        this.dragging = false;
        this.pointer_down = false;
        this.drag_inner[0].classList.remove("dragging");
        this.resetDragPosition();
        this.unbindDocEvents()
      }
    }
  })
})(jQuery);
/*! scripts/posts/views/answer_form.js */
(function (a) {
  Tumblr.AnswerForm = Backbone.View.extend({
    events: {
      "keyup .post_answer_input": "keyup",
      "focus .post_answer_input": "focus",
      "blur  .post_answer_input": "blur",
      "click .post_answer_submit": "submit"
    }, initialize: function (b) {
      this.options = b || {};
      this.max_length = 250;
      this.answer_input = this.$(".post_answer_input");
      this.answer_submit = this.$(".post_answer_submit");
      this.answer_length = this.$(".post_answer_length");
      this.answer_error_message = this.answer_input.data("error-message");
      this.existing_note = this.options.existing_note || false;
      this.answer_text = this.answer_input.val();
      this.listenTo(this.model, "answer:success", this.answer);
      this.listenTo(this.model, "answer:forbidden", this.answer);
      this.listenTo(this.model, "answer:failure", this.error)
    }, keyup: function (b) {
      if (this.existing_note) {
        return false
      }
      this.remaining_chars = this.max_length - this.getAnswerLength();
      if (this.remaining_chars <= 0) {
        this.remaining_chars = 0
      }
      this.answer_length.text(this.remaining_chars);
      this.answer_text = (this.answer_text !== this.answer_input.val()) ? this.answer_input.val() : this.answer_text;
      if (b.keyCode === 13) {
        b.preventDefault();
        this.answer_post()
      }
    }, focus: function () {
      if (this.existing_note) {
        return false
      }
      this.answer_text = this.answer_input.val();
      this.$el.addClass("show_submit")
    }, blur: function () {
      if (this.getAnswerLength() === 0) {
        this.$el.removeClass("show_submit")
      }
    }, submit: function (b) {
      b.preventDefault();
      this.answer_post()
    }, answer_post: function () {
      if (this.getAnswerLength()) {
        this.model.answer(this.getAnswer())
      }
    }, answer: function () {
      this.answer_input.blur();
      this.answer_input.attr("readonly", "readonly")
    }, error: function () {
      Tumblr.Dialog.confirm(this.answer_error_message)
    }, getAnswerLength: function () {
      return this.getAnswer().length
    }, getAnswer: function () {
      return a.trim(this.answer_input.val())
    }
  })
})(jQuery);
/*! scripts/posts/views/dashboard_blog_card.js */
(function (c) {
  var b = Tumblr.Search.indashTumblelogCompactView.extend({
    defaults: _.extend({}, Tumblr.Search.indashTumblelogCompactView.prototype.defaults, {
      follow_data: {source: "FOLLOW_SOURCE_INDASH_RECOMMENDED_BLOG"},
      unfollow_data: {source: "UNFOLLOW_SOURCE_INDASH_RECOMMENDED_BLOG"}
    }), events: function () {
      return _.extend({}, Tumblr.Search.indashTumblelogCompactView.prototype.events.apply(this, arguments), {"click .info_wrapper": "__open_peepr"})
    }, __open_peepr: function () {
      Tumblr.Events.trigger("peepr-open-request", {tumblelog_name: this.model.get("name")})
    }
  });
  var a = Tumblr.IndashBlog.HeaderCompact.extend({
    className: "indash_header_compact indash_blog",
    events: Tumblr.IndashBlog.HeaderCompact.prototype.events,
    defaults: _.extend({}, Tumblr.IndashBlog.HeaderCompact.prototype.defaults, {
      include_info_popover: false,
      template_data: {
        show_navigation: true,
        show_user_controls: false,
        show_share_controls: false,
        show_follow_button: true,
        show_dismiss_controls: true,
        popover: false
      },
      follow_data: {source: "FOLLOW_SOURCE_INDASH_RECOMMENDED_BLOG"},
      unfollow_data: {source: "UNFOLLOW_SOURCE_INDASH_RECOMMENDED_BLOG"},
      aspect_ratio: 9 / 16,
      width: 540
    }),
    render: function () {
      Tumblr.IndashBlog.HeaderCompact.prototype.render.apply(this, arguments);
      var e = this.options.width;
      this.$(".header_image_wrapper, .header_image").height(e * this.options.aspect_ratio);
      var g = c('<a href="/explore" class="post_header_discover_button"><i class="icon_explore"></i></a>');
      var d = this.$(".follow, .unfollow");
      var f = this.$(".navigation_inner .post_dismiss");
      f.before(g);
      d.insertBefore(g);
      this._setup_posts();
      return this
    },
    _setup_posts: function () {
      this.highlighted_posts = new Tumblr.TumblelogPopover.Posts({
        model: this.model,
        on_bottom: true,
        parent: this.$el.find(".indash_header_wrapper")
      })
    }
  });
  a.attach_to_el = function (g) {
    var j = c(g.$el);
    var l = g.blogs;
    if (!l.length) {
      return l
    }
    var d = g.blog_card_type === "compact";
    var k = d ? b : a;
    var f = c();
    for (var h = 0; h < l.length; h++) {
      var e = new k({
        model: l[h],
        include_posts: true,
        width: d ? 265 : 540,
        aspect_ratio: d ? (8 / 16) : (9 / 16)
      }).render();
      c.merge(f, c('<div class="blog-card-container"></div>').append(e.$el))
    }
    f.appendTo(j)
  };
  Tumblr.Events.on("component:DashboardBlogCard:attach_to_el", a.attach_to_el);
  Tumblr.DashboardBlogCard = a
})(jQuery);
/*! scripts/posts/views/vendor_button.js */
(function (a) {
  Tumblr.VendorButton = Backbone.View.extend({
    events: {
      "click .dropdown-area": "onDropDownClick",
      "click .button-area": "onLinkClick"
    }, initialize: function (b) {
      b || (b = {});
      this.postModel = b.postModel || {};
      this.listing_id = b.vendorData.listing_id;
      this.price = b.vendorData.price;
      this.state = b.vendorData.state;
      this.name = b.vendorData.name;
      this.vendorPopover = new Tumblr.VendorPopover({
        glassless: true,
        el: this.$(".dropdown-area"),
        listing_id: this.listing_id
      });
      this.listenTo(this.vendorPopover, "emailClick", _.bind(function (c) {
        this.triggerEvent("emailClick")
      }, this));
      this.triggerEvent("serve")
    }, onDropDownClick: function (b) {
      this.vendorPopover.show();
      this.triggerEvent("dropdownOpen")
    }, onLinkClick: function (b) {
      this.triggerEvent("buttonClick")
    }, triggerEvent: function (b) {
      Tumblr.Events.trigger("VendorButton:" + b, {
        loggingData: {
          listing_id: this.listing_id,
          price: this.price,
          state: this.state,
          partner: this.name,
          postData: this.postModel.toJSON(),
          userAction: "action_click"
        }
      })
    }
  })
})(jQuery);
/*! scripts/posts/views/vendor_popover.js */
(function (a) {
  Tumblr.VendorPopover = Tumblr.Popover.extend({
    hiding: false,
    popoverTimer: null,
    hideButtonTimer: null,
    hidePopoverTimeout: 2000,
    hideButtonTimeout: 2150,
    events: {"click .email-vendor-listing": "onEmailClick",},
    initialize: function (b) {
      this.options = b || {};
      _.extend(this.options, {on_hide: this.onHide});
      Tumblr.Popover.prototype.initialize.apply(this, arguments);
      this.$popoverEl = this.$(".popover_vendor")
    },
    onEmailClick: function (b) {
      b.stopPropagation();
      a.ajax({
        method: "POST",
        url: "/svc/vendor/buy_it_later",
        data: {item_id: this.options.listing_id},
        with_form_key: true,
        success: function () {
        },
        failure: function () {
        }
      });
      this.trigger("emailClick");
      this.tellOfGreatEmailingSuccess()
    },
    onHide: function () {
      if (this.hiding) {
        clearTimeout(this.popoverTimer);
        clearTimeout(this.hideButtonTimer);
        this.hidePopover();
        this.hideDropdown()
      }
    },
    tellOfGreatEmailingSuccess: function () {
      this.hiding = true;
      this.$popoverEl.addClass("success");
      this.popoverTimer = setTimeout(_.bind(function () {
        this.hidePopover()
      }, this), this.hidePopoverTimeout);
      this.hideButtonTimer = setTimeout(_.bind(function () {
        this.hideDropdown()
      }, this), this.hideButtonTimeout)
    },
    hidePopover: function () {
      this.$popoverEl.addClass("fade-out")
    },
    hideDropdown: function () {
      this.$popoverEl.remove();
      this.$el.addClass("slide-out");
      this.hiding = false;
      this.hide()
    }
  })
})(jQuery);
/*! scripts/posts/index.js */

/*! scripts/follow_list.js */
(function (f, a) {
  var d = window.l10n_str || {};

  function c() {
    return window.location.pathname.split("/")[1]
  }

  var e = Backbone.View.extend({
    tagName: "ul", events: {"click .show_more": "show_more"}, initialize: function (g) {
      this.template || (this.template = g.template);
      this.subviews = [];
      this.data = this.$el.data("json") || {};
      this.tumblelogs = this.data.tumblelogs || [];
      this.context = this.data.context || "";
      this.enable_refresh = false;
      this.collection_url = "";
      this.exclude_following = false;
      this.minimum_list_length = null;
      this.visible_list_length = 4;
      this.viewed = [];
      this.log_impressions = false;
      this.is_popover_showing = false;
      this.set_context_props();
      var i = this;
      var h = Backbone.Collection.extend({
        url: this.collection_url,
        model: Tumblr.Prima.Models.Tumblelog,
        parse: function (k) {
          var j = k.response.blogs;
          if (i.exclude_following) {
            j = _.filter(j, {following: false})
          }
          return j
        }
      });
      this.collection = new h();
      this.listenTo(this.collection, "add", this.add_tumblelog);
      this.listenTo(this.collection, "remove", this.remove_tumblelog);
      this.listenTo(this.collection, "change:following", this.on_follow);
      this.listenTo(Tumblr.Events, "TumblelogPopover:show", this.on_popover_show);
      this.listenTo(Tumblr.Events, "TumblelogPopover:hide", this.on_popover_hide);
      if (this.log_impressions) {
        this.listenTo(this.collection, "add", this.log_impression);
        this.listenTo(this.collection, "remove", this.log_impression)
      }
      this.$el.attr("data-json", null)
    }, before_render: function () {
      this.$el.addClass("is_rendering")
    }, render: function () {
      this.before_render();
      var g = _.template(this.template);
      this.$el.html(g({heading: this.data.heading || "", context: this.data.context || ""}));
      this.collection.add(this.tumblelogs);
      this.add_footer();
      this.after_render();
      return this
    }, after_render: function () {
      setTimeout(_.bind(function () {
        this.$el.removeClass("is_rendering")
      }, this), 0)
    }, set_context_props: function () {
      if (this.context === "recommended_tumblelogs") {
        this.collection_url = "/svc/search/get_recommended_tumblelogs";
        this.enable_refresh = true;
        this.has_dismiss = true;
        this.auto_refresh = true;
        this.exclude_following = true;
        this.minimum_list_length = 6;
        this.log_impressions = true
      } else {
        if (this.context === "trending_tumblelogs") {
          this.collection_url = "/svc/search/get_trending_tumblelogs";
          this.enable_refresh = true;
          this.has_dismiss = true;
          this.auto_refresh = true;
          this.exclude_following = true;
          this.minimum_list_length = 6;
          this.log_impressions = false
        }
      }
    }, on_popover_show: function () {
      this.is_popover_showing = true
    }, on_popover_hide: function () {
      this.is_popover_showing = false
    }, add_footer: function () {
      var g = _.template(f("#follow_list_" + this.data.context + "_small_links_template").html());
      var h = g({user_is_editor: this.data.user_is_editor || false});
      this.$el.append(h)
    }, on_follow: function (i, h) {
      var g = _.find(this.subviews, {model: i});
      if (!this.enable_refresh) {
        g.render();
        return
      }
      if (h) {
        if (this.collection.length > this.visible_list_length) {
          if (this.is_popover_showing) {
            this.listenToOnce(Tumblr.Events, "TumblelogPopover:hide", function () {
              this.collection.remove(i);
              this.animate(g, false)
            });
            g.$el.find(".follow").addClass("follow_poof");
            g.$el.addClass("flash");
            g.$el.find(".dismiss").addClass("hide")
          } else {
            this.collection.remove(i);
            this.animate(g, true)
          }
        } else {
          g.render()
        }
      } else {
        this.stopListening(Tumblr.Events, "TumblelogPopover:hide");
        g.render();
        g.$el.removeClass("flash")
      }
      g.disable_dismiss()
    }, add_tumblelog: function (h) {
      var g = new b({
        model: h,
        collection: this.collection,
        params: {follow_source: this.data.follow_source, has_dismiss: this.has_dismiss}
      });
      this.subviews.push(g);
      if (!this.auto_refresh && this.visible_list_length && this.subviews.length > this.visible_list_length) {
        g.hide()
      }
      this.$el.append(g.el);
      g.render()
    }, remove_tumblelog: function (h) {
      this.subviews = _.filter(this.subviews, function (i) {
        return i.model !== h
      });
      var g = this.minimum_list_length - this.collection.length;
      if (g > 0) {
        this.fetch_tumblelogs(g)
      }
    }, fetch_tumblelogs: function (g) {
      this.collection.fetch({data: {limit: g, page: c(), include_posts: false}, with_form_key: true, remove: false})
    }, animate: function (h, g) {
      h.$el.find(".follow").addClass("follow_poof");
      if (g) {
        h.$el.addClass("flash").delay(200)
      }
      h.$el.animate({opacity: 0}, 100).slideUp(300, function () {
        f(this).remove()
      })
    }, show_more: function (g) {
      this.$(".item.last").removeClass("last");
      this.$(".item").last().addClass("after_showing");
      this.$(".item.hidden").removeClass("hidden");
      f(g.currentTarget).hide();
      return false
    }, log_impression: function () {
      _.forEach(this.collection.slice(0, this.visible_list_length), function (i) {
        var g = _.find(this.subviews, {model: i});
        if (_.isEmpty(g) || (_.indexOf(this.viewed, i) !== -1)) {
          return
        }
        this.viewed.push(i);
        var h = (Tumblr.getRealNow || _.now)();
        Tumblr.Events.trigger("Capture:push", "recommended_blog_impressions", "impressions", {
          tumblelog_name: i.get("name"),
          algorithm_id: i.get("algorithm_id") || "",
          page: c(),
          ts: Math.floor(h / 1000),
          position: g.$el.offset(),
          format: "RECOMMEND_FORMAT_DASH_SIDEBAR",
        })
      }, this)
    }
  });
  var b = Backbone.View.extend({
    tagName: "li",
    className: "item",
    events: {"click .follow": "follow", "click .icon_close": "dismiss"},
    initialize: function (g) {
      this.params = g.params || {};
      this.$button = this.$(".follow")
    },
    render: function () {
      var g = _.extend(this.model.toJSON(), this.params);
      g.following = this.model.get("following") || this.model.get("is_you");
      var h = _.template(f("#follow_list_item_template").html());
      this.$el.html(h(g));
      this.$button.toggle(!this.model.get("following"));
      return this
    },
    follow: function () {
      this.model.save_following({following: true}, {source: this.params.follow_source}).fail(function () {
        Tumblr.Dialog.alert(d.ajax_error)
      });
      return false
    },
    hide: function () {
      this.$el.addClass("hidden")
    },
    dismiss: function () {
      this.collection.remove(this.model);
      this.$el.animate({left: -245}, 250).slideUp(300, function () {
        f(this).remove()
      });
      f.ajax({
        method: "POST",
        url: "/svc/search/log_dismissal",
        data: {tumblelog_name: this.model.get("name"), page: c()},
        with_form_key: true
      })
    },
    disable_dismiss: function () {
      this.$el.find(".dismiss").remove()
    }
  });
  a.FollowList = e;
  a.FollowListItem = b
})(jQuery, Tumblr);
jQuery(document).ready(function (b) {
  if (b("#tagged_actions_display").hasClass("is_featured_tag")) {
    var a = b.trim(b("#follow_list_template").html());
    b(".follow_list").each(function (d, c) {
      new Tumblr.FollowList({el: c, template: a}).render()
    })
  }
});
/*! scripts/tumblr/dashboard/dashboard_controls.js */
(function (k, f, j, d) {
  function c() {
    var m = arguments;
    return function () {
      for (var o = 0, n = m.length; o < n; o++) {
        if (m[o].apply(this, arguments) === false) {
          break
        }
      }
    }
  }

  function b() {
    return this.isRenderable()
  }

  function g(m) {
    return function (n) {
      return !(n._previousAttributes[m] == null || n._previousAttributes[m] === n.attributes[m])
    }
  }

  var a = (function () {
    try {
      var m = 0;
      m.toLocaleString("i");
      return function (o, p) {
        return p.toLocaleString()
      }
    } catch (n) {
      return function (o, p) {
        return p.toLocaleString(o)
      }
    }
  })();

  function e(n) {
    var m = /\d[\d\s\.,]*/;
    return function (o, s) {
      var p = this[n];
      var r = parseInt(p.data("count"), 10) + (s ? 1 : -1);
      p.data("count", r);
      var t = p.text();
      var q = f.trim(t.match(m));
      if (q) {
        p.text(t.replace(q, a(this.locale, r)))
      }
    }
  }

  var l = j.View.extend({
    initialize: function (m) {
      this._renderable = false;
      this.locale = m.locale;
      this.allPosts = m.allPosts;
      this.allTumblelogs = m.allTumblelogs;
      this.listenTo(this.allTumblelogs, "change:following", this.changeFollowingLabel);
      this.listenTo(this.allPosts, "change:liked", this.changeLikesLabel)
    },
    changeFollowingLabel: c(b, g("following"), e("$followingLabel")),
    changeLikesLabel: c(b, g("liked"), e("$likesLabel")),
    isRenderable: function () {
      return !!this._renderable
    },
    render: function () {
      this.$likesLabel = this.$(".likes [data-count]");
      this.$followingLabel = this.$(".following [data-count]");
      this._renderable = (this.$likesLabel.length !== 0) && (this.$followingLabel !== 0);
      return this
    }
  });
  var h = (typeof language_for_tinymce === "string") ? language_for_tinymce : "en";
  var i = new l({
    el: "#right_column",
    allPosts: Tumblr.Posts,
    allTumblelogs: Tumblr.Prima.Models.Tumblelog.collection,
    locale: h
  }).render();
  d.DashboardControls = l;
  d.dashboardControls = i
})(_, jQuery, Backbone, Tumblr);
/*! scripts/tumblr/dashboard/post_helpers.js */
Tumblr.DashboardPostHelpers = (function () {
  var f = window.jQuery;
  var b = window._;
  var e = Tumblr.Flags;
  var d = {
    updatePostInline: function (j) {
      var n = this.$previousContent;
      if (!j.post_dashboard_html || !n.length) {
        return
      }
      var k = f(f.trim(j.post_dashboard_html));
      var o = k.filter("script");
      var h = k.find(".post_wrapper");
      var m = [".post_content", ".post_tags", ".post_footer_links", ".notes_outer_container", ".permalink", ".post_source", ".post_info"];
      var i = ".post_info";
      b.each(m, function (p, q) {
        var r = n.find(p).filter(":not('.post_info.answer')");
        if (r.length) {
          r.replaceWith(h.find(p))
        } else {
          n.children(i).after(h.children(p))
        }
        i = p
      }, this);
      var l = n.find(".post_control.reblog");
      if (l.length) {
        l.replaceWith(h.find(".post_control.reblog"))
      } else {
        n.find(".post_controls_inner").append(h.find(".post_control.reblog"))
      }
      h.after(o);
      n.find("iframe.spotify_player").css("opacity", 0).addClass("iframe_reload_and_fade_in");
      if (Tumblr.AudioPlayer) {
        b.delay(function () {
          Tumblr.AudioPlayer.replace_placeholders(n, true)
        }, 750)
      }
    }, afterHide: function (j) {
      var i = this.dashboard;
      var k = (!!j.post && !!j.post.is_edit) && (j.context_page !== j.post_context_page) && (!i.model.get("detached"));
      if (b.isFunction(i.destroy_preview)) {
        i.destroy_preview()
      }
      if (b.isFunction(i.hide_loader)) {
        i.hide_loader()
      }
      i.render_view = new Tumblr.PostForms.RenderPost({model: i.model});
      var l = this.newRoot;
      var h = true;
      if (this.newRoot === "") {
        if (window.location.pathname.indexOf("/tagged/") !== -1) {
          h = false
        } else {
          l = "/dashboard"
        }
      }
      var m = "before";
      if (window.location.pathname.indexOf("/drafts") !== -1) {
        m = "after";
        l += "/drafts"
      }
      if (!j.post.is_edit && (f("#new_post").length > 0) && h && !j.post.is_reblog && !j.fastCompose) {
        i.render_view.load_more_posts(i.model.get("detached") ? i.options.animate_from : 0, l, m)
      }
      if (k) {
        i.$parent_el.slideUp(200, function () {
          f(i).remove()
        });
        if (f("#posts .post").not(".new_post").length <= 1) {
          window.location = this.pageRoot;
          return
        }
      }
      this.displayNotification(j, k)
    }, displayNotification: function (h, j) {
      var k = this.pageRoot ? this.pageRoot.split("/") : [];
      var i = k[1] || "";
      var l = (i.toLowerCase() === "blog" ? k[2] : f('input[name="t"]').val()) || "";
      if (!h.created_post || h.post.is_reblog || h.fastCompose || i.toLowerCase() === "tagged" || l.toLowerCase() !== h.post_tumblelog.name_or_id.toLowerCase() || j) {
        b.delay(function (n) {
          if (typeof Tumblr.Toaster === "object" && typeof Tumblr.ToastKit === "object") {
            var m = Tumblr.ToastKit.notification_center_convert(n, {
              url: h.post_tumblelog.post_url,
              tumblelog: {name: h.post_tumblelog.name_or_id, url: h.post_tumblelog.url, avatar: h.post_tumblelog.avatar}
            });
            Tumblr.Toaster.add_toast(m)
          }
        }, 250, h.message)
      }
    }, processPostSaveSuccess: function (i) {
      var h = this.dashboard;
      clearTimeout(h.delay_loader);
      this.triggerPostFormSuccess();
      if (i.context_page === "queue") {
        window.location = this.pageRoot;
        return
      }
      this.updatePostInline(i);
      var j = b.bind(this.afterHide, this, i);
      if (b.isFunction(this.hidePostForm)) {
        this.hidePostForm(j)
      } else {
        h.hide_post_form(null, j)
      }
      if (i.context_tumblelog) {
        f.each(i.context_tumblelog.counts, function (l, n) {
          var m = f("#dashboard_controls_open_blog .dashboard_" + l);
          m.find(".count").text(n);
          var k = (m.attr("class") || "").match(/(?:\s|^)count_\d+/gi);
          if (k) {
            m.removeClass(k.join(""))
          }
          m.addClass("count_" + n)
        })
      }
    }, postSaveSuccess: function (i, h) {
      if (h.user) {
        Tumblr.video_seconds_remaining = h.user.video_seconds_remaining
      }
      b.delay(b.bind(this.processPostSaveSuccess, this, h), 250)
    }, postSaveError: function (i, k, h) {
      var j = (k.status === 403) ? "This post died while you were away. Copy your work and refresh the page." : k.statusText;
      i.trigger("invalid", i, j)
    }, triggerPostFormSuccess: function () {
      Tumblr.Events.trigger("post:form:success", this.dashboard.model.toJSON())
    }
  };
  var c = function (h) {
    return {pageRoot: h.page_root, newRoot: h.new_root, $previousContent: h.$previous_content}
  };
  var a = function (h, i) {
    i = i || {};
    this.dashboard = h;
    b.each(d, function (j, k) {
      this[k] = j.bind(this)
    }, this);
    b.extend(this, b.defaults(i, c(h)))
  };
  if (Tumblr.Flags.bool("prima_post_forms")) {
    var g = function (j, i) {
      if (!j) {
        return
      }
      var h;
      if (Tumblr.ToastKit) {
        h = Tumblr.ToastKit.notification_center_convert(j, i)
      }
      if (Tumblr.Toaster) {
        Tumblr.Toaster.add_toast(h)
      }
    };
    Tumblr.Events.listenTo(Tumblr.Events, "postForms:saveHook:toast", g)
  }
  return a
})();
/*! scripts/vendor/audio-js/audio.js */
(function (e, b, a) {
  var d = (function () {
    var j = new RegExp("audio(\\.min)?\\.js.*"), f = document.getElementsByTagName("script");
    for (var g = 0, h = f.length; g < h; g++) {
      var k = f[g].getAttribute("src");
      if (j.test(k)) {
        return k.replace(j, "")
      }
    }
    return ""
  })();
  a[e] = {
    instanceCount: 0,
    instances: {},
    flashSource: '      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;">         <param name="movie" value="$2?playerInstance=' + e + '.instances[\'$1\']&datetime=$3">         <param name="allowscriptaccess" value="always">         <embed name="$1" src="$2?playerInstance=' + e + '.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always">       </object>',
    settings: {
      autoplay: false,
      loop: false,
      preload: true,
      imageLocation: d + "player-graphics.gif",
      swfLocation: d + "audiojs.swf",
      useFlash: (function () {
        var f = document.createElement("audio");
        return !(f.canPlayType && f.canPlayType("audio/mpeg;").replace(/no/, ""))
      })(),
      hasFlash: (function () {
        if (navigator.plugins && navigator.plugins.length && navigator.plugins["Shockwave Flash"]) {
          return true
        } else {
          if (navigator.mimeTypes && navigator.mimeTypes.length) {
            var h = navigator.mimeTypes["application/x-shockwave-flash"];
            return h && h.enabledPlugin
          } else {
            try {
              var f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
              return true
            } catch (g) {
            }
          }
        }
        return false
      })(),
      createPlayer: {
        markup: '          <div class="play-pause">             <p class="play"></p>             <p class="pause"></p>             <p class="loading"></p>             <p class="error"></p>           </div>           <div class="scrubber">             <div class="progress"></div>             <div class="loaded"></div>           </div>           <div class="time">             <em class="played">00:00</em>/<strong class="duration">00:00</strong>           </div>           <div class="error-message"></div>',
        playPauseClass: "play-pause",
        scrubberClass: "scrubber",
        progressClass: "progress",
        loaderClass: "loaded",
        timeClass: "time",
        durationClass: "duration",
        playedClass: "played",
        errorMessageClass: "error-message",
        playingClass: "playing",
        loadingClass: "loading",
        errorClass: "error"
      },
      css: '        .audiojs audio { position: absolute; left: -1px; }         .audiojs { width: 460px; height: 36px; background: #404040; overflow: hidden; font-family: monospace; font-size: 12px;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #444), color-stop(0.5, #555), color-stop(0.51, #444), color-stop(1, #444));           background-image: -moz-linear-gradient(center top, #444 0%, #555 50%, #444 51%, #444 100%);           -webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); -moz-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);           -o-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); }         .audiojs .play-pause { width: 25px; height: 40px; padding: 4px 6px; margin: 0px; float: left; overflow: hidden; border-right: 1px solid #000; }         .audiojs p { display: none; width: 25px; height: 40px; margin: 0px; cursor: pointer; }         .audiojs .play { display: block; }         .audiojs .scrubber { position: relative; float: left; width: 280px; background: #5a5a5a; height: 14px; margin: 10px; border-top: 1px solid #3f3f3f; border-left: 0px; border-bottom: 0px; overflow: hidden; }         .audiojs .progress { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #ccc; z-index: 1;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #ddd), color-stop(0.51, #ccc), color-stop(1, #ccc));           background-image: -moz-linear-gradient(center top, #ccc 0%, #ddd 50%, #ccc 51%, #ccc 100%); }         .audiojs .loaded { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #000;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #222), color-stop(0.5, #333), color-stop(0.51, #222), color-stop(1, #222));           background-image: -moz-linear-gradient(center top, #222 0%, #333 50%, #222 51%, #222 100%); }         .audiojs .time { float: left; height: 36px; line-height: 36px; margin: 0px 0px 0px 6px; padding: 0px 6px 0px 12px; border-left: 1px solid #000; color: #ddd; text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5); }         .audiojs .time em { padding: 0px 2px 0px 0px; color: #f9f9f9; font-style: normal; }         .audiojs .time strong { padding: 0px 0px 0px 2px; font-weight: normal; }         .audiojs .error-message { float: left; display: none; margin: 0px 10px; height: 36px; width: 400px; overflow: hidden; line-height: 36px; white-space: nowrap; color: #fff;           text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; }         .audiojs .error-message a { color: #eee; text-decoration: none; padding-bottom: 1px; border-bottom: 1px solid #999; white-space: wrap; }                 .audiojs .play { background: url("$1") -2px -1px no-repeat; }         .audiojs .loading { background: url("$1") -2px -31px no-repeat; }         .audiojs .error { background: url("$1") -2px -61px no-repeat; }         .audiojs .pause { background: url("$1") -2px -91px no-repeat; }                 .playing .play, .playing .loading, .playing .error { display: none; }         .playing .pause { display: block; }                 .loading .play, .loading .pause, .loading .error { display: none; }         .loading .loading { display: block; }                 .error .time, .error .play, .error .pause, .error .scrubber, .error .loading { display: none; }         .error .error { display: block; }         .error .play-pause p { cursor: auto; }         .error .error-message { display: block; }',
      trackEnded: function (f) {
      },
      flashError: function () {
        var h = this.settings.createPlayer, f = c(h.errorMessageClass, this.wrapper), g = 'Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';
        if (this.mp3) {
          g += ' <a href="' + encodeURI(this.mp3) + '">Download audio file</a>.'
        }
        a[e].helpers.removeClass(this.wrapper, h.loadingClass);
        a[e].helpers.addClass(this.wrapper, h.errorClass);
        f.innerHTML = g
      },
      loadError: function (h) {
        var g = this.settings.createPlayer, f = c(g.errorMessageClass, this.wrapper);
        a[e].helpers.removeClass(this.wrapper, g.loadingClass);
        a[e].helpers.addClass(this.wrapper, g.errorClass);
        f.innerHTML = 'Error loading: "' + _.escape(this.mp3) + '"'
      },
      init: function () {
        var f = this.settings.createPlayer;
        a[e].helpers.addClass(this.wrapper, f.loadingClass)
      },
      loadStarted: function () {
        var g = this.settings.createPlayer, i = c(g.durationClass, this.wrapper), f = Math.floor(this.duration / 60), h = Math.floor(this.duration % 60);
        a[e].helpers.removeClass(this.wrapper, g.loadingClass);
        i.innerHTML = ((f < 10 ? "0" : "") + f + ":" + (h < 10 ? "0" : "") + h)
      },
      loadProgress: function (h) {
        var g = this.settings.createPlayer, i = c(g.scrubberClass, this.wrapper), f = c(g.loaderClass, this.wrapper);
        f.style.width = (i.offsetWidth * h) + "px"
      },
      playPause: function () {
        if (this.playing) {
          this.settings.play()
        } else {
          this.settings.pause()
        }
      },
      play: function () {
        var f = this.settings.createPlayer;
        a[e].helpers.addClass(this.wrapper, f.playingClass)
      },
      pause: function () {
        var f = this.settings.createPlayer;
        a[e].helpers.removeClass(this.wrapper, f.playingClass)
      },
      updatePlayhead: function (j) {
        var h = this.settings.createPlayer, l = c(h.scrubberClass, this.wrapper), g = c(h.progressClass, this.wrapper);
        g.style.width = (l.offsetWidth * j) + "px";
        var k = c(h.playedClass, this.wrapper), n = this.duration * j, f = Math.floor(n / 60), i = Math.floor(n % 60);
        k.innerHTML = ((f < 10 ? "0" : "") + f + ":" + (i < 10 ? "0" : "") + i)
      }
    },
    create: function (g, f) {
      var f = f || {};
      if (g.length) {
        return this.createAll(f, g)
      } else {
        return this.newInstance(g, f)
      }
    },
    createAll: function (g, k) {
      var f = k || document.getElementsByTagName("audio"), l = [];
      g = g || {};
      for (var h = 0, j = f.length; h < j; h++) {
        l.push(this.newInstance(f[h], g))
      }
      return l
    },
    newInstance: function (g, f) {
      var g = g, h = this.helpers.clone(this.settings), l = "audiojs" + this.instanceCount, k = "audiojs_wrapper" + this.instanceCount, j = this.instanceCount++;
      if (g.getAttribute("autoplay") != null) {
        h.autoplay = true
      }
      if (g.getAttribute("loop") != null) {
        h.loop = true
      }
      if (g.getAttribute("preload") == "none") {
        h.preload = false
      }
      if (f) {
        this.helpers.merge(h, f)
      }
      if (h.createPlayer.markup) {
        g = this.createPlayer(g, h.createPlayer, k)
      } else {
        g.parentNode.setAttribute("id", k)
      }
      var i = new a[b](g, h);
      if (h.css) {
        this.helpers.injectCss(i, h.css)
      }
      if (h.useFlash && h.hasFlash) {
        this.injectFlash(i, l);
        this.attachFlashEvents(i.wrapper, i)
      } else {
        if (h.useFlash && !h.hasFlash) {
          h.flashError.apply(i)
        }
      }
      if (!h.useFlash || (h.useFlash && h.hasFlash)) {
        this.attachEvents(i.wrapper, i)
      }
      this.instances[l] = i;
      return i
    },
    createPlayer: function (g, f, j) {
      var i = document.createElement("div"), h = g.cloneNode(true);
      i.setAttribute("class", "audiojs");
      i.setAttribute("className", "audiojs");
      i.setAttribute("id", j);
      if (h.outerHTML && !document.createElement("audio").canPlayType) {
        h = this.helpers.cloneHtml5Node(g);
        i.innerHTML = f.markup;
        i.appendChild(h);
        g.outerHTML = i.outerHTML;
        i = document.getElementById(j)
      } else {
        i.appendChild(h);
        i.innerHTML = i.innerHTML + f.markup;
        g.parentNode.replaceChild(i, g)
      }
      return i.getElementsByTagName("audio")[0]
    },
    attachEvents: function (k, h) {
      if (!h.settings.createPlayer) {
        return
      }
      var g = h.settings.createPlayer, j = c(g.playPauseClass, k), i = c(g.scrubberClass, k), f = function (l) {
        var m = 0;
        if (l.offsetParent) {
          do {
            m += l.offsetLeft
          } while (l = l.offsetParent)
        }
        return m
      };
      a[e].events.addListener(j, "click", function (l) {
        h.playPause.apply(h)
      });
      a[e].events.addListener(i, "click", function (m) {
        var l = m.clientX - f(this);
        h.skipTo(l / i.offsetWidth)
      });
      if (h.settings.useFlash) {
        return
      }
      a[e].events.trackLoadProgress(h);
      a[e].events.addListener(h.element, "timeupdate", function (l) {
        h.updatePlayhead.apply(h)
      });
      a[e].events.addListener(h.element, "ended", function (l) {
        h.trackEnded.apply(h)
      });
      a[e].events.addListener(h.source, "error", function (l) {
        clearInterval(h.readyTimer);
        clearInterval(h.loadTimer);
        h.settings.loadError.apply(h)
      })
    },
    attachFlashEvents: function (f, g) {
      g.swfReady = false;
      g.load = function (h) {
        g.mp3 = h;
        if (g.swfReady) {
          g.element.load(h)
        }
      };
      g.loadProgress = function (h, i) {
        g.loadedPercent = h;
        g.duration = i;
        g.settings.loadStarted.apply(g);
        g.settings.loadProgress.apply(g, [h])
      };
      g.skipTo = function (h) {
        if (h > g.loadedPercent) {
          return
        }
        g.updatePlayhead.call(g, [h]);
        g.element.skipTo(h)
      };
      g.updatePlayhead = function (h) {
        g.settings.updatePlayhead.apply(g, [h])
      };
      g.play = function () {
        if (!g.settings.preload) {
          g.settings.preload = true;
          g.element.init(g.mp3)
        }
        g.playing = true;
        g.element.pplay();
        g.settings.play.apply(g)
      };
      g.pause = function () {
        g.playing = false;
        g.element.ppause();
        g.settings.pause.apply(g)
      };
      g.setVolume = function (h) {
        g.element.setVolume(h)
      };
      g.loadStarted = function () {
        g.swfReady = true;
        if (g.settings.flashReady) {
          g.settings.flashReady.apply(g)
        }
        if (g.settings.preload && g.mp3) {
          g.element.init(g.mp3)
        }
        if (g.settings.autoplay) {
          g.play.apply(g)
        }
      }
    },
    injectFlash: function (h, j) {
      var f = this.flashSource.replace(/\$1/g, j);
      f = f.replace(/\$2/g, h.settings.swfLocation);
      f = f.replace(/\$3/g, (+new Date + Math.random()));
      var g = h.wrapper.innerHTML, i = document.createElement("div");
      i.innerHTML = f + g;
      h.wrapper.innerHTML = i.innerHTML;
      h.element = this.helpers.getSwf(j)
    },
    helpers: {
      merge: function (g, f) {
        for (attr in f) {
          if (g.hasOwnProperty(attr) || f.hasOwnProperty(attr)) {
            g[attr] = f[attr]
          }
        }
      }, clone: function (h) {
        if (h == null || typeof(h) !== "object") {
          return h
        }
        var f = new h.constructor();
        for (var g in h) {
          f[g] = arguments.callee(h[g])
        }
        return f
      }, addClass: function (f, h) {
        var g = new RegExp("(\\s|^)" + h + "(\\s|$)");
        if (g.test(f.className)) {
          return
        }
        f.className += " " + h
      }, removeClass: function (f, h) {
        var g = new RegExp("(\\s|^)" + h + "(\\s|$)");
        f.className = f.className.replace(g, " ")
      }, injectCss: function (g, k) {
        var q = "", p = document.getElementsByTagName("style"), j = k.replace(/\$1/g, g.settings.imageLocation);
        for (var h = 0, o = p.length; h < o; h++) {
          var m = p[h].getAttribute("title");
          if (m && ~m.indexOf("audiojs")) {
            f = p[h];
            if (f.innerHTML === j) {
              return
            }
            q = f.innerHTML;
            break
          }
        }
        var l = document.getElementsByTagName("head")[0], n = l.firstChild, f = document.createElement("style");
        if (!l) {
          return
        }
        f.setAttribute("type", "text/css");
        f.setAttribute("title", "audiojs");
        if (f.styleSheet) {
          f.styleSheet.cssText = q + j
        } else {
          f.appendChild(document.createTextNode(q + j))
        }
        if (n) {
          l.insertBefore(f, n)
        } else {
          l.appendChild(styleElement)
        }
      }, cloneHtml5Node: function (g) {
        var f = document.createDocumentFragment(), h = f.createElement ? f : document;
        h.createElement("audio");
        var i = h.createElement("div");
        f.appendChild(i);
        i.innerHTML = g.outerHTML;
        return i.firstChild
      }, getSwf: function (f) {
        var g = document[f] || window[f];
        return g.length > 1 ? g[g.length - 1] : g
      }
    },
    events: {
      memoryLeaking: false, listeners: [], addListener: function (g, f, h) {
        if (g.addEventListener) {
          g.addEventListener(f, h, false)
        } else {
          if (g.attachEvent) {
            this.listeners.push(g);
            if (!this.memoryLeaking) {
              window.attachEvent("onunload", function () {
                if (this.listeners) {
                  for (var j = 0, k = this.listeners.length; j < k; j++) {
                    a[e].events.purge(this.listeners[j])
                  }
                }
              });
              this.memoryLeaking = true
            }
            g.attachEvent("on" + f, function () {
              h.call(g, window.event)
            })
          }
        }
      }, trackLoadProgress: function (h) {
        if (!h.settings.preload) {
          return
        }
        if (!h.element.src) {
          return
        }
        var f, i, h = h, g = (/(ipod|iphone|ipad)/i).test(navigator.userAgent);
        f = setInterval(function () {
          if (h.element.readyState > -1) {
            if (!g) {
              h.init.apply(h)
            }
          }
          if (h.element.readyState > 1) {
            if (h.settings.autoplay) {
              h.play.apply(h)
            }
            clearInterval(f);
            i = setInterval(function () {
              h.loadProgress.apply(h);
              if (h.loadedPercent >= 1) {
                clearInterval(i)
              }
            })
          }
        }, 10);
        h.readyTimer = f;
        h.loadTimer = i
      }, purge: function (h) {
        var f = h.attributes, g;
        if (f) {
          for (g = 0; g < f.length; g += 1) {
            if (typeof h[f[g].name] === "function") {
              h[f[g].name] = null
            }
          }
        }
        f = h.childNodes;
        if (f) {
          for (g = 0; g < f.length; g += 1) {
            purge(h.childNodes[g])
          }
        }
      }, ready: (function () {
        return function (l) {
          var h = window, g = false, k = true, n = h.document, m = n.documentElement, q = n.addEventListener ? "addEventListener" : "attachEvent", o = n.addEventListener ? "removeEventListener" : "detachEvent", f = n.addEventListener ? "" : "on", p = function (r) {
            if (r.type == "readystatechange" && n.readyState != "complete") {
              return
            }
            (r.type == "load" ? h : n)[o](f + r.type, p, false);
            if (!g && (g = true)) {
              l.call(h, r.type || r)
            }
          }, j = function () {
            try {
              m.doScroll("left")
            } catch (r) {
              setTimeout(j, 50);
              return
            }
            p("poll")
          };
          if (n.readyState == "complete") {
            l.call(h, "lazy")
          } else {
            if (n.createEventObject && m.doScroll) {
              try {
                k = !h.frameElement
              } catch (i) {
              }
              if (k) {
                j()
              }
            }
            n[q](f + "DOMContentLoaded", p, false);
            n[q](f + "readystatechange", p, false);
            h[q](f + "load", p, false)
          }
        }
      })()
    }
  };
  a[b] = function (f, g) {
    this.element = f;
    this.wrapper = f.parentNode;
    this.source = f.getElementsByTagName("source")[0] || f;
    this.mp3 = (function (h) {
      var i = h.getElementsByTagName("source")[0];
      return h.getAttribute("src") || (i ? i.getAttribute("src") : null)
    })(f);
    this.settings = g;
    this.loadStartedCalled = false;
    this.loadedPercent = 0;
    this.duration = 1;
    this.playing = false
  };
  a[b].prototype = {
    updatePlayhead: function () {
      var f = this.element.currentTime / this.duration;
      this.settings.updatePlayhead.apply(this, [f])
    }, skipTo: function (f) {
      if (f > this.loadedPercent) {
        return
      }
      this.element.currentTime = this.duration * f;
      this.updatePlayhead()
    }, load: function (f) {
      this.loadStartedCalled = false;
      this.source.setAttribute("src", f);
      this.element.load();
      this.mp3 = f;
      a[e].events.trackLoadProgress(this)
    }, loadError: function () {
      this.settings.loadError.apply(this)
    }, init: function () {
      this.settings.init.apply(this)
    }, loadStarted: function () {
      if (!this.element.duration) {
        return false
      }
      this.duration = this.element.duration;
      this.updatePlayhead();
      this.settings.loadStarted.apply(this);
      return true
    }, loadProgress: function () {
      if (this.element.buffered != null && this.element.buffered.length) {
        if (!this.loadStartedCalled) {
          this.loadStartedCalled = this.loadStarted()
        }
        var f = this.element.buffered.end(this.element.buffered.length - 1);
        this.loadedPercent = f / this.duration;
        this.settings.loadProgress.apply(this, [this.loadedPercent])
      }
    }, playPause: function () {
      if (this.playing) {
        this.pause()
      } else {
        this.play()
      }
    }, play: function () {
      var f = (/(ipod|iphone|ipad)/i).test(navigator.userAgent);
      if (f && this.element.readyState == 0) {
        this.init.apply(this)
      }
      if (!this.settings.preload) {
        this.settings.preload = true;
        this.element.setAttribute("preload", "auto");
        a[e].events.trackLoadProgress(this)
      }
      this.playing = true;
      this.element.play();
      this.settings.play.apply(this)
    }, pause: function () {
      this.playing = false;
      this.element.pause();
      this.settings.pause.apply(this)
    }, setVolume: function (f) {
      this.element.volume = f
    }, trackEnded: function (f) {
      this.skipTo.apply(this, [0]);
      if (!this.settings.loop) {
        this.pause.apply(this)
      }
      this.settings.trackEnded.apply(this)
    }
  };
  var c = function (n, j) {
    var m = [];
    j = j || document;
    if (j.getElementsByClassName) {
      m = j.getElementsByClassName(n)
    } else {
      var h, f, g = j.getElementsByTagName("*"), k = new RegExp("(^|\\s)" + n + "(\\s|$)");
      for (h = 0, f = g.length; h < f; h++) {
        if (k.test(g[h].className)) {
          m.push(g[h])
        }
      }
    }
    return m.length > 1 ? m : m[0]
  }
})("audiojs", "audiojsInstance", this);
/*! scripts/html5_audio.js */
(function () {
  var b = 0;
  var c = ["ms", "moz", "webkit", "o"];
  for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
    window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
    window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"]
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (h, e) {
      var d = new Date().getTime();
      var f = Math.max(0, 16 - (d - b));
      var g = window.setTimeout(function () {
        h(d + f)
      }, f);
      b = d + f;
      return g
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (d) {
      clearTimeout(d)
    }
  }
}());
(function (c, e, b) {
  var d = d || function (g) {
      return g
    };
  var a = function (g) {
    if (!(this instanceof a)) {
      return new a(g)
    }
    this.options = g;
    this.config = e.extend(true, {}, a.defaults, this.options);
    this.config.audiojs_settings = e.extend({}, audiojs.settings, a.defaults.audiojs_settings, this.config.audiojs_settings);
    this.localized = e.extend({
      no_id3: "Listen",
      flash_error: '<a href="http://get.adobe.com/flashplayer/">Flash 9 is required to listen to audio.</a>'
    }, this.config.localized);
    this.__init();
    a.register(this);
    return this
  };
  a.prototype = {
    playing: false,
    onscreen: true,
    animation_interval: false,
    animation_callback: false,
    animation_arguments: [],
    last_tick: 0,
    __init: function () {
      this.__build_track_list();
      this.title = a.format_title(this.tracks[0]);
      if (typeof this.config.template === "string") {
        this.config.template = c.template(this.config.template)
      }
      this.$container = e(this.config.template({
        service: this.config.service,
        cover: this.config.cover,
        tracks: this.config.tracks,
        title: this.title
      })).addClass(this.config.container_classes);
      if (this.config.replace) {
        e(this.config.replace).replaceWith(this.$container)
      } else {
        if (this.config.append_to) {
          e(this.config.append_to).append(this.$container)
        } else {
          if (this.config.prepend_to) {
            e(this.config.prepend_to).prepend(this.$container)
          }
        }
      }
      this.__cache_selectors();
      this.__defer_artwork();
      this.__proxy_functions();
      this.$player.addClass(this.config.player_classes);
      this.starting_track_id = this.config.start_at || 0;
      if (!this.track_info(this.starting_track_id, "artist") && !this.track_info(this.starting_track_id, "track") && !this.track_info(this.starting_track_id, "album")) {
        this.$message_text.html(this.localized.no_id3);
        this.$player.addClass("message")
      }
      this.__init_visualizations();
      this.config.audiojs_settings.createPlayer.markup = "";
      this.config.audiojs_settings.createPlayer.css = "";
      this.__init_audiojs();
      if (!this.audiojs.settings.useFlash || !this.audiojs.settings.hasFlash) {
        this.bind_events()
      }
      if (this.config.lightbox) {
        this.$container.addClass("has_lightbox")
      }
      e(document.body).trigger("tumblr:audio:ready", {
        audioplayer: this,
        using_flash: (this.audiojs.settings.useFlash && this.audiojs.settings.hasFlash)
      })
    },
    __init_audiojs: function () {
      this.element = this.config.el || this.__create_el(this.config.wrapper || this.$player.get(0));
      this.audiojs = audiojs.create(this.element, this.config.audiojs_settings);
      this.audiojs.audioplayer = this;
      this.check_flash_error()
    },
    __create_el: function (g) {
      return e("<audio/>").attr({type: "audio/mp3"}).appendTo(g).get(0)
    },
    __get_post: function () {
      return this.$post || (this.$post = e("#post_" + this.options.post_id))
    },
    __get_post_data: function () {
      return this.postData || (this.postData = this.__get_post().data("json"))
    },
    __cache_selectors: function () {
      this.$player = this.$container.find(".audio_player");
      if (this.track_info(0, "cover")) {
        this.$container.addClass("has_art")
      }
      this.$controls = this.$container.find(".audio_controls");
      this.$visualizer = this.$container.find(".audio_visualizer");
      this.$message_container = this.$container.find(".audio_message_container");
      this.$message_text = this.$container.find(".audio_message_text");
      this.$overlay = this.$container.find(".audio_player_overlay");
      this.$progress_container = this.$container.find(".progress_container");
      this.$load_progress = this.$container.find(".load_progress");
      this.$play_progress = this.$container.find(".play_progress");
      this.$playhead = this.$container.find(".playhead");
      this.$seek_overlay = this.$container.find(".seek_overlay");
      this.$seek_position = this.$container.find(".seek_position");
      this.$seek_time = this.$container.find(".seek_time");
      this.$play_pause_container = this.$container.find(".play_pause_container");
      this.$play_button = this.$container.find(".play_button");
      this.$pause_button = this.$container.find(".pause_button");
      this.$text_wrapper = this.$container.find(".player_text_wrapper");
      this.$text = this.$container.find(".player_text");
      this.$track_name = this.$container.find(".track_name");
      this.$artist_name = this.$container.find(".artist_name");
      this.$album_name = this.$container.find(".album_name");
      this.truncate_text();
      this.$current_time = this.$container.find(".current_time");
      this.$total_time = this.$container.find(".total_time");
      this.$album_art_container = this.$container.find(".album_art_container");
      this.$main_album_art = this.$container.find(".album_art.main");
      this.$album_art = this.$container.find(".album_art").not(this.$main_album_art).hide()
    },
    __defer_artwork: function () {
      if (this.$album_art_container.is(":visible")) {
        this.$album_art_container.hide(1, function () {
          e(this).show()
        })
      }
    },
    __init_visualizations: function () {
      this.$visualizer.empty();
      if (this.config.eq) {
        this.generate_equalizer();
        this.equalizer_levels(0);
        this.real_frequencies = a.has_equalizer_support();
        this.$container.addClass("has_visualizer");
        this.truncate_text()
      }
    },
    __proxy_functions: function () {
      this._on_focus_player = e.proxy(this.on_focus_player, this);
      this._album_art_lightbox = e.proxy(this.album_art_lightbox, this);
      this._on_overlay_mouseenter = e.proxy(this.on_overlay_mouseenter, this);
      this._on_overlay_mouseleave = e.proxy(this.on_overlay_mouseleave, this);
      this._on_overlay_mousedown = e.proxy(this.on_overlay_mousedown, this);
      this._on_seek_mouseenter = e.proxy(this.on_seek_mouseenter, this);
      this._on_seek_mousemove = e.proxy(this.on_seek_mousemove, this);
      this._on_seek_mouseleave = e.proxy(this.on_seek_mouseleave, this);
      this._on_seek_begin = e.proxy(this.on_seek_begin, this);
      this._on_seek_move = e.proxy(this.on_seek_move, this);
      this._on_seek_end = e.proxy(this.on_seek_end, this);
      this._on_audio_playing = e.proxy(this.on_audio_playing, this);
      this._on_audio_pause = e.proxy(this.on_audio_pause, this);
      this._play = e.proxy(this.play, this);
      this._pause = e.proxy(this.pause, this);
      this._load_progress = e.proxy(this.load_progress, this);
      this._play_progress = e.proxy(this.play_progress, this)
    },
    __build_track_list: function (g) {
      this.tracks = g || this.config.tracks;
      if (!this.tracks.length) {
        this.tracks = [e.extend({}, a.defaults.tracks[0])];
        this.tracks[0].bpm = this.config.bpm;
        this.tracks[0].stream_url = this.config.stream_url;
        this.tracks[0].track = this.config.track;
        this.tracks[0].artist = this.config.artist;
        this.tracks[0].album = this.config.album;
        this.tracks[0].cover = this.config.cover
      }
    },
    bind_events: function () {
      this.$player.on({touchstart: this._on_focus_player, mousedown: this._on_focus_player});
      this.$album_art_container.on("click", this._album_art_lightbox);
      this.$overlay.on({
        touchstart: this._on_overlay_mousedown,
        mouseenter: this._on_overlay_mouseenter,
        mouseleave: this._on_overlay_mouseleave,
        mousedown: this._on_overlay_mousedown
      });
      this.$seek_overlay.on({
        mouseenter: this._on_seek_mouseenter,
        mouseleave: this._on_seek_mouseleave,
        mousemove: this._on_seek_mousemove,
        mousedown: this._on_seek_begin
      });
      e(document.body).on({"tumblr:audio:playing": this._on_audio_playing, "tumblr:audio:pause": this._on_audio_pause})
    },
    unbind_events: function () {
      this.$player.off({touchstart: this._on_focus_player, mousedown: this._on_focus_player});
      this.$album_art_container.off("click", this._album_art_lightbox);
      this.$overlay.off({
        touchstart: this._on_overlay_mousedown,
        mouseenter: this._on_overlay_mouseenter,
        mouseleave: this._on_overlay_mouseleave,
        mousedown: this._on_overlay_mousedown
      });
      this.$seek_overlay.off({
        mouseenter: this._on_seek_mouseenter,
        mouseleave: this._on_seek_mouseleave,
        mousemove: this._on_seek_mousemove,
        mousedown: this._on_seek_begin
      });
      e(document.body).off({
        mousemove: this._on_seek_move,
        mouseup: this._on_seek_end,
        "tumblr:audio:playing": this._on_audio_playing,
        "tumblr:audio:pause": this._on_audio_pause
      })
    },
    responsive_size_embed: function (i, g) {
      this.$container.removeClass("hide_art hide_visualizer condense_visualizer");
      this.$container.addClass("embed");
      if (this.track_info(0, "cover")) {
        this.$container.addClass("has_art")
      }
      if (this.config.eq) {
        this.$container.addClass("has_visualizer")
      }
      if (this.$container.hasClass("has_art") && g * 2 <= i && g >= 30) {
        this.$album_art_container.css("width", g);
        this.$player.css("padding-right", g);
        this.$visualizer.css("margin-right", g)
      } else {
        this.$album_art_container.css("width", "");
        this.$player.css("padding-right", "");
        this.$visualizer.css("margin-right", "");
        if (this.$container.hasClass("has_art") || i < 250) {
          this.$container.removeClass("has_visualizer embed")
        }
        this.$container.removeClass("has_art")
      }
      if (this.$container.hasClass("has_art")) {
        if (g < 169) {
          this.$controls.css("height", "");
          this.$container.removeClass("has_visualizer")
        } else {
          var h = this.config.eq ? this.$visualizer.outerHeight() : 0;
          this.$controls.css("height", g - h)
        }
      } else {
        this.$controls.css("height", "");
        if (g < 85 || g > 85) {
          this.$container.removeClass("has_visualizer")
        }
      }
      if (this.$equalizer) {
        if (this.$equalizer.width() < 300) {
          this.$container.addClass("condense_visualizer")
        }
      }
      this.responsive_size(this.$controls.width(), this.$controls.height())
    },
    responsive_size: function (h, g) {
      this.$container.removeClass("switch small button listen");
      if (g > 50) {
        if (h < 110) {
          this.$container.addClass("button")
        } else {
          if (h < 205) {
            this.$container.addClass("listen")
          }
        }
      } else {
        this.$container.addClass("small");
        if (h < 70) {
          this.$container.addClass("button")
        } else {
          this.$container.addClass("listen")
        }
      }
    },
    check_flash_error: function () {
      var g = this.audiojs.settings.useFlash && !this.audiojs.settings.hasFlash;
      if (g && !this.flash_error) {
        this.audiojs.settings.flashError.apply(this.audiojs)
      }
    },
    on_focus_player: function (g) {
      if (g && !a.is_left_click(g)) {
        return true
      }
      a.set_key_commands(true, true)
    },
    on_overlay_mouseenter: function (g) {
      this.$player.addClass("hover")
    },
    on_overlay_mouseleave: function (g) {
      this.$player.removeClass("hover")
    },
    on_overlay_mousedown: function (g) {
      if (g && !a.is_left_click(g)) {
        return true
      }
      if (this.flash_error) {
        return true
      } else {
        if (!this.audiojs.loadedPercent) {
          if (this.load_track(this.config.start_at)) {
            this.play()
          }
        } else {
          if (!this.error) {
            this.play_pause()
          }
        }
      }
      g.preventDefault()
    },
    on_seek_mouseenter: function (g) {
      this.$progress_container.addClass("seek")
    },
    on_seek_mousemove: function (h) {
      var g = this.get_seek_progress(h.pageX - this.$progress_container.offset().left);
      this.$seek_position.css("left", (100 * g) + "%");
      if (this.$progress_container.width() * Math.abs(this.play_progress - g) < 5) {
        this.$player.addClass("playhead_hover")
      } else {
        this.$player.removeClass("playhead_hover")
      }
      if (this.total_time) {
        this.$seek_time.text(a.format_time(g * this.total_time))
      }
    },
    on_seek_mouseleave: function (g) {
      this.$player.removeClass("playhead_hover");
      this.$progress_container.removeClass("seek")
    },
    on_audio_playing: function (h, g) {
      a.handling_on_play = true;
      if (a.config.one_at_a_time && g.audioplayer !== this) {
        if (this.current_state("unplayed")) {
          this.paused_animation_start(true)
        } else {
          if (this.playing) {
            this.pause()
          }
        }
      }
      a.handling_on_play = false
    },
    on_audio_pause: function (h, g) {
      if (a.handling_on_play) {
        return
      }
      if (a.config.one_at_a_time && g.audioplayer !== this) {
        if (this.current_state("unplayed")) {
          this.demo_animation_start()
        }
      }
    },
    on_seek_begin: function (g) {
      if (g && !a.is_left_click(g)) {
        return true
      }
      this.$player.addClass("seeking");
      e(document.body).addClass("grabbing");
      this.was_playing = this.audiojs.playing;
      if (this.was_playing) {
        this.$player.addClass("was_playing")
      }
      this.pause();
      e(document.body).on({mousemove: this._on_seek_move, mouseup: this._on_seek_end});
      this.seek_move_timeout = c.delay(this._on_seek_move, 50, g, true);
      this.on_focus_player(g);
      return false
    },
    on_seek_move: function (i, g) {
      clearTimeout(this.seek_move_timeout);
      if (!g) {
        this.$player.addClass("show_seek_time")
      }
      this.on_seek_mousemove(i);
      var h = this.get_seek_progress();
      this.set_play_progress(h);
      this.set_time(h * this.total_time, this.total_time)
    },
    on_seek_end: function (g) {
      this.$player.removeClass("seeking show_seek_time was_playing");
      e(document.body).removeClass("grabbing");
      this.skip_to(Math.min(this.total_time ? (this.total_time - 0.1) / this.total_time : 1, this.get_seek_progress(g.pageX - this.$progress_container.offset().left)));
      if (this.was_playing) {
        this.play()
      }
      e(document.body).off({mousemove: this._on_seek_move, mouseup: this._on_seek_end})
    },
    load_track: function (h) {
      if (this.current_track_id === h) {
        return false
      }
      if (h >= this.tracks.length || h < 0) {
        return false
      }
      if (this.audiojs.playing) {
        this.pause()
      }
      this.current_track_id = h;
      this.current_track = this.tracks[h];
      this.$track_name.text(this.current_track.track);
      this.$artist_name.text(this.current_track.artist);
      this.$album_name.text(this.current_track.album);
      this.$current_album_art = e(this.$album_art.get(h));
      this.$current_album_art.show();
      this.$album_art.not(this.$current_album_art).hide();
      this.truncate_text();
      this.$player.removeClass("message");
      var g = this.config.post_key ? "?play_key=" + this.config.post_key : "";
      this.audiojs.load(this.current_track.stream_url + g);
      this.equalizer_levels(0);
      if (!this.audiojs.settings.useFlash) {
        this.use_audio_context(Tumblr.AudioPlayer.context)
      }
      return true
    },
    play_pause: function () {
      return this.audiojs.playing ? this.pause() : this.play()
    },
    smart_play_pause: function (g) {
      if (typeof g === "undefined") {
        g = !this.audiojs.playing
      }
      if (this.flash_error) {
        return false
      } else {
        if (!this.audiojs.loadedPercent) {
          if (g && this.load_track(this.config.start_at)) {
            this.play()
          }
        } else {
          if (!this.error) {
            return g ? this.play() : this.pause()
          }
        }
      }
    },
    play: function () {
      if (Tumblr.Events) {
        Tumblr.Events.trigger("useraction:audio:play", {
          loggingData: {
            postData: this.__get_post_data(),
            userAction: "audio"
          },
        })
      }
      return this.audiojs.play()
    },
    pause: function () {
      return this.audiojs.pause()
    },
    skip_to: function (g) {
      return this.audiojs.skipTo(g)
    },
    previous_track: function () {
      if (this.load_track(this.current_track_id - 1)) {
        this.play();
        return true
      }
      return false
    },
    next_track: function () {
      if (this.load_track(this.current_track_id + 1)) {
        this.play();
        return true
      }
      return false
    },
    get_seek_progress: function (g) {
      if (typeof g !== "number") {
        g = this.$seek_position.position().left
      }
      return Math.max(0, Math.min(g / this.$progress_container.width(), 1))
    },
    set_play_progress: function (g) {
      this.$play_progress.width((100 * g) + "%");
      this.$playhead.css("left", (100 * g) + "%")
    },
    set_time: function (h, g) {
      if (typeof h !== "number") {
        h = 0
      }
      this.$current_time.text(a.format_time(h));
      if (typeof g !== "number") {
        return
      }
      this.$total_time.text(a.format_time(g))
    },
    set_load_progress: function (g) {
      this.$load_progress.width((100 * g) + "%")
    },
    album_art_lightbox: function (g) {
      if (g && !a.is_left_click(g)) {
        return true
      }
      if (!this.config.lightbox) {
        return false
      }
      var h = this.current_track_info("cover");
      if (!h) {
        return false
      }
      return this.config.lightbox.init([{high_res: h}])
    },
    truncate_text: function (h) {
      var i = this.$text_wrapper.width();
      if (!i) {
        if (typeof h !== "number") {
          h = 10
        }
        if (h > 0) {
          c.delay(e.proxy(this.truncate_text, this), 100, --h);
          return
        }
      }
      var g = this.max_lines(this.$track_name, 3, "...");
      this.max_lines(this.$artist_name, 4 - g, "...")
    },
    max_lines: function (g, o, k) {
      var n = e(g);
      var m = n.clone().css("opacity", 0.5).text("A");
      n.after(m);
      var l = m.height(), i = l * o;
      if (!n.data("full_text")) {
        n.data("full_text", n.text())
      }
      if (!i) {
        m.remove();
        n.text("");
        return o
      }
      m.text(n.data("full_text"));
      if (m.height() <= i) {
        m.remove();
        n.text(n.data("full_text"));
        return Math.ceil(n.height() / l)
      }
      if (typeof k !== "string") {
        k = "..."
      }
      var j = n.data("full_text").split(" ");
      var h = 0;
      do {
        m.text(j.slice(0, ++h).join(" ") + k)
      } while (m.height() <= i && h <= j.length);
      n.text(j.slice(0, h - 1).join(" ") + k);
      m.remove();
      return Math.ceil(n.height() / l)
    },
    use_audio_context: function (h) {
      if (!h || !this.config.eq) {
        return false
      }
      this.context = h;
      this.source = this.context.createMediaElementSource(this.audiojs.source);
      this.analyser_node = this.context.createAnalyser();
      this.analyser_node.fftSize = 128;
      this.analyser_node.smoothingTimeConstant = 0.2;
      this.frequency_array = new Uint8Array(this.analyser_node.frequencyBinCount);
      this.nodes = [this.source, this.analyser_node, this.context.destination];
      for (var g = 1; g < this.nodes.length; g++) {
        this.nodes[g - 1].connect(this.nodes[g])
      }
    },
    read_analyser_frequencies: function (m, j, s, q) {
      if (this.analyser_node) {
        this.analyser_node.getByteFrequencyData(this.frequency_array)
      } else {
        if (this.audiojs.settings.useFlash && this.audiojs.settings.hasFlash) {
          var t;
          try {
            t = this.audiojs.element.getByteFrequencyData()
          } catch (o) {
            return false
          }
          if (!t || t === "NO_ACCESS" || t.match(/ERR/)) {
            this.equalizer_levels(0);
            return false
          }
          var k = t.match(/.{1,2}/g);
          var r = Math.floor(0.5 * k.length);
          var g;
          var p = true;
          this.frequency_array = [];
          for (var l = 0; l < r; l++) {
            g = 0.5 * (parseInt(k[l], 16) + parseInt(k[l + r], 16));
            if (g) {
              p = false
            }
            this.frequency_array.push(g)
          }
          if (p) {
            return false
          }
        } else {
          return false
        }
      }
      if (typeof s !== "number") {
        s = 1
      }
      if (typeof q !== "number") {
        q = 0
      }
      var h = a.scale_array_values(this.frequency_array, this.config.eq.bands + q, true, function (u, n) {
        u *= s;
        if (m) {
          u /= m
        }
        if (j) {
          return Math.max(0, Math.min(u, 1))
        } else {
          return u
        }
      });
      if (q) {
        return h.slice(0, this.config.eq.bands)
      } else {
        return h
      }
    },
    generate_equalizer: function () {
      if (this.$equalizer) {
        this.$equalizer.remove()
      }
      var i = this.config.eq;
      if (!i) {
        return false
      }
      this.$equalizer = e("<div/>").addClass("audio_equalizer");
      if (!this.config.preview && !this.$container.hasClass("has_art")) {
        i.bands = 7
      }
      var h, k;
      for (var g = 0; g < i.bands; g++) {
        h = e("<div/>").addClass("audio_equalizer_band").data({wait: 0, peak: 0, level: 0}).appendTo(this.$equalizer);
        for (var j = 0; j < i.levels; j++) {
          k = e("<b>").appendTo(h);
          if (j === i.levels - 1) {
            k.addClass("peak")
          }
        }
      }
      this.$visualizer.append(this.$equalizer);
      return true
    },
    equalizer_levels: function (j, k, h, g) {
      if (!this.$equalizer) {
        return false
      }
      if (typeof j !== "number" && !e.isArray(j)) {
        var i = [];
        this.$equalizer.children(".audio_equalizer_band").each(function (l, m) {
          i[l] = e(m).data("level")
        });
        return i
      }
      this.$equalizer.children(".audio_equalizer_band").each(e.proxy(function (o, r) {
        var s = 0;
        if (typeof j === "number") {
          s = j
        } else {
          if (j && o < j.length && j[o]) {
            s = j[o]
          }
        }
        var p = e(r);
        var m = this.config.eq.levels;
        var n = Math.floor(s * (m - 1));
        var q = parseFloat(p.data("peak")) || 0;
        var l = k || (s > q);
        if (l) {
          p.data({wait: 10, peak: s})
        }
        p.data("level", s);
        p.children("b").each(function (t, v) {
          var u = e(v);
          u.removeClass("on");
          if (!h && m - n < t + 1) {
            u.addClass("on")
          }
          if (l) {
            u.removeClass("peak");
            if (g) {
              if (m - n - 0.5 * g <= t + 1 && m - n + 0.5 * g > t + 1) {
                u.addClass("peak")
              }
            } else {
              if (m - n === t + 1) {
                u.addClass("peak")
              }
            }
          }
        })
      }, this));
      return true
    },
    equalizer_image: function (g) {
      if (!this.$equalizer) {
        return false
      }
      this.$equalizer.children(".audio_equalizer_band").each(e.proxy(function (h, j) {
        var i = e(j);
        i.children("b").each(function (m, l) {
          var k = e(l);
          k.removeClass("on peak");
          if (h >= g.length) {
            return
          }
          if (m >= g[h].length) {
            return
          }
          if (g[h][m] < 0) {
            k.addClass("on")
          } else {
            if (g[h][m] > 0) {
              k.addClass("peak")
            }
          }
        })
      }, this));
      return true
    },
    equalizer_dolphin: function (g, k, j, i) {
      var h = a.offset_image(a.dolphin_frames[j ? 1 : 0], g, k, i);
      return this.equalizer_image(h)
    },
    equalizer_peaks: function () {
      if (!this.$equalizer) {
        return false
      }
      var g = true;
      this.$equalizer.children(".audio_equalizer_band").each(e.proxy(function (k, o) {
        var l = e(o);
        var m = parseFloat(l.data("peak")) || 0;
        var p = parseFloat(l.data("level")) || 0;
        var n = parseFloat(l.data("wait")) || 0;
        if (m !== p) {
          g = false
        }
        if (n > 0) {
          l.data("wait", n - 1);
          return
        }
        m = Math.max(m - 0.1, p);
        l.data("peak", m);
        var h = this.config.eq.levels;
        var j = Math.floor(m * (h - 1));
        l.data("peak", m);
        l.children("b").each(function (q, s) {
          var r = e(s);
          r.removeClass("peak");
          if (h - j === q + 1) {
            r.addClass("peak")
          }
        })
      }, this));
      return g
    },
    set_animation_callback: function (i, g, h) {
      if (!i) {
        return this.reset_animation()
      }
      this.animation_callback = i;
      this.animation_interval = g || 30;
      this.animation_arguments = h || [];
      this.last_tick = 0
    },
    reset_animation: function () {
      this.animation = false;
      e(document.body).trigger("tumblr:audio:animation_complete", {audioplayer: this});
      this.animation_callback = false;
      this.animation_interval = false;
      this.animation_arguments = [];
      this.last_tick = 0
    },
    animation_tick: function (g, h) {
      if (!this.animation_callback) {
        return false
      }
      if (!(h || this.onscreen)) {
        return false
      }
      if (this.last_tick && g - this.last_tick < this.animation_interval) {
        return false
      }
      this.animation_callback.apply(this, this.animation_arguments);
      this.last_tick = g;
      return true
    },
    demo_animation_start: function (h) {
      if (a.config.disable_inactive_loop) {
        return false
      }
      if (!(h || this.$player.hasClass("inactive"))) {
        return false
      }
      var g = 60;
      var i = this.current_track_info("bpm") || 150;
      this.demo_frequency = i / 2 / Math.PI / g;
      this.demo_loop_index = 0;
      this.set_animation_callback(this.demo_animation_tick, g)
    },
    demo_animation_tick: function () {
      this.loop_index++;
      var g = Math.abs(Math.tan(Math.sin(this.demo_frequency * this.demo_loop_index)) * 2 / Math.PI);
      g *= 0.5 * Math.max(0, Math.sin(0.5 * this.demo_frequency * this.demo_loop_index)) + 0.5;
      g = 0.4 * Math.abs(g) + 0.6;
      this.equalizer_levels(this.generate_demo_eq(0.75 * g, 0.3, 0.2, 1.6));
      this.equalizer_peaks()
    },
    playing_animation_start: function () {
      var g = 30;
      if (typeof this.fallback_offset !== "number") {
        this.fallback_offset = 0
      }
      if (this.real_frequencies) {
        this.set_animation_callback(this.visualizer_animation_tick, g, [true, true, false])
      } else {
        this.set_animation_callback(this.fallback_animation_tick, g)
      }
    },
    paused_animation_start: function (h) {
      var g = 30;
      if (h) {
        this.equalizer_levels(0)
      }
      this.set_animation_callback(this.visualizer_animation_tick, g, [false, true, true])
    },
    visualizer_animation_tick: function (i, j, g) {
      if (i) {
        this.equalizer_levels(this.read_analyser_frequencies(255, true, 1.3, 2))
      }
      var h = false;
      if (j) {
        h = this.equalizer_peaks();
        this.animation = true
      }
      if (h && g) {
        this.reset_animation()
      }
    },
    fallback_animation_tick: function () {
      if (this.playing) {
        this.fallback_offset++
      }
      this.equalizer_levels(this.generate_sine_eq(this.fallback_offset), true, true, 2)
    },
    idle_animation_start: function () {
      if (!this.$equalizer) {
        return
      }
      this.dolphin_width = 6;
      this.dolphin_height = 5;
      this.dolphin_x = -this.dolphin_width;
      this.dolphin_y = 0;
      this.dolphin_left = false;
      this.dolphin_up = false;
      this.dolphin_frame = 0;
      this.dolphin_min_x = -1;
      this.dolphin_max_x = this.config.eq.bands - this.dolphin_width + 1;
      this.dolphin_min_y = -1;
      this.dolphin_max_y = this.config.eq.levels - this.dolphin_height + 1;
      if (!a.dolphin_frames) {
        a.generate_dolphins()
      }
      this.set_animation_callback(this.idle_animation_tick, 300)
    },
    idle_animation_tick: function () {
      this.equalizer_dolphin(this.dolphin_x, this.dolphin_y, this.dolphin_frame, this.dolphin_left);
      this.dolphin_frame = (this.dolphin_frame + 1) % a.dolphin_frames.length;
      if (this.dolphin_frame !== 0) {
        return
      }
      this.dolphin_x += this.dolphin_left ? -1 : 1;
      this.dolphin_y += this.dolphin_up ? -1 : 1;
      if (!this.dolphin_left && this.dolphin_x >= this.dolphin_max_x) {
        this.dolphin_x = this.dolphin_max_x;
        this.dolphin_left = true
      } else {
        if (this.dolphin_left && this.dolphin_x <= this.dolphin_min_x) {
          this.dolphin_x = this.dolphin_min_x;
          this.dolphin_left = false
        }
      }
      if (!this.dolphin_up && this.dolphin_y >= this.dolphin_max_y) {
        this.dolphin_y = this.dolphin_max_y;
        this.dolphin_up = true
      } else {
        if (this.dolphin_up && this.dolphin_y <= this.dolphin_min_y) {
          this.dolphin_y = this.dolphin_min_y;
          this.dolphin_up = false
        }
      }
    },
    visualizer_fallback_tick: function () {
      var i = this.fallback_offset++;
      var h = this.config.eq.bands;
      var g = c.range(h).map(function (j, k) {
        return 0.3 * Math.sin(k + 0.3 * i) + 0.5
      });
      this.equalizer_levels(g, true, true, 2)
    },
    generate_sine_eq: function (i, g) {
      var h = this.config.eq ? this.config.eq.bands : 11;
      if (typeof i !== "number") {
        i = 0
      }
      if (typeof g !== "number") {
        g = 0.3
      }
      return c.range(h).map(function (j, k) {
        return g * Math.sin(k + 0.3 * i) + 0.5
      })
    },
    generate_demo_eq: function (j, i, g, h) {
      if (typeof j !== "number") {
        j = 1
      }
      if (typeof g !== "number") {
        g = 0
      }
      if (typeof h !== "number") {
        h = 1
      }
      return c.range(this.config.eq.bands).map(e.proxy(function (k, l) {
        var m = Math.max(0, Math.min(1 - l / (this.config.eq.bands - 1) + i, 1));
        return Math.pow(j * m * (g * Math.random() + 1 - g), h)
      }, this))
    },
    track_info: function (i, h) {
      if (!this.tracks.length) {
        return
      }
      if (typeof i === "undefined") {
        i = this.config.start_at
      }
      if (i < 0 || i >= this.tracks.length) {
        return
      }
      var g = this.tracks[i];
      return h ? g[h] : g
    },
    current_track_info: function (g) {
      return this.track_info(this.current_track_id, g)
    },
    is_onscreen: function (h) {
      if (!this.rect) {
        return
      }
      if (typeof h !== "number") {
        h = 50
      }
      var j = this.$container.offset().top;
      var g = this.$container.offset().top + this.$container.height();
      var i = this.rect.windowScrollTop;
      var k = i + this.rect.windowHeight;
      if (j > k + h) {
        return (this.onscreen = false)
      }
      if (g < i - h) {
        return (this.onscreen = false)
      }
      return (this.onscreen = true)
    },
    needs_animation: function (g) {
      if (g) {
        this.is_onscreen()
      }
      if (!this.onscreen) {
        return false
      }
      if (this.playing || this.animation) {
        return true
      }
      if (!a.config.disable_inactive_loop && this.$player.hasClass("unplayed")) {
        return true
      }
      if (!this.$player.hasClass("unplayed") && this.$player.hasClass("inactive")) {
        return true
      }
      return false
    },
    current_state: function (g) {
      var h = "";
      if (this.playing) {
        h = "playing"
      } else {
        if (this.$player.hasClass("unplayed")) {
          h = "unplayed"
        } else {
          if (this.$player.hasClass("inactive")) {
            h = "inactive"
          } else {
            if (this.$player.hasClass("error")) {
              h = "error"
            } else {
              h = "paused"
            }
          }
        }
      }
      if (typeof g === "undefined") {
        return h
      } else {
        return (h === g)
      }
    }
  };
  a.instances = [];
  a.register = function (g) {
    this.instances.push(g)
  };
  a.unregister = function (g) {
    this.instances.splice(c.indexOf(this.instances, g), 1)
  };
  a.config = {
    disable_inactive_loop: true,
    draw_offscreen: false,
    one_at_a_time: true,
    auto_advance: false,
    key_commands: true
  };
  a.key_commands = false;
  a.idle_delay = 1;
  a.__init_jukebox = function (g) {
    this.config = e.extend(this.config, g);
    e(document.body).on("click.tumblraudio", ".audio_player_container.placeholder", function (j) {
      var i = Tumblr.AudioPlayer.replace_placeholder(e(j.currentTarget));
      i.smart_play_pause()
    });
    e(document.body).on({
      "tumblr:audio:animation_complete": e.proxy(function (j, i) {
        this.update_onscreen()
      }, this), "tumblr:audio:playing": e.proxy(function (j, i) {
        this.current_player_id = e.inArray(i.audioplayer, this.instances);
        this.current_player = i.audioplayer;
        e("iframe.tumblr_video_iframe").each(function (k, l) {
          l.contentWindow.postMessage("pause", "*")
        });
        this.update_onscreen()
      }, this), "tumblr:audio:pause": e.proxy(function (j, i) {
        this.update_onscreen()
      }, this), "tumblr:audio:ended": e.proxy(function (j, i) {
        if (this.config.auto_advance) {
          if (this.current_player_id + 1 < this.instances.length) {
            this.instances[this.current_player_id + 1].on_overlay_mousedown()
          }
        }
      }, this), mousedown: e.proxy(function (i) {
        this.set_key_commands(false)
      }, this), keydown: e.proxy(function (j) {
        if (!j) {
          return false
        }
        if (!this.key_commands) {
          return true
        }
        if (!this.current_player) {
          return true
        }
        var i = j.charCode ? j.charCode : j.keyCode;
        switch (i) {
          case 32:
            this.current_player.play_pause();
            j.preventDefault();
            j.stopPropagation();
            return false;
          case 37:
            if (!(j.ctrlKey || j.metaKey)) {
              return true
            }
            j.preventDefault();
            j.stopPropagation();
            if (this.current_player.current_time > 2) {
              this.current_player.skip_to(0);
              return false
            }
            return !this.current_player.previous_track();
          case 39:
            if (!(j.ctrlKey || j.metaKey)) {
              return true
            }
            j.preventDefault();
            j.stopPropagation();
            return !this.current_player.next_track();
          case 27:
            this.set_key_commands(false);
            return false
        }
      }, this)
    });
    if (b.DOMEventor) {
      b.Events.on("DOMEventor:flatscroll", c.debounce(this.update_onscreen, 100), this);
      this.prototype.rect = b.DOMEventor.rect()
    } else {
      e(window).on("scroll", c.debounce((function (i) {
        var k = e(window);
        var j = i.prototype.rect = {};
        return function () {
          j.windowScrollTop = k.scrollTop();
          j.windowHeight = k.height();
          i.update_onscreen()
        }
      })(this), 100))
    }
    try {
      Tumblr.PostMessageListener.initialize(function (j, i) {
        if (j[0] === "video_do_play") {
          Tumblr.AudioPlayer.pause_all()
        }
      })
    } catch (h) {
    }
  };
  a.update_all = function () {
    var g = false;
    var h = false;
    var i = (!this.current_player || !this.current_player.playing);
    this.replace_placeholders();
    e.each(this.instances, e.proxy(function (k, j) {
      if (j.is_onscreen()) {
        g = true
      }
      if (!h && j.needs_animation()) {
        h = true
      }
      if (i && j.current_state("unplayed")) {
        j.demo_animation_start(false)
      }
    }, this));
    if (this.instances.length) {
      if (h) {
        this.animation_start()
      } else {
        this.animation_stop()
      }
    }
  };
  a.update_onscreen = function () {
    var g = false;
    var h = false;
    e.each(this.instances, function (k, j) {
      if (j.is_onscreen()) {
        g = true
      }
      if (!h && j.needs_animation()) {
        h = true
      }
    });
    if (this.instances.length) {
      if (h) {
        this.animation_start()
      } else {
        this.animation_stop()
      }
    }
  };
  a.pause_all = function (g) {
    e.each(this.instances, function (j, h) {
      if (g && g === h.config.post_id) {
        return
      }
      h.pause()
    })
  };
  a.animation_start = function () {
    if (this.animating) {
      return
    }
    this.animating = true;
    window.cancelAnimationFrame(this.animation_frame);
    this.animation_frame = window.requestAnimationFrame(this._animation_tick)
  };
  a.animation_tick = function () {
    var g = Date.now();
    e.each(this.instances, e.proxy(function (j, h) {
      h.animation_tick(g, this.config.draw_offscreen)
    }, this));
    if (this.animating) {
      this.animation_frame = window.requestAnimationFrame(this._animation_tick)
    }
  };
  a._animation_tick = e.proxy(a.animation_tick, a);
  a.animation_stop = function (g) {
    this.animating = false;
    window.cancelAnimationFrame(this.animation_frame)
  };
  a.inactive_player_demo = function () {
    e.each(this.instances, function (h, g) {
      if (g.current_state("unplayed")) {
        g.demo_animation_start(false)
      }
    })
  };
  a.when_dolphins_cry = function () {
    e.each(this.instances, function (h, g) {
      g.idle_animation_start()
    })
  };
  a.create_context = function () {
    if (window.AudioContext && !e.browser.mozilla) {
      this.context = new window.AudioContext()
    } else {
      if (window.webkitAudioContext) {
        this.context = new window.webkitAudioContext()
      }
    }
    return this.context || false
  };
  a.replace_placeholders = function (g, h) {
    var i = g ? e(g) : e(document.body);
    i.find(".audio_player_container.placeholder").each(c.bind(function (j, k) {
      this.replace_placeholder(k)
    }, this));
    if (h) {
      this.clean_up(true)
    }
  };
  a.replace_placeholder = function (j) {
    var g = e(j);
    var k = g.data();
    g.closest(".post").addClass("is_persistent");
    var l = e("<div/>");
    g.before(l);
    var i = {
      post_key: k.postKey,
      replace: l,
      container_classes: k.containerClasses,
      player_classes: k.playerClasses,
      post_id: k.postId,
      service: k.service,
      cover: k.cover,
      tracks: [{
        bpm: k.bpm,
        stream_url: k.streamUrl,
        track: k.track,
        artist: k.artist,
        album: k.album,
        default_text: !Boolean(k.track + k.artist),
        cover: k.cover
      }],
      localized: {no_id3: k.noId3, flash_error: k.flashError}
    };
    if (k.hasVisualizer === false) {
      i.eq = false
    }
    var h = new a(i);
    g.remove();
    return h
  };
  a.clean_up = function (j) {
    if (!document.body) {
      return
    }
    var h, g;
    for (h = 0; h < this.instances.length; h++) {
      g = this.instances[h];
      if (!g.$container.closest(document.body).length) {
        this.unregister(g);
        h--
      }
    }
    if (j) {
      this.sort()
    }
  };
  a.sort = function () {
    e.each(e(".audio_player_container"), function (h, g) {
      e(g).data("tumblr_audioplayer_sort", h)
    });
    this.instances.sort(function (h, g) {
      return h.$container.data("tumblr_audioplayer_sort") - g.$container.data("tumblr_audioplayer_sort")
    });
    this.current_player_id = e.inArray(this.current_player, this.instances)
  };
  a.scale_array_values = function (h, m, l, k) {
    if (m <= 0) {
      return []
    }
    if (h.length === m) {
      if (typeof k === "function") {
        return h.slice().map(k)
      } else {
        return h.slice()
      }
    }
    if (m === 1) {
      var j = c.reduce(h, function (o, p) {
        return o + p
      }, 0);
      if (typeof k === "function") {
        return [k(j)]
      } else {
        return [j]
      }
    }
    var g = c.range(m);
    var i = h.length / m;
    if (i > 1) {
      return g.map(function (o, r) {
        var t = r * i;
        var q = r * i + i;
        var u = 1 - t % 1;
        var s = q % 1;
        t = Math.floor(t);
        q = Math.floor(q);
        if (!s && t + 1 < q) {
          q -= 1;
          s = 1
        }
        var n = u * h[t] + s * h[q];
        for (var p = t + 1; p < q; p++) {
          n += h[p]
        }
        if (l) {
          n /= i
        }
        if (typeof k === "function") {
          return k(n)
        } else {
          return n
        }
      })
    } else {
      return g.map(function (o, p) {
        var q = Math.floor(p * i);
        var n = h[q] * i;
        if (l) {
          n /= i
        }
        if (typeof k === "function") {
          return k(n)
        } else {
          return n
        }
      })
    }
  };
  a.format_title = function (g) {
    var h = "";
    if (g.artist) {
      h += g.artist
    }
    if (g.track) {
      if (h) {
        h += " "
      }
      h += "&quot;" + g.track + "&quot;"
    }
    if (g.album) {
      if (h) {
        h += " "
      }
      h += "(from '" + g.album + "')"
    }
    return h
  };
  a.format_time = function (j) {
    if (!j || j < 0) {
      j = 0
    }
    function i(m, l) {
      if (typeof m !== "string") {
        m = m.toString()
      }
      return m.length < l ? i("0" + m, l) : m
    }

    var k = Math.floor(j % 60);
    var h = Math.floor(j / 60) % 60;
    var g = Math.floor(j / 3600);
    if (g) {
      return g + ":" + i(h, 2) + ":" + i(k, 2)
    } else {
      return h + ":" + i(k, 2)
    }
  };
  a.has_equalizer_support = function () {
    if (this.context || this.create_context()) {
      if (/chrome/.test(navigator.userAgent.toLowerCase())) {
        return true
      }
    } else {
      if (Tumblr.flashVersion() >= 9) {
        return false
      }
    }
    return false
  };
  a.is_left_click = function (g) {
    return !(g && (g.which > 1 || g.which <= 1 && g.ctrlKey))
  };
  a.generate_image = function (h, k) {
    var g, m, l = [];
    for (var j = 0; j < h.length; j++) {
      g = j % k;
      m = Math.floor(j / k);
      if (!l[g]) {
        l[g] = []
      }
      switch (h[j]) {
        case" ":
          l[g][m] = 0;
          break;
        case"o":
          l[g][m] = -1;
          break;
        default:
        case"x":
          l[g][m] = 1;
          break
      }
    }
    return l
  };
  a.offset_image = function (k, g, l, h) {
    k = k.slice();
    if (h) {
      k.reverse()
    }
    if (g > 0) {
      e.each(c.range(g), function () {
        k.unshift([])
      })
    } else {
      if (g < 0) {
        k.splice(0, -g)
      }
    }
    if (l) {
      for (var j = 0; j < k.length; j++) {
        k[j] = k[j].slice();
        if (l > 0) {
          e.each(c.range(l), function () {
            k[j].unshift(0)
          })
        } else {
          if (l < 0) {
            k[j].splice(0, -l)
          }
        }
      }
    }
    return k
  };
  a.generate_dolphins = function () {
    this.dolphin_frames = [this.generate_image("   x  x  xx xxxxxxx oxoo   x  ", 6), this.generate_image("   x     xx x xxxxxxoxoox  x  ", 6)];
    return this.dolphin_frames
  };
  a.set_key_commands = function (g, h) {
    if (this.ignore_next) {
      this.ignore_next = false;
      return this.key_commands
    }
    if (h) {
      this.ignore_next = true
    }
    this.key_commands = this.config.key_commands && g;
    return this.key_commands
  };
  var f = (function () {
    var k = new RegExp("audio(\\.min|_src|_player)?\\.js.*"), l = new RegExp("(^[^/]+//[^/]+|)(/.*$)|(.*)"), g = document.getElementsByTagName("script");
    for (var h = 0, j = g.length; h < j; h++) {
      var m = g[h].getAttribute("src");
      if (k.test(m)) {
        return m.replace(l, "$1")
      }
    }
    return ""
  })();
  a.defaults = {
    template: c.template('<div class="audio_player_container"><div class="album_art_container"><% if (cover) { %><img src="<%= cover %>" alt="<%- title %>" class="album_art main"/><% }%><% _.each(tracks, function(t, i) { %><% if (t.cover) { %><img src="<%= t.cover %>" alt="<%- Tumblr.AudioPlayer.format_title(t) %>" class="album_art album_art_<%= i %>"/><% }%><% }); %></div><div class="audio_player inactive unplayed"><div class="audio_controls"><div class="progress_container"><div class="load_progress"></div><div class="play_progress"></div><i class="playhead"></i><i class="seek_position"></i><i class="seek_time"></i></div><div class="player_text_wrapper"><div class="player_text"><% if (tracks.length) { %><ul class="id3_tags"><li class="track_name"><%- tracks[0].track %></li><li class="artist_name"><%- tracks[0].artist %></li><li class="album_name"><%- tracks[0].album %></li><% if (tracks[0].default_text) { %><li class="default_text">' + d("Listen") + '</li><% } %></ul><% } %></div></div><ul class="time_container"><li class="current_time">0:00</li><li class="separator"> / </li><li class="total_time">0:00</li></ul><div class="seek_overlay"></div><div class="play_pause_container"><i class="play_button audio_player_button">' + d("Play") + '</i><i class="pause_button audio_player_button">' + d("Pause") + '</i><i class="error_x audio_player_button">' + d("X") + '</i></div><div class="audio_message_container"><span class="audio_message_text">' + d("Listen") + '</span></div></div><div class="audio_visualizer"></div><div class="audio_player_overlay"></div></div></div>'),
    preview: false,
    eq: {
      width: 330,
      height: 84,
      padding_x: 16,
      padding_y: 7,
      bands: 11,
      levels: 14,
      tick_width: 18,
      tick_height: 3,
      tick_radius: 2,
      tick_margin_x: 10,
      tick_margin_y: 2
    },
    cover: "",
    service: "",
    container_classes: "",
    player_classes: "",
    autoplay: false,
    tracks: [{bpm: 150, stream_url: "", track: "", artist: "", album: "", cover: ""}],
    start_at: 0,
    lightbox: Tumblr.Lightbox,
    audiojs_settings: {
      swfLocation: f + "/assets/scripts/legacy/audio-js/audiojs.swf",
      createPlayer: {
        playPauseClass: "play_pause_container",
        scrubberClass: "progress_container",
        progressClass: "play_progress",
        loaderClass: "load_progress",
        timeClass: "time_container",
        durationClass: "total_time",
        playedClass: "current_time",
        errorMessageClass: "audio_message_text",
        playingClass: "playing",
        loadingClass: "loading",
        errorClass: "error"
      },
      css: "",
      trackEnded: function (h) {
        var g = this.audioplayer;
        g.playing = false;
        audiojs.settings.trackEnded.apply(this, arguments);
        g.$player.addClass("inactive");
        g.paused_animation_start(true);
        g.idle_timeout = c.delay(e.proxy(g.idle_animation_start, g), a.idle_delay * 1000);
        e(document.body).trigger("tumblr:audio:ended", {audioplayer: g})
      },
      flashError: function () {
        if (!this.audioplayer) {
          return
        }
        audiojs.settings.flashError.apply(this, arguments);
        var g = this.audioplayer;
        g.playing = false;
        g.flash_error = true;
        g.error = true;
        g.$player.addClass("inactive error flash_error").removeClass("playing");
        g.$message_text.html(g.localized.flash_error)
      },
      loadError: function () {
        audiojs.settings.loadError.apply(this, arguments);
        var g = this.audioplayer;
        g.error = true;
        g.$player.addClass("inactive error").removeClass("playing");
        g.$message_text.html(d("Error"))
      },
      init: function () {
        return audiojs.settings.init.apply(this, arguments)
      },
      loadStarted: function () {
        audiojs.settings.loadStarted.apply(this, arguments);
        var g = this.audioplayer;
        g.error = false
      },
      loadProgress: function (g) {
        return audiojs.settings.loadProgress.apply(this, arguments)
      },
      flashReady: function () {
        var g = this.audioplayer;
        g.__cache_selectors();
        g.__init_visualizations();
        g.bind_events();
        e(document.body).trigger("tumblr:audio:flashready", {audioplayer: g})
      },
      play: function () {
        audiojs.settings.play.apply(this, arguments);
        var g = this.audioplayer;
        g.$player.removeClass("inactive unplayed");
        g.playing = true;
        g.playing_animation_start();
        clearTimeout(g.idle_timeout);
        e(document.body).trigger("tumblr:audio:playing", {audioplayer: g})
      },
      pause: function () {
        audiojs.settings.pause.apply(this, arguments);
        var g = this.audioplayer;
        g.playing = false;
        if (!g.$player.hasClass("inactive")) {
          g.paused_animation_start()
        }
        clearTimeout(g.idle_timeout);
        e(document.body).trigger("tumblr:audio:pause", {audioplayer: g})
      },
      updatePlayhead: function (h) {
        audiojs.settings.updatePlayhead.apply(this, arguments);
        var g = this.audioplayer;
        g.$player.addClass("duration");
        g.total_time = this.element.duration || this.duration;
        g.current_time = g.total_time * h;
        g.play_progress = g.current_time / g.total_time;
        g.set_play_progress(g.play_progress);
        g.set_time(g.current_time, g.total_time);
        e(document.body).trigger("tumblr:audio:update", {
          current_time: a.format_time(g.current_time),
          total_time: a.format_time(g.total_time),
          audioplayer: g
        })
      }
    }
  };
  b.AudioPlayer = a;
  e(function () {
    if (Tumblr.AudioPlayerSettings && !e.isEmptyObject(Tumblr.AudioPlayerSettings)) {
      Tumblr.AudioPlayer.defaults = e.extend(Tumblr.AudioPlayer.defaults, Tumblr.AudioPlayerSettings)
    }
    a.__init_jukebox()
  })
})(_, jQuery, Tumblr);
/*! scripts/audio_player.js */

/*! scripts/jquery.sparkline.min.js */
(function (b) {
  typeof define == "function" && define.amd ? define(["jquery"], b) : b(jQuery)
})(function (ar) {
  var aq = {}, ap, ao, an, am, al, ak, aj, ai, ah, ag, af, ae, ad, ac, aa, Y, W, U, S, Q, O, M, K, J, ab, Z, X, V, T, R, P, N, L = 0;
  ap = function () {
    return {
      common: {
        type: "line",
        lineColor: "#00f",
        fillColor: "#cdf",
        defaultPixelsPerValue: 3,
        width: "auto",
        height: "auto",
        composite: !1,
        tagValuesAttribute: "values",
        tagOptionsPrefix: "spark",
        enableTagOptions: !1,
        enableHighlight: !0,
        highlightLighten: 1.4,
        tooltipSkipNull: !0,
        tooltipPrefix: "",
        tooltipSuffix: "",
        disableHiddenCheck: !1,
        numberFormatter: !1,
        numberDigitGroupCount: 3,
        numberDigitGroupSep: ",",
        numberDecimalMark: ".",
        disableTooltips: !1,
        disableInteraction: !1
      },
      line: {
        spotColor: "#f80",
        highlightSpotColor: "#5f5",
        highlightLineColor: "#f22",
        spotRadius: 1.5,
        minSpotColor: "#f80",
        maxSpotColor: "#f80",
        lineWidth: 1,
        normalRangeMin: undefined,
        normalRangeMax: undefined,
        normalRangeColor: "#ccc",
        drawNormalOnTop: !1,
        chartRangeMin: undefined,
        chartRangeMax: undefined,
        chartRangeMinX: undefined,
        chartRangeMaxX: undefined,
        tooltipFormat: new an('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
      },
      bar: {
        barColor: "#3366cc",
        negBarColor: "#f44",
        stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
        zeroColor: undefined,
        nullColor: undefined,
        zeroAxis: !0,
        barWidth: 4,
        barSpacing: 1,
        chartRangeMax: undefined,
        chartRangeMin: undefined,
        chartRangeClip: !1,
        colorMap: undefined,
        tooltipFormat: new an('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
      },
      tristate: {
        barWidth: 4,
        barSpacing: 1,
        posBarColor: "#6f6",
        negBarColor: "#f44",
        zeroBarColor: "#999",
        colorMap: {},
        tooltipFormat: new an('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
        tooltipValueLookups: {map: {"-1": "Loss", 0: "Draw", 1: "Win"}}
      },
      discrete: {
        lineHeight: "auto",
        thresholdColor: undefined,
        thresholdValue: 0,
        chartRangeMax: undefined,
        chartRangeMin: undefined,
        chartRangeClip: !1,
        tooltipFormat: new an("{{prefix}}{{value}}{{suffix}}")
      },
      bullet: {
        targetColor: "#f33",
        targetWidth: 3,
        performanceColor: "#33f",
        rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
        base: undefined,
        tooltipFormat: new an("{{fieldkey:fields}} - {{value}}"),
        tooltipValueLookups: {fields: {r: "Range", p: "Performance", t: "Target"}}
      },
      pie: {
        offset: 0,
        sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
        borderWidth: 0,
        borderColor: "#000",
        tooltipFormat: new an('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
      },
      box: {
        raw: !1,
        boxLineColor: "#000",
        boxFillColor: "#cdf",
        whiskerColor: "#000",
        outlierLineColor: "#333",
        outlierFillColor: "#fff",
        medianColor: "#f00",
        showOutliers: !0,
        outlierIQR: 1.5,
        spotRadius: 1.5,
        target: undefined,
        targetColor: "#4a2",
        chartRangeMax: undefined,
        chartRangeMin: undefined,
        tooltipFormat: new an("{{field:fields}}: {{value}}"),
        tooltipFormatFieldlistKey: "field",
        tooltipValueLookups: {
          fields: {
            lq: "Lower Quartile",
            med: "Median",
            uq: "Upper Quartile",
            lo: "Left Outlier",
            ro: "Right Outlier",
            lw: "Left Whisker",
            rw: "Right Whisker"
          }
        }
      }
    }
  }, Z = '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}', ao = function () {
    var a, d;
    return a = function () {
      this.init.apply(this, arguments)
    }, arguments.length > 1 ? (arguments[0] ? (a.prototype = ar.extend(new arguments[0], arguments[arguments.length - 1]), a._super = arguments[0].prototype) : a.prototype = arguments[arguments.length - 1], arguments.length > 2 && (d = Array.prototype.slice.call(arguments, 1, -1), d.unshift(a.prototype), ar.extend.apply(ar, d))) : a.prototype = arguments[0], a.prototype.cls = a, a
  }, ar.SPFormatClass = an = ao({
    fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g, precre: /(\w+)\.(\d+)/, init: function (d, c) {
      this.format = d, this.fclass = c
    }, render: function (t, s, r) {
      var q = this, p = t, o, n, m, l, k;
      return this.format.replace(this.fre, function () {
        var b;
        return n = arguments[1], m = arguments[3], o = q.precre.exec(n), o ? (k = o[2], n = o[1]) : k = !1, l = p[n], l === undefined ? "" : m && s && s[m] ? (b = s[m], b.get ? s[m].get(l) || l : s[m][l] || l) : (ah(l) && (r.get("numberFormatter") ? l = r.get("numberFormatter")(l) : l = ac(l, k, r.get("numberDigitGroupCount"), r.get("numberDigitGroupSep"), r.get("numberDecimalMark"))), l)
      })
    }
  }), ar.spformat = function (d, c) {
    return new an(d, c)
  }, am = function (e, d, f) {
    return e < d ? d : e > f ? f : e
  }, al = function (e, d) {
    var f;
    return d === 2 ? (f = Math.floor(e.length / 2), e.length % 2 ? e[f] : (e[f - 1] + e[f]) / 2) : e.length % 2 ? (f = (e.length * d + d) / 4, f % 1 ? (e[Math.floor(f)] + e[Math.floor(f) - 1]) / 2 : e[f - 1]) : (f = (e.length * d + 2) / 4, f % 1 ? (e[Math.floor(f)] + e[Math.floor(f) - 1]) / 2 : e[f - 1])
  }, ak = function (d) {
    var c;
    switch (d) {
      case"undefined":
        d = undefined;
        break;
      case"null":
        d = null;
        break;
      case"true":
        d = !0;
        break;
      case"false":
        d = !1;
        break;
      default:
        c = parseFloat(d), d == c && (d = c)
    }
    return d
  }, aj = function (e) {
    var d, f = [];
    for (d = e.length; d--;) {
      f[d] = ak(e[d])
    }
    return f
  }, ai = function (g, f) {
    var j, i, h = [];
    for (j = 0, i = g.length; j < i; j++) {
      g[j] !== f && h.push(g[j])
    }
    return h
  }, ah = function (b) {
    return !isNaN(parseFloat(b)) && isFinite(b)
  }, ac = function (a, n, m, l, k) {
    var j, i;
    a = (n === !1 ? parseFloat(a).toString() : a.toFixed(n)).split(""), j = (j = ar.inArray(".", a)) < 0 ? a.length : j, j < a.length && (a[j] = k);
    for (i = j - m; i > 0; i -= m) {
      a.splice(i, 0, l)
    }
    return a.join("")
  }, ag = function (f, e, h) {
    var g;
    for (g = e.length; g--;) {
      if (h && e[g] === null) {
        continue
      }
      if (e[g] !== f) {
        return !1
      }
    }
    return !0
  }, af = function (e) {
    var d = 0, f;
    for (f = e.length; f--;) {
      d += typeof e[f] == "number" ? e[f] : 0
    }
    return d
  }, ad = function (a) {
    return ar.isArray(a) ? a : [a]
  }, ae = function (d) {
    var c;
    document.createStyleSheet ? document.createStyleSheet().cssText = d : (c = document.createElement("style"), c.type = "text/css", document.getElementsByTagName("head")[0].appendChild(c), c[typeof document.body.style.WebkitAppearance == "string" ? "innerText" : "innerHTML"] = d)
  }, ar.fn.simpledraw = function (a, l, k, j) {
    var i, h;
    if (k && (i = this.data("_jqs_vcanvas"))) {
      return i
    }
    a === undefined && (a = ar(this).innerWidth()), l === undefined && (l = ar(this).innerHeight());
    if (ar.fn.sparkline.hasCanvas) {
      i = new R(a, l, this, j)
    } else {
      if (!ar.fn.sparkline.hasVML) {
        return !1
      }
      i = new P(a, l, this)
    }
    return h = ar(this).data("_jqs_mhandler"), h && h.registerCanvas(i), i
  }, ar.fn.cleardraw = function () {
    var b = this.data("_jqs_vcanvas");
    b && b.reset()
  }, ar.RangeMapClass = aa = ao({
    init: function (f) {
      var e, h, g = [];
      for (e in f) {
        f.hasOwnProperty(e) && typeof e == "string" && e.indexOf(":") > -1 && (h = e.split(":"), h[0] = h[0].length === 0 ? -Infinity : parseFloat(h[0]), h[1] = h[1].length === 0 ? Infinity : parseFloat(h[1]), h[2] = f[e], g.push(h))
      }
      this.map = f, this.rangelist = g || !1
    }, get: function (g) {
      var f = this.rangelist, j, i, h;
      if ((h = this.map[g]) !== undefined) {
        return h
      }
      if (f) {
        for (j = f.length; j--;) {
          i = f[j];
          if (i[0] <= g && i[1] >= g) {
            return i[2]
          }
        }
      }
      return undefined
    }
  }), ar.range_map = function (b) {
    return new aa(b)
  }, Y = ao({
    init: function (a, f) {
      var e = ar(a);
      this.$el = e, this.options = f, this.currentPageX = 0, this.currentPageY = 0, this.el = a, this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !f.get("disableTooltips"), this.highlightEnabled = !f.get("disableHighlight")
    }, registerSparkline: function (b) {
      this.splist.push(b), this.over && this.updateDisplay()
    }, registerCanvas: function (a) {
      var d = ar(a.canvas);
      this.canvas = a, this.$canvas = d, d.mouseenter(ar.proxy(this.mouseenter, this)), d.mouseleave(ar.proxy(this.mouseleave, this)), d.click(ar.proxy(this.mouseclick, this))
    }, reset: function (b) {
      this.splist = [], this.tooltip && b && (this.tooltip.remove(), this.tooltip = undefined)
    }, mouseclick: function (a) {
      var d = ar.Event("sparklineClick");
      d.originalEvent = a, d.sparklines = this.splist, this.$el.trigger(d)
    }, mouseenter: function (a) {
      ar(document.body).unbind("mousemove.jqs"), ar(document.body).bind("mousemove.jqs", ar.proxy(this.mousemove, this)), this.over = !0, this.currentPageX = a.pageX, this.currentPageY = a.pageY, this.currentEl = a.target, !this.tooltip && this.displayTooltips && (this.tooltip = new W(this.options), this.tooltip.updatePosition(a.pageX, a.pageY)), this.updateDisplay()
    }, mouseleave: function () {
      ar(document.body).unbind("mousemove.jqs");
      var a = this.splist, j = a.length, i = !1, h, g;
      this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), this.tooltip = null);
      for (g = 0; g < j; g++) {
        h = a[g], h.clearRegionHighlight() && (i = !0)
      }
      i && this.canvas.render()
    }, mousemove: function (b) {
      this.currentPageX = b.pageX, this.currentPageY = b.pageY, this.currentEl = b.target, this.tooltip && this.tooltip.updatePosition(b.pageX, b.pageY), this.updateDisplay()
    }, updateDisplay: function () {
      var v = this.splist, u = v.length, t = !1, s = this.$canvas.offset(), r = this.currentPageX - s.left, q = this.currentPageY - s.top, p, o, n, m, a;
      if (!this.over) {
        return
      }
      for (n = 0; n < u; n++) {
        o = v[n], m = o.setRegionHighlight(this.currentEl, r, q), m && (t = !0)
      }
      if (t) {
        a = ar.Event("sparklineRegionChange"), a.sparklines = this.splist, this.$el.trigger(a);
        if (this.tooltip) {
          p = "";
          for (n = 0; n < u; n++) {
            o = v[n], p += o.getCurrentRegionTooltip()
          }
          this.tooltip.setContent(p)
        }
        this.disableHighlight || this.canvas.render()
      }
      m === null && this.mouseleave()
    }
  }), W = ao({
    sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
    init: function (a) {
      var h = a.get("tooltipClassname", "jqstooltip"), g = this.sizeStyle, f;
      this.container = a.get("tooltipContainer") || document.body, this.tooltipOffsetX = a.get("tooltipOffsetX", 10), this.tooltipOffsetY = a.get("tooltipOffsetY", 12), ar("#jqssizetip").remove(), ar("#jqstooltip").remove(), this.sizetip = ar("<div/>", {
        id: "jqssizetip",
        style: g,
        "class": h
      }), this.tooltip = ar("<div/>", {
        id: "jqstooltip",
        "class": h
      }).appendTo(this.container), f = this.tooltip.offset(), this.offsetLeft = f.left, this.offsetTop = f.top, this.hidden = !0, ar(window).unbind("resize.jqs scroll.jqs"), ar(window).bind("resize.jqs scroll.jqs", ar.proxy(this.updateWindowDims, this)), this.updateWindowDims()
    },
    updateWindowDims: function () {
      this.scrollTop = ar(window).scrollTop(), this.scrollLeft = ar(window).scrollLeft(), this.scrollRight = this.scrollLeft + ar(window).width(), this.updatePosition()
    },
    getSize: function (b) {
      this.sizetip.html(b).appendTo(this.container), this.width = this.sizetip.width() + 1, this.height = this.sizetip.height(), this.sizetip.remove()
    },
    setContent: function (b) {
      if (!b) {
        this.tooltip.css("visibility", "hidden"), this.hidden = !0;
        return
      }
      this.getSize(b), this.tooltip.html(b).css({
        width: this.width,
        height: this.height,
        visibility: "visible"
      }), this.hidden && (this.hidden = !1, this.updatePosition())
    },
    updatePosition: function (d, c) {
      if (d === undefined) {
        if (this.mousex === undefined) {
          return
        }
        d = this.mousex - this.offsetLeft, c = this.mousey - this.offsetTop
      } else {
        this.mousex = d -= this.offsetLeft, this.mousey = c -= this.offsetTop
      }
      if (!this.height || !this.width || this.hidden) {
        return
      }
      c -= this.height + this.tooltipOffsetY, d += this.tooltipOffsetX, c < this.scrollTop && (c = this.scrollTop), d < this.scrollLeft ? d = this.scrollLeft : d + this.width > this.scrollRight && (d = this.scrollRight - this.width), this.tooltip.css({
        left: d,
        top: c
      })
    },
    remove: function () {
      this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = undefined, ar(window).unbind("resize.jqs scroll.jqs")
    }
  }), X = function () {
    ae(Z)
  }, ar(X), N = [], ar.fn.sparkline = function (a, d) {
    return this.each(function () {
      var i = new ar.fn.sparkline.options(this, d), h = ar(this), c, b;
      c = function () {
        var q, p, o, n, m, l, e;
        if (a === "html" || a === undefined) {
          e = this.getAttribute(i.get("tagValuesAttribute"));
          if (e === undefined || e === null) {
            e = h.html()
          }
          q = e.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")
        } else {
          q = a
        }
        p = i.get("width") === "auto" ? q.length * i.get("defaultPixelsPerValue") : i.get("width");
        if (i.get("height") === "auto") {
          if (!i.get("composite") || !ar.data(this, "_jqs_vcanvas")) {
            n = document.createElement("span"), n.innerHTML = "a", h.html(n), o = ar(n).innerHeight() || ar(n).height(), ar(n).remove(), n = null
          }
        } else {
          o = i.get("height")
        }
        i.get("disableInteraction") ? m = !1 : (m = ar.data(this, "_jqs_mhandler"), m ? i.get("composite") || m.reset() : (m = new Y(this, i), ar.data(this, "_jqs_mhandler", m)));
        if (i.get("composite") && !ar.data(this, "_jqs_vcanvas")) {
          ar.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), ar.data(this, "_jqs_errnotify", !0));
          return
        }
        l = new (ar.fn.sparkline[i.get("type")])(this, q, i, p, o), l.render(), m && m.registerSparkline(l)
      };
      if (ar(this).html() && !i.get("disableHiddenCheck") && ar(this).is(":hidden") || ar.fn.jquery < "1.3.0" && ar(this).parents().is(":hidden") || !ar(this).parents("body").length) {
        if (!i.get("composite") && ar.data(this, "_jqs_pending")) {
          for (b = N.length; b; b--) {
            N[b - 1][0] == this && N.splice(b - 1, 1)
          }
        }
        N.push([this, c]), ar.data(this, "_jqs_pending", !0)
      } else {
        c.call(this)
      }
    })
  }, ar.fn.sparkline.defaults = ap(), ar.sparkline_display_visible = function () {
    var a, h, g, f = [];
    for (h = 0, g = N.length; h < g; h++) {
      a = N[h][0], ar(a).is(":visible") && !ar(a).parents().is(":hidden") ? (N[h][1].call(a), ar.data(N[h][0], "_jqs_pending", !1), f.push(h)) : !ar(a).closest("html").length && !ar.data(a, "_jqs_pending") && (ar.data(N[h][0], "_jqs_pending", !1), f.push(h))
    }
    for (h = f.length; h; h--) {
      N.splice(f[h - 1], 1)
    }
  }, ar.fn.sparkline.options = ao({
    init: function (l, k) {
      var j, i, b, a;
      this.userOptions = k = k || {}, this.tag = l, this.tagValCache = {}, i = ar.fn.sparkline.defaults, b = i.common, this.tagOptionsPrefix = k.enableTagOptions && (k.tagOptionsPrefix || b.tagOptionsPrefix), a = this.getTagSetting("type"), a === aq ? j = i[k.type || b.type] : j = i[a], this.mergedOptions = ar.extend({}, b, j, k)
    }, getTagSetting: function (b) {
      var l = this.tagOptionsPrefix, k, j, i, h;
      if (l === !1 || l === undefined) {
        return aq
      }
      if (this.tagValCache.hasOwnProperty(b)) {
        k = this.tagValCache.key
      } else {
        k = this.tag.getAttribute(l + b);
        if (k === undefined || k === null) {
          k = aq
        } else {
          if (k.substr(0, 1) === "[") {
            k = k.substr(1, k.length - 2).split(",");
            for (j = k.length; j--;) {
              k[j] = ak(k[j].replace(/(^\s*)|(\s*$)/g, ""))
            }
          } else {
            if (k.substr(0, 1) === "{") {
              i = k.substr(1, k.length - 2).split(","), k = {};
              for (j = i.length; j--;) {
                h = i[j].split(":", 2), k[h[0].replace(/(^\s*)|(\s*$)/g, "")] = ak(h[1].replace(/(^\s*)|(\s*$)/g, ""))
              }
            } else {
              k = ak(k)
            }
          }
        }
        this.tagValCache.key = k
      }
      return k
    }, get: function (b, h) {
      var g = this.getTagSetting(b), f;
      return g !== aq ? g : (f = this.mergedOptions[b]) === undefined ? h : f
    }
  }), ar.fn.sparkline._base = ao({
    disabled: !1, init: function (a, j, i, h, g) {
      this.el = a, this.$el = ar(a), this.values = j, this.options = i, this.width = h, this.height = g, this.currentRegion = undefined
    }, initTarget: function () {
      var b = !this.options.get("disableInteraction");
      (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), b)) ? (this.canvasWidth = this.target.pixelWidth, this.canvasHeight = this.target.pixelHeight) : this.disabled = !0
    }, render: function () {
      return this.disabled ? (this.el.innerHTML = "", !1) : !0
    }, getRegion: function (d, c) {
    }, setRegionHighlight: function (h, g, l) {
      var k = this.currentRegion, j = !this.options.get("disableHighlight"), i;
      return g > this.canvasWidth || l > this.canvasHeight || g < 0 || l < 0 ? null : (i = this.getRegion(h, g, l), k !== i ? (k !== undefined && j && this.removeHighlight(), this.currentRegion = i, i !== undefined && j && this.renderHighlight(), !0) : !1)
    }, clearRegionHighlight: function () {
      return this.currentRegion !== undefined ? (this.removeHighlight(), this.currentRegion = undefined, !0) : !1
    }, renderHighlight: function () {
      this.changeHighlight(!0)
    }, removeHighlight: function () {
      this.changeHighlight(!1)
    }, changeHighlight: function (b) {
    }, getCurrentRegionTooltip: function () {
      var G = this.options, F = "", E = [], D, C, B, A, z, y, x, w, v, u, t, e, a, H;
      if (this.currentRegion === undefined) {
        return ""
      }
      D = this.getCurrentRegionFields(), t = G.get("tooltipFormatter");
      if (t) {
        return t(this, G, D)
      }
      G.get("tooltipChartTitle") && (F += '<div class="jqs jqstitle">' + G.get("tooltipChartTitle") + "</div>\n"), C = this.options.get("tooltipFormat");
      if (!C) {
        return ""
      }
      ar.isArray(C) || (C = [C]), ar.isArray(D) || (D = [D]), x = this.options.get("tooltipFormatFieldlist"), w = this.options.get("tooltipFormatFieldlistKey");
      if (x && w) {
        v = [];
        for (y = D.length; y--;) {
          u = D[y][w], (H = ar.inArray(u, x)) != -1 && (v[H] = D[y])
        }
        D = v
      }
      B = C.length, a = D.length;
      for (y = 0; y < B; y++) {
        e = C[y], typeof e == "string" && (e = new an(e)), A = e.fclass || "jqsfield";
        for (H = 0; H < a; H++) {
          if (!D[H].isNull || !G.get("tooltipSkipNull")) {
            ar.extend(D[H], {
              prefix: G.get("tooltipPrefix"),
              suffix: G.get("tooltipSuffix")
            }), z = e.render(D[H], G.get("tooltipValueLookups"), G), E.push('<div class="' + A + '">' + z + "</div>")
          }
        }
      }
      return E.length ? F + E.join("\n") : ""
    }, getCurrentRegionFields: function () {
    }, calcHighlightColor: function (j, f) {
      var p = f.get("highlightColor"), o = f.get("highlightLighten"), n, m, l, k;
      if (p) {
        return p
      }
      if (o) {
        n = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(j) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(j);
        if (n) {
          l = [], m = j.length === 4 ? 16 : 1;
          for (k = 0; k < 3; k++) {
            l[k] = am(Math.round(parseInt(n[k + 1], 16) * m * o), 0, 255)
          }
          return "rgb(" + l.join(",") + ")"
        }
      }
      return j
    }
  }), U = {
    changeHighlight: function (a) {
      var j = this.currentRegion, i = this.target, h = this.regionShapes[j], g;
      h && (g = this.renderRegion(j, a), ar.isArray(g) || ar.isArray(h) ? (i.replaceWithShapes(h, g), this.regionShapes[j] = ar.map(g, function (b) {
        return b.id
      })) : (i.replaceWithShape(h, g), this.regionShapes[j] = g.id))
    }, render: function () {
      var a = this.values, n = this.target, m = this.regionShapes, l, k, j, i;
      if (!this.cls._super.render.call(this)) {
        return
      }
      for (j = a.length; j--;) {
        l = this.renderRegion(j);
        if (l) {
          if (ar.isArray(l)) {
            k = [];
            for (i = l.length; i--;) {
              l[i].append(), k.push(l[i].id)
            }
            m[j] = k
          } else {
            l.append(), m[j] = l.id
          }
        } else {
          m[j] = null
        }
      }
      n.render()
    }
  }, ar.fn.sparkline.line = S = ao(ar.fn.sparkline._base, {
    type: "line", init: function (g, f, j, i, h) {
      S._super.init.call(this, g, f, j, i, h), this.vertices = [], this.regionMap = [], this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, this.lastShapeId = null, this.initTarget()
    }, getRegion: function (g, f, j) {
      var i, h = this.regionMap;
      for (i = h.length; i--;) {
        if (h[i] !== null && f >= h[i][0] && f <= h[i][1]) {
          return h[i][2]
        }
      }
      return undefined
    }, getCurrentRegionFields: function () {
      var b = this.currentRegion;
      return {
        isNull: this.yvalues[b] === null,
        x: this.xvalues[b],
        y: this.yvalues[b],
        color: this.options.get("lineColor"),
        fillColor: this.options.get("fillColor"),
        offset: b
      }
    }, renderHighlight: function () {
      var r = this.currentRegion, q = this.target, p = this.vertices[r], o = this.options, n = o.get("spotRadius"), m = o.get("highlightSpotColor"), l = o.get("highlightLineColor"), k, j;
      if (!p) {
        return
      }
      n && m && (k = q.drawCircle(p[0], p[1], n, undefined, m), this.highlightSpotId = k.id, q.insertAfterShape(this.lastShapeId, k)), l && (j = q.drawLine(p[0], this.canvasTop, p[0], this.canvasTop + this.canvasHeight, l), this.highlightLineId = j.id, q.insertAfterShape(this.lastShapeId, j))
    }, removeHighlight: function () {
      var b = this.target;
      this.highlightSpotId && (b.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), this.highlightLineId && (b.removeShapeId(this.highlightLineId), this.highlightLineId = null)
    }, scanValues: function () {
      var t = this.values, s = t.length, r = this.xvalues, q = this.yvalues, p = this.yminmax, o, n, m, l, k;
      for (o = 0; o < s; o++) {
        n = t[o], m = typeof t[o] == "string", l = typeof t[o] == "object" && t[o] instanceof Array, k = m && t[o].split(":"), m && k.length === 2 ? (r.push(Number(k[0])), q.push(Number(k[1])), p.push(Number(k[1]))) : l ? (r.push(n[0]), q.push(n[1]), p.push(n[1])) : (r.push(o), t[o] === null || t[o] === "null" ? q.push(null) : (q.push(Number(n)), p.push(Number(n))))
      }
      this.options.get("xvalues") && (r = this.options.get("xvalues")), this.maxy = this.maxyorg = Math.max.apply(Math, p), this.miny = this.minyorg = Math.min.apply(Math, p), this.maxx = Math.max.apply(Math, r), this.minx = Math.min.apply(Math, r), this.xvalues = r, this.yvalues = q, this.yminmax = p
    }, processRangeOptions: function () {
      var e = this.options, d = e.get("normalRangeMin"), f = e.get("normalRangeMax");
      d !== undefined && (d < this.miny && (this.miny = d), f > this.maxy && (this.maxy = f)), e.get("chartRangeMin") !== undefined && (e.get("chartRangeClip") || e.get("chartRangeMin") < this.miny) && (this.miny = e.get("chartRangeMin")), e.get("chartRangeMax") !== undefined && (e.get("chartRangeClip") || e.get("chartRangeMax") > this.maxy) && (this.maxy = e.get("chartRangeMax")), e.get("chartRangeMinX") !== undefined && (e.get("chartRangeClipX") || e.get("chartRangeMinX") < this.minx) && (this.minx = e.get("chartRangeMinX")), e.get("chartRangeMaxX") !== undefined && (e.get("chartRangeClipX") || e.get("chartRangeMaxX") > this.maxx) && (this.maxx = e.get("chartRangeMaxX"))
    }, drawNormalRange: function (r, q, p, o, n) {
      var m = this.options.get("normalRangeMin"), l = this.options.get("normalRangeMax"), k = q + Math.round(p - p * ((l - this.miny) / n)), j = Math.round(p * (l - m) / n);
      this.target.drawRect(r, k, o, j, undefined, this.options.get("normalRangeColor")).append()
    }, render: function () {
      var aV = this.options, aU = this.target, aT = this.canvasWidth, aS = this.canvasHeight, aR = this.vertices, aQ = aV.get("spotRadius"), aP = this.regionMap, aO, aN, aM, aL, aK, aJ, aI, aH, aE, aC, aA, ax, av, at, q, a, aG, aF, aD, aB, az, ay, aw, au, u;
      if (!S._super.render.call(this)) {
        return
      }
      this.scanValues(), this.processRangeOptions(), aw = this.xvalues, au = this.yvalues;
      if (!this.yminmax.length || this.yvalues.length < 2) {
        return
      }
      aL = aK = 0, aO = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx, aN = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny, aM = this.yvalues.length - 1, aQ && (aT < aQ * 4 || aS < aQ * 4) && (aQ = 0);
      if (aQ) {
        az = aV.get("highlightSpotColor") && !aV.get("disableInteraction");
        if (az || aV.get("minSpotColor") || aV.get("spotColor") && au[aM] === this.miny) {
          aS -= Math.ceil(aQ)
        }
        if (az || aV.get("maxSpotColor") || aV.get("spotColor") && au[aM] === this.maxy) {
          aS -= Math.ceil(aQ), aL += Math.ceil(aQ)
        }
        if (az || (aV.get("minSpotColor") || aV.get("maxSpotColor")) && (au[0] === this.miny || au[0] === this.maxy)) {
          aK += Math.ceil(aQ), aT -= Math.ceil(aQ)
        }
        if (az || aV.get("spotColor") || aV.get("minSpotColor") || aV.get("maxSpotColor") && (au[aM] === this.miny || au[aM] === this.maxy)) {
          aT -= Math.ceil(aQ)
        }
      }
      aS--, aV.get("normalRangeMin") !== undefined && !aV.get("drawNormalOnTop") && this.drawNormalRange(aK, aL, aS, aT, aN), aI = [], aH = [aI], at = q = null, a = au.length;
      for (u = 0; u < a; u++) {
        aE = aw[u], aA = aw[u + 1], aC = au[u], ax = aK + Math.round((aE - this.minx) * (aT / aO)), av = u < a - 1 ? aK + Math.round((aA - this.minx) * (aT / aO)) : aT, q = ax + (av - ax) / 2, aP[u] = [at || 0, q, u], at = q, aC === null ? u && (au[u - 1] !== null && (aI = [], aH.push(aI)), aR.push(null)) : (aC < this.miny && (aC = this.miny), aC > this.maxy && (aC = this.maxy), aI.length || aI.push([ax, aL + aS]), aJ = [ax, aL + Math.round(aS - aS * ((aC - this.miny) / aN))], aI.push(aJ), aR.push(aJ))
      }
      aG = [], aF = [], aD = aH.length;
      for (u = 0; u < aD; u++) {
        aI = aH[u], aI.length && (aV.get("fillColor") && (aI.push([aI[aI.length - 1][0], aL + aS]), aF.push(aI.slice(0)), aI.pop()), aI.length > 2 && (aI[0] = [aI[0][0], aI[1][1]]), aG.push(aI))
      }
      aD = aF.length;
      for (u = 0; u < aD; u++) {
        aU.drawShape(aF[u], aV.get("fillColor"), aV.get("fillColor")).append()
      }
      aV.get("normalRangeMin") !== undefined && aV.get("drawNormalOnTop") && this.drawNormalRange(aK, aL, aS, aT, aN), aD = aG.length;
      for (u = 0; u < aD; u++) {
        aU.drawShape(aG[u], aV.get("lineColor"), undefined, aV.get("lineWidth")).append()
      }
      if (aQ && aV.get("valueSpots")) {
        aB = aV.get("valueSpots"), aB.get === undefined && (aB = new aa(aB));
        for (u = 0; u < a; u++) {
          ay = aB.get(au[u]), ay && aU.drawCircle(aK + Math.round((aw[u] - this.minx) * (aT / aO)), aL + Math.round(aS - aS * ((au[u] - this.miny) / aN)), aQ, undefined, ay).append()
        }
      }
      aQ && aV.get("spotColor") && au[aM] !== null && aU.drawCircle(aK + Math.round((aw[aw.length - 1] - this.minx) * (aT / aO)), aL + Math.round(aS - aS * ((au[aM] - this.miny) / aN)), aQ, undefined, aV.get("spotColor")).append(), this.maxy !== this.minyorg && (aQ && aV.get("minSpotColor") && (aE = aw[ar.inArray(this.minyorg, au)], aU.drawCircle(aK + Math.round((aE - this.minx) * (aT / aO)), aL + Math.round(aS - aS * ((this.minyorg - this.miny) / aN)), aQ, undefined, aV.get("minSpotColor")).append()), aQ && aV.get("maxSpotColor") && (aE = aw[ar.inArray(this.maxyorg, au)], aU.drawCircle(aK + Math.round((aE - this.minx) * (aT / aO)), aL + Math.round(aS - aS * ((this.maxyorg - this.miny) / aN)), aQ, undefined, aV.get("maxSpotColor")).append())), this.lastShapeId = aU.getLastShapeId(), this.canvasTop = aL, aU.render()
    }
  }), ar.fn.sparkline.bar = Q = ao(ar.fn.sparkline._base, U, {
    type: "bar", init: function (aW, aV, aU, aT, aS) {
      var aR = parseInt(aU.get("barWidth"), 10), aQ = parseInt(aU.get("barSpacing"), 10), aP = aU.get("chartRangeMin"), aO = aU.get("chartRangeMax"), aN = aU.get("chartRangeClip"), aM = Infinity, aL = -Infinity, aK, aJ, aI, aH, aG, aF, aE, aD, aC, aB, aA, az, ay, ax, aw, av, au, at, v, q, j, i, h;
      Q._super.init.call(this, aW, aV, aU, aT, aS);
      for (aF = 0, aE = aV.length; aF < aE; aF++) {
        q = aV[aF], aK = typeof q == "string" && q.indexOf(":") > -1;
        if (aK || ar.isArray(q)) {
          aw = !0, aK && (q = aV[aF] = aj(q.split(":"))), q = ai(q, null), aJ = Math.min.apply(Math, q), aI = Math.max.apply(Math, q), aJ < aM && (aM = aJ), aI > aL && (aL = aI)
        }
      }
      this.stacked = aw, this.regionShapes = {}, this.barWidth = aR, this.barSpacing = aQ, this.totalBarWidth = aR + aQ, this.width = aT = aV.length * aR + (aV.length - 1) * aQ, this.initTarget(), aN && (ay = aP === undefined ? -Infinity : aP, ax = aO === undefined ? Infinity : aO), aG = [], aH = aw ? [] : aG;
      var f = [], a = [];
      for (aF = 0, aE = aV.length; aF < aE; aF++) {
        if (aw) {
          av = aV[aF], aV[aF] = v = [], f[aF] = 0, aH[aF] = a[aF] = 0;
          for (au = 0, at = av.length; au < at; au++) {
            q = v[au] = aN ? am(av[au], ay, ax) : av[au], q !== null && (q > 0 && (f[aF] += q), aM < 0 && aL > 0 ? q < 0 ? a[aF] += Math.abs(q) : aH[aF] += q : aH[aF] += Math.abs(q - (q < 0 ? aL : aM)), aG.push(q))
          }
        } else {
          q = aN ? am(aV[aF], ay, ax) : aV[aF], q = aV[aF] = ak(q), q !== null && aG.push(q)
        }
      }
      this.max = az = Math.max.apply(Math, aG), this.min = aA = Math.min.apply(Math, aG), this.stackMax = aL = aw ? Math.max.apply(Math, f) : az, this.stackMin = aM = aw ? Math.min.apply(Math, aG) : aA, aU.get("chartRangeMin") !== undefined && (aU.get("chartRangeClip") || aU.get("chartRangeMin") < aA) && (aA = aU.get("chartRangeMin")), aU.get("chartRangeMax") !== undefined && (aU.get("chartRangeClip") || aU.get("chartRangeMax") > az) && (az = aU.get("chartRangeMax")), this.zeroAxis = aC = aU.get("zeroAxis", !0), aA <= 0 && az >= 0 && aC ? aB = 0 : aC == 0 ? aB = aA : aA > 0 ? aB = aA : aB = az, this.xaxisOffset = aB, aD = aw ? Math.max.apply(Math, aH) + Math.max.apply(Math, a) : az - aA, this.canvasHeightEf = aC && aA < 0 ? this.canvasHeight - 2 : this.canvasHeight - 1, aA < aB ? (i = aw && az >= 0 ? aL : az, j = (i - aB) / aD * this.canvasHeight, j !== Math.ceil(j) && (this.canvasHeightEf -= 2, j = Math.ceil(j))) : j = this.canvasHeight, this.yoffset = j, ar.isArray(aU.get("colorMap")) ? (this.colorMapByIndex = aU.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = aU.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === undefined && (this.colorMapByValue = new aa(this.colorMapByValue))), this.range = aD
    }, getRegion: function (f, e, h) {
      var g = Math.floor(e / this.totalBarWidth);
      return g < 0 || g >= this.values.length ? undefined : g
    }, getCurrentRegionFields: function () {
      var g = this.currentRegion, f = ad(this.values[g]), j = [], i, h;
      for (h = f.length; h--;) {
        i = f[h], j.push({isNull: i === null, value: i, color: this.calcColor(h, i, g), offset: g})
      }
      return j
    }, calcColor: function (a, p, o) {
      var n = this.colorMapByIndex, m = this.colorMapByValue, l = this.options, k, j;
      return this.stacked ? k = l.get("stackedBarColor") : k = p < 0 ? l.get("negBarColor") : l.get("barColor"), p === 0 && l.get("zeroColor") !== undefined && (k = l.get("zeroColor")), m && (j = m.get(p)) ? k = j : n && n.length > o && (k = n[o]), ar.isArray(k) ? k[a % k.length] : k
    }, renderRegion: function (aB, aA) {
      var az = this.values[aB], ay = this.options, ax = this.xaxisOffset, aw = [], av = this.range, au = this.stacked, at = this.target, I = aB * this.totalBarWidth, H = this.canvasHeightEf, G = this.yoffset, F, E, D, C, B, A, z, y, l, a;
      az = ar.isArray(az) ? az : [az], z = az.length, y = az[0], C = ag(null, az), a = ag(ax, az, !0);
      if (C) {
        return ay.get("nullColor") ? (D = aA ? ay.get("nullColor") : this.calcHighlightColor(ay.get("nullColor"), ay), F = G > 0 ? G - 1 : G, at.drawRect(I, F, this.barWidth - 1, 0, D, D)) : undefined
      }
      B = G;
      for (A = 0; A < z; A++) {
        y = az[A];
        if (au && y === ax) {
          if (!a || l) {
            continue
          }
          l = !0
        }
        av > 0 ? E = Math.floor(H * (Math.abs(y - ax) / av)) + 1 : E = 1, y < ax || y === ax && G === 0 ? (F = B, B += E) : (F = G - E, G -= E), D = this.calcColor(A, y, aB), aA && (D = this.calcHighlightColor(D, ay)), aw.push(at.drawRect(I, F, this.barWidth - 1, E - 1, D, D))
      }
      return aw.length === 1 ? aw[0] : aw
    }
  }), ar.fn.sparkline.tristate = O = ao(ar.fn.sparkline._base, U, {
    type: "tristate", init: function (a, n, m, l, k) {
      var j = parseInt(m.get("barWidth"), 10), i = parseInt(m.get("barSpacing"), 10);
      O._super.init.call(this, a, n, m, l, k), this.regionShapes = {}, this.barWidth = j, this.barSpacing = i, this.totalBarWidth = j + i, this.values = ar.map(n, Number), this.width = l = n.length * j + (n.length - 1) * i, ar.isArray(m.get("colorMap")) ? (this.colorMapByIndex = m.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = m.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === undefined && (this.colorMapByValue = new aa(this.colorMapByValue))), this.initTarget()
    }, getRegion: function (e, d, f) {
      return Math.floor(d / this.totalBarWidth)
    }, getCurrentRegionFields: function () {
      var b = this.currentRegion;
      return {
        isNull: this.values[b] === undefined,
        value: this.values[b],
        color: this.calcColor(this.values[b], b),
        offset: b
      }
    }, calcColor: function (j, i) {
      var p = this.values, o = this.options, n = this.colorMapByIndex, m = this.colorMapByValue, l, k;
      return m && (k = m.get(j)) ? l = k : n && n.length > i ? l = n[i] : p[i] < 0 ? l = o.get("negBarColor") : p[i] > 0 ? l = o.get("posBarColor") : l = o.get("zeroBarColor"), l
    }, renderRegion: function (v, u) {
      var t = this.values, s = this.options, r = this.target, q, p, o, n, m, l;
      q = r.pixelHeight, o = Math.round(q / 2), n = v * this.totalBarWidth, t[v] < 0 ? (m = o, p = o - 1) : t[v] > 0 ? (m = 0, p = o - 1) : (m = o - 1, p = 2), l = this.calcColor(t[v], v);
      if (l === null) {
        return
      }
      return u && (l = this.calcHighlightColor(l, s)), r.drawRect(n, m, this.barWidth - 1, p - 1, l, l)
    }
  }), ar.fn.sparkline.discrete = M = ao(ar.fn.sparkline._base, U, {
    type: "discrete", init: function (a, j, i, h, g) {
      M._super.init.call(this, a, j, i, h, g), this.regionShapes = {}, this.values = j = ar.map(j, Number), this.min = Math.min.apply(Math, j), this.max = Math.max.apply(Math, j), this.range = this.max - this.min, this.width = h = i.get("width") === "auto" ? j.length * 2 : this.width, this.interval = Math.floor(h / j.length), this.itemWidth = h / j.length, i.get("chartRangeMin") !== undefined && (i.get("chartRangeClip") || i.get("chartRangeMin") < this.min) && (this.min = i.get("chartRangeMin")), i.get("chartRangeMax") !== undefined && (i.get("chartRangeClip") || i.get("chartRangeMax") > this.max) && (this.max = i.get("chartRangeMax")), this.initTarget(), this.target && (this.lineHeight = i.get("lineHeight") === "auto" ? Math.round(this.canvasHeight * 0.3) : i.get("lineHeight"))
    }, getRegion: function (e, d, f) {
      return Math.floor(d / this.itemWidth)
    }, getCurrentRegionFields: function () {
      var b = this.currentRegion;
      return {isNull: this.values[b] === undefined, value: this.values[b], offset: b}
    }, renderRegion: function (F, E) {
      var D = this.values, C = this.options, B = this.min, A = this.max, z = this.range, y = this.interval, x = this.target, w = this.canvasHeight, v = this.lineHeight, u = w - v, t, s, r, f;
      return s = am(D[F], B, A), f = F * y, t = Math.round(u - u * ((s - B) / z)), r = C.get("thresholdColor") && s < C.get("thresholdValue") ? C.get("thresholdColor") : C.get("lineColor"), E && (r = this.calcHighlightColor(r, C)), x.drawLine(f, t, f, t + v, r)
    }
  }), ar.fn.sparkline.bullet = K = ao(ar.fn.sparkline._base, {
    type: "bullet", init: function (j, i, p, o, n) {
      var m, l, k;
      K._super.init.call(this, j, i, p, o, n), this.values = i = aj(i), k = i.slice(), k[0] = k[0] === null ? k[2] : k[0], k[1] = i[1] === null ? k[2] : k[1], m = Math.min.apply(Math, i), l = Math.max.apply(Math, i), p.get("base") === undefined ? m = m < 0 ? m : 0 : m = p.get("base"), this.min = m, this.max = l, this.range = l - m, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, this.width = o = p.get("width") === "auto" ? "4.0em" : o, this.target = this.$el.simpledraw(o, n, p.get("composite")), i.length || (this.disabled = !0), this.initTarget()
    }, getRegion: function (f, e, h) {
      var g = this.target.getShapeAt(f, e, h);
      return g !== undefined && this.shapes[g] !== undefined ? this.shapes[g] : undefined
    }, getCurrentRegionFields: function () {
      var b = this.currentRegion;
      return {fieldkey: b.substr(0, 1), value: this.values[b.substr(1)], region: b}
    }, changeHighlight: function (f) {
      var e = this.currentRegion, h = this.valueShapes[e], g;
      delete this.shapes[h];
      switch (e.substr(0, 1)) {
        case"r":
          g = this.renderRange(e.substr(1), f);
          break;
        case"p":
          g = this.renderPerformance(f);
          break;
        case"t":
          g = this.renderTarget(f)
      }
      this.valueShapes[e] = g.id, this.shapes[g.id] = e, this.target.replaceWithShape(h, g)
    }, renderRange: function (g, f) {
      var j = this.values[g], i = Math.round(this.canvasWidth * ((j - this.min) / this.range)), h = this.options.get("rangeColors")[g - 2];
      return f && (h = this.calcHighlightColor(h, this.options)), this.target.drawRect(0, 0, i - 1, this.canvasHeight - 1, h, h)
    }, renderPerformance: function (f) {
      var e = this.values[1], h = Math.round(this.canvasWidth * ((e - this.min) / this.range)), g = this.options.get("performanceColor");
      return f && (g = this.calcHighlightColor(g, this.options)), this.target.drawRect(0, Math.round(this.canvasHeight * 0.3), h - 1, Math.round(this.canvasHeight * 0.4) - 1, g, g)
    }, renderTarget: function (h) {
      var g = this.values[0], l = Math.round(this.canvasWidth * ((g - this.min) / this.range) - this.options.get("targetWidth") / 2), k = Math.round(this.canvasHeight * 0.1), j = this.canvasHeight - k * 2, i = this.options.get("targetColor");
      return h && (i = this.calcHighlightColor(i, this.options)), this.target.drawRect(l, k, this.options.get("targetWidth") - 1, j - 1, i, i)
    }, render: function () {
      var f = this.values.length, e = this.target, h, g;
      if (!K._super.render.call(this)) {
        return
      }
      for (h = 2; h < f; h++) {
        g = this.renderRange(h).append(), this.shapes[g.id] = "r" + h, this.valueShapes["r" + h] = g.id
      }
      this.values[1] !== null && (g = this.renderPerformance().append(), this.shapes[g.id] = "p1", this.valueShapes.p1 = g.id), this.values[0] !== null && (g = this.renderTarget().append(), this.shapes[g.id] = "t0", this.valueShapes.t0 = g.id), e.render()
    }
  }), ar.fn.sparkline.pie = J = ao(ar.fn.sparkline._base, {
    type: "pie", init: function (a, n, m, l, k) {
      var j = 0, i;
      J._super.init.call(this, a, n, m, l, k), this.shapes = {}, this.valueShapes = {}, this.values = n = ar.map(n, Number), m.get("width") === "auto" && (this.width = this.height);
      if (n.length > 0) {
        for (i = n.length; i--;) {
          j += n[i]
        }
      }
      this.total = j, this.initTarget(), this.radius = Math.floor(Math.min(this.canvasWidth, this.canvasHeight) / 2)
    }, getRegion: function (f, e, h) {
      var g = this.target.getShapeAt(f, e, h);
      return g !== undefined && this.shapes[g] !== undefined ? this.shapes[g] : undefined
    }, getCurrentRegionFields: function () {
      var b = this.currentRegion;
      return {
        isNull: this.values[b] === undefined,
        value: this.values[b],
        percent: this.values[b] / this.total * 100,
        color: this.options.get("sliceColors")[b % this.options.get("sliceColors").length],
        offset: b
      }
    }, changeHighlight: function (f) {
      var e = this.currentRegion, h = this.renderSlice(e, f), g = this.valueShapes[e];
      delete this.shapes[g], this.target.replaceWithShape(g, h), this.valueShapes[e] = h.id, this.shapes[h.id] = e
    }, renderSlice: function (F, E) {
      var D = this.target, C = this.options, B = this.radius, A = C.get("borderWidth"), z = C.get("offset"), y = 2 * Math.PI, x = this.values, w = this.total, v = z ? 2 * Math.PI * (z / 360) : 0, u, t, s, r, q;
      r = x.length;
      for (s = 0; s < r; s++) {
        u = v, t = v, w > 0 && (t = v + y * (x[s] / w));
        if (F === s) {
          return q = C.get("sliceColors")[s % C.get("sliceColors").length], E && (q = this.calcHighlightColor(q, C)), D.drawPieSlice(B, B, B - A, u, t, undefined, q)
        }
        v = t
      }
    }, render: function () {
      var i = this.target, h = this.values, n = this.options, m = this.radius, l = n.get("borderWidth"), k, j;
      if (!J._super.render.call(this)) {
        return
      }
      l && i.drawCircle(m, m, Math.floor(m - l / 2), n.get("borderColor"), undefined, l).append();
      for (j = h.length; j--;) {
        h[j] && (k = this.renderSlice(j).append(), this.valueShapes[j] = k.id, this.shapes[k.id] = j)
      }
      i.render()
    }
  }), ar.fn.sparkline.box = ab = ao(ar.fn.sparkline._base, {
    type: "box", init: function (a, j, i, h, g) {
      ab._super.init.call(this, a, j, i, h, g), this.values = ar.map(j, Number), this.width = i.get("width") === "auto" ? "4.0em" : h, this.initTarget(), this.values.length || (this.disabled = 1)
    }, getRegion: function () {
      return 1
    }, getCurrentRegionFields: function () {
      var b = [{field: "lq", value: this.quartiles[0]}, {field: "med", value: this.quartiles[1]}, {
        field: "uq",
        value: this.quartiles[2]
      }];
      return this.loutlier !== undefined && b.push({
        field: "lo",
        value: this.loutlier
      }), this.routlier !== undefined && b.push({
        field: "ro",
        value: this.routlier
      }), this.lwhisker !== undefined && b.push({
        field: "lw",
        value: this.lwhisker
      }), this.rwhisker !== undefined && b.push({field: "rw", value: this.rwhisker}), b
    }, render: function () {
      var ax = this.target, aw = this.values, av = aw.length, au = this.options, at = this.canvasWidth, I = this.canvasHeight, H = au.get("chartRangeMin") === undefined ? Math.min.apply(Math, aw) : au.get("chartRangeMin"), G = au.get("chartRangeMax") === undefined ? Math.max.apply(Math, aw) : au.get("chartRangeMax"), F = 0, E, D, C, B, A, z, y, x, w, v, g;
      if (!ab._super.render.call(this)) {
        return
      }
      if (au.get("raw")) {
        au.get("showOutliers") && aw.length > 5 ? (D = aw[0], E = aw[1], B = aw[2], A = aw[3], z = aw[4], y = aw[5], x = aw[6]) : (E = aw[0], B = aw[1], A = aw[2], z = aw[3], y = aw[4])
      } else {
        aw.sort(function (d, c) {
          return d - c
        }), B = al(aw, 1), A = al(aw, 2), z = al(aw, 3), C = z - B;
        if (au.get("showOutliers")) {
          E = y = undefined;
          for (w = 0; w < av; w++) {
            E === undefined && aw[w] > B - C * au.get("outlierIQR") && (E = aw[w]), aw[w] < z + C * au.get("outlierIQR") && (y = aw[w])
          }
          D = aw[0], x = aw[av - 1]
        } else {
          E = aw[0], y = aw[av - 1]
        }
      }
      this.quartiles = [B, A, z], this.lwhisker = E, this.rwhisker = y, this.loutlier = D, this.routlier = x, g = at / (G - H + 1), au.get("showOutliers") && (F = Math.ceil(au.get("spotRadius")), at -= 2 * Math.ceil(au.get("spotRadius")), g = at / (G - H + 1), D < E && ax.drawCircle((D - H) * g + F, I / 2, au.get("spotRadius"), au.get("outlierLineColor"), au.get("outlierFillColor")).append(), x > y && ax.drawCircle((x - H) * g + F, I / 2, au.get("spotRadius"), au.get("outlierLineColor"), au.get("outlierFillColor")).append()), ax.drawRect(Math.round((B - H) * g + F), Math.round(I * 0.1), Math.round((z - B) * g), Math.round(I * 0.8), au.get("boxLineColor"), au.get("boxFillColor")).append(), ax.drawLine(Math.round((E - H) * g + F), Math.round(I / 2), Math.round((B - H) * g + F), Math.round(I / 2), au.get("lineColor")).append(), ax.drawLine(Math.round((E - H) * g + F), Math.round(I / 4), Math.round((E - H) * g + F), Math.round(I - I / 4), au.get("whiskerColor")).append(), ax.drawLine(Math.round((y - H) * g + F), Math.round(I / 2), Math.round((z - H) * g + F), Math.round(I / 2), au.get("lineColor")).append(), ax.drawLine(Math.round((y - H) * g + F), Math.round(I / 4), Math.round((y - H) * g + F), Math.round(I - I / 4), au.get("whiskerColor")).append(), ax.drawLine(Math.round((A - H) * g + F), Math.round(I * 0.1), Math.round((A - H) * g + F), Math.round(I * 0.9), au.get("medianColor")).append(), au.get("target") && (v = Math.ceil(au.get("spotRadius")), ax.drawLine(Math.round((au.get("target") - H) * g + F), Math.round(I / 2 - v), Math.round((au.get("target") - H) * g + F), Math.round(I / 2 + v), au.get("targetColor")).append(), ax.drawLine(Math.round((au.get("target") - H) * g + F - v), Math.round(I / 2), Math.round((au.get("target") - H) * g + F + v), Math.round(I / 2), au.get("targetColor")).append()), ax.render()
    }
  }), function () {
    document.namespaces && !document.namespaces.v ? (ar.fn.sparkline.hasVML = !0, document.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML")) : ar.fn.sparkline.hasVML = !1;
    var a = document.createElement("canvas");
    ar.fn.sparkline.hasCanvas = !!a.getContext && !!a.getContext("2d")
  }(), V = ao({
    init: function (f, e, h, g) {
      this.target = f, this.id = e, this.type = h, this.args = g
    }, append: function () {
      return this.target.appendShape(this), this
    }
  }), T = ao({
    _pxregex: /(\d+)(px)?\s*$/i, init: function (a, f, e) {
      if (!a) {
        return
      }
      this.width = a, this.height = f, this.target = e, this.lastShapeId = null, e[0] && (e = e[0]), ar.data(e, "_jqs_vcanvas", this)
    }, drawLine: function (h, g, l, k, j, i) {
      return this.drawShape([[h, g], [l, k]], j, i)
    }, drawShape: function (f, e, h, g) {
      return this._genShape("Shape", [f, e, h, g])
    }, drawCircle: function (h, g, l, k, j, i) {
      return this._genShape("Circle", [h, g, l, k, j, i])
    }, drawPieSlice: function (i, h, n, m, l, k, j) {
      return this._genShape("PieSlice", [i, h, n, m, l, k, j])
    }, drawRect: function (h, g, l, k, j, i) {
      return this._genShape("Rect", [h, g, l, k, j, i])
    }, getElement: function () {
      return this.canvas
    }, getLastShapeId: function () {
      return this.lastShapeId
    }, reset: function () {
      alert("reset not implemented")
    }, _insert: function (a, d) {
      ar(d).html(a)
    }, _calculatePixelDims: function (a, h, g) {
      var f;
      f = this._pxregex.exec(h), f ? this.pixelHeight = f[1] : this.pixelHeight = ar(g).height(), f = this._pxregex.exec(a), f ? this.pixelWidth = f[1] : this.pixelWidth = ar(g).width()
    }, _genShape: function (e, d) {
      var f = L++;
      return d.unshift(f), new V(this, f, e, d)
    }, appendShape: function (b) {
      alert("appendShape not implemented")
    }, replaceWithShape: function (d, c) {
      alert("replaceWithShape not implemented")
    }, insertAfterShape: function (d, c) {
      alert("insertAfterShape not implemented")
    }, removeShapeId: function (b) {
      alert("removeShapeId not implemented")
    }, getShapeAt: function (e, d, f) {
      alert("getShapeAt not implemented")
    }, render: function () {
      alert("render not implemented")
    }
  }), R = ao(T, {
    init: function (a, h, g, f) {
      R._super.init.call(this, a, h, g), this.canvas = document.createElement("canvas"), g[0] && (g = g[0]), ar.data(g, "_jqs_vcanvas", this), ar(this.canvas).css({
        display: "inline-block",
        width: a,
        height: h,
        verticalAlign: "top"
      }), this._insert(this.canvas, g), this._calculatePixelDims(a, h, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, this.interact = f, this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = undefined, ar(this.canvas).css({
        width: this.pixelWidth,
        height: this.pixelHeight
      })
    }, _getContext: function (f, e, h) {
      var g = this.canvas.getContext("2d");
      return f !== undefined && (g.strokeStyle = f), g.lineWidth = h === undefined ? 1 : h, e !== undefined && (g.fillStyle = e), g
    }, reset: function () {
      var b = this._getContext();
      b.clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = undefined
    }, _drawShape: function (j, i, p, o, n) {
      var m = this._getContext(p, o, n), l, k;
      m.beginPath(), m.moveTo(i[0][0] + 0.5, i[0][1] + 0.5);
      for (l = 1, k = i.length; l < k; l++) {
        m.lineTo(i[l][0] + 0.5, i[l][1] + 0.5)
      }
      p !== undefined && m.stroke(), o !== undefined && m.fill(), this.targetX !== undefined && this.targetY !== undefined && m.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = j)
    }, _drawCircle: function (j, i, p, o, n, m, l) {
      var k = this._getContext(n, m, l);
      k.beginPath(), k.arc(i, p, o, 0, 2 * Math.PI, !1), this.targetX !== undefined && this.targetY !== undefined && k.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = j), n !== undefined && k.stroke(), m !== undefined && k.fill()
    }, _drawPieSlice: function (r, q, p, o, n, m, l, k) {
      var j = this._getContext(l, k);
      j.beginPath(), j.moveTo(q, p), j.arc(q, p, o, n, m, !1), j.lineTo(q, p), j.closePath(), l !== undefined && j.stroke(), k && j.fill(), this.targetX !== undefined && this.targetY !== undefined && j.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = r)
    }, _drawRect: function (i, h, n, m, l, k, j) {
      return this._drawShape(i, [[h, n], [h + m, n], [h + m, n + l], [h, n + l], [h, n]], k, j)
    }, appendShape: function (b) {
      return this.shapes[b.id] = b, this.shapeseq.push(b.id), this.lastShapeId = b.id, b.id
    }, replaceWithShape: function (f, e) {
      var h = this.shapeseq, g;
      this.shapes[e.id] = e;
      for (g = h.length; g--;) {
        h[g] == f && (h[g] = e.id)
      }
      delete this.shapes[f]
    }, replaceWithShapes: function (i, h) {
      var n = this.shapeseq, m = {}, l, k, j;
      for (k = i.length; k--;) {
        m[i[k]] = !0
      }
      for (k = n.length; k--;) {
        l = n[k], m[l] && (n.splice(k, 1), delete this.shapes[l], j = k)
      }
      for (k = h.length; k--;) {
        n.splice(j, 0, h[k].id), this.shapes[h[k].id] = h[k]
      }
    }, insertAfterShape: function (f, e) {
      var h = this.shapeseq, g;
      for (g = h.length; g--;) {
        if (h[g] === f) {
          h.splice(g + 1, 0, e.id), this.shapes[e.id] = e;
          return
        }
      }
    }, removeShapeId: function (e) {
      var d = this.shapeseq, f;
      for (f = d.length; f--;) {
        if (d[f] === e) {
          d.splice(f, 1);
          break
        }
      }
      delete this.shapes[e]
    }, getShapeAt: function (e, d, f) {
      return this.targetX = d, this.targetY = f, this.render(), this.currentTargetShapeId
    }, render: function () {
      var i = this.shapeseq, h = this.shapes, n = i.length, m = this._getContext(), l, k, j;
      m.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
      for (j = 0; j < n; j++) {
        l = i[j], k = h[l], this["_draw" + k.type].apply(this, k.args)
      }
      this.interact || (this.shapes = {}, this.shapeseq = [])
    }
  }), P = ao(T, {
    init: function (a, h, g) {
      var f;
      P._super.init.call(this, a, h, g), g[0] && (g = g[0]), ar.data(g, "_jqs_vcanvas", this), this.canvas = document.createElement("span"), ar(this.canvas).css({
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        width: a,
        height: h,
        margin: "0px",
        padding: "0px",
        verticalAlign: "top"
      }), this._insert(this.canvas, g), this._calculatePixelDims(a, h, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, f = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', this.canvas.insertAdjacentHTML("beforeEnd", f), this.group = ar(this.canvas).children()[0], this.rendered = !1, this.prerender = ""
    }, _drawShape: function (z, y, x, w, v) {
      var u = [], t, s, r, q, p, o, n;
      for (n = 0, o = y.length; n < o; n++) {
        u[n] = "" + y[n][0] + "," + y[n][1]
      }
      return t = u.splice(0, 1), v = v === undefined ? 1 : v, s = x === undefined ? ' stroked="false" ' : ' strokeWeight="' + v + 'px" strokeColor="' + x + '" ', r = w === undefined ? ' filled="false"' : ' fillColor="' + w + '" filled="true" ', q = u[0] === u[u.length - 1] ? "x " : "", p = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + z + '" ' + s + r + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + t + " l " + u.join(", ") + " " + q + 'e"> </v:shape>', p
    }, _drawCircle: function (t, s, r, q, p, o, n) {
      var m, l, k;
      return s -= q, r -= q, m = p === undefined ? ' stroked="false" ' : ' strokeWeight="' + n + 'px" strokeColor="' + p + '" ', l = o === undefined ? ' filled="false"' : ' fillColor="' + o + '" filled="true" ', k = '<v:oval  id="jqsshape' + t + '" ' + m + l + ' style="position:absolute;top:' + r + "px; left:" + s + "px; width:" + q * 2 + "px; height:" + q * 2 + 'px"></v:oval>', k
    }, _drawPieSlice: function (F, E, D, C, B, A, z, y) {
      var x, w, v, u, t, s, r, q;
      if (B === A) {
        return ""
      }
      A - B === 2 * Math.PI && (B = 0, A = 2 * Math.PI), w = E + Math.round(Math.cos(B) * C), v = D + Math.round(Math.sin(B) * C), u = E + Math.round(Math.cos(A) * C), t = D + Math.round(Math.sin(A) * C);
      if (w === u && v === t) {
        if (A - B < Math.PI) {
          return ""
        }
        w = u = E + C, v = t = D
      }
      return w === u && v === t && A - B < Math.PI ? "" : (x = [E - C, D - C, E + C, D + C, w, v, u, t], s = z === undefined ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + z + '" ', r = y === undefined ? ' filled="false"' : ' fillColor="' + y + '" filled="true" ', q = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + F + '" ' + s + r + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + E + "," + D + " wa " + x.join(", ") + ' x e"> </v:shape>', q)
    }, _drawRect: function (i, h, n, m, l, k, j) {
      return this._drawShape(i, [[h, n], [h, n + l], [h + m, n + l], [h + m, n], [h, n]], k, j)
    }, reset: function () {
      this.group.innerHTML = ""
    }, appendShape: function (d) {
      var c = this["_draw" + d.type].apply(this, d.args);
      return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", c) : this.prerender += c, this.lastShapeId = d.id, d.id
    }, replaceWithShape: function (a, h) {
      var g = ar("#jqsshape" + a), f = this["_draw" + h.type].apply(this, h.args);
      g[0].outerHTML = f
    }, replaceWithShapes: function (a, l) {
      var k = ar("#jqsshape" + a[0]), j = "", i = l.length, h;
      for (h = 0; h < i; h++) {
        j += this["_draw" + l[h].type].apply(this, l[h].args)
      }
      k[0].outerHTML = j;
      for (h = 1; h < a.length; h++) {
        ar("#jqsshape" + a[h]).remove()
      }
    }, insertAfterShape: function (a, h) {
      var g = ar("#jqsshape" + a), f = this["_draw" + h.type].apply(this, h.args);
      g[0].insertAdjacentHTML("afterEnd", f)
    }, removeShapeId: function (a) {
      var d = ar("#jqsshape" + a);
      this.group.removeChild(d[0])
    }, getShapeAt: function (f, e, h) {
      var g = f.id.substr(8);
      return g
    }, render: function () {
      this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0)
    }
  })
});
/*! scripts/fullsize_photo_slideshow.js */
(function (b, a) {
  var c = Backbone.View.extend({
    initialize: function (d) {
      this.options = d || {};
      this.slides = this.options.slideshow_items || [];
      this.root = b(this.options.slideshow_container) || b("#rad_slideshow"), this.interval = this.options.interval || 3000, this.display_badge = this.options.display_badge || false, this.display_like_and_reblog = this.options.display_like_and_reblog || false, this.current_slide = false;
      this.next_slide = false;
      this.count = false;
      if (!this.slides.length) {
        return
      }
      this.start_slideshow()
    }, create_slide: function () {
      var d, e, h, g, f;
      d = b('<div class="slide" />');
      h = b('<a class="source" />');
      if (this.display_badge) {
        e = b('<div class="radar_badge" />');
        d.append(e)
      }
      if (this.display_like_and_reblog) {
        g = b('<a class="reblog reblog_button" />');
        f = b('<a class="like" />');
        d.append(g);
        d.append(f)
      }
      d.append(h);
      return d
    }, update_slide: function (f, d) {
      if (!d) {
        return false
      }
      var i = f.find(".source"), g = f.find(".like"), h = f.find(".reblog"), e = f.find(".radar_badge");
      if (typeof(d.photo_url) !== "undefined") {
        f.css({"background-image": "url(" + d.photo_url + ")"})
      }
      if (d.source_url !== undefined) {
        i.attr("href", d.source_url);
        i.attr("target", "_new");
        if (d.source_label !== undefined) {
          i.html(d.source_label || "Source")
        }
      }
      if (this.display_badge) {
        e.addClass(d.radar_badge_class || "radar_badge")
      }
      if (this.display_like_and_reblog) {
        if (d.like_url !== undefined) {
          g.attr("href", d.like_url)
        }
        if (d.like_url === "#like") {
          g.off("click.NerdSlideshow").on("click.NerdSlideshow", function (j) {
            j.preventDefault();
            var k = (!d.like_state) ? "like" : "unlike";
            Tumblr[k]({id: d.post_id, key: d.reblog_key}, {
              complete: function () {
                b("#rad_slideshow_like_" + d.post_id).toggleClass("red");
                d.like_state = !d.like_state
              }
            })
          })
        }
        g.attr({
          id: "rad_slideshow_like_" + d.post_id,
          "class": (d.like_state === true) ? "like red like_button" : "like like_button"
        }).html(d.like_label || "Like");
        if (d.reblog_url !== undefined) {
          h.html(d.reblog_label || "Reblog");
          h.attr("href", d.reblog_url)
        }
      }
    }, transition: function () {
      b(this.current_slide).fadeOut(_.bind(function (f) {
        if (this.next_slide) {
          this.next_slide.css({zIndex: 1})
        }
        if (this.current_slide) {
          this.current_slide.css({zIndex: 0}).show()
        }
        var d = this.next_slide;
        this.next_slide = this.current_slide;
        this.current_slide = d;
        var e = this.slides[count % this.slides.length];
        this.update_slide(this.next_slide, e);
        count++;
        setTimeout(_.bind(this.transition, this), this.interval)
      }, this))
    }, start_slideshow: function () {
      this.current_slide = this.create_slide();
      this.root.append(this.current_slide);
      this.update_slide(this.current_slide, this.slides[0]);
      if (this.slides.length > 1) {
        this.next_slide = this.create_slide();
        this.root.append(this.next_slide);
        this.update_slide(this.next_slide, this.slides[1]);
        count = 2;
        this.transition()
      }
    }
  });
  a.NerdSlideshow = c
})(jQuery, Tumblr);
/*! scripts/radar.js */
(function (d, e, b) {
  var c = window.l10n_str || {};
  var a = e.View.extend({
    el: "#tumblr_radar",
    events: {
      "click a": "run_click",
      "click .notes_outer_container.popover .follow": "notes_popover_follow",
      "click .radar_footer .follow": "toggleFollow",
      "click .radar_controls_buttons .reblog": "reblog",
      "click .radar_controls_buttons .like:not(.liked)": "like",
      "click .radar_controls_buttons .liked": "unlike",
      "click .post_notes_label": "onPostNoteClick"
    },
    initialize: function () {
      this.post_id = this.$el.attr("data-post-id");
      this.post_root_id = this.$el.attr("data-root_id");
      this.form_key = d("#tumblr_form_key").attr("content");
      this.is_premium = this.$el.hasClass("premium");
      this.placement_id = this.$el.attr("data-placement_id");
      this.pt = this.$el.attr("data-pt");
      this.$followButton = this.$(".follow");
      this.version = this.$el.hasClass("radar_v2") ? "v2" : "v1";
      this.is_new_radar_design = this.$el.hasClass("new_radar_design");
      this.postModel = Tumblr.postsView.createPostModelFromEl(this.$el);
      Tumblr.postsView.collection.add(this.postModel);
      this.tumblelogModel = this.postModel.tumblelog;
      this.listenTo(this.tumblelogModel, "change:following", this.renderFollow);
      if (this.version === "v2" && this.$el.hasClass("radar_type_video")) {
        var f = this.$el.find(".thumbnail_anchor");
        var k = d(f).data("thumbnail-urls");
        var j = [];
        for (var h = 0; h < k.length; h++) {
          j.push({photo_url: k[h]})
        }
        this.slideshow = new Tumblr.NerdSlideshow({
          slideshow_container: f,
          slideshow_items: j,
          display_badge: false,
          display_like_and_reblog: false
        })
      } else {
        if (this.version === "v2" && this.$el.find(".photoset").length > 0) {
          var g = this.$el.find(".photoset");
          var l = d(g).data("thumbnail-urls");
          this.slideshow = new Tumblr.RadarPhotosetSlideshow({container: g, image_urls: l})
        }
      }
    },
    renderFollow: function (f, g) {
      if (f._previousAttributes.following == null || f._previousAttributes.following === g) {
        return
      }
      if (this.version === "v2") {
        this.$followButton[g ? "hide" : "show"]()
      } else {
        if (this.version === "v1") {
          if (g) {
            this.$followButton.toggleClass("follow_poof", g)
          } else {
            this.$followButton.toggleClass("followed follow_poof", g)
          }
        }
      }
      this.$(".radar_footer").toggleClass("has_follow_button", !g)
    },
    toggleFollow: function () {
      var f = this;
      var g = !this.tumblelogModel.get("following");
      this.tumblelogModel.save_following({following: g}, {
        placement_id: this.placement_id,
        pt: this.pt,
        source: g ? "FOLLOW_SOURCE_RADAR" : "UNFOLLOW_SOURCE_RADAR"
      }).done(function () {
        if (Tumblr.CapturePremiumRadar && f.placement_id) {
          Tumblr.CapturePremiumRadar.track_follow(g)
        } else {
          if (Tumblr.CaptureRadar) {
            Tumblr.CaptureRadar.track_follow(g)
          }
        }
      }).fail(function () {
        Tumblr.Dialog.alert(c.ajax_error)
      });
      return false
    },
    like: function (h) {
      h.stopPropagation();
      h.preventDefault();
      var f = d(h.currentTarget);
      f.addClass("liked");
      this.show_heart_poof(f.parent(), true);
      this.update_note_count(true);
      var g = this;
      Tumblr.like({
        id: this.post_id,
        root_id: this.post_root_id,
        key: f.attr("data-reblog-key"),
        placement_id: this.placement_id,
        pt: this.pt,
        source: "LIKE_SOURCE_RADAR"
      }, {
        success: function () {
          if (Tumblr.CapturePremiumRadar && g.placement_id) {
            Tumblr.CapturePremiumRadar.track_like(true)
          } else {
            if (Tumblr.CaptureRadar) {
              Tumblr.CaptureRadar.track_like(true)
            }
          }
        }, error: function () {
          f.removeClass("liked");
          Tumblr.Dialog.alert(c.ajax_error)
        }
      })
    },
    unlike: function (h) {
      h.stopPropagation();
      h.preventDefault();
      var f = d(h.currentTarget);
      f.removeClass("liked");
      this.show_heart_poof(f.parent(), false);
      this.update_note_count(false);
      var g = this;
      Tumblr.unlike({
        id: this.post_id,
        key: f.attr("data-reblog-key"),
        placement_id: this.placement_id,
        source: "UNLIKE_SOURCE_RADAR"
      }, {
        success: function () {
          if (Tumblr.CapturePremiumRadar && g.placement_id) {
            Tumblr.CapturePremiumRadar.track_like(false)
          } else {
            if (Tumblr.CaptureRadar) {
              Tumblr.CaptureRadar.track_like(false)
            }
          }
        }, error: function () {
          f.addClass("liked");
          Tumblr.Dialog.alert(c.ajax_error)
        }
      })
    },
    show_heart_poof: function (g, h) {
      var f = d('<div class="post_animated_heart post_poof"><span class="heart_left"></span><span class="heart_right"></span></div>').toggleClass("unliked", !h);
      g.append(f);
      setTimeout(function () {
        f.fadeOut(200, function () {
          f.remove()
        })
      }, 300)
    },
    reblog: function (h) {
      var f = d(h.currentTarget);
      if (h.altKey) {
        h.stopPropagation();
        h.preventDefault();
        if (f.hasClass("reblogged")) {
          return
        }
        f.addClass("reblogged");
        var g = this;
        d.ajax({
          url: "/fast_reblog",
          type: "post",
          data: {
            reblog_key: f.attr("data-reblog-key"),
            reblog_post_id: f.attr("data-reblog-id"),
            form_key: this.form_key,
            pt: this.pt
          },
          success: function () {
            if (Tumblr.CapturePremiumRadar && g.placement_id) {
              Tumblr.CapturePremiumRadar.track_fast_reblog(f, h)
            } else {
              if (Tumblr.CaptureRadar) {
                Tumblr.CaptureRadar.track_fast_reblog(f, h)
              }
            }
          },
          error: function () {
            f.removeClass("reblogged");
            Tumblr.Dialog.alert(c.ajax_error)
          }
        })
      } else {
        if (Tumblr.Flags.bool("prima_post_forms")) {
          h.stopPropagation();
          h.preventDefault();
          Tumblr.Events.trigger("postForms:reblog", {
            reblogKey: f.attr("data-reblog-key"),
            reblogId: f.attr("data-reblog-id"),
            pt: this.pt
          })
        }
      }
    },
    notes_popover_follow: function (h) {
      var g = d(h.currentTarget);
      var f = g.closest(".note");
      var i = f.data("tumblelog");
      f.addClass("is_following");
      Tumblr.follow({tumblelog: i})
    },
    update_note_count: function (g) {
      var f = this.$el.find(".note_link_current"), h;
      if (g) {
        h = f.data("more");
        if (f.data("more") !== f.text()) {
          f.data("less", f.text())
        }
        this.$el.removeClass("no_notes")
      } else {
        h = f.data("less");
        if (!h || !h.length) {
          this.$el.addClass("no_notes")
        }
      }
      f.text(h);
      f.attr("title", h)
    },
    run_click: function (h) {
      var f = h.currentTarget.href;
      var g = d(h.currentTarget);
      if (g.is(".no_pop, .photoset_photo, .photo_exif_flipper, .fan_mail_read_more, .follow, .like, .reblog")) {
        return
      }
      if (window.self !== window.top && g.is(".post_control.reblog, .post_control.edit")) {
        f = f.replace(/\?.*/, "")
      } else {
        if (g.closest(".no_pop, .post_controls, #new_post, .controls, .user_menu_list, form, .flash_notification, .more_notes_link").length > 0) {
          return
        }
        if (!f || f === "#") {
          return
        }
      }
      if (Tumblr.Flags.bool("indash_blogs")) {
        return
      } else {
        if (Tumblr.Prima.Url.hasAllowedProtocol(f)) {
          window.open(f)
        }
        h.preventDefault();
        h.stopPropagation()
      }
    },
    onPostNoteClick: function (f) {
      Tumblr.Events.trigger("useraction:click:post:notes", {event: f,})
    }
  });
  b.Radar = a
})(jQuery, Backbone, Tumblr);
jQuery(document).ready(function (a) {
  var b = a("#tumblr_radar");
  if (b.length) {
    Tumblr.radar = new Tumblr.Radar({el: b})
  }
});
/*! scripts/ads_impression_tracking.js */
(function (c, a) {
  var b = Tumblr.Utils.exceptions;
  a.ImpressionTracking = {
    ad_selectors: ["#tumblr_radar[data-pt]", ".post.sponsored_post", ".takeover-container", ".post.pt", ".remnant_ad.pt", ".follow_list_item_blog.pt", ".discovery-hero"],
    initialize: function () {
      this.tracking = [];
      this.setup();
      Tumblr.Events.on("DOMEventor:updateRect", this.check_for_ads, this);
      Tumblr.Events.on("search:layout:updated", this.check_for_ads, this)
    },
    throttleRate: 300,
    setup: function () {
      this.throttledTrack = _.throttle(_.bind(this.track, this), this.throttleRate);
      this.check_for_ads();
      Tumblr.Events.on("DOMEventor:flatscroll DOMEventor:flatresize", this.throttledTrack, this)
    },
    register: function (d) {
      var f = c("body");
      var e = f.find(d);
      _.each(e, function (h) {
        var g = c(h);
        if (!g.data("mb-tracked")) {
          g.data("mb-tracked", 1);
          this.tracking.push({was_below: null, el: h, $el: g})
        }
      }, this)
    },
    track: function () {
      var f = Tumblr.Prima.DOMEventor.rect();
      var h = f.windowScrollTop;
      var g = h + f.windowHeight;
      var e = Tumblr.Prima.DOMEventor.lastRect().windowScrollTop;
      var d = ((e || 0) <= h);
      _.each(this.tracking, function (j) {
        if (j.$el.data("yx")) {
          return
        }
        var m = false;
        var k = j.el.offsetHeight;
        var l = j.$el.offset().top + k;
        var i = j.$el.offset().top + (k * 0.5);
        if (j.was_below === null) {
          j.was_below = h > l
        }
        if (d) {
          m = i < g
        } else {
          if (j.was_below) {
            m = i > h
          }
        }
        if (m) {
          this.log_impression(j.$el)
        }
      }, this)
    },
    check_for_ads: function () {
      this.register(this.ad_selectors.join(", "));
      this.throttledTrack()
    },
    log_impression: function (d) {
      if (!(d instanceof jQuery && d.length)) {
        b(new Error("Attempted to log ad impression on undefined element"));
        return
      }
      if (!d.data("log-index")) {
        return
      }
      if (d.data("yx")) {
        return
      } else {
        d.data("yx", 1)
      }
      var k = d.data("placementId");
      var j = d.hasClass("radar");
      var f = d.data("pt");
      var i = false;
      if ((/^mb_[0-9]{1,20}$/).test(k)) {
        i = "622"
      } else {
        if (k) {
          i = j ? "641" : "640"
        }
      }
      var h = d.data("impression-url");
      if (h) {
        var g = h.split(",");
        c.each(g, _.bind(function (l, m) {
          this._send_beacon(m)
        }, this))
      }
      try {
        if (d.data("log-index") > 1) {
          Tumblr.Events.trigger("LSLog:impression", {
            loggingData: {
              pt: f,
              is_ad: (this._should_log_to_yx(d.data("log-index")))
            }
          })
        }
        if (this._should_log_to_yx(d.data("log-index"))) {
          c.ajax({
            url: "/svc/log/yx",
            type: "POST",
            data: {type: i, post_id: d.data("postId"), placement_id: k, pt: f},
            with_form_key: true
          })
        }
      } catch (e) {
      }
    },
    _should_log_to_yx: function (d) {
      return (d == 1 || d == 3)
    },
    _send_beacon: function (d) {
      var e = document.createElement("img");
      e.src = d
    },
    fire_tracking_pixels: function (f) {
      var g = f.data("root_id");
      var d = false;
      if (d) {
        var e = new Image();
        e.src = d
      }
    }
  }
})(jQuery, Tumblr || {});
jQuery(document).ready(function () {
  Tumblr.ImpressionTracking.initialize()
});
/*! scripts/tumblr/porn.js */
(function (a) {
  a.porn = function () {
    var d = document.doctype.nextSibling;
    var b = d.nodeValue.split("\n").length - 2;
    (function c() {
      var e = d.nodeValue.split("\n");
      e.splice(e.length - 2, 0, e.splice(1, 1));
      d.nodeValue = e.join("\n");
      (--b) && setTimeout(c, 100)
    })()
  }
})(Tumblr);
/*! scripts/tumblr/utils/post_tags.js */
Tumblr.Utils || (Tumblr.Utils = {});
(function (b, a) {
  var c = {
    tag_url: function (d) {
      var e = encodeURIComponent(d);
      e = e.replace("+", "-");
      e = e.replace("%20", "-");
      e = e.replace("_", "-");
      return "/tagged/" + e
    }
  };
  a.PostTags = c
})(jQuery, Tumblr.Utils);
/*! scripts/dashboard.js */
