import React from "react";

function MajorSelectorElement({
  placeholder,
  fieldType,
  labelname,
  selectname,
  value,
  onChange,
  options,
}) {
  return (
    <div className={fieldType}>
      <label>
        <h3>{placeholder}</h3>
      </label>
      <label className={labelname}>
        <select name={selectname} value={value} onChange={onChange}>
          <option value="" style={{ paddingRight: "15px" }} disabled>
            선택
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default MajorSelectorElement;
