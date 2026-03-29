import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TenantProvider } from "./context/TenantContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TenantProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TenantProvider>
  </AuthProvider>,
);
