import React from "react";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/Landing/Hero";

export default function Landing() {
  return (
    <>
      <div>
        <div className="max-w-6xl mx-auto">
          <Navbar />
        </div>
        <main className="max-w-6xl mx-auto">
        <Hero />
        </main>
      </div>
    </>
  );
}
