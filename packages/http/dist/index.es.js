function he(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: pe } = Object.prototype, { getPrototypeOf: G } = Object, Q = ((e) => (t) => {
  const n = pe.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), A = (e) => (e = e.toLowerCase(), (t) => Q(t) === e), M = (e) => (t) => typeof t === e, { isArray: P } = Array, C = M("undefined");
function Le(e) {
  return e !== null && !C(e) && e.constructor !== null && !C(e.constructor) && T(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const me = A("ArrayBuffer");
function Be(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && me(e.buffer), t;
}
const Ue = M("string"), T = M("function"), ye = M("number"), Y = (e) => e !== null && typeof e == "object", je = (e) => e === !0 || e === !1, B = (e) => {
  if (Q(e) !== "object")
    return !1;
  const t = G(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, ke = A("Date"), He = A("File"), Me = A("Blob"), Ie = A("FileList"), Je = (e) => Y(e) && T(e.pipe), qe = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || pe.call(e) === t || T(e.toString) && e.toString() === t);
}, ze = A("URLSearchParams"), $e = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function F(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), P(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let u;
    for (r = 0; r < i; r++)
      u = o[r], t.call(null, e[u], u, e);
  }
}
function Ee(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const we = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, be = (e) => !C(e) && e !== we;
function W() {
  const { caseless: e } = be(this) && this || {}, t = {}, n = (r, s) => {
    const o = e && Ee(t, s) || s;
    B(t[o]) && B(r) ? t[o] = W(t[o], r) : B(r) ? t[o] = W({}, r) : P(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && F(arguments[r], n);
  return t;
}
const Ve = (e, t, n, { allOwnKeys: r } = {}) => (F(t, (s, o) => {
  n && T(s) ? e[o] = he(s, n) : e[o] = s;
}, { allOwnKeys: r }), e), We = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Ke = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, ve = (e, t, n, r) => {
  let s, o, i;
  const u = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      i = s[o], (!r || r(i, e, t)) && !u[i] && (t[i] = e[i], u[i] = !0);
    e = n !== !1 && G(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Xe = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Ge = (e) => {
  if (!e)
    return null;
  if (P(e))
    return e;
  let t = e.length;
  if (!ye(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Qe = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && G(Uint8Array)), Ye = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = r.next()) && !s.done; ) {
    const o = s.value;
    t.call(e, o[0], o[1]);
  }
}, Ze = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, et = A("HTMLFormElement"), tt = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(n, r, s) {
    return r.toUpperCase() + s;
  }
), re = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), nt = A("RegExp"), Oe = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  F(n, (s, o) => {
    t(s, o, e) !== !1 && (r[o] = s);
  }), Object.defineProperties(e, r);
}, rt = (e) => {
  Oe(e, (t, n) => {
    if (T(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (T(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, st = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((o) => {
      n[o] = !0;
    });
  };
  return P(e) ? r(e) : r(String(e).split(t)), n;
}, ot = () => {
}, it = (e, t) => (e = +e, Number.isFinite(e) ? e : t), at = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (Y(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[s] = r;
        const o = P(r) ? [] : {};
        return F(r, (i, u) => {
          const h = n(i, s + 1);
          !C(h) && (o[u] = h);
        }), t[s] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, a = {
  isArray: P,
  isArrayBuffer: me,
  isBuffer: Le,
  isFormData: qe,
  isArrayBufferView: Be,
  isString: Ue,
  isNumber: ye,
  isBoolean: je,
  isObject: Y,
  isPlainObject: B,
  isUndefined: C,
  isDate: ke,
  isFile: He,
  isBlob: Me,
  isRegExp: nt,
  isFunction: T,
  isStream: Je,
  isURLSearchParams: ze,
  isTypedArray: Qe,
  isFileList: Ie,
  forEach: F,
  merge: W,
  extend: Ve,
  trim: $e,
  stripBOM: We,
  inherits: Ke,
  toFlatObject: ve,
  kindOf: Q,
  kindOfTest: A,
  endsWith: Xe,
  toArray: Ge,
  forEachEntry: Ye,
  matchAll: Ze,
  isHTMLForm: et,
  hasOwnProperty: re,
  hasOwnProp: re,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Oe,
  freezeMethods: rt,
  toObjectSet: st,
  toCamelCase: tt,
  noop: ot,
  toFiniteNumber: it,
  findKey: Ee,
  global: we,
  isContextDefined: be,
  toJSONObject: at
};
function m(e, t, n, r, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s);
}
a.inherits(m, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: a.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Se = m.prototype, Re = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Re[e] = { value: e };
});
Object.defineProperties(m, Re);
Object.defineProperty(Se, "isAxiosError", { value: !0 });
m.from = (e, t, n, r, s, o) => {
  const i = Object.create(Se);
  return a.toFlatObject(e, i, function(h) {
    return h !== Error.prototype;
  }, (u) => u !== "isAxiosError"), m.call(i, e.message, t, n, r, s), i.cause = e, i.name = e.name, o && Object.assign(i, o), i;
};
var ct = typeof self == "object" ? self.FormData : window.FormData;
const ut = ct;
function K(e) {
  return a.isPlainObject(e) || a.isArray(e);
}
function Ae(e) {
  return a.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function se(e, t, n) {
  return e ? e.concat(t).map(function(s, o) {
    return s = Ae(s), !n && o ? "[" + s + "]" : s;
  }).join(n ? "." : "") : t;
}
function lt(e) {
  return a.isArray(e) && !e.some(K);
}
const ft = a.toFlatObject(a, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function dt(e) {
  return e && a.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function I(e, t, n) {
  if (!a.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (ut || FormData)(), n = a.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, S) {
    return !a.isUndefined(S[p]);
  });
  const r = n.metaTokens, s = n.visitor || f, o = n.dots, i = n.indexes, h = (n.Blob || typeof Blob < "u" && Blob) && dt(t);
  if (!a.isFunction(s))
    throw new TypeError("visitor must be a function");
  function c(d) {
    if (d === null)
      return "";
    if (a.isDate(d))
      return d.toISOString();
    if (!h && a.isBlob(d))
      throw new m("Blob is not supported. Use a Buffer instead.");
    return a.isArrayBuffer(d) || a.isTypedArray(d) ? h && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function f(d, p, S) {
    let b = d;
    if (d && !S && typeof d == "object") {
      if (a.endsWith(p, "{}"))
        p = r ? p : p.slice(0, -2), d = JSON.stringify(d);
      else if (a.isArray(d) && lt(d) || a.isFileList(d) || a.endsWith(p, "[]") && (b = a.toArray(d)))
        return p = Ae(p), b.forEach(function(L, De) {
          !(a.isUndefined(L) || L === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? se([p], De, o) : i === null ? p : p + "[]",
            c(L)
          );
        }), !1;
    }
    return K(d) ? !0 : (t.append(se(S, p, o), c(d)), !1);
  }
  const l = [], E = Object.assign(ft, {
    defaultVisitor: f,
    convertValue: c,
    isVisitable: K
  });
  function y(d, p) {
    if (!a.isUndefined(d)) {
      if (l.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      l.push(d), a.forEach(d, function(b, x) {
        (!(a.isUndefined(b) || b === null) && s.call(
          t,
          b,
          a.isString(x) ? x.trim() : x,
          p,
          E
        )) === !0 && y(b, p ? p.concat(x) : [x]);
      }), l.pop();
    }
  }
  if (!a.isObject(e))
    throw new TypeError("data must be an object");
  return y(e), t;
}
function oe(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Z(e, t) {
  this._pairs = [], e && I(e, this, t);
}
const ge = Z.prototype;
ge.append = function(t, n) {
  this._pairs.push([t, n]);
};
ge.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, oe);
  } : oe;
  return this._pairs.map(function(s) {
    return n(s[0]) + "=" + n(s[1]);
  }, "").join("&");
};
function ht(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Te(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || ht, s = n && n.serialize;
  let o;
  if (s ? o = s(t, n) : o = a.isURLSearchParams(t) ? t.toString() : new Z(t, n).toString(r), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class pt {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    a.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const ie = pt, xe = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, mt = typeof URLSearchParams < "u" ? URLSearchParams : Z, yt = FormData, Et = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), wt = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), O = {
  isBrowser: !0,
  classes: {
    URLSearchParams: mt,
    FormData: yt,
    Blob
  },
  isStandardBrowserEnv: Et,
  isStandardBrowserWebWorkerEnv: wt,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function bt(e, t) {
  return I(e, new O.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, s, o) {
      return O.isNode && a.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Ot(e) {
  return a.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function St(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function Ne(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    const u = Number.isFinite(+i), h = o >= n.length;
    return i = !i && a.isArray(s) ? s.length : i, h ? (a.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r, !u) : ((!s[i] || !a.isObject(s[i])) && (s[i] = []), t(n, r, s[i], o) && a.isArray(s[i]) && (s[i] = St(s[i])), !u);
  }
  if (a.isFormData(e) && a.isFunction(e.entries)) {
    const n = {};
    return a.forEachEntry(e, (r, s) => {
      t(Ot(r), s, n, 0);
    }), n;
  }
  return null;
}
const Rt = {
  "Content-Type": void 0
};
function At(e, t, n) {
  if (a.isString(e))
    try {
      return (t || JSON.parse)(e), a.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const J = {
  transitional: xe,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", s = r.indexOf("application/json") > -1, o = a.isObject(t);
    if (o && a.isHTMLForm(t) && (t = new FormData(t)), a.isFormData(t))
      return s && s ? JSON.stringify(Ne(t)) : t;
    if (a.isArrayBuffer(t) || a.isBuffer(t) || a.isStream(t) || a.isFile(t) || a.isBlob(t))
      return t;
    if (a.isArrayBufferView(t))
      return t.buffer;
    if (a.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let u;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return bt(t, this.formSerializer).toString();
      if ((u = a.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const h = this.env && this.env.FormData;
        return I(
          u ? { "files[]": t } : t,
          h && new h(),
          this.formSerializer
        );
      }
    }
    return o || s ? (n.setContentType("application/json", !1), At(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || J.transitional, r = n && n.forcedJSONParsing, s = this.responseType === "json";
    if (t && a.isString(t) && (r && !this.responseType || s)) {
      const i = !(n && n.silentJSONParsing) && s;
      try {
        return JSON.parse(t);
      } catch (u) {
        if (i)
          throw u.name === "SyntaxError" ? m.from(u, m.ERR_BAD_RESPONSE, this, null, this.response) : u;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: O.classes.FormData,
    Blob: O.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
a.forEach(["delete", "get", "head"], function(t) {
  J.headers[t] = {};
});
a.forEach(["post", "put", "patch"], function(t) {
  J.headers[t] = a.merge(Rt);
});
const ee = J, gt = a.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Tt = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), n = i.substring(0, s).trim().toLowerCase(), r = i.substring(s + 1).trim(), !(!n || t[n] && gt[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, ae = Symbol("internals");
function _(e) {
  return e && String(e).trim().toLowerCase();
}
function U(e) {
  return e === !1 || e == null ? e : a.isArray(e) ? e.map(U) : String(e);
}
function xt(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
function Nt(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function ce(e, t, n, r) {
  if (a.isFunction(r))
    return r.call(this, t, n);
  if (a.isString(t)) {
    if (a.isString(r))
      return t.indexOf(r) !== -1;
    if (a.isRegExp(r))
      return r.test(t);
  }
}
function Pt(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function _t(e, t) {
  const n = a.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(s, o, i) {
        return this[r].call(this, t, s, o, i);
      },
      configurable: !0
    });
  });
}
class q {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(u, h, c) {
      const f = _(h);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const l = a.findKey(s, f);
      (!l || s[l] === void 0 || c === !0 || c === void 0 && s[l] !== !1) && (s[l || h] = U(u));
    }
    const i = (u, h) => a.forEach(u, (c, f) => o(c, f, h));
    return a.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : a.isString(t) && (t = t.trim()) && !Nt(t) ? i(Tt(t), n) : t != null && o(n, t, r), this;
  }
  get(t, n) {
    if (t = _(t), t) {
      const r = a.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n)
          return s;
        if (n === !0)
          return xt(s);
        if (a.isFunction(n))
          return n.call(this, s, r);
        if (a.isRegExp(n))
          return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = _(t), t) {
      const r = a.findKey(this, t);
      return !!(r && (!n || ce(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (i = _(i), i) {
        const u = a.findKey(r, i);
        u && (!n || ce(r, r[u], u, n)) && (delete r[u], s = !0);
      }
    }
    return a.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const n = this, r = {};
    return a.forEach(this, (s, o) => {
      const i = a.findKey(r, o);
      if (i) {
        n[i] = U(s), delete n[o];
        return;
      }
      const u = t ? Pt(o) : String(o).trim();
      u !== o && delete n[o], n[u] = U(s), r[u] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return a.forEach(this, (r, s) => {
      r != null && r !== !1 && (n[s] = t && a.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((s) => r.set(s)), r;
  }
  static accessor(t) {
    const r = (this[ae] = this[ae] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(i) {
      const u = _(i);
      r[u] || (_t(s, i), r[u] = !0);
    }
    return a.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
q.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
a.freezeMethods(q.prototype);
a.freezeMethods(q);
const R = q;
function z(e, t) {
  const n = this || ee, r = t || n, s = R.from(r.headers);
  let o = r.data;
  return a.forEach(e, function(u) {
    o = u.call(n, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function Pe(e) {
  return !!(e && e.__CANCEL__);
}
function D(e, t, n) {
  m.call(this, e ?? "canceled", m.ERR_CANCELED, t, n), this.name = "CanceledError";
}
a.inherits(D, m, {
  __CANCEL__: !0
});
const Ct = null;
function Ft(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new m(
    "Request failed with status code " + n.status,
    [m.ERR_BAD_REQUEST, m.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Dt = O.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(n, r, s, o, i, u) {
        const h = [];
        h.push(n + "=" + encodeURIComponent(r)), a.isNumber(s) && h.push("expires=" + new Date(s).toGMTString()), a.isString(o) && h.push("path=" + o), a.isString(i) && h.push("domain=" + i), u === !0 && h.push("secure"), document.cookie = h.join("; ");
      },
      read: function(n) {
        const r = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
        return r ? decodeURIComponent(r[3]) : null;
      },
      remove: function(n) {
        this.write(n, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function Lt(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Bt(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function _e(e, t) {
  return e && !Lt(t) ? Bt(e, t) : t;
}
const Ut = O.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let r;
    function s(o) {
      let i = o;
      return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return r = s(window.location.href), function(i) {
      const u = a.isString(i) ? s(i) : i;
      return u.protocol === r.protocol && u.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function jt(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function kt(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(h) {
    const c = Date.now(), f = r[o];
    i || (i = c), n[s] = h, r[s] = c;
    let l = o, E = 0;
    for (; l !== s; )
      E += n[l++], l = l % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), c - i < t)
      return;
    const y = f && c - f;
    return y ? Math.round(E * 1e3 / y) : void 0;
  };
}
function ue(e, t) {
  let n = 0;
  const r = kt(50, 250);
  return (s) => {
    const o = s.loaded, i = s.lengthComputable ? s.total : void 0, u = o - n, h = r(u), c = o <= i;
    n = o;
    const f = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: u,
      rate: h || void 0,
      estimated: h && i && c ? (i - o) / h : void 0,
      event: s
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const Ht = typeof XMLHttpRequest < "u", Mt = Ht && function(e) {
  return new Promise(function(n, r) {
    let s = e.data;
    const o = R.from(e.headers).normalize(), i = e.responseType;
    let u;
    function h() {
      e.cancelToken && e.cancelToken.unsubscribe(u), e.signal && e.signal.removeEventListener("abort", u);
    }
    a.isFormData(s) && (O.isStandardBrowserEnv || O.isStandardBrowserWebWorkerEnv) && o.setContentType(!1);
    let c = new XMLHttpRequest();
    if (e.auth) {
      const y = e.auth.username || "", d = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(y + ":" + d));
    }
    const f = _e(e.baseURL, e.url);
    c.open(e.method.toUpperCase(), Te(f, e.params, e.paramsSerializer), !0), c.timeout = e.timeout;
    function l() {
      if (!c)
        return;
      const y = R.from(
        "getAllResponseHeaders" in c && c.getAllResponseHeaders()
      ), p = {
        data: !i || i === "text" || i === "json" ? c.responseText : c.response,
        status: c.status,
        statusText: c.statusText,
        headers: y,
        config: e,
        request: c
      };
      Ft(function(b) {
        n(b), h();
      }, function(b) {
        r(b), h();
      }, p), c = null;
    }
    if ("onloadend" in c ? c.onloadend = l : c.onreadystatechange = function() {
      !c || c.readyState !== 4 || c.status === 0 && !(c.responseURL && c.responseURL.indexOf("file:") === 0) || setTimeout(l);
    }, c.onabort = function() {
      c && (r(new m("Request aborted", m.ECONNABORTED, e, c)), c = null);
    }, c.onerror = function() {
      r(new m("Network Error", m.ERR_NETWORK, e, c)), c = null;
    }, c.ontimeout = function() {
      let d = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const p = e.transitional || xe;
      e.timeoutErrorMessage && (d = e.timeoutErrorMessage), r(new m(
        d,
        p.clarifyTimeoutError ? m.ETIMEDOUT : m.ECONNABORTED,
        e,
        c
      )), c = null;
    }, O.isStandardBrowserEnv) {
      const y = (e.withCredentials || Ut(f)) && e.xsrfCookieName && Dt.read(e.xsrfCookieName);
      y && o.set(e.xsrfHeaderName, y);
    }
    s === void 0 && o.setContentType(null), "setRequestHeader" in c && a.forEach(o.toJSON(), function(d, p) {
      c.setRequestHeader(p, d);
    }), a.isUndefined(e.withCredentials) || (c.withCredentials = !!e.withCredentials), i && i !== "json" && (c.responseType = e.responseType), typeof e.onDownloadProgress == "function" && c.addEventListener("progress", ue(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && c.upload && c.upload.addEventListener("progress", ue(e.onUploadProgress)), (e.cancelToken || e.signal) && (u = (y) => {
      c && (r(!y || y.type ? new D(null, e, c) : y), c.abort(), c = null);
    }, e.cancelToken && e.cancelToken.subscribe(u), e.signal && (e.signal.aborted ? u() : e.signal.addEventListener("abort", u)));
    const E = jt(f);
    if (E && O.protocols.indexOf(E) === -1) {
      r(new m("Unsupported protocol " + E + ":", m.ERR_BAD_REQUEST, e));
      return;
    }
    c.send(s || null);
  });
}, j = {
  http: Ct,
  xhr: Mt
};
a.forEach(j, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const It = {
  getAdapter: (e) => {
    e = a.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (let s = 0; s < t && (n = e[s], !(r = a.isString(n) ? j[n.toLowerCase()] : n)); s++)
      ;
    if (!r)
      throw r === !1 ? new m(
        `Adapter ${n} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        a.hasOwnProp(j, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`
      );
    if (!a.isFunction(r))
      throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: j
};
function $(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new D(null, e);
}
function le(e) {
  return $(e), e.headers = R.from(e.headers), e.data = z.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), It.getAdapter(e.adapter || ee.adapter)(e).then(function(r) {
    return $(e), r.data = z.call(
      e,
      e.transformResponse,
      r
    ), r.headers = R.from(r.headers), r;
  }, function(r) {
    return Pe(r) || ($(e), r && r.response && (r.response.data = z.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = R.from(r.response.headers))), Promise.reject(r);
  });
}
const fe = (e) => e instanceof R ? e.toJSON() : e;
function N(e, t) {
  t = t || {};
  const n = {};
  function r(c, f, l) {
    return a.isPlainObject(c) && a.isPlainObject(f) ? a.merge.call({ caseless: l }, c, f) : a.isPlainObject(f) ? a.merge({}, f) : a.isArray(f) ? f.slice() : f;
  }
  function s(c, f, l) {
    if (a.isUndefined(f)) {
      if (!a.isUndefined(c))
        return r(void 0, c, l);
    } else
      return r(c, f, l);
  }
  function o(c, f) {
    if (!a.isUndefined(f))
      return r(void 0, f);
  }
  function i(c, f) {
    if (a.isUndefined(f)) {
      if (!a.isUndefined(c))
        return r(void 0, c);
    } else
      return r(void 0, f);
  }
  function u(c, f, l) {
    if (l in t)
      return r(c, f);
    if (l in e)
      return r(void 0, c);
  }
  const h = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: u,
    headers: (c, f) => s(fe(c), fe(f), !0)
  };
  return a.forEach(Object.keys(e).concat(Object.keys(t)), function(f) {
    const l = h[f] || s, E = l(e[f], t[f], f);
    a.isUndefined(E) && l !== u || (n[f] = E);
  }), n;
}
const Ce = "1.2.1", te = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  te[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const de = {};
te.transitional = function(t, n, r) {
  function s(o, i) {
    return "[Axios v" + Ce + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, u) => {
    if (t === !1)
      throw new m(
        s(i, " has been removed" + (n ? " in " + n : "")),
        m.ERR_DEPRECATED
      );
    return n && !de[i] && (de[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, u) : !0;
  };
};
function Jt(e, t, n) {
  if (typeof e != "object")
    throw new m("options must be an object", m.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s], i = t[o];
    if (i) {
      const u = e[o], h = u === void 0 || i(u, o, e);
      if (h !== !0)
        throw new m("option " + o + " must be " + h, m.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new m("Unknown option " + o, m.ERR_BAD_OPTION);
  }
}
const v = {
  assertOptions: Jt,
  validators: te
}, g = v.validators;
class H {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new ie(),
      response: new ie()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = N(this.defaults, n);
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    r !== void 0 && v.assertOptions(r, {
      silentJSONParsing: g.transitional(g.boolean),
      forcedJSONParsing: g.transitional(g.boolean),
      clarifyTimeoutError: g.transitional(g.boolean)
    }, !1), s !== void 0 && v.assertOptions(s, {
      encode: g.function,
      serialize: g.function
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i;
    i = o && a.merge(
      o.common,
      o[n.method]
    ), i && a.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete o[d];
      }
    ), n.headers = R.concat(i, o);
    const u = [];
    let h = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(n) === !1 || (h = h && p.synchronous, u.unshift(p.fulfilled, p.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(p) {
      c.push(p.fulfilled, p.rejected);
    });
    let f, l = 0, E;
    if (!h) {
      const d = [le.bind(this), void 0];
      for (d.unshift.apply(d, u), d.push.apply(d, c), E = d.length, f = Promise.resolve(n); l < E; )
        f = f.then(d[l++], d[l++]);
      return f;
    }
    E = u.length;
    let y = n;
    for (l = 0; l < E; ) {
      const d = u[l++], p = u[l++];
      try {
        y = d(y);
      } catch (S) {
        p.call(this, S);
        break;
      }
    }
    try {
      f = le.call(this, y);
    } catch (d) {
      return Promise.reject(d);
    }
    for (l = 0, E = c.length; l < E; )
      f = f.then(c[l++], c[l++]);
    return f;
  }
  getUri(t) {
    t = N(this.defaults, t);
    const n = _e(t.baseURL, t.url);
    return Te(n, t.params, t.paramsSerializer);
  }
}
a.forEach(["delete", "get", "head", "options"], function(t) {
  H.prototype[t] = function(n, r) {
    return this.request(N(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
a.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, i, u) {
      return this.request(N(u || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  H.prototype[t] = n(), H.prototype[t + "Form"] = n(!0);
});
const k = H;
class ne {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners)
        return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](s);
      r._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const i = new Promise((u) => {
        r.subscribe(u), o = u;
      }).then(s);
      return i.cancel = function() {
        r.unsubscribe(o);
      }, i;
    }, t(function(o, i, u) {
      r.reason || (r.reason = new D(o, i, u), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new ne(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
}
const qt = ne;
function zt(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function $t(e) {
  return a.isObject(e) && e.isAxiosError === !0;
}
function Fe(e) {
  const t = new k(e), n = he(k.prototype.request, t);
  return a.extend(n, k.prototype, t, { allOwnKeys: !0 }), a.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(s) {
    return Fe(N(e, s));
  }, n;
}
const w = Fe(ee);
w.Axios = k;
w.CanceledError = D;
w.CancelToken = qt;
w.isCancel = Pe;
w.VERSION = Ce;
w.toFormData = I;
w.AxiosError = m;
w.Cancel = w.CanceledError;
w.all = function(t) {
  return Promise.all(t);
};
w.spread = zt;
w.isAxiosError = $t;
w.mergeConfig = N;
w.AxiosHeaders = R;
w.formToJSON = (e) => Ne(a.isHTMLForm(e) ? new FormData(e) : e);
w.default = w;
const Vt = w;
function V(e) {
  return e !== null && typeof e == "object";
}
function X(e, t, n = ".", r) {
  if (!V(t))
    return X(e, {}, n, r);
  const s = Object.assign({}, t);
  for (const o in e) {
    if (o === "__proto__" || o === "constructor")
      continue;
    const i = e[o];
    i != null && (r && r(s, o, i, n) || (Array.isArray(i) && Array.isArray(s[o]) ? s[o] = [...i, ...s[o]] : V(i) && V(s[o]) ? s[o] = X(i, s[o], (n ? `${n}.` : "") + o.toString(), r) : s[o] = i));
  }
  return s;
}
function Wt(e) {
  return (...t) => t.reduce((n, r) => X(n, r, "", e), {});
}
const Kt = Wt();
var vt = /* @__PURE__ */ ((e) => (e.JSON = "application/json; charset=UTF-8", e.URLEncoded = "application/x-www-form-urlencoded; charset=UTF-8", e.FormData = "multipart/form-data; charset=UTF-8", e))(vt || {});
const Xt = {
  baseURL: "/api",
  method: "post",
  timeout: 5e3,
  loading: {
    start: console.log.bind(null, "🚀 ~ http loading start"),
    end: console.log.bind(null, "🚀 ~ http loading end")
  },
  fail: console.error.bind(null, "🚀 ~ http loading error"),
  checkFn: (e) => e,
  headers: {
    getCommonHeaders: () => ({}),
    getAuthHeaders: () => ({})
  }
}, Gt = (e = {}) => {
  const t = Kt(e, Xt), { baseURL: n, lazyBaseURL: r, method: s, timeout: o, headers: i, checkFn: u, loading: h, fail: c } = t, f = Vt.create({
    method: s,
    timeout: o,
    headers: i.getCommonHeaders()
  });
  return f.interceptors.request.use(
    (l) => (!l.notLoading && h.start(), l.baseURL || (l.baseURL = (r == null ? void 0 : r()) ?? n), l),
    (l) => (c(l), Promise.reject(l))
  ), f.interceptors.response.use(
    (l) => {
      !l.config.notLoading && h.end();
      const E = l.data;
      try {
        return u(E);
      } catch (y) {
        c(y);
      }
    },
    (l) => {
      l && l.config && !l.config.notLoading && h.end(), c(l);
    }
  ), {
    get: void 0,
    post: void 0,
    delete: void 0,
    put: void 0,
    patch: void 0,
    head: void 0,
    purge: void 0,
    options: void 0,
    link: void 0,
    unlink: void 0,
    __instance__: f,
    __mixin__(l) {
      for (const E in l)
        if (Object.prototype.hasOwnProperty.call(l, E)) {
          const y = this[E] || {}, d = l[E];
          this[E] = {
            ...y,
            ...d
          };
        }
      return this;
    },
    freeReq: f.request,
    authReq: (l) => f.request({
      ...l,
      headers: {
        ...i.getAuthHeaders(),
        ...l == null ? void 0 : l.headers
      }
    })
  };
};
export {
  vt as UsefulContentTypes,
  Gt as useHttp
};
//# sourceMappingURL=index.es.js.map
