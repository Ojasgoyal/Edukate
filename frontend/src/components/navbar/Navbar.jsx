import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SwatchBook } from "lucide-react";

export default function Navbar() {
  const { user , loading } = useAuth();
    if (loading) {
    return (
      <div className="bg-foreground text-background px-4 py-2 font-medium rounded-sm text-sm opacity-70">
        Loading...
      </div>
    );
  }

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
            to={user ? "/dashboard" : "/login"}
            className="bg-foreground text-background px-4 py-2 font-medium rounded-sm text-sm"
          >
            {user ? "Dashboard" : "Try Now"}
          </Link>
        </div>
      </div>
    </>
  );
}
