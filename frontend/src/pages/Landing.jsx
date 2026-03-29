import React from "react";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";

export default function Landing() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Navbar />
          <main>
            <Hero />
            <Features />
          </main>
        </div>
      </div>
    </>
  );
}
