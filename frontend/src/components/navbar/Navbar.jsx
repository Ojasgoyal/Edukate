import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  
  const { user } = useAuth()

  return (
    <>
    <div className="top-0 fixed z-100 navbar flex bg-transparent h-16 max-w-6xl w-full items-center justify-between px-4 border">
        <div className="text-2xl font-bold font-dm-serif tracking-wide">edukate</div>
        <div>
            <Link to={user ? "/dashboard" : "/login"} className="bg-foreground text-background px-4 py-2 font-medium rounded-sm text-sm">
            {user ?  "Dashboard" : "Try Now"}</Link>
        </div>
    </div>
    </>
  )
}
    