export const validateForm = (user, registerCheck) => {
  const AgeInt = parseInt(user.age, 10);
  if (registerCheck.check === false) {
    alert("개인정보 동의를 체크해주세요");
    return false;
  }
  if (user.major.length < 1) {
    alert("전공을 선택하세요.");
    return false;
  }

  if (isNaN(AgeInt) || AgeInt > 29 || AgeInt < 20) {
    alert("올바른 나이를 입력해주세요 (20부터 29까지 가능).");
    return false;
  }
  if (user.contact_id.length < 1) {
    alert("연락처를 입력해주세요");
    return false;
  }
  if (user.contact_id_Verified === true) {
    alert("연락처 중복체크를 해주세요");
    return false;
  }
  if (user.contact_frequency.length < 1) {
    alert("연락빈도를 골라주세요");
    return false;
  }
  if (user.mbti.length !== 4) {
    alert("MBTI를 모두 선택해주세요.");
    return false;
  }
  if (user.hobby.length < 1) {
    alert("관심사를 최소 1개 이상 선택해주세요.");
    return false;
  }
  if (user.song.length > 20 || user.song.length < 1) {
    alert("최대 11자 이내로 좋아하는 노래를 입력해주세요.");
    return false;
  }
  if (user.comment.length > 11 || user.comment.length < 1) {
    alert("나를 소개할 한마디를 11자 이내로 입력해주세요.");
    return false;
  }
  return true;
};
