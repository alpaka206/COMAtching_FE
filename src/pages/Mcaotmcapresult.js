import "./Mcaotmcapresult.css";
import { useLocation, useNavigate } from "react-router-dom";

function Mcaotmcapresult() {
  const navigate = useNavigate();
  const location = useLocation();
  const generatedPhone = location.state?.generatedPhone;
  const generatedDepart = location.state?.generatedDepart;
  const generatedSong = location.state?.generatedSong;
  const generatedYear = location.state?.generatedYear;
  const generatedMbti = location.state?.generatedMbti;

  return (
    <div className="container">
      <div className="header">
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/logowhite.png`}
            alt="로고"
            style={{ width: "142px", height: "auto", marginLeft: "24px" }}
            onClick={() => navigate("/")}
          />
        </div>
        <button
          className="look-button"
          style={{
            width: "98px",
            height: "29px",
            marginRight: "24px",
            borderRadius: "15px",
            textAlign: "center",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "bold",
            paddingTop: "4px",
          }}
          onClick={() => navigate("/")}
        >
          처음으로
        </button>
      </div>
      <div className="content">
        <div className="McaotmcapresultTop">COMAtching 결과!</div>
        <div className="McaotmcapresultTopic">| 전공</div>
        <div className="McaotmcapresultText">{generatedDepart}</div>
        <div className="McaotmcapresultTopic">| 학번</div>
        <div className="McaotmcapresultText">{generatedYear}</div>
        <div className="McaotmcapresultTopic">| 좋아하는 노래</div>
        <div className="McaotmcapresultText">{generatedSong}</div>
        <div className="McaotmcapresultTopic">| 상대방의 MBTI</div>
        <div className="McaotmcapresultMbtitext">{generatedMbti}</div>
        <div className="McaotmcapresultInstaTopic">Instagram</div>
        <div className="McaotmcapresultInstaText">dd{generatedPhone}</div>
        <div className="McaotmcapresultBottom">
          comatching.result(you, partner);
        </div>
      </div>
    </div>
  );
}

export default Mcaotmcapresult;
