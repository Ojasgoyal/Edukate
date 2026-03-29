import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const { fetchUser } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    slug: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMsg(""); // Clear errors on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // --- Client-Side JS Validation ---
    if (!isLogin) {
      if (!formData.name.trim()) return setErrorMsg("Name is required");
      if (!formData.slug.trim()) return setErrorMsg("Subdomain is required");

      // Basic Subdomain formatting (alphanumeric only, no spaces)
      if (!/^[a-zA-Z0-9]+$/.test(formData.slug)) {
        return setErrorMsg("Subdomain can only contain letters and numbers");
      }
    }

    if (formData.password.length < 6) {
      return setErrorMsg("Password must be at least 6 characters long");
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = {
        ...formData,
        role: "teacher",
      };

      const res = await axios(`${apiBaseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
        withCredentials: true,
      });

      console.log("Success:", res.data);
      // Redirect to dashboard on successful login/registration
      await fetchUser();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "An error occurred during submission.",
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <div className="w-lg h-fit mx-auto my-10 p-10 bg-background border border-foreground/10 shadow-sm rounded-sm flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">
            {isLogin ? "Login to Edukate" : "Register on Edukate"}
          </h1>

          {errorMsg && (
            <div className="w-full bg-red-100 text-red-600 p-2 mb-4 text-sm rounded-sm text-center border border-red-200">
              {errorMsg}
            </div>
          )}

          <form className="w-md flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-2 border border-foreground/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-foreground/50"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-foreground/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-foreground/50"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-foreground/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-foreground/50"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            {!isLogin && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Subdomain"
                    name="slug"
                    className="w-full px-4 py-2 border border-foreground/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-foreground/50"
                    value={formData.slug}
                    onChange={handleChange}
                    required={!isLogin}
                    pattern="[a-zA-Z0-9]+"
                    title="Subdomain can only contain letters and numbers"
                  />
                  <div className="text-xs leading-tight w-90 text-muted-foreground mt-1">
                    Subdomain will be used to create your unique Edukate URL.
                    Example: yourschool.edukate.in
                  </div>
                </div>
              </>
            )}
            <button
              type="submit"
              className={`w-full bg-foreground text-background py-2 rounded-sm hover:bg-foreground/80 cursor-pointer transition-colors duration-300 ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
              disabled={isLoading}
            >
              {isLogin ? (isLoading ? "Logging in..." : "Login") : (isLoading ? "Signing up..." : "Sign Up")}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setIsLogin((prev) => !prev);
              setErrorMsg(""); // Clear errors on toggle
            }}
            className="font-medium text-sm rounded-sm mt-8 p-2 text-foreground hover:text-muted-foreground cursor-pointer"
          >
            {isLogin ? "Create an account" : "Already have an account?"}
          </button>
        </div>
      
    </>
  );
}
