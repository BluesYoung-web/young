const x = (t, e) => Object.prototype.toString.call(t) === `[object ${e.name}]`, M = (t) => x(t, Array), B = (t) => x(t, Object), J = (t) => x(t, Number), H = (t) => x(t, String), Y = (t) => x(t, Boolean), X = (t) => x(t, Map), K = (t) => x(t, WeakMap), j = (t) => x(t, Set), V = (t) => x(t, WeakSet), Q = (t) => x(t, ArrayBuffer), tt = (t) => x(t, RegExp), et = (t) => x(t, Function), nt = (t) => x(t, Symbol), rt = (t) => t === null, ot = (t) => t === void 0, st = (t) => {
  if ([null, void 0, NaN, !1].includes(t) || typeof t != "object")
    return t;
  const e = M(t) ? [] : {}, n = [
    {
      parent: e,
      key: void 0,
      data: t
    }
  ];
  for (; n.length; ) {
    const { parent: r, key: o, data: u } = n.pop();
    let f = r;
    typeof o < "u" && (f = r[o] = M(u) ? [] : {});
    for (let [l, h] of Object.entries(u))
      typeof h == "object" && h !== null && ![Date, RegExp, Function].some((a) => h instanceof a) ? n.push({
        parent: f,
        key: l,
        data: h
      }) : f[l] = h;
  }
  return e;
};
function E(t) {
  return +t || 0;
}
function I(t, e = 2) {
  return (E(t) / 100).toFixed(e);
}
function ct(t) {
  return E(t) * 100;
}
function at(t, e = 2, n = !1) {
  return L(I(t, e), n);
}
const L = (t, e = !1) => {
  if (t) {
    if (t = t.toString().replace(/\$|\,/g, ""), t === "" || isNaN(+t))
      return "Not a Number !";
    let n = t.indexOf("-") === 0 ? "-" : e ? "+" : "", r = t.indexOf(".") > 0 ? t.substr(t.indexOf(".")) : "";
    if (r = r.length > 1 ? r : "", t = t.indexOf(".") > 0 ? t.substring(0, t.indexOf(".")) : t, t = Math.abs(+t).toString(), r === "") {
      if (t.length > 1 && t.substr(0, 1) === "0")
        return "Not a Number !";
    } else if (t.length > 1 && t.substr(0, 1) === "0")
      return "Not a Number !";
    for (let o = 0; o < Math.floor((t.length - (1 + o)) / 3); o++)
      t = t.substring(0, t.length - (4 * o + 3)) + "," + t.substring(t.length - (4 * o + 3));
    return n + t + r;
  } else
    return "0";
}, it = (t, e = "****") => {
  t = String(t);
  const n = t.substring(0, 3), r = t.substring(7, 11);
  return n + e + r;
}, lt = (t, e = "*") => {
  const n = t.length;
  return n <= 2 ? t[0] + e : t[0] + e + t[n - 1];
}, ut = (t, e = "********") => `${t.substr(0, 6)}${e}${t.substr(-4)}`;
function dt(t, e = "Y-M-D h:m:s") {
  const n = ["Y", "M", "D", "h", "m", "s"], r = [], o = new Date(t);
  r.push(o.getFullYear()), r.push(w(o.getMonth() + 1)), r.push(w(o.getDate())), r.push(w(o.getHours())), r.push(w(o.getMinutes())), r.push(w(o.getSeconds()));
  for (const u in r)
    e = e.replace(n[u], r[u] + "");
  return e;
}
function w(t) {
  let e = t.toString();
  return e[1] ? e : "0" + e;
}
const U = () => {
  const t = new Date(), e = t.getFullYear(), n = t.getMonth();
  return n === 0 ? (t.setFullYear(e - 1), t.setMonth(11)) : t.setMonth(n - 1), t.setDate(1), t.setHours(0, 0, 0, 0), t;
}, W = () => {
  const t = new Date();
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}, k = () => {
  const t = new Date();
  t.setDate(t.getDate() - 1), t.setHours(0, 0, 0, 0);
  const e = new Date(t.getTime() + 1e3 * 60 * 60 * 24);
  return e.setHours(23, 59, 59), [t, e];
}, ft = () => [U(), k()[1]], ht = () => [W(), k()[1]], gt = (t, e = "-") => {
  let n = String(t).split("");
  return n.splice(4, 0, e), n.splice(7, 0, e), n.join("");
}, pt = (t = 0, e = 0, n = 0) => {
  const r = new Date();
  return r.setDate(r.getDate() + 1), r.setHours(t, e, n), r;
}, mt = [
  {
    text: "今天",
    value: (() => {
      const t = new Date();
      return [new Date(), t];
    })()
  },
  {
    text: "昨天",
    value: (() => {
      const t = new Date(), e = new Date();
      return t.setTime(e.getTime() - 3600 * 1e3 * 24 * 1), e.setTime(e.getTime() - 3600 * 1e3 * 24 * 1), [e, t];
    })()
  },
  {
    text: "本周",
    value: (() => {
      const t = new Date(), e = new Date();
      var n = e.getDay() || 7;
      return e.setDate(e.getDate() - n + 1), [e, t];
    })()
  },
  {
    text: "上周",
    value: (() => {
      let t = new Date(), e = new Date(t.getTime() - 7 * 24 * 3600 * 1e3), n = new Date(t.getTime() - 7 * 24 * 3600 * 1e3), r = e.getDay(), o = e.getDate() - r + (r === 0 ? -6 : 1), u = new Date(e.setDate(o)), f = new Date(n.setDate(o + 6));
      return [u, f];
    })()
  },
  {
    text: "本月",
    value: (() => {
      const t = new Date(), e = new Date();
      return e.setDate(1), e.setHours(0), e.setSeconds(0), e.setMinutes(0), [e, t];
    })()
  },
  {
    text: "上月",
    value: (() => {
      let t = 864e5, e = new Date(), n = new Date(e.getFullYear(), e.getMonth() - 1, 1), o = new Date(e.getFullYear(), e.getMonth(), 1).getTime() - 1 * t, u = new Date(o);
      return [n, u];
    })()
  },
  {
    text: "最近7天",
    value: (() => {
      const t = new Date(), e = new Date();
      return e.setTime(e.getTime() - 3600 * 1e3 * 24 * 6), [e, t];
    })()
  },
  {
    text: "最近30天",
    value: (() => {
      const t = new Date(), e = new Date();
      return e.setTime(e.getTime() - 3600 * 1e3 * 24 * 30), [e, t];
    })()
  }
], yt = (t) => {
  const e = new Date().setHours(23, 59, 59);
  return t.getTime() > e;
}, xt = (t, e) => {
  let n = new Date(t, e - 1, 1), r = new Date(t, e, 0);
  return [
    n.getDate().toString().padStart(2, "0"),
    r.getDate().toString().padStart(2, "0")
  ];
};
function St(t) {
  const e = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), r = t % 60, o = String(e).padStart(2, "0"), u = String(n).padStart(2, "0"), f = String(r).padStart(2, "0");
  return `${o}:${u}:${f}`;
}
function wt(t) {
  const [e, n, r] = t.split(":").map(Number);
  return e * 3600 + n * 60 + r;
}
var D = {}, _ = {
  get exports() {
    return D;
  },
  set exports(t) {
    D = t;
  }
}, v = {}, Z = {
  get exports() {
    return v;
  },
  set exports(t) {
    v = t;
  }
};
(function() {
  var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = {
    // Bit-wise rotation left
    rotl: function(n, r) {
      return n << r | n >>> 32 - r;
    },
    // Bit-wise rotation right
    rotr: function(n, r) {
      return n << 32 - r | n >>> r;
    },
    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      if (n.constructor == Number)
        return e.rotl(n, 8) & 16711935 | e.rotl(n, 24) & 4278255360;
      for (var r = 0; r < n.length; r++)
        n[r] = e.endian(n[r]);
      return n;
    },
    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var r = []; n > 0; n--)
        r.push(Math.floor(Math.random() * 256));
      return r;
    },
    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(n) {
      for (var r = [], o = 0, u = 0; o < n.length; o++, u += 8)
        r[u >>> 5] |= n[o] << 24 - u % 32;
      return r;
    },
    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(n) {
      for (var r = [], o = 0; o < n.length * 32; o += 8)
        r.push(n[o >>> 5] >>> 24 - o % 32 & 255);
      return r;
    },
    // Convert a byte array to a hex string
    bytesToHex: function(n) {
      for (var r = [], o = 0; o < n.length; o++)
        r.push((n[o] >>> 4).toString(16)), r.push((n[o] & 15).toString(16));
      return r.join("");
    },
    // Convert a hex string to a byte array
    hexToBytes: function(n) {
      for (var r = [], o = 0; o < n.length; o += 2)
        r.push(parseInt(n.substr(o, 2), 16));
      return r;
    },
    // Convert a byte array to a base-64 string
    bytesToBase64: function(n) {
      for (var r = [], o = 0; o < n.length; o += 3)
        for (var u = n[o] << 16 | n[o + 1] << 8 | n[o + 2], f = 0; f < 4; f++)
          o * 8 + f * 6 <= n.length * 8 ? r.push(t.charAt(u >>> 6 * (3 - f) & 63)) : r.push("=");
      return r.join("");
    },
    // Convert a base-64 string to a byte array
    base64ToBytes: function(n) {
      n = n.replace(/[^A-Z0-9+\/]/ig, "");
      for (var r = [], o = 0, u = 0; o < n.length; u = ++o % 4)
        u != 0 && r.push((t.indexOf(n.charAt(o - 1)) & Math.pow(2, -2 * u + 8) - 1) << u * 2 | t.indexOf(n.charAt(o)) >>> 6 - u * 2);
      return r;
    }
  };
  Z.exports = e;
})();
var F = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(t) {
      return F.bin.stringToBytes(unescape(encodeURIComponent(t)));
    },
    // Convert a byte array to a string
    bytesToString: function(t) {
      return decodeURIComponent(escape(F.bin.bytesToString(t)));
    }
  },
  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(t) {
      for (var e = [], n = 0; n < t.length; n++)
        e.push(t.charCodeAt(n) & 255);
      return e;
    },
    // Convert a byte array to a string
    bytesToString: function(t) {
      for (var e = [], n = 0; n < t.length; n++)
        e.push(String.fromCharCode(t[n]));
      return e.join("");
    }
  }
}, T = F;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var P = function(t) {
  return t != null && (C(t) || q(t) || !!t._isBuffer);
};
function C(t) {
  return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
}
function q(t) {
  return typeof t.readFloatLE == "function" && typeof t.slice == "function" && C(t.slice(0, 0));
}
(function() {
  var t = v, e = T.utf8, n = P, r = T.bin, o = function(u, f) {
    u.constructor == String ? f && f.encoding === "binary" ? u = r.stringToBytes(u) : u = e.stringToBytes(u) : n(u) ? u = Array.prototype.slice.call(u, 0) : !Array.isArray(u) && u.constructor !== Uint8Array && (u = u.toString());
    for (var l = t.bytesToWords(u), h = u.length * 8, a = 1732584193, s = -271733879, i = -1732584194, c = 271733878, d = 0; d < l.length; d++)
      l[d] = (l[d] << 8 | l[d] >>> 24) & 16711935 | (l[d] << 24 | l[d] >>> 8) & 4278255360;
    l[h >>> 5] |= 128 << h % 32, l[(h + 64 >>> 9 << 4) + 14] = h;
    for (var g = o._ff, p = o._gg, m = o._hh, y = o._ii, d = 0; d < l.length; d += 16) {
      var $ = a, N = s, R = i, O = c;
      a = g(a, s, i, c, l[d + 0], 7, -680876936), c = g(c, a, s, i, l[d + 1], 12, -389564586), i = g(i, c, a, s, l[d + 2], 17, 606105819), s = g(s, i, c, a, l[d + 3], 22, -1044525330), a = g(a, s, i, c, l[d + 4], 7, -176418897), c = g(c, a, s, i, l[d + 5], 12, 1200080426), i = g(i, c, a, s, l[d + 6], 17, -1473231341), s = g(s, i, c, a, l[d + 7], 22, -45705983), a = g(a, s, i, c, l[d + 8], 7, 1770035416), c = g(c, a, s, i, l[d + 9], 12, -1958414417), i = g(i, c, a, s, l[d + 10], 17, -42063), s = g(s, i, c, a, l[d + 11], 22, -1990404162), a = g(a, s, i, c, l[d + 12], 7, 1804603682), c = g(c, a, s, i, l[d + 13], 12, -40341101), i = g(i, c, a, s, l[d + 14], 17, -1502002290), s = g(s, i, c, a, l[d + 15], 22, 1236535329), a = p(a, s, i, c, l[d + 1], 5, -165796510), c = p(c, a, s, i, l[d + 6], 9, -1069501632), i = p(i, c, a, s, l[d + 11], 14, 643717713), s = p(s, i, c, a, l[d + 0], 20, -373897302), a = p(a, s, i, c, l[d + 5], 5, -701558691), c = p(c, a, s, i, l[d + 10], 9, 38016083), i = p(i, c, a, s, l[d + 15], 14, -660478335), s = p(s, i, c, a, l[d + 4], 20, -405537848), a = p(a, s, i, c, l[d + 9], 5, 568446438), c = p(c, a, s, i, l[d + 14], 9, -1019803690), i = p(i, c, a, s, l[d + 3], 14, -187363961), s = p(s, i, c, a, l[d + 8], 20, 1163531501), a = p(a, s, i, c, l[d + 13], 5, -1444681467), c = p(c, a, s, i, l[d + 2], 9, -51403784), i = p(i, c, a, s, l[d + 7], 14, 1735328473), s = p(s, i, c, a, l[d + 12], 20, -1926607734), a = m(a, s, i, c, l[d + 5], 4, -378558), c = m(c, a, s, i, l[d + 8], 11, -2022574463), i = m(i, c, a, s, l[d + 11], 16, 1839030562), s = m(s, i, c, a, l[d + 14], 23, -35309556), a = m(a, s, i, c, l[d + 1], 4, -1530992060), c = m(c, a, s, i, l[d + 4], 11, 1272893353), i = m(i, c, a, s, l[d + 7], 16, -155497632), s = m(s, i, c, a, l[d + 10], 23, -1094730640), a = m(a, s, i, c, l[d + 13], 4, 681279174), c = m(c, a, s, i, l[d + 0], 11, -358537222), i = m(i, c, a, s, l[d + 3], 16, -722521979), s = m(s, i, c, a, l[d + 6], 23, 76029189), a = m(a, s, i, c, l[d + 9], 4, -640364487), c = m(c, a, s, i, l[d + 12], 11, -421815835), i = m(i, c, a, s, l[d + 15], 16, 530742520), s = m(s, i, c, a, l[d + 2], 23, -995338651), a = y(a, s, i, c, l[d + 0], 6, -198630844), c = y(c, a, s, i, l[d + 7], 10, 1126891415), i = y(i, c, a, s, l[d + 14], 15, -1416354905), s = y(s, i, c, a, l[d + 5], 21, -57434055), a = y(a, s, i, c, l[d + 12], 6, 1700485571), c = y(c, a, s, i, l[d + 3], 10, -1894986606), i = y(i, c, a, s, l[d + 10], 15, -1051523), s = y(s, i, c, a, l[d + 1], 21, -2054922799), a = y(a, s, i, c, l[d + 8], 6, 1873313359), c = y(c, a, s, i, l[d + 15], 10, -30611744), i = y(i, c, a, s, l[d + 6], 15, -1560198380), s = y(s, i, c, a, l[d + 13], 21, 1309151649), a = y(a, s, i, c, l[d + 4], 6, -145523070), c = y(c, a, s, i, l[d + 11], 10, -1120210379), i = y(i, c, a, s, l[d + 2], 15, 718787259), s = y(s, i, c, a, l[d + 9], 21, -343485551), a = a + $ >>> 0, s = s + N >>> 0, i = i + R >>> 0, c = c + O >>> 0;
    }
    return t.endian([a, s, i, c]);
  };
  o._ff = function(u, f, l, h, a, s, i) {
    var c = u + (f & l | ~f & h) + (a >>> 0) + i;
    return (c << s | c >>> 32 - s) + f;
  }, o._gg = function(u, f, l, h, a, s, i) {
    var c = u + (f & h | l & ~h) + (a >>> 0) + i;
    return (c << s | c >>> 32 - s) + f;
  }, o._hh = function(u, f, l, h, a, s, i) {
    var c = u + (f ^ l ^ h) + (a >>> 0) + i;
    return (c << s | c >>> 32 - s) + f;
  }, o._ii = function(u, f, l, h, a, s, i) {
    var c = u + (l ^ (f | ~h)) + (a >>> 0) + i;
    return (c << s | c >>> 32 - s) + f;
  }, o._blocksize = 16, o._digestsize = 16, _.exports = function(u, f) {
    if (u == null)
      throw new Error("Illegal argument " + u);
    var l = t.wordsToBytes(o(u, f));
    return f && f.asBytes ? l : f && f.asString ? r.bytesToString(l) : t.bytesToHex(l);
  };
})();
const Dt = async (t) => new Promise((e) => setTimeout(e, t * 1e3)), A = (t, e = "%") => {
  const n = [];
  return t.split(e).map((r) => {
    if (r) {
      const o = r.replace("u", "0x");
      o.length > 6 ? n.push(String.fromCharCode(+o.substr(0, 6)), decodeURIComponent(o.slice(6))) : o.length === 6 ? n.push(String.fromCharCode(+o)) : n.push(decodeURIComponent(o));
    }
  }), n.join("");
}, vt = (t) => t.includes("%u") ? A(t, "%") : t.includes("\\u") ? A(t, "\\") : decodeURIComponent(t), Ft = (t, e = {}) => {
  if (H(t))
    try {
      const n = JSON.parse(t);
      return B(n) || Array.isArray(n) ? n : e;
    } catch {
      return e;
    }
  return t;
}, Mt = (t) => t.indexOf("http") !== -1 ? t : `//${t}`, Tt = () => Math.random().toString(36).slice(8), At = () => {
  let t = "";
  const e = "xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx";
  for (let n = 0, r = e.length; n < r; n += 1) {
    const o = e[n], u = Math.random() * 16 | 0, f = o === "x" ? u : o === "y" ? u & 3 | 8 : o;
    t += f.toString(16);
  }
  return t;
};
function Bt() {
  try {
    const t = "bluesyoung_web@163.com <canvas> 1.0", e = document.createElement("canvas");
    e.setAttribute("width", "220"), e.setAttribute("height", "30");
    const n = e.getContext("2d");
    n.textBaseline = "top", n.font = "14px 'Arial'", n.textBaseline = "alphabetic", n.fillStyle = "#f60", n.fillRect(125, 1, 62, 20), n.fillStyle = "#069", n.fillText(t, 2, 15), n.fillStyle = "rgba(102, 204, 0, 0.7)", n.fillText(t, 4, 17);
    const r = e.toDataURL().split(",")[1], o = atob(r);
    let u = "";
    for (let f = 0; f < o.length; f++) {
      const l = o.charCodeAt(f);
      l <= 15 && (u += "0"), u += l.toString(16).toLocaleUpperCase();
    }
    return D(u).toUpperCase();
  } catch (t) {
    throw console.log("🚀 ~ getFingerprint ~ error:", t), new Error("getFingerprint error, your envrionment is not support");
  }
}
const Ht = (t) => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t), Et = (t) => /^1[23456789]\d{9}$/.test(t), kt = (t) => /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(t), Ct = (t) => /ws(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(t), bt = (t) => !/Invalid|NaN/.test(new Date(t).toString()), $t = (t) => /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(new Date(t).toString()), Nt = (t) => /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t + ""), Rt = (t) => /^\d+$/.test(t + ""), Ot = (t) => /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(t + ""), It = (t) => {
  const e = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/, n = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  return t.length === 7 ? n.test(t) : t.length === 8 ? e.test(t) : !1;
}, Lt = (t) => /^[\u4e00-\u9fa5]+$/gi.test(t), Ut = (t) => /^[a-zA-Z]+$/.test(t), Wt = (t) => /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(t), _t = (t) => {
  if (H(t))
    try {
      const e = JSON.parse(t);
      return !!(B(e) || Array.isArray(e));
    } catch {
      return !1;
    }
  return !1;
}, Zt = (t) => /^-?\d{1,3}(,\d{3})*(\.\d+)?$/.test(t), Pt = () => /MicroMessenger/gim.test(navigator.userAgent), qt = () => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i), zt = () => /Mac OS X/i.test(navigator.userAgent), Gt = () => {
  const t = navigator.userAgent;
  return t.indexOf("Android") > -1 || t.indexOf("Adr") > -1;
}, z = () => {
  const t = document.documentElement.scrollTop || document.body.scrollTop;
  t > 0 && (window.requestAnimationFrame(z), window.scrollTo(0, t - t / 8));
}, Jt = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
}, Yt = (t) => {
  var e;
  (e = document.querySelector(t)) == null || e.scrollIntoView({
    behavior: "smooth"
  });
}, Xt = () => {
  let t = 0, e = 0;
  return t = (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth, document.body.clientHeight && document.documentElement.clientHeight ? e = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight : e = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight, [t, e];
}, Kt = async () => {
  let t = document.body;
  t.requestFullscreen ? await t.requestFullscreen() : t.mozRequestFullScreen ? await t.mozRequestFullScreen() : t.msRequestFullscreen ? await t.msRequestFullscreen() : t.webkitRequestFullscreen && await t.webkitRequestFullScreen();
}, jt = async () => {
  document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
};
function S(t) {
  ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Tab"].includes(t.key) && t.preventDefault();
}
function b(t) {
  t.preventDefault();
}
const Vt = (t = window) => {
  t.addEventListener("wheel", b, { passive: !1 }), t.addEventListener("keyup", S), t.addEventListener("keydown", S), t.addEventListener("keypress", S);
}, Qt = (t = window) => {
  t.removeEventListener("wheel", b), t.removeEventListener("keyup", S), t.removeEventListener("keydown", S), t.removeEventListener("keypress", S);
}, te = () => "#" + (Math.random() * 1048575 * 1e6).toString(16).slice(0, 6), ee = (t, e, n) => ((t << 16) + (e << 8) + n).toString(16).padStart(6, "0"), ne = (t) => {
  let e = !1, n = t.slice(t.startsWith("#") ? 1 : 0);
  return n.length === 3 ? n = [...n].map((r) => r + r).join("") : n.length === 8 && (e = !0), n = parseInt(n, 16), `rgb${e ? "a" : ""}(${n >>> (e ? 24 : 16)}, ${(n & (e ? 16711680 : 65280)) >>> (e ? 16 : 8)}, ${(n & (e ? 65280 : 255)) >>> (e ? 8 : 0)}${e ? `, ${n & 255}` : ""})`;
}, re = (t) => "#" + t.slice(t.length === 4 ? 1 : 0).split("").map((e) => e + e).join(""), oe = (t) => {
  var o;
  const [e, n, r] = ((o = t.match(/\d+/g)) == null ? void 0 : o.map((u) => +u)) ?? [0, 0, 0];
  return { red: e, green: n, blue: r };
}, se = (t) => {
  var e;
  return ((e = t.match(/\d+/g)) == null ? void 0 : e.map((n) => +n)) ?? [0, 0, 0];
}, ce = (t, e, n) => {
  t /= 255, e /= 255, n /= 255;
  const r = Math.max(t, e, n), o = r - Math.min(t, e, n), u = o === 0 ? 0 : o && r === t ? (e - n) / o : r === e ? 2 + (n - t) / o : 4 + (t - e) / o;
  return [60 * (u < 0 ? u + 6 : u), r && o / r * 100, r * 100];
}, ae = (t, e, n) => {
  e /= 100, n /= 100;
  const r = (u) => (u + t / 60) % 6, o = (u) => n * (1 - e * Math.max(0, Math.min(r(u), 4 - r(u), 1)));
  return [255 * o(5), 255 * o(3), 255 * o(1)];
}, ie = (t, e, n) => {
  t /= 255, e /= 255, n /= 255;
  const r = Math.max(t, e, n), o = r - Math.min(t, e, n), u = o ? r === t ? (e - n) / o : r === e ? 2 + (n - t) / o : 4 + (t - e) / o : 0;
  return [
    60 * u < 0 ? 60 * u + 360 : 60 * u,
    100 * (o ? r <= 0.5 ? o / (2 * r - o) : o / (2 - (2 * r - o)) : 0),
    100 * (2 * r - o) / 2
  ];
}, le = (t, e, n) => {
  e /= 100, n /= 100;
  const r = (f) => (f + t / 30) % 12, o = e * Math.min(n, 1 - n), u = (f) => n - o * Math.max(-1, Math.min(r(f) - 3, Math.min(9 - r(f), 1)));
  return [255 * u(0), 255 * u(8), 255 * u(4)];
};
class G {
}
class ue extends G {
  /**
   * 存储
   * @param key 键名
   * @param value 键值
   * @param exp 过期时间(天)，默认 1 天后
   */
  set(e, n, r = 1) {
    localStorage.setItem(
      e,
      JSON.stringify({
        exp: new Date(Date.now() + 1e3 * 3600 * 24 * r).getTime(),
        data: n
      })
    );
  }
  remove(e) {
    localStorage.removeItem(e);
  }
  get(e) {
    const n = localStorage.getItem(e);
    if (n)
      try {
        const { exp: r, data: o } = JSON.parse(n);
        if (Date.now() < r)
          return o;
        this.remove(e);
        return;
      } catch {
        this.remove(e);
        return;
      }
  }
}
export {
  ae as HSBToRGB,
  le as HSLToRGB,
  ce as RGBToHSB,
  ie as RGBToHSL,
  ee as RGBToHex,
  ue as YoungLocalStorage,
  G as YoungStorage,
  st as deepClone,
  Vt as disableScroll,
  Qt as enableScroll,
  vt as encodedStrParse,
  jt as exitFullscreen,
  re as extendHex,
  I as fen2yuan,
  at as fen2yuanWithCurrency,
  L as formatCurrency,
  dt as formatDate,
  Mt as formatUrl,
  Xt as getClientHeight,
  xt as getDateRange,
  Bt as getFingerprint,
  ne as hexToRGB,
  ut as idMasaike,
  Gt as isAndroid,
  M as isArray,
  Q as isArrayBuffer,
  Y as isBoolean,
  Lt as isChinese,
  Zt as isCurrencyStr,
  bt as isDate,
  Nt as isDecimal,
  yt as isDisabledDate,
  Ht as isEmail,
  et as isFunction,
  kt as isHttpUrl,
  $t as isISODate,
  Ot as isIdCard,
  Rt as isInteger,
  _t as isJsonStr,
  Wt as isLandline,
  Ut as isLetter,
  It as isLicensePlate,
  zt as isMacOS,
  X as isMap,
  Et as isMobile,
  rt as isNull,
  J as isNumber,
  B as isObject,
  tt as isRegExp,
  j as isSet,
  H as isString,
  nt as isSymbol,
  ot as isUndefined,
  Pt as isWeChat,
  K as isWeakMap,
  V as isWeakSet,
  Ct as isWebSocketUrl,
  qt as isiOS,
  U as lastMonthDay,
  D as md5,
  lt as nameMasaike,
  pt as nextDay,
  E as polyfillNumber,
  te as randomHexColorCode,
  Tt as randomId,
  At as randomUUID,
  k as recentDay,
  ft as recentMonth,
  Ft as safeJsonParse,
  Jt as scrollToBottom,
  z as scrollToTop,
  St as secondsToTime,
  mt as shortcuts,
  Dt as sleep,
  Yt as smoothScroll,
  it as telMasaike,
  ht as thisMonth,
  W as thisMonthDay,
  wt as timeToSeconds,
  Kt as toFullScreen,
  se as toRGBArray,
  oe as toRGBObject,
  gt as ymdParse,
  ct as yuan2fen
};
//# sourceMappingURL=index.es.js.map
