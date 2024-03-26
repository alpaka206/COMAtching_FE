import React from "react";
import "../css/components/MBTISection.css";
import MBTIButton from "./MBTIButton";

function MBTISection({ user, setUser, setSelectedMBTI, selectedMBTI }) {
  const handleMBTISelection = (value) => {
    const category =
      value === "E" || value === "I"
        ? "EI"
        : value === "S" || value === "N"
        ? "SN"
        : value === "T" || value === "F"
        ? "TF"
        : "PJ";

    setSelectedMBTI((prevMBTI) => ({
      ...prevMBTI,
      [category]: value,
    }));
    setUser((prevUser) => ({
      ...prevUser,
      mbti: `${category === "EI" ? value : selectedMBTI.EI}${
        category === "SN" ? value : selectedMBTI.SN
      }${category === "TF" ? value : selectedMBTI.TF}${
        category === "PJ" ? value : selectedMBTI.PJ
      }`,
    }));
  };
  return (
    <div className="MBTISection">
      <h3>MBTI</h3>
      <div className="MBTIContainer">
        <MBTIButton
          user={user}
          handleMBTISelection={handleMBTISelection}
          letter="E"
        />
        <MBTIButton
          user={user}
          handleMBTISelection={handleMBTISelection}
          letter="S"
        />
        <MBTIButton
          user={user}
          handleMBTISelection={handleMBTISelection}
          letter="T"
        />
        <MBTIButton
          user={user}
          handleMBTISelection={handleMBTISelection}
          letter="J"
        />
        <MBTIButton
          user={user}
          handleMBTISelection={handleMBTISelection}
          letter="I"
        />
        <MBTIButton
          user={user}
          handleMBTISelection={handleMBTISelection}
          letter="N"
        />

        <MBTIButton
          user={user}
          handleMBTISelection={handleMBTISelection}
          letter="F"
        />
        <MBTIButton
          user={user}
          handleMBTISelection={handleMBTISelection}
          letter="P"
        />
      </div>
    </div>
  );
}

export default MBTISection;
