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