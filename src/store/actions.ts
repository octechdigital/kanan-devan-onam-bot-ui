/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialState } from ".";

export const SET_ACCESS_DETAILS = ({ commit }: any, accessDetails: any) => {
  commit("SET_ACCESS_DETAILS", accessDetails);
};

export const SAVE_DETAIL = ({ commit }: any, data: any) => {
  commit("SAVE_DETAIL", data);
};

export const CLEAR_ALL_DETAILS = ({ commit }: any): void => {
  commit("CLEAR_ALL_DETAILS", initialState);
};

export const SAVE_CONVERSATION = ({ commit }: any, path: string) => {
  commit("SAVE_CONVERSATION", path);
};

export const SAVE_LAST_INTENT = ({ commit }: any, path: string) => {
  commit("SAVE_LAST_INTENT", path);
};
