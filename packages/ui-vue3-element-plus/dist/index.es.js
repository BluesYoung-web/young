var Ds = Object.defineProperty;
var Ns = (e, t, r) => t in e ? Ds(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Nn = (e, t, r) => (Ns(e, typeof t != "symbol" ? t + "" : t, r), r);
import { defineComponent as vn, ref as ir, onActivated as Is, nextTick as Zt, watchEffect as Sa, createVNode as Ue, mergeProps as Lt, Fragment as zn, computed as D0, Teleport as ks, isVNode as Ps, initDirectivesForSSR as Ls, createApp as Bs, ssrContextKey as Aa, warn as Qt, Static as Ms, Comment as bs, Text as Us, ssrUtils as Fa } from "vue";
import { deepClone as st, randomId as Ws } from "@bluesyoung/utils";
import { ElTable as Hs, ElTableColumn as Vs, ElTooltip as Gs, ElPagination as Xs, ElDialog as js, ElButton as N0, ElMessageBox as ya, ElSelect as $s, ElOption as zs, ElLoadingService as Ks, ElMessage as Ys } from "element-plus";
import { useIntersectionObserver as Js } from "@vueuse/core";
const M2 = vn({
  props: {
    tableData: {
      type: Object,
      required: !0
    },
    tableHead: {
      type: Object,
      required: !0
    },
    tableHeight: {
      type: Number,
      default: 600
    }
  },
  emits: ["sort-change"],
  setup(e, {
    emit: t,
    attrs: r,
    slots: n
  }) {
    const a = ir(null);
    Is(() => {
      Zt(() => {
        a.value.doLayout();
      });
    });
    const i = ir([]), s = ir([]);
    return Sa(() => {
      const f = e.tableData, l = e.tableHead, o = f.length;
      Zt(() => {
        s.value = l.filter((u) => !u.only_export);
        const c = 50;
        if (o <= c)
          i.value = st(f);
        else {
          const {
            elArr: u,
            load: h
          } = Zs(i, ir(f), c);
          let p = 0;
          i.value = f.slice(p, c), Zt(() => {
            u.value = a.value.$el.querySelector("tbody").children, h();
          });
        }
      });
    }), () => Ue(Hs, Lt(r, {
      ref: a,
      data: i.value,
      style: "width: 100%",
      height: e.tableHeight,
      onSortChange: (f) => t("sort-change", f)
    }), {
      default: () => {
        var f, l;
        return [s.value.map((o, c) => Ue(Vs, {
          key: c,
          prop: o.prop,
          label: o.label,
          width: o.width || "",
          sortable: o.sortable || !1,
          fixed: o.fixed || !1,
          align: o.aligin || "left"
        }, {
          header: (u) => s.value[u.$index].tool_content ? Ue(zn, null, [Ue("span", null, [u.column.label]), Ue(Gs, {
            placement: "bottom"
          }, {
            content: () => s.value[u.$index].tool_content
          })]) : Ue("span", null, [u.column.label]),
          default: (u) => o.render ? o.render(u.row) : Ue("span", null, [u.row[o.prop]])
        })), (f = n.switch) == null ? void 0 : f.call(n), (l = n.operate) == null ? void 0 : l.call(n)];
      }
    });
  }
}), In = {
  type: Number,
  required: !0
}, b2 = vn({
  props: {
    total: In,
    page: In,
    limit: In,
    pageSizes: {
      type: Object,
      default: () => [10, 20, 30, 50]
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: !0
    },
    autoScroll: {
      type: Boolean,
      default: !0
    },
    hidden: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["page-change", "update:page", "update:limit"],
  setup(e, {
    emit: t,
    attrs: r
  }) {
    const n = (i) => {
      t("update:page", 1), t("update:limit", i), t("page-change");
    }, a = (i) => {
      t("update:page", i), t("page-change");
    };
    return () => Ue("div", {
      style: "background: white; padding-top: 20px;"
    }, [Ue(Xs, Lt(r, {
      background: e.background,
      currentPage: e.page,
      pageSize: e.limit,
      layout: e.layout,
      pageSizes: e.pageSizes,
      total: e.total,
      "onUpdate:page-size": (i) => n(i),
      "onUpdate:current-page": (i) => a(i)
    }), null)]);
  }
}), U2 = vn({
  props: {
    modelValue: Boolean,
    realTitle: String,
    sureText: {
      type: String,
      default: "\u786E\u5B9A"
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    showSure: {
      type: Boolean,
      default: !0
    },
    showCancel: {
      type: Boolean,
      default: !0
    },
    isAdd: Boolean,
    isEdit: Boolean,
    isMore: Boolean,
    sureFn: Function
  },
  emits: ["sure", "clear", "update:modelValue"],
  setup(e, {
    emit: t,
    attrs: r,
    slots: n
  }) {
    const a = D0(() => {
      let l = "\u65B0\u5EFA";
      return e.isEdit && (l = "\u7F16\u8F91"), e.isMore && (l = "\u8BE6\u60C5"), l;
    }), i = D0({
      get: () => e.isAdd || e.isMore || e.isEdit,
      set: (l) => null
    }), s = async () => {
      if (!(e.sureFn && await e.sureFn() === !1)) {
        if (e.isMore) {
          t("clear");
          return;
        }
        t("update:modelValue", !1), t("sure");
      }
    }, f = () => {
      if (e.isMore || !e.showCancel) {
        t("clear"), t("update:modelValue", !1);
        return;
      }
      ya.confirm("\u6570\u636E\u672A\u4FDD\u5B58\uFF0C\u5173\u95ED\u5C06\u4E22\u5931\u6570\u636E\uFF0C\u786E\u8BA4\u5173\u95ED\uFF1F", "\u63D0\u793A").then(() => {
        t("update:modelValue", !1), t("clear");
      }).catch(() => null);
    };
    return () => Ue(ks, {
      to: "body"
    }, {
      default: () => [Ue(js, Lt(r, {
        modelValue: e.modelValue || i.value,
        title: e.realTitle || a.value,
        closeOnClickModal: !1,
        closeOnPressEscape: !1,
        beforeClose: f
      }), {
        default: () => {
          var l;
          return (l = n.body) == null ? void 0 : l.call(n);
        },
        footer: () => {
          var l, o, c;
          return Ue(zn, null, [(l = n.button) == null ? void 0 : l.call(n), e.showCancel && Ue(N0, {
            onClick: () => f()
          }, {
            default: () => [e.cancelText]
          }), (o = n.step1) == null ? void 0 : o.call(n), (c = n.step2) == null ? void 0 : c.call(n), e.showSure && Ue(N0, {
            type: "primary",
            onClick: () => s()
          }, {
            default: () => [e.sureText]
          })]);
        }
      })]
    });
  }
});
function qs(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ps(e);
}
const W2 = vn({
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  setup(e, {
    attrs: t
  }) {
    const r = Ws();
    return () => {
      let n;
      return Ue($s, t, qs(n = e.options.map((a, i) => Ue(zs, Lt(a, {
        key: i + r
      }), null))) ? n : {
        default: () => [n]
      });
    };
  }
}), Zs = (e, t, r = 10, n = ir(!1)) => {
  const a = ir([]), i = ir(!1), s = ir(1), f = () => {
    const { stop: l } = Js(
      a.value[e.value.length - 1],
      ([{ isIntersecting: o }]) => {
        o && (i.value = o, l());
      }
    );
  };
  return Sa(async () => {
    if (!n.value && i.value) {
      if (e.value.length === t.value.length)
        return;
      s.value++;
      const l = t.value.slice(r * (s.value - 1), r * s.value);
      if (l.length === 0)
        return;
      e.value.push(...l), i.value = !1, await Zt(), f();
    }
  }), {
    elArr: a,
    touchEndEl: i,
    page: s,
    load: f
  };
}, H2 = (e, { addCbk: t, modCbk: r, delCbk: n, cpEffect: a, cgEffect: i, disableclear: s }, f = "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\uFF1F") => {
  const l = ir(!1), o = ir(!1), c = ir(!1), u = ir(st(e)), h = ir(), p = async () => await new Promise((B) => {
    var z;
    (z = h.value) == null || z.validate(async (Q) => {
      Q && B(!0);
    }).catch((Q) => {
      B(!1);
    });
  }), _ = () => {
    l.value = !1, o.value = !1, c.value = !1, u.value = st(e);
  };
  return {
    isAdd: l,
    isEdit: o,
    isMore: c,
    clear: _,
    edit: (A) => {
      a == null || a(A), u.value = st(A), o.value = !0;
    },
    more: (A) => {
      a == null || a(A), u.value = st(A), c.value = !0;
    },
    form: u,
    del: (A) => {
      ya.confirm(f, "\u63D0\u793A", {
        type: "warning"
      }).then(async () => {
        await (n == null ? void 0 : n(A)), i == null || i();
      }).catch(() => null);
    },
    sure: async () => {
      if (l.value) {
        if (await (t == null ? void 0 : t()) === !1)
          return;
      } else if (await (r == null ? void 0 : r()) === !1)
        return;
      !s && _(), i == null || i();
    },
    formRef: h,
    validForm: p
  };
};
function mn(e, t) {
  const r = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let a = 0; a < n.length; a++)
    r[n[a]] = !0;
  return t ? (a) => !!r[a.toLowerCase()] : (a) => !!r[a];
}
function Ca(e) {
  if (Kn(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], a = gr(n) ? tf(n) : Ca(n);
      if (a)
        for (const i in a)
          t[i] = a[i];
    }
    return t;
  } else {
    if (gr(e))
      return e;
    if (Yn(e))
      return e;
  }
}
const Qs = /;(?![^(]*\))/g, ef = /:([^]+)/, rf = /\/\*.*?\*\//gs;
function tf(e) {
  const t = {};
  return e.replace(rf, "").split(Qs).forEach((r) => {
    if (r) {
      const n = r.split(ef);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function nf(e) {
  let t = "";
  if (!e || gr(e))
    return t;
  for (const r in e) {
    const n = e[r], a = r.startsWith("--") ? r : wf(r);
    (gr(n) || typeof n == "number") && (t += `${a}:${n};`);
  }
  return t;
}
function Oa(e) {
  let t = "";
  if (gr(e))
    t = e;
  else if (Kn(e))
    for (let r = 0; r < e.length; r++) {
      const n = Oa(e[r]);
      n && (t += n + " ");
    }
  else if (Yn(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const af = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", sf = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr", ff = /* @__PURE__ */ mn(af), of = /* @__PURE__ */ mn(sf), lf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", cf = /* @__PURE__ */ mn(lf + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function hf(e) {
  return !!e || e === "";
}
const uf = /[>/="'\u0009\u000a\u000c\u0020]/, kn = {};
function xf(e) {
  if (kn.hasOwnProperty(e))
    return kn[e];
  const t = uf.test(e);
  return t && console.error(`unsafe attribute name: ${e}`), kn[e] = !t;
}
const df = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
}, pf = /["'&<>]/;
function Br(e) {
  const t = "" + e, r = pf.exec(t);
  if (!r)
    return t;
  let n = "", a, i, s = 0;
  for (i = r.index; i < t.length; i++) {
    switch (t.charCodeAt(i)) {
      case 34:
        a = "&quot;";
        break;
      case 38:
        a = "&amp;";
        break;
      case 39:
        a = "&#39;";
        break;
      case 60:
        a = "&lt;";
        break;
      case 62:
        a = "&gt;";
        break;
      default:
        continue;
    }
    s !== i && (n += t.slice(s, i)), s = i + 1, n += a;
  }
  return s !== i ? n + t.slice(s, i) : n;
}
const vf = /^-?>|<!--|-->|--!>|<!-$/g;
function mf(e) {
  return e.replace(vf, "");
}
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const I0 = () => {
}, gf = /^on[^a-z]/, _f = (e) => gf.test(e), Kn = Array.isArray, Vn = (e) => typeof e == "function", gr = (e) => typeof e == "string", Yn = (e) => e !== null && typeof e == "object", Jn = (e) => Yn(e) && Vn(e.then) && Vn(e.catch), Tf = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, Ef = /\B([A-Z])/g, wf = Tf((e) => e.replace(Ef, "-$1").toLowerCase()), Sf = mn(",key,ref,innerHTML,textContent,ref_key,ref_for");
function Af(e, t) {
  let r = "";
  for (const n in e) {
    if (Sf(n) || _f(n) || t === "textarea" && n === "value")
      continue;
    const a = e[n];
    n === "class" ? r += ` class="${Cf(a)}"` : n === "style" ? r += ` style="${Of(a)}"` : r += Ff(n, a, t);
  }
  return r;
}
function Ff(e, t, r) {
  if (!yf(t))
    return "";
  const n = r && (r.indexOf("-") > 0 || ff(r)) ? e : df[e] || e.toLowerCase();
  return cf(n) ? hf(t) ? ` ${n}` : "" : xf(n) ? t === "" ? ` ${n}` : ` ${n}="${Br(t)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${n}`), "");
}
function yf(e) {
  if (e == null)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean";
}
function Cf(e) {
  return Br(Oa(e));
}
function Of(e) {
  if (!e)
    return "";
  if (gr(e))
    return Br(e);
  const t = Ca(e);
  return Br(nf(t));
}
function Rf(e, t) {
  throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
}
function Df(e, t, r, n, a) {
  e("<!--teleport start-->");
  const i = a.appContext.provides[Aa], s = i.__teleportBuffers || (i.__teleportBuffers = {}), f = s[r] || (s[r] = []), l = f.length;
  let o;
  if (n)
    t(e), o = "<!--teleport anchor-->";
  else {
    const { getBuffer: c, push: u } = Ra();
    t(u), u("<!--teleport anchor-->"), o = c();
  }
  f.splice(l, 0, o), e("<!--teleport end-->");
}
const { createComponentInstance: Nf, setCurrentRenderingInstance: k0, setupComponent: If, renderComponentRoot: P0, normalizeVNode: kf } = Fa;
function Ra() {
  let e = !1;
  const t = [];
  return {
    getBuffer() {
      return t;
    },
    push(r) {
      const n = gr(r);
      e && n ? t[t.length - 1] += r : t.push(r), e = n, (Jn(r) || Kn(r) && r.hasAsync) && (t.hasAsync = !0);
    }
  };
}
function Da(e, t = null, r) {
  const n = Nf(e, t, null), a = If(n, !0), i = Jn(a), s = n.sp;
  if (i || s) {
    let f = i ? a : Promise.resolve();
    return s && (f = f.then(() => Promise.all(s.map((l) => l.call(n.proxy)))).catch(() => {
    })), f.then(() => L0(n, r));
  } else
    return L0(n, r);
}
function L0(e, t) {
  const r = e.type, { getBuffer: n, push: a } = Ra();
  if (Vn(r)) {
    let i = P0(e);
    if (!r.props)
      for (const s in e.attrs)
        s.startsWith("data-v-") && ((i.props || (i.props = {}))[s] = "");
    en(a, e.subTree = i, e, t);
  } else {
    (!e.render || e.render === I0) && !e.ssrRender && !r.ssrRender && gr(r.template) && (r.ssrRender = Rf(r.template));
    for (const s of e.scope.effects)
      s.computed && (s.computed._cacheable = !0);
    const i = e.ssrRender || r.ssrRender;
    if (i) {
      let s = e.inheritAttrs !== !1 ? e.attrs : void 0, f = !1, l = e;
      for (; ; ) {
        const c = l.vnode.scopeId;
        c && (f || (s = { ...s }, f = !0), s[c] = "");
        const u = l.parent;
        if (u && u.subTree && u.subTree === l.vnode)
          l = u;
        else
          break;
      }
      t && (f || (s = { ...s }), s[t.trim()] = "");
      const o = k0(e);
      try {
        i(
          e.proxy,
          a,
          e,
          s,
          e.props,
          e.setupState,
          e.data,
          e.ctx
        );
      } finally {
        k0(o);
      }
    } else if (e.render && e.render !== I0)
      en(a, e.subTree = P0(e), e, t);
    else {
      const s = r.name || r.__file || "<Anonymous>";
      Qt(`Component ${s} is missing template or render function.`), a("<!---->");
    }
  }
  return n();
}
function en(e, t, r, n) {
  const { type: a, shapeFlag: i, children: s } = t;
  switch (a) {
    case Us:
      e(Br(s));
      break;
    case bs:
      e(s ? `<!--${mf(s)}-->` : "<!---->");
      break;
    case Ms:
      e(s);
      break;
    case zn:
      t.slotScopeIds && (n = (n ? n + " " : "") + t.slotScopeIds.join(" ")), e("<!--[-->"), qn(e, s, r, n), e("<!--]-->");
      break;
    default:
      i & 1 ? Pf(e, t, r, n) : i & 6 ? e(Da(t, r, n)) : i & 64 ? Bf(e, t, r, n) : i & 128 ? en(e, t.ssContent, r, n) : Qt("[@vue/server-renderer] Invalid VNode type:", a, `(${typeof a})`);
  }
}
function qn(e, t, r, n) {
  for (let a = 0; a < t.length; a++)
    en(e, kf(t[a]), r, n);
}
function Pf(e, t, r, n) {
  const a = t.type;
  let { props: i, children: s, shapeFlag: f, scopeId: l, dirs: o } = t, c = `<${a}`;
  o && (i = Lf(t, i, o)), i && (c += Af(i, a)), l && (c += ` ${l}`);
  let u = r, h = t;
  for (; u && h === u.subTree; )
    h = u.vnode, h.scopeId && (c += ` ${h.scopeId}`), u = u.parent;
  if (n && (c += ` ${n}`), e(c + ">"), !of(a)) {
    let p = !1;
    i && (i.innerHTML ? (p = !0, e(i.innerHTML)) : i.textContent ? (p = !0, e(Br(i.textContent))) : a === "textarea" && i.value && (p = !0, e(Br(i.value)))), p || (f & 8 ? e(Br(s)) : f & 16 && qn(e, s, r, n)), e(`</${a}>`);
  }
}
function Lf(e, t, r) {
  const n = [];
  for (let a = 0; a < r.length; a++) {
    const i = r[a], { dir: { getSSRProps: s } } = i;
    if (s) {
      const f = s(i, e);
      f && n.push(f);
    }
  }
  return Lt(t || {}, ...n);
}
function Bf(e, t, r, n) {
  const a = t.props && t.props.to, i = t.props && t.props.disabled;
  if (!a)
    return i || Qt("[@vue/server-renderer] Teleport is missing target prop."), [];
  if (!gr(a))
    return Qt("[@vue/server-renderer] Teleport target must be a query selector string."), [];
  Df(e, (s) => {
    qn(s, t.children, r, n);
  }, a, i || i === "", r);
}
const { isVNode: Mf } = Fa;
async function Zn(e) {
  if (e.hasAsync) {
    let t = "";
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      Jn(n) && (n = await n), gr(n) ? t += n : t += await Zn(n);
    }
    return t;
  } else
    return Na(e);
}
function Na(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    let n = e[r];
    gr(n) ? t += n : t += Na(n);
  }
  return t;
}
async function Ia(e, t = {}) {
  if (Mf(e))
    return Ia(Bs({ render: () => e }), t);
  const r = Ue(e._component, e._props);
  r.appContext = e._context, e.provide(Aa, t);
  const n = await Da(r), a = await Zn(n);
  if (await bf(t), t.__watcherHandles)
    for (const i of t.__watcherHandles)
      i();
  return a;
}
async function bf(e) {
  if (e.__teleportBuffers) {
    e.teleports = e.teleports || {};
    for (const t in e.__teleportBuffers)
      e.teleports[t] = await Zn(await Promise.all([e.__teleportBuffers[t]]));
  }
}
Ls();
var Tt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ka = { exports: {} };
(function(e, t) {
  (function(r, n) {
    n();
  })(Tt, function() {
    function r(o, c) {
      return typeof c > "u" ? c = { autoBom: !1 } : typeof c != "object" && (console.warn("Deprecated: Expected third argument to be a object"), c = { autoBom: !c }), c.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(o.type) ? new Blob(["\uFEFF", o], { type: o.type }) : o;
    }
    function n(o, c, u) {
      var h = new XMLHttpRequest();
      h.open("GET", o), h.responseType = "blob", h.onload = function() {
        l(h.response, c, u);
      }, h.onerror = function() {
        console.error("could not download file");
      }, h.send();
    }
    function a(o) {
      var c = new XMLHttpRequest();
      c.open("HEAD", o, !1);
      try {
        c.send();
      } catch {
      }
      return 200 <= c.status && 299 >= c.status;
    }
    function i(o) {
      try {
        o.dispatchEvent(new MouseEvent("click"));
      } catch {
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), o.dispatchEvent(c);
      }
    }
    var s = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof Tt == "object" && Tt.global === Tt ? Tt : void 0, f = s.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), l = s.saveAs || (typeof window != "object" || window !== s ? function() {
    } : "download" in HTMLAnchorElement.prototype && !f ? function(o, c, u) {
      var h = s.URL || s.webkitURL, p = document.createElement("a");
      c = c || o.name || "download", p.download = c, p.rel = "noopener", typeof o == "string" ? (p.href = o, p.origin === location.origin ? i(p) : a(p.href) ? n(o, c, u) : i(p, p.target = "_blank")) : (p.href = h.createObjectURL(o), setTimeout(function() {
        h.revokeObjectURL(p.href);
      }, 4e4), setTimeout(function() {
        i(p);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(o, c, u) {
      if (c = c || o.name || "download", typeof o != "string")
        navigator.msSaveOrOpenBlob(r(o, u), c);
      else if (a(o))
        n(o, c, u);
      else {
        var h = document.createElement("a");
        h.href = o, h.target = "_blank", setTimeout(function() {
          i(h);
        });
      }
    } : function(o, c, u, h) {
      if (h = h || open("", "_blank"), h && (h.document.title = h.document.body.innerText = "downloading..."), typeof o == "string")
        return n(o, c, u);
      var p = o.type === "application/octet-stream", _ = /constructor/i.test(s.HTMLElement) || s.safari, x = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((x || p && _ || f) && typeof FileReader < "u") {
        var g = new FileReader();
        g.onloadend = function() {
          var A = g.result;
          A = x ? A : A.replace(/^data:[^;]*;/, "data:attachment/file;"), h ? h.location.href = A : location = A, h = null;
        }, g.readAsDataURL(o);
      } else {
        var C = s.URL || s.webkitURL, O = C.createObjectURL(o);
        h ? h.location = O : location.href = O, h = null, setTimeout(function() {
          C.revokeObjectURL(O);
        }, 4e4);
      }
    });
    s.saveAs = l.saveAs = l, e.exports = l;
  });
})(ka);
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var rn = {};
rn.version = "0.18.5";
var Pa = 1252, Uf = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], La = function(e) {
  Uf.indexOf(e) != -1 && (Pa = e);
};
function Wf() {
  La(1252);
}
var Rt = function(e) {
  La(e);
};
function Hf() {
  Rt(1200), Wf();
}
function Vf(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r)
    t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var Xt = function(t) {
  return String.fromCharCode(t);
}, B0 = function(t) {
  return String.fromCharCode(t);
}, Xr, Pr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Dt(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, l = 0, o = 0; o < e.length; )
    r = e.charCodeAt(o++), i = r >> 2, n = e.charCodeAt(o++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(o++), f = (n & 15) << 2 | a >> 6, l = a & 63, isNaN(n) ? f = l = 64 : isNaN(a) && (l = 64), t += Pr.charAt(i) + Pr.charAt(s) + Pr.charAt(f) + Pr.charAt(l);
  return t;
}
function Dr(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, l = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var o = 0; o < e.length; )
    i = Pr.indexOf(e.charAt(o++)), s = Pr.indexOf(e.charAt(o++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = Pr.indexOf(e.charAt(o++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), l = Pr.indexOf(e.charAt(o++)), a = (f & 3) << 6 | l, l !== 64 && (t += String.fromCharCode(a));
  return t;
}
var ue = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Ir = /* @__PURE__ */ function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e)
      try {
        Buffer.from("foo", "utf8");
      } catch {
        e = !0;
      }
    return e ? function(t, r) {
      return r ? new Buffer(t, r) : new Buffer(t);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
}();
function zr(e) {
  return ue ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function M0(e) {
  return ue ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var pr = function(t) {
  return ue ? Ir(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function gn(e) {
  if (typeof ArrayBuffer > "u")
    return pr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}
function Bt(e) {
  if (Array.isArray(e))
    return e.map(function(n) {
      return String.fromCharCode(n);
    }).join("");
  for (var t = [], r = 0; r < e.length; ++r)
    t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function Gf(e) {
  if (typeof Uint8Array > "u")
    throw new Error("Unsupported");
  return new Uint8Array(e);
}
var We = ue ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Ir(t);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var t = 0, r = 0;
    for (t = 0; t < e.length; ++t)
      r += e[t].length;
    var n = new Uint8Array(r), a = 0;
    for (t = 0, r = 0; t < e.length; r += a, ++t)
      if (a = e[t].length, e[t] instanceof Uint8Array)
        n.set(e[t], r);
      else {
        if (typeof e[t] == "string")
          throw "wtf";
        n.set(new Uint8Array(e[t]), r);
      }
    return n;
  }
  return [].concat.apply([], e.map(function(i) {
    return Array.isArray(i) ? i : [].slice.call(i);
  }));
};
function Xf(e) {
  for (var t = [], r = 0, n = e.length + 250, a = zr(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128)
      a[r++] = s;
    else if (s < 2048)
      a[r++] = 192 | s >> 6 & 31, a[r++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var f = e.charCodeAt(++i) & 1023;
      a[r++] = 240 | s >> 8 & 7, a[r++] = 128 | s >> 2 & 63, a[r++] = 128 | f >> 6 & 15 | (s & 3) << 4, a[r++] = 128 | f & 63;
    } else
      a[r++] = 224 | s >> 12 & 15, a[r++] = 128 | s >> 6 & 63, a[r++] = 128 | s & 63;
    r > n && (t.push(a.slice(0, r)), r = 0, a = zr(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), We(t);
}
var St = /\u0000/g, jt = /[\u0001-\u0006]/g;
function ot(e) {
  for (var t = "", r = e.length - 1; r >= 0; )
    t += e.charAt(r--);
  return t;
}
function vr(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Fe("0", t - r.length) + r;
}
function Qn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Fe(" ", t - r.length) + r;
}
function tn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + Fe(" ", t - r.length);
}
function jf(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : Fe("0", t - r.length) + r;
}
function $f(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Fe("0", t - r.length) + r;
}
var b0 = /* @__PURE__ */ Math.pow(2, 32);
function tt(e, t) {
  if (e > b0 || e < -b0)
    return jf(e, t);
  var r = Math.round(e);
  return $f(r, t);
}
function nn(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var U0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], Pn = [
  ["J", "Jan", "January"],
  ["F", "Feb", "February"],
  ["M", "Mar", "March"],
  ["A", "Apr", "April"],
  ["M", "May", "May"],
  ["J", "Jun", "June"],
  ["J", "Jul", "July"],
  ["A", "Aug", "August"],
  ["S", "Sep", "September"],
  ["O", "Oct", "October"],
  ["N", "Nov", "November"],
  ["D", "Dec", "December"]
];
function zf(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"\u4E0A\u5348/\u4E0B\u5348 "hh"\u6642"mm"\u5206"ss"\u79D2 "', e;
}
var ye = {
  0: "General",
  1: "0",
  2: "0.00",
  3: "#,##0",
  4: "#,##0.00",
  9: "0%",
  10: "0.00%",
  11: "0.00E+00",
  12: "# ?/?",
  13: "# ??/??",
  14: "m/d/yy",
  15: "d-mmm-yy",
  16: "d-mmm",
  17: "mmm-yy",
  18: "h:mm AM/PM",
  19: "h:mm:ss AM/PM",
  20: "h:mm",
  21: "h:mm:ss",
  22: "m/d/yy h:mm",
  37: "#,##0 ;(#,##0)",
  38: "#,##0 ;[Red](#,##0)",
  39: "#,##0.00;(#,##0.00)",
  40: "#,##0.00;[Red](#,##0.00)",
  45: "mm:ss",
  46: "[h]:mm:ss",
  47: "mmss.0",
  48: "##0.0E+0",
  49: "@",
  56: '"\u4E0A\u5348/\u4E0B\u5348 "hh"\u6642"mm"\u5206"ss"\u79D2 "'
}, W0 = {
  5: 37,
  6: 38,
  7: 39,
  8: 40,
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  27: 14,
  28: 14,
  29: 14,
  30: 14,
  31: 14,
  50: 14,
  51: 14,
  52: 14,
  53: 14,
  54: 14,
  55: 14,
  56: 14,
  57: 14,
  58: 14,
  59: 1,
  60: 2,
  61: 3,
  62: 4,
  67: 9,
  68: 10,
  69: 12,
  70: 13,
  71: 14,
  72: 14,
  73: 15,
  74: 16,
  75: 17,
  76: 20,
  77: 21,
  78: 22,
  79: 45,
  80: 46,
  81: 47,
  82: 0
}, Kf = {
  5: '"$"#,##0_);\\("$"#,##0\\)',
  63: '"$"#,##0_);\\("$"#,##0\\)',
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
  42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
  43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
  44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
};
function an(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, l = 1, o = 0, c = 0, u = Math.floor(a); o < t && (u = Math.floor(a), f = u * s + i, c = u * o + l, !(a - u < 5e-8)); )
    a = 1 / (a - u), i = s, s = f, l = o, o = c;
  if (c > t && (o > t ? (c = l, f = i) : (c = o, f = s)), !r)
    return [0, n * f, c];
  var h = Math.floor(n * f / c);
  return [h, n * f - h * c, c];
}
function $t(e, t, r) {
  if (e > 2958465 || e < 0)
    return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var l = new Date(1900, 0, 1);
    l.setDate(l.getDate() + n - 1), s = [l.getFullYear(), l.getMonth() + 1, l.getDate()], i = l.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = ro(l, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var Ba = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), Yf = /* @__PURE__ */ Ba.getTime(), Jf = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function Ma(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= Jf && (r += 24 * 60 * 60 * 1e3), (r - (Yf + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Ba.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function e0(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function qf(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Zf(e) {
  var t = e < 0 ? 12 : 11, r = e0(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function Qf(e) {
  var t = e0(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function eo(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = Zf(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = Qf(e), e0(qf(r.toUpperCase()));
}
function Gn(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : eo(e);
    case "undefined":
      return "";
    case "object":
      if (e == null)
        return "";
      if (e instanceof Date)
        return Mr(14, Ma(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function ro(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function to(e, t, r, n) {
  var a = "", i = 0, s = 0, f = r.y, l, o = 0;
  switch (e) {
    case 98:
      f = r.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          l = f % 100, o = 2;
          break;
        default:
          l = f % 1e4, o = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          l = r.m, o = t.length;
          break;
        case 3:
          return Pn[r.m - 1][1];
        case 5:
          return Pn[r.m - 1][0];
        default:
          return Pn[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          l = r.d, o = t.length;
          break;
        case 3:
          return U0[r.q][0];
        default:
          return U0[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          l = 1 + (r.H + 11) % 12, o = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          l = r.H, o = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          l = r.M, o = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000")
        throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss") ? vr(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = vr(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          l = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          l = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          l = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      o = t.length === 3 ? 1 : 2;
      break;
    case 101:
      l = f, o = 1;
      break;
  }
  var c = o > 0 ? vr(l, o) : "";
  return c;
}
function Lr(e) {
  var t = 3;
  if (e.length <= t)
    return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t)
    n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var ba = /%/g;
function no(e, t, r) {
  var n = t.replace(ba, ""), a = t.length - n.length;
  return Cr(e, n, r * Math.pow(10, 2 * a)) + Fe("%", a);
}
function ao(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return Cr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Ua(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + Ua(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), r.indexOf("e") === -1) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, a) + "." + r.substr(2 + a), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, l, o, c) {
      return l + o + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else
    r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var Wa = /# (\?+)( ?)\/( ?)(\d+)/;
function io(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Fe(" ", e[1].length + 1 + e[4].length) : Qn(s, e[1].length) + e[2] + "/" + e[3] + vr(f, e[4].length));
}
function so(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + Fe(" ", e[1].length + 2 + e[4].length);
}
var Ha = /^#*0*\.([0#]+)/, Va = /\).*[0#]/, Ga = /\(###\) ###\\?-####/;
function Ke(e) {
  for (var t = "", r, n = 0; n != e.length; ++n)
    switch (r = e.charCodeAt(n)) {
      case 35:
        break;
      case 63:
        t += " ";
        break;
      case 48:
        t += "0";
        break;
      default:
        t += String.fromCharCode(r);
    }
  return t;
}
function H0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function V0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function fo(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function oo(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function lr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Va)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? lr("n", n, r) : "(" + lr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return ao(e, t, r);
  if (t.indexOf("%") !== -1)
    return no(e, t, r);
  if (t.indexOf("E") !== -1)
    return Ua(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + lr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, l = Math.abs(r), o = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return o + tt(l, t.length);
  if (t.match(/^[#?]+$/))
    return a = tt(r, 0), a === "0" && (a = ""), a.length > t.length ? a : Ke(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Wa))
    return io(i, l, o);
  if (t.match(/^#+0+$/))
    return o + tt(l, t.length - t.indexOf("0"));
  if (i = t.match(Ha))
    return a = H0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + Ke(i[1])).replace(/\.$/, "." + Ke(i[1])).replace(/\.(\d*)$/, function(_, x) {
      return "." + x + Fe("0", Ke(i[1]).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return o + H0(l, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return o + Lr(tt(l, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + lr(e, t, -r) : Lr("" + (Math.floor(r) + fo(r, i[1].length))) + "." + vr(V0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return lr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = ot(lr(e, t.replace(/[\\-]/g, ""), r)), s = 0, ot(ot(t.replace(/\\/g, "")).replace(/[0#]/g, function(_) {
      return s < a.length ? a.charAt(s++) : _ === "0" ? "0" : "";
    }));
  if (t.match(Ga))
    return a = lr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(i[4].length, 7), f = an(l, Math.pow(10, s) - 1, !1), a = "" + o, c = Cr("n", i[1], f[1]), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + i[2] + "/" + i[3], c = tn(f[2], s), c.length < i[4].length && (c = Ke(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = an(l, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Qn(f[1], s) + i[2] + "/" + i[3] + tn(f[2], s) : Fe(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = tt(r, 0), t.length <= a.length ? a : Ke(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var u = t.indexOf(".") - s, h = t.length - a.length - u;
    return Ke(t.substr(0, u) + a + t.substr(t.length - h));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = V0(r, i[1].length), r < 0 ? "-" + lr(e, t, -r) : Lr(oo(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(_) {
      return "00," + (_.length < 3 ? vr(0, 3 - _.length) : "") + _;
    }) + "." + vr(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return lr(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var p = Lr(tt(l, 0));
      return p !== "0" ? o + p : "";
    case "###,###.00":
      return lr(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return lr(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function lo(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return Cr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function co(e, t, r) {
  var n = t.replace(ba, ""), a = t.length - n.length;
  return Cr(e, n, r * Math.pow(10, 2 * a)) + Fe("%", a);
}
function Xa(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + Xa(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !r.match(/[Ee]/)) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, l, o, c) {
      return l + o + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else
    r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function Tr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Va)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Tr("n", n, r) : "(" + Tr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return lo(e, t, r);
  if (t.indexOf("%") !== -1)
    return co(e, t, r);
  if (t.indexOf("E") !== -1)
    return Xa(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + Tr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, l = Math.abs(r), o = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return o + vr(l, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : Ke(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Wa))
    return so(i, l, o);
  if (t.match(/^#+0+$/))
    return o + vr(l, t.length - t.indexOf("0"));
  if (i = t.match(Ha))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + Ke(i[1])).replace(/\.$/, "." + Ke(i[1])), a = a.replace(/\.(\d*)$/, function(_, x) {
      return "." + x + Fe("0", Ke(i[1]).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return o + ("" + l).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return o + Lr("" + l);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Tr(e, t, -r) : Lr("" + r) + "." + Fe("0", i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return Tr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = ot(Tr(e, t.replace(/[\\-]/g, ""), r)), s = 0, ot(ot(t.replace(/\\/g, "")).replace(/[0#]/g, function(_) {
      return s < a.length ? a.charAt(s++) : _ === "0" ? "0" : "";
    }));
  if (t.match(Ga))
    return a = Tr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(i[4].length, 7), f = an(l, Math.pow(10, s) - 1, !1), a = "" + o, c = Cr("n", i[1], f[1]), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + i[2] + "/" + i[3], c = tn(f[2], s), c.length < i[4].length && (c = Ke(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = an(l, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Qn(f[1], s) + i[2] + "/" + i[3] + tn(f[2], s) : Fe(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : Ke(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var u = t.indexOf(".") - s, h = t.length - a.length - u;
    return Ke(t.substr(0, u) + a + t.substr(t.length - h));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + Tr(e, t, -r) : Lr("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(_) {
      return "00," + (_.length < 3 ? vr(0, 3 - _.length) : "") + _;
    }) + "." + vr(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var p = Lr("" + l);
      return p !== "0" ? o + p : "";
    default:
      if (t.match(/\.[0#?]*$/))
        return Tr(e, t.slice(0, t.lastIndexOf(".")), r) + Ke(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Cr(e, t, r) {
  return (r | 0) === r ? Tr(e, t, r) : lr(e, t, r);
}
function ho(e) {
  for (var t = [], r = !1, n = 0, a = 0; n < e.length; ++n)
    switch (e.charCodeAt(n)) {
      case 34:
        r = !r;
        break;
      case 95:
      case 42:
      case 92:
        ++n;
        break;
      case 59:
        t[t.length] = e.substr(a, n - a), a = n + 1;
    }
  if (t[t.length] = e.substr(a), r === !0)
    throw new Error("Format |" + e + "| unterminated string ");
  return t;
}
var ja = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function $a(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        nn(e, t) && (t += 6), t++;
        break;
      case '"':
        for (; e.charCodeAt(++t) !== 34 && t < e.length; )
          ;
        ++t;
        break;
      case "\\":
        t += 2;
        break;
      case "_":
        t += 2;
        break;
      case "@":
        ++t;
        break;
      case "B":
      case "b":
        if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2")
          return !0;
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        return !0;
      case "A":
      case "a":
      case "\u4E0A":
        if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "\u4E0A\u5348/\u4E0B\u5348")
          return !0;
        ++t;
        break;
      case "[":
        for (n = r; e.charAt(t++) !== "]" && t < e.length; )
          n += e.charAt(t);
        if (n.match(ja))
          return !0;
        break;
      case ".":
      case "0":
      case "#":
        for (; t < e.length && ("0#?.,E+-%".indexOf(r = e.charAt(++t)) > -1 || r == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++t) === r; )
          ;
        break;
      case "*":
        ++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t;
        break;
      case "(":
      case ")":
        ++t;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1; )
          ;
        break;
      case " ":
        ++t;
        break;
      default:
        ++t;
        break;
    }
  return !1;
}
function uo(e, t, r, n) {
  for (var a = [], i = "", s = 0, f = "", l = "t", o, c, u, h = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!nn(e, s))
          throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (u = e.charCodeAt(++s)) !== 34 && s < e.length; )
          i += String.fromCharCode(u);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var p = e.charAt(++s), _ = p === "(" || p === ")" ? p : "t";
        a[a.length] = { t: _, v: p }, ++s;
        break;
      case "_":
        a[a.length] = { t: "t", v: " " }, s += 2;
        break;
      case "@":
        a[a.length] = { t: "T", v: t }, ++s;
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (o == null && (o = $t(t, r, e.charAt(s + 1) === "2"), o == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, l = f, s += 2;
          break;
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        f = f.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (t < 0 || o == null && (o = $t(t, r), o == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; )
          i += f;
        f === "m" && l.toLowerCase() === "h" && (f = "M"), f === "h" && (f = h), a[a.length] = { t: f, v: i }, l = f;
        break;
      case "A":
      case "a":
      case "\u4E0A":
        var x = { t: f, v: f };
        if (o == null && (o = $t(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (o != null && (x.v = o.H >= 12 ? "P" : "A"), x.t = "T", h = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (o != null && (x.v = o.H >= 12 ? "PM" : "AM"), x.t = "T", s += 5, h = "h") : e.substr(s, 5).toUpperCase() === "\u4E0A\u5348/\u4E0B\u5348" ? (o != null && (x.v = o.H >= 12 ? "\u4E0B\u5348" : "\u4E0A\u5348"), x.t = "T", s += 5, h = "h") : (x.t = "t", ++s), o == null && x.t === "T")
          return "";
        a[a.length] = x, l = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; )
          i += e.charAt(s);
        if (i.slice(-1) !== "]")
          throw 'unterminated "[" block: |' + i + "|";
        if (i.match(ja)) {
          if (o == null && (o = $t(t, r), o == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, l = i.charAt(1);
        } else
          i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", $a(e) || (a[a.length] = { t: "t", v: i }));
        break;
      case ".":
        if (o != null) {
          for (i = f; ++s < e.length && (f = e.charAt(s)) === "0"; )
            i += f;
          a[a.length] = { t: "s", v: i };
          break;
        }
      case "0":
      case "#":
        for (i = f; ++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1; )
          i += f;
        a[a.length] = { t: "n", v: i };
        break;
      case "?":
        for (i = f; e.charAt(++s) === f; )
          i += f;
        a[a.length] = { t: f, v: i }, l = f;
        break;
      case "*":
        ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
        break;
      case "(":
      case ")":
        a[a.length] = { t: n === 1 ? "t" : f, v: f }, ++s;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (i = f; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1; )
          i += e.charAt(s);
        a[a.length] = { t: "D", v: i };
        break;
      case " ":
        a[a.length] = { t: f, v: f }, ++s;
        break;
      case "$":
        a[a.length] = { t: "t", v: "$" }, ++s;
        break;
      default:
        if (",$-+/():!^&'~{}<>=\u20ACacfijklopqrtuvwxzP".indexOf(f) === -1)
          throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "t", v: f }, ++s;
        break;
    }
  var g = 0, C = 0, O;
  for (s = a.length - 1, l = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = h, l = "h", g < 1 && (g = 1);
        break;
      case "s":
        (O = a[s].v.match(/\.0+$/)) && (C = Math.max(C, O[0].length - 1)), g < 3 && (g = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        l = a[s].t;
        break;
      case "m":
        l === "s" && (a[s].t = "M", g < 2 && (g = 2));
        break;
      case "X":
        break;
      case "Z":
        g < 1 && a[s].v.match(/[Hh]/) && (g = 1), g < 2 && a[s].v.match(/[Mm]/) && (g = 2), g < 3 && a[s].v.match(/[Ss]/) && (g = 3);
    }
  switch (g) {
    case 0:
      break;
    case 1:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M), o.M >= 60 && (o.M = 0, ++o.H);
      break;
    case 2:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M);
      break;
  }
  var A = "", B;
  for (s = 0; s < a.length; ++s)
    switch (a[s].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        a[s].v = "", a[s].t = ";";
        break;
      case "d":
      case "m":
      case "y":
      case "h":
      case "H":
      case "M":
      case "s":
      case "e":
      case "b":
      case "Z":
        a[s].v = to(a[s].t.charCodeAt(0), a[s].v, o, C), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (B = s + 1; a[B] != null && ((f = a[B].t) === "?" || f === "D" || (f === " " || f === "t") && a[B + 1] != null && (a[B + 1].t === "?" || a[B + 1].t === "t" && a[B + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[B].v === "/" || a[B].v === " " && a[B + 1] != null && a[B + 1].t == "?")); )
          a[s].v += a[B].v, a[B] = { v: "", t: ";" }, ++B;
        A += a[s].v, s = B - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = Gn(t, r);
        break;
    }
  var z = "", Q, R;
  if (A.length > 0) {
    A.charCodeAt(0) == 40 ? (Q = t < 0 && A.charCodeAt(0) === 45 ? -t : t, R = Cr("n", A, Q)) : (Q = t < 0 && n > 1 ? -t : t, R = Cr("n", A, Q), Q < 0 && a[0] && a[0].t == "t" && (R = R.substr(1), a[0].v = "-" + a[0].v)), B = R.length - 1;
    var U = a.length;
    for (s = 0; s < a.length; ++s)
      if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
        U = s;
        break;
      }
    var L = a.length;
    if (U === a.length && R.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (B >= a[s].v.length - 1 ? (B -= a[s].v.length, a[s].v = R.substr(B + 1, a[s].v.length)) : B < 0 ? a[s].v = "" : (a[s].v = R.substr(0, B + 1), B = -1), a[s].t = "t", L = s);
      B >= 0 && L < a.length && (a[L].v = R.substr(0, B + 1) + a[L].v);
    } else if (U !== a.length && R.indexOf("E") === -1) {
      for (B = R.indexOf(".") - 1, s = U; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, z = a[s].v.substr(c + 1); c >= 0; --c)
            B >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (z = R.charAt(B--) + z);
          a[s].v = z, a[s].t = "t", L = s;
        }
      for (B >= 0 && L < a.length && (a[L].v = R.substr(0, B + 1) + a[L].v), B = R.indexOf(".") + 1, s = U; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== U)) {
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") + 1 : 0, z = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            B < R.length && (z += R.charAt(B++));
          a[s].v = z, a[s].t = "t", L = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s)
    a[s] != null && "n?".indexOf(a[s].t) > -1 && (Q = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = Cr(a[s].t, a[s].v, Q), a[s].t = "t");
  var V = "";
  for (s = 0; s !== a.length; ++s)
    a[s] != null && (V += a[s].v);
  return V;
}
var G0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function X0(e, t) {
  if (t == null)
    return !1;
  var r = parseFloat(t[2]);
  switch (t[1]) {
    case "=":
      if (e == r)
        return !0;
      break;
    case ">":
      if (e > r)
        return !0;
      break;
    case "<":
      if (e < r)
        return !0;
      break;
    case "<>":
      if (e != r)
        return !0;
      break;
    case ">=":
      if (e >= r)
        return !0;
      break;
    case "<=":
      if (e <= r)
        return !0;
      break;
  }
  return !1;
}
function xo(e, t) {
  var r = ho(e), n = r.length, a = r[n - 1].indexOf("@");
  if (n < 4 && a > -1 && --n, r.length > 4)
    throw new Error("cannot find right format for |" + r.join("|") + "|");
  if (typeof t != "number")
    return [4, r.length === 4 || a > -1 ? r[r.length - 1] : "@"];
  switch (r.length) {
    case 1:
      r = a > -1 ? ["General", "General", "General", r[0]] : [r[0], r[0], r[0], "@"];
      break;
    case 2:
      r = a > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
      break;
    case 3:
      r = a > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
      break;
  }
  var i = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
  if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1)
    return [n, i];
  if (r[0].match(/\[[=<>]/) != null || r[1].match(/\[[=<>]/) != null) {
    var s = r[0].match(G0), f = r[1].match(G0);
    return X0(t, s) ? [n, r[0]] : X0(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function Mr(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : ye)[e], n == null && (n = r.table && r.table[W0[e]] || ye[W0[e]]), n == null && (n = Kf[e] || "General");
      break;
  }
  if (nn(n, 0))
    return Gn(t, r);
  t instanceof Date && (t = Ma(t, r.date1904));
  var a = xo(n, t);
  if (nn(a[1]))
    return Gn(t, r);
  if (t === !0)
    t = "TRUE";
  else if (t === !1)
    t = "FALSE";
  else if (t === "" || t == null)
    return "";
  return uo(a[1], t, r, a[0]);
}
function za(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (ye[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (ye[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return ye[t] = e, t;
}
function _n(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && za(e[t], t);
}
function Tn() {
  ye = zf();
}
var Ka = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function po(e) {
  var t = typeof e == "number" ? ye[e] : e;
  return t = t.replace(Ka, "(\\d+)"), new RegExp("^" + t + "$");
}
function vo(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, l = -1;
  (t.match(Ka) || []).forEach(function(u, h) {
    var p = parseInt(r[h + 1], 10);
    switch (u.toLowerCase().charAt(0)) {
      case "y":
        n = p;
        break;
      case "d":
        i = p;
        break;
      case "h":
        s = p;
        break;
      case "s":
        l = p;
        break;
      case "m":
        s >= 0 ? f = p : a = p;
        break;
    }
  }), l >= 0 && f == -1 && a >= 0 && (f = a, a = -1);
  var o = ("" + (n >= 0 ? n : new Date().getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  o.length == 7 && (o = "0" + o), o.length == 8 && (o = "20" + o);
  var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (l >= 0 ? l : 0)).slice(-2);
  return s == -1 && f == -1 && l == -1 ? o : n == -1 && a == -1 && i == -1 ? c : o + "T" + c;
}
var mo = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var R = 0, U = new Array(256), L = 0; L != 256; ++L)
      R = L, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, U[L] = R;
    return typeof Int32Array < "u" ? new Int32Array(U) : U;
  }
  var r = t();
  function n(R) {
    var U = 0, L = 0, V = 0, G = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (V = 0; V != 256; ++V)
      G[V] = R[V];
    for (V = 0; V != 256; ++V)
      for (L = R[V], U = 256 + V; U < 4096; U += 256)
        L = G[U] = L >>> 8 ^ R[L & 255];
    var j = [];
    for (V = 1; V != 16; ++V)
      j[V - 1] = typeof Int32Array < "u" ? G.subarray(V * 256, V * 256 + 256) : G.slice(V * 256, V * 256 + 256);
    return j;
  }
  var a = n(r), i = a[0], s = a[1], f = a[2], l = a[3], o = a[4], c = a[5], u = a[6], h = a[7], p = a[8], _ = a[9], x = a[10], g = a[11], C = a[12], O = a[13], A = a[14];
  function B(R, U) {
    for (var L = U ^ -1, V = 0, G = R.length; V < G; )
      L = L >>> 8 ^ r[(L ^ R.charCodeAt(V++)) & 255];
    return ~L;
  }
  function z(R, U) {
    for (var L = U ^ -1, V = R.length - 15, G = 0; G < V; )
      L = A[R[G++] ^ L & 255] ^ O[R[G++] ^ L >> 8 & 255] ^ C[R[G++] ^ L >> 16 & 255] ^ g[R[G++] ^ L >>> 24] ^ x[R[G++]] ^ _[R[G++]] ^ p[R[G++]] ^ h[R[G++]] ^ u[R[G++]] ^ c[R[G++]] ^ o[R[G++]] ^ l[R[G++]] ^ f[R[G++]] ^ s[R[G++]] ^ i[R[G++]] ^ r[R[G++]];
    for (V += 15; G < V; )
      L = L >>> 8 ^ r[(L ^ R[G++]) & 255];
    return ~L;
  }
  function Q(R, U) {
    for (var L = U ^ -1, V = 0, G = R.length, j = 0, re = 0; V < G; )
      j = R.charCodeAt(V++), j < 128 ? L = L >>> 8 ^ r[(L ^ j) & 255] : j < 2048 ? (L = L >>> 8 ^ r[(L ^ (192 | j >> 6 & 31)) & 255], L = L >>> 8 ^ r[(L ^ (128 | j & 63)) & 255]) : j >= 55296 && j < 57344 ? (j = (j & 1023) + 64, re = R.charCodeAt(V++) & 1023, L = L >>> 8 ^ r[(L ^ (240 | j >> 8 & 7)) & 255], L = L >>> 8 ^ r[(L ^ (128 | j >> 2 & 63)) & 255], L = L >>> 8 ^ r[(L ^ (128 | re >> 6 & 15 | (j & 3) << 4)) & 255], L = L >>> 8 ^ r[(L ^ (128 | re & 63)) & 255]) : (L = L >>> 8 ^ r[(L ^ (224 | j >> 12 & 15)) & 255], L = L >>> 8 ^ r[(L ^ (128 | j >> 6 & 63)) & 255], L = L >>> 8 ^ r[(L ^ (128 | j & 63)) & 255]);
    return ~L;
  }
  return e.table = r, e.bstr = B, e.buf = z, e.str = Q, e;
}(), _e = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(d, T) {
    for (var v = d.split("/"), m = T.split("/"), E = 0, w = 0, N = Math.min(v.length, m.length); E < N; ++E) {
      if (w = v[E].length - m[E].length)
        return w;
      if (v[E] != m[E])
        return v[E] < m[E] ? -1 : 1;
    }
    return v.length - m.length;
  }
  function n(d) {
    if (d.charAt(d.length - 1) == "/")
      return d.slice(0, -1).indexOf("/") === -1 ? d : n(d.slice(0, -1));
    var T = d.lastIndexOf("/");
    return T === -1 ? d : d.slice(0, T + 1);
  }
  function a(d) {
    if (d.charAt(d.length - 1) == "/")
      return a(d.slice(0, -1));
    var T = d.lastIndexOf("/");
    return T === -1 ? d : d.slice(T + 1);
  }
  function i(d, T) {
    typeof T == "string" && (T = new Date(T));
    var v = T.getHours();
    v = v << 6 | T.getMinutes(), v = v << 5 | T.getSeconds() >>> 1, d.write_shift(2, v);
    var m = T.getFullYear() - 1980;
    m = m << 4 | T.getMonth() + 1, m = m << 5 | T.getDate(), d.write_shift(2, m);
  }
  function s(d) {
    var T = d.read_shift(2) & 65535, v = d.read_shift(2) & 65535, m = new Date(), E = v & 31;
    v >>>= 5;
    var w = v & 15;
    v >>>= 4, m.setMilliseconds(0), m.setFullYear(v + 1980), m.setMonth(w - 1), m.setDate(E);
    var N = T & 31;
    T >>>= 5;
    var b = T & 63;
    return T >>>= 6, m.setHours(T), m.setMinutes(b), m.setSeconds(N << 1), m;
  }
  function f(d) {
    tr(d, 0);
    for (var T = {}, v = 0; d.l <= d.length - 4; ) {
      var m = d.read_shift(2), E = d.read_shift(2), w = d.l + E, N = {};
      switch (m) {
        case 21589:
          v = d.read_shift(1), v & 1 && (N.mtime = d.read_shift(4)), E > 5 && (v & 2 && (N.atime = d.read_shift(4)), v & 4 && (N.ctime = d.read_shift(4))), N.mtime && (N.mt = new Date(N.mtime * 1e3));
          break;
      }
      d.l = w, T[m] = N;
    }
    return T;
  }
  var l;
  function o() {
    return l || (l = {});
  }
  function c(d, T) {
    if (d[0] == 80 && d[1] == 75)
      return R0(d, T);
    if ((d[0] | 32) == 109 && (d[1] | 32) == 105)
      return As(d, T);
    if (d.length < 512)
      throw new Error("CFB file size " + d.length + " < 512");
    var v = 3, m = 512, E = 0, w = 0, N = 0, b = 0, D = 0, I = [], k = d.slice(0, 512);
    tr(k, 0);
    var X = u(k);
    switch (v = X[0], v) {
      case 3:
        m = 512;
        break;
      case 4:
        m = 4096;
        break;
      case 0:
        if (X[1] == 0)
          return R0(d, T);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + v);
    }
    m !== 512 && (k = d.slice(0, m), tr(k, 28));
    var q = d.slice(0, m);
    h(k, v);
    var te = k.read_shift(4, "i");
    if (v === 3 && te !== 0)
      throw new Error("# Directory Sectors: Expected 0 saw " + te);
    k.l += 4, N = k.read_shift(4, "i"), k.l += 4, k.chk("00100000", "Mini Stream Cutoff Size: "), b = k.read_shift(4, "i"), E = k.read_shift(4, "i"), D = k.read_shift(4, "i"), w = k.read_shift(4, "i");
    for (var K = -1, ee = 0; ee < 109 && (K = k.read_shift(4, "i"), !(K < 0)); ++ee)
      I[ee] = K;
    var fe = p(d, m);
    g(D, w, fe, m, I);
    var we = O(fe, N, I, m);
    we[N].name = "!Directory", E > 0 && b !== re && (we[b].name = "!MiniFAT"), we[I[0]].name = "!FAT", we.fat_addrs = I, we.ssz = m;
    var Se = {}, Xe = [], mt = [], gt = [];
    A(N, we, fe, Xe, E, Se, mt, b), _(mt, gt, Xe), Xe.shift();
    var _t = {
      FileIndex: mt,
      FullPaths: gt
    };
    return T && T.raw && (_t.raw = { header: q, sectors: fe }), _t;
  }
  function u(d) {
    if (d[d.l] == 80 && d[d.l + 1] == 75)
      return [0, 0];
    d.chk(ge, "Header Signature: "), d.l += 16;
    var T = d.read_shift(2, "u");
    return [d.read_shift(2, "u"), T];
  }
  function h(d, T) {
    var v = 9;
    switch (d.l += 2, v = d.read_shift(2)) {
      case 9:
        if (T != 3)
          throw new Error("Sector Shift: Expected 9 saw " + v);
        break;
      case 12:
        if (T != 4)
          throw new Error("Sector Shift: Expected 12 saw " + v);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + v);
    }
    d.chk("0600", "Mini Sector Shift: "), d.chk("000000000000", "Reserved: ");
  }
  function p(d, T) {
    for (var v = Math.ceil(d.length / T) - 1, m = [], E = 1; E < v; ++E)
      m[E - 1] = d.slice(E * T, (E + 1) * T);
    return m[v - 1] = d.slice(v * T), m;
  }
  function _(d, T, v) {
    for (var m = 0, E = 0, w = 0, N = 0, b = 0, D = v.length, I = [], k = []; m < D; ++m)
      I[m] = k[m] = m, T[m] = v[m];
    for (; b < k.length; ++b)
      m = k[b], E = d[m].L, w = d[m].R, N = d[m].C, I[m] === m && (E !== -1 && I[E] !== E && (I[m] = I[E]), w !== -1 && I[w] !== w && (I[m] = I[w])), N !== -1 && (I[N] = m), E !== -1 && m != I[m] && (I[E] = I[m], k.lastIndexOf(E) < b && k.push(E)), w !== -1 && m != I[m] && (I[w] = I[m], k.lastIndexOf(w) < b && k.push(w));
    for (m = 1; m < D; ++m)
      I[m] === m && (w !== -1 && I[w] !== w ? I[m] = I[w] : E !== -1 && I[E] !== E && (I[m] = I[E]));
    for (m = 1; m < D; ++m)
      if (d[m].type !== 0) {
        if (b = m, b != I[b])
          do
            b = I[b], T[m] = T[b] + "/" + T[m];
          while (b !== 0 && I[b] !== -1 && b != I[b]);
        I[m] = -1;
      }
    for (T[0] += "/", m = 1; m < D; ++m)
      d[m].type !== 2 && (T[m] += "/");
  }
  function x(d, T, v) {
    for (var m = d.start, E = d.size, w = [], N = m; v && E > 0 && N >= 0; )
      w.push(T.slice(N * j, N * j + j)), E -= j, N = jr(v, N * 4);
    return w.length === 0 ? M(0) : We(w).slice(0, d.size);
  }
  function g(d, T, v, m, E) {
    var w = re;
    if (d === re) {
      if (T !== 0)
        throw new Error("DIFAT chain shorter than expected");
    } else if (d !== -1) {
      var N = v[d], b = (m >>> 2) - 1;
      if (!N)
        return;
      for (var D = 0; D < b && (w = jr(N, D * 4)) !== re; ++D)
        E.push(w);
      g(jr(N, m - 4), T - 1, v, m, E);
    }
  }
  function C(d, T, v, m, E) {
    var w = [], N = [];
    E || (E = []);
    var b = m - 1, D = 0, I = 0;
    for (D = T; D >= 0; ) {
      E[D] = !0, w[w.length] = D, N.push(d[D]);
      var k = v[Math.floor(D * 4 / m)];
      if (I = D * 4 & b, m < 4 + I)
        throw new Error("FAT boundary crossed: " + D + " 4 " + m);
      if (!d[k])
        break;
      D = jr(d[k], I);
    }
    return { nodes: w, data: Z0([N]) };
  }
  function O(d, T, v, m) {
    var E = d.length, w = [], N = [], b = [], D = [], I = m - 1, k = 0, X = 0, q = 0, te = 0;
    for (k = 0; k < E; ++k)
      if (b = [], q = k + T, q >= E && (q -= E), !N[q]) {
        D = [];
        var K = [];
        for (X = q; X >= 0; ) {
          K[X] = !0, N[X] = !0, b[b.length] = X, D.push(d[X]);
          var ee = v[Math.floor(X * 4 / m)];
          if (te = X * 4 & I, m < 4 + te)
            throw new Error("FAT boundary crossed: " + X + " 4 " + m);
          if (!d[ee] || (X = jr(d[ee], te), K[X]))
            break;
        }
        w[q] = { nodes: b, data: Z0([D]) };
      }
    return w;
  }
  function A(d, T, v, m, E, w, N, b) {
    for (var D = 0, I = m.length ? 2 : 0, k = T[d].data, X = 0, q = 0, te; X < k.length; X += 128) {
      var K = k.slice(X, X + 128);
      tr(K, 64), q = K.read_shift(2), te = i0(K, 0, q - I), m.push(te);
      var ee = {
        name: te,
        type: K.read_shift(1),
        color: K.read_shift(1),
        L: K.read_shift(4, "i"),
        R: K.read_shift(4, "i"),
        C: K.read_shift(4, "i"),
        clsid: K.read_shift(16),
        state: K.read_shift(4, "i"),
        start: 0,
        size: 0
      }, fe = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      fe !== 0 && (ee.ct = B(K, K.l - 8));
      var we = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      we !== 0 && (ee.mt = B(K, K.l - 8)), ee.start = K.read_shift(4, "i"), ee.size = K.read_shift(4, "i"), ee.size < 0 && ee.start < 0 && (ee.size = ee.type = 0, ee.start = re, ee.name = ""), ee.type === 5 ? (D = ee.start, E > 0 && D !== re && (T[D].name = "!StreamData")) : ee.size >= 4096 ? (ee.storage = "fat", T[ee.start] === void 0 && (T[ee.start] = C(v, ee.start, T.fat_addrs, T.ssz)), T[ee.start].name = ee.name, ee.content = T[ee.start].data.slice(0, ee.size)) : (ee.storage = "minifat", ee.size < 0 ? ee.size = 0 : D !== re && ee.start !== re && T[D] && (ee.content = x(ee, T[D].data, (T[b] || {}).data))), ee.content && tr(ee.content, 0), w[te] = ee, N.push(ee);
    }
  }
  function B(d, T) {
    return new Date((ar(d, T + 4) / 1e7 * Math.pow(2, 32) + ar(d, T) / 1e7 - 11644473600) * 1e3);
  }
  function z(d, T) {
    return o(), c(l.readFileSync(d), T);
  }
  function Q(d, T) {
    var v = T && T.type;
    switch (v || ue && Buffer.isBuffer(d) && (v = "buffer"), v || "base64") {
      case "file":
        return z(d, T);
      case "base64":
        return c(pr(Dr(d)), T);
      case "binary":
        return c(pr(d), T);
    }
    return c(d, T);
  }
  function R(d, T) {
    var v = T || {}, m = v.root || "Root Entry";
    if (d.FullPaths || (d.FullPaths = []), d.FileIndex || (d.FileIndex = []), d.FullPaths.length !== d.FileIndex.length)
      throw new Error("inconsistent CFB structure");
    d.FullPaths.length === 0 && (d.FullPaths[0] = m + "/", d.FileIndex[0] = { name: m, type: 5 }), v.CLSID && (d.FileIndex[0].clsid = v.CLSID), U(d);
  }
  function U(d) {
    var T = "Sh33tJ5";
    if (!_e.find(d, "/" + T)) {
      var v = M(4);
      v[0] = 55, v[1] = v[3] = 50, v[2] = 54, d.FileIndex.push({ name: T, type: 2, content: v, size: 4, L: 69, R: 69, C: 69 }), d.FullPaths.push(d.FullPaths[0] + T), L(d);
    }
  }
  function L(d, T) {
    R(d);
    for (var v = !1, m = !1, E = d.FullPaths.length - 1; E >= 0; --E) {
      var w = d.FileIndex[E];
      switch (w.type) {
        case 0:
          m ? v = !0 : (d.FileIndex.pop(), d.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          m = !0, isNaN(w.R * w.L * w.C) && (v = !0), w.R > -1 && w.L > -1 && w.R == w.L && (v = !0);
          break;
        default:
          v = !0;
          break;
      }
    }
    if (!(!v && !T)) {
      var N = new Date(1987, 1, 19), b = 0, D = Object.create ? /* @__PURE__ */ Object.create(null) : {}, I = [];
      for (E = 0; E < d.FullPaths.length; ++E)
        D[d.FullPaths[E]] = !0, d.FileIndex[E].type !== 0 && I.push([d.FullPaths[E], d.FileIndex[E]]);
      for (E = 0; E < I.length; ++E) {
        var k = n(I[E][0]);
        m = D[k], m || (I.push([k, {
          name: a(k).replace("/", ""),
          type: 1,
          clsid: Be,
          ct: N,
          mt: N,
          content: null
        }]), D[k] = !0);
      }
      for (I.sort(function(te, K) {
        return r(te[0], K[0]);
      }), d.FullPaths = [], d.FileIndex = [], E = 0; E < I.length; ++E)
        d.FullPaths[E] = I[E][0], d.FileIndex[E] = I[E][1];
      for (E = 0; E < I.length; ++E) {
        var X = d.FileIndex[E], q = d.FullPaths[E];
        if (X.name = a(q).replace("/", ""), X.L = X.R = X.C = -(X.color = 1), X.size = X.content ? X.content.length : 0, X.start = 0, X.clsid = X.clsid || Be, E === 0)
          X.C = I.length > 1 ? 1 : -1, X.size = 0, X.type = 5;
        else if (q.slice(-1) == "/") {
          for (b = E + 1; b < I.length && n(d.FullPaths[b]) != q; ++b)
            ;
          for (X.C = b >= I.length ? -1 : b, b = E + 1; b < I.length && n(d.FullPaths[b]) != n(q); ++b)
            ;
          X.R = b >= I.length ? -1 : b, X.type = 1;
        } else
          n(d.FullPaths[E + 1] || "") == n(q) && (X.R = E + 1), X.type = 2;
      }
    }
  }
  function V(d, T) {
    var v = T || {};
    if (v.fileType == "mad")
      return Fs(d, v);
    switch (L(d), v.fileType) {
      case "zip":
        return gs(d, v);
    }
    var m = function(te) {
      for (var K = 0, ee = 0, fe = 0; fe < te.FileIndex.length; ++fe) {
        var we = te.FileIndex[fe];
        if (!!we.content) {
          var Se = we.content.length;
          Se > 0 && (Se < 4096 ? K += Se + 63 >> 6 : ee += Se + 511 >> 9);
        }
      }
      for (var Xe = te.FullPaths.length + 3 >> 2, mt = K + 7 >> 3, gt = K + 127 >> 7, _t = mt + ee + Xe + gt, Gr = _t + 127 >> 7, Dn = Gr <= 109 ? 0 : Math.ceil((Gr - 109) / 127); _t + Gr + Dn + 127 >> 7 > Gr; )
        Dn = ++Gr <= 109 ? 0 : Math.ceil((Gr - 109) / 127);
      var Fr = [1, Dn, Gr, gt, Xe, ee, K, 0];
      return te.FileIndex[0].size = K << 6, Fr[7] = (te.FileIndex[0].start = Fr[0] + Fr[1] + Fr[2] + Fr[3] + Fr[4] + Fr[5]) + (Fr[6] + 7 >> 3), Fr;
    }(d), E = M(m[7] << 9), w = 0, N = 0;
    {
      for (w = 0; w < 8; ++w)
        E.write_shift(1, oe[w]);
      for (w = 0; w < 8; ++w)
        E.write_shift(2, 0);
      for (E.write_shift(2, 62), E.write_shift(2, 3), E.write_shift(2, 65534), E.write_shift(2, 9), E.write_shift(2, 6), w = 0; w < 3; ++w)
        E.write_shift(2, 0);
      for (E.write_shift(4, 0), E.write_shift(4, m[2]), E.write_shift(4, m[0] + m[1] + m[2] + m[3] - 1), E.write_shift(4, 0), E.write_shift(4, 1 << 12), E.write_shift(4, m[3] ? m[0] + m[1] + m[2] - 1 : re), E.write_shift(4, m[3]), E.write_shift(-4, m[1] ? m[0] - 1 : re), E.write_shift(4, m[1]), w = 0; w < 109; ++w)
        E.write_shift(-4, w < m[2] ? m[1] + w : -1);
    }
    if (m[1])
      for (N = 0; N < m[1]; ++N) {
        for (; w < 236 + N * 127; ++w)
          E.write_shift(-4, w < m[2] ? m[1] + w : -1);
        E.write_shift(-4, N === m[1] - 1 ? re : N + 1);
      }
    var b = function(te) {
      for (N += te; w < N - 1; ++w)
        E.write_shift(-4, w + 1);
      te && (++w, E.write_shift(-4, re));
    };
    for (N = w = 0, N += m[1]; w < N; ++w)
      E.write_shift(-4, Ce.DIFSECT);
    for (N += m[2]; w < N; ++w)
      E.write_shift(-4, Ce.FATSECT);
    b(m[3]), b(m[4]);
    for (var D = 0, I = 0, k = d.FileIndex[0]; D < d.FileIndex.length; ++D)
      k = d.FileIndex[D], k.content && (I = k.content.length, !(I < 4096) && (k.start = N, b(I + 511 >> 9)));
    for (b(m[6] + 7 >> 3); E.l & 511; )
      E.write_shift(-4, Ce.ENDOFCHAIN);
    for (N = w = 0, D = 0; D < d.FileIndex.length; ++D)
      k = d.FileIndex[D], k.content && (I = k.content.length, !(!I || I >= 4096) && (k.start = N, b(I + 63 >> 6)));
    for (; E.l & 511; )
      E.write_shift(-4, Ce.ENDOFCHAIN);
    for (w = 0; w < m[4] << 2; ++w) {
      var X = d.FullPaths[w];
      if (!X || X.length === 0) {
        for (D = 0; D < 17; ++D)
          E.write_shift(4, 0);
        for (D = 0; D < 3; ++D)
          E.write_shift(4, -1);
        for (D = 0; D < 12; ++D)
          E.write_shift(4, 0);
        continue;
      }
      k = d.FileIndex[w], w === 0 && (k.start = k.size ? k.start - 1 : re);
      var q = w === 0 && v.root || k.name;
      if (I = 2 * (q.length + 1), E.write_shift(64, q, "utf16le"), E.write_shift(2, I), E.write_shift(1, k.type), E.write_shift(1, k.color), E.write_shift(-4, k.L), E.write_shift(-4, k.R), E.write_shift(-4, k.C), k.clsid)
        E.write_shift(16, k.clsid, "hex");
      else
        for (D = 0; D < 4; ++D)
          E.write_shift(4, 0);
      E.write_shift(4, k.state || 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, k.start), E.write_shift(4, k.size), E.write_shift(4, 0);
    }
    for (w = 1; w < d.FileIndex.length; ++w)
      if (k = d.FileIndex[w], k.size >= 4096)
        if (E.l = k.start + 1 << 9, ue && Buffer.isBuffer(k.content))
          k.content.copy(E, E.l, 0, k.size), E.l += k.size + 511 & -512;
        else {
          for (D = 0; D < k.size; ++D)
            E.write_shift(1, k.content[D]);
          for (; D & 511; ++D)
            E.write_shift(1, 0);
        }
    for (w = 1; w < d.FileIndex.length; ++w)
      if (k = d.FileIndex[w], k.size > 0 && k.size < 4096)
        if (ue && Buffer.isBuffer(k.content))
          k.content.copy(E, E.l, 0, k.size), E.l += k.size + 63 & -64;
        else {
          for (D = 0; D < k.size; ++D)
            E.write_shift(1, k.content[D]);
          for (; D & 63; ++D)
            E.write_shift(1, 0);
        }
    if (ue)
      E.l = E.length;
    else
      for (; E.l < E.length; )
        E.write_shift(1, 0);
    return E;
  }
  function G(d, T) {
    var v = d.FullPaths.map(function(D) {
      return D.toUpperCase();
    }), m = v.map(function(D) {
      var I = D.split("/");
      return I[I.length - (D.slice(-1) == "/" ? 2 : 1)];
    }), E = !1;
    T.charCodeAt(0) === 47 ? (E = !0, T = v[0].slice(0, -1) + T) : E = T.indexOf("/") !== -1;
    var w = T.toUpperCase(), N = E === !0 ? v.indexOf(w) : m.indexOf(w);
    if (N !== -1)
      return d.FileIndex[N];
    var b = !w.match(jt);
    for (w = w.replace(St, ""), b && (w = w.replace(jt, "!")), N = 0; N < v.length; ++N)
      if ((b ? v[N].replace(jt, "!") : v[N]).replace(St, "") == w || (b ? m[N].replace(jt, "!") : m[N]).replace(St, "") == w)
        return d.FileIndex[N];
    return null;
  }
  var j = 64, re = -2, ge = "d0cf11e0a1b11ae1", oe = [208, 207, 17, 224, 161, 177, 26, 225], Be = "00000000000000000000000000000000", Ce = {
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: re,
    FREESECT: -1,
    HEADER_SIGNATURE: ge,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: Be,
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function ur(d, T, v) {
    o();
    var m = V(d, v);
    l.writeFileSync(T, m);
  }
  function Ie(d) {
    for (var T = new Array(d.length), v = 0; v < d.length; ++v)
      T[v] = String.fromCharCode(d[v]);
    return T.join("");
  }
  function fr(d, T) {
    var v = V(d, T);
    switch (T && T.type || "buffer") {
      case "file":
        return o(), l.writeFileSync(T.filename, v), v;
      case "binary":
        return typeof v == "string" ? v : Ie(v);
      case "base64":
        return Dt(typeof v == "string" ? v : Ie(v));
      case "buffer":
        if (ue)
          return Buffer.isBuffer(v) ? v : Ir(v);
      case "array":
        return typeof v == "string" ? pr(v) : v;
    }
    return v;
  }
  var er;
  function S(d) {
    try {
      var T = d.InflateRaw, v = new T();
      if (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag), v.bytesRead)
        er = d;
      else
        throw new Error("zlib does not expose bytesRead");
    } catch (m) {
      console.error("cannot use native zlib: " + (m.message || m));
    }
  }
  function P(d, T) {
    if (!er)
      return C0(d, T);
    var v = er.InflateRaw, m = new v(), E = m._processChunk(d.slice(d.l), m._finishFlushFlag);
    return d.l += m.bytesRead, E;
  }
  function y(d) {
    return er ? er.deflateRawSync(d) : E0(d);
  }
  var F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], H = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], ie = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function se(d) {
    var T = (d << 1 | d << 11) & 139536 | (d << 5 | d << 15) & 558144;
    return (T >> 16 | T >> 8 | T) & 255;
  }
  for (var ae = typeof Uint8Array < "u", Z = ae ? new Uint8Array(1 << 8) : [], Te = 0; Te < 1 << 8; ++Te)
    Z[Te] = se(Te);
  function ce(d, T) {
    var v = Z[d & 255];
    return T <= 8 ? v >>> 8 - T : (v = v << 8 | Z[d >> 8 & 255], T <= 16 ? v >>> 16 - T : (v = v << 8 | Z[d >> 16 & 255], v >>> 24 - T));
  }
  function ze(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 6 ? 0 : d[m + 1] << 8)) >>> v & 3;
  }
  function xe(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 5 ? 0 : d[m + 1] << 8)) >>> v & 7;
  }
  function Sr(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 4 ? 0 : d[m + 1] << 8)) >>> v & 15;
  }
  function Ae(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 3 ? 0 : d[m + 1] << 8)) >>> v & 31;
  }
  function ne(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 1 ? 0 : d[m + 1] << 8)) >>> v & 127;
  }
  function or(d, T, v) {
    var m = T & 7, E = T >>> 3, w = (1 << v) - 1, N = d[E] >>> m;
    return v < 8 - m || (N |= d[E + 1] << 8 - m, v < 16 - m) || (N |= d[E + 2] << 16 - m, v < 24 - m) || (N |= d[E + 3] << 24 - m), N & w;
  }
  function Ar(d, T, v) {
    var m = T & 7, E = T >>> 3;
    return m <= 5 ? d[E] |= (v & 7) << m : (d[E] |= v << m & 255, d[E + 1] = (v & 7) >> 8 - m), T + 3;
  }
  function Hr(d, T, v) {
    var m = T & 7, E = T >>> 3;
    return v = (v & 1) << m, d[E] |= v, T + 1;
  }
  function rt(d, T, v) {
    var m = T & 7, E = T >>> 3;
    return v <<= m, d[E] |= v & 255, v >>>= 8, d[E + 1] = v, T + 8;
  }
  function T0(d, T, v) {
    var m = T & 7, E = T >>> 3;
    return v <<= m, d[E] |= v & 255, v >>>= 8, d[E + 1] = v & 255, d[E + 2] = v >>> 8, T + 16;
  }
  function yn(d, T) {
    var v = d.length, m = 2 * v > T ? 2 * v : T + 5, E = 0;
    if (v >= T)
      return d;
    if (ue) {
      var w = M0(m);
      if (d.copy)
        d.copy(w);
      else
        for (; E < d.length; ++E)
          w[E] = d[E];
      return w;
    } else if (ae) {
      var N = new Uint8Array(m);
      if (N.set)
        N.set(d);
      else
        for (; E < v; ++E)
          N[E] = d[E];
      return N;
    }
    return d.length = m, d;
  }
  function _r(d) {
    for (var T = new Array(d), v = 0; v < d; ++v)
      T[v] = 0;
    return T;
  }
  function Vt(d, T, v) {
    var m = 1, E = 0, w = 0, N = 0, b = 0, D = d.length, I = ae ? new Uint16Array(32) : _r(32);
    for (w = 0; w < 32; ++w)
      I[w] = 0;
    for (w = D; w < v; ++w)
      d[w] = 0;
    D = d.length;
    var k = ae ? new Uint16Array(D) : _r(D);
    for (w = 0; w < D; ++w)
      I[E = d[w]]++, m < E && (m = E), k[w] = 0;
    for (I[0] = 0, w = 1; w <= m; ++w)
      I[w + 16] = b = b + I[w - 1] << 1;
    for (w = 0; w < D; ++w)
      b = d[w], b != 0 && (k[w] = I[b + 16]++);
    var X = 0;
    for (w = 0; w < D; ++w)
      if (X = d[w], X != 0)
        for (b = ce(k[w], m) >> m - X, N = (1 << m + 4 - X) - 1; N >= 0; --N)
          T[b | N << X] = X & 15 | w << 4;
    return m;
  }
  var Cn = ae ? new Uint16Array(512) : _r(512), On = ae ? new Uint16Array(32) : _r(32);
  if (!ae) {
    for (var Vr = 0; Vr < 512; ++Vr)
      Cn[Vr] = 0;
    for (Vr = 0; Vr < 32; ++Vr)
      On[Vr] = 0;
  }
  (function() {
    for (var d = [], T = 0; T < 32; T++)
      d.push(5);
    Vt(d, On, 32);
    var v = [];
    for (T = 0; T <= 143; T++)
      v.push(8);
    for (; T <= 255; T++)
      v.push(9);
    for (; T <= 279; T++)
      v.push(7);
    for (; T <= 287; T++)
      v.push(8);
    Vt(v, Cn, 288);
  })();
  var ds = /* @__PURE__ */ function() {
    for (var T = ae ? new Uint8Array(32768) : [], v = 0, m = 0; v < ie.length - 1; ++v)
      for (; m < ie[v + 1]; ++m)
        T[m] = v;
    for (; m < 32768; ++m)
      T[m] = 29;
    var E = ae ? new Uint8Array(259) : [];
    for (v = 0, m = 0; v < H.length - 1; ++v)
      for (; m < H[v + 1]; ++m)
        E[m] = v;
    function w(b, D) {
      for (var I = 0; I < b.length; ) {
        var k = Math.min(65535, b.length - I), X = I + k == b.length;
        for (D.write_shift(1, +X), D.write_shift(2, k), D.write_shift(2, ~k & 65535); k-- > 0; )
          D[D.l++] = b[I++];
      }
      return D.l;
    }
    function N(b, D) {
      for (var I = 0, k = 0, X = ae ? new Uint16Array(32768) : []; k < b.length; ) {
        var q = Math.min(65535, b.length - k);
        if (q < 10) {
          for (I = Ar(D, I, +(k + q == b.length)), I & 7 && (I += 8 - (I & 7)), D.l = I / 8 | 0, D.write_shift(2, q), D.write_shift(2, ~q & 65535); q-- > 0; )
            D[D.l++] = b[k++];
          I = D.l * 8;
          continue;
        }
        I = Ar(D, I, +(k + q == b.length) + 2);
        for (var te = 0; q-- > 0; ) {
          var K = b[k];
          te = (te << 5 ^ K) & 32767;
          var ee = -1, fe = 0;
          if ((ee = X[te]) && (ee |= k & -32768, ee > k && (ee -= 32768), ee < k))
            for (; b[ee + fe] == b[k + fe] && fe < 250; )
              ++fe;
          if (fe > 2) {
            K = E[fe], K <= 22 ? I = rt(D, I, Z[K + 1] >> 1) - 1 : (rt(D, I, 3), I += 5, rt(D, I, Z[K - 23] >> 5), I += 3);
            var we = K < 8 ? 0 : K - 4 >> 2;
            we > 0 && (T0(D, I, fe - H[K]), I += we), K = T[k - ee], I = rt(D, I, Z[K] >> 3), I -= 3;
            var Se = K < 4 ? 0 : K - 2 >> 1;
            Se > 0 && (T0(D, I, k - ee - ie[K]), I += Se);
            for (var Xe = 0; Xe < fe; ++Xe)
              X[te] = k & 32767, te = (te << 5 ^ b[k]) & 32767, ++k;
            q -= fe - 1;
          } else
            K <= 143 ? K = K + 48 : I = Hr(D, I, 1), I = rt(D, I, Z[K]), X[te] = k & 32767, ++k;
        }
        I = rt(D, I, 0) - 1;
      }
      return D.l = (I + 7) / 8 | 0, D.l;
    }
    return function(D, I) {
      return D.length < 8 ? w(D, I) : N(D, I);
    };
  }();
  function E0(d) {
    var T = M(50 + Math.floor(d.length * 1.1)), v = ds(d, T);
    return T.slice(0, v);
  }
  var w0 = ae ? new Uint16Array(32768) : _r(32768), S0 = ae ? new Uint16Array(32768) : _r(32768), A0 = ae ? new Uint16Array(128) : _r(128), F0 = 1, y0 = 1;
  function ps(d, T) {
    var v = Ae(d, T) + 257;
    T += 5;
    var m = Ae(d, T) + 1;
    T += 5;
    var E = Sr(d, T) + 4;
    T += 4;
    for (var w = 0, N = ae ? new Uint8Array(19) : _r(19), b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], D = 1, I = ae ? new Uint8Array(8) : _r(8), k = ae ? new Uint8Array(8) : _r(8), X = N.length, q = 0; q < E; ++q)
      N[F[q]] = w = xe(d, T), D < w && (D = w), I[w]++, T += 3;
    var te = 0;
    for (I[0] = 0, q = 1; q <= D; ++q)
      k[q] = te = te + I[q - 1] << 1;
    for (q = 0; q < X; ++q)
      (te = N[q]) != 0 && (b[q] = k[te]++);
    var K = 0;
    for (q = 0; q < X; ++q)
      if (K = N[q], K != 0) {
        te = Z[b[q]] >> 8 - K;
        for (var ee = (1 << 7 - K) - 1; ee >= 0; --ee)
          A0[te | ee << K] = K & 7 | q << 3;
      }
    var fe = [];
    for (D = 1; fe.length < v + m; )
      switch (te = A0[ne(d, T)], T += te & 7, te >>>= 3) {
        case 16:
          for (w = 3 + ze(d, T), T += 2, te = fe[fe.length - 1]; w-- > 0; )
            fe.push(te);
          break;
        case 17:
          for (w = 3 + xe(d, T), T += 3; w-- > 0; )
            fe.push(0);
          break;
        case 18:
          for (w = 11 + ne(d, T), T += 7; w-- > 0; )
            fe.push(0);
          break;
        default:
          fe.push(te), D < te && (D = te);
          break;
      }
    var we = fe.slice(0, v), Se = fe.slice(v);
    for (q = v; q < 286; ++q)
      we[q] = 0;
    for (q = m; q < 30; ++q)
      Se[q] = 0;
    return F0 = Vt(we, w0, 286), y0 = Vt(Se, S0, 30), T;
  }
  function vs(d, T) {
    if (d[0] == 3 && !(d[1] & 3))
      return [zr(T), 2];
    for (var v = 0, m = 0, E = M0(T || 1 << 18), w = 0, N = E.length >>> 0, b = 0, D = 0; (m & 1) == 0; ) {
      if (m = xe(d, v), v += 3, m >>> 1 == 0) {
        v & 7 && (v += 8 - (v & 7));
        var I = d[v >>> 3] | d[(v >>> 3) + 1] << 8;
        if (v += 32, I > 0)
          for (!T && N < w + I && (E = yn(E, w + I), N = E.length); I-- > 0; )
            E[w++] = d[v >>> 3], v += 8;
        continue;
      } else
        m >> 1 == 1 ? (b = 9, D = 5) : (v = ps(d, v), b = F0, D = y0);
      for (; ; ) {
        !T && N < w + 32767 && (E = yn(E, w + 32767), N = E.length);
        var k = or(d, v, b), X = m >>> 1 == 1 ? Cn[k] : w0[k];
        if (v += X & 15, X >>>= 4, (X >>> 8 & 255) === 0)
          E[w++] = X;
        else {
          if (X == 256)
            break;
          X -= 257;
          var q = X < 8 ? 0 : X - 4 >> 2;
          q > 5 && (q = 0);
          var te = w + H[X];
          q > 0 && (te += or(d, v, q), v += q), k = or(d, v, D), X = m >>> 1 == 1 ? On[k] : S0[k], v += X & 15, X >>>= 4;
          var K = X < 4 ? 0 : X - 2 >> 1, ee = ie[X];
          for (K > 0 && (ee += or(d, v, K), v += K), !T && N < te && (E = yn(E, te + 100), N = E.length); w < te; )
            E[w] = E[w - ee], ++w;
        }
      }
    }
    return T ? [E, v + 7 >>> 3] : [E.slice(0, w), v + 7 >>> 3];
  }
  function C0(d, T) {
    var v = d.slice(d.l || 0), m = vs(v, T);
    return d.l += m[1], m[0];
  }
  function O0(d, T) {
    if (d)
      typeof console < "u" && console.error(T);
    else
      throw new Error(T);
  }
  function R0(d, T) {
    var v = d;
    tr(v, 0);
    var m = [], E = [], w = {
      FileIndex: m,
      FullPaths: E
    };
    R(w, { root: T.root });
    for (var N = v.length - 4; (v[N] != 80 || v[N + 1] != 75 || v[N + 2] != 5 || v[N + 3] != 6) && N >= 0; )
      --N;
    v.l = N + 4, v.l += 4;
    var b = v.read_shift(2);
    v.l += 6;
    var D = v.read_shift(4);
    for (v.l = D, N = 0; N < b; ++N) {
      v.l += 20;
      var I = v.read_shift(4), k = v.read_shift(4), X = v.read_shift(2), q = v.read_shift(2), te = v.read_shift(2);
      v.l += 8;
      var K = v.read_shift(4), ee = f(v.slice(v.l + X, v.l + X + q));
      v.l += X + q + te;
      var fe = v.l;
      v.l = K + 4, ms(v, I, k, w, ee), v.l = fe;
    }
    return w;
  }
  function ms(d, T, v, m, E) {
    d.l += 2;
    var w = d.read_shift(2), N = d.read_shift(2), b = s(d);
    if (w & 8257)
      throw new Error("Unsupported ZIP encryption");
    for (var D = d.read_shift(4), I = d.read_shift(4), k = d.read_shift(4), X = d.read_shift(2), q = d.read_shift(2), te = "", K = 0; K < X; ++K)
      te += String.fromCharCode(d[d.l++]);
    if (q) {
      var ee = f(d.slice(d.l, d.l + q));
      (ee[21589] || {}).mt && (b = ee[21589].mt), ((E || {})[21589] || {}).mt && (b = E[21589].mt);
    }
    d.l += q;
    var fe = d.slice(d.l, d.l + I);
    switch (N) {
      case 8:
        fe = P(d, k);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + N);
    }
    var we = !1;
    w & 8 && (D = d.read_shift(4), D == 134695760 && (D = d.read_shift(4), we = !0), I = d.read_shift(4), k = d.read_shift(4)), I != T && O0(we, "Bad compressed size: " + T + " != " + I), k != v && O0(we, "Bad uncompressed size: " + v + " != " + k), Rn(m, te, fe, { unsafe: !0, mt: b });
  }
  function gs(d, T) {
    var v = T || {}, m = [], E = [], w = M(1), N = v.compression ? 8 : 0, b = 0, D = 0, I = 0, k = 0, X = 0, q = d.FullPaths[0], te = q, K = d.FileIndex[0], ee = [], fe = 0;
    for (D = 1; D < d.FullPaths.length; ++D)
      if (te = d.FullPaths[D].slice(q.length), K = d.FileIndex[D], !(!K.size || !K.content || te == "Sh33tJ5")) {
        var we = k, Se = M(te.length);
        for (I = 0; I < te.length; ++I)
          Se.write_shift(1, te.charCodeAt(I) & 127);
        Se = Se.slice(0, Se.l), ee[X] = mo.buf(K.content, 0);
        var Xe = K.content;
        N == 8 && (Xe = y(Xe)), w = M(30), w.write_shift(4, 67324752), w.write_shift(2, 20), w.write_shift(2, b), w.write_shift(2, N), K.mt ? i(w, K.mt) : w.write_shift(4, 0), w.write_shift(-4, ee[X]), w.write_shift(4, Xe.length), w.write_shift(4, K.content.length), w.write_shift(2, Se.length), w.write_shift(2, 0), k += w.length, m.push(w), k += Se.length, m.push(Se), k += Xe.length, m.push(Xe), w = M(46), w.write_shift(4, 33639248), w.write_shift(2, 0), w.write_shift(2, 20), w.write_shift(2, b), w.write_shift(2, N), w.write_shift(4, 0), w.write_shift(-4, ee[X]), w.write_shift(4, Xe.length), w.write_shift(4, K.content.length), w.write_shift(2, Se.length), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(4, 0), w.write_shift(4, we), fe += w.l, E.push(w), fe += Se.length, E.push(Se), ++X;
      }
    return w = M(22), w.write_shift(4, 101010256), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, X), w.write_shift(2, X), w.write_shift(4, fe), w.write_shift(4, k), w.write_shift(2, 0), We([We(m), We(E), w]);
  }
  var Gt = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function _s(d, T) {
    if (d.ctype)
      return d.ctype;
    var v = d.name || "", m = v.match(/\.([^\.]+)$/);
    return m && Gt[m[1]] || T && (m = (v = T).match(/[\.\\]([^\.\\])+$/), m && Gt[m[1]]) ? Gt[m[1]] : "application/octet-stream";
  }
  function Ts(d) {
    for (var T = Dt(d), v = [], m = 0; m < T.length; m += 76)
      v.push(T.slice(m, m + 76));
    return v.join(`\r
`) + `\r
`;
  }
  function Es(d) {
    var T = d.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(I) {
      var k = I.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (k.length == 1 ? "0" + k : k);
    });
    T = T.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), T.charAt(0) == `
` && (T = "=0D" + T.slice(1)), T = T.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var v = [], m = T.split(`\r
`), E = 0; E < m.length; ++E) {
      var w = m[E];
      if (w.length == 0) {
        v.push("");
        continue;
      }
      for (var N = 0; N < w.length; ) {
        var b = 76, D = w.slice(N, N + b);
        D.charAt(b - 1) == "=" ? b-- : D.charAt(b - 2) == "=" ? b -= 2 : D.charAt(b - 3) == "=" && (b -= 3), D = w.slice(N, N + b), N += b, N < w.length && (D += "="), v.push(D);
      }
    }
    return v.join(`\r
`);
  }
  function ws(d) {
    for (var T = [], v = 0; v < d.length; ++v) {
      for (var m = d[v]; v <= d.length && m.charAt(m.length - 1) == "="; )
        m = m.slice(0, m.length - 1) + d[++v];
      T.push(m);
    }
    for (var E = 0; E < T.length; ++E)
      T[E] = T[E].replace(/[=][0-9A-Fa-f]{2}/g, function(w) {
        return String.fromCharCode(parseInt(w.slice(1), 16));
      });
    return pr(T.join(`\r
`));
  }
  function Ss(d, T, v) {
    for (var m = "", E = "", w = "", N, b = 0; b < 10; ++b) {
      var D = T[b];
      if (!D || D.match(/^\s*$/))
        break;
      var I = D.match(/^(.*?):\s*([^\s].*)$/);
      if (I)
        switch (I[1].toLowerCase()) {
          case "content-location":
            m = I[2].trim();
            break;
          case "content-type":
            w = I[2].trim();
            break;
          case "content-transfer-encoding":
            E = I[2].trim();
            break;
        }
    }
    switch (++b, E.toLowerCase()) {
      case "base64":
        N = pr(Dr(T.slice(b).join("")));
        break;
      case "quoted-printable":
        N = ws(T.slice(b));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + E);
    }
    var k = Rn(d, m.slice(v.length), N, { unsafe: !0 });
    w && (k.ctype = w);
  }
  function As(d, T) {
    if (Ie(d.slice(0, 13)).toLowerCase() != "mime-version:")
      throw new Error("Unsupported MAD header");
    var v = T && T.root || "", m = (ue && Buffer.isBuffer(d) ? d.toString("binary") : Ie(d)).split(`\r
`), E = 0, w = "";
    for (E = 0; E < m.length; ++E)
      if (w = m[E], !!/^Content-Location:/i.test(w) && (w = w.slice(w.indexOf("file")), v || (v = w.slice(0, w.lastIndexOf("/") + 1)), w.slice(0, v.length) != v))
        for (; v.length > 0 && (v = v.slice(0, v.length - 1), v = v.slice(0, v.lastIndexOf("/") + 1), w.slice(0, v.length) != v); )
          ;
    var N = (m[1] || "").match(/boundary="(.*?)"/);
    if (!N)
      throw new Error("MAD cannot find boundary");
    var b = "--" + (N[1] || ""), D = [], I = [], k = {
      FileIndex: D,
      FullPaths: I
    };
    R(k);
    var X, q = 0;
    for (E = 0; E < m.length; ++E) {
      var te = m[E];
      te !== b && te !== b + "--" || (q++ && Ss(k, m.slice(X, E), v), X = E);
    }
    return k;
  }
  function Fs(d, T) {
    var v = T || {}, m = v.boundary || "SheetJS";
    m = "------=" + m;
    for (var E = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + m.slice(2) + '"',
      "",
      "",
      ""
    ], w = d.FullPaths[0], N = w, b = d.FileIndex[0], D = 1; D < d.FullPaths.length; ++D)
      if (N = d.FullPaths[D].slice(w.length), b = d.FileIndex[D], !(!b.size || !b.content || N == "Sh33tJ5")) {
        N = N.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(fe) {
          return "_x" + fe.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(fe) {
          return "_u" + fe.charCodeAt(0).toString(16) + "_";
        });
        for (var I = b.content, k = ue && Buffer.isBuffer(I) ? I.toString("binary") : Ie(I), X = 0, q = Math.min(1024, k.length), te = 0, K = 0; K <= q; ++K)
          (te = k.charCodeAt(K)) >= 32 && te < 128 && ++X;
        var ee = X >= q * 4 / 5;
        E.push(m), E.push("Content-Location: " + (v.root || "file:///C:/SheetJS/") + N), E.push("Content-Transfer-Encoding: " + (ee ? "quoted-printable" : "base64")), E.push("Content-Type: " + _s(b, N)), E.push(""), E.push(ee ? Es(k) : Ts(k));
      }
    return E.push(m + `--\r
`), E.join(`\r
`);
  }
  function ys(d) {
    var T = {};
    return R(T, d), T;
  }
  function Rn(d, T, v, m) {
    var E = m && m.unsafe;
    E || R(d);
    var w = !E && _e.find(d, T);
    if (!w) {
      var N = d.FullPaths[0];
      T.slice(0, N.length) == N ? N = T : (N.slice(-1) != "/" && (N += "/"), N = (N + T).replace("//", "/")), w = { name: a(T), type: 2 }, d.FileIndex.push(w), d.FullPaths.push(N), E || _e.utils.cfb_gc(d);
    }
    return w.content = v, w.size = v ? v.length : 0, m && (m.CLSID && (w.clsid = m.CLSID), m.mt && (w.mt = m.mt), m.ct && (w.ct = m.ct)), w;
  }
  function Cs(d, T) {
    R(d);
    var v = _e.find(d, T);
    if (v) {
      for (var m = 0; m < d.FileIndex.length; ++m)
        if (d.FileIndex[m] == v)
          return d.FileIndex.splice(m, 1), d.FullPaths.splice(m, 1), !0;
    }
    return !1;
  }
  function Os(d, T, v) {
    R(d);
    var m = _e.find(d, T);
    if (m) {
      for (var E = 0; E < d.FileIndex.length; ++E)
        if (d.FileIndex[E] == m)
          return d.FileIndex[E].name = a(v), d.FullPaths[E] = v, !0;
    }
    return !1;
  }
  function Rs(d) {
    L(d, !0);
  }
  return t.find = G, t.read = Q, t.parse = c, t.write = fr, t.writeFile = ur, t.utils = {
    cfb_new: ys,
    cfb_add: Rn,
    cfb_del: Cs,
    cfb_mov: Os,
    cfb_gc: Rs,
    ReadShift: Ft,
    CheckField: ui,
    prep_blob: tr,
    bconcat: We,
    use_zlib: S,
    _deflateRaw: E0,
    _inflateRaw: C0,
    consts: Ce
  }, t;
}();
function go(e) {
  return typeof e == "string" ? gn(e) : Array.isArray(e) ? Gf(e) : e;
}
function Mt(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string")
      switch (r) {
        case "utf8":
          t = new TextEncoder(r).encode(t);
          break;
        case "binary":
          t = gn(t);
          break;
        default:
          throw new Error("Unsupported encoding " + r);
      }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? yr(t) : t;
  if (typeof IE_SaveFile < "u")
    return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([go(n)], { type: "application/octet-stream" });
    if (typeof navigator < "u" && navigator.msSaveBlob)
      return navigator.msSaveBlob(a, e);
    if (typeof saveAs < "u")
      return saveAs(a, e);
    if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
      var i = URL.createObjectURL(a);
      if (typeof chrome == "object" && typeof (chrome.downloads || {}).download == "function")
        return URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), chrome.downloads.download({ url: i, filename: e, saveAs: !0 });
      var s = document.createElement("a");
      if (s.download != null)
        return s.download = e, s.href = i, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), i;
    }
  }
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u")
    try {
      var f = File(e);
      return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = Bt(t)), f.write(t), f.close(), t;
    } catch (l) {
      if (!l.message || !l.message.match(/onstruct/))
        throw l;
    }
  throw new Error("cannot save file " + e);
}
function Ge(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n)
    Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function j0(e, t) {
  for (var r = [], n = Ge(e), a = 0; a !== n.length; ++a)
    r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function r0(e) {
  for (var t = [], r = Ge(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = r[n];
  return t;
}
function En(e) {
  for (var t = [], r = Ge(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function _o(e) {
  for (var t = [], r = Ge(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var sn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function Ze(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  t && (r -= 1462 * 24 * 60 * 60 * 1e3);
  var n = /* @__PURE__ */ sn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ sn.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var Ya = /* @__PURE__ */ new Date(), To = /* @__PURE__ */ sn.getTime() + (/* @__PURE__ */ Ya.getTimezoneOffset() - /* @__PURE__ */ sn.getTimezoneOffset()) * 6e4, $0 = /* @__PURE__ */ Ya.getTimezoneOffset();
function Ja(e) {
  var t = new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + To), t.getTimezoneOffset() !== $0 && t.setTime(t.getTime() + (t.getTimezoneOffset() - $0) * 6e4), t;
}
var z0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), qa = /* @__PURE__ */ isNaN(/* @__PURE__ */ z0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : z0, Eo = /* @__PURE__ */ qa.getFullYear() == 2017;
function Je(e, t) {
  var r = new Date(e);
  if (Eo)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date)
    return e;
  if (qa.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function wn(e, t) {
  if (ue && Buffer.isBuffer(e)) {
    if (t) {
      if (e[0] == 255 && e[1] == 254)
        return yr(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255)
        return yr(Vf(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u")
    try {
      if (t) {
        if (e[0] == 255 && e[1] == 254)
          return yr(new TextDecoder("utf-16le").decode(e.slice(2)));
        if (e[0] == 254 && e[1] == 255)
          return yr(new TextDecoder("utf-16be").decode(e.slice(2)));
      }
      var r = {
        "\u20AC": "\x80",
        "\u201A": "\x82",
        \u0192: "\x83",
        "\u201E": "\x84",
        "\u2026": "\x85",
        "\u2020": "\x86",
        "\u2021": "\x87",
        "\u02C6": "\x88",
        "\u2030": "\x89",
        \u0160: "\x8A",
        "\u2039": "\x8B",
        \u0152: "\x8C",
        \u017D: "\x8E",
        "\u2018": "\x91",
        "\u2019": "\x92",
        "\u201C": "\x93",
        "\u201D": "\x94",
        "\u2022": "\x95",
        "\u2013": "\x96",
        "\u2014": "\x97",
        "\u02DC": "\x98",
        "\u2122": "\x99",
        \u0161: "\x9A",
        "\u203A": "\x9B",
        \u0153: "\x9C",
        \u017E: "\x9E",
        \u0178: "\x9F"
      };
      return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(i) {
        return r[i] || i;
      });
    } catch {
    }
  for (var n = [], a = 0; a != e.length; ++a)
    n.push(String.fromCharCode(e[a]));
  return n.join("");
}
function Qe(e) {
  if (typeof JSON < "u" && !Array.isArray(e))
    return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null)
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = Qe(e[r]));
  return t;
}
function Fe(e, t) {
  for (var r = ""; r.length < t; )
    r += e;
  return r;
}
function Or(e) {
  var t = Number(e);
  if (!isNaN(t))
    return isFinite(t) ? t : NaN;
  if (!/\d/.test(e))
    return t;
  var r = 1, n = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return r *= 100, "";
  });
  return !isNaN(t = Number(n)) || (n = n.replace(/[(](.*)[)]/, function(a, i) {
    return r = -r, i;
  }), !isNaN(t = Number(n))) ? t / r : t;
}
var wo = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Nt(e) {
  var t = new Date(e), r = new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i))
    return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && wo.indexOf(s) == -1)
      return r;
  } else if (s.match(/[a-z]/))
    return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
function le(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return ue ? n = Ir(r) : n = Xf(r), _e.utils.cfb_add(e, t, n);
    }
    _e.utils.cfb_add(e, t, r);
  } else
    e.file(t, r);
}
function t0() {
  return _e.utils.cfb_new();
}
var De = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, So = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, n0 = /* @__PURE__ */ r0(So), a0 = /[&<>'"]/g, Ao = /[\u0000-\u0008\u000b-\u001f]/g;
function ve(e) {
  var t = e + "";
  return t.replace(a0, function(r) {
    return n0[r];
  }).replace(Ao, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function K0(e) {
  return ve(e).replace(/ /g, "_x0020_");
}
var Za = /[\u0000-\u001f]/g;
function Fo(e) {
  var t = e + "";
  return t.replace(a0, function(r) {
    return n0[r];
  }).replace(/\n/g, "<br/>").replace(Za, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function yo(e) {
  var t = e + "";
  return t.replace(a0, function(r) {
    return n0[r];
  }).replace(Za, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function Co(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function Oo(e) {
  switch (e) {
    case 1:
    case !0:
    case "1":
    case "true":
    case "TRUE":
      return !0;
    default:
      return !1;
  }
}
function Ln(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0; r < e.length; ) {
    if (n = e.charCodeAt(r++), n < 128) {
      t += String.fromCharCode(n);
      continue;
    }
    if (a = e.charCodeAt(r++), n > 191 && n < 224) {
      s = (n & 31) << 6, s |= a & 63, t += String.fromCharCode(s);
      continue;
    }
    if (i = e.charCodeAt(r++), n < 240) {
      t += String.fromCharCode((n & 15) << 12 | (a & 63) << 6 | i & 63);
      continue;
    }
    s = e.charCodeAt(r++), f = ((n & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, t += String.fromCharCode(55296 + (f >>> 10 & 1023)), t += String.fromCharCode(56320 + (f & 1023));
  }
  return t;
}
function Y0(e) {
  var t = zr(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function J0(e) {
  return Ir(e, "binary").toString("utf8");
}
var zt = "foo bar baz\xE2\x98\x83\xF0\x9F\x8D\xA3", At = ue && (/* @__PURE__ */ J0(zt) == /* @__PURE__ */ Ln(zt) && J0 || /* @__PURE__ */ Y0(zt) == /* @__PURE__ */ Ln(zt) && Y0) || Ln, yr = ue ? function(e) {
  return Ir(e, "utf8").toString("binary");
} : function(e) {
  for (var t = [], r = 0, n = 0, a = 0; r < e.length; )
    switch (n = e.charCodeAt(r++), !0) {
      case n < 128:
        t.push(String.fromCharCode(n));
        break;
      case n < 2048:
        t.push(String.fromCharCode(192 + (n >> 6))), t.push(String.fromCharCode(128 + (n & 63)));
        break;
      case (n >= 55296 && n < 57344):
        n -= 55296, a = e.charCodeAt(r++) - 56320 + (n << 10), t.push(String.fromCharCode(240 + (a >> 18 & 7))), t.push(String.fromCharCode(144 + (a >> 12 & 63))), t.push(String.fromCharCode(128 + (a >> 6 & 63))), t.push(String.fromCharCode(128 + (a & 63)));
        break;
      default:
        t.push(String.fromCharCode(224 + (n >> 12))), t.push(String.fromCharCode(128 + (n >> 6 & 63))), t.push(String.fromCharCode(128 + (n & 63)));
    }
  return t.join("");
}, Ro = /* @__PURE__ */ function() {
  var e = [
    ["nbsp", " "],
    ["middot", "\xB7"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(t) {
    return [new RegExp("&" + t[0] + ";", "ig"), t[1]];
  });
  return function(r) {
    for (var n = r.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), a = 0; a < e.length; ++a)
      n = n.replace(e[a][0], e[a][1]);
    return n;
  };
}(), Qa = /(^\s|\s$|\n)/;
function He(e, t) {
  return "<" + e + (t.match(Qa) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function It(e) {
  return Ge(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function Y(e, t, r) {
  return "<" + e + (r != null ? It(r) : "") + (t != null ? (t.match(Qa) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function Xn(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t)
      throw r;
  }
  return "";
}
function Do(e, t) {
  switch (typeof e) {
    case "string":
      var r = Y("vt:lpwstr", ve(e));
      return t && (r = r.replace(/&quot;/g, "_x0022_")), r;
    case "number":
      return Y((e | 0) == e ? "vt:i4" : "vt:r8", ve(String(e)));
    case "boolean":
      return Y("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date)
    return Y("vt:filetime", Xn(e));
  throw new Error("Unable to serialize " + e);
}
var ke = {
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  CT: "http://schemas.openxmlformats.org/package/2006/content-types",
  RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
  TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  xsd: "http://www.w3.org/2001/XMLSchema"
}, xt = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], nr = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function No(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i)
    a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function Io(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256)
    e[r + f] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var q0 = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n)
    if (e[0][n])
      for (var a = 0, i = e[0][n].length; a < i; a += r)
        t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, Z0 = ue ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Ir(t);
  })) : q0(e);
} : q0, Q0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2)
    n.push(String.fromCharCode(wt(e, a)));
  return n.join("").replace(St, "");
}, i0 = ue ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(St, "") : Q0(e, t, r);
} : Q0, ea = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a)
    n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, ei = ue ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : ea(e, t, r);
} : ea, ra = function(e, t, r) {
  for (var n = [], a = t; a < r; a++)
    n.push(String.fromCharCode(it(e, a)));
  return n.join("");
}, bt = ue ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : ra(t, r, n);
} : ra, ri = function(e, t) {
  var r = ar(e, t);
  return r > 0 ? bt(e, t + 4, t + 4 + r - 1) : "";
}, ti = ri, ni = function(e, t) {
  var r = ar(e, t);
  return r > 0 ? bt(e, t + 4, t + 4 + r - 1) : "";
}, ai = ni, ii = function(e, t) {
  var r = 2 * ar(e, t);
  return r > 0 ? bt(e, t + 4, t + 4 + r - 1) : "";
}, si = ii, fi = function(t, r) {
  var n = ar(t, r);
  return n > 0 ? i0(t, r + 4, r + 4 + n) : "";
}, oi = fi, li = function(e, t) {
  var r = ar(e, t);
  return r > 0 ? bt(e, t + 4, t + 4 + r) : "";
}, ci = li, hi = function(e, t) {
  return No(e, t);
}, fn = hi, s0 = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
ue && (ti = function(t, r) {
  if (!Buffer.isBuffer(t))
    return ri(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, ai = function(t, r) {
  if (!Buffer.isBuffer(t))
    return ni(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, si = function(t, r) {
  if (!Buffer.isBuffer(t))
    return ii(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, oi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return fi(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, ci = function(t, r) {
  if (!Buffer.isBuffer(t))
    return li(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, fn = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : hi(t, r);
}, s0 = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var it = function(e, t) {
  return e[t];
}, wt = function(e, t) {
  return e[t + 1] * (1 << 8) + e[t];
}, ko = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, ar = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, jr = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, Po = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function Ft(e, t) {
  var r = "", n, a, i = [], s, f, l, o;
  switch (t) {
    case "dbcs":
      if (o = this.l, ue && Buffer.isBuffer(this))
        r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else
        for (l = 0; l < e; ++l)
          r += String.fromCharCode(wt(this, o)), o += 2;
      e *= 2;
      break;
    case "utf8":
      r = bt(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = i0(this, this.l, this.l + e);
      break;
    case "wstr":
      return Ft.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = ti(this, this.l), e = 4 + ar(this, this.l);
      break;
    case "lpstr-cp":
      r = ai(this, this.l), e = 4 + ar(this, this.l);
      break;
    case "lpwstr":
      r = si(this, this.l), e = 4 + 2 * ar(this, this.l);
      break;
    case "lpp4":
      e = 4 + ar(this, this.l), r = oi(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + ar(this, this.l), r = ci(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = it(this, this.l + e++)) !== 0; )
        i.push(Xt(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = wt(this, this.l + e)) !== 0; )
        i.push(Xt(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", o = this.l, l = 0; l < e; ++l) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = it(this, o), this.l = o + 1, f = Ft.call(this, e - l, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Xt(wt(this, o))), o += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", o = this.l, l = 0; l != e; ++l) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = it(this, o), this.l = o + 1, f = Ft.call(this, e - l, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Xt(it(this, o))), o += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = it(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? ko : wt)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || (this[this.l + 3] & 128) === 0 ? (n = (e > 0 ? jr : Po)(this, this.l), this.l += 4, n) : (a = ar(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = fn(this, this.l) : a = fn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = ei(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var Lo = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, Bo = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, Mo = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function bo(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a)
      Mo(this, t.charCodeAt(a), this.l + 2 * a);
    n = 2 * t.length;
  } else if (r === "sbcs") {
    for (t = t.replace(/[^\x00-\x7F]/g, "_"), a = 0; a != t.length; ++a)
      this[this.l + a] = t.charCodeAt(a) & 255;
    n = t.length;
  } else if (r === "hex") {
    for (; a < e; ++a)
      this[this.l++] = parseInt(t.slice(2 * a, 2 * a + 2), 16) || 0;
    return this;
  } else if (r === "utf16le") {
    var i = Math.min(this.l + e, this.length);
    for (a = 0; a < Math.min(t.length, e); ++a) {
      var s = t.charCodeAt(a);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < i; )
      this[this.l++] = 0;
    return this;
  } else
    switch (e) {
      case 1:
        n = 1, this[this.l] = t & 255;
        break;
      case 2:
        n = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
        break;
      case 3:
        n = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
        break;
      case 4:
        n = 4, Lo(this, t, this.l);
        break;
      case 8:
        if (n = 8, r === "f") {
          Io(this, t, this.l);
          break;
        }
      case 16:
        break;
      case -4:
        n = 4, Bo(this, t, this.l);
        break;
    }
  return this.l += n, this;
}
function ui(e, t) {
  var r = ei(this, this.l, e.length >> 1);
  if (r !== e)
    throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function tr(e, t) {
  e.l = t, e.read_shift = Ft, e.chk = ui, e.write_shift = bo;
}
function wr(e, t) {
  e.l += t;
}
function M(e) {
  var t = zr(e);
  return tr(t, 0), t;
}
function qe() {
  var e = [], t = ue ? 256 : 2048, r = function(o) {
    var c = M(o);
    return tr(c, 0), c;
  }, n = r(t), a = function() {
    !n || (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(o) {
    return n && o < n.length - n.l ? n : (a(), n = r(Math.max(o + 1, t)));
  }, s = function() {
    return a(), We(e);
  }, f = function(o) {
    a(), n = o, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function W(e, t, r, n) {
  var a = +t, i;
  if (!isNaN(a)) {
    n || (n = Nx[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
    var s = e.next(i);
    a <= 127 ? s.write_shift(1, a) : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var f = 0; f != 4; ++f)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    n > 0 && s0(r) && e.push(r);
  }
}
function yt(e, t, r) {
  var n = Qe(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; )
      n.c -= 256;
    for (; n.r >= 65536; )
      n.r -= 65536;
  }
  return n;
}
function ta(e, t, r) {
  var n = Qe(e);
  return n.s = yt(n.s, t.s, r), n.e = yt(n.e, t.s, r), n;
}
function Ct(e, t) {
  if (e.cRel && e.c < 0)
    for (e = Qe(e); e.c < 0; )
      e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = Qe(e); e.r < 0; )
      e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = me(e);
  return !e.cRel && e.cRel != null && (r = Ho(r)), !e.rRel && e.rRel != null && (r = Uo(r)), r;
}
function Bn(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + je(e.s.c) + ":" + (e.e.cRel ? "" : "$") + je(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Ve(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Ve(e.e.r) : Ct(e.s, t.biff) + ":" + Ct(e.e, t.biff);
}
function f0(e) {
  return parseInt(Wo(e), 10) - 1;
}
function Ve(e) {
  return "" + (e + 1);
}
function Uo(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function Wo(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function o0(e) {
  for (var t = Vo(e), r = 0, n = 0; n !== t.length; ++n)
    r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function je(e) {
  if (e < 0)
    throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26))
    t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function Ho(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function Vo(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Go(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function Pe(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function me(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0)
    r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function sr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: Pe(e), e: Pe(e) } : { s: Pe(e.slice(0, t)), e: Pe(e.slice(t + 1)) };
}
function Re(e, t) {
  return typeof t > "u" || typeof t == "number" ? Re(e.s, e.e) : (typeof e != "string" && (e = me(e)), typeof t != "string" && (t = me(t)), e == t ? e : e + ":" + t);
}
function Ee(e) {
  var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, r = 0, n = 0, a = 0, i = e.length;
  for (r = 0; n < i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.s.c = --r, r = 0; n < i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  if (t.s.r = --r, n === i || a != 10)
    return t.e.c = t.s.c, t.e.r = t.s.r, t;
  for (++n, r = 0; n != i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.e.c = --r, r = 0; n != i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  return t.e.r = --r, t;
}
function na(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null)
    try {
      return e.w = Mr(e.z, r ? Ze(t) : t);
    } catch {
    }
  try {
    return e.w = Mr((e.XF || {}).numFmtId || (r ? 14 : 0), r ? Ze(t) : t);
  } catch {
    return "" + t;
  }
}
function Nr(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? Ut[e.v] || e.v : t == null ? na(e, e.v) : na(e, t));
}
function Jr(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function xi(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var l = typeof n.origin == "string" ? Pe(n.origin) : n.origin;
      s = l.r, f = l.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var o = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = Ee(i["!ref"]);
    o.s.c = c.s.c, o.s.r = c.s.r, o.e.c = Math.max(o.e.c, c.e.c), o.e.r = Math.max(o.e.r, c.e.r), s == -1 && (o.e.r = s = c.e.r + 1);
  }
  for (var u = 0; u != t.length; ++u)
    if (!!t[u]) {
      if (!Array.isArray(t[u]))
        throw new Error("aoa_to_sheet expects an array of arrays");
      for (var h = 0; h != t[u].length; ++h)
        if (!(typeof t[u][h] > "u")) {
          var p = { v: t[u][h] }, _ = s + u, x = f + h;
          if (o.s.r > _ && (o.s.r = _), o.s.c > x && (o.s.c = x), o.e.r < _ && (o.e.r = _), o.e.c < x && (o.e.c = x), t[u][h] && typeof t[u][h] == "object" && !Array.isArray(t[u][h]) && !(t[u][h] instanceof Date))
            p = t[u][h];
          else if (Array.isArray(p.v) && (p.f = t[u][h][1], p.v = p.v[0]), p.v === null)
            if (p.f)
              p.t = "n";
            else if (n.nullError)
              p.t = "e", p.v = 0;
            else if (n.sheetStubs)
              p.t = "z";
            else
              continue;
          else
            typeof p.v == "number" ? p.t = "n" : typeof p.v == "boolean" ? p.t = "b" : p.v instanceof Date ? (p.z = n.dateNF || ye[14], n.cellDates ? (p.t = "d", p.w = Mr(p.z, Ze(p.v))) : (p.t = "n", p.v = Ze(p.v), p.w = Mr(p.z, p.v))) : p.t = "s";
          if (a)
            i[_] || (i[_] = []), i[_][x] && i[_][x].z && (p.z = i[_][x].z), i[_][x] = p;
          else {
            var g = me({ c: x, r: _ });
            i[g] && i[g].z && (p.z = i[g].z), i[g] = p;
          }
        }
    }
  return o.s.c < 1e7 && (i["!ref"] = Re(o)), i;
}
function dt(e, t) {
  return xi(null, e, t);
}
function Xo(e) {
  return e.read_shift(4, "i");
}
function mr(e, t) {
  return t || (t = M(4)), t.write_shift(4, e), t;
}
function $e(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Le(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function jo(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function $o(e, t) {
  return t || (t = M(4)), t.write_shift(2, e.ich || 0), t.write_shift(2, e.ifnt || 0), t;
}
function l0(e, t) {
  var r = e.l, n = e.read_shift(1), a = $e(e), i = [], s = { t: a, h: a };
  if ((n & 1) !== 0) {
    for (var f = e.read_shift(4), l = 0; l != f; ++l)
      i.push(jo(e));
    s.r = i;
  } else
    s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function zo(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(15 + 4 * e.t.length)), t.write_shift(1, 0), Le(e.t, t), r ? t.slice(0, t.l) : t;
}
var Ko = l0;
function Yo(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(23 + 4 * e.t.length)), t.write_shift(1, 1), Le(e.t, t), t.write_shift(4, 1), $o({ ich: 0, ifnt: 0 }, t), r ? t.slice(0, t.l) : t;
}
function hr(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function qr(e, t) {
  return t == null && (t = M(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function Zr(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function Qr(e, t) {
  return t == null && (t = M(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var Jo = $e, di = Le;
function c0(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function on(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var qo = $e, jn = c0, h0 = on;
function pi(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? fn([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : jr(t, 0) >> 2;
  return r ? a / 100 : a;
}
function vi(e, t) {
  t == null && (t = M(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -(1 << 29) && a < 1 << 29 && (n = 1, r = 1), n)
    t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else
    throw new Error("unsupported RkNumber " + e);
}
function mi(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function Zo(e, t) {
  return t || (t = M(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var et = mi, pt = Zo;
function vt(e) {
  if (e.length - e.l < 8)
    throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Kr(e, t) {
  return (t || M(8)).write_shift(8, e, "f");
}
function Qo(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), l = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var o = ol[a];
      o && (t.rgb = da(o));
      break;
    case 2:
      t.rgb = da([s, f, l]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function ln(e, t) {
  if (t || (t = M(8)), !e || e.auto)
    return t.write_shift(4, 0), t.write_shift(4, 0), t;
  e.index != null ? (t.write_shift(1, 2), t.write_shift(1, e.index)) : e.theme != null ? (t.write_shift(1, 6), t.write_shift(1, e.theme)) : (t.write_shift(1, 5), t.write_shift(1, 0));
  var r = e.tint || 0;
  if (r > 0 ? r *= 32767 : r < 0 && (r *= 32768), t.write_shift(2, r), !e.rgb || e.theme != null)
    t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  else {
    var n = e.rgb || "FFFFFF";
    typeof n == "number" && (n = ("000000" + n.toString(16)).slice(-6)), t.write_shift(1, parseInt(n.slice(0, 2), 16)), t.write_shift(1, parseInt(n.slice(2, 4), 16)), t.write_shift(1, parseInt(n.slice(4, 6), 16)), t.write_shift(1, 255);
  }
  return t;
}
function el(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = {
    fBold: t & 1,
    fItalic: t & 2,
    fUnderline: t & 4,
    fStrikeout: t & 8,
    fOutline: t & 16,
    fShadow: t & 32,
    fCondense: t & 64,
    fExtend: t & 128
  };
  return r;
}
function rl(e, t) {
  t || (t = M(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
var gi = 2, rr = 3, Kt = 11, cn = 19, Yt = 64, tl = 65, nl = 71, al = 4108, il = 4126, be = 80, aa = {
  1: { n: "CodePage", t: gi },
  2: { n: "Category", t: be },
  3: { n: "PresentationFormat", t: be },
  4: { n: "ByteCount", t: rr },
  5: { n: "LineCount", t: rr },
  6: { n: "ParagraphCount", t: rr },
  7: { n: "SlideCount", t: rr },
  8: { n: "NoteCount", t: rr },
  9: { n: "HiddenCount", t: rr },
  10: { n: "MultimediaClipCount", t: rr },
  11: { n: "ScaleCrop", t: Kt },
  12: { n: "HeadingPairs", t: al },
  13: { n: "TitlesOfParts", t: il },
  14: { n: "Manager", t: be },
  15: { n: "Company", t: be },
  16: { n: "LinksUpToDate", t: Kt },
  17: { n: "CharacterCount", t: rr },
  19: { n: "SharedDoc", t: Kt },
  22: { n: "HyperlinksChanged", t: Kt },
  23: { n: "AppVersion", t: rr, p: "version" },
  24: { n: "DigSig", t: tl },
  26: { n: "ContentType", t: be },
  27: { n: "ContentStatus", t: be },
  28: { n: "Language", t: be },
  29: { n: "Version", t: be },
  255: {},
  2147483648: { n: "Locale", t: cn },
  2147483651: { n: "Behavior", t: cn },
  1919054434: {}
}, ia = {
  1: { n: "CodePage", t: gi },
  2: { n: "Title", t: be },
  3: { n: "Subject", t: be },
  4: { n: "Author", t: be },
  5: { n: "Keywords", t: be },
  6: { n: "Comments", t: be },
  7: { n: "Template", t: be },
  8: { n: "LastAuthor", t: be },
  9: { n: "RevNumber", t: be },
  10: { n: "EditTime", t: Yt },
  11: { n: "LastPrinted", t: Yt },
  12: { n: "CreatedDate", t: Yt },
  13: { n: "ModifiedDate", t: Yt },
  14: { n: "PageCount", t: rr },
  15: { n: "WordCount", t: rr },
  16: { n: "CharCount", t: rr },
  17: { n: "Thumbnail", t: nl },
  18: { n: "Application", t: be },
  19: { n: "DocSecurity", t: rr },
  255: {},
  2147483648: { n: "Locale", t: cn },
  2147483651: { n: "Behavior", t: cn },
  1919054434: {}
};
function sl(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var fl = /* @__PURE__ */ sl([
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  8388608,
  32768,
  128,
  8421376,
  8388736,
  32896,
  12632256,
  8421504,
  10066431,
  10040166,
  16777164,
  13434879,
  6684774,
  16744576,
  26316,
  13421823,
  128,
  16711935,
  16776960,
  65535,
  8388736,
  8388608,
  32896,
  255,
  52479,
  13434879,
  13434828,
  16777113,
  10079487,
  16751052,
  13408767,
  16764057,
  3368703,
  3394764,
  10079232,
  16763904,
  16750848,
  16737792,
  6710937,
  9868950,
  13158,
  3381606,
  13056,
  3355392,
  10040064,
  10040166,
  3355545,
  3355443,
  16777215,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]), ol = /* @__PURE__ */ Qe(fl), Ut = {
  0: "#NULL!",
  7: "#DIV/0!",
  15: "#VALUE!",
  23: "#REF!",
  29: "#NAME?",
  36: "#NUM!",
  42: "#N/A",
  43: "#GETTING_DATA",
  255: "#WTF?"
}, ll = {
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
  "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
  "application/vnd.ms-excel.worksheet": "sheets",
  "application/vnd.ms-excel.binIndexWs": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
  "application/vnd.ms-excel.chartsheet": "charts",
  "application/vnd.ms-excel.macrosheet+xml": "macros",
  "application/vnd.ms-excel.macrosheet": "macros",
  "application/vnd.ms-excel.intlmacrosheet": "TODO",
  "application/vnd.ms-excel.binIndexMs": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
  "application/vnd.ms-excel.dialogsheet": "dialogs",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
  "application/vnd.ms-excel.sharedStrings": "strs",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
  "application/vnd.ms-excel.styles": "styles",
  "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
  "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
  "application/vnd.ms-excel.comments": "comments",
  "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
  "application/vnd.ms-excel.person+xml": "people",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
  "application/vnd.ms-excel.sheetMetadata": "metadata",
  "application/vnd.ms-excel.pivotTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
  "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
  "application/vnd.ms-office.chartstyle+xml": "TODO",
  "application/vnd.ms-office.chartex+xml": "TODO",
  "application/vnd.ms-excel.calcChain": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
  "application/vnd.ms-office.activeX": "TODO",
  "application/vnd.ms-office.activeX+xml": "TODO",
  "application/vnd.ms-excel.attachedToolbars": "TODO",
  "application/vnd.ms-excel.connections": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
  "application/vnd.ms-excel.externalLink": "links",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
  "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
  "application/vnd.ms-excel.pivotCacheRecords": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
  "application/vnd.ms-excel.queryTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
  "application/vnd.ms-excel.userNames": "TODO",
  "application/vnd.ms-excel.revisionHeaders": "TODO",
  "application/vnd.ms-excel.revisionLog": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
  "application/vnd.ms-excel.tableSingleCells": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
  "application/vnd.ms-excel.slicer": "TODO",
  "application/vnd.ms-excel.slicerCache": "TODO",
  "application/vnd.ms-excel.slicer+xml": "TODO",
  "application/vnd.ms-excel.slicerCache+xml": "TODO",
  "application/vnd.ms-excel.wsSortMap": "TODO",
  "application/vnd.ms-excel.table": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
  "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
  "application/vnd.ms-excel.Timeline+xml": "TODO",
  "application/vnd.ms-excel.TimelineCache+xml": "TODO",
  "application/vnd.ms-office.vbaProject": "vba",
  "application/vnd.ms-office.vbaProjectSignature": "TODO",
  "application/vnd.ms-office.volatileDependencies": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
  "application/vnd.ms-excel.controlproperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.model+data": "TODO",
  "application/vnd.ms-excel.Survey+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
  "application/vnd.openxmlformats-package.relationships+xml": "rels",
  "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
  "image/png": "TODO",
  sheet: "js"
}, Jt = {
  workbooks: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
    xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
  },
  strs: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
    xlsb: "application/vnd.ms-excel.sharedStrings"
  },
  comments: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
    xlsb: "application/vnd.ms-excel.comments"
  },
  sheets: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    xlsb: "application/vnd.ms-excel.worksheet"
  },
  charts: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
    xlsb: "application/vnd.ms-excel.chartsheet"
  },
  dialogs: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
    xlsb: "application/vnd.ms-excel.dialogsheet"
  },
  macros: {
    xlsx: "application/vnd.ms-excel.macrosheet+xml",
    xlsb: "application/vnd.ms-excel.macrosheet"
  },
  metadata: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
    xlsb: "application/vnd.ms-excel.sheetMetadata"
  },
  styles: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
    xlsb: "application/vnd.ms-excel.styles"
  }
};
function _i() {
  return {
    workbooks: [],
    sheets: [],
    charts: [],
    dialogs: [],
    macros: [],
    rels: [],
    strs: [],
    comments: [],
    threadedcomments: [],
    links: [],
    coreprops: [],
    extprops: [],
    custprops: [],
    themes: [],
    styles: [],
    calcchains: [],
    vba: [],
    drawings: [],
    metadata: [],
    people: [],
    TODO: [],
    xmlns: ""
  };
}
function Ti(e, t) {
  var r = _o(ll), n = [], a;
  n[n.length] = De, n[n.length] = Y("Types", null, {
    xmlns: ke.CT,
    "xmlns:xsd": ke.xsd,
    "xmlns:xsi": ke.xsi
  }), n = n.concat([
    ["xml", "application/xml"],
    ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
    ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
    ["data", "application/vnd.openxmlformats-officedocument.model+data"],
    ["bmp", "image/bmp"],
    ["png", "image/png"],
    ["gif", "image/gif"],
    ["emf", "image/x-emf"],
    ["wmf", "image/x-wmf"],
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["tif", "image/tiff"],
    ["tiff", "image/tiff"],
    ["pdf", "application/pdf"],
    ["rels", "application/vnd.openxmlformats-package.relationships+xml"]
  ].map(function(l) {
    return Y("Default", null, { Extension: l[0], ContentType: l[1] });
  }));
  var i = function(l) {
    e[l] && e[l].length > 0 && (a = e[l][0], n[n.length] = Y("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: Jt[l][t.bookType] || Jt[l].xlsx
    }));
  }, s = function(l) {
    (e[l] || []).forEach(function(o) {
      n[n.length] = Y("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: Jt[l][t.bookType] || Jt[l].xlsx
      });
    });
  }, f = function(l) {
    (e[l] || []).forEach(function(o) {
      n[n.length] = Y("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: r[l][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var he = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
  CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
  CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
  CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
  CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
  WS: [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
  ],
  DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
  MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
  IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};
function Ei(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function lt(e) {
  var t = [De, Y("Relationships", null, {
    xmlns: ke.RELS
  })];
  return Ge(e["!id"]).forEach(function(r) {
    t[t.length] = Y("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function pe(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0)
    for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
      ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, i ? a.TargetMode = i : [he.HLINK, he.XPATH, he.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id])
    throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
function cl(e) {
  var t = [De];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r)
    t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function sa(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function hl(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function ul(e) {
  var t = [De];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(sa(e[r][0], e[r][1])), t.push(hl("", e[r][0]));
  return t.push(sa("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function wi() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + rn.version + "</meta:generator></office:meta></office:document-meta>";
}
var $r = [
  ["cp:category", "Category"],
  ["cp:contentStatus", "ContentStatus"],
  ["cp:keywords", "Keywords"],
  ["cp:lastModifiedBy", "LastAuthor"],
  ["cp:lastPrinted", "LastPrinted"],
  ["cp:revision", "RevNumber"],
  ["cp:version", "Version"],
  ["dc:creator", "Author"],
  ["dc:description", "Comments"],
  ["dc:identifier", "Identifier"],
  ["dc:language", "Language"],
  ["dc:subject", "Subject"],
  ["dc:title", "Title"],
  ["dcterms:created", "CreatedDate", "date"],
  ["dcterms:modified", "ModifiedDate", "date"]
];
function Mn(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = ve(t), n[n.length] = r ? Y(e, t, r) : He(e, t));
}
function Si(e, t) {
  var r = t || {}, n = [De, Y("cp:coreProperties", null, {
    "xmlns:cp": ke.CORE_PROPS,
    "xmlns:dc": ke.dc,
    "xmlns:dcterms": ke.dcterms,
    "xmlns:dcmitype": ke.dcmitype,
    "xmlns:xsi": ke.xsi
  })], a = {};
  if (!e && !r.Props)
    return n.join("");
  e && (e.CreatedDate != null && Mn("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Xn(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && Mn("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Xn(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != $r.length; ++i) {
    var s = $r[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && Mn(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var ct = [
  ["Application", "Application", "string"],
  ["AppVersion", "AppVersion", "string"],
  ["Company", "Company", "string"],
  ["DocSecurity", "DocSecurity", "string"],
  ["Manager", "Manager", "string"],
  ["HyperlinksChanged", "HyperlinksChanged", "bool"],
  ["SharedDoc", "SharedDoc", "bool"],
  ["LinksUpToDate", "LinksUpToDate", "bool"],
  ["ScaleCrop", "ScaleCrop", "bool"],
  ["HeadingPairs", "HeadingPairs", "raw"],
  ["TitlesOfParts", "TitlesOfParts", "raw"]
], Ai = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Fi(e) {
  var t = [], r = Y;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = De, t[t.length] = Y("Properties", null, {
    xmlns: ke.EXT_PROPS,
    "xmlns:vt": ke.vt
  }), ct.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = ve(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + ve(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function yi(e) {
  var t = [De, Y("Properties", null, {
    xmlns: ke.CUST_PROPS,
    "xmlns:vt": ke.vt
  })];
  if (!e)
    return t.join("");
  var r = 1;
  return Ge(e).forEach(function(a) {
    ++r, t[t.length] = Y("property", Do(e[a], !0), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: ve(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var fa = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  Category: "Category",
  Manager: "Manager",
  Company: "Company",
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  Identifier: "Identifier",
  Language: "Language"
};
function xl(e, t) {
  var r = [];
  return Ge(fa).map(function(n) {
    for (var a = 0; a < $r.length; ++a)
      if ($r[a][1] == n)
        return $r[a];
    for (a = 0; a < ct.length; ++a)
      if (ct[a][1] == n)
        return ct[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(He(fa[n[1]] || n[1], a));
    }
  }), Y("DocumentProperties", r.join(""), { xmlns: nr.o });
}
function dl(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && Ge(e).forEach(function(i) {
    if (!!Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < $r.length; ++s)
        if (i == $r[s][1])
          return;
      for (s = 0; s < ct.length; ++s)
        if (i == ct[s][1])
          return;
      for (s = 0; s < r.length; ++s)
        if (i == r[s])
          return;
      var f = e[i], l = "string";
      typeof f == "number" ? (l = "float", f = String(f)) : f === !0 || f === !1 ? (l = "boolean", f = f ? "1" : "0") : f = String(f), a.push(Y(K0(i), f, { "dt:dt": l }));
    }
  }), t && Ge(t).forEach(function(i) {
    if (!!Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(Y(K0(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + nr.o + '">' + a.join("") + "</" + n + ">";
}
function pl(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = M(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function oa(e, t) {
  var r = M(4), n = M(4);
  switch (r.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, t);
      break;
    case 5:
      n = M(8), n.write_shift(8, t, "f");
      break;
    case 11:
      n.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      n = pl(t);
      break;
    case 31:
    case 80:
      for (n = M(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; )
        n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return We([r, n]);
}
var Ci = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function vl(e) {
  switch (typeof e) {
    case "boolean":
      return 11;
    case "number":
      return (e | 0) == e ? 3 : 5;
    case "string":
      return 31;
    case "object":
      if (e instanceof Date)
        return 64;
      break;
  }
  return -1;
}
function la(e, t, r) {
  var n = M(8), a = [], i = [], s = 8, f = 0, l = M(8), o = M(8);
  if (l.write_shift(4, 2), l.write_shift(4, 1200), o.write_shift(4, 1), i.push(l), a.push(o), s += 8 + l.length, !t) {
    o = M(8), o.write_shift(4, 0), a.unshift(o);
    var c = [M(4)];
    for (c[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var u = e[f][0];
      for (l = M(4 + 4 + 2 * (u.length + 1) + (u.length % 2 ? 0 : 2)), l.write_shift(4, f + 2), l.write_shift(4, u.length + 1), l.write_shift(0, u, "dbcs"); l.l != l.length; )
        l.write_shift(1, 0);
      c.push(l);
    }
    l = We(c), i.unshift(l), s += 8 + l.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(Ci.indexOf(e[f][0]) > -1 || Ai.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var h = e[f][1], p = 0;
      if (t) {
        p = +t[e[f][0]];
        var _ = r[p];
        if (_.p == "version" && typeof h == "string") {
          var x = h.split(".");
          h = (+x[0] << 16) + (+x[1] || 0);
        }
        l = oa(_.t, h);
      } else {
        var g = vl(h);
        g == -1 && (g = 31, h = String(h)), l = oa(g, h);
      }
      i.push(l), o = M(8), o.write_shift(4, t ? p : 2 + f), a.push(o), s += 8 + l.length;
    }
  var C = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, C), C += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), We([n].concat(a).concat(i));
}
function ca(e, t, r, n, a, i) {
  var s = M(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, _e.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var l = la(e, r, n);
  if (f.push(l), a) {
    var o = la(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + l.length), f.push(o);
  }
  return We(f);
}
function ml(e, t) {
  t || (t = M(e));
  for (var r = 0; r < e; ++r)
    t.write_shift(1, 0);
  return t;
}
function gl(e, t) {
  return e.read_shift(t) === 1;
}
function Ye(e, t) {
  return t || (t = M(2)), t.write_shift(2, +!!e), t;
}
function Oi(e) {
  return e.read_shift(2, "u");
}
function cr(e, t) {
  return t || (t = M(2)), t.write_shift(2, e), t;
}
function Ri(e, t, r) {
  return r || (r = M(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function Di(e, t, r) {
  var n = e.read_shift(r && r.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (r && r.biff >= 8, !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else
    r.biff == 12 && (a = "wstr");
  r.biff >= 2 && r.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function _l(e) {
  var t = e.t || "", r = M(3 + 0);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = M(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return We(a);
}
function Tl(e, t, r) {
  var n;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5)
      return e.read_shift(t, "cpstr");
    if (r.biff >= 12)
      return e.read_shift(t, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(t, "sbcs-cont") : n = e.read_shift(t, "dbcs-cont"), n;
}
function El(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : Tl(e, n, r);
}
function wl(e, t, r) {
  if (r.biff > 5)
    return El(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Ni(e, t, r) {
  return r || (r = M(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function ha(e, t) {
  t || (t = M(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function Sl(e) {
  var t = M(512), r = 0, n = e.Target;
  n.slice(0, 7) == "file://" && (n = n.slice(7));
  var a = n.indexOf("#"), i = a > -1 ? 31 : 23;
  switch (n.charAt(0)) {
    case "#":
      i = 28;
      break;
    case ".":
      i &= -3;
      break;
  }
  t.write_shift(4, 2), t.write_shift(4, i);
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (r = 0; r < s.length; ++r)
    t.write_shift(4, s[r]);
  if (i == 28)
    n = n.slice(1), ha(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r)
      t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r)
      t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && ha(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r)
      t.write_shift(1, parseInt(s[r], 16));
    for (var l = 0; n.slice(l * 3, l * 3 + 3) == "../" || n.slice(l * 3, l * 3 + 3) == "..\\"; )
      ++l;
    for (t.write_shift(2, l), t.write_shift(4, n.length - 3 * l + 1), r = 0; r < n.length - 3 * l; ++r)
      t.write_shift(1, n.charCodeAt(r + 3 * l) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r)
      t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function Yr(e, t, r, n) {
  return n || (n = M(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function Al(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function Fl(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function Ii(e, t) {
  return t || (t = M(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function u0(e, t, r) {
  var n = 1536, a = 16;
  switch (r.bookType) {
    case "biff8":
      break;
    case "biff5":
      n = 1280, a = 8;
      break;
    case "biff4":
      n = 4, a = 6;
      break;
    case "biff3":
      n = 3, a = 6;
      break;
    case "biff2":
      n = 2, a = 4;
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var i = M(a);
  return i.write_shift(2, n), i.write_shift(2, t), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function yl(e, t) {
  var r = !t || t.biff == 8, n = M(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; )
    n.write_shift(1, r ? 0 : 32);
  return n;
}
function Cl(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = M(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function Ol(e, t) {
  var r = M(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a)
    n[a] = _l(e[a]);
  var i = We([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function Rl() {
  var e = M(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Dl(e) {
  var t = M(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function Nl(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = M(a);
  return i.write_shift(2, (e.sz || 12) * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function Il(e, t, r, n) {
  var a = M(10);
  return Yr(e, t, n, a), a.write_shift(4, r), a;
}
function kl(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = M(6 + 2 + +i + (1 + i) * r.length);
  return Yr(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function Pl(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = M(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function Ll(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = M(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function ua(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = M(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function Bl(e) {
  var t = M(8);
  return t.write_shift(4, 0), t.write_shift(2, e[0] ? e[0] + 1 : 0), t.write_shift(2, e[1] ? e[1] + 1 : 0), t;
}
function Ml(e, t, r, n, a, i) {
  var s = M(8);
  return Yr(e, t, n, s), Ri(r, i, s), s;
}
function bl(e, t, r, n) {
  var a = M(14);
  return Yr(e, t, n, a), Kr(r, a), a;
}
function Ul(e, t, r) {
  if (r.biff < 8)
    return Wl(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; )
    n.push(Al(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a)
    throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function Wl(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = Di(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function Hl(e) {
  var t = M(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r)
    Ii(e[r], t);
  return t;
}
function Vl(e) {
  var t = M(24), r = Pe(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a)
    t.write_shift(1, parseInt(n[a], 16));
  return We([t, Sl(e[1])]);
}
function Gl(e) {
  var t = e[1].Tooltip, r = M(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = Pe(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a)
    r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function Xl(e) {
  return e || (e = M(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function jl(e, t, r) {
  if (!r.cellStyles)
    return wr(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), l = e.read_shift(2);
  n == 2 && (e.l += 2);
  var o = { s: a, e: i, w: s, ixfe: f, flags: l };
  return (r.biff >= 5 || !r.biff) && (o.level = l >> 8 & 7), o;
}
function $l(e, t) {
  var r = M(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function zl(e) {
  for (var t = M(2 * e), r = 0; r < e; ++r)
    t.write_shift(2, r + 1);
  return t;
}
function Kl(e, t, r) {
  var n = M(15);
  return Ht(n, e, t), n.write_shift(8, r, "f"), n;
}
function Yl(e, t, r) {
  var n = M(9);
  return Ht(n, e, t), n.write_shift(2, r), n;
}
var Jl = /* @__PURE__ */ function() {
  var e = {
    1: 437,
    2: 850,
    3: 1252,
    4: 1e4,
    100: 852,
    101: 866,
    102: 865,
    103: 861,
    104: 895,
    105: 620,
    106: 737,
    107: 857,
    120: 950,
    121: 949,
    122: 936,
    123: 932,
    124: 874,
    125: 1255,
    126: 1256,
    150: 10007,
    151: 10029,
    152: 10006,
    200: 1250,
    201: 1251,
    202: 1254,
    203: 1253,
    0: 20127,
    8: 865,
    9: 437,
    10: 850,
    11: 437,
    13: 437,
    14: 850,
    15: 437,
    16: 850,
    17: 437,
    18: 850,
    19: 932,
    20: 850,
    21: 437,
    22: 850,
    23: 865,
    24: 437,
    25: 437,
    26: 850,
    27: 437,
    28: 863,
    29: 850,
    31: 852,
    34: 852,
    35: 852,
    36: 860,
    37: 850,
    38: 866,
    55: 850,
    64: 852,
    77: 936,
    78: 949,
    79: 950,
    80: 874,
    87: 1252,
    88: 1252,
    89: 1252,
    108: 863,
    134: 737,
    135: 852,
    136: 857,
    204: 1257,
    255: 16969
  }, t = r0({
    1: 437,
    2: 850,
    3: 1252,
    4: 1e4,
    100: 852,
    101: 866,
    102: 865,
    103: 861,
    104: 895,
    105: 620,
    106: 737,
    107: 857,
    120: 950,
    121: 949,
    122: 936,
    123: 932,
    124: 874,
    125: 1255,
    126: 1256,
    150: 10007,
    151: 10029,
    152: 10006,
    200: 1250,
    201: 1251,
    202: 1254,
    203: 1253,
    0: 20127
  });
  function r(f, l) {
    var o = [], c = zr(1);
    switch (l.type) {
      case "base64":
        c = pr(Dr(f));
        break;
      case "binary":
        c = pr(f);
        break;
      case "buffer":
      case "array":
        c = f;
        break;
    }
    tr(c, 0);
    var u = c.read_shift(1), h = !!(u & 136), p = !1, _ = !1;
    switch (u) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        p = !0, h = !0;
        break;
      case 49:
        p = !0, h = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        _ = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + u.toString(16));
    }
    var x = 0, g = 521;
    u == 2 && (x = c.read_shift(2)), c.l += 3, u != 2 && (x = c.read_shift(4)), x > 1048576 && (x = 1e6), u != 2 && (g = c.read_shift(2));
    var C = c.read_shift(2), O = l.codepage || 1252;
    u != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (O = e[c[c.l]]), c.l += 1, c.l += 2), _ && (c.l += 36);
    for (var A = [], B = {}, z = Math.min(c.length, u == 2 ? 521 : g - 10 - (p ? 264 : 0)), Q = _ ? 32 : 11; c.l < z && c[c.l] != 13; )
      switch (B = {}, B.name = Xr.utils.decode(O, c.slice(c.l, c.l + Q)).replace(/[\u0000\r\n].*$/g, ""), c.l += Q, B.type = String.fromCharCode(c.read_shift(1)), u != 2 && !_ && (B.offset = c.read_shift(4)), B.len = c.read_shift(1), u == 2 && (B.offset = c.read_shift(2)), B.dec = c.read_shift(1), B.name.length && A.push(B), u != 2 && (c.l += _ ? 13 : 14), B.type) {
        case "B":
          (!p || B.len != 8) && l.WTF && console.log("Skipping " + B.name + ":" + B.type);
          break;
        case "G":
        case "P":
          l.WTF && console.log("Skipping " + B.name + ":" + B.type);
          break;
        case "+":
        case "0":
        case "@":
        case "C":
        case "D":
        case "F":
        case "I":
        case "L":
        case "M":
        case "N":
        case "O":
        case "T":
        case "Y":
          break;
        default:
          throw new Error("Unknown Field Type: " + B.type);
      }
    if (c[c.l] !== 13 && (c.l = g - 1), c.read_shift(1) !== 13)
      throw new Error("DBF Terminator not found " + c.l + " " + c[c.l]);
    c.l = g;
    var R = 0, U = 0;
    for (o[0] = [], U = 0; U != A.length; ++U)
      o[0][U] = A[U].name;
    for (; x-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += C;
        continue;
      }
      for (++c.l, o[++R] = [], U = 0, U = 0; U != A.length; ++U) {
        var L = c.slice(c.l, c.l + A[U].len);
        c.l += A[U].len, tr(L, 0);
        var V = Xr.utils.decode(O, L);
        switch (A[U].type) {
          case "C":
            V.trim().length && (o[R][U] = V.replace(/\s+$/, ""));
            break;
          case "D":
            V.length === 8 ? o[R][U] = new Date(+V.slice(0, 4), +V.slice(4, 6) - 1, +V.slice(6, 8)) : o[R][U] = V;
            break;
          case "F":
            o[R][U] = parseFloat(V.trim());
            break;
          case "+":
          case "I":
            o[R][U] = _ ? L.read_shift(-4, "i") ^ 2147483648 : L.read_shift(4, "i");
            break;
          case "L":
            switch (V.trim().toUpperCase()) {
              case "Y":
              case "T":
                o[R][U] = !0;
                break;
              case "N":
              case "F":
                o[R][U] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + V + "|");
            }
            break;
          case "M":
            if (!h)
              throw new Error("DBF Unexpected MEMO for type " + u.toString(16));
            o[R][U] = "##MEMO##" + (_ ? parseInt(V.trim(), 10) : L.read_shift(4));
            break;
          case "N":
            V = V.replace(/\u0000/g, "").trim(), V && V != "." && (o[R][U] = +V || 0);
            break;
          case "@":
            o[R][U] = new Date(L.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            o[R][U] = new Date((L.read_shift(4) - 2440588) * 864e5 + L.read_shift(4));
            break;
          case "Y":
            o[R][U] = L.read_shift(4, "i") / 1e4 + L.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            o[R][U] = -L.read_shift(-8, "f");
            break;
          case "B":
            if (p && A[U].len == 8) {
              o[R][U] = L.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            L.l += A[U].len;
            break;
          case "0":
            if (A[U].name === "_NullFlags")
              break;
          default:
            throw new Error("DBF Unsupported data type " + A[U].type);
        }
      }
    }
    if (u != 2 && c.l < c.length && c[c.l++] != 26)
      throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return l && l.sheetRows && (o = o.slice(0, l.sheetRows)), l.DBF = A, o;
  }
  function n(f, l) {
    var o = l || {};
    o.dateNF || (o.dateNF = "yyyymmdd");
    var c = dt(r(f, o), o);
    return c["!cols"] = o.DBF.map(function(u) {
      return {
        wch: u.len,
        DBF: u
      };
    }), delete o.DBF, c;
  }
  function a(f, l) {
    try {
      return Jr(n(f, l), l);
    } catch (o) {
      if (l && l.WTF)
        throw o;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, l) {
    var o = l || {};
    if (+o.codepage >= 0 && Rt(+o.codepage), o.type == "string")
      throw new Error("Cannot write DBF to JS string");
    var c = qe(), u = pn(f, { header: 1, raw: !0, cellDates: !0 }), h = u[0], p = u.slice(1), _ = f["!cols"] || [], x = 0, g = 0, C = 0, O = 1;
    for (x = 0; x < h.length; ++x) {
      if (((_[x] || {}).DBF || {}).name) {
        h[x] = _[x].DBF.name, ++C;
        continue;
      }
      if (h[x] != null) {
        if (++C, typeof h[x] == "number" && (h[x] = h[x].toString(10)), typeof h[x] != "string")
          throw new Error("DBF Invalid column name " + h[x] + " |" + typeof h[x] + "|");
        if (h.indexOf(h[x]) !== x) {
          for (g = 0; g < 1024; ++g)
            if (h.indexOf(h[x] + "_" + g) == -1) {
              h[x] += "_" + g;
              break;
            }
        }
      }
    }
    var A = Ee(f["!ref"]), B = [], z = [], Q = [];
    for (x = 0; x <= A.e.c - A.s.c; ++x) {
      var R = "", U = "", L = 0, V = [];
      for (g = 0; g < p.length; ++g)
        p[g][x] != null && V.push(p[g][x]);
      if (V.length == 0 || h[x] == null) {
        B[x] = "?";
        continue;
      }
      for (g = 0; g < V.length; ++g) {
        switch (typeof V[g]) {
          case "number":
            U = "B";
            break;
          case "string":
            U = "C";
            break;
          case "boolean":
            U = "L";
            break;
          case "object":
            U = V[g] instanceof Date ? "D" : "C";
            break;
          default:
            U = "C";
        }
        L = Math.max(L, String(V[g]).length), R = R && R != U ? "C" : U;
      }
      L > 250 && (L = 250), U = ((_[x] || {}).DBF || {}).type, U == "C" && _[x].DBF.len > L && (L = _[x].DBF.len), R == "B" && U == "N" && (R = "N", Q[x] = _[x].DBF.dec, L = _[x].DBF.len), z[x] = R == "C" || U == "N" ? L : i[R] || 0, O += z[x], B[x] = R;
    }
    var G = c.next(32);
    for (G.write_shift(4, 318902576), G.write_shift(4, p.length), G.write_shift(2, 296 + 32 * C), G.write_shift(2, O), x = 0; x < 4; ++x)
      G.write_shift(4, 0);
    for (G.write_shift(4, 0 | (+t[Pa] || 3) << 8), x = 0, g = 0; x < h.length; ++x)
      if (h[x] != null) {
        var j = c.next(32), re = (h[x].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        j.write_shift(1, re, "sbcs"), j.write_shift(1, B[x] == "?" ? "C" : B[x], "sbcs"), j.write_shift(4, g), j.write_shift(1, z[x] || i[B[x]] || 0), j.write_shift(1, Q[x] || 0), j.write_shift(1, 2), j.write_shift(4, 0), j.write_shift(1, 0), j.write_shift(4, 0), j.write_shift(4, 0), g += z[x] || i[B[x]] || 0;
      }
    var ge = c.next(264);
    for (ge.write_shift(4, 13), x = 0; x < 65; ++x)
      ge.write_shift(4, 0);
    for (x = 0; x < p.length; ++x) {
      var oe = c.next(O);
      for (oe.write_shift(1, 0), g = 0; g < h.length; ++g)
        if (h[g] != null)
          switch (B[g]) {
            case "L":
              oe.write_shift(1, p[x][g] == null ? 63 : p[x][g] ? 84 : 70);
              break;
            case "B":
              oe.write_shift(8, p[x][g] || 0, "f");
              break;
            case "N":
              var Be = "0";
              for (typeof p[x][g] == "number" && (Be = p[x][g].toFixed(Q[g] || 0)), C = 0; C < z[g] - Be.length; ++C)
                oe.write_shift(1, 32);
              oe.write_shift(1, Be, "sbcs");
              break;
            case "D":
              p[x][g] ? (oe.write_shift(4, ("0000" + p[x][g].getFullYear()).slice(-4), "sbcs"), oe.write_shift(2, ("00" + (p[x][g].getMonth() + 1)).slice(-2), "sbcs"), oe.write_shift(2, ("00" + p[x][g].getDate()).slice(-2), "sbcs")) : oe.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var Ce = String(p[x][g] != null ? p[x][g] : "").slice(0, z[g]);
              for (oe.write_shift(1, Ce, "sbcs"), C = 0; C < z[g] - Ce.length; ++C)
                oe.write_shift(1, 32);
              break;
          }
    }
    return c.next(1).write_shift(1, 26), c.end();
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: s
  };
}(), ql = /* @__PURE__ */ function() {
  var e = {
    AA: "\xC0",
    BA: "\xC1",
    CA: "\xC2",
    DA: 195,
    HA: "\xC4",
    JA: 197,
    AE: "\xC8",
    BE: "\xC9",
    CE: "\xCA",
    HE: "\xCB",
    AI: "\xCC",
    BI: "\xCD",
    CI: "\xCE",
    HI: "\xCF",
    AO: "\xD2",
    BO: "\xD3",
    CO: "\xD4",
    DO: 213,
    HO: "\xD6",
    AU: "\xD9",
    BU: "\xDA",
    CU: "\xDB",
    HU: "\xDC",
    Aa: "\xE0",
    Ba: "\xE1",
    Ca: "\xE2",
    Da: 227,
    Ha: "\xE4",
    Ja: 229,
    Ae: "\xE8",
    Be: "\xE9",
    Ce: "\xEA",
    He: "\xEB",
    Ai: "\xEC",
    Bi: "\xED",
    Ci: "\xEE",
    Hi: "\xEF",
    Ao: "\xF2",
    Bo: "\xF3",
    Co: "\xF4",
    Do: 245,
    Ho: "\xF6",
    Au: "\xF9",
    Bu: "\xFA",
    Cu: "\xFB",
    Hu: "\xFC",
    KC: "\xC7",
    Kc: "\xE7",
    q: "\xE6",
    z: "\u0153",
    a: "\xC6",
    j: "\u0152",
    DN: 209,
    Dn: 241,
    Hy: 255,
    S: 169,
    c: 170,
    R: 174,
    "B ": 180,
    0: 176,
    1: 177,
    2: 178,
    3: 179,
    5: 181,
    6: 182,
    7: 183,
    Q: 185,
    k: 186,
    b: 208,
    i: 216,
    l: 222,
    s: 240,
    y: 248,
    "!": 161,
    '"': 162,
    "#": 163,
    "(": 164,
    "%": 165,
    "'": 167,
    "H ": 168,
    "+": 171,
    ";": 187,
    "<": 188,
    "=": 189,
    ">": 190,
    "?": 191,
    "{": 223
  }, t = new RegExp("\x1BN(" + Ge(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(h, p) {
    var _ = e[p];
    return typeof _ == "number" ? B0(_) : _;
  }, n = function(h, p, _) {
    var x = p.charCodeAt(0) - 32 << 4 | _.charCodeAt(0) - 48;
    return x == 59 ? h : B0(x);
  };
  e["|"] = 254;
  function a(h, p) {
    switch (p.type) {
      case "base64":
        return i(Dr(h), p);
      case "binary":
        return i(h, p);
      case "buffer":
        return i(ue && Buffer.isBuffer(h) ? h.toString("binary") : Bt(h), p);
      case "array":
        return i(wn(h), p);
    }
    throw new Error("Unrecognized type " + p.type);
  }
  function i(h, p) {
    var _ = h.split(/[\n\r]+/), x = -1, g = -1, C = 0, O = 0, A = [], B = [], z = null, Q = {}, R = [], U = [], L = [], V = 0, G;
    for (+p.codepage >= 0 && Rt(+p.codepage); C !== _.length; ++C) {
      V = 0;
      var j = _[C].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), re = j.replace(/;;/g, "\0").split(";").map(function(F) {
        return F.replace(/\u0000/g, ";");
      }), ge = re[0], oe;
      if (j.length > 0)
        switch (ge) {
          case "ID":
            break;
          case "E":
            break;
          case "B":
            break;
          case "O":
            break;
          case "W":
            break;
          case "P":
            re[1].charAt(0) == "P" && B.push(j.slice(3).replace(/;;/g, ";"));
            break;
          case "C":
            var Be = !1, Ce = !1, ur = !1, Ie = !1, fr = -1, er = -1;
            for (O = 1; O < re.length; ++O)
              switch (re[O].charAt(0)) {
                case "A":
                  break;
                case "X":
                  g = parseInt(re[O].slice(1)) - 1, Ce = !0;
                  break;
                case "Y":
                  for (x = parseInt(re[O].slice(1)) - 1, Ce || (g = 0), G = A.length; G <= x; ++G)
                    A[G] = [];
                  break;
                case "K":
                  oe = re[O].slice(1), oe.charAt(0) === '"' ? oe = oe.slice(1, oe.length - 1) : oe === "TRUE" ? oe = !0 : oe === "FALSE" ? oe = !1 : isNaN(Or(oe)) ? isNaN(Nt(oe).getDate()) || (oe = Je(oe)) : (oe = Or(oe), z !== null && $a(z) && (oe = Ja(oe))), Be = !0;
                  break;
                case "E":
                  Ie = !0;
                  var S = Yc(re[O].slice(1), { r: x, c: g });
                  A[x][g] = [A[x][g], S];
                  break;
                case "S":
                  ur = !0, A[x][g] = [A[x][g], "S5S"];
                  break;
                case "G":
                  break;
                case "R":
                  fr = parseInt(re[O].slice(1)) - 1;
                  break;
                case "C":
                  er = parseInt(re[O].slice(1)) - 1;
                  break;
                default:
                  if (p && p.WTF)
                    throw new Error("SYLK bad record " + j);
              }
            if (Be && (A[x][g] && A[x][g].length == 2 ? A[x][g][0] = oe : A[x][g] = oe, z = null), ur) {
              if (Ie)
                throw new Error("SYLK shared formula cannot have own formula");
              var P = fr > -1 && A[fr][er];
              if (!P || !P[1])
                throw new Error("SYLK shared formula cannot find base");
              A[x][g][1] = Jc(P[1], { r: x - fr, c: g - er });
            }
            break;
          case "F":
            var y = 0;
            for (O = 1; O < re.length; ++O)
              switch (re[O].charAt(0)) {
                case "X":
                  g = parseInt(re[O].slice(1)) - 1, ++y;
                  break;
                case "Y":
                  for (x = parseInt(re[O].slice(1)) - 1, G = A.length; G <= x; ++G)
                    A[G] = [];
                  break;
                case "M":
                  V = parseInt(re[O].slice(1)) / 20;
                  break;
                case "F":
                  break;
                case "G":
                  break;
                case "P":
                  z = B[parseInt(re[O].slice(1))];
                  break;
                case "S":
                  break;
                case "D":
                  break;
                case "N":
                  break;
                case "W":
                  for (L = re[O].slice(1).split(" "), G = parseInt(L[0], 10); G <= parseInt(L[1], 10); ++G)
                    V = parseInt(L[2], 10), U[G - 1] = V === 0 ? { hidden: !0 } : { wch: V }, x0(U[G - 1]);
                  break;
                case "C":
                  g = parseInt(re[O].slice(1)) - 1, U[g] || (U[g] = {});
                  break;
                case "R":
                  x = parseInt(re[O].slice(1)) - 1, R[x] || (R[x] = {}), V > 0 ? (R[x].hpt = V, R[x].hpx = Mi(V)) : V === 0 && (R[x].hidden = !0);
                  break;
                default:
                  if (p && p.WTF)
                    throw new Error("SYLK bad record " + j);
              }
            y < 1 && (z = null);
            break;
          default:
            if (p && p.WTF)
              throw new Error("SYLK bad record " + j);
        }
    }
    return R.length > 0 && (Q["!rows"] = R), U.length > 0 && (Q["!cols"] = U), p && p.sheetRows && (A = A.slice(0, p.sheetRows)), [A, Q];
  }
  function s(h, p) {
    var _ = a(h, p), x = _[0], g = _[1], C = dt(x, p);
    return Ge(g).forEach(function(O) {
      C[O] = g[O];
    }), C;
  }
  function f(h, p) {
    return Jr(s(h, p), p);
  }
  function l(h, p, _, x) {
    var g = "C;Y" + (_ + 1) + ";X" + (x + 1) + ";K";
    switch (h.t) {
      case "n":
        g += h.v || 0, h.f && !h.F && (g += ";E" + p0(h.f, { r: _, c: x }));
        break;
      case "b":
        g += h.v ? "TRUE" : "FALSE";
        break;
      case "e":
        g += h.w || h.v;
        break;
      case "d":
        g += '"' + (h.w || h.v) + '"';
        break;
      case "s":
        g += '"' + h.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return g;
  }
  function o(h, p) {
    p.forEach(function(_, x) {
      var g = "F;W" + (x + 1) + " " + (x + 1) + " ";
      _.hidden ? g += "0" : (typeof _.width == "number" && !_.wpx && (_.wpx = hn(_.width)), typeof _.wpx == "number" && !_.wch && (_.wch = un(_.wpx)), typeof _.wch == "number" && (g += Math.round(_.wch))), g.charAt(g.length - 1) != " " && h.push(g);
    });
  }
  function c(h, p) {
    p.forEach(function(_, x) {
      var g = "F;";
      _.hidden ? g += "M0;" : _.hpt ? g += "M" + 20 * _.hpt + ";" : _.hpx && (g += "M" + 20 * xn(_.hpx) + ";"), g.length > 2 && h.push(g + "R" + (x + 1));
    });
  }
  function u(h, p) {
    var _ = ["ID;PWXL;N;E"], x = [], g = Ee(h["!ref"]), C, O = Array.isArray(h), A = `\r
`;
    _.push("P;PGeneral"), _.push("F;P0;DG0G8;M255"), h["!cols"] && o(_, h["!cols"]), h["!rows"] && c(_, h["!rows"]), _.push("B;Y" + (g.e.r - g.s.r + 1) + ";X" + (g.e.c - g.s.c + 1) + ";D" + [g.s.c, g.s.r, g.e.c, g.e.r].join(" "));
    for (var B = g.s.r; B <= g.e.r; ++B)
      for (var z = g.s.c; z <= g.e.c; ++z) {
        var Q = me({ r: B, c: z });
        C = O ? (h[B] || [])[z] : h[Q], !(!C || C.v == null && (!C.f || C.F)) && x.push(l(C, h, B, z));
      }
    return _.join(A) + A + x.join(A) + A + "E" + A;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: u
  };
}(), Zl = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(Dr(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(ue && Buffer.isBuffer(i) ? i.toString("binary") : Bt(i), s);
      case "array":
        return t(wn(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var f = i.split(`
`), l = -1, o = -1, c = 0, u = []; c !== f.length; ++c) {
      if (f[c].trim() === "BOT") {
        u[++l] = [], o = 0;
        continue;
      }
      if (!(l < 0)) {
        var h = f[c].trim().split(","), p = h[0], _ = h[1];
        ++c;
        for (var x = f[c] || ""; (x.match(/["]/g) || []).length & 1 && c < f.length - 1; )
          x += `
` + f[++c];
        switch (x = x.trim(), +p) {
          case -1:
            if (x === "BOT") {
              u[++l] = [], o = 0;
              continue;
            } else if (x !== "EOD")
              throw new Error("Unrecognized DIF special command " + x);
            break;
          case 0:
            x === "TRUE" ? u[l][o] = !0 : x === "FALSE" ? u[l][o] = !1 : isNaN(Or(_)) ? isNaN(Nt(_).getDate()) ? u[l][o] = _ : u[l][o] = Je(_) : u[l][o] = Or(_), ++o;
            break;
          case 1:
            x = x.slice(1, x.length - 1), x = x.replace(/""/g, '"'), x && x.match(/^=".*"$/) && (x = x.slice(2, -1)), u[l][o++] = x !== "" ? x : null;
            break;
        }
        if (x === "EOD")
          break;
      }
    }
    return s && s.sheetRows && (u = u.slice(0, s.sheetRows)), u;
  }
  function r(i, s) {
    return dt(e(i, s), s);
  }
  function n(i, s) {
    return Jr(r(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(l, o, c, u, h) {
      l.push(o), l.push(c + "," + u), l.push('"' + h.replace(/"/g, '""') + '"');
    }, s = function(l, o, c, u) {
      l.push(o + "," + c), l.push(o == 1 ? '"' + u.replace(/"/g, '""') + '"' : u);
    };
    return function(l) {
      var o = [], c = Ee(l["!ref"]), u, h = Array.isArray(l);
      i(o, "TABLE", 0, 1, "sheetjs"), i(o, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(o, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(o, "DATA", 0, 0, "");
      for (var p = c.s.r; p <= c.e.r; ++p) {
        s(o, -1, 0, "BOT");
        for (var _ = c.s.c; _ <= c.e.c; ++_) {
          var x = me({ r: p, c: _ });
          if (u = h ? (l[p] || [])[_] : l[x], !u) {
            s(o, 1, 0, "");
            continue;
          }
          switch (u.t) {
            case "n":
              var g = u.w;
              !g && u.v != null && (g = u.v), g == null ? u.f && !u.F ? s(o, 1, 0, "=" + u.f) : s(o, 1, 0, "") : s(o, 0, g, "V");
              break;
            case "b":
              s(o, 0, u.v ? 1 : 0, u.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(o, 1, 0, isNaN(u.v) ? u.v : '="' + u.v + '"');
              break;
            case "d":
              u.w || (u.w = Mr(u.z || ye[14], Ze(Je(u.v)))), s(o, 0, u.w, "V");
              break;
            default:
              s(o, 1, 0, "");
          }
        }
      }
      s(o, -1, 0, "EOD");
      var C = `\r
`, O = o.join(C);
      return O;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
}(), ki = /* @__PURE__ */ function() {
  function e(u) {
    return u.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(u) {
    return u.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(u, h) {
    for (var p = u.split(`
`), _ = -1, x = -1, g = 0, C = []; g !== p.length; ++g) {
      var O = p[g].trim().split(":");
      if (O[0] === "cell") {
        var A = Pe(O[1]);
        if (C.length <= A.r)
          for (_ = C.length; _ <= A.r; ++_)
            C[_] || (C[_] = []);
        switch (_ = A.r, x = A.c, O[2]) {
          case "t":
            C[_][x] = e(O[3]);
            break;
          case "v":
            C[_][x] = +O[3];
            break;
          case "vtf":
            var B = O[O.length - 1];
          case "vtc":
            switch (O[3]) {
              case "nl":
                C[_][x] = !!+O[4];
                break;
              default:
                C[_][x] = +O[4];
                break;
            }
            O[2] == "vtf" && (C[_][x] = [C[_][x], B]);
        }
      }
    }
    return h && h.sheetRows && (C = C.slice(0, h.sheetRows)), C;
  }
  function n(u, h) {
    return dt(r(u, h), h);
  }
  function a(u, h) {
    return Jr(n(u, h), h);
  }
  var i = [
    "socialcalc:version:1.5",
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
  ].join(`
`), s = [
    "--SocialCalcSpreadsheetControlSave",
    "Content-type: text/plain; charset=UTF-8"
  ].join(`
`) + `
`, f = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), l = "--SocialCalcSpreadsheetControlSave--";
  function o(u) {
    if (!u || !u["!ref"])
      return "";
    for (var h = [], p = [], _, x = "", g = sr(u["!ref"]), C = Array.isArray(u), O = g.s.r; O <= g.e.r; ++O)
      for (var A = g.s.c; A <= g.e.c; ++A)
        if (x = me({ r: O, c: A }), _ = C ? (u[O] || [])[A] : u[x], !(!_ || _.v == null || _.t === "z")) {
          switch (p = ["cell", x, "t"], _.t) {
            case "s":
            case "str":
              p.push(t(_.v));
              break;
            case "n":
              _.f ? (p[2] = "vtf", p[3] = "n", p[4] = _.v, p[5] = t(_.f)) : (p[2] = "v", p[3] = _.v);
              break;
            case "b":
              p[2] = "vt" + (_.f ? "f" : "c"), p[3] = "nl", p[4] = _.v ? "1" : "0", p[5] = t(_.f || (_.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var B = Ze(Je(_.v));
              p[2] = "vtc", p[3] = "nd", p[4] = "" + B, p[5] = _.w || Mr(_.z || ye[14], B);
              break;
            case "e":
              continue;
          }
          h.push(p.join(":"));
        }
    return h.push("sheet:c:" + (g.e.c - g.s.c + 1) + ":r:" + (g.e.r - g.s.r + 1) + ":tvf:1"), h.push("valueformat:1:text-wiki"), h.join(`
`);
  }
  function c(u) {
    return [i, s, f, s, o(u), l].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: c
  };
}(), Ql = /* @__PURE__ */ function() {
  function e(c, u, h, p, _) {
    _.raw ? u[h][p] = c : c === "" || (c === "TRUE" ? u[h][p] = !0 : c === "FALSE" ? u[h][p] = !1 : isNaN(Or(c)) ? isNaN(Nt(c).getDate()) ? u[h][p] = c : u[h][p] = Je(c) : u[h][p] = Or(c));
  }
  function t(c, u) {
    var h = u || {}, p = [];
    if (!c || c.length === 0)
      return p;
    for (var _ = c.split(/[\r\n]/), x = _.length - 1; x >= 0 && _[x].length === 0; )
      --x;
    for (var g = 10, C = 0, O = 0; O <= x; ++O)
      C = _[O].indexOf(" "), C == -1 ? C = _[O].length : C++, g = Math.max(g, C);
    for (O = 0; O <= x; ++O) {
      p[O] = [];
      var A = 0;
      for (e(_[O].slice(0, g).trim(), p, O, A, h), A = 1; A <= (_[O].length - g) / 10 + 1; ++A)
        e(_[O].slice(g + (A - 1) * 10, g + A * 10).trim(), p, O, A, h);
    }
    return h.sheetRows && (p = p.slice(0, h.sheetRows)), p;
  }
  var r = {
    44: ",",
    9: "	",
    59: ";",
    124: "|"
  }, n = {
    44: 3,
    9: 2,
    59: 1,
    124: 0
  };
  function a(c) {
    for (var u = {}, h = !1, p = 0, _ = 0; p < c.length; ++p)
      (_ = c.charCodeAt(p)) == 34 ? h = !h : !h && _ in r && (u[_] = (u[_] || 0) + 1);
    _ = [];
    for (p in u)
      Object.prototype.hasOwnProperty.call(u, p) && _.push([u[p], p]);
    if (!_.length) {
      u = n;
      for (p in u)
        Object.prototype.hasOwnProperty.call(u, p) && _.push([u[p], p]);
    }
    return _.sort(function(x, g) {
      return x[0] - g[0] || n[x[1]] - n[g[1]];
    }), r[_.pop()[1]] || 44;
  }
  function i(c, u) {
    var h = u || {}, p = "", _ = h.dense ? [] : {}, x = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (p = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (p = c.charAt(4), c = c.slice(6)) : p = a(c.slice(0, 1024)) : h && h.FS ? p = h.FS : p = a(c.slice(0, 1024));
    var g = 0, C = 0, O = 0, A = 0, B = 0, z = p.charCodeAt(0), Q = !1, R = 0, U = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var L = h.dateNF != null ? po(h.dateNF) : null;
    function V() {
      var G = c.slice(A, B), j = {};
      if (G.charAt(0) == '"' && G.charAt(G.length - 1) == '"' && (G = G.slice(1, -1).replace(/""/g, '"')), G.length === 0)
        j.t = "z";
      else if (h.raw)
        j.t = "s", j.v = G;
      else if (G.trim().length === 0)
        j.t = "s", j.v = G;
      else if (G.charCodeAt(0) == 61)
        G.charCodeAt(1) == 34 && G.charCodeAt(G.length - 1) == 34 ? (j.t = "s", j.v = G.slice(2, -1).replace(/""/g, '"')) : qc(G) ? (j.t = "n", j.f = G.slice(1)) : (j.t = "s", j.v = G);
      else if (G == "TRUE")
        j.t = "b", j.v = !0;
      else if (G == "FALSE")
        j.t = "b", j.v = !1;
      else if (!isNaN(O = Or(G)))
        j.t = "n", h.cellText !== !1 && (j.w = G), j.v = O;
      else if (!isNaN(Nt(G).getDate()) || L && G.match(L)) {
        j.z = h.dateNF || ye[14];
        var re = 0;
        L && G.match(L) && (G = vo(G, h.dateNF, G.match(L) || []), re = 1), h.cellDates ? (j.t = "d", j.v = Je(G, re)) : (j.t = "n", j.v = Ze(Je(G, re))), h.cellText !== !1 && (j.w = Mr(j.z, j.v instanceof Date ? Ze(j.v) : j.v)), h.cellNF || delete j.z;
      } else
        j.t = "s", j.v = G;
      if (j.t == "z" || (h.dense ? (_[g] || (_[g] = []), _[g][C] = j) : _[me({ c: C, r: g })] = j), A = B + 1, U = c.charCodeAt(A), x.e.c < C && (x.e.c = C), x.e.r < g && (x.e.r = g), R == z)
        ++C;
      else if (C = 0, ++g, h.sheetRows && h.sheetRows <= g)
        return !0;
    }
    e:
      for (; B < c.length; ++B)
        switch (R = c.charCodeAt(B)) {
          case 34:
            U === 34 && (Q = !Q);
            break;
          case z:
          case 10:
          case 13:
            if (!Q && V())
              break e;
            break;
        }
    return B - A > 0 && V(), _["!ref"] = Re(x), _;
  }
  function s(c, u) {
    return !(u && u.PRN) || u.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, u) : dt(t(c, u), u);
  }
  function f(c, u) {
    var h = "", p = u.type == "string" ? [0, 0, 0, 0] : h2(c, u);
    switch (u.type) {
      case "base64":
        h = Dr(c);
        break;
      case "binary":
        h = c;
        break;
      case "buffer":
        u.codepage == 65001 ? h = c.toString("utf8") : u.codepage && typeof Xr < "u" ? h = Xr.utils.decode(u.codepage, c) : h = ue && Buffer.isBuffer(c) ? c.toString("binary") : Bt(c);
        break;
      case "array":
        h = wn(c);
        break;
      case "string":
        h = c;
        break;
      default:
        throw new Error("Unrecognized type " + u.type);
    }
    return p[0] == 239 && p[1] == 187 && p[2] == 191 ? h = At(h.slice(3)) : u.type != "string" && u.type != "buffer" && u.codepage == 65001 ? h = At(h) : u.type == "binary" && typeof Xr < "u" && u.codepage && (h = Xr.utils.decode(u.codepage, Xr.utils.encode(28591, h))), h.slice(0, 19) == "socialcalc:version:" ? ki.to_sheet(u.type == "string" ? h : At(h), u) : s(h, u);
  }
  function l(c, u) {
    return Jr(f(c, u), u);
  }
  function o(c) {
    for (var u = [], h = Ee(c["!ref"]), p, _ = Array.isArray(c), x = h.s.r; x <= h.e.r; ++x) {
      for (var g = [], C = h.s.c; C <= h.e.c; ++C) {
        var O = me({ r: x, c: C });
        if (p = _ ? (c[x] || [])[C] : c[O], !p || p.v == null) {
          g.push("          ");
          continue;
        }
        for (var A = (p.w || (Nr(p), p.w) || "").slice(0, 10); A.length < 10; )
          A += " ";
        g.push(A + (C === 0 ? " " : ""));
      }
      u.push(g.join(""));
    }
    return u.join(`
`);
  }
  return {
    to_workbook: l,
    to_sheet: f,
    from_sheet: o
  };
}(), xa = /* @__PURE__ */ function() {
  function e(S, P, y) {
    if (!!S) {
      tr(S, S.l || 0);
      for (var F = y.Enum || fr; S.l < S.length; ) {
        var H = S.read_shift(2), ie = F[H] || F[65535], se = S.read_shift(2), ae = S.l + se, Z = ie.f && ie.f(S, se, y);
        if (S.l = ae, P(Z, ie, H))
          return;
      }
    }
  }
  function t(S, P) {
    switch (P.type) {
      case "base64":
        return r(pr(Dr(S)), P);
      case "binary":
        return r(pr(S), P);
      case "buffer":
      case "array":
        return r(S, P);
    }
    throw "Unsupported type " + P.type;
  }
  function r(S, P) {
    if (!S)
      return S;
    var y = P || {}, F = y.dense ? [] : {}, H = "Sheet1", ie = "", se = 0, ae = {}, Z = [], Te = [], ce = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, ze = y.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      y.Enum = fr, e(S, function(ne, or, Ar) {
        switch (Ar) {
          case 0:
            y.vers = ne, ne >= 4096 && (y.qpro = !0);
            break;
          case 6:
            ce = ne;
            break;
          case 204:
            ne && (ie = ne);
            break;
          case 222:
            ie = ne;
            break;
          case 15:
          case 51:
            y.qpro || (ne[1].v = ne[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Ar == 14 && (ne[2] & 112) == 112 && (ne[2] & 15) > 1 && (ne[2] & 15) < 15 && (ne[1].z = y.dateNF || ye[14], y.cellDates && (ne[1].t = "d", ne[1].v = Ja(ne[1].v))), y.qpro && ne[3] > se && (F["!ref"] = Re(ce), ae[H] = F, Z.push(H), F = y.dense ? [] : {}, ce = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, se = ne[3], H = ie || "Sheet" + (se + 1), ie = "");
            var Hr = y.dense ? (F[ne[0].r] || [])[ne[0].c] : F[me(ne[0])];
            if (Hr) {
              Hr.t = ne[1].t, Hr.v = ne[1].v, ne[1].z != null && (Hr.z = ne[1].z), ne[1].f != null && (Hr.f = ne[1].f);
              break;
            }
            y.dense ? (F[ne[0].r] || (F[ne[0].r] = []), F[ne[0].r][ne[0].c] = ne[1]) : F[me(ne[0])] = ne[1];
            break;
        }
      }, y);
    else if (S[2] == 26 || S[2] == 14)
      y.Enum = er, S[2] == 14 && (y.qpro = !0, S.l = 0), e(S, function(ne, or, Ar) {
        switch (Ar) {
          case 204:
            H = ne;
            break;
          case 22:
            ne[1].v = ne[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (ne[3] > se && (F["!ref"] = Re(ce), ae[H] = F, Z.push(H), F = y.dense ? [] : {}, ce = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, se = ne[3], H = "Sheet" + (se + 1)), ze > 0 && ne[0].r >= ze)
              break;
            y.dense ? (F[ne[0].r] || (F[ne[0].r] = []), F[ne[0].r][ne[0].c] = ne[1]) : F[me(ne[0])] = ne[1], ce.e.c < ne[0].c && (ce.e.c = ne[0].c), ce.e.r < ne[0].r && (ce.e.r = ne[0].r);
            break;
          case 27:
            ne[14e3] && (Te[ne[14e3][0]] = ne[14e3][1]);
            break;
          case 1537:
            Te[ne[0]] = ne[1], ne[0] == se && (H = ne[1]);
            break;
        }
      }, y);
    else
      throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (F["!ref"] = Re(ce), ae[ie || H] = F, Z.push(ie || H), !Te.length)
      return { SheetNames: Z, Sheets: ae };
    for (var xe = {}, Sr = [], Ae = 0; Ae < Te.length; ++Ae)
      ae[Z[Ae]] ? (Sr.push(Te[Ae] || Z[Ae]), xe[Te[Ae]] = ae[Te[Ae]] || ae[Z[Ae]]) : (Sr.push(Te[Ae]), xe[Te[Ae]] = { "!ref": "A1" });
    return { SheetNames: Sr, Sheets: xe };
  }
  function n(S, P) {
    var y = P || {};
    if (+y.codepage >= 0 && Rt(+y.codepage), y.type == "string")
      throw new Error("Cannot write WK1 to JS string");
    var F = qe(), H = Ee(S["!ref"]), ie = Array.isArray(S), se = [];
    J(F, 0, i(1030)), J(F, 6, l(H));
    for (var ae = Math.min(H.e.r, 8191), Z = H.s.r; Z <= ae; ++Z)
      for (var Te = Ve(Z), ce = H.s.c; ce <= H.e.c; ++ce) {
        Z === H.s.r && (se[ce] = je(ce));
        var ze = se[ce] + Te, xe = ie ? (S[Z] || [])[ce] : S[ze];
        if (!(!xe || xe.t == "z"))
          if (xe.t == "n")
            (xe.v | 0) == xe.v && xe.v >= -32768 && xe.v <= 32767 ? J(F, 13, p(Z, ce, xe.v)) : J(F, 14, x(Z, ce, xe.v));
          else {
            var Sr = Nr(xe);
            J(F, 15, u(Z, ce, Sr.slice(0, 239)));
          }
      }
    return J(F, 1), F.end();
  }
  function a(S, P) {
    var y = P || {};
    if (+y.codepage >= 0 && Rt(+y.codepage), y.type == "string")
      throw new Error("Cannot write WK3 to JS string");
    var F = qe();
    J(F, 0, s(S));
    for (var H = 0, ie = 0; H < S.SheetNames.length; ++H)
      (S.Sheets[S.SheetNames[H]] || {})["!ref"] && J(F, 27, Ie(S.SheetNames[H], ie++));
    var se = 0;
    for (H = 0; H < S.SheetNames.length; ++H) {
      var ae = S.Sheets[S.SheetNames[H]];
      if (!(!ae || !ae["!ref"])) {
        for (var Z = Ee(ae["!ref"]), Te = Array.isArray(ae), ce = [], ze = Math.min(Z.e.r, 8191), xe = Z.s.r; xe <= ze; ++xe)
          for (var Sr = Ve(xe), Ae = Z.s.c; Ae <= Z.e.c; ++Ae) {
            xe === Z.s.r && (ce[Ae] = je(Ae));
            var ne = ce[Ae] + Sr, or = Te ? (ae[xe] || [])[Ae] : ae[ne];
            if (!(!or || or.t == "z"))
              if (or.t == "n")
                J(F, 23, V(xe, Ae, se, or.v));
              else {
                var Ar = Nr(or);
                J(F, 22, R(xe, Ae, se, Ar.slice(0, 239)));
              }
          }
        ++se;
      }
    }
    return J(F, 1), F.end();
  }
  function i(S) {
    var P = M(2);
    return P.write_shift(2, S), P;
  }
  function s(S) {
    var P = M(26);
    P.write_shift(2, 4096), P.write_shift(2, 4), P.write_shift(4, 0);
    for (var y = 0, F = 0, H = 0, ie = 0; ie < S.SheetNames.length; ++ie) {
      var se = S.SheetNames[ie], ae = S.Sheets[se];
      if (!(!ae || !ae["!ref"])) {
        ++H;
        var Z = sr(ae["!ref"]);
        y < Z.e.r && (y = Z.e.r), F < Z.e.c && (F = Z.e.c);
      }
    }
    return y > 8191 && (y = 8191), P.write_shift(2, y), P.write_shift(1, H), P.write_shift(1, F), P.write_shift(2, 0), P.write_shift(2, 0), P.write_shift(1, 1), P.write_shift(1, 2), P.write_shift(4, 0), P.write_shift(4, 0), P;
  }
  function f(S, P, y) {
    var F = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return P == 8 && y.qpro ? (F.s.c = S.read_shift(1), S.l++, F.s.r = S.read_shift(2), F.e.c = S.read_shift(1), S.l++, F.e.r = S.read_shift(2), F) : (F.s.c = S.read_shift(2), F.s.r = S.read_shift(2), P == 12 && y.qpro && (S.l += 2), F.e.c = S.read_shift(2), F.e.r = S.read_shift(2), P == 12 && y.qpro && (S.l += 2), F.s.c == 65535 && (F.s.c = F.e.c = F.s.r = F.e.r = 0), F);
  }
  function l(S) {
    var P = M(8);
    return P.write_shift(2, S.s.c), P.write_shift(2, S.s.r), P.write_shift(2, S.e.c), P.write_shift(2, S.e.r), P;
  }
  function o(S, P, y) {
    var F = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return y.qpro && y.vers != 20768 ? (F[0].c = S.read_shift(1), F[3] = S.read_shift(1), F[0].r = S.read_shift(2), S.l += 2) : (F[2] = S.read_shift(1), F[0].c = S.read_shift(2), F[0].r = S.read_shift(2)), F;
  }
  function c(S, P, y) {
    var F = S.l + P, H = o(S, P, y);
    if (H[1].t = "s", y.vers == 20768) {
      S.l++;
      var ie = S.read_shift(1);
      return H[1].v = S.read_shift(ie, "utf8"), H;
    }
    return y.qpro && S.l++, H[1].v = S.read_shift(F - S.l, "cstr"), H;
  }
  function u(S, P, y) {
    var F = M(7 + y.length);
    F.write_shift(1, 255), F.write_shift(2, P), F.write_shift(2, S), F.write_shift(1, 39);
    for (var H = 0; H < F.length; ++H) {
      var ie = y.charCodeAt(H);
      F.write_shift(1, ie >= 128 ? 95 : ie);
    }
    return F.write_shift(1, 0), F;
  }
  function h(S, P, y) {
    var F = o(S, P, y);
    return F[1].v = S.read_shift(2, "i"), F;
  }
  function p(S, P, y) {
    var F = M(7);
    return F.write_shift(1, 255), F.write_shift(2, P), F.write_shift(2, S), F.write_shift(2, y, "i"), F;
  }
  function _(S, P, y) {
    var F = o(S, P, y);
    return F[1].v = S.read_shift(8, "f"), F;
  }
  function x(S, P, y) {
    var F = M(13);
    return F.write_shift(1, 255), F.write_shift(2, P), F.write_shift(2, S), F.write_shift(8, y, "f"), F;
  }
  function g(S, P, y) {
    var F = S.l + P, H = o(S, P, y);
    if (H[1].v = S.read_shift(8, "f"), y.qpro)
      S.l = F;
    else {
      var ie = S.read_shift(2);
      B(S.slice(S.l, S.l + ie), H), S.l += ie;
    }
    return H;
  }
  function C(S, P, y) {
    var F = P & 32768;
    return P &= -32769, P = (F ? S : 0) + (P >= 8192 ? P - 16384 : P), (F ? "" : "$") + (y ? je(P) : Ve(P));
  }
  var O = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, A = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "+",
    "-",
    "*",
    "/",
    "^",
    "=",
    "<>",
    "<=",
    ">=",
    "<",
    ">",
    "",
    "",
    "",
    "",
    "&",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];
  function B(S, P) {
    tr(S, 0);
    for (var y = [], F = 0, H = "", ie = "", se = "", ae = ""; S.l < S.length; ) {
      var Z = S[S.l++];
      switch (Z) {
        case 0:
          y.push(S.read_shift(8, "f"));
          break;
        case 1:
          ie = C(P[0].c, S.read_shift(2), !0), H = C(P[0].r, S.read_shift(2), !1), y.push(ie + H);
          break;
        case 2:
          {
            var Te = C(P[0].c, S.read_shift(2), !0), ce = C(P[0].r, S.read_shift(2), !1);
            ie = C(P[0].c, S.read_shift(2), !0), H = C(P[0].r, S.read_shift(2), !1), y.push(Te + ce + ":" + ie + H);
          }
          break;
        case 3:
          if (S.l < S.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          y.push("(" + y.pop() + ")");
          break;
        case 5:
          y.push(S.read_shift(2));
          break;
        case 6:
          {
            for (var ze = ""; Z = S[S.l++]; )
              ze += String.fromCharCode(Z);
            y.push('"' + ze.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          y.push("-" + y.pop());
          break;
        case 23:
          y.push("+" + y.pop());
          break;
        case 22:
          y.push("NOT(" + y.pop() + ")");
          break;
        case 20:
        case 21:
          ae = y.pop(), se = y.pop(), y.push(["AND", "OR"][Z - 20] + "(" + se + "," + ae + ")");
          break;
        default:
          if (Z < 32 && A[Z])
            ae = y.pop(), se = y.pop(), y.push(se + A[Z] + ae);
          else if (O[Z]) {
            if (F = O[Z][1], F == 69 && (F = S[S.l++]), F > y.length) {
              console.error("WK1 bad formula parse 0x" + Z.toString(16) + ":|" + y.join("|") + "|");
              return;
            }
            var xe = y.slice(-F);
            y.length -= F, y.push(O[Z][0] + "(" + xe.join(",") + ")");
          } else
            return Z <= 7 ? console.error("WK1 invalid opcode " + Z.toString(16)) : Z <= 24 ? console.error("WK1 unsupported op " + Z.toString(16)) : Z <= 30 ? console.error("WK1 invalid opcode " + Z.toString(16)) : Z <= 115 ? console.error("WK1 unsupported function opcode " + Z.toString(16)) : console.error("WK1 unrecognized opcode " + Z.toString(16));
      }
    }
    y.length == 1 ? P[1].f = "" + y[0] : console.error("WK1 bad formula parse |" + y.join("|") + "|");
  }
  function z(S) {
    var P = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return P[0].r = S.read_shift(2), P[3] = S[S.l++], P[0].c = S[S.l++], P;
  }
  function Q(S, P) {
    var y = z(S);
    return y[1].t = "s", y[1].v = S.read_shift(P - 4, "cstr"), y;
  }
  function R(S, P, y, F) {
    var H = M(6 + F.length);
    H.write_shift(2, S), H.write_shift(1, y), H.write_shift(1, P), H.write_shift(1, 39);
    for (var ie = 0; ie < F.length; ++ie) {
      var se = F.charCodeAt(ie);
      H.write_shift(1, se >= 128 ? 95 : se);
    }
    return H.write_shift(1, 0), H;
  }
  function U(S, P) {
    var y = z(S);
    y[1].v = S.read_shift(2);
    var F = y[1].v >> 1;
    if (y[1].v & 1)
      switch (F & 7) {
        case 0:
          F = (F >> 3) * 5e3;
          break;
        case 1:
          F = (F >> 3) * 500;
          break;
        case 2:
          F = (F >> 3) / 20;
          break;
        case 3:
          F = (F >> 3) / 200;
          break;
        case 4:
          F = (F >> 3) / 2e3;
          break;
        case 5:
          F = (F >> 3) / 2e4;
          break;
        case 6:
          F = (F >> 3) / 16;
          break;
        case 7:
          F = (F >> 3) / 64;
          break;
      }
    return y[1].v = F, y;
  }
  function L(S, P) {
    var y = z(S), F = S.read_shift(4), H = S.read_shift(4), ie = S.read_shift(2);
    if (ie == 65535)
      return F === 0 && H === 3221225472 ? (y[1].t = "e", y[1].v = 15) : F === 0 && H === 3489660928 ? (y[1].t = "e", y[1].v = 42) : y[1].v = 0, y;
    var se = ie & 32768;
    return ie = (ie & 32767) - 16446, y[1].v = (1 - se * 2) * (H * Math.pow(2, ie + 32) + F * Math.pow(2, ie)), y;
  }
  function V(S, P, y, F) {
    var H = M(14);
    if (H.write_shift(2, S), H.write_shift(1, y), H.write_shift(1, P), F == 0)
      return H.write_shift(4, 0), H.write_shift(4, 0), H.write_shift(2, 65535), H;
    var ie = 0, se = 0, ae = 0, Z = 0;
    return F < 0 && (ie = 1, F = -F), se = Math.log2(F) | 0, F /= Math.pow(2, se - 31), Z = F >>> 0, (Z & 2147483648) == 0 && (F /= 2, ++se, Z = F >>> 0), F -= Z, Z |= 2147483648, Z >>>= 0, F *= Math.pow(2, 32), ae = F >>> 0, H.write_shift(4, ae), H.write_shift(4, Z), se += 16383 + (ie ? 32768 : 0), H.write_shift(2, se), H;
  }
  function G(S, P) {
    var y = L(S);
    return S.l += P - 14, y;
  }
  function j(S, P) {
    var y = z(S), F = S.read_shift(4);
    return y[1].v = F >> 6, y;
  }
  function re(S, P) {
    var y = z(S), F = S.read_shift(8, "f");
    return y[1].v = F, y;
  }
  function ge(S, P) {
    var y = re(S);
    return S.l += P - 10, y;
  }
  function oe(S, P) {
    return S[S.l + P - 1] == 0 ? S.read_shift(P, "cstr") : "";
  }
  function Be(S, P) {
    var y = S[S.l++];
    y > P - 1 && (y = P - 1);
    for (var F = ""; F.length < y; )
      F += String.fromCharCode(S[S.l++]);
    return F;
  }
  function Ce(S, P, y) {
    if (!(!y.qpro || P < 21)) {
      var F = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var H = S.read_shift(P - 21, "cstr");
      return [F, H];
    }
  }
  function ur(S, P) {
    for (var y = {}, F = S.l + P; S.l < F; ) {
      var H = S.read_shift(2);
      if (H == 14e3) {
        for (y[H] = [0, ""], y[H][0] = S.read_shift(2); S[S.l]; )
          y[H][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return y;
  }
  function Ie(S, P) {
    var y = M(5 + S.length);
    y.write_shift(2, 14e3), y.write_shift(2, P);
    for (var F = 0; F < S.length; ++F) {
      var H = S.charCodeAt(F);
      y[y.l++] = H > 127 ? 95 : H;
    }
    return y[y.l++] = 0, y;
  }
  var fr = {
    0: { n: "BOF", f: Oi },
    1: { n: "EOF" },
    2: { n: "CALCMODE" },
    3: { n: "CALCORDER" },
    4: { n: "SPLIT" },
    5: { n: "SYNC" },
    6: { n: "RANGE", f },
    7: { n: "WINDOW1" },
    8: { n: "COLW1" },
    9: { n: "WINTWO" },
    10: { n: "COLW2" },
    11: { n: "NAME" },
    12: { n: "BLANK" },
    13: { n: "INTEGER", f: h },
    14: { n: "NUMBER", f: _ },
    15: { n: "LABEL", f: c },
    16: { n: "FORMULA", f: g },
    24: { n: "TABLE" },
    25: { n: "ORANGE" },
    26: { n: "PRANGE" },
    27: { n: "SRANGE" },
    28: { n: "FRANGE" },
    29: { n: "KRANGE1" },
    32: { n: "HRANGE" },
    35: { n: "KRANGE2" },
    36: { n: "PROTEC" },
    37: { n: "FOOTER" },
    38: { n: "HEADER" },
    39: { n: "SETUP" },
    40: { n: "MARGINS" },
    41: { n: "LABELFMT" },
    42: { n: "TITLES" },
    43: { n: "SHEETJS" },
    45: { n: "GRAPH" },
    46: { n: "NGRAPH" },
    47: { n: "CALCCOUNT" },
    48: { n: "UNFORMATTED" },
    49: { n: "CURSORW12" },
    50: { n: "WINDOW" },
    51: { n: "STRING", f: c },
    55: { n: "PASSWORD" },
    56: { n: "LOCKED" },
    60: { n: "QUERY" },
    61: { n: "QUERYNAME" },
    62: { n: "PRINT" },
    63: { n: "PRINTNAME" },
    64: { n: "GRAPH2" },
    65: { n: "GRAPHNAME" },
    66: { n: "ZOOM" },
    67: { n: "SYMSPLIT" },
    68: { n: "NSROWS" },
    69: { n: "NSCOLS" },
    70: { n: "RULER" },
    71: { n: "NNAME" },
    72: { n: "ACOMM" },
    73: { n: "AMACRO" },
    74: { n: "PARSE" },
    102: { n: "PRANGES??" },
    103: { n: "RRANGES??" },
    104: { n: "FNAME??" },
    105: { n: "MRANGES??" },
    204: { n: "SHEETNAMECS", f: oe },
    222: { n: "SHEETNAMELP", f: Be },
    65535: { n: "" }
  }, er = {
    0: { n: "BOF" },
    1: { n: "EOF" },
    2: { n: "PASSWORD" },
    3: { n: "CALCSET" },
    4: { n: "WINDOWSET" },
    5: { n: "SHEETCELLPTR" },
    6: { n: "SHEETLAYOUT" },
    7: { n: "COLUMNWIDTH" },
    8: { n: "HIDDENCOLUMN" },
    9: { n: "USERRANGE" },
    10: { n: "SYSTEMRANGE" },
    11: { n: "ZEROFORCE" },
    12: { n: "SORTKEYDIR" },
    13: { n: "FILESEAL" },
    14: { n: "DATAFILLNUMS" },
    15: { n: "PRINTMAIN" },
    16: { n: "PRINTSTRING" },
    17: { n: "GRAPHMAIN" },
    18: { n: "GRAPHSTRING" },
    19: { n: "??" },
    20: { n: "ERRCELL" },
    21: { n: "NACELL" },
    22: { n: "LABEL16", f: Q },
    23: { n: "NUMBER17", f: L },
    24: { n: "NUMBER18", f: U },
    25: { n: "FORMULA19", f: G },
    26: { n: "FORMULA1A" },
    27: { n: "XFORMAT", f: ur },
    28: { n: "DTLABELMISC" },
    29: { n: "DTLABELCELL" },
    30: { n: "GRAPHWINDOW" },
    31: { n: "CPA" },
    32: { n: "LPLAUTO" },
    33: { n: "QUERY" },
    34: { n: "HIDDENSHEET" },
    35: { n: "??" },
    37: { n: "NUMBER25", f: j },
    38: { n: "??" },
    39: { n: "NUMBER27", f: re },
    40: { n: "FORMULA28", f: ge },
    142: { n: "??" },
    147: { n: "??" },
    150: { n: "??" },
    151: { n: "??" },
    152: { n: "??" },
    153: { n: "??" },
    154: { n: "??" },
    155: { n: "??" },
    156: { n: "??" },
    163: { n: "??" },
    174: { n: "??" },
    175: { n: "??" },
    176: { n: "??" },
    177: { n: "??" },
    184: { n: "??" },
    185: { n: "??" },
    186: { n: "??" },
    187: { n: "??" },
    188: { n: "??" },
    195: { n: "??" },
    201: { n: "??" },
    204: { n: "SHEETNAMECS", f: oe },
    205: { n: "??" },
    206: { n: "??" },
    207: { n: "??" },
    208: { n: "??" },
    256: { n: "??" },
    259: { n: "??" },
    260: { n: "??" },
    261: { n: "??" },
    262: { n: "??" },
    263: { n: "??" },
    265: { n: "??" },
    266: { n: "??" },
    267: { n: "??" },
    268: { n: "??" },
    270: { n: "??" },
    271: { n: "??" },
    384: { n: "??" },
    389: { n: "??" },
    390: { n: "??" },
    393: { n: "??" },
    396: { n: "??" },
    512: { n: "??" },
    514: { n: "??" },
    513: { n: "??" },
    516: { n: "??" },
    517: { n: "??" },
    640: { n: "??" },
    641: { n: "??" },
    642: { n: "??" },
    643: { n: "??" },
    644: { n: "??" },
    645: { n: "??" },
    646: { n: "??" },
    647: { n: "??" },
    648: { n: "??" },
    658: { n: "??" },
    659: { n: "??" },
    660: { n: "??" },
    661: { n: "??" },
    662: { n: "??" },
    665: { n: "??" },
    666: { n: "??" },
    768: { n: "??" },
    772: { n: "??" },
    1537: { n: "SHEETINFOQP", f: Ce },
    1600: { n: "??" },
    1602: { n: "??" },
    1793: { n: "??" },
    1794: { n: "??" },
    1795: { n: "??" },
    1796: { n: "??" },
    1920: { n: "??" },
    2048: { n: "??" },
    2049: { n: "??" },
    2052: { n: "??" },
    2688: { n: "??" },
    10998: { n: "??" },
    12849: { n: "??" },
    28233: { n: "??" },
    28484: { n: "??" },
    65535: { n: "" }
  };
  return {
    sheet_to_wk1: n,
    book_to_wk3: a,
    to_workbook: t
  };
}(), ec = /^\s|\s$|[\t\n\r]/;
function Pi(e, t) {
  if (!t.bookSST)
    return "";
  var r = [De];
  r[r.length] = Y("sst", null, {
    xmlns: xt[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(ec) && (i += ' xml:space="preserve"'), i += ">" + ve(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function rc(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function tc(e, t) {
  return t || (t = M(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var nc = zo;
function ac(e) {
  var t = qe();
  W(t, 159, tc(e));
  for (var r = 0; r < e.length; ++r)
    W(t, 19, nc(e[r]));
  return W(t, 160), t.end();
}
function ic(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n)
    t[n] = r[n].charCodeAt(0);
  return t;
}
function Li(e) {
  var t = 0, r, n = ic(e), a = n.length + 1, i, s, f, l, o;
  for (r = zr(a), r[0] = n.length, i = 1; i != a; ++i)
    r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = (t & 16384) === 0 ? 0 : 1, l = t << 1 & 32767, o = f | l, t = o ^ s;
  return t ^ 52811;
}
var sc = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Dr(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(ue && Buffer.isBuffer(a) ? a.toString("binary") : Bt(a), i);
      case "array":
        return t(wn(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, l = a.match(/\\trowd.*?\\row\b/g);
    if (!l.length)
      throw new Error("RTF missing table");
    var o = { s: { c: 0, r: 0 }, e: { c: 0, r: l.length - 1 } };
    return l.forEach(function(c, u) {
      Array.isArray(f) && (f[u] = []);
      for (var h = /\\\w+\b/g, p = 0, _, x = -1; _ = h.exec(c); ) {
        switch (_[0]) {
          case "\\cell":
            var g = c.slice(p, h.lastIndex - _[0].length);
            if (g[0] == " " && (g = g.slice(1)), ++x, g.length) {
              var C = { v: g, t: "s" };
              Array.isArray(f) ? f[u][x] = C : f[me({ r: u, c: x })] = C;
            }
            break;
        }
        p = h.lastIndex;
      }
      x > o.e.c && (o.e.c = x);
    }), f["!ref"] = Re(o), f;
  }
  function r(a, i) {
    return Jr(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Ee(a["!ref"]), f, l = Array.isArray(a), o = s.s.r; o <= s.e.r; ++o) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c)
        i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var u = me({ r: o, c });
        f = l ? (a[o] || [])[c] : a[u], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Nr(f), f.w))), i.push("\\cell"));
      }
      i.push("\\pard\\intbl\\row");
    }
    return i.join("") + "}";
  }
  return {
    to_workbook: r,
    to_sheet: e,
    from_sheet: n
  };
}();
function da(e) {
  for (var t = 0, r = 1; t != 3; ++t)
    r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var fc = 6, Rr = fc;
function hn(e) {
  return Math.floor((e + Math.round(128 / Rr) / 256) * Rr);
}
function un(e) {
  return Math.floor((e - 5) / Rr * 100 + 0.5) / 100;
}
function $n(e) {
  return Math.round((e * Rr + 5) / Rr * 256) / 256;
}
function x0(e) {
  e.width ? (e.wpx = hn(e.width), e.wch = un(e.wpx), e.MDW = Rr) : e.wpx ? (e.wch = un(e.wpx), e.width = $n(e.wch), e.MDW = Rr) : typeof e.wch == "number" && (e.width = $n(e.wch), e.wpx = hn(e.width), e.MDW = Rr), e.customWidth && delete e.customWidth;
}
var oc = 96, Bi = oc;
function xn(e) {
  return e * 96 / Bi;
}
function Mi(e) {
  return e * Bi / 96;
}
function lc(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n)
      e[n] != null && (t[t.length] = Y("numFmt", null, { numFmtId: n, formatCode: ve(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = Y("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function cc(e) {
  var t = [];
  return t[t.length] = Y("cellXfs", null), e.forEach(function(r) {
    t[t.length] = Y("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = Y("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function bi(e, t) {
  var r = [De, Y("styleSheet", null, {
    xmlns: xt[0],
    "xmlns:vt": ke.vt
  })], n;
  return e.SSF && (n = lc(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = cc(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function hc(e, t) {
  var r = e.read_shift(2), n = $e(e);
  return [r, n];
}
function uc(e, t, r) {
  r || (r = M(6 + 4 * t.length)), r.write_shift(2, e), Le(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function xc(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = el(e);
  a.fItalic && (n.italic = 1), a.fCondense && (n.condense = 1), a.fExtend && (n.extend = 1), a.fShadow && (n.shadow = 1), a.fOutline && (n.outline = 1), a.fStrikeout && (n.strike = 1);
  var i = e.read_shift(2);
  switch (i === 700 && (n.bold = 1), e.read_shift(2)) {
    case 1:
      n.vertAlign = "superscript";
      break;
    case 2:
      n.vertAlign = "subscript";
      break;
  }
  var s = e.read_shift(1);
  s != 0 && (n.underline = s);
  var f = e.read_shift(1);
  f > 0 && (n.family = f);
  var l = e.read_shift(1);
  switch (l > 0 && (n.charset = l), e.l++, n.color = Qo(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = $e(e), n;
}
function dc(e, t) {
  t || (t = M(25 + 4 * 32)), t.write_shift(2, e.sz * 20), rl(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), ln(e.color, t);
  var n = 0;
  return e.scheme == "major" && (n = 1), e.scheme == "minor" && (n = 2), t.write_shift(1, n), Le(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var pc = [
  "none",
  "solid",
  "mediumGray",
  "darkGray",
  "lightGray",
  "darkHorizontal",
  "darkVertical",
  "darkDown",
  "darkUp",
  "darkGrid",
  "darkTrellis",
  "lightHorizontal",
  "lightVertical",
  "lightDown",
  "lightUp",
  "lightGrid",
  "lightTrellis",
  "gray125",
  "gray0625"
], bn, vc = wr;
function pa(e, t) {
  t || (t = M(4 * 3 + 8 * 7 + 16 * 1)), bn || (bn = r0(pc));
  var r = bn[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (ln({ auto: 1 }, t), ln({ auto: 1 }, t); n < 12; ++n)
      t.write_shift(4, 0);
  else {
    for (; n < 4; ++n)
      t.write_shift(4, 0);
    for (; n < 12; ++n)
      t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function mc(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function Ui(e, t, r) {
  r || (r = M(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function Et(e, t) {
  return t || (t = M(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var gc = wr;
function _c(e, t) {
  return t || (t = M(51)), t.write_shift(1, 0), Et(null, t), Et(null, t), Et(null, t), Et(null, t), Et(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Tc(e, t) {
  return t || (t = M(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, +e.builtinId), t.write_shift(1, 0), on(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Ec(e, t, r) {
  var n = M(2052);
  return n.write_shift(4, e), on(t, n), on(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function wc(e, t) {
  if (!!t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && ++r;
    }), r != 0 && (W(e, 615, mr(r)), [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && W(e, 44, uc(a, t[a]));
    }), W(e, 616));
  }
}
function Sc(e) {
  var t = 1;
  W(e, 611, mr(t)), W(e, 43, dc({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2,
    scheme: "minor"
  })), W(e, 612);
}
function Ac(e) {
  var t = 2;
  W(e, 603, mr(t)), W(e, 45, pa({ patternType: "none" })), W(e, 45, pa({ patternType: "gray125" })), W(e, 604);
}
function Fc(e) {
  var t = 1;
  W(e, 613, mr(t)), W(e, 46, _c()), W(e, 614);
}
function yc(e) {
  var t = 1;
  W(e, 626, mr(t)), W(e, 47, Ui({
    numFmtId: 0,
    fontId: 0,
    fillId: 0,
    borderId: 0
  }, 65535)), W(e, 627);
}
function Cc(e, t) {
  W(e, 617, mr(t.length)), t.forEach(function(r) {
    W(e, 47, Ui(r, 0));
  }), W(e, 618);
}
function Oc(e) {
  var t = 1;
  W(e, 619, mr(t)), W(e, 48, Tc({
    xfId: 0,
    builtinId: 0,
    name: "Normal"
  })), W(e, 620);
}
function Rc(e) {
  var t = 0;
  W(e, 505, mr(t)), W(e, 506);
}
function Dc(e) {
  var t = 0;
  W(e, 508, Ec(t, "TableStyleMedium9", "PivotStyleMedium4")), W(e, 509);
}
function Nc(e, t) {
  var r = qe();
  return W(r, 278), wc(r, e.SSF), Sc(r), Ac(r), Fc(r), yc(r), Cc(r, t.cellXfs), Oc(r), Rc(r), Dc(r), W(r, 279), r.end();
}
function Wi(e, t) {
  if (t && t.themeXLSX)
    return t.themeXLSX;
  if (e && typeof e.raw == "string")
    return e.raw;
  var r = [De];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF"/>', r[r.length] = '<a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/>', r[r.length] = '<a:font script="Hans" typeface="\u5B8B\u4F53"/>', r[r.length] = '<a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF"/>', r[r.length] = '<a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/>', r[r.length] = '<a:font script="Hans" typeface="\u5B8B\u4F53"/>', r[r.length] = '<a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function Ic(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: $e(e)
  };
}
function kc(e) {
  var t = M(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), Le(e.name, t), t.slice(0, t.l);
}
function Pc(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function Lc(e) {
  var t = M(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function Bc(e, t) {
  var r = M(8 + 2 * t.length);
  return r.write_shift(4, e), Le(t, r), r.slice(0, r.l);
}
function Mc(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function bc(e, t) {
  var r = M(8);
  return r.write_shift(4, e), r.write_shift(4, t ? 1 : 0), r;
}
function Uc() {
  var e = qe();
  return W(e, 332), W(e, 334, mr(1)), W(e, 335, kc({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), W(e, 336), W(e, 339, Bc(1, "XLDAPR")), W(e, 52), W(e, 35, mr(514)), W(e, 4096, mr(0)), W(e, 4097, cr(1)), W(e, 36), W(e, 53), W(e, 340), W(e, 337, bc(1, !0)), W(e, 51, Lc([[1, 0]])), W(e, 338), W(e, 333), e.end();
}
function Hi() {
  var e = [De];
  return e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`), e.join("");
}
function Wc(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = me(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
var ft = 1024;
function Vi(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    Y("xml", null, { "xmlns:v": nr.v, "xmlns:o": nr.o, "xmlns:x": nr.x, "xmlns:mv": nr.mv }).replace(/\/>/, ">"),
    Y("o:shapelayout", Y("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    Y("v:shapetype", [
      Y("v:stroke", null, { joinstyle: "miter" }),
      Y("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; ft < e * 1e3; )
    ft += 1e3;
  return t.forEach(function(i) {
    var s = Pe(i[0]), f = { color2: "#BEFF82", type: "gradient" };
    f.type == "gradient" && (f.angle = "-180");
    var l = f.type == "gradient" ? Y("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, o = Y("v:fill", l, f), c = { on: "t", obscured: "t" };
    ++ft, a = a.concat([
      "<v:shape" + It({
        id: "_x0000_s" + ft,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      o,
      Y("v:shadow", null, c),
      Y("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      He("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      He("x:AutoFill", "False"),
      He("x:Row", String(s.r)),
      He("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Gi(e) {
  var t = [De, Y("comments", null, { xmlns: xt[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = ve(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(l) {
      l.a && (a = r.indexOf(ve(l.a))), i.push(l.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1)
      t.push(He("t", ve(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f)
        s += `Reply:
    ` + i[f] + `
`;
      t.push(He("t", ve(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Hc(e, t, r) {
  var n = [De, Y("ThreadedComments", null, { xmlns: ke.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, f) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && t.indexOf(s.a) == -1 && t.push(s.a);
      var l = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + r.tcid++).slice(-12) + "}"
      };
      f == 0 ? i = l.id : l.parentId = i, s.ID = l.id, s.a && (l.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(Y("threadedComment", He("text", s.t || ""), l));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function Vc(e) {
  var t = [De, Y("personList", null, {
    xmlns: ke.TCMNT,
    "xmlns:x": xt[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, n) {
    t.push(Y("person", null, {
      displayName: r,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: r,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function Gc(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = et(e);
  return t.rfx = r.s, t.ref = me(r.s), e.l += 16, t;
}
function Xc(e, t) {
  return t == null && (t = M(36)), t.write_shift(4, e[1].iauthor), pt(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var jc = $e;
function $c(e) {
  return Le(e.slice(0, 54));
}
function zc(e) {
  var t = qe(), r = [];
  return W(t, 628), W(t, 630), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), W(t, 632, $c(a.a)));
    });
  }), W(t, 631), W(t, 633), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: Pe(n[0]), e: Pe(n[0]) };
      W(t, 635, Xc([i, a])), a.t && a.t.length > 0 && W(t, 637, Yo(a)), W(t, 636), delete a.iauthor;
    });
  }), W(t, 634), W(t, 629), t.end();
}
function Kc(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && _e.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var Xi = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Yc = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, l = !1;
    i.length == 0 ? l = !0 : i.charAt(0) == "[" && (l = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var o = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? c += t.c : --c, l ? o += t.r : --o, a + (f ? "" : "$") + je(c) + (l ? "" : "$") + Ve(o);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), d0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, p0 = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(d0, function(n, a, i, s, f, l) {
      var o = o0(s) - (i ? 0 : r.c), c = f0(l) - (f ? 0 : r.r), u = c == 0 ? "" : f ? c + 1 : "[" + c + "]", h = o == 0 ? "" : i ? o + 1 : "[" + o + "]";
      return a + "R" + u + "C" + h;
    });
  };
}();
function Jc(e, t) {
  return e.replace(d0, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : je(o0(i) + t.c)) + (s == "$" ? s + f : Ve(f0(f) + t.r));
  });
}
function qc(e) {
  return e.length != 1;
}
function Oe(e) {
  e.l += 1;
}
function br(e, t) {
  var r = e.read_shift(t == 1 ? 1 : 2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function ji(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5)
      return $i(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = br(e, 2), f = br(e, 2);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function $i(e) {
  var t = br(e, 2), r = br(e, 2), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function Zc(e, t, r) {
  if (r.biff < 8)
    return $i(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = br(e, 2), s = br(e, 2);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function zi(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5)
    return Qc(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = br(e, 2);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function Qc(e) {
  var t = br(e, 2), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function eh(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function rh(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5)
    return th(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1)
    for (; a > 524287; )
      a -= 1048576;
  if (s == 1)
    for (; i > 8191; )
      i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function th(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function nh(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = ji(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function ah(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (r)
    switch (r.biff) {
      case 5:
        e.l += 12, i = 6;
        break;
      case 12:
        i = 12;
        break;
    }
  var s = ji(e, i, r);
  return [n, a, s];
}
function ih(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function sh(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 8;
  if (r)
    switch (r.biff) {
      case 5:
        e.l += 12, i = 6;
        break;
      case 12:
        i = 12;
        break;
    }
  return e.l += i, [n, a];
}
function fh(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = Zc(e, t - 1, r);
  return [n, a];
}
function oh(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function va(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function lh(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i)
    a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function ch(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function hh(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function uh(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function xh(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function Ki(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function dh(e) {
  return e.read_shift(2), Ki(e);
}
function ph(e) {
  return e.read_shift(2), Ki(e);
}
function vh(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = zi(e, 0, r);
  return [n, a];
}
function mh(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = rh(e, 0, r);
  return [n, a];
}
function gh(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = zi(e, 0, r);
  return [n, a, i];
}
function _h(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [_1[a], qi[a], n];
}
function Th(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : Eh(e);
  return [a, (i[0] === 0 ? qi : g1)[i[1]]];
}
function Eh(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function wh(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function Sh(e, t, r) {
  if (e.l++, r && r.biff == 12)
    return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Ah(e) {
  return e.l++, Ut[e.read_shift(1)];
}
function Fh(e) {
  return e.l++, e.read_shift(2);
}
function yh(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function Ch(e) {
  return e.l++, vt(e);
}
function Oh(e, t, r) {
  return e.l++, Di(e, t - 1, r);
}
function Rh(e, t) {
  var r = [e.read_shift(1)];
  if (t == 12)
    switch (r[0]) {
      case 2:
        r[0] = 4;
        break;
      case 4:
        r[0] = 16;
        break;
      case 0:
        r[0] = 1;
        break;
      case 1:
        r[0] = 2;
        break;
    }
  switch (r[0]) {
    case 4:
      r[1] = gl(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = Ut[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = vt(e);
      break;
    case 2:
      r[1] = wl(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function Dh(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i)
    a.push((r.biff == 12 ? et : Fl)(e));
  return a;
}
function Nh(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f)
      s[i][f] = Rh(e, r.biff);
  return s;
}
function Ih(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = !r || r.biff >= 8 ? 4 : 2, i = e.read_shift(a);
  switch (r.biff) {
    case 2:
      e.l += 5;
      break;
    case 3:
    case 4:
      e.l += 8;
      break;
    case 5:
      e.l += 12;
      break;
  }
  return [n, 0, i];
}
function kh(e, t, r) {
  if (r.biff == 5)
    return Ph(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function Ph(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function Lh(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Bh(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Mh(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function bh(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 4;
  if (r)
    switch (r.biff) {
      case 5:
        i = 15;
        break;
      case 12:
        i = 6;
        break;
    }
  return e.l += i, [n, a];
}
var Uh = wr, Wh = wr, Hh = wr;
function Wt(e, t, r) {
  return e.l += 2, [eh(e)];
}
function v0(e) {
  return e.l += 6, [];
}
var Vh = Wt, Gh = v0, Xh = v0, jh = Wt;
function Yi(e) {
  return e.l += 2, [Oi(e), e.read_shift(2) & 1];
}
var $h = Wt, zh = Yi, Kh = v0, Yh = Wt, Jh = Wt, qh = [
  "Data",
  "All",
  "Headers",
  "??",
  "?Data2",
  "??",
  "?DataHeaders",
  "??",
  "Totals",
  "??",
  "??",
  "??",
  "?DataTotals",
  "??",
  "??",
  "??",
  "?Current"
];
function Zh(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = qh[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function Qh(e) {
  return e.l += 2, [e.read_shift(4)];
}
function e1(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function r1(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function t1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function n1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function a1(e) {
  return e.l += 4, [0, 0];
}
var ma = {
  1: { n: "PtgExp", f: Sh },
  2: { n: "PtgTbl", f: Hh },
  3: { n: "PtgAdd", f: Oe },
  4: { n: "PtgSub", f: Oe },
  5: { n: "PtgMul", f: Oe },
  6: { n: "PtgDiv", f: Oe },
  7: { n: "PtgPower", f: Oe },
  8: { n: "PtgConcat", f: Oe },
  9: { n: "PtgLt", f: Oe },
  10: { n: "PtgLe", f: Oe },
  11: { n: "PtgEq", f: Oe },
  12: { n: "PtgGe", f: Oe },
  13: { n: "PtgGt", f: Oe },
  14: { n: "PtgNe", f: Oe },
  15: { n: "PtgIsect", f: Oe },
  16: { n: "PtgUnion", f: Oe },
  17: { n: "PtgRange", f: Oe },
  18: { n: "PtgUplus", f: Oe },
  19: { n: "PtgUminus", f: Oe },
  20: { n: "PtgPercent", f: Oe },
  21: { n: "PtgParen", f: Oe },
  22: { n: "PtgMissArg", f: Oe },
  23: { n: "PtgStr", f: Oh },
  26: { n: "PtgSheet", f: e1 },
  27: { n: "PtgEndSheet", f: r1 },
  28: { n: "PtgErr", f: Ah },
  29: { n: "PtgBool", f: yh },
  30: { n: "PtgInt", f: Fh },
  31: { n: "PtgNum", f: Ch },
  32: { n: "PtgArray", f: oh },
  33: { n: "PtgFunc", f: _h },
  34: { n: "PtgFuncVar", f: Th },
  35: { n: "PtgName", f: Ih },
  36: { n: "PtgRef", f: vh },
  37: { n: "PtgArea", f: nh },
  38: { n: "PtgMemArea", f: Lh },
  39: { n: "PtgMemErr", f: Uh },
  40: { n: "PtgMemNoMem", f: Wh },
  41: { n: "PtgMemFunc", f: Bh },
  42: { n: "PtgRefErr", f: Mh },
  43: { n: "PtgAreaErr", f: ih },
  44: { n: "PtgRefN", f: mh },
  45: { n: "PtgAreaN", f: fh },
  46: { n: "PtgMemAreaN", f: t1 },
  47: { n: "PtgMemNoMemN", f: n1 },
  57: { n: "PtgNameX", f: kh },
  58: { n: "PtgRef3d", f: gh },
  59: { n: "PtgArea3d", f: ah },
  60: { n: "PtgRefErr3d", f: bh },
  61: { n: "PtgAreaErr3d", f: sh },
  255: {}
}, i1 = {
  64: 32,
  96: 32,
  65: 33,
  97: 33,
  66: 34,
  98: 34,
  67: 35,
  99: 35,
  68: 36,
  100: 36,
  69: 37,
  101: 37,
  70: 38,
  102: 38,
  71: 39,
  103: 39,
  72: 40,
  104: 40,
  73: 41,
  105: 41,
  74: 42,
  106: 42,
  75: 43,
  107: 43,
  76: 44,
  108: 44,
  77: 45,
  109: 45,
  78: 46,
  110: 46,
  79: 47,
  111: 47,
  88: 34,
  120: 34,
  89: 57,
  121: 57,
  90: 58,
  122: 58,
  91: 59,
  123: 59,
  92: 60,
  124: 60,
  93: 61,
  125: 61
}, s1 = {
  1: { n: "PtgElfLel", f: Yi },
  2: { n: "PtgElfRw", f: Yh },
  3: { n: "PtgElfCol", f: Vh },
  6: { n: "PtgElfRwV", f: Jh },
  7: { n: "PtgElfColV", f: jh },
  10: { n: "PtgElfRadical", f: $h },
  11: { n: "PtgElfRadicalS", f: Kh },
  13: { n: "PtgElfColS", f: Gh },
  15: { n: "PtgElfColSV", f: Xh },
  16: { n: "PtgElfRadicalLel", f: zh },
  25: { n: "PtgList", f: Zh },
  29: { n: "PtgSxName", f: Qh },
  255: {}
}, f1 = {
  0: { n: "PtgAttrNoop", f: a1 },
  1: { n: "PtgAttrSemi", f: xh },
  2: { n: "PtgAttrIf", f: hh },
  4: { n: "PtgAttrChoose", f: lh },
  8: { n: "PtgAttrGoto", f: ch },
  16: { n: "PtgAttrSum", f: wh },
  32: { n: "PtgAttrBaxcel", f: va },
  33: { n: "PtgAttrBaxcel", f: va },
  64: { n: "PtgAttrSpace", f: dh },
  65: { n: "PtgAttrSpaceSemi", f: ph },
  128: { n: "PtgAttrIfError", f: uh },
  255: {}
};
function o1(e, t, r, n) {
  if (n.biff < 8)
    return wr(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = Nh(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = Dh(e, r[s][1], n), i.push(r[s][2]);
        break;
      case "PtgExp":
        n && n.biff == 12 && (r[s][1][1] = e.read_shift(4), i.push(r[s][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + r[s][0];
    }
  return t = a - e.l, t !== 0 && i.push(wr(e, t)), i;
}
function l1(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = ma[i] || ma[i1[i]], (i === 24 || i === 25) && (a = (i === 24 ? s1 : f1)[e[e.l + 1]]), !a || !a.f ? wr(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function c1(e) {
  for (var t = [], r = 0; r < e.length; ++r) {
    for (var n = e[r], a = [], i = 0; i < n.length; ++i) {
      var s = n[i];
      if (s)
        switch (s[0]) {
          case 2:
            a.push('"' + s[1].replace(/"/g, '""') + '"');
            break;
          default:
            a.push(s[1]);
        }
      else
        a.push("");
    }
    t.push(a.join(","));
  }
  return t.join(";");
}
var h1 = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-"
};
function u1(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2))
    throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function Ji(e, t, r) {
  if (!e)
    return "SH33TJSERR0";
  if (r.biff > 8 && (!e.XTI || !e.XTI[t]))
    return e.SheetNames[t];
  if (!e.XTI)
    return "SH33TJSERR6";
  var n = e.XTI[t];
  if (r.biff < 8)
    return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
  if (!n)
    return "SH33TJSERR1";
  var a = "";
  if (r.biff > 8)
    switch (e[n[0]][0]) {
      case 357:
        return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]], n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
      case 358:
        return r.SID != null ? e.SheetNames[r.SID] : "SH33TJSSAME" + e[n[0]][0];
      case 355:
      default:
        return "SH33TJSSRC" + e[n[0]][0];
    }
  switch (e[n[0]][0][0]) {
    case 1025:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]] || "SH33TJSERR3", n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 14849:
      return e[n[0]].slice(1).map(function(i) {
        return i.Name;
      }).join(";;");
    default:
      return e[n[0]][0][3] ? (a = n[1] == -1 ? "#REF" : e[n[0]][0][3][n[1]] || "SH33TJSERR4", n[1] == n[2] ? a : a + ":" + e[n[0]][0][3][n[2]]) : "SH33TJSERR2";
  }
}
function ga(e, t, r) {
  var n = Ji(e, t, r);
  return n == "#REF" ? n : u1(n, r);
}
function ut(e, t, r, n, a) {
  var i = a && a.biff || 8, s = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, f = [], l, o, c, u = 0, h = 0, p, _ = "";
  if (!e[0] || !e[0][0])
    return "";
  for (var x = -1, g = "", C = 0, O = e[0].length; C < O; ++C) {
    var A = e[0][C];
    switch (A[0]) {
      case "PtgUminus":
        f.push("-" + f.pop());
        break;
      case "PtgUplus":
        f.push("+" + f.pop());
        break;
      case "PtgPercent":
        f.push(f.pop() + "%");
        break;
      case "PtgAdd":
      case "PtgConcat":
      case "PtgDiv":
      case "PtgEq":
      case "PtgGe":
      case "PtgGt":
      case "PtgLe":
      case "PtgLt":
      case "PtgMul":
      case "PtgNe":
      case "PtgPower":
      case "PtgSub":
        if (l = f.pop(), o = f.pop(), x >= 0) {
          switch (e[0][x][1][0]) {
            case 0:
              g = Fe(" ", e[0][x][1][1]);
              break;
            case 1:
              g = Fe("\r", e[0][x][1][1]);
              break;
            default:
              if (g = "", a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          o = o + g, x = -1;
        }
        f.push(o + h1[A[0]] + l);
        break;
      case "PtgIsect":
        l = f.pop(), o = f.pop(), f.push(o + " " + l);
        break;
      case "PtgUnion":
        l = f.pop(), o = f.pop(), f.push(o + "," + l);
        break;
      case "PtgRange":
        l = f.pop(), o = f.pop(), f.push(o + ":" + l);
        break;
      case "PtgAttrChoose":
        break;
      case "PtgAttrGoto":
        break;
      case "PtgAttrIf":
        break;
      case "PtgAttrIfError":
        break;
      case "PtgRef":
        c = yt(A[1][1], s, a), f.push(Ct(c, i));
        break;
      case "PtgRefN":
        c = r ? yt(A[1][1], r, a) : A[1][1], f.push(Ct(c, i));
        break;
      case "PtgRef3d":
        u = A[1][1], c = yt(A[1][2], s, a), _ = ga(n, u, a), f.push(_ + "!" + Ct(c, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var B = A[1][0], z = A[1][1];
        B || (B = 0), B &= 127;
        var Q = B == 0 ? [] : f.slice(-B);
        f.length -= B, z === "User" && (z = Q.shift()), f.push(z + "(" + Q.join(",") + ")");
        break;
      case "PtgBool":
        f.push(A[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(A[1]);
        break;
      case "PtgNum":
        f.push(String(A[1]));
        break;
      case "PtgStr":
        f.push('"' + A[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(A[1]);
        break;
      case "PtgAreaN":
        p = ta(A[1][1], r ? { s: r } : s, a), f.push(Bn(p, a));
        break;
      case "PtgArea":
        p = ta(A[1][1], s, a), f.push(Bn(p, a));
        break;
      case "PtgArea3d":
        u = A[1][1], p = A[1][2], _ = ga(n, u, a), f.push(_ + "!" + Bn(p, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        h = A[1][2];
        var R = (n.names || [])[h - 1] || (n[0] || [])[h], U = R ? R.Name : "SH33TJSNAME" + String(h);
        U && U.slice(0, 6) == "_xlfn." && !a.xlfn && (U = U.slice(6)), f.push(U);
        break;
      case "PtgNameX":
        var L = A[1][1];
        h = A[1][2];
        var V;
        if (a.biff <= 5)
          L < 0 && (L = -L), n[L] && (V = n[L][h]);
        else {
          var G = "";
          if (((n[L] || [])[0] || [])[0] == 14849 || (((n[L] || [])[0] || [])[0] == 1025 ? n[L][h] && n[L][h].itab > 0 && (G = n.SheetNames[n[L][h].itab - 1] + "!") : G = n.SheetNames[h - 1] + "!"), n[L] && n[L][h])
            G += n[L][h].Name;
          else if (n[0] && n[0][h])
            G += n[0][h].Name;
          else {
            var j = (Ji(n, L, a) || "").split(";;");
            j[h - 1] ? G = j[h - 1] : G += "SH33TJSERRX";
          }
          f.push(G);
          break;
        }
        V || (V = { Name: "SH33TJSERRY" }), f.push(V.Name);
        break;
      case "PtgParen":
        var re = "(", ge = ")";
        if (x >= 0) {
          switch (g = "", e[0][x][1][0]) {
            case 2:
              re = Fe(" ", e[0][x][1][1]) + re;
              break;
            case 3:
              re = Fe("\r", e[0][x][1][1]) + re;
              break;
            case 4:
              ge = Fe(" ", e[0][x][1][1]) + ge;
              break;
            case 5:
              ge = Fe("\r", e[0][x][1][1]) + ge;
              break;
            default:
              if (a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          x = -1;
        }
        f.push(re + f.pop() + ge);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        c = { c: A[1][1], r: A[1][0] };
        var oe = { c: r.c, r: r.r };
        if (n.sharedf[me(c)]) {
          var Be = n.sharedf[me(c)];
          f.push(ut(Be, s, oe, n, a));
        } else {
          var Ce = !1;
          for (l = 0; l != n.arrayf.length; ++l)
            if (o = n.arrayf[l], !(c.c < o[0].s.c || c.c > o[0].e.c) && !(c.r < o[0].s.r || c.r > o[0].e.r)) {
              f.push(ut(o[1], s, oe, n, a)), Ce = !0;
              break;
            }
          Ce || f.push(A[1]);
        }
        break;
      case "PtgArray":
        f.push("{" + c1(A[1]) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        x = C;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        f.push("");
        break;
      case "PtgAreaErr":
        f.push("#REF!");
        break;
      case "PtgAreaErr3d":
        f.push("#REF!");
        break;
      case "PtgList":
        f.push("Table" + A[1].idx + "[#" + A[1].rt + "]");
        break;
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
        break;
      case "PtgMemFunc":
        break;
      case "PtgMemNoMem":
        break;
      case "PtgElfCol":
      case "PtgElfColS":
      case "PtgElfColSV":
      case "PtgElfColV":
      case "PtgElfLel":
      case "PtgElfRadical":
      case "PtgElfRadicalLel":
      case "PtgElfRadicalS":
      case "PtgElfRw":
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      case "PtgSxName":
        throw new Error("Unrecognized Formula Token: " + String(A));
      default:
        throw new Error("Unrecognized Formula Token: " + String(A));
    }
    var ur = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && x >= 0 && ur.indexOf(e[0][C][0]) == -1) {
      A = e[0][x];
      var Ie = !0;
      switch (A[1][0]) {
        case 4:
          Ie = !1;
        case 0:
          g = Fe(" ", A[1][1]);
          break;
        case 5:
          Ie = !1;
        case 1:
          g = Fe("\r", A[1][1]);
          break;
        default:
          if (g = "", a.WTF)
            throw new Error("Unexpected PtgAttrSpaceType " + A[1][0]);
      }
      f.push((Ie ? g : "") + f.pop() + (Ie ? "" : g)), x = -1;
    }
  }
  if (f.length > 1 && a.WTF)
    throw new Error("bad formula stack");
  return f[0];
}
function x1(e) {
  if (e == null) {
    var t = M(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number")
    return Kr(e);
  return Kr(0);
}
function d1(e, t, r, n, a) {
  var i = Yr(t, r, a), s = x1(e.v), f = M(6), l = 33;
  f.write_shift(2, l), f.write_shift(4, 0);
  for (var o = M(e.bf.length), c = 0; c < e.bf.length; ++c)
    o[c] = e.bf[c];
  var u = We([i, s, f, o]);
  return u;
}
function Sn(e, t, r) {
  var n = e.read_shift(4), a = l1(e, n, r), i = e.read_shift(4), s = i > 0 ? o1(e, i, a, r) : null;
  return [a, s];
}
var p1 = Sn, An = Sn, v1 = Sn, m1 = Sn, g1 = {
  0: "BEEP",
  1: "OPEN",
  2: "OPEN.LINKS",
  3: "CLOSE.ALL",
  4: "SAVE",
  5: "SAVE.AS",
  6: "FILE.DELETE",
  7: "PAGE.SETUP",
  8: "PRINT",
  9: "PRINTER.SETUP",
  10: "QUIT",
  11: "NEW.WINDOW",
  12: "ARRANGE.ALL",
  13: "WINDOW.SIZE",
  14: "WINDOW.MOVE",
  15: "FULL",
  16: "CLOSE",
  17: "RUN",
  22: "SET.PRINT.AREA",
  23: "SET.PRINT.TITLES",
  24: "SET.PAGE.BREAK",
  25: "REMOVE.PAGE.BREAK",
  26: "FONT",
  27: "DISPLAY",
  28: "PROTECT.DOCUMENT",
  29: "PRECISION",
  30: "A1.R1C1",
  31: "CALCULATE.NOW",
  32: "CALCULATION",
  34: "DATA.FIND",
  35: "EXTRACT",
  36: "DATA.DELETE",
  37: "SET.DATABASE",
  38: "SET.CRITERIA",
  39: "SORT",
  40: "DATA.SERIES",
  41: "TABLE",
  42: "FORMAT.NUMBER",
  43: "ALIGNMENT",
  44: "STYLE",
  45: "BORDER",
  46: "CELL.PROTECTION",
  47: "COLUMN.WIDTH",
  48: "UNDO",
  49: "CUT",
  50: "COPY",
  51: "PASTE",
  52: "CLEAR",
  53: "PASTE.SPECIAL",
  54: "EDIT.DELETE",
  55: "INSERT",
  56: "FILL.RIGHT",
  57: "FILL.DOWN",
  61: "DEFINE.NAME",
  62: "CREATE.NAMES",
  63: "FORMULA.GOTO",
  64: "FORMULA.FIND",
  65: "SELECT.LAST.CELL",
  66: "SHOW.ACTIVE.CELL",
  67: "GALLERY.AREA",
  68: "GALLERY.BAR",
  69: "GALLERY.COLUMN",
  70: "GALLERY.LINE",
  71: "GALLERY.PIE",
  72: "GALLERY.SCATTER",
  73: "COMBINATION",
  74: "PREFERRED",
  75: "ADD.OVERLAY",
  76: "GRIDLINES",
  77: "SET.PREFERRED",
  78: "AXES",
  79: "LEGEND",
  80: "ATTACH.TEXT",
  81: "ADD.ARROW",
  82: "SELECT.CHART",
  83: "SELECT.PLOT.AREA",
  84: "PATTERNS",
  85: "MAIN.CHART",
  86: "OVERLAY",
  87: "SCALE",
  88: "FORMAT.LEGEND",
  89: "FORMAT.TEXT",
  90: "EDIT.REPEAT",
  91: "PARSE",
  92: "JUSTIFY",
  93: "HIDE",
  94: "UNHIDE",
  95: "WORKSPACE",
  96: "FORMULA",
  97: "FORMULA.FILL",
  98: "FORMULA.ARRAY",
  99: "DATA.FIND.NEXT",
  100: "DATA.FIND.PREV",
  101: "FORMULA.FIND.NEXT",
  102: "FORMULA.FIND.PREV",
  103: "ACTIVATE",
  104: "ACTIVATE.NEXT",
  105: "ACTIVATE.PREV",
  106: "UNLOCKED.NEXT",
  107: "UNLOCKED.PREV",
  108: "COPY.PICTURE",
  109: "SELECT",
  110: "DELETE.NAME",
  111: "DELETE.FORMAT",
  112: "VLINE",
  113: "HLINE",
  114: "VPAGE",
  115: "HPAGE",
  116: "VSCROLL",
  117: "HSCROLL",
  118: "ALERT",
  119: "NEW",
  120: "CANCEL.COPY",
  121: "SHOW.CLIPBOARD",
  122: "MESSAGE",
  124: "PASTE.LINK",
  125: "APP.ACTIVATE",
  126: "DELETE.ARROW",
  127: "ROW.HEIGHT",
  128: "FORMAT.MOVE",
  129: "FORMAT.SIZE",
  130: "FORMULA.REPLACE",
  131: "SEND.KEYS",
  132: "SELECT.SPECIAL",
  133: "APPLY.NAMES",
  134: "REPLACE.FONT",
  135: "FREEZE.PANES",
  136: "SHOW.INFO",
  137: "SPLIT",
  138: "ON.WINDOW",
  139: "ON.DATA",
  140: "DISABLE.INPUT",
  142: "OUTLINE",
  143: "LIST.NAMES",
  144: "FILE.CLOSE",
  145: "SAVE.WORKBOOK",
  146: "DATA.FORM",
  147: "COPY.CHART",
  148: "ON.TIME",
  149: "WAIT",
  150: "FORMAT.FONT",
  151: "FILL.UP",
  152: "FILL.LEFT",
  153: "DELETE.OVERLAY",
  155: "SHORT.MENUS",
  159: "SET.UPDATE.STATUS",
  161: "COLOR.PALETTE",
  162: "DELETE.STYLE",
  163: "WINDOW.RESTORE",
  164: "WINDOW.MAXIMIZE",
  166: "CHANGE.LINK",
  167: "CALCULATE.DOCUMENT",
  168: "ON.KEY",
  169: "APP.RESTORE",
  170: "APP.MOVE",
  171: "APP.SIZE",
  172: "APP.MINIMIZE",
  173: "APP.MAXIMIZE",
  174: "BRING.TO.FRONT",
  175: "SEND.TO.BACK",
  185: "MAIN.CHART.TYPE",
  186: "OVERLAY.CHART.TYPE",
  187: "SELECT.END",
  188: "OPEN.MAIL",
  189: "SEND.MAIL",
  190: "STANDARD.FONT",
  191: "CONSOLIDATE",
  192: "SORT.SPECIAL",
  193: "GALLERY.3D.AREA",
  194: "GALLERY.3D.COLUMN",
  195: "GALLERY.3D.LINE",
  196: "GALLERY.3D.PIE",
  197: "VIEW.3D",
  198: "GOAL.SEEK",
  199: "WORKGROUP",
  200: "FILL.GROUP",
  201: "UPDATE.LINK",
  202: "PROMOTE",
  203: "DEMOTE",
  204: "SHOW.DETAIL",
  206: "UNGROUP",
  207: "OBJECT.PROPERTIES",
  208: "SAVE.NEW.OBJECT",
  209: "SHARE",
  210: "SHARE.NAME",
  211: "DUPLICATE",
  212: "APPLY.STYLE",
  213: "ASSIGN.TO.OBJECT",
  214: "OBJECT.PROTECTION",
  215: "HIDE.OBJECT",
  216: "SET.EXTRACT",
  217: "CREATE.PUBLISHER",
  218: "SUBSCRIBE.TO",
  219: "ATTRIBUTES",
  220: "SHOW.TOOLBAR",
  222: "PRINT.PREVIEW",
  223: "EDIT.COLOR",
  224: "SHOW.LEVELS",
  225: "FORMAT.MAIN",
  226: "FORMAT.OVERLAY",
  227: "ON.RECALC",
  228: "EDIT.SERIES",
  229: "DEFINE.STYLE",
  240: "LINE.PRINT",
  243: "ENTER.DATA",
  249: "GALLERY.RADAR",
  250: "MERGE.STYLES",
  251: "EDITION.OPTIONS",
  252: "PASTE.PICTURE",
  253: "PASTE.PICTURE.LINK",
  254: "SPELLING",
  256: "ZOOM",
  259: "INSERT.OBJECT",
  260: "WINDOW.MINIMIZE",
  265: "SOUND.NOTE",
  266: "SOUND.PLAY",
  267: "FORMAT.SHAPE",
  268: "EXTEND.POLYGON",
  269: "FORMAT.AUTO",
  272: "GALLERY.3D.BAR",
  273: "GALLERY.3D.SURFACE",
  274: "FILL.AUTO",
  276: "CUSTOMIZE.TOOLBAR",
  277: "ADD.TOOL",
  278: "EDIT.OBJECT",
  279: "ON.DOUBLECLICK",
  280: "ON.ENTRY",
  281: "WORKBOOK.ADD",
  282: "WORKBOOK.MOVE",
  283: "WORKBOOK.COPY",
  284: "WORKBOOK.OPTIONS",
  285: "SAVE.WORKSPACE",
  288: "CHART.WIZARD",
  289: "DELETE.TOOL",
  290: "MOVE.TOOL",
  291: "WORKBOOK.SELECT",
  292: "WORKBOOK.ACTIVATE",
  293: "ASSIGN.TO.TOOL",
  295: "COPY.TOOL",
  296: "RESET.TOOL",
  297: "CONSTRAIN.NUMERIC",
  298: "PASTE.TOOL",
  302: "WORKBOOK.NEW",
  305: "SCENARIO.CELLS",
  306: "SCENARIO.DELETE",
  307: "SCENARIO.ADD",
  308: "SCENARIO.EDIT",
  309: "SCENARIO.SHOW",
  310: "SCENARIO.SHOW.NEXT",
  311: "SCENARIO.SUMMARY",
  312: "PIVOT.TABLE.WIZARD",
  313: "PIVOT.FIELD.PROPERTIES",
  314: "PIVOT.FIELD",
  315: "PIVOT.ITEM",
  316: "PIVOT.ADD.FIELDS",
  318: "OPTIONS.CALCULATION",
  319: "OPTIONS.EDIT",
  320: "OPTIONS.VIEW",
  321: "ADDIN.MANAGER",
  322: "MENU.EDITOR",
  323: "ATTACH.TOOLBARS",
  324: "VBAActivate",
  325: "OPTIONS.CHART",
  328: "VBA.INSERT.FILE",
  330: "VBA.PROCEDURE.DEFINITION",
  336: "ROUTING.SLIP",
  338: "ROUTE.DOCUMENT",
  339: "MAIL.LOGON",
  342: "INSERT.PICTURE",
  343: "EDIT.TOOL",
  344: "GALLERY.DOUGHNUT",
  350: "CHART.TREND",
  352: "PIVOT.ITEM.PROPERTIES",
  354: "WORKBOOK.INSERT",
  355: "OPTIONS.TRANSITION",
  356: "OPTIONS.GENERAL",
  370: "FILTER.ADVANCED",
  373: "MAIL.ADD.MAILER",
  374: "MAIL.DELETE.MAILER",
  375: "MAIL.REPLY",
  376: "MAIL.REPLY.ALL",
  377: "MAIL.FORWARD",
  378: "MAIL.NEXT.LETTER",
  379: "DATA.LABEL",
  380: "INSERT.TITLE",
  381: "FONT.PROPERTIES",
  382: "MACRO.OPTIONS",
  383: "WORKBOOK.HIDE",
  384: "WORKBOOK.UNHIDE",
  385: "WORKBOOK.DELETE",
  386: "WORKBOOK.NAME",
  388: "GALLERY.CUSTOM",
  390: "ADD.CHART.AUTOFORMAT",
  391: "DELETE.CHART.AUTOFORMAT",
  392: "CHART.ADD.DATA",
  393: "AUTO.OUTLINE",
  394: "TAB.ORDER",
  395: "SHOW.DIALOG",
  396: "SELECT.ALL",
  397: "UNGROUP.SHEETS",
  398: "SUBTOTAL.CREATE",
  399: "SUBTOTAL.REMOVE",
  400: "RENAME.OBJECT",
  412: "WORKBOOK.SCROLL",
  413: "WORKBOOK.NEXT",
  414: "WORKBOOK.PREV",
  415: "WORKBOOK.TAB.SPLIT",
  416: "FULL.SCREEN",
  417: "WORKBOOK.PROTECT",
  420: "SCROLLBAR.PROPERTIES",
  421: "PIVOT.SHOW.PAGES",
  422: "TEXT.TO.COLUMNS",
  423: "FORMAT.CHARTTYPE",
  424: "LINK.FORMAT",
  425: "TRACER.DISPLAY",
  430: "TRACER.NAVIGATE",
  431: "TRACER.CLEAR",
  432: "TRACER.ERROR",
  433: "PIVOT.FIELD.GROUP",
  434: "PIVOT.FIELD.UNGROUP",
  435: "CHECKBOX.PROPERTIES",
  436: "LABEL.PROPERTIES",
  437: "LISTBOX.PROPERTIES",
  438: "EDITBOX.PROPERTIES",
  439: "PIVOT.REFRESH",
  440: "LINK.COMBO",
  441: "OPEN.TEXT",
  442: "HIDE.DIALOG",
  443: "SET.DIALOG.FOCUS",
  444: "ENABLE.OBJECT",
  445: "PUSHBUTTON.PROPERTIES",
  446: "SET.DIALOG.DEFAULT",
  447: "FILTER",
  448: "FILTER.SHOW.ALL",
  449: "CLEAR.OUTLINE",
  450: "FUNCTION.WIZARD",
  451: "ADD.LIST.ITEM",
  452: "SET.LIST.ITEM",
  453: "REMOVE.LIST.ITEM",
  454: "SELECT.LIST.ITEM",
  455: "SET.CONTROL.VALUE",
  456: "SAVE.COPY.AS",
  458: "OPTIONS.LISTS.ADD",
  459: "OPTIONS.LISTS.DELETE",
  460: "SERIES.AXES",
  461: "SERIES.X",
  462: "SERIES.Y",
  463: "ERRORBAR.X",
  464: "ERRORBAR.Y",
  465: "FORMAT.CHART",
  466: "SERIES.ORDER",
  467: "MAIL.LOGOFF",
  468: "CLEAR.ROUTING.SLIP",
  469: "APP.ACTIVATE.MICROSOFT",
  470: "MAIL.EDIT.MAILER",
  471: "ON.SHEET",
  472: "STANDARD.WIDTH",
  473: "SCENARIO.MERGE",
  474: "SUMMARY.INFO",
  475: "FIND.FILE",
  476: "ACTIVE.CELL.FONT",
  477: "ENABLE.TIPWIZARD",
  478: "VBA.MAKE.ADDIN",
  480: "INSERTDATATABLE",
  481: "WORKGROUP.OPTIONS",
  482: "MAIL.SEND.MAILER",
  485: "AUTOCORRECT",
  489: "POST.DOCUMENT",
  491: "PICKLIST",
  493: "VIEW.SHOW",
  494: "VIEW.DEFINE",
  495: "VIEW.DELETE",
  509: "SHEET.BACKGROUND",
  510: "INSERT.MAP.OBJECT",
  511: "OPTIONS.MENONO",
  517: "MSOCHECKS",
  518: "NORMAL",
  519: "LAYOUT",
  520: "RM.PRINT.AREA",
  521: "CLEAR.PRINT.AREA",
  522: "ADD.PRINT.AREA",
  523: "MOVE.BRK",
  545: "HIDECURR.NOTE",
  546: "HIDEALL.NOTES",
  547: "DELETE.NOTE",
  548: "TRAVERSE.NOTES",
  549: "ACTIVATE.NOTES",
  620: "PROTECT.REVISIONS",
  621: "UNPROTECT.REVISIONS",
  647: "OPTIONS.ME",
  653: "WEB.PUBLISH",
  667: "NEWWEBQUERY",
  673: "PIVOT.TABLE.CHART",
  753: "OPTIONS.SAVE",
  755: "OPTIONS.SPELL",
  808: "HIDEALL.INKANNOTS"
}, qi = {
  0: "COUNT",
  1: "IF",
  2: "ISNA",
  3: "ISERROR",
  4: "SUM",
  5: "AVERAGE",
  6: "MIN",
  7: "MAX",
  8: "ROW",
  9: "COLUMN",
  10: "NA",
  11: "NPV",
  12: "STDEV",
  13: "DOLLAR",
  14: "FIXED",
  15: "SIN",
  16: "COS",
  17: "TAN",
  18: "ATAN",
  19: "PI",
  20: "SQRT",
  21: "EXP",
  22: "LN",
  23: "LOG10",
  24: "ABS",
  25: "INT",
  26: "SIGN",
  27: "ROUND",
  28: "LOOKUP",
  29: "INDEX",
  30: "REPT",
  31: "MID",
  32: "LEN",
  33: "VALUE",
  34: "TRUE",
  35: "FALSE",
  36: "AND",
  37: "OR",
  38: "NOT",
  39: "MOD",
  40: "DCOUNT",
  41: "DSUM",
  42: "DAVERAGE",
  43: "DMIN",
  44: "DMAX",
  45: "DSTDEV",
  46: "VAR",
  47: "DVAR",
  48: "TEXT",
  49: "LINEST",
  50: "TREND",
  51: "LOGEST",
  52: "GROWTH",
  53: "GOTO",
  54: "HALT",
  55: "RETURN",
  56: "PV",
  57: "FV",
  58: "NPER",
  59: "PMT",
  60: "RATE",
  61: "MIRR",
  62: "IRR",
  63: "RAND",
  64: "MATCH",
  65: "DATE",
  66: "TIME",
  67: "DAY",
  68: "MONTH",
  69: "YEAR",
  70: "WEEKDAY",
  71: "HOUR",
  72: "MINUTE",
  73: "SECOND",
  74: "NOW",
  75: "AREAS",
  76: "ROWS",
  77: "COLUMNS",
  78: "OFFSET",
  79: "ABSREF",
  80: "RELREF",
  81: "ARGUMENT",
  82: "SEARCH",
  83: "TRANSPOSE",
  84: "ERROR",
  85: "STEP",
  86: "TYPE",
  87: "ECHO",
  88: "SET.NAME",
  89: "CALLER",
  90: "DEREF",
  91: "WINDOWS",
  92: "SERIES",
  93: "DOCUMENTS",
  94: "ACTIVE.CELL",
  95: "SELECTION",
  96: "RESULT",
  97: "ATAN2",
  98: "ASIN",
  99: "ACOS",
  100: "CHOOSE",
  101: "HLOOKUP",
  102: "VLOOKUP",
  103: "LINKS",
  104: "INPUT",
  105: "ISREF",
  106: "GET.FORMULA",
  107: "GET.NAME",
  108: "SET.VALUE",
  109: "LOG",
  110: "EXEC",
  111: "CHAR",
  112: "LOWER",
  113: "UPPER",
  114: "PROPER",
  115: "LEFT",
  116: "RIGHT",
  117: "EXACT",
  118: "TRIM",
  119: "REPLACE",
  120: "SUBSTITUTE",
  121: "CODE",
  122: "NAMES",
  123: "DIRECTORY",
  124: "FIND",
  125: "CELL",
  126: "ISERR",
  127: "ISTEXT",
  128: "ISNUMBER",
  129: "ISBLANK",
  130: "T",
  131: "N",
  132: "FOPEN",
  133: "FCLOSE",
  134: "FSIZE",
  135: "FREADLN",
  136: "FREAD",
  137: "FWRITELN",
  138: "FWRITE",
  139: "FPOS",
  140: "DATEVALUE",
  141: "TIMEVALUE",
  142: "SLN",
  143: "SYD",
  144: "DDB",
  145: "GET.DEF",
  146: "REFTEXT",
  147: "TEXTREF",
  148: "INDIRECT",
  149: "REGISTER",
  150: "CALL",
  151: "ADD.BAR",
  152: "ADD.MENU",
  153: "ADD.COMMAND",
  154: "ENABLE.COMMAND",
  155: "CHECK.COMMAND",
  156: "RENAME.COMMAND",
  157: "SHOW.BAR",
  158: "DELETE.MENU",
  159: "DELETE.COMMAND",
  160: "GET.CHART.ITEM",
  161: "DIALOG.BOX",
  162: "CLEAN",
  163: "MDETERM",
  164: "MINVERSE",
  165: "MMULT",
  166: "FILES",
  167: "IPMT",
  168: "PPMT",
  169: "COUNTA",
  170: "CANCEL.KEY",
  171: "FOR",
  172: "WHILE",
  173: "BREAK",
  174: "NEXT",
  175: "INITIATE",
  176: "REQUEST",
  177: "POKE",
  178: "EXECUTE",
  179: "TERMINATE",
  180: "RESTART",
  181: "HELP",
  182: "GET.BAR",
  183: "PRODUCT",
  184: "FACT",
  185: "GET.CELL",
  186: "GET.WORKSPACE",
  187: "GET.WINDOW",
  188: "GET.DOCUMENT",
  189: "DPRODUCT",
  190: "ISNONTEXT",
  191: "GET.NOTE",
  192: "NOTE",
  193: "STDEVP",
  194: "VARP",
  195: "DSTDEVP",
  196: "DVARP",
  197: "TRUNC",
  198: "ISLOGICAL",
  199: "DCOUNTA",
  200: "DELETE.BAR",
  201: "UNREGISTER",
  204: "USDOLLAR",
  205: "FINDB",
  206: "SEARCHB",
  207: "REPLACEB",
  208: "LEFTB",
  209: "RIGHTB",
  210: "MIDB",
  211: "LENB",
  212: "ROUNDUP",
  213: "ROUNDDOWN",
  214: "ASC",
  215: "DBCS",
  216: "RANK",
  219: "ADDRESS",
  220: "DAYS360",
  221: "TODAY",
  222: "VDB",
  223: "ELSE",
  224: "ELSE.IF",
  225: "END.IF",
  226: "FOR.CELL",
  227: "MEDIAN",
  228: "SUMPRODUCT",
  229: "SINH",
  230: "COSH",
  231: "TANH",
  232: "ASINH",
  233: "ACOSH",
  234: "ATANH",
  235: "DGET",
  236: "CREATE.OBJECT",
  237: "VOLATILE",
  238: "LAST.ERROR",
  239: "CUSTOM.UNDO",
  240: "CUSTOM.REPEAT",
  241: "FORMULA.CONVERT",
  242: "GET.LINK.INFO",
  243: "TEXT.BOX",
  244: "INFO",
  245: "GROUP",
  246: "GET.OBJECT",
  247: "DB",
  248: "PAUSE",
  251: "RESUME",
  252: "FREQUENCY",
  253: "ADD.TOOLBAR",
  254: "DELETE.TOOLBAR",
  255: "User",
  256: "RESET.TOOLBAR",
  257: "EVALUATE",
  258: "GET.TOOLBAR",
  259: "GET.TOOL",
  260: "SPELLING.CHECK",
  261: "ERROR.TYPE",
  262: "APP.TITLE",
  263: "WINDOW.TITLE",
  264: "SAVE.TOOLBAR",
  265: "ENABLE.TOOL",
  266: "PRESS.TOOL",
  267: "REGISTER.ID",
  268: "GET.WORKBOOK",
  269: "AVEDEV",
  270: "BETADIST",
  271: "GAMMALN",
  272: "BETAINV",
  273: "BINOMDIST",
  274: "CHIDIST",
  275: "CHIINV",
  276: "COMBIN",
  277: "CONFIDENCE",
  278: "CRITBINOM",
  279: "EVEN",
  280: "EXPONDIST",
  281: "FDIST",
  282: "FINV",
  283: "FISHER",
  284: "FISHERINV",
  285: "FLOOR",
  286: "GAMMADIST",
  287: "GAMMAINV",
  288: "CEILING",
  289: "HYPGEOMDIST",
  290: "LOGNORMDIST",
  291: "LOGINV",
  292: "NEGBINOMDIST",
  293: "NORMDIST",
  294: "NORMSDIST",
  295: "NORMINV",
  296: "NORMSINV",
  297: "STANDARDIZE",
  298: "ODD",
  299: "PERMUT",
  300: "POISSON",
  301: "TDIST",
  302: "WEIBULL",
  303: "SUMXMY2",
  304: "SUMX2MY2",
  305: "SUMX2PY2",
  306: "CHITEST",
  307: "CORREL",
  308: "COVAR",
  309: "FORECAST",
  310: "FTEST",
  311: "INTERCEPT",
  312: "PEARSON",
  313: "RSQ",
  314: "STEYX",
  315: "SLOPE",
  316: "TTEST",
  317: "PROB",
  318: "DEVSQ",
  319: "GEOMEAN",
  320: "HARMEAN",
  321: "SUMSQ",
  322: "KURT",
  323: "SKEW",
  324: "ZTEST",
  325: "LARGE",
  326: "SMALL",
  327: "QUARTILE",
  328: "PERCENTILE",
  329: "PERCENTRANK",
  330: "MODE",
  331: "TRIMMEAN",
  332: "TINV",
  334: "MOVIE.COMMAND",
  335: "GET.MOVIE",
  336: "CONCATENATE",
  337: "POWER",
  338: "PIVOT.ADD.DATA",
  339: "GET.PIVOT.TABLE",
  340: "GET.PIVOT.FIELD",
  341: "GET.PIVOT.ITEM",
  342: "RADIANS",
  343: "DEGREES",
  344: "SUBTOTAL",
  345: "SUMIF",
  346: "COUNTIF",
  347: "COUNTBLANK",
  348: "SCENARIO.GET",
  349: "OPTIONS.LISTS.GET",
  350: "ISPMT",
  351: "DATEDIF",
  352: "DATESTRING",
  353: "NUMBERSTRING",
  354: "ROMAN",
  355: "OPEN.DIALOG",
  356: "SAVE.DIALOG",
  357: "VIEW.GET",
  358: "GETPIVOTDATA",
  359: "HYPERLINK",
  360: "PHONETIC",
  361: "AVERAGEA",
  362: "MAXA",
  363: "MINA",
  364: "STDEVPA",
  365: "VARPA",
  366: "STDEVA",
  367: "VARA",
  368: "BAHTTEXT",
  369: "THAIDAYOFWEEK",
  370: "THAIDIGIT",
  371: "THAIMONTHOFYEAR",
  372: "THAINUMSOUND",
  373: "THAINUMSTRING",
  374: "THAISTRINGLENGTH",
  375: "ISTHAIDIGIT",
  376: "ROUNDBAHTDOWN",
  377: "ROUNDBAHTUP",
  378: "THAIYEAR",
  379: "RTD",
  380: "CUBEVALUE",
  381: "CUBEMEMBER",
  382: "CUBEMEMBERPROPERTY",
  383: "CUBERANKEDMEMBER",
  384: "HEX2BIN",
  385: "HEX2DEC",
  386: "HEX2OCT",
  387: "DEC2BIN",
  388: "DEC2HEX",
  389: "DEC2OCT",
  390: "OCT2BIN",
  391: "OCT2HEX",
  392: "OCT2DEC",
  393: "BIN2DEC",
  394: "BIN2OCT",
  395: "BIN2HEX",
  396: "IMSUB",
  397: "IMDIV",
  398: "IMPOWER",
  399: "IMABS",
  400: "IMSQRT",
  401: "IMLN",
  402: "IMLOG2",
  403: "IMLOG10",
  404: "IMSIN",
  405: "IMCOS",
  406: "IMEXP",
  407: "IMARGUMENT",
  408: "IMCONJUGATE",
  409: "IMAGINARY",
  410: "IMREAL",
  411: "COMPLEX",
  412: "IMSUM",
  413: "IMPRODUCT",
  414: "SERIESSUM",
  415: "FACTDOUBLE",
  416: "SQRTPI",
  417: "QUOTIENT",
  418: "DELTA",
  419: "GESTEP",
  420: "ISEVEN",
  421: "ISODD",
  422: "MROUND",
  423: "ERF",
  424: "ERFC",
  425: "BESSELJ",
  426: "BESSELK",
  427: "BESSELY",
  428: "BESSELI",
  429: "XIRR",
  430: "XNPV",
  431: "PRICEMAT",
  432: "YIELDMAT",
  433: "INTRATE",
  434: "RECEIVED",
  435: "DISC",
  436: "PRICEDISC",
  437: "YIELDDISC",
  438: "TBILLEQ",
  439: "TBILLPRICE",
  440: "TBILLYIELD",
  441: "PRICE",
  442: "YIELD",
  443: "DOLLARDE",
  444: "DOLLARFR",
  445: "NOMINAL",
  446: "EFFECT",
  447: "CUMPRINC",
  448: "CUMIPMT",
  449: "EDATE",
  450: "EOMONTH",
  451: "YEARFRAC",
  452: "COUPDAYBS",
  453: "COUPDAYS",
  454: "COUPDAYSNC",
  455: "COUPNCD",
  456: "COUPNUM",
  457: "COUPPCD",
  458: "DURATION",
  459: "MDURATION",
  460: "ODDLPRICE",
  461: "ODDLYIELD",
  462: "ODDFPRICE",
  463: "ODDFYIELD",
  464: "RANDBETWEEN",
  465: "WEEKNUM",
  466: "AMORDEGRC",
  467: "AMORLINC",
  468: "CONVERT",
  724: "SHEETJS",
  469: "ACCRINT",
  470: "ACCRINTM",
  471: "WORKDAY",
  472: "NETWORKDAYS",
  473: "GCD",
  474: "MULTINOMIAL",
  475: "LCM",
  476: "FVSCHEDULE",
  477: "CUBEKPIMEMBER",
  478: "CUBESET",
  479: "CUBESETCOUNT",
  480: "IFERROR",
  481: "COUNTIFS",
  482: "SUMIFS",
  483: "AVERAGEIF",
  484: "AVERAGEIFS"
}, _1 = {
  2: 1,
  3: 1,
  10: 0,
  15: 1,
  16: 1,
  17: 1,
  18: 1,
  19: 0,
  20: 1,
  21: 1,
  22: 1,
  23: 1,
  24: 1,
  25: 1,
  26: 1,
  27: 2,
  30: 2,
  31: 3,
  32: 1,
  33: 1,
  34: 0,
  35: 0,
  38: 1,
  39: 2,
  40: 3,
  41: 3,
  42: 3,
  43: 3,
  44: 3,
  45: 3,
  47: 3,
  48: 2,
  53: 1,
  61: 3,
  63: 0,
  65: 3,
  66: 3,
  67: 1,
  68: 1,
  69: 1,
  70: 1,
  71: 1,
  72: 1,
  73: 1,
  74: 0,
  75: 1,
  76: 1,
  77: 1,
  79: 2,
  80: 2,
  83: 1,
  85: 0,
  86: 1,
  89: 0,
  90: 1,
  94: 0,
  95: 0,
  97: 2,
  98: 1,
  99: 1,
  101: 3,
  102: 3,
  105: 1,
  106: 1,
  108: 2,
  111: 1,
  112: 1,
  113: 1,
  114: 1,
  117: 2,
  118: 1,
  119: 4,
  121: 1,
  126: 1,
  127: 1,
  128: 1,
  129: 1,
  130: 1,
  131: 1,
  133: 1,
  134: 1,
  135: 1,
  136: 2,
  137: 2,
  138: 2,
  140: 1,
  141: 1,
  142: 3,
  143: 4,
  144: 4,
  161: 1,
  162: 1,
  163: 1,
  164: 1,
  165: 2,
  172: 1,
  175: 2,
  176: 2,
  177: 3,
  178: 2,
  179: 1,
  184: 1,
  186: 1,
  189: 3,
  190: 1,
  195: 3,
  196: 3,
  197: 1,
  198: 1,
  199: 3,
  201: 1,
  207: 4,
  210: 3,
  211: 1,
  212: 2,
  213: 2,
  214: 1,
  215: 1,
  225: 0,
  229: 1,
  230: 1,
  231: 1,
  232: 1,
  233: 1,
  234: 1,
  235: 3,
  244: 1,
  247: 4,
  252: 2,
  257: 1,
  261: 1,
  271: 1,
  273: 4,
  274: 2,
  275: 2,
  276: 2,
  277: 3,
  278: 3,
  279: 1,
  280: 3,
  281: 3,
  282: 3,
  283: 1,
  284: 1,
  285: 2,
  286: 4,
  287: 3,
  288: 2,
  289: 4,
  290: 3,
  291: 3,
  292: 3,
  293: 4,
  294: 1,
  295: 3,
  296: 1,
  297: 3,
  298: 1,
  299: 2,
  300: 3,
  301: 3,
  302: 4,
  303: 2,
  304: 2,
  305: 2,
  306: 2,
  307: 2,
  308: 2,
  309: 3,
  310: 2,
  311: 2,
  312: 2,
  313: 2,
  314: 2,
  315: 2,
  316: 4,
  325: 2,
  326: 2,
  327: 2,
  328: 2,
  331: 2,
  332: 2,
  337: 2,
  342: 1,
  343: 1,
  346: 2,
  347: 1,
  350: 4,
  351: 3,
  352: 1,
  353: 2,
  360: 1,
  368: 1,
  369: 1,
  370: 1,
  371: 1,
  372: 1,
  373: 1,
  374: 1,
  375: 1,
  376: 1,
  377: 1,
  378: 1,
  382: 3,
  385: 1,
  392: 1,
  393: 1,
  396: 2,
  397: 2,
  398: 2,
  399: 1,
  400: 1,
  401: 1,
  402: 1,
  403: 1,
  404: 1,
  405: 1,
  406: 1,
  407: 1,
  408: 1,
  409: 1,
  410: 1,
  414: 4,
  415: 1,
  416: 1,
  417: 2,
  420: 1,
  421: 1,
  422: 2,
  424: 1,
  425: 2,
  426: 2,
  427: 2,
  428: 2,
  430: 3,
  438: 3,
  439: 3,
  440: 3,
  443: 2,
  444: 2,
  445: 2,
  446: 2,
  447: 6,
  448: 6,
  449: 2,
  450: 2,
  464: 2,
  468: 3,
  476: 2,
  479: 1,
  480: 2,
  65535: 0
};
function T1(e) {
  var t = "of:=" + e.replace(d0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function E1(e) {
  return e.replace(/\./, "!");
}
var Ot = typeof Map < "u";
function m0(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Ot ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Ot ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else
    for (; n < a; ++n)
      if (e[n].t === t)
        return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Ot ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function Fn(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (Rr = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = un(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = $n(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function Zi(e, t) {
  if (!!e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function Wr(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a)
      if (r.ssf[a] == null) {
        za(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
        break;
      }
  }
  for (a = 0; a != i; ++a)
    if (e[a].numFmtId === n)
      return a;
  return e[i] = {
    numFmtId: n,
    fontId: 0,
    fillId: 0,
    borderId: 0,
    xfId: 0,
    applyNumberFormat: 1
  }, i;
}
function w1(e, t, r) {
  if (e && e["!ref"]) {
    var n = Ee(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r)
      throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function S1(e) {
  if (e.length === 0)
    return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r)
    t += '<mergeCell ref="' + Re(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function A1(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var l = t.SheetNames[r];
    try {
      t.Workbook && (l = t.Workbook.Sheets[r].CodeName || l);
    } catch {
    }
    i = !0, s.codeName = yr(ve(l));
  }
  if (e && e["!outline"]) {
    var o = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (o.summaryBelow = 0), e["!outline"].left && (o.summaryRight = 0), f = (f || "") + Y("outlinePr", null, o);
  }
  !i && !f || (a[a.length] = Y("sheetPr", f, s));
}
var F1 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], y1 = [
  "formatColumns",
  "formatRows",
  "formatCells",
  "insertColumns",
  "insertRows",
  "insertHyperlinks",
  "deleteColumns",
  "deleteRows",
  "sort",
  "autoFilter",
  "pivotTables"
];
function C1(e) {
  var t = { sheet: 1 };
  return F1.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), y1.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = Li(e.password).toString(16).toUpperCase()), Y("sheetProtection", null, t);
}
function O1(e) {
  return Zi(e), Y("pageMargins", null, e);
}
function R1(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    !(n = t[a]) || (r[r.length] = Y("col", null, Fn(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function D1(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : Re(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = sr(a);
  s.s.r == s.e.r && (s.e.r = sr(t["!ref"]).e.r, a = Re(s));
  for (var f = 0; f < i.length; ++f) {
    var l = i[f];
    if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
      l.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), Y("autoFilter", null, { ref: a });
}
function N1(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), Y("sheetViews", Y("sheetView", null, a), {});
}
function I1(e, t, r, n) {
  if (e.c && r["!comments"].push([t, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f)
    return "";
  var a = "", i = e.t, s = e.v;
  if (e.t !== "z")
    switch (e.t) {
      case "b":
        a = e.v ? "1" : "0";
        break;
      case "n":
        a = "" + e.v;
        break;
      case "e":
        a = Ut[e.v];
        break;
      case "d":
        n && n.cellDates ? a = Je(e.v, -1).toISOString() : (e = Qe(e), e.t = "n", a = "" + (e.v = Ze(Je(e.v)))), typeof e.z > "u" && (e.z = ye[14]);
        break;
      default:
        a = e.v;
        break;
    }
  var f = He("v", ve(a)), l = { r: t }, o = Wr(n.cellXfs, e, n);
  switch (o !== 0 && (l.s = o), e.t) {
    case "n":
      break;
    case "d":
      l.t = "d";
      break;
    case "b":
      l.t = "b";
      break;
    case "e":
      l.t = "e";
      break;
    case "z":
      break;
    default:
      if (e.v == null) {
        delete e.t;
        break;
      }
      if (e.v.length > 32767)
        throw new Error("Text length must not exceed 32767 characters");
      if (n && n.bookSST) {
        f = He("v", "" + m0(n.Strings, e.v, n.revStrings)), l.t = "s";
        break;
      }
      l.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = Y("f", ve(e.f), c) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (l.cm = 1), Y("c", f, l);
}
function k1(e, t, r, n) {
  var a = [], i = [], s = Ee(e["!ref"]), f = "", l, o = "", c = [], u = 0, h = 0, p = e["!rows"], _ = Array.isArray(e), x = { r: o }, g, C = -1;
  for (h = s.s.c; h <= s.e.c; ++h)
    c[h] = je(h);
  for (u = s.s.r; u <= s.e.r; ++u) {
    for (i = [], o = Ve(u), h = s.s.c; h <= s.e.c; ++h) {
      l = c[h] + o;
      var O = _ ? (e[u] || [])[h] : e[l];
      O !== void 0 && (f = I1(O, l, e, t)) != null && i.push(f);
    }
    (i.length > 0 || p && p[u]) && (x = { r: o }, p && p[u] && (g = p[u], g.hidden && (x.hidden = 1), C = -1, g.hpx ? C = xn(g.hpx) : g.hpt && (C = g.hpt), C > -1 && (x.ht = C, x.customHeight = 1), g.level && (x.outlineLevel = g.level)), a[a.length] = Y("row", i.join(""), x));
  }
  if (p)
    for (; u < p.length; ++u)
      p && p[u] && (x = { r: u + 1 }, g = p[u], g.hidden && (x.hidden = 1), C = -1, g.hpx ? C = xn(g.hpx) : g.hpt && (C = g.hpt), C > -1 && (x.ht = C, x.customHeight = 1), g.level && (x.outlineLevel = g.level), a[a.length] = Y("row", "", x));
  return a.join("");
}
function Qi(e, t, r, n) {
  var a = [De, Y("worksheet", null, {
    xmlns: xt[0],
    "xmlns:r": ke.r
  })], i = r.SheetNames[e], s = 0, f = "", l = r.Sheets[i];
  l == null && (l = {});
  var o = l["!ref"] || "A1", c = Ee(o);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + o + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), o = Re(c);
  }
  n || (n = {}), l["!comments"] = [];
  var u = [];
  A1(l, r, e, t, a), a[a.length] = Y("dimension", null, { ref: o }), a[a.length] = N1(l, t, e, r), t.sheetFormat && (a[a.length] = Y("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), l["!cols"] != null && l["!cols"].length > 0 && (a[a.length] = R1(l, l["!cols"])), a[s = a.length] = "<sheetData/>", l["!links"] = [], l["!ref"] != null && (f = k1(l, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), l["!protect"] && (a[a.length] = C1(l["!protect"])), l["!autofilter"] != null && (a[a.length] = D1(l["!autofilter"], l, r, e)), l["!merges"] != null && l["!merges"].length > 0 && (a[a.length] = S1(l["!merges"]));
  var h = -1, p, _ = -1;
  return l["!links"].length > 0 && (a[a.length] = "<hyperlinks>", l["!links"].forEach(function(x) {
    !x[1].Target || (p = { ref: x[0] }, x[1].Target.charAt(0) != "#" && (_ = pe(n, -1, ve(x[1].Target).replace(/#.*$/, ""), he.HLINK), p["r:id"] = "rId" + _), (h = x[1].Target.indexOf("#")) > -1 && (p.location = ve(x[1].Target.slice(h + 1))), x[1].Tooltip && (p.tooltip = ve(x[1].Tooltip)), a[a.length] = Y("hyperlink", null, p));
  }), a[a.length] = "</hyperlinks>"), delete l["!links"], l["!margins"] != null && (a[a.length] = O1(l["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = He("ignoredErrors", Y("ignoredError", null, { numberStoredAsText: 1, sqref: o }))), u.length > 0 && (_ = pe(n, -1, "../drawings/drawing" + (e + 1) + ".xml", he.DRAW), a[a.length] = Y("drawing", null, { "r:id": "rId" + _ }), l["!drawing"] = u), l["!comments"].length > 0 && (_ = pe(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", he.VML), a[a.length] = Y("legacyDrawing", null, { "r:id": "rId" + _ }), l["!legacy"] = _), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("");
}
function P1(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function L1(e, t, r) {
  var n = M(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = xn(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, l = n.l;
  n.l += 4;
  for (var o = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(t.s.c > c + 1 << 10 || t.e.c < c << 10)) {
      for (var u = -1, h = -1, p = c << 10; p < c + 1 << 10; ++p) {
        o.c = p;
        var _ = Array.isArray(r) ? (r[o.r] || [])[o.c] : r[me(o)];
        _ && (u < 0 && (u = p), h = p);
      }
      u < 0 || (++f, n.write_shift(4, u), n.write_shift(4, h));
    }
  var x = n.l;
  return n.l = l, n.write_shift(4, f), n.l = x, n.length > n.l ? n.slice(0, n.l) : n;
}
function B1(e, t, r, n) {
  var a = L1(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && W(e, 0, a);
}
var M1 = et, b1 = pt;
function U1() {
}
function W1(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = Jo(e), r;
}
function H1(e, t, r) {
  r == null && (r = M(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a)
    r.write_shift(1, 0);
  return ln({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), di(e, r), r.slice(0, r.l);
}
function V1(e) {
  var t = hr(e);
  return [t];
}
function G1(e, t, r) {
  return r == null && (r = M(8)), qr(t, r);
}
function X1(e) {
  var t = Zr(e);
  return [t];
}
function j1(e, t, r) {
  return r == null && (r = M(4)), Qr(t, r);
}
function $1(e) {
  var t = hr(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function z1(e, t, r) {
  return r == null && (r = M(9)), qr(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function K1(e) {
  var t = Zr(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function Y1(e, t, r) {
  return r == null && (r = M(5)), Qr(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function J1(e) {
  var t = hr(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function q1(e, t, r) {
  return r == null && (r = M(9)), qr(t, r), r.write_shift(1, e.v), r;
}
function Z1(e) {
  var t = Zr(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function Q1(e, t, r) {
  return r == null && (r = M(8)), Qr(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function eu(e) {
  var t = hr(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function ru(e, t, r) {
  return r == null && (r = M(12)), qr(t, r), r.write_shift(4, t.v), r;
}
function tu(e) {
  var t = Zr(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function nu(e, t, r) {
  return r == null && (r = M(8)), Qr(t, r), r.write_shift(4, t.v), r;
}
function au(e) {
  var t = hr(e), r = vt(e);
  return [t, r, "n"];
}
function iu(e, t, r) {
  return r == null && (r = M(16)), qr(t, r), Kr(e.v, r), r;
}
function su(e) {
  var t = Zr(e), r = vt(e);
  return [t, r, "n"];
}
function fu(e, t, r) {
  return r == null && (r = M(12)), Qr(t, r), Kr(e.v, r), r;
}
function ou(e) {
  var t = hr(e), r = pi(e);
  return [t, r, "n"];
}
function lu(e, t, r) {
  return r == null && (r = M(12)), qr(t, r), vi(e.v, r), r;
}
function cu(e) {
  var t = Zr(e), r = pi(e);
  return [t, r, "n"];
}
function hu(e, t, r) {
  return r == null && (r = M(8)), Qr(t, r), vi(e.v, r), r;
}
function uu(e) {
  var t = hr(e), r = l0(e);
  return [t, r, "is"];
}
function xu(e) {
  var t = hr(e), r = $e(e);
  return [t, r, "str"];
}
function du(e, t, r) {
  return r == null && (r = M(12 + 4 * e.v.length)), qr(t, r), Le(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function pu(e) {
  var t = Zr(e), r = $e(e);
  return [t, r, "str"];
}
function vu(e, t, r) {
  return r == null && (r = M(8 + 4 * e.v.length)), Qr(t, r), Le(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function mu(e, t, r) {
  var n = e.l + t, a = hr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = An(e, n - e.l, r);
    s[3] = ut(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function gu(e, t, r) {
  var n = e.l + t, a = hr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = An(e, n - e.l, r);
    s[3] = ut(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function _u(e, t, r) {
  var n = e.l + t, a = hr(e);
  a.r = r["!row"];
  var i = vt(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = An(e, n - e.l, r);
    s[3] = ut(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function Tu(e, t, r) {
  var n = e.l + t, a = hr(e);
  a.r = r["!row"];
  var i = $e(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = An(e, n - e.l, r);
    s[3] = ut(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
var Eu = et, wu = pt;
function Su(e, t) {
  return t == null && (t = M(4)), t.write_shift(4, e), t;
}
function Au(e, t) {
  var r = e.l + t, n = et(e), a = c0(e), i = $e(e), s = $e(e), f = $e(e);
  e.l = r;
  var l = { rfx: n, relId: a, loc: i, display: f };
  return s && (l.Tooltip = s), l;
}
function Fu(e, t) {
  var r = M(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  pt({ s: Pe(e[0]), e: Pe(e[0]) }, r), h0("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return Le(a || "", r), Le(e[1].Tooltip || "", r), Le("", r), r.slice(0, r.l);
}
function yu() {
}
function Cu(e, t, r) {
  var n = e.l + t, a = mi(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = p1(e, n - e.l, r);
    s[1] = f;
  } else
    e.l = n;
  return s;
}
function Ou(e, t, r) {
  var n = e.l + t, a = et(e), i = [a];
  if (r.cellFormula) {
    var s = m1(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else
    e.l = n;
  return i;
}
function Ru(e, t, r) {
  r == null && (r = M(18));
  var n = Fn(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(4, 0);
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var es = ["left", "right", "top", "bottom", "header", "footer"];
function Du(e) {
  var t = {};
  return es.forEach(function(r) {
    t[r] = vt(e);
  }), t;
}
function Nu(e, t) {
  return t == null && (t = M(6 * 8)), Zi(e), es.forEach(function(r) {
    Kr(e[r], t);
  }), t;
}
function Iu(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function ku(e, t, r) {
  r == null && (r = M(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function Pu(e) {
  var t = M(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), pt(e, t), t;
}
function Lu(e, t) {
  return t == null && (t = M(16 * 4 + 2)), t.write_shift(2, e.password ? Li(e.password) : 0), t.write_shift(4, 1), [
    ["objects", !1],
    ["scenarios", !1],
    ["formatCells", !0],
    ["formatColumns", !0],
    ["formatRows", !0],
    ["insertColumns", !0],
    ["insertRows", !0],
    ["insertHyperlinks", !0],
    ["deleteColumns", !0],
    ["deleteRows", !0],
    ["selectLockedCells", !1],
    ["sort", !0],
    ["autoFilter", !0],
    ["pivotTables", !0],
    ["selectUnlockedCells", !1]
  ].forEach(function(r) {
    r[1] ? t.write_shift(4, e[r[0]] != null && !e[r[0]] ? 1 : 0) : t.write_shift(4, e[r[0]] != null && e[r[0]] ? 0 : 1);
  }), t;
}
function Bu() {
}
function Mu() {
}
function bu(e, t, r, n, a, i, s) {
  if (t.v === void 0)
    return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = Qe(t), t.z = t.z || ye[14], t.v = Ze(Je(t.v)), t.t = "n";
      break;
    case "n":
    case "e":
      f = "" + t.v;
      break;
    default:
      f = t.v;
      break;
  }
  var l = { r, c: n };
  switch (l.s = Wr(a.cellXfs, t, a), t.l && i["!links"].push([me(l), t.l]), t.c && i["!comments"].push([me(l), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = m0(a.Strings, t.v, a.revStrings), l.t = "s", l.v = f, s ? W(e, 18, nu(t, l)) : W(e, 7, ru(t, l))) : (l.t = "str", s ? W(e, 17, vu(t, l)) : W(e, 6, du(t, l))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? W(e, 13, hu(t, l)) : W(e, 2, lu(t, l)) : s ? W(e, 16, fu(t, l)) : W(e, 5, iu(t, l)), !0;
    case "b":
      return l.t = "b", s ? W(e, 15, Y1(t, l)) : W(e, 4, z1(t, l)), !0;
    case "e":
      return l.t = "e", s ? W(e, 14, Q1(t, l)) : W(e, 3, q1(t, l)), !0;
  }
  return s ? W(e, 12, j1(t, l)) : W(e, 1, G1(t, l)), !0;
}
function Uu(e, t, r, n) {
  var a = Ee(t["!ref"] || "A1"), i, s = "", f = [];
  W(e, 145);
  var l = Array.isArray(t), o = a.e.r;
  t["!rows"] && (o = Math.max(a.e.r, t["!rows"].length - 1));
  for (var c = a.s.r; c <= o; ++c) {
    s = Ve(c), B1(e, t, a, c);
    var u = !1;
    if (c <= a.e.r)
      for (var h = a.s.c; h <= a.e.c; ++h) {
        c === a.s.r && (f[h] = je(h)), i = f[h] + s;
        var p = l ? (t[c] || [])[h] : t[i];
        if (!p) {
          u = !1;
          continue;
        }
        u = bu(e, p, c, h, n, t, u);
      }
  }
  W(e, 146);
}
function Wu(e, t) {
  !t || !t["!merges"] || (W(e, 177, Su(t["!merges"].length)), t["!merges"].forEach(function(r) {
    W(e, 176, wu(r));
  }), W(e, 178));
}
function Hu(e, t) {
  !t || !t["!cols"] || (W(e, 390), t["!cols"].forEach(function(r, n) {
    r && W(e, 60, Ru(n, r));
  }), W(e, 391));
}
function Vu(e, t) {
  !t || !t["!ref"] || (W(e, 648), W(e, 649, Pu(Ee(t["!ref"]))), W(e, 650));
}
function Gu(e, t, r) {
  t["!links"].forEach(function(n) {
    if (!!n[1].Target) {
      var a = pe(r, -1, n[1].Target.replace(/#.*$/, ""), he.HLINK);
      W(e, 494, Fu(n, a));
    }
  }), delete t["!links"];
}
function Xu(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = pe(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", he.VML);
    W(e, 551, h0("rId" + a)), t["!legacy"] = a;
  }
}
function ju(e, t, r, n) {
  if (!!t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : Re(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = sr(i);
    f.s.r == f.e.r && (f.e.r = sr(t["!ref"]).e.r, i = Re(f));
    for (var l = 0; l < s.length; ++l) {
      var o = s[l];
      if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
        o.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    l == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), W(e, 161, pt(Ee(i))), W(e, 162);
  }
}
function $u(e, t, r) {
  W(e, 133), W(e, 137, ku(t, r)), W(e, 138), W(e, 134);
}
function zu(e, t) {
  !t["!protect"] || W(e, 535, Lu(t["!protect"]));
}
function Ku(e, t, r, n) {
  var a = qe(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var l = Ee(s["!ref"] || "A1");
  if (l.e.c > 16383 || l.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    l.e.c = Math.min(l.e.c, 16383), l.e.r = Math.min(l.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], W(a, 129), (r.vbaraw || s["!outline"]) && W(a, 147, H1(f, s["!outline"])), W(a, 148, b1(l)), $u(a, s, r.Workbook), Hu(a, s), Uu(a, s, e, t), zu(a, s), ju(a, s, r, e), Wu(a, s), Gu(a, s, n), s["!margins"] && W(a, 476, Nu(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && Vu(a, s), Xu(a, s, e, n), W(a, 130), a.end();
}
function Yu(e, t) {
  e.l += 10;
  var r = $e(e);
  return { name: r };
}
var Ju = [
  ["allowRefreshQuery", !1, "bool"],
  ["autoCompressPictures", !0, "bool"],
  ["backupFile", !1, "bool"],
  ["checkCompatibility", !1, "bool"],
  ["CodeName", ""],
  ["date1904", !1, "bool"],
  ["defaultThemeVersion", 0, "int"],
  ["filterPrivacy", !1, "bool"],
  ["hidePivotFieldList", !1, "bool"],
  ["promptedSolutions", !1, "bool"],
  ["publishItems", !1, "bool"],
  ["refreshAllConnections", !1, "bool"],
  ["saveExternalLinkValues", !0, "bool"],
  ["showBorderUnselectedTables", !0, "bool"],
  ["showInkAnnotation", !0, "bool"],
  ["showObjects", "all"],
  ["showPivotChartFilter", !1, "bool"],
  ["updateLinks", "userSet"]
];
function qu(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : Oo(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var Zu = /* @__PURE__ */ "][*?/\\".split("");
function rs(e, t) {
  if (e.length > 31) {
    if (t)
      return !1;
    throw new Error("Sheet names cannot exceed 31 chars");
  }
  var r = !0;
  return Zu.forEach(function(n) {
    if (e.indexOf(n) != -1) {
      if (!t)
        throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
      r = !1;
    }
  }), r;
}
function Qu(e, t, r) {
  e.forEach(function(n, a) {
    rs(n);
    for (var i = 0; i < a; ++i)
      if (n == e[i])
        throw new Error("Duplicate Sheet Name: " + n);
    if (r) {
      var s = t && t[a] && t[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22)
        throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function ex(e) {
  if (!e || !e.SheetNames || !e.Sheets)
    throw new Error("Invalid Workbook");
  if (!e.SheetNames.length)
    throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  Qu(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r)
    w1(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function ts(e) {
  var t = [De];
  t[t.length] = Y("workbook", null, {
    xmlns: xt[0],
    "xmlns:r": ke.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (Ju.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = Y("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && !!a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: ve(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i])
      switch (a[i].Hidden) {
        case 1:
          s.state = "hidden";
          break;
        case 2:
          s.state = "veryHidden";
          break;
      }
    t[t.length] = Y("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var l = { name: f.Name };
    f.Comment && (l.comment = f.Comment), f.Sheet != null && (l.localSheetId = "" + f.Sheet), f.Hidden && (l.hidden = "1"), f.Ref && (t[t.length] = Y("definedName", ve(f.Ref), l));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function rx(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = jn(e), r.name = $e(e), r;
}
function tx(e, t) {
  return t || (t = M(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), h0(e.strRelID, t), Le(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function nx(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? $e(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function ax(e, t) {
  t || (t = M(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), di(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function ix(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = qo(e), s = v1(e, 0, r), f = c0(e);
  e.l = n;
  var l = { Name: i, Ptg: s };
  return a < 268435455 && (l.Sheet = a), f && (l.Comment = f), l;
}
function sx(e, t) {
  W(e, 143);
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    W(e, 156, tx(a));
  }
  W(e, 144);
}
function fx(e, t) {
  t || (t = M(127));
  for (var r = 0; r != 4; ++r)
    t.write_shift(4, 0);
  return Le("SheetJS", t), Le(rn.version, t), Le(rn.version, t), Le("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function ox(e, t) {
  t || (t = M(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function lx(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (W(e, 135), W(e, 158, ox(a)), W(e, 136));
  }
}
function cx(e, t) {
  var r = qe();
  return W(r, 131), W(r, 128, fx()), W(r, 153, ax(e.Workbook && e.Workbook.WBProps || null)), lx(r, e), sx(r, e), W(r, 132), r.end();
}
function hx(e, t, r) {
  return (t.slice(-4) === ".bin" ? cx : ts)(e);
}
function ux(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? Ku : Qi)(e, r, n, a);
}
function xx(e, t, r) {
  return (t.slice(-4) === ".bin" ? Nc : bi)(e, r);
}
function dx(e, t, r) {
  return (t.slice(-4) === ".bin" ? ac : Pi)(e, r);
}
function px(e, t, r) {
  return (t.slice(-4) === ".bin" ? zc : Gi)(e);
}
function vx(e) {
  return (e.slice(-4) === ".bin" ? Uc : Hi)();
}
function mx(e, t) {
  var r = [];
  return e.Props && r.push(xl(e.Props, t)), e.Custprops && r.push(dl(e.Props, e.Custprops)), r.join("");
}
function gx() {
  return "";
}
function _x(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(Y("NumberFormat", null, { "ss:Format": ve(ye[n.numFmtId]) }));
    var s = { "ss:ID": "s" + (21 + a) };
    r.push(Y("Style", i.join(""), s));
  }), Y("Styles", r.join(""));
}
function ns(e) {
  return Y("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + p0(e.Ref, { r: 0, c: 0 }) });
}
function Tx(e) {
  if (!((e || {}).Workbook || {}).Names)
    return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(ns(a)));
  }
  return Y("Names", r.join(""));
}
function Ex(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names)
    return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(ns(f)));
  }
  return i.join("");
}
function wx(e, t, r, n) {
  if (!e)
    return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(Y("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(Y("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(Y("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[r])
    if (n.Workbook.Sheets[r].Hidden)
      a.push(Y("Visible", n.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i)
        ;
      i == r && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(He("ProtectContents", "True")), e["!protect"].objects && a.push(He("ProtectObjects", "True")), e["!protect"].scenarios && a.push(He("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(He("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(He("EnableSelection", "UnlockedCells")), [
    ["formatCells", "AllowFormatCells"],
    ["formatColumns", "AllowSizeCols"],
    ["formatRows", "AllowSizeRows"],
    ["insertColumns", "AllowInsertCols"],
    ["insertRows", "AllowInsertRows"],
    ["insertHyperlinks", "AllowInsertHyperlinks"],
    ["deleteColumns", "AllowDeleteCols"],
    ["deleteRows", "AllowDeleteRows"],
    ["sort", "AllowSort"],
    ["autoFilter", "AllowFilter"],
    ["pivotTables", "AllowUsePivotTables"]
  ].forEach(function(s) {
    e["!protect"][s[0]] && a.push("<" + s[1] + "/>");
  })), a.length == 0 ? "" : Y("WorksheetOptions", a.join(""), { xmlns: nr.x });
}
function Sx(e) {
  return e.map(function(t) {
    var r = Co(t.t || ""), n = Y("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return Y("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function Ax(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null)
    return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + ve(p0(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var l = Pe(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (l.r == s.r ? "" : "[" + (l.r - s.r) + "]") + "C" + (l.c == s.c ? "" : "[" + (l.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = ve(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = ve(e.l.Tooltip))), r["!merges"])
    for (var o = r["!merges"], c = 0; c != o.length; ++c)
      o[c].s.c != s.c || o[c].s.r != s.r || (o[c].e.c > o[c].s.c && (f["ss:MergeAcross"] = o[c].e.c - o[c].s.c), o[c].e.r > o[c].s.r && (f["ss:MergeDown"] = o[c].e.r - o[c].s.r));
  var u = "", h = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs)
        return "";
      break;
    case "n":
      u = "Number", h = String(e.v);
      break;
    case "b":
      u = "Boolean", h = e.v ? "1" : "0";
      break;
    case "e":
      u = "Error", h = Ut[e.v];
      break;
    case "d":
      u = "DateTime", h = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || ye[14]);
      break;
    case "s":
      u = "String", h = yo(e.v || "");
      break;
  }
  var p = Wr(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + p), f["ss:Index"] = s.c + 1;
  var _ = e.v != null ? h : "", x = e.t == "z" ? "" : '<Data ss:Type="' + u + '">' + _ + "</Data>";
  return (e.c || []).length > 0 && (x += Sx(e.c)), Y("Cell", x, f);
}
function Fx(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = Mi(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function yx(e, t, r, n) {
  if (!e["!ref"])
    return "";
  var a = Ee(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(g, C) {
    x0(g);
    var O = !!g.width, A = Fn(C, g), B = { "ss:Index": C + 1 };
    O && (B["ss:Width"] = hn(A.width)), g.hidden && (B["ss:Hidden"] = "1"), f.push(Y("Column", null, B));
  });
  for (var l = Array.isArray(e), o = a.s.r; o <= a.e.r; ++o) {
    for (var c = [Fx(o, (e["!rows"] || [])[o])], u = a.s.c; u <= a.e.c; ++u) {
      var h = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > u) && !(i[s].s.r > o) && !(i[s].e.c < u) && !(i[s].e.r < o)) {
          (i[s].s.c != u || i[s].s.r != o) && (h = !0);
          break;
        }
      if (!h) {
        var p = { r: o, c: u }, _ = me(p), x = l ? (e[o] || [])[u] : e[_];
        c.push(Ax(x, _, e, t, r, n, p));
      }
    }
    c.push("</Row>"), c.length > 2 && f.push(c.join(""));
  }
  return f.join("");
}
function Cx(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? Ex(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? yx(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(wx(i, t, e, r)), n.join("");
}
function Ox(e, t) {
  t || (t = {}), e.SSF || (e.SSF = Qe(ye)), e.SSF && (Tn(), _n(e.SSF), t.revssf = En(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], Wr(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(mx(e, t)), r.push(gx()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(Y("Worksheet", Cx(n, t, e), { "ss:Name": ve(e.SheetNames[n]) }));
  return r[2] = _x(e, t), r[3] = Tx(e), De + Y("Workbook", r.join(""), {
    xmlns: nr.ss,
    "xmlns:o": nr.o,
    "xmlns:x": nr.x,
    "xmlns:ss": nr.ss,
    "xmlns:dt": nr.dt,
    "xmlns:html": nr.html
  });
}
var Un = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function Rx(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = j0(aa, "n"), l = j0(ia, "n");
  if (e.Props)
    for (s = Ge(e.Props), i = 0; i < s.length; ++i)
      (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(l, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = Ge(e.Custprops), i = 0; i < s.length; ++i)
      Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(l, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var o = [];
  for (i = 0; i < a.length; ++i)
    Ci.indexOf(a[i][0]) > -1 || Ai.indexOf(a[i][0]) > -1 || a[i][1] != null && o.push(a[i]);
  n.length && _e.utils.cfb_add(t, "/SummaryInformation", ca(n, Un.SI, l, ia)), (r.length || o.length) && _e.utils.cfb_add(t, "/DocumentSummaryInformation", ca(r, Un.DSI, f, aa, o.length ? o : null, Un.UDI));
}
function Dx(e, t) {
  var r = t || {}, n = _e.utils.cfb_new({ root: "R" }), a = "/Workbook";
  switch (r.bookType || "xls") {
    case "xls":
      r.bookType = "biff8";
    case "xla":
      r.bookType || (r.bookType = "xla");
    case "biff8":
      a = "/Workbook", r.biff = 8;
      break;
    case "biff5":
      a = "/Book", r.biff = 5;
      break;
    default:
      throw new Error("invalid type " + r.bookType + " for XLS CFB");
  }
  return _e.utils.cfb_add(n, a, as(e, r)), r.biff == 8 && (e.Props || e.Custprops) && Rx(e, n), r.biff == 8 && e.vbaraw && Kc(n, _e.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var Nx = {
  0: { f: P1 },
  1: { f: V1 },
  2: { f: ou },
  3: { f: J1 },
  4: { f: $1 },
  5: { f: au },
  6: { f: xu },
  7: { f: eu },
  8: { f: Tu },
  9: { f: _u },
  10: { f: mu },
  11: { f: gu },
  12: { f: X1 },
  13: { f: cu },
  14: { f: Z1 },
  15: { f: K1 },
  16: { f: su },
  17: { f: pu },
  18: { f: tu },
  19: { f: l0 },
  20: {},
  21: {},
  22: {},
  23: {},
  24: {},
  25: {},
  26: {},
  27: {},
  28: {},
  29: {},
  30: {},
  31: {},
  32: {},
  33: {},
  34: {},
  35: { T: 1 },
  36: { T: -1 },
  37: { T: 1 },
  38: { T: -1 },
  39: { f: ix },
  40: {},
  42: {},
  43: { f: xc },
  44: { f: hc },
  45: { f: vc },
  46: { f: gc },
  47: { f: mc },
  48: {},
  49: { f: Xo },
  50: {},
  51: { f: Pc },
  52: { T: 1 },
  53: { T: -1 },
  54: { T: 1 },
  55: { T: -1 },
  56: { T: 1 },
  57: { T: -1 },
  58: {},
  59: {},
  60: { f: jl },
  62: { f: uu },
  63: { f: Wc },
  64: { f: Bu },
  65: {},
  66: {},
  67: {},
  68: {},
  69: {},
  70: {},
  128: {},
  129: { T: 1 },
  130: { T: -1 },
  131: { T: 1, f: wr, p: 0 },
  132: { T: -1 },
  133: { T: 1 },
  134: { T: -1 },
  135: { T: 1 },
  136: { T: -1 },
  137: { T: 1, f: Iu },
  138: { T: -1 },
  139: { T: 1 },
  140: { T: -1 },
  141: { T: 1 },
  142: { T: -1 },
  143: { T: 1 },
  144: { T: -1 },
  145: { T: 1 },
  146: { T: -1 },
  147: { f: W1 },
  148: { f: M1, p: 16 },
  151: { f: yu },
  152: {},
  153: { f: nx },
  154: {},
  155: {},
  156: { f: rx },
  157: {},
  158: {},
  159: { T: 1, f: rc },
  160: { T: -1 },
  161: { T: 1, f: et },
  162: { T: -1 },
  163: { T: 1 },
  164: { T: -1 },
  165: { T: 1 },
  166: { T: -1 },
  167: {},
  168: {},
  169: {},
  170: {},
  171: {},
  172: { T: 1 },
  173: { T: -1 },
  174: {},
  175: {},
  176: { f: Eu },
  177: { T: 1 },
  178: { T: -1 },
  179: { T: 1 },
  180: { T: -1 },
  181: { T: 1 },
  182: { T: -1 },
  183: { T: 1 },
  184: { T: -1 },
  185: { T: 1 },
  186: { T: -1 },
  187: { T: 1 },
  188: { T: -1 },
  189: { T: 1 },
  190: { T: -1 },
  191: { T: 1 },
  192: { T: -1 },
  193: { T: 1 },
  194: { T: -1 },
  195: { T: 1 },
  196: { T: -1 },
  197: { T: 1 },
  198: { T: -1 },
  199: { T: 1 },
  200: { T: -1 },
  201: { T: 1 },
  202: { T: -1 },
  203: { T: 1 },
  204: { T: -1 },
  205: { T: 1 },
  206: { T: -1 },
  207: { T: 1 },
  208: { T: -1 },
  209: { T: 1 },
  210: { T: -1 },
  211: { T: 1 },
  212: { T: -1 },
  213: { T: 1 },
  214: { T: -1 },
  215: { T: 1 },
  216: { T: -1 },
  217: { T: 1 },
  218: { T: -1 },
  219: { T: 1 },
  220: { T: -1 },
  221: { T: 1 },
  222: { T: -1 },
  223: { T: 1 },
  224: { T: -1 },
  225: { T: 1 },
  226: { T: -1 },
  227: { T: 1 },
  228: { T: -1 },
  229: { T: 1 },
  230: { T: -1 },
  231: { T: 1 },
  232: { T: -1 },
  233: { T: 1 },
  234: { T: -1 },
  235: { T: 1 },
  236: { T: -1 },
  237: { T: 1 },
  238: { T: -1 },
  239: { T: 1 },
  240: { T: -1 },
  241: { T: 1 },
  242: { T: -1 },
  243: { T: 1 },
  244: { T: -1 },
  245: { T: 1 },
  246: { T: -1 },
  247: { T: 1 },
  248: { T: -1 },
  249: { T: 1 },
  250: { T: -1 },
  251: { T: 1 },
  252: { T: -1 },
  253: { T: 1 },
  254: { T: -1 },
  255: { T: 1 },
  256: { T: -1 },
  257: { T: 1 },
  258: { T: -1 },
  259: { T: 1 },
  260: { T: -1 },
  261: { T: 1 },
  262: { T: -1 },
  263: { T: 1 },
  264: { T: -1 },
  265: { T: 1 },
  266: { T: -1 },
  267: { T: 1 },
  268: { T: -1 },
  269: { T: 1 },
  270: { T: -1 },
  271: { T: 1 },
  272: { T: -1 },
  273: { T: 1 },
  274: { T: -1 },
  275: { T: 1 },
  276: { T: -1 },
  277: {},
  278: { T: 1 },
  279: { T: -1 },
  280: { T: 1 },
  281: { T: -1 },
  282: { T: 1 },
  283: { T: 1 },
  284: { T: -1 },
  285: { T: 1 },
  286: { T: -1 },
  287: { T: 1 },
  288: { T: -1 },
  289: { T: 1 },
  290: { T: -1 },
  291: { T: 1 },
  292: { T: -1 },
  293: { T: 1 },
  294: { T: -1 },
  295: { T: 1 },
  296: { T: -1 },
  297: { T: 1 },
  298: { T: -1 },
  299: { T: 1 },
  300: { T: -1 },
  301: { T: 1 },
  302: { T: -1 },
  303: { T: 1 },
  304: { T: -1 },
  305: { T: 1 },
  306: { T: -1 },
  307: { T: 1 },
  308: { T: -1 },
  309: { T: 1 },
  310: { T: -1 },
  311: { T: 1 },
  312: { T: -1 },
  313: { T: -1 },
  314: { T: 1 },
  315: { T: -1 },
  316: { T: 1 },
  317: { T: -1 },
  318: { T: 1 },
  319: { T: -1 },
  320: { T: 1 },
  321: { T: -1 },
  322: { T: 1 },
  323: { T: -1 },
  324: { T: 1 },
  325: { T: -1 },
  326: { T: 1 },
  327: { T: -1 },
  328: { T: 1 },
  329: { T: -1 },
  330: { T: 1 },
  331: { T: -1 },
  332: { T: 1 },
  333: { T: -1 },
  334: { T: 1 },
  335: { f: Ic },
  336: { T: -1 },
  337: { f: Mc, T: 1 },
  338: { T: -1 },
  339: { T: 1 },
  340: { T: -1 },
  341: { T: 1 },
  342: { T: -1 },
  343: { T: 1 },
  344: { T: -1 },
  345: { T: 1 },
  346: { T: -1 },
  347: { T: 1 },
  348: { T: -1 },
  349: { T: 1 },
  350: { T: -1 },
  351: {},
  352: {},
  353: { T: 1 },
  354: { T: -1 },
  355: { f: jn },
  357: {},
  358: {},
  359: {},
  360: { T: 1 },
  361: {},
  362: { f: Ul },
  363: {},
  364: {},
  366: {},
  367: {},
  368: {},
  369: {},
  370: {},
  371: {},
  372: { T: 1 },
  373: { T: -1 },
  374: { T: 1 },
  375: { T: -1 },
  376: { T: 1 },
  377: { T: -1 },
  378: { T: 1 },
  379: { T: -1 },
  380: { T: 1 },
  381: { T: -1 },
  382: { T: 1 },
  383: { T: -1 },
  384: { T: 1 },
  385: { T: -1 },
  386: { T: 1 },
  387: { T: -1 },
  388: { T: 1 },
  389: { T: -1 },
  390: { T: 1 },
  391: { T: -1 },
  392: { T: 1 },
  393: { T: -1 },
  394: { T: 1 },
  395: { T: -1 },
  396: {},
  397: {},
  398: {},
  399: {},
  400: {},
  401: { T: 1 },
  403: {},
  404: {},
  405: {},
  406: {},
  407: {},
  408: {},
  409: {},
  410: {},
  411: {},
  412: {},
  413: {},
  414: {},
  415: {},
  416: {},
  417: {},
  418: {},
  419: {},
  420: {},
  421: {},
  422: { T: 1 },
  423: { T: 1 },
  424: { T: -1 },
  425: { T: -1 },
  426: { f: Cu },
  427: { f: Ou },
  428: {},
  429: { T: 1 },
  430: { T: -1 },
  431: { T: 1 },
  432: { T: -1 },
  433: { T: 1 },
  434: { T: -1 },
  435: { T: 1 },
  436: { T: -1 },
  437: { T: 1 },
  438: { T: -1 },
  439: { T: 1 },
  440: { T: -1 },
  441: { T: 1 },
  442: { T: -1 },
  443: { T: 1 },
  444: { T: -1 },
  445: { T: 1 },
  446: { T: -1 },
  447: { T: 1 },
  448: { T: -1 },
  449: { T: 1 },
  450: { T: -1 },
  451: { T: 1 },
  452: { T: -1 },
  453: { T: 1 },
  454: { T: -1 },
  455: { T: 1 },
  456: { T: -1 },
  457: { T: 1 },
  458: { T: -1 },
  459: { T: 1 },
  460: { T: -1 },
  461: { T: 1 },
  462: { T: -1 },
  463: { T: 1 },
  464: { T: -1 },
  465: { T: 1 },
  466: { T: -1 },
  467: { T: 1 },
  468: { T: -1 },
  469: { T: 1 },
  470: { T: -1 },
  471: {},
  472: {},
  473: { T: 1 },
  474: { T: -1 },
  475: {},
  476: { f: Du },
  477: {},
  478: {},
  479: { T: 1 },
  480: { T: -1 },
  481: { T: 1 },
  482: { T: -1 },
  483: { T: 1 },
  484: { T: -1 },
  485: { f: U1 },
  486: { T: 1 },
  487: { T: -1 },
  488: { T: 1 },
  489: { T: -1 },
  490: { T: 1 },
  491: { T: -1 },
  492: { T: 1 },
  493: { T: -1 },
  494: { f: Au },
  495: { T: 1 },
  496: { T: -1 },
  497: { T: 1 },
  498: { T: -1 },
  499: {},
  500: { T: 1 },
  501: { T: -1 },
  502: { T: 1 },
  503: { T: -1 },
  504: {},
  505: { T: 1 },
  506: { T: -1 },
  507: {},
  508: { T: 1 },
  509: { T: -1 },
  510: { T: 1 },
  511: { T: -1 },
  512: {},
  513: {},
  514: { T: 1 },
  515: { T: -1 },
  516: { T: 1 },
  517: { T: -1 },
  518: { T: 1 },
  519: { T: -1 },
  520: { T: 1 },
  521: { T: -1 },
  522: {},
  523: {},
  524: {},
  525: {},
  526: {},
  527: {},
  528: { T: 1 },
  529: { T: -1 },
  530: { T: 1 },
  531: { T: -1 },
  532: { T: 1 },
  533: { T: -1 },
  534: {},
  535: {},
  536: {},
  537: {},
  538: { T: 1 },
  539: { T: -1 },
  540: { T: 1 },
  541: { T: -1 },
  542: { T: 1 },
  548: {},
  549: {},
  550: { f: jn },
  551: {},
  552: {},
  553: {},
  554: { T: 1 },
  555: { T: -1 },
  556: { T: 1 },
  557: { T: -1 },
  558: { T: 1 },
  559: { T: -1 },
  560: { T: 1 },
  561: { T: -1 },
  562: {},
  564: {},
  565: { T: 1 },
  566: { T: -1 },
  569: { T: 1 },
  570: { T: -1 },
  572: {},
  573: { T: 1 },
  574: { T: -1 },
  577: {},
  578: {},
  579: {},
  580: {},
  581: {},
  582: {},
  583: {},
  584: {},
  585: {},
  586: {},
  587: {},
  588: { T: -1 },
  589: {},
  590: { T: 1 },
  591: { T: -1 },
  592: { T: 1 },
  593: { T: -1 },
  594: { T: 1 },
  595: { T: -1 },
  596: {},
  597: { T: 1 },
  598: { T: -1 },
  599: { T: 1 },
  600: { T: -1 },
  601: { T: 1 },
  602: { T: -1 },
  603: { T: 1 },
  604: { T: -1 },
  605: { T: 1 },
  606: { T: -1 },
  607: {},
  608: { T: 1 },
  609: { T: -1 },
  610: {},
  611: { T: 1 },
  612: { T: -1 },
  613: { T: 1 },
  614: { T: -1 },
  615: { T: 1 },
  616: { T: -1 },
  617: { T: 1 },
  618: { T: -1 },
  619: { T: 1 },
  620: { T: -1 },
  625: {},
  626: { T: 1 },
  627: { T: -1 },
  628: { T: 1 },
  629: { T: -1 },
  630: { T: 1 },
  631: { T: -1 },
  632: { f: jc },
  633: { T: 1 },
  634: { T: -1 },
  635: { T: 1, f: Gc },
  636: { T: -1 },
  637: { f: Ko },
  638: { T: 1 },
  639: {},
  640: { T: -1 },
  641: { T: 1 },
  642: { T: -1 },
  643: { T: 1 },
  644: {},
  645: { T: -1 },
  646: { T: 1 },
  648: { T: 1 },
  649: {},
  650: { T: -1 },
  651: { f: Yu },
  652: {},
  653: { T: 1 },
  654: { T: -1 },
  655: { T: 1 },
  656: { T: -1 },
  657: { T: 1 },
  658: { T: -1 },
  659: {},
  660: { T: 1 },
  661: {},
  662: { T: -1 },
  663: {},
  664: { T: 1 },
  665: {},
  666: { T: -1 },
  667: {},
  668: {},
  669: {},
  671: { T: 1 },
  672: { T: -1 },
  673: { T: 1 },
  674: { T: -1 },
  675: {},
  676: {},
  677: {},
  678: {},
  679: {},
  680: {},
  681: {},
  1024: {},
  1025: {},
  1026: { T: 1 },
  1027: { T: -1 },
  1028: { T: 1 },
  1029: { T: -1 },
  1030: {},
  1031: { T: 1 },
  1032: { T: -1 },
  1033: { T: 1 },
  1034: { T: -1 },
  1035: {},
  1036: {},
  1037: {},
  1038: { T: 1 },
  1039: { T: -1 },
  1040: {},
  1041: { T: 1 },
  1042: { T: -1 },
  1043: {},
  1044: {},
  1045: {},
  1046: { T: 1 },
  1047: { T: -1 },
  1048: { T: 1 },
  1049: { T: -1 },
  1050: {},
  1051: { T: 1 },
  1052: { T: 1 },
  1053: { f: Mu },
  1054: { T: 1 },
  1055: {},
  1056: { T: 1 },
  1057: { T: -1 },
  1058: { T: 1 },
  1059: { T: -1 },
  1061: {},
  1062: { T: 1 },
  1063: { T: -1 },
  1064: { T: 1 },
  1065: { T: -1 },
  1066: { T: 1 },
  1067: { T: -1 },
  1068: { T: 1 },
  1069: { T: -1 },
  1070: { T: 1 },
  1071: { T: -1 },
  1072: { T: 1 },
  1073: { T: -1 },
  1075: { T: 1 },
  1076: { T: -1 },
  1077: { T: 1 },
  1078: { T: -1 },
  1079: { T: 1 },
  1080: { T: -1 },
  1081: { T: 1 },
  1082: { T: -1 },
  1083: { T: 1 },
  1084: { T: -1 },
  1085: {},
  1086: { T: 1 },
  1087: { T: -1 },
  1088: { T: 1 },
  1089: { T: -1 },
  1090: { T: 1 },
  1091: { T: -1 },
  1092: { T: 1 },
  1093: { T: -1 },
  1094: { T: 1 },
  1095: { T: -1 },
  1096: {},
  1097: { T: 1 },
  1098: {},
  1099: { T: -1 },
  1100: { T: 1 },
  1101: { T: -1 },
  1102: {},
  1103: {},
  1104: {},
  1105: {},
  1111: {},
  1112: {},
  1113: { T: 1 },
  1114: { T: -1 },
  1115: { T: 1 },
  1116: { T: -1 },
  1117: {},
  1118: { T: 1 },
  1119: { T: -1 },
  1120: { T: 1 },
  1121: { T: -1 },
  1122: { T: 1 },
  1123: { T: -1 },
  1124: { T: 1 },
  1125: { T: -1 },
  1126: {},
  1128: { T: 1 },
  1129: { T: -1 },
  1130: {},
  1131: { T: 1 },
  1132: { T: -1 },
  1133: { T: 1 },
  1134: { T: -1 },
  1135: { T: 1 },
  1136: { T: -1 },
  1137: { T: 1 },
  1138: { T: -1 },
  1139: { T: 1 },
  1140: { T: -1 },
  1141: {},
  1142: { T: 1 },
  1143: { T: -1 },
  1144: { T: 1 },
  1145: { T: -1 },
  1146: {},
  1147: { T: 1 },
  1148: { T: -1 },
  1149: { T: 1 },
  1150: { T: -1 },
  1152: { T: 1 },
  1153: { T: -1 },
  1154: { T: -1 },
  1155: { T: -1 },
  1156: { T: -1 },
  1157: { T: 1 },
  1158: { T: -1 },
  1159: { T: 1 },
  1160: { T: -1 },
  1161: { T: 1 },
  1162: { T: -1 },
  1163: { T: 1 },
  1164: { T: -1 },
  1165: { T: 1 },
  1166: { T: -1 },
  1167: { T: 1 },
  1168: { T: -1 },
  1169: { T: 1 },
  1170: { T: -1 },
  1171: {},
  1172: { T: 1 },
  1173: { T: -1 },
  1177: {},
  1178: { T: 1 },
  1180: {},
  1181: {},
  1182: {},
  2048: { T: 1 },
  2049: { T: -1 },
  2050: {},
  2051: { T: 1 },
  2052: { T: -1 },
  2053: {},
  2054: {},
  2055: { T: 1 },
  2056: { T: -1 },
  2057: { T: 1 },
  2058: { T: -1 },
  2060: {},
  2067: {},
  2068: { T: 1 },
  2069: { T: -1 },
  2070: {},
  2071: {},
  2072: { T: 1 },
  2073: { T: -1 },
  2075: {},
  2076: {},
  2077: { T: 1 },
  2078: { T: -1 },
  2079: {},
  2080: { T: 1 },
  2081: { T: -1 },
  2082: {},
  2083: { T: 1 },
  2084: { T: -1 },
  2085: { T: 1 },
  2086: { T: -1 },
  2087: { T: 1 },
  2088: { T: -1 },
  2089: { T: 1 },
  2090: { T: -1 },
  2091: {},
  2092: {},
  2093: { T: 1 },
  2094: { T: -1 },
  2095: {},
  2096: { T: 1 },
  2097: { T: -1 },
  2098: { T: 1 },
  2099: { T: -1 },
  2100: { T: 1 },
  2101: { T: -1 },
  2102: {},
  2103: { T: 1 },
  2104: { T: -1 },
  2105: {},
  2106: { T: 1 },
  2107: { T: -1 },
  2108: {},
  2109: { T: 1 },
  2110: { T: -1 },
  2111: { T: 1 },
  2112: { T: -1 },
  2113: { T: 1 },
  2114: { T: -1 },
  2115: {},
  2116: {},
  2117: {},
  2118: { T: 1 },
  2119: { T: -1 },
  2120: {},
  2121: { T: 1 },
  2122: { T: -1 },
  2123: { T: 1 },
  2124: { T: -1 },
  2125: {},
  2126: { T: 1 },
  2127: { T: -1 },
  2128: {},
  2129: { T: 1 },
  2130: { T: -1 },
  2131: { T: 1 },
  2132: { T: -1 },
  2133: { T: 1 },
  2134: {},
  2135: {},
  2136: {},
  2137: { T: 1 },
  2138: { T: -1 },
  2139: { T: 1 },
  2140: { T: -1 },
  2141: {},
  3072: {},
  3073: {},
  4096: { T: 1 },
  4097: { T: -1 },
  5002: { T: 1 },
  5003: { T: -1 },
  5081: { T: 1 },
  5082: { T: -1 },
  5083: {},
  5084: { T: 1 },
  5085: { T: -1 },
  5086: { T: 1 },
  5087: { T: -1 },
  5088: {},
  5089: {},
  5090: {},
  5092: { T: 1 },
  5093: { T: -1 },
  5094: {},
  5095: { T: 1 },
  5096: { T: -1 },
  5097: {},
  5099: {},
  65535: { n: "" }
};
function J(e, t, r, n) {
  var a = t;
  if (!isNaN(a)) {
    var i = n || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), i > 0 && s0(r) && e.push(r);
  }
}
function Ix(e, t, r, n) {
  var a = n || (r || []).length || 0;
  if (a <= 8224)
    return J(e, t, r, a);
  var i = t;
  if (!isNaN(i)) {
    for (var s = r.parts || [], f = 0, l = 0, o = 0; o + (s[f] || 8224) <= 8224; )
      o += s[f] || 8224, f++;
    var c = e.next(4);
    for (c.write_shift(2, i), c.write_shift(2, o), e.push(r.slice(l, l + o)), l += o; l < a; ) {
      for (c = e.next(4), c.write_shift(2, 60), o = 0; o + (s[f] || 8224) <= 8224; )
        o += s[f] || 8224, f++;
      c.write_shift(2, o), e.push(r.slice(l, l + o)), l += o;
    }
  }
}
function Ht(e, t, r) {
  return e || (e = M(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function kx(e, t, r, n) {
  var a = M(9);
  return Ht(a, e, t), Ri(r, n || "b", a), a;
}
function Px(e, t, r) {
  var n = M(8 + 2 * r.length);
  return Ht(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function Lx(e, t, r, n) {
  if (t.v != null)
    switch (t.t) {
      case "d":
      case "n":
        var a = t.t == "d" ? Ze(Je(t.v)) : t.v;
        a == (a | 0) && a >= 0 && a < 65536 ? J(e, 2, Yl(r, n, a)) : J(e, 3, Kl(r, n, a));
        return;
      case "b":
      case "e":
        J(e, 5, kx(r, n, t.v, t.t));
        return;
      case "s":
      case "str":
        J(e, 4, Px(r, n, (t.v || "").slice(0, 255)));
        return;
    }
  J(e, 1, Ht(null, r, n));
}
function Bx(e, t, r, n) {
  var a = Array.isArray(t), i = Ee(t["!ref"] || "A1"), s, f = "", l = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF)
      throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Re(i);
  }
  for (var o = i.s.r; o <= i.e.r; ++o) {
    f = Ve(o);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      o === i.s.r && (l[c] = je(c)), s = l[c] + f;
      var u = a ? (t[o] || [])[c] : t[s];
      !u || Lx(e, u, o, c);
    }
  }
}
function Mx(e, t) {
  for (var r = t || {}, n = qe(), a = 0, i = 0; i < e.SheetNames.length; ++i)
    e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && !!r.sheet && e.SheetNames[0] != r.sheet)
    throw new Error("Sheet not found: " + r.sheet);
  return J(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, u0(e, 16, r)), Bx(n, e.Sheets[e.SheetNames[a]], a, r), J(n, 10), n.end();
}
function bx(e, t, r) {
  J(e, 49, Nl({
    sz: 12,
    color: { theme: 1 },
    name: "Arial",
    family: 2,
    scheme: "minor"
  }, r));
}
function Ux(e, t, r) {
  !t || [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a)
      t[a] != null && J(e, 1054, Pl(a, t[a], r));
  });
}
function Wx(e, t) {
  var r = M(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), J(e, 2151, r), r = M(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), Ii(Ee(t["!ref"] || "A1"), r), r.write_shift(4, 4), J(e, 2152, r);
}
function Hx(e, t) {
  for (var r = 0; r < 16; ++r)
    J(e, 224, ua({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    J(e, 224, ua(n, 0, t));
  });
}
function Vx(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    J(e, 440, Vl(n)), n[1].Tooltip && J(e, 2048, Gl(n));
  }
  delete t["!links"];
}
function Gx(e, t) {
  if (!!t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && J(e, 125, $l(Fn(a, n), a));
    });
  }
}
function Xx(e, t, r, n, a) {
  var i = 16 + Wr(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    J(e, 513, Yr(r, n, i));
    return;
  }
  if (t.bf)
    J(e, 6, d1(t, r, n, a, i));
  else
    switch (t.t) {
      case "d":
      case "n":
        var s = t.t == "d" ? Ze(Je(t.v)) : t.v;
        J(e, 515, bl(r, n, s, i));
        break;
      case "b":
      case "e":
        J(e, 517, Ml(r, n, t.v, i, a, t.t));
        break;
      case "s":
      case "str":
        if (a.bookSST) {
          var f = m0(a.Strings, t.v, a.revStrings);
          J(e, 253, Il(r, n, f, i));
        } else
          J(e, 516, kl(r, n, (t.v || "").slice(0, 255), i, a));
        break;
      default:
        J(e, 513, Yr(r, n, i));
    }
}
function jx(e, t, r) {
  var n = qe(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, l = Array.isArray(i), o = t.biff == 8, c, u = "", h = [], p = Ee(i["!ref"] || "A1"), _ = o ? 65536 : 16384;
  if (p.e.c > 255 || p.e.r >= _) {
    if (t.WTF)
      throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    p.e.c = Math.min(p.e.c, 255), p.e.r = Math.min(p.e.c, _ - 1);
  }
  J(n, 2057, u0(r, 16, t)), J(n, 13, cr(1)), J(n, 12, cr(100)), J(n, 15, Ye(!0)), J(n, 17, Ye(!1)), J(n, 16, Kr(1e-3)), J(n, 95, Ye(!0)), J(n, 42, Ye(!1)), J(n, 43, Ye(!1)), J(n, 130, cr(1)), J(n, 128, Bl([0, 0])), J(n, 131, Ye(!1)), J(n, 132, Ye(!1)), o && Gx(n, i["!cols"]), J(n, 512, Ll(p, t)), o && (i["!links"] = []);
  for (var x = p.s.r; x <= p.e.r; ++x) {
    u = Ve(x);
    for (var g = p.s.c; g <= p.e.c; ++g) {
      x === p.s.r && (h[g] = je(g)), c = h[g] + u;
      var C = l ? (i[x] || [])[g] : i[c];
      !C || (Xx(n, C, x, g, t), o && C.l && i["!links"].push([c, C.l]));
    }
  }
  var O = f.CodeName || f.name || a;
  return o && J(n, 574, Dl((s.Views || [])[0])), o && (i["!merges"] || []).length && J(n, 229, Hl(i["!merges"])), o && Vx(n, i), J(n, 442, Ni(O)), o && Wx(n, i), J(n, 10), n.end();
}
function $x(e, t, r) {
  var n = qe(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = a.WBProps || {}, f = r.biff == 8, l = r.biff == 5;
  if (J(n, 2057, u0(e, 5, r)), r.bookType == "xla" && J(n, 135), J(n, 225, f ? cr(1200) : null), J(n, 193, ml(2)), l && J(n, 191), l && J(n, 192), J(n, 226), J(n, 92, yl("SheetJS", r)), J(n, 66, cr(f ? 1200 : 1252)), f && J(n, 353, cr(0)), f && J(n, 448), J(n, 317, zl(e.SheetNames.length)), f && e.vbaraw && J(n, 211), f && e.vbaraw) {
    var o = s.CodeName || "ThisWorkbook";
    J(n, 442, Ni(o));
  }
  J(n, 156, cr(17)), J(n, 25, Ye(!1)), J(n, 18, Ye(!1)), J(n, 19, cr(0)), f && J(n, 431, Ye(!1)), f && J(n, 444, cr(0)), J(n, 61, Rl()), J(n, 64, Ye(!1)), J(n, 141, cr(0)), J(n, 34, Ye(qu(e) == "true")), J(n, 14, Ye(!0)), f && J(n, 439, Ye(!1)), J(n, 218, cr(0)), bx(n, e, r), Ux(n, e.SSF, r), Hx(n, r), f && J(n, 352, Ye(!1));
  var c = n.end(), u = qe();
  f && J(u, 140, Xl()), f && r.Strings && Ix(u, 252, Ol(r.Strings)), J(u, 10);
  var h = u.end(), p = qe(), _ = 0, x = 0;
  for (x = 0; x < e.SheetNames.length; ++x)
    _ += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[x].length;
  var g = c.length + _ + h.length;
  for (x = 0; x < e.SheetNames.length; ++x) {
    var C = i[x] || {};
    J(p, 133, Cl({ pos: g, hs: C.Hidden || 0, dt: 0, name: e.SheetNames[x] }, r)), g += t[x].length;
  }
  var O = p.end();
  if (_ != O.length)
    throw new Error("BS8 " + _ + " != " + O.length);
  var A = [];
  return c.length && A.push(c), O.length && A.push(O), h.length && A.push(h), We(A);
}
function zx(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = Qe(ye)), e && e.SSF && (Tn(), _n(e.SSF), r.revssf = En(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = [], r.Strings.Count = 0, r.Strings.Unique = 0, g0(r), r.cellXfs = [], Wr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a)
    n[n.length] = jx(a, r, e);
  return n.unshift($x(e, n, r)), We(n);
}
function as(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = sr(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return zx(e, t);
    case 4:
    case 3:
    case 2:
      return Mx(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function Kx(e, t, r, n) {
  for (var a = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
    for (var f = 0, l = 0, o = 0; o < a.length; ++o)
      if (!(a[o].s.r > r || a[o].s.c > s) && !(a[o].e.r < r || a[o].e.c < s)) {
        if (a[o].s.r < r || a[o].s.c < s) {
          f = -1;
          break;
        }
        f = a[o].e.r - a[o].s.r + 1, l = a[o].e.c - a[o].s.c + 1;
        break;
      }
    if (!(f < 0)) {
      var c = me({ r, c: s }), u = n.dense ? (e[r] || [])[s] : e[c], h = u && u.v != null && (u.h || Fo(u.w || (Nr(u), u.w) || "")) || "", p = {};
      f > 1 && (p.rowspan = f), l > 1 && (p.colspan = l), n.editable ? h = '<span contenteditable="true">' + h + "</span>" : u && (p["data-t"] = u && u.t || "z", u.v != null && (p["data-v"] = u.v), u.z != null && (p["data-z"] = u.z), u.l && (u.l.Target || "#").charAt(0) != "#" && (h = '<a href="' + u.l.Target + '">' + h + "</a>")), p.id = (n.id || "sjs") + "-" + c, i.push(Y("td", h, p));
    }
  }
  var _ = "<tr>";
  return _ + i.join("") + "</tr>";
}
var Yx = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', Jx = "</body></html>";
function qx(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function is(e, t) {
  var r = t || {}, n = r.header != null ? r.header : Yx, a = r.footer != null ? r.footer : Jx, i = [n], s = sr(e["!ref"]);
  r.dense = Array.isArray(e), i.push(qx(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f)
    i.push(Kx(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function ss(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number")
      a = n.origin;
    else {
      var s = typeof n.origin == "string" ? Pe(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), l = Math.min(n.sheetRows || 1e7, f.length), o = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = sr(e["!ref"]);
    o.s.r = Math.min(o.s.r, c.s.r), o.s.c = Math.min(o.s.c, c.s.c), o.e.r = Math.max(o.e.r, c.e.r), o.e.c = Math.max(o.e.c, c.e.c), a == -1 && (o.e.r = a = c.e.r + 1);
  }
  var u = [], h = 0, p = e["!rows"] || (e["!rows"] = []), _ = 0, x = 0, g = 0, C = 0, O = 0, A = 0;
  for (e["!cols"] || (e["!cols"] = []); _ < f.length && x < l; ++_) {
    var B = f[_];
    if (_a(B)) {
      if (n.display)
        continue;
      p[x] = { hidden: !0 };
    }
    var z = B.children;
    for (g = C = 0; g < z.length; ++g) {
      var Q = z[g];
      if (!(n.display && _a(Q))) {
        var R = Q.hasAttribute("data-v") ? Q.getAttribute("data-v") : Q.hasAttribute("v") ? Q.getAttribute("v") : Ro(Q.innerHTML), U = Q.getAttribute("data-z") || Q.getAttribute("z");
        for (h = 0; h < u.length; ++h) {
          var L = u[h];
          L.s.c == C + i && L.s.r < x + a && x + a <= L.e.r && (C = L.e.c + 1 - i, h = -1);
        }
        A = +Q.getAttribute("colspan") || 1, ((O = +Q.getAttribute("rowspan") || 1) > 1 || A > 1) && u.push({ s: { r: x + a, c: C + i }, e: { r: x + a + (O || 1) - 1, c: C + i + (A || 1) - 1 } });
        var V = { t: "s", v: R }, G = Q.getAttribute("data-t") || Q.getAttribute("t") || "";
        R != null && (R.length == 0 ? V.t = G || "z" : n.raw || R.trim().length == 0 || G == "s" || (R === "TRUE" ? V = { t: "b", v: !0 } : R === "FALSE" ? V = { t: "b", v: !1 } : isNaN(Or(R)) ? isNaN(Nt(R).getDate()) || (V = { t: "d", v: Je(R) }, n.cellDates || (V = { t: "n", v: Ze(V.v) }), V.z = n.dateNF || ye[14]) : V = { t: "n", v: Or(R) })), V.z === void 0 && U != null && (V.z = U);
        var j = "", re = Q.getElementsByTagName("A");
        if (re && re.length)
          for (var ge = 0; ge < re.length && !(re[ge].hasAttribute("href") && (j = re[ge].getAttribute("href"), j.charAt(0) != "#")); ++ge)
            ;
        j && j.charAt(0) != "#" && (V.l = { Target: j }), n.dense ? (e[x + a] || (e[x + a] = []), e[x + a][C + i] = V) : e[me({ c: C + i, r: x + a })] = V, o.e.c < C + i && (o.e.c = C + i), C += A;
      }
    }
    ++x;
  }
  return u.length && (e["!merges"] = (e["!merges"] || []).concat(u)), o.e.r = Math.max(o.e.r, x - 1 + a), e["!ref"] = Re(o), x >= l && (e["!fullref"] = Re((o.e.r = f.length - _ + x - 1 + a, o))), e;
}
function fs(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return ss(n, e, t);
}
function Zx(e, t) {
  return Jr(fs(e, t), t);
}
function _a(e) {
  var t = "", r = Qx(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function Qx(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var e2 = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + It({
    "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
    "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
    "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
    "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
    "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
    "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
    "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
    "office:version": "1.2"
  }) + ">" + e + "</office:document-styles>";
  return function() {
    return De + t;
  };
}(), Ta = /* @__PURE__ */ function() {
  var e = function(i) {
    return ve(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var l = [];
    l.push('      <table:table table:name="' + ve(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var o = 0, c = 0, u = sr(i["!ref"] || "A1"), h = i["!merges"] || [], p = 0, _ = Array.isArray(i);
    if (i["!cols"])
      for (c = 0; c <= u.e.c; ++c)
        l.push("        <table:table-column" + (i["!cols"][c] ? ' table:style-name="co' + i["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var x = "", g = i["!rows"] || [];
    for (o = 0; o < u.s.r; ++o)
      x = g[o] ? ' table:style-name="ro' + g[o].ods + '"' : "", l.push("        <table:table-row" + x + `></table:table-row>
`);
    for (; o <= u.e.r; ++o) {
      for (x = g[o] ? ' table:style-name="ro' + g[o].ods + '"' : "", l.push("        <table:table-row" + x + `>
`), c = 0; c < u.s.c; ++c)
        l.push(t);
      for (; c <= u.e.c; ++c) {
        var C = !1, O = {}, A = "";
        for (p = 0; p != h.length; ++p)
          if (!(h[p].s.c > c) && !(h[p].s.r > o) && !(h[p].e.c < c) && !(h[p].e.r < o)) {
            (h[p].s.c != c || h[p].s.r != o) && (C = !0), O["table:number-columns-spanned"] = h[p].e.c - h[p].s.c + 1, O["table:number-rows-spanned"] = h[p].e.r - h[p].s.r + 1;
            break;
          }
        if (C) {
          l.push(r);
          continue;
        }
        var B = me({ r: o, c }), z = _ ? (i[o] || [])[c] : i[B];
        if (z && z.f && (O["table:formula"] = ve(T1(z.f)), z.F && z.F.slice(0, B.length) == B)) {
          var Q = sr(z.F);
          O["table:number-matrix-columns-spanned"] = Q.e.c - Q.s.c + 1, O["table:number-matrix-rows-spanned"] = Q.e.r - Q.s.r + 1;
        }
        if (!z) {
          l.push(t);
          continue;
        }
        switch (z.t) {
          case "b":
            A = z.v ? "TRUE" : "FALSE", O["office:value-type"] = "boolean", O["office:boolean-value"] = z.v ? "true" : "false";
            break;
          case "n":
            A = z.w || String(z.v || 0), O["office:value-type"] = "float", O["office:value"] = z.v || 0;
            break;
          case "s":
          case "str":
            A = z.v == null ? "" : z.v, O["office:value-type"] = "string";
            break;
          case "d":
            A = z.w || Je(z.v).toISOString(), O["office:value-type"] = "date", O["office:date-value"] = Je(z.v).toISOString(), O["table:style-name"] = "ce1";
            break;
          default:
            l.push(t);
            continue;
        }
        var R = e(A);
        if (z.l && z.l.Target) {
          var U = z.l.Target;
          U = U.charAt(0) == "#" ? "#" + E1(U.slice(1)) : U, U.charAt(0) != "#" && !U.match(/^\w+:/) && (U = "../" + U), R = Y("text:a", R, { "xlink:href": U.replace(/&/g, "&amp;") });
        }
        l.push("          " + Y("table:table-cell", Y("text:p", R, {}), O) + `
`);
      }
      l.push(`        </table:table-row>
`);
    }
    return l.push(`      </table:table>
`), l.join("");
  }, a = function(i, s) {
    i.push(` <office:automatic-styles>
`), i.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`), i.push(`   <number:month number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:day number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:year/>
`), i.push(`  </number:date-style>
`);
    var f = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (!!o && o["!cols"]) {
        for (var c = 0; c < o["!cols"].length; ++c)
          if (o["!cols"][c]) {
            var u = o["!cols"][c];
            if (u.width == null && u.wpx == null && u.wch == null)
              continue;
            x0(u), u.ods = f;
            var h = o["!cols"][c].wpx + "px";
            i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + h + `"/>
`), i.push(`  </style:style>
`), ++f;
          }
      }
    });
    var l = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (!!o && o["!rows"]) {
        for (var c = 0; c < o["!rows"].length; ++c)
          if (o["!rows"][c]) {
            o["!rows"][c].ods = l;
            var u = o["!rows"][c].hpx + "px";
            i.push('  <style:style style:name="ro' + l + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + u + `"/>
`), i.push(`  </style:style>
`), ++l;
          }
      }
    }), i.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), i.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), i.push(`  </style:style>
`), i.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), i.push(` </office:automatic-styles>
`);
  };
  return function(s, f) {
    var l = [De], o = It({
      "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
      "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
      "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
      "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
      "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
      "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:dc": "http://purl.org/dc/elements/1.1/",
      "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
      "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
      "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
      "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
      "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
      "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
      "xmlns:math": "http://www.w3.org/1998/Math/MathML",
      "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
      "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
      "xmlns:ooo": "http://openoffice.org/2004/office",
      "xmlns:ooow": "http://openoffice.org/2004/writer",
      "xmlns:oooc": "http://openoffice.org/2004/calc",
      "xmlns:dom": "http://www.w3.org/2001/xml-events",
      "xmlns:xforms": "http://www.w3.org/2002/xforms",
      "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
      "xmlns:rpt": "http://openoffice.org/2005/report",
      "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
      "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
      "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
      "xmlns:tableooo": "http://openoffice.org/2009/table",
      "xmlns:drawooo": "http://openoffice.org/2010/draw",
      "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
      "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
      "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
      "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
      "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
      "office:version": "1.2"
    }), c = It({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (l.push("<office:document" + o + c + `>
`), l.push(wi().replace(/office:document-meta/g, "office:meta"))) : l.push("<office:document-content" + o + `>
`), a(l, s), l.push(`  <office:body>
`), l.push(`    <office:spreadsheet>
`);
    for (var u = 0; u != s.SheetNames.length; ++u)
      l.push(n(s.Sheets[s.SheetNames[u]], s, u));
    return l.push(`    </office:spreadsheet>
`), l.push(`  </office:body>
`), f.bookType == "fods" ? l.push("</office:document>") : l.push("</office:document-content>"), l.join("");
  };
}();
function os(e, t) {
  if (t.bookType == "fods")
    return Ta(e, t);
  var r = t0(), n = "", a = [], i = [];
  return n = "mimetype", le(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", le(r, n, Ta(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", le(r, n, e2(e, t)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", le(r, n, De + wi()), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", le(r, n, ul(i)), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", le(r, n, cl(a)), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function dn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function r2(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : pr(yr(e));
}
function t2(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function Ur(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function n2(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function kt(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function de(e) {
  var t = new Uint8Array(7);
  t[0] = e & 127;
  var r = 1;
  e:
    if (e > 127) {
      if (t[r - 1] |= 128, t[r] = e >> 7 & 127, ++r, e <= 16383 || (t[r - 1] |= 128, t[r] = e >> 14 & 127, ++r, e <= 2097151) || (t[r - 1] |= 128, t[r] = e >> 21 & 127, ++r, e <= 268435455) || (t[r - 1] |= 128, t[r] = e / 256 >>> 21 & 127, ++r, e <= 34359738367) || (t[r - 1] |= 128, t[r] = e / 65536 >>> 21 & 127, ++r, e <= 4398046511103))
        break e;
      t[r - 1] |= 128, t[r] = e / 16777216 >>> 21 & 127, ++r;
    }
  return t.slice(0, r);
}
function ht(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function Ne(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var n = r[0], a = kt(e, r), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, f;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var l = r[0]; e[r[0]++] >= 128; )
            ;
          f = e.slice(l, r[0]);
        }
        break;
      case 5:
        s = 4, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 1:
        s = 8, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 2:
        s = kt(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var o = { data: f, type: i };
    t[a] == null ? t[a] = [o] : t[a].push(o);
  }
  return t;
}
function Me(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      !a.data || (t.push(de(n * 8 + a.type)), a.type == 2 && t.push(de(a.data.length)), t.push(a.data));
    });
  }), Ur(t);
}
function xr(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = kt(e, n), i = Ne(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: ht(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var l = Ne(f.data), o = ht(l[3][0].data);
      s.messages.push({
        meta: l,
        data: e.slice(n[0], n[0] + o)
      }), n[0] += o;
    }), (t = i[3]) != null && t[0] && (s.merge = ht(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function nt(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: de(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: de(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: de(s.data.length) }], n[2].push({ data: Me(s.meta), type: 2 });
    });
    var i = Me(n);
    t.push(de(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), Ur(t);
}
function a2(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = kt(t, r), a = []; r[0] < t.length; ) {
    var i = t[r[0]] & 3;
    if (i == 0) {
      var s = t[r[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var f = s - 59;
        s = t[r[0]], f > 1 && (s |= t[r[0] + 1] << 8), f > 2 && (s |= t[r[0] + 2] << 16), f > 3 && (s |= t[r[0] + 3] << 24), s >>>= 0, s++, r[0] += f;
      }
      a.push(t.slice(r[0], r[0] + s)), r[0] += s;
      continue;
    } else {
      var l = 0, o = 0;
      if (i == 1 ? (o = (t[r[0]] >> 2 & 7) + 4, l = (t[r[0]++] & 224) << 3, l |= t[r[0]++]) : (o = (t[r[0]++] >> 2) + 1, i == 2 ? (l = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (l = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [Ur(a)], l == 0)
        throw new Error("Invalid offset 0");
      if (l > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (o >= l)
        for (a.push(a[0].slice(-l)), o -= l; o >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), o -= a[a.length - 1].length;
      a.push(a[0].slice(-l, -l + o));
    }
  }
  var c = Ur(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function dr(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(a2(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return Ur(t);
}
function at(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = de(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return Ur(t);
}
function Wn(e, t) {
  var r = new Uint8Array(32), n = dn(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, n2(r, a, e.v), i |= 1, a += 16;
      break;
    case "b":
      r[1] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 2, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[1] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 8, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(8, i, !0), r.slice(0, a);
}
function Hn(e, t) {
  var r = new Uint8Array(32), n = dn(r), a = 12, i = 0;
  switch (r[0] = 3, e.t) {
    case "n":
      r[2] = 2, n.setFloat64(a, e.v, !0), i |= 32, a += 8;
      break;
    case "b":
      r[2] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 32, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[2] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 16, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(4, i, !0), r.slice(0, a);
}
function kr(e) {
  var t = Ne(e);
  return kt(t[1][0].data);
}
function i2(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && ht(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var l = 0, o = dn(e[7][0].data), c = 0, u = [], h = dn(e[4][0].data), p = 0, _ = [], x = 0; x < t.length; ++x) {
    if (t[x] == null) {
      o.setUint16(x * 2, 65535, !0), h.setUint16(x * 2, 65535);
      continue;
    }
    o.setUint16(x * 2, c, !0), h.setUint16(x * 2, p, !0);
    var g, C;
    switch (typeof t[x]) {
      case "string":
        g = Wn({ t: "s", v: t[x] }, r), C = Hn({ t: "s", v: t[x] }, r);
        break;
      case "number":
        g = Wn({ t: "n", v: t[x] }, r), C = Hn({ t: "n", v: t[x] }, r);
        break;
      case "boolean":
        g = Wn({ t: "b", v: t[x] }, r), C = Hn({ t: "b", v: t[x] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[x]);
    }
    u.push(g), c += g.length, _.push(C), p += C.length, ++l;
  }
  for (e[2][0].data = de(l); x < e[7][0].data.length / 2; ++x)
    o.setUint16(x * 2, 65535, !0), h.setUint16(x * 2, 65535, !0);
  return e[6][0].data = Ur(u), e[3][0].data = Ur(_), l;
}
function s2(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = sr(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Re(n)));
  var i = pn(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(P) {
    return P.forEach(function(y) {
      typeof y == "string" && s.push(y);
    });
  });
  var f = {}, l = [], o = _e.read(t.numbers, { type: "base64" });
  o.FileIndex.map(function(P, y) {
    return [P, o.FullPaths[y]];
  }).forEach(function(P) {
    var y = P[0], F = P[1];
    if (y.type == 2 && !!y.name.match(/\.iwa/)) {
      var H = y.content, ie = dr(H), se = xr(ie);
      se.forEach(function(ae) {
        l.push(ae.id), f[ae.id] = { deps: [], location: F, type: ht(ae.messages[0].meta[1][0].data) };
      });
    }
  }), l.sort(function(P, y) {
    return P - y;
  });
  var c = l.filter(function(P) {
    return P > 1;
  }).map(function(P) {
    return [P, de(P)];
  });
  o.FileIndex.map(function(P, y) {
    return [P, o.FullPaths[y]];
  }).forEach(function(P) {
    var y = P[0];
    if (P[1], !!y.name.match(/\.iwa/)) {
      var F = xr(dr(y.content));
      F.forEach(function(H) {
        H.messages.forEach(function(ie) {
          c.forEach(function(se) {
            H.messages.some(function(ae) {
              return ht(ae.meta[1][0].data) != 11006 && t2(ae.data, se[1]);
            }) && f[se[0]].deps.push(H.id);
          });
        });
      });
    }
  });
  for (var u = _e.find(o, f[1].location), h = xr(dr(u.content)), p, _ = 0; _ < h.length; ++_) {
    var x = h[_];
    x.id == 1 && (p = x);
  }
  var g = kr(Ne(p.messages[0].data)[1][0].data);
  for (u = _e.find(o, f[g].location), h = xr(dr(u.content)), _ = 0; _ < h.length; ++_)
    x = h[_], x.id == g && (p = x);
  for (g = kr(Ne(p.messages[0].data)[2][0].data), u = _e.find(o, f[g].location), h = xr(dr(u.content)), _ = 0; _ < h.length; ++_)
    x = h[_], x.id == g && (p = x);
  for (g = kr(Ne(p.messages[0].data)[2][0].data), u = _e.find(o, f[g].location), h = xr(dr(u.content)), _ = 0; _ < h.length; ++_)
    x = h[_], x.id == g && (p = x);
  var C = Ne(p.messages[0].data);
  {
    C[6][0].data = de(n.e.r + 1), C[7][0].data = de(n.e.c + 1);
    var O = kr(C[46][0].data), A = _e.find(o, f[O].location), B = xr(dr(A.content));
    {
      for (var z = 0; z < B.length && B[z].id != O; ++z)
        ;
      if (B[z].id != O)
        throw "Bad ColumnRowUIDMapArchive";
      var Q = Ne(B[z].messages[0].data);
      Q[1] = [], Q[2] = [], Q[3] = [];
      for (var R = 0; R <= n.e.c; ++R) {
        var U = [];
        U[1] = U[2] = [{ type: 0, data: de(R + 420690) }], Q[1].push({ type: 2, data: Me(U) }), Q[2].push({ type: 0, data: de(R) }), Q[3].push({ type: 0, data: de(R) });
      }
      Q[4] = [], Q[5] = [], Q[6] = [];
      for (var L = 0; L <= n.e.r; ++L)
        U = [], U[1] = U[2] = [{ type: 0, data: de(L + 726270) }], Q[4].push({ type: 2, data: Me(U) }), Q[5].push({ type: 0, data: de(L) }), Q[6].push({ type: 0, data: de(L) });
      B[z].messages[0].data = Me(Q);
    }
    A.content = at(nt(B)), A.size = A.content.length, delete C[46];
    var V = Ne(C[4][0].data);
    {
      V[7][0].data = de(n.e.r + 1);
      var G = Ne(V[1][0].data), j = kr(G[2][0].data);
      A = _e.find(o, f[j].location), B = xr(dr(A.content));
      {
        if (B[0].id != j)
          throw "Bad HeaderStorageBucket";
        var re = Ne(B[0].messages[0].data);
        for (L = 0; L < i.length; ++L) {
          var ge = Ne(re[2][0].data);
          ge[1][0].data = de(L), ge[4][0].data = de(i[L].length), re[2][L] = { type: re[2][0].type, data: Me(ge) };
        }
        B[0].messages[0].data = Me(re);
      }
      A.content = at(nt(B)), A.size = A.content.length;
      var oe = kr(V[2][0].data);
      A = _e.find(o, f[oe].location), B = xr(dr(A.content));
      {
        if (B[0].id != oe)
          throw "Bad HeaderStorageBucket";
        for (re = Ne(B[0].messages[0].data), R = 0; R <= n.e.c; ++R)
          ge = Ne(re[2][0].data), ge[1][0].data = de(R), ge[4][0].data = de(n.e.r + 1), re[2][R] = { type: re[2][0].type, data: Me(ge) };
        B[0].messages[0].data = Me(re);
      }
      A.content = at(nt(B)), A.size = A.content.length;
      var Be = kr(V[4][0].data);
      (function() {
        for (var P = _e.find(o, f[Be].location), y = xr(dr(P.content)), F, H = 0; H < y.length; ++H) {
          var ie = y[H];
          ie.id == Be && (F = ie);
        }
        var se = Ne(F.messages[0].data);
        {
          se[3] = [];
          var ae = [];
          s.forEach(function(ce, ze) {
            ae[1] = [{ type: 0, data: de(ze) }], ae[2] = [{ type: 0, data: de(1) }], ae[3] = [{ type: 2, data: r2(ce) }], se[3].push({ type: 2, data: Me(ae) });
          });
        }
        F.messages[0].data = Me(se);
        var Z = nt(y), Te = at(Z);
        P.content = Te, P.size = P.content.length;
      })();
      var Ce = Ne(V[3][0].data);
      {
        var ur = Ce[1][0];
        delete Ce[2];
        var Ie = Ne(ur.data);
        {
          var fr = kr(Ie[2][0].data);
          (function() {
            for (var P = _e.find(o, f[fr].location), y = xr(dr(P.content)), F, H = 0; H < y.length; ++H) {
              var ie = y[H];
              ie.id == fr && (F = ie);
            }
            var se = Ne(F.messages[0].data);
            {
              delete se[6], delete Ce[7];
              var ae = new Uint8Array(se[5][0].data);
              se[5] = [];
              for (var Z = 0, Te = 0; Te <= n.e.r; ++Te) {
                var ce = Ne(ae);
                Z += i2(ce, i[Te], s), ce[1][0].data = de(Te), se[5].push({ data: Me(ce), type: 2 });
              }
              se[1] = [{ type: 0, data: de(n.e.c + 1) }], se[2] = [{ type: 0, data: de(n.e.r + 1) }], se[3] = [{ type: 0, data: de(Z) }], se[4] = [{ type: 0, data: de(n.e.r + 1) }];
            }
            F.messages[0].data = Me(se);
            var ze = nt(y), xe = at(ze);
            P.content = xe, P.size = P.content.length;
          })();
        }
        ur.data = Me(Ie);
      }
      V[3][0].data = Me(Ce);
    }
    C[4][0].data = Me(V);
  }
  p.messages[0].data = Me(C);
  var er = nt(h), S = at(er);
  return u.content = S, u.size = u.content.length, o;
}
function f2(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function g0(e) {
  f2([
    ["cellDates", !1],
    ["bookSST", !1],
    ["bookType", "xlsx"],
    ["compression", !1],
    ["WTF", !1]
  ])(e);
}
function o2(e, t) {
  return t.bookType == "ods" ? os(e, t) : t.bookType == "numbers" ? s2(e, t) : t.bookType == "xlsb" ? l2(e, t) : c2(e, t);
}
function l2(e, t) {
  ft = 1024, e && !e.SSF && (e.SSF = Qe(ye)), e && e.SSF && (Tn(), _n(e.SSF), t.revssf = En(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = [], t.Strings.Count = 0, t.Strings.Unique = 0, Ot ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = Xi.indexOf(t.bookType) > -1, a = _i();
  g0(t = t || {});
  var i = t0(), s = "", f = 0;
  if (t.cellXfs = [], Wr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", le(i, s, Si(e.Props, t)), a.coreprops.push(s), pe(t.rels, 2, s, he.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var l = [], o = 0; o < e.SheetNames.length; ++o)
        (e.Workbook.Sheets[o] || {}).Hidden != 2 && l.push(e.SheetNames[o]);
      e.Props.SheetNames = l;
    }
  for (e.Props.Worksheets = e.Props.SheetNames.length, le(i, s, Fi(e.Props)), a.extprops.push(s), pe(t.rels, 3, s, he.EXT_PROPS), e.Custprops !== e.Props && Ge(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", le(i, s, yi(e.Custprops)), a.custprops.push(s), pe(t.rels, 4, s, he.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var c = { "!id": {} }, u = e.Sheets[e.SheetNames[f - 1]], h = (u || {})["!type"] || "sheet";
    switch (h) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, le(i, s, ux(f - 1, s, t, e, c)), a.sheets.push(s), pe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, he.WS[0]);
    }
    if (u) {
      var p = u["!comments"], _ = !1, x = "";
      p && p.length > 0 && (x = "xl/comments" + f + "." + r, le(i, x, px(p, x)), a.comments.push(x), pe(c, -1, "../comments" + f + "." + r, he.CMNT), _ = !0), u["!legacy"] && _ && le(i, "xl/drawings/vmlDrawing" + f + ".vml", Vi(f, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    c["!id"].rId1 && le(i, Ei(s), lt(c));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, le(i, s, dx(t.Strings, s, t)), a.strs.push(s), pe(t.wbrels, -1, "sharedStrings." + r, he.SST)), s = "xl/workbook." + r, le(i, s, hx(e, s)), a.workbooks.push(s), pe(t.rels, 1, s, he.WB), s = "xl/theme/theme1.xml", le(i, s, Wi(e.Themes, t)), a.themes.push(s), pe(t.wbrels, -1, "theme/theme1.xml", he.THEME), s = "xl/styles." + r, le(i, s, xx(e, s, t)), a.styles.push(s), pe(t.wbrels, -1, "styles." + r, he.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", le(i, s, e.vbaraw), a.vba.push(s), pe(t.wbrels, -1, "vbaProject.bin", he.VBA)), s = "xl/metadata." + r, le(i, s, vx(s)), a.metadata.push(s), pe(t.wbrels, -1, "metadata." + r, he.XLMETA), le(i, "[Content_Types].xml", Ti(a, t)), le(i, "_rels/.rels", lt(t.rels)), le(i, "xl/_rels/workbook." + r + ".rels", lt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function c2(e, t) {
  ft = 1024, e && !e.SSF && (e.SSF = Qe(ye)), e && e.SSF && (Tn(), _n(e.SSF), t.revssf = En(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = [], t.Strings.Count = 0, t.Strings.Unique = 0, Ot ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = Xi.indexOf(t.bookType) > -1, a = _i();
  g0(t = t || {});
  var i = t0(), s = "", f = 0;
  if (t.cellXfs = [], Wr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", le(i, s, Si(e.Props, t)), a.coreprops.push(s), pe(t.rels, 2, s, he.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var l = [], o = 0; o < e.SheetNames.length; ++o)
        (e.Workbook.Sheets[o] || {}).Hidden != 2 && l.push(e.SheetNames[o]);
      e.Props.SheetNames = l;
    }
  e.Props.Worksheets = e.Props.SheetNames.length, le(i, s, Fi(e.Props)), a.extprops.push(s), pe(t.rels, 3, s, he.EXT_PROPS), e.Custprops !== e.Props && Ge(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", le(i, s, yi(e.Custprops)), a.custprops.push(s), pe(t.rels, 4, s, he.CUST_PROPS));
  var c = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var u = { "!id": {} }, h = e.Sheets[e.SheetNames[f - 1]], p = (h || {})["!type"] || "sheet";
    switch (p) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, le(i, s, Qi(f - 1, t, e, u)), a.sheets.push(s), pe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, he.WS[0]);
    }
    if (h) {
      var _ = h["!comments"], x = !1, g = "";
      if (_ && _.length > 0) {
        var C = !1;
        _.forEach(function(O) {
          O[1].forEach(function(A) {
            A.T == !0 && (C = !0);
          });
        }), C && (g = "xl/threadedComments/threadedComment" + f + "." + r, le(i, g, Hc(_, c, t)), a.threadedcomments.push(g), pe(u, -1, "../threadedComments/threadedComment" + f + "." + r, he.TCMNT)), g = "xl/comments" + f + "." + r, le(i, g, Gi(_)), a.comments.push(g), pe(u, -1, "../comments" + f + "." + r, he.CMNT), x = !0;
      }
      h["!legacy"] && x && le(i, "xl/drawings/vmlDrawing" + f + ".vml", Vi(f, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    u["!id"].rId1 && le(i, Ei(s), lt(u));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, le(i, s, Pi(t.Strings, t)), a.strs.push(s), pe(t.wbrels, -1, "sharedStrings." + r, he.SST)), s = "xl/workbook." + r, le(i, s, ts(e)), a.workbooks.push(s), pe(t.rels, 1, s, he.WB), s = "xl/theme/theme1.xml", le(i, s, Wi(e.Themes, t)), a.themes.push(s), pe(t.wbrels, -1, "theme/theme1.xml", he.THEME), s = "xl/styles." + r, le(i, s, bi(e, t)), a.styles.push(s), pe(t.wbrels, -1, "styles." + r, he.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", le(i, s, e.vbaraw), a.vba.push(s), pe(t.wbrels, -1, "vbaProject.bin", he.VBA)), s = "xl/metadata." + r, le(i, s, Hi()), a.metadata.push(s), pe(t.wbrels, -1, "metadata." + r, he.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", le(i, s, Vc(c)), a.people.push(s), pe(t.wbrels, -1, "persons/person.xml", he.PEOPLE)), le(i, "[Content_Types].xml", Ti(a, t)), le(i, "_rels/.rels", lt(t.rels)), le(i, "xl/_rels/workbook." + r + ".rels", lt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function h2(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Dr(e.slice(0, 12));
      break;
    case "binary":
      r = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (t && t.type || "undefined"));
  }
  return [r.charCodeAt(0), r.charCodeAt(1), r.charCodeAt(2), r.charCodeAt(3), r.charCodeAt(4), r.charCodeAt(5), r.charCodeAt(6), r.charCodeAt(7)];
}
function ls(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return Mt(t.file, _e.write(e, { type: ue ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return _e.write(e, t);
}
function u2(e, t) {
  var r = Qe(t || {}), n = o2(e, r);
  return x2(n, r);
}
function x2(e, t) {
  var r = {}, n = ue ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (t.compression && (r.compression = "DEFLATE"), t.password)
    r.type = n;
  else
    switch (t.type) {
      case "base64":
        r.type = "base64";
        break;
      case "binary":
        r.type = "string";
        break;
      case "string":
        throw new Error("'string' output type invalid for '" + t.bookType + "' files");
      case "buffer":
      case "file":
        r.type = n;
        break;
      default:
        throw new Error("Unrecognized type " + t.type);
    }
  var a = e.FullPaths ? _e.write(e, { fileType: "zip", type: { nodebuffer: "buffer", string: "binary" }[r.type] || r.type, compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64")
      return a;
    a = new Uint8Array(gn(a));
  }
  return t.password && typeof encrypt_agile < "u" ? ls(encrypt_agile(a, t.password), t) : t.type === "file" ? Mt(t.file, a) : t.type == "string" ? At(a) : a;
}
function d2(e, t) {
  var r = t || {}, n = Dx(e, r);
  return ls(n, r);
}
function Er(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return Dt(yr(n));
    case "binary":
      return yr(n);
    case "string":
      return e;
    case "file":
      return Mt(t.file, n, "utf8");
    case "buffer":
      return ue ? Ir(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Er(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function p2(e, t) {
  switch (t.type) {
    case "base64":
      return Dt(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return Mt(t.file, e, "binary");
    case "buffer":
      return ue ? Ir(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function qt(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n)
        r += String.fromCharCode(e[n]);
      return t.type == "base64" ? Dt(r) : t.type == "string" ? At(r) : r;
    case "file":
      return Mt(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function cs(e, t) {
  Hf(), ex(e);
  var r = Qe(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = cs(e, r);
    return r.type = "array", gn(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Er(Ox(e, r), r);
    case "slk":
    case "sylk":
      return Er(ql.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return Er(is(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return p2(hs(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return Er(_0(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return Er(Zl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return qt(Jl.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return Er(Ql.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return Er(sc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return Er(ki.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return Er(os(e, r), r);
    case "wk1":
      return qt(xa.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return qt(xa.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), qt(as(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), d2(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return u2(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function v2(e, t, r, n, a, i, s, f) {
  var l = Ve(r), o = f.defval, c = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), u = !0, h = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty)
      try {
        Object.defineProperty(h, "__rowNum__", { value: r, enumerable: !1 });
      } catch {
        h.__rowNum__ = r;
      }
    else
      h.__rowNum__ = r;
  if (!s || e[r])
    for (var p = t.s.c; p <= t.e.c; ++p) {
      var _ = s ? e[r][p] : e[n[p] + l];
      if (_ === void 0 || _.t === void 0) {
        if (o === void 0)
          continue;
        i[p] != null && (h[i[p]] = o);
        continue;
      }
      var x = _.v;
      switch (_.t) {
        case "z":
          if (x == null)
            break;
          continue;
        case "e":
          x = x == 0 ? null : void 0;
          break;
        case "s":
        case "d":
        case "b":
        case "n":
          break;
        default:
          throw new Error("unrecognized type " + _.t);
      }
      if (i[p] != null) {
        if (x == null)
          if (_.t == "e" && x === null)
            h[i[p]] = null;
          else if (o !== void 0)
            h[i[p]] = o;
          else if (c && x === null)
            h[i[p]] = null;
          else
            continue;
        else
          h[i[p]] = c && (_.t !== "n" || _.t === "n" && f.rawNumbers !== !1) ? x : Nr(_, x, f);
        x != null && (u = !1);
      }
    }
  return { row: h, isempty: u };
}
function pn(e, t) {
  if (e == null || e["!ref"] == null)
    return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", l = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, o = t || {}, c = o.range != null ? o.range : e["!ref"];
  switch (o.header === 1 ? n = 1 : o.header === "A" ? n = 2 : Array.isArray(o.header) ? n = 3 : o.header == null && (n = 0), typeof c) {
    case "string":
      l = Ee(c);
      break;
    case "number":
      l = Ee(e["!ref"]), l.s.r = c;
      break;
    default:
      l = c;
  }
  n > 0 && (a = 0);
  var u = Ve(l.s.r), h = [], p = [], _ = 0, x = 0, g = Array.isArray(e), C = l.s.r, O = 0, A = {};
  g && !e[C] && (e[C] = []);
  var B = o.skipHidden && e["!cols"] || [], z = o.skipHidden && e["!rows"] || [];
  for (O = l.s.c; O <= l.e.c; ++O)
    if (!(B[O] || {}).hidden)
      switch (h[O] = je(O), r = g ? e[C][O] : e[h[O] + u], n) {
        case 1:
          i[O] = O - l.s.c;
          break;
        case 2:
          i[O] = h[O];
          break;
        case 3:
          i[O] = o.header[O - l.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Nr(r, null, o), x = A[s] || 0, !x)
            A[s] = 1;
          else {
            do
              f = s + "_" + x++;
            while (A[f]);
            A[s] = x, A[f] = 1;
          }
          i[O] = f;
      }
  for (C = l.s.r + a; C <= l.e.r; ++C)
    if (!(z[C] || {}).hidden) {
      var Q = v2(e, l, C, h, n, i, g, o);
      (Q.isempty === !1 || (n === 1 ? o.blankrows !== !1 : !!o.blankrows)) && (p[_++] = Q.row);
    }
  return p.length = _, p;
}
var Ea = /"/g;
function m2(e, t, r, n, a, i, s, f) {
  for (var l = !0, o = [], c = "", u = Ve(r), h = t.s.c; h <= t.e.c; ++h)
    if (!!n[h]) {
      var p = f.dense ? (e[r] || [])[h] : e[n[h] + u];
      if (p == null)
        c = "";
      else if (p.v != null) {
        l = !1, c = "" + (f.rawNumbers && p.t == "n" ? p.v : Nr(p, null, f));
        for (var _ = 0, x = 0; _ !== c.length; ++_)
          if ((x = c.charCodeAt(_)) === a || x === i || x === 34 || f.forceQuotes) {
            c = '"' + c.replace(Ea, '""') + '"';
            break;
          }
        c == "ID" && (c = '"ID"');
      } else
        p.f != null && !p.F ? (l = !1, c = "=" + p.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(Ea, '""') + '"')) : c = "";
      o.push(c);
    }
  return f.blankrows === !1 && l ? null : o.join(s);
}
function _0(e, t) {
  var r = [], n = t == null ? {} : t;
  if (e == null || e["!ref"] == null)
    return "";
  var a = Ee(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, l = f.charCodeAt(0), o = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", u = [];
  n.dense = Array.isArray(e);
  for (var h = n.skipHidden && e["!cols"] || [], p = n.skipHidden && e["!rows"] || [], _ = a.s.c; _ <= a.e.c; ++_)
    (h[_] || {}).hidden || (u[_] = je(_));
  for (var x = 0, g = a.s.r; g <= a.e.r; ++g)
    (p[g] || {}).hidden || (c = m2(e, a, g, u, s, l, i, n), c != null && (n.strip && (c = c.replace(o, "")), (c || n.blankrows !== !1) && r.push((x++ ? f : "") + c)));
  return delete n.dense, r.join("");
}
function hs(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = _0(e, t);
  return r;
}
function g2(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null)
    return [];
  var a = Ee(e["!ref"]), i = "", s = [], f, l = [], o = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f)
    s[f] = je(f);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = Ve(c), f = a.s.c; f <= a.e.c; ++f)
      if (t = s[f] + i, r = o ? (e[c] || [])[f] : e[t], n = "", r !== void 0) {
        if (r.F != null) {
          if (t = r.F, !r.f)
            continue;
          n = r.f, t.indexOf(":") == -1 && (t = t + ":" + t);
        }
        if (r.f != null)
          n = r.f;
        else {
          if (r.t == "z")
            continue;
          if (r.t == "n" && r.v != null)
            n = "" + r.v;
          else if (r.t == "b")
            n = r.v ? "TRUE" : "FALSE";
          else if (r.w !== void 0)
            n = "'" + r.w;
          else {
            if (r.v === void 0)
              continue;
            r.t == "s" ? n = "'" + r.v : n = "" + r.v;
          }
        }
        l[l.length] = t + "=" + n;
      }
  return l;
}
function us(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var l = typeof n.origin == "string" ? Pe(n.origin) : n.origin;
      s = l.r, f = l.c;
    }
  var o, c = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var u = Ee(i["!ref"]);
    c.e.c = Math.max(c.e.c, u.e.c), c.e.r = Math.max(c.e.r, u.e.r), s == -1 && (s = u.e.r + 1, c.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = t.length - 1 + a);
  var h = n.header || [], p = 0;
  t.forEach(function(x, g) {
    Ge(x).forEach(function(C) {
      (p = h.indexOf(C)) == -1 && (h[p = h.length] = C);
      var O = x[C], A = "z", B = "", z = me({ c: f + p, r: s + g + a });
      o = Pt(i, z), O && typeof O == "object" && !(O instanceof Date) ? i[z] = O : (typeof O == "number" ? A = "n" : typeof O == "boolean" ? A = "b" : typeof O == "string" ? A = "s" : O instanceof Date ? (A = "d", n.cellDates || (A = "n", O = Ze(O)), B = n.dateNF || ye[14]) : O === null && n.nullError && (A = "e", O = 0), o ? (o.t = A, o.v = O, delete o.w, delete o.R, B && (o.z = B)) : i[z] = o = { t: A, v: O }, B && (o.z = B));
    });
  }), c.e.c = Math.max(c.e.c, f + h.length - 1);
  var _ = Ve(s);
  if (a)
    for (p = 0; p < h.length; ++p)
      i[je(p + f) + _] = { t: "s", v: h[p] };
  return i["!ref"] = Re(c), i;
}
function _2(e, t) {
  return us(null, e, t);
}
function Pt(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = Pe(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Pt(e, me(t)) : Pt(e, me({ r: t, c: r || 0 }));
}
function T2(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t)
      return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1)
      return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else
    throw new Error("Cannot find sheet |" + t + "|");
}
function E2() {
  return { SheetNames: [], Sheets: {} };
}
function w2(e, t, r, n) {
  var a = 1;
  if (!r)
    for (; a <= 65535 && e.SheetNames.indexOf(r = "Sheet" + a) != -1; ++a, r = void 0)
      ;
  if (!r || e.SheetNames.length >= 65535)
    throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || r;
    for (++a; a <= 65535 && e.SheetNames.indexOf(r = s + a) != -1; ++a)
      ;
  }
  if (rs(r), e.SheetNames.indexOf(r) >= 0)
    throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function S2(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = T2(e, t);
  switch (e.Workbook.Sheets[n] || (e.Workbook.Sheets[n] = {}), r) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + r);
  }
  e.Workbook.Sheets[n].Hidden = r;
}
function A2(e, t) {
  return e.z = t, e;
}
function xs(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function F2(e, t, r) {
  return xs(e, "#" + t, r);
}
function y2(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function C2(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Ee(t), i = typeof t == "string" ? t : Re(t), s = a.s.r; s <= a.e.r; ++s)
    for (var f = a.s.c; f <= a.e.c; ++f) {
      var l = Pt(e, s, f);
      l.t = "n", l.F = i, delete l.v, s == a.s.r && f == a.s.c && (l.f = r, n && (l.D = !0));
    }
  return e;
}
var wa = {
  encode_col: je,
  encode_row: Ve,
  encode_cell: me,
  encode_range: Re,
  decode_col: o0,
  decode_row: f0,
  split_cell: Go,
  decode_cell: Pe,
  decode_range: sr,
  format_cell: Nr,
  sheet_add_aoa: xi,
  sheet_add_json: us,
  sheet_add_dom: ss,
  aoa_to_sheet: dt,
  json_to_sheet: _2,
  table_to_sheet: fs,
  table_to_book: Zx,
  sheet_to_csv: _0,
  sheet_to_txt: hs,
  sheet_to_json: pn,
  sheet_to_html: is,
  sheet_to_formulae: g2,
  sheet_to_row_object_array: pn,
  sheet_get_cell: Pt,
  book_new: E2,
  book_append_sheet: w2,
  book_set_sheet_visibility: S2,
  cell_set_number_format: A2,
  cell_set_hyperlink: xs,
  cell_set_internal_link: F2,
  cell_add_comment: y2,
  sheet_set_array_formula: C2,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function O2(e) {
  const t = {}, r = {
    s: {
      c: 1e7,
      r: 1e7
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (let n = 0; n != e.length; ++n)
    for (let a = 0; a != e[n].length; ++a) {
      r.s.r > n && (r.s.r = n), r.s.c > a && (r.s.c = a), r.e.r < n && (r.e.r = n), r.e.c < a && (r.e.c = a);
      const i = {
        v: e[n][a]
      };
      if (i.v == null)
        continue;
      const s = wa.encode_cell({
        c: a,
        r: n
      });
      typeof i.v == "number" ? i.t = "n" : typeof i.v == "boolean" ? i.t = "b" : i.t = "s", t[s] = i;
    }
  return r.s.c < 1e7 && (t["!ref"] = wa.encode_range(r)), t;
}
class R2 {
  constructor() {
    Nn(this, "SheetNames", []);
    Nn(this, "Sheets", {});
  }
}
const D2 = (e) => {
  const t = new ArrayBuffer(e.length), r = new Uint8Array(t);
  for (let n = 0; n < e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}, N2 = ({ header: e, data: t, filename: r }) => {
  t = st(t), t.unshift(e);
  const n = "SheetJS", a = new R2(), i = O2(t), s = t.map((o) => o.map((c) => c == null ? {
    wch: 10
  } : c.toString().charCodeAt(0) > 255 ? {
    wch: c.toString().length * 2
  } : {
    wch: c.toString().length
  }));
  let f = s[0];
  for (let o = 1; o < s.length; o++)
    for (let c = 0; c < s[o].length; c++)
      f[c].wch < s[o][c].wch && (f[c].wch = s[o][c].wch);
  i["!cols"] = f, a.SheetNames.push(n), a.Sheets[n] = i;
  const l = cs(a, {
    bookType: "xlsx",
    bookSST: !1,
    type: "binary"
  });
  ka.exports.saveAs(
    new Blob([D2(l)], {
      type: "application/octet-stream"
    }),
    `${r}.xlsx`
  );
}, V2 = async ({ filename: e, tableHead: t, tableData: r }) => {
  const n = (l) => {
    let o = /<\/?.+?\/?>/g;
    return o.test(l) ? l.replace(o, "") : l;
  }, a = async (l, o) => {
    const c = [];
    for (const u of o) {
      const h = [];
      for (const p of l) {
        let _ = u[p.prop];
        if (p.render) {
          const x = p.render(u);
          x && Array.isArray(x.children) && x.children.length > 1 && x.children.forEach((g) => {
            g && typeof g.children == "string" && (g.children += `
`);
          }), _ = await Ia(x);
        }
        _ = n(_), h.push(_);
      }
      c.push(h);
    }
    return c;
  }, i = t.filter((l) => !l.only_display), s = i.map((l) => l.label), f = Ks({
    lock: !0,
    text: "\u6570\u636E\u5BFC\u51FA\u4E2D...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  return new Promise((l) => {
    setTimeout(async () => {
      const o = await a(i, r);
      await N2({
        header: s,
        data: o,
        filename: e
      }), f.close(), Ys.success("\u5BFC\u51FA\u6210\u529F\uFF01"), l(!0);
    }, 500);
  });
};
export {
  U2 as YoungDialog,
  b2 as YoungPagination,
  W2 as YoungSelect,
  M2 as YoungTable,
  Zs as useAutoLoad,
  V2 as useExport2Excel,
  H2 as useFormMode
};
//# sourceMappingURL=index.es.js.map