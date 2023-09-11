import React, { useState } from "react";
import axios from "axios";
import "./Mcaotmcap.css";
import { useNavigate } from "react-router-dom";

function Mcaotmcap() {
  const navigate = useNavigate();
  const [contactMethod, setContactMethod] = useState("phone");
  const [selectedEI, setSelectedEI] = useState("");
  const [selectedPJ, setSelectedPJ] = useState("");
  const [formData, setFormData] = useState({
    depart: "",
    year: "",
    phone: "",
    song: "",
    gender: true,
    mbti: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [isContactVerified, setIsContactVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "year") {
      if (/^\d{0,2}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        alert("학번은 2자리의 숫자로 입력하세요. (예: 22)");
      }
    } else if (name === "phone" && contactMethod === "phone") {
      if (/^\d{0,11}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        alert("(-)없이 전화번호를 입력하세요. (예: 01012345678)");
      }
    } else if (name === "phone" && contactMethod === "insta") {
      if (/^[a-z0-9_.]{0,30}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        alert("인스타 아이디는 영어,숫자,언더바(_),마침표(.)만 가능합니다.");
      }
    } else if (name === "song") {
      if (/^.{0,30}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        alert("최대 30자 입력가능합니다.");
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleContactMethod = (method) => {
    setContactMethod(method);
  };

  const handleGenderSelection = (value) => {
    setFormData({
      ...formData,
      gender: value === "male" ? true : false,
    });
  };

  const handleMBTISelection = (value) => {
    const category =
      value === "E" || value === "I"
        ? "EI"
        : value === "S" || value === "N"
        ? "SN"
        : value === "T" || value === "F"
        ? "TF"
        : "PJ";

    // Update the corresponding state variable with the selected value
    if (category === "EI") {
      setSelectedEI(value);
    } else if (category === "PJ") {
      setSelectedPJ(value);
    }

    // Update formData's mbti with the selected preferences
    setFormData((prevFormData) => ({
      ...prevFormData,
      mbti: `${category === "EI" ? value : selectedEI}${
        category === "PJ" ? value : selectedPJ
      }`,
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedMajor("");
    setFormData({
      ...formData,
      depart: e.target.value,
    });
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
    setFormData({
      ...formData,
      depart: e.target.value,
    });
  };

  const checkIfExists = async () => {
    const response = await axios.get(
      `https://onesons.site/register?phone=${formData.phone}`
    );
    return response;
  };

  const handleCheck = async () => {
    const response = await checkIfExists();
    const alreadyExists = response.data;
    if (alreadyExists) {
      alert(
        `이미 존재하는 ${
          contactMethod === "phone" ? "전화번호" : "인스타그램 ID"
        }입니다.`
      );
    } else {
      alert(
        `입력한 ${
          contactMethod === "phone" ? "전화번호" : "인스타그램 ID"
        }는 사용 가능합니다.`
      );
      setIsContactVerified(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const yearAsInt = parseInt(formData.year, 10);
    if (!formData.depart || !selectedMajor) {
      alert("학과와 전공을 선택하세요.");
      return;
    }
    if (!/^\d{11}$/.test(formData.phone) && contactMethod === "phone") {
      alert("전화번호는 11자리를 입력해주세요");
      return;
    }
    // Check if the conversion was successful
    if (isNaN(yearAsInt)) {
      alert("올바른 학번을 입력해주세요 (1부터 23까지 가능).");
      return;
    }

    if (yearAsInt < 0 || yearAsInt > 23) {
      alert("올바른 학번을 입력해주세요 (1부터 23까지 가능).");
      return;
    }
    if (formData.song.length > 30 || formData.song.length < 1) {
      alert("최대 30자 이내로 좋아하는 노래를 입력해주세요.");
      return;
    }

    // Check if all MBTI preferences are selected
    if (formData.mbti.length !== 4) {
      alert("MBTI를 모두 선택해주세요.");
      return;
    }
    // Create a copy of formData with 'year' as integer
    const formDataWithIntYear = {
      ...formData,
      year: yearAsInt,
    };

    try {
      const response = await axios.post(
        "https://onesons.site/register",
        formDataWithIntYear
      );
      const generatedPassword = response.data.result.passwd;
      const generatedSuccess = response.data.isSuccess;
      const generatedMessage = response.data.message;
      //   console.log("비밀번호 보기1: ", generatedPassword);
      //   console.log("메시지1: ", generatedSuccess);
      //   console.log("메시지2: ", response.data);
      //   console.log("메시지3: ", response.data.message);
      //   console.log("메시지3: ", response.data.isSuccess);
      if (generatedSuccess === true) {
        navigate("/Complete", { state: { generatedPassword } });
      } else {
        alert(generatedMessage);

        return;
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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
        <div className="content">
          <div>
            <label>
              <h4>비밀번호를 입력하세요.</h4>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="00학번부터 23학번까지 가능합니다 ex)23"
              />
            </label>
          </div>

          <div>
            <label>
              <h4>원하는 매칭상대를 선택하세요!</h4>
              <button
                type="button"
                class="genderbutton"
                value="male"
                onClick={() => handleGenderSelection("male")}
                style={{
                  backgroundColor: formData.gender ? "#ff775e" : "#ffffff",
                  color: formData.gender ? "#ffffff" : "#A5A5A5",
                  border: formData.gender ? "none" : "2px solid #e0e0e0",
                }}
              >
                남자
              </button>
              <button
                type="button"
                class="genderbutton"
                value="female"
                onClick={() => handleGenderSelection("female")}
                style={{
                  backgroundColor: formData.gender ? "#ffffff" : "#ff775e",
                  color: formData.gender ? "#A5A5A5" : "#ffffff",
                  border: formData.gender ? "2px solid #e0e0e0" : "none",
                }}
              >
                여자
              </button>
            </label>
          </div>
          <div className="mbtidiv">
            <label>
              <div style={{ display: "flex" }}>
                <div>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("E")}
                    style={{
                      backgroundColor: formData.mbti.includes("E")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("E")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("E")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    E
                  </button>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("I")}
                    style={{
                      backgroundColor: formData.mbti.includes("I")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("I")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("I")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    I
                  </button>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("Z")}
                    style={{
                      backgroundColor: formData.mbti.includes("Z")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("Z")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("Z")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    선택 안함
                  </button>
                </div>

                {/* 네 번째 열 */}
                <div>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("P")}
                    style={{
                      backgroundColor: formData.mbti.includes("P")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("P")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("P")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    P
                  </button>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("J")}
                    style={{
                      backgroundColor: formData.mbti.includes("J")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("J")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("J")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    J
                  </button>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("Z")}
                    style={{
                      backgroundColor: formData.mbti.includes("Z")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("Z")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("Z")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    선택 안함
                  </button>
                </div>
              </div>
            </label>
          </div>

          <button type="submit-button" disabled={!isContactVerified}>
            <img src={process.env.PUBLIC_URL + `assets/heart.png`} alt="전송" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Mcaotmcap;
