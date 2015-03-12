/*! scripts/antispam/threatmetrix.js */
(function(c, d, b, a) {
    a.TMX = d.View.extend({
        el: "body",
        initialize: function(e) {
            this.options = e || {};
            this.url = e.url || false;
            this.form_key = c("#tumblr_form_key")
                .attr("content");
            if (!this.url) {
                return
            }
        },
        template: b.template('<iframe id="tmx_safe" class="tmx_safe" height="0" width="0" src="<%- this.url %>?f=<%- this.form_key %>" style="border: 0; visibility: hidden; height: 0; width: 0; position: absolute; left: -10000px;"></iframe>'),
        render: function() {
            if (!this.rendered) {
                this.rendered = true;
                this.$el.append(this.template())
            }
            return this
        },
        rendered: false
    })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/email_checker.js */
(function(c, b) {
    var a = {
        dictionary: [],
        maxTransforms: 1,
        costMultiplier: 1,
        damerauLevenshteinDist: function(m, l, h) {
            if (typeof(m) !== "string" || typeof(l) !== "string") {
                return false
            }
            if (typeof(h) != "number") {
                h = 99
            }
            var g = 0,
                e = 0,
                d = 0,
                o = m.length,
                n = l.length;
            if (o === 0 || n === 0) {
                return (Math.abs(o - n) <= h) ? Math.max(o, n) : false
            }
            if (o < n) {
                var f;
                f = o;
                o = n;
                n = f;
                f = m;
                m = l;
                l = f
            }
            var k = [];
            for (g = 0; g <= o; g++) {
                k[g] = [];
                k[g][0] = g
            }
            for (e = 0; e <= n; e++) {
                k[0][e] = e
            }
            for (g = 1; g <= o; g++) {
                for (e = 1; e <= n; e++) {
                    if (m[g - 1] == l[e - 1]) {
                        d = 0
                    } else {
                        d = 1
                    }
                    k[g][e] = Math.min(k[g - 1][e] + 1, k[g][e - 1] + 1, k[g - 1][e - 1] + d);
                    if (g == 1 || e == 1) {
                        continue
                    }
                    if (m[g - 1] == l[e - 2] && m[g - 2] == l[e - 1]) {
                        k[g][e] = Math.min(k[g][e], k[g - 2][e - 2] + d)
                    }
                }
            }
            return (k[o][n] <= h) ? k[o][n] : false
        },
        returnFunc: function(d, e) {
            return d.name
        },
        suggest: function(e) {
            var d = [],
                i = 0,
                h = this.damerauLevenshteinDist,
                g = this.maxTransforms,
                f = this.returnFunc;
            c.each(this.dictionary, function(j, k) {
                if ((i = h(e, k.name, g)) !== false) {
                    d.push({
                        name: k.name,
                        dist: i,
                        cost: k.cost
                    })
                }
            });
            if (d.length) {
                return c.map(d.sort(this.sortByFunc), this.returnFunc)
            } else {
                return []
            }
        },
        sortByFunc: function(e, d) {
            var g = e.dist + e.cost * this.costMultiplier;
            var f = d.dist + d.cost * this.costMultiplier;
            return g - f
        },
        initialized: false,
        init: function(g, d) {
            if (!(g instanceof Array)) {
                return false
            }
            var f = [];
            var e;
            c.each(g, function(h, j) {
                var i = typeof(j);
                if (i === "object") {
                    f.push(j)
                } else {
                    if (i === "string") {
                        f.push({
                            name: j,
                            cost: 0
                        })
                    }
                }
            });
            this.dictionary = f;
            if (typeof(d) == "object") {
                for (e in d) {
                    if (d.hasOwnProperty(e) && this.hasOwnProperty(e)) {
                        this[e] = d[e]
                    }
                }
            }
            this.initialized = true;
            return this
        }
    };
    b.SpellChecker = a
})(jQuery, Tumblr);
/*! scripts/spin.js */
(function(i, k, a) {
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

    var j = function() {
        var q = g("style");
        h(k.getElementsByTagName("head")[0], q);
        return q.sheet || q.styleSheet
    }();

    function c(u, q, v, y) {
        var r = ["opacity", q, ~~(u * 100), v, y].join("-");
        var s = 0.01 + v / y * 100;
        var x = Math.max(1 - (1 - u) / q * (100 - s), u);
        var w = o.substring(0, o.indexOf("Animation"))
            .toLowerCase();
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
        v = v.charAt(0)
            .toUpperCase() + v.slice(1);
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
        var r = {
            x: q.offsetLeft,
            y: q.offsetTop
        };
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
        spin: function(x) {
            this.stop();
            var B = this;
            var q = B.opts;
            var r = B.el = f(g(0, {
                className: q.className
            }), {
                position: "relative",
                zIndex: q.zIndex
            });
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
                ! function t() {
                    u++;
                    for (var D = q.lines; D; D--) {
                        var E = Math.max(1 - (u + D * y) % w * v, q.opacity);
                        B.opacity(r, q.lines - D, E, q)
                    }
                    B.timeout = B.el && setTimeout(t, ~~(1000 / s))
                }()
            }
            return B
        },
        stop: function() {
            var q = this.el;
            if (q) {
                clearTimeout(this.timeout);
                if (q.parentNode) {
                    q.parentNode.removeChild(q)
                }
                this.el = a
            }
            return this
        },
        lines: function(s, u) {
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
                    h(q, f(t("#000", "0 0 4px #000"), {
                        top: 2 + "px"
                    }))
                }
                h(s, h(q, t(u.color, "0 0 1px rgba(0,0,0,.1)")))
            }
            return s
        },
        opacity: function(r, q, s) {
            if (q < r.childNodes.length) {
                r.childNodes[q].style.opacity = s
            }
        }
    };
    ! function() {
        var r = f(g("group"), {
            behavior: "url(#default#VML)"
        });
        var q;
        if (!n(r, "transform") && r.adj) {
            for (q = 4; q--;) {
                j.addRule(["group", "roundrect", "fill", "stroke"][q], "behavior:url(#default#VML)")
            }
            b.prototype.lines = function(v, u) {
                var t = u.length + u.width;
                var B = 2 * t;

                function A() {
                    return f(g("group", {
                        coordsize: B + " " + B,
                        coordorigin: -t + " " + -t
                    }), {
                        width: B,
                        height: B
                    })
                }

                var w = -(u.width + u.length) * 2 + "px";
                var z = f(A(), {
                    position: "absolute",
                    top: w,
                    left: w
                });
                var y;

                function x(C, s, D) {
                    h(z, h(f(A(), {
                        rotation: 360 / u.lines * C + "deg",
                        left: ~~s
                    }), h(f(g("roundrect", {
                        arcsize: 1
                    }), {
                        width: t,
                        height: u.width,
                        left: u.radius,
                        top: -u.width >> 1,
                        filter: D
                    }), g("fill", {
                        color: u.color,
                        opacity: u.opacity
                    }), g("stroke", {
                        opacity: 0
                    }))))
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
            b.prototype.opacity = function(t, s, v, u) {
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
/*! scripts/illustrated_loader.js */
(function(c, b) {
    var a = Backbone.View.extend({
        el: "body",
        initialize: function() {
            this.frame_width = 100;
            this.frame_count = 98;
            this.frame_rate = 12;
            this.freeze_frames = [1, 7, 20, 29, 38, 47, 70, 88];
            this.current_frame = this.freeze_frames[Math.floor(Math.random() * this.freeze_frames.length)] - 1;
            this.is_animating = false;
            this.animation = false;
            this.animation_time = false;
            this.determine_animation_method();
            this.$loader = this.create_loader()
        },
        create_loader: function() {
            return c('<div id="illustrated_loader" class="illustrated_loader over_glass" />')
        },
        attach_loader: function() {
            if (!c("#illustrated_loader")
                .length) {
                this.$el.append(this.$loader)
            }
        },
        determine_animation_method: function() {
            (function() {
                var e = 0;
                var f = ["ms", "moz", "webkit", "o"];
                for (var d = 0; d < f.length && !window.requestAnimationFrame; ++d) {
                    window.requestAnimationFrame = window[f[d] + "RequestAnimationFrame"];
                    window.cancelAnimationFrame = window[f[d] + "CancelAnimationFrame"] || window[f[d] + "CancelRequestAnimationFrame"]
                }
                if (!window.requestAnimationFrame) {
                    window.requestAnimationFrame = function(k, h) {
                        var g = new Date()
                            .getTime();
                        var i = Math.max(0, 16 - (g - e));
                        var j = window.setTimeout(function() {
                            k(g + i)
                        }, i);
                        e = g + i;
                        return j
                    }
                }
                if (!window.cancelAnimationFrame) {
                    window.cancelAnimationFrame = function(g) {
                        clearTimeout(g)
                    }
                }
            }());
            this.animation_method = (requestAnimationFrame) ? "requestAnimationFrame" : "interval"
        },
        start_animation: function() {
            this.attach_loader();
            this.current_frame = (this.current_frame) ? this.current_frame : 0;
            this.set_frame();
            if (this.animation_method == "interval") {
                if (this.is_animating) {
                    return
                }
                this.animation = setInterval(_.bind(function() {
                    this.next_frame()
                }, this), 1000 / this.frame_rate)
            } else {
                var d = new Date()
                    .getTime(),
                    e = d - (this.animation_time || d);
                this.animation_time = d;
                setTimeout(_.bind(function() {
                    this.animation = requestAnimationFrame(_.bind(this.start_animation, this));
                    this.next_frame()
                }, this), 1000 / this.frame_rate)
            }
            this.is_animating = true
        },
        stop_animation: function() {
            if (this.animation_method == "interval") {
                clearInterval(this.animation)
            } else {
                cancelAnimationFrame(this.animation)
            }
            this.is_animating = false
        },
        next_frame: function() {
            this.current_frame++;
            if (_.contains(this.freeze_frames, this.current_frame)) {
                this.stop_animation();
                setTimeout(_.bind(this.start_animation, this), 500);
                return
            }
            if (this.frame_wait >= this.frame_rate) {
                this.frame_wait = 0
            }
            if (this.current_frame >= this.frame_count) {
                this.current_frame = 0
            }
            this.set_frame()
        },
        set_frame: function() {
            this.$loader.css({
                "background-position": "-" + (this.current_frame * this.frame_width) + "px 0px"
            })
        }
    });
    b.IllustratedLoader = a
})(jQuery, Tumblr);
/*! scripts/recaptcha.js */
(typeof Tumblr !== "undefined") || (Tumblr = {});
(function(b, a) {
    var c = Backbone.View.extend({
        initialize: function(f) {
            this.options = f || {};
            if (window.Recaptcha) {
                return
            }
            var e = document.createElement("script");
            e.src = "//www.google.com/recaptcha/api/js/recaptcha_ajax.js";
            e.onload = _.bind(this.setup_captcha, this);
            var d = document.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(e, d)
        },
        setup_captcha: function() {
            this.$captcha_input = b("#recaptcha_response_field");
            this.$captcha_controls = b(".captcha_control");
            this.$captcha_controls.on("click.recaptcha", _.bind(_.throttle(function(e) {
                var d = b(e.target);
                if (d.hasClass("audio")) {
                    this.audio()
                }
                if (d.hasClass("visual")) {
                    this.visual()
                }
                if (d.hasClass("refresh")) {
                    this.refresh()
                }
            }, 1000), this));
            this.captcha_callback = this.options.callback || function() {};
            this.captcha_callback()
        },
        audio: function() {
            window.Recaptcha.switch_type("audio");
            this.update_placeholder()
        },
        visual: function() {
            window.Recaptcha.switch_type("image");
            this.update_placeholder()
        },
        refresh: function() {
            window.Recaptcha.reload()
        },
        update_placeholder: function() {
            var d = (window.Recaptcha.type === "image") ? this.$captcha_input.data("placeholder-visual") : this.$captcha_input.data("placeholder-audio");
            this.$captcha_input.attr({
                placeholder: d
            })
        }
    });
    Tumblr.Recaptcha = c
})(jQuery, Tumblr);
/*! scripts/nocaptcha.js */
(typeof Tumblr !== "undefined") || (Tumblr = {});
(function(d, b) {
    var c = Backbone.View.extend({
        initialize: function(g) {
            this.options = g || {};
            var f = document.createElement("script");
            f.src = "//www.google.com/recaptcha/api.js?render=explicit&onload=onNocaptchaCallback";
            window.onNocaptchaCallback = _.bind(this.setup_captcha, this);
            var e = document.getElementsByTagName("script")[0];
            e.parentNode.insertBefore(f, e)
        },
        setup_captcha: function() {
            window.grecaptcha.render(this.options.target || "g-recaptcha", {
                callback: this.options.callback || function() {},
                theme: this.options.theme || "light",
                type: this.options.type || "image",
                sitekey: this.options.sitekey || d(".g-recaptcha")
                    .data("sitekey")
            });
            Tumblr.Events.on("abouttumblr:change", function(e) {
                if (e === 0 || e === 5) {
                    window.grecaptcha.reset()
                }
            })
        },
        refresh: function() {
            window.grecaptcha.reload()
        },
    });
    var a;
    Tumblr.NoCaptcha = function(e) {
        if (!a) {
            a = new c(e)
        }
        return a
    }
})(jQuery, Tumblr);
/*! scripts/tfa_code.js */
(function(d, c, e, b) {
    var a = e.View.extend({
        initialize: function(f) {
            this.options = f || {}
        },
        resend_token_sms: function(f, g) {
            var h = d("#tfa_sms_resend");
            h.addClass("animate");
            d.ajax({
                    url: "/svc/tfa/resend_token_sms",
                    data: {
                        email: f,
                        tfa_form_key: g.val()
                    },
                    with_form_key: true,
                    dataType: "json",
                    type: "POST"
                })
                .done(function(i) {
                    g.val(i.tfa_form_key)
                })
                .fail(function() {})
                .always(function() {
                    h.removeClass("animate")
                })
        }
    });
    Tumblr.TFACode = a
})(jQuery, _, Backbone, Tumblr);
/*! scripts/registration/username_suggester.js */
(function(c, d, b, a) {
    a.UsernameSuggester = d.View.extend({
        el: "body",
        defaults: {
            username_input: "#signup_username"
        },
        events: {
            "click #suggested_usernames .popover_menu_item": "handle_click"
        },
        initialize: function(e) {
            this.options = e || {};
            this.options = b.extend(this.defaults, this.options)
        },
        handle_click: function(f) {
            c(this.options.username_input)
                .val(f.target.innerHTML)
                .focus();
            c("#used_suggestion")
                .val(1);
            c("#used_auto_suggestion")
                .val(0);
            c("#suggested_usernames_container")
                .addClass("hidden")
        }
    })
})(jQuery, Backbone, _, Tumblr);
/*! scripts/tumblr.js */
(typeof Tumblr !== "undefined") || (Tumblr = {});
/*! scripts/registration/registration_form.js */
Tumblr.RegistrationForm = (function(F) {
    var I, ad, B, u, q, p, l, c, v, W, Z, j, t = false,
        g = [],
        S, D, R, b, U, s, z, A, J, o, aa;
    var y = (document.location.protocol === "https:"),
        H = "";
    c = [{
        name: "gmail.com",
        cost: 0,
        share: 30.2102985741
    }, {
        name: "yahoo.com",
        cost: 0,
        share: 26.013029172
    }, {
        name: "hotmail.com",
        cost: 1,
        share: 18.1002246857
    }, {
        name: "aol.com",
        cost: 6,
        share: 3.03687405106
    }, {
        name: "live.com",
        cost: 9,
        share: 2.06294942827
    }, {
        name: "hotmail.co.uk",
        cost: 10,
        share: 1.95604539045
    }, {
        name: "aim.com",
        cost: 10,
        share: 1.89339378918
    }, {
        name: "mail.com",
        cost: 17,
        share: 1.2102985741
    }, {
        name: "ymail.com",
        cost: 18,
        share: 1.0549753888
    }, {
        name: "msn.com",
        cost: 32,
        share: 0.609550330148
    }];

    function d(ae) {
        l.current_view = ae;
        F("body")
            .addClass("show_form")
            .addClass(ae);
        loading_next_page = true;
        i(ae);
        if (Tumblr.PlaceHolders) {
            Tumblr.PlaceHolders.init()
        }
        z.track_event("update_view", ae)
    }

    function V(ae) {
        reset_form = (ae === undefined) ? true : false;
        ae = ae || "show_form signup_account signup_birthday signup_register signup_login signup_waiting slow_motion now";
        F.each(ae.split(/\s+/), function(af, ag) {
            F("body")
                .removeClass(ag)
        });
        if (F("#signup_button_signup")
            .length) {
            F("#signup_button_signup")
                .removeClass("shallow")
                .addClass("other_blue")
        }
        loading_next_page = false;
        l.current_view = null;
        u = null;
        if (reset_form) {
            m()
        }
        if (reset_form) {
            z.track_event("reset_view")
        }
    }

    function i(af) {
        var ag = F("#" + af),
            ak, ai, ah;
        F("#signup_forms_submit")
            .removeClass("changed");
        u = F("#" + af + " input");
        p.attr("action", p.attr("data-secure-ajax-action"));
        k();
        ab();
        if (X(af)) {
            N();
            p.attr("action", p.attr("data-secure-action"));
            u = F('#signup_account input:not("#signup_username")');
            if (F("#signup_button_signup")
                .length) {
                F("#signup_button_signup")
                    .addClass("shallow")
                    .removeClass("other_blue")
            }
            if (l.errors) {
                f(l.errors);
                l.errors = null
            }
            if (F("body")
                .hasClass("has_login_captcha")) {
                aa(function() {
                    Tumblr.NoCaptcha({
                        target: "g-recaptcha",
                        sitekey: F(".g-recaptcha")
                            .data("sitekey")
                    })
                }, function() {
                    r(function() {
                        window.Recaptcha.create(F("#recaptcha_public_key")
                            .val(), "recaptcha_widget", {
                                theme: "custom",
                                custom_theme_widget: "recaptcha_widget",
                                callback: function() {
                                    window.Recaptcha.focus_response_field;
                                    F("#signup_forms_panel")
                                        .css("display", "none");
                                    F("#signup_forms_panel")
                                        .css("display", "block")
                                }
                            })
                    })
                });
                Tumblr.Events.trigger("loginregister:captchaShown");
                F("#signup_password")
                    .focus();
                F("#signup_username")
                    .prop("tabindex", "-1")
            } else {
                if (F("body")
                    .hasClass("has_login_tfa")) {
                    F("#tfa_response_field")
                        .focus();
                    F("#tfa_sms_resend")
                        .click(function(am) {
                            am.preventDefault();
                            ac()
                        })
                } else {
                    if (!F("body")
                        .hasClass("mobile_splash_active")) {
                        F("#signup_email")
                            .focus()
                    }
                }
            }
        }
        if (af == "signup_account") {
            if (!F("body")
                .hasClass("mobile_splash_active")) {
                F("#signup_email")
                    .focus()
            }
            if (s) {
                if (!U) {
                    U = new Tumblr.PasswordStrengthMeter()
                } else {
                    U.update()
                }
            }
            ag.keydown(function(am) {
                ak = F(am.target);
                if (ak.hasClass("signup_username")) {
                    F("#used_suggestion")
                        .val(0);
                    F("#used_auto_suggestion")
                        .val(0)
                }
            });
            if (Tumblr.Flags.bool("show_random_username_suggestions")) {
                var aj = JSON.parse(F("#random_username_suggestions")
                    .val());
                if (aj) {
                    F("#signup_username")
                        .one("focus", function() {
                            n(aj, Tumblr.Flags.bool("autopopulate_username_suggestion"))
                        })
                }
            }
        }
        if (af == "signup_birthday") {
            setTimeout(function() {
                F("#signup_age")
                    .focus()
            }, 500);
            T(F("#signup_age"));
            ag.keyup(function(am) {
                ak = F(am.target);
                if (ak.hasClass("signup_age")) {
                    T(ak)
                }
            });
            ag.keydown(function(am) {
                ak = F(am.target);
                if (ak.hasClass("signup_age")) {
                    T(ak)
                }
            });
            ag.keypress(function(am) {
                ak = F(am.target);
                if (ak.hasClass("signup_age")) {
                    T(ak)
                }
            })
        }
        if (af == "signup_register") {
            aa(function() {
                Tumblr.NoCaptcha({
                    target: "g-recaptcha",
                    sitekey: F(".g-recaptcha")
                        .data("sitekey"),
                    callback: E
                })
            }, function() {
                r(function() {
                    window.Recaptcha.create(F("#recaptcha_public_key")
                        .val(), "recaptcha_widget", {
                            theme: "custom",
                            custom_theme_widget: "recaptcha_widget",
                            callback: function() {
                                window.Recaptcha.focus_response_field;
                                F("#signup_forms_panel")
                                    .css("display", "none");
                                F("#signup_forms_panel")
                                    .css("display", "block")
                            }
                        });
                    Tumblr.Events.trigger("loginregister:captchaShown")
                });
                ag.keyup(function() {
                    F("#signup_forms_submit")
                        .addClass("changed")
                })
            })
        }
        if (af == "signup_waiting") {
            if (A) {
                var ae = new Tumblr.IllustratedLoader();
                ae.start_animation()
            } else {
                var al = new Spinner(l.spinner_opts)
                    .spin();
                F("#signup_waiting")
                    .append(F(al.el))
            }
            if (F("#failed_redirect_link")
                .length) {
                F("#failed_redirect_link")
                    .addClass("show")
            }
            F(window)
                .off("keydown keyup keypress")
        }
    }

    function ac() {
        if (!o) {
            o = new Tumblr.TFACode()
        }
        o.resend_token_sms(F("#signup_email")
            .val(), F("#tfa_form_key"))
    }

    function ab() {
        F("#" + l.current_view + " input")
            .each(function(ae) {
                F(this)
                    .removeAttr("disabled")
            })
    }

    function k() {
        F("#signup_form .form_row input")
            .each(function(ae) {
                F(this)
                    .attr("disabled", "disabled")
            })
    }

    function N() {
        F("#signup_form .form_row input")
            .each(function(ae) {
                F(this)
                    .removeAttr("disabled")
            })
    }

    function K() {
        k();
        ab()
    }

    function T(ae) {
        label = F("label[for='" + ae.attr("id") + "']");
        slug = label.children()
            .first();
        slug.text(ae.val());
        if (ae.val() === "") {
            ae.addClass("is_empty");
            label.addClass("is_empty")
        } else {
            ae.removeClass("is_empty");
            label.removeClass("is_empty")
        }
    }

    function n(ai, ae) {
        var aj = F("#suggested_usernames"),
            am = F("#suggested_usernames_container"),
            al = F("#suggested_usernames_container .username_note"),
            af = F("#suggested_usernames_container .popover_inner"),
            ah = ai.length;
        ae = ae || false;
        if (ae === true) {
            F(".signup_username")
                .val(ai[0]);
            F(".signup_username_checkmark")
                .show();
            F("#used_auto_suggestion")
                .val(1);
            F(".signup_username")
                .one("keypress", function() {
                    F(".signup_username_checkmark")
                        .hide()
                })
        }
        aj.html("");
        for (var ag = 0; ag < ah; ag++) {
            var ak = F("<li></li>");
            ak.attr("class", "popover_menu_item");
            ak.html(ai[ag]);
            aj.append(ak)
        }
        am.removeClass("hidden");
        I = new Tumblr.Popover({
            el: "#suggested_usernames_container",
            direction: "left",
            skip_glass: true
        });
        I.show();
        new Tumblr.UsernameSuggester();
        F("#seen_suggestion")[0].value++
    }

    function Y(aj) {
        var af = F("#signup_form_errors"),
            ai = aj.length,
            ae, ag;
        af.html("");
        for (ag = ai - 1; ag >= 0; ag--) {
            ae = F("<li></li>");
            ae.attr("class", "error");
            ae.html(aj[ag]);
            af.append(ae);
            var ah = aj[ag].replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "");
            z.track_event("error", ah)
        }
    }

    function f(af) {
        if (af && af.length) {
            Y(af);
            F("#signup_forms")
                .addClass("has_errors")
        }
        aa(function() {
            if (window.grecaptcha) {
                window.grecaptcha.reload();
                Tumblr.Events.trigger("loginregister:captchaShown")
            }
        }, function() {
            if (window.Recaptcha) {
                window.Recaptcha.reload();
                Tumblr.Events.trigger("loginregister:captchaShown")
            }
        });
        if (!D) {
            F("#signup_forms_container")
                .addClass("shake")
                .addClass("animated")
        }
        var ae = setTimeout(function() {
            F("#signup_forms_container")
                .removeClass("shake")
        }, 500)
    }

    function m() {
        F("#signup_form")[0].reset();
        if (Tumblr.Placeholders) {
            Tumblr.PlaceHolders.init()
        }
        Q()
    }

    function Q() {
        F("#signup_forms_container")
            .removeClass("shake");
        F("#signup_forms")
            .removeClass("has_errors")
    }

    function x() {
        var af = u.length,
            ai = [],
            ah, ag, ae;
        for (ae = af - 1; ae >= 0; ae--) {
            ah = u[ae];
            if ((ah.value === "" || (ah.type == "checkbox" && ah.checked === false)) && F(ah)
                .attr("data-required")) {
                switch (ah.id) {
                    case "signup_email":
                        ag = O(["Don't forget your email address!", "You forgot to enter your email address!"]);
                        break;
                    case "signup_password":
                        ag = O(["Don't forget your password!", "You forgot to enter your password!"]);
                        break;
                    case "signup_username":
                        ag = O(["Don't forget your username!", "You forgot to enter your username!"]);
                        break;
                    case "signup_age":
                        ag = O(["Don't forget to tell us your age!", "You forgot to tell us your age."]);
                        break;
                    case "signup_tos":
                        ag = O(["One more thing &ndash; please accept our Terms!", "You must accept Tumblr's terms before proceeding."]);
                        break;
                    case "recaptcha_response_field":
                        ag = O(["Don't forget to fill out the Captcha!", "Please fill out the Captcha."]);
                        break;
                    default:
                        ag = O(["There was an error. Please try again.", "Oops. There was an error. Try again."])
                }
                ai.push(__(ag))
            }
        }
        if (ai.length) {
            f(ai);
            return false
        }
        return true
    }

    function M(an) {
        if (X(l.current_view)) {
            return true
        }
        an = F(an);
        var ap = [],
            ag = an.val(),
            ae;
        if (ag !== "") {
            if (an.attr("id") == "signup_email" && !ag.match(/\@ymail.com$/i)) {
                var ai, am, ak, ao, aq, af;
                Tumblr.SpellChecker.init(c, {
                    costMultiplier: 0.05
                });
                ak = (am = ag.match(/[^@]+$/)) ? am[0] : "";
                if (!/\@/.test(ag)) {
                    ae = "That's not a valid email address. Please try again."
                } else {
                    if (ag.toLowerCase()
                        .indexOf("@tumblr.com") != -1) {
                        ae = O(["That email address is already in use. Please try again.", "That email address is already associated with another account."])
                    } else {
                        if (!t && (ai = Tumblr.SpellChecker.suggest(ak))
                            .length) {
                            aq = ag.split("@")[0] + "@" + ai[0];
                            if (aq != ag) {
                                af = __("Oops. Did you mean %1$s ?");
                                email_placeholder = "%1$s";
                                ao = '<a href="#" id="signup_email_suggestion">' + aq + "</a>";
                                ae = af.replace(email_placeholder, ao, "g");
                                t = true
                            }
                        }
                    }
                }
            }
            if (an.attr("id") == "signup_password") {
                if (F.trim(ag) == "") {
                    ae = "Don't forget your password!"
                }
                if (U && U.block_registration_step) {
                    ae = U.block_registration_step
                }
            }
            if (an.attr("id") == "signup_username") {
                if (ag.length > 0 && ag.indexOf("-", ag.length - 1) === ag.length - 1) {
                    ae = "Sorry, your username cannot end with a hyphen. Try again."
                }
                if (ag.lastIndexOf("-", 0) === 0) {
                    ae = "Sorry, your username cannot start with a hyphen. Try again."
                }
                if (ag.toLowerCase()
                    .indexOf("tumblr") != -1) {
                    ae = "Sorry, your username cannot contain Tumblr. Try another one."
                }
            }
            if (an.attr("id") == "signup_age") {
                var aj = parseInt(ag);
                var al = new String(aj);
                var ah = ag.replace(/^\s+|\s+$/g, "");
                if (!(al == ah)) {
                    ae = "Please enter your age as a number only!"
                } else {
                    if (aj < 1) {
                        ae = "Please enter a number!"
                    }
                }
            }
            if (ae) {
                ap.push(__(ae))
            }
        }
        if (ap.length) {
            f(ap);
            return false
        }
        Q();
        return true
    }

    function C() {
        for (var ae = u.length - 1; ae >= 0; ae--) {
            if (!M(u[ae])) {
                return false
            }
        }
        return x()
    }

    function P() {
        if (F(I)
            .length) {
            F("#suggested_usernames_container")
                .addClass("hidden");
            F(I)
                .hide()
        }
    }

    function E() {
        Q();
        if (X(l.current_view)) {
            p.submit();
            return true
        } else {
            if (l.current_view === "signup_account" && !p.find("#signup_username")
                .val()) {
                p.prop("action", p.attr("data-secure-action"));
                p.submit()
            } else {
                if (C()) {
                    P();
                    N();
                    signup_form_data = p.serialize() + "&action=" + encodeURIComponent(l.current_view) + "&tracking_url=" + encodeURIComponent(Z) + "&tracking_version=" + encodeURIComponent(W);
                    F.ajax(p.attr("action"), {
                        type: "POST",
                        data: signup_form_data,
                        error: function(ae, ah, ag) {
                            try {
                                ae = JSON.parse(ae.responseText)
                            } catch (af) {
                                ae = {}
                            }
                            if (ae.redirect) {
                                z.track_event("error", "redirect");
                                window.location.replace(ae.redirect)
                            } else {
                                f(ae.errors);
                                if (ae.usernames) {
                                    setTimeout(function() {
                                        if (!D) {
                                            n(ae.usernames, Tumblr.Flags.bool("autopopulate_username_suggestion"))
                                        }
                                    }, 750)
                                }
                            }
                            if (l.current_view == "signup_register") {
                                z.track_event("fail", j)
                            }
                        },
                        success: function(ae) {
                            if (ae.signup_success) {
                                z.track_event("success", j);
                                Tumblr.Events.trigger("loginregister:flowComplete")
                            }
                            if (ae.redirect) {
                                d("signup_waiting");
                                window.location.replace(ae.redirect)
                            } else {
                                d(F("#" + l.current_view)
                                    .next()
                                    .attr("id"))
                            }
                        }
                    })
                }
            }
        }
    }

    function a(ae) {
        if (ae.length) {
            ae.focus()
        }
    }

    function G(ae) {
        if (F(ae.target)
            .attr("id") == "signup_email_suggestion") {
            F("#signup_email")
                .val(F(ae.target)
                    .html());
            F("#signup_password")
                .focus();
            Q();
            ae.preventDefault();
            ae.stopPropagation()
        }
    }

    function w() {
        var ae = document.activeElement,
            af = (u) ? u.length - 1 : false;
        if (ae && af && u[af]) {
            return (ae.id == u[af].id) ? true : false
        }
        return
    }

    function e() {
        if (F("body")
            .hasClass("signup_login")) {
            Tumblr.RegistrationForm.update_view("signup_login")
        } else {
            if (F("body")
                .hasClass("signup_account")) {
                Tumblr.RegistrationForm.update_view("signup_account")
            } else {
                if (F("body")
                    .hasClass("signup_waiting")) {
                    Tumblr.RegistrationForm.update_view("signup_waiting")
                }
            }
        }
    }

    function L() {
        var ae = F("#signup_subhead"),
            af = F("#signup_subhead_content"),
            ag;
        if (ae.length == 0) {
            return
        }
        ag = ae.width();
        if (af.width() > ag) {
            ae.addClass("medium");
            setTimeout(function() {
                if (af.width() > ag) {
                    ae.addClass("small")
                        .removeClass("medium");
                    setTimeout(function() {
                        if (af.width() > ag) {
                            ae.addClass("infinitesimal")
                                .removeClass("small")
                        }
                    }, 0)
                }
            }, 0)
        }
    }

    function h() {
        v = F(".like_button, .reblog_button, .everyone_i_follow, .my_posts, .send_to_signup")
    }

    function X(ae) {
        return (ae === "signup_login")
    }

    function O(ae) {
        if (!ae.length) {
            return
        }
        var ag = ae.length,
            af = Math.floor(Math.random() * ag);
        return ae[af]
    }

    function r(ae) {
        new Tumblr.Recaptcha({
            callback: ae
        })
    }

    return {
        initialize: function(ae) {
            ae = ae || {};
            A = ae.use_illustrated_loader || false;
            H = F("#tumblr_form_key")
                .attr("content");
            aa = Tumblr.Flags("captcha_use_recaptcha2");
            S = document.body.className.match("is_login_register");
            S = (S && S.length) ? true : false;
            R = (F(document.body)
                .hasClass("is_tablet"));
            b = (F(document.body)
                .hasClass("is_mobile_handset"));
            D = (R || b);
            s = (F(document.body)
                .hasClass("show_password_strength"));
            p = F("#signup_form");
            q = F("#signup_forms_submit");
            ad = F(".signup_buttons .login_signup_button, #logo");
            B = F(".signup_view");
            signup_form_fields = F("#signup_form input");
            l = this;
            W = "modal";
            Z = document.location.pathname;
            j = "?url=" + Z + "&version=" + W;
            h();
            J = false;
            if (ae.tmx_url && ae.tmx_url.length && Tumblr.TMX) {
                J = new Tumblr.TMX({
                    url: ae.tmx_url,
                })
            }
            z = new Tumblr.OnboardingBehaviors();
            F(document)
                .click(function(ah) {
                    var ag = F(ah.target);
                    var af = ag.parents(v.selector);
                    if (af.length) {
                        var ai = document.getElementById("signup_button_signup");
                        if (ai) {
                            ai.click()
                        }
                        ah.preventDefault();
                        ah.stopPropagation()
                    }
                });
            if (!S && p) {
                F(window)
                    .keydown(function(af) {
                        g[af.keyCode] = 1;
                        if (g[16]) {
                            F("body")
                                .addClass("slow_motion")
                        }
                        if (g[17] && g[18] && g[76]) {
                            F("body")
                                .removeClass("slow_motion");
                            d("signup_login");
                            g = [];
                            return false
                        }
                    });
                F(window)
                    .keyup(function(af) {
                        g[af.keyCode] = 0;
                        if (af.keyCode == 16) {
                            F("body")
                                .removeClass("slow_motion")
                        }
                        if (af.keyCode == 27) {
                            if (F("body")
                                .hasClass("lite")) {
                                return
                            }
                            if (F("body")
                                .hasClass("already_logged_in")) {
                                window.location = "/dashboard"
                            }
                        }
                    })
            }
            Tumblr.Events.on("MobileSplash:close", function() {
                a(F("#signup_email"))
            });
            if (p.length) {
                signup_form_fields.each(function(af) {
                    F(this)
                        .on("change", _.partial(M, this));
                    F(this)
                        .on("blur", function() {
                            if (J && !J.rendered) {
                                J.render()
                            }
                            Tumblr.Events.trigger("loginregister:beginFlow")
                        })
                });
                p.on("keydown", function(af) {
                    if (af.keyCode == 9 && !af.shiftKey) {
                        if (w()) {
                            af.preventDefault();
                            af.stopPropagation()
                        }
                    }
                    if (af.keyCode == 13) {
                        af.preventDefault();
                        af.stopPropagation();
                        E()
                    }
                });
                F("#signup_form_errors")
                    .click(G);
                q.click(function() {
                    E()
                });
                F("#signup_forms_container")
                    .scroll(function(af) {
                        F("#signup_forms_container")
                            .scrollLeft(0)
                    });
                e();
                if (l.errors) {
                    f(l.errors);
                    l.errors = null
                }
            }
            L()
        },
        update_send_to_signup_links: h,
        reset_view: function() {
            V()
        },
        update_view: function(ae) {
            V();
            d(ae)
        },
        current_view: null,
        spinner_opts: {
            lines: 16,
            length: 11,
            width: 4,
            radius: 17,
            color: "#fff",
            speed: 0.9,
            trail: 34,
            shadow: false,
            hwaccel: false,
            className: "signup_waiting_spinner spinner",
            zIndex: 2000000000,
            top: "50",
            left: "auto"
        }
    }
})(jQuery);
/*! scripts/registration/registration_behaviors.js */
(function(b, a) {
    var c = Backbone.View.extend({
        el: "body",
        events: {},
        initialize: function() {
            b("#signup_form input")
                .on("focus", _.bind(function(d) {
                    if (!this.tracking_events) {
                        this.start_tracking_events();
                        this.tracking_events = true
                    }
                }, this))
        },
        tracking_events: false,
        track_event: function(e, d) {
            if (_gaq) {
                _gaq.push(["_trackPageview", "/signup/" + e])
            }
        },
        start_tracking_events: function() {
            b("body")
                .on("click", _.bind(function(d) {
                    var e = d.currentTarget,
                        f = e.nodeName;
                    f += (e.id.length) ? "-" + e.id : "";
                    f += (e.className.length) ? "-" + e.className : "";
                    this.track_event("clicked", f)
                }, this));
            b(window)
                .on("keyup", _.bind(function(d) {
                    if (d.keyCode == 27) {
                        this.track_event("keypress", "esc")
                    }
                }, this))
        }
    });
    a.OnboardingBehaviors = c
})(jQuery, Tumblr);
/*! scripts/registration/registration.js */