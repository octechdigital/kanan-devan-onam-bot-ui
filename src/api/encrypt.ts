/* eslint-disable */
/* tslint-disable */
import store from "@/store";
import { fetchHandler, fetchHandlerText, responseHelper } from "./utils";

const headers: { [key: string]: string } = {
  Accept: "*/*",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

export function sendEncrytedData(url: string, data: any) {
  const accessDetails: any = store.getters.accessDetails;
  if (accessDetails && accessDetails.userKey && accessDetails.dataKey) {
    const userKey = accessDetails.userKey;
    const dataKey = accessDetails.dataKey;
    data = data || {};
    data.userKey = userKey;
    // fun = fun || function() {};

    const t = new Date().getTime();
    data.t = t;
    const dAr = (window as any).CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    const dr = (window as any).CryptoJS.enc.Base64.stringify(dAr);
    const hd = (window as any).CryptoJS.enc.Base64.stringify(
      (window as any).CryptoJS.enc.Utf8.parse(t)
    );
    const shaObj = new (window as any).jsSHA("SHA-256", "TEXT");
    shaObj.setHMACKey(dataKey.substr(4, 14), "TEXT");
    shaObj.update(hd + "." + dr);
    const hmac = shaObj.getHMAC("HEX");
    const k1 = (window as any).CryptoJS.enc.Utf8.parse(hmac);
    const k2 = (window as any).CryptoJS.enc.Base64.stringify(k1);
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const r1 = Math.floor(Math.random() * 6) + 1;
    const r2 = Math.floor(Math.random() * 7) + 2;
    for (let i = 0; i < r2; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    const f_str =
      String(r2) + String(r1) + k2.slice(0, r1) + text + k2.slice(r1);
    const out = hd + "." + dr + "." + f_str;
    const obj = {
      userKey: userKey,
      data: out,
    };
    return fetch(`${location.origin}${process.env?.VUE_APP_API_BASE_URL}${url}${userKey}`, {
      method: "POST",
      headers: headers,
      body: new URLSearchParams(obj),
    });
  }
  return Promise.reject({code: 401, message: "Session not found!"});
}

export function decryptData(response: any) {
  return Promise.resolve({
    ...response,
    data: JSON.parse(atob(response.data)),
    rawResp: response,
  });
}
