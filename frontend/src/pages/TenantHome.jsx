import { use, useEffect, useState } from "react";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { TenantContext } from "../context/TenantContext";
import axios from "axios";

export default function TenantHome() {
  const { user } = useAuth();
  const { tenant } = useContext(TenantContext);
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tenant) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/courses`, {
          headers: { "x-tenant": tenant },
        });

        setCourses(response.data.courses);
      } catch (error) {
        if (error.response?.status === 404) {
          setError("NO_TENANT");
        } else {
          setError("GENERIC");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenant]);

  if (loading) return <div>Loading...</div>;

  if (error === "NO_TENANT") {
    return <h2>No such educator "{tenant}" found</h2>;
  }

  if (error) {
    return <h2>Something went wrong</h2>;
  }

  return (
    <>
      <h1>Welcome to {tenant}'s Home Page</h1>
      <p>
        Hello, {user ? user.name : "Guest"}! This is the home page for {tenant}.
      </p>
    </>
  );
}
