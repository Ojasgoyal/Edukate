import React from 'react'
import { useContext } from "react";
import { useAuth } from '@/context/AuthContext';
import { TenantContext } from "../context/TenantContext";

export default function TenantHome() {
    const { user } = useAuth();
    const { tenant } = useContext(TenantContext);

  return (
    <>
    <h1>Welcome to {tenant}'s Home Page</h1>
    <p>Hello, {user ? user.name : "Guest"}! This is the home page for {tenant}.</p>
    </>
  )
}
