export const getTenantFromHost = () => {
  const host = window.location.hostname; 
  // e.g. tenant1.yourdomain.com

  const parts = host.split(".");

  // localhost case
  if (host.includes("localhost")) {
    return null; // or custom logic
  }
  if (parts[0] === "www" || parts[0] === "api") return null;

  // production
  if (parts.length > 2) {
    return parts[0]; // tenant1
  }

  return null;
};