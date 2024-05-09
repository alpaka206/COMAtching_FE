export const validateForm = (
  user,
  selectedMajor,
  contactMethod,
  isContactVerified
) => {
  const yearAsInt = parseInt(user.year, 10);

  if (!selectedMajor) {
    alert("학과와 전공을 선택하세요.");
    return false;
  }

  if (!/^\d{11}$/.test(user.contact_id) && contactMethod === "phone") {
    alert("전화번호는 11자리를 입력해주세요");
    return false;
  }

  // if (isNaN(yearAsInt) || yearAsInt < 0 || yearAsInt > 23) {
  //   alert("올바른 학번을 입력해주세요 (1부터 23까지 가능).");
  //   return false;
  // }

  if (user.song.length > 30 || user.song.length < 1) {
    alert("최대 30자 이내로 좋아하는 노래를 입력해주세요.");
    return false;
  }

  if (user.mbti.length !== 4) {
    alert("MBTI를 모두 선택해주세요.");
    return false;
  }

  // if (isContactVerified === false) {
  //   alert("전화번호 확인버튼을 눌러주세요!");
  //   return false;
  // }

  return true;
};
