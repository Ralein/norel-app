"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function toggleUserBan(userId: string, isBanned: boolean) {
    try {
        await prisma.profile.update({
            where: { id: userId },
            data: { isBanned },
        })
        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error("Error toggling user ban:", error)
        return { success: false, error: "Failed to update user status" }
    }
}

export async function getAllUsers() {
    try {
        const users = await prisma.profile.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                isBanned: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        })
        return { success: true, users }
    } catch (error) {
        console.error("Error fetching users:", error)
        return { success: false, error: "Failed to fetch users" }
    }
}
