(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a, b2) => (typeof require !== "undefined" ? require : a)[b2]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@rybbit/js/dist/index.mjs
  var Ee = Object.defineProperty;
  var Te = Object.defineProperties;
  var Ce = Object.getOwnPropertyDescriptors;
  var wt = Object.getOwnPropertySymbols;
  var we = Object.prototype.hasOwnProperty;
  var Se = Object.prototype.propertyIsEnumerable;
  var rt = (t, e, r) => e in t ? Ee(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r;
  var p = (t, e) => {
    for (var r in e || (e = {})) we.call(e, r) && rt(t, r, e[r]);
    if (wt) for (var r of wt(e)) Se.call(e, r) && rt(t, r, e[r]);
    return t;
  };
  var St = (t, e) => Te(t, Ce(e));
  var C = (t, e, r) => rt(t, typeof e != "symbol" ? e + "" : e, r);
  function Rt(t, e) {
    let r = null;
    return function(...n) {
      let i = this;
      r !== null && clearTimeout(r), r = setTimeout(() => {
        r = null, t.apply(i, n);
      }, e);
    };
  }
  function Pt(t) {
    try {
      let e = window.location.hostname, r = new URL(t, window.location.href).hostname;
      return !!r && r !== e;
    } catch (e) {
      return false;
    }
  }
  function Re(t) {
    try {
      let e = "re:";
      if (t.startsWith(e)) {
        let l = t.slice(e.length);
        if (!l) throw new Error("Empty regex pattern");
        return new RegExp(l);
      }
      let r = "__DOUBLE_ASTERISK_TOKEN__", n = "__SINGLE_ASTERISK_TOKEN__", a = t.replace(/\*\*/g, r).replace(/\*/g, n).replace(/[.+?^${}()|[\]\\]/g, "\\$&");
      a = a.replace(/\//g, "\\/"), a = a.replace(new RegExp("\\\\/" + r + "\\\\/", "g"), "(?:\\/.*)?\\/");
      let c = a.replace(new RegExp(r, "g"), ".*").replace(new RegExp(n, "g"), "[^/]+");
      return new RegExp("^" + c + "$");
    } catch (e) {
      return o(`Invalid pattern: ${t}`, e), null;
    }
  }
  function nt(t, e = []) {
    if (!e || e.length === 0) return null;
    for (let r of e) {
      let n = Re(r);
      if (n && n.test(t)) return r;
    }
    return null;
  }
  function s(...t) {
    d.debug && console.log("[Rybbit]", ...t);
  }
  function o(...t) {
    d.debug && console.error("[Rybbit Error]", ...t);
  }
  function P() {
    let t = new URL(window.location.href), e = t.pathname;
    return t.hash && (e += t.hash), e;
  }
  var M = { debounceDuration: 500, skipPatterns: [], maskPatterns: [], debug: false };
  var b = { autoTrackPageview: true, autoTrackSpa: true, trackQuerystring: true, trackOutbound: true, enableWebVitals: false, trackErrors: false, enableSessionReplay: false, trackButtonClicks: false, trackCopy: false, trackFormInteractions: false };
  var z = null;
  var d = new Proxy({}, { get: (t, e) => {
    var r, n;
    return z ? z[e] : (e !== "debug" && o("Rybbit SDK accessed before initialization. Call rybbit.init() first."), (n = (r = M[e]) != null ? r : b[e]) != null ? n : void 0);
  }, set: () => (o("Rybbit config is read-only after initialization."), false) });
  async function Pe(t, e) {
    var r, n, i, a, c, l, u, f, T, S;
    try {
      s("Fetching remote configuration...");
      let h = new AbortController(), A = setTimeout(() => h.abort(), 3e3), et = await fetch(`${t}/site/tracking-config/${e}`, { signal: h.signal });
      if (clearTimeout(A), et.ok) {
        let y = await et.json();
        return s("Remote configuration fetched successfully", y), { autoTrackPageview: (r = y.trackInitialPageView) != null ? r : b.autoTrackPageview, autoTrackSpa: (n = y.trackSpaNavigation) != null ? n : b.autoTrackSpa, trackQuerystring: (i = y.trackUrlParams) != null ? i : b.trackQuerystring, trackOutbound: (a = y.trackOutbound) != null ? a : b.trackOutbound, enableWebVitals: (c = y.webVitals) != null ? c : b.enableWebVitals, trackErrors: (l = y.trackErrors) != null ? l : b.trackErrors, enableSessionReplay: (u = y.sessionReplay) != null ? u : b.enableSessionReplay, trackButtonClicks: (f = y.trackButtonClicks) != null ? f : b.trackButtonClicks, trackCopy: (T = y.trackCopy) != null ? T : b.trackCopy, trackFormInteractions: (S = y.trackFormInteractions) != null ? S : b.trackFormInteractions };
      } else return o(`Failed to fetch remote config: ${et.status}`), null;
    } catch (h) {
      return h.name === "AbortError" ? o("Remote config fetch timed out") : o("Error fetching remote config:", h), null;
    }
  }
  async function It(t) {
    var u, f;
    if (z) return o("Rybbit SDK already initialized."), false;
    if (typeof t != "object" || t === null) return o("Invalid configuration provided to rybbit.init(). Expected an object."), false;
    let e = t.analyticsHost;
    if (!e || e.trim() === "") return o("`analyticsHost` is required in Rybbit config and must be a non-empty string."), false;
    let r = e.replace(/\/$/, ""), n = t.siteId;
    if (!n || n.trim() === "") return o("`siteId` is required in Rybbit config and must be a non-empty string."), false;
    let a = await Pe(r, n) || b, c = Array.isArray(t.skipPatterns) ? t.skipPatterns : M.skipPatterns, l = Array.isArray(t.maskPatterns) ? t.maskPatterns : M.maskPatterns;
    return z = { analyticsHost: r, siteId: n, debounceDuration: Math.max(0, (u = t.debounceDuration) != null ? u : M.debounceDuration), skipPatterns: c, maskPatterns: l, debug: (f = t.debug) != null ? f : M.debug, replayPrivacyConfig: t.replayPrivacyConfig, autoTrackPageview: a.autoTrackPageview, autoTrackSpa: a.autoTrackSpa, trackQuerystring: a.trackQuerystring, trackOutbound: a.trackOutbound, enableWebVitals: a.enableWebVitals, trackErrors: a.trackErrors, enableSessionReplay: a.enableSessionReplay, trackButtonClicks: a.trackButtonClicks, trackCopy: a.trackCopy, trackFormInteractions: a.trackFormInteractions }, true;
  }
  var k = null;
  var it = false;
  try {
    let t = localStorage.getItem("rybbit-user-id");
    t && (k = t), localStorage.getItem("disable-rybbit") !== null && (it = true);
  } catch (t) {
    o("localStorage unavailable");
  }
  typeof window != "undefined" && window.__RYBBIT_OPTOUT__ && (it = true);
  function g(t, e = {}) {
    if (it) {
      s("Opted out of tracking.");
      return;
    }
    if (!d || !d.analyticsHost || !d.siteId) {
      o("Rybbit config not available. Ensure rybbit.init() was called successfully.");
      return;
    }
    let { eventName: r, properties: n, pathOverride: i, webVitals: a } = e;
    if ((t === "custom_event" || t === "performance") && !r) {
      o("Event name is required and must be a string for performance or custom events.");
      return;
    }
    try {
      let c = new URL(window.location.href), l, u = "";
      if (t === "pageview" && typeof i == "string" && i.trim()) {
        s(`Using path override: ${i}`);
        try {
          if (!/^\//.test(i.trim()) && !/^https?:\/\//.test(i.trim())) throw new Error("pathOverride must start with /");
          let A = new URL(i.trim(), "http://dummybase");
          l = A.pathname, u = A.search || "", s(`Parsed override path: ${l}, search: ${u}`);
        } catch (A) {
          o(`Invalid pathOverride format: ${i}. Using window location.`), l = P(), u = d.trackQuerystring ? c.search : "";
        }
      } else l = P(), u = d.trackQuerystring ? c.search : "";
      if (t !== "performance" && nt(l, d.skipPatterns)) {
        s(`Skipping track for path: ${l}`);
        return;
      }
      let f = nt(l, d.maskPatterns);
      f && t !== "performance" && (s(`Masking path ${l} as ${f}`), l = f, u = "");
      let T = p(p(p(p({ site_id: d.siteId, hostname: c.hostname, pathname: l, querystring: u, screenWidth: window.screen.width, screenHeight: window.screen.height, language: navigator.language, page_title: document.title, referrer: document.referrer, type: t }, (t === "custom_event" || t === "performance" || t === "error") && { event_name: r }), (t === "custom_event" || t === "outbound" || t === "error" || t === "button_click" || t === "copy" || t === "form_submit" || t === "input_change") && Object.keys(n != null ? n : {}).length > 0 && { properties: JSON.stringify(n) }), t === "performance" && a && p({}, a)), k && { user_id: k });
      s("Sending track event:", T);
      let S = JSON.stringify(T), h = `${d.analyticsHost}/track`;
      Ie(h, S);
    } catch (c) {
      o("Error during tracking:", c);
    }
  }
  function Ie(t, e) {
    fetch(t, { method: "POST", headers: { "Content-Type": "application/json" }, body: e, mode: "cors", credentials: "same-origin", keepalive: true }).catch((r) => {
      o("Fetch request failed:", r);
    });
  }
  async function Lt(t, e, r = true) {
    if (!d || !d.analyticsHost || !d.siteId) {
      o("Rybbit config not available. Ensure rybbit.init() was called successfully.");
      return;
    }
    try {
      await fetch(`${d.analyticsHost}/identify`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ site_id: d.siteId, user_id: t, traits: e, is_new_identify: r }), mode: "cors", keepalive: true }), s("Identify event sent:", { userId: t, traits: e, isNewIdentify: r });
    } catch (n) {
      o("Failed to send identify event:", n);
    }
  }
  function xt(t, e) {
    if (t.trim() === "") {
      o("User ID must be a non-empty string");
      return;
    }
    k = t.trim();
    try {
      localStorage.setItem("rybbit-user-id", k), s("User identified:", k);
    } catch (r) {
      o("Could not persist user ID to localStorage");
    }
    Lt(k, e, true);
  }
  function Dt(t) {
    if (!t || typeof t != "object") {
      o("Traits must be an object");
      return;
    }
    let e = k;
    if (!e) {
      o("Cannot set traits without identifying user first. Call identify() first.");
      return;
    }
    Lt(e, t, false);
  }
  function At() {
    k = null;
    try {
      localStorage.removeItem("rybbit-user-id"), s("User ID cleared");
    } catch (t) {
      o("Could not remove user ID from localStorage");
    }
  }
  function at() {
    return k;
  }
  var R;
  var K = false;
  var O = [];
  var ot = "";
  function Mt() {
    if (K) {
      s("Automatic tracking already set up.");
      return;
    }
    if (!d.autoTrackPageview) {
      s("Automatic pageview tracking is disabled.");
      return;
    }
    s("Setting up automatic tracking..."), ot = P();
    let t = () => {
      let e = P();
      Le(e), g("pageview");
    };
    if (R = d.debounceDuration && d.debounceDuration > 0 ? Rt(() => {
      t();
    }, d.debounceDuration) : () => {
      t();
    }, requestAnimationFrame(() => {
      t();
    }), d.autoTrackSpa) {
      s("Setting up SPA route change tracking.");
      let e = history.pushState, r = history.replaceState;
      history.pushState = function(...n) {
        e.apply(this, n), R();
      }, history.replaceState = function(...n) {
        r.apply(this, n), R();
      }, window.addEventListener("popstate", R);
    } else s("SPA route change tracking is disabled.");
    window.addEventListener("hashchange", R), K = true;
  }
  function Ot() {
    s("Setting up data attribute and outbound link tracking."), document.addEventListener("click", _t, true);
  }
  function _t(t) {
    if (!(t.target instanceof Element)) return;
    let e = t.target;
    for (; e; ) {
      if (e.hasAttribute("data-rybbit-event")) {
        let r = e.getAttribute("data-rybbit-event");
        if (r) {
          let n = {};
          for (let i of e.attributes) if (i.name.startsWith("data-rybbit-prop-")) {
            let a = i.name.replace("data-rybbit-prop-", "");
            n[a] = i.value;
          }
          s("Data attribute event triggered:", r, n), g("custom_event", { eventName: r, properties: n });
        }
        break;
      }
      e = e.parentElement;
    }
    if (d.trackOutbound && t.target instanceof Element) {
      let r = t.target.closest("a");
      if (r && r.href && Pt(r.href)) {
        s("Outbound link clicked:", r.href);
        let n = { url: r.href, text: r.innerText || r.textContent || "", target: r.target || "_self" };
        g("outbound", { properties: n });
      }
    }
  }
  function Nt(t) {
    return O.push(t), s("Page change callback added"), () => {
      O = O.filter((e) => e !== t), s("Page change callback removed");
    };
  }
  function Le(t) {
    let e = ot;
    ot = t, e !== t && (s(`Page changed from ${e} to ${t}`), O.forEach((r) => {
      try {
        r(t, e);
      } catch (n) {
        o("Error in page change callback:", n);
      }
    }));
  }
  function Ft() {
    K && (s("Cleaning up automatic tracking listeners."), window.removeEventListener("popstate", R), window.removeEventListener("hashchange", R), document.removeEventListener("click", _t, true), O = [], K = false);
  }
  var qt = -1;
  var L = (t) => {
    addEventListener("pageshow", (e) => {
      e.persisted && (qt = e.timeStamp, t(e));
    }, true);
  };
  var v = (t, e, r, n) => {
    let i, a;
    return (c) => {
      e.value >= 0 && (c || n) && (a = e.value - (i != null ? i : 0), (a || i === void 0) && (i = e.value, e.delta = a, e.rating = ((l, u) => l > u[1] ? "poor" : l > u[0] ? "needs-improvement" : "good")(e.value, r), t(e)));
    };
  };
  var gt = (t) => {
    requestAnimationFrame(() => requestAnimationFrame(() => t()));
  };
  var mt = () => {
    let t = performance.getEntriesByType("navigation")[0];
    if (t && t.responseStart > 0 && t.responseStart < performance.now()) return t;
  };
  var _ = () => {
    var e;
    let t = mt();
    return (e = t == null ? void 0 : t.activationStart) != null ? e : 0;
  };
  var E = (t, e = -1) => {
    let r = mt(), n = "navigate";
    return qt >= 0 ? n = "back-forward-cache" : r && (document.prerendering || _() > 0 ? n = "prerender" : document.wasDiscarded ? n = "restore" : r.type && (n = r.type.replace(/_/g, "-"))), { name: t, value: e, rating: "good", delta: 0, entries: [], id: `v5-${Date.now()}-${Math.floor(8999999999999 * Math.random()) + 1e12}`, navigationType: n };
  };
  var st = /* @__PURE__ */ new WeakMap();
  function bt(t, e) {
    return st.get(t) || st.set(t, new e()), st.get(t);
  }
  var ct = class {
    constructor() {
      C(this, "t");
      C(this, "i", 0);
      C(this, "o", []);
    }
    h(e) {
      var i;
      if (e.hadRecentInput) return;
      let r = this.o[0], n = this.o.at(-1);
      this.i && r && n && e.startTime - n.startTime < 1e3 && e.startTime - r.startTime < 5e3 ? (this.i += e.value, this.o.push(e)) : (this.i = e.value, this.o = [e]), (i = this.t) == null || i.call(this, e);
    }
  };
  var N = (t, e, r = {}) => {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(t)) {
        let n = new PerformanceObserver((i) => {
          Promise.resolve().then(() => {
            e(i.getEntries());
          });
        });
        return n.observe(p({ type: t, buffered: true }, r)), n;
      }
    } catch (n) {
    }
  };
  var ht = (t) => {
    let e = false;
    return () => {
      e || (t(), e = true);
    };
  };
  var I = -1;
  var Ut = () => document.visibilityState !== "hidden" || document.prerendering ? 1 / 0 : 0;
  var q = (t) => {
    document.visibilityState === "hidden" && I > -1 && (I = t.type === "visibilitychange" ? t.timeStamp : 0, xe());
  };
  var Ht = () => {
    addEventListener("visibilitychange", q, true), addEventListener("prerenderingchange", q, true);
  };
  var xe = () => {
    removeEventListener("visibilitychange", q, true), removeEventListener("prerenderingchange", q, true);
  };
  var Qt = () => {
    var t;
    if (I < 0) {
      let e = _(), r = document.prerendering || (t = globalThis.performance.getEntriesByType("visibility-state").filter((n) => n.name === "hidden" && n.startTime > e)[0]) == null ? void 0 : t.startTime;
      I = r != null ? r : Ut(), Ht(), L(() => {
        setTimeout(() => {
          I = Ut(), Ht();
        });
      });
    }
    return { get firstHiddenTime() {
      return I;
    } };
  };
  var Q = (t) => {
    document.prerendering ? addEventListener("prerenderingchange", () => t(), true) : t();
  };
  var Bt = [1800, 3e3];
  var yt = (t, e = {}) => {
    Q(() => {
      let r = Qt(), n, i = E("FCP"), a = N("paint", (c) => {
        for (let l of c) l.name === "first-contentful-paint" && (a.disconnect(), l.startTime < r.firstHiddenTime && (i.value = Math.max(l.startTime - _(), 0), i.entries.push(l), n(true)));
      });
      a && (n = v(t, i, Bt, e.reportAllChanges), L((c) => {
        i = E("FCP"), n = v(t, i, Bt, e.reportAllChanges), gt(() => {
          i.value = performance.now() - c.timeStamp, n(true);
        });
      }));
    });
  };
  var Wt = [0.1, 0.25];
  var Jt = (t, e = {}) => {
    yt(ht(() => {
      let r, n = E("CLS", 0), i = bt(e, ct), a = (l) => {
        for (let u of l) i.h(u);
        i.i > n.value && (n.value = i.i, n.entries = i.o, r());
      }, c = N("layout-shift", a);
      c && (r = v(t, n, Wt, e.reportAllChanges), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "hidden" && (a(c.takeRecords()), r(true));
      }), L(() => {
        i.i = 0, n = E("CLS", 0), r = v(t, n, Wt, e.reportAllChanges), gt(() => r());
      }), setTimeout(r));
    }));
  };
  var Xt = 0;
  var lt = 1 / 0;
  var j = 0;
  var De = (t) => {
    for (let e of t) e.interactionId && (lt = Math.min(lt, e.interactionId), j = Math.max(j, e.interactionId), Xt = j ? (j - lt) / 7 + 1 : 0);
  };
  var ut;
  var $t = () => {
    var t;
    return ut ? Xt : (t = performance.interactionCount) != null ? t : 0;
  };
  var Ae = () => {
    "interactionCount" in performance || ut || (ut = N("event", De, { type: "event", buffered: true, durationThreshold: 0 }));
  };
  var Vt = 0;
  var dt = class {
    constructor() {
      C(this, "u", []);
      C(this, "l", /* @__PURE__ */ new Map());
      C(this, "m");
      C(this, "v");
    }
    p() {
      Vt = $t(), this.u.length = 0, this.l.clear();
    }
    P() {
      let e = Math.min(this.u.length - 1, Math.floor(($t() - Vt) / 50));
      return this.u[e];
    }
    h(e) {
      var i, a;
      if ((i = this.m) == null || i.call(this, e), !e.interactionId && e.entryType !== "first-input") return;
      let r = this.u.at(-1), n = this.l.get(e.interactionId);
      if (n || this.u.length < 10 || e.duration > r.T) {
        if (n ? e.duration > n.T ? (n.entries = [e], n.T = e.duration) : e.duration === n.T && e.startTime === n.entries[0].startTime && n.entries.push(e) : (n = { id: e.interactionId, entries: [e], T: e.duration }, this.l.set(n.id, n), this.u.push(n)), this.u.sort((c, l) => l.T - c.T), this.u.length > 10) {
          let c = this.u.splice(10);
          for (let l of c) this.l.delete(l.id);
        }
        (a = this.v) == null || a.call(this, n);
      }
    }
  };
  var Gt = (t) => {
    let e = globalThis.requestIdleCallback || setTimeout;
    document.visibilityState === "hidden" ? t() : (t = ht(t), document.addEventListener("visibilitychange", t, { once: true }), e(() => {
      t(), document.removeEventListener("visibilitychange", t);
    }));
  };
  var zt = [200, 500];
  var Yt = (t, e = {}) => {
    globalThis.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype && Q(() => {
      var l;
      Ae();
      let r, n = E("INP"), i = bt(e, dt), a = (u) => {
        Gt(() => {
          for (let T of u) i.h(T);
          let f = i.P();
          f && f.T !== n.value && (n.value = f.T, n.entries = f.entries, r());
        });
      }, c = N("event", a, { durationThreshold: (l = e.durationThreshold) != null ? l : 40 });
      r = v(t, n, zt, e.reportAllChanges), c && (c.observe({ type: "first-input", buffered: true }), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "hidden" && (a(c.takeRecords()), r(true));
      }), L(() => {
        i.p(), n = E("INP"), r = v(t, n, zt, e.reportAllChanges);
      }));
    });
  };
  var ft = class {
    constructor() {
      C(this, "m");
    }
    h(e) {
      var r;
      (r = this.m) == null || r.call(this, e);
    }
  };
  var Kt = [2500, 4e3];
  var Zt = (t, e = {}) => {
    Q(() => {
      let r = Qt(), n, i = E("LCP"), a = bt(e, ft), c = (u) => {
        e.reportAllChanges || (u = u.slice(-1));
        for (let f of u) a.h(f), f.startTime < r.firstHiddenTime && (i.value = Math.max(f.startTime - _(), 0), i.entries = [f], n());
      }, l = N("largest-contentful-paint", c);
      if (l) {
        n = v(t, i, Kt, e.reportAllChanges);
        let u = ht(() => {
          c(l.takeRecords()), l.disconnect(), n(true);
        });
        for (let f of ["keydown", "click", "visibilitychange"]) addEventListener(f, () => Gt(u), { capture: true, once: true });
        L((f) => {
          i = E("LCP"), n = v(t, i, Kt, e.reportAllChanges), gt(() => {
            i.value = performance.now() - f.timeStamp, n(true);
          });
        });
      }
    });
  };
  var jt = [800, 1800];
  var pt = (t) => {
    document.prerendering ? Q(() => pt(t)) : document.readyState !== "complete" ? addEventListener("load", () => pt(t), true) : setTimeout(t);
  };
  var te = (t, e = {}) => {
    let r = E("TTFB"), n = v(t, r, jt, e.reportAllChanges);
    pt(() => {
      let i = mt();
      i && (r.value = Math.max(i.responseStart - _(), 0), r.entries = [i], n(true), L(() => {
        r = E("TTFB", 0), n = v(t, r, jt, e.reportAllChanges), n(true);
      }));
    });
  };
  var X = { lcp: null, cls: null, inp: null, fcp: null, ttfb: null };
  var x = false;
  var J = null;
  function Me() {
    if (x) return;
    Object.values(X).every((e) => e !== null) && kt();
  }
  function kt() {
    x || (x = true, J && (clearTimeout(J), J = null), s("Sending web vitals data:", X), g("performance", { eventName: "web-vitals", webVitals: X }));
  }
  function F(t) {
    if (x) return;
    let e = t.name.toLowerCase();
    X[e] = t.value, s(`Collected ${e}:`, t.value), Me();
  }
  function ee() {
    if (!d.enableWebVitals) {
      s("Web vitals tracking is disabled.");
      return;
    }
    s("Initializing web vitals tracking...");
    try {
      Zt(F), Jt(F), Yt(F), yt(F), te(F), J = setTimeout(() => {
        x || (s("Web vitals timeout reached, sending collected metrics."), kt());
      }, 2e4), window.addEventListener("beforeunload", () => {
        x || kt();
      }), s("Web vitals tracking initialized successfully.");
    } catch (t) {
      o("Error setting up web vitals tracking:", t);
    }
  }
  var U = null;
  var H = null;
  function re() {
    d.trackErrors && (s("Setting up error tracking"), U = (t) => {
      Oe(t);
    }, H = (t) => {
      _e(t);
    }, window.addEventListener("error", U), window.addEventListener("unhandledrejection", H));
  }
  function ne() {
    U && (window.removeEventListener("error", U), U = null), H && (window.removeEventListener("unhandledrejection", H), H = null), s("Error tracking cleaned up");
  }
  function Oe(t) {
    var a, c;
    let e = window.location.origin, r = t.filename || "";
    if (r) try {
      if (new URL(r).origin !== e) {
        s("Skipping third-party error:", r);
        return;
      }
    } catch (l) {
    }
    let n = ((a = t.error) == null ? void 0 : a.stack) || "";
    if (!r && n && !n.includes(e)) {
      s("Skipping third-party error based on stack trace");
      return;
    }
    let i = { message: (t.message || "Unknown error").substring(0, 500), stack: n.substring(0, 2e3), filename: r || void 0, lineno: t.lineno || void 0, colno: t.colno || void 0, timestamp: Date.now() };
    G(((c = t.error) == null ? void 0 : c.name) || "Error", i);
  }
  function _e(t) {
    let e = "Unhandled promise rejection", r = "";
    t.reason instanceof Error ? (e = t.reason.message || e, r = t.reason.stack || "") : typeof t.reason == "string" ? e = t.reason : t.reason && typeof t.reason == "object" && (e = JSON.stringify(t.reason));
    let n = { message: e.substring(0, 500), stack: r.substring(0, 2e3), timestamp: Date.now() };
    G("UnhandledRejection", n);
  }
  function G(t, e, r) {
    let n = p({ error_name: t, message: e.message }, r);
    e.stack && (n.stack = e.stack), e.filename && (n.filename = e.filename), e.lineno && (n.line_number = e.lineno), e.colno && (n.column_number = e.colno), g("error", { eventName: t, properties: n });
  }
  function ie(t, e) {
    var r, n;
    if (!d.trackErrors) {
      o("Error tracking is not enabled. Enable it via remote config.");
      return;
    }
    if (t instanceof ErrorEvent) {
      let i = { message: (t.message || "Unknown error").substring(0, 500), stack: (((r = t.error) == null ? void 0 : r.stack) || "").substring(0, 2e3), filename: t.filename || void 0, lineno: t.lineno || void 0, colno: t.colno || void 0, timestamp: Date.now() };
      G(((n = t.error) == null ? void 0 : n.name) || "Error", i, e);
    } else {
      let i = { message: (t.message || "Unknown error").substring(0, 500), stack: (t.stack || "").substring(0, 2e3), timestamp: Date.now() };
      G(t.name || "Error", i, e);
    }
  }
  var B = null;
  function ae() {
    d.trackButtonClicks && (s("Setting up button click tracking"), B = (t) => {
      Ne(t);
    }, document.addEventListener("click", B, true));
  }
  function oe() {
    B && (document.removeEventListener("click", B, true), B = null);
  }
  function Ne(t) {
    let e = t.target;
    if (!e) return;
    let r = Ue(e);
    if (!r || r.hasAttribute("data-rybbit-event")) return;
    let n = p({}, He(r)), i = Fe(r);
    i && (n.text = i), g("button_click", { properties: n });
  }
  function Fe(t) {
    var i, a, c, l;
    let e = (i = t.textContent) == null ? void 0 : i.trim().substring(0, 100);
    if (e) return e;
    let r = (a = t.getAttribute("aria-label")) == null ? void 0 : a.trim().substring(0, 100);
    if (r) return r;
    if (t.tagName === "INPUT") {
      let u = (c = t.value) == null ? void 0 : c.trim().substring(0, 100);
      if (u) return u;
    }
    let n = (l = t.getAttribute("title")) == null ? void 0 : l.trim().substring(0, 100);
    if (n) return n;
  }
  function Ue(t) {
    var n;
    if (t.tagName === "BUTTON" || t.getAttribute("role") === "button") return t;
    if (t.tagName === "INPUT") {
      let i = (n = t.type) == null ? void 0 : n.toLowerCase();
      if (i === "submit" || i === "button") return t;
    }
    let e = t.parentElement, r = 0;
    for (; e && r < 3; ) {
      if (e.tagName === "BUTTON" || e.getAttribute("role") === "button") return e;
      e = e.parentElement, r++;
    }
    return null;
  }
  function He(t) {
    let e = {};
    for (let r of t.attributes) if (r.name.startsWith("data-rybbit-prop-")) {
      let n = r.name.replace("data-rybbit-prop-", "");
      e[n] = r.value;
    }
    return e;
  }
  var W = null;
  function se() {
    d.trackCopy && (s("Setting up copy tracking"), W = () => {
      Be();
    }, document.addEventListener("copy", W));
  }
  function le() {
    W && (document.removeEventListener("copy", W), W = null);
  }
  function Be() {
    let t = window.getSelection();
    if (!t || t.isCollapsed) return;
    let e = t.toString(), r = e.length;
    if (r === 0) return;
    let n = t.anchorNode, i = n instanceof HTMLElement ? n : n == null ? void 0 : n.parentElement;
    if (!i) return;
    let a = St(p({ text: e.substring(0, 500) }, r > 500 && { textLength: r }), { sourceElement: i.tagName.toLowerCase() });
    g("copy", { properties: a });
  }
  var $ = null;
  var V = null;
  function ce() {
    d.trackFormInteractions && (s("Setting up form tracking"), $ = (t) => {
      We(t);
    }, V = (t) => {
      $e(t);
    }, document.addEventListener("submit", $, true), document.addEventListener("change", V, true));
  }
  function ue() {
    $ && (document.removeEventListener("submit", $, true), $ = null), V && (document.removeEventListener("change", V, true), V = null);
  }
  function We(t) {
    let e = t.target;
    if (e.tagName !== "FORM") return;
    let r = e.getAttribute("aria-label"), n = p(p({ formId: e.id || "", formName: e.name || "", formAction: e.getAttribute("action") || "", method: (e.method || "get").toUpperCase(), fieldCount: e.elements.length }, r ? { ariaLabel: r } : {}), de(e));
    g("form_submit", { properties: n });
  }
  function $e(t) {
    var c, l;
    let e = t.target, r = e.tagName.toUpperCase();
    if (!["INPUT", "SELECT", "TEXTAREA"].includes(r) || e.disabled) return;
    if (r === "INPUT") {
      let u = (c = e.type) == null ? void 0 : c.toLowerCase();
      if (u === "hidden" || u === "password") return;
    }
    let n = e.name || e.id || e.getAttribute("aria-label") || e.placeholder || "", i = p({ element: r.toLowerCase(), inputName: n }, de(e));
    r === "INPUT" && (i.inputType = (l = e.type) == null ? void 0 : l.toLowerCase());
    let a = e.form;
    a != null && a.id && (i.formId = a.id), a != null && a.name && (i.formName = a.name), g("input_change", { properties: i });
  }
  function de(t) {
    let e = {};
    for (let r of t.attributes) if (r.name.startsWith("data-rybbit-prop-")) {
      let n = r.name.replace("data-rybbit-prop-", "");
      e[n] = r.value;
    }
    return e;
  }
  var Z = null;
  var D = false;
  var vt = null;
  var w = [];
  var Y;
  var Et;
  var fe = 3;
  var pe = /* @__PURE__ */ new WeakMap();
  var tt = class extends Error {
    constructor(r) {
      super(`Failed to send replay batch: ${r}`);
      this.status = r;
    }
    get retryable() {
      return this.status >= 500 || this.status === 408 || this.status === 429;
    }
  };
  async function ge(t) {
    if (d.enableSessionReplay) {
      Et = t;
      try {
        Z = (await import("rrweb")).record, s("rrweb loaded successfully"), me();
      } catch (e) {
        o("Failed to load rrweb. Make sure it's installed as a peer dependency:", e);
      }
    }
  }
  function me() {
    var t, e, r, n, i, a, c, l;
    if (!(D || !Z || !d.enableSessionReplay)) try {
      let u = d.replayPrivacyConfig || {}, f = { mousemove: false, mouseInteraction: { MouseUp: false, MouseDown: false, Click: true, ContextMenu: false, DblClick: true, Focus: true, Blur: true, TouchStart: false, TouchEnd: false }, scroll: 500, input: "last", media: 800 }, T = { script: false, comment: true, headFavicon: true, headWhitespace: true, headMetaDescKeywords: true, headMetaSocial: true, headMetaRobots: true, headMetaHttpEquiv: true, headMetaAuthorship: true, headMetaVerification: true }, S = { emit: (h) => {
        Ve({ type: h.type, data: h.data, timestamp: h.timestamp || Date.now() });
      }, recordCanvas: false, checkoutEveryNms: 6e4, checkoutEveryNth: 500, blockClass: (t = u.blockClass) != null ? t : "rr-block", blockSelector: (e = u.blockSelector) != null ? e : void 0, ignoreClass: (r = u.ignoreClass) != null ? r : "rr-ignore", ignoreSelector: (n = u.ignoreSelector) != null ? n : void 0, maskTextClass: (i = u.maskTextClass) != null ? i : "rr-mask", maskAllInputs: (a = u.maskAllInputs) != null ? a : true, maskInputOptions: { password: true, email: true }, collectFonts: (c = u.collectFonts) != null ? c : true, sampling: f, slimDOMOptions: (l = u.slimDOMOptions) != null ? l : T };
      u.maskTextSelectors && u.maskTextSelectors.length > 0 && (S.maskTextSelector = u.maskTextSelectors.join(", ")), vt = Z(S), D = true, ze(), s("Session replay recording started");
    } catch (u) {
      o("Failed to start session replay recording:", u);
    }
  }
  function be() {
    if (!d.enableSessionReplay) {
      o("Session replay is not enabled. Enable it via remote config.");
      return;
    }
    if (!Z) {
      o("rrweb is not loaded. Ensure it's installed as a peer dependency.");
      return;
    }
    if (D) {
      s("Session replay is already recording");
      return;
    }
    me();
  }
  function Tt() {
    if (!D) {
      s("Session replay is not currently recording");
      return;
    }
    vt && vt(), D = false, ye(), w.length > 0 && Ct(), s("Session replay recording stopped");
  }
  function he() {
    return D;
  }
  function Ve(t) {
    w.push(t), w.length >= 250 && Ct();
  }
  function ze() {
    ye(), Y = window.setInterval(() => {
      w.length > 0 && Ct();
    }, 5e3);
  }
  function ye() {
    Y !== void 0 && (clearInterval(Y), Y = void 0);
  }
  function Ct() {
    if (w.length === 0) return;
    let t = [...w];
    w = [];
    let e = { userId: Et || "", events: t, metadata: { pageUrl: window.location.href, viewportWidth: screen.width, viewportHeight: screen.height, language: navigator.language } };
    Ke(e).catch((r) => {
      if (o("Failed to send session replay batch:", r), r instanceof tt && !r.retryable) return;
      let n = t.filter((i) => {
        var c;
        let a = ((c = pe.get(i)) != null ? c : 0) + 1;
        return pe.set(i, a), a < fe;
      });
      n.length < t.length && o(`Dropping ${t.length - n.length} session replay events after ${fe} failed attempts`), w.unshift(...n);
    });
  }
  async function Ke(t) {
    let e = `${d.analyticsHost}/session-replay/record/${d.siteId}`, r = JSON.stringify(t), n = await fetch(e, { method: "POST", headers: { "Content-Type": "application/json" }, body: r, mode: "cors", keepalive: false });
    if (!n.ok) throw new tt(n.status);
    s(`Session replay batch sent: ${t.events.length} events`);
  }
  function ke(t) {
    Et = t;
  }
  function ve() {
    Tt();
  }
  var m = false;
  var je = { init: async (t) => {
    if (m) {
      o("Rybbit SDK already initialized. Call init() only once.");
      return;
    }
    await It(t) && (m = true, s("Config:", p({}, d)), Mt(), Ot(), ee(), re(), ae(), se(), ce(), await ge(at() || void 0));
  }, pageview: (t) => {
    if (!m) {
      o("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    g("pageview", { pathOverride: t });
  }, event: (t, e) => {
    if (!m) {
      o("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    if (!t) {
      o("Event name is required and must be a string.");
      return;
    }
    g("custom_event", { eventName: t, properties: e });
  }, trackOutbound: (t, e = "", r = "_self") => {
    if (!m) {
      o("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    if (!t) {
      o("Outbound link URL is required and must be a string.");
      return;
    }
    g("outbound", { properties: { url: t, text: e, target: r } });
  }, identify: (t, e) => {
    if (!m) {
      o("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    xt(t, e), ke(t);
  }, setTraits: (t) => {
    if (!m) {
      o("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    Dt(t);
  }, clearUserId: () => {
    if (!m) {
      o("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    At();
  }, getUserId: () => m ? at() : (o("Rybbit SDK not initialized. Call rybbit.init() first."), null), error: (t, e) => {
    if (!m) {
      o("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    ie(t, e);
  }, onPageChange: (t) => m ? Nt(t) : (o("Rybbit SDK not initialized. Call rybbit.init() first."), () => {
  }), startSessionReplay: () => {
    if (!m) {
      o("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    be();
  }, stopSessionReplay: () => {
    if (!m) {
      o("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    Tt();
  }, isSessionReplayActive: () => m ? he() : (o("Rybbit SDK not initialized. Call rybbit.init() first."), false), cleanup: () => {
    Ft(), ne(), oe(), le(), ue(), ve(), m = false;
  } };
  var qr = je;

  // src/js/main.js
  var titles = ["Chief Git Blame Officer", "Senior Console Log Debugger", "Principal Merge Conflict Resolver", "Lead Rubber Duck Whisperer", "Chief Cache Invalidator", "Senior Stack Overflow Surfer", "Head of Production Hotfixes", "Director of Dark Mode", "Junior Regex Wrangler", "Senior NPM Install Destroyer", "Chief Technical Debt Collector", "Lead Infinite Loop Breaker", "Principal WiFi Reconnector", "Senior Copy Paste Engineer", "Head of Accidental Deployments", "Chief Semicolon Hunter", "Lead 404 Page Finder", "Senior Cloud Cost Explorer", "Director of Keyboard Shortcuts", "Chief Tabs vs Spaces Mediator"];
  for (let i = titles.length - 1; i > 0; i--) {
    const j2 = Math.floor(Math.random() * (i + 1));
    [titles[i], titles[j2]] = [titles[j2], titles[i]];
  }
  var currentTitleIndex = 0;
  var titleRotationInterval = null;
  var promptSession = null;
  var isLLMReady = false;
  var prompt = `You are a marketing consultant for a senior developer.
                    Your job is to generate a short, funny, creative job title.
                    It should sound like a real corporate job title but with a humorous twist.
                    Keep it under 5 words. Do not include explanations\u2014only output the title itself. Only include the title, no other text. Do not include punctuation.
                    Here are some examples: ${titles.join(", ")}`;
  function fadeOutOriginalTitle() {
    const originalTitle = document.querySelector(".original-title");
    if (originalTitle) {
      originalTitle.classList.add("fade-out");
    }
  }
  async function initializeLLMSession() {
    try {
      promptSession = await LanguageModel.create({
        monitor(m2) {
          m2.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded * 100}%`);
          });
        },
        initialPrompt: [
          {
            type: "system",
            content: prompt
          }
        ]
      });
      isLLMReady = true;
      console.log("LLM session initialized and ready");
    } catch (error) {
      isLLMReady = false;
    }
  }
  async function generateNewTitle() {
    if (!isLLMReady || !promptSession) {
      console.warn("LLM session not ready yet");
      return null;
    }
    try {
      const newTitle = await promptSession.prompt(`${prompt}. Generate a new title!`);
      console.log("Generated new title:", newTitle);
      return newTitle;
    } catch (error) {
      console.error("Error generating new title:", error);
      return null;
    }
  }
  async function showNextTitle(useGeneratedTitle = false) {
    const originalTitle = document.querySelector(".original-title");
    const aiIndicator = document.querySelector(".ai-indicator");
    if (!originalTitle) return;
    originalTitle.classList.remove("fade-in");
    originalTitle.classList.add("fade-out");
    setTimeout(async () => {
      let titleText;
      let isAIGenerated = false;
      if (useGeneratedTitle && isLLMReady) {
        const generatedTitle = await generateNewTitle();
        if (generatedTitle) {
          titleText = generatedTitle.trim();
          isAIGenerated = true;
        } else {
          titleText = titles[currentTitleIndex];
          currentTitleIndex = (currentTitleIndex + 1) % titles.length;
          isAIGenerated = false;
        }
      } else {
        titleText = titles[currentTitleIndex];
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        isAIGenerated = false;
      }
      originalTitle.innerHTML = `${titleText}`;
      console.log("showNextTitle", titleText);
      if (aiIndicator) {
        if (isAIGenerated) {
          aiIndicator.style.visibility = "visible";
          aiIndicator.classList.add("fade-in");
        } else {
          aiIndicator.style.visibility = "hidden";
        }
      }
      setTimeout(() => {
        originalTitle.classList.remove("fade-out");
        originalTitle.classList.add("fade-in");
      }, 50);
    }, 500);
  }
  function startTitleRotation() {
    fadeOutOriginalTitle();
    setTimeout(() => {
      showNextTitle(false);
      titleRotationInterval = setInterval(() => {
        showNextTitle(isLLMReady);
      }, 5e3);
    }, 500);
  }
  var confettiCount = 100;
  var confettiClassName = "confetti";
  var confettiText = ["\u{1F389}", "\u{1F973}", "\u{1F389}", "\u{1F38A}", "\u{1F389}"];
  var searchParams = new URLSearchParams(window.location.search);
  var currentDate = Date.now();
  var confettiEndDate = (/* @__PURE__ */ new Date("2025-10-01")).getTime();
  var hasConfetti = searchParams.has("\u{1F389}") || currentDate < confettiEndDate;
  if (!hasConfetti) {
    const seniorText = document.querySelector(".senior-text");
    seniorText.classList.remove("senior-text");
  }
  function finalConfettiParticles(posY, posX) {
    const centerAngle = Math.atan2(window.innerHeight / 2 - posY, window.innerWidth / 2 - posX);
    const spread = Math.PI / 2;
    const angle = centerAngle + (Math.random() - 0.5) * spread;
    const distance = 400 + Math.random() * 500;
    const randomX = Math.cos(angle) * distance;
    const randomY = Math.sin(angle) * distance;
    return { randomX, randomY };
  }
  function createConfettiParticles(posY, posX) {
    const idx = Math.round(0 + Math.random() * confettiText.length);
    const confetti = document.createElement("div");
    confetti.className = confettiClassName;
    confetti.style.fontSize = `${1.5 + Math.random()}rem`;
    confetti.textContent = confettiText[idx];
    confetti.style.animationDuration = 3 + Math.random() * 3 + "s";
    return confetti;
  }
  function createConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"];
    const leftX = -50;
    const leftY = -50;
    const rightX = window.innerWidth + 50;
    const rightY = -50;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = createConfettiParticles(leftY, leftX);
      confetti.style.left = leftX + "px";
      confetti.style.top = leftY + "px";
      const { randomX, randomY } = finalConfettiParticles(leftY, leftX);
      confetti.style.setProperty("--random-x", randomX + "px");
      confetti.style.setProperty("--random-y", randomY + "px");
      container.appendChild(confetti);
    }
    for (let i = 0; i < confettiCount; i++) {
      const confetti = createConfettiParticles(rightY, rightX);
      confetti.style.left = rightX + "px";
      confetti.style.top = rightY + "px";
      const { randomX, randomY } = finalConfettiParticles(rightY, rightX);
      confetti.style.setProperty("--random-x", randomX + "px");
      confetti.style.setProperty("--random-y", randomY + "px");
      container.appendChild(confetti);
    }
    setTimeout(() => {
      container.innerHTML = "";
    }, 1e4);
  }
  window.addEventListener("DOMContentLoaded", async () => {
    await initializeLLMSession();
    try {
      const availability = await LanguageModel.availability();
    } catch (error) {
      document.querySelector(".ai-indicator").remove();
    }
    window.setTimeout(() => {
      startTitleRotation();
    }, 1e3);
    if (!hasConfetti) {
      return true;
    }
    window.setTimeout(() => {
      const seniorText = document.querySelector(".senior-placeholder");
      seniorText.classList.add("animate-senior");
    }, 0);
    createConfetti();
  });
  async function initLib(params) {
    console.log("inited");
    await qr.init({
      analyticsHost: "https://app.rybbit.io/api",
      siteId: "36e05ec48e6f"
    });
    qr.pageview();
  }
  window.addEventListener("load", async () => {
    initLib();
  });
})();
/*! Bundled license information:

@rybbit/js/dist/index.mjs:
  (*!
   * @rybbit/js v0.6.3
   * Rybbit Web SDK
   * (c) 2026 Rybbit
   * Released under the AGPL-3.0-only license.
   *)
*/
