var Us = Object.defineProperty;
var Hs = (e, t, r) => t in e ? Us(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Un = (e, t, r) => (Hs(e, typeof t != "symbol" ? t + "" : t, r), r);
import { defineComponent as or, onMounted as Ia, ref as ue, onActivated as Na, nextTick as Br, watchEffect as gt, createVNode as X, mergeProps as Le, Fragment as Wr, createTextVNode as Ur, isVNode as Gt, computed as Bt, watch as Yn, Teleport as Ws, reactive as Vs, TransitionGroup as Gs, initDirectivesForSSR as Xs, createApp as js, ssrContextKey as Pa, warn as fn, Static as $s, Comment as zs, Text as Ks, ssrUtils as La, render as Ys } from "vue";
import { deepClone as fr, randomId as yn, recentDay as qs, isArray as Js } from "@bluesyoung/utils";
import { ElTable as Ba, ElTableColumn as ln, ElTooltip as on, ElPopover as Zs, ElCheckboxGroup as Ma, ElCheckbox as ba, ElPagination as Qs, ElDialog as ef, ElButton as vt, ElMessageBox as t0, ElSelect as rf, ElOption as tf, ElTimeSelect as b0, ElTimePicker as nf, ElDatePicker as af, ElImageViewer as sf, ElForm as ff, ElInput as lf, ElInputNumber as of, ElFormItem as cf, ElOverlay as uf, ElSwitch as hf, ElDrawer as xf, ElMessage as qn, ElLoadingService as df } from "element-plus";
import { useEventListener as n0, useWindowSize as pf, useMediaQuery as vf, useLocalStorage as mf, useIntersectionObserver as gf } from "@vueuse/core";
import { makeMap as _f, isPromise as a0, isFunction as Tf, NOOP as U0, isString as _t, escapeHtmlComment as Ef, escapeHtml as Hr, isVoidTag as wf, isOn as Sf, isSVGTag as Af, propsToAttrMap as yf, isBooleanAttr as Ff, includeBooleanAttr as Cf, isSSRSafeAttrName as Of, normalizeClass as Df, normalizeStyle as Rf, stringifyStyle as kf, isArray as If } from "@vue/shared";
function Nf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Gt(e);
}
const ld = or({
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
      type: [Number, String],
      default: "100%"
    },
    selectable: {
      type: Boolean,
      default: !1
    },
    rowDraggable: {
      type: Boolean,
      default: !1
    },
    enableCustomHead: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["row-drag-change"],
  setup(e, {
    emit: t,
    attrs: r,
    slots: n
  }) {
    Ia(async () => {
      if (e.rowDraggable) {
        const {
          default: l
        } = await import("sortablejs");
        if (e.rowDraggable) {
          const c = a.value.$el.querySelector("tbody");
          c.style.cursor = "move", new l(c, {
            animation: 150,
            onEnd: ({
              oldIndex: h,
              newIndex: u
            }) => {
              if (h === u)
                return;
              const d = f.value, _ = fr(d[h]);
              d.splice(h, 1), d.splice(u, 0, _), t("row-drag-change", f.value);
            }
          });
        }
      }
    });
    const a = ue();
    Na(() => {
      Br(() => {
        a.value.doLayout();
      });
    });
    const i = ue([]), s = ue([]), f = ue([]);
    gt(() => {
      const l = e.tableData, c = e.tableHead, h = l.length;
      Br(() => {
        s.value = c.filter((d) => !d.only_export);
        const u = 50;
        if (h <= u)
          i.value = fr(l), f.value = fr(l);
        else {
          const {
            elArr: d,
            load: _
          } = W0(i, ue(l), u), {
            elArr: x,
            load: m
          } = W0(f, ue(l), u);
          let O = 0;
          i.value = l.slice(O, u), f.value = l.slice(O, u), Br(() => {
            d.value = a.value.$el.querySelector("tbody").children, _();
          }), Br(() => {
            x.value = a.value.$el.querySelector("tbody").children, m();
          });
        }
      });
    });
    const o = (l) => {
      s.value = e.tableHead.filter((c) => !c.only_export && l.includes(c.prop));
    };
    return () => X("div", {
      style: {
        position: "relative"
      }
    }, [X(Ba, Le(r, {
      ref: a,
      data: i.value,
      style: {
        width: "100%"
      },
      height: e.tableHeight
    }), {
      default: () => {
        var l, c;
        return [e.selectable && X(ln, {
          type: "selection",
          width: "55"
        }, null), s.value.map((h, u) => X(ln, {
          key: u,
          prop: h.prop,
          label: h.label,
          width: h.width || "",
          sortable: h.sortable || !1,
          fixed: h.fixed || !1,
          align: h.aligin || "left",
          showOverflowTooltip: h.show_overflow_tooltip ?? !0
        }, {
          header: (d) => s.value[u].tool_content ? X("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }, [X("span", null, [d.column.label]), X(on, {
            placement: "bottom"
          }, {
            default: () => [X("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "1.2em",
              height: "1.2em",
              viewBox: "0 0 256 256"
            }, [X("path", {
              fill: "currentColor",
              d: "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
            }, null)])],
            content: () => s.value[u].tool_content
          })]) : X("span", null, [d.column.label]),
          default: (d) => h.render ? h.render(d.row, d.$index) : X("span", null, [d.row[h.prop]])
        })), (l = n.switch) == null ? void 0 : l.call(n), (c = n.operate) == null ? void 0 : c.call(n)];
      }
    }), e.enableCustomHead && X(Zs, {
      trigger: "click",
      placement: "bottom-end",
      width: 200
    }, {
      reference: () => X("div", {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          cursor: "pointer"
        },
        title: "表头配置"
      }, [X("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.5rem",
        height: "1.5rem",
        viewBox: "0 0 24 24"
      }, [X("path", {
        fill: "currentColor",
        d: "M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
      }, null)])]),
      default: () => {
        let l;
        return X(Wr, null, [X("div", {
          style: {
            marginBottom: "10px",
            textAlign: "center",
            fontWeight: "bold"
          }
        }, [Ur("自定义展示的表头")]), X(Ma, {
          style: {
            maxHeight: "350px",
            overflowY: "auto"
          },
          modelValue: s.value.map((c) => c.prop),
          "onUpdate:modelValue": o
        }, Nf(l = e.tableHead.filter((c) => !c.only_export).map((c, h) => (
          // @ts-ignore
          X(ba, {
            label: c.prop,
            key: h,
            title: c.label
          }, {
            default: () => [c.label]
          })
        ))) ? l : {
          default: () => [l]
        })]);
      }
    })]);
  }
}), Hn = {
  type: Number,
  required: !0
}, od = or({
  props: {
    total: Hn,
    page: Hn,
    limit: Hn,
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
    return () => X(Qs, Le({
      style: {
        background: "white",
        paddingTop: "20px",
        display: "flex",
        flexWrap: "wrap"
      }
    }, r, {
      background: e.background,
      currentPage: e.page,
      pageSize: e.limit,
      layout: e.layout,
      pageSizes: e.pageSizes,
      total: e.total,
      "onUpdate:page-size": (i) => n(i),
      "onUpdate:current-page": (i) => a(i)
    }), null);
  }
}), cd = or({
  props: {
    modelValue: Boolean,
    realTitle: String,
    sureText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
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
    sureFn: Function,
    /**
     * 对比 form 表单
     */
    diffForm: {
      type: Object,
      default: null
    }
  },
  emits: ["sure", "clear", "update:modelValue"],
  setup(e, {
    emit: t,
    attrs: r,
    slots: n
  }) {
    const a = ue(""), i = Bt(() => {
      let l = "新建";
      return e.isEdit && (l = "编辑"), e.isMore && (l = "详情"), l;
    }), s = Bt({
      get: () => e.isAdd || e.isMore || e.isEdit,
      set: (l) => null
    });
    e.diffForm && Yn(() => s.value, (l, c) => {
      l && !c && (a.value = JSON.stringify(e.diffForm));
    }), e.diffForm && Yn(() => e.modelValue, (l, c) => {
      l && !c && (a.value = JSON.stringify(e.diffForm));
    });
    const f = async () => {
      if (!(e.sureFn && await e.sureFn() === !1)) {
        if (e.isMore) {
          t("clear");
          return;
        }
        t("update:modelValue", !1), t("sure");
      }
    }, o = () => {
      const l = JSON.stringify(e.diffForm);
      if (e.isMore || !e.showCancel) {
        t("clear"), t("update:modelValue", !1);
        return;
      }
      if (e.diffForm && a.value === l) {
        t("clear"), t("update:modelValue", !1);
        return;
      } else
        t0.confirm("数据未保存，关闭将丢失数据，确认关闭？", "提示").then(() => {
          t("update:modelValue", !1), t("clear");
        }).catch(() => null);
    };
    return () => X(Ws, {
      to: "body"
    }, {
      default: () => [X(ef, Le(r, {
        modelValue: e.modelValue || s.value,
        title: e.realTitle || i.value,
        closeOnClickModal: !0,
        closeOnPressEscape: !1,
        beforeClose: o
      }), {
        default: () => {
          var l;
          return (l = n.body) == null ? void 0 : l.call(n);
        },
        footer: () => {
          var l, c, h;
          return X(Wr, null, [(l = n.button) == null ? void 0 : l.call(n), e.showCancel && X(vt, {
            onClick: () => o()
          }, {
            default: () => [e.cancelText]
          }), (c = n.step1) == null ? void 0 : c.call(n), (h = n.step2) == null ? void 0 : h.call(n), e.showSure && X(vt, {
            type: "primary",
            onClick: () => f()
          }, {
            default: () => [e.sureText]
          })]);
        }
      })]
    });
  }
});
function Pf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Gt(e);
}
const Lf = or({
  props: {
    modelValue: {
      type: [String, Number, Array],
      required: !1
    },
    options: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = yn();
    return () => {
      let a;
      return X(rf, Le({
        modelValue: e.modelValue,
        "onUpdate:modelValue": (i) => {
          r("update:modelValue", i), r("change", i);
        }
      }, t), Pf(a = e.options.map((i, s) => X(tf, Le(i, {
        key: s + n
      }), null))) ? a : {
        default: () => [a]
      });
    };
  }
});
function H0(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Gt(e);
}
const Bf = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], ud = or({
  props: {
    modelValue: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:modelValue"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = yn();
    return () => {
      let a;
      return X(Ma, Le(t, {
        modelValue: e.modelValue,
        onChange: (i) => r("update:modelValue", i)
      }), H0(a = Bf.map((i, s) => X(ba, {
        label: s + 1,
        key: s + n
      }, H0(i) ? i : {
        default: () => [i]
      }))) ? a : {
        default: () => [a]
      });
    };
  }
}), hd = or({
  props: {
    start: {
      type: String,
      required: !0
    },
    end: {
      type: String,
      required: !0
    },
    startTime: {
      type: String,
      default: "00:00"
    },
    endTime: {
      type: String,
      default: "23:59"
    },
    step: {
      type: String,
      default: "00:01"
    },
    /**
     * 是否精确到秒
     */
    second: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:start", "update:end"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = ue();
    gt(() => {
      e.start && e.end ? n.value = [new Date(`2022 02 02 ${e.start}`), new Date(`2022 02 02 ${e.end}`)] : n.value = void 0;
    });
    const a = (i) => {
      var s, f;
      if (!i)
        r("update:start", ""), r("update:end", "");
      else {
        const [o, l] = i;
        r("update:start", ((s = o.toLocaleString().match(/\d\d:\d\d:\d\d/)) == null ? void 0 : s[0]) ?? ""), r("update:end", ((f = l.toLocaleString().match(/\d\d:\d\d:\d\d/)) == null ? void 0 : f[0]) ?? "");
      }
    };
    return () => e.second ? X(nf, Le(t, {
      modelValue: n.value,
      isRange: !0,
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      "onUpdate:modelValue": a
    }), null) : X(Wr, null, [X(b0, Le(t, {
      modelValue: e.start,
      class: "w-120px mr-2",
      maxTime: e.end,
      placeholder: "开始时间",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (i) => r("update:start", i)
    }), null), Ur("-  "), X(b0, Le(t, {
      modelValue: e.end,
      class: "w-120px",
      minTime: e.start,
      placeholder: "结束时间",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (i) => r("update:end", i)
    }), null)]);
  }
}), Mf = [{
  text: "今天",
  value: (() => {
    const e = new Date(), t = new Date();
    return t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "昨天",
  value: (() => {
    const e = new Date(), t = new Date();
    return e.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), t.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "本周",
  value: (() => {
    const e = new Date(), t = new Date();
    var r = t.getDay() || 7;
    return t.setDate(t.getDate() - r + 1), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "上周",
  value: (() => {
    const e = new Date(), t = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), r = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), n = t.getDay(), a = t.getDate() - n + (n === 0 ? -6 : 1), i = new Date(t.setDate(a)), s = new Date(r.setDate(a + 6));
    return i.setHours(0, 0, 0), s.setHours(23, 59, 59), [i, s];
  })()
}, {
  text: "本月",
  value: (() => {
    const e = new Date(), t = new Date();
    return e.setDate(1), e.setHours(0, 0, 0), t.setHours(23, 59, 59), [e, t];
  })()
}, {
  text: "上月",
  value: (() => {
    const t = new Date(), r = new Date(t.getFullYear(), t.getMonth() - 1, 1), a = new Date(t.getFullYear(), t.getMonth(), 1).getTime() - 1 * 864e5, i = new Date(a);
    return r.setHours(0, 0, 0), i.setHours(23, 59, 59), [r, i];
  })()
}, {
  text: "最近7天",
  value: (() => {
    const e = new Date(), t = new Date();
    return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 6), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "最近30天",
  value: (() => {
    const e = new Date(), t = new Date();
    return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 30), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}], bf = or({
  props: {
    start: {
      type: [String, Number],
      default: ""
    },
    end: {
      type: [String, Number],
      default: ""
    },
    unix: {
      type: Boolean,
      default: !1
    },
    /**
     * 是否精确到秒
     */
    second: {
      type: Boolean,
      default: !1
    },
    /**
     * 是否展示快捷选项
     * @cond1 传入 true，使用默认的快捷选项
     * @cond2 传入数组，使用数组作为快捷选项
     */
    shortcuts: {
      type: [Boolean, Array],
      default: !1
    }
  },
  emits: ["update:start", "update:end", "change"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = ue();
    gt(() => {
      e.start && e.end ? e.unix ? n.value = [new Date(+e.start * 1e3), new Date(+e.end * 1e3)] : n.value = [new Date(e.start), new Date(e.end)] : n.value = null;
    });
    const a = (i) => {
      if (!i)
        r("update:start", void 0), r("update:end", void 0), n.value = null;
      else {
        const [s, f] = i;
        e.unix ? (r("update:start", Math.floor(s.getTime() / 1e3)), r("update:end", Math.floor(f.getTime() / 1e3))) : (r("update:start", s.getTime()), r("update:end", f.getTime()));
      }
    };
    return () => X(af, Le(t, {
      modelValue: n.value,
      type: e.second ? "datetimerange" : "daterange",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      "default-time": qs(),
      shortcuts: e.shortcuts ? Js(e.shortcuts) ? e.shortcuts : Mf : void 0,
      clearable: !0,
      "onUpdate:modelValue": (i) => a(i),
      onChange: () => r("change")
    }), null);
  }
}), Uf = or({
  props: {
    onDestroy: {
      type: Function,
      default: () => console.log("为了节省性能，此时应该销毁dom")
    },
    zIndex: {
      type: Number,
      default: 9999
    }
  },
  setup(e, {
    expose: t
  }) {
    const r = ue(!1), n = Vs({
      srcList: [],
      index: 0,
      zIndex: e.zIndex
    });
    function a(l) {
      if (l.ctrlKey) {
        if (l.deltaY < 0)
          return l.preventDefault(), !1;
        if (l.deltaY > 0)
          return l.preventDefault(), !1;
      }
    }
    const i = n0("wheel", a, {
      passive: !1
    });
    let s;
    function f(l) {
      n.srcList = l.srcList, n.index = l.index ?? 0, s = document.body.style.overflow, document.body.style.overflow = "hidden", r.value = !0;
    }
    function o() {
      i(), document.body.style.overflow = s, r.value = !1, e.onDestroy();
    }
    return t({
      show: f,
      close: o
    }), () => r.value && X(sf, {
      zIndex: n.zIndex,
      initialIndex: n.index,
      urlList: n.srcList,
      hideOnClickModal: !0,
      onClose: o
    }, null);
  }
});
function Hf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Gt(e);
}
const xd = or({
  props: {
    modelValue: Object,
    searchScheme: Object,
    fastSearch: {
      type: Boolean,
      default: !0
    },
    onSearch: {
      type: Function,
      default: () => console.log("---表单元素触发请求---")
    },
    onReset: {
      type: Function,
      default: () => console.log("---触发重置请求---")
    },
    dateTimeKey: {
      type: Array,
      default: () => ["startcreatetime", "endcreatetime"]
    }
  },
  emits: ["update:modelValue"],
  setup(e, {
    attrs: t,
    emit: r,
    slots: n
  }) {
    const a = ue({});
    Yn(() => e.modelValue, (o) => {
      a.value = fr(o);
    }, {
      immediate: !0,
      deep: !0
    });
    const i = (o = !0) => {
      r("update:modelValue", {
        ...a.value
      }), e.fastSearch && o && e.onSearch();
    }, s = (o) => {
      const l = e.searchScheme[o];
      l.attrs || (l.attrs = {});
      const c = (x, m) => m ? X(cf, {
        label: l.tip
      }, Hf(x) ? x : {
        default: () => [x]
      }) : x, [h, u] = e.dateTimeKey, _ = {
        input: () => c(X(lf, Le({
          modelValue: a.value[o],
          "onUpdate:modelValue": (x) => {
            var m;
            return a.value[o] = (m = x == null ? void 0 : x.trim) == null ? void 0 : m.call(x);
          },
          onChange: () => i(!1),
          onKeyup: (x) => rd(x, () => i())
        }, l.attrs), null), l.tip),
        number: (x) => c(X(of, Le({
          modelValue: a.value[x],
          "onUpdate:modelValue": (m) => a.value[x] = m,
          onChange: () => i(),
          style: {
            width: "120px"
          }
        }, l.attrs), null), l.tip),
        select: (x) => c(X(Lf, Le({
          modelValue: a.value[x],
          options: l.options || [],
          "onUpdate:modelValue": (m) => a.value[x] = m,
          onChange: () => i()
        }, l.attrs), null), l.tip),
        // ! 时间范围选择，通常全局只有一个
        datetimerange: (x) => c(X(bf, Le({
          start: a.value[h],
          end: a.value[u],
          "onUpdate:start": (m) => {
            a.value[h] = m;
          },
          "onUpdate:end": (m) => {
            a.value[u] = m;
          },
          onChange: i
        }, l.attrs), null), l.tip),
        custom: (x) => c(l.render(), l.tip)
      }[l.type];
      if (_)
        return _(o);
      throw new Error("unknown search form type");
    }, f = yn();
    return () => X("div", Le({
      style: {
        maxWidth: "100%",
        margin: "auto",
        padding: "20px"
      }
    }, t), [X(ff, {
      model: e.modelValue
    }, {
      default: () => {
        var o, l;
        return [X("div", {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 20px"
          }
        }, [Object.keys(e.searchScheme).map((c, h) => X("div", {
          key: h + f
        }, [s(c)])), X("div", null, [(o = n.custom) == null ? void 0 : o.call(n)])]), X("div", {
          style: {
            display: "flex"
          }
        }, [X(vt, {
          type: "primary",
          onClick: () => e.onSearch()
        }, {
          default: () => [Ur("搜索")]
        }), X(vt, {
          onClick: () => e.onReset()
        }, {
          default: () => [Ur("重置")]
        }), (l = n.btns) == null ? void 0 : l.call(n)])];
      }
    })]);
  }
}), Wf = "https://g2021-cdn.laiyouxi.com/image/21Store/laiyouxi_guid/website/landscape.png", dd = or({
  props: {
    maxWidth: {
      type: Number,
      default: 768
    }
  },
  setup(e, {
    attrs: t
  }) {
    const r = ue(), n = ue(!1), a = () => n.value = !0, i = () => n.value = !1, {
      width: s,
      height: f
    } = pf(), o = Bt(() => s.value < f.value || s.value < e.maxWidth);
    return gt(() => {
      o.value ? a() : i();
    }), n0(r, "animationend", (l) => {
      i();
    }), () => X(Wr, null, [n.value && X(uf, Le({
      mask: !0,
      style: {
        width: "100vw",
        height: "100vh"
      }
    }, t), {
      default: () => [X("div", {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }
      }, [X("style", null, [`
                @keyframes rotate {
                  from {
                    transform: rotate(0);
                  }
                
                  to {
                    transform: rotate(90deg);
                  }
                }
                .rotate-tip {
                  width: 200px;
                  animation-name: rotate;
                  animation-iteration-count: 6;
                  animation-duration: 1s;
                  animation-direction: alternate;
                  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }
                `]), X("img", {
        ref: r,
        src: Wf,
        class: "rotate-tip"
      }, null), X("div", {
        style: {
          color: "white",
          marginTop: "2.5rem",
          fontSize: "1.25rem",
          lineHeight: "1.75rem"
        }
      }, [Ur("为了更好的用户体验，请横屏使用")])])]
    })]);
  }
});
function Vf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Gt(e);
}
const Gf = or({
  props: {
    list: {
      required: !0,
      type: Object
    }
  },
  emits: ["drag-end", "change"],
  setup(e, {
    emit: t
  }) {
    const r = ue(!1), n = ue(!1);
    let a = -1, i;
    function s(h) {
      a = h;
    }
    function f(h, u) {
      h.preventDefault(), i !== null && clearTimeout(i), n.value = !0, i = setTimeout(() => {
        if (a !== u) {
          const d = e.list[a];
          e.list.splice(a, 1), e.list.splice(u, 0, d), a = u;
        }
        n.value = !1;
      }, 100);
    }
    function o() {
      n.value ? setTimeout(() => {
        o();
      }, 100) : t("drag-end", e.list);
    }
    function l(h, u) {
      h.preventDefault();
    }
    function c(h) {
      t("change", h, !h.check);
    }
    return () => {
      let h;
      return X("div", null, [X("style", null, [`
          .young-drag-list {
            list-style: none;
          }
          
          .young-drag-list-item {
            transition: transform .3s;
            cursor: move;
            border-radius: 4px;
            color: #333;
            height: 36px;
            line-height: 36px;
            text-align: center;
            display: flex;
            align-items: center;
          }
          
          .young-drag-list-item:hover {
            background: #eee;
          }
          
          .young-drag-list-item.active {
            color: #409eff !important;
          }
          
          .young-drag-list-item .label {
            text-align: left;
            cursor: pointer;
            flex: 1;
            padding: 0 12px 0 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            /* 显示省略号 */
          }
          
          .young-drag-list-item .draggable {
            text-align: center;
            display: flex;
            align-items: center;
            padding: 0 12px;
            height: 100%;
          }
          `]), X(Gs, null, Vf(h = e.list.map((u, d) => X("div", {
        class: `young-drag-list-item ${u.check ? "active" : ""}`,
        key: u.label,
        onDragstart: () => s(d),
        onDragenter: (_) => f(_, d),
        onDragover: (_) => l(_),
        onDragend: o,
        draggable: r.value
      }, [X("div", {
        class: "draggable",
        title: "拖动可排序",
        onMouseover: () => r.value = !0,
        onMouseout: () => r.value = !1
      }, [X("svg", {
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "6483",
        width: "16",
        height: "16"
      }, [X("path", {
        d: "M867.995 459.647h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
        "p-id": "6484"
      }, null), X("path", {
        d: "M867.995 763.291h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
        "p-id": "6485"
      }, null), X("path", {
        d: "M156.005 260.709h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353z",
        "p-id": "6486"
      }, null)])]), X("div", {
        class: "label",
        onClick: (_) => {
          _.stopPropagation(), c(u);
        },
        title: u.label,
        style: {
          display: "flex",
          justifyContent: "space-between"
        }
      }, [X("span", null, [u.label]), X(hf, {
        modelValue: u.check
      }, null)])]))) ? h : {
        default: () => [h]
      })]);
    };
  }
}), Xf = or({
  props: {
    tableHead: {
      required: !0,
      type: Object
    }
  },
  emits: ["drag-end", "change", "save", "reset"],
  setup(e, {
    emit: t
  }) {
    const r = ue(!1), n = (s) => {
      t("drag-end", s);
    }, a = (s, f) => {
      t("change", s, f);
    };
    Ia(() => {
      n0("click", (s) => {
        r.value = !1;
      });
    });
    const i = vf("(max-width: 639.9px)");
    return () => X(Wr, null, [X("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: "10px",
        cursor: "pointer"
      },
      onClick: (s) => {
        s.stopPropagation(), r.value = !0;
      },
      title: "表头配置"
    }, [X("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1.5rem",
      height: "1.5rem",
      viewBox: "0 0 24 24"
    }, [X("path", {
      fill: "currentColor",
      d: "M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
    }, null)])]), X(xf, {
      modelValue: r.value,
      withHeader: !1,
      "onUpdate:modelValue": (s) => r.value = s,
      size: i.value ? "75%" : "30%"
    }, {
      default: () => X(Wr, null, [X("div", {
        style: {
          color: "#999",
          textAlign: "center",
          padding: "10px"
        }
      }, [Ur("拖动可排序，点击可以切换展示状态")]), X(Gf, {
        list: e.tableHead,
        "onDrag-end": n,
        onChange: a
      }, null)]),
      footer: () => X("div", {
        style: {
          textAlign: "left"
        }
      }, [X(on, {
        content: "保存配置到本地，如果不保存，则页面刷新之后会丢失现有的个性化配置"
      }, {
        default: () => [X(vt, {
          type: "primary",
          onClick: () => t("save")
        }, {
          default: () => [Ur("保存")]
        })]
      }), X(on, {
        content: "快速恢复默认配置"
      }, {
        default: () => [X(vt, {
          onClick: () => t("reset")
        }, {
          default: () => [Ur("重置")]
        })]
      })])
    })]);
  }
}), pd = or({
  props: {
    tableData: {
      type: Object,
      required: !0
    },
    tableHead: {
      type: Object,
      required: !0
    },
    /**
     * 默认勾选表头
     */
    tableHeadCheck: {
      type: Object,
      required: !1
    },
    tableHeight: {
      type: [Number, String],
      default: "100%"
    },
    selectable: {
      type: Boolean,
      default: !1
    },
    /**
     * 是否开启保存表头格式按钮
     */
    saveTableHead: {
      type: Boolean,
      default: !0
    },
    /**
     * 使用历史保存的表头 没有历史表头使用默认勾选表头
     */
    history: {
      type: Boolean,
      default: !0
    },
    /**
     * 存储历史id
     */
    historyId: {
      type: String,
      default: location.href.replace(location.origin, "")
    }
  },
  setup(e, {
    emit: t,
    attrs: r,
    expose: n
  }) {
    const a = ue();
    Na(() => {
      Br(() => {
        a.value.doLayout();
      });
    });
    const i = ue([]), s = ue([]), f = ue([]);
    gt(() => {
      i.value = e.tableData, Br(() => {
        l();
      });
    });
    const o = mf(`table_pro_tableHead_${e.historyId}`, {}), l = () => {
      var A, y;
      e.history ? (s.value = ((A = o.value) == null ? void 0 : A.tableHead) ?? [], f.value = ((y = o.value) == null ? void 0 : y.tableHeadCheck) ?? [], f.value.length === 0 && c()) : c();
    }, c = () => {
      var A;
      s.value = fr(e.tableHead), f.value = (A = e.tableHeadCheck) != null && A.length ? fr(e.tableHeadCheck) : e.tableHead.map((y) => y.prop);
    }, h = Bt(() => s.value.map((A) => (A.check = f.value.includes(A.prop), A))), u = Bt(() => h.value.filter((A) => A.check)), d = (A, y) => {
      const N = f.value.findIndex((j) => j === A.prop);
      !y && N != -1 ? f.value.splice(N, 1) : f.value.push(A.prop);
    }, _ = (A) => {
      s.value = A;
    }, x = () => {
      o.value = {
        tableHead: h.value,
        tableHeadCheck: f.value
      }, qn.success("保存成功");
    }, m = () => {
      t0.confirm("确定重置表头吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        o.value = {}, qn.success("重置成功"), Br(() => {
          l();
        });
      });
    }, O = yn();
    return n({
      saveTableHead: x,
      resetTableHead: m
    }), () => X(Wr, null, [X("style", null, [`
          .nowarp {
            word-break: normal;
          }
          `]), X("div", null, [e.saveTableHead && X(Xf, {
      tableHead: h.value,
      "onDrag-end": _,
      onChange: d,
      onSave: x,
      onReset: m
    }, null), X("div", {
      style: "position: relative;"
    }, [X(Ba, Le({
      ref: a,
      "header-cell-class-name": "nowarp",
      data: i.value,
      style: {
        width: "100%"
      },
      height: e.tableHeight,
      border: !0
    }, r), {
      default: () => [e.selectable && X(ln, {
        type: "selection",
        width: "55"
      }, null), u.value.map((A, y) => X(ln, {
        key: A.prop.toString() + y + O,
        prop: A.prop,
        label: A.label,
        width: A.width || "",
        sortable: A.sortable || !1,
        fixed: A.fixed || !1,
        align: A.aligin || "left",
        showOverflowTooltip: A.show_overflow_tooltip ?? !0
      }, {
        header: (N) => s.value[y].tool_content ? X("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }, [X("span", {
          class: "nowarp",
          title: A.label
        }, [N.column.label]), X(on, {
          placement: "bottom"
        }, {
          default: () => [X("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "1.2em",
            height: "1.2em",
            viewBox: "0 0 256 256"
          }, [X("path", {
            fill: "currentColor",
            d: "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
          }, null)])],
          content: () => s.value[y].tool_content
        })]) : X("span", {
          class: "nowarp",
          title: A.label
        }, [N.column.label]),
        default: ({
          row: N,
          $index: j
        }) => A.render ? A.render(N, j) : X("span", null, [N[A.prop]])
      }))]
    })])])]);
  }
}), W0 = (e, t, r = 10, n = ue(!1)) => {
  const a = ue([]), i = ue(!1), s = ue(1), f = () => {
    const { stop: o } = gf(
      a.value[e.value.length - 1],
      ([{ isIntersecting: l }]) => {
        l && (i.value = l, o());
      }
    );
  };
  return gt(async () => {
    if (!n.value && i.value) {
      if (e.value.length === t.value.length)
        return;
      s.value++;
      const o = t.value.slice(r * (s.value - 1), r * s.value);
      if (o.length === 0)
        return;
      e.value.push(...o), i.value = !1, await Br(), f();
    }
  }), {
    elArr: a,
    touchEndEl: i,
    page: s,
    load: f
  };
}, vd = (e, { addCbk: t, modCbk: r, delCbk: n, cpEffect: a, cgEffect: i, clearEffect: s, disableclear: f }, o = "确认删除该条数据？") => {
  const l = ue(!1), c = ue(!1), h = ue(!1), u = ue(fr(e)), d = ue(), _ = async () => await new Promise((j) => {
    var ee;
    (ee = d.value) == null || ee.validate(async (D) => {
      D && j(!0);
    }).catch((D) => {
      j(!1);
    });
  }), x = () => {
    l.value = !1, c.value = !1, h.value = !1, s == null || s(), u.value = fr(e);
  };
  return {
    isAdd: l,
    isEdit: c,
    isMore: h,
    clear: x,
    edit: async (N) => {
      const j = await (a == null ? void 0 : a(N));
      u.value = fr(j || N), c.value = !0;
    },
    more: async (N) => {
      const j = await (a == null ? void 0 : a(N));
      u.value = fr(j || N), h.value = !0;
    },
    form: u,
    del: (N) => {
      t0.confirm(o, "提示", {
        type: "warning"
      }).then(async () => {
        await (n == null ? void 0 : n(N)), i == null || i();
      }).catch(() => null);
    },
    sure: async () => {
      if (l.value) {
        if (await (t == null ? void 0 : t()) === !1)
          return;
      } else if (await (r == null ? void 0 : r()) === !1)
        return;
      !f && x(), i == null || i();
    },
    formRef: d,
    validForm: _
  };
}, jf = _f(",key,ref,innerHTML,textContent,ref_key,ref_for");
function $f(e, t) {
  let r = "";
  for (const n in e) {
    if (jf(n) || Sf(n) || t === "textarea" && n === "value")
      continue;
    const a = e[n];
    n === "class" ? r += ` class="${Yf(a)}"` : n === "style" ? r += ` style="${qf(a)}"` : r += zf(n, a, t);
  }
  return r;
}
function zf(e, t, r) {
  if (!Kf(t))
    return "";
  const n = r && (r.indexOf("-") > 0 || Af(r)) ? e : yf[e] || e.toLowerCase();
  return Ff(n) ? Cf(t) ? ` ${n}` : "" : Of(n) ? t === "" ? ` ${n}` : ` ${n}="${Hr(t)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${n}`), "");
}
function Kf(e) {
  if (e == null)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean";
}
function Yf(e) {
  return Hr(Df(e));
}
function qf(e) {
  if (!e)
    return "";
  if (_t(e))
    return Hr(e);
  const t = Rf(e);
  return Hr(kf(t));
}
function Jf(e, t) {
  throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
}
function Zf(e, t, r, n, a) {
  e("<!--teleport start-->");
  const i = a.appContext.provides[Pa], s = i.__teleportBuffers || (i.__teleportBuffers = {}), f = s[r] || (s[r] = []), o = f.length;
  let l;
  if (n)
    t(e), l = "<!--teleport anchor-->";
  else {
    const { getBuffer: c, push: h } = Ua();
    t(h), h("<!--teleport anchor-->"), l = c();
  }
  f.splice(o, 0, l), e("<!--teleport end-->");
}
const { createComponentInstance: Qf, setCurrentRenderingInstance: V0, setupComponent: el, renderComponentRoot: G0, normalizeVNode: rl } = La;
function Ua() {
  let e = !1;
  const t = [];
  return {
    getBuffer() {
      return t;
    },
    push(r) {
      const n = _t(r);
      e && n ? t[t.length - 1] += r : t.push(r), e = n, (a0(r) || If(r) && r.hasAsync) && (t.hasAsync = !0);
    }
  };
}
function Ha(e, t = null, r) {
  const n = Qf(e, t, null), a = el(
    n,
    !0
    /* isSSR */
  ), i = a0(a), s = n.sp;
  if (i || s) {
    let f = i ? a : Promise.resolve();
    return s && (f = f.then(() => Promise.all(s.map((o) => o.call(n.proxy)))).catch(() => {
    })), f.then(() => X0(n, r));
  } else
    return X0(n, r);
}
function X0(e, t) {
  const r = e.type, { getBuffer: n, push: a } = Ua();
  if (Tf(r)) {
    let i = G0(e);
    if (!r.props)
      for (const s in e.attrs)
        s.startsWith("data-v-") && ((i.props || (i.props = {}))[s] = "");
    cn(a, e.subTree = i, e, t);
  } else {
    (!e.render || e.render === U0) && !e.ssrRender && !r.ssrRender && _t(r.template) && (r.ssrRender = Jf(r.template));
    for (const s of e.scope.effects)
      s.computed && (s.computed._cacheable = !0);
    const i = e.ssrRender || r.ssrRender;
    if (i) {
      let s = e.inheritAttrs !== !1 ? e.attrs : void 0, f = !1, o = e;
      for (; ; ) {
        const c = o.vnode.scopeId;
        c && (f || (s = { ...s }, f = !0), s[c] = "");
        const h = o.parent;
        if (h && h.subTree && h.subTree === o.vnode)
          o = h;
        else
          break;
      }
      t && (f || (s = { ...s }), s[t.trim()] = "");
      const l = V0(e);
      try {
        i(
          e.proxy,
          a,
          e,
          s,
          // compiler-optimized bindings
          e.props,
          e.setupState,
          e.data,
          e.ctx
        );
      } finally {
        V0(l);
      }
    } else if (e.render && e.render !== U0)
      cn(a, e.subTree = G0(e), e, t);
    else {
      const s = r.name || r.__file || "<Anonymous>";
      fn(`Component ${s} is missing template or render function.`), a("<!---->");
    }
  }
  return n();
}
function cn(e, t, r, n) {
  const { type: a, shapeFlag: i, children: s } = t;
  switch (a) {
    case Ks:
      e(Hr(s));
      break;
    case zs:
      e(s ? `<!--${Ef(s)}-->` : "<!---->");
      break;
    case $s:
      e(s);
      break;
    case Wr:
      t.slotScopeIds && (n = (n ? n + " " : "") + t.slotScopeIds.join(" ")), e("<!--[-->"), i0(e, s, r, n), e("<!--]-->");
      break;
    default:
      i & 1 ? tl(e, t, r, n) : i & 6 ? e(Ha(t, r, n)) : i & 64 ? al(e, t, r, n) : i & 128 ? cn(e, t.ssContent, r, n) : fn("[@vue/server-renderer] Invalid VNode type:", a, `(${typeof a})`);
  }
}
function i0(e, t, r, n) {
  for (let a = 0; a < t.length; a++)
    cn(e, rl(t[a]), r, n);
}
function tl(e, t, r, n) {
  const a = t.type;
  let { props: i, children: s, shapeFlag: f, scopeId: o, dirs: l } = t, c = `<${a}`;
  l && (i = nl(t, i, l)), i && (c += $f(i, a)), o && (c += ` ${o}`);
  let h = r, u = t;
  for (; h && u === h.subTree; )
    u = h.vnode, u.scopeId && (c += ` ${u.scopeId}`), h = h.parent;
  if (n && (c += ` ${n}`), e(c + ">"), !wf(a)) {
    let d = !1;
    i && (i.innerHTML ? (d = !0, e(i.innerHTML)) : i.textContent ? (d = !0, e(Hr(i.textContent))) : a === "textarea" && i.value && (d = !0, e(Hr(i.value)))), d || (f & 8 ? e(Hr(s)) : f & 16 && i0(e, s, r, n)), e(`</${a}>`);
  }
}
function nl(e, t, r) {
  const n = [];
  for (let a = 0; a < r.length; a++) {
    const i = r[a], { dir: { getSSRProps: s } } = i;
    if (s) {
      const f = s(i, e);
      f && n.push(f);
    }
  }
  return Le(t || {}, ...n);
}
function al(e, t, r, n) {
  const a = t.props && t.props.to, i = t.props && t.props.disabled;
  if (!a)
    return i || fn("[@vue/server-renderer] Teleport is missing target prop."), [];
  if (!_t(a))
    return fn("[@vue/server-renderer] Teleport target must be a query selector string."), [];
  Zf(e, (s) => {
    i0(s, t.children, r, n);
  }, a, i || i === "", r);
}
const { isVNode: il } = La;
async function s0(e) {
  if (e.hasAsync) {
    let t = "";
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      a0(n) && (n = await n), _t(n) ? t += n : t += await s0(n);
    }
    return t;
  } else
    return Wa(e);
}
function Wa(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    let n = e[r];
    _t(n) ? t += n : t += Wa(n);
  }
  return t;
}
async function Va(e, t = {}) {
  if (il(e))
    return Va(js({ render: () => e }), t);
  const r = X(e._component, e._props);
  r.appContext = e._context, e.provide(Pa, t);
  const n = await Ha(r), a = await s0(n);
  if (await sl(t), t.__watcherHandles)
    for (const i of t.__watcherHandles)
      i();
  return a;
}
async function sl(e) {
  if (e.__teleportBuffers) {
    e.teleports = e.teleports || {};
    for (const t in e.__teleportBuffers)
      e.teleports[t] = await s0(await Promise.all([e.__teleportBuffers[t]]));
  }
}
Xs();
var Ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Jn = {}, fl = {
  get exports() {
    return Jn;
  },
  set exports(e) {
    Jn = e;
  }
};
(function(e, t) {
  (function(r, n) {
    n();
  })(Ct, function() {
    function r(l, c) {
      return typeof c > "u" ? c = { autoBom: !1 } : typeof c != "object" && (console.warn("Deprecated: Expected third argument to be a object"), c = { autoBom: !c }), c.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type) ? new Blob(["\uFEFF", l], { type: l.type }) : l;
    }
    function n(l, c, h) {
      var u = new XMLHttpRequest();
      u.open("GET", l), u.responseType = "blob", u.onload = function() {
        o(u.response, c, h);
      }, u.onerror = function() {
        console.error("could not download file");
      }, u.send();
    }
    function a(l) {
      var c = new XMLHttpRequest();
      c.open("HEAD", l, !1);
      try {
        c.send();
      } catch {
      }
      return 200 <= c.status && 299 >= c.status;
    }
    function i(l) {
      try {
        l.dispatchEvent(new MouseEvent("click"));
      } catch {
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), l.dispatchEvent(c);
      }
    }
    var s = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof Ct == "object" && Ct.global === Ct ? Ct : void 0, f = s.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), o = s.saveAs || (typeof window != "object" || window !== s ? function() {
    } : "download" in HTMLAnchorElement.prototype && !f ? function(l, c, h) {
      var u = s.URL || s.webkitURL, d = document.createElement("a");
      c = c || l.name || "download", d.download = c, d.rel = "noopener", typeof l == "string" ? (d.href = l, d.origin === location.origin ? i(d) : a(d.href) ? n(l, c, h) : i(d, d.target = "_blank")) : (d.href = u.createObjectURL(l), setTimeout(function() {
        u.revokeObjectURL(d.href);
      }, 4e4), setTimeout(function() {
        i(d);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(l, c, h) {
      if (c = c || l.name || "download", typeof l != "string")
        navigator.msSaveOrOpenBlob(r(l, h), c);
      else if (a(l))
        n(l, c, h);
      else {
        var u = document.createElement("a");
        u.href = l, u.target = "_blank", setTimeout(function() {
          i(u);
        });
      }
    } : function(l, c, h, u) {
      if (u = u || open("", "_blank"), u && (u.document.title = u.document.body.innerText = "downloading..."), typeof l == "string")
        return n(l, c, h);
      var d = l.type === "application/octet-stream", _ = /constructor/i.test(s.HTMLElement) || s.safari, x = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((x || d && _ || f) && typeof FileReader < "u") {
        var m = new FileReader();
        m.onloadend = function() {
          var y = m.result;
          y = x ? y : y.replace(/^data:[^;]*;/, "data:attachment/file;"), u ? u.location.href = y : location = y, u = null;
        }, m.readAsDataURL(l);
      } else {
        var O = s.URL || s.webkitURL, A = O.createObjectURL(l);
        u ? u.location = A : location.href = A, u = null, setTimeout(function() {
          O.revokeObjectURL(A);
        }, 4e4);
      }
    });
    s.saveAs = o.saveAs = o, e.exports = o;
  });
})(fl);
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var un = {};
un.version = "0.18.5";
var Ga = 1252, ll = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], Xa = function(e) {
  ll.indexOf(e) != -1 && (Ga = e);
};
function ol() {
  Xa(1252);
}
var Mt = function(e) {
  Xa(e);
};
function cl() {
  Mt(1200), ol();
}
function ul(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r)
    t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var Zt = function(t) {
  return String.fromCharCode(t);
}, j0 = function(t) {
  return String.fromCharCode(t);
}, Yr, Mr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function bt(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, n = e.charCodeAt(l++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(l++), f = (n & 15) << 2 | a >> 6, o = a & 63, isNaN(n) ? f = o = 64 : isNaN(a) && (o = 64), t += Mr.charAt(i) + Mr.charAt(s) + Mr.charAt(f) + Mr.charAt(o);
  return t;
}
function Ir(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = Mr.indexOf(e.charAt(l++)), s = Mr.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = Mr.indexOf(e.charAt(l++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), o = Mr.indexOf(e.charAt(l++)), a = (f & 3) << 6 | o, o !== 64 && (t += String.fromCharCode(a));
  return t;
}
var de = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Pr = /* @__PURE__ */ function() {
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
function Zr(e) {
  return de ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function $0(e) {
  return de ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var gr = function(t) {
  return de ? Pr(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function Fn(e) {
  if (typeof ArrayBuffer > "u")
    return gr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}
function Xt(e) {
  if (Array.isArray(e))
    return e.map(function(n) {
      return String.fromCharCode(n);
    }).join("");
  for (var t = [], r = 0; r < e.length; ++r)
    t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function hl(e) {
  if (typeof Uint8Array > "u")
    throw new Error("Unsupported");
  return new Uint8Array(e);
}
var Ve = de ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Pr(t);
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
function xl(e) {
  for (var t = [], r = 0, n = e.length + 250, a = Zr(e.length + 255), i = 0; i < e.length; ++i) {
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
    r > n && (t.push(a.slice(0, r)), r = 0, a = Zr(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), Ve(t);
}
var Rt = /\u0000/g, Qt = /[\u0001-\u0006]/g;
function ht(e) {
  for (var t = "", r = e.length - 1; r >= 0; )
    t += e.charAt(r--);
  return t;
}
function _r(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ce("0", t - r.length) + r;
}
function f0(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ce(" ", t - r.length) + r;
}
function hn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + Ce(" ", t - r.length);
}
function dl(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : Ce("0", t - r.length) + r;
}
function pl(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ce("0", t - r.length) + r;
}
var z0 = /* @__PURE__ */ Math.pow(2, 32);
function ft(e, t) {
  if (e > z0 || e < -z0)
    return dl(e, t);
  var r = Math.round(e);
  return pl(r, t);
}
function xn(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var K0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], Wn = [
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
function vl(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Oe = {
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
  56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
}, Y0 = {
  5: 37,
  6: 38,
  7: 39,
  8: 40,
  //  5 -> 37 ...  8 -> 40
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  // 23 ->  0 ... 26 ->  0
  27: 14,
  28: 14,
  29: 14,
  30: 14,
  31: 14,
  // 27 -> 14 ... 31 -> 14
  50: 14,
  51: 14,
  52: 14,
  53: 14,
  54: 14,
  // 50 -> 14 ... 58 -> 14
  55: 14,
  56: 14,
  57: 14,
  58: 14,
  59: 1,
  60: 2,
  61: 3,
  62: 4,
  // 59 ->  1 ... 62 ->  4
  67: 9,
  68: 10,
  // 67 ->  9 ... 68 -> 10
  69: 12,
  70: 13,
  71: 14,
  // 69 -> 12 ... 71 -> 14
  72: 14,
  73: 15,
  74: 16,
  75: 17,
  // 72 -> 14 ... 75 -> 17
  76: 20,
  77: 21,
  78: 22,
  // 76 -> 20 ... 78 -> 22
  79: 45,
  80: 46,
  81: 47,
  // 79 -> 45 ... 81 -> 47
  82: 0
  // 82 ->  0 ... 65536 -> 0 (omitted)
}, ml = {
  //  5 -- Currency,   0 decimal, black negative
  5: '"$"#,##0_);\\("$"#,##0\\)',
  63: '"$"#,##0_);\\("$"#,##0\\)',
  //  6 -- Currency,   0 decimal, red   negative
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  //  7 -- Currency,   2 decimal, black negative
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  //  8 -- Currency,   2 decimal, red   negative
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  // 41 -- Accounting, 0 decimal, No Symbol
  41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
  // 42 -- Accounting, 0 decimal, $  Symbol
  42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
  // 43 -- Accounting, 2 decimal, No Symbol
  43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
  // 44 -- Accounting, 2 decimal, $  Symbol
  44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
};
function dn(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, o = 1, l = 0, c = 0, h = Math.floor(a); l < t && (h = Math.floor(a), f = h * s + i, c = h * l + o, !(a - h < 5e-8)); )
    a = 1 / (a - h), i = s, s = f, o = l, l = c;
  if (c > t && (l > t ? (c = o, f = i) : (c = l, f = s)), !r)
    return [0, n * f, c];
  var u = Math.floor(n * f / c);
  return [u, n * f - u * c, c];
}
function en(e, t, r) {
  if (e > 2958465 || e < 0)
    return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var o = new Date(1900, 0, 1);
    o.setDate(o.getDate() + n - 1), s = [o.getFullYear(), o.getMonth() + 1, o.getDate()], i = o.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = Al(o, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var ja = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), gl = /* @__PURE__ */ ja.getTime(), _l = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function $a(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= _l && (r += 24 * 60 * 60 * 1e3), (r - (gl + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ ja.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function l0(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function Tl(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function El(e) {
  var t = e < 0 ? 12 : 11, r = l0(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function wl(e) {
  var t = l0(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function Sl(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = El(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = wl(e), l0(Tl(r.toUpperCase()));
}
function Zn(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : Sl(e);
    case "undefined":
      return "";
    case "object":
      if (e == null)
        return "";
      if (e instanceof Date)
        return Vr(14, $a(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Al(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function yl(e, t, r, n) {
  var a = "", i = 0, s = 0, f = r.y, o, l = 0;
  switch (e) {
    case 98:
      f = r.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          o = f % 100, l = 2;
          break;
        default:
          o = f % 1e4, l = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          o = r.m, l = t.length;
          break;
        case 3:
          return Wn[r.m - 1][1];
        case 5:
          return Wn[r.m - 1][0];
        default:
          return Wn[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          o = r.d, l = t.length;
          break;
        case 3:
          return K0[r.q][0];
        default:
          return K0[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          o = 1 + (r.H + 11) % 12, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          o = r.H, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          o = r.M, l = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000")
        throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss") ? _r(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = _r(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          o = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          o = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          o = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      l = t.length === 3 ? 1 : 2;
      break;
    case 101:
      o = f, l = 1;
      break;
  }
  var c = l > 0 ? _r(o, l) : "";
  return c;
}
function br(e) {
  var t = 3;
  if (e.length <= t)
    return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t)
    n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var za = /%/g;
function Fl(e, t, r) {
  var n = t.replace(za, ""), a = t.length - n.length;
  return Dr(e, n, r * Math.pow(10, 2 * a)) + Ce("%", a);
}
function Cl(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return Dr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Ka(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + Ka(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), r.indexOf("e") === -1) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, a) + "." + r.substr(2 + a), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, o, l, c) {
      return o + l + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else
    r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var Ya = /# (\?+)( ?)\/( ?)(\d+)/;
function Ol(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Ce(" ", e[1].length + 1 + e[4].length) : f0(s, e[1].length) + e[2] + "/" + e[3] + _r(f, e[4].length));
}
function Dl(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + Ce(" ", e[1].length + 2 + e[4].length);
}
var qa = /^#*0*\.([0#]+)/, Ja = /\).*[0#]/, Za = /\(###\) ###\\?-####/;
function qe(e) {
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
function q0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function J0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function Rl(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function kl(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function hr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Ja)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? hr("n", n, r) : "(" + hr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return Cl(e, t, r);
  if (t.indexOf("%") !== -1)
    return Fl(e, t, r);
  if (t.indexOf("E") !== -1)
    return Ka(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + hr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return l + ft(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = ft(r, 0), a === "0" && (a = ""), a.length > t.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Ya))
    return Ol(i, o, l);
  if (t.match(/^#+0+$/))
    return l + ft(o, t.length - t.indexOf("0"));
  if (i = t.match(qa))
    return a = q0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + qe(i[1])).replace(/\.$/, "." + qe(i[1])).replace(/\.(\d*)$/, function(_, x) {
      return "." + x + Ce("0", qe(
        /*::(*/
        i[1]
      ).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + q0(o, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return l + br(ft(o, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + hr(e, t, -r) : br("" + (Math.floor(r) + Rl(r, i[1].length))) + "." + _r(J0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return hr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = ht(hr(e, t.replace(/[\\-]/g, ""), r)), s = 0, ht(ht(t.replace(/\\/g, "")).replace(/[0#]/g, function(_) {
      return s < a.length ? a.charAt(s++) : _ === "0" ? "0" : "";
    }));
  if (t.match(Za))
    return a = hr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = dn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = Dr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = hn(f[2], s), c.length < i[4].length && (c = qe(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = dn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? f0(f[1], s) + i[2] + "/" + i[3] + hn(f[2], s) : Ce(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = ft(r, 0), t.length <= a.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var h = t.indexOf(".") - s, u = t.length - a.length - h;
    return qe(t.substr(0, h) + a + t.substr(t.length - u));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = J0(r, i[1].length), r < 0 ? "-" + hr(e, t, -r) : br(kl(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(_) {
      return "00," + (_.length < 3 ? _r(0, 3 - _.length) : "") + _;
    }) + "." + _r(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return hr(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var d = br(ft(o, 0));
      return d !== "0" ? l + d : "";
    case "###,###.00":
      return hr(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return hr(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function Il(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return Dr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Nl(e, t, r) {
  var n = t.replace(za, ""), a = t.length - n.length;
  return Dr(e, n, r * Math.pow(10, 2 * a)) + Ce("%", a);
}
function Qa(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + Qa(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !r.match(/[Ee]/)) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, o, l, c) {
      return o + l + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else
    r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function wr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Ja)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? wr("n", n, r) : "(" + wr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return Il(e, t, r);
  if (t.indexOf("%") !== -1)
    return Nl(e, t, r);
  if (t.indexOf("E") !== -1)
    return Qa(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + wr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return l + _r(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Ya))
    return Dl(i, o, l);
  if (t.match(/^#+0+$/))
    return l + _r(o, t.length - t.indexOf("0"));
  if (i = t.match(qa))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + qe(i[1])).replace(/\.$/, "." + qe(i[1])), a = a.replace(/\.(\d*)$/, function(_, x) {
      return "." + x + Ce("0", qe(i[1]).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + o).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return l + br("" + o);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + wr(e, t, -r) : br("" + r) + "." + Ce("0", i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return wr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = ht(wr(e, t.replace(/[\\-]/g, ""), r)), s = 0, ht(ht(t.replace(/\\/g, "")).replace(/[0#]/g, function(_) {
      return s < a.length ? a.charAt(s++) : _ === "0" ? "0" : "";
    }));
  if (t.match(Za))
    return a = wr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = dn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = Dr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = hn(f[2], s), c.length < i[4].length && (c = qe(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = dn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? f0(f[1], s) + i[2] + "/" + i[3] + hn(f[2], s) : Ce(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var h = t.indexOf(".") - s, u = t.length - a.length - h;
    return qe(t.substr(0, h) + a + t.substr(t.length - u));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + wr(e, t, -r) : br("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(_) {
      return "00," + (_.length < 3 ? _r(0, 3 - _.length) : "") + _;
    }) + "." + _r(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var d = br("" + o);
      return d !== "0" ? l + d : "";
    default:
      if (t.match(/\.[0#?]*$/))
        return wr(e, t.slice(0, t.lastIndexOf(".")), r) + qe(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Dr(e, t, r) {
  return (r | 0) === r ? wr(e, t, r) : hr(e, t, r);
}
function Pl(e) {
  for (var t = [], r = !1, n = 0, a = 0; n < e.length; ++n)
    switch (
      /*cc=*/
      e.charCodeAt(n)
    ) {
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
var ei = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function ri(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        xn(e, t) && (t += 6), t++;
        break;
      case '"':
        for (
          ;
          /*cc=*/
          e.charCodeAt(++t) !== 34 && t < e.length;
        )
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
      case "上":
        if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "上午/下午")
          return !0;
        ++t;
        break;
      case "[":
        for (n = r; e.charAt(t++) !== "]" && t < e.length; )
          n += e.charAt(t);
        if (n.match(ei))
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
function Ll(e, t, r, n) {
  for (var a = [], i = "", s = 0, f = "", o = "t", l, c, h, u = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!xn(e, s))
          throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (h = e.charCodeAt(++s)) !== 34 && s < e.length; )
          i += String.fromCharCode(h);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var d = e.charAt(++s), _ = d === "(" || d === ")" ? d : "t";
        a[a.length] = { t: _, v: d }, ++s;
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
          if (l == null && (l = en(t, r, e.charAt(s + 1) === "2"), l == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, o = f, s += 2;
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
        if (t < 0 || l == null && (l = en(t, r), l == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; )
          i += f;
        f === "m" && o.toLowerCase() === "h" && (f = "M"), f === "h" && (f = u), a[a.length] = { t: f, v: i }, o = f;
        break;
      case "A":
      case "a":
      case "上":
        var x = { t: f, v: f };
        if (l == null && (l = en(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (x.v = l.H >= 12 ? "P" : "A"), x.t = "T", u = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (x.v = l.H >= 12 ? "PM" : "AM"), x.t = "T", s += 5, u = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (l != null && (x.v = l.H >= 12 ? "下午" : "上午"), x.t = "T", s += 5, u = "h") : (x.t = "t", ++s), l == null && x.t === "T")
          return "";
        a[a.length] = x, o = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; )
          i += e.charAt(s);
        if (i.slice(-1) !== "]")
          throw 'unterminated "[" block: |' + i + "|";
        if (i.match(ei)) {
          if (l == null && (l = en(t, r), l == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, o = i.charAt(1);
        } else
          i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", ri(e) || (a[a.length] = { t: "t", v: i }));
        break;
      case ".":
        if (l != null) {
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
        a[a.length] = { t: f, v: i }, o = f;
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
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1)
          throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "t", v: f }, ++s;
        break;
    }
  var m = 0, O = 0, A;
  for (s = a.length - 1, o = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = u, o = "h", m < 1 && (m = 1);
        break;
      case "s":
        (A = a[s].v.match(/\.0+$/)) && (O = Math.max(O, A[0].length - 1)), m < 3 && (m = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        o = a[s].t;
        break;
      case "m":
        o === "s" && (a[s].t = "M", m < 2 && (m = 2));
        break;
      case "X":
        break;
      case "Z":
        m < 1 && a[s].v.match(/[Hh]/) && (m = 1), m < 2 && a[s].v.match(/[Mm]/) && (m = 2), m < 3 && a[s].v.match(/[Ss]/) && (m = 3);
    }
  switch (m) {
    case 0:
      break;
    case 1:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H);
      break;
    case 2:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M);
      break;
  }
  var y = "", N;
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
        a[s].v = yl(a[s].t.charCodeAt(0), a[s].v, l, O), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (N = s + 1; a[N] != null && ((f = a[N].t) === "?" || f === "D" || (f === " " || f === "t") && a[N + 1] != null && (a[N + 1].t === "?" || a[N + 1].t === "t" && a[N + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[N].v === "/" || a[N].v === " " && a[N + 1] != null && a[N + 1].t == "?")); )
          a[s].v += a[N].v, a[N] = { v: "", t: ";" }, ++N;
        y += a[s].v, s = N - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = Zn(t, r);
        break;
    }
  var j = "", ee, D;
  if (y.length > 0) {
    y.charCodeAt(0) == 40 ? (ee = t < 0 && y.charCodeAt(0) === 45 ? -t : t, D = Dr("n", y, ee)) : (ee = t < 0 && n > 1 ? -t : t, D = Dr("n", y, ee), ee < 0 && a[0] && a[0].t == "t" && (D = D.substr(1), a[0].v = "-" + a[0].v)), N = D.length - 1;
    var U = a.length;
    for (s = 0; s < a.length; ++s)
      if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
        U = s;
        break;
      }
    var B = a.length;
    if (U === a.length && D.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (N >= a[s].v.length - 1 ? (N -= a[s].v.length, a[s].v = D.substr(N + 1, a[s].v.length)) : N < 0 ? a[s].v = "" : (a[s].v = D.substr(0, N + 1), N = -1), a[s].t = "t", B = s);
      N >= 0 && B < a.length && (a[B].v = D.substr(0, N + 1) + a[B].v);
    } else if (U !== a.length && D.indexOf("E") === -1) {
      for (N = D.indexOf(".") - 1, s = U; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, j = a[s].v.substr(c + 1); c >= 0; --c)
            N >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (j = D.charAt(N--) + j);
          a[s].v = j, a[s].t = "t", B = s;
        }
      for (N >= 0 && B < a.length && (a[B].v = D.substr(0, N + 1) + a[B].v), N = D.indexOf(".") + 1, s = U; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== U)) {
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") + 1 : 0, j = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            N < D.length && (j += D.charAt(N++));
          a[s].v = j, a[s].t = "t", B = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s)
    a[s] != null && "n?".indexOf(a[s].t) > -1 && (ee = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = Dr(a[s].t, a[s].v, ee), a[s].t = "t");
  var V = "";
  for (s = 0; s !== a.length; ++s)
    a[s] != null && (V += a[s].v);
  return V;
}
var Z0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function Q0(e, t) {
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
function Bl(e, t) {
  var r = Pl(e), n = r.length, a = r[n - 1].indexOf("@");
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
    var s = r[0].match(Z0), f = r[1].match(Z0);
    return Q0(t, s) ? [n, r[0]] : Q0(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function Vr(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : Oe)[e], n == null && (n = r.table && r.table[Y0[e]] || Oe[Y0[e]]), n == null && (n = ml[e] || "General");
      break;
  }
  if (xn(n, 0))
    return Zn(t, r);
  t instanceof Date && (t = $a(t, r.date1904));
  var a = Bl(n, t);
  if (xn(a[1]))
    return Zn(t, r);
  if (t === !0)
    t = "TRUE";
  else if (t === !1)
    t = "FALSE";
  else if (t === "" || t == null)
    return "";
  return Ll(a[1], t, r, a[0]);
}
function ti(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (Oe[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (Oe[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return Oe[t] = e, t;
}
function Cn(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && ti(e[t], t);
}
function On() {
  Oe = vl();
}
var ni = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function Ml(e) {
  var t = typeof e == "number" ? Oe[e] : e;
  return t = t.replace(ni, "(\\d+)"), new RegExp("^" + t + "$");
}
function bl(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, o = -1;
  (t.match(ni) || []).forEach(function(h, u) {
    var d = parseInt(r[u + 1], 10);
    switch (h.toLowerCase().charAt(0)) {
      case "y":
        n = d;
        break;
      case "d":
        i = d;
        break;
      case "h":
        s = d;
        break;
      case "s":
        o = d;
        break;
      case "m":
        s >= 0 ? f = d : a = d;
        break;
    }
  }), o >= 0 && f == -1 && a >= 0 && (f = a, a = -1);
  var l = ("" + (n >= 0 ? n : new Date().getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l);
  var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2);
  return s == -1 && f == -1 && o == -1 ? l : n == -1 && a == -1 && i == -1 ? c : l + "T" + c;
}
var Ul = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var D = 0, U = new Array(256), B = 0; B != 256; ++B)
      D = B, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, U[B] = D;
    return typeof Int32Array < "u" ? new Int32Array(U) : U;
  }
  var r = t();
  function n(D) {
    var U = 0, B = 0, V = 0, G = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (V = 0; V != 256; ++V)
      G[V] = D[V];
    for (V = 0; V != 256; ++V)
      for (B = D[V], U = 256 + V; U < 4096; U += 256)
        B = G[U] = B >>> 8 ^ D[B & 255];
    var K = [];
    for (V = 1; V != 16; ++V)
      K[V - 1] = typeof Int32Array < "u" ? G.subarray(V * 256, V * 256 + 256) : G.slice(V * 256, V * 256 + 256);
    return K;
  }
  var a = n(r), i = a[0], s = a[1], f = a[2], o = a[3], l = a[4], c = a[5], h = a[6], u = a[7], d = a[8], _ = a[9], x = a[10], m = a[11], O = a[12], A = a[13], y = a[14];
  function N(D, U) {
    for (var B = U ^ -1, V = 0, G = D.length; V < G; )
      B = B >>> 8 ^ r[(B ^ D.charCodeAt(V++)) & 255];
    return ~B;
  }
  function j(D, U) {
    for (var B = U ^ -1, V = D.length - 15, G = 0; G < V; )
      B = y[D[G++] ^ B & 255] ^ A[D[G++] ^ B >> 8 & 255] ^ O[D[G++] ^ B >> 16 & 255] ^ m[D[G++] ^ B >>> 24] ^ x[D[G++]] ^ _[D[G++]] ^ d[D[G++]] ^ u[D[G++]] ^ h[D[G++]] ^ c[D[G++]] ^ l[D[G++]] ^ o[D[G++]] ^ f[D[G++]] ^ s[D[G++]] ^ i[D[G++]] ^ r[D[G++]];
    for (V += 15; G < V; )
      B = B >>> 8 ^ r[(B ^ D[G++]) & 255];
    return ~B;
  }
  function ee(D, U) {
    for (var B = U ^ -1, V = 0, G = D.length, K = 0, te = 0; V < G; )
      K = D.charCodeAt(V++), K < 128 ? B = B >>> 8 ^ r[(B ^ K) & 255] : K < 2048 ? (B = B >>> 8 ^ r[(B ^ (192 | K >> 6 & 31)) & 255], B = B >>> 8 ^ r[(B ^ (128 | K & 63)) & 255]) : K >= 55296 && K < 57344 ? (K = (K & 1023) + 64, te = D.charCodeAt(V++) & 1023, B = B >>> 8 ^ r[(B ^ (240 | K >> 8 & 7)) & 255], B = B >>> 8 ^ r[(B ^ (128 | K >> 2 & 63)) & 255], B = B >>> 8 ^ r[(B ^ (128 | te >> 6 & 15 | (K & 3) << 4)) & 255], B = B >>> 8 ^ r[(B ^ (128 | te & 63)) & 255]) : (B = B >>> 8 ^ r[(B ^ (224 | K >> 12 & 15)) & 255], B = B >>> 8 ^ r[(B ^ (128 | K >> 6 & 63)) & 255], B = B >>> 8 ^ r[(B ^ (128 | K & 63)) & 255]);
    return ~B;
  }
  return e.table = r, e.bstr = N, e.buf = j, e.str = ee, e;
}(), Ee = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(p, T) {
    for (var v = p.split("/"), g = T.split("/"), E = 0, w = 0, k = Math.min(v.length, g.length); E < k; ++E) {
      if (w = v[E].length - g[E].length)
        return w;
      if (v[E] != g[E])
        return v[E] < g[E] ? -1 : 1;
    }
    return v.length - g.length;
  }
  function n(p) {
    if (p.charAt(p.length - 1) == "/")
      return p.slice(0, -1).indexOf("/") === -1 ? p : n(p.slice(0, -1));
    var T = p.lastIndexOf("/");
    return T === -1 ? p : p.slice(0, T + 1);
  }
  function a(p) {
    if (p.charAt(p.length - 1) == "/")
      return a(p.slice(0, -1));
    var T = p.lastIndexOf("/");
    return T === -1 ? p : p.slice(T + 1);
  }
  function i(p, T) {
    typeof T == "string" && (T = new Date(T));
    var v = T.getHours();
    v = v << 6 | T.getMinutes(), v = v << 5 | T.getSeconds() >>> 1, p.write_shift(2, v);
    var g = T.getFullYear() - 1980;
    g = g << 4 | T.getMonth() + 1, g = g << 5 | T.getDate(), p.write_shift(2, g);
  }
  function s(p) {
    var T = p.read_shift(2) & 65535, v = p.read_shift(2) & 65535, g = new Date(), E = v & 31;
    v >>>= 5;
    var w = v & 15;
    v >>>= 4, g.setMilliseconds(0), g.setFullYear(v + 1980), g.setMonth(w - 1), g.setDate(E);
    var k = T & 31;
    T >>>= 5;
    var b = T & 63;
    return T >>>= 6, g.setHours(T), g.setMinutes(b), g.setSeconds(k << 1), g;
  }
  function f(p) {
    ar(p, 0);
    for (var T = (
      /*::(*/
      {}
    ), v = 0; p.l <= p.length - 4; ) {
      var g = p.read_shift(2), E = p.read_shift(2), w = p.l + E, k = {};
      switch (g) {
        case 21589:
          v = p.read_shift(1), v & 1 && (k.mtime = p.read_shift(4)), E > 5 && (v & 2 && (k.atime = p.read_shift(4)), v & 4 && (k.ctime = p.read_shift(4))), k.mtime && (k.mt = new Date(k.mtime * 1e3));
          break;
      }
      p.l = w, T[g] = k;
    }
    return T;
  }
  var o;
  function l() {
    return o || (o = {});
  }
  function c(p, T) {
    if (p[0] == 80 && p[1] == 75)
      return M0(p, T);
    if ((p[0] | 32) == 109 && (p[1] | 32) == 105)
      return Ns(p, T);
    if (p.length < 512)
      throw new Error("CFB file size " + p.length + " < 512");
    var v = 3, g = 512, E = 0, w = 0, k = 0, b = 0, R = 0, I = [], P = (
      /*::(*/
      p.slice(0, 512)
    );
    ar(P, 0);
    var z = h(P);
    switch (v = z[0], v) {
      case 3:
        g = 512;
        break;
      case 4:
        g = 4096;
        break;
      case 0:
        if (z[1] == 0)
          return M0(p, T);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + v);
    }
    g !== 512 && (P = /*::(*/
    p.slice(0, g), ar(
      P,
      28
      /* blob.l */
    ));
    var Z = p.slice(0, g);
    u(P, v);
    var ne = P.read_shift(4, "i");
    if (v === 3 && ne !== 0)
      throw new Error("# Directory Sectors: Expected 0 saw " + ne);
    P.l += 4, k = P.read_shift(4, "i"), P.l += 4, P.chk("00100000", "Mini Stream Cutoff Size: "), b = P.read_shift(4, "i"), E = P.read_shift(4, "i"), R = P.read_shift(4, "i"), w = P.read_shift(4, "i");
    for (var Y = -1, re = 0; re < 109 && (Y = P.read_shift(4, "i"), !(Y < 0)); ++re)
      I[re] = Y;
    var le = d(p, g);
    m(R, w, le, g, I);
    var Ae = A(le, k, I, g);
    Ae[k].name = "!Directory", E > 0 && b !== te && (Ae[b].name = "!MiniFAT"), Ae[I[0]].name = "!FAT", Ae.fat_addrs = I, Ae.ssz = g;
    var ye = {}, $e = [], At = [], yt = [];
    y(k, Ae, le, $e, E, ye, At, b), _(At, yt, $e), $e.shift();
    var Ft = {
      FileIndex: At,
      FullPaths: yt
    };
    return T && T.raw && (Ft.raw = { header: Z, sectors: le }), Ft;
  }
  function h(p) {
    if (p[p.l] == 80 && p[p.l + 1] == 75)
      return [0, 0];
    p.chk(Te, "Header Signature: "), p.l += 16;
    var T = p.read_shift(2, "u");
    return [p.read_shift(2, "u"), T];
  }
  function u(p, T) {
    var v = 9;
    switch (p.l += 2, v = p.read_shift(2)) {
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
    p.chk("0600", "Mini Sector Shift: "), p.chk("000000000000", "Reserved: ");
  }
  function d(p, T) {
    for (var v = Math.ceil(p.length / T) - 1, g = [], E = 1; E < v; ++E)
      g[E - 1] = p.slice(E * T, (E + 1) * T);
    return g[v - 1] = p.slice(v * T), g;
  }
  function _(p, T, v) {
    for (var g = 0, E = 0, w = 0, k = 0, b = 0, R = v.length, I = [], P = []; g < R; ++g)
      I[g] = P[g] = g, T[g] = v[g];
    for (; b < P.length; ++b)
      g = P[b], E = p[g].L, w = p[g].R, k = p[g].C, I[g] === g && (E !== -1 && I[E] !== E && (I[g] = I[E]), w !== -1 && I[w] !== w && (I[g] = I[w])), k !== -1 && (I[k] = g), E !== -1 && g != I[g] && (I[E] = I[g], P.lastIndexOf(E) < b && P.push(E)), w !== -1 && g != I[g] && (I[w] = I[g], P.lastIndexOf(w) < b && P.push(w));
    for (g = 1; g < R; ++g)
      I[g] === g && (w !== -1 && I[w] !== w ? I[g] = I[w] : E !== -1 && I[E] !== E && (I[g] = I[E]));
    for (g = 1; g < R; ++g)
      if (p[g].type !== 0) {
        if (b = g, b != I[b])
          do
            b = I[b], T[g] = T[b] + "/" + T[g];
          while (b !== 0 && I[b] !== -1 && b != I[b]);
        I[g] = -1;
      }
    for (T[0] += "/", g = 1; g < R; ++g)
      p[g].type !== 2 && (T[g] += "/");
  }
  function x(p, T, v) {
    for (var g = p.start, E = p.size, w = [], k = g; v && E > 0 && k >= 0; )
      w.push(T.slice(k * K, k * K + K)), E -= K, k = qr(v, k * 4);
    return w.length === 0 ? M(0) : Ve(w).slice(0, p.size);
  }
  function m(p, T, v, g, E) {
    var w = te;
    if (p === te) {
      if (T !== 0)
        throw new Error("DIFAT chain shorter than expected");
    } else if (p !== -1) {
      var k = v[p], b = (g >>> 2) - 1;
      if (!k)
        return;
      for (var R = 0; R < b && (w = qr(k, R * 4)) !== te; ++R)
        E.push(w);
      m(qr(k, g - 4), T - 1, v, g, E);
    }
  }
  function O(p, T, v, g, E) {
    var w = [], k = [];
    E || (E = []);
    var b = g - 1, R = 0, I = 0;
    for (R = T; R >= 0; ) {
      E[R] = !0, w[w.length] = R, k.push(p[R]);
      var P = v[Math.floor(R * 4 / g)];
      if (I = R * 4 & b, g < 4 + I)
        throw new Error("FAT boundary crossed: " + R + " 4 " + g);
      if (!p[P])
        break;
      R = qr(p[P], I);
    }
    return { nodes: w, data: fa([k]) };
  }
  function A(p, T, v, g) {
    var E = p.length, w = [], k = [], b = [], R = [], I = g - 1, P = 0, z = 0, Z = 0, ne = 0;
    for (P = 0; P < E; ++P)
      if (b = [], Z = P + T, Z >= E && (Z -= E), !k[Z]) {
        R = [];
        var Y = [];
        for (z = Z; z >= 0; ) {
          Y[z] = !0, k[z] = !0, b[b.length] = z, R.push(p[z]);
          var re = v[Math.floor(z * 4 / g)];
          if (ne = z * 4 & I, g < 4 + ne)
            throw new Error("FAT boundary crossed: " + z + " 4 " + g);
          if (!p[re] || (z = qr(p[re], ne), Y[z]))
            break;
        }
        w[Z] = { nodes: b, data: fa([R]) };
      }
    return w;
  }
  function y(p, T, v, g, E, w, k, b) {
    for (var R = 0, I = g.length ? 2 : 0, P = T[p].data, z = 0, Z = 0, ne; z < P.length; z += 128) {
      var Y = (
        /*::(*/
        P.slice(z, z + 128)
      );
      ar(Y, 64), Z = Y.read_shift(2), ne = x0(Y, 0, Z - I), g.push(ne);
      var re = {
        name: ne,
        type: Y.read_shift(1),
        color: Y.read_shift(1),
        L: Y.read_shift(4, "i"),
        R: Y.read_shift(4, "i"),
        C: Y.read_shift(4, "i"),
        clsid: Y.read_shift(16),
        state: Y.read_shift(4, "i"),
        start: 0,
        size: 0
      }, le = Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2);
      le !== 0 && (re.ct = N(Y, Y.l - 8));
      var Ae = Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2);
      Ae !== 0 && (re.mt = N(Y, Y.l - 8)), re.start = Y.read_shift(4, "i"), re.size = Y.read_shift(4, "i"), re.size < 0 && re.start < 0 && (re.size = re.type = 0, re.start = te, re.name = ""), re.type === 5 ? (R = re.start, E > 0 && R !== te && (T[R].name = "!StreamData")) : re.size >= 4096 ? (re.storage = "fat", T[re.start] === void 0 && (T[re.start] = O(v, re.start, T.fat_addrs, T.ssz)), T[re.start].name = re.name, re.content = T[re.start].data.slice(0, re.size)) : (re.storage = "minifat", re.size < 0 ? re.size = 0 : R !== te && re.start !== te && T[R] && (re.content = x(re, T[R].data, (T[b] || {}).data))), re.content && ar(re.content, 0), w[ne] = re, k.push(re);
    }
  }
  function N(p, T) {
    return new Date((sr(p, T + 4) / 1e7 * Math.pow(2, 32) + sr(p, T) / 1e7 - 11644473600) * 1e3);
  }
  function j(p, T) {
    return l(), c(o.readFileSync(p), T);
  }
  function ee(p, T) {
    var v = T && T.type;
    switch (v || de && Buffer.isBuffer(p) && (v = "buffer"), v || "base64") {
      case "file":
        return j(p, T);
      case "base64":
        return c(gr(Ir(p)), T);
      case "binary":
        return c(gr(p), T);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      p,
      T
    );
  }
  function D(p, T) {
    var v = T || {}, g = v.root || "Root Entry";
    if (p.FullPaths || (p.FullPaths = []), p.FileIndex || (p.FileIndex = []), p.FullPaths.length !== p.FileIndex.length)
      throw new Error("inconsistent CFB structure");
    p.FullPaths.length === 0 && (p.FullPaths[0] = g + "/", p.FileIndex[0] = { name: g, type: 5 }), v.CLSID && (p.FileIndex[0].clsid = v.CLSID), U(p);
  }
  function U(p) {
    var T = "Sh33tJ5";
    if (!Ee.find(p, "/" + T)) {
      var v = M(4);
      v[0] = 55, v[1] = v[3] = 50, v[2] = 54, p.FileIndex.push({ name: T, type: 2, content: v, size: 4, L: 69, R: 69, C: 69 }), p.FullPaths.push(p.FullPaths[0] + T), B(p);
    }
  }
  function B(p, T) {
    D(p);
    for (var v = !1, g = !1, E = p.FullPaths.length - 1; E >= 0; --E) {
      var w = p.FileIndex[E];
      switch (w.type) {
        case 0:
          g ? v = !0 : (p.FileIndex.pop(), p.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          g = !0, isNaN(w.R * w.L * w.C) && (v = !0), w.R > -1 && w.L > -1 && w.R == w.L && (v = !0);
          break;
        default:
          v = !0;
          break;
      }
    }
    if (!(!v && !T)) {
      var k = new Date(1987, 1, 19), b = 0, R = Object.create ? /* @__PURE__ */ Object.create(null) : {}, I = [];
      for (E = 0; E < p.FullPaths.length; ++E)
        R[p.FullPaths[E]] = !0, p.FileIndex[E].type !== 0 && I.push([p.FullPaths[E], p.FileIndex[E]]);
      for (E = 0; E < I.length; ++E) {
        var P = n(I[E][0]);
        g = R[P], g || (I.push([P, {
          name: a(P).replace("/", ""),
          type: 1,
          clsid: Ue,
          ct: k,
          mt: k,
          content: null
        }]), R[P] = !0);
      }
      for (I.sort(function(ne, Y) {
        return r(ne[0], Y[0]);
      }), p.FullPaths = [], p.FileIndex = [], E = 0; E < I.length; ++E)
        p.FullPaths[E] = I[E][0], p.FileIndex[E] = I[E][1];
      for (E = 0; E < I.length; ++E) {
        var z = p.FileIndex[E], Z = p.FullPaths[E];
        if (z.name = a(Z).replace("/", ""), z.L = z.R = z.C = -(z.color = 1), z.size = z.content ? z.content.length : 0, z.start = 0, z.clsid = z.clsid || Ue, E === 0)
          z.C = I.length > 1 ? 1 : -1, z.size = 0, z.type = 5;
        else if (Z.slice(-1) == "/") {
          for (b = E + 1; b < I.length && n(p.FullPaths[b]) != Z; ++b)
            ;
          for (z.C = b >= I.length ? -1 : b, b = E + 1; b < I.length && n(p.FullPaths[b]) != n(Z); ++b)
            ;
          z.R = b >= I.length ? -1 : b, z.type = 1;
        } else
          n(p.FullPaths[E + 1] || "") == n(Z) && (z.R = E + 1), z.type = 2;
      }
    }
  }
  function V(p, T) {
    var v = T || {};
    if (v.fileType == "mad")
      return Ps(p, v);
    switch (B(p), v.fileType) {
      case "zip":
        return Cs(p, v);
    }
    var g = function(ne) {
      for (var Y = 0, re = 0, le = 0; le < ne.FileIndex.length; ++le) {
        var Ae = ne.FileIndex[le];
        if (Ae.content) {
          var ye = Ae.content.length;
          ye > 0 && (ye < 4096 ? Y += ye + 63 >> 6 : re += ye + 511 >> 9);
        }
      }
      for (var $e = ne.FullPaths.length + 3 >> 2, At = Y + 7 >> 3, yt = Y + 127 >> 7, Ft = At + re + $e + yt, Kr = Ft + 127 >> 7, bn = Kr <= 109 ? 0 : Math.ceil((Kr - 109) / 127); Ft + Kr + bn + 127 >> 7 > Kr; )
        bn = ++Kr <= 109 ? 0 : Math.ceil((Kr - 109) / 127);
      var Cr = [1, bn, Kr, yt, $e, re, Y, 0];
      return ne.FileIndex[0].size = Y << 6, Cr[7] = (ne.FileIndex[0].start = Cr[0] + Cr[1] + Cr[2] + Cr[3] + Cr[4] + Cr[5]) + (Cr[6] + 7 >> 3), Cr;
    }(p), E = M(g[7] << 9), w = 0, k = 0;
    {
      for (w = 0; w < 8; ++w)
        E.write_shift(1, oe[w]);
      for (w = 0; w < 8; ++w)
        E.write_shift(2, 0);
      for (E.write_shift(2, 62), E.write_shift(2, 3), E.write_shift(2, 65534), E.write_shift(2, 9), E.write_shift(2, 6), w = 0; w < 3; ++w)
        E.write_shift(2, 0);
      for (E.write_shift(4, 0), E.write_shift(4, g[2]), E.write_shift(4, g[0] + g[1] + g[2] + g[3] - 1), E.write_shift(4, 0), E.write_shift(4, 1 << 12), E.write_shift(4, g[3] ? g[0] + g[1] + g[2] - 1 : te), E.write_shift(4, g[3]), E.write_shift(-4, g[1] ? g[0] - 1 : te), E.write_shift(4, g[1]), w = 0; w < 109; ++w)
        E.write_shift(-4, w < g[2] ? g[1] + w : -1);
    }
    if (g[1])
      for (k = 0; k < g[1]; ++k) {
        for (; w < 236 + k * 127; ++w)
          E.write_shift(-4, w < g[2] ? g[1] + w : -1);
        E.write_shift(-4, k === g[1] - 1 ? te : k + 1);
      }
    var b = function(ne) {
      for (k += ne; w < k - 1; ++w)
        E.write_shift(-4, w + 1);
      ne && (++w, E.write_shift(-4, te));
    };
    for (k = w = 0, k += g[1]; w < k; ++w)
      E.write_shift(-4, De.DIFSECT);
    for (k += g[2]; w < k; ++w)
      E.write_shift(-4, De.FATSECT);
    b(g[3]), b(g[4]);
    for (var R = 0, I = 0, P = p.FileIndex[0]; R < p.FileIndex.length; ++R)
      P = p.FileIndex[R], P.content && (I = P.content.length, !(I < 4096) && (P.start = k, b(I + 511 >> 9)));
    for (b(g[6] + 7 >> 3); E.l & 511; )
      E.write_shift(-4, De.ENDOFCHAIN);
    for (k = w = 0, R = 0; R < p.FileIndex.length; ++R)
      P = p.FileIndex[R], P.content && (I = P.content.length, !(!I || I >= 4096) && (P.start = k, b(I + 63 >> 6)));
    for (; E.l & 511; )
      E.write_shift(-4, De.ENDOFCHAIN);
    for (w = 0; w < g[4] << 2; ++w) {
      var z = p.FullPaths[w];
      if (!z || z.length === 0) {
        for (R = 0; R < 17; ++R)
          E.write_shift(4, 0);
        for (R = 0; R < 3; ++R)
          E.write_shift(4, -1);
        for (R = 0; R < 12; ++R)
          E.write_shift(4, 0);
        continue;
      }
      P = p.FileIndex[w], w === 0 && (P.start = P.size ? P.start - 1 : te);
      var Z = w === 0 && v.root || P.name;
      if (I = 2 * (Z.length + 1), E.write_shift(64, Z, "utf16le"), E.write_shift(2, I), E.write_shift(1, P.type), E.write_shift(1, P.color), E.write_shift(-4, P.L), E.write_shift(-4, P.R), E.write_shift(-4, P.C), P.clsid)
        E.write_shift(16, P.clsid, "hex");
      else
        for (R = 0; R < 4; ++R)
          E.write_shift(4, 0);
      E.write_shift(4, P.state || 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, P.start), E.write_shift(4, P.size), E.write_shift(4, 0);
    }
    for (w = 1; w < p.FileIndex.length; ++w)
      if (P = p.FileIndex[w], P.size >= 4096)
        if (E.l = P.start + 1 << 9, de && Buffer.isBuffer(P.content))
          P.content.copy(E, E.l, 0, P.size), E.l += P.size + 511 & -512;
        else {
          for (R = 0; R < P.size; ++R)
            E.write_shift(1, P.content[R]);
          for (; R & 511; ++R)
            E.write_shift(1, 0);
        }
    for (w = 1; w < p.FileIndex.length; ++w)
      if (P = p.FileIndex[w], P.size > 0 && P.size < 4096)
        if (de && Buffer.isBuffer(P.content))
          P.content.copy(E, E.l, 0, P.size), E.l += P.size + 63 & -64;
        else {
          for (R = 0; R < P.size; ++R)
            E.write_shift(1, P.content[R]);
          for (; R & 63; ++R)
            E.write_shift(1, 0);
        }
    if (de)
      E.l = E.length;
    else
      for (; E.l < E.length; )
        E.write_shift(1, 0);
    return E;
  }
  function G(p, T) {
    var v = p.FullPaths.map(function(R) {
      return R.toUpperCase();
    }), g = v.map(function(R) {
      var I = R.split("/");
      return I[I.length - (R.slice(-1) == "/" ? 2 : 1)];
    }), E = !1;
    T.charCodeAt(0) === 47 ? (E = !0, T = v[0].slice(0, -1) + T) : E = T.indexOf("/") !== -1;
    var w = T.toUpperCase(), k = E === !0 ? v.indexOf(w) : g.indexOf(w);
    if (k !== -1)
      return p.FileIndex[k];
    var b = !w.match(Qt);
    for (w = w.replace(Rt, ""), b && (w = w.replace(Qt, "!")), k = 0; k < v.length; ++k)
      if ((b ? v[k].replace(Qt, "!") : v[k]).replace(Rt, "") == w || (b ? g[k].replace(Qt, "!") : g[k]).replace(Rt, "") == w)
        return p.FileIndex[k];
    return null;
  }
  var K = 64, te = -2, Te = "d0cf11e0a1b11ae1", oe = [208, 207, 17, 224, 161, 177, 26, 225], Ue = "00000000000000000000000000000000", De = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: te,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: Te,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: Ue,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function pr(p, T, v) {
    l();
    var g = V(p, v);
    o.writeFileSync(T, g);
  }
  function Pe(p) {
    for (var T = new Array(p.length), v = 0; v < p.length; ++v)
      T[v] = String.fromCharCode(p[v]);
    return T.join("");
  }
  function cr(p, T) {
    var v = V(p, T);
    switch (T && T.type || "buffer") {
      case "file":
        return l(), o.writeFileSync(T.filename, v), v;
      case "binary":
        return typeof v == "string" ? v : Pe(v);
      case "base64":
        return bt(typeof v == "string" ? v : Pe(v));
      case "buffer":
        if (de)
          return Buffer.isBuffer(v) ? v : Pr(v);
      case "array":
        return typeof v == "string" ? gr(v) : v;
    }
    return v;
  }
  var tr;
  function S(p) {
    try {
      var T = p.InflateRaw, v = new T();
      if (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag), v.bytesRead)
        tr = p;
      else
        throw new Error("zlib does not expose bytesRead");
    } catch (g) {
      console.error("cannot use native zlib: " + (g.message || g));
    }
  }
  function L(p, T) {
    if (!tr)
      return L0(p, T);
    var v = tr.InflateRaw, g = new v(), E = g._processChunk(p.slice(p.l), g._finishFlushFlag);
    return p.l += g.bytesRead, E;
  }
  function C(p) {
    return tr ? tr.deflateRawSync(p) : D0(p);
  }
  var F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], W = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], se = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function fe(p) {
    var T = (p << 1 | p << 11) & 139536 | (p << 5 | p << 15) & 558144;
    return (T >> 16 | T >> 8 | T) & 255;
  }
  for (var ie = typeof Uint8Array < "u", Q = ie ? new Uint8Array(1 << 8) : [], we = 0; we < 1 << 8; ++we)
    Q[we] = fe(we);
  function he(p, T) {
    var v = Q[p & 255];
    return T <= 8 ? v >>> 8 - T : (v = v << 8 | Q[p >> 8 & 255], T <= 16 ? v >>> 16 - T : (v = v << 8 | Q[p >> 16 & 255], v >>> 24 - T));
  }
  function Ye(p, T) {
    var v = T & 7, g = T >>> 3;
    return (p[g] | (v <= 6 ? 0 : p[g + 1] << 8)) >>> v & 3;
  }
  function pe(p, T) {
    var v = T & 7, g = T >>> 3;
    return (p[g] | (v <= 5 ? 0 : p[g + 1] << 8)) >>> v & 7;
  }
  function yr(p, T) {
    var v = T & 7, g = T >>> 3;
    return (p[g] | (v <= 4 ? 0 : p[g + 1] << 8)) >>> v & 15;
  }
  function Fe(p, T) {
    var v = T & 7, g = T >>> 3;
    return (p[g] | (v <= 3 ? 0 : p[g + 1] << 8)) >>> v & 31;
  }
  function ae(p, T) {
    var v = T & 7, g = T >>> 3;
    return (p[g] | (v <= 1 ? 0 : p[g + 1] << 8)) >>> v & 127;
  }
  function ur(p, T, v) {
    var g = T & 7, E = T >>> 3, w = (1 << v) - 1, k = p[E] >>> g;
    return v < 8 - g || (k |= p[E + 1] << 8 - g, v < 16 - g) || (k |= p[E + 2] << 16 - g, v < 24 - g) || (k |= p[E + 3] << 24 - g), k & w;
  }
  function Fr(p, T, v) {
    var g = T & 7, E = T >>> 3;
    return g <= 5 ? p[E] |= (v & 7) << g : (p[E] |= v << g & 255, p[E + 1] = (v & 7) >> 8 - g), T + 3;
  }
  function $r(p, T, v) {
    var g = T & 7, E = T >>> 3;
    return v = (v & 1) << g, p[E] |= v, T + 1;
  }
  function st(p, T, v) {
    var g = T & 7, E = T >>> 3;
    return v <<= g, p[E] |= v & 255, v >>>= 8, p[E + 1] = v, T + 8;
  }
  function O0(p, T, v) {
    var g = T & 7, E = T >>> 3;
    return v <<= g, p[E] |= v & 255, v >>>= 8, p[E + 1] = v & 255, p[E + 2] = v >>> 8, T + 16;
  }
  function Pn(p, T) {
    var v = p.length, g = 2 * v > T ? 2 * v : T + 5, E = 0;
    if (v >= T)
      return p;
    if (de) {
      var w = $0(g);
      if (p.copy)
        p.copy(w);
      else
        for (; E < p.length; ++E)
          w[E] = p[E];
      return w;
    } else if (ie) {
      var k = new Uint8Array(g);
      if (k.set)
        k.set(p);
      else
        for (; E < v; ++E)
          k[E] = p[E];
      return k;
    }
    return p.length = g, p;
  }
  function Er(p) {
    for (var T = new Array(p), v = 0; v < p; ++v)
      T[v] = 0;
    return T;
  }
  function qt(p, T, v) {
    var g = 1, E = 0, w = 0, k = 0, b = 0, R = p.length, I = ie ? new Uint16Array(32) : Er(32);
    for (w = 0; w < 32; ++w)
      I[w] = 0;
    for (w = R; w < v; ++w)
      p[w] = 0;
    R = p.length;
    var P = ie ? new Uint16Array(R) : Er(R);
    for (w = 0; w < R; ++w)
      I[E = p[w]]++, g < E && (g = E), P[w] = 0;
    for (I[0] = 0, w = 1; w <= g; ++w)
      I[w + 16] = b = b + I[w - 1] << 1;
    for (w = 0; w < R; ++w)
      b = p[w], b != 0 && (P[w] = I[b + 16]++);
    var z = 0;
    for (w = 0; w < R; ++w)
      if (z = p[w], z != 0)
        for (b = he(P[w], g) >> g - z, k = (1 << g + 4 - z) - 1; k >= 0; --k)
          T[b | k << z] = z & 15 | w << 4;
    return g;
  }
  var Ln = ie ? new Uint16Array(512) : Er(512), Bn = ie ? new Uint16Array(32) : Er(32);
  if (!ie) {
    for (var zr = 0; zr < 512; ++zr)
      Ln[zr] = 0;
    for (zr = 0; zr < 32; ++zr)
      Bn[zr] = 0;
  }
  (function() {
    for (var p = [], T = 0; T < 32; T++)
      p.push(5);
    qt(p, Bn, 32);
    var v = [];
    for (T = 0; T <= 143; T++)
      v.push(8);
    for (; T <= 255; T++)
      v.push(9);
    for (; T <= 279; T++)
      v.push(7);
    for (; T <= 287; T++)
      v.push(8);
    qt(v, Ln, 288);
  })();
  var Ss = /* @__PURE__ */ function() {
    for (var T = ie ? new Uint8Array(32768) : [], v = 0, g = 0; v < se.length - 1; ++v)
      for (; g < se[v + 1]; ++g)
        T[g] = v;
    for (; g < 32768; ++g)
      T[g] = 29;
    var E = ie ? new Uint8Array(259) : [];
    for (v = 0, g = 0; v < W.length - 1; ++v)
      for (; g < W[v + 1]; ++g)
        E[g] = v;
    function w(b, R) {
      for (var I = 0; I < b.length; ) {
        var P = Math.min(65535, b.length - I), z = I + P == b.length;
        for (R.write_shift(1, +z), R.write_shift(2, P), R.write_shift(2, ~P & 65535); P-- > 0; )
          R[R.l++] = b[I++];
      }
      return R.l;
    }
    function k(b, R) {
      for (var I = 0, P = 0, z = ie ? new Uint16Array(32768) : []; P < b.length; ) {
        var Z = (
          /* data.length - boff; */
          Math.min(65535, b.length - P)
        );
        if (Z < 10) {
          for (I = Fr(R, I, +(P + Z == b.length)), I & 7 && (I += 8 - (I & 7)), R.l = I / 8 | 0, R.write_shift(2, Z), R.write_shift(2, ~Z & 65535); Z-- > 0; )
            R[R.l++] = b[P++];
          I = R.l * 8;
          continue;
        }
        I = Fr(R, I, +(P + Z == b.length) + 2);
        for (var ne = 0; Z-- > 0; ) {
          var Y = b[P];
          ne = (ne << 5 ^ Y) & 32767;
          var re = -1, le = 0;
          if ((re = z[ne]) && (re |= P & -32768, re > P && (re -= 32768), re < P))
            for (; b[re + le] == b[P + le] && le < 250; )
              ++le;
          if (le > 2) {
            Y = E[le], Y <= 22 ? I = st(R, I, Q[Y + 1] >> 1) - 1 : (st(R, I, 3), I += 5, st(R, I, Q[Y - 23] >> 5), I += 3);
            var Ae = Y < 8 ? 0 : Y - 4 >> 2;
            Ae > 0 && (O0(R, I, le - W[Y]), I += Ae), Y = T[P - re], I = st(R, I, Q[Y] >> 3), I -= 3;
            var ye = Y < 4 ? 0 : Y - 2 >> 1;
            ye > 0 && (O0(R, I, P - re - se[Y]), I += ye);
            for (var $e = 0; $e < le; ++$e)
              z[ne] = P & 32767, ne = (ne << 5 ^ b[P]) & 32767, ++P;
            Z -= le - 1;
          } else
            Y <= 143 ? Y = Y + 48 : I = $r(R, I, 1), I = st(R, I, Q[Y]), z[ne] = P & 32767, ++P;
        }
        I = st(R, I, 0) - 1;
      }
      return R.l = (I + 7) / 8 | 0, R.l;
    }
    return function(R, I) {
      return R.length < 8 ? w(R, I) : k(R, I);
    };
  }();
  function D0(p) {
    var T = M(50 + Math.floor(p.length * 1.1)), v = Ss(p, T);
    return T.slice(0, v);
  }
  var R0 = ie ? new Uint16Array(32768) : Er(32768), k0 = ie ? new Uint16Array(32768) : Er(32768), I0 = ie ? new Uint16Array(128) : Er(128), N0 = 1, P0 = 1;
  function As(p, T) {
    var v = Fe(p, T) + 257;
    T += 5;
    var g = Fe(p, T) + 1;
    T += 5;
    var E = yr(p, T) + 4;
    T += 4;
    for (var w = 0, k = ie ? new Uint8Array(19) : Er(19), b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], R = 1, I = ie ? new Uint8Array(8) : Er(8), P = ie ? new Uint8Array(8) : Er(8), z = k.length, Z = 0; Z < E; ++Z)
      k[F[Z]] = w = pe(p, T), R < w && (R = w), I[w]++, T += 3;
    var ne = 0;
    for (I[0] = 0, Z = 1; Z <= R; ++Z)
      P[Z] = ne = ne + I[Z - 1] << 1;
    for (Z = 0; Z < z; ++Z)
      (ne = k[Z]) != 0 && (b[Z] = P[ne]++);
    var Y = 0;
    for (Z = 0; Z < z; ++Z)
      if (Y = k[Z], Y != 0) {
        ne = Q[b[Z]] >> 8 - Y;
        for (var re = (1 << 7 - Y) - 1; re >= 0; --re)
          I0[ne | re << Y] = Y & 7 | Z << 3;
      }
    var le = [];
    for (R = 1; le.length < v + g; )
      switch (ne = I0[ae(p, T)], T += ne & 7, ne >>>= 3) {
        case 16:
          for (w = 3 + Ye(p, T), T += 2, ne = le[le.length - 1]; w-- > 0; )
            le.push(ne);
          break;
        case 17:
          for (w = 3 + pe(p, T), T += 3; w-- > 0; )
            le.push(0);
          break;
        case 18:
          for (w = 11 + ae(p, T), T += 7; w-- > 0; )
            le.push(0);
          break;
        default:
          le.push(ne), R < ne && (R = ne);
          break;
      }
    var Ae = le.slice(0, v), ye = le.slice(v);
    for (Z = v; Z < 286; ++Z)
      Ae[Z] = 0;
    for (Z = g; Z < 30; ++Z)
      ye[Z] = 0;
    return N0 = qt(Ae, R0, 286), P0 = qt(ye, k0, 30), T;
  }
  function ys(p, T) {
    if (p[0] == 3 && !(p[1] & 3))
      return [Zr(T), 2];
    for (var v = 0, g = 0, E = $0(T || 1 << 18), w = 0, k = E.length >>> 0, b = 0, R = 0; !(g & 1); ) {
      if (g = pe(p, v), v += 3, g >>> 1)
        g >> 1 == 1 ? (b = 9, R = 5) : (v = As(p, v), b = N0, R = P0);
      else {
        v & 7 && (v += 8 - (v & 7));
        var I = p[v >>> 3] | p[(v >>> 3) + 1] << 8;
        if (v += 32, I > 0)
          for (!T && k < w + I && (E = Pn(E, w + I), k = E.length); I-- > 0; )
            E[w++] = p[v >>> 3], v += 8;
        continue;
      }
      for (; ; ) {
        !T && k < w + 32767 && (E = Pn(E, w + 32767), k = E.length);
        var P = ur(p, v, b), z = g >>> 1 == 1 ? Ln[P] : R0[P];
        if (v += z & 15, z >>>= 4, !(z >>> 8 & 255))
          E[w++] = z;
        else {
          if (z == 256)
            break;
          z -= 257;
          var Z = z < 8 ? 0 : z - 4 >> 2;
          Z > 5 && (Z = 0);
          var ne = w + W[z];
          Z > 0 && (ne += ur(p, v, Z), v += Z), P = ur(p, v, R), z = g >>> 1 == 1 ? Bn[P] : k0[P], v += z & 15, z >>>= 4;
          var Y = z < 4 ? 0 : z - 2 >> 1, re = se[z];
          for (Y > 0 && (re += ur(p, v, Y), v += Y), !T && k < ne && (E = Pn(E, ne + 100), k = E.length); w < ne; )
            E[w] = E[w - re], ++w;
        }
      }
    }
    return T ? [E, v + 7 >>> 3] : [E.slice(0, w), v + 7 >>> 3];
  }
  function L0(p, T) {
    var v = p.slice(p.l || 0), g = ys(v, T);
    return p.l += g[1], g[0];
  }
  function B0(p, T) {
    if (p)
      typeof console < "u" && console.error(T);
    else
      throw new Error(T);
  }
  function M0(p, T) {
    var v = (
      /*::(*/
      p
    );
    ar(v, 0);
    var g = [], E = [], w = {
      FileIndex: g,
      FullPaths: E
    };
    D(w, { root: T.root });
    for (var k = v.length - 4; (v[k] != 80 || v[k + 1] != 75 || v[k + 2] != 5 || v[k + 3] != 6) && k >= 0; )
      --k;
    v.l = k + 4, v.l += 4;
    var b = v.read_shift(2);
    v.l += 6;
    var R = v.read_shift(4);
    for (v.l = R, k = 0; k < b; ++k) {
      v.l += 20;
      var I = v.read_shift(4), P = v.read_shift(4), z = v.read_shift(2), Z = v.read_shift(2), ne = v.read_shift(2);
      v.l += 8;
      var Y = v.read_shift(4), re = f(
        /*::(*/
        v.slice(v.l + z, v.l + z + Z)
        /*:: :any)*/
      );
      v.l += z + Z + ne;
      var le = v.l;
      v.l = Y + 4, Fs(v, I, P, w, re), v.l = le;
    }
    return w;
  }
  function Fs(p, T, v, g, E) {
    p.l += 2;
    var w = p.read_shift(2), k = p.read_shift(2), b = s(p);
    if (w & 8257)
      throw new Error("Unsupported ZIP encryption");
    for (var R = p.read_shift(4), I = p.read_shift(4), P = p.read_shift(4), z = p.read_shift(2), Z = p.read_shift(2), ne = "", Y = 0; Y < z; ++Y)
      ne += String.fromCharCode(p[p.l++]);
    if (Z) {
      var re = f(
        /*::(*/
        p.slice(p.l, p.l + Z)
        /*:: :any)*/
      );
      (re[21589] || {}).mt && (b = re[21589].mt), ((E || {})[21589] || {}).mt && (b = E[21589].mt);
    }
    p.l += Z;
    var le = p.slice(p.l, p.l + I);
    switch (k) {
      case 8:
        le = L(p, P);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + k);
    }
    var Ae = !1;
    w & 8 && (R = p.read_shift(4), R == 134695760 && (R = p.read_shift(4), Ae = !0), I = p.read_shift(4), P = p.read_shift(4)), I != T && B0(Ae, "Bad compressed size: " + T + " != " + I), P != v && B0(Ae, "Bad uncompressed size: " + v + " != " + P), Mn(g, ne, le, { unsafe: !0, mt: b });
  }
  function Cs(p, T) {
    var v = T || {}, g = [], E = [], w = M(1), k = v.compression ? 8 : 0, b = 0, R = 0, I = 0, P = 0, z = 0, Z = p.FullPaths[0], ne = Z, Y = p.FileIndex[0], re = [], le = 0;
    for (R = 1; R < p.FullPaths.length; ++R)
      if (ne = p.FullPaths[R].slice(Z.length), Y = p.FileIndex[R], !(!Y.size || !Y.content || ne == "Sh33tJ5")) {
        var Ae = P, ye = M(ne.length);
        for (I = 0; I < ne.length; ++I)
          ye.write_shift(1, ne.charCodeAt(I) & 127);
        ye = ye.slice(0, ye.l), re[z] = Ul.buf(
          /*::((*/
          Y.content,
          0
        );
        var $e = Y.content;
        k == 8 && ($e = C($e)), w = M(30), w.write_shift(4, 67324752), w.write_shift(2, 20), w.write_shift(2, b), w.write_shift(2, k), Y.mt ? i(w, Y.mt) : w.write_shift(4, 0), w.write_shift(-4, re[z]), w.write_shift(4, $e.length), w.write_shift(
          4,
          /*::(*/
          Y.content.length
        ), w.write_shift(2, ye.length), w.write_shift(2, 0), P += w.length, g.push(w), P += ye.length, g.push(ye), P += $e.length, g.push($e), w = M(46), w.write_shift(4, 33639248), w.write_shift(2, 0), w.write_shift(2, 20), w.write_shift(2, b), w.write_shift(2, k), w.write_shift(4, 0), w.write_shift(-4, re[z]), w.write_shift(4, $e.length), w.write_shift(
          4,
          /*::(*/
          Y.content.length
        ), w.write_shift(2, ye.length), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(4, 0), w.write_shift(4, Ae), le += w.l, E.push(w), le += ye.length, E.push(ye), ++z;
      }
    return w = M(22), w.write_shift(4, 101010256), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, z), w.write_shift(2, z), w.write_shift(4, le), w.write_shift(4, P), w.write_shift(2, 0), Ve([Ve(g), Ve(E), w]);
  }
  var Jt = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Os(p, T) {
    if (p.ctype)
      return p.ctype;
    var v = p.name || "", g = v.match(/\.([^\.]+)$/);
    return g && Jt[g[1]] || T && (g = (v = T).match(/[\.\\]([^\.\\])+$/), g && Jt[g[1]]) ? Jt[g[1]] : "application/octet-stream";
  }
  function Ds(p) {
    for (var T = bt(p), v = [], g = 0; g < T.length; g += 76)
      v.push(T.slice(g, g + 76));
    return v.join(`\r
`) + `\r
`;
  }
  function Rs(p) {
    var T = p.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(I) {
      var P = I.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (P.length == 1 ? "0" + P : P);
    });
    T = T.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), T.charAt(0) == `
` && (T = "=0D" + T.slice(1)), T = T.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var v = [], g = T.split(`\r
`), E = 0; E < g.length; ++E) {
      var w = g[E];
      if (w.length == 0) {
        v.push("");
        continue;
      }
      for (var k = 0; k < w.length; ) {
        var b = 76, R = w.slice(k, k + b);
        R.charAt(b - 1) == "=" ? b-- : R.charAt(b - 2) == "=" ? b -= 2 : R.charAt(b - 3) == "=" && (b -= 3), R = w.slice(k, k + b), k += b, k < w.length && (R += "="), v.push(R);
      }
    }
    return v.join(`\r
`);
  }
  function ks(p) {
    for (var T = [], v = 0; v < p.length; ++v) {
      for (var g = p[v]; v <= p.length && g.charAt(g.length - 1) == "="; )
        g = g.slice(0, g.length - 1) + p[++v];
      T.push(g);
    }
    for (var E = 0; E < T.length; ++E)
      T[E] = T[E].replace(/[=][0-9A-Fa-f]{2}/g, function(w) {
        return String.fromCharCode(parseInt(w.slice(1), 16));
      });
    return gr(T.join(`\r
`));
  }
  function Is(p, T, v) {
    for (var g = "", E = "", w = "", k, b = 0; b < 10; ++b) {
      var R = T[b];
      if (!R || R.match(/^\s*$/))
        break;
      var I = R.match(/^(.*?):\s*([^\s].*)$/);
      if (I)
        switch (I[1].toLowerCase()) {
          case "content-location":
            g = I[2].trim();
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
        k = gr(Ir(T.slice(b).join("")));
        break;
      case "quoted-printable":
        k = ks(T.slice(b));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + E);
    }
    var P = Mn(p, g.slice(v.length), k, { unsafe: !0 });
    w && (P.ctype = w);
  }
  function Ns(p, T) {
    if (Pe(p.slice(0, 13)).toLowerCase() != "mime-version:")
      throw new Error("Unsupported MAD header");
    var v = T && T.root || "", g = (de && Buffer.isBuffer(p) ? p.toString("binary") : Pe(p)).split(`\r
`), E = 0, w = "";
    for (E = 0; E < g.length; ++E)
      if (w = g[E], !!/^Content-Location:/i.test(w) && (w = w.slice(w.indexOf("file")), v || (v = w.slice(0, w.lastIndexOf("/") + 1)), w.slice(0, v.length) != v))
        for (; v.length > 0 && (v = v.slice(0, v.length - 1), v = v.slice(0, v.lastIndexOf("/") + 1), w.slice(0, v.length) != v); )
          ;
    var k = (g[1] || "").match(/boundary="(.*?)"/);
    if (!k)
      throw new Error("MAD cannot find boundary");
    var b = "--" + (k[1] || ""), R = [], I = [], P = {
      FileIndex: R,
      FullPaths: I
    };
    D(P);
    var z, Z = 0;
    for (E = 0; E < g.length; ++E) {
      var ne = g[E];
      ne !== b && ne !== b + "--" || (Z++ && Is(P, g.slice(z, E), v), z = E);
    }
    return P;
  }
  function Ps(p, T) {
    var v = T || {}, g = v.boundary || "SheetJS";
    g = "------=" + g;
    for (var E = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + g.slice(2) + '"',
      "",
      "",
      ""
    ], w = p.FullPaths[0], k = w, b = p.FileIndex[0], R = 1; R < p.FullPaths.length; ++R)
      if (k = p.FullPaths[R].slice(w.length), b = p.FileIndex[R], !(!b.size || !b.content || k == "Sh33tJ5")) {
        k = k.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(le) {
          return "_x" + le.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(le) {
          return "_u" + le.charCodeAt(0).toString(16) + "_";
        });
        for (var I = b.content, P = de && Buffer.isBuffer(I) ? I.toString("binary") : Pe(I), z = 0, Z = Math.min(1024, P.length), ne = 0, Y = 0; Y <= Z; ++Y)
          (ne = P.charCodeAt(Y)) >= 32 && ne < 128 && ++z;
        var re = z >= Z * 4 / 5;
        E.push(g), E.push("Content-Location: " + (v.root || "file:///C:/SheetJS/") + k), E.push("Content-Transfer-Encoding: " + (re ? "quoted-printable" : "base64")), E.push("Content-Type: " + Os(b, k)), E.push(""), E.push(re ? Rs(P) : Ds(P));
      }
    return E.push(g + `--\r
`), E.join(`\r
`);
  }
  function Ls(p) {
    var T = {};
    return D(T, p), T;
  }
  function Mn(p, T, v, g) {
    var E = g && g.unsafe;
    E || D(p);
    var w = !E && Ee.find(p, T);
    if (!w) {
      var k = p.FullPaths[0];
      T.slice(0, k.length) == k ? k = T : (k.slice(-1) != "/" && (k += "/"), k = (k + T).replace("//", "/")), w = { name: a(T), type: 2 }, p.FileIndex.push(w), p.FullPaths.push(k), E || Ee.utils.cfb_gc(p);
    }
    return w.content = v, w.size = v ? v.length : 0, g && (g.CLSID && (w.clsid = g.CLSID), g.mt && (w.mt = g.mt), g.ct && (w.ct = g.ct)), w;
  }
  function Bs(p, T) {
    D(p);
    var v = Ee.find(p, T);
    if (v) {
      for (var g = 0; g < p.FileIndex.length; ++g)
        if (p.FileIndex[g] == v)
          return p.FileIndex.splice(g, 1), p.FullPaths.splice(g, 1), !0;
    }
    return !1;
  }
  function Ms(p, T, v) {
    D(p);
    var g = Ee.find(p, T);
    if (g) {
      for (var E = 0; E < p.FileIndex.length; ++E)
        if (p.FileIndex[E] == g)
          return p.FileIndex[E].name = a(v), p.FullPaths[E] = v, !0;
    }
    return !1;
  }
  function bs(p) {
    B(p, !0);
  }
  return t.find = G, t.read = ee, t.parse = c, t.write = cr, t.writeFile = pr, t.utils = {
    cfb_new: Ls,
    cfb_add: Mn,
    cfb_del: Bs,
    cfb_mov: Ms,
    cfb_gc: bs,
    ReadShift: It,
    CheckField: Ei,
    prep_blob: ar,
    bconcat: Ve,
    use_zlib: S,
    _deflateRaw: D0,
    _inflateRaw: L0,
    consts: De
  }, t;
}();
function Hl(e) {
  return typeof e == "string" ? Fn(e) : Array.isArray(e) ? hl(e) : e;
}
function jt(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string")
      switch (r) {
        case "utf8":
          t = new TextEncoder(r).encode(t);
          break;
        case "binary":
          t = Fn(t);
          break;
        default:
          throw new Error("Unsupported encoding " + r);
      }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? Or(t) : t;
  if (typeof IE_SaveFile < "u")
    return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([Hl(n)], { type: "application/octet-stream" });
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
      return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = Xt(t)), f.write(t), f.close(), t;
    } catch (o) {
      if (!o.message || !o.message.match(/onstruct/))
        throw o;
    }
  throw new Error("cannot save file " + e);
}
function je(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n)
    Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function ea(e, t) {
  for (var r = [], n = je(e), a = 0; a !== n.length; ++a)
    r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function o0(e) {
  for (var t = [], r = je(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = r[n];
  return t;
}
function Dn(e) {
  for (var t = [], r = je(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function Wl(e) {
  for (var t = [], r = je(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var pn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function er(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  t && (r -= 1462 * 24 * 60 * 60 * 1e3);
  var n = /* @__PURE__ */ pn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ pn.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var ai = /* @__PURE__ */ new Date(), Vl = /* @__PURE__ */ pn.getTime() + (/* @__PURE__ */ ai.getTimezoneOffset() - /* @__PURE__ */ pn.getTimezoneOffset()) * 6e4, ra = /* @__PURE__ */ ai.getTimezoneOffset();
function ii(e) {
  var t = new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + Vl), t.getTimezoneOffset() !== ra && t.setTime(t.getTime() + (t.getTimezoneOffset() - ra) * 6e4), t;
}
var ta = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), si = /* @__PURE__ */ isNaN(/* @__PURE__ */ ta.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : ta, Gl = /* @__PURE__ */ si.getFullYear() == 2017;
function Ze(e, t) {
  var r = new Date(e);
  if (Gl)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date)
    return e;
  if (si.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function Rn(e, t) {
  if (de && Buffer.isBuffer(e)) {
    if (t) {
      if (e[0] == 255 && e[1] == 254)
        return Or(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255)
        return Or(ul(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u")
    try {
      if (t) {
        if (e[0] == 255 && e[1] == 254)
          return Or(new TextDecoder("utf-16le").decode(e.slice(2)));
        if (e[0] == 254 && e[1] == 255)
          return Or(new TextDecoder("utf-16be").decode(e.slice(2)));
      }
      var r = {
        "€": "",
        "‚": "",
        ƒ: "",
        "„": "",
        "…": "",
        "†": "",
        "‡": "",
        "ˆ": "",
        "‰": "",
        Š: "",
        "‹": "",
        Œ: "",
        Ž: "",
        "‘": "",
        "’": "",
        "“": "",
        "”": "",
        "•": "",
        "–": "",
        "—": "",
        "˜": "",
        "™": "",
        š: "",
        "›": "",
        œ: "",
        ž: "",
        Ÿ: ""
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
function rr(e) {
  if (typeof JSON < "u" && !Array.isArray(e))
    return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null)
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = rr(e[r]));
  return t;
}
function Ce(e, t) {
  for (var r = ""; r.length < t; )
    r += e;
  return r;
}
function Rr(e) {
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
var Xl = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Ut(e) {
  var t = new Date(e), r = new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i))
    return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Xl.indexOf(s) == -1)
      return r;
  } else if (s.match(/[a-z]/))
    return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
function ce(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return de ? n = Pr(r) : n = xl(r), Ee.utils.cfb_add(e, t, n);
    }
    Ee.utils.cfb_add(e, t, r);
  } else
    e.file(t, r);
}
function c0() {
  return Ee.utils.cfb_new();
}
var Ie = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, jl = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, u0 = /* @__PURE__ */ o0(jl), h0 = /[&<>'"]/g, $l = /[\u0000-\u0008\u000b-\u001f]/g;
function ge(e) {
  var t = e + "";
  return t.replace(h0, function(r) {
    return u0[r];
  }).replace($l, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function na(e) {
  return ge(e).replace(/ /g, "_x0020_");
}
var fi = /[\u0000-\u001f]/g;
function zl(e) {
  var t = e + "";
  return t.replace(h0, function(r) {
    return u0[r];
  }).replace(/\n/g, "<br/>").replace(fi, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function Kl(e) {
  var t = e + "";
  return t.replace(h0, function(r) {
    return u0[r];
  }).replace(fi, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function Yl(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function ql(e) {
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
function Vn(e) {
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
function aa(e) {
  var t = Zr(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function ia(e) {
  return Pr(e, "binary").toString("utf8");
}
var rn = "foo bar bazâð£", kt = de && (/* @__PURE__ */ ia(rn) == /* @__PURE__ */ Vn(rn) && ia || /* @__PURE__ */ aa(rn) == /* @__PURE__ */ Vn(rn) && aa) || Vn, Or = de ? function(e) {
  return Pr(e, "utf8").toString("binary");
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
}, Jl = /* @__PURE__ */ function() {
  var e = [
    ["nbsp", " "],
    ["middot", "·"],
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
}(), li = /(^\s|\s$|\n)/;
function Ge(e, t) {
  return "<" + e + (t.match(li) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function Ht(e) {
  return je(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function q(e, t, r) {
  return "<" + e + (r != null ? Ht(r) : "") + (t != null ? (t.match(li) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function Qn(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t)
      throw r;
  }
  return "";
}
function Zl(e, t) {
  switch (typeof e) {
    case "string":
      var r = q("vt:lpwstr", ge(e));
      return t && (r = r.replace(/&quot;/g, "_x0022_")), r;
    case "number":
      return q((e | 0) == e ? "vt:i4" : "vt:r8", ge(String(e)));
    case "boolean":
      return q("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date)
    return q("vt:filetime", Qn(e));
  throw new Error("Unable to serialize " + e);
}
var Be = {
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
}, Tt = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], ir = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function Ql(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i)
    a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function eo(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256)
    e[r + f] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var sa = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n)
    if (e[0][n])
      for (var a = 0, i = e[0][n].length; a < i; a += r)
        t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, fa = de ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Pr(t);
  })) : sa(e);
} : sa, la = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2)
    n.push(String.fromCharCode(Dt(e, a)));
  return n.join("").replace(Rt, "");
}, x0 = de ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(Rt, "") : la(e, t, r);
} : la, oa = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a)
    n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, oi = de ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : oa(e, t, r);
} : oa, ca = function(e, t, r) {
  for (var n = [], a = t; a < r; a++)
    n.push(String.fromCharCode(ct(e, a)));
  return n.join("");
}, $t = de ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : ca(t, r, n);
} : ca, ci = function(e, t) {
  var r = sr(e, t);
  return r > 0 ? $t(e, t + 4, t + 4 + r - 1) : "";
}, ui = ci, hi = function(e, t) {
  var r = sr(e, t);
  return r > 0 ? $t(e, t + 4, t + 4 + r - 1) : "";
}, xi = hi, di = function(e, t) {
  var r = 2 * sr(e, t);
  return r > 0 ? $t(e, t + 4, t + 4 + r - 1) : "";
}, pi = di, vi = function(t, r) {
  var n = sr(t, r);
  return n > 0 ? x0(t, r + 4, r + 4 + n) : "";
}, mi = vi, gi = function(e, t) {
  var r = sr(e, t);
  return r > 0 ? $t(e, t + 4, t + 4 + r) : "";
}, _i = gi, Ti = function(e, t) {
  return Ql(e, t);
}, vn = Ti, d0 = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
de && (ui = function(t, r) {
  if (!Buffer.isBuffer(t))
    return ci(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, xi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return hi(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, pi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return di(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, mi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return vi(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, _i = function(t, r) {
  if (!Buffer.isBuffer(t))
    return gi(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, vn = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : Ti(t, r);
}, d0 = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var ct = function(e, t) {
  return e[t];
}, Dt = function(e, t) {
  return e[t + 1] * (1 << 8) + e[t];
}, ro = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, sr = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, qr = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, to = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function It(e, t) {
  var r = "", n, a, i = [], s, f, o, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, de && Buffer.isBuffer(this))
        r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else
        for (o = 0; o < e; ++o)
          r += String.fromCharCode(Dt(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = $t(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = x0(this, this.l, this.l + e);
      break;
    case "wstr":
      return It.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = ui(this, this.l), e = 4 + sr(this, this.l);
      break;
    case "lpstr-cp":
      r = xi(this, this.l), e = 4 + sr(this, this.l);
      break;
    case "lpwstr":
      r = pi(this, this.l), e = 4 + 2 * sr(this, this.l);
      break;
    case "lpp4":
      e = 4 + sr(this, this.l), r = mi(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + sr(this, this.l), r = _i(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = ct(this, this.l + e++)) !== 0; )
        i.push(Zt(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = Dt(this, this.l + e)) !== 0; )
        i.push(Zt(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, o = 0; o < e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = ct(this, l), this.l = l + 1, f = It.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Zt(Dt(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, o = 0; o != e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = ct(this, l), this.l = l + 1, f = It.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Zt(ct(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = ct(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? ro : Dt)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? qr : to)(this, this.l), this.l += 4, n) : (a = sr(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = vn(this, this.l) : a = vn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = oi(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var no = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, ao = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, io = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function so(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a)
      io(this, t.charCodeAt(a), this.l + 2 * a);
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
        n = 4, no(this, t, this.l);
        break;
      case 8:
        if (n = 8, r === "f") {
          eo(this, t, this.l);
          break;
        }
      case 16:
        break;
      case -4:
        n = 4, ao(this, t, this.l);
        break;
    }
  return this.l += n, this;
}
function Ei(e, t) {
  var r = oi(this, this.l, e.length >> 1);
  if (r !== e)
    throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function ar(e, t) {
  e.l = t, e.read_shift = /*::(*/
  It, e.chk = Ei, e.write_shift = so;
}
function Ar(e, t) {
  e.l += t;
}
function M(e) {
  var t = Zr(e);
  return ar(t, 0), t;
}
function Qe() {
  var e = [], t = de ? 256 : 2048, r = function(l) {
    var c = M(l);
    return ar(c, 0), c;
  }, n = r(t), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(l) {
    return n && l < n.length - n.l ? n : (a(), n = r(Math.max(l + 1, t)));
  }, s = function() {
    return a(), Ve(e);
  }, f = function(l) {
    a(), n = l, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function H(e, t, r, n) {
  var a = +t, i;
  if (!isNaN(a)) {
    n || (n = e2[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
    var s = e.next(i);
    a <= 127 ? s.write_shift(1, a) : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var f = 0; f != 4; ++f)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    /*:: length != null &&*/
    n > 0 && d0(r) && e.push(r);
  }
}
function Nt(e, t, r) {
  var n = rr(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; )
      n.c -= 256;
    for (; n.r >= 65536; )
      n.r -= 65536;
  }
  return n;
}
function ua(e, t, r) {
  var n = rr(e);
  return n.s = Nt(n.s, t.s, r), n.e = Nt(n.e, t.s, r), n;
}
function Pt(e, t) {
  if (e.cRel && e.c < 0)
    for (e = rr(e); e.c < 0; )
      e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = rr(e); e.r < 0; )
      e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = _e(e);
  return !e.cRel && e.cRel != null && (r = oo(r)), !e.rRel && e.rRel != null && (r = fo(r)), r;
}
function Gn(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + ze(e.s.c) + ":" + (e.e.cRel ? "" : "$") + ze(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Xe(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Xe(e.e.r) : Pt(e.s, t.biff) + ":" + Pt(e.e, t.biff);
}
function p0(e) {
  return parseInt(lo(e), 10) - 1;
}
function Xe(e) {
  return "" + (e + 1);
}
function fo(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function lo(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function v0(e) {
  for (var t = co(e), r = 0, n = 0; n !== t.length; ++n)
    r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function ze(e) {
  if (e < 0)
    throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26))
    t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function oo(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function co(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function uo(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function Me(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function _e(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0)
    r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function lr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: Me(e), e: Me(e) } : { s: Me(e.slice(0, t)), e: Me(e.slice(t + 1)) };
}
function ke(e, t) {
  return typeof t > "u" || typeof t == "number" ? ke(e.s, e.e) : (typeof e != "string" && (e = _e(e)), typeof t != "string" && (t = _e(t)), e == t ? e : e + ":" + t);
}
function Se(e) {
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
function ha(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null)
    try {
      return e.w = Vr(e.z, r ? er(t) : t);
    } catch {
    }
  try {
    return e.w = Vr((e.XF || {}).numFmtId || (r ? 14 : 0), r ? er(t) : t);
  } catch {
    return "" + t;
  }
}
function Nr(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? zt[e.v] || e.v : t == null ? ha(e, e.v) : ha(e, t));
}
function rt(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function wi(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var o = typeof n.origin == "string" ? Me(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = Se(i["!ref"]);
    l.s.c = c.s.c, l.s.r = c.s.r, l.e.c = Math.max(l.e.c, c.e.c), l.e.r = Math.max(l.e.r, c.e.r), s == -1 && (l.e.r = s = c.e.r + 1);
  }
  for (var h = 0; h != t.length; ++h)
    if (t[h]) {
      if (!Array.isArray(t[h]))
        throw new Error("aoa_to_sheet expects an array of arrays");
      for (var u = 0; u != t[h].length; ++u)
        if (!(typeof t[h][u] > "u")) {
          var d = { v: t[h][u] }, _ = s + h, x = f + u;
          if (l.s.r > _ && (l.s.r = _), l.s.c > x && (l.s.c = x), l.e.r < _ && (l.e.r = _), l.e.c < x && (l.e.c = x), t[h][u] && typeof t[h][u] == "object" && !Array.isArray(t[h][u]) && !(t[h][u] instanceof Date))
            d = t[h][u];
          else if (Array.isArray(d.v) && (d.f = t[h][u][1], d.v = d.v[0]), d.v === null)
            if (d.f)
              d.t = "n";
            else if (n.nullError)
              d.t = "e", d.v = 0;
            else if (n.sheetStubs)
              d.t = "z";
            else
              continue;
          else
            typeof d.v == "number" ? d.t = "n" : typeof d.v == "boolean" ? d.t = "b" : d.v instanceof Date ? (d.z = n.dateNF || Oe[14], n.cellDates ? (d.t = "d", d.w = Vr(d.z, er(d.v))) : (d.t = "n", d.v = er(d.v), d.w = Vr(d.z, d.v))) : d.t = "s";
          if (a)
            i[_] || (i[_] = []), i[_][x] && i[_][x].z && (d.z = i[_][x].z), i[_][x] = d;
          else {
            var m = _e({ c: x, r: _ });
            i[m] && i[m].z && (d.z = i[m].z), i[m] = d;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = ke(l)), i;
}
function Et(e, t) {
  return wi(null, e, t);
}
function ho(e) {
  return e.read_shift(4, "i");
}
function Tr(e, t) {
  return t || (t = M(4)), t.write_shift(4, e), t;
}
function Ke(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function be(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function xo(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function po(e, t) {
  return t || (t = M(4)), t.write_shift(2, e.ich || 0), t.write_shift(2, e.ifnt || 0), t;
}
function m0(e, t) {
  var r = e.l, n = e.read_shift(1), a = Ke(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var f = e.read_shift(4), o = 0; o != f; ++o)
      i.push(xo(e));
    s.r = i;
  } else
    s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function vo(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(15 + 4 * e.t.length)), t.write_shift(1, 0), be(e.t, t), r ? t.slice(0, t.l) : t;
}
var mo = m0;
function go(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(23 + 4 * e.t.length)), t.write_shift(1, 1), be(e.t, t), t.write_shift(4, 1), po({ ich: 0, ifnt: 0 }, t), r ? t.slice(0, t.l) : t;
}
function dr(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function tt(e, t) {
  return t == null && (t = M(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function nt(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function at(e, t) {
  return t == null && (t = M(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var _o = Ke, Si = be;
function g0(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function mn(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var To = Ke, e0 = g0, _0 = mn;
function Ai(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? vn([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : qr(t, 0) >> 2;
  return r ? a / 100 : a;
}
function yi(e, t) {
  t == null && (t = M(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -(1 << 29) && a < 1 << 29 && (n = 1, r = 1), n)
    t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else
    throw new Error("unsupported RkNumber " + e);
}
function Fi(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function Eo(e, t) {
  return t || (t = M(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var it = Fi, wt = Eo;
function St(e) {
  if (e.length - e.l < 8)
    throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Qr(e, t) {
  return (t || M(8)).write_shift(8, e, "f");
}
function wo(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), o = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var l = ko[a];
      l && (t.rgb = Sa(l));
      break;
    case 2:
      t.rgb = Sa([s, f, o]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function gn(e, t) {
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
function So(e) {
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
function Ao(e, t) {
  t || (t = M(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
var Ci = 2, nr = 3, tn = 11, _n = 19, nn = 64, yo = 65, Fo = 71, Co = 4108, Oo = 4126, We = 80, xa = {
  /*::[*/
  1: { n: "CodePage", t: Ci },
  /*::[*/
  2: { n: "Category", t: We },
  /*::[*/
  3: { n: "PresentationFormat", t: We },
  /*::[*/
  4: { n: "ByteCount", t: nr },
  /*::[*/
  5: { n: "LineCount", t: nr },
  /*::[*/
  6: { n: "ParagraphCount", t: nr },
  /*::[*/
  7: { n: "SlideCount", t: nr },
  /*::[*/
  8: { n: "NoteCount", t: nr },
  /*::[*/
  9: { n: "HiddenCount", t: nr },
  /*::[*/
  10: { n: "MultimediaClipCount", t: nr },
  /*::[*/
  11: { n: "ScaleCrop", t: tn },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: Co
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: Oo
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: We },
  /*::[*/
  15: { n: "Company", t: We },
  /*::[*/
  16: { n: "LinksUpToDate", t: tn },
  /*::[*/
  17: { n: "CharacterCount", t: nr },
  /*::[*/
  19: { n: "SharedDoc", t: tn },
  /*::[*/
  22: { n: "HyperlinksChanged", t: tn },
  /*::[*/
  23: { n: "AppVersion", t: nr, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: yo },
  /*::[*/
  26: { n: "ContentType", t: We },
  /*::[*/
  27: { n: "ContentStatus", t: We },
  /*::[*/
  28: { n: "Language", t: We },
  /*::[*/
  29: { n: "Version", t: We },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: _n },
  /*::[*/
  2147483651: { n: "Behavior", t: _n },
  /*::[*/
  1919054434: {}
}, da = {
  /*::[*/
  1: { n: "CodePage", t: Ci },
  /*::[*/
  2: { n: "Title", t: We },
  /*::[*/
  3: { n: "Subject", t: We },
  /*::[*/
  4: { n: "Author", t: We },
  /*::[*/
  5: { n: "Keywords", t: We },
  /*::[*/
  6: { n: "Comments", t: We },
  /*::[*/
  7: { n: "Template", t: We },
  /*::[*/
  8: { n: "LastAuthor", t: We },
  /*::[*/
  9: { n: "RevNumber", t: We },
  /*::[*/
  10: { n: "EditTime", t: nn },
  /*::[*/
  11: { n: "LastPrinted", t: nn },
  /*::[*/
  12: { n: "CreatedDate", t: nn },
  /*::[*/
  13: { n: "ModifiedDate", t: nn },
  /*::[*/
  14: { n: "PageCount", t: nr },
  /*::[*/
  15: { n: "WordCount", t: nr },
  /*::[*/
  16: { n: "CharCount", t: nr },
  /*::[*/
  17: { n: "Thumbnail", t: Fo },
  /*::[*/
  18: { n: "Application", t: We },
  /*::[*/
  19: { n: "DocSecurity", t: nr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: _n },
  /*::[*/
  2147483651: { n: "Behavior", t: _n },
  /*::[*/
  1919054434: {}
};
function Do(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var Ro = /* @__PURE__ */ Do([
  /* Color Constants */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  /* Overridable Defaults */
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
  /* Other entries to appease BIFF8/12 */
  16777215,
  /* 0x40 icvForeground ?? */
  0,
  /* 0x41 icvBackground ?? */
  0,
  /* 0x42 icvFrame ?? */
  0,
  /* 0x43 icv3D ?? */
  0,
  /* 0x44 icv3DText ?? */
  0,
  /* 0x45 icv3DHilite ?? */
  0,
  /* 0x46 icv3DShadow ?? */
  0,
  /* 0x47 icvHilite ?? */
  0,
  /* 0x48 icvCtlText ?? */
  0,
  /* 0x49 icvCtlScrl ?? */
  0,
  /* 0x4A icvCtlInv ?? */
  0,
  /* 0x4B icvCtlBody ?? */
  0,
  /* 0x4C icvCtlFrame ?? */
  0,
  /* 0x4D icvCtlFore ?? */
  0,
  /* 0x4E icvCtlBack ?? */
  0,
  /* 0x4F icvCtlNeutral */
  0,
  /* 0x50 icvInfoBk ?? */
  0
  /* 0x51 icvInfoText ?? */
]), ko = /* @__PURE__ */ rr(Ro), zt = {
  /*::[*/
  0: "#NULL!",
  /*::[*/
  7: "#DIV/0!",
  /*::[*/
  15: "#VALUE!",
  /*::[*/
  23: "#REF!",
  /*::[*/
  29: "#NAME?",
  /*::[*/
  36: "#NUM!",
  /*::[*/
  42: "#N/A",
  /*::[*/
  43: "#GETTING_DATA",
  /*::[*/
  255: "#WTF?"
}, Io = {
  /* Workbook */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
  "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
  /* Worksheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
  "application/vnd.ms-excel.worksheet": "sheets",
  "application/vnd.ms-excel.binIndexWs": "TODO",
  /* Binary Index */
  /* Chartsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
  "application/vnd.ms-excel.chartsheet": "charts",
  /* Macrosheet */
  "application/vnd.ms-excel.macrosheet+xml": "macros",
  "application/vnd.ms-excel.macrosheet": "macros",
  "application/vnd.ms-excel.intlmacrosheet": "TODO",
  "application/vnd.ms-excel.binIndexMs": "TODO",
  /* Binary Index */
  /* Dialogsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
  "application/vnd.ms-excel.dialogsheet": "dialogs",
  /* Shared Strings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
  "application/vnd.ms-excel.sharedStrings": "strs",
  /* Styles */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
  "application/vnd.ms-excel.styles": "styles",
  /* File Properties */
  "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
  /* Custom Data Properties */
  "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
  /* Comments */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
  "application/vnd.ms-excel.comments": "comments",
  "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
  "application/vnd.ms-excel.person+xml": "people",
  /* Metadata (Stock/Geography and Dynamic Array) */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
  "application/vnd.ms-excel.sheetMetadata": "metadata",
  /* PivotTable */
  "application/vnd.ms-excel.pivotTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
  /* Chart Objects */
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
  /* Chart Colors */
  "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
  /* Chart Style */
  "application/vnd.ms-office.chartstyle+xml": "TODO",
  /* Chart Advanced */
  "application/vnd.ms-office.chartex+xml": "TODO",
  /* Calculation Chain */
  "application/vnd.ms-excel.calcChain": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
  /* Printer Settings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
  /* ActiveX */
  "application/vnd.ms-office.activeX": "TODO",
  "application/vnd.ms-office.activeX+xml": "TODO",
  /* Custom Toolbars */
  "application/vnd.ms-excel.attachedToolbars": "TODO",
  /* External Data Connections */
  "application/vnd.ms-excel.connections": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
  /* External Links */
  "application/vnd.ms-excel.externalLink": "links",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
  /* PivotCache */
  "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
  "application/vnd.ms-excel.pivotCacheRecords": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
  /* Query Table */
  "application/vnd.ms-excel.queryTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
  /* Shared Workbook */
  "application/vnd.ms-excel.userNames": "TODO",
  "application/vnd.ms-excel.revisionHeaders": "TODO",
  "application/vnd.ms-excel.revisionLog": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
  /* Single Cell Table */
  "application/vnd.ms-excel.tableSingleCells": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
  /* Slicer */
  "application/vnd.ms-excel.slicer": "TODO",
  "application/vnd.ms-excel.slicerCache": "TODO",
  "application/vnd.ms-excel.slicer+xml": "TODO",
  "application/vnd.ms-excel.slicerCache+xml": "TODO",
  /* Sort Map */
  "application/vnd.ms-excel.wsSortMap": "TODO",
  /* Table */
  "application/vnd.ms-excel.table": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
  /* Themes */
  "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
  /* Theme Override */
  "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
  /* Timeline */
  "application/vnd.ms-excel.Timeline+xml": "TODO",
  /* verify */
  "application/vnd.ms-excel.TimelineCache+xml": "TODO",
  /* verify */
  /* VBA */
  "application/vnd.ms-office.vbaProject": "vba",
  "application/vnd.ms-office.vbaProjectSignature": "TODO",
  /* Volatile Dependencies */
  "application/vnd.ms-office.volatileDependencies": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
  /* Control Properties */
  "application/vnd.ms-excel.controlproperties+xml": "TODO",
  /* Data Model */
  "application/vnd.openxmlformats-officedocument.model+data": "TODO",
  /* Survey */
  "application/vnd.ms-excel.Survey+xml": "TODO",
  /* Drawing */
  "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
  /* VML */
  "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
  "application/vnd.openxmlformats-package.relationships+xml": "rels",
  "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
  /* Image */
  "image/png": "TODO",
  sheet: "js"
}, an = {
  workbooks: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
    xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
  },
  strs: {
    /* Shared Strings */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
    xlsb: "application/vnd.ms-excel.sharedStrings"
  },
  comments: {
    /* Comments */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
    xlsb: "application/vnd.ms-excel.comments"
  },
  sheets: {
    /* Worksheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    xlsb: "application/vnd.ms-excel.worksheet"
  },
  charts: {
    /* Chartsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
    xlsb: "application/vnd.ms-excel.chartsheet"
  },
  dialogs: {
    /* Dialogsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
    xlsb: "application/vnd.ms-excel.dialogsheet"
  },
  macros: {
    /* Macrosheet (Excel 4.0 Macros) */
    xlsx: "application/vnd.ms-excel.macrosheet+xml",
    xlsb: "application/vnd.ms-excel.macrosheet"
  },
  metadata: {
    /* Metadata (Stock/Geography and Dynamic Array) */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
    xlsb: "application/vnd.ms-excel.sheetMetadata"
  },
  styles: {
    /* Styles */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
    xlsb: "application/vnd.ms-excel.styles"
  }
};
function Oi() {
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
function Di(e, t) {
  var r = Wl(Io), n = [], a;
  n[n.length] = Ie, n[n.length] = q("Types", null, {
    xmlns: Be.CT,
    "xmlns:xsd": Be.xsd,
    "xmlns:xsi": Be.xsi
  }), n = n.concat([
    ["xml", "application/xml"],
    ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
    ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
    ["data", "application/vnd.openxmlformats-officedocument.model+data"],
    /* from test files */
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
  ].map(function(o) {
    return q("Default", null, { Extension: o[0], ContentType: o[1] });
  }));
  var i = function(o) {
    e[o] && e[o].length > 0 && (a = e[o][0], n[n.length] = q("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: an[o][t.bookType] || an[o].xlsx
    }));
  }, s = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = q("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: an[o][t.bookType] || an[o].xlsx
      });
    });
  }, f = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = q("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: r[o][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var xe = {
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
function Ri(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function xt(e) {
  var t = [Ie, q("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: Be.RELS
  })];
  return je(e["!id"]).forEach(function(r) {
    t[t.length] = q("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function me(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0)
    for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
      ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, i ? a.TargetMode = i : [xe.HLINK, xe.XPATH, xe.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id])
    throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
function No(e) {
  var t = [Ie];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r)
    t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function pa(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Po(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Lo(e) {
  var t = [Ie];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(pa(e[r][0], e[r][1])), t.push(Po("", e[r][0]));
  return t.push(pa("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function ki() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + un.version + "</meta:generator></office:meta></office:document-meta>";
}
var Jr = [
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
function Xn(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = ge(t), n[n.length] = r ? q(e, t, r) : Ge(e, t));
}
function Ii(e, t) {
  var r = t || {}, n = [Ie, q("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": Be.CORE_PROPS,
    "xmlns:dc": Be.dc,
    "xmlns:dcterms": Be.dcterms,
    "xmlns:dcmitype": Be.dcmitype,
    "xmlns:xsi": Be.xsi
  })], a = {};
  if (!e && !r.Props)
    return n.join("");
  e && (e.CreatedDate != null && Xn("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Qn(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && Xn("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Qn(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != Jr.length; ++i) {
    var s = Jr[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && Xn(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var dt = [
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
], Ni = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Pi(e) {
  var t = [], r = q;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = Ie, t[t.length] = q("Properties", null, {
    xmlns: Be.EXT_PROPS,
    "xmlns:vt": Be.vt
  }), dt.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = ge(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + ge(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Li(e) {
  var t = [Ie, q("Properties", null, {
    xmlns: Be.CUST_PROPS,
    "xmlns:vt": Be.vt
  })];
  if (!e)
    return t.join("");
  var r = 1;
  return je(e).forEach(function(a) {
    ++r, t[t.length] = q("property", Zl(e[a], !0), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: ge(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var va = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  /* TotalTime: 'TotalTime', */
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  /* Pages */
  /* Words */
  /* Characters */
  Category: "Category",
  /* PresentationFormat */
  Manager: "Manager",
  Company: "Company",
  /* Guid */
  /* HyperlinkBase */
  /* Bytes */
  /* Lines */
  /* Paragraphs */
  /* CharactersWithSpaces */
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  /* NOTE: missing from schema */
  Identifier: "Identifier",
  /* NOTE: missing from schema */
  Language: "Language"
  /* NOTE: missing from schema */
};
function Bo(e, t) {
  var r = [];
  return je(va).map(function(n) {
    for (var a = 0; a < Jr.length; ++a)
      if (Jr[a][1] == n)
        return Jr[a];
    for (a = 0; a < dt.length; ++a)
      if (dt[a][1] == n)
        return dt[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(Ge(va[n[1]] || n[1], a));
    }
  }), q("DocumentProperties", r.join(""), { xmlns: ir.o });
}
function Mo(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && je(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < Jr.length; ++s)
        if (i == Jr[s][1])
          return;
      for (s = 0; s < dt.length; ++s)
        if (i == dt[s][1])
          return;
      for (s = 0; s < r.length; ++s)
        if (i == r[s])
          return;
      var f = e[i], o = "string";
      typeof f == "number" ? (o = "float", f = String(f)) : f === !0 || f === !1 ? (o = "boolean", f = f ? "1" : "0") : f = String(f), a.push(q(na(i), f, { "dt:dt": o }));
    }
  }), t && je(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(q(na(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + ir.o + '">' + a.join("") + "</" + n + ">";
}
function bo(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = M(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function ma(e, t) {
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
      n = bo(t);
      break;
    case 31:
    case 80:
      for (n = M(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; )
        n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return Ve([r, n]);
}
var Bi = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function Uo(e) {
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
function ga(e, t, r) {
  var n = M(8), a = [], i = [], s = 8, f = 0, o = M(8), l = M(8);
  if (o.write_shift(4, 2), o.write_shift(4, 1200), l.write_shift(4, 1), i.push(o), a.push(l), s += 8 + o.length, !t) {
    l = M(8), l.write_shift(4, 0), a.unshift(l);
    var c = [M(4)];
    for (c[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var h = e[f][0];
      for (o = M(4 + 4 + 2 * (h.length + 1) + (h.length % 2 ? 0 : 2)), o.write_shift(4, f + 2), o.write_shift(4, h.length + 1), o.write_shift(0, h, "dbcs"); o.l != o.length; )
        o.write_shift(1, 0);
      c.push(o);
    }
    o = Ve(c), i.unshift(o), s += 8 + o.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(Bi.indexOf(e[f][0]) > -1 || Ni.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var u = e[f][1], d = 0;
      if (t) {
        d = +t[e[f][0]];
        var _ = r[d];
        if (_.p == "version" && typeof u == "string") {
          var x = u.split(".");
          u = (+x[0] << 16) + (+x[1] || 0);
        }
        o = ma(_.t, u);
      } else {
        var m = Uo(u);
        m == -1 && (m = 31, u = String(u)), o = ma(m, u);
      }
      i.push(o), l = M(8), l.write_shift(4, t ? d : 2 + f), a.push(l), s += 8 + o.length;
    }
  var O = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, O), O += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), Ve([n].concat(a).concat(i));
}
function _a(e, t, r, n, a, i) {
  var s = M(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, Ee.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var o = ga(e, r, n);
  if (f.push(o), a) {
    var l = ga(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + o.length), f.push(l);
  }
  return Ve(f);
}
function Ho(e, t) {
  t || (t = M(e));
  for (var r = 0; r < e; ++r)
    t.write_shift(1, 0);
  return t;
}
function Wo(e, t) {
  return e.read_shift(t) === 1;
}
function Je(e, t) {
  return t || (t = M(2)), t.write_shift(2, +!!e), t;
}
function Mi(e) {
  return e.read_shift(2, "u");
}
function xr(e, t) {
  return t || (t = M(2)), t.write_shift(2, e), t;
}
function bi(e, t, r) {
  return r || (r = M(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function Ui(e, t, r) {
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
function Vo(e) {
  var t = e.t || "", r = M(3 + 0);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = M(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return Ve(a);
}
function Go(e, t, r) {
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
function Xo(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : Go(e, n, r);
}
function jo(e, t, r) {
  if (r.biff > 5)
    return Xo(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Hi(e, t, r) {
  return r || (r = M(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function Ta(e, t) {
  t || (t = M(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function $o(e) {
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
    n = n.slice(1), Ta(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r)
      t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r)
      t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && Ta(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r)
      t.write_shift(1, parseInt(s[r], 16));
    for (var o = 0; n.slice(o * 3, o * 3 + 3) == "../" || n.slice(o * 3, o * 3 + 3) == "..\\"; )
      ++o;
    for (t.write_shift(2, o), t.write_shift(4, n.length - 3 * o + 1), r = 0; r < n.length - 3 * o; ++r)
      t.write_shift(1, n.charCodeAt(r + 3 * o) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r)
      t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function et(e, t, r, n) {
  return n || (n = M(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function zo(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function Ko(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function Wi(e, t) {
  return t || (t = M(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function T0(e, t, r) {
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
function Yo(e, t) {
  var r = !t || t.biff == 8, n = M(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; )
    n.write_shift(1, r ? 0 : 32);
  return n;
}
function qo(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = M(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function Jo(e, t) {
  var r = M(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a)
    n[a] = Vo(e[a]);
  var i = Ve([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function Zo() {
  var e = M(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Qo(e) {
  var t = M(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function ec(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = M(a);
  return i.write_shift(2, (e.sz || 12) * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function rc(e, t, r, n) {
  var a = M(10);
  return et(e, t, n, a), a.write_shift(4, r), a;
}
function tc(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = M(6 + 2 + +i + (1 + i) * r.length);
  return et(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function nc(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = M(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function ac(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = M(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function Ea(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = M(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function ic(e) {
  var t = M(8);
  return t.write_shift(4, 0), t.write_shift(2, e[0] ? e[0] + 1 : 0), t.write_shift(2, e[1] ? e[1] + 1 : 0), t;
}
function sc(e, t, r, n, a, i) {
  var s = M(8);
  return et(e, t, n, s), bi(r, i, s), s;
}
function fc(e, t, r, n) {
  var a = M(14);
  return et(e, t, n, a), Qr(r, a), a;
}
function lc(e, t, r) {
  if (r.biff < 8)
    return oc(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; )
    n.push(zo(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a)
    throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function oc(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = Ui(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function cc(e) {
  var t = M(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r)
    Wi(e[r], t);
  return t;
}
function uc(e) {
  var t = M(24), r = Me(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a)
    t.write_shift(1, parseInt(n[a], 16));
  return Ve([t, $o(e[1])]);
}
function hc(e) {
  var t = e[1].Tooltip, r = M(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = Me(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a)
    r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function xc(e) {
  return e || (e = M(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function dc(e, t, r) {
  if (!r.cellStyles)
    return Ar(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), o = e.read_shift(2);
  n == 2 && (e.l += 2);
  var l = { s: a, e: i, w: s, ixfe: f, flags: o };
  return (r.biff >= 5 || !r.biff) && (l.level = o >> 8 & 7), l;
}
function pc(e, t) {
  var r = M(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function vc(e) {
  for (var t = M(2 * e), r = 0; r < e; ++r)
    t.write_shift(2, r + 1);
  return t;
}
function mc(e, t, r) {
  var n = M(15);
  return Yt(n, e, t), n.write_shift(8, r, "f"), n;
}
function gc(e, t, r) {
  var n = M(9);
  return Yt(n, e, t), n.write_shift(2, r), n;
}
var _c = /* @__PURE__ */ function() {
  var e = {
    /* Code Pages Supported by Visual FoxPro */
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /* shapefile DBF extension */
    /*::[*/
    0: 20127,
    /*::[*/
    8: 865,
    /*::[*/
    9: 437,
    /*::[*/
    10: 850,
    /*::[*/
    11: 437,
    /*::[*/
    13: 437,
    /*::[*/
    14: 850,
    /*::[*/
    15: 437,
    /*::[*/
    16: 850,
    /*::[*/
    17: 437,
    /*::[*/
    18: 850,
    /*::[*/
    19: 932,
    /*::[*/
    20: 850,
    /*::[*/
    21: 437,
    /*::[*/
    22: 850,
    /*::[*/
    23: 865,
    /*::[*/
    24: 437,
    /*::[*/
    25: 437,
    /*::[*/
    26: 850,
    /*::[*/
    27: 437,
    /*::[*/
    28: 863,
    /*::[*/
    29: 850,
    /*::[*/
    31: 852,
    /*::[*/
    34: 852,
    /*::[*/
    35: 852,
    /*::[*/
    36: 860,
    /*::[*/
    37: 850,
    /*::[*/
    38: 866,
    /*::[*/
    55: 850,
    /*::[*/
    64: 852,
    /*::[*/
    77: 936,
    /*::[*/
    78: 949,
    /*::[*/
    79: 950,
    /*::[*/
    80: 874,
    /*::[*/
    87: 1252,
    /*::[*/
    88: 1252,
    /*::[*/
    89: 1252,
    /*::[*/
    108: 863,
    /*::[*/
    134: 737,
    /*::[*/
    135: 852,
    /*::[*/
    136: 857,
    /*::[*/
    204: 1257,
    /*::[*/
    255: 16969
  }, t = o0({
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /*::[*/
    0: 20127
  });
  function r(f, o) {
    var l = [], c = Zr(1);
    switch (o.type) {
      case "base64":
        c = gr(Ir(f));
        break;
      case "binary":
        c = gr(f);
        break;
      case "buffer":
      case "array":
        c = f;
        break;
    }
    ar(c, 0);
    var h = c.read_shift(1), u = !!(h & 136), d = !1, _ = !1;
    switch (h) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        d = !0, u = !0;
        break;
      case 49:
        d = !0, u = !0;
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
        throw new Error("DBF Unsupported Version: " + h.toString(16));
    }
    var x = 0, m = 521;
    h == 2 && (x = c.read_shift(2)), c.l += 3, h != 2 && (x = c.read_shift(4)), x > 1048576 && (x = 1e6), h != 2 && (m = c.read_shift(2));
    var O = c.read_shift(2), A = o.codepage || 1252;
    h != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (A = e[c[c.l]]), c.l += 1, c.l += 2), _ && (c.l += 36);
    for (var y = [], N = {}, j = Math.min(c.length, h == 2 ? 521 : m - 10 - (d ? 264 : 0)), ee = _ ? 32 : 11; c.l < j && c[c.l] != 13; )
      switch (N = {}, N.name = Yr.utils.decode(A, c.slice(c.l, c.l + ee)).replace(/[\u0000\r\n].*$/g, ""), c.l += ee, N.type = String.fromCharCode(c.read_shift(1)), h != 2 && !_ && (N.offset = c.read_shift(4)), N.len = c.read_shift(1), h == 2 && (N.offset = c.read_shift(2)), N.dec = c.read_shift(1), N.name.length && y.push(N), h != 2 && (c.l += _ ? 13 : 14), N.type) {
        case "B":
          (!d || N.len != 8) && o.WTF && console.log("Skipping " + N.name + ":" + N.type);
          break;
        case "G":
        case "P":
          o.WTF && console.log("Skipping " + N.name + ":" + N.type);
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
          throw new Error("Unknown Field Type: " + N.type);
      }
    if (c[c.l] !== 13 && (c.l = m - 1), c.read_shift(1) !== 13)
      throw new Error("DBF Terminator not found " + c.l + " " + c[c.l]);
    c.l = m;
    var D = 0, U = 0;
    for (l[0] = [], U = 0; U != y.length; ++U)
      l[0][U] = y[U].name;
    for (; x-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += O;
        continue;
      }
      for (++c.l, l[++D] = [], U = 0, U = 0; U != y.length; ++U) {
        var B = c.slice(c.l, c.l + y[U].len);
        c.l += y[U].len, ar(B, 0);
        var V = Yr.utils.decode(A, B);
        switch (y[U].type) {
          case "C":
            V.trim().length && (l[D][U] = V.replace(/\s+$/, ""));
            break;
          case "D":
            V.length === 8 ? l[D][U] = new Date(+V.slice(0, 4), +V.slice(4, 6) - 1, +V.slice(6, 8)) : l[D][U] = V;
            break;
          case "F":
            l[D][U] = parseFloat(V.trim());
            break;
          case "+":
          case "I":
            l[D][U] = _ ? B.read_shift(-4, "i") ^ 2147483648 : B.read_shift(4, "i");
            break;
          case "L":
            switch (V.trim().toUpperCase()) {
              case "Y":
              case "T":
                l[D][U] = !0;
                break;
              case "N":
              case "F":
                l[D][U] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + V + "|");
            }
            break;
          case "M":
            if (!u)
              throw new Error("DBF Unexpected MEMO for type " + h.toString(16));
            l[D][U] = "##MEMO##" + (_ ? parseInt(V.trim(), 10) : B.read_shift(4));
            break;
          case "N":
            V = V.replace(/\u0000/g, "").trim(), V && V != "." && (l[D][U] = +V || 0);
            break;
          case "@":
            l[D][U] = new Date(B.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[D][U] = new Date((B.read_shift(4) - 2440588) * 864e5 + B.read_shift(4));
            break;
          case "Y":
            l[D][U] = B.read_shift(4, "i") / 1e4 + B.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[D][U] = -B.read_shift(-8, "f");
            break;
          case "B":
            if (d && y[U].len == 8) {
              l[D][U] = B.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            B.l += y[U].len;
            break;
          case "0":
            if (y[U].name === "_NullFlags")
              break;
          default:
            throw new Error("DBF Unsupported data type " + y[U].type);
        }
      }
    }
    if (h != 2 && c.l < c.length && c[c.l++] != 26)
      throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return o && o.sheetRows && (l = l.slice(0, o.sheetRows)), o.DBF = y, l;
  }
  function n(f, o) {
    var l = o || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var c = Et(r(f, l), l);
    return c["!cols"] = l.DBF.map(function(h) {
      return {
        wch: h.len,
        DBF: h
      };
    }), delete l.DBF, c;
  }
  function a(f, o) {
    try {
      return rt(n(f, o), o);
    } catch (l) {
      if (o && o.WTF)
        throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, o) {
    var l = o || {};
    if (+l.codepage >= 0 && Mt(+l.codepage), l.type == "string")
      throw new Error("Cannot write DBF to JS string");
    var c = Qe(), h = An(f, { header: 1, raw: !0, cellDates: !0 }), u = h[0], d = h.slice(1), _ = f["!cols"] || [], x = 0, m = 0, O = 0, A = 1;
    for (x = 0; x < u.length; ++x) {
      if (((_[x] || {}).DBF || {}).name) {
        u[x] = _[x].DBF.name, ++O;
        continue;
      }
      if (u[x] != null) {
        if (++O, typeof u[x] == "number" && (u[x] = u[x].toString(10)), typeof u[x] != "string")
          throw new Error("DBF Invalid column name " + u[x] + " |" + typeof u[x] + "|");
        if (u.indexOf(u[x]) !== x) {
          for (m = 0; m < 1024; ++m)
            if (u.indexOf(u[x] + "_" + m) == -1) {
              u[x] += "_" + m;
              break;
            }
        }
      }
    }
    var y = Se(f["!ref"]), N = [], j = [], ee = [];
    for (x = 0; x <= y.e.c - y.s.c; ++x) {
      var D = "", U = "", B = 0, V = [];
      for (m = 0; m < d.length; ++m)
        d[m][x] != null && V.push(d[m][x]);
      if (V.length == 0 || u[x] == null) {
        N[x] = "?";
        continue;
      }
      for (m = 0; m < V.length; ++m) {
        switch (typeof V[m]) {
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
            U = V[m] instanceof Date ? "D" : "C";
            break;
          default:
            U = "C";
        }
        B = Math.max(B, String(V[m]).length), D = D && D != U ? "C" : U;
      }
      B > 250 && (B = 250), U = ((_[x] || {}).DBF || {}).type, U == "C" && _[x].DBF.len > B && (B = _[x].DBF.len), D == "B" && U == "N" && (D = "N", ee[x] = _[x].DBF.dec, B = _[x].DBF.len), j[x] = D == "C" || U == "N" ? B : i[D] || 0, A += j[x], N[x] = D;
    }
    var G = c.next(32);
    for (G.write_shift(4, 318902576), G.write_shift(4, d.length), G.write_shift(2, 296 + 32 * O), G.write_shift(2, A), x = 0; x < 4; ++x)
      G.write_shift(4, 0);
    for (G.write_shift(4, 0 | (+t[
      /*::String(*/
      Ga
      /*::)*/
    ] || 3) << 8), x = 0, m = 0; x < u.length; ++x)
      if (u[x] != null) {
        var K = c.next(32), te = (u[x].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        K.write_shift(1, te, "sbcs"), K.write_shift(1, N[x] == "?" ? "C" : N[x], "sbcs"), K.write_shift(4, m), K.write_shift(1, j[x] || i[N[x]] || 0), K.write_shift(1, ee[x] || 0), K.write_shift(1, 2), K.write_shift(4, 0), K.write_shift(1, 0), K.write_shift(4, 0), K.write_shift(4, 0), m += j[x] || i[N[x]] || 0;
      }
    var Te = c.next(264);
    for (Te.write_shift(4, 13), x = 0; x < 65; ++x)
      Te.write_shift(4, 0);
    for (x = 0; x < d.length; ++x) {
      var oe = c.next(A);
      for (oe.write_shift(1, 0), m = 0; m < u.length; ++m)
        if (u[m] != null)
          switch (N[m]) {
            case "L":
              oe.write_shift(1, d[x][m] == null ? 63 : d[x][m] ? 84 : 70);
              break;
            case "B":
              oe.write_shift(8, d[x][m] || 0, "f");
              break;
            case "N":
              var Ue = "0";
              for (typeof d[x][m] == "number" && (Ue = d[x][m].toFixed(ee[m] || 0)), O = 0; O < j[m] - Ue.length; ++O)
                oe.write_shift(1, 32);
              oe.write_shift(1, Ue, "sbcs");
              break;
            case "D":
              d[x][m] ? (oe.write_shift(4, ("0000" + d[x][m].getFullYear()).slice(-4), "sbcs"), oe.write_shift(2, ("00" + (d[x][m].getMonth() + 1)).slice(-2), "sbcs"), oe.write_shift(2, ("00" + d[x][m].getDate()).slice(-2), "sbcs")) : oe.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var De = String(d[x][m] != null ? d[x][m] : "").slice(0, j[m]);
              for (oe.write_shift(1, De, "sbcs"), O = 0; O < j[m] - De.length; ++O)
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
}(), Tc = /* @__PURE__ */ function() {
  var e = {
    AA: "À",
    BA: "Á",
    CA: "Â",
    DA: 195,
    HA: "Ä",
    JA: 197,
    AE: "È",
    BE: "É",
    CE: "Ê",
    HE: "Ë",
    AI: "Ì",
    BI: "Í",
    CI: "Î",
    HI: "Ï",
    AO: "Ò",
    BO: "Ó",
    CO: "Ô",
    DO: 213,
    HO: "Ö",
    AU: "Ù",
    BU: "Ú",
    CU: "Û",
    HU: "Ü",
    Aa: "à",
    Ba: "á",
    Ca: "â",
    Da: 227,
    Ha: "ä",
    Ja: 229,
    Ae: "è",
    Be: "é",
    Ce: "ê",
    He: "ë",
    Ai: "ì",
    Bi: "í",
    Ci: "î",
    Hi: "ï",
    Ao: "ò",
    Bo: "ó",
    Co: "ô",
    Do: 245,
    Ho: "ö",
    Au: "ù",
    Bu: "ú",
    Cu: "û",
    Hu: "ü",
    KC: "Ç",
    Kc: "ç",
    q: "æ",
    z: "œ",
    a: "Æ",
    j: "Œ",
    DN: 209,
    Dn: 241,
    Hy: 255,
    S: 169,
    c: 170,
    R: 174,
    "B ": 180,
    /*::[*/
    0: 176,
    /*::[*/
    1: 177,
    /*::[*/
    2: 178,
    /*::[*/
    3: 179,
    /*::[*/
    5: 181,
    /*::[*/
    6: 182,
    /*::[*/
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
  }, t = new RegExp("\x1BN(" + je(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(u, d) {
    var _ = e[d];
    return typeof _ == "number" ? j0(_) : _;
  }, n = function(u, d, _) {
    var x = d.charCodeAt(0) - 32 << 4 | _.charCodeAt(0) - 48;
    return x == 59 ? u : j0(x);
  };
  e["|"] = 254;
  function a(u, d) {
    switch (d.type) {
      case "base64":
        return i(Ir(u), d);
      case "binary":
        return i(u, d);
      case "buffer":
        return i(de && Buffer.isBuffer(u) ? u.toString("binary") : Xt(u), d);
      case "array":
        return i(Rn(u), d);
    }
    throw new Error("Unrecognized type " + d.type);
  }
  function i(u, d) {
    var _ = u.split(/[\n\r]+/), x = -1, m = -1, O = 0, A = 0, y = [], N = [], j = null, ee = {}, D = [], U = [], B = [], V = 0, G;
    for (+d.codepage >= 0 && Mt(+d.codepage); O !== _.length; ++O) {
      V = 0;
      var K = _[O].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), te = K.replace(/;;/g, "\0").split(";").map(function(F) {
        return F.replace(/\u0000/g, ";");
      }), Te = te[0], oe;
      if (K.length > 0)
        switch (Te) {
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
            te[1].charAt(0) == "P" && N.push(K.slice(3).replace(/;;/g, ";"));
            break;
          case "C":
            var Ue = !1, De = !1, pr = !1, Pe = !1, cr = -1, tr = -1;
            for (A = 1; A < te.length; ++A)
              switch (te[A].charAt(0)) {
                case "A":
                  break;
                case "X":
                  m = parseInt(te[A].slice(1)) - 1, De = !0;
                  break;
                case "Y":
                  for (x = parseInt(te[A].slice(1)) - 1, De || (m = 0), G = y.length; G <= x; ++G)
                    y[G] = [];
                  break;
                case "K":
                  oe = te[A].slice(1), oe.charAt(0) === '"' ? oe = oe.slice(1, oe.length - 1) : oe === "TRUE" ? oe = !0 : oe === "FALSE" ? oe = !1 : isNaN(Rr(oe)) ? isNaN(Ut(oe).getDate()) || (oe = Ze(oe)) : (oe = Rr(oe), j !== null && ri(j) && (oe = ii(oe))), Ue = !0;
                  break;
                case "E":
                  Pe = !0;
                  var S = gu(te[A].slice(1), { r: x, c: m });
                  y[x][m] = [y[x][m], S];
                  break;
                case "S":
                  pr = !0, y[x][m] = [y[x][m], "S5S"];
                  break;
                case "G":
                  break;
                case "R":
                  cr = parseInt(te[A].slice(1)) - 1;
                  break;
                case "C":
                  tr = parseInt(te[A].slice(1)) - 1;
                  break;
                default:
                  if (d && d.WTF)
                    throw new Error("SYLK bad record " + K);
              }
            if (Ue && (y[x][m] && y[x][m].length == 2 ? y[x][m][0] = oe : y[x][m] = oe, j = null), pr) {
              if (Pe)
                throw new Error("SYLK shared formula cannot have own formula");
              var L = cr > -1 && y[cr][tr];
              if (!L || !L[1])
                throw new Error("SYLK shared formula cannot find base");
              y[x][m][1] = _u(L[1], { r: x - cr, c: m - tr });
            }
            break;
          case "F":
            var C = 0;
            for (A = 1; A < te.length; ++A)
              switch (te[A].charAt(0)) {
                case "X":
                  m = parseInt(te[A].slice(1)) - 1, ++C;
                  break;
                case "Y":
                  for (x = parseInt(te[A].slice(1)) - 1, G = y.length; G <= x; ++G)
                    y[G] = [];
                  break;
                case "M":
                  V = parseInt(te[A].slice(1)) / 20;
                  break;
                case "F":
                  break;
                case "G":
                  break;
                case "P":
                  j = N[parseInt(te[A].slice(1))];
                  break;
                case "S":
                  break;
                case "D":
                  break;
                case "N":
                  break;
                case "W":
                  for (B = te[A].slice(1).split(" "), G = parseInt(B[0], 10); G <= parseInt(B[1], 10); ++G)
                    V = parseInt(B[2], 10), U[G - 1] = V === 0 ? { hidden: !0 } : { wch: V }, E0(U[G - 1]);
                  break;
                case "C":
                  m = parseInt(te[A].slice(1)) - 1, U[m] || (U[m] = {});
                  break;
                case "R":
                  x = parseInt(te[A].slice(1)) - 1, D[x] || (D[x] = {}), V > 0 ? (D[x].hpt = V, D[x].hpx = $i(V)) : V === 0 && (D[x].hidden = !0);
                  break;
                default:
                  if (d && d.WTF)
                    throw new Error("SYLK bad record " + K);
              }
            C < 1 && (j = null);
            break;
          default:
            if (d && d.WTF)
              throw new Error("SYLK bad record " + K);
        }
    }
    return D.length > 0 && (ee["!rows"] = D), U.length > 0 && (ee["!cols"] = U), d && d.sheetRows && (y = y.slice(0, d.sheetRows)), [y, ee];
  }
  function s(u, d) {
    var _ = a(u, d), x = _[0], m = _[1], O = Et(x, d);
    return je(m).forEach(function(A) {
      O[A] = m[A];
    }), O;
  }
  function f(u, d) {
    return rt(s(u, d), d);
  }
  function o(u, d, _, x) {
    var m = "C;Y" + (_ + 1) + ";X" + (x + 1) + ";K";
    switch (u.t) {
      case "n":
        m += u.v || 0, u.f && !u.F && (m += ";E" + S0(u.f, { r: _, c: x }));
        break;
      case "b":
        m += u.v ? "TRUE" : "FALSE";
        break;
      case "e":
        m += u.w || u.v;
        break;
      case "d":
        m += '"' + (u.w || u.v) + '"';
        break;
      case "s":
        m += '"' + u.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return m;
  }
  function l(u, d) {
    d.forEach(function(_, x) {
      var m = "F;W" + (x + 1) + " " + (x + 1) + " ";
      _.hidden ? m += "0" : (typeof _.width == "number" && !_.wpx && (_.wpx = Tn(_.width)), typeof _.wpx == "number" && !_.wch && (_.wch = En(_.wpx)), typeof _.wch == "number" && (m += Math.round(_.wch))), m.charAt(m.length - 1) != " " && u.push(m);
    });
  }
  function c(u, d) {
    d.forEach(function(_, x) {
      var m = "F;";
      _.hidden ? m += "M0;" : _.hpt ? m += "M" + 20 * _.hpt + ";" : _.hpx && (m += "M" + 20 * wn(_.hpx) + ";"), m.length > 2 && u.push(m + "R" + (x + 1));
    });
  }
  function h(u, d) {
    var _ = ["ID;PWXL;N;E"], x = [], m = Se(u["!ref"]), O, A = Array.isArray(u), y = `\r
`;
    _.push("P;PGeneral"), _.push("F;P0;DG0G8;M255"), u["!cols"] && l(_, u["!cols"]), u["!rows"] && c(_, u["!rows"]), _.push("B;Y" + (m.e.r - m.s.r + 1) + ";X" + (m.e.c - m.s.c + 1) + ";D" + [m.s.c, m.s.r, m.e.c, m.e.r].join(" "));
    for (var N = m.s.r; N <= m.e.r; ++N)
      for (var j = m.s.c; j <= m.e.c; ++j) {
        var ee = _e({ r: N, c: j });
        O = A ? (u[N] || [])[j] : u[ee], !(!O || O.v == null && (!O.f || O.F)) && x.push(o(O, u, N, j));
      }
    return _.join(y) + y + x.join(y) + y + "E" + y;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: h
  };
}(), Ec = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(Ir(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(de && Buffer.isBuffer(i) ? i.toString("binary") : Xt(i), s);
      case "array":
        return t(Rn(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var f = i.split(`
`), o = -1, l = -1, c = 0, h = []; c !== f.length; ++c) {
      if (f[c].trim() === "BOT") {
        h[++o] = [], l = 0;
        continue;
      }
      if (!(o < 0)) {
        var u = f[c].trim().split(","), d = u[0], _ = u[1];
        ++c;
        for (var x = f[c] || ""; (x.match(/["]/g) || []).length & 1 && c < f.length - 1; )
          x += `
` + f[++c];
        switch (x = x.trim(), +d) {
          case -1:
            if (x === "BOT") {
              h[++o] = [], l = 0;
              continue;
            } else if (x !== "EOD")
              throw new Error("Unrecognized DIF special command " + x);
            break;
          case 0:
            x === "TRUE" ? h[o][l] = !0 : x === "FALSE" ? h[o][l] = !1 : isNaN(Rr(_)) ? isNaN(Ut(_).getDate()) ? h[o][l] = _ : h[o][l] = Ze(_) : h[o][l] = Rr(_), ++l;
            break;
          case 1:
            x = x.slice(1, x.length - 1), x = x.replace(/""/g, '"'), x && x.match(/^=".*"$/) && (x = x.slice(2, -1)), h[o][l++] = x !== "" ? x : null;
            break;
        }
        if (x === "EOD")
          break;
      }
    }
    return s && s.sheetRows && (h = h.slice(0, s.sheetRows)), h;
  }
  function r(i, s) {
    return Et(e(i, s), s);
  }
  function n(i, s) {
    return rt(r(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(o, l, c, h, u) {
      o.push(l), o.push(c + "," + h), o.push('"' + u.replace(/"/g, '""') + '"');
    }, s = function(o, l, c, h) {
      o.push(l + "," + c), o.push(l == 1 ? '"' + h.replace(/"/g, '""') + '"' : h);
    };
    return function(o) {
      var l = [], c = Se(o["!ref"]), h, u = Array.isArray(o);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(l, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var d = c.s.r; d <= c.e.r; ++d) {
        s(l, -1, 0, "BOT");
        for (var _ = c.s.c; _ <= c.e.c; ++_) {
          var x = _e({ r: d, c: _ });
          if (h = u ? (o[d] || [])[_] : o[x], !h) {
            s(l, 1, 0, "");
            continue;
          }
          switch (h.t) {
            case "n":
              var m = h.w;
              !m && h.v != null && (m = h.v), m == null ? h.f && !h.F ? s(l, 1, 0, "=" + h.f) : s(l, 1, 0, "") : s(l, 0, m, "V");
              break;
            case "b":
              s(l, 0, h.v ? 1 : 0, h.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(l, 1, 0, isNaN(h.v) ? h.v : '="' + h.v + '"');
              break;
            case "d":
              h.w || (h.w = Vr(h.z || Oe[14], er(Ze(h.v)))), s(l, 0, h.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var O = `\r
`, A = l.join(O);
      return A;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
}(), Vi = /* @__PURE__ */ function() {
  function e(h) {
    return h.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(h) {
    return h.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(h, u) {
    for (var d = h.split(`
`), _ = -1, x = -1, m = 0, O = []; m !== d.length; ++m) {
      var A = d[m].trim().split(":");
      if (A[0] === "cell") {
        var y = Me(A[1]);
        if (O.length <= y.r)
          for (_ = O.length; _ <= y.r; ++_)
            O[_] || (O[_] = []);
        switch (_ = y.r, x = y.c, A[2]) {
          case "t":
            O[_][x] = e(A[3]);
            break;
          case "v":
            O[_][x] = +A[3];
            break;
          case "vtf":
            var N = A[A.length - 1];
          case "vtc":
            switch (A[3]) {
              case "nl":
                O[_][x] = !!+A[4];
                break;
              default:
                O[_][x] = +A[4];
                break;
            }
            A[2] == "vtf" && (O[_][x] = [O[_][x], N]);
        }
      }
    }
    return u && u.sheetRows && (O = O.slice(0, u.sheetRows)), O;
  }
  function n(h, u) {
    return Et(r(h, u), u);
  }
  function a(h, u) {
    return rt(n(h, u), u);
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
`), o = "--SocialCalcSpreadsheetControlSave--";
  function l(h) {
    if (!h || !h["!ref"])
      return "";
    for (var u = [], d = [], _, x = "", m = lr(h["!ref"]), O = Array.isArray(h), A = m.s.r; A <= m.e.r; ++A)
      for (var y = m.s.c; y <= m.e.c; ++y)
        if (x = _e({ r: A, c: y }), _ = O ? (h[A] || [])[y] : h[x], !(!_ || _.v == null || _.t === "z")) {
          switch (d = ["cell", x, "t"], _.t) {
            case "s":
            case "str":
              d.push(t(_.v));
              break;
            case "n":
              _.f ? (d[2] = "vtf", d[3] = "n", d[4] = _.v, d[5] = t(_.f)) : (d[2] = "v", d[3] = _.v);
              break;
            case "b":
              d[2] = "vt" + (_.f ? "f" : "c"), d[3] = "nl", d[4] = _.v ? "1" : "0", d[5] = t(_.f || (_.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var N = er(Ze(_.v));
              d[2] = "vtc", d[3] = "nd", d[4] = "" + N, d[5] = _.w || Vr(_.z || Oe[14], N);
              break;
            case "e":
              continue;
          }
          u.push(d.join(":"));
        }
    return u.push("sheet:c:" + (m.e.c - m.s.c + 1) + ":r:" + (m.e.r - m.s.r + 1) + ":tvf:1"), u.push("valueformat:1:text-wiki"), u.join(`
`);
  }
  function c(h) {
    return [i, s, f, s, l(h), o].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: c
  };
}(), wc = /* @__PURE__ */ function() {
  function e(c, h, u, d, _) {
    _.raw ? h[u][d] = c : c === "" || (c === "TRUE" ? h[u][d] = !0 : c === "FALSE" ? h[u][d] = !1 : isNaN(Rr(c)) ? isNaN(Ut(c).getDate()) ? h[u][d] = c : h[u][d] = Ze(c) : h[u][d] = Rr(c));
  }
  function t(c, h) {
    var u = h || {}, d = [];
    if (!c || c.length === 0)
      return d;
    for (var _ = c.split(/[\r\n]/), x = _.length - 1; x >= 0 && _[x].length === 0; )
      --x;
    for (var m = 10, O = 0, A = 0; A <= x; ++A)
      O = _[A].indexOf(" "), O == -1 ? O = _[A].length : O++, m = Math.max(m, O);
    for (A = 0; A <= x; ++A) {
      d[A] = [];
      var y = 0;
      for (e(_[A].slice(0, m).trim(), d, A, y, u), y = 1; y <= (_[A].length - m) / 10 + 1; ++y)
        e(_[A].slice(m + (y - 1) * 10, m + y * 10).trim(), d, A, y, u);
    }
    return u.sheetRows && (d = d.slice(0, u.sheetRows)), d;
  }
  var r = {
    /*::[*/
    44: ",",
    /*::[*/
    9: "	",
    /*::[*/
    59: ";",
    /*::[*/
    124: "|"
  }, n = {
    /*::[*/
    44: 3,
    /*::[*/
    9: 2,
    /*::[*/
    59: 1,
    /*::[*/
    124: 0
  };
  function a(c) {
    for (var h = {}, u = !1, d = 0, _ = 0; d < c.length; ++d)
      (_ = c.charCodeAt(d)) == 34 ? u = !u : !u && _ in r && (h[_] = (h[_] || 0) + 1);
    _ = [];
    for (d in h)
      Object.prototype.hasOwnProperty.call(h, d) && _.push([h[d], d]);
    if (!_.length) {
      h = n;
      for (d in h)
        Object.prototype.hasOwnProperty.call(h, d) && _.push([h[d], d]);
    }
    return _.sort(function(x, m) {
      return x[0] - m[0] || n[x[1]] - n[m[1]];
    }), r[_.pop()[1]] || 44;
  }
  function i(c, h) {
    var u = h || {}, d = "", _ = u.dense ? [] : {}, x = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (d = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (d = c.charAt(4), c = c.slice(6)) : d = a(c.slice(0, 1024)) : u && u.FS ? d = u.FS : d = a(c.slice(0, 1024));
    var m = 0, O = 0, A = 0, y = 0, N = 0, j = d.charCodeAt(0), ee = !1, D = 0, U = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var B = u.dateNF != null ? Ml(u.dateNF) : null;
    function V() {
      var G = c.slice(y, N), K = {};
      if (G.charAt(0) == '"' && G.charAt(G.length - 1) == '"' && (G = G.slice(1, -1).replace(/""/g, '"')), G.length === 0)
        K.t = "z";
      else if (u.raw)
        K.t = "s", K.v = G;
      else if (G.trim().length === 0)
        K.t = "s", K.v = G;
      else if (G.charCodeAt(0) == 61)
        G.charCodeAt(1) == 34 && G.charCodeAt(G.length - 1) == 34 ? (K.t = "s", K.v = G.slice(2, -1).replace(/""/g, '"')) : Tu(G) ? (K.t = "n", K.f = G.slice(1)) : (K.t = "s", K.v = G);
      else if (G == "TRUE")
        K.t = "b", K.v = !0;
      else if (G == "FALSE")
        K.t = "b", K.v = !1;
      else if (!isNaN(A = Rr(G)))
        K.t = "n", u.cellText !== !1 && (K.w = G), K.v = A;
      else if (!isNaN(Ut(G).getDate()) || B && G.match(B)) {
        K.z = u.dateNF || Oe[14];
        var te = 0;
        B && G.match(B) && (G = bl(G, u.dateNF, G.match(B) || []), te = 1), u.cellDates ? (K.t = "d", K.v = Ze(G, te)) : (K.t = "n", K.v = er(Ze(G, te))), u.cellText !== !1 && (K.w = Vr(K.z, K.v instanceof Date ? er(K.v) : K.v)), u.cellNF || delete K.z;
      } else
        K.t = "s", K.v = G;
      if (K.t == "z" || (u.dense ? (_[m] || (_[m] = []), _[m][O] = K) : _[_e({ c: O, r: m })] = K), y = N + 1, U = c.charCodeAt(y), x.e.c < O && (x.e.c = O), x.e.r < m && (x.e.r = m), D == j)
        ++O;
      else if (O = 0, ++m, u.sheetRows && u.sheetRows <= m)
        return !0;
    }
    e:
      for (; N < c.length; ++N)
        switch (D = c.charCodeAt(N)) {
          case 34:
            U === 34 && (ee = !ee);
            break;
          case j:
          case 10:
          case 13:
            if (!ee && V())
              break e;
            break;
        }
    return N - y > 0 && V(), _["!ref"] = ke(x), _;
  }
  function s(c, h) {
    return !(h && h.PRN) || h.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, h) : Et(t(c, h), h);
  }
  function f(c, h) {
    var u = "", d = h.type == "string" ? [0, 0, 0, 0] : P2(c, h);
    switch (h.type) {
      case "base64":
        u = Ir(c);
        break;
      case "binary":
        u = c;
        break;
      case "buffer":
        h.codepage == 65001 ? u = c.toString("utf8") : h.codepage && typeof Yr < "u" ? u = Yr.utils.decode(h.codepage, c) : u = de && Buffer.isBuffer(c) ? c.toString("binary") : Xt(c);
        break;
      case "array":
        u = Rn(c);
        break;
      case "string":
        u = c;
        break;
      default:
        throw new Error("Unrecognized type " + h.type);
    }
    return d[0] == 239 && d[1] == 187 && d[2] == 191 ? u = kt(u.slice(3)) : h.type != "string" && h.type != "buffer" && h.codepage == 65001 ? u = kt(u) : h.type == "binary" && typeof Yr < "u" && h.codepage && (u = Yr.utils.decode(h.codepage, Yr.utils.encode(28591, u))), u.slice(0, 19) == "socialcalc:version:" ? Vi.to_sheet(h.type == "string" ? u : kt(u), h) : s(u, h);
  }
  function o(c, h) {
    return rt(f(c, h), h);
  }
  function l(c) {
    for (var h = [], u = Se(c["!ref"]), d, _ = Array.isArray(c), x = u.s.r; x <= u.e.r; ++x) {
      for (var m = [], O = u.s.c; O <= u.e.c; ++O) {
        var A = _e({ r: x, c: O });
        if (d = _ ? (c[x] || [])[O] : c[A], !d || d.v == null) {
          m.push("          ");
          continue;
        }
        for (var y = (d.w || (Nr(d), d.w) || "").slice(0, 10); y.length < 10; )
          y += " ";
        m.push(y + (O === 0 ? " " : ""));
      }
      h.push(m.join(""));
    }
    return h.join(`
`);
  }
  return {
    to_workbook: o,
    to_sheet: f,
    from_sheet: l
  };
}(), wa = /* @__PURE__ */ function() {
  function e(S, L, C) {
    if (S) {
      ar(S, S.l || 0);
      for (var F = C.Enum || cr; S.l < S.length; ) {
        var W = S.read_shift(2), se = F[W] || F[65535], fe = S.read_shift(2), ie = S.l + fe, Q = se.f && se.f(S, fe, C);
        if (S.l = ie, L(Q, se, W))
          return;
      }
    }
  }
  function t(S, L) {
    switch (L.type) {
      case "base64":
        return r(gr(Ir(S)), L);
      case "binary":
        return r(gr(S), L);
      case "buffer":
      case "array":
        return r(S, L);
    }
    throw "Unsupported type " + L.type;
  }
  function r(S, L) {
    if (!S)
      return S;
    var C = L || {}, F = C.dense ? [] : {}, W = "Sheet1", se = "", fe = 0, ie = {}, Q = [], we = [], he = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, Ye = C.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      C.Enum = cr, e(S, function(ae, ur, Fr) {
        switch (Fr) {
          case 0:
            C.vers = ae, ae >= 4096 && (C.qpro = !0);
            break;
          case 6:
            he = ae;
            break;
          case 204:
            ae && (se = ae);
            break;
          case 222:
            se = ae;
            break;
          case 15:
          case 51:
            C.qpro || (ae[1].v = ae[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Fr == 14 && (ae[2] & 112) == 112 && (ae[2] & 15) > 1 && (ae[2] & 15) < 15 && (ae[1].z = C.dateNF || Oe[14], C.cellDates && (ae[1].t = "d", ae[1].v = ii(ae[1].v))), C.qpro && ae[3] > fe && (F["!ref"] = ke(he), ie[W] = F, Q.push(W), F = C.dense ? [] : {}, he = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ae[3], W = se || "Sheet" + (fe + 1), se = "");
            var $r = C.dense ? (F[ae[0].r] || [])[ae[0].c] : F[_e(ae[0])];
            if ($r) {
              $r.t = ae[1].t, $r.v = ae[1].v, ae[1].z != null && ($r.z = ae[1].z), ae[1].f != null && ($r.f = ae[1].f);
              break;
            }
            C.dense ? (F[ae[0].r] || (F[ae[0].r] = []), F[ae[0].r][ae[0].c] = ae[1]) : F[_e(ae[0])] = ae[1];
            break;
        }
      }, C);
    else if (S[2] == 26 || S[2] == 14)
      C.Enum = tr, S[2] == 14 && (C.qpro = !0, S.l = 0), e(S, function(ae, ur, Fr) {
        switch (Fr) {
          case 204:
            W = ae;
            break;
          case 22:
            ae[1].v = ae[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (ae[3] > fe && (F["!ref"] = ke(he), ie[W] = F, Q.push(W), F = C.dense ? [] : {}, he = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ae[3], W = "Sheet" + (fe + 1)), Ye > 0 && ae[0].r >= Ye)
              break;
            C.dense ? (F[ae[0].r] || (F[ae[0].r] = []), F[ae[0].r][ae[0].c] = ae[1]) : F[_e(ae[0])] = ae[1], he.e.c < ae[0].c && (he.e.c = ae[0].c), he.e.r < ae[0].r && (he.e.r = ae[0].r);
            break;
          case 27:
            ae[14e3] && (we[ae[14e3][0]] = ae[14e3][1]);
            break;
          case 1537:
            we[ae[0]] = ae[1], ae[0] == fe && (W = ae[1]);
            break;
        }
      }, C);
    else
      throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (F["!ref"] = ke(he), ie[se || W] = F, Q.push(se || W), !we.length)
      return { SheetNames: Q, Sheets: ie };
    for (var pe = {}, yr = [], Fe = 0; Fe < we.length; ++Fe)
      ie[Q[Fe]] ? (yr.push(we[Fe] || Q[Fe]), pe[we[Fe]] = ie[we[Fe]] || ie[Q[Fe]]) : (yr.push(we[Fe]), pe[we[Fe]] = { "!ref": "A1" });
    return { SheetNames: yr, Sheets: pe };
  }
  function n(S, L) {
    var C = L || {};
    if (+C.codepage >= 0 && Mt(+C.codepage), C.type == "string")
      throw new Error("Cannot write WK1 to JS string");
    var F = Qe(), W = Se(S["!ref"]), se = Array.isArray(S), fe = [];
    J(F, 0, i(1030)), J(F, 6, o(W));
    for (var ie = Math.min(W.e.r, 8191), Q = W.s.r; Q <= ie; ++Q)
      for (var we = Xe(Q), he = W.s.c; he <= W.e.c; ++he) {
        Q === W.s.r && (fe[he] = ze(he));
        var Ye = fe[he] + we, pe = se ? (S[Q] || [])[he] : S[Ye];
        if (!(!pe || pe.t == "z"))
          if (pe.t == "n")
            (pe.v | 0) == pe.v && pe.v >= -32768 && pe.v <= 32767 ? J(F, 13, d(Q, he, pe.v)) : J(F, 14, x(Q, he, pe.v));
          else {
            var yr = Nr(pe);
            J(F, 15, h(Q, he, yr.slice(0, 239)));
          }
      }
    return J(F, 1), F.end();
  }
  function a(S, L) {
    var C = L || {};
    if (+C.codepage >= 0 && Mt(+C.codepage), C.type == "string")
      throw new Error("Cannot write WK3 to JS string");
    var F = Qe();
    J(F, 0, s(S));
    for (var W = 0, se = 0; W < S.SheetNames.length; ++W)
      (S.Sheets[S.SheetNames[W]] || {})["!ref"] && J(F, 27, Pe(S.SheetNames[W], se++));
    var fe = 0;
    for (W = 0; W < S.SheetNames.length; ++W) {
      var ie = S.Sheets[S.SheetNames[W]];
      if (!(!ie || !ie["!ref"])) {
        for (var Q = Se(ie["!ref"]), we = Array.isArray(ie), he = [], Ye = Math.min(Q.e.r, 8191), pe = Q.s.r; pe <= Ye; ++pe)
          for (var yr = Xe(pe), Fe = Q.s.c; Fe <= Q.e.c; ++Fe) {
            pe === Q.s.r && (he[Fe] = ze(Fe));
            var ae = he[Fe] + yr, ur = we ? (ie[pe] || [])[Fe] : ie[ae];
            if (!(!ur || ur.t == "z"))
              if (ur.t == "n")
                J(F, 23, V(pe, Fe, fe, ur.v));
              else {
                var Fr = Nr(ur);
                J(F, 22, D(pe, Fe, fe, Fr.slice(0, 239)));
              }
          }
        ++fe;
      }
    }
    return J(F, 1), F.end();
  }
  function i(S) {
    var L = M(2);
    return L.write_shift(2, S), L;
  }
  function s(S) {
    var L = M(26);
    L.write_shift(2, 4096), L.write_shift(2, 4), L.write_shift(4, 0);
    for (var C = 0, F = 0, W = 0, se = 0; se < S.SheetNames.length; ++se) {
      var fe = S.SheetNames[se], ie = S.Sheets[fe];
      if (!(!ie || !ie["!ref"])) {
        ++W;
        var Q = lr(ie["!ref"]);
        C < Q.e.r && (C = Q.e.r), F < Q.e.c && (F = Q.e.c);
      }
    }
    return C > 8191 && (C = 8191), L.write_shift(2, C), L.write_shift(1, W), L.write_shift(1, F), L.write_shift(2, 0), L.write_shift(2, 0), L.write_shift(1, 1), L.write_shift(1, 2), L.write_shift(4, 0), L.write_shift(4, 0), L;
  }
  function f(S, L, C) {
    var F = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return L == 8 && C.qpro ? (F.s.c = S.read_shift(1), S.l++, F.s.r = S.read_shift(2), F.e.c = S.read_shift(1), S.l++, F.e.r = S.read_shift(2), F) : (F.s.c = S.read_shift(2), F.s.r = S.read_shift(2), L == 12 && C.qpro && (S.l += 2), F.e.c = S.read_shift(2), F.e.r = S.read_shift(2), L == 12 && C.qpro && (S.l += 2), F.s.c == 65535 && (F.s.c = F.e.c = F.s.r = F.e.r = 0), F);
  }
  function o(S) {
    var L = M(8);
    return L.write_shift(2, S.s.c), L.write_shift(2, S.s.r), L.write_shift(2, S.e.c), L.write_shift(2, S.e.r), L;
  }
  function l(S, L, C) {
    var F = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return C.qpro && C.vers != 20768 ? (F[0].c = S.read_shift(1), F[3] = S.read_shift(1), F[0].r = S.read_shift(2), S.l += 2) : (F[2] = S.read_shift(1), F[0].c = S.read_shift(2), F[0].r = S.read_shift(2)), F;
  }
  function c(S, L, C) {
    var F = S.l + L, W = l(S, L, C);
    if (W[1].t = "s", C.vers == 20768) {
      S.l++;
      var se = S.read_shift(1);
      return W[1].v = S.read_shift(se, "utf8"), W;
    }
    return C.qpro && S.l++, W[1].v = S.read_shift(F - S.l, "cstr"), W;
  }
  function h(S, L, C) {
    var F = M(7 + C.length);
    F.write_shift(1, 255), F.write_shift(2, L), F.write_shift(2, S), F.write_shift(1, 39);
    for (var W = 0; W < F.length; ++W) {
      var se = C.charCodeAt(W);
      F.write_shift(1, se >= 128 ? 95 : se);
    }
    return F.write_shift(1, 0), F;
  }
  function u(S, L, C) {
    var F = l(S, L, C);
    return F[1].v = S.read_shift(2, "i"), F;
  }
  function d(S, L, C) {
    var F = M(7);
    return F.write_shift(1, 255), F.write_shift(2, L), F.write_shift(2, S), F.write_shift(2, C, "i"), F;
  }
  function _(S, L, C) {
    var F = l(S, L, C);
    return F[1].v = S.read_shift(8, "f"), F;
  }
  function x(S, L, C) {
    var F = M(13);
    return F.write_shift(1, 255), F.write_shift(2, L), F.write_shift(2, S), F.write_shift(8, C, "f"), F;
  }
  function m(S, L, C) {
    var F = S.l + L, W = l(S, L, C);
    if (W[1].v = S.read_shift(8, "f"), C.qpro)
      S.l = F;
    else {
      var se = S.read_shift(2);
      N(S.slice(S.l, S.l + se), W), S.l += se;
    }
    return W;
  }
  function O(S, L, C) {
    var F = L & 32768;
    return L &= -32769, L = (F ? S : 0) + (L >= 8192 ? L - 16384 : L), (F ? "" : "$") + (C ? ze(L) : Xe(L));
  }
  var A = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, y = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "",
    "+",
    "-",
    "*",
    "/",
    "^",
    "=",
    "<>",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "<=",
    ">=",
    "<",
    ">",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "&",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
    // eslint-disable-line no-mixed-spaces-and-tabs
  ];
  function N(S, L) {
    ar(S, 0);
    for (var C = [], F = 0, W = "", se = "", fe = "", ie = ""; S.l < S.length; ) {
      var Q = S[S.l++];
      switch (Q) {
        case 0:
          C.push(S.read_shift(8, "f"));
          break;
        case 1:
          se = O(L[0].c, S.read_shift(2), !0), W = O(L[0].r, S.read_shift(2), !1), C.push(se + W);
          break;
        case 2:
          {
            var we = O(L[0].c, S.read_shift(2), !0), he = O(L[0].r, S.read_shift(2), !1);
            se = O(L[0].c, S.read_shift(2), !0), W = O(L[0].r, S.read_shift(2), !1), C.push(we + he + ":" + se + W);
          }
          break;
        case 3:
          if (S.l < S.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          C.push("(" + C.pop() + ")");
          break;
        case 5:
          C.push(S.read_shift(2));
          break;
        case 6:
          {
            for (var Ye = ""; Q = S[S.l++]; )
              Ye += String.fromCharCode(Q);
            C.push('"' + Ye.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          C.push("-" + C.pop());
          break;
        case 23:
          C.push("+" + C.pop());
          break;
        case 22:
          C.push("NOT(" + C.pop() + ")");
          break;
        case 20:
        case 21:
          ie = C.pop(), fe = C.pop(), C.push(["AND", "OR"][Q - 20] + "(" + fe + "," + ie + ")");
          break;
        default:
          if (Q < 32 && y[Q])
            ie = C.pop(), fe = C.pop(), C.push(fe + y[Q] + ie);
          else if (A[Q]) {
            if (F = A[Q][1], F == 69 && (F = S[S.l++]), F > C.length) {
              console.error("WK1 bad formula parse 0x" + Q.toString(16) + ":|" + C.join("|") + "|");
              return;
            }
            var pe = C.slice(-F);
            C.length -= F, C.push(A[Q][0] + "(" + pe.join(",") + ")");
          } else
            return Q <= 7 ? console.error("WK1 invalid opcode " + Q.toString(16)) : Q <= 24 ? console.error("WK1 unsupported op " + Q.toString(16)) : Q <= 30 ? console.error("WK1 invalid opcode " + Q.toString(16)) : Q <= 115 ? console.error("WK1 unsupported function opcode " + Q.toString(16)) : console.error("WK1 unrecognized opcode " + Q.toString(16));
      }
    }
    C.length == 1 ? L[1].f = "" + C[0] : console.error("WK1 bad formula parse |" + C.join("|") + "|");
  }
  function j(S) {
    var L = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return L[0].r = S.read_shift(2), L[3] = S[S.l++], L[0].c = S[S.l++], L;
  }
  function ee(S, L) {
    var C = j(S);
    return C[1].t = "s", C[1].v = S.read_shift(L - 4, "cstr"), C;
  }
  function D(S, L, C, F) {
    var W = M(6 + F.length);
    W.write_shift(2, S), W.write_shift(1, C), W.write_shift(1, L), W.write_shift(1, 39);
    for (var se = 0; se < F.length; ++se) {
      var fe = F.charCodeAt(se);
      W.write_shift(1, fe >= 128 ? 95 : fe);
    }
    return W.write_shift(1, 0), W;
  }
  function U(S, L) {
    var C = j(S);
    C[1].v = S.read_shift(2);
    var F = C[1].v >> 1;
    if (C[1].v & 1)
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
    return C[1].v = F, C;
  }
  function B(S, L) {
    var C = j(S), F = S.read_shift(4), W = S.read_shift(4), se = S.read_shift(2);
    if (se == 65535)
      return F === 0 && W === 3221225472 ? (C[1].t = "e", C[1].v = 15) : F === 0 && W === 3489660928 ? (C[1].t = "e", C[1].v = 42) : C[1].v = 0, C;
    var fe = se & 32768;
    return se = (se & 32767) - 16446, C[1].v = (1 - fe * 2) * (W * Math.pow(2, se + 32) + F * Math.pow(2, se)), C;
  }
  function V(S, L, C, F) {
    var W = M(14);
    if (W.write_shift(2, S), W.write_shift(1, C), W.write_shift(1, L), F == 0)
      return W.write_shift(4, 0), W.write_shift(4, 0), W.write_shift(2, 65535), W;
    var se = 0, fe = 0, ie = 0, Q = 0;
    return F < 0 && (se = 1, F = -F), fe = Math.log2(F) | 0, F /= Math.pow(2, fe - 31), Q = F >>> 0, Q & 2147483648 || (F /= 2, ++fe, Q = F >>> 0), F -= Q, Q |= 2147483648, Q >>>= 0, F *= Math.pow(2, 32), ie = F >>> 0, W.write_shift(4, ie), W.write_shift(4, Q), fe += 16383 + (se ? 32768 : 0), W.write_shift(2, fe), W;
  }
  function G(S, L) {
    var C = B(S);
    return S.l += L - 14, C;
  }
  function K(S, L) {
    var C = j(S), F = S.read_shift(4);
    return C[1].v = F >> 6, C;
  }
  function te(S, L) {
    var C = j(S), F = S.read_shift(8, "f");
    return C[1].v = F, C;
  }
  function Te(S, L) {
    var C = te(S);
    return S.l += L - 10, C;
  }
  function oe(S, L) {
    return S[S.l + L - 1] == 0 ? S.read_shift(L, "cstr") : "";
  }
  function Ue(S, L) {
    var C = S[S.l++];
    C > L - 1 && (C = L - 1);
    for (var F = ""; F.length < C; )
      F += String.fromCharCode(S[S.l++]);
    return F;
  }
  function De(S, L, C) {
    if (!(!C.qpro || L < 21)) {
      var F = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var W = S.read_shift(L - 21, "cstr");
      return [F, W];
    }
  }
  function pr(S, L) {
    for (var C = {}, F = S.l + L; S.l < F; ) {
      var W = S.read_shift(2);
      if (W == 14e3) {
        for (C[W] = [0, ""], C[W][0] = S.read_shift(2); S[S.l]; )
          C[W][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return C;
  }
  function Pe(S, L) {
    var C = M(5 + S.length);
    C.write_shift(2, 14e3), C.write_shift(2, L);
    for (var F = 0; F < S.length; ++F) {
      var W = S.charCodeAt(F);
      C[C.l++] = W > 127 ? 95 : W;
    }
    return C[C.l++] = 0, C;
  }
  var cr = {
    /*::[*/
    0: { n: "BOF", f: Mi },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "CALCMODE" },
    /*::[*/
    3: { n: "CALCORDER" },
    /*::[*/
    4: { n: "SPLIT" },
    /*::[*/
    5: { n: "SYNC" },
    /*::[*/
    6: { n: "RANGE", f },
    /*::[*/
    7: { n: "WINDOW1" },
    /*::[*/
    8: { n: "COLW1" },
    /*::[*/
    9: { n: "WINTWO" },
    /*::[*/
    10: { n: "COLW2" },
    /*::[*/
    11: { n: "NAME" },
    /*::[*/
    12: { n: "BLANK" },
    /*::[*/
    13: { n: "INTEGER", f: u },
    /*::[*/
    14: { n: "NUMBER", f: _ },
    /*::[*/
    15: { n: "LABEL", f: c },
    /*::[*/
    16: { n: "FORMULA", f: m },
    /*::[*/
    24: { n: "TABLE" },
    /*::[*/
    25: { n: "ORANGE" },
    /*::[*/
    26: { n: "PRANGE" },
    /*::[*/
    27: { n: "SRANGE" },
    /*::[*/
    28: { n: "FRANGE" },
    /*::[*/
    29: { n: "KRANGE1" },
    /*::[*/
    32: { n: "HRANGE" },
    /*::[*/
    35: { n: "KRANGE2" },
    /*::[*/
    36: { n: "PROTEC" },
    /*::[*/
    37: { n: "FOOTER" },
    /*::[*/
    38: { n: "HEADER" },
    /*::[*/
    39: { n: "SETUP" },
    /*::[*/
    40: { n: "MARGINS" },
    /*::[*/
    41: { n: "LABELFMT" },
    /*::[*/
    42: { n: "TITLES" },
    /*::[*/
    43: { n: "SHEETJS" },
    /*::[*/
    45: { n: "GRAPH" },
    /*::[*/
    46: { n: "NGRAPH" },
    /*::[*/
    47: { n: "CALCCOUNT" },
    /*::[*/
    48: { n: "UNFORMATTED" },
    /*::[*/
    49: { n: "CURSORW12" },
    /*::[*/
    50: { n: "WINDOW" },
    /*::[*/
    51: { n: "STRING", f: c },
    /*::[*/
    55: { n: "PASSWORD" },
    /*::[*/
    56: { n: "LOCKED" },
    /*::[*/
    60: { n: "QUERY" },
    /*::[*/
    61: { n: "QUERYNAME" },
    /*::[*/
    62: { n: "PRINT" },
    /*::[*/
    63: { n: "PRINTNAME" },
    /*::[*/
    64: { n: "GRAPH2" },
    /*::[*/
    65: { n: "GRAPHNAME" },
    /*::[*/
    66: { n: "ZOOM" },
    /*::[*/
    67: { n: "SYMSPLIT" },
    /*::[*/
    68: { n: "NSROWS" },
    /*::[*/
    69: { n: "NSCOLS" },
    /*::[*/
    70: { n: "RULER" },
    /*::[*/
    71: { n: "NNAME" },
    /*::[*/
    72: { n: "ACOMM" },
    /*::[*/
    73: { n: "AMACRO" },
    /*::[*/
    74: { n: "PARSE" },
    /*::[*/
    102: { n: "PRANGES??" },
    /*::[*/
    103: { n: "RRANGES??" },
    /*::[*/
    104: { n: "FNAME??" },
    /*::[*/
    105: { n: "MRANGES??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: oe },
    /*::[*/
    222: { n: "SHEETNAMELP", f: Ue },
    /*::[*/
    65535: { n: "" }
  }, tr = {
    /*::[*/
    0: { n: "BOF" },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "PASSWORD" },
    /*::[*/
    3: { n: "CALCSET" },
    /*::[*/
    4: { n: "WINDOWSET" },
    /*::[*/
    5: { n: "SHEETCELLPTR" },
    /*::[*/
    6: { n: "SHEETLAYOUT" },
    /*::[*/
    7: { n: "COLUMNWIDTH" },
    /*::[*/
    8: { n: "HIDDENCOLUMN" },
    /*::[*/
    9: { n: "USERRANGE" },
    /*::[*/
    10: { n: "SYSTEMRANGE" },
    /*::[*/
    11: { n: "ZEROFORCE" },
    /*::[*/
    12: { n: "SORTKEYDIR" },
    /*::[*/
    13: { n: "FILESEAL" },
    /*::[*/
    14: { n: "DATAFILLNUMS" },
    /*::[*/
    15: { n: "PRINTMAIN" },
    /*::[*/
    16: { n: "PRINTSTRING" },
    /*::[*/
    17: { n: "GRAPHMAIN" },
    /*::[*/
    18: { n: "GRAPHSTRING" },
    /*::[*/
    19: { n: "??" },
    /*::[*/
    20: { n: "ERRCELL" },
    /*::[*/
    21: { n: "NACELL" },
    /*::[*/
    22: { n: "LABEL16", f: ee },
    /*::[*/
    23: { n: "NUMBER17", f: B },
    /*::[*/
    24: { n: "NUMBER18", f: U },
    /*::[*/
    25: { n: "FORMULA19", f: G },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: pr },
    /*::[*/
    28: { n: "DTLABELMISC" },
    /*::[*/
    29: { n: "DTLABELCELL" },
    /*::[*/
    30: { n: "GRAPHWINDOW" },
    /*::[*/
    31: { n: "CPA" },
    /*::[*/
    32: { n: "LPLAUTO" },
    /*::[*/
    33: { n: "QUERY" },
    /*::[*/
    34: { n: "HIDDENSHEET" },
    /*::[*/
    35: { n: "??" },
    /*::[*/
    37: { n: "NUMBER25", f: K },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: te },
    /*::[*/
    40: { n: "FORMULA28", f: Te },
    /*::[*/
    142: { n: "??" },
    /*::[*/
    147: { n: "??" },
    /*::[*/
    150: { n: "??" },
    /*::[*/
    151: { n: "??" },
    /*::[*/
    152: { n: "??" },
    /*::[*/
    153: { n: "??" },
    /*::[*/
    154: { n: "??" },
    /*::[*/
    155: { n: "??" },
    /*::[*/
    156: { n: "??" },
    /*::[*/
    163: { n: "??" },
    /*::[*/
    174: { n: "??" },
    /*::[*/
    175: { n: "??" },
    /*::[*/
    176: { n: "??" },
    /*::[*/
    177: { n: "??" },
    /*::[*/
    184: { n: "??" },
    /*::[*/
    185: { n: "??" },
    /*::[*/
    186: { n: "??" },
    /*::[*/
    187: { n: "??" },
    /*::[*/
    188: { n: "??" },
    /*::[*/
    195: { n: "??" },
    /*::[*/
    201: { n: "??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: oe },
    /*::[*/
    205: { n: "??" },
    /*::[*/
    206: { n: "??" },
    /*::[*/
    207: { n: "??" },
    /*::[*/
    208: { n: "??" },
    /*::[*/
    256: { n: "??" },
    /*::[*/
    259: { n: "??" },
    /*::[*/
    260: { n: "??" },
    /*::[*/
    261: { n: "??" },
    /*::[*/
    262: { n: "??" },
    /*::[*/
    263: { n: "??" },
    /*::[*/
    265: { n: "??" },
    /*::[*/
    266: { n: "??" },
    /*::[*/
    267: { n: "??" },
    /*::[*/
    268: { n: "??" },
    /*::[*/
    270: { n: "??" },
    /*::[*/
    271: { n: "??" },
    /*::[*/
    384: { n: "??" },
    /*::[*/
    389: { n: "??" },
    /*::[*/
    390: { n: "??" },
    /*::[*/
    393: { n: "??" },
    /*::[*/
    396: { n: "??" },
    /*::[*/
    512: { n: "??" },
    /*::[*/
    514: { n: "??" },
    /*::[*/
    513: { n: "??" },
    /*::[*/
    516: { n: "??" },
    /*::[*/
    517: { n: "??" },
    /*::[*/
    640: { n: "??" },
    /*::[*/
    641: { n: "??" },
    /*::[*/
    642: { n: "??" },
    /*::[*/
    643: { n: "??" },
    /*::[*/
    644: { n: "??" },
    /*::[*/
    645: { n: "??" },
    /*::[*/
    646: { n: "??" },
    /*::[*/
    647: { n: "??" },
    /*::[*/
    648: { n: "??" },
    /*::[*/
    658: { n: "??" },
    /*::[*/
    659: { n: "??" },
    /*::[*/
    660: { n: "??" },
    /*::[*/
    661: { n: "??" },
    /*::[*/
    662: { n: "??" },
    /*::[*/
    665: { n: "??" },
    /*::[*/
    666: { n: "??" },
    /*::[*/
    768: { n: "??" },
    /*::[*/
    772: { n: "??" },
    /*::[*/
    1537: { n: "SHEETINFOQP", f: De },
    /*::[*/
    1600: { n: "??" },
    /*::[*/
    1602: { n: "??" },
    /*::[*/
    1793: { n: "??" },
    /*::[*/
    1794: { n: "??" },
    /*::[*/
    1795: { n: "??" },
    /*::[*/
    1796: { n: "??" },
    /*::[*/
    1920: { n: "??" },
    /*::[*/
    2048: { n: "??" },
    /*::[*/
    2049: { n: "??" },
    /*::[*/
    2052: { n: "??" },
    /*::[*/
    2688: { n: "??" },
    /*::[*/
    10998: { n: "??" },
    /*::[*/
    12849: { n: "??" },
    /*::[*/
    28233: { n: "??" },
    /*::[*/
    28484: { n: "??" },
    /*::[*/
    65535: { n: "" }
  };
  return {
    sheet_to_wk1: n,
    book_to_wk3: a,
    to_workbook: t
  };
}(), Sc = /^\s|\s$|[\t\n\r]/;
function Gi(e, t) {
  if (!t.bookSST)
    return "";
  var r = [Ie];
  r[r.length] = q("sst", null, {
    xmlns: Tt[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(Sc) && (i += ' xml:space="preserve"'), i += ">" + ge(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Ac(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function yc(e, t) {
  return t || (t = M(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var Fc = vo;
function Cc(e) {
  var t = Qe();
  H(t, 159, yc(e));
  for (var r = 0; r < e.length; ++r)
    H(t, 19, Fc(e[r]));
  return H(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function Oc(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n)
    t[n] = r[n].charCodeAt(0);
  return t;
}
function Xi(e) {
  var t = 0, r, n = Oc(e), a = n.length + 1, i, s, f, o, l;
  for (r = Zr(a), r[0] = n.length, i = 1; i != a; ++i)
    r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, o = t << 1 & 32767, l = f | o, t = l ^ s;
  return t ^ 52811;
}
var Dc = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Ir(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(de && Buffer.isBuffer(a) ? a.toString("binary") : Xt(a), i);
      case "array":
        return t(Rn(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, o = a.match(/\\trowd.*?\\row\b/g);
    if (!o.length)
      throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: o.length - 1 } };
    return o.forEach(function(c, h) {
      Array.isArray(f) && (f[h] = []);
      for (var u = /\\\w+\b/g, d = 0, _, x = -1; _ = u.exec(c); ) {
        switch (_[0]) {
          case "\\cell":
            var m = c.slice(d, u.lastIndex - _[0].length);
            if (m[0] == " " && (m = m.slice(1)), ++x, m.length) {
              var O = { v: m, t: "s" };
              Array.isArray(f) ? f[h][x] = O : f[_e({ r: h, c: x })] = O;
            }
            break;
        }
        d = u.lastIndex;
      }
      x > l.e.c && (l.e.c = x);
    }), f["!ref"] = ke(l), f;
  }
  function r(a, i) {
    return rt(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Se(a["!ref"]), f, o = Array.isArray(a), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c)
        i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var h = _e({ r: l, c });
        f = o ? (a[l] || [])[c] : a[h], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Nr(f), f.w))), i.push("\\cell"));
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
function Sa(e) {
  for (var t = 0, r = 1; t != 3; ++t)
    r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var Rc = 6, kr = Rc;
function Tn(e) {
  return Math.floor((e + Math.round(128 / kr) / 256) * kr);
}
function En(e) {
  return Math.floor((e - 5) / kr * 100 + 0.5) / 100;
}
function r0(e) {
  return Math.round((e * kr + 5) / kr * 256) / 256;
}
function E0(e) {
  e.width ? (e.wpx = Tn(e.width), e.wch = En(e.wpx), e.MDW = kr) : e.wpx ? (e.wch = En(e.wpx), e.width = r0(e.wch), e.MDW = kr) : typeof e.wch == "number" && (e.width = r0(e.wch), e.wpx = Tn(e.width), e.MDW = kr), e.customWidth && delete e.customWidth;
}
var kc = 96, ji = kc;
function wn(e) {
  return e * 96 / ji;
}
function $i(e) {
  return e * ji / 96;
}
function Ic(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n)
      e[n] != null && (t[t.length] = q("numFmt", null, { numFmtId: n, formatCode: ge(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = q("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Nc(e) {
  var t = [];
  return t[t.length] = q("cellXfs", null), e.forEach(function(r) {
    t[t.length] = q("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = q("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function zi(e, t) {
  var r = [Ie, q("styleSheet", null, {
    xmlns: Tt[0],
    "xmlns:vt": Be.vt
  })], n;
  return e.SSF && (n = Ic(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = Nc(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Pc(e, t) {
  var r = e.read_shift(2), n = Ke(e);
  return [r, n];
}
function Lc(e, t, r) {
  r || (r = M(6 + 4 * t.length)), r.write_shift(2, e), be(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function Bc(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = So(e);
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
  var o = e.read_shift(1);
  switch (o > 0 && (n.charset = o), e.l++, n.color = wo(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = Ke(e), n;
}
function Mc(e, t) {
  t || (t = M(25 + 4 * 32)), t.write_shift(2, e.sz * 20), Ao(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), gn(e.color, t);
  var n = 0;
  return e.scheme == "major" && (n = 1), e.scheme == "minor" && (n = 2), t.write_shift(1, n), be(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var bc = [
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
], jn, Uc = Ar;
function Aa(e, t) {
  t || (t = M(4 * 3 + 8 * 7 + 16 * 1)), jn || (jn = o0(bc));
  var r = jn[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (gn({ auto: 1 }, t), gn({ auto: 1 }, t); n < 12; ++n)
      t.write_shift(4, 0);
  else {
    for (; n < 4; ++n)
      t.write_shift(4, 0);
    for (; n < 12; ++n)
      t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function Hc(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function Ki(e, t, r) {
  r || (r = M(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function Ot(e, t) {
  return t || (t = M(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Wc = Ar;
function Vc(e, t) {
  return t || (t = M(51)), t.write_shift(1, 0), Ot(null, t), Ot(null, t), Ot(null, t), Ot(null, t), Ot(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Gc(e, t) {
  return t || (t = M(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, +e.builtinId), t.write_shift(1, 0), mn(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Xc(e, t, r) {
  var n = M(2052);
  return n.write_shift(4, e), mn(t, n), mn(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function jc(e, t) {
  if (t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && ++r;
    }), r != 0 && (H(e, 615, Tr(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && H(e, 44, Lc(a, t[a]));
    }), H(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function $c(e) {
  var t = 1;
  H(e, 611, Tr(t)), H(e, 43, Mc({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2,
    scheme: "minor"
  })), H(
    e,
    612
    /* BrtEndFonts */
  );
}
function zc(e) {
  var t = 2;
  H(e, 603, Tr(t)), H(e, 45, Aa({ patternType: "none" })), H(e, 45, Aa({ patternType: "gray125" })), H(
    e,
    604
    /* BrtEndFills */
  );
}
function Kc(e) {
  var t = 1;
  H(e, 613, Tr(t)), H(e, 46, Vc()), H(
    e,
    614
    /* BrtEndBorders */
  );
}
function Yc(e) {
  var t = 1;
  H(e, 626, Tr(t)), H(e, 47, Ki({
    numFmtId: 0,
    fontId: 0,
    fillId: 0,
    borderId: 0
  }, 65535)), H(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function qc(e, t) {
  H(e, 617, Tr(t.length)), t.forEach(function(r) {
    H(e, 47, Ki(r, 0));
  }), H(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function Jc(e) {
  var t = 1;
  H(e, 619, Tr(t)), H(e, 48, Gc({
    xfId: 0,
    builtinId: 0,
    name: "Normal"
  })), H(
    e,
    620
    /* BrtEndStyles */
  );
}
function Zc(e) {
  var t = 0;
  H(e, 505, Tr(t)), H(
    e,
    506
    /* BrtEndDXFs */
  );
}
function Qc(e) {
  var t = 0;
  H(e, 508, Xc(t, "TableStyleMedium9", "PivotStyleMedium4")), H(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function eu(e, t) {
  var r = Qe();
  return H(
    r,
    278
    /* BrtBeginStyleSheet */
  ), jc(r, e.SSF), $c(r), zc(r), Kc(r), Yc(r), qc(r, t.cellXfs), Jc(r), Zc(r), Qc(r), H(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
function Yi(e, t) {
  if (t && t.themeXLSX)
    return t.themeXLSX;
  if (e && typeof e.raw == "string")
    return e.raw;
  var r = [Ie];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function ru(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Ke(e)
  };
}
function tu(e) {
  var t = M(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), be(e.name, t), t.slice(0, t.l);
}
function nu(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function au(e) {
  var t = M(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function iu(e, t) {
  var r = M(8 + 2 * t.length);
  return r.write_shift(4, e), be(t, r), r.slice(0, r.l);
}
function su(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function fu(e, t) {
  var r = M(8);
  return r.write_shift(4, e), r.write_shift(4, t ? 1 : 0), r;
}
function lu() {
  var e = Qe();
  return H(e, 332), H(e, 334, Tr(1)), H(e, 335, tu({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), H(e, 336), H(e, 339, iu(1, "XLDAPR")), H(e, 52), H(e, 35, Tr(514)), H(e, 4096, Tr(0)), H(e, 4097, xr(1)), H(e, 36), H(e, 53), H(e, 340), H(e, 337, fu(1, !0)), H(e, 51, au([[1, 0]])), H(e, 338), H(e, 333), e.end();
}
function qi() {
  var e = [Ie];
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
function ou(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = _e(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
var ut = 1024;
function Ji(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    q("xml", null, { "xmlns:v": ir.v, "xmlns:o": ir.o, "xmlns:x": ir.x, "xmlns:mv": ir.mv }).replace(/\/>/, ">"),
    q("o:shapelayout", q("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    q("v:shapetype", [
      q("v:stroke", null, { joinstyle: "miter" }),
      q("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; ut < e * 1e3; )
    ut += 1e3;
  return t.forEach(function(i) {
    var s = Me(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var o = f.type == "gradient" ? q("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = q("v:fill", o, f), c = { on: "t", obscured: "t" };
    ++ut, a = a.concat([
      "<v:shape" + Ht({
        id: "_x0000_s" + ut,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      q("v:shadow", null, c),
      q("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      Ge("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      Ge("x:AutoFill", "False"),
      Ge("x:Row", String(s.r)),
      Ge("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Zi(e) {
  var t = [Ie, q("comments", null, { xmlns: Tt[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = ge(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(o) {
      o.a && (a = r.indexOf(ge(o.a))), i.push(o.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1)
      t.push(Ge("t", ge(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f)
        s += `Reply:
    ` + i[f] + `
`;
      t.push(Ge("t", ge(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function cu(e, t, r) {
  var n = [Ie, q("ThreadedComments", null, { xmlns: Be.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, f) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && t.indexOf(s.a) == -1 && t.push(s.a);
      var o = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + r.tcid++).slice(-12) + "}"
      };
      f == 0 ? i = o.id : o.parentId = i, s.ID = o.id, s.a && (o.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(q("threadedComment", Ge("text", s.t || ""), o));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function uu(e) {
  var t = [Ie, q("personList", null, {
    xmlns: Be.TCMNT,
    "xmlns:x": Tt[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, n) {
    t.push(q("person", null, {
      displayName: r,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: r,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function hu(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = it(e);
  return t.rfx = r.s, t.ref = _e(r.s), e.l += 16, t;
}
function xu(e, t) {
  return t == null && (t = M(36)), t.write_shift(4, e[1].iauthor), wt(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var du = Ke;
function pu(e) {
  return be(e.slice(0, 54));
}
function vu(e) {
  var t = Qe(), r = [];
  return H(
    t,
    628
    /* BrtBeginComments */
  ), H(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), H(t, 632, pu(a.a)));
    });
  }), H(
    t,
    631
    /* BrtEndCommentAuthors */
  ), H(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: Me(n[0]), e: Me(n[0]) };
      H(t, 635, xu([i, a])), a.t && a.t.length > 0 && H(t, 637, go(a)), H(
        t,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), H(
    t,
    634
    /* BrtEndCommentList */
  ), H(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
function mu(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && Ee.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var Qi = ["xlsb", "xlsm", "xlam", "biff8", "xla"], gu = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, o = !1;
    i.length == 0 ? o = !0 : i.charAt(0) == "[" && (o = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? c += t.c : --c, o ? l += t.r : --l, a + (f ? "" : "$") + ze(c) + (o ? "" : "$") + Xe(l);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), w0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, S0 = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(w0, function(n, a, i, s, f, o) {
      var l = v0(s) - (i ? 0 : r.c), c = p0(o) - (f ? 0 : r.r), h = c == 0 ? "" : f ? c + 1 : "[" + c + "]", u = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return a + "R" + h + "C" + u;
    });
  };
}();
function _u(e, t) {
  return e.replace(w0, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : ze(v0(i) + t.c)) + (s == "$" ? s + f : Xe(p0(f) + t.r));
  });
}
function Tu(e) {
  return e.length != 1;
}
function Re(e) {
  e.l += 1;
}
function Gr(e, t) {
  var r = e.read_shift(t == 1 ? 1 : 2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function es(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5)
      return rs(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = Gr(e, 2), f = Gr(e, 2);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function rs(e) {
  var t = Gr(e, 2), r = Gr(e, 2), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function Eu(e, t, r) {
  if (r.biff < 8)
    return rs(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = Gr(e, 2), s = Gr(e, 2);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function ts(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5)
    return wu(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = Gr(e, 2);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function wu(e) {
  var t = Gr(e, 2), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function Su(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function Au(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5)
    return yu(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1)
    for (; a > 524287; )
      a -= 1048576;
  if (s == 1)
    for (; i > 8191; )
      i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function yu(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function Fu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = es(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function Cu(e, t, r) {
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
  var s = es(e, i, r);
  return [n, a, s];
}
function Ou(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function Du(e, t, r) {
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
function Ru(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = Eu(e, t - 1, r);
  return [n, a];
}
function ku(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function ya(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function Iu(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i)
    a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function Nu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Pu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Lu(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function Bu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function ns(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function Mu(e) {
  return e.read_shift(2), ns(e);
}
function bu(e) {
  return e.read_shift(2), ns(e);
}
function Uu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = ts(e, 0, r);
  return [n, a];
}
function Hu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Au(e, 0, r);
  return [n, a];
}
function Wu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = ts(e, 0, r);
  return [n, a, i];
}
function Vu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [V1[a], ss[a], n];
}
function Gu(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : Xu(e);
  return [a, (i[0] === 0 ? ss : W1)[i[1]]];
}
function Xu(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function ju(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function $u(e, t, r) {
  if (e.l++, r && r.biff == 12)
    return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function zu(e) {
  return e.l++, zt[e.read_shift(1)];
}
function Ku(e) {
  return e.l++, e.read_shift(2);
}
function Yu(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function qu(e) {
  return e.l++, St(e);
}
function Ju(e, t, r) {
  return e.l++, Ui(e, t - 1, r);
}
function Zu(e, t) {
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
      r[1] = Wo(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = zt[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = St(e);
      break;
    case 2:
      r[1] = jo(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function Qu(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i)
    a.push((r.biff == 12 ? it : Ko)(e));
  return a;
}
function e1(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f)
      s[i][f] = Zu(e, r.biff);
  return s;
}
function r1(e, t, r) {
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
function t1(e, t, r) {
  if (r.biff == 5)
    return n1(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function n1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function a1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function i1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function s1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function f1(e, t, r) {
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
var l1 = Ar, o1 = Ar, c1 = Ar;
function Kt(e, t, r) {
  return e.l += 2, [Su(e)];
}
function A0(e) {
  return e.l += 6, [];
}
var u1 = Kt, h1 = A0, x1 = A0, d1 = Kt;
function as(e) {
  return e.l += 2, [Mi(e), e.read_shift(2) & 1];
}
var p1 = Kt, v1 = as, m1 = A0, g1 = Kt, _1 = Kt, T1 = [
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
function E1(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = T1[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function w1(e) {
  return e.l += 2, [e.read_shift(4)];
}
function S1(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function A1(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function y1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function F1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function C1(e) {
  return e.l += 4, [0, 0];
}
var Fa = {
  /*::[*/
  1: { n: "PtgExp", f: $u },
  /*::[*/
  2: { n: "PtgTbl", f: c1 },
  /*::[*/
  3: { n: "PtgAdd", f: Re },
  /*::[*/
  4: { n: "PtgSub", f: Re },
  /*::[*/
  5: { n: "PtgMul", f: Re },
  /*::[*/
  6: { n: "PtgDiv", f: Re },
  /*::[*/
  7: { n: "PtgPower", f: Re },
  /*::[*/
  8: { n: "PtgConcat", f: Re },
  /*::[*/
  9: { n: "PtgLt", f: Re },
  /*::[*/
  10: { n: "PtgLe", f: Re },
  /*::[*/
  11: { n: "PtgEq", f: Re },
  /*::[*/
  12: { n: "PtgGe", f: Re },
  /*::[*/
  13: { n: "PtgGt", f: Re },
  /*::[*/
  14: { n: "PtgNe", f: Re },
  /*::[*/
  15: { n: "PtgIsect", f: Re },
  /*::[*/
  16: { n: "PtgUnion", f: Re },
  /*::[*/
  17: { n: "PtgRange", f: Re },
  /*::[*/
  18: { n: "PtgUplus", f: Re },
  /*::[*/
  19: { n: "PtgUminus", f: Re },
  /*::[*/
  20: { n: "PtgPercent", f: Re },
  /*::[*/
  21: { n: "PtgParen", f: Re },
  /*::[*/
  22: { n: "PtgMissArg", f: Re },
  /*::[*/
  23: { n: "PtgStr", f: Ju },
  /*::[*/
  26: { n: "PtgSheet", f: S1 },
  /*::[*/
  27: { n: "PtgEndSheet", f: A1 },
  /*::[*/
  28: { n: "PtgErr", f: zu },
  /*::[*/
  29: { n: "PtgBool", f: Yu },
  /*::[*/
  30: { n: "PtgInt", f: Ku },
  /*::[*/
  31: { n: "PtgNum", f: qu },
  /*::[*/
  32: { n: "PtgArray", f: ku },
  /*::[*/
  33: { n: "PtgFunc", f: Vu },
  /*::[*/
  34: { n: "PtgFuncVar", f: Gu },
  /*::[*/
  35: { n: "PtgName", f: r1 },
  /*::[*/
  36: { n: "PtgRef", f: Uu },
  /*::[*/
  37: { n: "PtgArea", f: Fu },
  /*::[*/
  38: { n: "PtgMemArea", f: a1 },
  /*::[*/
  39: { n: "PtgMemErr", f: l1 },
  /*::[*/
  40: { n: "PtgMemNoMem", f: o1 },
  /*::[*/
  41: { n: "PtgMemFunc", f: i1 },
  /*::[*/
  42: { n: "PtgRefErr", f: s1 },
  /*::[*/
  43: { n: "PtgAreaErr", f: Ou },
  /*::[*/
  44: { n: "PtgRefN", f: Hu },
  /*::[*/
  45: { n: "PtgAreaN", f: Ru },
  /*::[*/
  46: { n: "PtgMemAreaN", f: y1 },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: F1 },
  /*::[*/
  57: { n: "PtgNameX", f: t1 },
  /*::[*/
  58: { n: "PtgRef3d", f: Wu },
  /*::[*/
  59: { n: "PtgArea3d", f: Cu },
  /*::[*/
  60: { n: "PtgRefErr3d", f: f1 },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: Du },
  /*::[*/
  255: {}
}, O1 = {
  /*::[*/
  64: 32,
  /*::[*/
  96: 32,
  /*::[*/
  65: 33,
  /*::[*/
  97: 33,
  /*::[*/
  66: 34,
  /*::[*/
  98: 34,
  /*::[*/
  67: 35,
  /*::[*/
  99: 35,
  /*::[*/
  68: 36,
  /*::[*/
  100: 36,
  /*::[*/
  69: 37,
  /*::[*/
  101: 37,
  /*::[*/
  70: 38,
  /*::[*/
  102: 38,
  /*::[*/
  71: 39,
  /*::[*/
  103: 39,
  /*::[*/
  72: 40,
  /*::[*/
  104: 40,
  /*::[*/
  73: 41,
  /*::[*/
  105: 41,
  /*::[*/
  74: 42,
  /*::[*/
  106: 42,
  /*::[*/
  75: 43,
  /*::[*/
  107: 43,
  /*::[*/
  76: 44,
  /*::[*/
  108: 44,
  /*::[*/
  77: 45,
  /*::[*/
  109: 45,
  /*::[*/
  78: 46,
  /*::[*/
  110: 46,
  /*::[*/
  79: 47,
  /*::[*/
  111: 47,
  /*::[*/
  88: 34,
  /*::[*/
  120: 34,
  /*::[*/
  89: 57,
  /*::[*/
  121: 57,
  /*::[*/
  90: 58,
  /*::[*/
  122: 58,
  /*::[*/
  91: 59,
  /*::[*/
  123: 59,
  /*::[*/
  92: 60,
  /*::[*/
  124: 60,
  /*::[*/
  93: 61,
  /*::[*/
  125: 61
}, D1 = {
  /*::[*/
  1: { n: "PtgElfLel", f: as },
  /*::[*/
  2: { n: "PtgElfRw", f: g1 },
  /*::[*/
  3: { n: "PtgElfCol", f: u1 },
  /*::[*/
  6: { n: "PtgElfRwV", f: _1 },
  /*::[*/
  7: { n: "PtgElfColV", f: d1 },
  /*::[*/
  10: { n: "PtgElfRadical", f: p1 },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: m1 },
  /*::[*/
  13: { n: "PtgElfColS", f: h1 },
  /*::[*/
  15: { n: "PtgElfColSV", f: x1 },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: v1 },
  /*::[*/
  25: { n: "PtgList", f: E1 },
  /*::[*/
  29: { n: "PtgSxName", f: w1 },
  /*::[*/
  255: {}
}, R1 = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: C1 },
  /*::[*/
  1: { n: "PtgAttrSemi", f: Bu },
  /*::[*/
  2: { n: "PtgAttrIf", f: Pu },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Iu },
  /*::[*/
  8: { n: "PtgAttrGoto", f: Nu },
  /*::[*/
  16: { n: "PtgAttrSum", f: ju },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: ya },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: ya },
  /*::[*/
  64: { n: "PtgAttrSpace", f: Mu },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: bu },
  /*::[*/
  128: { n: "PtgAttrIfError", f: Lu },
  /*::[*/
  255: {}
};
function k1(e, t, r, n) {
  if (n.biff < 8)
    return Ar(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = e1(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = Qu(e, r[s][1], n), i.push(r[s][2]);
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
  return t = a - e.l, t !== 0 && i.push(Ar(e, t)), i;
}
function I1(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = Fa[i] || Fa[O1[i]], (i === 24 || i === 25) && (a = (i === 24 ? D1 : R1)[e[e.l + 1]]), !a || !a.f ? Ar(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function N1(e) {
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
var P1 = {
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
function L1(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2))
    throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function is(e, t, r) {
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
function Ca(e, t, r) {
  var n = is(e, t, r);
  return n == "#REF" ? n : L1(n, r);
}
function mt(e, t, r, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }
  ), f = [], o, l, c, h = 0, u = 0, d, _ = "";
  if (!e[0] || !e[0][0])
    return "";
  for (var x = -1, m = "", O = 0, A = e[0].length; O < A; ++O) {
    var y = e[0][O];
    switch (y[0]) {
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
        if (o = f.pop(), l = f.pop(), x >= 0) {
          switch (e[0][x][1][0]) {
            case 0:
              m = Ce(" ", e[0][x][1][1]);
              break;
            case 1:
              m = Ce("\r", e[0][x][1][1]);
              break;
            default:
              if (m = "", a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          l = l + m, x = -1;
        }
        f.push(l + P1[y[0]] + o);
        break;
      case "PtgIsect":
        o = f.pop(), l = f.pop(), f.push(l + " " + o);
        break;
      case "PtgUnion":
        o = f.pop(), l = f.pop(), f.push(l + "," + o);
        break;
      case "PtgRange":
        o = f.pop(), l = f.pop(), f.push(l + ":" + o);
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
        c = Nt(y[1][1], s, a), f.push(Pt(c, i));
        break;
      case "PtgRefN":
        c = r ? Nt(y[1][1], r, a) : y[1][1], f.push(Pt(c, i));
        break;
      case "PtgRef3d":
        h = /*::Number(*/
        y[1][1], c = Nt(y[1][2], s, a), _ = Ca(n, h, a), f.push(_ + "!" + Pt(c, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var N = y[1][0], j = y[1][1];
        N || (N = 0), N &= 127;
        var ee = N == 0 ? [] : f.slice(-N);
        f.length -= N, j === "User" && (j = ee.shift()), f.push(j + "(" + ee.join(",") + ")");
        break;
      case "PtgBool":
        f.push(y[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(
          /*::String(*/
          y[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        f.push(String(y[1]));
        break;
      case "PtgStr":
        f.push('"' + y[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(
          /*::String(*/
          y[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        d = ua(y[1][1], r ? { s: r } : s, a), f.push(Gn(d, a));
        break;
      case "PtgArea":
        d = ua(y[1][1], s, a), f.push(Gn(d, a));
        break;
      case "PtgArea3d":
        h = /*::Number(*/
        y[1][1], d = y[1][2], _ = Ca(n, h, a), f.push(_ + "!" + Gn(d, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        u = y[1][2];
        var D = (n.names || [])[u - 1] || (n[0] || [])[u], U = D ? D.Name : "SH33TJSNAME" + String(u);
        U && U.slice(0, 6) == "_xlfn." && !a.xlfn && (U = U.slice(6)), f.push(U);
        break;
      case "PtgNameX":
        var B = y[1][1];
        u = y[1][2];
        var V;
        if (a.biff <= 5)
          B < 0 && (B = -B), n[B] && (V = n[B][u]);
        else {
          var G = "";
          if (((n[B] || [])[0] || [])[0] == 14849 || (((n[B] || [])[0] || [])[0] == 1025 ? n[B][u] && n[B][u].itab > 0 && (G = n.SheetNames[n[B][u].itab - 1] + "!") : G = n.SheetNames[u - 1] + "!"), n[B] && n[B][u])
            G += n[B][u].Name;
          else if (n[0] && n[0][u])
            G += n[0][u].Name;
          else {
            var K = (is(n, B, a) || "").split(";;");
            K[u - 1] ? G = K[u - 1] : G += "SH33TJSERRX";
          }
          f.push(G);
          break;
        }
        V || (V = { Name: "SH33TJSERRY" }), f.push(V.Name);
        break;
      case "PtgParen":
        var te = "(", Te = ")";
        if (x >= 0) {
          switch (m = "", e[0][x][1][0]) {
            case 2:
              te = Ce(" ", e[0][x][1][1]) + te;
              break;
            case 3:
              te = Ce("\r", e[0][x][1][1]) + te;
              break;
            case 4:
              Te = Ce(" ", e[0][x][1][1]) + Te;
              break;
            case 5:
              Te = Ce("\r", e[0][x][1][1]) + Te;
              break;
            default:
              if (a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          x = -1;
        }
        f.push(te + f.pop() + Te);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        c = { c: y[1][1], r: y[1][0] };
        var oe = { c: r.c, r: r.r };
        if (n.sharedf[_e(c)]) {
          var Ue = n.sharedf[_e(c)];
          f.push(mt(Ue, s, oe, n, a));
        } else {
          var De = !1;
          for (o = 0; o != n.arrayf.length; ++o)
            if (l = n.arrayf[o], !(c.c < l[0].s.c || c.c > l[0].e.c) && !(c.r < l[0].s.r || c.r > l[0].e.r)) {
              f.push(mt(l[1], s, oe, n, a)), De = !0;
              break;
            }
          De || f.push(
            /*::String(*/
            y[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + N1(
          /*::(*/
          y[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        x = O;
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
        f.push("Table" + y[1].idx + "[#" + y[1].rt + "]");
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
        throw new Error("Unrecognized Formula Token: " + String(y));
      default:
        throw new Error("Unrecognized Formula Token: " + String(y));
    }
    var pr = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && x >= 0 && pr.indexOf(e[0][O][0]) == -1) {
      y = e[0][x];
      var Pe = !0;
      switch (y[1][0]) {
        case 4:
          Pe = !1;
        case 0:
          m = Ce(" ", y[1][1]);
          break;
        case 5:
          Pe = !1;
        case 1:
          m = Ce("\r", y[1][1]);
          break;
        default:
          if (m = "", a.WTF)
            throw new Error("Unexpected PtgAttrSpaceType " + y[1][0]);
      }
      f.push((Pe ? m : "") + f.pop() + (Pe ? "" : m)), x = -1;
    }
  }
  if (f.length > 1 && a.WTF)
    throw new Error("bad formula stack");
  return f[0];
}
function B1(e) {
  if (e == null) {
    var t = M(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number")
    return Qr(e);
  return Qr(0);
}
function M1(e, t, r, n, a) {
  var i = et(t, r, a), s = B1(e.v), f = M(6), o = 33;
  f.write_shift(2, o), f.write_shift(4, 0);
  for (var l = M(e.bf.length), c = 0; c < e.bf.length; ++c)
    l[c] = e.bf[c];
  var h = Ve([i, s, f, l]);
  return h;
}
function kn(e, t, r) {
  var n = e.read_shift(4), a = I1(e, n, r), i = e.read_shift(4), s = i > 0 ? k1(e, i, a, r) : null;
  return [a, s];
}
var b1 = kn, In = kn, U1 = kn, H1 = kn, W1 = {
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
}, ss = {
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
}, V1 = {
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
function G1(e) {
  var t = "of:=" + e.replace(w0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function X1(e) {
  return e.replace(/\./, "!");
}
var Lt = typeof Map < "u";
function y0(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Lt ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Lt ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else
    for (; n < a; ++n)
      if (e[n].t === t)
        return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Lt ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function Nn(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (kr = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = En(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = r0(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function fs(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function jr(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a)
      if (r.ssf[a] == null) {
        ti(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
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
function j1(e, t, r) {
  if (e && e["!ref"]) {
    var n = Se(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r)
      throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function $1(e) {
  if (e.length === 0)
    return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r)
    t += '<mergeCell ref="' + ke(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function z1(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var o = t.SheetNames[r];
    try {
      t.Workbook && (o = t.Workbook.Sheets[r].CodeName || o);
    } catch {
    }
    i = !0, s.codeName = Or(ge(o));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), f = (f || "") + q("outlinePr", null, l);
  }
  !i && !f || (a[a.length] = q("sheetPr", f, s));
}
var K1 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], Y1 = [
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
function q1(e) {
  var t = { sheet: 1 };
  return K1.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), Y1.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = Xi(e.password).toString(16).toUpperCase()), q("sheetProtection", null, t);
}
function J1(e) {
  return fs(e), q("pageMargins", null, e);
}
function Z1(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = q("col", null, Nn(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function Q1(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : ke(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = lr(a);
  s.s.r == s.e.r && (s.e.r = lr(t["!ref"]).e.r, a = ke(s));
  for (var f = 0; f < i.length; ++f) {
    var o = i[f];
    if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
      o.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), q("autoFilter", null, { ref: a });
}
function eh(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), q("sheetViews", q("sheetView", null, a), {});
}
function rh(e, t, r, n) {
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
        a = zt[e.v];
        break;
      case "d":
        n && n.cellDates ? a = Ze(e.v, -1).toISOString() : (e = rr(e), e.t = "n", a = "" + (e.v = er(Ze(e.v)))), typeof e.z > "u" && (e.z = Oe[14]);
        break;
      default:
        a = e.v;
        break;
    }
  var f = Ge("v", ge(a)), o = { r: t }, l = jr(n.cellXfs, e, n);
  switch (l !== 0 && (o.s = l), e.t) {
    case "n":
      break;
    case "d":
      o.t = "d";
      break;
    case "b":
      o.t = "b";
      break;
    case "e":
      o.t = "e";
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
        f = Ge("v", "" + y0(n.Strings, e.v, n.revStrings)), o.t = "s";
        break;
      }
      o.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = q("f", ge(e.f), c) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (o.cm = 1), q("c", f, o);
}
function th(e, t, r, n) {
  var a = [], i = [], s = Se(e["!ref"]), f = "", o, l = "", c = [], h = 0, u = 0, d = e["!rows"], _ = Array.isArray(e), x = { r: l }, m, O = -1;
  for (u = s.s.c; u <= s.e.c; ++u)
    c[u] = ze(u);
  for (h = s.s.r; h <= s.e.r; ++h) {
    for (i = [], l = Xe(h), u = s.s.c; u <= s.e.c; ++u) {
      o = c[u] + l;
      var A = _ ? (e[h] || [])[u] : e[o];
      A !== void 0 && (f = rh(A, o, e, t)) != null && i.push(f);
    }
    (i.length > 0 || d && d[h]) && (x = { r: l }, d && d[h] && (m = d[h], m.hidden && (x.hidden = 1), O = -1, m.hpx ? O = wn(m.hpx) : m.hpt && (O = m.hpt), O > -1 && (x.ht = O, x.customHeight = 1), m.level && (x.outlineLevel = m.level)), a[a.length] = q("row", i.join(""), x));
  }
  if (d)
    for (; h < d.length; ++h)
      d && d[h] && (x = { r: h + 1 }, m = d[h], m.hidden && (x.hidden = 1), O = -1, m.hpx ? O = wn(m.hpx) : m.hpt && (O = m.hpt), O > -1 && (x.ht = O, x.customHeight = 1), m.level && (x.outlineLevel = m.level), a[a.length] = q("row", "", x));
  return a.join("");
}
function ls(e, t, r, n) {
  var a = [Ie, q("worksheet", null, {
    xmlns: Tt[0],
    "xmlns:r": Be.r
  })], i = r.SheetNames[e], s = 0, f = "", o = r.Sheets[i];
  o == null && (o = {});
  var l = o["!ref"] || "A1", c = Se(l);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), l = ke(c);
  }
  n || (n = {}), o["!comments"] = [];
  var h = [];
  z1(o, r, e, t, a), a[a.length] = q("dimension", null, { ref: l }), a[a.length] = eh(o, t, e, r), t.sheetFormat && (a[a.length] = q("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), o["!cols"] != null && o["!cols"].length > 0 && (a[a.length] = Z1(o, o["!cols"])), a[s = a.length] = "<sheetData/>", o["!links"] = [], o["!ref"] != null && (f = th(o, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), o["!protect"] && (a[a.length] = q1(o["!protect"])), o["!autofilter"] != null && (a[a.length] = Q1(o["!autofilter"], o, r, e)), o["!merges"] != null && o["!merges"].length > 0 && (a[a.length] = $1(o["!merges"]));
  var u = -1, d, _ = -1;
  return (
    /*::(*/
    o["!links"].length > 0 && (a[a.length] = "<hyperlinks>", o["!links"].forEach(function(x) {
      x[1].Target && (d = { ref: x[0] }, x[1].Target.charAt(0) != "#" && (_ = me(n, -1, ge(x[1].Target).replace(/#.*$/, ""), xe.HLINK), d["r:id"] = "rId" + _), (u = x[1].Target.indexOf("#")) > -1 && (d.location = ge(x[1].Target.slice(u + 1))), x[1].Tooltip && (d.tooltip = ge(x[1].Tooltip)), a[a.length] = q("hyperlink", null, d));
    }), a[a.length] = "</hyperlinks>"), delete o["!links"], o["!margins"] != null && (a[a.length] = J1(o["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = Ge("ignoredErrors", q("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), h.length > 0 && (_ = me(n, -1, "../drawings/drawing" + (e + 1) + ".xml", xe.DRAW), a[a.length] = q("drawing", null, { "r:id": "rId" + _ }), o["!drawing"] = h), o["!comments"].length > 0 && (_ = me(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", xe.VML), a[a.length] = q("legacyDrawing", null, { "r:id": "rId" + _ }), o["!legacy"] = _), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function nh(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function ah(e, t, r) {
  var n = M(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = wn(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, o = n.l;
  n.l += 4;
  for (var l = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(t.s.c > c + 1 << 10 || t.e.c < c << 10)) {
      for (var h = -1, u = -1, d = c << 10; d < c + 1 << 10; ++d) {
        l.c = d;
        var _ = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[_e(l)];
        _ && (h < 0 && (h = d), u = d);
      }
      h < 0 || (++f, n.write_shift(4, h), n.write_shift(4, u));
    }
  var x = n.l;
  return n.l = o, n.write_shift(4, f), n.l = x, n.length > n.l ? n.slice(0, n.l) : n;
}
function ih(e, t, r, n) {
  var a = ah(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && H(e, 0, a);
}
var sh = it, fh = wt;
function lh() {
}
function oh(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = _o(e), r;
}
function ch(e, t, r) {
  r == null && (r = M(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a)
    r.write_shift(1, 0);
  return gn({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), Si(e, r), r.slice(0, r.l);
}
function uh(e) {
  var t = dr(e);
  return [t];
}
function hh(e, t, r) {
  return r == null && (r = M(8)), tt(t, r);
}
function xh(e) {
  var t = nt(e);
  return [t];
}
function dh(e, t, r) {
  return r == null && (r = M(4)), at(t, r);
}
function ph(e) {
  var t = dr(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function vh(e, t, r) {
  return r == null && (r = M(9)), tt(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function mh(e) {
  var t = nt(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function gh(e, t, r) {
  return r == null && (r = M(5)), at(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function _h(e) {
  var t = dr(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function Th(e, t, r) {
  return r == null && (r = M(9)), tt(t, r), r.write_shift(1, e.v), r;
}
function Eh(e) {
  var t = nt(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function wh(e, t, r) {
  return r == null && (r = M(8)), at(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function Sh(e) {
  var t = dr(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Ah(e, t, r) {
  return r == null && (r = M(12)), tt(t, r), r.write_shift(4, t.v), r;
}
function yh(e) {
  var t = nt(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Fh(e, t, r) {
  return r == null && (r = M(8)), at(t, r), r.write_shift(4, t.v), r;
}
function Ch(e) {
  var t = dr(e), r = St(e);
  return [t, r, "n"];
}
function Oh(e, t, r) {
  return r == null && (r = M(16)), tt(t, r), Qr(e.v, r), r;
}
function Dh(e) {
  var t = nt(e), r = St(e);
  return [t, r, "n"];
}
function Rh(e, t, r) {
  return r == null && (r = M(12)), at(t, r), Qr(e.v, r), r;
}
function kh(e) {
  var t = dr(e), r = Ai(e);
  return [t, r, "n"];
}
function Ih(e, t, r) {
  return r == null && (r = M(12)), tt(t, r), yi(e.v, r), r;
}
function Nh(e) {
  var t = nt(e), r = Ai(e);
  return [t, r, "n"];
}
function Ph(e, t, r) {
  return r == null && (r = M(8)), at(t, r), yi(e.v, r), r;
}
function Lh(e) {
  var t = dr(e), r = m0(e);
  return [t, r, "is"];
}
function Bh(e) {
  var t = dr(e), r = Ke(e);
  return [t, r, "str"];
}
function Mh(e, t, r) {
  return r == null && (r = M(12 + 4 * e.v.length)), tt(t, r), be(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function bh(e) {
  var t = nt(e), r = Ke(e);
  return [t, r, "str"];
}
function Uh(e, t, r) {
  return r == null && (r = M(8 + 4 * e.v.length)), at(t, r), be(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Hh(e, t, r) {
  var n = e.l + t, a = dr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = In(e, n - e.l, r);
    s[3] = mt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function Wh(e, t, r) {
  var n = e.l + t, a = dr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = In(e, n - e.l, r);
    s[3] = mt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function Vh(e, t, r) {
  var n = e.l + t, a = dr(e);
  a.r = r["!row"];
  var i = St(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = In(e, n - e.l, r);
    s[3] = mt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function Gh(e, t, r) {
  var n = e.l + t, a = dr(e);
  a.r = r["!row"];
  var i = Ke(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = In(e, n - e.l, r);
    s[3] = mt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
var Xh = it, jh = wt;
function $h(e, t) {
  return t == null && (t = M(4)), t.write_shift(4, e), t;
}
function zh(e, t) {
  var r = e.l + t, n = it(e), a = g0(e), i = Ke(e), s = Ke(e), f = Ke(e);
  e.l = r;
  var o = { rfx: n, relId: a, loc: i, display: f };
  return s && (o.Tooltip = s), o;
}
function Kh(e, t) {
  var r = M(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  wt({ s: Me(e[0]), e: Me(e[0]) }, r), _0("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return be(a || "", r), be(e[1].Tooltip || "", r), be("", r), r.slice(0, r.l);
}
function Yh() {
}
function qh(e, t, r) {
  var n = e.l + t, a = Fi(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = b1(e, n - e.l, r);
    s[1] = f;
  } else
    e.l = n;
  return s;
}
function Jh(e, t, r) {
  var n = e.l + t, a = it(e), i = [a];
  if (r.cellFormula) {
    var s = H1(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else
    e.l = n;
  return i;
}
function Zh(e, t, r) {
  r == null && (r = M(18));
  var n = Nn(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var os = ["left", "right", "top", "bottom", "header", "footer"];
function Qh(e) {
  var t = {};
  return os.forEach(function(r) {
    t[r] = St(e);
  }), t;
}
function ex(e, t) {
  return t == null && (t = M(6 * 8)), fs(e), os.forEach(function(r) {
    Qr(e[r], t);
  }), t;
}
function rx(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function tx(e, t, r) {
  r == null && (r = M(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function nx(e) {
  var t = M(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), wt(e, t), t;
}
function ax(e, t) {
  return t == null && (t = M(16 * 4 + 2)), t.write_shift(2, e.password ? Xi(e.password) : 0), t.write_shift(4, 1), [
    ["objects", !1],
    // fObjects
    ["scenarios", !1],
    // fScenarios
    ["formatCells", !0],
    // fFormatCells
    ["formatColumns", !0],
    // fFormatColumns
    ["formatRows", !0],
    // fFormatRows
    ["insertColumns", !0],
    // fInsertColumns
    ["insertRows", !0],
    // fInsertRows
    ["insertHyperlinks", !0],
    // fInsertHyperlinks
    ["deleteColumns", !0],
    // fDeleteColumns
    ["deleteRows", !0],
    // fDeleteRows
    ["selectLockedCells", !1],
    // fSelLockedCells
    ["sort", !0],
    // fSort
    ["autoFilter", !0],
    // fAutoFilter
    ["pivotTables", !0],
    // fPivotTables
    ["selectUnlockedCells", !1]
    // fSelUnlockedCells
  ].forEach(function(r) {
    r[1] ? t.write_shift(4, e[r[0]] != null && !e[r[0]] ? 1 : 0) : t.write_shift(4, e[r[0]] != null && e[r[0]] ? 0 : 1);
  }), t;
}
function ix() {
}
function sx() {
}
function fx(e, t, r, n, a, i, s) {
  if (t.v === void 0)
    return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = rr(t), t.z = t.z || Oe[14], t.v = er(Ze(t.v)), t.t = "n";
      break;
    case "n":
    case "e":
      f = "" + t.v;
      break;
    default:
      f = t.v;
      break;
  }
  var o = { r, c: n };
  switch (o.s = jr(a.cellXfs, t, a), t.l && i["!links"].push([_e(o), t.l]), t.c && i["!comments"].push([_e(o), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = y0(a.Strings, t.v, a.revStrings), o.t = "s", o.v = f, s ? H(e, 18, Fh(t, o)) : H(e, 7, Ah(t, o))) : (o.t = "str", s ? H(e, 17, Uh(t, o)) : H(e, 6, Mh(t, o))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? H(e, 13, Ph(t, o)) : H(e, 2, Ih(t, o)) : s ? H(e, 16, Rh(t, o)) : H(e, 5, Oh(t, o)), !0;
    case "b":
      return o.t = "b", s ? H(e, 15, gh(t, o)) : H(e, 4, vh(t, o)), !0;
    case "e":
      return o.t = "e", s ? H(e, 14, wh(t, o)) : H(e, 3, Th(t, o)), !0;
  }
  return s ? H(e, 12, dh(t, o)) : H(e, 1, hh(t, o)), !0;
}
function lx(e, t, r, n) {
  var a = Se(t["!ref"] || "A1"), i, s = "", f = [];
  H(
    e,
    145
    /* BrtBeginSheetData */
  );
  var o = Array.isArray(t), l = a.e.r;
  t["!rows"] && (l = Math.max(a.e.r, t["!rows"].length - 1));
  for (var c = a.s.r; c <= l; ++c) {
    s = Xe(c), ih(e, t, a, c);
    var h = !1;
    if (c <= a.e.r)
      for (var u = a.s.c; u <= a.e.c; ++u) {
        c === a.s.r && (f[u] = ze(u)), i = f[u] + s;
        var d = o ? (t[c] || [])[u] : t[i];
        if (!d) {
          h = !1;
          continue;
        }
        h = fx(e, d, c, u, n, t, h);
      }
  }
  H(
    e,
    146
    /* BrtEndSheetData */
  );
}
function ox(e, t) {
  !t || !t["!merges"] || (H(e, 177, $h(t["!merges"].length)), t["!merges"].forEach(function(r) {
    H(e, 176, jh(r));
  }), H(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function cx(e, t) {
  !t || !t["!cols"] || (H(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, n) {
    r && H(e, 60, Zh(n, r));
  }), H(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function ux(e, t) {
  !t || !t["!ref"] || (H(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), H(e, 649, nx(Se(t["!ref"]))), H(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function hx(e, t, r) {
  t["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = me(r, -1, n[1].Target.replace(/#.*$/, ""), xe.HLINK);
      H(e, 494, Kh(n, a));
    }
  }), delete t["!links"];
}
function xx(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = me(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", xe.VML);
    H(e, 551, _0("rId" + a)), t["!legacy"] = a;
  }
}
function dx(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : ke(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = lr(i);
    f.s.r == f.e.r && (f.e.r = lr(t["!ref"]).e.r, i = ke(f));
    for (var o = 0; o < s.length; ++o) {
      var l = s[o];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
        l.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    o == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), H(e, 161, wt(Se(i))), H(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function px(e, t, r) {
  H(
    e,
    133
    /* BrtBeginWsViews */
  ), H(e, 137, tx(t, r)), H(
    e,
    138
    /* BrtEndWsView */
  ), H(
    e,
    134
    /* BrtEndWsViews */
  );
}
function vx(e, t) {
  t["!protect"] && H(e, 535, ax(t["!protect"]));
}
function mx(e, t, r, n) {
  var a = Qe(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var o = Se(s["!ref"] || "A1");
  if (o.e.c > 16383 || o.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    o.e.c = Math.min(o.e.c, 16383), o.e.r = Math.min(o.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], H(
    a,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && H(a, 147, ch(f, s["!outline"])), H(a, 148, fh(o)), px(a, s, r.Workbook), cx(a, s), lx(a, s, e, t), vx(a, s), dx(a, s, r, e), ox(a, s), hx(a, s, n), s["!margins"] && H(a, 476, ex(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && ux(a, s), xx(a, s, e, n), H(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function gx(e, t) {
  e.l += 10;
  var r = Ke(e);
  return { name: r };
}
var _x = [
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
function Tx(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : ql(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var Ex = /* @__PURE__ */ "][*?/\\".split("");
function cs(e, t) {
  if (e.length > 31) {
    if (t)
      return !1;
    throw new Error("Sheet names cannot exceed 31 chars");
  }
  var r = !0;
  return Ex.forEach(function(n) {
    if (e.indexOf(n) != -1) {
      if (!t)
        throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
      r = !1;
    }
  }), r;
}
function wx(e, t, r) {
  e.forEach(function(n, a) {
    cs(n);
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
function Sx(e) {
  if (!e || !e.SheetNames || !e.Sheets)
    throw new Error("Invalid Workbook");
  if (!e.SheetNames.length)
    throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  wx(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r)
    j1(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function us(e) {
  var t = [Ie];
  t[t.length] = q("workbook", null, {
    xmlns: Tt[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": Be.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (_x.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = q("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: ge(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i])
      switch (a[i].Hidden) {
        case 1:
          s.state = "hidden";
          break;
        case 2:
          s.state = "veryHidden";
          break;
      }
    t[t.length] = q("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var o = { name: f.Name };
    f.Comment && (o.comment = f.Comment), f.Sheet != null && (o.localSheetId = "" + f.Sheet), f.Hidden && (o.hidden = "1"), f.Ref && (t[t.length] = q("definedName", ge(f.Ref), o));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Ax(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = e0(e), r.name = Ke(e), r;
}
function yx(e, t) {
  return t || (t = M(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), _0(e.strRelID, t), be(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Fx(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? Ke(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function Cx(e, t) {
  t || (t = M(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), Si(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function Ox(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = To(e), s = U1(e, 0, r), f = g0(e);
  e.l = n;
  var o = { Name: i, Ptg: s };
  return a < 268435455 && (o.Sheet = a), f && (o.Comment = f), o;
}
function Dx(e, t) {
  H(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    H(e, 156, yx(a));
  }
  H(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function Rx(e, t) {
  t || (t = M(127));
  for (var r = 0; r != 4; ++r)
    t.write_shift(4, 0);
  return be("SheetJS", t), be(un.version, t), be(un.version, t), be("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function kx(e, t) {
  t || (t = M(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function Ix(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (H(
      e,
      135
      /* BrtBeginBookViews */
    ), H(e, 158, kx(a)), H(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function Nx(e, t) {
  var r = Qe();
  return H(
    r,
    131
    /* BrtBeginBook */
  ), H(r, 128, Rx()), H(r, 153, Cx(e.Workbook && e.Workbook.WBProps || null)), Ix(r, e), Dx(r, e), H(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function Px(e, t, r) {
  return (t.slice(-4) === ".bin" ? Nx : us)(e);
}
function Lx(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? mx : ls)(e, r, n, a);
}
function Bx(e, t, r) {
  return (t.slice(-4) === ".bin" ? eu : zi)(e, r);
}
function Mx(e, t, r) {
  return (t.slice(-4) === ".bin" ? Cc : Gi)(e, r);
}
function bx(e, t, r) {
  return (t.slice(-4) === ".bin" ? vu : Zi)(e);
}
function Ux(e) {
  return (e.slice(-4) === ".bin" ? lu : qi)();
}
function Hx(e, t) {
  var r = [];
  return e.Props && r.push(Bo(e.Props, t)), e.Custprops && r.push(Mo(e.Props, e.Custprops)), r.join("");
}
function Wx() {
  return "";
}
function Vx(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(q("NumberFormat", null, { "ss:Format": ge(Oe[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    r.push(q("Style", i.join(""), s));
  }), q("Styles", r.join(""));
}
function hs(e) {
  return q("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + S0(e.Ref, { r: 0, c: 0 }) });
}
function Gx(e) {
  if (!((e || {}).Workbook || {}).Names)
    return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(hs(a)));
  }
  return q("Names", r.join(""));
}
function Xx(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names)
    return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(hs(f)));
  }
  return i.join("");
}
function jx(e, t, r, n) {
  if (!e)
    return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(q("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(q("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(q("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[r])
    if (n.Workbook.Sheets[r].Hidden)
      a.push(q("Visible", n.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i)
        ;
      i == r && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(Ge("ProtectContents", "True")), e["!protect"].objects && a.push(Ge("ProtectObjects", "True")), e["!protect"].scenarios && a.push(Ge("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(Ge("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(Ge("EnableSelection", "UnlockedCells")), [
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
  })), a.length == 0 ? "" : q("WorksheetOptions", a.join(""), { xmlns: ir.x });
}
function $x(e) {
  return e.map(function(t) {
    var r = Yl(t.t || ""), n = q("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return q("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function zx(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null)
    return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + ge(S0(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var o = Me(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (o.r == s.r ? "" : "[" + (o.r - s.r) + "]") + "C" + (o.c == s.c ? "" : "[" + (o.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = ge(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = ge(e.l.Tooltip))), r["!merges"])
    for (var l = r["!merges"], c = 0; c != l.length; ++c)
      l[c].s.c != s.c || l[c].s.r != s.r || (l[c].e.c > l[c].s.c && (f["ss:MergeAcross"] = l[c].e.c - l[c].s.c), l[c].e.r > l[c].s.r && (f["ss:MergeDown"] = l[c].e.r - l[c].s.r));
  var h = "", u = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs)
        return "";
      break;
    case "n":
      h = "Number", u = String(e.v);
      break;
    case "b":
      h = "Boolean", u = e.v ? "1" : "0";
      break;
    case "e":
      h = "Error", u = zt[e.v];
      break;
    case "d":
      h = "DateTime", u = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Oe[14]);
      break;
    case "s":
      h = "String", u = Kl(e.v || "");
      break;
  }
  var d = jr(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + d), f["ss:Index"] = s.c + 1;
  var _ = e.v != null ? u : "", x = e.t == "z" ? "" : '<Data ss:Type="' + h + '">' + _ + "</Data>";
  return (e.c || []).length > 0 && (x += $x(e.c)), q("Cell", x, f);
}
function Kx(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = $i(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function Yx(e, t, r, n) {
  if (!e["!ref"])
    return "";
  var a = Se(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(m, O) {
    E0(m);
    var A = !!m.width, y = Nn(O, m), N = { "ss:Index": O + 1 };
    A && (N["ss:Width"] = Tn(y.width)), m.hidden && (N["ss:Hidden"] = "1"), f.push(q("Column", null, N));
  });
  for (var o = Array.isArray(e), l = a.s.r; l <= a.e.r; ++l) {
    for (var c = [Kx(l, (e["!rows"] || [])[l])], h = a.s.c; h <= a.e.c; ++h) {
      var u = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > h) && !(i[s].s.r > l) && !(i[s].e.c < h) && !(i[s].e.r < l)) {
          (i[s].s.c != h || i[s].s.r != l) && (u = !0);
          break;
        }
      if (!u) {
        var d = { r: l, c: h }, _ = _e(d), x = o ? (e[l] || [])[h] : e[_];
        c.push(zx(x, _, e, t, r, n, d));
      }
    }
    c.push("</Row>"), c.length > 2 && f.push(c.join(""));
  }
  return f.join("");
}
function qx(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? Xx(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? Yx(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(jx(i, t, e, r)), n.join("");
}
function Jx(e, t) {
  t || (t = {}), e.SSF || (e.SSF = rr(Oe)), e.SSF && (On(), Cn(e.SSF), t.revssf = Dn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], jr(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(Hx(e, t)), r.push(Wx()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(q("Worksheet", qx(n, t, e), { "ss:Name": ge(e.SheetNames[n]) }));
  return r[2] = Vx(e, t), r[3] = Gx(e), Ie + q("Workbook", r.join(""), {
    xmlns: ir.ss,
    "xmlns:o": ir.o,
    "xmlns:x": ir.x,
    "xmlns:ss": ir.ss,
    "xmlns:dt": ir.dt,
    "xmlns:html": ir.html
  });
}
var $n = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function Zx(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = ea(xa, "n"), o = ea(da, "n");
  if (e.Props)
    for (s = je(e.Props), i = 0; i < s.length; ++i)
      (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = je(e.Custprops), i = 0; i < s.length; ++i)
      Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < a.length; ++i)
    Bi.indexOf(a[i][0]) > -1 || Ni.indexOf(a[i][0]) > -1 || a[i][1] != null && l.push(a[i]);
  n.length && Ee.utils.cfb_add(t, "/SummaryInformation", _a(n, $n.SI, o, da)), (r.length || l.length) && Ee.utils.cfb_add(t, "/DocumentSummaryInformation", _a(r, $n.DSI, f, xa, l.length ? l : null, $n.UDI));
}
function Qx(e, t) {
  var r = t || {}, n = Ee.utils.cfb_new({ root: "R" }), a = "/Workbook";
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
  return Ee.utils.cfb_add(n, a, xs(e, r)), r.biff == 8 && (e.Props || e.Custprops) && Zx(e, n), r.biff == 8 && e.vbaraw && mu(n, Ee.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var e2 = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: nh
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: uh
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: kh
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: _h
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: ph
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: Ch
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: Bh
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: Sh
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: Gh
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: Vh
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: Hh
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: Wh
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: xh
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: Nh
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: Eh
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: mh
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: Dh
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: bh
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: yh
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: m0
  },
  /*::[*/
  20: {
    /* n:"BrtPCDIMissing" */
  },
  /*::[*/
  21: {
    /* n:"BrtPCDINumber" */
  },
  /*::[*/
  22: {
    /* n:"BrtPCDIBoolean" */
  },
  /*::[*/
  23: {
    /* n:"BrtPCDIError" */
  },
  /*::[*/
  24: {
    /* n:"BrtPCDIString" */
  },
  /*::[*/
  25: {
    /* n:"BrtPCDIDatetime" */
  },
  /*::[*/
  26: {
    /* n:"BrtPCDIIndex" */
  },
  /*::[*/
  27: {
    /* n:"BrtPCDIAMissing" */
  },
  /*::[*/
  28: {
    /* n:"BrtPCDIANumber" */
  },
  /*::[*/
  29: {
    /* n:"BrtPCDIABoolean" */
  },
  /*::[*/
  30: {
    /* n:"BrtPCDIAError" */
  },
  /*::[*/
  31: {
    /* n:"BrtPCDIAString" */
  },
  /*::[*/
  32: {
    /* n:"BrtPCDIADatetime" */
  },
  /*::[*/
  33: {
    /* n:"BrtPCRRecord" */
  },
  /*::[*/
  34: {
    /* n:"BrtPCRRecordDt" */
  },
  /*::[*/
  35: {
    /* n:"BrtFRTBegin", */
    T: 1
  },
  /*::[*/
  36: {
    /* n:"BrtFRTEnd", */
    T: -1
  },
  /*::[*/
  37: {
    /* n:"BrtACBegin", */
    T: 1
  },
  /*::[*/
  38: {
    /* n:"BrtACEnd", */
    T: -1
  },
  /*::[*/
  39: {
    /* n:"BrtName", */
    f: Ox
  },
  /*::[*/
  40: {
    /* n:"BrtIndexRowBlock" */
  },
  /*::[*/
  42: {
    /* n:"BrtIndexBlock" */
  },
  /*::[*/
  43: {
    /* n:"BrtFont", */
    f: Bc
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: Pc
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: Uc
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: Wc
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: Hc
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: ho
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: nu
  },
  /*::[*/
  52: {
    /* n:"BrtBeginFmd", */
    T: 1
  },
  /*::[*/
  53: {
    /* n:"BrtEndFmd", */
    T: -1
  },
  /*::[*/
  54: {
    /* n:"BrtBeginMdx", */
    T: 1
  },
  /*::[*/
  55: {
    /* n:"BrtEndMdx", */
    T: -1
  },
  /*::[*/
  56: {
    /* n:"BrtBeginMdxTuple", */
    T: 1
  },
  /*::[*/
  57: {
    /* n:"BrtEndMdxTuple", */
    T: -1
  },
  /*::[*/
  58: {
    /* n:"BrtMdxMbrIstr" */
  },
  /*::[*/
  59: {
    /* n:"BrtStr" */
  },
  /*::[*/
  60: {
    /* n:"BrtColInfo", */
    f: dc
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: Lh
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: ou
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: ix
  },
  /*::[*/
  65: {
    /* n:"BrtSxvcellNum" */
  },
  /*::[*/
  66: {
    /* n:"BrtSxvcellStr" */
  },
  /*::[*/
  67: {
    /* n:"BrtSxvcellBool" */
  },
  /*::[*/
  68: {
    /* n:"BrtSxvcellErr" */
  },
  /*::[*/
  69: {
    /* n:"BrtSxvcellDate" */
  },
  /*::[*/
  70: {
    /* n:"BrtSxvcellNil" */
  },
  /*::[*/
  128: {
    /* n:"BrtFileVersion" */
  },
  /*::[*/
  129: {
    /* n:"BrtBeginSheet", */
    T: 1
  },
  /*::[*/
  130: {
    /* n:"BrtEndSheet", */
    T: -1
  },
  /*::[*/
  131: {
    /* n:"BrtBeginBook", */
    T: 1,
    f: Ar,
    p: 0
  },
  /*::[*/
  132: {
    /* n:"BrtEndBook", */
    T: -1
  },
  /*::[*/
  133: {
    /* n:"BrtBeginWsViews", */
    T: 1
  },
  /*::[*/
  134: {
    /* n:"BrtEndWsViews", */
    T: -1
  },
  /*::[*/
  135: {
    /* n:"BrtBeginBookViews", */
    T: 1
  },
  /*::[*/
  136: {
    /* n:"BrtEndBookViews", */
    T: -1
  },
  /*::[*/
  137: {
    /* n:"BrtBeginWsView", */
    T: 1,
    f: rx
  },
  /*::[*/
  138: {
    /* n:"BrtEndWsView", */
    T: -1
  },
  /*::[*/
  139: {
    /* n:"BrtBeginCsViews", */
    T: 1
  },
  /*::[*/
  140: {
    /* n:"BrtEndCsViews", */
    T: -1
  },
  /*::[*/
  141: {
    /* n:"BrtBeginCsView", */
    T: 1
  },
  /*::[*/
  142: {
    /* n:"BrtEndCsView", */
    T: -1
  },
  /*::[*/
  143: {
    /* n:"BrtBeginBundleShs", */
    T: 1
  },
  /*::[*/
  144: {
    /* n:"BrtEndBundleShs", */
    T: -1
  },
  /*::[*/
  145: {
    /* n:"BrtBeginSheetData", */
    T: 1
  },
  /*::[*/
  146: {
    /* n:"BrtEndSheetData", */
    T: -1
  },
  /*::[*/
  147: {
    /* n:"BrtWsProp", */
    f: oh
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: sh,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: Yh
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: Fx
  },
  /*::[*/
  154: {
    /* n:"BrtWbFactoid" */
  },
  /*::[*/
  155: {
    /* n:"BrtFileRecover" */
  },
  /*::[*/
  156: {
    /* n:"BrtBundleSh", */
    f: Ax
  },
  /*::[*/
  157: {
    /* n:"BrtCalcProp" */
  },
  /*::[*/
  158: {
    /* n:"BrtBookView" */
  },
  /*::[*/
  159: {
    /* n:"BrtBeginSst", */
    T: 1,
    f: Ac
  },
  /*::[*/
  160: {
    /* n:"BrtEndSst", */
    T: -1
  },
  /*::[*/
  161: {
    /* n:"BrtBeginAFilter", */
    T: 1,
    f: it
  },
  /*::[*/
  162: {
    /* n:"BrtEndAFilter", */
    T: -1
  },
  /*::[*/
  163: {
    /* n:"BrtBeginFilterColumn", */
    T: 1
  },
  /*::[*/
  164: {
    /* n:"BrtEndFilterColumn", */
    T: -1
  },
  /*::[*/
  165: {
    /* n:"BrtBeginFilters", */
    T: 1
  },
  /*::[*/
  166: {
    /* n:"BrtEndFilters", */
    T: -1
  },
  /*::[*/
  167: {
    /* n:"BrtFilter" */
  },
  /*::[*/
  168: {
    /* n:"BrtColorFilter" */
  },
  /*::[*/
  169: {
    /* n:"BrtIconFilter" */
  },
  /*::[*/
  170: {
    /* n:"BrtTop10Filter" */
  },
  /*::[*/
  171: {
    /* n:"BrtDynamicFilter" */
  },
  /*::[*/
  172: {
    /* n:"BrtBeginCustomFilters", */
    T: 1
  },
  /*::[*/
  173: {
    /* n:"BrtEndCustomFilters", */
    T: -1
  },
  /*::[*/
  174: {
    /* n:"BrtCustomFilter" */
  },
  /*::[*/
  175: {
    /* n:"BrtAFilterDateGroupItem" */
  },
  /*::[*/
  176: {
    /* n:"BrtMergeCell", */
    f: Xh
  },
  /*::[*/
  177: {
    /* n:"BrtBeginMergeCells", */
    T: 1
  },
  /*::[*/
  178: {
    /* n:"BrtEndMergeCells", */
    T: -1
  },
  /*::[*/
  179: {
    /* n:"BrtBeginPivotCacheDef", */
    T: 1
  },
  /*::[*/
  180: {
    /* n:"BrtEndPivotCacheDef", */
    T: -1
  },
  /*::[*/
  181: {
    /* n:"BrtBeginPCDFields", */
    T: 1
  },
  /*::[*/
  182: {
    /* n:"BrtEndPCDFields", */
    T: -1
  },
  /*::[*/
  183: {
    /* n:"BrtBeginPCDField", */
    T: 1
  },
  /*::[*/
  184: {
    /* n:"BrtEndPCDField", */
    T: -1
  },
  /*::[*/
  185: {
    /* n:"BrtBeginPCDSource", */
    T: 1
  },
  /*::[*/
  186: {
    /* n:"BrtEndPCDSource", */
    T: -1
  },
  /*::[*/
  187: {
    /* n:"BrtBeginPCDSRange", */
    T: 1
  },
  /*::[*/
  188: {
    /* n:"BrtEndPCDSRange", */
    T: -1
  },
  /*::[*/
  189: {
    /* n:"BrtBeginPCDFAtbl", */
    T: 1
  },
  /*::[*/
  190: {
    /* n:"BrtEndPCDFAtbl", */
    T: -1
  },
  /*::[*/
  191: {
    /* n:"BrtBeginPCDIRun", */
    T: 1
  },
  /*::[*/
  192: {
    /* n:"BrtEndPCDIRun", */
    T: -1
  },
  /*::[*/
  193: {
    /* n:"BrtBeginPivotCacheRecords", */
    T: 1
  },
  /*::[*/
  194: {
    /* n:"BrtEndPivotCacheRecords", */
    T: -1
  },
  /*::[*/
  195: {
    /* n:"BrtBeginPCDHierarchies", */
    T: 1
  },
  /*::[*/
  196: {
    /* n:"BrtEndPCDHierarchies", */
    T: -1
  },
  /*::[*/
  197: {
    /* n:"BrtBeginPCDHierarchy", */
    T: 1
  },
  /*::[*/
  198: {
    /* n:"BrtEndPCDHierarchy", */
    T: -1
  },
  /*::[*/
  199: {
    /* n:"BrtBeginPCDHFieldsUsage", */
    T: 1
  },
  /*::[*/
  200: {
    /* n:"BrtEndPCDHFieldsUsage", */
    T: -1
  },
  /*::[*/
  201: {
    /* n:"BrtBeginExtConnection", */
    T: 1
  },
  /*::[*/
  202: {
    /* n:"BrtEndExtConnection", */
    T: -1
  },
  /*::[*/
  203: {
    /* n:"BrtBeginECDbProps", */
    T: 1
  },
  /*::[*/
  204: {
    /* n:"BrtEndECDbProps", */
    T: -1
  },
  /*::[*/
  205: {
    /* n:"BrtBeginECOlapProps", */
    T: 1
  },
  /*::[*/
  206: {
    /* n:"BrtEndECOlapProps", */
    T: -1
  },
  /*::[*/
  207: {
    /* n:"BrtBeginPCDSConsol", */
    T: 1
  },
  /*::[*/
  208: {
    /* n:"BrtEndPCDSConsol", */
    T: -1
  },
  /*::[*/
  209: {
    /* n:"BrtBeginPCDSCPages", */
    T: 1
  },
  /*::[*/
  210: {
    /* n:"BrtEndPCDSCPages", */
    T: -1
  },
  /*::[*/
  211: {
    /* n:"BrtBeginPCDSCPage", */
    T: 1
  },
  /*::[*/
  212: {
    /* n:"BrtEndPCDSCPage", */
    T: -1
  },
  /*::[*/
  213: {
    /* n:"BrtBeginPCDSCPItem", */
    T: 1
  },
  /*::[*/
  214: {
    /* n:"BrtEndPCDSCPItem", */
    T: -1
  },
  /*::[*/
  215: {
    /* n:"BrtBeginPCDSCSets", */
    T: 1
  },
  /*::[*/
  216: {
    /* n:"BrtEndPCDSCSets", */
    T: -1
  },
  /*::[*/
  217: {
    /* n:"BrtBeginPCDSCSet", */
    T: 1
  },
  /*::[*/
  218: {
    /* n:"BrtEndPCDSCSet", */
    T: -1
  },
  /*::[*/
  219: {
    /* n:"BrtBeginPCDFGroup", */
    T: 1
  },
  /*::[*/
  220: {
    /* n:"BrtEndPCDFGroup", */
    T: -1
  },
  /*::[*/
  221: {
    /* n:"BrtBeginPCDFGItems", */
    T: 1
  },
  /*::[*/
  222: {
    /* n:"BrtEndPCDFGItems", */
    T: -1
  },
  /*::[*/
  223: {
    /* n:"BrtBeginPCDFGRange", */
    T: 1
  },
  /*::[*/
  224: {
    /* n:"BrtEndPCDFGRange", */
    T: -1
  },
  /*::[*/
  225: {
    /* n:"BrtBeginPCDFGDiscrete", */
    T: 1
  },
  /*::[*/
  226: {
    /* n:"BrtEndPCDFGDiscrete", */
    T: -1
  },
  /*::[*/
  227: {
    /* n:"BrtBeginPCDSDTupleCache", */
    T: 1
  },
  /*::[*/
  228: {
    /* n:"BrtEndPCDSDTupleCache", */
    T: -1
  },
  /*::[*/
  229: {
    /* n:"BrtBeginPCDSDTCEntries", */
    T: 1
  },
  /*::[*/
  230: {
    /* n:"BrtEndPCDSDTCEntries", */
    T: -1
  },
  /*::[*/
  231: {
    /* n:"BrtBeginPCDSDTCEMembers", */
    T: 1
  },
  /*::[*/
  232: {
    /* n:"BrtEndPCDSDTCEMembers", */
    T: -1
  },
  /*::[*/
  233: {
    /* n:"BrtBeginPCDSDTCEMember", */
    T: 1
  },
  /*::[*/
  234: {
    /* n:"BrtEndPCDSDTCEMember", */
    T: -1
  },
  /*::[*/
  235: {
    /* n:"BrtBeginPCDSDTCQueries", */
    T: 1
  },
  /*::[*/
  236: {
    /* n:"BrtEndPCDSDTCQueries", */
    T: -1
  },
  /*::[*/
  237: {
    /* n:"BrtBeginPCDSDTCQuery", */
    T: 1
  },
  /*::[*/
  238: {
    /* n:"BrtEndPCDSDTCQuery", */
    T: -1
  },
  /*::[*/
  239: {
    /* n:"BrtBeginPCDSDTCSets", */
    T: 1
  },
  /*::[*/
  240: {
    /* n:"BrtEndPCDSDTCSets", */
    T: -1
  },
  /*::[*/
  241: {
    /* n:"BrtBeginPCDSDTCSet", */
    T: 1
  },
  /*::[*/
  242: {
    /* n:"BrtEndPCDSDTCSet", */
    T: -1
  },
  /*::[*/
  243: {
    /* n:"BrtBeginPCDCalcItems", */
    T: 1
  },
  /*::[*/
  244: {
    /* n:"BrtEndPCDCalcItems", */
    T: -1
  },
  /*::[*/
  245: {
    /* n:"BrtBeginPCDCalcItem", */
    T: 1
  },
  /*::[*/
  246: {
    /* n:"BrtEndPCDCalcItem", */
    T: -1
  },
  /*::[*/
  247: {
    /* n:"BrtBeginPRule", */
    T: 1
  },
  /*::[*/
  248: {
    /* n:"BrtEndPRule", */
    T: -1
  },
  /*::[*/
  249: {
    /* n:"BrtBeginPRFilters", */
    T: 1
  },
  /*::[*/
  250: {
    /* n:"BrtEndPRFilters", */
    T: -1
  },
  /*::[*/
  251: {
    /* n:"BrtBeginPRFilter", */
    T: 1
  },
  /*::[*/
  252: {
    /* n:"BrtEndPRFilter", */
    T: -1
  },
  /*::[*/
  253: {
    /* n:"BrtBeginPNames", */
    T: 1
  },
  /*::[*/
  254: {
    /* n:"BrtEndPNames", */
    T: -1
  },
  /*::[*/
  255: {
    /* n:"BrtBeginPName", */
    T: 1
  },
  /*::[*/
  256: {
    /* n:"BrtEndPName", */
    T: -1
  },
  /*::[*/
  257: {
    /* n:"BrtBeginPNPairs", */
    T: 1
  },
  /*::[*/
  258: {
    /* n:"BrtEndPNPairs", */
    T: -1
  },
  /*::[*/
  259: {
    /* n:"BrtBeginPNPair", */
    T: 1
  },
  /*::[*/
  260: {
    /* n:"BrtEndPNPair", */
    T: -1
  },
  /*::[*/
  261: {
    /* n:"BrtBeginECWebProps", */
    T: 1
  },
  /*::[*/
  262: {
    /* n:"BrtEndECWebProps", */
    T: -1
  },
  /*::[*/
  263: {
    /* n:"BrtBeginEcWpTables", */
    T: 1
  },
  /*::[*/
  264: {
    /* n:"BrtEndECWPTables", */
    T: -1
  },
  /*::[*/
  265: {
    /* n:"BrtBeginECParams", */
    T: 1
  },
  /*::[*/
  266: {
    /* n:"BrtEndECParams", */
    T: -1
  },
  /*::[*/
  267: {
    /* n:"BrtBeginECParam", */
    T: 1
  },
  /*::[*/
  268: {
    /* n:"BrtEndECParam", */
    T: -1
  },
  /*::[*/
  269: {
    /* n:"BrtBeginPCDKPIs", */
    T: 1
  },
  /*::[*/
  270: {
    /* n:"BrtEndPCDKPIs", */
    T: -1
  },
  /*::[*/
  271: {
    /* n:"BrtBeginPCDKPI", */
    T: 1
  },
  /*::[*/
  272: {
    /* n:"BrtEndPCDKPI", */
    T: -1
  },
  /*::[*/
  273: {
    /* n:"BrtBeginDims", */
    T: 1
  },
  /*::[*/
  274: {
    /* n:"BrtEndDims", */
    T: -1
  },
  /*::[*/
  275: {
    /* n:"BrtBeginDim", */
    T: 1
  },
  /*::[*/
  276: {
    /* n:"BrtEndDim", */
    T: -1
  },
  /*::[*/
  277: {
    /* n:"BrtIndexPartEnd" */
  },
  /*::[*/
  278: {
    /* n:"BrtBeginStyleSheet", */
    T: 1
  },
  /*::[*/
  279: {
    /* n:"BrtEndStyleSheet", */
    T: -1
  },
  /*::[*/
  280: {
    /* n:"BrtBeginSXView", */
    T: 1
  },
  /*::[*/
  281: {
    /* n:"BrtEndSXVI", */
    T: -1
  },
  /*::[*/
  282: {
    /* n:"BrtBeginSXVI", */
    T: 1
  },
  /*::[*/
  283: {
    /* n:"BrtBeginSXVIs", */
    T: 1
  },
  /*::[*/
  284: {
    /* n:"BrtEndSXVIs", */
    T: -1
  },
  /*::[*/
  285: {
    /* n:"BrtBeginSXVD", */
    T: 1
  },
  /*::[*/
  286: {
    /* n:"BrtEndSXVD", */
    T: -1
  },
  /*::[*/
  287: {
    /* n:"BrtBeginSXVDs", */
    T: 1
  },
  /*::[*/
  288: {
    /* n:"BrtEndSXVDs", */
    T: -1
  },
  /*::[*/
  289: {
    /* n:"BrtBeginSXPI", */
    T: 1
  },
  /*::[*/
  290: {
    /* n:"BrtEndSXPI", */
    T: -1
  },
  /*::[*/
  291: {
    /* n:"BrtBeginSXPIs", */
    T: 1
  },
  /*::[*/
  292: {
    /* n:"BrtEndSXPIs", */
    T: -1
  },
  /*::[*/
  293: {
    /* n:"BrtBeginSXDI", */
    T: 1
  },
  /*::[*/
  294: {
    /* n:"BrtEndSXDI", */
    T: -1
  },
  /*::[*/
  295: {
    /* n:"BrtBeginSXDIs", */
    T: 1
  },
  /*::[*/
  296: {
    /* n:"BrtEndSXDIs", */
    T: -1
  },
  /*::[*/
  297: {
    /* n:"BrtBeginSXLI", */
    T: 1
  },
  /*::[*/
  298: {
    /* n:"BrtEndSXLI", */
    T: -1
  },
  /*::[*/
  299: {
    /* n:"BrtBeginSXLIRws", */
    T: 1
  },
  /*::[*/
  300: {
    /* n:"BrtEndSXLIRws", */
    T: -1
  },
  /*::[*/
  301: {
    /* n:"BrtBeginSXLICols", */
    T: 1
  },
  /*::[*/
  302: {
    /* n:"BrtEndSXLICols", */
    T: -1
  },
  /*::[*/
  303: {
    /* n:"BrtBeginSXFormat", */
    T: 1
  },
  /*::[*/
  304: {
    /* n:"BrtEndSXFormat", */
    T: -1
  },
  /*::[*/
  305: {
    /* n:"BrtBeginSXFormats", */
    T: 1
  },
  /*::[*/
  306: {
    /* n:"BrtEndSxFormats", */
    T: -1
  },
  /*::[*/
  307: {
    /* n:"BrtBeginSxSelect", */
    T: 1
  },
  /*::[*/
  308: {
    /* n:"BrtEndSxSelect", */
    T: -1
  },
  /*::[*/
  309: {
    /* n:"BrtBeginISXVDRws", */
    T: 1
  },
  /*::[*/
  310: {
    /* n:"BrtEndISXVDRws", */
    T: -1
  },
  /*::[*/
  311: {
    /* n:"BrtBeginISXVDCols", */
    T: 1
  },
  /*::[*/
  312: {
    /* n:"BrtEndISXVDCols", */
    T: -1
  },
  /*::[*/
  313: {
    /* n:"BrtEndSXLocation", */
    T: -1
  },
  /*::[*/
  314: {
    /* n:"BrtBeginSXLocation", */
    T: 1
  },
  /*::[*/
  315: {
    /* n:"BrtEndSXView", */
    T: -1
  },
  /*::[*/
  316: {
    /* n:"BrtBeginSXTHs", */
    T: 1
  },
  /*::[*/
  317: {
    /* n:"BrtEndSXTHs", */
    T: -1
  },
  /*::[*/
  318: {
    /* n:"BrtBeginSXTH", */
    T: 1
  },
  /*::[*/
  319: {
    /* n:"BrtEndSXTH", */
    T: -1
  },
  /*::[*/
  320: {
    /* n:"BrtBeginISXTHRws", */
    T: 1
  },
  /*::[*/
  321: {
    /* n:"BrtEndISXTHRws", */
    T: -1
  },
  /*::[*/
  322: {
    /* n:"BrtBeginISXTHCols", */
    T: 1
  },
  /*::[*/
  323: {
    /* n:"BrtEndISXTHCols", */
    T: -1
  },
  /*::[*/
  324: {
    /* n:"BrtBeginSXTDMPS", */
    T: 1
  },
  /*::[*/
  325: {
    /* n:"BrtEndSXTDMPs", */
    T: -1
  },
  /*::[*/
  326: {
    /* n:"BrtBeginSXTDMP", */
    T: 1
  },
  /*::[*/
  327: {
    /* n:"BrtEndSXTDMP", */
    T: -1
  },
  /*::[*/
  328: {
    /* n:"BrtBeginSXTHItems", */
    T: 1
  },
  /*::[*/
  329: {
    /* n:"BrtEndSXTHItems", */
    T: -1
  },
  /*::[*/
  330: {
    /* n:"BrtBeginSXTHItem", */
    T: 1
  },
  /*::[*/
  331: {
    /* n:"BrtEndSXTHItem", */
    T: -1
  },
  /*::[*/
  332: {
    /* n:"BrtBeginMetadata", */
    T: 1
  },
  /*::[*/
  333: {
    /* n:"BrtEndMetadata", */
    T: -1
  },
  /*::[*/
  334: {
    /* n:"BrtBeginEsmdtinfo", */
    T: 1
  },
  /*::[*/
  335: {
    /* n:"BrtMdtinfo", */
    f: ru
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: su,
    T: 1
  },
  /*::[*/
  338: {
    /* n:"BrtEndEsmdb", */
    T: -1
  },
  /*::[*/
  339: {
    /* n:"BrtBeginEsfmd", */
    T: 1
  },
  /*::[*/
  340: {
    /* n:"BrtEndEsfmd", */
    T: -1
  },
  /*::[*/
  341: {
    /* n:"BrtBeginSingleCells", */
    T: 1
  },
  /*::[*/
  342: {
    /* n:"BrtEndSingleCells", */
    T: -1
  },
  /*::[*/
  343: {
    /* n:"BrtBeginList", */
    T: 1
  },
  /*::[*/
  344: {
    /* n:"BrtEndList", */
    T: -1
  },
  /*::[*/
  345: {
    /* n:"BrtBeginListCols", */
    T: 1
  },
  /*::[*/
  346: {
    /* n:"BrtEndListCols", */
    T: -1
  },
  /*::[*/
  347: {
    /* n:"BrtBeginListCol", */
    T: 1
  },
  /*::[*/
  348: {
    /* n:"BrtEndListCol", */
    T: -1
  },
  /*::[*/
  349: {
    /* n:"BrtBeginListXmlCPr", */
    T: 1
  },
  /*::[*/
  350: {
    /* n:"BrtEndListXmlCPr", */
    T: -1
  },
  /*::[*/
  351: {
    /* n:"BrtListCCFmla" */
  },
  /*::[*/
  352: {
    /* n:"BrtListTrFmla" */
  },
  /*::[*/
  353: {
    /* n:"BrtBeginExternals", */
    T: 1
  },
  /*::[*/
  354: {
    /* n:"BrtEndExternals", */
    T: -1
  },
  /*::[*/
  355: {
    /* n:"BrtSupBookSrc", */
    f: e0
  },
  /*::[*/
  357: {
    /* n:"BrtSupSelf" */
  },
  /*::[*/
  358: {
    /* n:"BrtSupSame" */
  },
  /*::[*/
  359: {
    /* n:"BrtSupTabs" */
  },
  /*::[*/
  360: {
    /* n:"BrtBeginSupBook", */
    T: 1
  },
  /*::[*/
  361: {
    /* n:"BrtPlaceholderName" */
  },
  /*::[*/
  362: {
    /* n:"BrtExternSheet", */
    f: lc
  },
  /*::[*/
  363: {
    /* n:"BrtExternTableStart" */
  },
  /*::[*/
  364: {
    /* n:"BrtExternTableEnd" */
  },
  /*::[*/
  366: {
    /* n:"BrtExternRowHdr" */
  },
  /*::[*/
  367: {
    /* n:"BrtExternCellBlank" */
  },
  /*::[*/
  368: {
    /* n:"BrtExternCellReal" */
  },
  /*::[*/
  369: {
    /* n:"BrtExternCellBool" */
  },
  /*::[*/
  370: {
    /* n:"BrtExternCellError" */
  },
  /*::[*/
  371: {
    /* n:"BrtExternCellString" */
  },
  /*::[*/
  372: {
    /* n:"BrtBeginEsmdx", */
    T: 1
  },
  /*::[*/
  373: {
    /* n:"BrtEndEsmdx", */
    T: -1
  },
  /*::[*/
  374: {
    /* n:"BrtBeginMdxSet", */
    T: 1
  },
  /*::[*/
  375: {
    /* n:"BrtEndMdxSet", */
    T: -1
  },
  /*::[*/
  376: {
    /* n:"BrtBeginMdxMbrProp", */
    T: 1
  },
  /*::[*/
  377: {
    /* n:"BrtEndMdxMbrProp", */
    T: -1
  },
  /*::[*/
  378: {
    /* n:"BrtBeginMdxKPI", */
    T: 1
  },
  /*::[*/
  379: {
    /* n:"BrtEndMdxKPI", */
    T: -1
  },
  /*::[*/
  380: {
    /* n:"BrtBeginEsstr", */
    T: 1
  },
  /*::[*/
  381: {
    /* n:"BrtEndEsstr", */
    T: -1
  },
  /*::[*/
  382: {
    /* n:"BrtBeginPRFItem", */
    T: 1
  },
  /*::[*/
  383: {
    /* n:"BrtEndPRFItem", */
    T: -1
  },
  /*::[*/
  384: {
    /* n:"BrtBeginPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  385: {
    /* n:"BrtEndPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  386: {
    /* n:"BrtBeginPivotCacheID", */
    T: 1
  },
  /*::[*/
  387: {
    /* n:"BrtEndPivotCacheID", */
    T: -1
  },
  /*::[*/
  388: {
    /* n:"BrtBeginISXVIs", */
    T: 1
  },
  /*::[*/
  389: {
    /* n:"BrtEndISXVIs", */
    T: -1
  },
  /*::[*/
  390: {
    /* n:"BrtBeginColInfos", */
    T: 1
  },
  /*::[*/
  391: {
    /* n:"BrtEndColInfos", */
    T: -1
  },
  /*::[*/
  392: {
    /* n:"BrtBeginRwBrk", */
    T: 1
  },
  /*::[*/
  393: {
    /* n:"BrtEndRwBrk", */
    T: -1
  },
  /*::[*/
  394: {
    /* n:"BrtBeginColBrk", */
    T: 1
  },
  /*::[*/
  395: {
    /* n:"BrtEndColBrk", */
    T: -1
  },
  /*::[*/
  396: {
    /* n:"BrtBrk" */
  },
  /*::[*/
  397: {
    /* n:"BrtUserBookView" */
  },
  /*::[*/
  398: {
    /* n:"BrtInfo" */
  },
  /*::[*/
  399: {
    /* n:"BrtCUsr" */
  },
  /*::[*/
  400: {
    /* n:"BrtUsr" */
  },
  /*::[*/
  401: {
    /* n:"BrtBeginUsers", */
    T: 1
  },
  /*::[*/
  403: {
    /* n:"BrtEOF" */
  },
  /*::[*/
  404: {
    /* n:"BrtUCR" */
  },
  /*::[*/
  405: {
    /* n:"BrtRRInsDel" */
  },
  /*::[*/
  406: {
    /* n:"BrtRREndInsDel" */
  },
  /*::[*/
  407: {
    /* n:"BrtRRMove" */
  },
  /*::[*/
  408: {
    /* n:"BrtRREndMove" */
  },
  /*::[*/
  409: {
    /* n:"BrtRRChgCell" */
  },
  /*::[*/
  410: {
    /* n:"BrtRREndChgCell" */
  },
  /*::[*/
  411: {
    /* n:"BrtRRHeader" */
  },
  /*::[*/
  412: {
    /* n:"BrtRRUserView" */
  },
  /*::[*/
  413: {
    /* n:"BrtRRRenSheet" */
  },
  /*::[*/
  414: {
    /* n:"BrtRRInsertSh" */
  },
  /*::[*/
  415: {
    /* n:"BrtRRDefName" */
  },
  /*::[*/
  416: {
    /* n:"BrtRRNote" */
  },
  /*::[*/
  417: {
    /* n:"BrtRRConflict" */
  },
  /*::[*/
  418: {
    /* n:"BrtRRTQSIF" */
  },
  /*::[*/
  419: {
    /* n:"BrtRRFormat" */
  },
  /*::[*/
  420: {
    /* n:"BrtRREndFormat" */
  },
  /*::[*/
  421: {
    /* n:"BrtRRAutoFmt" */
  },
  /*::[*/
  422: {
    /* n:"BrtBeginUserShViews", */
    T: 1
  },
  /*::[*/
  423: {
    /* n:"BrtBeginUserShView", */
    T: 1
  },
  /*::[*/
  424: {
    /* n:"BrtEndUserShView", */
    T: -1
  },
  /*::[*/
  425: {
    /* n:"BrtEndUserShViews", */
    T: -1
  },
  /*::[*/
  426: {
    /* n:"BrtArrFmla", */
    f: qh
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: Jh
  },
  /*::[*/
  428: {
    /* n:"BrtTable" */
  },
  /*::[*/
  429: {
    /* n:"BrtBeginExtConnections", */
    T: 1
  },
  /*::[*/
  430: {
    /* n:"BrtEndExtConnections", */
    T: -1
  },
  /*::[*/
  431: {
    /* n:"BrtBeginPCDCalcMems", */
    T: 1
  },
  /*::[*/
  432: {
    /* n:"BrtEndPCDCalcMems", */
    T: -1
  },
  /*::[*/
  433: {
    /* n:"BrtBeginPCDCalcMem", */
    T: 1
  },
  /*::[*/
  434: {
    /* n:"BrtEndPCDCalcMem", */
    T: -1
  },
  /*::[*/
  435: {
    /* n:"BrtBeginPCDHGLevels", */
    T: 1
  },
  /*::[*/
  436: {
    /* n:"BrtEndPCDHGLevels", */
    T: -1
  },
  /*::[*/
  437: {
    /* n:"BrtBeginPCDHGLevel", */
    T: 1
  },
  /*::[*/
  438: {
    /* n:"BrtEndPCDHGLevel", */
    T: -1
  },
  /*::[*/
  439: {
    /* n:"BrtBeginPCDHGLGroups", */
    T: 1
  },
  /*::[*/
  440: {
    /* n:"BrtEndPCDHGLGroups", */
    T: -1
  },
  /*::[*/
  441: {
    /* n:"BrtBeginPCDHGLGroup", */
    T: 1
  },
  /*::[*/
  442: {
    /* n:"BrtEndPCDHGLGroup", */
    T: -1
  },
  /*::[*/
  443: {
    /* n:"BrtBeginPCDHGLGMembers", */
    T: 1
  },
  /*::[*/
  444: {
    /* n:"BrtEndPCDHGLGMembers", */
    T: -1
  },
  /*::[*/
  445: {
    /* n:"BrtBeginPCDHGLGMember", */
    T: 1
  },
  /*::[*/
  446: {
    /* n:"BrtEndPCDHGLGMember", */
    T: -1
  },
  /*::[*/
  447: {
    /* n:"BrtBeginQSI", */
    T: 1
  },
  /*::[*/
  448: {
    /* n:"BrtEndQSI", */
    T: -1
  },
  /*::[*/
  449: {
    /* n:"BrtBeginQSIR", */
    T: 1
  },
  /*::[*/
  450: {
    /* n:"BrtEndQSIR", */
    T: -1
  },
  /*::[*/
  451: {
    /* n:"BrtBeginDeletedNames", */
    T: 1
  },
  /*::[*/
  452: {
    /* n:"BrtEndDeletedNames", */
    T: -1
  },
  /*::[*/
  453: {
    /* n:"BrtBeginDeletedName", */
    T: 1
  },
  /*::[*/
  454: {
    /* n:"BrtEndDeletedName", */
    T: -1
  },
  /*::[*/
  455: {
    /* n:"BrtBeginQSIFs", */
    T: 1
  },
  /*::[*/
  456: {
    /* n:"BrtEndQSIFs", */
    T: -1
  },
  /*::[*/
  457: {
    /* n:"BrtBeginQSIF", */
    T: 1
  },
  /*::[*/
  458: {
    /* n:"BrtEndQSIF", */
    T: -1
  },
  /*::[*/
  459: {
    /* n:"BrtBeginAutoSortScope", */
    T: 1
  },
  /*::[*/
  460: {
    /* n:"BrtEndAutoSortScope", */
    T: -1
  },
  /*::[*/
  461: {
    /* n:"BrtBeginConditionalFormatting", */
    T: 1
  },
  /*::[*/
  462: {
    /* n:"BrtEndConditionalFormatting", */
    T: -1
  },
  /*::[*/
  463: {
    /* n:"BrtBeginCFRule", */
    T: 1
  },
  /*::[*/
  464: {
    /* n:"BrtEndCFRule", */
    T: -1
  },
  /*::[*/
  465: {
    /* n:"BrtBeginIconSet", */
    T: 1
  },
  /*::[*/
  466: {
    /* n:"BrtEndIconSet", */
    T: -1
  },
  /*::[*/
  467: {
    /* n:"BrtBeginDatabar", */
    T: 1
  },
  /*::[*/
  468: {
    /* n:"BrtEndDatabar", */
    T: -1
  },
  /*::[*/
  469: {
    /* n:"BrtBeginColorScale", */
    T: 1
  },
  /*::[*/
  470: {
    /* n:"BrtEndColorScale", */
    T: -1
  },
  /*::[*/
  471: {
    /* n:"BrtCFVO" */
  },
  /*::[*/
  472: {
    /* n:"BrtExternValueMeta" */
  },
  /*::[*/
  473: {
    /* n:"BrtBeginColorPalette", */
    T: 1
  },
  /*::[*/
  474: {
    /* n:"BrtEndColorPalette", */
    T: -1
  },
  /*::[*/
  475: {
    /* n:"BrtIndexedColor" */
  },
  /*::[*/
  476: {
    /* n:"BrtMargins", */
    f: Qh
  },
  /*::[*/
  477: {
    /* n:"BrtPrintOptions" */
  },
  /*::[*/
  478: {
    /* n:"BrtPageSetup" */
  },
  /*::[*/
  479: {
    /* n:"BrtBeginHeaderFooter", */
    T: 1
  },
  /*::[*/
  480: {
    /* n:"BrtEndHeaderFooter", */
    T: -1
  },
  /*::[*/
  481: {
    /* n:"BrtBeginSXCrtFormat", */
    T: 1
  },
  /*::[*/
  482: {
    /* n:"BrtEndSXCrtFormat", */
    T: -1
  },
  /*::[*/
  483: {
    /* n:"BrtBeginSXCrtFormats", */
    T: 1
  },
  /*::[*/
  484: {
    /* n:"BrtEndSXCrtFormats", */
    T: -1
  },
  /*::[*/
  485: {
    /* n:"BrtWsFmtInfo", */
    f: lh
  },
  /*::[*/
  486: {
    /* n:"BrtBeginMgs", */
    T: 1
  },
  /*::[*/
  487: {
    /* n:"BrtEndMGs", */
    T: -1
  },
  /*::[*/
  488: {
    /* n:"BrtBeginMGMaps", */
    T: 1
  },
  /*::[*/
  489: {
    /* n:"BrtEndMGMaps", */
    T: -1
  },
  /*::[*/
  490: {
    /* n:"BrtBeginMG", */
    T: 1
  },
  /*::[*/
  491: {
    /* n:"BrtEndMG", */
    T: -1
  },
  /*::[*/
  492: {
    /* n:"BrtBeginMap", */
    T: 1
  },
  /*::[*/
  493: {
    /* n:"BrtEndMap", */
    T: -1
  },
  /*::[*/
  494: {
    /* n:"BrtHLink", */
    f: zh
  },
  /*::[*/
  495: {
    /* n:"BrtBeginDCon", */
    T: 1
  },
  /*::[*/
  496: {
    /* n:"BrtEndDCon", */
    T: -1
  },
  /*::[*/
  497: {
    /* n:"BrtBeginDRefs", */
    T: 1
  },
  /*::[*/
  498: {
    /* n:"BrtEndDRefs", */
    T: -1
  },
  /*::[*/
  499: {
    /* n:"BrtDRef" */
  },
  /*::[*/
  500: {
    /* n:"BrtBeginScenMan", */
    T: 1
  },
  /*::[*/
  501: {
    /* n:"BrtEndScenMan", */
    T: -1
  },
  /*::[*/
  502: {
    /* n:"BrtBeginSct", */
    T: 1
  },
  /*::[*/
  503: {
    /* n:"BrtEndSct", */
    T: -1
  },
  /*::[*/
  504: {
    /* n:"BrtSlc" */
  },
  /*::[*/
  505: {
    /* n:"BrtBeginDXFs", */
    T: 1
  },
  /*::[*/
  506: {
    /* n:"BrtEndDXFs", */
    T: -1
  },
  /*::[*/
  507: {
    /* n:"BrtDXF" */
  },
  /*::[*/
  508: {
    /* n:"BrtBeginTableStyles", */
    T: 1
  },
  /*::[*/
  509: {
    /* n:"BrtEndTableStyles", */
    T: -1
  },
  /*::[*/
  510: {
    /* n:"BrtBeginTableStyle", */
    T: 1
  },
  /*::[*/
  511: {
    /* n:"BrtEndTableStyle", */
    T: -1
  },
  /*::[*/
  512: {
    /* n:"BrtTableStyleElement" */
  },
  /*::[*/
  513: {
    /* n:"BrtTableStyleClient" */
  },
  /*::[*/
  514: {
    /* n:"BrtBeginVolDeps", */
    T: 1
  },
  /*::[*/
  515: {
    /* n:"BrtEndVolDeps", */
    T: -1
  },
  /*::[*/
  516: {
    /* n:"BrtBeginVolType", */
    T: 1
  },
  /*::[*/
  517: {
    /* n:"BrtEndVolType", */
    T: -1
  },
  /*::[*/
  518: {
    /* n:"BrtBeginVolMain", */
    T: 1
  },
  /*::[*/
  519: {
    /* n:"BrtEndVolMain", */
    T: -1
  },
  /*::[*/
  520: {
    /* n:"BrtBeginVolTopic", */
    T: 1
  },
  /*::[*/
  521: {
    /* n:"BrtEndVolTopic", */
    T: -1
  },
  /*::[*/
  522: {
    /* n:"BrtVolSubtopic" */
  },
  /*::[*/
  523: {
    /* n:"BrtVolRef" */
  },
  /*::[*/
  524: {
    /* n:"BrtVolNum" */
  },
  /*::[*/
  525: {
    /* n:"BrtVolErr" */
  },
  /*::[*/
  526: {
    /* n:"BrtVolStr" */
  },
  /*::[*/
  527: {
    /* n:"BrtVolBool" */
  },
  /*::[*/
  528: {
    /* n:"BrtBeginCalcChain$", */
    T: 1
  },
  /*::[*/
  529: {
    /* n:"BrtEndCalcChain$", */
    T: -1
  },
  /*::[*/
  530: {
    /* n:"BrtBeginSortState", */
    T: 1
  },
  /*::[*/
  531: {
    /* n:"BrtEndSortState", */
    T: -1
  },
  /*::[*/
  532: {
    /* n:"BrtBeginSortCond", */
    T: 1
  },
  /*::[*/
  533: {
    /* n:"BrtEndSortCond", */
    T: -1
  },
  /*::[*/
  534: {
    /* n:"BrtBookProtection" */
  },
  /*::[*/
  535: {
    /* n:"BrtSheetProtection" */
  },
  /*::[*/
  536: {
    /* n:"BrtRangeProtection" */
  },
  /*::[*/
  537: {
    /* n:"BrtPhoneticInfo" */
  },
  /*::[*/
  538: {
    /* n:"BrtBeginECTxtWiz", */
    T: 1
  },
  /*::[*/
  539: {
    /* n:"BrtEndECTxtWiz", */
    T: -1
  },
  /*::[*/
  540: {
    /* n:"BrtBeginECTWFldInfoLst", */
    T: 1
  },
  /*::[*/
  541: {
    /* n:"BrtEndECTWFldInfoLst", */
    T: -1
  },
  /*::[*/
  542: {
    /* n:"BrtBeginECTwFldInfo", */
    T: 1
  },
  /*::[*/
  548: {
    /* n:"BrtFileSharing" */
  },
  /*::[*/
  549: {
    /* n:"BrtOleSize" */
  },
  /*::[*/
  550: {
    /* n:"BrtDrawing", */
    f: e0
  },
  /*::[*/
  551: {
    /* n:"BrtLegacyDrawing" */
  },
  /*::[*/
  552: {
    /* n:"BrtLegacyDrawingHF" */
  },
  /*::[*/
  553: {
    /* n:"BrtWebOpt" */
  },
  /*::[*/
  554: {
    /* n:"BrtBeginWebPubItems", */
    T: 1
  },
  /*::[*/
  555: {
    /* n:"BrtEndWebPubItems", */
    T: -1
  },
  /*::[*/
  556: {
    /* n:"BrtBeginWebPubItem", */
    T: 1
  },
  /*::[*/
  557: {
    /* n:"BrtEndWebPubItem", */
    T: -1
  },
  /*::[*/
  558: {
    /* n:"BrtBeginSXCondFmt", */
    T: 1
  },
  /*::[*/
  559: {
    /* n:"BrtEndSXCondFmt", */
    T: -1
  },
  /*::[*/
  560: {
    /* n:"BrtBeginSXCondFmts", */
    T: 1
  },
  /*::[*/
  561: {
    /* n:"BrtEndSXCondFmts", */
    T: -1
  },
  /*::[*/
  562: {
    /* n:"BrtBkHim" */
  },
  /*::[*/
  564: {
    /* n:"BrtColor" */
  },
  /*::[*/
  565: {
    /* n:"BrtBeginIndexedColors", */
    T: 1
  },
  /*::[*/
  566: {
    /* n:"BrtEndIndexedColors", */
    T: -1
  },
  /*::[*/
  569: {
    /* n:"BrtBeginMRUColors", */
    T: 1
  },
  /*::[*/
  570: {
    /* n:"BrtEndMRUColors", */
    T: -1
  },
  /*::[*/
  572: {
    /* n:"BrtMRUColor" */
  },
  /*::[*/
  573: {
    /* n:"BrtBeginDVals", */
    T: 1
  },
  /*::[*/
  574: {
    /* n:"BrtEndDVals", */
    T: -1
  },
  /*::[*/
  577: {
    /* n:"BrtSupNameStart" */
  },
  /*::[*/
  578: {
    /* n:"BrtSupNameValueStart" */
  },
  /*::[*/
  579: {
    /* n:"BrtSupNameValueEnd" */
  },
  /*::[*/
  580: {
    /* n:"BrtSupNameNum" */
  },
  /*::[*/
  581: {
    /* n:"BrtSupNameErr" */
  },
  /*::[*/
  582: {
    /* n:"BrtSupNameSt" */
  },
  /*::[*/
  583: {
    /* n:"BrtSupNameNil" */
  },
  /*::[*/
  584: {
    /* n:"BrtSupNameBool" */
  },
  /*::[*/
  585: {
    /* n:"BrtSupNameFmla" */
  },
  /*::[*/
  586: {
    /* n:"BrtSupNameBits" */
  },
  /*::[*/
  587: {
    /* n:"BrtSupNameEnd" */
  },
  /*::[*/
  588: {
    /* n:"BrtEndSupBook", */
    T: -1
  },
  /*::[*/
  589: {
    /* n:"BrtCellSmartTagProperty" */
  },
  /*::[*/
  590: {
    /* n:"BrtBeginCellSmartTag", */
    T: 1
  },
  /*::[*/
  591: {
    /* n:"BrtEndCellSmartTag", */
    T: -1
  },
  /*::[*/
  592: {
    /* n:"BrtBeginCellSmartTags", */
    T: 1
  },
  /*::[*/
  593: {
    /* n:"BrtEndCellSmartTags", */
    T: -1
  },
  /*::[*/
  594: {
    /* n:"BrtBeginSmartTags", */
    T: 1
  },
  /*::[*/
  595: {
    /* n:"BrtEndSmartTags", */
    T: -1
  },
  /*::[*/
  596: {
    /* n:"BrtSmartTagType" */
  },
  /*::[*/
  597: {
    /* n:"BrtBeginSmartTagTypes", */
    T: 1
  },
  /*::[*/
  598: {
    /* n:"BrtEndSmartTagTypes", */
    T: -1
  },
  /*::[*/
  599: {
    /* n:"BrtBeginSXFilters", */
    T: 1
  },
  /*::[*/
  600: {
    /* n:"BrtEndSXFilters", */
    T: -1
  },
  /*::[*/
  601: {
    /* n:"BrtBeginSXFILTER", */
    T: 1
  },
  /*::[*/
  602: {
    /* n:"BrtEndSXFilter", */
    T: -1
  },
  /*::[*/
  603: {
    /* n:"BrtBeginFills", */
    T: 1
  },
  /*::[*/
  604: {
    /* n:"BrtEndFills", */
    T: -1
  },
  /*::[*/
  605: {
    /* n:"BrtBeginCellWatches", */
    T: 1
  },
  /*::[*/
  606: {
    /* n:"BrtEndCellWatches", */
    T: -1
  },
  /*::[*/
  607: {
    /* n:"BrtCellWatch" */
  },
  /*::[*/
  608: {
    /* n:"BrtBeginCRErrs", */
    T: 1
  },
  /*::[*/
  609: {
    /* n:"BrtEndCRErrs", */
    T: -1
  },
  /*::[*/
  610: {
    /* n:"BrtCrashRecErr" */
  },
  /*::[*/
  611: {
    /* n:"BrtBeginFonts", */
    T: 1
  },
  /*::[*/
  612: {
    /* n:"BrtEndFonts", */
    T: -1
  },
  /*::[*/
  613: {
    /* n:"BrtBeginBorders", */
    T: 1
  },
  /*::[*/
  614: {
    /* n:"BrtEndBorders", */
    T: -1
  },
  /*::[*/
  615: {
    /* n:"BrtBeginFmts", */
    T: 1
  },
  /*::[*/
  616: {
    /* n:"BrtEndFmts", */
    T: -1
  },
  /*::[*/
  617: {
    /* n:"BrtBeginCellXFs", */
    T: 1
  },
  /*::[*/
  618: {
    /* n:"BrtEndCellXFs", */
    T: -1
  },
  /*::[*/
  619: {
    /* n:"BrtBeginStyles", */
    T: 1
  },
  /*::[*/
  620: {
    /* n:"BrtEndStyles", */
    T: -1
  },
  /*::[*/
  625: {
    /* n:"BrtBigName" */
  },
  /*::[*/
  626: {
    /* n:"BrtBeginCellStyleXFs", */
    T: 1
  },
  /*::[*/
  627: {
    /* n:"BrtEndCellStyleXFs", */
    T: -1
  },
  /*::[*/
  628: {
    /* n:"BrtBeginComments", */
    T: 1
  },
  /*::[*/
  629: {
    /* n:"BrtEndComments", */
    T: -1
  },
  /*::[*/
  630: {
    /* n:"BrtBeginCommentAuthors", */
    T: 1
  },
  /*::[*/
  631: {
    /* n:"BrtEndCommentAuthors", */
    T: -1
  },
  /*::[*/
  632: {
    /* n:"BrtCommentAuthor", */
    f: du
  },
  /*::[*/
  633: {
    /* n:"BrtBeginCommentList", */
    T: 1
  },
  /*::[*/
  634: {
    /* n:"BrtEndCommentList", */
    T: -1
  },
  /*::[*/
  635: {
    /* n:"BrtBeginComment", */
    T: 1,
    f: hu
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: mo
  },
  /*::[*/
  638: {
    /* n:"BrtBeginOleObjects", */
    T: 1
  },
  /*::[*/
  639: {
    /* n:"BrtOleObject" */
  },
  /*::[*/
  640: {
    /* n:"BrtEndOleObjects", */
    T: -1
  },
  /*::[*/
  641: {
    /* n:"BrtBeginSxrules", */
    T: 1
  },
  /*::[*/
  642: {
    /* n:"BrtEndSxRules", */
    T: -1
  },
  /*::[*/
  643: {
    /* n:"BrtBeginActiveXControls", */
    T: 1
  },
  /*::[*/
  644: {
    /* n:"BrtActiveX" */
  },
  /*::[*/
  645: {
    /* n:"BrtEndActiveXControls", */
    T: -1
  },
  /*::[*/
  646: {
    /* n:"BrtBeginPCDSDTCEMembersSortBy", */
    T: 1
  },
  /*::[*/
  648: {
    /* n:"BrtBeginCellIgnoreECs", */
    T: 1
  },
  /*::[*/
  649: {
    /* n:"BrtCellIgnoreEC" */
  },
  /*::[*/
  650: {
    /* n:"BrtEndCellIgnoreECs", */
    T: -1
  },
  /*::[*/
  651: {
    /* n:"BrtCsProp", */
    f: gx
  },
  /*::[*/
  652: {
    /* n:"BrtCsPageSetup" */
  },
  /*::[*/
  653: {
    /* n:"BrtBeginUserCsViews", */
    T: 1
  },
  /*::[*/
  654: {
    /* n:"BrtEndUserCsViews", */
    T: -1
  },
  /*::[*/
  655: {
    /* n:"BrtBeginUserCsView", */
    T: 1
  },
  /*::[*/
  656: {
    /* n:"BrtEndUserCsView", */
    T: -1
  },
  /*::[*/
  657: {
    /* n:"BrtBeginPcdSFCIEntries", */
    T: 1
  },
  /*::[*/
  658: {
    /* n:"BrtEndPCDSFCIEntries", */
    T: -1
  },
  /*::[*/
  659: {
    /* n:"BrtPCDSFCIEntry" */
  },
  /*::[*/
  660: {
    /* n:"BrtBeginListParts", */
    T: 1
  },
  /*::[*/
  661: {
    /* n:"BrtListPart" */
  },
  /*::[*/
  662: {
    /* n:"BrtEndListParts", */
    T: -1
  },
  /*::[*/
  663: {
    /* n:"BrtSheetCalcProp" */
  },
  /*::[*/
  664: {
    /* n:"BrtBeginFnGroup", */
    T: 1
  },
  /*::[*/
  665: {
    /* n:"BrtFnGroup" */
  },
  /*::[*/
  666: {
    /* n:"BrtEndFnGroup", */
    T: -1
  },
  /*::[*/
  667: {
    /* n:"BrtSupAddin" */
  },
  /*::[*/
  668: {
    /* n:"BrtSXTDMPOrder" */
  },
  /*::[*/
  669: {
    /* n:"BrtCsProtection" */
  },
  /*::[*/
  671: {
    /* n:"BrtBeginWsSortMap", */
    T: 1
  },
  /*::[*/
  672: {
    /* n:"BrtEndWsSortMap", */
    T: -1
  },
  /*::[*/
  673: {
    /* n:"BrtBeginRRSort", */
    T: 1
  },
  /*::[*/
  674: {
    /* n:"BrtEndRRSort", */
    T: -1
  },
  /*::[*/
  675: {
    /* n:"BrtRRSortItem" */
  },
  /*::[*/
  676: {
    /* n:"BrtFileSharingIso" */
  },
  /*::[*/
  677: {
    /* n:"BrtBookProtectionIso" */
  },
  /*::[*/
  678: {
    /* n:"BrtSheetProtectionIso" */
  },
  /*::[*/
  679: {
    /* n:"BrtCsProtectionIso" */
  },
  /*::[*/
  680: {
    /* n:"BrtRangeProtectionIso" */
  },
  /*::[*/
  681: {
    /* n:"BrtDValList" */
  },
  /*::[*/
  1024: {
    /* n:"BrtRwDescent" */
  },
  /*::[*/
  1025: {
    /* n:"BrtKnownFonts" */
  },
  /*::[*/
  1026: {
    /* n:"BrtBeginSXTupleSet", */
    T: 1
  },
  /*::[*/
  1027: {
    /* n:"BrtEndSXTupleSet", */
    T: -1
  },
  /*::[*/
  1028: {
    /* n:"BrtBeginSXTupleSetHeader", */
    T: 1
  },
  /*::[*/
  1029: {
    /* n:"BrtEndSXTupleSetHeader", */
    T: -1
  },
  /*::[*/
  1030: {
    /* n:"BrtSXTupleSetHeaderItem" */
  },
  /*::[*/
  1031: {
    /* n:"BrtBeginSXTupleSetData", */
    T: 1
  },
  /*::[*/
  1032: {
    /* n:"BrtEndSXTupleSetData", */
    T: -1
  },
  /*::[*/
  1033: {
    /* n:"BrtBeginSXTupleSetRow", */
    T: 1
  },
  /*::[*/
  1034: {
    /* n:"BrtEndSXTupleSetRow", */
    T: -1
  },
  /*::[*/
  1035: {
    /* n:"BrtSXTupleSetRowItem" */
  },
  /*::[*/
  1036: {
    /* n:"BrtNameExt" */
  },
  /*::[*/
  1037: {
    /* n:"BrtPCDH14" */
  },
  /*::[*/
  1038: {
    /* n:"BrtBeginPCDCalcMem14", */
    T: 1
  },
  /*::[*/
  1039: {
    /* n:"BrtEndPCDCalcMem14", */
    T: -1
  },
  /*::[*/
  1040: {
    /* n:"BrtSXTH14" */
  },
  /*::[*/
  1041: {
    /* n:"BrtBeginSparklineGroup", */
    T: 1
  },
  /*::[*/
  1042: {
    /* n:"BrtEndSparklineGroup", */
    T: -1
  },
  /*::[*/
  1043: {
    /* n:"BrtSparkline" */
  },
  /*::[*/
  1044: {
    /* n:"BrtSXDI14" */
  },
  /*::[*/
  1045: {
    /* n:"BrtWsFmtInfoEx14" */
  },
  /*::[*/
  1046: {
    /* n:"BrtBeginConditionalFormatting14", */
    T: 1
  },
  /*::[*/
  1047: {
    /* n:"BrtEndConditionalFormatting14", */
    T: -1
  },
  /*::[*/
  1048: {
    /* n:"BrtBeginCFRule14", */
    T: 1
  },
  /*::[*/
  1049: {
    /* n:"BrtEndCFRule14", */
    T: -1
  },
  /*::[*/
  1050: {
    /* n:"BrtCFVO14" */
  },
  /*::[*/
  1051: {
    /* n:"BrtBeginDatabar14", */
    T: 1
  },
  /*::[*/
  1052: {
    /* n:"BrtBeginIconSet14", */
    T: 1
  },
  /*::[*/
  1053: {
    /* n:"BrtDVal14", */
    f: sx
  },
  /*::[*/
  1054: {
    /* n:"BrtBeginDVals14", */
    T: 1
  },
  /*::[*/
  1055: {
    /* n:"BrtColor14" */
  },
  /*::[*/
  1056: {
    /* n:"BrtBeginSparklines", */
    T: 1
  },
  /*::[*/
  1057: {
    /* n:"BrtEndSparklines", */
    T: -1
  },
  /*::[*/
  1058: {
    /* n:"BrtBeginSparklineGroups", */
    T: 1
  },
  /*::[*/
  1059: {
    /* n:"BrtEndSparklineGroups", */
    T: -1
  },
  /*::[*/
  1061: {
    /* n:"BrtSXVD14" */
  },
  /*::[*/
  1062: {
    /* n:"BrtBeginSXView14", */
    T: 1
  },
  /*::[*/
  1063: {
    /* n:"BrtEndSXView14", */
    T: -1
  },
  /*::[*/
  1064: {
    /* n:"BrtBeginSXView16", */
    T: 1
  },
  /*::[*/
  1065: {
    /* n:"BrtEndSXView16", */
    T: -1
  },
  /*::[*/
  1066: {
    /* n:"BrtBeginPCD14", */
    T: 1
  },
  /*::[*/
  1067: {
    /* n:"BrtEndPCD14", */
    T: -1
  },
  /*::[*/
  1068: {
    /* n:"BrtBeginExtConn14", */
    T: 1
  },
  /*::[*/
  1069: {
    /* n:"BrtEndExtConn14", */
    T: -1
  },
  /*::[*/
  1070: {
    /* n:"BrtBeginSlicerCacheIDs", */
    T: 1
  },
  /*::[*/
  1071: {
    /* n:"BrtEndSlicerCacheIDs", */
    T: -1
  },
  /*::[*/
  1072: {
    /* n:"BrtBeginSlicerCacheID", */
    T: 1
  },
  /*::[*/
  1073: {
    /* n:"BrtEndSlicerCacheID", */
    T: -1
  },
  /*::[*/
  1075: {
    /* n:"BrtBeginSlicerCache", */
    T: 1
  },
  /*::[*/
  1076: {
    /* n:"BrtEndSlicerCache", */
    T: -1
  },
  /*::[*/
  1077: {
    /* n:"BrtBeginSlicerCacheDef", */
    T: 1
  },
  /*::[*/
  1078: {
    /* n:"BrtEndSlicerCacheDef", */
    T: -1
  },
  /*::[*/
  1079: {
    /* n:"BrtBeginSlicersEx", */
    T: 1
  },
  /*::[*/
  1080: {
    /* n:"BrtEndSlicersEx", */
    T: -1
  },
  /*::[*/
  1081: {
    /* n:"BrtBeginSlicerEx", */
    T: 1
  },
  /*::[*/
  1082: {
    /* n:"BrtEndSlicerEx", */
    T: -1
  },
  /*::[*/
  1083: {
    /* n:"BrtBeginSlicer", */
    T: 1
  },
  /*::[*/
  1084: {
    /* n:"BrtEndSlicer", */
    T: -1
  },
  /*::[*/
  1085: {
    /* n:"BrtSlicerCachePivotTables" */
  },
  /*::[*/
  1086: {
    /* n:"BrtBeginSlicerCacheOlapImpl", */
    T: 1
  },
  /*::[*/
  1087: {
    /* n:"BrtEndSlicerCacheOlapImpl", */
    T: -1
  },
  /*::[*/
  1088: {
    /* n:"BrtBeginSlicerCacheLevelsData", */
    T: 1
  },
  /*::[*/
  1089: {
    /* n:"BrtEndSlicerCacheLevelsData", */
    T: -1
  },
  /*::[*/
  1090: {
    /* n:"BrtBeginSlicerCacheLevelData", */
    T: 1
  },
  /*::[*/
  1091: {
    /* n:"BrtEndSlicerCacheLevelData", */
    T: -1
  },
  /*::[*/
  1092: {
    /* n:"BrtBeginSlicerCacheSiRanges", */
    T: 1
  },
  /*::[*/
  1093: {
    /* n:"BrtEndSlicerCacheSiRanges", */
    T: -1
  },
  /*::[*/
  1094: {
    /* n:"BrtBeginSlicerCacheSiRange", */
    T: 1
  },
  /*::[*/
  1095: {
    /* n:"BrtEndSlicerCacheSiRange", */
    T: -1
  },
  /*::[*/
  1096: {
    /* n:"BrtSlicerCacheOlapItem" */
  },
  /*::[*/
  1097: {
    /* n:"BrtBeginSlicerCacheSelections", */
    T: 1
  },
  /*::[*/
  1098: {
    /* n:"BrtSlicerCacheSelection" */
  },
  /*::[*/
  1099: {
    /* n:"BrtEndSlicerCacheSelections", */
    T: -1
  },
  /*::[*/
  1100: {
    /* n:"BrtBeginSlicerCacheNative", */
    T: 1
  },
  /*::[*/
  1101: {
    /* n:"BrtEndSlicerCacheNative", */
    T: -1
  },
  /*::[*/
  1102: {
    /* n:"BrtSlicerCacheNativeItem" */
  },
  /*::[*/
  1103: {
    /* n:"BrtRangeProtection14" */
  },
  /*::[*/
  1104: {
    /* n:"BrtRangeProtectionIso14" */
  },
  /*::[*/
  1105: {
    /* n:"BrtCellIgnoreEC14" */
  },
  /*::[*/
  1111: {
    /* n:"BrtList14" */
  },
  /*::[*/
  1112: {
    /* n:"BrtCFIcon" */
  },
  /*::[*/
  1113: {
    /* n:"BrtBeginSlicerCachesPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  1114: {
    /* n:"BrtEndSlicerCachesPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  1115: {
    /* n:"BrtBeginSlicers", */
    T: 1
  },
  /*::[*/
  1116: {
    /* n:"BrtEndSlicers", */
    T: -1
  },
  /*::[*/
  1117: {
    /* n:"BrtWbProp14" */
  },
  /*::[*/
  1118: {
    /* n:"BrtBeginSXEdit", */
    T: 1
  },
  /*::[*/
  1119: {
    /* n:"BrtEndSXEdit", */
    T: -1
  },
  /*::[*/
  1120: {
    /* n:"BrtBeginSXEdits", */
    T: 1
  },
  /*::[*/
  1121: {
    /* n:"BrtEndSXEdits", */
    T: -1
  },
  /*::[*/
  1122: {
    /* n:"BrtBeginSXChange", */
    T: 1
  },
  /*::[*/
  1123: {
    /* n:"BrtEndSXChange", */
    T: -1
  },
  /*::[*/
  1124: {
    /* n:"BrtBeginSXChanges", */
    T: 1
  },
  /*::[*/
  1125: {
    /* n:"BrtEndSXChanges", */
    T: -1
  },
  /*::[*/
  1126: {
    /* n:"BrtSXTupleItems" */
  },
  /*::[*/
  1128: {
    /* n:"BrtBeginSlicerStyle", */
    T: 1
  },
  /*::[*/
  1129: {
    /* n:"BrtEndSlicerStyle", */
    T: -1
  },
  /*::[*/
  1130: {
    /* n:"BrtSlicerStyleElement" */
  },
  /*::[*/
  1131: {
    /* n:"BrtBeginStyleSheetExt14", */
    T: 1
  },
  /*::[*/
  1132: {
    /* n:"BrtEndStyleSheetExt14", */
    T: -1
  },
  /*::[*/
  1133: {
    /* n:"BrtBeginSlicerCachesPivotCacheID", */
    T: 1
  },
  /*::[*/
  1134: {
    /* n:"BrtEndSlicerCachesPivotCacheID", */
    T: -1
  },
  /*::[*/
  1135: {
    /* n:"BrtBeginConditionalFormattings", */
    T: 1
  },
  /*::[*/
  1136: {
    /* n:"BrtEndConditionalFormattings", */
    T: -1
  },
  /*::[*/
  1137: {
    /* n:"BrtBeginPCDCalcMemExt", */
    T: 1
  },
  /*::[*/
  1138: {
    /* n:"BrtEndPCDCalcMemExt", */
    T: -1
  },
  /*::[*/
  1139: {
    /* n:"BrtBeginPCDCalcMemsExt", */
    T: 1
  },
  /*::[*/
  1140: {
    /* n:"BrtEndPCDCalcMemsExt", */
    T: -1
  },
  /*::[*/
  1141: {
    /* n:"BrtPCDField14" */
  },
  /*::[*/
  1142: {
    /* n:"BrtBeginSlicerStyles", */
    T: 1
  },
  /*::[*/
  1143: {
    /* n:"BrtEndSlicerStyles", */
    T: -1
  },
  /*::[*/
  1144: {
    /* n:"BrtBeginSlicerStyleElements", */
    T: 1
  },
  /*::[*/
  1145: {
    /* n:"BrtEndSlicerStyleElements", */
    T: -1
  },
  /*::[*/
  1146: {
    /* n:"BrtCFRuleExt" */
  },
  /*::[*/
  1147: {
    /* n:"BrtBeginSXCondFmt14", */
    T: 1
  },
  /*::[*/
  1148: {
    /* n:"BrtEndSXCondFmt14", */
    T: -1
  },
  /*::[*/
  1149: {
    /* n:"BrtBeginSXCondFmts14", */
    T: 1
  },
  /*::[*/
  1150: {
    /* n:"BrtEndSXCondFmts14", */
    T: -1
  },
  /*::[*/
  1152: {
    /* n:"BrtBeginSortCond14", */
    T: 1
  },
  /*::[*/
  1153: {
    /* n:"BrtEndSortCond14", */
    T: -1
  },
  /*::[*/
  1154: {
    /* n:"BrtEndDVals14", */
    T: -1
  },
  /*::[*/
  1155: {
    /* n:"BrtEndIconSet14", */
    T: -1
  },
  /*::[*/
  1156: {
    /* n:"BrtEndDatabar14", */
    T: -1
  },
  /*::[*/
  1157: {
    /* n:"BrtBeginColorScale14", */
    T: 1
  },
  /*::[*/
  1158: {
    /* n:"BrtEndColorScale14", */
    T: -1
  },
  /*::[*/
  1159: {
    /* n:"BrtBeginSxrules14", */
    T: 1
  },
  /*::[*/
  1160: {
    /* n:"BrtEndSxrules14", */
    T: -1
  },
  /*::[*/
  1161: {
    /* n:"BrtBeginPRule14", */
    T: 1
  },
  /*::[*/
  1162: {
    /* n:"BrtEndPRule14", */
    T: -1
  },
  /*::[*/
  1163: {
    /* n:"BrtBeginPRFilters14", */
    T: 1
  },
  /*::[*/
  1164: {
    /* n:"BrtEndPRFilters14", */
    T: -1
  },
  /*::[*/
  1165: {
    /* n:"BrtBeginPRFilter14", */
    T: 1
  },
  /*::[*/
  1166: {
    /* n:"BrtEndPRFilter14", */
    T: -1
  },
  /*::[*/
  1167: {
    /* n:"BrtBeginPRFItem14", */
    T: 1
  },
  /*::[*/
  1168: {
    /* n:"BrtEndPRFItem14", */
    T: -1
  },
  /*::[*/
  1169: {
    /* n:"BrtBeginCellIgnoreECs14", */
    T: 1
  },
  /*::[*/
  1170: {
    /* n:"BrtEndCellIgnoreECs14", */
    T: -1
  },
  /*::[*/
  1171: {
    /* n:"BrtDxf14" */
  },
  /*::[*/
  1172: {
    /* n:"BrtBeginDxF14s", */
    T: 1
  },
  /*::[*/
  1173: {
    /* n:"BrtEndDxf14s", */
    T: -1
  },
  /*::[*/
  1177: {
    /* n:"BrtFilter14" */
  },
  /*::[*/
  1178: {
    /* n:"BrtBeginCustomFilters14", */
    T: 1
  },
  /*::[*/
  1180: {
    /* n:"BrtCustomFilter14" */
  },
  /*::[*/
  1181: {
    /* n:"BrtIconFilter14" */
  },
  /*::[*/
  1182: {
    /* n:"BrtPivotCacheConnectionName" */
  },
  /*::[*/
  2048: {
    /* n:"BrtBeginDecoupledPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2049: {
    /* n:"BrtEndDecoupledPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2050: {
    /* n:"BrtDecoupledPivotCacheID" */
  },
  /*::[*/
  2051: {
    /* n:"BrtBeginPivotTableRefs", */
    T: 1
  },
  /*::[*/
  2052: {
    /* n:"BrtEndPivotTableRefs", */
    T: -1
  },
  /*::[*/
  2053: {
    /* n:"BrtPivotTableRef" */
  },
  /*::[*/
  2054: {
    /* n:"BrtSlicerCacheBookPivotTables" */
  },
  /*::[*/
  2055: {
    /* n:"BrtBeginSxvcells", */
    T: 1
  },
  /*::[*/
  2056: {
    /* n:"BrtEndSxvcells", */
    T: -1
  },
  /*::[*/
  2057: {
    /* n:"BrtBeginSxRow", */
    T: 1
  },
  /*::[*/
  2058: {
    /* n:"BrtEndSxRow", */
    T: -1
  },
  /*::[*/
  2060: {
    /* n:"BrtPcdCalcMem15" */
  },
  /*::[*/
  2067: {
    /* n:"BrtQsi15" */
  },
  /*::[*/
  2068: {
    /* n:"BrtBeginWebExtensions", */
    T: 1
  },
  /*::[*/
  2069: {
    /* n:"BrtEndWebExtensions", */
    T: -1
  },
  /*::[*/
  2070: {
    /* n:"BrtWebExtension" */
  },
  /*::[*/
  2071: {
    /* n:"BrtAbsPath15" */
  },
  /*::[*/
  2072: {
    /* n:"BrtBeginPivotTableUISettings", */
    T: 1
  },
  /*::[*/
  2073: {
    /* n:"BrtEndPivotTableUISettings", */
    T: -1
  },
  /*::[*/
  2075: {
    /* n:"BrtTableSlicerCacheIDs" */
  },
  /*::[*/
  2076: {
    /* n:"BrtTableSlicerCacheID" */
  },
  /*::[*/
  2077: {
    /* n:"BrtBeginTableSlicerCache", */
    T: 1
  },
  /*::[*/
  2078: {
    /* n:"BrtEndTableSlicerCache", */
    T: -1
  },
  /*::[*/
  2079: {
    /* n:"BrtSxFilter15" */
  },
  /*::[*/
  2080: {
    /* n:"BrtBeginTimelineCachePivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2081: {
    /* n:"BrtEndTimelineCachePivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2082: {
    /* n:"BrtTimelineCachePivotCacheID" */
  },
  /*::[*/
  2083: {
    /* n:"BrtBeginTimelineCacheIDs", */
    T: 1
  },
  /*::[*/
  2084: {
    /* n:"BrtEndTimelineCacheIDs", */
    T: -1
  },
  /*::[*/
  2085: {
    /* n:"BrtBeginTimelineCacheID", */
    T: 1
  },
  /*::[*/
  2086: {
    /* n:"BrtEndTimelineCacheID", */
    T: -1
  },
  /*::[*/
  2087: {
    /* n:"BrtBeginTimelinesEx", */
    T: 1
  },
  /*::[*/
  2088: {
    /* n:"BrtEndTimelinesEx", */
    T: -1
  },
  /*::[*/
  2089: {
    /* n:"BrtBeginTimelineEx", */
    T: 1
  },
  /*::[*/
  2090: {
    /* n:"BrtEndTimelineEx", */
    T: -1
  },
  /*::[*/
  2091: {
    /* n:"BrtWorkBookPr15" */
  },
  /*::[*/
  2092: {
    /* n:"BrtPCDH15" */
  },
  /*::[*/
  2093: {
    /* n:"BrtBeginTimelineStyle", */
    T: 1
  },
  /*::[*/
  2094: {
    /* n:"BrtEndTimelineStyle", */
    T: -1
  },
  /*::[*/
  2095: {
    /* n:"BrtTimelineStyleElement" */
  },
  /*::[*/
  2096: {
    /* n:"BrtBeginTimelineStylesheetExt15", */
    T: 1
  },
  /*::[*/
  2097: {
    /* n:"BrtEndTimelineStylesheetExt15", */
    T: -1
  },
  /*::[*/
  2098: {
    /* n:"BrtBeginTimelineStyles", */
    T: 1
  },
  /*::[*/
  2099: {
    /* n:"BrtEndTimelineStyles", */
    T: -1
  },
  /*::[*/
  2100: {
    /* n:"BrtBeginTimelineStyleElements", */
    T: 1
  },
  /*::[*/
  2101: {
    /* n:"BrtEndTimelineStyleElements", */
    T: -1
  },
  /*::[*/
  2102: {
    /* n:"BrtDxf15" */
  },
  /*::[*/
  2103: {
    /* n:"BrtBeginDxfs15", */
    T: 1
  },
  /*::[*/
  2104: {
    /* n:"BrtEndDxfs15", */
    T: -1
  },
  /*::[*/
  2105: {
    /* n:"BrtSlicerCacheHideItemsWithNoData" */
  },
  /*::[*/
  2106: {
    /* n:"BrtBeginItemUniqueNames", */
    T: 1
  },
  /*::[*/
  2107: {
    /* n:"BrtEndItemUniqueNames", */
    T: -1
  },
  /*::[*/
  2108: {
    /* n:"BrtItemUniqueName" */
  },
  /*::[*/
  2109: {
    /* n:"BrtBeginExtConn15", */
    T: 1
  },
  /*::[*/
  2110: {
    /* n:"BrtEndExtConn15", */
    T: -1
  },
  /*::[*/
  2111: {
    /* n:"BrtBeginOledbPr15", */
    T: 1
  },
  /*::[*/
  2112: {
    /* n:"BrtEndOledbPr15", */
    T: -1
  },
  /*::[*/
  2113: {
    /* n:"BrtBeginDataFeedPr15", */
    T: 1
  },
  /*::[*/
  2114: {
    /* n:"BrtEndDataFeedPr15", */
    T: -1
  },
  /*::[*/
  2115: {
    /* n:"BrtTextPr15" */
  },
  /*::[*/
  2116: {
    /* n:"BrtRangePr15" */
  },
  /*::[*/
  2117: {
    /* n:"BrtDbCommand15" */
  },
  /*::[*/
  2118: {
    /* n:"BrtBeginDbTables15", */
    T: 1
  },
  /*::[*/
  2119: {
    /* n:"BrtEndDbTables15", */
    T: -1
  },
  /*::[*/
  2120: {
    /* n:"BrtDbTable15" */
  },
  /*::[*/
  2121: {
    /* n:"BrtBeginDataModel", */
    T: 1
  },
  /*::[*/
  2122: {
    /* n:"BrtEndDataModel", */
    T: -1
  },
  /*::[*/
  2123: {
    /* n:"BrtBeginModelTables", */
    T: 1
  },
  /*::[*/
  2124: {
    /* n:"BrtEndModelTables", */
    T: -1
  },
  /*::[*/
  2125: {
    /* n:"BrtModelTable" */
  },
  /*::[*/
  2126: {
    /* n:"BrtBeginModelRelationships", */
    T: 1
  },
  /*::[*/
  2127: {
    /* n:"BrtEndModelRelationships", */
    T: -1
  },
  /*::[*/
  2128: {
    /* n:"BrtModelRelationship" */
  },
  /*::[*/
  2129: {
    /* n:"BrtBeginECTxtWiz15", */
    T: 1
  },
  /*::[*/
  2130: {
    /* n:"BrtEndECTxtWiz15", */
    T: -1
  },
  /*::[*/
  2131: {
    /* n:"BrtBeginECTWFldInfoLst15", */
    T: 1
  },
  /*::[*/
  2132: {
    /* n:"BrtEndECTWFldInfoLst15", */
    T: -1
  },
  /*::[*/
  2133: {
    /* n:"BrtBeginECTWFldInfo15", */
    T: 1
  },
  /*::[*/
  2134: {
    /* n:"BrtFieldListActiveItem" */
  },
  /*::[*/
  2135: {
    /* n:"BrtPivotCacheIdVersion" */
  },
  /*::[*/
  2136: {
    /* n:"BrtSXDI15" */
  },
  /*::[*/
  2137: {
    /* n:"BrtBeginModelTimeGroupings", */
    T: 1
  },
  /*::[*/
  2138: {
    /* n:"BrtEndModelTimeGroupings", */
    T: -1
  },
  /*::[*/
  2139: {
    /* n:"BrtBeginModelTimeGrouping", */
    T: 1
  },
  /*::[*/
  2140: {
    /* n:"BrtEndModelTimeGrouping", */
    T: -1
  },
  /*::[*/
  2141: {
    /* n:"BrtModelTimeGroupingCalcCol" */
  },
  /*::[*/
  3072: {
    /* n:"BrtUid" */
  },
  /*::[*/
  3073: {
    /* n:"BrtRevisionPtr" */
  },
  /*::[*/
  4096: {
    /* n:"BrtBeginDynamicArrayPr", */
    T: 1
  },
  /*::[*/
  4097: {
    /* n:"BrtEndDynamicArrayPr", */
    T: -1
  },
  /*::[*/
  5002: {
    /* n:"BrtBeginRichValueBlock", */
    T: 1
  },
  /*::[*/
  5003: {
    /* n:"BrtEndRichValueBlock", */
    T: -1
  },
  /*::[*/
  5081: {
    /* n:"BrtBeginRichFilters", */
    T: 1
  },
  /*::[*/
  5082: {
    /* n:"BrtEndRichFilters", */
    T: -1
  },
  /*::[*/
  5083: {
    /* n:"BrtRichFilter" */
  },
  /*::[*/
  5084: {
    /* n:"BrtBeginRichFilterColumn", */
    T: 1
  },
  /*::[*/
  5085: {
    /* n:"BrtEndRichFilterColumn", */
    T: -1
  },
  /*::[*/
  5086: {
    /* n:"BrtBeginCustomRichFilters", */
    T: 1
  },
  /*::[*/
  5087: {
    /* n:"BrtEndCustomRichFilters", */
    T: -1
  },
  /*::[*/
  5088: {
    /* n:"BrtCustomRichFilter" */
  },
  /*::[*/
  5089: {
    /* n:"BrtTop10RichFilter" */
  },
  /*::[*/
  5090: {
    /* n:"BrtDynamicRichFilter" */
  },
  /*::[*/
  5092: {
    /* n:"BrtBeginRichSortCondition", */
    T: 1
  },
  /*::[*/
  5093: {
    /* n:"BrtEndRichSortCondition", */
    T: -1
  },
  /*::[*/
  5094: {
    /* n:"BrtRichFilterDateGroupItem" */
  },
  /*::[*/
  5095: {
    /* n:"BrtBeginCalcFeatures", */
    T: 1
  },
  /*::[*/
  5096: {
    /* n:"BrtEndCalcFeatures", */
    T: -1
  },
  /*::[*/
  5097: {
    /* n:"BrtCalcFeature" */
  },
  /*::[*/
  5099: {
    /* n:"BrtExternalLinksPr" */
  },
  /*::[*/
  65535: { n: "" }
};
function J(e, t, r, n) {
  var a = t;
  if (!isNaN(a)) {
    var i = n || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && d0(r) && e.push(r);
  }
}
function r2(e, t, r, n) {
  var a = n || (r || []).length || 0;
  if (a <= 8224)
    return J(e, t, r, a);
  var i = t;
  if (!isNaN(i)) {
    for (var s = r.parts || [], f = 0, o = 0, l = 0; l + (s[f] || 8224) <= 8224; )
      l += s[f] || 8224, f++;
    var c = e.next(4);
    for (c.write_shift(2, i), c.write_shift(2, l), e.push(r.slice(o, o + l)), o += l; o < a; ) {
      for (c = e.next(4), c.write_shift(2, 60), l = 0; l + (s[f] || 8224) <= 8224; )
        l += s[f] || 8224, f++;
      c.write_shift(2, l), e.push(r.slice(o, o + l)), o += l;
    }
  }
}
function Yt(e, t, r) {
  return e || (e = M(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function t2(e, t, r, n) {
  var a = M(9);
  return Yt(a, e, t), bi(r, n || "b", a), a;
}
function n2(e, t, r) {
  var n = M(8 + 2 * r.length);
  return Yt(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function a2(e, t, r, n) {
  if (t.v != null)
    switch (t.t) {
      case "d":
      case "n":
        var a = t.t == "d" ? er(Ze(t.v)) : t.v;
        a == (a | 0) && a >= 0 && a < 65536 ? J(e, 2, gc(r, n, a)) : J(e, 3, mc(r, n, a));
        return;
      case "b":
      case "e":
        J(e, 5, t2(r, n, t.v, t.t));
        return;
      case "s":
      case "str":
        J(e, 4, n2(r, n, (t.v || "").slice(0, 255)));
        return;
    }
  J(e, 1, Yt(null, r, n));
}
function i2(e, t, r, n) {
  var a = Array.isArray(t), i = Se(t["!ref"] || "A1"), s, f = "", o = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF)
      throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = ke(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    f = Xe(l);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      l === i.s.r && (o[c] = ze(c)), s = o[c] + f;
      var h = a ? (t[l] || [])[c] : t[s];
      h && a2(e, h, l, c);
    }
  }
}
function s2(e, t) {
  for (var r = t || {}, n = Qe(), a = 0, i = 0; i < e.SheetNames.length; ++i)
    e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet)
    throw new Error("Sheet not found: " + r.sheet);
  return J(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, T0(e, 16, r)), i2(n, e.Sheets[e.SheetNames[a]], a, r), J(n, 10), n.end();
}
function f2(e, t, r) {
  J(e, 49, ec({
    sz: 12,
    color: { theme: 1 },
    name: "Arial",
    family: 2,
    scheme: "minor"
  }, r));
}
function l2(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a)
      t[a] != null && J(e, 1054, nc(a, t[a], r));
  });
}
function o2(e, t) {
  var r = M(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), J(e, 2151, r), r = M(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), Wi(Se(t["!ref"] || "A1"), r), r.write_shift(4, 4), J(e, 2152, r);
}
function c2(e, t) {
  for (var r = 0; r < 16; ++r)
    J(e, 224, Ea({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    J(e, 224, Ea(n, 0, t));
  });
}
function u2(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    J(e, 440, uc(n)), n[1].Tooltip && J(e, 2048, hc(n));
  }
  delete t["!links"];
}
function h2(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && J(e, 125, pc(Nn(a, n), a));
    });
  }
}
function x2(e, t, r, n, a) {
  var i = 16 + jr(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    J(e, 513, et(r, n, i));
    return;
  }
  if (t.bf)
    J(e, 6, M1(t, r, n, a, i));
  else
    switch (t.t) {
      case "d":
      case "n":
        var s = t.t == "d" ? er(Ze(t.v)) : t.v;
        J(e, 515, fc(r, n, s, i));
        break;
      case "b":
      case "e":
        J(e, 517, sc(r, n, t.v, i, a, t.t));
        break;
      case "s":
      case "str":
        if (a.bookSST) {
          var f = y0(a.Strings, t.v, a.revStrings);
          J(e, 253, rc(r, n, f, i));
        } else
          J(e, 516, tc(r, n, (t.v || "").slice(0, 255), i, a));
        break;
      default:
        J(e, 513, et(r, n, i));
    }
}
function d2(e, t, r) {
  var n = Qe(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, o = Array.isArray(i), l = t.biff == 8, c, h = "", u = [], d = Se(i["!ref"] || "A1"), _ = l ? 65536 : 16384;
  if (d.e.c > 255 || d.e.r >= _) {
    if (t.WTF)
      throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    d.e.c = Math.min(d.e.c, 255), d.e.r = Math.min(d.e.c, _ - 1);
  }
  J(n, 2057, T0(r, 16, t)), J(n, 13, xr(1)), J(n, 12, xr(100)), J(n, 15, Je(!0)), J(n, 17, Je(!1)), J(n, 16, Qr(1e-3)), J(n, 95, Je(!0)), J(n, 42, Je(!1)), J(n, 43, Je(!1)), J(n, 130, xr(1)), J(n, 128, ic([0, 0])), J(n, 131, Je(!1)), J(n, 132, Je(!1)), l && h2(n, i["!cols"]), J(n, 512, ac(d, t)), l && (i["!links"] = []);
  for (var x = d.s.r; x <= d.e.r; ++x) {
    h = Xe(x);
    for (var m = d.s.c; m <= d.e.c; ++m) {
      x === d.s.r && (u[m] = ze(m)), c = u[m] + h;
      var O = o ? (i[x] || [])[m] : i[c];
      O && (x2(n, O, x, m, t), l && O.l && i["!links"].push([c, O.l]));
    }
  }
  var A = f.CodeName || f.name || a;
  return l && J(n, 574, Qo((s.Views || [])[0])), l && (i["!merges"] || []).length && J(n, 229, cc(i["!merges"])), l && u2(n, i), J(n, 442, Hi(A)), l && o2(n, i), J(
    n,
    10
    /* EOF */
  ), n.end();
}
function p2(e, t, r) {
  var n = Qe(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, o = r.biff == 5;
  if (J(n, 2057, T0(e, 5, r)), r.bookType == "xla" && J(
    n,
    135
    /* Addin */
  ), J(n, 225, f ? xr(1200) : null), J(n, 193, Ho(2)), o && J(
    n,
    191
    /* ToolbarHdr */
  ), o && J(
    n,
    192
    /* ToolbarEnd */
  ), J(
    n,
    226
    /* InterfaceEnd */
  ), J(n, 92, Yo("SheetJS", r)), J(n, 66, xr(f ? 1200 : 1252)), f && J(n, 353, xr(0)), f && J(
    n,
    448
    /* Excel9File */
  ), J(n, 317, vc(e.SheetNames.length)), f && e.vbaraw && J(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    J(n, 442, Hi(l));
  }
  J(n, 156, xr(17)), J(n, 25, Je(!1)), J(n, 18, Je(!1)), J(n, 19, xr(0)), f && J(n, 431, Je(!1)), f && J(n, 444, xr(0)), J(n, 61, Zo()), J(n, 64, Je(!1)), J(n, 141, xr(0)), J(n, 34, Je(Tx(e) == "true")), J(n, 14, Je(!0)), f && J(n, 439, Je(!1)), J(n, 218, xr(0)), f2(n, e, r), l2(n, e.SSF, r), c2(n, r), f && J(n, 352, Je(!1));
  var c = n.end(), h = Qe();
  f && J(h, 140, xc()), f && r.Strings && r2(h, 252, Jo(r.Strings)), J(
    h,
    10
    /* EOF */
  );
  var u = h.end(), d = Qe(), _ = 0, x = 0;
  for (x = 0; x < e.SheetNames.length; ++x)
    _ += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[x].length;
  var m = c.length + _ + u.length;
  for (x = 0; x < e.SheetNames.length; ++x) {
    var O = i[x] || {};
    J(d, 133, qo({ pos: m, hs: O.Hidden || 0, dt: 0, name: e.SheetNames[x] }, r)), m += t[x].length;
  }
  var A = d.end();
  if (_ != A.length)
    throw new Error("BS8 " + _ + " != " + A.length);
  var y = [];
  return c.length && y.push(c), A.length && y.push(A), u.length && y.push(u), Ve(y);
}
function v2(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = rr(Oe)), e && e.SSF && (On(), Cn(e.SSF), r.revssf = Dn(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, F0(r), r.cellXfs = [], jr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a)
    n[n.length] = d2(a, r, e);
  return n.unshift(p2(e, n, r)), Ve(n);
}
function xs(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = lr(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return v2(e, t);
    case 4:
    case 3:
    case 2:
      return s2(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function m2(e, t, r, n) {
  for (var a = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
    for (var f = 0, o = 0, l = 0; l < a.length; ++l)
      if (!(a[l].s.r > r || a[l].s.c > s) && !(a[l].e.r < r || a[l].e.c < s)) {
        if (a[l].s.r < r || a[l].s.c < s) {
          f = -1;
          break;
        }
        f = a[l].e.r - a[l].s.r + 1, o = a[l].e.c - a[l].s.c + 1;
        break;
      }
    if (!(f < 0)) {
      var c = _e({ r, c: s }), h = n.dense ? (e[r] || [])[s] : e[c], u = h && h.v != null && (h.h || zl(h.w || (Nr(h), h.w) || "")) || "", d = {};
      f > 1 && (d.rowspan = f), o > 1 && (d.colspan = o), n.editable ? u = '<span contenteditable="true">' + u + "</span>" : h && (d["data-t"] = h && h.t || "z", h.v != null && (d["data-v"] = h.v), h.z != null && (d["data-z"] = h.z), h.l && (h.l.Target || "#").charAt(0) != "#" && (u = '<a href="' + h.l.Target + '">' + u + "</a>")), d.id = (n.id || "sjs") + "-" + c, i.push(q("td", u, d));
    }
  }
  var _ = "<tr>";
  return _ + i.join("") + "</tr>";
}
var g2 = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', _2 = "</body></html>";
function T2(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function ds(e, t) {
  var r = t || {}, n = r.header != null ? r.header : g2, a = r.footer != null ? r.footer : _2, i = [n], s = lr(e["!ref"]);
  r.dense = Array.isArray(e), i.push(T2(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f)
    i.push(m2(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function ps(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number")
      a = n.origin;
    else {
      var s = typeof n.origin == "string" ? Me(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), o = Math.min(n.sheetRows || 1e7, f.length), l = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = lr(e["!ref"]);
    l.s.r = Math.min(l.s.r, c.s.r), l.s.c = Math.min(l.s.c, c.s.c), l.e.r = Math.max(l.e.r, c.e.r), l.e.c = Math.max(l.e.c, c.e.c), a == -1 && (l.e.r = a = c.e.r + 1);
  }
  var h = [], u = 0, d = e["!rows"] || (e["!rows"] = []), _ = 0, x = 0, m = 0, O = 0, A = 0, y = 0;
  for (e["!cols"] || (e["!cols"] = []); _ < f.length && x < o; ++_) {
    var N = f[_];
    if (Oa(N)) {
      if (n.display)
        continue;
      d[x] = { hidden: !0 };
    }
    var j = N.children;
    for (m = O = 0; m < j.length; ++m) {
      var ee = j[m];
      if (!(n.display && Oa(ee))) {
        var D = ee.hasAttribute("data-v") ? ee.getAttribute("data-v") : ee.hasAttribute("v") ? ee.getAttribute("v") : Jl(ee.innerHTML), U = ee.getAttribute("data-z") || ee.getAttribute("z");
        for (u = 0; u < h.length; ++u) {
          var B = h[u];
          B.s.c == O + i && B.s.r < x + a && x + a <= B.e.r && (O = B.e.c + 1 - i, u = -1);
        }
        y = +ee.getAttribute("colspan") || 1, ((A = +ee.getAttribute("rowspan") || 1) > 1 || y > 1) && h.push({ s: { r: x + a, c: O + i }, e: { r: x + a + (A || 1) - 1, c: O + i + (y || 1) - 1 } });
        var V = { t: "s", v: D }, G = ee.getAttribute("data-t") || ee.getAttribute("t") || "";
        D != null && (D.length == 0 ? V.t = G || "z" : n.raw || D.trim().length == 0 || G == "s" || (D === "TRUE" ? V = { t: "b", v: !0 } : D === "FALSE" ? V = { t: "b", v: !1 } : isNaN(Rr(D)) ? isNaN(Ut(D).getDate()) || (V = { t: "d", v: Ze(D) }, n.cellDates || (V = { t: "n", v: er(V.v) }), V.z = n.dateNF || Oe[14]) : V = { t: "n", v: Rr(D) })), V.z === void 0 && U != null && (V.z = U);
        var K = "", te = ee.getElementsByTagName("A");
        if (te && te.length)
          for (var Te = 0; Te < te.length && !(te[Te].hasAttribute("href") && (K = te[Te].getAttribute("href"), K.charAt(0) != "#")); ++Te)
            ;
        K && K.charAt(0) != "#" && (V.l = { Target: K }), n.dense ? (e[x + a] || (e[x + a] = []), e[x + a][O + i] = V) : e[_e({ c: O + i, r: x + a })] = V, l.e.c < O + i && (l.e.c = O + i), O += y;
      }
    }
    ++x;
  }
  return h.length && (e["!merges"] = (e["!merges"] || []).concat(h)), l.e.r = Math.max(l.e.r, x - 1 + a), e["!ref"] = ke(l), x >= o && (e["!fullref"] = ke((l.e.r = f.length - _ + x - 1 + a, l))), e;
}
function vs(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return ps(n, e, t);
}
function E2(e, t) {
  return rt(vs(e, t), t);
}
function Oa(e) {
  var t = "", r = w2(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function w2(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var S2 = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + Ht({
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
    return Ie + t;
  };
}(), Da = /* @__PURE__ */ function() {
  var e = function(i) {
    return ge(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var o = [];
    o.push('      <table:table table:name="' + ge(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var l = 0, c = 0, h = lr(i["!ref"] || "A1"), u = i["!merges"] || [], d = 0, _ = Array.isArray(i);
    if (i["!cols"])
      for (c = 0; c <= h.e.c; ++c)
        o.push("        <table:table-column" + (i["!cols"][c] ? ' table:style-name="co' + i["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var x = "", m = i["!rows"] || [];
    for (l = 0; l < h.s.r; ++l)
      x = m[l] ? ' table:style-name="ro' + m[l].ods + '"' : "", o.push("        <table:table-row" + x + `></table:table-row>
`);
    for (; l <= h.e.r; ++l) {
      for (x = m[l] ? ' table:style-name="ro' + m[l].ods + '"' : "", o.push("        <table:table-row" + x + `>
`), c = 0; c < h.s.c; ++c)
        o.push(t);
      for (; c <= h.e.c; ++c) {
        var O = !1, A = {}, y = "";
        for (d = 0; d != u.length; ++d)
          if (!(u[d].s.c > c) && !(u[d].s.r > l) && !(u[d].e.c < c) && !(u[d].e.r < l)) {
            (u[d].s.c != c || u[d].s.r != l) && (O = !0), A["table:number-columns-spanned"] = u[d].e.c - u[d].s.c + 1, A["table:number-rows-spanned"] = u[d].e.r - u[d].s.r + 1;
            break;
          }
        if (O) {
          o.push(r);
          continue;
        }
        var N = _e({ r: l, c }), j = _ ? (i[l] || [])[c] : i[N];
        if (j && j.f && (A["table:formula"] = ge(G1(j.f)), j.F && j.F.slice(0, N.length) == N)) {
          var ee = lr(j.F);
          A["table:number-matrix-columns-spanned"] = ee.e.c - ee.s.c + 1, A["table:number-matrix-rows-spanned"] = ee.e.r - ee.s.r + 1;
        }
        if (!j) {
          o.push(t);
          continue;
        }
        switch (j.t) {
          case "b":
            y = j.v ? "TRUE" : "FALSE", A["office:value-type"] = "boolean", A["office:boolean-value"] = j.v ? "true" : "false";
            break;
          case "n":
            y = j.w || String(j.v || 0), A["office:value-type"] = "float", A["office:value"] = j.v || 0;
            break;
          case "s":
          case "str":
            y = j.v == null ? "" : j.v, A["office:value-type"] = "string";
            break;
          case "d":
            y = j.w || Ze(j.v).toISOString(), A["office:value-type"] = "date", A["office:date-value"] = Ze(j.v).toISOString(), A["table:style-name"] = "ce1";
            break;
          default:
            o.push(t);
            continue;
        }
        var D = e(y);
        if (j.l && j.l.Target) {
          var U = j.l.Target;
          U = U.charAt(0) == "#" ? "#" + X1(U.slice(1)) : U, U.charAt(0) != "#" && !U.match(/^\w+:/) && (U = "../" + U), D = q("text:a", D, { "xlink:href": U.replace(/&/g, "&amp;") });
        }
        o.push("          " + q("table:table-cell", q("text:p", D, {}), A) + `
`);
      }
      o.push(`        </table:table-row>
`);
    }
    return o.push(`      </table:table>
`), o.join("");
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
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!cols"]) {
        for (var c = 0; c < l["!cols"].length; ++c)
          if (l["!cols"][c]) {
            var h = l["!cols"][c];
            if (h.width == null && h.wpx == null && h.wch == null)
              continue;
            E0(h), h.ods = f;
            var u = l["!cols"][c].wpx + "px";
            i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + u + `"/>
`), i.push(`  </style:style>
`), ++f;
          }
      }
    });
    var o = 0;
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!rows"]) {
        for (var c = 0; c < l["!rows"].length; ++c)
          if (l["!rows"][c]) {
            l["!rows"][c].ods = o;
            var h = l["!rows"][c].hpx + "px";
            i.push('  <style:style style:name="ro' + o + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + h + `"/>
`), i.push(`  </style:style>
`), ++o;
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
    var o = [Ie], l = Ht({
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
    }), c = Ht({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (o.push("<office:document" + l + c + `>
`), o.push(ki().replace(/office:document-meta/g, "office:meta"))) : o.push("<office:document-content" + l + `>
`), a(o, s), o.push(`  <office:body>
`), o.push(`    <office:spreadsheet>
`);
    for (var h = 0; h != s.SheetNames.length; ++h)
      o.push(n(s.Sheets[s.SheetNames[h]], s, h));
    return o.push(`    </office:spreadsheet>
`), o.push(`  </office:body>
`), f.bookType == "fods" ? o.push("</office:document>") : o.push("</office:document-content>"), o.join("");
  };
}();
function ms(e, t) {
  if (t.bookType == "fods")
    return Da(e, t);
  var r = c0(), n = "", a = [], i = [];
  return n = "mimetype", ce(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", ce(r, n, Da(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", ce(r, n, S2(e, t)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", ce(r, n, Ie + ki(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", ce(r, n, Lo(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", ce(r, n, No(
    a
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function Sn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function A2(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : gr(Or(e));
}
function y2(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function Xr(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function F2(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function Wt(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function ve(e) {
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
function pt(e) {
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
    var n = r[0], a = Wt(e, r), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, f;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var o = r[0]; e[r[0]++] >= 128; )
            ;
          f = e.slice(o, r[0]);
        }
        break;
      case 5:
        s = 4, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 1:
        s = 8, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 2:
        s = Wt(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var l = { data: f, type: i };
    t[a] == null ? t[a] = [l] : t[a].push(l);
  }
  return t;
}
function He(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      a.data && (t.push(ve(n * 8 + a.type)), a.type == 2 && t.push(ve(a.data.length)), t.push(a.data));
    });
  }), Xr(t);
}
function vr(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = Wt(e, n), i = Ne(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: pt(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var o = Ne(f.data), l = pt(o[3][0].data);
      s.messages.push({
        meta: o,
        data: e.slice(n[0], n[0] + l)
      }), n[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = pt(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function lt(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: ve(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: ve(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: ve(s.data.length) }], n[2].push({ data: He(s.meta), type: 2 });
    });
    var i = He(n);
    t.push(ve(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), Xr(t);
}
function C2(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = Wt(t, r), a = []; r[0] < t.length; ) {
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
      var o = 0, l = 0;
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, o = (t[r[0]++] & 224) << 3, o |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (o = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (o = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [Xr(a)], o == 0)
        throw new Error("Invalid offset 0");
      if (o > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= o)
        for (a.push(a[0].slice(-o)), l -= o; l >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), l -= a[a.length - 1].length;
      a.push(a[0].slice(-o, -o + l));
    }
  }
  var c = Xr(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function mr(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(C2(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return Xr(t);
}
function ot(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = ve(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return Xr(t);
}
function zn(e, t) {
  var r = new Uint8Array(32), n = Sn(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, F2(r, a, e.v), i |= 1, a += 16;
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
function Kn(e, t) {
  var r = new Uint8Array(32), n = Sn(r), a = 12, i = 0;
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
function Lr(e) {
  var t = Ne(e);
  return Wt(t[1][0].data);
}
function O2(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && pt(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var o = 0, l = Sn(e[7][0].data), c = 0, h = [], u = Sn(e[4][0].data), d = 0, _ = [], x = 0; x < t.length; ++x) {
    if (t[x] == null) {
      l.setUint16(x * 2, 65535, !0), u.setUint16(x * 2, 65535);
      continue;
    }
    l.setUint16(x * 2, c, !0), u.setUint16(x * 2, d, !0);
    var m, O;
    switch (typeof t[x]) {
      case "string":
        m = zn({ t: "s", v: t[x] }, r), O = Kn({ t: "s", v: t[x] }, r);
        break;
      case "number":
        m = zn({ t: "n", v: t[x] }, r), O = Kn({ t: "n", v: t[x] }, r);
        break;
      case "boolean":
        m = zn({ t: "b", v: t[x] }, r), O = Kn({ t: "b", v: t[x] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[x]);
    }
    h.push(m), c += m.length, _.push(O), d += O.length, ++o;
  }
  for (e[2][0].data = ve(o); x < e[7][0].data.length / 2; ++x)
    l.setUint16(x * 2, 65535, !0), u.setUint16(x * 2, 65535, !0);
  return e[6][0].data = Xr(h), e[3][0].data = Xr(_), o;
}
function D2(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = lr(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(ke(n)));
  var i = An(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(L) {
    return L.forEach(function(C) {
      typeof C == "string" && s.push(C);
    });
  });
  var f = {}, o = [], l = Ee.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(L, C) {
    return [L, l.FullPaths[C]];
  }).forEach(function(L) {
    var C = L[0], F = L[1];
    if (C.type == 2 && C.name.match(/\.iwa/)) {
      var W = C.content, se = mr(W), fe = vr(se);
      fe.forEach(function(ie) {
        o.push(ie.id), f[ie.id] = { deps: [], location: F, type: pt(ie.messages[0].meta[1][0].data) };
      });
    }
  }), o.sort(function(L, C) {
    return L - C;
  });
  var c = o.filter(function(L) {
    return L > 1;
  }).map(function(L) {
    return [L, ve(L)];
  });
  l.FileIndex.map(function(L, C) {
    return [L, l.FullPaths[C]];
  }).forEach(function(L) {
    var C = L[0];
    if (L[1], !!C.name.match(/\.iwa/)) {
      var F = vr(mr(C.content));
      F.forEach(function(W) {
        W.messages.forEach(function(se) {
          c.forEach(function(fe) {
            W.messages.some(function(ie) {
              return pt(ie.meta[1][0].data) != 11006 && y2(ie.data, fe[1]);
            }) && f[fe[0]].deps.push(W.id);
          });
        });
      });
    }
  });
  for (var h = Ee.find(l, f[1].location), u = vr(mr(h.content)), d, _ = 0; _ < u.length; ++_) {
    var x = u[_];
    x.id == 1 && (d = x);
  }
  var m = Lr(Ne(d.messages[0].data)[1][0].data);
  for (h = Ee.find(l, f[m].location), u = vr(mr(h.content)), _ = 0; _ < u.length; ++_)
    x = u[_], x.id == m && (d = x);
  for (m = Lr(Ne(d.messages[0].data)[2][0].data), h = Ee.find(l, f[m].location), u = vr(mr(h.content)), _ = 0; _ < u.length; ++_)
    x = u[_], x.id == m && (d = x);
  for (m = Lr(Ne(d.messages[0].data)[2][0].data), h = Ee.find(l, f[m].location), u = vr(mr(h.content)), _ = 0; _ < u.length; ++_)
    x = u[_], x.id == m && (d = x);
  var O = Ne(d.messages[0].data);
  {
    O[6][0].data = ve(n.e.r + 1), O[7][0].data = ve(n.e.c + 1);
    var A = Lr(O[46][0].data), y = Ee.find(l, f[A].location), N = vr(mr(y.content));
    {
      for (var j = 0; j < N.length && N[j].id != A; ++j)
        ;
      if (N[j].id != A)
        throw "Bad ColumnRowUIDMapArchive";
      var ee = Ne(N[j].messages[0].data);
      ee[1] = [], ee[2] = [], ee[3] = [];
      for (var D = 0; D <= n.e.c; ++D) {
        var U = [];
        U[1] = U[2] = [{ type: 0, data: ve(D + 420690) }], ee[1].push({ type: 2, data: He(U) }), ee[2].push({ type: 0, data: ve(D) }), ee[3].push({ type: 0, data: ve(D) });
      }
      ee[4] = [], ee[5] = [], ee[6] = [];
      for (var B = 0; B <= n.e.r; ++B)
        U = [], U[1] = U[2] = [{ type: 0, data: ve(B + 726270) }], ee[4].push({ type: 2, data: He(U) }), ee[5].push({ type: 0, data: ve(B) }), ee[6].push({ type: 0, data: ve(B) });
      N[j].messages[0].data = He(ee);
    }
    y.content = ot(lt(N)), y.size = y.content.length, delete O[46];
    var V = Ne(O[4][0].data);
    {
      V[7][0].data = ve(n.e.r + 1);
      var G = Ne(V[1][0].data), K = Lr(G[2][0].data);
      y = Ee.find(l, f[K].location), N = vr(mr(y.content));
      {
        if (N[0].id != K)
          throw "Bad HeaderStorageBucket";
        var te = Ne(N[0].messages[0].data);
        for (B = 0; B < i.length; ++B) {
          var Te = Ne(te[2][0].data);
          Te[1][0].data = ve(B), Te[4][0].data = ve(i[B].length), te[2][B] = { type: te[2][0].type, data: He(Te) };
        }
        N[0].messages[0].data = He(te);
      }
      y.content = ot(lt(N)), y.size = y.content.length;
      var oe = Lr(V[2][0].data);
      y = Ee.find(l, f[oe].location), N = vr(mr(y.content));
      {
        if (N[0].id != oe)
          throw "Bad HeaderStorageBucket";
        for (te = Ne(N[0].messages[0].data), D = 0; D <= n.e.c; ++D)
          Te = Ne(te[2][0].data), Te[1][0].data = ve(D), Te[4][0].data = ve(n.e.r + 1), te[2][D] = { type: te[2][0].type, data: He(Te) };
        N[0].messages[0].data = He(te);
      }
      y.content = ot(lt(N)), y.size = y.content.length;
      var Ue = Lr(V[4][0].data);
      (function() {
        for (var L = Ee.find(l, f[Ue].location), C = vr(mr(L.content)), F, W = 0; W < C.length; ++W) {
          var se = C[W];
          se.id == Ue && (F = se);
        }
        var fe = Ne(F.messages[0].data);
        {
          fe[3] = [];
          var ie = [];
          s.forEach(function(he, Ye) {
            ie[1] = [{ type: 0, data: ve(Ye) }], ie[2] = [{ type: 0, data: ve(1) }], ie[3] = [{ type: 2, data: A2(he) }], fe[3].push({ type: 2, data: He(ie) });
          });
        }
        F.messages[0].data = He(fe);
        var Q = lt(C), we = ot(Q);
        L.content = we, L.size = L.content.length;
      })();
      var De = Ne(V[3][0].data);
      {
        var pr = De[1][0];
        delete De[2];
        var Pe = Ne(pr.data);
        {
          var cr = Lr(Pe[2][0].data);
          (function() {
            for (var L = Ee.find(l, f[cr].location), C = vr(mr(L.content)), F, W = 0; W < C.length; ++W) {
              var se = C[W];
              se.id == cr && (F = se);
            }
            var fe = Ne(F.messages[0].data);
            {
              delete fe[6], delete De[7];
              var ie = new Uint8Array(fe[5][0].data);
              fe[5] = [];
              for (var Q = 0, we = 0; we <= n.e.r; ++we) {
                var he = Ne(ie);
                Q += O2(he, i[we], s), he[1][0].data = ve(we), fe[5].push({ data: He(he), type: 2 });
              }
              fe[1] = [{ type: 0, data: ve(n.e.c + 1) }], fe[2] = [{ type: 0, data: ve(n.e.r + 1) }], fe[3] = [{ type: 0, data: ve(Q) }], fe[4] = [{ type: 0, data: ve(n.e.r + 1) }];
            }
            F.messages[0].data = He(fe);
            var Ye = lt(C), pe = ot(Ye);
            L.content = pe, L.size = L.content.length;
          })();
        }
        pr.data = He(Pe);
      }
      V[3][0].data = He(De);
    }
    O[4][0].data = He(V);
  }
  d.messages[0].data = He(O);
  var tr = lt(u), S = ot(tr);
  return h.content = S, h.size = h.content.length, l;
}
function R2(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function F0(e) {
  R2([
    ["cellDates", !1],
    /* write date cells with type `d` */
    ["bookSST", !1],
    /* Generate Shared String Table */
    ["bookType", "xlsx"],
    /* Type of workbook (xlsx/m/b) */
    ["compression", !1],
    /* Use file compression */
    ["WTF", !1]
    /* WTF mode (throws errors) */
  ])(e);
}
function k2(e, t) {
  return t.bookType == "ods" ? ms(e, t) : t.bookType == "numbers" ? D2(e, t) : t.bookType == "xlsb" ? I2(e, t) : N2(e, t);
}
function I2(e, t) {
  ut = 1024, e && !e.SSF && (e.SSF = rr(Oe)), e && e.SSF && (On(), Cn(e.SSF), t.revssf = Dn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Lt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = Qi.indexOf(t.bookType) > -1, a = Oi();
  F0(t = t || {});
  var i = c0(), s = "", f = 0;
  if (t.cellXfs = [], jr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ce(i, s, Ii(e.Props, t)), a.coreprops.push(s), me(t.rels, 2, s, xe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var o = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
      e.Props.SheetNames = o;
    }
  for (e.Props.Worksheets = e.Props.SheetNames.length, ce(i, s, Pi(e.Props)), a.extprops.push(s), me(t.rels, 3, s, xe.EXT_PROPS), e.Custprops !== e.Props && je(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ce(i, s, Li(e.Custprops)), a.custprops.push(s), me(t.rels, 4, s, xe.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var c = { "!id": {} }, h = e.Sheets[e.SheetNames[f - 1]], u = (h || {})["!type"] || "sheet";
    switch (u) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ce(i, s, Lx(f - 1, s, t, e, c)), a.sheets.push(s), me(t.wbrels, -1, "worksheets/sheet" + f + "." + r, xe.WS[0]);
    }
    if (h) {
      var d = h["!comments"], _ = !1, x = "";
      d && d.length > 0 && (x = "xl/comments" + f + "." + r, ce(i, x, bx(d, x)), a.comments.push(x), me(c, -1, "../comments" + f + "." + r, xe.CMNT), _ = !0), h["!legacy"] && _ && ce(i, "xl/drawings/vmlDrawing" + f + ".vml", Ji(f, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    c["!id"].rId1 && ce(i, Ri(s), xt(c));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ce(i, s, Mx(t.Strings, s, t)), a.strs.push(s), me(t.wbrels, -1, "sharedStrings." + r, xe.SST)), s = "xl/workbook." + r, ce(i, s, Px(e, s)), a.workbooks.push(s), me(t.rels, 1, s, xe.WB), s = "xl/theme/theme1.xml", ce(i, s, Yi(e.Themes, t)), a.themes.push(s), me(t.wbrels, -1, "theme/theme1.xml", xe.THEME), s = "xl/styles." + r, ce(i, s, Bx(e, s, t)), a.styles.push(s), me(t.wbrels, -1, "styles." + r, xe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ce(i, s, e.vbaraw), a.vba.push(s), me(t.wbrels, -1, "vbaProject.bin", xe.VBA)), s = "xl/metadata." + r, ce(i, s, Ux(s)), a.metadata.push(s), me(t.wbrels, -1, "metadata." + r, xe.XLMETA), ce(i, "[Content_Types].xml", Di(a, t)), ce(i, "_rels/.rels", xt(t.rels)), ce(i, "xl/_rels/workbook." + r + ".rels", xt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function N2(e, t) {
  ut = 1024, e && !e.SSF && (e.SSF = rr(Oe)), e && e.SSF && (On(), Cn(e.SSF), t.revssf = Dn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Lt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = Qi.indexOf(t.bookType) > -1, a = Oi();
  F0(t = t || {});
  var i = c0(), s = "", f = 0;
  if (t.cellXfs = [], jr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ce(i, s, Ii(e.Props, t)), a.coreprops.push(s), me(t.rels, 2, s, xe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var o = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
      e.Props.SheetNames = o;
    }
  e.Props.Worksheets = e.Props.SheetNames.length, ce(i, s, Pi(e.Props)), a.extprops.push(s), me(t.rels, 3, s, xe.EXT_PROPS), e.Custprops !== e.Props && je(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ce(i, s, Li(e.Custprops)), a.custprops.push(s), me(t.rels, 4, s, xe.CUST_PROPS));
  var c = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var h = { "!id": {} }, u = e.Sheets[e.SheetNames[f - 1]], d = (u || {})["!type"] || "sheet";
    switch (d) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ce(i, s, ls(f - 1, t, e, h)), a.sheets.push(s), me(t.wbrels, -1, "worksheets/sheet" + f + "." + r, xe.WS[0]);
    }
    if (u) {
      var _ = u["!comments"], x = !1, m = "";
      if (_ && _.length > 0) {
        var O = !1;
        _.forEach(function(A) {
          A[1].forEach(function(y) {
            y.T == !0 && (O = !0);
          });
        }), O && (m = "xl/threadedComments/threadedComment" + f + "." + r, ce(i, m, cu(_, c, t)), a.threadedcomments.push(m), me(h, -1, "../threadedComments/threadedComment" + f + "." + r, xe.TCMNT)), m = "xl/comments" + f + "." + r, ce(i, m, Zi(_)), a.comments.push(m), me(h, -1, "../comments" + f + "." + r, xe.CMNT), x = !0;
      }
      u["!legacy"] && x && ce(i, "xl/drawings/vmlDrawing" + f + ".vml", Ji(f, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    h["!id"].rId1 && ce(i, Ri(s), xt(h));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ce(i, s, Gi(t.Strings, t)), a.strs.push(s), me(t.wbrels, -1, "sharedStrings." + r, xe.SST)), s = "xl/workbook." + r, ce(i, s, us(e)), a.workbooks.push(s), me(t.rels, 1, s, xe.WB), s = "xl/theme/theme1.xml", ce(i, s, Yi(e.Themes, t)), a.themes.push(s), me(t.wbrels, -1, "theme/theme1.xml", xe.THEME), s = "xl/styles." + r, ce(i, s, zi(e, t)), a.styles.push(s), me(t.wbrels, -1, "styles." + r, xe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ce(i, s, e.vbaraw), a.vba.push(s), me(t.wbrels, -1, "vbaProject.bin", xe.VBA)), s = "xl/metadata." + r, ce(i, s, qi()), a.metadata.push(s), me(t.wbrels, -1, "metadata." + r, xe.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", ce(i, s, uu(c)), a.people.push(s), me(t.wbrels, -1, "persons/person.xml", xe.PEOPLE)), ce(i, "[Content_Types].xml", Di(a, t)), ce(i, "_rels/.rels", xt(t.rels)), ce(i, "xl/_rels/workbook." + r + ".rels", xt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function P2(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Ir(e.slice(0, 12));
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
function gs(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return jt(t.file, Ee.write(e, { type: de ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return Ee.write(e, t);
}
function L2(e, t) {
  var r = rr(t || {}), n = k2(e, r);
  return B2(n, r);
}
function B2(e, t) {
  var r = {}, n = de ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
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
  var a = e.FullPaths ? Ee.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64")
      return a;
    a = new Uint8Array(Fn(a));
  }
  return t.password && typeof encrypt_agile < "u" ? gs(encrypt_agile(a, t.password), t) : t.type === "file" ? jt(t.file, a) : t.type == "string" ? kt(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function M2(e, t) {
  var r = t || {}, n = Qx(e, r);
  return gs(n, r);
}
function Sr(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return bt(Or(n));
    case "binary":
      return Or(n);
    case "string":
      return e;
    case "file":
      return jt(t.file, n, "utf8");
    case "buffer":
      return de ? Pr(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Sr(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function b2(e, t) {
  switch (t.type) {
    case "base64":
      return bt(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return jt(t.file, e, "binary");
    case "buffer":
      return de ? Pr(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function sn(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n)
        r += String.fromCharCode(e[n]);
      return t.type == "base64" ? bt(r) : t.type == "string" ? kt(r) : r;
    case "file":
      return jt(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function _s(e, t) {
  cl(), Sx(e);
  var r = rr(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = _s(e, r);
    return r.type = "array", Fn(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Sr(Jx(e, r), r);
    case "slk":
    case "sylk":
      return Sr(Tc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return Sr(ds(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return b2(Ts(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return Sr(C0(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return Sr(Ec.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return sn(_c.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return Sr(wc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return Sr(Dc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return Sr(Vi.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return Sr(ms(e, r), r);
    case "wk1":
      return sn(wa.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return sn(wa.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), sn(xs(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), M2(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return L2(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function U2(e, t, r, n, a, i, s, f) {
  var o = Xe(r), l = f.defval, c = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), h = !0, u = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty)
      try {
        Object.defineProperty(u, "__rowNum__", { value: r, enumerable: !1 });
      } catch {
        u.__rowNum__ = r;
      }
    else
      u.__rowNum__ = r;
  if (!s || e[r])
    for (var d = t.s.c; d <= t.e.c; ++d) {
      var _ = s ? e[r][d] : e[n[d] + o];
      if (_ === void 0 || _.t === void 0) {
        if (l === void 0)
          continue;
        i[d] != null && (u[i[d]] = l);
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
      if (i[d] != null) {
        if (x == null)
          if (_.t == "e" && x === null)
            u[i[d]] = null;
          else if (l !== void 0)
            u[i[d]] = l;
          else if (c && x === null)
            u[i[d]] = null;
          else
            continue;
        else
          u[i[d]] = c && (_.t !== "n" || _.t === "n" && f.rawNumbers !== !1) ? x : Nr(_, x, f);
        x != null && (h = !1);
      }
    }
  return { row: u, isempty: h };
}
function An(e, t) {
  if (e == null || e["!ref"] == null)
    return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", o = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, c = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? n = 1 : l.header === "A" ? n = 2 : Array.isArray(l.header) ? n = 3 : l.header == null && (n = 0), typeof c) {
    case "string":
      o = Se(c);
      break;
    case "number":
      o = Se(e["!ref"]), o.s.r = c;
      break;
    default:
      o = c;
  }
  n > 0 && (a = 0);
  var h = Xe(o.s.r), u = [], d = [], _ = 0, x = 0, m = Array.isArray(e), O = o.s.r, A = 0, y = {};
  m && !e[O] && (e[O] = []);
  var N = l.skipHidden && e["!cols"] || [], j = l.skipHidden && e["!rows"] || [];
  for (A = o.s.c; A <= o.e.c; ++A)
    if (!(N[A] || {}).hidden)
      switch (u[A] = ze(A), r = m ? e[O][A] : e[u[A] + h], n) {
        case 1:
          i[A] = A - o.s.c;
          break;
        case 2:
          i[A] = u[A];
          break;
        case 3:
          i[A] = l.header[A - o.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Nr(r, null, l), x = y[s] || 0, !x)
            y[s] = 1;
          else {
            do
              f = s + "_" + x++;
            while (y[f]);
            y[s] = x, y[f] = 1;
          }
          i[A] = f;
      }
  for (O = o.s.r + a; O <= o.e.r; ++O)
    if (!(j[O] || {}).hidden) {
      var ee = U2(e, o, O, u, n, i, m, l);
      (ee.isempty === !1 || (n === 1 ? l.blankrows !== !1 : l.blankrows)) && (d[_++] = ee.row);
    }
  return d.length = _, d;
}
var Ra = /"/g;
function H2(e, t, r, n, a, i, s, f) {
  for (var o = !0, l = [], c = "", h = Xe(r), u = t.s.c; u <= t.e.c; ++u)
    if (n[u]) {
      var d = f.dense ? (e[r] || [])[u] : e[n[u] + h];
      if (d == null)
        c = "";
      else if (d.v != null) {
        o = !1, c = "" + (f.rawNumbers && d.t == "n" ? d.v : Nr(d, null, f));
        for (var _ = 0, x = 0; _ !== c.length; ++_)
          if ((x = c.charCodeAt(_)) === a || x === i || x === 34 || f.forceQuotes) {
            c = '"' + c.replace(Ra, '""') + '"';
            break;
          }
        c == "ID" && (c = '"ID"');
      } else
        d.f != null && !d.F ? (o = !1, c = "=" + d.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(Ra, '""') + '"')) : c = "";
      l.push(c);
    }
  return f.blankrows === !1 && o ? null : l.join(s);
}
function C0(e, t) {
  var r = [], n = t ?? {};
  if (e == null || e["!ref"] == null)
    return "";
  var a = Se(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, o = f.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", h = [];
  n.dense = Array.isArray(e);
  for (var u = n.skipHidden && e["!cols"] || [], d = n.skipHidden && e["!rows"] || [], _ = a.s.c; _ <= a.e.c; ++_)
    (u[_] || {}).hidden || (h[_] = ze(_));
  for (var x = 0, m = a.s.r; m <= a.e.r; ++m)
    (d[m] || {}).hidden || (c = H2(e, a, m, h, s, o, i, n), c != null && (n.strip && (c = c.replace(l, "")), (c || n.blankrows !== !1) && r.push((x++ ? f : "") + c)));
  return delete n.dense, r.join("");
}
function Ts(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = C0(e, t);
  return r;
}
function W2(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null)
    return [];
  var a = Se(e["!ref"]), i = "", s = [], f, o = [], l = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f)
    s[f] = ze(f);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = Xe(c), f = a.s.c; f <= a.e.c; ++f)
      if (t = s[f] + i, r = l ? (e[c] || [])[f] : e[t], n = "", r !== void 0) {
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
        o[o.length] = t + "=" + n;
      }
  return o;
}
function Es(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var o = typeof n.origin == "string" ? Me(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
  var l, c = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var h = Se(i["!ref"]);
    c.e.c = Math.max(c.e.c, h.e.c), c.e.r = Math.max(c.e.r, h.e.r), s == -1 && (s = h.e.r + 1, c.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = t.length - 1 + a);
  var u = n.header || [], d = 0;
  t.forEach(function(x, m) {
    je(x).forEach(function(O) {
      (d = u.indexOf(O)) == -1 && (u[d = u.length] = O);
      var A = x[O], y = "z", N = "", j = _e({ c: f + d, r: s + m + a });
      l = Vt(i, j), A && typeof A == "object" && !(A instanceof Date) ? i[j] = A : (typeof A == "number" ? y = "n" : typeof A == "boolean" ? y = "b" : typeof A == "string" ? y = "s" : A instanceof Date ? (y = "d", n.cellDates || (y = "n", A = er(A)), N = n.dateNF || Oe[14]) : A === null && n.nullError && (y = "e", A = 0), l ? (l.t = y, l.v = A, delete l.w, delete l.R, N && (l.z = N)) : i[j] = l = { t: y, v: A }, N && (l.z = N));
    });
  }), c.e.c = Math.max(c.e.c, f + u.length - 1);
  var _ = Xe(s);
  if (a)
    for (d = 0; d < u.length; ++d)
      i[ze(d + f) + _] = { t: "s", v: u[d] };
  return i["!ref"] = ke(c), i;
}
function V2(e, t) {
  return Es(null, e, t);
}
function Vt(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = Me(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Vt(e, _e(t)) : Vt(e, _e({ r: t, c: r || 0 }));
}
function G2(e, t) {
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
function X2() {
  return { SheetNames: [], Sheets: {} };
}
function j2(e, t, r, n) {
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
  if (cs(r), e.SheetNames.indexOf(r) >= 0)
    throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function $2(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = G2(e, t);
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
function z2(e, t) {
  return e.z = t, e;
}
function ws(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function K2(e, t, r) {
  return ws(e, "#" + t, r);
}
function Y2(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function q2(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Se(t), i = typeof t == "string" ? t : ke(t), s = a.s.r; s <= a.e.r; ++s)
    for (var f = a.s.c; f <= a.e.c; ++f) {
      var o = Vt(e, s, f);
      o.t = "n", o.F = i, delete o.v, s == a.s.r && f == a.s.c && (o.f = r, n && (o.D = !0));
    }
  return e;
}
var ka = {
  encode_col: ze,
  encode_row: Xe,
  encode_cell: _e,
  encode_range: ke,
  decode_col: v0,
  decode_row: p0,
  split_cell: uo,
  decode_cell: Me,
  decode_range: lr,
  format_cell: Nr,
  sheet_add_aoa: wi,
  sheet_add_json: Es,
  sheet_add_dom: ps,
  aoa_to_sheet: Et,
  json_to_sheet: V2,
  table_to_sheet: vs,
  table_to_book: E2,
  sheet_to_csv: C0,
  sheet_to_txt: Ts,
  sheet_to_json: An,
  sheet_to_html: ds,
  sheet_to_formulae: W2,
  sheet_to_row_object_array: An,
  sheet_get_cell: Vt,
  book_new: X2,
  book_append_sheet: j2,
  book_set_sheet_visibility: $2,
  cell_set_number_format: z2,
  cell_set_hyperlink: ws,
  cell_set_internal_link: K2,
  cell_add_comment: Y2,
  sheet_set_array_formula: q2,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function J2(e) {
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
      const s = ka.encode_cell({
        c: a,
        r: n
      });
      typeof i.v == "number" ? i.t = "n" : typeof i.v == "boolean" ? i.t = "b" : i.t = "s", t[s] = i;
    }
  return r.s.c < 1e7 && (t["!ref"] = ka.encode_range(r)), t;
}
class Z2 {
  constructor() {
    Un(this, "SheetNames", []);
    Un(this, "Sheets", {});
  }
}
const Q2 = (e) => {
  const t = new ArrayBuffer(e.length), r = new Uint8Array(t);
  for (let n = 0; n < e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}, ed = ({ header: e, data: t, filename: r }) => {
  t = fr(t), t.unshift(e);
  const n = "SheetJS", a = new Z2(), i = J2(t), s = t.map((l) => l.map((c) => c == null ? {
    wch: 10
  } : c.toString().charCodeAt(0) > 255 ? {
    wch: c.toString().length * 2
  } : {
    wch: c.toString().length
  }));
  let f = s[0];
  for (let l = 1; l < s.length; l++)
    for (let c = 0; c < s[l].length; c++)
      f[c].wch < s[l][c].wch && (f[c].wch = s[l][c].wch);
  i["!cols"] = f, a.SheetNames.push(n), a.Sheets[n] = i;
  const o = _s(a, {
    bookType: "xlsx",
    bookSST: !1,
    type: "binary"
  });
  Jn.saveAs(
    new Blob([Q2(o)], {
      type: "application/octet-stream"
    }),
    `${r}.xlsx`
  );
}, md = async ({ filename: e, tableHead: t, tableData: r }) => {
  const n = (o) => {
    let l = /<\/?.+?\/?>/g;
    return l.test(o) ? o.replace(l, "") : o;
  }, a = async (o, l) => {
    const c = [];
    for (const h of l) {
      const u = [], d = o.length;
      for (let _ = 0; _ < d; _++) {
        const x = o[_];
        let m = h[x.prop];
        if (x.render) {
          const O = x.render(h, _);
          O && Array.isArray(O.children) && O.children.length > 1 && O.children.forEach((A) => {
            A && typeof A.children == "string" && (A.children += `
`);
          }), m = await Va(O);
        }
        m = n(m), u.push(m);
      }
      c.push(u);
    }
    return c;
  }, i = t.filter((o) => !o.only_display), s = i.map((o) => o.label), f = df({
    lock: !0,
    text: "数据导出中...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  return new Promise((o) => {
    setTimeout(async () => {
      const l = await a(i, r);
      await ed({
        header: s,
        data: l,
        filename: e
      }), f.close(), qn.success("导出成功！"), o(!0);
    }, 500);
  });
}, gd = (e, t = 60, r = "获取验证码") => {
  const n = ue(t), a = ue(r), i = ue(), s = () => {
    n.value--, a.value = `${n.value} 秒后重试`, i.value = setInterval(() => {
      n.value > 0 ? (n.value--, a.value = `${n.value} 秒后重试`) : f();
    }, 1e3);
  }, f = () => {
    n.value = t, a.value = r, clearInterval(i.value);
  }, o = ue(!1), l = () => {
    o.value = !0;
  };
  return {
    getCode: () => {
      n.value === t && l();
    },
    tip: a,
    showSlider: o,
    pass: async () => {
      console.log("验证通过"), o.value = !1, await e(), s();
    },
    cancel: () => {
      console.log("取消验证"), o.value = !1;
    }
  };
}, _d = (e, t = 9999) => {
  var a;
  const r = document.createElement("div"), n = X(Uf, {
    onDestroy: () => {
      document.body.removeChild(r);
    },
    zIndex: t
  });
  Ys(n, r), document.body.appendChild(r), (a = n.component.exposed) == null || a.show(e);
}, rd = (e, t, r = "enter") => {
  e.key.toLocaleLowerCase() === r && (e.preventDefault(), t());
}, Td = (e, t) => {
  const r = ue(fr(e));
  return {
    query: r,
    reset: () => {
      r.value = fr(e), t();
    }
  };
}, Ed = (e) => {
  const t = ue(!1), r = ue(""), n = ue([]), a = async (s) => {
    s = s.trim();
    const f = await e(s);
    f && (n.value = f);
  }, i = ue(!1);
  return {
    loading: t,
    search: a,
    searchStr: r,
    options: n,
    init: i
  };
};
export {
  bf as YoungDateRange,
  cd as YoungDialog,
  Uf as YoungImageViewer,
  od as YoungPagination,
  dd as YoungRotateTip,
  xd as YoungSearchForm,
  Lf as YoungSelect,
  ld as YoungTable,
  pd as YoungTablePro,
  hd as YoungTimeRange,
  ud as YoungWeekday,
  W0 as useAutoLoad,
  md as useExport2Excel,
  vd as useFormMode,
  _d as useImagePreview,
  rd as useKeyUp,
  Td as useQuery,
  Ed as useRemoteSearch,
  gd as useVerifyCode
};
//# sourceMappingURL=index.es.js.map
