import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Editor from "./components/Editor";
import About from "./components/About";
import Footer from "./components/Footer";
import "./App.css";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Editor />

      <Footer />
    </>
  );
}

export default App;