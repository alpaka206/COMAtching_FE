import { atom } from "recoil";

export const numParticipantsState = atom({
  key: "numParticipantsState",
  default: null,
});

export const userState = atom({
  key: "userState",
  default: {
    email: "",
    passwd: "",
    depart: "",
    year: "",
    phone: "",
    song: "",
    gender: true,
    mbti: "",
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

export const contactMethodState = atom({
  key: "contactMethodState",
  default: "phone",
});

export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: "",
});

export const selectedMajorState = atom({
  key: "selectedMajorState",
  default: "",
});

export const isContactVerifiedState = atom({
  key: "isContactVerifiedState",
  // default: false,
  default: true,
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
