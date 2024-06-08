import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/components/HeaderNav.css";

function MatchHeader({ MatchState, setMatchState, setMatchPageResult }) {
  const navigate = useNavigate();
  const handleMatchLogo = () => {
    setMatchState({
      selectedMBTI: ["X", "X", "X", "X"],
      selectedCategory: [],
      point: 500,
      balance: null,
      isUseOption: [false, false, false, false],
      formData: {
        mbti_option: "",
        contact_frequency_option: "",
        hobby_option: [],
        age_option: "",
        match_code: "",
        no_same_major_option: false,
        ai_option_count: 0,
      },
    });
    setMatchPageResult({
      major: null,
      age: null,
      hobby: [],
      mbti: null,
      song: null,
      contactFrequency: null,
      contactId: null,
      word: null,
    });
    navigate("/code-reader");
  };
  return (
    <div className="match-header">
      <div>
        <img
          className="logo-img"
          src={process.env.PUBLIC_URL + `assets/logowhite.png`}
          alt="로고"
          onClick={handleMatchLogo}
        />
      </div>
      <div className="match-point-remaining">
        잔여포인트
        <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
        {MatchState.balance}
      </div>
    </div>
  );
}

export default MatchHeader;
