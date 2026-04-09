import { createContext, useState } from "react";
import { getTenantFromHost } from "../lib/getTenant";

export const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenant] = useState(() => getTenantFromHost());

  return (
    <TenantContext.Provider value={{ tenant }}>
      {children}
    </TenantContext.Provider>
  );
};