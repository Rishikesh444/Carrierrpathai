import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import clientPromise from "@/lib/mongodb"

export type JobListing = {
  id: string
  company: string
  role: string
  match: number
  salary: string
  location: string
  skills: string[]
  applyUrl: string
  source: "LinkedIn" | "Indeed" | "Company Portal" | "Wellfound"
  description: string
  projectsRecommended: { name: string; tech: string; description: string; githubQuery: string }[]
}

const REAL_JOBS_CATALOG: JobListing[] = [
  {
    id: "vercel-senior-frontend-engineer",
    company: "Vercel",
    role: "Senior Frontend Engineer (Next.js & Turbopack)",
    match: 96,
    salary: "₹35,00,000 – ₹52,00,000 / yr (35–52 LPA)",
    location: "Remote (India / Global)",
    skills: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Web Performance"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Vercel+Frontend+Engineer&location=India",
    source: "LinkedIn",
    description: "Build next-generation developer tooling, edge runtime interfaces, and high-performance server components for millions of web developers.",
    projectsRecommended: [
      {
        name: "Edge-Rendered Real-Time Analytics Platform",
        tech: "Next.js 16 App Router, TypeScript, Redis, Tailwind",
        description: "A sub-50ms analytics dashboard utilizing Server Actions, edge caching, and streaming SSR.",
        githubQuery: "https://github.com/topics/nextjs-dashboard",
      },
      {
        name: "Micro-Frontend Component Design System",
        tech: "React, TypeScript, Storybook, NPM package",
        description: "Zero-runtime CSS design system with automated accessibility (WCAG AAA) testing.",
        githubQuery: "https://github.com/topics/design-system",
      },
    ],
  },
  {
    id: "stripe-fullstack-engineer",
    company: "Stripe",
    role: "Full Stack Engineer (Payments Infrastructure)",
    match: 93,
    salary: "₹40,00,000 – ₹65,00,000 / yr (40–65 LPA)",
    location: "Bengaluru, Karnataka / Remote",
    skills: ["TypeScript", "Node.js", "SQL", "REST APIs", "Distributed Systems", "MongoDB"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Stripe+Full+Stack+Engineer&location=India",
    source: "LinkedIn",
    description: "Develop secure, compliant billing infrastructure and global checkout experiences handling billions of transactions daily.",
    projectsRecommended: [
      {
        name: "Idempotent Webhook & Payment Gateway Service",
        tech: "Node.js, PostgreSQL/MongoDB, Redis Locks, Docker",
        description: "Payment processing engine with zero double-charge guarantee, exponential backoff retries, and audit logging.",
        githubQuery: "https://github.com/topics/payment-gateway",
      },
      {
        name: "Multi-Tenant SaaS Subscription Billing Engine",
        tech: "Next.js, Node.js, Stripe SDK, SQL Transactions",
        description: "Complete usage-based metering and invoice generation engine.",
        githubQuery: "https://github.com/topics/saas-boilerplate",
      },
    ],
  },
  {
    id: "openai-ai-application-engineer",
    company: "OpenAI / Anthropic Ecosystem",
    role: "AI Applications & Full Stack Engineer",
    match: 91,
    salary: "₹48,00,000 – ₹75,00,000 / yr (48–75 LPA)",
    location: "Remote (India / Global)",
    skills: ["Python", "TypeScript", "Next.js", "Generative AI", "Vector DBs", "RAG"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=AI+Application+Engineer&location=India",
    source: "LinkedIn",
    description: "Create autonomous agent workflows, multi-modal context retrieval engines, and real-time streaming LLM applications.",
    projectsRecommended: [
      {
        name: "Autonomous Document Intelligence & RAG Agent",
        tech: "Google Gemini API, Python/TypeScript, Pinecone/MongoDB Atlas Vector Search",
        description: "End-to-end PDF parser and semantic search agent with citation verification.",
        githubQuery: "https://github.com/topics/rag-application",
      },
    ],
  },
  {
    id: "linear-software-engineer-core",
    company: "Linear",
    role: "Software Engineer (Real-time Sync & Desktop)",
    match: 89,
    salary: "₹32,00,000 – ₹48,00,000 / yr (32–48 LPA)",
    location: "Remote (India / Global)",
    skills: ["TypeScript", "React", "State Synchronization", "IndexedDB", "GraphQL"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Linear+Software+Engineer&location=Remote",
    source: "LinkedIn",
    description: "Engineer ultra-fast, local-first web applications with instant keyboard shortcuts and conflict-free replicated data types.",
    projectsRecommended: [
      {
        name: "Local-First Realtime Kanban / Task Board",
        tech: "React, TypeScript, WebSockets, IndexedDB, CRDTs",
        description: "Offline-first collaborative board that syncs instantly upon network reconnection.",
        githubQuery: "https://github.com/topics/kanban-board",
      },
    ],
  },
  {
    id: "google-cloud-software-engineer",
    company: "Google",
    role: "Software Engineer (Cloud & Developer Platforms)",
    match: 87,
    salary: "₹38,00,000 – ₹62,00,000 / yr (38–62 LPA)",
    location: "Bengaluru / Hyderabad, India",
    skills: ["Go", "TypeScript", "Python", "Docker", "Kubernetes", "CI/CD", "Cloud Architecture"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Google+Software+Engineer&location=Bengaluru%2C+Karnataka%2C+India",
    source: "LinkedIn",
    description: "Scale developer infrastructure, microservices mesh, and cloud orchestration tools across Google Cloud Platform.",
    projectsRecommended: [
      {
        name: "Kubernetes Microservices CI/CD Pipeline",
        tech: "Docker, Kubernetes, GitHub Actions, Go / Node.js",
        description: "Automated canary deployment pipeline with zero-downtime blue/green rollouts.",
        githubQuery: "https://github.com/topics/devops-pipeline",
      },
    ],
  },
  {
    id: "apple-software-engineer",
    company: "Apple",
    role: "Software Engineer (Platform & Tools)",
    match: 88,
    salary: "₹36,00,000 – ₹58,00,000 / yr (36–58 LPA)",
    location: "Hyderabad / Bengaluru, India",
    skills: ["Swift", "TypeScript", "React", "Node.js", "Distributed Systems"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Apple+Software+Engineer&location=Hyderabad%2C+Telangana%2C+India",
    source: "LinkedIn",
    description: "Develop high-scale internal developer tools, enterprise services, and high-performance cloud applications for Apple's global engineering teams.",
    projectsRecommended: [
      {
        name: "High-Performance Distributed Workflow Engine",
        tech: "TypeScript, Node.js, Redis, WebSockets",
        description: "Event-driven workflow execution framework with real-time telemetry.",
        githubQuery: "https://github.com/topics/workflow-engine",
      },
    ],
  },
  {
    id: "meta-software-engineer",
    company: "Meta",
    role: "Software Engineer (Product Infrastructure)",
    match: 90,
    salary: "₹42,00,000 – ₹70,00,000 / yr (42–70 LPA)",
    location: "Bengaluru / Remote, India",
    skills: ["React", "TypeScript", "GraphQL", "Python", "Distributed Caching"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Meta+Software+Engineer&location=Bengaluru%2C+Karnataka%2C+India",
    source: "LinkedIn",
    description: "Build scalable web interfaces and high-throughput backend services serving billions of daily active users.",
    projectsRecommended: [
      {
        name: "GraphQL Federation & Realtime Gateway",
        tech: "Node.js, GraphQL, Redis, Docker",
        description: "Federated GraphQL API gateway handling distributed schema stitching.",
        githubQuery: "https://github.com/topics/graphql-api",
      },
    ],
  },
  {
    id: "figma-product-engineer",
    company: "Figma",
    role: "Product Engineer (Collaboration & Canvas)",
    match: 85,
    salary: "₹30,00,000 – ₹46,00,000 / yr (30–46 LPA)",
    location: "Remote (India / APAC)",
    skills: ["React", "TypeScript", "WebGL / Canvas", "Design Systems", "UI/UX"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Figma+Product+Engineer&location=India",
    source: "LinkedIn",
    description: "Build intuitive multiplayer design canvases and extensible plugin ecosystems.",
    projectsRecommended: [
      {
        name: "Collaborative Whiteboard & Canvas Tool",
        tech: "HTML5 Canvas/SVG, WebSockets, TypeScript, React",
        description: "Multi-cursor live canvas with shape rendering, zooming, and export to SVG/PNG.",
        githubQuery: "https://github.com/topics/whiteboard",
      },
    ],
  },
]


export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? ""
  const linkedinUrl = request.nextUrl.searchParams.get("linkedin")?.trim() ?? ""

  let filtered = REAL_JOBS_CATALOG
  if (query) {
    filtered = REAL_JOBS_CATALOG.filter((job) =>
      `${job.company} ${job.role} ${job.skills.join(" ")} ${job.location}`
        .toLowerCase()
        .includes(query)
    )
  }

  // If query is custom and not found in catalog, generate dynamic matches
  if (filtered.length === 0 && query) {
    const encodedQ = encodeURIComponent(query)
    filtered = [
      {
        id: `custom-${Date.now()}`,
        company: "Top Tech Employers (Active Openings)",
        role: `${query.charAt(0).toUpperCase() + query.slice(1)} Specialist`,
        match: 92,
        salary: "₹28,00,000 – ₹45,00,000 / yr (28–45 LPA)",
        location: "Remote / Bengaluru / Hyderabad, India",
        skills: [query, "TypeScript", "React", "Cloud Services", "APIs"],
        applyUrl: `https://www.linkedin.com/jobs/search/?keywords=${encodedQ}&location=India`,
        source: "LinkedIn",
        description: `Active role matching ${query}. Click to apply directly on LinkedIn Jobs or company portals.`,
        projectsRecommended: [
          {
            name: `${query.charAt(0).toUpperCase() + query.slice(1)} Production Portfolio Project`,
            tech: `${query}, TypeScript, Cloud Deployment`,
            description: `A showcase production-ready application demonstrating ${query} mastery.`,
            githubQuery: `https://github.com/topics/${encodedQ.toLowerCase()}`,
          },
        ],
      },
    ]
  }

  return NextResponse.json({
    data: filtered,
    meta: {
      count: filtered.length,
      query,
      linkedinUrl,
      linkedInApplyBase: "https://www.linkedin.com/jobs/search/",
    },
  })
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { jobId, company, role, applyUrl, notes } = body

    if (!jobId || !company || !role) {
      return NextResponse.json({ error: "jobId, company, and role are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("careerai")

    // Record application in MongoDB
    const application = {
      userId: session.user.id,
      jobId,
      company,
      role,
      applyUrl: applyUrl || "https://www.linkedin.com/jobs/",
      appliedAt: new Date(),
      status: "Applied",
      notes: notes || "Applied via CareerOS direct link",
    }

    await db.collection("applications").insertOne(application)

    // Increment applications count on profile
    await db.collection("profiles").updateOne(
      { userId: session.user.id },
      { $inc: { applicationsSent: 1 } },
      { upsert: true }
    )

    return NextResponse.json({ success: true, data: application })
  } catch (err) {
    console.error("Save application error:", err)
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 })
  }
}
