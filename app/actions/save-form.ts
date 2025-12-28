"use server"

import prisma from "@/lib/prisma"
import { GeneratedForm } from "../ai-forms/types"

export async function saveForm(form: GeneratedForm) {
    try {
        const savedForm = await prisma.form.create({
            data: {
                title: form.name,
                description: form.description,
                fields: form.fields as any, // Prisma Json type workaround
            },
        })
        return { success: true, id: savedForm.id }
    } catch (error) {
        console.error("Error saving form:", error)
        return { success: false, error: "Failed to save form" }
    }
}
