import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import "../css/pages/Checkresult.css";
import { useRecoilState } from "recoil";
import { checkresultState } from "../Atoms";
import UserInfoRrev from "../components/UserInfoRrev";
import ResultReview from "../components/ResultReview";
import { useNavigate } from "react-router-dom";
import convertUSToKST from "../components/convertUSToKST";
// 뽑은 결과를 볼수 있는 페이지 입니다.
function Checkresult() {
  const navigate = useNavigate();
  const [isReview, setIsReview] = useRecoilState(checkresultState); // 결과 리뷰 상태 관리
  const currentTime = new Date(); // 현재 시간
  useEffect(() => {
    // 결과 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await axios.get("/user/comatch-history");
        if (response.status === 200) {
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
