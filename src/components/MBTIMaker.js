import React from "react";

function MBTIMaker({ mbtiAnswers, questionNum, handleQuestionComplete }) {
  return (
    <div className="ProfileMaker">
      <div className="ProfileMaker-text">내 답변</div>
      <button className="profilemaker-choose-button">
        <div className="profilemaker-button-title">
          {mbtiAnswers[questionNum][2]}
        </div>
        <div>{mbtiAnswers[questionNum][0]}</div>
      </button>
      <button className="profilemaker-choose-button">
        <div className="profilemaker-button-title">
          {mbtiAnswers[questionNum][3]}
        </div>
        <div>{mbtiAnswers[questionNum][1]}</div>
      </button>
      <button
        className="profilemaker-submit-button"
        onClick={() => handleQuestionComplete(questionNum)}
      >
        전송
      </button>
    </div>
  );
}

export default MBTIMaker;
