/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { INTENTS } from "@/lib/consts";

export default {
  SET_ACCESS_DETAILS(state: any, accessDetails: any) {
    state.accessDetails = accessDetails;
    if (state.masterKey === "") {
      state.masterKey = accessDetails.userKey;
    }
  },
  SAVE_CONVERSATION(state: any, conversation: any) {
    state.conversation = conversation;
  },
  SAVE_DETAIL(state: any, data: { key: string; value: any }) {
    state[data.key] = data.value;
  },
  SAVE_LAST_INTENT(state: any, intent: string) {
    state.lastIntent = intent;
  },
  CLEAR_ALL_DETAILS(state: any) {
    state.lastIntent = INTENTS.WELCOME;
    state.accessDetails = {
      userKey: "",
      dataKey: "",
    };
    state.conversation = [];

    state.mobile = "";
    state.name = "";
    state.uniqueCode = "";
    state.city = "";
  },
};
