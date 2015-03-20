if (typeof(AC) === "undefined") {
    AC = {}
}
if (typeof(AC.addEvent) === "undefined") {
    AC.addEvent = function(b, a, c) {
        if (b.addEventListener) {
            return b.addEventListener(a, c, false)
        }
        return b.attachEvent("on" + a, c)
    }
}
if (typeof(AC.Storage) !== "object") {
    AC.Storage = {
        getItem: function() {},
        getItemObject: function() {},
        setItem: function() {}
    }
} else {
    if (typeof(AC.Storage.getItem) !== "function") {
        AC.Storage.getItem = function() {}
    }
    if (typeof(AC.Storage.getItemObject) !== "function") {
        AC.Storage.getItemObject = function() {}
    }
    if (typeof(AC.Storage.setItem) !== "function") {
        AC.Storage.setItem = function() {}
    }
}
var FeedStatistics = function() {
    if (typeof(aiRequestsEnabled) !== "undefined" && aiRequestsEnabled === false) {
        return
    }
    this.hostUri = window.location.protocol + "//" + window.location.hostname + "/search/instant/feedStatistics";
    this.params = {};
    this.params.model = "marcom_en_US";
    this.params.locale = "en_US";
    this.callback = "FeedStatistics.callbackSuccess";
    this.storageDays = 0;
    this.readTimer = 3000;
    this.countryScope = "us";
    this.globalNavScope = ["global", "mac", "ipod", "iphone", "ipad", "ipoditunes"];
    this.searchPageScope = ["global"];
    this.readScope = ["global", "mac", "ipod", "iphone", "ipad", "ipoditunes"]
};
FeedStatistics.callbackSuccess = function(a) {
    if (typeof window.console !== "undefined") {
        if (typeof(responseLog) !== "undefined" && responseLog === true) {
            console.log(a)
        }
    }
};
FeedStatistics.prototype.globalNavFeed = function() {
    if (this.checkScope(this.globalNavScope)) {
        var a = document.getElementById("sp-searchtext");
        if (typeof(a) !== "undefined" && a != null) {
            this.inputFeed(a)
        }
    }
};
FeedStatistics.prototype.searchInputFeed = function() {
    if (this.checkScope(this.searchPageScope)) {
        var a = document.getElementById("barsearchapple");
        if (typeof(a) !== "undefined" && a != null) {
            this.inputFeed(a)
        }
    }
};
FeedStatistics.prototype.inputFeed = function(b) {
    if (b) {
        var a = this;
        var c = a.getStorageItem("query");
        AC.addEvent(b, "keyup", function(d) {
            if (!d) {
                d = event
            }
            var e = d.keyCode;
            if (e === 13 && !d.altKey && c && c !== "" && c !== b.value) {
                a.updateNotViewed()
            }
        })
    }
};
FeedStatistics.prototype.searchResultFeed = function() {
    if (this.checkScope(this.searchPageScope)) {
        var b = document.body.className;
        var a;
        if (b && (b === "search")) {
            a = document.getElementById("www")
                .getElementsByTagName("li");
            if (Search.allResults && Search.allResults.length === 0) {
                this.updateSearched(false)
            } else {
                this.updateSearched(true);
                this.loadResultListeners(a)
            }
            this.updateStorageItem("next", false)
        }
    }
};
FeedStatistics.prototype.nextPageFeed = function() {
    if (this.checkScope(this.searchPageScope)) {
        var b = document.body.className;
        var a = document.getElementById("www")
            .getElementsByTagName("li");
        if ((typeof(a) !== "undefined") && (a.length !== 0)) {
            this.loadResultListeners(a)
        }
        if ((b) && (b === "search")) {
            if ((typeof(this.getStorageItem("next")) !== "undefined") && (this.getStorageItem("next") === true)) {
                return
            } else {
                this.updateNextPage();
                this.updateStorageItem("next", true)
            }
        }
    }
};
FeedStatistics.prototype.readFeed = function() {
    if (this.checkScope(this.readScope)) {
        if (typeof(s) !== "undefined") {
            if (typeof(s.pageType) !== "undefined" && s.pageType === "errorPage") {
                return
            }
        }
        if ((this.getStorageItem("read") !== null) && (window.location.href === this.getStorageItem("selectedUri"))) {
            var b = new Date();
            var a = this;
            this.currentTime = b.getTime();
            AC.addEvent(window, "beforeunload", function(c) {
                var e = new Date();
                var f = e.getTime() - a.currentTime;
                var d = Math.round(f / 1000);
                if (f > a.readTimer) {
                    a.updateRead(true, d)
                } else {
                    a.updateRead(false, d)
                }
                a.updateStorageItem("read", null)
            })
        }
    }
};
FeedStatistics.prototype.updateNotViewed = function() {
    if (typeof(aiRequestsEnabled) !== "undefined" && aiRequestsEnabled !== false) {
        var a = this.params;
        a.feedType = "notviewed";
        a.feedQuery = (this.getStorageItem("query") !== null) ? encodeURIComponent(this.getStorageItem("query")) : null;
        this.sendRequest(a)
    }
};
FeedStatistics.prototype.updateSearched = function(b) {
    var a = this.params;
    a.feedType = "searched";
    a.hasResults = (b === true) ? "true" : "false";
    a.feedQuery = encodeURIComponent(this.getQueryFromUri());
    a.feedLastSuggestions = (this.getStorageItem("lastSuggestions") !== null) ? encodeURIComponent(this.getStorageItem("lastSuggestions")) : null;
    this.sendRequest(a);
    this.updateStorageItem("query", this.getQueryFromUri())
};
FeedStatistics.prototype.updateNextPage = function() {
    var a = this.params;
    a.feedType = "nextpage";
    a.feedQuery = encodeURIComponent(this.getQueryFromUri());
    this.sendRequest(a)
};
FeedStatistics.prototype.updateRead = function(c, b) {
    var a = this.params;
    a.feedType = (c) ? "read" : "notread";
    a.feedArticleID = (this.getStorageItem("selectedUri") !== null) ? this.getStorageItem("selectedUri") : null;
    a.feedQuery = (this.getStorageItem("query") !== null) ? encodeURIComponent(this.getStorageItem("query")) : null;
    a.position = (this.getStorageItem("position") !== null) ? this.getStorageItem("position") : null;
    a.timeSpent = b;
    this.sendRequest(a)
};
FeedStatistics.prototype.updateLastSuggestions = function(a) {
    this.updateStorageItem("lastSuggestions", a)
};
FeedStatistics.prototype.updateLastQuery = function(a) {
    this.updateStorageItem("query", a)
};
FeedStatistics.prototype.udpateResultActivity = function(a, b) {
    this.updateStorageItem("read", false);
    this.updateStorageItem("position", a);
    this.updateStorageItem("selectedUri", b)
};
FeedStatistics.prototype.loadResultListeners = function(b) {
    try {
        var l = this;
        var e;
        var a = b.length;
        var j;
        var h;
        var g;
        var f;
        var d;
        for (e = 0; e < a; e += 1) {
            var k = b[e].getElementsByTagName("a");
            AC.addEvent(k[0], "mousedown", function(i) {
                j = this;
                var n = (!j.attributes) ? j.position : j.getAttribute("position"),
                    m = (!j.attributes) ? j.href : j.getAttribute("href");
                if (n && m) {
                    h = n;
                    f = m
                }
                l.udpateResultActivity(h, f);
                return false
            });
            AC.addEvent(k[1], "mousedown", function(i) {
                j = this;
                if (j.attributes.position && j.attributes.href) {
                    g = j.attributes.position.value;
                    d = j.attributes.href.value
                }
                l.udpateResultActivity(g, d);
                return false
            })
        }
    } catch (c) {}
};
FeedStatistics.prototype.getStorageItem = function(a) {
    var b = AC.Storage.getItem("feedStats");
    if ((typeof(b) !== "undefined") && (b !== null)) {
        if (typeof(b[a]) !== "undefined") {
            return b[a]
        } else {
            return null
        }
    }
};
FeedStatistics.prototype.updateStorageItem = function(e, d) {
    var c = {};
    c[e] = d;
    var a = AC.Storage.getItemObject("feedStats");
    if ((typeof(a) !== "undefined") && (a !== null)) {
        if (a.hasOwnProperty("value")) {
            var b = Object.extend(a.value, c);
            AC.Storage.setItem("feedStats", b, this.storageDays)
        } else {
            return
        }
    } else {
        AC.Storage.setItem("feedStats", c, this.storageDays)
    }
};
FeedStatistics.prototype.sendRequest = function(c) {
    var b = this.generateStatisticsUri(c);
    if (b.indexOf(location.protocol + "//" + location.host) === 0) {
        var a;
        if (window.XMLHttpRequest) {
            a = new XMLHttpRequest()
        } else {
            a = new ActiveXObject("Microsoft.XMLHTTP")
        }
        a.open("GET", b, false);
        a.send()
    }
};
FeedStatistics.prototype.generateStatisticsUri = function(c) {
    function a(d) {
        d = unescape(d);
        d = d.replace(/^\s+/g, "")
            .replace(/\s+$/g, "")
            .replace(/\s\s+/g, " ");
        d = escape(d);
        return d
    }
    c.feedQuery = a(c.feedQuery);
    var b = this.hostUri + "?feedType=" + c.feedType + "&query=" + c.feedQuery + "&locale=" + c.locale + "&model=" + c.model;
    if (c.feedType) {
        switch (c.feedType) {
            case "notviewed":
                break;
            case "searched":
                b = b + "&hasResults=" + c.hasResults + "&lastSuggestions=" + c.feedLastSuggestions;
                break;
            case "nextpage":
                break;
            case "read":
                b = b + "&articleID=" + c.feedArticleID + "&position=" + c.position + "&timeSpent=" + c.timeSpent;
                break;
            case "notread":
                b = b + "&articleID=" + c.feedArticleID + "&position=" + c.position + "&timeSpent=" + c.timeSpent;
                break;
            default:
                break
        }
        b = b + "&callback=" + this.callback
    }
    return b
};
FeedStatistics.prototype.checkScope = function(b) {
    var a;
    if ((typeof(searchCountry) !== "undefined") && (typeof(searchSection) !== "undefined")) {
        if (searchCountry === this.countryScope) {
            for (a = 0; a < b.length; a += 1) {
                if (searchSection === b[a]) {
                    return true
                }
            }
        }
    } else {
        return false
    }
    return false
};
FeedStatistics.prototype.getQueryFromUri = function() {
    var d = window.location.href;
    var b = "q";
    b = b.replace(/[\[]/, "\\[")
        .replace(/[\]]/, "\\]");
    var a = "[\\?&]" + b + "=([^&#]*)";
    var c = new RegExp(a);
    var e = c.exec(d);
    if (e === null) {
        return ""
    }
    return decodeURIComponent(e[1])
};
if (typeof(AC.onDOMReady) === "function") {
    AC.onDOMReady(function() {
        if (typeof(aiRequestsEnabled) !== "undefined" && aiRequestsEnabled !== false) {
            var a = new FeedStatistics();
            a.globalNavFeed();
            a.readFeed()
        }
    })
};