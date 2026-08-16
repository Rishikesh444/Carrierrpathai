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
    const skills = (resume?.skills || []).slice(0, 8).join(", ") || "React, TypeScript, SQL"

    const prompt = `You are an Elite Technical Mentor.
Create a high-impact 4-Week Career Accelerated Learning Plan for a candidate.

Target Role: ${targetRole}
Current Background Skills: ${skills}

Return this exact JSON structure (no markdown fences):
{
  "title": "4-Week Roadmap to ${targetRole}",
  "estimatedWeeklyHours": "6-8 hrs/week",
  "weeks": [
    {
      "weekNumber": 1,
      "theme": "Deepening Core Architecture & Design Patterns",
      "goal": "Master advanced architectural patterns and state management.",
      "tasks": [
        { "id": "w1-1", "title": "Refactor a component tree using compound components and hooks", "completed": true },
        { "id": "w1-2", "title": "Implement end-to-end type safety across API boundaries", "completed": true },
        { "id": "w1-3", "title": "Audit and optimize bundle size and hydration performance", "completed": false }
      ],
      "resource": "Next.js Advanced Patterns & Web Vitals Guide"
    },
    {
      "weekNumber": 2,
      "theme": "Backend Scaling, Caching & Data Layer",
      "goal": "Build robust data layers with indexing, caching, and transactions.",
      "tasks": [
        { "id": "w2-1", "title": "Design a relational schema with proper indexes and foreign keys", "completed": false },
        { "id": "w2-2", "title": "Implement Redis caching layer for heavy read queries", "completed": false },
        { "id": "w2-3", "title": "Write unit and integration tests with 85%+ code coverage", "completed": false }
      ],
      "resource": "High Performance Database Indexing & Caching Strategies"
    },
    {
      "weekNumber": 3,
      "theme": "Cloud Infrastructure, Containers & CI/CD",
      "goal": "Automate deployment workflows and containerize application services.",
      "tasks": [
        { "id": "w3-1", "title": "Containerize full-stack application using multi-stage Dockerfiles", "completed": false },
        { "id": "w3-2", "title": "Set up GitHub Actions CI/CD with automated linting, test, and preview deploys", "completed": false },
        { "id": "w3-3", "title": "Configure observability, logging, and error tracking with Sentry", "completed": false }
      ],
      "resource": "Docker Deep Dive & Production GitHub Actions Workflows"
    },
    {
      "weekNumber": 4,
      "theme": "System Design Mastery & Interview Storytelling",
      "goal": "Synthesize learning into a portfolio centerpiece and master STAR interview delivery.",
      "tasks": [
        { "id": "w4-1", "title": "Complete 3 end-to-end System Design whiteboard challenges", "completed": false },
        { "id": "w4-2", "title": "Document project architecture in a public GitHub README with diagrams", "completed": false },
        { "id": "w4-3", "title": "Conduct 2 mock behavioral and technical screening rounds", "completed": false }
      ],
      "resource": "System Design Primer & Senior Engineering Interview Playbook"
    }
  ]
}`

    try {
      const text = await generateGeminiAI(prompt)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return NextResponse.json({ data: JSON.parse(jsonMatch[0]) })
      }
    } catch (e) {
      console.warn("Gemini learning plan failed, using default:", e)
    }

    return NextResponse.json({
      data: {
        title: `4-Week Roadmap to ${targetRole}`,
        estimatedWeeklyHours: "6-8 hrs/week",
        weeks: [
          {
            weekNumber: 1,
            theme: "Deepening Core Architecture & Design Patterns",
            goal: "Master advanced architectural patterns and state management.",
            tasks: [
              { id: "w1-1", title: "Refactor a component tree using compound components and hooks", completed: true },
              { id: "w1-2", title: "Implement end-to-end type safety across API boundaries", completed: true },
              { id: "w1-3", title: "Audit and optimize bundle size and hydration performance", completed: false },
            ],
            resource: "Next.js Advanced Patterns & Web Vitals Guide",
          },
          {
            weekNumber: 2,
            theme: "Backend Scaling, Caching & Data Layer",
            goal: "Build robust data layers with indexing, caching, and transactions.",
            tasks: [
              { id: "w2-1", title: "Design a relational schema with proper indexes and foreign keys", completed: false },
              { id: "w2-2", title: "Implement Redis caching layer for heavy read queries", completed: false },
              { id: "w2-3", title: "Write unit and integration tests with 85%+ code coverage", completed: false },
            ],
            resource: "High Performance Database Indexing & Caching Strategies",
          },
          {
            weekNumber: 3,
            theme: "Cloud Infrastructure, Containers & CI/CD",
            goal: "Automate deployment workflows and containerize application services.",
            tasks: [
              { id: "w3-1", title: "Containerize full-stack application using multi-stage Dockerfiles", completed: false },
              { id: "w3-2", title: "Set up GitHub Actions CI/CD with automated linting, test, and preview deploys", completed: false },
              { id: "w3-3", title: "Configure observability, logging, and error tracking", completed: false },
            ],
            resource: "Docker Deep Dive & Production GitHub Actions Workflows",
          },
          {
            weekNumber: 4,
            theme: "System Design Mastery & Interview Storytelling",
            goal: "Synthesize learning into a portfolio centerpiece and master STAR interview delivery.",
            tasks: [
              { id: "w4-1", title: "Complete 3 end-to-end System Design whiteboard challenges", completed: false },
              { id: "w4-2", title: "Document project architecture in a public GitHub README with diagrams", completed: false },
              { id: "w4-3", title: "Conduct 2 mock behavioral and technical screening rounds", completed: false },
            ],
            resource: "System Design Primer & Senior Engineering Interview Playbook",
          },
        ],
      },
    })
  } catch (err) {
    console.error("Learning plan API error:", err)
    return NextResponse.json({ error: "Failed to generate learning plan" }, { status: 500 })
  }
}
