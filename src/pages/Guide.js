import React from "react";
import "../css/pages/Guide.css";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
function Guide() {
  return (
    <div className="container">
      <HeaderNav />
      <div className="content">
        <img
          // className="guide-img"
          src={process.env.PUBLIC_URL + `assets/guide.svg`}
          alt="가이드 이미지1"
          style={{
            width: "90%",
            height: "auto",
            paddingTop: "30px",
          }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Guide;
