import React, { Fragment } from "react";
import MyInput from "./MyInput";
import "../css/components/AgeInput.css";

function AgeInput({ value, onChange }) {
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // 유효성 검사
    if (!/^(97|98|99|00|01|02|03|04|05)$/.test(value)) {
      errorMessage = "탄생년도는 97부터 05까지의 숫자로 입력하세요. (예: 05)";
    }

    // 에러 메시지가 있을 경우에만 경고창을 띄웁니다.
    if (errorMessage) {
      alert(errorMessage);
    }
  };

  return (
    <Fragment>
      <h3>나이</h3>
      <div className="age">
        <MyInput
          name="age"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder="97년생부터 05년생만 가능합니다 ex) 05"
        />
      </div>
    </Fragment>
  );
}

export default AgeInput;
