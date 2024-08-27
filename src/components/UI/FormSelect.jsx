import React from "react";

export default function FormSelect({ label, options = [], onChange, value }) {
  return (
    <label className="form-control w-full max-w-xs">
      {label && (
        <div className="label md:hidden">
          <span className="label-text font-semibold">{label}</span>
        </div>
      )}
      <select
        value={value}
        onChange={onChange}
        className="select select-bordered"
      >
        <option value="">{label}</option>
        {options.map((option) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </select>
    </label>
  );
}
