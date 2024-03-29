function ye(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: ke } = Object.prototype, { getPrototypeOf: ee } = Object, I = ((e) => (t) => {
  const n = ke.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), A = (e) => (e = e.toLowerCase(), (t) => I(t) === e), q = (e) => (t) => typeof t === e, { isArray: P } = Array, F = q("undefined");
function He(e) {
  return e !== null && !F(e) && e.constructor !== null && !F(e.constructor) && R(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const we = A("ArrayBuffer");
function Ie(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && we(e.buffer), t;
}
const qe = q("string"), R = q("function"), Ee = q("number"), M = (e) => e !== null && typeof e == "object", Me = (e) => e === !0 || e === !1, D = (e) => {
  if (I(e) !== "object")
    return !1;
  const t = ee(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, ze = A("Date"), Je = A("File"), $e = A("Blob"), Ve = A("FileList"), We = (e) => M(e) && R(e.pipe), ve = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || R(e.append) && ((t = I(e)) === "formdata" || // detect form-data instance
  t === "object" && R(e.toString) && e.toString() === "[object FormData]"));
}, Ke = A("URLSearchParams"), Ge = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function _(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), P(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let l;
    for (r = 0; r < i; r++)
      l = o[r], t.call(null, e[l], l, e);
  }
}
function be(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const Se = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Re = (e) => !F(e) && e !== Se;
function G() {
  const { caseless: e } = Re(this) && this || {}, t = {}, n = (r, s) => {
    const o = e && be(t, s) || s;
    D(t[o]) && D(r) ? t[o] = G(t[o], r) : D(r) ? t[o] = G({}, r) : P(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && _(arguments[r], n);
  return t;
}
const Xe = (e, t, n, { allOwnKeys: r } = {}) => (_(t, (s, o) => {
  n && R(s) ? e[o] = ye(s, n) : e[o] = s;
}, { allOwnKeys: r }), e), Qe = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Ze = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Ye = (e, t, n, r) => {
  let s, o, i;
  const l = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      i = s[o], (!r || r(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = n !== !1 && ee(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, et = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, tt = (e) => {
  if (!e)
    return null;
  if (P(e))
    return e;
  let t = e.length;
  if (!Ee(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, nt = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && ee(Uint8Array)), rt = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = r.next()) && !s.done; ) {
    const o = s.value;
    t.call(e, o[0], o[1]);
  }
}, st = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, ot = A("HTMLFormElement"), it = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, s) {
    return r.toUpperCase() + s;
  }
), ie = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), at = A("RegExp"), Oe = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  _(n, (s, o) => {
    let i;
    (i = t(s, o, e)) !== !1 && (r[o] = i || s);
  }), Object.defineProperties(e, r);
}, ct = (e) => {
  Oe(e, (t, n) => {
    if (R(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (R(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ut = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((o) => {
      n[o] = !0;
    });
  };
  return P(e) ? r(e) : r(String(e).split(t)), n;
}, lt = () => {
}, ft = (e, t) => (e = +e, Number.isFinite(e) ? e : t), $ = "abcdefghijklmnopqrstuvwxyz", ae = "0123456789", Ae = {
  DIGIT: ae,
  ALPHA: $,
  ALPHA_DIGIT: $ + $.toUpperCase() + ae
}, dt = (e = 16, t = Ae.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function pt(e) {
  return !!(e && R(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const ht = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (M(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[s] = r;
        const o = P(r) ? [] : {};
        return _(r, (i, l) => {
          const d = n(i, s + 1);
          !F(d) && (o[l] = d);
        }), t[s] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, mt = A("AsyncFunction"), yt = (e) => e && (M(e) || R(e)) && R(e.then) && R(e.catch), a = {
  isArray: P,
  isArrayBuffer: we,
  isBuffer: He,
  isFormData: ve,
  isArrayBufferView: Ie,
  isString: qe,
  isNumber: Ee,
  isBoolean: Me,
  isObject: M,
  isPlainObject: D,
  isUndefined: F,
  isDate: ze,
  isFile: Je,
  isBlob: $e,
  isRegExp: at,
  isFunction: R,
  isStream: We,
  isURLSearchParams: Ke,
  isTypedArray: nt,
  isFileList: Ve,
  forEach: _,
  merge: G,
  extend: Xe,
  trim: Ge,
  stripBOM: Qe,
  inherits: Ze,
  toFlatObject: Ye,
  kindOf: I,
  kindOfTest: A,
  endsWith: et,
  toArray: tt,
  forEachEntry: rt,
  matchAll: st,
  isHTMLForm: ot,
  hasOwnProperty: ie,
  hasOwnProp: ie,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Oe,
  freezeMethods: ct,
  toObjectSet: ut,
  toCamelCase: it,
  noop: lt,
  toFiniteNumber: ft,
  findKey: be,
  global: Se,
  isContextDefined: Re,
  ALPHABET: Ae,
  generateString: dt,
  isSpecCompliantForm: pt,
  toJSONObject: ht,
  isAsyncFn: mt,
  isThenable: yt
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
const Te = m.prototype, ge = {};
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
  ge[e] = { value: e };
});
Object.defineProperties(m, ge);
Object.defineProperty(Te, "isAxiosError", { value: !0 });
m.from = (e, t, n, r, s, o) => {
  const i = Object.create(Te);
  return a.toFlatObject(e, i, function(d) {
    return d !== Error.prototype;
  }, (l) => l !== "isAxiosError"), m.call(i, e.message, t, n, r, s), i.cause = e, i.name = e.name, o && Object.assign(i, o), i;
};
const wt = null;
function X(e) {
  return a.isPlainObject(e) || a.isArray(e);
}
function Ne(e) {
  return a.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ce(e, t, n) {
  return e ? e.concat(t).map(function(s, o) {
    return s = Ne(s), !n && o ? "[" + s + "]" : s;
  }).join(n ? "." : "") : t;
}
function Et(e) {
  return a.isArray(e) && !e.some(X);
}
const bt = a.toFlatObject(a, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function z(e, t, n) {
  if (!a.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = a.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, b) {
    return !a.isUndefined(b[h]);
  });
  const r = n.metaTokens, s = n.visitor || f, o = n.dots, i = n.indexes, d = (n.Blob || typeof Blob < "u" && Blob) && a.isSpecCompliantForm(t);
  if (!a.isFunction(s))
    throw new TypeError("visitor must be a function");
  function u(c) {
    if (c === null)
      return "";
    if (a.isDate(c))
      return c.toISOString();
    if (!d && a.isBlob(c))
      throw new m("Blob is not supported. Use a Buffer instead.");
    return a.isArrayBuffer(c) || a.isTypedArray(c) ? d && typeof Blob == "function" ? new Blob([c]) : Buffer.from(c) : c;
  }
  function f(c, h, b) {
    let S = c;
    if (c && !b && typeof c == "object") {
      if (a.endsWith(h, "{}"))
        h = r ? h : h.slice(0, -2), c = JSON.stringify(c);
      else if (a.isArray(c) && Et(c) || (a.isFileList(c) || a.endsWith(h, "[]")) && (S = a.toArray(c)))
        return h = Ne(h), S.forEach(function(U, je) {
          !(a.isUndefined(U) || U === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? ce([h], je, o) : i === null ? h : h + "[]",
            u(U)
          );
        }), !1;
    }
    return X(c) ? !0 : (t.append(ce(b, h, o), u(c)), !1);
  }
  const p = [], w = Object.assign(bt, {
    defaultVisitor: f,
    convertValue: u,
    isVisitable: X
  });
  function y(c, h) {
    if (!a.isUndefined(c)) {
      if (p.indexOf(c) !== -1)
        throw Error("Circular reference detected in " + h.join("."));
      p.push(c), a.forEach(c, function(S, N) {
        (!(a.isUndefined(S) || S === null) && s.call(
          t,
          S,
          a.isString(N) ? N.trim() : N,
          h,
          w
        )) === !0 && y(S, h ? h.concat(N) : [N]);
      }), p.pop();
    }
  }
  if (!a.isObject(e))
    throw new TypeError("data must be an object");
  return y(e), t;
}
function ue(e) {
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
function te(e, t) {
  this._pairs = [], e && z(e, this, t);
}
const xe = te.prototype;
xe.append = function(t, n) {
  this._pairs.push([t, n]);
};
xe.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, ue);
  } : ue;
  return this._pairs.map(function(s) {
    return n(s[0]) + "=" + n(s[1]);
  }, "").join("&");
};
function St(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Pe(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || St, s = n && n.serialize;
  let o;
  if (s ? o = s(t, n) : o = a.isURLSearchParams(t) ? t.toString() : new te(t, n).toString(r), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class Rt {
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
const le = Rt, Ce = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ot = typeof URLSearchParams < "u" ? URLSearchParams : te, At = typeof FormData < "u" ? FormData : null, Tt = typeof Blob < "u" ? Blob : null, gt = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Nt = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), O = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ot,
    FormData: At,
    Blob: Tt
  },
  isStandardBrowserEnv: gt,
  isStandardBrowserWebWorkerEnv: Nt,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function xt(e, t) {
  return z(e, new O.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, s, o) {
      return O.isNode && a.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Pt(e) {
  return a.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Ct(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function Fe(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    const l = Number.isFinite(+i), d = o >= n.length;
    return i = !i && a.isArray(s) ? s.length : i, d ? (a.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r, !l) : ((!s[i] || !a.isObject(s[i])) && (s[i] = []), t(n, r, s[i], o) && a.isArray(s[i]) && (s[i] = Ct(s[i])), !l);
  }
  if (a.isFormData(e) && a.isFunction(e.entries)) {
    const n = {};
    return a.forEachEntry(e, (r, s) => {
      t(Pt(r), s, n, 0);
    }), n;
  }
  return null;
}
function Ft(e, t, n) {
  if (a.isString(e))
    try {
      return (t || JSON.parse)(e), a.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const ne = {
  transitional: Ce,
  adapter: O.isNode ? "http" : "xhr",
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", s = r.indexOf("application/json") > -1, o = a.isObject(t);
    if (o && a.isHTMLForm(t) && (t = new FormData(t)), a.isFormData(t))
      return s && s ? JSON.stringify(Fe(t)) : t;
    if (a.isArrayBuffer(t) || a.isBuffer(t) || a.isStream(t) || a.isFile(t) || a.isBlob(t))
      return t;
    if (a.isArrayBufferView(t))
      return t.buffer;
    if (a.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return xt(t, this.formSerializer).toString();
      if ((l = a.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return z(
          l ? { "files[]": t } : t,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return o || s ? (n.setContentType("application/json", !1), Ft(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || ne.transitional, r = n && n.forcedJSONParsing, s = this.responseType === "json";
    if (t && a.isString(t) && (r && !this.responseType || s)) {
      const i = !(n && n.silentJSONParsing) && s;
      try {
        return JSON.parse(t);
      } catch (l) {
        if (i)
          throw l.name === "SyntaxError" ? m.from(l, m.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
a.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  ne.headers[e] = {};
});
const re = ne, _t = a.toObjectSet([
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
]), Lt = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), n = i.substring(0, s).trim().toLowerCase(), r = i.substring(s + 1).trim(), !(!n || t[n] && _t[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, fe = Symbol("internals");
function C(e) {
  return e && String(e).trim().toLowerCase();
}
function B(e) {
  return e === !1 || e == null ? e : a.isArray(e) ? e.map(B) : String(e);
}
function Ut(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const Dt = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function V(e, t, n, r, s) {
  if (a.isFunction(r))
    return r.call(this, t, n);
  if (s && (t = n), !!a.isString(t)) {
    if (a.isString(r))
      return t.indexOf(r) !== -1;
    if (a.isRegExp(r))
      return r.test(t);
  }
}
function Bt(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function jt(e, t) {
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
class J {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(l, d, u) {
      const f = C(d);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const p = a.findKey(s, f);
      (!p || s[p] === void 0 || u === !0 || u === void 0 && s[p] !== !1) && (s[p || d] = B(l));
    }
    const i = (l, d) => a.forEach(l, (u, f) => o(u, f, d));
    return a.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : a.isString(t) && (t = t.trim()) && !Dt(t) ? i(Lt(t), n) : t != null && o(n, t, r), this;
  }
  get(t, n) {
    if (t = C(t), t) {
      const r = a.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n)
          return s;
        if (n === !0)
          return Ut(s);
        if (a.isFunction(n))
          return n.call(this, s, r);
        if (a.isRegExp(n))
          return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = C(t), t) {
      const r = a.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || V(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (i = C(i), i) {
        const l = a.findKey(r, i);
        l && (!n || V(r, r[l], l, n)) && (delete r[l], s = !0);
      }
    }
    return a.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, s = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || V(this, this[o], o, t, !0)) && (delete this[o], s = !0);
    }
    return s;
  }
  normalize(t) {
    const n = this, r = {};
    return a.forEach(this, (s, o) => {
      const i = a.findKey(r, o);
      if (i) {
        n[i] = B(s), delete n[o];
        return;
      }
      const l = t ? Bt(o) : String(o).trim();
      l !== o && delete n[o], n[l] = B(s), r[l] = !0;
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
    const r = (this[fe] = this[fe] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(i) {
      const l = C(i);
      r[l] || (jt(s, i), r[l] = !0);
    }
    return a.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
J.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
a.reduceDescriptors(J.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
a.freezeMethods(J);
const T = J;
function W(e, t) {
  const n = this || re, r = t || n, s = T.from(r.headers);
  let o = r.data;
  return a.forEach(e, function(l) {
    o = l.call(n, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function _e(e) {
  return !!(e && e.__CANCEL__);
}
function L(e, t, n) {
  m.call(this, e ?? "canceled", m.ERR_CANCELED, t, n), this.name = "CanceledError";
}
a.inherits(L, m, {
  __CANCEL__: !0
});
function kt(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new m(
    "Request failed with status code " + n.status,
    [m.ERR_BAD_REQUEST, m.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Ht = O.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(n, r, s, o, i, l) {
        const d = [];
        d.push(n + "=" + encodeURIComponent(r)), a.isNumber(s) && d.push("expires=" + new Date(s).toGMTString()), a.isString(o) && d.push("path=" + o), a.isString(i) && d.push("domain=" + i), l === !0 && d.push("secure"), document.cookie = d.join("; ");
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
function It(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function qt(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Le(e, t) {
  return e && !It(t) ? qt(e, t) : t;
}
const Mt = O.isStandardBrowserEnv ? (
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
      const l = a.isString(i) ? s(i) : i;
      return l.protocol === r.protocol && l.host === r.host;
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
function zt(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Jt(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(d) {
    const u = Date.now(), f = r[o];
    i || (i = u), n[s] = d, r[s] = u;
    let p = o, w = 0;
    for (; p !== s; )
      w += n[p++], p = p % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), u - i < t)
      return;
    const y = f && u - f;
    return y ? Math.round(w * 1e3 / y) : void 0;
  };
}
function de(e, t) {
  let n = 0;
  const r = Jt(50, 250);
  return (s) => {
    const o = s.loaded, i = s.lengthComputable ? s.total : void 0, l = o - n, d = r(l), u = o <= i;
    n = o;
    const f = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: l,
      rate: d || void 0,
      estimated: d && i && u ? (i - o) / d : void 0,
      event: s
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const $t = typeof XMLHttpRequest < "u", Vt = $t && function(e) {
  return new Promise(function(n, r) {
    let s = e.data;
    const o = T.from(e.headers).normalize(), i = e.responseType;
    let l;
    function d() {
      e.cancelToken && e.cancelToken.unsubscribe(l), e.signal && e.signal.removeEventListener("abort", l);
    }
    a.isFormData(s) && (O.isStandardBrowserEnv || O.isStandardBrowserWebWorkerEnv ? o.setContentType(!1) : o.setContentType("multipart/form-data;", !1));
    let u = new XMLHttpRequest();
    if (e.auth) {
      const y = e.auth.username || "", c = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(y + ":" + c));
    }
    const f = Le(e.baseURL, e.url);
    u.open(e.method.toUpperCase(), Pe(f, e.params, e.paramsSerializer), !0), u.timeout = e.timeout;
    function p() {
      if (!u)
        return;
      const y = T.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), h = {
        data: !i || i === "text" || i === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: y,
        config: e,
        request: u
      };
      kt(function(S) {
        n(S), d();
      }, function(S) {
        r(S), d();
      }, h), u = null;
    }
    if ("onloadend" in u ? u.onloadend = p : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(p);
    }, u.onabort = function() {
      u && (r(new m("Request aborted", m.ECONNABORTED, e, u)), u = null);
    }, u.onerror = function() {
      r(new m("Network Error", m.ERR_NETWORK, e, u)), u = null;
    }, u.ontimeout = function() {
      let c = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const h = e.transitional || Ce;
      e.timeoutErrorMessage && (c = e.timeoutErrorMessage), r(new m(
        c,
        h.clarifyTimeoutError ? m.ETIMEDOUT : m.ECONNABORTED,
        e,
        u
      )), u = null;
    }, O.isStandardBrowserEnv) {
      const y = (e.withCredentials || Mt(f)) && e.xsrfCookieName && Ht.read(e.xsrfCookieName);
      y && o.set(e.xsrfHeaderName, y);
    }
    s === void 0 && o.setContentType(null), "setRequestHeader" in u && a.forEach(o.toJSON(), function(c, h) {
      u.setRequestHeader(h, c);
    }), a.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), i && i !== "json" && (u.responseType = e.responseType), typeof e.onDownloadProgress == "function" && u.addEventListener("progress", de(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", de(e.onUploadProgress)), (e.cancelToken || e.signal) && (l = (y) => {
      u && (r(!y || y.type ? new L(null, e, u) : y), u.abort(), u = null);
    }, e.cancelToken && e.cancelToken.subscribe(l), e.signal && (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
    const w = zt(f);
    if (w && O.protocols.indexOf(w) === -1) {
      r(new m("Unsupported protocol " + w + ":", m.ERR_BAD_REQUEST, e));
      return;
    }
    u.send(s || null);
  });
}, j = {
  http: wt,
  xhr: Vt
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
const Ue = {
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
function v(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new L(null, e);
}
function pe(e) {
  return v(e), e.headers = T.from(e.headers), e.data = W.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Ue.getAdapter(e.adapter || re.adapter)(e).then(function(r) {
    return v(e), r.data = W.call(
      e,
      e.transformResponse,
      r
    ), r.headers = T.from(r.headers), r;
  }, function(r) {
    return _e(r) || (v(e), r && r.response && (r.response.data = W.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = T.from(r.response.headers))), Promise.reject(r);
  });
}
const he = (e) => e instanceof T ? e.toJSON() : e;
function x(e, t) {
  t = t || {};
  const n = {};
  function r(u, f, p) {
    return a.isPlainObject(u) && a.isPlainObject(f) ? a.merge.call({ caseless: p }, u, f) : a.isPlainObject(f) ? a.merge({}, f) : a.isArray(f) ? f.slice() : f;
  }
  function s(u, f, p) {
    if (a.isUndefined(f)) {
      if (!a.isUndefined(u))
        return r(void 0, u, p);
    } else
      return r(u, f, p);
  }
  function o(u, f) {
    if (!a.isUndefined(f))
      return r(void 0, f);
  }
  function i(u, f) {
    if (a.isUndefined(f)) {
      if (!a.isUndefined(u))
        return r(void 0, u);
    } else
      return r(void 0, f);
  }
  function l(u, f, p) {
    if (p in t)
      return r(u, f);
    if (p in e)
      return r(void 0, u);
  }
  const d = {
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
    validateStatus: l,
    headers: (u, f) => s(he(u), he(f), !0)
  };
  return a.forEach(Object.keys(Object.assign({}, e, t)), function(f) {
    const p = d[f] || s, w = p(e[f], t[f], f);
    a.isUndefined(w) && p !== l || (n[f] = w);
  }), n;
}
const De = "1.5.0", se = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  se[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const me = {};
se.transitional = function(t, n, r) {
  function s(o, i) {
    return "[Axios v" + De + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, l) => {
    if (t === !1)
      throw new m(
        s(i, " has been removed" + (n ? " in " + n : "")),
        m.ERR_DEPRECATED
      );
    return n && !me[i] && (me[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, l) : !0;
  };
};
function Wt(e, t, n) {
  if (typeof e != "object")
    throw new m("options must be an object", m.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s], i = t[o];
    if (i) {
      const l = e[o], d = l === void 0 || i(l, o, e);
      if (d !== !0)
        throw new m("option " + o + " must be " + d, m.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new m("Unknown option " + o, m.ERR_BAD_OPTION);
  }
}
const Q = {
  assertOptions: Wt,
  validators: se
}, g = Q.validators;
class H {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new le(),
      response: new le()
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = x(this.defaults, n);
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    r !== void 0 && Q.assertOptions(r, {
      silentJSONParsing: g.transitional(g.boolean),
      forcedJSONParsing: g.transitional(g.boolean),
      clarifyTimeoutError: g.transitional(g.boolean)
    }, !1), s != null && (a.isFunction(s) ? n.paramsSerializer = {
      serialize: s
    } : Q.assertOptions(s, {
      encode: g.function,
      serialize: g.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && a.merge(
      o.common,
      o[n.method]
    );
    o && a.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (c) => {
        delete o[c];
      }
    ), n.headers = T.concat(i, o);
    const l = [];
    let d = !0;
    this.interceptors.request.forEach(function(h) {
      typeof h.runWhen == "function" && h.runWhen(n) === !1 || (d = d && h.synchronous, l.unshift(h.fulfilled, h.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(h) {
      u.push(h.fulfilled, h.rejected);
    });
    let f, p = 0, w;
    if (!d) {
      const c = [pe.bind(this), void 0];
      for (c.unshift.apply(c, l), c.push.apply(c, u), w = c.length, f = Promise.resolve(n); p < w; )
        f = f.then(c[p++], c[p++]);
      return f;
    }
    w = l.length;
    let y = n;
    for (p = 0; p < w; ) {
      const c = l[p++], h = l[p++];
      try {
        y = c(y);
      } catch (b) {
        h.call(this, b);
        break;
      }
    }
    try {
      f = pe.call(this, y);
    } catch (c) {
      return Promise.reject(c);
    }
    for (p = 0, w = u.length; p < w; )
      f = f.then(u[p++], u[p++]);
    return f;
  }
  getUri(t) {
    t = x(this.defaults, t);
    const n = Le(t.baseURL, t.url);
    return Pe(n, t.params, t.paramsSerializer);
  }
}
a.forEach(["delete", "get", "head", "options"], function(t) {
  H.prototype[t] = function(n, r) {
    return this.request(x(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
a.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, i, l) {
      return this.request(x(l || {}, {
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
class oe {
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
      const i = new Promise((l) => {
        r.subscribe(l), o = l;
      }).then(s);
      return i.cancel = function() {
        r.unsubscribe(o);
      }, i;
    }, t(function(o, i, l) {
      r.reason || (r.reason = new L(o, i, l), n(r.reason));
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
      token: new oe(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
}
const vt = oe;
function Kt(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Gt(e) {
  return a.isObject(e) && e.isAxiosError === !0;
}
const Z = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Z).forEach(([e, t]) => {
  Z[t] = e;
});
const Xt = Z;
function Be(e) {
  const t = new k(e), n = ye(k.prototype.request, t);
  return a.extend(n, k.prototype, t, { allOwnKeys: !0 }), a.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(s) {
    return Be(x(e, s));
  }, n;
}
const E = Be(re);
E.Axios = k;
E.CanceledError = L;
E.CancelToken = vt;
E.isCancel = _e;
E.VERSION = De;
E.toFormData = z;
E.AxiosError = m;
E.Cancel = E.CanceledError;
E.all = function(t) {
  return Promise.all(t);
};
E.spread = Kt;
E.isAxiosError = Gt;
E.mergeConfig = x;
E.AxiosHeaders = T;
E.formToJSON = (e) => Fe(a.isHTMLForm(e) ? new FormData(e) : e);
E.getAdapter = Ue.getAdapter;
E.HttpStatusCode = Xt;
E.default = E;
const Qt = E;
function K(e) {
  return e !== null && typeof e == "object";
}
function Y(e, t, n = ".", r) {
  if (!K(t))
    return Y(e, {}, n, r);
  const s = Object.assign({}, t);
  for (const o in e) {
    if (o === "__proto__" || o === "constructor")
      continue;
    const i = e[o];
    i != null && (r && r(s, o, i, n) || (Array.isArray(i) && Array.isArray(s[o]) ? s[o] = [...i, ...s[o]] : K(i) && K(s[o]) ? s[o] = Y(
      i,
      s[o],
      (n ? `${n}.` : "") + o.toString(),
      r
    ) : s[o] = i));
  }
  return s;
}
function Zt(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, r) => Y(n, r, "", e), {})
  );
}
const Yt = Zt();
var en = /* @__PURE__ */ ((e) => (e.JSON = "application/json; charset=UTF-8", e.URLEncoded = "application/x-www-form-urlencoded; charset=UTF-8", e.FormData = "multipart/form-data; charset=UTF-8", e))(en || {});
const tn = {
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
}, nn = (e = {}) => {
  const t = Yt(e, tn), { baseURL: n, lazyBaseURL: r, method: s, timeout: o, headers: i, checkFn: l, loading: d, fail: u } = t, f = Qt.create({
    method: s,
    timeout: o
  });
  let p = 0;
  function w() {
    p++, d.start();
  }
  function y() {
    --p === 0 && d.end();
  }
  return f.interceptors.request.use(
    (c) => (!c.notLoading && w(), c.baseURL || (c.baseURL = (r == null ? void 0 : r()) ?? n), c),
    (c) => (u(c, c), Promise.reject(c))
  ), f.interceptors.response.use(
    (c) => {
      !c.config.notLoading && y();
      const h = c.data;
      try {
        return l(h);
      } catch (b) {
        u(b, c);
      }
    },
    (c) => {
      c && c.config && !c.config.notLoading && y(), u(c, c);
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
    __mixin__(c) {
      for (const h in c)
        if (Object.prototype.hasOwnProperty.call(c, h)) {
          const b = this[h] || {}, S = c[h];
          this[h] = {
            ...b,
            ...S
          };
        }
      return this;
    },
    freeReq: (c) => f.request({
      ...c,
      headers: {
        ...i.getCommonHeaders(c),
        ...c == null ? void 0 : c.headers
      }
    }),
    authReq: (c) => f.request({
      ...c,
      headers: {
        ...i.getCommonHeaders(c),
        ...i.getAuthHeaders(c),
        ...c == null ? void 0 : c.headers
      }
    })
  };
};
export {
  en as U,
  Qt as a,
  Le as b,
  Pe as c,
  Jt as d,
  Yt as e,
  tn as f,
  kt as s,
  nn as u
};
//# sourceMappingURL=index-67a7e4df.mjs.map
