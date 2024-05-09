import React, { Fragment, useEffect, useRef, useState } from "react";
import "../css/pages/ProfileBuilder.css";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import { TypeAnimation } from "react-type-animation";
import MBTIMaker from "../components/MBTIMaker";
import { useRecoilState } from "recoil";
import { selectedMBTIState, userState } from "../Atoms";
import { useNavigate } from "react-router-dom";
import AgeMaker from "../components/AgeMaker";

const ProfileBuilder = () => {
  const navigate = useNavigate();
  const [selectedMBTI, setSelectedMBTI] = useRecoilState(selectedMBTIState);
  const [currentUserState, setCurrentUserState] = useRecoilState(userState);

  const [showQuestions, setShowQuestions] = useState([
    [false, false],
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
    "Q5. 당신의 연락빈도는 어떤가요?",
  ];
  const [showMbtiAnswers, setShowMbtiAnswers] = useState([
    ["나는 외향적이야.", "나는 내향적이야.", "E", "I", "EI"],
    ["나는 상상력이 좋아.", "나는 현재에 집중하는 편이야", "N", "S", "SN"],
    ["나는 감성적이야", "나는 현실적이야", "F", "T", "TF"],
    ["나는 즉흥적이야", "나는 계획적이야", "P", "J", "PJ"],
    ["나는 적은편이야", "나는 중간이야", "나는 많은편이야", "", ""],
  ]);
  const [chooseAnswer, setChooseAnswer] = useState(null);
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
      console.log("Selected MBTI:", selectedMBTI);
      return updatedQuestions;
    });
  };
  const chatMessageRef = useRef(null);
  useEffect(() => {
    if (chatMessageRef.current) {
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  }, [showQuestions]);
  const navigatehobby = () => {
    setCurrentUserState((prev) => ({
      ...prev,
      mbti: `${selectedMBTI.EI}${selectedMBTI.SN}${selectedMBTI.TF}${selectedMBTI.PJ}`,
    }));
    navigate("/Hobby");
  };
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
                    showMbtiAnswers[0][chooseAnswer],
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
                    showMbtiAnswers[1][chooseAnswer],
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
                    showMbtiAnswers[2][chooseAnswer],
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
                    showMbtiAnswers[3][chooseAnswer],
                    1000,
                    () => setShowAnswerBox(false),
                    () => handleShowQuestion(4),
                  ]}
                  speed={65}
                  className="typing-animation"
                  cursor={false}
                />
              </div>
            )}
          </Fragment>
        )}
        {showQuestions[4][0] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[questions[4], 1000, () => setShowAnswerBox(true)]}
                speed={65}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[4][1] && (
              <div className="ProfileBuilder">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[4][chooseAnswer],
                    1000,
                    () => setShowAnswerBox(false),
                    () => navigatehobby(),
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
        {showAnswerBox &&
          (questionNum < 4 ? (
            <MBTIMaker
              mbtiAnswers={showMbtiAnswers}
              questionNum={questionNum}
              handleQuestionComplete={handleQuestionComplete}
              setSelectedMBTI={setSelectedMBTI}
              setChooseAnswer={setChooseAnswer}
            />
          ) : (
            <AgeMaker
              handleQuestionComplete={handleQuestionComplete}
              setCurrentUserState={setCurrentUserState}
              currentUserState={currentUserState}
              setChooseAnswer={setChooseAnswer}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProfileBuilder;
