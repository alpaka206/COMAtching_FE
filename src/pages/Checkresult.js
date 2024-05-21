import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import "./Checkresult.css";
import { useRecoilState } from "recoil";
import { checkresultState } from "../Atoms";
import UserInfoRrev from "../components/UserInfoRrev";
import ResultReview from "../components/ResultReview";

function Checkresult() {
  const [isReview, setIsReview] = useRecoilState(checkresultState);
  useEffect(() => {
    // setIsReview([]);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://catholic-mibal.site/user/comatch_histroy",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        if (
          response.data.code === "SEC-001" ||
          response.data.code === "SEC-002"
        ) {
          localStorage.removeItem("token");
        } else if (response.status === 200) {
          setIsReview(response.data.data.comatch_history);
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
              <UserInfoRrev user={item} />

              {item.isFeedback === "IN_PROGRESS" && (
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
