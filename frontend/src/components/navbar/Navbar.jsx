import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SwatchBook } from "lucide-react";

export default function Navbar() {
  const isUser = localStorage.getItem("user") || null ;

  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-100 flex bg-white/70 backdrop-blur-lg h-16 max-w-6xl w-full items-center justify-between px-4 border">
        <div className="flex gap-1 items-center">
          <SwatchBook />

          <div className="text-2xl font-bold font-dm-serif tracking-wide">
            edukate
          </div>
        </div>
        <div>
          <Link
            to={isUser ? "/dashboard" : "/login"}
            className="bg-foreground text-background px-4 py-2 font-medium rounded-sm text-sm"
          >
            {isUser ? "Dashboard" : "Try Now"}
          </Link>
        </div>
      </div>
    </>
  );
}
