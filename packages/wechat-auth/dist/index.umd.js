(function(t,s){typeof exports=="object"&&typeof module!="undefined"?module.exports=s():typeof define=="function"&&define.amd?define(s):(t=typeof globalThis!="undefined"?globalThis:t||self,t.YoungWechatAuth=s())})(this,function(){"use strict";const t={state:"young_wechat_auth",redirect:location.href};class s{constructor(e){e=Object.assign(t,e),this.state=e.state,this.auth_url=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${e.appid}&redirect_uri=${encodeURIComponent(e.redirect)}&response_type=code&scope=snsapi_base&state=${e.state}#wechat_redirect`,/MicroMessenger/img.test(navigator.userAgent)?this.login_url=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${e.appid}&redirect_uri=${encodeURIComponent(e.redirect)}&response_type=code&scope=snsapi_userinfo&state=${e.state}#wechat_redirect`:this.login_url=`https://open.weixin.qq.com/connect/qrconnect?appid=${e.open_appid}&redirect_uri=${encodeURIComponent(e.redirect)}&response_type=code&scope=snsapi_login&state=${e.state}#wechat_redirect`}getCode(e="base"){const i=new URLSearchParams(location.search),o=i.get("code");if(i.get("state")===this.state)return o;e==="base"?location.href=this.auth_url:location.href=this.login_url}}return s});
//# sourceMappingURL=index.umd.js.map
