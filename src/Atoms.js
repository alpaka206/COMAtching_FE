import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    major: "eeeee",
    age: "eeeee",
    contact: "kakao",
    contact_id: "eeeee",
    gender: "Male",
    contact_frequency: "eeeee",
    mbti: "eeeee",
    hobby: [],

    song: "",
    comment: "",
    contact_id_Verified: false,
    isLoggedIn: true,
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
    formData: {
      contactRate: "",
      age: "",
      mbti: "",
      samemajor: false,
      hobby: [],
    },
  },
});

export const MatchResultState = atom({
  key: "MatchResultState",
  default: {
    generatedMajor: null,
    generatedAge: null,
    generatedHobby: [],
    generatedMbti: null,
    generatedSong: null,
    generatedContact_Frequency: null,
    generatedContact: null,
    generatedContact_Id: null,
  },
});

export const generatedDataState = atom({
  key: "generatedDataState",
  default: [],
});
