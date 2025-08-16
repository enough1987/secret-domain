import { getIpChain } from "@/helpers/apiRouteHelpers";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  const ipChain = getIpChain(req);
  console.log("IP Chain:", ipChain);

  try {
    const { inputs } = await req.json();
    console.log("getAIResponse called with inputs:", inputs);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "x-forwarded-for": ipChain, // Include the chain of IPs
        },
        body: JSON.stringify({ inputs }),
      }
    );

    if (!response.ok) {
      const errorMsg = `Failed to fetch AI response: ${response.status} ${response.statusText}`;
      console.error(errorMsg);
      return new Response(
        JSON.stringify({ data: null, error: errorMsg }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(
      JSON.stringify({ data: data[0]?.summary_text || JSON.stringify(data) }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMsg = `Error fetching AI response: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);
    return new Response(
      JSON.stringify({ data: null, error: errorMsg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}