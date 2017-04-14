/**
 * Created by Administrator on 2016/10/20.
 */
/*
 Highcharts JS v5.0.0 (2016-09-29)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
 */
(function(K, a) {
    "object" === typeof module && module.exports ? module.exports = K.document ? a(K) : a : K.Highcharts = a(K)
})("undefined" !== typeof window ? window : this, function(K) {
    K = function() {
        var a = window,
            A = a.document,
            y = a.navigator && a.navigator.userAgent || "",
            E = A && A.createElementNS && !! A.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            G = /(edge|msie|trident)/i.test(y) && !window.opera,
            t = !E,
            g = /Firefox/.test(y),
            d = g && 4 > parseInt(y.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "5.0.0",
            deg2rad: 2 * Math.PI / 360,
            doc: A,
            hasBidiBug: d,
            isMS: G,
            isWebKit: /AppleWebKit/.test(y),
            isFirefox: g,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(y),
            SVG_NS: "http://www.w3.org/2000/svg",
            idCounter: 0,
            chartCount: 0,
            seriesTypes: {},
            svg: E,
            vml: t,
            win: a,
            charts: [],
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {}
        }
    }();
    (function(a) {
        var A = [],
            y = a.charts,
            E = a.doc,
            G = a.win;
        a.error = function(a, g) {
            var d = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
            if (g) throw Error(d);
            G.console && console.log(d)
        };
        a.Fx = function(a, g, d) {
            this.options = g;
            this.elem = a;
            this.prop = d
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    g = this.paths[1],
                    d = [],
                    m = this.now,
                    r = a.length,
                    n;
                if (1 === m) d = this.toD;
                else if (r === g.length && 1 > m) for (; r--;) n = parseFloat(a[r]), d[r] = isNaN(n) ? a[r] : m * parseFloat(g[r] - n) + n;
                else d = g;
                this.elem.attr("d", d)
            },
            update: function() {
                var a = this.elem,
                    g = this.prop,
                    d = this.now,
                    m = this.options.step;
                if (this[g + "Setter"]) this[g + "Setter"]();
                else a.attr ? a.element && a.attr(g, d) : a.style[g] = d + this.unit;
                m && m.call(a, d, this)
            },
            run: function(a, g, d) {
                var m = this,
                    r = function(a) {
                        return r.stopped ? !1 : m.step(a)
                    },
                    n;
                this.startTime = +new Date;
                this.start = a;
                this.end = g;
                this.unit = d;
                this.now = this.start;
                this.pos = 0;
                r.elem = this.elem;
                r() && 1 === A.push(r) && (r.timerId = setInterval(function() {
                    for (n = 0; n < A.length; n++) A[n]() || A.splice(n--, 1);
                    A.length || clearInterval(r.timerId)
                }, 13))
            },
            step: function(a) {
                var g = +new Date,
                    d, m = this.options;
                d = this.elem;
                var r = m.complete,
                    n = m.duration,
                    p = m.curAnim,
                    b;
                if (d.attr && !d.element) d = !1;
                else if (a || g >= n + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = p[this.prop] = !0;
                    for (b in p)!0 !== p[b] && (a = !1);
                    a && r && r.call(d);
                    d = !1
                } else this.pos = m.easing((g - this.startTime) / n), this.now = this.start + (this.end - this.start) * this.pos, this.update(), d = !0;
                return d
            },
            initPath: function(t, g, d) {
                function m(a) {
                    for (l = a.length; l--;)"M" !== a[l] && "L" !== a[l] || a.splice(l + 1, 0, a[l + 1], a[l + 2], a[l + 1], a[l + 2])
                }
                function r(a, f) {
                    for (; a.length < e;) {
                        a[0] = f[e - a.length];
                        var c = a.slice(0, B);
                        [].splice.apply(a, [0, 0].concat(c));
                        q && (c = a.slice(a.length - B), [].splice.apply(a, [a.length, 0].concat(c)), l--)
                    }
                    a[0] = "M"
                }
                function n(a, f) {
                    for (var b = (e - a.length) / B; 0 < b && b--;) c = a.slice().splice(a.length / h - B, B * h), c[0] = f[e - B - b * B], v && (c[B - 6] = c[B - 2], c[B - 5] = c[B - 1]), [].splice.apply(a, [a.length / h, 0].concat(c)), q && b--
                }
                g = g || "";
                var p, b = t.startX,
                    k = t.endX,
                    v = -1 < g.indexOf("C"),
                    B = v ? 7 : 3,
                    e, c, l;
                g = g.split(" ");
                d = d.slice();
                var q = t.isArea,
                    h = q ? 2 : 1,
                    f;
                v && (m(g), m(d));
                if (b && k) {
                    for (l = 0; l < b.length; l++) if (b[l] === k[0]) {
                        p = l;
                        break
                    } else if (b[0] === k[k.length - b.length + l]) {
                        p = l;
                        f = !0;
                        break
                    }
                    void 0 === p && (g = [])
                }
                g.length && a.isNumber(p) && (e = d.length + p * h * B, f ? (r(g, d), n(d, g)) : (r(d, g), n(g, d)));
                return [g, d]
            }
        };
        a.extend = function(a, g) {
            var d;
            a || (a = {});
            for (d in g) a[d] = g[d];
            return a
        };
        a.merge = function() {
            var t, g = arguments,
                d, m = {},
                r = function(n, d) {
                    var b, k;
                    "object" !== typeof n && (n = {});
                    for (k in d) d.hasOwnProperty(k) && (b = d[k], a.isObject(b, !0) && "renderTo" !== k && "number" !== typeof b.nodeType ? n[k] = r(n[k] || {}, b) : n[k] = d[k]);
                    return n
                };
            !0 === g[0] && (m = g[1], g = Array.prototype.slice.call(g, 2));
            d = g.length;
            for (t = 0; t < d; t++) m = r(m, g[t]);
            return m
        };
        a.pInt = function(a, g) {
            return parseInt(a, g || 10)
        };
        a.isString = function(a) {
            return "string" === typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(t, g) {
            return t && "object" === typeof t && (!g || !a.isArray(t))
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function(a, g) {
            for (var d = a.length; d--;) if (a[d] === g) {
                a.splice(d, 1);
                break
            }
        };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(t, g, d) {
            var m, r;
            if (a.isString(g)) a.defined(d) ? t.setAttribute(g, d) : t && t.getAttribute && (r = t.getAttribute(g));
            else if (a.defined(g) && a.isObject(g)) for (m in g) t.setAttribute(m, g[m]);
            return r
        };
        a.splat = function(t) {
            return a.isArray(t) ? t : [t]
        };
        a.syncTimeout = function(a, g, d) {
            if (g) return setTimeout(a, g, d);
            a.call(0, d)
        };
        a.pick = function() {
            var a = arguments,
                g, d, m = a.length;
            for (g = 0; g < m; g++) if (d = a[g], void 0 !== d && null !== d) return d
        };
        a.css = function(t, g) {
            a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity=" + 100 * g.opacity + ")");
            a.extend(t.style, g)
        };
        a.createElement = function(t, g, d, m, r) {
            t = E.createElement(t);
            var n = a.css;
            g && a.extend(t, g);
            r && n(t, {
                padding: 0,
                border: "none",
                margin: 0
            });
            d && n(t, d);
            m && m.appendChild(t);
            return t
        };
        a.extendClass = function(t, g) {
            var d = function() {};
            d.prototype = new t;
            a.extend(d.prototype, g);
            return d
        };
        a.pad = function(a, g, d) {
            return Array((g || 2) + 1 - String(a).length).join(d || 0) + a
        };
        a.relativeLength = function(a, g) {
            return /%$/.test(a) ? g * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function(a, g, d) {
            var m = a[g];
            a[g] = function() {
                var a = Array.prototype.slice.call(arguments);
                a.unshift(m);
                return d.apply(this, a)
            }
        };
        a.getTZOffset = function(t) {
            var g = a.Date;
            return 6E4 * (g.hcGetTimezoneOffset && g.hcGetTimezoneOffset(t) || g.hcTimezoneOffset || 0)
        };
        a.dateFormat = function(t, g, d) {
            if (!a.defined(g) || isNaN(g)) return a.defaultOptions.lang.invalidDate || "";
            t = a.pick(t, "%Y-%m-%d %H:%M:%S");
            var m = a.Date,
                r = new m(g - a.getTZOffset(g)),
                n, p = r[m.hcGetHours](),
                b = r[m.hcGetDay](),
                k = r[m.hcGetDate](),
                v = r[m.hcGetMonth](),
                B = r[m.hcGetFullYear](),
                e = a.defaultOptions.lang,
                c = e.weekdays,
                l = e.shortWeekdays,
                q = a.pad,
                m = a.extend({
                    a: l ? l[b] : c[b].substr(0, 3),
                    A: c[b],
                    d: q(k),
                    e: q(k, 2, " "),
                    w: b,
                    b: e.shortMonths[v],
                    B: e.months[v],
                    m: q(v + 1),
                    y: B.toString().substr(2, 2),
                    Y: B,
                    H: q(p),
                    k: p,
                    I: q(p % 12 || 12),
                    l: p % 12 || 12,
                    M: q(r[m.hcGetMinutes]()),
                    p: 12 > p ? "AM" : "PM",
                    P: 12 > p ? "am" : "pm",
                    S: q(r.getSeconds()),
                    L: q(Math.round(g % 1E3), 3)
                }, a.dateFormats);
            for (n in m) for (; - 1 !== t.indexOf("%" + n);) t = t.replace("%" + n, "function" === typeof m[n] ? m[n](g) : m[n]);
            return d ? t.substr(0, 1).toUpperCase() + t.substr(1) : t
        };
        a.formatSingle = function(t, g) {
            var d = /\.([0-9])/,
                m = a.defaultOptions.lang;
            /f$/.test(t) ? (d = (d = t.match(d)) ? d[1] : -1, null !== g && (g = a.numberFormat(g, d, m.decimalPoint, -1 < t.indexOf(",") ? m.thousandsSep : ""))) : g = a.dateFormat(t, g);
            return g
        };
        a.format = function(t, g) {
            for (var d = "{", m = !1, r, n, p, b, k = [], v; t;) {
                d = t.indexOf(d);
                if (-1 === d) break;
                r = t.slice(0, d);
                if (m) {
                    r = r.split(":");
                    n = r.shift().split(".");
                    b = n.length;
                    v = g;
                    for (p = 0; p < b; p++) v = v[n[p]];
                    r.length && (v = a.formatSingle(r.join(":"), v));
                    k.push(v)
                } else k.push(r);
                t = t.slice(d + 1);
                d = (m = !m) ? "}" : "{"
            }
            k.push(t);
            return k.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(t, g, d, m, r) {
            var n, p = t;
            d = a.pick(d, 1);
            n = t / d;
            g || (g = [1, 2, 2.5, 5, 10], !1 === m && (1 === d ? g = [1, 2, 5, 10] : .1 >= d && (g = [1 / d])));
            for (m = 0; m < g.length && !(p = g[m], r && p * d >= t || !r && n <= (g[m] + (g[m + 1] || g[m])) / 2); m++);
            return p * d
        };
        a.stableSort = function(a, g) {
            var d = a.length,
                m, r;
            for (r = 0; r < d; r++) a[r].safeI = r;
            a.sort(function(a, d) {
                m = g(a, d);
                return 0 === m ? a.safeI - d.safeI : m
            });
            for (r = 0; r < d; r++) delete a[r].safeI
        };
        a.arrayMin = function(a) {
            for (var g = a.length, d = a[0]; g--;) a[g] < d && (d = a[g]);
            return d
        };
        a.arrayMax = function(a) {
            for (var g = a.length, d = a[0]; g--;) a[g] > d && (d = a[g]);
            return d
        };
        a.destroyObjectProperties = function(a, g) {
            for (var d in a) a[d] && a[d] !== g && a[d].destroy && a[d].destroy(), delete a[d]
        };
        a.discardElement = function(t) {
            var g = a.garbageBin;
            g || (g = a.createElement("div"));
            t && g.appendChild(t);
            g.innerHTML = ""
        };
        a.correctFloat = function(a, g) {
            return parseFloat(a.toPrecision(g || 14))
        };
        a.setAnimation = function(t, g) {
            g.renderer.globalAnimation = a.pick(t, g.options.chart.animation, !0)
        };
        a.animObject = function(t) {
            return a.isObject(t) ? a.merge(t) : {
                duration: t ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(t, g, d, m) {
            t = +t || 0;
            g = +g;
            var r = a.defaultOptions.lang,
                n = (t.toString().split(".")[1] || "").length,
                p, b, k = Math.abs(t); - 1 === g ? g = Math.min(n, 20) : a.isNumber(g) || (g = 2);
            p = String(a.pInt(k.toFixed(g)));
            b = 3 < p.length ? p.length % 3 : 0;
            d = a.pick(d, r.decimalPoint);
            m = a.pick(m, r.thousandsSep);
            t = (0 > t ? "-" : "") + (b ? p.substr(0, b) + m : "");
            t += p.substr(b).replace(/(\d{3})(?=\d)/g, "$1" + m);
            g && (m = Math.abs(k - p + Math.pow(10, -Math.max(g, n) - 1)), t += d + m.toFixed(g).slice(2));
            return t
        };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function(t, g) {
            var d;
            return "width" === g ? Math.min(t.offsetWidth, t.scrollWidth) - a.getStyle(t, "padding-left") - a.getStyle(t, "padding-right") : "height" === g ? Math.min(t.offsetHeight, t.scrollHeight) - a.getStyle(t, "padding-top") - a.getStyle(t, "padding-bottom") : (d = G.getComputedStyle(t, void 0)) && a.pInt(d.getPropertyValue(g))
        };
        a.inArray = function(a, g) {
            return g.indexOf ? g.indexOf(a) : [].indexOf.call(g, a)
        };
        a.grep = function(a, g) {
            return [].filter.call(a, g)
        };
        a.map = function(a, g) {
            for (var d = [], m = 0, r = a.length; m < r; m++) d[m] = g.call(a[m], a[m], m, a);
            return d
        };
        a.offset = function(a) {
            var g = E.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (G.pageYOffset || g.scrollTop) - (g.clientTop || 0),
                left: a.left + (G.pageXOffset || g.scrollLeft) - (g.clientLeft || 0)
            }
        };
        a.stop = function(a) {
            for (var g = A.length; g--;) A[g].elem === a && (A[g].stopped = !0)
        };
        a.each = function(a, g, d) {
            return Array.prototype.forEach.call(a, g, d)
        };
        a.addEvent = function(a, g, d) {
            function m(n) {
                n.target = n.srcElement || G;
                d.call(a, n)
            }
            var r = a.hcEvents = a.hcEvents || {};
            a.addEventListener ? a.addEventListener(g, d, !1) : a.attachEvent && (a.hcEventsIE || (a.hcEventsIE = {}), a.hcEventsIE[d.toString()] = m, a.attachEvent("on" + g, m));
            r[g] || (r[g] = []);
            r[g].push(d)
        };
        a.removeEvent = function(t, g, d) {
            function m(a, b) {
                t.removeEventListener ? t.removeEventListener(a, b, !1) : t.attachEvent && (b = t.hcEventsIE[b.toString()], t.detachEvent("on" + a, b))
            }
            function r() {
                var a, b;
                if (t.nodeName) for (b in g ? (a = {}, a[g] = !0) : a = p, a) if (p[b]) for (a = p[b].length; a--;) m(b, p[b][a])
            }
            var n, p = t.hcEvents,
                b;
            p && (g ? (n = p[g] || [], d ? (b = a.inArray(d, n), -1 < b && (n.splice(b, 1), p[g] = n), m(g, d)) : (r(), p[g] = [])) : (r(), t.hcEvents = {}))
        };
        a.fireEvent = function(t, g, d, m) {
            var r;
            r = t.hcEvents;
            var n, p;
            d = d || {};
            if (E.createEvent && (t.dispatchEvent || t.fireEvent)) r = E.createEvent("Events"), r.initEvent(g, !0, !0), a.extend(r, d), t.dispatchEvent ? t.dispatchEvent(r) : t.fireEvent(g, r);
            else if (r) for (r = r[g] || [], n = r.length, d.target || a.extend(d, {
                preventDefault: function() {
                    d.defaultPrevented = !0
                },
                target: t,
                type: g
            }), g = 0; g < n; g++)(p = r[g]) && !1 === p.call(t, d) && d.preventDefault();
            m && !d.defaultPrevented && m(d)
        };
        a.animate = function(t, g, d) {
            var m, r = "",
                n, p, b;
            a.isObject(d) || (m = arguments, d = {
                duration: m[2],
                easing: m[3],
                complete: m[4]
            });
            a.isNumber(d.duration) || (d.duration = 400);
            d.easing = "function" === typeof d.easing ? d.easing : Math[d.easing] || Math.easeInOutSine;
            d.curAnim = a.merge(g);
            for (b in g) p = new a.Fx(t, d, b), n = null, "d" === b ? (p.paths = p.initPath(t, t.d, g.d), p.toD = g.d, m = 0, n = 1) : t.attr ? m = t.attr(b) : (m = parseFloat(a.getStyle(t, b)) || 0, "opacity" !== b && (r = "px")), n || (n = g[b]), n.match && n.match("px") && (n = n.replace(/px/g, "")), p.run(m, n, r)
        };
        a.seriesType = function(t, g, d, m, r) {
            var n = a.getOptions(),
                p = a.seriesTypes;
            n.plotOptions[t] = a.merge(n.plotOptions[g], d);
            p[t] = a.extendClass(p[g] ||
                function() {}, m);
            p[t].prototype.type = t;
            r && (p[t].prototype.pointClass = a.extendClass(a.Point, r));
            return p[t]
        };
        G.jQuery && (G.jQuery.fn.highcharts = function() {
            var t = [].slice.call(arguments);
            if (this[0]) return t[0] ? (new(a[a.isString(t[0]) ? t.shift() : "Chart"])(this[0], t[0], t[1]), this) : y[a.attr(this[0], "data-highcharts-chart")]
        });
        E && !E.defaultView && (a.getStyle = function(t, g) {
            var d;
            d = {
                width: "clientWidth",
                height: "clientHeight"
            }[g];
            if (t.style[g]) return a.pInt(t.style[g]);
            "opacity" === g && (g = "filter");
            if (d) return t.style.zoom = 1, Math.max(t[d] - 2 * a.getStyle(t, "padding"), 0);
            d = t.currentStyle[g.replace(/\-(\w)/g, function(a, d) {
                return d.toUpperCase()
            })];
            "filter" === g && (d = d.replace(/alpha\(opacity=([0-9]+)\)/, function(a, d) {
                return d / 100
            }));
            return "" === d ? 1 : a.pInt(d)
        });
        Array.prototype.forEach || (a.each = function(a, g, d) {
            for (var m = 0, r = a.length; m < r; m++) if (!1 === g.call(d, a[m], m, a)) return m
        });
        Array.prototype.indexOf || (a.inArray = function(a, g) {
            var d, m = 0;
            if (g) for (d = g.length; m < d; m++) if (g[m] === a) return m;
            return -1
        });
        Array.prototype.filter || (a.grep = function(a, g) {
            for (var d = [], m = 0, r = a.length; m < r; m++) g(a[m], m) && d.push(a[m]);
            return d
        })
    })(K);
    (function(a) {
        var A = a.each,
            y = a.isNumber,
            E = a.map,
            G = a.merge,
            t = a.pInt;
        a.Color = function(g) {
            if (!(this instanceof a.Color)) return new a.Color(g);
            this.init(g)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [t(a[1]), t(a[2]), t(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                parse: function(a) {
                    return [t(a[1], 16), t(a[2], 16), t(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [t(a[1]), t(a[2]), t(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(g) {
                var d, m, r, n;
                if ((this.input = g = this.names[g] || g) && g.stops) this.stops = E(g.stops, function(d) {
                    return new a.Color(d[1])
                });
                else for (r = this.parsers.length; r-- && !m;) n = this.parsers[r], (d = n.regex.exec(g)) && (m = n.parse(d));
                this.rgba = m || []
            },
            get: function(a) {
                var d = this.input,
                    m = this.rgba,
                    r;
                this.stops ? (r = G(d), r.stops = [].concat(r.stops), A(this.stops, function(d, p) {
                    r.stops[p] = [r.stops[p][0], d.get(a)]
                })) : r = m && y(m[0]) ? "rgb" === a || !a && 1 === m[3] ? "rgb(" + m[0] + "," + m[1] + "," + m[2] + ")" : "a" === a ? m[3] : "rgba(" + m.join(",") + ")" : d;
                return r
            },
            brighten: function(a) {
                var d, m = this.rgba;
                if (this.stops) A(this.stops, function(d) {
                    d.brighten(a)
                });
                else if (y(a) && 0 !== a) for (d = 0; 3 > d; d++) m[d] += t(255 * a), 0 > m[d] && (m[d] = 0), 255 < m[d] && (m[d] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            }
        };
        a.color = function(g) {
            return new a.Color(g)
        }
    })(K);
    (function(a) {
        var A, y, E = a.addEvent,
            G = a.animate,
            t = a.attr,
            g = a.charts,
            d = a.color,
            m = a.css,
            r = a.createElement,
            n = a.defined,
            p = a.deg2rad,
            b = a.destroyObjectProperties,
            k = a.doc,
            v = a.each,
            B = a.extend,
            e = a.erase,
            c = a.grep,
            l = a.hasTouch,
            q = a.isArray,
            h = a.isFirefox,
            f = a.isMS,
            u = a.isObject,
            D = a.isString,
            H = a.isWebKit,
            F = a.merge,
            I = a.noop,
            C = a.pick,
            w = a.pInt,
            J = a.removeEvent,
            M = a.stop,
            x = a.svg,
            z = a.SVG_NS,
            N = a.win;
        A = a.SVGElement = function() {
            return this
        };
        A.prototype = {
            opacity: 1,
            SVG_NS: z,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),
            init: function(a, f) {
                this.element = "span" === f ? r(f) : k.createElementNS(this.SVG_NS, f);
                this.renderer = a
            },
            animate: function(a, f, L) {
                f = C(f, this.renderer.globalAnimation, !0);
                M(this);
                f ? (L && (f.complete = L), G(this, a, f)) : this.attr(a, null, L);
                return this
            },
            colorGradient: function(O, f, L) {
                var c = this.renderer,
                    x, z, e, u, b, h, l, D, d, C, k, w = [],
                    H;
                O.linearGradient ? z = "linearGradient" : O.radialGradient && (z = "radialGradient");
                if (z) {
                    e = O[z];
                    b = c.gradients;
                    l = O.stops;
                    C = L.radialReference;
                    q(e) && (O[z] = e = {
                        x1: e[0],
                        y1: e[1],
                        x2: e[2],
                        y2: e[3],
                        gradientUnits: "userSpaceOnUse"
                    });
                    "radialGradient" === z && C && !n(e.gradientUnits) && (u = e, e = F(e, c.getRadialAttr(C, u), {
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (k in e)"id" !== k && w.push(k, e[k]);
                    for (k in l) w.push(l[k]);
                    w = w.join(",");
                    b[w] ? C = b[w].attr("id") : (e.id = C = "highcharts-" + a.idCounter++, b[w] = h = c.createElement(z).attr(e).add(c.defs), h.radAttr = u, h.stops = [], v(l, function(O) {
                        0 === O[1].indexOf("rgba") ? (x = a.color(O[1]), D = x.get("rgb"), d = x.get("a")) : (D = O[1], d = 1);
                        O = c.createElement("stop").attr({
                            offset: O[0],
                            "stop-color": D,
                            "stop-opacity": d
                        }).add(h);
                        h.stops.push(O)
                    }));
                    H = "url(" + c.url + "#" + C + ")";
                    L.setAttribute(f, H);
                    L.gradient = w;
                    O.toString = function() {
                        return H
                    }
                }
            },
            applyTextShadow: function(a) {
                var c = this.element,
                    L, x = -1 !== a.indexOf("contrast"),
                    z = {},
                    e = this.renderer.forExport,
                    u = this.renderer.forExport || void 0 !== c.style.textShadow && !f;
                x && (z.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
                if (H || e) z.textRendering = "geometricPrecision";
                u ? this.css(z) : (this.fakeTS = !0, this.ySetter = this.xSetter, L = [].slice.call(c.getElementsByTagName("tspan")), v(a.split(/\s?,\s?/g), function(a) {
                    var O = c.firstChild,
                        f, x;
                    a = a.split(" ");
                    f = a[a.length - 1];
                    (x = a[a.length - 2]) && v(L, function(a, L) {
                        var z;
                        0 === L && (a.setAttribute("x", c.getAttribute("x")), L = c.getAttribute("y"), a.setAttribute("y", L || 0), null === L && c.setAttribute("y", 0));
                        z = a.cloneNode(1);
                        t(z, {
                            "class": "highcharts-text-shadow",
                            fill: f,
                            stroke: f,
                            "stroke-opacity": 1 / Math.max(w(x), 3),
                            "stroke-width": x,
                            "stroke-linejoin": "round"
                        });
                        c.insertBefore(z, O)
                    })
                }))
            },
            attr: function(a, f, L) {
                var c, x = this.element,
                    z, e = this,
                    u;
                "string" === typeof a && void 0 !== f && (c = a, a = {}, a[c] = f);
                if ("string" === typeof a) e = (this[a + "Getter"] || this._defaultGetter).call(this, a, x);
                else {
                    for (c in a) f = a[c], u = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (z || (this.symbolAttr(a), z = !0), u = !0), !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0), u || (u = this[c + "Setter"] || this._defaultSetter, u.call(this, f, c, x), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, f, u));
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                L && L();
                return e
            },
            updateShadows: function(a, f, c) {
                for (var x = this.shadows, z = x.length; z--;) c.call(x[z], "height" === a ? Math.max(f - (x[z].cutHeight || 0), 0) : "d" === a ? this.d : f, a, x[z])
            },
            addClass: function(a, f) {
                var c = this.attr("class") || ""; - 1 === c.indexOf(a) && (f || (a = (c + (c ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !== t(this.element, "class").indexOf(a)
            },
            removeClass: function(a) {
                t(this.element, "class", (t(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function(a) {
                var f = this;
                v("x y r start end width height innerR anchorX anchorY".split(" "), function(c) {
                    f[c] = C(a[c], f[c])
                });
                f.attr({
                    d: f.renderer.symbols[f.symbolName](f.x, f.y, f.width, f.height, f)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, f) {
                var c, x = {},
                    z;
                f = f || a.strokeWidth || 0;
                z = Math.round(f) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + z;
                a.y = Math.floor(a.y || this.y || 0) + z;
                a.width = Math.floor((a.width || this.width || 0) - 2 * z);
                a.height = Math.floor((a.height || this.height || 0) - 2 * z);
                n(a.strokeWidth) && (a.strokeWidth = f);
                for (c in a) this[c] !== a[c] && (this[c] = x[c] = a[c]);
                return x
            },
            css: function(a) {
                var c = this.styles,
                    L = {},
                    z = this.element,
                    e, u, b = "";
                e = !c;
                a && a.color && (a.fill = a.color);
                if (c) for (u in a) a[u] !== c[u] && (L[u] = a[u], e = !0);
                if (e) {
                    e = this.textWidth = a && a.width && "text" === z.nodeName.toLowerCase() && w(a.width) || this.textWidth;
                    c && (a = B(c, L));
                    this.styles = a;
                    e && !x && this.renderer.forExport && delete a.width;
                    if (f && !x) m(this.element, a);
                    else {
                        c = function(a, O) {
                            return "-" + O.toLowerCase()
                        };
                        for (u in a) b += u.replace(/([A-Z])/g, c) + ":" + a[u] + ";";
                        t(z, "style", b)
                    }
                    this.added && e && this.renderer.buildText(this)
                }
                return this
            },
            strokeWidth: function() {
                return this["stroke-width"] || 0
            },
            on: function(a, f) {
                var c = this,
                    x = c.element;
                l && "click" === a ? (x.ontouchstart = function(a) {
                    c.touchEventFired = Date.now();
                    a.preventDefault();
                    f.call(x, a)
                }, x.onclick = function(a) {
                    (-1 === N.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (c.touchEventFired || 0)) && f.call(x, a)
                }) : x["on" + a] = f;
                return this
            },
            setRadialReference: function(a) {
                var f = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                f && f.radAttr && f.animate(this.renderer.getRadialAttr(a, f.radAttr));
                return this
            },
            translate: function(a, f) {
                return this.attr({
                    translateX: a,
                    translateY: f
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a = this.translateX || 0,
                    f = this.translateY || 0,
                    c = this.scaleX,
                    x = this.scaleY,
                    z = this.inverted,
                    e = this.rotation,
                    u = this.element;
                z && (a += this.attr("width"), f += this.attr("height"));
                a = ["translate(" + a + "," + f + ")"];
                z ? a.push("rotate(90) scale(-1,1)") : e && a.push("rotate(" + e + " " + (u.getAttribute("x") || 0) + " " + (u.getAttribute("y") || 0) + ")");
                (n(c) || n(x)) && a.push("scale(" + C(c, 1) + " " + C(x, 1) + ")");
                a.length && u.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, f, c) {
                var x, z, u, b, h = {};
                z = this.renderer;
                u = z.alignedObjects;
                var l, q;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = f, !c || D(c)) this.alignTo = x = c || "renderer", e(u, this), u.push(this), c = null
                } else a = this.alignOptions, f = this.alignByTranslate, x = this.alignTo;
                c = C(c, z[x], z);
                x = a.align;
                z = a.verticalAlign;
                u = (c.x || 0) + (a.x || 0);
                b = (c.y || 0) + (a.y || 0);
                "right" === x ? l = 1 : "center" === x && (l = 2);
                l && (u += (c.width - (a.width || 0)) / l);
                h[f ? "translateX" : "x"] = Math.round(u);
                "bottom" === z ? q = 1 : "middle" === z && (q = 2);
                q && (b += (c.height - (a.height || 0)) / q);
                h[f ? "translateY" : "y"] = Math.round(b);
                this[this.placed ? "animate" : "attr"](h);
                this.placed = !0;
                this.alignAttr = h;
                return this
            },
            getBBox: function(a, c) {
                var x, z = this.renderer,
                    u, e, b, l = this.element,
                    D = this.styles,
                    q = this.textStr,
                    F, d = l.style,
                    k, w = z.cache,
                    H = z.cacheKeys,
                    n;
                e = C(c, this.rotation);
                b = e * p;
                u = D && D.fontSize;
                void 0 !== q && (n = q.toString().replace(/[0-9]/g, "0") + ["", e || 0, u, l.style.width].join());
                n && !a && (x = w[n]);
                if (!x) {
                    if (l.namespaceURI === this.SVG_NS || z.forExport) {
                        try {
                            k = this.fakeTS &&
                                function(a) {
                                    v(l.querySelectorAll(".highcharts-text-shadow"), function(f) {
                                        f.style.display = a
                                    })
                                }, h && d.textShadow ? (F = d.textShadow, d.textShadow = "") : k && k("none"), x = l.getBBox ? B({}, l.getBBox()) : {
                                width: l.offsetWidth,
                                height: l.offsetHeight
                            }, F ? d.textShadow = F : k && k("")
                        } catch (r) {}
                        if (!x || 0 > x.width) x = {
                            width: 0,
                            height: 0
                        }
                    } else x = this.htmlGetBBox();
                    z.isSVG && (z = x.width, u = x.height, f && D && "11px" === D.fontSize && "16.9" === u.toPrecision(3) && (x.height = u = 14), e && (x.width = Math.abs(u * Math.sin(b)) + Math.abs(z * Math.cos(b)), x.height = Math.abs(u * Math.cos(b)) + Math.abs(z * Math.sin(b))));
                    if (n && 0 < x.height) {
                        for (; 250 < H.length;) delete w[H.shift()];
                        w[n] || H.push(n);
                        w[n] = x
                    }
                }
                return x
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var f = this;
                f.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        f.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var f = this.renderer,
                    c = this.element,
                    x;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && f.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) x = this.zIndexSetter();
                x || (a ? a.element : f.box).appendChild(c);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var f = a.parentNode;
                f && f.removeChild(a)
            },
            destroy: function() {
                var a = this.element || {},
                    f = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup,
                    c, x;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                M(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (x = 0; x < this.stops.length; x++) this.stops[x] = this.stops[x].destroy();
                    this.stops = null
                }
                this.safeRemoveChild(a);
                for (this.destroyShadows(); f && f.div && 0 === f.div.childNodes.length;) a = f.parentGroup, this.safeRemoveChild(f.div), delete f.div, f = a;
                this.alignTo && e(this.renderer.alignedObjects, this);
                for (c in this) delete this[c];
                return null
            },
            shadow: function(a, f, c) {
                var x = [],
                    z, u, e = this.element,
                    b, l, h, D;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    l = C(a.width, 3);
                    h = (a.opacity || .15) / l;
                    D = this.parentInverted ? "(-1,-1)" : "(" + C(a.offsetX, 1) + ", " + C(a.offsetY, 1) + ")";
                    for (z = 1; z <= l; z++) u = e.cloneNode(0), b = 2 * l + 1 - 2 * z, t(u, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": h * z,
                        "stroke-width": b,
                        transform: "translate" + D,
                        fill: "none"
                    }), c && (t(u, "height", Math.max(t(u, "height") - b, 0)), u.cutHeight = b), f ? f.element.appendChild(u) : e.parentNode.insertBefore(u, e), x.push(u);
                    this.shadows = x
                }
                return this
            },
            destroyShadows: function() {
                v(this.shadows || [], function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = C(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, f, c) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                c.setAttribute(f, a);
                this[f] = a
            },
            dashstyleSetter: function(a) {
                var f, c = this["stroke-width"];
                "inherit" === c && (c = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (f = a.length; f--;) a[f] = w(a[f]) * c;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            titleSetter: function(a) {
                var f = this.element.getElementsByTagName("title")[0];
                f || (f = k.createElementNS(this.SVG_NS, "title"), this.element.appendChild(f));
                f.firstChild && f.removeChild(f.firstChild);
                f.appendChild(k.createTextNode(String(C(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, f, c) {
                "string" === typeof a ? c.setAttribute(f, a) : a && this.colorGradient(a, f, c)
            },
            visibilitySetter: function(a, f, c) {
                "inherit" === a ? c.removeAttribute(f) : c.setAttribute(f, a)
            },
            zIndexSetter: function(a, f) {
                var c = this.renderer,
                    x = this.parentGroup,
                    c = (x || c).element || c.box,
                    z, u, e = this.element,
                    b;
                z = this.added;
                var l;
                n(a) && (e.zIndex = a, a = +a, this[f] === a && (z = !1), this[f] = a);
                if (z) {
                    (a = this.zIndex) && x && (x.handleZ = !0);
                    x = c.childNodes;
                    for (l = 0; l < x.length && !b; l++) z = x[l], u = z.zIndex, z !== e && (w(u) > a || !n(a) && n(u)) && (c.insertBefore(e, z), b = !0);
                    b || c.appendChild(e)
                }
                return b
            },
            _defaultSetter: function(a, f, c) {
                c.setAttribute(f, a)
            }
        };
        A.prototype.yGetter = A.prototype.xGetter;
        A.prototype.translateXSetter = A.prototype.translateYSetter = A.prototype.rotationSetter = A.prototype.verticalAlignSetter = A.prototype.scaleXSetter = A.prototype.scaleYSetter = function(a, f) {
            this[f] = a;
            this.doTransform = !0
        };
        A.prototype.opacitySetter = A.prototype.displaySetter = function(a, f, c) {
            this[f] = a;
            c.setAttribute(f, a)
        };
        A.prototype["stroke-widthSetter"] = A.prototype.strokeSetter = function(a, f, c) {
            this[f] = a;
            this.stroke && this["stroke-width"] ? (A.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === f && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1)
        };
        y = a.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        y.prototype = {
            Element: A,
            SVG_NS: z,
            init: function(a, f, c, x, z, u) {
                var e;
                x = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(x));
                e = x.element;
                a.appendChild(e); - 1 === a.innerHTML.indexOf("xmlns") && t(e, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = e;
                this.boxWrapper = x;
                this.alignedObjects = [];
                this.url = (h || H) && k.getElementsByTagName("base").length ? N.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 5.0.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = u;
                this.forExport = z;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(f, c, !1);
                var b;
                h && a.getBoundingClientRect && (this.subPixelFix = f = function() {
                    m(a, {
                        left: 0,
                        top: 0
                    });
                    b = a.getBoundingClientRect();
                    m(a, {
                        left: Math.ceil(b.left) - b.left + "px",
                        top: Math.ceil(b.top) - b.top + "px"
                    })
                }, f(), E(N, "resize", f))
            },
            getStyle: function(a) {
                return this.style = B({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                b(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.subPixelFix && J(N, "resize", this.subPixelFix);
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var f = new this.Element;
                f.init(this, a);
                return f
            },
            draw: I,
            getRadialAttr: function(a, f) {
                return {
                    cx: a[0] - a[2] / 2 + f.cx * a[2],
                    cy: a[1] - a[2] / 2 + f.cy * a[2],
                    r: f.r * a[2]
                }
            },
            buildText: function(a) {
                for (var f = a.element, u = this, e = u.forExport, b = C(a.textStr, "").toString(), l = -1 !== b.indexOf("<"), h = f.childNodes, D, q, F, d, n = t(f, "x"), H = a.styles, r = a.textWidth, J = H && H.lineHeight, p = H && H.textShadow, g = H && "ellipsis" === H.textOverflow, N = h.length, B = r && !a.added && this.box, M = function(a) {
                    var f;
                    f = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : H && H.fontSize || u.style.fontSize || 12;
                    return J ? w(J) : u.fontMetrics(f, a).h
                }; N--;) f.removeChild(h[N]);
                l || p || g || r || -1 !== b.indexOf(" ") ? (D = /<.*class="([^"]+)".*>/, q = /<.*style="([^"]+)".*>/, F = /<.*href="(http[^"]+)".*>/, B && B.appendChild(f), b = l ? b.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [b], b = c(b, function(a) {
                    return "" !== a
                }), v(b, function(c, b) {
                    var l, h = 0;
                    c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                    l = c.split("|||");
                    v(l, function(c) {
                        if ("" !== c || 1 === l.length) {
                            var C = {},
                                w = k.createElementNS(u.SVG_NS, "tspan"),
                                v, J;
                            D.test(c) && (v = c.match(D)[1], t(w, "class", v));
                            q.test(c) && (J = c.match(q)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), t(w, "style", J));
                            F.test(c) && !e && (t(w, "onclick", 'location.href="' + c.match(F)[1] + '"'), m(w, {
                                cursor: "pointer"
                            }));
                            c = (c.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                            if (" " !== c) {
                                w.appendChild(k.createTextNode(c));
                                h ? C.dx = 0 : b && null !== n && (C.x = n);
                                t(w, C);
                                f.appendChild(w);
                                !h && b && (!x && e && m(w, {
                                    display: "block"
                                }), t(w, "dy", M(w)));
                                if (r) {
                                    C = c.replace(/([^\^])-/g, "$1- ").split(" ");
                                    v = "nowrap" === H.whiteSpace;
                                    for (var p = 1 < l.length || b || 1 < C.length && !v, N, B, Q = [], T = M(w), I = a.rotation, P = c, y = P.length;
                                         (p || g) && (C.length || Q.length);) a.rotation = 0, N = a.getBBox(!0), B = N.width, !x && u.forExport && (B = u.measureSpanWidth(w.firstChild.data, a.styles)), N = B > r, void 0 === d && (d = N), g && d ? (y /= 2, "" === P || !N && .5 > y ? C = [] : (P = c.substring(0, P.length + (N ? -1 : 1) * Math.ceil(y)), C = [P + (3 < r ? "\u2026" : "")], w.removeChild(w.firstChild))) : N && 1 !== C.length ? (w.removeChild(w.firstChild), Q.unshift(C.pop())) : (C = Q, Q = [], C.length && !v && (w = k.createElementNS(z, "tspan"), t(w, {
                                        dy: T,
                                        x: n
                                    }), J && t(w, "style", J), f.appendChild(w)), B > r && (r = B)), C.length && w.appendChild(k.createTextNode(C.join(" ").replace(/- /g, "-")));
                                    a.rotation = I
                                }
                                h++
                            }
                        }
                    })
                }), d && a.attr("title", a.textStr), B && B.removeChild(f), p && a.applyTextShadow && a.applyTextShadow(p)) : f.appendChild(k.createTextNode(b.replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
            },
            getContrast: function(a) {
                a = d(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, c, x, z, u, e, b, l, h) {
                var D = this.label(a, c, x, h, null, null, null, null, "button"),
                    q = 0;
                D.attr(F({
                    padding: 8,
                    r: 2
                }, u));
                var C, w, d, k;
                u = F({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, u);
                C = u.style;
                delete u.style;
                e = F(u, {
                    fill: "#e6e6e6"
                }, e);
                w = e.style;
                delete e.style;
                b = F(u, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, b);
                d = b.style;
                delete b.style;
                l = F(u, {
                    style: {
                        color: "#cccccc"
                    }
                }, l);
                k = l.style;
                delete l.style;
                E(D.element, f ? "mouseover" : "mouseenter", function() {
                    3 !== q && D.setState(1)
                });
                E(D.element, f ? "mouseout" : "mouseleave", function() {
                    3 !== q && D.setState(q)
                });
                D.setState = function(a) {
                    1 !== a && (D.state = q = a);
                    D.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    D.attr([u, e, b, l][a || 0]).css([C, w, d, k][a || 0])
                };
                D.attr(u).css(B({
                    cursor: "default"
                }, C));
                return D.on("click", function(a) {
                    3 !== q && z.call(D, a)
                })
            },
            crispLine: function(a, f) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - f % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + f % 2 / 2);
                return a
            },
            path: function(a) {
                var f = {
                    fill: "none"
                };
                q(a) ? f.d = a : u(a) && B(f, a);
                return this.createElement("path").attr(f)
            },
            circle: function(a, f, c) {
                a = u(a) ? a : {
                    x: a,
                    y: f,
                    r: c
                };
                f = this.createElement("circle");
                f.xSetter = f.ySetter = function(a, f, c) {
                    c.setAttribute("c" + f, a)
                };
                return f.attr(a)
            },
            arc: function(a, f, c, x, z, e) {
                u(a) && (f = a.y, c = a.r, x = a.innerR, z = a.start, e = a.end, a = a.x);
                a = this.symbol("arc", a || 0, f || 0, c || 0, c || 0, {
                    innerR: x || 0,
                    start: z || 0,
                    end: e || 0
                });
                a.r = c;
                return a
            },
            rect: function(a, f, c, x, z, e) {
                z = u(a) ? a.r : z;
                var b = this.createElement("rect");
                a = u(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: f,
                    width: Math.max(c, 0),
                    height: Math.max(x, 0)
                };
                void 0 !== e && (a.strokeWidth = e, a = b.crisp(a));
                a.fill = "none";
                z && (a.r = z);
                b.rSetter = function(a, f, c) {
                    t(c, {
                        rx: a,
                        ry: a
                    })
                };
                return b.attr(a)
            },
            setSize: function(a, f, c) {
                var x = this.alignedObjects,
                    z = x.length;
                this.width = a;
                this.height = f;
                for (this.boxWrapper.animate({
                    width: a,
                    height: f
                }, {
                    step: function() {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        })
                    },
                    duration: C(c, !0) ? void 0 : 0
                }); z--;) x[z].align()
            },
            g: function(a) {
                var f = this.createElement("g");
                return a ? f.attr({
                    "class": "highcharts-" + a
                }) : f
            },
            image: function(a, f, c, x, z) {
                var u = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && B(u, {
                    x: f,
                    y: c,
                    width: x,
                    height: z
                });
                u = this.createElement("image").attr(u);
                u.element.setAttributeNS ? u.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : u.element.setAttribute("hc-svg-href", a);
                return u
            },
            symbol: function(a, f, c, x, z, u) {
                var e = this,
                    b, l = this.symbols[a],
                    D = n(f) && l && l(Math.round(f), Math.round(c), x, z, u),
                    h = /^url\((.*?)\)$/,
                    q, w, d = {};
                l ? (b = this.path(D), b.attr("fill", "none"), B(b, {
                    symbolName: a,
                    x: f,
                    y: c,
                    width: x,
                    height: z
                }), u && B(b, u)) : h.test(a) && (q = a.match(h)[1], b = this.image(q), b.imgwidth = C(d[q] && d[q].width, u && u.width), b.imgheight = C(d[q] && d[q].height, u && u.height), w = function() {
                    b.attr({
                        width: b.width,
                        height: b.height
                    })
                }, v(["width", "height"], function(a) {
                    b[a + "Setter"] = function(a, f) {
                        var c = {},
                            x = this["img" + f];
                        this[f] = a;
                        n(x) && (this.element && this.element.setAttribute(f, x), this.alignByTranslate || (c["width" === f ? "translateX" : "translateY"] = (this[f] - x) / 2, this.attr(c)))
                    }
                }), n(f) && b.attr({
                    x: f,
                    y: c
                }), b.isImg = !0, n(b.imgwidth) && n(b.imgheight) ? w() : (b.attr({
                    width: 0,
                    height: 0
                }), r("img", {
                    onload: function() {
                        var a = g[e.chartIndex];
                        0 === this.width && (m(this, {
                            position: "absolute",
                            top: "-999em"
                        }), k.body.appendChild(this));
                        d[q] = {
                            width: this.width,
                            height: this.height
                        };
                        b.imgwidth = this.width;
                        b.imgheight = this.height;
                        b.element && w();
                        this.parentNode && this.parentNode.removeChild(this);
                        e.imgCount--;
                        if (!e.imgCount && a && a.onload) a.onload()
                    },
                    src: q
                }), this.imgCount++));
                return b
            },
            symbols: {
                circle: function(a, f, c, x) {
                    var z = .166 * c;
                    return ["M", a + c / 2, f, "C", a + c + z, f, a + c + z, f + x, a + c / 2, f + x, "C", a - z, f + x, a - z, f, a + c / 2, f, "Z"]
                },
                square: function(a, f, c, x) {
                    return ["M", a, f, "L", a + c, f, a + c, f + x, a, f + x, "Z"]
                },
                triangle: function(a, f, c, x) {
                    return ["M", a + c / 2, f, "L", a + c, f + x, a, f + x, "Z"]
                },
                "triangle-down": function(a, f, c, x) {
                    return ["M", a, f, "L", a + c, f, a + c / 2, f + x, "Z"]
                },
                diamond: function(a, f, c, x) {
                    return ["M", a + c / 2, f, "L", a + c, f + x / 2, a + c / 2, f + x, a, f + x / 2, "Z"]
                },
                arc: function(a, f, c, x, z) {
                    var u = z.start;
                    c = z.r || c || x;
                    var b = z.end - .001;
                    x = z.innerR;
                    var e = z.open,
                        l = Math.cos(u),
                        D = Math.sin(u),
                        h = Math.cos(b),
                        b = Math.sin(b);
                    z = z.end - u < Math.PI ? 0 : 1;
                    return ["M", a + c * l, f + c * D, "A", c, c, 0, z, 1, a + c * h, f + c * b, e ? "M" : "L", a + x * h, f + x * b, "A", x, x, 0, z, 0, a + x * l, f + x * D, e ? "" : "Z"]
                },
                callout: function(a, f, c, x, z) {
                    var u = Math.min(z && z.r || 0, c, x),
                        b = u + 6,
                        e = z && z.anchorX;
                    z = z && z.anchorY;
                    var l;
                    l = ["M", a + u, f, "L", a + c - u, f, "C", a + c, f, a + c, f, a + c, f + u, "L", a + c, f + x - u, "C", a + c, f + x, a + c, f + x, a + c - u, f + x, "L", a + u, f + x, "C", a, f + x, a, f + x, a, f + x - u, "L", a, f + u, "C", a, f, a, f, a + u, f];
                    e && e > c && z > f + b && z < f + x - b ? l.splice(13, 3, "L", a + c, z - 6, a + c + 6, z, a + c, z + 6, a + c, f + x - u) : e && 0 > e && z > f + b && z < f + x - b ? l.splice(33, 3, "L", a, z + 6, a - 6, z, a, z - 6, a, f + u) : z && z > x && e > a + b && e < a + c - b ? l.splice(23, 3, "L", e + 6, f + x, e, f + x + 6, e - 6, f + x, a + u, f + x) : z && 0 > z && e > a + b && e < a + c - b && l.splice(3, 3, "L", e - 6, f, e, f - 6, e + 6, f, c - u, f);
                    return l
                }
            },
            clipRect: function(f, c, x, z) {
                var u = "highcharts-" + a.idCounter++,
                    b = this.createElement("clipPath").attr({
                        id: u
                    }).add(this.defs);
                f = this.rect(f, c, x, z, 0).add(b);
                f.id = u;
                f.clipPath = b;
                f.count = 0;
                return f
            },
            text: function(a, f, c, z) {
                var u = !x && this.forExport,
                    b = {};
                if (z && (this.allowHTML || !this.forExport)) return this.html(a, f, c);
                b.x = Math.round(f || 0);
                c && (b.y = Math.round(c));
                if (a || 0 === a) b.text = a;
                a = this.createElement("text").attr(b);
                u && a.css({
                    position: "absolute"
                });
                z || (a.xSetter = function(a, f, c) {
                    var x = c.getElementsByTagName("tspan"),
                        z, u = c.getAttribute(f),
                        b;
                    for (b = 0; b < x.length; b++) z = x[b], z.getAttribute(f) === u && z.setAttribute(f, a);
                    c.setAttribute(f, a)
                });
                return a
            },
            fontMetrics: function(a, f) {
                var c;
                a = a || this.style && this.style.fontSize;
                a = /px/.test(a) ? w(a) : /em/.test(a) ? 12 * parseFloat(a) : 12;
                c = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: c,
                    b: Math.round(.8 * c),
                    f: a
                }
            },
            rotCorr: function(a, f, c) {
                var x = a;
                f && c && (x = Math.max(x * Math.cos(f * p), 4));
                return {
                    x: -a / 3 * Math.sin(f * p),
                    y: x
                }
            },
            label: function(a, f, c, x, z, u, b, e, l) {
                var D = this,
                    h = D.g("button" !== l && "label"),
                    q = h.text = D.text("", 0, 0, b).attr({
                        zIndex: 1
                    }),
                    C, w, d = 0,
                    k = 3,
                    H = 0,
                    r, p, g, N, m, M = {},
                    I, t, y = /^url\((.*?)\)$/.test(x),
                    E = y,
                    G, K, X, V;
                l && h.addClass("highcharts-" + l);
                E = y;
                G = function() {
                    return (I || 0) % 2 / 2
                };
                K = function() {
                    var a = q.element.style,
                        f = {};
                    w = (void 0 === r || void 0 === p || m) && n(q.textStr) && q.getBBox();
                    h.width = (r || w.width || 0) + 2 * k + H;
                    h.height = (p || w.height || 0) + 2 * k;
                    t = k + D.fontMetrics(a && a.fontSize, q).b;
                    E && (C || (h.box = C = D.symbols[x] || y ? D.symbol(x) : D.rect(), C.addClass(("button" === l ? "" : "highcharts-label-box") + (l ? " highcharts-" + l + "-box" : "")), C.add(h), a = G(), f.x = a, f.y = (e ? -t : 0) + a), f.width = Math.round(h.width), f.height = Math.round(h.height), C.attr(B(f, M)), M = {})
                };
                X = function() {
                    var a = H + k,
                        f;
                    f = e ? 0 : t;
                    n(r) && w && ("center" === m || "right" === m) && (a += {
                            center: .5,
                            right: 1
                        }[m] * (r - w.width));
                    if (a !== q.x || f !== q.y) q.attr("x", a), void 0 !== f && q.attr("y", f);
                    q.x = a;
                    q.y = f
                };
                V = function(a, f) {
                    C ? C.attr(a, f) : M[a] = f
                };
                h.onAdd = function() {
                    q.add(h);
                    h.attr({
                        text: a || 0 === a ? a : "",
                        x: f,
                        y: c
                    });
                    C && n(z) && h.attr({
                        anchorX: z,
                        anchorY: u
                    })
                };
                h.widthSetter = function(a) {
                    r = a
                };
                h.heightSetter = function(a) {
                    p = a
                };
                h["text-alignSetter"] = function(a) {
                    m = a
                };
                h.paddingSetter = function(a) {
                    n(a) && a !== k && (k = h.padding = a, X())
                };
                h.paddingLeftSetter = function(a) {
                    n(a) && a !== H && (H = a, X())
                };
                h.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== d && (d = a, w && h.attr({
                        x: g
                    }))
                };
                h.textSetter = function(a) {
                    void 0 !== a && q.textSetter(a);
                    K();
                    X()
                };
                h["stroke-widthSetter"] = function(a, f) {
                    a && (E = !0);
                    I = this["stroke-width"] = a;
                    V(f, a)
                };
                h.strokeSetter = h.fillSetter = h.rSetter = function(a, f) {
                    "fill" === f && a && (E = !0);
                    V(f, a)
                };
                h.anchorXSetter = function(a, f) {
                    z = a;
                    V(f, Math.round(a) - G() - g)
                };
                h.anchorYSetter = function(a, f) {
                    u = a;
                    V(f, a - N)
                };
                h.xSetter = function(a) {
                    h.x = a;
                    d && (a -= d * ((r || w.width) + 2 * k));
                    g = Math.round(a);
                    h.attr("translateX", g)
                };
                h.ySetter = function(a) {
                    N = h.y = Math.round(a);
                    h.attr("translateY", N)
                };
                var ba = h.css;
                return B(h, {
                    css: function(a) {
                        if (a) {
                            var f = {};
                            a = F(a);
                            v(h.textProps, function(c) {
                                void 0 !== a[c] && (f[c] = a[c], delete a[c])
                            });
                            q.css(f)
                        }
                        return ba.call(h, a)
                    },
                    getBBox: function() {
                        return {
                            width: w.width + 2 * k,
                            height: w.height + 2 * k,
                            x: w.x - k,
                            y: w.y - k
                        }
                    },
                    shadow: function(a) {
                        a && (K(), C && C.shadow(a));
                        return h
                    },
                    destroy: function() {
                        J(h.element, "mouseenter");
                        J(h.element, "mouseleave");
                        q && (q = q.destroy());
                        C && (C = C.destroy());
                        A.prototype.destroy.call(h);
                        h = D = K = X = V = null
                    }
                })
            }
        };
        a.Renderer = y
    })(K);
    (function(a) {
        var A = a.attr,
            y = a.createElement,
            E = a.css,
            G = a.defined,
            t = a.each,
            g = a.extend,
            d = a.isFirefox,
            m = a.isMS,
            r = a.isWebKit,
            n = a.pInt,
            p = a.SVGRenderer,
            b = a.win,
            k = a.wrap;
        g(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = g(this.styles, a);
                E(this.element, a);
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        e = this.translateX || 0,
                        c = this.translateY || 0,
                        l = this.x || 0,
                        q = this.y || 0,
                        h = this.textAlign || "left",
                        f = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[h],
                        u = this.styles;
                    E(b, {
                        marginLeft: e,
                        marginTop: c
                    });
                    this.shadows && t(this.shadows, function(a) {
                        E(a, {
                            marginLeft: e + 1,
                            marginTop: c + 1
                        })
                    });
                    this.inverted && t(b.childNodes, function(f) {
                        a.invertChild(f, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var D = this.rotation,
                            d = n(this.textWidth),
                            k = u && u.whiteSpace,
                            p = [D, h, b.innerHTML, this.textWidth, this.textAlign].join();
                        p !== this.cTT && (u = a.fontMetrics(b.style.fontSize).b, G(D) && this.setSpanRotation(D, f, u), E(b, {
                            width: "",
                            whiteSpace: k || "nowrap"
                        }), b.offsetWidth > d && /[ \-]/.test(b.textContent || b.innerText) && E(b, {
                            width: d + "px",
                            display: "block",
                            whiteSpace: k || "normal"
                        }), this.getSpanCorrection(b.offsetWidth, u, f, D, h));
                        E(b, {
                            left: l + (this.xCorr || 0) + "px",
                            top: q + (this.yCorr || 0) + "px"
                        });
                        r && (u = b.offsetHeight);
                        this.cTT = p
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, k, e) {
                var c = {},
                    l = m ? "-ms-transform" : r ? "-webkit-transform" : d ? "MozTransform" : b.opera ? "-o-transform" : "";
                c[l] = c.transform = "rotate(" + a + "deg)";
                c[l + (d ? "Origin" : "-origin")] = c.transformOrigin = 100 * k + "% " + e + "px";
                E(this.element, c)
            },
            getSpanCorrection: function(a, b, e) {
                this.xCorr = -a * e;
                this.yCorr = -b
            }
        });
        g(p.prototype, {
            html: function(a, b, e) {
                var c = this.createElement("span"),
                    l = c.element,
                    q = c.renderer,
                    h = q.isSVG,
                    f = function(a, f) {
                        t(["display", "opacity", "visibility"], function(c) {
                            k(a, c + "Setter", function(a, c, b, u) {
                                a.call(this, c, b, u);
                                f[b] = c
                            })
                        })
                    };
                c.textSetter = function(a) {
                    a !== l.innerHTML && delete this.bBox;
                    l.innerHTML = this.textStr = a;
                    c.htmlUpdateTransform()
                };
                h && f(c, c.element.style);
                c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function(a, f) {
                    "align" === f && (f = "textAlign");
                    c[f] = a;
                    c.htmlUpdateTransform()
                };
                c.attr({
                    text: a,
                    x: Math.round(b),
                    y: Math.round(e)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                l.style.whiteSpace = "nowrap";
                c.css = c.htmlCss;
                h && (c.add = function(a) {
                    var b, e = q.box.parentNode,
                        h = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) h.push(a), a = a.parentGroup;
                            t(h.reverse(), function(a) {
                                var c, u = A(a.element, "class");
                                u && (u = {
                                    className: u
                                });
                                b = a.div = a.div || y("div", u, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY || 0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    }, b || e);
                                c = b.style;
                                g(a, {
                                    translateXSetter: function(f, b) {
                                        c.left = f + "px";
                                        a[b] = f;
                                        a.doTransform = !0
                                    },
                                    translateYSetter: function(f, b) {
                                        c.top = f + "px";
                                        a[b] = f;
                                        a.doTransform = !0
                                    }
                                });
                                f(a, c)
                            })
                        }
                    } else b = e;
                    b.appendChild(l);
                    c.added = !0;
                    c.alignOnAdd && c.htmlUpdateTransform();
                    return c
                });
                return c
            }
        })
    })(K);
    (function(a) {
        var A, y, E = a.createElement,
            G = a.css,
            t = a.defined,
            g = a.deg2rad,
            d = a.discardElement,
            m = a.doc,
            r = a.each,
            n = a.erase,
            p = a.extend;
        A = a.extendClass;
        var b = a.isArray,
            k = a.isNumber,
            v = a.isObject,
            B = a.merge;
        y = a.noop;
        var e = a.pick,
            c = a.pInt,
            l = a.SVGElement,
            q = a.SVGRenderer,
            h = a.win;
        a.svg || (y = {
            docMode8: m && 8 === m.documentMode,
            init: function(a, c) {
                var b = ["<", c, ' filled="f" stroked="f"'],
                    e = ["position: ", "absolute", ";"],
                    h = "div" === c;
                ("shape" === c || h) && e.push("left:0;top:0;width:1px;height:1px;");
                e.push("visibility: ", h ? "hidden" : "visible");
                b.push(' style="', e.join(""), '"/>');
                c && (b = h || "span" === c || "img" === c ? b.join("") : a.prepVML(b), this.element = E(b));
                this.renderer = a
            },
            add: function(a) {
                var c = this.renderer,
                    b = this.element,
                    e = c.box,
                    h = a && a.inverted,
                    e = a ? a.element || a : e;
                a && (this.parentGroup = a);
                h && c.invertChild(b, e);
                e.appendChild(b);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                this.className && this.attr("class", this.className);
                return this
            },
            updateTransform: l.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var a = this.rotation,
                    c = Math.cos(a * g),
                    b = Math.sin(a * g);
                G(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", c, ", M12=", -b, ", M21=", b, ", M22=", c, ", sizingMethod='auto expand')"].join("") : "none"
                })
            },
            getSpanCorrection: function(a, c, b, h, l) {
                var q = h ? Math.cos(h * g) : 1,
                    d = h ? Math.sin(h * g) : 0,
                    w = e(this.elemHeight, this.element.offsetHeight),
                    k;
                this.xCorr = 0 > q && -a;
                this.yCorr = 0 > d && -w;
                k = 0 > q * d;
                this.xCorr += d * c * (k ? 1 - b : b);
                this.yCorr -= q * c * (h ? k ? b : 1 - b : 1);
                l && "left" !== l && (this.xCorr -= a * b * (0 > q ? -1 : 1), h && (this.yCorr -= w * b * (0 > d ? -1 : 1)), G(this.element, {
                    textAlign: l
                }))
            },
            pathToVML: function(a) {
                for (var c = a.length, b = []; c--;) k(a[c]) ? b[c] = Math.round(10 * a[c]) - 5 : "Z" === a[c] ? b[c] = "x" : (b[c] = a[c], !a.isArc || "wa" !== a[c] && "at" !== a[c] || (b[c + 5] === b[c + 7] && (b[c + 7] += a[c + 7] > a[c + 5] ? 1 : -1), b[c + 6] === b[c + 8] && (b[c + 8] += a[c + 8] > a[c + 6] ? 1 : -1)));
                return b.join(" ") || "x"
            },
            clip: function(a) {
                var c = this,
                    b;
                a ? (b = a.members, n(b, c), b.push(c), c.destroyClip = function() {
                    n(b, c)
                }, a = a.getCSS(c)) : (c.destroyClip && c.destroyClip(), a = {
                    clip: c.docMode8 ? "inherit" : "rect(auto)"
                });
                return c.css(a)
            },
            css: l.prototype.htmlCss,
            safeRemoveChild: function(a) {
                a.parentNode && d(a)
            },
            destroy: function() {
                this.destroyClip && this.destroyClip();
                return l.prototype.destroy.apply(this)
            },
            on: function(a, c) {
                this.element["on" + a] = function() {
                    var a = h.event;
                    a.target = a.srcElement;
                    c(a)
                };
                return this
            },
            cutOffPath: function(a, b) {
                var e;
                a = a.split(/[ ,]/);
                e = a.length;
                if (9 === e || 11 === e) a[e - 4] = a[e - 2] = c(a[e - 2]) - 10 * b;
                return a.join(" ")
            },
            shadow: function(a, b, h) {
                var l = [],
                    q, d = this.element,
                    k = this.renderer,
                    w, n = d.style,
                    r, x = d.path,
                    z, p, v, g;
                x && "string" !== typeof x.value && (x = "x");
                p = x;
                if (a) {
                    v = e(a.width, 3);
                    g = (a.opacity || .15) / v;
                    for (q = 1; 3 >= q; q++) z = 2 * v + 1 - 2 * q, h && (p = this.cutOffPath(x.value, z + .5)), r = ['<shape isShadow="true" strokeweight="', z, '" filled="false" path="', p, '" coordsize="10 10" style="', d.style.cssText, '" />'], w = E(k.prepVML(r), null, {
                        left: c(n.left) + e(a.offsetX, 1),
                        top: c(n.top) + e(a.offsetY, 1)
                    }), h && (w.cutOff = z + 1), r = ['<stroke color="', a.color || "#000000", '" opacity="', g * q, '"/>'], E(k.prepVML(r), null, null, w), b ? b.element.appendChild(w) : d.parentNode.insertBefore(w, d), l.push(w);
                    this.shadows = l
                }
                return this
            },
            updateShadows: y,
            setAttr: function(a, c) {
                this.docMode8 ? this.element[a] = c : this.element.setAttribute(a, c)
            },
            classSetter: function(a) {
                (this.added ? this.element : this).className = a
            },
            dashstyleSetter: function(a, c, b) {
                (b.getElementsByTagName("stroke")[0] || E(this.renderer.prepVML(["<stroke/>"]), null, null, b))[c] = a || "solid";
                this[c] = a
            },
            dSetter: function(a, c, b) {
                var e = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                b.path = a = this.pathToVML(a);
                if (e) for (b = e.length; b--;) e[b].path = e[b].cutOff ? this.cutOffPath(a, e[b].cutOff) : a;
                this.setAttr(c, a)
            },
            fillSetter: function(a, c, b) {
                var e = b.nodeName;
                "SPAN" === e ? b.style.color = a : "IMG" !== e && (b.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, b, c, this)))
            },
            "fill-opacitySetter": function(a, c, b) {
                E(this.renderer.prepVML(["<", c.split("-")[0], ' opacity="', a, '"/>']), null, null, b)
            },
            opacitySetter: y,
            rotationSetter: function(a, c, b) {
                b = b.style;
                this[c] = b[c] = a;
                b.left = -Math.round(Math.sin(a * g) + 1) + "px";
                b.top = Math.round(Math.cos(a * g)) + "px"
            },
            strokeSetter: function(a, c, b) {
                this.setAttr("strokecolor", this.renderer.color(a, b, c, this))
            },
            "stroke-widthSetter": function(a, c, b) {
                b.stroked = !! a;
                this[c] = a;
                k(a) && (a += "px");
                this.setAttr("strokeweight", a)
            },
            titleSetter: function(a, c) {
                this.setAttr(c, a)
            },
            visibilitySetter: function(a, c, b) {
                "inherit" === a && (a = "visible");
                this.shadows && r(this.shadows, function(b) {
                    b.style[c] = a
                });
                "DIV" === b.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (b.style[c] = a ? "visible" : "hidden"), c = "top");
                b.style[c] = a
            },
            displaySetter: function(a, c, b) {
                b.style[c] = a
            },
            xSetter: function(a, c, b) {
                this[c] = a;
                "x" === c ? c = "left" : "y" === c && (c = "top");
                this.updateClipping ? (this[c] = a, this.updateClipping()) : b.style[c] = a
            },
            zIndexSetter: function(a, c, b) {
                b.style[c] = a
            }
        }, y["stroke-opacitySetter"] = y["fill-opacitySetter"], a.VMLElement = y = A(l, y), y.prototype.ySetter = y.prototype.widthSetter = y.prototype.heightSetter = y.prototype.xSetter, y = {
            Element: y,
            isIE8: -1 < h.navigator.userAgent.indexOf("MSIE 8.0"),
            init: function(a, c, b) {
                var e, h;
                this.alignedObjects = [];
                e = this.createElement("div").css({
                    position: "relative"
                });
                h = e.element;
                a.appendChild(e.element);
                this.isVML = !0;
                this.box = h;
                this.boxWrapper = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(c, b, !1);
                if (!m.namespaces.hcv) {
                    m.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        m.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (l) {
                        m.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth
            },
            clipRect: function(a, c, b, e) {
                var h = this.createElement(),
                    l = v(a);
                return p(h, {
                    members: [],
                    count: 0,
                    left: (l ? a.x : a) + 1,
                    top: (l ? a.y : c) + 1,
                    width: (l ? a.width : b) - 1,
                    height: (l ? a.height : e) - 1,
                    getCSS: function(a) {
                        var c = a.element,
                            f = c.nodeName,
                            b = a.inverted,
                            x = this.top - ("shape" === f ? c.offsetTop : 0),
                            z = this.left,
                            c = z + this.width,
                            e = x + this.height,
                            x = {
                                clip: "rect(" + Math.round(b ? z : x) + "px," + Math.round(b ? e : c) + "px," + Math.round(b ? c : e) + "px," + Math.round(b ? x : z) + "px)"
                            };
                        !b && a.docMode8 && "DIV" === f && p(x, {
                            width: c + "px",
                            height: e + "px"
                        });
                        return x
                    },
                    updateClipping: function() {
                        r(h.members, function(a) {
                            a.element && a.css(h.getCSS(a))
                        })
                    }
                })
            },
            color: function(c, b, e, h) {
                var l = this,
                    q, d = /^rgba/,
                    k, n, p = "none";
                c && c.linearGradient ? n = "gradient" : c && c.radialGradient && (n = "pattern");
                if (n) {
                    var x, z, v = c.linearGradient || c.radialGradient,
                        g, m, L, B, t, Q = "";
                    c = c.stops;
                    var P, Y = [],
                        y = function() {
                            k = ['<fill colors="' + Y.join(",") + '" opacity="', L, '" o:opacity2="', m, '" type="', n, '" ', Q, 'focus="100%" method="any" />'];
                            E(l.prepVML(k), null, null, b)
                        };
                    g = c[0];
                    P = c[c.length - 1];
                    0 < g[0] && c.unshift([0, g[1]]);
                    1 > P[0] && c.push([1, P[1]]);
                    r(c, function(c, f) {
                        d.test(c[1]) ? (q = a.color(c[1]), x = q.get("rgb"), z = q.get("a")) : (x = c[1], z = 1);
                        Y.push(100 * c[0] + "% " + x);
                        f ? (L = z, B = x) : (m = z, t = x)
                    });
                    if ("fill" === e) if ("gradient" === n) e = v.x1 || v[0] || 0, c = v.y1 || v[1] || 0, g = v.x2 || v[2] || 0, v = v.y2 || v[3] || 0, Q = 'angle="' + (90 - 180 * Math.atan((v - c) / (g - e)) / Math.PI) + '"', y();
                    else {
                        var p = v.r,
                            A = 2 * p,
                            G = 2 * p,
                            Z = v.cx,
                            aa = v.cy,
                            W = b.radialReference,
                            U, p = function() {
                                W && (U = h.getBBox(), Z += (W[0] - U.x) / U.width - .5, aa += (W[1] - U.y) / U.height - .5, A *= W[2] / U.width, G *= W[2] / U.height);
                                Q = 'src="' + a.getOptions().global.VMLRadialGradientURL + '" size="' + A + "," + G + '" origin="0.5,0.5" position="' + Z + "," + aa + '" color2="' + t + '" ';
                                y()
                            };
                        h.added ? p() : h.onAdd = p;
                        p = B
                    } else p = x
                } else d.test(c) && "IMG" !== b.tagName ? (q = a.color(c), h[e + "-opacitySetter"](q.get("a"), e, b), p = q.get("rgb")) : (p = b.getElementsByTagName(e), p.length && (p[0].opacity = 1, p[0].type = "solid"), p = c);
                return p
            },
            prepVML: function(a) {
                var c = this.isIE8;
                a = a.join("");
                c ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:");
                return a
            },
            text: q.prototype.html,
            path: function(a) {
                var c = {
                    coordsize: "10 10"
                };
                b(a) ? c.d = a : v(a) && p(c, a);
                return this.createElement("shape").attr(c)
            },
            circle: function(a, c, b) {
                var e = this.symbol("circle");
                v(a) && (b = a.r, c = a.y, a = a.x);
                e.isCircle = !0;
                e.r = b;
                return e.attr({
                    x: a,
                    y: c
                })
            },
            g: function(a) {
                var c;
                a && (c = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                });
                return this.createElement("div").attr(c)
            },
            image: function(a, c, b, e, h) {
                var l = this.createElement("img").attr({
                    src: a
                });
                1 < arguments.length && l.attr({
                    x: c,
                    y: b,
                    width: e,
                    height: h
                });
                return l
            },
            createElement: function(a) {
                return "rect" === a ? this.symbol(a) : q.prototype.createElement.call(this, a)
            },
            invertChild: function(a, b) {
                var e = this,
                    h = b.style,
                    l = "IMG" === a.tagName && a.style;
                G(a, {
                    flip: "x",
                    left: c(h.width) - (l ? c(l.top) : 1),
                    top: c(h.height) - (l ? c(l.left) : 1),
                    rotation: -90
                });
                r(a.childNodes, function(c) {
                    e.invertChild(c, a)
                })
            },
            symbols: {
                arc: function(a, c, b, e, h) {
                    var l = h.start,
                        q = h.end,
                        d = h.r || b || e;
                    b = h.innerR;
                    e = Math.cos(l);
                    var k = Math.sin(l),
                        n = Math.cos(q),
                        x = Math.sin(q);
                    if (0 === q - l) return ["x"];
                    l = ["wa", a - d, c - d, a + d, c + d, a + d * e, c + d * k, a + d * n, c + d * x];
                    h.open && !b && l.push("e", "M", a, c);
                    l.push("at", a - b, c - b, a + b, c + b, a + b * n, c + b * x, a + b * e, c + b * k, "x", "e");
                    l.isArc = !0;
                    return l
                },
                circle: function(a, c, b, e, h) {
                    h && t(h.r) && (b = e = 2 * h.r);
                    h && h.isCircle && (a -= b / 2, c -= e / 2);
                    return ["wa", a, c, a + b, c + e, a + b, c + e / 2, a + b, c + e / 2, "e"]
                },
                rect: function(a, c, b, e, h) {
                    return q.prototype.symbols[t(h) && h.r ? "callout" : "square"].call(0, a, c, b, e, h)
                }
            }
        }, a.VMLRenderer = A = function() {
            this.init.apply(this, arguments)
        }, A.prototype = B(q.prototype, y), a.Renderer = A);
        q.prototype.measureSpanWidth = function(a, c) {
            var b = m.createElement("span"),
                e;
            e = m.createTextNode(a);
            b.appendChild(e);
            G(b, c);
            this.box.appendChild(b);
            e = b.offsetWidth;
            d(b);
            return e
        }
    })(K);
    (function(a) {
        function A() {
            var m = a.defaultOptions.global,
                r, n = m.useUTC,
                p = n ? "getUTC" : "get",
                b = n ? "setUTC" : "set";
            a.Date = r = m.Date || d.Date;
            r.hcTimezoneOffset = n && m.timezoneOffset;
            r.hcGetTimezoneOffset = n && m.getTimezoneOffset;
            r.hcMakeTime = function(a, b, d, e, c, l) {
                var q;
                n ? (q = r.UTC.apply(0, arguments), q += G(q)) : q = (new r(a, b, g(d, 1), g(e, 0), g(c, 0), g(l, 0))).getTime();
                return q
            };
            E("Minutes Hours Day Date Month FullYear".split(" "), function(a) {
                r["hcGet" + a] = p + a
            });
            E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function(a) {
                r["hcSet" + a] = b + a
            })
        }
        var y = a.color,
            E = a.each,
            G = a.getTZOffset,
            t = a.merge,
            g = a.pick,
            d = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                VMLRadialGradientURL: "http://code.highcharts.com@product.cdnpath@/5.0.0/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                style: {
                    color: "#333333",
                    fontSize: "18px"
                },
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                style: {
                    color: "#666666"
                },
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: y("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function(d) {
            a.defaultOptions = t(!0, a.defaultOptions, d);
            A();
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        A()
    })(K);
    (function(a) {
        var A = a.arrayMax,
            y = a.arrayMin,
            E = a.defined,
            G = a.destroyObjectProperties,
            t = a.each,
            g = a.erase,
            d = a.merge,
            m = a.pick;
        a.PlotLineOrBand = function(a, d) {
            this.axis = a;
            d && (this.options = d, this.id = d.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var a = this,
                    n = a.axis,
                    p = n.horiz,
                    b = a.options,
                    k = b.label,
                    v = a.label,
                    g = b.to,
                    e = b.from,
                    c = b.value,
                    l = E(e) && E(g),
                    q = E(c),
                    h = a.svgElem,
                    f = !h,
                    u = [],
                    D, H = b.color,
                    F = m(b.zIndex, 0),
                    t = b.events,
                    u = {
                        "class": "highcharts-plot-" + (l ? "band " : "line ") + (b.className || "")
                    },
                    C = {},
                    w = n.chart.renderer,
                    J = l ? "bands" : "lines",
                    M = n.log2lin;
                n.isLog && (e = M(e), g = M(g), c = M(c));
                q ? (u = {
                    stroke: H,
                    "stroke-width": b.width
                }, b.dashStyle && (u.dashstyle = b.dashStyle)) : l && (H && (u.fill = H), b.borderWidth && (u.stroke = b.borderColor, u["stroke-width"] = b.borderWidth));
                C.zIndex = F;
                J += "-" + F;
                (H = n[J]) || (n[J] = H = w.g("plot-" + J).attr(C).add());
                f && (a.svgElem = h = w.path().attr(u).add(H));
                if (q) u = n.getPlotLinePath(c, h.strokeWidth());
                else if (l) u = n.getPlotBandPath(e, g, b);
                else return;
                if (f && u && u.length) {
                    if (h.attr({
                            d: u
                        }), t) for (D in b = function(c) {
                        h.on(c, function(b) {
                            t[c].apply(a, [b])
                        })
                    }, t) b(D)
                } else h && (u ? (h.show(), h.animate({
                    d: u
                })) : (h.hide(), v && (a.label = v = v.destroy())));
                k && E(k.text) && u && u.length && 0 < n.width && 0 < n.height && !u.flat ? (k = d({
                    align: p && l && "center",
                    x: p ? !l && 4 : 10,
                    verticalAlign: !p && l && "middle",
                    y: p ? l ? 16 : 10 : l ? 6 : -4,
                    rotation: p && !l && 90
                }, k), this.renderLabel(k, u, l, F)) : v && v.hide();
                return a
            },
            renderLabel: function(a, d, p, b) {
                var k = this.label,
                    v = this.axis.chart.renderer;
                k || (k = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (p ? "band" : "line") + "-label " + (a.className || "")
                }, k.zIndex = b, this.label = k = v.text(a.text, 0, 0, a.useHTML).attr(k).add(), k.css(a.style));
                b = [d[1], d[4], p ? d[6] : d[1]];
                d = [d[2], d[5], p ? d[7] : d[2]];
                p = y(b);
                v = y(d);
                k.align(a, !1, {
                    x: p,
                    y: v,
                    width: A(b) - p,
                    height: A(d) - v
                });
                k.show()
            },
            destroy: function() {
                g(this.axis.plotLinesAndBands, this);
                delete this.axis;
                G(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function(a, d) {
                var p = this.getPlotLinePath(d, null, null, !0),
                    b = this.getPlotLinePath(a, null, null, !0);
                b && p ? (b.flat = b.toString() === p.toString(), b.push(p[4], p[5], p[1], p[2])) : b = null;
                return b
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(d, n) {
                var p = (new a.PlotLineOrBand(this, d)).render(),
                    b = this.userOptions;
                p && (n && (b[n] = b[n] || [], b[n].push(d)), this.plotLinesAndBands.push(p));
                return p
            },
            removePlotBandOrLine: function(a) {
                for (var d = this.plotLinesAndBands, p = this.options, b = this.userOptions, k = d.length; k--;) d[k].id === a && d[k].destroy();
                t([p.plotLines || [], b.plotLines || [], p.plotBands || [], b.plotBands || []], function(b) {
                    for (k = b.length; k--;) b[k].id === a && g(b, b[k])
                })
            }
        }
    })(K);
    (function(a) {
        var A = a.correctFloat,
            y = a.defined,
            E = a.destroyObjectProperties,
            G = a.isNumber,
            t = a.merge,
            g = a.pick,
            d = a.stop,
            m = a.deg2rad;
        a.Tick = function(a, d, p, b) {
            this.axis = a;
            this.pos = d;
            this.type = p || "";
            this.isNew = !0;
            p || b || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    d = a.options,
                    p = a.chart,
                    b = a.categories,
                    k = a.names,
                    v = this.pos,
                    m = d.labels,
                    e = a.tickPositions,
                    c = v === e[0],
                    l = v === e[e.length - 1],
                    k = b ? g(b[v], k[v], v) : v,
                    b = this.label,
                    e = e.info,
                    q;
                a.isDatetimeAxis && e && (q = d.dateTimeLabelFormats[e.higherRanks[v] || e.unitName]);
                this.isFirst = c;
                this.isLast = l;
                d = a.labelFormatter.call({
                    axis: a,
                    chart: p,
                    isFirst: c,
                    isLast: l,
                    dateTimeLabelFormat: q,
                    value: a.isLog ? A(a.lin2log(k)) : k
                });
                y(b) ? b && b.attr({
                    text: d
                }) : (this.labelLength = (this.label = b = y(d) && m.enabled ? p.renderer.text(d, 0, 0, m.useHTML).css(t(m.style)).add(a.labelGroup) : null) && b.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var d = this.axis,
                    p = a.x,
                    b = d.chart.chartWidth,
                    k = d.chart.spacing,
                    v = g(d.labelLeft, Math.min(d.pos, k[3])),
                    k = g(d.labelRight, Math.max(d.pos + d.len, b - k[1])),
                    B = this.label,
                    e = this.rotation,
                    c = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[d.labelAlign],
                    l = B.getBBox().width,
                    q = d.getSlotWidth(),
                    h = q,
                    f = 1,
                    u, D = {};
                if (e) 0 > e && p - c * l < v ? u = Math.round(p / Math.cos(e * m) - v) : 0 < e && p + c * l > k && (u = Math.round((b - p) / Math.cos(e * m)));
                else if (b = p + (1 - c) * l, p - c * l < v ? h = a.x + h * (1 - c) - v : b > k && (h = k - a.x + h * c, f = -1), h = Math.min(q, h), h < q && "center" === d.labelAlign && (a.x += f * (q - h - c * (q - Math.min(l, h)))), l > h || d.autoRotation && (B.styles || {}).width) u = h;
                u && (D.width = u, (d.options.labels.style || {}).textOverflow || (D.textOverflow = "ellipsis"), B.css(D))
            },
            getPosition: function(a, d, p, b) {
                var k = this.axis,
                    v = k.chart,
                    g = b && v.oldChartHeight || v.chartHeight;
                return {
                    x: a ? k.translate(d + p, null, null, b) + k.transB : k.left + k.offset + (k.opposite ? (b && v.oldChartWidth || v.chartWidth) - k.right - k.left : 0),
                    y: a ? g - k.bottom + k.offset - (k.opposite ? k.height : 0) : g - k.translate(d + p, null, null, b) - k.transB
                }
            },
            getLabelPosition: function(a, d, p, b, k, v, g, e) {
                var c = this.axis,
                    l = c.transA,
                    q = c.reversed,
                    h = c.staggerLines,
                    f = c.tickRotCorr || {
                            x: 0,
                            y: 0
                        },
                    u = k.y;
                y(u) || (u = 0 === c.side ? p.rotation ? -8 : -p.getBBox().height : 2 === c.side ? f.y + 8 : Math.cos(p.rotation * m) * (f.y - p.getBBox(!1, 0).height / 2));
                a = a + k.x + f.x - (v && b ? v * l * (q ? -1 : 1) : 0);
                d = d + u - (v && !b ? v * l * (q ? 1 : -1) : 0);
                h && (p = g / (e || 1) % h, c.opposite && (p = h - p - 1), d += c.labelOffset / h * p);
                return {
                    x: a,
                    y: Math.round(d)
                }
            },
            getMarkPath: function(a, d, p, b, k, v) {
                return v.crispLine(["M", a, d, "L", a + (k ? 0 : -p), d + (k ? p : 0)], b)
            },
            render: function(a, n, p) {
                var b = this.axis,
                    k = b.options,
                    v = b.chart.renderer,
                    m = b.horiz,
                    e = this.type,
                    c = this.label,
                    l = this.pos,
                    q = k.labels,
                    h = this.gridLine,
                    f = e ? e + "Tick" : "tick",
                    u = b.tickSize(f),
                    D = this.mark,
                    H = !D,
                    F = q.step,
                    t = {},
                    C = !0,
                    w = b.tickmarkOffset,
                    J = this.getPosition(m, l, w, n),
                    M = J.x,
                    J = J.y,
                    x = m && M === b.pos + b.len || !m && J === b.pos ? -1 : 1,
                    z = e ? e + "Grid" : "grid",
                    N = k[z + "LineWidth"],
                    O = k[z + "LineColor"],
                    S = k[z + "LineDashStyle"],
                    z = g(k[f + "Width"], !e && b.isXAxis ? 1 : 0),
                    f = k[f + "Color"];
                p = g(p, 1);
                this.isActive = !0;
                h || (t.stroke = O, t["stroke-width"] = N, S && (t.dashstyle = S), e || (t.zIndex = 1), n && (t.opacity = 0), this.gridLine = h = v.path().attr(t).addClass("highcharts-" + (e ? e + "-" : "") + "grid-line").add(b.gridGroup));
                if (!n && h && (l = b.getPlotLinePath(l + w, h.strokeWidth() * x, n, !0))) h[this.isNew ? "attr" : "animate"]({
                    d: l,
                    opacity: p
                });
                u && (b.opposite && (u[0] = -u[0]), H && (this.mark = D = v.path().addClass("highcharts-" + (e ? e + "-" : "") + "tick").add(b.axisGroup), D.attr({
                    stroke: f,
                    "stroke-width": z
                })), D[H ? "attr" : "animate"]({
                    d: this.getMarkPath(M, J, u[0], D.strokeWidth() * x, m, v),
                    opacity: p
                }));
                c && G(M) && (c.xy = J = this.getLabelPosition(M, J, c, m, q, w, a, F), this.isFirst && !this.isLast && !g(k.showFirstLabel, 1) || this.isLast && !this.isFirst && !g(k.showLastLabel, 1) ? C = !1 : !m || b.isRadial || q.step || q.rotation || n || 0 === p || this.handleOverflow(J), F && a % F && (C = !1), C && G(J.y) ? (J.opacity = p, c[this.isNew ? "attr" : "animate"](J)) : (d(c), c.attr("y", -9999)), this.isNew = !1)
            },
            destroy: function() {
                E(this, this.axis)
            }
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.animObject,
            E = a.arrayMax,
            G = a.arrayMin,
            t = a.AxisPlotLineOrBandExtension,
            g = a.color,
            d = a.correctFloat,
            m = a.defaultOptions,
            r = a.defined,
            n = a.deg2rad,
            p = a.destroyObjectProperties,
            b = a.each,
            k = a.error,
            v = a.extend,
            B = a.fireEvent,
            e = a.format,
            c = a.getMagnitude,
            l = a.grep,
            q = a.inArray,
            h = a.isArray,
            f = a.isNumber,
            u = a.isString,
            D = a.merge,
            H = a.normalizeTickInterval,
            F = a.pick,
            I = a.PlotLineOrBand,
            C = a.removeEvent,
            w = a.splat,
            J = a.syncTimeout,
            M = a.Tick;
        a.Axis = function() {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, c) {
                var b = c.isX;
                this.chart = a;
                this.horiz = a.inverted ? !b : b;
                this.isXAxis = b;
                this.coll = this.coll || (b ? "xAxis" : "yAxis");
                this.opposite = c.opposite;
                this.side = c.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(c);
                var f = this.options,
                    e = f.type;
                this.labelFormatter = f.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = c;
                this.minPixelPadding = 0;
                this.reversed = f.reversed;
                this.visible = !1 !== f.visible;
                this.zoomEnabled = !1 !== f.zoomEnabled;
                this.hasNames = "category" === e || !0 === f.categories;
                this.categories = f.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === e;
                this.isDatetimeAxis = "datetime" === e;
                this.isLinked = r(f.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = f.minRange || f.maxZoom;
                this.range = f.range;
                this.offset = f.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = F(f.crosshair, w(a.options.tooltip.crosshairs)[b ? 0 : 1], !1);
                var h, f = this.options.events; - 1 === q(this, a.axes) && (b ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && b && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (h in f) A(this, h, f[h]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function(a) {
                this.options = D(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], D(m[this.coll], a))
            },
            defaultLabelFormatter: function() {
                var c = this.axis,
                    b = this.value,
                    f = c.categories,
                    h = this.dateTimeLabelFormat,
                    l = m.lang.numericSymbols,
                    q = l && l.length,
                    d, u = c.options.labels.format,
                    c = c.isLog ? b : c.tickInterval;
                if (u) d = e(u, this);
                else if (f) d = b;
                else if (h) d = a.dateFormat(h, b);
                else if (q && 1E3 <= c) for (; q-- && void 0 === d;) f = Math.pow(1E3, q + 1), c >= f && 0 === 10 * b % f && null !== l[q] && 0 !== b && (d = a.numberFormat(b / f, -1) + l[q]);
                void 0 === d && (d = 1E4 <= Math.abs(b) ? a.numberFormat(b, -1) : a.numberFormat(b, -1, void 0, ""));
                return d
            },
            getSeriesExtremes: function() {
                var a = this,
                    c = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                b(a.series, function(b) {
                    if (b.visible || !c.options.chart.ignoreHiddenSeries) {
                        var e = b.options,
                            h = e.threshold,
                            d;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= h && (h = null);
                        if (a.isXAxis) e = b.xData, e.length && (b = G(e), f(b) || b instanceof Date || (e = l(e, function(a) {
                            return f(a)
                        }), b = G(e)), a.dataMin = Math.min(F(a.dataMin, e[0]), b), a.dataMax = Math.max(F(a.dataMax, e[0]), E(e)));
                        else if (b.getExtremes(), d = b.dataMax, b = b.dataMin, r(b) && r(d) && (a.dataMin = Math.min(F(a.dataMin, b), b), a.dataMax = Math.max(F(a.dataMax, d), d)), r(h) && (a.threshold = h), !e.softThreshold || a.isLog) a.softThreshold = !1
                    }
                })
            },
            translate: function(a, c, b, e, h, l) {
                var d = this.linkedParent || this,
                    q = 1,
                    u = 0,
                    k = e ? d.oldTransA : d.transA;
                e = e ? d.oldMin : d.min;
                var w = d.minPixelPadding;
                h = (d.isOrdinal || d.isBroken || d.isLog && h) && d.lin2val;
                k || (k = d.transA);
                b && (q *= -1, u = d.len);
                d.reversed && (q *= -1, u -= q * (d.sector || d.len));
                c ? (a = (a * q + u - w) / k + e, h && (a = d.lin2val(a))) : (h && (a = d.val2lin(a)), "between" === l && (l = .5), a = q * (a - e) * k + u + q * w + (f(l) ? k * l * d.pointRange : 0));
                return a
            },
            toPixels: function(a, c) {
                return this.translate(a, !1, !this.horiz, null, !0) + (c ? 0 : this.pos)
            },
            toValue: function(a, c) {
                return this.translate(a - (c ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, c, b, e, h) {
                var l = this.chart,
                    d = this.left,
                    q = this.top,
                    u, k, w = b && l.oldChartHeight || l.chartHeight,
                    C = b && l.oldChartWidth || l.chartWidth,
                    p;
                u = this.transB;
                var v = function(a, c, b) {
                    if (a < c || a > b) e ? a = Math.min(Math.max(c, a), b) : p = !0;
                    return a
                };
                h = F(h, this.translate(a, null, null, b));
                a = b = Math.round(h + u);
                u = k = Math.round(w - h - u);
                f(h) ? this.horiz ? (u = q, k = w - this.bottom, a = b = v(a, d, d + this.width)) : (a = d, b = C - this.right, u = k = v(u, q, q + this.height)) : p = !0;
                return p && !e ? null : l.renderer.crispLine(["M", a, u, "L", b, k], c || 1)
            },
            getLinearTickPositions: function(a, c, b) {
                var e, h = d(Math.floor(c / a) * a),
                    l = d(Math.ceil(b / a) * a),
                    q = [];
                if (c === b && f(c)) return [c];
                for (c = h; c <= l;) {
                    q.push(c);
                    c = d(c + a);
                    if (c === e) break;
                    e = c
                }
                return q
            },
            getMinorTickPositions: function() {
                var a = this.options,
                    c = this.tickPositions,
                    b = this.minorTickInterval,
                    f = [],
                    e, h = this.pointRangePadding || 0;
                e = this.min - h;
                var h = this.max + h,
                    l = h - e;
                if (l && l / b < this.len / 3) if (this.isLog) for (h = c.length, e = 1; e < h; e++) f = f.concat(this.getLogTickPositions(b, c[e - 1], c[e], !0));
                else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) f = f.concat(this.getTimeTicks(this.normalizeTimeTickInterval(b), e, h, a.startOfWeek));
                else for (c = e + (c[0] - e) % b; c <= h; c += b) f.push(c);
                0 !== f.length && this.trimTicks(f, a.startOnTick, a.endOnTick);
                return f
            },
            adjustForMinRange: function() {
                var a = this.options,
                    c = this.min,
                    f = this.max,
                    e, h = this.dataMax - this.dataMin >= this.minRange,
                    l, d, q, u, k, w;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (r(a.min) || r(a.max) ? this.minRange = null : (b(this.series, function(a) {
                    u = a.xData;
                    for (d = k = a.xIncrement ? 1 : u.length - 1; 0 < d; d--) if (q = u[d] - u[d - 1], void 0 === l || q < l) l = q
                }), this.minRange = Math.min(5 * l, this.dataMax - this.dataMin)));
                f - c < this.minRange && (w = this.minRange, e = (w - f + c) / 2, e = [c - e, F(a.min, c - e)], h && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), c = E(e), f = [c + w, F(a.max, c + w)], h && (f[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), f = G(f), f - c < w && (e[0] = f - w, e[1] = F(a.min, f - w), c = E(e)));
                this.min = c;
                this.max = f
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : b(this.series, function(c) {
                    var b = c.closestPointRange;
                    !c.noSharedTooltip && r(b) && (a = r(a) ? Math.min(a, b) : b)
                });
                return a
            },
            nameToX: function(a) {
                var c = h(this.categories),
                    b = c ? this.categories : this.names,
                    f = a.options.x,
                    e;
                a.series.requireSorting = !1;
                r(f) || (f = !1 === this.options.nameToX ? a.series.autoIncrement() : q(a.name, b)); - 1 === f ? c || (e = b.length) : e = f;
                this.names[e] = a.name;
                return e
            },
            updateNames: function() {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, b(this.series || [], function(c) {
                    c.processedXData || (c.processData(), c.generatePoints());
                    b(c.points, function(b, f) {
                        var e;
                        b.options && void 0 === b.options.x && (e = a.nameToX(b), e !== b.x && (b.x = e, c.xData[f] = e))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var c = this,
                    f = c.max - c.min,
                    e = c.axisPointRange || 0,
                    h, l = 0,
                    d = 0,
                    q = c.linkedParent,
                    k = !! c.categories,
                    w = c.transA,
                    C = c.isXAxis;
                if (C || k || e) q ? (l = q.minPointOffset, d = q.pointRangePadding) : (h = c.getClosest(), b(c.series, function(a) {
                    var b = k ? 1 : C ? F(a.options.pointRange, h, 0) : c.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    e = Math.max(e, b);
                    c.single || (l = Math.max(l, u(a) ? 0 : b / 2), d = Math.max(d, "on" === a ? 0 : b))
                })), q = c.ordinalSlope && h ? c.ordinalSlope / h : 1, c.minPointOffset = l *= q, c.pointRangePadding = d *= q, c.pointRange = Math.min(e, f), C && (c.closestPointRange = h);
                a && (c.oldTransA = w);
                c.translationSlope = c.transA = w = c.len / (f + d || 1);
                c.transB = c.horiz ? c.left : c.bottom;
                c.minPixelPadding = w * l
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(a) {
                var e = this,
                    h = e.chart,
                    l = e.options,
                    q = e.isLog,
                    u = e.log2lin,
                    w = e.isDatetimeAxis,
                    C = e.isXAxis,
                    p = e.isLinked,
                    v = l.maxPadding,
                    g = l.minPadding,
                    D = l.tickInterval,
                    n = l.tickPixelInterval,
                    J = e.categories,
                    m = e.threshold,
                    M = e.softThreshold,
                    t, I, y, A;
                w || J || p || this.getTickAmount();
                y = F(e.userMin, l.min);
                A = F(e.userMax, l.max);
                p ? (e.linkedParent = h[e.coll][l.linkedTo], h = e.linkedParent.getExtremes(), e.min = F(h.min, h.dataMin), e.max = F(h.max, h.dataMax), l.type !== e.linkedParent.options.type && k(11, 1)) : (!M && r(m) && (e.dataMin >= m ? (t = m, g = 0) : e.dataMax <= m && (I = m, v = 0)), e.min = F(y, t, e.dataMin), e.max = F(A, I, e.dataMax));
                q && (!a && 0 >= Math.min(e.min, F(e.dataMin, e.min)) && k(10, 1), e.min = d(u(e.min), 15), e.max = d(u(e.max), 15));
                e.range && r(e.max) && (e.userMin = e.min = y = Math.max(e.min, e.minFromRange()), e.userMax = A = e.max, e.range = null);
                B(e, "foundExtremes");
                e.beforePadding && e.beforePadding();
                e.adjustForMinRange();
                !(J || e.axisPointRange || e.usePercentage || p) && r(e.min) && r(e.max) && (u = e.max - e.min) && (!r(y) && g && (e.min -= u * g), !r(A) && v && (e.max += u * v));
                f(l.floor) && (e.min = Math.max(e.min, l.floor));
                f(l.ceiling) && (e.max = Math.min(e.max, l.ceiling));
                M && r(e.dataMin) && (m = m || 0, !r(y) && e.min < m && e.dataMin >= m ? e.min = m : !r(A) && e.max > m && e.dataMax <= m && (e.max = m));
                e.tickInterval = e.min === e.max || void 0 === e.min || void 0 === e.max ? 1 : p && !D && n === e.linkedParent.options.tickPixelInterval ? D = e.linkedParent.tickInterval : F(D, this.tickAmount ? (e.max - e.min) / Math.max(this.tickAmount - 1, 1) : void 0, J ? 1 : (e.max - e.min) * n / Math.max(e.len, n));
                C && !a && b(e.series, function(a) {
                    a.processData(e.min !== e.oldMin || e.max !== e.oldMax)
                });
                e.setAxisTranslation(!0);
                e.beforeSetTickPositions && e.beforeSetTickPositions();
                e.postProcessTickInterval && (e.tickInterval = e.postProcessTickInterval(e.tickInterval));
                e.pointRange && !D && (e.tickInterval = Math.max(e.pointRange, e.tickInterval));
                a = F(l.minTickInterval, e.isDatetimeAxis && e.closestPointRange);
                !D && e.tickInterval < a && (e.tickInterval = a);
                w || q || D || (e.tickInterval = H(e.tickInterval, null, c(e.tickInterval), F(l.allowDecimals, !(.5 < e.tickInterval && 5 > e.tickInterval && 1E3 < e.max && 9999 > e.max)), !! this.tickAmount));
                this.tickAmount || (e.tickInterval = e.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a = this.options,
                    c, b = a.tickPositions,
                    e = a.tickPositioner,
                    f = a.startOnTick,
                    h = a.endOnTick,
                    l;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = c = b && b.slice();
                !c && (c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), c.length > this.len && (c = [c[0], c.pop()]), this.tickPositions = c, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = c = e);
                this.isLinked || (this.trimTicks(c, f, h), this.min === this.max && r(this.min) && !this.tickAmount && (l = !0, this.min -= .5, this.max += .5), this.single = l, b || e || this.adjustTickAmount())
            },
            trimTicks: function(a, c, b) {
                var e = a[0],
                    f = a[a.length - 1],
                    h = this.minPointOffset || 0;
                if (c) this.min = e;
                else for (; this.min - h > a[0];) a.shift();
                if (b) this.max = f;
                else for (; this.max + h < a[a.length - 1];) a.pop();
                0 === a.length && r(e) && a.push((f + e) / 2)
            },
            alignToOthers: function() {
                var a = {},
                    c, e = this.options;
                !1 !== this.chart.options.chart.alignTicks && !1 !== e.alignTicks && b(this.chart[this.coll], function(b) {
                    var e = b.options,
                        e = [b.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    b.series.length && (a[e] ? c = !0 : a[e] = 1)
                });
                return c
            },
            getTickAmount: function() {
                var a = this.options,
                    c = a.tickAmount,
                    b = a.tickPixelInterval;
                !r(a.tickInterval) && this.len < b && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (c = 2);
                !c && this.alignToOthers() && (c = Math.ceil(this.len / b) + 1);
                4 > c && (this.finalTickAmt = c, c = 5);
                this.tickAmount = c
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    c = this.tickPositions,
                    b = this.tickAmount,
                    e = this.finalTickAmt,
                    f = c && c.length;
                if (f < b) {
                    for (; c.length < b;) c.push(d(c[c.length - 1] + a));
                    this.transA *= (f - 1) / (b - 1);
                    this.max = c[c.length - 1]
                } else f > b && (this.tickInterval *= 2, this.setTickPositions());
                if (r(e)) {
                    for (a = b = c.length; a--;)(3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < b - 1) && c.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function() {
                var a, c;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                c = this.len !== this.oldAxisLength;
                b(this.series, function(c) {
                    if (c.isDirtyData || c.isDirty || c.xAxis.isDirty) a = !0
                });
                c || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = c || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function(a, c, e, f, h) {
                var l = this,
                    d = l.chart;
                e = F(e, !0);
                b(l.series, function(a) {
                    delete a.kdTree
                });
                h = v(h, {
                    min: a,
                    max: c
                });
                B(l, "setExtremes", h, function() {
                    l.userMin = a;
                    l.userMax = c;
                    l.eventArgs = h;
                    e && d.redraw(f)
                })
            },
            zoom: function(a, c) {
                var b = this.dataMin,
                    e = this.dataMax,
                    f = this.options,
                    h = Math.min(b, F(f.min, b)),
                    f = Math.max(e, F(f.max, e));
                this.allowZoomOutside || (r(b) && a <= h && (a = h), r(e) && c >= f && (c = f));
                this.displayBtn = void 0 !== a || void 0 !== c;
                this.setExtremes(a, c, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function() {
                var a = this.chart,
                    c = this.options,
                    b = c.offsetLeft || 0,
                    e = this.horiz,
                    f = F(c.width, a.plotWidth - b + (c.offsetRight || 0)),
                    h = F(c.height, a.plotHeight),
                    l = F(c.top, a.plotTop),
                    c = F(c.left, a.plotLeft + b),
                    b = /%$/;
                b.test(h) && (h = Math.round(parseFloat(h) / 100 * a.plotHeight));
                b.test(l) && (l = Math.round(parseFloat(l) / 100 * a.plotHeight + a.plotTop));
                this.left = c;
                this.top = l;
                this.width = f;
                this.height = h;
                this.bottom = a.chartHeight - h - l;
                this.right = a.chartWidth - f - c;
                this.len = Math.max(e ? f : h, 0);
                this.pos = e ? c : l
            },
            getExtremes: function() {
                var a = this.isLog,
                    c = this.lin2log;
                return {
                    min: a ? d(c(this.min)) : this.min,
                    max: a ? d(c(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var c = this.isLog,
                    b = this.lin2log,
                    e = c ? b(this.min) : this.min,
                    c = c ? b(this.max) : this.max;
                null === a ? a = e : e > a ? a = e : c < a && (a = c);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                a = (F(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function(a) {
                var c = this.options,
                    b = c[a + "Length"],
                    e = F(c[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (e && b) return "inside" === c[a + "Position"] && (b = -b), [b, e]
            },
            labelMetrics: function() {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    c = this.horiz,
                    e = this.tickInterval,
                    f = e,
                    h = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e),
                    l, d = a.rotation,
                    q = this.labelMetrics(),
                    u, k = Number.MAX_VALUE,
                    w, C = function(a) {
                        a /= h || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * e
                    };
                c ? (w = !a.staggerLines && !a.step && (r(d) ? [d] : h < F(a.autoRotationLimit, 80) && a.autoRotation)) && b(w, function(a) {
                    var c;
                    if (a === d || a && -90 <= a && 90 >= a) u = C(Math.abs(q.h / Math.sin(n * a))), c = u + Math.abs(a / 360), c < k && (k = c, l = a, f = u)
                }) : a.step || (f = C(q.h));
                this.autoRotation = w;
                this.labelRotation = F(l, d);
                return f
            },
            getSlotWidth: function() {
                var a = this.chart,
                    c = this.horiz,
                    b = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    f = a.margin[3];
                return c && 2 > (b.step || 0) && !b.rotation && (this.staggerLines || 1) * a.plotWidth / e || !c && (f && f - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    c = a.renderer,
                    e = this.tickPositions,
                    f = this.ticks,
                    h = this.options.labels,
                    l = this.horiz,
                    d = this.getSlotWidth(),
                    q = Math.max(1, Math.round(d - 2 * (h.padding || 5))),
                    k = {},
                    w = this.labelMetrics(),
                    C = h.style && h.style.textOverflow,
                    p, v = 0,
                    g, F;
                u(h.rotation) || (k.rotation = h.rotation || 0);
                b(e, function(a) {
                    (a = f[a]) && a.labelLength > v && (v = a.labelLength)
                });
                this.maxLabelLength = v;
                if (this.autoRotation) v > q && v > w.h ? k.rotation = this.labelRotation : this.labelRotation = 0;
                else if (d && (p = {
                        width: q + "px"
                    }, !C)) for (p.textOverflow = "clip", g = e.length; !l && g--;) if (F = e[g], q = f[F].label) q.styles && "ellipsis" === q.styles.textOverflow ? q.css({
                    textOverflow: "clip"
                }) : f[F].labelLength > d && q.css({
                    width: d + "px"
                }), q.getBBox().height > this.len / e.length - (w.h - w.f) && (q.specCss = {
                    textOverflow: "ellipsis"
                });
                k.rotation && (p = {
                    width: (v > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, C || (p.textOverflow = "ellipsis"));
                if (this.labelAlign = h.align || this.autoLabelAlign(this.labelRotation)) k.align = this.labelAlign;
                b(e, function(a) {
                    var c = (a = f[a]) && a.label;
                    c && (c.attr(k), p && c.css(D(p, c.specCss)), delete c.specCss, a.rotation = k.rotation)
                });
                this.tickRotCorr = c.rotCorr(w.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || r(this.min) && r(this.max) && !! this.tickPositions
            },
            getOffset: function() {
                var a = this,
                    c = a.chart,
                    e = c.renderer,
                    f = a.options,
                    h = a.tickPositions,
                    l = a.ticks,
                    d = a.horiz,
                    q = a.side,
                    u = c.inverted ? [1, 0, 3, 2][q] : q,
                    k, w, C = 0,
                    p, v = 0,
                    g = f.title,
                    D = f.labels,
                    n = 0,
                    J = a.opposite,
                    m = c.axisOffset,
                    c = c.clipOffset,
                    H = [-1, 1, 1, -1][q],
                    B, t = f.className,
                    I = a.axisParent,
                    y = this.tickSize("tick");
                k = a.hasData();
                a.showAxis = w = k || F(f.showEmpty, !0);
                a.staggerLines = a.horiz && D.staggerLines;
                a.axisGroup || (a.gridGroup = e.g("grid").attr({
                    zIndex: f.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(I), a.axisGroup = e.g("axis").attr({
                    zIndex: f.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || "")).add(I), a.labelGroup = e.g("axis-labels").attr({
                    zIndex: D.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (t || "")).add(I));
                if (k || a.isLinked) b(h, function(c) {
                    l[c] ? l[c].addLabel() : l[c] = new M(a, c)
                }), a.renderUnsquish(), !1 === D.reserveSpace || 0 !== q && 2 !== q && {
                    1: "left",
                    3: "right"
                }[q] !== a.labelAlign && "center" !== a.labelAlign || b(h, function(a) {
                    n = Math.max(l[a].getLabelSize(), n)
                }), a.staggerLines && (n *= a.staggerLines, a.labelOffset = n * (a.opposite ? -1 : 1));
                else for (B in l) l[B].destroy(), delete l[B];
                g && g.text && !1 !== g.enabled && (a.axisTitle || ((B = g.textAlign) || (B = (d ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: J ? "right" : "left",
                    middle: "center",
                    high: J ? "left" : "right"
                })[g.align]), a.axisTitle = e.text(g.text, 0, 0, g.useHTML).attr({
                    zIndex: 7,
                    rotation: g.rotation || 0,
                    align: B
                }).addClass("highcharts-axis-title").css(g.style).add(a.axisGroup), a.axisTitle.isNew = !0), w && (C = a.axisTitle.getBBox()[d ? "height" : "width"], p = g.offset, v = r(p) ? 0 : F(g.margin, d ? 5 : 10)), a.axisTitle[w ? "show" : "hide"](!0));
                a.renderLine();
                a.offset = H * F(f.offset, m[q]);
                a.tickRotCorr = a.tickRotCorr || {
                        x: 0,
                        y: 0
                    };
                e = 0 === q ? -a.labelMetrics().h : 2 === q ? a.tickRotCorr.y : 0;
                v = Math.abs(n) + v;
                n && (v = v - e + H * (d ? F(D.y, a.tickRotCorr.y + 8 * H) : D.x));
                a.axisTitleMargin = F(p, v);
                m[q] = Math.max(m[q], a.axisTitleMargin + C + H * a.offset, v, k && h.length && y ? y[0] : 0);
                f = f.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                c[u] = Math.max(c[u], f)
            },
            getLinePath: function(a) {
                var c = this.chart,
                    b = this.opposite,
                    e = this.offset,
                    f = this.horiz,
                    h = this.left + (b ? this.width : 0) + e,
                    e = c.chartHeight - this.bottom - (b ? this.height : 0) + e;
                b && (a *= -1);
                return c.renderer.crispLine(["M", f ? this.left : h, f ? e : this.top, "L", f ? c.chartWidth - this.right : h, f ? e : c.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    c = this.left,
                    e = this.top,
                    b = this.len,
                    f = this.options.title,
                    h = a ? c : e,
                    l = this.opposite,
                    d = this.offset,
                    q = f.x || 0,
                    u = f.y || 0,
                    k = this.chart.renderer.fontMetrics(f.style && f.style.fontSize, this.axisTitle).f,
                    b = {
                        low: h + (a ? 0 : b),
                        middle: h + b / 2,
                        high: h + (a ? b : 0)
                    }[f.align],
                    c = (a ? e + this.height : c) + (a ? 1 : -1) * (l ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? k : 0);
                return {
                    x: a ? b + q : c + (l ? this.width : 0) + d + q,
                    y: a ? c + u - (l ? this.height : 0) + d : b + u
                }
            },
            render: function() {
                var a = this,
                    c = a.chart,
                    e = c.renderer,
                    h = a.options,
                    l = a.isLog,
                    d = a.lin2log,
                    q = a.isLinked,
                    u = a.tickPositions,
                    k = a.axisTitle,
                    w = a.ticks,
                    C = a.minorTicks,
                    p = a.alternateBands,
                    v = h.stackLabels,
                    g = h.alternateGridColor,
                    D = a.tickmarkOffset,
                    F = a.axisLine,
                    n = c.hasRendered && f(a.oldMin),
                    m = a.showAxis,
                    r = y(e.globalAnimation),
                    H, B;
                a.labelEdge.length = 0;
                a.overlap = !1;
                b([w, C, p], function(a) {
                    for (var c in a) a[c].isActive = !1
                });
                if (a.hasData() || q) a.minorTickInterval && !a.categories && b(a.getMinorTickPositions(), function(c) {
                    C[c] || (C[c] = new M(a, c, "minor"));
                    n && C[c].isNew && C[c].render(null, !0);
                    C[c].render(null, !1, 1)
                }), u.length && (b(u, function(c, b) {
                    if (!q || c >= a.min && c <= a.max) w[c] || (w[c] = new M(a, c)), n && w[c].isNew && w[c].render(b, !0, .1), w[c].render(b)
                }), D && (0 === a.min || a.single) && (w[-1] || (w[-1] = new M(a, -1, null, !0)), w[-1].render(-1))), g && b(u, function(b, e) {
                    B = void 0 !== u[e + 1] ? u[e + 1] + D : a.max - D;
                    0 === e % 2 && b < a.max && B <= a.max + (c.polar ? -D : D) && (p[b] || (p[b] = new I(a)), H = b + D, p[b].options = {
                        from: l ? d(H) : H,
                        to: l ? d(B) : B,
                        color: g
                    }, p[b].render(), p[b].isActive = !0)
                }), a._addedPlotLB || (b((h.plotLines || []).concat(h.plotBands || []), function(c) {
                    a.addPlotBandOrLine(c)
                }), a._addedPlotLB = !0);
                b([w, C, p], function(a) {
                    var b, e, f = [],
                        h = r.duration;
                    for (b in a) a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, f.push(b));
                    J(function() {
                        for (e = f.length; e--;) a[f[e]] && !a[f[e]].isActive && (a[f[e]].destroy(), delete a[f[e]])
                    }, a !== p && c.hasRendered && h ? h : 0)
                });
                F && (F[F.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(F.strokeWidth())
                }), F.isPlaced = !0, F[m ? "show" : "hide"](!0));
                k && m && (k[k.isNew ? "attr" : "animate"](a.getTitlePosition()), k.isNew = !1);
                v && v.enabled && a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function() {
                this.visible && (this.render(), b(this.plotLinesAndBands, function(a) {
                    a.render()
                }));
                b(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            destroy: function(a) {
                var c = this,
                    e = c.stacks,
                    f, h = c.plotLinesAndBands,
                    l;
                a || C(c);
                for (f in e) p(e[f]), e[f] = null;
                b([c.ticks, c.minorTicks, c.alternateBands], function(a) {
                    p(a)
                });
                if (h) for (a = h.length; a--;) h[a].destroy();
                b("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
                    c[a] && (c[a] = c[a].destroy())
                });
                h = ["names", "series", "userMax", "userMin"];
                for (l in c) c.hasOwnProperty(l) && -1 === q(l, h) && delete c[l]
            },
            drawCrosshair: function(a, c) {
                var b, e = this.crosshair,
                    f, h = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (r(c) || !F(e.snap, !0)) ? (F(e.snap, !0) ? r(c) && (b = this.isXAxis ? c.plotX : this.len - c.plotY) : b = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, b = this.isRadial ? this.getPlotLinePath(this.isXAxis ? c.x : F(c.stackY, c.y)) || null : this.getPlotLinePath(null, null, null, null, b) || null, null === b ? this.hideCrosshair() : (f = this.categories && !this.isRadial, h || (this.cross = h = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (f ? "category " : "thin ") + e.className).attr({
                    zIndex: F(e.zIndex, 2)
                }).add(), h.attr({
                    stroke: e.color || (f ? g("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                    "stroke-width": F(e.width, 1)
                }), e.dashStyle && h.attr({
                    dashstyle: e.dashStyle
                })), h.show().attr({
                    d: b
                }), f && h.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a)) : this.hideCrosshair()
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        };
        v(a.Axis.prototype, t)
    })(K);
    (function(a) {
        var A = a.Axis,
            y = a.Date,
            E = a.defaultOptions,
            G = a.defined,
            t = a.each,
            g = a.extend,
            d = a.getMagnitude,
            m = a.getTZOffset,
            r = a.grep,
            n = a.normalizeTickInterval,
            p = a.pick,
            b = a.timeUnits;
        A.prototype.getTimeTicks = function(a, d, n, e) {
            var c = [],
                l = {},
                q = E.global.useUTC,
                h, f = new y(d - m(d)),
                u = y.hcMakeTime,
                D = a.unitRange,
                H = a.count;
            if (G(d)) {
                f[y.hcSetMilliseconds](D >= b.second ? 0 : H * Math.floor(f.getMilliseconds() / H));
                if (D >= b.second) f[y.hcSetSeconds](D >= b.minute ? 0 : H * Math.floor(f.getSeconds() / H));
                if (D >= b.minute) f[y.hcSetMinutes](D >= b.hour ? 0 : H * Math.floor(f[y.hcGetMinutes]() / H));
                if (D >= b.hour) f[y.hcSetHours](D >= b.day ? 0 : H * Math.floor(f[y.hcGetHours]() / H));
                if (D >= b.day) f[y.hcSetDate](D >= b.month ? 1 : H * Math.floor(f[y.hcGetDate]() / H));
                D >= b.month && (f[y.hcSetMonth](D >= b.year ? 0 : H * Math.floor(f[y.hcGetMonth]() / H)), h = f[y.hcGetFullYear]());
                if (D >= b.year) f[y.hcSetFullYear](h - h % H);
                if (D === b.week) f[y.hcSetDate](f[y.hcGetDate]() - f[y.hcGetDay]() + p(e, 1));
                d = 1;
                if (y.hcTimezoneOffset || y.hcGetTimezoneOffset) f = f.getTime(), f = new y(f + m(f));
                h = f[y.hcGetFullYear]();
                e = f.getTime();
                for (var F = f[y.hcGetMonth](), I = f[y.hcGetDate](), C = !q || !! y.hcGetTimezoneOffset, w = (b.day + (q ? m(f) : 6E4 * f.getTimezoneOffset())) % b.day; e < n;) c.push(e), e = D === b.year ? u(h + d * H, 0) : D === b.month ? u(h, F + d * H) : !C || D !== b.day && D !== b.week ? e + D * H : u(h, F, I + d * H * (D === b.day ? 1 : 7)), d++;
                c.push(e);
                t(r(c, function(a) {
                    return D <= b.hour && a % b.day === w
                }), function(a) {
                    l[a] = "day"
                })
            }
            c.info = g(a, {
                higherRanks: l,
                totalRange: D * H
            });
            return c
        };
        A.prototype.normalizeTimeTickInterval = function(a, p) {
            var g = p || [
                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ["second", [1, 2, 5, 10, 15, 30]],
                        ["minute", [1, 2, 5, 10, 15, 30]],
                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                        ["day", [1, 2]],
                        ["week", [1, 2]],
                        ["month", [1, 2, 3, 4, 6]],
                        ["year", null]
                    ],
                e = g[g.length - 1],
                c = b[e[0]],
                l = e[1],
                q;
            for (q = 0; q < g.length && !(e = g[q], c = b[e[0]], l = e[1], g[q + 1] && a <= (c * l[l.length - 1] + b[g[q + 1][0]]) / 2); q++);
            c === b.year && a < 5 * c && (l = [1, 2, 5]);
            g = n(a / c, l, "year" === e[0] ? Math.max(d(a / c), 1) : 1);
            return {
                unitRange: c,
                count: g,
                unitName: e[0]
            }
        }
    })(K);
    (function(a) {
        var A = a.Axis,
            y = a.getMagnitude,
            E = a.map,
            G = a.normalizeTickInterval,
            t = a.pick;
        A.prototype.getLogTickPositions = function(a, d, m, r) {
            var n = this.options,
                p = this.len,
                b = this.lin2log,
                k = this.log2lin,
                v = [];
            r || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), v = this.getLinearTickPositions(a, d, m);
            else if (.08 <= a) for (var p = Math.floor(d), B, e, c, l, q, n = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; p < m + 1 && !q; p++) for (e = n.length, B = 0; B < e && !q; B++) c = k(b(p) * n[B]), c > d && (!r || l <= m) && void 0 !== l && v.push(l), l > m && (q = !0), l = c;
            else d = b(d), m = b(m), a = n[r ? "minorTickInterval" : "tickInterval"], a = t("auto" === a ? null : a, this._minorAutoInterval, n.tickPixelInterval / (r ? 5 : 1) * (m - d) / ((r ? p / this.tickPositions.length : p) || 1)), a = G(a, null, y(a)), v = E(this.getLinearTickPositions(a, d, m), k), r || (this._minorAutoInterval = a / 5);
            r || (this.tickInterval = a);
            return v
        };
        A.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        A.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.dateFormat,
            E = a.each,
            G = a.extend,
            t = a.format,
            g = a.isNumber,
            d = a.map,
            m = a.merge,
            r = a.pick,
            n = a.splat,
            p = a.stop,
            b = a.syncTimeout,
            k = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, b) {
                this.chart = a;
                this.options = b;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = b.split && !a.inverted;
                this.shared = b.shared || this.split;
                this.split ? this.label = this.chart.renderer.g("tooltip") : (this.label = a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
                    padding: b.padding,
                    r: b.borderRadius,
                    display: "none"
                }), this.label.attr({
                    fill: b.backgroundColor,
                    "stroke-width": b.borderWidth
                }).css(b.style).shadow(b.shadow));
                this.label.attr({
                    zIndex: 8
                }).add()
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart, m(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function(a, b, e, c) {
                var l = this,
                    d = l.now,
                    h = !1 !== l.options.animation && !l.isHidden && (1 < Math.abs(a - d.x) || 1 < Math.abs(b - d.y)),
                    f = l.followPointer || 1 < l.len;
                G(d, {
                    x: h ? (2 * d.x + a) / 3 : a,
                    y: h ? (d.y + b) / 2 : b,
                    anchorX: f ? void 0 : h ? (2 * d.anchorX + e) / 3 : e,
                    anchorY: f ? void 0 : h ? (d.anchorY + c) / 2 : c
                });
                l.label.attr(d);
                h && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    l && l.move(a, b, e, c)
                }, 32))
            },
            hide: function(a) {
                var d = this;
                clearTimeout(this.hideTimer);
                a = r(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = b(function() {
                    d.label[a ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, a))
            },
            getAnchor: function(a, b) {
                var e, c = this.chart,
                    l = c.inverted,
                    q = c.plotTop,
                    h = c.plotLeft,
                    f = 0,
                    u = 0,
                    k, p;
                a = n(a);
                e = a[0].tooltipPos;
                this.followPointer && b && (void 0 === b.chartX && (b = c.pointer.normalize(b)), e = [b.chartX - c.plotLeft, b.chartY - q]);
                e || (E(a, function(a) {
                    k = a.series.yAxis;
                    p = a.series.xAxis;
                    f += a.plotX + (!l && p ? p.left - h : 0);
                    u += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!l && k ? k.top - q : 0)
                }), f /= a.length, u /= a.length, e = [l ? c.plotWidth - u : f, this.shared && !l && 1 < a.length && b ? b.chartY - q : l ? c.plotHeight - f : u]);
                return d(e, Math.round)
            },
            getPosition: function(a, b, e) {
                var c = this.chart,
                    l = this.distance,
                    d = {},
                    h = e.h || 0,
                    f, u = ["y", c.chartHeight, b, e.plotY + c.plotTop, c.plotTop, c.plotTop + c.plotHeight],
                    k = ["x", c.chartWidth, a, e.plotX + c.plotLeft, c.plotLeft, c.plotLeft + c.plotWidth],
                    p = !this.followPointer && r(e.ttBelow, !c.inverted === !! e.negative),
                    g = function(a, c, b, e, f, u) {
                        var k = b < e - l,
                            w = e + l + b < c,
                            C = e - l - b;
                        e += l;
                        if (p && w) d[a] = e;
                        else if (!p && k) d[a] = C;
                        else if (k) d[a] = Math.min(u - b, 0 > C - h ? C : C - h);
                        else if (w) d[a] = Math.max(f, e + h + b > c ? e : e + h);
                        else return !1
                    },
                    n = function(a, c, b, e) {
                        var f;
                        e < l || e > c - l ? f = !1 : d[a] = e < b / 2 ? 1 : e > c - b / 2 ? c - b - 2 : e - b / 2;
                        return f
                    },
                    C = function(a) {
                        var c = u;
                        u = k;
                        k = c;
                        f = a
                    },
                    w = function() {
                        !1 !== g.apply(0, u) ? !1 !== n.apply(0, k) || f || (C(!0), w()) : f ? d.x = d.y = 0 : (C(!0), w())
                    };
                (c.inverted || 1 < this.len) && C();
                w();
                return d
            },
            defaultFormatter: function(a) {
                var b = this.points || n(this),
                    e;
                e = [a.tooltipFooterHeaderFormatter(b[0])];
                e = e.concat(a.bodyFormatter(b));
                e.push(a.tooltipFooterHeaderFormatter(b[0], !0));
                return e
            },
            refresh: function(a, b) {
                var e = this.chart,
                    c = this.label,
                    l = this.options,
                    d, h, f, u = {},
                    k, g = [];
                k = l.formatter || this.defaultFormatter;
                var u = e.hoverPoints,
                    F = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = n(a)[0].series.tooltipOptions.followPointer;
                f = this.getAnchor(a, b);
                d = f[0];
                h = f[1];
                !F || a.series && a.series.noSharedTooltip ? u = a.getLabelConfig() : (e.hoverPoints = a, u && E(u, function(a) {
                    a.setState()
                }), E(a, function(a) {
                    a.setState("hover");
                    g.push(a.getLabelConfig())
                }), u = {
                    x: a[0].category,
                    y: a[0].y
                }, u.points = g, this.len = g.length, a = a[0]);
                k = k.call(u, this);
                u = a.series;
                this.distance = r(u.tooltipOptions.distance, 16);
                !1 === k ? this.hide() : (this.isHidden && (p(c), c.attr({
                    opacity: 1,
                    display: "block"
                }).show()), this.split ? this.renderSplit(k, e.hoverPoints) : (c.attr({
                    text: k.join ? k.join("") : k
                }), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + r(a.colorIndex, u.colorIndex)), c.attr({
                    stroke: l.borderColor || a.color || u.color || "#666666"
                }), this.updatePosition({
                    plotX: d,
                    plotY: h,
                    negative: a.negative,
                    ttBelow: a.ttBelow,
                    h: f[2] || 0
                })), this.isHidden = !1)
            },
            renderSplit: function(b, d) {
                var e = this,
                    c = [],
                    l = this.chart,
                    q = l.renderer,
                    h = !0,
                    f = this.options,
                    u;
                E(b.slice(0, b.length - 1), function(a, b) {
                    var k = d[b - 1] || {
                                isHeader: !0,
                                plotX: d[0].plotX
                            },
                        p = k.series || e,
                        C = p.tt,
                        w = k.series || {},
                        g = "highcharts-color-" + r(k.colorIndex, w.colorIndex, "none");
                    C || (p.tt = C = q.label(null, null, null, k.isHeader && "callout").addClass("highcharts-tooltip-box " + g).attr({
                        padding: f.padding,
                        r: f.borderRadius,
                        fill: f.backgroundColor,
                        stroke: k.color || w.color || "#333333",
                        "stroke-width": f.borderWidth
                    }).add(e.label), k.series && (C.connector = q.path().addClass("highcharts-tooltip-connector " + g).attr({
                        "stroke-width": w.options.lineWidth || 2,
                        stroke: k.color || w.color || "#666666"
                    }).add(e.label), A(k.series, "hide", function() {
                        var a = this.tt;
                        a.connector = a.connector.destroy();
                        a.destroy();
                        this.tt = void 0
                    })));
                    C.isActive = !0;
                    C.attr({
                        text: a
                    });
                    w = C.getBBox();
                    k.isHeader ? (u = w.height, g = k.plotX + l.plotLeft - w.width / 2) : g = k.plotX + l.plotLeft - r(f.distance, 16) - w.width;
                    0 > g && (h = !1);
                    w = (k.series && k.series.yAxis && k.series.yAxis.pos) + (k.plotY || 0);
                    w -= l.plotTop;
                    c.push({
                        target: k.isHeader ? l.plotHeight + u : w,
                        rank: k.isHeader ? 1 : 0,
                        size: p.tt.getBBox().height + 1,
                        point: k,
                        x: g,
                        tt: C
                    })
                });
                E(l.series, function(a) {
                    var c = a.tt;
                    c && (c.isActive ? c.isActive = !1 : (c.connector = c.connector.destroy(), c.destroy(), a.tt = void 0))
                });
                a.distribute(c, l.plotHeight + u);
                E(c, function(a) {
                    var c = a.point,
                        b = a.tt,
                        e;
                    e = {
                        display: void 0 === a.pos ? "none" : "",
                        x: h || c.isHeader ? a.x : c.plotX + l.plotLeft + r(f.distance, 16),
                        y: a.pos + l.plotTop
                    };
                    c.isHeader && (e.anchorX = c.plotX + l.plotLeft, e.anchorY = e.y - 100);
                    b.attr(e);
                    c.isHeader || b.connector.attr({
                        d: ["M", c.plotX + l.plotLeft, c.plotY + c.series.yAxis.pos, "L", h ? c.plotX + l.plotLeft - r(f.distance, 16) : c.plotX + l.plotLeft + r(f.distance, 16), a.pos + l.plotTop + b.getBBox().height / 2]
                    })
                })
            },
            updatePosition: function(a) {
                var b = this.chart,
                    e = this.label,
                    e = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a);
                this.move(Math.round(e.x), Math.round(e.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop)
            },
            getXDateFormat: function(a, b, e) {
                var c;
                b = b.dateTimeLabelFormats;
                var l = e && e.closestPointRange,
                    d, h = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    f, u = "millisecond";
                if (l) {
                    f = y("%m-%d %H:%M:%S.%L", a.x);
                    for (d in k) {
                        if (l === k.week && +y("%w", a.x) === e.options.startOfWeek && "00:00:00.000" === f.substr(6)) {
                            d = "week";
                            break
                        }
                        if (k[d] > l) {
                            d = u;
                            break
                        }
                        if (h[d] && f.substr(h[d]) !== "01-01 00:00:00.000".substr(h[d])) break;
                        "week" !== d && (u = d)
                    }
                    d && (c = b[d])
                } else c = b.day;
                return c || b.year
            },
            tooltipFooterHeaderFormatter: function(a, b) {
                var e = b ? "footer" : "header",
                    c = a.series,
                    l = c.tooltipOptions,
                    d = l.xDateFormat,
                    h = c.xAxis,
                    f = h && "datetime" === h.options.type && g(a.key),
                    e = l[e + "Format"];
                f && !d && (d = this.getXDateFormat(a, l, h));
                f && d && (e = e.replace("{point.key}", "{point.key:" + d + "}"));
                return t(e, {
                    point: a,
                    series: c
                })
            },
            bodyFormatter: function(a) {
                return d(a, function(a) {
                    var b = a.series.tooltipOptions;
                    return (b.pointFormatter || a.point.tooltipFormatter).call(a.point, b.pointFormat)
                })
            }
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.attr,
            E = a.charts,
            G = a.color,
            t = a.css,
            g = a.defined,
            d = a.doc,
            m = a.each,
            r = a.extend,
            n = a.fireEvent,
            p = a.offset,
            b = a.pick,
            k = a.removeEvent,
            v = a.splat,
            B = a.Tooltip,
            e = a.win;
        a.hasTouch = d && void 0 !== d.documentElement.ontouchstart;
        a.Pointer = function(a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function(a, e) {
                this.options = e;
                this.chart = a;
                this.runChartClick = e.chart.events && !! e.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                B && e.tooltip.enabled && (a.tooltip = new B(a, e.tooltip), this.followTouchMove = b(e.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function() {
                var a = this.chart,
                    b = a.options.chart.zoomType,
                    e = /x/.test(b),
                    b = /y/.test(b),
                    a = a.inverted;
                this.zoomX = e;
                this.zoomY = b;
                this.zoomHor = e && !a || b && a;
                this.zoomVert = b && !a || e && a;
                this.hasZoom = e || b
            },
            normalize: function(a, b) {
                var d, h;
                a = a || e.event;
                a.target || (a.target = a.srcElement);
                h = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = p(this.chart.container));
                void 0 === h.pageX ? (d = Math.max(a.x, a.clientX - b.left), h = a.y) : (d = h.pageX - b.left, h = h.pageY - b.top);
                return r(a, {
                    chartX: Math.round(d),
                    chartY: Math.round(h)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                m(this.chart.axes, function(e) {
                    b[e.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: e,
                        value: e.toValue(a[e.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            runPointActions: function(c) {
                var e = this.chart,
                    q = e.series,
                    h = e.tooltip,
                    f = h ? h.shared : !1,
                    u = !0,
                    k = e.hoverPoint,
                    p = e.hoverSeries,
                    g, n, C, w = [],
                    J;
                if (!f && !p) for (g = 0; g < q.length; g++) if (q[g].directTouch || !q[g].options.stickyTracking) q = [];
                p && (f ? p.noSharedTooltip : p.directTouch) && k ? w = [k] : (f || !p || p.options.stickyTracking || (q = [p]), m(q, function(a) {
                    n = a.noSharedTooltip && f;
                    C = !f && a.directTouch;
                    a.visible && !n && !C && b(a.options.enableMouseTracking, !0) && (J = a.searchPoint(c, !n && 1 === a.kdDimensions)) && J.series && w.push(J)
                }), w.sort(function(a, c) {
                    var b = a.distX - c.distX,
                        e = a.dist - c.dist;
                    return 0 !== b ? b : 0 !== e ? e : a.series.group.zIndex > c.series.group.zIndex ? -1 : 1
                }));
                if (f) for (g = w.length; g--;)(w[g].clientX !== w[0].clientX || w[g].series.noSharedTooltip) && w.splice(g, 1);
                if (w[0] && (w[0] !== this.hoverPoint || h && h.isHidden)) {
                    if (f && !w[0].series.noSharedTooltip) {
                        for (g = 0; 0 <= g; g--) w[g].onMouseOver(c, w[g] !== (p && p.directTouch && k || w[0]));
                        if (p && p.directTouch && k && k !== w[0]) k.onMouseOver(c, !1);
                        w.length && h && h.refresh(w.sort(function(a, c) {
                            return a.series.index - c.series.index
                        }), c)
                    } else if (h && h.refresh(w[0], c), !p || !p.directTouch) w[0].onMouseOver(c);
                    this.prevKDPoint = w[0];
                    u = !1
                }
                u && (q = p && p.tooltipOptions.followPointer, h && q && !h.isHidden && (q = h.getAnchor([{}], c), h.updatePosition({
                    plotX: q[0],
                    plotY: q[1]
                })));
                this._onDocumentMouseMove || (this._onDocumentMouseMove = function(c) {
                    if (E[a.hoverChartIndex]) E[a.hoverChartIndex].pointer.onDocumentMouseMove(c)
                }, A(d, "mousemove", this._onDocumentMouseMove));
                m(f ? w : [b(k, w[0])], function(a) {
                    m(e.axes, function(b) {
                        (!a || a.series && a.series[b.coll] === b) && b.drawCrosshair(c, a)
                    })
                })
            },
            reset: function(a, b) {
                var e = this.chart,
                    h = e.hoverSeries,
                    f = e.hoverPoint,
                    u = e.hoverPoints,
                    p = e.tooltip,
                    g = p && p.shared ? u : f;
                a && g && m(v(g), function(b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) p && g && (p.refresh(g), f && (f.setState(f.state, !0), m(e.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null, f)
                })));
                else {
                    if (f) f.onMouseOut();
                    u && m(u, function(a) {
                        a.setState()
                    });
                    if (h) h.onMouseOut();
                    p && p.hide(b);
                    this._onDocumentMouseMove && (k(d, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null);
                    m(e.axes, function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = this.prevKDPoint = e.hoverPoints = e.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var e = this.chart,
                    h;
                m(e.series, function(f) {
                    h = a || f.getPlotBox();
                    f.xAxis && f.xAxis.zoomEnabled && (f.group.attr(h), f.markerGroup && (f.markerGroup.attr(h), f.markerGroup.clip(b ? e.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(h))
                });
                e.clipRect.attr(b || e.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    e = b.options.chart,
                    h = a.chartX,
                    f = a.chartY,
                    d = this.zoomHor,
                    k = this.zoomVert,
                    p = b.plotLeft,
                    g = b.plotTop,
                    n = b.plotWidth,
                    C = b.plotHeight,
                    w, m = this.selectionMarker,
                    v = this.mouseDownX,
                    x = this.mouseDownY,
                    r = e.panKey && a[e.panKey + "Key"];
                m && m.touch || (h < p ? h = p : h > p + n && (h = p + n), f < g ? f = g : f > g + C && (f = g + C), this.hasDragged = Math.sqrt(Math.pow(v - h, 2) + Math.pow(x - f, 2)), 10 < this.hasDragged && (w = b.isInsidePlot(v - p, x - g), b.hasCartesianSeries && (this.zoomX || this.zoomY) && w && !r && !m && (this.selectionMarker = m = b.renderer.rect(p, g, d ? 1 : n, k ? 1 : C, 0).attr({
                    fill: e.selectionMarkerFill || G("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), m && d && (h -= v, m.attr({
                    width: Math.abs(h),
                    x: (0 < h ? 0 : h) + v
                })), m && k && (h = f - x, m.attr({
                    height: Math.abs(h),
                    y: (0 < h ? 0 : h) + x
                })), w && !m && e.panning && b.pan(a, e.panning)))
            },
            drop: function(a) {
                var b = this,
                    e = this.chart,
                    h = this.hasPinched;
                if (this.selectionMarker) {
                    var f = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        d = this.selectionMarker,
                        k = d.attr ? d.attr("x") : d.x,
                        p = d.attr ? d.attr("y") : d.y,
                        v = d.attr ? d.attr("width") : d.width,
                        B = d.attr ? d.attr("height") : d.height,
                        C;
                    if (this.hasDragged || h) m(e.axes, function(e) {
                        if (e.zoomEnabled && g(e.min) && (h || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[e.coll]])) {
                            var d = e.horiz,
                                u = "touchend" === a.type ? e.minPixelPadding : 0,
                                q = e.toValue((d ? k : p) + u),
                                d = e.toValue((d ? k + v : p + B) - u);
                            f[e.coll].push({
                                axis: e,
                                min: Math.min(q, d),
                                max: Math.max(q, d)
                            });
                            C = !0
                        }
                    }), C && n(e, "selection", f, function(a) {
                        e.zoom(r(a, h ? {
                            animation: !1
                        } : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    h && this.scaleGroups()
                }
                e && (t(e.container, {
                    cursor: e._cursor
                }), e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                this.zoomOption();
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            },
            onDocumentMouseUp: function(c) {
                E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(c)
            },
            onDocumentMouseMove: function(a) {
                var b = this.chart,
                    e = this.chartPosition;
                a = this.normalize(a, e);
                !e || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(c) {
                var b = E[a.hoverChartIndex];
                b && (c.relatedTarget || c.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(c) {
                var b = this.chart;
                g(a.hoverChartIndex) && E[a.hoverChartIndex] && E[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = b.index);
                c = this.normalize(c);
                c.returnValue = !1;
                "mousedown" === b.mouseIsDown && this.drag(c);
                !this.inClass(c.target, "highcharts-tracker") && !b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop) || b.openMenu || this.runPointActions(c)
            },
            inClass: function(a, b) {
                for (var e; a;) {
                    if (e = y(a, "class")) {
                        if (-1 !== e.indexOf(b)) return !0;
                        if (-1 !== e.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (b && a && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && !this.inClass(a, "highcharts-series-" + b.index)) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    e = b.hoverPoint,
                    h = b.plotLeft,
                    f = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (n(e.series, "click", r(a, {
                    point: e
                })), b.hoverPoint && e.firePointEvent("click", a)) : (r(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - h, a.chartY - f) && n(b, "click", a)))
            },
            setDOMEvents: function() {
                var c = this,
                    b = c.chart.container;
                b.onmousedown = function(a) {
                    c.onContainerMouseDown(a)
                };
                b.onmousemove = function(a) {
                    c.onContainerMouseMove(a)
                };
                b.onclick = function(a) {
                    c.onContainerClick(a)
                };
                A(b, "mouseleave", c.onContainerMouseLeave);
                1 === a.chartCount && A(d, "mouseup", c.onDocumentMouseUp);
                a.hasTouch && (b.ontouchstart = function(a) {
                    c.onContainerTouchStart(a)
                }, b.ontouchmove = function(a) {
                    c.onContainerTouchMove(a)
                }, 1 === a.chartCount && A(d, "touchend", c.onDocumentTouchEnd))
            },
            destroy: function() {
                var c;
                k(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                a.chartCount || (k(d, "mouseup", this.onDocumentMouseUp), k(d, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (c in this) this[c] = null
            }
        }
    })(K);
    (function(a) {
        var A = a.charts,
            y = a.each,
            E = a.extend,
            G = a.map,
            t = a.noop,
            g = a.pick;
        E(a.Pointer.prototype, {
            pinchTranslate: function(a, g, r, n, p, b) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, g, r, n, p, b);
                (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, g, r, n, p, b)
            },
            pinchTranslateDirection: function(a, g, r, n, p, b, k, v) {
                var t = this.chart,
                    e = a ? "x" : "y",
                    c = a ? "X" : "Y",
                    l = "chart" + c,
                    q = a ? "width" : "height",
                    h = t["plot" + (a ? "Left" : "Top")],
                    f, u, D = v || 1,
                    H = t.inverted,
                    F = t.bounds[a ? "h" : "v"],
                    I = 1 === g.length,
                    C = g[0][l],
                    w = r[0][l],
                    J = !I && g[1][l],
                    M = !I && r[1][l],
                    x;
                r = function() {
                    !I && 20 < Math.abs(C - J) && (D = v || Math.abs(w - M) / Math.abs(C - J));
                    u = (h - w) / D + C;
                    f = t["plot" + (a ? "Width" : "Height")] / D
                };
                r();
                g = u;
                g < F.min ? (g = F.min, x = !0) : g + f > F.max && (g = F.max - f, x = !0);
                x ? (w -= .8 * (w - k[e][0]), I || (M -= .8 * (M - k[e][1])), r()) : k[e] = [w, M];
                H || (b[e] = u - h, b[q] = f);
                b = H ? 1 / D : D;
                p[q] = f;
                p[e] = g;
                n[H ? a ? "scaleY" : "scaleX" : "scale" + c] = D;
                n["translate" + c] = b * h + (w - b * C)
            },
            pinch: function(a) {
                var m = this,
                    r = m.chart,
                    n = m.pinchDown,
                    p = a.touches,
                    b = p.length,
                    k = m.lastValidTouch,
                    v = m.hasZoom,
                    B = m.selectionMarker,
                    e = {},
                    c = 1 === b && (m.inClass(a.target, "highcharts-tracker") && r.runTrackerClick || m.runChartClick),
                    l = {};
                1 < b && (m.initiated = !0);
                v && m.initiated && !c && a.preventDefault();
                G(p, function(a) {
                    return m.normalize(a)
                });
                "touchstart" === a.type ? (y(p, function(a, c) {
                    n[c] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), k.x = [n[0].chartX, n[1] && n[1].chartX], k.y = [n[0].chartY, n[1] && n[1].chartY], y(r.axes, function(a) {
                    if (a.zoomEnabled) {
                        var c = r.bounds[a.horiz ? "h" : "v"],
                            b = a.minPixelPadding,
                            e = a.toPixels(g(a.options.min, a.dataMin)),
                            d = a.toPixels(g(a.options.max, a.dataMax)),
                            l = Math.max(e, d);
                        c.min = Math.min(a.pos, Math.min(e, d) - b);
                        c.max = Math.max(a.pos + a.len, l + b)
                    }
                }), m.res = !0) : n.length && (B || (m.selectionMarker = B = E({
                    destroy: t,
                    touch: !0
                }, r.plotBox)), m.pinchTranslate(n, p, e, B, l, k), m.hasPinched = v, m.scaleGroups(e, l), !v && m.followTouchMove && 1 === b ? this.runPointActions(m.normalize(a)) : m.res && (m.res = !1, this.reset(!1, 0)))
            },
            touch: function(d, m) {
                var r = this.chart,
                    n;
                a.hoverChartIndex = r.index;
                1 === d.touches.length ? (d = this.normalize(d), r.isInsidePlot(d.chartX - r.plotLeft, d.chartY - r.plotTop) && !r.openMenu ? (m && this.runPointActions(d), "touchmove" === d.type && (r = this.pinchDown, n = r[0] ? 4 <= Math.sqrt(Math.pow(r[0].chartX - d.chartX, 2) + Math.pow(r[0].chartY - d.chartY, 2)) : !1), g(n, !0) && this.pinch(d)) : m && this.reset()) : 2 === d.touches.length && this.pinch(d)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption();
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(d) {
                A[a.hoverChartIndex] && A[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.charts,
            E = a.css,
            G = a.doc,
            t = a.extend,
            g = a.noop,
            d = a.Pointer,
            m = a.removeEvent,
            r = a.win,
            n = a.wrap;
        if (r.PointerEvent || r.MSPointerEvent) {
            var p = {},
                b = !! r.PointerEvent,
                k = function() {
                    var a, b = [];
                    b.item = function(a) {
                        return this[a]
                    };
                    for (a in p) p.hasOwnProperty(a) && b.push({
                        pageX: p[a].pageX,
                        pageY: p[a].pageY,
                        target: p[a].target
                    });
                    return b
                },
                v = function(b, e, c, d) {
                    "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !y[a.hoverChartIndex] || (d(b), d = y[a.hoverChartIndex].pointer, d[e]({
                        type: c,
                        target: b.currentTarget,
                        preventDefault: g,
                        touches: k()
                    }))
                };
            t(d.prototype, {
                onContainerPointerDown: function(a) {
                    v(a, "onContainerTouchStart", "touchstart", function(a) {
                        p[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    v(a, "onContainerTouchMove", "touchmove", function(a) {
                        p[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        p[a.pointerId].target || (p[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    v(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete p[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, b ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, b ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(G, b ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            n(d.prototype, "init", function(a, b, c) {
                a.call(this, b, c);
                this.hasZoom && E(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            n(d.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(A)
            });
            n(d.prototype, "destroy", function(a) {
                this.batchMSEvents(m);
                a.call(this)
            })
        }
    })(K);
    (function(a) {
        var A, y = a.addEvent,
            E = a.css,
            G = a.discardElement,
            t = a.defined,
            g = a.each,
            d = a.extend,
            m = a.isFirefox,
            r = a.marginNames,
            n = a.merge,
            p = a.pick,
            b = a.setAnimation,
            k = a.stableSort,
            v = a.win,
            B = a.wrap;
        A = a.Legend = function(a, c) {
            this.init(a, c)
        };
        A.prototype = {
            init: function(a, c) {
                this.chart = a;
                this.setOptions(c);
                c.enabled && (this.render(), y(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function(a) {
                var c = p(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = n(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.initialItemX = this.padding = c;
                this.initialItemY = c - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = p(a.symbolWidth, 16);
                this.pages = []
            },
            update: function(a, c) {
                var b = this.chart;
                this.setOptions(n(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                p(c, !0) && b.redraw()
            },
            colorizeItem: function(a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options,
                    d = a.legendItem,
                    h = a.legendLine,
                    f = a.legendSymbol,
                    k = this.itemHiddenStyle.color,
                    b = c ? b.itemStyle.color : k,
                    p = c ? a.color || k : k,
                    g = a.options && a.options.marker,
                    n = {
                        fill: p
                    },
                    m;
                d && d.css({
                    fill: b,
                    color: b
                });
                h && h.attr({
                    stroke: p
                });
                if (f) {
                    if (g && f.isMarker && (n = a.pointAttribs(), !c)) for (m in n) n[m] = k;
                    f.attr(n)
                }
            },
            positionItem: function(a) {
                var c = this.options,
                    b = c.symbolPadding,
                    c = !c.rtl,
                    d = a._legendItemPos,
                    h = d[0],
                    d = d[1],
                    f = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(c ? h : this.legendWidth - h - 2 * b - 4, d);
                f && (f.x = h, f.y = d)
            },
            destroyItem: function(a) {
                var c = a.checkbox;
                g(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(c) {
                    a[c] && (a[c] = a[c].destroy())
                });
                c && G(a.checkbox)
            },
            destroy: function() {
                var a = this.group,
                    c = this.box;
                c && (this.box = c.destroy());
                g(this.getAllItems(), function(a) {
                    g(["legendItem", "legendGroup"], function(c) {
                        a[c] && (a[c] = a[c].destroy())
                    })
                });
                a && (this.group = a.destroy())
            },
            positionCheckboxes: function(a) {
                var c = this.group.alignAttr,
                    b, d = this.clipHeight || this.legendHeight,
                    h = this.titleHeight;
                c && (b = c.translateY, g(this.allItems, function(f) {
                    var k = f.checkbox,
                        p;
                    k && (p = b + h + k.y + (a || 0) + 3, E(k, {
                        left: c.translateX + f.checkboxOffset + k.x - 20 + "px",
                        top: p + "px",
                        display: p > b - 6 && p < b + d - 6 ? "" : "none"
                    }))
                }))
            },
            renderTitle: function() {
                var a = this.padding,
                    c = this.options.title,
                    b = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(c.style).add(this.group)), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: b
                }));
                this.titleHeight = b
            },
            setText: function(b) {
                var c = this.options;
                b.legendItem.attr({
                    text: c.labelFormat ? a.format(c.labelFormat, b) : c.labelFormatter.call(b)
                })
            },
            renderItem: function(a) {
                var c = this.chart,
                    b = c.renderer,
                    d = this.options,
                    h = "horizontal" === d.layout,
                    f = this.symbolWidth,
                    k = d.symbolPadding,
                    g = this.itemStyle,
                    m = this.itemHiddenStyle,
                    v = this.padding,
                    r = h ? p(d.itemDistance, 20) : 0,
                    C = !d.rtl,
                    w = d.width,
                    J = d.itemMarginBottom || 0,
                    t = this.itemMarginTop,
                    x = this.initialItemX,
                    z = a.legendItem,
                    B = !a.series,
                    O = !B && a.series.drawLegendSymbol ? a.series : a,
                    y = O.options,
                    y = this.createCheckboxForItem && y && y.showCheckbox,
                    L = d.useHTML;
                z || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + O.type + "-series highcharts-color-" + a.colorIndex + " " + (a.options.className || "") + (B ? "highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = z = b.text("", C ? f + k : -k, this.baseline || 0, L).css(n(a.visible ? g : m)).attr({
                    align: C ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (g = g.fontSize, this.fontMetrics = b.fontMetrics(g, z), this.baseline = this.fontMetrics.f + 3 + t, z.attr("y", this.baseline)), O.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, z, L), y && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                b = z.getBBox();
                f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + k + b.width + r + (y ? 20 : 0);
                this.itemHeight = k = Math.round(a.legendItemHeight || b.height);
                h && this.itemX - x + f > (w || c.chartWidth - 2 * v - x - d.x) && (this.itemX = x, this.itemY += t + this.lastLineHeight + J, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, f);
                this.lastItemY = t + this.itemY + J;
                this.lastLineHeight = Math.max(k, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                h ? this.itemX += f : (this.itemY += t + k + J, this.lastLineHeight = k);
                this.offsetWidth = w || Math.max((h ? this.itemX - x - r : f) + v, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                g(this.chart.series, function(c) {
                    var b = c && c.options;
                    c && p(b.showInLegend, t(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === b.legendType ? c.data : c)))
                });
                return a
            },
            adjustMargins: function(a, c) {
                var b = this.chart,
                    d = this.options,
                    h = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0);
                d.floating || g([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(f, k) {
                    f.test(h) && !t(a[k]) && (b[r[k]] = Math.max(b[r[k]], b.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][k] * d[k % 2 ? "x" : "y"] + p(d.margin, 12) + c[k]))
                })
            },
            render: function() {
                var a = this,
                    c = a.chart,
                    b = c.renderer,
                    p = a.group,
                    h, f, u, n, m = a.box,
                    v = a.options,
                    r = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                p || (a.group = p = b.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(p), a.scrollGroup = b.g().add(a.contentGroup));
                a.renderTitle();
                h = a.getAllItems();
                k(h, function(a, c) {
                    return (a.options && a.options.legendIndex || 0) - (c.options && c.options.legendIndex || 0)
                });
                v.reversed && h.reverse();
                a.allItems = h;
                a.display = f = !! h.length;
                a.lastLineHeight = 0;
                g(h, function(c) {
                    a.renderItem(c)
                });
                u = (v.width || a.offsetWidth) + r;
                n = a.lastItemY + a.lastLineHeight + a.titleHeight;
                n = a.handleOverflow(n);
                n += r;
                m || (a.box = m = b.rect().addClass("highcharts-legend-box").attr({
                    r: v.borderRadius
                }).add(p), m.isNew = !0);
                m.attr({
                    stroke: v.borderColor,
                    "stroke-width": v.borderWidth || 0,
                    fill: v.backgroundColor || "none"
                }).shadow(v.shadow);
                0 < u && 0 < n && (m[m.isNew ? "attr" : "animate"](m.crisp({
                    x: 0,
                    y: 0,
                    width: u,
                    height: n
                }, m.strokeWidth())), m.isNew = !1);
                m[f ? "show" : "hide"]();
                a.legendWidth = u;
                a.legendHeight = n;
                g(h, function(c) {
                    a.positionItem(c)
                });
                f && p.align(d({
                    width: u,
                    height: n
                }, v), !0, "spacingBox");
                c.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function(a) {
                var c = this,
                    b = this.chart,
                    d = b.renderer,
                    h = this.options,
                    f = h.y,
                    f = b.spacingBox.height + ("top" === h.verticalAlign ? -f : f) - this.padding,
                    k = h.maxHeight,
                    n, m = this.clipRect,
                    v = h.navigation,
                    r = p(v.animation, !0),
                    C = v.arrowSize || 12,
                    w = this.nav,
                    J = this.pages,
                    t = this.padding,
                    x, z = this.allItems,
                    B = function(a) {
                        m.attr({
                            height: a
                        });
                        c.contentGroup.div && (c.contentGroup.div.style.clip = "rect(" + t + "px,9999px," + (t + a) + "px,0)")
                    };
                "horizontal" === h.layout && (f /= 2);
                k && (f = Math.min(f, k));
                J.length = 0;
                a > f && !1 !== v.enabled ? (this.clipHeight = n = Math.max(f - 20 - this.titleHeight - t, 0), this.currentPage = p(this.currentPage, 1), this.fullHeight = a, g(z, function(a, c) {
                    var b = a._legendItemPos[1],
                        e = Math.round(a.legendItem.getBBox().height),
                        f = J.length;
                    if (!f || b - J[f - 1] > n && (x || b) !== J[f - 1]) J.push(x || b), f++;
                    c === z.length - 1 && b + e - J[f - 1] > n && J.push(b);
                    b !== x && (x = b)
                }), m || (m = c.clipRect = d.clipRect(0, t, 9999, 0), c.contentGroup.clip(m)), B(n), w || (this.nav = w = d.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = d.symbol("triangle", 0, 0, C, C).on("click", function() {
                    c.scroll(-1, r)
                }).add(w), this.pager = d.text("", 15, 10).addClass("highcharts-legend-navigation").css(v.style).add(w), this.down = d.symbol("triangle-down", 0, 0, C, C).on("click", function() {
                    c.scroll(1, r)
                }).add(w)), c.scroll(0), a = f) : w && (B(b.chartHeight), w.hide(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, c) {
                var d = this.pages,
                    k = d.length,
                    h = this.currentPage + a,
                    f = this.clipHeight,
                    p = this.options.navigation,
                    g = this.pager,
                    n = this.padding;
                h > k && (h = k);
                0 < h && (void 0 !== c && b(c, this.chart), this.nav.attr({
                    translateX: n,
                    translateY: f + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 === h ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), g.attr({
                    text: h + "/" + k
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": h === k ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({
                    fill: 1 === h ? p.inactiveColor : p.activeColor
                }).css({
                    cursor: 1 === h ? "default" : "pointer"
                }), this.down.attr({
                    fill: h === k ? p.inactiveColor : p.activeColor
                }).css({
                    cursor: h === k ? "default" : "pointer"
                }), d = -d[h - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: d
                }), this.currentPage = h, this.positionCheckboxes(d))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, c) {
                var b = a.options,
                    d = b.symbolHeight || a.fontMetrics.f,
                    b = b.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - d) / 2 : 0, a.baseline - d + 1, b ? d : a.symbolWidth, d, p(a.options.symbolRadius, d / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(c.legendGroup)
            },
            drawLineMarker: function(a) {
                var c = this.options,
                    b = c.marker,
                    d = a.symbolWidth,
                    h = this.chart.renderer,
                    f = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var k;
                k = {
                    "stroke-width": c.lineWidth || 0
                };
                c.dashStyle && (k.dashstyle = c.dashStyle);
                this.legendLine = h.path(["M", 0, a, "L", d, a]).addClass("highcharts-graph").attr(k).add(f);
                b && !1 !== b.enabled && (c = b.radius, this.legendSymbol = b = h.symbol(this.symbol, d / 2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(f), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(v.navigator.userAgent) || m) && B(A.prototype, "positionItem", function(a, b) {
            var d = this,
                k = function() {
                    b._legendItemPos && a.call(d, b)
                };
            k();
            setTimeout(k)
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.animate,
            E = a.animObject,
            G = a.attr,
            t = a.doc,
            g = a.Axis,
            d = a.createElement,
            m = a.defaultOptions,
            r = a.discardElement,
            n = a.charts,
            p = a.css,
            b = a.defined,
            k = a.each,
            v = a.error,
            B = a.extend,
            e = a.fireEvent,
            c = a.getStyle,
            l = a.grep,
            q = a.isNumber,
            h = a.isObject,
            f = a.isString,
            u = a.Legend,
            D = a.marginNames,
            H = a.merge,
            F = a.Pointer,
            I = a.pick,
            C = a.pInt,
            w = a.removeEvent,
            J = a.seriesTypes,
            M = a.splat,
            x = a.svg,
            z = a.syncTimeout,
            N = a.win,
            O = a.Renderer,
            S = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a, b, c) {
            return new S(a, b, c)
        };
        S.prototype = {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (f(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(b, c) {
                var e, f = b.series;
                b.series = null;
                e = H(m, b);
                e.series = b.series = f;
                this.userOptions = b;
                this.respRules = [];
                var f = e.chart,
                    d = f.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.callback = c;
                this.isResizing = 0;
                this.options = e;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = f.showAxes;
                var h;
                this.index = n.length;
                n.push(this);
                a.chartCount++;
                if (d) for (h in d) A(this, h, d[h]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            },
            initSeries: function(a) {
                var b = this.options.chart;
                (b = J[a.type || b.type || b.defaultSeriesType]) || v(17, !0);
                b = new b;
                b.init(this, a);
                return b
            },
            isInsidePlot: function(a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(b) {
                var c = this.axes,
                    f = this.series,
                    d = this.pointer,
                    h = this.legend,
                    p = this.isDirtyLegend,
                    l, u, g = this.hasCartesianSeries,
                    w = this.isDirtyBox,
                    C = f.length,
                    q = C,
                    n = this.renderer,
                    m = n.isHidden(),
                    v = [];
                a.setAnimation(b, this);
                m && this.cloneRenderTo();
                for (this.layOutTitles(); q--;) if (b = f[q], b.options.stacking && (l = !0, b.isDirty)) {
                    u = !0;
                    break
                }
                if (u) for (q = C; q--;) b = f[q], b.options.stacking && (b.isDirty = !0);
                k(f, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), p = !0);
                    a.isDirtyData && e(a, "updatedData")
                });
                p && h.options.enabled && (h.render(), this.isDirtyLegend = !1);
                l && this.getStacks();
                g && k(c, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                g && (k(c, function(a) {
                    a.isDirty && (w = !0)
                }), k(c, function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, v.push(function() {
                        e(a, "afterSetExtremes", B(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (w || l) && a.redraw()
                }));
                w && this.drawChartBox();
                k(f, function(a) {
                    a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
                });
                d && d.reset(!0);
                n.draw();
                e(this, "redraw");
                m && this.cloneRenderTo(!0);
                k(v, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                var b = this.axes,
                    c = this.series,
                    e, f;
                for (e = 0; e < b.length; e++) if (b[e].options.id === a) return b[e];
                for (e = 0; e < c.length; e++) if (c[e].options.id === a) return c[e];
                for (e = 0; e < c.length; e++) for (f = c[e].points || [], b = 0; b < f.length; b++) if (f[b].id === a) return f[b];
                return null
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    c = b.xAxis = M(b.xAxis || {}),
                    b = b.yAxis = M(b.yAxis || {});
                k(c, function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                k(b, function(a, b) {
                    a.index = b
                });
                c = c.concat(b);
                k(c, function(b) {
                    new g(a, b)
                })
            },
            getSelectedPoints: function() {
                var a = [];
                k(this.series, function(b) {
                    a = a.concat(l(b.points || [], function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return l(this.series, function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, c) {
                var e = this,
                    f = e.options,
                    d;
                d = f.title = H(f.title, a);
                f = f.subtitle = H(f.subtitle, b);
                k([
                    ["title", a, d],
                    ["subtitle", b, f]
                ], function(a, b) {
                    var c = a[0],
                        f = e[c],
                        d = a[1],
                        h = a[2];
                    f && d && (e[c] = f = f.destroy());
                    h && h.text && !f && (e[c] = e.renderer.text(h.text, 0, 0, h.useHTML).attr({
                        align: h.align,
                        "class": "highcharts-" + c,
                        zIndex: h.zIndex || 4
                    }).add(), e[c].update = function(a) {
                        e.setTitle(!b && a, b && a)
                    }, e[c].css(h.style))
                });
                e.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c, e = this.renderer,
                    f = this.spacingBox;
                k(["title", "subtitle"], function(a) {
                    var c = this[a],
                        h = this.options[a],
                        d;
                    c && (d = h.style.fontSize, d = e.fontMetrics(d, c).b, c.css({
                        width: (h.width || f.width + h.widthAdjust) + "px"
                    }).align(B({
                        y: b + d + ("title" === a ? -3 : 2)
                    }, h), !1, "spacingBox"), h.floating || h.verticalAlign || (b = Math.ceil(b + c.getBBox().height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && I(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var a = this.options.chart,
                    e = a.width,
                    a = a.height,
                    f = this.renderToClone || this.renderTo;
                b(e) || (this.containerWidth = c(f, "width"));
                b(a) || (this.containerHeight = c(f, "height"));
                this.chartWidth = Math.max(0, e || this.containerWidth || 600);
                this.chartHeight = Math.max(0, I(a, 19 < this.containerHeight ? this.containerHeight : 400))
            },
            cloneRenderTo: function(a) {
                var b = this.renderToClone,
                    c = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;) this.renderTo.appendChild(b.firstChild);
                        r(b);
                        delete this.renderToClone
                    }
                } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), p(b, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), b.style.setProperty && b.style.setProperty("display", "block", "important"), t.body.appendChild(b), c && b.appendChild(c)
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var b, c = this.options,
                    e = c.chart,
                    h, k;
                b = this.renderTo;
                var l = "highcharts-" + a.idCounter++,
                    p;
                b || (this.renderTo = b = e.renderTo);
                f(b) && (this.renderTo = b = t.getElementById(b));
                b || v(13, !0);
                h = C(G(b, "data-highcharts-chart"));
                q(h) && n[h] && n[h].hasRendered && n[h].destroy();
                G(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                e.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                h = this.chartWidth;
                k = this.chartHeight;
                p = B({
                    position: "relative",
                    overflow: "hidden",
                    width: h + "px",
                    height: k + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                });
                this.container = b = d("div", {
                    id: l
                }, p, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[e.renderer] || O)(b, h, k, null, e.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(e.className);
                this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function(a) {
                var c = this.spacing,
                    e = this.margin,
                    f = this.titleOffset;
                this.resetMargins();
                f && !b(e[0]) && (this.plotTop = Math.max(this.plotTop, f + this.options.title.margin + c[0]));
                this.legend.display && this.legend.adjustMargins(e, c);
                this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    c = a.axisOffset = [0, 0, 0, 0],
                    e = a.margin;
                a.hasCartesianSeries && k(a.axes, function(a) {
                    a.visible && a.getOffset()
                });
                k(D, function(f, h) {
                    b(e[h]) || (a[f] += c[h])
                });
                a.setChartSize()
            },
            reflow: function(a) {
                var e = this,
                    f = e.options.chart,
                    h = e.renderTo,
                    d = b(f.width),
                    k = f.width || c(h, "width"),
                    f = f.height || c(h, "height"),
                    h = a ? a.target : N;
                if (!d && !e.isPrinting && k && f && (h === N || h === t)) {
                    if (k !== e.containerWidth || f !== e.containerHeight) clearTimeout(e.reflowTimeout), e.reflowTimeout = z(function() {
                        e.container && e.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    e.containerWidth = k;
                    e.containerHeight = f
                }
            },
            initReflow: function() {
                var a = this,
                    b = function(b) {
                        a.reflow(b)
                    };
                A(N, "resize", b);
                A(a, "destroy", function() {
                    w(N, "resize", b)
                })
            },
            setSize: function(b, c, f) {
                var h = this,
                    d = h.renderer;
                h.isResizing += 1;
                a.setAnimation(f, h);
                h.oldChartHeight = h.chartHeight;
                h.oldChartWidth = h.chartWidth;
                void 0 !== b && (h.options.chart.width = b);
                void 0 !== c && (h.options.chart.height = c);
                h.getChartSize();
                b = d.globalAnimation;
                (b ? y : p)(h.container, {
                    width: h.chartWidth + "px",
                    height: h.chartHeight + "px"
                }, b);
                h.setChartSize(!0);
                d.setSize(h.chartWidth, h.chartHeight, f);
                k(h.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                k(h.series, function(a) {
                    a.isDirty = !0
                });
                h.isDirtyLegend = !0;
                h.isDirtyBox = !0;
                h.layOutTitles();
                h.getMargins();
                h.setResponsive && h.setResponsive(!1);
                h.redraw(f);
                h.oldChartHeight = null;
                e(h, "resize");
                z(function() {
                    h && e(h, "endResize", null, function() {
                        --h.isResizing
                    })
                }, E(b).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    c = this.renderer,
                    e = this.chartWidth,
                    f = this.chartHeight,
                    h = this.options.chart,
                    d = this.spacing,
                    p = this.clipOffset,
                    l, u, g, w;
                this.plotLeft = l = Math.round(this.plotLeft);
                this.plotTop = u = Math.round(this.plotTop);
                this.plotWidth = g = Math.max(0, Math.round(e - l - this.marginRight));
                this.plotHeight = w = Math.max(0, Math.round(f - u - this.marginBottom));
                this.plotSizeX = b ? w : g;
                this.plotSizeY = b ? g : w;
                this.plotBorderWidth = h.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: d[3],
                    y: d[0],
                    width: e - d[3] - d[1],
                    height: f - d[0] - d[2]
                };
                this.plotBox = c.plotBox = {
                    x: l,
                    y: u,
                    width: g,
                    height: w
                };
                e = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(e, p[3]) / 2);
                c = Math.ceil(Math.max(e, p[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(e, p[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(e, p[2]) / 2 - c))
                };
                a || k(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function() {
                var a = this,
                    b = a.options.chart;
                k(["margin", "spacing"], function(c) {
                    var e = b[c],
                        f = h(e) ? e : [e, e, e, e];
                    k(["Top", "Right", "Bottom", "Left"], function(e, h) {
                        a[c][h] = I(b[c + e], f[h])
                    })
                });
                k(D, function(b, c) {
                    a[b] = I(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    e = this.chartHeight,
                    f = this.chartBackground,
                    h = this.plotBackground,
                    d = this.plotBorder,
                    k, p = this.plotBGImage,
                    l = a.backgroundColor,
                    u = a.plotBackgroundColor,
                    g = a.plotBackgroundImage,
                    w, C = this.plotLeft,
                    q = this.plotTop,
                    n = this.plotWidth,
                    m = this.plotHeight,
                    v = this.plotBox,
                    x = this.clipRect,
                    r = this.clipBox,
                    J = "animate";
                f || (this.chartBackground = f = b.rect().addClass("highcharts-background").add(), J = "attr");
                k = a.borderWidth || 0;
                w = k + (a.shadow ? 8 : 0);
                l = {
                    fill: l || "none"
                };
                if (k || f["stroke-width"]) l.stroke = a.borderColor, l["stroke-width"] = k;
                f.attr(l).shadow(a.shadow);
                f[J]({
                    x: w / 2,
                    y: w / 2,
                    width: c - w - k % 2,
                    height: e - w - k % 2,
                    r: a.borderRadius
                });
                J = "animate";
                h || (J = "attr", this.plotBackground = h = b.rect().addClass("highcharts-plot-background").add());
                h[J](v);
                h.attr({
                    fill: u || "none"
                }).shadow(a.plotShadow);
                g && (p ? p.animate(v) : this.plotBGImage = b.image(g, C, q, n, m).add());
                x ? x.animate({
                    width: r.width,
                    height: r.height
                }) : this.clipRect = b.clipRect(r);
                J = "animate";
                d || (J = "attr", this.plotBorder = d = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                d.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                d[J](d.crisp({
                    x: C,
                    y: q,
                    width: n,
                    height: m
                }, -d.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    c, e = a.options.series,
                    f, h;
                k(["inverted", "angular", "polar"], function(d) {
                    c = J[b.type || b.defaultSeriesType];
                    h = b[d] || c && c.prototype[d];
                    for (f = e && e.length; !h && f--;)(c = J[e[f].type]) && c.prototype[d] && (h = !0);
                    a[d] = h
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                k(b, function(a) {
                    a.linkedSeries.length = 0
                });
                k(b, function(b) {
                    var c = b.options.linkedTo;
                    f(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = I(b.options.visible, c.options.visible, b.visible))
                })
            },
            renderSeries: function() {
                k(this.series, function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && k(b.items, function(c) {
                    var e = B(b.style, c.style),
                        f = C(e.left) + a.plotLeft,
                        h = C(e.top) + a.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    a.renderer.text(c.html, f, h).attr({
                        zIndex: 2
                    }).css(e).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    e, f, h;
                this.setTitle();
                this.legend = new u(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                e = this.plotHeight -= 21;
                k(a, function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                f = 1.1 < c / this.plotWidth;
                h = 1.05 < e / this.plotHeight;
                if (f || h) k(a, function(a) {
                    (a.horiz && f || !a.horiz && h) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && k(a, function(a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                //this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            /*addCredits: function(a) {
                var b = this;
                a = H(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(
                    a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits")
                    .on("click", function() {
                    a.href && (N.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },*/
            destroy: function() {
                var b = this,
                    c = b.axes,
                    f = b.series,
                    h = b.container,
                    d, l = h && h.parentNode;
                e(b, "destroy");
                n[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                w(b);
                for (d = c.length; d--;) c[d] = c[d].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (d = f.length; d--;) f[d] = f[d].destroy();
                k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                h && (h.innerHTML = "", w(h), l && r(h));
                for (d in b) delete b[d]
            },
            isReadyToRender: function() {
                var a = this;
                return x || N != N.top || "complete" === t.readyState ? !0 : (t.attachEvent("onreadystatechange", function() {
                    t.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === t.readyState && a.firstRender()
                }), !1)
            },
            firstRender: function() {
                var a = this,
                    b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    e(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    k(b.series || [], function(b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    e(a, "beforeRender");
                    F && (a.pointer = new F(a, b));
                    a.render();
                    a.renderer.draw();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.cloneRenderTo(!0)
                }
            },
            onload: function() {
                k([this.callback].concat(this.callbacks), function(a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                e(this, "load");
                this.initReflow();
                this.onload = null
            }
        }
    })(K);
    (function(a) {
        var A, y = a.each,
            E = a.extend,
            G = a.erase,
            t = a.fireEvent,
            g = a.format,
            d = a.isArray,
            m = a.isNumber,
            r = a.pick,
            n = a.removeEvent;
        A = a.Point = function() {};
        A.prototype = {
            init: function(a, b, d) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(b, d);
                a.options.colorByPoint ? (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter], b = b.length, d = a.colorCounter, a.colorCounter++, a.colorCounter === b && (a.colorCounter = 0)) : d = a.colorIndex;
                this.colorIndex = r(this.colorIndex, d);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function(a, b) {
                var d = this.series,
                    g = d.options.pointValKey || d.pointValKey;
                a = A.prototype.optionsToObject.call(this, a);
                E(this, a);
                this.options = this.options ? E(this.options, a) : a;
                a.group && delete this.group;
                g && (this.y = this[g]);
                this.isNull = r(this.isValid && !this.isValid(), null === this.x || !m(this.y, !0));
                "name" in this && void 0 === b && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                void 0 === this.x && d && (this.x = void 0 === b ? d.autoIncrement(this) : b);
                return this
            },
            optionsToObject: function(a) {
                var b = {},
                    k = this.series,
                    g = k.options.keys,
                    n = g || k.pointArrayMap || ["y"],
                    e = n.length,
                    c = 0,
                    l = 0;
                if (m(a) || null === a) b[n[0]] = a;
                else if (d(a)) for (!g && a.length > e && (k = typeof a[0], "string" === k ? b.name = a[0] : "number" === k && (b.x = a[0]), c++); l < e;) g && void 0 === a[c] || (b[n[l]] = a[c]), c++, l++;
                else "object" === typeof a && (b = a, a.dataLabels && (k._hasPointLabels = !0), a.marker && (k._hasPointMarkers = !0));
                return b
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "")
            },
            getZone: function() {
                var a = this.series,
                    b = a.zones,
                    a = a.zoneAxis || "y",
                    d = 0,
                    g;
                for (g = b[d]; this[a] >= g.value;) g = b[++d];
                g && g.color && !this.options.color && (this.color = g.color);
                return g
            },
            destroy: function() {
                var a = this.series.chart,
                    b = a.hoverPoints,
                    d;
                a.pointCount--;
                b && (this.setState(), G(b, this), b.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) n(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (d in this) this[d] = null
            },
            destroyElements: function() {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], b, d = 6; d--;) b = a[d], this[b] && (this[b] = this[b].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var b = this.series,
                    d = b.tooltipOptions,
                    n = r(d.valueDecimals, ""),
                    m = d.valuePrefix || "",
                    e = d.valueSuffix || "";
                y(b.pointArrayMap || ["y"], function(b) {
                    b = "{point." + b;
                    if (m || e) a = a.replace(b + "}", m + b + "}" + e);
                    a = a.replace(b + "}", b + ":,." + n + "f}")
                });
                return g(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function(a, b, d) {
                var g = this,
                    n = this.series.options;
                (n.point.events[a] || g.options && g.options.events && g.options.events[a]) && this.importEvents();
                "click" === a && n.allowPointSelect && (d = function(a) {
                    g.select && g.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                t(this, a, b, d)
            },
            visible: !0
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.animObject,
            E = a.arrayMax,
            G = a.arrayMin,
            t = a.correctFloat,
            g = a.Date,
            d = a.defaultOptions,
            m = a.defaultPlotOptions,
            r = a.defined,
            n = a.each,
            p = a.erase,
            b = a.error,
            k = a.extend,
            v = a.fireEvent,
            B = a.grep,
            e = a.isArray,
            c = a.isNumber,
            l = a.isString,
            q = a.merge,
            h = a.pick,
            f = a.removeEvent,
            u = a.splat,
            D = a.stableSort,
            H = a.SVGElement,
            F = a.syncTimeout,
            I = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                radius: 4,
                states: {
                    hover: {
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a, b) {
                var c = this,
                    e, f, d = a.series,
                    l = function(a, b) {
                        return h(a.options.index, a._i) - h(b.options.index, b._i)
                    };
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                k(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                f = b.events;
                for (e in f) A(c, e, f[e]);
                if (f && f.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                n(c.parallelArrays, function(a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                d.push(c);
                c._i = d.length - 1;
                D(d, l);
                this.yAxis && D(this.yAxis.series, l);
                n(d, function(a, b) {
                    a.index = b;
                    a.name = a.name || "Series " + (b + 1)
                })
            },
            bindAxes: function() {
                var a = this,
                    c = a.options,
                    e = a.chart,
                    f;
                n(a.axisTypes || [], function(h) {
                    n(e[h], function(b) {
                        f = b.options;
                        if (c[h] === f.index || void 0 !== c[h] && c[h] === f.id || void 0 === c[h] && 0 === f.index) b.series.push(a), a[h] = b, b.isDirty = !0
                    });
                    a[h] || a.optionalAxis === h || b(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var e = a.series,
                    f = arguments,
                    h = c(b) ?
                        function(c) {
                            var f = "y" === c && e.toYData ? e.toYData(a) : a[c];
                            e[c + "Data"][b] = f
                        } : function(a) {
                        Array.prototype[b].apply(e[a + "Data"], Array.prototype.slice.call(f, 2))
                    };
                n(e.parallelArrays, h)
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    c, e = a.pointIntervalUnit,
                    b = h(b, a.pointStart, 0);
                this.pointInterval = c = h(this.pointInterval, a.pointInterval, 1);
                e && (a = new g(b), "day" === e ? a = +a[g.hcSetDate](a[g.hcGetDate]() + c) : "month" === e ? a = +a[g.hcSetMonth](a[g.hcGetMonth]() + c) : "year" === e && (a = +a[g.hcSetFullYear](a[g.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function(a) {
                var b = this.chart,
                    c = b.options.plotOptions,
                    b = b.userOptions || {},
                    e = b.plotOptions || {},
                    f = c[this.type];
                this.userOptions = a;
                c = q(f, c.series, a);
                this.tooltipOptions = q(d.tooltip, d.plotOptions[this.type].tooltip, b.tooltip, e.series && e.series.tooltip, e[this.type] && e[this.type].tooltip, a.tooltip);
                null === f.marker && delete c.marker;
                this.zoneAxis = c.zoneAxis;
                a = this.zones = (c.zones || []).slice();
                !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                    value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                    className: "highcharts-negative",
                    color: c.negativeColor,
                    fillColor: c.negativeFillColor
                });
                a.length && r(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return c
            },
            getCyclic: function(a, b, c) {
                var e, f = this.userOptions,
                    d = a + "Index",
                    k = a + "Counter",
                    l = c ? c.length : h(this.chart.options.chart[a + "Count"], this.chart[a + "Count"]);
                b || (e = h(f[d], f["_" + d]), r(e) || (f["_" + d] = e = this.chart[k] % l, this.chart[k] += 1), c && (b = c[e]));
                void 0 !== e && (this[d] = e);
                this[a] = b
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || m[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                var a = this.options.marker;
                this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
                /^url/.test(this.symbol) && (a.radius = 0)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function(a, f, d, k) {
                var g = this,
                    u = g.points,
                    p = u && u.length || 0,
                    q, m = g.options,
                    r = g.chart,
                    v = null,
                    D = g.xAxis,
                    t = m.turboThreshold,
                    F = this.xData,
                    H = this.yData,
                    B = (q = g.pointArrayMap) && q.length;
                a = a || [];
                q = a.length;
                f = h(f, !0);
                if (!1 !== k && q && p === q && !g.cropped && !g.hasGroupedData && g.visible) n(a, function(a, b) {
                    u[b].update && a !== m.data[b] && u[b].update(a, !1, null, !1)
                });
                else {
                    g.xIncrement = null;
                    g.colorCounter = 0;
                    n(this.parallelArrays, function(a) {
                        g[a + "Data"].length = 0
                    });
                    if (t && q > t) {
                        for (d = 0; null === v && d < q;) v = a[d], d++;
                        if (c(v)) for (d = 0; d < q; d++) F[d] = this.autoIncrement(), H[d] = a[d];
                        else if (e(v)) if (B) for (d = 0; d < q; d++) v = a[d], F[d] = v[0], H[d] = v.slice(1, B + 1);
                        else for (d = 0; d < q; d++) v = a[d], F[d] = v[0], H[d] = v[1];
                        else b(12)
                    } else for (d = 0; d < q; d++) void 0 !== a[d] && (v = {
                        series: g
                    }, g.pointClass.prototype.applyOptions.apply(v, [a[d]]), g.updateParallelArrays(v, d));
                    l(H[0]) && b(14, !0);
                    g.data = [];
                    g.options.data = g.userOptions.data = a;
                    for (d = p; d--;) u[d] && u[d].destroy && u[d].destroy();
                    D && (D.minRange = D.userMinRange);
                    g.isDirty = r.isDirtyBox = !0;
                    g.isDirtyData = !! u;
                    d = !1
                }
                "point" === m.legendType && (this.processData(), this.generatePoints());
                f && r.redraw(d)
            },
            processData: function(a) {
                var c = this.xData,
                    e = this.yData,
                    f = c.length,
                    d;
                d = 0;
                var h, k, l = this.xAxis,
                    g, u = this.options;
                g = u.cropThreshold;
                var p = this.getExtremesFromAll || u.getExtremesFromAll,
                    q = this.isCartesian,
                    u = l && l.val2lin,
                    n = l && l.isLog,
                    m, v;
                if (q && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !a) return !1;
                l && (a = l.getExtremes(), m = a.min, v = a.max);
                if (q && this.sorted && !p && (!g || f > g || this.forceCrop)) if (c[f - 1] < m || c[0] > v) c = [], e = [];
                else if (c[0] < m || c[f - 1] > v) d = this.cropData(this.xData, this.yData, m, v), c = d.xData, e = d.yData, d = d.start, h = !0;
                for (g = c.length || 1; --g;) f = n ? u(c[g]) - u(c[g - 1]) : c[g] - c[g - 1], 0 < f && (void 0 === k || f < k) ? k = f : 0 > f && this.requireSorting && b(15);
                this.cropped = h;
                this.cropStart = d;
                this.processedXData = c;
                this.processedYData = e;
                this.closestPointRange = k
            },
            cropData: function(a, b, c, e) {
                var f = a.length,
                    d = 0,
                    k = f,
                    l = h(this.cropShoulder, 1),
                    g;
                for (g = 0; g < f; g++) if (a[g] >= c) {
                    d = Math.max(0, g - l);
                    break
                }
                for (c = g; c < f; c++) if (a[c] > e) {
                    k = c + l;
                    break
                }
                return {
                    xData: a.slice(d, k),
                    yData: b.slice(d, k),
                    start: d,
                    end: k
                }
            },
            generatePoints: function() {
                var a = this.options.data,
                    b = this.data,
                    c, e = this.processedXData,
                    f = this.processedYData,
                    d = this.pointClass,
                    h = e.length,
                    k = this.cropStart || 0,
                    l, g = this.hasGroupedData,
                    p, q = [],
                    n;
                b || g || (b = [], b.length = a.length, b = this.data = b);
                for (n = 0; n < h; n++) l = k + n, g ? (q[n] = (new d).init(this, [e[n]].concat(u(f[n]))), q[n].dataGroup = this.groupMap[n]) : (b[l] ? p = b[l] : void 0 !== a[l] && (b[l] = p = (new d).init(this, a[l], e[n])), q[n] = p), q[n].index = l;
                if (b && (h !== (c = b.length) || g)) for (n = 0; n < c; n++) n !== k || g || (n += h), b[n] && (b[n].destroyElements(), b[n].plotX = void 0);
                this.data = b;
                this.points = q
            },
            getExtremes: function(a) {
                var b = this.yAxis,
                    f = this.processedXData,
                    d, h = [],
                    k = 0;
                d = this.xAxis.getExtremes();
                var l = d.min,
                    g = d.max,
                    u, p, n, q;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (q = 0; q < d; q++) if (p = f[q], n = a[q], u = (c(n, !0) || e(n)) && (!b.isLog || n.length || 0 < n), p = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (f[q + 1] || p) >= l && (f[q - 1] || p) <= g, u && p) if (u = n.length) for (; u--;) null !== n[u] && (h[k++] = n[u]);
                else h[k++] = n;
                this.dataMin = G(h);
                this.dataMax = E(h)
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                for (var a = this.options, b = a.stacking, e = this.xAxis, f = e.categories, d = this.yAxis, k = this.points, l = k.length, g = !! this.modifyValue, u = a.pointPlacement, p = "between" === u || c(u), n = a.threshold, q = a.startFromThreshold ? n : 0, m, v, D, F, H = Number.MAX_VALUE, a = 0; a < l; a++) {
                    var B = k[a],
                        I = B.x,
                        y = B.y;
                    v = B.low;
                    var A = b && d.stacks[(this.negStacks && y < (q ? 0 : n) ? "-" : "") + this.stackKey],
                        E;
                    d.isLog && null !== y && 0 >= y && (B.isNull = !0);
                    B.plotX = m = t(Math.min(Math.max(-1E5, e.translate(I, 0, 0, 0, 1, u, "flags" === this.type)), 1E5));
                    b && this.visible && !B.isNull && A && A[I] && (F = this.getStackIndicator(F, I, this.index), E = A[I], y = E.points[F.key], v = y[0], y = y[1], v === q && F.key === A[I].base && (v = h(n, d.min)), d.isLog && 0 >= v && (v = null), B.total = B.stackTotal = E.total, B.percentage = E.total && B.y / E.total * 100, B.stackY = y, E.setOffset(this.pointXOffset || 0, this.barW || 0));
                    B.yBottom = r(v) ? d.translate(v, 0, 1, 0, 1) : null;
                    g && (y = this.modifyValue(y, B));
                    B.plotY = v = "number" === typeof y && Infinity !== y ? Math.min(Math.max(-1E5, d.translate(y, 0, 1, 0, 1)), 1E5) : void 0;
                    B.isInside = void 0 !== v && 0 <= v && v <= d.len && 0 <= m && m <= e.len;
                    B.clientX = p ? t(e.translate(I, 0, 0, 0, 1, u)) : m;
                    B.negative = B.y < (n || 0);
                    B.category = f && void 0 !== f[B.x] ? f[B.x] : B.x;
                    B.isNull || (void 0 !== D && (H = Math.min(H, Math.abs(m - D))), D = m)
                }
                this.closestPointRangePx = H
            },
            getValidPoints: function(a, b) {
                var c = this.chart;
                return B(a || this.points || [], function(a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    e = b.renderer,
                    f = b.inverted,
                    d = this.clipBox,
                    h = d || b.clipBox,
                    k = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, h.height, c.xAxis, c.yAxis].join(),
                    l = b[k],
                    g = b[k + "m"];
                l || (a && (h.width = 0, b[k + "m"] = g = e.clipRect(-99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[k] = l = e.clipRect(h), l.count = {
                    length: 0
                });
                a && !l.count[this.index] && (l.count[this.index] = !0, l.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || d ? l : b.clipRect), this.markerGroup.clip(g), this.sharedClipKey = k);
                a || (l.count[this.index] && (delete l.count[this.index], --l.count.length), 0 === l.count.length && k && b[k] && (d || (b[k] = b[k].destroy()), b[k + "m"] && (b[k + "m"] = b[k + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = y(this.options.animation),
                    e;
                a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({
                    width: b.plotSizeX
                }, c), b[e + "m"] && b[e + "m"].animate({
                    width: b.plotSizeX + 99
                }, c), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                v(this, "afterAnimate")
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    e, f, d, l, g, u, p, n, q = this.options.marker,
                    m, v, r, D = this.markerGroup,
                    t = h(q.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * q.radius);
                if (!1 !== q.enabled || this._hasPointMarkers) for (d = a.length; d--;) l = a[d], e = Math.floor(l.plotX), f = l.plotY, n = l.graphic, m = l.marker || {}, v = !! l.marker, g = t && void 0 === m.enabled || m.enabled, r = l.isInside, g && c(f) && null !== l.y ? (g = q.radius, u = h(m.symbol, this.symbol), p = 0 === u.indexOf("url"), n ? n[r ? "show" : "hide"](!0).animate(k({
                    x: e - g,
                    y: f - g
                }, n.symbolName ? {
                    width: 2 * g,
                    height: 2 * g
                } : {})) : r && (0 < g || p) && (l.graphic = n = b.renderer.symbol(u, e - g, f - g, 2 * g, 2 * g, v ? m : q).attr({
                    r: g
                }).add(D)), n && n.attr(this.pointAttribs(l, l.selected && "select")), n && n.addClass(l.getClassName(), !0)) : n && (l.graphic = n.destroy())
            },
            pointAttribs: function(a, b) {
                var c = this.options.marker,
                    e = a && a.options,
                    f = e && e.marker || {},
                    d = c.lineWidth,
                    h = this.color,
                    e = e && e.color,
                    k = a && a.color,
                    l, g;
                a && this.zones.length && (g = a.getZone()) && g.color && (l = g.color);
                h = e || l || k || h;
                l = f.fillColor || c.fillColor || h;
                h = f.lineColor || c.lineColor || h;
                b && (c = c.states[b], f = f.states && f.states[b] || {}, d = c.lineWidth || d + c.lineWidthPlus, l = f.fillColor || c.fillColor || l, h = f.lineColor || c.lineColor || h);
                return {
                    stroke: h,
                    "stroke-width": d,
                    fill: l
                }
            },
            destroy: function() {
                var a = this,
                    b = a.chart,
                    c = /AppleWebKit\/533/.test(I.navigator.userAgent),
                    e, d = a.data || [],
                    h, k, l;
                v(a, "destroy");
                f(a);
                n(a.axisTypes || [], function(b) {
                    (l = a[b]) && l.series && (p(l.series, a), l.isDirty = l.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (e = d.length; e--;)(h = d[e]) && h.destroy && h.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (k in a) a[k] instanceof H && !a[k].survive && (e = c && "group" === k ? "hide" : "destroy", a[k][e]());
                b.hoverSeries === a && (b.hoverSeries = null);
                p(b.series, a);
                for (k in a) delete a[k]
            },
            getGraphPath: function(a, b, c) {
                var e = this,
                    f = e.options,
                    d = f.step,
                    h, k = [],
                    l = [],
                    g;
                a = a || e.points;
                (h = a.reversed) && a.reverse();
                (d = {
                        right: 1,
                        center: 2
                    }[d] || d && 3) && h && (d = 4 - d);
                !f.connectNulls || b || c || (a = this.getValidPoints(a));
                n(a, function(h, u) {
                    var p = h.plotX,
                        n = h.plotY,
                        q = a[u - 1];
                    (h.leftCliff || q && q.rightCliff) && !c && (g = !0);
                    h.isNull && !r(b) && 0 < u ? g = !f.connectNulls : h.isNull && !b ? g = !0 : (0 === u || g ? q = ["M", h.plotX, h.plotY] : e.getPointSpline ? q = e.getPointSpline(a, h, u) : d ? (q = 1 === d ? ["L", q.plotX, n] : 2 === d ? ["L", (q.plotX + p) / 2, q.plotY, "L", (q.plotX + p) / 2, n] : ["L", p, q.plotY], q.push("L", p, n)) : q = ["L", p, n], l.push(h.x), d && l.push(h.x), k.push.apply(k, q), g = !1)
                });
                k.xMap = l;
                return e.graphPath = k
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    e = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ];
                n(this.zones, function(c, f) {
                    e.push(["zone-graph-" + f, "highcharts-graph highcharts-zone-graph-" + f + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
                });
                n(e, function(e, f) {
                    var d = e[0],
                        h = a[d];
                    h ? (h.endX = c.xMap, h.animate({
                        d: c
                    })) : c.length && (a[d] = a.chart.renderer.path(c).addClass(e[1]).attr({
                        zIndex: 1
                    }).add(a.group), h = {
                        stroke: e[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, e[3] ? h.dashstyle = e[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), h = a[d].attr(h).shadow(2 > f && b.shadow));
                    h && (h.startX = c.xMap, h.isArea = c.isArea)
                })
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    e = this.zones,
                    f, d, k = this.clips || [],
                    l, g = this.graph,
                    u = this.area,
                    p = Math.max(b.chartWidth, b.chartHeight),
                    q = this[(this.zoneAxis || "y") + "Axis"],
                    m, v, r = b.inverted,
                    D, t, F, H, B = !1;
                e.length && (g || u) && q && void 0 !== q.min && (v = q.reversed, D = q.horiz, g && g.hide(), u && u.hide(), m = q.getExtremes(), n(e, function(e, n) {
                    f = v ? D ? b.plotWidth : 0 : D ? 0 : q.toPixels(m.min);
                    f = Math.min(Math.max(h(d, f), 0), p);
                    d = Math.min(Math.max(Math.round(q.toPixels(h(e.value, m.max), !0)), 0), p);
                    B && (f = d = q.toPixels(m.max));
                    t = Math.abs(f - d);
                    F = Math.min(f, d);
                    H = Math.max(f, d);
                    q.isXAxis ? (l = {
                        x: r ? H : F,
                        y: 0,
                        width: t,
                        height: p
                    }, D || (l.x = b.plotHeight - l.x)) : (l = {
                        x: 0,
                        y: r ? H : F,
                        width: p,
                        height: t
                    }, D && (l.y = b.plotWidth - l.y));
                    r && c.isVML && (l = q.isXAxis ? {
                        x: 0,
                        y: v ? F : H,
                        height: l.width,
                        width: b.chartWidth
                    } : {
                        x: l.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: l.height,
                        height: b.chartHeight
                    });
                    k[n] ? k[n].animate(l) : (k[n] = c.clipRect(l), g && a["zone-graph-" + n].clip(k[n]), u && a["zone-area-" + n].clip(k[n]));
                    B = e.value > m.max
                }), this.clips = k)
            },
            invertGroups: function(a) {
                function b() {
                    var e = {
                        width: c.yAxis.len,
                        height: c.xAxis.len
                    };
                    n(["group", "markerGroup"], function(b) {
                        c[b] && c[b].attr(e).invert(a)
                    })
                }
                var c = this,
                    e = c.chart;
                c.xAxis && (A(e, "resize", b), A(c, "destroy", function() {
                    f(e, "resize", b)
                }), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, e, f) {
                var d = this[a],
                    h = !d;
                h && (this[a] = d = this.chart.renderer.g(b).attr({
                    zIndex: e || .1
                }).add(f), d.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                d.attr({
                    visibility: c
                })[h ? "attr" : "animate"](this.getPlotBox());
                return d
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, e = a.options,
                    f = !! a.animate && b.renderer.isSVG && y(e.animation).duration,
                    d = a.visible ? "inherit" : "hidden",
                    h = e.zIndex,
                    k = a.hasRendered,
                    l = b.seriesGroup,
                    g = b.inverted;
                c = a.plotGroup("group", "series", d, h, l);
                a.markerGroup = a.plotGroup("markerGroup", "markers", d, h, l);
                f && a.animate(!0);
                c.inverted = a.isCartesian ? g : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(g);
                !1 === e.clip || a.sharedClipKey || k || c.clip(b.clipRect);
                f && a.animate();
                k || (a.animationTimeout = F(function() {
                    a.afterAnimate()
                }, f));
                a.isDirty = a.isDirtyData = !1;
                a.hasRendered = !0
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    e = this.xAxis,
                    f = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: h(e && e.left, a.plotLeft),
                    translateY: h(f && f.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    e = this.yAxis,
                    f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b)
            },
            buildKDTree: function() {
                function a(c, e, f) {
                    var d, h;
                    if (h = c && c.length) return d = b.kdAxisArray[e % f], c.sort(function(a, b) {
                        return a[d] - b[d]
                    }), h = Math.floor(h / 2), {
                        point: c[h],
                        left: a(c.slice(0, h), e + 1, f),
                        right: a(c.slice(h + 1), e + 1, f)
                    }
                }
                var b = this,
                    c = b.kdDimensions;
                delete b.kdTree;
                F(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c)
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function c(a, b, k, l) {
                    var g = b.point,
                        u = e.kdAxisArray[k % l],
                        q, n, p = g;
                    n = r(a[f]) && r(g[f]) ? Math.pow(a[f] - g[f], 2) : null;
                    q = r(a[d]) && r(g[d]) ? Math.pow(a[d] - g[d], 2) : null;
                    q = (n || 0) + (q || 0);
                    g.dist = r(q) ? Math.sqrt(q) : Number.MAX_VALUE;
                    g.distX = r(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                    u = a[u] - g[u];
                    q = 0 > u ? "left" : "right";
                    n = 0 > u ? "right" : "left";
                    b[q] && (q = c(a, b[q], k + 1, l), p = q[h] < p[h] ? q : g);
                    b[n] && Math.sqrt(u * u) < p[h] && (a = c(a, b[n], k + 1, l), p = a[h] < p[h] ? a : p);
                    return p
                }
                var e = this,
                    f = this.kdAxisArray[0],
                    d = this.kdAxisArray[1],
                    h = b ? "distX" : "dist";
                this.kdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
            }
        })
    })(K);
    (function(a) {
        function A(a, d, b, k, g) {
            var m = a.chart.inverted;
            this.axis = a;
            this.isNegative = b;
            this.options = d;
            this.x = k;
            this.total = null;
            this.points = {};
            this.stack = g;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: d.align || (m ? b ? "left" : "right" : "center"),
                verticalAlign: d.verticalAlign || (m ? "middle" : b ? "bottom" : "top"),
                y: r(d.y, m ? 4 : b ? 14 : -6),
                x: r(d.x, m ? b ? -6 : 6 : 0)
            };
            this.textAlign = d.textAlign || (m ? b ? "right" : "left" : "center")
        }
        var y = a.Axis,
            E = a.Chart,
            G = a.correctFloat,
            t = a.defined,
            g = a.destroyObjectProperties,
            d = a.each,
            m = a.format,
            r = a.pick;
        a = a.Series;
        A.prototype = {
            destroy: function() {
                g(this, this.axis)
            },
            render: function(a) {
                var d = this.options,
                    b = d.format,
                    b = b ? m(b, this) : d.formatter.call(this);
                this.label ? this.label.attr({
                    text: b,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(b, null, null, d.useHTML).css(d.style).attr({
                    align: this.textAlign,
                    rotation: d.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function(a, d) {
                var b = this.axis,
                    k = b.chart,
                    g = k.inverted,
                    m = b.reversed,
                    m = this.isNegative && !m || !this.isNegative && m,
                    e = b.translate(b.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    b = b.translate(0),
                    b = Math.abs(e - b),
                    c = k.xAxis[0].translate(this.x) + a,
                    l = k.plotHeight,
                    m = {
                        x: g ? m ? e : e - b : c,
                        y: g ? l - c - d : m ? l - e - b : l - e,
                        width: g ? b : d,
                        height: g ? d : b
                    };
                if (g = this.label) g.align(this.alignOptions, null, m), m = g.alignAttr, g[!1 === this.options.crop || k.isInsidePlot(m.x, m.y) ? "show" : "hide"](!0)
            }
        };
        E.prototype.getStacks = function() {
            var a = this;
            d(a.yAxis, function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            d(a.series, function(d) {
                !d.options.stacking || !0 !== d.visible && !1 !== a.options.chart.ignoreHiddenSeries || (d.stackKey = d.type + r(d.options.stack, ""))
            })
        };
        y.prototype.buildStacks = function() {
            var a = this.series,
                d, b = r(this.options.reversedStacks, !0),
                k = a.length,
                g;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (g = k; g--;) a[b ? g : k - g - 1].setStackedPoints();
                for (g = k; g--;) d = a[b ? g : k - g - 1], d.setStackCliffs && d.setStackCliffs();
                if (this.usePercentage) for (g = 0; g < k; g++) a[g].setPercentStacks()
            }
        };
        y.prototype.renderStackTotals = function() {
            var a = this.chart,
                d = a.renderer,
                b = this.stacks,
                k, g, m = this.stackTotalGroup;
            m || (this.stackTotalGroup = m = d.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            m.translate(a.plotLeft, a.plotTop);
            for (k in b) for (g in a = b[k], a) a[g].render(m)
        };
        y.prototype.resetStacks = function() {
            var a = this.stacks,
                d, b;
            if (!this.isXAxis) for (d in a) for (b in a[d]) a[d][b].touched < this.stacksTouched ? (a[d][b].destroy(), delete a[d][b]) : (a[d][b].total = null, a[d][b].cum = 0)
        };
        y.prototype.cleanStacks = function() {
            var a, d, b;
            if (!this.isXAxis) for (d in this.oldStacks && (a = this.stacks = this.oldStacks), a) for (b in a[d]) a[d][b].cum = a[d][b].total
        };
        a.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var a = this.processedXData,
                    d = this.processedYData,
                    b = [],
                    k = d.length,
                    g = this.options,
                    m = g.threshold,
                    e = g.startFromThreshold ? m : 0,
                    c = g.stack,
                    g = g.stacking,
                    l = this.stackKey,
                    q = "-" + l,
                    h = this.negStacks,
                    f = this.yAxis,
                    u = f.stacks,
                    D = f.oldStacks,
                    H, F, I, C, w, y, E;
                f.stacksTouched += 1;
                for (w = 0; w < k; w++) y = a[w], E = d[w], H = this.getStackIndicator(H, y, this.index), C = H.key, I = (F = h && E < (e ? 0 : m)) ? q : l, u[I] || (u[I] = {}), u[I][y] || (D[I] && D[I][y] ? (u[I][y] = D[I][y], u[I][y].total = null) : u[I][y] = new A(f, f.options.stackLabels, F, y, c)), I = u[I][y], null !== E && (I.points[C] = I.points[this.index] = [r(I.cum, e)], t(I.cum) || (I.base = C), I.touched = f.stacksTouched, 0 < H.index && !1 === this.singleStacks && (I.points[C][0] = I.points[this.index + "," + y + ",0"][0])), "percent" === g ? (F = F ? l : q, h && u[F] && u[F][y] ? (F = u[F][y], I.total = F.total = Math.max(F.total, I.total) + Math.abs(E) || 0) : I.total = G(I.total + (Math.abs(E) || 0))) : I.total = G(I.total + (E || 0)), I.cum = r(I.cum, e) + (E || 0), null !== E && (I.points[C].push(I.cum), b[w] = I.cum);
                "percent" === g && (f.usePercentage = !0);
                this.stackedYData = b;
                f.oldStacks = {}
            }
        };
        a.prototype.setPercentStacks = function() {
            var a = this,
                g = a.stackKey,
                b = a.yAxis.stacks,
                k = a.processedXData,
                m;
            d([g, "-" + g], function(d) {
                for (var e = k.length, c, g; e--;) if (c = k[e], m = a.getStackIndicator(m, c, a.index), c = (g = b[d] && b[d][c]) && g.points[m.key]) g = g.total ? 100 / g.total : 0, c[0] = G(c[0] * g), c[1] = G(c[1] * g), a.stackedYData[e] = c[1]
            })
        };
        a.prototype.getStackIndicator = function(a, d, b) {
            t(a) && a.x === d ? a.index++ : a = {
                x: d,
                index: 0
            };
            a.key = [b, d, a.index].join();
            return a
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.animate,
            E = a.Axis,
            G = a.createElement,
            t = a.css,
            g = a.defined,
            d = a.each,
            m = a.erase,
            r = a.extend,
            n = a.fireEvent,
            p = a.inArray,
            b = a.isObject,
            k = a.merge,
            v = a.pick,
            B = a.Point,
            e = a.Series,
            c = a.seriesTypes,
            l = a.setAnimation,
            q = a.splat;
        r(a.Chart.prototype, {
            addSeries: function(a, b, c) {
                var e, d = this;
                a && (b = v(b, !0), n(d, "addSeries", {
                    options: a
                }, function() {
                    e = d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    b && d.redraw(c)
                }));
                return e
            },
            addAxis: function(a, b, c, e) {
                var d = b ? "xAxis" : "yAxis",
                    g = this.options;
                a = k(a, {
                    index: this[d].length,
                    isX: b
                });
                new E(this, a);
                g[d] = q(g[d] || {});
                g[d].push(a);
                v(c, !0) && this.redraw(e)
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    e = b.loadingDiv,
                    d = c.loading,
                    g = function() {
                        e && t(e, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = G("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = G("span", {
                    className: "highcharts-loading-inner"
                }, null, e), A(b, "redraw", g));
                setTimeout(function() {
                    e.className = "highcharts-loading"
                });
                b.loadingSpan.innerHTML = a || c.lang.loading;
                t(e, r(d.style, {
                    zIndex: 10
                }));
                t(b.loadingSpan, d.labelStyle);
                b.loadingShown || (t(e, {
                    opacity: 0,
                    display: ""
                }), y(e, {
                    opacity: d.style.opacity || .5
                }, {
                    duration: d.showDuration || 0
                }));
                b.loadingShown = !0;
                g()
            },
            hideLoading: function() {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", y(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        t(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: ["chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions"],
            update: function(a, b) {
                var c, e = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    l = a.chart,
                    m, n;
                if (l) {
                    k(!0, this.options.chart, l);
                    "className" in l && this.setClassName(l.className);
                    if ("inverted" in l || "polar" in l) this.propFromSeries(), m = !0;
                    for (c in l) l.hasOwnProperty(c) && (-1 !== p("chart." + c, this.propsRequireUpdateSeries) && (n = !0), -1 !== p(c, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                    "style" in l && this.renderer.setStyle(l.style)
                }
                for (c in a) {
                    if (this[c] && "function" === typeof this[c].update) this[c].update(a[c], !1);
                    else if ("function" === typeof this[e[c]]) this[e[c]](a[c]);
                    "chart" !== c && -1 !== p(c, this.propsRequireUpdateSeries) && (n = !0)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && k(!0, this.options.plotOptions, a.plotOptions);
                d(["xAxis", "yAxis", "series"], function(b) {
                    a[b] && d(q(a[b]), function(a) {
                        var c = g(a.id) && this.get(a.id) || this[b][0];
                        c && c.coll === b && c.update(a, !1)
                    }, this)
                }, this);
                m && d(this.axes, function(a) {
                    a.update({}, !1)
                });
                n && d(this.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && k(!0, this.options.loading, a.loading);
                l && ("width" in l || "height" in l) ? this.setSize(l.width, l.height) : v(b, !0) && this.redraw()
            },
            setSubtitle: function(a) {
                this.setTitle(void 0, a)
            }
        });
        r(B.prototype, {
            update: function(a, c, e, d) {
                function g() {
                    k.applyOptions(a);
                    null === k.y && q && (k.graphic = q.destroy());
                    b(a, !0) && (q && q.element && a && a.marker && a.marker.symbol && (k.graphic = q.destroy()), a && a.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()));
                    m = k.index;
                    l.updateParallelArrays(k, m);
                    p.data[m] = b(p.data[m], !0) ? k.options : a;
                    l.isDirty = l.isDirtyData = !0;
                    !l.fixedBox && l.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === p.legendType && (n.isDirtyLegend = !0);
                    c && n.redraw(e)
                }
                var k = this,
                    l = k.series,
                    q = k.graphic,
                    m, n = l.chart,
                    p = l.options;
                c = v(c, !0);
                !1 === d ? g() : k.firePointEvent("update", {
                    options: a
                }, g)
            },
            remove: function(a, b) {
                this.series.removePoint(p(this, this.series.data), a, b)
            }
        });
        r(e.prototype, {
            addPoint: function(a, b, c, e) {
                var d = this.options,
                    g = this.data,
                    k = this.chart,
                    l = this.xAxis && this.xAxis.names,
                    q = d.data,
                    m, n, p = this.xData,
                    r, t;
                b = v(b, !0);
                m = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(m, [a]);
                t = m.x;
                r = p.length;
                if (this.requireSorting && t < p[r - 1]) for (n = !0; r && p[r - 1] > t;) r--;
                this.updateParallelArrays(m, "splice", r, 0, 0);
                this.updateParallelArrays(m, r);
                l && m.name && (l[t] = m.name);
                q.splice(r, 0, a);
                n && (this.data.splice(r, 0, null), this.processData());
                "point" === d.legendType && this.generatePoints();
                c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(m, "shift"), q.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && k.redraw(e)
            },
            removePoint: function(a, b, c) {
                var e = this,
                    d = e.data,
                    g = d[a],
                    k = e.points,
                    q = e.chart,
                    m = function() {
                        k && k.length === d.length && k.splice(a, 1);
                        d.splice(a, 1);
                        e.options.data.splice(a, 1);
                        e.updateParallelArrays(g || {
                                series: e
                            }, "splice", a, 1);
                        g && g.destroy();
                        e.isDirty = !0;
                        e.isDirtyData = !0;
                        b && q.redraw()
                    };
                l(c, q);
                b = v(b, !0);
                g ? g.firePointEvent("remove", null, m) : m()
            },
            remove: function(a, b, c) {
                function e() {
                    d.destroy();
                    g.isDirtyLegend = g.isDirtyBox = !0;
                    g.linkSeries();
                    v(a, !0) && g.redraw(b)
                }
                var d = this,
                    g = d.chart;
                !1 !== c ? n(d, "remove", null, e) : e()
            },
            update: function(a, b) {
                var e = this,
                    g = this.chart,
                    l = this.userOptions,
                    q = this.type,
                    m = a.type || l.type || g.options.chart.type,
                    n = c[q].prototype,
                    p = ["group", "markerGroup", "dataLabelsGroup"],
                    t;
                if (m && m !== q || void 0 !== a.zIndex) p.length = 0;
                d(p, function(a) {
                    p[a] = e[a];
                    delete e[a]
                });
                a = k(l, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, a);
                this.remove(!1, null, !1);
                for (t in n) this[t] = void 0;
                r(this, c[m || q].prototype);
                d(p, function(a) {
                    e[a] = p[a]
                });
                this.init(g, a);
                g.linkSeries();
                v(b, !0) && g.redraw(!1)
            }
        });
        r(E.prototype, {
            update: function(a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = k(this.userOptions, a);
                this.destroy(!0);
                this.init(c, r(a, {
                    events: void 0
                }));
                c.isDirtyBox = !0;
                v(b, !0) && c.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, c = this.coll, e = this.series, g = e.length; g--;) e[g] && e[g].remove(!1);
                m(b.axes, this);
                m(b[c], this);
                b.options[c].splice(this.options.index, 1);
                d(b[c], function(a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                v(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(K);
    (function(a) {
        var A = a.color,
            y = a.each,
            E = a.map,
            G = a.pick,
            t = a.Series,
            g = a.seriesType;
        g("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function() {
                var a = [],
                    g = [],
                    r = this.xAxis,
                    n = this.yAxis,
                    p = n.stacks[this.stackKey],
                    b = {},
                    k = this.points,
                    v = this.index,
                    t = n.series,
                    e = t.length,
                    c, l = G(n.options.reversedStacks, !0) ? 1 : -1,
                    q, h;
                if (this.options.stacking) {
                    for (q = 0; q < k.length; q++) b[k[q].x] = k[q];
                    for (h in p) null !== p[h].total && g.push(h);
                    g.sort(function(a, b) {
                        return a - b
                    });
                    c = E(t, function() {
                        return this.visible
                    });
                    y(g, function(f, h) {
                        var k = 0,
                            t, F;
                        if (b[f] && !b[f].isNull) a.push(b[f]), y([-1, 1], function(a) {
                            var d = 1 === a ? "rightNull" : "leftNull",
                                k = 0,
                                n = p[g[h + a]];
                            if (n) for (q = v; 0 <= q && q < e;) t = n.points[q], t || (q === v ? b[f][d] = !0 : c[q] && (F = p[f].points[q]) && (k -= F[1] - F[0])), q += l;
                            b[f][1 === a ? "rightCliff" : "leftCliff"] = k
                        });
                        else {
                            for (q = v; 0 <= q && q < e;) {
                                if (t = p[f].points[q]) {
                                    k = t[1];
                                    break
                                }
                                q += l
                            }
                            k = n.toPixels(k, !0);
                            a.push({
                                isNull: !0,
                                plotX: r.toPixels(f, !0),
                                plotY: k,
                                yBottom: k
                            })
                        }
                    })
                }
                return a
            },
            getGraphPath: function(a) {
                var g = t.prototype.getGraphPath,
                    r = this.options,
                    n = r.stacking,
                    p = this.yAxis,
                    b, k, v = [],
                    B = [],
                    e = this.index,
                    c, l = p.stacks[this.stackKey],
                    q = r.threshold,
                    h = p.getThreshold(r.threshold),
                    f, r = r.connectNulls || "percent" === n,
                    u = function(b, f, g) {
                        var k = a[b];
                        b = n && l[k.x].points[e];
                        var u = k[g + "Null"] || 0;
                        g = k[g + "Cliff"] || 0;
                        var m, r, k = !0;
                        g || u ? (m = (u ? b[0] : b[1]) + g, r = b[0] + g, k = !! u) : !n && a[f] && a[f].isNull && (m = r = q);
                        void 0 !== m && (B.push({
                            plotX: c,
                            plotY: null === m ? h : p.getThreshold(m),
                            isNull: k
                        }), v.push({
                            plotX: c,
                            plotY: null === r ? h : p.getThreshold(r),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                n && (a = this.getStackPoints());
                for (b = 0; b < a.length; b++) if (k = a[b].isNull, c = G(a[b].rectPlotX, a[b].plotX), f = G(a[b].yBottom, h), !k || r) r || u(b, b - 1, "left"), k && !n && r || (B.push(a[b]), v.push({
                    x: b,
                    plotX: c,
                    plotY: f
                })), r || u(b, b + 1, "right");
                b = g.call(this, B, !0, !0);
                v.reversed = !0;
                k = g.call(this, v, !0, !0);
                k.length && (k[0] = "L");
                k = b.concat(k);
                g = g.call(this, B, !1, r);
                k.xMap = b.xMap;
                this.areaPath = k;
                return g
            },
            drawGraph: function() {
                this.areaPath = [];
                t.prototype.drawGraph.apply(this);
                var a = this,
                    g = this.areaPath,
                    r = this.options,
                    n = [
                        ["area", "highcharts-area", this.color, r.fillColor]
                    ];
                y(this.zones, function(g, b) {
                    n.push(["zone-area-" + b, "highcharts-area highcharts-zone-area-" + b + " " + g.className, g.color || a.color, g.fillColor || r.fillColor])
                });
                y(n, function(n) {
                    var b = n[0],
                        k = a[b];
                    k ? (k.endX = g.xMap, k.animate({
                        d: g
                    })) : (k = a[b] = a.chart.renderer.path(g).addClass(n[1]).attr({
                        fill: G(n[3], A(n[2]).setOpacity(G(r.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), k.isArea = !0);
                    k.startX = g.xMap;
                    k.shiftUnit = r.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function(a) {
        var A = a.extendClass,
            y = a.merge,
            E = a.pick,
            G = a.Series,
            t = a.seriesTypes;
        a.defaultPlotOptions.spline = y(a.defaultPlotOptions.line);
        t.spline = A(G, {
            type: "spline",
            getPointSpline: function(a, d, m) {
                var r = d.plotX,
                    n = d.plotY,
                    p = a[m - 1];
                m = a[m + 1];
                var b, k, v, t;
                if (p && !p.isNull && !1 !== p.doCurve && m && !m.isNull && !1 !== m.doCurve) {
                    a = p.plotY;
                    v = m.plotX;
                    m = m.plotY;
                    var e = 0;
                    b = (1.5 * r + p.plotX) / 2.5;
                    k = (1.5 * n + a) / 2.5;
                    v = (1.5 * r + v) / 2.5;
                    t = (1.5 * n + m) / 2.5;
                    v !== b && (e = (t - k) * (v - r) / (v - b) + n - t);
                    k += e;
                    t += e;
                    k > a && k > n ? (k = Math.max(a, n), t = 2 * n - k) : k < a && k < n && (k = Math.min(a, n), t = 2 * n - k);
                    t > m && t > n ? (t = Math.max(m, n), k = 2 * n - t) : t < m && t < n && (t = Math.min(m, n), k = 2 * n - t);
                    d.rightContX = v;
                    d.rightContY = t
                }
                d = ["C", E(p.rightContX, p.plotX), E(p.rightContY, p.plotY), E(b, r), E(k, n), r, n];
                p.rightContX = p.rightContY = null;
                return d
            }
        })
    })(K);
    (function(a) {
        var A = a.seriesTypes.area.prototype,
            y = a.seriesType;
        y("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: A.getStackPoints,
            getGraphPath: A.getGraphPath,
            setStackCliffs: A.setStackCliffs,
            drawGraph: A.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function(a) {
        var A = a.animObject,
            y = a.color,
            E = a.each,
            G = a.extend,
            t = a.isNumber,
            g = a.merge,
            d = a.pick,
            m = a.Series,
            r = a.seriesType,
            n = a.stop,
            p = a.svg;
        r("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1,
                    shadow: !1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                m.prototype.init.apply(this, arguments);
                var a = this,
                    d = a.chart;
                d.hasRendered && E(d.series, function(d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    g = a.options,
                    m = a.xAxis,
                    n = a.yAxis,
                    e = m.reversed,
                    c, l = {},
                    q = 0;
                !1 === g.grouping ? q = 1 : E(a.chart.series, function(e) {
                    var d = e.options,
                        f = e.yAxis,
                        h;
                    e.type === a.type && e.visible && n.len === f.len && n.pos === f.pos && (d.stacking ? (c = e.stackKey, void 0 === l[c] && (l[c] = q++), h = l[c]) : !1 !== d.grouping && (h = q++), e.columnIndex = h)
                });
                var h = Math.min(Math.abs(m.transA) * (m.ordinalSlope || g.pointRange || m.closestPointRange || m.tickInterval || 1), m.len),
                    f = h * g.groupPadding,
                    u = (h - 2 * f) / q,
                    g = Math.min(g.maxPointWidth || m.len, d(g.pointWidth, u * (1 - 2 * g.pointPadding)));
                a.columnMetrics = {
                    width: g,
                    offset: (u - g) / 2 + (f + ((a.columnIndex || 0) + (e ? 1 : 0)) * u - h / 2) * (e ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, d, g, m) {
                var e = this.chart,
                    c = this.borderWidth,
                    l = -(c % 2 ? .5 : 0),
                    c = c % 2 ? .5 : 1;
                e.inverted && e.renderer.isVML && (c += 1);
                g = Math.round(a + g) + l;
                a = Math.round(a) + l;
                m = Math.round(d + m) + c;
                l = .5 >= Math.abs(d) && .5 < m;
                d = Math.round(d) + c;
                m -= d;
                l && m && (--d, m += 1);
                return {
                    x: a,
                    y: d,
                    width: g - a,
                    height: m
                }
            },
            translate: function() {
                var a = this,
                    g = a.chart,
                    n = a.options,
                    p = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    p = a.borderWidth = d(n.borderWidth, p ? 0 : 1),
                    e = a.yAxis,
                    c = a.translatedThreshold = e.getThreshold(n.threshold),
                    l = d(n.minPointLength, 5),
                    q = a.getColumnMetrics(),
                    h = q.width,
                    f = a.barW = Math.max(h, 1 + 2 * p),
                    u = a.pointXOffset = q.offset;
                g.inverted && (c -= .5);
                n.pointPadding && (f = Math.ceil(f));
                m.prototype.translate.apply(a);
                E(a.points, function(q) {
                    var m = d(q.yBottom, c),
                        n = 999 + Math.abs(m),
                        n = Math.min(Math.max(-n, q.plotY), e.len + n),
                        p = q.plotX + u,
                        r = f,
                        t = Math.min(n, m),
                        v, B = Math.max(n, m) - t;
                    Math.abs(B) < l && l && (B = l, v = !e.reversed && !q.negative || e.reversed && q.negative, t = Math.abs(t - c) > l ? m - l : c - (v ? l : 0));
                    q.barX = p;
                    q.pointWidth = h;
                    q.tooltipPos = g.inverted ? [e.len + e.pos - g.plotLeft - n, a.xAxis.len - p - r / 2, B] : [p + r / 2, n + e.pos - g.plotTop, B];
                    q.shapeType = "rect";
                    q.shapeArgs = a.crispCol.apply(a, q.isNull ? [q.plotX, e.len / 2, 0, 0] : [p, t, r, B])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, d) {
                var g = this.options,
                    m, e, c = this.pointAttrToOptions || {};
                e = c.stroke || "borderColor";
                var l = c["stroke-width"] || "borderWidth",
                    q = a && a.color || this.color,
                    h = g[e] || this.color || q,
                    c = g.dashStyle,
                    f;
                a && this.zones.length && (q = (m = a.getZone()) && m.color || a.options.color || this.color);
                d && (m = g.states[d], f = m.brightness, q = m.color || void 0 !== f && y(q).brighten(m.brightness).get() || q, h = m[e] || h, c = m.dashStyle || c);
                e = {
                    fill: q,
                    stroke: h,
                    "stroke-width": a[l] || g[l] || this[l] || 0
                };
                g.borderRadius && (e.r = g.borderRadius);
                c && (e.dashstyle = c);
                return e
            },
            drawPoints: function() {
                var a = this,
                    d = this.chart,
                    m = a.options,
                    p = d.renderer,
                    e = m.animationLimit || 250,
                    c;
                E(a.points, function(l) {
                    var q = l.graphic;
                    t(l.plotY) && null !== l.y ? (c = l.shapeArgs, q ? (n(q), q[d.pointCount < e ? "animate" : "attr"](g(c))) : l.graphic = q = p[l.shapeType](c).attr({
                        "class": l.getClassName()
                    }).add(l.group || a.group), q.attr(a.pointAttribs(l, l.selected && "select")).shadow(m.shadow, null, m.stacking && !m.borderRadius)) : q && (l.graphic = q.destroy())
                })
            },
            animate: function(a) {
                var d = this,
                    g = this.yAxis,
                    m = d.options,
                    e = this.chart.inverted,
                    c = {};
                p && (a ? (c.scaleY = .001, a = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(m.threshold))), e ? c.translateX = a - g.len : c.translateY = a, d.group.attr(c)) : (c[e ? "translateX" : "translateY"] = g.pos, d.group.animate(c, G(A(d.options.animation), {
                    step: function(a, b) {
                        d.group.attr({
                            scaleY: Math.max(.001, b.pos)
                        })
                    }
                })), d.animate = null))
            },
            remove: function() {
                var a = this,
                    d = a.chart;
                d.hasRendered && E(d.series, function(d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                m.prototype.remove.apply(a, arguments)
            }
        })
    })(K);
    (function(a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(K);
    (function(a) {
        var A = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.85em"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function() {
                this.options.lineWidth && A.prototype.drawGraph.call(this)
            }
        })
    })(K);
    (function(a) {
        var A = a.pick,
            y = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function() {
                var a = this.options,
                    G = this.chart,
                    t = 2 * (a.slicedOffset || 0),
                    g = G.plotWidth - 2 * t,
                    G = G.plotHeight - 2 * t,
                    d = a.center,
                    d = [A(d[0], "50%"), A(d[1], "50%"), a.size || "100%", a.innerSize || 0],
                    m = Math.min(g, G),
                    r, n;
                for (r = 0; 4 > r; ++r) n = d[r], a = 2 > r || 2 === r && /%$/.test(n), d[r] = y(n, [g, G, m, d[2]][r]) + (a ? t : 0);
                d[3] > d[2] && (d[3] = d[2]);
                return d
            }
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.defined,
            E = a.each,
            G = a.extend,
            t = a.inArray,
            g = a.noop,
            d = a.pick,
            m = a.Point,
            r = a.Series,
            n = a.seriesType,
            p = a.setAnimation;
        n("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return null === this.y ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1,
                    shadow: !1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function(a) {
                var d = this,
                    g = d.points,
                    m = d.startAngleRad;
                a || (E(g, function(a) {
                    var b = a.graphic,
                        g = a.shapeArgs;
                    b && (b.attr({
                        r: a.startR || d.center[3] / 2,
                        start: m,
                        end: m
                    }), b.animate({
                        r: g.r,
                        start: g.start,
                        end: g.end
                    }, d.options.animation))
                }), d.animate = null)
            },
            updateTotals: function() {
                var a, d = 0,
                    g = this.points,
                    m = g.length,
                    e, c = this.options.ignoreHiddenPoint;
                for (a = 0; a < m; a++) e = g[a], 0 > e.y && (e.y = null), d += c && !e.visible ? 0 : e.y;
                this.total = d;
                for (a = 0; a < m; a++) e = g[a], e.percentage = 0 < d && (e.visible || !c) ? e.y / d * 100 : 0, e.total = d
            },
            generatePoints: function() {
                r.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function(a) {
                this.generatePoints();
                var g = 0,
                    m = this.options,
                    n = m.slicedOffset,
                    e = n + (m.borderWidth || 0),
                    c, l, q, h = m.startAngle || 0,
                    f = this.startAngleRad = Math.PI / 180 * (h - 90),
                    h = (this.endAngleRad = Math.PI / 180 * (d(m.endAngle, h + 360) - 90)) - f,
                    u = this.points,
                    p = m.dataLabels.distance,
                    m = m.ignoreHiddenPoint,
                    r, t = u.length,
                    y;
                a || (this.center = a = this.getCenter());
                this.getX = function(c, e) {
                    q = Math.asin(Math.min((c - a[1]) / (a[2] / 2 + p), 1));
                    return a[0] + (e ? -1 : 1) * Math.cos(q) * (a[2] / 2 + p)
                };
                for (r = 0; r < t; r++) {
                    y = u[r];
                    c = f + g * h;
                    if (!m || y.visible) g += y.percentage / 100;
                    l = f + g * h;
                    y.shapeType = "arc";
                    y.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * c) / 1E3,
                        end: Math.round(1E3 * l) / 1E3
                    };
                    q = (l + c) / 2;
                    q > 1.5 * Math.PI ? q -= 2 * Math.PI : q < -Math.PI / 2 && (q += 2 * Math.PI);
                    y.slicedTranslation = {
                        translateX: Math.round(Math.cos(q) * n),
                        translateY: Math.round(Math.sin(q) * n)
                    };
                    c = Math.cos(q) * a[2] / 2;
                    l = Math.sin(q) * a[2] / 2;
                    y.tooltipPos = [a[0] + .7 * c, a[1] + .7 * l];
                    y.half = q < -Math.PI / 2 || q > Math.PI / 2 ? 1 : 0;
                    y.angle = q;
                    e = Math.min(e, p / 5);
                    y.labelPos = [a[0] + c + Math.cos(q) * p, a[1] + l + Math.sin(q) * p, a[0] + c + Math.cos(q) * e, a[1] + l + Math.sin(q) * e, a[0] + c, a[1] + l, 0 > p ? "center" : y.half ? "right" : "left", q]
                }
            },
            drawGraph: null,
            drawPoints: function() {
                var a = this,
                    d = a.chart.renderer,
                    g, m, e, c, l = a.options.shadow;
                l && !a.shadowGroup && (a.shadowGroup = d.g("shadow").add(a.group));
                E(a.points, function(q) {
                    if (null !== q.y) {
                        m = q.graphic;
                        c = q.shapeArgs;
                        g = q.sliced ? q.slicedTranslation : {};
                        var h = q.shadowGroup;
                        l && !h && (h = q.shadowGroup = d.g("shadow").add(a.shadowGroup));
                        h && h.attr(g);
                        e = a.pointAttribs(q, q.selected && "select");
                        m ? m.setRadialReference(a.center).attr(e).animate(G(c, g)) : (q.graphic = m = d[q.shapeType](c).addClass(q.getClassName()).setRadialReference(a.center).attr(g).add(a.group), q.visible || m.attr({
                            visibility: "hidden"
                        }), m.attr(e).attr({
                            "stroke-linejoin": "round"
                        }).shadow(l, h))
                    }
                })
            },
            searchPoint: g,
            sortByAngle: function(a, d) {
                a.sort(function(a, b) {
                    return void 0 !== a.angle && (b.angle - a.angle) * d
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: a.CenteredSeriesMixin.getCenter,
            getSymbol: g
        }, {
            init: function() {
                m.prototype.init.apply(this, arguments);
                var a = this,
                    g;
                a.name = d(a.name, "Slice");
                g = function(d) {
                    a.slice("select" === d.type)
                };
                A(a, "select", g);
                A(a, "unselect", g);
                return a
            },
            setVisible: function(a, g) {
                var m = this,
                    n = m.series,
                    e = n.chart,
                    c = n.options.ignoreHiddenPoint;
                g = d(g, c);
                a !== m.visible && (m.visible = m.options.visible = a = void 0 === a ? !m.visible : a, n.options.data[t(m, n.data)] = m.options, E(["graphic", "dataLabel", "connector", "shadowGroup"], function(c) {
                    if (m[c]) m[c][a ? "show" : "hide"](!0)
                }), m.legendItem && e.legend.colorizeItem(m, a), a || "hover" !== m.state || m.setState(""), c && (n.isDirty = !0), g && e.redraw())
            },
            slice: function(a, g, m) {
                var n = this.series;
                p(m, n.chart);
                d(g, !0);
                this.sliced = this.options.sliced = a = y(a) ? a : !this.sliced;
                n.options.data[t(this, n.data)] = this.options;
                a = a ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                };
                this.graphic.animate(a);
                this.shadowGroup && this.shadowGroup.animate(a)
            },
            haloPath: function(a) {
                var d = this.shapeArgs,
                    g = this.series.chart;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(g.plotLeft + d.x, g.plotTop + d.y, d.r + a, d.r + a, {
                    innerR: this.shapeArgs.r,
                    start: d.start,
                    end: d.end
                })
            }
        })
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.arrayMax,
            E = a.defined,
            G = a.each,
            t = a.extend,
            g = a.format,
            d = a.map,
            m = a.merge,
            r = a.noop,
            n = a.pick,
            p = a.relativeLength,
            b = a.Series,
            k = a.seriesTypes,
            v = a.stableSort,
            B = a.stop;
        a.distribute = function(a, b) {
            function g(a, b) {
                return a.target - b.target
            }
            var k, h = !0,
                f = a,
                m = [],
                n;
            n = 0;
            for (k = a.length; k--;) n += a[k].size;
            if (n > b) {
                v(a, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (n = k = 0; n <= b;) n += a[k].size, k++;
                m = a.splice(k - 1, a.length)
            }
            v(a, g);
            for (a = d(a, function(a) {
                return {
                    size: a.size,
                    targets: [a.target]
                }
            }); h;) {
                for (k = a.length; k--;) h = a[k], n = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = Math.min(Math.max(0, n - h.size / 2), b - h.size);
                k = a.length;
                for (h = !1; k--;) 0 < k && a[k - 1].pos + a[k - 1].size > a[k].pos && (a[k - 1].size += a[k].size, a[k - 1].targets = a[k - 1].targets.concat(a[k].targets), a[k - 1].pos + a[k - 1].size > b && (a[k - 1].pos = b - a[k - 1].size), a.splice(k, 1), h = !0)
            }
            k = 0;
            G(a, function(a) {
                var b = 0;
                G(a.targets, function() {
                    f[k].pos = a.pos + b;
                    b += f[k].size;
                    k++
                })
            });
            f.push.apply(f, m);
            v(f, g)
        };
        b.prototype.drawDataLabels = function() {
            var a = this,
                b = a.options,
                d = b.dataLabels,
                k = a.points,
                h, f, u = a.hasRendered || 0,
                p, r, v = n(d.defer, !0),
                y = a.chart.renderer;
            if (d.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(d), r = a.plotGroup("dataLabelsGroup", "data-labels", v && !u ? "hidden" : "visible", d.zIndex || 6), v && (r.attr({
                opacity: +u
            }), u || A(a, "afterAnimate", function() {
                a.visible && r.show(!0);
                r[b.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), f = d, G(k, function(k) {
                var u, q = k.dataLabel,
                    v, x, F = k.connector,
                    B = !0,
                    A, G = {};
                h = k.dlOptions || k.options && k.options.dataLabels;
                u = n(h && h.enabled, f.enabled) && null !== k.y;
                if (q && !u) k.dataLabel = q.destroy();
                else if (u) {
                    d = m(f, h);
                    A = d.style;
                    u = d.rotation;
                    v = k.getLabelConfig();
                    p = d.format ? g(d.format, v) : d.formatter.call(v, d);
                    A.color = n(d.color, A.color, a.color, "#000000");
                    if (q) E(p) ? (q.attr({
                        text: p
                    }), B = !1) : (k.dataLabel = q = q.destroy(), F && (k.connector = F.destroy()));
                    else if (E(p)) {
                        q = {
                            fill: d.backgroundColor,
                            stroke: d.borderColor,
                            "stroke-width": d.borderWidth,
                            r: d.borderRadius || 0,
                            rotation: u,
                            padding: d.padding,
                            zIndex: 1
                        };
                        "contrast" === A.color && (G.color = d.inside || 0 > d.distance || b.stacking ? y.getContrast(k.color || a.color) : "#000000");
                        b.cursor && (G.cursor = b.cursor);
                        for (x in q) void 0 === q[x] && delete q[x];
                        q = k.dataLabel = y[u ? "text" : "label"](p, 0, -9999, d.shape, null, null, d.useHTML, null, "data-label").attr(q);
                        q.addClass("highcharts-data-label-color-" + k.colorIndex + " " + (d.className || ""));
                        q.css(t(A, G));
                        q.add(r);
                        q.shadow(d.shadow)
                    }
                    q && a.alignDataLabel(k, q, d, null, B)
                }
            })
        };
        b.prototype.alignDataLabel = function(a, b, d, g, h) {
            var f = this.chart,
                k = f.inverted,
                m = n(a.plotX, -9999),
                p = n(a.plotY, -9999),
                r = b.getBBox(),
                v, y = d.rotation,
                w = d.align,
                A = this.visible && (a.series.forceDL || f.isInsidePlot(m, Math.round(p), k) || g && f.isInsidePlot(m, k ? g.x + 1 : g.y + g.height - 1, k)),
                E = "justify" === n(d.overflow, "justify");
            A && (v = d.style.fontSize, v = f.renderer.fontMetrics(v, b).b, g = t({
                x: k ? f.plotWidth - p : m,
                y: Math.round(k ? f.plotHeight - m : p),
                width: 0,
                height: 0
            }, g), t(d, {
                width: r.width,
                height: r.height
            }), y ? (E = !1, k = f.renderer.rotCorr(v, y), k = {
                x: g.x + d.x + g.width / 2 + k.x,
                y: g.y + d.y + {
                    top: 0,
                    middle: .5,
                    bottom: 1
                }[d.verticalAlign] * g.height
            }, b[h ? "attr" : "animate"](k).attr({
                align: w
            }), m = (y + 720) % 360, m = 180 < m && 360 > m, "left" === w ? k.y -= m ? r.height : 0 : "center" === w ? (k.x -= r.width / 2, k.y -= r.height / 2) : "right" === w && (k.x -= r.width, k.y -= m ? 0 : r.height)) : (b.align(d, null, g), k = b.alignAttr), E ? this.justifyDataLabel(b, d, k, r, g, h) : n(d.crop, !0) && (A = f.isInsidePlot(k.x, k.y) && f.isInsidePlot(k.x + r.width, k.y + r.height)), d.shape && !y && b.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            A || (B(b), b.attr({
                y: -9999
            }), b.placed = !1)
        };
        b.prototype.justifyDataLabel = function(a, b, d, g, h, f) {
            var k = this.chart,
                m = b.align,
                n = b.verticalAlign,
                p, r, t = a.box ? 0 : a.padding || 0;
            p = d.x + t;
            0 > p && ("right" === m ? b.align = "left" : b.x = -p, r = !0);
            p = d.x + g.width - t;
            p > k.plotWidth && ("left" === m ? b.align = "right" : b.x = k.plotWidth - p, r = !0);
            p = d.y + t;
            0 > p && ("bottom" === n ? b.verticalAlign = "top" : b.y = -p, r = !0);
            p = d.y + g.height - t;
            p > k.plotHeight && ("top" === n ? b.verticalAlign = "bottom" : b.y = k.plotHeight - p, r = !0);
            r && (a.placed = !f, a.align(b, null, h))
        };
        k.pie && (k.pie.prototype.drawDataLabels = function() {
            var e = this,
                c = e.data,
                g, k = e.chart,
                h = e.options.dataLabels,
                f = n(h.connectorPadding, 10),
                m = n(h.connectorWidth, 1),
                p = k.plotWidth,
                r = k.plotHeight,
                t, v = h.distance,
                C = e.center,
                w = C[2] / 2,
                B = C[1],
                A = 0 < v,
                x, z, E, K, S = [
                    [],
                    []
                ],
                L, R, T, Q, P = [0, 0, 0, 0];
            e.visible && (h.enabled || e._hasPointLabels) && (b.prototype.drawDataLabels.apply(e), G(c, function(a) {
                a.dataLabel && a.visible && (S[a.half].push(a), a.dataLabel._pos = null)
            }), G(S, function(b, c) {
                var m, n, u = b.length,
                    t, y, F;
                if (u) for (e.sortByAngle(b, c - .5), 0 < v && (m = Math.max(0, B - w - v), n = Math.min(B + w + v, k.plotHeight), t = d(b, function(a) {
                    if (a.dataLabel) return F = a.dataLabel.getBBox().height || 21, {
                        target: a.labelPos[1] - m + F / 2,
                        size: F,
                        rank: a.y
                    }
                }), a.distribute(t, n + F - m)), Q = 0; Q < u; Q++) g = b[Q], E = g.labelPos, x = g.dataLabel, T = !1 === g.visible ? "hidden" : "inherit", y = E[1], t ? void 0 === t[Q].pos ? T = "hidden" : (K = t[Q].size, R = m + t[Q].pos) : R = y, L = h.justify ? C[0] + (c ? -1 : 1) * (w + v) : e.getX(R < m + 2 || R > n - 2 ? y : R, c), x._attr = {
                    visibility: T,
                    align: E[6]
                }, x._pos = {
                    x: L + h.x + ({
                        left: f,
                        right: -f
                    }[E[6]] || 0),
                    y: R + h.y - 10
                }, E.x = L, E.y = R, null === e.options.size && (z = x.width, L - z < f ? P[3] = Math.max(Math.round(z - L + f), P[3]) : L + z > p - f && (P[1] = Math.max(Math.round(L + z - p + f), P[1])), 0 > R - K / 2 ? P[0] = Math.max(Math.round(-R + K / 2), P[0]) : R + K / 2 > r && (P[2] = Math.max(Math.round(R + K / 2 - r), P[2])))
            }), 0 === y(P) || this.verifyDataLabelOverflow(P)) && (this.placeDataLabels(), A && m && G(this.points, function(a) {
                var b;
                t = a.connector;
                if ((x = a.dataLabel) && x._pos && a.visible) {
                    T = x._attr.visibility;
                    if (b = !t) a.connector = t = k.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(e.dataLabelsGroup), t.attr({
                        "stroke-width": m,
                        stroke: h.connectorColor || a.color || "#666666"
                    });
                    t[b ? "attr" : "animate"]({
                        d: e.connectorPath(a.labelPos)
                    });
                    t.attr("visibility", T)
                } else t && (a.connector = t.destroy())
            }))
        }, k.pie.prototype.connectorPath = function(a) {
            var b = a.x,
                d = a.y;
            return n(this.options.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), d, "C", b, d, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), d, "L", a[2], a[3], "L", a[4], a[5]]
        }, k.pie.prototype.placeDataLabels = function() {
            G(this.points, function(a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            })
        }, k.pie.prototype.alignDataLabel = r, k.pie.prototype.verifyDataLabelOverflow = function(a) {
            var b = this.center,
                d = this.options,
                g = d.center,
                h = d.minSize || 80,
                f, k;
            null !== g[0] ? f = Math.max(b[2] - Math.max(a[1], a[3]), h) : (f = Math.max(b[2] - a[1] - a[3], h), b[0] += (a[3] - a[1]) / 2);
            null !== g[1] ? f = Math.max(Math.min(f, b[2] - Math.max(a[0], a[2])), h) : (f = Math.max(Math.min(f, b[2] - a[0] - a[2]), h), b[1] += (a[0] - a[2]) / 2);
            f < b[2] ? (b[2] = f, b[3] = Math.min(p(d.innerSize || 0, f), f), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : k = !0;
            return k
        });
        k.column && (k.column.prototype.alignDataLabel = function(a, c, d, g, h) {
            var f = this.chart.inverted,
                k = a.series,
                p = a.dlBox || a.shapeArgs,
                r = n(a.below, a.plotY > n(this.translatedThreshold, k.yAxis.len)),
                t = n(d.inside, !! this.options.stacking);
            p && (g = m(p), 0 > g.y && (g.height += g.y, g.y = 0), p = g.y + g.height - k.yAxis.len, 0 < p && (g.height -= p), f && (g = {
                x: k.yAxis.len - g.y - g.height,
                y: k.xAxis.len - g.x - g.width,
                width: g.height,
                height: g.width
            }), t || (f ? (g.x += r ? 0 : g.width, g.width = 0) : (g.y += r ? g.height : 0, g.height = 0)));
            d.align = n(d.align, !f || t ? "center" : r ? "right" : "left");
            d.verticalAlign = n(d.verticalAlign, f || t ? "middle" : r ? "top" : "bottom");
            b.prototype.alignDataLabel.call(this, a, c, d, g, h)
        })
    })(K);
    (function(a) {
        var A = a.Chart,
            y = a.each,
            E = a.pick,
            G = a.addEvent;
        A.prototype.callbacks.push(function(a) {
            function g() {
                var d = [];
                y(a.series, function(a) {
                    var g = a.options.dataLabels,
                        n = a.dataLabelCollections || ["dataLabel"];
                    (g.enabled || a._hasPointLabels) && !g.allowOverlap && a.visible && y(n, function(g) {
                        y(a.points, function(a) {
                            a[g] && (a[g].labelrank = E(a.labelrank, a.shapeArgs && a.shapeArgs.height), d.push(a[g]))
                        })
                    })
                });
                a.hideOverlappingLabels(d)
            }
            g();
            G(a, "redraw", g)
        });
        A.prototype.hideOverlappingLabels = function(a) {
            var g = a.length,
                d, m, r, n, p, b, k, v, B, e = function(a, b, d, e, f, g, k, m) {
                    return !(f > a + d || f + k < a || g > b + e || g + m < b)
                };
            for (m = 0; m < g; m++) if (d = a[m]) d.oldOpacity = d.opacity, d.newOpacity = 1;
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (m = 0; m < g; m++) for (r = a[m], d = m + 1; d < g; ++d) if (n = a[d], r && n && r.placed && n.placed && 0 !== r.newOpacity && 0 !== n.newOpacity && (p = r.alignAttr, b = n.alignAttr, k = r.parentGroup, v = n.parentGroup, B = 2 * (r.box ? 0 : r.padding), p = e(p.x + k.translateX, p.y + k.translateY, r.width - B, r.height - B, b.x + v.translateX, b.y + v.translateY, n.width - B, n.height - B)))(r.labelrank < n.labelrank ? r : n).newOpacity = 0;
            y(a, function(a) {
                var b, d;
                a && (d = a.newOpacity, a.oldOpacity !== d && a.placed && (d ? a.show(!0) : b = function() {
                    a.hide()
                }, a.alignAttr.opacity = d, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(K);
    (function(a) {
        var A = a.addEvent,
            y = a.Chart,
            E = a.createElement,
            G = a.css,
            t = a.defaultOptions,
            g = a.defaultPlotOptions,
            d = a.each,
            m = a.extend,
            r = a.fireEvent,
            n = a.hasTouch,
            p = a.inArray,
            b = a.isObject,
            k = a.Legend,
            v = a.merge,
            B = a.pick,
            e = a.Point,
            c = a.Series,
            l = a.seriesTypes,
            q = a.svg;
        a = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart,
                    c = b.pointer,
                    e = function(a) {
                        for (var c = a.target, d; c && !d;) d = c.point, c = c.parentNode;
                        if (void 0 !== d && d !== b.hoverPoint) d.onMouseOver(a)
                    };
                d(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.element.point = a)
                });
                a._hasTracking || (d(a.trackerGroups, function(b) {
                    if (a[b]) {
                        a[b].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function(a) {
                            c.onTrackerMouseOut(a)
                        });
                        if (n) a[b].on("touchstart", e);
                        a.options.cursor && a[b].css(G).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    e = [].concat(c ? a.areaPath : a.graphPath),
                    g = e.length,
                    k = a.chart,
                    m = k.pointer,
                    l = k.renderer,
                    p = k.options.tooltip.snap,
                    r = a.tracker,
                    t, v = function() {
                        if (k.hoverSeries !== a) a.onMouseOver()
                    },
                    y = "rgba(192,192,192," + (q ? 1E-4 : .002) + ")";
                if (g && !c) for (t = g + 1; t--;)"M" === e[t] && e.splice(t + 1, 0, e[t + 1] - p, e[t + 2], "L"), (t && "M" === e[t] || t === g) && e.splice(t, 0, "L", e[t - 2] + p, e[t - 1]);
                r ? r.attr({
                    d: e
                }) : a.graph && (a.tracker = l.path(e).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: y,
                    fill: c ? y : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * p),
                    zIndex: 2
                }).add(a.group), d([a.tracker, a.markerGroup], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", v).on("mouseout", function(a) {
                        m.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (n) a.on("touchstart", v)
                }))
            }
        };
        l.column && (l.column.prototype.drawTracker = a.drawTrackerPoint);
        l.pie && (l.pie.prototype.drawTracker = a.drawTrackerPoint);
        l.scatter && (l.scatter.prototype.drawTracker = a.drawTrackerPoint);
        m(k.prototype, {
            setItemEvents: function(a, b, c) {
                var d = this,
                    e = d.chart,
                    g = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    e.seriesGroup.addClass(g);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout", function() {
                    b.css(a.visible ? d.itemStyle : d.itemHiddenStyle);
                    e.seriesGroup.removeClass(g);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible()
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : r(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = E("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                A(a.checkbox, "click", function(b) {
                    r(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        t.legend.itemStyle.cursor = "pointer";
        m(y.prototype, {
            showResetZoom: function() {
                var a = this,
                    b = t.lang,
                    c = a.options.chart.resetZoomButton,
                    d = c.theme,
                    e = d.states,
                    g = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                    a.zoomOut()
                }, d, e && e.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, g)
            },
            zoomOut: function() {
                var a = this;
                r(a, "selection", {
                    resetSelection: !0
                }, function() {
                    a.zoom()
                })
            },
            zoom: function(a) {
                var c, e = this.pointer,
                    g = !1,
                    k;
                !a || a.resetSelection ? d(this.axes, function(a) {
                    c = a.zoom()
                }) : d(a.xAxis.concat(a.yAxis), function(a) {
                    var b = a.axis,
                        d = b.isXAxis;
                    if (e[d ? "zoomX" : "zoomY"] || e[d ? "pinchX" : "pinchY"]) c = b.zoom(a.min, a.max), b.displayBtn && (g = !0)
                });
                k = this.resetZoomButton;
                g && !k ? this.showResetZoom() : !g && b(k) && (this.resetZoomButton = k.destroy());
                c && this.redraw(B(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    e = c.hoverPoints,
                    g;
                e && d(e, function(a) {
                    a.setState()
                });
                d("xy" === b ? [1, 0] : [1], function(b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        e = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        f = c[d],
                        k = (b.pointRange || 0) / 2,
                        m = b.getExtremes(),
                        l = b.toValue(f - e, !0) + k,
                        k = b.toValue(f + b.len - e, !0) - k,
                        f = f > e;
                    b.series.length && (f || l > Math.min(m.dataMin, m.min)) && (!f || k < Math.max(m.dataMax, m.max)) && (b.setExtremes(l, k, !1, !1, {
                        trigger: "pan"
                    }), g = !0);
                    c[d] = e
                });
                g && c.redraw(!1);
                G(c.container, {
                    cursor: "move"
                })
            }
        });
        m(e.prototype, {
            select: function(a, b) {
                var c = this,
                    e = c.series,
                    g = e.chart;
                a = B(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    e.options.data[p(c, e.data)] = c.options;
                    c.setState(a && "select");
                    b || d(g.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, e.options.data[p(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a, b) {
                var c = this.series,
                    d = c.chart,
                    e = d.tooltip,
                    g = d.hoverPoint;
                if (d.hoverSeries !== c) c.onMouseOver();
                if (g && g !== this) g.onMouseOut();
                this.series && (this.firePointEvent("mouseOver"), !e || e.shared && !c.noSharedTooltip || e.refresh(this, a), this.setState("hover"), b || (d.hoverPoint = this))
            },
            onMouseOut: function() {
                var a = this.series.chart,
                    b = a.hoverPoints;
                this.firePointEvent("mouseOut");
                b && -1 !== p(this, b) || (this.setState(), a.hoverPoint = null)
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var a = v(this.series.options.point, this.options).events,
                        b;
                    this.events = a;
                    for (b in a) A(this, b, a[b]);
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    e = this.series,
                    k = e.options.states[a] || {},
                    l = g[e.type].marker && e.options.marker || {},
                    n = !1 === l.enabled,
                    p = l.states && l.states[a] || {},
                    q = !1 === p.enabled,
                    r = e.stateMarkerGraphic,
                    t = this.marker || {},
                    y = e.chart,
                    A = e.halo;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === k.enabled || a && (q || n && !1 === p.enabled) || a && t.states && t.states[a] && !1 === t.states[a].enabled)) {
                    l = p.radius || l.radius + (p.radiusPlus || 0);
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), c = l ? {
                        x: c - l,
                        y: d - l,
                        width: 2 * l,
                        height: 2 * l
                    } : {}, c = v(e.pointAttribs(this, a), c), this.graphic.attr(c), r && r.hide();
                    else {
                        if (a && p) {
                            p = t.symbol || e.symbol;
                            r && r.currentSymbol !== p && (r = r.destroy());
                            if (r) r[b ? "animate" : "attr"]({
                                x: c - l,
                                y: d - l
                            });
                            else p && (e.stateMarkerGraphic = r = y.renderer.symbol(p, c - l, d - l, 2 * l, 2 * l).add(e.markerGroup), r.currentSymbol = p);
                            r && r.attr(e.pointAttribs(this, a))
                        }
                        r && (r[a && y.isInsidePlot(c, d, y.inverted) ? "show" : "hide"](), r.element.point = this)
                    }(k = k.halo) && k.size ? (A || (e.halo = A = y.renderer.path().add(y.seriesGroup)), A[b ? "animate" : "attr"]({
                        d: this.haloPath(k.size)
                    }), A.attr({
                        "class": "highcharts-halo highcharts-color-" + B(this.colorIndex, e.colorIndex)
                    }), A.attr(m({
                        fill: this.color || e.color,
                        "fill-opacity": k.opacity,
                        zIndex: -1
                    }, k.attributes))[b ? "animate" : "attr"]({
                        d: this.haloPath(k.size)
                    })) : A && A.attr({
                        d: []
                    });
                    this.state = a
                }
            },
            haloPath: function(a) {
                var b = this.series,
                    c = b.chart,
                    d = b.getPlotBox(),
                    e = c.inverted,
                    g = Math.floor(this.plotX);
                return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : g) - a, d.translateY + (e ? b.xAxis.len - g : this.plotY) - a, 2 * a, 2 * a)
            }
        });
        m(c.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && r(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && r(this, "mouseOut");
                !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this,
                    c = b.options,
                    e = b.graph,
                    g = c.states,
                    k = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (d([b.group, b.markerGroup], function(c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !g[a] || !1 !== g[a].enabled) && (a && (k = g[a].lineWidth || k + (g[a].lineWidthPlus || 0)), e && !e.dashstyle)) for (g = {
                    "stroke-width": k
                }, e.attr(g); b["zone-graph-" + c];) b["zone-graph-" + c].attr(g), c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    e = c.chart,
                    g = c.legendItem,
                    k, l = e.options.chart.ignoreHiddenSeries,
                    m = c.visible;
                k = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !m : a) ? "show" : "hide";
                d(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(a) {
                    if (c[a]) c[a][k]()
                });
                if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c) c.onMouseOut();
                g && e.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && d(e.series, function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                d(c.linkedSeries, function(b) {
                    b.setVisible(a, !1)
                });
                l && (e.isDirtyBox = !0);
                !1 !== b && e.redraw();
                r(c, k)
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                r(this, a ? "select" : "unselect")
            },
            drawTracker: a.drawTrackerGraph
        })
    })(K);
    (function(a) {
        var A = a.Chart,
            y = a.each,
            E = a.inArray,
            G = a.isObject,
            t = a.pick,
            g = a.splat;
        A.prototype.setResponsive = function(a) {
            var g = this.options.responsive;
            g && g.rules && y(g.rules, function(g) {
                this.matchResponsiveRule(g, a)
            }, this)
        };
        A.prototype.matchResponsiveRule = function(d, g) {
            var r = this.respRules,
                n = d.condition,
                p;
            p = d.callback ||
                function() {
                    return this.chartWidth <= t(n.maxWidth, Number.MAX_VALUE) && this.chartHeight <= t(n.maxHeight, Number.MAX_VALUE) && this.chartWidth >= t(n.minWidth, 0) && this.chartHeight >= t(n.minHeight, 0)
                };
            void 0 === d._id && (d._id = a.idCounter++);
            p = p.call(this);
            !r[d._id] && p ? d.chartOptions && (r[d._id] = this.currentOptions(d.chartOptions), this.update(d.chartOptions, g)) : r[d._id] && !p && (this.update(r[d._id], g), delete r[d._id])
        };
        A.prototype.currentOptions = function(a) {
            function m(a, d, b) {
                var k, r;
                for (k in a) if (-1 < E(k, ["series", "xAxis", "yAxis"])) for (a[k] = g(a[k]), b[k] = [], r = 0; r < a[k].length; r++) b[k][r] = {}, m(a[k][r], d[k][r], b[k][r]);
                else G(a[k]) ? (b[k] = {}, m(a[k], d[k] || {}, b[k])) : b[k] = d[k] || null
            }
            var r = {};
            m(a, this.options, r);
            return r
        }
    })(K);
    return K
});