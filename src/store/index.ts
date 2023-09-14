import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "./mutations";
import * as actions from "./actions";
import getters from "./getters";
import { INTENTS } from "@/lib/consts";

Vue.use(Vuex);

export const initialState = {
  accessDetails: {
    userKey: "",
    dataKey: "",
  },
  masterKey: "",
  conversation: [],
  lastIntent: INTENTS.WELCOME,

  mobile: "",
  name: "",
  city: "",
  uniqueCode: "",
};

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "kanan-devan-onam-contest",
      storage: window.localStorage,
      // paths: ["accessDetails", "userDetails"],
    }),
  ],
  state: initialState,
  actions,
  mutations,
  getters,
});
