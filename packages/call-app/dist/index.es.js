var h = Object.defineProperty;
var m = (t, e, o) => e in t ? h(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var a = (t, e, o) => (m(t, typeof e != "symbol" ? e + "" : e, o), o);
function g(t) {
  let e;
  if (t.nodeName === "SELECT")
    t.focus(), e = t.value;
  else if (t.nodeName === "INPUT" || t.nodeName === "TEXTAREA") {
    var o = t.hasAttribute("readonly");
    o || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), o || t.removeAttribute("readonly"), e = t.value;
  } else {
    t.hasAttribute("contenteditable") && t.focus();
    const r = window.getSelection(), i = document.createRange();
    i.selectNodeContents(t), r.removeAllRanges(), r.addRange(i), e = r.toString();
  }
  return e;
}
function y(t, e) {
  let o, r, i = !1;
  e = e || {}, o = e.debug || !1;
  try {
    const n = document.documentElement.getAttribute("dir") == "rtl";
    r = document.createElement("textarea"), r.style.fontSize = "12pt", r.style.border = "0", r.style.padding = "0", r.style.margin = "0", r.style.position = "absolute", r.style[n ? "right" : "left"] = "-9999px";
    let s = window.pageYOffset || document.documentElement.scrollTop;
    if (r.style.top = `${s}px`, r.setAttribute("readonly", ""), r.value = t, document.body.appendChild(r), g(r), !document.execCommand("copy"))
      throw new Error("copy command was unsuccessful");
    i = !0;
  } catch (n) {
    o && console.error("unable to copy using execCommand: ", n), o && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData("text", t), i = !0;
    } catch (s) {
      o && console.error("unable to copy using clipboardData: ", s);
    }
  } finally {
    r && document.body.removeChild(r);
  }
  return i;
}
function c(t) {
  return function(e) {
    return Object.prototype.toString.call(e) === "[object " + t + "]";
  };
}
function x(t, e) {
  for (let o = 0, r = t.length; o < r && e.call(t, t[o], o) !== !1; o++)
    ;
}
class v {
  constructor(e) {
    this._rules = e;
  }
  _detect(e, o, r) {
    const i = c("Function")(o) ? o.call(null, r) : o;
    if (!i)
      return null;
    const n = {
      name: e,
      version: "0",
      codename: ""
    };
    if (i === !0)
      return n;
    if (c("String")(i)) {
      if (r.indexOf(i) !== -1)
        return n;
    } else {
      if (c("Object")(i))
        return i.hasOwnProperty("version") && (n.version = i.version), n;
      if (c("RegExp")(i)) {
        const s = i.exec(r);
        if (s)
          return s.length >= 2 && s[1] && (n.version = s[1].replace(/_/g, ".")), n;
      }
    }
  }
  _parseItem(e, o, r, i) {
    let n = this, s = {
      name: "na",
      version: "0"
    };
    x(o, function(u) {
      const l = n._detect(u[0], u[1], e);
      if (l)
        return s = l, !1;
    }), r.call(i, s.name, s.version);
  }
  parse(e) {
    e = (e || "").toLowerCase();
    const o = {};
    return this._parseItem(e, this._rules.os, function(r, i) {
      const n = parseFloat(i);
      o.os = {
        name: r,
        version: n,
        fullVersion: i
      }, o.os[r] = n;
    }, o), this._parseItem(e, this._rules.browser, function(r, i) {
      let n = i;
      const s = parseFloat(i);
      o.browser = {
        name: r,
        version: s,
        fullVersion: i,
        mode: parseFloat(n),
        fullMode: n
      }, o.browser[r] = s;
    }, o), o;
  }
}
const _ = [
  ["ios", function(t) {
    return /\bcpu(?: iphone)? os /.test(t) ? /\bcpu(?: iphone)? os ([0-9._]+)/ : t.indexOf("iph os ") !== -1 ? /\biph os ([0-9_]+)/ : /\bios\b/;
  }],
  ["android", function(t) {
    return t.indexOf("android") >= 0 ? /\bandroid[ \/-]?([0-9.x]+)?/ : t.indexOf("adr") >= 0 ? t.indexOf("mqqbrowser") >= 0 ? /\badr[ ]\(linux; u; ([0-9.]+)?/ : /\badr(?:[ ]([0-9.]+))?/ : "android";
  }],
  ["wp", function(t) {
    return t.indexOf("windows phone ") !== -1 ? /\bwindows phone (?:os )?([0-9.]+)/ : t.indexOf("xblwp") !== -1 ? /\bxblwp([0-9.]+)/ : t.indexOf("zunewp") !== -1 ? /\bzunewp([0-9.]+)/ : "windows phone";
  }],
  ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/],
  ["chromeos", /\bcros i686 ([0-9.]+)/],
  ["linux", "linux"],
  ["windowsce", /\bwindows ce(?: ([0-9.]+))?/]
], O = [
  ["micromessenger", /\bmicromessenger\/([\d.]+)/],
  ["qq", /\bqq/i],
  ["qzone", /qzone\/.*_qz_([\d.]+)/i],
  ["qqbrowser", /\bm?qqbrowser\/([0-9.]+)/],
  ["tt", /\btencenttraveler ([0-9.]+)/],
  ["weibo", /weibo__([0-9.]+)/],
  ["uc", function(t) {
    return t.indexOf("ucbrowser/") >= 0 ? /\bucbrowser\/([0-9.]+)/ : t.indexOf("ubrowser/") >= 0 ? /\bubrowser\/([0-9.]+)/ : /\buc\/[0-9]/.test(t) ? /\buc\/([0-9.]+)/ : t.indexOf("ucweb") >= 0 ? /\bucweb([0-9.]+)?/ : /\b(?:ucbrowser|uc)\b/;
  }],
  ["360", function(t) {
    return t.indexOf("360 aphone browser") !== -1 ? /\b360 aphone browser \(([^\)]+)\)/ : /\b360(?:se|ee|chrome|browser)\b/;
  }],
  [
    "baidu",
    function(t) {
      let e = 0, o;
      return / baiduboxapp\//i.test(t) ? ((o = /([\d+.]+)_(?:diordna|enohpi)_/.exec(t)) ? (o = o[1].split("."), e = o.reverse().join(".")) : (o = /baiduboxapp\/([\d+.]+)/.exec(t)) && (e = o[1]), {
        version: e
      }) : !1;
    }
  ],
  ["baidubrowser", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],
  ["bdminivideo", /bdminivideo\/([0-9.]+)/],
  ["sogou", function(t) {
    return t.indexOf("sogoumobilebrowser") >= 0 ? /sogoumobilebrowser\/([0-9.]+)/ : t.indexOf("sogoumse") >= 0 ? !0 : / se ([0-9.x]+)/;
  }],
  ["ali-ap", function(t) {
    return t.indexOf("aliapp") > 0 ? /\baliapp\(ap\/([0-9.]+)\)/ : /\balipayclient\/([0-9.]+)\b/;
  }],
  ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
  ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
  ["tao", /\btaobrowser\/([0-9.]+)/],
  ["mi", /\bmiuibrowser\/([0-9.]+)/],
  ["oppo", /\boppobrowser\/([0-9.]+)/],
  ["vivo", /\bvivobrowser\/([0-9.]+)/],
  ["meizu", /\bmzbrowser\/([0-9.]+)/],
  ["nokia", /\bnokiabrowser\/([0-9.]+)/],
  ["samsung", /\bsamsungbrowser\/([0-9.]+)/],
  ["maxthon", /\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/],
  ["opera", function(t) {
    const e = /\bopera.+version\/([0-9.ab]+)/, o = /\bopr\/([0-9.]+)/;
    return e.test(t) ? e : o;
  }],
  ["edge", /edge\/([0-9.]+)/],
  ["firefox", /\bfirefox\/([0-9.ab]+)/],
  ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
  ["android", function(t) {
    if (t.indexOf("android") !== -1)
      return /\bversion\/([0-9.]+(?: beta)?)/;
  }],
  ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
  ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/]
], q = new v({
  os: _,
  browser: O
}), A = navigator.userAgent + " " + navigator.appVersion + " " + navigator.vendor, p = q.parse(A);
function d(t) {
  return t !== null && typeof t == "object";
}
function b(t, e, o = ".", r) {
  if (!d(e))
    return b(t, {}, o, r);
  const i = Object.assign({}, e);
  for (const n in t) {
    if (n === "__proto__" || n === "constructor")
      continue;
    const s = t[n];
    s != null && (r && r(i, n, s, o) || (Array.isArray(s) && Array.isArray(i[n]) ? i[n] = [...s, ...i[n]] : d(s) && d(i[n]) ? i[n] = b(
      s,
      i[n],
      (o ? `${o}.` : "") + n.toString(),
      r
    ) : i[n] = s));
  }
  return i;
}
function E(t) {
  return (...e) => e.reduce((o, r) => b(o, r, "", t), {});
}
const F = E(), k = p.os.name === "ios", f = p.browser.name === "micromessenger";
var w = /* @__PURE__ */ ((t) => (t.wechat = "weixin://", t))(w || {});
const S = {
  timeout: 2500,
  mask: {
    wechat: () => null
  },
  startCall: () => console.log("---\u5F00\u59CB\u5524\u7AEF---"),
  callFail: () => console.log("---\u5524\u8D77\u5931\u8D25\uFF0C\u8DF3\u8F6C\u4E0B\u8F7D---")
};
class T {
  constructor(e, o = {}) {
    a(this, "scheme");
    a(this, "download");
    a(this, "info");
    a(this, "options");
    this.options = F(o, S), e.quickType ? (this.scheme = e.quickType, this.info = (e == null ? void 0 : e.copyInfo) || "") : this.generateScheme(e);
  }
  generateScheme(e) {
    var n, s, u;
    let o = "", r = "", i = "(\u590D\u5236\u6B64\u6D88\u606F\u6253\u5F00app)|";
    if (k ? (e.ios_shceme.includes("://") ? o = e.ios_shceme : o = `${e.ios_shceme}://`, r = ((n = e == null ? void 0 : e.download) == null ? void 0 : n.ios) || e.landpage) : (e.android_shceme.includes("://") ? o = e.android_shceme : o = `${e.android_shceme}://`, r = ((s = e == null ? void 0 : e.download) == null ? void 0 : s.yyb) || e.landpage, f && ((u = e == null ? void 0 : e.download) == null ? void 0 : u.yyb) && (r = e.download.yyb)), e.path && (o += e.path), e.params) {
      const l = new URLSearchParams(e.params).toString();
      o += `?${l}`, i += l;
    }
    this.scheme = o, this.download = r, this.info = i;
  }
  call() {
    const { mask: e, startCall: o } = this.options;
    if (f && e.wechat) {
      e.wechat();
      return;
    }
    y(this.info), o == null || o(), window.location.href = this.scheme, this.fallback();
  }
  fallback() {
    const e = setTimeout(() => {
      this.options.callFail(), this.download && (window.location.href = this.download);
    }, this.options.timeout);
    setTimeout(() => {
      window.addEventListener("blur", () => clearTimeout(e));
    }, this.options.timeout - 500);
  }
}
a(T, "QuickCall", w);
export {
  T as default
};
//# sourceMappingURL=index.es.js.map
