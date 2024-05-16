import { atom } from "recoil";

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
    contact_id_Verified: false,
    isLoggedIn: true,
    point: null,
    pickme: null,
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
  default: [
    {
      major: "ㅂㅂㅂ",
      age: "111",
      contact: "kakao",
      contact_id: "ㅂㅂㅂ",
      gender: "Male",
      contact_frequency: "",
      mbti: "ㅂㅂㅂ",
      hobby: [],
      song: "ㅂㅂㅂ",
      comment: "ㅂㅂ",
      review: false,
    },
    {
      major: "ㅂㅂㅂ",
      age: "ㅂㅂㅂ",
      contact: "instagram",
      contact_id: "@kim.ql",
      contact_frequency: "ㅂㅂㅂ",
      mbti: "ㅂㅂ",
      hobby: [],
      song: "ㅂㅂㅂ",
      comment: "ㅂㅂㅂㅂ",
      review: true,
    },
  ],
});
