import React from "react";

export default function About() {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">About the Project</h2>
        <p className="text-center mx-auto" style={{ maxWidth: 700 }}>
          This project is a modern web application that receives and displays GitHub webhook events in real time. Built with Vite and React for the frontend and Flask for the backend, it demonstrates full-stack integration, real-time data handling, and a clean, user-friendly interface.
        </p>
      </div>
    </section>
  );
} 