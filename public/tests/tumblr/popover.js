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