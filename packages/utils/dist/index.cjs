var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  HSBToRGB: () => HSBToRGB,
  HSLToRGB: () => HSLToRGB,
  RGBToHSB: () => RGBToHSB,
  RGBToHSL: () => RGBToHSL,
  RGBToHex: () => RGBToHex,
  YoungLocalStorage: () => YoungLocalStorage,
  YoungStorage: () => YoungStorage,
  deepClone: () => deepClone,
  disableScroll: () => disableScroll,
  enableScroll: () => enableScroll,
  encodedStrParse: () => encodedStrParse,
  exitFullscreen: () => exitFullscreen,
  extendHex: () => extendHex,
  fen2yuan: () => fen2yuan,
  fen2yuanWithCurrency: () => fen2yuanWithCurrency,
  formatCurrency: () => formatCurrency,
  formatDate: () => formatDate,
  formatUrl: () => formatUrl,
  getClientHeight: () => getClientHeight,
  getDateRange: () => getDateRange,
  getFingerprint: () => getFingerprint,
  hexToRGB: () => hexToRGB,
  idMasaike: () => idMasaike,
  isAndroid: () => isAndroid,
  isArray: () => isArray,
  isArrayBuffer: () => isArrayBuffer,
  isBoolean: () => isBoolean,
  isChinese: () => isChinese,
  isCurrencyStr: () => isCurrencyStr,
  isDate: () => isDate,
  isDecimal: () => isDecimal,
  isDisabledDate: () => isDisabledDate,
  isEmail: () => isEmail,
  isFunction: () => isFunction,
  isHttpUrl: () => isHttpUrl,
  isISODate: () => isISODate,
  isIdCard: () => isIdCard,
  isInteger: () => isInteger,
  isJsonStr: () => isJsonStr,
  isLandline: () => isLandline,
  isLetter: () => isLetter,
  isLicensePlate: () => isLicensePlate,
  isMacOS: () => isMacOS,
  isMap: () => isMap,
  isMobile: () => isMobile,
  isNull: () => isNull,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isRegExp: () => isRegExp,
  isSet: () => isSet,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isUndefined: () => isUndefined,
  isWeChat: () => isWeChat,
  isWeakMap: () => isWeakMap,
  isWeakSet: () => isWeakSet,
  isWebSocketUrl: () => isWebSocketUrl,
  isiOS: () => isiOS,
  lastMonthDay: () => lastMonthDay,
  md5: () => import_md5.default,
  nameMasaike: () => nameMasaike,
  nextDay: () => nextDay,
  polyfillNumber: () => polyfillNumber,
  randomHexColorCode: () => randomHexColorCode,
  randomId: () => randomId,
  randomUUID: () => randomUUID,
  recentDay: () => recentDay,
  recentMonth: () => recentMonth,
  safeJsonParse: () => safeJsonParse,
  scrollToBottom: () => scrollToBottom,
  scrollToTop: () => scrollToTop,
  secondsToTime: () => secondsToTime,
  shortcuts: () => shortcuts,
  sleep: () => sleep,
  smoothScroll: () => smoothScroll,
  telMasaike: () => telMasaike,
  thisMonth: () => thisMonth,
  thisMonthDay: () => thisMonthDay,
  timeToSeconds: () => timeToSeconds,
  toFullScreen: () => toFullScreen,
  toRGBArray: () => toRGBArray,
  toRGBObject: () => toRGBObject,
  ymdParse: () => ymdParse,
  yuan2fen: () => yuan2fen
});
module.exports = __toCommonJS(src_exports);

// src/core/isType.ts
var isType = (val, typeFn) => Object.prototype.toString.call(val) === `[object ${typeFn.name}]`;
var isArray = (arr) => isType(arr, Array);
var isObject = (obj) => isType(obj, Object);
var isNumber = (num) => isType(num, Number);
var isString = (str) => isType(str, String);
var isBoolean = (bool) => isType(bool, Boolean);
var isMap = (map) => isType(map, Map);
var isWeakMap = (map) => isType(map, WeakMap);
var isSet = (s) => isType(s, Set);
var isWeakSet = (s) => isType(s, WeakSet);
var isArrayBuffer = (b) => isType(b, ArrayBuffer);
var isRegExp = (r) => isType(r, RegExp);
var isFunction = (f) => isType(f, Function);
var isSymbol = (s) => isType(s, Symbol);
var isNull = (n) => n === null;
var isUndefined = (u) => u === void 0;

// src/core/deepClone.ts
var deepClone = (obj) => {
  if ([null, void 0, NaN, false].includes(obj)) {
    return obj;
  }
  if (typeof obj !== "object") {
    return obj;
  }
  const root = isArray(obj) ? [] : {};
  const loopList = [
    {
      parent: root,
      key: void 0,
      data: obj
    }
  ];
  while (loopList.length) {
    const { parent, key, data } = loopList.pop();
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = isArray(data) ? [] : {};
    }
    for (let [childKey, value] of Object.entries(data)) {
      if (typeof value === "object" && value !== null && ![Date, RegExp, Function].some((_type) => value instanceof _type)) {
        loopList.push({
          parent: res,
          key: childKey,
          data: value
        });
      } else {
        res[childKey] = value;
      }
    }
  }
  return root;
};

// src/core/numFormat.ts
function polyfillNumber(num) {
  return +num || 0;
}
function fen2yuan(num, keepLength = 2) {
  return (polyfillNumber(num) / 100).toFixed(keepLength);
}
function yuan2fen(num) {
  return polyfillNumber(num) * 100;
}
function fen2yuanWithCurrency(num, keepLength = 2, withFlag = false) {
  return formatCurrency(fen2yuan(num, keepLength), withFlag);
}
var formatCurrency = (num, withFlag = false) => {
  if (num) {
    num = num.toString().replace(/\$|\,/g, "");
    if (num === "" || isNaN(+num)) {
      return "Not a Number !";
    }
    let sign = num.indexOf("-") === 0 ? "-" : withFlag ? "+" : "";
    let cents = num.indexOf(".") > 0 ? num.substr(num.indexOf(".")) : "";
    cents = cents.length > 1 ? cents : "";
    num = num.indexOf(".") > 0 ? num.substring(0, num.indexOf(".")) : num;
    num = Math.abs(+num).toString();
    if (cents === "") {
      if (num.length > 1 && num.substr(0, 1) === "0") {
        return "Not a Number !";
      }
    } else {
      if (num.length > 1 && num.substr(0, 1) === "0") {
        return "Not a Number !";
      }
    }
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + "," + num.substring(num.length - (4 * i + 3));
    }
    return sign + num + cents;
  } else {
    return "0";
  }
};
var telMasaike = (str, mid = "****") => {
  str = String(str);
  const start = str.substring(0, 3);
  const end = str.substring(7, 11);
  return start + mid + end;
};
var nameMasaike = (str, mid = "*") => {
  const len = str.length;
  if (len <= 2) {
    return str[0] + mid;
  } else {
    return str[0] + mid + str[len - 1];
  }
};
var idMasaike = (str, mid = "********") => {
  return `${str.substr(0, 6)}${mid}${str.substr(-4)}`;
};

// src/core/timeFormat.ts
function formatDate(number, format = "Y-M-D h:m:s") {
  const formateArr = ["Y", "M", "D", "h", "m", "s"];
  const returnArr = [];
  const date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (const i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i] + "");
  }
  return format;
}
function formatNumber(n) {
  let temp = n.toString();
  return temp[1] ? temp : "0" + temp;
}
var lastMonthDay = () => {
  const d = /* @__PURE__ */ new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  if (month === 0) {
    d.setFullYear(year - 1);
    d.setMonth(11);
  } else {
    d.setMonth(month - 1);
  }
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};
var thisMonthDay = () => {
  const d = /* @__PURE__ */ new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};
var recentDay = () => {
  const start = /* @__PURE__ */ new Date();
  start.setDate(start.getDate() - 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start.getTime() + 1e3 * 60 * 60 * 24);
  end.setHours(23, 59, 59);
  return [start, end];
};
var recentMonth = () => [lastMonthDay(), recentDay()[1]];
var thisMonth = () => [thisMonthDay(), recentDay()[1]];
var ymdParse = (daytte, sep = "-") => {
  let str = String(daytte).split("");
  str.splice(4, 0, sep);
  str.splice(7, 0, sep);
  return str.join("");
};
var nextDay = (h = 0, m = 0, s = 0) => {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(h, m, s);
  return d;
};
var shortcuts = [
  {
    text: "\u4ECA\u5929",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      return [start, end];
    })()
  },
  {
    text: "\u6628\u5929",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      end.setTime(start.getTime() - 3600 * 1e3 * 24 * 1);
      start.setTime(start.getTime() - 3600 * 1e3 * 24 * 1);
      return [start, end];
    })()
  },
  {
    text: "\u672C\u5468",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      var weekday = start.getDay() || 7;
      start.setDate(start.getDate() - weekday + 1);
      return [start, end];
    })()
  },
  {
    text: "\u4E0A\u5468",
    value: (() => {
      let myDate = /* @__PURE__ */ new Date();
      let weekDate = new Date(myDate.getTime() - 7 * 24 * 3600 * 1e3);
      let weekDate2 = new Date(myDate.getTime() - 7 * 24 * 3600 * 1e3);
      let day = weekDate.getDay();
      let time = weekDate.getDate() - day + (day === 0 ? -6 : 1);
      let startDate = new Date(weekDate.setDate(time));
      let endDate = new Date(weekDate2.setDate(time + 6));
      return [startDate, endDate];
    })()
  },
  {
    text: "\u672C\u6708",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setDate(1);
      start.setHours(0);
      start.setSeconds(0);
      start.setMinutes(0);
      return [start, end];
    })()
  },
  {
    text: "\u4E0A\u6708",
    value: (() => {
      let dayMSec = 24 * 3600 * 1e3;
      let today = /* @__PURE__ */ new Date();
      let lastMonthFirstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      let nowMonthFirstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      let lastMonthLastDayMSec = nowMonthFirstDay.getTime() - 1 * dayMSec;
      let lastMonthLastDay = new Date(lastMonthLastDayMSec);
      return [lastMonthFirstDay, lastMonthLastDay];
    })()
  },
  {
    text: "\u6700\u8FD17\u5929",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setTime(start.getTime() - 3600 * 1e3 * 24 * 6);
      return [start, end];
    })()
  },
  {
    text: "\u6700\u8FD130\u5929",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setTime(start.getTime() - 3600 * 1e3 * 24 * 30);
      return [start, end];
    })()
  }
];
var isDisabledDate = (d) => {
  const now = (/* @__PURE__ */ new Date()).setHours(23, 59, 59);
  const e = d.getTime();
  return e > now;
};
var getDateRange = (year, month) => {
  let dateStart = new Date(year, month - 1, 1);
  let dateEnd = new Date(year, month, 0);
  return [
    dateStart.getDate().toString().padStart(2, "0"),
    dateEnd.getDate().toString().padStart(2, "0")
  ];
};
function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const remainingSeconds = seconds % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
function timeToSeconds(time) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds;
}

// src/core/tool.ts
var import_md5 = __toESM(require("md5"), 1);
var sleep = async (n) => {
  return new Promise((resolve) => setTimeout(resolve, n * 1e3));
};
var parseDo = (str, sep = "%") => {
  const arr = [];
  str.split(sep).map((item) => {
    if (item) {
      const s = item.replace("u", "0x");
      if (s.length > 6) {
        arr.push(String.fromCharCode(+s.substr(0, 6)), decodeURIComponent(s.slice(6)));
      } else if (s.length === 6) {
        arr.push(String.fromCharCode(+s));
      } else {
        arr.push(decodeURIComponent(s));
      }
    }
  });
  return arr.join("");
};
var encodedStrParse = (str) => {
  if (str.includes("%u")) {
    return parseDo(str, "%");
  } else if (str.includes("\\u")) {
    return parseDo(str, "\\");
  } else {
    return decodeURIComponent(str);
  }
};
var safeJsonParse = (str, exp = {}) => {
  if (isString(str)) {
    try {
      const obj = JSON.parse(str);
      if (isObject(obj) || Array.isArray(obj)) {
        return obj;
      } else {
        return exp;
      }
    } catch (error) {
      return exp;
    }
  }
  return str;
};
var formatUrl = (url) => url.indexOf("http") !== -1 ? url : `//${url}`;
var randomId = () => Math.random().toString(36).slice(8);
var randomUUID = () => {
  let res = "";
  const template = "xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx";
  for (let i = 0, len = template.length; i < len; i += 1) {
    const s = template[i];
    const r = Math.random() * 16 | 0;
    const v = s === "x" ? r : s === "y" ? r & 3 | 8 : s;
    res += v.toString(16);
  }
  return res;
};
function getFingerprint() {
  try {
    const c = "bluesyoung_web@163.com <canvas> 1.0";
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", "220");
    canvas.setAttribute("height", "30");
    const canvasContext = canvas.getContext("2d");
    canvasContext.textBaseline = "top";
    canvasContext.font = "14px 'Arial'";
    canvasContext.textBaseline = "alphabetic";
    canvasContext.fillStyle = "#f60";
    canvasContext.fillRect(125, 1, 62, 20);
    canvasContext.fillStyle = "#069";
    canvasContext.fillText(c, 2, 15);
    canvasContext.fillStyle = "rgba(102, 204, 0, 0.7)";
    canvasContext.fillText(c, 4, 17);
    const base64Str = canvas.toDataURL().split(",")[1];
    const askiiStr = atob(base64Str);
    let result = "";
    for (let i = 0; i < askiiStr.length; i++) {
      const askii = askiiStr.charCodeAt(i);
      if (askii <= 15) {
        result += "0";
      }
      result += askii.toString(16).toLocaleUpperCase();
    }
    return (0, import_md5.default)(result).toUpperCase();
  } catch (error) {
    console.log("\u{1F680} ~ getFingerprint ~ error:", error);
    throw new Error("getFingerprint error, your envrionment is not support");
  }
}

// src/core/valid.ts
var isEmail = (email) => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email);
var isMobile = (tel) => /^1[23456789]\d{9}$/.test(tel);
var isHttpUrl = (url) => /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(url);
var isWebSocketUrl = (url) => /ws(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(url);
var isDate = (date) => !/Invalid|NaN/.test(new Date(date).toString());
var isISODate = (date) => /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(new Date(date).toString());
var isDecimal = (num) => /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(num + "");
var isInteger = (num) => /^\d+$/.test(num + "");
var isIdCard = (id) => /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(id + "");
var isLicensePlate = (value) => {
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
};
var isChinese = (str) => /^[\u4e00-\u9fa5]+$/gi.test(str);
var isLetter = (str) => /^[a-zA-Z]+$/.test(str);
var isLandline = (value) => /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(value);
var isJsonStr = (str) => {
  if (isString(str)) {
    try {
      const obj = JSON.parse(str);
      if (isObject(obj) || Array.isArray(obj)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
};
var isCurrencyStr = (str) => /^-?\d{1,3}(,\d{3})*(\.\d+)?$/.test(str);
var isWeChat = () => /MicroMessenger/gim.test(navigator.userAgent);
var isiOS = () => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i);
var isMacOS = () => /Mac OS X/i.test(navigator.userAgent);
var isAndroid = () => {
  const u = navigator.userAgent;
  return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
};

// src/core/browser.ts
var scrollToTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
};
var scrollToBottom = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
};
var smoothScroll = (element) => {
  document.querySelector(element)?.scrollIntoView({
    behavior: "smooth"
  });
};
var getClientHeight = () => {
  let clientWidth = 0, clientHeight = 0;
  clientWidth = (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
  } else {
    clientHeight = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return [clientWidth, clientHeight];
};
var toFullScreen = async () => {
  let element = document.body;
  if (element.requestFullscreen) {
    await element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    await element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    await element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    await element.webkitRequestFullScreen();
  }
};
var exitFullscreen = async () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
function preventKeyScroll(e) {
  const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Tab"];
  if (keys.includes(e.key)) {
    e.preventDefault();
  }
}
function preventWheelScroll(e) {
  e.preventDefault();
}
var disableScroll = (target = window) => {
  target.addEventListener("wheel", preventWheelScroll, { passive: false });
  target.addEventListener("keyup", preventKeyScroll);
  target.addEventListener("keydown", preventKeyScroll);
  target.addEventListener("keypress", preventKeyScroll);
};
var enableScroll = (target = window) => {
  target.removeEventListener("wheel", preventWheelScroll);
  target.removeEventListener("keyup", preventKeyScroll);
  target.removeEventListener("keydown", preventKeyScroll);
  target.removeEventListener("keypress", preventKeyScroll);
};

// src/core/color.ts
var randomHexColorCode = () => {
  const n = (Math.random() * 1048575 * 1e6).toString(16);
  return "#" + n.slice(0, 6);
};
var RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
var hexToRGB = (hex) => {
  let alpha = false;
  let h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map((x) => x + x).join("");
  } else if (h.length === 8) {
    alpha = true;
  }
  h = parseInt(h, 16);
  return `rgb${alpha ? "a" : ""}(${h >>> (alpha ? 24 : 16)}, ${(h & (alpha ? 16711680 : 65280)) >>> (alpha ? 16 : 8)}, ${(h & (alpha ? 65280 : 255)) >>> (alpha ? 8 : 0)}${alpha ? `, ${h & 255}` : ""})`;
};
var extendHex = (shortHex) => "#" + shortHex.slice(shortHex.length === 4 ? 1 : 0).split("").map((x) => x + x).join("");
var toRGBObject = (rgbStr) => {
  const [red, green, blue] = rgbStr.match(/\d+/g)?.map((n) => +n) ?? [0, 0, 0];
  return { red, green, blue };
};
var toRGBArray = (rgbStr) => rgbStr.match(/\d+/g)?.map((n) => +n) ?? [0, 0, 0];
var RGBToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b);
  const n = v - Math.min(r, g, b);
  const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && n / v * 100, v * 100];
};
var HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};
var RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s ? l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s)) : 0),
    100 * (2 * l - s) / 2
  ];
};
var HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

// src/storage/base.ts
var YoungStorage = class {
};

// src/storage/localStorage.ts
var YoungLocalStorage = class extends YoungStorage {
  /**
   * 存储
   * @param key 键名
   * @param value 键值
   * @param exp 过期时间(天)，默认 1 天后
   */
  set(key, value, exp = 1) {
    localStorage.setItem(
      key,
      JSON.stringify({
        exp: new Date(Date.now() + 1e3 * 3600 * 24 * exp).getTime(),
        data: value
      })
    );
  }
  remove(key) {
    localStorage.removeItem(key);
  }
  get(key) {
    const res = localStorage.getItem(key);
    if (!res) {
      return void 0;
    }
    try {
      const { exp, data } = JSON.parse(res);
      if (Date.now() < exp) {
        return data;
      } else {
        this.remove(key);
        return void 0;
      }
    } catch (error) {
      this.remove(key);
      return void 0;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HSBToRGB,
  HSLToRGB,
  RGBToHSB,
  RGBToHSL,
  RGBToHex,
  YoungLocalStorage,
  YoungStorage,
  deepClone,
  disableScroll,
  enableScroll,
  encodedStrParse,
  exitFullscreen,
  extendHex,
  fen2yuan,
  fen2yuanWithCurrency,
  formatCurrency,
  formatDate,
  formatUrl,
  getClientHeight,
  getDateRange,
  getFingerprint,
  hexToRGB,
  idMasaike,
  isAndroid,
  isArray,
  isArrayBuffer,
  isBoolean,
  isChinese,
  isCurrencyStr,
  isDate,
  isDecimal,
  isDisabledDate,
  isEmail,
  isFunction,
  isHttpUrl,
  isISODate,
  isIdCard,
  isInteger,
  isJsonStr,
  isLandline,
  isLetter,
  isLicensePlate,
  isMacOS,
  isMap,
  isMobile,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  isWeChat,
  isWeakMap,
  isWeakSet,
  isWebSocketUrl,
  isiOS,
  lastMonthDay,
  md5,
  nameMasaike,
  nextDay,
  polyfillNumber,
  randomHexColorCode,
  randomId,
  randomUUID,
  recentDay,
  recentMonth,
  safeJsonParse,
  scrollToBottom,
  scrollToTop,
  secondsToTime,
  shortcuts,
  sleep,
  smoothScroll,
  telMasaike,
  thisMonth,
  thisMonthDay,
  timeToSeconds,
  toFullScreen,
  toRGBArray,
  toRGBObject,
  ymdParse,
  yuan2fen
});
