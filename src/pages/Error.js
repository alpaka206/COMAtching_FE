import "./Error.css";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

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
          onClick={() => navigate("/Error")}
        >
          조회하기
        </button>
      </div>
      <div className="errortext">
        <h1>09.13일에 공개됩니다</h1>
      </div>
    </div>
  );
}

export default MainPage;
