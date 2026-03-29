import { useContext } from "react";
import { TenantContext } from "./context/TenantContext";

import MainRoutes from "./routes/MainRoutes";
import TenantRoutes from "./routes/TenantRoutes";

export default function App() {
  const { tenant } = useContext(TenantContext);

  return tenant ? <TenantRoutes /> : <MainRoutes />;
}
