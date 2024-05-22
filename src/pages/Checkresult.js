import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import "./Checkresult.css";
import { useRecoilState } from "recoil";
import { checkresultState } from "../Atoms";
import UserInfoRrev from "../components/UserInfoRrev";
import ResultReview from "../components/ResultReview";
import { useNavigate } from "react-router-dom";

function Checkresult() {
  const navigate = useNavigate();
  const [isReview, setIsReview] = useRecoilState(checkresultState);
  const currentTime = new Date();
  useEffect(() => {
    // setIsReview([]);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://catholic-mibal.site/user/comatch-history",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (
          response.data.code === "SEC-001" ||
          response.data.code === "SEC-002"
        ) {
          localStorage.removeItem("token");
        } else if (response.status === 200) {
          setIsReview(response.data.data.history_list);
        } else if (response.data.code === "HIS-001") {
          alert("결과가 남아있지 않습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors if needed
      }
    };

    fetchData(); // Call the async function immediately
  }, []);
  function convertUSToKST(USDate) {
    // 미국 시간을 UTC로 변환
    var UTCDate = new Date(USDate);
    // UTC에 16시간 (9시간: 미국과 한국의 시차 + 7시간: 미국과 UTC의 시차)을 더하여 한국 시간으로 변환
    var KSTDate = new Date(UTCDate.getTime() + 9 * 60 * 60 * 1000);
    return KSTDate;
  }
  return (
    <div>
      <div className="container">
        <HeaderNav />
        <div className="checkresult-content">
          {isReview.map((item, index) => (
            <div key={index}>
              <UserInfoRrev user={item.enemy_info} />

              {item.feedback_state === "IN_PROGRESS" &&
                convertUSToKST(new Date(item.create_time)) >
                  new Date(currentTime.getTime() - 60 * 60 * 1000) && (
                  <ResultReview user={item} setIsReview={setIsReview} />
                )}
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Checkresult;
