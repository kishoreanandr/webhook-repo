import React from "react";
import { FaBolt, FaDatabase, FaGithub, FaChartLine } from "react-icons/fa";

const features = [
  { icon: <FaBolt size={32} />, title: "Real-Time", desc: "Instantly receive and display GitHub events as they happen." },
  { icon: <FaDatabase size={32} />, title: "Persistent Storage", desc: "All events are stored securely for later review." },
  { icon: <FaGithub size={32} />, title: "GitHub Integration", desc: "Seamless integration with your GitHub repositories." },
  { icon: <FaChartLine size={32} />, title: "Analytics", desc: "Visualize and analyze your repository activity." }
];

export default function Features() {
  return (
    <section id="features" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">Why Choose This Project?</h2>
        <div className="row g-4">
          {features.map((f, i) => (
            <div className="col-md-3" key={i}>
              <div className="card h-100 shadow-sm text-center p-3">
                <div className="mb-3 text-primary">{f.icon}</div>
                <h5 className="fw-bold">{f.title}</h5>
                <p className="text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 