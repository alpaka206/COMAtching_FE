import React, { useEffect, useState } from "react";

const TextTyping = ({ text, onComplete }) => {
  const [sequence, setSequence] = useState("");
  const [textCount, setTextCount] = useState(0);
  const [isTypingPaused, setIsTypingPaused] = useState(false);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isTypingPaused) {
        setIsTypingPaused(false);
        onComplete();
        clearInterval(typingInterval);
        return;
      }

      const nextChar = text[textCount];
      if (!nextChar) {
        setIsTypingPaused(true);
        clearInterval(typingInterval);
        return;
      }

      if (nextChar === "\n") {
        setSequence((prevSequence) => prevSequence + "<br>");
      } else {
        setSequence((prevSequence) => prevSequence + nextChar);
      }
      setTextCount((prevCount) => prevCount + 1);
    }, 10);

    return () => clearInterval(typingInterval);
  }, [text, textCount, isTypingPaused, onComplete]);

  return <p dangerouslySetInnerHTML={{ __html: sequence }} />;
};

export default TextTyping;
