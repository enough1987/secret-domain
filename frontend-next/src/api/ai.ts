'use server';

export async function getAIResponse(inputs: string) {
  console.log("getAIResponse called with inputs:", inputs);
  // Example: Summarize a text using Hugging Face's free inference API
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
      body: JSON.stringify({
        inputs,
      }),
    }
  );

  if (!response.ok) {
    return `Failed to fetch AI response: ${response.status} ${response.statusText}`;
  }

  console.log("AI response received:", response);

  const data = await response.json();
  // The response is usually an array of objects with a "summary_text" property
  return data[0]?.summary_text || JSON.stringify(data);
}