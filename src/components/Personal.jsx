import React from "react";
import "./styles/personal.css";

export default function Personal({
  title,
  data,
  setData,
  onSubmit,
  entries = [],
  setEntries,
}) {
  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "Personal Information") {
      onSubmit?.(data);
      return;
    }

    if (setEntries) {
      setEntries([...entries, data]);
      setData(
        Object.keys(data).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {})
      );
    }
  };

  const handleDelete = (index) => {
    if (setEntries) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };
  return (
    <div className="form-container">
      <h2>{title}</h2>
      <form className="form" onSubmit={handleSubmit}>
        {Object.entries(data).map(([key, value]) => {
          const type = key.toLowerCase().includes("email")
            ? "email"
            : key.toLowerCase().includes("phone")
            ? "tel"
            : "text";

          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase());

          return (
            <label key={key} className="input_wrapper">
              <span className="input_label">{label}</span>
              <input
                type={type}
                value={value}
                className="input_field"
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </label>
          );
        })}
        {title !== "Personal Information" && (
          <button type="submit" className="submit_button">
            Add
          </button>
        )}
      </form>
      {entries?.length > 0 && (
        <div className="entries_container">
          {entries.map((entry, i) => (
            <div key={i} className="entry_card">
              <div className="entry_content">
                {Object.entries(entry).map(([k, v]) => (
                  <p key={k}>
                    <strong>
                      {k
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (s) => s.toUpperCase())}
                      :
                    </strong>{" "}
                    {v || "-"}
                  </p>
                ))}
              </div>
              <button className="delete_button" onClick={() => handleDelete(i)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
