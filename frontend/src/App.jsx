import { useContext } from "react";
import { TenantContext } from "./context/TenantContext";

import MainRoutes from "./routes/MainRoutes";
import TenantRoutes from "./routes/TenantRoutes";

export default function App() {
  const { tenant, loading, validTenant } = useContext(TenantContext);

  if (loading)
    return (
      <>
        <div>Loading...</div>
      </>
    );
  if (tenant && !validTenant) {
    return (
      <>
        <h2>No such Educator {tenant} found</h2>
      </>
    ); // 🔥 Vercel-style 404
  }
  return tenant ? <TenantRoutes /> : <MainRoutes />;
}
