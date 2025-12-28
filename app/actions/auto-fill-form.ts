"use server"

import Groq from "groq-sdk"
import prisma from "@/lib/prisma"
import { GeneratedForm } from "../ai-forms/types"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function autoFillForm(formData: FormData) {
    try {
        const file = formData.get("file") as File
        if (!file) {
            throw new Error("No file uploaded")
        }

        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`

        // Fetch user profile (assuming first profile for now as per plan)
        const profile = await prisma.profile.findFirst()

        if (!profile) {
            throw new Error("No user profile found. Please create a profile first.")
        }

        // Prepare prompt for Groq Vision
        const prompt = `
            You are an expert AI Form Assistant. 
            Your task is to analyze the provided image of a form and extract all the form fields.
            Then, using the following USER PROFILE DATA, intelligently auto-fill the values for these fields.
            
            USER PROFILE DATA:
            ${JSON.stringify(profile, null, 2)}
            
            INSTRUCTIONS:
            1. Identify every input field in the form image (TextField, Checkbox, Radio, Select, etc.).
            2. Match each field to the corresponding data in the USER PROFILE DATA.
            3. If a direct match is found, use that value.
            4. If no direct match is found but the data can be inferred or formatted from the profile (e.g., combining First and Last Name), do so.
            5. If no data exists in the profile for a field, leave the value as null or empty string.
            6. Return validation rules (regex, required) if they are visually apparent (e.g., red asterisks).
            
            OUTPUT FORMAT (JSON ONLY):
            {
                "name": "inferred form title",
                "description": "inferred form description",
                "confidence": 0.95,
                "category": "inferred category",
                "fields": [
                    {
                        "id": "unique_id",
                        "type": "text" | "number" | "email" | "date" | "select" | "checkbox" | "textarea" | "radio",
                        "label": "visual label text",
                        "placeholder": "visual placeholder",
                        "required": boolean,
                        "value": "AUTO_FILLED_VALUE_FROM_PROFILE",
                        "description": "any help text found"
                    }
                ],
                "suggestions": ["suggestion 1", "suggestion 2"]
            }
        `

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        { type: "image_url", image_url: { url: base64Image } }
                    ]
                }
            ],
            model: "llama-3.2-90b-vision-preview",
            temperature: 0,
            response_format: { type: "json_object" }
        })

        const content = completion.choices[0].message.content
        if (!content) {
            throw new Error("Failed to generate form data")
        }

        const generatedData = JSON.parse(content) as GeneratedForm

        // Ensure "suggestions" is always an array
        if (!generatedData.suggestions) {
            generatedData.suggestions = []
        }

        return { success: true, form: generatedData }

    } catch (error) {
        console.error("Auto-fill error:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to process form"
        }
    }
}
