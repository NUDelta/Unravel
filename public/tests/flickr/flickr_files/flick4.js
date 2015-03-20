(function() {
                if (typeof page_timing != 'undefined') {
                    page_timing.page_end = new Date()
                        .getTime();

                    function timing_dom_ready() {
                        page_timing.dom_ready = new Date()
                            .getTime();
                    }

                    function timing_window_load() {
                        page_timing.window_load = new Date()
                            .getTime();
                    }

                    function dom_onready(onready_handler) {
                        if (typeof onready_handler == 'undefined') {
                            return false;
                        }
                        if (document.readyState === "complete") {
                            onready_handler();
                        } else {
                            if (document.addEventListener) {
                                DOMContentLoaded = function() {
                                    document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
                                    onready_handler();
                                }
                            } else if (document.attachEvent) {
                                DOMContentLoaded = function() {
                                    if (document.readyState === "complete") {
                                        document.detachEvent("onreadystatechange", DOMContentLoaded);
                                        onready_handler();
                                    }
                                }
                            };
                            if (document.addEventListener) {
                                document.addEventListener('DOMContentLoaded', onready_handler, false);
                            } else if (document.attachEvent) {
                                document.attachEvent("onreadystatechange", onready_handler);
                            }
                        }
                    }

                    function window_onload(onready_handler) {
                        var m1 = window.addEventListener;
                        var m2 = document.addEvent;
                        if (m1) {
                            m1('load', onready_handler, false);
                        } else if (m2) {
                            m2(window, 'onload', onready_handler);
                        }
                    }
                    dom_onready(timing_dom_ready);
                    window_onload(timing_window_load);
                }
            })();