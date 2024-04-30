import React, { Fragment, useEffect, useRef, useState } from "react";
import "../css/pages/ProfileBuilder.css";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import { TypeAnimation } from "react-type-animation";
import MBTIMaker from "../components/MBTIMaker";

const ProfileBuilder = () => {
  const [showQuestions, setShowQuestions] = useState([
    [false, false],
    [false, false],
    [false, false],
    [false, false],
  ]);
  const questions = [
    "Q1. 당신은 친구들과 놀때 어떤가요?",
    "Q2. 당신은 어떤 쪽으로 탁월한가요?",
    "Q3. 당신은 감성적인가요, 현실적인가요?",
    "Q4. 당신은 계획적인가요, 즉흥적인가요?",
    "Q5. 당신은 몇살인가요?",
    "Q6. 당신의 ",
  ];
  const [showMbtiAnswers, setShowMbtiAnswers] = useState([
    ["나는 외향적이야.", "나는 내향적이야.", "E", "I"],
    ["나는 상상력이 좋아.", "나는 현재에 집중하는 편이야", "N", "S"],
    ["나는 감성적이야", "나는 현실적이야", "F", "T"],
    ["나는 즉흥적이야", "나는 계획적이야", "P", "J"],
  ]);
  const [questionNum, setQuestionNum] = useState(0);
  const [showAnswerBox, setShowAnswerBox] = useState(false);

  const handleShowQuestion = (index) => {
    setShowQuestions((prevShowQuestions) => {
      const updatedQuestions = [...prevShowQuestions];
      updatedQuestions[index][0] = true;
      return updatedQuestions;
    });
    setQuestionNum(index);
  };

  const handleQuestionComplete = (index) => {
    setShowQuestions((prevShowQuestions) => {
      const updatedQuestions = [...prevShowQuestions];
      updatedQuestions[index][1] = true;
      return updatedQuestions;
    });
    // handleShowQuestion(index + 1); // 다음 질문 보이기
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
              () => handleShowQuestion(0),
            ]}
            speed={75}
            className="typing-animation"
            cursor={false}
          />
        </div>

        {showQuestions[0][0] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[questions[0], 1000, () => setShowAnswerBox(true)]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[0][1] && (
              <div className="ProfileBuilder">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[0][0],
                    1000,
                    () => setShowAnswerBox(false),
                    () => handleShowQuestion(1),
                  ]}
                  speed={65}
                  className="typing-animation"
                  cursor={false}
                />
              </div>
            )}
          </Fragment>
        )}
        {showQuestions[1][0] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[questions[1], 1000, () => setShowAnswerBox(true)]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[1][1] && (
              <div className="ProfileBuilder">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[1][0],
                    1000,
                    () => setShowAnswerBox(false),
                    () => handleShowQuestion(2),
                  ]}
                  speed={65}
                  className="typing-animation"
                  cursor={false}
                />
              </div>
            )}
          </Fragment>
        )}
        {showQuestions[2][0] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[questions[2], 1000, () => setShowAnswerBox(true)]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[2][1] && (
              <div className="ProfileBuilder">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[2][0],
                    1000,
                    () => setShowAnswerBox(false),
                    () => handleShowQuestion(3),
                  ]}
                  speed={65}
                  className="typing-animation"
                  cursor={false}
                />
              </div>
            )}
          </Fragment>
        )}
        {showQuestions[3][0] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[questions[3], 1000, () => setShowAnswerBox(true)]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[3][1] && (
              <div className="ProfileBuilder">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[3][0],
                    1000,
                    () => setShowAnswerBox(false),
                  ]}
                  speed={65}
                  className="typing-animation"
                  cursor={false}
                />
              </div>
            )}
          </Fragment>
        )}
      </div>
      <div className="Answer-box">
        {showAnswerBox && (
          <MBTIMaker
            mbtiAnswers={showMbtiAnswers}
            questionNum={questionNum}
            handleQuestionComplete={handleQuestionComplete}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfileBuilder;
