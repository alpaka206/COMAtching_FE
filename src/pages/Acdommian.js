import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";
import AdminModal from "../components/AdminModal";

function Acdommian() {
  const [showModal, setShowModal] = useState(true);
  const [adminPassword, setAdminPassword] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [formPasswd, setFormPasswd] = useState({
    phone: "",
    passwd: "",
  });
  const handlePasswordSubmit = async (enteredPassword) => {
    try {
      const response = await axios.get(
        `https://onesons.site/inquiry/passwd?password=${enteredPassword}`
      );

      if (response.data === "valid") {
        setAdminPassword(enteredPassword);
      } else {
        alert("올바르지 않은 비밀번호입니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  // const handlePasswordSubmit = (enteredPassword) => {
  //   if (enteredPassword === "1234") {
  //     setShowModal(false);
  //     setAdminPassword(enteredPassword);
  //   } else {
  //     alert("올바르지 않은 비밀번호입니다.");
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPasswd((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitFindPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `/adminSearchPhone?phone=${formPasswd.phone}`
      );
      console.log(response.data);
      const retrievedPassword = response.data;

      setPassword(retrievedPassword);
      alert(retrievedPassword);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleSubmitChangeOpportunity = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/adminButton", formPasswd);

      console.log(response.data);
      const retrievedresult = response.data;

      setResult(retrievedresult);
      alert(retrievedresult);
      // Handle the response as needed
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onPasswordSubmit={handlePasswordSubmit}
      />
      {adminPassword && (
        <div>
          <div className="content">
            <form>
              <label>
                <h4 className="findpasswd">연락처를 적으세요</h4>
                <input
                  type="text"
                  className="findpasswd"
                  value={formPasswd.phone}
                  name="phone"
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
              </label>
              <button type="submit-button" onClick={handleSubmitFindPassword}>
                비밀번호 찾기
              </button>
            </form>

            {password && (
              <div>
                <h4>찾은 비밀번호 :</h4>
                <p>{password}</p>
              </div>
            )}
          </div>
          <div className="content">
            <form>
              <label>
                <h4 className="findpasswd">비밀번호를 적으세요</h4>
                <input
                  type="text"
                  className="findpasswd"
                  value={formPasswd.passwd}
                  name="passwd"
                  onChange={handleChange}
                />
                <h4 className="findpasswd">pick me 기회 증가</h4>
                <input
                  type="text"
                  className="findpasswd"
                  value={formPasswd.choose}
                  name="choose"
                  onChange={handleChange}
                />
                <h4 className="findpasswd">pick someone 기회 증가</h4>
                <input
                  type="text"
                  className="findpasswd"
                  value={formPasswd.chance}
                  name="chance"
                  onChange={handleChange}
                />
              </label>
              <button
                type="submit-button"
                onClick={handleSubmitChangeOpportunity}
              >
                뽑기 횟수 변경
              </button>
              <div>
                <h4>결과 : </h4>
                <p>{result}</p>
              </div>
            </form>
          </div>
          <div>
            <div
              className="textDB"
              style={{
                paddingTop: "0px",
              }}
            >
              Developed by COMA 19s
            </div>
            <hr
              style={{
                backgroundColor: "#464646",
                height: "1px",
              }}
            />
            <div
              className="textBE"
              style={{
                paddingBottom: "40px",
              }}
            >
              BE 서승준 / FE 김규원 신희원 / PM 박승원 박상준
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Acdommian;
