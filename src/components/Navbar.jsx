import React from "react";
import "./styles/navbar.css";

export default function Navbar({
  activeTab: selected,
  setActiveTab: setSelected,
}) {
  const tabs = ["Personal", "Education", "Experience", "Skills"];
  return (
    <div className="radio-inputs">
      {tabs.map((name) => (
        <label key={name} className="radio">
          <input
            type="radio"
            name="radio"
            checked={selected === name}
            onChange={() => setSelected(name)}
          />
          <span className="name">{name}</span>
        </label>
      ))}
    </div>
  );
}
