/*jslint white: false, undef: false, browser: true, eqeqeq: true, regexp: false, newcap: true, immed: true, onevar: false, plusplus: false */
        /*global F: false, YUI: false, window: false */

        (function(F) {
            var OFFSETS = {
                GLOBAL_NAV: null,
                UNIVERSAL_HEADER: null
            };

            function alignToAnchor(anchor, preventDelay) {
                var delay = (!preventDelay && document.documentMode) ? 800 : 50;
                var elt = document.getElementById(anchor) || document.getElementsByName(anchor)[0];
                if (elt) {
                    setTimeout(function() {
                        var destination = elt.offsetTop,
                            origPosition = elt.style.position;
                        if (F.util.hasClass(document.body, 'header-underlap')) {
                            destination -= OFFSETS.GLOBAL_NAV;
                        }
                        if (F.util.hasClass(document.body, 'with-eyebrow')) {
                            destination -= OFFSETS.UNIVERSAL_HEADER;
                        }
                        if (!origPosition) {
                            elt.style.position = 'relative';
                            destination = Math.max(destination, elt.offsetTop - destination);
                            elt.style.position = origPosition;
                        }
                        window.scrollTo(0, destination);
                    }, delay);
                }
            }

            function normalizeAnchor() {
                var anchor = document.location.hash;
                if (anchor[0] === '#') {
                    anchor = anchor.replace('#', '');
                }
                return anchor;
            }

            function handleEvent(elt, eventName, handler, useCapture) {
                useCapture = useCapture || false;
                if (elt.addEventListener) {
                    elt.addEventListener(eventName, handler, useCapture);
                } else if (elt.attachEvent) {
                    elt.attachEvent('on' + eventName, handler);
                }
            }
            F.anchorRepositioner = {
                init: function() {
                    F.util.whenElementExists('global-nav', function(nav) {
                        OFFSETS.GLOBAL_NAV = nav.offsetHeight;
                    });
                    F.util.whenElementExists('eyebrow', function(eyebrow) {
                        OFFSETS.UNIVERSAL_HEADER = eyebrow.offsetHeight;
                    });
                    var pageLoadAnchor = normalizeAnchor();
                    if (pageLoadAnchor) {
                        handleEvent(document, 'DOMContentLoaded', function() {
                            alignToAnchor(pageLoadAnchor);
                        });
                    }
                    handleEvent(window, 'hashchange', function(e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }
                        var anchor = normalizeAnchor();
                        alignToAnchor(anchor);
                    }, true);
                }
            };
        }(F));
        F.anchorRepositioner.init();
        /*jslint white: false, undef: false, browser: true, eqeqeq: true, regexp: false, newcap: true, immed: true, onevar: false, plusplus: false */
        /*global F: false, YUI: false, window: false */

        (function(F) {
            var useNewExplore = false,
                useEyebrow = true,
                HEIGHT_TO_PHOTO_TOP = 71,
                savingThrowAgainstTrailingCommas = true;

            var NEW_PHOTO_HEIGHT;
            var MIN_PAGE_WIDTH = 1024,
                MIN_PAGE_HEIGHT = 768,
                MIN_PHOTO_WIDTH = 975,
                SCROLLBAR_GUTTER = 26,
                PHOTO_INTERIOR_PADDING_TOP = 0,
                PHOTO_INTERIOR_PADDING_SIDES = 10,
                PHOTO_TITLE_HEIGHT = 41,
                PHOTO_ATTRIBUTION_HEIGHT = NEW_PHOTO_HEIGHT || 45;
            var bodyInitialized = false,
                subnavDefaultWidth = 0;

            function verifyDimension(n) {
                return (typeof n === 'number' && n > 0);
            }

            function resizeCoverPhoto(subnav) {
                var main = F.util.getElementById('main') || F.util.getElementById('Main');
                if (F.util.hasClass(document.body, 'breakout')) {
                    subnav.style.left = 0;
                    subnav.style.width = 'auto';
                    return;
                }
                if (!subnavDefaultWidth) {
                    subnavDefaultWidth = main.offsetWidth;
                }
                var clientWidth = document.body.clientWidth;
                if (clientWidth < 975) {
                    return;
                }
                var offset = Math.ceil((clientWidth - subnavDefaultWidth) / 2);
                subnav.style.left = (-1 * offset) + 'px';
                subnav.style.width = clientWidth + 'px';
            }
            F.liquid = {
                getDimensions: function(preventHighResolution) {
                    var doc = window.document,
                        win = doc.defaultView || doc.parentWindow,
                        mode = doc.compatMode,
                        h = win.innerHeight,
                        w = win.innerWidth,
                        root = doc.documentElement,
                        preventHighResolution = preventHighResolution || false,
                        pixelRatio = preventHighResolution ? 1 : (window.devicePixelRatio || 1);
                    if (mode) {
                        if (mode !== 'CSS1Compat') {
                            root = doc.body;
                        }
                        h = root.clientHeight;
                        w = root.clientWidth;
                    }
                    h *= pixelRatio;
                    w *= pixelRatio;
                    if (verifyDimension(w) && verifyDimension(h)) {
                        return {
                            height: h,
                            width: w,
                            isHighResolution: (pixelRatio > 1)
                        };
                    }
                    return false;
                },
                getAvailableSpaceForPhoto: function() {
                    var dimensions, pixelRatio = window.devicePixelRatio || 1;
                    dimensions = F.liquid.getDimensions() || {
                        width: MIN_PAGE_WIDTH,
                        height: MIN_PAGE_HEIGHT
                    };
                    return {
                        w: Math.max(dimensions.width - (2 * pixelRatio * PHOTO_INTERIOR_PADDING_SIDES), pixelRatio * MIN_PHOTO_WIDTH),
                        h: dimensions.height - (pixelRatio * (HEIGHT_TO_PHOTO_TOP + PHOTO_INTERIOR_PADDING_TOP + PHOTO_TITLE_HEIGHT + PHOTO_ATTRIBUTION_HEIGHT))
                    };
                },
                getAvailableSpaceForPhotoContainer: function() {
                    var dimensions, pixelRatio = window.devicePixelRatio || 1;
                    dimensions = F.liquid.getDimensions() || {
                        width: MIN_PAGE_WIDTH,
                        height: MIN_PAGE_HEIGHT
                    };
                    dimensions.width /= pixelRatio;
                    dimensions.height /= pixelRatio;
                    return {
                        w: dimensions.width,
                        h: dimensions.height - HEIGHT_TO_PHOTO_TOP - PHOTO_ATTRIBUTION_HEIGHT
                    };
                },
                resizePage: function() {
                    var pageDimensions = F.liquid.getDimensions(true),
                        pageWidth = pageDimensions.width,
                        pageHeight = pageDimensions.height - HEIGHT_TO_PHOTO_TOP;
                    F.util.setCookie('liqpw', pageWidth, 365);
                    F.util.setCookie('liqph', pageHeight, 365);
                    if (!bodyInitialized) {
                        F.util.whenElementExists('body', function(body) {
                            F.util.addClass(body, 'liquid');
                            bodyInitialized = true;
                        });
                    }
                    F.util.whenElementExists('subnav-refresh', function(subnav) {
                        resizeCoverPhoto(subnav);
                    });
                    return pageWidth;
                }
            };
        }(F));
        F.liquid.resizePage();