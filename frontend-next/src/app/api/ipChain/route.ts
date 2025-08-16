import { getIpChain } from "@/helpers/apiRouteHelpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ipChain = getIpChain(req);
  console.log("IP Chain:", ipChain);
  return new Response(ipChain);
}