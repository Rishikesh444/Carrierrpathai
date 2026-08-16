import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db("careerai")

  let profile = await db.collection("profiles").findOne({ userId: session.user.id })

  if (!profile) {
    // Create default profile from session data
    const defaultProfile = {
      userId: session.user.id,
      name: session.user.name ?? "User",
      email: session.user.email ?? "",
      image: session.user.image ?? null,
      title: "",
      location: "",
      bio: "",
      roles: "",
      locations: "",
      readiness: 20,
      resumeScore: 0,
      skillsScore: 0,
      experienceScore: 0,
      applicationsSent: 0,
      profileViews: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await db.collection("profiles").insertOne(defaultProfile)
    profile = defaultProfile
  }

  return NextResponse.json({ data: profile })
}

export async function PATCH(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updates = await request.json()
    const allowed = ["name", "email", "title", "location", "bio", "roles", "locations"]
    const sanitized = Object.fromEntries(
      Object.entries(updates ?? {}).filter(
        ([key, value]) => allowed.includes(key) && typeof value === "string"
      )
    )

    if (Object.keys(sanitized).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("careerai")

    const result = await db.collection("profiles").findOneAndUpdate(
      { userId: session.user.id },
      { $set: { ...sanitized, updatedAt: new Date() } },
      { upsert: true, returnDocument: "after" }
    )

    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}
