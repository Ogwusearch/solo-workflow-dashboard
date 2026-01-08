import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ currentProject, currentPhase }) {
  return (
    <footer>
      <div style={{ padding: "0 1rem" }}>
        {currentProject ? `${currentProject.name} | Phase ${currentPhase + 1}` : "No project selected"}
      </div>
      <div className="footer-marquee">
        <div className="marquee-content">
          <Link to="/about" className="marquee-link">About</Link>
          <Link to="/contact" className="marquee-link">Contact</Link>
          <Link to="/developer" className="marquee-link">Developer</Link>
          <Link to="/blog" className="marquee-link">Blog</Link>
          <Link to="/techy" className="marquee-link">Techy</Link>

          {/* Repeat for seamless scroll */}
          <Link to="/about" className="marquee-link">About</Link>
          <Link to="/contact" className="marquee-link">Contact</Link>
          <Link to="/developer" className="marquee-link">Developer</Link>
          <Link to="/blog" className="marquee-link">Blog</Link>
          <Link to="/techy" className="marquee-link">Techy</Link>
        </div>
      </div>
    </footer>
  );
}
