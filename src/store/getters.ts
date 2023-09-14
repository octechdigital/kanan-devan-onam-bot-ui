/* eslint-disable @typescript-eslint/no-explicit-any */

// import _ from 'lodash';
export default {
  accessDetails: (state: any) => state.accessDetails,
  masterKey: (state: any) => state.masterKey,
  conversation: (state: any) => state.conversation,
  lastIntent: (state: any) => state.lastIntent,
  name: (state: any) => state.name,
  mobile: (state: any) => state.mobile,
  city: (state: any) => state.city,
  uniqueCode: (state: any) => state.uniqueCode,
  isAuthenticated: ({ accessDetails }: { accessDetails: any }) => {
    if (accessDetails && accessDetails.userKey && accessDetails.dataKey) {
      return true;
    }
    return false;
  },
};
