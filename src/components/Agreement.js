import React, { Fragment, useState } from "react";
import AgreementBox from "./AgreementBox";

function Agreement({ registerCheck, setRegisterCheck }) {
  const handleAgreement = () => {
    setRegisterCheck((prev) => ({
      ...prev,
      showregister: !prev.showregister,
    }));
  };

  const handlePrivacyCheckboxChange = () => {
    setRegisterCheck((prev) => ({
      ...prev,
      check: !prev.check,
    }));
  };
  return (
    <Fragment>
      <div className="checkbox-label">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
            margin: "10px 0",
          }}
        >
          <input
            type="checkbox"
            checked={registerCheck.isCheckedPrivacy}
            onChange={handlePrivacyCheckboxChange}
            style={{
              width: "13px",
              textAlign: "center",
            }}
          />
          <div
            style={{
              paddingTop: "2px",
            }}
          >
            개인정보 수집 및 이용에 대해 동의합니다
          </div>
        </label>
      </div>
      <div className="privacy-button" onClick={handleAgreement}>
        개인정보 수집 활용 동의서
      </div>
      {registerCheck.showregister && (
        <AgreementBox handleCloseAgreement={handleAgreement} />
      )}
    </Fragment>
  );
}

export default Agreement;
