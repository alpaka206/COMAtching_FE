import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import Footer from "../components/Footer";
import ComatHeader from "../components/ComatHeader";
import { generatedDataState } from "../Atoms";
import "./Checkresult.css";

function Checkresult() {
  const [generatedData, setGeneratedData] = useRecoilState(generatedDataState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/inquiry");
      const data = response.data.result || [];
      setGeneratedData(data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <ComatHeader destination="/" buttonText="처음으로" />
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
  );
}

export default Checkresult;
