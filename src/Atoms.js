import { atom } from "recoil";

export const isCheckedState = atom({
  key: "isCheckedState",
  default: false,
});

export const numParticipantsState = atom({
  key: "numParticipantsState",
  default: null,
});

export const showAgreementState = atom({
  key: "showAgreementState",
  default: false,
});

export const formDataState = atom({
  key: "formDataState",
  default: {
    email: "",
    passwd: "",
    // Add other fields as needed
  },
});

export const mcaotmcapState = atom({
  key: "mcaotmcapState",
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

export const generatedDataState = atom({
  key: "generatedDataState",
  default: {
    generatedPhone: null,
    generatedDepart: null,
    generatedSong: null,
    generatedYear: null,
    generatedMbti: null,
    generatedCode: null,
  },
});
