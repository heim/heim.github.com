var DISQUS = function (d) {
        var j = {
            AssertionError: function (d) {
                this.message = d
            }
        };
        j.AssertionError.prototype.toString = function () {
            return "Assertion Error: " + (this.message || "[no message]")
        };
        j.assert = function (d, f) {
            if (!d) throw new j.AssertionError(f);
        };
        var h = [];
        j.define = function (l, f) {
            typeof l === "function" && (f = l, l = "");
            for (var b = l.split("."), c = b.shift(), e = j, k = (f ||
            function () {
                return {}
            }).call({
                overwrites: function (c) {
                    c.__overwrites__ = !0;
                    return c
                }
            }, d); c;) e = e[c] ? e[c] : e[c] = {}, c = b.shift();
            for (var s in k) k.hasOwnProperty(s) && (k.__overwrites__ || e[s] !== null && j.assert(!e.hasOwnProperty(s), "Unsafe attempt to redefine existing module with " + s), e[s] = k[s], h.push(function (c, b) {
                return function () {
                    delete c[b]
                }
            }(e, s)));
            return e
        };
        j.use = function (d) {
            return j.define(d)
        };
        j.cleanup = function () {
            for (var d = 0; d < h.length; d++) h[d]()
        };
        return j
    }(this);
DISQUS.define(function (d, j) {
    var h = d.document,
        l = h.getElementsByTagName("head")[0] || h.getElementsByTagName("body")[0],
        f = {
            running: !1,
            timer: null,
            queue: []
        };
    DISQUS.defer = function (b, c) {
        function e() {
            var c = f.queue;
            if (c.length === 0) f.running = !1, clearInterval(f.timer);
            for (var b = 0, e; e = c[b]; b++) e[0]() && (c.splice(b--, 1), e[1]())
        }
        f.queue.push([b, c]);
        e();
        if (!f.running) f.running = !0, f.timer = setInterval(e, 100)
    };
    DISQUS.each = function (b, c) {
        var e = b.length,
            k = Array.prototype.forEach;
        if (isNaN(e)) for (var d in b) b.hasOwnProperty(d) && c(b[d], d, b);
        else if (k) k.call(b, c);
        else for (k = 0; k < e; k++) c(b[k], k, b)
    };
    DISQUS.serializeArgs = function (b) {
        var c = [];
        DISQUS.each(b, function (b, k) {
            b !== j && c.push(k + (b !== null ? "=" + encodeURIComponent(b) : ""))
        });
        return c.join("&")
    };
    DISQUS.serialize = function (b, c, e) {
        c && (b += ~b.indexOf("?") ? b.charAt(b.length - 1) == "&" ? "" : "&" : "?", b += DISQUS.serializeArgs(c));
        if (e) return c = {}, c[(new Date).getTime()] = null, DISQUS.serialize(b, c);
        c = b.length;
        return b.charAt(c - 1) == "&" ? b.slice(0, c - 1) : b
    };
    DISQUS.require = function (b, c, e, k, d) {
        function j(a) {
            if (a.type == "load" || /^(complete|loaded)$/.test(a.target.readyState)) k && k(), o && clearTimeout(o), DISQUS.bean.remove(a.target, t, j)
        }
        var f = h.createElement("script"),
            t = f.addEventListener ? "load" : "readystatechange",
            o = null;
        f.src = DISQUS.serialize(b, c, e);
        f.async = !0;
        f.charset = "UTF-8";
        (k || d) && DISQUS.bean.add(f, t, j);
        d && (o = setTimeout(function () {
            d()
        }, 2E4));
        l.appendChild(f);
        return DISQUS
    };
    DISQUS.requireStylesheet = function (b, c, e) {
        var d = h.createElement("link");
        d.rel = "stylesheet";
        d.type = "text/css";
        d.href = DISQUS.serialize(b, c, e);
        l.appendChild(d);
        return DISQUS
    };
    DISQUS.requireSet = function (b, c, e) {
        var d = b.length;
        DISQUS.each(b, function (b) {
            DISQUS.require(b, {}, c, function () {
                --d === 0 && e()
            })
        })
    };
    DISQUS.injectCss = function (b) {
        var c = h.createElement("style");
        c.setAttribute("type", "text/css");
        b = b.replace(/\}/g, "}\n");
        d.location.href.match(/^https/) && (b = b.replace(/http:\/\//g, "https://"));
        c.styleSheet ? c.styleSheet.cssText = b : c.appendChild(h.createTextNode(b));
        l.appendChild(c)
    }
});
DISQUS.define(function (d, j) {
    var h = d.document,
        l = 0,
        f = {
            "0.0": {},
            "1.0": {}
        };
    DISQUS.config = {};
    DISQUS.blocks = {
        theme: {},
        defaults: {}
    };
    DISQUS.status = null;
    DISQUS.settings = {
        store_: {},
        schema_: {
            "disqus.version": {
                type: "str"
            },
            "disqus.domain": {
                type: "str"
            },
            "disqus.debug": {
                type: "bool"
            },
            "disqus.minified": {
                type: "bool"
            },
            "disqus.readonly": {
                type: "bool"
            },
            "disqus.recaptcha.key": {
                type: "str"
            },
            "disqus.facebook.appId": {
                type: "str"
            },
            "disqus.facebook.apiKey": {
                type: "str"
            },
            "disqus.urls.main": {
                type: "str"
            },
            "disqus.urls.media": {
                type: "str"
            },
            "disqus.urls.sslMedia": {
                type: "str"
            },
            "disqus.urls.realtime": {
                type: "str"
            },
            "disqus.urls.uploads": {
                type: "str"
            },
            "disqus.urls.unmerged": {
                type: "str"
            }
        }
    };
    DISQUS.settings.store_ = {
        "disqus.recaptcha.key": "6LdKMrwSAAAAAPPLVhQE9LPRW4LUSZb810_iaa8u",
        "disqus.urls.media": "http://mediacdn.disqus.com/1334195886",
        "disqus.urls.main": "http://disqus.com",
        "disqus.urls.uploads": "http://media.disqus.com/uploads",
        "disqus.urls.realtime": "http://rt.disqus.com/forums/realtime-cached.js",
        "disqus.urls.unmerged": "http://disqus.com/embed/profile/unmerged_profiles/",
        "disqus.urls.sslMedia": "https://securecdn.disqus.com/1334195886",
        "disqus.domain": "disqus.com",
        "disqus.version": "1334195886",
        "disqus.debug": !1,
        "disqus.minified": !0
    };
    DISQUS.settings.add = function (b, c, e) {
        DISQUS.assert(DISQUS.settings.schema_[b] == null || e, "Unsafe attempt to update settings schema.");
        DISQUS.assert(c.type != null, "Missing required property 'key'.");
        DISQUS.settings.schema_[b] = c;
        return DISQUS.settings
    };
    DISQUS.settings.get = function (b, c) {
        var e = DISQUS.settings.schema_[b];
        DISQUS.assert(e != null, "Undefined key '" + b + "'.");
        var d = DISQUS.settings.store_[b];
        if (d == null) return c;
        if (e.values && !e.values.length) {
            var f = {};
            DISQUS.each(e.values, function (c, b) {
                f[c] = b
            });
            return f[d]
        }
        return d
    };
    DISQUS.settings.set = function (b, c) {
        var e = DISQUS.settings.schema_[b],
            d;
        DISQUS.assert(e != null, "Undefined key '" + b + "'.");
        d = function (b) {
            for (var e = 0, d; d = b[e]; e++) {
                if (d == "str" && typeof c == "string") return !0;
                if (d == "bool" && typeof c == "boolean") return !0;
                if (d == "int" && typeof c == "number") return !0;
                if (d == "obj" && typeof c == "object") return !0
            }
            return !1
        }(typeof e.type == "string" ? [e.type] : e.type);
        DISQUS.assert(d, "Invalid type for rule '" + b + "'.");
        e.values && DISQUS.assert(DISQUS.contains(e.values, c), "Value is not acceptable.");
        e.rule && DISQUS.assert(e.rule(c, b), "Value didn't pass schema's rule.");
        DISQUS.settings.store_[b] = e.values && !e.values.length ? e.values[c] : c
    };
    DISQUS.isBrowser = function (b) {
        var c = d.navigator.userAgent,
            e = /(iPhone|Android|iPod|iPad|webOS|Mobile Safari|Windows Phone)/i;
        switch (b) {
        case "ie":
            return /msie/i.test(c) && !/opera/i.test(c);
        case "ie6":
            return !d.XMLHttpRequest;
        case "ie7":
            return /msie/i.test(c) && !/opera/i.test(c) && parseInt(/MSIE\s(\d+\.\d+)/.exec(c)[1], 10) == 7;
        case "webkit":
            return ~c.indexOf("AppleWebKit/");
        case "opera":
            return !(!d.opera || !d.opera.buildNumber);
        case "gecko":
            return ~c.indexOf("Gecko/");
        case "mobile":
            return e.test(c);
        case "quirks":
            return h.compatMode === "BackCompat";
        default:
            return !1
        }
    };
    DISQUS.api = function (b, c) {
        var e = DISQUS.comm && DISQUS.comm.Default.recover();
        if (e) {
            if (!c.type) c.type = "GET";
            if (!c.success) c.success = function () {};
            if (!c.failure) c.failure = function () {};
            if (!c.data) c.data = {};
            e.api(b, c.data, c.type, c.success, c.failure)
        } else DISQUS.once("loader.onDefaultChannelReady", function () {
            DISQUS.api(b, c)
        })
    };
    DISQUS.each(["bind", "once", "unbind", "unbindAll", "trigger"], function (b) {
        DISQUS[b] = function (c, e) {
            var d;
            c && (c = c.replace(".", "_"));
            switch (b) {
            case "bind":
                DISQUS.bean.add(DISQUS, c, e);
                break;
            case "once":
                d = function () {
                    DISQUS.unbind(c, d);
                    e.apply(this, arguments)
                };
                DISQUS.bind(c, d);
                break;
            case "unbind":
                DISQUS.bean.remove(DISQUS, c, e);
                break;
            case "unbindAll":
                DISQUS.bean.remove(DISQUS, c);
                break;
            case "trigger":
                DISQUS.bean.fire(DISQUS, c, [e])
            }
        }
    });
    DISQUS.contains = function (b, c) {
        if (b.length) {
            for (var e = 0, d = b.length; e < d; e++) if (b[e] == c) return !0;
            return !1
        }
        for (e in b) if (b.hasOwnProperty(e) && e == c) return !0;
        return !1
    };
    DISQUS.empty = function (b) {
        for (var c in b) if (b.hasOwnProperty(c)) return !1;
        return !0
    };
    DISQUS.extend = function () {
        var b, c;
        arguments.length <= 1 ? (b = DISQUS, c = [arguments[0] || {}]) : (b = arguments[0] || {}, c = Array.prototype.slice.call(arguments, 1));
        DISQUS.each(c, function (c) {
            DISQUS.each(c, function (c, d) {
                b[d] = c
            })
        });
        return b
    };
    DISQUS.getGuid = function () {
        return l++
    };
    DISQUS.partial = function () {
        var b = arguments[0],
            c = Array.prototype.slice.call(arguments, 1);
        return function () {
            for (var d = Array.prototype.slice.call(arguments), k = [], f = 0, h = c.length; f < h; f++) k.push(c[f] === j ? d.shift() : c[f]);
            for (; d.length > 0;) k.push(d.shift());
            return b.apply(this, k)
        }
    };
    DISQUS.sdk = function (b) {
        function c(c) {
            return function () {
                function d(f) {
                    c != f.name || b != f.version || (f.func.apply({}, e), DISQUS.unbind("loader.onSDKMethodReady", d))
                }
                var e = Array.prototype.slice.call(arguments);
                DISQUS.bind("loader.onSDKMethodReady", d)
            }
        }
        var d = f[b || "1.0"];
        DISQUS.assert(d !== j, "version is not supported.");
        if (!DISQUS.empty(d)) return d;
        d = DISQUS.settings.get("disqus.debug") ? "/js/src/sdk/" : "/build/system/sdk/";
        DISQUS.require(DISQUS.settings.get("disqus.urls.media") + d + b + ".js");
        return {
            getThread: c("getThread"),
            getSession: c("getSession")
        }
    };
    DISQUS.sdk.add = function (b, c, d) {
        DISQUS.assert(f[c] !== j, "version is not supported.");
        f[c][b] = d;
        DISQUS.trigger("loader.onSDKMethodReady", {
            name: b,
            version: c,
            func: d
        })
    };
    DISQUS.useSSL = function (b) {
        var c, e, f;
        if (d.location.href.match(/^https/)) if (b) {
            c = ["disqus_url", "realtime_url", "uploads_url"];
            for (f = 0; e = c[f]; f++) b[e] = b[e].replace(/^http/, "https");
            b.media_url = b.ssl_media_url
        } else {
            c = ["disqus.urls.main", "disqus.urls.realtime", "disqus.urls.uploads"];
            for (f = 0; e = c[f]; f++) DISQUS.settings.set(e, DISQUS.settings.get(e).replace(/^http/, "https"));
            DISQUS.settings.set("disqus.urls.media", DISQUS.settings.get("disqus.urls.sslMedia"))
        }
    };
    DISQUS.useSSL();
    DISQUS.ready = function (b) {
        function c() {
            var c = DISQUS.settings.get("disqus.urls.media"),
                b = c + "/js/src/embed/custom/",
                d = c + "/build/system/",
                f = DISQUS.settings.get("disqus.debug"),
                j = DISQUS.settings.get("disqus.urls.media"),
                h;
            DISQUS.status = "loading";
            f ? (h = c + "/styles/dtpl/defaults.css", c = [b + "strings.js", b + "dtpl.js", b + "actions.js", b + "validators.js", b + "utils.js", b + "db.js", b + "nodes.js", b + "sandbox.js", b + "tooltip.js", b + "comm.js", b + "ui.js", b + "sso.js", b + "compat.js", b + "facebook.js", b + "tracking.js", b + "juggler.js", d + "defaults.js", c + "/js/src/lib/easyxdm.js", c + "/js/src/json.js", c + "/js/src/sdk/1.0.js"], DISQUS.config.includeStacktrace && c.push(j + "/js/src/lib/stacktrace.js")) : (h = d + "/defaults.css", c = [d + "disqus.js"]);
            DISQUS.requireStylesheet(h);
            DISQUS.requireSet(c, f, function () {
                DISQUS.status = "ready";
                DISQUS.trigger("loader.onFilesReady")
            })
        }
        if (DISQUS.status == "ready") b();
        else DISQUS.once("loader.onFilesReady", function () {
            b()
        });
        DISQUS.status === null && c()
    };
    DISQUS.addBlocks = function (b, c) {
        if (c) return function () {
            var b = DISQUS.blocks;
            DISQUS.blocks = {};
            c();
            DISQUS.blocks = DISQUS.extend(b, {
                theme: DISQUS.blocks
            })
        }();
        var d = {
            Builder: DISQUS.strings.Builder,
            renderBlock: DISQUS.renderBlock,
            each: DISQUS.each,
            extend: DISQUS.extend,
            blocks: DISQUS.blocks[b || "defaults"],
            interpolate: DISQUS.strings.interpolate
        };
        return function (b) {
            b(d)
        }
    };
    DISQUS.renderBlock = function (b, c) {
        var d = b;
        typeof b === "string" && (d = DISQUS.getBlock(b));
        if (d === j) throw "Block " + b + " was not found!";
        return DISQUS.sandbox.wrap(b, d, c)
    };
    DISQUS.getBlock = function (b) {
        return DISQUS.blocks.theme[b] || DISQUS.blocks.defaults[b]
    };
    DISQUS.window = {
        getSize: function () {
            return typeof d.innerWidth == "number" ? [d.innerWidth, d.innerHeight] : h.documentElement ? [h.documentElement.clientWidth || h.body.clientWidth, h.documentElement.clientHeight || h.body.clientHeight] : [-1, -1]
        },
        getScrollPosition: function () {
            var b = h.documentElement;
            return b && (b.scrollTop || b.scrollWidth) ? [b.scrollWidth, b.scrollTop || h.body.scrollTop] : [h.body.scrollWidth, h.body.scrollTop]
        }
    }
});
(function (d) {
    function j(a) {
        a = a.relatedTarget;
        if (!a) return a === null;
        var b;
        if (b = a != this) if (b = a.prefix != "xul") if (b = !/document/.test(this.toString())) {
            var c;
            a: for (a = a.parentNode; a !== null;) {
                if (a == this) {
                    c = !0;
                    break a
                }
                a = a.parentNode
            }
            b = !c
        }
        return b
    }
    var h = 1,
        l = {},
        f = {},
        b = /over|out/,
        c = /[^\.]*(?=\..*)\.|.*/,
        e = /\..*/,
        k = ((d.document || {}).documentElement || {}).addEventListener,
        s = k ? "addEventListener" : "attachEvent",
        y = function (a, b) {
            return a.__uid = b || a.__uid || h++
        },
        r = function (a) {
            a = y(a);
            return l[a] = l[a] || {}
        },
        t = k ?
    function (a, b, c, d) {
        a[d ? "addEventListener" : "removeEventListener"](b, c, !1)
    } : function (a, b, c, d, i) {
        i && d && (a["_on" + i] = a["_on" + i] || 0);
        a[d ? "attachEvent" : "detachEvent"]("on" + b, c)
    }, o = function (a, b, c) {
        return function (g) {
            g = i(g || ((this.ownerDocument || this.document || this).parentWindow || d).event);
            return b.apply(a, [g].concat(c))
        }
    }, a = function (a, b, c, d, i) {
        return function (g) {
            if (d ? d.apply(this, arguments) : k || g && g.propertyName == "_on" + c || !g) b.apply(a, Array.prototype.slice.call(arguments, g ? 0 : 1).concat(i))
        }
    }, q = function (b, d, i, C) {
        var m = d.replace(e, ""),
            j = r(b),
            j = j[m] || (j[m] = {}),
            h = i,
            d = y(i, d.replace(c, ""));
        if (j[d]) return b;
        var n = p[m];
        n && (i = n.condition ? a(b, i, m, n.condition) : i, m = n.base || m);
        i = (n = g[m]) ? o(b, i, C) : a(b, i, m, !1, C);
        n = k || n;
        if (m == "unload") var B = i,
            i = function () {
                u(b, m, i) && B()
            };
        b[s] && t(b, n ? m : "propertychange", i, !0, !n && m);
        j[d] = i;
        i.__uid = d;
        i.__originalFn = h;
        return m == "unload" ? b : f[y(b)] = b
    }, u = function (a, b, d) {
        var m;
        var i, f, j = r(a),
            h = b.replace(e, "");
        if (!j || !j[h]) return a;
        m = (b = b.replace(c, "")) ? b.split(".") : [d.__uid], b = m;
        for (f = b.length; f--;) i = b[f], d = j[h][i], delete j[h][i], a[s] && (h = p[h] ? p[h].base : h, i = k || g[h], t(a, i ? h : "propertychange", d, !1, !i && h));
        return a
    }, v = function (a, b, c) {
        return function (d) {
            for (var i = typeof a == "string" ? c(a, this) : a, g = d.target; g && g != this; g = g.parentNode) for (var e = i.length; e--;) if (i[e] == g) return b.apply(g, arguments)
        }
    }, w = function (a, b, c, d, i) {
        if (typeof b == "object" && !c) for (var g in b) b.hasOwnProperty(g) && w(a, g, b[g]);
        else {
            g = typeof c == "string";
            for (var e = (g ? c : b).split(" "), c = g ? v(b, d, i) : c, f = e.length; f--;) q(a, e[f], c, Array.prototype.slice.call(arguments, g ? 4 : 3))
        }
        return a
    }, z = function (a, b, d) {
        var i, g, f, j = typeof b == "string",
            h = j && b.replace(c, ""),
            p = u,
            n = r(a);
        if (j && /\s/.test(b)) {
            b = b.split(" ");
            for (f = b.length - 1; z(a, b[f]) && f--;);
            return a
        }
        g = j ? b.replace(e, "") : b;
        if (!n || j && !n[g]) {
            if (n && h) for (i in n) if (n.hasOwnProperty(i)) for (f in n[i]) n[i].hasOwnProperty(f) && f === h && p(a, [i, h].join("."));
            return a
        }
        if (typeof d == "function") p(a, g, d);
        else if (h) p(a, b);
        else for (i in p = g ? p : z, b = j && g, g = g ? d || n[g] || g : n, g) g.hasOwnProperty(i) && (p(a, b || i, g[i]), delete g[i]);
        return a
    }, D = k ?
    function (a, b, c) {
        evt = document.createEvent(a ? "HTMLEvents" : "UIEvents");
        evt[a ? "initEvent" : "initUIEvent"](b, !0, !0, d, 1);
        c.dispatchEvent(evt)
    } : function (a, b, c) {
        a ? c.fireEvent("on" + b, document.createEventObject()) : c["_on" + b]++
    }, A = function (a, b, c) {
        var d = r(b),
            i;
        y(a);
        d = c ? d[c] : d;
        for (i in d) d.hasOwnProperty(i) && (c ? w : A)(a, c || b, c ? d[i].__originalFn : i);
        return a
    }, i = function (a) {
        var c = {};
        if (!a) return c;
        var d = a.type,
            g = a.target || a.srcElement;
        c.preventDefault = i.preventDefault(a);
        c.stopPropagation = i.stopPropagation(a);
        c.target = g && g.nodeType == 3 ? g.parentNode : g;
        if (~d.indexOf("key")) c.keyCode = a.which || a.keyCode;
        else if (/click|mouse|menu/i.test(d)) {
            c.rightClick = a.which == 3 || a.button == 2;
            c.pos = {
                x: 0,
                y: 0
            };
            if (a.pageX || a.pageY) c.clientX = a.pageX, c.clientY = a.pageY;
            else if (a.clientX || a.clientY) c.clientX = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, c.clientY = a.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            b.test(d) && (c.relatedTarget = a.relatedTarget || a[(d == "mouseover" ? "from" : "to") + "Element"])
        }
        for (var e in a) e in c || (c[e] = a[e]);
        return c
    };
    i.preventDefault = function (a) {
        return function () {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        }
    };
    i.stopPropagation = function (a) {
        return function () {
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        }
    };
    var g = {
        click: 1,
        dblclick: 1,
        mouseup: 1,
        mousedown: 1,
        contextmenu: 1,
        mousewheel: 1,
        DOMMouseScroll: 1,
        mouseover: 1,
        mouseout: 1,
        mousemove: 1,
        selectstart: 1,
        selectend: 1,
        keydown: 1,
        keypress: 1,
        keyup: 1,
        orientationchange: 1,
        touchstart: 1,
        touchmove: 1,
        touchend: 1,
        touchcancel: 1,
        gesturestart: 1,
        gesturechange: 1,
        gestureend: 1,
        focus: 1,
        blur: 1,
        change: 1,
        reset: 1,
        select: 1,
        submit: 1,
        load: 1,
        unload: 1,
        beforeunload: 1,
        resize: 1,
        move: 1,
        DOMContentLoaded: 1,
        readystatechange: 1,
        error: 1,
        abort: 1,
        scroll: 1
    },
        p = {
            mouseenter: {
                base: "mouseover",
                condition: j
            },
            mouseleave: {
                base: "mouseout",
                condition: j
            },
            mousewheel: {
                base: /Firefox/.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel"
            }
        },
        n = {
            add: w,
            remove: z,
            clone: A,
            fire: function (a, b, d) {
                var i, f, j = b.split(" ");
                for (f = j.length; f--;) {
                    var b = j[f].replace(e, ""),
                        h = g[b],
                        p = j[f].replace(c, ""),
                        n = r(a)[b];
                    if (p) {
                        p = p.split(".");
                        for (i = p.length; i--;) n && n[p[i]] && n[p[i]].apply(a, [!1].concat(d))
                    } else if (!d && a[s]) D(h, b, a);
                    else for (i in n) n.hasOwnProperty(i) && n[i].apply(a, [!1].concat(d))
                }
                return a
            }
        };
    d.attachEvent && w(d, "unload", function () {
        for (var a in f) if (f.hasOwnProperty(a)) {
            var b = z(f[a]).__uid;
            b && (delete f[b], delete l[b])
        }
        d.CollectGarbage && CollectGarbage()
    });
    var B = d.bean;
    n.noConflict = function () {
        d.bean = B;
        return this
    };
    d.bean = n
})(this);
(function (d, j) {
    function h() {
        this.c = {}
    }
    function l(a) {
        v = [];
        t = 0;
        for (z = a.length; t < z; t++) v[t] = a[t];
        return v
    }
    function f(a) {
        for (; a = a.previousSibling;) if (a.nodeType == 1) break;
        return a
    }
    function b(a, b, c, d, i, g, f, j, h, k, B) {
        var o, m;
        if (b && this.tagName.toLowerCase() !== b) return !1;
        if (c && (o = c.match(p)) && o[1] !== this.id) return !1;
        if (c && (A = c.match(n))) for (t = A.length; t--;) if (a = A[t].slice(1), !(E.g(a) || E.s(a, RegExp("(^|\\s+)" + a + "(\\s+|$)"))).test(this.className)) return !1;
        if (h && r.pseudos[h] && !r.pseudos[h](this, B)) return !1;
        if (d && !f) for (m in u = this.attributes, u) if (Object.prototype.hasOwnProperty.call(u, m) && (u[m].name || m) == i) return this;
        if (d && !e(g, this.getAttribute(i) || "", f)) return !1;
        return this
    }
    function c(a) {
        return H.g(a) || H.s(a, a.replace(P, "\\$1"))
    }
    function e(a, b, d) {
        switch (a) {
        case "=":
            return b == d;
        case "^=":
            return b.match(x.g("^=" + d) || x.s("^=" + d, RegExp("^" + c(d))));
        case "$=":
            return b.match(x.g("$=" + d) || x.s("$=" + d, RegExp(c(d) + "$")));
        case "*=":
            return b.match(x.g(d) || x.s(d, RegExp(c(d))));
        case "~=":
            return b.match(x.g("~=" + d) || x.s("~=" + d, RegExp("(?:^|\\s+)" + c(d) + "(?:\\s+|$)")));
        case "|=":
            return b.match(x.g("|=" + d) || x.s("|=" + d, RegExp("^" + c(d) + "(-|$)")))
        }
        return 0
    }
    function k(a) {
        var c = [],
            d = [],
            i, g = 0,
            e, f, h, p, n, m = I.g(a) || I.s(a, a.split(O)),
            a = a.match(N),
            m = m.slice(0);
        if (!m.length) return c;
        f = m.pop();
        p = m.length && (i = m[m.length - 1].match(B)) ? j.getElementById(i[1]) : j;
        if (!p) return c;
        n = f.match(G);
        e = a && /^[+~]$/.test(a[a.length - 1]) ?
        function (a) {
            for (; p = p.nextSibling;) p.nodeType == 1 && (n[1] ? n[1] == p.tagName.toLowerCase() : 1) && a.push(p);
            return a
        }([]) : p.getElementsByTagName(n[1] || "*");
        i = 0;
        for (f = e.length; i < f; i++) if (h = b.apply(e[i], n)) c[g++] = h;
        if (!m.length) return c;
        g = 0;
        f = c.length;
        for (e = 0; g < f; g++) {
            h = c[g];
            for (i = m.length; i--;) for (; h = Q[a[i]](h, c[g]);) if (D = b.apply(h, m[i].match(G))) break;
            D && (d[e++] = c[g])
        }
        return d
    }
    function s(a, b, c) {
        c = typeof b == "string" ? c(b)[0] : b || j;
        if (a === window || a && a.nodeType && (a.nodeType == 1 || a.nodeType == 9)) return !b || a !== window && c && c.nodeType && (c.nodeType == 1 || c.nodeType == 9) && J(a, c) ? [a] : [];
        if (a && typeof a === "object" && isFinite(a.length)) return l(a);
        if (q = a.match(B)) return (w = j.getElementById(q[1])) ? [w] : [];
        if (q = a.match(L)) return l(c.getElementsByTagName(q[1]));
        return !1
    }
    function y(a) {
        var b = [],
            c, d;
        c = 0;
        a: for (; c < a.length; c++) {
            for (d = 0; d < b.length; d++) if (b[d] == a[c]) continue a;
            b[b.length] = a[c]
        }
        return b
    }
    function r(a, b) {
        var c = typeof b == "string" ? r(b)[0] : b || j;
        if (!c || !a) return [];
        if (q = s(a, b, r)) return q;
        return R(a, c)
    }
    var t, o, a, q, u, v, w, z, D, A, i, g = j.documentElement,
        p = /#([\w\-]+)/,
        n = /\.[\w\-]+/g,
        B = /^#([\w\-]+$)/,
        K = /^\.([\w\-]+)$/,
        L = /^([\w\-]+)$/,
        M = /^([\w]+)?\.([\w\-]+)$/,
        C = /\s*([\s\+\~>])\s*/g,
        m = /[\s\>\+\~]/,
        F = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\])/,
        N = RegExp("(" + m.source + ")" + F.source, "g"),
        O = RegExp(m.source + F.source),
        P = /([.*+?\^=!:${}()|\[\]\/\\])/g,
        G = RegExp(/^([a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/.source + "(" + /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/.source + ")?(" + /:([\w\-]+)(\(['"]?(\w+)['"]?\))?/.source + ")?"),
        Q = {
            " ": function (a) {
                return a && a !== g && a.parentNode
            },
            ">": function (a, b) {
                return a && a.parentNode == b.parentNode && a.parentNode
            },
            "~": function (a) {
                return a && a.previousSibling
            },
            "+": function (a, b, c, d) {
                if (!a) return !1;
                c = f(a);
                d = f(b);
                return c && d && c == d && c
            }
        };
    h.prototype = {
        g: function (a) {
            return this.c[a] || void 0
        },
        s: function (a, b) {
            return this.c[a] = b
        }
    };
    var E = new h,
        H = new h,
        x = new h,
        I = new h,
        J = "compareDocumentPosition" in g ?
    function (a, b) {
        return (b.compareDocumentPosition(a) & 16) == 16
    } : "contains" in g ?
    function (a, b) {
        b = b == j || b == window ? g : b;
        return b !== a && b.contains(a)
    } : function (a, b) {
        for (; a = a.parentNode;) if (a === b) return 1;
        return 0
    }, R = j.querySelector && j.querySelectorAll ?
    function (a, b) {
        if (b.getElementsByClassName && (q = a.match(K))) return l(b.getElementsByClassName(q[1]));
        return l(b.querySelectorAll(a))
    } : function (b, c) {
        var b = b.replace(C, "$1"),
            d = [],
            g, e = [],
            f;
        if (q = b.match(M)) {
            i = c.getElementsByTagName(q[1] || "*");
            v = E.g(q[2]) || E.s(q[2], RegExp("(^|\\s+)" + q[2] + "(\\s+|$)"));
            f = 0;
            a = i.length;
            for (o = 0; f < a; f++) v.test(i[f].className) && (d[o++] = i[f]);
            return d
        }
        f = 0;
        i = b.split(",");
        for (a = i.length; f < a; f++) e[f] = k(i[f]);
        f = 0;
        for (a = e.length; f < a && (g = e[f]); f++) {
            var h = g;
            if (c !== j) {
                h = [];
                o = 0;
                for (q = g.length; o < q && (element = g[o]); o++) J(element, c) && h.push(element)
            }
            d = d.concat(h)
        }
        return y(d)
    };
    r.uniq = y;
    r.pseudos = {};
    var S = d.qwery;
    r.noConflict = function () {
        d.qwery = S;
        return this
    };
    d.qwery = r
})(this, document);
(function () {
    DISQUS.extend({
        bean: bean.noConflict(),
        qwery: qwery.noConflict(),
        throttle: function (d, j, h, l) {
            var f = (new Date).getTime();
            DISQUS.bean.add(d, j, function (b) {
                var c = (new Date).getTime();
                c - f >= l && (f = c, h(b))
            })
        },
        debounce: function (d, j, h, l) {
            function f(d) {
                b && clearTimeout(b);
                b = setTimeout(function () {
                    h(d, c)
                }, l)
            }
            var b, c;
            c = function () {
                DISQUS.bean.remove(d, j, f)
            };
            DISQUS.bean.add(d, j, f)
        }
    })
})();
DISQUS.modules = {};
DISQUS.addJob = DISQUS.defer;
DISQUS.getResourceURL = DISQUS.serialize;
DISQUS.lang = {
    contains: DISQUS.contains,
    forEach: DISQUS.each,
    extend: DISQUS.extend,
    trim: function (d) {
        for (var d = d.replace(/^\s\s*/, ""), j = /\s/, h = d.length; j.test(d.charAt(--h)););
        return d.slice(0, h + 1)
    },
    partial: DISQUS.partial
};
DISQUS.events = {
    add: DISQUS.bean.add,
    remove: DISQUS.bean.remove,
    debounce: DISQUS.debounce
};
DISQUS.browser = {
    ie: DISQUS.isBrowser("ie"),
    ie6: DISQUS.isBrowser("ie6"),
    ie7: DISQUS.isBrowser("ie7"),
    webkit: DISQUS.isBrowser("webkit"),
    opera: DISQUS.isBrowser("opera"),
    gecko: DISQUS.isBrowser("gecko"),
    mobile: DISQUS.isBrowser("mobile"),
    quirks: DISQUS.isBrowser("quirks")
};
DISQUS.define("ga", function (d) {
    var j, h = function (f) {
            j ? j(f) : d._gaq.push(f)
        },
        l = {
            component: 1,
            "package": 2,
            forum: 3,
            version: 4,
            userType: 5
        };
    return {
        setCaller: function (d) {
            j = d
        },
        setCustomVar: function (d, b) {
            h(["_setCustomVar", l[d], d, b])
        },
        trackPageview: function () {
            h(["_trackPageview"])
        },
        trackEvent: function (d, b, c) {
            h(["_trackEvent", b, d, c, 1])
        }
    }
});
(function (d) {
    function j(a, b) {
        return a.hasAttribute ? a.hasAttribute(b) : a.getAttribute(b) !== null
    }
    function h() {
        for (var a = 0, b = u.length; a < b; a++) if (j(u[a], "name") && u[a].getAttribute("name") == "generator" && j(u[a], "content") && u[a].getAttribute("content") == "blogger") return !0;
        a = o.getElementById("Attribution1");
        if (a != null && a.innerHTML.indexOf("http://www.blogger.com") > 0) return !0;
        return !1
    }
    function l() {
        var a;
        if (h()) {
            a = o.getElementsByTagName("A");
            for (var b = 0, c = a.length; b < c; b++) if (!j(a[b], "src") && j(a[b], "name") && parseInt(a[b].getAttribute("name"), 10) && a[b].innerHTML === "") return a[b].getAttribute("name")
        }
        return null
    }
    function f(a) {
        var b = 0,
            c = 0;
        if (!a.offsetParent) return [0, 0];
        do b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent;
        while (a);
        return [b, c]
    }
    function b(b) {
        var c = a.window.getScrollPosition()[1],
            d = c + a.window.getSize()[1];
        return b >= c && b <= d
    }
    function c(b) {
        if (!(typeof q != "function" && typeof b != "function")) {
            var c = {
                preData: "loader.onReady",
                preInit: "loader.onDataReady",
                onInit: "loader.onLibraryReady",
                afterRender: "loader.onTemplateReady",
                onReady: "thread.onReady",
                onPaginate: "thread.onPaginate",
                onNewComment: "comment.onCreate",
                preReset: "thread.beforeReset"
            };
            a.config.callbacks = {};
            a.config.page = {};
            a.each(c, function (b, c) {
                a.config.callbacks[c] = []
            });
            try {
                (b || q).call(a.config)
            } catch (d) {}
            a.each(a.config.callbacks, function (b, d) {
                b.length !== 0 && a.each(b, function (b) {
                    a.bind(c[d], b)
                })
            });
            a.config.callbacks = c
        }
    }
    function e() {
        var b = {
            url: "thread.url",
            title: "thread.title",
            slug: "thread.slug",
            category_id: "thread.category",
            identifier: "thread.identifier",
            remote_auth_s3: "request.sso.data",
            author_s3: "thread.author.sig",
            api_key: "forum.apiKey"
        };
        a.each({
            disqus_domain: "disqus.domain",
            disqus_category_id: "thread.category",
            disqus_thread_slug: "thread.slug",
            disqus_title: "thread.title",
            disqus_url: "thread.url",
            disqus_identifier: "thread.identifier",
            disqus_per_page: "thread.postsPerPage",
            disqus_require_moderation_s: "thread.moderatePosts",
            disqus_skip_auth: "thread.skipAuthRequest",
            disqus_def_email: "thread.defaults.email",
            disqus_def_name: "thread.defaults.name",
            disqus_default_text: "thread.defaults.placeholder",
            disqus_shortname: "forum.shortname",
            disqus_facebook_key: "forum.facebook.key",
            disqus_custom_strings: "ui.translations",
            disqus_container_id: "ui.container",
            DsqLocal: "legacy.trackbacks",
            disqus_remote_auth_s2: "legacy.sso.data",
            disqus_author_s2: "legacy.thread.author.sig"
        }, function (b, c) {
            d[c] != null && a.settings.set(b, d[c])
        });
        if (d.disqus_sort != null) a.settings.store_["thread.sort"] = d.disqus_sort;
        d.disqus_developer != null && a.settings.set("disqus.developer", !! d.disqus_developer);
        a.config && a.config.page && (a.config.page.remote_auth_s3 != null && a.settings.set("request.sso.data", a.config.page.remote_auth_s3), a.config.page.api_key != null && a.settings.set("forum.apiKey", a.config.page.api_key), a.each(b, function (b, c) {
            a.config.page[c] != null && a.settings.set(b, a.config.page[c])
        }))
    }
    function k() {
        var c = d.location.hash,
            g = a.settings.get,
            e = g("legacy.trackbacks", {});
        a.extend(a.config, {
            container_id: g("ui.container", "disqus_thread"),
            trackback_url: e.trackback_url || null,
            trackbacks: e.trackbacks || null,
            absorbStyles: !1
        });
        a.config.page = {
            url: g("thread.url", d.location.href),
            title: g("thread.title", ""),
            slug: g("thread.slug"),
            sort: g("thread.sort", ""),
            per_page: g("thread.postsPerPage", null),
            category_id: g("thread.category", ""),
            developer: +g("disqus.developer", 0),
            identifier: g("thread.identifier", ""),
            require_mod_s: g("thread.moderatePosts"),
            remote_auth_s3: g("request.sso.data"),
            author_s3: g("thread.author.sig"),
            api_key: g("forum.apiKey"),
            disqus_version: g("disqus.version"),
            remote_auth_s2: g("legacy.sso.data"),
            author_s2: g("legacy.thread.author.sig")
        };
        if (~c.search(/comment\-\d+/)) a.config.page.lazy = "0";
        else {
            var j, e = o.getElementById(a.config.container_id);
            j = f(e)[1];
            if (e && b(j)) a.config.page.lazy = "0"
        }
        if (h()) a.config.page.blogger_id = l(), a.config.page.url = a.config.page.url.replace(/\?.*$/, "");
        if (c && (c = c.match(/comment\-([0-9]+)/))) a.config.page.anchor_post_id = c[1];
        var k = d.disqus_callback;
        typeof k == "function" && a.bind("thread.onReady", function () {
            k(d.disqus_callback_params || null)
        });
        a.config.custom_strings = g("ui.translations", {});
        a.extend(a.config, {
            domain: g("disqus.domain"),
            shortname: g("forum.shortname") || a.getShortname(),
            facebook_key: g("forum.facebook.key", null),
            def_name: g("thread.defaults.name"),
            def_email: g("thread.defaults.email"),
            def_text: g("thread.defaults.placeholder", ""),
            skip_auth: g("thread.skipAuthRequest", !1)
        });
        g = a.config.shortname + "." + a.config.domain + "/thread.js";
        a.config.json_url = d.location.href.match(/^https/) ? "https://" + g : "http://" + g
    }
    function s(a) {
        return Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds())
    }

    function y() {
        a.bind("thread.onReady", function () {
            function c() {
                e && b(e) && a.trigger("comments.replyViewed");
                f && b(f) && a.trigger("thread.bottomViewed")
            }
            var g = o.getElementById("dsq-reply") || o.getElementById("dsq-new-post"),
                e = g ? a.nodes.getPosition(g)[1] + g.offsetHeight : null,
                g = o.getElementById("dsq-comments"),
                f = a.nodes.getPosition(g)[1] + g.offsetHeight;
            c();
            a.events.debounce(d, "scroll", c, 250);
            a.resettable = !0;
            a.trigger("thread.onResetReady")
        });
        a.bind("thread.onReady", function () {
            var b = a.comm.Default.recover(),
                c = s(new Date);
            b.log("load:start", A);
            b.log("load:length", c - A);
            try {
                d.jQuery && jQuery.ui ? b.log("jslib", "jqueryui:" + jQuery.ui.version) : d.jQuery ? b.log("jslib", "jquery:" + jQuery().jquery) : d.Prototype ? b.log("jslib", "prototype:" + Prototype.Version) : d.dojo ? b.log("jslib", "dojo:" + dojo.version.toString()) : d.MooTools ? b.log("jslib", "mootools:" + MooTools.version) : d.Ext ? b.log("jslib", "ext:" + Ext.version) : d.YUI ? b.log("jslib", "yui:" + YUI.version) : b.log("jslib", "none")
            } catch (e) {
                b.log("jslib", "error")
            }
            b.flushLog(null)
        });
        a.bind("loader.onTemplateReady", function () {
            var b = a.comm.Default.recover(),
                c = a.jsonData;
            c.context.switches.sigma && b.enable(c.context.sigma_chance);
            b.log("hit", 1);
            c.forum.id && b.addMeta("info:forum_id", c.forum.id);
            c.thread.id && b.addMeta("info:thread_id", c.thread.id);
            c.request.user_type && b.addMeta("info:user_type", c.request.user_type);
            c.request.user_id && b.addMeta("info:user_id", c.request.user_id)
        });
        a.once("thread.bottomViewed", function () {
            a.comm.Default.recover().log("viewed:comments", 1)
        });
        a.once("comments.replyViewed", function () {
            a.comm.Default.recover().log("viewed:comment_box", 1)
        })
    }
    function r() {
        function b(a, c, d, g, e, i) {
            return '<img width="' + a + '" height="' + c + '" alt="' + g + '" src="data:image/' + d + ";base64," + e + '"' + (i ? 'style="' + i + '"' : "") + "/>"
        }
        a.jsonData = {
            ready: !1
        };
        var c;
        a.require(a.config.json_url, a.config.page, !0, null, function () {
            c.innerHTML = 'There was a problem loading Disqus. For more information, please visit <a href="http://status.disqus.com">status.disqus.com</a>.'
        });
        var d = a.qwery("#dsq-content")[0] || o.createElement("div");
        d.id = "dsq-content";
        d.style.display = "none";
        c = a.qwery("#dsq-content-stub")[0] || o.createElement("div");
        c.id = "dsq-content-stub";
        c.innerHTML = a.browser.ie6 ? "..." : b(71, 17, "png", "DISQUS", z.join("")) + b(16, 11, "gif", "...", D.join(""), "margin:0 0 3px 5px");
        var e = a.qwery("#" + a.config.container_id)[0];
        e.appendChild(d);
        e.appendChild(c);
        y();
        a.ready(function () {
            a.initThread(function () {
                c.style.display = "none"
            })
        })
    }
    function t(b) {
        function c() {
            a.trigger("loader.onDefaultChannelReady")
        }
        var e = o.getElementById("dsq-content"),
            f = a.settings.get("disqus.urls.media"),
            h = f + "/build/system/",
            j = f + "/build/lang/",
            k = a.jsonData.forum.template.css,
            l = a.jsonData.forum.template.url,
            C = a.jsonData.context.switches,
            m = a.settings.get("disqus.debug"),
            q = a.settings.get("disqus.preview");
        a.trigger("loader.onDataReady");
        if (a.browser.mobile && !a.jsonData.forum.mobile_theme_disabled) k = a.jsonData.forum.template.mobile.css, l = a.jsonData.forum.template.mobile.url, a.states.isMobile = !0;
        else if (q) k = q.styles, l = q.source;
        !d.disqus_no_style && k && a.requireStylesheet(k, {}, m);
        k = a.jsonData.forum.stylesUrl;
        if (!a.jsonData.context.switches.static_styles || m) k = "http://" + a.config.domain + "/forums/" + a.config.shortname + "/styles.css";
        a.jsonData.forum.hasCustomStyles && a.requireStylesheet(k, {
            u: a.jsonData.forum.lastUpdate
        });
        l = [l];
        C.new_toolbar && (l.push(h + "/defaults.toolbar.js"), a.requireStylesheet(m ? f + "/styles/dtpl/defaults.toolbar.css" : h + "/defaults.toolbar.css", {}, m));~d.location.search.indexOf("fb_xd_fragment") ? a.require("http://connect.facebook.net/en_US/all.js") : (a.config.language ? a.config.language != "en" && l.push(j + a.config.language + ".js") : a.jsonData.forum.language != "en" && l.push(j + a.jsonData.forum.language + ".js"), a.comm.Default.recover() || a.comm.Default.create(c).setApiKey(a.jsonData.forum.apiKey), a.requireSet(l, m, function () {
            a.config.custom_strings && a.lang.extend(a.strings.translations, a.config.custom_strings);
            if (a.config.def_text === "") a.config.def_text = a.strings.get("Type your comment here.");
            a.registerActions();
            a.trigger("loader.onActionsReady");
            a.nodes.addClass(e, "clearfix");
            var c = e.parentNode;
            c.removeChild(e);
            e.innerHTML = a.renderBlock("thread");
            c.appendChild(e);
            a.trigger("loader.onLibraryReady");
            a.dtpl.actions.fire("thread.initialize");
            a.trigger("loader.onTemplateReady");
            a.bean.add(e, "click change", function (b) {
                for (var c = b.target, d; c && c != e;) {
                    if (d = a.dtpl.getAction(c, b)) {
                        b.preventDefault();
                        d();
                        break
                    }
                    c = c.parentNode
                }
            });
            a.nodes.container = a.nodes.get("#dsq-content");
            e.style.display = "block";
            b();
            a.config.page.anchor_post_id && a.nodes.scrollTo("#dsq-comment-" + a.config.page.anchor_post_id);
            a.dtpl.actions.fire("thread.ready")
        }))
    }
    var o = d.document,
        a = d.DISQUS,
        q = d.disqus_config;
    a.qwery("head")[0] || a.qwery("#disqus_thread");
    var u = a.qwery("meta"),
        v = !1,
        w = [],
        z = ["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", "TkSuQmCC"],
        D = ["R0lGODlhEAALAPQAAP///z2LqeLt8dvp7u7090GNqz2LqV+fuJ/F1IW2ycrf51aatHWs", "waXJ14i4ys3h6FmctUCMqniuw+vz9eHs8fb5+meku+Tu8vT4+cfd5bbT3tbm7PH2+AAA", "AAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQu", "aW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27if", "DgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeR", "vsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjoth", "LOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh", "+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+", "YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY", "5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAs", "AAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00k", "j5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpy", "HCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAA", "BS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7", "AAAAAAAAAAAA"];
    a.settings.add("disqus.developer", {
        type: "bool"
    }).add("disqus.preview", {
        type: "obj",
        rule: function (a) {
            return a != null && typeof a.source == "string" && typeof a.styles == "string"
        }
    }).add("thread.category", {
        type: ["str", "int"]
    }).add("thread.slug", {
        type: "str"
    }).add("thread.title", {
        type: "str"
    }).add("thread.url", {
        type: "str"
    }).add("thread.identifier", {
        type: ["str", "int"]
    }).add("thread.postsPerPage", {
        type: ["str", "int"]
    }).add("thread.moderatePosts", {
        type: "str",
        values: ["all", "none", "anon"]
    }).add("thread.skipAuthRequest", {
        type: "bool"
    }).add("thread.sort", {
        type: "str",
        values: {
            oldest: 1,
            newest: 2,
            best: 3,
            hot: 4,
            highlighted: 5
        }
    }).add("thread.defaults.name", {
        type: "str"
    }).add("thread.defaults.email", {
        type: "str"
    }).add("thread.defaults.placeholder", {
        type: "str"
    }).add("thread.author.sig", {
        type: "str"
    }).add("forum.shortname", {
        type: "str"
    }).add("forum.apiKey", {
        type: "str"
    }).add("forum.facebook.key", {
        type: "str"
    }).add("ui.translations", {
        type: "obj"
    }).add("ui.container", {
        type: "str"
    }).add("request.sso.data", {
        type: "str"
    }).add("legacy.trackbacks", {
        type: "obj"
    }).add("legacy.thread.author.sig", {
        type: "str"
    }).add("legacy.sso.data", {
        type: "str"
    }).add("realtime.host", {
        type: "str"
    }).add("realtime.port", {
        type: "int"
    });
    var A = s(new Date);
    a.extend({
        cache: {
            postboxBusy: {},
            buttonsToRestore: [],
            popupProfileCache: {},
            popupStatusCache: {},
            toggledReplies: {},
            postSharing: {},
            realtime: {
                interval: null,
                ongoing_request: null,
                prev_script: null,
                last_checked: null,
                newPosts: []
            }
        },
        states: {
            edit: {},
            realtime: !1,
            noThirdPartyCookies: null,
            useLoginWindow: !1,
            loginDisabled: !1,
            metaViewport: function () {
                for (var a = 0, b = u.length; a < b; a++) if (u[a].getAttribute("name") == "viewport") return !0;
                return !1
            }(),
            isMobile: !1
        },
        curPageId: "dsq-comments",
        frames: {},
        config: {
            template: null
        },
        jsonData: null,
        isReady: !1,
        getShortname: function () {
            function a(b) {
                var b = b.getAttribute ? b.getAttribute("src") : b.src,
                    c = [/https?:\/\/(www\.)?disqus\.com\/forums\/([\w_\-]+)/i, /https?:\/\/(www\.)?([\w_\-]+)\.disqus\.com/i, /https?:\/\/(www\.)?dev\.disqus\.org\/forums\/([\w_\-]+)/i, /https?:\/\/(www\.)?([\w_\-]+)\.dev\.disqus\.org/i],
                    d = c.length;
                if (!b || b.substring(b.length - 8) != "embed.js") return null;
                for (var e = 0; e < d; e++) {
                    var g = b.match(c[e]);
                    if (g && g.length && g.length == 3) return g[2]
                }
                return null
            }
            for (var b = o.getElementsByTagName("script"), c = b.length - 1; c >= 0; c--) {
                var d = a(b[c]);
                if (d !== null) return d
            }
            return null
        },
        callback: function (b) {
            var c = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
            a.trigger(b, {
                args: c
            })
        },
        reset: function (b) {
            w.push(b);
            a.defer(function () {
                return a.resettable
            }, function () {
                var b = a.nodes.get("#" + a.config.container_id),
                    d = w.pop();
                if (d) w = [], a.comm.reset(!0), a.jsonData = null, a.sandbox.invalidateGlobals(), a.resettable = !1, a.config.page = {}, b.innerHTML = "", a.trigger("thread.beforeReset"), a.unbindAll(), d.reload && (c(d.config), e(), k(), r())
            })
        },
        updatePost: function (b, c) {
            var d = a.jsonData.posts[b] || {};
            if (c) c.id = b, a.jsonData.posts[b] = a.extend(d, c), a.trigger("data.onPostUpdate", {
                id: b,
                data: c
            })
        },
        reload: function (b) {
            a.require(a.config.json_url, a.config.page, !0, function () {
                v = !0;
                typeof b == "function" && b()
            })
        },
        redraw: function (b) {
            if (v || b) a.sandbox.invalidateGlobals(), b = a.nodes.get("#dsq-content"), b.innerHTML = a.renderBlock("thread"), a.frames = [], a.dtpl.actions.fire("thread.initialize"), v = !1
        },
        initThread: function (b) {
            function c(a) {
                var b = d.onload;
                d.onload = typeof d.onload != "function" ? a : function () {
                    b && b();
                    a()
                }
            }
            function e() {
                var b, c;
                if (a.isReady) {
                    if (h && clearInterval(h), o.getElementById(a.settings.get("ui.container")), b = o.getElementsByTagName("iframe"), c = o.getElementById("dsq-content")) for (var f = 0, g = b.length; f < g; f++) b[f].style.width = c.offsetWidth
                } else h || (h = d.setInterval(e, 500))
            }
            var f, h;
            a.browser.ie && a.config.frame_theme !== "cnn2" && c(e);
            a.trigger("loader.onReady");
            f = o.getElementById("dsq-content") || o.createElement("div");
            f.id = "dsq-content";
            f.style.display = "none";
            o.getElementById(a.config.container_id).appendChild(f);
            a.container = o.getElementById("dsq-content");
            try {
                a.browser.ie6 && o.execCommand("BackgroundImageCache", !1, !0)
            } catch (j) {}
            a.config.page.lazy = "0";
            var k = a.partial(t, b),
                l = a.partial(a.require, a.config.json_url, a.config.page, !0, k);
            if (a.jsonData == null) return void l();
            a.defer(function () {
                var b = a.jsonData;
                return b && (b.ready || b.lazy)
            }, function () {
                if (a.jsonData.ready) return void k();
                a.once("thread.topViewed", function () {
                    l()
                })
            })
        }
    });
    c();
    e();
    k();
    r();
    (function () {
        function c(d, h) {
            var i = f(e)[1];
            if (e && b(i)) return a.ready(function () {
                a.trigger("thread.topViewed")
            }), typeof h == "function" ? h() : !0;
            return !1
        }
        var e = o.getElementById(a.config.container_id);
        c() || a.events.debounce(d, "scroll", c, 250)
    })()
})(this);