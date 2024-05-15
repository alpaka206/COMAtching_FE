import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import "./Checkresult.css";
import Mainpage from "./Mainpage";
import { useRecoilState } from "recoil";
import { generatedDataState, userState } from "../Atoms";
function Checkresult() {
  const [formData, setFormData] = useRecoilState(userState);
  const [generatedData, setGeneratedData] = useRecoilState(generatedDataState);
  const alarmUrl = () => {
    alert("url강제 이동시 로그아웃 후 로그인 페이지로 이동됩니다.");
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://onesons.site/inquiry", {
        params: {
          passwd: formData.passwd,
        },
      });
      const data = response.data.result || [];
      setGeneratedData(data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div>
      {formData.isLoggedIn ? (
        <div className="container">
          <HeaderNav />
          <div className="checkresult-content">
            {generatedData.map((item, index) => (
              <div key={index} className="CheckresultItem">
                <div className="CheckresultTopline">
                  <div className="CheckresultInlineItem">
                    <div className="CheckresultTopic">학번</div>
                    <div className="CheckresultText">{item.year}</div>
                  </div>
                  <div className="CheckresultInlineItem">
                    <div className="CheckresultTopic">학과</div>
                    <div className="CheckresultText">{item.depart}</div>
                  </div>
                </div>
                <div className="CheckresultInline">
                  <div className="CheckresultInlineItem">
                    <div className="CheckresultTopic">MBTI</div>
                    <div className="CheckresultText">{item.mbti}</div>
                  </div>
                  <div className="CheckresultInlineItem">
                    <div className="CheckresultTopic">좋아하는 노래</div>
                    <div className="CheckresultText">{item.song}</div>
                  </div>
                </div>
                <div className="CheckresultBottom">{item.phone}</div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      ) : (
        <>
          {alarmUrl()}
          <Mainpage />
        </>
      )}
    </div>
  );
}

export default Checkresult;
