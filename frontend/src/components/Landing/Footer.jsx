import React from "react";
import { Link } from "react-router-dom";
import { SwatchBook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-16 pb-8 px-6 xl:px-0">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Section: Minimal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-4">
          <div className="flex gap-2 items-center mb-4 md:mb-0">
            <SwatchBook className="text-[#f97316] w-7 h-7" />
            <div className="text-2xl font-bold font-dm-serif tracking-wide">
              edukate
            </div>
          </div>

          {/* Minimal Centered Navigation */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <Link to="#features" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">Features</Link>
            <Link to="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">Pricing</Link>
            <Link to="/login" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">Login</Link>
            <Link to="#" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">Contact</Link>
          </div>
        </div>

        {/* Huge Glow Title Section */}
        <div className="flex flex-col items-center justify-center border-t border-zinc-800/50 pt-16">
          
          {/* Silver Glowing Text */}
          <h1 className="font-dm-serif text-[18vw] md:text-[15vw] leading-none tracking-tighter text-white select-none drop-shadow-[0_0_40px_rgba(212,212,216,0.4)] transition-all duration-700 hover:drop-shadow-[0_0_60px_rgba(212,212,216,0.8)] cursor-default">
            edukate.
          </h1>
          
          {/* Bottom Bar */}
          <div className="flex w-full justify-between items-center mt-12 text-xs text-zinc-500 flex-col-reverse md:flex-row gap-4">
            <p>© {new Date().getFullYear()} Edukate. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}