import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import clientPromise from "@/lib/mongodb"
import { generateGeminiAI } from "@/lib/gemini"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const client = await clientPromise
    const db = client.db("careerai")
    const [profile, resume] = await Promise.all([
      db.collection("profiles").findOne({ userId: session.user.id }),
      db.collection("resumes").findOne({ userId: session.user.id }, { sort: { parsedAt: -1 } }),
    ])

    const targetRole = profile?.title || profile?.roles || resume?.title || "Senior Software Engineer"
    const skills = (resume?.skills || []).slice(0, 10).join(", ") || "React, TypeScript, Next.js, SQL"
    const atsScore = resume?.atsScore || profile?.resumeScore || 80

    return await generatePlan(targetRole, skills, atsScore)
  } catch (err) {
    console.error("Learning plan GET error:", err)
    return NextResponse.json({ error: "Failed to generate learning plan" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { role, skills, atsScore } = body

    const targetRole = role || "Senior Full Stack Engineer"
    const skillsList = Array.isArray(skills) ? skills.join(", ") : (skills || "TypeScript, Next.js, React, SQL")

    return await generatePlan(targetRole, skillsList, atsScore || 80)
  } catch (err) {
    console.error("Learning plan POST error:", err)
    return NextResponse.json({ error: "Failed to generate learning plan" }, { status: 500 })
  }
}

async function generatePlan(targetRole: string, skills: string, atsScore: number) {
  const seed = Date.now().toString().slice(-4)
  const prompt = `You are an Elite Technical Career Coach & Silicon Valley Hiring Mentor.
Generate a deeply customized, realistic, high-impact 4-Week Career Accelerated Learning Plan for a candidate targeting the role of: "${targetRole}".

Candidate Background:
- Target Job Title: ${targetRole}
- Detected Candidate Skills: ${skills}
- ATS Resume Score: ${atsScore}/100
- Generation Seed: ${seed}

Create a specific syllabus that directly addresses modern interview benchmarks, architecture patterns, hands-on production code, and real-world system design for "${targetRole}".

Return ONLY valid JSON (no markdown formatting, no conversational text):
{
  "title": "4-Week Blueprint to ${targetRole}",
  "estimatedWeeklyHours": "6-8 hrs/week",
  "weeks": [
    {
      "weekNumber": 1,
      "theme": "Deep-Dive Core Specialization & Advanced Tooling",
      "goal": "Clear actionable goal for week 1 tailored to ${targetRole}",
      "tasks": [
        { "id": "w1-1", "title": "Specific hands-on engineering task 1", "completed": false },
        { "id": "w1-2", "title": "Specific hands-on engineering task 2", "completed": false },
        { "id": "w1-3", "title": "Specific hands-on engineering task 3", "completed": false }
      ],
      "resource": "Recommended industry guide or official documentation"
    },
    {
      "weekNumber": 2,
      "theme": "Scalable Data Architecture, APIs & State Management",
      "goal": "Clear actionable goal for week 2",
      "tasks": [
        { "id": "w2-1", "title": "Specific data or API engineering task 1", "completed": false },
        { "id": "w2-2", "title": "Specific data or API engineering task 2", "completed": false },
        { "id": "w2-3", "title": "Specific data or API engineering task 3", "completed": false }
      ],
      "resource": "Recommended architectural resource or reference repo"
    },
    {
      "weekNumber": 3,
      "theme": "Cloud Infrastructure, Automated CI/CD & Production Hardening",
      "goal": "Clear actionable goal for week 3",
      "tasks": [
        { "id": "w3-1", "title": "Specific DevOps/cloud/testing task 1", "completed": false },
        { "id": "w3-2", "title": "Specific DevOps/cloud/testing task 2", "completed": false },
        { "id": "w3-3", "title": "Specific DevOps/cloud/testing task 3", "completed": false }
      ],
      "resource": "Recommended cloud or CI/CD masterclass resource"
    },
    {
      "weekNumber": 4,
      "theme": "System Design Mastery, Portfolio Showpiece & STAR Interview Delivery",
      "goal": "Clear actionable goal for week 4",
      "tasks": [
        { "id": "w4-1", "title": "Specific system design or complex project milestone", "completed": false },
        { "id": "w4-2", "title": "Specific resume/portfolio showcase milestone", "completed": false },
        { "id": "w4-3", "title": "Specific interview simulation milestone", "completed": false }
      ],
      "resource": "System Design Primer & High-Bar Interview Playbook"
    }
  ]
}`

  try {
    const text = await generateGeminiAI(prompt)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0])
      if (parsedData?.weeks && Array.isArray(parsedData.weeks)) {
        return NextResponse.json({ data: parsedData })
      }
    }
  } catch (e) {
    console.warn("Gemini learning plan generation failed, using fallback:", e)
  }


  return NextResponse.json({
    data: {
      title: `4-Week Blueprint to ${targetRole}`,
      estimatedWeeklyHours: "6-8 hrs/week",
      weeks: [
        {
          weekNumber: 1,
          theme: "Advanced Architecture & Web Performance",
          goal: "Master server components, SSR optimization, bundle analysis, and compound patterns.",
          tasks: [
            { id: "w1-1", title: "Refactor core UI components into modular compound components with strict TypeScript types", completed: true },
            { id: "w1-2", title: "Audit Web Vitals (LCP, INP, CLS) and implement route streaming with suspense", completed: true },
            { id: "w1-3", title: "Implement resilient state synchronization across offline/online transitions", completed: false },
          ],
          resource: "Next.js Advanced Patterns & Core Web Vitals Optimization",
        },
        {
          weekNumber: 2,
          theme: "High-Throughput Backend & Distributed Caching",
          goal: "Build robust data layers with indexing, Redis caching, and transactional safety.",
          tasks: [
            { id: "w2-1", title: "Design optimized MongoDB/PostgreSQL schemas with compound indexes and query explain plans", completed: false },
            { id: "w2-2", title: "Integrate Redis distributed caching layer with TTL eviction for high-read APIs", completed: false },
            { id: "w2-3", title: "Author end-to-end integration test suites with 85%+ code coverage", completed: false },
          ],
          resource: "High Performance Database Indexing & Caching Strategies",
        },
        {
          weekNumber: 3,
          theme: "Cloud Infrastructure, Containers & Automated CI/CD",
          goal: "Containerize microservices and automate canary deployment pipelines with GitHub Actions.",
          tasks: [
            { id: "w3-1", title: "Containerize full-stack application using optimized multi-stage Docker builds", completed: false },
            { id: "w3-2", title: "Construct GitHub Actions CI/CD with automated linting, test runners, and preview deploys", completed: false },
            { id: "w3-3", title: "Configure cloud observability, structured logging, and APM error alerts", completed: false },
          ],
          resource: "Docker Multi-Stage Deep Dive & Production GitHub Actions Workflows",
        },
        {
          weekNumber: 4,
          theme: "System Design Whiteboarding & Executive STAR Storytelling",
          goal: "Synthesize learning into a standout portfolio centerpiece and master STAR interview delivery.",
          tasks: [
            { id: "w4-1", title: "Complete 3 end-to-end System Design challenges (Notification Engine, Rate Limiter, Payment Gateway)", completed: false },
            { id: "w4-2", title: "Publish a comprehensive architecture README on GitHub with Mermaid diagrams and live demo link", completed: false },
            { id: "w4-3", title: "Conduct 2 mock technical and behavioral screening rounds using the STAR framework", completed: false },
          ],
          resource: "System Design Primer & Senior Engineering Interview Playbook",
        },
      ],
    },
  })
}

