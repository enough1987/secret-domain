"use client";
import { getAIResponse } from "@/api/ai";
import { useState } from "react";
import styles from "./AiClient.module.scss";

export default function AIClient() {
  const [input, setInput] = useState("");
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setAiMessage(null);

    // Call your API route or backend function here
    const res = await getAIResponse(input);
    setAiMessage(res || "No response");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.aiForm}>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask something..."
        className={styles.aiInput}
      />
      <button
        type="submit"
        disabled={loading || !input}
        className={styles.aiButton}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      {aiMessage && (
        <div className={styles.aiResponse}>
          <strong>AI says:</strong>
          <div>{aiMessage}</div>
        </div>
      )}
    </form>
  );
}