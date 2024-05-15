import React, { useState } from "react";
import "../css/components/ResultReview.css";
import Rating from "@mui/material/Rating";

const blackStarStyles = {
  color: "#FF775E",
  fontSize: "40px",
};

function ResultReview({ user }) {
  const [score, setScore] = useState(0);
  return (
    <div className="ResultReview">
      <div className="ResultReview-text">
        <div className="ResultReview-text-top">
          <div className="ResultReview-text-username">{user.contact_id}</div>
          님에 대한
        </div>
        ComatchingAI의 매칭은 어떠셨나요?
      </div>
      <div className="ResultReview-star">
        <Rating
          name="read-only"
          value={score}
          precision={1}
          onChange={(event, newValue) => {
            setScore(newValue);
          }}
          sx={{ "& .MuiSvgIcon-root": blackStarStyles }}
        />
      </div>
      <button className="ResultReview-button">전송</button>
    </div>
  );
}

export default ResultReview;
