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

export const MatchRecoilState = atom({
  key: "mcaotmcapRecoilState",
  default: {
    selectedMBTI: [],
    history: "",
    sortedMBTI: [],
    formData: {
      passwd: "",
      gender: true,
      mbti: "",
    },
  },
});

export const MatchResultRecoilState = atom({
  key: "mcaotmcapResultRecoilState",
  default: {
    generatedGender: null,
    generatedPhone: null,
    generatedDepart: null,
    generatedSong: null,
    generatedYear: null,
    generatedMbti: null,
    generatedCode: null,
  },
});

export const generatedDataState = atom({
  key: "generatedDataState",
  default: [],
});
