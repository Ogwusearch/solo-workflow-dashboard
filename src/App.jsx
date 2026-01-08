import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { phases } from "./data/phases";
import SideDrawer from "./components/SideDrawer";
import PhaseCard from "./components/PhaseCard";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import ProjectSelector from "./components/ProjectSelector";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Developer from "./pages/Developer";
import Blog from "./pages/Blog";
import Techy from "./pages/Techy";

import { loadProjects, saveProjects } from "./utils/storage";
import { exportProjectCSV, exportProjectJSON } from "./utils/export";
import "./index.css";

export default function App() {
  // --- your existing state and functions (projects, phases, drawer, notes, etc.) ---
  const [projects, setProjects] = useState(loadProjects);
  const [currentProjectId, setCurrentProjectId] = useState(projects[0]?.id || null);
  const currentProject = projects.find(p => p.id === currentProjectId);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => { if (!projects.length) handleAddProject(); }, []);
  useEffect(() => { saveProjects(projects); }, [projects]);

  const handleAddProject = () => {
    const name = prompt("Project name:");
    if (!name) return;
    const newProject = {
      id: Date.now(),
      name,
      notes: phases.map(() => []),
      cycles: 0,
      cyclesHistory: [],
    };
    setProjects([...projects, newProject]);
    setCurrentProjectId(newProject.id);
    setCurrentPhase(0);
  };

  const handleAddNote = (text) => {
    if (!text.trim()) return;
    const updatedProjects = projects.map(p => {
      if (p.id === currentProjectId) {
        const updatedNotes = [...p.notes];
        updatedNotes[currentPhase] = [
          ...updatedNotes[currentPhase],
          { text, timestamp: new Date().toLocaleString() }
        ];
        return { ...p, notes: updatedNotes };
      }
      return p;
    });
    setProjects(updatedProjects);
  };

  const handleNext = () => {
    if (currentPhase === phases.length - 1) {
      const updatedProjects = projects.map(p => {
        if (p.id === currentProjectId) {
          const newHistory = [...(p.cyclesHistory || []), p.cycles + 1];
          return { ...p, cycles: p.cycles + 1, cyclesHistory: newHistory };
        }
        return p;
      });
      setProjects(updatedProjects);
    }
    setCurrentPhase((currentPhase + 1) % phases.length);
  };

  const handlePrev = () => { setCurrentPhase((currentPhase - 1 + phases.length) % phases.length); };

  const handlePhaseSelect = (id) => {
    setCurrentPhase(id - 1);
    setDrawerOpen(false);
    document.getElementById(`phase-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="root">
      {/* Project Selector */}
      <ProjectSelector
        projects={projects}
        currentProjectId={currentProjectId}
        onSelectProject={setCurrentProjectId}
        onAddProject={handleAddProject}
      />

      {/* Drawer Toggle */}
      <button className="drawer-toggle-btn" onClick={() => setDrawerOpen(true)}>☰ Menu</button>

      {/* Side Drawer */}
      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={phases.map(p => ({ id: p.id, label: p.title }))}
        currentPhaseId={currentPhase + 1}
        onPhaseSelect={handlePhaseSelect}
        projects={projects}
        currentProjectId={currentProjectId}
      />

      {/* Header */}
      <Header
        currentProject={currentProject}
        currentPhase={currentPhase}
        totalPhases={phases.length}
      />

      {/* --- Routes --- */}
      <Routes>
        <Route
          path="/"
          element={
            <main>
              {phases.map((phase, index) => (
                <PhaseCard
                  key={phase.id}
                  id={`phase-${phase.id}`}
                  title={`${phase.id}. ${phase.title}`}
                  description={phase.description}
                  isActive={index === currentPhase}
                />
              ))}

              <div>
                <label style={{ fontWeight: "bold" }}>Add Note:</label>
                <textarea
                  className="notes"
                  placeholder="Write your note and press Enter..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddNote(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <ul>
                  {currentProject?.notes[currentPhase]?.map((note, idx) => (
                    <li key={idx}>
                      [{note.timestamp}] {note.text}
                    </li>
                  ))}
                </ul>
              </div>

              <Navigation onPrev={handlePrev} onNext={handleNext} />
            </main>
          }
        />

        {/* Static Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/techy" element={<Techy />} />
      </Routes>

      {/* Footer */}
      <Footer currentProject={currentProject} currentPhase={currentPhase} />
    </div>
  );
}
