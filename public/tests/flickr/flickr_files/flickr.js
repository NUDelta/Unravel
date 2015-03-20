page_timing.head_js_start = new Date()
            .getTime();
        F = window.F || {};


        (function(F) {
            var TIMEOUT = 10000;
            var pollers = {},
                pollerCount = 0,
                cachedEls = {},
                testDiv = document.createElement('div'),
                support = {
                    nativeTrim: typeof String.prototype.trim === 'function',
                    classList: 'classList' in testDiv
                };
            F.util = {
                clone: function(o) {
                    if (o === null || typeof o !== 'object') {
                        return o;
                    }
                    var c = new o.constructor();
                    for (var k in o) {
                        c[k] = F.util.clone(o[k]);
                    }
                    return c;
                },
                trim: function(str) {
                    if (support.nativeTrim) {
                        return str.trim();
                    } else {
                        return str.replace(/^\s+|\s+$/g, '');
                    }
                },
                getElementById: function(id) {
                    if (!cachedEls[id]) {
                        cachedEls[id] = document.getElementById(id);
                    }
                    return cachedEls[id];
                },
                hasClass: function(el, className) {
                    if (!el) {
                        return false;
                    }
                    if (support.classList) {
                        return el.classList.contains(className);
                    } else {
                        var re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
                        return re.test(el.className);
                    }
                },
                addClass: function(el, className) {
                    if (!el) {
                        return;
                    }
                    if (support.classList) {
                        el.classList.add(className);
                    } else if (!F.util.hasClass(el, className)) {
                        el.className = F.util.trim([el.className, className].join(' '));
                    }
                },
                removeClass: function(el, className) {
                    if (support.classList) {
                        el.classList.remove(className);
                    } else if (className && F.util.hasClass(el, className)) {
                        el.className = F.util.trim(el.className.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)'), ' '));
                        if (F.util.hasClass(el, className)) {
                            F.util.removeClass(el, className);
                        }
                    }
                },
                whenElementExists: function(id, callback, interval) {
                    var iterations = 0,
                        pollerId = id + pollerCount++;
                    interval = interval || 10;
                    var checkElementAndCallback = function() {
                        var el = (id === 'body') ? document.body : F.util.getElementById(id);
                        if (el) {
                            clearInterval(pollers[pollerId]);
                            callback(el);
                            return true;
                        } else if (++iterations * interval >= TIMEOUT) {
                            clearInterval(pollers[pollerId]);
                            return false;
                        }
                    };
                    if (!checkElementAndCallback()) {
                        pollers[pollerId] = setInterval(checkElementAndCallback, interval);
                    }
                },
                addListener: function(el, type, fn, capture) {
                    if (el.addEventListener) {
                        el.addEventListener(type, fn, capture);
                    } else if (el.attachEvent) {
                        el.attachEvent('on' + type, fn);
                    }
                },
                setCookie: function(name, value, days, path) {
                    var date, expires = '',
                        path = path || '/';
                    if (days) {
                        date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        expires = '; expires=' + date.toGMTString();
                    }
                    document.cookie = name + '=' + value + expires + '; path=' + path;
                },
                getCookie: function(name) {
                    var i, cookies = ' ' + document.cookie + ';';
                    name = ' ' + name + '=';
                    if ((i = cookies.indexOf(name)) >= 0) {
                        i += name.length;
                        cookies = cookies.substring(i, cookies.indexOf(';', i));
                        return cookies;
                    }
                },
                removeCookie: function(name) {
                    return F.util.setCookie(name, '', 0);
                }
            };
            testDiv = null;
        }(F));

        (function(wipe_msg, root_url, bust_image_search, is_debug) {

            var w = window,
                d = document,
                top_loc = top.location,
                self_loc = self.location,
                referrer = d.referrer,
                flickr_regex = /^[A-Za-z]+:\/{2,3}(?:[0-9\-A-Za-z]+\.)*flickr\.(?:(?:com)|(?:net))(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
                self_is_offline = (self_loc.protocol && self_loc.protocol.indexOf('http') < 0),
                self_is_flickr = flickr_regex.test(self_loc),
                self_url = self_is_flickr ? self_loc.href : root_url + '/',
                photo_page_re_result = self_is_flickr && /\/photos\/[^\/]+\/(\d+)/i.exec(self_loc.pathname),
                photo_id = photo_page_re_result && parseInt(photo_page_re_result[1], 10),
                frame_whitelist_regex = /^[A-Za-z]+:\/{2,3}(?:[0-9\-A-Za-z]+\.)*(?:(?:flickr\.(?:(?:com)|(?:net)))|(?:yahoo\.(?:(?:com)|(?:net)|(?:(?:com?\.)?[A-Za-z]{2})))|(?:creativecommons\.org)|(?:eyewonderlabs\.com)|(?:stumbleupon\.com)|(?:screenqueri\.es)|(?:su\.pr)|(?:bing\.com)|(?:bingj\.com)|(?:webcache\.googleusercontent\.com)|(?:google\.(?:(?:com)|(?:(?:com?\.)?[A-Za-z]{2}))))(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
                self_whitelist_regex = /^[A-Za-z]+:\/{2,3}(?:[0-9\-A-Za-z]+\.)*(?:(?:flickr\.(?:(?:com)|(?:net)))|(?:yahoo\.(?:(?:com)|(?:net)|(?:(?:com?\.)?[A-Za-z]{2})))|(?:translate\.google\.com)|(?:translate\.googleusercontent\.com)|(?:web\.archive\.org))(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
                image_search_regex = /^[A-Za-z]+:\/{2,3}(?:[0-9\-A-Za-z]+\.)*(?:(?:(?:google)|(?:bing))\.(?:(?:com)|(?:(?:com?\.)?[A-Za-z]{2})))(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
                referrer_is_flickr = flickr_regex.test(referrer),
                referrer_is_whitelisted = frame_whitelist_regex.test(referrer),
                referrer_is_image_search = image_search_regex.test(referrer),
                faq_url = root_url + '/frame_redir.gne?source=' + encodeURIComponent(referrer) + '&dest=' + encodeURIComponent(root_url + '/help/blogging/#1392237'),
                redir_url = root_url + '/frame_redir.gne?source=' + encodeURIComponent(referrer) + '&dest=' + encodeURIComponent(self_url),
                should_bust, should_wipe, base;

            function redirect() {
                w.onerror = function() {
                    return true;
                };
                if (typeof top_loc.replace === 'function') {
                    top_loc.replace(redir_url);
                } else {
                    top_loc.href = redir_url;
                }
            }

            function wipe() {
                var logo_w, font_size, win_width, html, msg;
                w.onerror = function() {
                    return true;
                };
                logo_w = 162;
                font_size = '12px';
                d.head.parentNode.removeChild(d.head);
                setInterval(function() {
                    if (d && d.body) {
                        if (d.body.lastChild && d.body.lastChild.className && d.body.lastChild.className === 'wipe-msg') {} else {
                            return;
                            msg = wipe_msg.replace('{url}', redir_url)
                                .replace('{faq}', faq_url);
                            if (typeof w.innerWidth === 'number') {
                                win_width = w.innerWidth;
                            } else if (d.body.clientWidth) {
                                win_width = d.body.clientWidth;
                            }
                            if (win_width && win_width < 162) {
                                logo_w = win_width;
                                font_size = '10px';
                            }
                            html = '<div class="wipe-msg" style="font-size:' + font_size + ';text-align:left;"><div style="margin-bottom:3px;"><img alt="Flickr" width="' + logo_w + '" src="https://s.yimg.com/pw/images/logo_home.png"></div><div style="padding-left:5px;line-height:1.2em;">' + msg + '</div></div>';
                            d.body.style.margin = '0';
                            d.body.innerHTML = html;
                        }
                    }
                }, 200);
            }

            function get_frame_depth() {
                var win = self,
                    frame_depth = 0;
                while (win !== win.parent) {
                    frame_depth += 1;
                    win = win.parent;
                }
                return frame_depth;
            }

            function debug() {
                if (is_debug) {
                    console.log(arguments);
                }
            }
            if (self_is_flickr && self_loc === top_loc) {} else if (self_is_offline) {} else if (!self_is_flickr && !self_whitelist_regex.test(self_loc)) {
                should_wipe = true;
            } else if (bust_image_search && photo_id && referrer_is_image_search) {
                should_bust = true;
            } else if (!referrer_is_whitelisted && get_frame_depth() > 0) {
                should_wipe = true;
            } else if (!referrer_is_flickr && get_frame_depth() > 1) {
                should_wipe = true;
            }
            if (is_debug) {
                debug({
                    self_is_flickr: self_is_flickr,
                    top_loc: top_loc,
                    self_loc: self_loc,
                    referrer: referrer,
                    self_is_offline: self_is_offline,
                    self_is_flickr: self_is_flickr,
                    self_url: self_url,
                    photo_page_re_result: photo_page_re_result,
                    photo_id: photo_id,
                    referrer_is_flickr: referrer_is_flickr,
                    referrer_is_whitelisted: referrer_is_whitelisted,
                    referrer_is_image_search: referrer_is_image_search,
                    self_is_whitelisted: self_whitelist_regex.test(self_loc),
                    frame_depth: get_frame_depth(),
                    faq_url: faq_url,
                    redir_url: redir_url,
                    should_bust: should_bust,
                    should_wipe: should_wipe,
                    base: base
                });
            } else {
                if (should_bust) {
                    setTimeout(function() {
                        w.onbeforeunload = w.onunload = null;
                        redirect();
                    }, 1000);
                    setTimeout(wipe, 2000);
                    redirect();
                } else if (should_wipe) {
                    wipe();
                } else if (referrer_is_whitelisted && !referrer_is_flickr) {
                    base = document.createElement('base');
                    base.target = '_top';
                    document.getElementsByTagName('head')[0].appendChild(base);
                }
            }

        }('We\'re sorry, Flickr <a href="{faq}" target="_top">doesn\'t allow embedding within frames</a>.<br><br>If you\'d like to view this content, <a href="{url}" target="_top">please click here</a>.', 'https://www.flickr.com', true, false));


        (function(F) {
            var el, w, d, n, ua, ae, is_away_from_tab, de, disabled = false,
                assigned_events = false;
            w = window;
            d = w.document;
            n = w.navigator;
            ua = n && n.userAgent;
            var supportsActiveElt = false;
            if ('activeElement' in document) {
                supportsActiveElt = true;
            }

            function doF(e, me) {
                if (is_away_from_tab && e.target === w) {
                    is_away_from_tab = false;
                } else {
                    el = e.target || me;
                }
            }

            function doB(e) {
                if (el !== w && e.target === w) {
                    is_away_from_tab = true;
                } else {
                    el = undefined;
                }
            }

            function get() {
                var nt, in_doc;
                if (supportsActiveElt) {
                    el = document.activeElement;
                } else if (el && (nt = el.nodeType)) {
                    if (d.contains) {
                        if ((ua && ua.match(/Opera[\s\/]([^\s]*)/)) || nt === 1) {
                            in_doc = d.contains(el);
                        } else {
                            while (el) {
                                if (d === el) {
                                    in_doc = true;
                                }
                                el = el.parentNode;
                            }
                        }
                    } else if (d.compareDocumentPosition) {
                        if (d === el || !!(d.compareDocumentPosition(el) & 16)) {
                            in_doc = true;
                        }
                    } else {
                        var myEl = el;
                        while (myEl) {
                            if (d === myEl) {
                                in_doc = true;
                            }
                            myEl = myEl.parentNode;
                        }
                    }
                }
                return in_doc ? el : undefined;
            }

            function isInput() {
                var n = get(),
                    nn;
                if (!n) {
                    return false;
                }
                nn = n.nodeName.toLowerCase();
                return (nn === 'input' || nn === 'textarea');
            }

            function instrumentInputs() {
                if (!assigned_events) {
                    var i, me, inputs = document.getElementsByTagName('input'),
                        tas = document.getElementsByTagName('textarea'),
                        nInputs = inputs.length,
                        nTextAreas = tas.length;
                    if (nInputs || nTextAreas) {
                        for (i = 0; i < nTextAreas; i++) {
                            me = tas[i];
                            tas[i].attachEvent('onfocusin', function(e) {
                                if (!disabled) {
                                    doF(e, me);
                                }
                            });
                        }
                        for (i = 0; i < nInputs; i++) {
                            me = inputs[i];
                            inputs[i].attachEvent('onfocusin', function(e) {
                                if (!disabled) {
                                    doF(e, me);
                                }
                            });
                        }
                        assigned_events = true;
                    }
                }
            }

            function destroy() {
                disabled = true;
                if (de = w.removeEventListener) {
                    de('focus', doF, true);
                    de('blur', doB, true);
                } else if (de = d.removeEvent) {
                    de('blur', doB);
                }
            }

            function dom_onready(onready_handler) {
                if (typeof onready_handler === 'undefined') {
                    return false;
                }
                if (document.readyState === 'complete') {
                    onready_handler();
                } else {
                    if (document.addEventListener) {
                        DOMContentLoaded = function() {
                            document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
                            onready_handler();
                        };
                    } else if (document.attachEvent) {
                        DOMContentLoaded = function() {
                            if (document.readyState === 'complete') {
                                document.detachEvent('onreadystatechange', DOMContentLoaded);
                                onready_handler();
                            }
                        };
                    }
                    if (document.addEventListener) {
                        document.addEventListener('DOMContentLoaded', onready_handler, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('onreadystatechange', onready_handler);
                    }
                }
            }
            if (ae = w.addEventListener) {
                ae('focus', doF, true);
                ae('blur', doB, true);
            } else if (ae = d.attachEvent) {
                dom_onready(instrumentInputs);
                ae('onfocusout', doB);
            }
            F.focus_tracker = {
                get: get,
                isInput: isInput,
                destroy: destroy
            };
        }(F));
        (function() {
            var mod = 'imageChecker',
                imgs = {},
                i = 0;

            function stamp(node) {
                return node.id || (node.id = mod + '-' + new Date()
                    .getTime() + i++);
            }
            F[mod] = {
                load: function(node) {
                    imgs[stamp(node)] = true;
                },
                error: function(node) {
                    imgs[stamp(node)] = false;
                },
                check: function(node) {
                    return imgs[stamp(node)];
                }
            };
        }());