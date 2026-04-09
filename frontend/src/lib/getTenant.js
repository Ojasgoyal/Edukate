export const getTenantFromHost = () => {
  const host = window.location.hostname;
  const parts = host.split(".");

  // localhost handling
  if (host.endsWith("localhost")) {
    if (parts.length > 1) {
      return parts[0]; // abc.localhost → abc
    }
    return null;
  }

  if (parts[0] === "www" || parts[0] === "api") return null;

  if (parts.length > 2) {
    return parts[0];
  }

  return null;
};