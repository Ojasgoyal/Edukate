import { MoveLeft } from "lucide-react";
import React from "react";
import { Link } from 'react-router-dom'
import StudentForm from "../components/StudentForm";

export default function Studentlogin() {
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <Link
          to="/"
          className="absolute flex items-center hover:transition-all hover:scale-105 font-medium text-md top-10 left-10"
        >
          <MoveLeft strokeWidth={2} size={20} className="inline mr-1" />
          Back
        </Link>
        <StudentForm />
      </div>
    </>
  );
}
