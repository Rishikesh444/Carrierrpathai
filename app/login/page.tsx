"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Suspense } from "react"

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-indigo-950/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 shadow-2xl shadow-indigo-500/30">
            <Sparkles className="size-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Career<span className="text-indigo-300">OS</span>
            </h1>
            <p className="mt-2 text-sm text-slate-400">Your AI-powered career command center</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-400">Sign in to continue building your career momentum</p>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/25 hover:shadow-lg active:scale-[0.98]"
          >
            {/* Google icon */}
            <svg className="size-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <p className="mt-6 text-center text-xs text-slate-500">
            By signing in, you agree to our{" "}
            <span className="text-slate-400">Terms of Service</span> and{" "}
            <span className="text-slate-400">Privacy Policy</span>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            ["📄", "Real PDF parsing"],
            ["🤖", "AI career insights"],
            ["🔒", "Secure & private"],
          ].map(([emoji, label]) => (
            <div key={label} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <div className="text-xl">{emoji}</div>
              <p className="mt-1 text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
