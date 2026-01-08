import React from "react";

export default function Navigation({ onPrev, onNext }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}
    >
      <button onClick={onPrev} style={buttonStyle}>⬅️ Previous</button>
      <button onClick={onNext} style={buttonStyle}>Next ➡️</button>
    </nav>
  );
}

const buttonStyle = {
  background: "#0077cc",
  color: "#fff",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background 0.2s ease",
  flex: 1,
  minWidth: "120px",
  fontWeight: 500,
  textAlign: "center",
  whiteSpace: "nowrap",
  display: "inline-block",
  margin: "0.25rem 0",
  outline: "none",
  borderBottom: "3px solid transparent",
  fontSize: "1rem",
  fontFamily: "Inter, Arial, sans-serif",
  userSelect: "none",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

buttonStyle["hover"] = {
  background: "#005fa3",
};
