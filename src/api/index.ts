/* eslint-disable @typescript-eslint/no-explicit-any */
import eventBus from "@/lib/event_bus";
import store from "@/store";
import { decryptData, sendEncrytedData } from "./encrypt";
import { defaultCatch, fetchHandlerText, responseHelper } from "./utils";

const jsonHeaders: { [key: string]: string } = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export function createUser(): Promise<any> {
  eventBus.$emit("loader", {
    show: true,
  });
  const payload: any = {};
  const masterKey: string = store.getters.masterKey;
  if (masterKey) {
    payload.masterKey = masterKey;
  }
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("utm_source")) {
    payload.utm_source = urlParams.get("utm_source");
  }
  return fetch(`${location.origin}${process.env?.VUE_APP_API_BASE_URL}users`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  })
    .then(fetchHandlerText)
    .then(decryptData)
    .then(responseHelper)
    .catch(defaultCatch);
}

export function recordAction(type: string): Promise<any> {
  return sendEncrytedData("users/action/", { type })
    .then(fetchHandlerText)
    .then(decryptData)
    .then(responseHelper)
    .catch(defaultCatch);
}

export function saveMobile(mobile: string): Promise<any> {
  return sendEncrytedData("users/getMobile/", { mobile })
    .then(fetchHandlerText)
    .then(decryptData)
    .then(responseHelper)
    .catch(defaultCatch);
}

export function saveName(name: string): Promise<any> {
  return sendEncrytedData("users/getName/", { name })
    .then(fetchHandlerText)
    .then(decryptData)
    .then(responseHelper)
    .catch(defaultCatch);
}

export function saveCity(city: string): Promise<any> {
  return sendEncrytedData("users/getCity/", { city })
    .then(fetchHandlerText)
    .then(decryptData)
    .then(responseHelper)
    .catch(defaultCatch);
}

export function saveUniquecode(uniqueCode: string): Promise<any> {
  return sendEncrytedData("users/getUniqueCode/", { uniqueCode })
    .then(fetchHandlerText)
    .then(decryptData)
    .then(responseHelper)
    .catch(defaultCatch);
}
