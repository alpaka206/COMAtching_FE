import "./Checkresult.css";
import { useLocation, useNavigate } from "react-router-dom";

function Checkresult() {
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
        <div className="CheckresultTopline">
          <div className="CheckresultInlineItem">
            <div className="CheckresultTopic">학번</div>
            <div className="CheckresultText">year{generatedYear}</div>
          </div>

          <div className="CheckresultInlineItem">
            <div className="CheckresultTopic">학과</div>
            <div className="CheckresultText">depart{generatedDepart}</div>
          </div>
        </div>
        <div className="CheckresultInline">
          <div className="CheckresultInlineItem">
            <div className="CheckresultTopic">MBTI</div>
            <div className="CheckresultText">mbti{generatedMbti}</div>
          </div>
          <div className="CheckresultInlineItem">
            <div className="CheckresultTopic">좋아하는 노래</div>
            <div className="CheckresultText">song{generatedSong}</div>
          </div>
        </div>
        <div className="CheckresultBottom">dd{generatedPhone}</div>
      </div>
    </div>
  );
}

export default Checkresult;
