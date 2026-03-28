import { useParams } from "react-router-dom";

export default function CoursePage() {
  const { slug } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Course: {slug}</h1>
      <p>This is the public course page</p>
    </div>
  );
}