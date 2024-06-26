import { YoungImageViewer } from "../index.mjs";
import { createVNode, render, h } from "vue";
import { ElOverlay } from "element-plus";
import { isString } from "@bluesyoung/utils";
export function useImagePreview(conf, zIndex = 9999) {
  const appendTo = document.createElement("div");
  const vnode = createVNode(YoungImageViewer, {
    onDestroy: () => {
      document.body.removeChild(appendTo);
      conf.srcList.forEach((src) => {
        URL.revokeObjectURL(src);
      });
    },
    zIndex
  });
  render(vnode, appendTo);
  document.body.appendChild(appendTo);
  vnode.component.exposed?.show(conf);
}
;
export function useVideoPreview(src, zIndex = 9999) {
  const appendTo = document.createElement("div");
  const vnode = createVNode(ElOverlay, {
    zIndex,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 10rem"
    },
    onClick: () => {
      document.body.removeChild(appendTo);
      URL.revokeObjectURL(src);
    }
  }, {
    default: () => h("video", {
      style: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        background: "rgba(0,0,0)",
        boxSizing: "content-box"
      },
      src,
      controls: true,
      autoplay: true
    })
  });
  render(vnode, appendTo);
  document.body.appendChild(appendTo);
}
export function useAudioPreview(src, zIndex = 9999) {
  const appendTo = document.createElement("div");
  const vnode = createVNode(ElOverlay, {
    zIndex,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 10rem"
    },
    onClick: () => {
      document.body.removeChild(appendTo);
      URL.revokeObjectURL(src);
    }
  }, {
    default: () => h("audio", {
      style: {
        width: "100%",
        // height: '100%',
        padding: "10rem",
        background: "rgba(0,0,0)",
        boxSizing: "content-box"
      },
      src,
      controls: true,
      autoplay: true
    })
  });
  render(vnode, appendTo);
  document.body.appendChild(appendTo);
}
export async function getVideoCover(v, seek = 1, w = 320, h2 = 240) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = isString(v) ? v : URL.createObjectURL(v);
    video.crossOrigin = "anonymous";
    video.currentTime = seek;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    video.oncanplay = () => {
      canvas.width = w;
      canvas.height = h2;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      try {
        resolve(canvas.toDataURL("image/png", 0.75));
      } catch (error) {
        console.log("\u{1F680} ~ getVideoCover ~ error:", error);
      } finally {
        URL.revokeObjectURL(video.src);
        video.remove();
        canvas.remove();
      }
    };
  });
}
