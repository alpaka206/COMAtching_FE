import React from "react";

function MajorSelectorElement({
  placeholder,
  fieldType,
  selectname,
  value,
  onChange,
  options,
}) {
  return (
    <div className={fieldType}>
      <label>
        <div className="form-inner-content-text">{placeholder}</div>
      </label>
      <select
        className="MajorSelectorElement-select"
        name={selectname}
        value={value}
        onChange={onChange}
      >
        <option value="" className="MajorSelectorElement-option" disabled>
          선택
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MajorSelectorElement;
