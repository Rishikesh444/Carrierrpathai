import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import clientPromise from "@/lib/mongodb"
import { generateGeminiAI } from "@/lib/gemini"

const CAREER_SYSTEM_PROMPT = `You are CareerOS AI, a premier AI Career Coach & Executive Strategist.
Your mission is to provide clear, actionable, neatly formatted career advice tailored directly to the candidate.

Formatting Guidelines (VERY IMPORTANT):
- Structure answers with neat, spaced bullet points.
- Leave an empty line between points for maximum readability.
- Use bold tags **Like This** for key concepts and takeaways.
- Avoid dense wall-of-text paragraphs.
- Keep total response under 200 words so it is clean and digestible in the sidebar chat.
`

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { message, history, context } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Fetch user's latest resume and profile data from MongoDB
    let profileData: any = null
    let latestResume: any = null
    try {
      const client = await clientPromise
      const db = client.db("careerai")
      const [profileDoc, resumeDoc] = await Promise.all([
        db.collection("profiles").findOne({ userId: session.user.id }),
        db.collection("resumes").findOne({ userId: session.user.id }, { sort: { parsedAt: -1 } }),
      ])
      profileData = profileDoc
      latestResume = resumeDoc
    } catch (dbErr) {
      console.warn("Could not fetch user context from MongoDB:", dbErr)
    }

    // Build candidate context description
    const candidateContext = [
      `User Name: ${context?.name || profileData?.name || session.user.name || "Candidate"}`,
      `Current Title: ${context?.title || profileData?.title || latestResume?.title || "Professional"}`,
      `Location: ${context?.location || profileData?.location || "Remote"}`,
      `Target Roles: ${context?.targetRoles || profileData?.roles || "Technology & Product"}`,
      `ATS Score: ${context?.atsScore || profileData?.resumeScore || latestResume?.atsScore || "N/A"}/100`,
      `Key Skills: ${(context?.skills?.length ? context.skills : latestResume?.skills || []).slice(0, 15).join(", ") || "General Skills"}`,
    ].filter(Boolean).join("\n")

    const fullPrompt = `Candidate Background:\n${candidateContext}\n\nCandidate Question:\n${message}`

    try {
      const reply = await generateGeminiAI(fullPrompt, CAREER_SYSTEM_PROMPT)
      return NextResponse.json({ reply })
    } catch (aiErr) {
      console.warn("Gemini generation failed, using rule fallback:", aiErr)
      const reply = getContextAwareResponse(message, context)
      return NextResponse.json({ reply })
    }
  } catch (err) {
    console.error("Chat route error:", err)
    return NextResponse.json({
      reply: "I'm here to assist with your career growth! Feel free to ask about optimizing your resume, interview questions, or next career steps.",
    })
  }
}

function getContextAwareResponse(message: string, context?: any): string {
  const lower = message.toLowerCase()
  const skills = context?.skills?.slice(0, 5).join(", ") || "your core domain skills"
  const title = context?.title || "your target role"

  if (lower.includes("resume") || lower.includes("improve") || lower.includes("cv")) {
    return `Based on your profile as **${title}**, here are high-impact resume improvements:\n\n` +
      `1. **Quantify Achievements**: Convert bullets to: *Action Verb + Context + Metric Outcome* (e.g. "Accelerated delivery by 28% across 4 squads").\n` +
      `2. **Frontload Core Skills**: Highlight ${skills} in the first third of your resume for automated ATS parsers.\n` +
      `3. **Targeted Summary**: Open with a 2-line punchy value proposition focused on your direct impact.`
  }

  if (lower.includes("interview") || lower.includes("prep") || lower.includes("question")) {
    return `Here is your targeted interview game plan for **${title}**:\n\n` +
      `1. **The STAR Framework**: Structure every story with Situation, Task, Action, Result.\n` +
      `2. **Prepare 3 Anchor Stories**: Overcoming a hurdle, delivering high business impact, and collaborating.\n` +
      `3. **Reverse Questions**: Ask: *"What does world-class success look like for this role in the first 90 days?"*`
  }

  return `Great question! Looking at your career path toward **${title}**, consistency and strategic positioning are key. You can ask me to draft tailored bullet points, critique your elevator pitch, or simulate common interview questions!`
}
