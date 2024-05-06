import React from "react";
import "../css/components/MBTISection.css";
import MBTIButton from "./MBTIButton";

function MBTISection({ user, onClick }) {
  return (
    <div className="MBTISection">
      <div className="MBTIContainer">
        <MBTIButton user={user} onClick={onClick} letter="E" />
        <MBTIButton user={user} onClick={onClick} letter="S" />
        <MBTIButton user={user} onClick={onClick} letter="T" />
        <MBTIButton user={user} onClick={onClick} letter="J" />
        <MBTIButton user={user} onClick={onClick} letter="I" />
        <MBTIButton user={user} onClick={onClick} letter="N" />
        <MBTIButton user={user} onClick={onClick} letter="F" />
        <MBTIButton user={user} onClick={onClick} letter="P" />
      </div>
    </div>
  );
}

export default MBTISection;
