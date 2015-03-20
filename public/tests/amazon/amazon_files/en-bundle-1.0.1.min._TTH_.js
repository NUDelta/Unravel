var ACSUX = window.ACSUX || {};
ACSUX.en || (ACSUX.en = function(a) {
        var b = a,
            c = b(".acs-en-middle-section .acs-en-selected")
            .parent(".acs-en-row")
            .index() + 1,
            d = "#acs-en-tab-" + c,
            e = d + "-s",
            f = d + "-xs";
        b(d)
            .addClass("acs-en-tab-selected"), b(e)
            .addClass("acs-en-selected"), b(f)
            .addClass("acs-en-selected");
        var g;
        1 === c ? g = "0px" : 2 === c ? g = "-150px" : 3 === c ? g = "-300px" : 4 === c && (g = "-450px"), b(".acs-en-middle-section")
            .css("margin-top", g), 0 == c && (b("#acs-en-tab-1")
                .addClass("acs-en-tab-selected"), b("#acs-en-tab-1-s")
                .addClass("acs-en-selected"), b("#acs-en-tab-1-xs")
                .addClass("acs-en-selected")), b("#acs-en-tab-1")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "0px"), b(".acs-en-tabs .acs-en-tab-selected")
                    .removeClass("acs-en-tab-selected"), b(this)
                    .addClass("acs-en-tab-selected")
            }), b("#acs-en-tab-2")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "-150px"), b(".acs-en-tabs .acs-en-tab-selected")
                    .removeClass("acs-en-tab-selected"), b(this)
                    .addClass("acs-en-tab-selected")
            }), b("#acs-en-tab-3")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "-300px"), b(".acs-en-tabs .acs-en-tab-selected")
                    .removeClass("acs-en-tab-selected"), b(this)
                    .addClass("acs-en-tab-selected")
            }), b("#acs-en-tab-4")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "-450px"), b(".acs-en-tabs .acs-en-tab-selected")
                    .removeClass("acs-en-tab-selected"), b(this)
                    .addClass("acs-en-tab-selected")
            }), b("#acs-en-tab-1-s")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "0px"), b(".acs-en-two-column-layout .acs-en-selected")
                    .removeClass("acs-en-selected"), b(this)
                    .addClass("acs-en-selected")
            }), b("#acs-en-tab-2-s")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "-150px"), b(".acs-en-two-column-layout .acs-en-selected")
                    .removeClass("acs-en-selected"), b(this)
                    .addClass("acs-en-selected")
            }), b("#acs-en-tab-3-s")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "-300px"), b(".acs-en-two-column-layout .acs-en-selected")
                    .removeClass("acs-en-selected"), b(this)
                    .addClass("acs-en-selected")
            }), b("#acs-en-tab-4-s")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "-450px"), b(".acs-en-two-column-layout .acs-en-selected")
                    .removeClass("acs-en-selected"), b(this)
                    .addClass("acs-en-selected")
            }), b("#acs-en-tab-1-xs")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "0px"), b(".acs-en-two-column-layout .acs-en-selected")
                    .removeClass("acs-en-selected"), b(this)
                    .addClass("acs-en-selected")
            }), b("#acs-en-tab-2-xs")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "-150px"), b(".acs-en-two-column-layout .acs-en-selected")
                    .removeClass("acs-en-selected"), b(this)
                    .addClass("acs-en-selected")
            }), b("#acs-en-tab-3-xs")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "-300px"), b(".acs-en-two-column-layout .acs-en-selected")
                    .removeClass("acs-en-selected"), b(this)
                    .addClass("acs-en-selected")
            }), b("#acs-en-tab-4-xs")
            .click(function() {
                b(".acs-en-middle-section")
                    .css("margin-top", "-450px"), b(".acs-en-two-column-layout .acs-en-selected")
                    .removeClass("acs-en-selected"), b(this)
                    .addClass("acs-en-selected")
            })
    }),
    function() {
        var a = document.getElementsByTagName("script"),
            b = a[a.length - 1],
            c = b.parentNode;
        void 0 !== window.amznJQ ? amznJQ.onReady("jQuery", function() {
                return new ACSUX.en(jQuery, c)
            }) : void 0 !== window.P ? P.when("A", "ready")
            .execute(function(a) {
                return new ACSUX.en(a.$, c)
            }) : window.jQuery && jQuery(document)
            .ready(function() {
                return new ACSUX.en(jQuery, c)
            })
    }();