import React from "react";

export default function ProjectSelector({ projects, currentProjectId, onSelectProject, onAddProject }) {
  return (
    <div
      style={{
        marginBottom: "1rem",
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {projects.map(p => (
        <button
          key={p.id}
          onClick={() => onSelectProject(p.id)}
          style={{
            background: p.id === currentProjectId ? "#0077cc" : "#eee",
            color: p.id === currentProjectId ? "#fff" : "#000",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (p.id !== currentProjectId) e.target.style.background = "#ddd";
          }}
          onMouseLeave={(e) => {
            if (p.id !== currentProjectId) e.target.style.background = "#eee";
          }}
        >
          {p.name}
        </button>
      ))}

      <button
        onClick={onAddProject}
        style={{
          background: "#28a745",
          color: "#fff",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#218838")}
        onMouseLeave={(e) => (e.target.style.background = "#28a745")}
      >
        + Add Project
      </button>
    </div>
  );
}
