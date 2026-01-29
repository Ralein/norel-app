"use server"

import Groq from "groq-sdk"
import prisma from "@/lib/prisma"
import { GeneratedForm } from "../ai-forms/types"
const pdf = require("pdf-parse")
import mammoth from "mammoth"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function autoFillForm(formData: FormData) {
    try {
        const file = formData.get("file") as File
        if (!file) {
            throw new Error("No file uploaded")
        }

        let extractedText = ""

        if (file.type === "application/pdf") {
            const buffer = Buffer.from(await file.arrayBuffer())
            const data = await pdf(buffer)
            extractedText = data.text
        } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/msword") {
            const buffer = Buffer.from(await file.arrayBuffer())
            const result = await mammoth.extractRawText({ buffer })
            extractedText = result.value
        } else if (file.type === "text/plain" || file.type === "application/json") {
            extractedText = await file.text()
        } else {
            throw new Error("Unsupported file type for AI processing")
        }

        if (!extractedText.trim()) {
            throw new Error("Could not extract any text from the file")
        }

        // Fetch user profile (assuming first profile for now)
        const profile = await prisma.profile.findFirst()

        if (!profile) {
            throw new Error("No user profile found. Please create a profile first.")
        }

        // Prepare prompt for Groq
        const prompt = `
            You are an expert AI Form Assistant. 
            Your task is to analyze the following EXTRACTED FORM CONTENT and identify all its fields.
            Then, using the provided USER PROFILE DATA, intelligently auto-fill the values for these fields.
            
            EXTRACTED FORM CONTENT:
            """
            ${extractedText}
            """
            
            USER PROFILE DATA:
            ${JSON.stringify(profile, null, 2)}
            
            INSTRUCTIONS:
            1. Identify every input field in the form content.
            2. Match each field to the corresponding data in the USER PROFILE DATA.
            3. If a direct match is found, use that value.
            4. If no direct match is found but the data can be inferred or formatted from the profile (e.g., combining First and Last Name), do so.
            5. If no data exists in the profile for a field, leave the value as null or empty string.
            6. Return the data in a valid JSON structure.
            
            OUTPUT FORMAT (JSON ONLY):
            {
                "name": "inferred form title",
                "description": "inferred form description",
                "confidence": 0.95,
                "category": "inferred category",
                "fields": [
                    {
                        "id": "unique_id",
                        "type": "text",
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
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
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
