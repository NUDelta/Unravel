/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("io-form", function (e, t) {
  var n = encodeURIComponent;
  e.IO.stringify = function (t, n) {
    n = n || {};
    var r = e.IO.prototype._serialize({
      id: t,
      useDisabled: n.useDisabled
    }, n.extra && typeof n.extra == "object" ? e.QueryString.stringify(n.extra) : n.extra);
    return r
  }, e.mix(e.IO.prototype, {
    _serialize: function (t, r) {
      var i = [], s = t.useDisabled || !1, o = 0, u = typeof t.id == "string" ? t.id : t.id.getAttribute("id"), a, f, l, c, h, p, d, v, m, g;
      u || (u = e.guid("io:"), t.id.setAttribute("id", u)), f = e.config.doc.getElementById(u);
      if (!f || !f.elements)return r || "";
      for (p = 0, d = f.elements.length; p < d; ++p) {
        a = f.elements[p], h = a.disabled, l = a.name;
        if (s ? l : l && !h) {
          l = n(l) + "=", c = n(a.value);
          switch (a.type) {
            case"select-one":
              a.selectedIndex > -1 && (g = a.options[a.selectedIndex], i[o++] = l + n(g.attributes.value && g.attributes.value.specified ? g.value : g.text));
              break;
            case"select-multiple":
              if (a.selectedIndex > -1)for (v = a.selectedIndex, m = a.options.length; v < m; ++v)g = a.options[v], g.selected && (i[o++] = l + n(g.attributes.value && g.attributes.value.specified ? g.value : g.text));
              break;
            case"radio":
            case"checkbox":
              a.checked && (i[o++] = l + c);
              break;
            case"file":
            case undefined:
            case"reset":
            case"button":
              break;
            case"submit":
            default:
              i[o++] = l + c
          }
        }
      }
      return r && (i[o++] = r), i.join("&")
    }
  }, !0)
}, "3.11.0", {requires: ["io-base", "node-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("io-upload-iframe", function (e, t) {
  function u(t, n, r) {
    var i = e.Node.create('<iframe src="#" id="io_iframe' + t.id + '" name="io_iframe' + t.id + '" />');
    i._node.style.position = "absolute", i._node.style.top = "-1000px", i._node.style.left = "-1000px", e.one("body").appendChild(i), e.on("load", function () {
      r._uploadComplete(t, n)
    }, "#io_iframe" + t.id)
  }

  function a(t) {
    e.Event.purgeElement("#io_iframe" + t, !1), e.one("body").removeChild(e.one("#io_iframe" + t))
  }

  var n = e.config.win, r = e.config.doc, i = r.documentMode && r.documentMode >= 8, s = decodeURIComponent, o = e.IO.prototype.end;
  e.mix(e.IO.prototype, {
    _addData: function (t, n) {
      e.Lang.isObject(n) && (n = e.QueryString.stringify(n));
      var i = [], o = n.split("="), u, a;
      for (u = 0, a = o.length - 1; u < a; u++)i[u] = r.createElement("input"), i[u].type = "hidden", i[u].name = s(o[u].substring(o[u].lastIndexOf("&") + 1)), i[u].value = u + 1 === a ? s(o[u + 1]) : s(o[u + 1].substring(0, o[u + 1].lastIndexOf("&"))), t.appendChild(i[u]);
      return i
    }, _removeData: function (e, t) {
      var n, r;
      for (n = 0, r = t.length; n < r; n++)e.removeChild(t[n])
    }, _setAttrs: function (t, n, r) {
      this._originalFormAttrs = {
        action: t.getAttribute("action"),
        target: t.getAttribute("target")
      }, t.setAttribute("action", r), t.setAttribute("method", "POST"), t.setAttribute("target", "io_iframe" + n), t.setAttribute(e.UA.ie && !i ? "encoding" : "enctype", "multipart/form-data")
    }, _resetAttrs: function (t, n) {
      e.Object.each(n, function (e, n) {
        e ? t.setAttribute(n, e) : t.removeAttribute(n)
      })
    }, _startUploadTimeout: function (e, t) {
      var r = this;
      r._timeout[e.id] = n.setTimeout(function () {
        e.status = 0, e.statusText = "timeout", r.complete(e, t), r.end(e, t)
      }, t.timeout)
    }, _clearUploadTimeout: function (e) {
      var t = this;
      n.clearTimeout(t._timeout[e]), delete t._timeout[e]
    }, _uploadComplete: function (t, r) {
      var i = this, s = e.one("#io_iframe" + t.id).get("contentWindow.document"), o = s.one("body"), u;
      r.timeout && i._clearUploadTimeout(t.id);
      try {
        o ? (u = o.one("pre:first-child"), t.c.responseText = u ? u.get("text") : o.get("text")) : t.c.responseXML = s._node
      } catch (f) {
        t.e = "upload failure"
      }
      i.complete(t, r), i.end(t, r), n.setTimeout(function () {
        a(t.id)
      }, 0)
    }, _upload: function (t, n, i) {
      var s = this, o = typeof i.form.id == "string" ? r.getElementById(i.form.id) : i.form.id, u;
      return s._setAttrs(o, t.id, n), i.data && (u = s._addData(o, i.data)), i.timeout && s._startUploadTimeout(t, i), o.submit(), s.start(t, i), i.data && s._removeData(o, u), {
        id: t.id,
        abort: function () {
          t.status = 0, t.statusText = "abort";
          if (!e.one("#io_iframe" + t.id))return !1;
          a(t.id), s.complete(t, i), s.end(t, i)
        },
        isInProgress: function () {
          return e.one("#io_iframe" + t.id) ? !0 : !1
        },
        io: s
      }
    }, upload: function (e, t, n) {
      return u(e, n, this), this._upload(e, t, n)
    }, end: function (e, t) {
      var n, i;
      return t && (n = t.form, n && n.upload && (i = this, n = typeof n.id == "string" ? r.getElementById(n.id) : n.id, i._resetAttrs(n, this._originalFormAttrs))), o.call(this, e, t)
    }
  }, !0)
}, "3.11.0", {requires: ["io-base", "node-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("queue-promote", function (e, t) {
  e.mix(e.Queue.prototype, {
    indexOf: function (t) {
      return e.Array.indexOf(this._q, t)
    }, promote: function (e) {
      var t = this.indexOf(e);
      t > -1 && this._q.unshift(this._q.splice(t, 1)[0])
    }, remove: function (e) {
      var t = this.indexOf(e);
      t > -1 && this._q.splice(t, 1)
    }
  })
}, "3.11.0", {requires: ["yui-base"]});
/*
 YUI 3.11.0 (build d549e5c)
 Copyright 2013 Yahoo! Inc. All rights reserved.
 Licensed under the BSD License.
 http://yuilibrary.com/license/
 */

YUI.add("io-queue", function (e, t) {
  function r(e, t) {
    return n.queue.apply(n, [e, t])
  }

  var n = e.io._map["io:0"] || new e.IO;
  e.mix(e.IO.prototype, {
    _q: new e.Queue, _qActiveId: null, _qInit: !1, _qState: 1, _qShift: function () {
      var e = this, t = e._q.next();
      e._qActiveId = t.id, e._qState = 0, e.send(t.uri, t.cfg, t.id)
    }, queue: function (t, n) {
      var r = this, i = {uri: t, cfg: n, id: this._id++};
      return r._qInit || (e.on("io:complete", function (e, t) {
        r._qNext(e)
      }, r), r._qInit = !0), r._q.add(i), r._qState === 1 && r._qShift(), i
    }, _qNext: function (e) {
      var t = this;
      t._qState = 1, t._qActiveId === e && t._q.size() > 0 && t._qShift()
    }, qPromote: function (e) {
      this._q.promote(e)
    }, qRemove: function (e) {
      this._q.remove(e)
    }, qEmpty: function () {
      this._q = new e.Queue
    }, qStart: function () {
      var e = this;
      e._qState = 1, e._q.size() > 0 && e._qShift()
    }, qStop: function () {
      this._qState = 0
    }, qSize: function () {
      return this._q.size()
    }
  }, !0), r.start = function () {
    n.qStart()
  }, r.stop = function () {
    n.qStop()
  }, r.promote = function (e) {
    n.qPromote(e)
  }, r.remove = function (e) {
    n.qRemove(e)
  }, r.size = function () {
    n.qSize()
  }, r.empty = function () {
    n.qEmpty()
  }, e.io.queue = r
}, "3.11.0", {requires: ["io-base", "queue-promote"]});
