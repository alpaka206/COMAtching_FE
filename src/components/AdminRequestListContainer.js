// AdminModal.js
import React, { useState } from "react";
import "../css/components/AdminRequestListContainer.css";

function AdminRequestListContainer({ userID, reqTime, userPoint }) {
  const [value, setValue] = useState({
    chargepoint: 0,
    pickmevalue: 0,
    finalpoint: userPoint,
  });
  const handleChargeIncrease = () => {
    setValue({
      ...value,
      finalpoint: value.finalpoint + value.chargepoint,
    });
  };
  const handleIncrease = () => {
    setValue({
      ...value,
      pickmevalue: value.pickmevalue + 1,
      finalpoint: value.finalpoint - 500,
    });
  };

  const handleDecrease = () => {
    if (value.pickmevalue > 0) {
      setValue({
        ...value,
        pickmevalue: value.pickmevalue - 1,
        finalpoint: value.finalpoint + 500,
      });
    }
  };
  const handleInputChange = (event) => {
    // 입력값이 숫자인지 확인하여 숫자가 아니면 무시
    const inputValue = event.target.value;
    if (inputValue === "" || !isNaN(inputValue)) {
      setValue({
        ...value,
        chargepoint: inputValue === "" ? 0 : parseInt(inputValue), // 빈 문자열인 경우 0으로 대체
      });
    }
  };
  return (
    <div className="AdminRequestListContainer">
      <div className="AdminRequestListElement">
        <div className="AdminRequestListElement-userID">
          userID: &nbsp;
          <div className="AdminRequestListElement-userID-ID"> {userID}</div>
        </div>
        <div>Cost:{value.finalpoint}</div>
        <div>reqTime: {reqTime}</div>
      </div>

      <div className="AdminRequestListItem">
        <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
        <input
          type="text"
          value={value.chargepoint}
          onChange={handleInputChange} // 입력값 변경 이벤트 핸들러 연결
        />
        <button onClick={handleChargeIncrease}>확인</button>
        <img src={process.env.PUBLIC_URL + `assets/heart.svg`} alt="heart" />
        <button
          type="button"
          onClick={handleDecrease}
          className="AdminRequestListItem-pickme-button"
        >
          -
        </button>
        <div className="AdminRequestListItem-pickme-value">
          {value.pickmevalue}
        </div>
        <button
          type="button"
          onClick={handleIncrease}
          className="AdminRequestListItem-pickme-button"
        >
          +
        </button>
        <button type="button" className="AdminRequestListItem-submit-button">
          확인
        </button>
      </div>
    </div>
  );
}

export default AdminRequestListContainer;
