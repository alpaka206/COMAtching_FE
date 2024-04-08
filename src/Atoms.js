import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    passwd: "",
    userEmail: "",
    userPw: "",
    depart: "정보통신전자공학부",
    studentid: "19",
    phone: "",
    song: "없음",
    gender: true,
    mbti: "ESTJ",
    chance: 0,
    isLoggedIn: false,
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
