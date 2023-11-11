import "./Mcaotmcapresult.css";
import ComatHeader from "../components/ComatHeader";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

function Mcaotmcapresult() {
  const location = useLocation();
  const generatedPhone = location.state?.generatedPhone;
  const generatedDepart = location.state?.generatedDepart;
  const generatedSong = location.state?.generatedSong;
  const generatedYear = location.state?.generatedYear;
  const generatedMbti = location.state?.generatedMbti;
  const generatedCode = location.state?.generatedCode;
  const isPhoneNumberStartsWith010 =
    generatedPhone && generatedPhone.slice(0, 3) === "010";
  return (
    <div className="container">
      <ComatHeader destination="/" buttonText="처음으로" />
      <div className="content">
        {generatedCode === 2002 ? (
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "24px" }}>
              이성이 데이터에 한명도 없습니다
            </span>
          </div>
        ) : (
          <div>
            <div className="McaotmcapresultTop">COMAtching 결과!</div>
            <div className="McaotmcapresultTopic">| 전공</div>
            <div className="McaotmcapresultText">{generatedDepart}</div>
            <div className="McaotmcapresultTopic">| 학번</div>
            <div className="McaotmcapresultText">{generatedYear}</div>
            <div className="McaotmcapresultTopic">| 좋아하는 노래</div>
            <div className="McaotmcapresultText">{generatedSong}</div>
            <div className="McaotmcapresultTopic">| 상대방의 MBTI</div>
            <div className="McaotmcapresultMbtitext">
              {generatedMbti}{" "}
              {generatedCode === 2001 && (
                <span style={{ fontSize: "15px", color: "#FF775E" }}>
                  조건에 맞는 상대가 없어서 랜덤으로 매칭되었어요!
                </span>
              )}
              {generatedCode !== 2001 && <span> </span>}
            </div>
            {isPhoneNumberStartsWith010 ? (
              <div className="McaotmcapresultInstaTopic">Phone_number</div>
            ) : (
              <div className="McaotmcapresultInstaTopic">Instagram</div>
            )}
            <div className="McaotmcapresultInstaText">{generatedPhone}</div>
            <div className="McaotmcapresultBottom">
              comatching.result(you, partner);
            </div>
          </div>
        )}{" "}
      </div>
      <Footer />
    </div>
  );
}

export default Mcaotmcapresult;
