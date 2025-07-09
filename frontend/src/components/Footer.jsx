import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe, FaCode } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div>
          <span className="fw-bold">KishoreWebHook</span> &copy; {new Date().getFullYear()} | All Rights Reserved.
        </div>
        <div>
          <a href="mailto:kishoreanand.r@gmail.com" className="text-white me-3"><FaEnvelope /></a>
          <a href="https://kishoreanandr.github.io/portfolio/" className="text-white me-3" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
          <a href="https://leetcode.com/u/kishoreanand21/" className="text-white me-3" target="_blank" rel="noopener noreferrer"><FaCode /></a>
          <a href="https://github.com/kishoreanandr" className="text-white me-3" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/kishoreanandr/" className="text-white" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
} 