/*!
 * verge 1.9.1+201402130803
 * https://github.com/ryanve/verge
 * MIT License 2013 Ryan Van Etten
 */
! function(a, b, c) {
    "undefined" != typeof module && module.exports ? module.exports = c() : a[b] = c()
}(this, "verge", function() {
    function a() {
        return {
            width: k(),
            height: l()
        }
    }

    function b(a, b) {
        var c = {};
        return b = +b || 0, c.width = (c.right = a.right + b) - (c.left = a.left - b), c.height = (c.bottom = a.bottom + b) - (c.top = a.top - b), c
    }

    function c(a, c) {
        return a = a && !a.nodeType ? a[0] : a, a && 1 === a.nodeType ? b(a.getBoundingClientRect(), c) : !1
    }

    function d(b) {
        b = null == b ? a() : 1 === b.nodeType ? c(b) : b;
        var d = b.height,
            e = b.width;
        return d = "function" == typeof d ? d.call(b) : d, e = "function" == typeof e ? e.call(b) : e, e / d
    }
    var e = {},
        f = "undefined" != typeof window && window,
        g = "undefined" != typeof document && document,
        h = g && g.documentElement,
        i = f.matchMedia || f.msMatchMedia,
        j = i ? function(a) {
            return !!i.call(f, a)
                .matches
        } : function() {
            return !1
        },
        k = e.viewportW = function() {
            var a = h.clientWidth,
                b = f.innerWidth;
            return b > a ? b : a
        },
        l = e.viewportH = function() {
            var a = h.clientHeight,
                b = f.innerHeight;
            return b > a ? b : a
        };
    return e.mq = j, e.matchMedia = i ? function() {
        return i.apply(f, arguments)
    } : function() {
        return {}
    }, e.viewport = a, e.scrollX = function() {
        return f.pageXOffset || h.scrollLeft
    }, e.scrollY = function() {
        return f.pageYOffset || h.scrollTop
    }, e.rectangle = c, e.aspect = d, e.inX = function(a, b) {
        var d = c(a, b);
        return !!d && d.right >= 0 && d.left <= k()
    }, e.inY = function(a, b) {
        var d = c(a, b);
        return !!d && d.bottom >= 0 && d.top <= l()
    }, e.inViewport = function(a, b) {
        var d = c(a, b);
        return !!d && d.bottom >= 0 && d.right >= 0 && d.top <= l() && d.left <= k()
    }, e
});

var ACSUX = window.ACSUX || {};

ACSUX.CSMEmitter = function($, args) {
    var _this = {
        r: args.r,
        m: args.m,
        s: args.s,
        l: args.s,
        c: args.c,
        id: args.id,
        debug: args.debug,
        imageDirs: ['img13', 'img14'],
        timer: false,
        timerStart: null,
        scrolled: false,
        scrollTimer: 500,
        init: function() {
            _this.inViewport();
            _this.checkViewport();
        },
        emitEvent: function(event, debug) {
            if (window.ue && ue.log) {
                ue.log({
                    'r': event,
                    'm': _this.m,
                    's': _this.s,
                    'l': _this.l,
                    'c': _this.c
                }, 'acsux-widgets');
            }
            if (_this.debug) {
                console.log({
                    'r': event,
                    'm': _this.m,
                    's': _this.s,
                    'l': _this.l,
                    'c': _this.c
                }, 'acsux-widgets');
            }
        },
        checkImages: function(imgs) {
            // for checking all images on a page
            // checkImages($('img').get());
            // not used but didn't want to delete
            var len = imgs.length,
                count = 0;
            if (len > 0) {
                while (len--) {
                    if ($(imgs[len])
                        .attr('src')
                        .match(/\/img1[3-4]\//)) {
                        count++;
                    }
                }
                return count;
            }
        },
        checkImage: function(img) {
            if (img.match(/img1[3-4]\//)) {
                return 1
            } else {
                return 0
            }
        },
        inViewport: function() {
            if (verge.inViewport($('#' + _this.id)) === true) {
                _this.startViewTimer("l");
                _this.emitEvent(_this.r + '_i_l');
            } else {
                _this.emitEvent(_this.r + '_p');
            }
        },
        checkViewport: function() {
            setInterval(function() {
                if (_this.scrolled) {
                    if (verge.inViewport($('#' + _this.id)) === true && _this.timer === false) {
                        _this.emitEvent(_this.r + '_i_s', true);
                        _this.startViewTimer("s");
                    }
                    if (verge.inViewport($('#' + _this.id)) === false && _this.timer === true) {
                        _this.endViewTimer();
                    }
                    _this.scrolled = false;
                }
            }, _this.scrollTimer);
        },
        startViewTimer: function(type) {
            _this.timer = true;
            _this.impType = type;
            var time = new Date();
            _this.timerStart = time;
        },
        endViewTimer: function() {
            _this.timer = false;
            var time = new Date(),
                timeInViewport = (time - _this.timerStart) / 1000;
            _this.emitEvent(_this.r + '_i_' + _this.impType + '_' + timeInViewport);

        }
    }

    $(window)
        .scroll(function() {
            _this.scrolled = true;
        });

    window.onbeforeunload = function(Event) {
        if (_this.timer == true) {
            var time = new Date(),
                timeInViewport = (time - _this.timerStart) / 1000;
            _this.emitEvent(_this.r + '_i_' + _this.impType + '_' + timeInViewport);
        }
    }
    return _this;
}