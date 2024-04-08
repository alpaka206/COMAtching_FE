import React, { Fragment } from "react";
import MyInput from "../components/MyInput";
import "../css/components/StudentIdInput.css";

function StudentIdInput({ value, onChange }) {
  return (
    <Fragment>
      <h3>나이</h3>
      <div className="age">
        <MyInput
          name="age"
          value={value}
          onChange={onChange}
          placeholder="00학번부터 23학번까지 가능합니다 ex) 23"
        />
      </div>
    </Fragment>
  );
}

export default StudentIdInput;
