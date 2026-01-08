import React from "react";
import { exportProjectCSV, exportProjectJSON } from "../utils/export";
import CycleSparkline from "./CycleSparkline";
import CycleChart from "./CycleChart";

const buttonStyle = {
  background: "#28a745",
  color: "#fff",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background 0.2s",
};

export default function Header({ currentProject, currentPhase, totalPhases }) {
  return (
    <header style={{ textAlign: "center", marginBottom: "2rem" }}>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {currentProject?.name || "Project Dashboard"}
        <span className="cycle-icon"></span>
      </h1>

      <p>Cycles Completed: {currentProject?.cycles || 0}</p>

      {/* Sparkline Graph (compact) */}
      {currentProject?.cyclesHistory?.length > 0 && (
        <div style={{ maxWidth: "200px", margin: "0.5rem auto" }}>
          <CycleSparkline cyclesHistory={currentProject.cyclesHistory} />
        </div>
      )}

      {/* Progress Bar */}
      <div
        className="progress-container"
        style={{ maxWidth: "400px", margin: "0.5rem auto" }}
      >
        <div
          className="progress-bar"
          style={{
            width: `${((currentPhase + 1) / totalPhases) * 100}%`,
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>

      {/* Full Cycle Chart */}
      {currentProject?.cyclesHistory?.length > 0 && (
        <CycleChart cyclesHistory={currentProject.cyclesHistory} />
      )}

      {/* Export Buttons */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => exportProjectJSON(currentProject)}
          style={buttonStyle}
        >
          Export JSON
        </button>
        <button
          onClick={() => exportProjectCSV(currentProject)}
          style={buttonStyle}
        >
          Export CSV
        </button>
      </div>
    </header>
  );
}
