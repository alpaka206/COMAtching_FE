import React from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="textDB" style={{ paddingTop: "0px" }}>
        Developed by COMA 19s
      </div>
      <hr
        style={{
          backgroundColor: "#464646",
          height: "1px",
        }}
      />
      <div className="textBE" style={{ paddingBottom: "40px" }}>
        BE 서승준 / FE 김규원 신희원 / PM 박승원 박상준
      </div>
    </div>
  );
}

export default Footer;
