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
  const [selectedMBTI, setSelectedMBTI] = useRecoilState(selectedMBTIState); // 선택한 MBTI 저장
  const [currentUserState, setCurrentUserState] = useRecoilState(userState); // 선택한 정보 저장
  // 질문 보여줬는지, 대답이 보여졌는지 상태 확인
  const [showQuestions, setShowQuestions] = useState([
    [false, false],
    [false, false],
    [false, false],
    [false, false],
    [false, false],
  ]);
  // 질문 리스트
  const questions = [
    "Q1. 약속이 취소되었을 때",
    "Q2. 1분 동안 아무 생각 하지마!",
    "Q3. 나 넘어졌어 아파 😭",
    "Q4. 여행 계획을 세울 때",
    "Q5. 얼마나 자주 연락하시나요?",
  ];

  // 보여질 질문 선택지들
  // 1~4는 질문1, 질문2, 앞에 보일 MBTI1, 앞에 보일 MBTI2, MBTI 카테고리
  // 연락은 그냥 질문1, 질문2, 질문3
  const [showMbtiAnswers, setShowMbtiAnswers] = useState([
    ["다른 친구들과 놀러 갈까?", "혼자 집에서 쉬는 게 최고야.", "E", "I", "EI"],
    ["무한한 공간을 생각한다", "진짜 아무 생각 안한다", "N", "S", "SN"],
    ["많이 다쳤어?", "병원 가봤어?", "F", "T", "TF"],
    ["계획에 수긍할게.", "찾아보고 제안해봐야지.", "P", "J", "PJ"],
    [
      "나는 연락을 자주해",
      "나는 연락을 평균적으로 해",
      "나는 연락을 자주 안해",
      "",
      "",
    ],
  ]);
  const [chooseAnswer, setChooseAnswer] = useState(null); // 어떤 선택지를 골랐는지 저장
  const [questionNum, setQuestionNum] = useState(0); // 현재 몇번째 질문인지 저장
  const [showAnswerBox, setShowAnswerBox] = useState(false); // 질문 타이핑이 끝나면 선택지가 나오도록 상태 저장

  // 주어진 인덱스의 질문을 표시
  const handleShowQuestion = (index) => {
    setShowQuestions((prevShowQuestions) => {
      const updatedQuestions = [...prevShowQuestions];
      updatedQuestions[index][0] = true;
      return updatedQuestions;
    });
    setQuestionNum(index);
  };

  // 주어진 인덱스의 질문을 완료로 표시
  const handleQuestionComplete = (index) => {
    setShowQuestions((prevShowQuestions) => {
      const updatedQuestions = [...prevShowQuestions];
      updatedQuestions[index][1] = true;
      return updatedQuestions;
    });
  };
  const chatMessageRef = useRef(null);

  // 새로운 질문이 나타날 때마다 채팅창을 맨 아래로 스크롤
  useEffect(() => {
    if (chatMessageRef.current) {
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  }, [showQuestions]);

  // MBTI를 저장한 후 취미 페이지로 이동
  const navigatehobby = () => {
    setCurrentUserState((prev) => ({
      ...prev,
      mbti: `${selectedMBTI.EI}${selectedMBTI.SN}${selectedMBTI.TF}${selectedMBTI.PJ}`,
    }));
    navigate("/hobby");
  };
  return (
    <div className="container">
      <HeaderNav />
      <div className="chat-message" ref={chatMessageRef}>
        <div className="ProfileBuilder">
          <TypeAnimation
            sequence={[
              "반가워요! Comatching AI가 매칭 상대를 찾기 위한 몇가지 간단한 질의응답을 진행하겠습니다. 😊",
              1000,
              () => handleShowQuestion(0),
            ]}
            speed={85}
            className="typing-animation"
            cursor={false}
          />
        </div>

        {showQuestions[0][0] && (
          <Fragment>
            <div className="ProfileBuilder">
              <TypeAnimation
                sequence={[questions[0], 1000, () => setShowAnswerBox(true)]}
                speed={85}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[0][1] && (
              <div className="ProfileBuilder-answer">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[0][chooseAnswer],
                    1000,
                    () => setShowAnswerBox(false),
                    () => handleShowQuestion(1),
                  ]}
                  speed={85}
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
                speed={85}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[1][1] && (
              <div className="ProfileBuilder-answer">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[1][chooseAnswer],
                    1000,
                    () => setShowAnswerBox(false),
                    () => handleShowQuestion(2),
                  ]}
                  speed={85}
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
                speed={85}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[2][1] && (
              <div className="ProfileBuilder-answer">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[2][chooseAnswer],
                    1000,
                    () => setShowAnswerBox(false),
                    () => handleShowQuestion(3),
                  ]}
                  speed={85}
                  className="typing-animation "
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
                speed={85}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[3][1] && (
              <div className="ProfileBuilder-answer">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[3][chooseAnswer],
                    1000,
                    () => setShowAnswerBox(false),
                    () => handleShowQuestion(4),
                  ]}
                  speed={85}
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
                speed={85}
                className="typing-animation"
                cursor={false}
              />
            </div>
            {showQuestions[4][1] && (
              <div className="ProfileBuilder-answer">
                <TypeAnimation
                  sequence={[
                    showMbtiAnswers[4][chooseAnswer],
                    1000,
                    () => setShowAnswerBox(false),
                    () => navigatehobby(),
                  ]}
                  speed={85}
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
          {
            /* 4 이하면 mbti 아니면 연락 빈도 */
          }(
            questionNum < 4 ? (
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
            )
          )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfileBuilder;
