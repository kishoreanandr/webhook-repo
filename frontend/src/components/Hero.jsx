import React from "react";

export default function Hero() {
  return (
    <section className="py-5" style={{
      background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
      color: "white"
    }}>
      <div className="container text-center">
        <h1 className="display-4 fw-bold">Transform Your GitHub Events with Webhooks</h1>
        <p className="lead mt-3">
          Real-time GitHub event tracking and visualization. Connect, monitor, and analyze your repositories with ease.
        </p>
      </div>
    </section>
  );
} 