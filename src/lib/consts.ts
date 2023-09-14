export const INTENTS = {
  WELCOME: "WELCOME",

  GET_MOBILE: "GET_MOBILE",
  GET_NAME: "GET_NAME",
  GET_CITY: "GET_CITY",

  GET_CODE: "GET_CODE",
  COMPLETED: "COMPLETED",
};

export const DRINKING_AGE_STATE_WISE: Record<string, { age: number | "NE" }> = {
  "Andaman and Nicobar Islands": {
    age: 21,
  },
  "Madhya Pradesh": {
    age: 21,
  },
  "Andhra Pradesh": {
    age: 21,
  },
  Maharashtra: {
    age: 25,
  },
  "Arunachal Pradesh": {
    age: 21,
  },
  Assam: {
    age: 21,
  },
  Bihar: {
    age: "NE",
  },
  Manipur: {
    age: "NE",
  },
  Chandigarh: {
    age: 25,
  },
  Meghalaya: {
    age: 21,
  },
  Chhattisgarh: {
    age: 21,
  },
  Mizoram: {
    age: 21,
  },
  "Dadra and Nagar Haveli": {
    age: 25,
  },
  Nagaland: {
    age: "NE",
  },
  "Daman and Diu": {
    age: 25,
  },
  Odisha: {
    age: 21,
  },
  Delhi: {
    age: 25,
  },
  Puducherry: {
    age: 18,
  },
  Goa: {
    age: 18,
  },
  Punjab: {
    age: 25,
  },
  Gujarat: {
    age: "NE",
  },
  Rajasthan: {
    age: 21,
  },
  Haryana: {
    age: 25,
  },
  Sikkim: {
    age: 18,
  },
  "Himachal Pradesh": {
    age: 18,
  },
  "Tamil Nadu": {
    age: "NE",
  },
  "Jammu and Kashmir": {
    age: 18,
  },
  Telangana: {
    age: 21,
  },
  Jharkhand: {
    age: 21,
  },
  Tripura: {
    age: 21,
  },
  Karnataka: {
    age: 21,
  },
  "Uttar Pradesh": {
    age: 21,
  },
  Kerala: {
    age: 23,
  },
  Uttarakhand: {
    age: 21,
  },
  Lakshadweep: {
    age: "NE",
  },
  "West Bengal": {
    age: 21,
  },
};

export const STATES = Object.keys(DRINKING_AGE_STATE_WISE).sort();

export const AGES = (): number[] => {
  const allowedAges = [];
  for (let i = 18; i <= 60; i++) {
    allowedAges.push(i);
  }
  return allowedAges;
};

export enum CHARACTERS {
  BHUVAN = "Bhuvan",
  CHULBUL = "Chulbul",
  KRRISH = "Krrish",
  MOGAMBO = "Mogambo",
}
