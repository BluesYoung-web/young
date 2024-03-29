import { defineNuxtPlugin } from "nuxt/app";
import { options } from "#build/@bluesyoung/nuxt3-lazy-load";
import { YoungOSSImageDefaultProcess } from "../types.mjs";
function isPictureChild(el) {
  return el.parentNode && el.parentNode.nodeName.toLocaleLowerCase() === "picture";
}
function ossImageProcess(el, originURL) {
  if (!["http://", "https://"].some((proto) => originURL.startsWith(proto))) {
    originURL = new URL(originURL, location.href).toString();
  }
  const srcURL = new URL(originURL);
  const extendsSrc = (str) => {
    if (el.tagName.toLocaleLowerCase() === "img" || isPictureChild(el)) {
      const OSSProcess = new URLSearchParams(str);
      for (const [key, value] of OSSProcess.entries()) {
        srcURL.searchParams.set(key, value);
      }
    }
  };
  if (options.OSSProcess === false) {
    null;
  } else if (el.getAttribute("data-image-process")) {
    extendsSrc(el.getAttribute("data-image-process"));
  } else if (options.OSSProcess) {
    extendsSrc(options.OSSProcess);
  } else if (YoungOSSImageDefaultProcess[options.OSSProvider]) {
    extendsSrc(YoungOSSImageDefaultProcess[options.OSSProvider]);
  } else {
    console.warn("[OSSProvider]: ", "unknown oss provider");
  }
  return srcURL.toString();
}
function setAttribute(el, attribute) {
  const dataAttribute = `data-${attribute}`;
  if (el instanceof NodeList) {
    for (const e of el)
      setAttribute(e, attribute);
  } else if (el.getAttribute(dataAttribute)) {
    el.setAttribute(attribute, ossImageProcess(el, el.getAttribute(dataAttribute)));
    el.removeAttribute(dataAttribute);
    el.parentNode.load && el.parentNode.load();
  } else if (el.tagName.toLocaleLowerCase() === "picture") {
    const img = el.querySelector("img");
    if (img) {
      setAttribute(img, "src");
      setAttribute(img, "srcset");
      img.addEventListener("load", () => setClass(el));
    }
  }
}
function setClass(el) {
  el.classList.remove(options.loadingClass);
  options.loadedClass && el.classList.add(options.loadedClass);
}
function setEvent(el) {
  const tagName = el.tagName.toLocaleLowerCase();
  let eventName = "load";
  if (["video", "audio"].includes(tagName))
    eventName = "loadeddata";
  el.addEventListener(eventName, () => {
    if (isPictureChild(el)) {
      if (el.parentNode.getAttribute("data-not-lazy"))
        setClass(el.parentNode);
      else
        el.parentNode.removeAttribute("data-not-lazy");
    } else {
      setClass(el);
    }
  });
}
export default defineNuxtPlugin((nuxtApp) => {
  let observer;
  if (process.client) {
    observer = new IntersectionObserver((entries, self) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          let el = target;
          if (!isPictureChild(el) && options.loadingClass)
            el.classList.add(options.loadingClass);
          const source = el.querySelectorAll("source");
          setAttribute(el, "poster");
          if (source.length)
            el = source;
          setAttribute(el, "src");
          setAttribute(el, "srcset");
          self.unobserve(target);
        }
      });
    }, options.observerConfig);
  }
  nuxtApp.vueApp.directive("lazy-load", {
    beforeMount(el) {
      setEvent(el);
      !isPictureChild(el) && options.appendClass && el.classList.add(options.appendClass);
    },
    mounted(el) {
      observer && observer.observe(el);
      options.defaultImage && el.tagName.toLocaleLowerCase() === "img" && (el.src = options.defaultImage);
      if (el.dataset.youngPreload) {
        el.src = ossImageProcess(el, el.dataset.src || el.src);
      }
    },
    getSSRProps() {
      return {};
    }
  });
  nuxtApp.vueApp.directive("pre-load", {
    mounted(el, { value }) {
      if (value) {
        el.src = ossImageProcess(el, el.dataset.src || el.src);
        el.dataset.youngPreload = true;
      }
    },
    getSSRProps() {
      return {};
    }
  });
  nuxtApp.vueApp.directive("not-lazy", {
    beforeMount(el) {
      for (const item of [...el.querySelectorAll("source"), ...el.querySelectorAll("img")]) {
        setAttribute(item, "src");
        setAttribute(item, "srcset");
      }
      el.tagName.toLocaleLowerCase() !== "picture" && el.removeAttribute("data-not-lazy");
    },
    getSSRProps() {
      return {};
    }
  });
});
