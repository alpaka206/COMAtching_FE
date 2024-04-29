import React, { useEffect, useRef, useState } from "react";
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

  const handleQuestionComplete = (index) => {
    setShowQuestions((prevShowQuestions) => {
      const updatedQuestions = [...prevShowQuestions];
      updatedQuestions[index] = true;
      return updatedQuestions;
    });
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
          <div className="ProfileBuilder">
            <TypeAnimation
              sequence={[
                "Q1. 당신은 사용자와 어떻게 상호작용 하시나요?",
                1000,
                () => handleQuestionComplete(1),
              ]}
              speed={65}
              className="typing-animation"
              cursor={false}
            />
          </div>
        )}
        {showQuestions[1] && (
          <div className="ProfileBuilder">
            <TypeAnimation
              sequence={[
                "Q2. 당신은 사용자와 어떻게 상호작용 하시나요?",
                1000,
                () => handleQuestionComplete(2),
              ]}
              speed={65}
              className="typing-animation"
              cursor={false}
            />
          </div>
        )}
        {showQuestions[2] && (
          <div className="ProfileBuilder">
            <TypeAnimation
              sequence={[
                "Q3. 당신은 사용자와 어떻게 상호작용 하시나요?",
                1000,
                () => handleQuestionComplete(3),
              ]}
              speed={65}
              className="typing-animation"
              cursor={false}
            />
          </div>
        )}
        {showQuestions[3] && (
          <div className="ProfileBuilder">
            <TypeAnimation
              sequence={[
                "Q4. 당신은 사용자와 어떻게 상호작용 하시나요?",
                1000,
                () => handleQuestionComplete(4),
              ]}
              speed={65}
              className="typing-animation"
              cursor={false}
            />
          </div>
        )}
        {showQuestions[4] && (
          <div className="ProfileBuilder">
            <TypeAnimation
              sequence={[
                "Q5. 당신은 사용자와 어떻게 상호작용 하시나요?",
                1000,
                () => handleQuestionComplete(5),
              ]}
              speed={65}
              className="typing-animation"
              cursor={false}
            />
          </div>
        )}
        {showQuestions[5] && (
          <div className="ProfileBuilder">
            <TypeAnimation
              sequence={["Q6. 당신은 사용자와 어떻게 상호작용 하시나요?", 1000]}
              speed={65}
              className="typing-animation"
              cursor={false}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProfileBuilder;
