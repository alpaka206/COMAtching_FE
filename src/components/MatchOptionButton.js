import React from "react";

function MatchOptionButton({ state, num, handleButtonClick, money }) {
  return (
    <div className="match-premium-option-right">
      <div className="match-premium-option-cost">
        <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
        {money}
      </div>
      {!state ? (
        <button
          type="button"
          className="match-premium-option-unclick-button"
          onClick={() => handleButtonClick(num, money)}
        >
          +
        </button>
      ) : (
        <button
          type="button"
          className="match-premium-option-click-button"
          onClick={() => handleButtonClick(num, -money)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/Backspace.svg`}
            alt="닫기"
          />
        </button>
      )}
    </div>
  );
}

export default MatchOptionButton;
