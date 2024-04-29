import React, { Fragment, useEffect, useRef, useState } from "react";
import "../css/pages/ProfileBuilder.css";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import { TypeAnimation } from "react-type-animation";

function ProfileBuilder() {
  const [showQuestions, setShowQuestions] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [showAnswers] = useState([
    ["1사교적이고 활발한 편", "1내성적이고 조용한 편"],
    ["2사교적이고 활발한 편", "2내성적이고 조용한 편"],
    ["3사교적이고 활발한 편", "3내성적이고 조용한 편"],
    ["4사교적이고 활발한 편", "4내성적이고 조용한 편"],
    ["5사교적이고 활발한 편", "5내성적이고 조용한 편"],
    ["6사교적이고 활발한 편", "6내성적이고 조용한 편"],
  ]);
  const [questionNum, setQuestionNum] = useState(0);
  const handleQuestionComplete = (index) => {
    setShowQuestions((prevShowQuestions) => {
      const updatedQuestions = [...prevShowQuestions];
      updatedQuestions[index] = true;
      return updatedQuestions;
    });
    setQuestionNum((prevQuestionNum) => index);
  };
  const chatMessageRef = useRef(null);
  useEffect(() => {
    if (chatMessageRef.current) {
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  }, [showQuestions]);
  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="처음으로" />
      <div className="chat-message" ref={chatMessageRef}>
        <div className="ProfileBuilder">
          <TypeAnimation
            sequence={[
              "반가워요! 저는 Comatching AI 입니다.\n진행하기 전에, 먼저 당신에 대해 알아야 해요.\n\n 간단한 MBTI 검사부터 시작할게요. 😊",
              1000,
              () => handleQuestionComplete(0),
            ]}
            speed={65}
            className="typing-animation"
            cursor={false}
          />
        </div>
        {showQuestions[0] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[
                  "Q1. 당신은 사용자와 어떻게 상호작용 하시나요?",
                  1000,
                ]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
          </Fragment>
        )}
        {showQuestions[1] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[showAnswers[questionNum - 1][0], 1000]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[
                  "Q2. 당신은 사용자와 어떻게 상호작용 하시나요?",
                  1000,
                ]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
          </Fragment>
        )}
        {showQuestions[2] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[showAnswers[questionNum - 1][0], 1000]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[
                  "Q3. 당신은 사용자와 어떻게 상호작용 하시나요?",
                  1000,
                ]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
          </Fragment>
        )}
        {showQuestions[3] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[showAnswers[questionNum - 1][0], 1000]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[
                  "Q4. 당신은 사용자와 어떻게 상호작용 하시나요?",
                  1000,
                ]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
          </Fragment>
        )}
        {showQuestions[4] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[showAnswers[questionNum - 1][0], 1000]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[
                  "Q5. 당신은 사용자와 어떻게 상호작용 하시나요?",
                  1000,
                ]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
          </Fragment>
        )}
        {showQuestions[5] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[showAnswers[questionNum - 1][0], 1000]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[
                  "Q6. 당신은 사용자와 어떻게 상호작용 하시나요?",
                  1000,
                ]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
          </Fragment>
        )}
      </div>
      <div className="ProfileMaker">
        <div className="ProfileMaker-text">내 답변</div>
        <button className="profilemaker-choose-button">
          <div className="profilemaker-button-title">E</div>
          <div>{showAnswers[questionNum][0]}</div>
        </button>
        <button className="profilemaker-choose-button">
          <div className="profilemaker-button-title">I</div>
          <div>{showAnswers[questionNum][1]}</div>
        </button>
        <button
          className="profilemaker-submit-button"
          onClick={() => handleQuestionComplete(questionNum + 1)}
        >
          전송
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileBuilder;
