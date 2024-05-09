import React, { useState } from "react";
import "../css/components/AgeMaker.css";

function AgeMaker({
  handleQuestionComplete,
  currentUserState,
  setCurrentUserState,
  setChooseAnswer,
}) {
  const handleAgeClick = (value, index) => {
    setCurrentUserState((prev) => ({
      ...prev,
      contact_frequency: value,
    }));
    setChooseAnswer(index);
    console.log("value: ", value);
    console.log("index: ", index);
  };

  return (
    <div className="MBTIMaker">
      <div className="MBTIMaker-text">내 답변</div>
      <div className="match-select-button">
        <button
          type="button"
          className={`AgeMaker ${
            currentUserState.contact_frequency === "적음" ? "selected" : ""
          }`}
          value={"적음"}
          onClick={() => handleAgeClick("적음", 0)}
        >
          {"적음"}
        </button>
        <button
          type="button"
          className={`AgeMaker ${
            currentUserState.contact_frequency === "중간" ? "selected" : ""
          }`}
          value={"중간"}
          onClick={() => handleAgeClick("중간", 1)}
        >
          {"중간"}
        </button>
        <button
          type="button"
          className={`AgeMaker ${
            currentUserState.contact_frequency === "많음" ? "selected" : ""
          }`}
          value={"많음"}
          onClick={() => handleAgeClick("많음", 2)}
        >
          {"많음"}
        </button>
      </div>
      <button
        className="MBTIMaker-submit-button"
        onClick={() => handleQuestionComplete(4)}
        disabled={!currentUserState}
      >
        전송
      </button>
    </div>
  );
}

export default AgeMaker;
