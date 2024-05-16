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
            currentUserState.contact_frequency === "자주" ? "selected" : ""
          }`}
          value={"자주"}
          onClick={() => handleAgeClick("자주", 0)}
        >
          {"자주"}
        </button>
        <button
          type="button"
          className={`AgeMaker ${
            currentUserState.contact_frequency === "보통" ? "selected" : ""
          }`}
          value={"보통"}
          onClick={() => handleAgeClick("보통", 1)}
        >
          {"보통"}
        </button>
        <button
          type="button"
          className={`AgeMaker ${
            currentUserState.contact_frequency === "가끔" ? "selected" : ""
          }`}
          value={"가끔"}
          onClick={() => handleAgeClick("가끔", 2)}
        >
          {"가끔"}
        </button>
      </div>
      <button
        className="MBTIMaker-submit-button"
        onClick={() => handleQuestionComplete(4)}
        disabled={currentUserState.contact_frequency.length < 1}
      >
        전송
      </button>
    </div>
  );
}

export default AgeMaker;
