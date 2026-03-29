export const getSubdomain = (origin) => {
  try {
    const url = new URL(origin);
    const host = url.hostname; // e.g. youteacher.edukate.in

    const parts = host.split(".");

    if (parts.length >= 3) {
      return parts[0]; // "youteacher"
    }

    return null;
  } catch {
    return null;
  }
};