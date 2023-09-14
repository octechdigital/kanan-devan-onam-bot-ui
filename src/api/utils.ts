/* eslint-disable @typescript-eslint/no-explicit-any */

import eventBus from "@/lib/event_bus";
import Vue from "vue";
import router from "../router/index";

export const fetchHandler = (response: any) => {
  const defaultResp = {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  };
  if (response.ok) {
    return response
      .json()
      .then((data: any) => {
        // the status was ok and there is a json body
        return Promise.resolve({ data, rawResp: response, ...defaultResp });
      })
      .catch((err: any) => {
        // the status was ok but there is no json body
        return Promise.resolve({
          data: err,
          rawResp: response,
          ...defaultResp,
        });
      });
  } else {
    return response
      .json()
      .catch((err: any) => {
        // the status was not ok and there is no json body
        return Promise.resolve({
          rawResp: response,
          data: err,
          ...defaultResp,
        });
      })
      .then((json: any) => {
        // the status was not ok but there is a json body
        return Promise.resolve({
          rawResp: response,
          data: json,
          ...defaultResp,
        });
      });
  }
};

export const fetchHandlerText = (response: any) => {
  const defaultResp = {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  };
  if (response.ok) {
    return response
      .text()
      .then((data: any) => {
        // the status was ok and there is a data
        return Promise.resolve({ data, rawResp: response, ...defaultResp });
      })
      .catch((err: any) => {
        // the status was ok but there is no data
        return Promise.resolve({
          data: err,
          rawResp: response,
          ...defaultResp,
        });
      });
  } else {
    return response
      .text()
      .catch((err: any) => {
        // the status was not ok and there is no data
        return Promise.resolve({
          rawResp: response,
          data: err,
          ...defaultResp,
        });
      })
      .then((text: any) => {
        // the status was not ok but there is a data
        return Promise.resolve({
          rawResp: response,
          data: text,
          ...defaultResp,
        });
      });
  }
};

export const AuthMiddleware = (response: any) => {
  if (!response.ok && response.status === 401) {
    router.push({
      name: "login",
      query: {
        redirect: router.currentRoute.name,
      },
    });
  } else {
    return response;
  }
};

export const responseHelper = (response: any) => {
  eventBus.$emit("loader");
  const { statusCode } = response.data;
  if (statusCode === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response.data);
  }
};

// Default catch function when API fails
export const defaultCatch = (err: any) => {
  console.log(err);
  const ignoreIds = ["InvalidUniqueCode"];
  const { code, statusCode, message, messageId } = err;
  if (messageId && ignoreIds.includes(messageId)) {
    console.log(err);
  } else if (typeof err === "string") {
    Vue.notify({
      type: "error",
      text: err,
      title: "Error",
    });
  } else {
    if (message === "Failed to fetch") {
      Vue.notify({
        type: "error",
        text: "Please check your network and try again",
        title: `Failed to save detail(s)`,
      });
    } else if (code === 401) {
      Vue.notify({
        type: "error",
        text: "Please check your network and REFRESH to try again",
        title: `Session expired!`,
      });
    } else {
      Vue.notify({
        type: "error",
        text: message || "Something went wrong, try again after some time",
        title: `Error ${statusCode || code}`,
      });
    }
  }
  return Promise.reject(err);
};
