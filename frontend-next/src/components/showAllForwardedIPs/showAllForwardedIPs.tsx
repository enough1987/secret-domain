"use client";
import { useEffect, useState } from "react";

export default function ShowAllForwardedIPs() {
  const [ips, setIps] = useState<string>("Loading...");

  useEffect(() => {
    // Fetch IP chain from your API route
    fetch("/next/api/ipChain")
      .then((res) => res.text())
      .then(setIps)
      .catch(() => setIps("Unable to fetch IPs"));
  }, []);

  return (
    <div>
      <strong>Forwarded IPs:</strong> {ips}
    </div>
  );
}