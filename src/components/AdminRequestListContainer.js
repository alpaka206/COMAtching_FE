import React, { useState } from "react";
import "../css/components/AdminRequestListContainer.css";

function AdminRequestListContainer({ userID, reqTime, userPoint }) {
  const [value, setValue] = useState({
    chargepoint: 0,
    pickmevalue: 0,
    finalpoint: userPoint,
  });

  const handleChargeIncrease = () => {
    setValue((prevState) => ({
      ...prevState,
      finalpoint: prevState.finalpoint + prevState.chargepoint,
    }));
  };

  const handleIncrease = () => {
    setValue((prevState) => ({
      ...prevState,
      pickmevalue: prevState.pickmevalue + 1,
      finalpoint: prevState.finalpoint - 500,
    }));
  };

  const handleDecrease = () => {
    if (value.pickmevalue > 0) {
      setValue((prevState) => ({
        ...prevState,
        pickmevalue: prevState.pickmevalue - 1,
        finalpoint: prevState.finalpoint + 500,
      }));
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || !isNaN(inputValue)) {
      setValue((prevState) => ({
        ...prevState,
        chargepoint: inputValue === "" ? 0 : parseInt(inputValue),
      }));
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
          onChange={handleInputChange}
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
          disabled={value.finalpoint <= 500} // finalpoint가 500보다 작거나 같으면 비활성화
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
