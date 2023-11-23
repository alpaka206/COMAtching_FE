export const validateForm = (
  formData,
  selectedMajor,
  contactMethod,
  isContactVerified
) => {
  const yearAsInt = parseInt(formData.year, 10);

  if (!formData.depart || !selectedMajor) {
    alert("학과와 전공을 선택하세요.");
    return false;
  }

  if (!/^\d{11}$/.test(formData.phone) && contactMethod === "phone") {
    alert("전화번호는 11자리를 입력해주세요");
    return false;
  }

  if (isNaN(yearAsInt) || yearAsInt < 0 || yearAsInt > 23) {
    alert("올바른 학번을 입력해주세요 (1부터 23까지 가능).");
    return false;
  }

  if (formData.song.length > 30 || formData.song.length < 1) {
    alert("최대 30자 이내로 좋아하는 노래를 입력해주세요.");
    return false;
  }

  if (formData.mbti.length !== 4) {
    alert("MBTI를 모두 선택해주세요.");
    return false;
  }

  if (isContactVerified === false) {
    alert("전화번호 확인버튼을 눌러주세요!");
    return false;
  }

  return true;
};
