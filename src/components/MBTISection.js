import React from "react";
import "../css/components/MBTISection.css";
import MBTIButton from "./MBTIButton";

function MBTISection({ user, onClick, name }) {
  return (
    <div className="MBTISection">
      <div className="MBTIContainer">
        <MBTIButton user={user} onClick={onClick} letter="E" name={name} />
        <MBTIButton user={user} onClick={onClick} letter="S" name={name} />
        <MBTIButton user={user} onClick={onClick} letter="T" name={name} />
        <MBTIButton user={user} onClick={onClick} letter="J" name={name} />
        <MBTIButton user={user} onClick={onClick} letter="I" name={name} />
        <MBTIButton user={user} onClick={onClick} letter="N" name={name} />
        <MBTIButton user={user} onClick={onClick} letter="F" name={name} />
        <MBTIButton user={user} onClick={onClick} letter="P" name={name} />
      </div>
    </div>
  );
}

export default MBTISection;
