import { atom } from "recoil";
export const charge = atom({
  key: "charge",
  default: {
    chargeclick: false,
  },
});

export const adminRequests = atom({
  key: "adminRequests",
  default: [],
});
export const userState = atom({
  key: "userState",
  default: {
    major: "",
    age: "",
    contact: "kakao",
    contact_id: "",
    gender: "남자",
    contact_frequency: "",
    mbti: "",
    hobby: [],
    song: "",
    comment: "",
    contact_id_Verified: true,
    isLoggedIn: false,
    point: null,
    pickme: null,
    token: null,
  },
});

export const selectedMBTIState = atom({
  key: "selectedMBTIState",
  default: {
    EI: "",
    SN: "",
    TF: "",
    PJ: "",
  },
});

export const MatchPickState = atom({
  key: "MatchPickState",
  default: {
    selectedMBTI: ["X", "X", "X", "X"],
    selectedCategory: [],
    point: 500,
    balance: 1000,
    isUseOption: [false, false, false, false],
    formData: {
      mbti: "",
      contact_frequency_option: "",
      hobby_option: [],
      age_option: "",
      match_code: "",
      no_same_major_option: false,
      ai_option_count: 0,
    },
  },
});

export const MatchResultState = atom({
  key: "MatchResultState",
  default: {
    major: null,
    age: null,
    hobby: [],
    mbti: null,
    song: null,
    contactFrequency: null,
    contactId: null,
    word: null,
  },
});

export const checkresultState = atom({
  key: "checkresultState",
  default: [],
});
