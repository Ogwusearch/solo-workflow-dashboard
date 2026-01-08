import React, { useState } from "react";

export default function SideDrawer({
  isOpen,
  onClose,
  items,
  currentPhaseId,
  onPhaseSelect,
  projects,
  currentProjectId,
}) {
  const [expandedPhase, setExpandedPhase] = useState(null);

  const currentProject = projects?.find((p) => p.id === currentProjectId);

  return (
    <div
      className={`side-drawer ${isOpen ? "open" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: isOpen ? 0 : "-300px",
        width: "280px",
        height: "100%",
        background: "#fff",
        boxShadow: "2px 0 15px rgba(0,0,0,0.2)",
        transition: "left 0.3s ease",
        zIndex: 1000,
        overflowY: "auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <button
        onClick={onClose}
        style={{
          marginBottom: "1rem",
          cursor: "pointer",
          background: "transparent",
          border: "none",
          fontSize: "1.5rem",
          alignSelf: "flex-end",
        }}
      >
        ✕
      </button>

      {items.map((item) => {
        const isActive = item.id === currentPhaseId;
        const isExpanded = expandedPhase === item.id;
        const notes = currentProject?.notes[item.id - 1] || [];

        return (
          <div key={item.id}>
            {/* Phase Button */}
            <div
              onClick={() => {
                onPhaseSelect(item.id);
                setExpandedPhase(isExpanded ? null : item.id);
              }}
              style={{
                background: isActive ? "#0077cc" : "#eee",
                color: isActive ? "#fff" : "#000",
                padding: "0.5rem 0.75rem",
                borderRadius: "5px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "500",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "#ddd";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "#eee";
              }}
            >
              <span>{item.label}</span>
              <span>{notes.length > 0 ? `📝 ${notes.length}` : ""}</span>
            </div>

            {/* Notes List */}
            {isExpanded && notes.length > 0 && (
              <ul
                style={{
                  paddingLeft: "1rem",
                  marginTop: "0.25rem",
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
              >
                {notes.map((note, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "0.85rem",
                      marginBottom: "0.25rem",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "0.15rem",
                    }}
                  >
                    [{note.timestamp}] {note.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
