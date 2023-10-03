// Checkbox.js
import React from "react";

const Checkbox = ({ checked, onChange }) => {
  return (
    <div className="checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};

export default Checkbox;
