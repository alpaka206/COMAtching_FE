export const matchValidation = (MatchState, updatedFormData) => {
  const mbti = updatedFormData.mbti;
  const xCount = (mbti.match(/X/g) || []).length;

  if (xCount >= 3) {
    alert("mbti를 두개 골라주세요");
    return false;
  }
  if (MatchState.isUseOption[0] && updatedFormData.age_option === "") {
    alert("나이를 골라주세요");
    return false;
  }

  if (
    MatchState.isUseOption[1] &&
    updatedFormData.contact_frequency_option === ""
  ) {
    alert("연락 빈도를 골라주세요");
    return false;
  }
  if (MatchState.isUseOption[2] && updatedFormData.hobby_option.length < 1) {
    alert("취향을 골라주세요");
    return false;
  }
  if (MatchState.balance < MatchState.point) {
    alert("돈이 부족합니다");
    return false;
  }
  return true;
};
