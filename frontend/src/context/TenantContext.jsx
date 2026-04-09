import { createContext, useEffect, useState } from "react";
import { getTenantFromHost } from "../lib/getTenant";
import axios from "axios";

export const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState(undefined);

  useEffect(() => {
    const t = getTenantFromHost();
    setTenant(t);
  }, []);

  if (tenant === undefined) return null; // or loader
  
  return (
    <TenantContext.Provider value={{ tenant }}>
      {children}
    </TenantContext.Provider>
  );
};
