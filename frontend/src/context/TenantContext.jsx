import { createContext, useEffect, useState } from "react";
import { getTenantFromHost } from "../lib/getTenant";
import axios from "axios";

export const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  const [validTenant, setValidTenant] = useState(null);

  useEffect(() => {
    const t = getTenantFromHost();
    setTenant(t);

    if (!t) {
      setLoading(false);
      return;
    }

    const checkTenant = async () => {
      try {
        const valid = await axios.get(`${apiBaseUrl}/auth/tenant` , { headers: { "x-tenant": t } }); // uses x-tenant
        setValidTenant(true);
      } catch {
        setValidTenant(false);
      } finally {
        setLoading(false);
      }
    };

    checkTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, loading, validTenant }}>
      {children}
    </TenantContext.Provider>
  );
};
