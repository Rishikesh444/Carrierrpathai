const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ""

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } })
  if (!response.ok) throw new Error(`CareerOS API request failed: ${response.status}`)
  return response.json() as Promise<T>
}

export type CareerJob = { id: string; company: string; role: string; match: number; salary: string; location: string; skills: string[] }
export type CareerProfile = { id: string; name: string; title: string; readiness: number; resumeScore: number; skillsScore: number; experienceScore: number; applicationsSent: number; profileViews: number }

export const careerApi = {
  health: () => request<{ status: string; service: string; timestamp: string }>("/api/health"),
  jobs: (query = "") => request<{ data: CareerJob[]; meta: { count: number; query: string } }>(`/api/jobs${query ? `?q=${encodeURIComponent(query)}` : ""}`),
  profile: () => request<{ data: CareerProfile }>("/api/profile"),
  updateProfile: (updates: Partial<Pick<CareerProfile, "name" | "title">>) => request<{ data: CareerProfile }>("/api/profile", { method: "PATCH", body: JSON.stringify(updates) }),
}
