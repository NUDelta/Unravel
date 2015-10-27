/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("array-extras", function (e, t) {
  var n = e.Array, r = e.Lang, i = Array.prototype;
  n.lastIndexOf = r._isNative(i.lastIndexOf) ? function (e, t, n) {
    return n || n === 0 ? e.lastIndexOf(t, n) : e.lastIndexOf(t)
  } : function (e, t, n) {
    var r = e.length, i = r - 1;
    if (n || n === 0)i = Math.min(n < 0 ? r + n : n, r);
    if (i > -1 && r > 0)for (; i > -1; --i)if (i in e && e[i] === t)return i;
    return -1
  }, n.unique = function (e, t) {
    var n = 0, r = e.length, i = [], s, o, u, a;
    e:for (; n < r; n++) {
      a = e[n];
      for (s = 0, u = i.length; s < u; s++) {
        o = i[s];
        if (t) {
          if (t.call(e, a, o, n, e))continue e
        } else if (a === o)continue e
      }
      i.push(a)
    }
    return i
  }, n.filter = r._isNative(i.filter) ? function (e, t, n) {
    return i.filter.call(e, t, n)
  } : function (e, t, n) {
    var r = 0, i = e.length, s = [], o;
    for (; r < i; ++r)r in e && (o = e[r], t.call(n, o, r, e) && s.push(o));
    return s
  }, n.reject = function (e, t, r) {
    return n.filter(e, function (e, n, i) {
      return !t.call(r, e, n, i)
    })
  }, n.every = r._isNative(i.every) ? function (e, t, n) {
    return i.every.call(e, t, n)
  } : function (e, t, n) {
    for (var r = 0, i = e.length; r < i; ++r)if (r in e && !t.call(n, e[r], r, e))return !1;
    return !0
  }, n.map = r._isNative(i.map) ? function (e, t, n) {
    return i.map.call(e, t, n)
  } : function (e, t, n) {
    var r = 0, s = e.length, o = i.concat.call(e);
    for (; r < s; ++r)r in e && (o[r] = t.call(n, e[r], r, e));
    return o
  }, n.reduce = r._isNative(i.reduce) ? function (e, t, n, r) {
    return i.reduce.call(e, function (e, t, i, s) {
      return n.call(r, e, t, i, s)
    }, t)
  } : function (e, t, n, r) {
    var i = 0, s = e.length, o = t;
    for (; i < s; ++i)i in e && (o = n.call(r, o, e[i], i, e));
    return o
  }, n.find = function (e, t, n) {
    for (var r = 0, i = e.length; r < i; r++)if (r in e && t.call(n, e[r], r, e))return e[r];
    return null
  }, n.grep = function (e, t) {
    return n.filter(e, function (e, n) {
      return t.test(e)
    })
  }, n.partition = function (e, t, r) {
    var i = {matches: [], rejects: []};
    return n.each(e, function (n, s) {
      var u = t.call(r, n, s, e) ? i.matches : i.rejects;
      u.push(n)
    }), i
  }, n.zip = function (e, t) {
    var r = [];
    return n.each(e, function (e, n) {
      r.push([e, t[n]])
    }), r
  }, n.flatten = function (e) {
    var t = [], i, s, o;
    if (!e)return t;
    for (i = 0, s = e.length; i < s; ++i)o = e[i], r.isArray(o) ? t.push.apply(t, n.flatten(o)) : t.push(o);
    return t
  }
}, "3.11.0", {requires: ["yui-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("history-base", function (e, t) {
  function p() {
    this._init.apply(this, arguments)
  }

  function d(e) {
    return n.type(e) === "object"
  }

  var n = e.Lang, r = e.Object, i = YUI.namespace("Env.History"), s = e.Array, o = e.config.doc, u = o.documentMode, a = e.config.win, f = {merge: !0}, l = "change", c = "add", h = "replace";
  e.augment(p, e.EventTarget, null, null, {
    emitFacade: !0,
    prefix: "history",
    preventable: !1,
    queueable: !0
  }), i._state || (i._state = {}), p.NAME = "historyBase", p.SRC_ADD = c, p.SRC_REPLACE = h, p.html5 = !!(a.history && a.history.pushState && a.history.replaceState && ("onpopstate" in a || e.UA.gecko >= 2) && (!e.UA.android || e.UA.android >= 2.4)), p.nativeHashChange = ("onhashchange" in a || "onhashchange" in o) && (!u || u > 7), e.mix(p.prototype, {
    _init: function (e) {
      var t;
      e = this._config = e || {}, this.force = !!e.force, t = this._initialState = this._initialState || e.initialState || null, this.publish(l, {
        broadcast: 2,
        defaultFn: this._defChangeFn
      }), t && this.replace(t)
    }, add: function () {
      var e = s(arguments, 0, !0);
      return e.unshift(c), this._change.apply(this, e)
    }, addValue: function (e, t, n) {
      var r = {};
      return r[e] = t, this._change(c, r, n)
    }, get: function (t) {
      var n = i._state, s = d(n);
      return t ? s && r.owns(n, t) ? n[t] : undefined : s ? e.mix({}, n, !0) : n
    }, replace: function () {
      var e = s(arguments, 0, !0);
      return e.unshift(h), this._change.apply(this, e)
    }, replaceValue: function (e, t, n) {
      var r = {};
      return r[e] = t, this._change(h, r, n)
    }, _change: function (t, n, r) {
      return r = r ? e.merge(f, r) : f, r.merge && d(n) && d(i._state) && (n = e.merge(i._state, n)), this._resolveChanges(t, n, r), this
    }, _fireEvents: function (e, t, n) {
      this.fire(l, {
        _options: n,
        changed: t.changed,
        newVal: t.newState,
        prevVal: t.prevState,
        removed: t.removed,
        src: e
      }), r.each(t.changed, function (t, n) {
        this._fireChangeEvent(e, n, t)
      }, this), r.each(t.removed, function (t, n) {
        this._fireRemoveEvent(e, n, t)
      }, this)
    }, _fireChangeEvent: function (e, t, n) {
      this.fire(t + "Change", {newVal: n.newVal, prevVal: n.prevVal, src: e})
    }, _fireRemoveEvent: function (e, t, n) {
      this.fire(t + "Remove", {prevVal: n, src: e})
    }, _resolveChanges: function (e, t, n) {
      var s = {}, o, u = i._state, a = {};
      t || (t = {}), n || (n = {}), d(t) && d(u) ? (r.each(t, function (e, t) {
        var n = u[t];
        e !== n && (s[t] = {newVal: e, prevVal: n}, o = !0)
      }, this), r.each(u, function (e, n) {
        if (!r.owns(t, n) || t[n] === null)delete t[n], a[n] = e, o = !0
      }, this)) : o = t !== u, (o || this.force) && this._fireEvents(e, {
        changed: s,
        newState: t,
        prevState: u,
        removed: a
      }, n)
    }, _storeState: function (e, t) {
      i._state = t || {}
    }, _defChangeFn: function (e) {
      this._storeState(e.src, e.newVal, e._options)
    }
  }, !0), e.HistoryBase = p
}, "3.11.0", {requires: ["event-custom-complex"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("history-html5", function (e, t) {
  function a() {
    a.superclass.constructor.apply(this, arguments)
  }

  var n = e.HistoryBase, r = e.Lang, i = e.config.win, s = e.config.useHistoryHTML5, o = "popstate", u = n.SRC_REPLACE;
  e.extend(a, n, {
    _init: function (t) {
      var n = i.history.state;
      e.Object.isEmpty(n) && (n = null), t || (t = {}), t.initialState && r.type(t.initialState) === "object" && r.type(n) === "object" ? this._initialState = e.merge(t.initialState, n) : this._initialState = n, e.on("popstate", this._onPopState, i, this), a.superclass._init.apply(this, arguments)
    }, _storeState: function (t, n, r) {
      t !== o && i.history[t === u ? "replaceState" : "pushState"](n, r.title || e.config.doc.title || "", r.url || null), a.superclass._storeState.apply(this, arguments)
    }, _onPopState: function (e) {
      this._resolveChanges(o, e._event.state || null)
    }
  }, {
    NAME: "historyhtml5",
    SRC_POPSTATE: o
  }), e.Node.DOM_EVENTS.popstate || (e.Node.DOM_EVENTS.popstate = 1), e.HistoryHTML5 = a;
  if (s === !0 || s !== !1 && n.html5)e.History = a
}, "3.11.0", {optional: ["json"], requires: ["event-base", "history-base", "node-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("history-hash", function (e, t) {
  function p() {
    p.superclass.constructor.apply(this, arguments)
  }

  var n = e.HistoryBase, r = e.Lang, i = e.Array, s = e.Object, o = YUI.namespace("Env.HistoryHash"), u = "hash", a, f, l, c = e.config.win, h = e.config.useHistoryHTML5;
  e.extend(p, n, {
    _init: function (t) {
      var n = p.parseHash();
      t = t || {}, this._initialState = t.initialState ? e.merge(t.initialState, n) : n, e.after("hashchange", e.bind(this._afterHashChange, this), c), p.superclass._init.apply(this, arguments)
    }, _change: function (e, t, n) {
      return s.each(t, function (e, n) {
        r.isValue(e) && (t[n] = e.toString())
      }), p.superclass._change.call(this, e, t, n)
    }, _storeState: function (e, t) {
      var r = p.decode, i = p.createHash(t);
      p.superclass._storeState.apply(this, arguments), e !== u && r(p.getHash()) !== r(i) && p[e === n.SRC_REPLACE ? "replaceHash" : "setHash"](i)
    }, _afterHashChange: function (e) {
      this._resolveChanges(u, p.parseHash(e.newHash), {})
    }
  }, {
    NAME: "historyHash", SRC_HASH: u, hashPrefix: "", _REGEX_HASH: /([^\?#&]+)=([^&]+)/g, createHash: function (e) {
      var t = p.encode, n = [];
      return s.each(e, function (e, i) {
        r.isValue(e) && n.push(t(i) + "=" + t(e))
      }), n.join("&")
    }, decode: function (e) {
      return decodeURIComponent(e.replace(/\+/g, " "))
    }, encode: function (e) {
      return encodeURIComponent(e).replace(/%20/g, "+")
    }, getHash: e.UA.gecko ? function () {
      var t = e.getLocation(), n = /#(.*)$/.exec(t.href), r = n && n[1] || "", i = p.hashPrefix;
      return i && r.indexOf(i) === 0 ? r.replace(i, "") : r
    } : function () {
      var t = e.getLocation(), n = t.hash.substring(1), r = p.hashPrefix;
      return r && n.indexOf(r) === 0 ? n.replace(r, "") : n
    }, getUrl: function () {
      return location.href
    }, parseHash: function (e) {
      var t = p.decode, n, i, s, o, u = {}, a = p.hashPrefix, f;
      e = r.isValue(e) ? e : p.getHash();
      if (a) {
        f = e.indexOf(a);
        if (f === 0 || f === 1 && e.charAt(0) === "#")e = e.replace(a, "")
      }
      s = e.match(p._REGEX_HASH) || [];
      for (n = 0, i = s.length; n < i; ++n)o = s[n].split("="), u[t(o[0])] = t(o[1]);
      return u
    }, replaceHash: function (t) {
      var n = e.getLocation(), r = n.href.replace(/#.*$/, "");
      t.charAt(0) === "#" && (t = t.substring(1)), n.replace(r + "#" + (p.hashPrefix || "") + t)
    }, setHash: function (t) {
      var n = e.getLocation();
      t.charAt(0) === "#" && (t = t.substring(1)), n.hash = (p.hashPrefix || "") + t
    }
  }), a = o._notifiers, a || (a = o._notifiers = []), e.Event.define("hashchange", {
    on: function (t, n, r) {
      (t.compareTo(c) || t.compareTo(e.config.doc.body)) && a.push(r)
    }, detach: function (e, t, n) {
      var r = i.indexOf(a, n);
      r !== -1 && a.splice(r, 1)
    }
  }), f = p.getHash(), l = p.getUrl(), n.nativeHashChange ? o._hashHandle || (o._hashHandle = e.Event.attach("hashchange", function (e) {
    var t = p.getHash(), n = p.getUrl();
    i.each(a.concat(), function (r) {
      r.fire({_event: e, oldHash: f, oldUrl: l, newHash: t, newUrl: n})
    }), f = t, l = n
  }, c)) : o._hashPoll || (o._hashPoll = e.later(50, null, function () {
    var e = p.getHash(), t, n;
    f !== e && (n = p.getUrl(), t = {
      oldHash: f,
      oldUrl: l,
      newHash: e,
      newUrl: n
    }, f = e, l = n, i.each(a.concat(), function (e) {
      e.fire(t)
    }))
  }, null, !0)), e.HistoryHash = p;
  if (h === !1 || !e.History && h !== !0 && (!n.html5 || !e.HistoryHTML5))e.History = p
}, "3.11.0", {requires: ["event-synthetic", "history-base", "yui-later"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("history-hash-ie", function (e, t) {
  if (e.UA.ie && !e.HistoryBase.nativeHashChange) {
    var n = e.Do, r = YUI.namespace("Env.HistoryHash"), i = e.HistoryHash, s = r._iframe, o = e.config.win;
    i.getIframeHash = function () {
      if (!s || !s.contentWindow)return "";
      var e = i.hashPrefix, t = s.contentWindow.location.hash.substr(1);
      return e && t.indexOf(e) === 0 ? t.replace(e, "") : t
    }, i._updateIframe = function (e, t) {
      var n = s && s.contentWindow && s.contentWindow.document, r = n && n.location;
      if (!n || !r)return;
      t ? r.replace(e.charAt(0) === "#" ? e : "#" + e) : (n.open().close(), r.hash = e)
    }, n.before(i._updateIframe, i, "replaceHash", i, !0), s || e.on("domready", function () {
      var t = i.getHash();
      s = r._iframe = e.Node.getDOMNode(e.Node.create('<iframe src="javascript:0" style="display:none" height="0" width="0" tabindex="-1" title="empty"/>')), e.config.doc.documentElement.appendChild(s), i._updateIframe(t || "#"), e.on("hashchange", function (e) {
        t = e.newHash, i.getIframeHash() !== t && i._updateIframe(t)
      }, o), e.later(50, null, function () {
        var e = i.getIframeHash();
        e !== t && i.setHash(e)
      }, null, !0)
    })
  }
}, "3.11.0", {requires: ["history-hash", "node-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("router", function (e, t) {
  function f() {
    f.superclass.constructor.apply(this, arguments)
  }

  var n = e.HistoryHash, r = e.QueryString, i = e.Array, s = e.config.win, o = [], u = [], a = "ready";
  e.Router = e.extend(f, e.Base, {
    _regexPathParam: /([:*])([\w\-]+)?/g,
    _regexUrlQuery: /\?([^#]*).*$/,
    _regexUrlOrigin: /^(?:[^\/#?:]+:\/\/|\/\/)[^\/]*/,
    initializer: function (t) {
      var n = this;
      n._html5 = n.get("html5"), n._routes = [], n._url = n._getURL(), n._setRoutes(t && t.routes ? t.routes : n.get("routes")), n._html5 ? (n._history = new e.HistoryHTML5({force: !0}), n._historyEvents = e.after("history:change", n._afterHistoryChange, n)) : n._historyEvents = e.on("hashchange", n._afterHistoryChange, s, n), n.publish(a, {
        defaultFn: n._defReadyFn,
        fireOnce: !0,
        preventable: !1
      }), n.once("initializedChange", function () {
        e.once("load", function () {
          setTimeout(function () {
            n.fire(a, {dispatched: !!n._dispatched})
          }, 20)
        })
      }), o.push(this)
    },
    destructor: function () {
      var e = i.indexOf(o, this);
      e > -1 && o.splice(e, 1), this._historyEvents && this._historyEvents.detach()
    },
    dispatch: function () {
      return this.once(a, function () {
        this._ready = !0, this.upgrade() || this._dispatch(this._getPath(), this._getURL())
      }), this
    },
    getPath: function () {
      return this._getPath()
    },
    hasRoute: function (e) {
      var t;
      return this._hasSameOrigin(e) ? (this._html5 || (e = this._upgradeURL(e)), t = this.removeQuery(this.removeRoot(e)), !!this.match(t).length) : !1
    },
    match: function (e) {
      return i.filter(this._routes, function (t) {
        return e.search(t.regex) > -1
      })
    },
    removeRoot: function (e) {
      var t = this.get("root");
      return e = e.replace(this._regexUrlOrigin, ""), t && e.indexOf(t) === 0 && (e = e.substring(t.length)), e.charAt(0) === "/" ? e : "/" + e
    },
    removeQuery: function (e) {
      return e.replace(/\?.*$/, "")
    },
    replace: function (e) {
      return this._queue(e, !0)
    },
    route: function (e, t) {
      t = i.flatten(i(arguments, 1, !0));
      var n = [];
      return this._routes.push({callbacks: t, keys: n, path: e, regex: this._getRegex(e, n), callback: t[0]}), this
    },
    save: function (e) {
      return this._queue(e)
    },
    upgrade: function () {
      if (!this._html5)return !1;
      var e = this._getHashPath();
      return e ? (this.once(a, function () {
        this.replace(e)
      }), !0) : !1
    },
    _decode: function (e) {
      return decodeURIComponent(e.replace(/\+/g, " "))
    },
    _dequeue: function () {
      var t = this, n;
      return YUI.Env.windowLoaded ? (n = u.shift(), n ? n() : this) : (e.once("load", function () {
        t._dequeue()
      }), this)
    },
    _dispatch: function (t, n, r) {
      var s = this, o = s._decode, u = s.match(t), a = [], f, l, c;
      return s._dispatching = s._dispatched = !0, !u || !u.length ? (s._dispatching = !1, s) : (l = s._getRequest(t, n, r), c = s._getResponse(l), l.next = function (n) {
        var r, h, p;
        if (n)n === "route" ? (a = [], l.next()) : e.error(n); else if (r = a.shift())typeof r == "string" && (h = r, r = s[h], r || e.error("Router: Callback not found: " + h, null, "router")), l.pendingCallbacks = a.length, r.call(s, l, c, l.next); else if (p = u.shift())a = p.callbacks.concat(), f = i.map(p.regex.exec(t) || [], o), f.length === p.keys.length + 1 ? l.params = i.hash(p.keys, f.slice(1)) : l.params = f.concat(), l.pendingRoutes = u.length, l.next()
      }, l.next(), s._dispatching = !1, s._dequeue())
    },
    _getHashPath: function (e) {
      return e || (e = n.getHash()), e && e.charAt(0) === "/" ? this._joinURL(e) : ""
    },
    _getOrigin: function () {
      var t = e.getLocation();
      return t.origin || t.protocol + "//" + t.host
    },
    _getPath: function () {
      var t = !this._html5 && this._getHashPath() || e.getLocation().pathname;
      return this.removeQuery(this.removeRoot(t))
    },
    _getPathRoot: function () {
      var t = "/", n = e.getLocation().pathname, r;
      return n.charAt(n.length - 1) === t ? n : (r = n.split(t), r.pop(), r.join(t) + t)
    },
    _getQuery: function () {
      var t = e.getLocation(), r, i;
      return this._html5 ? t.search.substring(1) : (r = n.getHash(), i = r.match(this._regexUrlQuery), r && i ? i[1] : t.search.substring(1))
    },
    _getRegex: function (e, t) {
      return e instanceof RegExp ? e : e === "*" ? /.*/ : (e = e.replace(this._regexPathParam, function (e, n, r) {
        return r ? (t.push(r), n === "*" ? "(.*?)" : "([^/#?]*)") : n === "*" ? ".*" : e
      }), new RegExp("^" + e + "$"))
    },
    _getRequest: function (e, t, n) {
      return {path: e, query: this._parseQuery(this._getQuery()), url: t, src: n}
    },
    _getResponse: function (e) {
      var t = function () {
        return e.next.apply(this, arguments)
      };
      return t.req = e, t
    },
    _getRoutes: function () {
      return this._routes.concat()
    },
    _getURL: function () {
      var t = e.getLocation().toString();
      return this._html5 || (t = this._upgradeURL(t)), t
    },
    _hasSameOrigin: function (t) {
      var n = (t && t.match(this._regexUrlOrigin) || [])[0];
      return n && n.indexOf("//") === 0 && (n = e.getLocation().protocol + n), !n || n === this._getOrigin()
    },
    _joinURL: function (e) {
      var t = this.get("root");
      return e = this.removeRoot(e), e.charAt(0) === "/" && (e = e.substring(1)), t && t.charAt(t.length - 1) === "/" ? t + e : t + "/" + e
    },
    _normalizePath: function (e) {
      var t = "..", n = "/", r, i, s, o, u, a;
      if (!e || e === n)return n;
      o = e.split(n), a = [];
      for (r = 0, i = o.length; r < i; ++r)u = o[r], u === t ? a.pop() : u && a.push(u);
      return s = n + a.join(n), s !== n && e.charAt(e.length - 1) === n && (s += n), s
    },
    _parseQuery: r && r.parse ? r.parse : function (e) {
      var t = this._decode, n = e.split("&"), r = 0, i = n.length, s = {}, o;
      for (; r < i; ++r)o = n[r].split("="), o[0] && (s[t(o[0])] = t(o[1] || ""));
      return s
    },
    _queue: function () {
      var t = arguments, n = this;
      return u.push(function () {
        return n._html5 ? e.UA.ios && e.UA.ios < 5 ? n._save.apply(n, t) : setTimeout(function () {
          n._save.apply(n, t)
        }, 1) : (n._dispatching = !0, n._save.apply(n, t)), n
      }), this._dispatching ? this : this._dequeue()
    },
    _resolvePath: function (t) {
      return t ? (t.charAt(0) !== "/" && (t = this._getPathRoot() + t), this._normalizePath(t)) : e.getLocation().pathname
    },
    _resolveURL: function (t) {
      var n = t && t.match(this._regexURL), r, i, s, o, u;
      return n ? (r = n[1], i = n[2], s = n[3], o = n[4], r ? (r.indexOf("//") === 0 && (r = e.getLocation().protocol + r), r + (i || "/") + (s || "") + (o || "")) : (u = this._getOrigin() + this._resolvePath(i), i || s ? u + (s || "") + (o || "") : (s = this._getQuery(), u + (s ? "?" + s : "") + (o || "")))) : e.getLocation().toString()
    },
    _save: function (t, r) {
      var i = typeof t == "string", s, o, u;
      if (i && !this._hasSameOrigin(t))return e.error("Security error: The new URL must be of the same origin as the current URL."), this;
      i && (t = this._joinURL(t)), this._ready = !0;
      if (this._html5)this._history[r ? "replace" : "add"](null, {url: t}); else {
        s = e.getLocation().pathname, o = this.get("root"), u = n.getHash(), i || (t = u);
        if (o === s || o === this._getPathRoot())t = this.removeRoot(t);
        t === u ? e.Router.dispatch() : n[r ? "replaceHash" : "setHash"](t)
      }
      return this
    },
    _setRoutes: function (e) {
      return this._routes = [], i.each(e, function (e) {
        var t = e.callbacks || e.callback
          ;
        this.route(e.path, t)
      }, this), this._routes.concat()
    },
    _upgradeURL: function (t) {
      if (!this._hasSameOrigin(t))return t;
      var n = (t.match(/#(.*)$/) || [])[1] || "", r = e.HistoryHash.hashPrefix, i;
      r && n.indexOf(r) === 0 && (n = n.replace(r, ""));
      if (n) {
        i = this._getHashPath(n);
        if (i)return this._resolveURL(i)
      }
      return t
    },
    _afterHistoryChange: function (e) {
      var t = this, n = e.src, r = t._url, i = t._getURL();
      t._url = i;
      if (n === "popstate" && (!t._ready || r.replace(/#.*$/, "") === i.replace(/#.*$/, "")))return;
      t._dispatch(t._getPath(), i, n)
    },
    _defReadyFn: function (e) {
      this._ready = !0
    }
  }, {
    NAME: "router", ATTRS: {
      html5: {
        valueFn: function () {
          return e.Router.html5
        }, writeOnce: "initOnly"
      }, root: {value: ""}, routes: {value: [], getter: "_getRoutes", setter: "_setRoutes"}
    }, html5: e.HistoryBase.html5 && (!e.UA.android || e.UA.android >= 3), _instances: o, dispatch: function () {
      var e, t, n;
      for (e = 0, t = o.length; e < t; e += 1)n = o[e], n && n._dispatch(n._getPath(), n._getURL())
    }
  }), e.Controller = e.Router
}, "3.11.0", {optional: ["querystring-parse"], requires: ["array-extras", "base-build", "history"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("pjax-base", function (e, t) {
  function s() {
  }

  var n = e.config.win, r = e.ClassNameManager.getClassName("pjax"), i = "navigate";
  s.prototype = {
    _regexURL: /^((?:[^\/#?:]+:\/\/|\/\/)[^\/]*)?([^?#]*)(\?[^#]*)?(#.*)?$/, initializer: function () {
      this.publish(i, {defaultFn: this._defNavigateFn}), this.get("html5") && this._pjaxBindUI()
    }, destructor: function () {
      this._pjaxEvents && this._pjaxEvents.detach()
    }, navigate: function (t, n) {
      return t = this._resolveURL(t), this._navigate(t, n) ? !0 : (this._hasSameOrigin(t) || e.error("Security error: The new URL must be of the same origin as the current URL."), !1)
    }, _isLinkSameOrigin: function (t) {
      var n = e.getLocation(), r = n.protocol, i = n.hostname, s = parseInt(n.port, 10) || null, o;
      return t.get("protocol") !== r || t.get("hostname") !== i ? !1 : (o = parseInt(t.get("port"), 10) || null, r === "http:" ? (s || (s = 80), o || (o = 80)) : r === "https:" && (s || (s = 443), o || (o = 443)), o === s)
    }, _navigate: function (t, r) {
      t = this._upgradeURL(t);
      if (!this.hasRoute(t))return !1;
      r = e.merge(r, {url: t});
      var s = this._getURL(), o, u;
      u = t.replace(/(#.*)$/, function (e, t, n) {
        return o = t, e.substring(n)
      });
      if (o && u === s.replace(/#.*$/, "")) {
        if (!this.get("navigateOnHash"))return !1;
        r.hash = o
      }
      return "replace" in r || (r.replace = t === s), this.get("html5") || r.force ? this.fire(i, r) : n && (r.replace ? n.location.replace(t) : n.location = t), !0
    }, _pjaxBindUI: function () {
      this._pjaxEvents || (this._pjaxEvents = e.one("body").delegate("click", this._onLinkClick, this.get("linkSelector"), this))
    }, _defNavigateFn: function (e) {
      this[e.replace ? "replace" : "save"](e.url), n && this.get("scrollToTop") && setTimeout(function () {
        n.scroll(0, 0)
      }, 1)
    }, _onLinkClick: function (e) {
      var t, n, r;
      if (e.button !== 1 || e.ctrlKey || e.metaKey)return;
      t = e.currentTarget;
      if (t.get("tagName").toUpperCase() !== "A")return;
      if (!this._isLinkSameOrigin(t))return;
      n = t.get("href"), n && (r = this._navigate(n, {originEvent: e}), r && e.preventDefault())
    }
  }, s.ATTRS = {
    linkSelector: {value: "a." + r, writeOnce: "initOnly"},
    navigateOnHash: {value: !1},
    scrollToTop: {value: !0}
  }, e.PjaxBase = s
}, "3.11.0", {requires: ["classnamemanager", "node-event-delegate", "router"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("view", function (e, t) {
  function n() {
    n.superclass.constructor.apply(this, arguments)
  }

  e.View = e.extend(n, e.Base, {
    containerTemplate: "<div/>",
    events: {},
    template: "",
    _allowAdHocAttrs: !0,
    initializer: function (t) {
      t || (t = {}), t.containerTemplate && (this.containerTemplate = t.containerTemplate), t.template && (this.template = t.template), this.events = t.events ? e.merge(this.events, t.events) : this.events, this.after("containerChange", this._afterContainerChange)
    },
    destroy: function (e) {
      return e && (e.remove || e["delete"]) && this.onceAfter("destroy", function () {
        this._destroyContainer()
      }), n.superclass.destroy.call(this)
    },
    destructor: function () {
      this.detachEvents(), delete this._container
    },
    attachEvents: function (t) {
      var n = this.get("container"), r = e.Object.owns, i, s, o, u;
      this.detachEvents(), t || (t = this.events);
      for (u in t) {
        if (!r(t, u))continue;
        s = t[u];
        for (o in s) {
          if (!r(s, o))continue;
          i = s[o], typeof i == "string" && (i = this[i]);
          if (!i)continue;
          this._attachedViewEvents.push(n.delegate(o, i, u, this))
        }
      }
      return this
    },
    create: function (t) {
      return t ? e.one(t) : e.Node.create(this.containerTemplate)
    },
    detachEvents: function () {
      return e.Array.each(this._attachedViewEvents, function (e) {
        e && e.detach()
      }), this._attachedViewEvents = [], this
    },
    remove: function () {
      var e = this.get("container");
      return e && e.remove(), this
    },
    render: function () {
      return this
    },
    _destroyContainer: function () {
      var e = this.get("container");
      e && e.remove(!0)
    },
    _getContainer: function (e) {
      return this._container || (e ? (this._container = e, this.attachEvents()) : (e = this._container = this.create(), this._set("container", e))), e
    },
    _afterContainerChange: function () {
      this.attachEvents(this.events)
    }
  }, {
    NAME: "view",
    ATTRS: {container: {getter: "_getContainer", setter: e.one, writeOnce: !0}},
    _NON_ATTRS_CFG: ["containerTemplate", "events", "template"]
  })
}, "3.11.0", {requires: ["base-build", "node-event-delegate"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("app-base", function (e, t) {
  var n = e.Lang, r = e.Object, i = e.PjaxBase, s = e.Router, o = e.View, u = e.ClassNameManager.getClassName, a = e.config.win, f;
  f = e.Base.create("app", e.Base, [o, s, i], {
    views: {}, initializer: function (t) {
      function i(t, r) {
        n[r] = e.merge(n[r], t)
      }

      t || (t = {});
      var n = {};
      r.each(this.views, i), r.each(t.views, i), this.views = n, this._viewInfoMap = {}, this.after("activeViewChange", e.bind("_afterActiveViewChange", this)), this.get("serverRouting") || this._pjaxBindUI()
    }, createView: function (t, i) {
      var s = this.getViewInfo(t), u = s && s.type || o, a, f;
      return a = n.isString(u) ? r.getValue(e, u.split(".")) : u, f = new a(i), this._viewInfoMap[e.stamp(f, !0)] = s, f
    }, getViewInfo: function (t) {
      return n.isString(t) ? this.views[t] : t && this._viewInfoMap[e.stamp(t, !0)]
    }, render: function () {
      var t = e.App.CLASS_NAMES, n = this.get("container"), r = this.get("viewContainer"), i = this.get("activeView"), s = i && i.get("container"), o = n.compareTo(r);
      return n.addClass(t.app), r.addClass(t.views), i && !r.contains(s) && r.appendChild(s), !n.contains(r) && !o && n.appendChild(r), this
    }, showView: function (t, r, i, s) {
      var o, u;
      return i || (i = {}), s ? i = e.merge(i, {callback: s}) : n.isFunction(i) && (i = {callback: i}), n.isString(t) && (o = this.getViewInfo(t), o && o.preserve && o.instance ? (t = o.instance, this._viewInfoMap[e.stamp(t, !0)] = o) : (t = this.createView(t, r), u = !0)), i.update && !u && t.setAttrs(r), "render" in i ? i.render && t.render() : u && t.render(), this._set("activeView", t, {options: i})
    }, _attachView: function (e, t) {
      if (!e)return;
      var n = this.getViewInfo(e), r = this.get("viewContainer");
      e.addTarget(this), n && (n.instance = e), r[t ? "prepend" : "append"](e.get("container"))
    }, _destroyContainer: function () {
      var t = e.App.CLASS_NAMES, n = this.get("container"), r = this.get("viewContainer"), i = n.compareTo(r);
      if (e.one("body").compareTo(n)) {
        this.detachEvents(), n.removeClass(t.app), i ? n.removeClass(t.views) : r.remove(!0);
        return
      }
      r.remove(!0), i || n.remove(!0)
    }, _detachView: function (t) {
      if (!t)return;
      var n = this.getViewInfo(t) || {};
      n.preserve ? t.remove() : (t.destroy({remove: !0}), delete this._viewInfoMap[e.stamp(t, !0)], t === n.instance && delete n.instance), t.removeTarget(this)
    }, _getViewContainer: function (e) {
      return !e && !this._viewContainer && (e = this._viewContainer = this.create(), this._set("viewContainer", e)), e
    }, _initHtml5: function () {
      return this.get("serverRouting") === !1 ? !1 : s.html5
    }, _isChildView: function (e, t) {
      var n = this.getViewInfo(e), r = this.getViewInfo(t);
      return n && r ? this.getViewInfo(n.parent) === r : !1
    }, _isParentView: function (e, t) {
      var n = this.getViewInfo(e), r = this.getViewInfo(t);
      return n && r ? this.getViewInfo(r.parent) === n : !1
    }, _navigate: function (t, n) {
      return this.get("serverRouting") || (n = e.merge({force: !0}, n)), i.prototype._navigate.call(this, t, n)
    }, _save: function (t, n) {
      var r;
      return this.get("serverRouting") && !this.get("html5") ? this._hasSameOrigin(t) ? (a && (r = this._joinURL(t || ""), n ? a.location.replace(r) : a.location = r), this) : (e.error("Security error: The new URL must be of the same origin as the current URL."), this) : s.prototype._save.apply(this, arguments)
    }, _uiSetActiveView: function (e, t, n) {
      n || (n = {});
      var r = n.callback, i = this._isChildView(e, t), s = !i && this._isParentView(e, t), o = !!n.prepend || s;
      if (e === t)return r && r.call(this, e);
      this._attachView(e, o), this._detachView(t), r && r.call(this, e)
    }, _afterActiveViewChange: function (e) {
      this._uiSetActiveView(e.newVal, e.prevVal, e.options)
    }
  }, {
    ATTRS: {
      activeView: {value: null, readOnly: !0}, container: {
        valueFn: function () {
          return e.one("body")
        }
      }, html5: {valueFn: "_initHtml5"}, linkSelector: {value: "a"}, serverRouting: {
        valueFn: function () {
          return e.App.serverRouting
        }, writeOnce: "initOnly"
      }, viewContainer: {getter: "_getViewContainer", setter: e.one, writeOnce: !0}
    }, _NON_ATTRS_CFG: ["views"]
  }), e.namespace("App").Base = f, e.App = e.mix(e.Base.create("app", f, []), e.App, !0), e.App.CLASS_NAMES = {
    app: u("app"),
    views: u("app", "views")
  }
}, "3.11.0", {requires: ["classnamemanager", "pjax-base", "router", "view"]});
(function () {
  var a = "flickr-app";
  YUI.add(a, function (g) {
    var f;

    function e() {
      if (!f) {
        f = new g.App({serverRouting: true, linkSelector: false, scrollToTop: false});
        f.upgradeClick = d;
        f.saveIfRoutable = c;
        f.replaceIfRoutable = b;
        g.FlickrApp = f;
        if (g.config.flickr.user.admin_user === "hartsell") {
          F.FlickrApp = f
        }
      }
    }

    function c(h) {
      var i;
      i = f.removeRoot(h);
      if (f.hasRoute(i)) {
        f.save(i);
        return true
      }
      return false
    }

    function b(h) {
      var i;
      i = f.removeRoot(h);
      if (f.hasRoute(i)) {
        f.replace(i);
        return true
      }
      return false
    }

    function d(k) {
      var i, h, j;
      if (k.altKey || k.ctrlKey || k.metaKey || k.shiftKey) {
        return
      }
      i = k.target.ancestor("a", true);
      h = i && i.getAttribute("href");
      if (h) {
        j = f.removeRoot(h);
        if (f.hasRoute(j)) {
          k.preventDefault();
          f.save(j);
          return true
        }
      }
      return false
    }

    g.FlickrApp = {init: e}
  }, "0.0.1", {requires: F.config.modules[a].requires || [], optional: F.config.modules[a].optional || []})
}());
YUI.add("flickr-tooltips", function (a) {
  var q = null, g = null, b = 0, k = null, c = null, n = null;

  function h() {
    q = document.createElement("div");
    g = document.createElement("div");
    q.style.display = "none";
    q.style.zIndex = "200000";
    document.body.appendChild(q);
    q.appendChild(g)
  }

  function m(s, u, v, r, z) {
    var t, B, C, A;
    s = a.one(s);
    z = z || "ToolTip";
    if (!q) {
      h()
    }
    if (s.getStyle("visibility") === "hidden") {
      return
    }
    q.className = z;
    if (b) {
      if (k === s._node) {
        d();
        return
      }
      d()
    }
    r = (r === undefined) ? "" : r;
    v += r.length;
    n = document.getElementById(u);
    g.innerHTML = n.innerHTML + r;
    g.style.width = "auto";
    q.style.display = "block";
    q.style.visibility = "hidden";
    if (z !== "ToolTipSmall") {
      w = 150;
      if (v > 200) {
        w = 300
      } else {
        if (v > 100) {
          w = 200
        }
      }
      g.style.width = w + "px"
    }
    t = q.offsetWidth;
    C = s.getX();
    A = s.getY();
    if (z === "ToolTipSmall") {
      C -= Math.round((t - s.get("offsetWidth")) / 2) - 5;
      if (s._node.tip_placement === "below") {
        A += s.get("offsetHeight") + 10
      } else {
        A -= 22
      }
    } else {
      A += 20
    }
    B = f() - 40;
    if (C + t > B) {
      C = B - t
    }
    C = Math.max(10, C);
    q.style.left = C + "px";
    q.style.top = A + "px";
    b = 1;
    q.style.display = "block";
    q.style.visibility = "visible";
    k = s._node;
    document.onmousedown = l
  }

  function l(s) {
    var r = e(s);
    if (r === k || (o(r) && j(r))) {
      document.onmousedown = function () {
      }
    } else {
      d()
    }
  }

  function d(r) {
    if (r) {
      if (k !== r) {
        return
      }
    }
    document.onmousedown = function () {
    };
    if (!q) {
      return false
    }
    b = 0;
    q.style.display = "none";
    k = "null";
    return false
  }

  function j(r) {
    var s = r;
    while (s) {
      if (s === q) {
        return 1
      }
      s = s.parentNode
    }
    return 0
  }

  function o(r) {
    var s = r;
    while (s) {
      if (s.href) {
        return 1
      }
      s = s.parentNode
    }
    return 0
  }

  function i() {
    if (window.innerHeight) {
      return window.innerHeight
    } else {
      if (document.documentElement.clientHeight) {
        return document.documentElement.clientHeight
      } else {
        if (document.body.clientHeight) {
          return document.body.clientHeight
        }
      }
    }
  }

  function f() {
    if (window.innerWidth) {
      return window.innerWidth
    } else {
      if (document.documentElement.clientWidth) {
        return document.documentElement.clientWidth
      } else {
        if (document.body.clientWidth) {
          return document.body.clientWidth
        }
      }
    }
  }

  function e(r) {
    if (r && r.target) {
      return r.target
    }
    if (r && r.srcElement) {
      return r.srcElement
    }
    if (window.event) {
      return window.event.srcElement
    }
    return null
  }

  function p() {
    window.show_tooltip = m
  }

  a.tooltips = {init: p}
}, "0.0.1", {requires: ["node", "event", "event-delegate"]});
YUI.add("cache-simple", function (a) {
  CacheSimple = function () {
  };
  CacheSimple.prototype = {
    cache: {}, add: function (b, c, d) {
      this.cache[b] = {response: c, payload: d}
    }, retrieve: function (b) {
      return this.cache[b]
    }, clear: function () {
      this.cache = {}
    }
  };
  a.CacheSimple = CacheSimple
}, "0.0.1");
YUI.add("node-visibility", function (b) {
  var p, n, g, l, o, a, q, r, e = window, t = window.document, s, i;
  n = {resize: [], scroll: []};
  i = (F.config.flickr.flags.enable_uh_eyebrow && b.one("#eyebrow")) ? b.one("#eyebrow").get("offsetHeight") : 0;
  s = (F.config.flickr.flags.enable_global_nav && b.one("#global-nav")) ? b.one("#global-nav").get("offsetHeight") + i : 0;
  function k(u) {
    b.Array.each(n.scroll, function (v) {
      v(u)
    })
  }

  function c(u) {
    b.Array.each(n.resize, function (v) {
      v(u)
    })
  }

  g = {
    register: function (v, w) {
      var u = n[v].push(w);
      return {
        detach: function () {
          n[v][u] = function () {
          }
        }
      }
    }
  };
  b.on("scroll", b.betterThrottle(k, 50));
  b.on("resize", b.betterThrottle(c, 50));
  function j() {
    var u = j.region;
    if (!u) {
      u = {};
      u.height = b.DOM.winHeight();
      u.width = b.DOM.winWidth();
      u.top = Math.max(t.body.scrollTop || 0, t.documentElement.scrollTop || 0, e.pageYOffset || 0);
      u.left = Math.max(t.body.scrollLeft || 0, t.documentElement.scrollLeft || 0, e.pageXOffset || 0);
      u.right = u.left + u.width;
      u.bottom = u.top + u.height;
      u[0] = u.top;
      u[1] = u.left;
      j.region = u
    }
    return u
  }

  function d() {
    j.region = undefined
  }

  g.register("resize", d);
  g.register("scroll", d);
  function m(v, u) {
    var w = {};
    if (b.Lang.isNumber(u[0])) {
      w.left = v.left - u[0];
      w.right = v.right + u[0];
      w.width = v.width + u[0] * 2;
      if (w.width < 1) {
        w.width = 1;
        w.left = Math.floor((v.right + v.left) / 2);
        w.right = w.left + 1
      }
      w[0] = w.top
    }
    if (b.Lang.isNumber(u[1])) {
      w.top = v.top - u[1];
      w.bottom = v.bottom + u[1];
      w.height = v.height + u[1] * 2;
      if (w.height < 1) {
        w.height = 1;
        w.top = Math.floor((v.bottom + v.top) / 2);
        w.bottom = w.top + 1
      }
      w[1] = w.left
    }
    return w
  }

  l = function (w, v) {
    var u, x;
    for (u = w.ancestor(); u; u = u.ancestor()) {
      x = u.getStyle("overflow");
      if (x !== "" && x !== "visible") {
        v = v || w.get("region");
        if (!w.inRegion(u, false, v)) {
          return true
        }
      }
    }
    return false
  };
  function f(v) {
    var u, w;
    if (!f.cache) {
      f.cache = new b.CacheSimple()
    }
    u = f.cache;
    if (b.Lang.isString(v)) {
      w = u.retrieve(v);
      if (w && w.response && (new Date()).getTime() < w.payload.expires) {
        return w.response
      } else {
        return null
      }
    } else {
      return u
    }
  }

  function h(u, w) {
    var v = 500;
    if (!b.Lang.isString(u)) {
      return false
    }
    f().add(u, w, {expires: (new Date()).getTime() + v});
    return true
  }

  o = function (x, u) {
    var v, A, y, w, z;
    v = true;
    u = u ? q(u) : [0, 0];
    y = x.toString();
    z = f(y);
    w = z || {};
    if (v) {
      if (!b.Lang.isString(w.display)) {
        w.display = x.getStyle("display")
      }
      if (!b.Lang.isNumber(w.offsetHeight)) {
        w.offsetHeight = x.get("offsetHeight")
      }
      if (!b.Lang.isNumber(w.offsetWidth)) {
        w.offsetWidth = x.get("offsetWidth")
      }
      if (w.display === "block" && (w.offsetHeight === 0 || w.offsetWidth === 0)) {
        v = false
      }
    }
    if (v) {
      A = j();
      if (!w.region) {
        w.region = x.get("region")
      }
      if (!x.inRegion(m(A, u), false, w.region)) {
        v = false
      }
    }
    if (v) {
      if (!b.Lang.isBoolean(w.hidden_by_overflow)) {
        w.hidden_by_overflow = l(x, w.region)
      }
      if (w.hidden_by_overflow) {
        v = false
      }
    }
    if (!z) {
      h(y, w)
    }
    return v
  };
  a = (function () {
    var u = false, w = {}, C, v, D, B, y, x, A, z;
    C = function () {
      if (!u) {
        A = g.register("scroll", y);
        z = g.register("resize", y);
        u = true
      }
    };
    v = function () {
      if (u) {
        A.detach();
        z.detach();
        u = false
      }
    };
    D = function (H) {
      var E, G;
      if (w[H]) {
        delete w[H];
        G = true;
        for (E in w) {
          if (w.hasOwnProperty(E)) {
            G = false;
            break
          }
        }
        if (G) {
          v()
        }
        return true
      }
      return undefined
    };
    B = function (G) {
      var E = w[G];
      if (b.Lang.isObject(E)) {
        if (o(E.node, E.threshold)) {
          E.callback.call(E.oScope, E.arg);
          D(G)
        }
      }
    };
    y = function () {
      for (var E in w) {
        if (w.hasOwnProperty(E)) {
          B(E)
        }
      }
    };
    x = function (H, G, E) {
      if (b.Lang.isObject(w[H])) {
        w[H][G] = E;
        return true
      }
      return undefined
    };
    return function (J, L, G, E, H) {
      var I, K;
      J = b.one(J);
      if (!b.Lang.isObject(J) || !b.Lang.isFunction(L)) {
        return false
      }
      G = G ? q(G) : [0, 0];
      if (!E) {
        E = J
      }
      if (H === true) {
        H = E
      }
      if (!b.Lang.isObject(H)) {
        H = window
      }
      C();
      I = {node: J, callback: L, threshold: G, arg: E, oScope: H};
      K = b.guid();
      w[K] = I;
      b.later(0, window, B, K);
      return {
        cancel: function () {
          return D(K)
        }, set: function (N, M) {
          return x(K, N, M)
        }, check: function () {
          return B(K)
        }
      }
    }
  }());
  q = function (u) {
    if (b.Lang.isNumber(u)) {
      u = [u, u]
    }
    if (!b.Lang.isArray(u) || !b.Lang.isNumber(u[0]) || !b.Lang.isNumber(u[1])) {
      u = [0, 0]
    }
    return u
  };
  r = function (v, u, A, z, x) {
    var w, B;
    if (!v instanceof b.Node) {
      return false
    }
    if (!v.inViewportRegion(true) || x) {
      if (typeof u === "object") {
        align_to_bottom = u.bottom;
        z = u.onfinish;
        u = u.top
      } else {
        u = !!u
      }
      A = b.Lang.isNumber(A) ? A : 0;
      e.setTimeout(function () {
        if (!b.Anim) {
          v.scrollIntoView(u);
          if (z && typeof z === "function") {
            z()
          }
        } else {
          if (u) {
            B = v.getY() - A
          } else {
            if (align_to_bottom) {
              B = v.getY() - v.get("winHeight") + 5 + (2 * v.get("offsetHeight")) + A
            } else {
              B = v.getY() + v.get("offsetHeight") - v.get("winHeight") + 5
            }
          }
          B -= s;
          w = new b.Anim({node: b.one("window"), to: {scroll: [0, B]}, duration: 0.3, easing: b.Easing.easeOut});
          w.on("end", function () {
            if (z && typeof z === "function") {
              z()
            }
          });
          w.run()
        }
      }, 0)
    }
    return v
  };
  p = function (u) {
    this._node = u.host
  };
  p.NS = "vis";
  p.NAME = "NodeVisibilityPlugin";
  p.prototype = {
    isVisible: function (u) {
      return o(this._node, u)
    }, onVisible: function (x, v, u, w) {
      return a(this._node, x, v, u, w)
    }, animScrollIntoView: function (u, w, v) {
      return r(this._node, u, w, null, v)
    }, destroy: function () {
    }
  };
  b.Node.plug(p);
  b.NodeVisibility = p
}, "0.0.1", {
  requires: ["node", "node-pluginhost", "better-throttle", "cache-simple"],
  optional: ["anim", "anim-scroll"]
});
YUI.add("personmenu-transjax", function (b) {
  var a = {
    svn_bump: "",
    error_timeout: 'Uh oh! There was a problem contacting the server.',
    error_getting: 'Uh oh! There was a problem getting data from the server.'
  };
  b.transjax.add("personmenu", a)
}, "0.0.1", {requires: ["transjax-base"]});
YUI.add("personmenu-rapid", function (a) {
  a.on("personmenu:show", function (b) {
    if (b) {
      a.rapidTracker.addModules(b)
    }
  })
}, "0.0.1", {requires: F.config.modules["personmenu-rapid"].requires || []});
YUI.add("personmenu", function (c) {
  var u, H, o, y, d, Q, A, x, F, T;
  var S = c.config.flickr.flags.enable_photo_page_icon_lite_sidebar ? 70 : 48;

  function O(V) {
    if (!O.is_init) {
      H = {
        open_on_icon_click: false,
        get_data_on_arrow_hover: true,
        show_delay: 100,
        hide_delay: 500,
        spinner_delay: 200,
        io_timeout: 10000,
        io_cache_ttl: 120000,
        zeus: false
      };
      if (!c.Lang.isObject(V)) {
        V = {}
      }
      H = c.mix(V, H);
      u = c.one("body");
      if (c.config.flickr.user.nsid || c.config.flickr.flags.enable_grease) {
        u.on("mouseover", b);
        u.on("mouseout", b);
        u.on("click", t);
        c.on("resize", t);
        c.on("contact_changer:change", L);
        c.on("contact_changer:open", M);
        c.on("PageContext:set", g)
      }
      O.is_init = true
    }
  }

  function h(W) {
    var V, X;
    if (!h.cache) {
      h.cache = new c.CacheSimple()
    }
    V = h.cache;
    if (c.Lang.isString(W)) {
      X = V.retrieve(W);
      if (X && X.response && (new Date()).getTime() < X.payload.expires) {
        return X.response
      } else {
        return null
      }
    } else {
      return V
    }
  }

  function f(V, W) {
    if (!c.Lang.isString(V)) {
      return false
    }
    h().add(V, W, {expires: (new Date()).getTime() + H.io_cache_ttl});
    return true
  }

  function n(V) {
    f(V, null)
  }

  function B(V) {
    return (function () {
      var W;
      return function () {
        var Z, aa, Y, X;
        if (!W || arguments.length !== W.length) {
          Z = true
        } else {
          Y = Array.prototype.slice.call(arguments);
          X = Array.prototype.slice.call(W);
          for (aa in Y) {
            if (Y.hasOwnProperty(aa)) {
              if (Y[aa] !== X[aa]) {
                Z = true;
                break
              }
            }
          }
        }
        if (Z) {
          V.apply(this, arguments)
        }
        W = arguments
      }
    }())
  }

  function l(V) {
    if (c.Lang.isString(V)) {
      V = c.one(V)
    }
    if (!V instanceof c.Node) {
      return false
    }
    return V
  }

  function b(V) {
    if (!V.target.hasClass("personmenu-trigger")) {
      return
    }
    switch (V.type) {
      case"mouseover":
        if ((d || A) && Q) {
          return
        }
        C(V.target);
        break;
      case"mouseout":
        N();
        break
    }
  }

  function L(V) {
    n(V.nsid)
  }

  function z(V) {
    switch (V.type) {
      case"mouseover":
        U();
        if (H.get_data_on_arrow_hover) {
          if (c.one(".personmenu .personmenu-arrow") && (V.target.test(".personmenu .personmenu-arrow") || c.one(".personmenu .personmenu-arrow").contains(V.target))) {
            if (!d && !h(o)) {
              P(o)
            }
          }
        }
        break;
      case"mouseout":
        if (!d && !A) {
          I()
        }
        break;
      case"click":
        if (c.one(".personmenu .personmenu-arrow") && (V.target.test(".personmenu .personmenu-arrow") || c.one(".personmenu .personmenu-arrow").contains(V.target))) {
          V.preventDefault();
          w()
        } else {
          if (H.zeus && (c.one(".personmenu .personmenu-more") && (V.target.test(".personmenu .personmenu-more") || c.one(".personmenu .personmenu-more").contains(V.target)))) {
            if (!d) {
              V.preventDefault();
              V.halt();
              k()
            }
          } else {
            if (H.open_on_icon_click && c.one(".personmenu .personmenu-icon-link") && (V.target.test(".personmenu .personmenu-icon-link") || c.one(".personmenu .personmenu-icon-link").contains(V.target))) {
              if (!d) {
                V.preventDefault();
                k()
              }
            } else {
              if (c.one(".personmenu .personmenu-relationship-change") && (V.target.test(".personmenu .personmenu-relationship-change") || c.one(".personmenu .personmenu-relationship-change").contains(V.target))) {
                if (c.config.modules["contact-changer"]) {
                  V.preventDefault();
                  s()
                }
                c.use("contact-changer", function (X) {
                  i();
                  X.contact_changer.show(o)
                })
              } else {
                if (c.one(".personmenu .photos-trigger") && V.target.test(".personmenu .photos-trigger")) {
                  var W = V.target.ancestor("li").one(".photos");
                  if (W) {
                    V.preventDefault();
                    W.toggleClass("photos-open")
                  }
                } else {
                  c.fire("personmenu:navigate", {id: p().get("id"), url: V.target.get("href")})
                }
              }
            }
          }
        }
        break
    }
  }

  function t(V) {
    if (V.type === "click") {
      if (H.open_on_icon_click && V.target.hasClass("personmenu-trigger")) {
        V.preventDefault();
        V.halt();
        k(V.target)
      } else {
        if (Q && !c.one(".personmenu").contains(V.target)) {
          M()
        }
      }
    }
    if (V.type === "resize") {
      if (Q) {
        m(y)
      }
    }
  }

  function g(V) {
    if (V.newVal !== "") {
      M()
    }
  }

  function U() {
    if (F) {
      window.clearTimeout(F);
      F = null
    }
  }

  function N() {
    if (x) {
      window.clearTimeout(x);
      x = null
    }
  }

  function C(V) {
    U();
    N();
    if (Q && !H.zeus) {
      r(V)
    } else {
      x = window.setTimeout(function () {
        x = null;
        r(V)
      }, H.show_delay)
    }
  }

  function I() {
    if (!F) {
      F = window.setTimeout(function () {
        F = null;
        M()
      }, H.hide_delay)
    }
  }

  function j(W) {
    var V;
    W = l(W);
    V = W.get("data-defer-src") || W.get("src");
    return V
  }

  function R(W) {
    var V;
    W = l(W);
    V = a(W);
    return V ? "/photos/" + V : false
  }

  function a(X) {
    var W, V;
    W = j(X);
    V = W.split("#")[1];
    return J(V) ? V : false
  }

  function J(V) {
    return (/^[0-9]+@N[0-9]{2}$/).test(V)
  }

  function p() {
    var V;
    if (!p.menu) {
      if (H.zeus) {
        V = '<div class="personmenu personmenu-hidden personmenu-zeus"><div class="personmenu-hd"><a data-track="icon-link" href="" class="personmenu-icon-link rapidnofollow"><img class="personmenu-icon"></a><span class="personmenu-spinner"></span><span class="personmenu-name"></span></div><div class="personmenu-bd"></div></div>'
      } else {
        V = '<div class="personmenu personmenu-hidden"><div class="personmenu-hd rapidnofollow"><a data-track="icon-link" href="" class="personmenu-icon-link rapidnofollow"><span class="personmenu-spinner"></span><img class="personmenu-icon"></a><a data-track="show-menu" href="" class="rapidnofollow personmenu-arrow" role="button"><span></span></a></div><span class="personmenu-hd-shadow"></span><div class="personmenu-bd"></div><span class="personmenu-bd-border-blocker"></span></div>'
      }
      c.one("body").append(V);
      p.menu = c.one(".personmenu");
      p.menu.on("mouseover", z);
      p.menu.on("mouseout", z);
      p.menu.on("click", z)
    }
    return p.menu
  }

  function w() {
    if (d) {
      r()
    } else {
      k()
    }
  }

  function q(V, W) {
    if (V) {
      p().one(".personmenu-icon-link").set("href", V)
    }
    if (W) {
      p().one(".personmenu-icon").set("src", W)
    }
  }

  q = B(q);
  function s() {
    A = true;
    p().addClass("personmenu-spinning");
    if (H.zeus) {
      if (p().one(".personmenu-spinner")) {
        p().one(".personmenu-spinner").addClass("personmenu-spinner-on")
      }
    } else {
      T = window.setTimeout(function () {
        p().one(".personmenu-spinner").addClass("personmenu-spinner-on");
        T = null
      }, H.spinner_delay)
    }
  }

  function i() {
    A = false;
    if (T) {
      window.clearTimeout(T);
      T = null
    }
    p().removeClass("personmenu-spinning");
    if (p().one(".personmenu-spinner")) {
      p().one(".personmenu-spinner").removeClass("personmenu-spinner-on")
    }
  }

  function G() {
    Q = true;
    p().removeClass("personmenu-hidden")
  }

  function M() {
    Q = false;
    p().addClass("personmenu-hidden")
  }

  function m(V) {
    var W, X;
    W = V.getXY();
    X = H.zeus ? 8 : 6;
    W[0] -= parseInt((S - V.get("width")) / 2, 10) + X;
    W[1] -= parseInt((S - V.get("height")) / 2, 10) + X;
    p().setStyle("position", "absolute");
    p().setStyle("left", W[0] + "px");
    p().setStyle("top", W[1] + "px")
  }

  function D(V) {
    var X, Z;
    X = R(V);
    Z = j(V);
    q(X, Z);
    if (H.zeus) {
      var W = a(V);
      var Y = '<ul><li><a href="/people/' + W + '" class="personmenu-item">Profile</a></li><li><a href="' + X + '" class="personmenu-item">Photostream</a></li><li class="personmenu-sep-bottom"><a href="/photos/' + W + '/favorites" class="personmenu-item">Favorites</a></li><li><a href="" class="personmenu-item personmenu-more">More...</a></li></ul>';
      p().one(".personmenu-bd").set("innerHTML", Y);
      p().one(".personmenu-name").set("innerHTML", W)
    }
  }

  D = B(D);
  function P(V) {
    var Y, X, W;
    P.in_progress_nsids = P.in_progress_nsids || {};
    Y = P.in_progress_nsids;
    X = {
      success: function (ac, ab, Z) {
        var aa = ab.responseText;
        if (aa) {
          f(Z, aa)
        }
        if (A && o === Z) {
          E(Z)
        }
      }, failure: function (ab, aa, Z) {
        if (A && o === Z) {
          if (aa.statusText === "timeout") {
            e(c.transjax.get("personmenu", "error_timeout"))
          } else {
            e(c.transjax.get("personmenu", "error_getting"))
          }
        }
      }, end: function (aa, Z) {
        delete Y[Z]
      }
    };
    W = "/personmenu_fragment.gne?nsid=" + V + "&magic_cookie=" + c.config.flickr.magic_cookie;
    if (H.zeus) {
      W = W + "&zeus=1"
    }
    if (Y[V]) {
      return false
    }
    Y[V] = V;
    c.io(W + "&cachebust=" + (new Date()).getTime(), {timeout: H.io_timeout, on: X, "arguments": V})
  }

  function E(V) {
    var W = h(V);
    if (W) {
      if (H.zeus) {
        p().set("innerHTML", W)
      } else {
        p().one(".personmenu-bd").set("innerHTML", W)
      }
      i();
      var X = y.getAttribute("data-menu-id");
      if (X) {
        p().set("id", X)
      } else {
        X = false
      }
      c.fire("personmenu:show", X);
      v()
    } else {
      s();
      P(V)
    }
  }

  function e(W) {
    var V = '<div class="alert">' + W + "</div>";
    p().one(".personmenu-bd").set("innerHTML", V);
    i();
    v()
  }

  function r(V) {
    var W;
    V = l(V) || y;
    if (!V) {
      return false
    }
    y = V;
    W = a(V);
    if (!W) {
      return false
    }
    o = W;
    i();
    K();
    D(V);
    m(V);
    G();
    if (H.zeus && !h(W)) {
      P(W)
    }
    return true
  }

  function k(V) {
    var W;
    V = l(V) || y;
    if (!V) {
      return false
    }
    y = V;
    W = a(V);
    if (!W) {
      return false
    }
    o = W;
    r(V);
    E(W);
    return true
  }

  function K() {
    p().addClass("personmenu-closed");
    p().removeClass("personmenu-open");
    d = false
  }

  function v() {
    p().removeClass("personmenu-closed");
    p().addClass("personmenu-open");
    d = true;
    p().one(".personmenu-bd").vis.animScrollIntoView()
  }

  c.personmenu = {init: O, showClosed: r, showOpen: k, hide: M}
}, "0.0.1", {
  requires: ["node", "anim", "anim-scroll", "node-visibility", "event-custom", "cache-simple", "io-base", "personmenu-transjax", "personmenu-css"],
  optional: ["contact-changer"]
});
(function () {
  var a = "flickr";
  YUI.add(a, function (c) {
    function b() {
      c.FlickrApp.init();
      if (c.config.flickr.flags.enable_grease || c.config.flickr.user && c.config.flickr.user.nsid) {
        c.personmenu.init()
      }
      if (c.config.flickr.sharing.use_share_this_v3) {
        c.use("share-this-v3-menu", function (h) {
          var i = (h.config.flickr.flags.enable_2013_photo_page && h.config.flickr.page_type === "photo") ? "br" : "t";
          var f, e;
          (function g() {
            function l(m) {
              var n = {x: 0, y: 0};
              while (m) {
                n.x += m.offsetLeft;
                n.y += m.offsetTop;
                m = m.offsetParent
              }
              return n
            }

            function j(m) {
              if (document.all) {
                return document.all[m]
              } else {
                if (document.getElementById) {
                  return document.getElementById(m)
                } else {
                  return null
                }
              }
            }

            var k = l(document.getElementById("share-this-v3-more-button"));
            if (k.y < 411) {
              i = "tr";
              f = true;
              e = true
            }
          })();
          h.shareThisV3Menu.init({arrowPosition: i, overrideRefresh: f, scroll: e})
        });
        if (c.config.flickr.sharing.share_immediately_service) {
          c.use("share-this-v3-dialog", function (e) {
            var f = e.config.flickr.sharing.share_immediately_service;
            e.shareThisV3Dialog.share_by_service(f.service_id, f.service_type_id)
          })
        }
      }
      if (c.config.flickr.flags.enable_tumblr_trackr) {
        c.use("tumblr-trackr", function (e) {
          e.tumblrTrackr.init()
        })
      }
      if (c.config.flickr.flags.view_count_on_visible) {
        c.ViewCount.onVisible("img.view-count-on-visible")
      }
      c.tooltips.init();
      if (window.devicePixelRatio > 1 && document.cookie.indexOf("rtna=1") === -1) {
        var d = new Date();
        d.setTime(d.getTime() + 2592000000);
        document.cookie = "rtna=1; expires=" + d.toGMTString() + "; path=/"
      }
      if (c.config.flickr.flags.enable_sitekey_fetcher) {
        window.setInterval(function () {
          if (c.config.flickrAPI && c.config.flickrAPI.api_key) {
            c.use("gallery-flickr-api", function (f) {
              var h, e, g;
              h = "flickr.site.getKey";
              e = {};
              g = {
                success: function (i) {
                  if (i && i.data && i.data.key && i.data.key._content && f.Lang.isString(i.data.key._content)) {
                    f.config.flickrAPI.api_key = i.data.key._content
                  }
                }, failure: function (i) {
                }
              };
              f.flickrAPI.callMethod(h, e, g)
            })
          }
        }, 7 * 60 * 60 * 1000)
      }
    }

    c.flickr = b
  }, "0.0.1", {requires: F.config.modules[a].requires || [], optional: F.config.modules[a].optional || []})
}());
YUI.add("popup-login", function (a) {
  var e = "/photo_grease_postlogin.gne", i = false, r = false, p = false, s, q = "head-upload-link", c = "signin-popup", m = /cookie_session=[^;]+/gi, b = a.global_dialog;

  function o() {
    var t = {
      method: "post", data: "random=0", on: {
        success: function (w, v, u) {
          if (v && (v.responseText === "1,1" || v.responseText === "1,0")) {
            a.fire("login:authenticated", v.responseText)
          } else {
            d()
          }
        }
      }
    };
    a.later(100, this, h);
    a.io("/fragment.gne?name=social-auth-fragment", t)
  }

  function h() {
    if (b) {
      b.show({loading: true, modal: true})
    }
  }

  function d() {
    if (b) {
      b.hide()
    }
  }

  function l(w) {
    var z = 650;
    var x;
    if (a.config.flickr.flags.enable_ads_on_login_page) {
      x = a.one(window).get("winWidth") || 0;
      if (!isNaN(z)) {
        z = Math.max(880, Math.min(1200, x))
      }
    }
    if (a.config.flickr.is_touch_device) {
      var v = e + "?d=" + window.location + "&notpopup=1";
      window.location = w + "?popup=0&redir=" + encodeURIComponent(v);
      return false
    }
    var u = w + "?popup=1&redir=" + e + "?d=" + window.location;
    try {
      s = window.open(u, "newWindow", "width=" + z + ",height=650,resizable=1,scrollbars=1,location=yes")
    } catch (y) {
      return true
    }
    try {
      if (s.focus) {
        s.focus()
      }
    } catch (t) {
    }
    a.later(500, this, function () {
      if (!s || s.closed || typeof s.closed === "undefined" || !i) {
        var A = e + "?d=" + window.location + "&notpopup=1";
        window.location = w + "?popup=0&redir=" + encodeURIComponent(A)
      }
    });
    return false
  }

  function j() {
    a.later(20, this, f);
    r = true;
    l("/signin")
  }

  var k = 0;

  function f() {
    if (document.cookie.match(m)) {
      r = false;
      o()
    } else {
      a.later(20, this, f)
    }
  }

  function g() {
    var t = false;
    if (s) {
      try {
        s.close();
        t = true
      } catch (u) {
      }
    }
    return t
  }

  function n() {
    if (a.config.flickr.user.nsid) {
      return
    }
    a.one("body").on("click", function (v) {
      var u = v.target.get("id");
      if (v.target.ancestor("." + c, true)) {
        v.preventDefault();
        v.halt();
        j()
      } else {
        if (u === q) {
          p = true;
          v.halt();
          j()
        }
      }
    });
    var t = a.one("window");
    t.on("login|blur", function (u) {
      i = true
    });
    t.on("login|focus", function (u) {
      i = false;
      if (r) {
        o()
      }
    });
    a.on("login:authenticated", function (v) {
      var u = window.location.toString();
      g();
      if (v === "1,1") {
        window.location = "/"
      } else {
        if (p) {
          window.location = "/photos/upload"
        } else {
          if (u.match(/\/new/i)) {
            window.location = "/"
          } else {
            if (window.location.pathname && window.location.pathname === "/") {
              window.location = "/"
            } else {
              window.location.reload()
            }
          }
        }
      }
    })
  }

  a.popup_login = {init: n}
}, "0.0.1", {requires: ["node", "event", "io-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("intl", function (e, t) {
  var n = {}, r = "yuiRootLang", i = "yuiActiveLang", s = [];
  e.mix(e.namespace("Intl"), {
    _mod: function (e) {
      return n[e] || (n[e] = {}), n[e]
    }, setLang: function (e, t) {
      var n = this._mod(e), s = n[i], o = !!n[t];
      return o && t !== s && (n[i] = t, this.fire("intl:langChange", {
        module: e,
        prevVal: s,
        newVal: t === r ? "" : t
      })), o
    }, getLang: function (e) {
      var t = this._mod(e)[i];
      return t === r ? "" : t
    }, add: function (e, t, n) {
      t = t || r, this._mod(e)[t] = n, this.setLang(e, t)
    }, get: function (t, n, r) {
      var s = this._mod(t), o;
      return r = r || s[i], o = s[r] || {}, n ? o[n] : e.merge(o)
    }, getAvailableLangs: function (t) {
      var n = e.Env._loader, r = n && n.moduleInfo[t], i = r && r.lang;
      return i ? i.concat() : s
    }
  }), e.augment(e.Intl, e.EventTarget), e.Intl.publish("intl:langChange", {emitFacade: !0})
}, "3.11.0", {requires: ["intl-base", "event-custom"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("escape", function (e, t) {
  var n = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
    "`": "&#x60;"
  }, r = {
    html: function (e) {
      return (e + "").replace(/[&<>"'\/`]/g, r._htmlReplacer)
    }, regex: function (e) {
      return (e + "").replace(/[\-$\^*()+\[\]{}|\\,.?\s]/g, "\\$&")
    }, _htmlReplacer: function (e) {
      return n[e]
    }
  };
  r.regexp = r.regex, e.Escape = r
}, "3.11.0", {requires: ["yui-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("autocomplete-base", function (e, t) {
  function T() {
  }

  var n = e.Escape, r = e.Lang, i = e.Array, s = e.Object, o = r.isFunction, u = r.isString, a = r.trim, f = e.Attribute.INVALID_VALUE, l = "_functionValidator", c = "_sourceSuccess", h = "allowBrowserAutocomplete", p = "inputNode", d = "query", v = "queryDelimiter", m = "requestTemplate", g = "results", y = "resultListLocator", b = "value", w = "valueChange", E = "clear", S = d, x = g;
  T.prototype = {
    initializer: function () {
      e.before(this._bindUIACBase, this, "bindUI"), e.before(this._syncUIACBase, this, "syncUI"), this.publish(E, {defaultFn: this._defClearFn}), this.publish(S, {defaultFn: this._defQueryFn}), this.publish(x, {defaultFn: this._defResultsFn})
    }, destructor: function () {
      this._acBaseEvents && this._acBaseEvents.detach(), delete this._acBaseEvents, delete this._cache, delete this._inputNode, delete this._rawSource
    }, clearCache: function () {
      return this._cache && (this._cache = {}), this
    }, sendRequest: function (t, n) {
      var r, i = this.get("source");
      return t || t === "" ? this._set(d, t) : t = this.get(d) || "", i && (n || (n = this.get(m)), r = n ? n.call(this, t) : t, i.sendRequest({
        query: t,
        request: r,
        callback: {success: e.bind(this._onResponse, this, t)}
      })), this
    }, _bindUIACBase: function () {
      var t = this.get(p), n = t && t.tokenInput;
      n && (t = n.get(p), this._set("tokenInput", n));
      if (!t) {
        e.error("No inputNode specified.");
        return
      }
      this._inputNode = t, this._acBaseEvents = new e.EventHandle([t.on(w, this._onInputValueChange, this), t.on("blur", this._onInputBlur, this), this.after(h + "Change", this._syncBrowserAutocomplete), this.after("sourceTypeChange", this._afterSourceTypeChange), this.after(w, this._afterValueChange)])
    }, _syncUIACBase: function () {
      this._syncBrowserAutocomplete(), this.set(b, this.get(p).get(b))
    }, _createArraySource: function (e) {
      var t = this;
      return {
        type: "array", sendRequest: function (n) {
          t[c](e.concat(), n)
        }
      }
    }, _createFunctionSource: function (e) {
      var t = this;
      return {
        type: "function", sendRequest: function (n) {
          function i(e) {
            t[c](e || [], n)
          }

          var r;
          (r = e(n.query, i)) && i(r)
        }
      }
    }, _createObjectSource: function (e) {
      var t = this;
      return {
        type: "object", sendRequest: function (n) {
          var r = n.query;
          t[c](s.owns(e, r) ? e[r] : [], n)
        }
      }
    }, _functionValidator: function (e) {
      return e === null || o(e)
    }, _getObjectValue: function (e, t) {
      if (!e)return;
      for (var n = 0, r = t.length; e && n < r; n++)e = e[t[n]];
      return e
    }, _parseResponse: function (e, t, r) {
      var i = {
        data: r,
        query: e,
        results: []
      }, s = this.get(y), o = [], u = t && t.results, a, f, l, c, h, p, d, v, m, g, b;
      u && s && (u = s.call(this, u));
      if (u && u.length) {
        a = this.get("resultFilters"), b = this.get("resultTextLocator");
        for (p = 0, d = u.length; p < d; ++p)m = u[p], g = b ? b.call(this, m) : m.toString(), o.push({
          display: n.html(g),
          raw: m,
          text: g
        });
        for (p = 0, d = a.length; p < d; ++p) {
          o = a[p].call(this, e, o.concat());
          if (!o)return;
          if (!o.length)break
        }
        if (o.length) {
          l = this.get("resultFormatter"), h = this.get("resultHighlighter"), v = this.get("maxResults"), v && v > 0 && o.length > v && (o.length = v);
          if (h) {
            c = h.call(this, e, o.concat());
            if (!c)return;
            for (p = 0, d = c.length; p < d; ++p)m = o[p], m.highlighted = c[p], m.display = m.highlighted
          }
          if (l) {
            f = l.call(this, e, o.concat());
            if (!f)return;
            for (p = 0, d = f.length; p < d; ++p)o[p].display = f[p]
          }
        }
      }
      i.results = o, this.fire(x, i)
    }, _parseValue: function (e) {
      var t = this.get(v);
      return t && (e = e.split(t), e = e[e.length - 1]), r.trimLeft(e)
    }, _setEnableCache: function (e) {
      this._cache = e ? {} : null
    }, _setLocator: function (e) {
      if (this[l](e))return e;
      var t = this;
      return e = e.toString().split("."), function (n) {
        return n && t._getObjectValue(n, e)
      }
    }, _setRequestTemplate: function (e) {
      return this[l](e) ? e : (e = e.toString(), function (t) {
        return r.sub(e, {query: encodeURIComponent(t)})
      })
    }, _setResultFilters: function (t) {
      var n, s;
      return t === null ? [] : (n = e.AutoCompleteFilters, s = function (e) {
        return o(e) ? e : u(e) && n && o(n[e]) ? n[e] : !1
      }, r.isArray(t) ? (t = i.map(t, s), i.every(t, function (e) {
        return !!e
      }) ? t : f) : (t = s(t), t ? [t] : f))
    }, _setResultHighlighter: function (t) {
      var n;
      return this[l](t) ? t : (n = e.AutoCompleteHighlighters, u(t) && n && o(n[t]) ? n[t] : f)
    }, _setSource: function (t) {
      var n = this.get("sourceType") || r.type(t), i;
      return t && o(t.sendRequest) || t === null || n === "datasource" ? (this._rawSource = t, t) : (i = T.SOURCE_TYPES[n]) ? (this._rawSource = t, r.isString(i) ? this[i](t) : i(t)) : (e.error("Unsupported source type '" + n + "'. Maybe autocomplete-sources isn't loaded?"), f)
    }, _sourceSuccess: function (e, t) {
      t.callback.success({data: e, response: {results: e}})
    }, _syncBrowserAutocomplete: function () {
      var e = this.get(p);
      e.get("nodeName").toLowerCase() === "input" && e.setAttribute("autocomplete", this.get(h) ? "on" : "off")
    }, _updateValue: function (e) {
      var t = this.get(v), n, s, o;
      e = r.trimLeft(e), t && (n = a(t), o = i.map(a(this.get(b)).split(t), a), s = o.length, s > 1 && (o[s - 1] = e, e = o.join(n + " ")), e = e + n + " "), this.set(b, e)
    }, _afterSourceTypeChange: function (e) {
      this._rawSource && this.set("source", this._rawSource)
    }, _afterValueChange: function (e) {
      var t = e.newVal, n = this, r = e.src === T.UI_SRC, i, s, o, u;
      r || n._inputNode.set(b, t), o = n.get("minQueryLength"), u = n._parseValue(t) || "", o >= 0 && u.length >= o ? r ? (i = n.get("queryDelay"), s = function () {
        n.fire(S, {inputValue: t, query: u, src: e.src})
      }, i ? (clearTimeout(n._delay), n._delay = setTimeout(s, i)) : s()) : n._set(d, u) : (clearTimeout(n._delay), n.fire(E, {
        prevVal: e.prevVal ? n._parseValue(e.prevVal) : null,
        src: e.src
      }))
    }, _onInputBlur: function (e) {
      var t = this.get(v), n, i, s;
      if (t && !this.get("allowTrailingDelimiter")) {
        t = r.trimRight(t), s = i = this._inputNode.get(b);
        if (t)while ((i = r.trimRight(i)) && (n = i.length - t.length) && i.lastIndexOf(t) === n)i = i.substring(0, n); else i = r.trimRight(i);
        i !== s && this.set(b, i)
      }
    }, _onInputValueChange: function (e) {
      var t = e.newVal;
      t !== this.get(b) && this.set(b, t, {src: T.UI_SRC})
    }, _onResponse: function (e, t) {
      e === (this.get(d) || "") && this._parseResponse(e || "", t.response, t.data)
    }, _defClearFn: function () {
      this._set(d, null), this._set(g, [])
    }, _defQueryFn: function (e) {
      this.sendRequest(e.query)
    }, _defResultsFn: function (e) {
      this._set(g, e[g])
    }
  }, T.ATTRS = {
    allowBrowserAutocomplete: {value: !1},
    allowTrailingDelimiter: {value: !1},
    enableCache: {lazyAdd: !1, setter: "_setEnableCache", value: !0},
    inputNode: {setter: e.one, writeOnce: "initOnly"},
    maxResults: {value: 0},
    minQueryLength: {value: 1},
    query: {readOnly: !0, value: null},
    queryDelay: {value: 100},
    queryDelimiter: {value: null},
    requestTemplate: {setter: "_setRequestTemplate", value: null},
    resultFilters: {setter: "_setResultFilters", value: []},
    resultFormatter: {validator: l, value: null},
    resultHighlighter: {setter: "_setResultHighlighter", value: null},
    resultListLocator: {setter: "_setLocator", value: null},
    results: {readOnly: !0, value: []},
    resultTextLocator: {setter: "_setLocator", value: null},
    source: {setter: "_setSource", value: null},
    sourceType: {value: null},
    tokenInput: {readOnly: !0},
    value: {value: ""}
  }, T._buildCfg = {aggregates: ["SOURCE_TYPES"], statics: ["UI_SRC"]}, T.SOURCE_TYPES = {
    array: "_createArraySource",
    "function": "_createFunctionSource",
    object: "_createObjectSource"
  }, T.UI_SRC = e.Widget && e.Widget.UI_SRC || "ui", e.AutoCompleteBase = T
}, "3.11.0", {
  optional: ["autocomplete-sources"],
  requires: ["array-extras", "base-build", "escape", "event-valuechange", "node-base"]
});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("autocomplete-sources", function (e, t) {
  var n = e.AutoCompleteBase, r = e.Lang, i = "_sourceSuccess", s = "maxResults", o = "requestTemplate", u = "resultListLocator";
  e.mix(n.prototype, {
    _YQL_SOURCE_REGEX: /^(?:select|set|use)\s+/i, _beforeCreateObjectSource: function (t) {
      return t instanceof e.Node && t.get("nodeName").toLowerCase() === "select" ? this._createSelectSource(t) : e.JSONPRequest && t instanceof e.JSONPRequest ? this._createJSONPSource(t) : this._createObjectSource(t)
    }, _createIOSource: function (t) {
      function a(n) {
        var o = n.request;
        if (r._cache && o in r._cache) {
          r[i](r._cache[o], n);
          return
        }
        s && s.isInProgress() && s.abort(), s = e.io(r._getXHRUrl(t, n), {
          on: {
            success: function (t, s) {
              var u;
              try {
                u = e.JSON.parse(s.responseText)
              } catch (a) {
                e.error("JSON parse error", a)
              }
              u && (r._cache && (r._cache[o] = u), r[i](u, n))
            }
          }
        })
      }

      var n = {type: "io"}, r = this, s, o, u;
      return n.sendRequest = function (t) {
        o = t;
        if (u)return;
        u = !0, e.use("io-base", "json-parse", function () {
          n.sendRequest = a, a(o)
        })
      }, n
    }, _createJSONPSource: function (t) {
      function u(e) {
        var n = e.request, s = e.query;
        if (r._cache && n in r._cache) {
          r[i](r._cache[n], e);
          return
        }
        t._config.on.success = function (t) {
          r._cache && (r._cache[n] = t), r[i](t, e)
        }, t.send(s)
      }

      var n = {type: "jsonp"}, r = this, s, o;
      return n.sendRequest = function (i) {
        s = i;
        if (o)return;
        o = !0, e.use("jsonp", function () {
          t instanceof e.JSONPRequest || (t = new e.JSONPRequest(t, {format: e.bind(r._jsonpFormatter, r)})), n.sendRequest = u, u(s)
        })
      }, n
    }, _createSelectSource: function (e) {
      var t = this;
      return {
        type: "select", sendRequest: function (n) {
          var r = [];
          e.get("options").each(function (e) {
            r.push({
              html: e.get("innerHTML"),
              index: e.get("index"),
              node: e,
              selected: e.get("selected"),
              text: e.get("text"),
              value: e.get("value")
            })
          }), t[i](r, n)
        }
      }
    }, _createStringSource: function (e) {
      return this._YQL_SOURCE_REGEX.test(e) ? this._createYQLSource(e) : e.indexOf("{callback}") !== -1 ? this._createJSONPSource(e) : this._createIOSource(e)
    }, _createYQLSource: function (t) {
      function c(o) {
        var u = o.query, a = n.get("yqlEnv"), f = n.get(s), c, h, p;
        p = r.sub(t, {maxResults: f > 0 ? f : 1e3, request: o.request, query: u});
        if (n._cache && p in n._cache) {
          n[i](n._cache[p], o);
          return
        }
        c = function (e) {
          n._cache && (n._cache[p] = e), n[i](e, o)
        }, h = {proto: n.get("yqlProtocol")}, l ? (l._callback = c, l._opts = h, l._params.q = p, a && (l._params.env = a)) : l = new e.YQLRequest(p, {
          on: {success: c},
          allowCache: !1
        }, a ? {env: a} : null, h), l.send()
      }

      var n = this, o = {type: "yql"}, a, f, l;
      return n.get(u) || n.set(u, n._defaultYQLLocator), o.sendRequest = function (t) {
        a = t, f || (f = !0, e.use("yql", function () {
          o.sendRequest = c, c(a)
        }))
      }, o
    }, _defaultYQLLocator: function (t) {
      var n = t && t.query && t.query.results, i;
      return n && r.isObject(n) ? (i = e.Object.values(n) || [], n = i.length === 1 ? i[0] : i, r.isArray(n) || (n = [n])) : n = [], n
    }, _getXHRUrl: function (e, t) {
      var n = this.get(s);
      return t.query !== t.request && (e += t.request), r.sub(e, {
        maxResults: n > 0 ? n : 1e3,
        query: encodeURIComponent(t.query)
      })
    }, _jsonpFormatter: function (e, t, n) {
      var i = this.get(s), u = this.get(o);
      return u && (e += u(n)), r.sub(e, {callback: t, maxResults: i > 0 ? i : 1e3, query: encodeURIComponent(n)})
    }
  }), e.mix(n.ATTRS, {
    yqlEnv: {value: null},
    yqlProtocol: {value: "http"}
  }), e.mix(n.SOURCE_TYPES, {
    io: "_createIOSource",
    jsonp: "_createJSONPSource",
    object: "_beforeCreateObjectSource",
    select: "_createSelectSource",
    string: "_createStringSource",
    yql: "_createYQLSource"
  }, !0)
}, "3.11.0", {optional: ["io-base", "json-parse", "jsonp", "yql"], requires: ["autocomplete-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("lang/autocomplete-list_en", function (e) {
  e.Intl.add("autocomplete-list", "en", {
    item_selected: "{item} selected.",
    items_available: "Suggestions are available. Use up and down arrows to select."
  })
}, "3.11.0");
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("selector-css2", function (e, t) {
  var n = "parentNode", r = "tagName", i = "attributes", s = "combinator", o = "pseudos", u = e.Selector, a = {
    _reRegExpTokens: /([\^\$\?\[\]\*\+\-\.\(\)\|\\])/,
    SORT_RESULTS: !0,
    _isXML: function () {
      var t = e.config.doc.createElement("div").tagName !== "DIV";
      return t
    }(),
    shorthand: {"\\#(-?[_a-z0-9]+[-\\w\\uE000]*)": "[id=$1]", "\\.(-?[_a-z]+[-\\w\\uE000]*)": "[className~=$1]"},
    operators: {
      "": function (t, n) {
        return e.DOM.getAttribute(t, n) !== ""
      }, "~=": "(?:^|\\s+){val}(?:\\s+|$)", "|=": "^{val}-?"
    },
    pseudos: {
      "first-child": function (t) {
        return e.DOM._children(t[n])[0] === t
      }
    },
    _bruteQuery: function (t, n, r) {
      var i = [], s = [], o, a = u._tokenize(t), f = a[a.length - 1], l = e.DOM._getDoc(n), c, h, p, d, v;
      if (f) {
        h = f.id, p = f.className, d = f.tagName || "*";
        if (n.getElementsByTagName)h && (n.all || n.nodeType === 9 || e.DOM.inDoc(n)) ? s = e.DOM.allById(h, n) : p ? s = n.getElementsByClassName(p) : s = n.getElementsByTagName(d); else {
          o = [], c = n.firstChild, v = d === "*";
          while (c) {
            while (c)c.tagName > "@" && (v || c.tagName === d) && s.push(c), o.push(c), c = c.firstChild;
            while (o.length > 0 && !c)c = o.pop().nextSibling
          }
        }
        s.length && (i = u._filterNodes(s, a, r))
      }
      return i
    },
    _filterNodes: function (t, n, r) {
      var i = 0, s, o = n.length, a = o - 1, f = [], l = t[0], c = l, h = e.Selector.getters, p, d, v, m, g, y, b, w;
      for (i = 0; c = l = t[i++];) {
        a = o - 1, m = null;
        e:while (c && c.tagName) {
          v = n[a], b = v.tests, s = b.length;
          if (s && !g)while (w = b[--s]) {
            p = w[1], h[w[0]] ? y = h[w[0]](c, w[0]) : (y = c[w[0]], w[0] === "tagName" && !u._isXML && (y = y.toUpperCase()), typeof y != "string" && y !== undefined && y.toString ? y = y.toString() : y === undefined && c.getAttribute && (y = c.getAttribute(w[0], 2)));
            if (p === "=" && y !== w[2] || typeof p != "string" && p.test && !p.test(y) || !p.test && typeof p == "function" && !p(c, w[0], w[2])) {
              if (c = c[m])while (c && (!c.tagName || v.tagName && v.tagName !== c.tagName))c = c[m];
              continue e
            }
          }
          a--;
          if (!!g || !(d = v.combinator)) {
            f.push(l);
            if (r)return f;
            break
          }
          m = d.axis, c = c[m];
          while (c && !c.tagName)c = c[m];
          d.direct && (m = null)
        }
      }
      return l = c = null, f
    },
    combinators: {
      " ": {axis: "parentNode"},
      ">": {axis: "parentNode", direct: !0},
      "+": {axis: "previousSibling", direct: !0}
    },
    _parsers: [{
      name: i,
      re: /^\uE003(-?[a-z]+[\w\-]*)+([~\|\^\$\*!=]=?)?['"]?([^\uE004'"]*)['"]?\uE004/i,
      fn: function (t, n) {
        var r = t[2] || "", i = u.operators, s = t[3] ? t[3].replace(/\\/g, "") : "", o;
        if (t[1] === "id" && r === "=" || t[1] === "className" && e.config.doc.documentElement.getElementsByClassName && (r === "~=" || r === "="))n.prefilter = t[1], t[3] = s, n[t[1]] = t[1] === "id" ? t[3] : s;
        r in i && (o = i[r], typeof o == "string" && (t[3] = s.replace(u._reRegExpTokens, "\\$1"), o = new RegExp(o.replace("{val}", t[3]))), t[2] = o);
        if (!n.last || n.prefilter !== t[1])return t.slice(1)
      }
    }, {
      name: r, re: /^((?:-?[_a-z]+[\w-]*)|\*)/i, fn: function (e, t) {
        var n = e[1];
        u._isXML || (n = n.toUpperCase()), t.tagName = n;
        if (n !== "*" && (!t.last || t.prefilter))return [r, "=", n];
        t.prefilter || (t.prefilter = "tagName")
      }
    }, {
      name: s, re: /^\s*([>+~]|\s)\s*/, fn: function (e, t) {
      }
    }, {
      name: o, re: /^:([\-\w]+)(?:\uE005['"]?([^\uE005]*)['"]?\uE006)*/i, fn: function (e, t) {
        var n = u[o][e[1]];
        return n ? (e[2] && (e[2] = e[2].replace(/\\/g, "")), [e[2], n]) : !1
      }
    }],
    _getToken: function (e) {
      return {tagName: null, id: null, className: null, attributes: {}, combinator: null, tests: []}
    },
    _tokenize: function (t) {
      t = t || "", t = u._parseSelector(e.Lang.trim(t));
      var n = u._getToken(), r = t, i = [], o = !1, a, f, l, c;
      e:do {
        o = !1;
        for (l = 0; c = u._parsers[l++];)if (a = c.re.exec(t)) {
          c.name !== s && (n.selector = t), t = t.replace(a[0], ""), t.length || (n.last = !0), u._attrFilters[a[1]] && (a[1] = u._attrFilters[a[1]]), f = c.fn(a, n);
          if (f === !1) {
            o = !1;
            break e
          }
          f && n.tests.push(f);
          if (!t.length || c.name === s)i.push(n), n = u._getToken(n), c.name === s && (n.combinator = e.Selector.combinators[a[1]]);
          o = !0
        }
      } while (o && t.length);
      if (!o || t.length)i = [];
      return i
    },
    _replaceMarkers: function (e) {
      return e = e.replace(/\[/g, "\ue003"), e = e.replace(/\]/g, "\ue004"), e = e.replace(/\(/g, "\ue005"), e = e.replace(/\)/g, "\ue006"), e
    },
    _replaceShorthand: function (t) {
      var n = e.Selector.shorthand, r;
      for (r in n)n.hasOwnProperty(r) && (t = t.replace(new RegExp(r, "gi"), n[r]));
      return t
    },
    _parseSelector: function (t) {
      var n = e.Selector._replaceSelector(t), t = n.selector;
      return t = e.Selector._replaceShorthand(t), t = e.Selector._restore("attr", t, n.attrs), t = e.Selector._restore("pseudo", t, n.pseudos), t = e.Selector._replaceMarkers(t), t = e.Selector._restore("esc", t, n.esc), t
    },
    _attrFilters: {"class": "className", "for": "htmlFor"},
    getters: {
      href: function (t, n) {
        return e.DOM.getAttribute(t, n)
      }, id: function (t, n) {
        return e.DOM.getId(t)
      }
    }
  };
  e.mix(e.Selector, a, !0), e.Selector.getters.src = e.Selector.getters.rel = e.Selector.getters.href, e.Selector.useNative && e.config.doc.querySelector && (e.Selector.shorthand["\\.(-?[_a-z]+[-\\w]*)"] = "[class~=$1]")
}, "3.11.0", {requires: ["selector-native"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("selector-css3", function (e, t) {
  e.Selector._reNth = /^(?:([\-]?\d*)(n){1}|(odd|even)$)*([\-+]?\d*)$/, e.Selector._getNth = function (t, n, r, i) {
    e.Selector._reNth.test(n);
    var s = parseInt(RegExp.$1, 10), o = RegExp.$2, u = RegExp.$3, a = parseInt(RegExp.$4, 10) || 0, f = [], l = e.DOM._children(t.parentNode, r), c;
    u ? (s = 2, c = "+", o = "n", a = u === "odd" ? 1 : 0) : isNaN(s) && (s = o ? 1 : 0);
    if (s === 0)return i && (a = l.length - a + 1), l[a - 1] === t ? !0 : !1;
    s < 0 && (i = !!i, s = Math.abs(s));
    if (!i) {
      for (var h = a - 1, p = l.length; h < p; h += s)if (h >= 0 && l[h] === t)return !0
    } else for (var h = l.length - a, p = l.length; h >= 0; h -= s)if (h < p && l[h] === t)return !0;
    return !1
  }, e.mix(e.Selector.pseudos, {
    root: function (e) {
      return e === e.ownerDocument.documentElement
    }, "nth-child": function (t, n) {
      return e.Selector._getNth(t, n)
    }, "nth-last-child": function (t, n) {
      return e.Selector._getNth(t, n, null, !0)
    }, "nth-of-type": function (t, n) {
      return e.Selector._getNth(t, n, t.tagName)
    }, "nth-last-of-type": function (t, n) {
      return e.Selector._getNth(t, n, t.tagName, !0)
    }, "last-child": function (t) {
      var n = e.DOM._children(t.parentNode);
      return n[n.length - 1] === t
    }, "first-of-type": function (t) {
      return e.DOM._children(t.parentNode, t.tagName)[0] === t
    }, "last-of-type": function (t) {
      var n = e.DOM._children(t.parentNode, t.tagName);
      return n[n.length - 1] === t
    }, "only-child": function (t) {
      var n = e.DOM._children(t.parentNode);
      return n.length === 1 && n[0] === t
    }, "only-of-type": function (t) {
      var n = e.DOM._children(t.parentNode, t.tagName);
      return n.length === 1 && n[0] === t
    }, empty: function (e) {
      return e.childNodes.length === 0
    }, not: function (t, n) {
      return !e.Selector.test(t, n)
    }, contains: function (e, t) {
      var n = e.innerText || e.textContent || "";
      return n.indexOf(t) > -1
    }, checked: function (e) {
      return e.checked === !0 || e.selected === !0
    }, enabled: function (e) {
      return e.disabled !== undefined && !e.disabled
    }, disabled: function (e) {
      return e.disabled
    }
  }), e.mix(e.Selector.operators, {
    "^=": "^{val}",
    "$=": "{val}$",
    "*=": "{val}"
  }), e.Selector.combinators["~"] = {axis: "previousSibling"}
}, "3.11.0", {requires: ["selector-native", "selector-css2"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("shim-plugin", function (e, t) {
  function n(e) {
    this.init(e)
  }

  n.CLASS_NAME = "yui-node-shim", n.TEMPLATE = '<iframe class="' + n.CLASS_NAME + '" frameborder="0" title="Node Stacking Shim"' + 'src="javascript:false" tabindex="-1" role="presentation"' + 'style="position:absolute; z-index:-1;"></iframe>', n.prototype = {
    init: function (e) {
      this._host = e.host, this.initEvents(), this.insert(), this.sync()
    }, initEvents: function () {
      this._resizeHandle = this._host.on("resize", this.sync, this)
    }, getShim: function () {
      return this._shim || (this._shim = e.Node.create(n.TEMPLATE, this._host.get("ownerDocument")))
    }, insert: function () {
      var e = this._host;
      this._shim = e.insertBefore(this.getShim(), e.get("firstChild"))
    }, sync: function () {
      var e = this._shim, t = this._host;
      e && e.setAttrs({width: t.getStyle("width"), height: t.getStyle("height")})
    }, destroy: function () {
      var e = this._shim;
      e && e.remove(!0), this._resizeHandle.detach()
    }
  }, n.NAME = "Shim", n.NS = "shim", e.namespace("Plugin"), e.Plugin.Shim = n
}, "3.11.0", {requires: ["node-style", "node-pluginhost"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("autocomplete-list", function (e, t) {
  var n = e.Lang, r = e.Node, i = e.Array, s = e.UA.ie && e.UA.ie < 7, o = 9, u = "_CLASS_ITEM", a = "_CLASS_ITEM_ACTIVE", f = "_CLASS_ITEM_HOVER", l = "_SELECTOR_ITEM", c = "activeItem", h = "alwaysShowList", p = "circular", d = "hoveredItem", v = "id", m = "item", g = "list", y = "result", b = "results", w = "visible", E = "width", S = "select", x = e.Base.create("autocompleteList", e.Widget, [e.AutoCompleteBase, e.WidgetPosition, e.WidgetPositionAlign], {
    ARIA_TEMPLATE: "<div/>", ITEM_TEMPLATE: "<li/>", LIST_TEMPLATE: "<ul/>", UI_EVENTS: function () {
      var t = e.merge(e.Node.DOM_EVENTS);
      return delete t.valuechange, delete t.valueChange, t
    }(), initializer: function () {
      var t = this.get("inputNode");
      if (!t) {
        e.error("No inputNode specified.");
        return
      }
      this._inputNode = t, this._listEvents = [], this.DEF_PARENT_NODE = t.get("parentNode"), this[u] = this.getClassName(m), this[a] = this.getClassName(m, "active"), this[f] = this.getClassName(m, "hover"), this[l] = "." + this[u], this.publish(S, {defaultFn: this._defSelectFn})
    }, destructor: function () {
      while (this._listEvents.length)this._listEvents.pop().detach();
      this._ariaNode && this._ariaNode.remove().destroy(!0)
    }, bindUI: function () {
      this._bindInput(), this._bindList()
    }, renderUI: function () {
      var t = this._createAriaNode(), n = this.get("boundingBox"), r = this.get("contentBox"), i = this._inputNode, o = this._createListNode(), u = i.get("parentNode");
      i.addClass(this.getClassName("input")).setAttrs({
        "aria-autocomplete": g,
        "aria-expanded": !1,
        "aria-owns": o.get("id")
      }), u.append(t), s && n.plug(e.Plugin.Shim), this._ariaNode = t, this._boundingBox = n, this._contentBox = r, this._listNode = o, this._parentNode = u
    }, syncUI: function () {
      this._syncResults(), this._syncVisibility()
    }, hide: function () {
      return this.get(h) ? this : this.set(w, !1)
    }, selectItem: function (e, t) {
      if (e) {
        if (!e.hasClass(this[u]))return this
      } else {
        e = this.get(c);
        if (!e)return this
      }
      return this.fire(S, {itemNode: e, originEvent: t || null, result: e.getData(y)}), this
    }, _activateNextItem: function () {
      var e = this.get(c), t;
      return e ? t = e.next(this[l]) || (this.get(p) ? null : e) : t = this._getFirstItemNode(), this.set(c, t), this
    }, _activatePrevItem: function () {
      var e = this.get(c), t = e ? e.previous(this[l]) : this.get(p) && this._getLastItemNode();
      return this.set(c, t || null), this
    }, _add: function (t) {
      var r = [];
      return i.each(n.isArray(t) ? t : [t], function (e) {
        r.push(this._createItemNode(e).setData(y, e))
      }, this), r = e.all(r), this._listNode.append(r.toFrag()), r
    }, _ariaSay: function (e, t) {
      var r = this.get("strings." + e);
      this._ariaNode.set("text", t ? n.sub(r, t) : r)
    }, _bindInput: function () {
      var e = this._inputNode, t, n, r;
      this.get("align") === null && (r = this.get("tokenInput"), t = r && r.get("boundingBox") || e, this.set("align", {
        node: t,
        points: ["tl", "bl"]
      }), !this.get(E) && (n = t.get("offsetWidth")) && this.set(E, n)), this._listEvents = this._listEvents.concat([e.after("blur", this._afterListInputBlur, this), e.after("focus", this._afterListInputFocus, this)])
    }, _bindList: function () {
      this._listEvents = this._listEvents.concat([e.one("doc").after("click", this._afterDocClick, this), e.one("win").after("windowresize", this._syncPosition, this), this.after({
        mouseover: this._afterMouseOver,
        mouseout: this._afterMouseOut,
        activeItemChange: this._afterActiveItemChange,
        alwaysShowListChange: this._afterAlwaysShowListChange,
        hoveredItemChange: this._afterHoveredItemChange,
        resultsChange: this._afterResultsChange,
        visibleChange: this._afterVisibleChange
      }), this._listNode.delegate("click", this._onItemClick, this[l], this)])
    }, _clear: function () {
      this.set(c, null), this._set(d, null), this._listNode.get("children").remove(!0)
    }, _createAriaNode: function () {
      var e = r.create(this.ARIA_TEMPLATE);
      return e.addClass(this.getClassName("aria")).setAttrs({"aria-live": "polite", role: "status"})
    }, _createItemNode: function (t) {
      var n = r.create(this.ITEM_TEMPLATE);
      return n.addClass(this[u]).setAttrs({
        id: e.stamp(n),
        role: "option"
      }).setAttribute("data-text", t.text).append(t.display)
    }, _createListNode: function () {
      var t = this.get("listNode") || r.create(this.LIST_TEMPLATE);
      return t.addClass(this.getClassName(g)).setAttrs({
        id: e.stamp(t),
        role: "listbox"
      }), this._set("listNode", t), this.get("contentBox").append(t), t
    }, _getFirstItemNode: function () {
      return this._listNode.one(this[l])
    }, _getLastItemNode: function () {
      return this._listNode.one(this[l] + ":last-child")
    }, _syncPosition: function () {
      this._syncUIPosAlign(), this._syncShim()
    }, _syncResults: function (e) {
      e || (e = this.get(b)), this._clear(), e.length && (this._add(e), this._ariaSay("items_available")), this._syncPosition(), this.get("activateFirstItem") && !this.get(c) && this.set(c, this._getFirstItemNode())
    }, _syncShim: s ? function () {
      var e = this._boundingBox.shim;
      e && e.sync()
    } : function () {
    }, _syncVisibility: function (t) {
      this.get(h) && (t = !0, this.set(w, t)), typeof t == "undefined" && (t = this.get(w)), this._inputNode.set("aria-expanded", t), this._boundingBox.set("aria-hidden", !t), t ? this._syncPosition() : (this.set(c, null), this._set(d, null), this._boundingBox.get("offsetWidth")), e.UA.ie === 7 && e.one("body").addClass("yui3-ie7-sucks").removeClass("yui3-ie7-sucks")
    }, _afterActiveItemChange: function (t) {
      var n = this._inputNode, r = t.newVal, i = t.prevVal, s;
      i && i._node && i.removeClass(this[a]), r ? (r.addClass(this[a]), n.set("aria-activedescendant", r.get(v))) : n.removeAttribute("aria-activedescendant"), this.get("scrollIntoView") && (s = r || n, (!s.inRegion(e.DOM.viewportRegion(), !0) || !s.inRegion(this._contentBox, !0)) && s.scrollIntoView())
    }, _afterAlwaysShowListChange: function (e) {
      this.set(w, e.newVal || this.get(b).length > 0)
    }, _afterDocClick: function (e) {
      var t = this._boundingBox, n = e.target;
      n !== this._inputNode && n !== t && n.ancestor("#" + t.get("id"), !0) && this.hide()
    }, _afterHoveredItemChange: function (e) {
      var t = e.newVal, n = e.prevVal;
      n && n.removeClass(this[f]), t && t.addClass(this[f])
    }, _afterListInputBlur: function () {
      this._listInputFocused = !1, this.get(w) && !this._mouseOverList && (this._lastInputKey !== o || !this.get("tabSelect") || !this.get(c)) && this.hide()
    }, _afterListInputFocus: function () {
      this._listInputFocused = !0
    }, _afterMouseOver: function (e) {
      var t = e.domEvent.target.ancestor(this[l], !0);
      this._mouseOverList = !0, t && this._set(d, t)
    }, _afterMouseOut: function () {
      this._mouseOverList = !1, this._set(d, null)
    }, _afterResultsChange: function (e) {
      this._syncResults(e.newVal
      ), this.get(h) || this.set(w, !!e.newVal.length)
    }, _afterVisibleChange: function (e) {
      this._syncVisibility(!!e.newVal)
    }, _onItemClick: function (e) {
      var t = e.currentTarget;
      this.set(c, t), this.selectItem(t, e)
    }, _defSelectFn: function (e) {
      var t = e.result.text;
      this._inputNode.focus(), this._updateValue(t), this._ariaSay("item_selected", {item: t}), this.hide()
    }
  }, {
    ATTRS: {
      activateFirstItem: {value: !1},
      activeItem: {setter: e.one, value: null},
      alwaysShowList: {value: !1},
      circular: {value: !0},
      hoveredItem: {readOnly: !0, value: null},
      listNode: {writeOnce: "initOnly", value: null},
      scrollIntoView: {value: !1},
      strings: {
        valueFn: function () {
          return e.Intl.get("autocomplete-list")
        }
      },
      tabSelect: {value: !0},
      visible: {value: !1}
    }, CSS_PREFIX: e.ClassNameManager.getClassName("aclist")
  });
  e.AutoCompleteList = x, e.AutoComplete = x
}, "3.11.0", {
  lang: ["en", "es", "hu", "it"],
  requires: ["autocomplete-base", "event-resize", "node-screen", "selector-css3", "shim-plugin", "widget", "widget-position", "widget-position-align"],
  skinnable: !0
});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("autocomplete-list-keys", function (e, t) {
  function u() {
    e.before(this._bindKeys, this, "bindUI"), this._initKeys()
  }

  var n = 40, r = 13, i = 27, s = 9, o = 38;
  u.prototype = {
    _initKeys: function () {
      var e = {}, t = {};
      e[n] = this._keyDown, t[r] = this._keyEnter, t[i] = this._keyEsc, t[s] = this._keyTab, t[o] = this._keyUp, this._keys = e, this._keysVisible = t
    }, destructor: function () {
      this._unbindKeys()
    }, _bindKeys: function () {
      this._keyEvents = this._inputNode.on("keydown", this._onInputKey, this)
    }, _unbindKeys: function () {
      this._keyEvents && this._keyEvents.detach(), this._keyEvents = null
    }, _keyDown: function () {
      this.get("visible") ? this._activateNextItem() : this.show()
    }, _keyEnter: function (e) {
      var t = this.get("activeItem");
      if (!t)return !1;
      this.selectItem(t, e)
    }, _keyEsc: function () {
      this.hide()
    }, _keyTab: function (e) {
      var t;
      if (this.get("tabSelect")) {
        t = this.get("activeItem");
        if (t)return this.selectItem(t, e), !0
      }
      return !1
    }, _keyUp: function () {
      this._activatePrevItem()
    }, _onInputKey: function (e) {
      var t, n = e.keyCode;
      this._lastInputKey = n, this.get("results").length && (t = this._keys[n], !t && this.get("visible") && (t = this._keysVisible[n]), t && t.call(this, e) !== !1 && e.preventDefault())
    }
  }, e.Base.mix(e.AutoCompleteList, [u])
}, "3.11.0", {requires: ["autocomplete-list", "base-build"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("autocomplete-plugin", function (e, t) {
  function r(e) {
    e.inputNode = e.host, !e.render && e.render !== !1 && (e.render = !0), r.superclass.constructor.apply(this, arguments)
  }

  var n = e.Plugin;
  e.extend(r, e.AutoCompleteList, {}, {
    NAME: "autocompleteListPlugin",
    NS: "ac",
    CSS_PREFIX: e.ClassNameManager.getClassName("aclist")
  }), n.AutoComplete = r, n.AutoCompleteList = r
}, "3.11.0", {requires: ["autocomplete-list", "node-pluginhost"]});
YUI.add("bo-selecta-transjax", function (a) {
  a.transjax.add("bo-selecta", {
    me: 'me',
    loading: 'Loading...',
    uber_contact_list_view_profile: 'View Profile',
    uber_contact_list_friend_and_family: 'Friend &amp; Family',
    uber_contact_list_friend: 'Friend',
    uber_contact_list_family: 'Family',
    uber_contact_list_contact: 'Contact',
    uber_contact_list_removed: 'Removed',
    uber_contact_list_edit: 'Edit',
    uber_contact_list_default_text: 'screen name, real name, or email',
    uber_contact_list_max_results: 'Showing [results_shown] of [total_results] results. <a href="[url]">See all...</a>',
    uber_contact_list_no_realname: 'No real name given',
    bo_selecta_no_contacts_found: 'No contacts found.',
    bo_selecta_no_members_found: 'No members found.',
    bo_selecta_global_search_msg: 'Search through all Flickr members?',
    bo_selecta_global_search_msg_2: 'Search all Flickr members?',
    too_many_results: 'We found too many results to display here. Please type a few more characters.'
  })
}, "0.0.1", {requires: ["transjax-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("datasource-local", function (e, t) {
  var n = e.Lang, r = function () {
    r.superclass.constructor.apply(this, arguments)
  };
  e.mix(r, {
    NAME: "dataSourceLocal",
    ATTRS: {source: {value: null}},
    _tId: 0,
    transactions: {},
    issueCallback: function (e, t) {
      var n = e.on || e.callback, r = n && n.success, i = e.details[0];
      i.error = e.error || e.response.error, i.error && (t.fire("error", i), r = n && n.failure), r && r(i)
    }
  }), e.extend(r, e.Base, {
    initializer: function (e) {
      this._initEvents()
    }, _initEvents: function () {
      this.publish("request", {
        defaultFn: e.bind("_defRequestFn", this),
        queuable: !0
      }), this.publish("data", {
        defaultFn: e.bind("_defDataFn", this),
        queuable: !0
      }), this.publish("response", {defaultFn: e.bind("_defResponseFn", this), queuable: !0})
    }, _defRequestFn: function (e) {
      var t = this.get("source"), r = e.details[0];
      n.isUndefined(t) && (r.error = new Error("Local source undefined")), r.data = t, this.fire("data", r)
    }, _defDataFn: function (e) {
      var t = e.data, r = e.meta, i = {results: n.isArray(t) ? t : [t], meta: r ? r : {}}, s = e.details[0];
      s.response = i, this.fire("response", s)
    }, _defResponseFn: function (e) {
      r.issueCallback(e, this)
    }, sendRequest: function (e) {
      var t = r._tId++, n;
      return e = e || {}, n = e.on || e.callback, this.fire("request", {
        tId: t,
        request: e.request,
        on: n,
        callback: n,
        cfg: e.cfg || {}
      }), t
    }
  }), e.namespace("DataSource").Local = r
}, "3.11.0", {requires: ["base"]});
YUI.add("bo-selecta-global-search-datasource", function (a) {
  a.BoSelectaGlobalSearchDataSource = function (b) {
    a.BoSelectaGlobalSearchDataSource.superclass.constructor.apply(this, arguments);
    this.request = null;
    this.selector = b.selector
  };
  a.extend(a.BoSelectaGlobalSearchDataSource, a.DataSource.Local, {
    _defRequestFn: function (d) {
      var c, b = this;
      if (this.request && this.request.readyState < 4) {
        this.request.abort()
      }
      this.selector.loadingBox.setStyle("display", "block");
      c = decodeURIComponent(d.request);
      this.request = a.flickrAPI.callMethod("flickr.people.search", {username: c}, {
        success: function (j, p) {
          var q = j.data, i = j.params;
          if (!b.selector.searchingGlobally) {
            b.selector.loadingBox.setStyle("display", "none");
            return
          }
          var l = [];
          var r = q.people.person;
          var k, h;
          for (var g = 0, m = r.length; g < m; g++) {
            h = r[g];
            k = {
              n: h.nsid,
              e: h.email,
              u: h.username,
              r: h.realname,
              a: h.path_alias,
              d: h.friend,
              y: h.family,
              s: h.iconserver,
              f: h.iconfarm
            };
            k[0] = h.name;
            k.i = (k.f && k.f !== 0 && k.s && k.s !== 0) ? "http://farm" + k.f + ".static" + (a.config.flickr.dev ? "-dev" : "") + ".flickr.com/" + k.s + "/buddyicons/" + k.n + ".jpg" : "http://www.flickr.com/images/buddyicon.gif";
            l.push(k)
          }
          if (l.length === 0) {
            if (!b.selector.hideNoContactMessage) {
              l.push({message: a.transjax.get("bo-selecta", "bo_selecta_no_members_found"), disableActive: true})
            }
            if (b.selector.zeroResultsMessages.length > 0) {
              var f, o, e;
              for (var g = 0, m = b.selector.zeroResultsMessages.length; g < m; g++) {
                f = b.selector.zeroResultsMessages[g];
                if (f.validator(b.selector)) {
                  l.push(f)
                }
              }
            }
          }
          b.selector.loadingBox.setStyle("display", "none");
          b.fire("data", a.mix({data: l}, d))
        }, failure: function (g, f) {
          var e = g.data, i = g.params, h = [];
          h.push({message: a.transjax.get("bo-selecta", "too_many_results"), totalResultsMessage: true});
          b.selector.loadingBox.setStyle("display", "none");
          b.fire("data", a.mix({data: h}, d))
        }
      });
      return d.tId
    }
  })
}, "0.0.1", {requires: ["bo-selecta-transjax", "datasource-local", "gallery-flickr-api"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("datasource-function", function (e, t) {
  var n = e.Lang, r = function () {
    r.superclass.constructor.apply(this, arguments)
  };
  e.mix(r, {
    NAME: "dataSourceFunction",
    ATTRS: {source: {validator: n.isFunction}}
  }), e.extend(r, e.DataSource.Local, {
    _defRequestFn: function (e) {
      var t = this.get("source"), n = e.details[0];
      if (t)try {
        n.data = t(e.request, this, e)
      } catch (r) {
        n.error = r
      } else n.error = new Error("Function data failure");
      return this.fire("data", n), e.tId
    }
  }), e.DataSource.Function = r
}, "3.11.0", {requires: ["datasource-local"]});
YUI.add("image-fader", function (b) {
  function a(c, d) {
    d = b.Lang.isNumber(d) ? d : 1;
    if (b.Lang.isString(c)) {
      c = b.all(c)
    }
    c.on("load", function (g) {
      var f;
      if (g.target.inDoc()) {
        f = new b.Anim({node: g.target, to: {opacity: d}, duration: 0.2});
        f.run()
      }
    })
  }

  b.imageFader = {attach: a}
}, "0.0.1", {requires: ["node", "anim"]});
YUI.add("string-filters", function (d) {
  function m(s) {
    return s.replace(/\n/g, "<br>")
  }

  function o(s) {
    s = d.Lang.trim(s);
    s = "<p>" + s + "</p>";
    s = s.replace(/<blockquote>(.*?)<\/blockquote>/g, "</p><blockquote><p>$1</p></blockquote><p>");
    s = s.replace(/(?:\r?\n){2,}/g, "</p><p>");
    s = s.replace(/(?:\r?\n){1}/g, "<br>");
    s = s.replace(/<p><\/p>/g, "");
    s = s.replace(/<br><\/p>/g, "</p>");
    s = s.replace(/<p><br>/g, "<p>");
    return s
  }

  function k(u, t) {
    var s = {
      34: "quot",
      38: "amp",
      39: "apos",
      60: "lt",
      62: "gt",
      160: "nbsp",
      161: "iexcl",
      162: "cent",
      163: "pound",
      164: "curren",
      165: "yen",
      166: "brvbar",
      167: "sect",
      168: "uml",
      169: "copy",
      170: "ordf",
      171: "laquo",
      172: "not",
      173: "shy",
      174: "reg",
      175: "macr",
      176: "deg",
      177: "plusmn",
      178: "sup2",
      179: "sup3",
      180: "acute",
      181: "micro",
      182: "para",
      183: "middot",
      184: "cedil",
      185: "sup1",
      186: "ordm",
      187: "raquo",
      188: "frac14",
      189: "frac12",
      190: "frac34",
      191: "iquest",
      192: "Agrave",
      193: "Aacute",
      194: "Acirc",
      195: "Atilde",
      196: "Auml",
      197: "Aring",
      198: "AElig",
      199: "Ccedil",
      200: "Egrave",
      201: "Eacute",
      202: "Ecirc",
      203: "Euml",
      204: "Igrave",
      205: "Iacute",
      206: "Icirc",
      207: "Iuml",
      208: "ETH",
      209: "Ntilde",
      210: "Ograve",
      211: "Oacute",
      212: "Ocirc",
      213: "Otilde",
      214: "Ouml",
      215: "times",
      216: "Oslash",
      217: "Ugrave",
      218: "Uacute",
      219: "Ucirc",
      220: "Uuml",
      221: "Yacute",
      222: "THORN",
      223: "szlig",
      224: "agrave",
      225: "aacute",
      226: "acirc",
      227: "atilde",
      228: "auml",
      229: "aring",
      230: "aelig",
      231: "ccedil",
      232: "egrave",
      233: "eacute",
      234: "ecirc",
      235: "euml",
      236: "igrave",
      237: "iacute",
      238: "icirc",
      239: "iuml",
      240: "eth",
      241: "ntilde",
      242: "ograve",
      243: "oacute",
      244: "ocirc",
      245: "otilde",
      246: "ouml",
      247: "divide",
      248: "oslash",
      249: "ugrave",
      250: "uacute",
      251: "ucirc",
      252: "uuml",
      253: "yacute",
      254: "thorn",
      255: "yuml",
      338: "OElig",
      339: "oelig",
      352: "Scaron",
      353: "scaron",
      376: "Yuml",
      402: "fnof",
      710: "circ",
      732: "tilde",
      913: "Alpha",
      914: "Beta",
      915: "Gamma",
      916: "Delta",
      917: "Epsilon",
      918: "Zeta",
      919: "Eta",
      920: "Theta",
      921: "Iota",
      922: "Kappa",
      923: "Lambda",
      924: "Mu",
      925: "Nu",
      926: "Xi",
      927: "Omicron",
      928: "Pi",
      929: "Rho",
      931: "Sigma",
      932: "Tau",
      933: "Upsilon",
      934: "Phi",
      935: "Chi",
      936: "Psi",
      937: "Omega",
      945: "alpha",
      946: "beta",
      947: "gamma",
      948: "delta",
      949: "epsilon",
      950: "zeta",
      951: "eta",
      952: "theta",
      953: "iota",
      954: "kappa",
      955: "lambda",
      956: "mu",
      957: "nu",
      958: "xi",
      959: "omicron",
      960: "pi",
      961: "rho",
      962: "sigmaf",
      963: "sigma",
      964: "tau",
      965: "upsilon",
      966: "phi",
      967: "chi",
      968: "psi",
      969: "omega",
      977: "thetasym",
      978: "upsih",
      982: "piv",
      8194: "ensp",
      8195: "emsp",
      8201: "thinsp",
      8204: "zwnj",
      8205: "zwj",
      8206: "lrm",
      8207: "rlm",
      8211: "ndash",
      8212: "mdash",
      8216: "lsquo",
      8217: "rsquo",
      8218: "sbquo",
      8220: "ldquo",
      8221: "rdquo",
      8222: "bdquo",
      8224: "dagger",
      8225: "Dagger",
      8226: "bull",
      8230: "hellip",
      8240: "permil",
      8242: "prime",
      8243: "Prime",
      8249: "lsaquo",
      8254: "oline",
      8260: "frasl",
      8250: "rsaquo",
      8364: "euro",
      8472: "weierp",
      8465: "image",
      8476: "real",
      8482: "trade",
      8501: "alefsym",
      8592: "larr",
      8593: "uarr",
      8594: "rarr",
      8595: "darr",
      8596: "harr",
      8629: "crarr",
      8656: "lArr",
      8657: "uArr",
      8658: "rArr",
      8659: "dArr",
      8660: "hArr",
      8704: "forall",
      8706: "part",
      8707: "exist",
      8709: "empty",
      8711: "nabla",
      8712: "isin",
      8713: "notin",
      8715: "ni",
      8719: "prod",
      8721: "sum",
      8722: "minus",
      8727: "lowast",
      8730: "radic",
      8733: "prop",
      8734: "infin",
      8736: "ang",
      8743: "and",
      8744: "or",
      8745: "cap",
      8746: "cup",
      8747: "int",
      8756: "there4",
      8764: "sim",
      8773: "cong",
      8776: "asymp",
      8800: "ne",
      8801: "equiv",
      8804: "le",
      8805: "ge",
      8834: "sub",
      8835: "sup",
      8836: "nsub",
      8838: "sube",
      8839: "supe",
      8853: "oplus",
      8855: "otimes",
      8869: "perp",
      8901: "sdot",
      8968: "lceil",
      8969: "rceil",
      8970: "lfloor",
      8971: "rfloor",
      9001: "lang",
      9002: "rang",
      9674: "loz",
      9824: "spades",
      9827: "clubs",
      9829: "hearts",
      9830: "diams"
    };
    if (t) {
      return u.replace(/[\u00A0-\u2666<>\&]/g, function (v) {
        return "&" + (s[v.charCodeAt(0)] ? s[v.charCodeAt(0)] : "#" + v.charCodeAt(0)) + ";"
      })
    } else {
      u = u.replace(/&/g, "&amp;");
      u = u.replace(/"/g, "&quot;");
      u = u.replace(/</g, "&lt;");
      u = u.replace(/>/g, "&gt;");
      return u
    }
  }

  function j(t, s) {
    if (!t.match(/&/)) {
      return t
    }
    if (s) {
      var u = document.createElement("div");
      u.innerHTML = t;
      if (u.childNodes.length === 0) {
        return ""
      } else {
        return u.childNodes[0].nodeValue === null ? j(t, false) : u.childNodes[0].nodeValue
      }
      return u.childNodes.length === 0 ? "" : u.childNodes[0].nodeValue
    } else {
      t = t.replace(/&amp;/g, "&");
      t = t.replace(/&quot;/g, '"');
      t = t.replace(/&lt;/g, "<");
      t = t.replace(/&gt;/g, ">");
      return t
    }
  }

  function i(x, D, s) {
    if (!s) {
      s = " "
    }
    if (!D) {
      D = ""
    }
    D = D.replace(/\s/g, s);
    if (x.indexOf("http://") > -1) {
      var A = x.split("\n");
      for (var z = 0; z < A.length; z++) {
        var v = A[z].split(" ");
        for (var C = 0; C < v.length; C++) {
          var E = "";
          if (v[C].substr(0, 1) === "(") {
            v[C] = v[C].replace(/\(/g, "");
            E = "("
          }
          if (v[C].substr(0, 7) === "http://") {
            var u = v[C];
            var B = "";
            if (u.substr(u.length - 1, 1) === ")") {
              u = u.substr(0, u.length - 1);
              B = ")"
            }
            var w = "";
            if (u.substr(u.length - 1, 1) === ".") {
              u = u.substr(0, u.length - 1);
              w = "."
            }
            v[C] = ('<a href="' + u + '" rel="nofollow" onclick="' + D + '">' + u + "</a>" + B + w).replace(/\s/g, s)
          }
          v[C] = E + v[C]
        }
        A[z] = v.join(" ")
      }
      x = A.join("\n")
    }
    return x
  }

  function b(s) {
    if (d.config.flickr.lang && d.config.flickr.lang !== "en-us") {
      return s
    }
    if (s.substr(s.length - 1, 1).toLowerCase() === "s") {
      return s + "'"
    } else {
      return s + "'s"
    }
  }

  function g(w, s, v, u) {
    v = v || "\n";
    s = s || 75;
    u = u || false;
    if (!w) {
      return w
    }
    var t = ".{1," + s + "}(\\s|$)" + (u ? "|.{" + s + "}|.+$" : "|\\S+?(\\s|$)");
    return w.match(new RegExp(t, "g")).join(v)
  }

  function f(y, s, t, A) {
    s = s || 80;
    t = t || '<span class="breaking-non-space"> </span>';
    if (A !== false) {
      A = true
    }
    var B = g(y, s, t, A);
    var z = B.split(t);
    if (z.length <= 1) {
      return y
    }
    var w = "";
    for (var u = 0, v = z.length, x = 0; u < v - 1; u++) {
      x += z[u].length;
      if (y[x] === " ") {
        w += z[u] + " ";
        x++
      } else {
        w += z[u] + t
      }
    }
    w += z[z.length - 1];
    return w
  }

  function h(y) {
    if (y === "" || y === null || y === undefined) {
      return ""
    }
    y = y.toString();
    var t = "";
    for (var w = 0; w < y.length; w++) {
      var z = y.charCodeAt(w);
      var v = [];
      if (z > 65536) {
        v[0] = 240 | ((z & 1835008) >>> 18);
        v[1] = 128 | ((z & 258048) >>> 12);
        v[2] = 128 | ((z & 4032) >>> 6);
        v[3] = 128 | (z & 63)
      } else {
        if (z > 2048) {
          v[0] = 224 | ((z & 61440) >>> 12);
          v[1] = 128 | ((z & 4032) >>> 6);
          v[2] = 128 | (z & 63)
        } else {
          if (z > 128) {
            v[0] = 192 | ((z & 1984) >>> 6);
            v[1] = 128 | (z & 63)
          } else {
            v[0] = z
          }
        }
      }
      if (v.length > 1) {
        for (var u = 0; u < v.length; u++) {
          var s = v[u];
          var x = l((s & 240) >>> 4) + l(s & 15);
          t += "%" + x
        }
      } else {
        if (encodeURIComponent && typeof encodeURIComponent === "function") {
          t += encodeURIComponent(String.fromCharCode(v[0]))
        } else {
          t += (String.fromCharCode(v[0]))
        }
      }
    }
    return t
  }

  function n(w) {
    if (w === "" || w === null || w === undefined) {
      return ""
    }
    w = w.toString();
    var s = "";
    for (var v = 0; v < w.length; v++) {
      var x = w.charCodeAt(v);
      var u = [];
      if (x > 65536) {
        u[0] = 240 | ((x & 1835008) >>> 18);
        u[1] = 128 | ((x & 258048) >>> 12);
        u[2] = 128 | ((x & 4032) >>> 6);
        u[3] = 128 | (x & 63)
      } else {
        if (x > 2048) {
          u[0] = 224 | ((x & 61440) >>> 12);
          u[1] = 128 | ((x & 4032) >>> 6);
          u[2] = 128 | (x & 63)
        } else {
          if (x > 128) {
            u[0] = 192 | ((x & 1984) >>> 6);
            u[1] = 128 | (x & 63)
          } else {
            u[0] = x
          }
        }
      }
      if (u.length > 1) {
        for (var t = 0; t < u.length; t++) {
          s += (String.fromCharCode(u[t]))
        }
      } else {
        s += (String.fromCharCode(u[0]))
      }
    }
    return s
  }

  function l(s) {
    var t = "0123456789ABCDEF";
    return t.charAt(s)
  }

  function q(s) {
    return s.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "")
  }

  function c(u, s, t) {
    s = s || 30;
    t = d.Lang.isString(t) ? t : "...";
    if (u.length > s) {
      u = u.slice(0, s - t.length) + t
    }
    return u
  }

  function a(v) {
    var s, u, t;
    s = ["(?:ae|æ)", "(?:oe|œ)", "(?:ss|ß)", "(?:th|Þ)", "[aáàâäãåấ]", "[eéèêëě3]", "[iíìîïǐ]", "[oóòôöõǒỏơớờởỡợø]", "[uúùûüǔǚưứừửữự]", "[yýÿ]", "[cçč]", "[dÐ]", "[fƒ]", "[gǧ]", "[hȟ]", "[jǰ]", "[kǩ]", "[lľ]", "[nñň]", "[rř®]", "[sšṧ]", "[tť]", "[zž]"];
    u = s.length;
    for (t = 0; t < u; t++) {
      v = v.replace(new RegExp(s[t], "gi"), s[t])
    }
    return v
  }

  function p(t) {
    var s = /^[a-z_0-9\.\-\+]+@[a-z_0-9\.\-\+]+\.[a-z]/i;
    return s.test(t)
  }

  function r(u) {
    if (!d.Lang.isString(u) || u.length === 0) {
      return ""
    }
    var v = u.substring(1, u.length).toLowerCase().split(""), s = "", t = {
      a: "",
      e: "",
      i: "",
      o: "",
      u: "",
      b: 1,
      f: 1,
      p: 1,
      v: 1,
      c: 2,
      g: 2,
      j: 2,
      k: 2,
      q: 2,
      s: 2,
      x: 2,
      z: 2,
      d: 3,
      t: 3,
      l: 4,
      m: 5,
      n: 5,
      r: 6
    };
    v = d.Array.filter(v, function (x, w, y) {
      return x !== y[w + 1]
    });
    v = d.Array.map(v, function (w) {
      return t[w]
    });
    s = u.charAt(0).toUpperCase() + v.join("");
    return (s + "000").slice(0, 4)
  }

  function e(t, s) {
    var u = 3;
    if (!d.Lang.isString(t) || !d.Lang.isString(s) || t.length < 4 || s.length < 4) {
      return false
    }
    if (t === s) {
      return true
    }
    while (t.charAt(u) === "0" || s.charAt(u) === "0") {
      t = t.slice(0, u);
      s = s.slice(0, u);
      if (t === s) {
        return 4 - u
      }
      u--
    }
    return false
  }

  d.StringFilters = {
    nl2br: m,
    nl2p: o,
    escape_entities: k,
    unescape_entities: j,
    linkify: i,
    possess: b,
    wordwrap: g,
    zero_width_wordwrap: f,
    escape_utf8: h,
    escape_utf8_bytes: n,
    strip_tags: q,
    truncate: c,
    substitute_equivalent_chars: a,
    is_email_address: p,
    soundex: r,
    isEqualSoundex: e
  }
}, "0.0.1", {
  requires: F.config.modules["string-filters"].requires || [],
  optional: F.config.modules["string-filters"].optional || []
});
YUI.add("bo-selecta-3", function (b) {
  b.BoSelecta3 = function (d, c) {
    c = c || {};
    this.showUsername = c.showUsername || true;
    this.showSubtitle = c.showSubtitle || false;
    this.showIcon = c.showIcon || false;
    this.showRelationship = c.showRelationship || false;
    this.usePersonMenu = c.usePersonMenu || false;
    this.linkUsernameToPhotostream = c.linkUsernameToPhotostream || false;
    this.linkSubtitle = c.linkSubtitle || false;
    this.showEditRelationshipLink = c.showEditRelationshipLink || false;
    this.searchOnUsername = c.searchOnUsername || true;
    this.searchOnRealname = c.searchOnRealname || false;
    this.searchOnEmail = c.searchOnEmail || false;
    this.searchOnPathAlias = c.searchOnPathAlias || false;
    this.searchUsingSoundex = c.searchUsingSoundex || false;
    this.includeUser = c.includeUser || false;
    this.includeAddressBook = c.includeAddressBook || false;
    this.maxResultsDisplayed = c.maxResultsDisplayed || 5;
    this.globalMaxResultsDisplayed = c.globalMaxResultsDisplayed || 10;
    this.showTotalResults = c.showTotalResults || false;
    this.disableMouseHover = c.disableMouseHover || false;
    this.selectFirstItem = c.selectFirstItem || false;
    this.hideNoContactMessage = c.hideNoContactMessage || false;
    this.zeroResultsMessages = c.zeroResultsMessages || [];
    this.preloadText = c.preloadText || "";
    this.defaultText = c.defaultText || "";
    this.loadingText = c.loadingText || b.transjax.get("bo-selecta", "loading");
    this.focusOnFetch = c.focusOnFetch || false;
    this.fetchDataImmediately = c.fetchDataImmediately || false;
    this.allowNoContacts = c.allowNoContacts || false;
    this.allowFormSubmit = c.allowFormSubmit || false;
    this.respectCanTagFlag = c.respectCanTagFlag || false;
    this.apiURL = c.apiURL || b.config.flickr.people.api_url;
    this.enableGlobalSearch = c.enableGlobalSearch || false;
    this.defaultContainerWidth = c.defaultContainerWidth || 250;
    this.minListWidth = c.minListWidth || 228;
    this.maxListWidth = c.maxListWidth || 500;
    this.loadTransparently = c.loadTransparently || false;
    if (this.includeUser) {
      this.meString = b.transjax.get("bo-selecta", "me").toLowerCase()
    }
    this.contacts = null;
    this.skipList = {};
    this.shadowInit = false;
    this.fetchingData = false;
    this.haveTriedToFetchData = false;
    this.searchingGlobally = false;
    this._initHTML(d);
    this._initAutoComplete();
    if (this.fetchDataImmediately) {
      this.fetchData()
    }
  };
  b.augment(b.BoSelecta3, b.EventTarget);
  b.BoSelecta3.prototype._initHTML = function (e) {
    if (b.Lang.isString(e)) {
      e = b.one(e)
    }
    if (!e instanceof b.Node) {
      e = b.one("#BoSelecta_input")
    }
    this.inputField = e;
    this.container = this.inputField.get("parentNode");
    var c = this.container.all(".no-js-fallback");
    c.setStyle("display", "none");
    this.container.addClass("bo-selecta-3");
    this.container.addClass("yui-skin-sam");
    this.containerId = b.stamp(this.container);
    this.inputField.addClass("input");
    var d = this.container.all(".loading");
    if (d.size() > 0) {
      this.loadingBox = d.item(0);
      this.loadingBox.setStyle("display", this.fetchDataImmediately && !this.loadTransparently ? "block" : "none")
    } else {
      this.loadingBox = b.Node.create('<div class="loading">' + this.loadingText + "</div>");
      this.loadingBox.setStyle("display", this.fetchDataImmediately && !this.loadTransparently ? "block" : "none");
      this.container.append(this.loadingBox)
    }
    this.inputField.set("disabled", false);
    this.inputField.set("value", this.preloadText);
    this.inputField.addClass("grey");
    this.inputField.on("focus", this.clearDefaultText, this, true);
    this.inputField.on("blur", function (f) {
      if (this.inputField.get("value") === "") {
        this.restoreDefaultText()
      }
    }, this, true);
    if (!this.allowFormSubmit) {
      this.form = this.container.ancestor("form", true);
      if (this.form) {
        this.form.on("submit", function (f) {
          f.halt()
        })
      }
    }
    this.maxInputWidth = parseInt(this.container.getStyle("width"), 10) || this.defaultContainerWidth;
    this.defaultInputWidth = parseInt(this.inputField.getStyle("width"), 10) || this.defaultContainerWidth
  };
  b.BoSelecta3.prototype._initAutoComplete = function () {
    var c = this;
    this.contactsCacheDataSource = new b.DataSource.Function({
      source: function (d) {
        return c._searchContacts(d)
      }
    });
    this.globalSearchDataSource = new b.BoSelectaGlobalSearchDataSource({selector: this});
    this.autoComp = new b.AutoComplete({
      inputNode: this.inputField,
      source: this.contactsCacheDataSource,
      resultTextLocator: function (d) {
        if (d && d.u) {
          return b.BoSelecta3.sanitizeString(d.u)
        }
        return ""
      },
      resultFormatter: function (f, d, e) {
        return c._formatResult(f, d, e)
      },
      activateFirstItem: this.selectFirstItem,
      queryDelay: 0,
      render: true
    });
    this.autoComp.on("select", this._onItemSelectEvent, this, true);
    this.autoComp.on("query", this._handleQueryChange, this, true);
    this.autoComp.after("query", this._resizeListToFit, this, true);
    this.inputField.on("keydown", this._onInputFieldKeyDown, this, true);
    this.inputField.on("focus", function (f) {
      var d = c.getQuery();
      if (d) {
        c.autoComp.sendRequest(d)
      }
    });
    this.inputField.on("blur", function (d) {
      var f = c.autoComp.get("visible");
      if (f) {
        if (!c.resultsHideHandler) {
          c.resultsHideHandle = b.one("document").on("click", function (g) {
            if (g.target.ancestor(".yui3-aclist-item")) {
              return
            }
            b.fire("BoSelecta:widgetBlur");
            b.fire("flickr-menus:hide");
            c.resultsHideHandle.detach()
          })
        }
      } else {
        b.fire("BoSelecta:widgetBlur")
      }
    });
    b.on("flickr-menus:hide", this.hideResults, this, true)
  };
  b.BoSelecta3.prototype._fetchData = function () {
    if (this.fetchingData) {
      return
    }
    this.fetchingData = true;
    this.haveTriedToFetchData = true;
    this.fire("BoSelecta:dataFetchStart");
    if (!this.loadTransparently) {
      this.inputField.setStyle("display", "none");
      this.loadingBox.setStyle("display", "block")
    }
    var c = this.apiURL;
    var d = this;
    var e = {
      success: function (f, g, l) {
        if (g.responseText === "-1" || g.responseText === "") {
          if (d.allowNoContacts) {
            d.contacts = [];
            if (!d.loadTransparently) {
              d.restoreDefaultText();
              d.loadingBox.setStyle("display", "none");
              d.inputField.setStyle("display", "inline");
              if (d.inputField.get("value") === "" || d.focusOnFetch) {
                d.clear(true)
              }
            }
            d.fire("BoSelecta:dataFetchComplete")
          } else {
            e.failure()
          }
          return
        }
        var k = g.responseText.split("\u0002")[1];
        var p = "\u0003";
        var m = "\u0001";
        d.contacts = k.split(p);
        var i;
        for (var h = 0, j = d.contacts.length; h < j; h++) {
          i = d.contacts[h].split(m);
          if (i.length === 0) {
            continue
          }
          d.contacts[h] = {};
          d.contacts[h].n = i[0];
          d.contacts[h].e = i[1];
          d.contacts[h].u = i[2];
          d.contacts[h].r = i[3];
          d.contacts[h].s = i[4];
          d.contacts[h].f = i[5];
          d.contacts[h].a = i[6];
          d.contacts[h].d = i[7];
          d.contacts[h].y = i[8];
          d.contacts[h].c = i[9];
          d.contacts[h].us = b.StringFilters.soundex(d.contacts[h].u);
          d.contacts[h].rs = b.StringFilters.soundex(d.contacts[h].r);
          d.contacts[h][0] = d.contacts[h].u
        }
        if (!d.loadTransparently) {
          d.restoreDefaultText();
          d.loadingBox.setStyle("display", "none");
          d.inputField.setStyle("display", "inline");
          if (d.focusOnFetch) {
            d.clear(true)
          }
        }
        d.fetchingData = false;
        d.fire("BoSelecta:dataFetchComplete")
      }, failure: function (i, h, g) {
        d.autoComp.destroy();
        if (d.form && d.form.get("tagName").toLowerCase() === "form") {
          b.Event.purgeElement(d.form)
        }
        var f = d.inputField.get("parentNode");
        f.all(".no-js-fallback").setStyle("display", "");
        d._destroy();
        d.fetchingData = false;
        d.fire("BoSelecta:dataError")
      }
    };
    if (!c) {
      e.failure();
      return
    }
    b.io(c, {method: "GET", on: e})
  };
  b.BoSelecta3.prototype._destroy = function (d) {
    var c = this.inputField.get("parentNode");
    b.Event.purgeElement(this.inputField);
    this.inputField.removeClass("grey");
    this.inputField.removeClass("yui-ac-input");
    this.inputField.set("value", "");
    this.inputField.setStyle("display", "");
    this.inputField.removeClass("input");
    if (d) {
      this.inputField.remove()
    }
    this.loadingBox.remove();
    c.removeClass("yui-skin-sam");
    c.removeClass("bo-selecta-3")
  };
  b.BoSelecta3.prototype._searchContacts = function (g) {
    var v, e = [], o, j = this;
    if (g === "" || (g && g === this.defaultText)) {
      return e
    }
    if (g && typeof g === "string" && this.contacts) {
      o = g;
      g = this._escapeForRegEx(g);
      g = b.StringFilters.substitute_equivalent_chars(g);
      var d = new RegExp(g, "i"), u = b.StringFilters.soundex(o), s, k;
      for (var q = 0, t = this.contacts.length; q < t; q++) {
        k = false;
        s = this.contacts[q];
        s.matched = null;
        if (s.n && (!this.includeUser || o === this.meString) && s.n === b.config.flickr.user.nsid) {
          if (o === this.meString && !this.skipList[s.n]) {
            v = s
          }
          continue
        }
        if (this.skipList && (this.skipList[s.n] || this.skipList[s.e])) {
          continue
        }
        if (this.searchOnUsername && s.u && s.u.search(d) !== -1) {
          k = true;
          s.matched = "username";
          s.matchedPos = s.u.search(d)
        }
        if (!k && this.searchOnRealname && s.r && s.r.search(d) !== -1) {
          k = true;
          s.matched = "realname";
          s.matchedPos = s.r.search(d)
        }
        if (!k && this.searchOnEmail && s.e && g !== "@" && s.e.search(d) !== -1) {
          k = true;
          s.matched = "email";
          s.matchedPos = s.e.search(d)
        }
        if (!k && this.searchOnPathAlias && s.a && s.a.search(d) !== -1) {
          k = true;
          s.matched = "path_alias";
          s.matchedPos = s.a.search(d)
        }
        if (this.searchUsingSoundex) {
          if (!k && this.searchOnUsername && s.us && b.StringFilters.isEqualSoundex(s.us, u)) {
            k = true;
            s.matched = "username-soundex";
            s.matchedPos = (s.us === u) ? 0 : b.StringFilters.isEqualSoundex(s.us, u)
          }
          if (!k && this.searchOnRealname && s.rs && b.StringFilters.isEqualSoundex(s.rs, u)) {
            k = true;
            s.matched = "realname-soundex";
            s.matchedPos = (s.rs === u) ? 0 : b.StringFilters.isEqualSoundex(s.rs, u)
          }
        }
        if (k) {
          e.push(s)
        }
      }
    }
    if (e.length === 0 && !(o === this.meString && v)) {
      if (!this.hideNoContactMessage) {
        e.push({
          message: b.transjax.get("bo-selecta", "bo_selecta_no_contacts_found"),
          notFoundLink: true,
          disableActive: true
        });
        if (this.enableGlobalSearch) {
          e.push({
            globalSearchLink: true,
            query: o,
            message: b.transjax.get("bo-selecta", "bo_selecta_global_search_msg")
          })
        }
      }
      if (this.zeroResultsMessages.length > 0) {
        var h, p, c;
        for (var q = 0, t = this.zeroResultsMessages.length; q < t; q++) {
          h = this.zeroResultsMessages[q];
          if (h.validator(this)) {
            e.push(h)
          }
        }
      }
    } else {
      for (var q = 0, t = e.length; q < t; q++) {
        if (!e[q].n && !e[q].u) {
          for (var r = 0, t = e.length; r < t; r++) {
            if (q !== r && e[q] && e[r] && e[q].e === e[r].e) {
              delete e[q];
              break
            }
          }
        }
      }
      for (var q = 0, t = e.length; q < t;) {
        if (!e[q]) {
          e.splice(q, 1);
          t--
        } else {
          q++
        }
      }
      var i = {username: 0, realname: 1, email: 2, path_alias: 3, "username-soundex": 4, "realname-soundex": 5};
      e.sort(function (x, m) {
        var w = (x.n && x.u) ? "contact" : "addressBookEntry";
        var y = (m.n && m.u) ? "contact" : "addressBookEntry";
        if (w !== y) {
          return (w === "contact") ? -1 : 1
        }
        if (x.matchedPos === m.matchedPos) {
          if (i[x.matched] === i[m.matched]) {
            var z = x.u.charCodeAt(0), n = m.u.charCodeAt(0);
            if (z === n) {
              return 0
            } else {
              if (z < n) {
                return -1
              } else {
                return 1
              }
            }
          } else {
            if (i[x.matched] < i[m.matched]) {
              return -1
            } else {
              return 1
            }
          }
        } else {
          if (x.matchedPos < m.matchedPos) {
            return -1
          } else {
            return 1
          }
        }
      });
      if (o === this.meString && v) {
        v.matched = "username";
        e.unshift(v)
      }
      var l = e.length;
      e = e.splice(0, this.maxResultsDisplayed);
      if (this.showTotalResults) {
        var f = "/search/people/?q=%s&m=names&see=all";
        e.push({
          message: b.transjax.get("bo-selecta", "uber_contact_list_max_results").replace(/\[results_shown\]/, Math.min(e.length, this.maxResultsDisplayed)).replace(/\[total_results\]/, l).replace(/\[url\]/, f),
          totalResultsMessage: true
        })
      }
    }
    if (this.showEditRelationshipLink && !this.relationshipLinksInitialized) {
      b.use("contact-changer", function (m) {
        j.container.delegate("click", function (n) {
          m.contact_changer.show(n.target.getAttribute("data-nsid"));
          n.preventDefault()
        }, ".edit-rel a");
        j.relationshipLinksInitialized = true
      })
    }
    return e
  };
  b.BoSelecta3.prototype._formatResult = function (h, q, i) {
    var j = this, s, l = [], v, e, d, m, c = !h ? null : new RegExp(b.StringFilters.substitute_equivalent_chars(j._escapeForRegEx(h)), "gi"), k, g, o, u, r, f;
    if (!h) {
      h = ""
    }
    for (var p = 0, t = q.length; p < t; p++) {
      s = q[p].raw;
      if (!s) {
        continue
      }
      if (s.globalSearchLink) {
        v = '<p class="bs-global-search-link bs-message bs-onclick"><span>' + s.message + "</span></p>";
        l.push(v);
        continue
      }
      if (s.totalResultsMessage) {
        v = '<p class="bs-message bs-total-results bs-disable-active"><span>' + s.message + "</span></p>";
        l.push(v);
        continue
      }
      if (s.message) {
        v = '<p class="bs-message' + (s.notFoundLink ? "" : " bs-onclick") + (s.disableActive ? " bs-disable-active" : "") + (s.className ? " " + s.className : "") + '">' + s.message + "</p>";
        l.push(v);
        continue
      }
      m = (j.respectCanTagFlag && s.c === "0") ? ' class="disabled"' : "";
      if (s.e && !s.u && !s.n) {
        if (!s.i) {
          s.i = "/images/icon_unread.gif"
        }
        e = j.showIcon ? '<img src="' + s.i + '" width="16" height="16" class="BuddyIconX bs-email-icon">' : "";
        d = '<p email="' + s.e + '"' + m + '><span class="name name-email">' + e + '<strong class="username">' + a(j._sanitizeString(s.e), c) + '</strong></span><span class="relationship"></span></p>';
        l.push(d);
        continue
      }
      k = (s.a) ? s.a : s.n;
      g = ' / <a href="/people/' + k + '/">' + b.transjax.get("bo-selecta", "uber_contact_list_view_profile") + "</a>";
      if (!s.i) {
        s.i = (s.f && s.f !== 0 && s.s && s.s !== 0) ? "http://farm" + s.f + ".static" + (b.config.flickr.dev ? "-dev" : "") + ".flickr.com/" + s.s + "/buddyicons/" + s.n + ".jpg" : "http://www.flickr.com/images/buddyicon.gif"
      }
      if (F.config.flickr.is_secure) {
        s.i = s.i.replace("http:", "https:")
      }
      o = "";
      if (j.showRelationship) {
        if (s.d === "1" && s.y === "1") {
          o += b.transjax.get("bo-selecta", "uber_contact_list_friend_and_family")
        } else {
          if (s.d === "1") {
            o += b.transjax.get("bo-selecta", "uber_contact_list_friend")
          } else {
            if (s.y === "1") {
              o += b.transjax.get("bo-selecta", "uber_contact_list_family")
            } else {
              if (s.removed === "1") {
                o += '<em class="contact-removed">' + b.transjax.get("bo-selecta", "uber_contact_list_removed") + "</em>"
              } else {
                if (j.searchingGlobally) {
                  o += ""
                } else {
                  o += b.transjax.get("bo-selecta", "uber_contact_list_contact")
                }
              }
            }
          }
        }
        if (j.showEditRelationshipLink && !j.searchingGlobally) {
          o += ' <span class="edit-rel">(<a href="/people/' + k + '/relationship/" data-nsid="' + s.n + '">' + b.transjax.get("bo-selecta", "uber_contact_list_edit") + "</a>)</span>"
        }
      }
      e = j.showIcon ? '<img src="' + s.i + '" width="24" height="24" class="BuddyIconX fade-in" nsid="' + s.n + '">' : "";
      e = j.linkUsernameToPhotostream ? '<a href="/photos/' + k + '/">' + e + "</a>" : e;
      u = j.showUsername ? a(j._sanitizeString(s.u), c) : "";
      u = j.linkUsernameToPhotostream ? '<strong class="username"><a href="/photos/' + k + '/">' + u + "</a></strong>" : '<strong class="username">' + u + "</strong>";
      r = "";
      if (j.showSubtitle) {
        if (!s.matched || s.matched === "realname" || s.matched === "realname-soundex") {
          r = s.r ? a(j._sanitizeString(s.r), c) : b.transjax.get("bo-selecta", "uber_contact_list_no_realname")
        } else {
          if (s.matched === "username" || s.matched === "username-soundex") {
            r = s.r ? j._sanitizeString(s.r) : b.transjax.get("bo-selecta", "uber_contact_list_no_realname")
          } else {
            if (s.matched === "email") {
              r = a(j._sanitizeString(s.e), c)
            } else {
              if (s.matched === "path_alias" && s.a) {
                r = "flickr.com/people/" + a(j._sanitizeString(s.a), c) + "/"
              }
            }
          }
        }
        r = j.linkSubtitle ? '<a title="' + b.transjax.get("bo-selecta", "uber_contact_list_view_profile") + '" href="/people/' + k + '/" class="realname">' + r + "</a>" : '<span class="realname">' + r + "</span>"
      }
      f = b.Node.create('<p nsid="' + s.n + '"' + m + '><span class="name">' + e + u + r + '</span><span class="relationship">' + o + "</span></p>");
      b.imageFader.attach(f.all("img"));
      l.push(f)
    }
    return l
  };
  function a(g, e) {
    if (!g) {
      return g
    }
    var c, d, f;
    g = b.StringFilters.unescape_entities(g, true);
    d = e ? g.search(e) : -1;
    if (d === -1) {
      return b.BoSelecta3.sanitizeString(g)
    }
    c = g.match(e);
    f = d + c[0].length;
    return b.StringFilters.escape_entities(g.substring(0, d), true) + '<span class="term-highlight">' + b.StringFilters.escape_entities(g.substring(d, f), true) + "</span>" + b.StringFilters.escape_entities(g.substring(f, g.length), true)
  }

  b.BoSelecta3.prototype._resizeListToFit = function (j) {
    var h, g, d = this.minListWidth, f = this.maxListWidth, i, k, c;
    if (j.type === "autocompleteList:query" || (j.type === "autocompleteList:visibleChange" && j.newVal === true)) {
      h = j.currentTarget;
      g = h.get("listNode");
      g.all("li p").each(function (e) {
        i = e.one(".name");
        k = e.one(".relationship");
        if (i && k) {
          c = i.get("offsetWidth") + k.get("offsetWidth") + 12;
          if (c > d) {
            d = c
          }
        }
      });
      if (!this.baseListWidth) {
        this.baseListWidth = h.get("width")
      }
      if (d > f) {
        d = f
      }
      if (d < this.baseListWidth) {
        d = this.baseListWidth
      }
      h.set("width", d)
    }
  };
  b.BoSelecta3.prototype._attachIconEvents = function (e) {
    if (!personmenu_process_img || typeof personmenu_process_img !== "function") {
      return
    }
    var g = e.all("img"), d;
    for (var f = 0, c = g.size(); f < c; f++) {
      d = b.Node.getDOMNode(g.item(f));
      if (g.item(f).hasClass("BuddyIconX")) {
        d.nsid = g.item(f).getAttribute("nsid");
        personmenu_process_img(d)
      }
    }
  };
  b.BoSelecta3.prototype._useGlobalSearch = function (d) {
    var c = this;
    this.searchingGlobally = true;
    if (d) {
      this.inputField.set("value", decodeURIComponent(d))
    }
    this.autoComp.set("source", this.globalSearchDataSource);
    this.autoComp.set("minQueryLength", 2);
    this.autoComp.set("maxResultsDisplayed", this.globalMaxResultsDisplayed);
    this.autoComp.set("queryDelay", 600);
    this.loadingBox.addClass("loading-global").removeClass("loading");
    this.loadingBox.set("innerHTML", "");
    this.globalSearchRemover = this.inputField.on("keyup", function (f) {
      if (c.inputField.get("value") === "") {
        c.globalSearchRemover.detach();
        c._useContactsCache()
      }
    });
    d = this.getQuery();
    this.autoComp.sendRequest(d)
  };
  b.BoSelecta3.prototype._useContactsCache = function (c) {
    this.searchingGlobally = false;
    if (c) {
      this.inputField.set("value", decodeURIComponent(c))
    }
    this.autoComp.set("source", this.contactsCacheDataSource);
    this.autoComp.set("minQueryLength", 1);
    this.autoComp.set("maxResultsDisplayed", 0);
    this.autoComp.set("queryDelay", 0)
  };
  b.BoSelecta3.prototype._onItemSelectEvent = function (f, d) {
    var c = f.result.raw;
    if (c.message) {
      if (c.globalSearchLink) {
        this._useGlobalSearch(c.query)
      } else {
        if (c.onclick && typeof c.onclick === "function") {
          c.onclick(f, this)
        } else {
          this.clear()
        }
      }
      f.preventDefault();
      return
    }
    this.fire("BoSelecta:resultSelect", c, c.query);
    if (this.searchingGlobally) {
      this._useContactsCache()
    }
  };
  b.BoSelecta3.prototype._handleQueryChange = function (c) {
    this.fire("BoSelecta:queryChange", c.query)
  };
  b.BoSelecta3.prototype._onInputFieldKeyDown = function (d) {
    if (d.keyCode === 13 && this.autoComp) {
      var f = false;
      if (this.autoComp._oCurItem) {
        var c = b.one(this.autoComp._oCurItem).all("p");
        if (c.size() > 0) {
          f = (c.item(0).hasClass("bs-message") && !c.item(0).hasClass("bs-onclick"))
        }
      }
      if (!this.autoComp._oCurItem || f) {
        this.fire("BoSelecta:inputEnter")
      }
    }
  };
  b.BoSelecta3.prototype._sanitizeString = function (c) {
    c = c.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return c
  };
  b.BoSelecta3.prototype._unsanitizeString = function (c) {
    c = c.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
    return c
  };
  b.BoSelecta3.prototype._escapeForRegEx = function (c) {
    c = decodeURIComponent(c);
    c = c.replace(/\\/g, "\\\\").replace(/\./g, "\\.").replace(/\*/g, "\\*").replace(/\$/g, "\\$").replace(/\^/g, "\\^").replace(/\?/g, "\\?");
    c = c.replace(/\|/g, "\\|").replace(/\+/g, "\\+").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\[/g, "\\[").replace(/\]/g, "\\]");
    return c
  };
  b.BoSelecta3.prototype.fetchData = function () {
    if (!this.contacts && !this.haveTriedToFetchData) {
      this._fetchData()
    }
  };
  b.BoSelecta3.prototype.refreshData = function () {
    this._fetchData()
  };
  b.BoSelecta3.prototype.hideResults = function () {
    if (this.autoComp && this.autoComp.hide) {
      this.autoComp.hide()
    }
    if (this.resultsHideHandle && this.resultsHideHandle.detach) {
      this.resultsHideHandle.detach()
    }
  };
  b.BoSelecta3.prototype.clear = function (c) {
    this.inputField.removeClass("grey");
    this.inputField.set("value", "");
    if (c) {
      try {
        this.inputField.focus()
      } catch (d) {
      }
    }
    this.hideResults()
  };
  b.BoSelecta3.prototype.clearDefaultText = function (c) {
    if (this.inputField.hasClass("grey")) {
      this.clear(c)
    }
  };
  b.BoSelecta3.prototype.restoreDefaultText = function () {
    this.clear();
    this.inputField.addClass("grey");
    this.inputField.set("value", this.defaultText);
    this.inputField.blur()
  };
  b.BoSelecta3.prototype.getQuery = function () {
    if (this.inputField.hasClass("grey")) {
      return ""
    }
    return this.inputField.get("value")
  };
  b.BoSelecta3.prototype.refreshResults = function () {
    if (this.autoComp && this.getQuery()) {
      this.autoComp.sendRequest(this.getQuery())
    }
  };
  b.BoSelecta3.prototype.skipContact = function (c) {
    this.skipList[(c.n ? c.n : c.e)] = true
  };
  b.BoSelecta3.prototype.unskipContact = function (c) {
    this.skipList[(c.n ? c.n : c.e)] = false
  };
  b.BoSelecta3.prototype.unskipAll = function () {
    this.skipList = {}
  };
  b.BoSelecta3.prototype.showInFieldLoading = function () {
    this.loadingBox.addClass("loading-global");
    this.loadingBox.removeClass("loading");
    this.loadingBox.setStyle("display", "block")
  };
  b.BoSelecta3.prototype.hideInFieldLoading = function () {
    this.loadingBox.setStyle("display", "")
  };
  b.BoSelecta3.prototype.destroy = function () {
    this._destroy(true)
  };
  b.BoSelecta3.sanitizeString = b.BoSelecta3.prototype._sanitizeString;
  b.BoSelecta3.unsanitizeString = b.BoSelecta3.prototype._unsanitizeString
}, "0.0.1", {
  requires: F.config.modules["bo-selecta-3"].requires || [],
  optional: F.config.modules["bo-selecta-3"].optional || []
});
YUI.add("nav-selecta-transjax", function (a) {
  a.transjax.add("nav-selecta", {
    search_on_flickr: "Search <strong>Everyone's Uploads</strong>",
    search_more: "More search types...</strong>",
    jump_to_the_search_field: "Jump to the search field",
    search_photostream: "<strong>Your Photostream</strong>",
    search_users_photostream: "<strong>%s Photostream</strong>",
    search_favorites: "<strong>Your Favorites</strong>",
    search_users_favorites: "<strong>%s Favorites</strong>",
    search_contacts: "<strong>Your Contacts' Photos</strong>",
    search_people: "<strong>Flickr Members</strong>",
    search_tags: "<strong>Tags</strong>",
    search_groups: "<strong>Groups</strong>",
    search_group: "<strong>This Group</strong>",
    search_location: "<strong>Places</strong>",
    search_apps: "<strong>Apps</strong>",
    search_help: "<strong>The Help Forum</strong>",
    search_advanced: "<strong>Advanced Search</strong>",
    section_your_photostream: 'Your Photostream',
    section_your_sets: 'Your Sets',
    section_your_collections: 'Your Collections',
    section_your_galleries: 'Your Galleries',
    section_your_archives: 'Your Archives',
    section_your_tags: 'Your Tags',
    section_your_map: 'Your Map',
    section_your_favorites: 'Your Favorites',
    section_your_stats: 'Your Stats',
    section_your_apps: 'Your Apps',
    section_recent_activity: 'Recent Activity',
    section_photos_of_you: 'Photos of You',
    section_upload_photos: 'Upload Photos',
    section_your_account: 'Your Account',
    section_your_profile: 'Your Profile',
    section_flickrmail: 'FlickrMail',
    section_organize_and_create: 'Organize & Create',
    section_prints_and_photo_products: 'Prints &amp; photo products',
    section_contacts: "Contacts' Recent Uploads",
    section_photos_of_your_contacts: 'Photos of Your Contacts',
    section_contact_list: 'Contact List',
    section_find_your_friends: 'Find Your Friends',
    section_invite_your_friends: 'Invite your Friends',
    section_invite_history: 'Invite History',
    section_guest_pass_history: 'Guest Pass History',
    section_your_groups: 'Your Groups',
    section_recent_changes_in_your_groups: 'Recent Changes in Your Groups',
    section_create_a_new_group: 'Create a New Group',
    section_the_tour: 'The Tour',
    section_explore: 'Explore',
    section_last_7_days_interesting: 'Last 7 Days Interesting',
    section_popular_tags: 'Popular Tags',
    section_calendar: 'Calendar',
    section_most_recent_uploads_to_flickr: 'Most Recent Uploads to Flickr',
    section_video_on_flickr: 'Video on Flickr',
    section_galleries: 'Galleries',
    section_explore_analog: 'Explore Analog',
    section_flickr_clock: 'Flickr Clock',
    section_world_map: 'World Map',
    section_places: '',
    section_the_commons: 'The Commons',
    section_creative_commons: 'Creative Commons',
    section_flickrblog: 'FlickrBlog',
    section_getty_images: "Getty Images",
    section_code_flickr: "code.flickr",
    section_the_app_garden: 'The App Garden',
    section_camera_finder: 'Camera Finder',
    section_developer_guidelines: 'Developer Guide',
    section_api_docs: 'API Documentation',
    section_feeds: 'Feeds',
    section_help: 'Help',
    section_community_guidelines: 'Community Guidelines',
    section_the_help_forum: 'The Help Forum',
    section_faq: 'FAQ',
    section_tools: 'Tools',
    section_sitemap: 'Sitemap',
    section_about_flickr: 'About Flickr',
    section_jobs: 'Jobs at Flickr',
    section_terms_of_service: 'Terms of Service',
    section_terms_of_use: 'Terms of Use',
    section_your_privacy: 'Your Privacy',
    section_copyright_ip_policy: 'Copyright/IP Policy',
    section_report_abuse: 'Report Abuse',
    section_mobile: 'Mobile',
    section_photosession: 'Photo Session',
    section_alias_graphs: 'Graphs',
    section_alias_referrers: 'Referrers',
    section_alias_views: 'Views',
    section_alias_settings: 'Settings',
    section_alias_preferences: 'Preferences',
    section_alias_batch: 'Batch',
    section_alias_prints: 'Prints',
    section_alias_calendar: 'Calendar',
    section_alias_book: 'Book',
    section_alias_film: 'Film',
    section_alias_license: 'License',
    section_alias_buy: 'Buy',
    section_alias_sell: 'Sell',
    section_alias_developer: 'Developer',
    section_alias_programming: 'Programming',
    section_alias_code: 'Code',
    section_alias_documentation: 'Documentation',
    section_alias_career: 'Career',
    section_alias_work: 'Work',
    section_alias_staff: 'Staff',
    section_alias_upload: 'Upload',
    section_alias_plugin: 'Plug-in',
    section_alias_: '',
    section_alias_: '',
    section_alias_: '',
    section_alias_: '',
    section_alias_: '',
    section_alias_: '',
    section_alias_: ''
  })
}, "0.0.1", {requires: F.config.modules["nav-selecta-transjax"].requires || []});
YUI.add("nav-selecta", function (a) {
  var f = false;
  a.on("keydown", function (k) {
    if (k.metaKey || k.ctrlKey) {
      f = true
    }
  });
  a.on("keyup", function (k) {
    if (f) {
      f = false
    }
  });
  a.NavSelecta = function (q, m) {
    m = m || {};
    m.showSubtitle = (typeof m.showSubtitle !== "undefined") ? m.showSubtitle : true;
    m.showIcon = (typeof m.showIcon !== "undefined") ? m.showIcon : true;
    m.maxResultsDisplayed = m.maxResultsDisplayed || 15;
    m.searchOnRealname = (typeof m.searchOnRealname !== "undefined") ? m.searchOnRealname : true;
    m.searchOnEmail = (typeof m.searchOnEmail !== "undefined") ? m.searchOnEmail : true;
    m.searchOnPathAlias = (typeof m.searchOnPathAlias !== "undefined") ? m.searchOnPathAlias : true;
    m.selectFirstItem = (typeof m.selectFirstItem !== "undefined") ? m.selectFirstItem : true;
    m.loadTransparently = (typeof m.loadTransparently !== "undefined") ? m.loadTransparently : true;
    m.allowFormSubmit = (typeof m.allowFormSubmit !== "undefined") ? m.allowFormSubmit : true;
    m.minListWidth = m.minListWidth || (F.config.flickr.flags.enable_global_nav_restyle ? 220 : (F.config.flickr.flags.enable_global_nav ? 241 : 266));
    m.maxListWidth = m.maxListWidth || (F.config.flickr.flags.enable_global_nav_restyle ? 220 : null);
    a.NavSelecta.superclass.constructor.call(this, q, m);
    this.inputField.removeClass("grey");
    this.maxContactsDisplayed = m.maxContactsDisplayed || 3;
    this.maxSectionsDisplayed = m.maxSectionsDisplayed || 3;
    this.on("BoSelecta:resultSelect", e);
    this.on("BoSelecta:resultClick", e);
    if (a.config.flickr.user && a.config.flickr.user.nsid) {
      this.inputField.once("mouseover", this.fetchData, this, true);
      this.inputField.once("focus", this.fetchData, this, true);
      this.on("BoSelecta:dataFetchComplete", this.refreshResults, this, true)
    }
    this.container.addClass("nav-selecta");
    var l = this.autoComp.get("listNode").ancestor(".yui3-aclist-content"), o = "search-menu-hover";

    function n(t, s) {
      if (this._hover_hide_timeout) {
        this._hover_hide_timeout.cancel()
      }
    }

    function p(t, s) {
      n(t, s);
      this._hover_hide_timeout = a.later(1000, this, function () {
        a.fire("flickr-menus:hide", s);
        this._hover_hide_timeout = null
      })
    }

    function r(t, s) {
      t.target.addClass("search-menu-hover");
      n(t, s)
    }

    function k(t, s) {
      t.target.removeClass("search-menu-hover");
      p(t, s)
    }

    l.on("mouseover", r, this);
    l.on("mouseout", k, this);
    this.container.on("mouseover", r, this, "source:nav-selecta-container");
    this.container.on("mouseout", k, this, "source:nav-selecta-container");
    this.container.on("keyup", function (s) {
      if (!s.target.hasClass("search-menu-hover")) {
        k.apply(this, arguments)
      }
    }, this);
    a.keyboardShortcutManager.register({
      keystring: "83",
      handler: d,
      context: "",
      scope: this,
      legend: {
        key: "S",
        description: a.transjax.get("nav-selecta", "jump_to_the_search_field"),
        group: a.transjax.get("keyboard-shortcut-legend", "navigation"),
        order: 99
      }
    });
    this.addSections(a.config.flickr.nav_selecta.additional_sections)
  };
  var c = {}, i = {};

  function e(l, k) {
    if (l.type === "contact") {
      if (!f) {
        g("/photos/" + (l.a ? l.a : l.n) + "/")
      }
    } else {
      if (l.type === "section") {
        if (!f) {
          g(l.url)
        }
      } else {
        if (!f) {
          g(l.url)
        }
      }
    }
  }

  function d(k) {
    k.preventDefault();
    window.scrollTo(0, 0);
    this.inputField.focus()
  }

  function g(k) {
    a.rapidTracker.beacon("Search-search_icon");
    a.fire("NavSelecta:beforeNavigatingAway", k);
    window.location = k
  }

  function b(n) {
    var p = location.search.split("?")[1] || null;
    if (p) {
      var m = p.split("&"), s = n.split("&"), o = null, k = {}, l = null, r = null, q = "";
      for (l = 0; s.length > l; l++) {
        o = s[l].split("=");
        k[o[0]] = o[1]
      }
      for (l = 0; m.length > l; l++) {
        o = m[l].split("=");
        if (!o[0].match(/^[a-zA-Z][a-zA-Z0-9]*/)) {
          continue
        }
        if (k[o[0]]) {
          r = k[o[0]];
          k[o[0]] = null
        } else {
          r = o[1]
        }
        q += o[0] + "=" + a.StringFilters.escape_entities(r) + "&"
      }
      for (l in k) {
        if (k[l]) {
          q += l + "=" + k[l] + "&"
        }
      }
      return q.substring(0, q.length - 1)
    } else {
      return n
    }
  }

  c._searchContacts = function (q) {
    var J, l = [], z = q, s, u = this, t = false, I = false, A = false, H = false, x = false;
    l.push({
      type: "search",
      message: a.transjax.get("nav-selecta", "search_on_flickr", '<em class="term-highlight">' + z + "</em>"),
      onclick: function (m) {
        if (!f) {
          g("/search/?" + b("q=" + encodeURIComponent(z)))
        }
      },
      url: "/search/?" + b("q=" + encodeURIComponent(z))
    });
    if (a.config.flickr.nav_selecta.photostream_search_user) {
      if (a.config.flickr.user && a.config.flickr.user.nsid && a.config.flickr.user.nsid === a.config.flickr.nav_selecta.photostream_search_user.nsid) {
        l.push({
          type: "search-photostream",
          message: a.transjax.get("nav-selecta", "search_photostream", '<em class="term-highlight">' + z + "</em>"),
          onclick: function () {
            if (!f) {
              g("/search/?" + b("w=" + a.config.flickr.user.nsid + "&q=" + encodeURIComponent(z)))
            }
          },
          url: "/search/?" + b("w=" + a.config.flickr.user.nsid + "&q=" + encodeURIComponent(z))
        });
        t = true
      } else {
        l.push({
          type: "search-users-photostream",
          message: a.transjax.get("nav-selecta", "search_users_photostream", a.StringFilters.escape_entities(a.config.flickr.nav_selecta.photostream_search_user.owner_name_possessive), '<em class="term-highlight">' + z + "</em>"),
          onclick: function () {
            if (!f) {
              g("/search/?" + b("w=" + a.config.flickr.nav_selecta.photostream_search_user.nsid + "&q=" + encodeURIComponent(z)))
            }
          },
          url: "/search/?" + b("w=" + a.config.flickr.nav_selecta.photostream_search_user.nsid + "&q=" + encodeURIComponent(z))
        });
        I = true
      }
    }
    if (a.config.flickr.nav_selecta.favorites_search_user) {
      if (a.config.flickr.user && a.config.flickr.user.nsid && a.config.flickr.user.nsid === a.config.flickr.nav_selecta.favorites_search_user.nsid) {
        l.push({
          type: "search-favorites",
          message: a.transjax.get("nav-selecta", "search_favorites", '<em class="term-highlight">' + z + "</em>"),
          onclick: function () {
            if (!f) {
              g("/search/?" + b("w=faves&q=" + encodeURIComponent(z)))
            }
          },
          url: "/search/?" + b("w=faves&q=" + encodeURIComponent(z))
        });
        A = true
      } else {
        l.push({
          type: "search-users-favorites",
          message: a.transjax.get("nav-selecta", "search_users_favorites", a.StringFilters.escape_entities(a.config.flickr.nav_selecta.favorites_search_user.owner_name_possessive), '<em class="term-highlight">' + z + "</em>"),
          onclick: function () {
            if (!f) {
              g("/search/?" + b("w=faves-" + a.config.flickr.nav_selecta.favorites_search_user.nsid + "&q=" + encodeURIComponent(z)))
            }
          },
          url: "/search/?" + b("w=faves-" + a.config.flickr.nav_selecta.favorites_search_user.nsid + "&q=" + encodeURIComponent(z))
        });
        H = true
      }
    }
    if (a.config.flickr.nav_selecta.search_group && a.config.flickr.nav_selecta.search_group.nsid) {
      l.push({
        type: "search-group",
        message: a.transjax.get("nav-selecta", "search_group", '<em class="term-highlight">' + z + "</em>"),
        onclick: function () {
          if (!f) {
            g("/search/groups/?" + b("w=" + encodeURIComponent(a.config.flickr.nav_selecta.search_group.nsid) + "&m=pool&q=" + encodeURIComponent(z)))
          }
        },
        url: "/search/groups/?" + b("w=" + encodeURIComponent(a.config.flickr.nav_selecta.search_group.nsid) + "&m=pool&q=" + encodeURIComponent(z))
      });
      x = true
    }
    if (!this.showMoreSearches && !a.config.flickr.nav_selecta.search_view) {
      l.push({
        type: "search-more",
        message: a.transjax.get("nav-selecta", "search_more", '<em class="term-highlight">' + z + "</em>"),
        onclick: function () {
          u.showMoreSearches = true;
          u.selectSecondItem = u.autoComp.after("results", function (m) {
            if (t || I || A || H || x) {
              u.autoComp.set("activeItem", u.autoComp._getFirstItemNode().next().next())
            } else {
              u.autoComp.set("activeItem", u.autoComp._getFirstItemNode().next())
            }
            u.selectSecondItem.detach()
          });
          u.refreshResults()
        }
      })
    } else {
      if (a.config.flickr.user && a.config.flickr.user.nsid && !t) {
        l.push({
          type: "search-photostream",
          message: a.transjax.get("nav-selecta", "search_photostream", '<em class="term-highlight">' + z + "</em>"),
          onclick: function () {
            if (!f) {
              g("/search/?" + b("w=" + a.config.flickr.user.nsid + "&q=" + encodeURIComponent(z)))
            }
          },
          url: "/search/?" + b("w=" + a.config.flickr.user.nsid + "&q=" + encodeURIComponent(z))
        })
      }
      if (a.config.flickr.nav_selecta.photostream_search_user && (!a.config.flickr.user || (a.config.flickr.user.nsid !== a.config.flickr.nav_selecta.photostream_search_user.nsid)) && !I) {
        l.push({
          type: "search-users-photostream",
          message: a.transjax.get("nav-selecta", "search_users_photostream", a.StringFilters.escape_entities(a.config.flickr.nav_selecta.photostream_search_user.owner_name_possessive), '<em class="term-highlight">' + z + "</em>"),
          onclick: function () {
            if (!f) {
              g("/search/?" + b("w=" + a.config.flickr.nav_selecta.photostream_search_user.nsid + "&q=" + encodeURIComponent(z)))
            }
          },
          url: "/search/?" + b("w=" + a.config.flickr.nav_selecta.photostream_search_user.nsid + "&q=" + encodeURIComponent(z))
        })
      }
      if (a.config.flickr.nav_selecta.favorites_search_user && (!a.config.flickr.user || (a.config.flickr.user.nsid !== a.config.flickr.nav_selecta.favorites_search_user.nsid)) && !H) {
        l.push({
          type: "search-users-favorites",
          message: a.transjax.get("nav-selecta", "search_users_favorites", a.StringFilters.escape_entities(a.config.flickr.nav_selecta.favorites_search_user.owner_name_possessive), '<em class="term-highlight">' + z + "</em>"),
          onclick: function () {
            if (!f) {
              g("/search/?" + b("w=" + a.config.flickr.nav_selecta.favorites_search_user.nsid + "&q=" + encodeURIComponent(z)))
            }
          },
          url: "/search/?" + b("w=" + a.config.flickr.nav_selecta.favorites_search_user.nsid + "&q=" + encodeURIComponent(z))
        })
      }
      if (a.config.flickr.user && a.config.flickr.user.nsid) {
        l.push({
          type: "search-contacts",
          message: a.transjax.get("nav-selecta", "search_contacts", '<em class="term-highlight">' + z + "</em>"),
          onclick: function () {
            if (!f) {
              g("/search/?" + b("w=contacts&q=" + encodeURIComponent(z)))
            }
          },
          url: "/search/?" + b("w=contacts&q=" + encodeURIComponent(z))
        })
      }
      l.push({
        type: "search-groups",
        message: a.transjax.get("nav-selecta", "search_groups", '<em class="term-highlight">' + z + "</em>"),
        onclick: function () {
          if (!f) {
            g("/search/groups/?" + b("q=" + encodeURIComponent(z)))
          }
        },
        url: "/search/groups/?" + b("q=" + encodeURIComponent(z))
      });
      l.push({
        type: "search-people",
        message: a.transjax.get("nav-selecta", "search_people", '<em class="term-highlight">' + z + "</em>"),
        onclick: function () {
          if (!f) {
            g("/search/people/?" + b("m=names&q=" + encodeURIComponent(z)))
          }
        },
        url: "/search/people/?" + b("m=names&q=" + encodeURIComponent(z))
      })
    }
    if (q && typeof q === "string") {
      q = this._escapeForRegEx(q);
      q = a.StringFilters.substitute_equivalent_chars(q);
      var k = new RegExp(q, "i"), E, v, C, D, G, r;
      if (this.contacts) {
        var B = false, y = [];
        for (C = 0, G = this.contacts.length; C < G; C++) {
          v = false;
          E = this.contacts[C];
          E.matched = null;
          if (E.n && (!this.includeUser || z === this.meString) && E.n === a.config.flickr.user.nsid) {
            if (z === this.meString && !this.skipList[E.n]) {
              J = E
            }
            continue
          }
          if (E.e && !E.u && !E.n) {
            continue
          }
          if (this.skipList && (this.skipList[E.n] || this.skipList[E.e])) {
            continue
          }
          if (this.searchOnUsername && E.u && E.u.search(k) !== -1) {
            v = true;
            E.matched = "username";
            E.matchedPos = E.u.search(k)
          }
          if (!v && this.searchOnRealname && E.r && E.r.search(k) !== -1) {
            v = true;
            E.matched = "realname";
            E.matchedPos = E.r.search(k)
          }
          if (!v && this.searchOnEmail && E.e && q !== "@" && E.e.search(k) !== -1) {
            v = true;
            E.matched = "email";
            E.matchedPos = E.e.search(k)
          }
          if (!v && this.searchOnPathAlias && E.a && E.a.search(k) !== -1) {
            v = true;
            E.matched = "path_alias";
            E.matchedPos = E.a.search(k)
          }
          if (v) {
            B = true;
            E.type = "contact";
            y.push(E)
          }
        }
        if (B) {
          s = {username: 0, realname: 1, email: 2, path_alias: 3};
          y.sort(function (L, m) {
            var K = (L.n && L.u) ? "contact" : "addressBookEntry";
            var M = (m.n && m.u) ? "contact" : "addressBookEntry";
            if (K !== M) {
              return (K === "contact") ? -1 : 1
            }
            if (L.matchedPos === m.matchedPos) {
              if (s[L.matched] === s[m.matched]) {
                var N = L.u.charCodeAt(0), n = m.u.charCodeAt(0);
                if (N === n) {
                  return 0
                } else {
                  if (N < n) {
                    return -1
                  } else {
                    return 1
                  }
                }
              } else {
                if (s[L.matched] < s[m.matched]) {
                  return -1
                } else {
                  return 1
                }
              }
            } else {
              if (L.matchedPos < m.matchedPos) {
                return -1
              } else {
                return 1
              }
            }
          });
          if (z === this.meString && J) {
            J.matched = "username";
            l.unshift(J)
          }
          l = l.concat(y.slice(0, this.maxContactsDisplayed))
        }
      } else {
        if (a.config.flickr.user && a.config.flickr.user.nsid) {
          this.fetchData()
        }
      }
      if (this.groups) {
      }
      if (a.NavSelecta.nav_sections) {
        var p = false, w = [], o;
        for (C = 0, G = a.NavSelecta.nav_sections.length; C < G; C++) {
          v = false;
          section = a.NavSelecta.nav_sections[C];
          section.matched = null;
          if (section.name && section.name.search(k) !== -1) {
            v = true;
            section.matched = "name";
            section.matchedPos = section.name.search(k)
          }
          if (!v && section.aliases && section.aliases.length) {
            for (D = 0, r = section.aliases.length; D < r; D++) {
              o = section.aliases[D].search(k);
              if (o !== -1 && (!section.matchedPos || o < section.matchedPos)) {
                v = true;
                section.matched = "alias";
                section.matchedPos = o
              }
            }
          }
          if (!v && this.searchOnURL && section.url && section.url.search(k) !== -1) {
            v = true;
            section.matched = "url";
            section.matchedPos = section.url.search(k)
          }
          if (v) {
            p = true;
            section.type = "section";
            w.push(section)
          }
        }
        if (p) {
          s = {name: 0, alias: 1, url: 2};
          w.sort(function (K, m) {
            if (K.matchedPos === m.matchedPos) {
              if (s[K.matched] === s[m.matched]) {
                var L = K.name.charCodeAt(0), n = m.name.charCodeAt(0);
                if (L === n) {
                  return 0
                } else {
                  if (L < n) {
                    return -1
                  } else {
                    return 1
                  }
                }
              } else {
                if (s[K.matched] < s[m.matched]) {
                  return -1
                } else {
                  return 1
                }
              }
            } else {
              if (K.matchedPos < m.matchedPos) {
                return -1
              } else {
                return 1
              }
            }
          });
          l = l.concat(w.slice(0, this.maxSectionsDisplayed))
        }
      }
    }
    return l
  };
  c._formatResult = function (q, z, r) {
    var s = this, B, v = [], G, m, l, w, k = !q ? null : new RegExp(a.StringFilters.substitute_equivalent_chars(s._escapeForRegEx(q)), "gi"), t, p, x, D, A, o, u = false, E = false;
    if (!q) {
      q = ""
    }
    for (var y = 0, C = z.length; y < C; y++) {
      B = z[y].raw;
      if (!B) {
        continue
      }
      if (B.type === "search-more") {
        G = '<p class="bs-message bs-onclick ns-search ns-search-more"><span class="inner"><span class="icon"></span>' + B.message + "</span></p>";
        v.push(G);
        continue
      }
      if (B.type.match(/^search/)) {
        G = '<p class="bs-message bs-onclick ns-search"><a class="inner" href="' + B.url + '"><span class="icon"></span>' + B.message + "</a></p>";
        v.push(G);
        continue
      }
      if (B.type === "section") {
        G = '<p class="bs-message ns-section ns-section-' + (B.sectionType ? B.sectionType : "generic") + (E ? "" : " first-section") + '"><a href="' + B.url + '" class="inner"><span class="icon"></span>' + h(B.name, k) + "</a></p>";
        v.push(G);
        E = true;
        continue
      }
      if (B.globalSearchLink) {
        G = '<p class="bs-global-search-link bs-message bs-onclick"><span>' + B.message + "</span></p>";
        v.push(G);
        continue
      }
      if (B.message) {
        G = '<p class="bs-message' + (B.notFoundLink ? "" : " bs-onclick") + (B.disableActive ? " bs-disable-active" : "") + (B.className ? " " + B.className : "") + '">' + B.message + "</p>";
        v.push(G);
        continue
      }
      pClasses = [];
      if (!u) {
        pClasses.push("first-contact")
      }
      if (z[y + 1] && z[y + 1].raw && z[y + 1].raw.type !== "contact") {
        pClasses.push("last-contact")
      }
      w = (pClasses.length) ? ' class="' + pClasses.join(" ") + '"' : "";
      if (B.e && !B.u && !B.n) {
        if (!B.i) {
          B.i = "/images/icon_unread.gif"
        }
        m = s.showIcon ? '<img src="' + B.i + '" width="16" height="16" class="BuddyIconX bs-email-icon">' : "";
        l = '<p email="' + B.e + '"' + w + '><span class="name name-email">' + m + '<strong class="username">' + h(B.e, k) + '</strong></span><span class="relationship"></span></p>';
        v.push(l);
        u = true;
        continue
      }
      t = (B.a) ? B.a : B.n;
      p = ' / <a href="/people/' + t + '/">' + a.transjax.get("bo-selecta", "uber_contact_list_view_profile") + "</a>";
      if (!B.i) {
        B.i = (B.f && B.f !== 0 && B.s && B.s !== 0) ? "http://farm" + B.f + "." + a.config.flickr.static_domain + "/" + B.s + "/buddyicons/" + B.n + ".jpg" : "http://www.flickr.com/images/buddyicon.gif"
      }
      if (F.config.flickr.is_secure) {
        B.i = B.i.replace("http:", "https:")
      }
      x = "";
      if (s.showRelationship) {
        if (B.d === "1" && B.y === "1") {
          x += a.transjax.get("bo-selecta", "uber_contact_list_friend_and_family")
        } else {
          if (B.d === "1") {
            x += a.transjax.get("bo-selecta", "uber_contact_list_friend")
          } else {
            if (B.y === "1") {
              x += a.transjax.get("bo-selecta", "uber_contact_list_family")
            } else {
              if (B.removed === "1") {
                x += '<em class="contact-removed">' + a.transjax.get("bo-selecta", "uber_contact_list_removed") + "</em>"
              } else {
                if (s.searchingGlobally) {
                  x += ""
                } else {
                  x += a.transjax.get("bo-selecta", "uber_contact_list_contact")
                }
              }
            }
          }
        }
        if (s.showEditRelationshipLink && !s.searchingGlobally) {
          x += ' <span class="edit-rel">(<a href="/people/' + t + '/relationship/" onclick="icon_windowOpenFromLink(\'' + B.n + "'); return false;\">" + a.transjax.get("bo-selecta", "uber_contact_list_edit") + "</a>)</span>"
        }
      }
      m = s.showIcon ? '<img src="' + B.i + '" width="24" height="24" class="BuddyIconX fade-in" nsid="' + B.n + '" ' + s.iconAnimCode + ">" : "";
      m = s.linkUsernameToPhotostream ? '<a href="/photos/' + t + '/">' + m + "</a>" : m;
      D = s.showUsername ? h(s._sanitizeString(B.u, k)) : "";
      D = s.linkUsernameToPhotostream ? '<strong class="username"><a href="/photos/' + t + '/">' + D + "</a></strong>" : '<strong class="username">' + D + "</strong>";
      A = "";
      if (s.showSubtitle) {
        if (!B.matched || B.matched === "realname") {
          A = B.r ? h(B.r, k) : a.transjax.get("bo-selecta", "uber_contact_list_no_realname")
        } else {
          if (B.matched === "username") {
            A = B.r ? s._sanitizeString(B.r) : a.transjax.get("bo-selecta", "uber_contact_list_no_realname")
          } else {
            if (B.matched === "email") {
              A = h(B.e, k)
            } else {
              if (B.matched === "path_alias" && B.a) {
                A = "flickr.com/people/" + h(B.a, k) + "/"
              }
            }
          }
        }
        A = s.linkSubtitle ? '<a title="' + a.transjax.get("bo-selecta", "uber_contact_list_view_profile") + '" href="/people/' + t + '/" class="realname">' + A + "</a>" : '<span class="realname">' + A + "</span>"
      }
      o = a.Node.create('<p nsid="' + B.n + '"' + w + '><span class="name">' + m + D + A + '</span><span class="relationship">' + x + "</span></p>");
      a.imageFader.attach(o.all("img"));
      v.push(o);
      u = true
    }
    return v
  };
  function h(o, m) {
    if (!o) {
      return o
    }
    var k, l, n;
    o = a.StringFilters.unescape_entities(o, true);
    l = m ? o.search(m) : -1;
    if (l === -1) {
      return a.BoSelecta3.sanitizeString(o)
    }
    k = o.match(m);
    n = l + k[0].length;
    return a.StringFilters.escape_entities(o.substring(0, l), true) + '<span class="term-highlight">' + a.StringFilters.escape_entities(o.substring(l, n), true) + "</span>" + a.StringFilters.escape_entities(o.substring(n, o.length), true)
  }

  function j(k) {
    return a.transjax.get("nav-selecta", k)
  }

  c.addSections = function (k) {
    a.NavSelecta.nav_sections = a.NavSelecta.nav_sections.concat(k)
  };
  i.nav_sections = [{
    name: j("section_your_photostream"),
    sectionType: "photos",
    url: "/photos/me/",
    aliases: []
  }, {
    name: j("section_your_sets"),
    sectionType: "photos",
    url: "/photos/me/sets/",
    aliases: []
  }, {
    name: j("section_your_collections"),
    sectionType: "photos",
    url: "/photos/me/collections/",
    aliases: []
  }, {
    name: j("section_your_galleries"),
    sectionType: "photos",
    url: "/photos/me/galleries/",
    aliases: []
  }, {
    name: j("section_your_archives"),
    sectionType: "photos",
    url: "/photos/me/archives/",
    aliases: []
  }, {
    name: j("section_your_tags"),
    sectionType: "photos",
    url: "/photos/me/tags/",
    aliases: []
  }, {
    name: j("section_your_map"),
    sectionType: "map",
    url: "/photos/me/map/",
    aliases: []
  }, {
    name: j("section_your_favorites"),
    sectionType: "photos",
    url: "/photos/me/favorites/",
    aliases: []
  }, {
    name: j("section_your_stats"),
    sectionType: "stats",
    url: "/photos/me/stats/",
    aliases: ["Graphs", "Referrers", "Referers", "Views", j("section_alias_graphs"), j("section_alias_referrers"), j("section_alias_views")]
  }, {
    name: j("section_your_apps"),
    sectionType: "",
    url: "/services/apps/by/me/",
    aliases: []
  }, {
    name: j("section_recent_activity"),
    sectionType: "activity",
    url: "/activity/",
    aliases: []
  }, {
    name: j("section_photos_of_you"),
    sectionType: "photos",
    url: "/photosof/me/",
    aliases: []
  }, {
    name: j("section_upload_photos"),
    sectionType: "photos",
    url: "/photos/upload/",
    aliases: ["Uploadr", j("section_alias_upload")]
  }, {
    name: j("section_your_account"),
    sectionType: "text",
    url: "/account/",
    aliases: ["Settings", "Preferences", j("section_alias_settings"), j("section_alias_preferences")]
  }, {
    name: j("section_your_profile"),
    sectionType: "",
    url: "/people/me/",
    aliases: []
  }, {
    name: j("section_flickrmail"),
    sectionType: "text",
    url: "/mail/",
    aliases: []
  }, {
    name: j("section_organize_and_create"),
    sectionType: "photos",
    url: "/photos/organize/",
    aliases: ["Batch", j("section_alias_batch")]
  }, {
    name: j("section_prints_and_photo_products"),
    sectionType: "photos",
    url: "/photos/organize/?start_tab=print",
    aliases: ["Snapfish", "Prints", "Calendar", "Book", "Buy", j("section_alias_prints"), j("section_alias_calendar"), j("section_alias_book"), j("section_alias_buy")]
  }, {
    name: j("section_contacts"),
    sectionType: "photos",
    url: "/photos/contacts/",
    aliases: []
  }, {
    name: j("section_photos_of_your_contacts"),
    sectionType: "photos",
    url: "/photosof/contacts/",
    aliases: []
  }, {
    name: j("section_contact_list"),
    sectionType: "contacts",
    url: "/people/me/contacts/",
    aliases: []
  }, {
    name: j("section_find_your_friends"),
    sectionType: "contacts",
    url: "/import/people/",
    aliases: ["Facebook", "Gmail", "Hotmail", "Yahoo Mail"]
  }, {
    name: j("section_invite_your_friends"),
    sectionType: "contacts",
    url: "/invite/",
    aliases: []
  }, {
    name: j("section_invite_history"),
    sectionType: "text",
    url: "/invite/history/",
    aliases: []
  }, {
    name: j("section_guest_pass_history"),
    sectionType: "text",
    url: "/invite/history/guests/",
    aliases: ["Guestpass"]
  }, {
    name: j("section_your_groups"),
    sectionType: "photos",
    url: "/groups/",
    aliases: []
  }, {
    name: j("section_recent_changes_in_your_groups"),
    sectionType: "activity",
    url: "/recent.gne",
    aliases: []
  }, {
    name: j("section_create_a_new_group"),
    sectionType: "text",
    url: "/groups_create.gne",
    aliases: []
  }, {name: j("section_the_tour"), sectionType: "text", url: "/tour/", aliases: []}, {
    name: j("section_explore"),
    sectionType: "photos",
    url: "/explore/",
    aliases: []
  }, {
    name: j("section_last_7_days_interesting"),
    sectionType: "photos",
    url: "/explore/interesting/7days/",
    aliases: []
  }, {
    name: j("section_popular_tags"),
    sectionType: "photos",
    url: "/photos/tags/",
    aliases: []
  }, {
    name: j("section_most_recent_uploads_to_flickr"),
    sectionType: "photos",
    url: "/photos/",
    aliases: []
  }, {
    name: j("section_video_on_flickr"),
    sectionType: "video",
    url: "/explore/video/",
    aliases: []
  }, {
    name: j("section_galleries"),
    sectionType: "photos",
    url: "/galleries/",
    aliases: []
  }, {
    name: j("section_explore_analog"),
    sectionType: "photos",
    url: "/analog/",
    aliases: ["Film", j("section_alias_film")]
  }, {name: j("section_world_map"), sectionType: "map", url: "/map/", aliases: []}, {
    name: j("section_places"),
    sectionType: "map",
    url: "/places/",
    aliases: []
  }, {
    name: j("section_the_commons"),
    sectionType: "photos",
    url: "/commons/",
    aliases: []
  }, {
    name: j("section_creative_commons"),
    sectionType: "photos",
    url: "/creativecommons/",
    aliases: ["CC", "License", j("section_alias_license")]
  }, {
    name: j("section_flickrblog"),
    sectionType: "photos",
    url: "http://blog.flickr.com/",
    aliases: []
  }, {
    name: j("section_getty_images"),
    sectionType: "photos",
    url: "/gettyimages/",
    aliases: ["License", "Buy", "Sell", j("section_alias_license"), j("section_alias_buy"), j("section_alias_sell")]
  }, {
    name: j("section_code_flickr"),
    sectionType: "code",
    url: "http://code.flickr.com/",
    aliases: ["API", "Developer", "Programming", "Documentation", j("section_alias_developer"), j("section_alias_programming"), j("section_alias_documentation")]
  }, {
    name: j("section_the_app_garden"),
    sectionType: "text",
    url: "/services/",
    aliases: ["Apps"]
  }, {
    name: j("section_camera_finder"),
    sectionType: "text",
    url: "/cameras/",
    aliases: []
  }, {
    name: j("section_developer_guidelines"),
    sectionType: "code",
    url: "/services/developer/",
    aliases: ["API", "Programming", "Code", "Documentation", j("section_alias_programming"), j("section_alias_code"), j("section_alias_documentation")]
  }, {
    name: j("section_api_docs"),
    sectionType: "code",
    url: "/services/api/",
    aliases: ["API", "Developer", "Programming", "Code", "Documentation", j("section_alias_developer"), j("section_alias_programming"), j("section_alias_code"), j("section_alias_documentation")]
  }, {
    name: j("section_feeds"),
    sectionType: "text",
    url: "/services/feeds/",
    aliases: ["RSS", "Atom", "Data"]
  }, {
    name: j("section_help"),
    sectionType: "text",
    url: "/help/",
    aliases: []
  }, {
    name: j("section_community_guidelines"),
    sectionType: "text",
    url: "/help/guidelines/",
    aliases: []
  }, {
    name: j("section_the_help_forum"),
    sectionType: "text",
    url: "/help/forum/",
    aliases: []
  }, {
    name: j("section_faq"),
    sectionType: "text",
    url: "/help/faq/",
    aliases: ["Frequently"]
  }, {
    name: j("section_tools"),
    sectionType: "text",
    url: "/tools/",
    aliases: ["Upload", "Plug-in", "Mac", "Windows", j("section_alias_upload"), j("section_alias_plugin")]
  }, {
    name: j("section_about_flickr"),
    sectionType: "meta",
    url: "/about/",
    aliases: ["Staff", j("section_alias_staff")]
  }, {
    name: j("section_jobs"),
    sectionType: "meta",
    url: "/jobs/",
    aliases: ["Career", "Work", j("section_alias_career"), j("section_alias_work")]
  }, {name: j("section_mobile"), sectionType: "", url: "/mobile/", aliases: ["Cellphone"]}, {
    name: "Android",
    sectionType: "",
    url: "/android/",
    aliases: []
  }];
  a.extend(a.NavSelecta, a.BoSelecta3, c, i)
}, "0.0.1", {
  requires: F.config.modules["nav-selecta"].requires || [],
  optional: F.config.modules["nav-selecta"].optional || []
});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("json-stringify", function (e, t) {
  var n = ":", r = e.config.global.JSON;
  e.mix(e.namespace("JSON"), {
    dateToString: function (e) {
      function t(e) {
        return e < 10 ? "0" + e : e
      }

      return e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + n + t(e.getUTCMinutes()) + n + t(e.getUTCSeconds()) + "Z"
    }, stringify: function () {
      return r.stringify.apply(r, arguments)
    }, charCacheThreshold: 100
  })
}, "3.11.0", {requires: ["yui-base"]});
YUI.add("gallery-storage-lite", function (b) {
  var s = b.config.doc, j = b.config.win, c = b.JSON, r = b.namespace("StorageLite"), i = "yui_storage_lite", v = "YUI StorageLite data", y = 1048576, p = "1.0", t = "ready", x = 0, h = 1, a = 2, m = 3, k = 4, f = "yui_storage_lite", l = "data", u = {}, n, g;
  try {
    if (j.localStorage) {
      g = h
    } else {
      if (j.globalStorage) {
        g = a;
        var o = j.globalStorage[j.location.hostname]
      } else {
        if (j.openDatabase && navigator.userAgent.indexOf("Chrome") === -1) {
          g = m
        } else {
          if (b.UA.ie >= 5) {
            g = k
          } else {
            g = x
          }
        }
      }
    }
  } catch (q) {
    g = x
  }
  b.StorageFullError = function (d) {
    b.StorageFullError.superclass.constructor.call(d);
    this.name = "StorageFullError";
    this.message = d || "Maximum storage capacity reached";
    if (b.UA.ie) {
      this.description = this.message
    }
  };
  b.extend(b.StorageFullError, Error);
  b.augment(r, b.EventTarget, true, null, {emitFacade: true, prefix: "storage-lite", preventable: false});
  r.publish(t, {fireOnce: true});
  b.mix(r, {
    clear: function () {
    }, getItem: function (e, d) {
      return null
    }, length: function () {
      return 0
    }, removeItem: function (d) {
    }, setItem: function (d, e) {
    }
  });
  if (g === h || g === a) {
    b.mix(r, {
      length: function () {
        return n.length
      }, removeItem: function (d) {
        n.removeItem(d)
      }, setItem: function (e, w, d) {
        n.setItem(e, d ? c.stringify(w) : w)
      }
    }, true);
    if (g === h) {
      n = j.localStorage;
      b.mix(r, {
        clear: function () {
          n.clear()
        }, getItem: function (w, e) {
          try {
            return e ? c.parse(n.getItem(w)) : n.getItem(w)
          } catch (d) {
            return null
          }
        }
      }, true)
    } else {
      if (g === a) {
        n = j.globalStorage[j.location.hostname];
        b.mix(r, {
          clear: function () {
            for (var d in n) {
              if (n.hasOwnProperty(d)) {
                n.removeItem(d);
                delete n[d]
              }
            }
          }, getItem: function (w, e) {
            try {
              return e ? c.parse(n[w].value) : n[w].value
            } catch (d) {
              return null
            }
          }
        }, true)
      }
    }
    r.fire(t)
  } else {
    if (g === m || g === k) {
      b.mix(r, {
        clear: function () {
          u = {};
          r._save()
        }, getItem: function (e, d) {
          return u.hasOwnProperty(e) ? u[e] : null
        }, length: function () {
          var e = 0, d;
          for (d in u) {
            if (u.hasOwnProperty(d)) {
              e += 1
            }
          }
          return e
        }, removeItem: function (d) {
          if (u) {
            delete u[d];
            r._save()
          } else {
            u = {}
          }
        }, setItem: function (e, w, d) {
          u[e] = w;
          r._save()
        }
      }, true);
      if (g === m) {
        n = j.openDatabase(i, p, v, y);
        b.mix(r, {
          _save: function () {
            n.transaction(function (d) {
              d.executeSql("REPLACE INTO " + i + " (name, value) VALUES ('data', ?)", [c.stringify(u)])
            })
          }
        }, true);
        n.transaction(function (d) {
          d.executeSql("CREATE TABLE IF NOT EXISTS " + i + "(name TEXT PRIMARY KEY, value TEXT NOT NULL)");
          d.executeSql("SELECT value FROM " + i + " WHERE name = 'data'", [], function (z, w) {
            if (w.rows.length) {
              try {
                u = c.parse(w.rows.item(0).value)
              } catch (e) {
                u = {}
              }
            }
            r.fire(t)
          })
        })
      } else {
        if (g === k) {
          n = s.createElement("span");
          n.addBehavior("#default#userData");
          b.mix(r, {
            _save: function () {
              var e = c.stringify(u);
              try {
                n.setAttribute(l, e);
                n.save(f)
              } catch (d) {
                throw new b.StorageFullError()
              }
            }
          }, true);
          b.on("domready", function () {
            s.body.appendChild(n);
            n.load(f);
            try {
              u = c.parse(n.getAttribute(l))
            } catch (d) {
              u = {}
            }
            r.fire(t)
          })
        }
      }
    } else {
      r.fire(t)
    }
  }
}, "1.0.0", {requires: ["event-base", "event-custom", "event-custom-complex", "json"]});
YUI.add("occult", function (e) {
  if (typeof window.FLICKR === "undefined") {
    window.FLICKR = {};
    var d = window.FLICKR
  }
  function c() {
    var f = arguments, l = null, h, g, k;
    for (h = 0; h < f.length; h = h + 1) {
      k = ("" + f[h]).split(".");
      l = FLICKR;
      for (g = (k[0] == "FLICKR") ? 1 : 0; g < k.length; g = g + 1) {
        l[k[g]] = l[k[g]] || {};
        l = l[k[g]]
      }
    }
    return l
  }

  function b(h, l) {
    c(h);
    var g = h.split("."), f = g.length, k = FLICKR;
    for (var j = 0; j < g.length - 1; j++) {
      k = k[g[j]]
    }
    k[g[f - 1]] = l
  }

  function a(f, g) {
    return d[f]
  }

  e.occult = {register: b, get: a}
}, "0.0.1", {});
YUI.add("photo-transjax", function (a) {
  a.transjax.add("photo", {
    your_favorites: 'Your favorites',
    untitled: 'Untitled',
    window_title: '%s | Flickr - Photo Sharing!'
  })
}, "0.0.1", {requires: ["transjax-base"]});
(function () {
  var a = "type-cast";
  YUI.add(a, function (h) {
    function e(i) {
      if (h.Lang.isNumber(i)) {
        i = i + ""
      }
      return h.Lang.isString(i) ? i : ""
    }

    function c(i) {
      if (i === "0") {
        i = 0
      }
      return !!i
    }

    function d(i) {
      i = parseInt(i, 10);
      if (!h.Lang.isNumber(i)) {
        return undefined
      }
      return i
    }

    function f(i) {
      i = d(i);
      if (!h.Lang.isNumber(i) || i < 0 || i > 3) {
        return undefined
      }
      return i
    }

    function b(i) {
      return h.Lang.isArray(i) ? i : []
    }

    function g(i) {
      return h.Lang.isObject(i) ? i : {}
    }

    h.TypeCast = {string: e, bool: c, integer: d, integer0123: f, arr: b, obj: g}
  }, "0.0.1", {requires: F.config.modules[a].requires || [], optional: F.config.modules[a].optional || []})
}());
(function () {
  var a = "urls";
  YUI.add(a, function (b) {
    var h = {
      photo: /^\/photos\/([^\/]+)\/(\d+)(?:\/in\/([^\/]+))?(?:(?:\/page(\d+))|(?:\/(lightbox))|(?:\/(tour)))?/,
      photostream: /^\/photos\/([^\/]+)(?:\/page(\d+))?(?:\/with\/(\d+))?\/?(lightbox\/?)?/,
      delete_photo: /^\/photos\/([^\/]+)\/?\?delete=(\d+)(?:&context=([^&]+))?/,
      faves: /^\/photos\/([^\/]+)\/favorites(?:\/from\/([^\/]+))?(?:\/page(\d+))?(?:\/with\/(\d+))?(?:\/(lightbox))?\/?(?:\?(?:[^&]*&)?view=([^&]+))?/,
      explore: /^\/explore\/?(\d{4}\/\d{2}\/\d{2})?(?:\/?with\/([0-9]+))?\/?(lightbox\/?)?/,
      group_pool: /^\/groups\/([^\/]+)\/?(?:pool)?(?:\/((?:(?!with|page|lightbox)[^\/\?])+))?(?:\/with\/(\d+))?(?:\/page(\d+))?(\/lightbox)?\/?(?:\?(?:[^&]*&)?view=([^&]+))?/,
      gallery: /^\/photos\/([^\/]+)\/galleries\/([0-9]+)(?:\/page(\d+))?(?:\/with\/(\d+))?(?:\/(lightbox))?/,
      contacts: /^\/photos\/(?:friends|contacts)(?:\/page(\d+))?(?:\/with\/(\d+))?(?:\/(lightbox))?\/?(?:\?(?:[^&]*&)?view=([^&]+))?/,
      contactsfaves: /^\/photos\/contacts\/favorites(?:\/page(\d+))?(?:\/with\/(\d+))?(?:\/(lightbox))?\/?(?:\?(?:[^&]*&)?view=([^&]+))?/
    };

    function e(r, t) {
      var q, s = {};
      if (!h[r]) {
        b.log('[urls] no regex found for page_type "' + r + '"');
        return
      }
      q = h[r].exec(t);
      switch (r) {
        case"photo":
          s.path_alias = q[1] && decodeURIComponent(q[1]);
          s.photo_id = q[2];
          s.context_id = q[3] && decodeURIComponent(q[3]);
          s.page = q[4];
          s.lightbox = q[5] ? true : false;
          s.tour = q[6] ? true : false;
          break;
        case"photostream":
          s.path_alias = q[1] && decodeURIComponent(q[1]);
          s.page = q[2];
          s.photo_id = q[3];
          s.lightbox = q[4] ? true : false;
          break;
        case"delete_photo":
          s.path_alias = q[1] && decodeURIComponent(q[1]);
          s.photo_id = q[2];
          s.context_id = q[3];
          break;
        case"faves":
          s.path_alias = q[1] && decodeURIComponent(q[1]);
          s.from = q[2] && decodeURIComponent(q[2]);
          s.page = q[3];
          s.photo_id = q[4];
          s.lightbox = q[5] ? true : false;
          s.view_mode = q[6];
          break;
        case"group_pool":
          s.group_id = q[1] && decodeURIComponent(q[1]);
          s.owner_id = q[2] && decodeURIComponent(q[2]);
          s.photo_id = q[3];
          s.page = q[4];
          s.lightbox = q[5] ? true : false;
          s.view_mode = q[6];
          break;
        case"gallery":
          s.path_alias = q[1] && decodeURIComponent(q[1]);
          s.gallery_id = q[2] && decodeURIComponent(q[2]);
          s.page = q[3];
          s.photo_id = q[4];
          s.lightbox = q[5] ? true : false;
          break;
        case"contacts":
          s.page = q[1];
          s.photo_id = q[2];
          s.lightbox = q[3] ? true : false;
          s.view_mode = q[4];
          break;
        case"contactsfaves":
          s.page = q[1];
          s.photo_id = q[2];
          s.lightbox = q[3] ? true : false;
          s.view_mode = q[4];
          break;
        case"explore":
          s.date = q[1];
          s.photo_id = q[2];
          s.lightbox = q[3]
      }
      return s
    }

    function c(s, r) {
      var q;
      r = r || {};
      if (r.photo && b.Lang.isString(r.photo)) {
        r.photo_id = r.photo;
        if (b.PhotoData) {
          r.photo = b.PhotoData.get(r.photo)
        }
        if (!b.Lang.isObject(r.photo)) {
          r.photo = undefined;
          delete r.photo
        }
      }
      if (b.Lang.isObject(r.photo)) {
        r.photo_id = r.photo.get("id")
      }
      switch (s) {
        case"photo":
          q = p(r);
          break;
        case"photostream":
          q = l(r);
          break;
        case"delete_photo":
          q = o(r);
          break;
        case"faves":
          q = n(r);
          break;
        case"group_pool":
          q = i(r);
          break;
        case"gallery":
          q = d(r);
          break;
        case"contacts":
          q = m(r);
          break;
        case"contactsfaves":
          q = k(r);
          break;
        case"explore":
          q = g(r);
          break
      }
      return q
    }

    function p(v) {
      var s, t, u, r, z, x, B, y, A, w, q;
      s = v.photo;
      t = v.photo_id;
      u = v.path_alias;
      if (!b.Lang.isObject(s) && !t) {
        b.log("[urls] missing photo object or ID");
        return
      }
      if (!b.Lang.isObject(s) && !u) {
        b.log("[urls] missing photo object or path alias");
        return
      }
      t = t || s.get("id");
      u = u || s.get("pathalias") || s.get("owner");
      if (v.context) {
        if (b.Lang.isString(v.context)) {
          r = v.context
        } else {
          if (b.Lang.isObject(v.context) && b.Lang.isString(v.context.id)) {
            r = v.context.id
          }
        }
      }
      if (v.page) {
        z = parseInt(v.page, 10);
        if (z === 1 || !b.Lang.isNumber(z)) {
          z = false
        }
      }
      x = b.Lang.isBoolean(v.lightbox) ? v.lightbox : false;
      B = (b.Lang.isBoolean(v.sizes) || b.Lang.isString(v.sizes)) ? v.sizes : false;
      y = b.Lang.isString(v.hash) ? v.hash : false;
      A = b.Lang.isBoolean(v.exif) ? v.exif : false;
      w = b.Lang.isBoolean(v.faves) ? v.faves : false;
      q = b.Lang.isBoolean(v.details) ? v.details : false;
      return "/photos/" + u + "/" + t + "/" + (B ? "sizes/" + (b.Lang.isString(B) ? B + "/" : "") : "") + (A ? "meta/" : "") + (w ? "favorites/" : "") + (q ? "edit-details/" : "") + (r ? ("in/" + r + "/") : "") + (z ? "page" + z + "/" : "") + (x ? "lightbox/" : "") + (y ? "#" + y : "")
    }

    function l(r) {
      var s, q;
      if (r.photo) {
        r.path_alias = r.photo.get("pathalias") || r.photo.get("owner")
      }
      s = r.path_alias;
      if (!s) {
        b.log("[urls] missing path_alias");
        return
      }
      q = "/photos/" + s + "/";
      if (r.person) {
        q += "people/" + r.person + "/"
      } else {
        if (r.tag) {
          if (b.Lang.isArray(r.tag)) {
            r.tag = r.tag.join(",")
          }
          q += "tags/" + r.tag + "/"
        } else {
          if (r.photo_id) {
            q += "with/" + r.photo_id + "/"
          }
        }
      }
      if (r.lightbox) {
        q += "lightbox/"
      }
      return q
    }

    function o(r) {
      var s, q;
      s = r.path_alias;
      if (!s) {
        b.log("[urls] missing path_alias");
        return
      }
      photo_id = r.photo_id;
      if (!photo_id) {
        b.log("[urls] missing photo_id");
        return
      }
      context_id = r.context_id;
      q = "/photos/" + s + "/?delete=" + photo_id + (context_id ? "&context=" + context_id : "") + "&magic_cookie=" + b.config.flickr.magic_cookie;
      return q
    }

    function n(r) {
      var s, q;
      s = r.path_alias;
      if (!s) {
        b.log("[urls] missing path_alias");
        return
      }
      q = "/photos/" + s + "/favorites/";
      if (r.from) {
        q += "from/" + r.from + "/"
      }
      if (r.page) {
        q += "page" + r.page + "/"
      }
      if (r.photo_id) {
        q += "with/" + r.photo_id + "/"
      }
      if (r.lightbox) {
        q += "lightbox/"
      }
      if (r.view_mode) {
        q += "?view=" + r.view_mode
      }
      return q
    }

    function i(r) {
      var s, q;
      s = r.group_id;
      if (!s) {
        b.log("[urls] missing group_id");
        return
      }
      q = "/groups/" + s + "/pool/";
      if (r.owner_id) {
        q += r.owner_id + "/"
      }
      if (r.photo_id) {
        q += "with/" + r.photo_id + "/"
      }
      if (r.page) {
        q += "page" + r.page + "/"
      }
      if (r.lightbox) {
        q += "lightbox/"
      }
      if (r.view_mode) {
        q += "?view=" + r.view_mode
      }
      return q
    }

    function m(r) {
      var q;
      q = "/photos/friends/";
      if (r.page) {
        q += "page" + r.page + "/"
      }
      if (r.photo_id) {
        q += "with/" + r.photo_id + "/"
      }
      if (r.lightbox) {
        q += "lightbox/"
      }
      if (r.view_mode) {
        q += "?view=" + r.view_mode
      }
      return q
    }

    function k(r) {
      var q;
      q = "/photos/contacts/favorites/";
      if (r.page) {
        q += "page" + r.page + "/"
      }
      if (r.photo_id) {
        q += "with/" + r.photo_id + "/"
      }
      if (r.lightbox) {
        q += "lightbox/"
      }
      if (r.view_mode) {
        q += "?view=" + r.view_mode
      }
      return q
    }

    function d(s) {
      var t, q, r;
      t = s.path_alias;
      q = s.gallery_id;
      if (!t) {
        b.log("[urls] missing path_alias");
        return
      }
      if (!q) {
        b.log("[urls] missing gallery_id");
        return
      }
      r = "/photos/" + t + "/galleries/" + q + "/";
      if (s.photo_id) {
        r += "with/" + s.photo_id + "/"
      }
      if (s.lightbox) {
        r += "lightbox/"
      }
      return r
    }

    function g(s) {
      var r, t, q;
      r = s.date;
      t = s.with_id;
      q = "/explore";
      if (r) {
        q += "/" + r
      }
      if (t) {
        q += "/with/" + t
      }
      if (s.lightbox) {
        q += "lightbox/"
      }
      return q
    }

    function j(r) {
      if (!b.Lang.isNumber(r)) {
        r = parseInt(r, 10)
      }
      var q = "", t = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
      var u = r, s;
      while (r >= 58) {
        u = r / 58;
        s = r - (58 * Math.floor(u));
        q = "" + t.substr(s, 1) + q;
        r = Math.floor(u)
      }
      return (u) ? "" + t.substr(u, 1) + q : q
    }

    function f(v) {
      var u = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
      var r = v.length;
      var q = 0;
      var t = 1;
      for (var s = (r - 1); s >= 0; s--) {
        q = q + t * u.indexOf(v[s]);
        t = t * u.length
      }
      return q
    }

    b.urls = {get: c, parse: e, getShortID: j, getLongID: f, regexes: h}
  }, "0.0.1", {requires: F.config.modules[a].requires || [], optional: F.config.modules[a].optional || []})
}());
(function () {
  var a = "grease";
  YUI.add(a, function (d) {
    var X = false, S, al, P = d.StorageLite, T = false, s, t, z, Q, W, E = "pc", y = "pic", u = "pf", g = "pct", R = "ps", Z = "ps3", j = "pp", q = "pps", aa = "/photo_grease_postlogin.gne", x = "fave", ad = "contact", ae = "share", G = "share_v3", h = "comment", e = /cookie_session=[^;]+/gi, l = ";", an = 3, O = 1000, L = [E, y, R, Z, u, g, u, j, q];
    if (d.config.flickr.flags.enable_grease) {
      X = true
    }
    Q = d.global_dialog;
    function p() {
      d.Array.each(L, function (Y) {
        P.removeItem(Y)
      })
    }

    var ah = (function () {
      var Y = null, ay = false, aq = 0, at = false, ar = false;

      function aw() {
        O = (O >= 10000) ? O : O * 2;
        return O
      }

      function ax() {
        if (ar) {
          if (Y) {
            Q.remove_existing_dialog();
            Y.cancel();
            ay = false
          }
          ar = false
        }
      }

      function au() {
        ar = false;
        if (Y) {
          Y.cancel()
        }
        ax();
        Q.remove_existing_dialog();
        ay = false;
        Y = null;
        at = false;
        aq = 0;
        O = 1000;
        at = false
      }

      function ap() {
        if (Y) {
          Y.cancel()
        }
        at = true;
        d.fire("grease:cancel")
      }

      function av() {
        if (at) {
          return
        }
        if (Y) {
          Y.cancel();
          Y = null
        }
        var az = {
          method: "post", data: "random=0", on: {
            success: function (aC, aB, aA) {
              if (aB && aB.responseText.substring(0, 1) === "1") {
                d.fire("grease:authenticated")
              } else {
                if (aq++ < an) {
                  m();
                  if (!Y) {
                    Y = d.later(aw(), this, av)
                  }
                }
              }
            }, failure: function () {
              if (aq++ < 1) {
                if (!Y) {
                  Y = d.later(aw(), this, av)
                }
              }
            }
          }
        };
        d.io("/fragment.gne?name=social-auth-fragment", az)
      }

      return {
        start: function () {
          if (!ar) {
            ar = true;
            av()
          } else {
            O = 50;
            Y && Y.cancel();
            av();
            return
          }
        }, stop: ax, cancel: ap, pause: function () {
          Y && Y.cancel();
          O = 1000000
        }, canceled: at, reset: au
      }
    }());

    function af(Y) {
      if (!X) {
        return
      }
      if (Y && d.config.flickr.user.nsid) {
        P.on("storage-lite:ready", function () {
          var aq = ag(E), av = ag(y), aB = ag(u), at = ag(g), ax = ag(R, true), aw = ag(Z, true), ap = ag(j), aA = ag(q);
          if (aq) {
            z = "comment";
            var az = aq.indexOf(";"), ar = aq.substring(0, az), ay = aq.substring(az + 1);
            if (ar === d.photo.getCurrentPhoto().get("id")) {
              ab(ay)
            }
          } else {
            if (av) {
              z = "comment";
              var az = av.indexOf(";"), ar = av.substring(0, az), ay = av.substring(az + 1);
              C(ay, ar)
            } else {
              if (aB) {
                z = "fave";
                V(aB)
              } else {
                if (at) {
                  z = "contact";
                  o(at)
                } else {
                  if (ax) {
                    z = "share";
                    I(ax)
                  } else {
                    if (aw) {
                      z = "sharev3";
                      aj(aw)
                    } else {
                      var au = d.one("#global-dialog-background");
                      if (au) {
                        au.setStyle("display", "none")
                      }
                      p()
                    }
                  }
                }
              }
            }
          }
        })
      } else {
        P.on("storage-lite:ready", function () {
          p()
        })
      }
    }

    function c() {
      d.detach("grease|*");
      S = false;
      m();
      W(false);
      ah.reset()
    }

    function f(Y) {
      if (Y.target.hasClass("close-x") || Y.target.hasClass("Butt")) {
        Y.preventDefault();
        Y.halt();
        d.global_dialog.hide()
      }
    }

    function A() {
      Q.show({loading: true, modal: true})
    }

    function m() {
      Q.hide()
    }

    function ak(ap) {
      var aq = d.one("body");
      var Y = aq.create('<img height="1" width="1" src="' + ap + '">');
      aq.appendChild(Y)
    }

    function J() {
      Q.create_dialog(d.one("#grease-confirm-" + z).get("innerHTML"), {width: 355}).show({loading: false, modal: true});
      d.one("#global_dialog").on("click", f, this);
      d.later(10000, this, d.global_dialog.hide);
      if (d.config.flickr.flags.enable_rapid_tracking && d.one("#reg-tour")) {
        d.use("rapid-tracker", function (ap) {
          ap.rapidTracker.addModules("grease-conversion-tracker");
          ap.rapidTracker.beaconClick("grease-conversion-tracker", z);
          switch (z) {
            case x:
              ak("https://pclick.internal.yahoo.com/p/s=2143640346&t=" + Math.random());
              break;
            case ad:
              ak("https://pclick.internal.yahoo.com/p/s=2143640345&t=" + Math.random());
              break;
            case ae:
              ak("https://pclick.internal.yahoo.com/p/s=2143640344&t=" + Math.random());
              break;
            default:
              ak("https://pclick.internal.yahoo.com/p/s=2143640343&t=" + Math.random())
          }
        })
      }
    }

    function V(ap) {
      var at, Y, au, aq, ar = true;
      if (d.photo && d.photo.getCurrentPhoto && d.photo.getCurrentPhoto() && d.photo.getCurrentPhoto().get("is_owner")) {
        if (Q) {
          Q.remove_existing_dialog()
        }
        aq = d.one("#global-dialog-background");
        if (aq) {
          aq.setStyle("display", "none")
        }
        p();
        return
      }
      if (d.PhotoData) {
        at = d.PhotoData.get(ap);
        if (at) {
          if (!at.get("is_fave")) {
            at.toggle_fave()
          }
          J();
          p()
        } else {
          if (typeof d.FlickrAppExplore !== "undefined") {
            au = d.FlickrAppExplore.getListModel();
            if (au) {
              au.toggleFave(ap);
              ar = false
            }
          }
          if (typeof d.FlickrAppPhotostream !== "undefined") {
            au = d.FlickrAppPhotostream.getListModel();
            if (au) {
              au.toggleFave(ap);
              neeedsAPI = false
            }
          }
          if (ar) {
            d.flickrAPI.callMethod("flickr.favorites.add", {photo_id: ap})
          }
          J();
          p()
        }
      }
    }

    function I(Y) {
      A();
      p();
      d.flickrAPI.callMethod("flickr.sharing.share", Y, {
        success: function (ap) {
          m();
          J()
        }, failure: r
      })
    }

    function aj(Y) {
      A();
      p();
      Y.magic_cookie = d.config.flickr.magic_cookie;
      Y.from_grease = 1;
      d.use("share-this-v3-dialog", function (ap) {
        ap.shareThisV3Dialog.do_share_action(Y)
      })
    }

    function r() {
      p();
      Q.create_dialog(d.one("#grease-error").get("innerHTML")).show({
        loading: false,
        modal: true,
        width: 355,
        style: "grease-error"
      });
      d.one("#global_dialog").on("click", f, this);
      d.later(5000, this, d.global_dialog.hide)
    }

    function o(Y) {
      A();
      contactArr = Y.split(";");
      d.flickrAPI.callMethod("flickr.contacts.add", {
        user_id: contactArr[0],
        friend: contactArr[1],
        family: contactArr[2]
      }, {
        success: function (ap) {
          m();
          J();
          p()
        }, failure: r
      })
    }

    function n() {
      if (document.cookie.match(e)) {
        S = false;
        A();
        ah.start()
      } else {
        d.later(20, this, n)
      }
    }

    function ab(aq) {
      A();
      p();
      var ap = d.one("#message");
      if (!ap) {
        r();
        return
      }
      d.one("#message").set("innerHTML", aq);
      var Y = {
        method: "post",
        data: "preview=0",
        form: {id: d.one(".add-comment-form form")},
        on: {
          success: function (aw, av, at) {
            m();
            J();
            var ar = d.one("#comments");
            ar.set("innerHTML", av.responseText);
            var au = ar.one(".Problem");
            if (au) {
              Q.create_alert_dialog(au.get("innerHTML"), function () {
                ar.one("#message").scrollIntoView()
              })
            }
          }
        }
      };
      d.io("/photo_comments_fragment.gne", Y)
    }

    function C(ar, aq) {
      p();
      var Y = "magic_cookie=" + d.config.flickr.magic_cookie + "&photo=" + aq + "&addcomment=1flash_ver=unknown&offset=" + (-1) + "&limit=4&show-chrome=true&view-more-count=20&hide-meta=true&message=" + ar;
      var ap = {
        method: "post", data: Y, on: {
          success: function (ay, ax, au) {
            var at = d.one("div[data-photo-id=" + aq + "]");
            if (at) {
              var av = at.getAttribute("data-comments-total-count");
              av = av === "" ? 0 : parseInt(av, 10);
              av++;
              at.setAttribute("data-comments-total-count", av);
              var aw = at.one(".comment-count");
              if (aw) {
                if (av < 100) {
                  aw.setHTML(av)
                } else {
                  aw.setHTML("99+")
                }
              }
            }
            m()
          }, failure: function (at, au) {
            m();
            showError(d.transjax.get("photo-comments", "error_add_generic"))
          }
        }
      };
      d.io("/photo_comments_fragment_2013.gne?cachebust=" + (new Date()).getTime(), ap)
    }

    function B(ar) {
      var aq;
      var aw = 650;
      var at;
      if (d.config.flickr.flags.enable_ads_on_login_page) {
        at = d.one(window).get("winWidth") || 0;
        if (!isNaN(aw)) {
          aw = Math.max(880, Math.min(1200, at))
        }
      }
      ah.reset();
      var ap = ar + "&popup=1&redir=" + aa + "?d=" + encodeURIComponent(window.location + "?reg=1") + "&src=" + z;
      if (d.config.flickr.is_touch_device) {
        aq = aa + "?d=" + window.location + "&notpopup=1&src=" + z + "&reg=1";
        window.location = ar + "&popup=0&redir=" + encodeURIComponent(aq);
        return false
      }
      try {
        al = window.open(ap, "newWindow", "width=" + aw + ",height=650,resizable=1,scrollbars=1,location=yes")
      } catch (av) {
        return true
      }
      try {
        if (al.focus) {
          al.focus()
        }
      } catch (Y) {
      }
      if (!al || al.closed || typeof al.closed === "undefined") {
        aq = aa + "?d=" + window.location + "&notpopup=1&src=" + z + "&reg=1";
        window.location = ar + "&popup=0&redir=" + encodeURIComponent(aq)
      } else {
        window.setTimeout(n, 500)
      }
      var au = d.one("window");
      au.on("grease|focus", function () {
        if (!ah.canceled) {
          ah.start()
        }
        if (!document.cookie.match(e)) {
          m();
          W(false);
          n()
        }
      });
      d.on("grease:cancel", function (ax) {
        S = false;
        c()
      });
      au.on("grease|blur", function () {
        if (!ah.canceled) {
          ah.pause()
        }
      });
      au.on("grease:timeout", function (ax) {
        S = false;
        c()
      });
      d.on("grease:authenticated", function (aB) {
        if (al) {
          try {
            al.close()
          } catch (az) {
          }
        }
        A();
        S = false;
        W(true);
        var aC = (Z), ax = ["reg=1", "src=" + z];
        if (aC) {
          var aA = window.location.toString(), ay = aA.match(/\?/i);
          aA += (!ay ? "?" : "&") + ax.join("&");
          if (aA.indexOf("#?") !== -1) {
            aA = aA.replace("#", "")
          }
          window.location = aA
        } else {
          window.location = d.urls.get("photo", {photo: d.photo.getCurrentPhoto()}) + "?" + ax.join("&")
        }
      });
      return false
    }

    function b(aq, ar, ap) {
      var Y = ap || false;
      P.setItem(aq, ar, Y)
    }

    function ag(Y, aq) {
      var ap = aq || false;
      return P.getItem(Y, ap)
    }

    function H(Y) {
      if (!S) {
        ah.reset();
        W = Y || function () {
          };
        d.global_dialog.remove_existing_dialog();
        d.global_dialog.show({loading: true, modal: true});
        S = true;
        B("/signin?src=" + z + "&reg=1")
      } else {
        c();
        H(Y)
      }
    }

    function M(ap, Y) {
      Y = Y || d.photo.getCurrentPhoto().get("id");
      p();
      b(Y ? y : E, Y + l + ap);
      z = "comment"
    }

    function w(Y) {
      p();
      b(u, Y);
      z = "fave"
    }

    function ac(Y) {
      p();
      if (d.Lang.isArray(Y)) {
        b(g, Y.join(";"));
        z = "contact"
      }
    }

    function U(Y) {
      p();
      b(R, Y, true);
      z = "share"
    }

    function ai(Y) {
      p();
      b(Z, Y, true);
      z = "sharev3"
    }

    function v(Y) {
      p();
      b(j, Y);
      z = "party"
    }

    function ao(Y) {
      p();
      b(q, d.JSON.stringify(Y));
      z = "partyStart"
    }

    d.grease = {
      init: af,
      enabled: X,
      authenticate: H,
      postComment: M,
      addFave: w,
      addContact: ac,
      share: U,
      shareV3: ai,
      photoParty: v,
      photoPartyStart: ao
    };
    if (d.config.flickr.user.admin_user === "saw") {
      d.occult.register("postComment", function (Y) {
        ab(Y)
      });
      d.occult.register("showdialog", function (Y) {
        z = "fave";
        J()
      });
      d.occult.register("fakeerror", function (Y) {
        r(Y)
      })
    }
    var i = d.one("#reg-tour");

    function k() {
      for (var Y = 1; Y < 4; Y++) {
        am.removeClass(K + Y)
      }
    }

    function N(Y) {
      Y.preventDefault();
      k();
      d.Event.purgeElement("#reg-tour");
      i.addClass("hidden")
    }

    function D(Y) {
      if (Y.test("#reg-tour")) {
        return
      }
      if (Y.test("ol li")) {
        k();
        switch (Y.get("id")) {
          case"step-1":
            am.addClass(K + 1);
            break;
          case"step-2":
            am.addClass(K + 2);
            break;
          case"step-3":
            am.addClass(K + 3);
            break
        }
      } else {
        D(Y.get("parentNode"))
      }
    }

    if (i) {
      var K = "tour-step", am = d.one("body");
      i.one(".close-x").on("click", N);
      i.on("mouseover", function (Y) {
        D(Y.target)
      });
      i.on("mouseout", function (Y) {
        k()
      })
    }
  }, "0.0.1", {requires: F.config.modules[a].requires || [], optional: F.config.modules[a].optional || []})
}());
YUI.add("photo-data", function (g) {
  var b = {}, a = g.TypeCast;

  function f(i) {
    var h;
    if (i instanceof d) {
      h = i
    } else {
      if (b[i.id]) {
        h = b[i.id];
        h.merge_data(i)
      } else {
        h = new d(i);
        b[i.id] = h
      }
    }
    return h
  }

  function c(h) {
    if (typeof h === "undefined") {
      return b
    } else {
      return b[h]
    }
  }

  function e(h) {
    return g.Lang.isNumber(h) && parseInt(h, 10) === h
  }

  g.PhotoData = {add: f, get: c};
  function d(h) {
    d.superclass.constructor.apply(this, arguments)
  }

  d.NAME = "PhotoData";
  d.ATTRS = {
    id: {value: ""},
    title: {
      broadcast: 1, value: "", setter: function (i, h) {
        i = a.string(i);
        return i.replace(/^\s+$/, "")
      }
    },
    description: {broadcast: 1, value: "", setter: a.string},
    owner: {
      value: "", setter: function (h) {
        if (!g.Lang.isString(h)) {
          if (g.Lang.isObject(h) && h.nsid) {
            h = h.nsid
          } else {
            h = ""
          }
        }
        return h
      }
    },
    ownername: {value: ""},
    pathalias: {value: ""},
    iconserver: {value: ""},
    iconfarm: {value: ""},
    url: {
      value: "", getter: function (i, h) {
        return g.urls.get("photo", {photo: this})
      }
    },
    date_posted: {broadcast: 1, getter: a.integer},
    is_public: {broadcast: 1, getter: a.bool},
    is_friend: {broadcast: 1, getter: a.bool},
    is_family: {broadcast: 1, getter: a.bool},
    perm_comment: {broadcast: 1, getter: a.integer0123},
    perm_addmeta: {broadcast: 1, getter: a.integer0123},
    perms: {
      getter: function () {
        return {
          is_public: this.get("is_public"),
          is_friend: this.get("is_friend"),
          is_family: this.get("is_family"),
          perm_comment: this.get("perm_comment"),
          perm_addmeta: this.get("perm_addmeta")
        }
      }
    },
    license: {broadcast: 1, getter: a.integer, setter: a.integer},
    safety_level: {broadcast: 1, getter: a.integer, setter: a.integer},
    needs_interstitial: {broadcast: 1, value: false, getter: a.bool, setter: a.bool},
    media: {broadcast: 1, value: "photo"},
    is_video: {
      getter: function () {
        return (this.get("media") === "video")
      }
    },
    secret: {value: ""},
    deleted: {value: false},
    dmca_takedown: {value: false},
    geo: {
      broadcast: 1, getter: function (h) {
        if (!g.Lang.isObject(h)) {
          h = {}
        }
        return h
      }
    },
    has_geo: {
      getter: function () {
        var h = this.get("geo");
        return (h && h.latitude && h.longitude && h.accuracy)
      }
    },
    exif_latlong: {},
    perm_viewgeo: {broadcast: 1, value: false},
    is_bad: {broadcast: 1, getter: a.integer, setter: a.integer},
    content_type: {broadcast: 1, getter: a.integer, setter: a.integer},
    is_fave: {
      broadcast: 1, value: false, setter: function (j, h) {
        j = a.bool(j);
        var i = this.get(h);
        if (j !== i) {
          if (j) {
            this.increment("fave_count")
          } else {
            this.decrement("fave_count")
          }
        }
        if (this.get("fave_changes_pending") === 0) {
          this.set("is_confirmed_fave", j)
        }
        return j
      }, getter: a.bool
    },
    is_confirmed_fave: {value: undefined},
    fave_changes_pending: {value: 0},
    fave_count: {broadcast: 1, value: 0, getter: a.integer, setter: a.integer},
    comment_count: {broadcast: 1, value: 0, getter: a.integer, setter: a.integer},
    can_addmeta: {value: false, getter: a.bool},
    can_comment: {value: false, getter: a.bool},
    can_fave: {
      value: false, getter: function () {
        if (this.get("is_ignored")) {
          return false
        }
        if (this.get("dmca_takedown")) {
          return false
        }
        if (this.get("is_owner")) {
          return false
        }
        if (!g.config.flickr.user.nsid && !g.config.flickr.flags.enable_grease) {
          return false
        }
        return true
      }
    },
    group_count: {broadcast: 1, getter: a.integer, setter: a.integer},
    people_count: {broadcast: 1, getter: a.integer, setter: a.integer},
    guestpass_count: {broadcast: 1, getter: a.integer, setter: a.integer},
    is_owner: {
      value: false, getter: function () {
        return g.config.flickr.user.nsid && g.config.flickr.user.nsid === this.get("owner")
      }
    },
    is_ignored: {value: false},
    tags: {broadcast: 1, getter: a.arr},
    sizes: {
      value: {}, getter: function (m, i) {
        var j, l, h, k;
        m = a.obj(m);
        if (g.config.flickr.flags.enable_2048_images) {
          j = m.o || m.l || m.z;
          if (j && (j.width >= 2048 || j.height >= 2048)) {
            l = j.width / j.height;
            if (l > 1) {
              k = 2048;
              h = Math.round(2048 / l)
            } else {
              h = 2048;
              k = Math.round(2048 * l)
            }
            m["2048"] = {url: m.t.url.replace("_t", "_2048"), height: h + "", width: k + "", label: "2048"}
          }
        }
        return m
      }
    }
  };
  g.extend(d, g.Base, {
    initializer: function (h) {
      this.merge_data(h)
    }, merge_data: function (i) {
      var j, h;
      if (typeof i.id !== "undefined" && i.id !== this.get("id")) {
        this.set("id", i.id)
      }
      if (typeof i.title !== "undefined" && i.title !== this.get("title")) {
        this.set("title", i.title)
      }
      if (typeof i.description !== "undefined" && i.description !== this.get("description")) {
        this.set("description", i.description)
      }
      if (typeof i.owner !== "undefined" && i.owner !== this.get("owner")) {
        this.set("owner", i.owner)
      }
      if (typeof i.ownername !== "undefined" && i.ownername !== this.get("ownername")) {
        this.set("ownername", i.ownername)
      }
      if (typeof i.pathalias !== "undefined" && i.pathalias !== this.get("pathalias")) {
        this.set("pathalias", i.pathalias)
      }
      if (typeof i.iconserver !== "undefined" && i.iconserver !== this.get("iconserver")) {
        this.set("iconserver", i.iconserver)
      }
      if (typeof i.iconfarm !== "undefined" && i.iconfarm !== this.get("iconfarm")) {
        this.set("iconfarm", i.iconfarm)
      }
      if (typeof i.url !== "undefined" && i.url !== this.get("url")) {
        this.set("url", i.url)
      }
      if (typeof i.date_posted !== "undefined" && i.date_posted !== this.get("date_posted")) {
        this.set("date_posted", i.date_posted)
      }
      if (typeof i.date_taken !== "undefined" && i.date_taken !== this.get("date_taken")) {
        this.set("date_taken", i.date_taken)
      }
      if (typeof i.is_public !== "undefined" && i.is_public !== this.get("is_public")) {
        this.set("is_public", i.is_public)
      }
      if (typeof i.is_friend !== "undefined" && i.is_friend !== this.get("is_friend")) {
        this.set("is_friend", i.is_friend)
      }
      if (typeof i.is_family !== "undefined" && i.is_family !== this.get("is_family")) {
        this.set("is_family", i.is_family)
      }
      if (typeof i.can_comment !== "undefined" && i.can_comment !== this.get("can_comment")) {
        this.set("can_comment", i.can_comment)
      }
      if (typeof i.can_addmeta !== "undefined" && i.can_addmeta !== this.get("can_addmeta")) {
        this.set("can_addmeta", i.can_addmeta)
      }
      if (typeof i.perm_comment !== "undefined" && i.perm_comment !== this.get("perm_comment")) {
        this.set("perm_comment", i.perm_comment)
      }
      if (typeof i.perm_addmeta !== "undefined" && i.perm_addmeta !== this.get("perm_addmeta")) {
        this.set("perm_addmeta", i.perm_addmeta)
      }
      if (typeof i.license !== "undefined" && i.license !== this.get("license")) {
        this.set("license", i.license)
      }
      if (typeof i.needs_interstitial !== "undefined" && i.needs_interstitial !== this.get("needs_interstitial")) {
        this.set("needs_interstitial", i.needs_interstitial)
      }
      if (typeof i.safety_level !== "undefined" && i.safety_level !== this.get("safety_level")) {
        this.set("safety_level", i.safety_level)
      }
      if (typeof i.media !== "undefined" && i.media !== this.get("media")) {
        this.set("media", i.media)
      }
      if (typeof i.secret !== "undefined" && i.secret !== this.get("secret")) {
        this.set("secret", i.secret)
      }
      if (typeof i.is_bad !== "undefined" && i.is_bad !== this.get("is_bad")) {
        this.set("is_bad", i.is_bad)
      }
      if (typeof i.content_type !== "undefined" && i.content_type !== this.get("content_type")) {
        this.set("content_type", i.content_type)
      }
      if (typeof i.is_faved !== "undefined" && i.is_faved !== this.get("is_fave")) {
        this.set("is_fave", i.is_faved)
      }
      if (typeof i.is_fave !== "undefined" && i.is_fave !== this.get("is_fave")) {
        this.set("is_fave", i.is_fave)
      }
      if (typeof i.fave_count !== "undefined" && i.fave_count !== this.get("fave_count")) {
        this.set("fave_count", i.fave_count)
      }
      if (typeof i.count_faves !== "undefined" && i.count_faves !== this.get("fave_count")) {
        this.set("fave_count", i.count_faves)
      }
      if (typeof i.comment_count !== "undefined" && i.comment_count !== this.get("comment_count")) {
        this.set("comment_count", i.comment_count)
      }
      if (typeof i.count_comments !== "undefined" && i.count_comments !== this.get("comment_count")) {
        this.set("comment_count", i.count_comments)
      }
      if (typeof i.geo !== "undefined" && i.geo !== this.get("geo")) {
        this.set("geo", i.geo)
      }
      if (typeof i.exif_latlong !== "undefined" && i.exif_latlong !== this.get("exif_latlong")) {
        this.set("exif_latlong", i.exif_latlong)
      }
      if (typeof i.perm_viewgeo !== "undefined" && i.perm_viewgeo !== this.get("perm_viewgeo")) {
        this.set("perm_viewgeo", i.perm_viewgeo)
      }
      if (typeof i.woe !== "undefined" && i.woe !== this.get("woe")) {
        this.set("woe", i.woe)
      }
      if (typeof i.tags !== "undefined" && i.tags !== this.get("tags")) {
        this.set("tags", i.tags)
      }
      if (typeof i.group_count !== "undefined" && i.group_count !== this.get("group_count")) {
        this.set("group_count", i.group_count)
      }
      if (typeof i.people_count !== "undefined" && i.people_count !== this.get("people_count")) {
        this.set("people_count", i.people_count)
      }
      if (typeof i.guestpass_count !== "undefined" && i.guestpass_count !== this.get("guestpass_count")) {
        this.set("guestpass_count", i.guestpass_count)
      }
      if (i.sizes && g.Lang.isObject(i.sizes)) {
        j = i.sizes
      } else {
        j = {};
        if (i.url_sq) {
          j.sq = {url: i.url_sq, width: parseInt(i.width_sq, 10), height: parseInt(i.height_sq, 10)}
        }
        if (i.url_t) {
          j.t = {url: i.url_t, width: parseInt(i.width_t, 10), height: parseInt(i.height_t, 10)}
        }
        if (i.url_s) {
          j.s = {url: i.url_s, width: parseInt(i.width_s, 10), height: parseInt(i.height_s, 10)}
        }
        if (i.url_m) {
          j.m = {url: i.url_m, width: parseInt(i.width_m, 10), height: parseInt(i.height_m, 10)}
        }
        if (i.url_z) {
          j.z = {url: i.url_z, width: parseInt(i.width_z, 10), height: parseInt(i.height_z, 10)}
        }
        if (i.url_l) {
          j.l = {url: i.url_l, width: parseInt(i.width_l, 10), height: parseInt(i.height_l, 10)}
        }
        if (i.url_h) {
          j.h = {url: i.url_h, width: parseInt(i.width_h, 10), height: parseInt(i.height_h, 10)}
        }
        if (i.url_k) {
          j.k = {url: i.url_k, width: parseInt(i.width_k, 10), height: parseInt(i.height_k, 10)}
        }
        if (i.url_o) {
          j.o = {url: i.url_o, width: parseInt(i.width_o, 10), height: parseInt(i.height_o, 10)}
        }
        if (i.media === "video") {
          if (i.height_v) {
            j.v = {width: parseInt(i.width_v, 10), height: parseInt(i.height_v, 10)}
          }
        }
      }
      if (g.Object.size(j)) {
        h = this.get("sizes") || {};
        g.Object.each(h, function (k, l) {
          if (j[l]) {
            j[l] = g.merge(k, j[l])
          }
        });
        this.set("sizes", g.merge(h, j))
      }
    }, toggle_fave: function (j) {
      var i = this, h, m, k, l;
      if (!this.get("can_fave")) {
        return
      }
      if (g.config.flickr.flags.enable_grease && !g.config.flickr.user.nsid) {
        g.grease.addFave(this.get("id"));
        g.grease.authenticate();
        return
      }
      h = !this.get("is_fave");
      m = "flickr.favorites." + (h ? "add" : "remove");
      k = {photo_id: this.get("id")};
      l = {
        success: function () {
          var n, o, p, q;
          n = i.get("id");
          i.decrement("fave_changes_pending");
          i.set("is_confirmed_fave", h);
          if (i.get("fave_changes_pending") === 0) {
            i.set("is_fave", h)
          }
          o = "faves-" + (g.config.flickr.user.pathalias ? g.config.flickr.user.pathalias : g.config.flickr.user.nsid);
          p = g.ContextData.getContext(o);
          if (p) {
            q = p.getPhotoPosition(n)
          }
          if (h) {
            if (p) {
              if (g.ContextData.getPrevLimit(o) === q) {
                g.ContextData.unremovePhoto(o, q)
              } else {
                g.ContextData.invalidate(o)
              }
            } else {
              if (g.config.flickr.page_type === "photo" && i.get("id") === g.photo.getCurrentPhoto().get("id")) {
                g.ContextData.add({
                  id: o,
                  user_id: g.config.flickr.user.nsid,
                  type: "faves",
                  title: g.transjax.get("photo", "your_favorites"),
                  url: g.config.flickr.user.photos_url + "favorites/",
                  photos: [{position: "0", photo: i}]
                })
              }
            }
          } else {
            if (p && g.Lang.isNumber(q)) {
              g.ContextData.removePhoto(o, q)
            }
          }
        }, failure: function () {
          i.decrement("fave_changes_pending");
          if (i.get("fave_changes_pending") === 0) {
            i.set("is_fave", i.get("is_confirmed_fave"))
          }
        }
      };
      this.set("is_fave", h);
      this.increment("fave_changes_pending");
      g.flickrAPI.callMethod(m, k, l)
    }, record_interstitial_clickthrough: function () {
      var h = this.get("owner");
      g.Object.each(b, function (i, j) {
        if (i.get("owner") === h) {
          i.set("needs_interstitial", false)
        }
      });
      g.flickrAPI.callMethod("flickr.people.recordInterstitialClickthrough", {user_id: h}, function () {
      })
    }, updateWoeAttributeByeId: function (i) {
      var h = this;
      g.use("flickr-geo", function (j) {
        j.flickrGeo.getWoeById(i, function (k) {
          if (k.success && j.Lang.isObject(k.woe)) {
            h.set("woe", k.woe)
          } else {
            j.log("Unable to update WOE. Expected data was not received from the API.", "error", "photo-data")
          }
        }, this)
      })
    }, increment: function (h) {
      if (!e(this.get(h))) {
        return false
      }
      return this.add(h, 1)
    }, decrement: function (h) {
      if (!e(this.get(h))) {
        return false
      }
      return this.add(h, -1)
    }, add: function (i, j) {
      var k = this.get(i), h;
      if (!g.Lang.isNumber(k) || !g.Lang.isNumber(j)) {
        return false
      }
      h = k + j;
      if (this.set(i, h)) {
        return h
      } else {
        return false
      }
    }
  })
}, "0.0.1", {
  requires: F.config.modules["photo-data"].requires || [],
  optional: F.config.modules["photo-data"].optional || []
});
function udm_(J) {
  var I = "comScore=", H = document, G = H.cookie, F = "", E = "indexOf", D = "substring", C = "length", B = 2048, A, z = "&ns_", y = "&", x, w, v, u, t = window, s = t.encodeURIComponent || escape;
  if (G[E](I) + 1) {
    for (v = 0, w = G.split(";"), u = w[C]; v < u; v++) {
      x = w[v][E](I), x + 1 && (F = y + unescape(w[v][D](x + I[C])))
    }
  }
  J += z + "_t=" + +(new Date) + z + "c=" + (H.characterSet || H.defaultCharset || "") + F, J[C] > B && J[E](y) > 0 && (A = J[D](0, B - 8).lastIndexOf(y), J = (J[D](0, A) + z + "cut=" + s(J[D](A + 1)))[D](0, B)), H.images ? (x = new Image, t.ns_p || (ns_p = x), x.src = J) : H.write("<", "p", "><", 'img src="', J, '" height="1" width="1" alt="*"', "><", "/p", ">")
}
typeof _comscore == "undefined" && (_comscore = []), function () {
  var v = "length", u = self, t = u.encodeURIComponent ? encodeURIComponent : escape, s = ".scorecardresearch.com", r = Math, q = "script", p = "width", o = /c2=(\d*)&/, n, m = function (D) {
    if (!!D) {
      var C, B = [], A, z = 0, y, x, w = "";
      for (var d in D) {
        A = typeof D[d];
        if (A == "string" || A == "number") {
          B[B[v]] = d + "=" + t(D[d]), d == "c2" ? w = D[d] : d == "c1" && (z = 1)
        }
      }
      if (B[v] <= 0 || w == "") {
        return
      }
      x = D.options || {}, x.d = x.d || document;
      if (typeof x.url_append == "string") {
        y = x.url_append.replace(/&amp;/, "&").split("&");
        for (var d = 0, c = y[v], a; d < c; d++) {
          a = y[d].split("="), a[v] == 2 && (B[B[v]] = a[0] + "=" + t(a[1]))
        }
      }
      C = ["http", x.d.URL.charAt(4) == "s" ? "s://sb" : "://b", s, "/p?", z ? "" : "c1=2&", B.join("&").replace(/&$/, "")], udm_(C.join(""))
    }
  }, l = function (a) {
    a = a || _comscore;
    for (var f = 0, e = a[v]; f < e; f++) {
      m(a[f])
    }
    a = _comscore = []
  };
  l(), (n = u.COMSCORE) ? (n.purge = l, n.beacon = m) : COMSCORE = {purge: l, beacon: m}
}();