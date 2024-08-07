/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:59:58
 * @LastEditTime: 2024-06-25 20:05:25
 * @Description: 常用的正则验证函数
 */
import { isString, isObject } from './isType';
/**
 * 验证是否为合法的 email
 * @param {string} email
 */
export const isEmail = (email: string) =>
  /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email);
/**
 * 验证是否为合法的手机号
 * @param {string} tel
 */
export const isMobile = (tel: string) => /^1[23456789]\d{9}$/.test(tel);
/**
 * 验证是否为合法的 http url
 * @param {string} url
 */
export const isHttpUrl = (url: string) =>
  /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(url);
/**
 * 验证是否为合法的 websocket url
 * @param {string} url
 */
export const isWebSocketUrl = (url: string) =>
  /ws(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(url);
/**
 * 验证是否为合法的日期格式
 * @param {string} date
 */
export const isDate = (date: string | number | Date) =>
  !/Invalid|NaN/.test(new Date(date).toString());
/**
 * 验证是否为合法的ISO日期格式
 * @param {string} date
 */
export const isISODate = (date: string) =>
  /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(new Date(date).toString());
/**
 * 是否为十进制数
 * @param {number} num
 */
export const isDecimal = (num: string | number) =>
  /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(num + '');
/**
 * 是否为整数
 * @param {number} num
 */
export const isInteger = (num: string | number) => /^\d+$/.test(num + '');
/**
 * 是否为合法的身份证
 * @param {number} id
 */
export const isIdCard = (id: string | number) =>
  /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(id + '');
/**
 * 是否为合法车牌号
 * @param {string} value
 */
export const isLicensePlate = (value: string) => {
  // 新能源车牌
  const xreg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  const creg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
};
/**
 * 是否为中文（不包含标点符号）
 * @param {string} str
 */
export const isChinese = (str: string) => /^[\u4e00-\u9fa5]+$/gi.test(str);
/**
 * 是否为英文字母
 * @param {string} str
 */
export const isLetter = (str: string) => /^[a-zA-Z]+$/.test(str);
/**
 * 是否为合法的座机号码
 * @param {string} value
 */
export const isLandline = (value: string) => /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(value);
/**
 * 是否为 JSON 字符串
 * @param {string} str
 */
export const isJsonStr = (str: any) => {
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
/**
 * 判断是否为合法的财务数字(千分符字符串)
 * @param {string} str
 */
export const isCurrencyStr = (str: string) => /^-?\d{1,3}(,\d{3})*(\.\d+)?$/.test(str);
/**
 * 判断是否为微信内置浏览器
 */
export const isWeChat = () => /MicroMessenger/gim.test(navigator.userAgent);
/**
 * 判断是否为 iOS 浏览器
 */
export const isiOS = () => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i);
/**
 * 判断是否为 macOS 浏览器
 */
export const isMacOS = () => /Mac OS X/i.test(navigator.userAgent);
/**
 * 判断是否为安卓浏览器
 */
export const isAndroid = () => {
  const u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
};
