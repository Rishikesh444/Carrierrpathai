const GEMINI_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-flash-latest",
  "gemini-3.7-flash",
  "gemini-2.5-flash",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash-lite",
  "gemini-3-flash-preview",
]



export async function generateGeminiAI(prompt: string, systemInstruction?: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey.includes("YOUR_")) {
    throw new Error("No Gemini API key configured")
  }

  let lastError: any = null

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      const body: any = {
        contents: [
          ...(systemInstruction
            ? [
                { role: "user", parts: [{ text: `[SYSTEM INSTRUCTION: ${systemInstruction}]` }] },
                { role: "model", parts: [{ text: "Understood. I will follow all instructions and format cleanly." }] },
              ]
            : []),
          { role: "user", parts: [{ text: prompt }] },
        ],
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.warn(`Gemini model ${model} HTTP ${res.status}:`, errText)
        continue
      }

      const data = await res.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (text && text.trim()) {
        return text.trim()
      }
    } catch (err) {
      lastError = err
      console.warn(`Model ${model} failed, trying next:`, err)
    }
  }

  throw lastError || new Error("All Gemini models failed")
}

