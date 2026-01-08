import React from "react";

export default function PhaseCard({ title, description, isActive }) {
  return (
    <section
      className={`phase-card ${isActive ? "active" : ""}`}
      style={{
        padding: "1.5rem",
        background: isActive ? "#e6f0ff" : "#fff",
        borderRadius: "10px",
        boxShadow: isActive
          ? "0 0 20px rgba(0, 119, 204, 0.3)"
          : "0 2px 8px rgba(0,0,0,0.05)",
        marginBottom: "1rem",
        transition: "all 0.3s ease",
      }}
    >
      <h2 style={{ marginBottom: "0.5rem", color: "#0077cc" }}>{title}</h2>
      <p style={{ margin: 0 }}>{description}</p>
    </section>
  );
}
