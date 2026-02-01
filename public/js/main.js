(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a2, b) => (typeof require !== "undefined" ? require : a2)[b]
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
  var vt = Object.defineProperty;
  var Et = Object.defineProperties;
  var Tt = Object.getOwnPropertyDescriptors;
  var Ce = Object.getOwnPropertySymbols;
  var Ct = Object.prototype.hasOwnProperty;
  var wt = Object.prototype.propertyIsEnumerable;
  var te = (e, t, r) => t in e ? vt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
  var g = (e, t) => {
    for (var r in t || (t = {})) Ct.call(t, r) && te(e, r, t[r]);
    if (Ce) for (var r of Ce(t)) wt.call(t, r) && te(e, r, t[r]);
    return e;
  };
  var we = (e, t) => Et(e, Tt(t));
  var w = (e, t, r) => te(e, typeof t != "symbol" ? t + "" : t, r);
  function Se(e, t) {
    let r = null;
    return function(...n) {
      let i = this;
      r !== null && clearTimeout(r), r = setTimeout(() => {
        r = null, e.apply(i, n);
      }, t);
    };
  }
  function Re(e) {
    try {
      let t = window.location.hostname, r = new URL(e, window.location.href).hostname;
      return !!r && r !== t;
    } catch (t) {
      return false;
    }
  }
  function St(e) {
    try {
      let t = "re:";
      if (e.startsWith(t)) {
        let c = e.slice(t.length);
        if (!c) throw new Error("Empty regex pattern");
        return new RegExp(c);
      }
      let r = "__DOUBLE_ASTERISK_TOKEN__", n = "__SINGLE_ASTERISK_TOKEN__", o = e.replace(/\*\*/g, r).replace(/\*/g, n).replace(/[.+?^${}()|[\]\\]/g, "\\$&");
      o = o.replace(/\//g, "\\/"), o = o.replace(new RegExp("\\\\/" + r + "\\\\/", "g"), "(?:\\/.*)?\\/");
      let d = o.replace(new RegExp(r, "g"), ".*").replace(new RegExp(n, "g"), "[^/]+");
      return new RegExp("^" + d + "$");
    } catch (t) {
      return a(`Invalid pattern: ${e}`, t), null;
    }
  }
  function re(e, t = []) {
    if (!t || t.length === 0) return null;
    for (let r of t) {
      let n = St(r);
      if (n && n.test(e)) return r;
    }
    return null;
  }
  function s(...e) {
    l.debug && console.log("[Rybbit]", ...e);
  }
  function a(...e) {
    l.debug && console.error("[Rybbit Error]", ...e);
  }
  function P() {
    let e = new URL(window.location.href), t = e.pathname;
    return e.hash && (t += e.hash), t;
  }
  var A = { debounceDuration: 500, skipPatterns: [], maskPatterns: [], debug: false };
  var h = { autoTrackPageview: true, autoTrackSpa: true, trackQuerystring: true, trackOutbound: true, enableWebVitals: false, trackErrors: false, enableSessionReplay: false, trackButtonClicks: false, trackCopy: false, trackFormInteractions: false };
  var z = null;
  var l = new Proxy({}, { get: (e, t) => {
    var r, n;
    return z ? z[t] : (t !== "debug" && a("Rybbit SDK accessed before initialization. Call rybbit.init() first."), (n = (r = A[t]) != null ? r : h[t]) != null ? n : void 0);
  }, set: () => (a("Rybbit config is read-only after initialization."), false) });
  async function Rt(e, t) {
    var r, n, i, o, d, c, u, f, T, C;
    try {
      s("Fetching remote configuration...");
      let b = new AbortController(), I = setTimeout(() => b.abort(), 3e3), ee = await fetch(`${e}/site/tracking-config/${t}`, { signal: b.signal });
      if (clearTimeout(I), ee.ok) {
        let y = await ee.json();
        return s("Remote configuration fetched successfully", y), { autoTrackPageview: (r = y.trackInitialPageView) != null ? r : h.autoTrackPageview, autoTrackSpa: (n = y.trackSpaNavigation) != null ? n : h.autoTrackSpa, trackQuerystring: (i = y.trackUrlParams) != null ? i : h.trackQuerystring, trackOutbound: (o = y.trackOutbound) != null ? o : h.trackOutbound, enableWebVitals: (d = y.webVitals) != null ? d : h.enableWebVitals, trackErrors: (c = y.trackErrors) != null ? c : h.trackErrors, enableSessionReplay: (u = y.sessionReplay) != null ? u : h.enableSessionReplay, trackButtonClicks: (f = y.trackButtonClicks) != null ? f : h.trackButtonClicks, trackCopy: (T = y.trackCopy) != null ? T : h.trackCopy, trackFormInteractions: (C = y.trackFormInteractions) != null ? C : h.trackFormInteractions };
      } else return a(`Failed to fetch remote config: ${ee.status}`), null;
    } catch (b) {
      return b.name === "AbortError" ? a("Remote config fetch timed out") : a("Error fetching remote config:", b), null;
    }
  }
  async function Pe(e) {
    var u, f;
    if (z) return a("Rybbit SDK already initialized."), false;
    if (typeof e != "object" || e === null) return a("Invalid configuration provided to rybbit.init(). Expected an object."), false;
    let t = e.analyticsHost;
    if (!t || t.trim() === "") return a("`analyticsHost` is required in Rybbit config and must be a non-empty string."), false;
    let r = t.replace(/\/$/, ""), n = e.siteId;
    if (!n || n.trim() === "") return a("`siteId` is required in Rybbit config and must be a non-empty string."), false;
    let o = await Rt(r, n) || h, d = Array.isArray(e.skipPatterns) ? e.skipPatterns : A.skipPatterns, c = Array.isArray(e.maskPatterns) ? e.maskPatterns : A.maskPatterns;
    return z = { analyticsHost: r, siteId: n, debounceDuration: Math.max(0, (u = e.debounceDuration) != null ? u : A.debounceDuration), skipPatterns: d, maskPatterns: c, debug: (f = e.debug) != null ? f : A.debug, replayPrivacyConfig: e.replayPrivacyConfig, autoTrackPageview: o.autoTrackPageview, autoTrackSpa: o.autoTrackSpa, trackQuerystring: o.trackQuerystring, trackOutbound: o.trackOutbound, enableWebVitals: o.enableWebVitals, trackErrors: o.trackErrors, enableSessionReplay: o.enableSessionReplay, trackButtonClicks: o.trackButtonClicks, trackCopy: o.trackCopy, trackFormInteractions: o.trackFormInteractions }, true;
  }
  var k = null;
  var ne = false;
  try {
    let e = localStorage.getItem("rybbit-user-id");
    e && (k = e), localStorage.getItem("disable-rybbit") !== null && (ne = true);
  } catch (e) {
    a("localStorage unavailable");
  }
  typeof window != "undefined" && window.__RYBBIT_OPTOUT__ && (ne = true);
  function p(e, t = {}) {
    if (ne) {
      s("Opted out of tracking.");
      return;
    }
    if (!l || !l.analyticsHost || !l.siteId) {
      a("Rybbit config not available. Ensure rybbit.init() was called successfully.");
      return;
    }
    let { eventName: r, properties: n, pathOverride: i, webVitals: o } = t;
    if ((e === "custom_event" || e === "performance") && !r) {
      a("Event name is required and must be a string for performance or custom events.");
      return;
    }
    try {
      let d = new URL(window.location.href), c, u = "";
      if (e === "pageview" && typeof i == "string" && i.trim()) {
        s(`Using path override: ${i}`);
        try {
          if (!/^\//.test(i.trim()) && !/^https?:\/\//.test(i.trim())) throw new Error("pathOverride must start with /");
          let I = new URL(i.trim(), "http://dummybase");
          c = I.pathname, u = I.search || "", s(`Parsed override path: ${c}, search: ${u}`);
        } catch (I) {
          a(`Invalid pathOverride format: ${i}. Using window location.`), c = P(), u = l.trackQuerystring ? d.search : "";
        }
      } else c = P(), u = l.trackQuerystring ? d.search : "";
      if (e !== "performance" && re(c, l.skipPatterns)) {
        s(`Skipping track for path: ${c}`);
        return;
      }
      let f = re(c, l.maskPatterns);
      f && e !== "performance" && (s(`Masking path ${c} as ${f}`), c = f, u = "");
      let T = g(g(g(g({ site_id: l.siteId, hostname: d.hostname, pathname: c, querystring: u, screenWidth: window.screen.width, screenHeight: window.screen.height, language: navigator.language, page_title: document.title, referrer: document.referrer, type: e }, (e === "custom_event" || e === "performance" || e === "error") && { event_name: r }), (e === "custom_event" || e === "outbound" || e === "error" || e === "button_click" || e === "copy" || e === "form_submit" || e === "input_change") && Object.keys(n != null ? n : {}).length > 0 && { properties: JSON.stringify(n) }), e === "performance" && o && g({}, o)), k && { user_id: k });
      s("Sending track event:", T);
      let C = JSON.stringify(T), b = `${l.analyticsHost}/track`;
      navigator.sendBeacon ? navigator.sendBeacon(b, new Blob([C], { type: "application/json" })) || (a("sendBeacon failed, falling back to fetch."), Ie(b, C)) : Ie(b, C);
    } catch (d) {
      a("Error during tracking:", d);
    }
  }
  function Ie(e, t) {
    fetch(e, { method: "POST", headers: { "Content-Type": "application/json" }, body: t, mode: "cors", keepalive: true }).catch((r) => {
      a("Fetch request failed:", r);
    });
  }
  async function Le(e, t, r = true) {
    if (!l || !l.analyticsHost || !l.siteId) {
      a("Rybbit config not available. Ensure rybbit.init() was called successfully.");
      return;
    }
    try {
      await fetch(`${l.analyticsHost}/identify`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ site_id: l.siteId, user_id: e, traits: t, is_new_identify: r }), mode: "cors", keepalive: true }), s("Identify event sent:", { userId: e, traits: t, isNewIdentify: r });
    } catch (n) {
      a("Failed to send identify event:", n);
    }
  }
  function xe(e, t) {
    if (e.trim() === "") {
      a("User ID must be a non-empty string");
      return;
    }
    k = e.trim();
    try {
      localStorage.setItem("rybbit-user-id", k), s("User identified:", k);
    } catch (r) {
      a("Could not persist user ID to localStorage");
    }
    Le(k, t, true);
  }
  function De(e) {
    if (!e || typeof e != "object") {
      a("Traits must be an object");
      return;
    }
    let t = k;
    if (!t) {
      a("Cannot set traits without identifying user first. Call identify() first.");
      return;
    }
    Le(t, e, false);
  }
  function Oe() {
    k = null;
    try {
      localStorage.removeItem("rybbit-user-id"), s("User ID cleared");
    } catch (e) {
      a("Could not remove user ID from localStorage");
    }
  }
  function ie() {
    return k;
  }
  var S;
  var j = false;
  var M = [];
  var oe = "";
  function Me() {
    if (j) {
      s("Automatic tracking already set up.");
      return;
    }
    if (!l.autoTrackPageview) {
      s("Automatic pageview tracking is disabled.");
      return;
    }
    if (s("Setting up automatic tracking..."), oe = P(), S = l.debounceDuration && l.debounceDuration > 0 ? Se(() => {
      let e = P();
      Ae(e), p("pageview");
    }, l.debounceDuration) : () => {
      let e = P();
      Ae(e), p("pageview");
    }, requestAnimationFrame(() => {
      S();
    }), l.autoTrackSpa) {
      s("Setting up SPA route change tracking.");
      let e = history.pushState, t = history.replaceState;
      history.pushState = function(...r) {
        e.apply(this, r), S();
      }, history.replaceState = function(...r) {
        t.apply(this, r), S();
      }, window.addEventListener("popstate", S);
    } else s("SPA route change tracking is disabled.");
    window.addEventListener("hashchange", S), j = true;
  }
  function _e() {
    s("Setting up data attribute and outbound link tracking."), document.addEventListener("click", Fe, true);
  }
  function Fe(e) {
    if (!(e.target instanceof Element)) return;
    let t = e.target;
    for (; t; ) {
      if (t.hasAttribute("data-rybbit-event")) {
        let r = t.getAttribute("data-rybbit-event");
        if (r) {
          let n = {};
          for (let i of t.attributes) if (i.name.startsWith("data-rybbit-prop-")) {
            let o = i.name.replace("data-rybbit-prop-", "");
            n[o] = i.value;
          }
          s("Data attribute event triggered:", r, n), p("custom_event", { eventName: r, properties: n });
        }
        break;
      }
      t = t.parentElement;
    }
    if (l.trackOutbound && e.target instanceof Element) {
      let r = e.target.closest("a");
      if (r && r.href && Re(r.href)) {
        s("Outbound link clicked:", r.href);
        let n = { url: r.href, text: r.innerText || r.textContent || "", target: r.target || "_self" };
        p("outbound", { properties: n });
      }
    }
  }
  function Ue(e) {
    return M.push(e), s("Page change callback added"), () => {
      M = M.filter((t) => t !== e), s("Page change callback removed");
    };
  }
  function Ae(e) {
    let t = oe;
    oe = e, t !== e && (s(`Page changed from ${t} to ${e}`), M.forEach((r) => {
      try {
        r(e, t);
      } catch (n) {
        a("Error in page change callback:", n);
      }
    }));
  }
  function Ne() {
    j && (s("Cleaning up automatic tracking listeners."), window.removeEventListener("popstate", S), window.removeEventListener("hashchange", S), document.removeEventListener("click", Fe, true), M = [], j = false);
  }
  var Qe = -1;
  var x = (e) => {
    addEventListener("pageshow", (t) => {
      t.persisted && (Qe = t.timeStamp, e(t));
    }, true);
  };
  var v = (e, t, r, n) => {
    let i, o;
    return (d) => {
      t.value >= 0 && (d || n) && (o = t.value - (i != null ? i : 0), (o || i === void 0) && (i = t.value, t.delta = o, t.rating = ((c, u) => c > u[1] ? "poor" : c > u[0] ? "needs-improvement" : "good")(t.value, r), e(t)));
    };
  };
  var pe = (e) => {
    requestAnimationFrame(() => requestAnimationFrame(() => e()));
  };
  var ge = () => {
    let e = performance.getEntriesByType("navigation")[0];
    if (e && e.responseStart > 0 && e.responseStart < performance.now()) return e;
  };
  var _ = () => {
    var t;
    let e = ge();
    return (t = e == null ? void 0 : e.activationStart) != null ? t : 0;
  };
  var E = (e, t = -1) => {
    let r = ge(), n = "navigate";
    return Qe >= 0 ? n = "back-forward-cache" : r && (document.prerendering || _() > 0 ? n = "prerender" : document.wasDiscarded ? n = "restore" : r.type && (n = r.type.replace(/_/g, "-"))), { name: e, value: t, rating: "good", delta: 0, entries: [], id: `v5-${Date.now()}-${Math.floor(8999999999999 * Math.random()) + 1e12}`, navigationType: n };
  };
  var ae = /* @__PURE__ */ new WeakMap();
  function me(e, t) {
    return ae.get(e) || ae.set(e, new t()), ae.get(e);
  }
  var ce = class {
    constructor() {
      w(this, "t");
      w(this, "i", 0);
      w(this, "o", []);
    }
    h(t) {
      var i;
      if (t.hadRecentInput) return;
      let r = this.o[0], n = this.o.at(-1);
      this.i && r && n && t.startTime - n.startTime < 1e3 && t.startTime - r.startTime < 5e3 ? (this.i += t.value, this.o.push(t)) : (this.i = t.value, this.o = [t]), (i = this.t) == null || i.call(this, t);
    }
  };
  var F = (e, t, r = {}) => {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e)) {
        let n = new PerformanceObserver((i) => {
          Promise.resolve().then(() => {
            t(i.getEntries());
          });
        });
        return n.observe(g({ type: e, buffered: true }, r)), n;
      }
    } catch (n) {
    }
  };
  var be = (e) => {
    let t = false;
    return () => {
      t || (e(), t = true);
    };
  };
  var L = -1;
  var Be = () => document.visibilityState !== "hidden" || document.prerendering ? 1 / 0 : 0;
  var q = (e) => {
    document.visibilityState === "hidden" && L > -1 && (L = e.type === "visibilitychange" ? e.timeStamp : 0, Pt());
  };
  var He = () => {
    addEventListener("visibilitychange", q, true), addEventListener("prerenderingchange", q, true);
  };
  var Pt = () => {
    removeEventListener("visibilitychange", q, true), removeEventListener("prerenderingchange", q, true);
  };
  var Je = () => {
    var e;
    if (L < 0) {
      let t = _(), r = document.prerendering || (e = globalThis.performance.getEntriesByType("visibility-state").filter((n) => n.name === "hidden" && n.startTime > t)[0]) == null ? void 0 : e.startTime;
      L = r != null ? r : Be(), He(), x(() => {
        setTimeout(() => {
          L = Be(), He();
        });
      });
    }
    return { get firstHiddenTime() {
      return L;
    } };
  };
  var Q = (e) => {
    document.prerendering ? addEventListener("prerenderingchange", () => e(), true) : e();
  };
  var We = [1800, 3e3];
  var he = (e, t = {}) => {
    Q(() => {
      let r = Je(), n, i = E("FCP"), o = F("paint", (d) => {
        for (let c of d) c.name === "first-contentful-paint" && (o.disconnect(), c.startTime < r.firstHiddenTime && (i.value = Math.max(c.startTime - _(), 0), i.entries.push(c), n(true)));
      });
      o && (n = v(e, i, We, t.reportAllChanges), x((d) => {
        i = E("FCP"), n = v(e, i, We, t.reportAllChanges), pe(() => {
          i.value = performance.now() - d.timeStamp, n(true);
        });
      }));
    });
  };
  var $e = [0.1, 0.25];
  var Ge = (e, t = {}) => {
    he(be(() => {
      let r, n = E("CLS", 0), i = me(t, ce), o = (c) => {
        for (let u of c) i.h(u);
        i.i > n.value && (n.value = i.i, n.entries = i.o, r());
      }, d = F("layout-shift", o);
      d && (r = v(e, n, $e, t.reportAllChanges), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "hidden" && (o(d.takeRecords()), r(true));
      }), x(() => {
        i.i = 0, n = E("CLS", 0), r = v(e, n, $e, t.reportAllChanges), pe(() => r());
      }), setTimeout(r));
    }));
  };
  var Xe = 0;
  var se = 1 / 0;
  var K = 0;
  var It = (e) => {
    for (let t of e) t.interactionId && (se = Math.min(se, t.interactionId), K = Math.max(K, t.interactionId), Xe = K ? (K - se) / 7 + 1 : 0);
  };
  var le;
  var Ve = () => {
    var e;
    return le ? Xe : (e = performance.interactionCount) != null ? e : 0;
  };
  var Lt = () => {
    "interactionCount" in performance || le || (le = F("event", It, { type: "event", buffered: true, durationThreshold: 0 }));
  };
  var ze = 0;
  var ue = class {
    constructor() {
      w(this, "u", []);
      w(this, "l", /* @__PURE__ */ new Map());
      w(this, "m");
      w(this, "v");
    }
    p() {
      ze = Ve(), this.u.length = 0, this.l.clear();
    }
    P() {
      let t = Math.min(this.u.length - 1, Math.floor((Ve() - ze) / 50));
      return this.u[t];
    }
    h(t) {
      var i, o;
      if ((i = this.m) == null || i.call(this, t), !t.interactionId && t.entryType !== "first-input") return;
      let r = this.u.at(-1), n = this.l.get(t.interactionId);
      if (n || this.u.length < 10 || t.duration > r.T) {
        if (n ? t.duration > n.T ? (n.entries = [t], n.T = t.duration) : t.duration === n.T && t.startTime === n.entries[0].startTime && n.entries.push(t) : (n = { id: t.interactionId, entries: [t], T: t.duration }, this.l.set(n.id, n), this.u.push(n)), this.u.sort((d, c) => c.T - d.T), this.u.length > 10) {
          let d = this.u.splice(10);
          for (let c of d) this.l.delete(c.id);
        }
        (o = this.v) == null || o.call(this, n);
      }
    }
  };
  var Ye = (e) => {
    let t = globalThis.requestIdleCallback || setTimeout;
    document.visibilityState === "hidden" ? e() : (e = be(e), document.addEventListener("visibilitychange", e, { once: true }), t(() => {
      e(), document.removeEventListener("visibilitychange", e);
    }));
  };
  var je = [200, 500];
  var Ze = (e, t = {}) => {
    globalThis.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype && Q(() => {
      var c;
      Lt();
      let r, n = E("INP"), i = me(t, ue), o = (u) => {
        Ye(() => {
          for (let T of u) i.h(T);
          let f = i.P();
          f && f.T !== n.value && (n.value = f.T, n.entries = f.entries, r());
        });
      }, d = F("event", o, { durationThreshold: (c = t.durationThreshold) != null ? c : 40 });
      r = v(e, n, je, t.reportAllChanges), d && (d.observe({ type: "first-input", buffered: true }), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "hidden" && (o(d.takeRecords()), r(true));
      }), x(() => {
        i.p(), n = E("INP"), r = v(e, n, je, t.reportAllChanges);
      }));
    });
  };
  var de = class {
    constructor() {
      w(this, "m");
    }
    h(t) {
      var r;
      (r = this.m) == null || r.call(this, t);
    }
  };
  var Ke = [2500, 4e3];
  var et = (e, t = {}) => {
    Q(() => {
      let r = Je(), n, i = E("LCP"), o = me(t, de), d = (u) => {
        t.reportAllChanges || (u = u.slice(-1));
        for (let f of u) o.h(f), f.startTime < r.firstHiddenTime && (i.value = Math.max(f.startTime - _(), 0), i.entries = [f], n());
      }, c = F("largest-contentful-paint", d);
      if (c) {
        n = v(e, i, Ke, t.reportAllChanges);
        let u = be(() => {
          d(c.takeRecords()), c.disconnect(), n(true);
        });
        for (let f of ["keydown", "click", "visibilitychange"]) addEventListener(f, () => Ye(u), { capture: true, once: true });
        x((f) => {
          i = E("LCP"), n = v(e, i, Ke, t.reportAllChanges), pe(() => {
            i.value = performance.now() - f.timeStamp, n(true);
          });
        });
      }
    });
  };
  var qe = [800, 1800];
  var fe = (e) => {
    document.prerendering ? Q(() => fe(e)) : document.readyState !== "complete" ? addEventListener("load", () => fe(e), true) : setTimeout(e);
  };
  var tt = (e, t = {}) => {
    let r = E("TTFB"), n = v(e, r, qe, t.reportAllChanges);
    fe(() => {
      let i = ge();
      i && (r.value = Math.max(i.responseStart - _(), 0), r.entries = [i], n(true), x(() => {
        r = E("TTFB", 0), n = v(e, r, qe, t.reportAllChanges), n(true);
      }));
    });
  };
  var G = { lcp: null, cls: null, inp: null, fcp: null, ttfb: null };
  var D = false;
  var J = null;
  function xt() {
    if (D) return;
    Object.values(G).every((t) => t !== null) && ye();
  }
  function ye() {
    D || (D = true, J && (clearTimeout(J), J = null), s("Sending web vitals data:", G), p("performance", { eventName: "web-vitals", webVitals: G }));
  }
  function U(e) {
    if (D) return;
    let t = e.name.toLowerCase();
    G[t] = e.value, s(`Collected ${t}:`, e.value), xt();
  }
  function rt() {
    if (!l.enableWebVitals) {
      s("Web vitals tracking is disabled.");
      return;
    }
    s("Initializing web vitals tracking...");
    try {
      et(U), Ge(U), Ze(U), he(U), tt(U), J = setTimeout(() => {
        D || (s("Web vitals timeout reached, sending collected metrics."), ye());
      }, 2e4), window.addEventListener("beforeunload", () => {
        D || ye();
      }), s("Web vitals tracking initialized successfully.");
    } catch (e) {
      a("Error setting up web vitals tracking:", e);
    }
  }
  var N = null;
  var B = null;
  function nt() {
    l.trackErrors && (s("Setting up error tracking"), N = (e) => {
      Dt(e);
    }, B = (e) => {
      Ot(e);
    }, window.addEventListener("error", N), window.addEventListener("unhandledrejection", B));
  }
  function it() {
    N && (window.removeEventListener("error", N), N = null), B && (window.removeEventListener("unhandledrejection", B), B = null), s("Error tracking cleaned up");
  }
  function Dt(e) {
    var o, d;
    let t = window.location.origin, r = e.filename || "";
    if (r) try {
      if (new URL(r).origin !== t) {
        s("Skipping third-party error:", r);
        return;
      }
    } catch (c) {
    }
    let n = ((o = e.error) == null ? void 0 : o.stack) || "";
    if (!r && n && !n.includes(t)) {
      s("Skipping third-party error based on stack trace");
      return;
    }
    let i = { message: (e.message || "Unknown error").substring(0, 500), stack: n.substring(0, 2e3), filename: r || void 0, lineno: e.lineno || void 0, colno: e.colno || void 0, timestamp: Date.now() };
    X(((d = e.error) == null ? void 0 : d.name) || "Error", i);
  }
  function Ot(e) {
    let t = "Unhandled promise rejection", r = "";
    e.reason instanceof Error ? (t = e.reason.message || t, r = e.reason.stack || "") : typeof e.reason == "string" ? t = e.reason : e.reason && typeof e.reason == "object" && (t = JSON.stringify(e.reason));
    let n = { message: t.substring(0, 500), stack: r.substring(0, 2e3), timestamp: Date.now() };
    X("UnhandledRejection", n);
  }
  function X(e, t, r) {
    let n = g({ error_name: e, message: t.message }, r);
    t.stack && (n.stack = t.stack), t.filename && (n.filename = t.filename), t.lineno && (n.line_number = t.lineno), t.colno && (n.column_number = t.colno), p("error", { eventName: e, properties: n });
  }
  function ot(e, t) {
    var r, n;
    if (!l.trackErrors) {
      a("Error tracking is not enabled. Enable it via remote config.");
      return;
    }
    if (e instanceof ErrorEvent) {
      let i = { message: (e.message || "Unknown error").substring(0, 500), stack: (((r = e.error) == null ? void 0 : r.stack) || "").substring(0, 2e3), filename: e.filename || void 0, lineno: e.lineno || void 0, colno: e.colno || void 0, timestamp: Date.now() };
      X(((n = e.error) == null ? void 0 : n.name) || "Error", i, t);
    } else {
      let i = { message: (e.message || "Unknown error").substring(0, 500), stack: (e.stack || "").substring(0, 2e3), timestamp: Date.now() };
      X(e.name || "Error", i, t);
    }
  }
  var H = null;
  function at() {
    l.trackButtonClicks && (s("Setting up button click tracking"), H = (e) => {
      At(e);
    }, document.addEventListener("click", H, true));
  }
  function st() {
    H && (document.removeEventListener("click", H, true), H = null);
  }
  function At(e) {
    var o;
    let t = e.target;
    if (!t) return;
    let r = Mt(t);
    if (!r || r.hasAttribute("data-rybbit-event")) return;
    let n = g({}, _t(r)), i = (o = r.textContent) == null ? void 0 : o.trim().substring(0, 100);
    i && (n.text = i), p("button_click", { properties: n });
  }
  function Mt(e) {
    var n;
    if (e.tagName === "BUTTON" || e.getAttribute("role") === "button") return e;
    if (e.tagName === "INPUT") {
      let i = (n = e.type) == null ? void 0 : n.toLowerCase();
      if (i === "submit" || i === "button") return e;
    }
    let t = e.parentElement, r = 0;
    for (; t && r < 3; ) {
      if (t.tagName === "BUTTON" || t.getAttribute("role") === "button") return t;
      t = t.parentElement, r++;
    }
    return null;
  }
  function _t(e) {
    let t = {};
    for (let r of e.attributes) if (r.name.startsWith("data-rybbit-prop-")) {
      let n = r.name.replace("data-rybbit-prop-", "");
      t[n] = r.value;
    }
    return t;
  }
  var W = null;
  function ct() {
    l.trackCopy && (s("Setting up copy tracking"), W = () => {
      Ft();
    }, document.addEventListener("copy", W));
  }
  function lt() {
    W && (document.removeEventListener("copy", W), W = null);
  }
  function Ft() {
    let e = window.getSelection();
    if (!e || e.isCollapsed) return;
    let t = e.toString(), r = t.length;
    if (r === 0) return;
    let n = e.anchorNode, i = n instanceof HTMLElement ? n : n == null ? void 0 : n.parentElement;
    if (!i) return;
    let o = we(g({ text: t.substring(0, 500) }, r > 500 && { textLength: r }), { sourceElement: i.tagName.toLowerCase() });
    p("copy", { properties: o });
  }
  var $ = null;
  var V = null;
  function ut() {
    l.trackFormInteractions && (s("Setting up form tracking"), $ = (e) => {
      Ut(e);
    }, V = (e) => {
      Nt(e);
    }, document.addEventListener("submit", $, true), document.addEventListener("change", V, true));
  }
  function dt() {
    $ && (document.removeEventListener("submit", $, true), $ = null), V && (document.removeEventListener("change", V, true), V = null);
  }
  function Ut(e) {
    let t = e.target;
    if (t.tagName !== "FORM") return;
    let r = g({ formId: t.id || "", formName: t.name || "", formAction: t.getAttribute("action") || "", method: (t.method || "get").toUpperCase(), fieldCount: t.elements.length }, ft(t));
    p("form_submit", { properties: r });
  }
  function Nt(e) {
    var o, d, c;
    let t = e.target, r = t.tagName.toUpperCase();
    if (!["INPUT", "SELECT", "TEXTAREA"].includes(r)) return;
    if (r === "INPUT") {
      let u = (o = t.type) == null ? void 0 : o.toLowerCase();
      if (u === "hidden" || u === "password") return;
    }
    let n = g({ element: r.toLowerCase(), inputName: t.name || t.id || "" }, ft(t));
    r === "INPUT" && (n.inputType = (d = t.type) == null ? void 0 : d.toLowerCase());
    let i = (c = t.form) == null ? void 0 : c.id;
    i && (n.formId = i), p("input_change", { properties: n });
  }
  function ft(e) {
    let t = {};
    for (let r of e.attributes) if (r.name.startsWith("data-rybbit-prop-")) {
      let n = r.name.replace("data-rybbit-prop-", "");
      t[n] = r.value;
    }
    return t;
  }
  var Z = null;
  var O = false;
  var ke = null;
  var R = [];
  var Y;
  var ve;
  async function pt(e) {
    if (l.enableSessionReplay) {
      ve = e;
      try {
        Z = (await import("rrweb")).record, s("rrweb loaded successfully"), gt();
      } catch (t) {
        a("Failed to load rrweb. Make sure it's installed as a peer dependency:", t);
      }
    }
  }
  function gt() {
    var e, t, r, n, i, o, d, c;
    if (!(O || !Z || !l.enableSessionReplay)) try {
      let u = l.replayPrivacyConfig || {}, f = { mousemove: false, mouseInteraction: { MouseUp: false, MouseDown: false, Click: true, ContextMenu: false, DblClick: true, Focus: true, Blur: true, TouchStart: false, TouchEnd: false }, scroll: 500, input: "last", media: 800 }, T = { script: false, comment: true, headFavicon: true, headWhitespace: true, headMetaDescKeywords: true, headMetaSocial: true, headMetaRobots: true, headMetaHttpEquiv: true, headMetaAuthorship: true, headMetaVerification: true }, C = { emit: (b) => {
        Bt({ type: b.type, data: b.data, timestamp: b.timestamp || Date.now() });
      }, recordCanvas: false, checkoutEveryNms: 6e4, checkoutEveryNth: 500, blockClass: (e = u.blockClass) != null ? e : "rr-block", blockSelector: (t = u.blockSelector) != null ? t : void 0, ignoreClass: (r = u.ignoreClass) != null ? r : "rr-ignore", ignoreSelector: (n = u.ignoreSelector) != null ? n : void 0, maskTextClass: (i = u.maskTextClass) != null ? i : "rr-mask", maskAllInputs: (o = u.maskAllInputs) != null ? o : true, maskInputOptions: { password: true, email: true }, collectFonts: (d = u.collectFonts) != null ? d : true, sampling: f, slimDOMOptions: (c = u.slimDOMOptions) != null ? c : T };
      u.maskTextSelectors && u.maskTextSelectors.length > 0 && (C.maskTextSelector = u.maskTextSelectors.join(", ")), ke = Z(C), O = true, Ht(), s("Session replay recording started");
    } catch (u) {
      a("Failed to start session replay recording:", u);
    }
  }
  function mt() {
    if (!l.enableSessionReplay) {
      a("Session replay is not enabled. Enable it via remote config.");
      return;
    }
    if (!Z) {
      a("rrweb is not loaded. Ensure it's installed as a peer dependency.");
      return;
    }
    if (O) {
      s("Session replay is already recording");
      return;
    }
    gt();
  }
  function Ee() {
    if (!O) {
      s("Session replay is not currently recording");
      return;
    }
    ke && ke(), O = false, ht(), R.length > 0 && Te(), s("Session replay recording stopped");
  }
  function bt() {
    return O;
  }
  function Bt(e) {
    R.push(e), R.length >= 250 && Te();
  }
  function Ht() {
    ht(), Y = window.setInterval(() => {
      R.length > 0 && Te();
    }, 5e3);
  }
  function ht() {
    Y !== void 0 && (clearInterval(Y), Y = void 0);
  }
  function Te() {
    if (R.length === 0) return;
    let e = [...R];
    R = [];
    let t = { userId: ve || "", events: e, metadata: { pageUrl: window.location.href, viewportWidth: screen.width, viewportHeight: screen.height, language: navigator.language } };
    Wt(t).catch((r) => {
      a("Failed to send session replay batch:", r), R.unshift(...e);
    });
  }
  async function Wt(e) {
    let t = `${l.analyticsHost}/session-replay/record/${l.siteId}`, r = JSON.stringify(e), n = await fetch(t, { method: "POST", headers: { "Content-Type": "application/json" }, body: r, mode: "cors", keepalive: true });
    if (!n.ok) throw new Error(`Failed to send replay batch: ${n.status}`);
    s(`Session replay batch sent: ${e.events.length} events`);
  }
  function yt(e) {
    ve = e;
  }
  function kt() {
    Ee();
  }
  var m = false;
  var $t = { init: async (e) => {
    if (m) {
      a("Rybbit SDK already initialized. Call init() only once.");
      return;
    }
    await Pe(e) && (m = true, s("Config:", g({}, l)), Me(), _e(), rt(), nt(), at(), ct(), ut(), await pt(ie() || void 0));
  }, pageview: (e) => {
    if (!m) {
      a("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    p("pageview", { pathOverride: e });
  }, event: (e, t) => {
    if (!m) {
      a("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    if (!e) {
      a("Event name is required and must be a string.");
      return;
    }
    p("custom_event", { eventName: e, properties: t });
  }, trackOutbound: (e, t = "", r = "_self") => {
    if (!m) {
      a("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    if (!e) {
      a("Outbound link URL is required and must be a string.");
      return;
    }
    p("outbound", { properties: { url: e, text: t, target: r } });
  }, identify: (e, t) => {
    if (!m) {
      a("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    xe(e, t), yt(e);
  }, setTraits: (e) => {
    if (!m) {
      a("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    De(e);
  }, clearUserId: () => {
    if (!m) {
      a("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    Oe();
  }, getUserId: () => m ? ie() : (a("Rybbit SDK not initialized. Call rybbit.init() first."), null), error: (e, t) => {
    if (!m) {
      a("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    ot(e, t);
  }, onPageChange: (e) => m ? Ue(e) : (a("Rybbit SDK not initialized. Call rybbit.init() first."), () => {
  }), startSessionReplay: () => {
    if (!m) {
      a("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    mt();
  }, stopSessionReplay: () => {
    if (!m) {
      a("Rybbit SDK not initialized. Call rybbit.init() first.");
      return;
    }
    Ee();
  }, isSessionReplayActive: () => m ? bt() : (a("Rybbit SDK not initialized. Call rybbit.init() first."), false), cleanup: () => {
    Ne(), it(), st(), lt(), dt(), kt(), m = false;
  } };
  var Vr = $t;

  // src/js/main.js
  var titles = ["Chief Typo Officer", "Senior LLM Engineer", "What a weird title here", "Hello there", "Get me outta here", "Lead Bug Whisperer", "Principal Snack Strategist", "Global Chaos Coordinator", "Junior Vibe Architect", "Senior Coffee Overlord", "Chief Panic Officer", "Head of Accidental Innovation", "Director of Keyboard Catastrophes"];
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
    if (isLLMReady) {
      window.setTimeout(() => {
        startTitleRotation();
      }, 1e3);
    }
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
    await Vr.init({
      analyticsHost: "https://app.rybbit.io/api",
      siteId: "36e05ec48e6f"
    });
    console.log("inited");
    Vr.pageview();
  }
  window.addEventListener("load", async () => {
    initLib();
  });
})();
/*! Bundled license information:

@rybbit/js/dist/index.mjs:
  (*!
   * @rybbit/js v0.6.0
   * Rybbit Web SDK
   * (c) 2026 Rybbit
   * Released under the AGPL-3.0-only license.
   *)
*/
