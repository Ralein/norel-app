"use server"

import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

export async function adminLogin(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const ADMIN_EMAIL = "raleinnova@gmail.com"
    const ADMIN_PASSWORD_HASH = "$2b$10$vWYnh4uMxhytpsWBwPYZaOtCyzb32XweWtN4nu4UN/bOBS9WSmpky"

    if (email !== ADMIN_EMAIL) {
        return { success: false, error: "Invalid credentials" }
    }

    const isPasswordCorrect = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    if (!isPasswordCorrect) {
        return { success: false, error: "Invalid credentials" }
    }

    // Set admin session cookie
    cookies().set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
    })

    return { success: true }
}

export async function adminLogout() {
    cookies().delete("admin_session")
}

export async function getAdminSession() {
    const session = cookies().get("admin_session")
    return session?.value === "true"
}
