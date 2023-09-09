import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

function Form() {
  const [formData, setFormData] = useState({
    depart: "",
    year: "",
    phone: "",
    song: "",
    gender: true,
    mbti: "",
  });

  const majorCategories = [
    {
      label: "인문",
      options: [
        "인문계열",
        "국어국문학과",
        "철학과",
        "국사학과",
        "어문계열",
        "영어영문학부",
        "중국언어문화학과",
        "일어일본문화학과",
        "프랑스어문화학과",
        "음악과",
        "종교학과",
        "신학대학(성신교정)",
      ],
    },
    {
      label: "사회",
      options: [
        "사회과학계열",
        "사회복지학과",
        "심리학과",
        "사회학과",
        "특수교육과",
        "경영계열",
        "경영학과",
        "회계학과",
        "국제·법정경계열",
        "국제학부",
        "법학과",
        "경제학과",
        "행정학과",
        "글로벌경영대학",
        "글로벌미래경영학과",
        "세무회계금융학과",
        "IT파이낸스학과",
      ],
    },
    {
      label: "자연",
      options: [
        "자연과학계열",
        "화학과",
        "수학과",
        "물리학과",
        "생활과학계열",
        "공간디자인·소비자학과",
        "의류학과",
        "아동학과",
        "식품영양학과",
        "의생명과학과",
        "약학대학",
        "간호대학(성의교정)",
        "의과대학(성의교정)",
      ],
    },
    {
      label: "공학",
      options: [
        "ICT공학계열",
        "컴퓨터정보공학부",
        "미디어기술콘텐츠학과",
        "정보통신전자공학부",
        "바이오융합공학계열",
        "생명공학과",
        "에너지환경공학과",
        "바이오메디컬화학공학과 ",
        "인공지능학과",
        "데이터사이언스학과",
        "바이오메디컬소프트웨어학과",
      ],
    },
    {
      label: "타학교",
      options: ["??"],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");

  const yearRegex = /^\d+$/;
  const phoneRegex = /^\d{11}$/;
  const songRegex = /^.{0,30}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "year" && !yearRegex.test(value)) {
      alert("학번은 2자리의 숫자로 입력하세요.");
      return;
    }

    if (name === "phone" && !phoneRegex.test(value)) {
      alert("(-)를 제외한 전화번호를 입력하세요. (예: 01012345678)");
      return;
    }

    if (name === "song" && !songRegex.test(value)) {
      alert("좋아하는 노래는 최대 30자까지 입력 가능합니다.");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderSelection = (value) => {
    setFormData({
      ...formData,
      gender: value === "male" ? true : false,
    });
  };

  const handleMBTISelection = (value) => {
    setFormData({
      ...formData,
      mbti: formData.mbti.includes(value)
        ? formData.mbti.replace(value, "")
        : formData.mbti + value,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    //전화번호가 이미 존재하는지 확인
    const response = await axios.get(
      `https://onesons.site/register?phone=${formData.phone}`
      //"https://jsonplaceholder.typicode.com/posts?phone=${formData.phone}`",
    );

    if (response.data.length > 0) {
      alert("이미 존재하는 전화번호입니다.");
      return;
    }

    const yearAsInt = parseInt(formData.year, 10);

    // Check if the conversion was successful
    if (isNaN(yearAsInt)) {
      console.error("학과는 정수를 입력해 주세요");
      return;
    }

    // Create a copy of formData with 'year' as integer
    const formDataWithIntYear = {
      ...formData,
      year: yearAsInt,
    };

    try {
      const response = await axios.post(
        //"https://jsonplaceholder.typicode.com/posts",
        "https://onesons.site/register",
        formDataWithIntYear
      );

      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <h3>학과</h3>
        </label>
        <label>
          <select
            name="depart"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              선택하세요
            </option>
            {majorCategories.map((category) => (
              <option key={category.label} value={category.label}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedCategory && (
        <div>
          <label>
            전공 선택
            <select
              name="year"
              value={selectedMajor}
              onChange={handleMajorChange}
            >
              <option value="" disabled>
                선택하세요
              </option>
              {majorCategories
                .find((category) => category.label === selectedCategory)
                .options.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
            </select>
          </label>
        </div>
      )}
      <div>
        <label>
          학번
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          전화번호
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          좋아하는 노래
          <input
            type="text"
            name="song"
            value={formData.song}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          성별
          <button
            type="button"
            value="male"
            onClick={() => handleGenderSelection("male")}
            style={{
              border: formData.gender ? "2px solid #000" : "none",
            }}
          >
            남자
          </button>
          <button
            type="button"
            value="female"
            onClick={() => handleGenderSelection("female")}
            style={{
              border: !formData.gender ? "2px solid #000" : "none",
            }}
          >
            여자
          </button>
        </label>
      </div>
      <div>
        <label>
          MBTI
          <button
            type="button"
            onClick={() => handleMBTISelection("E")}
            style={{
              border: formData.mbti.includes("E") ? "2px solid #000" : "none",
            }}
          >
            E
          </button>
          <button
            type="button"
            onClick={() => handleMBTISelection("I")}
            style={{
              border: formData.mbti.includes("I") ? "2px solid #000" : "none",
            }}
          >
            I
          </button>
          <button
            type="button"
            onClick={() => handleMBTISelection("S")}
            style={{
              border: formData.mbti.includes("S") ? "2px solid #000" : "none",
            }}
          >
            S
          </button>
          <button
            type="button"
            onClick={() => handleMBTISelection("N")}
            style={{
              border: formData.mbti.includes("N") ? "2px solid #000" : "none",
            }}
          >
            N
          </button>
          <button
            type="button"
            onClick={() => handleMBTISelection("T")}
            style={{
              border: formData.mbti.includes("T") ? "2px solid #000" : "none",
            }}
          >
            T
          </button>
          <button
            type="button"
            onClick={() => handleMBTISelection("F")}
            style={{
              border: formData.mbti.includes("F") ? "2px solid #000" : "none",
            }}
          >
            F
          </button>
          <button
            type="button"
            onClick={() => handleMBTISelection("P")}
            style={{
              border: formData.mbti.includes("P") ? "2px solid #000" : "none",
            }}
          >
            P
          </button>
          <button
            type="button"
            onClick={() => handleMBTISelection("J")}
            style={{
              border: formData.mbti.includes("J") ? "2px solid #000" : "none",
            }}
          >
            J
          </button>
        </label>
      </div>
      <button type="submit">제출</button>
    </form>
  );
}

export default Form;
