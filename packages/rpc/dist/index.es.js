const SHAKE_HANDS_MSG = "---young-rpc-shake-hands-message-request---";
class YoungRPCSlave {
  constructor() {
    this.handlersMap = {};
    if (window.opener && window.opener !== window) {
      this.masterWindow = window.opener;
    } else if (window.parent && window.parent !== window) {
      this.masterWindow = window.parent;
    }
    this.shakeHands();
  }
  shakeHands() {
    if (!this.masterWindow) {
      throw new Error("YoungRPCSlave can only be used in sub window");
    }
    const channel = new MessageChannel();
    this.port = channel.port1;
    this.port.onmessage = (e) => {
      const { data, isTrusted } = e;
      if (isTrusted && data) {
        if (data.cmd && typeof data.cmd === "string" && this.handlersMap[data.cmd]) {
          this.handlersMap[data.cmd](data);
        } else {
          console.warn("\u{1F680}unknown msg", data);
        }
      }
    };
    this.port.onmessageerror = (e) => {
      console.error("\u{1F680} ~ YoungRPCSlave ~ e", e);
    };
    this.masterWindow.postMessage(SHAKE_HANDS_MSG, "*", [channel.port2]);
  }
  trigger(cmd, params = {}) {
    this.port.postMessage({ cmd, params });
  }
  setHandler(cmd, { success, fail }) {
    this.handlersMap[cmd] = async ({ ok, data }) => {
      if (ok) {
        await (success == null ? void 0 : success(data));
      } else {
        await (fail == null ? void 0 : fail(data));
      }
    };
    return this.trigger.bind(this, cmd);
  }
}
class YoungRPCMaster {
  constructor() {
    this.handlersMap = {};
    window.addEventListener("message", async (e) => {
      if (e.data === SHAKE_HANDS_MSG) {
        this.port = e.ports[0];
        this.port.onmessage = (e2) => {
          const { data, isTrusted } = e2;
          if (isTrusted && data) {
            if (data.cmd && typeof data.cmd === "string" && this.handlersMap[data.cmd]) {
              this.handlersMap[data.cmd](data.params);
            } else {
              console.warn("\u{1F680}unknown msg", data);
            }
          }
        };
        this.port.onmessageerror = (e2) => {
          console.error("\u{1F680} ~ YoungRPCMaster ~ ", e2);
        };
        console.log("\u{1F680}\u{1F680}\u{1F680} master app is ready \u{1F680}\u{1F680}\u{1F680}");
      }
    });
  }
  setHandler(cmd, cbk) {
    this.handlersMap[cmd] = cbk;
  }
  close() {
    this.port.close();
  }
  sendMsg(data) {
    this.port.postMessage(data);
  }
}
export { YoungRPCMaster, YoungRPCSlave };
//# sourceMappingURL=index.es.js.map
