import { NextRequest } from "next/server";

/**
 * Returns the best guess for the original client IP address.
 * Checks common headers set by various proxies, CDNs, and load balancers.
 */
export function getIpChain(req: NextRequest): string {
  // Try to get the client IP from the most reliable headers, in order of preference:

  const currentIp =
    // req.socket.remoteAddress: Only available in Node.js/Express/Next.js Pages Router (not App Router).
    // req.socket.remoteAddress ||

    // Cloudflare: Sets 'cf-connecting-ip' to the real client IP.
    req.headers.get("cf-connecting-ip") ||

    // Nginx (and some other proxies): Sets 'x-real-ip' to the real client IP.
    req.headers.get("x-real-ip") ||

    // Varnish, Akamai, and some load balancers: May set 'x-client-ip'.
    req.headers.get("x-client-ip") ||

    // Azure Application Gateway, Azure Front Door: May set 'x-ms-client-ip'.
    req.headers.get("x-ms-client-ip") ||

    // AWS ELB/ALB, Azure, Google Cloud, most proxies: 'x-forwarded-for' is a comma-separated list of IPs.
    // We use only if none of the above are present, and take the first IP in the list.
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||

    // RFC 7239 standard: 'Forwarded' header, e.g. for=1.2.3.4; proto=https
    req.headers.get("forwarded")?.split(";")[0]?.replace(/for=/, "").trim() ||

    // Fallback: empty string if no IP found.
    "";

  // Log all possible headers for debugging
  console.log(
    `[ Current IP:  ${currentIp} ]`,
    `[ cf-connecting-ip: ${req.headers.get("cf-connecting-ip")} ]`,
    `[ x-real-ip: ${req.headers.get("x-real-ip")} ]`,
    `[ x-client-ip: ${req.headers.get("x-client-ip")} ]`,
    `[ x-ms-client-ip: ${req.headers.get("x-ms-client-ip")} ]`,
    `[ x-forwarded-for: ${req.headers.get("x-forwarded-for")} ]`,
    `[ forwarded: ${req.headers.get("forwarded")} ]`
  );

  // Build the full IP chain from x-forwarded-for
  const existing = req.headers.get("x-forwarded-for");
  let ipChain: string[] = [];
  if (existing) {
    ipChain = existing.split(",").map(ip => ip.trim()).filter(Boolean);
  }
  // Add currentIp if not already present and not empty
  if (currentIp && !ipChain.includes(currentIp)) {
    ipChain.push(currentIp);
  }
  return ipChain.join(", ");
}