/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("widget-position-align", function (e, t) {
  function c(e) {
  }

  var n = e.Lang, r = "align", i = "alignOn", s = "visible", o = "boundingBox", u = "offsetWidth", a = "offsetHeight", f = "region", l = "viewportRegion";
  c.ATTRS = {
    align: {value: null},
    centered: {setter: "_setAlignCenter", lazyAdd: !1, value: !1},
    alignOn: {value: [], validator: e.Lang.isArray}
  }, c.TL = "tl", c.TR = "tr", c.BL = "bl", c.BR = "br", c.TC = "tc", c.RC = "rc", c.BC = "bc", c.LC = "lc", c.CC = "cc", c.prototype = {
    initializer: function () {
      this._posNode || e.error("WidgetPosition needs to be added to the Widget, before WidgetPositionAlign is added"), e.after(this._bindUIPosAlign, this, "bindUI"), e.after(this._syncUIPosAlign, this, "syncUI")
    }, _posAlignUIHandles: null, destructor: function () {
      this._detachPosAlignUIHandles()
    }, _bindUIPosAlign: function () {
      this.after("alignChange", this._afterAlignChange), this.after("alignOnChange", this._afterAlignOnChange), this.after("visibleChange", this._syncUIPosAlign)
    }, _syncUIPosAlign: function () {
      var e = this.get(r);
      this._uiSetVisiblePosAlign(this.get(s)), e && this._uiSetAlign(e.node, e.points)
    }, align: function (e, t) {
      return arguments.length ? this.set(r, {node: e, points: t}) : this._syncUIPosAlign(), this
    }, centered: function (e) {
      return this.align(e, [c.CC, c.CC])
    }, _setAlignCenter: function (e) {
      return e && this.set(r, {node: e === !0 ? null : e, points: [c.CC, c.CC]}), e
    }, _uiSetAlign: function (t, r) {
      if (!n.isArray(r) || r.length !== 2) {
        e.error("align: Invalid Points Arguments");
        return
      }
      var i = this._getRegion(t), s, o, u;
      if (!i)return;
      s = r[0], o = r[1];
      switch (o) {
        case c.TL:
          u = [i.left, i.top];
          break;
        case c.TR:
          u = [i.right, i.top];
          break;
        case c.BL:
          u = [i.left, i.bottom];
          break;
        case c.BR:
          u = [i.right, i.bottom];
          break;
        case c.TC:
          u = [i.left + Math.floor(i.width / 2), i.top];
          break;
        case c.BC:
          u = [i.left + Math.floor(i.width / 2), i.bottom];
          break;
        case c.LC:
          u = [i.left, i.top + Math.floor(i.height / 2)];
          break;
        case c.RC:
          u = [i.right, i.top + Math.floor(i.height / 2)];
          break;
        case c.CC:
          u = [i.left + Math.floor(i.width / 2), i.top + Math.floor(i.height / 2)];
          break;
        default:
      }
      u && this._doAlign(s, u[0], u[1])
    }, _uiSetVisiblePosAlign: function (e) {
      e ? this._attachPosAlignUIHandles() : this._detachPosAlignUIHandles()
    }, _attachPosAlignUIHandles: function () {
      if (this._posAlignUIHandles)return;
      var t = this.get(o), n = e.bind(this._syncUIPosAlign, this), r = [];
      e.Array.each(this.get(i), function (i) {
        var s = i.eventName, o = e.one(i.node) || t;
        s && r.push(o.on(s, n))
      }), this._posAlignUIHandles = r
    }, _detachPosAlignUIHandles: function () {
      var t = this._posAlignUIHandles;
      t && ((new e.EventHandle(t)).detach(), this._posAlignUIHandles = null)
    }, _doAlign: function (e, t, n) {
      var r = this._posNode, i;
      switch (e) {
        case c.TL:
          i = [t, n];
          break;
        case c.TR:
          i = [t - r.get(u), n];
          break;
        case c.BL:
          i = [t, n - r.get(a)];
          break;
        case c.BR:
          i = [t - r.get(u), n - r.get(a)];
          break;
        case c.TC:
          i = [t - r.get(u) / 2, n];
          break;
        case c.BC:
          i = [t - r.get(u) / 2, n - r.get(a)];
          break;
        case c.LC:
          i = [t, n - r.get(a) / 2];
          break;
        case c.RC:
          i = [t - r.get(u), n - r.get(a) / 2];
          break;
        case c.CC:
          i = [t - r.get(u) / 2, n - r.get(a) / 2];
          break;
        default:
      }
      i && this.move(i)
    }, _getRegion: function (t) {
      var n;
      return t ? (t = e.Node.one(t), t && (n = t.get(f))) : n = this._posNode.get(l), n
    }, _afterAlignChange: function (e) {
      var t = e.newVal;
      t && this._uiSetAlign(t.node, t.points)
    }, _afterAlignOnChange: function (e) {
      this._detachPosAlignUIHandles(), this.get(s) && this._attachPosAlignUIHandles()
    }
  }, e.WidgetPositionAlign = c
}, "3.11.0", {requires: ["widget-position"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("widget-stack", function (e, t) {
  function O(e) {
  }

  var n = e.Lang, r = e.UA, i = e.Node, s = e.Widget, o = "zIndex", u = "shim", a = "visible", f = "boundingBox", l = "renderUI", c = "bindUI", h = "syncUI", p = "offsetWidth", d = "offsetHeight", v = "parentNode", m = "firstChild", g = "ownerDocument", y = "width", b = "height", w = "px", E = "shimdeferred", S = "shimresize", x = "visibleChange", T = "widthChange", N = "heightChange", C = "shimChange", k = "zIndexChange", L = "contentUpdate", A = "stacked";
  O.ATTRS = {
    shim: {value: r.ie == 6},
    zIndex: {value: 0, setter: "_setZIndex"}
  }, O.HTML_PARSER = {
    zIndex: function (e) {
      return this._parseZIndex(e)
    }
  }, O.SHIM_CLASS_NAME = s.getClassName(u), O.STACKED_CLASS_NAME = s.getClassName(A), O.SHIM_TEMPLATE = '<iframe class="' + O.SHIM_CLASS_NAME + '" frameborder="0" title="Widget Stacking Shim" src="javascript:false" tabindex="-1" role="presentation"></iframe>', O.prototype = {
    initializer: function () {
      this._stackNode = this.get(f), this._stackHandles = {}, e.after(this._renderUIStack, this, l), e.after(this._syncUIStack, this, h), e.after(this._bindUIStack, this, c)
    }, _syncUIStack: function () {
      this._uiSetShim(this.get(u)), this._uiSetZIndex(this.get(o))
    }, _bindUIStack: function () {
      this.after(C, this._afterShimChange), this.after(k, this._afterZIndexChange)
    }, _renderUIStack: function () {
      this._stackNode.addClass(O.STACKED_CLASS_NAME)
    }, _parseZIndex: function (e) {
      var t;
      return !e.inDoc() || e.getStyle("position") === "static" ? t = "auto" : t = e.getComputedStyle("zIndex"), t === "auto" ? null : t
    }, _setZIndex: function (e) {
      return n.isString(e) && (e = parseInt(e, 10)), n.isNumber(e) || (e = 0), e
    }, _afterShimChange: function (e) {
      this._uiSetShim(e.newVal)
    }, _afterZIndexChange: function (e) {
      this._uiSetZIndex(e.newVal)
    }, _uiSetZIndex: function (e) {
      this._stackNode.setStyle(o, e)
    }, _uiSetShim: function (e) {
      e ? (this.get(a) ? this._renderShim() : this._renderShimDeferred(), r.ie == 6 && this._addShimResizeHandlers()) : this._destroyShim()
    }, _renderShimDeferred: function () {
      this._stackHandles[E] = this._stackHandles[E] || [];
      var e = this._stackHandles[E], t = function (e) {
        e.newVal && this._renderShim()
      };
      e.push(this.on(x, t))
    }, _addShimResizeHandlers: function () {
      this._stackHandles[S] = this._stackHandles[S] || [];
      var e = this.sizeShim, t = this._stackHandles[S];
      t.push(this.after(x, e)), t.push(this.after(T, e)), t.push(this.after(N, e)), t.push(this.after(L, e))
    }, _detachStackHandles: function (e) {
      var t = this._stackHandles[e], n;
      if (t && t.length > 0)while (n = t.pop())n.detach()
    }, _renderShim: function () {
      var e = this._shimNode, t = this._stackNode;
      e || (e = this._shimNode = this._getShimTemplate(), t.insertBefore(e, t.get(m)), this._detachStackHandles(E), this.sizeShim())
    }, _destroyShim: function () {
      this._shimNode && (this._shimNode.get(v).removeChild(this._shimNode), this._shimNode = null, this._detachStackHandles(E), this._detachStackHandles(S))
    }, sizeShim: function () {
      var e = this._shimNode, t = this._stackNode;
      e && r.ie === 6 && this.get(a) && (e.setStyle(y, t.get(p) + w), e.setStyle(b, t.get(d) + w))
    }, _getShimTemplate: function () {
      return i.create(O.SHIM_TEMPLATE, this._stackNode.get(g))
    }
  }, e.WidgetStack = O
}, "3.11.0", {requires: ["base-build", "widget"], skinnable: !0});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("widget-position-constrain", function (e, t) {
  function m(e) {
  }

  var n = "constrain", r = "constrain|xyChange", i = "constrainChange", s = "preventOverlap", o = "align", u = "", a = "bindUI", f = "xy", l = "x", c = "y", h = e.Node, p = "viewportRegion", d = "region", v;
  m.ATTRS = {
    constrain: {value: null, setter: "_setConstrain"},
    preventOverlap: {value: !1}
  }, v = m._PREVENT_OVERLAP = {
    x: {tltr: 1, blbr: 1, brbl: 1, trtl: 1},
    y: {trbr: 1, tlbl: 1, bltl: 1, brtr: 1}
  }, m.prototype = {
    initializer: function () {
      this._posNode || e.error("WidgetPosition needs to be added to the Widget, before WidgetPositionConstrain is added"), e.after(this._bindUIPosConstrained, this, a)
    }, getConstrainedXY: function (e, t) {
      t = t || this.get(n);
      var r = this._getRegion(t === !0 ? null : t), i = this._posNode.get(d);
      return [this._constrain(e[0], l, i, r), this._constrain(e[1], c, i, r)]
    }, constrain: function (e, t) {
      var r, i, s = t || this.get(n);
      s && (r = e || this.get(f), i = this.getConstrainedXY(r, s), (i[0] !== r[0] || i[1] !== r[1]) && this.set(f, i, {constrained: !0}))
    }, _setConstrain: function (e) {
      return e === !0 ? e : h.one(e)
    }, _constrain: function (e, t, n, r) {
      if (r) {
        this.get(s) && (e = this._preventOverlap(e, t, n, r));
        var i = t == l, o = i ? r.width : r.height, u = i ? n.width : n.height, a = i ? r.left : r.top, f = i ? r.right - u : r.bottom - u;
        if (e < a || e > f)u < o ? e < a ? e = a : e > f && (e = f) : e = a
      }
      return e
    }, _preventOverlap: function (e, t, n, r) {
      var i = this.get(o), s = t === l, a, f, c, h, p, d;
      return i && i.points && v[t][i.points.join(u)] && (f = this._getRegion(i.node), f && (a = s ? n.width : n.height, c = s ? f.left : f.top, h = s ? f.right : f.bottom, p = s ? f.left - r.left : f.top - r.top, d = s ? r.right - f.right : r.bottom - f.bottom), e > c ? d < a && p > a && (e = c - a) : p < a && d > a && (e = h)), e
    }, _bindUIPosConstrained: function () {
      this.after(i, this._afterConstrainChange), this._enableConstraints(this.get(n))
    }, _afterConstrainChange: function (e) {
      this._enableConstraints(e.newVal)
    }, _enableConstraints: function (e) {
      e ? (this.constrain(), this._cxyHandle = this._cxyHandle || this.on(r, this._constrainOnXYChange)) : this._cxyHandle && (this._cxyHandle.detach(), this._cxyHandle = null)
    }, _constrainOnXYChange: function (e) {
      e.constrained || (e.newVal = this.getConstrainedXY(e.newVal))
    }, _getRegion: function (e) {
      var t;
      return e ? (e = h.one(e), e && (t = e.get(d))) : t = this._posNode.get(p), t
    }
  }, e.WidgetPositionConstrain = m
}, "3.11.0", {requires: ["widget-position"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("overlay", function (e, t) {
  e.Overlay = e.Base.create("overlay", e.Widget, [e.WidgetStdMod, e.WidgetPosition, e.WidgetStack, e.WidgetPositionAlign, e.WidgetPositionConstrain])
}, "3.11.0", {
  requires: ["widget", "widget-stdmod", "widget-position", "widget-position-align", "widget-stack", "widget-position-constrain"],
  skinnable: !0
});
YUI.add("gallery-popover", function (c) {
  var v = "boundingBox", l = "contentBox", b = "tl", p = "t", a = "tr", h = "rt", k = "r", t = "rb", u = "br", i = "b", o = "bl", d = "lb", m = "l", f = "lt", w = 27, e = 50, q = 28, s = 18;
  var n = {
    initializer: function () {
    }, bindUI: function () {
      this.after("arrowPositionChange", function (y) {
        this._arrow.removeClass(this.getClassName("arrow", y.prevVal));
        this._arrowMask.removeClass(this.getClassName("arrow", "mask", y.prevVal));
        this._arrow.addClass(this.getClassName("arrow", y.newVal));
        this._arrowMask.addClass(this.getClassName("arrow", "mask", y.newVal))
      })
    }, renderUI: function () {
      this._arrow = c.Node.create('<span class="' + this.getClassName("arrow") + '">◣</span>');
      this._arrowMask = c.Node.create('<span class="' + this.getClassName("arrow", "mask") + '"></span>');
      this.get(v).append(this._arrow).append(this._arrowMask);
      var y = this.get("arrowPosition");
      this._arrow.addClass(this.getClassName("arrow", y));
      this._arrowMask.addClass(this.getClassName("arrow", "mask", y));
      if (c.UA.webkit && c.UA.os === "windows") {
        this._arrow.addClass("win-webkit");
        this._arrow.addClass(c.UA.chrome ? "win-chrome" : "win-safari")
      } else {
        if (c.UA.gecko && c.UA.os === "windows") {
          this._arrow.addClass("win-gecko");
          this._arrow.addClass("win-firefox");
          if (c.UA.gecko >= 1.9 && c.UA.gecko < 2) {
            this._arrow.addClass("win-firefox-3")
          }
        }
      }
    }, syncUI: function () {
    }, alignToElement: function (A, N) {
      var z, B, K, M, C, I, D = this.get("arrowPosition"), y, H, J, G, L;
      if (this.get("showSquare")) {
        s = 8
      }
      switch (D) {
        case b:
          z = [c.WidgetPositionAlign.TL, c.WidgetPositionAlign.BC];
          B = {x: -q, y: s};
          break;
        case p:
          z = [c.WidgetPositionAlign.TC, c.WidgetPositionAlign.BC];
          B = {x: 0, y: s};
          break;
        case a:
          z = [c.WidgetPositionAlign.TR, c.WidgetPositionAlign.BC];
          B = {x: q, y: s};
          break;
        case h:
          z = [c.WidgetPositionAlign.TR, c.WidgetPositionAlign.LC];
          B = {x: -s, y: -q};
          break;
        case k:
          z = [c.WidgetPositionAlign.RC, c.WidgetPositionAlign.LC];
          B = {x: -s, y: 0};
          break;
        case t:
          z = [c.WidgetPositionAlign.BR, c.WidgetPositionAlign.LC];
          B = {x: -s, y: q};
          break;
        case u:
          z = [c.WidgetPositionAlign.BR, c.WidgetPositionAlign.TC];
          B = {x: q, y: -s};
          break;
        case i:
          z = [c.WidgetPositionAlign.BC, c.WidgetPositionAlign.TC];
          B = {x: 0, y: -s};
          break;
        case o:
          z = [c.WidgetPositionAlign.BL, c.WidgetPositionAlign.TC];
          B = {x: -q, y: -s};
          break;
        case d:
          z = [c.WidgetPositionAlign.BL, c.WidgetPositionAlign.RC];
          B = {x: s, y: q};
          break;
        case m:
          z = [c.WidgetPositionAlign.LC, c.WidgetPositionAlign.RC];
          B = {x: s, y: 0};
          break;
        case f:
          z = [c.WidgetPositionAlign.TL, c.WidgetPositionAlign.RC];
          B = {x: s, y: -q}
      }
      x(this._arrow);
      x(this._arrowMask);
      this.align(A, z);
      K = this._posNode.get("region");
      M = [K.left + B.x, K.top + B.y];
      this.move(M);
      if (N) {
        this.constrain(null, N);
        K = this._posNode.get("region");
        C = [K.left, K.top];
        if (D === b || D === p || D === a || D === o || D === i || D === u) {
          if (M[0] !== C[0]) {
            I = M[0] - C[0];
            this._arrow.setX(this._arrow.getX());
            this._arrow.setStyle("right", "auto");
            y = this._arrow.getX() + I;
            if (y + w > K.right) {
              y = K.right - w
            } else {
              if (y < K.left) {
                y = K.left
              }
            }
            this._arrow.setX(y);
            this._arrowMask.setX(this._arrowMask.getX());
            this._arrowMask.setStyle("right", "auto");
            H = this._arrowMask.getX() + I;
            if (H + e > K.right) {
              H = K.right - e
            } else {
              if (H < K.left) {
                H = K.left
              }
            }
            this._arrowMask.setX(H)
          }
          if (M[1] !== C[1]) {
            I = M[1] - C[1];
            K = this._posNode.get("region");
            M = [K.left, K.top + I];
            this.move(M)
          }
        } else {
          if (D === f || D === m || D === d || D === h || D === k || D === t) {
            if (M[1] !== C[1]) {
              I = M[1] - C[1];
              this._arrow.setY(this._arrow.getY());
              this._arrow.setStyle("bottom", "auto");
              J = this._arrow.getY() + I;
              if (J + w > K.bottom) {
                J = K.bottom - w
              } else {
                if (J < K.top) {
                  J = K.top
                }
              }
              this._arrow.setY(J);
              this._arrowMask.setY(this._arrowMask.getY());
              this._arrowMask.setStyle("bottom", "auto");
              G = this._arrowMask.getY() + I;
              if (G + e > K.bottom) {
                G = K.bottom - e
              } else {
                if (G < K.top) {
                  G = K.top
                }
              }
              this._arrowMask.setY(J)
            }
            if (M[0] !== C[0]) {
              I = M[0] - C[0];
              K = this._posNode.get("region");
              M = [K.left + I, K.top];
              this.move(M)
            }
          }
        }
      }
      if (!this._positionMarkerNode) {
        this._positionMarkerNode = c.DOM.create('<div class="popover-position-marker"></div>');
        c.one("body").append(this._positionMarkerNode)
      }
      if (this.get("arrowPosition") === "br" && this.get("accordian")) {
        this.get("srcNode").getDOMNode().parentNode.style.bottom = ""
      }
      c.DOM.setXY(this._positionMarkerNode, this._posNode.get("region"));
      this.align(this._positionMarkerNode, [c.WidgetPositionAlign.TL, c.WidgetPositionAlign.BL]);
      if (this.get("arrowPosition") === "br") {
        var E = this;
        if (!this.get("isRefresh") || !this.get("refreshBottom") || !this.get("refreshRight")) {
          j(E, A)
        } else {
          g(E, A)
        }
      }
      if (this.get("extraCSS")) {
        this.get("srcNode").ancestor(".yui3-popover").addClass(this.get("extraCSS"))
      }
    }
  };
  var r = {
    TOPLEFT: b,
    TOP: p,
    TOPRIGHT: a,
    RIGHTTOP: h,
    RIGHT: k,
    RIGHTBOTTOM: t,
    BOTTOMRIGHT: u,
    BOTTOM: i,
    BOTTOMLEFT: o,
    LEFTBOTTOM: d,
    LEFT: m,
    LEFTTOP: f,
    CSS_PREFIX: "yui3-popover",
    ATTRS: {
      arrowPosition: {
        value: a, validator: function (y) {
          return (y === b || y === p || y === a || y === o || y === i || y === u || y === f || y === m || y === d || y === h || y === k || y === t)
        }
      },
      accordian: {
        value: false, validator: function (y) {
          return (typeof y === "boolean")
        }
      },
      isRefresh: {value: false},
      refreshBottom: {value: null},
      refreshRight: {value: null},
      extraCSS: {value: ""},
      showSquare: {value: false}
    }
  };

  function x(y) {
    y.setStyle("top", "").setStyle("right", "").setStyle("bottom", "").setStyle("left", "")
  }

  function j(z, y) {
    (function () {
      var C = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (E) {
            window.setTimeout(E, 1000 / 60)
          }
      })();
      var D = function (E) {
        return parseInt(E.replace("px", ""), 10)
      };
      var A = z.get("srcNode").getDOMNode();
      var B = A.parentNode;
      C(function () {
        if (!B.style.bottom) {
          var G = D(B.style.top), E;
          E = 310;
          B.style.bottom = (-1 * G) - E + "px"
        }
        C(function () {
          B.style.top = ""
        })
      })
    })()
  }

  function g(z, y) {
    (function () {
      var C = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (E) {
            window.setTimeout(E, 1000 / 60)
          }
      })();
      var D = function (E) {
        return parseInt(E.replace("px", ""), 10)
      };
      var A = z.get("srcNode").getDOMNode();
      var B = A.parentNode;
      B.style.display = "none";
      C(function () {
        B.style.top = "";
        B.style.left = "";
        B.style.bottom = z.get("refreshBottom");
        B.style.right = z.get("refreshRight");
        C(function () {
          B.style.display = "block"
        })
      })
    })()
  }

  c.Popover = c.Base.create("popover", c.Widget, [c.WidgetStdMod, c.WidgetPosition, c.WidgetStack, c.WidgetPositionAlign, c.WidgetPositionConstrain], n, r)
}, "0.0.1", {
  requires: F.config.modules["gallery-popover"].requires || [],
  optional: F.config.modules["gallery-popover"].optional || []
});
YUI.add("focus-tracker", function (e) {
  var a = /^text|search|tel|url|email|password|datetime|date|month|week|time|datetime-local|number|range|color$/i;

  function b() {
    var g;
    try {
      g = e.one(document.activeElement)
    } catch (f) {
      console.warn("Caught error from document.activeElement", f);
      return false
    }
    return g
  }

  function c() {
    var f = b(), g;
    if (!f) {
      return false
    }
    g = f.get("tagName").toUpperCase();
    if (g === "INPUT") {
      return a.test(f.get("type"))
    } else {
      if (g === "TEXTAREA" || g === "SELECT") {
        return true
      }
    }
  }

  function d() {
    var f = b();
    if (f && e.Lang.isFunction(f.blur)) {
      try {
        f.blur()
      } catch (g) {
      }
    }
  }

  e.focusTracker = {get: b, isInput: c, blur: d}
}, "0.0.1", {
  requires: F.config.modules["focus-tracker"].requires || [],
  optional: F.config.modules["focus-tracker"].optional || []
});
YUI.add("better-throttle", function (b) {
  function a(h, f, i, e) {
    var j, c;
    j = 0;
    i = i || null;
    function k() {
      if (c) {
        c.cancel();
        c = undefined
      }
    }

    function d() {
      k();
      h.apply(i, arguments)
    }

    function g() {
      var l = (new Date()).getTime();
      if (e) {
        k()
      } else {
        if (l - j > f) {
          j = l;
          d.apply(i, arguments);
          return
        }
      }
      if (!c) {
        c = b.later(f, i, d, arguments)
      }
    }

    return g
  }

  b.betterThrottle = a
}, "0.0.1", {requires: []});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("dump", function (e, t) {
  var n = e.Lang, r = "{...}", i = "f(){...}", s = ", ", o = " => ", u = function (e, t) {
    var u, a, f = [], l = n.type(e);
    if (!n.isObject(e))return e + "";
    if (l == "date")return e;
    if (e.nodeType && e.tagName)return e.tagName + "#" + e.id;
    if (e.document && e.navigator)return "window";
    if (e.location && e.body)return "document";
    if (l == "function")return i;
    t = n.isNumber(t) ? t : 3;
    if (l == "array") {
      f.push("[");
      for (u = 0, a = e.length; u < a; u += 1)n.isObject(e[u]) ? f.push(t > 0 ? n.dump(e[u], t - 1) : r) : f.push(e[u]), f.push(s);
      f.length > 1 && f.pop(), f.push("]")
    } else if (l == "regexp")f.push(e.toString()); else {
      f.push("{");
      for (u in e)if (e.hasOwnProperty(u))try {
        f.push(u + o), n.isObject(e[u]) ? f.push(t > 0 ? n.dump(e[u], t - 1) : r) : f.push(e[u]), f.push(s)
      } catch (c) {
        f.push("Error: " + c.message)
      }
      f.length > 1 && f.pop(), f.push("}")
    }
    return f.join("")
  };
  e.dump = u, n.dump = u
}, "3.11.0", {requires: ["yui-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("querystring-stringify-simple", function (e, t) {
  var n = e.namespace("QueryString"), r = encodeURIComponent;
  n.stringify = function (t, n) {
    var i = [], s = n && n.arrayKey ? !0 : !1, o, u, a;
    for (o in t)if (t.hasOwnProperty(o))if (e.Lang.isArray(t[o]))for (u = 0, a = t[o].length; u < a; u++)i.push(r(s ? o + "[]" : o) + "=" + r(t[o][u])); else i.push(r(o) + "=" + r(t[o]));
    return i.join("&")
  }
}, "3.11.0", {requires: ["yui-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("io-base", function (e, t) {
  function o(t) {
    var n = this;
    n._uid = "io:" + s++, n._init(t), e.io._map[n._uid] = n
  }

  var n = ["start", "complete", "end", "success", "failure", "progress"], r = ["status", "statusText", "responseText", "responseXML"], i = e.config.win, s = 0;
  o.prototype = {
    _id: 0, _headers: {"X-Requested-With": "XMLHttpRequest"}, _timeout: {}, _init: function (t) {
      var r = this, i, s;
      r.cfg = t || {}, e.augment(r, e.EventTarget);
      for (i = 0, s = n.length; i < s; ++i)r.publish("io:" + n[i], e.merge({broadcast: 1}, t)), r.publish("io-trn:" + n[i], t)
    }, _create: function (t, n) {
      var r = this, s = {
        id: e.Lang.isNumber(n) ? n : r._id++,
        uid: r._uid
      }, o = t.xdr ? t.xdr.use : null, u = t.form && t.form.upload ? "iframe" : null, a;
      return o === "native" && (o = e.UA.ie && !l ? "xdr" : null, r.setHeader("X-Requested-With")), a = o || u, s = a ? e.merge(e.IO.customTransport(a), s) : e.merge(e.IO.defaultTransport(), s), s.notify && (t.notify = function (e, t, n) {
        r.notify(e, t, n)
      }), a || i && i.FormData && t.data instanceof i.FormData && (s.c.upload.onprogress = function (e) {
        r.progress(s, e, t)
      }, s.c.onload = function (e) {
        r.load(s, e, t)
      }, s.c.onerror = function (e) {
        r.error(s, e, t)
      }, s.upload = !0), s
    }, _destroy: function (t) {
      i && !t.notify && !t.xdr && (u && !t.upload ? t.c.onreadystatechange = null : t.upload ? (t.c.upload.onprogress = null, t.c.onload = null, t.c.onerror = null) : e.UA.ie && !t.e && t.c.abort()), t = t.c = null
    }, _evt: function (t, r, i) {
      var s = this, o, u = i.arguments, a = s.cfg.emitFacade, f = "io:" + t, l = "io-trn:" + t;
      this.detach(l), r.e && (r.c = {status: 0, statusText: r.e}), o = [a ? {
        id: r.id,
        data: r.c,
        cfg: i,
        arguments: u
      } : r.id], a || (t === n[0] || t === n[2] ? u && o.push(u) : (r.evt ? o.push(r.evt) : o.push(r.c), u && o.push(u))), o.unshift(f), s.fire.apply(s, o), i.on && (o[0] = l, s.once(l, i.on[t], i.context || e), s.fire.apply(s, o))
    }, start: function (e, t) {
      this._evt(n[0], e, t)
    }, complete: function (e, t) {
      this._evt(n[1], e, t)
    }, end: function (e, t) {
      this._evt(n[2], e, t), this._destroy(e)
    }, success: function (e, t) {
      this._evt(n[3], e, t), this.end(e, t)
    }, failure: function (e, t) {
      this._evt(n[4], e, t), this.end(e, t)
    }, progress: function (e, t, r) {
      e.evt = t, this._evt(n[5], e, r)
    }, load: function (e, t, r) {
      e.evt = t.target, this._evt(n[1], e, r)
    }, error: function (e, t, r) {
      e.evt = t, this._evt(n[4], e, r)
    }, _retry: function (e, t, n) {
      return this._destroy(e), n.xdr.use = "flash", this.send(t, n, e.id)
    }, _concat: function (e, t) {
      return e += (e.indexOf("?") === -1 ? "?" : "&") + t, e
    }, setHeader: function (e, t) {
      t ? this._headers[e] = t : delete this._headers[e]
    }, _setHeaders: function (t, n) {
      n = e.merge(this._headers, n), e.Object.each(n, function (e, r) {
        e !== "disable" && t.setRequestHeader(r, n[r])
      })
    }, _startTimeout: function (e, t) {
      var n = this;
      n._timeout[e.id] = setTimeout(function () {
        n._abort(e, "timeout")
      }, t)
    }, _clearTimeout: function (e) {
      clearTimeout(this._timeout[e]), delete this._timeout[e]
    }, _result: function (e, t) {
      var n;
      try {
        n = e.c.status
      } catch (r) {
        n = 0
      }
      n >= 200 && n < 300 || n === 304 || n === 1223 ? this.success(e, t) : this.failure(e, t)
    }, _rS: function (e, t) {
      var n = this;
      e.c.readyState === 4 && (t.timeout && n._clearTimeout(e.id), setTimeout(function () {
        n.complete(e, t), n._result(e, t)
      }, 0))
    }, _abort: function (e, t) {
      e && e.c && (e.e = t, e.c.abort())
    }, send: function (t, n, i) {
      var s, o, u, a, f, c, h = this, p = t, d = {};
      n = n ? e.Object(n) : {}, s = h._create(n, i), o = n.method ? n.method.toUpperCase() : "GET", f = n.sync, c = n.data, e.Lang.isObject(c) && !c.nodeType && !s.upload && e.QueryString && e.QueryString.stringify && (n.data = c = e.QueryString.stringify(c));
      if (n.form) {
        if (n.form.upload)return h.upload(s, t, n);
        c = h._serialize(n.form, c)
      }
      c || (c = "");
      if (c)switch (o) {
        case"GET":
        case"HEAD":
        case"DELETE":
          p = h._concat(p, c), c = "";
          break;
        case"POST":
        case"PUT":
          n.headers = e.merge({"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}, n.headers)
      }
      if (s.xdr)return h.xdr(p, s, n);
      if (s.notify)return s.c.send(s, t, n);
      !f && !s.upload && (s.c.onreadystatechange = function () {
        h._rS(s, n)
      });
      try {
        s.c.open(o, p, !f, n.username || null, n.password || null), h._setHeaders(s.c, n.headers || {}), h.start(s, n), n.xdr && n.xdr.credentials && l && (s.c.withCredentials = !0), s.c.send(c);
        if (f) {
          for (u = 0, a = r.length; u < a; ++u)d[r[u]] = s.c[r[u]];
          return d.getAllResponseHeaders = function () {
            return s.c.getAllResponseHeaders()
          }, d.getResponseHeader = function (e) {
            return s.c.getResponseHeader(e)
          }, h.complete(s, n), h._result(s, n), d
        }
      } catch (v) {
        if (s.xdr)return h._retry(s, t, n);
        h.complete(s, n), h._result(s, n)
      }
      return n.timeout && h._startTimeout(s, n.timeout), {
        id: s.id, abort: function () {
          return s.c ? h._abort(s, "abort") : !1
        }, isInProgress: function () {
          return s.c ? s.c.readyState % 4 : !1
        }, io: h
      }
    }
  }, e.io = function (t, n) {
    var r = e.io._map["io:0"] || new o;
    return r.send.apply(r, [t, n])
  }, e.io.header = function (t, n) {
    var r = e.io._map["io:0"] || new o;
    r.setHeader(t, n)
  }, e.IO = o, e.io._map = {};
  var u = i && i.XMLHttpRequest, a = i && i.XDomainRequest, f = i && i.ActiveXObject, l = u && "withCredentials" in new XMLHttpRequest;
  e.mix(e.IO, {
    _default: "xhr", defaultTransport: function (t) {
      if (!t) {
        var n = {c: e.IO.transports[e.IO._default](), notify: e.IO._default === "xhr" ? !1 : !0};
        return n
      }
      e.IO._default = t
    }, transports: {
      xhr: function () {
        return u ? new XMLHttpRequest : f ? new ActiveXObject("Microsoft.XMLHTTP") : null
      }, xdr: function () {
        return a ? new XDomainRequest : null
      }, iframe: function () {
        return {}
      }, flash: null, nodejs: null
    }, customTransport: function (t) {
      var n = {c: e.IO.transports[t]()};
      return n[t === "xdr" || t === "flash" ? "xdr" : "notify"] = !0, n
    }
  }), e.mix(e.IO.prototype, {
    notify: function (e, t, n) {
      var r = this;
      switch (e) {
        case"timeout":
        case"abort":
        case"transport error":
          t.c = {status: 0, statusText: e}, e = "failure";
        default:
          r[e].apply(r, [t, n])
      }
    }
  })
}, "3.11.0", {requires: ["event-custom-base", "querystring-stringify-simple"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("datatype-xml-parse", function (e, t) {
  var n = e.Lang;
  e.mix(e.namespace("XML"), {
    parse: function (e) {
      var t = null;
      if (n.isString(e))try {
        n.isUndefined(ActiveXObject) || (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = !1, t.loadXML(e))
      } catch (r) {
        try {
          n.isUndefined(DOMParser) || (t = (new DOMParser).parseFromString(e, "text/xml")), n.isUndefined(Windows.Data.Xml.Dom) || (t = new Windows.Data.Xml.Dom.XmlDocument, t.loadXml(e))
        } catch (i) {
        }
      }
      return n.isNull(t) || n.isNull(t.documentElement) || t.documentElement.nodeName === "parsererror", t
    }
  }), e.namespace("Parsers").xml = e.XML.parse, e.namespace("DataType"), e.DataType.XML = e.XML
}, "3.11.0");
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("io-xdr", function (e, t) {
  function a(e, t, n) {
    var r = '<object id="io_swf" type="application/x-shockwave-flash" data="' + e + '" width="0" height="0">' + '<param name="movie" value="' + e + '">' + '<param name="FlashVars" value="yid=' + t + "&uid=" + n + '">' + '<param name="allowScriptAccess" value="always">' + "</object>", i = s.createElement("div");
    s.body.appendChild(i), i.innerHTML = r
  }

  function f(t, n, r) {
    return n === "flash" && (t.c.responseText = decodeURI(t.c.responseText)), r === "xml" && (t.c.responseXML = e.DataType.XML.parse(t.c.responseText)), t
  }

  function l(e, t) {
    return e.c.abort(e.id, t)
  }

  function c(e) {
    return u ? i[e.id] !== 4 : e.c.isInProgress(e.id)
  }

  var n = e.publish("io:xdrReady", {fireOnce: !0}), r = {}, i = {}, s = e.config.doc, o = e.config.win, u = o && o.XDomainRequest;
  e.mix(e.IO.prototype, {
    _transport: {}, _ieEvt: function (e, t) {
      var n = this, r = e.id, s = "timeout";
      e.c.onprogress = function () {
        i[r] = 3
      }, e.c.onload = function () {
        i[r] = 4, n.xdrResponse("success", e, t)
      }, e.c.onerror = function () {
        i[r] = 4, n.xdrResponse("failure", e, t)
      }, e.c.ontimeout = function () {
        i[r] = 4, n.xdrResponse(s, e, t)
      }, e.c[s] = t[s] || 0
    }, xdr: function (t, n, i) {
      var s = this;
      return i.xdr.use === "flash" ? (r[n.id] = i, o.setTimeout(function () {
        try {
          n.c.send(t, {id: n.id, uid: n.uid, method: i.method, data: i.data, headers: i.headers})
        } catch (e) {
          s.xdrResponse("transport error", n, i), delete r[n.id]
        }
      }, e.io.xdr.delay)) : u ? (s._ieEvt(n, i), n.c.open(i.method || "GET", t), setTimeout(function () {
        n.c.send(i.data)
      }, 0)) : n.c.send(t, n, i), {
        id: n.id, abort: function () {
          return n.c ? l(n, i) : !1
        }, isInProgress: function () {
          return n.c ? c(n.id) : !1
        }, io: s
      }
    }, xdrResponse: function (e, t, n) {
      n = r[t.id] ? r[t.id] : n;
      var s = this, o = u ? i : r, a = n.xdr.use, l = n.xdr.dataType;
      switch (e) {
        case"start":
          s.start(t, n);
          break;
        case"success":
          s.success(f(t, a, l), n), delete o[t.id];
          break;
        case"timeout":
        case"abort":
        case"transport error":
          t.c = {status: 0, statusText: e};
        case"failure":
          s.failure(f(t, a, l), n), delete o[t.id]
      }
    }, _xdrReady: function (t, r) {
      e.fire(n, t, r)
    }, transport: function (t) {
      t.id === "flash" && (a(e.UA.ie ? t.src + "?d=" + (new Date).valueOf().toString() : t.src, e.id, t.uid), e.IO.transports.flash = function () {
        return s.getElementById("io_swf")
      })
    }
  }), e.io.xdrReady = function (t, n) {
    var r = e.io._map[n];
    e.io.xdr.delay = 0, r._xdrReady.apply(r, [t, n])
  }, e.io.xdrResponse = function (t, n, r) {
    var i = e.io._map[n.uid];
    i.xdrResponse.apply(i, [t, n, r])
  }, e.io.transport = function (t) {
    var n = e.io._map["io:0"] || new e.IO;
    t.uid = n._uid, n.transport.apply(n, [t])
  }, e.io.xdr = {delay: 100}
}, "3.11.0", {requires: ["io-base", "datatype-xml-parse"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("json-parse", function (e, t) {
  var n = e.config.global.JSON;
  e.namespace("JSON").parse = function (e, t, r) {
    return n.parse(typeof e == "string" ? e : e + "", t, r)
  }
}, "3.11.0", {requires: ["yui-base"]});
YUI.add("gallery-flickr-api", function (a) {
  YUI.namespace("flickrAPITransactions");
  var l = a.config.flickr.flags.enable_client_fullpath_api ? a.config.flickrAPI.flickr_api_uri : "/services/rest/", n = {
    format: "json",
    clientType: "yui-3-flickrapi-module"
  }, g = "flapicb", d = 60000, h = YUI.flickrAPITransactions, c = function () {
    return true
  }, k = function () {
    return true
  }, i = function () {
    return true
  }, b = {
    last_response_id: 0, id_map: {}, response_map: {}, setResponse: function (q, p) {
      var o = b;
      o.response_map[q] = p;
      return o.response_map[q]
    }, setId: function (r, q) {
      var p = b, o = q;
      p.id_map[r] = o;
      p.last_response_id = o;
      return o
    }
  }, f = function (r) {
    var p = "";
    for (var q in r) {
      if (r.hasOwnProperty(q)) {
        p += q + "=" + r[q] + "&"
      }
    }
    return p.substr(0, p.length - 1)
  }, j = function (v, s, o, q) {
    var u = b, t, p;
    if (q) {
      try {
        t = a.JSON.parse(s[1].responseText)
      } catch (r) {
        a.log("invalid JSON", "error", "flickrAPI")
      }
      p = [{params: s[2].params, data: t}].concat(s)
    } else {
      t = (u.response_map[u.id_map[s[0].tId]]) ? u.response_map[u.id_map[s[0].tId]][0] : null;
      p = [{params: s[0].data, data: t}].concat(s)
    }
    if (t && o) {
      if (t.stat === "ok") {
        return v.apply(a, p)
      } else {
        if ("fail") {
          a.log(t.message, "error", "flickrAPI");
          return this.failure.apply(a, p)
        }
      }
    } else {
      if (o === 0) {
        this.failure.apply(a, p)
      } else {
        if (v) {
          return v.apply(a, p)
        }
      }
    }
  }, e = function (q, s, r) {
    var p = b.last_response_id + 1, o = a.Get.script(q + "?" + f(s) + "&jsoncallback=YUI.flickrAPITransactions." + g + p + "&cachebust=" + (new Date()).getTime(), r);
    b.setId(o.tId, p);
    h[g + p] = function (t) {
      var u = b.setResponse(p, arguments);
      if (u) {
        a.later(1000, a, function () {
          delete h[g + p]
        })
      }
    };
    return o
  }, m = function (o, q, p) {
    a.use("io", function (r) {
      r.io(o, {method: "POST", data: f(q), timeout: d, on: p, xdr: {credentials: true}, "arguments": {params: q}})
    })
  };
  a.flickrAPI = {
    callMethod: function (q, t, p, v, r) {
      v = v || {};
      if (typeof v.timeout !== "number") {
        v.timeout = d
      }
      oYUIPOSTConf = v;
      t = t || {};
      var s = l, o;
      t = a.merge(a.config.flickrAPI, t);
      if (t.flickr_api_uri) {
        s = t.flickr_api_uri;
        delete t.flickr_api_uri
      }
      a.Object.each(t, function (y, w, x) {
        x[w] = encodeURIComponent(y)
      });
      t.method = q;
      if (a.Lang.isFunction(p)) {
        p = {success: p, failure: c, progress: k, timeout: i}
      }
      if (a.Lang.isObject(p)) {
        v = a.merge(v, {
          onSuccess: function () {
            a.fire("flickrAPI:success");
            return j.apply(p, [p.success, arguments, 1])
          }, onFailure: function () {
            if (b.response_map[b.id_map[arguments[0].tId]] !== null) {
              a.log("Your request (ID:" + arguments[0].tId + ") has failed.", "error", "flickrAPI");
              a.fire("flickrAPI:failure");
              return j.apply(p, [p.failure, arguments, 0])
            }
          }, onProgress: function () {
            a.fire("flickrAPI:progress");
            return j.apply(p, [a.Lang.isFunction(p.progress) ? p.progress : function () {
            }, arguments, null])
          }, onTimeout: function () {
            a.log("Your request (ID:" + arguments[0].tId + ") has timed out", "error", "flickrAPI");
            h[g + b.id_map[arguments[0].tId]] = function () {
              a.log("A response callback was fired but suppressed because of a timeout enforced by configuration.", "warn", "flickrAPI")
            };
            b.response_map[b.id_map[arguments[0].tId]] = null;
            a.Get.abort(arguments[0].tId);
            a.fire("flickrAPI:timeout");
            return j.apply(p, [p.timeout, arguments, 0])
          }
        });
        oYUIPOSTConf = a.merge(oYUIPOSTConf, {
          success: function () {
            a.fire("flickrAPI:success");
            return j.apply(p, [p.success, arguments, 1, 1])
          }, failure: function () {
            a.log("Your request (ID:" + arguments[0].tId + ") has failed.", "error", "flickrAPI");
            a.fire("flickrAPI:failure");
            return j.apply(p, [p.failure, arguments, 0, 1])
          }, timeout: function () {
            a.log("Your request (ID:" + arguments[0].tId + ") has timed out", "error", "flickrAPI");
            a.fire("flickrAPI:timeout");
            return j.apply(p, [p.timeout, arguments, 0, 1])
          }
        })
      }
      v.scope = a;
      var u = a.merge(v.data, n, t);
      v.data = u;
      o = s + "?" + f(u);
      if (r) {
        return {uri: s, params: u, full_url: o}
      } else {
        if (/(?:add|create|delete|edit|mute|post|record|remove|set|submit|unmute|move|sort|hide|block|unblock|insert|promote|login|cancel)[a-zA-Z]*$/.test(u.method) || o.length > a.config.maxURLLength) {
          u.nojsoncallback = 1;
          return m(s, u, oYUIPOSTConf)
        } else {
          return e(s, u, v)
        }
      }
    }
  }
}, "gallery-a-002", {requires: ["event"]});
YUI.add("sprintf", function (b) {
  function a(e, d) {
    for (var f = []; d > 0; f[--d] = e) {
    }
    return f.join("")
  }

  function c() {
    var h = 0, l, j = arguments[h++], e = [], g, d, k, n, q = "";
    while (j) {
      if (g = /^[^\x25]+/.exec(j)) {
        e.push(g[0])
      } else {
        if (g = /^\x25{2}/.exec(j)) {
          e.push("%")
        } else {
          if (g = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(j)) {
            if (((l = arguments[g[1] || h++]) == null) || (l == undefined)) {
              throw ("Too few arguments.")
            }
            if (/[^s]/.test(g[7]) && (typeof(l) != "number")) {
              throw ("Expecting number but found " + typeof(l))
            }
            switch (g[7]) {
              case"b":
                l = l.toString(2);
                break;
              case"c":
                l = String.fromCharCode(l);
                break;
              case"d":
                l = parseInt(l);
                break;
              case"e":
                l = g[6] ? l.toExponential(g[6]) : l.toExponential();
                break;
              case"f":
                l = g[6] ? parseFloat(l).toFixed(g[6]) : parseFloat(l);
                break;
              case"o":
                l = l.toString(8);
                break;
              case"s":
                l = ((l = String(l)) && g[6] ? l.substring(0, g[6]) : l);
                break;
              case"u":
                l = Math.abs(l);
                break;
              case"x":
                l = l.toString(16);
                break;
              case"X":
                l = l.toString(16).toUpperCase();
                break
            }
            l = (/[def]/.test(g[7]) && g[2] && l >= 0 ? "+" + l : l);
            k = g[3] ? g[3] == "0" ? "0" : g[3].charAt(1) : " ";
            n = g[5] - String(l).length - q.length;
            d = g[5] ? a(k, n) : "";
            e.push(q + (g[4] ? l + d : d + l))
          } else {
            throw ("sprintf failure")
          }
        }
      }
      j = j.substring(g[0].length)
    }
    return e.join("")
  }

  b.sprintf = c
}, "0.0.1");
YUI.add("transjax-base", function (d) {
  var a = {};

  function c(f, e) {
    if (!d.Lang.isObject(a[f])) {
      a[f] = {}
    }
    if (d.Lang.isObject(e)) {
      d.mix(a[f], e)
    }
  }

  function b() {
    var g, l, k, f, e, j;
    g = Array.prototype.slice.call(arguments);
    l = g.shift();
    k = g.shift();
    e = a[l];
    if (arguments.length > 1) {
      if (d.Lang.isObject(e)) {
        f = e[k]
      }
      if (d.Lang.isUndefined(f)) {
        return k
      }
      g.unshift(f);
      return d.sprintf.apply(window, g)
    } else {
      j = {};
      for (var h in e) {
        if (e.hasOwnProperty(h)) {
          j[h] = e[h]
        }
      }
      return j
    }
  }

  d.transjax = {add: c, get: b}
}, "0.0.1", {requires: ["sprintf"]});
YUI.add("global-dialog-transjax", function (a) {
  a.transjax.add("global-dialog", {button_confirm: 'OKAY', button_cancel: 'CANCEL'})
}, "0.0.1", {requires: ["transjax-base"]});
(function () {
  var a = "page-context";
  YUI.add(a, function (d) {
    var f = [""];

    function e(g) {
      if (f[f.length - 1] !== g) {
        f.push(g);
        d.fire("PageContext:set", {newVal: g, oldVal: f[f.length - 2] || ""});
        return true
      }
      return false
    }

    function c(h) {
      var j, g = f.length;
      for (j = g - 1; j > 0; j -= 1) {
        if (f[j] === h) {
          f.splice(j, 1);
          d.fire("PageContext:unset", {newVal: f[f.length - 1] || "", oldVal: h});
          return true
        }
      }
      return false
    }

    function b() {
      return f[f.length - 1]
    }

    d.PageContext = {set: e, unset: c, get: b}
  }, "0.0.1", {requires: F.config.modules[a].requires || [], optional: F.config.modules[a].optional || []})
}());
YUI.add("keyboard-shortcut-legend-transjax", function (a) {
  a.transjax.add("keyboard-shortcut-legend", {
    header_no_context: 'Keyboard shortcuts for this page',
    header_context: 'Keyboard shortcuts for this view',
    instructions: 'This dialog lists all of the keyboard shortcuts available on this particular page. Press any key on your keyboard to hear what it does.',
    enable_shortcuts: 'Enable keyboard shortcuts',
    saving: 'Saving...',
    saved: 'Saved!',
    unable_to_save: 'Unable to save',
    button_close: 'CLOSE',
    shortcut_description: 'Show all keyboard shortcuts',
    esc_description: 'Close a dialog, like this one',
    esc_description_screenreader: '(press escape again to close this dialog)',
    general: 'General',
    navigation: 'Navigation',
    lightbox: 'Light Box',
    map: 'Map',
    actions: 'Actions',
    you_can_reenable_shortcuts_in_prefs: 'You can always <a href="/account/prefs/shortcuts/?from=extend">re-enable keyboard shortcuts</a> later in your account settings, under Sharing &amp; Extending.',
    change_layout: 'change',
    qwerty_layout: 'QWERTY layout',
    spanish_layout: 'Spanish layout',
    qwertz_layout: 'QWERTZ layout',
    azerty_layout: 'AZERTY layout',
    dvorak_layout: 'Dvorak layout',
    spanish: 'Spanish',
    layout_selector_description: 'Select a keyboard layout',
    up_arrow: 'Up arrow',
    down_arrow: 'Down arrow',
    left_arrow: 'Left arrow',
    right_arrow: 'Right arrow'
  })
}, "0.0.1", {requires: F.config.modules["keyboard-shortcut-legend-transjax"].requires || []});
YUI.add("keyboard-shortcut-legend-layouts", function (e) {
  var d, c, f, b, a;
  d = [[{keyCode: 27, sub: "esc", sup: "", className: "esc"}, {sub: "F1", sup: "", className: "func"}, {
    sub: "F2",
    sup: "",
    className: "func"
  }, {sub: "F3", sup: "", className: "func"}, {sub: "F4", sup: "", className: "func"}, {
    sub: "F5",
    sup: "",
    className: "func"
  }, {sub: "F6", sup: "", className: "func"}, {sub: "F7", sup: "", className: "func"}, {
    sub: "F8",
    sup: "",
    className: "func"
  }, {sub: "F9", sup: "", className: "func"}, {sub: "F10", sup: "", className: "func"}, {
    sub: "F11",
    sup: "",
    className: "func"
  }, {sub: "F12", sup: "", className: "func"}, {sub: "F13", sup: "", className: "func"}], [{
    keyCode: 192,
    sub: "`",
    sup: "~"
  }, {keyCode: 49, sub: "1", sup: "!"}, {keyCode: 50, sub: "2", sup: "@"}, {
    keyCode: 51,
    sub: "3",
    sup: "#"
  }, {keyCode: 52, sub: "4", sup: "$"}, {keyCode: 53, sub: "5", sup: "%"}, {
    keyCode: 54,
    sub: "6",
    sup: "^"
  }, {keyCode: 55, sub: "7", sup: "&"}, {keyCode: 56, sub: "8", sup: "*"}, {
    keyCode: 57,
    sub: "9",
    sup: "("
  }, {keyCode: 48, sub: "0", sup: ")"}, {keyCode: 189, sub: "-", sup: "_"}, {
    keyCode: 187,
    sub: "=",
    sup: "+"
  }, {keyCode: 8, sub: "delete", sup: "", className: "delete"}], [{keyCode: 81, sub: "Q", sup: ""}, {
    keyCode: 87,
    sub: "W",
    sup: ""
  }, {keyCode: 69, sub: "E", sup: ""}, {keyCode: 82, sub: "R", sup: ""}, {keyCode: 84, sub: "T", sup: ""}, {
    keyCode: 89,
    sub: "Y",
    sup: ""
  }, {keyCode: 85, sub: "U", sup: ""}, {keyCode: 73, sub: "I", sup: ""}, {keyCode: 79, sub: "O", sup: ""}, {
    keyCode: 80,
    sub: "P",
    sup: ""
  }, {keyCode: 219, sub: "[", sup: "{"}, {keyCode: 221, sub: "]", sup: "}"}, {
    keyCode: 220,
    sub: "\\",
    sup: "|"
  }], [{keyCode: 65, sub: "A", sup: ""}, {keyCode: 83, sub: "S", sup: ""}, {
    keyCode: 68,
    sub: "D",
    sup: ""
  }, {keyCode: 70, sub: "F", sup: ""}, {keyCode: 71, sub: "G", sup: ""}, {keyCode: 72, sub: "H", sup: ""}, {
    keyCode: 74,
    sub: "J",
    sup: ""
  }, {keyCode: 75, sub: "K", sup: ""}, {keyCode: 76, sub: "L", sup: ""}, {
    keyCode: 186,
    sub: ";",
    sup: ":"
  }, {keyCode: 222, sub: "'", sup: '"'}, {keyCode: 13, sub: "return", sup: "", className: "return"}], [{
    keyCode: 90,
    sub: "Z",
    sup: ""
  }, {keyCode: 88, sub: "X", sup: ""}, {keyCode: 67, sub: "C", sup: ""}, {keyCode: 86, sub: "V", sup: ""}, {
    keyCode: 66,
    sub: "B",
    sup: ""
  }, {keyCode: 78, sub: "N", sup: ""}, {keyCode: 77, sub: "M", sup: ""}, {
    keyCode: 188,
    sub: ",",
    sup: "<"
  }, {keyCode: 190, sub: ".", sup: ">"}, {keyCode: 191, sub: "/", sup: "?"}, {
    keyCode: 16,
    sub: "shift",
    sup: "",
    className: "shift"
  }, {
    keyCode: 38,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "up_arrow") + "</span>&uarr;",
    sup: ""
  }], [{keyCode: 32, sub: "", sup: "", className: "space"}, {
    keyCode: 37,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "left_arrow") + "</span>&larr;",
    sup: ""
  }, {
    keyCode: 40,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "down_arrow") + "</span>&darr;",
    sup: ""
  }, {
    keyCode: 39,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "right_arrow") + "</span>&rarr;",
    sup: "",
    className: "right-arrow"
  }]];
  b = [[{keyCode: 27, sub: "esc", sup: "", className: "esc"}, {sub: "F1", sup: "", className: "func"}, {
    sub: "F2",
    sup: "",
    className: "func"
  }, {sub: "F3", sup: "", className: "func"}, {sub: "F4", sup: "", className: "func"}, {
    sub: "F5",
    sup: "",
    className: "func"
  }, {sub: "F6", sup: "", className: "func"}, {sub: "F7", sup: "", className: "func"}, {
    sub: "F8",
    sup: "",
    className: "func"
  }, {sub: "F9", sup: "", className: "func"}, {sub: "F10", sup: "", className: "func"}, {
    sub: "F11",
    sup: "",
    className: "func"
  }, {sub: "F12", sup: "", className: "func"}, {sub: "F13", sup: "", className: "func"}], [{
    sub: "<",
    sup: ">"
  }, {keyCode: 49, sub: "1", sup: "!"}, {keyCode: 50, sub: "2", sup: '"'}, {
    keyCode: 51,
    sub: "3",
    sup: "#"
  }, {keyCode: 52, sub: "4", sup: "$"}, {keyCode: 53, sub: "5", sup: "%"}, {
    keyCode: 54,
    sub: "6",
    sup: "&"
  }, {keyCode: 55, sub: "7", sup: "/"}, {keyCode: 56, sub: "8", sup: "("}, {
    keyCode: 57,
    sub: "9",
    sup: ")"
  }, {keyCode: 48, sub: "0", sup: "="}, {keyCode: 222, sub: "'", sup: "?"}, {sub: "¡", sup: "¿"}, {
    keyCode: 8,
    sub: "delete",
    sup: "",
    className: "delete"
  }], [{keyCode: 81, sub: "Q", sup: ""}, {keyCode: 87, sub: "W", sup: ""}, {
    keyCode: 69,
    sub: "E",
    sup: ""
  }, {keyCode: 82, sub: "R", sup: ""}, {keyCode: 84, sub: "T", sup: ""}, {keyCode: 89, sub: "Y", sup: ""}, {
    keyCode: 85,
    sub: "U",
    sup: ""
  }, {keyCode: 73, sub: "I", sup: ""}, {keyCode: 79, sub: "O", sup: ""}, {keyCode: 80, sub: "P", sup: ""}, {
    sub: "`",
    sup: "^"
  }, {keyCode: 107, sub: "+", sup: "*"}, {sub: "Ç", sup: ""}], [{keyCode: 65, sub: "A", sup: ""}, {
    keyCode: 83,
    sub: "S",
    sup: ""
  }, {keyCode: 68, sub: "D", sup: ""}, {keyCode: 70, sub: "F", sup: ""}, {keyCode: 71, sub: "G", sup: ""}, {
    keyCode: 72,
    sub: "H",
    sup: ""
  }, {keyCode: 74, sub: "J", sup: ""}, {keyCode: 75, sub: "K", sup: ""}, {keyCode: 76, sub: "L", sup: ""}, {
    sub: "Ñ",
    sup: ""
  }, {sub: "´", sup: "¨"}, {keyCode: 13, sub: "return", sup: "", className: "return"}], [{
    keyCode: 90,
    sub: "Z",
    sup: ""
  }, {keyCode: 88, sub: "X", sup: ""}, {keyCode: 67, sub: "C", sup: ""}, {keyCode: 86, sub: "V", sup: ""}, {
    keyCode: 66,
    sub: "B",
    sup: ""
  }, {keyCode: 78, sub: "N", sup: ""}, {keyCode: 77, sub: "M", sup: ""}, {
    keyCode: 188,
    sub: ",",
    sup: ";"
  }, {keyCode: 190, sub: ".", sup: ":"}, {keyCode: 109, sub: "-", sup: "_"}, {
    keyCode: 16,
    sub: "shift",
    sup: "",
    className: "shift"
  }, {
    keyCode: 38,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "up_arrow") + "</span>&uarr;",
    sup: ""
  }], [{keyCode: 32, sub: "", sup: "", className: "space"}, {
    keyCode: 37,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "left_arrow") + "</span>&larr;",
    sup: ""
  }, {
    keyCode: 40,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "down_arrow") + "</span>&darr;",
    sup: ""
  }, {
    keyCode: 39,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "right_arrow") + "</span>&rarr;",
    sup: "",
    className: "right-arrow"
  }]];
  c = [[{keyCode: 27, sub: "esc", sup: "", className: "esc"}, {sub: "F1", sup: "", className: "func"}, {
    sub: "F2",
    sup: "",
    className: "func"
  }, {sub: "F3", sup: "", className: "func"}, {sub: "F4", sup: "", className: "func"}, {
    sub: "F5",
    sup: "",
    className: "func"
  }, {sub: "F6", sup: "", className: "func"}, {sub: "F7", sup: "", className: "func"}, {
    sub: "F8",
    sup: "",
    className: "func"
  }, {sub: "F9", sup: "", className: "func"}, {sub: "F10", sup: "", className: "func"}, {
    sub: "F11",
    sup: "",
    className: "func"
  }, {sub: "F12", sup: "", className: "func"}, {sub: "F13", sup: "", className: "func"}], [{
    sub: "^",
    sup: "˚"
  }, {keyCode: 49, sub: "1", sup: "!"}, {keyCode: 50, sub: "2", sup: '"'}, {
    keyCode: 51,
    sub: "3",
    sup: "§"
  }, {keyCode: 52, sub: "4", sup: "$"}, {keyCode: 53, sub: "5", sup: "%"}, {
    keyCode: 54,
    sub: "6",
    sup: "&"
  }, {keyCode: 55, sub: "7", sup: "/"}, {keyCode: 56, sub: "8", sup: "("}, {
    keyCode: 57,
    sub: "9",
    sup: ")"
  }, {keyCode: 48, sub: "0", sup: "="}, {keyCode: 191, sub: "ß", sup: "?"}, {sub: "´", sup: "`"}, {
    keyCode: 8,
    sub: "delete",
    sup: "",
    className: "delete"
  }], [{keyCode: 81, sub: "Q", sup: "@"}, {keyCode: 87, sub: "W", sup: ""}, {
    keyCode: 69,
    sub: "E",
    sup: "€"
  }, {keyCode: 82, sub: "R", sup: ""}, {keyCode: 84, sub: "T", sup: ""}, {keyCode: 90, sub: "Z", sup: ""}, {
    keyCode: 85,
    sub: "U",
    sup: ""
  }, {keyCode: 73, sub: "I", sup: ""}, {keyCode: 79, sub: "O", sup: ""}, {keyCode: 80, sub: "P", sup: ""}, {
    sub: "Ü",
    sup: ""
  }, {keyCode: 107, sub: "+", sup: "*"}, {keyCode: 13, sub: "return", sup: "", className: "return-top"}, {
    keyCode: 13,
    sub: "",
    sup: "",
    className: "return-middle"
  }], [{keyCode: 65, sub: "A", sup: ""}, {keyCode: 83, sub: "S", sup: ""}, {
    keyCode: 68,
    sub: "D",
    sup: ""
  }, {keyCode: 70, sub: "F", sup: ""}, {keyCode: 71, sub: "G", sup: ""}, {keyCode: 72, sub: "H", sup: ""}, {
    keyCode: 74,
    sub: "J",
    sup: ""
  }, {keyCode: 75, sub: "K", sup: ""}, {keyCode: 76, sub: "L", sup: ""}, {sub: "Ö", sup: ""}, {
    sub: "Ä",
    sup: ""
  }, {sub: "#", sup: "'"}, {keyCode: 13, sub: "", sup: "", className: "return"}], [{sub: "<", sup: ">"}, {
    keyCode: 89,
    sub: "Y",
    sup: ""
  }, {keyCode: 88, sub: "X", sup: ""}, {keyCode: 67, sub: "C", sup: ""}, {keyCode: 86, sub: "V", sup: ""}, {
    keyCode: 66,
    sub: "B",
    sup: ""
  }, {keyCode: 78, sub: "N", sup: ""}, {keyCode: 77, sub: "M", sup: ""}, {
    keyCode: 188,
    sub: ",",
    sup: ";"
  }, {keyCode: 190, sub: ".", sup: ":"}, {keyCode: 109, sub: "_", sup: "-"}, {
    keyCode: 16,
    sub: "shift",
    sup: "",
    className: "shift"
  }, {
    keyCode: 38,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "up_arrow") + "</span>&uarr;",
    sup: ""
  }], [{keyCode: 32, sub: "", sup: "", className: "space"}, {
    keyCode: 37,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "left_arrow") + "</span>&larr;",
    sup: ""
  }, {
    keyCode: 40,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "down_arrow") + "</span>&darr;",
    sup: ""
  }, {
    keyCode: 39,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "right_arrow") + "</span>&rarr;",
    sup: "",
    className: "right-arrow"
  }]];
  f = [[{keyCode: 27, sub: "esc", sup: "", className: "esc"}, {sub: "F1", sup: "", className: "func"}, {
    sub: "F2",
    sup: "",
    className: "func"
  }, {sub: "F3", sup: "", className: "func"}, {sub: "F4", sup: "", className: "func"}, {
    sub: "F5",
    sup: "",
    className: "func"
  }, {sub: "F6", sup: "", className: "func"}, {sub: "F7", sup: "", className: "func"}, {
    sub: "F8",
    sup: "",
    className: "func"
  }, {sub: "F9", sup: "", className: "func"}, {sub: "F10", sup: "", className: "func"}, {
    sub: "F11",
    sup: "",
    className: "func"
  }, {sub: "F12", sup: "", className: "func"}, {sub: "F13", sup: "", className: "func"}], [{
    sub: "2",
    sup: "",
    className: "small-text"
  }, {keyCode: 49, sub: "1", sup: "&"}, {keyCode: 50, sub: "2", sup: "é"}, {
    keyCode: 51,
    sub: "3",
    sup: '"'
  }, {keyCode: 52, sub: "4", sup: "'"}, {keyCode: 53, sub: "5", sup: "("}, {
    keyCode: 54,
    sub: "6",
    sup: "-"
  }, {keyCode: 55, sub: "7", sup: "è"}, {keyCode: 56, sub: "8", sup: "_"}, {
    keyCode: 57,
    sub: "9",
    sup: "ç"
  }, {keyCode: 48, sub: "0", sup: "à"}, {sub: "˚", sup: ")"}, {keyCode: 109, sub: "+", sup: "="}, {
    keyCode: 8,
    sub: "delete",
    sup: "",
    className: "delete"
  }], [{keyCode: 65, sub: "A", sup: ""}, {keyCode: 90, sub: "Z", sup: ""}, {
    keyCode: 69,
    sub: "E",
    sup: "€"
  }, {keyCode: 82, sub: "R", sup: ""}, {keyCode: 84, sub: "T", sup: ""}, {keyCode: 89, sub: "Y", sup: ""}, {
    keyCode: 85,
    sub: "U",
    sup: ""
  }, {keyCode: 73, sub: "I", sup: ""}, {keyCode: 79, sub: "O", sup: ""}, {keyCode: 80, sub: "P", sup: ""}, {
    sub: "¨",
    sup: "^"
  }, {sub: "$", sup: "£"}, {keyCode: 13, sub: "return", sup: "", className: "return-top"}, {
    keyCode: 13,
    sub: "",
    sup: "",
    className: "return-middle"
  }], [{keyCode: 81, sub: "Q", sup: ""}, {keyCode: 83, sub: "S", sup: ""}, {
    keyCode: 68,
    sub: "D",
    sup: ""
  }, {keyCode: 70, sub: "F", sup: ""}, {keyCode: 71, sub: "G", sup: ""}, {keyCode: 72, sub: "H", sup: ""}, {
    keyCode: 74,
    sub: "J",
    sup: ""
  }, {keyCode: 75, sub: "K", sup: ""}, {keyCode: 76, sub: "L", sup: ""}, {keyCode: 77, sub: "M", sup: ""}, {
    sub: "ù",
    sup: "%"
  }, {sub: "*", sup: "µ"}, {keyCode: 13, sub: "", sup: "", className: "return"}], [{sub: "<", sup: ">"}, {
    keyCode: 87,
    sub: "W",
    sup: ""
  }, {keyCode: 88, sub: "X", sup: ""}, {keyCode: 67, sub: "C", sup: ""}, {keyCode: 86, sub: "V", sup: ""}, {
    keyCode: 66,
    sub: "B",
    sup: ""
  }, {keyCode: 78, sub: "N", sup: ""}, {keyCode: 188, sub: ",", sup: "?"}, {
    keyCode: 59,
    sub: ";",
    sup: "."
  }, {keyCode: 191, sub: ":", sup: "/"}, {sub: "!", sup: "§"}, {
    keyCode: 16,
    sub: "shift",
    sup: "",
    className: "shift"
  }, {
    keyCode: 38,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "up_arrow") + "</span>&uarr;",
    sup: ""
  }], [{keyCode: 32, sub: "", sup: "", className: "space"}, {
    keyCode: 37,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "left_arrow") + "</span>&larr;",
    sup: ""
  }, {
    keyCode: 40,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "down_arrow") + "</span>&darr;",
    sup: ""
  }, {
    keyCode: 39,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "right_arrow") + "</span>&rarr;",
    sup: "",
    className: "right-arrow"
  }]];
  a = [[{keyCode: 27, sub: "esc", sup: "", className: "esc"}, {sub: "F1", sup: "", className: "func"}, {
    sub: "F2",
    sup: "",
    className: "func"
  }, {sub: "F3", sup: "", className: "func"}, {sub: "F4", sup: "", className: "func"}, {
    sub: "F5",
    sup: "",
    className: "func"
  }, {sub: "F6", sup: "", className: "func"}, {sub: "F7", sup: "", className: "func"}, {
    sub: "F8",
    sup: "",
    className: "func"
  }, {sub: "F9", sup: "", className: "func"}, {sub: "F10", sup: "", className: "func"}, {
    sub: "F11",
    sup: "",
    className: "func"
  }, {sub: "F12", sup: "", className: "func"}, {sub: "F13", sup: "", className: "func"}], [{
    keyCode: 192,
    sub: "`",
    sup: "~"
  }, {keyCode: 49, sub: "1", sup: "!"}, {keyCode: 50, sub: "2", sup: "@"}, {
    keyCode: 51,
    sub: "3",
    sup: "#"
  }, {keyCode: 52, sub: "4", sup: "$"}, {keyCode: 53, sub: "5", sup: "%"}, {
    keyCode: 54,
    sub: "6",
    sup: "^"
  }, {keyCode: 55, sub: "7", sup: "&"}, {keyCode: 56, sub: "8", sup: "*"}, {
    keyCode: 57,
    sub: "9",
    sup: "("
  }, {keyCode: 48, sub: "0", sup: ")"}, {keyCode: 219, sub: "[", sup: "{"}, {
    keyCode: 221,
    sub: "]",
    sup: "}"
  }, {keyCode: 8, sub: "delete", sup: "", className: "delete"}], [{keyCode: 222, sub: "'", sup: '"'}, {
    keyCode: 188,
    sub: ",",
    sup: "<"
  }, {keyCode: 190, sub: ".", sup: ">"}, {keyCode: 80, sub: "P", sup: ""}, {
    keyCode: 89,
    sub: "Y",
    sup: ""
  }, {keyCode: 70, sub: "F", sup: ""}, {keyCode: 71, sub: "G", sup: ""}, {keyCode: 67, sub: "C", sup: ""}, {
    keyCode: 82,
    sub: "R",
    sup: ""
  }, {keyCode: 76, sub: "L", sup: ""}, {keyCode: 191, sub: "/", sup: "?"}, {
    keyCode: 187,
    sub: "=",
    sup: "+"
  }, {keyCode: 220, sub: "\\", sup: "|"}], [{keyCode: 65, sub: "A", sup: ""}, {
    keyCode: 79,
    sub: "O",
    sup: ""
  }, {keyCode: 69, sub: "E", sup: ""}, {keyCode: 85, sub: "U", sup: ""}, {keyCode: 73, sub: "I", sup: ""}, {
    keyCode: 68,
    sub: "D",
    sup: ""
  }, {keyCode: 72, sub: "H", sup: ""}, {keyCode: 84, sub: "T", sup: ""}, {keyCode: 78, sub: "N", sup: ""}, {
    keyCode: 83,
    sub: "S",
    sup: ""
  }, {keyCode: 189, sub: "-", sup: "_"}, {keyCode: 13, sub: "return", sup: "", className: "return"}], [{
    keyCode: 186,
    sub: ";",
    sup: ":"
  }, {keyCode: 81, sub: "Q", sup: ""}, {keyCode: 74, sub: "J", sup: ""}, {keyCode: 75, sub: "K", sup: ""}, {
    keyCode: 88,
    sub: "X",
    sup: ""
  }, {keyCode: 66, sub: "B", sup: ""}, {keyCode: 77, sub: "M", sup: ""}, {keyCode: 87, sub: "W", sup: ""}, {
    keyCode: 86,
    sub: "V",
    sup: ""
  }, {keyCode: 90, sub: "Z", sup: ""}, {keyCode: 16, sub: "shift", sup: "", className: "shift"}, {
    keyCode: 38,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "up_arrow") + "</span>&uarr;",
    sup: ""
  }], [{keyCode: 32, sub: "", sup: "", className: "space"}, {
    keyCode: 37,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "left_arrow") + "</span>&larr;",
    sup: ""
  }, {
    keyCode: 40,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "down_arrow") + "</span>&darr;",
    sup: ""
  }, {
    keyCode: 39,
    sub: '<span class="obscured">' + e.transjax.get("keyboard-shortcut-legend", "right_arrow") + "</span>&rarr;",
    sup: "",
    className: "right-arrow"
  }]];
  e.keyboardShortcutLegendLayouts = {qwerty: d, spanish: b, qwertz: c, azerty: f, dvorak: a}
}, "0.0.1", {
  requires: F.config.modules["keyboard-shortcut-legend-layouts"].requires || [],
  optional: F.config.modules["keyboard-shortcut-legend-layouts"].optional || []
});
YUI.add("keyboard-shortcut-manager", function (c) {
  var j = [], e, i = false, a = c.UA, g = false, h, d;
  d = {altKey: false, ctrlKey: false, shiftKey: false, metaKey: false};
  function k(p) {
    var o = c.merge(d, {}), n = true;
    if (!i) {
      return
    }
    e = c.PageContext.get();
    if (c.focusTracker.isInput()) {
      return
    } else {
      if (p.altKey) {
        o.altKey = true
      }
      if (p.ctrlKey) {
        o.ctrlKey = true
      }
      if (p.metaKey) {
        o.metaKey = true
      }
      if (p.shiftKey) {
        o.shiftKey = true
      }
      if (j[p.keyCode]) {
        c.Object.each(j[p.keyCode], function (s, r, q) {
          n = true;
          c.Object.each(s.modifiers, function (u, t, v) {
            if (n && u !== o[t]) {
              n = false
            }
          });
          if (n && (s.context[0] === "*" || c.Array.indexOf(s.context, e) > -1)) {
            s.handler.call(s.scope, p)
          }
        }, this)
      }
    }
  }

  function l(s, z, n, A, x) {
    var r, w, q, u, p, v, t, y;
    if (typeof arguments[0] === "object") {
      r = arguments[0];
      w = r.legend;
      s = r.keystring;
      z = r.handler;
      n = r.context;
      A = r.scope;
      x = r.modifiers
    }
    x = c.merge(d, x);
    if (c.Lang.isString(n)) {
      n = [n]
    }
    if (!g) {
      m()
    }
    q = s.split(",");
    u = q.length;
    p = A || window;
    v = c.guid();
    if (F && F.keyListener) {
      F.keyListener.detach(q)
    }
    for (t = 0; t < u; t++) {
      y = parseInt(q[t], 10);
      if (!j[y]) {
        j[y] = {}
      }
      j[y][v] = {handler: z, context: n, modifiers: x, scope: p}
    }
    if (c.config.flickr.flags.enable_keyboard_shortcut_legend && c.keyboardShortcutLegend && c.keyboardShortcutLegend.register && w) {
      c.Array.each(n, function (o) {
        var B = c.clone(w, true);
        B.keyCodes = q;
        B.context = o;
        c.keyboardShortcutLegend.register(B)
      })
    }
    return {
      detach: function () {
        for (t = 0; t < u; t++) {
          y = parseInt(q[t], 10);
          if (j[y] && j[y][v]) {
            j[y][v] = undefined;
            delete j[y][v]
          }
        }
      }
    }
  }

  function b() {
    h = c.on("key", k, "html", "down:")
  }

  function f() {
    if (c.keyboardShortcutLegend && c.keyboardShortcutLegend.show) {
      l({keystring: "191,109", handler: c.keyboardShortcutLegend.show, context: "*"});
      l({keystring: "191", handler: c.keyboardShortcutLegend.show, context: "*", modifiers: {shiftKey: true}})
    }
  }

  function m() {
    if (F && F.keyListener) {
      if (F.keyListener.enabled && c.config.flickr.flags.enable_keyboard_shortcuts) {
        i = true
      } else {
        i = false
      }
    } else {
      if ((a.gecko || a.webkit > 531 || a.ie > 7 || a.opera > 11) && c.config.flickr.flags.enable_keyboard_shortcuts) {
        i = true
      }
    }
    if (i) {
      b()
    }
    g = true;
    if (i && c.config.flickr.flags.enable_keyboard_shortcut_legend) {
      f()
    }
  }

  c.keyboardShortcutManager = {
    register: l, isEnabled: function () {
      return i
    }, disable: function () {
      i = false;
      c.config.flickr.flags.enable_keyboard_shortcuts = false
    }, enable: function () {
      i = true;
      c.config.flickr.flags.enable_keyboard_shortcuts = true
    }, destroy: function () {
      i = false;
      g = false;
      if (h) {
        h.detach()
      }
    }
  }
}, "0.0.1", {requires: F.config.modules["keyboard-shortcut-manager"].requires});
YUI.add("global-dialog", function (b) {
  var a = function () {
    var c = this, e = (b.UA.ie && (b.UA.ie < 7 || (typeof document.documentMode !== "undefined" ? document.documentMode === 5 : false) || !document.compatMode.match(/css1compat/i))) || (navigator.userAgent.match(/(ipod|ipad|iphone)/i && navigator.userAgent.match(/Version\/[1234]\s/i))), d = "global_dialog", f = (b.UA.ie && b.UA.ie < 7);
    this.spinner = null;
    this.is_modal = false;
    this.events_on = false;
    this.o_shadows = null;
    this.is_showing = false;
    this.style = (typeof b.config !== "undefined" && typeof b.config.flickr !== "undefined" && !b.config.flickr.is_zeus ? "style_2009" : "default");
    this.last_style = null;
    this.on_escape_handler = null;
    this.esc_to_close = true;
    this.o = null;
    this.o_container = null;
    this.o_cover = null;
    this.timestamp = null;
    this.get_elements = function () {
      if (!c.o_cover) {
        c.o_cover = b.one("#global-dialog-background")
      }
      if (!c.o || !c.o_container) {
        c.o = b.one("#" + d);
        if (!c.o) {
          return false
        } else {
          c.o_container = c.o.one("div.global_dialog_container");
          if (c.o) {
            c.o_shadows = {left: b.one("div.shadow_l"), right: b.one("div.shadow_r")};
            return true
          }
        }
      } else {
        return true
      }
    };
    this.reposition = function () {
      var h, g, i;
      if (e) {
        if (window.innerWidth) {
          g = window.pageXOffset;
          i = window.pageYOffset
        } else {
          g = document.body.scrollLeft;
          i = document.body.scrollTop
        }
      }
      if (!c.get_elements()) {
        if (e) {
          if (c.spinner) {
            c.spinner.style.top = (i + parseInt((document.documentElement.clientHeight || document.body.clientHeight) / 2, 10) + "px")
          }
          c.position_cover()
        }
        return false
      }
      h = parseInt(c.o_container.get("offsetHeight"), 10);
      if (h && c.o_shadows && c.o_shadows.left && c.o_shadows.right) {
        c.o_shadows.left.setStyle("height", (h + "px"));
        c.o_shadows.right.setStyle("height", (h + "px"))
      }
      c.o.setStyle("marginLeft", -(c.o.get("offsetWidth") / 2) + "px");
      c.o.setStyle("marginTop", -(c.o.get("offsetHeight") / 2) + "px");
      c.o.setStyle("left", "50%");
      c.o.setStyle("top", "50%");
      if (e) {
        c.o.setStyle("top", (i + parseInt((document.documentElement.clientHeight || document.body.clientHeight) / 2, 10) + "px"))
      }
    };
    this.show = function (g) {
      if (typeof g !== "undefined" && typeof g.loading !== "undefined") {
        c.set_loading(g.loading ? true : false)
      }
      if (!c.get_elements()) {
        return false
      }
      if (g && g.esc_to_close === false) {
        this.esc_to_close = false
      } else {
        this.esc_to_close = true
      }
      if (typeof g !== "undefined") {
        if ((typeof g.modal === "undefined") || (typeof g.modal !== "undefined" && g.modal !== false)) {
          c.set_modal(true)
        } else {
          c.set_modal(false)
        }
        if (typeof g.style !== "undefined") {
          c.set_style(g.style)
        } else {
          c.set_style(c.style)
        }
        if (typeof g.width !== "undefined") {
          c.set_width(g.width)
        }
        c.set_short_message_style((typeof g.short_message !== "undefined" && g.short_message))
      } else {
        c.set_modal(true)
      }
      if (!c.is_showing) {
        if (g && typeof g.left !== "undefined") {
          c.o.setStyle("left", g.left);
          c.o.setStyle("top", g.top);
          c.o.setStyle("display", "block");
          c.is_showing = true
        } else {
          c.o.setStyle("left", "-9999px");
          c.o.setStyle("top", "-9999px");
          c.o.setStyle("display", "block");
          c.reposition();
          c.is_showing = true
        }
      }
    };
    this.hide = function (g) {
      if (b.focusTracker && b.focusTracker.isInput()) {
        b.focusTracker.blur()
      }
      c.set_modal();
      if (e) {
        c.detach_events()
      }
      c.detach_key_events();
      if (g && g.loading) {
        c.set_loading(true)
      } else {
        c.set_loading(false)
      }
      if (!c.get_elements()) {
        return false
      }
      if (c.is_showing) {
        c.o.setStyle("display", "none");
        c.is_showing = false
      }
      c.on_escape_handler = null;
      if (c.modal_remove_handler && c.modal_remove_handler.detach) {
        c.modal_remove_handler.detach()
      }
      if (c.modal_remove_key_handler && c.modal_remove_key_handler.detach) {
        c.modal_remove_key_handler.detach()
      }
    };
    this.set_width = function (g) {
      if (!c.get_elements()) {
        return false
      }
      if (g) {
        c.o.setStyle("width", "auto");
        c.o_container.setStyle("width", g + (g === "auto" ? "" : "px"))
      } else {
        c.o.setStyle("width", "auto");
        c.o_container.setStyle("width", (b.UA.ie && b.UA.ie < 7 ? "334px" : "320px"))
      }
      c.reposition()
    };
    this.set_style = function (g) {
      if (!c.get_elements()) {
        return false
      }
      if (c.last_style) {
        c.o.removeClass(c.last_style)
      }
      if (g) {
        c.o.addClass(g)
      }
      c.last_style = g;
      c.reposition()
    };
    this.set_short_message_style = function (g) {
      c.use_short_message_style = g;
      if (!c.get_elements()) {
        return false
      }
      c.o.removeClass("style_2009");
      if (g) {
        c.o.removeClass("global_dialog");
        c.o.addClass("global-dialog-short-msg");
        if (c.is_modal) {
          c.modal_remove_handler = c.o_cover.once("click", function () {
            c.hide()
          });
          c.modal_remove_key_handler = b.once("key", function () {
            if (!b.keyboardShortcutManager.isEnabled()) {
              return
            }
            if (!this.esc_to_close) {
              return
            }
            if (b.PageContext) {
              b.PageContext.unset(b.PageContext.get())
            }
            c.hide()
          }, window, "down:13,27")
        }
      } else {
        c.o.removeClass("global-dialog-short-msg");
        c.o.addClass("global_dialog")
      }
      c.reposition()
    };
    this.set_spinner = function (g) {
      if (g) {
        if (!c.spinner) {
          c.spinner = document.createElement("div");
          c.spinner.className = "global_dialog_spinner";
          document.body.appendChild(c.spinner);
          if (e) {
            c.position_cover()
          }
        }
        c.spinner.style.display = "block"
      } else {
        if (c.spinner) {
          c.spinner.style.display = "none"
        }
      }
    };
    this.set_modal = function (g) {
      c.is_modal = g;
      if (!c.o_cover) {
        return false
      }
      if (g) {
        if (e) {
          c.o_cover.setStyle("position", "absolute");
          c.position_cover();
          c.attach_events()
        } else {
          c.o_cover.setStyle("position", "fixed")
        }
        c.attach_key_events();
        var h = 35;
        c.o_cover.setStyle("backgroundColor", "#000");
        c.o_cover.setStyle("opacity", h / 100);
        c.o_cover.setStyle("MozOpacity", h / 100);
        c.o_cover.setStyle("filter", "alpha(opacity=" + h + ")");
        c.o_cover.setStyle("display", "block")
      } else {
        c.o_cover.setStyle("position", "absolute");
        c.o_cover.setStyle("display", "none");
        c.detach_events();
        c.detach_key_events()
      }
    };
    this.set_loading = function (g) {
      if (!c.o_cover) {
        return false
      }
      if (g) {
        c.set_spinner(g);
        c.o_cover.removeClass("loaded");
        c.o_cover.addClass("loading");
        if (!c.is_modal) {
          c.set_modal(true)
        }
      } else {
        c.set_spinner(g);
        c.o_cover.removeClass("loading");
        c.o_cover.addClass("loaded");
        if (c.is_modal) {
          c.set_modal(false)
        }
      }
    };
    this.set_aria = function (g) {
      if (!g || typeof g !== "object") {
        return
      }
      if (g["aria-labelledby"]) {
        c.o.setAttribute("aria-labelledby", g["aria-labelledby"])
      }
      if (g["aria-describedby"]) {
        c.o.setAttribute("aria-describedby", g["aria-describedby"])
      }
    };
    this.remove_existing_dialog = function () {
      if (c.o) {
        try {
          c.o._node.parentNode.removeChild(c.o._node);
          c.o = null;
          return true
        } catch (g) {
          return false
        }
      }
    };
    this.create_dialog = function (j, h) {
      if (c.o) {
        c.remove_existing_dialog();
        c.o = null
      }
      c.timestamp = (new Date()).getTime();
      c.last_style = null;
      c.is_showing = false;
      var i = document.createElement("div");
      document.body.appendChild(i);
      c.o = b.one(i);
      c.o.set("id", "global_dialog");
      c.o.set("className", "global_dialog");
      c.o.setAttribute("role", "dialog");
      var g = "";
      if (b.config.flickr.flags.enable_global_dialog_maximizer) {
        b.log("assign maximizer handler");
        c.o.on("click", function (k) {
          if (k.target.test(".global-dialog-admin-maximizer a")) {
            k.preventDefault();
            c.o.addClass("global-dialog-maximized")
          }
        });
        g = '<div class="global-dialog-admin-maximizer">admins only: <a href="#">maximize global dialog</a></div>'
      }
      c.o.set("innerHTML", '<div id="global-dialog-container" class="global_dialog_container"><div class="wrapper">' + j + "</div>" + g + "</div>");
      c.o_container = null;
      c.get_elements();
      if (h && h.style) {
        c.set_style(h.style)
      } else {
        c.set_style(c.style)
      }
      if (h && h.width) {
        c.set_width(h.width)
      } else {
        c.set_width()
      }
      return c
    };
    this.create_confirmation_dialog = function (h, s, p) {
      var n, q, o, i, j, g, m, t, l, r, k;
      if (b.Lang.isObject(h)) {
        n = b.Lang.isString(h.hd) ? h.hd : "";
        q = b.Lang.isString(h.bd) ? h.bd : "";
        o = b.Lang.isString(h.ft) ? h.ft : ""
      } else {
        q = b.Lang.isString(h) ? h : ""
      }
      i = {
        CONFIRM: b.transjax.get("global-dialog", "button_confirm"),
        CANCEL: b.transjax.get("global-dialog", "button_cancel"),
        width: 330,
        loading: false,
        modal: true,
        confirm_butt_class: "Butt",
        cancel_butt_class: "CancelButt",
        checkboxes: [],
        photo: {},
        scope: window
      };
      if (!b.Lang.isObject(p)) {
        p = {}
      }
      i = b.mix(p, i);
      t = b.guid();
      l = b.guid();
      j = "";
      if (i.photo && i.photo.url) {
        j = '<div class="photo_container"><img src="' + i.photo.url + '"' + (i.photo.width ? ' width="' + i.photo.width + '"' : "") + (i.photo.height ? ' height="' + i.photo.height + '"' : "") + "></div>"
      }
      g = "";
      if (i.checkboxes.length) {
        b.Array.each(i.checkboxes, function (u) {
          g += '<div><label><input type="checkbox">&nbsp; ' + u + "</label></div>"
        })
      }
      k = ' <input type="button" class="' + i.confirm_butt_class + '" value="' + i.CONFIRM + '" id="' + t + '">';
      if (i.confirm_butt_class === "BigAssButt") {
        k = ' <a href="#" class="' + i.confirm_butt_class + '" id="' + t + '"><span></span>' + i.CONFIRM + "</a>"
      }
      m = (n ? '<div class="hd">' + n + "</div>" : "") + '<div class="bd">' + q + j + g + '</div><div class="bd button_container confirmation_button_container">' + k + ' <input type="button" class="' + i.cancel_butt_class + '" value="' + i.CANCEL + '" id="' + l + '"></div>' + (o ? '<div class="ft">' + o + "</div>" : "");
      b.global_dialog.remove_existing_dialog();
      b.global_dialog.create_dialog(m, i).show(i);
      r = b.delegate("click", function (v) {
        var w, u;
        w = (v.target.get("id") === t);
        u = {};
        if (i.checkboxes.length) {
          u.checkboxes = [];
          c.o_container.all('input[type="checkbox"]').each(function (x) {
            u.checkboxes.push(x.get("checked"))
          })
        }
        b.global_dialog.hide();
        if (b.Lang.isFunction(s)) {
          s.apply(i.scope, [w, u])
        }
        v.preventDefault();
        r.detach()
      }, c.o_container, '.button_container input[type="button"], .button_container a.BigAssButt')
    };
    this.create_alert_dialog = function (l, m, k) {
      var h, j, i, g;
      h = {CONFIRM: b.transjax.get("global-dialog", "button_confirm"), width: 330, loading: false, modal: true};
      if (!b.Lang.isObject(k)) {
        k = {}
      }
      h = b.mix(k, h);
      i = b.guid();
      j = '<div class="hd">' + l + '</div><div class="bd button_container"> <input type="button" class="Butt" value="' + h.CONFIRM + '" id="' + i + '"></div>';
      b.global_dialog.remove_existing_dialog();
      b.global_dialog.create_dialog(j, h).show(h);
      b.delegate("click", function () {
        b.global_dialog.hide();
        if (b.Lang.isFunction(m)) {
          m.apply(window, [true])
        }
      }, this.o_container, "#" + i)
    };
    this.position_cover = function (h) {
      var g, i;
      if (!h) {
        h = b.one(c.o_cover)
      }
      c.get_elements();
      if (h) {
        if (window.innerWidth) {
          g = window.pageXOffset;
          i = window.pageYOffset
        } else {
          g = document.body.scrollLeft;
          i = document.body.scrollTop
        }
        h.setStyle("width", "100%");
        h.setStyle("height", (b.one("body").get("offsetHeight")) + "px");
        h.setStyle("top", i + "px");
        h.setStyle("left", g + "px")
      }
    };
    this.legacy_resize_handler = function () {
      c.reposition();
      c.position_cover()
    };
    this.legacy_scroll_handler = function () {
      c.reposition();
      c.position_cover()
    };
    this.key_handler = function (h) {
      if (!b.keyboardShortcutManager.isEnabled()) {
        return
      }
      var g = h.which || h.keyCode;
      if (g === 27) {
        if (!this.esc_to_close) {
          return
        }
        if (b.PageContext) {
          b.PageContext.unset(b.PageContext.get())
        }
        c.hide()
      }
    };
    this.attach_events = function () {
      if (c.events_on) {
        return false
      }
      c.events_on = true;
      if (!b.UA.ios) {
        c.resize_event_handle = b.on("resize", c.legacy_resize_handler, window, c, true);
        c.scroll_event_handle = b.on("scroll", c.legacy_scroll_handler, window, c, true)
      }
    };
    this.attach_key_events = function () {
      c.key_event_handle = b.on("key", c.key_handler, window, "up:27", c, true)
    };
    this.detach_events = function () {
      if (!c.events_on) {
        return false
      }
      c.events_on = false;
      if (c.resize_event_handle) {
        c.resize_event_handle.detach()
      }
      if (c.scroll_event_handle) {
        c.scroll_event_handle.detach()
      }
    };
    this.detach_key_events = function () {
      if (c.key_event_handle) {
        c.key_event_handle.detach()
      }
    };
    this.get_elements()
  };
  b.global_dialog = new a()
}, "0.0.1", {
  requires: F.config.modules["global-dialog"].requires || [],
  optional: F.config.modules["global-dialog"].optional || []
});
YUI.add("keyboard-shortcut-legend", function (c) {
  var m = false, N = "keyboard-shortcut-legend", L, E = {}, o = false, C = false, f, w, d = 2000, x = "keylayout", B, y, t, i, G, s, H, P = 0, U = true, q = false, v, r = 890, b = 584, A = [], k = [c.transjax.get("keyboard-shortcut-legend", "navigation"), c.transjax.get("keyboard-shortcut-legend", "actions"), c.transjax.get("keyboard-shortcut-legend", "lightbox"), c.transjax.get("keyboard-shortcut-legend", "map"), c.transjax.get("keyboard-shortcut-legend", "general")];

  function R() {
    c.all(".keyboard-shortcut-legend-trigger").on("click", J);
    B = c.Cookie.get(x) || u();
    m = true
  }

  function u() {
    var V = "qwerty";
    if (c.config.flickr.flags.enable_keyboard_shortcut_legend_keyboard_layouts) {
      if (c.config.flickr.lang === "de-de") {
        V = "qwertz"
      } else {
        if (c.config.flickr.lang === "fr-fr") {
          V = "azerty"
        } else {
          if (c.config.flickr.lang === "es-us") {
            V = "spanish"
          }
        }
      }
    }
    return V
  }

  function J(X) {
    var W = c.PageContext.get(), V = {};
    if (o) {
      O(X);
      return
    }
    y = c.keyboardShortcutLegendLayouts[B];
    if (W !== "" && W !== "lightbox" && W !== "flickrMap") {
      c.PageContext.unset(W);
      W = c.PageContext.get()
    }
    c.Array.each(A, function (Y, Z) {
      if (Y.context === W || Y.context === "*") {
        c.Array.each(k, function (ab, aa) {
          if (Y.group === ab) {
            if (!V[ab]) {
              V[ab] = []
            }
            V[ab].push(Y)
          }
        })
      }
    });
    c.Array.each(k, function (Z, Y) {
      if (V[Z]) {
        V[Z].sort(K)
      }
    });
    if (E[W + B]) {
      L = E[W + B]
    } else {
      L = '<div class="hd keyboard-shortcut-legend-hd"><h2 id="keyboard-shortcut-legend-header">' + c.transjax.get("keyboard-shortcut-legend", "header_" + (W === "" ? "no_context" : "context")) + '</h2><label class="killswitch-container"><span class="spinner">' + c.transjax.get("keyboard-shortcut-legend", "saving") + '</span><span class="success"><span class="msg-icon"></span>' + c.transjax.get("keyboard-shortcut-legend", "saved") + '</span><span class="alert"><span class="msg-icon"></span>' + c.transjax.get("keyboard-shortcut-legend", "unable_to_save") + '</span><input type="checkbox" class="killswitch" tabindex="1" checked>' + c.transjax.get("keyboard-shortcut-legend", "enable_shortcuts") + '</label><a href="#" class="keyboard-shortcut-legend-close"></a></div><div class="bd keyboard-shortcut-legend-bd ' + B + '-layout"><p id="keyboard-shortcut-legend-instructions" class="obscured">' + c.transjax.get("keyboard-shortcut-legend", "instructions") + "</p>";
      c.Array.each(y, function (Z, Y) {
        L += '<ul class="keyboard-row row-' + Y + '">';
        c.Array.each(Z, function (aa) {
          L += "<li" + (aa.className ? ' class="' + aa.className + '"' : "") + ' id="key-' + aa.keyCode + '"><span class="key-container"><a href="#" class="key-height" role="button" tabindex="-1"><span class="key">' + (aa.sup ? '<span class="sup">' + aa.sup + "</span>" : "") + (aa.sub ? '<span class="sub">' + aa.sub + "</span>" : "") + "</span></a></span></li>"
        });
        L += "</ul>"
      });
      if (c.config.flickr.flags.enable_keyboard_shortcut_legend_keyboard_layouts) {
        L += '<div class="layout-tools"><span class="layout-description show"><span class="selected-layout">' + c.transjax.get("keyboard-shortcut-legend", B + "_layout") + '</span> (<a href="#" class="layout-change" role="button" tabindex="1">' + c.transjax.get("keyboard-shortcut-legend", "change_layout") + '</a>)</span><span id="layout-selector-desc" class="obscured">' + c.transjax.get("keyboard-shortcut-legend", "layout_selector_description") + '</span><select class="layout-selector" aria-label="layout-selector-desc"><option value="qwerty"' + (B === "qwerty" ? " selected" : "") + '>QWERTY</option><option value="spanish"' + (B === "spanish" ? " selected" : "") + ">" + c.transjax.get("keyboard-shortcut-legend", "spanish") + '</option><option value="qwertz"' + (B === "qwertz" ? " selected" : "") + '>QWERTZ</option><option value="azerty"' + (B === "azerty" ? " selected" : "") + '>AZERTY</option><option value="dvorak"' + (B === "dvorak" ? " selected" : "") + ">Dvorak</option></select></div>"
      }
      L += '<hr><div class="shortcuts" role="document">';
      c.Array.each(k, function (Z, Y) {
        if (V[Z]) {
          L += '<div class="group"><h4>' + Z + "</h4><ul>";
          c.Array.each(V[Z], function (aa, ab) {
            L += '<li id="shortcut-' + Y + "-" + ab + '"><kbd' + ((aa.key === "&larr;" || aa.key === "&rarr;") ? ' class="arrow"' : "") + ">" + aa.key + '</kbd><span id="shortcut-' + Y + "-" + ab + '-desc">' + aa.description + "</span></li>"
          });
          L += "</ul></div>"
        }
      });
      L += '</div><div class="mask"></div></div>';
      E[W + B] = L
    }
    U = (c.DOM.winHeight() > b && c.DOM.winWidth() > r);
    c.PageContext.set(N);
    c.global_dialog.remove_existing_dialog();
    c.global_dialog.create_dialog(L, {width: U ? 842 : 633}).show({loading: false, modal: true});
    c.global_dialog.set_aria({
      "aria-labelledby": "keyboard-shortcut-legend-header",
      "aria-describedby": "keyboard-shortcut-legend-instructions"
    });
    o = true;
    f = c.one(".keyboard-shortcut-legend-hd .killswitch");
    f.set("checked", c.config.flickr.flags.enable_keyboard_shortcuts);
    if (q) {
      q = false;
      c.one(".keyboard-shortcut-legend-bd .layout-tools .layout-change").focus()
    } else {
      f.focus()
    }
    h(f, true);
    if (!U) {
      c.one(".keyboard-shortcut-legend-bd").addClass("mini");
      c.global_dialog.reposition()
    }
    c.Array.each(k, function (Z, Y) {
      if (V[Z]) {
        c.Array.each(V[Z], function (aa, ac) {
          var ab = c.one("#shortcut-" + Y + "-" + ac), ad = false;
          c.Array.each(aa.keyCodes, function (af) {
            var ae = c.one("#key-" + af);
            if (ae) {
              ad = true;
              ae.addClass("highlight");
              ae.on(["focus", "mouseover"], function (ag) {
                z({blur: (ag.type === "mouseover")});
                ab.addClass("highlight")
              });
              ae.on(["blur", "mouseout"], function (ag) {
                z()
              });
              ab.on("mouseover", function (ag) {
                z();
                ae.addClass("super-highlight")
              });
              ab.on("mouseout", function (ag) {
                z()
              });
              ae.one("a.key-height").setAttribute("aria-describedby", ab.get("id") + "-desc")
            }
          });
          if (!ad) {
            ab.remove()
          }
        })
      }
    });
    t = c.all(".keyboard-shortcut-legend-bd .keyboard-row li");
    i = c.all(".keyboard-shortcut-legend-bd .shortcuts li");
    c.once("click", O, ".keyboard-shortcut-legend-close");
    c.keyboardShortcutManager.register({keystring: "27", handler: O, context: N});
    c.all(".keyboard-shortcut-legend-bd a.key-height").on("click", function (Y) {
      Y.preventDefault()
    });
    c.all(".keyboard-shortcut-legend-hd .killswitch").on("click", function (Y) {
      h(Y.target)
    });
    if (c.config.flickr.flags.enable_keyboard_shortcut_legend_keyboard_layouts) {
      c.all(".keyboard-shortcut-legend-bd .layout-change").on("click", l);
      c.all(".keyboard-shortcut-legend-bd .layout-selector").on("change", g)
    }
    v = c.on("resize", c.betterThrottle(I, 50));
    if (c.config.flickr.flags.enable_keyboard_shortcuts) {
      H = true;
      c.keyboardShortcutManager.disable();
      e()
    }
    if (X && X.preventDefault) {
      X.preventDefault()
    }
  }

  function K(W, V) {
    if (W.order > V.order) {
      return 1
    } else {
      if (V.order > W.order) {
        return -1
      }
    }
    return 0
  }

  function z(V) {
    if (!V) {
      V = {}
    }
    if (V.blur && s && typeof s.blur === "function") {
      s.blur();
      s = null
    }
    t.removeClass("super-highlight");
    i.removeClass("highlight")
  }

  function I(W) {
    var V = (c.DOM.winHeight() > b && c.DOM.winWidth() > r);
    if (V !== U) {
      O();
      J()
    }
  }

  function T() {
    S();
    c.one(".keyboard-shortcut-legend-hd .spinner").addClass("show");
    w = new Date().getTime()
  }

  function p(X) {
    var V = new Date().getTime(), W = V - w;
    if (W >= d || !X) {
      c.one(".keyboard-shortcut-legend-hd .spinner").removeClass("show");
      D(X)
    } else {
      setTimeout(function () {
        c.one(".keyboard-shortcut-legend-hd .spinner").removeClass("show");
        D(X)
      }, d - W)
    }
  }

  function h(X, Y) {
    var V = c.one(".keyboard-shortcut-legend-bd"), W = c.one(".keyboard-shortcut-legend-bd .mask");
    if (!Y) {
      T()
    }
    if (X.get("checked")) {
      if (W) {
        W.setStyle("display", "none")
      }
      if (!Y) {
        Q(function (Z) {
          p(Z);
          if (!Z) {
            if (W) {
              W.setStyle("display", "block")
            }
            c.keyboardShortcutManager.disable();
            X.set("checked", false)
          }
        })
      }
    } else {
      W.setStyle("width", V.get("offsetWidth"));
      W.setStyle("height", V.get("offsetHeight"));
      W.setStyle("display", "block");
      if (!Y) {
        a(function (Z) {
          p(Z);
          if (!Z) {
            W.setStyle("display", "none");
            c.keyboardShortcutManager.enable();
            X.set("checked", true)
          }
        })
      }
    }
  }

  function D(W) {
    var V = c.one(W ? ".keyboard-shortcut-legend-hd .success" : ".keyboard-shortcut-legend-hd .alert");
    V.addClass("show");
    setTimeout(S, d)
  }

  function S() {
    c.all(".keyboard-shortcut-legend-hd .success, .keyboard-shortcut-legend-hd .alert").removeClass("show")
  }

  function Q(V) {
    if (!V) {
      V = function () {
      }
    }
    c.flickrAPI.callMethod("flickr.prefs.setPrefs", {disable_keyboard_shortcuts: 0}, {
      success: function () {
        C = false;
        H = true;
        e();
        V(true)
      }, failure: function () {
        V(false)
      }
    })
  }

  function a(V) {
    if (!V) {
      V = function () {
      }
    }
    c.flickrAPI.callMethod("flickr.prefs.setPrefs", {disable_keyboard_shortcuts: 1}, {
      success: function () {
        C = true;
        H = false;
        M();
        V(true)
      }, failure: function () {
        V(false)
      }
    })
  }

  function l(V) {
    c.one(".keyboard-shortcut-legend-bd .layout-description").removeClass("show");
    c.one(".keyboard-shortcut-legend-bd .layout-selector").addClass("show").focus();
    if (V && typeof V.preventDefault === "function") {
      V.preventDefault()
    }
  }

  function g(W) {
    var V;
    B = W.target.get("value");
    V = {
      domain: ".flickr.com",
      path: "/",
      expires: (new Date((new Date()).getTime() + 10 * 365 * 60 * 60 * 24 * 1000))
    };
    c.Cookie.set(x, B, V);
    q = true;
    O();
    J()
  }

  function n(W) {
    var V;
    if (W.keyCode === 32 && W.target.test(".keyboard-shortcut-legend-bd .layout-tools .layout-change")) {
      l(W);
      return
    } else {
      if (c.focusTracker.isInput() || W.altKey || W.ctrlKey || W.metaKey || W.keyCode === 9 || c.one(".keyboard-shortcut-legend-bd .layout-tools").contains(W.target)) {
        return
      } else {
        if (W.keyCode === 27) {
          P++
        }
        if (P > 1) {
          O();
          P = 0;
          W.preventDefault();
          return
        }
        V = c.one("#key-" + W.keyCode);
        if (V) {
          s = V.one("a.key-height");
          s.focus()
        }
        W.preventDefault()
      }
    }
  }

  function e() {
    G = c.on("key", n, "html", "down:")
  }

  function M() {
    if (G && typeof G.detach === "function") {
      G.detach()
    }
  }

  function O(V) {
    c.global_dialog.remove_existing_dialog();
    c.global_dialog.hide();
    c.PageContext.unset(N);
    v.detach();
    M();
    if (H) {
      c.keyboardShortcutManager.enable()
    }
    o = false;
    if (C) {
      c.global_dialog.create_alert_dialog('<span class="reenable-msg">' + c.transjax.get("keyboard-shortcut-legend", "you_can_reenable_shortcuts_in_prefs") + "</span>", c.global_dialog.hide, {width: 280})
    }
    if (V && V.preventDefault) {
      V.preventDefault()
    }
  }

  function j(V) {
    if (!m) {
      R()
    }
    if (!V.context) {
      V.context = ""
    }
    if (!V.group) {
      V.group = c.transjax.get("keyboard-shortcut-legend", "general")
    }
    if (!V.order && V.order !== 0) {
      V.order = 50
    }
    A.push(V)
  }

  c.keyboardShortcutLegend = {show: J, hide: O, register: j};
  j({
    keyCodes: [191, 109],
    key: "?",
    description: c.transjax.get("keyboard-shortcut-legend", "shortcut_description"),
    context: "*",
    order: 0
  });
  j({
    keyCodes: [27],
    key: "esc",
    description: c.transjax.get("keyboard-shortcut-legend", "esc_description") + ' <span class="obscured">' + c.transjax.get("keyboard-shortcut-legend", "esc_description_screenreader") + "</span>",
    context: "*",
    order: 1
  })
}, "0.0.1", {
  requires: F.config.modules["keyboard-shortcut-legend"].requires || [],
  optional: F.config.modules["keyboard-shortcut-legend"].optional || []
});
YUI.add("menus", function (e) {
  var a = {};

  function d(f) {
    a[f.id] = new c(f);
    return a[f.id]
  }

  function b() {
    e.fire("flickr-menus:hide")
  }

  e.menus = {add: d, hide: b};
  function c(f) {
    c.superclass.constructor.apply(this, arguments)
  }

  c.NAME = "Menu";
  c.ATTRS = {
    id: {value: ""},
    popover: {},
    context: {},
    button_node: {},
    constrain_node: {},
    open_on_hover: {value: false},
    hide_delay: {},
    scroll: {value: false},
    button_evt_listeners: {},
    click_to_hide_handle: {},
    escape_key_listener: {},
    use_touch_events: {value: ("ontouchstart" in document.documentElement)},
    show_timer: {},
    hide_timer: {},
    hidden_prop: {value: ""},
    onHide: {}
  };
  e.extend(c, e.Base, {
    initializer: function (f) {
      this.set("scroll", f.scroll);
      this.set("id", f.id);
      this.set("popover", f.popover);
      this.set("context", f.context);
      if (f.button_node instanceof e.Node) {
        this.set("button_node", f.button_node)
      } else {
        f.button_node = undefined;
        delete f.button_node
      }
      if (f.constrain_node instanceof e.Node) {
        this.set("constrain_node", f.constrain_node)
      } else {
        f.constrain_node = undefined;
        delete f.constrain_node
      }
      e.on("flickr-menus:hide", function (g) {
        if (g === "source:nav-selecta-container") {
          return
        }
        this.hide()
      }, this);
      this.attachWindowHideHandler();
      this.attachButtonActionHandler();
      this.after("button_nodeChange", this.attachButtonActionHandler, this)
    }, show: function () {
      if (this.get("popover").get("visible")) {
        return false
      }
      if (this.get("button_node")) {
        this.get("button_node").addClass("ActiveButt")
      }
      e.fire("flickr-menus:hide");
      if (this.get("button_node")) {
        this.get("popover").alignToElement(this.get("button_node"), this.get("constrain_node") || e.one("#main"))
      }
      this.get("popover").show();
      e.PageContext.set(this.get("context"));
      e.later(20, this, function () {
        var g, f;
        if (!this.get("click_to_hide_handle")) {
          g = e.one("body").on(this.get("use_touch_events") ? "touchstart" : "click", function (h) {
            if (this.get("popover").get("boundingBox").contains(h.target) || !h.target.ancestor("body", true)) {
              return
            }
            this.hide()
          }, this);
          this.set("click_to_hide_handle", g)
        }
        if (!this.get("escape_key_listener")) {
          f = e.keyboardShortcutManager.register({
            keystring: "27", handler: function (h) {
              this.hide()
            }, context: this.get("context"), scope: this
          });
          this.set("escape_key_listener", f)
        }
      });
      if (this.get("scroll")) {
        e.one("#" + this.get("id")).vis.animScrollIntoView(true, 40, true)
      }
      e.fire("menus:show")
    }, hide: function () {
      if (!this.get("popover").get("visible")) {
        return false
      }
      if (this.get("button_node")) {
        this.get("button_node").removeClass("ActiveButt")
      }
      this.get("popover").hide();
      e.PageContext.unset(this.get("context"));
      if (this.get("escape_key_listener")) {
        this.get("escape_key_listener").detach();
        this.set("escape_key_listener", undefined)
      }
      if (this.get("click_to_hide_handle")) {
        this.get("click_to_hide_handle").detach();
        this.set("click_to_hide_handle", undefined)
      }
      e.fire("menus:hide");
      if (typeof this.get("onHide") === "function") {
        this.get("onHide")()
      }
    }, toggle: function () {
      if (this.get("popover").get("visible")) {
        this.hide()
      } else {
        this.show()
      }
    }, attachButtonActionHandler: function () {
      var g, f, k, j, h = [];
      if (this.get("button_evt_listeners")) {
        g = this.get("button_evt_listeners");
        for (f = g.length - 1; f >= 0; f--) {
          g[f].detach()
        }
        this.set("button_evt_listeners", [])
      }
      if (this.get("open_on_hover")) {
        j = function (i) {
          if (i.currentTarget.hasClass("DisabledButt")) {
            return
          }
          if (i.type === "mouseenter" && i.currentTarget.hasClass("open")) {
            var l = e.focusTracker.get();
            if (l.getDOMNode().tagName !== "BODY") {
              l.blur();
              this.show()
            }
          }
          if (i.type === "mouseenter") {
            this.show();
            return
          }
          if (i.type === "touchstart") {
            i.stopImmediatePropagation()
          }
          if (i.type === "mousemove" && !i.currentTarget.hasClass("open")) {
            this.show();
            return
          }
          if (i.type === "focus" && document[this.get("hidden_prop")]) {
            return
          }
          if (!i.currentTarget.hasClass("open") || i.type === "mouseleave" || i.type === "blur") {
            this.toggle();
            i.halt()
          }
        };
        h.push(this.get("button_node").on("focus", j, this));
        h.push(this.get("button_node").on("blur", j, this));
        if (this.get("use_touch_events")) {
          h.push(this.get("button_node").on("touchstart", j, this))
        }
        h.push(this.get("button_node").on("mouseenter", j, this));
        h.push(this.get("button_node").on("mouseleave", j, this));
        h.push(this.get("button_node").once("mousemove", j, this))
      } else {
        k = function (l) {
          l.preventDefault();
          if (l.currentTarget.hasClass("DisabledButt")) {
            return
          }
          this.toggle();
          try {
            l.currentTarget.blur()
          } catch (i) {
          }
        };
        h.push(this.get("button_node").on("click", k, this))
      }
      this.set("button_evt_listeners", h)
    }, attachWindowHideHandler: function () {
      if (typeof document.hidden !== "undefined") {
        this.set("hidden_prop", "hidden")
      } else {
        if (typeof document.mozHidden !== "undefined") {
          this.set("hidden_prop", "mozHidden")
        } else {
          if (typeof document.msHidden !== "undefined") {
            this.set("hidden_prop", "msHidden")
          } else {
            if (typeof document.webkitHidden !== "undefined") {
              this.set("hidden_prop", "webkitHidden")
            }
          }
        }
      }
    }
  })
}, "0.0.1", {requires: F.config.modules.menus.requires || [], optional: F.config.modules.menus.optional || []});
YUI.add("global-nav", function (c) {
  var k = {
    banners: ["#refresh-announcement", "#subscription-announcement", "#storage-announcement", "#https-announcement", "#groups-opt"],
    eyebrow: "#eyebrow",
    nav: "#global-nav",
    searchBox: "#gn-search-field",
    searchButt: "#global-nav .search-icon",
    menuParent: ".gn-menu-parent"
  }, i = {
    banners: [],
    eyebrow: null,
    nav: null,
    searchBox: null,
    searchButt: null,
    menuParents: null
  }, j = {touch: "ontouchstart" in document.documentElement}, f = null;
  var d = 995;
  var a = {
    node: {}, visible: {value: false}, boundingBox: {
      readOnly: true, getter: function () {
        return this.get("node")
      }
    }
  };
  var e = 100;
  var h = function (n) {
    n = n || {};
    this.addAttrs(c.clone(a, true), n)
  };
  h.prototype.show = function () {
    var n = this.get("node");
    this.set("visible", true);
    f = window.setTimeout(function () {
      n.addClass("open");
      f = null
    }, e)
  };
  h.prototype.hide = function () {
    if (f) {
      window.clearTimeout(f);
      f = null
    }
    this.get("node").removeClass("open");
    this.set("visible", false)
  };
  h.prototype.alignToElement = function () {
  };
  function m() {
    i.eyebrow = c.one(k.eyebrow);
    i.nav = c.one(k.nav);
    i.searchBox = c.one(k.searchBox);
    i.searchButt = c.one(k.searchButt);
    i.menuParents = i.nav.all(k.menuParent);
    for (var p = 0, n = k.banners.length; p < n; p++) {
      var o = c.one(k.banners[p]);
      if (o) {
        i.banners.push(o)
      }
    }
    g();
    b();
    l();
    c.on("Liquid:resize", c.betterThrottle(function (q) {
      l()
    }, 50))
  }

  function b() {
    c.augment(h, c.Attribute);
    for (var p = 0, n = i.menuParents.size(); p < n; p++) {
      var q = i.menuParents.item(p);
      var o = "gn-menu-" + q.getData("context");
      c.menus.add({
        id: o,
        popover: new h({node: q}),
        context: o,
        button_node: q,
        open_on_hover: (q.getData("context") === "account") ? false : true
      })
    }
    i.nav.removeClass("no-js")
  }

  function g() {
    if (!i.searchBox) {
      return
    }
    i.searchBox.on(["focus", "blur"], function (n) {
      i.searchButt.toggleClass("focused", n.type === "focus")
    })
  }

  function l() {
    var p = false;
    if (j.touch || (document.body.offsetWidth && document.body.offsetWidth < d) || (document.compatMode === "CSS1Compat" && document.documentElement && document.documentElement.offsetWidth < d) || (window.innerWidth < d)) {
      p = true
    }
    i.nav.toggleClass("scrolling-header", p);
    if (i.eyebrow) {
      i.eyebrow.toggleClass("scrolling-header", p)
    }
    for (var o = 0, n = i.banners.length; o < n; o++) {
      i.banners[o].toggleClass("scrolling-header", p)
    }
  }

  c.globalNav = {init: m}
}, "0.0.1", {
  requires: F.config.modules["global-nav"].requires || [],
  optional: F.config.modules["global-nav"].optional || []
});
if (YAHOO === void 0 || !YAHOO) {
  var YAHOO = {}
}
YAHOO.i13n = YAHOO.i13n || {}, YAHOO.i13n.EventTypes = function () {
  function c(g, f, h) {
    this.yqlid = g, this.eventName = f, this.spaceidPrefix = h
  }

  var a = "richview", d = "contentmodification";
  c.prototype = {
    getYQLID: function () {
      return this.yqlid
    }, getEventName: function () {
      return this.eventName
    }
  };
  var b = {
    pageview: new c("pv", "pageview", ""),
    simple: new c("lv", "event", "P"),
    linkview: new c("lv", "linkview", "P"),
    richview: new c(a, a, "R"),
    contentmodification: new c(a, d, "R"),
    dwell: new c("lv", "dwell", "D")
  };
  return {
    getEventByName: function (f) {
      return b[f]
    }
  }
}(), YAHOO.i13n.Rapid = function (aH) {
  function at() {
  }

  function az(a) {
    this.map = {}, this.count = 0, a && this.absorb(a)
  }

  function av() {
    this.map = {}, this.count = 0
  }

  function ay(j, r) {
    if (!j) {
      return null
    }
    null === r && (r = !1);
    var f = new av, b = aD.getAttribute(j, aD.data_action_outcome);
    b && f.set("outcm", b);
    var h = aD.getAttribute(j, "data-ylk");
    if (null === h || 0 === h.length) {
      return f
    }
    for (var p = h.split(aD.ylk_pair_delim), m = 0, q = p.length; q > m; m++) {
      var v = p[m].split(aD.ylk_kv_delim);
      if (2 === v.length) {
        var g = v[0], k = v[1];
        null !== g && "" !== g && null !== k && (k.length > aD.MAX_VALUE_LENGTH && (k = k.substring(0, aD.MAX_VALUE_LENGTH)), 8 >= g.length && aD.MAX_VALUE_LENGTH >= k.length && ("_p" !== g || r) && f.set(g, k))
      }
    }
    return f
  }

  function aL(b, a, c) {
    return a > b ? a : b > c ? c : b
  }

  function aJ(a) {
    z.set("A_sid", YAHOO.i13n.A_SID || aD.rand()), z.set("_w", aD.rmProto(window.location.href).substring(0, aD.MAX_VALUE_LENGTH)), a ? z.absorb(a) : aH.keys && z.absorb(aH.keys)
  }

  function ar(h) {
    var m = YAHOO.i13n, c = YAHOO.i13n.TEST_ID || h.test_id, a = document.location + "";
    aJ(h.keys), c && (c = aD.norm("" + c));
    var b = 300, g = 700, k = {
      version: "3.18.5",
      keys: z,
      getReferrer: function () {
        return aD.norm(aD.clref(h.referrer || document.referrer))
      },
      spaceid: aD.norm(YAHOO.i13n.SPACEID || h.spaceid),
      yrid: aD.norm(h.yrid || ""),
      oo: h.oo ? "1" : "0",
      nol: h.nol ? "1" : "0",
      yql_enabled: h.yql_enabled !== !1,
      ywa: h.ywa || null,
      ywa_dpid: null,
      ywa_cf_override: m.YWA_CF_MAP || {},
      ywa_action_map: m.YWA_ACTION_MAP || {},
      ywa_outcome_map: m.YWA_OUTCOME_MAP || {},
      fing: 1 == h.use_fing,
      USE_RAPID: h.use_rapid !== !1,
      linktrack_attribut: h.lt_attr || "text",
      tracked_mods: h.tracked_mods || [],
      lt_attr: h.lt_attr || "text",
      client_only: h.client_only,
      text_link_len: h.text_link_len || -1,
      test_id: c,
      yql_host: h.yql_host || "geo.query.yahoo.com",
      yql_path: h.yql_path || "/v1/public/yql",
      compr_timeout: h.compr_timeout || g,
      compr_on: h.compr_on !== !1,
      compr_type: h.compr_type || "deflate",
      webworker_file: YAHOO.i13n.WEBWORKER_FILE || h.webworker_file || "rapidworker-1.1.js",
      nofollow_classname: h.nofollow_class || "rapidnofollow",
      no_click_listen: h.rapid_noclick_resp || "rapid-noclick-resp",
      nonanchor_track_class: h.nonanchor_track_class || "rapid-nonanchor-lt",
      anc_pos_attr: "data-rapid_p",
      deb: h.debug === !0,
      ldbg: a.indexOf("yhldebug=1") > 0,
      addmod_timeout: h.addmodules_timeout || 300,
      ult_token_capture: "boolean" == typeof h.ult_token_capture ? h.ult_token_capture : !1,
      track_type: h.track_type || "data-tracktype",
      dwell_on: h.dwell_on !== !1,
      async_all_clicks: h.async_all_clicks === !0,
      click_postmsg: h.click_postmsg || {},
      apv: h.apv !== !1,
      apv_time: h.apv_time || 1000,
      apv_px: h.apv_px || 500,
      ex: h.ex === !0,
      persist_asid: h.persist_asid === !0,
      track_right_click: h.track_right_click === !0,
      gen_bcookie: h.gen_bcookie === !0,
      skip_attr: h.skip_attr || "data-rapid-skip",
      parse_dom: h.parse_dom === !0,
      pageview_on_init: h.pageview_on_init !== !1
    };
    k.ywa_action_map[YAHOO.i13n.EventTypes.getEventByName("richview").getEventName()] = 100, !k.ywa || k.ywa.project_id && 0 != k.ywa.project_id && aD.isNumeric(k.ywa.project_id) || (aG("Invalid YWA project id: null or not numeric."), k.ywa = null);
    var p = 1 * k.compr_timeout;
    k.compr_timeout = aD.isNum(p) ? aL(p, b, g) : g;
    var f = 1 * h.click_timeout, j = 500;
    return k.click_timeout = aD.isNum(f) ? f : j, k
  }

  function au() {
    z.set("A_sid", aD.rand())
  }

  function aB() {
    return "Rapid-" + G.version + "(" + (new Date).getTime() + "):"
  }

  function aI(a) {
    console.warn("RAPID WARNING: " + a)
  }

  function aG(a) {
    console.error("RAPID ERROR: " + a)
  }

  function ax(a) {
    G.ldbg && console.log(aB() + a)
  }

  function aq() {
    var h = document.cookie;
    if (this.cookieMap = {}, /[^=]+=[^=;]?(?:; [^=]+=[^=]?)?/.test(h)) {
      for (var f = h.split(/;\s/g), l = null, g = null, j = null, d = 0, b = f.length; b > d; d++) {
        if (j = f[d].match(/([^=]+)=/i), j instanceof Array) {
          try {
            l = aD.dec(j[1]), g = aD.dec(f[d].substring(j[1].length + 1))
          } catch (k) {
            aG(k)
          }
        } else {
          l = aD.dec(f[d]), g = l
        }
        ("B" === l || "BX" === l || "TT" === l || G.ywa && l === "fpc" + G.ywa.project_id || "fpc" === l || "ywandp" === l || 0 === l.indexOf("ywadp") || "D" === l) && (this.cookieMap[l] = g)
      }
    }
  }

  function aA() {
    if (G.ult_token_capture && YAHOO.i13n.__handled_ult_tokens__ !== !0) {
      YAHOO.i13n.__handled_ult_tokens__ = !0;
      var b = window.document.location + "";
      if (b.match(/;_yl[a-z]{1}=/)) {
        G.ldbg && ax("Found ULT Token on URL."), aw.sendGeoT(b)
      } else {
        var a = new aq, c = a.getCookieByName("D");
        c && (aD.clearCookie("D", "/", ".yahoo.com"), aw.sendGeoT(c))
      }
    }
  }

  function aE() {
    return Math.floor((new Date).valueOf() / 1000)
  }

  function aM(d, b, g) {
    var c = new Date, f = "";
    c.setTime(c.getTime() + 1000 * g), f = "; expires=" + c.toGMTString();
    var a = d + "=" + b + f + "; path=/";
    document.cookie = a
  }

  function aF() {
    return "" + Math.floor(4294967295 * Math.random())
  }

  function an(b) {
    var a, c = [];
    for (a in b) {
      b[a] && c.push(a + ":" + b[a])
    }
    return encodeURIComponent(c.join(";"))
  }

  function ap(c, a) {
    c = c || "";
    var f = decodeURIComponent(c).split(";"), b = {};
    for (i = 0, excl = f.length; excl > i; i++) {
      var d = f[i].split(":");
      b[d[0]] = d[1]
    }
    return a ? b[a] : b
  }

  function aK() {
    function a2(b) {
      var a = "cf";
      return a += 10 > b && "0" !== ("" + b).charAt(0) ? "0" + b : b
    }

    function aP() {
      void 0 !== window.ITTs && aD.isArr(window.ITTs) && 0 !== window.ITTs.length || (window.ITTs = [{}]), window.ITTs[0].setFPCookies || (window.ITTs[0].setFPCookies = function () {
        var c = "fpc", a = new aq, g = ap(a.getCookieByName(c));
        g[G.ywa.project_id] = window.ITTs[0].FPCV, aM(c, an(g), 31536000);
        var b = a.getCookieByName(c + G.ywa.project_id);
        b && aD.clearCookie(c + G.ywa.project_id)
      })
    }

    function aT(g, b, l, c) {
      G.ldbg && ax(g);
      var k = new Image, a = null;
      k.onload = k.onabort = k.onerror = function () {
        b && l ? b[l] = 1 : c && (clearTimeout(a), c.call(null))
      }, k.src = g, c && (a = setTimeout(function () {
        c.call(null)
      }, G.click_timeout)), setTimeout(function () {
        k = null
      }, 100000)
    }

    function aW(c, a) {
      for (var g in c) {
        if (aD.hasOwn(c, g)) {
          var b = G.ywa_cf_override[g];
          b && (a[b] = c[g])
        }
      }
    }

    function a0(Y, R, a9, be, bc, I, P) {
      function a7(b, a) {
        var c = a ? "%3B" : ";";
        return b + (a9 ? c + b : "")
      }

      var bb = new aq, V = bb.getYWAFPC();
      bb.getYWADPID(), be = be || {}, "c" !== Y && aP();
      var a6 = [aD.curProto(), G.ywa.host || "a.analytics.yahoo.com", "/fpc.pl?"], bf = G.ywa.project_id, ba = G.ywa.document_group, C = {};
      G.test_id && (C["14"] = G.test_id);
      var H = ["_cb=" + aD.rand(), ".ys=" + G.spaceid, "a=" + bf, "b=" + aD.enc(G.ywa.document_name || document.title), "d=" + aD.enc(new Date), "f=" + aD.enc(window.location.href), "j=" + aD.sr("x"), "k=" + aD.cold(), "t=" + aE(), "l=true"];
      if (P) {
        for (var bd in P) {
          aD.hasOwn(P, bd) && H.push(bd + "=" + aD.enc(P[bd]))
        }
      }
      if (ba && "" !== ba && H.push("c=" + aD.enc(ba)), G.ywa_dpid && H.push("dpid=" + G.ywa_dpid), "c" === Y) {
        be.x = 12;
        var a8 = "12";
        a9 && (a8 = aD.enc(a8 + ";" + a9)), H.splice(0, 0, "x=" + a8)
      } else {
        "e" === Y && H.push("x=" + R + (a9 ? ";" + a9 : ""))
      }
      V && H.push("fpc=" + aD.enc(V));
      var S = G.ywa.member_id;
      S && H.push("m=" + S), "" !== G.getReferrer() && H.push("e=" + aD.enc(G.getReferrer()));
      var N = {};
      aD.aug(N, aS().getAll()), aD.aug(N, I), aW(N, C), aD.hasOwn(N, "A_apv") && (C["15"] = N.A_apv), "e" === Y && bc && aW(bc, C);
      var e = G.ywa.cf;
      aD.aug(C, e, function (a) {
        return !aD.isResCF(a)
      });
      for (var o in C) {
        aD.hasOwn(C, o) && H.push(a2(o) + "=" + a7(aD.enc(C[o]), 1))
      }
      if (("e" === Y || "c" === Y) && H.push("ca=1"), "p" !== Y && H.push("resp=img"), "c" === Y) {
        for (var t in be) {
          if (aD.hasOwn(be, t) && "x" !== t) {
            var q = be[t];
            try {
              q = aD.enc(a7(q)), aD.isSafari && (q = q.replace(/'/g, "%27"))
            } catch (D) {
              aG(D)
            }
            H.push(a2(t) + "=" + q)
          }
        }
      }
      return a6.join("") + H.join("&")
    }

    function a5() {
      return "rapid_if_" + aD.rand()
    }

    function a3(b) {
      var a = "display:none;";
      !aD.isIE || 6 !== aD.ieV && 7 !== aD.ieV && 8 !== aD.ieV ? aD.sa(b, "style", a) : b.style.setAttribute("cssText", a, 0)
    }

    function aN(b) {
      var a = null;
      if (aD.isIE && 8 >= aD.ieV) {
        var c = "";
        aD.isSecure() && 6 == aD.ieV && (c = 'src="https://geo.yahoo.com/b.html"'), a = document.createElement("<iframe " + c + ' name="' + b + '"></iframe>')
      } else {
        a = document.createElement("iframe")
      }
      return a.name = b, a
    }

    function aR() {
      setTimeout(function () {
        var a = aN("");
        aD.addEvent(a, "load", function () {
          aD.rmBodyEl(a)
        }), aD.appBodyEl(a)
      }, 1)
    }

    function aY(q, x) {
      var c = null, a = aD.make("form"), b = aD.make("input"), k = a5(), g = a5(), s = "application/x-www-form-urlencoded;charset=UTF-8";
      c = aN(k), a3(c), a3(a), a.id = g, a.method = "POST", a.action = aX(x), a.target = k, aD.isIE && 7 >= aD.ieV ? a.setAttribute("enctype", s) : (a.setAttribute("enctype", s), a.setAttribute("encoding", s)), b.name = "q", b.value = q, aD.isIE && aD.ieV >= 10 && (b.type = "submit"), a.appendChild(b);
      var m = "load", u = function () {
        var o = "";
        if (G.ldbg && (!aD.isIE || aD.ieV >= 9)) {
          var l = c.contentDocument || c.contentWindow.document;
          o = l.body.innerHTML
        }
        aD.rmEvent(c, m, u), setTimeout(function () {
          aD.rmBodyEl(c), aD.rmBodyEl(a)
        }, 0), G.ldbg && ax("iframe resp: " + o), aD.isIE && 7 >= aD.ieV && aR()
      };
      aD.addEvent(c, m, u), aD.appBodyEl(c), aD.appBodyEl(a), a.submit()
    }

    function aX(c) {
      var a = G.deb, g = aD.rand(), b = [aD.curProto(), G.yql_host, G.yql_path, "?yhlVer=2&yhlClient=rapid&yhlS=", G.spaceid, a === !0 ? "&yhlEnv=staging" : "", a === !0 || G.ldbg ? "&debug=true&diagnostics=true" : "", aD.isIE && aD.ieV ? "&yhlUA=ie" + aD.ieV : "", aD.isIE && 8 == aD.ieV ? "&format=json" : "", "&yhlCT=2", "&yhlBTMS=", (new Date).valueOf(), "&yhlClientVer=", G.version, "&yhlRnd=", g, "&yhlCompressed=", c || 0, G.gen_bcookie ? "&yhlBcookie=1" : ""].join("");
      return G.ldbg && ax(b), b
    }

    function a1(c, a) {
      var g = aD.getXHR(), b = aX(a);
      g.open("POST", b, !0), g.withCredentials = !0, g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), G.ldbg && (g.onreadystatechange = function () {
        4 === g.readyState && ax(g.status + ":xhr response: " + g.responseText)
      }), g.send(c)
    }

    function a4(c, a, g) {
      var b = {};
      return aD.isObj(c) ? (aD.aug(b, c, g), b) : b
    }

    function aZ(l, g) {
      var q = {m: aD.norm(l.moduleName), l: []};
      l.moduleYLK && (q.ylk = l.moduleYLK.getAll());
      for (var k = l.links, m = function (a) {
        var o = "_p" === a;
        return g && o ? !0 : "sec" !== a && !o
      }, c = 0, b = k.length; b > c; c++) {
        q.l.push(a4(k[c], g, m))
      }
      return q
    }

    function aV(g, b) {
      var l = [], c = null;
      for (var k in g) {
        if (aD.hasOwn(g, k) && (c = g[k])) {
          var a = aZ(c, b);
          a.l.length > 0 ? l.push(a) : G.ldbg && ax('Not capturing 0 links mod: "' + c.moduleName + '"')
        }
      }
      return l
    }

    function aO(b, a) {
      return b ? "pv" : a && a.event ? a.event.type.getYQLID() : "lv"
    }

    function h(c, a, k, b, g) {
      return [{t: aO(a, g), s: G.spaceid, pp: aS(a, b).getAll(), _ts: aE(), lv: aV(c, k)}]
    }

    function aS(c, a) {
      var b = az.makeFromPP(G.keys);
      return b.absorb(a), c && b.set("A_", 1), b
    }

    function v(c, a, g) {
      var b = "select * from x where a = '" + c + "'";
      return (a ? "q=" : "") + (g ? aD.enc(b) : b)
    }

    function B(b) {
      var a = {bp: X(), r: b.call(0), yrid: G.yrid, optout: G.oo, nol: G.nol};
      return aD.toJSON(a)
    }

    function y(c, a, k) {
      var b = {};
      k.event && aD.aug(b, k.event.data), k.pp && aD.aug(b, k.pp);
      var g = B(function () {
        return h([c], a, !0, b, k)
      });
      aQ(g, a)
    }

    function W(c, a, k, b) {
      var g = B(function () {
        return h(c, a, !1, k, b)
      });
      aQ(g)
    }

    function U(a) {
      return a.identifier
    }

    function aQ(m) {
      function C(c, a) {
        0 === a && (c = c.replace(/'/g, "\\'")), b && ax("body: " + c), aD.hasCORS() ? (g = v(c, !0, !0), a1(g, a)) : (g = v(c, 0, 0), aY(g, a))
      }

      function k() {
        q || (q = !0, C(m, 0), b && ax("sent in failSend"))
      }

      var b = G.ldbg, g = "", l = K[G.compr_type];
      if (G.compr_on && aD.hasWorkers() && l > 1 && m.length > 2048) {
        b && ax("Looking for worker:" + G.webworker_file + ", compr timeout:" + G.compr_timeout);
        var x = new Worker(G.webworker_file), q = !1, A = null, D = 0;
        x.onerror = function (a) {
          clearTimeout(A), k(), aI(a.message), x.terminate()
        }, x.onmessage = function (c) {
          clearTimeout(A);
          var a = aD.tms();
          q || (q = !0, C(c.data, l)), b && ax("Ratio (" + c.data.length + "/" + m.length + "): " + (100 * c.data.length / m.length).toFixed(2) + "% -> C_T: " + (a - D) + " ms (" + a + "-" + D + ")"), x.terminate()
        }, b && ax("posting to worker: " + m), D = aD.tms(), x.postMessage({
          type: l,
          json: m
        }), A = setTimeout(function () {
          k(), x.terminate()
        }, G.compr_timeout)
      } else {
        C(m, 0)
      }
    }

    function w(b, a, c) {
      return aD.curProto() + d + "/" + b + ["?s=" + (c ? c : G.spaceid), "t=" + aD.rand() + "," + Math.random(), "_I=" + G.yrid, "_AO=" + G.oo, "_NOL=" + G.nol, "_R=" + aD.enc(G.getReferrer()), ("c" === b ? "_K=" : "_P=") + p(a)].join("&")
    }

    function p(b) {
      var a = new az(X(!1));
      return a.absorb(G.keys.getAll()), a.set("_ts", aE()), b && (b instanceof az ? a.absorb(b.getAll()) : aG("Internal error in buildGeoPP: not PP type")), G.version + "%05" + a.ser()
    }

    function j(b) {
      var a = [w("c") + "&_C=" + aD.ser(b.data)];
      return a.join("&")
    }

    function n(b, a) {
      var c = b[a];
      return c && aD.isNum(c) && c >= 0 ? c : null
    }

    function f(b) {
      var a = aD.getAttribute(b, aD.DATA_ACTION), c = aD.getAttribute(b, aD.data_action_outcome);
      return null !== a ? n(G.ywa_action_map, a) : null !== c ? n(G.ywa_outcome_map, c) : null
    }

    var d = YAHOO.i13n.beacon_server || "geo.yahoo.com", X = function (b) {
      var a = {_pl: 1, A_v: G.version}, c = G.getReferrer();
      return c && b !== !1 && (a._R = c.substring(0, aD.MAX_VALUE_LENGTH)), G.test_id && (a.test = G.test_id), G.ex && (a._ex = 1), a._bt || (a._bt = "rapid"), a
    }, aU = function () {
      var c = null, a = [], g = 0, b = G.addmod_timeout;
      return function (q, l, e, r) {
        clearTimeout(c);
        var k = +new Date - g;
        if (a = aD.uniqConcat(a, q, U), k > b) {
          g = +new Date, W(a, l, e, r), a = []
        } else {
          var m = b - k;
          c = setTimeout(function () {
            G.ldbg && ax("queueing send in addMods"), W(a, l, e, r), a = []
          }, m)
        }
      }
    }();
    return {
      sendGeoT: function (b) {
        var a = [aD.curProto(), d, "/t?", b].join("");
        aT(a)
      }, sendGeoPV: function () {
        aT(w("b"))
      }, sendRapidNoDelay: function (l, k, m, g, b) {
        if (!G.yql_enabled || b) {
          var q = null;
          m && (q = new az(m)), aT(w(k ? "b" : "p", q))
        } else {
          W(l, k, m, g)
        }
      }, sendRapid: function (c, a, g, b) {
        aU(c, a, g, b)
      }, sendRefreshedContent: y, sendYWAEvent: function (b) {
        var a = null, g = null, c = b.name;
        G.ywa_action_map && c && (a = n(G.ywa_action_map, c)), null !== a && (G.ywa_outcome_map && b.outcome && (g = n(G.ywa_outcome_map, b.outcome)), aT(a0("e", a, g, null, b.data)))
      }, sendULTEvent: function (c, b) {
        var g = {};
        c && c.data && (g = c.data);
        var a = w("p", new az(g), b || 0);
        c.type && (a += "&_V=" + c.type.spaceidPrefix), aT(a)
      }, sendDwell: function (a) {
        this.sendULTEvent(a, a.data.s)
      }, sendEvents: function (a) {
        G.USE_RAPID && this.sendULTEvent(a), G.ywa && this.sendYWAEvent(a)
      }, sendClick: function (r) {
        var H = null, g = "", C = "", A = null, E = !1, I = null;
        if (G.USE_RAPID && (g = j(r)), G.ywa) {
          var o = r.data, x = r.targetElement, q = {18: o.sec, 19: o.slk, 20: o._p};
          "A_cl" in o && (q["130"] = o.A_cl), A = x ? f(x) : n(G.ywa_outcome_map, r.outcome), G.ywa_cf_override && aW(o, q), C = a0("c", 0, A, q)
        }
        if (G.async_all_clicks || !r.synch) {
          return g && aT(g), C && aT(C), void 0
        }
        if (aD.prevDef(r.event), H = function () {
            if (!E) {
              E = !0;
              var a = r.targetElement.href;
              if (G.click_postmsg.origin) {
                var e = G.click_postmsg.window || top, c = G.click_postmsg.payload || {};
                c.href = a, e.postMessage(aD.toJSON(c), G.click_postmsg.origin)
              } else {
                r.hasTargetTop ? top.document.location = a : document.location = a
              }
            }
          }, G.USE_RAPID) {
          if (G.ywa) {
            var b = new Image, D = new Image, k = 0;
            b.onload = b.onerror = b.onabort = D.onload = D.onerror = D.onabort = function () {
              2 === ++k && (clearTimeout(I), H())
            }, b.src = g, D.src = C, I = setTimeout(H, G.click_timeout), setTimeout(function () {
              b = null, D = null
            }, 100000)
          } else {
            aT(g, 0, 0, H)
          }
        } else {
          G.ywa && aT(C, 0, 0, H)
        }
      }, sendYWAPV: function (k) {
        function c() {
          g[0].removeChild(b)
        }

        var m = a0("p", 0, 0, 0, 0, k), g = document.getElementsByTagName("head"), l = "true";
        if (0 !== g.length) {
          var b = aD.make("script", {defer: l, async: l, type: "text/javascript", src: m});
          aD.isIE ? b.onreadystatechange = function () {
            var a = this.readyState;
            ("loaded" === a || "complete" === a) && (b.onload = b.onreadystatechange = null, c())
          } : aD.isWebkit ? b.addEventListener("load", c) : b.onload = c, g[0].appendChild(b)
        }
      }, sendInternalSearch: function (b, a) {
        b = b || "", aD.isNum(a) || (a = 0);
        var g = {isk: b, isr: a}, c = a0("e", "INTERNAL_SEARCH", null, null, null, null, g);
        aT(c)
      }, sendYWAECommerce: function (m, k) {
        var x = {}, q = {PRODUCT_VIEW: 1, ADD_TO_CART: 1, CANCELLED_SALE: 1, PENDING_SALE: 1, SALE: 1}, b = {
          amount: "xa",
          orderId: "oc",
          tax: "xt",
          shipping: "xs",
          discount: "xd",
          sku: "p",
          units: "q",
          amounts: "r"
        };
        if (!(m in q)) {
          return aG("invalid YWA ecommerce action: " + m), void 0
        }
        for (var r in k) {
          if (aD.hasOwn(k, r) && r in b) {
            var g = b[r];
            x[g] = k[r]
          }
        }
        "SALE" === m && (m = 1);
        var l = a0("e", m, null, null, null, null, x);
        aT(l)
      }
    }
  }

  function aC(g, l, d, b, f, j) {
    var h = "", k = null, m = {sec: l, _p: d};
    return j ? (m.slk = f || "section", k = ay(b)) : (b.setAttribute(G.anc_pos_attr, d), h = aD.getLT(b, g), h && "" !== h ? k = ay(b) : h = "_ELINK_", m.slk = h), null !== k && aD.aug(m, k.getAll()), m
  }

  function am() {
    var a = {};
    return {
      addModule: function (b, c) {
        a[aD.norm(b)] = c
      }, addModules: function (g) {
        var d = aD.isArr(g), j = [];
        d || aD.isStr(g) && (g = Array(g), d = !0);
        for (var f in g) {
          if (aD.hasOwn(g, f)) {
            var h = d ? g[f] : f, c = aD.trim(g[f]);
            if (this.exists(h)) {
              aG('addModules() called with prev processed id:"' + h + '"')
            } else {
              var b = ad(c, h);
              b && (this.addModule(h, b), j.push(b))
            }
          }
        }
        return j
      }, getModules: function () {
        return a
      }, refreshModule: function (c, f, d, e) {
        var b = a[aD.norm(c)];
        b ? b.refreshModule(c, f, d, e) : aG("refreshModule called on unknown section: " + b)
      }, removeModule: function (b) {
        var c = a[aD.norm(b)];
        c && (c.removeHandlers(), delete a[b])
      }, destroy: function () {
        for (var b in a) {
          aD.hasOwn(a, b) && this.removeModule(b)
        }
        a = {}
      }, exists: function (b) {
        return a[aD.norm(b)]
      }
    }
  }

  function ai(b, a) {
    return aD.hasClass(b, "rapid_track_href") ? "href" : aD.hasClass(b, "rapid_track_text") ? "text" : aD.hasClass(b, "rapid_track_title") ? "title" : aD.hasClass(b, "rapid_track_id") ? "id" : a
  }

  function Q(a) {
    return "input" === a.nodeName.toLowerCase() && "submit" === aD.getAttribute(a, "type")
  }

  function ak(b, a) {
    var c = ae(b, a);
    F = c, c && aw.sendClick(c)
  }

  function ac(c, a, d) {
    var b = aD.getAttribute;
    return a.target && "_blank" === a.target.toLowerCase() || 2 === c.which || 4 === c.button || c.altKey || c.ctrlKey || c.shiftKey || c.metaKey || "on" === b(a, "data-nofollow") || b(a, "href") && "javascript:" === b(a, "href").substr(0, 11).toLowerCase() || aD.hasClass(a, G.nofollow_classname) || aD.hasClass(d, G.nofollow_classname)
  }

  function af(c, a, f, b) {
    f = f || {};
    var d = null;
    return c ? (d = YAHOO.i13n.EventTypes.getEventByName(c), f._E = d.getEventName(), a = f._E) : f._E = a || "_", b && (f.outcm = b), {
      type: d,
      name: a,
      data: f,
      outcome: b
    }
  }

  function ae(o, y) {
    o = o || event;
    for (var h = aD.getTarget(o), b = "button", k = "input", w = "", v = !1, x = null; h && (w = h.nodeName.toLowerCase()) && "a" !== w && w !== b && !Q(h) && !aD.hasClass(h, G.nonanchor_track_class);) {
      h = h.parentNode
    }
    if (!h || aD.hasClass(h, G.no_click_listen)) {
      return 0
    }
    if (aD.hasClass(h, G.nonanchor_track_class)) {
      x = {pos: 0, sec: y.moduleName, slk: "_"};
      var A = ay(h, 1);
      A && aD.aug(x, A.getAll())
    } else {
      var j = aD.getAttribute(h, G.anc_pos_attr);
      if (x = y.getLinkAtPos(j), !x) {
        return 0
      }
      w === k || w === b || ac(o, h, y.moduleElement) || (v = !0)
    }
    if (!x.tar) {
      var q = aD.getAttribute(h, "href");
      q && (x.tar = aD.extDomain(q)), q && x.tar || (x.tar = aD.extDomain(window.document.location + ""))
    }
    x.tar_uri || (x.tar_uri = h.pathname ? h.pathname.substring(0, aD.MAX_VALUE_LENGTH) : "");
    var m = y.moduleYLK;
    if (m) {
      var g = m.getAll();
      aD.aug(x, g, function (a) {
        return !(a in x)
      })
    }
    return x.A_xy = aD.xy(o), x.A_sr = aD.sr(), "contextmenu" == o.type && (x.A_cl = 3, v = !1), {
      data: x,
      event: o,
      moduleElement: y.moduleElement,
      targetElement: h,
      synch: v,
      hasTargetTop: h && h.target && "_top" === h.target.toLowerCase()
    }
  }

  function ao(d, b, g, c, f) {
    var a = {};
    return aD.aug(a, c), a.sec = d, a.slk = b, a._p = g, {
      data: a,
      outcome: f,
      event: null,
      moduleElement: null,
      targetElement: null,
      synch: !1,
      hasTargetTop: !1
    }
  }

  function ag(k, w, g) {
    w || (w = document);
    for (var b = k.split(","), f = [], j = 0, q = b.length; q > j; j++) {
      for (var p = w.getElementsByTagName(b[j]), v = 0, x = p.length; x > v; v++) {
        var h = p[v];
        (!g || g.call(0, h)) && f.push(h)
      }
    }
    var m = f[0];
    return m ? (m.sourceIndex ? f.sort(function (c, a) {
      return c.sourceIndex - a.sourceIndex
    }) : m.compareDocumentPosition && f.sort(function (c, a) {
      return 3 - (6 & c.compareDocumentPosition(a))
    }), f) : []
  }

  function aj(h, m, f, b) {
    m || (m = document);
    var d = h.split(",");
    f = f || [];
    var g = m.childNodes;
    if ("true" !== aD.getAttribute(m, G.skip_attr)) {
      for (var k = 0, j = g.length; j > k; k++) {
        var l = g[k];
        aD.isTagOfInterest(l, d) && (!b || b.call(0, l)) && f.push(l), "true" !== aD.getAttribute(l, G.skip_attr) ? aj(h, l, f, b) : "true" === aD.getAttribute(l, G.skip_attr) && f.push(l)
      }
    }
    var p = f[0];
    return p ? (p.sourceIndex ? f.sort(function (c, a) {
      return c.sourceIndex - a.sourceIndex
    }) : p.compareDocumentPosition && f.sort(function (c, a) {
      return 3 - (6 & c.compareDocumentPosition(a))
    }), f) : []
  }

  function ad(o, y) {
    function d(m, B) {
      var e = [];
      B = B || 1;
      for (var c = 0, a = m.length; a > c; c++) {
        if ("div" === m[c].tagName.toLowerCase()) {
          var v = m[c], r = ay(v), s = aC(A, o, 1, v, r.map.slk || q.map.slk, !0);
          p.push(s), e.push(s)
        } else {
          var s = aC(A, o, B++, m[c]);
          p.push(s), e.push(s)
        }
      }
      if ("true" === aD.getAttribute(b, G.skip_attr)) {
        var s = aC(A, o, 1, v, q.map.slk, !0);
        p.push(s), e.push(s)
      }
      return e
    }

    var b = document.getElementById(y), j = "a,button,input";
    if (!b) {
      return aI("Specified module not in DOM: " + y), null
    }
    var q = ay(b), p = [], x = G.parse_dom ? aj(j, b) : ag(j, b), A = ai(b, G.lt_attr), h = x.length, k = aD.getAttribute(b, G.track_type);
    d(x);
    var w = {
      moduleYLK: q,
      links: p,
      moduleName: o,
      trackType: k,
      moduleElement: b,
      refreshModule: function (B, m, v, C) {
        function f(a) {
          return !aD.getAttribute(a, G.anc_pos_attr)
        }

        var D = G.parse_dom ? aj(j, document.getElementById(B), null, f) : ag(j, document.getElementById(B), f);
        if (m === !0 || D.length > 0) {
          var l = d(D, h + 1);
          if (h += D.length, G.USE_RAPID || C.event) {
            var n = {};
            aD.aug(n, this), n.links = l, (m === !0 || v) && aw.sendRefreshedContent(n, m, C)
          }
        } else {
          aD.ldbg && ax("refreshModule(" + B + ") - no new links.")
        }
        m === !0 && (G.ywa && aw.sendYWAPV(C.pp), G.apv && al && al.reInit())
      },
      removeHandlers: function () {
        aD.rmEvent(b, "click", g), G.track_right_click && aD.rmEvent(b, "contextmenu", g)
      },
      getLinkAtPos: function (a) {
        return a > p.length ? null : p[a - 1]
      },
      identifier: y
    }, g = function (a) {
      ak(a, w)
    };
    return aD.addEvent(b, "click", g), G.track_right_click && aD.addEvent(b, "contextmenu", g), w
  }

  function ab(c, a, b) {
    if (G.ldbg && ax("beaconPageview called, pp=" + aD.fData(c)), a && !G.persist_asid && au(), G.USE_RAPID && aw.sendRapidNoDelay([], !0, c, null, b), G.ywa) {
      var d = az.makeFromPP(G.keys);
      d.absorb(c), aw.sendYWAPV(d.getAll())
    }
    G.apv && null != al && al.reInit()
  }

  function Z() {
    var g = null, d = function () {
      var a = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      return a
    }, j = lastApvTime = (new Date).getTime(), f = d(), h = -1, c = function () {
      var m = d(), o = -1 === h ? m - f : m - h, l = o > 0 ? 0 : 1;
      if (Math.abs(o) > G.apv_px) {
        var k = {A_apv: 1, A_apx: m, A_asd: l};
        ab(k, !1, !0), h = m, lastApvTime = (new Date).getTime()
      }
    }, b = function () {
      null != g && clearTimeout(g);
      var a = (new Date).getTime();
      G.apv_time > a - j && (f = d(), lastApvTime = a), g = setTimeout(function () {
        c()
      }, G.apv_time)
    };
    aD.addEvent(window, "scroll", b), this.reInit = function () {
      f = d(), h = -1, j = lastApvTime = (new Date).getTime()
    }, this.destroy = function () {
      aD.rmEvent(window, "scroll", b)
    }
  }

  function aa() {
    aA(), G.ldbg && ax("tracked_mods: " + aD.fData(G.tracked_mods));
    var a = ah.addModules(G.tracked_mods);
    G.USE_RAPID && G.pageview_on_init && aw.sendRapidNoDelay(a, 1 == G.client_only), G.ywa && G.pageview_on_init && aw.sendYWAPV(), G.apv && aD.executeOnLoad(function () {
      al = new Z
    })
  }

  function J(A) {
    var I = navigator.userAgent, j = Object.prototype, b = I.match(/MSIE\s[^;]*/) || I.match(/Trident\/[^;]*/) ? 1 : 0, f = /KHTML/.test(I) ? 1 : 0, w = null !== I.match(/(iPhone|iPad|iPod)/gi), C = (I.indexOf("android") > -1, w && null !== I.match(/AppleWebKit/)), B = null !== I.match(/AppleWebKit/) && null === I.match(/Chrome/), H = RegExp(/\ufeff|\uffef|[\u0000-\u001f]|[\ue000-\uf8ff]/g), L = RegExp(/[\u007f-\u00a0]|\s{2,}/g), q = "http://", d = "https://", E = "class", k = " ", x = 300, D = -1, y = "https:" === window.location.protocol;
    return b && (D = navigator.appVersion.match(/MSIE/) ? parseFloat(navigator.appVersion.split("MSIE")[1]) : parseFloat(navigator.appVersion.split("; rv:")[1])), {
      ca: "%01",
      cb: "%02",
      cc: "%03",
      cd: "%04",
      ce: "%05",
      cf: "%06",
      cg: "%07",
      ch: "%08",
      ylk_kv_delim: A.ylk_kv_delim || ":",
      ylk_pair_delim: A.ylk_pair_delim || ";",
      DATA_ACTION: "data-action",
      data_action_outcome: "data-action-outcome",
      isIE: b,
      isIOSSafari: C,
      isSafari: B,
      isWebkit: f,
      ieV: D,
      MAX_VALUE_LENGTH: x,
      hasOwn: function (c, a) {
        return j.hasOwnProperty.call(c, a)
      },
      enc: encodeURIComponent,
      dec: decodeURIComponent,
      curProto: function () {
        return y ? d : q
      },
      isSecure: function () {
        return y
      },
      strip: function (m) {
        for (var h = {"/": "P", ";": "1", "?": "P", "&": "1", "#": "P"}, s = {
          url: m,
          clean: "",
          cookie: "",
          keys: []
        }, l = 0; -1 !== m.indexOf("_yl", l);) {
          var p = m.indexOf("_yl", l);
          if (p > l && (s.clean += m.slice(l, p - 1)), l = p + 3, h[m.charAt(p - 1)] && "=" === m.charAt(p + 4)) {
            s.ult = 1;
            var g = "_yl" + m.charAt(p + 3), c = "";
            for (p += 5; m.length > p && !h[m.charAt(p)]; p++) {
              c += m.charAt(p)
            }
            s.keys.push(g), s[g] = c, "_ylv" !== g && (s.cookie += "&" + g + "=" + c), h[m.charAt(p)] && "P" === h[m.charAt(p)] && (s.clean += m.charAt(p)), l = p + 1
          } else {
            s.clean += m.slice(p - 1, l)
          }
        }
        return s.ult && (s.cookie = s.cookie.substr(1), s.clean += m.substr(l), "0" === s._ylv), s
      },
      prevDef: function (a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
      },
      appBodyEl: function (a) {
        document.body.appendChild(a)
      },
      rmBodyEl: function (a) {
        document.body.removeChild(a)
      },
      sa: function (c, a, g) {
        c.setAttribute(a, g)
      },
      make: function (g, a) {
        var h = document.createElement(g);
        if (a && this.isObj(a)) {
          for (var c in a) {
            this.sa(h, c, a[c])
          }
        }
        return h
      },
      getXHR: function () {
        function c() {
          for (var h = !1, m = a.length, g = 0; m > g; g++) {
            try {
              h = a[g]()
            } catch (l) {
              continue
            }
            break
          }
          return h
        }

        var a = [function () {
          return new XMLHttpRequest
        }, function () {
          return new ActiveXObject("Msxml2.XMLHTTP")
        }, function () {
          return new ActiveXObject("Msxml3.XMLHTTP")
        }, function () {
          return new ActiveXObject("Microsoft.XMLHTTP")
        }];
        return c()
      },
      hasLS: function () {
        try {
          return "localStorage" in window && null !== window.localStorage
        } catch (a) {
          return !1
        }
      },
      hasCORS: function () {
        return b && 10 > D ? !1 : "withCredentials" in new XMLHttpRequest ? !0 : "undefined" != typeof XDomainRequest ? !0 : !1
      },
      hasWorkers: function () {
        return !!window.Worker
      },
      clearCookie: function (c, a, g) {
        a = a ? a : "/", g = g ? g : "", document.cookie = c + "= ; path=" + a + "; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + g + ";"
      },
      uniqConcat: function (h, c, m) {
        function g(s) {
          for (var o = 0, p = s.length; p > o; o++) {
            var n = s[o];
            if (n) {
              var u = m(n);
              a[u] || (a[u] = 1, l.push(n))
            }
          }
        }

        var l = [], a = {};
        return g(h), g(c), l
      },
      trim: function (a) {
        return a ? a.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : a
      },
      extDomain: function (c) {
        var a = c.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return a && a[1]
      },
      getAttribute: function (c, a) {
        var g = "";
        return document.documentElement.hasAttribute || a !== E || (a = "className"), c && c.getAttribute && (g = c.getAttribute(a, 2)), g
      },
      isDate: function (a) {
        return "[object Date]" === j.toString.call(a)
      },
      isArr: function (a) {
        return "[object Array]" === j.toString.apply(a)
      },
      isStr: function (a) {
        return "string" == typeof a
      },
      isNum: function (a) {
        return "number" == typeof a && isFinite(a)
      },
      isNumeric: function (a) {
        return a - 0 == a && (a + "").replace(/^\s+|\s+$/g, "").length > 0
      },
      isObj: function (a) {
        return a && "object" == typeof a
      },
      rTN: function (c) {
        try {
          if (c && 3 === c.nodeType) {
            return c.parentNode
          }
        } catch (a) {
          aG(a)
        }
        return c
      },
      getTarget: function (c) {
        var a = c.target || c.srcElement;
        return this.rTN(a)
      },
      addEvent: function (c, a, g) {
        c.addEventListener ? c.addEventListener(a, g, !1) : c.attachEvent && c.attachEvent("on" + a, g)
      },
      rmEvent: function (c, a, g) {
        c.removeEventListener ? c.removeEventListener(a, g, !1) : c.detachEvent && c.detachEvent("on" + a, g)
      },
      aug: function (g, a, h) {
        if (a) {
          for (var c in a) {
            if (this.hasOwn(a, c)) {
              if (h && !h.call(null, c)) {
                continue
              }
              g[c] = a[c]
            }
          }
        }
      },
      rmProto: function (a) {
        return a ? a.substr(0, 7) === q ? a.substr(7, a.length) : a.substr(0, 8) === d ? a.substr(8, a.length) : a : ""
      },
      norm: function (a) {
        return null === a ? "" : (a = "" + a, this.trim(a.replace(L, " ").replace(H, "")))
      },
      _hasClass: function (g, a) {
        var h, c = !1;
        return g && a && (h = this.getAttribute(g, E) || "", c = a.exec ? a.test(h) : a && (k + h + k).indexOf(k + a + k) > -1), c
      },
      hasClass: function (g, a) {
        if (this.isArr(a)) {
          for (var h = 0, c = a.length; c > h; h++) {
            if (this._hasClass(g, a[h])) {
              return !0
            }
          }
          return !1
        }
        return this.isStr(a) ? this._hasClass(g, a) : !1
      },
      quote: function (h) {
        var c = /["\\\x00-\x1f\x7f-\x9f]/g, m = {
          "\b": "\\b",
          "	": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\"
        }, g = '"', l = '"';
        if (h.match(c)) {
          var a = h.replace(c, function (o) {
            var n = m[o];
            return "string" == typeof n ? n : (n = o.charCodeAt(), "\\u00" + Math.floor(n / 16).toString(16) + (o % 16).toString(16))
          });
          return g + a + g
        }
        return l + h + l
      },
      sfy: function (T) {
        if (!T && "" !== T) {
          return {}
        }
        var aN, N = typeof T;
        if ("undefined" === N) {
          return "undefined"
        }
        if ("number" === N || "boolean" === N) {
          return "" + T
        }
        if ("string" === N) {
          return this.quote(T)
        }
        if ("function" == typeof T.toJSON) {
          return this.sfy(T.toJSON())
        }
        if (this.isDate(T)) {
          var g = T.getUTCMonth() + 1, M = T.getUTCDate(), R = T.getUTCFullYear(), W = T.getUTCHours(), V = T.getUTCMinutes(), Y = T.getUTCSeconds(), aO = T.getUTCMilliseconds();
          return 10 > g && (g = "0" + g), 10 > M && (M = "0" + M), 10 > W && (W = "0" + W), 10 > V && (V = "0" + V), 10 > Y && (Y = "0" + Y), 100 > aO && (aO = "0" + aO), 10 > aO && (aO = "0" + aO), '"' + R + "-" + g + "-" + M + "T" + W + ":" + V + ":" + Y + "." + aO + 'Z"'
        }
        if (aN = [], this.isArr(T)) {
          for (var P = 0, U = T.length; U > P; P++) {
            aN.push(this.sfy(T[P]))
          }
          return "[" + aN.join(",") + "]"
        }
        if ("object" === N) {
          for (var S in T) {
            if (this.hasOwn(T, S)) {
              var h = typeof S, X = null;
              if ("string" === h) {
                X = this.quote(S)
              } else {
                if ("number" !== h) {
                  continue
                }
                X = '"' + S + '"'
              }
              if (h = typeof T[S], "function" !== h && "undefined" !== h) {
                var O = "";
                O = null === T[S] ? '""' : 0 === T[S] ? 0 : this.sfy(T[S]), aN.push(X + ":" + O)
              }
            }
          }
          return "{" + aN.join(",") + "}"
        }
      },
      toJSON: function () {
        var a = null;
        return function (c) {
          return a || (a = "object" == typeof JSON && JSON.stringify && 6 !== D && 7 !== D && 8 !== D ? JSON.stringify : this.sfy), a.call(this, c)
        }
      }(),
      executeOnLoad: function (m) {
        var h = !1, s = function (a) {
          (document.addEventListener || a && "load" === a.type || "complete" === document.readyState) && (h = !0, l(), m.call(this))
        }, l = function () {
          document.addEventListener ? (document.removeEventListener("DOMContentLoaded", s, !1), window.removeEventListener("load", s, !1)) : (document.detachEvent("onreadystatechange", s), window.detachEvent("onload", s))
        };
        if ("complete" === document.readyState) {
          setTimeout(s)
        } else {
          if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", s, !1), window.addEventListener("load", s, !1)
          } else {
            document.attachEvent("onreadystatechange", s), window.attachEvent("onload", s);
            var p = !1;
            try {
              p = null == window.frameElement && document.documentElement
            } catch (g) {
            }
            p && p.doScroll && function c() {
              if (!h) {
                try {
                  p.doScroll("left")
                } catch (a) {
                  return setTimeout(c, 50)
                }
                l(), m.call(this)
              }
            }()
          }
        }
      },
      getLinkContent: function (g) {
        for (var a, h = 0, c = ""; (a = g.childNodes[h]) && a; h++) {
          1 === a.nodeType && ("img" === a.nodeName.toLowerCase() && (c += (this.getAttribute(a, "alt") || "") + " "), c += this.getLinkContent(a))
        }
        return c
      },
      fData: function (a) {
        return this.isStr(a) ? a : this.toJSON(a)
      },
      getLT: function (c, a) {
        if (!c) {
          return "_"
        }
        var g = "";
        return a = a.toLowerCase(), g = "input" === c.nodeName.toLowerCase() ? this.getAttribute(c, "value") : "text" === a ? f ? c.textContent : c.innerText ? c.innerText : c.textContent : "href" === a ? this.rmProto(this.getAttribute(c, "href")) : this.getAttribute(c, a) || "", g = this.norm(g), "" === g && (g = this.norm(this.getLinkContent(c)), g || (g = this.norm(this.rmProto(this.getAttribute(c, "href"))))), "" === g ? "_" : g
      },
      clref: function (c) {
        if (0 !== c.indexOf(q) && 0 !== c.indexOf(d)) {
          return ""
        }
        var a = this.strip(c);
        return a.clean || a.url
      },
      cold: function () {
        return screen ? screen.colorDepth || screen.pixelDepth : "unknown"
      },
      sr: function (a) {
        return screen ? screen.width + (a ? a : ",") + screen.height : ""
      },
      xy: function (g) {
        function c() {
          var n = document.documentElement, m = document.body;
          return n && (n.scrollTop || n.scrollLeft) ? [n.scrollTop, n.scrollLeft] : m ? [m.scrollTop, m.scrollLeft] : [0, 0]
        }

        var l = null, h = g.pageX, a = g.pageY;
        return b && (l = c()), h || 0 === h || (h = g.clientX || 0, b && (h += l[1])), a || 0 === a || (a = g.clientY || 0, b && (a += l[0])), h + "," + a
      },
      hasCC: function (g) {
        for (var a = 0, h = g.length; h > a; a++) {
          var c = g.charCodeAt(a);
          if (32 > c || "=" === c) {
            return !0
          }
        }
        return !1
      },
      isValidPair: function (c, a) {
        return c.length > 8 || a.length > aD.MAX_VALUE_LENGTH ? (aI("Invalid key/value pair (" + c + "=" + a + ") Size must be < 8/300 respectively."), !1) : !0
      },
      ser: function (p, l) {
        if (!p) {
          return ""
        }
        void 0 === typeof l && (l = !0);
        var v = [], m = "";
        for (var s in p) {
          if (this.hasOwn(p, s)) {
            var h = s, g = p[s];
            if (null === h || null === g) {
              continue
            }
            if (h += "", g += "", g.length > aD.MAX_VALUE_LENGTH && (g = g.substring(0, aD.MAX_VALUE_LENGTH)), !this.isValidPair(h, g)) {
              continue
            }
            if (!this.hasCC(h) && !this.hasCC(g)) {
              m = "", g = this.trim(g), "" !== g && " " !== g || !l || (g = "_");
              try {
                m = this.enc(h + "" + g), aD.isSafari && (m = m.replace(/'/g, "%27"))
              } catch (u) {
                m = "_ERR_ENCODE_", aG(u)
              }
              v.push(m)
            }
          }
        }
        return v.join(this.cd)
      },
      rand: function () {
        for (var g = 0, a = "", h = ""; 16 > g++;) {
          var c = Math.floor(62 * Math.random());
          h = 10 > c ? c : String.fromCharCode(36 > c ? c + 55 : c + 61), a += h
        }
        return a
      },
      tms: function () {
        return +new Date
      },
      cookEn: function () {
        var c = navigator.cookieEnabled ? 1 : 0, a = "rapidtc";
        return void 0 !== navigator.cookieEnabled || c || (document.cookie = a + "=1", c = -1 != document.cookie.indexOf("testcookie") ? !0 : !1, document.cookie = a + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"), c
      },
      isResCF: function (c) {
        var a = {14: 1, 15: 1, 18: 1, 19: 1, 20: 1};
        return a[c]
      },
      isTagOfInterest: function (g, a) {
        for (var h = 0, c = a.length; c > h; h++) {
          if (g.tagName && g.tagName.toLowerCase() == a[h].toLowerCase()) {
            return !0
          }
        }
        return !1
      }
    }
  }

  ("undefined" == typeof console || console.log === void 0) && (console = {
    log: function () {
    }
  }), console.error === void 0 && (console.error = console.log), console.warn === void 0 && (console.warn = console.log), at.prototype = {
    ser: function () {
      return aD.ser(this.map)
    }, set: function (b, a) {
      var c = a ? aD.norm(a) : a;
      (void 0 === c || null === c) && (c = ""), null !== c && aD.isStr(c) && (c = c.replace(/\\/g, "\\\\")), c.length > aD.MAX_VALUE_LENGTH && (c = c.substring(0, aD.MAX_VALUE_LENGTH)), aD.isValidPair(b, c) && (this.map[aD.norm(b)] = c, this.count++)
    }, get: function (a) {
      return this.map[a]
    }, getAll: function () {
      return this.map
    }, absorb: function (b) {
      if (b && aD.isObj(b)) {
        for (var a in b) {
          aD.hasOwn(b, a) && this.set(a, b[a])
        }
      }
    }, absorb_filter: function (b, a) {
      if (b && aD.isObj(b)) {
        for (var c in b) {
          (!a || a.call(null, c)) && aD.hasOwn(b, c) && this.set(c, b[c])
        }
      }
    }, getSize: function () {
      return this.count
    }
  }, az.prototype = new at, az.prototype.constructor = at, av.prototype = new at, av.prototype.constructor = at, az.makeFromPP = function (b) {
    var a = new az;
    return b && a.absorb(b.getAll()), a
  };
  var z = new az, aD = J(aH), ah = new am, K = {none: 0, gzip: 1, lzw: 2, deflate: 3};
  aq.prototype = {
    getYWAFPC: function () {
      if (!G.ywa) {
        return null
      }
      var c = this.cookieMap["fpc" + G.ywa.project_id], a = this.cookieMap.fpc, f = ap(a), b = null;
      if (a && (b = f[G.ywa.project_id]), c && (aD.clearCookie("fpc" + G.ywa.project_id), !b)) {
        f[G.ywa.project_id] = c;
        var d = an(f);
        aM("fpc", d, 315360000), b = c
      }
      return b ? b : null
    }, getCookieByName: function (a) {
      return this.cookieMap[a]
    }, getYWADPID: function () {
      if (G.ywa) {
        var d, b = "ywandp", g = "ywadp" + G.ywa.project_id, c = ap(this.cookieMap[b]), f = c[G.ywa.project_id];
        if (void 0 === f || null === f || "" === f) {
          d = this.cookieMap[g], c[G.ywa.project_id] = d ? d : aF(), f = c[G.ywa.project_id];
          var a = an(c);
          aM(b, a, 315360000), this.cookieMap[b] = a
        }
        G.ywa_dpid = f
      }
    }
  };
  var G = ar(aH), aw = aK(), al = null, F = null;
  return aa(), {
    init: function () {
    }, beaconEvent: function (c, a, d) {
      G.ldbg && ax('beaconEvent: event="' + c + '" data=' + aD.fData(a) + " outcome=" + d);
      var b = af(0, c, a, d);
      aw.sendEvents(b)
    }, beaconRichView: function (b, a) {
      G.ldbg && ax("beaconRichView: outcome=" + a);
      var c = af("richview", "", b, a);
      aw.sendEvents(c)
    }, beaconClick: function (c, a, f, b, d) {
      !b && d && (b = {}), d && (b.outcm = d), aw.sendClick(ao(c, a, f, b, d))
    }, addModules: function (d, b, g) {
      G.ldbg && ax("addModules() called: mods=" + aD.fData(d) + " isPage: " + b), g = g || {};
      var c = {A_am: 1};
      g.pp && aD.aug(c, g.pp);
      var f = !1;
      switch (b || (b = !1), b) {
        case 1:
        case"1":
        case !0:
          b = !0;
          break;
        case 2:
        case"2":
          f = !0, b = !1, g.event = af("contentmodification", "", {});
          break;
        case 0:
        case"0":
        case !1:
        default:
          b = !1
      }
      if (!G.yql_enabled) {
        return b ? ab(c, !1) : g.event && this.beaconRichView(c, g.event.outcome), void 0
      }
      g && g.event && b && (aG("Cannot track event type and pageview at same time."), g.event = null);
      var a = ah.addModules(d);
      (0 !== a.length || g.event) && ((G.USE_RAPID || g.event) && (b || g.event || g.pp ? (g.event && g.event.data && aD.aug(c, g.event.data), aw.sendRapidNoDelay(a, b, c, g)) : aw.sendRapid(a, b, c, g)), b === !0 && (G.ywa && aw.sendYWAPV(c), G.apv && al && al.reInit()))
    }, addModulesAsRichView: function (c, a) {
      var d = af("richview", "", {}, a), b = !0;
      this.addModules(c, !1, {event: d}), G.yql_enabled || (b = !1), G.ywa && b && aw.sendYWAEvent(d)
    }, refreshModule: function (g, d, j, f) {
      G.ldbg && ax("refreshModule called: mod=" + g + " isPV: " + d + " sendLinks: " + j + " options: " + aD.fData(f));
      var h = !1;
      switch (f = f || {}, d || (d = !1), d) {
        case 1:
        case"1":
        case !0:
          d = !0;
          break;
        case 2:
        case"2":
          h = !0, d = !1, f.event = af("contentmodification", "", {});
          break;
        case 0:
        case"0":
        case !1:
        default:
          d = !1
      }
      if (!G.yql_enabled) {
        var c = f.pp || {};
        return d ? ab(c, !1) : f.event && this.beaconRichView(c, f.event.outcome), void 0
      }
      var b = j === !1 ? !1 : !0;
      d && f && f.event && (f.event = null), ah.refreshModule(g, d, b, f)
    }, refreshModuleAsRichView: function (c, a) {
      var d = af("richview", "", {}, a), b = !0;
      this.refreshModule(c, !1, !0, {event: d}), G.yql_enabled || (b = !1), G.ywa && b && aw.sendYWAEvent(d)
    }, removeModule: function (a) {
      ah.removeModule(a)
    }, isModuleTracked: function (a) {
      return G.ldbg && ax("isTracked called: " + a), ah && void 0 !== ah.exists(a)
    }, destroy: function () {
      ax("destroy called"), ah.destroy(), null !== al && (al.destroy(), al = null)
    }, reInit: function (a) {
      return G.ldbg && ax("reInit called with: " + aD.fData(a)), a = a || {}, a.spaceid ? (z = new az, G = ar(a), aD = J(a), void 0) : (aG("Invalid spid in reInit config: " + aD.fData(a)), void 0)
    }, beaconPageview: function (a) {
      ab(a, !0)
    }, beaconECommerce: function (b, a) {
      G.ywa && aw.sendYWAECommerce(b, a)
    }, beaconInternalSearch: function (b, a) {
      G.ywa && aw.sendInternalSearch(b, a)
    }, getCurrentSID: function () {
      return z.get("A_sid")
    }, notifyHistoryPushStateCalled: function () {
      browserEventManager.historyStateChanged()
    }, beaconLinkViews: function (g, f, k) {
      G.ldbg && ax("beaconLinkViews() called: eventType: " + b), k = k || {};
      var h = {A_lv: 2};
      k.pp && aD.aug(h, k.pp);
      var d = !1, b = !1;
      switch (f) {
        case 1:
        case"1":
        case !0:
          b = !0;
          break;
        case 2:
        case"2":
          d = !0, b = !1, k.event = af("contentmodification", "", {});
          break;
        case 0:
        case"0":
        case !1:
        default:
          b = !1
      }
      if (!G.yql_enabled) {
        return b ? ab(h, !1) : k.event && this.beaconRichView(h, k.event.outcome), void 0
      }
      if (k && k.event && b && (aG("Cannot track event type and pageview at same time."), k.event = null), 0 !== g.length || k.event) {
        var j = [];
        g.forEach(function (l) {
          var c = new av;
          c.absorb_filter(l, function (n) {
            return "sec" != n && "_links" != n
          });
          var p = [], m = 1;
          l._links.forEach(function (e) {
            var n = {sec: l.sec, _p: m++};
            aD.aug(n, e), p.push(n)
          });
          var a = {moduleName: l.sec, moduleYLK: c, links: p};
          j.push(a)
        }), (G.USE_RAPID || k.event) && (b || k.event || k.pp ? (k.event && k.event.data && aD.aug(h, k.event.data), aw.sendRapidNoDelay(j, b, h, k)) : aw.sendRapid(j, b, h, k))
      }
    }
  }
};
YUI.add("rapid-tracker", function (d) {
  var c = false, a;
  var b = {
    ok: c, _queue: [], init: function (h) {
      var j, f, g;
      if (!c) {
        d.one("body").on("click", function (l) {
          var i = l.target.ancestor(".ywa-track", true);
          if (i) {
            b.beacon(i.getAttribute("data-ywa-name"))
          }
        })
      }
      try {
        a = new (YAHOO.i13n.Rapid || YAHOO.i13n.Track)(h);
        a.init();
        d.mix(this, a);
        for (j = 0, f = this._queue.length; j < f; j++) {
          g = this._queue.shift();
          this.beaconEvent(g.key, g.data)
        }
        c = true
      } catch (k) {
        c = false
      }
    }, beacon: function (f, e) {
      if (!e) {
        e = ""
      }
      if (!a) {
        this._queue.push({key: f, data: e})
      } else {
        a.beaconEvent(f, e)
      }
    }
  };
  d.rapidTracker = b
}, "1.0.0");
YUI.add("nav-selecta-rapid", function (b) {
  var a = {
    search: /\/search\/\?q=.+/i,
    search_my_photos: /\/search\/\?w=[0-9]+\@N[0-9]+\&q=.+/i,
    search_my_contacts: /\/search\/\?w=contacts\&q=.+/i,
    search_groups: /\/search\/groups\/\?q=.+/i,
    search_users: /\/search\/people\/\?m=names&q=.+/i,
    contact_photostream: /^\/photos\/[a-z]+\/?/i
  };
  b.on("NavSelecta:beforeNavigatingAway", function (d) {
    var c;
    if (d.indexOf("?") === -1 && d.indexOf("/photos/") !== 0) {
      b.rapidTracker.beaconClick("searchform", d);
      return
    }
    if (d.indexOf("/photos/me") === 0) {
      b.rapidTracker.beaconClick("searchform", "my_photostream");
      return
    }
    for (c in a) {
      if (a.hasOwnProperty(c)) {
        if (d.match(a[c])) {
          b.rapidTracker.beaconClick("searchform", c);
          return
        }
      }
    }
  })
}, "0.0.1", {requires: F.config.modules["nav-selecta-rapid"].requires || []});