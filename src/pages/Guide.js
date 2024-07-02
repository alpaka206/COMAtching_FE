import React from "react";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

// 단순한 가이드북 페이지인데 이것도 당시 시간 부족으로 그냥 큰 이미지 하나 넣었습니다. 수정필요해보입니다.

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
