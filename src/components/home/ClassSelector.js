import React from "react";

const ClassSelector = (props) => {
  return (
    <div className="class-selector class-selector--dashboard select">
      <select onChange={props.onSelectClass}>
        {props.classes.map((cls) => (
          <option key={cls.className} value={cls.className}>
            {cls.className}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassSelector;
