/*
 * @Author: zhangyang
 * @Date: 2022-07-02 14:57:48
 * @LastEditTime: 2022-07-03 09:49:56
 * @Description: 
 */
import { GetParamsSign, Young } from '../../typings';
import { SHAKE_HANDS_MSG } from './share';

type MasterCbk<R extends Record<string, any>, T extends keyof R = keyof R> = (params: GetParamsSign<R[T]>) => any | Promise<any>;
type MasterHandlers<R extends Record<string, any>, T extends keyof R = keyof R> = Partial<Record<T, MasterCbk<R, T>>>;

export class YoungRPCMaster<R extends Record<string, any>, T extends keyof R = keyof R> {
  private port: MessagePort;
  private handlersMap: MasterHandlers<R, T> = {};
  constructor() {
    window.addEventListener('message', async (e) => {
      if (e.data === SHAKE_HANDS_MSG) {
        this.port = e.ports[0];
        this.port.onmessage = (e) => {
          const { data, isTrusted } = e;
          if (isTrusted && data) {
            // 可以正式处理消息了
            if (data.cmd && typeof data.cmd === 'string' && this.handlersMap[data.cmd as T]) {
              // 已知的消息类型
              this.handlersMap[data.cmd](data.params as GetParamsSign<R[T]>);
            }  else {
              // 未知的消息类型
              console.warn('🚀unknown msg', data);
            }
          }
        };
        this.port.onmessageerror = (e) => {
          console.error('🚀 ~ YoungRPCMaster ~ ', e);
        };
        console.log('🚀🚀🚀 master app is ready 🚀🚀🚀');
      }
    });
  }

  public setHandler(cmd: T, cbk: MasterCbk<R, T>) {
    this.handlersMap[cmd] = cbk;
  }

  public close() {
    // 关闭信道
    this.port.close();
  }

  public sendMsg(data: Young.MasterReturnParams & { cmd: T }) {
    this.port.postMessage(data);
  }
};