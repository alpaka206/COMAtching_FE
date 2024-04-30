import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import "../css/pages/Form.css";

function Hobbyform() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="처음으로" />
      <div className="content">
        <div>취미 선택하기</div>
        <div>본인의 취미를 알려주세요. (1-5개)</div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/music.svg`}
            alt="음악감상"
          />
          <div>음악감상</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/draw.svg`}
            alt="그림그리기"
          />
          <div>그림그리기</div>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + `assets/game.svg`} alt="게임" />
          <div>게임</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/photo.svg`}
            alt="사진촬영"
          />
          <div>사진촬영</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/activity.svg`}
            alt="액티비티"
          />
          <div>액티비티</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/exercise.svg`}
            alt="운동"
          />
          <div>운동</div>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + `assets/alcohol.svg`} alt="술" />
          <div>술</div>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + `assets/read.svg`} alt="독서" />
          <div>독서</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/music.svg`}
            alt="음악감상"
          />
          <div>음악감상</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/music.svg`}
            alt="음악감상"
          />
          <div>음악감상</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/music.svg`}
            alt="음악감상"
          />
          <div>음악감상</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/music.svg`}
            alt="음악감상"
          />
          <div>음악감상</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/music.svg`}
            alt="음악감상"
          />
          <div>음악감상</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/music.svg`}
            alt="음악감상"
          />
          <div>음악감상</div>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/music.svg`}
            alt="음악감상"
          />
          <div>음악감상</div>
        </div>
      </div>
    </div>
  );
}

export default Hobbyform;
