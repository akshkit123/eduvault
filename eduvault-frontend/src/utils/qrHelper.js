// Local IP of this machine on Wi-Fi for phone scanning
export const LOCAL_NETWORK_IP = "192.168.0.106";

/**
 * Returns a URL suitable for scanning by external devices (such as a mobile phone).
 * If the current origin is localhost or 127.0.0.1, it substitutes the local network IP
 * so the phone can access the Vite dev server directly over the local Wi-Fi network.
 */
export const getShareableUrl = (path = "") => {
  if (typeof window === "undefined") return path;

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const host = isLocalhost
    ? `${LOCAL_NETWORK_IP}:${window.location.port || 5173}`
    : window.location.host;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${window.location.protocol}//${host}${cleanPath}`;
};
