import React, { useState } from "react";

function MBTIMaker({
  mbtiAnswers,
  questionNum,
  handleQuestionComplete,
  selectedMBTI,
  setSelectedMBTI,
}) {
  const [answerChecked, setAnswerChecked] = useState(null);
  const handleMBTIClick = (mbtiType, value) => {
    setSelectedMBTI((prevMBTI) => ({
      ...prevMBTI,
      [mbtiType]: value,
    }));
    setAnswerChecked(value);
  };

  return (
    <div className="ProfileMaker">
      <div className="ProfileMaker-text">내 답변</div>
      <button
        className={`profilemaker-choose-button ${
          answerChecked === mbtiAnswers[questionNum][2] ? "selected" : ""
        }`}
        onClick={() =>
          handleMBTIClick(
            mbtiAnswers[questionNum][4],
            mbtiAnswers[questionNum][2]
          )
        }
      >
        <div className="profilemaker-button-title">
          {mbtiAnswers[questionNum][2]}
        </div>
        <div>{mbtiAnswers[questionNum][0]}</div>
      </button>
      <button
        className={`profilemaker-choose-button ${
          answerChecked === mbtiAnswers[questionNum][3] ? "selected" : ""
        }`}
        onClick={() =>
          handleMBTIClick(
            mbtiAnswers[questionNum][4],
            mbtiAnswers[questionNum][3]
          )
        }
      >
        <div className="profilemaker-button-title">
          {mbtiAnswers[questionNum][3]}
        </div>
        <div>{mbtiAnswers[questionNum][1]}</div>
      </button>
      <button
        className="profilemaker-submit-button"
        onClick={() => handleQuestionComplete(questionNum)}
        disabled={!answerChecked}
      >
        전송
      </button>
    </div>
  );
}

export default MBTIMaker;
