import React from "react";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import Working from "../components/Landing/Working";

export default function Landing() {
  return (
    <>
      <div className="min-h-screen w-full bg-white">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Working />
        </main>
      </div>
    </>
  );
}
