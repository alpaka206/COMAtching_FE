import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    depart: "코매칭",
    age: "",
    phone: "01011112222",
    song: "아이유-에필로그",
    gender: "Male",
    mbti: "ESTJ",
    hobby: ["독서", "음악감상", "그림그리기", "게임", "사진촬영"],
    chance: 0,
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
    selectedMBTI: [],
    selectedCategory: "",
    sortedMBTI: [],
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
    generatedDepart: null,
    generatedAge: null,
    generatedSong: null,
    generatedMbti: null,
    generatedHobby: [null],
    generatedPhone: null,
    generatedContactRate: null,
    generatedCotactMethod: null,
  },
});

export const generatedDataState = atom({
  key: "generatedDataState",
  default: [],
});
