export const getSubdomain = (origin) => {
  try {
    const url = new URL(origin);
    const host = url.hostname; // e.g. youteacher.edukate.in

    const parts = host.split(".");

    if (parts.length >= 3) {
      return { host, subdomain: parts[0] }; // { host: "youteacher.edukate.in", subdomain: "youteacher" }
    }

    return null;
  } catch {
    return null;
  }
};