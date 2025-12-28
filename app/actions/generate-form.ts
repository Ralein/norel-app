"use server"

import Groq from "groq-sdk";
import { GeneratedForm } from "../ai-forms/types";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function generateForm(prompt: string, formType: string, industry: string, complexity: string): Promise<GeneratedForm> {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are an expert form builder AI. Your goal is to generate a comprehensive, professional JSON structure for a form based on the user's description.
                    
                    The JSON structure must exactly match this interface:
                    
                    interface AIFormField {
                      id: string; // unique
                      type: string; // 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'date' | 'number' | 'file'
                      label: string;
                      placeholder?: string;
                      required: boolean;
                      validation?: string | null; // 'email' | 'phone' | 'ssn' | null
                      description?: string;
                    }
                    
                    interface GeneratedForm {
                      name: string;
                      description: string;
                      fields: AIFormField[];
                      category: string;
                      confidence: number; // 0.0 to 1.0
                      suggestions: string[]; // 3-4 suggestions for improvement
                    }
                    
                    Return ONLY the JSON object. Do not include markdown formatting or backticks.
                    IMPORTANT: Do NOT use the value 'undefined'. Use 'null' or omit the field entirely. JSON does not support 'undefined'.
                    `
                },
                {
                    role: "user",
                    content: `Create a ${complexity} complexity form for the ${industry} industry.
                    Form Type: ${formType}
                    User Description: ${prompt}
                    
                    Generate the JSON.`
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 4096,
            top_p: 1,
            stop: null,
            stream: false,
        });

        const content = completion.choices[0]?.message?.content || "";
        // Clean up any markdown blocks if the model adds them despite instructions
        const cleanContent = content.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

        const form: GeneratedForm = JSON.parse(cleanContent);
        return form;

    } catch (error) {
        console.error("Error generating form:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Failed to generate form: Unknown error");
    }
}
