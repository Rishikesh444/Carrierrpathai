"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import {
  AlertCircle,
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Command,
  Copy,
  Database,
  ExternalLink,
  FileText,
  Flame,
  Globe,
  GraduationCap,
  HelpCircle,
  Key,
  LayoutDashboard,
  Layers,
  Lightbulb,
  Loader2,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Pause,
  Play,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Upload,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react"
import Image from "next/image"

// ─── Company SVG Icons & Logos ────────────────────────────────────────────────
function CompanyIcon({ name, className = "size-6" }: { name: string; className?: string }) {
  const lower = name.toLowerCase()

  if (lower.includes("google")) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
  }

  if (lower.includes("vercel")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 19.7778H22L12 2Z" fill="white"/>
      </svg>
    )
  }

  if (lower.includes("stripe")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.517.5 7.643.5 4.31 3.048 4.31 7.158c0 5.485 5.568 6.42 8.784 7.669 2.02.772 2.709 1.488 2.709 2.456 0 .979-.865 1.549-2.261 1.549-2.383 0-5.35-1.074-7.234-2.158L5.3 22.316C7.382 23.407 10.424 24 13.521 24c5.158 0 8.643-2.485 8.643-6.945 0-5.263-5.263-6.386-8.188-7.905z" fill="#635BFF"/>
      </svg>
    )
  }

  if (lower.includes("openai") || lower.includes("anthropic")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.66-4.1354a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1402-1.6564z" fill="#10A37F"/>
      </svg>
    )
  }

  if (lower.includes("apple")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.56.65-1.05 1.71-.92 2.74 1 .08 2.02-.49 2.62-1.24z" fill="white"/>
      </svg>
    )
  }

  if (lower.includes("meta") || lower.includes("facebook")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.87 8.16 6.86 9.49v-6.72h-2.44v-2.77h2.44V9.91c0-2.41 1.44-3.75 3.64-3.75 1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.2 0-1.57.74-1.57 1.51v1.81h2.67l-.43 2.77h-2.24V21.5c3.99-1.33 6.86-5.08 6.86-9.49 0-5.5-4.46-9.97-9.96-9.97z" fill="#0081FB"/>
      </svg>
    )
  }

  if (lower.includes("linear")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.5 12a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0zm8.5-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" fill="#5E6AD2"/>
      </svg>
    )
  }

  return (
    <div className="grid size-6 place-items-center rounded bg-indigo-500/20 text-xs font-bold text-indigo-300">
      {name[0]}
    </div>
  )
}

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "Overview" | "Profile" | "Resume" | "Job Matches" | "Interview Prep" | "Skills" | "Learning Plan" | "Settings"

type Job = {
  id: string
  company: string
  role: string
  match: number
  salary: string
  location: string
  skills: string[]
  applyUrl?: string
  source?: string
  description?: string
  projectsRecommended?: { name: string; tech: string; description: string; githubQuery: string }[]
  color?: string
}

type Profile = {
  name: string
  email: string
  title: string
  location: string
  bio: string
  roles: string
  locations: string
  targetSalary?: string
  readiness: number
  resumeScore: number
  skillsScore: number
  experienceScore: number
  applicationsSent: number
  profileViews: number
  image?: string | null
}

type ParsedResume = {
  name: string | null
  email: string | null
  phone: string | null
  title: string | null
  location?: string | null
  summary?: string | null
  skills: string[]
  workHistory: { company: string; role: string; duration: string; highlights: string[] }[]
  education: { institution: string; degree: string; year: string }[]
  rolesExtracted: number
  skillsFound: number
  atsScore: number
  fileName: string
}

type ChatMessage = { role: "user" | "ai"; content: string }

type InterviewQuestion = {
  id: string
  category: string
  question: string
  difficulty: "Easy" | "Medium" | "Hard" | string
  keyFocus: string
  tip: string
}

type StarEvaluation = {
  score: number
  starBreakdown: { situation: string; task: string; action: string; result: string }
  strengths: string[]
  improvements: string[]
  improvedSample: string
}

type SkillCategory = {
  name: string
  skills: { name: string; level: string; match: number; status: string }[]
}

type SkillsData = {
  readinessScore: number
  topStrengths: string[]
  criticalGaps: string[]
  categories: SkillCategory[]
  marketDemandInsights: string
}

type LearningTask = { id: string; title: string; completed: boolean }
type LearningWeek = { weekNumber: number; theme: string; goal: string; tasks: LearningTask[]; resource: string }
type LearningPlanData = { title: string; estimatedWeeklyHours: string; weeks: LearningWeek[] }

// ─── Nav Configuration ────────────────────────────────────────────────────────
const nav: { label: Tab; icon: typeof LayoutDashboard; badge?: string }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Profile", icon: User },
  { label: "Resume", icon: FileText },
  { label: "Interview Prep", icon: Target, badge: "AI Audio" },
  { label: "Job Matches", icon: BriefcaseBusiness },
  { label: "Skills", icon: GraduationCap },
  { label: "Learning Plan", icon: BarChart3 },
  { label: "Settings", icon: Settings },
]

const JOB_COLORS = [
  "bg-indigo-600",
  "bg-violet-600",
  "bg-emerald-600",
  "bg-sky-600",
  "bg-rose-600",
  "bg-amber-600",
]

// ─── Root Dashboard ───────────────────────────────────────────────────────────
export function CareerOSDashboard() {
  const { data: session } = useSession()
  const [active, setActive] = useState<Tab>("Overview")
  const [mobileNav, setMobileNav] = useState(false)
  const [overlay, setOverlay] = useState<"search" | "notifications" | "ai" | "job" | null>(null)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [completed, setCompleted] = useState<string[]>([])
  const [query, setQuery] = useState("")
  const [jobs, setJobs] = useState<Job[]>([])
  const [profile, setProfile] = useState<Profile>({
    name: session?.user?.name ?? "Candidate",
    email: session?.user?.email ?? "",
    title: "Senior Full Stack Engineer",
    location: "Remote / San Francisco, CA",
    bio: "Accomplished software engineer specializing in scalable Next.js cloud architectures, high-concurrency TypeScript microservices, and distributed data systems.",
    roles: "Senior Software Engineer, Full Stack Lead, AI Applications Architect",
    locations: "Remote, San Francisco, New York",
    targetSalary: "$165,000 – $225,000",
    readiness: 72,
    resumeScore: 82,
    skillsScore: 86,
    experienceScore: 78,
    applicationsSent: 5,
    profileViews: 42,
    image: session?.user?.image,
  })
  const [uploadOpen, setUploadOpen] = useState(false)
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatLoading, setChatLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Job[]>([])

  const go = (tab: Tab) => {
    setActive(tab)
    setMobileNav(false)
    setOverlay(null)
  }

  // Load profile + jobs + latest resume from MongoDB on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [profileRes, jobsRes, resumeRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/jobs"),
          fetch("/api/resume"),
        ])
        if (profileRes.ok) {
          const { data } = await profileRes.json()
          if (data) {
            setProfile((prev) => ({
              ...prev,
              ...data,
              image: data.image ?? session?.user?.image,
            }))
          }
        }
        if (jobsRes.ok) {
          const { data } = await jobsRes.json()
          if (data && Array.isArray(data)) {
            setJobs(data.map((j: Job, i: number) => ({ ...j, color: JOB_COLORS[i % JOB_COLORS.length] })))
          }
        }
        if (resumeRes.ok) {
          const { data } = await resumeRes.json()
          if (data && data.length > 0) {
            setParsedResume(data[0])
          }
        }
      } catch (e) {
        console.error("Failed to load initial data:", e)
      } finally {
        setProfileLoading(false)
      }
    }
    loadData()
  }, [session])

  // Search jobs debounced
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([])
      return
    }
    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/jobs?q=${encodeURIComponent(searchQuery)}`)
      if (res.ok) {
        const { data } = await res.json()
        setSearchResults(data.map((j: Job, i: number) => ({ ...j, color: JOB_COLORS[i % JOB_COLORS.length] })))
      }
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  const filteredJobs = useMemo(
    () => jobs.filter((j) => `${j.company} ${j.role} ${j.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase())),
    [jobs, query]
  )

  const handleSendChat = async (message: string) => {
    if (!message.trim()) return
    const userMsg: ChatMessage = { role: "user", content: message }
    const nextMessages = [...chatMessages, userMsg]
    setChatMessages(nextMessages)
    setChatLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: chatMessages,
          context: {
            name: profile.name,
            title: profile.title,
            location: profile.location,
            skills: parsedResume?.skills || [],
            atsScore: parsedResume?.atsScore || profile.resumeScore,
            targetRoles: profile.roles,
          },
        }),
      })
      if (res.ok) {
        const { reply } = await res.json()
        setChatMessages((prev) => [...prev, { role: "ai", content: reply }])
      }
    } catch {
      setChatMessages((prev) => [...prev, { role: "ai", content: "Sorry, I couldn't connect. Please try again." }])
    } finally {
      setChatLoading(false)
    }
  }

  // Handle post-resume upload action
  const handleResumeParsed = (data: ParsedResume, launchInterview = false) => {
    setParsedResume(data)
    setProfile((prev) => ({
      ...prev,
      ...(data.name ? { name: data.name } : {}),
      ...(data.email ? { email: data.email } : {}),
      ...(data.title ? { title: data.title } : {}),
      resumeScore: data.atsScore,
      skillsScore: Math.min(100, data.skillsFound * 8),
      readiness: Math.min(100, Math.max(prev.readiness + 15, Math.round(data.atsScore * 0.75) + 20)),
    }))

    if (launchInterview) {
      setUploadOpen(false)
      setActive("Interview Prep")
    }
  }

  const userName = profile.name || session?.user?.name || "Candidate"
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  const userImage = profile.image ?? session?.user?.image

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 antialiased font-sans">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent blur-[120px] animate-pulse-glow" />
        <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-bl from-blue-600/12 via-emerald-600/8 to-transparent blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-purple-600/10 via-pink-600/5 to-transparent blur-[130px]" />
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/[0.08] bg-slate-950/80 px-4 py-5 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          mobileNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="mb-7 flex items-center justify-between px-2">
          <button onClick={() => go("Overview")} className="flex items-center gap-3 font-semibold tracking-tight text-left">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
              <Sparkles className="size-4.5" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-white">Career<span className="text-indigo-400">OS</span></span>
                <span className="rounded-full bg-indigo-500/20 border border-indigo-500/30 px-1.5 py-0.2 text-[9px] font-bold text-indigo-300">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal">Resume Intelligence</p>
            </div>
          </button>
          <button
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileNav(false)}
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="px-3 pb-2.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Navigation</p>
        <nav className="flex flex-col gap-1">
          {nav.map(({ label, icon: Icon, badge }) => {
            const isActive = active === label
            return (
              <button
                key={label}
                onClick={() => go(label)}
                className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 to-violet-500/10 text-white font-medium shadow-sm border-l-2 border-indigo-500 ring-1 ring-white/10"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`size-4 transition-colors ${isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-300"}`} />
                  <span>{label}</span>
                </div>
                {badge && (
                  <span className="rounded-full bg-indigo-500/20 border border-indigo-500/40 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Live Engine Status Badge */}
        <div className="mt-5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.07] p-3 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs text-indigo-200">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[11px] text-white">Gemini 3.5 Flash AI</p>
              <p className="text-[10px] text-emerald-400 font-medium truncate">ATS & STAR Audio Active</p>
            </div>
          </div>
        </div>

        {/* User Card & Logout */}
        <div className="mt-auto space-y-3 border-t border-white/[0.08] pt-4">
          <button
            onClick={() => go("Profile")}
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-white/[0.04] transition-colors"
          >
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={36}
                height={36}
                className="size-9 rounded-full object-cover ring-2 ring-indigo-500/30 shadow-md"
              />
            ) : (
              <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-600/30 text-sm font-semibold text-indigo-300 border border-indigo-500/30 shadow-inner">
                {userInitials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{userName}</p>
              <p className="truncate text-[11px] text-slate-400">{profile.title || profile.email || "Active User"}</p>
            </div>
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {mobileNav && (
        <button
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileNav(false)}
          aria-label="Close menu"
        />
      )}

      {/* Main Content Area */}
      <main className="relative z-10 lg:pl-64 min-h-screen flex flex-col">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/[0.08] bg-slate-950/70 px-4 backdrop-blur-2xl md:px-8">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/5"
              onClick={() => setMobileNav(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">{dateStr}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 inline-block" /> Live Sync
                </span>
              </div>
              <h1 className="text-sm md:text-base font-semibold tracking-tight text-white">
                {greeting}, {userName.split(" ")[0]}
              </h1>
            </div>
          </div>

          {/* Quick Action Top Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOverlay("search")}
              className="hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
              aria-label="Search"
            >
              <Search className="size-3.5" />
              <span>Search jobs &amp; skills...</span>
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-slate-300">⌘K</kbd>
            </button>
            <button
              onClick={() => setUploadOpen(true)}
              className="hidden md:flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20 transition-colors"
            >
              <Upload className="size-3.5" />
              <span>Upload Resume</span>
            </button>
            <button
              onClick={() => setOverlay("notifications")}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </button>
            <button
              onClick={() => setOverlay("ai")}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-500 transition-all active:scale-95"
            >
              <Sparkles className="size-3.5" />
              <span>AI Coach</span>
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="mx-auto max-w-7xl w-full p-4 md:p-8 flex-1">
          {active === "Overview" && (
            <Overview
              go={go}
              completed={completed}
              setCompleted={setCompleted}
              setOverlay={setOverlay}
              setSelectedJob={setSelectedJob}
              jobs={jobs}
              profile={profile}
              parsedResume={parsedResume}
              setUploadOpen={setUploadOpen}
            />
          )}
          {active === "Profile" && (
            <ProfileEditor
              profile={profile}
              setProfile={setProfile}
              setUploadOpen={setUploadOpen}
              loading={profileLoading}
              parsedResume={parsedResume}
            />
          )}
          {active === "Resume" && (
            <ResumePage
              setUploadOpen={setUploadOpen}
              parsedResume={parsedResume}
              profile={profile}
              go={go}
            />
          )}
          {active === "Interview Prep" && (
            <InterviewPrepPage
              profile={profile}
              parsedResume={parsedResume}
              setOverlay={setOverlay}
            />
          )}
          {active === "Job Matches" && (
            <JobMatchesPage
              jobs={filteredJobs}
              query={query}
              setQuery={setQuery}
              setSelectedJob={setSelectedJob}
              setOverlay={setOverlay}
              parsedResume={parsedResume}
            />
          )}
          {active === "Skills" && (
            <SkillsPage
              profile={profile}
              parsedResume={parsedResume}
              setOverlay={setOverlay}
            />
          )}
          {active === "Learning Plan" && (
            <LearningPlanPage
              profile={profile}
              parsedResume={parsedResume}
              setOverlay={setOverlay}
            />
          )}
          {active === "Settings" && (
            <SettingsPage
              profile={profile}
              session={session}
            />
          )}
        </div>
      </main>

      {/* Upload Modal */}
      {uploadOpen && (
        <UploadModal
          onClose={() => setUploadOpen(false)}
          onParsed={(data, launchInterview) => handleResumeParsed(data, launchInterview)}
        />
      )}

      {/* Overlay: AI Coach / Search / Notifications / Job Detail */}
      {overlay && (
        <Overlay
          kind={overlay}
          setOverlay={setOverlay}
          job={selectedJob}
          chatMessages={chatMessages}
          chatLoading={chatLoading}
          onSendChat={handleSendChat}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          onSelectJob={(job) => {
            setSelectedJob(job)
            setOverlay("job")
          }}
        />
      )}
    </div>
  )
}

// ─── Glass Card Component ─────────────────────────────────────────────────────
function Card({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode
  className?: string
  glow?: boolean
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/50 p-5 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 md:p-6 ${
        glow ? "ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-500/5" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}

// ─── Overview Tab (Enterprise Executive Level) ────────────────────────────────
function Overview({
  go,
  completed,
  setCompleted,
  setOverlay,
  setSelectedJob,
  jobs,
  profile,
  parsedResume,
  setUploadOpen,
}: {
  go: (tab: Tab) => void
  completed: string[]
  setCompleted: (items: string[]) => void
  setOverlay: (v: "ai" | "job") => void
  setSelectedJob: (job: Job) => void
  jobs: Job[]
  profile: Profile
  parsedResume: ParsedResume | null
  setUploadOpen: (v: boolean) => void
}) {
  const displayJobs = jobs.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Hero Executive Command Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-slate-950/90 p-6 md:p-10 backdrop-blur-2xl shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 size-72 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
              <Sparkles className="size-3.5 text-indigo-400 animate-pulse" />
              <span>Resume Intelligence Active</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl leading-tight">
              Scale your career velocity.<br />
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                Tailored directly from your resume.
              </span>
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-slate-300">
              {parsedResume ? (
                <>
                  Targeting <strong className="text-white">{parsedResume.title || profile.title}</strong> with{" "}
                  <span className="text-indigo-300 font-semibold">{parsedResume.skillsFound} verified skills</span> and an ATS score of{" "}
                  <span className="text-emerald-400 font-bold">{parsedResume.atsScore}/100</span>.
                </>
              ) : (
                "Upload your resume to extract high-frequency industry keywords, simulate STAR interview rounds, and match real LinkedIn company openings."
              )}
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => go("Interview Prep")}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-400 hover:to-violet-500 transition-all active:scale-95"
              >
                <Target className="size-4" /> Practice Audio Interview
              </button>
              <button
                onClick={() => (parsedResume ? go("Resume") : setUploadOpen(true))}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white hover:bg-white/[0.12] transition-colors"
              >
                <FileText className="size-4" /> {parsedResume ? "View ATS Score & Breakdown" : "Upload Resume (PDF)"}
              </button>
            </div>
          </div>

          {/* Quick Readiness Score Gauge Widget */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl shadow-xl">
            <div className="relative grid size-32 place-items-center">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-400 stroke-current transition-all duration-1000"
                  strokeWidth="3.2"
                  strokeDasharray={`${profile.readiness}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold tracking-tight text-white">{profile.readiness}%</span>
                <span className="text-[10px] text-indigo-300 font-medium uppercase">Readiness</span>
              </div>
            </div>
            <div className="text-center sm:text-left lg:text-center">
              <p className="text-xs font-semibold text-white">Market Competitiveness</p>
              <p className="text-[11px] text-slate-400">Calculated via live AI benchmarks</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Stat Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Career Readiness"
          value={`${profile.readiness}%`}
          detail="+14% this quarter"
          icon={Award}
          progress={profile.readiness}
        />
        <StatCard
          label="ATS Resume Score"
          value={parsedResume?.atsScore ? `${parsedResume.atsScore}/100` : `${profile.resumeScore || 82}/100`}
          detail={parsedResume ? "Analyzed via Gemini" : "Top tier compatibility"}
          icon={FileText}
          progress={parsedResume?.atsScore || profile.resumeScore || 82}
        />
        <StatCard
          label="Verified Skills Index"
          value={parsedResume ? `${parsedResume.skillsFound}` : "18"}
          detail="Extracted &amp; mapped"
          icon={GraduationCap}
          progress={Math.min(100, (parsedResume?.skillsFound || 18) * 5)}
        />
        <StatCard
          label="Target Role Alignment"
          value="94%"
          detail={parsedResume?.title ? parsedResume.title.slice(0, 24) : (profile.title ? profile.title.slice(0, 24) : "Senior Full Stack")}
          icon={Target}
          progress={94}
        />
      </section>

      {/* Main 2-Column Grid */}
      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Left: Recommended Executive Action Steps */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-indigo-400" />
                  Strategic Next Actions
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">High-leverage tasks to optimize candidate standing</p>
              </div>
              <button
                onClick={() => setOverlay("ai")}
                className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 flex items-center gap-1"
              >
                Ask AI Coach <ChevronRight className="size-3" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  icon: Target,
                  title: "Practice STAR Interview with Voice Narration",
                  detail: "Listen to questions read aloud and record structured answers",
                  tag: "Audio Ready",
                  tab: "Interview Prep" as Tab,
                  color: "text-indigo-400 bg-indigo-500/15",
                },
                {
                  icon: FileText,
                  title: "Achieve ATS 100/100 Blueprint",
                  detail: "Audit high-frequency keywords detected from your resume",
                  tag: "ATS Score",
                  tab: "Resume" as Tab,
                  color: "text-emerald-400 bg-emerald-500/15",
                },
                {
                  icon: GraduationCap,
                  title: "Bridge Priority Technical Gaps",
                  detail: "Master Distributed Systems, Redis Caching & Cloud Infrastructure",
                  tag: "Market Gaps",
                  tab: "Skills" as Tab,
                  color: "text-violet-400 bg-violet-500/15",
                },
                {
                  icon: BarChart3,
                  title: "Follow 4-Week Custom Learning Roadmap",
                  detail: "Complete weekly actionable milestones tailored to your resume",
                  tag: "Roadmap",
                  tab: "Learning Plan" as Tab,
                  color: "text-sky-400 bg-sky-500/15",
                },
              ].map((item) => (
                <ActionItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  detail={item.detail}
                  tag={item.tag}
                  color={item.color}
                  done={completed.includes(item.title)}
                  onToggle={() =>
                    setCompleted(
                      completed.includes(item.title)
                        ? completed.filter((x) => x !== item.title)
                        : [...completed, item.title]
                    )
                  }
                  onOpen={() => go(item.tab)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <span>{completed.length} of 4 milestones completed</span>
            <div className="h-1.5 w-36 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${(completed.length / 4) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Right: Competency Breakdown & AI Profile Snapshot */}
        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white tracking-tight">Competency Breakdown</h3>
                <p className="text-xs text-slate-400 mt-0.5">Real-time profile performance</p>
              </div>
              <button onClick={() => go("Profile")} className="text-xs font-medium text-indigo-300 hover:text-indigo-200">
                Edit Profile
              </button>
            </div>

            <div className="space-y-3.5">
              <ScoreBar label="ATS Resume Quality" value={parsedResume?.atsScore || profile.resumeScore || 82} color="bg-indigo-400" />
              <ScoreBar label="Technical Skill Depth" value={profile.skillsScore || 86} color="bg-emerald-400" />
              <ScoreBar label="Leadership & Ownership" value={profile.experienceScore || 78} color="bg-violet-400" />
              <ScoreBar label="Interview Readiness" value={88} color="bg-sky-400" />
            </div>

            <div className="mt-5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.06] p-3 text-xs text-slate-300 flex items-center gap-2">
              <Lightbulb className="size-4 text-amber-400 shrink-0" />
              <span>
                <strong>Coach Tip:</strong> Answering 3 STAR interview questions will boost your Interview score by +12%.
              </span>
            </div>
          </Card>

          {/* Quick AI Simulation Trigger */}
          <Card className="bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-900 border-indigo-500/30">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
                <Sparkles className="size-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Simulate Live Interview</h4>
                <p className="text-xs text-slate-400">With audio playback &amp; instant STAR scoring</p>
              </div>
            </div>
            <button
              onClick={() => go("Interview Prep")}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 py-2.5 text-xs font-semibold text-indigo-200 transition-all"
            >
              Open Interview Studio <ArrowRight className="size-3.5" />
            </button>
          </Card>
        </div>
      </section>

      {/* Bottom Grid: Curated Job Matches & Weekly Learning Plan */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Curated Jobs */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white tracking-tight flex items-center gap-2">
                <BriefcaseBusiness className="size-4.5 text-indigo-400" />
                Featured Real Openings (LinkedIn)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Direct apply portals with company logos</p>
            </div>
            <button onClick={() => go("Job Matches")} className="text-xs font-semibold text-indigo-300 hover:text-indigo-200">
              View all ({jobs.length})
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {displayJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => {
                  setSelectedJob(job)
                  setOverlay("job")
                }}
                className="flex items-center gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 cursor-pointer hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all"
              >
                <div className="grid size-11 place-items-center rounded-xl bg-white/[0.06] border border-white/10 p-2 shadow-md">
                  <CompanyIcon name={job.company} className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{job.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {job.company} • <span className="text-indigo-300 font-medium">{job.salary}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                    {job.match}% match
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">{job.location.split("/")[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Roadmap Tracker */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white tracking-tight flex items-center gap-2">
                <BarChart3 className="size-4.5 text-indigo-400" />
                Active Learning Roadmap
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">4-Week Accelerated Syllabus</p>
            </div>
            <button onClick={() => go("Learning Plan")} className="text-xs font-semibold text-indigo-300 hover:text-indigo-200">
              Full Roadmap
            </button>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-300 mb-1">
              <span>WEEK 1 OF 4</span>
              <span>75% Complete</span>
            </div>
            <h4 className="font-semibold text-white text-sm">Advanced Frontend Architecture &amp; Web Performance</h4>
            <p className="text-xs text-slate-400 mt-1">Master Next.js server components, SSR optimization, and compound patterns.</p>

            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 w-[75%]" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="size-3.5 text-indigo-400" /> 6.5 / 8.0 hrs logged
              </span>
              <button
                onClick={() => go("Learning Plan")}
                className="font-medium text-indigo-300 hover:text-indigo-200 flex items-center gap-1"
              >
                Continue tasks <ChevronRight className="size-3" />
              </button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  progress,
}: {
  label: string
  value: string
  detail: string
  icon: typeof Award
  progress: number
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <div className="grid size-8 place-items-center rounded-lg bg-white/[0.04] text-indigo-300 border border-white/[0.06]">
          <Icon className="size-4" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
        <span className="text-xs font-semibold text-indigo-300">{detail}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-700"
          style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
        />
      </div>
    </Card>
  )
}

function ActionItem({
  icon: Icon,
  title,
  detail,
  tag,
  color,
  done,
  onToggle,
  onOpen,
}: {
  icon: typeof FileText
  title: string
  detail: string
  tag: string
  color: string
  done: boolean
  onToggle: () => void
  onOpen: () => void
}) {
  return (
    <div
      className={`group flex items-center gap-3.5 rounded-xl border p-3.5 transition-all duration-200 ${
        done
          ? "border-emerald-500/20 bg-emerald-500/[0.04] opacity-70"
          : "border-white/[0.06] bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.05]"
      }`}
    >
      <button
        onClick={onToggle}
        className={`grid size-9 shrink-0 place-items-center rounded-xl transition-all ${
          done
            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
            : `${color} border border-white/10 group-hover:scale-105`
        }`}
        aria-label={`Mark ${title} ${done ? "incomplete" : "complete"}`}
      >
        {done ? <Check className="size-4.5 stroke-[2.5]" /> : <Icon className="size-4" />}
      </button>

      <button onClick={onOpen} className="min-w-0 flex-1 text-left">
        <p className={`truncate text-sm font-semibold text-white ${done ? "line-through text-slate-400" : ""}`}>
          {title}
        </p>
        <p className="truncate text-xs text-slate-400 mt-0.5">{detail}</p>
      </button>

      <span className="hidden sm:inline-block rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
        {tag}
      </span>

      <button
        onClick={onOpen}
        aria-label={`Open ${title}`}
        className="text-slate-500 hover:text-white transition-colors"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-slate-300 font-medium">{label}</span>
        <span className="font-bold text-white">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

// ─── Profile Editor with Animated Apple-Style Aurora Background ───────────────
function ProfileEditor({
  profile,
  setProfile,
  setUploadOpen,
  loading,
  parsedResume,
}: {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
  setUploadOpen: (v: boolean) => void
  loading: boolean
  parsedResume: ParsedResume | null
}) {
  const [tab, setTab] = useState<"Personal" | "Preferences" | "Resume Sync" | "Dossier">("Personal")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const update = useCallback(
    (key: keyof Profile, value: string) => {
      setProfile((p) => ({ ...p, [key]: value }))
      setSaved(false)
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(async () => {
        setSaving(true)
        try {
          await fetch("/api/profile", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [key]: value }),
          })
          setSaved(true)
        } finally {
          setSaving(false)
        }
      }, 700)
    },
    [setProfile]
  )

  const handleCopyProfileLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
        <Loader2 className="size-8 animate-spin text-indigo-400" />
        <span className="text-sm">Loading executive profile...</span>
      </div>
    )
  }

  return (
    <div className="relative space-y-8">
      {/* Dynamic Animated Apple Aurora Backdrop for Profile */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none rounded-3xl opacity-70">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/20 via-violet-600/15 to-transparent blur-[100px] animate-float" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-pink-500/15 via-purple-600/15 to-transparent blur-[110px] animate-pulse-glow" />
      </div>

      {/* Profile Header Card */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6 md:p-8 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt={profile.name}
                  width={80}
                  height={80}
                  className="size-20 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-xl"
                />
              ) : (
                <div className="grid size-20 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 text-2xl font-bold text-white shadow-xl ring-4 ring-indigo-500/20">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-emerald-500 text-white shadow-md ring-2 ring-slate-950">
                <Check className="size-3.5 stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{profile.name}</h2>
                <span className="rounded-full bg-indigo-500/20 border border-indigo-500/40 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                  Verified Candidate
                </span>
                {parsedResume && (
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                    ATS: {parsedResume.atsScore}/100
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-300 mt-1">{profile.title || "Full Stack Engineer"}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                <MapPin className="size-3 text-indigo-400" /> {profile.location || "Remote"} • {profile.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {saving && (
              <span className="text-xs text-slate-400 flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Loader2 className="size-3 animate-spin text-indigo-400" /> Auto-saving...
              </span>
            )}
            {saved && !saving && (
              <span className="text-xs text-emerald-300 font-medium flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <Check className="size-3" /> Saved to MongoDB
              </span>
            )}
            <button
              onClick={() => setUploadOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 hover:bg-indigo-400 transition-all"
            >
              <Upload className="size-3.5" /> Upload Resume PDF
            </button>
            <button
              onClick={handleCopyProfileLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors"
            >
              {copiedLink ? <Check className="size-3.5 text-emerald-400" /> : <Share2 className="size-3.5" />}
              <span>{copiedLink ? "Link Copied!" : "Share Profile"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Segmented iOS Style Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-950/60 border border-white/[0.08] backdrop-blur-xl w-fit">
        {[
          { id: "Personal", label: "Executive Info" },
          { id: "Preferences", label: "Role & Target Preferences" },
          { id: "Resume Sync", label: "Extracted Resume Stack" },
          { id: "Dossier", label: "Export Dossier" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
              tab === t.id
                ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Personal Info */}
      {tab === "Personal" && (
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <h3 className="font-bold text-white text-base mb-4">Core Identity &amp; Contact</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-xs text-slate-400">
                Full Name
                <input
                  value={profile.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs text-slate-400">
                Email Address
                <input
                  value={profile.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs text-slate-400">
                Professional Title
                <input
                  value={profile.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs text-slate-400">
                Location
                <input
                  value={profile.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="e.g. San Francisco, CA (or Remote)"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                />
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-1.5 text-xs text-slate-400">
              Executive Bio &amp; Value Proposition
              <textarea
                value={profile.bio}
                onChange={(e) => update("bio", e.target.value)}
                rows={4}
                placeholder="Summarize your engineering expertise, system architecture background, and major quantifiable career outcomes..."
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-sm text-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all leading-relaxed"
              />
            </label>
          </Card>

          {/* Live Profile Score Card */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Profile Readiness</span>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                  Live Sync
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white tracking-tight">{profile.readiness}%</span>
                <span className="text-xs text-slate-400">out of 100</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Based on completeness, verified skills, and ATS compatibility.</p>

              <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-500"
                  style={{ width: `${profile.readiness}%` }}
                />
              </div>

              <div className="mt-5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Name &amp; Contact:</span>
                  <span className="text-emerald-400 font-semibold">✓ Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Target Title:</span>
                  <span className={profile.title ? "text-emerald-400 font-semibold" : "text-amber-400"}>
                    {profile.title ? "✓ Configured" : "Add title"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Resume Attached:</span>
                  <span className={parsedResume ? "text-emerald-400 font-semibold" : "text-amber-400"}>
                    {parsedResume ? `✓ ATS ${parsedResume.atsScore}/100` : "Upload PDF"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: Preferences */}
      {tab === "Preferences" && (
        <Card>
          <h3 className="font-bold text-white text-base mb-4">Target Roles &amp; Work Locations</h3>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-xs text-slate-400">
              Desired Job Roles (comma-separated)
              <input
                value={profile.roles}
                onChange={(e) => update("roles", e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer, Next.js Developer, Tech Lead"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-400 transition-all"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-xs text-slate-400">
              Preferred Work Locations
              <input
                value={profile.locations}
                onChange={(e) => update("locations", e.target.value)}
                placeholder="e.g. Remote, Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-400 transition-all"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-xs text-slate-400">
              Target Compensation Range (₹ LPA)
              <input
                value={profile.targetSalary || "₹32,00,000 – ₹55,00,000 / yr (32–55 LPA)"}
                onChange={(e) => update("targetSalary", e.target.value)}
                placeholder="e.g. ₹28,00,000 – ₹45,00,000 / yr (28–45 LPA)"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-400 transition-all"
              />
            </label>

          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08]">
            <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Suggested High-Growth Roles:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Senior Next.js Developer",
                "Full Stack AI Engineer",
                "Cloud Solutions Architect",
                "Frontend Platform Engineer",
                "Staff Software Engineer",
              ].map((role) => (
                <button
                  key={role}
                  onClick={() => update("roles", profile.roles ? `${profile.roles}, ${role}` : role)}
                  className="rounded-lg bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-200 border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition-colors flex items-center gap-1"
                >
                  <Plus className="size-3" /> {role}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Resume Sync */}
      {tab === "Resume Sync" && (
        <div className="space-y-6">
          {parsedResume ? (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white text-base">Connected Resume Intelligence</h3>
                  <p className="text-xs text-slate-400">{parsedResume.fileName}</p>
                </div>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-300">
                  ATS Score: {parsedResume.atsScore}/100
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Extracted Skills ({parsedResume.skills.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {parsedResume.skills.map((s) => (
                      <span key={s} className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-xs font-medium text-indigo-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {parsedResume.workHistory?.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.08]">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Extracted Roles</p>
                    <div className="space-y-3">
                      {parsedResume.workHistory.map((wh, idx) => (
                        <div key={idx} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                          <p className="font-semibold text-sm text-white">{wh.role}</p>
                          <p className="text-xs text-slate-400">{wh.company} • {wh.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <FileText className="size-12 mx-auto text-indigo-400 mb-3" />
              <h3 className="font-bold text-white">No Resume Uploaded Yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Upload your PDF resume to automatically sync verified skills, work history, and calculate your ATS index.
              </p>
              <button
                onClick={() => setUploadOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-400 transition-colors shadow-md"
              >
                <Upload className="size-4" /> Upload Resume PDF
              </button>
            </Card>
          )}
        </div>
      )}

      {/* Tab 4: Export Dossier */}
      {tab === "Dossier" && (
        <Card className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">CareerOS Dossier</span>
              <h3 className="text-2xl font-bold text-white mt-1">{profile.name}</h3>
              <p className="text-xs text-slate-400">{profile.title || "Full Stack Specialist"} • {profile.location || "Remote"}</p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-400 transition-colors shadow-md w-fit"
            >
              <Printer className="size-4" /> Print / Download Executive PDF
            </button>
          </div>

          <div className="space-y-5 text-xs text-slate-300 leading-relaxed">
            <div>
              <p className="font-bold text-white text-sm uppercase tracking-wider mb-1">Executive Summary</p>
              <p className="text-slate-300">{profile.bio || "Experienced technical leader with proven expertise designing and executing scalable software architectures."}</p>
            </div>

            <div>
              <p className="font-bold text-white text-sm uppercase tracking-wider mb-2">Verified Core Competencies</p>
              <div className="flex flex-wrap gap-2">
                {(parsedResume?.skills || ["TypeScript", "Next.js", "React", "Node.js", "SQL", "Cloud Infrastructure", "System Design"]).map((s) => (
                  <span key={s} className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-bold text-white text-sm uppercase tracking-wider mb-1">Career Metrics</p>
              <p className="text-slate-400">ATS Readiness Score: {parsedResume?.atsScore || profile.resumeScore || 82}/100 • Profile Readiness: {profile.readiness}%</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── Interview Prep Studio (With Audio Play Button & Gemini AI) ───────────────
function InterviewPrepPage({
  profile,
  parsedResume,
  setOverlay,
}: {
  profile: Profile
  parsedResume: ParsedResume | null
  setOverlay: (v: "ai") => void
}) {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [evaluating, setEvaluating] = useState(false)
  const [evaluation, setEvaluation] = useState<StarEvaluation | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [customRole, setCustomRole] = useState("")
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const activeRole = customRole || parsedResume?.title || profile.title || "Senior Full Stack Engineer"
  const activeSkills = parsedResume?.skills || ["TypeScript", "Next.js", "React", "Node.js", "SQL"]

  const fetchQuestions = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: activeRole,
          skills: activeSkills.slice(0, 10).join(", "),
        }),
      })
      if (res.ok) {
        const { data } = await res.json()
        const qList = data?.questions || []
        setQuestions(qList)
        if (qList[0]) {
          setSelectedQuestion(qList[0])
        }
      }
    } catch (e) {
      console.error("Failed to load interview questions:", e)
    } finally {
      setLoading(false)
    }
  }, [activeRole, activeSkills])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  // Audio Play Question Function using Web Speech Synthesis API
  const handlePlayQuestionAudio = (questionText: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(questionText)
    utterance.rate = 0.95
    utterance.pitch = 1.0

    // Try to choose a natural English voice if available
    const voices = window.speechSynthesis.getVoices()
    const selectedVoice = voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Premium")))
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    utterance.onstart = () => setIsPlayingAudio(true)
    utterance.onend = () => setIsPlayingAudio(false)
    utterance.onerror = () => setIsPlayingAudio(false)

    window.speechSynthesis.speak(utterance)
  }

  // Cancel audio when unmounting or switching question
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [selectedQuestion])

  const handleEvaluate = async () => {
    if (!userAnswer.trim() || !selectedQuestion) return
    setEvaluating(true)
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "evaluate",
          role: activeRole,
          question: selectedQuestion.question,
          answer: userAnswer,
        }),
      })
      if (res.ok) {
        const { data } = await res.json()
        setEvaluation(data)
      }
    } finally {
      setEvaluating(false)
    }
  }

  const categories = ["All", "Behavioral", "Technical Architecture", "Problem Solving", "Leadership & Impact"]
  const filteredQuestions =
    filterCategory === "All"
      ? questions
      : questions.filter((q) => q.category.toLowerCase().includes(filterCategory.toLowerCase()))

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <section className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-slate-950/90 p-6 md:p-8 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">
              <Volume2 className="size-3.5 text-indigo-400 animate-pulse" />
              <span>Gemini Audio Simulation Engine</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mt-2">Interview Prep Studio</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
              Questions crafted by Gemini AI based on your resume as{" "}
              <strong className="text-white">{activeRole}</strong>. Click <span className="text-indigo-300 font-semibold">▶ Play</span> to listen to any question out loud.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={fetchQuestions}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Regenerate Questions
            </button>
            <button
              onClick={() => setOverlay("ai")}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-400 transition-colors"
            >
              <Sparkles className="size-3.5" /> Ask AI Coach
            </button>
          </div>
        </div>

        {/* Role Customizer Banner */}
        <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs font-medium text-slate-400 shrink-0">Active Target Role:</span>
          <div className="flex-1 flex items-center gap-2 w-full">
            <input
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              placeholder={activeRole}
              className="rounded-xl border border-white/10 bg-black/40 px-3.5 py-1.5 text-xs text-white outline-none focus:border-indigo-400 w-full sm:w-80"
            />
            {customRole && (
              <button
                onClick={fetchQuestions}
                className="rounded-xl bg-indigo-500/20 border border-indigo-500/40 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/30"
              >
                Apply Role
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              filterCategory === cat
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Studio 2-Column Split */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.3fr]">
        {/* Left: Question List */}
        <Card className="flex flex-col gap-3">
          <h3 className="font-bold text-white text-base mb-1">Target Questions</h3>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-xs text-slate-400">
              <Loader2 className="size-6 animate-spin text-indigo-400" />
              <span>Generating tailored interview questions with Gemini...</span>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const isSelected = selectedQuestion?.id === q.id
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestion(q)
                    setEvaluation(null)
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all text-left ${
                    isSelected
                      ? "border-indigo-500/80 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                      {q.category}
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        q.difficulty === "Hard"
                          ? "text-rose-400"
                          : q.difficulty === "Medium"
                          ? "text-amber-300"
                          : "text-emerald-300"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white leading-snug">{q.question}</p>
                  <p className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                    <Lightbulb className="size-3 text-amber-400 shrink-0" />
                    <span>{q.keyFocus}</span>
                  </p>
                </div>
              )
            })
          )}
        </Card>

        {/* Right: Answer Studio & STAR Evaluation */}
        <div className="space-y-6">
          {selectedQuestion ? (
            <Card>
              <div className="border-b border-white/[0.08] pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-indigo-500/20 px-2.5 py-0.5 text-[11px] font-bold text-indigo-300">
                      {selectedQuestion.category}
                    </span>
                    <span className="text-xs text-slate-400">• Difficulty: {selectedQuestion.difficulty}</span>
                  </div>

                  {/* Play Audio Button */}
                  <button
                    onClick={() => handlePlayQuestionAudio(selectedQuestion.question)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all shadow-md ${
                      isPlayingAudio
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-indigo-500 text-white hover:bg-indigo-400"
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="size-3.5" /> Stop Audio
                      </>
                    ) : (
                      <>
                        <Play className="size-3.5" /> Listen to Question
                      </>
                    )}
                  </button>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white">{selectedQuestion.question}</h3>
                <div className="mt-3 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-xs text-slate-300">
                  <span className="font-semibold text-indigo-300">Coach Guidance:</span> {selectedQuestion.tip}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Your Response (STAR Method)
                  </label>
                  <span className="text-[11px] text-indigo-300 font-medium">Situation • Task • Action • Result</span>
                </div>

                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  rows={6}
                  placeholder="Outline the Situation, the exact Task, the Actions you took, and the quantifiable Business Results achieved..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all leading-relaxed"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500">{userAnswer.length} characters</span>
                  <button
                    onClick={handleEvaluate}
                    disabled={evaluating || !userAnswer.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-500 disabled:opacity-40 transition-all"
                  >
                    {evaluating ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
                    Evaluate with Gemini STAR
                  </button>
                </div>
              </div>

              {/* Evaluation Output */}
              {evaluation && (
                <div className="mt-6 border-t border-white/[0.08] pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="size-4 text-indigo-400" />
                      Gemini STAR Score
                    </span>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-300">
                      Score: {evaluation.score} / 100
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 text-xs">
                    {Object.entries(evaluation.starBreakdown).map(([k, v]) => (
                      <div key={k} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                        <p className="font-bold uppercase text-indigo-300 text-[11px]">{k}</p>
                        <p className="mt-1 text-slate-300 leading-relaxed">{v}</p>
                      </div>
                    ))}
                  </div>

                  {evaluation.improvedSample && (
                    <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-xs">
                      <p className="font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                        <Award className="size-3.5" /> High-Impact Exemplar Rewritten:
                      </p>
                      <p className="text-slate-200 leading-relaxed italic">{evaluation.improvedSample}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ) : (
            <Card className="text-center py-24">
              <HelpCircle className="size-10 mx-auto text-slate-500 mb-3" />
              <p className="font-semibold text-white">Select a Question to Practice</p>
              <p className="text-xs text-slate-400 mt-1">Receive immediate scoring and STAR feedback.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Resume Page Component ───────────────────────────────────────────────────
function ResumePage({
  setUploadOpen,
  parsedResume,
  profile,
  go,
}: {
  setUploadOpen: (v: boolean) => void
  parsedResume: ParsedResume | null
  profile: Profile
  go: (tab: Tab) => void
}) {
  const [copiedTemplate, setCopiedTemplate] = useState(false)

  const outreachTemplate = `Hi [Hiring Manager / Recruiter Name],

I noticed your open ${parsedResume?.title || profile.title || "Engineering"} position and recently submitted my application. With my background in ${(parsedResume?.skills || ["TypeScript", "Next.js", "System Design"]).slice(0, 3).join(", ")} and proven impact delivering scalable systems, I'm eager to contribute to your team.

I'd love to connect and share how my experience aligns with your current roadmap!

Best regards,
${profile.name || "Candidate"}`

  const handleCopy = () => {
    navigator.clipboard.writeText(outreachTemplate)
    setCopiedTemplate(true)
    setTimeout(() => setCopiedTemplate(false), 2500)
  }

  const atsScore = parsedResume?.atsScore || profile.resumeScore || 82

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Resume Intelligence &amp; ATS Blueprint</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Resume Analysis &amp; ATS 100 Blueprint</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Processed via Gemini AI parser. Extract keywords, audit ATS readability, and trigger tailored interview prep.
          </p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-500 transition-all active:scale-95"
        >
          <Upload className="size-4" /> Upload New Resume (PDF)
        </button>
      </div>

      {parsedResume ? (
        <div className="space-y-6">
          {/* Header Score Card */}
          <Card>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Active Document</span>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                    ATS Score: {atsScore}/100
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-white">{parsedResume.fileName}</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Extracted {parsedResume.skillsFound} verified skills &amp; {parsedResume.rolesExtracted} career roles
                </p>

                <div className="mt-4 h-2.5 max-w-md overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700"
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => go("Interview Prep")}
                  className="rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-400 transition-colors shadow-md"
                >
                  🎯 Practice Role Questions
                </button>
                <button
                  onClick={() => setUploadOpen(true)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors"
                >
                  Replace PDF
                </button>
              </div>
            </div>
          </Card>

          {/* Quick Metrics Bar */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[
              ["Candidate Name", parsedResume.name ?? profile.name ?? "—"],
              ["Email Address", parsedResume.email ?? profile.email ?? "—"],
              ["Roles Extracted", String(parsedResume.rolesExtracted)],
              ["Skills Detected", String(parsedResume.skillsFound)],
              ["ATS Score", `${atsScore} / 100`],
            ].map(([label, value]) => (
              <Card key={label} className="p-4">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 text-sm font-bold text-white truncate">{value}</p>
              </Card>
            ))}
          </div>

          {/* Blueprint & Outreach */}
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1.1fr]">
            <Card>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4.5 text-indigo-400" />
                  <h3 className="font-bold text-white">How to Achieve a Perfect 100/100 ATS Score</h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                  Checklist
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="grid size-5 place-items-center rounded bg-indigo-500/20 text-indigo-300 font-bold shrink-0">1</span>
                  <div>
                    <p className="font-semibold text-white">Quantify Every Bullet Point (Metrics)</p>
                    <p className="text-slate-400 mt-0.5">
                      Write: <em>"Engineered Next.js caching layer, slashing page load times by 42% for 200k MAU."</em>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="grid size-5 place-items-center rounded bg-indigo-500/20 text-indigo-300 font-bold shrink-0">2</span>
                  <div>
                    <p className="font-semibold text-white">Embed High-Frequency Role Keywords</p>
                    <p className="text-slate-400 mt-0.5">
                      Ensure target keywords (*TypeScript, React 19, Server Actions, PostgreSQL, Redis*) appear in skills and work highlights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="grid size-5 place-items-center rounded bg-indigo-500/20 text-indigo-300 font-bold shrink-0">3</span>
                  <div>
                    <p className="font-semibold text-white">Single-Column ATS Friendly Typography</p>
                    <p className="text-slate-400 mt-0.5">
                      Avoid complex tables or graphical sidebars that disrupt standard ATS parsers.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-4">
                <Target className="size-4.5 text-emerald-400" />
                <h3 className="font-bold text-white">Post-Application Protocol</h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="rounded-xl bg-white/[0.03] p-3 border border-white/[0.06]">
                  <p className="font-semibold text-indigo-300">LinkedIn Outreach Message</p>
                  <div className="mt-2 rounded-lg bg-black/40 p-2.5 text-slate-300 font-mono text-[11px] leading-relaxed border border-white/10">
                    {outreachTemplate}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="mt-2 text-xs font-semibold text-indigo-300 hover:text-indigo-200 flex items-center gap-1"
                  >
                    {copiedTemplate ? "✓ Copied Message!" : "Copy Template →"}
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Skills Matrix */}
          {parsedResume.skills.length > 0 && (
            <Card>
              <h3 className="font-bold text-white mb-3">Extracted Skill Matrix ({parsedResume.skills.length})</h3>
              <div className="flex flex-wrap gap-2">
                {parsedResume.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1.5 text-xs text-indigo-200 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      ) : (
        <div
          onClick={() => setUploadOpen(true)}
          className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-white/15 bg-white/[0.02] py-24 text-center transition-all hover:border-indigo-500/50 hover:bg-indigo-500/[0.03]"
        >
          <div className="grid size-16 place-items-center rounded-2xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/30">
            <Upload className="size-8" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">Upload Your Resume PDF</p>
            <p className="mt-1 text-xs text-slate-400 max-w-sm">
              Processed securely via Gemini AI. Generates immediate ATS score and customized interview questions.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Skills Page Component ────────────────────────────────────────────────────
function SkillsPage({
  profile,
  parsedResume,
  setOverlay,
}: {
  profile: Profile
  parsedResume: ParsedResume | null
  setOverlay: (v: "ai") => void
}) {
  const [data, setData] = useState<SkillsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [customSkill, setCustomSkill] = useState("")

  const loadSkills = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/skills")
      if (res.ok) {
        const json = await res.json()
        setData(json.data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSkills()
  }, [loadSkills])

  const handleAddSkill = () => {
    if (!customSkill.trim() || !data) return
    const newSkill = { name: customSkill.trim(), level: "Proficient", match: 85, status: "Strong" }
    setData({
      ...data,
      categories: data.categories.map((cat, i) => (i === 0 ? { ...cat, skills: [...cat.skills, newSkill] } : cat)),
    })
    setCustomSkill("")
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Skill Taxonomy &amp; Gap Matrix</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Skills &amp; Market Alignment</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Benchmarked against current job requirements for {parsedResume?.title || profile.title || "your target role"}.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadSkills}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Analysis
          </button>
        </div>
      </div>

      {loading || !data ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
          <Loader2 className="size-8 animate-spin text-indigo-400" />
          <span className="text-xs">Analyzing skill taxonomy with Gemini...</span>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-5">
              <span className="text-xs font-semibold uppercase text-slate-400">Market Readiness</span>
              <div className="mt-2 text-3xl font-extrabold text-white">{data.readinessScore}%</div>
              <p className="text-xs text-slate-400 mt-1">Against modern hiring benchmarks</p>
            </Card>

            <Card className="p-5">
              <span className="text-xs font-semibold uppercase text-emerald-400">Top Strengths</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {data.topStrengths.map((s) => (
                  <span key={s} className="rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs text-emerald-300 font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <span className="text-xs font-semibold uppercase text-amber-400">Priority Gaps</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {data.criticalGaps.map((g) => (
                  <span key={g} className="rounded-md bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs text-amber-300 font-semibold">
                    {g}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Add Custom Skill */}
          <div className="flex gap-2">
            <input
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddSkill()
              }}
              placeholder="Add a verified skill (e.g. GraphQL, AWS, System Design)..."
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-400"
            />
            <button
              onClick={handleAddSkill}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-400"
            >
              <Plus className="size-3.5" /> Add Skill
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {data.categories.map((cat) => (
              <Card key={cat.name}>
                <h3 className="font-bold text-white text-sm mb-4 flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-xs text-slate-400 font-normal">{cat.skills.length} items</span>
                </h3>
                <div className="space-y-3.5">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-200">{s.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.status === "Strong"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : s.status === "Gap"
                              ? "bg-rose-500/15 text-rose-300"
                              : "bg-indigo-500/15 text-indigo-300"
                          }`}
                        >
                          {s.level}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            s.status === "Strong"
                              ? "bg-emerald-400"
                              : s.status === "Gap"
                              ? "bg-rose-400"
                              : "bg-indigo-400"
                          }`}
                          style={{ width: `${s.match}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Job Matches Page with Real LinkedIn Links & Company Icons ────────────────
function JobMatchesPage({
  jobs,
  query,
  setQuery,
  setSelectedJob,
  setOverlay,
  parsedResume,
}: {
  jobs: Job[]
  query: string
  setQuery: (q: string) => void
  setSelectedJob: (job: Job) => void
  setOverlay: (v: "job") => void
  parsedResume: ParsedResume | null
}) {
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])
  const [applyingId, setApplyingId] = useState<string | null>(null)

  const handleMarkApplied = async (job: Job) => {
    setApplyingId(job.id)
    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          company: job.company,
          role: job.role,
          applyUrl: job.applyUrl,
        }),
      })
      setAppliedJobs((prev) => [...prev, job.id])
    } finally {
      setApplyingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Live LinkedIn &amp; Company Portals</p>
        <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Real Job Matches &amp; Projects</h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Active roles matched against your resume ({parsedResume?.title || "Full Stack"}) with real company icons and direct LinkedIn apply links.
        </p>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-1">
          <Search className="size-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search target role (e.g. Next.js Developer, Full Stack Lead, AI Engineer, Stripe, Google)..."
            className="w-full bg-transparent py-2.5 text-xs md:text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((job) => {
          const isApplied = appliedJobs.includes(job.id)
          const isApplying = applyingId === job.id

          const realLinkedInUrl = job.applyUrl || `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.company + " " + job.role)}&location=India`

          return (
            <Card key={job.id} className="flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center gap-3.5">
                  <div className="grid size-12 place-items-center rounded-xl bg-white/[0.08] border border-white/15 p-2.5 shadow-md">
                    <CompanyIcon name={job.company} className="size-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate text-base">{job.role}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{job.company} · {job.location}</p>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
                    {job.match}% match
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{job.salary}</span>
                  <span className="text-indigo-300 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                    {job.source || "LinkedIn Jobs"}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-400 leading-relaxed">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.skills?.map((skill) => (
                    <span key={skill} className="rounded-md bg-white/10 px-2.5 py-1 text-xs text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <a
                  href={realLinkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-400 transition-colors"
                >
                  Apply on LinkedIn <ExternalLink className="size-3" />
                </a>
                <button
                  onClick={() => handleMarkApplied(job)}
                  disabled={isApplied || isApplying}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                    isApplied
                      ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                      : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {isApplied ? "✓ Applied" : isApplying ? "Saving..." : "Mark Applied"}
                </button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// ─── Learning Plan Component (Resume-Driven) ──────────────────────────────────
function LearningPlanPage({
  profile,
  parsedResume,
  setOverlay,
}: {
  profile: Profile
  parsedResume: ParsedResume | null
  setOverlay: (v: "ai") => void
}) {
  const [plan, setPlan] = useState<LearningPlanData | null>(null)
  const [loading, setLoading] = useState(true)

  const activeRole = parsedResume?.title || profile.title || "Senior Full Stack Engineer"
  const activeSkills = parsedResume?.skills || ["TypeScript", "Next.js", "React", "Node.js", "SQL"]
  const atsScore = parsedResume?.atsScore || profile.resumeScore || 82

  const loadPlan = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/learning-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: activeRole,
          skills: activeSkills,
          atsScore: atsScore,
        }),
      })
      if (res.ok) {
        const { data } = await res.json()
        setPlan(data)
      }
    } finally {
      setLoading(false)
    }
  }, [activeRole, activeSkills, atsScore])

  useEffect(() => {
    loadPlan()
  }, [loadPlan])

  const toggleTask = (weekNumber: number, taskId: string) => {
    if (!plan) return
    setPlan({
      ...plan,
      weeks: plan.weeks.map((w) =>
        w.weekNumber === weekNumber
          ? {
              ...w,
              tasks: w.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
            }
          : w
      ),
    })
  }

  const allTasks = plan?.weeks.flatMap((w) => w.tasks) || []
  const completedTasks = allTasks.filter((t) => t.completed).length
  const progressPercent = allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Resume-Tailored Syllabus</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">4-Week Accelerated Roadmap</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Generated by Gemini AI specifically for <strong className="text-white">{activeRole}</strong> (ATS Score: {atsScore}/100).
          </p>
        </div>
        <button
          onClick={loadPlan}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors"
        >
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Regenerate Roadmap
        </button>
      </div>

      {loading || !plan ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
          <Loader2 className="size-8 animate-spin text-indigo-400" />
          <span className="text-xs">Building personalized 4-week roadmap with Gemini...</span>
        </div>
      ) : (
        <>
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-indigo-300 tracking-wider">{plan.title}</span>
                <h3 className="text-xl font-bold text-white mt-1">{progressPercent}% Completed</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Clock className="size-3.5 text-indigo-400" /> {plan.estimatedWeeklyHours} • {completedTasks}/{allTasks.length} milestones checked
                </p>
              </div>
              <div className="w-full md:w-64">
                <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {plan.weeks.map((week) => (
              <Card key={week.weekNumber} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="rounded-lg bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300">
                      WEEK {week.weekNumber}
                    </span>
                    <span className="text-xs text-slate-400">
                      {week.tasks.filter((t) => t.completed).length}/{week.tasks.length} tasks
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm">{week.theme}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{week.goal}</p>

                  <div className="mt-4 space-y-2">
                    {week.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(week.weekNumber, task.id)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                          task.completed
                            ? "bg-emerald-500/10 border-emerald-500/20 text-slate-300 line-through opacity-75"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`mt-0.5 size-4 rounded flex items-center justify-center border ${
                            task.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/30"
                          }`}
                        >
                          {task.completed && <Check className="size-3" />}
                        </div>
                        <span className="text-xs leading-snug flex-1">{task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300">
                  <span className="flex items-center gap-1.5 truncate">
                    <BookOpen className="size-3.5 shrink-0" /> {week.resource}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Settings Page ────────────────────────────────────────────────────────────
function SettingsPage({ profile, session }: { profile: Profile; session: any }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Preferences &amp; Services</p>
        <h2 className="text-3xl font-bold tracking-tight text-white mt-1">System Settings &amp; Integrations</h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">Active integrations, cloud databases, and session controls.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="size-5 text-emerald-400" /> Active Cloud Connections
          </h3>
          <div className="space-y-3">
            {[
              ["MongoDB Atlas (Primary DB)", "Connected to cluster0 (careerai)", "Live", Database],
              ["Google OAuth 2.0", session?.user?.email || "Authenticated", "Active", Key],
              ["Google Gemini 3.5 Flash AI", "Generative Engine Active", "Live", Zap],
            ].map(([name, desc, status, Icon]) => (
              <div key={name as string} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-indigo-500/20 text-indigo-300">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{name as string}</p>
                    <p className="text-xs text-slate-400">{desc as string}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                  {status as string}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-rose-500/20 bg-rose-500/[0.02]">
          <h3 className="font-bold text-rose-300 mb-2">Account Session</h3>
          <p className="text-xs text-slate-400 mb-4">Sign out of your active CareerOS session across this device.</p>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-500/20 border border-rose-500/30 py-2.5 text-xs font-bold text-rose-200 hover:bg-rose-500 hover:text-white transition-colors"
          >
            <LogOut className="size-4" /> Sign Out
          </button>
        </Card>
      </div>
    </div>
  )
}

// ─── Upload Modal with Immediate Interview Questions Trigger ──────────────────
function UploadModal({
  onClose,
  onParsed,
}: {
  onClose: () => void
  onParsed: (data: ParsedResume, launchInterview?: boolean) => void
}) {
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState("")
  const [result, setResult] = useState<ParsedResume | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMsg("Please select a valid PDF file.")
      setStatus("error")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File too large. Maximum size is 10MB.")
      setStatus("error")
      return
    }

    setStatus("uploading")
    setProgress(15)

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 12, 88))
    }, 300)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/resume", { method: "POST", body: formData })
      clearInterval(progressInterval)

      if (!res.ok) {
        const { error } = await res.json()
        setErrorMsg(error ?? "Failed to process PDF.")
        setStatus("error")
        return
      }

      setProgress(100)
      const { data } = await res.json()
      setResult(data)
      setStatus("done")
    } catch {
      clearInterval(progressInterval)
      setErrorMsg("Network error. Please try again.")
      setStatus("error")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-3xl border border-white/15 bg-slate-950 p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Gemini AI Resume Extraction</p>
            <h2 className="mt-1 text-xl font-bold text-white">Upload Resume (PDF)</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white" aria-label="Close upload modal">
            <X className="size-5" />
          </button>
        </div>

        {status === "idle" && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="mt-6 flex min-h-52 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-indigo-500/40 bg-indigo-500/[0.05] p-6 text-center hover:bg-indigo-500/10 transition-colors"
          >
            <div className="grid size-14 place-items-center rounded-2xl bg-indigo-500/20 text-indigo-300">
              <Upload className="size-7" />
            </div>
            <div>
              <span className="font-bold text-white text-base">Drop your PDF resume here</span>
              <p className="mt-1 text-xs text-slate-400">or click to browse • Up to 10MB • Synced directly to MongoDB</p>
            </div>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
          }}
        />

        {status === "uploading" && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-white">Analyzing resume with Gemini AI...</span>
              <span className="text-indigo-400">{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 pt-2 text-xs text-slate-300">
              {["Extracting work history", "Detecting verified skill tags", "Auditing ATS keyword density", "Preparing interview questions"].map(
                (item, i) => (
                  <div key={item} className="rounded-xl bg-white/5 p-3 flex items-center gap-2">
                    {progress > i * 24 ? (
                      <Check className="size-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Loader2 className="size-4 animate-spin text-indigo-400 shrink-0" />
                    )}
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-xs text-rose-200">{errorMsg}</div>
            <button
              onClick={() => {
                setStatus("idle")
                setErrorMsg("")
              }}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
            >
              Try again
            </button>
          </div>
        )}

        {status === "done" && result && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
              <span>Resume analyzed successfully. Extracted {result.skillsFound} verified skills!</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-xl bg-white/5 p-3.5">
                <p className="text-slate-500">Target Role Title</p>
                <p className="font-bold text-white mt-0.5">{result.title || "Software Professional"}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3.5">
                <p className="text-slate-500">ATS Score</p>
                <p className="font-bold text-emerald-300 mt-0.5">{result.atsScore} / 100</p>
              </div>
            </div>

            {/* Direct 1-Click Action to launch interview questions for this uploaded role */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onParsed(result, true)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-400 hover:to-violet-500 transition-all"
              >
                🎯 Practice Interview Questions for {result.title?.split("/")[0] || "This Role"} →
              </button>
              <button
                onClick={() => {
                  onParsed(result, false)
                  onClose()
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Global Overlay Component ─────────────────────────────────────────────────
function Overlay({
  kind,
  setOverlay,
  job,
  chatMessages,
  chatLoading,
  onSendChat,
  searchQuery,
  setSearchQuery,
  searchResults,
  onSelectJob,
}: {
  kind: "search" | "notifications" | "ai" | "job"
  setOverlay: (v: null) => void
  job: Job | null
  chatMessages: ChatMessage[]
  chatLoading: boolean
  onSendChat: (msg: string) => void
  searchQuery: string
  setSearchQuery: (v: string) => void
  searchResults: Job[]
  onSelectJob: (job: Job) => void
}) {
  const [chatInput, setChatInput] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages, chatLoading])

  if (kind === "search") {
    return (
      <div
        className="fixed inset-0 z-50 grid place-items-start bg-black/70 p-4 pt-[12vh] backdrop-blur-md"
        onClick={() => setOverlay(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Search className="size-4.5 text-slate-400" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search target roles, verified skills, companies..."
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
            <kbd className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-400">ESC</kbd>
          </div>
          {searchResults.length > 0 ? (
            <div className="mt-3 flex flex-col gap-2 max-h-72 overflow-y-auto">
              {searchResults.map((j) => (
                <button
                  key={j.id}
                  onClick={() => {
                    onSelectJob(j)
                    setOverlay(null)
                  }}
                  className="flex items-center gap-3 rounded-xl p-2.5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="grid size-9 place-items-center rounded-xl bg-white/[0.08] p-1.5">
                    <CompanyIcon name={j.company} className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{j.role}</p>
                    <p className="text-xs text-slate-400">
                      {j.company} • {j.match}% match
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              Try searching for "Next.js", "Full Stack", "System Design", or "Stripe"
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md" onClick={() => setOverlay(null)}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="font-bold tracking-tight text-white flex items-center gap-2 text-sm">
            {kind === "ai" && <Sparkles className="size-4 text-indigo-400" />}
            {kind === "notifications" ? "Notifications & System Log" : kind === "ai" ? "CareerOS AI Strategist" : job ? `${job.company} — ${job.role}` : "Job Details"}
          </h2>
          <button onClick={() => setOverlay(null)} className="text-slate-400 hover:text-white" aria-label="Close panel">
            <X className="size-5" />
          </button>
        </div>

        {kind === "notifications" && (
          <div className="flex flex-col gap-3 overflow-y-auto p-5">
            {[
              "MongoDB Atlas connection live & verified",
              "Gemini 3.5 Flash AI model initialized for real-time interview simulations",
              "Resume parsed and ATS compatibility index updated",
            ].map((note) => (
              <div key={note} className="rounded-xl bg-white/5 p-4 text-xs text-slate-300 border border-white/5">
                {note}
                <p className="mt-1 text-[10px] text-slate-500">Just now</p>
              </div>
            ))}
          </div>
        )}

        {kind === "job" && job && (
          <div className="overflow-y-auto p-6 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="grid size-12 place-items-center rounded-xl bg-white/[0.08] border border-white/15 p-2.5 shadow-md">
                <CompanyIcon name={job.company} className="size-7" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{job.role}</h3>
                <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-white/5 p-3.5">
                <p className="text-slate-500">Match Score</p>
                <p className="mt-1 text-lg font-bold text-emerald-300">{job.match}%</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3.5">
                <p className="text-slate-500">Salary Range</p>
                <p className="mt-1 text-sm font-bold text-white">{job.salary}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="rounded-md bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 text-xs text-indigo-200 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={job.applyUrl || `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.company + " " + job.role)}&location=India`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-3 text-xs font-bold text-white hover:bg-indigo-400 transition-colors shadow-md"
            >
              Apply on {job.source || "LinkedIn"} <ExternalLink className="size-3.5" />
            </a>
          </div>
        )}

        {kind === "ai" && (
          <div className="flex flex-1 flex-col overflow-hidden">
            {chatMessages.length === 0 && (
              <div className="flex flex-wrap gap-2 p-5 pb-0">
                {["Improve my resume", "Simulate mock interview questions", "Review my skill gaps", "Salary negotiation strategy"].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => onSendChat(prompt)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[90%] rounded-2xl p-4 text-xs md:text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "border border-white/10 bg-slate-900/90 text-slate-200"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <FormattedChatMessage content={msg.content} />
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 flex items-center gap-2 text-xs text-indigo-300">
                    <Loader2 className="size-4 animate-spin text-indigo-400" />
                    <span>CareerOS AI is generating insights...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-white/10 p-4 bg-slate-950/80">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 focus-within:border-indigo-500 transition-colors">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      onSendChat(chatInput)
                      setChatInput("")
                    }
                  }}
                  placeholder="Ask anything about your career or resume..."
                  className="flex-1 bg-transparent px-2 text-xs md:text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  onClick={() => {
                    onSendChat(chatInput)
                    setChatInput("")
                  }}
                  disabled={!chatInput.trim() || chatLoading}
                  className="grid size-8 place-items-center rounded-lg bg-indigo-500 text-white disabled:opacity-40 hover:bg-indigo-400 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

// ─── Markdown Chat Formatter ───────────────────────────────────────────────────
function FormattedChatMessage({ content }: { content: string }) {
  const sections = content.split(/\n\s*\n/).filter(Boolean)

  return (
    <div className="space-y-3 text-xs md:text-sm leading-relaxed">
      {sections.map((sec, sIdx) => {
        const lines = sec.split("\n").filter(Boolean)
        const isBulletList = lines.every((l) => /^\s*([*•\->]|\d+[.)])\s+/.test(l))

        if (isBulletList) {
          return (
            <ul key={sIdx} className="space-y-2 my-1 pl-0.5">
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^\s*([*•\->]|\d+[.)])\s+/, "")
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-indigo-400" />
                    <span className="flex-1 text-slate-200">
                      <FormatInline text={cleanLine} />
                    </span>
                  </li>
                )
              })}
            </ul>
          )
        }

        return (
          <div key={sIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              if (line.startsWith("###") || line.startsWith("##")) {
                const headingText = line.replace(/^#{2,3}\s*/, "")
                return (
                  <h4 key={lIdx} className="font-bold text-indigo-300 pt-1 text-xs uppercase tracking-wider">
                    <FormatInline text={headingText} />
                  </h4>
                )
              }
              if (/^\s*([*•\-]|\d+[.)])\s+/.test(line)) {
                const cleanLine = line.replace(/^\s*([*•\-]|\d+[.)])\s+/, "")
                return (
                  <div key={lIdx} className="flex items-start gap-2 my-1 pl-0.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-indigo-400" />
                    <span className="flex-1 text-slate-200">
                      <FormatInline text={cleanLine} />
                    </span>
                  </div>
                )
              }
              return (
                <p key={lIdx} className="text-slate-200">
                  <FormatInline text={line} />
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

function FormatInline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i} className="italic text-indigo-200">{part.slice(1, -1)}</em>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

export default CareerOSDashboard
